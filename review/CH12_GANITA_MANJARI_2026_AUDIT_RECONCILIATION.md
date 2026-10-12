# Chapter 12 — NCERT / Gemini audit reconciliation (12 October 2026)

Primary textbook: official NCERT *Ganita Manjari*, Grade 9, Part II,
Chapter 12, `https://ncert.nic.in/textbook/pdf/iemh204.pdf`, pp. 51–84
(PDF pages 1–34). This is a content change review, not an independent
certification that all textbook mathematics has been checked.

## What the Gemini report got wrong

- Its claim that the Midpoint Theorem and converse, centroid, tiling, and
  Varignon theorem are entirely absent is **not true of the protected
  `class9-maths-all-chapters-depth` source**. Its `ch12.js` already teaches
  them in the groups “Triangle midpoint theorem”, “Medians and parallelogram
  reasoning”, and “Tiling with quadrilaterals”. The source was *not* included
  in `main` at the time of the audit. We brought it into this PR intact.
- The suggested 66.2/100 overall score is an unsourced model judgment rather
  than a measurement from a validated assessment rubric; it has not been
  reproduced as a factual score.
- In the textbook, the core exposition is §12.1 (precise quadrilateral
  definition), §12.2 (parallelogram properties/tests), §12.3 (the Midpoint
  Theorem, converse, centroid, Varignon theorem) and §12.4 (tilings).
  There is no §12.4 containing a full kite/isosceles trapezium chapter.
  “Kites and isosceles trapeziums” are therefore flagged optional enrichment;
  the *trapezium median formula* **is** explicitly assigned in end exercise 7.
- The supplied test uses Mocha `describe`/`it` without checking that the
  test runner is installed, and only tests structural assertions and canned
  phrases. It cannot validate the accuracy of geometric proofs.
- Strings such as `'\text{Planar Quadrilateral}'` in raw JavaScript string
  literals lose escape characters. Our notes follow the existing visible
  Unicode/reader formula schema instead of importing the patch literally.
- The supplied tiling explanation assumes four angles summing to 360°
  proves an entire plane can be tiled. **Local angular fit is insufficient**:
  an edge-matching construction must continue without overlaps or gaps.
  NCERT §12.4 demonstrates the 180° edge-midpoint-rotation construction,
  and reserves a global proof for starred end exercise 23.
- NCERT end exercise 13(ii) asks about the exceptional case where the
  Varignon parallelogram degenerates into one segment. We included the
  nondegenerate condition when classifying its special shapes.

## What this PR preserves and improves

- Preserve six existing major chapter lesson groups, existing subtopic
  names and stable stored progress keys, worked examples and authored text.
- Strengthen existing proofs of the midpoint theorem and its converse,
  centroid theorem, Varignon theorem, and plane tiling; **do not duplicate**
  these under misleading new core headers.
- Add NCERT Definition 1 exclusions of skew, crossing, collinear and open
  four-gons; a concave angle-sum proof; diagonal counterexamples.
- Add the trapezium median result and a worked application corresponding
  to NCERT end exercise 7, plus Varignon rectangle/rhombus/square
  characterisations (with nondegeneracy cautions).
- Include isosceles trapezium/kite examples as **optional enrichment**,
  not claimed as a mandatory §12.4.
- Update the depth audit inventory after adding legitimate authored leaves,
  but label status *editorial review required*, never automatically
  `VERIFIED_AUDITED`.
- Add a full-browser regression testing the actually rendered Chapter 12,
  its section/leaf counts and progress keys, proofs/examples presence,
  reload idempotency and absence of uncaught JS errors.

## Editorial review still needed

A knowledgeable mathematics reviewer should check the geometry and exam
alignment before claiming comprehensive proof-level certification. Full
re-audit of all official end exercises, optional starred problems, and
diagram accuracy is beyond the deterministic browser test. No production
user data, prior reviewed chapters, pinned automation checkpoint state, or
protected notes branch are changed by this PR.
