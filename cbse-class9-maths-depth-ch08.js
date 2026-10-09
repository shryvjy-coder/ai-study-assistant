/* Chapter 8 — Predicting What Comes Next: Exploring Sequences and Progressions */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Predicting What Comes Next: Exploring Sequences and Progressions',[
['Sequences and term notation',[
['Why order matters',[
'A sequence is an ordered arrangement of numbers, drawings or measurements. The term at position n is written aₙ. Unlike a set, a sequence may repeat entries, and their positions are essential. The list 2,4,2 and 2,2,4 contains the same elements but describes different sequences.',
'We often recognise a pattern by comparing neighbouring terms, but a finite beginning alone does not determine a unique continuation. A mathematical question should specify or make clear which rule is intended. For example 1,2,3 can continue as counting numbers or as the start of many other rules.'
],['a₁ = first term; aₙ = nth term'],[E('Term notation','For aₙ=3n−1, identify a₁, a₂ and a₁₀.',['Substitute n=1,2,10 separately.','a₁=3−1=2, a₂=6−1=5.','a₁₀=30−1=29.'],'2,5,29')]],
['First differences and second differences',[
'For a sequence with equally spaced term positions, subtract each term from the next to form first differences. Constant first differences signal an arithmetic progression. If these first differences change steadily, their own differences may be constant, suggesting a quadratic pattern.',
'For example 1,4,9,16 has first differences 3,5,7 and second differences 2,2. This observation suggests n², which can be verified against the stated pattern rule. Differences are evidence, not a proof that every future term is forced.'
],[],[E('Analyse differences','Find the first and second differences of 2,7,14,23,34.',['First differences: 5,7,9,11.','Second differences: 2,2,2.'],'Constant second difference 2; not an AP.')]]
]],
['Explicit rules',[
['The formula tells you any term directly',[
'An explicit formula for a sequence gives aₙ directly from its position n. For example aₙ=5n+1 gives the 100th term without computing the first 99 values.',
'The position must be interpreted correctly. If the first term is a₁ rather than a₀, substituting n=1 must reproduce the listed first entry. Confusing the starting index causes a one-term shift in every result.'
],['aₙ=f(n)'],[E('Faraway term','If aₙ=4n+7, find a₇₅.',['Substitute n=75.','4(75)+7=300+7.'],'307')]],
['Finding a linear explicit rule',[
'An arithmetic sequence with first term a and common difference d has nth term a+(n−1)d. The n−1 appears because there are exactly n−1 steps from the first term to the nth.',
'For 8,13,18,... the difference is 5, so aₙ=8+5(n−1)=5n+3. Check at n=1 and n=3 before using the formula for a distant term.'
],['aₙ=a₁+(n−1)d'],[E('From list to rule','Find an explicit rule for 11,18,25,32,... .',['First term=11 and common difference=7.','aₙ=11+7(n−1).','Simplify to 7n+4.'],'aₙ=7n+4')]]
]],
['Recursive rules',[
['Recursion refers back to earlier terms',[
'A recursive description specifies one or more initial terms and explains how to obtain each later term from earlier ones. For example a₁=3 and aₙ=aₙ₋₁+4 for n≥2 gives 3,7,11,15,... .',
'Without the starting value a₁, the recursion alone is incomplete: infinitely many sequences could follow the same update. Recursion mirrors real-life processes that grow step by step, such as a saving balance increased by a fixed amount each month.'
],['aₙ=aₙ₋₁+d with a₁ given'],[E('Apply recursion','a₁=2 and aₙ=2aₙ₋₁ for n≥2. Find a₄.',['a₂=2×2=4.','a₃=2×4=8.','a₄=2×8=16.'],'16')]],
['Explicit versus recursive descriptions',[
'A recursive rule can be natural for generating the next step, whereas an explicit formula is usually faster for a distant term. For fixed-addition recursion aₙ=aₙ₋₁+d, the explicit rule is aₙ=a₁+(n−1)d.',
'For fixed-multiplication recursion aₙ=raₙ₋₁, the explicit rule is aₙ=a₁rⁿ⁻¹. Both forms describe the same sequence; verify by substitution and identify whether n begins at 1.'
],['AP recursion: aₙ=aₙ₋₁+d','GP recursion: aₙ=raₙ₋₁'],[E('Convert a recursion','Given a₁=5 and aₙ=aₙ₋₁+3, write an explicit rule.',['The first term is 5.','Each of n−1 changes adds 3.','aₙ=5+3(n−1)=3n+2.'],'aₙ=3n+2')]]
]],
['Arithmetic progressions',[
['Definition and the nth-term relationship',[
'An arithmetic progression has one constant difference d between consecutive terms. Adding d repeatedly means term n equals the first term plus n−1 copies of d. This derivation holds for positive, zero and negative differences.',
'The nth term is not automatically a₁+nd: that would move one extra step. A useful check is n=1, which must return exactly the first term.'
],['aₙ=a+(n−1)d','d=aₙ₊₁−aₙ'],[E('Decreasing AP','Find the 15th term of 40,37,34,... .',['a=40 and d=−3.','a₁₅=40+14(−3)=40−42.'],'−2')]],
['Sum of an arithmetic progression',[
'To sum a sequence with n terms, write it forwards and backwards. Each paired position adds to first term plus last term: a₁+aₙ. There are n such pairs when both lists are added, so twice the original sum equals n(a₁+aₙ).',
'Therefore Sₙ=n(a₁+aₙ)/2 = n[2a+(n−1)d]/2. The formula counts whole terms; if a word problem asks about n gaps or intervals, first establish how many terms are actually included.'
],['Sₙ=n(a₁+aₙ)/2','Sₙ=n[2a+(n−1)d]/2'],[E('Sum of a progression','Find 6+10+14+...+50.',['a=6 and d=4.','Solve 50=6+(n−1)4 ⇒ n−1=11 ⇒ n=12.','S=12(6+50)/2=6×56.'],'336')]]
]],
['Sum of the first n natural numbers',[
['Pairing from opposite ends',[
'Write 1+2+...+n and underneath n+(n−1)+...+1. Each column adds to n+1 and there are n columns, giving 2S=n(n+1). Dividing by two yields the familiar triangular-number formula.',
'The argument works for every positive integer n and explains the pattern 1,3,6,10,... . The formula is not merely a result inferred from a few examples.'
],['1+2+...+n=n(n+1)/2'],[E('Sum of integers','Calculate 1+2+...+80.',['n=80.','S=80×81/2=40×81.'],'3240')]],
['Sum of the first n odd numbers',[
'The first n positive odd integers are 1,3,5,...,2n−1. Their sum is n². One visual proof adds successive L-shaped borders to squares: an (n−1)² square needs 2n−1 additional unit squares to become an n² square.',
'Algebraically this follows from the AP sum with first term 1 and difference 2: Sₙ=n[2+(n−1)2]/2=n·2n/2=n².'
],['1+3+...+(2n−1)=n²'],[E('Odd-number sum','Find the sum of the first 24 odd numbers.',['Use Sₙ=n².','Substitute n=24.'],'576')]]
]],
['Geometric progressions',[
['A common multiplier rather than a common difference',[
'A geometric progression multiplies each term by a fixed nonzero ratio r to get the next. The sequence 3,6,12,24,... has ratio 2. Unlike an AP, its first differences 3,6,12 grow rather than staying fixed.',
'For first term a and ratio r, each transition contributes another factor r, so aₙ=arⁿ⁻¹. If r lies between 0 and 1, positive terms shrink; if r<0, their signs alternate. The ratio is defined as the next term divided by a nonzero previous term.'
],['aₙ=arⁿ⁻¹','r=aₙ₊₁/aₙ when aₙ≠0'],[E('Geometric nth term','A GP begins 5,15,45,... . Find a₆.',['a=5 and r=3.','a₆=5·3⁵=5·243.'],'1215')]],
['Growth, decay and exponent patterns',[
'Repeated percentage growth is multiplicative. Increasing a population by 10% each year means multiplying by 1.1 each year, not adding a fixed number every time. The amount after n complete years is initial amount times (1.1)ⁿ.',
'This differs from linear growth. With a fixed annual increase of 100, differences stay constant; with a fixed percentage increase, the numerical difference becomes larger as the base increases.'
],['Amount after n periods=A₀(1+r)ⁿ'],[E('Doubling pattern','A culture starts at 12 units and doubles three times. Find the result.',['Each doubling multiplies by 2.','After three doublings amount=12×2³.'],'96 units')]]
]],
['Visual patterns and fractals',[
['Counting dots, tiles and nested shapes',[
'A visual pattern may add one row of tiles, another layer of squares or a growing arrangement of dots. Label the stage number, count each figure and identify which new pieces appear from one stage to the next.',
'The aim is not merely to guess a formula but to explain it structurally. For a triangular arrangement, stage n may contain n(n+1)/2 dots because n rows contribute 1,2,...,n dots.'
],[],[E('Triangular arrangement','The fourth figure contains 1+2+3+4 dots. Predict stage 12.',['For stage n, total=n(n+1)/2.','Use 12×13/2.'],'78 dots')]],
['Self-similarity and optional mathematical exploration',[
'Sometimes each stage replaces one geometric piece with several smaller copies. Such a pattern may exhibit self-similarity: the smaller parts resemble the overall shape. The number of pieces can form a geometric progression, while lengths may shrink by a constant scale factor.',
'Fractal patterns provide an enriching visual connection to repeated rules, but avoid importing advanced limits or fractal dimension into compulsory exam answers unless your teacher explicitly includes them.'
],[],[E('Repeated replacement','One segment is replaced by four smaller segments at each stage. If stage 0 has one segment, how many are at stage 4?',['The number multiplies by 4 at each stage.','Stage n has 4ⁿ segments.','Stage 4 has 4⁴.'],'256 segments')]]
]]
],{
lead:'Patterns appear in savings, architecture, tiled floors and growing shapes. To predict beyond the first few observations, we need exact rules: explicit formulas for any position, recursive instructions for the next step, constant-difference arithmetic progressions and constant-ratio geometric progressions. These lessons derive the formulas and practise their use.',
mixed:[
['Mixed arithmetic progression','An auditorium has 12 seats in its first row and each following row has 3 more. Find seats in row 20 and total seats in rows 1–20.',['a=12,d=3.','a₂₀=12+19×3=69.','S₂₀=20(12+69)/2=10×81.'],'69 seats in row 20; 810 seats total.'],
['Compare two models','Pattern A starts at 4 and adds 4 each stage; pattern B starts at 4 and doubles each stage. Compare the fifth terms.',['A is an AP: a₅=4+4×4=20.','B is a GP: b₅=4×2⁴=64.','Difference is 64−20.'],'A fifth term=20, B fifth term=64; B is 44 higher.']
]});
})();