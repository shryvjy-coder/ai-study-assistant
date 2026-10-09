# StudyAI NCERT Curriculum Automation — Class 9 Maths

A manual, review-first Gemini audit for all 14 chapters in the 2026–27 NCERT *Ganita Manjari* course. This workflow compares each official PDF against the actual assembled StudyAI notes, checks textbook citations locally, and optionally proposes original worked lessons. Nothing is merged or deployed automatically.

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
- automation/class9-maths/pipeline.py — PDF analysis, Gemini API, evidence gating and reports
- automation/class9-maths/apply-proposals.py — safe and idempotent lesson overlay
- automation/class9-maths/test_pipeline.py — offline regression tests; no API key
- .github/workflows/ncert-curriculum-audit.yml — manual API workflow
- .github/workflows/ncert-automation-smoke.yml — CI without API charges

## Critical limitations

A matching source quote proves that the quoted text exists, not that the proposed mathematical explanation or worked solution is correct. Review all generated mathematical steps before merging. Existing content must not be removed just because the model claims it is missing. Some NCERT PDFs may be temporarily unavailable; these chapters are reported as blocked, never guessed. Model requests may cost money and a 14-chapter run is subject to API quotas and workflow timeouts.

The exact same mechanism can later be adapted to Classes 10–12 and other boards, but they require their own verified textbook manifests and note-schema adapters.

For local tests:
    python -m unittest discover -s automation/class9-maths -p 'test_*.py' -v
    node automation/class9-maths/export-notes.cjs /path/to/notes-checkout > notes.json
