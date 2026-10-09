/* Chapter 1 — Orienting Yourself: The Use of Coordinates
 * Concept-first and exam-focused. Original StudyAI teaching text.
 */
(() => {
'use strict';
const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Orienting Yourself: The Use of Coordinates',[
['The Cartesian plane',[
['Why a single number is not enough',[
'A home address needs more than a street name: you must also know where along that street to go. In the same way, one coordinate tells us a position on a line, but locating an object on a flat map generally needs two independent pieces of information. One measures horizontal movement; the other measures vertical movement.',
'Imagine a chessboard with rows and columns. A square is identified by choosing one column and one row. Cartesian coordinates make this method precise for every point of an entire plane, not just squares on a grid. We choose two perpendicular number lines with a shared zero, called the origin O.'
],['Origin O=(0,0)','Horizontal coordinate = x; vertical coordinate = y'],[
E('The location of a point','A robot begins at the origin, travels 4 units right and 3 units upward. State its position.',['Right corresponds to positive horizontal displacement, so x=4.','Upward corresponds to positive vertical displacement, so y=3.','Write the coordinates in the fixed order (x,y).'],'(4,3)')]],
['The two axes and ordered pairs',[
'The horizontal number line is the x-axis and the vertical number line is the y-axis. Their intersection is the origin. Positive x points right; positive y points up. Negative coordinates describe movements in the opposite directions. The axes establish the direction and scale of the map.',
'The pair (3,−2) is called ordered because changing the order changes the point. It means move three units horizontally right, then two units vertically down. The pair (−2,3) belongs to a different location. When plotting points, always read x before y rather than guessing from the diagram.'
],['P=(x,y)','O=(0,0)'],[
E('Swapped coordinates','Are P=(2,−5) and Q=(−5,2) the same point?',['For P, move 2 right and 5 down.','For Q, move 5 left and 2 up.','The locations differ in both horizontal and vertical directions.'],'No. Ordered pairs cannot generally be swapped.')]],
['A coordinate system needs a consistent scale',[
'One grid square might represent 1 metre, 2 kilometres or 100 rupees, but the scale must be stated and applied consistently along each axis. The horizontal and vertical axes may have different scales if clearly labelled, yet equal steps on a single axis must represent equal numerical changes.',
'To read a plotted point, project it perpendicular to each axis. The foot on the x-axis gives the abscissa, and the foot on the y-axis gives the ordinate. A point that merely looks close to a labelled position is not exact evidence when the grid scale is unclear.'
],[],[
E('A graph-paper scale','A diagram marks every two squares as 5 units on the x-axis. How far in x is a point six squares right of the origin?',['Six squares form three groups of two squares.','Each group represents 5 units.','Horizontal coordinate is 3×5.'],'x=15 units')]]
]],
['Quadrants and signs',[
['Four regions, one sign rule',[
'Perpendicular axes split the plane into four regions called quadrants. Starting from the upper right and moving anticlockwise, we number them I, II, III and IV. The numbering is a convention; the signs follow directly from the chosen positive directions.',
'Quadrant I has positive x and positive y. Quadrant II has negative x but positive y. Quadrant III has both negative; Quadrant IV has positive x and negative y. Memorising a sign chart is helpful, but visualising right/left and up/down gives a reliable explanation.'
],['I: (+,+)','II: (−,+)','III: (−,−)','IV: (+,−)'],[
E('Identify a quadrant','In which quadrant does A=(−6,−4) lie?',['Negative x puts A to the left of the y-axis.','Negative y places it below the x-axis.','The lower-left region is Quadrant III.'],'Quadrant III')]],
['Points on axes are in no quadrant',[
'A point such as (7,0) lies exactly on the x-axis because its vertical displacement is zero. The point (0,−8) lies on the negative y-axis. Neither belongs to any of the four quadrants. The origin lies on both axes, so it too is outside the quadrants.',
'This exception is a frequent source of errors. A question asking for the quadrant of (0,5) does not have an answer among I–IV; the correct response is the positive y-axis. Coordinate values of zero are meaningful and must never be ignored.'
],['On x-axis: y=0','On y-axis: x=0'],[
E('Axis location','Identify where P=(0,−11) is located.',['The x-coordinate equals zero, so P cannot be strictly left or right of the y-axis.','The negative y-coordinate places it below the origin.'],'On the negative y-axis, not in Quadrant III or IV.')]],
['Reflection and sign changes',[
'If you reflect a point across the x-axis, its horizontal position remains unchanged but its vertical direction reverses. Thus (a,b) becomes (a,−b). Reflection across the y-axis changes (a,b) to (−a,b). Reflecting across both axes gives (−a,−b).',
'These transformations offer an immediate checking method for geometric drawings. They also explain why symmetric points can have different signs but equal distances from an axis. Notice that reflecting across y=x swaps coordinates, which is a different transformation from reflection in either axis.'
],['x-axis reflection: (x,y)→(x,−y)','y-axis reflection: (x,y)→(−x,y)'],[
E('Symmetric points','Find the image of (−2,5) after reflection in the y-axis.',['Reflection in the y-axis reverses the horizontal displacement.','Replace x=−2 with x=2 while retaining y=5.'],'(2,5)')]]
]],
['Plotting and reading coordinates',[
['A repeatable four-step plotting procedure',[
'First mark the two perpendicular axes, the origin and a scale. Next locate the first coordinate on the x-axis. From there move parallel to the y-axis to the indicated second coordinate. Finally place a dot and write its label. Using these steps in order prevents the common mistake of reversing coordinates.',
'For negative x-values move left before moving up or down. It is useful to draw a light dotted guide to each axis. On unruled paper, avoid relying on eye estimates when a ruler or labelled grid is available.'
],[],[
E('Plot two points','Explain how to plot A=(−3,2) and B=(3,−2).',['For A, begin at O, go three left, then two up.','For B, go three right, then two down.','Label A and B next to their dots and verify opposite signs.'],'A lies in Quadrant II and B in Quadrant IV.')]],
['Extracting information from a graph',[
'Coordinates are mathematical descriptions of points in a particular context. On a time–distance graph, x could measure time and y distance; on a map, x and y could each measure kilometres. The physical meaning of a coordinate comes from the axis labels, not from the symbols alone.',
'Check the axis origin before interpreting trends. Some graphs begin at nonzero values, and a misleading scale can exaggerate visual differences. If one marked step equals five units, the point at the third step represents fifteen units, not three.'
],[],[
E('Reading a context graph','A plotted point has coordinates (6,45), where x is hours and y is kilometres. Interpret it.',['Read the axis labels before interpreting the numbers.','The first coordinate is 6 hours.','The second coordinate is 45 kilometres.'],'At 6 hours, the measured quantity is 45 km.')]],
['Drawing shapes from vertices',[
'Four points can be the vertices of a rectangle, but this must be checked from their coordinates. If the intended sides are parallel to the axes, opposite vertices must have the same extreme x-values and the same extreme y-values. Joining vertices in the wrong order may instead draw crossing diagonals.',
'A shape may also be translated without changing its size. Adding the same horizontal number to every x-coordinate and the same vertical number to every y-coordinate moves the entire shape while preserving its lengths and angles.'
],[],[
E('Rectangle from coordinates','Check whether (1,2),(5,2),(5,6),(1,6), in that order, form a rectangle.',['The first and third listed sides are horizontal because paired y-values are equal.','The other two sides are vertical because paired x-values are equal.','Horizontal lines meet vertical lines at right angles.'],'Yes; its width and height are each 4 units.')]]
]],
['Horizontal and vertical distance',[
['Distance on a horizontal line',[
'Two points with the same y-coordinate lie at the same height. Their separation is purely horizontal, so the distance between A=(x₁,c) and B=(x₂,c) equals |x₂−x₁|. Absolute value makes the result nonnegative regardless of which endpoint we write first.',
'For example, the distance from (−4,2) to (3,2) is |3−(−4)|=7 units. Counting seven equally spaced grid units from left to right gives exactly the same result. This connects signed arithmetic to geometric length.'
],['AB=|x₂−x₁| if y₁=y₂'],[
E('Horizontal distance','Find the distance between (−7,5) and (2,5).',['The y-coordinates match, so use the horizontal difference.','Calculate |2−(−7)|=|9|.'],'9 units')]],
['Distance on a vertical line',[
'When x-coordinates match, the two points lie on a vertical line. Their distance is |y₂−y₁|. The same principle used for horizontal separation now applies to the vertical axis. We never sum the absolute values of the individual coordinates unless the points lie on opposite sides of the origin and that sum matches their difference.',
'Units must follow the graph scale. A difference of 6 on an axis marked in kilometres represents 6 km; a difference of 6 on an axis marked in centimetres represents 6 cm.'
],['AB=|y₂−y₁| if x₁=x₂'],[
E('Vertical separation','Determine the distance from (−1,−8) to (−1,4).',['x stays −1, so this is a vertical segment.','Distance=|4−(−8)|=12.'],'12 units')]],
['Comparing horizontal and vertical change',[
'When neither coordinate matches, first compute horizontal change Δx=x₂−x₁ and vertical change Δy=y₂−y₁. These differences are signed displacements, not lengths. Their absolute values give the leg lengths of the right triangle that joins the points.',
'Drawing horizontal and vertical guides creates a right triangle. The legs meet at a right angle because the coordinate axes are perpendicular. This prepares the geometric proof of the general distance formula.'
],['Δx=x₂−x₁','Δy=y₂−y₁','Horizontal leg=|Δx|; vertical leg=|Δy|'],[
E('Two directional changes','From A=(−3,2) to B=(5,−4), find the horizontal and vertical displacements.',['Δx=5−(−3)=8.','Δy=−4−2=−6.','Interpret +8 as right and −6 as downward.'],'8 units right and 6 units down.')]]
]],
['Distance between two general points',[
['Deriving the distance formula',[
'Let A=(x₁,y₁) and B=(x₂,y₂). Construct a right triangle by drawing a horizontal segment from A and a vertical segment up or down to B. The horizontal leg has length |x₂−x₁| and the vertical leg has length |y₂−y₁|.',
'By the Pythagorean theorem, AB²=(x₂−x₁)²+(y₂−y₁)². We choose the positive square root because a distance cannot be negative. Squaring means that signed differences cause no difficulty: (−5)²=25.'
],['AB=√((x₂−x₁)²+(y₂−y₁)²)'],[
E('A 3–4–5 coordinate triangle','Find distance from A=(−1,2) to B=(2,6).',['Compute horizontal difference: 2−(−1)=3.','Compute vertical difference: 6−2=4.','AB=√(3²+4²)=√25.'],'5 units')]],
['Exact distances and irrational answers',[
'Coordinate distances need not be whole numbers. Between (0,0) and (1,1), the horizontal and vertical legs are each 1, so the diagonal length is √2. This is an exact irrational number. Rounding to 1.41 too early loses accuracy and should be avoided in proof or exact-value questions.',
'An alternative way to check a distance is symmetry: exchanging A and B reverses both coordinate differences but does not change their squares. Therefore the formula produces the same distance in either direction.'
],['OA from (0,0) to (a,b)=√(a²+b²)'],[
E('Exact diagonal','Find the distance between P=(−2,3) and Q=(1,5).',['Δx=1−(−2)=3 and Δy=5−3=2.','Square and add: 3²+2²=13.','Take the positive square root.'],'√13 units')]],
['Coordinate geometry in word problems',[
'Questions about a city grid, a sports field or an engineering drawing often give coordinates rather than drawn triangles. Write the coordinates in a small table and identify which measurement is required. Use horizontal/vertical absolute differences when appropriate; use the full Pythagorean method for diagonal distances.',
'Always verify the answer against a rough sketch. The straight-line distance should not exceed the length of a route made by first travelling horizontally and then vertically, because the hypotenuse of a right triangle is shorter than the sum of its two nonzero legs.'
],[],[
E('Surveyor measurement','Two markers on a kilometre grid are (−2,−3) and (4,5). Find their straight-line separation.',['Δx=4−(−2)=6 km; Δy=5−(−3)=8 km.','Straight-line distance=√(6²+8²)=√100.','Compare with the 14 km grid route as a sense check.'],'10 km')]]
]]
],{
lead:'A map becomes mathematical when a location can be expressed as a pair of numbers. This chapter develops perpendicular axes, the meaning of signs and quadrants, exact plotting and distances, and the link between coordinate differences and the Pythagorean theorem. Use the accompanying diagrams and practise explaining every displacement before calculating.',
mixed:[
['Mixed question: plot and measure','A(−2,1), B(4,1), C(4,5) are three vertices of a right triangle. Find AB, BC and AC.',['AB is horizontal, so AB=|4−(−2)|=6.','BC is vertical, so BC=|5−1|=4.','AC=√(6²+4²)=√52=2√13.','The right angle is at B because AB is horizontal and BC vertical.'],'AB=6, BC=4, AC=2√13 units.'],
['Mixed question: equal distances','For P=(t,0), find t if P is equidistant from A=(0,0) and B=(6,0).',['PA=|t| and PB=|t−6|.','Equate their squares: t²=(t−6)².','Expand: t²=t²−12t+36.','Solve 12t=36 and check both distances.'],'t=3.']
]});

/* Follow-up audit against the official Ganita Manjari Ch. 1 exercises.
 * The existing chapter already explains axis reflections correctly.
 * Preserve those lessons; add actual missing exercise skills.
 * Section 1.4 in NCERT concerns distances, not linear-equation graphs.
 */
const ch=window.CBSE_CLASS9_MATH_FULL_NOTES['Orienting Yourself: The Use of Coordinates'];
const S=D.subsection;
const learning=[
{
 title:'From ancient navigation to accurate room maps',
 paragraphs:[
  'A coordinate grid grew out of a practical question: how can one person explain an exact location to someone else? Historical examples discussed in the NCERT chapter include the planned North–South and East–West streets of the Sindhu–Sarasvatī civilisation, geometrical ideas associated with Baudhāyana, and the role of Ujjayinī as an important reference meridian in astronomical geography. The chapter also connects the development of zero and signed numbers with Brahmagupta, and later algebraic coordinate methods with Fermat and René Descartes.',
  'These examples illustrate an enduring idea rather than one single inventor: a reference location, fixed directions, numbers and agreed units allow different people to describe the same position. Historical dates and attribution are background context; the central mathematical skill is translating a location into a reproducible ordered pair.'
 ],
 subtopics:[
  S('Historical ideas and the modern Cartesian grid',[
   'Ancient planners could describe routes by counting regular street intervals east or west and north or south of a chosen reference. Later mapping and astronomy required numerical descriptions of where a place or celestial object was located. In the modern Cartesian system, two perpendicular signed number lines capture the same logic in precise symbolic form.',
   'The choice of where to place the origin is a convention, not a property of the object being located. For example, a room corner can be (0,0) in one map while a door is the origin in another; the objects have not moved. You must declare an origin, positive directions and a scale before comparing coordinates.'
  ],[],[
   E('How a reference point changes the numbers','On one map a pin at A is 4 m east and 2 m north of corner O. A second map places its origin at a point 3 m east of O. What are A’s coordinates in the second map?',['Original A=(4,2), and new origin is (3,0) on the old system.','Subtract the new origin coordinates: (4−3,2−0).','The physical pin has not moved.'],'A=(1,2) in the new coordinate system.')
  ]),
  S('Locating objects from a scale and floor plan',[
   'In a floor plan, the grid describes positions on the floor, so its two axes cannot by themselves tell us the height of windows, shelves or tables. The textbook models the layout of a room using marked reference points; the third, vertical dimension would require an additional measurement.',
   'Represent a room as a rectangle, choose the lower-left corner as (0,0), and let the horizontal and vertical axes run along its walls. To place furniture, give the coordinates of its corners; to judge whether two objects overlap, compare their horizontal and vertical intervals. Convert the scale consistently before interpreting any distance.'
  ],[],[
   E('Door width on a floor plan','A doorway extends along the x-axis from (2.5,0) to (3.4,0), with coordinates measured in metres. Find its width and its distance from the y-axis at the nearer edge.',['Both points lie on the x-axis, so width is |3.4−2.5|=0.9 m.','The doorway begins at x=2.5, so its nearer edge is 2.5 m from the y-axis.','The distance measured along the x-axis is independent of the drawing size.'],'Width 0.9 m; nearer edge 2.5 m from the y-axis.')
  ]),
  S('Coordinates and accessibility of a map',[
   'A grid need not be purely visual. A model with textured lines and tactile markers can convey directions and distances by touch. Labelled coordinate descriptions also allow a diagram to be explained clearly in words or accessed with assistive technology.',
   'When using a physical scale, be explicit about the units: 1 cm on a drawing might represent 1 foot in a room, while one coordinate unit could correspond to a different real-life distance. The geometry only remains reliable when both directions use the declared scale.'
  ],[],[
   E('Scale conversion','A room plan uses 1 cm for every 2 feet. A table measures 3 cm by 2 cm on the drawing. Find its real dimensions.',['Multiply each plan length by 2 feet per centimetre.','Length: 3×2=6 feet. Width: 2×2=4 feet.'],'6 feet by 4 feet.')
  ])
 ]
},
{
 title:'Midpoints, missing endpoints and dividing a segment',
 paragraphs:[
  'The midpoint is halfway along the straight segment from A to B. Its horizontal coordinate is the average of the two endpoint x-coordinates, and its vertical coordinate is the average of the two y-coordinates. This works even when the segment is slanted or crosses axes.',
  'More generally, to move a fraction t of the way from A to B, add t times the coordinate differences to A. The midpoint corresponds to t=1/2; points trisecting the segment correspond to t=1/3 and t=2/3.'
 ],
 subtopics:[
  S('Derive the coordinate midpoint formula',[
   'Let A=(x₁,y₁), B=(x₂,y₂), and M be the point exactly halfway from A to B. To reach M from A, travel half of the horizontal displacement x₂−x₁ and half of the vertical displacement y₂−y₁. Thus x_M=x₁+(x₂−x₁)/2=(x₁+x₂)/2, with the same derivation for y.',
   'The resulting midpoint lies on AB because it divides both coordinate differences by the same factor. Its distances to A and B are equal, since the two displacement vectors from the midpoint have equal component magnitudes.'
  ],['M=((x₁+x₂)/2,(y₁+y₂)/2)'],[
   E('Find a midpoint across quadrants','Find the midpoint of A=(−6,5) and B=(4,−3).',['Average the x-values: (−6+4)/2=−1.','Average the y-values: (5−3)/2=1.','Check that the movement from A to M is (5,−4), and from M to B is also (5,−4).'],'M=(−1,1).')
  ]),
  S('Find an unknown endpoint from a midpoint',[
   'Sometimes the midpoint and one endpoint are known. Rearrange the coordinate averages: if 2x_M=x_A+x_B, then x_B=2x_M−x_A; similarly y_B=2y_M−y_A. This procedure is valid for negative values and fractions.',
   'A strong exam answer checks the recovered endpoint by averaging it with A to reproduce M. Never double the known endpoint alone: it is the midpoint coordinate that must be doubled first.'
  ],['B=(2x_M−x_A, 2y_M−y_A)'],[
   E('Recover the second endpoint','M=(−4,2) is the midpoint of A=(2,−5) and B. Find B.',['Use x_B=2(−4)−2=−10.','Use y_B=2(2)−(−5)=9.','Check averages: (2−10)/2=−4 and (−5+9)/2=2.'],'B=(−10,9).')
  ]),
  S('Trisection and the one-third displacement method',[
   'Two trisection points P and Q divide AB into three equal straight segments in order A,P,Q,B. The displacement from A to B is (Δx,Δy). Therefore P=A+(Δx/3,Δy/3) and Q=A+(2Δx/3,2Δy/3).',
   'A trisection point is generally not obtained by dividing each endpoint coordinate by three. We divide the difference between endpoints, then add the appropriate fraction of that difference to the starting point.'
  ],['P=((2x_A+x_B)/3,(2y_A+y_B)/3)','Q=((x_A+2x_B)/3,(y_A+2y_B)/3)'],[
   E('Trisect a sloping segment','A=(−3,2), B=(9,−7). Find the two trisection points P and Q.',['Displacement B−A=(12,−9).','One-third displacement=(4,−3).','P=A+(4,−3)=(1,−1).','Q=A+2(4,−3)=(5,−4).','Consecutive differences AP, PQ and QB are all (4,−3).'],'P=(1,−1), Q=(5,−4).')
  ])
 ]
},
{
 title:'Coordinate tests for lines, triangles and squares',
 paragraphs:[
  'Once points are plotted, coordinate differences allow us to test a geometric claim without relying on the appearance of a sketch. Equal lengths, straight-line alignment, perpendicularity and area can all be expressed through arithmetic.',
  'For a triangle or quadrilateral, label vertices in order and calculate the relevant side lengths. Use exact square roots where necessary. For right-angled triangles, the Pythagorean theorem gives an independent check of the area and the perimeter.'
 ],
 subtopics:[
  S('Collinearity: three points on one straight line',[
   'Points A, B and C are collinear when they lie on one straight line. One method compares their slopes when the horizontal differences are nonzero. A method valid even for vertical lines uses the zero-area condition (x_B−x_A)(y_C−y_A)=(y_B−y_A)(x_C−x_A).',
   'This condition means the two displacement vectors from A are parallel. Another method, when B is suspected to lie between A and C, is AB+BC=AC; it must be used with the correct ordering, because distance addition can hold differently depending on which point lies between the others.'
  ],['(x_B−x_A)(y_C−y_A)=(y_B−y_A)(x_C−x_A) for collinearity'],[
   E('Test collinearity without a graph','Are A=(−2,−3), B=(1,1) and C=(7,9) collinear?',['AB=(3,4) and AC=(9,12).','Check cross products: 3×12=36 and 4×9=36.','The displacement vectors are parallel, so the three points share a line.'],'Yes, A, B and C are collinear.')
  ]),
  S('Area and perimeter of a plotted right triangle',[
   'If one side of a triangle is horizontal and another is vertical, those sides meet at a right angle. Use their absolute coordinate differences as base and perpendicular height. The area is half their product, while the perimeter is the sum of all three side lengths.',
   'If the third side is slanted, calculate its exact length using the distance formula. A triangle with vertices (0,0),(4,0),(0,3) has legs 4 and 3, diagonal 5, perimeter 12, and area 6 square units. The method works after translations of the triangle as well.'
  ],['Area of right triangle=(1/2)×leg₁×leg₂'],[
   E('Triangle with translated vertices','A=(1,1), B=(7,1), C=(1,5). Find its area and perimeter.',['AB is horizontal with length |7−1|=6.','AC is vertical with length |5−1|=4.','BC=√[(7−1)²+(1−5)²]=√52=2√13.','Area=(1/2)×6×4=12.','Perimeter=6+4+2√13.'],'Area=12 square units; perimeter=10+2√13 units.')
  ]),
  S('Identify a square using distances and right angles',[
   'Four equal sides alone establish a rhombus, not necessarily a square. To establish a square from coordinates, show four consecutive side lengths are equal and show two adjacent sides are perpendicular. You may check perpendicularity by a horizontal–vertical angle or, more generally, by zero dot product of their displacement vectors.',
   'For two displacement vectors (a,b) and (c,d), perpendicularity means ac+bd=0. If a square side has length s, its perimeter is 4s and its area is s². When the square is tilted, its area is not generally the area of its smallest axis-aligned enclosing rectangle.'
  ],['Perpendicular vectors: ac+bd=0','Square perimeter=4s; square area=s²'],[
   E('A tilted coordinate square','A=(1,1), B=(4,2), C=(3,5), D=(0,4). Show that ABCD is a square and find its area.',['AB vector=(3,1) and BC vector=(−1,3).','AB²=3²+1²=10; BC²=(−1)²+3²=10.','The other sides CD and DA also have squared length 10.','AB·BC=3(−1)+1(3)=0, proving a right angle.','Four equal consecutive sides and a right angle imply a square; area=(√10)².'],'A square of area 10 square units (perimeter 4√10 units).')
  ]),
  S('Right-angle and isosceles triangle coordinate tests',[
   'A right angle can be checked from the Pythagorean theorem: if the longest squared side equals the sum of the other two squared sides, the triangle is right-angled. This avoids approximations and works for a triangle with slanted sides.',
   'An isosceles triangle has at least two equal-length sides; compare squared distances to avoid unnecessary radicals. If two side lengths are equal and the triangle is also right-angled, it is a right-angled isosceles triangle. A sketch that only looks symmetric is not a proof.'
  ],['AB²=(x_B−x_A)²+(y_B−y_A)²'],[
   E('Prove a triangle is right-angled','A=(0,0), B=(2,1), C=(1,−2). Classify triangle ABC.',['AB²=2²+1²=5.','AC²=1²+(−2)²=5.','BC²=(1−2)²+(−2−1)²=1+9=10.','AB²+AC²=BC², so angle A is 90° and AB=AC.'],'A right-angled isosceles triangle with right angle at A.')
  ])
 ]
},
{
 title:'Circles, screens and applications of coordinates',
 paragraphs:[
  'Distances from a fixed centre classify points relative to a circle. A point is on, inside or outside a circle depending on whether its centre-distance is equal to, less than or greater than the radius.',
  'The same ideas solve practical geometry tasks: deciding whether a circular icon fits on a rectangular display, or whether two circular regions intersect. These are extension-style applications of the distance formula used in the textbook’s end-of-chapter exercises.'
 ],
 subtopics:[
  S('Inside, on or outside a circle',[
   'For a circle with centre O=(a,b) and radius r, a point P=(x,y) is on the circle when (x−a)²+(y−b)²=r². It is inside when the squared distance is smaller, and outside when larger.',
   'Comparing squared values is just as accurate and often simpler than calculating square roots. With centre (0,0) and radius 5, the threshold is r²=25. Point (3,4) has squared distance 25, while (2,2) has 8 and (−6,0) has 36.'
  ],['On circle: (x−a)²+(y−b)²=r²','Inside if distance²<r²; outside if distance²>r²'],[
   E('Three point classifications','A circle has centre C=(2,−1) and radius 5. Classify P=(5,3), Q=(2,2), R=(8,−1).',['P−C=(3,4); squared distance=9+16=25=r², so P is on the circle.','Q−C=(0,3); squared distance=9<25, so Q is inside.','R−C=(6,0); squared distance=36>25, so R is outside.'],'P on; Q inside; R outside.')
  ]),
  S('Circular icons inside a rectangular screen',[
   'If the pixel origin is at the bottom-left corner and the screen width is W and height H, a circular icon of centre (x,y) and radius r fits entirely inside when its left, right, bottom and top extremes stay within the display.',
   'That condition is x−r≥0, x+r≤W, y−r≥0 and y+r≤H. An icon can have its centre inside a screen but still be partly clipped if the centre is too close to an edge.'
  ],['Fit conditions: r≤x≤W−r and r≤y≤H−r'],[
   E('Screen-boundary check','An 800×600 pixel screen displays a circle centred at (45,100) with radius 60 pixels. Is the full circle visible?',['Leftmost x is 45−60=−15, less than 0.','Rightmost x is 105 and y spans 40 to 160, all within their bounds.','Even though its centre is visible, 15 pixels extend past the left boundary.'],'No, part of the circle is outside the screen.')
  ]),
  S('When two circular regions touch or overlap',[
   'Compute the centre distance d with the coordinate distance formula. If d>r₁+r₂, the circles are externally separate; if d=r₁+r₂, they touch externally; and if d<r₁+r₂, their discs overlap (provided neither is being discussed only as a nonintersecting circumference).',
   'To determine intersections of the two circumferences specifically, also compare d with |r₁−r₂|. When |r₁−r₂|<d<r₁+r₂ there are two circumference intersection points. If d<|r₁−r₂|, one circle lies strictly inside the other and their boundaries do not meet. Equal centres and equal radii describe coincident circles.'
  ],['Two crossing circumferences: |r₁−r₂|<d<r₁+r₂'],[
   E('Two icons on one display','Two circular icons have centres A=(80,100), B=(200,100), with radii 60 and 70 pixels. Determine whether their circumferences cross.',['Distance between centres d=|200−80|=120 pixels.','Sum of radii=130 and difference=10.','Since 10<120<130, the two circumferences cross at two points.'],'Yes, the circles intersect at two boundary points.')
  ]),
  S('A systematic approach to coordinate word problems',[
   'First name the real-world objects and translate them into points, line segments or circles. Declare axes, origin and unit scale. Then write down the question in geometrical language: a length, a midpoint, a straight line, a region or an overlap.',
   'Calculate using a justified formula, keep exact square roots when relevant, and explain what the output means in the original context. Include boundary cases such as a point lying on a circle rather than only inside or outside, and test that sizes remain physically sensible.'
  ],[],[
   E('Plan a meeting point','Two paths begin at A=(2,1) and B=(12,9) on a kilometre grid. Find a meeting point halfway along the straight segment and its distance from A.',['Midpoint M=((2+12)/2,(1+9)/2)=(7,5).','Displacement A→M is (5,4), so AM=√(5²+4²)=√41 km.','BM has the same length, which confirms M is halfway.'],'M=(7,5); distance √41 km from each endpoint.')
  ])
 ]
}
];
const mixedAt=ch.sections.findIndex(s=>s.title==='Mixed exam applications and fully worked solutions');
if(mixedAt<0)throw Error('Chapter 1 audit: missing mixed-application section');
ch.sections.unshift(learning[0]);
ch.sections.splice(mixedAt+1,0,...learning.slice(1)); // indices shift by one after unshift

// Extend the existing reflection subsection instead of duplicating it.
const reflections=ch.sections
 .flatMap(section=>Array.isArray(section.subtopics)?section.subtopics:[])
 .find(part=>part.title==='Reflection and sign changes');
if(!reflections)throw Error('Chapter 1 audit: original reflection section missing');
reflections.paragraphs.push(
 'Reflecting twice—first in the x-axis and then in the y-axis—changes both signs. Since reflecting in an axis preserves all side lengths and angles, a triangle and its mirror image are congruent. For coordinate questions, apply each sign change to the latest image rather than the original point.'
);
reflections.examples.push(E('Two successive axis reflections',
 'Reflect P=(−3,4) first in the x-axis and then in the y-axis.',
 ['After x-axis reflection, keep x=−3 and change y to −4, giving (−3,−4).',
  'Reflect this new point in the y-axis: x changes from −3 to 3, while y remains −4.'],
 'Final point=(3,−4).'
));

// Clarify that absolute value gives an axis-aligned length, while the general
// distance formula uses both squared coordinate differences.
const horizontal=ch.sections.flatMap(s=>s.subtopics||[])
 .find(part=>part.title==='Distance on a horizontal line');
horizontal.paragraphs.push(
 'The expression |x₂−x₁| is the larger x-coordinate minus the smaller x-coordinate, regardless of endpoint order. This formula measures a horizontal segment because both y-coordinates agree. If both coordinates change, use the Pythagorean distance formula instead—absolute horizontal change alone is not the full straight-line distance.'
);

// Recompute all public audit metrics so the browser checks reflect appended notes.
const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT?.['Orienting Yourself: The Use of Coordinates'];
if(audit){
 const sec=ch.sections,parts=sec.flatMap(s=>s.subtopics||[]);
 const strings=[ch.lead,...sec.flatMap(s=>[...(s.paragraphs||[]),
   ...(s.subtopics||[]).flatMap(u=>[...(u.paragraphs||[]),...(u.formulas||[]),...(u.bullets||[])])])];
 audit.sections=sec.length;
 audit.subtopics=parts.length;
 audit.examples=sec.reduce((n,s)=>n+(s.examples||[]).length,0)+parts.reduce((n,u)=>n+(u.examples||[]).length,0);
 audit.paragraphs=sec.reduce((n,s)=>n+(s.paragraphs||[]).length,0)+parts.reduce((n,u)=>n+(u.paragraphs||[]).length,0);
 audit.words=strings.join(' ').trim().split(/\s+/).length;
 audit.reviewedSource='NCERT Ganita Manjari Part I 2026–27, Chapter 1 (iemh101.pdf)';
}

})();