/* StudyAI | NCERT Ganita Manjari Grade 9 Part II, Chapter 14 (iemh206.pdf).
 * Reconciles an AI audit with the ACTUAL authored draft: cones, pyramids,
 * spheres, hemispheres, composites and units already existed.
 * Keep all original titles and leaf keys; only deepen and add real lessons.
 * A mathematical/content review is NOT an independently certified score.
 */
(() => {
  'use strict';
  const title='Math of Space: Surface Area and Volume';
  const ch=window.CBSE_CLASS9_MATH_FULL_NOTES?.[title];
  if(!ch?._studyaiCompleteDepth)throw new Error('Chapter 14 depth must load before NCERT corrections');
  if(ch._studyaiCh14NcertReconciliationV1)return;
  const E=window.StudyAIClass9Depth?.example;
  if(typeof E!=='function')throw new Error('Chapter 14 example schema not available');
  const section=name=>{
    const s=ch.sections.find(x=>x.title===name);
    if(!s?.subtopics)throw new Error('Chapter 14 missing authored lesson group '+name);
    return s;
  };
  const topic=(group,name)=>{
    const s=section(group).subtopics.find(x=>x.title===name);
    if(!s)throw new Error('Chapter 14 missing authored leaf '+name);
    return s;
  };
  const deepen=(group,name,paragraphs,examples=[])=>{
    const t=topic(group,name);
    for(const p of paragraphs)if(!t.paragraphs.includes(p))t.paragraphs.push(p);
    for(const e of examples)if(!t.examples.some(x=>x.title===e.title))t.examples.push(e);
  };
  const add=(group,name,paragraphs,formulas,examples)=>{
    const sec=section(group);
    if(sec.subtopics.some(x=>x.title===name))return;
    if(paragraphs.length<2 || !examples.length)throw Error('Missing depth for '+name);
    sec.subtopics.push({title:name,paragraphs,formulas,examples,bullets:[]});
  };

  // §14.1, p.125 and end exercises: adjacent face areas and bounded enumeration.
  deepen('Cuboids and cubes','Derive cuboid volume by unit cubes',[
    'The thin-playing-cards model makes the volume rule visible even without whole-number edge lengths: each cross-section has area lw, and stacking those layers through height h gives V=(lw)h. The NET of a closed cuboid has two faces each of area lw, wh and hl, hence TSA=2(lw+wh+hl).',
    'Equal capacity does not imply equal packaging material. A cube of side 6 cm and a cuboid 9 by 6 by 4 cm both hold 216 cm³, yet their closed surface areas are 216 cm² and 228 cm². The cube uses 12 cm² less material in this comparison.'
  ],[E('NCERT packaging comparison',
    'Compare the TSA of a cube of side 6 cm and cuboid 9 cm × 6 cm × 4 cm. Do they have equal volumes?',[
      'Cube: V=6³=216 cm³; TSA=6×6²=216 cm².',
      'Cuboid: V=9×6×4=216 cm³; TSA=2(54+24+36)=228 cm².',
      'The cuboid uses 228−216=12 cm² more covering material.'
    ],'Equal volume 216 cm³; cuboid TSA is 12 cm² greater.')]);

  add('Cuboids and cubes','Cuboids from three face areas and integer dimensions',[
    'Three mutually adjacent faces of a cuboid have areas A₁=lw, A₂=wh and A₃=hl. Their product is (lw)(wh)(hl)=(lwh)²=V². Since physical lengths are positive, V=√(A₁A₂A₃). This avoids solving for each edge separately.',
    'For integer edges with TSA=100 cm², write lw+wh+hl=50 and order the positive integers l≤w≤h. As 50≥3l², only l=1,2,3,4 are possible. Factoring (l+w)(l+h)=50+l² reduces the remaining search to valid factor pairs, proving an answer list is exhaustive rather than a guess.'
  ],['A₁A₂A₃=V²; V=√(A₁A₂A₃)','(l+w)(l+h)=50+l² for TSA=100 cm²'],[
    E('Volume from three corner faces','Three adjacent face areas are 6 cm², 15 cm² and 10 cm². Find the cuboid volume.',[
      'Multiply: A₁A₂A₃=6×15×10=900 cm⁶.',
      'Since V²=900 cm⁶, V=√900=30 cm³.'
    ],'30 cm³.'),
    E('All integer-sided cuboids with area 100','Find all unordered positive integer triples l,w,h with TSA=100 cm².',[
      'TSA=2(lw+wh+hl)=100, so lw+wh+hl=50. Assume l≤w≤h; 3l²≤50 gives l≤4.',
      'Rearrange to (l+w)(l+h)=50+l², with l+w≤l+h and l+w≥2l.',
      'For l=1, product 51 has admissible factor pair (3,17), giving (1,2,16).',
      'For l=2, product 54 has admissible factor pair (6,9), giving (2,4,7).',
      'For l=3, product 59 has no factor pair with both factors at least 6. For l=4, product 66 has none with both factors at least 8.',
      'Check: 1×2+2×16+16×1=50 and 2×4+4×7+7×2=50.'
    ],'Exactly two unordered triples: (1,2,16) cm and (2,4,7) cm.')
  ]);

  add('Cuboids and cubes','Painted cube counting and surface-to-volume scaling',[
    'Paint all six faces of an n×n×n cube (n≥2) BEFORE cutting it into unit cubes. Exactly 8 corner cubes have 3 painted faces; 12(n−2) edge-interior cubes have 2; 6(n−2)² face-interior cubes have 1; and (n−2)³ core cubes have none. These groups sum to n³. The newly exposed cut faces are NOT painted.',
    'A cube of edge L has SA=6L², V=L³, and SA/V=6/L. Subdivide it into k³ smaller cubes, each side L/k, and separate them: the total V stays L³, while the sum of their surface areas becomes k×6L². The increased exposed SA/V helps explain why size and shape matter for diffusion; real biological structures also depend on their membranes and transport mechanisms.'
  ],['3 faces: 8; 2 faces: 12(n−2); 1 face: 6(n−2)²; 0 faces: (n−2)³ (n≥2)','SA/V=6/L; separated k³ equal cubes: SA_total=k×SA_original'],[
    E('Count painted unit cubes','A 5 cm cube is painted on every outer face, then cut into 1 cm cubes. Find how many have exactly 3, 2, 1 and 0 painted faces.',[
      'n=5 unit cubes along each edge, so 125 cubes in all.',
      'Exactly three painted faces: eight corners = 8.',
      'Exactly two: 12(5−2)=36. Exactly one: 6(5−2)²=54.',
      'None: (5−2)³=27. Check 8+36+54+27=125.'
    ],'3 faces: 8; 2 faces: 36; 1 face: 54; 0 faces: 27.'),
    E('Why cutting exposes more area','Cut a cube of side 5 cm into 125 unit cubes and separate them. Compare surface areas.',[
      'Original cube surface area =6×5²=150 cm².',
      'Each separated 1 cm cube has area 6 cm². All 125 have 125×6=750 cm².',
      '750/150=5: total exposed area is multiplied by 5, while volume stays 125 cm³.'
    ],'Exposed area rises from 150 cm² to 750 cm²; factor 5.')
  ]);

  // §14.2 Ex 14.2: one inscribed cylinder, reciprocal area-based changes.
  add('Right circular cylinders','Inscribed cylinders and volume-preserving percentage changes',[
    'The standard cylinder inscribed vertically in a cube of side a has its circular base inscribed in a square face: its diameter is a, radius is a/2 and height is a. Its volume is π(a/2)²a=πa³/4, which is π/4≈78.54% of the cube volume. The size a is a DIAMETER here, not a cylinder radius.',
    'A cylinder has V=πr²h. If the radius is multiplied by 1.10, the same volume requires a height multiplier 1/(1.10)²=100/121. Hence the height DECREASE is 1−100/121=21/121 of the original, or 2100/121%≈17.36%, rather than 10% or 20%. A 10% rise in radius with unchanged height raises volume 21%, not 33.1%; 33.1% applies when ALL three dimensions of a 3D shape scale by 1.1.'
  ],['For cube edge a: V_inscribed cylinder=πa³/4','Fixed V: (r_new/r_old)²(h_new/h_old)=1'],[
    E('Largest standard inscribed cylinder','A right circular cylinder is inscribed with its axis perpendicular to a face of a cube of edge 14 cm. Find cylinder volume with π=22/7.',[
      'Base circle diameter=14 cm, so radius=7 cm and cylinder height=14 cm.',
      'V=πr²h=(22/7)×49×14=2156 cm³.',
      'Cube volume=14³=2744 cm³; ratio = π/4≈0.7854 (approximately).'
    ],'2156 cm³, approximately 78.5% of cube volume.'),
    E('Keep cylinder volume unchanged','A cylinder radius rises by 10%. What exact percentage decrease in height retains its volume?',[
      'Set r_new=1.1r and h_new=q h. Equal volumes give (1.1)²q=1.',
      'Solve q=1/1.21=100/121, so the decrease fraction is 1−100/121=21/121.',
      'Convert to percent: (21/121)×100%=2100/121%≈17.36%.'
    ],'Height must decrease by 2100/121%, about 17.36%.')
  ]);

  // §14.3, the source gives both a sector and a thin-sector derivation.
  deepen('Cones','Vertical height and slant height are different',[
    'Unfold the lateral surface of a right circular cone into a circular sector of radius l. The curved arc length is the cone base circumference 2πr, while a COMPLETE circle of radius l has circumference 2πl. The sector occupies fraction r/l of that circle, giving area (r/l)πl²=πrl. This derives the formula without mistaking the vertical height h for the slant length l.',
    'Rotating a right triangle about one of its perpendicular legs produces a cone: the rotation axis becomes h, the other leg becomes r and the hypotenuse becomes l. Pythagoras gives l²=h²+r². A 5-12-13 triangle rotated about the 12 cm leg gives r=5, h=12, l=13, volume 100π cm³ and curved area 65π cm².'
  ],[E('Rotating a right triangle','A right triangle with legs 5 cm and 12 cm is rotated around its 12 cm leg. Find cone CSA and volume.',[
    'Axis is the 12 cm leg: h=12 cm, r=5 cm; slant length l=√(12²+5²)=13 cm.',
    'CSA=πrl=π×5×13=65π cm².',
    'V=(1/3)πr²h=(1/3)π×25×12=100π cm³.'
  ],'CSA=65π cm² and volume=100π cm³.')]);

  deepen('Cones','Cone volume and the one-third factor',[
    'A cup shaped like a cone with its vertex at the bottom and filled to HALF its vertical depth contains a smaller, similar cone. Its radius and height are both half the full size; since volume scales with the CUBE of the linear scale, the water occupies (1/2)³=1/8 of the full cone capacity. This is NOT one-half of the volume.',
    'Retain π symbolically and substitute π≈22/7 or 3.14 only when the question directs or when a decimal is needed. Rounding at every intermediate calculation can accumulate error, especially in recasting or displacement problems.'
  ],[E('Half the water depth in a conical cup','A conical cup points downward. It is filled from its tip to half its vertical height. What fraction of full volume is water?',[
    'Cross-sections of the smaller and full cones are similar, so smaller r=R/2 and smaller h=H/2.',
    'The volume ratio is [(1/3)π(R/2)²(H/2)]/[(1/3)πR²H]=(1/2)³=1/8.'
  ],'One-eighth of the cup volume.')]);

  deepen('Pyramids','Pyramid geometry and bases',[
    'The base area B can belong to any polygonal pyramid. Picture a prism and pyramid with the SAME base B and perpendicular height h: the pyramid occupies one-third of the corresponding prism volume, V=(1/3)Bh. Lateral face altitudes are slant lengths, not the perpendicular height h required in this formula.',
    'NCERT also describes cones as circular-base analogues of pyramids, but the flat faces of an ordinary polygonal pyramid can be summed individually to obtain its total surface area. The simple lateral-area shortcut 2as applies only to a REGULAR square pyramid of base side a and equal face slant altitudes s.'
  ]);

  // §14.5 sphere-cylinder theorem is a separate assertion, not a proof by substitution.
  deepen('Spheres and hemispheres','A sphere is determined by its radius',[
    'A sphere is the SURFACE whose points lie exactly a distance r from the centre; a solid ball also includes its interior. Archimedes established the nontrivial result that a sphere of radius r has the SAME area as the curved side of its circumscribing cylinder of radius r and height 2r. That cylinder area is 2πr(2r)=4πr². Merely calculating the cylinder area is not itself a proof of the equality: the equality is the geometric theorem.',
    'For volume, imagine dividing the sphere surface into many tiny patches and joining each patch to its centre to make a thin pyramidal piece of height approximately r. The combined volume approaches (r/3)×sphere surface area=(r/3)×4πr²=4πr³/3. This is the textbook geometric visualization, not a claim that finitely many perfect cones tile a sphere.'
  ]);

  deepen('Spheres and hemispheres','Half a sphere: curved and total surface',[
    'With the same radius r, the enclosing cylinder has volume πr²(2r)=2πr³ and the sphere volume is (4/3)πr³, so the sphere has two-thirds the volume of that cylinder. A cone with the same circular radius r and the same height 2r has volume (2/3)πr³. The CONE:SPHERE:CYLINDER volume ratio is therefore 1:2:3. The cone in this comparison must have height 2r.',
    'For a hemispherical dome painted ONLY on its outside curve, choose 2πr². If its circular flat base is present and also exposed, total area is 3πr². In a capacity problem, use (2/3)πr³. First label whether the question asks for curved paint, all exposed material, or volume.'
  ],[E('Archimedes cone, sphere and cylinder ratio','A cone, a sphere and a cylinder share radius 3 cm, and the cone/cylinder heights are 6 cm. Compare their volumes.',[
    'Cone V=(1/3)π×3²×6=18π cm³.',
    'Sphere V=(4/3)π×3³=36π cm³.',
    'Cylinder V=π×3²×6=54π cm³.',
    'Divide 18π:36π:54π by 18π to get 1:2:3.'
  ],'Cone:sphere:cylinder volumes are 1:2:3.')]);

  // §14.4 and final problems: displacement and volume conservation.
  add('Spheres and hemispheres','Displacement when spheres fill a container',[
    'A liquid fills the space in a box NOT occupied by immersed solids. When all spheres fit without overlap and are completely inside, V_liquid=V_box−number×V_sphere, ignoring container-wall thickness. First check whether the proposed dimensions actually admit the advertised arrangement, then use cubic units consistently.',
    'For 16 spheres of diameter 4 cm in a 16×8×8 cm box, a 4×2×2 grid fits exactly. The box volume is 1024 cm³ and the spheres total (16×4π×2³/3)=512π/3 cm³, leaving 1024−512π/3≈487.835 cm³. Keep π exact until the final rounding. In a water-level rise problem, the displaced volume must equal the INCREASE in water-filled space, as long as the objects are fully submerged and no liquid spills.'
  ],['V_available=V_container−ΣV_nonoverlapping solids'],[
    E('Oil required between packed spheres','Sixteen solid spheres of radius 2 cm fit in a 16×8×8 cm box. How much oil fills all remaining space?',[
      'Diameters are 4 cm, and (16/4)(8/4)(8/4)=4×2×2=16 fit in a simple grid.',
      'Box volume is 16×8×8=1024 cm³.',
      'One sphere volume is (4/3)π×2³=32π/3 cm³, so all spheres occupy 512π/3 cm³.',
      'Oil volume=1024−512π/3 cm³≈487.8 cm³; nearest whole cm³ is 488.'
    ],'Exactly 1024−512π/3 cm³; approximately 488 cm³.')
  ]);

  deepen('Estimation and units','Reasonableness checks and formula choice',[
    'When a metal cube is melted to make cylindrical rods, conservation of volume uses the TOTAL original solid volume, not surface area. Divide by the volume of one rod to find how many complete rods can be cast; round DOWN to a whole number and report any remaining volume. For a 12 cm cube and rods of radius 2 cm and height 12 cm: 1728/(48π)=36/π≈11.46, hence only 11 full rods.',
    'NCERT end-of-chapter questions continue beyond 16: they also require estimation of chapati dough, objects and books, and a large-scale water-layer model. For such estimates state assumptions explicitly; do not invent precision the given measurements cannot support.'
  ],[E('Casting complete cylindrical rods','A metal cube of side 12 cm is recast into rods with radius 2 cm and length 12 cm. How many complete rods?',[
    'Total metal volume is 12³=1728 cm³.',
    'Each rod has V=π×2²×12=48π cm³.',
    '1728/(48π)=36/π≈11.46; only 11 full rods are possible. Remaining metal cannot form a twelfth rod.'
  ],'11 complete rods, assuming no losses in recasting.')]);

  ch._studyaiCh14NcertReconciliationV1=true;
  const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT?.[title];
  if(audit){
    const all=ch.sections.flatMap(s=>s.subtopics||[]);
    audit.sections=ch.sections.length;
    audit.subtopics=all.length;
    audit.examples=ch.sections.reduce((n,s)=>n+(s.examples||[]).length,0)
      +all.reduce((n,s)=>n+(s.examples||[]).length,0);
    audit.paragraphs=ch.sections.reduce((n,s)=>n+(s.paragraphs||[]).length,0)
      +all.reduce((n,s)=>n+(s.paragraphs||[]).length,0);
    audit.words=[ch.lead,...ch.sections.flatMap(s=>[
      ...(s.paragraphs||[]),...(s.subtopics||[]).flatMap(t=>
        [...(t.paragraphs||[]),...(t.formulas||[]),...(t.bullets||[])])
    ])].join(' ').trim().split(/\s+/).length;
    audit.reviewedSource='NCERT Ganita Manjari Grade 9 Part II, Chapter 14, iemh206.pdf';
    audit.reviewStatus='NCERT-grounded AI-audit reconciliation; independent human editorial review outstanding';
  }
})();
