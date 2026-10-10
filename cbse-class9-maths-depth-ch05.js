/* Chapter 5 — I'm Up and Down, and Round and Round */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('I’m Up and Down, and Round and Round',[
['Circle vocabulary',[
['A circle is a locus, not a filled disc',[
'A locus is the set of all points on a plane that satisfy a stated condition. A circle is the locus of points at one fixed distance r from one fixed centre O. Every point on its circumference satisfies OP=r, and every point satisfying OP=r lies on the circle. The region inside the boundary is called a disc, not the circle itself; this distinction matters for arcs, chords and sectors.',
'A radius joins the centre to a point on the circumference; a diameter is a chord passing through the centre. It is the longest chord because it spans two radii on one straight line. A secant line crosses a circle at two points; a tangent touches it at one point.'
],['d=2r'],[E('Radius and diameter','A circle has diameter 18 cm. Determine its radius.',['A diameter consists of two equal radii.','r=d/2=18/2.'],'9 cm')]],
['Chords, arcs, sectors and segments',[
'A chord connects two distinct points on a circle. Those endpoints cut the circumference into two arcs. The shorter is the minor arc and the longer is the major arc, except that a diameter divides the circumference into semicircles.',
'A sector is bounded by two radii and the arc between their ends. A segment is bounded by a chord and its corresponding arc. Confusing these two regions causes errors in area and angle diagrams.'
],[],[E('Identify a region','A region is bounded by radii OA and OB and the minor arc AB. Name it.',['Two radii and their joining arc define a sector.','A segment would instead be bounded by chord AB and an arc.'],'Minor sector AOB.')]]
]],
['Symmetry and determining a circle',[
['Equal radii and reflective symmetry',[
'A circle is symmetric under reflection across every line passing through its centre. It also maps to itself under every rotation about its centre, because every circumference point remains at distance r.',
'An important consequence is that two radii OA and OB form an isosceles triangle OAB. Therefore its base angles at A and B are equal. This simple isosceles-triangle fact supports many proofs about chords and arcs.'
],['OA=OB=r','In triangle OAB, ∠OAB=∠ABO'],[E('Isosceles radii','In triangle OAB, OA=OB and ∠AOB=80°. Find each base angle.',['Triangle angle sum is 180°.','The two base angles are equal.','Each equals (180−80)/2.'],'50°')]],
['Locating the centre from chords',[
'A point is equidistant from distinct points A and B if and only if it lies on the perpendicular bisector of AB. One direction follows from equal-length radii and congruent triangles; the reverse follows because every point on the perpendicular bisector has equal distances to A and B. Thus the perpendicular bisector is the locus of all possible centres of circles through A and B.',
'Infinitely many circles pass through two distinct points A and B: choose any centre on the perpendicular bisector of AB, then use its distance from A as the radius. The smallest circle has centre at the midpoint of AB and radius AB/2. Any other centre on the bisector is farther from A, as Pythagoras shows.',
'For three non-collinear points A, B and C, the perpendicular bisectors of AB and AC intersect at exactly one point, the unique circle centre. No circle can pass through three distinct collinear points. To locate the centre of a drawn circle, construct the perpendicular bisectors of two different chords and use their intersection.'
],[],[E('Finding a centre','Two different chords AB and CD are drawn. How can you locate the circle centre?',['Construct the perpendicular bisector of AB.','Construct the perpendicular bisector of CD.','Both must pass through the centre, so their intersection determines it.'],'The intersection of the two perpendicular bisectors.'),
E('Why infinitely many circles pass through two points','Points A and B are 8 cm apart. Give the smallest possible radius of a circle through both and one different possible radius.',['Every centre lies on the perpendicular bisector of AB. The midpoint M is 4 cm from each point, so the smallest radius is 4 cm.','Choose another centre O on the perpendicular bisector with OM=3 cm.','Right triangle OMA has legs 3 cm and 4 cm, so OA=√(3²+4²)=5 cm.','The 5 cm circle also passes through B because OA=OB. More centres give more circles.'],'Smallest radius 4 cm; another possible radius 5 cm.')]]
]],
['Chords and the centre',[
['Why a line from the centre bisects a chord',[
'Let OM be perpendicular from circle centre O to chord AB, meeting it at M. Right triangles OMA and OMB have equal hypotenuses OA=OB and common leg OM.',
'By the right-angle–hypotenuse–side congruence criterion, the triangles are congruent. Hence AM=MB. So the perpendicular from the centre to a chord bisects that chord. The converse follows by comparing the same triangles: the segment joining the centre to a chord midpoint is perpendicular to the chord.'
],['OA=OB, ∠OMA=∠OMB=90° ⇒ AM=MB'],[E('Half of a chord','A 24 cm chord is bisected by a perpendicular from the centre. Find each half.',['The perpendicular from O meets the chord at its midpoint.','Each half is 24/2.'],'12 cm')]],
['Chord length and distance from the centre',[
'Draw the perpendicular OM from the centre of a circle of radius r to a chord AB. By the preceding theorem, AM=AB/2. The right triangle OMA gives OM²+AM²=r².',
'Therefore a chord at distance d from the centre has length 2√(r²−d²). As d decreases, the square-root expression increases. This algebra explains why chords closer to the centre are longer, and the longest chord passes through the centre where d=0.'
],['AB=2√(r²−d²), 0≤d≤r'],[E('Exact chord length','A circle has radius 13 cm and a chord is 5 cm from the centre. Find the chord length.',['Draw perpendicular OM to chord AB, so AM=AB/2.','AM²=13²−5²=169−25=144.','AM=12 cm, so AB=24 cm.'],'24 cm')]]
]],
['Equal chords and distance from the centre',[
['Equal chords stand at equal central distances',[
'In one circle, suppose AB and CD are equal chords. The perpendiculars from the centre bisect both chords, so their half-lengths match. Their associated right triangles have the same hypotenuse r and an equal half-chord leg.',
'The remaining perpendicular distances must therefore be equal by Pythagoras or congruence. Conversely, chords equidistant from the centre have equal half-lengths and hence equal total lengths.'
],[],[E('Compare chord distances','Two equal chords lie in a circle of radius 10 cm. One is 6 cm from the centre. Find the other distance.',['Equal chords are equidistant from the centre.','The first perpendicular distance is 6 cm.'],'6 cm')]],
['Avoiding a visual theorem mistake',[
'A diagram can show two chords looking equal while exact measurements differ. To prove equal chords, use a valid theorem: equal distances from the centre, equal angles at the centre or an appropriate triangle congruence argument.',
'When two circles have different radii, equal chord lengths do not imply equal distances from their different centres. The standard chord theorem compares chords of the same circle or of congruent circles.'
],[],[E('Determine the assumption','A 12 cm chord is 5 cm from the centre of Circle A. Must it be 5 cm from the centre of any other circle?',['Distance also depends on the radius.','Different circles can have different radii and therefore different perpendicular distances for equal chord lengths.'],'No. The equal-chord distance theorem requires the same circle or congruent circles.')]]
]],
['Angles subtended by arcs and chords',[
['Angle at centre versus angle at circumference',[
'For an arc AB, let O be the centre and C a point on the opposite arc. The central angle ∠AOB is twice the angle ∠ACB subtended by that same arc, provided the angles refer to the same arc and the ordinary minor/major interpretation is used correctly.',
'The result follows by joining O to A, B and C, forming isosceles triangles, then using the exterior-angle theorem. This proof explains why the angle at the circumference is half the corresponding central angle.'
],['∠AOB=2∠ACB for the same arc AB'],[E('Angle on the circumference','An arc subtends a central angle of 124°. Find its corresponding angle at the circumference.',['The angle at the circumference is half the central angle for the same arc.','124°/2=62°.'],'62°')]],
['Angles in the same segment',[
'If points C and D lie on the same arc relative to chord AB, the angles ∠ACB and ∠ADB subtend the same chord and same opposite arc. Each equals half the relevant central angle, so they are equal.',
'Do not apply this theorem to vertices on opposite sides of AB without checking the arcs. The subtended angles may then be supplementary rather than equal.'
],['∠ACB=∠ADB when C,D belong to the same segment'],[E('Find another angle','A chord AB subtends ∠ACB=37°. Point D lies in the same segment of the circle. Find ∠ADB.',['Both angles intercept the same arc AB.','Angles in the same segment are equal.'],'37°')]],
['Angle subtended by a diameter',[
'A diameter AB subtends a semicircle, whose central angle measures 180°. Any angle ACB on the other semicircle is half this angle, or 90°. Hence a triangle drawn inside a semicircle with a diameter as one side is right-angled at the opposite vertex.',
'The converse can help identify a diameter: if angle ACB is a right angle and A,B,C lie on a circle, then AB passes through the centre. Always state the circular setting rather than assuming every right triangle is shown on a particular circle.'
],['Angle in a semicircle =90°'],[E('Pythagoras from a diameter','AB is a diameter of length 10 cm and C lies on the circle. If AC=6 cm, find BC.',['∠ACB=90° because AB is a diameter.','Pythagoras gives BC²=10²−6²=100−36=64.','Take positive root.'],'BC=8 cm')]]
]],
['Concyclic points and cyclic quadrilaterals',[
['Opposite angles of a cyclic quadrilateral',[
'A quadrilateral is cyclic if its four vertices lie on one circle. Consider opposite angles ∠A and ∠C. They subtend complementary arcs whose central measures add to 360°. Each inscribed angle measures half its intercepted arc.',
'Therefore ∠A+∠C=180°. Similarly ∠B+∠D=180°. The converse is also useful: if a pair of opposite angles of a quadrilateral is supplementary, the quadrilateral is cyclic.'
],['∠A+∠C=180°','∠B+∠D=180°'],[E('Missing cyclic angle','In cyclic ABCD, ∠A=72° and ∠B=105°. Find the other angles.',['Opposite ∠C is 180−72=108°.','Opposite ∠D is 180−105=75°.'],'∠C=108°, ∠D=75°')]],
['An exterior angle and the opposite interior angle',[
'Extend one side of a cyclic quadrilateral. The exterior angle and its adjacent interior angle sum to 180° because they form a straight angle. Since opposite interior angles are supplementary, the exterior angle equals the interior angle at the opposite vertex.',
'In proofs, write both supplementary relationships before concluding equality. A sketch alone cannot replace reasoning, especially if the quadrilateral is not drawn to scale.'
],[],[E('Exterior angle theorem','An exterior angle at A of cyclic ABCD is 112°. Find the interior angle C opposite A.',['The interior angle A is 180−112=68°.','In a cyclic quadrilateral ∠A+∠C=180°.','Therefore ∠C=112°.'],'112°')]]
]]
],{
lead:'Circles look simple but hide a web of exact geometric relationships. These notes build their vocabulary and symmetries, derive chord theorems using congruent triangles, and explain central and inscribed angles through isosceles triangles. Each theorem is paired with diagrams or construction steps and carefully justified exam applications.',
mixed:[
['Mixed circle problem','A circle of radius 10 cm has chord AB=16 cm. Find its perpendicular distance from the centre and decide whether it is a diameter.',['The perpendicular from O bisects AB at M, giving AM=8 cm.','Right triangle OMA gives OM²=10²−8²=36.','OM=6 cm, which is nonzero, so chord AB does not pass through the centre.'],'Distance=6 cm; not a diameter.'],
['Mixed cyclic quadrilateral','In a cyclic quadrilateral, ∠A=3x+12 and ∠C=5x−8. Find x and both angles.',['Opposite cyclic angles are supplementary.','(3x+12)+(5x−8)=180 ⇒ 8x+4=180.','8x=176, so x=22.','∠A=78° and ∠C=102°; verify sum 180°.'],'x=22, ∠A=78°, ∠C=102°.']
]});
})();