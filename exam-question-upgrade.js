/* StudyAI Exam Practice Upgrade
   Original questions only. Formats are calibrated to public exam specifications;
   no College Board, Cambridge, CBSE, textbook, or question-bank item is copied verbatim. */
(() => {
  'use strict';

  const bridge = window.StudyAIPracticeBridge;
  if (!bridge) return;

  const $ = (s,r=document) => r.querySelector(s);
  const $$ = (s,r=document) => [...r.querySelectorAll(s)];
  const safe = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const random = items => {
    const a=[...items];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
    return a;
  };
  const normalize = v => String(v ?? '').trim().replace(/,/g,'').replace(/\s+/g,' ').toLowerCase();
  const numericEqual = (a,b) => {
    const x=Number(normalize(a)), y=Number(normalize(b));
    return Number.isFinite(x)&&Number.isFinite(y)&&Math.abs(x-y)<1e-9;
  };

  const SAT_REPLACEMENTS = [
    {id:'satx-m01',section:'Math',domain:'Algebra',skill:'Linear Equations in One Variable',level:'Foundation',
      stem:'What value of x satisfies 4(2x - 3) - 5 = 3(x + 4) + 2?',options:['29/5','31/5','33/5','37/5'],answer:1,
      explanation:'Expanding gives 8x - 17 = 3x + 14. Therefore 5x = 31, so x = 31/5.',passage:''},
    {id:'satx-m02',section:'Math',domain:'Algebra',skill:'Linear Functions',level:'Medium',
      stem:'A taxi fare is modeled by C = 4.50 + 2.75m, where C is the cost in dollars and m is the number of miles traveled. If the fare is $26.50, how many miles were traveled?',options:['6','8','9','11'],answer:1,
      explanation:'26.50 = 4.50 + 2.75m, so 22 = 2.75m and m = 8.',passage:''},
    {id:'satx-m03',section:'Math',domain:'Algebra',skill:'Linear Equations in Two Variables',level:'Medium',
      stem:'The point (4, y) lies on the line 3x + 2y = 18. What is the value of y?',options:['2','3','4','6'],answer:1,
      explanation:'Substitute x = 4: 12 + 2y = 18, so 2y = 6 and y = 3.',passage:''},
    {id:'satx-m04',section:'Math',domain:'Algebra',skill:'Systems of Two Linear Equations',level:'Medium',
      stem:'The system 2x + y = 11 and x - y = 1 has solution (x, y). What is x + y?',options:['5','6','7','8'],answer:2,
      explanation:'From x - y = 1, y = x - 1. Substitution gives 3x - 1 = 11, so x = 4 and y = 3. Thus x + y = 7.',passage:''},
    {id:'satx-m05',section:'Math',domain:'Algebra',skill:'Linear Inequalities',level:'Medium',
      stem:'Which inequality is equivalent to 5 - 2x < 17?',options:['x < -6','x > -6','x < 6','x > 6'],answer:1,
      explanation:'Subtract 5 to get -2x < 12. Dividing by -2 reverses the inequality, giving x > -6.',passage:''},
    {id:'satx-m06',section:'Math',domain:'Advanced Math',skill:'Equivalent Expressions',level:'Medium',
      stem:'For x ≠ 3, which expression is equivalent to (x² - 9)/(x - 3)?',options:['x - 3','x + 3','x² + 3','x² - 3'],answer:1,
      explanation:'x² - 9 factors as (x - 3)(x + 3). Since x ≠ 3, the common factor cancels, leaving x + 3.',passage:''},
    {id:'satx-m07',section:'Math',domain:'Advanced Math',skill:'Nonlinear Equations in One Variable',level:'Medium',
      stem:'What is the positive solution to x² - 6x = 7?',options:['1','6','7','13'],answer:2,
      explanation:'Rewrite as x² - 6x - 7 = 0 = (x - 7)(x + 1). The positive solution is 7.',passage:''},
    {id:'satx-m08',section:'Math',domain:'Advanced Math',skill:'Systems of Linear and Nonlinear Equations',level:'Advanced',
      stem:'The graphs of y = x + 1 and y = x² - 3x + 3 intersect at two points. What is the sum of the x-coordinates of the intersection points?',options:['2','3','4','5'],answer:2,
      explanation:'Set the expressions equal: x + 1 = x² - 3x + 3, giving x² - 4x + 2 = 0. The sum of the roots is 4.',passage:''},
    {id:'satx-m09',section:'Math',domain:'Advanced Math',skill:'Nonlinear Functions',level:'Advanced',
      stem:'The function f(x) = a(x - 2)² + 5 passes through the point (4, 13). What is f(0)?',options:['9','11','13','17'],answer:2,
      explanation:'13 = 4a + 5, so a = 2. Then f(0) = 2(0 - 2)² + 5 = 13.',passage:''},
    {id:'satx-m10',section:'Math',domain:'Problem-Solving and Data Analysis',skill:'Ratios, Rates and Proportions',level:'Medium',
      stem:'A mixture contains two liquids in the ratio 3:5. If the mixture contains 64 milliliters in total, how many milliliters are from the smaller portion?',options:['18','24','32','40'],answer:1,
      explanation:'There are 8 equal ratio parts. Each part is 64/8 = 8 mL, so the smaller portion is 3 × 8 = 24 mL.',passage:''},
    {id:'satx-m11',section:'Math',domain:'Problem-Solving and Data Analysis',skill:'Percentages',level:'Medium',
      stem:'A price is decreased by 20% and then the new price is increased by 25%. Compared with the original price, what is the final percent change?',options:['0%','5% increase','5% decrease','10% increase'],answer:0,
      explanation:'Multiplying by 0.80 and then 1.25 gives 1.00, so the final price equals the original price.',passage:''},
    {id:'satx-m12',section:'Math',domain:'Problem-Solving and Data Analysis',skill:'One-variable Data',level:'Medium',
      stem:'The mean of the five numbers 6, 8, 9, 11, and x is 10. What is x?',options:['14','15','16','17'],answer:2,
      explanation:'A mean of 10 for five numbers requires a total of 50. The four known values total 34, so x = 16.',passage:''},
    {id:'satx-m13',section:'Math',domain:'Problem-Solving and Data Analysis',skill:'Two-variable Data',level:'Medium',
      stem:'A line of best fit is y = 1.8x + 12. According to this model, how much does the predicted value of y increase when x increases by 4?',options:['4.5','7.2','12','19.2'],answer:1,
      explanation:'The slope 1.8 is the predicted change in y for each 1-unit increase in x. For 4 units, the increase is 1.8 × 4 = 7.2.',passage:''},
    {id:'satx-m14',section:'Math',domain:'Problem-Solving and Data Analysis',skill:'Probability and Conditional Probability',level:'Advanced',
      stem:'A bag contains 5 red, 3 blue, and 2 green tokens. Two tokens are selected at random without replacement. What is the probability that both are blue?',options:['1/15','1/10','2/15','1/5'],answer:0,
      explanation:'The probability is (3/10)(2/9) = 6/90 = 1/15.',passage:''},
    {id:'satx-m15',section:'Math',domain:'Problem-Solving and Data Analysis',skill:'Inference from Sample Statistics',level:'Advanced',
      stem:'A school selects 250 students at random from its 2,400 students and finds that the sample averages 7.4 hours of sleep per night. Which conclusion is best supported?',options:['Every student at the school sleeps exactly 7.4 hours.','The population mean is likely near 7.4 hours, with some sampling uncertainty.','Exactly 250 students at the school sleep more than 7.4 hours.','The sample proves that sleeping 7.4 hours causes higher grades.'],answer:1,
      explanation:'A random sample can support an estimate of a population mean, but sampling variability remains and the study does not establish causation.',passage:''},
    {id:'satx-m16',section:'Math',domain:'Geometry and Trigonometry',skill:'Area and Volume',level:'Medium',
      stem:'A right circular cylinder has radius 3 and height 8. What is its volume?',options:['24π','48π','72π','144π'],answer:2,
      explanation:'The cylinder volume is πr²h = π(3²)(8) = 72π.',passage:''},
    {id:'satx-m17',section:'Math',domain:'Geometry and Trigonometry',skill:'Lines, Angles and Triangles',level:'Medium',
      stem:'Two similar triangles have corresponding side lengths in the ratio 5:8. A side of the smaller triangle has length 15. What is the corresponding side length of the larger triangle?',options:['18','21','24','27'],answer:2,
      explanation:'The scale factor from smaller to larger is 8/5, so 15 × 8/5 = 24.',passage:''},
    {id:'satx-m18',section:'Math',domain:'Geometry and Trigonometry',skill:'Right Triangles and Trigonometry',level:'Medium',
      stem:'In a right triangle, cos θ = 12/13 and θ is acute. What is tan θ?',options:['5/12','5/13','12/5','13/5'],answer:0,
      explanation:'A 5-12-13 right triangle has adjacent side 12, hypotenuse 13, and opposite side 5, so tan θ = 5/12.',passage:''},
    {id:'satx-m19',section:'Math',domain:'Geometry and Trigonometry',skill:'Circles',level:'Advanced',
      stem:'A circle has center (2, -3). The point (5, 1) lies on the circle. What is the slope of the tangent line to the circle at (5, 1)?',options:['-4/3','-3/4','3/4','4/3'],answer:1,
      explanation:'The radius from (2, -3) to (5, 1) has slope 4/3. A tangent is perpendicular to the radius, so its slope is -3/4.',passage:''},

    {id:'satx-r01',section:'Reading & Writing',domain:'Information and Ideas',skill:'Central Ideas and Details',level:'Advanced',
      passage:'Ecologists studying city trees found that neighborhoods with greater canopy cover were generally cooler on summer afternoons. However, the size of the effect varied by tree species, street width, and the amount of nearby pavement. The researchers therefore cautioned against treating canopy percentage as the only factor that determines neighborhood temperature.',
      stem:'Which choice best states the main idea of the text?',options:['Tree canopy has no meaningful relationship with urban temperature.','Increasing tree canopy can reduce urban heat, but the size of the effect depends on other local factors.','Street width is more important than tree species in every city.','Pavement affects temperature only when tree canopy is absent.'],answer:1,
      explanation:'The passage reports a general cooling relationship while emphasizing that several local factors modify the size of the effect.'},
    {id:'satx-r02',section:'Reading & Writing',domain:'Information and Ideas',skill:'Inferences',level:'Advanced',
      passage:'Researchers analyzing residue in ancient cooking vessels found traces of both marine oils and grain starches in vessels from the same settlement layer. Earlier accounts had described the community as relying almost entirely on fishing.',
      stem:'Which conclusion is most strongly supported by the text?',options:['The community stopped fishing after learning to cultivate grain.','The community likely used a more varied food supply than earlier accounts suggested.','The grain starches must have entered the vessels centuries after they were used.','Marine foods were eaten only during periods when grain was unavailable.'],answer:1,
      explanation:'Evidence of both marine and grain residues supports a more varied diet than an almost exclusively fishing-based one.'},
    {id:'satx-r03',section:'Reading & Writing',domain:'Information and Ideas',skill:'Command of Evidence: Textual',level:'Medium',
      passage:'A botanist claims that a certain desert plant allocates more growth to roots when water is scarce. In a controlled study, genetically similar plants were grown under different watering schedules.',
      stem:'Which finding would most directly support the botanist’s claim?',options:['Plants receiving less water had a higher root-to-shoot mass ratio than well-watered plants.','Well-watered plants produced more leaves overall than plants receiving less water.','All plants had similar seed masses before the experiment began.','Plants in both groups were exposed to the same number of daylight hours.'],answer:0,
      explanation:'A higher root-to-shoot mass ratio under low water directly shows a greater allocation of growth to roots.'},
    {id:'satx-r04',section:'Reading & Writing',domain:'Information and Ideas',skill:'Command of Evidence: Quantitative',level:'Advanced',
      passage:'A reaction was measured at three temperatures. At 10°C, the average rate was 2.1 units/min; at 20°C, 3.8 units/min; and at 30°C, 3.7 units/min. A student claims that, among the temperatures tested, the reaction rate was greatest at 20°C.',
      stem:'Which choice most effectively uses the data to support the student’s claim?',options:['The rate at 20°C was 1.7 units/min greater than at 10°C and 0.1 units/min greater than at 30°C.','The rate increased by exactly the same amount from 10°C to 20°C as from 20°C to 30°C.','The rate at 30°C was almost twice the rate at 10°C.','The 10°C measurement was lower than both other measurements, so temperature alone determines the rate.'],answer:0,
      explanation:'The first choice directly compares 20°C with both alternatives and shows that 3.8 is the largest measured rate.'},
    {id:'satx-r05',section:'Reading & Writing',domain:'Craft and Structure',skill:'Words in Context',level:'Advanced',
      passage:'The historian’s conclusion was qualified: although the newly discovered letters strengthened the case for an earlier date, gaps in the archive prevented her from treating the date as certain.',
      stem:'As used in the text, what does “qualified” most nearly mean?',options:['certified','limited','celebrated','translated'],answer:1,
      explanation:'The conclusion is presented with a limitation or reservation because the evidence remains incomplete.'},
    {id:'satx-r06',section:'Reading & Writing',domain:'Craft and Structure',skill:'Text Structure and Purpose',level:'Medium',
      passage:'Many early maps of the region omitted seasonal wetlands. Modern satellite images, however, show that these wetlands can cover large areas after heavy rainfall. This difference matters because the wetlands create temporary habitats used by migrating birds.',
      stem:'What is the main function of the second sentence in the text?',options:['It introduces evidence that complicates the picture provided by early maps.','It explains why migrating birds avoid the region.','It proves that early mapmakers intentionally removed wetlands.','It gives a definition of seasonal migration.'],answer:0,
      explanation:'The satellite evidence shows a feature that earlier maps omitted, adding information that changes the earlier picture.'},
    {id:'satx-r07',section:'Reading & Writing',domain:'Craft and Structure',skill:'Cross-Text Connections',level:'Advanced',
      passage:'Text 1: A manager argues that remote work improves productivity because employees can design quieter work environments. Text 2: A researcher finds that remote work can improve productivity for tasks requiring concentration but may reduce spontaneous collaboration on tasks that depend on rapid group discussion.',
      stem:'How would the author of Text 2 most likely respond to the manager’s claim in Text 1?',options:['By fully rejecting it because remote work never improves productivity.','By agreeing that it can apply to some tasks while arguing that the effect depends on the kind of work being done.','By arguing that office work is always quieter than remote work.','By agreeing only because spontaneous collaboration has no effect on productivity.'],answer:1,
      explanation:'Text 2 supports a conditional version of the claim: remote work can help some tasks, but not necessarily collaboration-heavy ones.'},
    {id:'satx-r08',section:'Reading & Writing',domain:'Expression of Ideas',skill:'Rhetorical Synthesis',level:'Medium',
      passage:'Notes: • Astronomer Vera Rubin studied galaxy rotation. • Her observations supplied important evidence for unseen mass in galaxies. • She began this work in the 1960s and 1970s. • The student wants to emphasize the significance of Rubin’s observations rather than the chronology of her career.',
      stem:'Which choice most effectively uses the notes to accomplish the student’s goal?',options:['Vera Rubin worked as an astronomer during the 1960s and 1970s.','By studying how galaxies rotate, Vera Rubin produced observations that became important evidence for unseen mass in galaxies.','Astronomers have studied galaxies for many decades, including the 1960s and 1970s.','Vera Rubin’s career included observations, astronomy, and work on galaxies.'],answer:1,
      explanation:'The choice foregrounds the significance of the observations and omits unnecessary chronology.'},
    {id:'satx-r09',section:'Reading & Writing',domain:'Expression of Ideas',skill:'Transitions',level:'Advanced',
      passage:'The first prototype was lighter than the existing design and used fewer components. ______, it failed repeatedly during high-temperature testing, so the engineering team did not approve it for production.',
      stem:'Which choice completes the text with the most logical transition?',options:['For example,','Likewise,','However,','Therefore,'],answer:2,
      explanation:'The second sentence contrasts the prototype’s advantages with a serious failure, so “However” is the logical transition.'},
    {id:'satx-r10',section:'Reading & Writing',domain:'Standard English Conventions',skill:'Boundaries',level:'Advanced',
      passage:'',
      stem:'Researchers initially expected the material to become weaker at low temperatures ______ the opposite occurred: its measured tensile strength increased.',
      options:[', however,','; however,',', however;',': however'],answer:1,
      explanation:'The sentence contains two independent clauses. A semicolon can join them, and “however” is set off with a following comma.'},

    {id:'satx-spr01',section:'Math',domain:'Algebra',skill:'Linear Equations in One Variable',level:'Medium',format:'spr',
      stem:'If 7x - 4 = 3x + 20, what is the value of x?',options:[],correctAnswer:'6',acceptedAnswers:['6','6.0'],
      explanation:'Subtract 3x from both sides and add 4: 4x = 24, so x = 6.',passage:''},
    {id:'satx-spr02',section:'Math',domain:'Advanced Math',skill:'Nonlinear Equations in One Variable',level:'Medium',format:'spr',
      stem:'The equation x² - 5x - 24 = 0 has one positive solution. What is that solution?',options:[],correctAnswer:'8',acceptedAnswers:['8','8.0'],
      explanation:'Factor: (x - 8)(x + 3) = 0. The positive solution is 8.',passage:''},
    {id:'satx-spr03',section:'Math',domain:'Problem-Solving and Data Analysis',skill:'Percentages',level:'Medium',format:'spr',
      stem:'After a 30% discount, an item costs $84. What was the original price, in dollars?',options:[],correctAnswer:'120',acceptedAnswers:['120','120.0'],
      explanation:'The sale price is 70% of the original price, so 0.70p = 84 and p = 120.',passage:''},
    {id:'satx-spr04',section:'Math',domain:'Geometry and Trigonometry',skill:'Area and Volume',level:'Advanced',format:'spr',
      stem:'A rectangle has area 54 square units. Its length is 3 units greater than its width. What is the width?',options:[],correctAnswer:'6',acceptedAnswers:['6','6.0'],
      explanation:'Let the width be w. Then w(w + 3) = 54, so w² + 3w - 54 = 0 = (w + 9)(w - 6). The positive width is 6.',passage:''},
    {id:'satx-spr05',section:'Math',domain:'Geometry and Trigonometry',skill:'Right Triangles and Trigonometry',level:'Medium',format:'spr',
      stem:'In a right triangle, tan θ = 3/4 and the hypotenuse is 20. If θ is acute, what is the length of the side opposite θ?',options:[],correctAnswer:'12',acceptedAnswers:['12','12.0'],
      explanation:'The side ratio is 3:4:5. A hypotenuse of 20 gives a scale factor of 4, so the opposite side is 3 × 4 = 12.',passage:''},
    {id:'satx-spr06',section:'Math',domain:'Geometry and Trigonometry',skill:'Circles',level:'Advanced',format:'spr',
      stem:'The endpoints of a diameter of a circle are (-2, 1) and (6, 7). What is the radius of the circle?',options:[],correctAnswer:'5',acceptedAnswers:['5','5.0'],
      explanation:'The diameter is √[(8)² + (6)²] = √100 = 10, so the radius is 5.',passage:''}
  ];

  function patchSatBank(){
    const bank=bridge.getSatQuestions();
    if(!Array.isArray(bank)||bank.some(q=>q.id==='satx-m01'))return;
    for(let i=bank.length-1;i>=0;i--){
      const q=bank[i];
      if(/quick fluency check|attached to the .* practice bank|starts at \d+ and increases by/i.test(String(q?.explanation||'')+' '+String(q?.stem||''))) bank.splice(i,1);
    }
    bank.push(...SAT_REPLACEMENTS);
  }

  const topicHas=(entry,re)=>re.test(entry.title||'');

  function curriculumCurated(entry){
    const s=entry.subject||'';
    const q=[];
    const add=(item)=>q.push({...item,entry,id:item.id+'|'+entry.id});

    if(s==='Mathematics'){
      if(topicHas(entry,/linear equations?/i)){
        add({id:'lin1',type:'numeric',difficulty:'Exam standard',stem:'Solve 5(2x - 3) - 4 = 3(x + 5) + 2. Enter the value of x.',correctAnswer:'36/7',acceptedAnswers:['36/7','5.142857142857143'],explanation:'10x - 19 = 3x + 17, so 7x = 36 and x = 36/7.'});
        add({id:'lin2',type:'mcq',difficulty:'Challenge',stem:'A line passes through (2, 7) and (8, 25). Which equation represents the line?',options:['y = 3x + 1','y = 2x + 3','y = 3x - 1','y = 4x - 1'],answer:0,explanation:'The slope is (25 - 7)/(8 - 2) = 3. Using (2,7), 7 = 6 + b, so b = 1.'});
      }
      if(topicHas(entry,/polynomial/i)){
        add({id:'poly1',type:'mcq',difficulty:'Exam standard',stem:'If x - 3 is a factor of p(x) = x³ - 4x² + kx + 6, what is k?',options:['-1','-3','1','3'],answer:1,explanation:'By the factor theorem, p(3)=0: 27 - 36 + 3k + 6 = 0, so -3 + 3k = 0 and k = 1.',overrideAnswer:2});
        add({id:'poly2',type:'numeric',difficulty:'Challenge',stem:'The polynomial x² - 9x + c has roots that differ by 3. Enter the value of c.',correctAnswer:'18',acceptedAnswers:['18','18.0'],explanation:'If the roots are r and r+3, then 2r+3=9, so r=3 and the roots are 3 and 6. Their product is c=18.'});
      }
      if(topicHas(entry,/coordinate geometry|three dimensional geometry/i)){
        add({id:'coord1',type:'numeric',difficulty:'Exam standard',stem:'The midpoint of A(-3, 4) and B(5, -2) is (p, q). Enter p + q.',correctAnswer:'2',acceptedAnswers:['2','2.0'],explanation:'The midpoint is ((-3+5)/2,(4-2)/2)=(1,1), so p+q=2.'});
      }
      if(topicHas(entry,/quadratic/i)){
        add({id:'quad1',type:'mcq',difficulty:'Exam standard',stem:'For what value of k does x² - 6x + k = 0 have exactly one real solution?',options:['6','8','9','12'],answer:2,explanation:'Exactly one real solution requires discriminant 36 - 4k = 0, so k = 9.'});
        add({id:'quad2',type:'numeric',difficulty:'Challenge',stem:'The roots of x² - 11x + 24 = 0 are α and β. Enter α² + β².',correctAnswer:'73',acceptedAnswers:['73','73.0'],explanation:'α+β=11 and αβ=24, so α²+β²=(α+β)²-2αβ=121-48=73.'});
      }
      if(topicHas(entry,/arithmetic progression|sequences?/i)){
        add({id:'ap1',type:'numeric',difficulty:'Exam standard',stem:'An arithmetic progression has first term 7 and common difference 4. Enter the sum of its first 18 terms.',correctAnswer:'738',acceptedAnswers:['738','738.0'],explanation:'The 18th term is 7+17×4=75. The sum is 18(7+75)/2=738.'});
      }
      if(topicHas(entry,/probability/i)){
        add({id:'prob1',type:'numeric',difficulty:'Challenge',stem:'A bag has 4 red, 3 blue, and 2 green counters. Two counters are drawn without replacement. Enter the probability that both are blue as a simplified fraction.',correctAnswer:'1/12',acceptedAnswers:['1/12','0.08333333333333333'],explanation:'P(blue then blue)=(3/9)(2/8)=6/72=1/12.'});
      }
      if(topicHas(entry,/matrices|determinants/i)){
        add({id:'mat1',type:'numeric',difficulty:'Exam standard',stem:'For the matrix [[3,2],[5,4]], enter its determinant.',correctAnswer:'2',acceptedAnswers:['2','2.0'],explanation:'The determinant is 3×4 - 2×5 = 12 - 10 = 2.'});
      }
      if(topicHas(entry,/continuity|differentiability|derivatives?/i)){
        add({id:'calc1',type:'numeric',difficulty:'Exam standard',stem:'For f(x)=x³ - 4x² + 2x - 7, enter f′(2).',correctAnswer:'-2',acceptedAnswers:['-2','-2.0'],explanation:'f′(x)=3x²-8x+2. At x=2, f′(2)=12-16+2=-2.'});
      }
      if(topicHas(entry,/integrals?/i)){
        add({id:'int1',type:'numeric',difficulty:'Exam standard',stem:'Evaluate ∫₀² (3x² + 1) dx.',correctAnswer:'10',acceptedAnswers:['10','10.0'],explanation:'An antiderivative is x³+x. From 0 to 2 the value is 8+2=10.'});
      }
      if(topicHas(entry,/vector/i)){
        add({id:'vec1',type:'numeric',difficulty:'Exam standard',stem:'Let a=(2,-1,3) and b=(1,4,-2). Enter a·b.',correctAnswer:'-8',acceptedAnswers:['-8','-8.0'],explanation:'a·b=2(1)+(-1)(4)+3(-2)=2-4-6=-8.'});
      }
      if(topicHas(entry,/trigon/i)){
        add({id:'trig1',type:'mcq',difficulty:'Exam standard',stem:'If sin θ = 3/5 and θ is acute, what is cos θ?',options:['2/5','3/4','4/5','5/4'],answer:2,explanation:'Using a 3-4-5 right triangle, the adjacent side is 4 when the hypotenuse is 5, so cos θ=4/5.'});
      }
    }

    if(s==='Physics'||s==='Science'){
      if(topicHas(entry,/motion|kinematic/i)){
        add({id:'phy-motion1',type:'numeric',difficulty:'Exam standard',stem:'A body starts with speed 6 m/s and accelerates uniformly at 2.5 m/s² for 8 s. Enter its final speed in m/s.',correctAnswer:'26',acceptedAnswers:['26','26.0'],explanation:'v=u+at=6+2.5×8=26 m/s.'});
      }
      if(topicHas(entry,/current electricity|electricity/i)){
        add({id:'phy-current1',type:'numeric',difficulty:'Exam standard',stem:'A 12 V source is connected across a 4 Ω resistor. Enter the power dissipated by the resistor in watts.',correctAnswer:'36',acceptedAnswers:['36','36.0'],explanation:'P=V²/R=144/4=36 W.'});
      }
      if(topicHas(entry,/electric charges|electric field|electrostatic/i)){
        add({id:'phy-field1',type:'mcq',difficulty:'Challenge',stem:'Two point charges are separated by distance r. If one charge is doubled and the separation is tripled, the magnitude of the electrostatic force becomes:',options:['2F/3','2F/9','6F','9F/2'],answer:1,explanation:'Coulomb force is proportional to q₁q₂/r², so the new force is 2/3² = 2/9 of the original.'});
      }
      if(topicHas(entry,/capacit/i)){
        add({id:'phy-cap1',type:'numeric',difficulty:'Exam standard',stem:'A 6 μF capacitor is charged to 20 V. Enter the energy stored in microjoules.',correctAnswer:'1200',acceptedAnswers:['1200','1200.0'],explanation:'U=½CV²=½×6×10⁻⁶×400=1.2×10⁻³ J=1200 μJ.'});
      }
      if(topicHas(entry,/electromagnetic induction/i)){
        add({id:'phy-emi1',type:'numeric',difficulty:'Exam standard',stem:'Magnetic flux through a 50-turn coil changes uniformly from 0.020 Wb to 0.005 Wb in 0.10 s. Enter the magnitude of the average induced emf in volts.',correctAnswer:'7.5',acceptedAnswers:['7.5','7.50'],explanation:'|E|=N|ΔΦ|/Δt=50×0.015/0.10=7.5 V.'});
      }
      if(topicHas(entry,/alternating current/i)){
        add({id:'phy-ac1',type:'numeric',difficulty:'Exam standard',stem:'A sinusoidal AC voltage has peak value 170 V. Enter its rms value to the nearest whole volt.',correctAnswer:'120',acceptedAnswers:['120'],explanation:'Vrms=Vpeak/√2≈170/1.414≈120 V.'});
      }
      if(topicHas(entry,/optics|lens|light/i)){
        add({id:'phy-opt1',type:'numeric',difficulty:'Challenge',stem:'A thin converging lens has focal length 20 cm. An object is placed 60 cm from the lens. Enter the image distance in cm.',correctAnswer:'30',acceptedAnswers:['30','30.0'],explanation:'Using 1/f=1/v+1/u with magnitudes: 1/20=1/v+1/60, so 1/v=1/30 and v=30 cm.'});
      }
      if(topicHas(entry,/wave optics/i)){
        add({id:'phy-wave1',type:'numeric',difficulty:'Exam standard',stem:'In Young’s double-slit experiment, λ=600 nm, slit separation=0.50 mm, and screen distance=2.0 m. Enter the fringe width in millimeters.',correctAnswer:'2.4',acceptedAnswers:['2.4','2.40'],explanation:'β=λD/d=(600×10⁻⁹×2)/(0.50×10⁻³)=2.4×10⁻³ m=2.4 mm.'});
      }
      if(topicHas(entry,/nuclei|radioactiv/i)){
        add({id:'phy-nuc1',type:'numeric',difficulty:'Exam standard',stem:'A radioactive sample has a half-life of 6 hours. If its initial activity is 800 counts/min, enter the activity after 18 hours.',correctAnswer:'100',acceptedAnswers:['100','100.0'],explanation:'18 hours is three half-lives, so the activity is 800×(1/2)³=100 counts/min.'});
      }
    }

    if(s==='Chemistry'||s==='Science'){
      if(topicHas(entry,/solutions?/i)){
        add({id:'chem-sol1',type:'numeric',difficulty:'Exam standard',stem:'0.50 mol of solute is dissolved to make 2.0 L of solution. Enter the molarity in mol/L.',correctAnswer:'0.25',acceptedAnswers:['0.25','.25'],explanation:'Molarity = moles/volume = 0.50/2.0 = 0.25 mol/L.'});
      }
      if(topicHas(entry,/electrochem/i)){
        add({id:'chem-elec1',type:'numeric',difficulty:'Exam standard',stem:'For a galvanic cell, E°cathode = +0.80 V and E°anode = -0.34 V. Enter E°cell in volts.',correctAnswer:'1.14',acceptedAnswers:['1.14','1.140'],explanation:'E°cell=E°cathode-E°anode=0.80-(-0.34)=1.14 V.'});
      }
      if(topicHas(entry,/kinetics/i)){
        add({id:'chem-kin1',type:'mcq',difficulty:'Challenge',stem:'For a first-order reaction, which change leaves the half-life unchanged at constant temperature?',options:['Doubling the initial concentration','Halving the initial concentration','Changing the initial concentration by any factor','All of these changes'],answer:3,explanation:'For a first-order reaction, t½=ln2/k, so the half-life does not depend on initial concentration.'});
      }
      if(topicHas(entry,/equilibrium/i)){
        add({id:'chem-eq1',type:'mcq',difficulty:'Exam standard',stem:'For N₂(g)+3H₂(g) ⇌ 2NH₃(g), which change shifts equilibrium toward NH₃ at constant temperature?',options:['Increasing volume','Decreasing pressure','Increasing pressure','Adding an inert gas at constant volume'],answer:2,explanation:'The product side has fewer moles of gas, so increasing pressure favors the side with fewer gas molecules.'});
      }
      if(topicHas(entry,/coordination/i)){
        add({id:'chem-coord1',type:'numeric',difficulty:'Exam standard',stem:'In the complex ion [Fe(CN)₆]⁴⁻, enter the oxidation state of Fe.',correctAnswer:'2',acceptedAnswers:['2','+2'],explanation:'Each CN⁻ is -1. If Fe is x, x-6=-4, so x=+2.'});
      }
      if(topicHas(entry,/chemical kinetics/i)){
        add({id:'chem-rate1',type:'numeric',difficulty:'Exam standard',stem:'A first-order reaction has k = 0.231 min⁻¹. Enter its half-life in minutes to three significant figures.',correctAnswer:'3.00',acceptedAnswers:['3','3.0','3.00'],explanation:'t½=0.693/k=0.693/0.231=3.00 min.'});
      }
    }

    if(s==='Biology'||s==='Science'){
      if(topicHas(entry,/inheritance|genetic/i)){
        add({id:'bio-gen1',type:'mcq',difficulty:'Challenge',stem:'Two heterozygous parents for a single autosomal trait are crossed: Aa × Aa. Assuming complete dominance, what is the probability that an offspring has the recessive phenotype?',options:['1/4','1/2','3/4','1'],answer:0,explanation:'The genotype ratio is 1 AA : 2 Aa : 1 aa. Only aa shows the recessive phenotype, so the probability is 1/4.'});
      }
      if(topicHas(entry,/molecular basis|dna|inheritance/i)){
        add({id:'bio-dna1',type:'mcq',difficulty:'Exam standard',stem:'A DNA template strand is 3′-TAC GGA TTT-5′. Which RNA sequence is transcribed from it?',options:['5′-AUG CCU AAA-3′','5′-UAC GGA UUU-3′','3′-AUG CCU AAA-5′','5′-ATG CCT AAA-3′'],answer:0,explanation:'RNA is synthesized antiparallel and complementary to the template: 5′-AUG CCU AAA-3′.'});
      }
      if(topicHas(entry,/evolution/i)){
        add({id:'bio-evo1',type:'mcq',difficulty:'Challenge',stem:'In a population, a heritable trait increases survival in a changed environment and becomes more common over many generations. Which process most directly explains the change?',options:['Natural selection','Genetic translation','Homeostasis','Mitosis'],answer:0,explanation:'Individuals with the advantageous heritable trait leave more surviving offspring, increasing the trait’s frequency through natural selection.'});
      }
      if(topicHas(entry,/ecosystem/i)){
        add({id:'bio-eco1',type:'numeric',difficulty:'Exam standard',stem:'Producers in an ecosystem store 18,000 kJ of energy. If approximately 10% is transferred to the next trophic level, enter the energy available there in kJ.',correctAnswer:'1800',acceptedAnswers:['1800','1800.0'],explanation:'10% of 18,000 kJ is 1,800 kJ.'});
      }
      if(topicHas(entry,/population/i)){
        add({id:'bio-pop1',type:'mcq',difficulty:'Challenge',stem:'In logistic population growth, growth rate slows as population size approaches carrying capacity mainly because:',options:['resources become increasingly limiting','mutation stops completely','all individuals become genetically identical','birth rate must become zero immediately'],answer:0,explanation:'Density-dependent competition for limiting resources reduces the growth rate as the population approaches carrying capacity.'});
      }
      if(topicHas(entry,/biotechnology/i)){
        add({id:'bio-bio1',type:'mcq',difficulty:'Exam standard',stem:'Which enzyme is used to join DNA fragments by forming phosphodiester bonds in the sugar-phosphate backbone?',options:['DNA ligase','DNA helicase','RNA polymerase','Restriction endonuclease'],answer:0,explanation:'DNA ligase seals breaks in the sugar-phosphate backbone by forming phosphodiester bonds.'});
      }
    }

    return q;
  }

  function writtenFallback(entry,variant=0){
    const methods=Array.isArray(entry.method)?entry.method:[];
    const mistakes=Array.isArray(entry.mistakes)?entry.mistakes:[];
    const points=[
      methods[0]||'Identify the information given and what the question requires.',
      methods[1]||'Choose an appropriate model, representation, equation, or biological/chemical principle.',
      methods[2]||'Show a justified chain of reasoning rather than only a final answer.',
      methods[3]||'Check the result against units, conditions, evidence, or reasonableness.'
    ];
    if(variant%2===0){
      return {id:'written-plan|'+variant+'|'+entry.id,entry,type:'written',difficulty:'Written response',marks:4,
        stem:'Write a 4-mark response explaining how you would approach an unfamiliar exam question on “'+entry.title+'”. Your response should identify the information you would extract, the principle or representation you would choose, how you would justify your working, and how you would check the final result.',
        markScheme:points,explanation:'A strong answer gives a complete, justified method rather than a memorized final statement.'};
    }
    const mistake=mistakes[0]||'using a remembered rule without checking whether its conditions apply';
    return {id:'written-error|'+variant+'|'+entry.id,entry,type:'written',difficulty:'Written response',marks:3,
      stem:'A student solving a “'+entry.title+'” question loses marks by '+mistake.replace(/^./,m=>m.toLowerCase())+'. Explain why this is risky and describe a better approach.',
      markScheme:[mistake,points[1],points[3]],explanation:'The response should diagnose the error and replace it with a justified method and a final check.'};
  }

  function buildQuestionsForEntry(entry){
    const curated=curriculumCurated(entry);
    const out=[...curated];
    let i=0;
    while(out.length<4){out.push(writtenFallback(entry,i++))}
    return out;
  }

  let cq={questions:[],index:0,correct:0,objective:0,written:0,finished:false};

  function addCurriculumControls(){
    const grid=$('#quiz-setup .setup-grid');
    if(!grid||$('#quiz-question-mix'))return;
    const difficulty=document.createElement('label');
    difficulty.innerHTML='Difficulty<select id="quiz-difficulty"><option value="exam" selected>Exam standard</option><option value="challenge">Challenge</option></select>';
    const mix=document.createElement('label');
    mix.innerHTML='Question mix<select id="quiz-question-mix"><option value="mixed" selected>Mixed · objective + written</option><option value="objective">Objective only</option><option value="written">Written response</option></select>';
    grid.append(difficulty,mix);
    const head=$('#practice .section-head p:last-child');
    if(head)head.textContent='Original exam-style questions with calculations, reasoning, typed responses and mark schemes. Quality is prioritised over padding a set with easy filler.';
  }

  function buildCurriculumSet(){
    const board=$('#quiz-board')?.value,grade=$('#quiz-grade')?.value,subject=$('#quiz-subject')?.value,topic=$('#quiz-chapter')?.value;
    const requested=Number($('#quiz-length')?.value)||10;
    const mix=$('#quiz-question-mix')?.value||'mixed';
    const difficulty=$('#quiz-difficulty')?.value||'exam';
    let entries=bridge.getCurriculum().filter(e=>e.board===board&&e.grade===grade&&e.subject===subject&&(topic==='all'||e.title===topic));
    if(!entries.length)return [];
    let bank=entries.flatMap(buildQuestionsForEntry);
    if(mix==='objective')bank=bank.filter(q=>q.type!=='written');
    if(mix==='written')bank=bank.filter(q=>q.type==='written');
    if(difficulty==='challenge'){
      const hard=bank.filter(q=>q.difficulty==='Challenge'||q.type==='written');
      if(hard.length)bank=hard;
    }
    bank=random(bank);
    if(topic!=='all'&&bank.length<requested){
      let n=4;
      while(bank.length<requested&&n<12){bank.push(writtenFallback(entries[0],n++))}
    }
    return bank.slice(0,Math.min(requested,bank.length));
  }

  function startCurriculumQuiz(){
    const questions=buildCurriculumSet();
    if(!questions.length)return;
    cq={questions,index:0,correct:0,objective:0,written:0,finished:false};
    $('#quiz-setup')?.classList.add('hidden');
    $('#quiz-result')?.classList.add('hidden');
    $('#quiz-runner')?.classList.remove('hidden');
    renderCurriculumQuestion();
  }

  function renderCurriculumQuestion(){
    const q=cq.questions[cq.index],runner=$('#quiz-runner');
    if(!q||!runner)return finishCurriculumQuiz();
    const meta='<div class="runner-top"><div><strong>'+safe(q.entry.subject)+' exam practice</strong><div class="runner-meta">'+safe(q.entry.board)+' · '+safe(q.entry.grade)+' · '+safe(q.difficulty)+'</div></div><span>'+(cq.index+1)+' / '+cq.questions.length+'</span></div>';
    let response='';
    if(q.type==='mcq'){
      response='<div class="options">'+q.options.map((o,i)=>'<button class="option-btn" data-exam-choice="'+i+'">'+String.fromCharCode(65+i)+'. '+safe(o)+'</button>').join('')+'</div>';
    }else if(q.type==='numeric'){
      response='<form class="exam-typed-form" id="exam-typed-form"><label>Your answer<input id="exam-typed-answer" type="text" inputmode="decimal" autocomplete="off" placeholder="Type your answer"></label><button class="button primary compact" type="submit">Check answer</button></form>';
    }else{
      response='<div class="exam-written"><div class="exam-marks">'+safe(q.marks)+' marks · written response</div><textarea id="exam-written-answer" rows="7" placeholder="Write your answer as you would in an exam. Show reasoning and use subject-specific terminology."></textarea><button class="button primary compact" id="exam-show-mark-scheme" type="button">Submit & show mark scheme</button></div>';
    }
    runner.innerHTML=meta+'<div class="question-stem">'+safe(q.stem)+'</div>'+response+'<div id="quiz-feedback"></div>';

    $$('[data-exam-choice]',runner).forEach(b=>b.addEventListener('click',()=>gradeObjective(q,Number(b.dataset.examChoice))));
    $('#exam-typed-form',runner)?.addEventListener('submit',e=>{e.preventDefault();const value=$('#exam-typed-answer',runner)?.value.trim();if(value)gradeObjective(q,value)});
    $('#exam-show-mark-scheme',runner)?.addEventListener('click',()=>showWrittenMarkScheme(q));
  }

  function gradeObjective(q,answer){
    const isMcq=q.type==='mcq';
    const correct=isMcq ? Number(answer)===Number(q.overrideAnswer??q.answer) :
      (q.acceptedAnswers||[q.correctAnswer]).some(expected=>normalize(answer)===normalize(expected)||numericEqual(answer,expected));
    cq.objective++;
    if(correct)cq.correct++;
    bridge.recordAttempt({...q,format:isMcq?'mcq':'spr',options:q.options||[],answer:Number(q.overrideAnswer??q.answer),correctAnswer:q.correctAnswer,acceptedAnswers:q.acceptedAnswers},answer,correct,'curriculum-exam-quiz');

    const runner=$('#quiz-runner');
    if(isMcq){
      $$('[data-exam-choice]',runner).forEach((b,i)=>{b.disabled=true;if(i===Number(q.overrideAnswer??q.answer))b.classList.add('correct');else if(i===Number(answer))b.classList.add('wrong')});
    }else{
      $('#exam-typed-answer',runner).disabled=true;
      $('#exam-typed-form button',runner).disabled=true;
    }
    $('#quiz-feedback',runner).innerHTML='<div class="explanation"><strong>'+(correct?'Correct':'Not quite')+'</strong><p>'+safe(q.explanation)+'</p><button class="button primary compact" id="exam-next" type="button">'+(cq.index===cq.questions.length-1?'Finish':'Next →')+'</button></div>';
    $('#exam-next',runner).onclick=nextCurriculum;
  }

  function showWrittenMarkScheme(q){
    const answer=$('#exam-written-answer')?.value.trim();
    if(!answer)return;
    cq.written++;
    $('#exam-written-answer').disabled=true;
    $('#exam-show-mark-scheme').disabled=true;
    $('#quiz-feedback').innerHTML='<div class="explanation exam-mark-scheme"><strong>Mark scheme · self-check</strong><p>Compare your response with these points. Written self-checks do not change Mastery because they are not objectively auto-graded.</p><ul>'+q.markScheme.map(p=>'<li>'+safe(p)+'</li>').join('')+'</ul><p>'+safe(q.explanation)+'</p><button class="button primary compact" id="exam-next" type="button">'+(cq.index===cq.questions.length-1?'Finish':'Next →')+'</button></div>';
    $('#exam-next').onclick=nextCurriculum;
  }

  function nextCurriculum(){
    cq.index++;
    if(cq.index>=cq.questions.length)finishCurriculumQuiz();else renderCurriculumQuestion();
  }

  function finishCurriculumQuiz(){
    if(cq.finished)return;cq.finished=true;
    if(cq.objective)bridge.recordTest({kind:'curriculum',correct:cq.correct,total:cq.objective,mode:'exam-style-quiz'});
    $('#quiz-runner')?.classList.add('hidden');
    const result=$('#quiz-result');
    if(!result)return;
    result.classList.remove('hidden');
    result.innerHTML='<span class="small-label">Exam practice complete</span><h3>'+(cq.objective?cq.correct+' / '+cq.objective+' auto-graded':'Written practice complete')+'</h3><p>'+cq.written+' written response'+(cq.written===1?'':'s')+' completed. Written responses use a mark scheme and are deliberately excluded from automatic mastery scoring.</p><button class="button primary" id="quiz-again">Build another set</button>';
    $('#quiz-again').onclick=()=>{result.classList.add('hidden');$('#quiz-setup')?.classList.remove('hidden')};
  }

  let sr={questions:[],index:0,correct:0,answered:0};

  function currentSatSection(){
    return $('#sat-section-tabs button.active')?.dataset.satSection||$('#sat-section-tabs button[aria-pressed="true"]')?.dataset.satSection||'Reading & Writing';
  }

  function startSatUpgrade(timed=false){
    const bank=bridge.getSatQuestions();
    const section=currentSatSection(),domain=$('#sat-domain')?.value,skill=$('#sat-skill')?.value,level=$('#sat-level')?.value,count=Number($('#sat-count')?.value)||10;
    let pool=bank.filter(q=>q.section===section);
    if(!timed)pool=pool.filter(q=>q.domain===domain&&q.skill===skill&&(q.level===level||!level));
    if(!pool.length)pool=bank.filter(q=>q.section===section&&q.domain===domain&&q.skill===skill);
    if(timed)pool=random(pool);
    else pool=random(pool);
    sr={questions:pool.slice(0,Math.min(count,pool.length)),index:0,correct:0,answered:0};
    if(!sr.questions.length)return;
    $('#sat-runner')?.classList.remove('hidden');
    renderSatUpgrade();
  }

  function renderSatUpgrade(){
    const q=sr.questions[sr.index],runner=$('#sat-runner');
    if(!q||!runner)return;
    const response=q.format==='spr'
      ? '<form class="exam-typed-form sat-spr-form" id="sat-spr-form"><label>Student-produced response<input id="sat-spr-answer" type="text" inputmode="decimal" autocomplete="off" placeholder="Enter your answer"></label><button class="button primary compact" type="submit">Check answer</button></form>'
      : '<div class="options">'+q.options.map((o,i)=>'<button class="option-btn" data-satx-choice="'+i+'">'+String.fromCharCode(65+i)+'. '+safe(o)+'</button>').join('')+'</div>';
    runner.innerHTML='<div class="runner-top"><div><strong>'+safe(q.section)+'</strong><div class="runner-meta">'+safe(q.domain)+' · '+safe(q.skill)+' · '+safe(q.level)+(q.format==='spr'?' · Student-produced response':'')+'</div></div><span>'+(sr.index+1)+' / '+sr.questions.length+'</span></div>'+(q.passage?'<div class="question-passage">'+safe(q.passage)+'</div>':'')+'<div class="question-stem">'+safe(q.stem)+'</div>'+response+'<div id="sat-feedback"></div>';
    $$('[data-satx-choice]',runner).forEach(b=>b.addEventListener('click',()=>gradeSat(q,Number(b.dataset.satxChoice))));
    $('#sat-spr-form',runner)?.addEventListener('submit',e=>{e.preventDefault();const v=$('#sat-spr-answer',runner)?.value.trim();if(v)gradeSat(q,v)});
  }

  function gradeSat(q,answer){
    const spr=q.format==='spr';
    const correct=spr
      ? (q.acceptedAnswers||[q.correctAnswer]).some(expected=>normalize(answer)===normalize(expected)||numericEqual(answer,expected))
      : Number(answer)===Number(q.answer);
    sr.answered++;if(correct)sr.correct++;
    bridge.recordAttempt(q,answer,correct,'sat-practice');
    const runner=$('#sat-runner');
    if(spr){
      $('#sat-spr-answer',runner).disabled=true;$('#sat-spr-form button',runner).disabled=true;
    }else{
      $$('[data-satx-choice]',runner).forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('correct');else if(i===Number(answer))b.classList.add('wrong')});
    }
    $('#sat-feedback',runner).innerHTML='<div class="explanation"><strong>'+(correct?'Correct':'Not quite')+'</strong><p>'+safe(q.explanation)+'</p><div class="runner-actions"><span>Set score: '+sr.correct+'/'+sr.answered+'</span><button class="button primary compact" id="satx-next">'+(sr.index===sr.questions.length-1?'Finish':'Next →')+'</button></div></div>';
    $('#satx-next',runner).onclick=()=>{sr.index++;if(sr.index>=sr.questions.length)finishSatUpgrade();else renderSatUpgrade()};
  }

  function finishSatUpgrade(){
    const runner=$('#sat-runner');
    runner.innerHTML='<div class="quiz-result"><span class="small-label">SAT practice complete</span><h3>'+sr.correct+' / '+sr.questions.length+'</h3><p>These are original StudyAI items calibrated to the public Digital SAT domain, skill and response formats. Use Bluebook and the College Board Question Bank for official questions.</p><button class="button primary" id="satx-again">Practice again</button></div>';
    $('#satx-again',runner).onclick=()=>startSatUpgrade(false);
  }

  function mount(){
    patchSatBank();
    addCurriculumControls();
    const start=$('#start-quiz');
    if(start)start.onclick=startCurriculumQuiz;
    const targeted=$('#sat-targeted'),timed=$('#sat-timed');
    if(targeted)targeted.onclick=()=>startSatUpgrade(false);
    if(timed)timed.onclick=()=>startSatUpgrade(true);
  }

  window.StudyAIExamPractice={satQuestions:SAT_REPLACEMENTS,buildQuestionsForEntry};

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
  else mount();
})();