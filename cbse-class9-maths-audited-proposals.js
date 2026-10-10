/* Review-only, textbook-cited StudyAI curriculum proposals.
 * Generated deterministically by automation/class9-maths/apply-proposals.py.
 * AI-written content is JSON data: never use eval or Function on this data.
 */
(() => {
'use strict';
const proposals = [
  {
    "chapter_number": 1,
    "chapter_title": "Orienting Yourself: The Use of Coordinates",
    "lessons": [
      {
        "section": "The Cartesian plane",
        "title": "Perpendicular Distance to the Axes",
        "paragraphs": [
          "Coordinates describe signed positions, not negative physical lengths. For P(x, y), x is its signed horizontal displacement from the y-axis and y is its signed vertical displacement from the x-axis. The perpendicular distance from P to the y-axis is |x|, while its distance to the x-axis is |y|. Dropping perpendiculars gives the feet (x, 0) and (0, y).",
          "Since coordinates are ordered, two pairs are equal only when the first coordinates match and the second coordinates match. Swapping (x, y) to (y, x) gives the same point precisely when x = y; for example, (4, 4) is unchanged, but (4, -4) is not."
        ],
        "formulas": [
          "Distance from P(x, y) to y-axis = |x|",
          "Distance from P(x, y) to x-axis = |y|",
          "Perpendicular feet: (x, 0) on x-axis, (0, y) on y-axis"
        ],
        "examples": [
          {
            "title": "Perpendicular distances, signed coordinates and projections",
            "question": "For P=(-5, 8), find its perpendicular distance from each axis and the coordinates of each perpendicular foot.",
            "steps": [
              "P has x=-5 and y=8: it lies 5 units left of the y-axis and 8 units above the x-axis.",
              "Perpendicular distance to the y-axis is |-5| = 5 units; distance to the x-axis is |8| = 8 units.",
              "To reach the x-axis keep x and set y to 0, giving the foot (-5, 0).",
              "To reach the y-axis keep y and set x to 0, giving the foot (0, 8).",
              "Check: the horizontal distance between (-5, 8) and (0, 8) is 5; the vertical distance between (-5, 8) and (-5, 0) is 8."
            ],
            "answer": "Distance to x-axis: 8 units; distance to y-axis: 5 units; perpendicular feet: (-5, 0) and (0, 8), respectively."
          }
        ],
        "evidence": [
          {
            "concept": "Perpendicular distance definition of coordinates",
            "page": 6,
            "quote": "x represents the perpendicular distance of P from the y-axis, measured along the x-axis, and y is the perpendicular distance of P from the x-axis",
            "rationale": "While the existing notes mention ordered pairs and moving horizontally or vertically, they do not explicitly define the coordinates in terms of perpendicular distances from the opposite axes. This distinction is crucial because students frequently confuse the x-coordinate with the distance from the x-axis rather than from the y-axis.",
            "status": "partial"
          }
        ],
        "merge_into": "The two axes and ordered pairs"
      },
      {
        "section": "Midpoints, missing endpoints and dividing a segment",
        "title": "Determining Triangle Vertices from Side Midpoints",
        "paragraphs": [
          "The midpoint of two points is found by averaging their x-coordinates and y-coordinates. When the midpoints of three sides of a triangle are known, we can reverse this rule to find the original vertices. The NCERT challenge names side midpoints D, E and F without saying which is on BC, CA or AB. To attach unambiguous vertex labels, our worked example explicitly takes D as the midpoint of BC, E as the midpoint of CA and F as the midpoint of AB. Choosing a different correspondence can change the names A, B and C, but not the set of triangle vertices.",
          "Using this convention, 2D=B+C, 2E=C+A and 2F=A+B (add x- and y-coordinates separately). Adding the three equations gives D+E+F=A+B+C. Therefore A=E+F-D, B=D+F-E and C=D+E-F. Find each coordinate by substitution, and check the answer by averaging the endpoints of each side again. This argument follows from the midpoint formula and does not require an unproved geometric claim."
        ],
        "formulas": [
          "If D is midpoint of BC: 2D = B + C",
          "If E is midpoint of CA: 2E = C + A",
          "If F is midpoint of AB: 2F = A + B",
          "A = E + F - D;  B = D + F - E;  C = D + E - F"
        ],
        "examples": [
          {
            "title": "Reconstruct a triangle from its three side midpoints",
            "question": "D(5, 1), E(6, 5) and F(0, 3) are the midpoints of BC, CA and AB, respectively. Find A, B and C. (This correspondence is stated for this worked example.)",
            "steps": [
              "Add the three midpoint coordinates: D+E+F=(5+6+0, 1+5+3)=(11, 9).",
              "Since D is the midpoint of BC, A=(D+E+F)-2D=(11-10, 9-2)=(1, 7).",
              "Since E is the midpoint of CA, B=(D+E+F)-2E=(11-12, 9-10)=(-1, -1).",
              "Since F is the midpoint of AB, C=(D+E+F)-2F=(11-0, 9-6)=(11, 3).",
              "Check D: midpoint of B(-1, -1) and C(11, 3) is ((-1+11)/2,(-1+3)/2)=(5, 1).",
              "Check E: midpoint of C(11, 3) and A(1, 7) is ((11+1)/2,(3+7)/2)=(6, 5).",
              "Check F: midpoint of A(1, 7) and B(-1, -1) is ((1-1)/2,(7-1)/2)=(0, 3)."
            ],
            "answer": "A=(1, 7), B=(-1, -1), C=(11, 3) under the stated D→BC, E→CA, F→AB convention."
          }
        ],
        "evidence": [
          {
            "concept": "Reconstructing triangle vertices from side midpoints",
            "page": 13,
            "quote": "The midpoints of the sides of triangle ABC are the points D, E, and F. Given that the coordinates of D, E, and F are (5, 1), (6, 5), and (0, 3)",
            "rationale": "The existing material covers finding a single missing endpoint when the midpoint is given, but completely omits the multi-variable system required to determine all three vertices of a triangle given the midpoints of its three sides, which is an explicit starred challenge problem in the textbook.",
            "status": "missing"
          }
        ]
      },
      {
        "section": "Midpoints, missing endpoints and dividing a segment",
        "title": "Recovering triangle vertices from side midpoints",
        "paragraphs": [
          "When the midpoints of all three sides of a triangle are known, we can reconstruct the original vertices by translating the geometric relationships into a system of linear equations. Let the unknown vertices be A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃). If D, E, and F are the midpoints of sides AB, BC, and CA respectively, each midpoint gives an average of coordinates: (x₁ + x₂)/2 = x_D, (x₂ + x₃)/2 = x_E, and (x₃ + x₁)/2 = x_F. Multiplying each equation by 2 and summing all three produces 2(x₁ + x₂ + x₃) = 2(x_D + x_E + x_F), which simplifies to x₁ + x₂ + x₃ = x_D + x_E + x_F. An identical relationship holds for the y-coordinates.",
          "Once the sum of all three vertex coordinates is established, isolating each vertex is straightforward. Subtracting the known sum of two vertices, x₂ + x₃ = 2x_E, from the total sum yields x₁ = (x_D + x_E + x_F) − 2x_E = x_D + x_F − x_E. Geometrically, this formula corresponds to the parallelogram law: because the segment joining midpoints D and F is parallel and equal in length to segment BE, quadrilateral ADFE forms a parallelogram whose opposite sides represent equal displacement vectors.",
          "This algebraic and vector approach prevents guess-and-check errors and works consistently regardless of which quadrants the vertices occupy. After determining the coordinates of A, B, and C, students should always verify their results by averaging each adjacent pair of calculated vertices to confirm that they reproduce the original midpoint coordinates D, E, and F."
        ],
        "formulas": [
          "x_D = (x_A + x_B)/2, y_D = (y_A + y_B)/2",
          "x_A + x_B + x_C = x_D + x_E + x_F",
          "x_A = x_D + x_F - x_E, y_A = y_D + y_F - y_E",
          "x_B = x_D + x_E - x_F, y_B = y_D + y_E - y_F",
          "x_C = x_E + x_F - x_D, y_C = y_E + y_F - y_D"
        ],
        "examples": [
          {
            "title": "Find triangle vertices from three given midpoints",
            "question": "The midpoints of the sides of triangle ABC are D(5, 1), E(6, 5), and F(0, 3), where D is the midpoint of AB, E is the midpoint of BC, and F is the midpoint of CA. Find the coordinates of vertices A, B, and C.",
            "steps": [
              "Write the midpoint equations for the x-coordinates: x_A + x_B = 2(5) = 10, x_B + x_C = 2(6) = 12, and x_C + x_A = 2(0) = 0. Adding these three equations gives 2(x_A + x_B + x_C) = 22, so x_A + x_B + x_C = 11.",
              "Subtract each pairwise sum to find the x-coordinates: x_A = 11 − (x_B + x_C) = 11 − 12 = −1; x_B = 11 − (x_C + x_A) = 11 − 0 = 11; x_C = 11 − (x_A + x_B) = 11 − 10 = 1.",
              "Write the midpoint equations for the y-coordinates: y_A + y_B = 2(1) = 2, y_B + y_C = 2(5) = 10, and y_C + y_A = 2(3) = 6. Adding these gives 2(y_A + y_B + y_C) = 18, so y_A + y_B + y_C = 9.",
              "Subtract each pairwise sum to find the y-coordinates: y_A = 9 − (y_B + y_C) = 9 − 10 = −1; y_B = 9 − (y_C + y_A) = 9 − 6 = 3; y_C = 9 − (y_A + y_B) = 9 − 2 = 7.",
              "Verify by recalculating midpoints: midpoint of A(−1, −1) and B(11, 3) is ((−1+11)/2, (−1+3)/2) = (5, 1) = D; midpoint of B and C is ((11+1)/2, (3+7)/2) = (6, 5) = E; midpoint of C and A is ((1−1)/2, (7−1)/2) = (0, 3) = F."
            ],
            "answer": "A(−1, −1), B(11, 3), and C(1, 7)"
          }
        ],
        "evidence": [
          {
            "concept": "Recovering the vertices of a triangle given the midpoints of its three sides",
            "page": 13,
            "quote": "The midpoints of the sides of triangle ABC are the points D, E, and F.",
            "rationale": "The textbook includes an advanced starred exercise (Problem 13) requiring students to determine the three vertices of triangle ABC given the coordinates of the midpoints of its sides. While the existing notes cover the midpoint of a single line segment and finding one missing endpoint, they lack the conceptual framework and multi-step method for solving the simultaneous system of three midpoints to recover an entire triangle.",
            "status": "missing"
          }
        ]
      },
      {
        "section": "The Cartesian plane",
        "title": "Equality of ordered pairs and the line x = y",
        "paragraphs": [
          "An ordered pair uses position to assign geometric meaning: the first component always denotes horizontal displacement along the x-axis, and the second component denotes vertical displacement along the y-axis. Two ordered pairs (a, b) and (c, d) designate the exact same point in the plane if and only if both coordinates match simultaneously, meaning a = c and b = d. If either coordinate differs, the pairs locate two distinct points.",
          "This rule leads directly to the textbook's biconditional criterion for reversed pairs: (x, y) = (y, x) if and only if x = y. Whenever x ≠ y, reversing the coordinates reflects the point across the main diagonal line of the plane. For instance, (4, 1) and (1, 4) have identical absolute numbers but represent entirely different locations in Quadrant I. The only points that remain unchanged when their coordinates are reversed are those where the horizontal and vertical values are equal, such as (0, 0), (2, 2), or (−5, −5).",
          "Recognising this condition is essential when solving algebraic coordinate problems where two points are defined by variable expressions. Establishing whether points coincide requires solving the two component equations simultaneously. If the resulting values satisfy x = y, the point lies on the line of symmetry bisecting Quadrants I and III."
        ],
        "formulas": [
          "(a, b) = (c, d) ⇔ a = c and b = d",
          "(x, y) = (y, x) ⇔ x = y"
        ],
        "examples": [
          {
            "title": "Testing ordered pair equality and finding coincidence",
            "question": "Given the points P(2k − 1, 5) and Q(5, k + 2), determine the value of k for which P and Q represent the same point, and check whether their coordinates satisfy (x, y) = (y, x).",
            "steps": [
              "Two points P(x₁, y₁) and Q(x₂, y₂) coincide if and only if x₁ = x₂ and y₁ = y₂. Equate the horizontal coordinates: 2k − 1 = 5, which gives 2k = 6, so k = 3.",
              "Substitute k = 3 into the vertical coordinate of Q: y_Q = k + 2 = 3 + 2 = 5. Compare this with the vertical coordinate of P, which is also 5.",
              "Since both conditions x_P = x_Q = 5 and y_P = y_Q = 5 hold simultaneously for k = 3, the two points coincide at (5, 5).",
              "Because x = 5 and y = 5 are equal, reversing the coordinates gives (5, 5), confirming the rule that (x, y) = (y, x) if and only if x = y."
            ],
            "answer": "k = 3, giving the coincident point (5, 5) where x = y."
          }
        ],
        "evidence": [
          {
            "concept": "Condition for equality of reversed coordinate pairs",
            "page": 15,
            "quote": "If x = y, then (x, y) = (y, x). If x ≠ y, then (x, y) ≠ (y, x).",
            "rationale": "The textbook summary and 'Think and Reflect' section explicitly highlight the biconditional rule governing when swapped coordinates represent identical or distinct points ((x, y) = (y, x) if and only if x = y). The current notes state that coordinates cannot generally be swapped, but omit the formal algebraic condition and its geometric locus on the line x = y.",
            "status": "partial"
          }
        ]
      }
    ]
  },
  {
    "chapter_number": 2,
    "chapter_title": "Introduction to Linear Polynomials",
    "lessons": [
      {
        "section": "Linear patterns and constant change",
        "title": "Distinguishing Linear Growth from Linear Decay",
        "paragraphs": [
          "Linear growth means that a quantity increases by the same positive amount in each equal input interval; linear decay means it decreases by the same amount. For a rule y=ax+b, the signed change for every increase of one unit in x is a. If a>0 there is growth; if a<0 there is decay. If a=0 the quantity is constant, so neither growth nor decay occurs.",
          "When modelling a physical quantity, identify the initial value b, keep the input units and the rate a consistent, and restrict the input to a realistic domain. A tank cannot contain a negative volume, so a decreasing linear volume model applies only until it reaches zero. Not every real-life example of a decrease is automatically linear: the amount lost must be the same over equal intervals."
        ],
        "formulas": [
          "y=ax+b; change in y for a unit increase in x is a",
          "Growth: a>0; decay: a<0; constant: a=0"
        ],
        "examples": [
          {
            "title": "Water used at a steady rate",
            "question": "A tank holds 300 litres at t=0 and loses 15 litres each hour. Find V(t) and when the tank empties.",
            "steps": [
              "The initial volume is 300 litres, so the constant term is 300.",
              "The volume decreases by 15 litres per hour, so V(t)=300−15t.",
              "Since the rate −15 is negative, this is linear decay.",
              "Set V(t)=0: 300−15t=0, hence t=20 hours.",
              "The model applies while water remains: 0≤t≤20; it must not predict negative tank volume after that."
            ],
            "answer": "V(t)=300−15t litres for 0≤t≤20; empty after 20 hours."
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
        ],
        "merge_into": "Changing quantities and rates"
      },
      {
        "section": "Visualising a linear relationship",
        "title": "Slope and Parallel Linear Graphs",
        "paragraphs": [
          "For y=ax+b, the number a is the slope: when x increases by one unit, y changes by a units. Positive slope makes the line rise from left to right, negative slope makes it fall, and zero slope produces a horizontal line. The y-intercept is (0,b), because substituting x=0 gives y=b.",
          "On equally scaled axes, the reference line y=x has slope 1. For positive slopes, a>1 means the line rises more steeply than y=x; 0<a<1 means it rises less steeply. For negative slopes, compare steepness using |a| while remembering that the line falls rather than rises.",
          "Two nonvertical lines with the same slope a and different y-intercepts are distinct parallel lines; if both slope and intercept match, they are the same line. This follows because changing b shifts all y-values equally without changing the rise for a given horizontal run."
        ],
        "formulas": [
          "Slope of y=ax+b is a = Δy/Δx for Δx≠0",
          "y-intercept = (0,b)",
          "Distinct parallel lines: a₁=a₂ and b₁≠b₂",
          "On equal axis scales: a>1 is steeper upward than y=x"
        ],
        "examples": [
          {
            "title": "Compare slopes and test parallel lines",
            "question": "Are 2y=4x+7 and 3y=6x−11 parallel? Compare their steepness with y=x.",
            "steps": [
              "Divide the first equation by 2: y=2x+7/2, so its slope is 2 and its y-intercept is (0,7/2).",
              "Divide the second equation by 3: y=2x−11/3, so its slope is also 2 and its y-intercept is (0,−11/3).",
              "Their slopes match but their y-intercepts differ: these are distinct parallel lines.",
              "Both slopes are 2>1, so, with equally scaled axes, each rises more steeply than y=x."
            ],
            "answer": "The two lines are parallel, with slope 2 and different y-intercepts; each rises more steeply than y=x."
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
        ],
        "merge_into": "Why a linear polynomial graphs as a line"
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
  if(p.merge_into){
   const target=safe(section.subtopics).find(s=>norm(s.title)===norm(p.merge_into));
   if(!target)throw Error('Curriculum enrichment target missing: '+p.merge_into);
   const paragraphs=safe(target.paragraphs);
   target.paragraphs=paragraphs.concat(p.paragraphs.filter(x=>!paragraphs.includes(x)));
   const formulas=safe(target.formulas);
   target.formulas=formulas.concat(p.formulas.filter(x=>!formulas.includes(x)));
   const examples=safe(target.examples);
   const existingTitles=new Set(examples.map(x=>norm(x.title)));
   target.examples=examples.concat(p.examples.filter(x=>!existingTitles.has(norm(x.title)))
    .map(x=>({title:x.title,question:x.question,steps:x.steps.slice(),answer:x.answer})));
   continue;
  }
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
