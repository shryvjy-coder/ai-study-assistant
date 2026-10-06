/* StudyAI deep Cambridge International A Level Mathematics notes.
 * Scope authority: user-supplied Cambridge International AS & A Level Mathematics 9709
 * syllabus for 2026 and 2027. RocketRevise is used for topical-practice alignment and
 * exam-mate for full/yearly-paper alignment. Explanations are original.
 */
(() => {
'use strict';

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const BOARD='Cambridge International AS & A Level';
const GRADE='A Level (12)';
const SUBJECT='Mathematics';
const YEAR='2026–2027';
const SOURCE='Official Cambridge International AS & A Level Mathematics 9709 syllabus supplied by the user; RocketRevise used for topical-practice alignment; exam-mate used for full/yearly-paper alignment';

const note=(summary,concepts,formulas,reasoning,examTips,mistakes,selfCheck,practice)=>({
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
   'Sketch graphs, Argand diagrams, vectors, probability densities or geometric configurations whenever the structure controls the algebra.',
   'Label domains, asymptotes, directions, parameters, intervals, exact points and transformed variables so the visual model can be checked against the equations.',
   'Keep exact forms during working and round only at the stage requested by the paper.'
  ],
  examTips,
  distinctions:concepts.slice(0,4).map(x=>x[0]+': '+x[1]),
  quickRevision:concepts.slice(0,6).map(x=>x[0]),
  vocabulary:concepts.slice(0,10).map(x=>x[0]),
  selfCheck,
  practice
 }
});

const notes={
'Pure Mathematics: Algebra':note(
 'Extend algebra to modulus, polynomial division, factor/remainder methods, partial fractions and rational binomial expansions with validity conditions.',
 [
  ['Modulus','Interpret |x-a| as distance and solve modulus equations or inequalities by geometry, squaring where valid, or splitting into sign cases.'],
  ['Polynomial division','Divide polynomials up to degree 4 by linear or quadratic divisors and identify quotient and remainder.'],
  ['Factor theorem','x-a is a factor exactly when f(a)=0; for ax+b use its root x=-b/a.'],
  ['Remainder theorem','The remainder on division by x-a is f(a), with suitable adaptation for non-monic linear divisors.'],
  ['Partial fractions','Decompose rational functions whose denominators match the syllabus forms: distinct linear factors, a repeated linear factor, or a linear factor times an irreducible quadratic.'],
  ['Rational binomial expansion','Use (1+x)^n for rational n with |x|<1 and adapt expressions into the required standard form.'],
  ['Validity interval','When substituting a transformed x-expression into a binomial expansion, derive the corresponding interval in the original variable.'],
  ['Algebraic checking','Recombine partial fractions or substitute test values to verify decomposition before integrating or simplifying further.']
 ],
 ['(1+x)^n = 1 + nx + n(n-1)x²/2! + … for |x|<1','f(x)=(divisor)(quotient)+remainder'],
 [
  'Identify the denominator structure before writing a partial-fraction template.',
  'For rational binomial expansions, factor constants first so the bracket is exactly 1+u with |u|<1.',
  'When using factor/remainder methods, evaluate at the divisor root rather than manipulating long algebra unnecessarily.',
  'Check modulus inequality boundary inclusion at the end.'
 ],
 [
  'A repeated linear factor needs separate A/(ax+b) and B/(ax+b)² terms.',
  'An irreducible quadratic numerator is linear, not a constant only.',
  'Binomial validity is part of the answer when requested.',
  'Do not use a partial-fraction form before making sure the rational function is proper.'
 ],
 ['Forgetting the repeated-factor term','Using a constant numerator over a quadratic factor','Ignoring |u|<1','Applying f(a) when the divisor root is not a'],
 ['What form is used for a repeated linear factor?','How is the factor theorem adapted for ax+b?','Why must a rational function be proper before partial fractions?','How is the validity interval found after a substitution?','What does |x-a| mean geometrically?'],
 ['Use RocketRevise Pure 3 algebra topical sets for partial fractions, factor/remainder and binomial work.','Use exam-mate Paper 3 yearly/full-paper practice once P3 algebra is secure.']
),
'Pure Mathematics: Logarithmic and Exponential Functions':note(
 'Use logarithm laws, e^x and ln x, solve exponential equations and inequalities, and linearise power/exponential models to determine constants.',
 [
  ['Log-index link','Logarithms invert exponentiation and obey product, quotient and power laws.'],
  ['Natural functions','e^x and ln x are inverse functions; understand both graphs and the effect of positive or negative exponential constants.'],
  ['Exponential equations','Rewrite to common bases when useful or take logarithms to isolate an exponent.'],
  ['Exponential inequalities','Use monotonicity: a^x increases for a>1 and decreases for 0<a<1.'],
  ['Power-law linearisation','y=kx^n gives ln y=ln k+n ln x, so gradient n and intercept ln k.'],
  ['Exponential linearisation','y=k a^x gives ln y=ln k+x ln a, so gradient ln a and intercept ln k.'],
  ['Parameter recovery','Convert transformed-graph gradients/intercepts back to the original constants with exponentiation where needed.']
 ],
 ['ln(ab)=ln a+ln b','ln(a/b)=ln a-ln b','ln(a^r)=r ln a','ln(e^x)=x'],
 [
  'Check logarithm arguments are positive before solving.',
  'Choose transformed axes directly from the rearranged linear form.',
  'Recover constants from logarithmic intercepts carefully.',
  'For inequalities, decide whether the exponential function is increasing or decreasing before preserving/reversing inequality direction.'
 ],
 [
  'Change-of-base formula is excluded from required content.',
  'ln(a+b) does not split.',
  'A straight-line intercept of ln k is not k.',
  'Graph gradients must be interpreted in the transformed variables actually plotted.'
 ],
 ['Splitting ln of a sum','Forgetting positivity restrictions','Reading ln k as k','Ignoring base monotonicity in inequalities'],
 ['Why are e^x and ln x inverses?','How is y=kx^n linearised?','What does the gradient represent?','How do you recover k from ln k?','Why can an inequality direction depend on the base?'],
 ['Use RocketRevise Pure 3 log/exponential topical practice.','Use exam-mate Paper 3 full papers for mixed modelling and transformation questions.']
),
'Pure Mathematics: Trigonometry':note(
 'Use all six trigonometric functions, compound/double-angle identities and R-form transformations to simplify expressions and solve demanding equations.',
 [
  ['Reciprocal functions','sec x=1/cos x, cosec x=1/sin x and cot x=1/tan x; understand their graphs and asymptotes.'],
  ['Pythagorean identities','Use sec²x=1+tan²x and cosec²x=1+cot²x.'],
  ['Compound angles','Apply sin(A±B), cos(A±B) and tan(A±B) exactly.'],
  ['Double angles','Use sin2A, cos2A and tan2A and select the form best suited to the expression.'],
  ['R-form','Write a sinθ+b cosθ as R sin(θ+α) or R cos(θ-α), with R=√(a²+b²).'],
  ['Equation strategy','Transform an equation to fewer trig functions, then solve over the stated interval with period and exclusions.'],
  ['Exact evaluation','Use identities to evaluate non-standard exact angles without decimal approximations where possible.']
 ],
 ['sec²x=1+tan²x','cosec²x=1+cot²x','sin(A±B)=sinA cosB±cosA sinB','cos(A±B)=cosA cosB∓sinA sinB','R=√(a²+b²)'],
 [
  'Write the target identity or desired function before choosing transformations.',
  'For R-form, expand and match coefficients to determine α with the correct quadrant.',
  'Track excluded values when reciprocal functions appear.',
  'After algebraic transformations, test candidate roots in the original equation if squaring or multiplying by potentially zero expressions occurred.'
 ],
 [
  'sec is reciprocal cosine, not inverse cosine.',
  'The sign pattern in cos(A±B) differs from sin(A±B).',
  'R alone is not enough; α and its sign matter.',
  'Interval completeness is a major source of lost marks.'
 ],
 ['Confusing reciprocal and inverse trig functions','Wrong compound-angle signs','Missing interval solutions','Keeping roots at asymptotes'],
 ['How is sec related to cos?','What identity links tan and sec?','How is R found?','Why must α be checked by coefficient matching?','When should candidate roots be substituted back?'],
 ['Use RocketRevise Pure 3 trigonometry topical sets.','Use exam-mate Paper 3 full papers for mixed identity/equation questions.']
),
'Pure Mathematics: Differentiation':note(
 'Differentiate advanced exponential, logarithmic, inverse-tangent, trigonometric, product, quotient, parametric and implicit functions and apply the results to geometry.',
 [
  ['Standard derivatives','Use derivatives of e^x, ln x, sin x, cos x, tan x and tan^-1 x.'],
  ['Composite rule','Combine standard derivatives with chain rule for nested functions.'],
  ['Product rule','For y=uv, y′=u′v+uv′.'],
  ['Quotient rule','For y=u/v, y′=(u′v-uv′)/v².'],
  ['Parametric differentiation','If x and y depend on t, dy/dx=(dy/dt)/(dx/dt).'],
  ['Implicit differentiation','Differentiate both sides with respect to x and attach dy/dx to derivatives of y-dependent terms.'],
  ['Tangents and normals','Evaluate dy/dx at the point; the normal gradient is the negative reciprocal when finite/non-zero.'],
  ['Inverse tangent','d/dx(tan^-1 x)=1/(1+x²), with chain-rule extensions for tan^-1(f(x)).']
 ],
 ['d/dx(e^x)=e^x','d/dx(ln x)=1/x','d/dx(tan x)=sec²x','d/dx(tan^-1 x)=1/(1+x²)','(uv)′=u′v+uv′','(u/v)′=(u′v-uv′)/v²','dy/dx=(dy/dt)/(dx/dt)'],
 [
  'Classify the structure before differentiating: composite, product, quotient, parametric or implicit.',
  'Keep dy/dx terms together before solving an implicit derivative.',
  'For parametric tangents, calculate dx/dt and dy/dt separately first.',
  'Use exact coordinates in line equations whenever practical.'
 ],
 [
  'Derivatives of sin^-1 x and cos^-1 x are not required by this syllabus.',
  'tan^-1 means inverse tangent here, unlike sec/cosec/cot reciprocal notation.',
  'Implicit y-terms require chain rule.',
  'A quotient can sometimes simplify before differentiation, reducing error.'
 ],
 ['Forgetting dy/dx in implicit work','Reversing quotient-rule numerator','Missing inner derivatives','Confusing tan^-1 with cotangent'],
 ['What is d/dx(tan^-1 x)?','How is dy/dx found from parametric equations?','Why does d(y²)/dx contain dy/dx?','What is the quotient rule?','How is a normal equation formed?'],
 ['Use RocketRevise Pure 3 differentiation topical practice.','Use exam-mate Paper 3 papers for parametric and implicit differentiation under exam conditions.']
),
'Pure Mathematics: Integration':note(
 'Use advanced standard integrals, partial fractions, recognition of f′/f, integration by parts and given substitutions in definite and indefinite integrals.',
 [
  ['Standard exponential/log forms','Integrate e^(ax+b) and 1/(ax+b) with the correct inner-factor adjustment.'],
  ['Trig standard forms','Integrate sin(ax+b), cos(ax+b), sec²(ax+b) and 1/(a²+x²)-type forms where matched to tan^-1.'],
  ['Trig identities','Rewrite powers/products using identities before integrating when that creates a standard form.'],
  ['Partial fractions','Decompose allowed rational functions and integrate the resulting simpler terms.'],
  ['f′/f recognition','If the numerator is proportional to the derivative of the denominator, logarithmic integration is usually efficient.'],
  ['Integration by parts','Use ∫u dv=uv-∫v du for products such as x sin2x, x²e^-x, ln x or x tan^-1x.'],
  ['Given substitution','Replace variable, differential and limits consistently when a substitution is supplied.'],
  ['Definite versus indefinite','Indefinite integrals require +C; definite integrals are evaluated using transformed or original limits consistently.']
 ],
 ['∫e^(ax+b)dx=(1/a)e^(ax+b)+C','∫1/(ax+b)dx=(1/a)ln|ax+b|+C','∫u dv=uv-∫v du','∫f′(x)/f(x) dx=ln|f(x)|+C'],
 [
  'Inspect for simplification, partial fractions, f′/f or product structure before choosing a technique.',
  'For by parts, choose u so repeated differentiation simplifies the problem.',
  'For substitution, transform dx and every occurrence of x.',
  'If changing definite-integral limits to the new variable, do not change back mid-calculation.'
 ],
 [
  'Partial fractions are restricted to the syllabus denominator types.',
  'The factor 1/a is essential in linear-composite integrals.',
  'Absolute value belongs in general logarithmic antiderivatives.',
  'A supplied substitution often signals the intended simplification.'
 ],
 ['Missing 1/a','Forgetting +C','Using by parts on a simpler f′/f form','Changing variable but not dx or limits'],
 ['When should partial fractions be used?','How do you recognise f′/f?','What is the by-parts formula?','How do limits change under substitution?','Why does ln|ax+b| need 1/a?'],
 ['Use RocketRevise Pure 3 integration topical sets, including partial fractions and by-parts questions.','Use exam-mate Paper 3 full papers for mixed integration technique selection.']
),
'Numerical Solution of Equations':note(
 'Locate roots by graphs/sign changes and use supplied or derived fixed-point iterations to obtain roots to prescribed accuracy.',
 [
  ['Root location','For a continuous function, opposite signs at interval endpoints indicate at least one root between them.'],
  ['Graphical estimate','Graph intersections or axis crossings can suggest starting intervals and approximate root position.'],
  ['Iteration sequence','A recurrence x_(n+1)=F(x_n) generates successive approximations.'],
  ['Rearrangement','The iteration comes from rewriting the target equation as x=F(x).'],
  ['Convergence awareness','Some iterations converge and others fail; the formal convergence condition is not required.'],
  ['Accuracy','Continue until the sequence supports the stated decimal-place or significant-figure accuracy.'],
  ['Verification','Check the final approximation against the original equation or a sufficiently tight sign bracket.']
 ],
 ['x_(n+1)=F(x_n)'],
 [
  'Define f(x) clearly before demonstrating a sign change.',
  'Write several iterations so convergence is visible.',
  'Use the original equation, not only the rearranged form, to verify the final root.',
  'Match the stopping decision to the requested accuracy.'
 ],
 [
  'A sign change argument assumes continuity.',
  'Not every rearrangement is a useful convergent iteration.',
  'Stable displayed digits alone do not automatically prove the requested rounding unless the values bracket/settle appropriately.',
  'Do not round intermediate iterates aggressively.'
 ],
 ['Claiming a root from same-sign endpoints','Stopping too early','Using the wrong recurrence index','Verifying only in the rearranged equation'],
 ['How does a sign change locate a root?','How is an iteration related to x=F(x)?','What does convergence look like?','How do you justify a root to 3 d.p.?','Why can an iteration fail?'],
 ['Use RocketRevise Pure 3 numerical-method topical questions.','Use exam-mate Paper 3 papers for iterative-root questions in mixed contexts.']
),
'Vectors':note(
 'Use 2D/3D vector arithmetic, line equations and scalar products to solve geometric problems involving intersection, skew lines, angles and perpendicular projections.',
 [
  ['Vector notation','Use column vectors, i/j/k form, displacement vectors and position vectors interchangeably.'],
  ['Magnitude and unit vectors','|a| gives vector length; a/|a| gives a unit vector in the same direction.'],
  ['Position geometry','Vector addition/subtraction encodes translations and geometric relations such as parallelograms and midpoints.'],
  ['Line equation','r=a+tb uses a point-position vector a and direction vector b.'],
  ['Parallel lines','Direction vectors are scalar multiples.'],
  ['Intersecting lines','Solve parameter equations simultaneously and verify all coordinates agree.'],
  ['Skew lines','In 3D, non-parallel lines can fail to intersect and are then skew.'],
  ['Scalar product','a·b=|a||b|cosθ and also the sum of component products.'],
  ['Perpendicularity','a·b=0 for non-zero perpendicular vectors.'],
  ['Angle between lines','Use direction vectors and the scalar product, choosing the required acute/obtuse angle from context.'],
  ['Foot of perpendicular','Let a point on a line be r=a+tb and impose a zero scalar product with the line direction.']
 ],
 ['|a|=√(a_x²+a_y²+a_z²)','r=a+tb','a·b=a_xb_x+a_yb_y+a_zb_z=|a||b|cosθ'],
 [
  'Translate geometry into position/direction vectors before expanding components.',
  'For line intersection, solve two components then verify the third.',
  'For angles, use direction vectors rather than arbitrary position vectors.',
  'For perpendicular-foot problems, form the displacement from the external point to a general point on the line and set its dot product with the direction vector to zero.'
 ],
 [
  'Vector product/cross product is not required.',
  'Shortest distance between skew lines and the common perpendicular equation are not required.',
  'Parallel lines may be distinct or coincident, so position must also be checked.',
  'A scalar product result is scalar, not vector.'
 ],
 ['Using position vectors to find line angle','Solving only two coordinates for intersection without checking the third','Assuming non-parallel 3D lines intersect','Using cross products'],
 ['What does r=a+tb mean?','How do you test for parallel lines?','How can two non-parallel lines be skew?','How is the scalar product used for an angle?','How is the foot of a perpendicular found?'],
 ['Use RocketRevise Pure 3 vectors topical sets; its current P3 page notes that vector planes are removed from the syllabus.','Use exam-mate Paper 3 full papers for 3D line and scalar-product problems.']
),
'Differential Equations':note(
 'Form and solve first-order separable differential equations, determine constants from initial conditions and interpret solutions in the original modelling context.',
 [
  ['Model formation','Translate a verbal rate statement into dy/dx or dy/dt, introducing a constant of proportionality when needed.'],
  ['Separable form','Rearrange so all y-dependent factors accompany dy and all x/t-dependent factors accompany the other differential.'],
  ['Integration','Integrate both sides using any required P3 integration method.'],
  ['General solution','The integrated family contains an arbitrary constant.'],
  ['Initial condition','Substitute a known point/state to determine the constant and obtain a particular solution.'],
  ['Implicit solution','A valid solution need not always be explicitly rearranged for y if the problem does not require it.'],
  ['Context interpretation','Use the solution to calculate/predict the modelled quantity and check whether the result is physically/contextually sensible.'],
  ['Proportional-rate models','Statements such as rate proportional to remaining amount or product of variables produce characteristic separable equations.']
 ],
 ['dy/dx=f(x)g(y) → dy/g(y)=f(x)dx'],
 [
  'Define variables and their units before writing the differential equation.',
  'Separate variables fully before integrating.',
  'Keep the integration constant until the initial condition is applied.',
  'Check the final solution in the original differential equation when feasible.'
 ],
 [
  'The constant of proportionality may need its sign determined from the context.',
  'An initial condition selects one member of the solution family.',
  'Integration techniques from P3 can appear inside differential-equation work.',
  'Interpretation is part of the mathematics, not an optional final sentence.'
 ],
 ['Losing the integration constant','Separating variables incorrectly','Applying the initial condition before integrating in a way that loses generality','Ignoring contextual restrictions'],
 ['How is a rate statement converted to a differential equation?','What makes an equation separable?','Why is a constant of integration needed?','How does an initial condition change the solution?','How can a solution be checked?'],
 ['Use RocketRevise Pure 3 differential-equation topical practice.','Use exam-mate Paper 3 papers for modelling questions with separable equations.']
),
'Complex Numbers':note(
 'Work with complex numbers in Cartesian and polar form, use conjugates and Argand diagrams, find square roots and solve geometric loci.',
 [
  ['Cartesian form','z=x+iy has real part x and imaginary part y; equality requires both parts to match.'],
  ['Modulus and argument','|z| is distance from the origin; arg z is its angle from the positive real axis in an accepted interval.'],
  ['Conjugate','z*=x-iy reflects z in the real axis and helps rationalise division.'],
  ['Arithmetic','Add/subtract componentwise; multiply using i²=-1; divide by multiplying numerator and denominator by a conjugate.'],
  ['Conjugate roots','For polynomials with real coefficients, non-real roots occur in conjugate pairs.'],
  ['Argand diagram','Represent z as point/vector (x,y) in the complex plane.'],
  ['Polar form','z=r(cosθ+i sinθ) or re^(iθ), with r=|z| and θ=arg z.'],
  ['Polar multiplication/division','Multiply moduli and add arguments; divide moduli and subtract arguments.'],
  ['Square roots','Set (a+ib)² equal to the target complex number or use polar reasoning to find the two roots.'],
  ['Geometric effects','Adding translates; conjugating reflects; multiplying/dividing by a complex number combines scaling and rotation.'],
  ['Loci','|z-a|=k is a circle; |z-a|=|z-b| is a perpendicular bisector; arg(z-a)=α describes a ray/half-line with the appropriate excluded point.']
 ],
 ['|z|=√(x²+y²)','z*=x-iy','z₁z₂: moduli multiply, arguments add','z₁/z₂: moduli divide, arguments subtract'],
 [
  'Sketch an Argand diagram before solving a locus.',
  'For division in Cartesian form, use the conjugate of the denominator.',
  'For polar operations, normalise the final argument into an accepted range if required.',
  'For square roots, remember there are two values differing by sign.'
 ],
 [
  'Argument is angle; modulus is distance.',
  'Conjugation reflects in the real axis.',
  'A locus equation may exclude the point where an argument is undefined.',
  'Real-coefficient polynomials force non-real roots into conjugate pairs.'
 ],
 ['Using i²=+1','Adding arguments during division','Forgetting the second square root','Treating arg(z-a)=α as a full line'],
 ['What do modulus and argument mean geometrically?','How is complex division done in Cartesian form?','Why do conjugate roots occur?','What locus is |z-a|=k?','What happens geometrically when multiplying by re^(iθ)?'],
 ['Use RocketRevise Pure 3 complex-number topical practice where available.','Use exam-mate Paper 3 full papers for Argand/locus and polar-form questions.']
),
'Statistics: Poisson Distribution':note(
 'Use the Poisson distribution as a model for random event counts, approximate binomial probabilities when appropriate, and approximate Poisson by normal for sufficiently large mean.',
 [
  ['Poisson model','Poisson models counts of random events in a fixed interval/region when a constant average rate and suitable independence assumptions are reasonable.'],
  ['Probability','For X~Po(λ), P(X=r)=e^-λ λ^r/r!.'],
  ['Mean and variance','Both mean and variance equal λ.'],
  ['Scaling rate','If the expected count changes proportionally with time/area, scale λ before calculating probabilities.'],
  ['Binomial approximation','Poisson can approximate B(n,p) when n is large and p small; the syllabus guide is approximately n>50 and np<5.'],
  ['Normal approximation','For large λ, approximately λ>15, use N(λ,λ) with continuity correction where suitable.'],
  ['Event interpretation','Translate “at most”, “more than”, “none”, or “between” accurately before calculating.']
 ],
 ['P(X=r)=e^-λ λ^r/r!','E(X)=λ','Var(X)=λ'],
 [
  'Identify the interval/region corresponding to the given λ before changing it.',
  'Use complements for tail probabilities when efficient.',
  'Check approximation conditions before replacing a distribution.',
  'Use continuity correction when moving from discrete Poisson to continuous normal.'
 ],
 [
  'Poisson parameter λ is both mean and variance.',
  'Approximations are not exact identities.',
  'A rate per unit interval must be scaled to the interval actually asked about.',
  'Continuity correction belongs to the normal approximation step.'
 ],
 ['Using λ as standard deviation','Forgetting to scale λ','Using Poisson approximation when p is not small','Missing continuity correction'],
 ['What conditions make Poisson a reasonable model?','What are its mean and variance?','When can binomial be approximated by Poisson?','When can Poisson be approximated by normal?','How does λ change if the observation interval doubles?'],
 ['Use RocketRevise Statistics 2 Poisson topical sets.','Use exam-mate Paper 6 full papers for mixed Poisson modelling and approximations.']
),
'Statistics: Linear Combinations of Random Variables':note(
 'Calculate expectation and variance of linear transformations and independent sums, and identify resulting normal or Poisson distributions.',
 [
  ['Linear expectation','E(aX+b)=aE(X)+b.'],
  ['Linear variance','Var(aX+b)=a²Var(X); adding a constant does not change spread.'],
  ['Two-variable expectation','E(aX+bY)=aE(X)+bE(Y) whether or not X,Y are independent.'],
  ['Independent variance','For independent X,Y, Var(aX+bY)=a²Var(X)+b²Var(Y).'],
  ['Normal closure','If X is normal, aX+b is normal; independent normal linear combinations are also normal.'],
  ['Poisson sums','The sum of independent Poisson variables is Poisson with parameter equal to the sum of parameters.'],
  ['Difference variables','For X-Y, variances add when X,Y are independent because (-1)²=1.'],
  ['Units and interpretation','Expectation transforms like the quantity itself; variance transforms with squared scale factors.']
 ],
 ['E(aX+b)=aE(X)+b','Var(aX+b)=a²Var(X)','E(aX+bY)=aE(X)+bE(Y)','Var(aX+bY)=a²Var(X)+b²Var(Y) for independent X,Y'],
 [
  'Write expectation and variance separately; do not transform them by the same rule.',
  'Check independence before adding variances.',
  'For differences, keep the negative sign in expectation but square it in variance.',
  'After finding mean/variance, state the full resulting distribution when the family is known.'
 ],
 [
  'Expectation is linear even without independence; variance addition needs independence here.',
  'Constants shift means but not variance.',
  'Standard deviation is the square root of variance after all variance operations.',
  'Independent Poisson variables add to another Poisson variable.'
 ],
 ['Subtracting variances for X-Y','Adding standard deviations directly','Applying independent-variance formula without independence','Forgetting to square scale constants'],
 ['How does adding b affect variance?','Why do variances add for X-Y?','When is a normal linear combination still normal?','When can Poisson variables be combined?','What role does independence play?'],
 ['Use RocketRevise Statistics 2 linear-combination topical sets.','Use exam-mate Paper 6 papers for normal and Poisson combination questions.']
),
'Statistics: Continuous Random Variables':note(
 'Use probability density functions over a single interval to calculate probabilities, determine constants, and find mean, variance, medians and percentiles.',
 [
  ['Density function','A probability density f(x) is non-negative and has total area 1 over its domain.'],
  ['Probability as area','P(a<X<b)=∫_a^b f(x)dx. Exact-point probability is zero for a continuous variable.'],
  ['Unknown constant','Use total area 1 to determine a parameter in f(x).'],
  ['Mean','E(X)=∫x f(x)dx over the domain.'],
  ['Second moment','E(X²)=∫x²f(x)dx.'],
  ['Variance','Var(X)=E(X²)-[E(X)]².'],
  ['Median/percentile','Choose m so the area to the left equals the required cumulative probability, e.g. 0.5 for the median.'],
  ['Infinite domain','The syllabus can use a single interval extending to infinity, requiring improper-integral reasoning at an accessible level.']
 ],
 ['∫ f(x)dx over domain = 1','P(a<X<b)=∫_a^b f(x)dx','E(X)=∫x f(x)dx','Var(X)=E(X²)-[E(X)]²'],
 [
  'Find/verify the domain before integrating.',
  'Determine any normalising constant first.',
  'Use area conditions directly for medians/percentiles; an explicit CDF formula is not required.',
  'Check variance is non-negative and probability results lie between 0 and 1.'
 ],
 [
  'Density values themselves are not probabilities at single points.',
  'CDF knowledge is not explicitly required.',
  'A density can exceed 1 locally if the total area remains 1.',
  'Continuous exact-point probability is zero.'
 ],
 ['Treating f(x) as P(X=x)','Forgetting to normalise','Using E(X²) as variance','Integrating outside the stated domain'],
 ['What conditions must a density satisfy?','How is a probability found?','How is the median located?','How are mean and variance calculated?','Why can f(x)>1 without breaking probability rules?'],
 ['Use RocketRevise Statistics 2 continuous-random-variable topical practice.','Use exam-mate Paper 6 papers for density/expectation/percentile questions.']
),
'Statistics: Sampling and Estimation':note(
 'Distinguish populations from samples, understand random sampling and sample-mean distributions, use the CLT, compute unbiased estimates and construct confidence intervals.',
 [
  ['Population and sample','A population is the full target set; a sample is the observed subset used to infer population properties.'],
  ['Randomness','Random selection reduces systematic sampling bias; explain why a proposed sampling process may be unsatisfactory.'],
  ['Sample mean as random variable','Across repeated samples, X̄ varies and has E(X̄)=μ and Var(X̄)=σ²/n.'],
  ['Normal population','If the parent population is normal, X̄ is normal for any n.'],
  ['Central Limit Theorem','For sufficiently large n, the sample mean is approximately normal even when the parent distribution is not normal, under appropriate conditions.'],
  ['Unbiased estimates','Use sample statistics that are unbiased for population parameters; the sample-variance formula corrects for estimation bias.'],
  ['Confidence interval for mean','Construct an interval for μ when population variance is known or a large sample justifies the syllabus method.'],
  ['Confidence interval for proportion','For large samples, use the sample proportion and its approximate standard error.'],
  ['Interpretation','A confidence interval quantifies the uncertainty of the estimation procedure; avoid saying there is a post-calculation probability that the fixed true parameter lies in this one realised interval.']
 ],
 ['E(X̄)=μ','Var(X̄)=σ²/n','SE(X̄)=σ/√n'],
 [
  'Identify whether the problem concerns an individual value or a sample mean.',
  'Check the conditions for using a normal/CLT approximation.',
  'Compute standard error with √n in the denominator.',
  'Interpret intervals in the context of the unknown population parameter.'
 ],
 [
  'The distribution of X̄ becomes less spread out as n increases.',
  'Random sample does not mean “any convenient sample”.',
  'Particular named sampling methods such as quota/stratified are not required.',
  'Confidence level belongs to the procedure over repeated samples.'
 ],
 ['Using σ/n instead of σ/√n','Confusing sample and population','Treating one confidence interval as a probability distribution for μ','Ignoring sampling bias'],
 ['What is the difference between population and sample?','Why is randomness important?','What are E(X̄) and Var(X̄)?','What does the CLT provide?','How does increasing n affect standard error?'],
 ['Use RocketRevise Statistics 2 sampling/estimation topical sets.','Use exam-mate Paper 6 full papers for confidence-interval questions.']
),
'Statistics: Hypothesis Tests':note(
 'Formulate and carry out one- and two-tailed hypothesis tests for binomial, Poisson and population-mean settings, then analyse Type I and Type II errors.',
 [
  ['Null hypothesis','H0 states the parameter value/model assumed for the test calculation.'],
  ['Alternative hypothesis','H1 states the direction or difference being investigated and determines one- or two-tailed structure.'],
  ['Significance level','The significance level controls the maximum intended Type I error probability through the rejection region.'],
  ['Critical/rejection region','Choose outcomes sufficiently unlikely under H0, placing probability in the tail(s) specified by H1.'],
  ['Test statistic','Use the observed count/mean or a standardised statistic appropriate to the model.'],
  ['Exact discrete tests','Binomial and Poisson hypotheses can be tested by direct tail probabilities.'],
  ['Normal approximation','Use a normal approximation with continuity correction for binomial/Poisson tests when conditions allow.'],
  ['Mean tests','Test a population mean when the population is normal with known variance or when a large-sample method is appropriate.'],
  ['Context conclusion','Conclude in plain context: reject or do not reject H0 at the stated level, then interpret evidence for H1.'],
  ['Type I error','Rejecting H0 when H0 is actually true.'],
  ['Type II error','Failing to reject H0 when a specified alternative state is actually true.'],
  ['Error probabilities','For concrete normal/binomial/Poisson tests, calculate the probability of each error using the relevant region under the appropriate true parameter.']
 ],
 ['Type I: P(reject H0 | H0 true)','Type II: P(do not reject H0 | specified H1 true)'],
 [
  'Write H0 and H1 in terms of the population parameter before calculating.',
  'Decide one- versus two-tailed from the wording, not from the observed data.',
  'For a discrete critical region, make sure its probability under H0 satisfies the significance requirement.',
  'State the final conclusion in the problem context, not only “reject H0”.'
 ],
 [
  'Do not say “accept H0”; use “do not reject H0” unless the question’s convention explicitly differs.',
  'A p-value/significance comparison concerns evidence under H0, not the probability H0 is true.',
  'Type I and Type II probabilities are evaluated under different assumed true parameter values.',
  'Continuity correction is needed when a discrete test is approximated by normal.'
 ],
 ['Choosing tail direction after seeing the sample','Using significance level as P(H0 true)','Writing a context-free conclusion','Confusing Type I and II errors'],
 ['What determines one- versus two-tailed?','What is a rejection region?','What is a Type I error?','What is a Type II error?','How should the final conclusion be worded?'],
 ['Use RocketRevise Statistics 2 hypothesis-testing topical sets.','Use exam-mate Paper 6 full papers for exact and approximate hypothesis tests.']
)
};

const a2Rows=curriculum.filter(e=>e.board===BOARD&&e.grade===GRADE&&e.subject===SUBJECT);
const legacyIds=a2Rows.map(e=>e.id);

// These two topics belong to an older Mechanics syllabus and are not in 9709 Paper 4 for 2026-2027.
// Preserve the records/IDs for historical progress, but remove them from the active curriculum.
for(const title of ['Mechanics: Motion in a Circle','Mechanics: Equilibrium of a Rigid Body']){
 const e=a2Rows.find(x=>x.title===title);
 if(e){e.curriculumHidden=true;e.deprecatedReason='Not part of Cambridge 9709 Paper 4 syllabus for 2026–2027';}
}

const p3Titles=[
 'Pure Mathematics: Algebra','Pure Mathematics: Logarithmic and Exponential Functions','Pure Mathematics: Trigonometry',
 'Pure Mathematics: Differentiation','Pure Mathematics: Integration','Numerical Solution of Equations','Vectors','Differential Equations','Complex Numbers'
];
const p6Titles=[
 'Statistics: Poisson Distribution','Statistics: Linear Combinations of Random Variables','Statistics: Continuous Random Variables',
 'Statistics: Sampling and Estimation','Statistics: Hypothesis Tests'
];

p3Titles.forEach((title,i)=>{
 const e=a2Rows.find(x=>x.title===title);
 if(e){e.component='Paper 3';e.sourceBook='Paper 3 · Pure Mathematics 3';e.order=300+i+1;}
});
p6Titles.forEach((title,i)=>{
 const e=a2Rows.find(x=>x.title===title);
 if(e){e.component='Paper 6';e.sourceBook='Paper 6 · Probability & Statistics 2';e.order=600+i+1;}
});

const rendered=[];
for(const title of [...p3Titles,...p6Titles]){
 const e=a2Rows.find(x=>x.title===title);
 const patch=notes[title];
 if(!e||!patch)continue;
 e.summary=patch.summary;
 e.keyPoints=patch.keyPoints;
 e.formulas=patch.formulas;
 e.method=patch.method;
 e.mistakes=patch.mistakes;
 e.lens='Use the official 9709 component scope, show complete reasoning, preserve exact forms where appropriate, and move from topical practice to timed component papers.';
 e.deepNotes=patch.deepNotes;
 e.notesVerified=true;
 e.sourcePublisher='Cambridge International';
 e.sourceYear=YEAR;
 e.noteSourceFile='User-supplied Cambridge International AS & A Level Mathematics 9709 syllabus; RocketRevise topical resources; exam-mate yearly/full-paper resources';
 e.noteSourceBasis=SOURCE;
 rendered.push({title:e.title,id:e.id,component:e.component,deepNotes:e.deepNotes});
}

window.STUDYAI_CAIE_A_LEVEL_MATHEMATICS_DEEP_NOTES=rendered;
window.STUDYAI_CAIE_A_LEVEL_MATHEMATICS_DEEP_NOTES_STATUS={
 total:14,
 matched:rendered.length,
 unmatched:[...p3Titles,...p6Titles].filter(t=>!rendered.some(x=>x.title===t)),
 preservedIds:legacyIds,
 hiddenLegacyTopics:a2Rows.filter(e=>e.curriculumHidden).map(e=>({title:e.title,id:e.id})),
 componentCounts:{
  'Paper 3':a2Rows.filter(e=>e.component==='Paper 3'&&!e.curriculumHidden).length,
  'Paper 6':a2Rows.filter(e=>e.component==='Paper 6'&&!e.curriculumHidden).length
 }
};

if(typeof window.renderFilters==='function')window.renderFilters();
else if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
