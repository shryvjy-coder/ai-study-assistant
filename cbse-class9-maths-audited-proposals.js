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
          "Extending binomial squaring to three terms requires evaluating (a + b + c)². By grouping the last two terms as a single compound quantity d = b + c, we can apply the familiar expansion: (a + d)² = a² + 2ad + d². Substituting b + c back for d produces a² + 2a(b + c) + (b + c)², which expands via distributivity to a² + 2ab + 2ca + b² + 2bc + c². Arranging terms symmetrically gives the standard identity (a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca. Geometrically, this represents a large square of side length a + b + c partitioned into three smaller squares of areas a², b², and c², alongside six rectangular strips consisting of three conjugate pairs with areas ab, bc, and ca.",
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
          "Beyond binomial cubes, expanding products of linear binomials and quadratic trinomials yields the factored forms for sums and differences of cubes. Multiplying (x - y)(x² + xy + y²) gives x(x² + xy + y²) - y(x² + xy + y²) = x³ + x²y + xy² - x²y - xy² - y³ = x³ - y³. Similarly, replacing y with -y yields (x + y)(x² - xy + y²) = x³ + y³. These identities show that x - y is always an algebraic factor of xⁿ - yⁿ. Unlike the trinomial in a perfect square expansion, the quadratic factor has a middle coefficient of 1 rather than 2, with a sign opposite to that of the linear factor.",
          "A broader three-variable identity arises from multiplying the trinomial x + y + z by the symmetric expression x² + y² + z² - xy - yz - zx. Expanding completely and cancelling matching cross-terms leaves x³ + y³ + z³ - 3xyz. This identity allows cubic sums of three variables to be computed efficiently when elementary sums and pairwise products are known. An important deduction is that whenever x + y + z = 0, the entire right-hand side vanishes, leading directly to the conditional result x³ + y³ + z³ = 3xyz."
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
            "question": "Find x³ + y³ + z³ if x + y + z = 10, x² + y² + z² = 38, and xyz = 25.",
            "steps": [
              "Use (x + y + z)² = x² + y² + z² + 2(xy + yz + zx) to find the pairwise sum: 10² = 38 + 2(xy + yz + zx).",
              "Solve for xy + yz + zx: (100 - 38)/2 = 62/2 = 31.",
              "Substitute into the cubic identity: x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - (xy + yz + zx)).",
              "Evaluate the right side: 10 × (38 - 31) = 10 × 7 = 70.",
              "Add 3xyz to both sides: x³ + y³ + z³ = 70 + 3(25) = 70 + 75 = 145."
            ],
            "answer": "145"
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
          "Algebraic factorisation serves as a key tool for solving geometric dimensional problems. Just as the area of a rectangle factors into two linear binomial dimensions representing length and breadth, the polynomial expression for the volume of a cuboid must be factorised into three linear dimensions representing length, breadth, and height: V = l × b × h. The standard approach begins by extracting common numerical and variable monomials across all terms, after which the remaining quadratic expression can be factored using splitting the middle term or difference of squares.",
          "Factoring expressions also provides algebraic proofs for divisibility properties in number theory. Consider the expression n³ - n for any natural number n. Factoring out n yields n(n² - 1), which further decomposes via the difference of two squares into (n - 1)n(n + 1). This product represents three consecutive integers. In any set of three consecutive integers, at least one must be a multiple of 2 and exactly one must be a multiple of 3. Because 2 and 3 are coprime, their product is always divisible by 2 × 3 = 6, proving that n³ - n is divisible by 6 for all natural numbers n."
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
              "Assign the three linear factors as length, breadth, and height."
            ],
            "answer": "Possible dimensions are 3p, (s - 1), and (s - 4)"
          },
          {
            "title": "Divisibility proof for consecutive integers",
            "question": "Prove that n³ - n is always divisible by 6 for every natural number n.",
            "steps": [
              "Factor out the common factor n: n³ - n = n(n² - 1).",
              "Apply the difference of squares identity to n² - 1: n(n - 1)(n + 1).",
              "Rearrange in ascending order: (n - 1)n(n + 1), which represents three consecutive natural numbers.",
              "Among any three consecutive integers, at least one is divisible by 2 (even) and exactly one is divisible by 3.",
              "Since gcd(2, 3) = 1, their product must be divisible by 2 × 3 = 6."
            ],
            "answer": "n³ - n = (n - 1)n(n + 1), being the product of three consecutive integers, is always divisible by 6"
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
