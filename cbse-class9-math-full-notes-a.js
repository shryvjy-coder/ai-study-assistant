/* Detailed, original StudyAI notes for CBSE Class 9 Mathematics, chapters 1-5.
 * Grounded in the user's supplied 2026-27 NCERT Ganita Manjari PDFs.
 */
(() => {
'use strict';
const notes=window.CBSE_CLASS9_MATH_FULL_NOTES=window.CBSE_CLASS9_MATH_FULL_NOTES||{};

notes['Orienting Yourself: The Use of Coordinates']={
 lead:'Coordinates give a precise numerical language for position. For exams, you should be able to read and plot points, interpret signs and axes, and calculate distances from coordinate differences rather than relying only on a sketch.',
 sections:[
  {title:'The Cartesian plane',paragraphs:[
   'A two-dimensional Cartesian plane is formed by two perpendicular number lines. The horizontal line is the x-axis and the vertical line is the y-axis. Their intersection is the origin, written O(0,0).',
   'A point is represented by an ordered pair (x,y). The first coordinate tells you the horizontal movement from the origin and the second tells you the vertical movement. Because the order is fixed, (3,2) and (2,3) are different points.'
  ],bullets:['x>0 means move right and x<0 means move left.','y>0 means move up and y<0 means move down.','A point on the x-axis has y=0. A point on the y-axis has x=0.'],tip:'Write coordinates in x-then-y order every time. Reversing the pair is one of the easiest ways to lose marks.'},
  {title:'Quadrants and signs',paragraphs:[
   'The axes divide the plane into four quadrants. The sign pattern is determined by direction from the origin, so you can work it out rather than memorise blindly.'
  ],bullets:['Quadrant I: (+,+)','Quadrant II: (-,+)','Quadrant III: (-,-)','Quadrant IV: (+,-)'],examples:[{title:'Reading a quadrant',question:'A point has coordinates (-4,3). Which quadrant is it in?',steps:['The x-coordinate is negative, so the point lies left of the y-axis.','The y-coordinate is positive, so it lies above the x-axis.'],answer:'Quadrant II.'}]},
  {title:'Plotting and reading coordinates',paragraphs:[
   'To plot (x,y), start at the origin, move x units horizontally, then y units vertically. Keep the graph scale in mind. A scale of 1 square = 2 units changes the number of grid squares you move.',
   'When reading a point, drop perpendiculars to the axes. Read the horizontal coordinate first and the vertical coordinate second.'
  ],bullets:['Label the axes and scale clearly.','Do not estimate from the shape of the diagram when exact grid coordinates are available.','Points sharing the same x-coordinate lie on a vertical line. Points sharing the same y-coordinate lie on a horizontal line.']},
  {title:'Horizontal and vertical distance',paragraphs:[
   'If two points have the same y-coordinate, their distance is the absolute difference of the x-coordinates. If they have the same x-coordinate, use the absolute difference of the y-coordinates.',
   'Absolute value is needed because distance cannot be negative.'
  ],formulas:['Horizontal distance = |x₂ − x₁|','Vertical distance = |y₂ − y₁|'],examples:[{title:'Distance on a horizontal line',question:'Find the distance between A(-3,5) and B(4,5).',steps:['Both points have y=5, so the segment is horizontal.','Distance = |4 - (-3)| = |7|.'],answer:'7 units.'}]},
  {title:'Distance between two general points',paragraphs:[
   'For points A(x₁,y₁) and B(x₂,y₂), the horizontal change and vertical change form the perpendicular sides of a right triangle. The line AB is the hypotenuse, so the Baudhāyana-Pythagoras theorem gives the distance formula.',
   'This is why you square coordinate differences before adding them. Squaring removes sign and connects the calculation to the right triangle.'
  ],formulas:['AB = √[(x₂ − x₁)² + (y₂ − y₁)²]'],examples:[{title:'Using the distance formula',question:'Find the distance between P(1,2) and Q(5,5).',steps:['Horizontal change = 5-1 = 4.','Vertical change = 5-2 = 3.','Distance = √(4²+3²) = √25.'],answer:'5 units.'}],tip:'Write the coordinate differences in brackets before squaring. This avoids sign errors when a coordinate is negative.'}
 ]};

notes['Introduction to Linear Polynomials']={
 lead:'A linear polynomial describes a quantity that changes at a constant rate. This chapter connects algebraic expressions, tables, patterns and straight-line representations, so you should understand both the symbolic form and what it means.',
 sections:[
  {title:'Polynomial language',paragraphs:[
   'A polynomial is built from variables and numerical coefficients using addition, subtraction and non-negative whole-number powers. In a linear polynomial, the highest power of the variable is 1.',
   'For ax+b, a is the coefficient of x and b is the constant term. The polynomial is linear when a≠0.'
  ],bullets:['5x-7 is linear.','3 is a constant polynomial.','x²+2x is not linear because its degree is 2.','1/x is not a polynomial in x because x has a negative power.'],tip:'Do not identify degree by counting terms. Degree is determined by the highest exponent of the variable.'},
  {title:'Evaluating a polynomial',paragraphs:[
   'To find the value of a polynomial for a given x, substitute the value carefully and perform operations in the correct order. Brackets are essential when substituting a negative number.'
  ],examples:[{title:'Substitution',question:'Find the value of p(x)=4x-3 when x=-2.',steps:['Substitute x=-2: p(-2)=4(-2)-3.','Multiply first: -8-3.'],answer:'p(-2)=-11.'}]},
  {title:'Linear patterns and constant change',paragraphs:[
   'A linear pattern changes by the same amount for each equal step in the input. If x increases by 1 and the output always increases by 4, the constant rate of change is 4.',
   'A table can reveal whether a rule is linear. Compare successive output differences when the input steps are equal.'
  ],bullets:['Constant first differences indicate a linear relationship for equally spaced input values.','A starting value and a constant change are enough to build the rule.']},
  {title:'From a pattern to a rule',paragraphs:[
   'Suppose a sequence of outputs is 7,10,13,16 for inputs 1,2,3,4. The output rises by 3 each time, so the variable part is 3x. To find the constant part, compare 3x with an actual output. At x=1, 3x=3 but the output is 7, so add 4.',
   'The rule is therefore y=3x+4. Checking another row confirms it.'
  ],examples:[{title:'Building a linear rule',question:'For x=1,2,3 the values of y are 9,14,19. Find a linear rule.',steps:['The output increases by 5 each time, so start with 5x.','At x=1, 5x=5 but y=9, so add 4.','Check x=3: 5(3)+4=19.'],answer:'y=5x+4.'}]},
  {title:'Visualising a linear relationship',paragraphs:[
   'When ordered pairs from a linear relationship are plotted, they lie on one straight line. The graph gives a geometric picture of the same relationship shown by the algebraic rule and the value table.',
   'A point lies on the graph only if its coordinates satisfy the rule. Substitution is therefore a quick way to check whether a point belongs to the line.'
  ],examples:[{title:'Checking a point',question:'Does (4,11) lie on y=2x+3?',steps:['Substitute x=4 into the rule: y=2(4)+3=11.','The calculated y matches the point.'],answer:'Yes, (4,11) lies on the graph.'}],tip:'A straight-looking sketch is not proof that a point satisfies a rule. Verify with substitution when exact coordinates are given.'}
 ]};

notes['The World of Numbers']={
 lead:'This chapter builds the real number system step by step, from natural numbers and zero to integers, rational numbers and irrational numbers. For exams, you need the definitions, arithmetic properties, number-line ideas, decimal behaviour and the reasoning used to distinguish rational from irrational numbers.',
 sections:[
  {title:'Natural numbers, zero and integers',paragraphs:[
   'Natural numbers arise from counting: 1,2,3,… . Adding 0 gives the whole numbers. Extending the number line to the left of zero introduces negative integers, so the integers include negative whole numbers, zero and positive whole numbers.',
   'Integers are closed under addition, subtraction and multiplication, but not under ordinary division. For example, 3÷2 is not an integer.'
  ],formulas:['ℕ = {1,2,3,…}','ℤ = {…,-3,-2,-1,0,1,2,3,…}'],bullets:['Adding 0 leaves a number unchanged.','Multiplying any number by 0 gives 0.','Subtracting a negative number is equivalent to adding its positive opposite.']},
  {title:'Rational numbers',paragraphs:[
   'A rational number is any number that can be written as p/q where p and q are integers and q≠0. Integers are rational because n=n/1.',
   'The same rational number can have many fractional representations. Multiplying or dividing numerator and denominator by the same non-zero integer gives an equivalent fraction.'
  ],formulas:['Rational number = p/q, where p,q∈ℤ and q≠0','a/b = c/d exactly when ad = bc'],bullets:['Rational numbers are closed under addition, subtraction and multiplication.','They are closed under division as long as the divisor is not 0.','Addition and multiplication are commutative for rational numbers.','Multiplication distributes over addition.'],examples:[{title:'Testing equality of fractions',question:'Are 14/21 and 2/3 equal?',steps:['Cross multiply: 14×3=42.','21×2=42.','The cross products are equal.'],answer:'Yes, the fractions represent the same rational number.'}]},
  {title:'Representing rational numbers on the number line',paragraphs:[
   'To locate p/q, divide each unit interval into q equal parts and count p parts from zero in the correct direction. Positive values lie to the right and negative values to the left.',
   'Improper fractions are handled in the same way. First identify the two consecutive integers between which the value lies.'
  ],examples:[{title:'Locating an improper fraction',question:'Where does 9/4 lie?',steps:['9/4=2¼, so it lies between 2 and 3.','Divide the interval from 2 to 3 into 4 equal parts.','Move one quarter-unit to the right of 2.'],answer:'At 2¼ on the number line.'}]},
  {title:'Density of rational numbers',paragraphs:[
   'Between any two different rational numbers there are infinitely many other rational numbers. This means the rational number line has no immediate “next” rational number.',
   'One simple way to find a rational number between a and b is to take their average (a+b)/2. Repeating the process produces more values.'
  ],formulas:['A rational between a and b = (a+b)/2'],examples:[{title:'Finding numbers in between',question:'Find a rational number between 2/5 and 3/5.',steps:['Average them: (2/5+3/5)/2.','This is (5/5)/2 = 1/2.'],answer:'1/2 is one rational number between them.'}]},
  {title:'Irrational numbers',paragraphs:[
   'An irrational number cannot be expressed as p/q with integers p and q, q≠0. Its decimal expansion is non-terminating and non-repeating.',
   'Square roots of non-perfect-square positive integers, such as √2 and √3, are important examples. The symbol √2 names an exact number, while 1.414… is a decimal approximation.'
  ],bullets:['Every integer is rational, but not every real number is rational.','A non-terminating decimal can still be rational if it repeats.','Irrational numbers fill points on the real number line that rational numbers alone do not describe.']},
  {title:'Why √2 is irrational',paragraphs:[
   'A standard proof uses contradiction. Assume √2 is rational and can be written p/q in lowest terms. Squaring gives p²=2q², so p² is even and therefore p is even. Write p=2k.',
   'Substituting back gives 4k²=2q², so q²=2k² and q is also even. Then p and q share a factor 2, contradicting the assumption that p/q was already in lowest terms. The original assumption must be false.'
  ],tip:'In an irrationality proof, the contradiction must connect back to the assumption. Simply showing several decimal digits is not a proof.'},
  {title:'Constructing square-root lengths',paragraphs:[
   'Irrational lengths can be represented exactly using geometry. A right triangle with perpendicular sides 1 and 1 has hypotenuse √2. Adding another perpendicular unit segment can produce √3, and continuing gives the square-root spiral idea.',
   'The construction depends on repeated use of the Baudhāyana-Pythagoras theorem, not on decimal approximations.'
  ],formulas:['If perpendicular sides are a and b, hypotenuse = √(a²+b²)']},
  {title:'Decimal expansions of real numbers',paragraphs:[
   'Rational numbers have decimal expansions that either terminate or eventually repeat. Irrational numbers have decimal expansions that never terminate and never fall into a repeating cycle.',
   'A terminating decimal is rational because it can be written over a power of 10. A repeating decimal is also rational because algebra can convert the repeating pattern into a fraction.'
  ],examples:[{title:'Classifying decimals',question:'Classify 0.272727… and 0.1010010001…',steps:['0.272727… repeats the block 27, so it is rational.','0.1010010001… does not settle into a repeating block, so it is irrational.'],answer:'The first is rational; the second is irrational.'}],tip:'Do not use “non-terminating” alone to identify an irrational number. You must also check that the decimal is non-repeating.'}
 ]};

notes['Exploring Algebraic Identities']={
 lead:'An algebraic identity is an equality that remains true for every permitted value of its variables. This chapter develops identities through algebra and area models, then uses them to expand, factorise and simplify expressions.',
 sections:[
  {title:'Identity versus equation',paragraphs:[
   'An equation such as x+3=7 is true only for specific values of x. An identity such as (a+b)²=a²+2ab+b² is true for all values of a and b.',
   'A quick numerical check can detect a false identity, but checking examples cannot prove an identity universally. A proof comes from valid algebra or geometry.'
  ],tip:'If the question says “show that” or “verify the identity”, transform one side logically into the other rather than substituting a few numbers.'},
  {title:'Square identities',paragraphs:[
   'The square of a sum can be visualised as a square of side a+b. Splitting its area gives one a² square, two ab rectangles and one b² square.',
   'The square of a difference follows from the same distributive structure, but the middle term is negative.'
  ],formulas:['(a+b)² = a² + 2ab + b²','(a-b)² = a² - 2ab + b²'],examples:[{title:'Using an identity',question:'Expand (3x-5)².',steps:['Use (a-b)²=a²-2ab+b² with a=3x and b=5.','a²=9x², -2ab=-30x, b²=25.'],answer:'9x²-30x+25.'}]},
  {title:'Difference of two squares',paragraphs:[
   'The expression a²-b² factorises into two conjugate factors. This identity is especially useful when two square terms are separated by subtraction.'
  ],formulas:['a² - b² = (a-b)(a+b)'],examples:[{title:'Factorising a difference of squares',question:'Factorise 49x²-16.',steps:['49x²=(7x)² and 16=4².','Apply a²-b²=(a-b)(a+b).'],answer:'(7x-4)(7x+4).'}]},
  {title:'Factorisation',paragraphs:[
   'Factorisation rewrites an expression as a product. Always check first for a common factor before using an identity.',
   'After factorising, multiply the factors back mentally or on paper to verify the middle terms and signs.'
  ],bullets:['Common-factor method: ab+ac=a(b+c).','Identity method: recognise a²±2ab+b² as a perfect square.','Difference-of-squares method requires subtraction between two perfect squares.']},
  {title:'Building and discovering identities',paragraphs:[
   'You can derive new identities by expanding both sides with the distributive law and collecting like terms. This is safer than memorising a long list without understanding.',
   'Geometric area models are useful because they explain where each term comes from, especially the coefficient 2 in square identities.'
  ]},
  {title:'Rational algebraic expressions',paragraphs:[
   'A rational algebraic expression is a quotient of algebraic expressions. Simplification works like fraction simplification, but a factor can be cancelled only when it multiplies the whole numerator and denominator.',
   'Restrictions matter because a denominator must never equal zero. A simplified expression can hide a restriction that existed in the original form.'
  ],examples:[{title:'Simplifying by factors',question:'Simplify (x²-9)/(x-3), where x≠3.',steps:['Factor the numerator: x²-9=(x-3)(x+3).','Cancel the common factor x-3.','Keep the original restriction x≠3.'],answer:'x+3, for x≠3.'}],tip:'Never cancel terms across addition or subtraction. Factor first, then cancel common factors.'}
 ]};

notes['I’m Up and Down, and Round and Round']={
 lead:'Circle geometry is driven by exact definitions and theorem relationships. Drawings help you see the structure, but exam answers must justify conclusions using radius, chord, perpendicular-bisector and angle properties.',
 sections:[
  {title:'Circle vocabulary',paragraphs:[
   'A circle is the set of all points at a fixed distance from a fixed point called the centre. A radius joins the centre to the circle. A chord joins two points on the circle, and a diameter is a chord through the centre.',
   'An arc is part of the circumference. A sector is bounded by two radii and an arc, while a segment is bounded by a chord and its corresponding arc.'
  ],tip:'Use the correct term. A diameter is a special chord, but not every chord is a diameter.'},
  {title:'Symmetry and determining a circle',paragraphs:[
   'Every diameter is an axis of reflection symmetry of a circle, and rotations about the centre preserve the circle.',
   'Three non-collinear points determine exactly one circle. The centre is found at the intersection of perpendicular bisectors of chords joining the points.'
  ],bullets:['Two distinct points generally allow infinitely many circles through them.','Three collinear points cannot lie on one finite circle.']},
  {title:'Chords and the centre',paragraphs:[
   'The perpendicular from the centre of a circle to a chord bisects the chord. Conversely, a line from the centre to the midpoint of a chord is perpendicular to the chord.',
   'These results are usually proved using congruent right triangles formed by equal radii.'
  ],examples:[{title:'Using chord bisection',question:'A chord AB has length 12 cm. OM is perpendicular from centre O to AB. Find AM.',steps:['A perpendicular from the centre to a chord bisects the chord.','AM=AB/2=12/2.'],answer:'6 cm.'}]},
  {title:'Equal chords and distance from the centre',paragraphs:[
   'Equal chords of the same circle are equidistant from the centre. The converse is also true: chords at equal perpendicular distances from the centre are equal.',
   'For unequal chords, the longer chord lies closer to the centre. The diameter, the longest chord, passes through the centre and therefore has distance 0 from it.'
  ],tip:'When comparing chord distances, measure perpendicular distance from the centre, not the distance to an endpoint.'},
  {title:'Angles subtended by arcs and chords',paragraphs:[
   'For the same arc, the angle at the centre is twice the angle at a point on the remaining circle. This links central angles and angles at the circumference.',
   'Angles standing on the same chord in the same segment are equal. A diameter subtends a right angle at the circumference because its central angle is 180°.'
  ],formulas:['Angle at centre = 2 × angle at circumference on the same arc'],examples:[{title:'Central and inscribed angle',question:'An arc subtends 124° at the centre. What angle does it subtend at the circumference on the same arc?',steps:['The circumference angle is half the centre angle.','124°÷2=62°.'],answer:'62°.'}]},
  {title:'Concyclic points and cyclic quadrilaterals',paragraphs:[
   'Points are concyclic when one circle passes through all of them. A quadrilateral with all four vertices on a circle is cyclic.',
   'Opposite angles of a cyclic quadrilateral are supplementary. The converse is also useful: if a pair of opposite angles in a quadrilateral sum to 180°, the quadrilateral is cyclic.'
  ],formulas:['For cyclic ABCD: ∠A + ∠C = 180° and ∠B + ∠D = 180°'],examples:[{title:'Cyclic quadrilateral',question:'In cyclic ABCD, ∠A=108°. Find ∠C.',steps:['Opposite angles in a cyclic quadrilateral sum to 180°.','∠C=180°-108°.'],answer:'72°.'}],tip:'State the circle theorem you are using. An unexplained angle answer can lose method marks.'}
 ]};
})();
