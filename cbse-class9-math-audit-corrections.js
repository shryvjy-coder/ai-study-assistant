/*
 * StudyAI 2026–27 Chapter 3 quality corrections after independent review.
 * Applies to CBSE Class 9 / Ganita Manjari / The World of Numbers.
 * The CBSE 2026–27 Unit I number-system requirements are the core course.
 * Rational exponents, conjugates, and the general semicircle theorem are
 * explicitly labelled enrichment, not falsely described as prescribed
 * exercises in the new edition.
 */
(() => {
'use strict';
const chapter=window.CBSE_CLASS9_MATH_FULL_NOTES?.['The World of Numbers'];
if(!chapter||chapter._studyaiAuditCorrections)return;
const byTitle=title=>{
 const section=chapter.sections.find(item=>item.title===title);
 if(!section)throw Error('Missing chapter topic '+title);
 return section;
};
const teach=(title,subtopics)=>{
 const section=byTitle(title);
 section.subtopics=[...(section.subtopics||[]),...subtopics];
};
const worked=(title,examples)=>{
 const section=byTitle(title);
 section.examples=[...(section.examples||[]),...examples];
};
teach('Natural numbers, zero and integers',[
 {title:'Absolute value means distance, including in expressions',
 paragraphs:[
  'For any real number a, |a| is its nonnegative distance from zero. Thus |−9|=9, |0|=0 and |7|=7. The bars do not always mean “erase a negative sign”: for an expression such as |3−8|, calculate inside first. Because 3−8=−5, the value is 5.',
  'The distance between positions a and b is |a−b|. For −4 and 3, this is |−4−3|=7. Distance is the same in either direction because |a−b|=|b−a|.',
  'An equation |x−3|=5 describes all points a distance 5 from the point 3. There are two: x=8 and x=−2. Algebraically, x−3=5 or x−3=−5. This is a useful extension of the number-line idea; always check both possible directions.'
 ],
 formulas:['|x| = x if x≥0; |x| = −x if x<0','Distance(a,b) = |a−b|'],
 examples:[{title:'Worked example: two absolute-value branches',question:'Solve |x−3|=5.',steps:['A distance of 5 can be measured to either side of 3.','Case 1: x−3=5, giving x=8.','Case 2: x−3=−5, giving x=−2.','Check: |8−3|=5 and |−2−3|=5.'],answer:'x=−2 or x=8.'}]},
 {title:'Counting in twelves: the finger-joint system',
 paragraphs:[
  'A common historical counting method uses the thumb of one hand to touch the three finger segments on each of the other four fingers. This gives 4×3=12 countable positions. It helps explain why groups of twelve, called dozens, became convenient in many cultures.',
  'A number base decides when we regroup: in base ten we regroup after ten units; in base twelve we regroup after twelve. Twelve also has several divisors (2, 3, 4 and 6), which makes dividing a dozen objects into equal groups convenient.',
  'This is historical enrichment, not a change to how ordinary decimal arithmetic works. Ten and twelve are both positive integers, but their written representations depend on the numeral base.'
 ]}
]);
teach('Rational numbers',[
 {title:'What does “undefined” mean for division by zero?',
 paragraphs:[
  'The fraction 5/0 is undefined: no number multiplied by zero equals five. The expression 0/0 is also undefined as an ordinary numerical quotient, because every number multiplied by zero equals zero, so there is no unique quotient.',
  'You may hear 0/0 called an “indeterminate form” in later calculus. There it describes limits requiring additional information. In Class 9 arithmetic, the accurate conclusion is that neither 5/0 nor 0/0 has a defined numerical value.'
 ]}
]);
teach('Density of rational numbers',[
 {title:'Find exactly n fractions using equal spacing',
 paragraphs:[
  'The midpoint method shows infinitely many rational values exist, but you can also construct exactly n evenly spaced rationals between a and b. Divide the gap b−a into n+1 equal parts. The interior points are a+(b−a)/(n+1), a+2(b−a)/(n+1), …, a+n(b−a)/(n+1). Each lies strictly between the endpoints when a<b.',
  'An equivalent school method starts by writing the endpoints over a common denominator D as A/D and B/D, where A<B are integers. Multiply BOTH equivalent fractions by (n+1)/(n+1). Their numerators are now (n+1)A and (n+1)B, separated by at least n+1, so at least n distinct integer numerators fit in between. Do not apply the multiplication before making the original denominators equal.'
 ],
 formulas:['rₖ=a+k(b−a)/(n+1), for k=1,2,…,n and a<b'],
 examples:[{title:'Worked example: three fractions by numerator enlargement',question:'Insert three rationals between 1/4 and 1/2.',steps:['Rewrite both over denominator 4: 1/4 and 2/4.','For n=3, multiply numerator and denominator of both by n+1=4.','The endpoints become 4/16 and 8/16.','Choose the three successive integer numerators 5,6,7.'],answer:'5/16, 6/16, 7/16.'}]}
]);
teach('Why √2 is irrational',[
 {title:'Why the proof for √3 also reaches a contradiction',
 paragraphs:[
  'Assume √3=p/q is a fraction in lowest terms. Then p²=3q², so 3 divides p². Since 3 is prime, divisibility of p² by 3 implies divisibility of p by 3. Write p=3k.',
  'Substitution gives 9k²=3q² and hence q²=3k². Consequently q² is divisible by 3, so q itself is divisible by 3. Thus both p and q share the factor 3, contradicting the assumption that they are coprime.',
  'Explicitly stating why q is divisible by 3 completes the proof. The contradiction is not merely that both squares contain a factor 3; it is that their original integer bases must do so.'
 ],
 formulas:['If prime p divides n², then p divides n'],
 examples:[{title:'Exam-ready √3 proof',question:'Prove that √3 is irrational.',steps:['Suppose √3=a/b in lowest terms.','Then a²=3b², so 3|a². Since 3 is prime, 3|a; let a=3k.','Now 9k²=3b², hence b²=3k². Since 3|b², we also have 3|b.','Both a and b are multiples of 3, contrary to lowest terms.'],answer:'The assumption fails; therefore √3 is irrational.'}]}
]);
teach('Constructing square-root lengths',[
 {title:'Naming and understanding the square-root spiral',
 paragraphs:[
  'The successive right-triangle construction is widely called the Spiral of Theodorus. The essential mathematics is the repeated application of the Pythagorean theorem: a √n hypotenuse and a new perpendicular unit leg produce √(n+1).',
  'Indian geometry also has an earlier tradition of geometric measurement. The Baudhāyana Śulbasūtra contains statements and constructions concerning right triangles; those contributions should be recognised without claiming that any particular spiral illustration was drawn there.',
  'The spiral is an exact-length construction, not a proof of irrationality: the sequence includes √4=2 and √9=3, which are rational.'
 ]}
]);
teach('Decimal expansions of real numbers',[
 {title:'How long can a repeating decimal period be?',
 paragraphs:[
  'In the long division of 1/q, each nonzero remainder is one of 1,2,…,q−1. If the denominator is coprime to 10 (has neither factor 2 nor factor 5), a remainder of zero never occurs and the expansion repeats from the beginning.',
  'There are at most q−1 nonzero remainders, so its repeating block has length at most q−1 digits. The bound need not be reached. The fraction 1/7 has period 6 (digits 142857), reaching 7−1=6; the fraction 1/13 has period 6, shorter than 13−1=12.',
  'If q includes factors 2 or 5, the decimal may terminate or have a non-repeating beginning before its recurring block. The general claim “period always equals q−1” is false, and the upper bound must not be confused with the actual period length.'
 ],
 formulas:['For gcd(q,10)=1, repeating period of 1/q ≤ q−1'],
 examples:[{title:'Worked example: identify an upper bound',question:'What is the maximum possible repeating period length of 1/11?',steps:['Since 11 is coprime to 10, long division cannot terminate.','Only ten nonzero remainders are possible, giving a theoretical maximum of 10 digits.','Actual division gives 1/11=0.090909…, whose repeating block has only 2 digits.'],answer:'Maximum bound 10; actual period 2.'}]}
]);
teach('Fraction to decimal and repeating decimal to fraction',[
 {title:'General recurring decimals: the algebra behind two shifts',
 paragraphs:[
  'Suppose a decimal has m digits before the recurring block and n digits in the block. Multiplying by 10ᵐ moves the start of the recurring portion immediately after the point. Multiplying again by 10ⁿ moves one full block to the left. Subtracting removes the identical infinite recurring tails.',
  'For 0.2353535… = 0.2 followed by repeating 35, the one-digit prefix and two-digit block need factors 10 and 1000. Let x=0.2353535…, so 10x=2.353535… and 1000x=235.353535… . Subtracting gives 990x=233 and hence x=233/990.',
  'As a separate, harder example, 1.2353535… has the same recurring block but a different whole part. Convert the fractional part first, or set x=1.2353535… and apply the same shifts carefully.'
 ],
 formulas:['0.2(repeating 35)=233/990'],
 examples:[
  {title:'Harder example: recurring 35 after one fixed digit',question:'Express 0.235353535… as an exact fraction.',steps:['Let x=0.235353535….','Multiply by 10: 10x=2.35353535….','Multiply by 1000: 1000x=235.35353535….','Subtract: 990x=233.'],answer:'x=233/990.'},
  {title:'Challenge: two fixed digits, then a period of 35',question:'Express 0.12353535… as a fraction.',steps:['Let x=0.12353535….','Multiply by 100: 100x=12.353535….','Multiply by 10000: 10000x=1235.353535….','Subtract: 9900x=1223.'],answer:'1223/9900.'}
 ]}
]);
teach('Simplifying radicals and operations involving irrational numbers',[
 {title:'Algebraic identities with square roots',
 paragraphs:[
  'A radical is an exact way of naming a square-root value. For nonnegative a and b, √a√b=√(ab); but √a+√b is generally NOT √(a+b). For example, √9+√16=3+4=7, whereas √25=5.',
  'The difference-of-squares identity explains conjugates. Multiply (√a+√b)(√a−√b): the cross terms −√(ab) and +√(ab) cancel, leaving a−b. This is a special case of (u+v)(u−v)=u²−v².',
  'More generally, (a+b)²=a²+2ab+b² and (a−b)²=a²−2ab+b². Remember the middle term; simply squaring each summand individually gives the wrong result.'
 ],
 formulas:['(√a+√b)(√a−√b)=a−b, a,b≥0','(a+b)(a−b)=a²−b²','(a+b)²=a²+2ab+b²']},
 {title:'Enrichment: rationalising a binomial denominator',
 paragraphs:[
  'A denominator containing a sum or difference of radicals cannot usually be rationalised by multiplying by just one of its terms. Instead multiply numerator and denominator by the conjugate—the expression with the sign between its two terms reversed.',
  'For 1/(2+√3), multiply by (2−√3)/(2−√3). The denominator becomes (2+√3)(2−√3)=4−3=1. The numerator becomes 2−√3, so the result is 2−√3. This step is exact and does not change the number.',
  'The denominator must be nonzero. If both terms are equal in magnitude, the original denominator or its conjugate may vanish; verify restrictions before using the technique. This is a useful algebra extension, not a documented compulsory topic of the 2026–27 CBSE Number System unit.'
 ],
 formulas:['1/(a+√b)=(a−√b)/(a²−b), if a²≠b and the original denominator is nonzero'],
 examples:[
  {title:'Rationalise an unfamiliar binomial',question:'Simplify (√3−1)/(√3+1).',steps:['Multiply top and bottom by the conjugate √3−1.','The denominator is (√3+1)(√3−1)=3−1=2.','Numerator: (√3−1)²=3−2√3+1=4−2√3.','Divide by 2.'],answer:'2−√3.'}
 ]}
]);
teach('Mixed exam applications and full solutions',[
 {title:'Multi-step challenge: let exact algebra do the work',
 paragraphs:[
  'Consider x=3+2√2. Its conjugate is 3−2√2. Their product is 3²−(2√2)²=9−8=1, so the conjugate is exactly 1/x. This observation avoids tedious separate squaring.',
  'Once x+1/x is known, the identity (x+1/x)²=x²+2+1/x² immediately gives x²+1/x². Using an identity is more illuminating and less error-prone than expanding both squares independently.'
 ],
 formulas:['If x≠0, x²+1/x²=(x+1/x)²−2'],
 examples:[{title:'Four-mark challenge: reciprocal surds',question:'If x=3+2√2, find x²+1/x².',steps:['The conjugate product is (3+2√2)(3−2√2)=9−8=1.','Therefore 1/x=3−2√2.','Add: x+1/x=(3+2√2)+(3−2√2)=6.','Square: (x+1/x)²=36.','Expand the left side as x²+2+1/x²=36.','Subtract 2.'],answer:'x²+1/x²=34.'}]}
]);
const semicircle=byTitle('Constructing square-root lengths');
semicircle.subtopics.push({
 title:'Optional geometric enrichment: constructing √x by a semicircle',
 paragraphs:[
  'This construction works for any nonnegative length x, not only whole numbers. Draw a straight segment AB of length x+1 units. Locate C between A and B so that AC=x units and CB=1 unit. Draw a semicircle with AB as diameter, then erect a perpendicular at C to meet the semicircle at D.',
  'The angle ADB is a right angle because it stands on a diameter. In the resulting right triangle, CD is the altitude to the hypotenuse AB. Similarity of the two smaller triangles gives CD²=AC·CB=x·1=x. Therefore CD=√x.',
  'The drawing uses x=4 as an example: AC=4, CB=1, and the perpendicular height CD=2. For any positive x the same argument works. This construction is an optional geometric extension; the prescribed chapter specifically discusses constructions such as the square-root spiral.'
 ],
 formulas:['CD²=AC·CB=x, so CD=√x'],
 examples:[{title:'A worked example using the semicircle construction',question:'What height will the perpendicular have when AC=9 and CB=1?',steps:['Use the altitude theorem CD²=AC·CB.','Then CD²=9×1=9.','Because CD is a length, take the positive root.'],answer:'CD=3 units.'}]
});
semicircle.figureId='semicircle';

const optional={
 title:'Extension: Laws of Exponents and Rationalising Conjugates',
 extension:true,
 paragraphs:[
  'This is an optional advanced lesson to prepare for later algebra and for schools that introduce surds and rational powers early. The official CBSE Class 9 (2026–27) Number System unit does not list rational exponents or binomial rationalisation among its prescribed key concepts. Learn the number-set, density, decimals, √2/√3 proofs and square-root spiral lessons first.',
  'The central idea is that a power repeatedly multiplies by the same base. Rational exponents are defined to preserve the familiar exponent laws when roots exist as real numbers. Conjugates are algebraic partners whose product removes surd terms through the difference of two squares.'
 ],
 subtopics:[
  {title:'Positive and zero powers',paragraphs:[
   'For a nonzero base a, aᵐ×aⁿ=aᵐ⁺ⁿ: multiplying m copies of a by n more copies gives m+n copies. Dividing gives aᵐ/aⁿ=aᵐ⁻ⁿ, provided the denominator is nonzero. An expression such as (aᵐ)ⁿ repeats an m-fold power n times, giving aᵐⁿ.',
   'The rule a⁰=1 for a≠0 follows from aᵐ/aᵐ=1=a⁰. Negative exponents mean reciprocals: a⁻²=1/a². For a=0, 0⁻¹ is undefined and the usual quotient argument does not define 0⁰.'
  ],formulas:['aᵐ×aⁿ=aᵐ⁺ⁿ','aᵐ/aⁿ=aᵐ⁻ⁿ (a≠0)','(aᵐ)ⁿ=aᵐⁿ','a⁰=1 (a≠0)','a⁻ⁿ=1/aⁿ (a≠0)']},
  {title:'How fractional exponents relate to roots',paragraphs:[
   'For a positive real base a, a¹⁄ⁿ means the positive nth root of a. It is the number which, when raised to n, returns a. Thus 64¹⁄²=√64=8 and 8¹⁄³=2.',
   'For positive a, the expression aᵐ⁄ⁿ=(ⁿ√a)ᵐ. For example, 8²⁄³=(³√8)²=2²=4. The positivity condition keeps these real-power rules simple and prevents mistakes with even roots of negative values.',
   'Same-base powers multiply by adding exponents, including fractional exponents: 2²⁄³×2¹⁄³=2¹=2. Avoid trying to add or multiply the bases when the law is actually about exponents.'
  ],formulas:['aᵐ⁄ⁿ=(ⁿ√a)ᵐ, a>0, n positive integer'],
  examples:[{title:'Fractional powers in one calculation',question:'Evaluate (32)⁻²⁄⁵.',steps:['32=2⁵.','(2⁵)⁻²⁄⁵=2⁻².','Use the reciprocal rule: 2⁻²=1/4.'],answer:'1/4.'}]},
  {title:'Conjugates, difference of squares and rationalisation',paragraphs:[
   'Two binomials a+b and a−b are conjugates. Multiplying them gives a²−b², because the +ab and −ab terms cancel. If b is a square root, the product often becomes rational.',
   'Rationalising is choosing an equivalent fraction whose denominator is rational. For example, 1/(2+√3) becomes (2−√3)/(4−3)=2−√3. It is valid because the multiplier (2−√3)/(2−√3) equals 1.',
   'Whenever a reciprocal involving a binomial appears in a question, check whether a conjugate will simplify it. A denominator like 3+2√2 is especially convenient because its conjugate product equals 1.'
  ],formulas:['(a+b)(a−b)=a²−b²'],
  examples:[{title:'Harder reciprocal',question:'Simplify 1/(3+2√2).',steps:['Multiply top and bottom by 3−2√2.','Denominator: 9−(2√2)²=9−8=1.','The numerator is 3−2√2.'],answer:'3−2√2.'}]}
 ],
 formulas:['64¹⁄²=8','2²⁄³×2¹⁄³=2','(1/3⁵)⁴=1/3²⁰'],
 examples:[
  {title:'Careful with a power of a fraction',question:'Evaluate (1/3⁵)⁴.',steps:['(1/3⁵)⁴=1⁴/(3⁵)⁴.','Use the power-of-a-power rule (3⁵)⁴=3²⁰.'],answer:'1/3²⁰.'}
 ],
 tip:'Optional enrichment: these advanced algebra skills are not substitutes for the prescribed Number System requirements.'
};
const index=chapter.sections.findIndex(x=>x.title==='Properties, inclusion and classification of number sets');
chapter.sections.splice(index>=0?index:chapter.sections.length-1,0,optional);

// Place a warning beside the underlying misconception instead of burying it
// in an unrelated checklist.
const radicals=byTitle('Simplifying radicals and operations involving irrational numbers');
radicals.exam_warning='Do not distribute √ across addition: √(9+16)=5, but √9+√16=7. The identity √(ab)=√a√b requires a,b≥0 in the real-number setting.';
radicals.tip='Common mistake: the square root of a sum is not the sum of square roots. Compare √25=5 with √9+√16=7.';

chapter._studyaiAuditCorrections=true;
window.STUDYAI_WORLD_OF_NUMBERS_STATUS={
 ...window.STUDYAI_WORLD_OF_NUMBERS_STATUS,
 lessonCount:chapter.sections.length,
 workedExamples:chapter.sections.reduce((sum,s)=>sum+(s.examples?.length||0)+
 (s.subtopics||[]).reduce((n,p)=>n+(p.examples?.length||0),0),0),
 optionalExtensions:chapter.sections.filter(s=>s.extension).length
};
})();