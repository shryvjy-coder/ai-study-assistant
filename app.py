import json
import hmac
import os
import re
import sqlite3
import time
import threading
from collections import defaultdict, deque
from functools import wraps
from pathlib import Path

import jwt
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, request, send_from_directory, session, url_for
from flask_compress import Compress
from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.security import check_password_hash, generate_password_hash

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / '.env')

app = Flask(__name__, static_folder=None)
app.config.update(
    COMPRESS_MIN_SIZE=1024,
    COMPRESS_LEVEL=6,
    COMPRESS_ALGORITHM=['gzip'],
)
Compress(app)
_secret_key = os.getenv('SECRET_KEY', '').strip()
if not _secret_key and os.getenv('FLASK_DEBUG', '1') == '0':
    raise RuntimeError('SECRET_KEY must be configured when FLASK_DEBUG=0.')
app.secret_key = _secret_key or 'dev-change-this-secret-key'
if os.getenv('TRUST_PROXY', '0') == '1':
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',
    SESSION_COOKIE_SECURE=os.getenv('COOKIE_SECURE', '0') == '1',
    PERMANENT_SESSION_LIFETIME=60 * 60 * 24 * 30,
)

DB_PATH = Path(os.getenv('DATABASE_PATH', BASE_DIR / 'studyai.db'))
oauth = OAuth(app)

EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA foreign_keys = ON')
    return conn


def init_db():
    with db() as conn:
        conn.executescript(
            '''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                name TEXT NOT NULL DEFAULT '',
                password_hash TEXT,
                created_at INTEGER NOT NULL,
                last_login INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS oauth_identities (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                provider TEXT NOT NULL,
                provider_sub TEXT NOT NULL,
                created_at INTEGER NOT NULL,
                UNIQUE(provider, provider_sub),
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS user_state (
                user_id INTEGER PRIMARY KEY,
                state_json TEXT NOT NULL,
                updated_at INTEGER NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS question_reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                source TEXT NOT NULL,
                question_ref TEXT NOT NULL DEFAULT '',
                category TEXT NOT NULL,
                details TEXT NOT NULL DEFAULT '',
                question_text TEXT NOT NULL,
                passage TEXT NOT NULL DEFAULT '',
                context TEXT NOT NULL DEFAULT '',
                page TEXT NOT NULL DEFAULT '',
                created_at INTEGER NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
            );

            CREATE TABLE IF NOT EXISTS client_errors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                message TEXT NOT NULL,
                source TEXT NOT NULL DEFAULT '',
                line INTEGER NOT NULL DEFAULT 0,
                column_no INTEGER NOT NULL DEFAULT 0,
                page TEXT NOT NULL DEFAULT '',
                created_at INTEGER NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
            );
            '''
        )


def configure_oauth():
    if os.getenv('GOOGLE_CLIENT_ID') and os.getenv('GOOGLE_CLIENT_SECRET'):
        oauth.register(
            'google',
            client_id=os.getenv('GOOGLE_CLIENT_ID'),
            client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
            server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
            client_kwargs={'scope': 'openid profile email'},
        )

    if os.getenv('MICROSOFT_CLIENT_ID') and os.getenv('MICROSOFT_CLIENT_SECRET'):
        oauth.register(
            'microsoft',
            client_id=os.getenv('MICROSOFT_CLIENT_ID'),
            client_secret=os.getenv('MICROSOFT_CLIENT_SECRET'),
            server_metadata_url='https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
            client_kwargs={'scope': 'openid profile email'},
        )

    apple_client_id = os.getenv('APPLE_CLIENT_ID')
    apple_team_id = os.getenv('APPLE_TEAM_ID')
    apple_key_id = os.getenv('APPLE_KEY_ID')
    apple_private_key = os.getenv('APPLE_PRIVATE_KEY', '').replace('\\n', '\n')
    if apple_client_id and apple_team_id and apple_key_id and apple_private_key:
        now = int(time.time())
        client_secret = jwt.encode(
            {
                'iss': apple_team_id,
                'iat': now,
                'exp': now + 60 * 60 * 24 * 30,
                'aud': 'https://appleid.apple.com',
                'sub': apple_client_id,
            },
            apple_private_key,
            algorithm='ES256',
            headers={'kid': apple_key_id},
        )
        oauth.register(
            'apple',
            client_id=apple_client_id,
            client_secret=client_secret,
            server_metadata_url='https://appleid.apple.com/.well-known/openid-configuration',
            client_kwargs={'scope': 'name email'},
            token_endpoint_auth_method='client_secret_post',
        )


def public_user(row):
    return {'id': row['id'], 'email': row['email'], 'name': row['name'] or ''}


def current_user():
    uid = session.get('user_id')
    if not uid:
        return None
    with db() as conn:
        return conn.execute('SELECT id, email, name FROM users WHERE id=?', (uid,)).fetchone()


def login_required(fn):
    @wraps(fn)
    def wrapped(*args, **kwargs):
        if not session.get('user_id'):
            return jsonify({'ok': False, 'error': 'Authentication required'}), 401
        return fn(*args, **kwargs)
    return wrapped


def set_login(user_id):
    session.clear()
    session.permanent = True
    session['user_id'] = user_id


def oauth_client(name):
    return oauth.create_client(name)


def oauth_available(name):
    return oauth_client(name) is not None


def social_login(provider, email, sub, name=''):
    email = (email or '').strip().lower()
    if not email or not sub:
        raise ValueError('Provider did not return an email and account identifier.')
    now = int(time.time())
    with db() as conn:
        identity = conn.execute(
            'SELECT user_id FROM oauth_identities WHERE provider=? AND provider_sub=?',
            (provider, sub),
        ).fetchone()
        if identity:
            user_id = identity['user_id']
            conn.execute('UPDATE users SET last_login=?, name=CASE WHEN name="" THEN ? ELSE name END WHERE id=?', (now, name or '', user_id))
            return user_id

        user = conn.execute('SELECT id FROM users WHERE email=? COLLATE NOCASE', (email,)).fetchone()
        if user:
            user_id = user['id']
            conn.execute('UPDATE users SET last_login=?, name=CASE WHEN name="" THEN ? ELSE name END WHERE id=?', (now, name or '', user_id))
        else:
            if os.getenv('BETA_ACCESS_CODE', '').strip():
                raise ValueError('Private beta account creation requires an invite code. Create the account with email/password first.')
            cur = conn.execute(
                'INSERT INTO users(email,name,password_hash,created_at,last_login) VALUES(?,?,?,?,?)',
                (email, name or '', None, now, now),
            )
            user_id = cur.lastrowid
        conn.execute(
            'INSERT OR IGNORE INTO oauth_identities(user_id,provider,provider_sub,created_at) VALUES(?,?,?,?)',
            (user_id, provider, sub, now),
        )
        return user_id


@app.get('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')


@app.get('/privacy')
def privacy():
    return send_from_directory(BASE_DIR, 'privacy.html')


@app.get('/<path:path>')
def static_files(path):
    # API and auth routes are defined before this catch-all route by Flask's routing table.
    # Serve only explicitly permitted browser assets. Never expose .env, SQLite,
    # Python source, git internals, or other server-side files through this route.
    allowed_extensions = {'.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.woff2'}
    file_path = BASE_DIR / path
    if (file_path.suffix.lower() in allowed_extensions
            and not any(part.startswith('.') for part in Path(path).parts)
            and file_path.is_file()
            and BASE_DIR in file_path.resolve().parents):
        return send_from_directory(BASE_DIR, path)
    if path.startswith(('api/', 'auth/')):
        return jsonify({'ok': False, 'error': 'Not found'}), 404
    return send_from_directory(BASE_DIR, 'index.html')


@app.get('/api/auth/me')
def auth_me():
    user = current_user()
    providers = {
        'google': oauth_available('google'),
        'microsoft': oauth_available('microsoft'),
        'apple': oauth_available('apple'),
    }
    return jsonify({
        'ok': True,
        'user': public_user(user) if user else None,
        'providers': providers,
        'registration_mode': 'invite' if os.getenv('BETA_ACCESS_CODE', '').strip() else 'open',
    })


@app.post('/api/auth/register')
def register():
    if not _allow_rate('register', 8, 600):
        return jsonify({'ok': False, 'error': 'Too many account attempts. Try again later.'}), 429
    data = request.get_json(silent=True) or {}
    beta_code = os.getenv('BETA_ACCESS_CODE', '').strip()
    supplied_code = str(data.get('access_code', '')).strip()
    if beta_code and not hmac.compare_digest(supplied_code, beta_code):
        return jsonify({'ok': False, 'error': 'A valid private-beta access code is required.'}), 403
    email = str(data.get('email', '')).strip().lower()
    password = str(data.get('password', ''))
    name = str(data.get('name', '')).strip()[:80]
    if not EMAIL_RE.match(email):
        return jsonify({'ok': False, 'error': 'Enter a valid email address.'}), 400
    if len(password) < 8:
        return jsonify({'ok': False, 'error': 'Password must be at least 8 characters.'}), 400
    now = int(time.time())
    try:
        with db() as conn:
            cur = conn.execute(
                'INSERT INTO users(email,name,password_hash,created_at,last_login) VALUES(?,?,?,?,?)',
                (email, name, generate_password_hash(password), now, now),
            )
            user_id = cur.lastrowid
    except sqlite3.IntegrityError:
        return jsonify({'ok': False, 'error': 'Could not create an account with those details.'}), 409
    set_login(user_id)
    return jsonify({'ok': True, 'user': {'id': user_id, 'email': email, 'name': name}})


@app.post('/api/auth/login')
def login():
    if not _allow_rate('login', 20, 600):
        return jsonify({'ok': False, 'error': 'Too many sign-in attempts. Try again later.'}), 429
    data = request.get_json(silent=True) or {}
    email = str(data.get('email', '')).strip().lower()
    password = str(data.get('password', ''))
    with db() as conn:
        user = conn.execute('SELECT * FROM users WHERE email=? COLLATE NOCASE', (email,)).fetchone()
        if not user or not user['password_hash'] or not check_password_hash(user['password_hash'], password):
            return jsonify({'ok': False, 'error': 'Incorrect email or password.'}), 401
        conn.execute('UPDATE users SET last_login=? WHERE id=?', (int(time.time()), user['id']))
    set_login(user['id'])
    return jsonify({'ok': True, 'user': public_user(user)})


@app.post('/api/auth/logout')
def logout():
    session.clear()
    return jsonify({'ok': True})


@app.get('/api/state')
@login_required
def get_state():
    with db() as conn:
        row = conn.execute('SELECT state_json, updated_at FROM user_state WHERE user_id=?', (session['user_id'],)).fetchone()
    if not row:
        return jsonify({'ok': True, 'has_state': False, 'state': None, 'updated_at': None})
    try:
        state = json.loads(row['state_json'])
    except json.JSONDecodeError:
        state = None
    return jsonify({'ok': True, 'has_state': state is not None, 'state': state, 'updated_at': row['updated_at']})


@app.put('/api/state')
@login_required
def put_state():
    data = request.get_json(silent=True) or {}
    state = data.get('state')
    if not isinstance(state, dict):
        return jsonify({'ok': False, 'error': 'Invalid state payload.'}), 400
    raw = json.dumps(state, separators=(',', ':'), ensure_ascii=False)
    if len(raw.encode('utf-8')) > 5_000_000:
        return jsonify({'ok': False, 'error': 'Study data is too large to sync.'}), 413
    now = int(time.time())
    with db() as conn:
        conn.execute(
            '''INSERT INTO user_state(user_id,state_json,updated_at) VALUES(?,?,?)
               ON CONFLICT(user_id) DO UPDATE SET state_json=excluded.state_json, updated_at=excluded.updated_at''',
            (session['user_id'], raw, now),
        )
    return jsonify({'ok': True, 'updated_at': now})


@app.get('/api/health')
def health():
    try:
        with db() as conn:
            conn.execute('SELECT 1').fetchone()
        return jsonify({'ok': True, 'database': 'ready'})
    except sqlite3.Error:
        return jsonify({'ok': False, 'database': 'unavailable'}), 503


@app.post('/api/question-reports')
def question_report():
    if not _allow_rate('question-report', 15, 600):
        return jsonify({'ok': False, 'error': 'Too many reports. Try again later.'}), 429
    data = request.get_json(silent=True) or {}
    categories = {'answer', 'explanation', 'easy', 'hard', 'duplicate', 'format', 'other'}
    category = str(data.get('category', '')).strip().lower()
    question_text = str(data.get('question_text', '')).strip()[:1800]
    if category not in categories or not question_text:
        return jsonify({'ok': False, 'error': 'Invalid question report.'}), 400
    source = str(data.get('source', 'practice')).strip()[:80]
    question_ref = str(data.get('question_ref', '')).strip()[:160]
    details = str(data.get('details', '')).strip()[:1000]
    passage = str(data.get('passage', '')).strip()[:4000]
    context = str(data.get('context', '')).strip()[:500]
    page = str(data.get('page', '')).strip()[:160]
    now = int(time.time())
    user_id = session.get('user_id')
    with db() as conn:
        cur = conn.execute(
            '''INSERT INTO question_reports(
                   user_id,source,question_ref,category,details,question_text,passage,context,page,created_at
               ) VALUES(?,?,?,?,?,?,?,?,?,?)''',
            (user_id, source, question_ref, category, details, question_text, passage, context, page, now),
        )
        report_id = cur.lastrowid
    return jsonify({'ok': True, 'report_id': report_id})


@app.post('/api/client-errors')
def client_error():
    if not _allow_rate('client-error', 20, 600):
        return jsonify({'ok': False, 'error': 'Too many error reports.'}), 429
    data = request.get_json(silent=True) or {}
    message = str(data.get('message', '')).strip()[:500]
    if not message:
        return jsonify({'ok': False, 'error': 'Invalid error report.'}), 400
    source = str(data.get('source', '')).strip()[:240]
    page = str(data.get('page', '')).strip()[:160]
    try:
        line = max(0, min(10_000_000, int(data.get('line') or 0)))
        column = max(0, min(10_000_000, int(data.get('column') or 0)))
    except (TypeError, ValueError):
        line = column = 0
    with db() as conn:
        conn.execute(
            '''INSERT INTO client_errors(user_id,message,source,line,column_no,page,created_at)
               VALUES(?,?,?,?,?,?,?)''',
            (session.get('user_id'), message, source, line, column, page, int(time.time())),
        )
    return jsonify({'ok': True})


@app.get('/api/account/export')
@login_required
def export_account():
    uid = session['user_id']
    with db() as conn:
        user = conn.execute(
            'SELECT id,email,name,created_at,last_login FROM users WHERE id=?',
            (uid,),
        ).fetchone()
        state_row = conn.execute(
            'SELECT state_json,updated_at FROM user_state WHERE user_id=?',
            (uid,),
        ).fetchone()
        identities = conn.execute(
            'SELECT provider,created_at FROM oauth_identities WHERE user_id=? ORDER BY created_at',
            (uid,),
        ).fetchall()
        reports = conn.execute(
            '''SELECT source,question_ref,category,details,question_text,passage,context,page,created_at
               FROM question_reports WHERE user_id=? ORDER BY created_at DESC''',
            (uid,),
        ).fetchall()
        diagnostics = conn.execute(
            '''SELECT message,source,line,column_no,page,created_at
               FROM client_errors WHERE user_id=? ORDER BY created_at DESC''',
            (uid,),
        ).fetchall()
    try:
        saved_state = json.loads(state_row['state_json']) if state_row else None
    except json.JSONDecodeError:
        saved_state = None
    return jsonify({
        'ok': True,
        'exported_at': int(time.time()),
        'user': dict(user) if user else None,
        'providers': [dict(row) for row in identities],
        'state': saved_state,
        'state_updated_at': state_row['updated_at'] if state_row else None,
        'question_reports': [dict(row) for row in reports],
        'client_errors': [dict(row) for row in diagnostics],
    })


@app.delete('/api/account')
@login_required
def delete_account():
    data = request.get_json(silent=True) or {}
    if str(data.get('confirm', '')).strip().upper() != 'DELETE':
        return jsonify({'ok': False, 'error': 'Type DELETE to confirm account deletion.'}), 400
    uid = session['user_id']
    with db() as conn:
        conn.execute('DELETE FROM question_reports WHERE user_id=?', (uid,))
        conn.execute('DELETE FROM client_errors WHERE user_id=?', (uid,))
        conn.execute('DELETE FROM users WHERE id=?', (uid,))
    session.clear()
    return jsonify({'ok': True})


@app.get('/auth/<provider>')
def oauth_start(provider):
    if provider not in {'google', 'microsoft', 'apple'} or not oauth_available(provider):
        return redirect('/?auth_error=provider_not_configured')
    client = oauth_client(provider)
    callback = url_for('oauth_callback', provider=provider, _external=True)
    if provider == 'apple':
        return client.authorize_redirect(callback, response_mode='form_post')
    return client.authorize_redirect(callback)


@app.route('/auth/<provider>/callback', methods=['GET', 'POST'])
def oauth_callback(provider):
    if provider not in {'google', 'microsoft', 'apple'} or not oauth_available(provider):
        return redirect('/?auth_error=provider_not_configured')
    try:
        client = oauth_client(provider)
        token = client.authorize_access_token()
        info = token.get('userinfo')
        if not info and token.get('id_token'):
            try:
                info = client.parse_id_token(token, nonce=None)
            except Exception:
                info = {}
        info = dict(info or {})

        # Apple supplies the user's name only on the first authorization and may send it separately.
        if provider == 'apple' and request.form.get('user'):
            try:
                apple_user = json.loads(request.form['user'])
                n = apple_user.get('name') or {}
                full_name = ' '.join(x for x in [n.get('firstName'), n.get('lastName')] if x)
                if full_name and not info.get('name'):
                    info['name'] = full_name
                if apple_user.get('email') and not info.get('email'):
                    info['email'] = apple_user['email']
            except Exception:
                pass

        email = info.get('email') or info.get('preferred_username')
        sub = info.get('sub') or info.get('oid')
        name = info.get('name') or ''
        user_id = social_login(provider, email, sub, name)
        set_login(user_id)
        return redirect('/?auth=success')
    except Exception as exc:
        app.logger.exception('OAuth callback failed for %s', provider)
        return redirect('/?auth_error=oauth_failed')


app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024
_RATE_LOCK = threading.Lock()
_RATE_BUCKETS = defaultdict(deque)


def _client_key():
    return request.remote_addr or 'unknown'


def _allow_rate(bucket, limit, window_seconds):
    now = time.monotonic()
    key = (bucket, _client_key())
    with _RATE_LOCK:
        values = _RATE_BUCKETS[key]
        while values and values[0] < now - window_seconds:
            values.popleft()
        if len(values) >= limit:
            return False
        values.append(now)
        return True


@app.before_request
def protect_state_changing_api():
    if request.method not in {'POST', 'PUT', 'PATCH', 'DELETE'}:
        return None
    if not request.path.startswith('/api/'):
        return None
    origin = request.headers.get('Origin')
    if origin and origin.rstrip('/') != request.host_url.rstrip('/'):
        return jsonify({'ok': False, 'error': 'Cross-origin request blocked.'}), 403
    return None


@app.after_request
def security_headers(response):
    response.headers.setdefault('X-Content-Type-Options', 'nosniff')
    response.headers.setdefault('X-Frame-Options', 'SAMEORIGIN')
    response.headers.setdefault('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.setdefault('Permissions-Policy', 'geolocation=(), camera=(), microphone=()')
    if request.is_secure:
        response.headers.setdefault('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    return response


# Register separately maintained Personal AI endpoints after the core app is configured.
from personal_ai import register_personal_ai
register_personal_ai(app, current_user)

init_db()
configure_oauth()

if __name__ == '__main__':
    app.run(
        host='127.0.0.1',
        port=int(os.getenv('PORT', '5000')),
        debug=os.getenv('FLASK_DEBUG', '1') == '1',
    )
