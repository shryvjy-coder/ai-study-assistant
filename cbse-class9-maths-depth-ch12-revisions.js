/* NCERT Ganita Manjari Grade 9 (2026–27), Part II, Ch 12 (iemh204.pdf).
 * Evidence-based corrections to the original Chapter 12 teaching material.
 * Sources: §12.1 pp.52–55; §12.2 pp.56–60; §12.3 pp.61–68;
 * §12.4 pp.69–74; end-of-chapter pp.75–84.
 *
 * Do not replace existing subtopic titles: progress tracking persists their
 * chapter > group > leaf keys, so retaining authored names protects students.
 * This script is additive, idempotent and never claims an AI score is verified.
 */
(() => {
  'use strict';
  const chapter=window.CBSE_CLASS9_MATH_FULL_NOTES?.Quadrilaterals;
  if(!chapter || !chapter._studyaiCompleteDepth){
    throw new Error('StudyAI Chapter 12 audit requires the authored depth notes');
  }
  if(chapter._studyaiCh12NcertCorrectionsV1)return;
  const E=window.StudyAIClass9Depth?.example;
  if(typeof E!=='function')throw new Error('StudyAI depth example schema unavailable');
  const section=title=>{
    const item=chapter.sections.find(s=>s.title===title);
    if(!item)throw new Error('Missing Chapter 12 lesson group: '+title);
    return item;
  };
  const topic=(group,title)=>{
    const item=section(group).subtopics?.find(s=>s.title===title);
    if(!item)throw new Error('Missing Chapter 12 subtopic: '+title);
    return item;
  };
  const add=(group,title,paragraphs,formulas,examples,bullets=[],tip='',warning='')=>{
    const s=section(group);
    if(!Array.isArray(s.subtopics))s.subtopics=[];
    if(s.subtopics.some(x=>x.title===title))return;
    if(paragraphs.length<2||!examples.length)
      throw new Error('Every audited addition must teach and demonstrate: '+title);
    s.subtopics.push({title,paragraphs,formulas,examples,bullets,
      ...(tip?{tip}:{}),...(warning?{exam_warning:warning}:{})});
  };
  const elaborate=(group,title,paragraphs,examples)=>{
    const s=topic(group,title);
    for(const p of paragraphs){
      if(!s.paragraphs.includes(p))s.paragraphs.push(p);
    }
    for(const e of examples){
      if(!s.examples.some(x=>x.title===e.title))s.examples.push(e);
    }
  };
  // Definition 1 and Exercise 12.1: the distinction is geometric, not just
  // "has four line segments". Non-planar and crossing shapes are separately
  // discussed as extended objects, not ordinary planar quadrilaterals.
  add('Quadrilaterals and angle sum',
    'Which four-sided figures count as quadrilaterals?',[
      'In this chapter an ordinary quadrilateral ABCD has four distinct vertices in ONE plane, connected in the order AB, BC, CD, DA. No three vertices are collinear. Every boundary point other than the four vertices must belong to exactly one side. These requirements give a closed simple four-sided boundary.',
      'The textbook asks why NOPE (a collinear triple), SILY (overlapping sides), BENT (non-planar), CUTS (crossing sides) and OPENS (unclosed path) do not satisfy this definition. DART does satisfy it: an inward dent makes it concave, not invalid. Self-intersecting or spatial four-gons can be studied with different definitions, but not the ordinary planar angle-sum theorem.',
      'A diagonal joins opposite vertices, AC or BD. The order of letters matters: ABCD and DCBA describe the same boundary in reverse, while ACBD generally does not. A planar quadrilateral is convex exactly when its four internal angles are all less than 180°.'
    ],['Four distinct coplanar vertices; no three collinear; non-crossing closed boundary',
      'Convex: all interior angles less than 180°'],
    [E('Is a skew four-gon an ordinary quadrilateral?',
      'A=(0,0,0), B=(2,0,0), C=(2,2,1), D=(0,2,0). Do these four vertices form a planar quadrilateral?',[
        'The noncollinear points A, B and D lie in the plane z=0.',
        'Point C has z=1 and therefore is not in that plane.',
        'The four vertices are not coplanar, so the ordinary planar quadrilateral definition fails.'
      ],'No: it is a non-planar four-sided figure.')],
    ['A reflex interior angle is allowed in a simple concave quadrilateral.',
     'A self-intersection is not allowed under NCERT Definition 1.'],
    'Compare each example with Fig. 12.2 before applying the 360° angle-sum property.',
    'Four arbitrary points in three-dimensional space need not form a planar quadrilateral.');

  elaborate('Quadrilaterals and angle sum','Convex and concave quadrilaterals',[
    'For a concave ABCD whose reflex vertex is D, draw the diagonal DB that stays inside the quadrilateral. It partitions the interior into triangles ABD and BCD. Their combined triangle-angle sums are 180° + 180° = 360°, including the pieces of the reflex angle at D. A diagonal joining the other opposite pair may instead lie outside the figure, so choose the interior diagonal.',
    'Unlike a crossing bow-tie, the concave quadrilateral still has an unambiguous interior. This is why the same 360° angle-sum theorem applies to concave as well as convex simple quadrilaterals.'
  ],[E('Use the reflex angle correctly',
    'A concave quadrilateral has internal angles 210°, 55° and 45°. Find the fourth angle.',[
      'The angle sum is 360° even though one angle is reflex.',
      'Known angles total 210°+55°+45°=310°.',
      'The remaining angle is 360°−310°=50°.'
    ],'50°')]);

  // §12.2: explicitly show theorem direction vs converse; perpendicular
  // diagonals alone do not determine a rhombus, and equal ones not a rectangle.
  add('Parallelogram properties','Distinguish special shapes using valid diagonal tests',[
    'Within the family of parallelograms, four right angles identify a rectangle and four equal sides identify a rhombus. A square meets both definitions. For a parallelogram, equal diagonals imply a rectangle, perpendicular diagonals imply a rhombus, and both conditions together imply a square.',
    'The word “parallelogram” is essential in the converse statements. An isosceles trapezium can have equal diagonals without being a rectangle. A non-rhombus kite has perpendicular diagonals without being a rhombus. To prove a special shape, first establish a valid parallelogram test (both pairs of parallel sides, both pairs of equal opposite sides, one opposite pair equal AND parallel, or diagonals bisecting each other).'
  ],['Parallelogram + equal diagonals ⇒ rectangle',
    'Parallelogram + perpendicular diagonals ⇒ rhombus',
    'Parallelogram + both properties ⇒ square'],
  [E('Find the missing hypothesis',
    'A quadrilateral has two equal diagonals. Is this enough to call it a rectangle?',[
      'Equal diagonals are a necessary property of a rectangle, but not sufficient for an arbitrary quadrilateral.',
      'An isosceles trapezium has equal diagonals and can have angles other than 90°.',
      'If we also establish that the quadrilateral is a parallelogram, equal diagonals do imply a rectangle.'
    ],'No. First prove it is a parallelogram.')],
  ['Kites need not have diagonals that bisect EACH OTHER.',
   'Do not confuse a property with its converse.']);

  elaborate('Triangle midpoint theorem','Midpoint theorem and the factor one-half',[
    'Full construction proof (NCERT Theorem 6): let D and E be midpoints of AB and AC. Extend DE past E to F so that EF=DE and join CF. Triangles AED and CEF satisfy AE=CE, DE=EF and ∠AED=∠CEF (vertically opposite), so they are congruent by SAS. Thus AD=CF and ∠ADE=∠CFE, which gives DB∥CF because A,D,B are collinear.',
    'Since D is the midpoint of AB, DB=AD=CF. In quadrilateral DBCF, opposite sides DB and CF are equal AND parallel, so DBCF is a parallelogram. Hence DF∥BC and DF=BC. But DE=EF gives DF=2DE, proving DE∥BC and DE=BC/2. This uses only parallelogram tests and triangle congruence, without assuming Grade 10 similarity.'
  ],[E('Medial triangle perimeter and four congruent pieces',
    'In triangle ABC, midpoints of BC, CA, AB are D, E, F. AB=14 cm, BC=18 cm, CA=16 cm. Find the perimeter of DEF and show the four smaller triangles are congruent.',[
      'Midpoint theorem: DE=AB/2=7 cm, EF=BC/2=9 cm and FD=CA/2=8 cm.',
      'So perimeter(DEF)=7+9+8=24 cm, half of perimeter(ABC)=48 cm.',
      'Each of AFE, FBD, EDC and DEF has the same three side lengths 7,8,9 cm.',
      'By SSS, all four smaller triangles are mutually congruent.'
    ],'Perimeter 24 cm; all four smaller triangles are congruent by SSS.')]);

  elaborate('Triangle midpoint theorem','Converse midpoint theorem',[
    'Proof using uniqueness of parallels (NCERT Theorem 7): D is midpoint of AB. A line through D parallel to BC meets AC at E. Let M be the actual midpoint of AC. The Midpoint Theorem shows DM∥BC. There is only ONE line through D parallel to BC, so DM and DE are the same line. They meet AC at the same point, meaning M=E. Hence AE=EC.',
    'The converse also gives DE=BC/2 after establishing that E is the midpoint. The additional uniqueness argument matters: the statement and its converse are logically distinct, even when one is used to prove the other.'
  ],[E('Prove a third-side midpoint',
    'In triangle ABC, D is midpoint of AB. Line DE∥BC meets AC at E. AC is 26 cm and BC is 18 cm. Find AE, EC and DE.',[
      'By the converse midpoint theorem, E is the midpoint of AC.',
      'AE=EC=26/2=13 cm.',
      'Now both D and E are side midpoints, so DE=BC/2=9 cm.'
    ],'AE=EC=13 cm and DE=9 cm.')]);

  // NCERT Theorem 8: Gemini omitted it from the audit although it is core.
  elaborate('Medians and parallelogram reasoning','The centroid divides each median 2 to 1',[
    'Proof outline using only the Midpoint Theorem: in triangle ABC, let P and Q be midpoints of AB and AC. Medians CP and BQ intersect at M. Mark X halfway along BM and Y halfway along CM. Since P,Q are side midpoints, PQ∥BC and PQ=BC/2. In triangle MBC, XY∥BC and XY=BC/2. Therefore PQ∥XY and PQ=XY.',
    'Using the collinearity of P,M,C and Q,M,B with the equal parallel segments PQ and YX, triangles MPQ and MYX are congruent (ASA). Thus MQ=MX=XB and MP=MY=YC. It follows that BM:MQ=2:1 and CM:MP=2:1. Repeating the argument for the third median shows its intersection with BQ is the SAME unique 2:1 division point. Hence all three medians meet at the centroid and each is cut 2:1 from the vertex.'
  ],[E('Centroid as an exact ratio',
    'A median is 27 cm long. What are the distances from its vertex to the centroid and from the centroid to the opposite midpoint?',[
      'The centroid divides a median from the vertex in ratio 2:1.',
      'The entire median corresponds to three equal parts; one part is 27/3=9 cm.',
      'The vertex-to-centroid part has length 2×9=18 cm; the other is 9 cm.'
    ],'18 cm and 9 cm.')]);

  // §12.3, Exercise Set 12.3: strengthen existing proof rather than create
  // a duplicated "Varignon" overview.
  elaborate('Tiling with quadrilaterals','Midpoint quadrilaterals and Varignon’s theorem',[
    'Full proof (NCERT Theorem 9): let P,Q,R,S bisect AB,BC,CD,DA respectively. In triangles ABC and ADC the midpoint theorem gives PQ∥AC, SR∥AC and PQ=SR=AC/2. Thus one opposite pair of sides in PQRS is both equal and parallel. It is therefore a parallelogram. Applying the theorem to the triangles on diagonal BD also gives QR∥BD, PS∥BD, and QR=PS=BD/2.',
    'The Varignon perimeter is AC+BD, since two sides have length AC/2 and two have length BD/2. Its area is half that of the original simple quadrilateral. Exercise 13 asks about an exceptional degenerate case: when the original diagonals are parallel, the midpoint “parallelogram” collapses to a line segment, rather than a nondegenerate four-sided polygon. State the nondegeneracy assumption when classifying it as a rectangle, rhombus or square.'
  ],[E('Perimeter from original diagonals',
    'A nondegenerate quadrilateral has diagonals of lengths 26 cm and 34 cm. Find the four side lengths and perimeter of its midpoint parallelogram.',[
      'The two sides parallel to the 26 cm diagonal are each 26/2=13 cm.',
      'The two sides parallel to the 34 cm diagonal are each 34/2=17 cm.',
      'Perimeter=2×13+2×17=60 cm, also equal to 26+34.'
    ],'Sides 13 cm, 17 cm, 13 cm, 17 cm; perimeter 60 cm.')]);

  add('Tiling with quadrilaterals','Varignon rectangles, rhombuses and squares',[
    'Suppose the midpoint polygon PQRS is nondegenerate. Because PQ and RS are parallel to AC while QR and SP are parallel to BD, the angle between consecutive sides equals the angle between the ORIGINAL diagonals. If AC⊥BD, PQRS has a right angle and is a rectangle. If AC=BD, its consecutive sides have equal lengths, so it is a rhombus. If the diagonals are both equal and perpendicular, PQRS is a square.',
    'These are properties of the MIDPOINT quadrilateral, not direct classifications of the starting quadrilateral. For instance a rhombus has perpendicular diagonals, so its midpoint quadrilateral is a rectangle; an isosceles trapezium has equal diagonals, so its midpoint quadrilateral is a rhombus. Equal original diagonals alone do not make the original shape a rectangle.'
  ],['AC ⟂ BD ⇒ midpoint quadrilateral is a rectangle (nondegenerate)',
    'AC = BD ⇒ midpoint quadrilateral is a rhombus (nondegenerate)',
    'Both conditions ⇒ midpoint quadrilateral is a square'],
  [E('The midpoint quadrilateral of a rhombus',
    'ABCD is a rhombus and P,Q,R,S are side midpoints. Prove PQRS is a rectangle.',[
      'As a rhombus, ABCD has perpendicular diagonals AC and BD.',
      'By midpoint theorem, PQ∥AC and QR∥BD.',
      'So angle PQR is 90°. Varignon’s theorem also gives that PQRS is a parallelogram.',
      'A parallelogram with a right angle is a rectangle.'
    ],'PQRS is a rectangle.')],
  ['The area of a Varignon parallelogram is half the area of its source quadrilateral.',
   'NCERT Exercise Set 12.3 Q4–5 and end exercises explore these midpoint relationships.'],
  'Sketch original diagonals, then mark midpoint sides PARALLEL to them.',
  'Do not call the original quadrilateral a rectangle merely because its diagonals are equal.');

  // NCERT end-of-chapter Exercise 7 (p.77): trapezium median is a real
  // competence, but “kite” and “isosceles trapezium” are supplementary.
  add('Triangle midpoint theorem','Trapezium mid-segment: average of parallel bases',[
    'In a trapezium ABCD with AB∥CD, let E and F be the midpoints of the non-parallel sides AD and BC. Mark G as the midpoint of diagonal AC. In triangle ADC, EG joins two midpoints and is parallel to CD with EG=CD/2. In triangle ABC, GF joins two midpoints and is parallel to AB with GF=AB/2.',
    'Since AB∥CD, segments EG and GF lie on the unique parallel line through G, with G between E and F. Consequently E,G,F are collinear, EF∥AB∥CD, and EF=EG+GF=(AB+CD)/2. This proves the relationship rather than guessing it from the picture.'
  ],['EF∥AB∥CD', 'EF=(AB+CD)/2'],
  [E('NCERT-style trapezium median calculation',
    'In trapezium ABCD, AB∥CD, AB=22 cm, CD=14 cm. E and F are midpoints of AD and BC. Find EF and justify the formula.',[
      'Let G be the midpoint of diagonal AC.',
      'Triangle ADC gives EG∥CD and EG=14/2=7 cm.',
      'Triangle ABC gives GF∥AB and GF=22/2=11 cm.',
      'AB and CD are parallel, so E,G,F lie on one parallel line and EF=7+11=18 cm.'
    ],'EF=18 cm; EF is parallel to both bases.')],
  ['A trapezium in this NCERT exercise has a pair of parallel opposite sides.',
   'The base-average rule does not extend to an arbitrary quadrilateral.'],
  'This proof follows end-of-chapter Exercise 7 of iemh204.pdf.');

  elaborate('Tiling with quadrilaterals','Any quadrilateral can tile a plane',[
    'NCERT §12.4 gives an actual construction: take a simple quadrilateral, copy it and rotate a copy by 180° about the midpoint of a shared edge. The endpoints of that edge exchange places and the new copy fits edge to edge. Continue the same half-turn construction across exposed edges to produce the repeating arrangement described in Figs. 12.28–12.30.',
    'Four differently labelled corner angles of one quadrilateral add to 360° and can fit around a junction, but that angle sum ALONE is not a complete proof of a tiling of the entire plane. A global tiling must also show that the edge-matching construction extends consistently without leaving gaps or overlapping interiors. NCERT treats the detailed global proof as optional starred end exercise 23.',
    'This construction works with convex and with concave simple quadrilateral tiles. An experimental check can use labelled paper copies: verify each shared edge after a half-turn and check that the corner labels cycle through all four interior angles.'
  ],[E('Local junction versus global tiling proof',
    'A quadrilateral tile has interior angles 115°, 75°, 85°, 85°. Explain why these angles can meet locally, and what else is needed to prove a tiling.',[
      'The sum is 115+75+85+85=360°, one complete turn.',
      'Arrange four congruent copies so one of each corner meets at the vertex.',
      'Local angle fit is necessary, but an actual tiling also needs matching edges and a continuation that has no overlaps or unfilled regions.',
      'The textbook’s half-turn-around-side-midpoint construction supplies the repeating edge-matching procedure.'
    ],'The angles fit locally; a complete tiling argument also establishes consistent edge matching.')]);

  // Optional enrichment: useful for distinguishing counterexamples, but not
  // represented as a fabricated textbook §12.4 “special quadrilaterals” unit.
  add('Parallelogram properties','Optional enrichment: isosceles trapeziums and kites',[
    'This is a related quadrilateral classification extension, not a separate core section of the official 2026–27 Chapter 12. An isosceles trapezium has parallel bases and equal non-parallel sides. Its corresponding base angles and diagonals are equal. It need not be a parallelogram or a rectangle. “Trapezium” conventions differ internationally, so in each problem follow its stated parallel-side condition.',
    'A (non-rhombus) kite has two pairs of equal adjacent sides, for example AB=AD and CB=CD. Both A and C are equidistant from B and D, so they lie on the perpendicular bisector of BD. Thus AC is perpendicular to and bisects BD. In general BD does NOT bisect AC, so a kite need not be a rhombus. These examples show why diagonal conditions require careful hypotheses.'
  ],['Isosceles trapezium: equal legs ⇒ equal diagonals',
    'Kite AB=AD and CB=CD ⇒ AC⊥BD and BO=OD at their intersection'],
  [E('Midpoint quadrilateral of an isosceles trapezium',
    'ABCD is an isosceles trapezium with AB∥CD and AD=BC. Show that joining its consecutive side midpoints gives a rhombus.',[
      'Equal legs and base-angle properties make triangles ADC and BCD congruent by SAS, yielding AC=BD.',
      'Each side of the midpoint parallelogram is half the length of an original diagonal.',
      'Since AC=BD, all four sides of the midpoint parallelogram are equal.',
      'A parallelogram with four equal sides is a rhombus.'
    ],'The midpoint quadrilateral is a rhombus.')],
  ['A kite can have perpendicular diagonals without being a rhombus.',
   'An isosceles trapezium can have equal diagonals without being a rectangle.'],
  'Use these shapes as counterexamples to invalid converse statements.',
  'Do not confuse the symmetry diagonal of a kite with the diagonal it bisects.');

  // Existing reader and lesson-progress metadata must reflect the new leaves.
  chapter._studyaiCh12NcertCorrectionsV1=true;
  const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT?.Quadrilaterals;
  if(audit){
    const sections=chapter.sections,subtopics=sections.flatMap(s=>s.subtopics||[]);
    audit.sections=sections.length;
    audit.subtopics=subtopics.length;
    audit.examples=sections.reduce((n,s)=>n+(s.examples||[]).length,0)
      +subtopics.reduce((n,s)=>n+(s.examples||[]).length,0);
    audit.paragraphs=sections.reduce((n,s)=>n+(s.paragraphs||[]).length,0)
      +subtopics.reduce((n,s)=>n+(s.paragraphs||[]).length,0);
    audit.words=[chapter.lead,...sections.flatMap(s=>
      [...(s.paragraphs||[]),...(s.subtopics||[]).flatMap(t=>
        [...(t.paragraphs||[]),...(t.bullets||[]),...(t.formulas||[])])]
    )].join(' ').trim().split(/\s+/).length;
    audit.reviewedSource='NCERT Ganita Manjari Part II (2026–27), Chapter 12, iemh204.pdf';
    audit.reviewStatus='NCERT-grounded correction draft; human editorial review required';
  }
})();
