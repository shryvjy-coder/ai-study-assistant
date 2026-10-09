/* Chapter 10 — How Quantities Combine: Understanding Data */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('How Quantities Combine: Understanding Data',[
['Combining averages',[
['Averages are total per observation',[
'An arithmetic mean is found by adding every observation and dividing by the number of observations. If five measured values have a total of 60 units, the mean is 12 units. The calculation uses the full set, not merely its largest and smallest values.',
'When datasets are combined, their totals and counts must be combined. Suppose Class A has 10 students with average 72 and Class B has 30 students with average 80. The combined average is not the average of 72 and 80 because the classes have different numbers of students.'
],['Mean=total of observations/number of observations'],[E('Combine two class means','Ten students average 72 marks; thirty students average 80. Find combined mean.',['Class A total=10×72=720.','Class B total=30×80=2400.','Combined total=3120 over 40 students.','Mean=3120/40.'],'78 marks')]],
['Recover totals from subgroup means',[
'An average is a compressed summary of a group. If you know both its mean and size, you can recover its total by multiplying mean by count. This allows valid comparisons and combination even when individual observations are unavailable.',
'If you do not know the group sizes, the combined mean generally cannot be determined exactly. Treating subgroup averages as equal-weight observations is justified only if the groups have the same number of members.'
],['Group total=group mean×group size'],[E('Find a missing mean','A group of 12 students has a mean of 15. Another group of 8 joins and the new mean is 17. Find the second group mean.',['Original total=12×15=180.','Combined total=20×17=340.','Second-group total=340−180=160.','Divide by 8 students.'],'20')]]
]],
['Weighted averages',[
['Why different contributions need different weights',[
'A weighted average combines several values when they represent unequal quantities or importance. Multiply each value x by its weight w, add the products and divide by the sum of weights. The denominator is total weight, not number of distinct values.',
'For example, if one assignment is worth 40% and an examination is worth 60%, the examination score contributes more. The weights must refer to the same whole and generally sum to 100% when expressed as percentages.'
],['Weighted mean=Σ(wᵢxᵢ)/Σwᵢ'],[E('Marks with weights','Coursework counts 30% and exam 70%. A student scores 80 and 90 respectively. Find weighted score.',['Weighted contributions: 0.3×80=24 and 0.7×90=63.','Add 24+63.'],'87')]],
['Deriving an average of averages',[
'Say one dataset contains n₁ observations with mean m₁ and another contains n₂ observations with mean m₂. Their total sums are n₁m₁ and n₂m₂; combining those totals gives n₁m₁+n₂m₂.',
'Divide by combined count n₁+n₂. This yields the weighted average of the subgroup means. A useful test is that the combined mean must lie between the smallest and largest subgroup means when weights are positive.'
],['Combined mean=(n₁m₁+n₂m₂)/(n₁+n₂)'],[E('Combined height','A group of 4 has average height 150 cm; another group of 6 averages 160 cm. Find combined average.',['Total height=4×150+6×160=600+960=1560.','Total people=10.','Divide 1560 by 10.'],'156 cm')]]
]],
['Mixtures',[
['Mixture concentration is a weighted ratio',[
'When combining liquids of different concentrations, first determine the amount of the desired substance in each part. A 20% salt solution of 100 g contains 20 g salt; a 50% solution of 200 g contains 100 g salt.',
'The combined salt mass is 120 g in 300 g solution, giving concentration 120/300=40%. You cannot simply average 20% and 50%, because there is twice as much of the stronger solution.'
],['Mixture concentration=(Σ amountᵢ×concentrationᵢ)/(Σ amountᵢ)'],[E('Two concentrations','Mix 150 mL of 10% solution with 50 mL of 30% solution. Find concentration.',['Solute quantities are 150×0.10=15 mL and 50×0.30=15 mL.','Total solute=30 mL; total mixture=200 mL.','Ratio=30/200.'],'15%')]],
['Mixture questions with unknown quantity',[
'Sometimes the desired final concentration is given and one mixture quantity is unknown. Form an equation equating the total amount of active ingredient from the components with the amount implied by the final proportion.',
'Suppose x litres of 40% solution are mixed with 2 litres of 10% solution to obtain 25%. Then 0.4x+0.2=0.25(x+2). Solving this linear equation provides the required amount; always check the result is nonnegative and the final percentage lies between the starting concentrations.'
],[],[E('Find amount to add','How many litres of 40% solution should be mixed with 2 L of 10% solution to obtain 25%?',['Let x be litres of 40% solution.','0.40x+0.10(2)=0.25(x+2).','0.40x+0.20=0.25x+0.50.','0.15x=0.30.'],'x=2 litres')]]
]],
['Custom weights and indices',[
['Weighted scores from real assessments',[
'A course may allocate weights to homework, projects and tests. The final score is calculated from percentage weights, not from how many assessment categories exist. If categories are 20%, 30% and 50%, their weights add to 100%.',
'One convenient calculation uses weight fractions: 20% is 0.2, 30% is 0.3 and 50% is 0.5. Multiply each category score by its fraction and add. Do not divide the final result by 3 because it is already weighted across the entire course.'
],[],[E('A three-part grade','Homework 90 counts 20%, project 70 counts 30%, exam 82 counts 50%. Find the final mark.',['Weighted contribution=0.2×90+0.3×70+0.5×82.','Compute 18+21+41.'],'80')]],
['Choosing meaningful weights',[
'Weights can represent numbers of people, hours worked, quantities blended or decision importance. They must share compatible units. For example weighting speed values by the amount of time spent travelling does not generally give overall speed when distances differ; overall speed is total distance divided by total time.',
'Never interpret a weighted mean without asking what each weight represents. A combined classroom mean weights by class sizes, while an assessment score weights by prescribed mark shares.'
],[],[E('Time-weighted rate','A car travels 30 km at 30 km/h and then 30 km at 60 km/h. Find average speed.',['Times are 30/30=1 h and 30/60=0.5 h.','Total distance=60 km; total time=1.5 h.','Average speed=60/1.5.'],'40 km/h, not 45 km/h')]]
]],
['Stacked columns',[
['What stacked bars show',[
'A stacked bar is divided into segments that represent contributions to a total. The overall bar height represents the total for one category, and segment heights represent how much each component contributes.',
'A stacked display allows comparison of both absolute totals and composition when the vertical scale is numerical. Always read the legend and check whether segment heights are values or cumulative endpoints. A 40-unit upper segment starts where the lower segment ends.'
],[],[E('Read a stack','A stacked bar shows 12 science books, 18 fiction books and 10 history books. Find total and fiction share.',['Total books=12+18+10=40.','Fiction share=18/40=0.45.'],'40 books, with fiction 45% of the total')]],
['Comparing stacked bars with different totals',[
'Two bars may have the same colour pattern but different total heights. Equal-looking segment proportions do not imply equal segment counts. For example 25% of 40 is 10, while 25% of 80 is 20.',
'For fair comparison, label values or percentages clearly. If the goal is to compare proportions rather than amounts, a 100% stacked chart is usually more appropriate because all bars have the same height.'
],[],[E('Same share, different count','Group A total 40 has 30% choosing maths. Group B total 100 also has 30%. Compare counts.',['Group A count=0.3×40=12.','Group B count=0.3×100=30.','Proportions match although counts differ.'],'12 versus 30')]]
]],
['Alternatives to pie charts and interpreting proportions',[
['A 100% stacked bar normalises each total',[
'In a 100% stacked bar, every segment is converted to a percentage of its group total. This makes relative composition easy to compare across groups with unequal sizes, but the graph no longer communicates the total quantity unless labels are added.',
'A pie chart likewise represents shares of one whole, while stacked bars can put several groups side by side. The choice of graph should match whether the question concerns quantity, proportion or a comparison of both.'
],['Segment percentage=(segment value/total)×100'],[E('Normalise data','A class has 12 cyclists, 18 walkers and 10 bus users. Find 100% stacked shares.',['Total=12+18+10=40.','Cyclists=12/40=30%.','Walkers=18/40=45%.','Bus=10/40=25%.'],'30%,45%,25%; sum 100%.')]],
['Avoiding misleading graph interpretations',[
'Graphs can mislead when axes do not start where expected, categories are unevenly grouped, or totals are hidden. A large-looking slice in one small class may represent fewer students than a smaller slice in a much larger class.',
'In exam explanations, identify whether the chart displays absolute values or percentages, compare using suitable quantities, and make a conclusion that the displayed data actually supports.'
],[],[E('False conclusion from percentages','Class A has 20 students and 50% choose art. Class B has 60 students and 25% choose art. Which has more art students?',['Class A: 0.5×20=10.','Class B: 0.25×60=15.','Compare counts, not only the percentages.'],'Class B has 5 more art students.')]]
]]
],{
lead:'Averages and graphs help summarise complex information, but summaries can mislead when group sizes or weights differ. These lessons derive combined and weighted means, explain mixture concentration, and distinguish stacked counts from stacked percentages. Every problem begins by asking what is being counted or weighted.',
mixed:[
['Mixed weighted average','A school combines a 25-student group averaging 64 with a 35-student group averaging 76. Find new mean.',['First total=25×64=1600.','Second total=35×76=2660.','Sum=4260 for 60 students.','Mean=4260/60.'],'71'),
['Mixed mixture and chart','A café combines 2 L of 20% fruit juice with 3 L of 50% juice. Find final percentage and fruit volume.',['Pure fruit quantity=2×0.2+3×0.5=0.4+1.5=1.9 L.','Total volume=5 L.','Concentration=1.9/5=0.38.'],'38% fruit juice, 1.9 L fruit component.')
]});
})();