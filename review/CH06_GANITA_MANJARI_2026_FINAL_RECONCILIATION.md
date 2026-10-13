# Chapter 6, final curriculum reconciliation (2026–27)
Primary verified source: https://ncert.nic.in/textbook/pdf/iemh106.pdf, *Ganita Manjari* Part I, Chapter 6, 37 PDF pages, textbook pp.119–155. Checked the primary PDF against actual `main` Chapter 6 depth script and applied notes bank, **not Gemini scores**.

## Findings and action
- Sections 6.1–6.5: perimeter, C/D ratio, exact versus approximate π, historical polygon bounds, circumference, arcs, track staggers, semicircle-perimeter puzzles. Existing lessons and textbook-audit additions cover these. No duplicate topics added.
- Sections 6.6–6.9: area of rectangles, parallelograms, triangles, Heron's formula, isosceles/ratio problems, quadrilateral areas, Brahmagupta and incircle/circumcircle area identities. Existing extensive teaching and worked steps preserved.
- Section 6.10 and Exercise 6.3: πr², circle-sector arguments, segments, annulus, inscribed polygons and clock/wiper applications. Existing coverage retained.
- **End-of-chapter starred rectangle challenge (PDF p.32, printed p.150):** if two rectangles have the *same perimeter and area*, they must be congruent. Existing notes did not prove this joint invariant. Fixed in the existing 'Formulas and reasonableness checks' subtopic, by calculating (l−w)²=(l+w)²−4lw. Added an original 12-by-5 example.
- **End-of-chapter kite proof (PDF p.32):** existing notes discuss rhombus diagonals, but do not prove the kite formula. Added the geometry proof and a 14-by-10 worked example inside 'Triangles sharing base and parallels', with no new navigation leaf.

## Independent algebra checks
For a rectangle, set S=P/2=l+w and A=lw. Then |l−w|=√(S²−4A); the unordered pair of positive sides is uniquely determined by S and A. Example P=34, A=60: S=17, |l−w|=7, so sides 12 and 5. For a kite with perpendicular diagonals d1,d2, triangles sharing one diagonal as base have perpendicular heights summing to the other; their combined area is d1×d2/2. Example d1=14,d2=10 gives 70.

## Engineering gates
Preserve all existing section names, subtopic names, progress keys, UI and lesson reader. Append to two *existing* lesson objects, no new leaves or dependencies. Existing Chapter 6 replay guard prevents duplication. Run StudyAI's full CI, plus new Playwright reader/progress checks.

## Human editorial review still outstanding
Visually verify textbook Figs. 6.41–6.55, especially the kite, equal-area decomposition, crescent and four-petal figures. An exercise-by-exercise pedagogical pass has not been signed off by a human teacher. Passing CI is a technical gate, not proof of editorial perfection. No paid APIs used.
