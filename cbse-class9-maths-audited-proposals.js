/* Review-only, textbook-cited StudyAI curriculum proposals.
 * Generated deterministically by automation/class9-maths/apply-proposals.py.
 * AI-written content is JSON data: never use eval or Function on this data.
 */
(() => {
'use strict';
const proposals = [
  {
    "chapter_number": 2,
    "chapter_title": "Introduction to Linear Polynomials",
    "lessons": [
      {
        "section": "Linear patterns and constant change",
        "title": "Distinguishing Linear Growth from Linear Decay",
        "paragraphs": [
          "In real-world mathematical modeling, linear relationships arise when a quantity changes by a fixed amount over regular, equal intervals. When the output quantity increases by a constant positive amount for each unit increase in the input, the situation is called linear growth. For instance, saving a fixed sum of money each month or measuring the steady height gain of a plant over time exemplifies linear growth, where the variable coefficient is strictly positive.",
          "Conversely, when a quantity decreases by a fixed amount over equal intervals, the process represents linear decay. Examples include the gradual depletion of water from a reservoir at a uniform rate or the depreciation of an electronic device's monetary value across successive years. In linear decay, the constant rate of change is negative, leading to a decreasing linear rule where subsequent values systematically diminish.",
          "Recognizing whether a scenario exhibits linear growth or linear decay allows us to formulate the governing algebraic rule immediately from initial conditions. By identifying the starting value as the constant term and the positive or negative constant difference as the variable's coefficient, we construct a reliable predictive model that can determine when a quantity will reach a desired threshold or become entirely exhausted."
        ],
        "formulas": [
          "Linear growth: y = ax + b, where a > 0",
          "Linear decay: y = ax + b, where a < 0",
          "Change per unit interval: Δy = a"
        ],
        "examples": [
          {
            "title": "Depletion of stored water",
            "question": "A cylindrical tank initially holds 300 litres of water. Water is consumed steadily at a rate of 15 litres per hour. Write a function V(t) relating the remaining volume V to elapsed time t in hours, state whether it represents linear growth or linear decay, and find when the tank empties.",
            "steps": [
              "Identify the starting amount and the hourly change: at t = 0 hours, V = 300 litres. Each additional hour reduces the volume by 15 litres, giving a rate of change of -15.",
              "Formulate the linear relation V(t) = 300 - 15t. Because the quantity decreases by a constant 15 litres every hour, this function represents linear decay.",
              "To calculate when the tank is empty, set the remaining volume to zero: 300 - 15t = 0.",
              "Solve the linear equation for t: 15t = 300, which yields t = 300 / 15 = 20 hours."
            ],
            "answer": "V(t) = 300 - 15t represents linear decay; the tank is empty after 20 hours."
          }
        ],
        "evidence": [
          {
            "concept": "Linear growth and linear decay definitions and modeling",
            "page": 10,
            "quote": "Linear growth describes a linear pattern where a quantity increases by a constant amount over equal intervals.",
            "rationale": "Section 2.4 of the textbook explicitly defines linear growth and linear decay and develops functions modeling increasing and decreasing physical processes. The existing notes mention rates and constant change in general but do not define or explore linear growth and decay.",
            "status": "missing"
          }
        ]
      },
      {
        "section": "Visualising a linear relationship",
        "title": "Slope and Parallel Linear Graphs",
        "paragraphs": [
          "When a linear polynomial equation is expressed in the form y = ax + b, the coefficient a is termed the slope of the line. The slope measures both the steepness of the line and its directional inclination relative to the coordinate axes. When a > 0, the graph ascends from left to right, representing linear growth, with larger values of a producing lines steeper than the diagonal reference line y = x. When a < 0, the graph descends from left to right, representing linear decay.",
          "The constant term b determines the y-intercept, which is the point (0, b) where the line intersects the vertical y-axis. If we hold the slope a constant while varying the value of b, every point on the line shifts vertically by an equal distance. Because the inclination remains unchanged, the resulting lines never meet and preserve a constant separation across the plane.",
          "Consequently, two straight lines given by linear equations are parallel if and only if they possess equal slopes but different y-intercepts. Converting equations into the explicit slope-intercept form y = ax + b allows immediate comparison of their slopes, providing an algebraic test to verify whether their graphs will run parallel without needing to plot every point manually."
        ],
        "formulas": [
          "Slope-intercept form: y = ax + b",
          "Slope = a, y-intercept = (0, b)",
          "Condition for parallel lines: a₁ = a₂ and b₁ ≠ b₂"
        ],
        "examples": [
          {
            "title": "Testing for parallel lines",
            "question": "Determine the slopes and y-intercepts of the lines 2y = 4x + 7 and 3y = 6x - 11, and decide whether the two lines are parallel.",
            "steps": [
              "Express the first equation in y = ax + b form by dividing both sides by 2: y = (4/2)x + 7/2, which simplifies to y = 2x + 7/2. Thus, the slope a₁ is 2 and the y-intercept is (0, 7/2).",
              "Express the second equation in y = ax + b form by dividing both sides by 3: y = (6/3)x - 11/3, which simplifies to y = 2x - 11/3. Here, the slope a₂ is 2 and the y-intercept is (0, -11/3).",
              "Compare the two slopes and intercepts: both lines have the identical slope of 2 (a₁ = a₂ = 2), but distinct y-intercepts (7/2 ≠ -11/3).",
              "Since their slopes are equal and their y-intercepts are unequal, conclude that the two lines are parallel to each other."
            ],
            "answer": "Both lines have slope 2 with different y-intercepts (7/2 and -11/3), so they are parallel."
          }
        ],
        "evidence": [
          {
            "concept": "Slope of a linear polynomial and parallel lines",
            "page": 21,
            "quote": "lines with equal slopes but different y-intercepts are parallel to each other.",
            "rationale": "The textbook formally identifies the coefficient a in y = ax + b as the slope of the line, links positive and negative slopes to growth and decay, and proves that lines with equal slopes and different intercepts are parallel. The existing notes only describe steepness without introducing slope terminology or parallel line criteria.",
            "status": "missing"
          }
        ]
      }
    ]
  }
];
const bank=window.CBSE_CLASS9_MATH_FULL_NOTES||{};
const safe=x=>Array.isArray(x)?x:[];
const generic=new Set(['Chapter coverage','Exam application',
 'Common traps and final checks','Mastery check']);
const norm=x=>String(x||'').trim().toLowerCase()
 .replace(/[\u2018\u2019]/g,"'");
for(const record of proposals){
 const chapter=bank[record.chapter_title];
 if(!chapter||!Array.isArray(chapter.sections))
  throw Error('Curriculum proposal chapter missing: '+record.chapter_title);
 const seen=new Set(chapter.sections.flatMap(s=>safe(s.subtopics).map(p=>norm(p.title))));
 for(const p of record.lessons){
  const section=chapter.sections.find(s=>s.title===p.section&&!generic.has(s.title));
  if(!section)throw Error('Curriculum proposal target section missing: '+p.section);
  if(seen.has(norm(p.title)))continue;
  if(!Array.isArray(section.subtopics))section.subtopics=[];
  section.subtopics.push({
   title:p.title,
   paragraphs:p.paragraphs.slice(),
   formulas:p.formulas.slice(),
   examples:p.examples.map(x=>({
    title:x.title,question:x.question,steps:x.steps.slice(),answer:x.answer
   })),
   bullets:[],
   tip:'Source checked against official NCERT. Mathematical solutions still require human review.',
   exam_warning:'Read the full worked steps; verify each algebraic or arithmetic claim before relying on this lesson.'
  });
  seen.add(norm(p.title));
 }
 const registry=window.STUDYAI_CLASS9_DEPTH_AUDIT||{};
 const audit=registry[record.chapter_title];
 if(audit){
  const sections=chapter.sections;
  const all=sections.flatMap(s=>safe(s.subtopics));
  audit.sections=sections.filter(s=>!generic.has(s.title)).length;
  audit.subtopics=all.length;
  audit.examples=sections.reduce((n,s)=>n+safe(s.examples).length,0)+
   all.reduce((n,s)=>n+safe(s.examples).length,0);
  audit.paragraphs=sections.reduce((n,s)=>n+safe(s.paragraphs).length,0)+
   all.reduce((n,s)=>n+safe(s.paragraphs).length,0);
  audit.automatedReviewCandidates=record.lessons.length;
 }
}
})();
