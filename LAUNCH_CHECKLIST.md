# StudyAI Private Beta Launch Checklist

StudyAI is now much closer to a beta-ready product, but public deployment should not treat the current local-development defaults as production defaults.

## Product experience now implemented

The current beta build now includes:
- a first-class **Today** destination in primary navigation and the command center;
- pathway-aware recommendations using the existing Smart Review evidence rather than a second competing recommendation engine;
- onboarding for SAT or a school board, with school grade/stage and subject preferences;
- 20 / 40 / 60 minute and custom guided Study Sessions;
- guided-session steps that can be automatically verified when real practice/review evidence changes;
- signed-in sync for Today preferences and the current guided session;
- evidence-confidence labels based on the amount of answered practice;
- privacy-light beta signals: distinct active days, first practice, sessions started/completed, and last-active time;
- question-quality reporting;
- an optional private-beta invite code for new account creation.

When `BETA_ACCESS_CODE` is configured, email/password registration requires the code. New social-OAuth accounts are also blocked from bypassing the invite gate; an existing beta account can still use a configured linked identity.

The focused `tests/product-experience.cjs` suite covers the new Today/session behavior in addition to the broader learning integration suite.

## 1. Run the automated checks

GitHub Actions should be green on `main`.

The CI workflow now checks:
- Python syntax for Flask, launcher, Personal AI, deployment preflight, and beta server tests
- JavaScript syntax for every root script and all browser test suites
- invite-only registration behavior, login/logout, cloud state sync, question reporting, account export/deletion, cross-origin blocking, noindex beta headers, and database health
- PostgreSQL server smoke checks, Neon-style production preflight, and Render database configuration
- the production preflight against the intended private-beta environment
- the full learning integration suite
- Today/onboarding/guided-session product experience
- signed-in cloud hydration stability, including legacy-state reload-loop regression coverage
- 390px mobile overflow, mobile-menu state, skip navigation, duplicate IDs, and primary-navigation targets
- SAT mock startup, College Board Desmos graphing/scientific URLs, live question-reporting UI
- Personal AI unavailable-key behavior and user-facing error state
- browser JavaScript error collection across the smoke paths

Local equivalent:

```bash
python -m py_compile app.py launcher.py personal_ai.py production_preflight.py
node tests/learning-integration.cjs
node tests/product-experience.cjs
node tests/pre-beta-smoke.cjs
python tests/pre-beta-server.py
```

## Controlled Render + Neon beta option

The repository includes:
- `render-private-beta.yaml`, a reviewed Blueprint for one Singapore web-service instance using PostgreSQL through `DATABASE_URL`;
- `production_preflight.py`, which checks critical production environment settings without printing secret values;
- `migrate_sqlite_to_postgres.py`, the one-time SQLite to PostgreSQL migration/verification tool;
- `DEPLOY_RENDER_BETA.md`, the step-by-step Neon + Render private-beta deployment guide.

No Render database disk is required. Keep one app instance during the first beta because rate limiting is still process-local.

## 2. Production environment

Set production values in the host's environment, never in GitHub:

```env
SECRET_KEY=<long random secret>
COOKIE_SECURE=1
FLASK_DEBUG=0
TRUST_PROXY=1
DATABASE_URL=<Neon pooled PostgreSQL URL>
BETA_ACCESS_CODE=<private invite code, at least 8 characters>
GEMINI_API_KEY=<server-side key>
STUDYAI_AI_DAILY_TEXT_LIMIT=60
STUDYAI_AI_DAILY_AUDIO_LIMIT=10
```

Use the production WSGI entrypoint:

```bash
gunicorn launcher:app --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 120
```

Use `launcher:app`, not `app:app`, because launcher injects StudyAI's enhancement assets.

For the first private beta, keep one Gunicorn worker and one service instance because rate limiting is still process-local. PostgreSQL removes the old single-file database restriction.

## 3. PostgreSQL persistence is mandatory

Local development may still use SQLite when `DATABASE_URL` is blank.

Hosted beta/production should use Neon PostgreSQL through `DATABASE_URL`. Before launch:

1. create an empty Neon project;
2. copy the pooled TLS connection string;
3. keep a backup of `studyai.db`;
4. run `python migrate_sqlite_to_postgres.py --source studyai.db`;
5. run the same command with `--verify-only`;
6. confirm `GET /api/health` reports `backend: postgresql`.

Do not commit the connection string. Keep the old SQLite file only as a temporary offline backup until the Neon-backed deployment is verified.

## 4. Authentication before public registration

Already implemented:
- hashed passwords
- HTTP-only session cookie
- SameSite=Lax
- secure-cookie production switch
- generic duplicate-registration error
- login/register throttling
- same-origin checks on state-changing API routes
- account export
- account deletion
- security response headers

Still required for a broad public launch:
- verified email ownership
- password-reset email flow
- persistent/distributed rate limiting if multiple server instances are used
- review social OAuth redirect URLs on the final HTTPS domain

Until email verification/reset exists, treat public account creation as **beta**, not a finished identity system.

## 5. Personal AI

Already implemented:
- server-side Gemini key
- sign-in requirement
- request-size limits
- short-window throttling
- configurable daily per-account text/audio limits
- source-grounded prompting
- user-visible privacy notice

Before a larger beta:
- monitor Gemini quota/cost
- move daily quota counters to persistent storage if service restarts become frequent
- keep Personal AI disabled during formal mock-test questions

## 6. Privacy/data controls

Current product provides:
- local-first study state
- account export
- account deletion
- a Privacy & Data page at `/privacy`
- browser-local Personal AI sources
- bounded question-quality reports

Before launch, manually verify that the privacy page still matches every enabled third-party service.

## 7. Health check

Use:

```text
GET /api/health
```

A healthy response reports that the database is ready.

Configure the hosting platform to use this endpoint for health checks if supported.

## 8. OAuth production URLs

When enabling a provider, register the final HTTPS callback URLs, for example:

```text
https://YOUR-DOMAIN/auth/google/callback
https://YOUR-DOMAIN/auth/microsoft/callback
https://YOUR-DOMAIN/auth/apple/callback
```

Only enable providers whose credentials and callbacks are fully configured.

## 9. Private beta first

Start with roughly 5–10 students rather than a wide public launch.

Ask testers to use StudyAI without a detailed walkthrough and record:
- whether they understand the Today page;
- whether they complete a first Study Session;
- where they become confused;
- whether SAT mocks work end-to-end;
- question reports they submit;
- whether they return later;
- browser/device issues.

Do not collect unnecessary profile information just for analytics.

## 10. Beta success signals

Prioritize:
1. first practice session completed;
2. questions actually answered;
3. previously missed questions later recovered;
4. due review completed;
5. returning users.

These are more useful than raw page views.

## 11. Final smoke test

Most structural flows below are now automated in CI. Before inviting real students, still perform one local smoke pass because CI cannot prove your real Windows browser, local audio stack, external Desmos frame, or real Gemini account works.

Use the normal local workflow first:

1. GitHub Desktop → Fetch origin
2. Pull origin
3. Close the existing StudyAI browser window and terminal
4. Run `StudyAI.bat`
5. Press `Ctrl + Shift + R`

Then test on desktop and a mobile-sized browser window:
- new user onboarding
- Today recommendations
- 20/40/60-minute Study Session
- curriculum quiz
- SAT targeted practice
- full and section-only SAT mock
- Module 2 adaptation
- strike-out
- College Board testing-version Desmos
- wrong-answer recovery
- flashcard scheduling
- planners/deadlines
- Personal AI with a non-sensitive test source
- account sync
- Download my data
- Delete account using a disposable test account
- Privacy page
- dark mode
- refresh/restart persistence

Do not test deletion with an account containing data you want to keep.

## Not a launch blocker for a small private beta

These can wait until real usage proves they are needed:
- social/community features
- payments
- teacher dashboards
- native mobile apps
- new curricula
- large gamification systems
- many additional AI generators
