# Chapter 14 NCERT audit reconciliation (2026–27)

**Book:** NCERT *Ganita Manjari*, Grade 9, Part II, Chapter 14, `iemh206.pdf`, printed pp. 123–146 (and supplementary nets).  
**Original notes:** `cbse-class9-maths-depth-ch14.js`, preserved byte-for-byte from `class9-maths-all-chapters-depth`.  
**Additive correction layer:** `cbse-class9-maths-depth-ch14-revisions.js`.

## What the source actually teaches

- §14.1, pp. 123–126: cuboid nets, volume as stacked rectangular cross-sections, equal-capacity packaging, painted unit cubes, corner-face products, integer-dimension search, and surface/volume changes from cutting cubes.
- §14.2, pp. 127–130: right versus oblique cylinders, circular and rectangular cross-sections, unrolled curved sides, open/closed ends, casting, changing dimensions and inscribed cylinders.
- §14.3, pp. 130–134: rotating a right triangle to produce a cone, perpendicular versus slant height, curved surface as an unfolded sector, cone/cylinder one-third volume relationship, and half-depth filling from the apex.
- §14.4, pp. 134–135: pyramids with a planar base and an apex; volume one-third of corresponding prism, face-by-face lateral area.
- §14.5, pp. 136–141: Archimedes' sphere/cylinder relation, sphere and hemisphere formulas, liquid displacement around balls, and sphere scaling.
- §14.6 and end exercises, pp. 141–146: everyday models, guesstimates such as ice-cream scoops, capacity conversions, and justification of assumptions.

Reference: https://ncert.nic.in/textbook/pdf/iemh206.pdf

## Gemini audit findings reconciled

The source report's 53/100 coverage rating was not reproducible against the real, 2026-10-12 protected-branch Chapter 14 draft. That draft **already covered** cones, pyramids, spheres, hemispheres, composite solids, unit conversions, scaling and estimation. Importing the supplied patch verbatim would have duplicated the core curriculum and created lesson pages substantially longer than needed.

We retained the original reader sections and all existing subtopic titles, while deepening the exact lessons that required additional reasoning:

1. Cuboid card-stack derivation, corner-face product identity, same-volume packaging comparison.
2. Cubic and surface scaling, geometric meaning of surface-area-to-volume ratio and its biological modelling limits.
3. Worked painted-cube dissection; explicitly assumes integer subdivision `n >= 2`.
4. Exhaustive proof for positive integer cuboids of TSA 100 cm². Solutions (up to permutation) are (1,2,16) and (2,4,7).
5. Face-aligned cylinder fitted in a cube; 10% radius growth requires 2100/121% reduction in height for unchanged volume.
6. Cone formed by revolving a right triangle; sector-area derivation, distinct slant/perpendicular heights.
7. Conical cup half-depth is one-eighth capacity **only when measured from the tip of an apex-down cone**.
8. Pyramid base-plane and slant-face distinctions.
9. Archimedes' sphere area relation and the 1:2:3 cone–sphere–cylinder volume ratio at shared radius `r` and height `2r`.
10. Hemispherical domes, exact liquid displacement `1024 - 512π/3` cm³ (rounded 488 cm³), and assumptions in ice-cream scoop estimates.

Three genuinely distinct skills got additional pages; all others are appended to the existing subject-specific teaching paragraphs and worked solutions. **No repeating "Chapter coverage", "Exam application", "Common traps", "Final checks", or "Mastery check" blocks were created.**

## Mathematically misleading claims in the suggested patch

- `n=1` does not satisfy the usual painted-cube 3/2/1/0 painted-face classification; it leaves one cube with six painted faces.
- Increasing a sphere radius by 10% increases its volume by 33.1%, **not** an arbitrary cone or cuboid whose only one dimension is changed.
- A one-eighth cone fill requires depth measured from the tip, not from an arbitrary wide end.
- A cube minimises surface area for a fixed volume **among rectangular boxes**, not among all solids.
- `π/4` is the inscribed cylinder/cube fraction in the face-aligned construction; claiming any tilted orientation is always smaller requires an additional optimization proof.
- The Archimedes argument `2πr(2r)=4πr²` relies on the established sphere–cylinder **area equality**; evaluating the cylinder expression alone does not prove the theorem.
- Numerical labels in the source report such as 83/100 accuracy and 64.8/100 composite are AI-generated assessments, not official CBSE scores.

## Compatibility and tests

- Original depth file remains intact, and all existing lesson titles and progress keys are preserved.
- Idempotent correction layer guards against duplicate pages on script reload.
- Existing chapter 12, chapter 13 and filler-removal changes are not modified.
- Real browser regression checks page rendering, existing and new learning pages, unique completion keys, progress totals, idempotency, and independent arithmetic.
- GitHub CI adds `tests/class9-ch14-ncert-depth-browser.cjs`.

**Editorial status:** NCERT-grounded draft reconciled. Final human mathematical, diagram/figure, and full exercise-by-exercise review outstanding. The correction layer must NOT emit `VERIFIED_AUDITED`.
