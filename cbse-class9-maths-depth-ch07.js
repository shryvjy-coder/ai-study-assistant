/* Chapter 7 — The Mathematics of Maybe: Introduction to Probability */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('The Mathematics of Maybe: Introduction to Probability',[
['Randomness and the probability scale',[
['Uncertainty can be measured',[
'When we toss an ordinary coin, the exact outcome of one toss cannot reliably be predicted before it happens. This is a random experiment: its possible outcomes are understood, but an individual trial is uncertain.',
'Probability assigns numbers from 0 to 1 to events. Zero indicates impossibility and one indicates certainty. Events with larger probabilities are more likely under the assumed model, although a high probability does not guarantee success on a particular trial.'
],['0≤P(A)≤1','P(certain event)=1; P(impossible event)=0'],[E('Interpret chance','An event has probability 3/4. Does it necessarily occur on the next trial?',['3/4 lies between 0 and 1 and means the event is relatively likely.','Probability describes uncertainty, not a guarantee for one trial.'],'No.')]],
['Events and the complete set of outcomes',[
'An outcome is one possible result of a trial. An event is a set of outcomes satisfying a condition. For a standard die, the sample space is {1,2,3,4,5,6}; the event "even" is {2,4,6}.',
'It is important that the sample space describes every relevant outcome without counting anything twice. A wrong sample space produces wrong denominators in theoretical calculations.'
],['S={1,2,3,4,5,6} for one standard die'],[E('Event identification','A die is thrown. List the outcomes in the event "prime number".',['Prime numbers among 1 to 6 are 2,3,5.','The number 1 is not prime.'],'{2,3,5}')]]
]],
['Experimental probability',[
['Relative frequency from observations',[
'An experimental probability is estimated from observed trials: number of successes divided by the total number of trials. If a spinner lands on red 37 times in 100 spins, its observed red frequency is 37/100.',
'Repeated trials help estimate underlying chance, but results can fluctuate. A measured relative frequency such as 0.37 does not prove the true theoretical probability equals exactly 0.37. Record the number of trials alongside the estimate.'
],['Experimental P(A)=observed occurrences of A/total trials'],[E('Experimental chance','A machine produces 12 imperfect items in a sample of 300. Estimate probability an item is imperfect.',['Observed imperfections=12.','Sample size=300.','Relative frequency=12/300=1/25.'],'0.04, or 4%')]],
['Long-run stability, not a promise',[
'A fair coin could show heads four times in a row. That observation alone does not make the coin unfair. Over a large number of independent trials, relative frequencies often settle near the model probabilities, but small samples can deviate noticeably.',
'If an experiment records 8 heads in 10 tosses, the experimental probability is 0.8 while the fair-coin theoretical probability remains 0.5. The distinction between a result and a model is crucial.'
],[],[E('Compare two probabilities','A fair coin is tossed 20 times and gives 13 heads. State experimental and theoretical probabilities of heads.',['Experimental proportion=13/20.','Under the fair-coin model, heads and tails are equally likely, so theoretical P(H)=1/2.'],'Experimental 13/20; theoretical 1/2.')]]
]],
['Theoretical probability',[
['Equally likely outcomes',[
'If all outcomes in a finite sample space are equally likely, the probability of an event is the number of favourable outcomes divided by the total outcomes. This counting formula requires equal likelihood; it cannot automatically be used for a biased die.',
'For a fair die, P(number greater than 4)=2/6=1/3 because the favourable outcomes are 5 and 6. List favourable outcomes explicitly before reducing the fraction.'
],['P(A)=n(A)/n(S), when outcomes are equally likely'],[E('A fair die','Find the probability of rolling a multiple of 3 on one fair die.',['Sample space has 6 equally likely outcomes.','Multiples of 3 are 3 and 6, so 2 favourable outcomes.','P=2/6.'],'1/3')]],
['Why counting needs a complete denominator',[
'When selecting a marble from a bag, each individual marble can be treated as one elementary outcome if selection is uniform. The colours may not be equally likely if counts differ. With 2 red and 5 blue marbles, there are 7 equally likely marbles but only two colour categories.',
'Therefore P(red)=2/7, not 1/2. Saying "two colours, so each has half the chance" mistakes categories for elementary outcomes.'
],[],[E('Unequal colour counts','A bag has 4 green, 3 yellow and 1 red counter. Find P(yellow).',['Total counters=4+3+1=8.','Yellow counters=3.','Assuming uniform selection, probability is 3/8.'],'3/8')]]
]],
['Sample spaces and events',[
['Systematic lists and tables',[
'For experiments with more than one stage, count outcomes systematically using an ordered list, a table or a tree. Two coin tosses have outcomes HH, HT, TH and TT. HT and TH are distinct because order matters.',
'If coins are fair and tosses independent, all four ordered outcomes are equally likely. An event such as "exactly one head" consists of HT and TH, giving 2/4=1/2.'
],['Two fair coin tosses: S={HH,HT,TH,TT}'],[E('Exactly one success','For two fair coin tosses, find P(exactly one tail).',['List four equally likely ordered outcomes.','Exactly one tail occurs in HT and TH.','P=2/4.'],'1/2')]],
['Outcomes from two dice',[
'Two dice have 6×6=36 ordered pairs if the dice are independent and fair. The total of 7 occurs as (1,6),(2,5),(3,4),(4,3),(5,2),(6,1), six outcomes.',
'The totals 2 through 12 are not equally likely. For example, total 2 has one ordered pair while total 7 has six. Use ordered-pair counting rather than pretending the eleven possible totals each have probability 1/11.'
],['n(S)=6×6=36'],[E('Sum of seven','Find probability that two fair dice total 7.',['List the six favourable ordered pairs.','Total ordered pairs=36.','P=6/36.'],'1/6')]]
]],
['Complementary events',[
['The complement is everything outside an event',[
'An event A and its complement Aᶜ contain all outcomes between them and have no outcome in common. Their probabilities therefore sum to one. The complement rule is often simpler than direct counting, especially when an event says "at least one".',
'For two fair coins, the complement of "at least one head" is "no heads", which means TT only. Thus P(at least one head)=1−1/4=3/4.'
],['P(A)+P(Aᶜ)=1','P(at least one)=1−P(none)'],[E('At least one six','A fair die is thrown twice. Find probability of at least one six.',['Complement is no six on either throw.','P(no six in one throw)=5/6.','Independent throws give P(no six in both)=(5/6)²=25/36.','Subtract from one.'],'11/36')]],
['Disjoint events and avoiding double counting',[
'Two events are mutually exclusive if they cannot occur together in one trial. For a single fair die, "roll 1" and "roll 6" are disjoint, so their probabilities add.',
'For events that overlap, adding P(A)+P(B) counts the overlap twice. The correct general rule subtracts P(A∩B). At this stage, Venn diagrams and clear enumeration are more important than memorising advanced notation.'
],['P(A∪B)=P(A)+P(B)−P(A∩B)'],[E('Union of overlapping events','A die roll is even or greater than 4. Find its probability.',['Even set={2,4,6}. Greater-than-4 set={5,6}.','Their union is {2,4,5,6}; do not count 6 twice.','There are 4 favourable outcomes out of 6.'],'2/3')]]
]],
['Tree diagrams',[
['The branches represent sequential choices',[
'A tree diagram starts at the first decision and branches into possible outcomes. Each of those branches then splits for the second step. A complete path represents one sequence of results.',
'For independent fair coin tosses, each branch has probability 1/2. A path such as HT has probability (1/2)(1/2)=1/4. Add probabilities of separate paths belonging to the event, provided the paths do not overlap.'
],['P(path)=product of branch probabilities (when each branch is conditional on its past)'],[E('Two-stage coin tree','Find probability that exactly one of two independent fair tosses is heads.',['Paths HT and TH each have probability 1/4.','The paths are disjoint.','Add 1/4+1/4.'],'1/2')]],
['Without replacement changes branch probabilities',[
'If an object is not replaced, the composition of the bag changes after the first selection. Branch probabilities must reflect the remaining objects. For example, removing a red from a bag containing 3 red and 2 blue leaves 2 red and 2 blue.',
'It is therefore wrong to multiply (3/5)(3/5) for two reds drawn without replacement. The second probability is 2/4 after the first red has been removed.'
],[],[E('Two red without replacement','A bag contains 3 red and 2 blue balls. Draw two without replacement. Find P(both red).',['P(first red)=3/5.','After red is drawn, 2 reds remain among 4 balls.','P(second red given first red)=2/4.','Multiply the path probabilities.'],'(3/5)(2/4)=3/10')]]
]]
],{
lead:'How can we reason carefully when the outcome is uncertain? Probability provides a scale from impossible to certain and connects experimental observations to mathematical models. These lessons show how to build complete sample spaces, count fairly, use complements and follow multi-step branches without double-counting.',
mixed:[
['Mixed exam probability','A fair die is rolled twice. Find probability that neither result is a 6, and probability of at least one 6.',['Each die has five non-six outcomes out of six.','Independence gives (5/6)²=25/36 for no six.','The complement is at least one six, giving 1−25/36.'],'No six 25/36; at least one six 11/36.'],
['Mixed event counting','Two distinguishable fair dice are rolled. Find probability that the sum is 8 or both dice show the same number.',['Sum 8 has 5 outcomes: (2,6),(3,5),(4,4),(5,3),(6,2).','Doubles have 6 outcomes: (1,1) through (6,6).','(4,4) lies in both, so count it only once.','Favourable outcomes=5+6−1=10 out of 36.'],'10/36=5/18.']
]});
})();