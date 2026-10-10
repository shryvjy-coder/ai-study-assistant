/* Chapter 4 — Exploring Algebraic Identities */
(() => {
'use strict'; const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Exploring Algebraic Identities',[
['Identity versus equation',[
['Discovering an identity from consecutive squares',[
'Taking the squares of three consecutive nonnegative integers gives a striking pattern. With 1, 4 and 9, the smallest plus the largest minus twice the middle is 1+9−2×4=2. With 9, 16 and 25, the same calculation gives 9+25−2×16=2. Repeating examples suggests a rule but does not prove it.',
'Let the three consecutive integers be n−1, n and n+1, with n at least 1. Their squares are (n−1)², n² and (n+1)². Expand the outer squares using (a−b)² and (a+b)²: (n²−2n+1)+(n²+2n+1)−2n². The n² and n terms cancel, leaving 2. Therefore the pattern holds for every such triple.',
'The equality (n−1)²+(n+1)²−2n²=2 is an algebraic identity, valid for every real n. To call the squares smallest, middle and largest in that order, use three consecutive nonnegative integers; the algebraic identity itself needs no such ordering. This is the difference between spotting a pattern and proving it.'
],['(n−1)²+(n+1)²−2n²=2'],[
E('Prove the consecutive-squares pattern','Prove that the sum of the first and third squares of three consecutive nonnegative integers, minus twice the middle square, is always 2.',['Write the three integers as n−1, n and n+1.','Translate the statement to (n−1)²+(n+1)²−2n².','Expand: n²−2n+1+n²+2n+1−2n².','Collect terms: (n²+n²−2n²)+(−2n+2n)+(1+1)=2.','Check with 4, 5, 6: 16+36−2×25=2.'],'The expression equals 2 for every permitted n.')
]],
['Why an identity works for every value',[
'An equation may hold only for certain inputs: x+2=7 is true only when x=5. An identity is a statement that remains true for every permitted value. For instance, 2(x+3)=2x+6 follows from the distributive law, so substituting any real x leaves both sides equal.',
'Testing several values cannot establish an identity for all values; there are infinitely many candidates. A valid proof uses algebra, an area model or a geometric argument. One counterexample, however, is enough to disprove a claimed universal identity.'
],['a(b+c)=ab+ac'],[E('True identity or conditional equation?','Classify 3(x−2)=3x−6 and 3x−6=0.',['Distribute in the first statement: the expressions are identical for every x.','Solve the second: x=2 is required.'],'First is an identity; second is an equation with solution x=2.')]],
['Building identities from area',[
'Imagine a square whose side is a+b with nonnegative lengths a,b. Divide each side at distance a from a corner. Four regions result: an a×a square, two a×b rectangles and a b×b square.',
'Adding their areas gives (a+b)²=a²+ab+ab+b². The geometric argument explains the factor 2 in front of ab; the algebraic rule then extends to negative real values because multiplication distributes over addition.'
],['(a+b)²=a²+2ab+b²'],[E('Area derivation','Expand (x+5)² using its rectangular parts.',['Take a=x and b=5.','The large square area is x²+2(x)(5)+25.','Collect the middle terms.'],'x²+10x+25.')]]
]],
['Square identities',[
['Square of a sum',[
'The square (a+b)² means (a+b)(a+b), not a²+b². Distribute the first bracket across the second: a²+ab+ab+b². The two cross-products are what many students accidentally omit.',
'When one term is a fraction or negative, retain parentheses around it. For instance (x+1/2)²=x²+x+1/4 because 2·x·(1/2)=x. A quick numerical test can help catch arithmetic mistakes, although it is not a proof.'
],['(a+b)²=a²+2ab+b²'],[E('Expand with fractions','Expand (2x+3/2)².',['a=2x, b=3/2.','a²=4x² and 2ab=2·2x·3/2=6x.','b²=9/4.'],'4x²+6x+9/4.')]],
['Square of a difference',[
'The expression (a−b)²=(a−b)(a−b) produces a²−ab−ab+b². The last term is positive because multiplying two negative b-terms yields +b².',
'This gives a²−2ab+b². It is incorrect to write a²−b² or a²+2ab+b². When expanding, explicitly identify the two equal negative cross-products.'
],['(a−b)²=a²−2ab+b²'],[E('Expand a difference','Expand (3y−4)².',['Square the first term: 9y².','Twice the product with a minus sign: −24y.','Square the last term: +16.'],'9y²−24y+16.')]],
['Multiplication of two nearby binomials',[
'Not every product is a square. For example (x+2)(x+5) produces x²+5x+2x+10=x²+7x+10. In general, (x+a)(x+b)=x²+(a+b)x+ab.',
'This representation helps factorise a quadratic expression by reversing the expansion. The two numbers must add to the linear coefficient and multiply to the constant term.'
],['(x+a)(x+b)=x²+(a+b)x+ab'],[E('Multiply two binomials','Expand (x−3)(x+8).',['Products: x²+8x−3x−24.','Combine 8x−3x.'],'x²+5x−24.')]]
]],
['Difference of two squares',[
['The conjugate product',[
'When two binomials differ only in a sign, their cross terms cancel: (a+b)(a−b)=a²−ab+ab−b²=a²−b². This identity is called the difference of two squares.',
'The identity works in reverse as a factorisation method: a²−b²=(a+b)(a−b). Remember that the expression must be a subtraction of complete squares. The sum a²+b² does not factor in the same manner over the real numbers.'
],['a²−b²=(a+b)(a−b)'],[E('Factorise a difference','Factorise 25x²−49.',['Recognise 25x²=(5x)² and 49=7².','Apply A²−B²=(A+B)(A−B).'],'(5x+7)(5x−7).')]],
['Mental arithmetic using nearby squares',[
'An identity is more than an algebraic trick. It can simplify arithmetic. To calculate 103×97, write it as (100+3)(100−3). The cross terms cancel, giving 100²−3²=10000−9.',
'This approach is useful when factors are equally spaced around a convenient central value. If the numbers are not symmetric around the same midpoint, first rewrite the product accurately.'
],['(m+d)(m−d)=m²−d²'],[E('Calculate mentally','Evaluate 84×76 without long multiplication.',['Both factors are 4 away from 80.','Write (80+4)(80−4)=80²−4².','6400−16.'],'6384.')]]
]],
['Factorisation',[
['Factor out the common factor first',[
'Factorisation rewrites a sum as a product. In 6x²+9x, both terms contain the factor 3x, so 6x²+9x=3x(2x+3). Expanding the product recovers the original expression and checks the result.',
'Look for the highest useful common factor before trying more complicated identities. Omitting this first step may leave a partly factored expression or make later arithmetic unnecessarily difficult.'
],['ab+ac=a(b+c)'],[E('Take out the common factor','Factorise 12x²−18x.',['Both coefficients are divisible by 6.','Both terms contain at least one x.','Take out 6x and divide each original term by it.'],'6x(2x−3).')]],
['Recognise perfect-square trinomials',[
'A perfect-square trinomial has the structure a²+2ab+b² or a²−2ab+b². The first and last terms must be squares, and the middle term must be twice the product of their square roots.',
'For example x²+14x+49=(x+7)² because x² and 49 are squares and 14x=2·x·7. If the middle term is 13x instead, the perfect-square test fails; you cannot force the same identity.'
],['a²±2ab+b²=(a±b)²'],[E('Perfect-square recognition','Factorise 9x²−24x+16.',['9x²=(3x)² and 16=4².','The middle term −24x is −2·3x·4.','Apply square-of-difference in reverse.'],'(3x−4)².')]],
['Factorise by splitting the middle term',[
'For monic quadratics x²+px+q, search for a and b such that a+b=p and ab=q. Then x²+px+q=(x+a)(x+b). The addition and multiplication requirements must both hold.',
'With x²−x−12, the numbers 3 and −4 add to −1 and multiply to −12, giving (x+3)(x−4). Multiplying the factors is the fastest final verification. More complicated quadratics may require grouping, but the logical objective is the same.'
],['x²+(a+b)x+ab=(x+a)(x+b)'],[E('Split the middle term','Factorise x²+2x−15.',['Find integers with sum 2 and product −15.','The pair is 5 and −3.','Rewrite as (x+5)(x−3).'],'(x+5)(x−3).')]]
]],
['Building and discovering identities',[
['Cubes as products of three factors',[
'Expanding (a+b)³ means multiplying (a+b)² by (a+b). Substitute a²+2ab+b², distribute and combine like terms. The result is a³+3a²b+3ab²+b³. Coefficients 1,3,3,1 follow from the ways to select terms from three identical factors.',
'The signs alternate for (a−b)³: a³−3a²b+3ab²−b³. If the detailed textbook section treats cube identities as exploration rather than compulsory assessment, use these expressions as practice in applying distributivity consistently.'
],['(a+b)³=a³+3a²b+3ab²+b³','(a−b)³=a³−3a²b+3ab²−b³'],[E('Expand a cube','Expand (x+2)³.',['Use a=x, b=2.','Terms are x³, 3x²(2), 3x(2²), 2³.','Simplify each coefficient.'],'x³+6x²+12x+8.')]],
['Patterns as conjectures and proofs',[
'A number pattern can suggest an identity, but the pattern by itself does not prove it. For example, 1+3=4, 1+3+5=9 and 1+3+5+7=16 suggest that the first n odd numbers sum to n².',
'A geometric proof adds an L-shaped border containing 2n−1 unit squares to a square of side n−1, making a larger n×n square. Algebraically the step is (n−1)²+(2n−1)=n². This explains why the pattern continues.'
],['1+3+5+…+(2n−1)=n²'],[E('Consecutive odd numbers','Find the sum of the first 35 positive odd integers.',['The nth odd number is 2n−1.','The sum of the first n odd numbers equals n².','Use n=35.'],'35²=1225.')]]
]],
['Rational algebraic expressions',[
['Simplification and restrictions',[
'A rational algebraic expression is a ratio of polynomials. For example (x²−9)/(x−3) factors to [(x−3)(x+3)]/(x−3). Cancelling the nonzero common factor gives x+3.',
'However the original denominator is zero at x=3, so that value remains excluded even after cancellation. Simplification preserves the value wherever the original expression is defined; it does not make previously forbidden inputs valid.'
],['(x²−a²)/(x−a)=x+a, x≠a'],[E('Cancel safely','Simplify (x²−16)/(x−4).',['Factor the numerator as (x−4)(x+4).','Cancel x−4 only when x≠4.','Retain the restriction from the original denominator.'],'x+4, with x≠4.')]],
['Adding rational expressions with care',[
'To add fractions with algebraic denominators, choose a common denominator as with numerical fractions. For 1/(x−1)+2/(x+1), use (x−1)(x+1) when x≠±1.',
'The numerator becomes (x+1)+2(x−1)=x+1+2x−2=3x−1. Keep the original restrictions, and test numerical substitutions to catch expansion errors.'
],[],[E('Combine algebraic fractions','Simplify 1/(x−1)+2/(x+1).',['Common denominator is (x−1)(x+1).','Numerator: x+1+2x−2=3x−1.','Use difference of squares for denominator.'],'(3x−1)/(x²−1), x≠−1,1.')]]
]]
],{
lead:'Algebraic identities are statements that stay true for every permitted input. Here you will derive square and conjugate identities from distributivity and geometric area, reverse them for factorisation, discover patterns and carefully handle rational expressions. The emphasis is on knowing why the transformations preserve equality—not memorising symbols in isolation.',
mixed:[
['Mixed problem: prove and use an identity','Show that (a+b)²−(a−b)²=4ab and evaluate 103²−97².',['Expand both squares: a²+2ab+b²−(a²−2ab+b²).','Cancel a² and b²; combine the cross terms to obtain 4ab.','For 103²−97², use difference of squares (103+97)(103−97).','Evaluate 200×6.'],'Identity established; value =1200.'],
['Mixed problem: area-model factorisation','A rectangular garden has area x²+9x+20 square metres. One side is x+4 metres. Find the other.',['Seek factors of 20 that add to 9: 4 and 5.','Factor x²+9x+20=(x+4)(x+5).','Divide area by side x+4 (for positive x).'],'Other side x+5 metres.']
]});
})();