/*
 * Post-audit curriculum-checked revisions for "The World of Numbers".
 * Sources used for scope: 2026–27 official CBSE Mathematics IX Unit I,
 * and NCERT Ganita Manjari Ch 3 (iemh103.pdf, 27 pp).
 * These teaching paragraphs and examples are original, not textbook copies.
 *
 * Rational exponents and conjugate rationalisation are optional algebraic
 * enrichment: they are not listed under the CBSE 2026–27 Number System unit,
 * nor taught as sections in the new Ganita Manjari Chapter 3.
 */
(() => {
'use strict';
const chapter=window.CBSE_CLASS9_MATH_FULL_NOTES?.['The World of Numbers'];
if(!chapter || chapter._studyaiVerifiedRevision)return;
const section=title=>{
 const found=chapter.sections.find(item=>item.title===title);
 if(!found)throw Error('Missing original teaching topic: '+title);
 return found;
};
const add=(title,topics)=>{
 const s=section(title);
 s.subtopics=[...(s.subtopics||[]),...topics];
};
add('Constructing square-root lengths',[
  {
    title:'Compass construction: locating √2 exactly on the number line',
    paragraphs:[
      'The statement “transfer the hypotenuse to the number line” is short, but the construction deserves to be shown completely. First choose a scale such as 1 unit = 3 cm. Draw a horizontal ray beginning at O and mark A one unit to the right. At A construct a perpendicular and mark B one unit above A. Join O to B. The right angle at A guarantees OB²=OA²+AB²=1+1=2, so OB is exactly √2 units.',
      'To locate the number, place the needle of a compass at O and open it to the length OB. Without changing the compass opening, draw an arc to cross the positive ray at P. The arc consists of points exactly OB units from O, so OP=OB=√2. The point P represents √2 exactly. The value lies between 1 and 2 because 1²<2<2².',
      'The compass step is the link between a right-triangle length and a number-line position. Merely drawing a rough tick at 1.41 would be an approximation, not an exact Euclidean construction. State the chosen unit and label the right angle.'
    ],
    formulas:['OB²=1²+1²=2','OP=OB=√2'],
    examples:[{
      title:'Reproduce a full construction',
      question:'Construct the exact point representing √2 on a given number line.',
      steps:['Choose a clear unit length and mark OA=1 on the positive ray.','At A draw AB perpendicular to OA with AB=1.','Join O to B. By the right-triangle theorem, OB=√2.','Centre the compass at O, take radius OB, and mark its intersection P with the positive ray.','Label P as √2 and explain why OP=OB.'],
      answer:'P is the exact location of √2.'
    }]
  },
  {
    title:'Compass construction: locating √3 from the √2 length',
    paragraphs:[
      'Once the point P representing √2 is constructed on the positive number line, we can use a second right triangle. Erect a perpendicular at P and mark Q one unit above P. The first leg of right triangle OPQ has length OP=√2, while the second leg PQ=1. Therefore OQ²=(√2)²+1²=3 and OQ=√3.',
      'Place the compass needle at O, open it to OQ, and draw an arc to cross the positive ray at R. Since OR=OQ=√3, R is the exact number-line point for √3. Its location must be between 1 and 2, since 1<√3<2. In particular √3>√2, so R must lie to the right of P.',
      'Repeating this process is the mathematical principle of the square-root spiral. The spiral itself is a chain of right triangles; the compass transfer is the extra action that turns their hypotenuse lengths into positions along one straight number line.'
    ],
    formulas:['OQ²=OP²+PQ²=2+1=3','OR=OQ=√3'],
    examples:[{
      title:'Explain why each compass mark is exact',
      question:'An existing segment OP measures √2. How can you locate √3 on the same positive number line?',
      steps:['At P, make a perpendicular segment PQ of length 1 unit.','Join O and Q, creating a right triangle.','Calculate OQ²=OP²+PQ²=2+1=3, hence OQ=√3.','Use centre O and compass radius OQ to intersect the ray at R.','Label R=√3; verify R is right of P but left of 2.'],
      answer:'OR=√3 exactly.'
    }]
  }
]);
section('Constructing square-root lengths').figureId='root3Compass';

const decimalTopic={
 title:'Locating terminating decimals by successive magnification',
 paragraphs:[
  'A number such as 2.665 can be located on a number line exactly because it is a terminating decimal. It equals 2665/1000, so its position is a rational point. One way to locate it is to divide a whole unit into 1000 equal steps, but that is difficult to draw. Successive magnification is a clearer way to represent the same position.',
  'Begin with the interval from 2 to 3. The first decimal digit after the point is 6, so divide that unit into ten equal pieces and focus on 2.6 to 2.7. On a second, enlarged number line, divide this tenth into ten equal pieces and focus on 2.66 to 2.67. On a third enlargement, divide that hundredth into ten equal parts; 2.665 is the fifth thousandth-step from 2.660 and is exactly midway between 2.66 and 2.67.',
  'Each “zoom” changes the visual scale, but not the number. A point one fifth of the way through an interval remains that same mathematical point when a diagram is enlarged. The purpose of magnification is to make a very small distance visible without drawing 1000 tick marks on a single ruler.',
  'The official new NCERT chapter asks students to plot decimal rationals on the number line. Successive magnification is a particularly helpful visual method for that task, although the 2026–27 textbook does not explicitly make the named method a separate compulsory section.'
 ],
 figureId:'decimalZoom',
 subtopics:[
  {
    title:'Zoom 1: find the tenths interval',
    paragraphs:[
      'Draw marks at 2, 2.1, 2.2, …, 3.0. Because 2.665 is between 2.6 and 2.7, keep that small interval and imagine enlarging it to the width of a new number line. The rest of the 2-to-3 interval can be set aside for this stage.'
    ]
  },
  {
    title:'Zoom 2: find the hundredths interval',
    paragraphs:[
      'Divide 2.6 to 2.7 into ten equal parts: 2.60, 2.61, 2.62, …, 2.70. The target 2.665 lies between 2.66 and 2.67. Select that interval for another enlargement. Notice that each step now equals 0.01, one hundredth of the original whole unit.'
    ]
  },
  {
    title:'Zoom 3: find the exact thousandth position',
    paragraphs:[
      'Divide 2.66 to 2.67 into ten equal parts. Their coordinates are 2.660, 2.661, 2.662, …, 2.670. The point 2.665 lies at the fifth tick after 2.660. Since five thousandths is half of one hundredth, it is also exactly the midpoint of the enclosing interval.',
      'This gives an exact plotted rational value in principle. In a physical sketch, line thickness can limit practical precision, so always give the fraction or decimal that identifies the point.'
    ]
  }
 ],
 formulas:['2.665=2665/1000=533/200','2.665=2.66+0.005'],
 examples:[
  {title:'Example: locate 2.665 by three zooms',
   question:'On three number lines of increasing scale, identify the position of 2.665.',
   steps:['Between 2 and 3, select 2.6 to 2.7.','Within 2.6–2.7, select 2.66 to 2.67.','Divide 2.66–2.67 into ten parts of 0.001 each.','The fifth mark after 2.660 is exactly 2.665.'],answer:'2.665 is midway between 2.66 and 2.67.'},
  {title:'Exam-style application: plotting a decimal from the chapter',question:'Give the final small interval and the exact position of 0.532.',steps:['0.532 lies between 0.5 and 0.6.','Zoom into 0.53 to 0.54.','Divide 0.530–0.540 into ten equal steps of 0.001.','Count two steps beyond 0.530.'],answer:'0.532 is the second thousandth mark after 0.530.'}
 ],
 tip:'Count the decimal places: each zoom adds one power of ten. Label the numbers at both ends of every enlarged interval.'
};
const pos=chapter.sections.findIndex(s=>s.title==='Comparing, ordering and approximating real numbers');
chapter.sections.splice(pos>=0?pos:chapter.sections.length-1,0,decimalTopic);

add('Properties, inclusion and classification of number sets',[
  {
    title:'The real line is a one-to-one correspondence',
    paragraphs:[
      'Every real number is associated with one unique point of the real number line, and every point of that line corresponds to one real number. This includes integers, fractions, terminating decimals, repeating decimals and irrational quantities such as √2.',
      'Different notations can describe the same point. For example, 1/2, 0.5 and 50% are the same real number. Conversely, different real numbers correspond to different points, no matter how close they are. This exact correspondence is why the real number line has no gaps.',
      'A rational approximation such as 1.414 is a different point from exact √2, even though it lies nearby. The two are not equal; further decimal places reduce the difference but no finite truncation equals the irrational number.'
    ]
  }
]);

add('Decimal expansions of real numbers',[
  {
    title:'The cyclic number in the repeating digits of 1/7',
    paragraphs:[
      'The decimal of 1/7 repeats the six-digit block 142857. The block has a special multiplication property: multiplying 142857 by 2, 3, 4, 5 or 6 rearranges the same digits in a rotation. For example, 142857×2=285714 and 142857×3=428571.',
      'The connection to fractions is instructive. The decimals 1/7, 2/7, …, 6/7 all cycle through digits from the same six-digit orbit. Multiplication of the recurring block has a predictable six-digit rotation because division by 7 cycles through the same nonzero remainders in different starting positions.',
      'This property is special, not an attribute of every repeating decimal. For instance 1/11 repeats “09” but does not produce a six-digit cyclic number. Identifying a repeating decimal and identifying a cyclic block are related but distinct ideas.'
    ],
    formulas:['142857×2=285714','142857×3=428571','142857×6=857142'],
    examples:[{
      title:'Recognise a cyclic rotation',
      question:'Compute 142857×4 and explain the digit pattern.',
      steps:['Multiply 142857 by 4 to obtain 571428.','Write the original digits 1,4,2,8,5,7 as a circle.','Read from the digit 5 to obtain 571428, a cyclic rotation.'],
      answer:'571428; it uses exactly the same digits in cyclic order.'
    }]
  }
]);

const extra=chapter.sections.find(s=>s.extension);
if(!extra)throw Error('Optional extension lesson is missing');
extra.title='Additional algebra practice (not prescribed in Chapter 3)';
extra.paragraphs=[
  'This additional algebra practice is included for schools that go beyond the 2026–27 revised NCERT chapter, and for students who want preparation for later surd and exponent problems. The official 2026–27 CBSE Class IX Number System syllabus lists rational numbers and their density, decimal representations, irrationality proofs and the square-root spiral, not these extra exponent or conjugate exercises.',
  'These topics remain fully explained rather than hidden, but they are not labelled mandatory Ganita Manjari Chapter 3 material. A teacher may still include them in additional school exercises, so use your school’s instructions when deciding how far to practise.'
];
extra.exam_warning='Course scope: fractional exponents and conjugate rationalisation are additional algebra practice. They do not appear as compulsory topics in the current Ganita Manjari Chapter 3 or CBSE Number System unit.';
extra.subtopics=[...(extra.subtopics||[]),
  {
    title:'Why the zero exponent is one (when the base is nonzero)',
    paragraphs:[
      'Suppose a is a nonzero real number. Division of a number by itself gives 1, so a³/a³=1. The exponent law aᵐ/aⁿ=aᵐ⁻ⁿ would also describe the same quotient as a³⁻³=a⁰. To make the laws consistent, a⁰ must equal 1 for every nonzero a.',
      'The restriction matters: taking a=0 would require dividing 0³ by itself, namely 0/0, which is undefined. So the familiar zero-power law does not prove a value for 0⁰.',
      'Negative exponents are a further consequence of the quotient law: a²/a⁵=a⁻³, but cancelling factors in the fraction gives 1/a³. Thus a⁻³=1/a³ as long as a≠0.'
    ],
    formulas:['a⁰=aᵏ/aᵏ=1, if a≠0','a⁻ⁿ=1/aⁿ, if a≠0']
  },
  {
    title:'Advanced worked example: nested negative rational powers',
    paragraphs:[
      'A complicated product of rational powers becomes easier when each base is rewritten as a single perfect power. The goal is to use one consistent exponent law at a time. Writing the intermediate bases in the form (p/q)ⁿ often exposes exact cancellation.',
      'For fractional powers, start with positive bases so the roots are unambiguously real. Multiplying factors with the same base adds their exponents; raising a power to another power multiplies the exponents; dividing by a negative power is equivalent to multiplying by the corresponding positive power.'
    ],
    examples:[
      {
        title:'Hard tier: two nested expressions simplify to 1',
        question:'Simplify (81/16)^(−3/4) × [ (25/9)^(−3/2) ÷ (5/2)^(−3) ].',
        steps:[
          'Express 81/16=(3/2)^4, so (81/16)^(−3/4)=(3/2)^(−3)=8/27.',
          'Express 25/9=(5/3)^2, so (25/9)^(−3/2)=(5/3)^(−3)=27/125.',
          'Compute (5/2)^(−3)=(2/5)^3=8/125.',
          'Inside the brackets, (27/125) ÷ (8/125)=27/8.',
          'Now multiply (8/27)×(27/8).'
        ],
        answer:'1.'
      },
      {
        title:'Hard tier: combine three fractional powers',
        question:'Simplify [ (32/243)^(−2/5) × (9/16)^(3/2) ] ÷ (3/2)^(−1).',
        steps:[
          'Since 32/243=(2/3)^5, the first factor is (2/3)^(−2)=9/4.',
          'Since 9/16=(3/4)^2, the second factor is (3/4)^3=27/64.',
          'The product in brackets is (9/4)(27/64)=243/256.',
          'Because (3/2)^(−1)=2/3, division by it multiplies by 3/2.',
          'Compute (243/256)(3/2)=729/512.'
        ],
        answer:'729/512.'
      }
    ]
  }
];
extra.tip='Optional advanced work; do not mistake it for official Chapter 3 examination scope.';

for(const s of chapter.sections){
  if(Array.isArray(s.subtopics) && s.subtopics.length){
    // Every genuine lesson already teaches the ideas in ordered subsections.
    // The older accumulation of synopsis + generic paragraphs repeats those
    // subsections and buries the pedagogy; leave examples and definitions in place.
    s.paragraphs=[];
  }
}
chapter.lead='Textbook-focused lessons for the 2026–27 NCERT Ganita Manjari Chapter 3. Start with the explanations, examine the exact number-line figures, then work through the solved examples. An explicitly labelled additional algebra lesson is available after the core work.';
chapter._studyaiVerifiedRevision=true;
window.STUDYAI_WORLD_OF_NUMBERS_STATUS={
 ...window.STUDYAI_WORLD_OF_NUMBERS_STATUS,
 lessonCount:chapter.sections.length,
 workedExamples:chapter.sections.reduce((sum,s)=>sum+(s.examples?.length||0)+
 (s.subtopics||[]).reduce((n,p)=>n+(p.examples?.length||0),0),0),
 figureCount:chapter.sections.filter(s=>s.figureId).length,
 noteSource:'Official NCERT Ganita Manjari 2026–27 Chapter 3, and CBSE Class IX Mathematics 2026–27 Unit I'
};
})();