# StudyAI — NCERT Exploration 2026–27: Class 9 Science Chapter 2 reconciliation

## Primary reference and limitations

- **Textbook:** *Exploration: Textbook of Science for Grade 9*, Chapter 2, **Cell: The Building Block of Life**, NCERT reference `iesc102.pdf`, printed pages **8–27** (20 chapter pages).
- Official NCERT URL: https://ncert.nic.in/textbook/pdf/iesc102.pdf
- NCERT ePathshala chapter identification: https://epathshala.ncert.gov.in/topicc.php?id=0906CH02
- Independent text comparison: https://philoid.com/ncert/chapter/iesc102 (full chapter transcription, including activity and exercise text).
- **Source-access disclosure:** Official 11 MB PDF could not be fetched by automated readers during this patch; the ePathshala metadata and complete independently hosted textbook transcription were used to check major teaching concepts and activity/exercise coverage. Page-accurate visual reconciliation of every PDF figure remains an editorial task.
- Existing StudyAI note bank on `main` before this patch: `cbse-ncert-deep-notes-09.js`, 13 original Science chapter records; Chapter 2 only has a short overview, five concepts, generic reasoning and drawing prompts. Existing curated `cbse-class9-science-full-notes.js` contained Chapter 1 only.
- External AI-proposed patch was treated as a list of issues to verify, **not authoritative material to paste unedited**.

## Coverage reconciliation

| Chapter content (in textbook order) | Before this patch | New authored explanation and worked practice |
| --- | --- | --- |
| p. 8 onward: cell as unit of life, unicellular/multicellular, Puga Valley | Short cell definition | Meaning and qualification of origin-of-life hypothesis, organisational levels, thermophiles |
| Microscopy, observation and Activity 2.1 | Generic microscopy drawing prompt only | Resolution/contrast/magnification, historical context, field-of-view estimate 5 mm ÷ 25 cells = 200 µm, 10× × 40× = 400× |
| Cell membrane, lipid bilayer, osmosis and Activity 2.2 | `plasma membrane regulates exchange` only | Selectivity, fluid-mosaic model, diffusion, hypotonic/hypertonic/isotonic comparison, potato mass example |
| Cell walls, plasmolysis, Rhoeo/cheek cells and Activity 2.3 | Brief `plant cell wall supports shape` | Differing compositions of plant/fungal/bacterial walls, water loss, plasmolysis, plant/animal comparison, osmotic diagram |
| Cell interiors, Activity 2.4, bacterial/plant/animal differences | Five one-sentence concepts | Cytoplasm, nucleus and nucleoid, DNA/chromatin/chromosomes, RBC exception, structured comparison |
| Ribosomes, RER/SER, Golgi, lysosomes | `organelles perform functions` only | Protein-processing pathway, transport, lipid synthesis, lysosomal recycling, acrosome nuance |
| Mitochondria, plastids and vacuole | Brief organelle list | ATP, cristae, chloroplast/chromoplast/leucoplast, own DNA/ribosomes, plant-cell turgor |
| Growing onion roots, Activity 2.5 | Not taught | Root-tip observation interpreted, not a procedural unsupervised chemistry experiment |
| Mitosis and meiosis | Missing | Chromosome-number outcomes, growth vs reproduction, plant spore/gamete clarification, division diagram |
| Cell theory and synthetic biology | Cell theory one sentence | Schleiden, Schwann, Virchow, Haberlandt, Venter synthetic bacterial genome in an existing cell |
| Cell culture, contact inhibition, cancer and programmed cell death | Missing | Tissue control and differentiation, benign vs malignant concept, PCD as regulated process |
| Agro-processing and end-of-chapter potato cups | Missing | Osmosis/water availability in food preservation, intact-membrane potato-cup reasoning, original sample reasoning |

## Corrections to external AI suggestions

Do **not** paste its suggested four-section patch literally:

1. **Cell walls:** only the usual plant cell wall is primarily cellulose; typical fungal walls contain chitin and many bacterial walls contain peptidoglycan. Never imply all three are cellulose.
2. **Meiosis:** a simplified starting cell may yield four haploid products, but not all products become functional gametes. A human egg is produced with polar bodies. In flowering plants, meiosis produces spores that develop into reproductive structures; pollen itself is not a sperm cell.
3. **Cancer:** uncontrolled division is related to disrupted growth and survival regulation; a simple claim that any abnormal mitosis or contact-inhibition loss directly causes cancer is misleading.
4. **Sperm enzyme:** the acrosome is a Golgi-derived, lysosome-related structure; avoid telling readers that a typical free lysosome simply moves into an egg.
5. **Microbial food preservation:** concentrated salt/sugar can inhibit many microbes by lowering water availability; does not guarantee all microorganisms are killed.
6. **Editorial certification:** neither a passed browser test nor an AI claim certifies perfect NCERT alignment. Keep `reviewStatus` explicitly pending.
7. **Page references:** NCERT printed Chapter 2 pages run from **8 to 27**, not `1–27`.

## Engineering scope and invariants

- New standalone `cbse-class9-science-ch02-full-notes.js` adds **one** mapped Chapter 2 entry to the curated Science full-notes bank.
- Original `cbse-class9-science-full-notes.js` Chapter 1 object is **unchanged**.
- Original `cbse-ncert-deep-notes-09.js` and its 13 Science IDs and `deepNotes` are **unchanged**.
- Chapter 2 is rendered by the existing `class9CbseScienceNotes` with **8 cohesive sections, 20 worked examples/activities, 11 opt-in self-check questions and three captioned accessible diagrams**.
- `cbse-class9-science-ch02-reader-enhancements.js` composes with the Chapter 1 reader wrapper and injects material **only** when the exact CBSE Class 9 Science Chapter 2 is selected.
- `studyai-concept-figures.css` contains responsive diagram styling; no generic charts or irrelevant decorations.
- No changes to Maths tracking, source IDs, course dashboard, storage keys or backend.
- Extended Chapter 1 regression to accept exactly two curated Science chapters rather than one.
- Added isolated Playwright Chapter 2 browser regression, CI syntax check and curriculum browser job.

## Remaining editorial review

- Inspect the official PDF page images and confirm every figure's labels and scientific conventions against the original layout.
- Have an independent qualified teacher review the explanations' level and nuanced claims (cell theory, synthetic genomes, apoptosis, meiosis in plants).
- Test visual accessibility and small-screen presentation with real users, not only automated browser checks.
- Chapters 3–13 remain on the existing shorter note bank and require **separate** textbook audits; no broad upgrade is implied.

**Status:** targeted content and reader upgrades proposed on an isolated GitHub feature branch, awaiting CI. This document does **not** claim tests have passed or a PR has merged.
