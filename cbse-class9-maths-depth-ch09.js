/* Chapter 9 — Propositions and their Converses */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Propositions and their Converses',[
['What is a proposition?',[
['A mathematical sentence must have a truth value',[
'A proposition is a statement that is either true or false, even when we do not yet know which. "Every multiple of 8 is even" is true. "Every even number is a multiple of 8" is false. Both are propositions because each has a definite truth value.',
'A question such as "Is 8 even?" or a command such as "Draw a triangle" is not a proposition. An open sentence such as "x+3=7" is not a single definite true-or-false proposition until x is specified or a quantifier such as "for every" is added.'
],[],[E('Proposition classification','Which is a proposition: "All rectangles are squares" or "Find the area"?',['The first is a factual mathematical assertion, even though it is false.','The second is an instruction without a truth value.'],'"All rectangles are squares" is a false proposition.')]],
['Hypotheses and conclusions',[
'Conditional propositions take the form "if P, then Q". The condition P is the hypothesis and Q is the conclusion. The statement claims that whenever P holds, Q must follow; it does not automatically say what happens when P is false.',
'For example "if a quadrilateral is a square, then its diagonals are equal" names the condition of being a square and a property that follows. A clear proof shows why the hypothesis forces the conclusion rather than checking one drawing.'
],['P⇒Q means if P then Q'],[E('Identify parts','For "If a number is divisible by 12, then it is divisible by 3", identify P and Q.',['P is the testable condition of divisibility by 12.','Q is the conclusion of divisibility by 3.'],'P: divisible by 12; Q: divisible by 3.')]]
]],
['The converse',[
['Reversing hypothesis and conclusion',[
'The converse of "if P then Q" is "if Q then P". It swaps the roles of hypothesis and conclusion. The original proposition and its converse are different statements and must be investigated separately.',
'For example, if an integer is divisible by 6 it is divisible by 3. The converse would claim that every integer divisible by 3 is divisible by 6. The number 9 refutes that converse.'
],['Original P⇒Q; converse Q⇒P'],[E('Write a converse','Write the converse of "If two lines are parallel, alternate interior angles are equal".',['Original hypothesis: the lines are parallel.','Original conclusion: the alternate interior angles are equal.','Swap them while retaining the geometric setting of two lines cut by a transversal.'],'If alternate interior angles are equal, the lines are parallel.')]],
['A false converse does not weaken a true theorem',[
'A common mistake is to assume that if a proposition is true its converse must also be true. In fact, each direction needs its own argument or counterexample. A square is a rectangle, but not every rectangle is a square.',
'When a converse is false, identify a case that satisfies its new hypothesis but not its new conclusion. Simply saying "not always" is less convincing than exhibiting specific dimensions, numbers or a labelled diagram.'
],[],[E('True statement, false converse','Explain why "If a shape is a square, it is a rectangle" has a false converse.',['A square has four right angles and thus is a rectangle.','A 2 cm ×5 cm rectangle also has four right angles but unequal adjacent sides.','It is a rectangle but not a square.'],'The converse is false; a 2-by-5 rectangle is a counterexample.')]]
]],
['Counterexamples',[
['One counterexample refutes every-case claims',[
'An assertion containing "for every" or "all" promises to hold in every allowed case. To disprove it, find one allowed input for which the conclusion fails while the hypothesis holds. This is a counterexample.',
'For example the statement "Every prime number is odd" fails for 2, which has exactly two positive divisors, 1 and 2, but is even. One example is sufficient to refute the claim; a thousand successful odd primes would never repair it.'
],[],[E('Disprove a claim','Find a counterexample to "The square of every integer exceeds the integer".',['Try n=0: n²=0 is not greater than n=0.','The universal strict inequality fails.'],'n=0 (also n=1).')]],
['Check the full hypothesis before rejecting a claim',[
'An apparent counterexample must satisfy all assumptions. If a claim concerns positive integers, a negative number is not a valid counterexample. If it requires a nondegenerate triangle, a collinear triple of points is outside the hypothesis.',
'Write the hypothesis explicitly, select an admissible case and show which part of the conclusion fails. This discipline makes mathematical criticism precise rather than guesswork.'
],[],[E('Invalid counterexample','A proposition concerns all positive integers n. Can n=−1 disprove it?',['The hypothesis requires n>0 and integer.','−1 is an integer but is not positive.','A valid counterexample must lie within the allowed domain.'],'No.')]]
]],
['When both directions are true',[
['If and only if',[
'Sometimes both P⇒Q and Q⇒P are true. We can combine them into the biconditional statement "P if and only if Q", abbreviated P⇔Q. The biconditional captures an exact equivalence, not just one-way implication.',
'For example an integer is even if and only if it is divisible by 2. From evenness the divisibility follows by definition; from divisibility by 2 evenness follows by the same definition. The proofs can be stated as two short directions.'
],['P⇔Q means (P⇒Q) and (Q⇒P)'],[E('Test biconditional','Is "an integer is a multiple of 10 iff its last digit is 0" valid in base ten?',['Every multiple of 10 has units digit 0.','Every base-ten integer with final digit 0 equals 10 times an integer.','Both implications hold.'],'Yes.')]],
['Necessary and sufficient conditions',[
'In P⇒Q, the condition P is sufficient for Q: knowing P guarantees Q. At the same time Q is necessary for P, because P cannot be true while Q is false.',
'For a number to be divisible by 6, being divisible by 3 is necessary but not sufficient. Being divisible by 6 is sufficient for divisibility by 3. Distinguishing necessary from sufficient sharpens converse questions.'
],[],[E('Necessary or sufficient?','Is "divisible by 2" necessary for "divisible by 6"? Is it sufficient?',['All multiples of 6 are even, so divisibility by 2 is necessary.','The number 2 is divisible by 2 but not 6, so it is not sufficient.'],'Necessary but not sufficient.')]]
]],
['Proof versus example',[
['Deduction uses justified steps',[
'A proof explains why a conclusion follows from its hypotheses for all allowed cases. An example can illustrate a theorem, but cannot prove a universal claim. To prove the sum of two even integers is even, represent them as 2m and 2n.',
'Their sum is 2m+2n=2(m+n). Since m+n is an integer, the sum is twice an integer and therefore even. This proof applies to every pair of even integers at once.'
],[],[E('Proof for integers','Prove the sum of two odd integers is even.',['Write odd integers as 2m+1 and 2n+1.','Their sum is 2m+2n+2=2(m+n+1).','The expression is twice an integer.'],'The sum is even.')]],
['Converse proof and correct quantifiers',[
'When proving a converse, do not recycle the original proof without changing the assumptions. A converse starts from the old conclusion, so a separate chain of justification is necessary.',
'The words all, some and none change the meaning of a proposition. "Some rectangles are squares" is true because squares are rectangles. "All rectangles are squares" is false. Always identify the exact quantifier before writing the argument.'
],[],[E('Find the flaw','A student shows that three chosen multiples of 4 are even and concludes all multiples of 4 are even. Is that a proof?',['Checking finitely many examples confirms only those cases.','For a general argument write every multiple of 4 as 4k.','Then 4k=2(2k), which is even.'],'The examples alone are not proof; the general divisibility argument is.')]]
]],
['Divisibility and geometry applications',[
['Statements involving divisibility',[
'If a divides b, then b=ak for some integer k. This algebraic definition supports reliable propositions. For instance, if n is divisible by 12 then n=12k=3(4k), so it must be divisible by 3.',
'The converse is not true: take n=9. It is divisible by 3 but not by 12. State the domain as integers, otherwise expressions like "divisibility" may be ambiguous.'
],['a|b means b=ak for some integer k'],[E('Prove one direction','Prove every multiple of 15 is a multiple of 5.',['Let n=15k where k is an integer.','Rewrite n=5(3k).','Since 3k is an integer, n is divisible by 5.'],'Proved.')]],
['Geometric theorems as conditional claims',[
'A theorem such as "If the diagonals of a quadrilateral bisect each other, then the quadrilateral is a parallelogram" has a specific geometric hypothesis. Its converse asks whether every parallelogram has diagonals that bisect one another; that converse is also true.',
'Diagram labels and congruent-triangle reasoning are essential. A slanted drawing does not make a figure a parallelogram; verify an accepted test before applying its properties.'
],[],[E('Parallelogram converse','State both directions connecting parallelograms and diagonal bisection.',['Forward: a parallelogram has diagonals that bisect each other.','Reverse: a quadrilateral whose diagonals bisect each other is a parallelogram.','Together these form a biconditional.'],'A quadrilateral is a parallelogram iff its diagonals bisect each other.')]]
]]
],{
lead:'Mathematics is built on claims that can be checked, justified and sometimes disproved. This chapter teaches propositions, hypotheses, converses, counterexamples and two-way equivalences through examples from numbers and geometry. The central skill is to explain why a claim is true—or to locate one valid counterexample when it is false.',
mixed:[
['Mixed proof and converse','Consider: If n is divisible by 12, then n is divisible by 4. Prove it, state the converse and test the converse.',['Let n=12k, so n=4(3k); forward direction holds.','Converse: if n is divisible by 4, then n is divisible by 12.','Choose n=8, divisible by 4 but not 12.'],'Original true; converse false.'],
['Mixed geometry claim','A student asserts: If a quadrilateral has four equal sides, then it is a square. Is the claim valid?',['A square does have four equal sides.','But a rhombus can have all four sides equal without having four right angles.','An oblique rhombus satisfies the hypothesis and fails the conclusion.'],'False; a non-square rhombus is a counterexample.']
]});
})();