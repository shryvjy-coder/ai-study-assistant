# CBSE Grade 9 Science Chapter 10: Sound Waves — NCERT 2026–27 curriculum reconciliation

## Evidence sources and scope

- Primary textbook identity: NCERT *Exploration: Textbook of Science for Grade 9*, Chapter 10 **Sound Waves: Characteristics and Applications**, official PDF `iesc110.pdf`, printed pages **184–207**, https://ncert.nic.in/textbook/pdf/iesc110.pdf .
- **Access limitation:** The official 13.7 MB NCERT PDF could not be directly downloaded in this work session: the web PDF reader rejected it as oversized, and the container's network could not resolve the NCERT host. Rather than falsely claim to have read its bytes, we **independently cross-checked the complete chapter text and diagrams through the 2026 NCERT chapter mirror** https://philoid.com/ncert/chapter/iesc110, including original Figures 10.19, 10.32 and 10.33 at `/assets/ncert/2026/iesc110/OEBPS/Images/{155,170,171}.png`. This is a mirrored transcription, so external textbook PDF/teacher editorial verification is still desirable.
- User-supplied Gemini audit: `Pasted text(20261014-075923).txt`, a Chapter 10 audit containing a five-section, several-grouped-example proposed patch. It is used as a diagnostic list **not** an uncritically accepted source or code replacement.
- Actual implementation baseline: GitHub `main` **before this PR**. `cbse-ncert-deep-notes-09.js` had a short legacy 5-concept Chapter 10 entry. **Nine earlier chapters already have curated overrides**, so Gemini's stale statement that `cbse-class9-science-full-notes.js` contains only Chapter 1 does not accurately describe current full-note coverage. This change adds an isolated Chapter 10 override; preserves the 13 legacy science IDs, the reader, all bookmarks/progress and all previous chapter notes.

## Official 2026 chapter mapping

| NCERT section and textbook elements | Newly taught |
|---|---|
| 10.1 and 10.1.1, Activities 10.1–10.2 | Vibration of strings, rubber bands, tabla membranes, bansuri air, vocal folds and tuning fork; Kongthong tune naming and source-frequency distinction |
| 10.2, Activities 10.3–10.4 | Sound through solids, liquids, gas and bell-jar near-vacuum; sound versus electromagnetic radio and light |
| 10.3, Activity 10.5 | Oscillating piston, slinky, moving C/R pattern versus locally oscillating medium particles, longitudinal versus transverse motion |
| 10.4, Activity 10.6 | Energy transfer to grains/membrane, microphone and speaker energy conversion |
| 10.5, Figures 10.16–10.19 and 10.30–10.33 | Density/distance graph, axes, crest, trough, amplitude, one complete λ, λ/2, wave-cycle counting and the two graph exercises |
| 10.6.1–10.6.2, Activity 10.7, Example 10.1 | ν and f, T, ν=1/T, wavelength, amplitude, intensity and its typical distance dependence |
| 10.6.3, Examples 10.2–10.4, Table 10.1 | v=λ/T=λν, air/water/steel speed comparisons, 0°C vs 22°C, human-hearing wavelength limits, thunder and steel-fence delays |
| 10.6.4, Activity 10.8 | Pitch, loudness, decibel, ear pathway, binaural timing, human hearing limits and safe acoustic interpretation |
| 10.6.4 musical acoustic passages | Fundamental and overtones, note vs tone, timbre, octave, C. V. Raman's tabla/mridangam syaahi |
| 10.7, Example 10.5, Pause & Ponder 12 | Equal reflection angles, 17 m/0.1s echo minimum at 340m/s, reverberation under ~0.05s, echo 85m, hall acoustic treatments, Gol Gumbaz |
| 10.8–10.8.1, Example 10.6, Pause & Ponder 13 | 20Hz/20kHz boundaries, echolocation, infrasound/ultrasound science, sonar d=vt/2, actual textbook 688.5 m case and 3000 m seabed |
| NCERT exercises Q1–Q15 | Read figures and count cycles, graph amplitude, sound in space, 0.05s reflections, thunder arrival, SONAR wreck, reverse parking, two-media cliff ratio 2:9 |

## Two substantive scientific corrections to Gemini's proposed answer

1. **Figure 10.33: Wave A/B labels are reversed in the user's audit.** Inspection of the actual graph `Images/171.png` shows **Wave A (pink/red) has two complete cycles in 5.0 cm**, so `λ_A=2.5 cm`, `ν_A=345/0.025=13,800 Hz`. **Wave B (blue) has one complete cycle in 5.0 cm**, so `λ_B=5.0 cm`, `ν_B=345/0.05=6,900 Hz`. Gemini gave these numbers but swapped A and B. Both updated explanation and unique original comparative SVG use the correct labels. Q13 `Images/170.png` shows 8cm over 4 cycles, `λ=2cm`, `ν=17,000Hz`.
2. **NCERT Example 10.6 uses 0.90s at 1530m/s**, giving **688.5m**. The audit's grouped worked example instead gives `5.0s/1525m/s` (**3812.5m**), which is correctly **end-of-chapter Q10**, *not Example 10.6*. The new lessons explicitly teach both using original book labels. Original Example 10.5 uses 0.5s/340m/s → 85m.
3. **Echo/reverberation threshold clarity:** Distinct echoes are usually resolved after `≈0.1s`; the text mentions reverberation where reflections are closely spaced `<≈0.05s`. The end exercise with a reflection at exactly `0.05s` means not a distinct echo; classify as overlapping/reverberant sound. Do not claim that exactly `0.05s` is a sharp universal physiological phase transition.
4. **Frequency versus propagation:** The textbook uses `ν` for frequency and `v` for speed. Keep both labelled and explain that `ν` and common alternate `f` can both mean frequency. In ordinary uniform air frequency changes wavelength without changing speed.
5. **Model limits:** The common `solid > liquid > gas` order is for illustrated cases and not an inviolable ordering over all materials. Real bell-jar arrangements may transmit vibration via solid supports. Subjective loudness differs from logarithmic dB physical intensity. Sound requires a medium even above or below human hearing range.

## Engineering integration

- `cbse-class9-science-ch10-full-notes.js` holds **12 original teaching sections, 94 explanatory paragraphs, 91 detailed worked examples, 49 independently answerable self-check questions**, all keyed to exact legacy title `Sound Waves: Characteristics and Applications`. Never edit `cbse-ncert-deep-notes-09.js`.
- `cbse-class9-science-ch10-reader-enhancements.js` attaches **12 accessible original SVGs**, each with `<title>`, `<desc>` and a caption, and expandable answer displays scoped to Chapter 10; no use of real textbook images in the site.
- `studyai-concept-figures.css` scopes mobile-responsive styles to Chapter 10.
- `index.html` inserts note script before `script.js` and reader enhancement after the prior Science enhancements and before the long-note renderer.
- `tests/class9-science-ch10-ncert-depth-browser.cjs`: Playwright opens the real site, verifies loaded notes and IDs, every diagram, hidden/revealed answers, 390px mobile width, no duplicated visuals on rerender, intact Chapters 1–9, no leakage to untouched Chapter 11, no progress/bookmark changes.
- Prior Science regression tests change **only** curated-bank count `9→10`, preserving their chapter assertions.
- `.github/workflows/studyai-ci.yml` includes JS syntax checks and Chapter 10 full-browser job. Require **all four** standard jobs (static, browser, postgres, curriculum-browser) successful before merge.
- CI is a technical verification, **not** subject-teacher certification. Teacher and visual editorial review remain outstanding. No paid external APIs needed.
