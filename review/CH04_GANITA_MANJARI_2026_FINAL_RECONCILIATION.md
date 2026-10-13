# Chapter 4 final curriculum reconciliation, NCERT Ganita Manjari (2026–27)

Primary PDF: https://ncert.nic.in/textbook/pdf/iemh104.pdf (24 pages). Compared its sections and exercises with main-branch `cbse-class9-maths-depth-ch04.js` plus the actually loaded `cbse-class9-maths-audited-proposals.js` overlay. Did not use Gemini scores as truth.

| NCERT scope | Existing notes | Verified decision |
|---|---|---|
| 4.1 Discovering identities from consecutive squares and area models | Original identity/conjecture lessons | Covered |
| 4.2–4.4 Binomial square/difference, trinomial square, geometric proofs, Shridharacharya square method | Existing lessons plus reviewed proposal overlay | Covered; do not duplicate |
| 4.5–4.6 Algebra tiles, two unequal linear binomial factors, monic and non-monic quadratic factorisation | Existing concept lessons and generalized non-monic overlay | Covered |
| 4.7 Cube volume dissection, cubic sums/differences, three-variable x³+y³+z³−3xyz identity | Existing original cube lesson and detailed audited overlay | Covered |
| 4.7 Think and Reflect asks whether (x−y) divides x⁴−y⁴ and x⁵−y⁵ | Patterns lesson demonstrates a proof for sums of odd numbers but did not explain the general difference-of-powers factorisation | **Filled in existing lesson with proof and checked worked 5th-power example** |
| 4.8 Rational expressions and conditions on denominators | Original chapter lessons | Covered, keep original exclusions |
| End exercises and application problems | Original worked problems and proposals for cuboids, square borders, given factors | Mostly covered, human figure and difficulty review outstanding |

## Independent check
For integer n≥1:
xⁿ−yⁿ=(x−y)∑_(k=0)^(n−1) x^(n−1−k)y^k.
Multiplication telescopes since matching interior terms cancel. For n=5, Q=x⁴+x³y+x²y²+xy³+y⁴, then xQ−yQ=x⁵−y⁵. The factorisation is valid even when x=y; one must not claim a quotient (x⁵−y⁵)/(x−y) is defined there.

## Engineering/preservation
- No new sections/subtopics, URLs, UI, progress keys or dependencies. Existing Chapter 3 improvements preserved.
- Existing depth apply guard avoids duplicate page creation. Add focused real-browser reader/progress and mathematical regression.
- No paid model or external API spending.

## Editorial remaining
- Visually compare figures for area dissection, tile diagrams and cube partitions.
- Teacher review of full end-of-chapter exercise difficulty and whether any advanced identity should be labelled optional.
- CI green is necessary but not equivalent to an independent classroom pedagogy approval.
