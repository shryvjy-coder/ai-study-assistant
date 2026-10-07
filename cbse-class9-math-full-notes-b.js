/* Detailed, original StudyAI notes for CBSE Class 9 Mathematics, chapters 6-10.
 * Grounded in the user's supplied 2026-27 NCERT Ganita Manjari PDFs.
 */
(() => {
'use strict';
const notes=window.CBSE_CLASS9_MATH_FULL_NOTES=window.CBSE_CLASS9_MATH_FULL_NOTES||{};

notes['Measuring Space: Perimeter and Area']={
 lead:'This chapter connects boundary length and enclosed area across rectangles, parallelograms, triangles and circles. Exam questions often combine shapes, so the main skill is choosing the correct formula, identifying the required dimensions and keeping units consistent.',
 sections:[
  {title:'Perimeter and circumference',paragraphs:[
   'Perimeter is the total length around a closed figure. For a polygon, add all side lengths. For a circle, the perimeter is called the circumference.',
   'The ratio of a circle’s circumference C to its diameter d is constant for every circle. This constant is π, so C=πd=2πr.'
  ],formulas:['Circumference C = 2πr = πd'],examples:[{title:'Circumference',question:'Find the circumference of a circle of radius 7 cm using π=22/7.',steps:['Use C=2πr.','C=2×22/7×7.'],answer:'44 cm.'}],tip:'Use the value of π requested in the question. Do not switch between 22/7 and 3.14 midway through a calculation.'},
  {title:'Arc length',paragraphs:[
   'An arc is a fraction of a full circumference. A central angle of θ degrees represents θ/360 of the complete circle, so its arc length is the same fraction of 2πr.',
   'Major and minor arcs must be distinguished. If a minor arc corresponds to θ, the remaining major arc corresponds to 360°-θ.'
  ],formulas:['Arc length = (θ/360°) × 2πr'],examples:[{title:'Arc length',question:'Find the length of a 90° arc in a circle of radius 14 cm, using π=22/7.',steps:['90° is one quarter of a full circle.','Arc length=(90/360)×2×22/7×14.'],answer:'22 cm.'}]},
  {title:'Area of rectangles and parallelograms',paragraphs:[
   'The area of a rectangle is base×height. A parallelogram with the same base and perpendicular height has the same area as the rectangle because a triangular piece can be rearranged without changing area.',
   'The height must be perpendicular to the chosen base. A sloping side is not automatically the height.'
  ],formulas:['Rectangle area = length × breadth','Parallelogram area = base × perpendicular height'],tip:'Look for the right-angle mark or perpendicular distance. Using a slanted side as the height is a common exam error.'},
  {title:'Area of triangles',paragraphs:[
   'A triangle with base b and perpendicular height h has half the area of a parallelogram with the same base and height.',
   'When a perpendicular height is not directly given but all three sides are known, Heron’s formula can be used.'
  ],formulas:['Triangle area = ½bh','s = (a+b+c)/2','Heron: Area = √[s(s-a)(s-b)(s-c)]'],examples:[{title:'Heron’s formula',question:'Find the area of a triangle with sides 5 cm, 5 cm and 6 cm.',steps:['s=(5+5+6)/2=8.','Area=√[8(8-5)(8-5)(8-6)].','Area=√(8×3×3×2)=√144.'],answer:'12 cm².'}]},
  {title:'Area of a circle and sector',paragraphs:[
   'A circle can be rearranged conceptually into many narrow sectors that approximate a parallelogram. Its base approaches half the circumference, πr, and its height is r, giving area πr².',
   'A sector with central angle θ occupies θ/360 of the entire circle.'
  ],formulas:['Circle area = πr²','Sector area = (θ/360°) × πr²'],examples:[{title:'Sector area',question:'Find the area of a 60° sector in a circle of radius 6 cm.',steps:['60° is 1/6 of 360°.','Sector area=(60/360)×π×6².'],answer:'6π cm².'}]},
  {title:'Composite perimeter and area',paragraphs:[
   'For composite figures, break the shape into familiar pieces or subtract a removed part from a larger figure. Write down what each dimension represents before calculating.',
   'For perimeter, count only edges on the outside boundary. Internal dividing lines are not part of the perimeter unless the question specifically asks for them.'
  ],bullets:['Convert all lengths to one unit before using formulas.','Area units are squared, such as cm² or m².','Perimeter units are ordinary length units, such as cm or m.'],tip:'On shaded-area questions, sketch a quick “large area minus removed area” plan before inserting numbers.'}
 ]};

notes['The Mathematics of Maybe: Introduction to Probability']={
 lead:'Probability measures uncertainty on a scale from impossible to certain. This chapter develops experimental and theoretical probability, sample spaces, events and tree diagrams, so you should be able to list outcomes systematically and calculate probabilities without double-counting.',
 sections:[
  {title:'Randomness and the probability scale',paragraphs:[
   'A random experiment is one whose individual outcome cannot be predicted with certainty even when the possible outcomes are known. Examples include rolling a fair die or tossing a coin.',
   'Probabilities lie between 0 and 1. Probability 0 represents an impossible event and probability 1 a certain event.'
  ],formulas:['0 ≤ P(E) ≤ 1','P(certain event)=1','P(impossible event)=0'],tip:'Probability is not allowed to be negative or greater than 1. A result outside this range signals an error.'},
  {title:'Experimental probability',paragraphs:[
   'Experimental probability is based on observed relative frequency. If an event occurs f times in n trials, the estimate of its probability is f/n.',
   'With a small number of trials, the estimate may fluctuate. As the number of trials grows, the relative frequency often stabilises near the underlying probability.'
  ],formulas:['Experimental probability = frequency of event / total number of trials'],examples:[{title:'Relative frequency',question:'A spinner lands on red 37 times in 100 spins. Estimate P(red).',steps:['Use frequency/total trials.','P(red)≈37/100.'],answer:'0.37.'}]},
  {title:'Theoretical probability',paragraphs:[
   'When outcomes are equally likely, theoretical probability compares the number of favourable outcomes with the total number of outcomes in the sample space.',
   'The equally-likely condition matters. You cannot use simple counting if outcomes have different probabilities.'
  ],formulas:['P(E) = number of favourable equally likely outcomes / total equally likely outcomes'],examples:[{title:'Fair die',question:'What is the probability of rolling a prime number on a fair six-sided die?',steps:['Sample space={1,2,3,4,5,6}.','Prime outcomes are 2,3,5, so there are 3 favourable outcomes out of 6.'],answer:'3/6=1/2.'}]},
  {title:'Sample spaces and events',paragraphs:[
   'The sample space is the set of all possible outcomes. An event is a subset of the sample space consisting of outcomes with a specified property.',
   'Listing the sample space systematically is often the hardest part of a question. Tables, ordered pairs and tree diagrams help ensure no outcome is missed or repeated.'
  ],bullets:['Use braces to list a set of outcomes when appropriate.','For two-stage experiments, ordered pairs distinguish outcomes such as (H,T) and (T,H).','Check that probabilities of all mutually exclusive outcomes add to 1.']},
  {title:'Complementary events',paragraphs:[
   'The complement of event E means “E does not happen”. Since either E occurs or it does not, their probabilities add to 1.',
   'Complementary probability is especially efficient for “at least one” questions.'
  ],formulas:['P(not E) = 1 - P(E)'],examples:[{title:'Using a complement',question:'A bag draw has P(blue)=0.28. Find P(not blue).',steps:['Use 1-P(blue).','1-0.28=0.72.'],answer:'0.72.'}]},
  {title:'Tree diagrams',paragraphs:[
   'A tree diagram shows successive stages. Each branch represents an outcome and carries its probability. Multiply along a complete path to find the probability of that sequence.',
   'If several mutually exclusive paths satisfy the event, add their path probabilities.'
  ],formulas:['Along a path: multiply probabilities','Across mutually exclusive successful paths: add probabilities'],examples:[{title:'Two coin tosses',question:'Find the probability of exactly one head in two fair tosses.',steps:['Successful paths are HT and TH.','Each path has probability 1/2×1/2=1/4.','Add the two successful paths.'],answer:'1/4+1/4=1/2.'}],tip:'At every branching point, probabilities from that point should total 1.'}
 ]};

notes['Predicting What Comes Next: Exploring Sequences and Progressions']={
 lead:'A sequence is an ordered list generated by a rule. This chapter compares explicit and recursive descriptions and develops arithmetic and geometric progressions. Exam questions often ask you to identify the rule, find a distant term or explain how a pattern grows.',
 sections:[
  {title:'Sequences and term notation',paragraphs:[
   'A sequence is an ordered list of terms. The position of a term matters, so a₁ is the first term, a₂ the second and aₙ the nth term.',
   'A pattern may be numerical, geometric or contextual. Before assuming a rule, compare successive terms and look for consistent operations.'
  ],bullets:['First differences reveal additive patterns.','Ratios reveal multiplicative patterns.','A finite list alone can fit more than one possible rule, so use the intended structure of the question.']},
  {title:'Explicit rules',paragraphs:[
   'An explicit rule gives a term directly from its position n without needing earlier terms. This is useful for finding a far-away term quickly.',
   'For a linear sequence, the explicit rule is often of the form an+b because the first difference is constant.'
  ],examples:[{title:'Finding an explicit rule',question:'Find a rule for 5,8,11,14,…',steps:['The common difference is 3, so begin with 3n.','At n=1, 3n=3 but the sequence value is 5, so add 2.'],answer:'aₙ=3n+2.'}]},
  {title:'Recursive rules',paragraphs:[
   'A recursive rule defines each term using one or more preceding terms. It must include starting information, otherwise the sequence is not determined.',
   'For the sequence 5,8,11,14,… a recursive description is a₁=5 and aₙ=aₙ₋₁+3 for n≥2.'
  ],tip:'When writing a recursive rule, always state the starting term as well as the recurrence.'},
  {title:'Arithmetic progressions',paragraphs:[
   'An arithmetic progression (AP) has a constant difference d between consecutive terms. Starting from first term a, moving to the nth term involves adding d exactly n-1 times.',
   'This gives the standard nth-term formula.'
  ],formulas:['AP nth term: aₙ = a + (n-1)d'],examples:[{title:'Finding an AP term',question:'Find the 25th term of 7,11,15,…',steps:['a=7 and d=4.','a₂₅=7+(25-1)×4.','a₂₅=7+96.'],answer:'103.'}]},
  {title:'Sum of the first n natural numbers',paragraphs:[
   'The sum 1+2+…+n can be found by pairing terms from the beginning and end. Each pair sums to n+1, leading to the compact formula n(n+1)/2.',
   'The formula is useful in counting patterns as well as direct arithmetic sums.'
  ],formulas:['1+2+…+n = n(n+1)/2'],examples:[{title:'Natural-number sum',question:'Find 1+2+…+50.',steps:['Use n(n+1)/2 with n=50.','50×51/2=25×51.'],answer:'1275.'}]},
  {title:'Geometric progressions',paragraphs:[
   'A geometric progression (GP) has a constant ratio r between consecutive terms. Each term is obtained by multiplying the previous term by r.',
   'After n-1 multiplications, the nth term is arⁿ⁻¹.'
  ],formulas:['GP nth term: aₙ = arⁿ⁻¹'],examples:[{title:'Finding a GP term',question:'Find the 6th term of 3,6,12,24,…',steps:['a=3 and r=2.','a₆=3×2⁵.'],answer:'96.'}],tip:'Do not confuse common difference with common ratio. Check subtraction for APs and division for GPs.'},
  {title:'Visual patterns and fractals',paragraphs:[
   'Sequences can describe repeated geometric growth. A fractal-like construction may multiply the number of pieces by a constant factor at each stage, creating a geometric progression.',
   'Translate a picture into a table of stage number and quantity before trying to write a formula. This makes the underlying progression easier to see.'
  ]}
 ]};

notes['Propositions and their Converses']={
 lead:'Mathematics depends on precise statements and valid reasoning. This chapter focuses on propositions, converses, counterexamples and the difference between proving a claim and merely checking examples.',
 sections:[
  {title:'What is a proposition?',paragraphs:[
   'A proposition is a statement that is either true or false. Questions, commands and vague claims are not propositions because they do not have a definite truth value.',
   'Many mathematical propositions have the form “If P, then Q”, also written “P implies Q”. P is the condition and Q is the conclusion.'
  ]},
  {title:'The converse',paragraphs:[
   'The converse of “If P, then Q” is “If Q, then P”. A proposition and its converse are separate statements and can have different truth values.',
   'For example, “If a number is divisible by 6, then it is divisible by 3” is true. Its converse, “If a number is divisible by 3, then it is divisible by 6”, is false.'
  ],examples:[{title:'Writing a converse',question:'Write the converse of: If a quadrilateral is a square, then all its angles are equal.',steps:['Swap the condition and conclusion.'],answer:'If all angles of a quadrilateral are equal, then the quadrilateral is a square. This converse is false because a non-square rectangle is a counterexample.'}]},
  {title:'Counterexamples',paragraphs:[
   'A counterexample is a single valid example that contradicts a universal statement. One counterexample is enough to prove a universal claim false.',
   'Testing many examples that work does not prove a universal proposition true. A proof must cover every permitted case.'
  ],tip:'For a false statement, choose the simplest counterexample that clearly satisfies the condition but violates the conclusion.'},
  {title:'When both directions are true',paragraphs:[
   'Sometimes a proposition and its converse are both true. Then the two conditions are equivalent: each implies the other.',
   'A key geometric example is the Baudhāyana-Pythagoras theorem and its converse. In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. Conversely, if the side lengths satisfy that relation, the triangle is right-angled.'
  ],formulas:['Right triangle: a²+b²=c²','Converse: if a²+b²=c² for side lengths with c largest, the triangle is right-angled']},
  {title:'Proof versus example',paragraphs:[
   'A proof is a chain of statements where each step follows from definitions, known results or earlier steps. A diagram or numerical example can suggest a result but does not by itself prove it universally.',
   'When proving an implication, begin from the condition P and logically derive Q. When proving a converse, begin from Q instead.'
  ],bullets:['State what is given.','Use definitions or established results explicitly.','Keep the direction of implication clear.','Finish by stating the required conclusion.']},
  {title:'Divisibility and geometry applications',paragraphs:[
   'Divisibility statements are useful for practising implication because a stronger divisibility condition may imply a weaker one, while the converse often fails.',
   'Geometry contains many theorem-converse pairs. Parallel lines and corresponding angles, parallelogram tests and right-triangle conditions are common examples.'
  ],examples:[{title:'Divisibility converse',question:'Consider: If n is divisible by 24, then n is divisible by both 4 and 6. Is the converse true?',steps:['The original statement is true because 24 is divisible by 4 and 6.','The converse would say that divisibility by both 4 and 6 guarantees divisibility by 24.','Take n=12: it is divisible by 4 and 6, but not 24.'],answer:'The converse is false; 12 is a counterexample.'}]}
 ]};

notes['How Quantities Combine: Understanding Data']={
 lead:'This chapter is about combining information correctly. Averages from different groups cannot usually be averaged directly, mixtures require weighting by quantity, and graphs must be interpreted with attention to totals and proportions.',
 sections:[
  {title:'Combining averages',paragraphs:[
   'An average represents total contribution divided by number of observations. If two groups have different sizes, their means carry different weights.',
   'To combine group means, first reconstruct each group total using mean×group size. Then add totals and divide by the combined number of observations.'
  ],formulas:['Combined mean = (n₁x̄₁ + n₂x̄₂ + …)/(n₁+n₂+…)'],examples:[{title:'Combined average',question:'Class A has 20 students with mean score 70. Class B has 30 students with mean score 80. Find the combined mean.',steps:['Class A total=20×70=1400.','Class B total=30×80=2400.','Combined total=3800 for 50 students.','Mean=3800/50.'],answer:'76.'}],tip:'The simple average of two group means works only when the group sizes are equal.'},
  {title:'Weighted averages',paragraphs:[
   'A weighted average is used when values contribute unequally. Each value is multiplied by its weight, the weighted contributions are added, and the result is divided by the total weight.',
   'Group size, mass, percentage weight or scoring importance can all act as weights.'
  ],formulas:['Weighted mean = Σ(weight × value) / Σweights'],examples:[{title:'Weighted score',question:'A project counts 40% and an exam counts 60%. Scores are 75 and 85. Find the final weighted score.',steps:['Project contribution=0.40×75=30.','Exam contribution=0.60×85=51.','Add the contributions.'],answer:'81.'}]},
  {title:'Mixtures',paragraphs:[
   'Mixture problems are weighted-average problems in context. The total amount of a component equals the sum of the component amounts supplied by each batch.',
   'For concentrations, convert each concentration to a decimal or fraction, multiply by the quantity of that batch, and add component amounts before dividing by total mixture quantity.'
  ],formulas:['Mixture concentration = total amount of component / total mixture quantity'],examples:[{title:'Mixture concentration',question:'Mix 2 L of 30% solution with 3 L of 50% solution. Find the concentration.',steps:['Component from first=2×0.30=0.60 L.','Component from second=3×0.50=1.50 L.','Total component=2.10 L; total mixture=5 L.','2.10/5=0.42.'],answer:'42%.'}]},
  {title:'Custom weights and indices',paragraphs:[
   'Sometimes a problem defines its own weighting system. The same principle applies: identify each weight, multiply the corresponding value and normalise by the total weight if required.',
   'Read whether weights are already percentages summing to 100% or raw values that must be divided by their total.'
  ]},
  {title:'Stacked columns',paragraphs:[
   'A stacked column chart shows how a total is divided into parts. Compare total height for overall quantity and segment lengths for component quantities.',
   'If columns represent different totals, equal-looking segment proportions can correspond to different absolute amounts.'
  ],tip:'Decide whether the question asks about counts or proportions before comparing stacked bars.'},
  {title:'Alternatives to pie charts and interpreting proportions',paragraphs:[
   'Any proportional display must keep the denominator clear. A percentage describes a share of a whole, not an absolute count.',
   'When comparing categories across groups of different sizes, percentages are often more meaningful than raw counts. When total workload or quantity matters, raw counts may be more appropriate.'
  ],examples:[{title:'Count versus percentage',question:'Group A has 20 successes out of 25; Group B has 30 successes out of 50. Which has the higher success rate?',steps:['A:20/25=0.80=80%.','B:30/50=0.60=60%.'],answer:'Group A has the higher rate, even though Group B has more successes in absolute number.'}]}
 ]};
})();
