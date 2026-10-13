# Chapter 7: provisional audit, authoritative textbook blocked

The StudyAI manifest identifies Chapter 7 as **The Mathematics of Maybe: Introduction to Probability**, source `https://ncert.nic.in/textbook/pdf/iemh107.pdf`. On 13 October 2026 that official URL returned the **2025–26 old NCERT chapter "Triangles"** (19 pages) rather than the new Ganita Manjari probability chapter. This is a verifiable source mismatch, **not** evidence that the new probability textbook is complete or absent. Do **not** certify or merge this chapter's final audit while this link is wrong.

Cross-check of the new title, topics and 19-page length against published 2026–27 reproductions:
- https://www.ncerttextbooks.com/ncert-books/class-9/ganita-manjari/the-mathematics-of-maybe-introduction-to-probability/
- https://schools.aglasem.com/ncert-books-class-9-maths-chapter-7/
- https://www.studiestoday.com/ncert-class-9-ganita-manjari-chapter-07-the-mathematics-of-maybe-introduction-to-probability-pdf-download

## Audited actual GitHub `main` notes
`cbse-class9-maths-depth-ch07.js` has extensive original sections and independently reviewed in-file additions:
- Random experiments and probability-scale language.
- Experimental relative frequencies, long-run results and representative surveys.
- Fair/equally likely outcomes and unequal-likelihood sample spaces.
- Ordered choices, coin/dice sample spaces, conditional trees and without-replacement probabilities.
- Complements, disjoint union and double-counting checks.
- Grouped three-coin outcomes, probability from uniform area and probability misconceptions.
- Paper-cup data and real-world survey forecasts.

These features already appear in the **actual loaded main-branch script**, so additional duplicative subtopics are not warranted. The previous automated-missing audit has not been accepted as independent certification.

## Automated checks
Add a dedicated real-browser regression verifying the presence of existing notes, 3-coin sample-space calculations, event/complement examples and stable StudyAI progress keys. This is a technical check, not textbook source verification.

## Human/source tasks remaining
1. Obtain the **actual NCERT-published 2026–27 Chapter 7 PDF** from an authenticated official source; check edition, title, page numbers, every figure and all exercises rather than relying on legacy PDF codes.
2. Review the probability scale and qualitative words against the new NCERT figures, especially pictures and relative-frequency charts.
3. Audit the numbered chapter problems and worked answers one at a time for wording, arithmetic and clarity.
4. Keep this PR draft/unmerged even if all CI passes. No external paid APIs were used.
