/* StudyAI deep CBSE / NCERT notes - Class 9.
 * Original StudyAI notes grounded in the user's 2026-27 NCERT PDFs.
 * No textbook passages are reproduced.
 */
(() => {
'use strict';
const notes=[];
const D=(subject,book,title,sourceFile,overview,concepts,reasoning,visuals,examTips,distinctions,quickRevision,selfCheck,extra={})=>notes.push({
 grade:'Class 9',subject,sourceBook:book,title,sourceFile,
 sourceBasis:'User-supplied NCERT 2026-27 PDF',
 notesVerified:true,
 deepNotes:{overview,concepts,reasoning,visuals,examTips,distinctions,quickRevision,selfCheck,...extra}
});
const C=(h,t)=>[h,t];

const M='Ganita Manjari · Parts I & II';
D('Mathematics',M,'Orienting Yourself: The Use of Coordinates','iemh101.pdf',
 'Coordinates turn position into numbers. The chapter begins with grid-based location and develops the Cartesian plane as a precise language for describing where a point lies and how one position differs from another.',
 [C('Coordinate system','Two perpendicular axes provide a fixed reference. The horizontal axis is the x-axis, the vertical axis is the y-axis, and their intersection is the origin.'),C('Ordered pair','A point is written as (x, y). The order matters: x gives horizontal position first, then y gives vertical position.'),C('Quadrants and signs','The signs of x and y identify the quadrant. Points on an axis are not in any quadrant.'),C('Geometric use','Coordinates let us compare displacement, identify alignment, and reason about midpoints and shapes numerically.')],
 ['Choose and label the axes before reading a point.','Move horizontally for x and vertically for y, keeping scale consistent.','For midpoint reasoning, average corresponding coordinates because the midpoint is halfway in each independent direction.'],
 ['Sketch the two axes, label O, and mark one point in each quadrant to revise sign patterns.','For a pair of points, draw horizontal and vertical projections to visualise coordinate differences.'],
 ['Never reverse x and y.','State the scale if graph units are not one-to-one.','Check signs from the point’s position rather than from memory alone.'],
 ['(x, y) is ordered, so (2, -3) and (-3, 2) are different points.','A point on the x-axis has y=0; a point on the y-axis has x=0.'],
 ['origin and axes','quadrant sign patterns','ordered pairs','horizontal/vertical displacement','midpoint as coordinate-wise average'],
 ['Why is order important in an ordered pair?','Which coordinates describe a point on the y-axis?','How can coordinates prove that two points are horizontally aligned?','Why is the midpoint found by averaging x-values and y-values separately?']
);
D('Mathematics',M,'Introduction to Linear Polynomials','iemh102.pdf',
 'A linear polynomial is an algebraic expression whose variable has degree one. The chapter connects symbolic expressions to changing quantities, tables and straight-line patterns so algebra represents a relationship rather than a string of symbols.',
 [C('Polynomial language','Terms contain coefficients and variables. In ax+b, a is the coefficient of x and b is a constant.'),C('Degree','A non-zero linear polynomial has highest exponent 1. Expressions containing x² or 1/x are not linear polynomials in x.'),C('Value of a polynomial','Substitution assigns a numerical value to an expression for a chosen variable value.'),C('Linear change','Equal changes in x produce equal changes in ax+b, which is why its graph has a constant rate of change.')],
 ['Translate the situation into quantities before choosing symbols.','Collect like terms carefully, then substitute only after the expression is simplified when convenient.','Use a table of values to check whether a symbolic rule and graph tell the same story.'],
 ['Build a two-column x and ax+b table and plot the points to see a straight-line pattern.','Use algebra tiles or area boxes to distinguish terms and coefficients if signs become confusing.'],
 ['Distinguish an expression from an equation: an expression has no equality to solve.','Keep the coefficient sign attached to its term.','When substituting a negative number, use brackets.'],
 ['Polynomial versus equation: ax+b is an expression; ax+b=c is an equation.','Coefficient versus constant: a multiplies the variable; b does not depend on it.'],
 ['terms and coefficients','degree one','substitution','linear pattern','table-graph-symbol connection'],
 ['What makes a polynomial linear?','How does changing x by 1 affect ax+b?','Why should a negative substituted value be bracketed?','How can a table expose an algebraic mistake?']
);
D('Mathematics',M,'The World of Numbers','iemh103.pdf',
 'The chapter expands the number system from counting numbers to rational and irrational numbers and stresses how representations, decimal behaviour and proof reveal what kind of number we are dealing with.',
 [C('Rational numbers','A rational number can be written p/q with integers p and q and q≠0.'),C('Irrational numbers','Numbers that cannot be expressed as p/q are irrational; their decimals are non-terminating and non-repeating.'),C('Density','Between two distinct rational numbers there are infinitely many rational numbers, and the real number line has no “next” rational number.'),C('Decimal representation','Terminating and repeating decimals represent rational numbers; non-terminating non-repeating decimals represent irrational numbers.'),C('Proof and construction','Geometric constructions such as the square-root spiral connect lengths to irrational square roots, while contradiction can establish irrationality.')],
 ['When classifying a number, use its definition or decimal pattern, not how complicated it looks.','To find a rational between two rationals, their average works; repeat the idea to generate more.','In an irrationality proof, state the assumption clearly and show why it forces a contradiction with lowest terms or divisibility.'],
 ['Draw a number line and place rational values around √2 to see approximation versus exact value.','Construct successive right triangles in a square-root spiral to connect Pythagoras with √2, √3 and beyond.'],
 ['Do not say every non-terminating decimal is irrational, repeating decimals are rational.','A decimal approximation is not the exact irrational number.','A few numerical examples are evidence, not a proof of a universal claim.'],
 ['Rational does not mean “integer”; integers are a subset of rationals.','Non-terminating repeating and non-terminating non-repeating decimals belong to different categories.'],
 ['p/q definition','terminating or recurring decimals','irrational numbers','density','number-line representation','proof versus example'],
 ['How can 0.333… be rational even though it never terminates?','How would you find three rationals between two given rationals?','What feature distinguishes an irrational decimal?','Why is a diagram not by itself a proof that √2 is irrational?']
);
D('Mathematics',M,'Exploring Algebraic Identities','iemh104.pdf',
 'An identity is an equality true for every permitted value of its variables. NCERT develops identities through numerical patterns and geometric reasoning so expansion and factorisation are understood as reversible structure.',
 [C('Identity','Unlike an equation that may hold for selected values, an identity holds for all values in its domain.'),C('Expansion','Products such as (a+b)² can be rewritten as sums by distributive reasoning.'),C('Factorisation','Factorisation reverses expansion, recognising a sum or difference as a product with useful structure.'),C('Geometric meaning','Area models make terms such as a², ab and b² visible and explain why coefficients such as 2 appear.')],
 ['First identify the structural pattern before substituting numbers.','Expand using distribution to verify an identity when unsure.','When factorising, check by multiplying the factors back out.'],
 ['Draw a square of side a+b split into a², two ab rectangles and b².','Use two squares of areas a² and b² to visualise the difference-of-squares factorisation.'],
 ['Do not write (a+b)²=a²+b².','Keep the middle-term sign correct in (a-b)².','An identity can simplify a calculation, but only when the expression actually matches its pattern.'],
 ['Identity versus equation: universal truth versus a condition to solve.','Expansion versus factorisation: product-to-sum versus sum-to-product.'],
 ['(a+b)²','(a-b)²','a²-b²','recognise structure','verify by re-expansion'],
 ['Why does 2ab appear in (a+b)²?','How can you verify a factorisation quickly?','What is the difference between an identity and an equation?','Which identity is useful for 103×97, and why?']
);
D('Mathematics',M,'I’m Up and Down, and Round and Round','iemh105.pdf',
 'This chapter studies circles as precise geometric objects and develops relationships among chords, arcs and angles. The main skill is moving from a visual pattern to a logically justified theorem.',
 [C('Circle language','All points of a circle are at the same distance from its centre. Radius, diameter, chord, arc, sector and segment have distinct meanings.'),C('Chords and centre','Equal chords correspond to equal central angles, and perpendicular relations involving the centre reveal chord symmetry.'),C('Angles on an arc','The angle at the centre standing on an arc is twice the angle at the circumference standing on the same arc.'),C('Cyclic quadrilateral','A quadrilateral whose vertices lie on a circle has opposite angles summing to 180°, with useful converse reasoning.')],
 ['Mark the relevant arc or chord before writing any angle relation.','State the theorem that connects the known and unknown angles.','In proof questions, use equal radii, congruent triangles or angle relations explicitly rather than trusting the picture.'],
 ['Draw one chord with a centre-to-chord perpendicular to show the bisection relationship.','Draw a cyclic quadrilateral and highlight opposite angle pairs.'],
 ['A diagram is not necessarily drawn to scale.','Do not confuse a chord with an arc.','Check that angles claimed to stand on the “same arc” really do.'],
 ['Diameter is a special chord passing through the centre.','Central angle and inscribed angle are different even when they intercept the same arc.'],
 ['circle vocabulary','chord-centre relations','angle at centre theorem','same-segment reasoning','cyclic quadrilateral'],
 ['What makes a quadrilateral cyclic?','Why is every diameter a chord but not every chord a diameter?','How are central and inscribed angles on the same arc related?','How would you justify, not merely observe, that two angles are equal?']
);
D('Mathematics',M,'Measuring Space: Perimeter and Area','iemh106.pdf',
 'Mensuration is about choosing the right measure for a boundary or region and then decomposing unfamiliar figures into known pieces. The chapter also highlights why equal perimeter does not imply equal area.',
 [C('Perimeter','Perimeter measures boundary length and uses linear units.'),C('Area','Area measures two-dimensional coverage and uses square units.'),C('Decomposition','Composite areas can be found by adding and subtracting familiar shapes.'),C('Scaling','If every length is multiplied by k, perimeter scales by k while area scales by k².'),C('Circular measurement','Arc and circular regions require careful use of radius, diameter and π.')],
 ['Sketch and label dimensions before calculating.','Split a composite figure into non-overlapping standard pieces.','Estimate the expected size and units before final arithmetic to catch unreasonable answers.'],
 ['Redraw a running track as rectangles plus semicircular ends to compare lane lengths.','Shade a composite region, then mark add/subtract pieces with different hatch patterns.'],
 ['Do not mix cm with cm².','Use radius, not diameter, in πr².','Avoid adding areas of overlapping regions twice.'],
 ['Perimeter answers “how far around”; area answers “how much surface”.','Same perimeter can enclose different areas.'],
 ['linear vs square units','decompose shapes','triangle/rectangle/circle formulas','scaling','estimate and check'],
 ['How do units tell you whether an answer is perimeter or area?','What happens to area if all lengths double?','How would you handle a figure with a circular hole?','Why can two figures share a perimeter but have different areas?']
);
D('Mathematics',M,'The Mathematics of Maybe: Introduction to Probability','iemh107.pdf',
 'Probability measures uncertainty. The chapter builds from outcomes and events to theoretical probability and compares mathematical expectation with experimental results.',
 [C('Random experiment','A repeatable process whose exact outcome is uncertain before it occurs.'),C('Outcome and event','An outcome is one possible result; an event is a collection of outcomes satisfying a condition.'),C('Equally likely model','For equally likely outcomes, probability is favourable outcomes divided by total outcomes.'),C('Experimental probability','Observed relative frequency estimates likelihood from data and can fluctuate in small samples.'),C('Probability scale','Probabilities range from 0, impossible, to 1, certain.')],
 ['List the sample space before counting favourable outcomes.','Check whether outcomes are genuinely equally likely before using simple counting.','Compare theory and experiment by considering sample size and random variation.'],
 ['Use a probability line from 0 to 1 and place impossible, unlikely, even chance, likely and certain events.','Create a table of cumulative relative frequency over repeated trials to see stabilisation.'],
 ['Do not count outcomes twice.','“Possible” does not mean probability 1/2.','A short experiment is not expected to match theoretical probability exactly.'],
 ['Theoretical probability comes from a model; experimental probability comes from observed trials.','Mutually exclusive outcomes are not automatically equally likely.'],
 ['experiment','sample space','event','equally likely outcomes','0≤P≤1','relative frequency'],
 ['When is favourable/total valid?','Why can 20 coin tosses differ from exactly 10 heads?','What does P(E)=0 mean?','How would you detect that listed outcomes are not equally likely?']
);
D('Mathematics',M,'Predicting What Comes Next: Exploring Sequences and Progressions','iemh108.pdf',
 'Sequences organise patterns by position. The chapter develops rules for predicting terms, especially arithmetic and geometric progressions, and asks students to justify a pattern rather than merely spot one.',
 [C('Sequence','An ordered list in which position matters and a rule connects terms.'),C('Recursive rule','Defines a term from earlier terms, useful for describing how a sequence grows step by step.'),C('Explicit rule','Gives the nth term directly from n.'),C('Arithmetic progression','Consecutive terms differ by a constant d.'),C('Geometric progression','Consecutive non-zero terms have a constant ratio r.')],
 ['Calculate first differences or ratios before naming the pattern.','Write both a verbal rule and an nth-term rule when possible.','Substitute known term numbers into the rule to verify it against multiple terms.'],
 ['Plot term number n against term value for an AP to see a linear pattern.','Use tiles/dots to show a visual sequence and label how each stage grows.'],
 ['Do not assume a pattern is unique from only two or three terms.','In a_n=a+(n-1)d, n=1 must give a.','Do not use an AP formula on a constant-ratio sequence.'],
 ['Recursive tells how to get the next term; explicit tells any term directly.','Difference identifies AP; ratio identifies GP.'],
 ['ordered pattern','nth term','recursive rule','AP common difference','GP common ratio','verify rule'],
 ['How can you test whether a sequence is arithmetic?','Why does n-1 appear in the AP nth-term formula?','What is the advantage of an explicit rule?','Can the first few terms determine only one possible sequence? Explain.']
);
D('Mathematics',M,'Propositions and their Converses','iemh201.pdf',
 'Part II begins with mathematical logic. A proposition has a definite truth value, while a converse reverses the condition and conclusion. The chapter makes counterexamples and proof central to deciding what is actually true.',
 [C('Proposition','A declarative mathematical statement that is either true or false.'),C('Conditional form','“If X, then Y” separates a condition from its consequence.'),C('Converse','The converse of “if X then Y” is “if Y then X”; it must be tested independently.'),C('Counterexample','One valid counterexample is enough to disprove a universal statement.'),C('Proof','A proof is a logical argument that establishes the claim for all cases covered by it.')],
 ['Rewrite a statement in if-then form to see its logical direction.','Construct the converse by swapping hypothesis and conclusion without changing their meaning.','Search for a counterexample before attempting a proof of a suspicious universal statement.'],
 ['Use a two-column box: original proposition on the left, converse on the right, with truth status beneath each.','Draw a geometry example where a theorem is true but its converse needs separate conditions.'],
 ['A true statement does not guarantee a true converse.','Several confirming examples do not prove a universal claim.','A counterexample must satisfy the hypothesis while violating the conclusion.'],
 ['Converse is not the same as negation.','Evidence from examples supports intuition; proof establishes general truth.'],
 ['proposition','if-then form','hypothesis/conclusion','converse','counterexample','proof'],
 ['What is the converse of a given if-then statement?','What makes a counterexample valid?','Why do ten successful examples not constitute proof?','Can a theorem and its converse both be true? Give the logical condition.']
);
D('Mathematics',M,'How Quantities Combine: Understanding Data','iemh202.pdf',
 'This data chapter extends average to weighted situations. Its main lesson is that group size matters: combining summaries correctly requires recovering the total contribution of each group.',
 [C('Mean','The arithmetic mean represents equal sharing or balance: total of values divided by number of values.'),C('Weighted mean','Values with different weights contribute in proportion to those weights.'),C('Combining groups','A combined mean depends on each group’s size, so averaging two group means directly is usually wrong.'),C('Data display','Graphs and proportional displays summarise information but must preserve scale and denominator meaning.')],
 ['Convert each group mean back to a group total using mean×count.','Add totals and counts, then divide total contribution by total weight.','For graphs, identify what each axis/bar/segment represents before comparing.'],
 ['Draw a balance model with repeated values to show why a larger group pulls the combined mean more strongly.','Use stacked bars to compare proportions only after defining a common whole.'],
 ['Do not average averages unless group sizes are equal.','Keep track of units and denominators.','A mean can hide spread and unequal distributions.'],
 ['Simple mean gives equal weight to observations; weighted mean allows unequal importance or group size.','Percentage and absolute count answer different questions.'],
 ['mean as total/count','weighted average','combine totals','group size','graph denominator','variation hidden by average'],
 ['Why is (mean A + mean B)/2 usually wrong for unequal groups?','How can you reconstruct a total from a mean?','What information does a mean hide?','When is an unweighted average of group means valid?']
);
D('Mathematics',M,'The World of Algorithms','iemh203.pdf',
 'An algorithm is a finite, precise procedure for accomplishing a task. NCERT connects familiar written arithmetic with computational thinking, then asks whether procedures are unambiguous, correct and efficient.',
 [C('Algorithm','A sequence of well-defined steps that accepts input, performs a process and terminates with an output.'),C('Tracing','Following the steps by hand on chosen inputs exposes hidden assumptions and errors.'),C('Correctness','A procedure must produce the intended result for every input in its stated domain, not just examples tested.'),C('Efficiency','Two correct algorithms can differ greatly in number of operations or time required.'),C('Euclidean idea','Repeated remainders reduce the gcd problem while preserving the greatest common divisor.')],
 ['Write each step so another person could execute it without guessing.','Trace normal, boundary and unusual inputs.','For gcd, repeatedly replace (a,b) by (b,a mod b) until the remainder is zero.'],
 ['Represent an algorithm as numbered steps or a flow diagram with decisions and repeated loops.','Trace a small table with columns for current a, b and remainder in Euclid’s algorithm.'],
 ['Avoid vague instructions such as “continue as needed” without a stopping condition.','An algorithm that works for one example is not proven correct.','Efficiency matters more as input size grows.'],
 ['Algorithm versus formula: a formula expresses a relationship; an algorithm specifies a process.','Correctness and efficiency are separate properties.'],
 ['finite steps','unambiguous instructions','input/output','trace','termination','correctness','efficiency'],
 ['What makes a procedure an algorithm?','Why must an algorithm have a stopping condition?','How does tracing help debug a process?','Why does Euclid’s algorithm reduce the problem without changing the gcd?']
);
D('Mathematics',M,'Quadrilaterals','iemh204.pdf',
 'The chapter classifies four-sided figures through properties and develops theorem-converse reasoning for parallelograms, diagonals and midpoints. Shape appearance is never enough - properties provide the proof.',
 [C('Quadrilateral','A four-sided polygon whose interior angles total 360°.'),C('Parallelogram','Both pairs of opposite sides are parallel, leading to equal opposite sides and angles and bisecting diagonals.'),C('Tests for parallelogram','Converse results allow sufficient conditions such as equal opposite sides or diagonals bisecting each other to prove a quadrilateral is a parallelogram.'),C('Midpoint theorem','The segment joining midpoints of two sides of a triangle is parallel to the third side and half its length.'),C('Tiling connection','Angle and side structure explains why quadrilaterals can fit around points in useful tessellations.')],
 ['Translate givens into marked diagram facts.','Select a property or converse whose conditions match the givens.','Use parallel-line angle relations and triangle congruence when a direct quadrilateral theorem is not enough.'],
 ['Draw a parallelogram with both diagonals and mark equal half-diagonals.','Inside a triangle, connect two side midpoints and mark the parallel third side.'],
 ['Do not assume a slanted four-sided figure is a parallelogram.','A property of rectangles or rhombi may not hold for every parallelogram.','State why a converse applies.'],
 ['A property starts from “is a parallelogram”; a test/converse can prove “is a parallelogram”.','Diagonals of a parallelogram bisect each other, but are not generally equal.'],
 ['angle sum 360°','parallelogram properties','converse tests','diagonal bisection','midpoint theorem'],
 ['Which diagonal fact proves a quadrilateral is a parallelogram?','Why are equal diagonals not a universal parallelogram property?','How does the midpoint theorem connect length and parallelism?','What information is sufficient to classify a quadrilateral?']
);
D('Mathematics',M,'Two Variables, One Line','iemh205.pdf',
 'A linear equation in two variables represents an entire set of ordered-pair solutions and therefore a line on the coordinate plane. The chapter goes further to pairs of linear equations, where their common solution is the intersection of two lines.',
 [C('Linear equation in two variables','An equation such as ax+by=c with a and b not both zero.'),C('Solution','Any ordered pair satisfying the equation is a solution; one equation usually has infinitely many solutions.'),C('Graph','Plotting solution pairs produces a straight line.'),C('Pair of equations','A common solution must satisfy both equations simultaneously and appears as an intersection point.'),C('Consistency','Two lines may intersect once, be parallel with no common solution, or coincide with infinitely many common solutions.')],
 ['Generate at least two accurate solution pairs to draw each line.','For a pair, solve algebraically or graphically, then substitute the candidate into both equations.','Interpret the intersection in the original context, including units and feasibility.'],
 ['Draw examples of intersecting, parallel and coincident line pairs.','Use a value table beside each plotted line to connect algebraic and graphical solutions.'],
 ['A point that lies on only one line is not a solution to the pair.','Graphical answers may be approximate if the intersection is not on grid lines.','Check contextual restrictions such as non-negative quantities.'],
 ['One linear equation gives a line of solutions; a pair asks for common solutions.','Parallel distinct lines mean no solution, coincident lines mean infinitely many.'],
 ['ax+by=c','ordered-pair solution','straight-line graph','intersection','consistency','substitution check'],
 ['Why does one equation in two variables have many solutions?','What does an intersection point mean algebraically?','How can you detect no solution from the graph?','Why should a graphically read solution be substituted back?']
);
D('Mathematics',M,'Math of Space: Surface Area and Volume','iemh206.pdf',
 'This chapter measures three-dimensional solids through their exposed surfaces and occupied space. Nets and cross-sections help distinguish lateral/curved area from total area and prevent formula-only mistakes.',
 [C('Surface area','Measures two-dimensional material covering the boundary of a solid, so units are squared.'),C('Volume','Measures three-dimensional space occupied, so units are cubed.'),C('Net','Unfolding a solid into plane faces makes total surface area visible as a sum of component areas.'),C('Curved versus total area','Curved/lateral area omits bases; total surface area includes every exposed face required by the situation.'),C('Composite solids','Complex objects can be decomposed, but joined/internal surfaces must not be counted as exposed area.')],
 ['Sketch the solid and mark radius, height, slant height or edge lengths.','Decide whether the question asks material, capacity or occupied volume.','For composite solids, add volumes but subtract hidden contact surfaces from external surface calculations.'],
 ['Draw nets of cube/cuboid and cylinder.','Use a cross-section of cone/sphere/cylinder to clarify radius and height before substitution.'],
 ['Do not mix square and cubic units.','For a cone, slant height and vertical height serve different formulas.','Do not count a joined internal face as exposed surface.'],
 ['Capacity is a volume idea; covering/painting is a surface-area idea.','CSA/LSA excludes base faces; TSA includes them.'],
 ['surface vs volume','nets','CSA/LSA/TSA','cuboid/cylinder/cone/sphere','composite solids','unit check'],
 ['How do units distinguish area from volume?','When should base circles be omitted from cylinder area?','Why can volumes be added even when contact surfaces disappear?','How would you check whether a cone formula requires h or l?']
);

const S='Exploration · Textbook of Science for Grade 9';
D('Science',S,'Exploration: Entering the World of Secondary Science','iesc101.pdf',
 'The opening chapter is about how science builds reliable knowledge. Observation becomes measurement, complex reality is simplified through models, patterns are represented with symbols and equations, and explanations remain open to revision when evidence improves.',
 [C('Observation and inference','An observation records what is detected or measured; an inference is an interpretation built from observations.'),C('Scientific model','A model deliberately simplifies a system so selected features can be studied, predicted or tested.'),C('Measurement','Quantitative evidence requires a defined quantity, unit and suitable measuring method.'),C('Hypothesis and testing','A useful hypothesis makes a claim that evidence can support, refine or challenge.'),C('Evidence and revision','Scientific explanations gain strength from repeatable evidence but can be changed when new evidence reveals limits.')],
 ['Start with a focused investigable question.','Identify what will be changed, measured and controlled.','Collect enough measurements to reveal a pattern, then choose a table, graph or model that represents it honestly.','State a conclusion at the strength supported by the evidence, including limitations.'],
 ['Draw a model of a projectile as a point moving along a path, then list what real-world details the model ignores.','Use a simple variables table with independent, dependent and controlled quantities.'],
 ['Do not call an explanation an observation.','A model is useful because it simplifies, not because it copies reality perfectly.','A graph should show measured evidence, not a desired trend.'],
 ['Observation describes; inference explains.','Accuracy is closeness to a true/reference value, while precision concerns repeatability or resolution.'],
 ['question → model → measure → represent → test → revise','variables','units','evidence','limitations'],
 ['Why do scientists simplify complex situations?','What makes a question investigable?','How can repeated measurements change confidence in a conclusion?','When should a scientific model be revised?']
);
D('Science',S,'Cell: The Building Block of Life','iesc102.pdf',
 'Cells are the basic structural and functional units of living organisms. The chapter links microscopy with cell organisation and explains why structures such as membranes, nuclei and organelles are suited to particular jobs.',
 [C('Cell theory','Living organisms are made of cells, and cells are fundamental units of organisation and function.'),C('Cell boundary','The plasma membrane regulates exchange; plant cells also have a rigid cell wall that supports shape.'),C('Genetic control','The nucleus contains genetic material and coordinates many cellular activities.'),C('Organelles','Structures such as mitochondria, chloroplasts, vacuoles and endomembrane components carry specialised functions.'),C('Specialisation','Cell shape, internal structures and abundance of organelles reflect the work a cell performs.')],
 ['When comparing cells, connect each structural difference to function.','For microscopy, distinguish specimen size from image magnification and label what is actually visible.','Trace movement of a substance across a membrane by asking what drives the movement and whether the membrane permits it.'],
 ['Draw side-by-side plant and animal cells with only structures the chapter expects, then annotate function.','Sketch a specialised cell and highlight the adaptations that make its function efficient.'],
 ['Do not say every cell contains every organelle.','Cell wall and cell membrane are different structures with different roles.','A bigger image does not mean the actual cell is bigger.'],
 ['Prokaryotic and eukaryotic cells differ in internal organisation.','Plant and animal cells share many structures but differ in cell wall, plastids and typical vacuole arrangement.'],
 ['cell theory','membrane','nucleus','organelles','plant vs animal','specialisation'],
 ['Why is the membrane essential even when a cell has a wall?','How does structure support function in one specialised cell?','What information can a microscope image provide, and what can it not?','Which features distinguish plant and animal cells?']
);
D('Science',S,'Tissues in Action','iesc103.pdf',
 'Multicellular organisms organise specialised cells into tissues. Plant tissues emphasise growth, transport and support, while animal tissues emphasise protection, movement, transport and coordination.',
 [C('Tissue','A group of cells organised to perform a shared function.'),C('Plant growth tissue','Meristematic tissue contains actively dividing cells and enables growth at specific regions.'),C('Permanent plant tissues','Differentiated tissues perform functions such as storage, support and transport.'),C('Animal tissues','Epithelial, connective, muscular and nervous tissues have distinct structural patterns and roles.'),C('Division of labour','Specialisation lets different tissues cooperate so the whole organism performs complex functions efficiently.')],
 ['Identify tissue first by its function and location, then use cell structure to justify the identification.','For plant transport, keep xylem and phloem roles distinct.','For muscle and nerve questions, describe the sequence from signal to response rather than naming tissues only.'],
 ['Draw a plant stem/root region showing where growth tissue occurs.','Make a comparison table of animal tissue type, structural feature, location and function.'],
 ['Do not treat every supporting tissue as identical.','Xylem and phloem transport different materials and have different cell organisation.','A tissue is not simply “many cells”; organisation and shared function matter.'],
 ['Meristematic tissue remains actively dividing; permanent tissue is differentiated.','Structure-function evidence is stronger than recognising a diagram by appearance alone.'],
 ['specialisation','meristem','permanent tissue','xylem/phloem','epithelial/connective/muscle/nervous'],
 ['Why do plants keep meristematic regions?','How can structure distinguish xylem from phloem?','Why is blood considered a tissue?','How do tissues create division of labour?']
);
D('Science',S,'Describing Motion Around Us','iesc104.pdf',
 'Motion is described relative to a reference using position, displacement, velocity and acceleration. Graphs and equations convert a changing physical situation into a model that can be interpreted and checked.',
 [C('Reference and position','Motion has meaning only relative to a chosen reference point or coordinate direction.'),C('Distance and displacement','Distance is total path length; displacement is the directed change from initial to final position.'),C('Speed and velocity','Speed is rate of distance; velocity includes direction and relates to displacement.'),C('Acceleration','Acceleration measures rate of change of velocity.'),C('Graphs and equations','Slope and area connect graphs to physical quantities; constant-acceleration equations apply only under their assumptions.')],
 ['Choose a positive direction and keep signs consistent.','Translate words into known quantities u, v, a, t and s before selecting an equation.','Use graph slope to reason physically, not just calculate.'],
 ['On a position-time graph, compare horizontal, steep straight and curved segments.','On a velocity-time graph, shade area under the curve to represent displacement.'],
 ['Average speed and magnitude of average velocity need not match.','Zero velocity at an instant does not necessarily mean zero acceleration.','Do not use constant-acceleration equations when acceleration varies.'],
 ['Distance is scalar, displacement is directed.','Uniform speed in circular motion still means changing velocity because direction changes.'],
 ['reference frame','distance/displacement','speed/velocity','acceleration','graph slope/area','constant-acceleration equations'],
 ['Can displacement be zero while distance is non-zero?','What does slope of a position-time graph mean?','When are v=u+at and related equations valid?','Why is circular motion accelerated at constant speed?']
);
D('Science',S,'Exploring Mixtures and their Separation','iesc105.pdf',
 'Mixtures retain component identities and can often be separated by exploiting physical-property differences. The chapter compares solutions, suspensions and colloids and links each separation method to why it works.',
 [C('Mixture','Two or more substances combined physically with variable composition.'),C('Solution','A homogeneous mixture whose dispersed particles are molecular/ionic scale and do not settle.'),C('Suspension and colloid','Suspensions have larger particles that can settle; colloids remain dispersed and show different light-scattering behaviour.'),C('Separation principle','Filtration, crystallisation, distillation, chromatography, centrifugation, sublimation and related methods work because components differ in size, solubility, boiling point, density or affinity.'),C('Concentration','Percentage composition describes amount of solute relative to solution using a stated mass/volume basis.')],
 ['Identify mixture type and component properties before naming a method.','Explain the property difference that makes the method successful.','For multi-component mixtures, plan a sequence that separates one component without destroying later options.'],
 ['Create a decision tree: particle size → solubility → boiling point → other property.','Draw solution, colloid and suspension particle pictures at conceptual scale.'],
 ['Do not select filtration for a dissolved solute.','Evaporation and boiling are not the same process.','Always state the denominator in a percentage concentration.'],
 ['Homogeneous/heterogeneous describes uniformity; pure/mixture describes composition.','Crystallisation can purify a solid more selectively than evaporating all solvent.'],
 ['solution/suspension/colloid','physical property','separation method','solubility','boiling point','concentration'],
 ['Why can salt solution pass through filter paper unchanged?','Which property does distillation exploit?','How would you separate an insoluble solid from a dissolved solid in water?','What does 5% m/v mean?']
);
D('Science',S,'How Forces Affect Motion','iesc106.pdf',
 'Forces explain changes in motion through the net force. Newton’s laws connect inertia, acceleration and interaction pairs, allowing motion to be predicted from a clear force picture.',
 [C('Force and net force','Force has magnitude and direction; the vector sum determines acceleration.'),C('Inertia','Newton’s first law describes persistence of rest or uniform straight-line motion when net external force is zero.'),C('Second law','Acceleration is in the direction of net force and depends on force relative to mass.'),C('Third law','Interaction forces occur in equal-and-opposite pairs on different objects.'),C('Friction','Friction is a contact interaction that resists relative motion or tendency to move between surfaces.')],
 ['Choose the object/system and draw only forces acting on it.','Resolve direction and calculate the net force before using F=ma.','For third-law pairs, name both interacting objects to avoid cancelling forces on different bodies.'],
 ['Draw free-body sketches for a pushed box at rest, accelerating and moving at constant velocity.','Draw an interaction pair with arrows on two different objects.'],
 ['Action-reaction forces do not cancel on one object because they act on different objects.','Motion does not require a forward net force when velocity is already constant.','Do not confuse mass with weight.'],
 ['Balanced forces mean zero net force, not necessarily zero individual forces.','Mass measures inertia; weight is a gravitational force.'],
 ['net force','inertia','F=ma','action-reaction pair','friction','system choice'],
 ['Can an object move when net force is zero?','Why do third-law forces not cancel in one free-body diagram?','How does doubling mass affect acceleration for the same net force?','What is the difference between mass and weight?']
);
D('Science',S,'Work, Energy, and Simple Machines','iesc107.pdf',
 'Work and energy provide a powerful alternative way to analyse motion. The chapter connects force through displacement to energy changes, conservation, power and the force-distance trade-offs made by simple machines.',
 [C('Mechanical work','Work involves a force component acting through displacement; direction matters.'),C('Kinetic energy','Energy associated with motion depends on mass and the square of speed.'),C('Potential energy','Gravitational potential energy represents energy associated with height in a gravitational field.'),C('Energy conservation','Energy can transfer or transform; in an ideal isolated system total energy is conserved.'),C('Power and machines','Power is rate of energy transfer; simple machines can reduce effort by increasing distance or changing force direction.')],
 ['Choose the system and identify initial/final energy forms.','If losses are negligible, set total mechanical energy before equal to after.','For machines, compare load and effort while recognising that ideal work input and output are related.'],
 ['Draw an energy bar chart for an object falling from height.','Sketch lever, pulley and inclined plane with load, effort and distances labelled.'],
 ['A person can exert force without doing mechanical work if there is no displacement.','Power is not the same as energy.','A machine does not create energy.'],
 ['Work is a transfer mechanism; energy is a stored/state quantity.','Mechanical advantage can exceed 1 even though energy is conserved.'],
 ['W=Fs for aligned force','KE','PE','conservation','power','mechanical advantage'],
 ['When is force present but work zero?','Why does speed have a squared effect on kinetic energy?','How can a machine reduce force without creating energy?','What is the difference between energy and power?']
);
D('Science',S,'Journey Inside the Atom','iesc108.pdf',
 'Atomic models changed as experiments revealed new evidence. The chapter follows that historical reasoning into modern school-level structure: nucleus, electrons, shells, atomic number, mass number, valency, isotopes and isobars.',
 [C('Model development','Thomson, Rutherford and Bohr models addressed different evidence and limitations.'),C('Subatomic particles','Protons and neutrons are concentrated in the nucleus; electrons occupy regions/energy levels around it.'),C('Atomic number','The number of protons defines the element; a neutral atom has equal proton and electron counts.'),C('Mass number','Protons plus neutrons give mass number for a nuclide.'),C('Isotopes and isobars','Isotopes share atomic number but differ in neutron count; isobars share mass number but are different elements.')],
 ['For a nuclide, start with Z=protons, then use A-Z for neutrons.','Explain model changes by pairing experimental observation with the inference it forced.','Use outer-electron arrangement to reason about simple valency.'],
 ['Draw a timeline of atomic models with “evidence solved” and “limitation”.','Use a nucleus-shell diagram only as a model, not a literal scale picture.'],
 ['Atomic number is not total particles.','Isotopes are the same element, isobars are not.','A model diagram is not a photograph of an atom.'],
 ['Atomic number identifies element; mass number identifies a particular nuclide.','Neutrality concerns protons and electrons, not neutrons.'],
 ['proton/neutron/electron','Z and A','model evidence','electron arrangement','valency','isotopes/isobars'],
 ['How did scattering evidence challenge an earlier atomic model?','How many neutrons are in a nuclide with A=23 and Z=11?','Why are isotopes chemically similar?','What makes two atoms isobars?']
);
D('Science',S,'Atomic Foundations of Matter','iesc109.pdf',
 'This chapter moves from atomic structure to how matter is represented and quantified. Chemical formulae encode fixed ratios, while relative masses let invisible particles be compared numerically.',
 [C('Element, atom and molecule','Chemical symbols represent elements and formulas represent definite collections/ratios of atoms.'),C('Compound composition','A compound has constituent elements in a fixed proportion, and its properties can differ sharply from those elements.'),C('Conservation','Physical and chemical changes obey conservation of mass in a closed system.'),C('Formula interpretation','Subscripts state numbers/ratios of atoms in a formula unit or molecule.'),C('Relative mass','Relative atomic masses combine to give formula or molecular mass for quantitative comparison.')],
 ['Read a formula element by element and count atoms explicitly.','Use valency/charge balance carefully when constructing simple formulas.','Check whether a claimed change preserves total atoms/mass conceptually.'],
 ['Make particle diagrams for element, mixture and compound.','Annotate H₂O or another simple formula to show what coefficients and subscripts would mean in different contexts.'],
 ['Do not change a subscript to balance a chemical equation because that changes the substance.','A mixture and compound are not distinguished by whether both contain multiple elements.','Relative mass is a comparison scale, not the actual mass in grams of one atom.'],
 ['Atom is a particle of an element; molecule/formula unit can contain multiple atoms.','Mixture composition can vary; compound composition is fixed.'],
 ['symbols/formulas','fixed composition','conservation','subscripts','relative atomic/molecular mass'],
 ['What information does a chemical formula encode?','Why can a compound have different properties from its elements?','How do you count total atoms in a formula?','Why must subscripts not be changed during equation balancing?']
);
D('Science',S,'Sound Waves: Characteristics and Applications','iesc110.pdf',
 'Sound begins with vibration and travels through a material medium as a wave. Frequency, amplitude, wavelength and speed describe the wave, while reflection and frequency range explain many everyday and technological applications.',
 [C('Production and medium','A vibrating source disturbs nearby particles; the disturbance transfers energy through a medium.'),C('Frequency and pitch','Frequency is oscillations per second and strongly influences perceived pitch.'),C('Amplitude and loudness','Amplitude is related to disturbance strength and perceived loudness, though hearing is a biological response.'),C('Wave relation','Wave speed equals frequency times wavelength for a given wave in a medium.'),C('Reflection and hearing','Sound can reflect to form echoes; the ear converts pressure variations into neural signals.')],
 ['Identify source, medium and receiver in a sound situation.','Use v=fλ with consistent units and distinguish which quantity changes across media.','For echo problems, remember measured time often covers outward and return travel.'],
 ['Draw compressions/rarefactions along a longitudinal wave and label wavelength.','Sketch an ear pathway at the level expected by the chapter.'],
 ['Sound cannot propagate through a vacuum.','High pitch does not mean high loudness.','Do not confuse frequency with wave speed.'],
 ['Pitch mainly tracks frequency; loudness relates to amplitude/intensity.','Frequency is set by source; speed depends strongly on medium conditions.'],
 ['vibration','medium','frequency/pitch','amplitude/loudness','v=fλ','reflection/echo'],
 ['Why is there no sound in a vacuum?','What changes when pitch rises?','How is wavelength related to frequency at fixed speed?','Why is echo distance based on half the total travel path?']
);
D('Science',S,'Reproduction: How Life Continues','iesc111.pdf',
 'Reproduction maintains continuity of species. The chapter compares asexual and sexual strategies and connects reproductive structures, gametes, fertilisation and development to variation across generations.',
 [C('Asexual reproduction','One parent can produce offspring genetically very similar to the parent through processes such as vegetative propagation or other non-gamete mechanisms.'),C('Sexual reproduction','Gametes from two reproductive contributions combine, mixing inherited information and increasing variation.'),C('Plants','Flowers contain structures involved in gamete formation, pollination, fertilisation and seed/fruit development.'),C('Humans/animals','Reproductive organs produce gametes and support fertilisation and development; puberty reflects maturation of reproductive systems.'),C('Variation','Sexual reproduction reshuffles inherited information, creating variation on which long-term evolutionary processes can act.')],
 ['Use process order: gamete formation → transfer/meeting → fertilisation → development.','Compare reproductive modes by number of parents, gametes and variation, not by “better/worse”.','Discuss reproductive health scientifically and with precise biological terms.'],
 ['Draw a simplified flower and follow pollen to fertilisation.','Use a flow diagram comparing asexual and sexual reproduction.'],
 ['Reproduction is essential for species continuity, not for an individual organism’s immediate survival.','Do not equate “asexual” with “no cell division”.','Variation does not mean every trait is advantageous.'],
 ['Growth increases/changes an individual; reproduction produces new individuals.','Asexual reproduction usually preserves more parental similarity than sexual reproduction.'],
 ['asexual vs sexual','gametes','fertilisation','plant reproduction','human reproductive biology','variation'],
 ['Why does sexual reproduction generally create more variation?','What is the role of fertilisation?','How is vegetative propagation different from seed formation?','Why is reproduction a population/species-level continuity process?']
);
D('Science',S,'Patterns in Life: Diversity and Classification','iesc112.pdf',
 'Biodiversity is organised through classification so similarities, differences and relationships can be studied systematically. The chapter uses cellular organisation, nutrition and body plan to group life while also stressing conservation and ecological roles.',
 [C('Biodiversity','The variety of living organisms, genes and ecological forms supports ecosystem functioning.'),C('Classification criteria','Cell type, number of cells, organisation, nutrition and reproduction provide useful grouping evidence.'),C('Kingdom-level framework','Broad groups distinguish major organisational strategies among living organisms.'),C('Taxonomic hierarchy','Nested categories move from broad groups toward species, and binomial nomenclature gives a standard two-part scientific name.'),C('Viruses','Viruses are acellular entities with unusual dependence on host cells, so they do not fit ordinary cellular classification neatly.')],
 ['Start classification from observable/defined criteria rather than memorised examples.','Move from broad category to narrower one and state the feature used at each step.','Connect biodiversity examples to habitat and ecological function.'],
 ['Build a branching key using cell type, cell number and nutrition.','Draw the hierarchy as nested boxes from kingdom toward species.'],
 ['Do not treat classification categories as based on one superficial feature.','Scientific names follow formatting conventions.','Virus is not simply another unicellular organism.'],
 ['Classification organises diversity; evolution explains relationships and change over time.','Binomial name has genus and species components with different capitalisation conventions.'],
 ['biodiversity','classification criteria','kingdom framework','taxonomic hierarchy','binomial nomenclature','viruses'],
 ['Why is classification useful?','Which criteria separate major organism groups?','How does a scientific name reduce ambiguity?','Why are viruses difficult to place with cellular organisms?']
);
D('Science',S,'Earth as a System: Energy, Matter, and Life','iesc113.pdf',
 'Earth works as interacting spheres linked by energy flow and matter cycling. Uneven solar heating drives atmospheric and oceanic processes, while water, carbon, oxygen and nitrogen move among air, water, rock, ice and life.',
 [C('Earth spheres','Atmosphere, hydrosphere, geosphere, cryosphere and biosphere interact rather than operating independently.'),C('Energy flow','Solar radiation is the main surface-system energy input; unequal heating creates gradients that drive circulation.'),C('Matter cycles','Water and biogeochemical cycles transfer matter among reservoirs while matter is conserved overall.'),C('Energy balance','Reflection, absorption and greenhouse processes influence how much energy remains in the Earth system.'),C('Human influence','Land clearing, greenhouse-gas emissions and other changes can alter transfers and feedbacks across several spheres.')],
 ['For any environmental change, identify the first sphere affected and trace at least two cross-sphere consequences.','Separate energy flow from matter cycling: energy changes form and ultimately disperses, while matter moves among reservoirs.','Use causal arrows and feedback loops to avoid isolated fact lists.'],
 ['Draw an Earth-systems diagram with arrows for water, carbon and energy.','Create a cause chain from reduced snow/ice to albedo change and additional warming.'],
 ['Do not treat atmosphere, oceans and life as independent topics.','Weather events and climate trends operate on different time scales.','A feedback can amplify or reduce a change; it is not automatically positive in the everyday sense.'],
 ['Energy flows through the system; matter cycles within/between reservoirs.','Greenhouse effect is a physical process; enhanced greenhouse warming concerns changes in greenhouse-gas concentrations.'],
 ['spheres','solar energy','uneven heating','matter cycles','albedo/greenhouse','feedback','human influence'],
 ['How can a forest change affect a river?','Why does uneven solar heating matter for circulation?','What is the difference between energy flow and matter cycling?','Give one cross-sphere feedback and trace its steps.']
);

const E='Kaveri · English for Grade 9';
D('English',E,'How I Taught My Grandmother to Read · Bharat Our Land','iebe101.pdf',
 'Unit 1 joins a story about an elderly learner’s determination with a poem about belonging to a diverse country. Together they ask what literacy enables and how individual dignity connects with community and national identity.',
 [C('Literacy and agency','The grandmother’s wish to read independently turns literacy into dignity and practical freedom, not merely school attainment.'),C('Role reversal','The younger narrator becomes a teacher, showing that learning can move across generations in both directions.'),C('Persistence','Age is presented as a challenge that can be met through motivation, regular effort and respect.'),C('Belonging','The paired poem treats the land and its diversity as a shared inheritance, linking identity with responsibility rather than uniformity.')],
 ['For the prose, track how the grandmother’s goal changes the relationship between learner and teacher.','For the poem, identify images of place and diversity, then explain how they build the larger idea of belonging.','In a comparison answer, connect personal independence in the story with collective responsibility in the poem.'],
 ['Map the story as motivation → learning process → achievement → changed self-image.','Create an image bank from the poem: land, people, diversity and shared identity, then attach an effect to each.'],
 ['Do not retell every event in the story.','Explain why literacy matters to the character, not only that she learns to read.','For poetry, name an image only if you explain its contribution to tone or theme.'],
 ['Theme is the larger idea developed by the text; plot is the sequence of events.','Patriotism in analysis should be tied to the poem’s language and ideas, not generic praise.'],
 ['literacy as independence','intergenerational learning','determination','dignity','diversity','belonging and responsibility'],
 ['What motivates the grandmother to learn?','How does the role reversal affect the relationship?','Which poetic images construct a sense of shared land?','What idea connects personal dignity and national belonging?'],
 {vocabulary:['protagonist','community','literacy','determination','belonging']}
);
D('English',E,'The Pot Maker · Gifts of Grace: Honouring Our Vocations','iebe102.pdf',
 'Unit 2 centres skilled work. Sentila’s desire to learn pottery despite family expectations makes craft knowledge, choice and apprenticeship central, while the paired text broadens the discussion to dignity across vocations.',
 [C('Sentila’s aspiration','Her persistence shows that vocation can be rooted in genuine aptitude and interest rather than expectations assigned by others.'),C('Craft knowledge','Pottery requires learned judgement, practice and inherited technique; handmade work is presented as knowledge-rich, not primitive.'),C('Economic tension','The mother’s reluctance is connected with hardship and limited reward, adding material reality to the idea of following a craft.'),C('Dignity of labour','The paired text invites respect for different forms of useful work and the contributions people make to a community.')],
 ['Analyse conflict as competing concerns: Sentila’s aspiration versus her mother’s experience of insecure craft livelihood.','Use details of learning-by-doing to explain why skill cannot be reduced to a machine-made/manual binary.','Compare vocation as personal calling with vocation as social contribution.'],
 ['Make a two-column chart: handmade process/knowledge versus machine production, without assuming one is always superior.','Trace Sentila’s character through desire, obstacles, practice and response.'],
 ['Avoid reducing the mother to an “obstacle”; her position has economic and lived reasons.','Do not equate manual labour with lack of knowledge.','Use “dignity of labour” as an argument supported by text, not as a slogan.'],
 ['Skill is acquired competence; vocation is a form of work/calling.','Tradition can preserve expertise while still facing economic pressure and change.'],
 ['craft knowledge','aspiration','family expectation','apprenticeship','livelihood','dignity of labour'],
 ['Why does Sentila hide her interest?','What does the text suggest about how craft skill is learned?','Why might a skilled vocation still be economically difficult?','How does the paired text expand the story’s idea of work?']
);
D('English',E,'Winds of Change · Canvas of Soil','iebe103.pdf',
 'Unit 3 explores change through indigenous craft and the relationship between material culture, land and livelihood. Everyday objects such as hand fans become evidence of local knowledge, design and adaptation.',
 [C('Indigenous craft','Objects emerge from local materials, needs and techniques, carrying knowledge about place and community.'),C('Change and adaptation','Craft traditions respond to new technologies, markets and lifestyles rather than remaining frozen in time.'),C('Material and environment','Choice of leaf, grass, fibre or soil links artistic production directly with local ecology.'),C('Value beyond utility','A handmade object can carry cultural meaning and labour even when a machine-made alternative performs the same basic function.')],
 ['When analysing an object, connect material → technique → function → cultural meaning.','Treat “change” as a process with gains and losses, not automatically progress or decline.','For the paired piece, connect soil/land imagery to livelihood, memory or responsibility.'],
 ['Create a labelled object study of a regional hand fan: material, shape, maker, use and location.','Draw a cause map showing how changing demand can affect artisan livelihood and tradition.'],
 ['Avoid romanticising all traditional work or dismissing all modern production.','Distinguish evidence about the object from assumptions about its maker.','Explain imagery in relation to theme.'],
 ['Indigenous means originating/embedded in a local context, not simply “old”.','Utility is what an object does; cultural value includes meaning, skill and identity.'],
 ['indigenous','craftsperson','material culture','adaptation','land and livelihood','imagery'],
 ['How can a common object reveal local knowledge?','What pressures can change a craft tradition?','Why is material choice part of cultural context?','How does the paired text connect land with human activity?']
);
D('English',E,'Vitamin-M · I Cannot Remember My Mother','iebe104.pdf',
 'Unit 4 places ageing, memory and care beside a poem about remembering a mother through fragments and sensations. It explores what memory preserves, what it loses and how relationships continue through acts of attention.',
 [C('Ageing and care','The prose raises practical and emotional questions about supporting an elderly family member with patience and dignity.'),C('Memory','Forgetting is not treated only as comic inconvenience; it affects independence, family interaction and identity.'),C('Intergenerational responsibility','Care is relational: younger family members must respond to vulnerability without erasing the elder’s agency.'),C('Sensory memory','The poem evokes the mother through remembered impressions rather than a complete factual portrait, showing how absence can remain emotionally present.')],
 ['In prose analysis, separate humour in situation from the serious issue of respect for ageing.','In the poem, group images by sense or emotional association and explain how fragmentary memory creates tone.','Compare memory as a difficulty in the prose with memory as a link to loss in the poem.'],
 ['Make a memory web with sight, sound, smell/touch and emotion for the poem.','Trace how different characters respond to the older person and what those responses reveal.'],
 ['Do not make medical diagnoses from literary characters.','Avoid saying the poem “has no memory” - it shows partial, sensory remembrance.','Support tone claims with specific image types or moments.'],
 ['Remembering information and preserving emotional connection are different kinds of memory.','Care means support with dignity, not control.'],
 ['ageing','care','memory and identity','intergenerational relationship','sensory imagery','loss and presence'],
 ['How does the prose balance humour and concern?','Which kinds of memories remain in the poem?','How does fragmentary imagery affect tone?','What different meanings does “memory” carry across the two texts?']
);
D('English',E,'The World of Limitless Possibilities · Nine Gold Medals','iebe105.pdf',
 'Unit 5 pairs nonfiction about Paralympic achievement with a poem in which athletes redefine victory through solidarity. Both challenge narrow ideas of ability, competition and success.',
 [C('Paralympic achievement','Elite para-sport demonstrates trained skill, resilience and high-performance competition rather than an inspirational exception to ordinary humanity.'),C('Stereotype challenge','The text asks readers to question assumptions about disability and recognise barriers created by attitudes and environments.'),C('Sportsmanship','The poem shifts the meaning of winning from individual medal count to an ethical response among competitors.'),C('Human dignity','Achievement and empathy coexist: respect does not require pity.')],
 ['Use evidence of training, competition and performance when discussing possibility.','In the poem, identify the turning point and explain how collective action changes the expected ending.','Compare “success” as personal excellence with “success” as humane conduct.'],
 ['Create a before/after table for the poem: expected race outcome versus final meaning of victory.','Build a word bank distinguishing resilience, accessibility, inclusion, empathy and pity.'],
 ['Avoid describing disabled athletes through pity or “despite being disabled” clichés.','Do not reduce the poem to “everyone wins”; explain the ethical choice that changes victory.','Separate stereotype from evidence.'],
 ['Empathy recognises another person’s experience; pity can position them as inferior.','Competition tests performance; sportsmanship concerns conduct within competition.'],
 ['Paralympics','resilience','stereotypes','access and inclusion','sportsmanship','redefining victory'],
 ['How does the nonfiction challenge assumptions about disability?','What event changes the poem’s expected outcome?','Why is the final victory moral as well as athletic?','How do the two texts define possibility differently?']
);
D('English',E,'Twin Melodies · A Friend Found in Music','iebe106.pdf',
 'Unit 6 uses music to explore identity, discipline and relationship. Musical learning becomes both a craft requiring sustained practice and a language through which people connect beyond ordinary conversation.',
 [C('Music as practice','Skill grows through attention, repetition, listening and correction, balancing discipline with creativity.'),C('Identity','Musical preferences and performance can express personal and cultural identity.'),C('Connection','Shared music can create friendship and communication where direct speech may be difficult.'),C('Figurative language','The unit’s language work highlights how idioms and figurative expressions communicate meaning beyond literal words.')],
 ['Track each character’s relationship with music: motivation, obstacle, practice and effect.','When an idiom appears, explain the intended contextual meaning rather than its literal image.','Compare music as individual self-expression with music as social bridge.'],
 ['Create a practice-to-performance flow showing feedback and improvement.','Build an idiom table: phrase, literal image, contextual meaning.'],
 ['Do not call every musical reference a metaphor.','A theme claim about friendship should be tied to actions and change.','Do not translate an idiom word-for-word if its conventional meaning differs.'],
 ['Literal meaning describes the surface words; figurative meaning depends on context and convention.','Talent may create potential, but the text emphasises sustained practice and relationship too.'],
 ['music and identity','discipline','creativity','friendship','communication','idiom/figurative language'],
 ['How does practice shape musical ability?','How does music create connection?','What is the difference between literal and figurative meaning?','Which change in a character best supports the unit’s central idea?']
);
D('English',E,'Carrier of Words · Words','iebe107.pdf',
 'Unit 7 examines communication through the physical carrying of messages and through the power of language itself. It invites comparison between communication technology and the human responsibility involved in choosing words.',
 [C('Communication network','Messages require sender, medium/carrier, route and receiver; reliability and access shape who can remain connected.'),C('Service and geography','Communication work can become difficult in remote environments, making infrastructure and human effort visible.'),C('Meaning of words','Words carry denotation, connotation and tone, so the same information can affect people differently depending on phrasing.'),C('Responsibility','Communication is not successful merely because a message arrives - clarity, accuracy and effect matter.')],
 ['For the prose, trace the journey of a message and identify the human/infrastructure challenges involved.','For the poem, select word choices that carry emotional or ethical weight and explain their effect.','Compare physical “carrying” of words with metaphorical weight carried by language.'],
 ['Draw sender → carrier/medium → receiver and annotate possible barriers.','Create a tone ladder by rewriting one message in neutral, warm and harsh language.'],
 ['Do not confuse communication speed with communication quality.','Avoid claiming a word has one fixed effect outside context.','Explain the title at both literal and figurative levels.'],
 ['Denotation is core dictionary meaning; connotation is associated meaning.','Medium transports a message; tone shapes how it is received.'],
 ['sender/medium/receiver','connectivity','service','denotation/connotation','tone','responsible language'],
 ['What challenges can affect communication in remote places?','How can the same idea be expressed with different tones?','Why is “carrier of words” both literal and figurative?','What makes communication effective, not just fast?']
);
D('English',E,'Follow That Dream · Believe in Yourself','iebe108.pdf',
 'Unit 8 frames dreams as goals that require sustained effort, sacrifice and support rather than wishful thinking. A mother’s letter gives practical life guidance, while the paired poem/text explores self-belief as something strengthened by action.',
 [C('Dream versus plan','A dream becomes actionable when translated into deliberate practice, choices and persistence.'),C('Effort and sacrifice','High-level achievement requires repeated work and trade-offs, not confidence alone.'),C('Support system','Parents and community can create opportunity, encouragement and realistic guidance without owning the learner’s goal.'),C('Self-belief','Confidence is most useful when grounded in preparation, reflection and willingness to recover from setbacks.')],
 ['Identify the advice in the letter and connect each piece to a concrete behaviour.','Separate motivational tone from evidence about effort.','Compare external encouragement with internal commitment.'],
 ['Create a goal ladder: dream → long-term target → short-term actions → feedback → adjustment.','Annotate the letter for advice, reason and intended effect.'],
 ['Do not treat self-belief as a substitute for practice.','Avoid generic “never give up” answers; explain what persistence looks like in the text.','Distinguish the writer’s advice from the reader’s own opinion.'],
 ['Dream is aspiration; goal is defined outcome; plan specifies actions.','Confidence without evidence can be fragile, while earned confidence grows from preparation and learning.'],
 ['aspiration','deliberate effort','sacrifice','support','setback','earned confidence'],
 ['What turns a dream into a workable goal?','What role does sacrifice play in the letter’s argument?','How should support differ from pressure?','How does the unit connect belief with action?']
);

const H='गंगा';
D('Hindi',H,'दो बैलों की कथा','ihga101.pdf',
 'प्रेमचंद की यह कहानी पशु-पात्रों के माध्यम से स्वाभिमान, मित्रता, स्वतंत्रता और श्रम से जुड़े मानवीय मूल्यों को उभारती है। हीरा और मोती केवल कथानक आगे बढ़ाने वाले पशु नहीं, बल्कि व्यवहार और संबंधों के माध्यम से नैतिक संवेदनाएँ व्यक्त करते हैं।',
 [C('हीरा और मोती','दोनों बैलों का गहरा साथीपन संकट में एक-दूसरे के प्रति निष्ठा और सहयोग के रूप में सामने आता है।'),C('स्वतंत्रता और स्वाभिमान','बंधन, मार और अन्याय के प्रति उनका प्रतिरोध कहानी को स्वतंत्रता के व्यापक अर्थ से जोड़ता है।'),C('मानवीकरण','लेखक पशुओं की अनुभूति और व्यवहार को मानवीय अर्थ देता है, जिससे पाठक करुणा और न्याय पर विचार करता है।'),C('ग्रामीण जीवन','कहानी श्रम, पशु-मानव संबंध और सामाजिक व्यवहार का ग्रामीण संदर्भ प्रस्तुत करती है।')],
 ['उत्तर में घटनाओं की पूरी सूची न देकर किसी एक घटना को मूल्य या चरित्र-विशेषता से जोड़ें।','हीरा और मोती की समानता के साथ उनके व्यवहार में आने वाले अंतर भी देखें।','मानवीकरण का प्रभाव बताएँ - पाठक पशुओं की पीड़ा और स्वाभिमान को नैतिक प्रश्न की तरह देखता है।'],
 ['हीरा-मोती संबंध मानचित्र बनाएँ: साथ, संकट, प्रतिरोध, वापसी।','कहानी में बंधन और स्वतंत्रता के प्रतीकात्मक प्रसंग अलग रंग से चिन्हित करें।'],
 ['कहानी को केवल “दो बैलों की कहानी” कहकर सार तक सीमित न करें।','पशु-पात्रों पर मानव गुण आरोपित करने के साहित्यिक उद्देश्य को समझाएँ।','चरित्र-विश्लेषण में घटना का प्रमाण दें।'],
 ['कथानक घटना-क्रम है; विषय/केंद्रीय भाव उन घटनाओं से उभरने वाला व्यापक विचार है।','सहानुभूति और दया में अंतर है - कहानी पशुओं को सक्रिय स्वाभिमानी पात्र बनाती है।'],
 ['मित्रता','स्वाभिमान','स्वतंत्रता','श्रम','मानवीकरण','ग्रामीण संदर्भ'],
 ['हीरा और मोती के संबंध को कौन-सी घटना सबसे स्पष्ट करती है?','मानवीकरण कहानी के प्रभाव को कैसे बढ़ाता है?','बंधन का विषय केवल शारीरिक बंधन तक सीमित क्यों नहीं है?','प्रेमचंद पशु-पात्रों के माध्यम से मनुष्य समाज पर क्या प्रश्न उठाते हैं?']
);
D('Hindi',H,'क्या लिखूँ?','ihga102.pdf',
 'पदुमलाल पुन्नालाल बख्शी का निबंध लेखन और रचना-प्रक्रिया पर आत्मचिंतन करता है। लेखक विषय खोजने की उलझन से शुरू करके दिखाता है कि साहित्यिक लेखन अनुभव, अवलोकन, विचार और भाषा के चयन से बनता है।',
 [C('रचना-प्रक्रिया','लेखन एक यांत्रिक काम नहीं; विषय, अनुभव, दृष्टि और अभिव्यक्ति के बीच संबंध बनाना पड़ता है।'),C('आत्मचिंतन','लेखक अपनी ही दुविधा को निबंध का विषय बनाकर विचार और लेखन की प्रक्रिया पाठक के सामने खोलता है।'),C('निबंध की स्वतंत्रता','निबंध व्यक्तिगत स्वर, तर्क और प्रसंगों के माध्यम से विचार विकसित कर सकता है।'),C('भाषा-शैली','विनोद, संवादात्मकता और चिंतनशील स्वर गंभीर प्रश्न को सहज बनाते हैं।')],
 ['शीर्षक “क्या लिखूँ?” को केवल प्रश्न न मानें, यह रचना की दुविधा और निबंध की संरचना दोनों बनाता है।','लेखक के उदाहरणों को इस बात से जोड़ें कि वे विचार कैसे विकसित करते हैं।','शैली पर उत्तर देते समय विनोद/आत्मपरकता का प्रभाव भी बताएँ।'],
 ['विषय खोज → विचार → उदाहरण → आत्मचिंतन → निष्कर्ष का प्रवाह-चित्र बनाएँ।','निबंध से विचारात्मक और विनोदी स्वर वाले प्रसंग अलग पहचानें।'],
 ['लेखक-परिचय को उत्तर का मुख्य भाग न बनाएं।','“हास्य है” लिखकर न रुकें, बताएं कि इससे पाठ अधिक आत्मीय या प्रभावी कैसे बनता है।','निबंध और कहानी की विधागत अपेक्षाएँ न मिलाएँ।'],
 ['निबंध विचार-प्रधान हो सकता है, जबकि कहानी में कथानक और पात्र का संगठन अलग तरह से प्रमुख होता है।','विषय और दृष्टिकोण अलग हैं - साधारण विषय भी विशिष्ट दृष्टि से प्रभावी बन सकता है।'],
 ['रचना-प्रक्रिया','विषय चयन','आत्मचिंतन','निबंध शैली','विनोद','लेखकीय दृष्टि'],
 ['शीर्षक निबंध की संरचना कैसे बनाता है?','लेखक अपनी दुविधा को साहित्यिक सामग्री में कैसे बदलता है?','विनोदी शैली का क्या प्रभाव है?','रचनात्मक लेखन में अनुभव और दृष्टि की क्या भूमिका है?']
);
D('Hindi',H,'संवादहीन','ihga103.pdf',
 'शेखर जोशी की कहानी ग्रामीण वृद्ध स्त्री के अकेलेपन और मनुष्यों के बीच संवाद टूटने की पीड़ा को केंद्र में लाती है। कहानी दिखाती है कि भौतिक निकटता के बावजूद भावनात्मक दूरी व्यक्ति को अलग-थलग कर सकती है।',
 [C('अकेलापन','वृद्ध स्त्री की स्थिति केवल उम्र का परिणाम नहीं, बल्कि संबंधों और संवाद की कमी से गहरी होती है।'),C('संवादहीनता','शीर्षक उस मौन को रेखांकित करता है जिसमें लोग साथ होते हुए भी एक-दूसरे की अनुभूति तक नहीं पहुँचते।'),C('ग्रामीण-शहरी परिवर्तन','बदलते सामाजिक संबंध और जीवन-व्यवस्था पुराने सहारे कमजोर कर सकते हैं।'),C('संवेदनशील यथार्थ','लेखक अतिनाटकीयता से बचकर साधारण प्रसंगों में गहरी मानवीय पीड़ा दिखाता है।')],
 ['पात्र की स्थिति को “वृद्ध है इसलिए अकेली है” जैसे सरल कारण से न समझें; संबंधों का ढाँचा देखें।','शीर्षक का अर्थ कथा की घटनाओं और मौन/अनकहे भाव से जोड़ें।','लेखक के संयमित वर्णन से उत्पन्न करुणा का प्रभाव समझाएँ।'],
 ['पात्र-संबंध मानचित्र में “बात होती है” और “सच्चा संवाद होता है” को अलग दिखाएँ।','कहानी के आरंभ और अंत में वृद्ध स्त्री की भावनात्मक स्थिति की तुलना करें।'],
 ['अकेलेपन को केवल भौतिक एकांत समझना।','कहानी का संदेश सामान्य नैतिक उपदेश में बदल देना।','शीर्षक-व्याख्या में कथात्मक प्रमाण न देना।'],
 ['बातचीत शब्दों का आदान-प्रदान है; संवाद में समझ और भावनात्मक सहभागिता भी शामिल है।','करुणा पाठक की प्रतिक्रिया है; लेखक इसे स्थितियों और विवरण से निर्मित करता है।'],
 ['अकेलापन','संवाद','वृद्धावस्था','सामाजिक परिवर्तन','करुणा','शीर्षक की सार्थकता'],
 ['“संवादहीन” शीर्षक क्यों उपयुक्त है?','वृद्ध स्त्री के अकेलेपन के सामाजिक कारण क्या हैं?','लेखक करुणा कैसे पैदा करता है?','कहानी आज के पारिवारिक/सामाजिक जीवन से किस प्रकार जुड़ती है?']
);
D('Hindi',H,'ऐसी भी बातें होती हैं','ihga104.pdf',
 'यतींद्र मिश्र द्वारा लता मंगेशकर से जुड़े साक्षात्कार/लेख के माध्यम से संगीत-साधना, संघर्ष, पारिवारिक उत्तरदायित्व और कलाकार की पहचान पर विचार किया गया है। पाठ प्रसिद्धि के पीछे लंबे अनुशासन और अनुभव को सामने लाता है।',
 [C('संगीत-साधना','कला में ऊँचाई निरंतर अभ्यास, सुनने की क्षमता और आत्मअनुशासन से बनती है।'),C('संघर्ष और जिम्मेदारी','जीवन की कठिनाइयों के बीच परिवार और संगीत के प्रति उत्तरदायित्व कलाकार की यात्रा को आकार देता है।'),C('आवाज़ और पहचान','गायन केवल तकनीक नहीं, भाव, भाषा और विशिष्ट स्वर-व्यक्तित्व का मेल है।'),C('साक्षात्कार-विधा','प्रश्न-उत्तर/संवाद व्यक्ति के अनुभव को प्रत्यक्ष स्वर देता है और जीवनी-सूचना से अलग आत्मीय दृष्टि बनाता है।')],
 ['कलाकार की उपलब्धियों की सूची के बजाय साधना और संघर्ष के कारण-परिणाम संबंध लिखें।','साक्षात्कार की विधा का प्रभाव बताएं - पाठक को कलाकार की अपनी दृष्टि सुनाई देती है।','संगीत संबंधी उत्तर में भाषा, भाव और अनुशासन को जोड़ें।'],
 ['जीवन-यात्रा: प्रारंभिक शिक्षा → संघर्ष → जिम्मेदारी → साधना → पहचान।','साक्षात्कार में तथ्य और व्यक्तिगत अनुभव के कथनों को अलग चिन्हित करें।'],
 ['केवल पुरस्कार/जीवनी याद करना।','प्रसिद्धि को “जन्मजात प्रतिभा” से समझाकर अभ्यास की भूमिका भूलना।','साक्षात्कार को सामान्य निबंध मान लेना।'],
 ['जीवनी लेखक द्वारा जीवन-वर्णन है; साक्षात्कार में व्यक्ति की प्रत्यक्ष आवाज अधिक प्रमुख रहती है।','प्रतिभा क्षमता है, साधना उसे विकसित करने की दीर्घ प्रक्रिया।'],
 ['लता मंगेशकर','संगीत-साधना','संघर्ष','पारिवारिक उत्तरदायित्व','स्वर-परिचय','साक्षात्कार'],
 ['संगीत-साधना का अर्थ केवल अभ्यास क्यों नहीं है?','जीवन-संघर्ष कलाकार की दृष्टि को कैसे प्रभावित करता है?','साक्षात्कार-विधा पाठ को क्या विशेषता देती है?','आवाज़ कलाकार की पहचान कैसे बन सकती है?']
);
D('Hindi',H,'आखिरी चट्टान तक','ihga105.pdf',
 'मोहन राकेश का यात्रा-वृत्तांत कन्याकुमारी के भू-दृश्य को बाहरी दृश्य और आंतरिक अनुभव दोनों के रूप में देखता है। तीन समुद्री क्षेत्रों के संगम, चट्टानों और प्राकृतिक विस्तार का चित्रण विस्मय, शांति और आत्मचिंतन से जुड़ता है।',
 [C('यात्रा-वृत्तांत','स्थान का विवरण लेखक की प्रत्यक्ष यात्रा, अनुभव और प्रतिक्रिया के साथ जुड़ता है।'),C('कन्याकुमारी का भू-दृश्य','समुद्र, चट्टान, सूर्योदय/सूर्यास्त और संगम दृश्यात्मक संरचना बनाते हैं।'),C('चित्रात्मक भाषा','रंग, ध्वनि, गति और रूप के विवरण पाठक के मन में दृश्य उपस्थित करते हैं।'),C('बाह्य से आंतरिक यात्रा','प्रकृति की विराटता लेखक को विस्मय और आत्मचिंतन की ओर ले जाती है।')],
 ['स्थान-वर्णन लिखते समय केवल “सुंदर” न कहें, किन दृश्यात्मक तत्वों से प्रभाव बना है, बताएँ।','यात्रा-वृत्तांत में तथ्य और व्यक्तिगत अनुभूति का मेल पहचानें।','शीर्षक की “आखिरी चट्टान” को भौगोलिक और अनुभवात्मक दोनों स्तरों पर समझें।'],
 ['भारत के दक्षिणी छोर का सरल रेखाचित्र बनाकर समुद्री दिशाओं/चट्टान का संदर्भ रखें।','दृश्य शब्दों को रंग, ध्वनि, गति और स्पर्श की श्रेणियों में बाँटें।'],
 ['यात्रा-वृत्तांत को पर्यटन-सूचना सूची न बनाएं।','भौगोलिक स्थान और साहित्यिक अनुभूति को अलग-अलग न रखें।','लंबे पाठांश उद्धृत करने के बजाय दृश्य का अपने शब्दों में विश्लेषण करें।'],
 ['यात्रा-विवरण “कहाँ गया” बताता है; यात्रा-वृत्तांत अनुभव और दृष्टि भी रचता है।','वर्णन दृश्य दिखाता है; चिंतन उस दृश्य का आंतरिक अर्थ विकसित करता है।'],
 ['कन्याकुमारी','यात्रा-वृत्तांत','चित्रात्मक भाषा','प्रकृति','विस्मय','आत्मचिंतन'],
 ['कन्याकुमारी का दृश्य लेखक पर क्या प्रभाव डालता है?','चित्रात्मक भाषा किन साधनों से बनती है?','शीर्षक के दो स्तर क्या हो सकते हैं?','यात्रा-वृत्तांत सामान्य सूचना-लेख से कैसे अलग है?']
);
D('Hindi',H,'रीढ़ की हड्डी','ihga106.pdf',
 'जगदीशचंद्र माथुर का 1939 का एकांकी विवाह-व्यवस्था, स्त्री-शिक्षा और लेन-देन से जुड़ी रूढ़ियों पर व्यंग्यात्मक चोट करता है। उमा शिक्षित और स्वाभिमानी स्त्री के रूप में उस मानसिकता को चुनौती देती है जिसमें लड़की की योग्यता छिपाई या कम करके दिखाई जाती है।',
 [C('उमा का चरित्र','शिक्षा, आत्मसम्मान और स्पष्टवादिता उसे निष्क्रिय “दिखाई जाने वाली” लड़की की भूमिका से बाहर लाते हैं।'),C('विवाह की रूढ़ि','लड़की को परखने और कम शिक्षित दिखाने की अपेक्षा पितृसत्तात्मक नियंत्रण को उजागर करती है।'),C('स्त्री-शिक्षा','पाठ शिक्षा को स्वतंत्र सोच और स्वाभिमान से जोड़ता है, केवल विवाह-योग्यता से नहीं।'),C('व्यंग्य और एकांकी','संवाद, मंच-स्थिति और विरोधाभास सामाजिक आलोचना को तीखा बनाते हैं।')],
 ['पात्रों के कथनों से सामाजिक मानसिकता पहचानें, फिर उस पर पाठ की आलोचना स्पष्ट करें।','उमा के निर्णायक संवाद/व्यवहार को चरित्र-विश्लेषण का प्रमाण बनाएं, लंबा उद्धरण नहीं।','एकांकी होने के कारण मंचीय निर्देश और संवाद की भूमिका भी लिखें।'],
 ['पात्र तालिका: उमा, माता-पिता, लड़का, लड़के का पिता - प्रत्येक की अपेक्षा और दृष्टि।','मंच पर “लड़की देखने” की स्थिति को शक्ति-संबंध के रूप में चित्रित करें।'],
 ['कहानी और एकांकी की विधा न मिलाएँ।','सिर्फ “दहेज बुरा है” जैसा सामान्य निष्कर्ष न दें; शिक्षा और स्त्री की agency पर भी लिखें।','उमा को केवल विद्रोही न कहें, उसके स्वाभिमान और तर्क को समझें।'],
 ['शिक्षित होना ज्ञान/क्षमता का प्रश्न है; समाज इसे विवाह-समझौते में छिपाने की मांग करता है - यही विरोधाभास आलोचना बनता है।','व्यंग्य हँसी के माध्यम से सामाजिक विसंगति उजागर करता है।'],
 ['एकांकी','उमा','स्त्री-शिक्षा','पितृसत्ता','विवाह-रूढ़ि','लेन-देन','व्यंग्य'],
 ['उमा शीर्षक की “रीढ़” का अर्थ कैसे स्पष्ट करती है?','एकांकी स्त्री-शिक्षा पर कौन-सी रूढ़ि पर चोट करता है?','संवाद सामाजिक व्यंग्य कैसे रचते हैं?','1939 का संदर्भ पाठ की आलोचना समझने में क्यों उपयोगी है?']
);
D('Hindi',H,'मैं और मेरा देश','ihga107.pdf',
 'कन्हैयालाल मिश्र प्रभाकर का निबंध व्यक्ति और राष्ट्र के संबंध को अधिकार, कर्तव्य, सेवा और पारस्परिक सम्मान के माध्यम से समझता है। लेखक व्यक्ति की पहचान को परिवार, नगर, समाज और देश की व्यापक परतों से जोड़ता है।',
 [C('व्यक्ति और समुदाय','व्यक्ति अकेले पूर्ण नहीं होता; वह संबंधों, ज्ञान, सेवाओं और सामाजिक सहयोग से विकसित होता है।'),C('नागरिकता','देश से संबंध केवल भावनात्मक गौरव नहीं, जिम्मेदार व्यवहार और सार्वजनिक हित से भी बनता है।'),C('अधिकार और कर्तव्य','नागरिक अधिकारों के साथ ऐसे कर्तव्य जुड़े हैं जो सामूहिक जीवन को मजबूत करते हैं।'),C('राष्ट्र का सम्मान','व्यक्ति के कार्य से उसके समुदाय और देश की छवि प्रभावित हो सकती है; सम्मान पारस्परिक है।')],
 ['लेखक की तर्क-श्रृंखला व्यक्ति → पड़ोस/नगर → समाज → राष्ट्र के क्रम में समझें।','देशप्रेम को व्यवहारिक नागरिक जिम्मेदारी से जोड़ें।','नेतृत्व पर प्रश्न आए तो कुशल नेतृत्व की विशेषताओं को निबंध के नागरिक दृष्टिकोण से जोड़ें।'],
 ['पहचान की संकेंद्रित परतें बनाएं: स्वयं, परिवार, समुदाय, नगर, देश।','अधिकार और कर्तव्य की दो-तरफा तालिका बनाएं।'],
 ['देशप्रेम को केवल नारा या भावुकता न बनाएं।','व्यक्ति और राष्ट्र को विरोधी ध्रुव मानना पाठ के तर्क के विपरीत है।','सामान्य राजनीति पर राय देने के बजाय निबंध के विचार पर रहें।'],
 ['अधिकार वह दावा/स्वतंत्रता है जिसे व्यवस्था मान्यता देती है; कर्तव्य जिम्मेदार व्यवहार की अपेक्षा है।','राष्ट्र-गौरव और अंध-समर्थन समान नहीं - जिम्मेदार नागरिक सुधार भी चाहता है।'],
 ['नागरिकता','अधिकार','कर्तव्य','सेवा','पहचान','राष्ट्र-सम्मान','नेतृत्व'],
 ['व्यक्ति की पूर्णता समाज से कैसे जुड़ती है?','लेखक अधिकार और कर्तव्य का संबंध कैसे देखता है?','देश के सम्मान में नागरिक की भूमिका क्या है?','देशप्रेम को व्यवहार में कैसे व्यक्त किया जा सकता है?']
);
D('Hindi',H,'पद','ihga108.pdf',
 'रैदास के पद भक्त और आराध्य के अटूट संबंध को सरल, लोकानुभव से जुड़े रूपकों में व्यक्त करते हैं। चंदन-पानी, दीपक-बाती, मोती-धागा और घन-मोर जैसी उपमाएँ समर्पण, विश्वास और अनन्य भक्ति को सजीव बनाती हैं।',
 [C('अनन्य भक्ति','भक्त का मन आराध्य से ऐसा जुड़ा है कि वह संबंध अन्य विकल्पों से बदला नहीं जा सकता।'),C('रूपकात्मक संबंध','दैनिक जीवन और प्रकृति से लिए युग्म भक्त-ईश्वर संबंध की निकटता और परस्परता दिखाते हैं।'),C('समर्पण','अहं के स्थान पर दास्य/निष्ठा का भाव आता है, पर यह आंतरिक विश्वास से उपजता है।'),C('सरल भाषा','ब्रज और लोकभाषिक सहजता आध्यात्मिक विचार को व्यापक अनुभव से जोड़ती है।')],
 ['हर बिंब का अलग अर्थ याद करने के बजाय पूछें: इस युग्म में निकटता, निर्भरता या एकत्व कैसे व्यक्त है?','भक्ति का भाव भाषा और बिंब दोनों से समझाएँ।','कवि-संदर्भ में रैदास की समानता और आंतरिक भक्ति की परंपरा को संक्षेप में जोड़ सकते हैं।'],
 ['चार प्रमुख युग्मों का चित्र बनाएं और प्रत्येक के सामने “संबंध का अर्थ” लिखें।','भाव-मानचित्र: निष्ठा → समर्पण → निकटता → अडिग विश्वास।'],
 ['पद का केवल शब्दार्थ न लिखें।','बिंबों की सूची देकर उनका प्रभाव न भूलें।','लंबी पंक्तियाँ उद्धृत न करें; अपने शब्दों में भाव स्पष्ट करें।'],
 ['उपमा/रूपक जैसे अलंकारिक साधन भाव को मूर्त बनाते हैं; केंद्रीय भाव उनसे व्यापक है।','बाह्य आडंबर और आंतरिक भक्ति की अवधारणा अलग है।'],
 ['अनन्य भक्ति','समर्पण','रैदास','लोकभाषा','प्रकृति-बिंब','भक्त-आराध्य संबंध'],
 ['चंदन-पानी जैसे युग्म क्या व्यक्त करते हैं?','सरल भाषा पद की शक्ति कैसे बढ़ाती है?','आंतरिक भक्ति का अर्थ क्या है?','पदों में बार-बार संबंध-युग्म क्यों आते हैं?']
);
D('Hindi',H,'राम-लक्ष्मण-परशुराम संवाद','ihga109.pdf',
 'तुलसीदास के रामचरितमानस के बालकांड से लिया गया यह संवाद शिव-धनुष टूटने के बाद परशुराम के क्रोध, लक्ष्मण की तीखी वाणी और राम की मर्यादित प्रतिक्रिया के माध्यम से चरित्र, वीरता और विनय का नाटकीय टकराव रचता है।',
 [C('प्रसंग','सीता स्वयंवर में शिव-धनुष टूटने की खबर पर परशुराम क्रोधित होकर आते हैं।'),C('लक्ष्मण','उनकी वाणी निर्भीक, व्यंग्यपूर्ण और चुनौतीपूर्ण है, जिससे संवाद का तनाव बढ़ता है।'),C('परशुराम','क्रोध, तप-बल और वीर गौरव उनके व्यवहार में प्रकट होते हैं।'),C('राम','विनय, संयम और मर्यादा के माध्यम से उनका चरित्र लक्ष्मण और परशुराम के तीखे स्वभाव से विपरीत दिखाई देता है।'),C('संवाद-शिल्प','प्रश्न, प्रत्युत्तर, व्यंग्य और चरित्रानुकूल भाषा दृश्य को नाटकीय गति देते हैं।')],
 ['उत्तर में तीनों प्रमुख पात्रों की वाणी की तुलना करें।','व्यंग्य का उदाहरण लंबा उद्धृत किए बिना स्थिति और प्रभाव से समझाएँ।','राम की विनय को कमजोरी न मानें - यह नियंत्रित शक्ति और मर्यादा का साहित्यिक संकेत है।'],
 ['तीन स्तंभ: परशुराम - क्रोध/गौरव; लक्ष्मण - निर्भीक व्यंग्य; राम - विनय/संयम।','संवाद के तनाव का ग्राफ बनाएं: आगमन → चुनौती → तीखापन → संयम।'],
 ['कथानक की पूरी रामकथा न लिखें।','अवधी भाषा-संदर्भ को आधुनिक हिंदी शब्दार्थ से न मिलाएं।','पात्र के एक संवाद से उसके पूरे चरित्र पर अतिशयोक्ति न करें।'],
 ['वीरता केवल आक्रामक वाणी नहीं; राम की मर्यादा और आत्मसंयम भी शक्ति का रूप है।','व्यंग्य हास्य पैदा कर सकता है, लेकिन यहाँ तनाव और चरित्र-टकराव भी बढ़ाता है।'],
 ['बालकांड','शिव-धनुष','परशुराम','लक्ष्मण','राम','व्यंग्य','मर्यादा'],
 ['तीनों पात्रों की भाषा में क्या अंतर है?','लक्ष्मण का व्यंग्य संवाद को कैसे प्रभावित करता है?','राम की प्रतिक्रिया उनके चरित्र को कैसे स्थापित करती है?','प्रसंग में वीरता के अलग-अलग रूप कौन से हैं?']
);
D('Hindi',H,'भारति, जय, विजय करे!','ihga110.pdf',
 'सूर्यकांत त्रिपाठी निराला की देशप्रेम से ओत-प्रोत कविता भारतभूमि को जीवंत, समृद्ध और विजयशाली रूप में कल्पित करती है। प्रकृति और कृषि से जुड़े बिंब राष्ट्रीय गौरव को दृश्यात्मक ऊर्जा देते हैं।',
 [C('भारत का मानवीकरण','भारत/भारती को संबोधित कर कवि देश को सक्रिय, पूज्य और विजय की आकांक्षा से जुड़ा रूप देता है।'),C('प्रकृति और समृद्धि','भूमि, फसल और प्राकृतिक सौंदर्य के बिंब राष्ट्र की जीवंतता का संकेत हैं।'),C('विजय की कामना','कविता का स्वर प्रेरक है; विजय केवल युद्ध नहीं, उत्कर्ष और गौरव की व्यापक आकांक्षा भी है।'),C('लय और आवर्तन','उद्घोषात्मक पंक्तियाँ और दोहराव कविता को गीतात्मक व प्रेरणात्मक प्रभाव देते हैं।')],
 ['देशप्रेम को कविता के विशिष्ट बिंब और संबोधन से सिद्ध करें।','प्रकृति-वर्णन को केवल सौंदर्य न मानें - वह राष्ट्रीय समृद्धि का अर्थ भी रचता है।','शीर्षक/आवर्तन की ध्वनि और प्रभाव पर ध्यान दें।'],
 ['कविता के बिंबों को भूमि, फसल, जल/प्रकृति, विजय जैसे समूहों में बाँटें।','स्वर-मानचित्र: संबोधन → गौरव → विजय की कामना।'],
 ['सिर्फ “देशभक्ति कविता है” लिखना पर्याप्त नहीं।','कवि-परिचय को कविता-विश्लेषण पर हावी न होने दें।','लंबा काव्यांश उद्धृत न करें।'],
 ['वर्णन दृश्य प्रस्तुत करता है; प्रतीक/बिंब उससे व्यापक राष्ट्रीय अर्थ बना सकता है।','देशप्रेम और अंध प्रशंसा समान नहीं; कविता विशिष्ट सांस्कृतिक-प्राकृतिक छवियों से भाव रचती है।'],
 ['निराला','देशप्रेम','भारती','प्रकृति-बिंब','राष्ट्रीय गौरव','लय','विजय'],
 ['कविता में भारत का रूप कैसे निर्मित होता है?','प्रकृति-बिंब राष्ट्रीय भाव को कैसे गहरा करते हैं?','आवर्तन का प्रभाव क्या है?','“विजय” का व्यापक अर्थ क्या हो सकता है?']
);
D('Hindi',H,'झाँसी की रानी','ihga111.pdf',
 'सुभद्रा कुमारी चौहान की प्रसिद्ध कविता 1857 के स्वाधीनता संघर्ष की पृष्ठभूमि में रानी लक्ष्मीबाई के साहस, नेतृत्व और प्रतिरोध को जनस्मृति से जोड़ती है। सरल, लयात्मक और आवेगपूर्ण शैली राष्ट्रीय चेतना को प्रबल बनाती है।',
 [C('ऐतिहासिक पृष्ठभूमि','कविता 1857 के विद्रोह/स्वाधीनता संघर्ष की स्मृति को काव्यात्मक रूप देती है।'),C('लक्ष्मीबाई का चरित्र','साहस, नेतृत्व, युद्ध-कौशल और स्वतंत्रता के प्रति संकल्प प्रमुख विशेषताएँ हैं।'),C('लोक-स्मृति','कथात्मकता और आवर्तन कविता को गाने/सुनाने योग्य बनाते हैं, जिससे नायिका सामूहिक स्मृति का हिस्सा बनती है।'),C('राष्ट्रीय चेतना','वीरता का वर्णन औपनिवेशिक सत्ता के प्रतिरोध और स्वतंत्रता की आकांक्षा से जुड़ता है।')],
 ['इतिहास और कविता में अंतर रखें - कविता ऐतिहासिक घटना की भावात्मक साहित्यिक प्रस्तुति है।','चरित्र-विश्लेषण में साहस के साथ नेतृत्व और राजनीतिक संदर्भ भी जोड़ें।','लय/आवर्तन का प्रभाव जन-स्मृति और उत्साह से जोड़ें।'],
 ['1857 का सरल समय-संदर्भ बनाएं और झाँसी को स्थान दें।','कविता में लक्ष्मीबाई की विशेषताओं का प्रमाण-मानचित्र बनाएं।'],
 ['कविता को शुद्ध इतिहास-पाठ न मानें।','केवल प्रसिद्ध आवर्ती पंक्ति उद्धृत करके विश्लेषण न रोकें।','वीरता को शारीरिक साहस तक सीमित न करें।'],
 ['ऐतिहासिक स्रोत तथ्य सत्यापित करता है; काव्य इतिहास को भाव, चयन और रूप से पुनर्सृजित करता है।','वीर-रस और राष्ट्रीय चेतना जुड़े हैं, लेकिन विश्लेषण में भाषा/लय का आधार दें।'],
 ['1857','रानी लक्ष्मीबाई','वीरता','नेतृत्व','औपनिवेशिक प्रतिरोध','राष्ट्रीय चेतना','लोक-स्मृति'],
 ['कविता लक्ष्मीबाई को किस प्रकार नायिका बनाती है?','लय और आवर्तन का क्या प्रभाव है?','ऐतिहासिक घटना और काव्यात्मक प्रस्तुति में क्या अंतर है?','राष्ट्रीय चेतना किन तत्वों से बनती है?']
);
D('Hindi',H,'घर की याद','ihga112.pdf',
 'भवानीप्रसाद मिश्र ने यह कविता 1942 के भारत छोड़ो आंदोलन के दौरान कारावास में लिखी। जेल की दूरी परिवार, घर और परिचित जीवन की स्मृतियों को तीव्र बनाती है, इसलिए निजी विरह और राष्ट्रीय संघर्ष एक ही अनुभव में मिलते हैं।',
 [C('ऐतिहासिक संदर्भ','कवि स्वतंत्रता आंदोलन में सक्रिय भागीदारी के कारण जेल में थे; यह परिस्थिति कविता की दूरी और बंदीपन को वास्तविक संदर्भ देती है।'),C('घर की स्मृति','परिवार और घरेलू जीवन की याद जेल की कठोरता के विपरीत आत्मीय संसार रचती है।'),C('विरह','दूरी शारीरिक है, पर स्मृति भावनात्मक निकटता बनाए रखती है।'),C('निजी और सार्वजनिक जीवन','स्वाधीनता संघर्ष का राजनीतिक निर्णय व्यक्तिगत परिवार-वियोग की कीमत भी लेकर आता है।')],
 ['सन् 1942 का संदर्भ कविता के भाव से जोड़ें, केवल तारीख याद न करें।','स्मृति के बिंबों से भाव-परिवर्तन समझाएँ।','कवि के निजी दुख को स्वतंत्रता आंदोलन के व्यापक दायित्व से जोड़ें, पर कविता को नारा न बनाएं।'],
 ['दो वृत्त बनाएं: “जेल का वर्तमान” और “घर की स्मृति”, बीच में विरोधी भाव लिखें।','समय-संदर्भ: भारत छोड़ो आंदोलन, कारावास, परिवार की याद।'],
 ['कविता को केवल देशभक्ति कविता कहना उसके घरेलू/व्यक्तिगत भाव को खो देता है।','ऐतिहासिक पृष्ठभूमि लिखकर साहित्यिक विश्लेषण छोड़ना।','स्मृति को तथ्य-सूची बनाना।'],
 ['स्मृति अतीत की मानसिक पुनर्रचना है; वर्तमान दूरी उसे भावनात्मक अर्थ देती है।','निजी विरह और राष्ट्रीय कर्तव्य परस्पर विरोधी होकर भी एक ही जीवन में मौजूद हो सकते हैं।'],
 ['1942','भारत छोड़ो आंदोलन','कारावास','घर','स्मृति','विरह','कर्तव्य'],
 ['कारावास कविता के भाव को कैसे तीव्र करता है?','घर की स्मृति किन अर्थों का निर्माण करती है?','निजी और राष्ट्रीय अनुभव कैसे जुड़ते हैं?','कविता का स्वर केवल देशभक्ति से अधिक जटिल क्यों है?']
);

const SS='Understanding Society: India and Beyond · Part 1';
D('Social Science',SS,'Understanding Social Science','iest101.pdf',
 'Social Science systematically studies human society by connecting people, places, institutions, economies, cultures and the past. Its strength lies in combining evidence and multiple disciplinary lenses to explain why social patterns occur.',
 [C('Object of study','Social Science focuses on human society, institutions, culture and interaction.'),C('Disciplines','History, Geography, Political Science, Economics and related fields ask different but connected questions.'),C('Evidence','Documents, artefacts, maps, surveys, statistics and observations support claims, but each source has limits.'),C('Interconnection','A real issue such as migration or a city cannot be understood fully through only one discipline.')],
 ['Identify whether a question asks about time, space, power/institutions, economic choice or social relations.','Choose evidence suited to the question and ask who produced it, when and for what purpose.','Combine disciplines only when the connection adds explanation.'],
 ['Make a five-lens wheel around one issue such as a market or flood.','Create a source table: evidence type, what it can show, limitation.'],
 ['Do not treat Social Science as memorising facts.','Opinion is not evidence by itself.','One discipline’s explanation may be incomplete, not necessarily wrong.'],
 ['Natural sciences primarily study the physical/living world; social sciences focus on human society, though the domains interact.','Primary and secondary evidence differ by relationship to the event/research question, not automatically by reliability.'],
 ['society','discipline','evidence','institution','economy','culture','interdisciplinary thinking'],
 ['Why is Social Science systematic rather than just common sense?','How could one issue require both geography and economics?','What makes evidence relevant?','Why should a source’s limitations be considered?']
);
D('Social Science',SS,'Shaping of the Earth’s Surface','iest102.pdf',
 'Earth’s surface is dynamic. Plate movements and internal energy build or deform major structures, while weathering, erosion, transport and deposition continually reshape landforms at the surface.',
 [C('Plate tectonics','The lithosphere is divided into moving plates whose interactions help explain mountains, earthquakes, volcanoes and oceanic features.'),C('Endogenic processes','Forces from within Earth can uplift, fold, fault or create volcanic landforms.'),C('Exogenic processes','Water, wind, ice and gravity weather, erode, transport and deposit material.'),C('Landforms and people','Mountains, plains, plateaus and valleys influence settlement, resources, transport, hazards and livelihoods.'),C('Hazard and disaster','A natural process becomes a disaster through exposure and vulnerability, not merely because the process occurs.')],
 ['For a landform, explain process in sequence: force/agent → action → material movement → resulting form.','On hazard questions, distinguish physical event from human vulnerability.','Use map/location examples only when they support the mechanism.'],
 ['Sketch convergent/divergent/transform plate boundaries with motion arrows.','Create an erosion-deposition sequence for a river from upper to lower course at a simple level.'],
 ['Weathering breaks material in place; erosion removes/transports it.','Do not say plates float on fully liquid magma; school-level models refer to movement over deformable mantle/asthenospheric material.','Hazard and disaster are not identical.'],
 ['Endogenic builds/deforms from internal processes; exogenic reshapes at surface.','Weathering versus erosion: breakdown in place versus removal/transport.'],
 ['plate tectonics','endogenic/exogenic','weathering','erosion/deposition','landform','hazard/vulnerability'],
 ['How do plate boundaries create different features?','Why are weathering and erosion distinct?','How can the same earthquake have different disaster impacts?','How do landforms influence human activity?']
);
D('Social Science',SS,'Atmosphere and Climate','iest103.pdf',
 'The atmosphere is a layered mixture of gases that supports life, filters radiation and regulates energy. Weather and climate emerge from temperature, pressure, moisture and circulation, with the Indian monsoon as a major linked system.',
 [C('Composition and layers','Nitrogen and oxygen dominate lower-atmosphere composition, while atmospheric layers have different temperature trends and functions.'),C('Weather and climate','Weather describes short-term conditions; climate summarises patterns over longer periods.'),C('Pressure and wind','Unequal heating creates pressure differences that drive air movement, modified by Earth’s rotation and surface conditions.'),C('Moisture','Humidity, condensation, clouds and precipitation connect atmosphere to the water cycle.'),C('Monsoon and carbon footprint','Monsoon circulation depends on seasonal land-ocean heating and larger circulation; human emissions contribute to climate forcing and can be reduced through choices and policy.')],
 ['Explain wind from pressure difference caused by uneven heating rather than memorising arrows alone.','For monsoon, build a seasonal cause chain instead of saying “winds bring rain”.','Differentiate local weather evidence from long-term climate evidence.'],
 ['Draw atmospheric layers with one key function/feature each.','Sketch a simplified summer monsoon land-sea pressure pattern.'],
 ['Weather is not proof of climate trend by itself.','Ozone layer and greenhouse effect are different atmospheric issues.','Carbon footprint includes direct and indirect emissions associated with activities.'],
 ['Weather is short-term state; climate is long-term pattern/statistics.','Humidity is water vapour content; precipitation is water falling from atmosphere.'],
 ['atmosphere','layers','temperature/pressure','winds','moisture','monsoon','weather vs climate','carbon footprint'],
 ['Why does unequal heating generate winds?','How are weather and climate different?','What sequence produces monsoon circulation at a basic level?','How can human activity influence atmospheric energy balance?']
);
D('Social Science',SS,'Early Humans and Beginning of Civilisation','iest104.pdf',
 'This chapter reconstructs humanity before and around the emergence of early civilisations using archaeology and early written evidence. It stresses that different regions developed writing and settled life at different times.',
 [C('Prehistory and evidence','Periods without decipherable written records are studied mainly through material remains, environmental evidence and archaeology.'),C('Human adaptation','Tools, food strategies, mobility and social cooperation changed as humans responded to environments.'),C('Settlement and agriculture','Food production enabled more permanent settlements and new forms of labour, storage and social organisation.'),C('Writing','Writing systems emerged in several civilisations, but scripts must be deciphered before they can function as readable historical testimony.'),C('Civilisational contact','Trade and movement connected early societies, spreading materials, techniques and ideas.')],
 ['Match each claim to its evidence type: stone tool, burial, settlement remains, inscription or environmental record.','Avoid a single “progress ladder”; different communities followed different pathways.','When discussing Harappan writing, state that the script remains undeciphered rather than assigning known meanings.'],
 ['Timeline broad phases from mobile foraging to varied settled communities without implying one exact date worldwide.','Map major early civilisation regions and plausible exchange routes.'],
 ['Do not assume no writing means no history.','Archaeological interpretation is evidence-based but can be revised.','Do not claim the Harappan script has been definitively deciphered.'],
 ['Artefact is an object; archaeological context is where/how it was found and can be equally important.','Civilisation is not simply “better” than non-urban life; it is a form of complex social organisation.'],
 ['archaeology','early humans','food production','settlement','writing systems','Harappan script','exchange'],
 ['How can we know about people without written records?','Why does context matter for an artefact?','How did agriculture change settlement possibilities?','Why must claims about undeciphered scripts remain cautious?']
);
D('Social Science',SS,'State and Society up to 1000 CE','iest105.pdf',
 'The chapter follows state formation and social change in the Indian subcontinent up to about 1000 CE by combining archaeology with literary and inscriptional sources. Political authority, dharma, social groups, occupations and cultural interaction developed in varied regional forms.',
 [C('Sources','Archaeology is supplemented by literary and inscriptional material, including early Vedic and later texts, each requiring contextual reading.'),C('State formation','Political organisation ranged from smaller polities to larger kingdoms/empires with changing forms of administration and revenue.'),C('Dharma and kingship','Ideas of duty and righteous rule shaped normative expectations, while actual political practice varied.'),C('Social and occupational groups','Communities, professions and social categories evolved over time rather than remaining completely fixed.'),C('Cultural integration','Movement, trade, pilgrimage, languages and political networks helped connect regions while preserving diversity.')],
 ['For each period example, separate normative text (“how society ought to be”) from evidence of actual practice.','Organise answers by change/continuity rather than a ruler list.','Use chronology to support causation, not replace it.'],
 ['Create a source matrix: archaeology, text, inscription, coin - information and limitation.','Use a broad timeline from Vedic-era evidence through early historic and first-millennium political formations.'],
 ['Do not describe a thousand years as one unchanging system.','Textual ideals are not direct photographs of society.','Avoid projecting modern national institutions onto ancient political forms.'],
 ['State is a political institution; society includes wider social relationships and groups.','Normative source prescribes ideals; descriptive evidence records/indicates practice, though sources can mix both.'],
 ['state formation','sources','dharma','kingship','social groups','occupation','regional diversity','cultural connection'],
 ['Why do historians combine different source types?','How can an ideal of kingship differ from practice?','What changed in political organisation over the period?','How did regions become connected without becoming identical?']
);
D('Social Science',SS,'Democracy','iest106.pdf',
 'Democracy places political authority ultimately in citizens and builds institutions around participation, representation, rights, equality and accountability. The chapter also treats democracy as an evolving practice that faces real challenges.',
 [C('Popular authority','Citizens are the source of democratic legitimacy and choose representatives through regular political processes.'),C('Core values','Freedom, equality, justice, rights and duties shape democratic expectations beyond election day.'),C('Forms','Direct and representative mechanisms involve citizens differently; modern large democracies rely heavily on representation alongside other participatory forms.'),C('Constitution and institutions','Rules distribute power, protect rights and create procedures for accountability.'),C('Challenges','Inequality, exclusion, misinformation, weak participation or institutional failures can limit democratic quality.')],
 ['When evaluating democracy, use criteria such as participation, rights, accountability and equality.','Distinguish ideal principle from actual performance.','For India examples, connect constitutional/institutional design to citizen participation rather than using slogans.'],
 ['Draw citizens → representatives → institutions → accountability back to citizens.','Create a principle/practice table: democratic value, institution, possible challenge.'],
 ['Democracy is not only majority rule.','Elections alone do not guarantee all democratic values.','Rights and duties should not be presented as cancelling each other.'],
 ['Direct democracy involves citizens deciding issues more directly; representative democracy delegates routine law/governance decisions to elected representatives.','Legality means according to law; democratic legitimacy also concerns participation and accepted authority.'],
 ['popular sovereignty','representation','rights','equality','accountability','constitution','democratic challenges'],
 ['Why are elections necessary but not sufficient for democracy?','How can a constitution protect democratic principles?','What does accountability mean?','How can inequality affect political participation?']
);
D('Social Science',SS,'Elections','iest107.pdf',
 'Elections periodically renew democratic authority by allowing citizens to choose representatives. The chapter compares direct and indirect election, examines institutions and rules that support fairness, and asks how electoral challenges can affect representation.',
 [C('Purpose','Elections create choice, authorise representatives and make office-holders periodically answerable to citizens.'),C('Direct and indirect election','Voters directly elect many legislatures/local bodies, while some offices are chosen by elected representatives through indirect mechanisms.'),C('Electoral rules','Constituencies, eligibility, nomination, campaigning, voting and counting procedures shape representation.'),C('Free and fair election','Meaningful choice requires impartial administration, equal legal rights, secrecy/security of vote and credible counting.'),C('Challenges','Money, misinformation, coercion, exclusion or unfair use of power can weaken electoral competition.')],
 ['Explain a rule by the democratic problem it is meant to prevent.','When comparing direct/indirect systems, state who casts the decisive vote for the office.','Evaluate fairness using evidence about access, choice, administration and counting.'],
 ['Flowchart: voter registration → nomination/campaign → polling → counting → result/accountability.','Table direct versus indirect with Indian examples.'],
 ['Do not say the President/Rajya Sabha members are elected in exactly the same way as Lok Sabha members.','Election result alone does not prove the process was fair.','Do not confuse political party with Election Commission.'],
 ['Election is the process of choosing office-holders; democracy is the wider system of rights, institutions and accountability.','Direct/indirect describes the electoral mechanism, not whether an office is important.'],
 ['periodic mandate','direct/indirect election','constituency','representation','free and fair','electoral institutions','challenges'],
 ['Why must elections recur periodically?','How does indirect election differ from direct election?','What conditions make an election genuinely competitive?','How can an unfair process damage democratic legitimacy?']
);
D('Social Science',SS,'Building Blocks in Economics: The Problem of Choice','iest108.pdf',
 'Economics begins with scarcity: resources are limited relative to competing wants, so individuals, firms and governments must choose. Every choice has an opportunity cost and economic systems organise production and distribution in different ways.',
 [C('Scarcity','Limited resources and time cannot satisfy all wants simultaneously.'),C('Choice and opportunity cost','Choosing one option means giving up the next best available alternative.'),C('Economic agents','Households, firms and governments make choices under different objectives and constraints.'),C('Central questions','Societies decide what to produce, how to produce and for whom output is produced/distributed.'),C('Economic systems','Market, state and mixed arrangements coordinate choices through different combinations of prices, ownership and public decision-making.')],
 ['State the scarce resource and competing uses before naming opportunity cost.','Opportunity cost is the next best forgone option, not the money cost automatically.','Compare systems by coordination mechanism, incentives and social goals rather than labels alone.'],
 ['Draw a simple choice frontier with two uses of a fixed resource to visualise trade-offs.','Create an agent table for household, enterprise and government decisions.'],
 ['Needs and wants are context-sensitive; do not treat every want as frivolous.','Scarcity is not identical to poverty.','Opportunity cost is not the sum of all alternatives forgone.'],
 ['Scarcity is a universal constraint; poverty is insufficient resources/income to meet basic living standards.','Money price is an explicit cost; opportunity cost includes the value of the next best alternative.'],
 ['scarcity','choice','opportunity cost','resources','economic agents','what/how/for whom','economic systems'],
 ['Why does scarcity force choice?','What is opportunity cost in a school-time example?','How do household and government constraints differ?','What are the three central economic questions?']
);
D('Social Science',SS,'The Price Puzzle: What Drives the Market','iest109.pdf',
 'Market prices emerge from interaction between buyers’ demand and sellers’ supply, but both sides respond to many factors. Equilibrium is a useful model, while real markets also include changing expectations, institutions and government intervention.',
 [C('Demand','Quantity buyers are willing and able to purchase varies with price and other determinants such as income, preferences and related goods.'),C('Supply','Quantity sellers are willing and able to offer varies with price and determinants such as input costs, technology and conditions of production.'),C('Equilibrium','The model equilibrium occurs where quantity demanded equals quantity supplied, reducing pressure for price to move.'),C('Shifts','A price change causes movement along a demand/supply relationship; another determinant can shift the whole relationship.'),C('Government intervention','Taxes, subsidies, regulation, public provision or price measures may pursue equity, stability or other policy goals but can have trade-offs.')],
 ['Identify whether the event affects buyers or sellers and which determinant changes.','Predict direction of curve/relationship shift, then infer pressure on equilibrium price and quantity.','In real examples, acknowledge other simultaneous factors before claiming one cause.'],
 ['Draw demand and supply curves with equilibrium, then show one shift at a time.','Use a cause chain for seasonal vegetable prices: availability → supply → market pressure → price.'],
 ['Do not say “demand increased” when only quantity demanded changed because price fell.','Equilibrium is a model, not a claim that real prices never change.','High price does not always imply seller greed; investigate demand/supply conditions.'],
 ['Demand means willingness and ability to buy at prices, not desire alone.','Movement along versus shift: own price changes quantity on a curve; other determinants change the curve.'],
 ['demand','supply','determinants','equilibrium','movement vs shift','government intervention','market price'],
 ['What can shift demand without changing the good’s own price first?','Why can a bad harvest raise price?','What does equilibrium mean?','How is movement along a curve different from a shift?']
);

window.CBSE_NCERT_DEEP_NOTES=(window.CBSE_NCERT_DEEP_NOTES||[]).concat(notes);
})();