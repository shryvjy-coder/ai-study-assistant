/* Additional original concept-first teaching prose for NCERT Grade 9, Ganita Manjari,
 * The World of Numbers (iemh103). Unlike a syllabus checklist, each subsection
 * explains the idea, its mathematical basis and representative counterexamples.
 */
(() => {
'use strict';
const bank=window.CBSE_CLASS9_MATH_FULL_NOTES;
const chapter=bank?.['The World of Numbers'];
if(!chapter||chapter._studyaiConceptFirst)return;
const lessons={
'Natural numbers, zero and integers':{
 figureId:'integers',
 subtopics:[
  {title:'Numbers began as a way to compare collections',paragraphs:[
   'Before symbols such as 7 or 12 are introduced, counting is the idea of matching objects one by one. Imagine placing one pebble aside for every sheep leaving an enclosure. On their return, each pebble is paired with one sheep. If all pebbles are paired, none is missing. This establishes equality of two collections without writing any numeral at all. The mathematical principle is one-to-one correspondence.',
   'Recorded tallies are evidence of early number thinking. The Ishango and Lebombo bones are often discussed in the history of counting, although interpretations of the exact purposes of ancient marks remain uncertain. The enduring idea is that repeated marks represent repeated units, allowing quantities to be preserved and compared.',
   'The natural numbers 1, 2, 3, … formalise counting. Their sequence has no final term: if n is natural, n+1 is a larger natural. When we add zero to express the empty collection, we get whole numbers. Extending in the opposite direction from zero gives negative integers. The symbols ℕ and ℤ name sets, not individual numbers.'
  ]},
  {title:'Zero is both a number and a placeholder',paragraphs:[
   'In 205, the zero is a placeholder indicating that there are no tens; without it, 25 would mean a different number. But zero also has its own arithmetic properties. It records the result of taking away a quantity from itself: 9−9=0. It is not merely a blank space.',
   'The additive identity is zero because a+0=a for every number a. The multiplicative identity is one because a×1=a. Multiplication by zero gives zero, which is not the same rule. Division by zero cannot be defined in ordinary arithmetic: a proposed answer to 5÷0 would need to multiply by 0 to give 5, which no number does.',
   'Brahmagupta developed formal rules involving zero and negative numbers in seventh-century Indian mathematics. In his debt-and-fortune interpretation, a positive number can represent a fortune and a negative number a debt. A zero balance is neither a fortune nor a debt.'
  ]},
  {title:'Why signed arithmetic behaves as it does',paragraphs:[
   'A sign can express a direction relative to a reference level. If an elevator starts at floor 0, rises 4 floors and descends 7, its final level is 0+4−7=−3. Adding a negative number is a movement left on the number line, while subtracting a negative reverses that movement.',
   'The number −6 is less than −2, but both have nonnegative distances from zero. Absolute value |x| means precisely that distance. Thus |−6|=6 and |−2|=2. The distance between two numbers a and b is |a−b|; for −4 and 3, it is |−4−3|=7.',
   'Two negative factors produce a positive product because multiplication must remain consistent with distributivity. Since (−3)(4+(−4))=0 and (−3)×4=−12, the product (−3)×(−4) must be +12 to make the sum zero. This is an explanation, not an arbitrary rule to memorize.'
  ]}
]},
'Rational numbers':{
 subtopics:[
  {title:'A ratio of integers describes an exact number',paragraphs:[
   'A rational number is any value equal to p/q, where p and q are integers and q is nonzero. The slash represents division. All integers qualify: −7=−7/1 and zero=0/1. The form p/q is important because neither terminating decimals nor “looks like a fraction” is the fundamental definition.',
   'Think of 3/4 as three steps on a number line where a whole unit has been split into four equal steps. It also represents division 3÷4 and a scaling factor: multiplying a length by 3/4 makes it three quarters as long. Equivalent fractions are different descriptions of the same point or scaling factor, never different amounts.'
  ]},
  {title:'Equivalent fractions and coprime form',paragraphs:[
   'Dividing the numerator and denominator by the same common factor does not change a fraction. For example, −18/24 = −3/4 because six equally sized groups are removed from both parts of the ratio. The standard form has a positive denominator and no common factor larger than 1 in numerator and denominator.',
   'When two fractions a/b and c/d have nonzero denominators, a/b=c/d exactly when ad=bc. To understand this, multiply both fractions by bd. Both denominators then disappear without changing equality because the same nonzero quantity is applied to each side.'
  ]},
  {title:'Fraction arithmetic is a consequence of equal units',paragraphs:[
   'Fractions can only be directly added after expressing them in units of the same size. A half and a third become three sixths and two sixths. So 1/2+1/3=3/6+2/6=5/6. Simply adding numerators and denominators, obtaining 2/5, would combine unequal-sized pieces incorrectly.',
   'To multiply 2/3 by 3/4, imagine taking two thirds of a length that already measures three quarters of a whole: (2×3)/(3×4)=1/2. Division by a nonzero fraction is undoing its scaling factor; the inverse of multiplying by 2/3 is multiplying by 3/2.',
   'Rational numbers are closed under addition, subtraction and multiplication, and under division by any nonzero rational number. They are commutative and associative under addition and multiplication. Division does not obey these two properties in general.'
  ]}
]},
'Representing rational numbers on the number line':{
 figureId:'rational',
 subtopics:[
  {title:'Equal intervals make fractional locations exact',paragraphs:[
   'A number line has an origin, a positive direction and an agreed unit length. The tick labelled 1 is exactly one unit from 0. Dividing that segment into four equal parts produces quarter-unit positions 1/4, 2/4, 3/4 and 4/4. The figure above marks 3/4 at the third quarter-step; each gap is the same length.',
   'If the numerator is larger than the denominator, continue past 1. For example, 9/4 = 2+1/4: first move two whole units, then one quarter. For negative fractions, move left. The point −7/4 lies between −2 and −1, one quarter unit to the right of −2.',
   'Fractions with different denominators can still represent exactly the same position. The point 1/2 is the point 2/4 and the point 50/100. Plotting them would not create separate marks.'
  ]},
  {title:'Order comes from position, not appearance',paragraphs:[
   'To compare −2/3 and −3/4, first express both over denominator 12: −8/12 and −9/12. On the line, −8/12 lies to the right of −9/12, so −2/3 is greater. A fraction with larger digits is not automatically greater, particularly when signs differ.',
   'The absolute value of a signed fraction tells how far its position is from zero. The distance between −3/4 and 1/2 is |−3/4−1/2|=|−5/4|=5/4 units. It is a distance, so the result cannot be negative.'
  ]}
]},
'Density of rational numbers':{
 subtopics:[
  {title:'A number system without adjacent points',paragraphs:[
   'Unlike the integers, rational numbers have no immediate neighbours. There is no “next fraction” after 1/2. For any rational a<b, the midpoint (a+b)/2 is rational and lies strictly between the endpoints. Repeating this construction produces infinitely many distinct rational numbers inside the same interval.',
   'For example, between 1/3 and 1/2, the midpoint is (1/3+1/2)/2=(5/6)/2=5/12. Between 1/3 and 5/12 lies 3/8. We can carry on without reaching a final fraction. This reasoning applies even when the endpoints are negative.',
   'Density does not say that rational numbers include every point of the number line. It says they occur arbitrarily close to any selected real position. The irrational numbers, introduced in the next lessons, occupy other exact positions.'
  ]}
]},
'Irrational numbers':{
 figureId:'root2',
 subtopics:[
  {title:'A perfectly ordinary square creates a surprising number',paragraphs:[
   'Take a square with sides exactly one unit long. The diagonal forms the hypotenuse of a right triangle whose other sides are both 1. By the Pythagorean theorem, d²=1²+1²=2, so d=√2. The positive square root is an exact geometric length, whether or not we know many of its decimal digits.',
   'This length cannot be written as a ratio of two integers, even though every rational fraction can approximate it. Thus √2 is irrational. Decimal digits such as 1.41421356… name successive approximations; the symbol √2 preserves the exact value.',
   'Not every radical names an irrational number. √49=7, √(4/9)=2/3, and √18/√2=√9=3 are all rational after simplification.'
  ]},
  {title:'Another irrational number: π',paragraphs:[
   'The ratio of the circumference of any circle to its diameter is π. This ratio is the same for circles of all sizes. It is irrational, so its exact value cannot be captured by any integer fraction or finite decimal. Familiar fractions such as 22/7 and decimal 3.14 are approximations, not identities.',
   'Āryabhaṭa gave the approximation 3.1416, and Indian mathematicians including Mādhava developed striking methods for approximating π. The mathematical lesson is the difference between a computed approximation, which may be very accurate, and an exact irrational number, which does not become rational just because its value can be estimated.',
   'In a calculation involving π, leave the symbol π intact unless the problem specifically asks for a decimal approximation or fixes a value such as 22/7.'
  ]}
]},
'Why √2 is irrational':{
 subtopics:[
  {title:'Why the proof must begin in lowest terms',paragraphs:[
   'Suppose, for a contradiction, that √2=p/q for integers p and q with no common factor greater than 1 and q nonzero. Any rational number can be represented this way by cancelling common factors. We are therefore not assuming something special about p/q; we are using the standard form available to every rational.',
   'Squaring gives p²=2q². That equality makes p² even and therefore p even. Write p=2k; substitution gives 4k²=2q², and hence q²=2k². Now q is also even. But that makes both p and q divisible by 2, contradicting the fraction being in lowest terms.'
  ]},
  {title:'The parity fact behind the contradiction',paragraphs:[
   'We used the rule that an even square has an even integer base. To justify it, every odd integer has the form 2n+1, whose square is 4n²+4n+1=2(2n²+2n)+1, still odd. Consequently, if a square is even, the base cannot be odd.',
   'The contradiction rules out every proposed rational representation at once. Looking at many decimal digits would not achieve that, because a repeating decimal might have a repeating block that begins farther on than the digits you inspected.'
  ]}
]},
'Constructing square-root lengths':{
 figureId:'root2',
 subtopics:[
  {title:'Exact geometry versus rounded measurements',paragraphs:[
   'To represent √2, construct two perpendicular 1-unit segments, join their free endpoints, and use the Pythagorean theorem. The hypotenuse has length √2 exactly. With a compass, transfer that segment onto a number line starting at zero; the marked point is exact in the mathematical construction.',
   'The square-root spiral repeats the same right-triangle idea: start from a hypotenuse of √n and erect a new perpendicular unit segment. The next hypotenuse has length √(n+1). Every step must include a right angle; the spiral is not just a curved decorative pattern.'
  ]}
]},
'Decimal expansions of real numbers':{
 figureId:'repeating',
 subtopics:[
  {title:'Why long division eventually repeats',paragraphs:[
   'When dividing one integer by a positive denominator q, every step leaves a remainder from 0 through q−1. If a remainder becomes zero, the decimal ends. Otherwise there are only finitely many nonzero remainders, so some remainder must return. When it returns, the same arithmetic gives the same next digit, forcing a repeating cycle.',
   'The diagram traces long division of 1 by 7. The remainder sequence is 1, 3, 2, 6, 4, 5 and back to 1. The quotient digits produced in that order are 1, 4, 2, 8, 5, 7. Thus 1/7=0.142857142857… . The six-digit block repeats indefinitely, so this is a rational decimal even though it never ends.',
   'A decimal such as 0.1666… is also rational despite its initial non-repeating digit; the repeating cycle starts after the tenths place.'
  ]},
  {title:'Why denominators containing only 2 and 5 terminate',paragraphs:[
   'Every finite decimal has denominator some power of ten. The prime factorisation of 10ⁿ is 2ⁿ5ⁿ, so a fraction in lowest terms terminates exactly when its denominator has no prime factors other than 2 and 5. For example, 7/40=0.175 because 40=2³×5. By contrast, 1/6 repeats because its reduced denominator contains factor 3.',
   'The fraction must first be reduced. Although 6/15 has a denominator divisible by 3, it equals 2/5, and its decimal is 0.4. The property is about the reduced denominator, not the unreduced notation.'
  ]}
]},
'Fraction to decimal and repeating decimal to fraction':{
 subtopics:[
  {title:'Why the algebraic method removes a recurring tail',paragraphs:[
   'Let x=0.454545… . Multiplying by 100 shifts a repeating two-digit block to the left, so 100x=45.454545… . Subtract x from this new equation. The recurring tails cancel digit for digit, leaving 99x=45 and x=5/11.',
   'This subtraction is not a shortcut based on seeing the digits 45. It works because the same repeating infinite tail appears on both sides after shifting by one complete period. A one-digit cycle needs a factor of 10; a three-digit cycle needs a factor of 1000.'
  ]}
]},
'Comparing, ordering and approximating real numbers':{
 subtopics:[
  {title:'Bounds prove an approximation is reasonable',paragraphs:[
   'To estimate √7, notice that 2²=4<7<9=3², so 2<√7<3. Checking 2.6²=6.76 and 2.7²=7.29 improves the bounds to 2.6<√7<2.7. Each extra decimal digit can be found by repeating this process with smaller intervals.',
   'The inequalities are exact evidence. Writing √7≈2.65 is an approximation that might or might not have the requested precision. Always distinguish = from ≈ and state the number of decimal places only when relevant.'
  ]}
]},
'Simplifying radicals and operations involving irrational numbers':{
 subtopics:[
  {title:'Why perfect-square factors can be brought outside the root',paragraphs:[
   'For nonnegative numbers a and b, √(ab)=√a×√b. Thus √72=√(36×2)=6√2. This is an exact simplification. Like radicals combine, such as 3√2+5√2=8√2; unlike radicals generally do not.',
   'A common error is √(a+b)=√a+√b. It is false: √(9+16)=√25=5 but √9+√16=3+4=7. Multiplication, not addition, is the operation compatible with separating square roots under the stated conditions.'
  ]}
]},
'Properties, inclusion and classification of number sets':{
 subtopics:[
  {title:'The hierarchy of number systems',paragraphs:[
   'The natural numbers lie inside the whole numbers, which lie inside the integers, which lie inside the rational numbers. Add all irrationals to the rationals and you have the real numbers. Classifying 4 means recognising it belongs to each applicable family: natural, whole, integer, rational and real.',
   'An irrational number such as √3 is real but not rational. Zero is whole, integer, rational and real, but is not natural if we take natural numbers to start at 1. The number sets overlap by containment; rational and irrational numbers themselves are disjoint.'
  ]},
  {title:'Why the chapter ends by looking beyond the real line',paragraphs:[
   'The square of a real number is never negative. A positive real squared is positive, a negative real squared is also positive, and zero squared is zero. Therefore no real number satisfies x²=−1.',
   'In later mathematics the imaginary unit i is introduced with i²=−1, leading to complex numbers. This is a brief preview, not a reason to call √(−1) an irrational real number. Irrational numbers still belong to the reals, while i does not.'
  ]}
]}
};

for(const section of chapter.sections){
 const item=lessons[section.title];
 if(!item)continue;
 section.subtopics=item.subtopics;
 if(item.figureId)section.figureId=item.figureId;
}
// Teach concepts before applications; retain every chapter-specific lesson.
const lessonOrder=[
 'Natural numbers, zero and integers',
 'Rational numbers',
 'Representing rational numbers on the number line',
 'Density of rational numbers',
 'Irrational numbers',
 'Why √2 is irrational',
 'Constructing square-root lengths',
 'Decimal expansions of real numbers',
 'Fraction to decimal and repeating decimal to fraction',
 'Comparing, ordering and approximating real numbers',
 'Simplifying radicals and operations involving irrational numbers',
 'Properties, inclusion and classification of number sets',
 'Mixed exam applications and full solutions'
];
chapter.sections.sort((a,b)=>lessonOrder.indexOf(a.title)-lessonOrder.indexOf(b.title));
chapter._studyaiConceptFirst=true;
window.STUDYAI_CONCEPT_FIRST_STATUS={
 chapter:chapter.lead,
 taughtSections:chapter.sections.filter(s=>Array.isArray(s.subtopics)&&s.subtopics.length).length,
 teachingSubsections:chapter.sections.reduce((n,s)=>n+(s.subtopics?.length||0),0),
 conceptFigures:chapter.sections.filter(s=>s.figureId).length
};
})();