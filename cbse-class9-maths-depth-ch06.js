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
})();