# Chapter 13 Ganita Manjari audit reconciliation (12 October 2026)

Reference: NCERT *Ganita Manjari*, Grade 9, Part II, Chapter 13, *Two Variables, One Line*, textbook URL `https://ncert.nic.in/textbook/pdf/iemh205.pdf` (reported pp. 85–122).

## Source-access scope

The NCERT PDF endpoint could not be retrieved for a complete page-by-page independent review in this development session (upstream timeout). Public chapter excerpts and independently published chapter maps were consulted alongside the real GitHub source. This PR therefore **does not claim complete textbook verification, certification, or a reproduced numeric audit score**. A full comparison against the actual NCERT PDF, exercises and diagrams remains for human editorial review.

## Audit claims corrected against current code

The protected `class9-maths-all-chapters-depth` branch already has `cbse-class9-maths-depth-ch13.js`, SHA `ef7261cecf8f24e7a0341d596fc7de7632040a5e`. Unlike Gemini's PR #27 snapshot, the authored file ALREADY includes:
- Standard form, multiple ordered-pair solutions, scalar-equivalent equations.
- Coordinate tables, intercepts, slope, undefined vertical slope, horizontal/vertical line equations and slope-intercept form.
- Pairs of equations, worked substitution and elimination methods, simultaneous ticket word problem.
- The graphical cases intersecting, parallel and coincident, with a zero/nonzero determinant distinction.

Thus the claims that all simultaneous equations and both algebraic solution methods are absent, or that a vertical slope is not identified as undefined, are false for the actual protected source. The numerical scores (84/52/58/62/65 and 64.2 composite) are model estimates without an independently reproduced rubric.

## Evidence-backed instructional gaps improved

- Explicit a²+b²≠0 condition and zero-coefficient/axis special cases.
- Reversible nonzero scalar-equivalence proof and origin-pass criterion.
- Degenerate intercept plotting, sensible modelling domain, and reasoned slope independence.
- A 1:12 ramp problem **posed as an exercise condition**, not a claim of a universal building mandate.
- Worked rate/fee, ticket and library models for two unknowns.
- More fully checked elimination and substitution calculations, including fractions and parentheses.
- Optional efficient symmetric coefficient method, explicitly handling a=b and a=−b without division by zero.
- Full three-case coefficient consistency classification, with cross-products/determinant to avoid zero-denominator ratio tests.
- Explain why equal slopes with distinct intercepts implies a contradiction, and show all three graphical outcomes.

No detached duplicate algebraic-method section was added. Two necessary new focused subtopics fit the existing 'Pairs of linear equations' lesson group. Stable original leaf titles and the protected draft are untouched. The perpendicular-line slope product remains in the authored source with an explanatory designation as optional later-study enrichment, rather than being silently deleted.

## Gemini patch defects not inherited

- Duplicate curriculum sections and already-present solution methods are not copied.
- No unreviewed `VERIFIED_AUDITED` flag or redundant `ch13` audit registry entry.
- No Mocha-only mocked test suite; a real Playwright/browser regression follows StudyAI's existing runner.
- No assumption all coefficient ratios are defined, and no unguarded division by a+b or a−b.
- No unsupported statement that all accessibility ramps globally must use a 1:12 standard.
- Mathematical formulas use existing reader-compatible plain text/Unicode, not raw JavaScript strings with malformed LaTeX escapes.

## Required verification

Run the repo's four standard CI jobs: static, curriculum-browser, browser, postgres. The Chapter 13 browser test must check actually rendered material, all original focused pages, additive teaching pages, unique progress keys, re-load idempotency and independent worked-example arithmetic. Merge only after those checks pass and verify the new main commit plus hosted smoke result.

Protected branch, user progress, automated NCERT audit queue and Gemini API configuration must remain unchanged.
