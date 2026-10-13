# StudyAI Class 9 Science Chapter 7: independent NCERT curriculum reconciliation

**Textbook:** NCERT *Exploration · Textbook of Science for Grade 9* (2026–27), Chapter 7 **Work, Energy, and Simple Machines**, `iesc107.pdf`, printed pp. **116–139** (24 PDF pages).

## Sources and verification

- Official NCERT chapter: https://ncert.nic.in/textbook/pdf/iesc107.pdf . Reviewed the textbook sections 7.1–7.6, worked Examples 7.1–7.13, Activities 7.1–7.5, relevant chapter questions, and key drawings of the force–displacement graph, inclined planes, pendulum and lever. Textbook exercises Fig. 7.37 and Fig. 7.39 also informed the new worked problems.
- Directly inspected GitHub `main` versions of `cbse-ncert-deep-notes-09.js`, the Chapter 6 reader implementation and its real-browser tests, `index.html`, `studyai-long-notes.js` and the CI configuration.
- User-supplied Gemini 4 Argon audit (13 October 2026) was treated as a defect checklist. The uploaded patch and scores are **not** an independent certificate of completeness.

## Principal changes

| Textbook topic | Verified previous gap | New content |
|---|---|---|
| 7.1 work, signs and zero work | Definitions without numerical treatment | 1 J units, agency/object distinction, work in same/opposite/perpendicular directions, goalkeeper –30 J, held barbell, friction, slow lowering |
| Force–displacement graphs | No graphical area method | Constant, triangular, trapezoidal and below-axis signed areas; exact Fig. 7.37 force polygon 25+100+25=150 J, speeds 6 and √66 m/s |
| 7.2 work–energy theorem | No mathematical theorem/energy-accounting distinctions | W_net=ΔK, K_i+U_i+W_nonconservative=K_f+U_f, carrom energy transfers and friction |
| 7.3 energy forms | Brief reference without examples | Mechanical, thermal, light, sound, electrical, chemical and nuclear; motor, fan, plants and watermill |
| 7.4.1 kinetic energy | No formula, derivation or numericals | Derive ½m(v²−u²) from F_net=ma and v²−u²=2as; 184.9 J cricketer's ball, speed quadrupling, 70 m/s aircraft, equal-K masses |
| 7.4.2 potential energy | No U=mgh, path independence, elastic vs gravitational scope | Derive U=mgh with reference height; Activity 7.1 sand impression; Example 7.7 200 g ball at 10 m = 20 J; stairs versus lift |
| 7.4.3 conservation | Missing full proof and loss accounting | At intermediate height show K+U=mgh; Activity 7.2 pendulum; frictionless slides √(2gh); NCERT escape ramp =20 m; air drag and PE–position graphical constraint |
| 7.5 power | No calculation or units | P=W/t, watt/hp, textbook barbell 300 W and accelerating car 20 kW |
| 7.6 pulleys | Only mentioned by name | Fixed versus movable ideal pulleys, MA=load/effort, rope-strand balance, ideal distance trade-off and efficiency |
| 7.6 inclined planes | No model or quantitative problems | Activity 7.3, ideal MA=L/h, triangle geometry 30–40–50, realistic friction limitations |
| 7.6 levers | No actual lever teaching | Activities 7.4–7.5, moments and n₁L₁=n₂L₂, class I/II/III placement, Example 7.13 seesaw 15×2=30×1 |

## Specific Gemini draft corrections

1. Its five teaching sections and nine worked examples do not cover all textbook problems with sufficient teaching depth. The replacement has **10 coherent sections, 50 substantive explanations, 50 fully worked examples and 31 practice answers**, without moving a student's Chapter 7 record or renaming its title.
2. `W=ΔE` is too broad if applied indiscriminately. For translational motion the precise **net** work–kinetic energy theorem is `W_net=ΔK`. For mechanical system accounts involving potential energy, use `K_i+U_i+W_other=K_f+U_f` with careful system boundaries.
3. The uploaded coconut calculation treated sand as the only force acting during the depression. Its approximate **5 cm** is appropriate if gravity during penetration is neglected, but including the continuing 15 N weight gives `d=150/(3000−15)≈0.05025 m`. Both models and assumptions are labelled.
4. Sloping down on a graph of a *positive* force versus displacement does not imply negative acceleration. Fig. 7.37's applied force stays positive throughout; graph area gives +150 J.
5. `MA=L/h` applies to a **frictionless ideal inclined plane** with force along the plane, not to every real ramp. The 40 cm in Example 7.12 is the horizontal run; the ramp length is 50 cm.
6. Pulley advantage depends on rope routing; one fixed pulley changes direction and ideal MA=1, a two-support-strand movable pulley can give MA=2. This two-strand formula is not universal.
7. Lever balance requires the correct perpendicular moment arm and the same equilibrium assumptions. Class III trades force for displacement or speed; treat oar examples cautiously because the fulcrum arrangement can change its classification.
8. The supplied patch prematurely asserted final editorial alignment. Review status now explicitly states independent human physics/pedagogical and visual review remains outstanding.

## Engineering deliverables

- `cbse-class9-science-ch07-full-notes.js`: separate authenticated NCERT-aligned content override using the **exact existing title** `Work, Energy, and Simple Machines`. Preserves the 13 original Class 9 Science topic IDs and all prior notes.
- `cbse-class9-science-ch07-reader-enhancements.js`: **10 independently authored, captioned SVG figures**, with `<title>`/`<desc>` accessibility and 31 independent `<details>` self-checks. No copying textbook image assets.
- `index.html`: load override **before** `script.js`, enhancements **after** `script.js`, matching existing reader architecture.
- `studyai-concept-figures.css`: scoped mobile-safe rules; no global reading-layout changes.
- `tests/class9-science-ch07-ncert-depth-browser.cjs`: open real reader, validate 10 sections, 50 worked examples, 31 checks, ten illustrations, state/bookmark/Math preservation, 390 px fit, re-render stability and Chapters 1–6 regressions.
- Previous Science Chapter 1–6 tests update only their *curated-bank count expectation* from six to seven; their teaching and stored-progress checks remain.
- `.github/workflows/studyai-ci.yml` adds static JS checks and Chapter 7 real-browser step.

## Release and editorial boundaries

- Do not merge unless four established CI jobs `static`, `browser`, `postgres` and `curriculum-browser` all succeed. CI checks software behavior and defined curriculum signals, not complete human educational certification.
- Independent teacher review and accessible diagram visual QA remain outstanding. A live deployment and production behavior should be checked separately on Render after any merge.
- Preserve courses, dashboard, notes, chapter order/IDs, bookmarks, completion, progress, other curricula and already audited Chapters 1–6. No paid APIs.
