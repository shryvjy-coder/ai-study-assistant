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
})();