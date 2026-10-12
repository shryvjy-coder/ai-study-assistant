# Chapter 1: Final NCERT Ganita Manjari curriculum reconciliation

Source of truth: [NCERT Chapter 1, *Orienting Yourself: The Use of Coordinates*](https://www.ncert.nic.in/textbook/pdf/iemh101.pdf), Part I, 2026–27, 15 PDF pages. Reviewed against the **actual main-branch StudyAI rendered-note layers** and existing Chapter 1 depth code, not Gemini ratings.

## Textbook section-by-section review
| NCERT coverage | Existing StudyAI notes found on main | Independent outcome |
| --- | --- | --- |
| §1.1 origins, Indian grids, navigation and Cartesian coordinates (PDF pp. 1–2) | Historical ideas and modern grid, change of reference origin | Covered. History chronology is not independently fact-checked outside NCERT. |
| §1.2 tactile room floor map and 2D limitation (pp. 2–3) | Tactile-map accessibility, scale, doors, floor plans | Covered. Diagram-specific furniture collision exercises still benefit from a human illustration review. |
| §1.3 axes, ordered pairs, signs, quadrants, axis points, perpendicular projections (pp. 3–8) | Cartesian plane, quadrants, reflection, plotting, signed axis distances, reviewed perpendicular-distance proposal | Covered. No extra page added. |
| Exercise 1.2: deduce a rectangular table's fourth leg; identify whether the floor map gives the tabletop height (p. 8) | A fully specified rectangle example, but no solved missing-fourth-vertex and dimensional-limit example | **Gap confirmed, fixed inside existing “Drawing shapes from vertices” subtopic.** |
| §1.4 Pythagoras, coordinate differences, distance formula, reflections (pp. 8–12) | Pythagorean distance proof, both axial distances, exact distances, axis reflections | Covered. No duplicate distance lesson created. |
| End exercises: collinearity, triangle type, midpoint, trisection, side-midpoint reconstruction (pp. 12–13) | Existing advanced lessons and previously reviewed triangular-side-midpoint overlay | Covered. Preserve the existing notes and progress keys. |
| Exercise 14: multiple city-grid intersections sharing unsigned (4,3) label (pp. 13–14) | General map origins and scales, but not the four-direction ambiguity | **Gap confirmed, fixed with an original worked example within “Historical ideas and the modern Cartesian grid”.** |
| Exercise 15: circular icons, their boundaries and overlap (p. 14) | Screen containment, circle-inside/outside tests and two-circle intersection | Mostly covered. **Missing internal-tangency and concentric-circle boundary cases corrected inside the existing circular-regions lesson.** |
| Exercise 16: determine whether a tilted quadrilateral is a square and find area (p. 14) | Square proof from squared side lengths and perpendicularity | Covered. |

## Engineering preservation
- Existing chapter section and subtopic titles are unchanged. No new pages, renames, progress IDs, sidebar routes, reader changes, or dependencies.
- A one-time guard on the Chapter 1 script prevents duplicate lesson/exercise insertion when the script is loaded twice.
- Continue to calculate audit metrics after the refinements.
- Added real-browser Chapter 1 regression to GitHub CI to check earlier lessons, targeted corrections, duplicate loading, reader navigation and unmodified progress counts.
- No external paid API calls.

## Independent mathematics checks
- Rectangle: A(2,5), B(8,5), C(8,1) imply D(2,1); side lengths 6 and 4. A planar floor map cannot determine a vertical height.
- Street spacing 200 m: horizontal offset 4×200=800 m, vertical offset 3×200=600 m. Four signed crossings combine ±800 with ±600 if numbered symmetrically on both sides of the central roads.
- Tangency: centres (0,0) and (3,0) have distance 3, equal to |5−2|. Two positive-radius circumferences have exactly one internal contact point (5,0).

## Still requiring editorial review
1. Visually compare all room-map and reflective-geometry diagrams, especially NCERT Figs. 1.1, 1.3, 1.5, 1.7–1.9, to StudyAI illustrations. Numerical/text review does not replace human accessibility and graphic review.
2. Check historical dates and priority claims with qualified historical sources if they are presented as established facts rather than textbook background.
3. Perform a teacher's reading-level and pedagogy pass on examples, and ensure exercises are phrased as **original StudyAI examples** rather than copied NCERT answer keys.
4. End-of-chapter challenge questions are represented by techniques, not necessarily by a separate worked solution for every original numbered exercise. Do not advertise the chapter as human-certified or perfectly exhaustive.

**Status:** Reconciled against the official NCERT text. Automated CI and independent editorial sign-off are separate gates. Do not mark VERIFIED_AUDITED based on an LLM score.
