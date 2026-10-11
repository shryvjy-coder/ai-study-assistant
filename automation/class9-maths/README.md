# StudyAI NCERT Curriculum Automation — Class 9 Maths

A manual, review-first Gemini audit for all 14 chapters in the 2026–27 NCERT *Ganita Manjari* course. This workflow compares each official PDF against the actual assembled StudyAI notes, checks textbook citations locally, and optionally proposes original worked lessons. Nothing is merged or deployed automatically.

## Deep Audit Mode (recommended default for Chapters 4–14)

The **one-click batch** now defaults to **review_depth=deep**. There is no artificial one-hour delay: additional time is spent on genuine work and independent validation. The same Actions button starts the entire chosen range, and nothing merges or deploys automatically.

**Five stages, each with independently checkable outputs:**

1. **PDF-grounded coverage inventory:** Gemini reads the official chapter PDF and all assembled StudyAI lessons (including approved overlays). It lists 8–40 significant concepts, the exact source page/short excerpt, existing lesson matches, and covered/partial/missing/uncertain assessments. Python verifies PDF citations and rejects sparse reports or reports that omit the chapter beginning/end.
2. **Adversarial gap review:** A separate Gemini request tries to disprove every suspected omission by checking existing explanations, worked problems, and alternate topic names. Every inventory ID must receive a verdict. Reviewer disagreements/uncertainty are flagged and never silently counted as confirmed gaps.
3. **Concept-first lesson drafting:** Only corroborated omissions may produce drafts. At most **four** substantial proposals per chapter, preferably folded into existing subtopics via validated `merge_into` targets. The system verifies the source evidence locally and rejects incomplete examples, invented target sections, and duplicate titles.
4. **Independent mathematics challenge:** Another distinct Gemini request attempts to recalculate every worked solution, formula and proof. `reject` or `uncertain` verdicts prevent that candidate from entering the generated draft overlay, and reasons are recorded.
5. **Independent final coverage and website QA:** A further separate Gemini request challenges whether every textbook inventory concept is already taught, fixed by accepted proposals, or still unresolved. Unsupported closure claims are flagged, and critical mathematical objections withhold the chapter's proposals. Conservative exact-rational arithmetic spot checks and GitHub Actions curriculum, progress-tracking and browser tests complete the review before creating one consolidated DRAFT PR.

**Reports:** `audit.md` contains a per-chapter coverage matrix, independent gap decisions, proposal verdicts, unresolved findings and stage counts. `audit.json` contains the full machine-readable details; evidence and proposals are archived in the run artifact and a condensed text report is included in the PR description. The workflow does not require manually downloading any audit files.

**Safety and limitations:** Two Gemini responses are not truly independent sources of truth. Mathematical checks cannot prove every possible theorem or example; the deterministic arithmetic checker only handles a narrow subset of purely numeric expressions. A matching PDF quote proves source provenance, not that a claimed gap is real. **Review the draft before merging, especially unverified mathematical steps, ambiguous conclusions and textbook coverage.** Deep mode uses three to five Gemini requests per chapter and can cost significantly more than standard mode; with eleven chapters a full batch may exceed 1–2 hours and API quota limits. The GitHub job timeout has been increased to six hours; this is a ceiling, not a promise that every batch will finish. Where a PDF/model stage fails, the chapter is marked blocked rather than treated as complete.

The `standard` review_depth remains available for quick historical comparison; its single-pass audits are not a substitute for deep mode.

## One-click bulk review (recommended for Chapters 4–14)

After the new workflow is reviewed and merged into `main`, open **Actions → NCERT Class 9 Maths — one-click batch review → Run workflow**. Defaults are **start_chapter=4, end_chapter=14, review_depth=deep, model=gemini-3.8-flash**. Click **Run workflow once**. The workflow runs **propose mode**, which already includes a textbook-grounded audit, so **do not run separate audits first**.

For the chosen inclusive chapter range, the workflow:
1. Exports all existing note pages **including the previously accepted NCERT review overlay**, so previously fixed gaps are not re-reported.
2. Audits each NCERT chapter PDF, validates quoted evidence against the PDF text, and asks Gemini for at most two high-value proposals per chapter.
3. Encourages `merge_into` targeting existing subtopics, with exact-section checks, to avoid dozens of duplicate lessons.
4. Retains previous accepted chapter revisions and creates one cumulative draft patch covering the range.
5. Runs offline regression checks, JS syntax, 14-chapter browser coverage, curriculum and lesson-progress browser checks.
6. Creates **one draft PR against `class9-maths-all-chapters-depth`** with the complete chapter-by-chapter audit in the PR description. The same reports are available in the GitHub Actions run summary and artifact: **no downloading/uploading audit.md to ChatGPT**.

If any chapter is blocked (NCERT/Gemini outage, unextractable PDF), the batch reports the blocker and fails rather than silently declaring the chapter complete. GitHub Actions artifacts preserve available results. Gemini API and GitHub Actions limits apply; 11 chapters may take time, incur charges, or hit rate limits. Use a smaller range to retry when appropriate.

**A successful job is not proof of mathematical accuracy.** Human/independent maths review of generated derivations and worked examples remains necessary before merging. Nothing is merged or deployed automatically. The pipeline does not yet support other grades/subjects/boards: each needs verified textbook manifests, appropriate note exporters, and subject-specific validation before reusing this workflow.

## Owner setup (required before using Gemini)

1. Review and manually merge the automation-only PR into the default branch, main. This does NOT merge the separate notes Draft PR #27.
2. Obtain your Gemini API key from Google AI Studio (https://aistudio.google.com/apikey). Check model pricing, quotas and usage. Public NCERT chapters and the website's notes will be sent to Google's API.
3. Open GitHub > your repository > Settings > Secrets and variables > Actions > New repository secret. Create a secret called GEMINI_API_KEY and paste your key there. Never add the key to source code or share it in chat.
4. If you want GitHub Actions to create draft pull requests, enable Settings > Actions > General > Allow GitHub Actions to create and approve pull requests. Otherwise the audit reports still work, but creating an automated PR may fail.
5. Open Actions > NCERT curriculum audit and lesson proposals > Run workflow. GitHub requires manual-dispatch workflows to exist on main, so this button is unavailable until step 1.

## Safest first run

Select chapter=1, mode=audit, model=gemini-3.8-flash. Download the Actions audit artifact and read audit.md plus audit.json. Only then use mode=propose for one chapter. After reviewing the output and usage costs, you can select chapter=all to process all 14 chapters.

The defaults are one chapter and audit-only: the automation never schedules paid calls or runs on every push.

## Workflow behaviour

1. Checks out the trusted automation code separately from the current notes source branch (class9-maths-all-chapters-depth).
2. Executes the existing full-notes and depth files in an isolated Node VM and exports all 14 real chapter structures.
3. Retrieves official NCERT chapter PDFs only from an allowlisted NCERT URL pattern.
4. Uses Gemini to compare the complete notes with the textbook and request explicit PDF-page evidence for claimed gaps.
5. Uses pypdf to verify that each short quoted phrase actually occurs on the claimed PDF page. Unsupported claims are rejected.
6. Rejects proposals without valid textbook evidence, a matching existing section, substantial paragraphs, original examples with full solution steps, or a unique title.
7. Produces audit.md, audit.json and candidate-lessons.json as downloadable GitHub Actions artifacts.
8. In propose mode only, makes a NEW branch from the latest unmerged notes branch, writes a deterministic JavaScript data overlay plus its single script reference, and runs syntax and full 14-chapter browser tests. If these pass, it opens a DRAFT PR against class9-maths-all-chapters-depth. The notes branch itself, main and production remain untouched.

The generated overlay contains AI-written prose strictly as serialized JSON data. No AI-supplied executable JavaScript is evaluated.

## Files

- automation/class9-maths/manifest.json — chapter names and 14 official NCERT PDFs
- automation/class9-maths/export-notes.cjs — actual chapter exporter
- automation/class9-maths/pipeline.py — PDF analysis, standard Gemini review, evidence gating and reports
- automation/class9-maths/deep_audit.py — multi-stage coverage inventory, adversarial gap checks, mathematical review, numeric QA
- automation/class9-maths/apply-proposals.py — safe and idempotent lesson overlay
- automation/class9-maths/test_pipeline.py — standard offline regression tests; no API key
- automation/class9-maths/test_deep_audit.py — deep mode adversarial and maths review regression tests
- .github/workflows/ncert-curriculum-audit.yml — manual API workflow
- .github/workflows/ncert-automation-smoke.yml — CI without API charges

## Critical limitations

A matching source quote proves that the quoted text exists, not that the proposed mathematical explanation or worked solution is correct. Review all generated mathematical steps before merging. Existing content must not be removed just because the model claims it is missing. Some NCERT PDFs may be temporarily unavailable; these chapters are reported as blocked, never guessed. Model requests may cost money and a 14-chapter run is subject to API quotas and workflow timeouts.

The exact same mechanism can later be adapted to Classes 10–12 and other boards, but they require their own verified textbook manifests and note-schema adapters.

For local tests:
    python -m unittest discover -s automation/class9-maths -p 'test_*.py' -v
    node automation/class9-maths/export-notes.cjs /path/to/notes-checkout > notes.json

## Resumable, quota-aware Deep Audit v2 (manual batch workflow)

The **NCERT Class 9 Maths — one-click batch review** workflow now starts conservatively
with Chapter 4 only, **at most six Gemini generate attempts per run**, and at least
25 seconds between attempts (including failed retry attempts). The API allowance
is a per-run safety cap, **not a guarantee of remaining Google quota**. Other
applications, projects or recent runs may already have used part of the daily
allowance. Google enforces token-per-minute independently; pacing alone cannot
guarantee there will be no 429 errors.

**First run:** Actions > NCERT Class 9 Maths — one-click batch review > Run workflow.
Select branch `main`, start chapter `4`, end chapter `4`, review depth `deep`,
the supported Gemini model available in your API project, leave `resume_run_id`
empty, and set the maximum attempts and spacing for your own current quota.
The workflow runs only when you click Run workflow. Do not run all 14 chapters
until you have reviewed the pilot and know your quota.

**If the run pauses or fails:** open the run's Actions page. Even when the audit
fails (and therefore cannot create a draft PR), the **Preserve validated checkpoints**
step uploads an artifact named `ncert-class9-checkpoints-<run-id>` with its validated
stage outputs. Download and retain a copy if you want; Actions artifacts expire
after **30 days**. To resume, manually dispatch the **same** workflow, on the
**same revision of notes**, with exactly the **same model and chapter range**.
Fill in `resume_run_id` with the previous Actions run's numeric ID. The workflow
downloads that run's artifact, and Python independently verifies PDF bytes,
notes, model, code fingerprint and exact stage prompts. A validated stage is
replayed without another Gemini generate request; a partially completed or
malformed stage must be retried. If sources or code changed, an existing
checkpoint is **rejected**, not quietly mixed with new material. Start fresh
(or re-run against matching source revisions) if that happens.

**Resuming after an automation code fix:** The normal fingerprint rejects
different audit-code versions. If you resume from a prior manual workflow run,
the workflow now checks out the **exact Git commit SHA of that trusted earlier
run** and recomputes the previous fingerprint from that code plus today's
textbook, exported notes and model. Reuse is permitted only when this old
fingerprint agrees with the downloaded checkpoint manifest, and only when
the exact stage prompt hash still matches and the current deterministic
validation passes. Changed textbook bytes, notes, model or prompts remain a
hard block. This is deliberately narrower than a general stale-cache override.

For the Chapter 4 failure on **11 Oct 2026**, the checkpoints are attached
to run `38125069123`. After merging the optional-final-omissions fix, manually
dispatch Chapter 4 again with `resume_run_id=38125069123`,
`restart_stage=none` and `max_api_requests=1`. If sources and prompt
fingerprints match, coverage, challenge, drafting and mathematical review
replay without Gemini calls, while closure uses just one new generate attempt.
This is not a guarantee against 429 errors or that final maths QA will approve
all lessons.

**Review-stage redo:** If the model previously returned unconvincing maths
verdicts (for example, wrong proposal IDs marked `uncertain`), choose
`restart_stage=math` and `restart_chapter=4` together with the previous
`resume_run_id`. The specified stage and all later stages are discarded
**only for that chapter**; validated coverage, gap challenge and writing
stages remain cached. This intentionally spends new Gemini requests on the
problematic stage, so use it only after reading the audit report. Use
`restart_stage=none` by default.

A paused chapter deliberately returns a failed workflow status, retaining
the report plus checkpoints and **skipping draft PR creation**. Resume from
the latest run ID (each resumed run creates its own snapshot artifact).
All mathematically uncertain, malformed or rejected proposals remain withheld.
The final browser/static tests are unchanged and must pass before creating a
draft PR. Stage outputs are review data, not authoritative facts or safe code.
Artifacts may contain your exported notes and model responses, so avoid
reposting them publicly or adding secrets to your notes.

**Caveats:** The existing single-job GitHub Actions upload executes on normal
exit and ordinary failures via `if: always()`; a runner disappearing or being
force-killed can prevent artifact upload. Gemini Files API uploads are not
counted in the `max_api_requests` generate-attempt cap, and Google's actual
billing and quota accounting govern. Cache replay of the PDF and source notes
is rejected if their bytes change (including updates to the textbook server).
Completed reports must still be read and mathematically checked by a human.
This workflow never schedules itself for the next day and never auto-merges.


## One-time opt-in automation for Chapters 5–14 (multi-day)

**Only after reviewing and merging the automation PR:** Open GitHub **Actions >
NCERT Class 9 Maths — opt-in multi-day Deep Audit > Run workflow**. Choose
operation **start**, model `gemini-3.8-flash`, and a conservative daily cap
(default **6 generate attempts**). **Start arms the following scheduled run**;
the start run itself does not call Gemini or spend API quota. GitHub's daily
schedule runs at **09:15 UTC (14:45 IST)**, after the Gemini daily quota's
Pacific-time reset. Scheduled GitHub Actions may start late or be skipped
during platform incidents. No model calls run on schedule at all unless the
manual **start** operation created an active state.

**Before starting**, complete review of draft Chapter 4 PR #43 and merge it
into the **notes branch** if approved. The system snapshots that exact notes
commit and the audit code commit at start. If the notes branch changes later
(including an unrelated approved lesson merge), it automatically **disarms
without Gemini calls** rather than mixing incompatible sources. You can use
operation **stop** at any time to disarm future runs. Operation **status**
prints the state without making model calls. To continue after a stopped or
attention-required run, a new manual start is required; starting anew does
**not automatically inherit prior batch checkpoints**.

**Daily behaviour**:
1. The scheduled workflow reads `.ncert-class9-multiday-state.json`
   from the dedicated `automation/ncert-class9-multiday-state` branch.
   This is a persistent metadata branch, separate from main, website code and
   the unmerged notes branch. It contains no API keys or AI content.
2. It refuses to run unless manually armed, the notes SHA still matches, and
   the current UTC date has not already been claimed. The day is claimed
   BEFORE calling the API to prevent duplicate daily spending.
3. It restores the previous scheduled run's validated checkpoint artifact
   (same strict fingerprint, model, notes, PDF bytes and prompts as Deep
   Audit v2), then reviews the whole Chapter 5–14 range. Earlier completed
   model stages are replayed without more Gemini generate calls.
4. Each day is capped at `daily_budget` actual **generate attempts,
   including temporary 503/429 retries**. A minimum 35-second interval
   spaces requests. Token and project-wide limits are external and may still
   trigger 429; this is a safety cap, not a guarantee of quota.
5. After the run, an Actions artifact captures checkpoints and a report
   even when the pipeline pauses. The state points to the newest checkpoint
   run only after GitHub confirms the artifact upload.
6. When **all ten chapters** are fully processed, the workflow checks that
   the original notes branch is unchanged, applies approved candidates,
   runs curriculum/lesson/browser regressions, and creates a **DRAFT**
   PR against `class9-maths-all-chapters-depth`. It then disables itself.
   **There is never an auto-merge or deployment.**

Any deterministic coverage/mathematics/schema block disables the schedule
until human inspection. If the API repeatedly fails without producing
new validated stages for **three consecutive days**, the schedule disarms
rather than spending quota indefinitely. When each day adds validated
checkpoints, these productive quota pauses **do not count as stalls**. If
a complete audit encounters browser or PR publishing errors, the next
scheduled run retries the publishing workflow using checkpoints; no new
model calls are required unless sources became incompatible.

**Duration:** the full Deep Audit typically involves approximately 3–5
model requests per chapter, or 30–50 model calls for Chapters 5–14.
With six attempts allowed per day, plan for **at least 5–9 scheduled days**
plus retries, outages, remaining quota and human checks. Daily GitHub
artifacts expire after 30 days; download reports if you need longer retention.
The state branch remains after completion for status/history; it is not a
secret store. Human reviewers must still verify the teaching and mathematical
proofs before merging lesson PRs.

**Important limitations:** This new schedule is untested against real Gemini
until you explicitly start it. Offline contract tests cannot guarantee
external PDF availability, actual API quotas or that model responses will be
valid. A runner termination before artifact upload can lose that day's
in-memory progress; the controller then requires human intervention.
`GITHUB_TOKEN` must be allowed to create draft pull requests, and workflows
must have the contents/actions/pull-request permissions specified in YAML.
