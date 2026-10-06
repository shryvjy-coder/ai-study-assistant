/* StudyAI deep Cambridge International AS Level Mathematics notes.
 * Scope authority: user-supplied Cambridge International AS & A Level Mathematics 9709
 * syllabus for 2026 and 2027. RocketRevise is used for topical-practice alignment
 * and exam-mate for full-paper/past-paper alignment. Explanations are original.
 */
(() => {
'use strict';

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const BOARD='Cambridge International';
const YEAR='2026–2027';
const GRADE='AS Level (11)';
const SUBJECT='Mathematics';
const SOURCE='Official Cambridge International AS & A Level Mathematics 9709 syllabus supplied by the user; RocketRevise used for topical-practice alignment; exam-mate used for full-paper/past-paper alignment';

const componentMeta={
 p1:{component:'Paper 1',sourceBook:'Paper 1 · Pure Mathematics 1',orderBase:100},
 p2:{component:'Paper 2',sourceBook:'Paper 2 · Pure Mathematics 2',orderBase:200},
 p4:{component:'Paper 4',sourceBook:'Paper 4 · Mechanics',orderBase:400},
 p5:{component:'Paper 5',sourceBook:'Paper 5 · Probability & Statistics 1',orderBase:500}
};

function makeNote(summary, concepts, formulas, reasoning, examTips, mistakes, selfCheck, practice){
 return {
  summary,
  keyPoints:concepts.slice(0,5).map(x=>x[0]+': '+x[1]),
  formulas,
  method:reasoning,
  mistakes,
  deepNotes:{
   overview:summary,
   concepts,
   formulas,
   reasoning,
   visuals:[
    'Sketch the relevant graph, diagram, force model or distribution before committing to algebra when a visual model clarifies the structure.',
    'Label key points, intervals, directions, asymptotes, gradients, areas or parameters explicitly so the diagram supports the mathematics.',
    'Use exact forms during working where possible and convert to decimal form only when the question or final accuracy requires it.'
   ],
   examTips,
   distinctions:concepts.slice(0,4).map(x=>x[0]+': '+x[1]),
   quickRevision:concepts.slice(0,6).map(x=>x[0]),
   vocabulary:concepts.slice(0,10).map(x=>x[0]),
   selfCheck,
   practice
  }
 };
}

const notes={
'Pure Mathematics: Quadratics':{part:'p1',note:makeNote(
 'Master quadratic forms, discriminants, inequalities and quadratic modelling, including simultaneous systems and equations that become quadratic after substitution.',
 [
  ['Completing the square','Rewrite ax²+bx+c in completed-square form to expose the vertex, range and graph position.'],
  ['Discriminant','For ax²+bx+c=0, b²-4ac determines whether there are two real roots, one repeated real root or no real roots.'],
  ['Solving quadratics','Choose factorisation, completing the square or the quadratic formula according to structure and exactness required.'],
  ['Quadratic inequalities','Find critical roots first, then use a sign diagram or graph to determine intervals satisfying the inequality.'],
  ['Linear-quadratic simultaneous equations','Substitute the linear relation into the quadratic equation, solve for one variable, then back-substitute.'],
  ['Quadratic-in-form equations','Recognise substitutions such as u=x² or u=tan x that convert a higher-looking equation into a quadratic.'],
  ['Parameter questions','Use the discriminant and graph intersection idea to determine parameter values for touching, intersecting or non-intersecting curves.']
 ],
 ['x = (-b ± √(b²-4ac))/(2a)','discriminant Δ = b²-4ac'],
 [
  'Identify the most revealing form: factor form for roots, completed square for vertex/range, standard form for discriminant.',
  'For inequalities, solve the equality first and test intervals rather than applying equation logic blindly.',
  'In simultaneous problems, preserve every valid root and check each ordered pair in the original equations.',
  'For a parameter controlling intersections, translate the geometric condition into a discriminant condition.'
 ],
 [
  'A repeated root corresponds to a tangent contact and discriminant zero.',
  'Do not decimalise surds unless requested.',
  'When dividing an inequality by a negative expression, only reverse the sign if that expression is known to be negative.',
  'Check substitutions such as u=x² against restrictions like u≥0.'
 ],
 ['Using the quadratic formula without simplifying first','Treating Δ<0 as “no solutions” when the domain may be complex outside this syllabus context','Solving an inequality but giving only boundary roots','Forgetting to back-substitute both quadratic roots'],
 ['How does completed-square form reveal the vertex?','What discriminant condition gives a repeated root?','How would you solve x⁴-5x²+4=0 efficiently?','Why is a sign chart useful for quadratic inequalities?','How can a line tangent to a quadratic be detected algebraically?'],
 ['Use RocketRevise Pure 1 topical sets for quadratics/discriminants after each subskill.','Use exam-mate Paper 1 yearly/full-paper practice once several P1 topics are secure.']
)},
'Pure Mathematics: Functions':{part:'p1',note:makeNote(
 'Use domain, range, one-one behaviour, inverse and composite functions, and graph transformations with careful attention to restrictions.',
 [
  ['Function','A function assigns each permitted input exactly one output. Domain specifies allowed inputs; range is the resulting set of outputs.'],
  ['One-one function','A one-one function never sends two different domain values to the same output, so it can possess an inverse on that domain.'],
  ['Composite function','gf means g(f(x)); it is defined only where outputs of f lie inside the domain of g.'],
  ['Inverse function','Find f⁻¹ by solving y=f(x) for x, then interchange variable names; keep any domain/range restrictions.'],
  ['Inverse graph','The graphs of a one-one function and its inverse are reflections in y=x.'],
  ['Vertical transformations','y=f(x)+a translates vertically; y=af(x) scales vertical distances and may reflect if a<0.'],
  ['Horizontal transformations','y=f(x+a) shifts oppositely to the sign inside; y=f(ax) scales x-coordinates by factor 1/a and may reflect.']
 ],
 ['(g∘f)(x)=g(f(x))','f⁻¹(f(x))=x on the appropriate domain'],
 [
  'Write the domain before finding an inverse if the original function is not naturally one-one.',
  'For composites, perform the inside function first and then check domain compatibility.',
  'For transformations, transform coordinates rather than relying on verbal memory alone.',
  'When finding a range, combine algebra with the graph or completed-square form where useful.'
 ],
 [
  'Do not confuse f⁻¹(x) with 1/f(x).',
  'Horizontal transformations act in the opposite direction inside the function.',
  'An inverse swaps domain and range.',
  'State restrictions when they are necessary to make an inverse valid.'
 ],
 ['Treating f⁻¹ as reciprocal','Composing in the wrong order','Ignoring domain restrictions','Applying horizontal scale by a instead of 1/a'],
 ['What condition is needed for a function to have an inverse?','What is the domain condition for gf?','How are f and f⁻¹ related graphically?','What does y=f(x+3) do to the graph?','Why may a quadratic require a restricted domain before inversion?'],
 ['Use RocketRevise Pure 1 transformation/function topical questions to practise graph changes.','Use exam-mate Paper 1 full papers to practise functions mixed with algebra and trigonometry.']
)},
'Pure Mathematics: Coordinate Geometry':{part:'p1',note:makeNote(
 'Connect straight-line equations, distance and midpoint geometry, circles, tangents and graph intersections using algebraic and geometric reasoning.',
 [
  ['Straight-line forms','Move fluently between y=mx+c, point-gradient form and ax+by+c=0.'],
  ['Gradient relationships','Parallel lines have equal gradients; non-vertical perpendicular lines have gradients whose product is -1.'],
  ['Distance and midpoint','Coordinate formulas convert geometric conditions into algebraic equations.'],
  ['Circle equation','(x-a)²+(y-b)²=r² has centre (a,b) and radius r; complete squares to recover these from expanded form.'],
  ['Tangent-radius property','A tangent is perpendicular to the radius at the point of contact.'],
  ['Line-circle intersection','Substitute the line equation into the circle equation; the resulting quadratic determines intersection count.'],
  ['Graph intersections','Solutions of simultaneous equations correspond to graph intersection points, so discriminants can answer touching/intersection parameter questions.']
 ],
 ['m=(y₂-y₁)/(x₂-x₁)','distance = √((x₂-x₁)²+(y₂-y₁)²)','midpoint=((x₁+x₂)/2,(y₁+y₂)/2)','(x-a)²+(y-b)²=r²'],
 [
  'Sketch the geometry and mark known points before forming equations.',
  'Choose the line form that uses the information most directly.',
  'For an expanded circle, complete the square separately in x and y.',
  'For a tangent or intersection-count problem, combine geometry with the discriminant instead of solving unnecessarily.'
 ],
 [
  'A vertical line has undefined gradient, so do not force y=mx+c.',
  'Tangent perpendicularity applies at the exact point of contact.',
  'When completing squares, keep constants balanced on both sides.',
  'Use exact coordinates until final rounding is requested.'
 ],
 ['Forgetting the square on the radius','Using m₁m₂=-1 when one line is vertical','Dropping one intersection after solving a quadratic','Misidentifying centre signs from (x-a)²+(y-b)²'],
 ['How do you recover a circle centre from expanded form?','What algebraic condition means a line is tangent to a circle?','How do parallel and perpendicular gradients differ?','Why do graph intersections solve simultaneous equations?','How would you find the tangent at a known point on a circle?'],
 ['Use RocketRevise Pure 1 coordinate-geometry topical sets for lines/circles.','Use exam-mate Paper 1 papers for mixed coordinate-geometry parameter problems.']
)},
'Pure Mathematics: Circular Measure':{part:'p1',note:makeNote(
 'Use radians naturally in arc, sector and mixed geometry problems, converting between degrees and radians and combining circle formulas with triangle geometry.',
 [
  ['Radian','One radian subtends an arc equal in length to the radius.'],
  ['Degree-radian conversion','180°=π radians, so convert before using formulas that require radians.'],
  ['Arc length','For θ in radians, arc length is rθ.'],
  ['Sector area','For θ in radians, sector area is ½r²θ.'],
  ['Mixed regions','Many problems combine sectors with triangles, chords or segments; split the figure into manageable pieces.'],
  ['Triangle area','Use ½ab sin C when two sides and the included angle are known.']
 ],
 ['s=rθ','A=½r²θ','triangle area=½ab sin C','180°=π rad'],
 [
  'Mark every angle and state whether it is in degrees or radians.',
  'Convert once at the beginning and keep exact π forms where practical.',
  'Break composite areas into sector and triangle pieces.',
  'Check whether the requested perimeter includes radii, chords or arcs.'
 ],
 [
  'The formulas s=rθ and ½r²θ require θ in radians.',
  'A segment is sector minus triangle, not merely a sector.',
  'Perimeter questions often include straight edges as well as arcs.',
  'Use exact radians during working to reduce rounding error.'
 ],
 ['Using degrees directly in rθ','Confusing sector and segment area','Forgetting radii in a sector perimeter','Rounding π too early'],
 ['What is the geometric definition of one radian?','How is 60° written in radians?','How do you find a minor segment area?','Why must θ be in radians for s=rθ?','What extra lengths may appear in a sector perimeter?'],
 ['Use RocketRevise Pure 1 circular-measure topic sets for arc/sector practice.','Use exam-mate Paper 1 full papers for multi-step sector/triangle questions.']
)},
'Pure Mathematics: Trigonometry':{part:'p1',note:makeNote(
 'Read and sketch sine, cosine and tangent graphs, use exact values and identities, and solve trigonometric equations completely over stated intervals.',
 [
  ['Trig graphs','Know periods, zeros, maxima/minima and asymptotes of sin, cos and tan, then apply simple transformations.'],
  ['Exact values','Use exact sin, cos and tan values for 30°, 45°, 60° and related angles.'],
  ['Inverse trig notation','sin⁻¹, cos⁻¹ and tan⁻¹ return principal values; use them as starting values, not complete solution sets.'],
  ['Core identities','tan θ=sin θ/cos θ and sin²θ+cos²θ=1 support simplification and equation solving.'],
  ['Equation solving','Find a reference/principal angle, identify all relevant quadrants or periods, and retain only solutions inside the stated interval.'],
  ['Degrees and radians','Questions may use either; calculator mode and interval units must agree.']
 ],
 ['tanθ=sinθ/cosθ','sin²θ+cos²θ=1'],
 [
  'Sketch one period before solving transformed trig equations.',
  'Find all solutions over the requested interval, not just the calculator principal value.',
  'Use identities to rewrite an equation into one trig function where possible.',
  'Check calculator mode against the interval units.'
 ],
 [
  'tan has period π, while sin and cos have period 2π.',
  'Inverse-trig output is not the full set of solutions.',
  'Exact values should remain exact when requested.',
  'Squaring an equation can introduce extraneous roots, so verify.'
 ],
 ['Giving only one trig solution','Mixing degree and radian modes','Writing tanθ=cosθ/sinθ','Forgetting tangent asymptotes'],
 ['Why can an inverse-trig answer be only the first step?','What is the period of tan x?','How do you solve sin x=k over a full interval?','Which identity converts tan to sin and cos?','Why should a transformed trig graph be sketched before solving?'],
 ['Use RocketRevise Pure 1 trigonometry topical questions for interval-solving fluency.','Use exam-mate Paper 1 papers to practise trigonometry mixed with functions and calculus.']
)},
'Pure Mathematics: Series':{part:'p1',note:makeNote(
 'Handle binomial expansion, arithmetic and geometric progressions, finite sums and convergent infinite geometric series.',
 [
  ['Binomial expansion','Expand (a+b)ⁿ for positive integer n using binomial coefficients.'],
  ['Factorial and combinations','nCr=n!/[r!(n-r)!] supplies coefficients in the expansion.'],
  ['Arithmetic progression','Successive terms differ by a constant d; nth term and finite sum formulas model the sequence.'],
  ['Geometric progression','Successive terms have constant ratio r; use nth-term and finite-sum formulas.'],
  ['Convergence','An infinite geometric series converges only when |r|<1.'],
  ['Sum to infinity','When |r|<1, S∞=a/(1-r).'],
  ['Modelling','Translate wording into first term, common difference/ratio and term number before selecting a formula.']
 ],
 ['AP: uₙ=a+(n-1)d','AP: Sₙ=n/2[2a+(n-1)d]','GP: uₙ=arⁿ⁻¹','GP: Sₙ=a(1-rⁿ)/(1-r)','GP: S∞=a/(1-r), |r|<1','nCr=n!/[r!(n-r)!]'],
 [
  'Identify whether change is additive or multiplicative before calling a sequence AP or GP.',
  'For binomial terms, write the general r-th choice carefully before extracting a coefficient.',
  'Use exact fractions for ratios where possible.',
  'Check |r|<1 before using a sum-to-infinity formula.'
 ],
 [
  'Do not use S∞ when |r|≥1.',
  'Term number n and binomial-selection index r are different quantities.',
  'A decreasing GP can still have negative ratio and alternate signs.',
  'For word problems, define the first modelled term clearly.'
 ],
 ['Using AP formulas on multiplicative growth','Using nPr instead of nCr for binomial coefficients','Ignoring |r|<1','Off-by-one errors in arⁿ⁻¹'],
 ['How do you distinguish an AP from a GP?','What condition makes a GP converge?','How is a binomial coefficient calculated?','What is the nth term of a GP?','Why is the exponent n-1 rather than n in arⁿ⁻¹?'],
 ['Use RocketRevise Pure 1 binomial and series topical sets.','Use exam-mate Paper 1 full papers for mixed progression/modelling questions.']
)},
'Pure Mathematics: Differentiation':{part:'p1',note:makeNote(
 'Understand derivative as local gradient, differentiate powers and composites, and apply derivatives to tangents, normals, rates of change and stationary-point analysis.',
 [
  ['Derivative as gradient','f′(x) gives instantaneous rate of change or tangent gradient; conceptually it is the limit of chord gradients.'],
  ['Power rule','Differentiate xⁿ as nxⁿ⁻¹ for rational n where the expression is defined.'],
  ['Chain rule','For a composite function, multiply the derivative of the outer function by the derivative of the inner function.'],
  ['Tangents and normals','At x=a, tangent gradient is f′(a); non-vertical normal gradient is -1/f′(a).'],
  ['Increasing/decreasing','The sign of f′ determines local increase or decrease.'],
  ['Stationary points','Solve f′(x)=0, then classify using sign change or second derivative.'],
  ['Connected rates','Differentiate a relation with respect to time and connect rates using the chain rule.'],
  ['Graph sketching','Stationary points and derivative signs help determine graph shape; points of inflexion are not a required classification here.']
 ],
 ['d/dx(xⁿ)=nxⁿ⁻¹','normal gradient=-1/(tangent gradient)'],
 [
  'Differentiate before substituting a point unless the structure makes another order clearly easier.',
  'For composites, identify inner and outer functions explicitly.',
  'At a stationary point, classification requires more than f′=0.',
  'For connected rates, write the geometric relation first, then differentiate with respect to time.'
 ],
 [
  'Do not confuse f′ with f.',
  'A stationary point is not automatically a maximum.',
  'Normal gradient formula fails when tangent gradient is zero unless treated geometrically.',
  'Keep units in connected-rate answers.'
 ],
 ['Dropping the inner derivative in chain rule','Calling every stationary point a maximum/minimum without testing','Using tangent gradient for the normal','Substituting numerical values before differentiating a rate relation'],
 ['What does f′(a) represent geometrically?','How can f″ classify a stationary point?','Why is chain rule needed for (3x+1)⁵?','How do you obtain a normal equation?','What is the first step in a connected-rates problem?'],
 ['Use RocketRevise Pure 1 differentiation topical questions for technique.','Use exam-mate Paper 1 papers for optimization and connected-rate problems in context.']
)},
'Pure Mathematics: Integration':{part:'p1',note:makeNote(
 'Treat integration as reverse differentiation, evaluate definite integrals, determine constants, and find areas and volumes of revolution.',
 [
  ['Indefinite integration','Reverse the power rule and include an arbitrary constant.'],
  ['Linear composite powers','Integrate (ax+b)ⁿ by accounting for the inner derivative factor.'],
  ['Constant of integration','Use a point on the curve or another condition to determine C.'],
  ['Definite integral','Evaluate an antiderivative at upper and lower limits to obtain signed accumulation.'],
  ['Area','Use definite integrals with careful treatment of curves below the axis and intersections between curves.'],
  ['Area between curves','Integrate upper minus lower after finding intersection limits.'],
  ['Volume of revolution','For rotation about an axis, use π∫(radius)² dx or the corresponding y-form, subtracting inner radius squared for a hollow region.']
 ],
 ['∫xⁿdx=xⁿ⁺¹/(n+1)+C, n≠-1','area=∫y dx','V about x-axis=π∫y²dx'],
 [
  'Find intersection points before setting area limits.',
  'Sketch the region so upper/lower curves and rotation radius are unambiguous.',
  'Include C only for indefinite integrals.',
  'For volume around an axis, square the distance to the axis, not simply the function label if the region is offset.'
 ],
 [
  'Definite integrals give signed area, while geometric area is non-negative.',
  'Volumes require a squared radius.',
  'A region not touching the axis may require outer-minus-inner radii.',
  'Do not forget the constant in an indefinite integral.'
 ],
 ['Forgetting +C','Integrating lower-upper instead of upper-lower without correcting sign','Using π∫y dx for volume','Missing an inner radius in an annular volume'],
 ['What is the difference between definite integral and geometric area?','How is C determined?','Why is y squared in a volume-of-revolution formula?','How do you find the area between two curves?','When is +C required?'],
 ['Use RocketRevise Pure 1 integration topical sets for area/volume technique.','Use exam-mate Paper 1 full papers for mixed calculus.']
)},

'Pure Mathematics 2: Algebra':{part:'p2',note:makeNote(
 'Extend P1 algebra to modulus equations and inequalities, polynomial division, and factor/remainder theorem problems.',
 [
  ['Modulus','|x| represents distance from zero; |x-a| represents distance from a.'],
  ['Modulus graphs','For y=|ax+b|, reflect negative parts of the linear graph above the x-axis.'],
  ['Modulus equations','Relations such as |a|=|b| imply a²=b² and can simplify symmetric equations.'],
  ['Modulus inequalities','Interpret |x-a|<b as a-b<x<a+b when b>0; split more complicated forms carefully.'],
  ['Polynomial division','Divide polynomials of degree up to 4 by linear or quadratic polynomials and track quotient plus remainder.'],
  ['Remainder theorem','Remainder on division by x-a is f(a); adapt carefully for factors ax+b.'],
  ['Factor theorem','x-a is a factor exactly when f(a)=0, enabling polynomial factorisation and equation solving.']
 ],
 ['f(x)=(divisor)(quotient)+remainder','x-a factor ⇔ f(a)=0'],
 [
  'For modulus equations, identify breakpoints before piecewise solving when no simpler identity applies.',
  'For inequalities, sketch or use sign intervals and verify boundary inclusion.',
  'In polynomial division, align missing powers with zero coefficients.',
  'For a factor ax+b, use its root x=-b/a in factor/remainder reasoning.'
 ],
 [
  'Do not remove modulus bars without considering sign.',
  'Strict inequalities exclude equality boundaries.',
  'Remainders from quadratic division may be linear.',
  'The factor theorem proves divisibility only when the remainder is zero.'
 ],
 ['Treating |x| as ±x in the same branch','Forgetting missing polynomial terms during division','Using f(a) for divisor ax+b without finding its root','Including boundaries in a strict modulus inequality'],
 ['How does |x-a| represent distance?','What is the remainder when dividing f(x) by x-a?','How do you test whether x-a is a factor?','What shape is y=|2x-3|?','Why can a quadratic divisor have a linear remainder?'],
 ['Use RocketRevise 9709 topical practice where available for factor/remainder and modulus-type algebra.','Use exam-mate Paper 2 yearly/full-paper sets for authentic P2 timing and mixed algebra.']
)},
'Pure Mathematics 2: Logarithmic and Exponential Functions':{part:'p2',note:makeNote(
 'Use logarithm laws, eˣ and ln x as inverse functions, solve exponential equations and linearise relationships to determine unknown constants.',
 [
  ['Logs and indices','log laws restate index laws: products become sums, quotients become differences and powers become multipliers.'],
  ['Natural exponential','eˣ is positive for all real x and has inverse ln x on x>0.'],
  ['Inverse relationship','ln(eˣ)=x and e^(ln x)=x for x>0.'],
  ['Exponential equations','Rewrite to a common base when possible or take logarithms when the unknown appears in an exponent.'],
  ['Exponential inequalities','Because a^x is increasing for a>1 and decreasing for 0<a<1, inequality direction reasoning depends on base behaviour.'],
  ['Linearisation power law','y=kxⁿ gives ln y=ln k+n ln x, so gradient n and intercept ln k can be read from ln y against ln x.'],
  ['Linearisation exponential law','y=k aˣ gives ln y=ln k+x ln a, so gradient ln a and intercept ln k can be interpreted.']
 ],
 ['ln(ab)=ln a+ln b','ln(a/b)=ln a-ln b','ln(aᵏ)=k ln a','ln(eˣ)=x'],
 [
  'Check logarithm arguments are positive.',
  'When linearising, identify which transformed variables belong on each axis.',
  'After reading a log-space intercept, exponentiate to recover the original constant.',
  'For inequalities, consider whether the exponential base is increasing or decreasing.'
 ],
 [
  'Do not write ln(a+b)=ln a+ln b.',
  'ln x is defined only for x>0 in real mathematics.',
  'A graph intercept ln k is not k itself.',
  'Change-of-base formula is not required by this syllabus component.'
 ],
 ['Splitting logarithm of a sum','Forgetting to exponentiate an intercept','Ignoring domain restrictions','Reversing an exponential inequality without checking the base'],
 ['What is the inverse of eˣ?','How does y=kxⁿ become linear in logarithmic coordinates?','What must be true of a logarithm argument?','How do you recover k from intercept ln k?','Why can base size affect inequality direction?'],
 ['Use RocketRevise 9709 topical sets where they cover P2 log/exponential skills.','Use exam-mate Paper 2 full papers for mixed logarithm and linearisation questions.']
)},
'Pure Mathematics 2: Trigonometry':{part:'p2',note:makeNote(
 'Extend trigonometry to secant, cosecant and cotangent, compound/double-angle identities, and R-form transformations for solving harder equations.',
 [
  ['Reciprocal functions','sec x=1/cos x, cosec x=1/sin x, cot x=1/tan x; know their graphs, domains and asymptotes.'],
  ['Pythagorean extensions','1+tan²x=sec²x and 1+cot²x=cosec²x.'],
  ['Compound angles','Use sin(A±B), cos(A±B) and tan(A±B) expansions to simplify and evaluate.'],
  ['Double angles','Use sin2A, cos2A and tan2A identities in equations and exact evaluation.'],
  ['R-form','Write a sinθ+b cosθ as R sin(θ+α) or R cos(θ-α), where R=√(a²+b²), with α determined by coefficient matching.'],
  ['Equation solving','Identity transformations should reduce an equation to a manageable trig form before interval solving.'],
  ['Function graphs','All six trig functions may be used for angles of any magnitude, so period and asymptote control remain essential.']
 ],
 ['sec²x=1+tan²x','cosec²x=1+cot²x','sin(A±B)=sinA cosB±cosA sinB','cos(A±B)=cosA cosB∓sinA sinB','R=√(a²+b²)'],
 [
  'Choose identities to reduce the number of different trig functions.',
  'For R-form, expand the proposed form and match coefficients before finding α.',
  'Preserve interval and unit information through every transformation.',
  'Reject values that make an original reciprocal function undefined.'
 ],
 [
  'Do not cancel trig expressions across sums.',
  'Reciprocal functions are undefined where their denominators vanish.',
  'When squaring or transforming, check candidate roots in the original equation.',
  'Use the correct sign pattern in compound-angle formulas.'
 ],
 ['Confusing sec with cos⁻¹','Wrong sign in cos(A±B)','Finding R but not α','Keeping solutions at excluded asymptotes'],
 ['How is sec related to cos?','What identity links tan and sec?','How is R found in a sinx+b cosx?','Why must transformed roots be checked?','Which compound-angle formula gives cos(A+B)?'],
 ['Use RocketRevise topical trigonometry sets where aligned with 9709 P2 skills.','Use exam-mate Paper 2 full papers for R-form and compound-angle work under time pressure.']
)},
'Pure Mathematics 2: Differentiation':{part:'p2',note:makeNote(
 'Differentiate exponential, logarithmic and trigonometric functions, products, quotients, parametric curves and implicit relations.',
 [
  ['Standard derivatives','Know derivatives of eˣ, ln x, sin x, cos x and tan x.'],
  ['Composite derivatives','Combine standard derivatives with chain rule for expressions such as e^(f(x)) or ln(g(x)).'],
  ['Product rule','Differentiate uv as u′v+uv′.'],
  ['Quotient rule','Differentiate u/v as (u′v-uv′)/v².'],
  ['Parametric differentiation','dy/dx=(dy/dt)/(dx/dt), provided dx/dt≠0.'],
  ['Implicit differentiation','Differentiate both sides with respect to x, treating y as a function of x and applying chain rule to y-terms.'],
  ['Tangents and normals','Use the resulting derivative at the specified point to form line equations.']
 ],
 ['d/dx(eˣ)=eˣ','d/dx(ln x)=1/x','d/dx(sin x)=cos x','d/dx(cos x)=-sin x','d/dx(tan x)=sec²x','(uv)′=u′v+uv′','(u/v)′=(u′v-uv′)/v²','dy/dx=(dy/dt)/(dx/dt)'],
 [
  'Identify structure before differentiating: composite, product, quotient, parametric or implicit.',
  'For implicit differentiation, every derivative of a y-expression needs dy/dx through the chain rule.',
  'For parametric questions, simplify dy/dt and dx/dt before dividing if helpful.',
  'Use exact point coordinates in tangent/normal equations.'
 ],
 [
  'Do not use product rule on a simple composite.',
  'Quotient-rule numerator order matters.',
  'Implicit y² differentiates to 2y dy/dx, not 2y.',
  'Parametric dy/dx is a ratio of derivatives, not y/x.'
 ],
 ['Forgetting dy/dx in implicit differentiation','Reversing quotient-rule numerator','Missing the inner derivative in e^(3x)','Using dx/dy instead of dy/dx in parametric work'],
 ['How do you differentiate ln(2x+1)?','What is the product rule?','How is dy/dx found parametrically?','Why does d(y²)/dx include dy/dx?','How is a normal gradient obtained after implicit differentiation?'],
 ['Use RocketRevise differentiation topical practice where P2-standard derivatives are covered.','Use exam-mate Paper 2 papers for mixed product/quotient/implicit/parametric differentiation.']
)},
'Pure Mathematics 2: Integration':{part:'p2',note:makeNote(
 'Extend reverse differentiation to exponential, reciprocal-linear and trigonometric forms, use identities during integration, and apply the trapezium rule.',
 [
  ['Exponential integration','Integrate e^(ax+b) by dividing by the inner derivative a.'],
  ['Reciprocal-linear form','∫1/(ax+b) dx=(1/a)ln|ax+b|+C.'],
  ['Trig integration','Integrate sin(ax+b), cos(ax+b) and sec²(ax+b) with the appropriate inner-factor adjustment.'],
  ['Trig identities','Use identities such as double-angle forms to rewrite powers like sin²x or cos²x before integrating.'],
  ['Definite integrals','Evaluate antiderivatives at bounds and retain exact forms where sensible.'],
  ['Trapezium rule','Approximate a definite integral from equally spaced ordinates using endpoint and interior weights.'],
  ['Over/under-estimate','Use the curvature of the graph to judge whether trapezia lie mainly above or below the curve.']
 ],
 ['∫e^(ax+b)dx=(1/a)e^(ax+b)+C','∫1/(ax+b)dx=(1/a)ln|ax+b|+C','∫sin(ax+b)dx=-(1/a)cos(ax+b)+C','∫cos(ax+b)dx=(1/a)sin(ax+b)+C','∫sec²(ax+b)dx=(1/a)tan(ax+b)+C','trapezium ≈ h/2[y₀+yₙ+2(y₁+...+yₙ₋₁)]'],
 [
  'Match the integrand to a known derivative pattern before manipulating.',
  'Use identities to convert trig powers into integrable standard forms.',
  'In trapezium questions, verify equal spacing h and count all ordinates.',
  'Use a quick sketch to reason about over- or under-estimation.'
 ],
 [
  'The logarithmic antiderivative needs the 1/a factor.',
  'Integrating sin introduces a negative sign.',
  'The trapezium rule approximates area/integral, not an antiderivative formula.',
  'Do not double the endpoint ordinates.'
 ],
 ['Missing inner-factor division','Dropping | | in ln|ax+b|','Wrong trapezium weights','Using a trig identity that does not simplify the power'],
 ['How do you integrate e^(3x+1)?','Why does ∫1/(ax+b) contain 1/a?','How can sin²x be rewritten for integration?','What are the trapezium endpoint weights?','How can graph curvature suggest over/under-estimate?'],
 ['Use RocketRevise topical integration/trapezium practice where aligned with 9709 P2.','Use exam-mate Paper 2 full papers for mixed integration and numerical approximation.']
)},
'Pure Mathematics 2: Numerical Solution of Equations':{part:'p2',note:makeNote(
 'Locate roots by sign changes and use iterative formulas to generate convergent approximations to a required accuracy.',
 [
  ['Root bracketing','If a continuous function changes sign between a and b, there is at least one root in that interval.'],
  ['Graphical location','A root is an x-coordinate where y=f(x) crosses or touches the x-axis; graphs can guide initial intervals.'],
  ['Iteration','A recurrence xₙ₊₁=F(xₙ) generates successive approximations from a chosen starting value.'],
  ['Equation-rearrangement link','An iteration comes from rearranging the target equation into x=F(x).'],
  ['Convergence','A given iteration may converge or fail; the syllabus expects recognition of behaviour without requiring the formal derivative convergence criterion.'],
  ['Accuracy','Continue until successive values justify the requested decimal-place/significant-figure accuracy, then state the rounded root.'],
  ['Verification','Substitute the final approximation into the original equation or check the sign bracket when appropriate.']
 ],
 ['xₙ₊₁=F(xₙ)'],
 [
  'Define f(x) clearly before evaluating signs.',
  'Use consecutive integers or another requested interval to demonstrate a sign change.',
  'Write several iteration values clearly so convergence is visible.',
  'Do not stop merely because two calculator displays look similar; connect the values to the requested accuracy.'
 ],
 [
  'A sign change guarantees a root only under continuity.',
  'An iteration formula is not automatically convergent.',
  'Round only after enough stable digits are established.',
  'Keep the original equation separate from the rearranged iterative form.'
 ],
 ['Claiming a root from same-sign endpoints','Stopping iteration too early','Using xₙ where xₙ₊₁ is required','Forgetting that a rearrangement may diverge'],
 ['How can a sign change locate a root?','How is xₙ₊₁=F(xₙ) related to the original equation?','What does convergence look like numerically?','How do you justify a root to 3 d.p.?','Why may one rearrangement converge while another fails?'],
 ['Use RocketRevise numerical-method topical practice if available for 9709 P2.','Use exam-mate Paper 2 full papers for iteration questions in authentic exam format.']
)},

'Mechanics: Forces and Equilibrium':{part:'p4',note:makeNote(
 'Model particles under forces, resolve components, apply equilibrium, normal reaction and limiting friction, and use Newton’s third law correctly.',
 [
  ['Force diagrams','Show every force acting on the chosen particle, with clear directions and labels.'],
  ['Components and resultants','Resolve forces along convenient perpendicular directions, especially parallel/perpendicular to an inclined plane.'],
  ['Equilibrium','A particle in equilibrium has zero resultant force, so component sums are zero in every direction.'],
  ['Normal reaction','The contact normal acts perpendicular to a surface; it is not automatically equal to weight.'],
  ['Friction','Friction opposes relative or impending motion along the contact surface.'],
  ['Limiting friction','At limiting equilibrium F=μR; before the limiting state, F≤μR.'],
  ['Smooth contact','A smooth surface is modelled with no friction.'],
  ['Newton third law','Interaction forces are equal and opposite and act on different bodies.']
 ],
 ['limiting friction F=μR','equilibrium: ΣF=0'],
 [
  'Choose axes along and perpendicular to a slope whenever this reduces trigonometry.',
  'Decide the likely direction of impending motion before assigning friction direction.',
  'Use F=μR only when the contact is stated or shown to be limiting.',
  'Separate forces acting on different particles before applying Newton’s third law.'
 ],
 [
  'Normal reaction is not always mg.',
  'Friction does not always equal μR.',
  'Equilibrium means resultant force zero, not absence of forces.',
  'Third-law force pairs never act on the same free-body diagram for one particle.'
 ],
 ['Using F=μR in non-limiting equilibrium','Pointing friction in the same direction as impending motion','Resolving weight with sine/cosine swapped','Cancelling a third-law pair on one body'],
 ['When can F=μR be used?','How do you choose friction direction?','Why can R differ from mg?','What does equilibrium mean in component form?','Why do Newton-third-law forces not cancel on one object?'],
 ['Use RocketRevise Mechanics topical sets for equilibrium, F=ma and slope force diagrams.','Use exam-mate Paper 4 full papers for mixed force/friction timing.']
)},
'Mechanics: Kinematics':{part:'p4',note:makeNote(
 'Model one-dimensional motion using displacement, velocity and acceleration, graphs, calculus and constant-acceleration equations.',
 [
  ['Scalar and vector quantities','Distance and speed are scalar; displacement, velocity and acceleration carry sign/direction in one dimension.'],
  ['Displacement-time graph','Gradient gives velocity.'],
  ['Velocity-time graph','Gradient gives acceleration and signed area gives displacement.'],
  ['Calculus links','v=ds/dt and a=dv/dt; integration reverses these relationships.'],
  ['Constant acceleration','Use SUVAT equations only when acceleration is constant over the interval.'],
  ['Multiple particles','Different particles may require separate equations connected by shared times, positions or meeting conditions.'],
  ['Direction changes','Velocity changing sign indicates reversal of direction; speed is |v|.']
 ],
 ['v=u+at','s=ut+½at²','v²=u²+2as','s=½(u+v)t','v=ds/dt','a=dv/dt'],
 [
  'Choose a positive direction once and preserve signs.',
  'Check whether acceleration is constant before selecting SUVAT.',
  'For graph questions, distinguish gradient from area.',
  'For meeting/overtaking problems, define displacement from a common origin or write a clear position equation for each particle.'
 ],
 [
  'Negative acceleration does not automatically mean slowing down.',
  'Area under a velocity graph is displacement, not always distance.',
  'SUVAT is invalid for variable acceleration unless applied piecewise to constant sections.',
  'Use the same time variable carefully when motions are linked.'
 ],
 ['Using speed where signed velocity is required','Ignoring area below the time axis','Using SUVAT with a(t)','Mixing the origins of two particle displacements'],
 ['What does the area under a v-t graph represent?','How are v and s related by calculus?','When is SUVAT valid?','How do you find distance when velocity changes sign?','What condition represents two particles meeting?'],
 ['Use RocketRevise Mechanics SUVAT and calculus topical sets.','Use exam-mate Paper 4 full papers for multi-particle kinematics.']
)},
'Mechanics: Momentum':{part:'p4',note:makeNote(
 'Use signed linear momentum and conservation of momentum to solve one-dimensional direct-impact problems, including coalescence.',
 [
  ['Momentum','Linear momentum is mass times velocity and is signed in one-dimensional problems.'],
  ['Conservation','For the modelled isolated impact, total momentum before equals total momentum after.'],
  ['Direct impact','All velocities lie along one line, so a consistent positive direction converts vector conservation into signed algebra.'],
  ['Coalescence','If bodies stick together, they share one common velocity immediately after impact.'],
  ['System choice','Choose both colliding bodies as the system so internal impulsive forces do not alter total system momentum.'],
  ['Model limits','Impulse and coefficient of restitution are not required for Paper 4, so do not introduce unnecessary methods.']
 ],
 ['momentum p=mv','Σmv before = Σmv after'],
 [
  'Choose and state a positive direction before assigning velocity signs.',
  'Write one conservation equation for the whole collision system.',
  'If particles coalesce, use a common final velocity.',
  'Check that the sign and magnitude of the answer make physical sense.'
 ],
 [
  'Momentum is vector, even though Paper 4 uses one-dimensional algebra.',
  'Kinetic energy is not generally conserved in these questions.',
  'Coalescence is an inelastic event but still conserves momentum in the impact model.',
  'Do not use speed magnitudes without signs.'
 ],
 ['Adding momentum magnitudes regardless of direction','Assuming KE conservation','Giving two final velocities after coalescence','Introducing restitution when not in syllabus'],
 ['Why must velocity signs be used?','What changes when bodies coalesce?','Why can momentum be conserved while kinetic energy changes?','What system should be chosen for an impact?','Which extra collision concepts are explicitly not required?'],
 ['Use RocketRevise Mechanics momentum topical sets.','Use exam-mate Paper 4 full papers for momentum mixed with earlier mechanics.']
)},
'Mechanics: Newton’s Laws of Motion':{part:'p4',note:makeNote(
 'Apply Newton’s laws to particles under constant forces, including friction, tension, thrust, vertical motion, inclines and connected-particle systems.',
 [
  ['Newton second law','For a particle of constant mass, resultant force in a chosen direction equals ma.'],
  ['Weight','Weight has magnitude mg vertically downward; Paper 4 typically expects g≈10 m s⁻² unless told otherwise.'],
  ['Inclined planes','Resolve weight into components parallel and perpendicular to the plane, then include friction or other forces.'],
  ['Tension and thrust','Light inextensible strings transmit tension; rigid connecting rods may exert tension or thrust.'],
  ['Connected particles','An inextensible string means connected particles share acceleration magnitude while the string remains taut.'],
  ['Smooth pulley model','A smooth pulley changes tension direction without changing its magnitude in the ideal model.'],
  ['Changing motion direction','On a rough slope, acceleration while moving up may differ from acceleration while moving down because friction reverses direction.'],
  ['Newton third law','Contact forces between linked bodies are paired but equations must be written for each chosen particle/system.']
 ],
 ['ΣF=ma','W=mg'],
 [
  'Draw separate free-body diagrams for each particle.',
  'Choose positive directions compatible with the connected motion.',
  'Write one F=ma equation per independent particle, then solve simultaneously.',
  'Reassess friction direction if the particle reverses direction.'
 ],
 [
  'Use g=10 m s⁻² when the Paper 4 convention applies unless the question specifies otherwise.',
  'Do not assume tension equals weight.',
  'Connected particles share acceleration constraints, not necessarily equal forces.',
  'A car-trailer or pulley problem may be easier by first treating the whole system, then one part.'
 ],
 ['Missing a force on the free-body diagram','Using different acceleration magnitudes for a taut string','Keeping friction direction unchanged after reversal','Setting tension equal on unrelated strings'],
 ['What equation represents Newton’s second law?','How do connected particles share acceleration?','Why can acceleration differ on upward vs downward slope motion?','When is tension equal through a pulley?','How can a whole-system equation simplify a towing problem?'],
 ['Use RocketRevise Mechanics F=ma, pulleys and slope topical sets.','Use exam-mate Paper 4 full papers for connected-particle systems.']
)},
'Mechanics: Energy, Work and Power':{part:'p4',note:makeNote(
 'Use work, kinetic and gravitational potential energy, conservation of energy and power to solve mechanical motion problems.',
 [
  ['Work','A constant force F through displacement d at angle θ does work Fd cosθ.'],
  ['Kinetic energy','A particle of mass m and speed v has kinetic energy ½mv².'],
  ['Gravitational potential energy','Near Earth, change in GPE is mgΔh.'],
  ['Work-energy principle','Change in mechanical energy equals work done by relevant external/non-conservative forces in the chosen system model.'],
  ['Energy conservation','If no dissipative work acts, total mechanical energy can be conserved between positions.'],
  ['Power','Power is rate of doing work; average power=W/t.'],
  ['Instantaneous power','For a force acting in the direction of motion, P=Fv.'],
  ['Hill/resistance problems','Combine P=Fv with resultant force and F=ma to determine instantaneous acceleration.']
 ],
 ['W=Fd cosθ','KE=½mv²','ΔGPE=mgΔh','P=W/t','P=Fv'],
 [
  'Choose initial and final states before writing an energy equation.',
  'Use vertical height change for GPE, not distance along a slope.',
  'Include work against resistance with the correct sign.',
  'For instantaneous acceleration from power, convert power to driving force using P=Fv before applying F=ma.'
 ],
 [
  'Energy methods may avoid finding time or acceleration entirely.',
  'P=Fv requires the force component along the velocity direction.',
  'Work can be negative when force opposes displacement.',
  'Average power and instantaneous power are different ideas.'
 ],
 ['Using slope length instead of vertical height in mgh','Forgetting resistance work','Using P=Fv with perpendicular force','Confusing energy and power units'],
 ['When is work Fd cosθ?','What height belongs in mgh?','How can power determine driving force?','When is mechanical energy conserved?','Why can work be negative?'],
 ['Use RocketRevise Mechanics energy/work/power topical sets.','Use exam-mate Paper 4 full papers for mixed energy and dynamics questions.']
)},

'Statistics: Data Representation':{part:'p5',note:makeNote(
 'Choose and interpret statistical representations, compare data with measures of centre/spread, and calculate mean and standard deviation including grouped and coded data.',
 [
  ['Representation choice','Stem-and-leaf, box plots, histograms and cumulative-frequency graphs answer different questions about shape, spread and location.'],
  ['Histogram','For unequal class widths, bar area represents frequency, so height is frequency density.'],
  ['Cumulative frequency','Use the cumulative curve to estimate median, quartiles, percentiles and proportions.'],
  ['Central tendency','Mean uses all values; median is resistant to extremes; mode identifies most frequent value/class.'],
  ['Spread','Range and IQR describe width; standard deviation measures spread around the mean.'],
  ['Grouped data','Use class midpoints for estimated mean/standard deviation when only grouped intervals are available.'],
  ['Coded data','Transforming data can simplify totals; decode mean and standard deviation correctly afterward.'],
  ['Comparison','A good comparison comments on both location and spread and, when appropriate, skew/outliers.']
 ],
 ['frequency density=frequency/class width','mean=Σx/n','variance=Σx²/n-(Σx/n)²','IQR=Q₃-Q₁'],
 [
  'Check class widths before drawing histogram bars.',
  'On a cumulative graph, locate the correct cumulative-frequency level before reading x.',
  'For grouped calculations, state that results are estimates.',
  'When comparing datasets, make paired statements using the same statistic.'
 ],
 [
  'Histogram vertical axis is frequency density when widths differ.',
  'Standard deviation is not the same as variance.',
  'A box plot does not show individual frequencies inside quartile sections.',
  'Grouped means/SDs use midpoint assumptions.'
 ],
 ['Using frequency as histogram height with unequal classes','Comparing only means','Forgetting to square standard deviation when variance is requested','Treating grouped estimates as exact'],
 ['Why is frequency density needed?','How is IQR read from a cumulative graph?','What does standard deviation measure?','Why are grouped-data means estimates?','What makes a strong comparison of two box plots?'],
 ['Use RocketRevise 9709 Statistics 1 topical practice where available.','Use exam-mate Paper 5 yearly/full-paper sets for complete statistics-paper timing.']
)},
'Statistics: Permutations and Combinations':{part:'p5',note:makeNote(
 'Count selections and arrangements systematically, including repeated objects and adjacency restrictions, while distinguishing permutations from combinations.',
 [
  ['Permutation','Order matters in an arrangement.'],
  ['Combination','Order does not matter in a selection.'],
  ['Factorials','n! counts arrangements of n distinct objects in a line.'],
  ['Selections','nCr counts ways to choose r objects from n without regard to order.'],
  ['Arrangements','nPr counts ordered selections of r objects from n.'],
  ['Repeated objects','Divide by factorials of repeated identical items to correct overcounting.'],
  ['Together restrictions','Treat required adjacent objects as a block, then multiply by internal arrangements.'],
  ['Apart restrictions','Use complement counting or place restricted objects into gaps when suitable.']
 ],
 ['nPr=n!/(n-r)!','nCr=n!/[r!(n-r)!]','repeated arrangements=n!/(a!b!...)'],
 [
  'Ask first whether order matters.',
  'Break multi-stage choices into multiplication steps and mutually exclusive cases into addition steps.',
  'For repeated letters, identify multiplicities before dividing.',
  'For “not together”, complement counting is often shorter than direct casework.'
 ],
 [
  'Circular arrangements are not included in this component.',
  'nCr is selection; nPr is ordered selection.',
  'Identical objects are not distinguishable.',
  'Restrictions can create overlapping cases, so check that cases are disjoint.'
 ],
 ['Using nPr for a committee','Forgetting repeated-letter division','Treating two people as one block but forgetting internal order','Double-counting overlapping cases'],
 ['When does order matter?','How do repeated letters change n!?','How can “must be together” be modelled?','How can “must not be together” be counted by complement?','Why are circular arrangements excluded here?'],
 ['Use topical counting sets for permutations/combinations before mixing probability.','Use exam-mate Paper 5 full papers for restricted arrangement questions under time pressure.']
)},
'Statistics: Probability':{part:'p5',note:makeNote(
 'Calculate probabilities by enumeration and counting, combine events with addition/multiplication rules, distinguish exclusivity from independence, and use conditional probability.',
 [
  ['Sample space','List or count equally likely elementary outcomes when appropriate.'],
  ['Addition','For mutually exclusive events, P(A∪B)=P(A)+P(B); otherwise subtract overlap if needed conceptually.'],
  ['Multiplication','For independent events, P(A∩B)=P(A)P(B).'],
  ['Exclusive events','Mutually exclusive events cannot occur together.'],
  ['Independent events','Occurrence of one event does not change probability of the other.'],
  ['Conditional probability','P(A|B) restricts the sample space to outcomes where B has occurred.'],
  ['Tree diagrams','Multiply along branches and add mutually exclusive complete routes.'],
  ['Counting probability','Permutations/combinations can generate numerator and denominator counts in equiprobable selection problems.']
 ],
 ['P(A|B)=P(A∩B)/P(B)','independent: P(A∩B)=P(A)P(B)'],
 [
  'Define events clearly before calculating.',
  'Decide whether a branch is conditional and whether replacement changes later probabilities.',
  'Use combinations for unordered selections from a set.',
  'Check final probability lies between 0 and 1.'
 ],
 [
  'Exclusive and independent are different ideas.',
  'Without replacement usually changes later branch probabilities.',
  'Conditional probability changes the denominator/sample space.',
  'Do not add probabilities of overlapping events as if they were exclusive.'
 ],
 ['Confusing P(A|B) with P(B|A)','Assuming events are independent without evidence','Forgetting changed totals without replacement','Using permutations when only selections matter'],
 ['How do exclusive and independent events differ?','What does P(A|B) mean?','When can probabilities be multiplied directly?','How does no replacement change a tree?','How can combinations be used in probability?'],
 ['Use topical probability questions after mastering counting.','Use exam-mate Paper 5 full papers for tree, conditional and counting probability in mixed contexts.']
)},
'Statistics: Discrete Random Variables':{part:'p5',note:makeNote(
 'Build discrete probability distributions, calculate expectation and variance, and model repeated-trial situations with binomial and geometric distributions.',
 [
  ['Discrete random variable','A discrete variable takes countable values with probabilities summing to 1.'],
  ['Distribution table','List each possible x with P(X=x) and verify total probability 1.'],
  ['Expectation','E(X)=ΣxP(X=x) is the long-run mean value.'],
  ['Variance','Var(X)=E(X²)-[E(X)]² measures spread; standard deviation is its square root.'],
  ['Binomial model','B(n,p) applies to fixed n independent trials with constant success probability and two outcomes per trial.'],
  ['Binomial probability','P(X=r)=nCr p^r(1-p)^(n-r).'],
  ['Geometric model','Geo(p) models the trial number of the first success with constant independent success probability.'],
  ['Moments','For B(n,p), E=np and Var=np(1-p); for Geo(p), E=1/p.']
 ],
 ['E(X)=ΣxP(X=x)','Var(X)=E(X²)-[E(X)]²','Binomial: P(X=r)=nCr pʳqⁿ⁻ʳ','Binomial: E=np, Var=npq','Geometric: P(X=r)=p(1-p)ʳ⁻¹','Geometric: E=1/p'],
 [
  'Check model conditions before choosing binomial or geometric.',
  'Translate phrases such as “at most”, “at least” and “first success” carefully.',
  'Use complement probabilities when they reduce arithmetic.',
  'Keep variance and standard deviation distinct.'
 ],
 [
  'A binomial variable counts successes in n trials; a geometric variable counts trials until first success.',
  'Probabilities in a distribution must sum to 1.',
  'Variance cannot be negative.',
  'Independence and constant p are model assumptions, not automatic facts.'
 ],
 ['Using binomial for first-success timing','Using geometric for a fixed number of trials','Confusing variance with SD','Misreading “at least”'],
 ['What conditions define a binomial model?','What does a geometric random variable count?','How is E(X) calculated from a table?','How is variance related to E(X²)?','What does “at least 1 success” suggest computationally?'],
 ['Use topical binomial/geometric/discrete-variable practice.','Use exam-mate Paper 5 full papers for distribution selection and modelling.']
)},
'Statistics: Normal Distribution':{part:'p5',note:makeNote(
 'Standardise normal variables, solve forward and inverse probability problems, and approximate binomial distributions using the normal distribution with continuity correction.',
 [
  ['Normal model','A continuous normal distribution is symmetric and determined by mean μ and variance σ².'],
  ['Standardisation','Convert X to Z=(X-μ)/σ before using standard normal tables.'],
  ['Symmetry','Probabilities on opposite sides of μ are related by symmetry.'],
  ['Forward problems','Given μ, σ and a boundary, standardise and read the required tail/interval probability.'],
  ['Inverse problems','Given a probability, find a z-value then form an equation linking x, μ and σ.'],
  ['Normal approximation to binomial','Use when np>5 and nq>5 approximately, with mean np and variance npq.'],
  ['Continuity correction','Adjust integer binomial boundaries by 0.5 when replacing a discrete distribution with a continuous normal model.'],
  ['Working detail','Show standardisation explicitly because the syllabus expects full working.']
 ],
 ['Z=(X-μ)/σ','Binomial approximation: μ=np, σ²=npq'],
 [
  'Sketch a normal curve and shade the requested region.',
  'Write the exact discrete event before applying continuity correction.',
  'Use the table convention provided in the exam correctly.',
  'For inverse problems, work from probability to z before solving for the unknown parameter/boundary.'
 ],
 [
  'Normal is continuous, so single exact-point probability is zero.',
  'Continuity correction belongs to discrete-to-continuous approximation, not ordinary normal questions.',
  'σ is square root of variance.',
  'Check np and nq conditions before approximating a binomial.'
 ],
 ['Using variance where σ is required in z','Wrong ±0.5 correction','Skipping approximation conditions','Reading the wrong normal-table tail'],
 ['How is X standardised?','When is a binomial-normal approximation suitable?','Why is continuity correction needed?','What are μ and σ² for B(n,p)?','How do inverse-normal problems differ from forward ones?'],
 ['Use topical normal-distribution practice for standardisation and continuity correction.','Use exam-mate Paper 5 full papers for complete statistics-paper integration.']
)}
};

const existing=curriculum.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT);
const preservedIds=existing.map(e=>e.id);

function addMissing(title,part,index){
 const meta=componentMeta[part];
 const entry={
  board:'Cambridge International AS & A Level',
  grade:GRADE,
  subject:SUBJECT,
  title,
  order:meta.orderBase+index,
  id:'Cambridge International AS & A Level|'+GRADE+'|'+SUBJECT+'|'+title,
  summary:'',
  keyPoints:[],
  formulas:[],
  method:[],
  mistakes:[],
  sourcePublisher:BOARD,
  sourceBook:meta.sourceBook,
  sourceYear:YEAR,
  component:meta.component
 };
 curriculum.push(entry);
 return entry;
}

const p2Titles=['Pure Mathematics 2: Algebra','Pure Mathematics 2: Logarithmic and Exponential Functions','Pure Mathematics 2: Trigonometry','Pure Mathematics 2: Differentiation','Pure Mathematics 2: Integration','Pure Mathematics 2: Numerical Solution of Equations'];
const p4Missing=['Mechanics: Newton’s Laws of Motion','Mechanics: Energy, Work and Power'];
p2Titles.forEach((t,i)=>{if(!curriculum.some(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT&&e.title===t))addMissing(t,'p2',i+1)});
p4Missing.forEach((t,i)=>{if(!curriculum.some(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT&&e.title===t))addMissing(t,'p4',4+i)});

const p1Titles=['Pure Mathematics: Quadratics','Pure Mathematics: Functions','Pure Mathematics: Coordinate Geometry','Pure Mathematics: Circular Measure','Pure Mathematics: Trigonometry','Pure Mathematics: Series','Pure Mathematics: Differentiation','Pure Mathematics: Integration'];
const p4Titles=['Mechanics: Forces and Equilibrium','Mechanics: Kinematics','Mechanics: Momentum','Mechanics: Newton’s Laws of Motion','Mechanics: Energy, Work and Power'];
const p5Titles=['Statistics: Data Representation','Statistics: Permutations and Combinations','Statistics: Probability','Statistics: Discrete Random Variables','Statistics: Normal Distribution'];

const assignOrder=(titles,part)=>{
 const meta=componentMeta[part];
 titles.forEach((title,i)=>{
  const entry=curriculum.find(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT&&e.title===title);
  if(entry){entry.component=meta.component;entry.sourceBook=meta.sourceBook;entry.order=meta.orderBase+i+1}
 });
};
assignOrder(p1Titles,'p1');assignOrder(p2Titles,'p2');assignOrder(p4Titles,'p4');assignOrder(p5Titles,'p5');

const rendered=[];
for(const [title,spec] of Object.entries(notes)){
 const entry=curriculum.find(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT&&e.title===title);
 if(!entry)continue;
 const patch=spec.note;
 entry.summary=patch.summary;
 entry.keyPoints=patch.keyPoints;
 entry.formulas=patch.formulas;
 entry.method=patch.method;
 entry.mistakes=patch.mistakes;
 entry.lens='Use the official 9709 component scope, show complete mathematical reasoning, and practise topic-by-topic before moving to timed full papers.';
 entry.deepNotes=patch.deepNotes;
 entry.notesVerified=true;
 entry.sourcePublisher=BOARD;
 entry.sourceYear=YEAR;
 entry.noteSourceFile='User-supplied Cambridge International AS & A Level Mathematics 9709 syllabus; RocketRevise topical resources; exam-mate yearly/full-paper resources';
 entry.noteSourceBasis=SOURCE;
 rendered.push({title,id:entry.id,component:entry.component,sourceBook:entry.sourceBook,deepNotes:entry.deepNotes});
}

window.STUDYAI_CAIE_AS_MATHEMATICS_DEEP_NOTES=rendered;
window.STUDYAI_CAIE_AS_MATHEMATICS_DEEP_NOTES_STATUS={
 total:24,
 matched:rendered.length,
 unmatched:Object.keys(notes).filter(t=>!rendered.some(x=>x.title===t)),
 preservedIds,
 componentCounts:{
  'Paper 1':curriculum.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT&&e.component==='Paper 1').length,
  'Paper 2':curriculum.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT&&e.component==='Paper 2').length,
  'Paper 4':curriculum.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT&&e.component==='Paper 4').length,
  'Paper 5':curriculum.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade===GRADE&&e.subject===SUBJECT&&e.component==='Paper 5').length
 }
};

if(typeof window.renderFilters==='function')window.renderFilters();
else if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
