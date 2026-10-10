# StudyAI NCERT Curriculum Automation — Class 9 Maths

A manual, review-first Gemini audit for all 14 chapters in the 2026–27 NCERT *Ganita Manjari* course. This workflow compares each official PDF against the actual assembled StudyAI notes, checks textbook citations locally, and optionally proposes original worked lessons. Nothing is merged or deployed automatically.

## Deep Audit Mode (recommended default for Chapters 4–14)

The **one-click batch** now defaults to **review_depth=deep**. There is no artificial one-hour delay: additional time is spent on genuine work and independent validation. The same Actions button starts the entire chosen range, and nothing merges or deploys automatically.

**Five stages, each with independently checkable outputs:**

1. **PDF-grounded coverage inventory:** Gemini reads the official chapter PDF and all assembled StudyAI lessons (including approved overlays). It lists 8–40 significant concepts, the exact source page/short excerpt, existing lesson matches, and covered/partial/missing/uncertain assessments. Python verifies PDF citations and rejects sparse reports or reports that omit the chapter beginning/end.
2. **Adversarial gap review:** A separate Gemini request tries to disprove every suspected omission by checking existing explanations, worked problems, and alternate topic names. Every inventory ID must receive a verdict. Reviewer disagreements/uncertainty are flagged and never silently counted as confirmed gaps.
3. **Concept-first lesson drafting:** Only corroborated omissions may produce drafts. At most **four** substantial proposals per chapter, preferably folded into existing subtopics via validated `merge_into` targets. The system verifies the source evidence locally and rejects incomplete examples, invented target sections, and duplicate titles.
4. **Independent mathematics challenge:** Another distinct Gemini request attempts to recalculate every worked solution, formula and proof. `reject` or `uncertain` verdicts prevent that candidate from entering the generated draft overlay, and reasons are recorded.
5. **Deterministic/website QA:** A conservative exact-rational arithmetic checker spot-checks explicit numeric equalities, unresolved gaps are reported, and GitHub Actions runs the curriculum, chapter, progress-tracking and browser tests before creating one consolidated DRAFT PR.

**Reports:** `audit.md` contains a per-chapter coverage matrix, independent gap decisions, proposal verdicts, unresolved findings and stage counts. `audit.json` contains the full machine-readable details; evidence and proposals are archived in the run artifact and a condensed text report is included in the PR description. The workflow does not require manually downloading any audit files.

**Safety and limitations:** Two Gemini responses are not truly independent sources of truth. Mathematical checks cannot prove every possible theorem or example; the deterministic arithmetic checker only handles a narrow subset of purely numeric expressions. A matching PDF quote proves source provenance, not that a claimed gap is real. **Review the draft before merging, especially unverified mathematical steps, ambiguous conclusions and textbook coverage.** Deep mode uses up to four Gemini requests per chapter and can cost significantly more than standard mode; with eleven chapters a full batch may exceed 1–2 hours and API quota limits. The GitHub job timeout has been increased to six hours; this is a ceiling, not a promise that every batch will finish. Where a PDF/model stage fails, the chapter is marked blocked rather than treated as complete.

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
