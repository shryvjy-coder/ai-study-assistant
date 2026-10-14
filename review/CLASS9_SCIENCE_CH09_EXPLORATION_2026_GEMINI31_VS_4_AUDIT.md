# Independent Class 9 Science Chapter 9 review — NCERT Exploration 2026–27

**Source:** NCERT *Exploration: Textbook of Science for Grade 9*, Chapter 9 *Atomic Foundations of Matter*, official PDF `iesc109.pdf`, printed pp. 162–183 (22 PDF pages), https://ncert.nic.in/textbook/pdf/iesc109.pdf .

**Baseline:** GitHub `main` before this PR held only the five-concept `Atomic Foundations of Matter` legacy entry in `cbse-ncert-deep-notes-09.js`. The existing 13 Chapter 9 Science IDs and `deepNotes` entry are not touched by this upgrade. All curated Chapters 1–8 remain separate and intact.

**Auditors:** The user supplied an independently prompted Gemini 4 Argon Chapter 9 audit and Gemini 3.1 Pro Chapter 9 audit. Both identify the same major missing curriculum areas. Gemini 4's proposed replacement was more expansive; Gemini 3.1 Pro's proposed patch was shorter. **Neither audit is trusted as a guarantee of completeness**, and the generated snippets were not pasted into the repository verbatim.

## Textbook coverage reconciliation

| NCERT section | Essential content | Added lesson |
|---|---|---|
| §9.1 pp. 162–166 | Activities 9.1–9.3, open versus closed gas measurements, white precipitate reasoning, conservation, numerical Examples 9.1–9.2 | 1. Mass conserved |
| §9.2 pp. 167–168 | Proust's law, water 1:8 by mass, NaCl 23:35.5, CO 3:4, cinnabar and mixtures, Example 9.3 | 2. Constant proportions |
| §9.3 p. 168 | Dalton's six postulates, how they support both laws; atoms by number versus element mass ratios; isotope limits | 3. Dalton |
| §9.4.1 pp.169–172 | H₂, F₂, Cl₂, O₂, N₂, HCl, H₂O, CO₂, NH₃, H₂S bonds and valence electron sharing | 4. Covalent molecules |
| §9.4.1C pp.171–172 | mono/di/tri/tetra/penta/hexa nomenclature, vowel-drop conventions and named compounds | 5. Prefix names |
| §9.4.2 pp.172–174 | Na⁺, Cl⁻, K⁺, Ca²⁺, Mg²⁺, O²⁻, S²⁻, electron transfer and 3-D NaCl lattice | 6. Ionic bonding |
| §9.4.2A pp.174–175 | Table 9.1 monatomic and polyatomic ions, variable Fe/Cu charges, p/n/e for ions | 7. Ions and nuclear counts |
| §9.5 pp.175–177 | Covalent valencies, ionic criss-cross, reduction, parentheses, Al(OH)₃ versus AlOH₃, Table 9.3 all 12 pairs | 8. Chemical formulas |
| §9.6 pp.177–179 | Activity 9.4, water/kerosene/petrol solubility comparison, fixed versus mobile ions, sugar trap, melting and boiling point patterns | 9. Substance properties |
| §§9.7–9.8 pp.179–180 | All four numbered textbook Examples 9.4–9.7, nitric acid and methane, KCl and Mg(OH)₂, end exercise 8 masses | 10. Molecular and formula mass |
| Final exercises pp.181–183 | 15 NCERT questions with systematic reasoning, including NCERT Q3 ion balances, Q4 statements, Q13 limitations, Q14 molten ion issue, Q15 ion counts | 11. Integrated revision |

There are **11 substantive lesson sections, 83 original explanation paragraphs, 90 worked examples, 44 answer-reveal practice questions, and 11 original captioned SVG diagrams**. The lesson explicitly covers the NCERT four classroom activities and all seven numbered worked examples, and reinforces the skills needed for all 24 Pause and Ponder questions and 15 end exercises. Students should still use the textbook for exact question diagrams.

## Independent scientific corrections to proposed Gemini drafts

- A complete loss of visible mass from burning fuel in an open flask is **not** a violation of conservation of mass: oxygen from air reacts and gaseous products move beyond the measured beaker. Include the whole system.
- Dalton postulate 5 concerns **simple whole-number atom COUNT** ratios, not fixed ratios of elemental mass. Water has H:O = 2:1 by atom count but 1:8 by mass.
- The original claim of indivisible atoms and identical masses for all same-element atoms is a historical Dalton postulate, not an exact modern law; isotope evidence corrects it.
- Ionic crystal solids form an **extended lattice**; a formula unit is the smallest ion ratio, unlike discrete covalent molecules.
- Both auditors overgeneralised: 'all covalent compounds in water never conduct' is **false**. Sugar specifically dissolves into neutral molecules and remains very poorly conducting, but some molecular acids can produce ions in water. Also, not every ionic compound dissolves readily in water.
- Electron transfer between metals/nonmetals is a useful introductory model, not an infallible rule predicting every compound.
- Both models oversimplified NCERT Q13 by deriving which of chlorine/phosphorus is more reactive solely from octet-electron count. The lesson notes chlorine's common higher reactivity without treating electron deficit as a universal scientific proof.
- Chemical prefixes are for appropriate molecular binary compounds; do not name NaCl with molecular numeric prefixes. Standard names and exception conventions are taught explicitly.
- For NCERT end exercise 8, `H₃PO₄` is a molecular acid, so precise naming is **molecular mass**, even if the school exercise groups the calculations together. Do not misrepresent the distinction.
- When interpreting NCERT Activity 9.4, aqueous ion mobility rather than generic solubility determines conductivity; the same salt's solid, molten and dissolved states differ.
- No hazardous laboratory procedure is required to read these lessons. They discuss the textbook's observation and theory; experiments using toxic barium compounds or flammable liquids must remain under appropriate teacher control.

## Engineering integration and acceptance

- Add title-keyed override `cbse-class9-science-ch09-full-notes.js`, loaded before `script.js`; **do not change** `cbse-ncert-deep-notes-09.js`.
- Add `cbse-class9-science-ch09-reader-enhancements.js` after the reader, providing 11 accessible `<figure><svg title/desc>…</svg><figcaption>…</figcaption></figure>` visuals and 44 independent self-check question controls.
- Scope new styling to `science-ch09` to preserve previous readers and mobile layout.
- Extend the curated science bank from eight chapters to nine; only update older regression tests' bank count from eight to nine.
- Chapter 9 Playwright browser regression verifies full notes, reader routing and non-duplication, figures, 390 px mobile viewport, interactive answers, unchanged bookmarks/completions/Math progress, all existing Chapters 1–8, and no leakage to Chapter 10.
- Require all four CI jobs: `static`, `browser`, `postgres`, `curriculum-browser` before merge; confirm production Render deploy against merge SHA. Do not call a passing automation or an AI-generated audit equivalent to independent human subject-teacher certification. **Independent teacher and diagram visual editorial review are outstanding.**

No external paid API calls are needed.
