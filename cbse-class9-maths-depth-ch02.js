/* Chapter 2 — Introduction to Linear Polynomials: original complete lessons */
(() => {
'use strict';
const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Introduction to Linear Polynomials',[
['Polynomial language',[
['From repeated arithmetic to algebraic rules',[
'An expression such as 4n+3 can describe a pattern without listing every value. Algebraic symbols are useful because one rule applies to many different inputs. The symbol n is a variable; the fixed numbers 4 and 3 are coefficients or constants. The expression can be evaluated after a value is assigned to n.',
'A polynomial in one variable contains terms with nonnegative integer exponents and real coefficients. Thus x²+2x+1 is polynomial, but 1/x is not a polynomial in x, since x appears with exponent −1. A linear polynomial has degree 1, so it can be written ax+b with a≠0.'
],['Linear polynomial P(x)=ax+b, a≠0','Degree of ax+b is 1 for a≠0'],[
E('Recognise a linear polynomial','Identify the linear polynomials among 7x−2, x²+1 and 1/x+3.',['7x−2 has highest power 1 and a nonzero coefficient of x.','x²+1 has degree 2.','1/x+3 contains the forbidden negative exponent −1.'],'Only 7x−2 is linear in x.')]],
['Terms, coefficients and constants',[
'In 5x−8 the term 5x depends on x and the term −8 does not. The coefficient of x is +5 and the constant term is −8. A minus sign belongs to the term immediately following it; forgetting the sign changes both the expression and its values.',
'Like terms have the same variable raised to the same power. The terms 3x and −2x can combine into x because they describe quantities of the same kind. But 3x and 3x² are unlike terms and cannot be combined by adding their coefficients alone.'
],['(ax+b)+(cx+d)=(a+c)x+(b+d)'],[
E('Collect like terms','Simplify 3x−7+4x+5.',['Group variable terms: 3x+4x=7x.','Combine constants: −7+5=−2.'],'7x−2')]],
['Identities, expressions and equations',[
'An expression, such as 2x+5, names a quantity. An equation, such as 2x+5=11, asks when two quantities are equal. The statement 2(x+3)=2x+6 is an identity: it remains true for every allowed value of x.',
'A linear polynomial does not have to equal zero until we are asked to find a zero. Setting ax+b=0 gives x=−b/a, provided a≠0. This value makes the polynomial evaluate to zero and later becomes the x-intercept of its graph.'
],['ax+b=0 ⇒ x=−b/a, a≠0'],[
E('A zero of a polynomial','Find the zero of 4x−12.',['Set the polynomial equal to zero: 4x−12=0.','Add 12: 4x=12.','Divide by 4 to get x=3.','Check 4(3)−12=0.'],'x=3')]]
]],
['Evaluating a polynomial',[
['Substitution gives an exact output',[
'An algebraic rule acts like a machine: it accepts an input and produces an output. For P(x)=3x−5, the input x=4 produces P(4)=3×4−5=7. Parentheses help ensure that negative and fractional inputs are handled correctly.',
'Substitute before simplifying signs. For example P(−2)=3(−2)−5=−11, not 3×2−5. A single sign error can change the position of every graph point or the predicted term in a number pattern.'
],['P(a)=expression obtained by replacing x with a'],[
E('Evaluate for a negative input','If P(x)=−2x+7, calculate P(−3).',['Substitute x=−3 using parentheses.','P(−3)=−2(−3)+7.','Multiply first: 6+7.'],'13')]],
['Building a table of values',[
'A table is a systematic way to connect the expression with several inputs. Choose at least two distinct x-values for a linear polynomial, evaluate the rule and write ordered pairs (x,P(x)). Extra points help check calculation accuracy.',
'For y=2x−1, inputs 0,1 and 2 give outputs −1,1 and 3. Each increase of one in x increases y by two. This constant change is why the plotted points lie on one straight line.'
],[],[
E('Complete a linear table','For y=−3x+4, find y when x is −1, 0 and 2.',['At x=−1: y=−3(−1)+4=7.','At x=0: y=4.','At x=2: y=−6+4=−2.'],'Points: (−1,7),(0,4),(2,−2).')]],
['Substitution for fractional inputs',[
'A rule must work for inputs that are not whole numbers unless its domain is explicitly restricted. Fractions may represent time, length, mass or any continuous quantity. Retaining exact fractional answers avoids rounding errors.',
'With P(x)=2x+1, P(3/4)=2×3/4+1=3/2+1=5/2. The calculation follows the same substitution rule; fractional values do not make a polynomial cease to be linear.'
],[],[
E('Fractional argument','Calculate P(−1/2) for P(x)=6x+5.',['Substitute using parentheses: 6(−1/2)+5.','The product equals −3.','Add −3+5.'],'2')]]
]],
['Linear patterns and constant change',[
['Why the same first difference matters',[
'Consider the number list 5,8,11,14,... . The increase from one term to the next is always 3. A pattern with constant first differences can be expressed by a linear rule in its term number n. Starting from the first term 5, each additional term adds one more copy of 3.',
'The nth term is 5+(n−1)×3=3n+2. This derivation explains the rule rather than guessing it from the first few terms. Checking n=1 returns 5, while n=4 returns 14.'
],['aₙ=a₁+(n−1)d','Constant first difference d corresponds to the coefficient of n'],[
E('Find a distant term','The first term is 7 and each new term increases by 4. Find the 25th term.',['aₙ=7+(n−1)4.','For n=25 there are 24 changes after the first term.','a₂₅=7+24×4=7+96.'],'103')]],
['Changing quantities and rates',[
'Linear relationships also describe real-life situations. If a taxi charges a fixed booking fee of ₹50 plus ₹12 for every kilometre, cost C(k)=50+12k. The constant term represents the starting cost and the coefficient represents the change in cost per kilometre.',
'If a table gives costs for equally spaced travel distances, the repeated change in cost should match the rate. For example an extra 3 km increases cost by ₹36. This is a valuable sense check before graphing.'
],['Output = fixed amount + (rate × input)'],[
E('A price rule','A print shop charges ₹30 setup plus ₹4 per page. Calculate the cost for 18 pages.',['Write C(n)=30+4n.','Substitute n=18.','C(18)=30+72.'],'₹102')]],
['Recognising non-linear change',[
'Not every pattern has constant first differences. The sequence 1,4,9,16,... grows by 3,5,7,...; those differences are not constant. Its nth term n² is quadratic, not linear.',
'A visual graph can sometimes appear almost straight over a tiny interval, but exact classification requires a mathematical rule or sufficient pattern evidence. Checking differences is useful for regularly spaced inputs, not a universal test for every data table.'
],[],[
E('Linear or not?','Decide whether 2,6,12,20,30 has a linear nth-term rule.',['First differences are 4,6,8,10.','Since they are not equal, the list does not have a constant rate of change.','Its pattern fits n(n+1), which is degree 2.'],'Not linear.')]]
]],
['From a pattern to a rule',[
['Deriving a rule from two observations',[
'For a linear rule y=ax+b, every additional unit of x changes y by a. Given two points with different x-values, compute a=(y₂−y₁)/(x₂−x₁). Once a is known, substitute one point to determine b. This is a derivation from constant change, not a memorised guessing trick.',
'For points (1,6) and (4,15), the output rises 9 while the input rises 3, giving a=3. Using (1,6), 6=3×1+b so b=3. Therefore y=3x+3 fits both.'
],['a=(y₂−y₁)/(x₂−x₁), x₂≠x₁','b=y₁−ax₁'],[
E('Find the rule','A linear pattern has output 11 at input 2 and output 23 at input 5. Find its rule.',['a=(23−11)/(5−2)=12/3=4.','Use 11=4(2)+b to obtain b=3.','Write y=4x+3 and verify at x=5.'],'y=4x+3')]],
['Simplifying terms with the distributive law',[
'Patterns expressed in words often involve brackets. Twice the sum of a number and 5 is 2(n+5), not 2n+5. Distributivity says that multiplying a sum multiplies each term, so 2(n+5)=2n+10.',
'Expanding or factorising does not change the values produced by an expression. Both forms describe the same relationship. One form may communicate the context more clearly, while another may make the variable coefficient easier to identify.'
],['a(b+c)=ab+ac'],[
E('Derive an expression','Five boxes each contain n pencils and two extra pencils. Write the total.',['One box has n+2 pencils.','Five identical boxes contain 5(n+2).','Distribute 5 to each term.'],'5n+10 pencils')]],
['Inverse questions: recovering the input',[
'Many word problems give the output and ask for the original input. To reverse y=ax+b, first remove the fixed addition b and then divide by the nonzero rate a. In equations, perform the same operation on both sides to preserve equality.',
'For the cost rule C=30+4n, a bill of ₹106 gives 106=30+4n. Subtract 30 to obtain 76=4n, and divide by 4 to get n=19. Substitution gives the original total.'
],['For a≠0, x=(y−b)/a'],[
E('A hidden input','If P(x)=5x−9 and P(x)=31, find x.',['Set 5x−9=31.','Add 9: 5x=40.','Divide by 5 and check in P.'],'x=8')]]
]],
['Visualising a linear relationship',[
['Why a linear polynomial graphs as a line',[
'Each point (x,y) satisfying y=ax+b belongs to the graph. The value b fixes the point where the graph crosses the vertical axis, because x=0 gives y=b. The coefficient a controls how steeply the graph rises or falls.',
'For a positive coefficient, y increases as x increases; for a negative coefficient, y decreases. If the coefficient of x is zero, the graph is horizontal and the expression is constant rather than a degree-one polynomial.'
],['Graph of y=ax+b passes through (0,b)'],[
E('Read a linear graph from its rule','For y=−2x+6, find two points for plotting.',['At x=0, y=6, so (0,6) lies on the line.','At x=3, y=0, so (3,0) lies on the line.','Join the two plotted points and extend the line.'],'The line passes through (0,6) and (3,0).')]],
['Intercepts and the zero of a polynomial',[
'The zero of a linear polynomial P(x)=ax+b is the input where its output is zero. On a coordinate graph this means y=0, so the corresponding point lies on the x-axis. Solving ax+b=0 gives x=−b/a.',
'This connects a familiar algebraic calculation to geometry. A graph crossing the x-axis at x=4 tells us P(4)=0, even if the polynomial is written in a different equivalent form.'
],['x-intercept: (−b/a,0) when a≠0','y-intercept: (0,b)'],[
E('Locate a polynomial zero','Where does the graph of y=3x−12 cross the x-axis?',['On the x-axis, y=0.','Solve 3x−12=0, giving 3x=12.','Therefore x=4.'],'(4,0)')]],
['Checking predictions by graph and algebra',[
'Once a linear rule is known, a table, a graph and an equation provide three ways of representing the same relationship. They should agree: if y=2x+1, then the point (4,9) belongs to the line because 2(4)+1=9.',
'Points that fail the equation are not on the line, even if a rough sketch makes them look close. Graphs are useful for interpretation, but substitution gives an exact test of whether a proposed point is a solution.'
],[],[
E('Point-on-line test','Does (5,13) lie on y=3x−2?',['Substitute x=5 into the right-hand side.','3(5)−2=15−2=13.','This equals the proposed y-coordinate.'],'Yes, (5,13) lies on the line.')]]
]]
],{
lead:'Regular patterns invite a question: can one short algebraic rule describe every term? Linear polynomials connect that idea to coefficients, substitution, equations, tables and straight-line graphs. These lessons derive the rules from constant change and train you to explain why an answer works, rather than simply recognising a formula.',
mixed:[
['Exam problem: linear rule from observations','A tank contains 25 litres initially and gains water at a steady rate. It has 49 litres after 6 minutes. Find its amount after 15 minutes.',['Let V(t)=a t+25, since 25 is the initial amount.','At t=6, 49=6a+25, so a=24/6=4 litres per minute.','V(15)=4(15)+25.','Verify that the amount exceeds its initial value by 60 litres.'],'85 litres'],
['Exam problem: comparison of linear costs','Shop A charges ₹60 plus ₹5 per item. Shop B charges ₹20 plus ₹9 per item. For how many items are costs equal?',['Write A(n)=60+5n and B(n)=20+9n.','Set equal: 60+5n=20+9n.','Subtract 20 and 5n: 40=4n.','Solve n=10 and substitute into both rules.'],'10 items; both cost ₹110.']
]});
})();