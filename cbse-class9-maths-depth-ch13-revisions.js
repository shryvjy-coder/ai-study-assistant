/* StudyAI | Ganita Manjari Class 9 Part II, Chapter 13
 * Reconciles the manual Gemini report with the real, already substantial
 * protected-branch chapter. Does not mark editorial review as verified.
 * Preserve original titles and completion keys; add only necessary leaves.
 */
(() => {
  'use strict';
  const chapter=window.CBSE_CLASS9_MATH_FULL_NOTES?.['Two Variables, One Line'];
  if(!chapter?._studyaiCompleteDepth)
    throw new Error('Chapter 13 NCERT corrections require the original authored depth notes');
  if(chapter._studyaiCh13NcertReconciliationV1)return;
  const E=window.StudyAIClass9Depth?.example;
  if(typeof E!=='function')throw new Error('Missing chapter depth example constructor');

  const section=name=>{
    const item=chapter.sections.find(s=>s.title===name);
    if(!item)throw new Error('Expected original Chapter 13 lesson group: '+name);
    return item;
  };
  const topic=(group,name)=>{
    const item=section(group).subtopics?.find(x=>x.title===name);
    if(!item)throw new Error('Expected original Chapter 13 learning page: '+name);
    return item;
  };
  const deepen=(group,name,paragraphs,examples=[])=>{
    const s=topic(group,name);
    for(const p of paragraphs)if(!s.paragraphs.includes(p))s.paragraphs.push(p);
    for(const example of examples)
      if(!s.examples.some(x=>x.title===example.title))s.examples.push(example);
  };
  const add=(group,name,paragraphs,formulas,examples,bullets=[],tip='',warning='')=>{
    const s=section(group);
    if(s.subtopics.some(x=>x.title===name))return;
    if(paragraphs.length<2||!examples.length)throw Error('Incomplete Chapter 13 page: '+name);
    s.subtopics.push({title:name,paragraphs,formulas,examples,bullets,
      ...(tip?{tip}:{}),...(warning?{exam_warning:warning}:{})});
  };

  deepen('Linear equations in two variables',
    'Two unknowns give a whole family of solutions',[
      'In standard form ax+by+c=0, the coefficients a, b and c are real and a²+b²≠0. This ensures at least one variable actually occurs. Equations 0x+0y=0 and 0x+0y=5 are respectively always true and impossible, rather than equations of a single straight line. One coefficient may be zero: x=4 and y=−3 are valid vertical and horizontal lines.',
      'Translate a story by naming each unknown with units, multiplying rate by quantity, and adding the relevant costs. If mangoes cost ₹60/kg and bananas ₹50/kg, paying ₹280 gives 60x+50y=280 for x and y measured in kilograms. Nonnegative amounts are sensible in this situation, even though the mathematical line also has solutions outside that real-world domain.'
    ],[
      E('Create a line from a purchase','Mangoes cost ₹60/kg and bananas ₹50/kg. The total cost is ₹280. Write a linear equation, and verify that (3,2) is a solution.',[
        'Let x and y be kilograms of mangoes and bananas. Total cost is 60x+50y.',
        'The condition gives 60x+50y=280.',
        'For (3,2), 60(3)+50(2)=180+100=280. Both quantities are nonnegative.'
      ],'60x+50y=280; (3,2) satisfies it.')
    ]);

  deepen('Linear equations in two variables',
    'Equivalent forms of the same equation',[
      'Why scalar multiplication preserves the entire solution set: take a nonzero real k. If (u,v) satisfies ax+by=c, multiplying gives (ka)u+(kb)v=kc. Conversely, if (u,v) satisfies kax+kby=kc, divide by nonzero k to recover au+bv=c. Hence the two equations have exactly the same points. Multiplication by zero is not reversible and can turn a genuine line into 0=0.',
      'Origin-pass test: the origin (0,0) satisfies ax+by+c=0 exactly when a(0)+b(0)+c=0, which is equivalent to c=0. Both implications follow by substitution, provided a²+b²≠0 so the equation represents a genuine line. The constant term refers to the STANDARD form ax+by+c=0, not to the intercept d in y=mx+d until the forms have been aligned.'
    ],[
      E('Prove whether the origin lies on a line','Do 3x−7y=0 and 6x−14y=0 describe the same line? Do they contain the origin?',[
        'The second equation is exactly twice the first, with nonzero multiplier 2.',
        'Dividing the second equation by 2 recovers the first, so the two solution sets are identical.',
        'Substitute (0,0) into either equation: 0=0. Both lines pass through the origin.'
      ],'The equations represent the same line and both contain (0,0).')
    ]);

  deepen('Generating and graphing solutions',
    'Intercepts and physical interpretation',[
      'The two-intercept method needs care: if a line passes through the origin, its x- and y-intercepts may be the SAME point (0,0), so they do not give two distinct plotting points. Find a second point by assigning a nonzero coordinate. For x=k the x-intercept exists but there is no y-intercept unless k=0; for y=k the reverse applies unless k=0.',
      'A graph consists of every point satisfying the equation, not merely the plotted sample points. In a word problem, restrict attention to the allowed domain, for example a nonnegative distance or a whole-number ticket count. A line can extend through quadrants that are not physically meaningful for that context.'
    ]);

  deepen('Slope','Slope measures vertical change per horizontal change',[
      'The slope (y₂−y₁)/(x₂−x₁) is defined only when x₂≠x₁. If x₂=x₁, the two distinct points lie on a vertical line x=k and the horizontal run is zero. Division by zero is undefined, not zero or infinity. A horizontal line y=k instead has zero vertical rise and slope 0.',
      'Slope is independent of the two chosen distinct points on a nonvertical line. In y=mx+d, subtract the equations y₂=mx₂+d and y₁=mx₁+d to obtain y₂−y₁=m(x₂−x₁), hence (y₂−y₁)/(x₂−x₁)=m. For ax+by+c=0 with b≠0, isolate y=−(a/b)x−c/b. If b=0, the line is vertical and this rearrangement is invalid.'
    ],[
      E('Why vertical slope is undefined','Find the slope of the line passing through (4,1) and (4,9).',[
        'Rise=9−1=8 and run=4−4=0.',
        'The calculation would require 8/0, which is undefined.',
        'Both points have x-coordinate 4, so the line is x=4.'
      ],'Vertical line x=4; its slope is undefined.')
    ]);

  deepen('Slope','Rate of change and units',[
      'Slope in a physical setting compares VERTICAL RISE with HORIZONTAL RUN, not the slanted distance along a ramp. If an exercise specifies a maximum rise-to-run ratio of 1:12, a rise of 30 cm needs a horizontal run of at least 30×12=360 cm. The straight-line profile at exactly that ratio can be written y=x/12 if both axes use the same length unit.',
      'The 1:12 figure here is a mathematical design condition GIVEN BY THE EXERCISE, not a claim that one rule governs every location and ramp. Actual accessibility requirements depend on the applicable building code, landings, handrails and other constraints.'
    ],[
      E('A ramp with a stated 1:12 slope limit','A problem specifies at most 1 cm rise per 12 cm horizontal run. A ramp rises 30 cm. Find its minimum horizontal run and an equation for the profile starting at (0,0).',[
        'Let R be the horizontal run in centimetres. The condition is 30/R≤1/12.',
        'For positive R, multiply both sides by 12R to get 360≤R.',
        'At the limiting gradient, R=360 cm=3.6 m. A coordinate model is y=x/12 or x−12y=0.'
      ],'Minimum horizontal run 360 cm; limiting profile y=x/12.')
    ]);

  deepen('Slope','Slope of parallel and perpendicular lines',[
      'For distinct, nonvertical lines y=m₁x+d₁ and y=m₂x+d₂, equal slopes and different intercepts mean they never meet. Subtracting the two equations when m₁=m₂ leaves 0=d₂−d₁, a contradiction if the intercepts differ. Equal slopes AND equal intercepts instead describe the same line.',
      'The perpendicular slope-product identity is optional later-study enrichment, not required for the core learning goals of this chapter. For solving simultaneous linear systems, concentrate on comparing the equations and identifying one, zero or infinitely many common solutions.'
    ]);

  deepen('Pairs of linear equations','Two constraints can pinpoint one pair',[
      'A pair of equations describes TWO conditions that must both hold. A common ordered pair is a solution only after it satisfies both original equations. Geometrically it lies at the intersection of their solution lines. Two independent conditions can intersect once, but a pair may also be inconsistent or describe a repeated condition.'
    ]);

  add('Pairs of linear equations','Forming simultaneous equations from real situations',[
      'Many problems contain two unknowns and two different kinds of information. For ticket sales, one equation counts tickets and another totals revenue. If x is the number of ₹120 tickets and y the number of ₹60 tickets, 150 sales worth ₹12,600 give x+y=150 and 120x+60y=12600. The variables must be nonnegative whole numbers, and both equations must hold.',
      'Fixed-plus-variable charges work similarly: total cost = initial fee + (rate per unit)×number of units. The first three days of a lending-library plan might cost a fixed amount, with only additional days charged per day. Write extra days as (d−3) when d>3, not d. Use separate unknowns for the fixed fee and daily rate if two bills are given.'
    ],['Ticket count: x+y=number sold','Revenue: p₁x+p₂y=total received',
      'Fixed charge model: total=fixed fee+rate×usage'],
    [E('Solve count and revenue together','A school sells 150 tickets, adult tickets ₹120 and student tickets ₹60. Total takings are ₹12,600. Find both counts.',[
      'Let x be adult tickets and y be student tickets: x+y=150 and 120x+60y=12600.',
      'Divide the revenue equation by 60 to obtain 2x+y=210.',
      'Subtract x+y=150, giving x=60 and y=90.',
      'Check: 60+90=150 and 120(60)+60(90)=7200+5400=12600.'
    ],'60 adult and 90 student tickets.'),
    E('Library fee with days beyond a fixed period','A library charges fixed fee f for up to 3 days and r for each extra day. Bills for 5 and 8 days are ₹44 and ₹74. Find f and r, then the cost for 10 days.',[
      'A 5-day rental has two extra days: f+2r=44.',
      'An 8-day rental has five extra days: f+5r=74.',
      'Subtract: 3r=30, so r=₹10. Then f=44−20=₹24.',
      'For 10 days, seven are extra: 24+7(10)=₹94.'
    ],'Fixed fee ₹24, additional-day rate ₹10; 10-day cost ₹94.')],
    ['Define variables including units before writing equations.',
      'Count problems require whole-number answers, even if the line has other real solutions.']);

  deepen('Pairs of linear equations','Substitution method with full checks',[
      'For a fractional result, keep exact fractions instead of rounding midway. To solve 3x+2y=13 and x−4y=−5, write x=4y−5. Then 3(4y−5)+2y=13 gives 14y=28, so y=2 and x=3. Both substitutions, 3(3)+2(2)=13 and 3−4(2)=−5, are essential checks.',
      'If rearrangement requires dividing by a parameter, first check whether that parameter is zero. If substitution reduces a system to 0=0, investigate infinitely many solutions; if it reduces to an impossible statement such as 0=5, report no solution rather than inventing coordinates.'
    ]);

  deepen('Pairs of linear equations','Elimination method',[
      'Make the target variable coefficients opposite by multiplying the ENTIRE equations by appropriate nonzero factors. When combining, include every term and the right-hand side. In a taxi problem x+10y=135 and x+18y=225, subtract the former from the latter to obtain 8y=90, so y=₹11.25/km; then x=₹22.50. A 25 km trip costs 22.50+25(11.25)=₹303.75.'
    ],[
      E('Taxi fare by elimination','A taxi costs ₹135 for 10 km and ₹225 for 18 km under one fixed-fee-plus-rate scheme. Find its fees and its charge for 25 km.',[
        'Let x be fixed rupee fee and y rupees per kilometre: x+10y=135, x+18y=225.',
        'Subtract: 8y=90, so y=11.25.',
        'x=135−10(11.25)=22.50. Check x+18y=22.50+202.50=225.',
        'For 25 km, fee=22.50+25(11.25)=₹303.75.'
      ],'Fixed ₹22.50, rate ₹11.25/km, 25 km charge ₹303.75.')
    ]);

  add('Pairs of linear equations','A shortcut for symmetric coefficient pairs',[
      'If the equations are ax+by=c and bx+ay=d, adding produces (a+b)(x+y)=c+d while subtracting produces (a−b)(x−y)=c−d. Provided a+b≠0 and a−b≠0, find x+y and x−y, then solve x=[(x+y)+(x−y)]/2 and y=[(x+y)−(x−y)]/2. This is ordinary elimination arranged to exploit matching coefficients.',
      'Do not divide by a+b or a−b if either is zero. When a=b the equations have the same left-hand side, so they are coincident if c=d, otherwise inconsistent. When a=−b, their left-hand sides are negatives, so the pair has infinitely many solutions if d=−c, otherwise none. In these special cases, the shortcut does not produce a unique ordered pair.'
    ],['(a+b)(x+y)=c+d','(a−b)(x−y)=c−d',
      'Unique-solution shortcut requires a+b≠0 and a−b≠0'],
    [E('Swapped coefficients without large multipliers','Solve 37x+23y=143 and 23x+37y=97.',[
      'Add equations: 60(x+y)=240, so x+y=4.',
      'Subtract second from first: 14(x−y)=46, so x−y=23/7.',
      'Then x=(4+23/7)/2=51/14 and y=(4−23/7)/2=5/14.',
      'Check: 37(51/14)+23(5/14)=2002/14=143; 23(51/14)+37(5/14)=1358/14=97.'
    ],'x=51/14 and y=5/14.'),
    E('When the shortcut cannot divide','Classify 5x+5y=12 and 5x+5y=13.',[
      'The two equations have the same left-hand side.',
      'Subtract them: 0=−1, an impossibility.',
      'Here a=b=5 so a−b=0; dividing by it would be invalid.'
    ],'No solution.')],
    ['Look for swapped coefficients before multiplying by large numbers.'],
    'This is an elimination shortcut, not a separate rule that works when a=±b.');

  deepen('Graphical meaning of a pair','Intersecting, parallel or coincident lines',[
      'Use a zero-safe coefficient test. Write both equations a₁x+b₁y+c₁=0 and a₂x+b₂y+c₂=0, with each pair (aᵢ,bᵢ) not both zero. Set Δ=a₁b₂−a₂b₁. If Δ≠0, elimination gives exactly one intersection. If Δ=0, the coefficient vectors are proportional, so compare the constants: the lines coincide exactly when a₁c₂−a₂c₁=0 AND b₁c₂−b₂c₁=0. Otherwise they are distinct parallel lines, with no shared solution.',
      'When every denominator is nonzero, these become the familiar textbook ratio cases: a₁/a₂≠b₁/b₂ means one solution; a₁/a₂=b₁/b₂≠c₁/c₂ means no solution; and all three ratios equal means infinitely many. Cross-products are safer for vertical lines, zero constants or zero coefficients, where some ratios are undefined.',
      'The slope-only proof needs b₁≠0 and b₂≠0, since only then can both equations be written y=mx+d. The determinant test also handles x=2 and x=3: those lines are distinct vertical parallels even though neither has numerical slope.'
    ],[
      E('Classify all three coefficient cases','Classify (a) 4x−6y=9 and 2x−3y=7, (b) 3x+2y=11 and 9x+6y=33, (c) 5x−2y=8 and 3x+4y=12.',[
        '(a) Coefficients are proportional by 2, but constants 9 and 7 are not. The lines are distinct parallels: no solution.',
        '(b) Multiply the first equation by 3 to obtain exactly the second. Coincident lines give infinitely many solutions.',
        '(c) Δ=5×4−3×(−2)=26≠0. The lines intersect at exactly one solution.'
      ],'(a) none; (b) infinitely many; (c) exactly one.')
    ]);

  deepen('Graphical meaning of a pair','Check dependent and inconsistent equations',[
      'Graphically, one common crossing corresponds to one ordered-pair answer, two distinct parallel lines to none, and one repeated line to infinitely many. Checking the drawing is helpful, but a rough sketch cannot establish that lines never meet far away. Confirm the classification algebraically.',
      'When ratios are used, keep both equations in the same standard form before comparing signed coefficients. A zero constant is legal: x+y=0 and 2x+2y=0 coincide, but c₁/c₂ would be 0/0 and cannot be evaluated. Prefer cross-products in such cases.'
    ]);

  chapter._studyaiCh13NcertReconciliationV1=true;
  const audit=window.STUDYAI_CLASS9_DEPTH_AUDIT?.['Two Variables, One Line'];
  if(audit){
    const sections=chapter.sections, all=sections.flatMap(s=>s.subtopics||[]);
    audit.sections=sections.length;
    audit.subtopics=all.length;
    audit.examples=sections.reduce((n,s)=>n+(s.examples||[]).length,0)
      +all.reduce((n,s)=>n+(s.examples||[]).length,0);
    audit.paragraphs=sections.reduce((n,s)=>n+(s.paragraphs||[]).length,0)
      +all.reduce((n,s)=>n+(s.paragraphs||[]).length,0);
    audit.words=[chapter.lead,...sections.flatMap(s=>[
      ...(s.paragraphs||[]),...(s.subtopics||[]).flatMap(t=>
        [...(t.paragraphs||[]),...(t.formulas||[]),...(t.bullets||[])])
    ])].join(' ').trim().split(/\s+/).length;
    audit.reviewedSource='NCERT Ganita Manjari Part II Ch 13, iemh205.pdf (source comparison pending original PDF access)';
    audit.reviewStatus='Audit reconciled with existing notes; independent textbook editorial review outstanding';
  }
})();