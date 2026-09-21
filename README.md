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
py launcher.py
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

## Learning Engine: Mastery Map and Wrong Answer Notebook

**Mastery Engine v1:** The Progress page tracks evidence-based mastery for school
curriculum topics and individual SAT skills. It uses the correct/incorrect results
of practice questions, with a small smoothing prior; marking a chapter complete
does not create false mastery. The Mastery Map spans the full Progress width on
desktop and adapts to smaller screens.

**Wrong Answer Notebook:** Incorrect answers from curriculum quizzes, regular
SAT practice, and completed SAT mocks are automatically saved with the original
question, choices, last incorrect answer, correct answer, explanation, topic/skill,
difficulty, source, date and miss count. Unanswered or unscored pretest questions
from mocks do not get mislabeled as incorrect.

Open **Progress → Wrong Answer Notebook** to filter questions by To review,
Recovered, Understood, or All. You can expand a question, reveal its original
explanation, self-check by retrying, jump to relevant practice, turn it into a
flashcard or mark it understood. A correct subsequent practice answer automatically
marks the question Recovered; another mistake reopens it. Manual acknowledgement
and self-checks do not increase the Mastery score.

Select **Wrong answers** as a flashcard deck source to revisit saved notebook
questions. The notebook is capped at the 250 most recently missed distinct
questions to keep the existing JSON sync payload manageable.

**Storage and limitations:** Mastery records and wrong-answer entries are stored
inside normal StudyAI state: locally, and in the existing per-user database state
when signed in. No database migration or Gemini key is needed. Old quiz averages
do not include individual question text and cannot be retroactively turned into
wrong-answer entries. Personal AI-generated quizzes do not currently feed this
notebook; the integration covers regular curriculum quizzes, regular SAT practice,
and completed SAT mocks. The built-in explanation comes from the original
question; it does not call Gemini. Completing a self-check does not prove
mastery of an unseen question.

---

### Smart Review Queue — unified daily priorities

Open **Progress → Smart Review Queue** to see a short, prioritized set of study
actions compiled from **due flashcards**, **open Wrong Answer Notebook questions**,
**curriculum topic / SAT skill mastery below 75%**, and topics already on your
existing review list. The queue is built from saved practice evidence and
recalculates after answers, ratings, status changes, and on due-count refresh.

The queue groups wrong answers from the same skill/topic, avoids repeating a
weak mastery recommendation when an open mistake already addresses that
skill/topic, and shows at most eight recommendations at once. Use
**Start next review**, **Review flashcards**, **Review mistakes**, or
**Practice skill** to navigate to the relevant existing activity.
Marking a question Understood or answering it correctly removes its open-mistake
recommendation; separate weak-mastery evidence may still recommend that topic.

**Prioritization is deterministic:** due flashcards first, repeated missed
questions next, then weak practiced skills/topics, then existing review-list
topics. The labels explain why each action appears. This is an MVP heuristic;
it is not a calibrated retention estimate, an official exam score, or
AI-generated advice. Exam-date scheduling is available separately in the Smart Study Planner. The queue does
not update mastery simply because a recommendation was clicked, and
it does not require a Gemini connection.

---

### Spaced repetition — Feature #3

StudyAI now has a persisted flashcard scheduler. Open **Flashcards**, choose the
current curriculum topic, a Workspace note, or saved wrong answers, then **flip
each card** and rate your recall:

| Rating | First review interval | Later behavior |
| --- | --- | --- |
| Again | 1 minute | Restarts the learning interval and counts a lapse |
| Hard | 10 minutes | Grows the previous interval slowly |
| Good | 1 day | Then 3 days, then about 2.2 times the previous interval |
| Easy | 4 days | Grows the previous interval by about 2.8 times |

This is a simple, bounded interval scheduler, **not** a calibrated FSRS or
a scientifically measured probability of retention. The maximum interval is
one year. Ratings are disabled until you flip the card; **Skip / Next** does
not change its schedule. New and legacy flashcards are not automatically
assigned review dates until you rate them.

**Daily queue:** Rating saves the question/answer and its next due time into
normal local StudyAI state and the authenticated account's existing database
state. Choose **Due reviews** in the deck source or use **Review due cards**
from Flashcards or Progress. Once rated in that session, a card moves out of
the current queue until its next review date. When a deadline arrives while
StudyAI is open, counts refresh roughly once per minute or on tab return.

Reviewed curriculum, Workspace, wrong-answer, and Personal AI-generated cards
can reappear after a restart, because their rated content is stored with the
schedule. The saved-review catalog is capped at 500 distinct rated cards, and
**Reset deck schedule** deletes review dates and old status for the loaded
deck only. The existing New / Learning / Mastered status data is preserved
until the corresponding card receives a new rating.

**Privacy:** Rated Personal AI cards and Workspace cards are saved in the
regular account-sync state along with their question/answer text. Personal AI's
original uploaded source documents are still stored separately in the browser;
rating a card saves only that card's text, not its full source document.

---

## Practice Studio, Smart Planner, and weekly report

Start StudyAI with `StudyAI.bat` and open **Practice Studio**, which appears
after Curriculum Practice. It uses the project's **50 original SAT questions**
(12 Reading & Writing, 38 Math), not copied College Board questions.
Available modes:

- **Diagnostic:** a preliminary, domain-balanced check across the chosen
  SAT section(s). Its per-domain breakdown is an early learning signal, not a
  validated diagnostic or official SAT score prediction.
- **Adaptive practice:** a simple transparent difficulty heuristic: after
  incorrect answers it seeks Foundation items, after two consecutive correct
  answers it seeks Advanced items, otherwise it seeks Medium. It prefers weak
  recorded skills when similarly suitable questions are available. The question
  pool is small and no question repeats *within* a session.
- **Custom test:** set section, domain, skill, difficulty, question count,
  and optional timer (0 = untimed).
- **Timed sprint:** ten questions in ten minutes, or fewer if the selected
  filters have fewer questions.
- **Mixed retrieval:** bring together skills with low recorded mastery and
  others from the selected SAT section(s).

**Skipping an item never counts as an incorrect answer.** Only answered
items update SAT mastery and the Wrong Answer Notebook. Timed sessions
finish when time expires; actual scores report answered questions, separately
from skips. A completed session writes a short summary to the same
local/account-synced StudyAI state. The interface shows the *actual available*
question count so restrictive filters are not silently padded. Repeating the
limited bank will eventually make accuracy less representative.

**Smart Study Planner:** Under Planner, optionally provide an exam date and
your daily minutes, then generate up to seven days of suggestions using
the full Smart Review Queue plus relevant uncompleted curriculum topics.
Use the three-day cram preset for a shorter review map; it will not
schedule days after a supplied earlier exam date. Click any task to open
flashcards, the Wrong Answer Notebook, SAT practice, or the matching topic.
The plan is a saved snapshot and must be regenerated as your practice changes.
Durations are estimates, not promises of what you can learn in that time.

**Weekly learning report:** Under Progress, view answered questions, practice
accuracy, distinct practiced units, seven-day activity, weak areas, due
flashcards and unresolved wrong answers. An optional, editable questions-per-
seven-days goal is stored with your account progress. This is an activity
summary—not an assessment of intelligence or a standardized exam forecast.
Use Refresh report if you practice without leaving the Progress page.

These additions require no Gemini key and do not change the existing SQLite
schema, because they use StudyAI's existing local-first state sync.

---

## SAT planner, skill insights and revision sheets

**Dedicated SAT plan:** The Planner page now contains an independent SAT study
planner beneath the school-curriculum planner. Choose both sections or Reading &
Writing / Math, 15–240 minutes per day, and an optional future SAT date. Generate
a seven-day plan or choose the three-day cram option. The generated schedule
stops before the exam day and stays within the requested daily minute budget.
It prioritizes recorded weak skills and open SAT mistakes, adds uncovered skills,
and includes original-question diagnostic / mixed / short timed practice. Click
a task to open the relevant Practice Studio configuration or Wrong Answer
Notebook. Saved plan and settings use the existing local/account state; the
plan is a snapshot and must be regenerated after additional practice. Time
allocations are suggestions, not measured completion or score predictions.
StudyAI does not automatically schedule or administer official Bluebook tests.

**SAT skill insights:** Progress now shows answered SAT practice totals,
recorded accuracy, practiced skill counts, and section/domain breakdowns.
Click a domain to open targeted Practice Studio filters. Counts use recorded
answers (including any repeats), so small samples and repeated bank questions
limit what these values can establish. No official SAT score prediction is made.

**Offline formula sheet and quick revision guide:** Open a curriculum topic,
then use **Formula sheet** or **Quick revision guide** below the note. Sheets
are assembled from the existing StudyAI topic summary, specified formulas,
key points, method, and common mistakes. Missing source formulas are explicitly
noted; the tool never invents missing equations or silently repairs generic
topic notes. Copy, download TXT, print / save as PDF, or save the text as a
Workspace note. The generated sheet remains subject to the quality and
completeness of the selected StudyAI notes; verify with your syllabus/textbook.

All three tools run locally without a Gemini key or new database tables.
They do not copy copyrighted questions or content from other education sites.

---

## Personal AI — grounded notes and audio discussions

Personal AI is a separate section of StudyAI. Open it using **StudyAI.bat** (which starts
`launcher.py`) rather than Live Server or `app.py` directly.

**Sources:** Upload selectable-text PDF, DOCX, TXT or Markdown notes (8 MB per file,
up to 48,000 extracted characters per note), paste text, import the current
chapter outline or a saved Workspace note, or use **Topic Mode** to choose a
StudyAI curriculum → class/stage → subject → topic directly. Select up to 8
sources with a total of 52,000 characters. A StudyAI topic can stay selected
alongside uploaded school notes, so Personal AI can work from both at once.
Scanned/image-only PDFs are not supported yet.

**Topic Mode:** Students can start without their own notes. Choose a StudyAI topic,
pick Quick / Standard / Deep explanation depth, then use Explain Topic, Revision
Notes, Teach Me, Quiz Me, Make Flashcards, or Audio Lesson. Quiz Me creates a
six-question interactive grounded MCQ set. Make Flashcards creates ten active-recall
cards that can be studied inside Personal AI or loaded into the existing StudyAI
flashcard deck.

**AI tools:** Summarize, generate structured notes, improve existing notes without
adding unsupported factual content, ask a source-grounded question, generate
topic explanations/revision lessons, build grounded quizzes and flashcards, or
generate an editable eight-turn, two-speaker audio discussion. The discussion can
be synthesized into a downloadable WAV file with two clearly labeled AI voices.
Generated text notes can be copied or saved to the StudyAI Workspace.

**Set up AI generation:**

1. Copy `.env.example` to `.env` in the StudyAI project folder.
2. Create a Gemini API key in Google AI Studio and add `GEMINI_API_KEY=...` to `.env`.
   Never put the key in JavaScript, HTML, a public GitHub commit or a screenshot.
3. Run `StudyAI.bat`. Existing installations detect and install the PDF/DOCX
   libraries when needed. Sign in with a StudyAI account before generating AI content.
4. In Personal AI, select your notes and choose a tool. Text generation uses Gemini 3.6 Flash
   by default; two-speaker audio uses Gemini 2.5 Flash Preview TTS by default.

Gemini's free tier is subject to model availability and rate/usage limits. Google states that
free-tier Gemini API data may be used to improve its products, so do not upload passwords,
private records or other sensitive material. Override `STUDYAI_GEMINI_TEXT_MODEL`,
`STUDYAI_GEMINI_TTS_MODEL`, or `STUDYAI_GEMINI_TTS_LANGUAGE` in `.env` if needed.
This is a StudyAI source-grounded workflow, **not** NotebookLM or an identical
replica of its features. Model results can still be wrong; check references.

**Privacy and limits:** Source text is stored in this browser, separately scoped
for guest/account use. Personal AI source documents and generated WAV audio are
not written to the server's database or uploaded to GitHub, and source libraries
are not included in account sync. Selected source text is sent to Google's Gemini API only when generation is requested. Saved generated notes do become
Workspace notes and follow normal StudyAI workspace sync rules. Do not upload
secrets or other sensitive records. There is basic per-user usage throttling,
but a public deployment still needs robust account protection, costs/quotas,
data deletion and privacy controls, and HTTPS.
