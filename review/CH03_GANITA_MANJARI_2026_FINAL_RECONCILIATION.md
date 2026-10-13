# Final Chapter 3 reconciliation: The World of Numbers (Ganita Manjari 2026–27)

Primary: https://ncert.nic.in/textbook/pdf/iemh103.pdf (27 pages, pp. 41–67 in textbook). Independently compared all section themes and the actual main-branch core + concept-first + topic + verification + corrections scripts. Existing Gemini scores were not used.

| Official NCERT sections | Actual existing StudyAI coverage | Decision |
|---|---|---|
| 3.1 Counting, one-to-one correspondence, tally history | 'Numbers began as a way to compare collections', Lebombo/Ishango historical caution | Already covered |
| 3.2 Zero, Brahmagupta's zero rules | 'Zero is both a number and a placeholder' | Already covered |
| 3.3 Negative integers, fortunes/debts, operations | Signed-number explanation and proven sign rules | Already covered |
| 3.4 Rational numbers, equality, arithmetic, number-line density, absolute value | Number line, equivalence, arithmetic, density proof, absolute-value examples | Already covered |
| 3.5 Irrationality, square-root proof, constructing √2/√3, story of π | Irrationality and constructions already well developed; π text mentioned Mādhava but missed the textbook's actual infinite series | **Corrected inside existing 'Another irrational number: π' subtopic** |
| 3.6 Rational/irrational decimal distinction, cyclic 142857, recurring algebra | Periods, denominator prime factors, recurring transformations, cyclic number and decimal classification | Already covered |
| Chapter conclusion and challenge problems | Real-number classification and labelled optional algebra enrichment | Core covered; optional topics correctly distinguished |

## Provenance and independent mathematical checks
- Madhava/Leibniz series: π = 4(1−1/3+1/5−1/7+⋯). A finite sum is rational, so it cannot equal irrational π.
- Three-term sum: 4(1−1/3+1/5) = 4·13/15 = 52/15 ≈ 3.4667.
- With an alternating and monotonically decreasing series, first omitted term gives an error bound of 4/7; three-term sum is above π.
- The textbook's suggestion that every irrational must be expressed by an infinite sum is not a valid general mathematical necessity. The new notes explicitly distinguish an infinite approximation method from the geometric definition of π.

## Preservation
- No sections/subtopics added or renamed; no JS reader, progress tracking, route or other grades modified.
- Reuses an existing and guarded (idempotent) concept-first Chapter 3 layer.
- No paid API, new dependencies or Gemini scores accepted blindly.

## Editorial outstanding
- Review Pythagorean and decimal zoom diagrams (Figs. 3.10–3.12), historical claims about ancient bones and intellectual attribution, and exercise-by-exercise instructional difficulty.
- Full site CI is a technical regression gate, not human editorial approval.
