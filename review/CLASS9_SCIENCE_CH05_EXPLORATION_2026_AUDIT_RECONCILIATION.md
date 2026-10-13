# StudyAI — Independent NCERT Exploration Class 9 Science Chapter 5 reconciliation

**Subject:** Science, **Chapter:** Exploring Mixtures and their Separation, **textbook reference:** `iesc105.pdf`, printed pages **72–93** (22 PDF pages); 2026–27 curriculum.

## Primary materials and access disclosure

- Official NCERT PDF: https://ncert.nic.in/textbook/pdf/iesc105.pdf . The automated official-document fetch returned a **file-too-large** error, so do not claim that the official NCERT server delivered the complete document to the model.
- The full, matching 22-page textbook PDF reproduction at https://www.evidyarthi.in/wp-content/uploads/2026/04/book-class-9-science-Exploration-chapter-5-pdf-download.pdf was inspected, including page images of Fig. 5.6, the distillation figure, paperfuge/coagulation and Activity 5.9; cross-checked against https://philoid.com/ncert/chapter/iesc105 .
- Delhi Directorate of Education's 2026–27 syllabus specifies solution concentration formulas, separation mechanisms, solubility graph reading and societal applications: https://edustud.nic.in/edu/Syllabus_2026_27/9/9_science_Annualsyllabus_EM_2026_27.pdf .
- Current StudyAI `main` legacy source prior to this patch: `cbse-ncert-deep-notes-09.js`, retaining one short Chapter 5 overview, five concept bullets and generic reasoning/visual prompts; `cbse-class9-science-full-notes.js` and later curated files covered Chapters 1–4, not Chapter 5.
- The user's Gemini audit is a **lead to verify**, not an authoritative patch. Its numerical scoring is subjective and **not** used to claim measured curriculum achievement.

## Confirmed gaps and verified teaching corrections

| Textbook concept/activity | Printed pages | Existing StudyAI level | New original teaching coverage |
| --- | --- | --- | --- |
| Solution vs heterogeneous mixtures; Activity 5.1 | 73–74 | Short definitions only | Salt/chalk/milk observations, ordinary filtration, settling, scattering, plus homogeneous solid alloys |
| Solute/solvent, % m/m, % m/v and % v/v | 74–76 | Concentration definition, no formula | Three exact relationships, NCERT Examples 5.1–5.3, worked fruit juice, flour, labelled component, brass and unit cases |
| Solubility, graph Fig. 5.6, Activity 5.2 | 76–77 | Not taught quantitatively | Axis-reading, trend differences, saturation, approximate plotting precision, scaled water-mass calculations |
| Crystallisation Activity 5.3, salt Activity 5.4, historical box | 77–80 | Named method only | Cooling a saturated solute, *exact* B solubility at 60°C 287 g and 40°C 241 g per 100 g water, hence **46 g crystallises**, with model assumptions; differences from evaporation; panga/karkatch salt |
| Distillation, fractional distillation, India's fragrance traditions | 80–81 | Listed technique | Vapour/condensate, simple-vs-fractional comparison, meaning and **approximate** nature of 25°C rule, petroleum fractions, Kannauj's Deg-Bhapka |
| Paper chromatography Activity 5.5 | 82 | Named technique | Solvent migration/capillary action, interpreting multiple bands, why source spot must remain above reservoir, source ink/baseline reasoning |
| Separating funnel Activity 5.6 | 83 | Generic physical-property clue | Immiscibility plus density, oil/water layers, conceptual limit of low density contrast/emulsions |
| Sublimation/deposition Activity 5.7 | 84 | Named technique | Phase-change explanation, cooler deposited solid versus retained nonsubliming material, reason for diagrammed vapour-loss reduction |
| Centrifugation, paperfuge Activity 5.8, coagulation | 85–86 | Technique name only | Density-based separation, responsible rotating-frame explanation, paperfuge, alum flocculation, distinct milk-protein coagulation and environmental treatment |
| Colloids, blood, emulsions, Tyndall effect, Activity 5.9 | 86–89 | Short solution/colloid distinction | Size ranges as simplified model, continuous medium/dispersed phase, milk/butter, light scattering, detailed solution/suspension/colloid properties |
| Revise/Reflect/Refine and societal uses | 90–93 | Little application practice | Cake mixture 75/420/5 g = **15/84/1% m/m**, 70% brass in 120 g = **84 g Cu +36 g Zn**, recycling and safe water clarification limitations |

## Scientific/editorial changes made rather than copying the Gemini patch

1. **Distillation:** NCERT states simple distillation is suitable for relatively large boiling-point differences, around 25°C or more. This is a useful *school-level guide*, not a universal physical cutoff. Neither simple nor fractional distillation guarantees a perfectly pure fraction.
2. **Crystallisation:** A graph reading is available: B at 60°C 287 g per 100 g water; at 40°C 241 g. Subtraction gives **46 g**, assuming no water loss and equilibrium. Crystal recovery is not guaranteed perfectly pure.
3. **Gas and solid solubility:** Temperature trends are generally true, not universal; temperature and pressure conditions should be specified especially for gases.
4. **Centrifugation:** In a rotating frame a centrifugal term is used; do not teach that a physical outward force automatically acts on every particle in every inertial description. Density, particle size and medium influence separation.
5. **Colloids and blood:** NCERT simplifies blood into the colloid category, but red blood cells are much larger than 1–1000 nm; the material is actually a complex multicomponent dispersion, not exclusively nanoscale colloids.
6. **Tyndall effect:** Suspensions also scatter light, so light scattering alone cannot perfectly differentiate a colloid from a suspension.
7. **Percentage formulas:** All three require **complete solution** in the denominator. The final volume of mixed liquids need not be exactly the sum of their component volumes.
8. **Experimental safety:** NCERT includes teacher-supervised copper sulfate/acid operations, volatile-liquid distillation, heated sublimation illustrations and blood-related demonstrations. The authored chapter teaches the *scientific interpretation* and diagrams but contains no unsupervised protocols for risky laboratory activity.
9. **Avoid arbitrary performance ratings** and an automated claim that teacher review is done.

## Engineering scope

- Added standalone `cbse-class9-science-ch05-full-notes.js` containing **8 coherent teaching sections, 32 substantial instructional paragraphs, 34 worked reasoning/math examples and 17 opt-in self-check questions**; uses existing `CBSE_CLASS9_SCIENCE_FULL_NOTES` mapping.
- Added `cbse-class9-science-ch05-reader-enhancements.js` with **7 original, captioned and accessible SVG teaching figures** (mixture classes, three percentages, labelled solubility graph, distillation concept, chromatography, phase/density distinction, Tyndall scattering) scoped to Chapter 5, with `<details>` answer reveals.
- `index.html` and `studyai-concept-figures.css` include only additive source and responsive styles.
- Original 13 Class 9 Science records, IDs, `cbse-ncert-deep-notes-09.js`, the existing curated Chapters 1–4, user saved progress and Maths progress identifiers are preserved.
- Earlier Science browser tests updated only for **five** curated-note entries rather than four; a new real Playwright Chapter 5 regression tests Maths and Science progress preservation, seven figures and accessibility labels, 390px mobile sizing, 17 answer reveals, example calculations and chapter isolation. New files are syntax-checked and included in the full CI workflow.

## Remaining checks and editorial work

- Require all four GitHub CI jobs `static`, `browser`, `postgres`, `curriculum-browser` to pass before merge.
- A human teacher and accessibility reviewer should inspect chapter diagrams and written explanations in the rendered website, including mobile graph labels.
- A passed Playwright regression supports reader integrity but is not a full pedagogical certification.
- Chapters 6–13 remain at the original, shorter note level and need individual NCERT audits.

**Status:** source content reconciled and patch proposed in a feature branch; CI and teacher review are separate requirements.
