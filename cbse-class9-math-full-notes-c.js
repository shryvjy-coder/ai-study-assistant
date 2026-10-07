/* Detailed, original StudyAI notes for CBSE Class 9 Mathematics, chapters 11-14.
 * Grounded in the user's supplied 2026-27 NCERT Ganita Manjari PDFs.
 */
(() => {
'use strict';
const notes=window.CBSE_CLASS9_MATH_FULL_NOTES=window.CBSE_CLASS9_MATH_FULL_NOTES||{};

notes['The World of Algorithms']={
 lead:'An algorithm is a finite and unambiguous procedure for solving a problem. This chapter treats arithmetic procedures as algorithms and then improves them, showing how correctness, data organisation and efficiency matter in mathematical problem solving.',
 sections:[
  {title:'What makes a procedure an algorithm?',paragraphs:[
   'An algorithm must have clearly defined steps, valid inputs, a definite output and a stopping condition. A vague instruction such as “continue until it looks right” is not a good algorithm because different people may interpret it differently.',
   'Correctness means the procedure gives the intended result for every input in its stated domain. Efficiency asks how much work the algorithm needs as the input becomes larger.'
  ],bullets:['Finite: it must terminate.','Unambiguous: every step has one clear meaning.','Effective: each step can actually be carried out.','Correct: the result must match the problem specification.'],tip:'In explanation questions, distinguish correctness from speed. A slower method can still be correct.'},
  {title:'Adding numbers digit by digit',paragraphs:[
   'The standard written addition method is an algorithm. It processes digits from right to left, adds corresponding place values and carries any excess into the next column.',
   'Thinking of familiar arithmetic as an algorithm helps identify the state being stored at each step: the current column, the carry and the partial output.'
  ],examples:[{title:'Tracing written addition',question:'Describe the key steps for adding 487 and 596.',steps:['Units: 7+6=13, write 3 and carry 1.','Tens: 8+9+1=18, write 8 and carry 1.','Hundreds: 4+5+1=10.'],answer:'The sum is 1083.'}]},
  {title:'Divisors and greatest common divisor',paragraphs:[
   'A common divisor of two positive integers divides both exactly. The greatest common divisor, gcd, is the largest such positive integer.',
   'One direct algorithm lists divisors of both numbers and chooses the largest common value. It is easy to understand but becomes inefficient for large numbers.'
  ],formulas:['gcd(a,b) = greatest positive integer dividing both a and b'],examples:[{title:'GCD by listing',question:'Find gcd(18,30).',steps:['Divisors of 18: 1,2,3,6,9,18.','Divisors of 30: 1,2,3,5,6,10,15,30.','Largest common divisor is 6.'],answer:'gcd(18,30)=6.'}]},
  {title:'Improving an algorithm',paragraphs:[
   'A good improvement avoids unnecessary work while preserving the answer. For gcd, testing every possible divisor wastes effort because the problem can be reduced repeatedly to smaller equivalent problems.',
   'When comparing algorithms, count meaningful operations or trace the number of iterations on the same input. A method that scales better becomes increasingly valuable for large numbers.'
  ]},
  {title:'Euclid’s subtraction algorithm',paragraphs:[
   'If a>b, then gcd(a,b)=gcd(a-b,b). Subtracting the smaller number from the larger does not change the set of common divisors.',
   'Repeat the subtraction until the two numbers become equal. That common value is the gcd.'
  ],formulas:['If a>b, gcd(a,b)=gcd(a-b,b)'],examples:[{title:'Subtraction method',question:'Find gcd(48,18) using repeated subtraction.',steps:['48-18=30, so use (30,18).','30-18=12, so use (18,12).','18-12=6, so use (12,6).','12-6=6, so use (6,6).'],answer:'gcd=6.'}]},
  {title:'Division-based gcd algorithm',paragraphs:[
   'Repeated subtraction can be accelerated by replacing many subtractions with one division. Divide the larger number by the smaller and keep the remainder. The gcd is unchanged when (a,b) is replaced by (b,a mod b).',
   'Continue until the remainder becomes 0. The last non-zero divisor is the gcd.'
  ],formulas:['gcd(a,b)=gcd(b,a mod b)'],examples:[{title:'Division algorithm',question:'Find gcd(252,105).',steps:['252=2×105+42.','105=2×42+21.','42=2×21+0.'],answer:'gcd(252,105)=21.'}],tip:'In a division-algorithm trace, keep quotient and remainder clear. The remainder, not the quotient, becomes the next smaller input.'},
  {title:'Data structures and tracing',paragraphs:[
   'An algorithm often needs data to be organised in a particular way. A list, table or ordered pair can represent the changing state of the computation.',
   'Tracing means recording the state after each step. It is one of the best ways to discover errors, prove that the algorithm is progressing and compare two procedures.'
  ]}
 ]};

notes['Quadrilaterals']={
 lead:'Quadrilateral geometry is mainly about identifying which conditions force particular properties. You should know the angle sum, the properties and tests for parallelograms, and the triangle results that are used to prove them.',
 sections:[
  {title:'Quadrilaterals and angle sum',paragraphs:[
   'A quadrilateral is a polygon with four sides. Drawing one diagonal divides it into two triangles, so the sum of its interior angles is 2×180°=360°.',
   'Convex and concave quadrilaterals have different shapes, but the interior-angle sum remains 360° when angles are interpreted correctly.'
  ],formulas:['Interior angle sum of a quadrilateral = 360°'],examples:[{title:'Missing angle',question:'Three angles of a quadrilateral are 75°, 110° and 95°. Find the fourth.',steps:['Add known angles:75+110+95=280°.','Subtract from 360°.'],answer:'80°.'}]},
  {title:'Parallelogram properties',paragraphs:[
   'A parallelogram is a quadrilateral with both pairs of opposite sides parallel. Parallel-line angle facts and triangle congruence lead to several important consequences.',
   'Opposite sides are equal, opposite angles are equal, adjacent angles are supplementary and the diagonals bisect each other.'
  ],bullets:['AB∥CD and BC∥AD.','AB=CD and BC=AD.','∠A=∠C and ∠B=∠D.','∠A+∠B=180°.','Diagonals bisect each other.'],tip:'Do not assume a parallelogram has equal diagonals or perpendicular diagonals. Those are properties of more specialised quadrilaterals.'},
  {title:'Tests for a parallelogram',paragraphs:[
   'A test works in the reverse direction: instead of starting with a known parallelogram, it gives sufficient information to prove that a quadrilateral is one.',
   'Useful tests include both pairs of opposite sides equal, one pair of opposite sides both equal and parallel, or diagonals bisecting each other.'
  ],bullets:['If both pairs of opposite sides are equal, the quadrilateral is a parallelogram.','If one pair of opposite sides is equal and parallel, the quadrilateral is a parallelogram.','If the diagonals bisect each other, the quadrilateral is a parallelogram.'],tip:'State which converse/test you are using. A diagram that looks like a parallelogram is not a proof.'},
  {title:'Triangle midpoint theorem',paragraphs:[
   'The segment joining the midpoints of two sides of a triangle is parallel to the third side and has half its length.',
   'The converse is also useful: a line through the midpoint of one side and parallel to another side bisects the third side.'
  ],formulas:['If D and E are midpoints of AB and AC, then DE∥BC and DE=½BC'],examples:[{title:'Using the midpoint theorem',question:'D and E are midpoints of AB and AC in triangle ABC. If BC=18 cm, find DE.',steps:['The midpoint segment is half the third side.','DE=18/2.'],answer:'9 cm.'}]},
  {title:'Medians and parallelogram reasoning',paragraphs:[
   'A median joins a vertex to the midpoint of the opposite side. Midpoint constructions often create parallel lines or congruent triangles that turn a difficult quadrilateral proof into familiar triangle reasoning.',
   'When a problem contains midpoints, mark equal segments first. These markings often reveal the theorem that should be used.'
  ]},
  {title:'Tiling with quadrilaterals',paragraphs:[
   'Copies of any quadrilateral can tile the plane because the four interior angles sum to 360°. By arranging one copy of each vertex around a point, the angles fit exactly around that point.',
   'This application shows why the angle-sum theorem has a geometric consequence beyond a single figure.'
  ]}
 ]};

notes['Two Variables, One Line']={
 lead:'A linear equation in two variables represents a whole line of ordered-pair solutions. This chapter connects algebraic equations to graphs, develops slope and intercepts, and then solves pairs of linear equations both algebraically and graphically.',
 sections:[
  {title:'Linear equations in two variables',paragraphs:[
   'A linear equation in x and y can be written ax+by=c, where a and b are not both zero. A solution is an ordered pair (x,y) that makes the equation true.',
   'Unlike a one-variable linear equation, one equation in two variables usually has infinitely many solutions.'
  ],formulas:['Standard form: ax + by = c, with a and b not both 0'],examples:[{title:'Checking a solution',question:'Does (2,3) satisfy 2x+y=7?',steps:['Substitute x=2 and y=3.','2(2)+3=7.'],answer:'Yes.'}]},
  {title:'Generating and graphing solutions',paragraphs:[
   'Choose a convenient value for one variable and solve for the other. Repeating this gives a table of ordered pairs. Plotting those points produces a straight line.',
   'Every point on the line is a solution of the equation, and every solution of the equation lies on the line.'
  ],tip:'Two points determine a line, but calculate a third point as a check when accuracy matters.'},
  {title:'Slope',paragraphs:[
   'Slope measures the change in y for each unit change in x. A positive slope rises from left to right, a negative slope falls, and zero slope is horizontal.',
   'For two distinct points, subtract coordinates in the same order in numerator and denominator.'
  ],formulas:['m = (y₂-y₁)/(x₂-x₁), provided x₂≠x₁'],examples:[{title:'Finding slope',question:'Find the slope through (1,2) and (5,10).',steps:['Change in y=10-2=8.','Change in x=5-1=4.','m=8/4.'],answer:'m=2.'}],tip:'A vertical line has undefined slope because the change in x is 0.'},
  {title:'Slope-intercept form',paragraphs:[
   'In y=mx+c, m is the slope and c is the y-intercept, the y-coordinate where the line crosses the y-axis.',
   'This form makes the graph easy to sketch. Plot the intercept first, then use the slope as rise/run to locate another point.'
  ],formulas:['y = mx + c'],examples:[{title:'Reading a line rule',question:'For y=-3x+4, state the slope and y-intercept.',steps:['Compare with y=mx+c.'],answer:'Slope=-3 and y-intercept=4.'}]},
  {title:'Pairs of linear equations',paragraphs:[
   'A solution to a pair must satisfy both equations simultaneously. Algebraically, you can use substitution or elimination. Geometrically, the solution is an intersection point of the two lines.',
   'Substitution is convenient when one variable is already isolated. Elimination is efficient when coefficients can be made equal or opposite.'
  ],examples:[{title:'Solving by elimination',question:'Solve x+y=7 and x-y=1.',steps:['Add the equations:2x=8.','So x=4.','Substitute into x+y=7 to get y=3.'],answer:'(x,y)=(4,3).'}]},
  {title:'Graphical meaning of a pair',paragraphs:[
   'Two non-parallel lines intersect once, giving one solution. Distinct parallel lines never meet, giving no solution. Coincident lines represent the same equation and have infinitely many common solutions.',
   'A graph may give an approximate solution if the intersection does not land exactly on grid lines, so algebra is preferable when an exact value is required.'
  ],bullets:['One intersection → one solution.','Parallel distinct lines → no solution.','Same line → infinitely many solutions.'],tip:'Always check an algebraic answer in both original equations, especially after fractions or negative values appear.'}
 ]};

notes['Math of Space: Surface Area and Volume']={
 lead:'Three-dimensional mensuration requires a clear distinction between surface area and volume. Learn what each formula measures, identify the correct dimensions from a diagram and use consistent cubic or square units.',
 sections:[
  {title:'Surface area and volume',paragraphs:[
   'Surface area measures the total area covering the outside of a solid and is expressed in square units. Volume measures the space occupied and is expressed in cubic units.',
   'Before using a formula, decide whether the question asks for all surfaces, only curved/lateral surfaces, or the volume.'
  ],tip:'Check units before calculating. Converting from cm to m after squaring or cubing is a common source of large errors.'},
  {title:'Cuboids and cubes',paragraphs:[
   'A cuboid has three perpendicular dimensions: length l, breadth b and height h. Its volume is the product of the three dimensions.',
   'Its total surface area is the sum of two rectangles of each face type: lb, bh and hl.'
  ],formulas:['Cuboid volume = lbh','Cuboid total surface area = 2(lb+bh+hl)','Cube volume = a³','Cube total surface area = 6a²'],examples:[{title:'Cuboid calculation',question:'A cuboid is 8 cm by 5 cm by 3 cm. Find its volume.',steps:['Use V=lbh.','V=8×5×3.'],answer:'120 cm³.'}]},
  {title:'Right circular cylinders',paragraphs:[
   'A cylinder can be viewed as a circular base extended through a perpendicular height h. Volume is base area×height.',
   'The curved surface unwraps to a rectangle whose length is the circumference 2πr and whose width is h.'
  ],formulas:['Cylinder volume = πr²h','Curved surface area = 2πrh','Total surface area = 2πr(h+r)'],examples:[{title:'Cylinder volume',question:'Find the volume of a cylinder of radius 3 cm and height 10 cm.',steps:['V=πr²h.','V=π×3²×10.'],answer:'90π cm³.'}]},
  {title:'Cones',paragraphs:[
   'A right circular cone has circular base radius r, perpendicular height h and slant height l. These lengths satisfy a right-triangle relation.',
   'The cone volume is one third of the volume of a cylinder with the same base and perpendicular height.'
  ],formulas:['l = √(r²+h²)','Cone volume = ⅓πr²h','Curved surface area = πrl','Total surface area = πr(l+r)'],examples:[{title:'Slant height',question:'A cone has radius 5 cm and height 12 cm. Find its slant height.',steps:['Use l=√(r²+h²).','l=√(25+144)=√169.'],answer:'13 cm.'}],tip:'Use perpendicular height in the volume formula and slant height in the curved-surface-area formula.'},
  {title:'Pyramids',paragraphs:[
   'A pyramid has a polygonal base and triangular side faces meeting at an apex. The perpendicular height is measured from the apex to the base plane.',
   'The volume rule is one third of base area×perpendicular height, matching the same structural idea as the cone.'
  ],formulas:['Pyramid volume = ⅓ × base area × perpendicular height']},
  {title:'Spheres and hemispheres',paragraphs:[
   'A sphere consists of points at a fixed distance r from its centre. Its surface area and volume depend only on r.',
   'A hemisphere is half a sphere, but its total surface area includes the flat circular base as well as half the sphere’s curved area.'
  ],formulas:['Sphere surface area = 4πr²','Sphere volume = 4/3 πr³','Hemisphere curved area = 2πr²','Hemisphere total surface area = 3πr²','Hemisphere volume = 2/3 πr³'],examples:[{title:'Hemisphere surface area',question:'Find the total surface area of a hemisphere of radius 4 cm.',steps:['Use total area=3πr².','3π×4²=48π.'],answer:'48π cm².'}]},
  {title:'Composite solids',paragraphs:[
   'Many real objects combine cylinders, cones, hemispheres or cuboids. Split the object into basic solids for volume, or identify only the exposed surfaces for surface-area questions.',
   'When two solids are joined, their common contact surface becomes internal and should not be counted in external surface area.'
  ],bullets:['Volume of composite solid: add or subtract component volumes.','External surface area: count only surfaces visible from outside.','Use the same length unit for every component before applying formulas.'],tip:'For a joined-solid surface area, mark hidden contact faces on the diagram and exclude them before calculating.'},
  {title:'Estimation and units',paragraphs:[
   'Estimation is useful for checking whether a calculated volume or surface area is plausible. Round dimensions mentally and compare the order of magnitude with your exact answer.',
   'A scale change affects area and volume differently. If every length is multiplied by k, surface area is multiplied by k² and volume by k³.'
  ],formulas:['Length scale factor k → area factor k² → volume factor k³']}
 ]};
})();
