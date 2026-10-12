/* StudyAI | Ganita Manjari Part II (2026-27), Chapter 14
 * NCERT-based editorial reconciliation for iemh206.pdf.
 * Retains all existing leaf titles and progress keys; never marks AI output
 * as fully verified without human editorial review.
 */
(() => {
  'use strict';
  const title='Math of Space: Surface Area and Volume';
  const chapter=window.CBSE_CLASS9_MATH_FULL_NOTES?.[title];
  if(!chapter?._studyaiCompleteDepth)
    throw new Error('Chapter 14 revisions require the original authored teaching pages');
  if(chapter._studyaiCh14NcertReconciliationV1)return;
  const E=window.StudyAIClass9Depth?.example;
  if(typeof E!=='function')throw new Error('Chapter 14 depth example constructor missing');
  function section(name){
    const s=chapter.sections.find(x=>x.title===name);
    if(!s)throw new Error('Chapter 14 missing original section: '+name);
    return s;
  }
  function topic(group,name){
    const s=section(group).subtopics?.find(x=>x.title===name);
    if(!s)throw new Error('Chapter 14 missing original subtopic: '+name);
    return s;
  }
  function deepen(group,name,paragraphs,examples=[],formulas=[]){
    const t=topic(group,name);
    for(const p of paragraphs)if(!t.paragraphs.includes(p))t.paragraphs.push(p);
    t.examples=t.examples||[];
    for(const e of examples)if(!t.examples.some(x=>x.title===e.title))t.examples.push(e);
    t.formulas=t.formulas||[];
    for(const f of formulas)if(!t.formulas.includes(f))t.formulas.push(f);
  }
  function add(group,name,paragraphs,formulas,examples){
    const s=section(group);
    if(s.subtopics.some(x=>x.title===name))return;
    if(paragraphs.length<2||!examples.length)
      throw new Error('Chapter 14 added page needs substantial teaching and an example');
    s.subtopics.push({title:name,paragraphs,formulas,examples,bullets:[]});
  }

  deepen('Cuboids and cubes','Derive cuboid volume by unit cubes',[
    'Think of a pack of thin rectangular cards: each layer has base area l×w and stacking to height h fills volume lwh. A net unfolds the six faces into pairs with areas lw, wh and hl; hence TSA=2(lw+wh+hl). This explains why volume and covering area cannot be interchanged.',
    'The three different face areas meeting at a single cuboid corner are A₁=lw, A₂=wh and A₃=hl. Their product is (lw)(wh)(hl)=(lwh)²=V². Since edge lengths and volume are positive, V=√(A₁A₂A₃). This finds volume even when no individual edge is given.',
    'Equal volume need not mean equal wrapping material. A cube of side 6 cm has volume 216 cm³ and area 216 cm². A 9×6×4 cm cuboid has the same 216 cm³ capacity but area 228 cm². Among rectangular boxes of a fixed volume, the cube has the smallest surface area; that claim is not about all possible three-dimensional solids.'
  ],[
    E('Three corner faces determine volume',
      'Three mutually adjacent faces of a cuboid have areas 6 cm², 15 cm² and 10 cm². Find the volume.',[
      'Write A₁=lw, A₂=wh and A₃=hl.',
      'Multiply: A₁A₂A₃=(lwh)²=6×15×10=900 cm⁶.',
      'Take the positive square root: V=√900=30 cm³.'
    ],'30 cm³.'),
    E('Same volume, different packaging area',
      'Compare surface areas for a cube of side 6 cm and a 9×6×4 cm cuboid.',[
      'Cube: V=6³=216 cm³ and TSA=6×6²=216 cm².',
      'Cuboid: V=9×6×4=216 cm³.',
      'Cuboid: TSA=2(54+24+36)=228 cm².',
      'At equal capacity, the cuboid needs 12 cm² more material for its closed exterior.'
    ],'Cube: 216 cm²; cuboid: 228 cm².')
  ],['V=√(A₁A₂A₃), where A₁=lw, A₂=wh, A₃=hl']);

  deepen('Cuboids and cubes','Special case: a cube',[
    'When all dimensions grow by a factor k, length changes by k, area by k², and volume by k³. If a cube of side L is cut into k³ separate cubes of side L/k, the combined volume stays L³, but the total surface area of all loose pieces rises from 6L² to 6kL². Their combined surface-to-volume ratio grows by factor k. Faces that remain joined inside an intact block are not newly exposed.',
    'The ratio SA/V for one cube of side L is 6/L (with inverse-length units). This helps illustrate why smaller objects exchange substances across a greater surface area per unit volume. Real biological transport also depends on structure, membrane properties and other factors, so this geometric ratio is a model rather than a complete biological explanation.'
  ],[
    E('How much new surface does cutting create?',
      'A cube of side 4 cm is separated into 64 unit cubes. Compare total surface areas.',[
      'Original outside area is 6×4²=96 cm².',
      'Each unit cube has area 6×1²=6 cm².',
      'The 64 separated cubes have combined area 64×6=384 cm².',
      'The ratio is 384/96=4; the volume remains 64 cm³.'
    ],'384 cm² after cutting, four times the original 96 cm².')
  ],['Cube SA/V=6/L','After k equal subdivisions per edge: total loose-piece SA=6kL²']);

  add('Cuboids and cubes','Painted cubes: count corners, edges, faces and core',[
    'Paint all six outside faces of a cube, then cut every edge into n equal segments, making n³ smaller cubes. For integer n≥2, the eight corner cubes each touch three painted faces; 12(n−2) noncorner edge cubes each touch two; 6(n−2)² face-interior cubes each touch one; and (n−2)³ entirely interior cubes have no paint. Each small cube belongs to exactly one category.',
    'The categories add to n³. To count "at least two painted faces", add corners and noncorner edge cubes; do not accidentally include corners twice. For n=1 there is only one cube with six painted faces, so the four-category formulas require n≥2.'
  ],['n≥2: 8+12(n−2)+6(n−2)²+(n−2)³=n³'],[
    E('Painted 5×5×5 cube',
      'A 5 cm cube is painted outside and cut into 1 cm cubes. Count pieces with 3, 2, 1 and 0 painted faces.',[
      'There are 5³=125 unit cubes; n=5.',
      'Three painted faces: eight corner cubes.',
      'Two painted faces: 12(5−2)=36 edge cubes.',
      'One painted face: 6(5−2)²=54 face-interior cubes.',
      'No paint: (5−2)³=27 inner cubes; check 8+36+54+27=125.'
    ],'3 faces: 8; 2 faces: 36; 1 face: 54; 0 faces: 27.')
  ]);

  add('Cuboids and cubes','Integer-edged cuboids: prove you found every solution',[
    'Suppose a closed cuboid has positive integer edges l≤w≤h (in cm) and TSA=100 cm². Then lw+wh+hl=50. Because each of lw, wh and hl is at least l², we have 3l²≤50, so l can only be 1, 2, 3 or 4. This upper bound makes an exhaustive search possible.',
    'Rearrange the area equation into (l+w)(l+h)=50+l². For each possible l, seek factor pairs p≤q of 50+l² with p≥2l; then w=p−l and h=q−l. This systematically checks every integer cuboid up to reordering, rather than guessing plausible dimensions.'
  ],['lw+wh+hl=50','(l+w)(l+h)=50+l², with 1≤l≤w≤h'],[
    E('Every integer cuboid with surface area 100 cm²',
      'Find all positive-integer triples l≤w≤h giving total surface area 100 cm².',[
      'From 3l²≤50, test only l=1,2,3,4.',
      'l=1 gives (1+w)(1+h)=51; the only valid factor pair 3×17 gives (1,2,16).',
      'l=2 gives (2+w)(2+h)=54; the only valid factor pair 6×9 gives (2,4,7).',
      'l=3 gives 59, with no factor pair whose smaller factor is ≥6.',
      'l=4 gives 66, with no factor pair whose smaller factor is ≥8.',
      'Verify: 2(2+32+16)=100 and 2(8+28+14)=100 cm².'
    ],'Exactly two unordered triples: (1,2,16) and (2,4,7) cm.')
  ]);

  deepen('Right circular cylinders','A circle extended through height',[
    'An axis-aligned right circular cylinder fitted inside a cube of side a has the largest circular base that fits the square face: diameter a and radius a/2. With height a its volume is π(a/2)²a=πa³/4, which is the fraction π/4 (about 78.54%) of the cube volume. Be careful: a is the CUBE EDGE, not the cylinder radius.',
    'Cylinder volume varies as r²h. If radius changes to 1.1r while the volume is to remain unchanged, the new height must be h/(1.1)²=(100/121)h. The required decrease is 21/121 of the original height, or about 17.36%, not 10%. Keep π symbolic until the final numerical approximation.'
  ],[
    E('Cylinder fitted inside a cube',
      'An axis-aligned cylinder fits a cube of edge 14 cm with its base circle touching all four sides. Find the cylinder volume using π=22/7.',[
      'Its radius is 14/2=7 cm and its perpendicular height is 14 cm.',
      'V=πr²h=(22/7)×7²×14=2156 cm³.',
      'The cube volume is 14³=2744 cm³; the ratio is 11/14 using π=22/7.'
    ],'2156 cm³, approximately 78.57% of the cube with the stated π approximation.'),
    E('Increase cylinder radius without changing its volume',
      'Cylinder radius increases by 10%. What percentage must its height decrease to preserve volume?',[
      'Set πr²h=π(1.1r)²h_new and cancel nonzero πr².',
      'The new height is h/1.21=(100/121)h.',
      'The fraction lost is 1−100/121=21/121.',
      'As a percentage, 2100/121%=approximately 17.36%.'
    ],'The height must decrease by 2100/121%, about 17.36%.')
  ],['V_fitted cylinder=πa³/4 for a cube of side a']);

  deepen('Cones','Vertical height and slant height are different',[
    'Rotating a filled right triangle through 360° around one perpendicular side generates a right circular cone. The rotation axis is the perpendicular height h, the other leg is the radius r, and the hypotenuse is the slant height l. Baudhāyana–Pythagoras gives l²=h²+r².',
    'Cut along a slant edge and unroll the curved surface into a circle sector of radius l. Its arc length equals the base circumference 2πr. A full circle of radius l has circumference 2πl, so the sector occupies fraction r/l of the full area πl². Therefore CSA=(r/l)πl²=πrl. A closed cone adds its base πr². Volume uses perpendicular height h, not slant height l.'
  ],[
    E('Revolving a 5–12–13 triangle',
      'Rotate a right triangle with legs 5 cm and 12 cm about the 12 cm side. Find cone volume and curved area.',[
      'The axis of rotation gives height h=12 cm; the other leg gives radius r=5 cm.',
      'The hypotenuse is slant height l=13 cm; 5²+12²=13².',
      'Volume=(1/3)πr²h=(1/3)π×25×12=100π cm³.',
      'CSA=πrl=π×5×13=65π cm².'
    ],'Volume 100π cm³ and curved area 65π cm².')
  ],['Cone sector arc=2πr; full-circle circumference=2πl; fraction=r/l']);

  deepen('Cones','Cone volume and the one-third factor',[
    'For a conical cup with its pointed tip at the bottom, filling to half the perpendicular depth creates a smaller similar cone. All of its lengths, including radius, are half the full cup dimensions. Its volume is therefore (1/2)³=1/8 of total capacity, NOT half. The condition about measurement from the tip matters.',
    'The one-third factor in V=(1/3)πr²h is supported by the textbook experiment: a cone filled with grains three times fills a cylinder with identical base and height. The classroom demonstration illustrates the relationship; the exact geometric theorem does not depend on measurement error.'
  ],[E('A conical cup filled to half depth',
      'A conical cup points downward. Water reaches half the total height measured from its tip. What fraction is filled?',[
      'The water takes the form of a smaller similar cone at the tip.',
      'Its radius and height are both half those of the whole cup.',
      'Volume scales by the cube of the linear factor, giving (1/2)³=1/8.'
    ],'One-eighth of total capacity, or 12.5%.')]);

  deepen('Pyramids','Pyramid geometry and bases',[
    'The cone and a pyramid have the same volume pattern, V=(1/3)×base area×perpendicular height. The base of a pyramid is a planar polygon, such as a triangle or square; the height is measured perpendicular to the base plane even if the apex lies off-centre.',
    'Pyramid surface area is found by adding the actual exposed triangular side faces (and the base when present). You cannot generally substitute a single slant length into a formula for an irregular pyramid: its faces may have different altitudes.'
  ]);

  deepen('Spheres and hemispheres','A sphere is determined by its radius',[
    'Archimedes showed that a sphere of radius r has the same area as the CURVED side of its tight enclosing cylinder of radius r and height 2r. That cylindrical area is 2πr(2r)=4πr², giving the sphere-area formula. This identifies an exact equality, not merely an approximate agreement between two independently assumed formulas.',
    'With matching radius r and height 2r, a cone has volume (1/3)πr²(2r)=(2/3)πr³; the sphere has (4/3)πr³; the cylinder has πr²(2r)=2πr³. Their volumes are in the ratio cone:sphere:cylinder=1:2:3. Both the sphere volume AND its surface area are two-thirds of the total cylinder volume and total cylinder area, respectively, where the latter includes both bases.'
  ],[E('Archimedes’ cone–sphere–cylinder volume comparison',
    'A cone and cylinder each have base radius 3 cm and height 6 cm. A sphere between them has radius 3 cm. Compare their volumes.',[
    'Cone volume=(1/3)π×3²×6=18π cm³.',
    'Sphere volume=(4/3)π×3³=36π cm³.',
    'Cylinder volume=π×3²×6=54π cm³.',
    'Divide all three values by 18π: ratio=1:2:3.'
  ],'Cone:sphere:cylinder = 1:2:3.')],
  ['Sphere SA=curved area of enclosing cylinder=4πr²']);

  deepen('Spheres and hemispheres','Half a sphere: curved and total surface',[
    'Painting only the OUTSIDE curve of a hemispherical dome requires 2πr². A closed solid hemisphere has an additional planar base πr² and total area 3πr². Whether the flat base counts depends on the actual exposed or manufactured surface; being called a "dome" does not automatically mean its floor must be painted.'
  ]);

  add('Spheres and hemispheres','Packed spheres: calculate the liquid in the gaps',[
    'To calculate how much liquid fills the spaces around non-overlapping balls in a closed box, subtract the combined volume of the balls from the box interior volume. The packing must physically fit. Here 16 spheres of radius 2 cm have diameter 4 cm each; four fit along 16 cm and two fit along each 8 cm side, making 4×2×2=16.',
    'Use exact expressions for subtraction before approximating π. The box volume is 16×8×8=1024 cm³. Each sphere occupies (4/3)π(2³)=32π/3 cm³, so sixteen occupy 512π/3 cm³. Liquid fills the remaining 1024−512π/3 cm³, approximately 488 cm³. The walls and spheres are assumed rigid, and there are no gaps outside the box.'
  ],['V_liquid=V_box−ΣV_solids'],[
    E('Preservative around sixteen metal spheres',
      'A 16×8×8 cm box holds sixteen non-overlapping spheres of radius 2 cm. How much preservative is required to fill the space?',[
      'Each sphere diameter is 4 cm; a 4×2×2 arrangement fits exactly.',
      'Box interior volume: 16×8×8=1024 cm³.',
      'Sixteen sphere volumes: 16×(4/3)π×2³=512π/3 cm³.',
      'Subtract exactly: 1024−512π/3 cm³.',
      'Using π≈3.1416 gives 487.83 cm³, which rounds to 488 cm³.'
    ],'1024−512π/3 cm³, approximately 488 cm³.')
  ]);

  deepen('Estimation and units','Guesstimation with simple geometric models',[
    'To estimate ice-cream scoops from a 10×15×20 cm tub, first compute 3000 cm³ of available ice cream. Choose a plausible spherical scoop radius, use volume (4/3)πr³ per scoop, and divide. For a 3 cm radius, that gives 3000/(36π)≈26.5, so about 26 complete idealized scoops BEFORE accounting for air, waste, changes in scoop shape and packing. Estimation answers depend on stated assumptions.',
    'Guesstimates are not precise packing proofs. Spherical objects cannot fill a box without voids; a model based on dividing container capacity by one sphere volume ignores these gaps. In a real packing question use geometry and the given arrangement instead.'
  ],[E('Estimate scoop count from a cuboidal tub',
    'A 10×15×20 cm tub contains ice cream. Estimate 3 cm-radius spherical scoops and state assumptions.',[
      'Model tub capacity as 10×15×20=3000 cm³.',
      'Model each scoop as a sphere: (4/3)π×3³=36π cm³.',
      'Divide 3000/(36π)≈26.5.',
      'Estimate about 26 full scoops; practical scooping losses and non-spherical shapes change the result.'
  ],'About 26 idealized full scoops, subject to stated assumptions.')]);

  chapter._studyaiCh14NcertReconciliationV1=true;
  const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT?.[title];
  if(audit){
    const sections=chapter.sections;
    const topics=sections.flatMap(s=>s.subtopics||[]);
    audit.sections=sections.length;
    audit.subtopics=topics.length;
    audit.examples=sections.reduce((n,s)=>n+(s.examples||[]).length,0)+
      topics.reduce((n,s)=>n+(s.examples||[]).length,0);
    audit.paragraphs=sections.reduce((n,s)=>n+(s.paragraphs||[]).length,0)+
      topics.reduce((n,s)=>n+(s.paragraphs||[]).length,0);
    audit.words=[chapter.lead,...sections.flatMap(s=>
      [...(s.paragraphs||[]),...(s.subtopics||[]).flatMap(t=>
        [...(t.paragraphs||[]),...(t.formulas||[]),...(t.bullets||[])])]
    )].join(' ').trim().split(/\s+/).length;
    audit.reviewedSource='NCERT Ganita Manjari Part II (2026–27), Chapter 14, iemh206.pdf';
    audit.reviewStatus='NCERT-grounded editorial reconciliation draft; final human mathematical and diagram review outstanding';
  }
})();
