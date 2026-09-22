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
        add({id:'poly1',type:'mcq',difficulty:'Exam standard',stem:'If x - 3 is a factor of p(x) = x³ - 4x² + kx + 6, what is k?',options:['-1','-3','1','3'],answer:2,explanation:'By the factor theorem, p(3)=0: 27 - 36 + 3k + 6 = 0, so -3 + 3k = 0 and k = 1.'});
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

  function boardSupportsWritten(entry){
    if(!entry)return false;
    if(entry.board==='CBSE') return entry.grade==='Class 10'||entry.grade==='Class 12';
    if(entry.board==='Cambridge IGCSE') return true;
    if(entry.board==='Cambridge International AS & A Level') return true;
    return false;
  }

  function writtenQuestion(entry,item){
    return {...item,entry,id:item.id+'|'+entry.id,type:'written',difficulty:item.difficulty||'Written response'};
  }

  function curriculumWritten(entry){
    if(!boardSupportsWritten(entry))return [];
    const t=entry.title||'',s=entry.subject||'',out=[];
    const add=item=>out.push(writtenQuestion(entry,item));

    // CBSE Class 10: board-style short/long answers tied to current syllabus topics.
    if(entry.board==='CBSE'&&entry.grade==='Class 10'&&s==='Science'){
      if(/Chemical Reactions and Equations/i.test(t)) add({id:'cb10-reactions-w1',marks:3,stem:'Explain oxidation and reduction in terms of gain or loss of oxygen. Use one balanced chemical equation to show a redox reaction and identify the substance oxidised and the substance reduced.',markScheme:['Defines oxidation as gain of oxygen and reduction as loss of oxygen in the stated context.','Gives a chemically correct balanced redox equation.','Correctly identifies which reactant is oxidised and which is reduced.'],explanation:'This tests the redox concepts in Chemical Reactions and Equations, not general exam technique.'});
      if(/Acids, Bases and Salts/i.test(t)) add({id:'cb10-acids-w1',marks:3,stem:'Explain why dry hydrogen chloride gas does not change the colour of dry blue litmus paper, whereas aqueous hydrochloric acid does.',markScheme:['States that acidic behaviour requires formation of H⁺/H₃O⁺ ions in water.','Explains that dry HCl does not ionise without water.','Connects the presence of hydronium ions in aqueous HCl to the litmus colour change.'],explanation:'The response should connect ionisation in water with acidic behaviour.'});
      if(/Metals and Non-metals/i.test(t)) add({id:'cb10-metals-w1',marks:4,stem:'Explain why ionic compounds generally have high melting points and conduct electricity when molten but not when solid.',markScheme:['Describes strong electrostatic attraction between oppositely charged ions.','Links strong attraction to the large energy needed for melting.','Explains that ions are fixed in position in the solid state.','Explains that ions become mobile when molten and can carry charge.'],explanation:'This is a structure–property explanation from Metals and Non-metals.'});
      if(/Carbon and Its Compounds/i.test(t)) add({id:'cb10-carbon-w1',marks:4,stem:'Explain how soap removes an oily stain from cloth. Your answer should refer to the structure of a soap molecule and micelle formation.',markScheme:['Identifies a hydrophobic hydrocarbon end and hydrophilic ionic end.','Explains that the hydrophobic ends interact with oil/grease.','Explains that hydrophilic ends remain in water.','Describes micelle formation that allows the oil to be carried away in water.'],explanation:'The question tests the soap-and-micelle theory in Carbon and Its Compounds.'});
      if(/Life Processes/i.test(t)) add({id:'cb10-life-w1',marks:4,stem:'Explain why double circulation is advantageous in humans. Trace how it helps keep oxygenated and deoxygenated blood separate and supports efficient respiration in body tissues.',markScheme:['Identifies pulmonary and systemic circulation as the two circuits.','Explains separation of oxygenated and deoxygenated blood.','Links separation to efficient oxygen delivery at relatively high pressure.','Connects efficient oxygen delivery with the energy demands of body tissues.'],explanation:'This tests circulation theory within Life Processes.'});
      if(/Control and Coordination/i.test(t)) add({id:'cb10-control-w1',marks:3,stem:'Explain the pathway of a reflex action from stimulus to response and state why a reflex can occur before conscious awareness of the stimulus.',markScheme:['Describes receptor → sensory neuron → relay neuron/spinal cord → motor neuron → effector.','Explains that the spinal cord can coordinate the immediate response.','States that information also reaches the brain, but conscious processing is not required before the reflex response.'],explanation:'The response should describe a reflex arc and its rapid coordination.'});
      if(/How Do Organisms Reproduce/i.test(t)) add({id:'cb10-repro-w1',marks:4,stem:'Explain two biological advantages of sexual reproduction compared with asexual reproduction, and relate your answer to genetic variation.',markScheme:['States that sexual reproduction combines genetic material from two parents.','Explains that recombination/independent assortment produces variation among offspring.','Links variation to different responses to environmental change or selection.','Contrasts this with the much lower genetic variation produced by asexual reproduction.'],explanation:'The answer should link sexual reproduction directly to genetic variation.'});
      if(/Heredity/i.test(t)) add({id:'cb10-heredity-w1',marks:4,stem:'In a monohybrid cross, explain the terms dominant allele, recessive allele, genotype and phenotype, and use them to explain why a recessive trait can reappear in the F₂ generation.',markScheme:['Defines dominant and recessive alleles correctly.','Distinguishes genotype from phenotype.','Explains that F₁ heterozygotes can carry the recessive allele without expressing it.','Explains that two recessive alleles can come together in an F₂ offspring, allowing the recessive phenotype to appear.'],explanation:'This is a heredity explanation based on a monohybrid cross.'});
      if(/Light: Reflection and Refraction/i.test(t)) add({id:'cb10-light-w1',marks:3,stem:'Explain what is meant by refractive index and why a ray of light bends when it passes obliquely from air into glass.',markScheme:['Defines refractive index as a measure related to the change in speed of light between media.','States that light travels at different speeds in air and glass.','Links the speed change at an oblique boundary to the change in direction toward the normal on entering glass.'],explanation:'The response tests refraction theory, not only use of a formula.'});
      if(/Human Eye/i.test(t)) add({id:'cb10-eye-w1',marks:4,stem:'Explain how the human eye focuses on a nearby object and then state what changes in a person with myopia and how a suitable lens corrects it.',markScheme:['Explains accommodation through change in lens curvature/focal length by ciliary muscles.','States that in myopia distant objects are focused in front of the retina.','Identifies a concave/diverging lens as the correction.','Explains that the corrective lens diverges incident light so the eye focuses it on the retina.'],explanation:'This combines accommodation with the optical basis of myopia correction.'});
      if(/^Electricity$/i.test(t)) add({id:'cb10-electricity-w1',marks:4,stem:'Explain, using the particle model of current, why the resistance of a metallic conductor increases when its temperature increases.',markScheme:['Recognises that conduction electrons move through a lattice of ions.','States that higher temperature increases lattice vibrations.','Explains that electron–lattice collisions become more frequent.','Links increased collisions to reduced ease of charge flow and therefore greater resistance.'],explanation:'The question connects microscopic behaviour to resistance.'});
      if(/Magnetic Effects of Electric Current/i.test(t)) add({id:'cb10-magnet-w1',marks:4,stem:'Explain the working principle of an electric motor. Include the role of the magnetic field, the force on a current-carrying conductor and the function of the split ring.',markScheme:['States that a current-carrying conductor in a magnetic field experiences a force.','Explains that forces on opposite sides of the coil produce a turning effect.','States that the split ring reverses current every half-turn.','Explains that this keeps the torque in the same rotational sense.'],explanation:'This is a theory question on the motor principle and split-ring commutator.'});
      if(/Our Environment/i.test(t)) add({id:'cb10-env-w1',marks:3,stem:'Explain why the concentration of a persistent, non-biodegradable pollutant can increase at higher trophic levels in a food chain.',markScheme:['States that the pollutant is not readily broken down or excreted.','Explains that it accumulates in organisms over time.','Explains biomagnification: predators consume many contaminated organisms, increasing concentration at successive trophic levels.'],explanation:'The response should explain biomagnification through a food chain.'});
    }

    // CBSE Class 12 Physics: syllabus-linked explanations and derivations.
    if(entry.board==='CBSE'&&entry.grade==='Class 12'&&s==='Physics'){
      if(/Electric Charges and Fields/i.test(t)) add({id:'cb12-efield-w1',marks:4,stem:'State Gauss’s law in electrostatics and explain why the net electric flux through a closed surface depends only on the net charge enclosed, not on charges outside the surface.',markScheme:['States the electric flux relation Φ = Q_enclosed/ε₀.','Identifies the surface as closed.','Explains that field lines from an external charge enter and leave the closed surface, giving cancelling net contributions to flux.','Distinguishes net flux from the value of electric field at individual points on the surface.'],explanation:'This tests the conceptual meaning of Gauss’s law.'});
      if(/Electrostatic Potential and Capacitance/i.test(t)) add({id:'cb12-cap-w1',marks:4,stem:'Explain what happens to the charge, potential difference and stored energy of an isolated charged parallel-plate capacitor when the plate separation is increased.',markScheme:['States that charge remains constant because the capacitor is isolated.','States that capacitance decreases as plate separation increases.','Uses V=Q/C to explain that potential difference increases.','Uses U=Q²/(2C) to explain that stored energy increases.'],explanation:'The response applies capacitance relations to an isolated capacitor.'});
      if(/Current Electricity/i.test(t)) add({id:'cb12-current-w1',marks:4,stem:'Explain the microscopic origin of electric current in a metal and derive the relation I = nAe v_d, defining each symbol.',markScheme:['Describes free charge carriers acquiring a small average drift velocity in an electric field.','Identifies n as number density, A as cross-sectional area, e as charge magnitude and v_d as drift speed.','Considers the charge crossing area A in a time interval.','Obtains I = nAe v_d with a logically correct derivation.'],explanation:'This is the standard drift-current relationship within Current Electricity.'});
      if(/Moving Charges and Magnetism/i.test(t)) add({id:'cb12-moving-w1',marks:4,stem:'Explain why a charged particle moving perpendicular to a uniform magnetic field follows a circular path, and derive an expression for the radius of that path.',markScheme:['States that magnetic force qvB is perpendicular to velocity.','Explains that the force changes direction of velocity but not speed and acts as centripetal force.','Equates qvB to mv²/r.','Derives r = mv/(qB) for magnitudes.'],explanation:'The answer connects magnetic force with uniform circular motion.'});
      if(/Electromagnetic Induction/i.test(t)) add({id:'cb12-emi-w1',marks:4,stem:'State Faraday’s law and Lenz’s law, then explain how Lenz’s law is consistent with conservation of energy.',markScheme:['States that induced emf is proportional to the rate of change of magnetic flux linkage.','States that induced current opposes the change that produces it.','Explains that if the induced effect reinforced the change, energy could increase without external work.','Links the opposing effect to the need for external work when changing the flux.'],explanation:'This tests both the induction laws and the physical meaning of the negative sign.'});
      if(/Alternating Current/i.test(t)) add({id:'cb12-ac-w1',marks:4,stem:'Explain the principle of a transformer and why a transformer cannot operate with a steady direct current.',markScheme:['Explains that alternating current in the primary produces changing magnetic flux in the core.','States that changing flux links the secondary and induces an emf by electromagnetic induction.','Relates voltage ratio to turns ratio qualitatively or quantitatively.','Explains that steady DC produces no continuing change in flux after switching, so no sustained secondary emf is induced.'],explanation:'The response tests transformer theory and electromagnetic induction.'});
      if(/Ray Optics/i.test(t)) add({id:'cb12-ray-w1',marks:4,stem:'Explain total internal reflection and state the two conditions required for it to occur. Then explain one optical application that relies on total internal reflection.',markScheme:['States that light is reflected completely back into the optically denser medium.','States that light must travel from higher refractive index to lower refractive index.','States that the incidence angle must exceed the critical angle.','Explains a valid application such as optical fibre transmission using repeated total internal reflection.'],explanation:'This tests the conditions and application of total internal reflection.'});
      if(/Wave Optics/i.test(t)) add({id:'cb12-wave-w1',marks:4,stem:'Explain how sustained interference fringes are produced in Young’s double-slit experiment and why coherent sources are required.',markScheme:['Describes superposition of waves from the two slits.','Links constructive and destructive interference to path/phase difference.','Defines coherent sources as having the same frequency with a constant phase difference.','Explains that a stable phase relationship is needed for stationary bright and dark fringes.'],explanation:'The response focuses on the theory of interference and coherence.'});
      if(/Dual Nature of Radiation and Matter/i.test(t)) add({id:'cb12-dual-w1',marks:4,stem:'Explain the photoelectric effect using Einstein’s photon model. Your answer should account for threshold frequency and the effect of increasing light intensity at fixed frequency above threshold.',markScheme:['States that light energy is transferred in photons of energy hf.','Explains that emission requires hf to be at least the work function, giving a threshold frequency.','Uses the excess photon energy to account for electron kinetic energy.','Explains that higher intensity increases photon flux and therefore photoelectron rate/current, not the maximum kinetic energy at fixed frequency.'],explanation:'This tests the photon explanation of the photoelectric effect.'});
      if(/Nuclei/i.test(t)) add({id:'cb12-nuclei-w1',marks:4,stem:'Explain the meaning of mass defect and binding energy, and explain why binding energy per nucleon is useful when comparing nuclear stability.',markScheme:['Defines mass defect as the difference between the mass of separated nucleons and the nucleus.','Uses E=Δmc² to connect mass defect with binding energy.','Defines binding energy as energy needed to separate the nucleus into its nucleons.','Explains that larger binding energy per nucleon generally indicates more tightly bound, more stable nuclei.'],explanation:'The response connects mass defect, binding energy and nuclear stability.'});
      if(/Semiconductor Electronics/i.test(t)) add({id:'cb12-semi-w1',marks:4,stem:'Explain how a p–n junction diode behaves in forward bias and reverse bias in terms of the depletion region and majority charge carriers.',markScheme:['Explains that forward bias reduces the depletion-region barrier/width.','States that majority carriers can cross the junction more readily in forward bias, producing substantial current.','Explains that reverse bias increases the depletion-region barrier/width.','States that reverse current is very small apart from minority-carrier effects until breakdown.'],explanation:'This tests p–n junction behaviour rather than circuit memorisation.'});
    }

    // CBSE Class 12 Chemistry: theory and reasoning from named syllabus chapters.
    if(entry.board==='CBSE'&&entry.grade==='Class 12'&&s==='Chemistry'){
      if(/^Solutions$/i.test(t)) add({id:'cb12-solutions-w1',marks:4,stem:'Explain positive and negative deviations from Raoult’s law in terms of intermolecular attractions, and relate each deviation to the vapour pressure of the solution.',markScheme:['States that ideal behaviour requires similar A–A, B–B and A–B interactions.','Explains positive deviation by weaker A–B attraction and greater escaping tendency/higher vapour pressure.','Explains negative deviation by stronger A–B attraction and lower escaping tendency/lower vapour pressure.','Connects the direction of deviation explicitly to the observed vapour pressure relative to ideal behaviour.'],explanation:'This is a theory question on non-ideal solutions and Raoult’s law.'});
      if(/Electrochemistry/i.test(t)) add({id:'cb12-electrochem-w1',marks:4,stem:'Explain how a galvanic cell converts chemical energy into electrical energy. Include oxidation, reduction, electron flow and the role of the salt bridge.',markScheme:['Identifies oxidation at the anode and reduction at the cathode.','States that electrons flow through the external circuit from anode to cathode.','Explains that the redox reaction provides the driving chemical energy for electrical work.','Explains that the salt bridge maintains electrical neutrality by ion migration and completes the internal circuit.'],explanation:'The response tests the operation of a galvanic cell.'});
      if(/Chemical Kinetics/i.test(t)) add({id:'cb12-kinetics-w1',marks:4,stem:'Distinguish between order of reaction and molecularity. State how each is obtained and give one reason why the two quantities need not be equal.',markScheme:['Defines order from the powers of concentration terms in the experimentally determined rate law.','Defines molecularity as the number of reacting species participating in a single elementary step.','States that order is obtained experimentally whereas molecularity follows from an elementary-step mechanism.','Explains that an overall reaction may involve multiple elementary steps, so its observed order need not equal a simple stoichiometric molecularity.'],explanation:'This tests a core conceptual distinction in Chemical Kinetics.'});
      if(/d- and f-Block Elements/i.test(t)) add({id:'cb12-df-w1',marks:4,stem:'Explain lanthanoid contraction and describe two consequences of it.',markScheme:['Defines the gradual decrease in atomic/ionic radii across the lanthanoid series.','Attributes it to poor shielding by 4f electrons as nuclear charge increases.','Gives a valid consequence such as similarity of 4d and 5d transition-element sizes.','Gives another valid consequence such as difficulty in separating lanthanoids because of similar ionic sizes/properties.'],explanation:'The response tests the cause and consequences of lanthanoid contraction.'});
      if(/Coordination Compounds/i.test(t)) add({id:'cb12-coord-w1',marks:4,stem:'Explain the terms ligand, coordination number and chelation, and explain why a multidentate ligand can form a chelate ring with a metal ion.',markScheme:['Defines a ligand as an electron-pair donor that forms coordinate bond(s) to a central metal atom/ion.','Defines coordination number as the number of donor atoms directly bonded to the metal.','Defines chelation as binding of a multidentate ligand through two or more donor atoms to the same metal centre.','Explains that multiple attachment points from one ligand create one or more ring structures containing the metal.'],explanation:'This tests basic bonding terminology in Coordination Compounds.'});
      if(/Haloalkanes and Haloarenes/i.test(t)) add({id:'cb12-halo-w1',marks:4,stem:'Compare the SN1 and SN2 mechanisms of nucleophilic substitution with respect to number of steps, rate dependence and the role of steric hindrance.',markScheme:['States that SN1 proceeds stepwise through a carbocation intermediate whereas SN2 is concerted.','States that an SN1 rate depends primarily on substrate concentration whereas SN2 depends on both substrate and nucleophile.','Explains that steric hindrance strongly slows backside attack in SN2.','Recognises that carbocation stability is important for SN1.'],explanation:'The response compares the core mechanistic features of SN1 and SN2 reactions.'});
      if(/Alcohols, Phenols and Ethers/i.test(t)) add({id:'cb12-alcohol-w1',marks:3,stem:'Explain why phenol is more acidic than ethanol.',markScheme:['States that deprotonation of phenol gives phenoxide ion whereas ethanol gives ethoxide ion.','Explains that negative charge in phenoxide is resonance-delocalised over the aromatic ring.','Explains that the ethoxide ion lacks comparable resonance stabilisation, making loss of H⁺ less favourable.'],explanation:'The response should use conjugate-base stability to compare acidity.'});
      if(/Aldehydes, Ketones and Carboxylic Acids/i.test(t)) add({id:'cb12-carbonyl-w1',marks:4,stem:'Explain why aldehydes and ketones undergo nucleophilic addition at the carbonyl group. Include the polarity of the C=O bond and the role of the nucleophile.',markScheme:['States that oxygen is more electronegative than carbon, making the carbonyl bond polar.','Identifies the carbonyl carbon as electron-deficient/electrophilic.','Explains that a nucleophile donates an electron pair to the carbonyl carbon.','Describes conversion of the C=O π bond during addition and subsequent protonation where appropriate.'],explanation:'This tests the electronic basis of nucleophilic addition to carbonyl compounds.'});
      if(/^Amines$/i.test(t)) add({id:'cb12-amines-w1',marks:4,stem:'Explain why amines behave as bases and discuss how availability of the nitrogen lone pair affects their basic strength.',markScheme:['States that the nitrogen lone pair can accept a proton, so amines act as Brønsted/Lewis bases.','Links greater availability of the lone pair to greater basicity.','Recognises that electron-donating groups can increase electron density on nitrogen.','Recognises that resonance delocalisation or electron-withdrawing effects can reduce availability of the lone pair and lower basicity.'],explanation:'The answer should connect amine basicity with the nitrogen lone pair.'});
      if(/Biomolecules/i.test(t)) add({id:'cb12-biomol-w1',marks:4,stem:'Explain the primary and secondary structures of proteins and describe the interactions responsible for stabilising common secondary structures.',markScheme:['Defines primary structure as the amino-acid sequence linked by peptide bonds.','Defines secondary structure as local regular folding such as α-helix or β-sheet.','Identifies hydrogen bonding between peptide backbone groups as a major stabilising interaction for secondary structure.','Distinguishes these backbone interactions from the amino-acid sequence itself.'],explanation:'This is a structural theory question from Biomolecules.'});
    }

    // Cambridge IGCSE Mathematics: written papers use structured/unstructured working.
    if(entry.board==='Cambridge IGCSE'&&s==='Mathematics'){
      if(/Algebra and Graphs/i.test(t)) add({id:'ig-math-alg-w1',marks:4,stem:'A quadratic graph y = x² - 6x + 5 crosses the x-axis at two points. Show algebraically that the roots are 1 and 5, then state the x-coordinate of the turning point and explain how it follows from the symmetry of the graph.',markScheme:['Correctly factorises x² - 6x + 5 as (x-1)(x-5).','Obtains roots x=1 and x=5.','States the axis of symmetry/turning-point x-coordinate is halfway between the roots: x=3.','Explains the result using symmetry of a parabola.'],explanation:'This is a structured algebra-and-graphs response requiring working and interpretation.'});
      if(/Trigonometry/i.test(t)) add({id:'ig-math-trig-w1',marks:4,stem:'In a right-angled triangle, explain how you decide whether to use sine, cosine or tangent when one acute angle and two side roles are involved. Then state the correct ratio for finding the opposite side when the hypotenuse is known.',markScheme:['Identifies sides relative to the chosen angle as opposite, adjacent and hypotenuse.','Explains that the required and known side roles determine the trigonometric ratio.','Selects sine when opposite and hypotenuse are involved.','States sin θ = opposite/hypotenuse.'],explanation:'The response tests right-triangle trigonometric reasoning, not generic exam planning.'});
      if(/Probability/i.test(t)) add({id:'ig-math-prob-w1',marks:4,stem:'Explain why probabilities on all mutually exclusive outcomes of a complete sample space add to 1. Then describe how this fact can be used to find the probability of the complement of an event A.',markScheme:['Recognises that exactly one outcome in a complete mutually exclusive sample space must occur.','States that total probability is therefore 1.','Identifies A and not-A as complementary events.','Obtains P(not A)=1-P(A).'],explanation:'This is a conceptual probability question connected to the syllabus.'});
    }

    // Cambridge IGCSE sciences: Theory papers explicitly use short-answer and structured questions.
    if(entry.board==='Cambridge IGCSE'&&(s==='Physics'||s==='Chemistry'||s==='Biology')){
      if(s==='Physics'){
        if(/Motion, Forces and Energy/i.test(t)) add({id:'ig-phy-motion-w1',marks:4,stem:'Explain the difference between mass and weight and describe what happens to each quantity if an object is moved from Earth to a location where gravitational field strength is smaller.',markScheme:['Defines mass as amount of matter/inertia and measured in kilograms.','Defines weight as gravitational force on an object.','States that mass remains unchanged.','Explains that weight decreases because W=mg and g is smaller.'],explanation:'This is a theory response from Motion, Forces and Energy.'});
        if(/Thermal Physics/i.test(t)) add({id:'ig-phy-thermal-w1',marks:4,stem:'Use the particle model to explain why the pressure of a fixed mass of gas in a sealed container increases when its temperature is increased at constant volume.',markScheme:['States that particles gain average kinetic energy as temperature rises.','Explains that particles move faster.','Explains that collisions with container walls become more frequent and/or involve greater momentum change.','Links increased force per unit area from collisions to higher gas pressure.'],explanation:'The response uses kinetic particle theory to explain gas pressure.'});
        if(/^Waves$/i.test(t)) add({id:'ig-phy-waves-w1',marks:4,stem:'Explain refraction of a wave at a boundary in terms of wave speed, wavelength and frequency.',markScheme:['States that wave speed changes on entering a different medium.','States that frequency remains unchanged because it is set by the source.','Uses v=fλ to explain that wavelength changes when speed changes.','Explains that direction changes for oblique incidence because different parts of a wavefront change speed at different times.'],explanation:'This tests the wave model of refraction.'});
        if(/Electricity and Magnetism/i.test(t)) add({id:'ig-phy-elec-w1',marks:4,stem:'Explain why connecting additional resistors in parallel decreases the total resistance of a circuit and increases the total current drawn from a fixed-voltage supply.',markScheme:['Explains that each parallel branch provides an additional path for charge.','Recognises that conductances add / equivalent resistance decreases.','Uses I=V/R qualitatively to connect lower total resistance with larger total current at fixed voltage.','Distinguishes total current from the current in any one branch.'],explanation:'This is a structured circuit explanation.'});
        if(/Nuclear Physics/i.test(t)) add({id:'ig-phy-nuclear-w1',marks:4,stem:'Compare alpha, beta and gamma radiation in terms of their nature, ionising ability and penetrating ability.',markScheme:['Correctly identifies alpha as helium nuclei, beta as fast electrons/positrons as relevant, and gamma as electromagnetic radiation.','Ranks alpha as strongly ionising and least penetrating.','Ranks gamma as weakly ionising and most penetrating.','Places beta between alpha and gamma for ionising and penetrating ability.'],explanation:'This tests the standard comparison of nuclear radiations.'});
      }
      if(s==='Chemistry'){
        if(/Atoms, Elements and Compounds/i.test(t)) add({id:'ig-chem-atom-w1',marks:4,stem:'Explain, using electronic structure, why elements in the same group of the Periodic Table have similar chemical properties.',markScheme:['States that chemical reactions involve outer-shell/valence electrons.','States that elements in the same group have the same number of outer-shell electrons for the main groups.','Links similar valence-electron configurations to similar ions/bonding behaviour.','Connects this to similar chemical reactions/properties.'],explanation:'The response links group position with electronic structure.'});
        if(/Stoichiometry/i.test(t)) add({id:'ig-chem-stoich-w1',marks:4,stem:'Explain why a balanced chemical equation is required before using mole ratios to calculate reacting masses.',markScheme:['States that equations must conserve atoms of each element.','Explains that coefficients give relative numbers of reacting particles/formula units.','Links those coefficients to mole ratios.','Explains that an unbalanced equation gives incorrect stoichiometric ratios and therefore incorrect calculated masses.'],explanation:'This tests the conceptual basis of stoichiometric calculations.'});
        if(/Electrochemistry/i.test(t)) add({id:'ig-chem-electro-w1',marks:4,stem:'During electrolysis of a molten ionic compound, explain how positive and negative ions move and what happens to them at the electrodes.',markScheme:['States that cations move to the negative electrode/cathode.','States that cations gain electrons and are reduced.','States that anions move to the positive electrode/anode.','States that anions lose electrons and are oxidised.'],explanation:'This is the particle-and-electron model of electrolysis.'});
        if(/Chemical Energetics/i.test(t)) add({id:'ig-chem-energy-w1',marks:4,stem:'Explain, using bond breaking and bond making, why a reaction can be exothermic.',markScheme:['States that energy is required to break bonds.','States that energy is released when new bonds form.','Explains that an exothermic reaction releases more energy in bond formation than it absorbs in bond breaking.','Links the energy difference to a net transfer of energy to the surroundings.'],explanation:'This tests the bond-energy explanation of exothermic reactions.'});
        if(/Acids, Bases and Salts/i.test(t)) add({id:'ig-chem-acid-w1',marks:4,stem:'Explain the difference between a strong acid and a weak acid of the same concentration in terms of ionisation and hydrogen-ion concentration.',markScheme:['States that a strong acid ionises essentially completely in water.','States that a weak acid ionises only partially.','Explains that at equal analytical concentration the strong acid generally produces a higher H⁺ concentration.','Connects higher H⁺ concentration to lower pH.'],explanation:'The response distinguishes acid strength from concentration.'});
        if(/Organic Chemistry/i.test(t)) add({id:'ig-chem-org-w1',marks:4,stem:'Explain what a homologous series is and why members of a homologous series have similar chemical properties but show gradual changes in physical properties.',markScheme:['Defines a homologous series as compounds with the same functional group and general formula.','States that successive members differ by CH₂.','Links similar chemical properties to the same functional group.','Links gradual physical-property changes to increasing molecular size/intermolecular forces.'],explanation:'This tests the structure of a homologous series.'});
      }
      if(s==='Biology'){
        if(/Movement In and Out of Cells/i.test(t)) add({id:'ig-bio-move-w1',marks:4,stem:'Explain osmosis in terms of water potential and a partially permeable membrane, then predict what happens to a plant cell placed in a concentrated sugar solution.',markScheme:['Defines osmosis as net movement of water through a partially permeable membrane from higher to lower water potential.','Identifies the concentrated sugar solution as having lower water potential than the cell contents.','Predicts net movement of water out of the plant cell.','Describes loss of turgor / plasmolysis where sufficiently severe.'],explanation:'This is a syllabus-linked osmosis explanation.'});
        if(/Enzymes/i.test(t)) add({id:'ig-bio-enzyme-w1',marks:4,stem:'Explain how temperature affects enzyme activity, including why activity falls rapidly above the optimum temperature.',markScheme:['Explains that increasing temperature initially increases kinetic energy and collision frequency.','Links more successful enzyme–substrate collisions to increased rate up to the optimum.','Explains that high temperature disrupts bonds maintaining enzyme shape.','States that the active site changes shape/denatures so substrate binds less effectively.'],explanation:'The response connects temperature with enzyme structure and collision rate.'});
        if(/Plant Nutrition/i.test(t)) add({id:'ig-bio-plant-w1',marks:4,stem:'Explain why increasing light intensity raises the rate of photosynthesis only up to a certain point.',markScheme:['States that light can be the limiting factor at low intensity.','Explains that increasing light increases the rate while light remains limiting.','Explains that another factor such as carbon dioxide concentration or temperature eventually becomes limiting.','States that further light increase then produces little or no further increase in rate.'],explanation:'This tests limiting factors in photosynthesis.'});
        if(/Transport in Animals/i.test(t)) add({id:'ig-bio-transport-w1',marks:4,stem:'Explain how the structure of an artery is adapted to carry blood away from the heart at high pressure.',markScheme:['Describes a thick wall containing muscle and elastic tissue.','Explains that the wall withstands high pressure.','Explains that elastic tissue stretches and recoils to help maintain pressure/flow.','Recognises the relatively small lumen compared with veins as part of the adaptation.'],explanation:'This is a structure–function question on arteries.'});
        if(/Diseases and Immunity/i.test(t)) add({id:'ig-bio-immunity-w1',marks:4,stem:'Explain how vaccination can produce long-term protection against a pathogen without causing the full disease.',markScheme:['States that a vaccine presents pathogen antigens in a safe form.','Explains activation of specific lymphocytes/immune response and antibody production.','States that memory cells are formed.','Explains that a later exposure produces a faster, stronger secondary immune response.'],explanation:'The response tests adaptive immunity and memory cells.'});
        if(/Inheritance/i.test(t)) add({id:'ig-bio-inherit-w1',marks:4,stem:'Explain why two parents who do not show a recessive genetic condition can have a child who does show the condition, assuming the condition is controlled by a single autosomal gene.',markScheme:['Explains that both unaffected parents can be heterozygous carriers.','States that the recessive allele is masked by the dominant allele in each parent.','Explains that each parent can pass the recessive allele to an offspring.','States that an offspring inheriting two recessive alleles expresses the recessive condition.'],explanation:'This is a monohybrid inheritance explanation.'});
        if(/Variation and Selection/i.test(t)) add({id:'ig-bio-selection-w1',marks:4,stem:'Explain how natural selection can increase the frequency of an advantageous allele in a population over many generations.',markScheme:['Recognises heritable variation in the population.','Explains that individuals with the advantageous phenotype have greater survival/reproductive success under the selection pressure.','States that these individuals pass the allele to more offspring.','Explains that repeated differential reproduction increases the allele frequency over generations.'],explanation:'The response tests the mechanism of natural selection.'});
      }
    }

    // Cambridge AS & A Level: written examinations include structured questions.
    if(entry.board==='Cambridge International AS & A Level'){
      if(s==='Physics'){
        if(/Kinematics/i.test(t)) add({id:'caie-phy-kin-w1',marks:4,stem:'Explain the distinction between displacement, velocity and acceleration, and describe what the gradient of a displacement–time graph and the gradient of a velocity–time graph represent.',markScheme:['Defines displacement as directed change in position.','Defines velocity as rate of change of displacement.','Defines acceleration as rate of change of velocity.','Identifies the graph gradients correctly: displacement–time → velocity; velocity–time → acceleration.'],explanation:'This is a structured theory response from kinematics.'});
        if(/^Waves$/i.test(t)) add({id:'caie-phy-wave-w1',marks:4,stem:'Explain the conditions required for stationary waves to form and describe two differences between a stationary wave and a progressive wave.',markScheme:['States that stationary waves arise from superposition of waves of the same frequency travelling in opposite directions.','Identifies nodes and antinodes / position-dependent amplitude.','States that there is no net energy transfer along an ideal stationary wave.','Contrasts this with a progressive wave, which transfers energy and has moving phase.'],explanation:'The response tests stationary-wave theory.'});
        if(/Electric Fields/i.test(t)) add({id:'caie-phy-efield-w1',marks:4,stem:'Define electric field strength and electric potential, then explain why electric field strength is related to the potential gradient.',markScheme:['Defines electric field strength as force per unit positive test charge.','Defines electric potential as work done per unit positive charge in bringing it from infinity/reference point.','Recognises that potential changes with position in an electric field.','States that the field points in the direction of greatest decrease of potential, expressed in one dimension as E = -dV/dx.'],explanation:'This links field strength and potential as required in electric-field theory.'});
        if(/Capacitance/i.test(t)) add({id:'caie-phy-cap-w1',marks:4,stem:'Explain the physical meaning of capacitance and describe how the energy stored in a capacitor changes as it is charged from zero potential difference to V.',markScheme:['Defines capacitance as charge stored per unit potential difference, C=Q/V.','Explains that work must be done to move charge onto the capacitor as potential difference rises.','Recognises the Q–V relationship for a linear capacitor.','Obtains or explains stored energy U=½QV=½CV² from the area under the Q–V relation.'],explanation:'The response connects capacitance with energy storage.'});
        if(/Quantum Physics/i.test(t)) add({id:'caie-phy-quant-w1',marks:4,stem:'Explain how the photoelectric effect provides evidence for a photon model of electromagnetic radiation.',markScheme:['States that energy is delivered in discrete photons with energy hf.','Explains threshold frequency as a minimum photon energy needed to overcome the work function.','Explains the near-immediate emission of electrons when photons have sufficient energy.','Explains why increasing intensity increases the number of emitted electrons but not their maximum kinetic energy at fixed frequency.'],explanation:'This is a standard quantum-physics explanation using photoelectric evidence.'});
      }
      if(s==='Chemistry'){
        if(/Chemical Bonding/i.test(t)) add({id:'caie-chem-bond-w1',marks:4,stem:'Use the ideas of electron-pair repulsion and bonding to explain why methane is tetrahedral but ammonia is trigonal pyramidal.',markScheme:['Identifies four electron pairs around carbon in CH₄ and four electron pairs around nitrogen in NH₃.','States that CH₄ has four bonding pairs and no lone pair, giving a tetrahedral arrangement.','States that NH₃ has three bonding pairs and one lone pair.','Explains that greater lone-pair repulsion changes the molecular shape to trigonal pyramidal and compresses bond angles.'],explanation:'The response applies electron-pair repulsion theory to molecular shape.'});
        if(/Chemical Energetics/i.test(t)) add({id:'caie-chem-energy-w1',marks:4,stem:'Explain Hess’s law and why enthalpy change for a reaction is independent of the route taken between the same initial and final states.',markScheme:['States that enthalpy is a state function / depends only on state.','States Hess’s law: total enthalpy change is independent of route.','Explains that alternative reaction pathways with the same initial and final states must give the same overall ΔH.','Connects this to constructing enthalpy cycles for reactions that are difficult to measure directly.'],explanation:'This is a syllabus-linked explanation of Hess’s law.'});
        if(/Equilibria/i.test(t)) add({id:'caie-chem-eq-w1',marks:4,stem:'Explain, using Le Chatelier’s principle and collision ideas, how increasing pressure affects the equilibrium position of a gaseous reaction when the two sides contain different total numbers of gas molecules.',markScheme:['States that increasing pressure corresponds to decreasing volume / greater collision frequency.','States that equilibrium shifts toward the side with fewer gas molecules.','Explains this as a response that tends to oppose the imposed pressure increase.','Recognises that the equilibrium constant is unchanged if temperature is unchanged.'],explanation:'The response links pressure changes to gaseous equilibrium.'});
        if(/Reaction Kinetics/i.test(t)) add({id:'caie-chem-kin-w1',marks:4,stem:'Use collision theory to explain how a catalyst increases reaction rate without changing the equilibrium constant.',markScheme:['States that a catalyst provides an alternative reaction pathway.','States that the alternative pathway has lower activation energy.','Explains that a greater fraction of collisions are successful at the same temperature.','Explains that forward and reverse reactions are both accelerated, so the equilibrium constant/position is not changed by the catalyst itself.'],explanation:'This tests collision theory and catalysis.'});
        if(/Entropy and Gibbs Energy/i.test(t)) add({id:'caie-chem-gibbs-w1',marks:4,stem:'Explain how enthalpy change, entropy change and temperature combine to determine the thermodynamic feasibility of a process using ΔG = ΔH - TΔS.',markScheme:['States the Gibbs relationship ΔG=ΔH-TΔS.','States that a negative ΔG corresponds to thermodynamic feasibility under the stated conditions.','Explains that the entropy contribution is multiplied by absolute temperature.','Recognises that changing temperature can therefore change the sign of ΔG when ΔH and ΔS have suitable signs.'],explanation:'The response interprets Gibbs energy rather than simply substituting numbers.'});
      }
      if(s==='Biology'){
        if(/Cell Membranes and Transport/i.test(t)) add({id:'caie-bio-membrane-w1',marks:4,stem:'Explain how the fluid mosaic model accounts for both selective permeability and cell signalling at the plasma membrane.',markScheme:['Describes a phospholipid bilayer with hydrophilic heads and hydrophobic interior.','Explains that the hydrophobic core restricts passage of many polar/charged substances.','Identifies membrane proteins as channels/carriers that provide selective transport pathways.','Identifies receptor proteins/glycoproteins as allowing specific signal recognition and communication.'],explanation:'This is a structure–function explanation of the fluid mosaic membrane.'});
        if(/Nucleic Acids and Protein Synthesis/i.test(t)) add({id:'caie-bio-dna-w1',marks:5,stem:'Explain how the base sequence of a gene can determine the amino-acid sequence of a polypeptide.',markScheme:['Explains transcription of a DNA template into complementary mRNA.','States that mRNA is read as triplet codons.','Explains that tRNA anticodons pair with complementary codons.','States that each tRNA carries a specific amino acid.','Explains that peptide bonds join amino acids in the order specified by the codon sequence.'],explanation:'The response links DNA sequence to polypeptide sequence through transcription and translation.'});
        if(/Immunity/i.test(t)) add({id:'caie-bio-immune-w1',marks:5,stem:'Explain the roles of clonal selection, plasma cells and memory cells in a specific immune response to an antigen.',markScheme:['States that an antigen selects/activates lymphocytes with complementary receptors.','Explains clonal expansion by mitosis.','States that plasma cells secrete specific antibodies.','States that memory cells persist after the primary response.','Explains that memory cells produce a faster, larger secondary response on re-exposure.'],explanation:'This tests the cellular basis of specific immunity.'});
        if(/Photosynthesis/i.test(t)) add({id:'caie-bio-photo-w1',marks:5,stem:'Explain how the light-dependent reactions of photosynthesis provide the ATP and reduced NADP needed for the Calvin cycle.',markScheme:['Describes absorption of light by chlorophyll and excitation of electrons.','Explains electron transfer through carriers and photophosphorylation producing ATP.','Explains photolysis of water and replacement of electrons / release of oxygen.','Explains reduction of NADP using electrons and protons.','Links ATP and reduced NADP to carbon fixation/reduction reactions of the Calvin cycle.'],explanation:'The response links the two stages of photosynthesis.'});
        if(/Homeostasis/i.test(t)) add({id:'caie-bio-homeo-w1',marks:5,stem:'Explain how negative feedback maintains blood glucose concentration when it rises above the normal range after a carbohydrate-rich meal.',markScheme:['Identifies the rise in blood glucose as the detected change.','States that pancreatic beta cells secrete insulin.','Explains increased glucose uptake and/or glycogen synthesis in target tissues such as liver/muscle.','Explains that blood glucose concentration falls toward the set point.','Explains that reduced deviation decreases the corrective insulin response, characteristic of negative feedback.'],explanation:'This is a homeostatic negative-feedback explanation.'});
        if(/Selection and Evolution/i.test(t)) add({id:'caie-bio-evo-w1',marks:5,stem:'Explain how natural selection can lead to evolutionary change in allele frequencies when a population is exposed to a persistent selection pressure.',markScheme:['Recognises pre-existing heritable variation / different alleles in the population.','Explains differential survival and reproductive success under the selection pressure.','States that advantageous alleles are passed to a greater proportion of offspring.','Explains that allele frequencies change over successive generations.','Connects cumulative allele-frequency change with evolution of the population.'],explanation:'The response explains evolution through changes in allele frequency.'});
      }
      if(s==='Mathematics'){
        if(/Pure Mathematics: Trigonometry/i.test(t)) add({id:'caie-math-trig-w1',marks:5,stem:'Starting from sin²θ + cos²θ = 1, derive an identity involving 1 + tan²θ and sec²θ. State any restriction needed while dividing by cos²θ.',markScheme:['Starts with sin²θ + cos²θ = 1.','Divides all terms by cos²θ.','Uses sinθ/cosθ = tanθ and 1/cosθ = secθ.','Obtains 1 + tan²θ = sec²θ.','States that cosθ ≠ 0 for the division to be valid.'],explanation:'This is a structured derivation within trigonometry.'});
        if(/Pure Mathematics: Differentiation/i.test(t)) add({id:'caie-math-diff-w1',marks:5,stem:'For a differentiable function y=f(x), explain geometrically what f′(x) represents and how the signs of f′(x) and f″(x) can be used when analysing a stationary point.',markScheme:['Identifies f′(x) as the gradient of the tangent / instantaneous rate of change.','States that a stationary point has f′(x)=0.','Explains that a sign change from positive to negative in f′ indicates a local maximum and negative to positive a local minimum.','Uses f″>0 at a stationary point as evidence of a local minimum.','Uses f″<0 at a stationary point as evidence of a local maximum, while recognising f″=0 may be inconclusive.'],explanation:'The response tests the interpretation of derivatives rather than a routine calculation.'});
        if(/Statistics: Hypothesis Tests/i.test(t)) add({id:'caie-math-hyp-w1',marks:5,stem:'Explain the roles of the null hypothesis, alternative hypothesis, significance level and p-value in a hypothesis test, and state the decision rule using the p-value.',markScheme:['Defines the null hypothesis as the default claim tested.','Defines the alternative hypothesis as the competing claim.','Defines the significance level as the chosen threshold for rejecting H₀.','Defines the p-value as the probability, assuming H₀, of data at least as extreme as observed in the relevant direction(s).','States that H₀ is rejected when p-value ≤ significance level.'],explanation:'This is a conceptual statistics question from hypothesis testing.'});
      }
    }
    return out;
  }

  function buildQuestionsForEntry(entry){
    return [...curriculumCurated(entry),...curriculumWritten(entry)];
  }

  let cq={questions:[],index:0,correct:0,objective:0,written:0,finished:false};

  function currentCurriculumEntries(){
    const board=$('#quiz-board')?.value,grade=$('#quiz-grade')?.value,subject=$('#quiz-subject')?.value,topic=$('#quiz-chapter')?.value;
    return bridge.getCurriculum().filter(e=>e.board===board&&e.grade===grade&&e.subject===subject&&(topic==='all'||e.title===topic));
  }

  function refreshQuestionMix(){
    const select=$('#quiz-question-mix');
    if(!select)return;
    const entries=currentCurriculumEntries();
    const hasWritten=entries.some(e=>curriculumWritten(e).length>0);
    const previous=select.value;
    select.innerHTML=hasWritten
      ? '<option value="mixed">Mixed · objective + syllabus written</option><option value="objective">Objective / typed answer</option><option value="written">Written response</option>'
      : '<option value="objective">Objective / typed answer</option>';
    if([...select.options].some(o=>o.value===previous))select.value=previous;
    const note=$('#quiz-written-note');
    if(note){
      if(hasWritten) note.textContent='Written questions are shown only where this qualification uses constructed responses and StudyAI has a curated syllabus-linked question for the selected material.';
      else note.textContent='No curated board-style written response is available for this selection. StudyAI will not generate a generic filler question.';
    }
  }

  function addCurriculumControls(){
    const grid=$('#quiz-setup .setup-grid');
    if(!grid||$('#quiz-question-mix'))return;
    const difficulty=document.createElement('label');
    difficulty.innerHTML='Difficulty<select id="quiz-difficulty"><option value="exam" selected>Exam standard</option><option value="challenge">Challenge</option></select>';
    const mix=document.createElement('label');
    mix.innerHTML='Question mix<select id="quiz-question-mix"></select>';
    grid.append(difficulty,mix);
    const note=document.createElement('p');
    note.id='quiz-written-note';
    note.className='exam-format-note';
    grid.insertAdjacentElement('afterend',note);
    const head=$('#practice .section-head p:last-child');
    if(head)head.textContent='Original syllabus-linked exam practice. Written responses appear only when the selected qualification actually assesses constructed responses and a curated question exists.';
    ['quiz-board','quiz-grade','quiz-subject','quiz-chapter'].forEach(id=>{
      $('#'+id)?.addEventListener('change',()=>setTimeout(refreshQuestionMix,0));
    });
    refreshQuestionMix();
  }

  function buildCurriculumSet(){
    const requested=Number($('#quiz-length')?.value)||10;
    const mix=$('#quiz-question-mix')?.value||'objective';
    const difficulty=$('#quiz-difficulty')?.value||'exam';
    const entries=currentCurriculumEntries();
    if(!entries.length)return [];
    let bank=entries.flatMap(buildQuestionsForEntry);
    if(mix==='objective')bank=bank.filter(q=>q.type!=='written');
    if(mix==='written')bank=bank.filter(q=>q.type==='written');
    if(difficulty==='challenge'){
      const hard=bank.filter(q=>q.difficulty==='Challenge'||q.type==='written');
      if(hard.length)bank=hard;
    }
    return random(bank).slice(0,Math.min(requested,bank.length));
  }

  function startCurriculumQuiz(){
    const questions=buildCurriculumSet();
    if(!questions.length){
      const result=$('#quiz-result');
      if(result){result.classList.remove('hidden');result.innerHTML='<span class="small-label">No filler questions</span><h3>No curated questions match this selection yet.</h3><p>StudyAI will not invent a generic written response just to fill the set. Choose another topic, question type, or difficulty while this syllabus bank is expanded.</p>';}
      return;
    }
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