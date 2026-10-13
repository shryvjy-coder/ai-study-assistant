# StudyAI Class 9 Science Chapter 6: independent NCERT reconciliation

**Curriculum:** NCERT *Exploration* 2026–27, Chapter 6 *How Forces Affect Motion*, `iesc106.pdf`, printed pp. 94–115 (22 PDF pages).

## Primary sources and method

- Official textbook: https://ncert.nic.in/textbook/pdf/iesc106.pdf . Text of the complete chapter, including all seven activities, worked Examples 6.1–6.8, end exercises, Fig. 6.21 (velocity–time graph), Fig. 6.34 and Fig. 6.35 (connected boxes and forces), and page images were available in this audit.
- Existing StudyAI main-branch notes were inspected via GitHub, particularly `cbse-ncert-deep-notes-09.js`, `cbse-class9-science-full-notes.js` and Chapter 5's implementation/tests.
- The provided Gemini audit served as a **candidate defect list**, not an official curriculum certificate or an authoritative replacement file.
- Goal: add actual student-facing worked explanations without altering any legacy course entry, chapter identifier or progress behaviour.

## Verified coverage gaps and original solution

| NCERT text | Printed pages | Legacy gap | Original authored Chapter 6 remedy |
|---|---|---|---|
| 6.1–6.2 force, spring balances, balanced/unbalanced forces, Example 6.1 | 94–97 | Only basic force/net-force glosses | Vector reasoning, normal force, signed net-force calculations, free-body diagrams, four worked explanations |
| 6.3 friction, Activities 6.1–6.2, surface dependence | 98–100 | Short generic friction sentence | Actual experimental interpretations, launch-force removal, static versus sliding friction, spring-balance reading |
| Galileo, Newton, 6.4 first law and inertia | 100–102 | First law named but hardly taught | Frictionless thought experiment, frame and contact-force limitations, flat/sloped velocity–time interpretation |
| 6.5 second law, Activities 6.3–6.4, unit newton | 102–104 | No force/mass/acceleration mathematics | Derive and use F_net = ma, 1 N = 1 kg·m/s², direct/inverse proportion, graphs and four explicit numericals |
| Gravity, applications, Examples 6.4–6.5 | 104–106 | No weight calculation or impact explanation | W = mg, 30 kg barbell → 294 N support, force/time models, airbags and catching, 25 kg friction → 0/0.4 m |
| Example 6.6, velocity–time graph | 106–107 | No piecewise graph force numericals | 1500 kg car: +3000 N, 0 N, −3000 N by slopes; additional fully worked kinematics |
| 6.6 third law, Activities 6.5–6.7, Examples 6.7–6.8 | 107–111 | Just the law definition | Object-labelled interactions, spring balances, balloon, walking friction, Earth-fruit, equal forces yet unequal accelerations |
| 6.7 systems, Figs. 6.34–6.35, end exercise 15 | 111–115 | Entire system treatment missing | Individual versus whole-system diagrams, internal tension cancellation, horizontal external force, normal/weight, friction extension, tractor expression |
| 'Ready to Go Beyond' momentum | 104 | Completely absent from Gemini patch | Short labelled optional extension p = mv and conceptual connection to rate of change of momentum |

## Corrections to Gemini's proposed text

1. Its four-section teaching patch was too short to match the chapter, all activities, figures and numerical exercises; authored **eight cohesive sections** instead.
2. Its patch marked `reviewStatus` as fully aligned before any teacher review. Authored material explicitly states that human teacher and visual editorial review remains outstanding.
3. TeX strings alone are not assumed to be displayed as mathematics in the existing reader. Use clear Unicode and readable calculation steps so students see actual equations without new rendering dependencies.
4. Use **net** external force in F = ma and when combining systems. For two connected boxes, the formula is a = F_ext/(m₁+m₂), only under the assumptions specified; friction is external if present. Tension forces cancel for the chosen whole system.
5. A stationary object may have multiple balanced forces, including normal reaction and weight. A horizontal velocity-time graph indicates zero **net** force, not literally that no force of any kind exists.
6. Distinguish sliding friction, which acts opposite relative sliding, from forward-acting static friction on a walking foot.
7. Extending contact time reduces the magnitude of a simplified **average** impact force for a fixed velocity change, not necessarily every instantaneous force.
8. Provide non-weapon examples of equal action-reaction forces and unequal acceleration. The textbook's recoil mathematics is represented by equivalent safe frictionless-cart numericals.
9. Momentum is a brief beyond-level discussion in this textbook, not a core ninth extended unit.

## Engineering implementation

- `cbse-class9-science-ch06-full-notes.js`: **8 teaching sections, 41 explanation paragraphs, 33 worked examples, 25 self-checks**, with a clear worked answer and specific exam tip for each section.
- `cbse-class9-science-ch06-reader-enhancements.js`: **8 original accessible SVG teaching illustrations** for force arrows, friction, inertia, the second law, weight/impact, velocity–time graph, third law and a connected system. Each has a textual description and a caption.
- `index.html` loads the standalone lesson before `script.js` and the enhancement after `script.js`, like prior completed chapters. `studyai-concept-figures.css` adds only scoped mobile-friendly rules.
- Dedicated Playwright regression checks all eight sections, numerical content, accessible diagrams, 25 closed-by-default answers, open/close behaviour, mobile sizing, rerender without duplicates, mathematics progress, persistent user state, all Chapters 1–5, and no leakage into Chapter 7.
- Previous Chapter 1–5 science regression tests update only the expected count of curated chapters from five to six. CI runs all chapter tests and static JavaScript checks.

## Editorial limits

- All code and test assertions require green GitHub CI before merge. Tests verify product integrity and coverage signals, not educator certification.
- A teacher or physics editor should review diagrams, mathematical pedagogy and wording, including labels at phone scale.
- Curriculum coverage is based on this chapter's official 2026–27 NCERT PDF; it is not a guarantee of a particular examination's exact question selection.
- Chapters 7–13 remain separate work; no feature or content has been added to Chapter 7.
