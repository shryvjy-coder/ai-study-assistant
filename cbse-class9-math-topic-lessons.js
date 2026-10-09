/* StudyAI original, chapter-specific expanded lessons.
 * Pilot: CBSE Class 9 / Mathematics / The World of Numbers.
 * No generic study-advice padding. Written as teaching material, not textbook excerpts.
 */
(() => {
  'use strict';
  const bank=window.CBSE_CLASS9_MATH_FULL_NOTES;
  const chapter=bank && bank['The World of Numbers'];
  if(!chapter || chapter._studyaiTopicFirst)return;

  chapter.lead='Learn the real number system as a connected story: why new number sets were needed, how rational and irrational values behave, and how to reason, calculate, construct, prove and check with them. Each topic below is a separate lesson, with fully explained examples and examination checks.';

  const depth={
    'Natural numbers, zero and integers':{
      paragraphs:[
        'A number system is extended whenever an everyday operation has no answer in the smaller system. Counting 1, 2, 3, … is enough to describe how many objects are present when there is at least one object. Zero is needed to describe an empty collection, and negative integers are needed for changes that move below a reference point, such as a temperature falling below 0 °C.',
        'Whole numbers are {0, 1, 2, …}. Integers, written ℤ, include all whole numbers and their negative counterparts. The set inclusion ℕ ⊂ whole numbers ⊂ ℤ shows that no earlier numbers disappear as the system grows; new numbers are added.',
        'On the number line, numbers increase towards the right. Thus −2 is greater than −7 because it lies to the right. The absolute value |a| gives the distance of a from zero, so |−7|=7. Although −7 is less than −2, its absolute value is greater.',
        'A set is closed under an operation when every pair of numbers from that set gives a result in the same set. Integers are closed under addition, subtraction and multiplication, but not division: 5÷2=2.5 is outside ℤ. Do not confuse a single successful division, such as 8÷2=4, with closure of the entire set.',
        'Zero is an additive identity: a+0=a. Every integer a has an additive inverse −a, because a+(−a)=0. Multiplying by zero always gives zero. Division by zero is undefined, since 0 multiplied by any proposed quotient cannot give a nonzero dividend.'
      ],
      examples:[
        {title:'Worked example: signs in an expression',question:'Find −8 − (−13) + (−2)×6.',steps:['Multiply first: (−2)×6=−12.','Subtracting a negative means adding its opposite, so −8−(−13)=−8+13=5.','Combine: 5+(−12)=−7.'],answer:'−7.'},
        {title:'Check your understanding',question:'Why is the set of integers not closed under division?',steps:['Closure would require every quotient of two permitted integers, when division is defined, to be an integer.','Choose 7 and 2: 7÷2=3.5, which is not an integer.'],answer:'The counterexample disproves closure.'}
      ],
      formulas:['Whole numbers = {0, 1, 2, 3, …}','|−a|=|a|','a+0=a; a+(−a)=0'],
      tip:'Be precise: zero is neither positive nor negative, but it is an integer and a rational number.'
    },
    'Rational numbers':{
      paragraphs:[
        'Rational numbers form the set ℚ. A number belongs to ℚ if it can be expressed exactly as p/q with integers p and q and q≠0. The fraction notation represents division, so q=0 is forbidden. All integers are rational because n=n/1, and zero is rational because 0=0/1.',
        'Fractions can be equivalent even when they look different. Multiplying numerator and denominator by the same nonzero integer preserves their value: 2/3=8/12. To put a fraction in standard form, ensure the denominator is positive and divide numerator and denominator by their highest common factor.',
        'To compare two fractions with positive denominators, rewrite them over a common denominator, or compare cross-products. With negative denominators, first move the minus sign into the numerator. For a/b and c/d with b>0 and d>0, a/b<c/d exactly when ad<bc.',
        'Adding and subtracting rationals requires a common denominator. For multiplication, multiply the numerators and the denominators and simplify. Dividing by a nonzero fraction means multiplying by its reciprocal. A fraction such as 0/5 is defined, whereas 5/0 and 0/0 are not.',
        'Addition and multiplication of rational numbers are commutative and associative; multiplication also distributes over addition. Subtraction and division are not generally commutative. For example, 2−5≠5−2. Recognising which properties may be used makes algebraic simplification reliable.'
      ],
      examples:[
        {title:'Worked example: fraction arithmetic',question:'Simplify −3/4 + 5/6 − 1/3.',steps:['The least common denominator of 4, 6 and 3 is 12.','Rewrite as −9/12+10/12−4/12.','Add the numerators: (−9+10−4)/12=−3/12.','Reduce the result.'],answer:'−1/4.'},
        {title:'Worked example: division',question:'Compute (−7/12) ÷ (14/9).',steps:['Multiply by the reciprocal: (−7/12)×(9/14).','Cancel a factor 7 with 14 to get (−1/12)×(9/2).','Simplify −9/24.'],answer:'−3/8.'},
        {title:'Try it: equality of fractions',question:'Are −18/24 and −6/8 equal?',steps:['Compare −18×8 and −6×24.','Both products equal −144.'],answer:'Yes. Both reduce to −3/4.'}
      ],
      formulas:['a/b+c/d=(ad+bc)/(bd), b,d≠0','(a/b)÷(c/d)=ad/(bc), b,c,d≠0'],
      tip:'Cross-multiplication assumes the denominators are nonzero. For inequalities, beware of reversing the inequality when multiplying by an unknown negative denominator.'
    },
    'Representing rational numbers on the number line':{
      paragraphs:[
        'The number line assigns every real number to a unique point. Fractions are positions, not just “pieces of a shape.” A positive fraction lies to the right of zero and a negative fraction lies to the left. You can find a fraction by dividing the distance between consecutive integers into equal parts.',
        'To plot −7/4, rewrite it as −1¾. It lies between −2 and −1, one quarter unit to the right of −2. Remember that the number line is ordered: −1¾ is less than −1½ because −1.75 lies to its left.',
        'A common denominator provides a systematic way to order fractions. Between −2/3 and −1/2, use denominator 6: −4/6 and −3/6. Thus −2/3 is the left-hand value. The denominator tells the size of equal divisions, not which fraction is larger on its own.',
        'Improper fractions describe values beyond 1 or below −1. They should be plotted with exactly the same logic as proper fractions; first locate the surrounding integers, then divide the relevant unit interval. For geometric constructions, scales must be consistent across the entire line.'
      ],
      examples:[
        {title:'Worked example: plot a negative improper fraction',question:'Locate −11/4 on a number line.',steps:['Divide −11 by 4: −11/4=−2¾=−2.75.','This lies between −3 and −2.','Divide the interval into four equal pieces, starting from −3.','Move one quarter unit to the right of −3.'],answer:'The first quarter mark right of −3.'},
        {title:'Compare exact fractions',question:'Which is greater: −5/8 or −2/3?',steps:['Use a common denominator of 24.','−5/8=−15/24; −2/3=−16/24.','−15 is greater than −16.'],answer:'−5/8 is greater.'}
      ],
      tip:'For negative numbers, positions farther left are smaller; do not compare only their unsigned numerators.'
    },
    'Density of rational numbers':{
      paragraphs:[
        'Between any two distinct rational numbers there are infinitely many other rational numbers. This property is called density. It means that unlike the integers, rational numbers do not have a next or previous neighbour.',
        'The average gives a constructive proof. If a<b, then a<(a+b)/2<b. Since addition and division by 2 preserve rationality, the midpoint is rational whenever a and b are rational. You can repeat the process between a and the midpoint indefinitely.',
        'Another method is to choose a common denominator and enlarge it until there is room for an integer numerator between the two endpoints. For 1/3 and 1/2, rewrite them as 4/12 and 6/12; 5/12 is between them.',
        'Density does not mean all numbers are rational. It only means you can find rational numbers as close as you like to any given point. Irrational numbers also appear between any two different real numbers, which is an important distinction from completeness of the real number line.'
      ],
      examples:[
        {title:'Worked example: three rationals between two values',question:'Find three different rational numbers strictly between 1/4 and 1/2.',steps:['Convert to denominator 32: 1/4=8/32 and 1/2=16/32.','Choose three numerators strictly between 8 and 16, such as 9, 10 and 11.','Check 8/32<9/32<10/32<11/32<16/32.'],answer:'9/32, 5/16 and 11/32 are examples.'},
        {title:'Explain the proof',question:'Why can there be no smallest rational number greater than 2?',steps:['Suppose a rational number r>2 is the smallest such number.','The midpoint (2+r)/2 is rational and lies strictly between 2 and r.','This contradicts r being the smallest.'],answer:'No smallest rational above 2 exists.'}
      ],
      formulas:['If a<b, then a<(a+b)/2<b'],
      tip:'The midpoint is not the only number between two rationals. The same construction can be repeated endlessly.'
    },
    'Irrational numbers':{
      paragraphs:[
        'Some exact lengths cannot be expressed as a ratio of integers. These are irrational numbers. The positive diagonal of a square with side 1 unit has length √2 units by the Pythagorean theorem. That exact length is not equal to any fraction p/q.',
        'A rational decimal either terminates or eventually repeats a block of digits. An irrational decimal neither terminates nor eventually repeats. “Non-terminating” alone is not enough: 0.333… never ends but equals 1/3.',
        'A square root of a perfect-square integer is rational, for example √49=7. The square root of a positive integer that is not a perfect square is irrational, such as √2, √3 and √5. But expressions must be simplified before classification: √(4/9)=2/3 is rational.',
        'Adding a rational number to an irrational number always gives an irrational result. To see why, if r is rational and x irrational but r+x were rational, subtracting r would make x rational, a contradiction. The same reasoning shows a nonzero rational multiplied by an irrational remains irrational.',
        'However, the sum or product of two irrational numbers need not be irrational. √2+(−√2)=0, and √2×√2=2. Always simplify an expression rather than classifying it from the appearance of its components.'
      ],
      examples:[
        {title:'Worked example: simplifying before classifying',question:'Classify √81, √18/√2, √7 and 0.101001000100001…',steps:['√81=9, rational.','√18/√2=√9=3, rational.','√7 is an irrational square root of a non-square positive integer.','The shown decimal has increasing runs of zeros between 1s, so its pattern does not become periodic.'],answer:'The first two are rational; the last two are irrational.'},
        {title:'Counterexample reasoning',question:'Is the product of two irrational numbers always irrational?',steps:['Choose two irrational numbers, √3 and √3.','Multiply: √3×√3=3.','3 is an integer, hence rational.'],answer:'No. The claim is false.'}
      ],
      formulas:['Real numbers ℝ = rational numbers ℚ ∪ irrational numbers','ℚ ∩ (irrational numbers)=∅'],
      tip:'The expression √n is not always irrational. Check whether n is a perfect square, then simplify any products or quotients.'
    },
    'Why √2 is irrational':{
      paragraphs:[
        'The proof that √2 is irrational is a model of proof by contradiction. Start by assuming the opposite of what you want to establish: suppose √2=p/q for integers p and q in lowest terms, with q≠0. “In lowest terms” means p and q have no common factor greater than 1.',
        'Square both sides to obtain 2=p²/q², so p²=2q². This tells us p² is even. A square of an odd integer is odd, so p must itself be even. Write p=2k for some integer k.',
        'Replace p in p²=2q²: 4k²=2q², giving q²=2k². Thus q² is even and therefore q is even. Both p and q are divisible by 2, which contradicts the assumption that p/q was written in lowest terms.',
        'The contradiction did not come from a computational approximation. It came from exact divisibility and parity, so √2 cannot be expressed as a ratio of integers. The same argument works with √3 when you use the property “if 3 divides p², then 3 divides p.”',
        'A proof must justify why p² even forces p even. One concise explanation is that an odd number is 2k+1, whose square 4k(k+1)+1 is odd. Therefore an even square cannot come from an odd base.'
      ],
      examples:[
        {title:'Complete the missing proof step',question:'From p²=2q² and p=2k, show that q is even.',steps:['Substitute p=2k: (2k)²=2q².','Simplify to 4k²=2q², then divide by 2.','We obtain q²=2k², which is even.','Therefore q is even.'],answer:'q is divisible by 2, producing the required contradiction.'},
        {title:'Try a related proof',question:'Why is √3 irrational?',steps:['Assume √3=p/q with p and q coprime integers.','Squaring gives p²=3q², so 3 divides p² and hence p.','Write p=3k; then 9k²=3q² and q²=3k².','Thus 3 divides q as well, contradicting coprimality.'],answer:'√3 is irrational.'}
      ],
      tip:'Always finish a contradiction proof by identifying the contradicted assumption and stating the conclusion explicitly.'
    },
    'Constructing square-root lengths':{
      paragraphs:[
        'Irrational numbers have exact positions on the number line even when their decimals are not exact. To construct √2, draw a right triangle with perpendicular legs of length 1 unit and 1 unit. The Pythagorean theorem gives hypotenuse²=1²+1²=2, so the hypotenuse is √2.',
        'With a compass, place its point at zero and open it to the hypotenuse length. Transferring that distance from zero to the right-hand number line locates √2 precisely. A decimal such as 1.414 is only an approximation to that position.',
        'A square-root spiral continues the construction. Start with a right triangle whose legs are 1 and 1, giving √2. From the endpoint of the √2 side, construct another perpendicular leg of length 1; the new hypotenuse has squared length 2+1=3 and therefore length √3. Repeat to obtain √4, √5, and so on.',
        'When an exam asks for a geometric construction, the right angle and equal unit length must be indicated. A freehand sketch may help understanding but cannot replace the measurements and theorem justifying an exact result.'
      ],
      formulas:['c²=a²+b² (right-angled triangle)','(√n)²+1²=n+1 ⇒ next length √(n+1)'],
      examples:[
        {title:'Worked example: a length of √5',question:'Construct a segment of length √5 from a 2-unit horizontal segment.',steps:['Draw AB=2 units horizontally.','At B construct BC=1 unit perpendicular to AB.','Join A to C.','By the Pythagorean theorem, AC²=2²+1²=5.'],answer:'AC=√5 units. Transfer AC to the number line with a compass.'}
      ],
      tip:'The square-root spiral produces lengths by the Pythagorean theorem; it does not rely on rounded decimal values.'
    },
    'Decimal expansions of real numbers':{
      paragraphs:[
        'A decimal that ends, such as 0.125, is terminating. It is rational because 0.125=125/1000=1/8. A decimal with a repeating block, such as 0.272727…, is non-terminating but rational. Every rational number has a decimal that terminates or eventually repeats.',
        'A rational number in lowest terms p/q has a terminating decimal exactly when the prime factorisation of the positive denominator q contains no primes other than 2 and 5. This happens because a power of ten is made only of 2s and 5s: 10ⁿ=2ⁿ5ⁿ.',
        'For example, 7/40 terminates because 40=2³×5, so multiplying the denominator by 25 gives 1000 and 7/40=175/1000=0.175. In contrast, 1/6 has denominator 2×3 in lowest terms; the factor 3 prevents termination, so the decimal repeats.',
        'Long division explains why repetition is inevitable for a rational number. When dividing by a positive integer q, possible remainders are among 0, 1, …, q−1. Either the remainder eventually becomes 0, which terminates the decimal, or a nonzero remainder repeats, forcing the digits from that point to repeat.',
        'Irrational decimals are non-terminating and non-repeating. An unending but repeating sequence of digits is rational, so the description “non-terminating” on its own cannot establish irrationality.'
      ],
      formulas:['10ⁿ=2ⁿ×5ⁿ','p/q in lowest terms terminates ⇔ denominator q=2ᵃ5ᵇ for nonnegative integers a,b'],
      examples:[
        {title:'Worked example: decide without dividing',question:'Will 13/160 and 11/42 terminate?',steps:['160=2⁵×5, so the first denominator contains only 2 and 5.','42=2×3×7, and 11/42 is already in lowest terms.','The second denominator contains 3 and 7.'],answer:'13/160 terminates; 11/42 is non-terminating and repeating.'},
        {title:'Classify decimals',question:'Classify 0.3125, 0.090909… and 0.1010010001…',steps:['0.3125 terminates, so it is rational.','0.090909… repeats the block 09, so it is rational.','0.1010010001… has increasingly long runs of zeros between 1s and does not settle into a repeating block.'],answer:'The first two are rational; the third is irrational.'}
      ],
      tip:'Always cancel common factors before applying the denominator test. For example, 6/15 becomes 2/5 and terminates.'
    }
  };

  const added=[
    {
      title:'Fraction to decimal and repeating decimal to fraction',
      paragraphs:[
        'To turn a fraction into a decimal, use long division. The dividend is the numerator and the divisor is the denominator. At each stage a remainder determines the next digit. When the remainder reaches zero, the decimal terminates; if a previous nonzero remainder returns, the digits repeat.',
        'To turn a repeating decimal into a fraction, use algebra to make repeating digit blocks line up. A one-digit repeating period is eliminated by multiplying by 10, while a two-digit period is eliminated by multiplying by 100. Subtract the original equation to remove the recurring tail.',
        'For a decimal with some non-repeating digits before the repeating block, two powers of ten are needed: one to move past the non-repeating part and one to move through a complete repeating block. Then subtract and solve for the original number.',
        'These manipulations prove that every eventually repeating decimal is rational. They also explain why a decimal written as 0.999… equals 1: if x=0.999…, then 10x−x=9, so 9x=9 and x=1.'
      ],
      formulas:['If x=0.777…, then 10x−x=7 ⇒ x=7/9','If x=0.181818…, then 100x−x=18 ⇒ x=18/99=2/11'],
      examples:[
        {title:'Worked example: repeating block',question:'Express 0.454545… as a rational fraction.',steps:['Let x=0.454545….','Multiply by 100: 100x=45.454545….','Subtract x: 99x=45.','Divide and simplify.'],answer:'x=45/99=5/11.'},
        {title:'Worked example: a non-repeating prefix',question:'Express 0.16666… as a fraction.',steps:['Let x=0.16666….','Multiply by 10: 10x=1.6666….','Multiply by 100: 100x=16.6666….','Subtract: 90x=15.'],answer:'x=15/90=1/6.'}
      ],
      tip:'The power of ten must match the length of the repeating block. Check your answer by division.'
    },
    {
      title:'Comparing, ordering and approximating real numbers',
      paragraphs:[
        'All rational and irrational numbers lie on the same real number line. Every real number has a unique location. When an exact comparison is difficult, use benchmark integers, squares or bounds, rather than immediately rounding to a short decimal.',
        'To locate √7, observe that 2²=4<7<9=3². Therefore 2<√7<3. Tighten the estimate by squaring 2.6 and 2.7: 2.6²=6.76<7, whereas 2.7²=7.29>7, so 2.6<√7<2.7.',
        'Rounding affects accuracy. A value correct to two decimal places differs from the exact value by at most 0.005, using ordinary rounding. For measurements, the requested precision and units are part of the answer. Do not round intermediate calculations unnecessarily.',
        'If two positive quantities are square roots, comparing their radicands is reliable because the square-root function increases on nonnegative numbers: √5<√8. But you cannot automatically compare expressions such as 1+√5 and 3 without first finding appropriate bounds.'
      ],
      formulas:['If 0≤a<b, then √a<√b','2.6²=6.76<7<7.29=2.7² ⇒ 2.6<√7<2.7'],
      examples:[
        {title:'Worked example: order exact values',question:'Place √5, 9/4 and 2.3 in increasing order.',steps:['9/4=2.25.','√5≈2.236, between 2.23 and 2.24.','Compare the values 2.236…, 2.25 and 2.30.'],answer:'√5 < 9/4 < 2.3.'},
        {title:'Estimate to one decimal',question:'Estimate √19 to one decimal place.',steps:['4²=16 and 5²=25, so √19 lies between 4 and 5.','4.3²=18.49 and 4.4²=19.36, so it lies between 4.3 and 4.4.','Because 4.35²=18.9225<19, √19>4.35.'],answer:'4.4 to one decimal place.'}
      ],
      tip:'Use inequalities and squared bounds to justify estimates. A calculator display is not an exact proof.'
    },
    {
      title:'Simplifying radicals and operations involving irrational numbers',
      paragraphs:[
        'A radical, such as √12, may contain a perfect-square factor. Write 12=4×3 and use √(4×3)=√4×√3=2√3. The simplified expression is exact and often easier to compare or calculate with than a rounded decimal.',
        'For nonnegative a and b, √a×√b=√(ab). For positive b, √a/√b=√(a/b). These identities should not be applied blindly when the radicands or denominators fall outside their allowed real-number ranges.',
        'Like radicals combine: 3√2+5√2=8√2, just as 3x+5x=8x. Unlike radicals such as √2 and √3 do not combine into a single similar term. In particular, √(a+b) is generally not equal to √a+√b.',
        'When a denominator contains a single square-root term, multiplying numerator and denominator by that term removes the radical from the denominator. For example, 1/√5=√5/5. This changes the form, not the value, and is called rationalising the denominator.',
        'Do not assume that adding or multiplying irrational numbers always produces an irrational number. √2×√2=2 is rational. Similarly, √2+(−√2)=0 is rational. Simplification must come before classification.'
      ],
      formulas:['√12=2√3','a√m+b√m=(a+b)√m','1/√a=√a/a, a>0'],
      examples:[
        {title:'Worked example: simplify and add',question:'Simplify √50 + 2√8 − √18.',steps:['√50=5√2 because 50=25×2.','2√8=2×2√2=4√2.','√18=3√2.','Combine like radicals: (5+4−3)√2.'],answer:'6√2.'},
        {title:'Worked example: rationalise',question:'Write 3/√3 without a radical denominator.',steps:['Multiply by √3/√3, which equals 1.','Numerator becomes 3√3.','Denominator becomes (√3)²=3.'],answer:'√3.'},
        {title:'Find the error',question:'A student states √9+√16=√25. Is this a valid rule?',steps:['For this specific example, the values on each side are 3+4=7 and √25=5.','The two sides are not equal.'],answer:'No. In general √a+√b≠√(a+b).'}
      ],
      tip:'Simplify radicals before estimating. Never distribute a square root across addition or subtraction.'
    },
    {
      title:'Properties, inclusion and classification of number sets',
      paragraphs:[
        'The number systems nest: natural numbers sit inside whole numbers, which sit inside integers, which sit inside rational numbers, which sit inside real numbers. In this context, ℝ contains both rational and irrational numbers. Every point of the real number line is represented by exactly one real number.',
        'Classifying a number means assigning it to every applicable set, not merely the smallest visible category. For example, 6 is a natural number, whole number, integer, rational number and real number. The number −4 is integer, rational and real, but not whole or natural.',
        'Decimal form gives another classification test. A terminating or eventually repeating decimal is rational. A non-terminating non-repeating decimal is irrational. Exact symbolic expressions may need simplification before their type becomes clear.',
        'Closure properties help detect invalid generalisations. The sum of two rational numbers is rational, but the sum of two irrational numbers may be rational or irrational. A nonzero rational plus an irrational is always irrational: otherwise subtraction would make the irrational number rational.',
        'When deciding whether a claim is “always”, “sometimes” or “never” true, one example may show “sometimes” and one counterexample may disprove “always”, but a universal claim needs logical justification.'
      ],
      formulas:['ℕ ⊂ whole numbers ⊂ ℤ ⊂ ℚ ⊂ ℝ','√2+(−√2)=0','√2×√2=2'],
      examples:[
        {title:'Worked example: number classification',question:'Classify 0, −5, 2/7, √16, √6.',steps:['0 is whole, integer, rational and real; not natural under our convention.','−5 is integer, rational and real.','2/7 is rational and real.','√16=4 is natural, whole, integer, rational and real.','√6 is irrational and real.'],answer:'The exact classification of each value is shown in the steps.'},
        {title:'Always, sometimes or never?',question:'Is the sum of two irrational numbers rational?',steps:['It can be rational: √3+(−√3)=0.','It can be irrational: √3+√3=2√3.'],answer:'Sometimes.'}
      ],
      tip:'Simplify first. √25 looks like a radical but equals 5, which is rational.'
    },
    {
      title:'Mixed exam applications and full solutions',
      paragraphs:[
        'A challenging numbers question often combines several ideas: simplifying an expression, identifying its number type and justifying whether its decimal representation terminates. Use a clear sequence: simplify exactly, apply the correct number-set definition, then interpret.',
        'Full working matters in proofs and multi-step calculations. Examiners can follow a logical chain even when a final value is incorrect; a bare number gives no evidence of your method. Put assumptions, transformation rules and restrictions next to the step where they are used.',
        'As a final independent test, solve the three problems below without reading the solutions. Then compare your reasoning with each worked answer. If a step seems unfamiliar, return to the named lesson above rather than memorising the result.'
      ],
      examples:[
        {title:'Exam problem 1: a decimal',question:'A fraction is 21/150. Decide whether its decimal expansion terminates and calculate it.',steps:['Cancel a common factor 3: 21/150=7/50.','In standard form, 50=2×5² contains only factors 2 and 5.','Convert to denominator 100: 7/50=14/100.'],answer:'Yes; it terminates at 0.14.'},
        {title:'Exam problem 2: number-system argument',question:'Explain why there are infinitely many rational numbers between −1/3 and 0.',steps:['The endpoints are rational and distinct, with −1/3<0.','Their midpoint is −1/6 and is rational.','Now average −1/3 with −1/6, then average again.','Each midpoint is a new rational strictly inside the interval.'],answer:'The midpoint procedure can be repeated without end, proving infinitude.'},
        {title:'Exam problem 3: irrational expression',question:'Simplify (√18 + √8)/√2, then classify the result.',steps:['√18=3√2 and √8=2√2.','Numerator is 5√2.','Divide by √2 (nonzero): 5√2/√2=5.','5 is an integer.'],answer:'5, a rational real number.'}
      ],
      tip:'If an expression contains an irrational-looking part, do not classify it before finishing the algebra.'
    }
  ];

  chapter.sections=chapter.sections.map(section=>{
    const extra=depth[section.title];
    if(!extra)return section;
    const merged={...section};
    merged.paragraphs=[...(section.paragraphs||[]),...(extra.paragraphs||[])];
    merged.formulas=[...new Set([...(section.formulas||[]),...(extra.formulas||[])])];
    merged.examples=[...(section.examples||[]),...(extra.examples||[])];
    merged.bullets=[...(section.bullets||[]),...(extra.bullets||[])];
    merged.tip=extra.tip||section.tip;
    return merged;
  });
  // The added teaching lessons are deliberately kept as independent sections.
  chapter.sections.splice(6,0,added[0],added[1],added[2],added[3],added[4]);
  chapter._studyaiTopicFirst=true;
  chapter._studyaiAuthoredDepth=true;
  window.STUDYAI_WORLD_OF_NUMBERS_STATUS={
    chapter:'The World of Numbers',
    lessonCount:chapter.sections.length,
    workedExamples:chapter.sections.reduce((count,s)=>count+(s.examples||[]).length,0),
    authoring:'original, chapter-specific'
  };
})();