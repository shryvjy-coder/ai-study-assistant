# Chapter 8: independent final NCERT Ganita Manjari reconciliation

Source independently checked: https://ncert.nic.in/textbook/pdf/iemh108.pdf, the official 2026–27 *Ganita Manjari* Chapter 8, 27 PDF pages, pp. 174–200 in Part I. Compared against the actual `main` `cbse-class9-maths-depth-ch08.js`, including the previously appended independent exercise lessons. Gemini audit scores were not used as evidence.

## Textbook mapping
- Sections 8.1–8.3, ordered/finite sequences, square and triangular patterns, nth term, explicit and recursive rules: existing lessons and advanced additions cover these, including visual pattern counts.
- Section 8.4, AP nth terms and plotted collinear points, real-world linear fares, recovery from multiple known terms: already covered.
- Section 8.5, pairing proof for 1+⋯+n, sums, triangular numbers: already covered.
- Section 8.6, GP, negative/fractional ratios, Sierpiński triangle shaded count and area, square-carpet exercise, AP versus GP graph shapes: already explained with worked examples.
- Exercise Set 8.3, bouncing ball (fifth rebound and distance until sixth ground impact): already addressed by the exact geometric-height/distance expressions in the prior depth extension.
- **Exercise Set 8.3, starred question 3 (PDF page 19, textbook p.193):** solving the *affine* recurrence t₁=2, tₙ₊₁=3tₙ−2 for term 730 was not given a worked transformation in the existing lesson. Added it inside the existing 'Explicit versus recursive descriptions' subtopic, not a new page.

## Independent mathematical check
The fixed point c obeys c=3c−2, so c=1. Define uₙ=tₙ−1, obtaining uₙ₊₁=3uₙ with u₁=1, hence tₙ=1+3ⁿ⁻¹. Solving 1+3ⁿ⁻¹=730 means 3ⁿ⁻¹=729=3⁶, so n=7. Direct iteration: 2,4,10,28,82,244,730. The general expression for tₙ₊₁=rtₙ+b, r≠1, follows from c=b/(1−r).

## Engineering/CI
- Preserved *all* existing section names, subtopic names, reader routes and progress keys; did not create new pages.
- Included a reload guard to avoid duplicate paragraphs and examples when the chapter script is loaded twice.
- A focused Playwright test validates the exact recurrence, prior AP/GP/fractal content, reader visibility, unique progress keys and no progress mutation.
- No paid APIs or new packages.

## Still requiring editorial review
- Visually verify the textbook's growing-square and Sierpiński diagrams and the bouncing-ball graph versus live website figures.
- Conduct teacher review of the numbered chapter exercises and term-numbering choices (especially the distinction between stage 0 and term 1).
- Technical CI does not constitute independent human pedagogy sign-off.
