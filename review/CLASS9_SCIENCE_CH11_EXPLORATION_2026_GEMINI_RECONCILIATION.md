# Class 9 Science NCERT 2026–27 Chapter 11 curriculum reconciliation and independent fixes

## Provenance and editorial status

- Official NCERT identity: Grade 9 Science *Exploration*, Chapter 11 **Reproduction: How Life Continues**, official chapter PDF `iesc111.pdf`, printed pages **208–227**, https://ncert.nic.in/textbook/pdf/iesc111.pdf .
- **Access limitation:** The 10.8 MB PDF exceeds the web PDF parser's download size in this task and was not read directly as a local PDF. The current **2026 NCERT book transcription** at https://philoid.com/ncert/chapter/iesc111 was read and its linked original textbook diagrams were inspected where material, including Figure 11.24 https://philoid.com/assets/ncert/2026/iesc111/OEBPS/Images/202.png . This is cross-checking a mirror of the textbook, NOT claiming that the official PDF bytes were read. External teacher and diagram editorial review is still **outstanding**.
- User-supplied audit: `Pasted text(20261014-093000).txt` from Gemini, supplied in this conversation. The pasted note is used as an omission register, **not** as a source of automatically verified facts or code to paste without review.
- Repo baseline: StudyAI `shryvjy-coder/ai-study-assistant` on `main` prior to this feature branch. The 13 Class 9 Science legacy entries in `cbse-ncert-deep-notes-09.js` remain unchanged, as do all existing separate curated notes for Chapters 1–10 and state persistence. This makes **11 of 13** curated Chapter 9 Science chapters when merged, with two chapters yet to complete.
- The audit says `cbse-class9-science-full-notes.js` contains only Chapter 1. That observation is **stale/incomplete for the current repository**: full-note overrides already exist in ten separately loaded Chapter 1–10 files.

## Chapter-to-notes mapping

| NCERT lesson, activity or table | Where addressed in authored Chapter 11 |
|---|---|
| Introductory asexual versus sexual, inheritance and clones | Section 1, cloning versus meiosis/fertilisation and limits of absolute genetic identity |
| §11.1 natural propagation and Activity 11.1 | Section 2, potato, ginger, sugarcane, Bryophyllum, cutting, grafting (stock/scion), layering and apical-meristem tissue culture, KVKs |
| §11.1 Activities 11.2–11.3, Pasteur and fungal spores | Section 3, budding of yeast/Hydra, Rhizopus/Aspergillus reproductive structures, biogenesis; **no instructions to culture potentially unsafe moulds** |
| §11.2.1 Activity 11.4 meiosis | Section 4, 2n=46 versus n=23, independent assortment 2³=8 and 2²³=8,388,608, crossing-over caveat |
| §11.2.2 Activity 11.5 and Table 11.1 | Section 5, four floral whorls, anther/filament, stigma/style/ovary/ovules, longitudinal/transverse sections |
| §11.2.3 Activity 11.6 and Table 11.2 | Section 6, all **five** pea-flower treatments with bagged bud and stamen-removal timing, self versus cross pollen transfer |
| §11.2.4 Activity 11.7, Table 11.3 | Section 7, wind/insect pollen-to-seed lower/upper bounds, representative ratios, agent adaptation; Q12 apple orchard data and potential confounders |
| §11.2.5, P. Maheshwari and plant breeding | Section 8, pollen-tube to ovule and gamete fusion; zygote→embryo, ovule→seed, ovary→fruit; NCERT Q10 controlled sugar concentration investigations |
| §§11.3–11.4, Table 11.4 | Section 9, external vs internal fertilisation, examples of fish/frog/lizard/bird, egg number and larva/metamorphosis, exceptions to generalisations |
| §§11.5.1–11.5.4, Table 11.5 | Section 10, functions of reproductive organs, gamete comparisons, puberty and XX/XY simplified model, Indian IVF history |
| §11.5.5 and textbook Q3 | Section 11, fertilisation in oviduct versus delayed implantation in uterus and **textbook missing scientifically correct option** |
| §11.5.6, Fig 11.21 and Q13 | Section 12, illustrative 28-day calendar versus normal variability 21–35 days, ovulation timing and menstrual hygiene |
| §§11.5.7–11.5.8 | Section 13, three trimesters, medical/newborn care, family and ASHA worker support |
| §§11.5.9–11.5.10, Pause and Ponder 9–11 | Section 14, clear informational distinction between contraception and STI reduction, no medication access/use advice, CDRI Lucknow scientific history |
| NCERT Revise/Reflect/Refine Q1–Q13 | Section 15, thirteen complete scientific answer walkthroughs and one extra animal-biology extension |

## Material corrections to Gemini audit and textbook ambiguities

1. **NCERT Figure 11.24 was misread in the user's Gemini report.** The actual linked original image (the red/orange natural bars, grey-blue bee bars) shows **fruit set 26% natural → 40% with bee colonies**, and **premature fruit drop 35% natural → 8% with bees**. The audit's **18→37** and **28→11** values are wrong. The correct absolute differences are **+14 percentage points** fruit set and **−27 percentage points** drop; relative changes are approximately +53.8% and −77.1% respectively. Section 7 and two original diagrams show the correct graph values.
2. **NCERT Exercise Q3 has an apparent flaw in the multiple-choice options.** The assertion that the zygote 'immediately attaches' after fertilisation is FALSE; it divides in the oviduct for days before reaching the uterine lining. The reason that the uterine wall is 'always prepared' is also FALSE; receptivity is cyclic. The four printed answer options do **not include 'both A and R false'**. The notes identify the missing correct option rather than selecting an incorrect answer to fit the supplied choices.
3. **Clones and grafts:** Describing 'every clone absolutely genetically identical forever' ignores mutation, and grafting unites scion and stock of distinct genotypes. The lesson distinguishes scion/rootstock while explaining the practical aim of vegetative propagation.
4. **Pollination versus fertilisation:** The intact, bagged pea **bud** can already self-pollinate, whereas an emasculated bud enclosed BEFORE pollen transfer cannot. Late emasculation after flower opening may be too late. Germination and gamete fusion occur after transfer, not simultaneously.
5. **Quantitative ratios:** The textbook gives pollen-to-seed **ranges** not a single fixed wind value 5000:1 or insect 25–40:1. With the full range, wind can be approximately 2,500–20,000:1 and insect 20–50:1 for extreme endpoints. Representative centre-of-range calculation is explicitly labelled as illustrative, not exact biological law.
6. **Observed graph versus causality:** Since orchards A and B are at DIFFERENT sites, the figure suggests positive bee-colony association but cannot by itself exclude confounders such as cultivar, soil, weather and care. State this limitation while teaching the expected inference.
7. **Meiosis and 2²³:** Basic independent assortment counts intact homolog selection, not all possible gametes; crossing over adds further combinations.
8. **Human biology and IVF:** A clinician transfers an embryo during IVF; that transfer is NOT the same as guaranteed successful implantation. The introductory XX/XY model describes common chromosomal patterns but does not encompass every sex-development variation or gender identity. Menstrual Day 14 is a useful schematic, not a universal ovulation date.
9. **Reproductive-health information:** Condom barriers lower transmission risk of many STIs as well as pregnancy risk, while oral contraceptives and IUDs do not protect against STIs. These lessons are educational biology, not a medication or personal medical procedure guide.
10. **Mould activity and diagrams:** The notes teach observations of prepared images rather than providing directions for culturing environmental mould; the fifteen educational SVGs are original schematics, not copyrighted copies of NCERT figures.

## Engineering acceptance and release gate

- New `cbse-class9-science-ch11-full-notes.js`: **15 original deep teaching sections, 122 explanation paragraphs, 118 worked examples, 62 hidden-answer independent checks**, 15 exam tips. Loaded before primary `script.js`; exact title-keyed override is `Reproduction: How Life Continues`.
- New `cbse-class9-science-ch11-reader-enhancements.js`: 15 original scope-limited accessible SVG diagrams (each `<title>`, `<desc>`, `<figcaption>`), plus 62 `<details>` checks; no changes to state storage.
- Responsive `studyai-concept-figures.css` and `index.html` loaded after previous enhancement modules, before the long reader module. All pre-existing Science 1–10 tests change only expected curated bank count 10→11.
- New `tests/class9-science-ch11-ncert-depth-browser.cjs` tests real reader visibility/content, table/source markers, 118 examples, all 62 answer controls, corrected figure, Q3 warning, 390px mobile SVG bounds, rerender idempotence, prior Chapters 1–10, Chapter 12 isolation, and persistence.
- GitHub CI workflow adds syntax and new real-browser test. **Do not merge until all four jobs `static`, `browser`, `postgres`, `curriculum-browser` pass**. Once merged, confirm Render production deploy for exact new merge SHA.
- These checks demonstrate functional software behaviour; they **do not equal human subject-teacher or medical editorial certification**, which remains outstanding. No paid APIs.
