# StudyAI Full-Stack Multi-Curriculum

StudyAI is a student-built study platform covering CBSE, Cambridge IGCSE, Cambridge AS/A Level and original Digital SAT practice. This build adds a real account/database layer while preserving the detailed notes, flashcards, quizzes, planner, progress dashboard, personal workspace and local-first behavior.

## What changed in this build

### Premium motion
- Smooth section reveals
- Softer iPhone-inspired spring/ease curves without copying Apple UI
- Animated note transitions
- Tactile press/hover feedback
- Smooth light/dark theme transitions
- Animated account dialog
- Reduced-motion accessibility support

### Accounts and persistent data
- Email + password account creation
- Email + password sign-in
- Passwords are stored as secure password hashes, never as plain text
- SQLite database persistence
- Per-user StudyAI state in the database
- Local-first saving for immediate responsiveness
- Automatic cloud/database sync while signed in
- Signing out clears the account data from the current browser view but keeps it in the database
- Signing back in restores that user's data

### Social sign-in architecture
- Google sign-in route and button
- Microsoft sign-in route and button
- Sign in with Apple route and button
- Providers are automatically shown as `Setup required` until their developer credentials are added

Social sign-in cannot be activated with fake credentials. Each provider requires you to register StudyAI as an application and obtain your own client ID / secret (and Apple private-key details).

---

# Run StudyAI on Windows

The account/database version must be run through the Python server. **Do not use Live Server for this version.**

## Easiest method

1. Make sure Python is installed.
2. Double-click `setup_windows.bat` once.
3. After setup finishes, double-click `run_windows.bat`.
4. StudyAI opens at:

`http://localhost:5000`

The database file `studyai.db` is created automatically in the project folder.

## Manual method

Open a terminal in this folder and run:

```bash
py -m pip install -r requirements.txt
copy .env.example .env
py app.py
```

Then visit `http://localhost:5000`.

---

# Test the account system

You do not need Google/Apple/Microsoft credentials to test real accounts.

1. Open StudyAI.
2. Click **Sign in** in the top bar.
3. Choose **Create account**.
4. Enter a name, email and password of at least 8 characters.
5. Complete some topics, add personal notes or do SAT practice.
6. Click your account and choose **Sign out**.
7. Sign back in with the same email/password.
8. Your account state is restored from SQLite.

The site also keeps a local copy while you are signed in so interactions remain fast.

---

# Google sign-in setup

Create an OAuth web application in Google Cloud and put the credentials in `.env`:

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

For local development, register this redirect URI:

`http://localhost:5000/auth/google/callback`

Restart StudyAI after changing `.env`.

---

# Microsoft sign-in setup

Register a web app in Microsoft Entra ID and add:

```env
MICROSOFT_CLIENT_ID=...
MICROSOFT_CLIENT_SECRET=...
```

Register this redirect URI for local development:

`http://localhost:5000/auth/microsoft/callback`

Restart StudyAI after changing `.env`.

---

# Sign in with Apple setup

Apple web sign-in needs more configuration than the other providers. You need:
- Apple Developer membership
- A Sign in with Apple-enabled primary App ID
- A web Services ID
- A registered domain and HTTPS return URL
- Team ID
- Key ID
- Sign in with Apple `.p8` private key

Add these to `.env`:

```env
APPLE_CLIENT_ID=your.services.id
APPLE_TEAM_ID=...
APPLE_KEY_ID=...
APPLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
```

Apple requires a registered HTTPS website return URL for web sign-in, so this provider is intended to be enabled once StudyAI is deployed to a real HTTPS domain. Use:

`https://YOUR-DOMAIN/auth/apple/callback`

as the registered return URL.

---

# Environment settings

Copy `.env.example` to `.env` and change at least the secret before deployment:

```env
SECRET_KEY=replace-with-a-long-random-secret
COOKIE_SECURE=0
PORT=5000
FLASK_DEBUG=1
```

For a real HTTPS deployment:

```env
COOKIE_SECURE=1
FLASK_DEBUG=0
```

Never commit the real `.env`, OAuth secrets, or Apple private key to GitHub.

---

# Database

Development uses SQLite:

`studyai.db`

Tables:
- `users`
- `oauth_identities`
- `user_state`

`user_state` stores each account's StudyAI state as JSON, including progress, bookmarks, review topics, personal notes, quiz history, SAT mastery, flashcard states, workspace notes and folders.

SQLite is ideal for a local student project. A later deployment can move this to PostgreSQL for higher concurrency and production hosting.

---

# Important production upgrades later

Before opening public account creation to real users, add:
- Email verification
- Password reset emails
- Rate limiting
- CSRF hardening for production forms/API actions
- PostgreSQL
- HTTPS-only secure cookies
- Privacy policy and account deletion flow
- Database backups
- Real server-side collaboration

The current build is a strong local/full-stack MVP and portfolio base, not yet a production identity service.

## Interaction fixes in this build

- Password fields now include an accessible simple Show/Hide control, with no custom password animations.
- Flashcards now use a true two-sided 3D flip interaction. Click, tap, or focus and activate the card to switch between question and answer.


---

## Personal AI — grounded notes and audio discussions

Personal AI is a separate section of StudyAI. Open it using **StudyAI.bat** (which starts
`launcher.py`) rather than Live Server or `app.py` directly.

**Sources:** Upload selectable-text PDF, DOCX, TXT or Markdown notes (8 MB per file,
up to 48,000 extracted characters per note), paste text, or import the current
chapter outline or a saved Workspace note. Select up to 8 sources with a total
of 52,000 characters. Scanned/image-only PDFs are not supported yet.

**AI tools:** Summarize, generate structured notes, improve existing notes without
adding unsupported factual content, ask a source-grounded question, or generate
an editable eight-turn, two-speaker audio discussion. The discussion can be
synthesized into a downloadable WAV file with two clearly labeled AI voices.
Generated notes can be copied or saved to the StudyAI Workspace.

**Set up AI generation:**

1. Copy `.env.example` to `.env` in the StudyAI project folder.
2. Add your own `OPENAI_API_KEY=...` line in `.env`. Never put the key in JavaScript,
   HTML, a public GitHub commit or a screenshot.
3. Run `StudyAI.bat`. Existing installations detect and install the new PDF/DOCX
   libraries when needed. Sign in with a StudyAI account before generating AI content.
4. In Personal AI, select your notes and choose a tool. Generating text or audio
   uses the API account's usage/billing, and an internet connection is required.

The backend defaults to `gpt-4o-mini` for text and `tts-1` for speech; override
`STUDYAI_TEXT_MODEL` or `STUDYAI_SPEECH_MODEL` in `.env` if desired.
This is a StudyAI source-grounded workflow, **not** NotebookLM or an identical
replica of its features. Model results can still be wrong; check references.

**Privacy and limits:** Source text is stored in this browser, separately scoped
for guest/account use. Personal AI source documents and generated WAV audio are
not written to the server's database or uploaded to GitHub, and source libraries
are not included in account sync. Selected source text is sent to the configured
OpenAI API only when generation is requested. Saved generated notes do become
Workspace notes and follow normal StudyAI workspace sync rules. Do not upload
secrets or other sensitive records. There is basic per-user usage throttling,
but a public deployment still needs robust account protection, costs/quotas,
data deletion and privacy controls, and HTTPS.
