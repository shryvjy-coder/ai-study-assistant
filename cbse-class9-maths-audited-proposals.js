/* Review-only, textbook-cited StudyAI curriculum proposals.
 * Generated initially by the NCERT pipeline, with manually reviewed Chapter 4 enrichments.
 * Changes beyond the three original AI-reviewed candidates require human checking.
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
  },
  {
    "chapter_number": 3,
    "chapter_title": "The World of Numbers",
    "lessons": [
      {
        "section": "Irrational numbers",
        "title": "Mādhava's infinite series for π",
        "merge_into": "Another irrational number: π",
        "paragraphs": [
          "Mādhava studied infinite sums that approximate π. An example is π/4 = 1 − 1/3 + 1/5 − 1/7 + …, so π = 4(1 − 1/3 + 1/5 − 1/7 + …). Every finite partial sum is rational, because it combines finitely many fractions. But as the number of terms increases, these approximations approach π, which is irrational. An infinite limiting process can therefore describe an irrational number even though none of its finite partial sums is exactly π.",
          "This series gives an important contrast between an exact expression and an approximation. Its early sums alternate above and below π and converge slowly. A finite sum is not a proof that π is rational. Nor must all irrational numbers be written as infinite sums: symbols such as √2 and π can denote exact irrational values directly. The series illustrates a historical method, rather than a compulsory method for writing every irrational number."
        ],
        "formulas": [
          "π = 4(1 − 1/3 + 1/5 − 1/7 + …)",
          "First three partial sums: 4, 8/3, 52/15"
        ],
        "examples": [
          {
            "title": "Estimate π with successive partial sums",
            "question": "For π = 4(1 − 1/3 + 1/5 − …), compute the first three partial sums and explain why none is exactly π.",
            "steps": [
              "The first partial sum is S₁=4(1)=4.",
              "Using two terms, S₂=4(1−1/3)=4×2/3=8/3≈2.667.",
              "Using three terms, S₃=4(1−1/3+1/5)=4×13/15=52/15≈3.467.",
              "These are rational approximations that alternately lie above and below π≈3.142. The exact equality with π describes the limit of infinitely many terms, not a finite partial sum."
            ],
            "answer": "S₁=4, S₂=8/3 and S₃=52/15; each is only an approximation to π."
          }
        ],
        "evidence": [
          {
            "concept": "Mādhava's infinite series representation of irrational numbers",
            "page": 16,
            "quote": "to express an irrational number, you cannot use a single fraction; you must use an infinite sum.",
            "status": "missing",
            "rationale": "The audit identifies the history of approximating π using an infinite series. The revision adds the concrete series, explains rational partial sums and the irrational limit, and avoids suggesting every irrational number must be written as a series."
          }
        ]
      },
      {
        "section": "Decimal expansions of real numbers",
        "title": "Alternative decimal representations and repeating nines",
        "merge_into": "Why denominators containing only 2 and 5 terminate",
        "paragraphs": [
          "Decimal expansions are not always unique. The real number 1 has both 1.000… and 0.999… as decimal representations, and 0.5 can be written as 0.4999… when the nines continue forever. A finite string of nines such as 0.999 or 0.4999 is still strictly smaller than 1 or 0.5. Equality holds only for the infinite repeating tail, whose finite truncations approach the same limit.",
          "To justify the equality, let x=0.999… . Then 10x=9.999… . Subtracting gives 9x=9, so x=1. Therefore 0.0999…=0.1 and 0.4999…=0.4+0.0999…=0.5. This does not make every decimal expansion a repeating decimal: for example √2 has a non-terminating, non-repeating decimal expansion."
        ],
        "formulas": [
          "0.999… = 1",
          "0.4999… = 0.5",
          "0.0999… = 0.1"
        ],
        "examples": [
          {
            "title": "Why a recurring-nine decimal equals a terminating decimal",
            "question": "Prove that 0.999…=1 and use this result to show 0.4999…=0.5.",
            "steps": [
              "Let x=0.999… , where the 9s continue without end.",
              "Multiplying by 10 gives 10x=9.999… . Subtract the original x to cancel the common repeating tail: 9x=9.",
              "Divide by 9: x=1. So 0.999… and 1 are exactly equal.",
              "Dividing the equality 0.999…=1 by 10 gives 0.0999…=0.1. Therefore 0.4999…=0.4+0.0999…=0.4+0.1=0.5."
            ],
            "answer": "0.999…=1 and 0.4999…=0.5; infinite recurring nines can represent an otherwise terminating decimal."
          }
        ],
        "evidence": [
          {
            "concept": "Non-uniqueness of decimal representations",
            "page": 22,
            "quote": "Any terminating decimal has an alternative with repeating 9s",
            "status": "missing",
            "rationale": "The audit flagged alternative repeating-nine notation. The revision demonstrates two examples and distinguishes an infinite repeating tail from a finite approximation."
          }
        ]
      }
    ]
  },
  {
    "chapter_number": 4,
    "chapter_title": "Exploring Algebraic Identities",
    "lessons": [
      {
        "section": "Square identities",
        "title": "Square of a trinomial",
        "paragraphs": [
          "Extending binomial squaring to three terms requires evaluating (a + b + c)². By grouping the last two terms as a single compound quantity d = b + c, we can apply the familiar expansion: (a + d)² = a² + 2ad + d². Substituting b + c back for d produces a² + 2a(b + c) + (b + c)², which expands via distributivity to a² + 2ab + 2ca + b² + 2bc + c². Arranging terms symmetrically gives the standard identity (a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca. Geometrically, this represents a large square of side length a + b + c partitioned into three smaller squares of areas a², b², and c², and six rectangles: two of area ab, two of area bc, and two of area ca. That physical diagram assumes non-negative lengths; the algebraic identity holds for all real a, b and c.",
          "This identity simplifies squaring three-digit numbers mentally by splitting them into round base components. For example, 119² can be expressed as (100 + 10 + 9)², decomposing the calculation into simple powers of ten and basic products: 10000 + 100 + 81 + 2000 + 1800 + 180 = 14161. When terms involve negative signs, such as (3x - 2y + 4z)², parentheses should enclose negative coefficients so that sign changes in the cross-terms are tracked systematically. Furthermore, comparing binomial squares shows that (a + b)² - (a² + b²) = 2ab. Therefore, (a + b)² is greater than a² + b² when ab > 0, smaller when ab < 0, and equal precisely when ab = 0."
        ],
        "formulas": [
          "(a+b+c)² = a² + b² + c² + 2ab + 2bc + 2ca",
          "(a+b)² - (a²+b²) = 2ab"
        ],
        "examples": [
          {
            "title": "Expand a trinomial with mixed signs",
            "question": "Expand (3x - 2y + 4z)² using the trinomial square identity.",
            "steps": [
              "Identify the three terms: a = 3x, b = -2y, and c = 4z.",
              "Square each term: a² = (3x)² = 9x², b² = (-2y)² = 4y², c² = (4z)² = 16z².",
              "Compute the cross-products: 2ab = 2(3x)(-2y) = -12xy, 2bc = 2(-2y)(4z) = -16yz, and 2ca = 2(4z)(3x) = 24zx.",
              "Combine all six terms: 9x² + 4y² + 16z² - 12xy - 16yz + 24zx."
            ],
            "answer": "9x² + 4y² + 16z² - 12xy - 16yz + 24zx"
          },
          {
            "title": "Evaluate a three-digit square mentally",
            "question": "Calculate 119² by expressing it as the square of a trinomial.",
            "steps": [
              "Decompose 119 into round, convenient components: 119 = 100 + 10 + 9.",
              "Apply the identity with a = 100, b = 10, and c = 9.",
              "Compute the square terms: 100² = 10000, 10² = 100, 9² = 81.",
              "Compute the double products: 2(100)(10) = 2000, 2(100)(9) = 1800, 2(10)(9) = 180.",
              "Sum the components: 10000 + 100 + 81 + 2000 + 1800 + 180 = 14161."
            ],
            "answer": "14161"
          }
        ],
        "evidence": [
          {
            "concept": "Comparison of (a+b)² with a²+b² based on the cross-term 2ab",
            "page": 4,
            "quote": "What term will decide which is larger? Use the expansion of (a + b)2 to decide.",
            "rationale": "The textbook explicitly poses investigation into when (a+b)² > a²+b², (a+b)² < a²+b², or (a+b)² = a²+b² depending on the sign of ab, which is omitted in current notes.",
            "status": "missing"
          },
          {
            "concept": "Square of a trinomial: (a+b+c)² expansion and geometric representation",
            "page": 8,
            "quote": "What will happen if we want to find the square of the sum of three numbers a, b and c, that is, (a + b + c)2?",
            "rationale": "The trinomial square formula (a+b+c)² = a² + b² + c² + 2ab + 2bc + 2ca and its geometric dissection into 3 squares and 6 rectangles are completely missing from the existing notes.",
            "status": "missing"
          }
        ]
      },
      {
        "section": "Building and discovering identities",
        "title": "Sum, difference, and three-variable cubic identities",
        "paragraphs": [
          "Beyond binomial cubes, expanding products of linear binomials and quadratic trinomials yields the factored forms for sums and differences of cubes. Multiplying (x - y)(x² + xy + y²) gives x(x² + xy + y²) - y(x² + xy + y²) = x³ + x²y + xy² - x²y - xy² - y³ = x³ - y³. Similarly, replacing y with -y yields (x + y)(x² - xy + y²) = x³ + y³. For every positive integer n, x − y is a factor of xⁿ − yⁿ; this extends the difference-of-powers pattern discussed in NCERT. Unlike the trinomial in a perfect square expansion, the quadratic factor has a middle coefficient of 1 rather than 2, with a sign opposite to that of the linear factor.",
          "A broader three-variable identity arises from multiplying the trinomial x + y + z by the symmetric expression x² + y² + z² - xy - yz - zx. Expanding completely and cancelling matching cross-terms leaves x³ + y³ + z³ - 3xyz. This identity allows cubic sums of three variables to be computed efficiently when elementary sums and pairwise products are known. An important deduction is that whenever x + y + z = 0, the entire right-hand side vanishes, leading directly to the conditional result x³ + y³ + z³ = 3xyz. In worked examples, the stated sums and products should also be mutually consistent; the numbers 2, 3 and 5, for instance, have sum 10, sum of squares 38 and product 30."
        ],
        "formulas": [
          "x³ - y³ = (x - y)(x² + xy + y²)",
          "x³ + y³ = (x + y)(x² - xy + y²)",
          "x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx)"
        ],
        "examples": [
          {
            "title": "Factorise sum and difference of cubes",
            "question": "Factorise 64y³ + (1/125)z³ completely.",
            "steps": [
              "Express each term as a perfect cube: 64y³ = (4y)³ and (1/125)z³ = (z/5)³.",
              "Apply the identity A³ + B³ = (A + B)(A² - AB + B²) with A = 4y and B = z/5.",
              "Compute A² = 16y², AB = (4/5)yz, and B² = z²/25.",
              "Write the factored form: (4y + z/5)(16y² - (4/5)yz + z²/25)."
            ],
            "answer": "(4y + z/5)(16y² - (4/5)yz + z²/25)"
          },
          {
            "title": "Evaluate cubic sum using three variables",
            "question": "Find x³ + y³ + z³ if x + y + z = 10, x² + y² + z² = 38, and xyz = 30.",
            "steps": [
              "Use (x + y + z)² = x² + y² + z² + 2(xy + yz + zx) to find the pairwise sum: 10² = 38 + 2(xy + yz + zx).",
              "Solve for xy + yz + zx: (100 - 38)/2 = 62/2 = 31.",
              "Substitute into the cubic identity: x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - (xy + yz + zx)).",
              "Evaluate the right side: 10 × (38 - 31) = 10 × 7 = 70.",
              "Add 3xyz to both sides: x³ + y³ + z³ = 70 + 3(30) = 70 + 90 = 160."
            ],
            "answer": "160"
          }
        ],
        "evidence": [
          {
            "concept": "Sum and difference of cubes identities: x³ - y³ and x³ + y³",
            "page": 18,
            "quote": "Thus (x – y)(x2 + xy + y2) = x3 – y3. This is also an identity!",
            "rationale": "The factored forms x³ - y³ = (x - y)(x² + xy + y²) and x³ + y³ = (x + y)(x² - xy + y²) are featured in the textbook text and exercises but omitted in the current notes.",
            "status": "missing"
          },
          {
            "concept": "Three-variable cubic identity: x³ + y³ + z³ - 3xyz",
            "page": 18,
            "quote": "So, (x + y + z) (x2 + y2 + z2 – xy – xz – yz) = x3 + y3 + z3 – 3xyz. This is yet another identity.",
            "rationale": "The identity x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx) and its applications are a major core topic in Section 4.7, completely missing from current notes.",
            "status": "missing"
          }
        ]
      },
      {
        "section": "Mixed exam applications and fully worked solutions",
        "title": "Cuboid volume factorisation and divisibility proofs",
        "paragraphs": [
          "To find possible cuboid dimensions from a polynomial volume, use V = length × breadth × height. First extract a common numerical or variable factor, then factor the remaining quadratic using middle-term splitting or a square identity. The resulting three factors provide possible dimensions, but not necessarily the only set. To describe an actual cuboid rather than merely a formal algebraic product, all three selected dimensions must be strictly positive; record restrictions on any variables.",
          "Factorisation also proves divisibility statements. For any natural number n, n³ − n = n(n² − 1) = (n − 1)n(n + 1), the product of three consecutive INTEGERS. If n = 1, these integers are 0, 1 and 2; the product is still divisible by 6. In each set of three consecutive integers one is a multiple of 3 and at least one is even. Because 2 and 3 have no common factor greater than 1, the whole product is divisible by 6. Numerical checks alone would not establish this claim for all n."
        ],
        "formulas": [
          "V = l × b × h",
          "n³ - n = (n - 1)n(n + 1)"
        ],
        "examples": [
          {
            "title": "Find dimensions of a cuboid from volume",
            "question": "Find possible expressions for the dimensions of a cuboid whose volume is given by 3ps² - 15ps + 12p.",
            "steps": [
              "Identify the greatest common factor across all terms: 3p.",
              "Factor out 3p: 3p(s² - 5s + 4).",
              "Factor the quadratic factor by splitting the middle term: find numbers summing to -5 and multiplying to 4, which are -1 and -4.",
              "Write the complete factorisation: 3p(s - 1)(s - 4).",
              "Choose 3p, s − 1 and s − 4 as possible dimensions, provided p > 0 and s > 4 so every dimension is positive."
            ],
            "answer": "Possible dimensions: 3p, s − 1, s − 4, with p > 0 and s > 4."
          },
          {
            "title": "Divisibility proof for consecutive integers",
            "question": "Prove that n³ - n is always divisible by 6 for every natural number n.",
            "steps": [
              "Factor out the common factor n: n³ - n = n(n² - 1).",
              "Apply the difference of squares identity to n² - 1: n(n - 1)(n + 1).",
              "Reorder the factors into three consecutive integers (n − 1)n(n + 1); at n = 1 the first is 0.",
              "Among any three consecutive integers, at least one is divisible by 2 (even) and exactly one is divisible by 3.",
              "Since gcd(2, 3) = 1, their product must be divisible by 2 × 3 = 6."
            ],
            "answer": "(n − 1)n(n + 1) contains an even integer and a multiple of 3, so it is divisible by 6 for every natural n."
          }
        ],
        "evidence": [
          {
            "concept": "Factoring volume polynomials to determine dimensions of a cuboid",
            "page": 22,
            "quote": "Find possible expressions for the length, breadth, and heights of each of the following cuboids whose volumes are given",
            "rationale": "Exercise Set question type on expressing cubic or quadratic expressions as three linear factors representing length, breadth, and height of a cuboid is omitted.",
            "status": "missing"
          },
          {
            "concept": "Factoring n³ - n to prove divisibility by 6 for all natural numbers",
            "page": 23,
            "quote": "By factoring the expression, check that n3 – n is always divisible by 6 for all natural numbers n. Give reasons.",
            "rationale": "Factoring n³ - n into (n-1)n(n+1) as the product of three consecutive integers to establish divisibility by 6 is an explicit higher-order exercise missing from the notes.",
            "status": "missing"
          }
        ]
      },
      {
        "section": "Square identities",
        "title": "Geometric subtraction proof of (a − b)²",
        "merge_into": "Square of a difference",
        "paragraphs": [
          "Take a large square of side a and mark length b along two neighbouring sides, with 0 ≤ b ≤ a. The smaller corner square has side a − b. To obtain its area without double-counting, first remove a vertical strip of width b and height a (area ab) from the large square. Then remove a horizontal strip with width a − b and height b (area b(a − b)) from the remaining region. The strips do not overlap, so the corner square has area a² − ab − b(a − b).",
          "Expand the final subtraction carefully: a² − ab − ab + b² = a² − 2ab + b². This shows why the last term is PLUS b²; the second rectangular strip includes the quantity −b² when its product is expanded, and subtracting that product restores b². The geometric argument needs positive lengths, but (a − b)(a − b) proves the same identity by distributivity for any real a and b. Do not confuse (a − b)² with a² − b²."
        ],
        "formulas": [
          "(a − b)² = a² − ab − b(a − b) = a² − 2ab + b²"
        ],
        "examples": [
          {
            "title": "Derive an area by removing strips",
            "question": "A 12 cm square loses a strip 5 cm wide and then a 5 cm strip across the remaining 7 cm. Find the remaining square's area.",
            "steps": [
              "The large square has area 12² = 144 cm².",
              "Remove the first 12 × 5 rectangle: 144 − 60 = 84 cm².",
              "Remove the second 7 × 5 rectangle (only from the remainder): 84 − 35 = 49 cm².",
              "The remaining side is 12 − 5 = 7 cm, so its area is 7² = 49 cm².",
              "The formula confirms 12² − 2(12)(5) + 5² = 49 cm²."
            ],
            "answer": "49 cm²"
          },
          {
            "title": "Apply the identity with variables",
            "question": "Expand (4x − 3y)².",
            "steps": [
              "Identify A = 4x and B = 3y.",
              "Square both: A² = 16x² and B² = 9y².",
              "Calculate the cross-term: −2AB = −2(4x)(3y) = −24xy.",
              "Combine as A² − 2AB + B² = 16x² − 24xy + 9y²."
            ],
            "answer": "16x² − 24xy + 9y²"
          }
        ],
        "evidence": [
          {
            "concept": "Area dissection for square of a difference",
            "page": 7,
            "quote": "The area of the big square is a2 square units. The small square has an area of (a – b)2 square units.",
            "rationale": "NCERT Section 4.3, Fig. 4.3 uses two subtracted rectangles to prove the square-of-a-difference identity.",
            "status": "partial"
          }
        ]
      },
      {
        "section": "Difference of two squares",
        "title": "Shridharacharya's rearranged square identity",
        "merge_into": "Mental arithmetic using nearby squares",
        "paragraphs": [
          "The conjugate identity (a + b)(a − b) = a² − b² can be rearranged to a² = (a + b)(a − b) + b². NCERT associates this useful square-calculation form with Śhrīdharāchārya. To square a number near a convenient multiple of ten, choose b so that both a + b and a − b are easy to multiply. After multiplying the nearby factors, add the small square b² to restore the value of a².",
          "The reasoning is exact: expanding the right side gives a² − b² + b² = a². This is a proof for all real a and b, not a coincidence limited to numbers ending in five. A common error is to stop at (a + b)(a − b), which is too small by b² when b is not zero. For a geometric illustration, choose lengths 0 ≤ b ≤ a; for algebraic calculations no such restriction is needed."
        ],
        "formulas": [
          "a² = (a + b)(a − b) + b²"
        ],
        "examples": [
          {
            "title": "Square 85 without long multiplication",
            "question": "Use the historical rearranged identity to calculate 85².",
            "steps": [
              "Take a = 85 and b = 5, making a + b = 90 and a − b = 80.",
              "Apply a² = (a + b)(a − b) + b².",
              "Multiply 90 × 80 = 7200 and compute 5² = 25.",
              "Add 7200 + 25 = 7225."
            ],
            "answer": "7225"
          },
          {
            "title": "Why add the correction square?",
            "question": "Calculate 105² using factors 110 and 100.",
            "steps": [
              "Choose a = 105 and b = 5.",
              "The nearby factors give 110 × 100 = 11000 = 105² − 5².",
              "Add the correction: 11000 + 5² = 11000 + 25.",
              "Therefore 105² = 11025."
            ],
            "answer": "11025"
          }
        ],
        "evidence": [
          {
            "concept": "Shridharacharya's identity for square calculations",
            "page": 10,
            "quote": "In 750 CE, this identity was proposed by Śhrīdharāchārya as a method to quickly compute the squares of numbers.",
            "rationale": "NCERT Section 4.4 teaches the rearranged difference-of-squares identity as a mental-arithmetic tool.",
            "status": "partial"
          }
        ]
      },
      {
        "section": "Factorisation",
        "title": "Algebra tiles for rectangular factorisation",
        "paragraphs": [
          "Algebra tiles give a physical meaning to quadratic expressions. One large x-by-x square represents x²; a narrow x-by-1 rectangle represents x; and a unit square represents 1. Arrange the pieces into one complete rectangle, without gaps or overlaps. Its side lengths supply the factorisation: if the outer sides are x + a and x + b, its area is both (x + a)(x + b) and x² + (a + b)x + ab.",
          "For x² + 7x + 12, put the x² tile at a corner. Arrange three x-tiles alongside one edge, four along the other, and a 3-by-4 block of twelve unit tiles in the remaining corner. The completed rectangle has side lengths x + 3 and x + 4. This picture explains BOTH factor tests: the groups of x-tiles must add to 7, and the unit-square corner must have exactly 12 tiles. Splitting as 2 and 5 matches the middle coefficient but gives only 10 corner tiles, so it is wrong.",
          "Geometry with positive physical tiles represents positive areas, usually with x ≥ 0. If expressions include negative terms, signed tiles are possible, but factorisation by middle-term splitting and distributivity is generally clearer. Never treat a decorative tile drawing as an algebraic proof unless its areas and complete rectangular outline are accounted for."
        ],
        "formulas": [
          "x² + (a + b)x + ab = (x + a)(x + b)"
        ],
        "examples": [
          {
            "title": "Build a rectangle from 30 unit tiles",
            "question": "Use an area-tile arrangement to factor x² + 11x + 30.",
            "steps": [
              "Represent x² with one large square, 11x with eleven long rectangles and 30 with unit squares.",
              "Find two nonnegative integers adding to 11 and multiplying to 30; use 5 and 6.",
              "Place five x-rectangles along one side of the x² square and six along the other side.",
              "Fill the 5 × 6 corner with all 30 unit squares; the rectangle now has sides x + 5 and x + 6.",
              "Verify by distributing: (x + 5)(x + 6) = x² + 11x + 30."
            ],
            "answer": "(x + 5)(x + 6)"
          }
        ],
        "evidence": [
          {
            "concept": "Quadratic factorisation with algebra tiles",
            "page": 12,
            "quote": "helps to visualise the product of x + 3 and x + 4 using algebra tiles. The expression x + 3 is represented using an x-tile and three unit tiles.",
            "rationale": "NCERT Section 4.5, Fig. 4.7 uses the tiled rectangle to relate polynomial area and linear factors.",
            "status": "partial"
          }
        ]
      },
      {
        "section": "Square identities",
        "title": "General linear binomial products",
        "merge_into": "Multiplication of two nearby binomials",
        "paragraphs": [
          "For unlike linear brackets, such as (2x + 3)(3x + 1), the leading coefficient of x is different in each factor. Use distributivity rather than treating both factors as x + a. In general, (px + a)(qx + b) gives four products: pqx², pbx, aqx and ab. After combining the middle terms, the identity becomes pqx² + (pb + aq)x + ab. The x² coefficient is pq, the constant is ab, and the x coefficient is the SUM of the crossed products.",
          "The identity runs backward to factor non-monic quadratics. For 6x² + 11x + 3, find two contributions to the middle term that add to 11x and allow a common bracket. Splitting 11x into 9x + 2x gives 3x(2x + 3) + 1(2x + 3) = (3x + 1)(2x + 3). Expand the proposed answer to verify the leading, middle and constant terms; guessing the factors from the constant alone does not suffice."
        ],
        "formulas": [
          "(px + a)(qx + b) = pqx² + (pb + aq)x + ab"
        ],
        "examples": [
          {
            "title": "Expand two unlike binomials",
            "question": "Expand (3x − 2)(2x + 5).",
            "steps": [
              "Multiply 3x by both terms in the second bracket: 6x² + 15x.",
              "Multiply −2 by both terms: −4x − 10.",
              "Add all four products: 6x² + 15x − 4x − 10.",
              "Collect like terms to obtain 6x² + 11x − 10."
            ],
            "answer": "6x² + 11x − 10"
          },
          {
            "title": "Reverse the expansion",
            "question": "Factorise 6x² + 11x + 3.",
            "steps": [
              "Find numbers adding to 11 and multiplying to 18 = 6 × 3; choose 9 and 2.",
              "Rewrite as 6x² + 9x + 2x + 3.",
              "Factor each group: 3x(2x + 3) + (2x + 3).",
              "Take out the common bracket: (3x + 1)(2x + 3).",
              "Check: the expansion gives 6x² + 11x + 3."
            ],
            "answer": "(3x + 1)(2x + 3)"
          }
        ],
        "evidence": [
          {
            "concept": "General product of unequal linear binomials",
            "page": 13,
            "quote": "Fill in the blanks with the appropriate expressions to make the equation true.",
            "rationale": "NCERT Section 4.5 generalises (px+a)(qx+b), then asks for a distributive-law verification.",
            "status": "partial"
          }
        ]
      },
      {
        "section": "Building and discovering identities",
        "title": "Cube dissection: two cubes and six cuboids",
        "merge_into": "Cubes as products of three factors",
        "paragraphs": [
          "Picture a solid cube with edge a + b, where a and b are nonnegative lengths. Split EACH of the three edge directions into lengths a and b. This makes 2 × 2 × 2 = 8 non-overlapping solids. One small cube has dimensions a × a × a and volume a³; another has dimensions b × b × b and volume b³. The six remaining solids are rectangular cuboids, not squares, and their volumes must be measured in cubic units.",
          "Three cuboids have dimensions a × a × b, each volume a²b. The other three have dimensions a × b × b, each volume ab². Add their contributions: (a + b)³ = a³ + 3a²b + 3ab² + b³. The coefficients 1,3,3,1 count the numbers of ways to choose which dimensions use b. Distributive multiplication proves the same rule for real variables, even when the physical length model is not applicable. Substituting b with −b yields (a − b)³ = a³ − 3a²b + 3ab² − b³."
        ],
        "formulas": [
          "(a + b)³ = a³ + 3a²b + 3ab² + b³",
          "(a − b)³ = a³ − 3a²b + 3ab² − b³"
        ],
        "examples": [
          {
            "title": "Check all eight pieces",
            "question": "A 5 cm cube is split into edge lengths 3 cm and 2 cm along all directions. Add the smaller volumes.",
            "steps": [
              "The two cube volumes are 3³ = 27 cm³ and 2³ = 8 cm³.",
              "Three a²b cuboids contribute 3(3²)(2) = 54 cm³.",
              "Three ab² cuboids contribute 3(3)(2²) = 36 cm³.",
              "Add 27 + 54 + 36 + 8 = 125 cm³.",
              "Compare the outside cube's volume: (3 + 2)³ = 5³ = 125 cm³."
            ],
            "answer": "125 cm³"
          },
          {
            "title": "Apply the pattern algebraically",
            "question": "Expand (2x + 1)³.",
            "steps": [
              "Set a = 2x and b = 1.",
              "Calculate a³ = 8x³ and b³ = 1.",
              "Compute the cross-volumes: 3a²b = 12x² and 3ab² = 6x.",
              "Add all terms: 8x³ + 12x² + 6x + 1."
            ],
            "answer": "8x³ + 12x² + 6x + 1"
          }
        ],
        "evidence": [
          {
            "concept": "Three-dimensional cube model for (a+b)³",
            "page": 16,
            "quote": "Notice that the larger cube can be split into two cubes and six cuboids. The cubes have volumes, a3 and b3 cubic units, respectively.",
            "rationale": "NCERT Section 4.7, Fig. 4.10 illustrates the eight-component volume identity.",
            "status": "partial"
          }
        ]
      },
      {
        "section": "Building and discovering identities",
        "title": "Cubic identities under a given linear condition",
        "merge_into": "Sum, difference, and three-variable cubic identities",
        "paragraphs": [
          "A final-chapter exercise may give only a sum such as x + y = −4 rather than the values of x and y separately. Recognise the cube of a sum: (x + y)³ = x³ + y³ + 3xy(x + y). Rearranging gives x³ + y³ = (x + y)³ − 3xy(x + y). Substituting the known sum first often makes every remaining xy term cancel; this is a deliberate use of an identity, not a trick that guesses values for unknowns.",
          "Similarly, treat x³ − 8y³ as x³ + (−2y)³. Applying the cube-of-a-sum identity gives x³ − 8y³ = (x − 2y)³ + 6xy(x − 2y). If x − 2y is supplied as 6, this becomes 216 + 36xy. Algebraic substitutions must preserve the sign of negative terms, and the final simplification should work for every pair satisfying the condition."
        ],
        "formulas": [
          "x³ + y³ = (x + y)³ − 3xy(x + y)",
          "x³ − 8y³ = (x − 2y)³ + 6xy(x − 2y)"
        ],
        "examples": [
          {
            "title": "Use only the given sum",
            "question": "Find x³ + y³ − 12xy + 64 when x + y = −4.",
            "steps": [
              "Use x³ + y³ = (x + y)³ − 3xy(x + y).",
              "Substitute x + y = −4: x³ + y³ = −64 + 12xy.",
              "Place this in the expression: (−64 + 12xy) − 12xy + 64.",
              "Cancel like terms to get 0; no separate x and y are needed."
            ],
            "answer": "0"
          },
          {
            "title": "Use a given difference",
            "question": "Evaluate x³ − 8y³ − 36xy − 216 when x = 2y + 6.",
            "steps": [
              "Rearrange the condition to x − 2y = 6.",
              "Use x³ − 8y³ = (x − 2y)³ + 6xy(x − 2y).",
              "Replace x − 2y by 6: 216 + 36xy.",
              "Subtract 36xy and 216 to obtain 0."
            ],
            "answer": "0"
          }
        ],
        "evidence": [
          {
            "concept": "Conditional cubic expressions in NCERT end exercises",
            "page": 23,
            "quote": "x3 + y3 – 12xy + 64, when x + y = – 4",
            "rationale": "NCERT Chapter 4 end-of-chapter Exercise 13 asks for two cubic expressions given x+y=−4 or x=2y+6.",
            "status": "partial"
          }
        ]
      },
      {
        "section": "Factorisation",
        "title": "Given linear factors and unknown quadratic coefficients",
        "paragraphs": [
          "Suppose a polynomial P(x) contains x − k as a factor. Then P(x) = (x − k)Q(x) for another polynomial Q, so putting x = k makes P(k) = 0. This follows immediately from multiplication: a zero factor forces a zero product. NCERT uses this observation in a starred exercise involving two stated linear factors and two unknown coefficients in a quadratic.",
          "For P(x) = px² + 5x + r, the stated factors x − 2 and x − 1/2 imply P(2) = 0 and P(1/2) = 0. They provide TWO equations: 4p + 10 + r = 0, and p/4 + 5/2 + r = 0. Subtraction gives (15/4)p + 15/2 = 0, hence p = −2 and r = −2. As an independent check, −2(x − 2)(x − 1/2) expands to −2x² + 5x − 2. The final verification matters more than simply claiming the two coefficients are equal."
        ],
        "formulas": [
          "If x − k is a factor of P(x), then P(k) = 0"
        ],
        "examples": [
          {
            "title": "NCERT starred coefficient proof",
            "question": "If x − 2 and x − 1/2 are factors of px² + 5x + r, show p = r.",
            "steps": [
              "Write P(x) = px² + 5x + r. From P(2) = 0, obtain 4p + 10 + r = 0.",
              "From P(1/2) = 0, obtain p/4 + 5/2 + r = 0.",
              "Subtract the second equation from the first: 15p/4 + 15/2 = 0.",
              "Multiply by 4: 15p + 30 = 0, so p = −2.",
              "Substitute back: 4(−2) + 10 + r = 0, giving r = −2.",
              "Verify P(x) = −2(x − 2)(x − 1/2)."
            ],
            "answer": "p = r = −2"
          },
          {
            "title": "Find new quadratic coefficients",
            "question": "If x − 1 and x + 3 are factors of ax² + 4x + b, find a and b.",
            "steps": [
              "Write ax² + 4x + b = k(x − 1)(x + 3).",
              "Expand the factor product: (x − 1)(x + 3) = x² + 2x − 3.",
              "Compare the x coefficients: 2k = 4, so k = 2.",
              "Therefore a = 2 and b = −3(2) = −6.",
              "Expand 2(x − 1)(x + 3) to check 2x² + 4x − 6."
            ],
            "answer": "a = 2, b = −6"
          }
        ],
        "evidence": [
          {
            "concept": "Given-factor proof for unknown coefficients",
            "page": 23,
            "quote": "If both x – 2 and x – 1/2 are factors of px2 + 5x + r, show that p = r.",
            "rationale": "NCERT Chapter 4 end-of-chapter starred Exercise 10 requires a proof that p=r using specified linear factors.",
            "status": "partial"
          }
        ]
      },
      {
        "section": "Mixed exam applications and fully worked solutions",
        "title": "Area of an outer border around a square",
        "paragraphs": [
          "For a square playground with side L and a path of uniform width s OUTSIDE every edge, the new outer side measures L + 2s: add s on the left AND s on the right. The path's area is not the perimeter and not the area of the larger square alone. Subtract the original L² square from the outer (L + 2s)² square. This area-difference method prevents overlaps at the four corners.",
          "Use A_path = (L + 2s)² − L² = 4Ls + 4s² = 4s(L + s). The same conclusion follows directly from difference of squares: [(L + 2s) − L][(L + 2s) + L] = (2s)(2L + 2s). State that L > 0 and s ≥ 0, use square metres for areas, and distinguish an outside path from a strip built INSIDE the original boundary."
        ],
        "formulas": [
          "A_path = (L + 2s)² − L² = 4s(L + s), for an outside path"
        ],
        "examples": [
          {
            "title": "Square playground border",
            "question": "A 40 m square playground has an outside path of uniform width s m. Express the path's area.",
            "steps": [
              "The original playground area is 40² = 1600 m².",
              "The outer square has side 40 + 2s metres.",
              "Subtract: A_path = (40 + 2s)² − 1600.",
              "Expand to 1600 + 160s + 4s² − 1600 = 160s + 4s².",
              "Factor, if desired: A_path = 4s(40 + s) square metres."
            ],
            "answer": "4s² + 160s m²"
          },
          {
            "title": "Check the border formula",
            "question": "A square 30 m across has a 2 m outside path. Find the path area.",
            "steps": [
              "The outer square side is 30 + 2(2) = 34 m.",
              "Subtract areas: 34² − 30² = 1156 − 900 = 256 m².",
              "Check by factorisation: 4s(L + s) = 4(2)(30 + 2) = 256 m²."
            ],
            "answer": "256 m²"
          }
        ],
        "evidence": [
          {
            "concept": "Outer path area from algebraic identities",
            "page": 23,
            "quote": "A path of width s metres is created around the playground for people to walk.",
            "rationale": "NCERT Chapter 4 end-of-chapter Exercise 7 asks for a formula for the path area around a square playground.",
            "status": "partial"
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
