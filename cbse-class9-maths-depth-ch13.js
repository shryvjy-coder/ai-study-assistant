/* Chapter 13 — Two Variables, One Line */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Two Variables, One Line',[
['Linear equations in two variables',[
['Two unknowns give a whole family of solutions',[
'An equation such as x+y=7 involves two variables. If x=2, then y=5; if x=0, then y=7; if x=−1, then y=8. Each ordered pair satisfies the equation. A single equation usually cannot determine unique values for both x and y.',
'A linear equation in two variables can be written ax+by+c=0, where a,b,c are constants and a and b are not both zero. Its graph is a straight line because the equation describes a constant linear relationship between coordinates.'
],['ax+by+c=0 with (a,b)≠(0,0)'],[E('Verify a solution','Does (3,−1) satisfy 2x+y−5=0?',['Substitute x=3, y=−1.','2(3)+(−1)−5=6−1−5=0.','The equation is satisfied.'],'Yes.')]],
['Equivalent forms of the same equation',[
'Multiplying or dividing both sides of an equation by a nonzero number produces an equivalent equation with the same solution set. For example 2x+4y=8 and x+2y=4 describe the same straight line.',
'Adding equal quantities to both sides also preserves solutions. Avoid dividing by expressions that could equal zero without checking the restriction, because that might remove valid solutions or introduce invalid transformations.'
],[],[E('Compare equations','Are 3x−6y=12 and x−2y=4 equivalent?',['Divide every term of the first equation by 3.','The result is x−2y=4.'],'Yes, they represent the same line.')]]
]],
['Generating and graphing solutions',[
['Create a table with ordered pairs',[
'To graph x+2y=6, choose convenient x-values and solve for y. For x=0, y=3; for x=2, y=2; for x=6, y=0. Plot the resulting ordered pairs using a consistent scale.',
'Any two distinct points determine the straight line, but a third calculated point is a useful accuracy check. A point is an exact solution only if its coordinates satisfy the original equation after substitution.'
],[],[E('Generate points','Find three solutions of 2x+y=5.',['Rearrange to y=5−2x.','At x=0, y=5; at x=1, y=3; at x=2, y=1.'],'(0,5),(1,3),(2,1)')]],
['Intercepts and physical interpretation',[
'The x-intercept is where y=0 and the y-intercept is where x=0. For 3x+2y=12, setting y=0 gives x=4, while x=0 gives y=6. The line crosses the axes at (4,0) and (0,6).',
'An x-intercept does not automatically have the same units as the y-intercept. For a cost-versus-quantity graph the horizontal axis may count items and the vertical axis may measure rupees. State what each intercept means before interpreting its numerical value.'
],['x-intercept: solve equation at y=0','y-intercept: solve equation at x=0'],[E('Find intercepts','Find both intercepts of 4x+3y=24.',['Set y=0: 4x=24 ⇒ x=6.','Set x=0: 3y=24 ⇒ y=8.'],'(6,0) and (0,8)')]]
]],
['Slope',[
['Slope measures vertical change per horizontal change',[
'On a straight line, slope m is the ratio of change in y to change in x between any two distinct points. If x increases by 2 and y increases by 6, the slope is 3. Slope is constant for a straight line because corresponding right triangles along the line are similar.',
'Positive slope means the line rises from left to right; negative slope means it falls. A horizontal line has slope zero because y does not change. A vertical line has undefined slope because its horizontal change is zero and division by zero is impossible.'
],['m=(y₂−y₁)/(x₂−x₁), x₂≠x₁'],[E('Slope from coordinates','Find the slope through A=(−1,4) and B=(3,−4).',['Δy=−4−4=−8.','Δx=3−(−1)=4.','m=−8/4.'],'−2')]],
['Rate of change and units',[
'The physical meaning of slope comes from the quantities on the axes. If y is distance in kilometres and x is time in hours, the slope has units km/h and describes a rate of change. If y is cost and x is quantity, the slope is cost per item.',
'Negative slope can describe decreasing temperature, water level or balance. Always check that the relationship is intended to be linear before extending the graph to values outside the observed range.'
],[],[E('Interpret a slope','A water tank level falls from 18 cm to 10 cm in 4 minutes at a constant rate. Find slope.',['Vertical change=10−18=−8 cm.','Horizontal change=4 minutes.','Slope=−8/4.'],'−2 cm/min')]],
['Slope of parallel and perpendicular lines',[
'Distinct nonvertical parallel lines have equal slopes because they rise or fall at the same rate. When two nonvertical lines with slopes m₁ and m₂ are perpendicular and neither slope is zero, their slopes multiply to −1.',
'Vertical and horizontal lines are perpendicular despite the vertical line having no defined numerical slope. This case must be treated geometrically instead of forcing the product rule on undefined quantities.'
],['Parallel nonvertical lines: m₁=m₂','Perpendicular finite nonzero slopes: m₁m₂=−1'],[E('Parallel test','Are the lines through (0,1),(2,5) and through (1,−2),(4,4) parallel?',['First slope=(5−1)/(2−0)=2.','Second slope=(4−(−2))/(4−1)=6/3=2.','Both slopes match.'],'Yes; the distinct lines are parallel.')]]
]],
['Slope-intercept form',[
['The meaning of y=mx+c',[
'The equation y=mx+c separates two pieces of information: m is the rate of change, and c is the y-coordinate when x=0. This form makes it easy to sketch a line or interpret a linear model.',
'For y=−3x+7, the line begins at (0,7) on the vertical axis and falls by 3 units whenever x increases by 1. Plot (0,7) and (1,4), then draw the line. Using two exact points is better than eyeballing its angle.'
],['y=mx+c','m=gradient; c=y-intercept'],[E('Read a rule','For y=4x−6, state slope and y-intercept.',['Coefficient of x is 4, giving slope 4.','When x=0, y=−6.'],'Slope 4; y-intercept (0,−6).')]],
['Finding a line from a point and a slope',[
'If a line passes through (x₁,y₁) with slope m, any other point (x,y) on it satisfies (y−y₁)/(x−x₁)=m for x≠x₁. Rearranging gives y−y₁=m(x−x₁); this form also includes the initial point.',
'To express in slope-intercept form, expand and isolate y. The calculation explains the equation: the change in output equals slope multiplied by the change in input.'
],['y−y₁=m(x−x₁)'],[E('Line from point and slope','Find a line of slope 3 through (2,5).',['Use y−5=3(x−2).','Expand y−5=3x−6.','Add 5.'],'y=3x−1')]],
['Recognising horizontal and vertical lines',[
'The equation y=k represents a horizontal line: its y-value is fixed, and all real x are allowed. It has slope 0. The equation x=k represents a vertical line: its x-value is fixed while y varies, so slope is undefined.',
'Both are straight lines even though a vertical one cannot be written as y=mx+c with finite m. When constructing a graph, identify these forms directly instead of dividing by a missing coefficient.'
],['Horizontal line y=k','Vertical line x=k'],[E('Special line','Describe the graph of x=−4.',['Every point has x-coordinate −4.','y can be any real number.','Such points form a vertical line 4 units left of y-axis.'],'Vertical line x=−4, slope undefined.')]]
]],
['Pairs of linear equations',[
['Two constraints can pinpoint one pair',[
'One linear equation gives a line of possible solutions; a second independent equation can select their intersection. The ordered pair at the crossing must satisfy both equations simultaneously.',
'For x+y=10 and x−y=2, adding eliminates y, giving 2x=12 and x=6. Substituting yields y=4. The intersection is (6,4), and it is verified in both originals.'
],[],[E('Solve simultaneous equations','Solve x+y=9 and x−y=1.',['Add equations to eliminate y: 2x=10.','x=5.','Substitute into x+y=9 to obtain y=4.'],'(5,4)')]],
['Substitution method with full checks',[
'Choose one equation that is easy to rearrange, such as y=3x+1. Substitute it into the second equation to obtain a single-variable equation. After solving, recover the other variable and substitute into both original statements.',
'Substitution is often efficient when a variable already has coefficient 1 or −1. Do not discard a negative sign when replacing a bracketed expression; for example 2x−(3x+1)=−x−1.'
],[],[E('Substitution worked example','Solve y=2x+3 and 3x+y=18.',['Replace y in second equation: 3x+(2x+3)=18.','5x+3=18 ⇒ 5x=15 ⇒ x=3.','y=2(3)+3=9.','Check 3(3)+9=18.'],'x=3,y=9')]],
['Elimination method',[
'When two equations contain equal or opposite coefficients of a variable, adding or subtracting their sides can eliminate it. If necessary multiply an entire equation by a nonzero constant before combining.',
'For 2x+3y=17 and 4x−3y=7, adding gives 6x=24, so x=4. Substitution gives 8+3y=17, hence y=3. This method is especially useful when coefficients line up.'
],[],[E('Eliminate y','Solve 5x+2y=19 and 3x−2y=5.',['Add: 8x=24 ⇒ x=3.','Substitute into first: 15+2y=19.','2y=4 ⇒ y=2.'],'x=3,y=2')]]
]],
['Graphical meaning of a pair',[
['Intersecting, parallel or coincident lines',[
'Two nonvertical lines with different slopes intersect once, so the system has one solution. Two distinct parallel lines have equal slopes but different intercepts and never intersect, so the system has no solution. If both equations describe the same line, every point on it satisfies both, giving infinitely many solutions.',
'The algebraic version uses coefficients in a₁x+b₁y=c₁ and a₂x+b₂y=c₂. A nonzero determinant a₁b₂−a₂b₁ guarantees a unique solution. When the determinant is zero, examine whether the equations are identical multiples or inconsistent.'
],['Unique solution iff a₁b₂−a₂b₁≠0'],[E('Parallel inconsistency','How many solutions do y=2x+1 and y=2x−4 have?',['Both have slope 2.','Their y-intercepts are different, 1 and −4.','Distinct parallel lines have no crossing.'],'No solution')]],
['Check dependent and inconsistent equations',[
'The equations 2x+4y=10 and x+2y=5 are the same condition; there are infinitely many common ordered-pair solutions. But 2x+4y=10 and x+2y=7 cannot both hold because the first implies x+2y=5.',
'When reducing a system, an identity such as 0=0 signals dependence rather than a unique pair. A contradiction such as 0=2 signals inconsistency and no solution.'
],[],[E('Classify a pair','Classify 3x+6y=12 and x+2y=4.',['Divide first equation by 3 to obtain x+2y=4.','The equations match exactly.'],'Infinitely many solutions')]]
]]
],{
lead:'An equation in two variables describes an entire line of possible solutions; a second equation can identify an intersection. These lessons connect coordinate tables, intercepts, slope, real-world rates and the algebra of simultaneous equations. Every solution is verified against the original constraints.',
mixed:[
['Mixed equation and graph','Find the line through (1,4) and (5,12); state its intercept and value at x=10.',['m=(12−4)/(5−1)=8/4=2.','y−4=2(x−1) ⇒ y=2x+2.','At x=0, y=2, so intercept is (0,2).','At x=10, y=2(10)+2.'],'y=2x+2; intercept (0,2); output 22.'],
['Mixed simultaneous word problem','Adult tickets cost ₹50, child tickets ₹30. A family buys 9 tickets costing ₹370. How many of each?',['Let a=adult count and c=child count.','a+c=9, 50a+30c=370.','Substitute c=9−a: 50a+30(9−a)=370.','20a=100 ⇒ a=5 and c=4.','Check count 9 and cost 250+120=370.'],'5 adult and 4 child tickets.']
]});
})();