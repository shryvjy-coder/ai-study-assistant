# StudyAI Public Beta Launch Checklist

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

The CI workflow checks:
- Python syntax for Flask/launcher/Personal AI
- JavaScript syntax
- the Chromium integration suite using a temporary database and test account

Local equivalent:

```bash
python -m py_compile app.py launcher.py personal_ai.py production_preflight.py
node tests/learning-integration.cjs
node tests/product-experience.cjs
```

## Controlled Render beta option

The repository includes:
- `render-private-beta.yaml`, a reviewed Blueprint for one Singapore web-service instance with a persistent SQLite disk;
- `production_preflight.py`, which checks critical production environment settings without printing secret values;
- `DEPLOY_RENDER_BETA.md`, the step-by-step private-beta deployment guide.

The Blueprint intentionally uses a paid persistent disk. Review the price shown by Render before creating any resource. Do not switch this SQLite setup to multiple instances.

## 2. Production environment

Set production values in the host's environment, never in GitHub:

```env
SECRET_KEY=<long random secret>
COOKIE_SECURE=1
FLASK_DEBUG=0
GEMINI_API_KEY=<server-side key>
STUDYAI_AI_DAILY_TEXT_LIMIT=60
STUDYAI_AI_DAILY_AUDIO_LIMIT=10
```

Use the production WSGI entrypoint:

```bash
gunicorn launcher:app --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 120
```

Use `launcher:app`, not `app:app`, because launcher injects StudyAI's enhancement assets.

## 3. Database persistence is mandatory

The local default is SQLite at `studyai.db`.

Do **not** put that database on an ephemeral cloud filesystem. A service restart or redeploy could erase account data.

For a small private beta, SQLite is acceptable only when:
- `DATABASE_PATH` points to a real persistent disk/volume;
- the disk is included in backups;
- only one application instance writes to that SQLite database.

For a broader public launch, migrate accounts/state/question reports to PostgreSQL before scaling to multiple instances.

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

On desktop and mobile-sized screens:
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
