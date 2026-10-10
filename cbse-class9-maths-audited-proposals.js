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
          "Every coordinate pair (x, y) can be understood geometrically as a set of perpendicular distances measured from the coordinate axes. The x-coordinate specifies the perpendicular distance of a point from the vertical y-axis, with the sign indicating whether the point lies to the right (positive) or to the left (negative). Conversely, the y-coordinate specifies the perpendicular distance from the horizontal x-axis, where a positive value indicates position above the axis and a negative value indicates position below.",
          "A common error is to assume that the x-coordinate measures the distance to the x-axis. Remembering that the x-axis is defined by the equation y = 0 clarifies why vertical displacement from this line is measured by y. Thus, for any point P(x, y), its absolute perpendicular distance to the y-axis is |x| and its absolute perpendicular distance to the x-axis is |y|. Dropping perpendiculars from P onto both axes locates the projections (x, 0) and (0, y), forming a rectangle with the origin whose side lengths correspond to these two perpendicular distances."
        ],
        "formulas": [
          "Perpendicular distance from y-axis = |x|",
          "Perpendicular distance from x-axis = |y|",
          "Projection on x-axis = (x, 0)",
          "Projection on y-axis = (0, y)"
        ],
        "examples": [
          {
            "title": "Finding distances to axes and projection coordinates",
            "question": "For the point P(-5, 8), determine its perpendicular distance from the x-axis, its perpendicular distance from the y-axis, and the coordinates of the feet of the perpendiculars dropped onto both axes.",
            "steps": [
              "Identify the horizontal and vertical coordinates of P: x = -5 and y = 8.",
              "Calculate the perpendicular distance to the y-axis using |x|: |-5| = 5 units to the left.",
              "Calculate the perpendicular distance to the x-axis using |y|: |8| = 8 units above.",
              "Determine the foot of the perpendicular onto the x-axis by setting y = 0, giving (-5, 0).",
              "Determine the foot of the perpendicular onto the y-axis by setting x = 0, giving (0, 8)."
            ],
            "answer": "Distance from x-axis is 8 units; distance from y-axis is 5 units; feet of perpendiculars are (-5, 0) on the x-axis and (0, 8) on the y-axis."
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
        ]
      },
      {
        "section": "Midpoints, missing endpoints and dividing a segment",
        "title": "Determining Triangle Vertices from Side Midpoints",
        "paragraphs": [
          "When the midpoints of all three sides of a triangle ABC are known, finding the original vertices requires setting up and solving a simultaneous linear system in coordinates. Let the vertices be A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃), and let the midpoints of sides BC, CA, and AB be D, E, and F respectively. Applying the midpoint formula to each side gives three independent relations for the horizontal coordinates: x₂ + x₃ = 2x_D, x₃ + x₁ = 2x_E, and x₁ + x₂ = 2x_F. An identical set of three equations governs the vertical coordinates.",
          "Summing all three equations yields 2(x₁ + x₂ + x₃) = 2(x_D + x_E + x_F), which simplifies to x₁ + x₂ + x₃ = x_D + x_E + x_F. Subtracting each individual two-variable sum from this total isolates each vertex coordinate directly: x₁ = (x_D + x_E + x_F) - 2x_D = x_E + x_F - x_D. Geometrically, this reflects the fact that the figure formed by a vertex and the adjacent midpoints is a parallelogram, allowing each vertex to be located by combining midpoint displacements."
        ],
        "formulas": [
          "x_D = (x₂ + x₃)/2,  y_D = (y₂ + y₃)/2",
          "x₁ + x₂ + x₃ = x_D + x_E + x_F",
          "x₁ = x_E + x_F - x_D,  y₁ = y_E + y_F - y_D",
          "x₂ = x_D + x_F - x_E,  y₂ = y_D + y_F - y_E",
          "x₃ = x_D + x_E - x_F,  y₃ = y_D + y_E - y_F"
        ],
        "examples": [
          {
            "title": "Reconstruct triangle vertices from three given midpoints",
            "question": "The midpoints of sides BC, CA, and AB of triangle ABC are D(5, 1), E(6, 5), and F(0, 3) respectively. Find the coordinates of vertices A, B, and C.",
            "steps": [
              "Sum the x-coordinates of all three midpoints: S_x = x_D + x_E + x_F = 5 + 6 + 0 = 11.",
              "Sum the y-coordinates of all three midpoints: S_y = y_D + y_E + y_F = 1 + 5 + 3 = 9.",
              "Find vertex A by subtracting 2D from the sum of midpoints: x₁ = S_x - 2x_D = 11 - 2(5) = 1; y₁ = S_y - 2y_D = 9 - 2(1) = 7, giving A(1, 7).",
              "Find vertex B by subtracting 2E from the sum of midpoints: x₂ = S_x - 2x_E = 11 - 2(6) = -1; y₂ = S_y - 2y_E = 9 - 2(5) = -1, giving B(-1, -1).",
              "Find vertex C by subtracting 2F from the sum of midpoints: x₃ = S_x - 2x_F = 11 - 2(0) = 11; y₃ = S_y - 2y_F = 9 - 2(3) = 3, giving C(11, 3).",
              "Verify by checking the midpoints: midpoint of BC is ((-1 + 11)/2, (-1 + 3)/2) = (5, 1) = D; midpoint of CA is ((11 + 1)/2, (3 + 7)/2) = (6, 5) = E; midpoint of AB is ((1 - 1)/2, (7 - 1)/2) = (0, 3) = F."
            ],
            "answer": "A(1, 7), B(-1, -1), and C(11, 3)."
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
