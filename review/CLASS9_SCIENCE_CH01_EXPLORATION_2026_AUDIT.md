# Class 9 Science · Exploration (2026–27) · Chapter 1 reconciliation

## Canonical sources

- Official NCERT PDF: https://ncert.nic.in/textbook/pdf/iesc101.pdf — printed chapter pages 1–7, Exploration: Entering the World of Secondary Science.
- Official CBSE IX Science 086 2026–27 syllabus: https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/ScienceSt_SecP1_2026-27.pdf.
- Existing current notes: cbse-ncert-deep-notes-09.js, with the original Class 9 Science book key and 13 chapter records.
- Existing website display: script.js → richDeepSections, which previously flattened science content into generic categories even when chapter-specific concepts existed.

## Audit findings against NCERT pp. 1–7

| Textbook passage/topic | Existing Chapter 1 content | Chapter-specific enhancement |
| --- | --- | --- |
| pp. 1–2: science develops testable knowledge using questions, models and assumptions | Present in deep-note overview and concise concepts | Cohesive model-scope explanation; cricket and school-cycle worked cases; excluded-factor limitations; Saha historical example |
| pp. 2–3: common vocabulary, units, equations; aircraft density mix-up | Present as short concept and reasoning bullets | Worked unit cancellation, numeric cycle-time example, pounds vs kilograms diagnostic, distinction of quantities from units |
| pp. 3–5: laws, theories, principles, prediction, evidence, revision, eclipse claim | Concept summaries present | Linked explanation separating observations, inference, hypothesis, predictions and scientific explanations, with testable rain case |
| pp. 5–6: estimation, rice and air breathing | Pre-existing air example and estimation tips | Two independent 10,000 L and 8,640 L estimates, explicit assumptions, dimensional checks and conditional rice estimation |
| pp. 6–7: interdisciplinary systems and scientific community | Present in brief general concepts | Mask case linking disciplinary contributions and integrated questioning method |

**Assessment:** Existing notes were not blank. The principal weakness was presentation and instructional depth, not an entirely missing chapter. No fabricated numerical score, AI-generated curriculum-certified claim, or duplicated full chapter bank is introduced.

## Scope and preservation

- Introduce cbse-class9-science-full-notes.js with **one** Chapter 1 entry, **five** logically grouped teaching sections, and original detailed paragraphs, worked examples, targeted tips and source reference.
- Load that small additive script before script.js. Preserve all 13 original Science chapter records, existing identifiers and deepNotes, and Mathematics files unchanged.
- When a curated full Science entry exists, show structured chapter notes rather than nine generic heading categories. Other Science chapters continue using existing notes until audited.
- Add real Playwright browser regression: open the existing Class 9 Science topic, verify actual text and worked examples, confirm original chapter count and check Maths progress outline stability.
- This change does **not yet** add Science-specific tickable leaf pages or completion rings; these need separate testing once the full Science lesson structure has stabilised.

## Targeted follow-up corrections (Chapter 1 only)

Compared against the seven printed pages of official NCERT `iesc101.pdf` on 13 October 2026:

- **p. 1:** Added a compact explanation of the magnifying-glass and compass page-design metaphor without creating another lesson.
- **p. 2:** Clarified that in an air-resistance-free projectile model, mass does not alter the trajectory for the same launch conditions; in more realistic models, mass may matter to drag. This reconciles NCERT's cricket list with the idealised model's assumptions.
- **p. 2:** Described Saha's focus on temperature, pressure, stellar gases and ionisation more precisely.
- **p. 3:** Explained the Latin origin of the speed-of-light symbol `c` and its exact vacuum value, as cited by NCERT.
- **pp. 4–6:** Added original independent self-check questions with answers hidden in semantic `<details>` disclosures; no new chapter or subtopic keys.
- **p. 5:** Completed the rice example numerically under explicitly hypothetical all-rice energy assumptions, while warning that the result is neither a real household requirement nor dietary guidance.
- **pp. 2, 6–7:** Added two accessible, authored diagrams of model-evidence revision and interdisciplinary mask filtration. They are original schematics rather than copies of NCERT pictures.

All five existing chapter teaching sections and nine existing worked-example records remain in place. Rendered additions are scoped specifically to Class 9 Science Chapter 1 through `cbse-class9-science-reader-enhancements.js`; existing Science chapters 2–13 and Mathematics completion storage are not touched.

**Verification still required:** Run the new focused Playwright assertions and the full GitHub CI suite, then perform teacher editorial and mobile/keyboard review. A passing code-level test does not certify teaching quality.

## Editorial review outstanding

- Teacher review for pedagogical level, scientific terminology and explanations.
- Verify appropriate labelled diagrams and meaningful visuals rather than decorative images.
- Check reader on small screens and with keyboard navigation.
- Extend the official-source process to Chapters 2–13. Technical chapters need individual concept verification, diagrams, experiments and numericals.
- Do not extrapolate passing Chapter 1 tests into certification of the other twelve chapters.

## Next-subject roadmap

1. Audit Class 9 Science Chapters 2–13 against official iesc102.pdf through iesc113.pdf, without auto-merging unverified AI material.
2. Audit the 2026–27 Understanding Society: India and Beyond Class 9 Social Science notes.
3. Audit the 2026–27 Kaveri Class 9 English notes with close reading, writing skills and original analysis (no copyrighted passages).
4. Confirm which additional language subjects should be included before spending effort on Hindi, Sanskrit or electives.
