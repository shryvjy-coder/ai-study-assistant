/* Chapter 12 — Quadrilaterals */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Quadrilaterals',[
['Quadrilaterals and angle sum',[
['Why four interior angles total 360 degrees',[
'A simple quadrilateral is a polygon with four sides and four vertices. Draw a diagonal from one vertex to the opposite vertex so that the interior is divided into two nonoverlapping triangles. Each triangle has angle sum 180°.',
'The four quadrilateral interior angles, with the two angles at the diagonal endpoints combined appropriately, therefore add to 180°+180°=360°. This is a geometric derivation and does not depend on whether the shape looks like a rectangle, rhombus or irregular figure.'
],['∠A+∠B+∠C+∠D=360°'],[E('Missing angle','A quadrilateral has angles 73°, 91° and 108°. Find its fourth angle.',['Add known angles: 73+91+108=272°.','Subtract from 360°.'],'88°')]],
['Convex and concave quadrilaterals',[
'In a convex quadrilateral all its interior angles are less than 180° and each diagonal remains within the figure. A concave quadrilateral has an interior angle greater than 180° and an inward-pointing corner.',
'The interior angle sum remains 360° for simple non-self-intersecting quadrilaterals, though the geometric decomposition must respect the figure. A drawing with crossing edges is not an ordinary simple quadrilateral and should not be treated identically.'
],[],[E('Recognise concavity','A simple quadrilateral has one interior angle of 210°. Is it convex?',['A convex quadrilateral has all interior angles less than 180°.','210° exceeds 180°, indicating a reflex interior angle.'],'No. It is concave.')]]
]],
['Parallelogram properties',[
['Opposite sides and angles',[
'A parallelogram is a quadrilateral in which both pairs of opposite sides are parallel. Drawing a diagonal produces triangles with equal alternate interior angles due to the parallel sides and a shared diagonal.',
'By angle-side-angle congruence, opposite sides of the parallelogram have equal lengths. Equal triangles also imply opposite angles are equal. Adjacent interior angles sum to 180° because they are co-interior angles on parallel lines.'
],['AB∥CD and BC∥AD','AB=CD; BC=AD','∠A=∠C; ∠B=∠D'],[E('Parallelogram angles','Adjacent angles of a parallelogram are in the ratio 2:3. Find all four angles.',['Let adjacent angles be 2x and 3x.','They are supplementary, so 5x=180°, x=36°.','Angles are 72° and 108° alternating.'],'72°,108°,72°,108°')]],
['Diagonal bisection theorem',[
'In parallelogram ABCD the diagonals AC and BD meet at O. Using AB∥CD, alternate interior angles formed by the diagonals are equal; AB=CD by the side theorem. Thus triangles AOB and COD are congruent.',
'Corresponding diagonal halves match: AO=OC and BO=OD. Conversely, if both diagonals of a quadrilateral bisect each other, reverse the congruence argument to obtain parallel opposite sides, establishing a parallelogram.'
],['AO=OC; BO=OD'],[E('Diagonal lengths','In a parallelogram AC=18 cm and BD=26 cm. Find AO and BO if O is the diagonal intersection.',['Diagonals bisect each other.','AO=AC/2=9 cm.','BO=BD/2=13 cm.'],'AO=9 cm and BO=13 cm')]],
['Special parallelograms',[
'Rectangles, rhombuses and squares are special parallelograms. A rectangle has four right angles and equal diagonals. A rhombus has four equal sides and perpendicular diagonals. A square has both properties.',
'Do not reverse every property without care: equal diagonals alone do not force an arbitrary quadrilateral to be a rectangle. Combine an appropriate parallelogram condition with the extra property to justify the stronger classification.'
],[],[E('Classification','A parallelogram has one right angle. Prove it is a rectangle.',['Adjacent parallelogram angles are supplementary.','If one angle is 90°, its adjacent angles are 180−90=90°.','Opposite angles are equal, so all four are 90°.'],'It is a rectangle.')]]
]],
['Tests for a parallelogram',[
['One pair equal and parallel is sufficient',[
'Suppose a quadrilateral has one pair of opposite sides AB and CD that are equal and parallel. Draw diagonal AC. Because AB∥CD, a pair of alternate interior angles is equal; AB=CD and AC is shared.',
'The two triangles are congruent by side-angle-side. Corresponding alternate angles then show the remaining pair of opposite sides is parallel. Thus the quadrilateral satisfies the definition of a parallelogram.'
],[],[E('A valid test','In ABCD, AB∥CD and AB=CD. What can be concluded?',['One pair of opposite sides is both equal and parallel.','This is a sufficient parallelogram test.'],'ABCD is a parallelogram.')]],
['Tests based on opposite sides, angles and diagonals',[
'A quadrilateral is a parallelogram if both pairs of opposite sides are equal. Other sufficient tests are both pairs of opposite angles equal, or diagonals bisecting each other.',
'Each condition can be proved with triangle congruence or parallel-angle relationships. However, just one pair of equal opposite sides is not enough unless that pair is also parallel or another valid condition is known.'
],[],[E('Spot the missing fact','AB=CD in a quadrilateral. Is that alone enough to establish a parallelogram?',['A trapezium or irregular quadrilateral may contain one pair of equal opposite sides.','The condition says nothing about the remaining sides or parallels.'],'No; additional information is required.')]]
]],
['Triangle midpoint theorem',[
['Midpoint theorem and the factor one-half',[
'In triangle ABC, let D and E be midpoints of AB and AC. Join DE. The midpoint theorem states that DE is parallel to BC and DE=BC/2.',
'One proof extends DE beyond E to F with EF=DE and connects F to C. Triangles AED and CEF are congruent because AE=EC, DE=EF and the included angles are vertically opposite. Therefore CF=AD and CF∥AD; since AD=DB, DBCF is a parallelogram. Thus DF=BC and DF∥BC, while DE=DF/2.'
],['D midpoint AB, E midpoint AC ⇒ DE∥BC, DE=BC/2'],[E('Midpoint segment','In triangle ABC, D,E are midpoints of AB and AC and BC=18 cm. Find DE.',['Use the midpoint theorem.','DE is half of BC.','18/2.'],'9 cm')]],
['Converse midpoint theorem',[
'If a line passes through the midpoint of one side of a triangle and is parallel to another side, it bisects the remaining side. This is the converse of the midpoint theorem.',
'In triangle ABC, let D be midpoint of AB and draw DE∥BC meeting AC at E. Using similarity or an equal parallel construction, AD/AB=AE/AC=1/2, giving AE=EC. Verify that the parallel condition is part of the hypothesis.'
],[],[E('Converse application','D is the midpoint of AB, DE∥BC, AC=14 cm. Find AE.',['By the converse midpoint theorem, E is midpoint of AC.','Therefore AE=AC/2=7 cm.'],'7 cm')]]
]],
['Medians and parallelogram reasoning',[
['A median divides a triangle into equal-area parts',[
'A median joins a vertex to the midpoint of the opposite side. In triangle ABC, the median AD meets BC at its midpoint D, so BD=DC.',
'Triangles ABD and ACD share the same altitude from A to BC, while their bases BD and DC are equal. Each area is (1/2)×base×height, hence their areas are equal. This need not imply congruence.'
],['[ABD]=[ACD] for median AD'],[E('Equal areas','A triangle of area 50 cm² has a median from vertex A. Find the two areas.',['The median creates equal bases on BC.','The new triangles have the same altitude.','Half of 50 is 25.'],'25 cm² each')]],
['The centroid divides each median 2 to 1',[
'All three medians of a triangle meet at one point called the centroid G. On median AD from vertex A to midpoint D of BC, the centroid satisfies AG:GD=2:1. Thus G is located two-thirds of the way from a vertex to the midpoint of the opposite side.',
'A useful proof uses the midpoint theorem to build a smaller parallelogram, then compares its diagonals or uses triangle area relationships. Do not confuse the centroid with the circumcentre or angle-bisector intersection, which solve different geometric problems.'
],['AG:GD=2:1','AG=(2/3)AD; GD=(1/3)AD'],[E('Centroid division','Median AD is 18 cm and G is the centroid. Find AG and GD.',['Total median is 3 equal ratio parts.','Each part is 18/3=6.','AG has 2 parts; GD has 1.'],'AG=12 cm; GD=6 cm')]]
]],
['Tiling with quadrilaterals',[
['Any quadrilateral can tile a plane',[
'Tiling means covering a plane without gaps or overlaps using repeated shapes. A surprising geometric fact is that copies of any quadrilateral can tile the plane using suitable rotations and translations.',
'At every vertex of a quadrilateral, the four angles sum to 360°. By placing four rotated copies so that different corners meet, those angles fit exactly around a point. Repeating the arrangement makes larger strips and fills the plane.'
],['Four interior angles sum 360°'],[E('Angle fit in tiling','A quadrilateral has angles 80°, 95°, 115°, 70°. Can one of each angle meet around a point?',['Add 80+95+115+70.','The total is 360°, exactly one full turn.'],'Yes, they can fit around a point.')]],
['Midpoint quadrilaterals and Varignon’s theorem',[
'Join the midpoints of consecutive sides of any quadrilateral ABCD to obtain EFGH. In triangle ABC, EF is parallel to AC and half its length. In triangle CDA, GH is also parallel to AC and half its length.',
'Thus EF and GH are equal and parallel. Similarly FG and HE are equal and parallel because each is parallel to BD and half its length. Both opposite pairs are parallel, so EFGH is a parallelogram. This holds even when ABCD itself is not a parallelogram.'
],['EF∥GH, EF=GH; FG∥HE, FG=HE'],[E('A midpoint figure','Midpoints of any quadrilateral sides are joined in order. What shape must result?',['Use midpoint theorem in triangles sharing diagonal AC to show EF∥GH.','Use the other diagonal BD to show FG∥HE.','Two pairs of parallel opposite sides imply a parallelogram.'],'A parallelogram.')]]
]]
],{
lead:'Four-sided figures appear in roofs, bridges, tilings and mathematical proofs. Here you will derive the 360° angle sum, prove parallelogram properties and their converses, apply the triangle midpoint theorem, investigate medians and the centroid, and see why midpoint quadrilaterals and tilings have such consistent structures.',
mixed:[
['Mixed parallelogram proof','In ABCD, diagonals AC and BD bisect one another at O. Prove AB∥CD.',['AO=OC and BO=OD are given.','∠AOB=∠COD are vertically opposite.','By SAS, triangles AOB and COD are congruent.','Corresponding alternate interior angles imply AB∥CD.'],'AB is parallel to CD; similarly AD∥BC.'],
['Mixed centroid problem','A median of a triangle has length 21 cm. Find the segments into which the centroid divides it and show their ratio.',['Centroid divides vertex-to-midpoint median as 2:1.','Three equal ratio parts make 21 cm; one part=7 cm.','Vertex-to-centroid=14 cm and centroid-to-midpoint=7 cm.'],'14 cm and 7 cm (ratio 2:1).']
]});
})();