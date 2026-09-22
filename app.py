import json
import os
import re
import sqlite3
import time
from functools import wraps
from pathlib import Path

import jwt
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, request, send_from_directory, session, url_for
from flask_compress import Compress
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
app.secret_key = os.getenv('SECRET_KEY') or 'dev-change-this-secret-key'
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
    return jsonify({'ok': True, 'user': public_user(user) if user else None, 'providers': providers})


@app.post('/api/auth/register')
def register():
    data = request.get_json(silent=True) or {}
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
        return jsonify({'ok': False, 'error': 'An account already exists for this email.'}), 409
    set_login(user_id)
    return jsonify({'ok': True, 'user': {'id': user_id, 'email': email, 'name': name}})


@app.post('/api/auth/login')
def login():
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


# Register separately maintained Personal AI endpoints before starting Flask.
from personal_ai import register_personal_ai
register_personal_ai(app, current_user)

init_db()
configure_oauth()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.getenv('PORT', '5000')), debug=os.getenv('FLASK_DEBUG', '1') == '1')
