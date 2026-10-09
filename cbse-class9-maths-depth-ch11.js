/* Chapter 11 — The World of Algorithms */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('The World of Algorithms',[
['What makes a procedure an algorithm?',[
['From instructions to a reliable method',[
'An algorithm is an ordered set of definite steps that solves a specified class of problems. Its input must be clear, each instruction must have an unambiguous meaning, and a correct algorithm must eventually stop with the promised result for every allowed input.',
'The recipe "keep trying until it looks right" is not a reliable mathematical algorithm: its stopping criterion is vague. By contrast "subtract the smaller of two positive integers from the larger until the numbers match" gives exact repeatable actions and a definite stopping condition.'
],['Algorithm = inputs + definite steps + output + termination'],[E('Recognise an algorithm','Is "guess a divisor until you are satisfied" a valid complete algorithm for gcd?',['The instruction does not specify how to choose guesses.','"Satisfied" is not a precise stopping condition.','It does not guarantee the greatest common divisor.'],'No; the procedure is ambiguous and lacks correctness guarantees.')]],
['Correctness and termination are separate questions',[
'An algorithm can stop quickly but produce a wrong answer; another can perform mathematically valid steps yet loop forever. To trust a method, check both correctness (its output satisfies the goal) and termination (it reaches that output in finitely many steps).',
'A useful idea is an invariant: a property that remains true after every iteration. For gcd methods, the set of common divisors of the two numbers stays unchanged after suitable subtraction or remainder operations. The numbers also shrink, eventually forcing the process to stop.'
],[],[E('Find a stopping rule','For finding the gcd by repeated subtraction of positive integers, when should the algorithm stop?',['Subtract the smaller positive number from the larger.','Both numbers remain positive.','When the numbers are equal, their common value is the gcd.'],'Stop when a=b and output a.')]]
]],
['Adding numbers digit by digit',[
['Place value explains carrying',[
'In base ten, each digit represents a multiple of a power of ten. When adding the units digits, a sum of 10 or more must be separated into a units digit and a carry representing one or more groups of ten.',
'For 478+367, the units total 8+7=15, giving units 5 and carry 1 ten. Tens add as 7+6+1=14, giving tens 4 and carry 1 hundred. Hundreds become 4+3+1=8, producing 845.'
],['For a column sum s: written digit=s mod 10; carry=⌊s/10⌋'],[E('Column addition with carries','Calculate 586+749 and explain the carries.',['Units: 6+9=15, write 5 carry 1.','Tens: 8+4+1=13, write 3 carry 1.','Hundreds: 5+7+1=13, giving thousands 1 and hundreds 3.'],'1335')]],
['An algorithm for any length of addition',[
'An addition algorithm must handle numbers with one digit or hundreds of digits. Begin at the rightmost column, combine corresponding digits with the carry, write the final digit of the sum and pass the remaining tens to the next column.',
'After every column, the already written digits match the appropriate final digits of the true sum; this is an invariant that supports correctness. The algorithm terminates because the input contains only finitely many digits and the carry can be handled with one final step.'
],[],[E('Explain the general pattern','Why do we start decimal column addition from the right?',['The rightmost place contains the smallest units.','Carries flow from a lower place value to the next higher place value.','Processing right to left ensures the incoming carry is known before finishing each column.'],'Starting at units makes the carrying rule systematic.')]]
]],
['Divisors and greatest common divisor',[
['Divisibility and common factors',[
'An integer d divides a positive integer n if n=dk for some integer k. A common divisor of a and b divides both. Their greatest common divisor, gcd(a,b), is the largest positive integer that divides both.',
'For instance the positive divisors of 18 are 1,2,3,6,9,18 and of 30 are 1,2,3,5,6,10,15,30. The common divisors are 1,2,3,6, so gcd(18,30)=6. Listing is intuitive but becomes slow when inputs are large.'
],['gcd(a,b)=greatest positive common divisor'],[E('Factor listing','Find gcd(24,36) by listing factors.',['Divisors of 24: 1,2,3,4,6,8,12,24.','Divisors of 36: 1,2,3,4,6,9,12,18,36.','The greatest common entry is 12.'],'12')]],
['Prime factors and the gcd',[
'The greatest common divisor can also be built from prime factorisations by taking every shared prime at its smaller exponent. For 72=2³×3² and 90=2×3²×5, their shared part is 2×3²=18.',
'This method makes the meaning of gcd visible, but finding complete prime factorisations of very large integers can be burdensome. Euclid’s algorithm avoids that work by exploiting the relationship between a pair and their difference or remainder.'
],['gcd(72,90)=2×3²=18'],[E('Prime factor gcd','Find gcd(84,126).',['84=2²×3×7.','126=2×3²×7.','Take the smaller exponent of each common prime: 2×3×7.'],'42')]]
]],
['Improving an algorithm',[
['Compare correct methods by amount of work',[
'For tiny inputs, listing divisors is easy to explain. For large inputs, checking every possible divisor may require many trials. A faster method reduces the numbers without changing their gcd, then works on the smaller pair.',
'An algorithm is efficient if it solves a problem using reasonable work and memory. Count repetitions for comparable inputs rather than measuring a single noisy computer run. A method can be correct but still needlessly slow.'
],[],[E('Compare possible methods','Which method is more practical for gcd(1,000,002, 1,000,000): listing all divisors or subtracting the smaller once?',['Subtracting gives the pair (2,1,000,000).','The gcd is unchanged, and gcd(2,1,000,000)=2 is easy.','Full divisor listing would examine many candidates.'],'Use gcd-preserving reduction rather than exhaustive divisor lists.')]],
['Repeated work and stopping conditions',[
'To compare two algorithms, count how many elementary operations they perform. A linear search through n entries might inspect up to n values, while a well-chosen mathematical shortcut may require far fewer steps.',
'The exact number of steps can depend on input values, not only the number of digits. In repeated subtraction, numbers of very different magnitudes may need many subtractions; replacing repeated subtractions by division with remainder can greatly reduce the count.'
],[],[E('Subtraction count','How many subtraction steps take (100,1) to equal numbers?',['Repeatedly subtract the smaller 1 from the larger 100.','It takes 99 subtractions to make the first number 1.','The pair becomes (1,1).'],'99 steps; division-based Euclid is faster.')]]
]],
['Euclid’s subtraction algorithm',[
['The gcd survives subtraction',[
'If d divides both a and b, it also divides a−b. Conversely if d divides b and a−b, it divides their sum a=(a−b)+b. Thus the common divisors of (a,b) and (a−b,b) are exactly the same.',
'For a>b>0, gcd(a,b)=gcd(a−b,b). This establishes correctness of the subtraction step. Repeating while unequal eventually reaches equal positive numbers, and their common value is the gcd.'
],['gcd(a,b)=gcd(a−b,b) when a>b>0'],[E('Subtraction trace','Find gcd(28,16) using subtraction.',['(28,16)→(12,16)→(12,4).','(12,4)→(8,4)→(4,4).','The algorithm stops when equal.'],'4')]],
['What the invariant tells us',[
'At each subtraction, the pair changes, but its gcd does not. This unchanging quantity is an invariant. In a proof, state the invariant and the stopping condition separately.',
'Because both numbers remain positive and the larger number strictly decreases at each step, the algorithm cannot subtract forever. Eventually the pair becomes equal. The invariant then guarantees that this equal value is the gcd of the original inputs.'
],[],[E('Explain an invariant','Why does replacing (45,18) with (27,18) preserve the gcd?',['45−18=27.','Every common divisor of 45 and 18 divides 27; the reverse follows because 45=27+18.','The sets of common divisors match.'],'gcd(45,18)=gcd(27,18).')]]
]],
['Division-based gcd algorithm',[
['Replacing repeated subtraction by a remainder',[
'Long division writes a=qb+r with 0≤r<b for positive a and b. Subtracting b exactly q times leaves remainder r. Therefore gcd(a,b)=gcd(b,r). This compresses many subtraction steps into one division.',
'For gcd(252,105), divide 252 by 105 to obtain remainder 42; then divide 105 by 42 to obtain remainder 21; finally 42 divided by 21 has remainder zero. The last nonzero remainder, 21, is the gcd.'
],['a=qb+r, 0≤r<b','gcd(a,b)=gcd(b,r)'],[E('Euclid’s algorithm','Find gcd(414,276).',['414=1×276+138.','276=2×138+0.','Last nonzero remainder is 138.'],'138')]],
['Why the division algorithm finishes',[
'Each new nonzero remainder is smaller than the preceding divisor. The positive remainders form a strictly decreasing sequence of nonnegative integers; this cannot continue indefinitely.',
'When a remainder becomes zero, the current divisor divides the preceding number exactly. Since every preceding reduction preserved gcd, the current divisor is the gcd of the original pair. This combines termination and correctness into a complete explanation.'
],[],[E('Trace and justify','Use Euclid to find gcd(119,34).',['119=3×34+17.','34=2×17+0.','The remainders decrease and then become zero.'],'17')]]
]],
['Data structures and tracing',[
['Trace tables expose mistakes',[
'An algorithm trace table records the state of the variables after every iteration. For Euclid, columns can be labelled a, b and remainder r. The first row stores the input pair, and each subsequent row replaces (a,b) by (b,r).',
'Tracing helps detect errors in remainder calculations and loop termination. Students should test an algorithm on a normal input, the edge case where one number divides the other, and equal inputs.'
],[],[E('Trace table','Trace division-based Euclid for 48 and 18.',['48=2×18+12, so the next pair is (18,12).','18=1×12+6, next pair (12,6).','12=2×6+0.'],'gcd(48,18)=6')]],
['Pseudocode and input restrictions',[
'Pseudocode describes an algorithm in plain structured instructions without requiring a particular programming language. For positive a,b, repeat: divide a by b, store remainder r, set a=b, set b=r. Stop when b=0 and return a.',
'Input restrictions matter. The algorithm must explicitly handle b=0 to avoid division by zero. For nonnegative inputs, gcd(a,0)=a when a>0; the pair (0,0) has no uniquely defined greatest positive common divisor in this treatment.'
],['While b≠0: r=a mod b; a=b; b=r; output a'],[E('Handle an edge case','What does gcd(75,0) return under Euclid’s algorithm?',['Since b=0, the loop does not execute.','The output a=75 is the greatest positive divisor of 75 and 0.'],'75')]]
]]
],{
lead:'An algorithm is more than a list of instructions: it must produce the correct result, stop and use reasonable effort. Starting with familiar place-value addition, this chapter develops divisibility and greatest common divisors, then derives Euclid’s algorithm using a preserved invariant. Trace tables connect mathematics to computing.',
mixed:[
['Mixed algorithm proof','Show that gcd(234,90)=18 by Euclid’s division method.',['234=2×90+54.','90=1×54+36.','54=1×36+18.','36=2×18+0.','Each remainder transformation preserves the gcd.'],'18'],
['Mixed efficiency comparison','For positive integers (360,12), compare subtraction-based and division-based Euclid in number of reductions.',['Subtraction repeatedly reduces 360 by 12 until equal, requiring 29 subtractions.','Division gives 360=30×12+0 in one remainder step.','Both have gcd=12, but the division method compresses repeated subtraction.'],'gcd=12; division algorithm uses far fewer reductions.']
]});
})();