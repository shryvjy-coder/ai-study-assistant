/* Chapter 6 — Measuring Space: Perimeter and Area */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Measuring Space: Perimeter and Area',[
['Perimeter and circumference',[
['Why perimeter is a one-dimensional measurement',[
'Imagine putting a fence around a garden. The amount of fencing depends on the length of the outer boundary, not on the amount of ground inside. Perimeter therefore uses units such as cm or m, never cm² or m².',
'For a polygon, move once around its boundary and add the side lengths. A regular polygon with n equal sides of length s has perimeter ns. If a shape has an indentation, count every piece of its outer edge once; interior construction lines are not part of the perimeter.'
],['P=Σ(side lengths)','Regular n-gon: P=ns'],[E('An L-shaped fence','The outer boundary of a polygon consists of lengths 8,3,4,5,4 and 8 metres. Find its perimeter.',['Each listed segment belongs to the boundary.','Add 8+3+4+5+4+8.','Keep linear units.'],'32 metres')]],
['Circumference is a special perimeter',[
'For a circle, perimeter is called circumference. The ratio of circumference C to diameter d is the constant π, so C=πd=2πr. The number π is irrational; 22/7 and 3.14 are approximations, not exact equalities.',
'If the radius doubles, the circumference doubles because r is multiplied by 2 in C=2πr. Retain π in exact answers unless told to approximate, and always distinguish radius from diameter.'
],['C=2πr=πd'],[E('Circle boundary','Calculate the exact circumference of a wheel of diameter 42 cm.',['Use C=πd.','Substitute d=42 cm.','Do not round π in an exact answer.'],'42π cm')]]
]],
['Arc length',[
['An arc is a fraction of the whole circumference',[
'An arc is part of a circle boundary. A central angle of θ degrees represents θ/360 of a complete turn. Because the full circumference is 2πr, the corresponding minor arc length is (θ/360)2πr.',
'The arc-length formula is proportional to θ for a fixed circle. Doubling the angle doubles the arc length. This reasoning remains valid for a major arc by using its appropriate central angle, and a semicircle has θ=180°.'
],['Arc length L=(θ/360°)·2πr'],[E('Quarter-circle arc','Find the length of a 90° arc in a circle of radius 8 cm.',['Fraction of a circle is 90/360=1/4.','L=(1/4)(2π)(8).','Simplify 16π/4.'],'4π cm')]],
['Arc length versus chord length',[
'A chord is the straight segment connecting the endpoints of an arc, while an arc follows the curved boundary. Except for coincident endpoints, the curved arc and its chord have different lengths. Do not use the arc formula to calculate a chord.',
'A sector boundary has two radii plus the curved arc, so its perimeter is 2r+L. Forgetting the two straight sides is a common error when asked for the perimeter of a sector rather than only the arc.'
],['Sector perimeter=2r+arc length'],[E('Sector perimeter','A 60° sector has radius 12 cm. Find its exact perimeter.',['Arc length=(60/360)·2π·12=4π cm.','The two radial sides contribute 12+12=24 cm.','Add the lengths.'],'24+4π cm')]]
]],
['Area of rectangles and parallelograms',[
['Unit squares explain rectangular area',[
'Area counts how many unit squares cover a region without gaps or overlaps. A rectangle of length l and width w contains l groups of w unit squares when measurements use the same unit, giving A=lw.',
'For example, a 7 m by 3 m floor has area 21 m². Multiplying two lengths produces squared units. Converting 200 cm into metres before an area calculation is usually safer than attempting to convert the finished square units.'
],['A_rectangle=length×width'],[E('Area with unit conversion','Find area of a 2.5 m by 80 cm rectangle in m².',['Convert 80 cm to 0.8 m.','Multiply 2.5×0.8.'],'2 m²')]],
['Cut-and-rearrange proof for parallelograms',[
'A parallelogram can be dissected by dropping a perpendicular from a vertex to the opposite side. Cutting off the resulting triangular piece and attaching it at the other end transforms the shape into a rectangle without changing its area.',
'The new rectangle has the same base b and perpendicular height h, so parallelogram area is bh. The sloping side is generally not the height; using it without accounting for the angle overestimates area.'
],['A_parallelogram=b×h, with h perpendicular to base'],[E('Slant side versus height','A parallelogram has base 12 cm, slant side 7 cm and perpendicular height 5 cm. Find its area.',['Area requires the perpendicular height, not the slanted side.','A=12×5.'],'60 cm²')]]
]],
['Area of triangles',[
['Why the triangle formula contains one half',[
'Join two identical copies of a triangle along a corresponding side. They can form a parallelogram with the same base b and perpendicular height h, whose area is bh. Since the two triangles have equal area, each occupies half the parallelogram.',
'Thus A=bh/2 for any triangle, including obtuse triangles where the perpendicular height may meet an extension of the chosen base. The height must be measured perpendicular to the line of the base.'
],['A_triangle=(1/2)bh'],[E('Obtuse triangle','A triangle has a base of 14 cm and altitude 9 cm drawn to an extension of the base. Find area.',['The altitude to the extended base is still perpendicular height.','A=(1/2)·14·9.'],'63 cm²')]],
['Triangles sharing base and parallels',[
'Two triangles on the same base and between the same parallels have equal heights. By A=bh/2 their areas must therefore be equal, regardless of where their apexes lie along the upper parallel.',
'Similarly, a median divides a triangle into two equal-area triangles, because the two small triangles share the same altitude and have equal bases. This is an area statement, not a claim that the small triangles must be congruent.'
],[],[E('Median and area','A triangle has area 48 cm². A median divides it into two parts. Find each area.',['A median divides the opposite side into two equal lengths.','The small triangles share the altitude to that side.','Equal base and height imply equal area.'],'24 cm² each')]]
]],
['Area of a circle and sector',[
['Why circular area involves r squared',[
'Circle area can be motivated by cutting the disc into narrow sectors and alternating their directions. As sectors become thinner, the rearranged shape approaches a rectangle whose height is about r and whose base is about half the circumference, πr.',
'Therefore A=πr×r=πr². The quadratic dependence matters: doubling r multiplies area by 4, unlike circumference, which merely doubles. The rearrangement is an intuitive explanation; more rigorous limits are studied later.'
],['A_circle=πr²'],[E('Radius scaling','A circle of radius 3 cm is enlarged to radius 9 cm. By what factor does its area increase?',['A is proportional to r².','Radius scale factor is 9/3=3.','Area factor is 3².'],'9 times')]],
['Sectors, segments and exact units',[
'A sector is the portion of a disc corresponding to a central angle θ. Because area is proportional to the fraction θ/360 of a complete revolution, A_sector=(θ/360)πr².',
'A circular segment is instead bounded by a chord and arc. Its area is generally sector area minus the triangle formed by two radii and the chord for a minor segment. Always label the requested shaded region before selecting formulas.'
],['A_sector=(θ/360°)πr²'],[E('A 120-degree sector','Find area of a 120° sector in radius 6 cm.',['Fraction of the circle is 120/360=1/3.','Whole circle area is π·6²=36π.','Sector area=(1/3)·36π.'],'12π cm²')]]
]],
['Composite perimeter and area',[
['Decompose complicated shapes into known pieces',[
'Composite figures combine rectangles, triangles, semicircles and other familiar regions. To find their areas, partition the figure into nonoverlapping pieces and add the areas, or subtract a removed region from a larger enclosing shape.',
'Write the formula for each piece and include dimensions on a sketch. Do not add the area of an overlapping region twice. If the shape has a cut-out, its area is subtracted even though its exposed boundary may add to perimeter.'
],[],[E('Rectangle with semicircle','A rectangle is 10 by 6 cm. A semicircle of diameter 6 cm is attached externally along the short side. Find the total area.',['Rectangle area=10×6=60 cm².','Semicircle radius=3 cm.','Its area=(1/2)π·3²=9π/2.','The regions only share a boundary, so add areas.'],'60+9π/2 cm²')]],
['Hidden edges and exposed boundaries',[
'When shapes are joined along an edge, that shared edge is inside the combined region and not part of its perimeter. The correct perimeter must trace only the external outline. By contrast, exposed boundaries around a hole do count toward the total boundary length if the problem asks for all fencing.',
'A rectangle of length 10 and width 6 with a semicircle replacing one width-6 edge has external perimeter equal to the other width edge, both length-10 edges and the semicircular arc: 6+20+3π. Do not add the shared diameter.'
],[],[E('External boundary','Using the same attached semicircle of diameter 6 cm and rectangle 10×6 cm, find the exterior perimeter.',['The shared diameter is internal and excluded.','Retain two 10 cm lengths and the opposite 6 cm width.','Semicircular arc length=πr=3π cm.'],'26+3π cm')]],
['Formulas and reasonableness checks',[
'A correct area answer has squared units and a correct perimeter answer has linear units. For a drawing marked in centimetres, a result of 500 cm for area is dimensionally invalid. Keep π exact until the last step if the problem requests a decimal.',
'An area obtained by subtracting a smaller region from a larger one must not be negative. Similarly a composite perimeter should account for every exposed edge exactly once. These checks can reveal mistakes without redoing the full calculation.'
],[],[E('Area of a path','A square garden of side 12 m contains a concentric square pond of side 4 m. Find the remaining area.',['Garden area=12²=144 m².','Pond area=4²=16 m².','Subtract the smaller from the larger.'],'128 m²')]]
]]
],{
lead:'To design a fence, a floor or a curved path, we need different measurements: the length around a shape and the area inside it. These lessons derive area from unit squares and rearrangements, derive circular measurements from fractions of a revolution, and apply the ideas to composite diagrams and realistic dimensions.',
mixed:[
['Mixed area of a running track','A rectangular ground is 24 m by 14 m with a semicircle of diameter 14 m added externally to each short side. Find its total area and boundary length.',['The two semicircles form one full circle of radius 7 m.','Area=24×14+π·7²=336+49π m².','The straight outside lengths are the two 24 m sides.','The arcs combine to circumference 2π·7=14π m.'],'Area=336+49π m²; perimeter=48+14π m.'],
['Mixed sector problem','A sector has radius 9 cm and angle 80°. Find its arc length and area.',['Arc length=(80/360)2π·9=(2/9)18π=4π cm.','Area=(80/360)π·9²=(2/9)81π=18π cm².','The expressions have different units.'],'Arc length=4π cm; area=18π cm².']
]});


// Add NCERT-specific exercise and construction lessons without replacing the
// existing six formula-and-concept lessons or their worked examples.
// Verified against NCERT Ganita Manjari Part I, Chapter 6 (iemh106.pdf).
const ch=window.CBSE_CLASS9_MATH_FULL_NOTES['Measuring Space: Perimeter and Area'];
if(!ch)throw Error('Chapter 6 notes missing when applying textbook audit');
if(ch.sections.some(section=>section.title==='Pi, track staggers and perimeter puzzles'))return;
const S=D.subsection;
const extra=[
{
 title:'Pi, track staggers and perimeter puzzles',
 paragraphs:[
  'The NCERT chapter starts from a question about staggered starting lines in races, then develops the circumference-to-diameter ratio. A circle can be compared with polygons and measured experimentally before its exact circumference is expressed as 2πr.',
  'This lesson uses the textbook approach: measure and estimate, distinguish approximations from equality, explain circular tracks through arc lengths, and reason about paths made of circular arcs.'
 ],
 subtopics:[
  S('Estimating the circumference-to-diameter ratio',[
   'For every circle, circumference divided by diameter gives the same constant π. The practical measurement approach is to measure diameter D and wrap a thin thread around a circular reel 20 times. If the thread length is L, one circumference is approximately L/20, so the estimate of π is L/(20D). Repeating several turns reduces the influence of small length-measurement errors.',
   'The equation C=πD is exact, whereas measurements of C and D are approximate. With D=7 cm and measured length for 20 turns L=440 cm, the experimental ratio is 440/(20×7)=22/7≈3.1429. This is close to π, but it does not prove π equals 22/7.'
  ],['π=C/D','Estimated π=L/(20D) for 20 windings'],[
   E('Estimate pi with thread','A reel measures 10 cm across. Thread wrapped 20 complete turns measures 628 cm. Estimate the C/D ratio.',['One turn has length approximately 628/20=31.4 cm.','Divide by diameter 10 cm: 31.4/10=3.14.','This is an experimental estimate, not an exact identity.'],'Estimated π≈3.14.')
  ]),
  S('Why pi is irrational and why fractions are approximations',[
   'The decimal expansion of π is nonterminating and nonrepeating. Thus π cannot be written exactly as a ratio of integers, even though fractions such as 22/7 and 355/113 approximate it. Always write π≈22/7 rather than π=22/7. A numeric answer requiring three significant figures should be rounded only after the calculation.',
   'The NCERT history introduces polygon bounds used by Archimedes, precise fraction approximations associated with Zu Chongzhi, Āryabhaṭa’s approximation 3.1416, and Mādhava’s infinite series π/4=1−1/3+1/5−1/7+⋯. The series is an enrichment illustration, not a method students must evaluate to prove irrationality.'
  ],['π≈22/7; π≠22/7','π/4=1−1/3+1/5−1/7+⋯ (enrichment)'],[
   E('Exact versus approximate circumference','A circle has radius 5 cm. Give its circumference exactly and correct to three significant figures.',['C=2πr=10π cm exactly.','Using π≈3.14159265 gives 31.4159… cm.','Round to three significant figures: 31.4 cm.'],'Exactly 10π cm; approximately 31.4 cm (3 s.f.).')
  ]),
  S('Track-lane stagger and wheel revolutions',[
   'Two concentric circular paths separated radially by w have circumferences differing by 2πw. More generally, if both lanes travel through a curved section of θ degrees, their arc lengths differ by (θ/360)2πw. Straight sections of equal length contribute no difference. This is why a fair lane stagger depends on the actual curved portions of the route.',
   'A wheel of diameter d travels πd in one full revolution if it rolls without slipping. For a trip of distance L, the number of complete-turn equivalents is L/(πd), with L and d expressed in matching units. Never divide kilometres by centimetres without converting.'
  ],['Difference for θ° concentric arcs=(θ/360°)2πw','Revolutions=distance/(πd)'],[
   E('Stagger on one semicircular bend','Two semicircular running-lane bends have radii 35 m and 36.2 m. How much longer is the outer bend?',['Both are 180° arcs, so each has length πr.','Radius difference=36.2−35=1.2 m.','Arc-length difference=π×1.2 m.'],'1.2π m, approximately 3.77 m.'),
   E('Car tyre revolutions','A tyre has diameter 56 cm. About how many revolutions does it make over 10 km if π≈22/7?',['Circumference=πd=(22/7)×56=176 cm.','Convert 10 km to 1,000,000 cm.','Divide travel distance by circumference: 1,000,000/176≈5681.82.'],'Approximately 5682 revolutions.')
  ]),
  S('Why surprising semicircle paths can be equally long',[
   'Suppose one path is a semicircle of diameter D. A second path joins the same endpoints using several successive semicircles whose diameters d₁,d₂,… add up to D. Each semicircle has arc length πd/2, so the second path has length (π/2)(d₁+d₂+⋯)=πD/2, exactly the same as the single semicircle.',
   'A different NCERT challenge uses two equal circles of radius r, each passing through the other’s centre. The two common points subtend 120° at each centre, so each hidden arc is one-third of a circumference. The exposed outer arcs add to 2×(240/360)×2πr=8πr/3. Do not count the hidden arcs as part of the exterior boundary.'
  ],['Semicircular arc with diameter d=πd/2','Exposed boundary of overlapping equal circles=8πr/3'],[
   E('Three small semicircles or one large?','A 24 cm diameter semicircular arc is replaced by three semicircular arcs with diameters 5, 8 and 11 cm along the same straight line. Compare their lengths.',['Large arc=(π/2)×24=12π cm.','Small-arc total=(π/2)(5+8+11)=(π/2)×24=12π cm.','The arcs have equal combined lengths even though the curves look different.'],'Both paths are 12π cm long.'),
   E('Boundary of two overlapping circles','Two circles of equal radius 6 cm each pass through the other centre. Find the perimeter of their union.',['The centres and either intersection form an equilateral triangle, giving 60° above and below the centre line.','Each internal arc subtends 120° and must be excluded.','Each external arc subtends 240°. Multiply by 2 circles: 2×(240/360)×2π×6.'],'16π cm.')
  ])
 ]
},
{
 title:'Heron’s formula and triangle-side applications',
 paragraphs:[
  'Heron’s formula finds a triangle’s area when all three side lengths are known but its perpendicular height is not given. The official chapter connects the result with equilateral and isosceles triangles and uses it in Exercise Set 6.2.',
  'These problems require a triangle-inequality check, a correct semiperimeter, and exact square-root simplification. Heron’s formula complements the existing base-times-height lesson.'
 ],
 subtopics:[
  S('Apply Heron’s formula carefully',[
   'For side lengths a,b,c, first check a+b>c, b+c>a and c+a>b. A triangle with positive side lengths must satisfy all three. Define s=(a+b+c)/2, then area=√[s(s−a)(s−b)(s−c)]. For a valid nondegenerate triangle the factors under the radical are positive.',
   'Heron’s formula gives area, not the perimeter. If a question states the perimeter and two sides, subtract them to find the third before calculating s. Keep exact radicals when a question does not ask for a decimal approximation.'
  ],['s=(a+b+c)/2','Area=√[s(s−a)(s−b)(s−c)]'],[
   E('Triangle with two sides and perimeter','A triangle has sides 8 cm and 11 cm and perimeter 32 cm. Find its exact area.',['Third side=32−8−11=13 cm, and 8+11>13.','Semiperimeter s=32/2=16 cm.','Area=√(16×8×5×3)=√1920.','Simplify √1920=8√30.'],'8√30 cm².')
  ]),
  S('Equilateral and isosceles triangle checks',[
   'For an equilateral triangle of side a, s=3a/2. Substitute into Heron’s formula: area=√[(3a/2)(a/2)(a/2)(a/2)]=√3 a²/4. Dropping an altitude gives h=√3 a/2, and (1/2)ah agrees with the result.',
   'For an isosceles triangle with equal sides a and base 2b, the altitude bisects the base. Pythagoras gives height √(a²−b²), so area=b√(a²−b²). The condition a>b ensures the triangle is nondegenerate.'
  ],['Equilateral area=√3 a²/4','Isosceles area=b√(a²−b²), base=2b'],[
   E('Check an isosceles area in two ways','Find the area of an isosceles triangle with equal sides 13 cm and base 10 cm.',['Half the base is 5 cm; altitude=√(13²−5²)=√144=12 cm.','Area=(1/2)×10×12=60 cm².','Heron check: s=18, area=√(18×5×5×8)=60 cm².'],'60 cm².')
  ]),
  S('From side ratios to a triangle’s area',[
   'If side lengths are in ratio 3:5:7 and perimeter is 300 m, represent sides as 3k,5k,7k. Then 15k=300, so k=20, giving sides 60,100,140 m. Verify 60+100>140 before applying Heron’s formula.',
   'When dealing with an exact area, factor out perfect squares from a radical rather than rounding intermediate numbers. A decimal approximation is useful only as a final interpretive step.'
  ],[],[
   E('NCERT-style ratio and perimeter','A triangular plot has side ratio 3:5:7 and perimeter 300 m. Find its area.',['Sum of ratio parts=15, so each part is 300/15=20 m.','Sides are 60 m, 100 m, and 140 m; s=150 m.','Area=√(150×90×50×10)=√6,750,000.','Simplify by factoring: √6,750,000=1500√3.'],'1500√3 m², about 2598 m².')
  ])
 ]
},
{
 title:'Equal-area proofs and quadrilateral applications',
 paragraphs:[
  'Several NCERT Exercise 6.2 questions require a proof about equal areas rather than a single numeric substitution. A useful strategy is to choose the same base line, identify the perpendicular heights and compare the resulting half-base-times-height formulas.',
  'Area arguments also solve trapezium and rhombus problems. Drawing auxiliary heights or diagonals lets us reduce these figures to familiar right triangles.'
 ],
 subtopics:[
  S('Equal areas from the same base and parallel lines',[
   'Triangles with a common base and third vertices on a line parallel to that base have the same perpendicular altitude, so their areas are equal. In a parallelogram ABCD, if P and Q lie on side AB, then triangles PCD and QCD share base CD and have the same height between AB and CD; their area ratio is 1:1.',
   'A median joins a triangle vertex to the midpoint of the opposite side and divides the triangle into two equal-area parts. If P lies on median AD in triangle ABC, where D is the midpoint of BC, then triangles ABP and ACP also have equal areas: subtract equal triangles PBD and PCD from equal triangles ABD and ACD.'
  ],['Same base and between same parallels ⇒ equal triangle areas','Median divides triangle area into 1:1'],[
   E('Two movable vertices and one common base','ABCD is a parallelogram. P and Q lie anywhere on AB. Compare areas of triangles PCD and QCD.',['Both triangles use the same base CD.','The vertices P and Q lie on AB parallel to CD, so both altitudes are equal.','A=bh/2 is the same in both triangles.'],'Area(PCD):Area(QCD)=1:1.'),
   E('A point on a median','In triangle ABC, D is midpoint of BC and P is on AD. Show that triangles ABP and ACP have equal area.',['Median AD gives Area(ABD)=Area(ACD).','Since PD is another median of triangle PBC, Area(PBD)=Area(PCD).','Subtract corresponding equal smaller triangles from the equal larger triangles.'],'Area(ABP)=Area(ACP).')
  ]),
  S('Trapezium area from a pair of equal right triangles',[
   'For parallel side lengths a and b separated by perpendicular height h, area of a trapezium is (a+b)h/2. To find the height of an isosceles trapezium from its legs, drop perpendiculars from the endpoints of the shorter base to the longer base.',
   'The two outer right triangles have equal horizontal leg (a−b)/2. If a nonparallel side has length c, height is √[c²−((a−b)/2)²]. This method should always use the difference of the parallel sides, not their sum.'
  ],['Area_trapezium=(a+b)h/2'],[
   E('Find the height of a trapezium','An isosceles trapezium has parallel sides 40 cm and 20 cm and legs 26 cm each. Find its area.',['Drop altitudes from the ends of the 20 cm side.','Each outside horizontal leg is (40−20)/2=10 cm.','Height=√(26²−10²)=√576=24 cm.','Area=(40+20)×24/2.'],'720 cm².')
  ]),
  S('Rhombus area and half-area midpoint results',[
   'The diagonals of a rhombus bisect each other at right angles. Four resulting right triangles cover the rhombus, giving area=(d₁d₂)/2. If one diagonal is twice the other, replace the longer diagonal with 2d in the formula, solve for d and keep positive lengths only.',
   'Joining successive side midpoints of a quadrilateral forms a parallelogram, called the midpoint parallelogram. It has half the quadrilateral’s area. One way to justify the result is to divide the original quadrilateral along a diagonal: the midpoint segments in each of the two triangles produce small corner triangles with one quarter the area of each original triangle.'
  ],['Rhombus area=(d₁d₂)/2','Midpoint parallelogram area=half original quadrilateral area'],[
   E('Rhombus with diagonals in ratio 1:2','A rhombus has area 128 cm². One diagonal is twice the other. Find the shorter diagonal.',['Let shorter diagonal be d and longer be 2d.','Area=(1/2)(d)(2d)=d².','d²=128, so d=√128=8√2 cm.'],'8√2 cm.'),
   E('Area from side midpoints','A quadrilateral has area 96 cm². What is the area of its side-midpoint parallelogram?',['Joining side midpoints gives a parallelogram.','Its area is half that of the original quadrilateral.','Compute 96/2.'],'48 cm².')
  ])
 ]
},
{
 title:'Squaring a rectangle by construction',
 paragraphs:[
  'In Section 6.9, NCERT explains a construction attributed to Baudhāyana that produces a square of the same area as a given rectangle. This is not the same as merely writing the formula A=ab: the square is constructed using straight lines, a compass arc and a right-triangle argument.',
  'The construction illustrates how the difference-of-squares identity and the Pythagorean theorem can turn a rectangle of unequal sides into an equal-area square.'
 ],
 subtopics:[
  S('From rectangle dimensions to the required square side',[
   'A rectangle of side lengths a and b has area ab. A square of the same area needs side x satisfying x²=ab, hence x=√(ab). To construct that length without relying on decimal approximations, let u=(a+b)/2 and v=(a−b)/2 when a>b. Then u²−v²=ab, so the leg of a right triangle with hypotenuse u and other leg v is exactly √(ab).',
   'This identity is a geometric form of (a+b)²−(a−b)²=4ab. Using a=12 and b=3 gives u=7.5, v=4.5 and x=√(7.5²−4.5²)=√36=6. The 6-by-6 square matches the 12-by-3 rectangle in area.'
  ],['x=√(ab)','[(a+b)/2]²−[(a−b)/2]²=ab'],[
   E('Compute the area-equivalent square','A rectangle measures 20 cm by 5 cm. Find the side length of a square of equal area and verify it using a difference of squares.',['Area of rectangle=20×5=100 cm².','Side of square=√100=10 cm.','Check u=(20+5)/2=12.5, v=(20−5)/2=7.5.','u²−v²=156.25−56.25=100, so x=√100.'],'Side length 10 cm.')
  ]),
  S('Baudhāyana’s compass-and-straightedge construction',[
   'Following NCERT Fig. 6.30, start with rectangle ABCD, AD=a and AB=b, where a>b. Mark E on AD with AE=b. Mark F the midpoint of ED, so AF=(a+b)/2. Construct square AFGH with side AF, placing H on the upward extension of AB.',
   'Draw the arc AG with centre H and radius HG. It meets side BC at K. Through K draw a line parallel to AH meeting GH at P. Complete square HPQS. In right triangle HKP, HK=(a+b)/2 and PK=(a−b)/2. Therefore HP²=HK²−PK²=ab, and the area of square HPQS equals that of ABCD.',
   'This describes the exact construction in the chapter. Use the textbook diagram to identify which point sits on which segment; the square is constructed from the length HP, not from the original longer rectangle side.'
  ],['HP²=[(a+b)/2]²−[(a−b)/2]²=ab'],[
   E('Explain why the compass construction works','For rectangle sides a=15 cm and b=5 cm, what are HK, PK and the resulting square side HP?',['HK=(15+5)/2=10 cm, the radius of the constructed arc.','PK=(15−5)/2=5 cm in the right triangle HKP.','By Pythagoras, HP²=10²−5²=75.','The new square has side √75=5√3 cm and area 75 cm².'],'HP=5√3 cm; both figures have area 75 cm².')
  ]),
  S('Squaring a triangle using the same area idea',[
   'To square a triangle with base b and altitude h, first make a rectangle whose sides are b and h/2. Its area is (1/2)bh, the same as the triangle. Then apply the rectangle-to-square construction to the two rectangle side lengths. The final square has side √(bh/2).',
   'The geometric construction of an equal-area figure is different from a numerical area calculation, but the formula provides a way to check whether the construction is correct. A triangle with base 16 cm and altitude 8 cm has area 64 cm², so the required square side is 8 cm.'
  ],['Equal-area triangle square side=√(bh/2)'],[
   E('Square a triangle numerically','A triangle has base 18 cm and perpendicular height 4 cm. Find the side of a square with the same area.',['Triangle area=(1/2)×18×4=36 cm².','A square with side x has area x².','Set x²=36 and take the positive root.'],'6 cm.')
  ])
 ]
},
{
 title:'Circular segments, sector applications and scaling',
 paragraphs:[
  'Chapter 6 distinguishes a sector, bounded by two radii and an arc, from a segment, bounded by a chord and an arc. NCERT Exercise Set 6.3 asks for both areas and for applications to clocks, wipers and polygons inscribed in circles.',
  'Use the geometry of the triangle formed by two radii and the chord when finding a segment area. Keep angle measures, radius and units consistent.'
 ],
 subtopics:[
  S('Minor and major sectors, segments and triangle subtraction',[
   'A central angle θ in degrees selects a minor sector with area (θ/360)πr² when 0<θ<180°. The matching major sector has angle 360−θ and area ((360−θ)/360)πr². Their areas add to πr².',
   'A minor segment consists of a minor sector minus the triangle enclosed by the same two radii and chord. If the central angle is 60°, the radii and chord form an equilateral triangle of side r. Hence minor segment area=(πr²/6)−(√3r²/4). Major segment area is the full circle area minus the minor segment area.'
  ],['Minor segment (60°)=r²(π/6−√3/4)','Major sector angle=360°−θ'],[
   E('A sixty-degree circular segment','A chord in a circle of radius 12 cm subtends 60° at the centre. Find the exact minor-segment area.',['Sector area=(60/360)×π×12²=24π cm².','Triangle formed by radii is equilateral, with area (√3/4)×12²=36√3 cm².','Subtract triangle from sector.'],'24π−36√3 cm².')
  ]),
  S('The area swept by hands, wipers and blades',[
   'A clock minute hand completes a 360° rotation in 60 minutes. In t minutes it sweeps an angle 6t degrees. Treat the hand length as the sector radius, then compute area=(6t/360)πr². For nonoverlapping wipers, add their sector areas once each.',
   'The sector describes the entire region swept from the pivot to the tip. When a moving object does not sweep a full radius, or two swept regions overlap, a simple sum of full sectors can overcount the requested area. Read the physical setup before inserting values.'
  ],['Minute hand angle in t minutes=6t°'],[
   E('Area swept by a minute hand','A minute hand is 7 cm long. What area does it sweep in 10 minutes?',['Angle swept=6×10=60°.','Sector area=(60/360)×π×7².','Simplify to 49π/6.'],'49π/6 cm².'),
   E('Two nonoverlapping wipers','Two wipers of length 28 cm sweep nonoverlapping 120° sectors. Find total area cleaned in one sweep.',['Area per wiper=(120/360)π×28²=784π/3 cm².','There are two disjoint swept sectors.','Multiply the single-wiper area by 2.'],'1568π/3 cm².')
  ]),
  S('Inscribed polygons as fractions of circle area',[
   'An equilateral triangle inscribed in a circle of radius r has side √3r. Using its triangle-area formula gives area 3√3 r²/4, so the fraction of the circle’s area is 3√3/(4π).',
   'An inscribed square has diagonal 2r and side √2r, so its area is 2r² and its area-to-circle ratio is 2/π. A regular inscribed hexagon consists of six equilateral triangles of side r, so its area is 3√3 r²/2 and its ratio is 3√3/(2π), twice the equilateral-triangle ratio.'
  ],['Triangle/circle=3√3/(4π)','Square/circle=2/π','Hexagon/circle=3√3/(2π)'],[
   E('Compare a square and its circumcircle','A square is inscribed in a circle of radius 5 cm. Find the exact ratio of square area to circle area.',['The square diagonal is the circle diameter 10 cm.','Square side=10/√2=5√2 cm, so its area is 50 cm².','Circle area=π×5²=25π cm².','Ratio=50/(25π).'],'2/π.')
  ]),
  S('Why perimeter squared scales like area',[
   'Enlarging every length of a shape by factor k multiplies perimeter by k and area by k². Therefore the ratio perimeter²/area is unchanged for similarly shaped figures, because both numerator and denominator scale by k².',
   'For a circle, C²/A=(2πr)²/(πr²)=4π. For a square of side a, P²/A=(4a)²/a²=16. The constants are different because the shapes are different, but neither depends on their size.'
  ],['Circle: C²/A=4π','Square: P²/A=16'],[
   E('Compare scaling of circle measurements','A circle is scaled to three times its radius. By what factors do its circumference and area change?',['Circumference is proportional to radius, so it is multiplied by 3.','Area is proportional to radius squared, so it is multiplied by 9.','The ratio C²/A stays 4π.'],'Circumference ×3; area ×9; C²/A unchanged.')
  ])
 ]
}
];
// Chapter 6 also introduces circle-based triangle formulas and Brahmagupta's
// area formula for cyclic four-sided figures. These require separate instruction.
extra.splice(2,0,{
 title:'Circle-based triangle areas and Brahmagupta’s formula',
 paragraphs:[
  'The textbook compares Heron’s formula with two formulas involving the incircle and circumcircle of a triangle, then introduces Brahmagupta’s formula for cyclic quadrilaterals. These are connections between area, shape and special geometric conditions.',
  'The restriction cyclic is essential: four side lengths alone do not determine the area of an arbitrary quadrilateral. The positions of its vertices and angles can still vary.'
 ],
 subtopics:[
  S('Triangle area from the inradius or circumradius',[
   'Let a,b,c be triangle side lengths, r the radius of its incircle, R the radius of its circumcircle, and K its area. Joining the incenter to the three vertices divides the triangle into three triangles each of height r, giving K=(1/2)ar+(1/2)br+(1/2)cr=rs, where s=(a+b+c)/2.',
   'Another standard formula stated in the textbook is K=abc/(4R). It can be used to calculate the circumradius from a known area: R=abc/(4K). For a right-angled triangle, the circumradius is half the hypotenuse, which checks this relationship in the 3–4–5 case.'
  ],['K=rs, s=(a+b+c)/2','K=abc/(4R)'],[
   E('Incircle and circumcircle for a 3–4–5 triangle','A triangle has sides 3, 4, 5 and area 6 square units. Find its inradius and circumradius.',['Semiperimeter s=(3+4+5)/2=6.','From K=rs, r=6/6=1 unit.','From K=abc/(4R), R=(3×4×5)/(4×6)=60/24=2.5 units.','The circumradius matches half the hypotenuse 5/2.'],'Inradius 1 unit; circumradius 2.5 units.')
  ]),
  S('Why four sides do not determine an arbitrary quadrilateral area',[
   'Two four-sided figures may have exactly the same side lengths but different areas. For example, a square with all sides 3 cm has area 9 cm², while a non-square rhombus with the same sides has area 3×3×sin θ, which is less than 9 cm² when its interior angle θ is not 90°. The different angles change the perpendicular height.',
   'If a quadrilateral is cyclic, all four vertices lie on one circle. Cyclicity is an extra geometric condition, allowing a formula that depends only on the four side lengths. Without that condition or other geometric information, Brahmagupta’s formula must not be applied.'
  ],[],[
   E('Same sides do not guarantee same area','Two rhombi have all four sides 3 cm. One is a square and the other has a 30° interior angle. Compare their areas.',['The square has area 3×3=9 cm².','The second has base 3 cm and height 3 sin 30°=1.5 cm.','Its area is 3×1.5=4.5 cm².'],'Areas differ: 9 cm² versus 4.5 cm².')
  ]),
  S('Brahmagupta’s formula and its connection to Heron',[
   'For a cyclic quadrilateral with consecutive side lengths a,b,c,d, let s=(a+b+c+d)/2. Brahmagupta’s formula is K=√[(s−a)(s−b)(s−c)(s−d)]. It is a cyclic-quadrilateral formula, not a general quadrilateral formula.',
   'A rectangle is cyclic, so if its side lengths alternate a,b,a,b, then s=a+b. Substitution gives K=√[b×a×b×a]=ab, agreeing with rectangular area. Formally, letting the fourth side length tend to zero and two vertices merge makes the formula approach √[s(s−a)(s−b)(s−c)], exactly Heron’s formula for a triangle.'
  ],['For cyclic quadrilateral: K=√[(s−a)(s−b)(s−c)(s−d)]','s=(a+b+c+d)/2'],[
   E('Verify Brahmagupta on a rectangle','A rectangle has side lengths 6 cm, 4 cm, 6 cm, 4 cm. Use Brahmagupta’s formula to confirm its area.',['The rectangle is cyclic; s=(6+4+6+4)/2=10 cm.','The four factors are 10−6=4, 10−4=6, 10−6=4, 10−4=6.','K=√(4×6×4×6)=√576=24 cm².','The rectangular formula 6×4 gives the same result.'],'24 cm².')
  ])
 ]
});

const ch6topic=(section,title,paragraphs,formulas,examples)=>{
 const s=ch.sections.find(s=>s.title===section);
 if(!s)throw Error('Chapter 6 follow-up missing '+section);
 if(s.subtopics.some(u=>u.title===title))throw Error('Duplicate '+title);
 s.subtopics.push(S(title,paragraphs,formulas,examples));
};
ch6topic('Perimeter and circumference','Geometric hexagon bounds on pi',[
 'NCERT Section 6.2 compares the perimeter of a circle with regular polygons inside and outside it. For radius r, a regular inscribed hexagon has side r and perimeter 6r. A circumscribed regular hexagon has side 2r/√3 and perimeter 4√3r. Since 6r<2πr<4√3r, dividing by 2r gives 3<π<2√3.',
 'Archimedes tightened these bounds using polygons with 96 sides, obtaining 223/71<π<22/7. These are bounds and approximations, never equalities. The historical thread continues with Āryabhaṭa, Zu Chongzhi and Mādhava.'
],['3<π<2√3','223/71<π<22/7'],[
 E('Hexagons bounding pi','An inscribed regular hexagon and circumscribed regular hexagon surround a circle of radius 7 cm. Give their perimeters and deduce bounds for π.',[
  'Inscribed perimeter=6×7=42 cm.',
  'Circumscribed perimeter=4√3×7=28√3 cm.',
  '42<14π<28√3; divide by 14.'
 ],'3<π<2√3.')]);
ch6topic('Area of rectangles and parallelograms','Thin parallelograms and area-preserving shear',[
 'A familiar cut-and-paste proof of parallelogram area assumes that the chosen perpendicular meets the base segment. In a very slanted parallelogram it may meet the extended base instead. The standard single-cut diagram is then insufficient, but the area formula still holds.',
 'Slide the top edge parallel to the fixed base while preserving its perpendicular separation: equal-area triangular slivers are removed and added on opposite sides. Once the top edge is less offset, the usual rearrangement into a rectangle works. Therefore the area of any parallelogram is base times perpendicular height, not base times slant side.',
 'Two parallelograms can have side lengths 8 cm and 6 cm yet areas 48 cm² and 24 cm² if their perpendicular heights to the 8 cm base are 6 cm and 3 cm respectively.'
 ],['A=base×perpendicular height'],[
 E('Outside-base altitude','A parallelogram has base 8 cm and perpendicular height 3 cm. Its altitude meets an extension of the base. Find its area.',[
  'The perpendicular distance between the parallel lines is 3 cm even when its foot lies outside the side.',
  'Area=8×3.'
 ],'24 cm².')]);
ch6topic('Area of a circle and sector','Archimedes’ perimeter-times-radius area argument',[
 'For a regular polygon, joining its centre to its vertices divides the region into triangles with the same perpendicular height h to each side. Adding the triangle areas gives polygon area=(perimeter×h)/2.',
 'As the regular polygons gain more sides and approach the circle, the perimeter approaches C and h approaches radius r. This motivates circle area A=Cr/2=πr². It also explains why the ratio C²/A=4π does not depend on the radius.'
 ],['A=Cr/2=πr²','C²/A=4π'],[
 E('Circular area from circumference','A circle has circumference 20π cm. Calculate its area.',[
  'C=2πr gives r=10 cm.',
  'A=Cr/2=(20π×10)/2.'
 ],'100π cm².')]);
ch6topic('Area of a circle and sector','Ninety-degree circular segments',[
 'For a chord subtending 90° at the centre, the minor segment equals the quarter-circle sector minus the right-angled isosceles triangle between the two radii. The sector has area πr²/4 while the triangle has area r²/2.',
 'Thus the segment has area r²(π/4−1/2). The major segment is the full disc minus this minor segment. This method needs only the triangle area formula, not trigonometry.'
 ],['90° minor segment=r²(π/4−1/2)'],[
 E('Quarter-circle segment','Find the area of a 90° minor segment in a circle of radius 10 cm using π=3.14.',[
  'Sector area=3.14×100/4=78.5 cm².',
  'Triangle area=10×10/2=50 cm².',
  'Segment area=78.5−50.'
 ],'28.5 cm².')]);
ch6topic('Composite perimeter and area','Area of a concentric annulus from a tangent chord',[
 'The region between two concentric circles of radii R and r has area π(R²−r²). Suppose a chord of the outer circle of length l just touches the inner circle. A radius drawn to the point of tangency is perpendicular to and bisects the chord.',
 'By Pythagoras in the right triangle, R²−r²=(l/2)². Consequently the annulus area is πl²/4, which depends only on the chord length.'
 ],['Annulus area=π(R²−r²)=πl²/4'],[
 E('Tangent chord determines ring area','A tangent chord to an inner concentric circle has length 14 cm. Find the annulus area using π=22/7.',[
  'Half chord length=7 cm.',
  'R²−r²=7²=49.',
  'Area=(22/7)×49.'
 ],'154 cm².')]);
const mixedIndex=ch.sections.findIndex(s=>s.title==='Mixed exam applications and fully worked solutions');
if(mixedIndex<0)throw Error('Chapter 6 textbook audit: mixed-exam lesson not found');
ch.sections.splice(mixedIndex,0,...extra);
const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT?.['Measuring Space: Perimeter and Area'];
if(audit){
 const sections=ch.sections,subtopics=sections.flatMap(s=>s.subtopics||[]);
 const teaching=[ch.lead,...sections.flatMap(s=>[...(s.paragraphs||[]),
  ...(s.subtopics||[]).flatMap(u=>[...(u.paragraphs||[]),...(u.formulas||[]),...(u.bullets||[])])])];
 audit.sections=sections.length;
 audit.subtopics=subtopics.length;
 audit.examples=sections.reduce((n,s)=>n+(s.examples||[]).length,0)+
  subtopics.reduce((n,s)=>n+(s.examples||[]).length,0);
 audit.paragraphs=sections.reduce((n,s)=>n+(s.paragraphs||[]).length,0)+
  subtopics.reduce((n,s)=>n+(s.paragraphs||[]).length,0);
 audit.words=teaching.join(' ').trim().split(/\s+/).length;
 audit.reviewedSource='NCERT Ganita Manjari Part I (2026–27), Chapter 6, iemh106.pdf';
}

})();