# Chapter 2: Final NCERT Ganita Manjari reconciliation

Source: [official NCERT Chapter 2, Introduction to Linear Polynomials](https://ncert.nic.in/textbook/pdf/iemh102.pdf), *Ganita Manjari* Part I 2026–27, textbook pages 16–40 (25 PDF pages).

Review basis: actual `main` scripts `cbse-class9-maths-depth-ch02.js` plus the loaded `cbse-class9-maths-audited-proposals.js` layer. Earlier Gemini missing-concept claims were cross-checked against live source and not accepted as proof.

## Section-level reconciliation

| NCERT chapter | Existing website teaching | Independent result |
|---|---|---|
| 2.1 Expressions, terms, coefficients, one-variable polynomials, degree (PDF pp. 1–3) | Detailed polynomial terminology, classification, missing coefficients and exercises | **Minor terminology fix:** explicitly define *univariate* and distinguish from two-variable expressions in the existing lesson. |
| 2.2 Linear polynomial inputs, equations, real contexts (pp. 4–6) | Substitution, fraction/negative examples, inverse questions, equations | Covered. No duplicate topic. |
| 2.3 Linear patterns and base-charge auto-rickshaw fares (pp. 6–8) | Constant differences, nth-term reasoning, real-life rates | **Meaningful nuance fixed:** a flat price over an initial range followed by a per-km rate requires a piecewise rule across the full domain. Existing lesson now has a distinct original example with bounds. |
| 2.4 Linear growth and decay (pp. 8–11) | Review overlay already adds definitions, signed rate, 300−15t worked tank model and 0≤t≤20 domain | Covered. Previous omissions are not repeated. |
| 2.5 Finding rules from outputs, linear applications (pp. 11–17) | Two-point derivation, checks, inverse relationship | Covered at core level. |
| 2.6 Slope, intercept and parallel lines (pp. 17–21) | Review overlay already adds slope definition, graph steepness and two equal-slope distinct-intercept worked lines | Covered. No new slope lesson. |
| End-of-chapter multi-condition polynomials (pp. 21–25) | Existing basic rule recovery and one-polynomial inverse task | **Confirmed depth gap fixed:** a worked two-polynomial system with constraints, verified by substitution, inside the existing inverse-questions lesson. |
| End-of-chapter family of graphs y=ax+a (pp. 21–25) | General intercepts and zero calculation | **Confirmed conceptual gap fixed:** proof that nonzero parameter a gives common x-intercept (−1,0), with original examples of positive and negative slopes, inside existing intercept lesson. |

Also corrected an ambiguous pencil-box word problem so its written situation matches the algebraic expansion.

## Invariants
- No new note subtopic titles, headings, progress keys, routes, reader styles, UI components or external dependencies.
- Existing Chapter 1, Chapter 3–14 notes and all course navigation remain unchanged.
- No paid Gemini or other model/API use.
- Dedicated real-browser regression checks notes, original learning topics, the focused renderer, progress, idempotence, and both Chapter 1 and Chapter 2 data.
- Full StudyAI CI is the merge gate, including static, browser, curriculum-browser and Postgres.

## Editorial follow-up
1. A teacher should review the original textbook's graph illustrations (especially Figs. 2.8–2.14) alongside rendered lessons to judge legibility, slope scale and axis labels.
2. Check the chapter's pattern pictures (Fig. 2.4 etc.) and matchstick construction examples for visual explanation quality.
3. Check differentiated problem difficulty and the wording of the separate piecewise-fare example. *Ganita Manjari* states a degree-one rule for the extra-distance region only, not for the entire fare interval.
4. Review coverage of all numbered end-of-chapter questions at a pedagogical level. Coverage of transferable methods is not identical to a complete answer key.

Status: Source-aligned corrections, **not** a claim of full human editorial sign-off.