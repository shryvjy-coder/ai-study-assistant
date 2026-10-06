/* StudyAI deep Cambridge International AS Level Physics notes.
 * Scope authority: the user's supplied Cambridge International AS & A Level Physics 9702
 * syllabus for 2025, 2026 and 2027. Physics with Talha is used as a supplementary
 * teaching/exam-practice reference. All StudyAI explanations are original.
 */
(() => {
'use strict';

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const rows=curriculum.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Physics');
const BOARD='Cambridge International';
const BOOK='Physics 9702';
const YEAR='2025–2027';
const SOURCE='Official Cambridge International AS & A Level Physics 9702 syllabus supplied by the user; Physics with Talha AS Level resources used as a supplementary teaching and topical-practice reference';

const notesByTitle={
'Physical Quantities and Units':{
 summary:'Build the measurement language used throughout AS Physics: quantities and units, dimensional checks, prefixes, uncertainty, accuracy and precision, and vector representation.',
 keyPoints:[
  'Treat every measured physical quantity as a numerical magnitude with a unit.',
  'Use SI base and derived units, prefixes and dimensional homogeneity to check calculations.',
  'Distinguish random error, systematic error, accuracy and precision.',
  'Combine simple absolute or percentage uncertainties appropriately.',
  'Resolve coplanar vectors into perpendicular components and add vectors consistently.'
 ],
 formulas:[
  'percentage uncertainty = (absolute uncertainty / measured value) × 100%',
  'resultant component: F_x = F cos θ, F_y = F sin θ when θ is measured from the x-direction'
 ],
 method:[
  'Write the quantity with its unit before converting prefixes or substituting into equations.',
  'For an equation check, reduce every term to SI base units and compare dimensions on both sides.',
  'For uncertainty, decide whether the operation needs absolute uncertainties or percentage uncertainties before combining them.',
  'For vectors, draw a labelled sketch, choose axes, resolve components and keep signs consistent.'
 ],
 mistakes:[
  'Calling a precise result accurate without considering systematic error.',
  'Adding percentage uncertainties when the operation actually requires absolute uncertainties, or vice versa.',
  'Treating dimensional agreement as proof that an equation is physically correct.',
  'Dropping vector direction or using the wrong angle when resolving components.'
 ],
 deepNotes:{
  overview:'This topic is the toolkit for every later calculation and practical. Strong answers show correct units, sensible precision, justified uncertainty and clear vector direction. The aim is not memorising unit names, but being able to test whether a physical statement is consistent.',
  concepts:[
   ['Physical quantity','A physical quantity has both a numerical value and a unit. Estimation is part of physics too: an answer should be plausible in scale before it is accepted.'],
   ['SI base and derived units','Mass, length, time, current and thermodynamic temperature use kg, m, s, A and K. Derived units should be reducible to products or quotients of base units.'],
   ['Dimensional homogeneity','A valid physical equation must have the same dimensions for every term that is added or equated. This is a fast way to reject many incorrect expressions, although dimensional consistency alone cannot prove an equation.'],
   ['Prefixes and powers of ten','Convert prefixes before calculation. Keep the power of ten attached to the unit conversion, especially when area or volume is involved because the conversion factor must also be squared or cubed.'],
   ['Random and systematic error','Random error produces scatter and can often be reduced by repeated readings and averaging. Systematic error shifts measurements in a consistent direction and is not removed by repetition.'],
   ['Accuracy and precision','Accuracy describes closeness to the accepted value. Precision describes the spread or repeatability of measurements. A set can be precise but inaccurate.'],
   ['Uncertainty','Absolute uncertainty is expressed in the same unit as the measurement. Percentage uncertainty compares the uncertainty with the measured value and is useful when multiplying or dividing quantities.'],
   ['Scalars and vectors','Scalars need magnitude only. Vectors need magnitude and direction. Coplanar vectors can be added graphically or by resolving them into perpendicular components.']
  ],
  formulas:[
   'percentage uncertainty = absolute uncertainty / measured value × 100%',
   'F_x = F cos θ and F_y = F sin θ for perpendicular components'
  ],
  reasoning:[
   'Estimate the expected order of magnitude before trusting a calculator result.',
   'When converting cm² to m² or cm³ to m³, apply the conversion factor to the power of the unit.',
   'Use base units to compare the dimensions of the left- and right-hand sides of an equation.',
   'When combining measurements, carry uncertainties through the same mathematical structure as the calculation.',
   'For vectors, define a positive direction first, then resolve and recombine components.'
  ],
  visuals:[
   'Draw a vector triangle or component diagram with arrow directions and labelled angles.',
   'For repeated measurements, imagine scatter around a central value: random error changes the spread, while systematic error shifts the whole cluster.',
   'Use a unit tree from a derived quantity down to kg, m, s, A and K when checking homogeneity.'
  ],
  examTips:[
   'State units on every final numerical answer unless the question explicitly provides them.',
   'Do not confuse zero error with random error: a zero error is systematic.',
   'Quote uncertainty to sensible precision and match the reported measurement precision to it.',
   'For vector questions, a correct magnitude with a missing or wrong direction can still lose marks.'
  ],
  distinctions:[
   'Accuracy is closeness to the accepted value; precision is repeatability or small spread.',
   'Random error changes unpredictably between readings; systematic error biases readings consistently.',
   'A scalar has magnitude only; a vector has magnitude and direction.',
   'Dimensional consistency is necessary for a physical equation, but not sufficient to prove it.'
  ],
  quickRevision:[
   'SI base units: kg, m, s, A, K.',
   'Check equations by reducing units to base units.',
   'Random error causes scatter; systematic error causes bias.',
   'Precision is not the same as accuracy.',
   'Percentage uncertainty = absolute uncertainty / value × 100%.',
   'Resolve vectors before combining them.'
  ],
  vocabulary:['magnitude','SI base unit','derived unit','homogeneity','systematic error','random error','accuracy','precision','absolute uncertainty','percentage uncertainty','scalar','vector'],
  selfCheck:[
   'Why can a set of measurements be precise but inaccurate?',
   'How would you use SI base units to test an unfamiliar equation?',
   'A length is measured with uncertainty. When would you use absolute uncertainty and when would percentage uncertainty be more useful?',
   'How do you resolve a vector into perpendicular components when the angle is measured from the horizontal?',
   'Why does dimensional consistency not guarantee that an equation is physically correct?'
  ]
 }
},
'Kinematics':{
 summary:'Describe motion using distance, displacement, speed, velocity and acceleration, interpret motion graphs, derive and apply constant-acceleration equations, and analyse two-dimensional motion with perpendicular velocity and acceleration.',
 keyPoints:[
  'Distinguish distance from displacement and speed from velocity.',
  'Use gradients and areas on motion graphs to extract physical quantities.',
  'Derive and apply the constant-acceleration equations in one dimension.',
  'Model free fall in a uniform gravitational field when air resistance is negligible.',
  'Treat perpendicular components of motion independently in two-dimensional situations.'
 ],
 formulas:['v = u + at','s = ut + 1/2 at²','v² = u² + 2as','s = 1/2 (u + v)t','gradient of displacement-time graph = velocity','area under velocity-time graph = displacement'],
 method:[
  'Choose a positive direction and assign signs to u, v, a and s before using an equation.',
  'Use graph gradient for rates of change and graph area for accumulated change.',
  'Select the constant-acceleration equation that contains the known quantities and the required unknown.',
  'For two-dimensional motion, split horizontal and vertical components and use the same time for both.'
 ],
 mistakes:[
  'Using distance and displacement interchangeably.',
  'Taking the area under a speed-time graph as signed displacement.',
  'Using constant-acceleration equations when acceleration is changing.',
  'Treating horizontal and vertical projectile components as if they had different flight times.'
 ],
 deepNotes:{
  overview:'Kinematics describes motion without asking what causes it. Cambridge questions often switch between words, graphs and equations, so you should be able to move fluently between all three representations.',
  concepts:[
   ['Distance and displacement','Distance is the total path length and is scalar. Displacement is the change in position from start to finish and is a vector.'],
   ['Speed and velocity','Speed is the rate of change of distance. Velocity is the rate of change of displacement and includes direction.'],
   ['Acceleration','Acceleration is the rate of change of velocity. A negative acceleration does not automatically mean slowing down; compare the signs of velocity and acceleration.'],
   ['Displacement-time graphs','The gradient gives velocity. A changing gradient means changing velocity. A horizontal section means zero velocity.'],
   ['Velocity-time graphs','The gradient gives acceleration and the signed area gives displacement. Area below the time axis represents displacement in the negative direction.'],
   ['Uniform acceleration','When acceleration is constant, the familiar equations of motion can be derived from the definitions of velocity, acceleration and graph geometry.'],
   ['Free fall','With negligible air resistance near Earth, acceleration is approximately constant and vertically downward. The sign of g depends on the chosen positive direction.'],
   ['Perpendicular motion','A uniform velocity in one direction and uniform acceleration in a perpendicular direction can be analysed by treating the components independently while sharing the same time.']
  ],
  formulas:['v = u + at','s = ut + 1/2 at²','v² = u² + 2as','s = 1/2 (u + v)t'],
  reasoning:[
   'Translate the wording into a sign convention before substituting numbers.',
   'If a graph is provided, ask first whether the required quantity is a gradient, an area or a direct reading.',
   'For a falling or rising object, keep the same sign convention for the entire motion.',
   'For two-dimensional motion, solve one axis at a time and reconnect the components using the common time.',
   'Check that the final direction and magnitude agree with the physical motion described.'
  ],
  visuals:[
   'Sketch displacement-time and velocity-time graphs for constant velocity, constant acceleration and changing acceleration.',
   'Draw a velocity-time graph as rectangles and triangles to see why its area gives displacement.',
   'For two-dimensional motion, draw separate horizontal and vertical component diagrams.'
  ],
  examTips:[
   'State or imply a clear positive direction when signs matter.',
   'Do not read acceleration directly from the height of a velocity-time graph; use its gradient.',
   'If an object changes direction, velocity passes through zero but acceleration may not.',
   'Use sufficient significant figures during working and round only at the end.'
  ],
  distinctions:[
   'Distance is path length; displacement is net change in position.',
   'Speed is scalar; velocity is vector.',
   'Negative acceleration means acceleration in the negative direction, not necessarily deceleration.',
   'Area under a velocity-time graph gives displacement, not distance unless velocity stays one sign.'
  ],
  quickRevision:['gradient of s-t = v','gradient of v-t = a','area under v-t = displacement','constant-a equations require constant acceleration','choose and keep one sign convention','split perpendicular motion into components'],
  vocabulary:['distance','displacement','speed','velocity','acceleration','uniform acceleration','free fall','gradient','area under graph'],
  selfCheck:[
   'What information does the gradient of a displacement-time graph give?',
   'How can an object have negative acceleration while speeding up?',
   'Which constant-acceleration equation would you choose if time is not known?',
   'Why do horizontal and vertical components of two-dimensional motion share the same time?',
   'How would you determine displacement from a velocity-time graph that crosses the time axis?'
  ]
 }
},
'Dynamics':{
 summary:'Connect force and motion through Newton’s laws and momentum, then extend the model to drag, terminal velocity, collisions and conservation of momentum.',
 keyPoints:[
  'Use F = ma with the resultant force, not an individual force.',
  'Define momentum as mv and force as rate of change of momentum.',
  'Apply all three Newton laws with clear force pairs and system boundaries.',
  'Explain drag, air resistance and terminal velocity qualitatively.',
  'Apply conservation of momentum to one- and two-dimensional interactions.'
 ],
 formulas:['F = ma','p = mv','F = Δp/Δt for constant average force','weight W = mg','total momentum before = total momentum after for an isolated system'],
 method:[
  'Draw a free-body diagram and identify the resultant force before using F = ma.',
  'For momentum questions, define the system and a positive direction before writing conservation equations.',
  'For variable-speed motion with drag, compare driving forces with resistive forces at each stage.',
  'For collisions, conserve momentum first and use kinetic-energy information only when the collision is stated to be elastic.'
 ],
 mistakes:[
  'Using F = ma with a single force instead of the resultant force.',
  'Treating Newton’s third-law pair as two forces acting on the same object.',
  'Assuming momentum conservation means kinetic energy is always conserved.',
  'Saying terminal velocity occurs when drag disappears rather than when resultant force becomes zero.'
 ],
 deepNotes:{
  overview:'Dynamics explains why velocity changes. The central habit is to define the object or system first, then connect forces to acceleration or momentum change. This prevents most sign and force-pair errors.',
  concepts:[
   ['Mass and inertia','Mass measures resistance to changes in motion. It is not the same as weight, which is the force due to a gravitational field.'],
   ['Newton’s second law','The resultant force equals mass times acceleration for constant mass. Acceleration points in the direction of the resultant force.'],
   ['Momentum','Linear momentum is p = mv and is a vector. Force can be understood as the rate at which momentum changes.'],
   ['Newton’s first law','If the resultant force is zero, velocity remains constant. Rest is only one possible constant-velocity state.'],
   ['Newton’s third law','Interaction forces come in equal-magnitude, opposite-direction pairs acting on different bodies.'],
   ['Weight','Weight is the gravitational force on a mass, W = mg. Mass stays constant while weight depends on gravitational field strength.'],
   ['Drag and terminal velocity','Resistive force generally increases with speed. Terminal velocity is reached when resistive forces balance the driving force so resultant force and acceleration become zero.'],
   ['Conservation of momentum','For an isolated system, total vector momentum is unchanged during an interaction. Kinetic energy is conserved only for elastic collisions.']
  ],
  formulas:['F = ma','p = mv','F = Δp/Δt','W = mg'],
  reasoning:[
   'Draw only forces acting on the chosen object, then add them vectorially to find the resultant.',
   'For falling with air resistance: start with weight dominant, then increasing drag reduces acceleration until the forces balance.',
   'For collisions, attach a sign to every velocity before substituting into momentum conservation.',
   'In two dimensions, conserve momentum separately along perpendicular axes.',
   'For an elastic collision, use both momentum conservation and kinetic-energy conservation or the relative-speed condition.'
  ],
  visuals:[
   'Use free-body diagrams with arrows starting on the object.',
   'Sketch speed-time or acceleration-time behaviour for an object approaching terminal velocity.',
   'Use before-and-after momentum diagrams for collision questions.'
  ],
  examTips:[
   'Write “resultant force” explicitly when applying F = ma.',
   'In Newton third-law explanations, name both objects receiving the forces.',
   'Momentum is vector, so opposite directions require opposite signs.',
   'Do not invoke kinetic-energy conservation unless the interaction is elastic.'
  ],
  distinctions:[
   'Mass is a property of matter; weight is a force.',
   'Balanced forces give zero acceleration, not necessarily zero velocity.',
   'Newton third-law forces act on different objects; balanced forces act on the same object.',
   'Momentum is conserved in an isolated interaction; kinetic energy may change.'
  ],
  quickRevision:['F_resultant = ma','p = mv','force = rate of change of momentum','W = mg','terminal velocity means resultant force = 0','momentum is conserved for an isolated system','KE is conserved only in elastic collisions'],
  vocabulary:['inertia','resultant force','momentum','impulse','drag','terminal velocity','elastic collision','inelastic collision','isolated system'],
  selfCheck:[
   'Why can an object moving at constant velocity still have several forces acting on it?',
   'What is wrong with saying a Newton third-law pair cancels because the forces are equal and opposite?',
   'How does drag change during the fall of an object approaching terminal velocity?',
   'Why must directions be included in a momentum-conservation calculation?',
   'What extra condition distinguishes an elastic collision from an inelastic one?'
  ]
 }
},
'Forces, Density and Pressure':{
 summary:'Analyse turning effects and equilibrium, then connect density and pressure to fluids, hydrostatic pressure and upthrust.',
 keyPoints:[
  'Use moments and couples to analyse rotation.',
  'Apply the principle of moments and the conditions for equilibrium.',
  'Represent three coplanar equilibrium forces with a closed vector triangle.',
  'Use density and pressure definitions consistently.',
  'Explain hydrostatic pressure differences and calculate upthrust.'
 ],
 formulas:['moment = Fd_perpendicular','torque of a couple = F × perpendicular separation','ρ = m/V','p = F/A','Δp = ρgΔh','upthrust F = ρgV'],
 method:[
  'Mark the pivot and use perpendicular distance to the force line of action.',
  'For equilibrium, check both resultant force = 0 and resultant torque = 0.',
  'For fluid pressure, identify the vertical depth difference rather than distance along the container.',
  'For upthrust, connect the force to the pressure difference or to the weight of displaced fluid.'
 ],
 mistakes:[
  'Using the sloping distance from pivot to force instead of perpendicular distance.',
  'Checking force balance but forgetting rotational equilibrium.',
  'Using total depth when the question requires a pressure difference over Δh.',
  'Assuming upthrust always equals the object’s weight even when it is accelerating.'
 ],
 deepNotes:{
  overview:'This topic links static force balance with fluid mechanics. The two recurring ideas are “where the force acts” for rotation and “how pressure changes with depth” for fluids.',
  concepts:[
   ['Centre of gravity','An object’s weight may be treated as acting through a single point called the centre of gravity when analysing its overall motion or balance.'],
   ['Moment of a force','Moment about a point equals force multiplied by the perpendicular distance from the point to the line of action.'],
   ['Couple and torque','A couple consists of equal and opposite parallel forces separated by a distance, producing rotation with no resultant force.'],
   ['Equilibrium','Static or constant-velocity equilibrium requires both zero resultant force and zero resultant torque.'],
   ['Vector triangle','Three coplanar forces in equilibrium can be represented by a closed vector triangle when drawn head-to-tail.'],
   ['Density','Density is mass per unit volume. Keep mass and volume units compatible before using ρ = m/V.'],
   ['Pressure and hydrostatics','Pressure is normal force per unit area. In a fluid at rest, pressure increases with vertical depth according to Δp = ρgΔh.'],
   ['Upthrust','Because pressure is greater lower down, a submerged body experiences a net upward force. The magnitude equals the weight of displaced fluid, ρgV.']
  ],
  formulas:['M = Fd_perpendicular','τ_couple = Fs','ρ = m/V','p = F/A','Δp = ρgΔh','F_upthrust = ρgV'],
  reasoning:[
   'Choose a pivot that removes unknown forces when applying moments.',
   'Separate translational equilibrium from rotational equilibrium.',
   'For hydrostatic pressure, compare two horizontal levels and use their vertical separation.',
   'For a floating body in equilibrium, upthrust equals weight because the resultant force is zero.',
   'For a fully or partly immersed object, V in ρgV is the displaced fluid volume.'
  ],
  visuals:[
   'Draw the force line of action and the perpendicular lever arm.',
   'For a couple, show the two equal opposite forces and their perpendicular separation.',
   'For fluid questions, sketch pressure arrows larger at greater depth.'
  ],
  examTips:[
   'Write the perpendicular distance explicitly in moment calculations.',
   'State both equilibrium conditions when asked why a body is in equilibrium.',
   'Use vertical depth for hydrostatic pressure even in oddly shaped containers.',
   'Distinguish pressure, which is scalar, from force, which is vector.'
  ],
  distinctions:[
   'Moment is about a chosen point; torque of a couple is produced by a pair of forces.',
   'Zero resultant force does not guarantee zero resultant torque.',
   'Density is mass per volume; pressure is force per area.',
   'Upthrust equals weight only for vertical equilibrium, not in every situation.'
  ],
  quickRevision:['moment = force × perpendicular distance','equilibrium needs ΣF = 0 and Στ = 0','ρ = m/V','p = F/A','Δp = ρgΔh','upthrust = ρgV'],
  vocabulary:['centre of gravity','moment','line of action','couple','torque','equilibrium','density','pressure','hydrostatic pressure','upthrust'],
  selfCheck:[
   'Why must the distance in a moment calculation be perpendicular to the force line of action?',
   'Can an object have zero resultant force but still rotate? Explain.',
   'Why is hydrostatic pressure determined by vertical depth rather than container shape?',
   'How does a pressure difference create upthrust?',
   'Under what condition does upthrust equal the weight of an object?'
  ]
 }
},
'Work, Energy and Power':{
 summary:'Track energy transfers using work, conservation of energy, efficiency, power, gravitational potential energy and kinetic energy.',
 keyPoints:[
  'Interpret work as energy transferred by a force through a displacement.',
  'Apply conservation of energy and efficiency.',
  'Use power as the rate of energy transfer and derive P = Fv.',
  'Derive and use ΔE_p = mgΔh in a uniform gravitational field.',
  'Derive and use E_k = 1/2 mv².'
 ],
 formulas:['W = Fs in the direction of the force','efficiency = useful energy output / total energy input','P = W/t','P = Fv','ΔE_p = mgΔh','E_k = 1/2 mv²'],
 method:[
  'Define the system and list initial and final energy stores before writing an energy equation.',
  'Use only the component of force along the displacement when calculating work.',
  'For efficiency, keep useful output and total input in the same energy or power units.',
  'For P = Fv, use the force component in the direction of motion.'
 ],
 mistakes:[
  'Using total force rather than the component along displacement in a work calculation.',
  'Writing efficiency above 1 or above 100%.',
  'Confusing energy with power.',
  'Using mgΔh outside a uniform gravitational-field approximation without justification.'
 ],
 deepNotes:{
  overview:'Energy methods often solve a problem more directly than force equations. The key is to identify where energy starts, where it ends, and which transfers are useful or dissipative.',
  concepts:[
   ['Work','Work is energy transferred when a force causes displacement. Only the force component along the displacement contributes to work.'],
   ['Conservation of energy','Energy can move between stores and be transferred between objects, but the total energy of a closed system is conserved.'],
   ['Efficiency','Efficiency compares useful output with total input. It can be expressed as a fraction or percentage and cannot exceed 100%.'],
   ['Power','Power is the rate of doing work or transferring energy. The same energy transferred in less time corresponds to greater power.'],
   ['P = Fv','For a force acting along the direction of motion, power equals force multiplied by speed. It follows from W = Fs and v = s/t.'],
   ['Gravitational potential energy','Near Earth in a uniform field, the change in gravitational potential energy is mgΔh. The sign depends on whether height increases or decreases.'],
   ['Kinetic energy','For non-relativistic translational motion, kinetic energy is 1/2 mv². Because speed is squared, doubling speed quadruples kinetic energy.']
  ],
  formulas:['W = Fs_parallel','η = useful output / total input','P = W/t','P = Fv','ΔE_p = mgΔh','E_k = 1/2 mv²'],
  reasoning:[
   'Draw an energy-flow picture before calculating.',
   'Use conservation of energy to connect initial and final states, then add dissipated energy if needed.',
   'Choose energy methods when the path details are irrelevant but initial and final states are known.',
   'Derive P = Fv by dividing W = Fs by time and replacing s/t with v.',
   'Check whether the final energy values are consistent with the direction of motion and any dissipative forces.'
  ],
  visuals:[
   'Use energy-transfer diagrams or before-and-after energy bars.',
   'Sketch force and displacement directions to identify the parallel force component.',
   'Plot kinetic energy against speed qualitatively to remember its quadratic dependence.'
  ],
  examTips:[
   'Give efficiency either as a fraction or percentage with clear interpretation.',
   'When asked to derive a relation, show the starting equations rather than quoting the final result only.',
   'Do not call energy “used up”; state where it is transferred or dissipated.',
   'Keep joules and watts distinct: J is energy, W is power.'
  ],
  distinctions:[
   'Energy is a quantity transferred or stored; power is the rate of energy transfer.',
   'Work can be positive or negative depending on force relative to displacement.',
   'Useful output is part of total input, so efficiency is at most 1.',
   'Kinetic energy depends on speed, while momentum depends on velocity.'
  ],
  quickRevision:['W = Fs_parallel','energy is conserved','efficiency = useful/total','P = W/t','P = Fv','ΔE_p = mgΔh','E_k = 1/2 mv²'],
  vocabulary:['work','energy transfer','efficiency','power','gravitational potential energy','kinetic energy','dissipation'],
  selfCheck:[
   'Why can a force do zero work even when its magnitude is non-zero?',
   'How is P = Fv derived from the definitions of work and power?',
   'Why can efficiency never exceed 100%?',
   'What happens to kinetic energy if speed doubles?',
   'When is ΔE_p = mgΔh a valid model?'
  ]
 }
},
'Deformation of Solids':{
 summary:'Describe elastic and plastic deformation using force-extension behaviour, stress, strain and Young modulus, and calculate elastic energy from graph area.',
 keyPoints:[
  'Use load, extension, compression and limit of proportionality correctly.',
  'Apply Hooke’s law only in its valid region.',
  'Define stress, strain and Young modulus.',
  'Interpret force-extension graphs and identify elastic versus plastic behaviour.',
  'Use graph area to calculate elastic potential energy.'
 ],
 formulas:['k = F/x','stress = F/A','strain = ΔL/L','Young modulus E = stress/strain','E_p = 1/2 Fx = 1/2 kx² within the proportional region'],
 method:[
  'Identify whether the material is within the proportional or elastic region before using linear formulas.',
  'For Young modulus, convert diameter to cross-sectional area and extension to the same length unit as original length.',
  'Use the area under the force-extension graph for work done.',
  'For experimental determination of Young modulus, measure original length, diameter, load and extension with suitable precision.'
 ],
 mistakes:[
  'Treating the elastic limit and limit of proportionality as the same point.',
  'Using diameter instead of cross-sectional area in stress.',
  'Confusing extension with strain.',
  'Using 1/2 Fx outside the linear proportional region.'
 ],
 deepNotes:{
  overview:'Deformation connects microscopic bonding effects to measurable changes in shape and length. Cambridge questions often test whether you know exactly which region of a force-extension graph allows Hooke’s law and elastic-energy formulas.',
  concepts:[
   ['Load and deformation','Tensile forces cause extension and compressive forces cause compression in the one-dimensional model used here.'],
   ['Hooke’s law','Within the limit of proportionality, force is proportional to extension, so F = kx. The gradient of an F-x graph in this region is k.'],
   ['Stress','Stress is force per cross-sectional area and has unit Pa. It describes loading independent of sample area.'],
   ['Strain','Strain is extension divided by original length and has no unit. It describes fractional deformation.'],
   ['Young modulus','Young modulus is stress divided by strain in the linear elastic region. A larger Young modulus indicates greater stiffness of the material.'],
   ['Elastic and plastic deformation','Elastic deformation is recoverable when the load is removed. Plastic deformation leaves permanent deformation.'],
   ['Elastic limit and proportionality','The limit of proportionality marks the end of linear F-x behaviour. The elastic limit is the largest load for which the material still fully recovers.'],
   ['Elastic energy','Work done in stretching is the area under the force-extension graph. In the linear region this area is triangular, giving 1/2 Fx.']
  ],
  formulas:['k = F/x','σ = F/A','ε = ΔL/L','E = σ/ε','E_p = 1/2 Fx = 1/2 kx²'],
  reasoning:[
   'Check the graph region before selecting Hooke’s law or the triangular-area formula.',
   'When calculating stress, find area from the measured wire diameter and convert units carefully.',
   'When calculating strain, use extension and original length in the same unit.',
   'For Young-modulus experiments, reduce uncertainty by using a long wire and accurate diameter measurements at several positions.',
   'Use the shape of loading and unloading behaviour to decide whether deformation is elastic or plastic.'
  ],
  visuals:[
   'Sketch a force-extension graph with the straight proportional region and later non-linear behaviour.',
   'Sketch a stress-strain graph and label the initial gradient as Young modulus.',
   'Represent elastic energy as the area under the force-extension graph.'
  ],
  examTips:[
   'State the condition “within the limit of proportionality” when using Hooke’s law.',
   'Strain has no unit.',
   'Young modulus has the same unit as stress, Pa.',
   'For wire area, A = πd²/4, so diameter uncertainty can have a strong effect.'
  ],
  distinctions:[
   'Extension is an absolute length change; strain is extension divided by original length.',
   'Stiffness k describes a specimen; Young modulus describes a material property.',
   'Limit of proportionality ends linearity; elastic limit ends fully recoverable behaviour.',
   'Elastic deformation is reversible; plastic deformation is permanent.'
  ],
  quickRevision:['F = kx only in proportional region','stress = F/A','strain = ΔL/L','Young modulus = stress/strain','strain has no unit','area under F-x = work done','linear elastic energy = 1/2 Fx'],
  vocabulary:['load','extension','compression','limit of proportionality','elastic limit','stress','strain','Young modulus','elastic deformation','plastic deformation'],
  selfCheck:[
   'What is the difference between extension and strain?',
   'Why is Young modulus a better material comparison than spring constant?',
   'How is elastic energy obtained from a force-extension graph?',
   'Why can 1/2 Fx fail outside the proportional region?',
   'What measurements are needed to determine Young modulus for a wire?'
  ]
 }
},
'Waves':{
 summary:'Describe progressive waves, transverse and longitudinal behaviour, intensity, Doppler shift, the electromagnetic spectrum and polarisation.',
 keyPoints:[
  'Use displacement, amplitude, phase, period, frequency, wavelength and wave speed precisely.',
  'Apply v = fλ and connect intensity to power per area and amplitude squared.',
  'Interpret CRO time-base and y-gain information.',
  'Compare transverse and longitudinal waves and read their graphical representations.',
  'Apply the source-motion Doppler formula and Malus’s law.'
 ],
 formulas:['v = fλ','I = P/A','I ∝ amplitude²','f_o = f_s v/(v ± v_s)','I = I_0 cos²θ'],
 method:[
  'Identify whether a graph is displacement-position or displacement-time before reading wavelength or period.',
  'Use v = fλ only after placing frequency and wavelength in compatible SI units.',
  'For Doppler questions, decide first whether the source is moving toward or away from the observer.',
  'For polarisation, measure θ between the transmission axes relevant to the incident plane-polarised wave.'
 ],
 mistakes:[
  'Reading period from a displacement-position graph or wavelength from a displacement-time graph.',
  'Using amplitude rather than amplitude squared when comparing intensities.',
  'Choosing the wrong Doppler sign for an approaching or receding source.',
  'Applying polarisation ideas to longitudinal waves.'
 ],
 deepNotes:{
  overview:'Waves questions reward clear separation of spatial and temporal ideas. Know what varies with position, what varies with time, and how energy transfer differs from particle motion.',
  concepts:[
   ['Progressive wave','A progressive wave transfers energy from one place to another while particles of the medium oscillate about equilibrium rather than travelling with the wave.'],
   ['Wave quantities','Amplitude is maximum displacement, period is time for one cycle, frequency is cycles per second, wavelength is distance between points in phase, and phase difference describes relative position in a cycle.'],
   ['Wave equation','In one period a wave travels one wavelength, giving v = fλ.'],
   ['Intensity','Intensity is power transmitted per unit area. For a progressive wave in a given medium, intensity is proportional to amplitude squared.'],
   ['CRO use','Time-base determines horizontal time scale and y-gain determines vertical voltage scale, allowing frequency and amplitude to be measured from a trace.'],
   ['Transverse and longitudinal','Transverse oscillations are perpendicular to propagation; longitudinal oscillations are parallel and form compressions and rarefactions.'],
   ['Doppler effect','When a source moves relative to a stationary observer, wavefront spacing changes, so observed frequency differs from source frequency.'],
   ['Electromagnetic spectrum','All electromagnetic waves are transverse and travel at c in free space. Their regions differ by wavelength and frequency, with visible light roughly 400–700 nm.'],
   ['Polarisation','Polarisation demonstrates transverse behaviour. For plane-polarised light passing an analyser, Malus’s law gives I = I0 cos²θ.']
  ],
  formulas:['v = fλ','I = P/A','I ∝ A²','f_o = f_s v/(v ± v_s)','I = I0 cos²θ'],
  reasoning:[
   'Name the independent axis of a graph before interpreting spacing.',
   'Use phase ideas to compare oscillating points rather than relying only on picture shape.',
   'For Doppler effect, imagine whether wavefronts are compressed or stretched before selecting a sign.',
   'For intensity ratios, square the amplitude ratio.',
   'For polarising filters, track the angle between successive relevant transmission axes.'
  ],
  visuals:[
   'Draw displacement-position and displacement-time graphs side by side and label λ on one and T on the other.',
   'Sketch compressions and rarefactions for a longitudinal wave.',
   'Sketch compressed wavefronts in front of a moving source and expanded wavefronts behind it.',
   'Draw polariser axes and angle θ for Malus’s law.'
  ],
  examTips:[
   'Use Hz for frequency and metres for wavelength in v = fλ unless units are handled explicitly.',
   'Polarisation is evidence that a wave is transverse.',
   'For EM spectrum questions, compare wavelength and frequency inversely.',
   'The required Doppler relation here is for a moving source and stationary observer.'
  ],
  distinctions:[
   'Period is a time interval; wavelength is a spatial interval.',
   'Wave speed is propagation speed; particle velocity is oscillatory motion of the medium.',
   'Transverse oscillations are perpendicular; longitudinal oscillations are parallel.',
   'Amplitude is not intensity; intensity scales with amplitude squared.'
  ],
  quickRevision:['v = fλ','I = P/A','I ∝ A²','CRO: time-base gives time scale, y-gain gives vertical scale','moving source Doppler changes wavefront spacing','EM waves are transverse','Malus: I = I0 cos²θ'],
  vocabulary:['amplitude','phase difference','period','frequency','wavelength','intensity','transverse','longitudinal','Doppler effect','polarisation','Malus’s law'],
  selfCheck:[
   'How can you tell whether a graph spacing represents period or wavelength?',
   'If amplitude doubles, what happens to intensity?',
   'Why does an approaching source produce a higher observed sound frequency?',
   'Why is polarisation evidence for transverse waves?',
   'How are wavelength and frequency related across the electromagnetic spectrum?'
  ]
 }
},
'Superposition':{
 summary:'Use superposition to explain stationary waves, diffraction, two-source interference and diffraction gratings.',
 keyPoints:[
  'Apply the principle of superposition to overlapping waves.',
  'Explain stationary-wave formation and identify nodes and antinodes.',
  'Relate diffraction strength to aperture size relative to wavelength.',
  'State coherence requirements for stable interference.',
  'Use double-slit and diffraction-grating equations.'
 ],
 formulas:['double slit: λ = ax/D','diffraction grating: d sin θ = nλ'],
 method:[
  'For stationary waves, combine two opposite-travelling coherent waves of the same frequency and describe fixed nodes and antinodes.',
  'For diffraction, compare gap width with wavelength before predicting spreading.',
  'For interference, identify path difference and whether it produces constructive or destructive superposition.',
  'For grating questions, check order n and ensure sin θ does not exceed 1.'
 ],
 mistakes:[
  'Saying stationary waves transfer net energy along the pattern.',
  'Confusing diffraction with refraction.',
  'Using double-slit fringe spacing quantities in the wrong positions.',
  'Forgetting that coherence requires a constant phase relationship.'
 ],
 deepNotes:{
  overview:'Superposition is the rule that overlapping displacements add. From that one rule come stationary waves, interference patterns and many practical methods for measuring wavelength.',
  concepts:[
   ['Superposition principle','When waves overlap, the resultant displacement at a point is the algebraic sum of the individual displacements.'],
   ['Stationary waves','Two same-frequency waves travelling in opposite directions can form a fixed pattern of nodes and antinodes. There is no net energy transfer along an ideal stationary wave.'],
   ['Nodes and antinodes','Nodes have zero amplitude. Antinodes have maximum amplitude. Adjacent nodes are separated by λ/2, and a node to the nearest antinode by λ/4.'],
   ['Experimental stationary waves','Microwaves, stretched strings and air columns can all demonstrate stationary-wave patterns and allow wavelength to be inferred from node or antinode spacing.'],
   ['Diffraction','Diffraction is spreading when waves pass through an aperture or around an obstacle. Spreading is most significant when the aperture size is comparable to the wavelength.'],
   ['Interference and coherence','Stable two-source interference requires coherent waves, meaning same frequency with a constant phase difference.'],
   ['Double-slit interference','For small-angle geometry, fringe separation x, slit spacing a, screen distance D and wavelength λ satisfy λ = ax/D.'],
   ['Diffraction grating','Many equally spaced slits produce sharp maxima satisfying d sin θ = nλ. Higher orders occur at larger angles when physically possible.']
  ],
  formulas:['λ = ax/D','d sin θ = nλ'],
  reasoning:[
   'Start interference explanations with superposition and phase/path difference.',
   'Use geometry to identify which symbol represents slit spacing, fringe spacing and screen distance.',
   'For stationary waves, read wavelength from node or antinode spacing instead of from amplitude.',
   'For gratings, determine d from lines per unit length before using d sin θ = nλ.',
   'Reject impossible orders when nλ > d because sin θ would need to exceed 1.'
  ],
  visuals:[
   'Sketch two opposite travelling waves and their stationary-wave envelope.',
   'Mark nodes and antinodes on a stationary-wave pattern.',
   'Sketch strong versus weak diffraction for narrow and wide gaps.',
   'Draw double-slit geometry and a grating ray diagram with angle θ.'
  ],
  examTips:[
   'State that stationary waves result from superposition of opposite-travelling waves of the same frequency.',
   'Use centre-to-centre fringe spacing in the double-slit equation.',
   'Convert grating line density to spacing d using reciprocal units.',
   'Coherence is about constant phase difference, not merely equal amplitudes.'
  ],
  distinctions:[
   'Interference is the result of superposition; diffraction is spreading of a wave.',
   'Progressive waves transfer energy; ideal stationary-wave patterns have no net energy transfer along the pattern.',
   'Node amplitude is zero; antinode amplitude is maximum.',
   'Double-slit interference uses slit spacing a; diffraction grating uses grating spacing d.'
  ],
  quickRevision:['superposition = algebraic addition of displacement','node-node spacing = λ/2','node-antinode spacing = λ/4','diffraction strongest when gap ~ wavelength','coherent waves have constant phase difference','λ = ax/D','d sin θ = nλ'],
  vocabulary:['superposition','stationary wave','node','antinode','diffraction','interference','coherence','path difference','fringe','diffraction grating'],
  selfCheck:[
   'Why is there no net energy transfer along an ideal stationary wave?',
   'How can wavelength be found from node positions?',
   'When is diffraction most noticeable?',
   'What does coherence mean in an interference experiment?',
   'How can you determine whether a proposed diffraction-grating order is possible?'
  ]
 }
},
'Electricity':{
 summary:'Model current as charge flow, connect potential difference to energy per charge, and analyse resistance, resistivity, power and component I–V characteristics.',
 keyPoints:[
  'Use charge quantisation and Q = It.',
  'Interpret current microscopically with I = Anvq.',
  'Define potential difference as energy transferred per unit charge.',
  'Use electrical power relations.',
  'Explain resistance, resistivity and characteristic curves for common components.'
 ],
 formulas:['Q = It','I = Anvq','V = W/Q','P = VI','P = I²R','P = V²/R','V = IR','R = ρL/A'],
 method:[
  'Choose conventional current direction consistently even though electron drift is opposite in a metal.',
  'For I = Anvq, identify cross-sectional area, number density, drift speed and carrier charge with SI units.',
  'For I–V graphs, inspect whether gradient or V/I is being used before making a resistance statement.',
  'For resistivity, separate material property ρ from geometric factors L and A.'
 ],
 mistakes:[
  'Confusing charge flow rate with drift speed.',
  'Using electron direction as conventional current direction without explanation.',
  'Assuming a filament lamp obeys Ohm’s law at changing temperature.',
  'Confusing resistance R with resistivity ρ.'
 ],
 deepNotes:{
  overview:'Electricity connects microscopic charge-carrier motion with macroscopic circuit measurements. A strong solution can move between charge, energy, current, potential difference, resistance and power without mixing their meanings.',
  concepts:[
   ['Current','Electric current is rate of flow of charge carriers. Q = It links total transferred charge to current and time.'],
   ['Quantised charge','Charge occurs in integer multiples of the elementary charge. In metallic conductors the mobile carriers are electrons.'],
   ['Drift model','I = Anvq shows how current depends on conductor area A, carrier number density n, drift speed v and carrier charge q.'],
   ['Potential difference','Potential difference across a component is energy transferred from electrical energy per unit charge, V = W/Q.'],
   ['Electrical power','Power transferred by a component is VI. Combining with V = IR gives I²R and V²/R forms.'],
   ['Resistance','Resistance is V/I for a particular operating point. Ohm’s law states that current is proportional to potential difference for a conductor when physical conditions such as temperature remain constant.'],
   ['I–V characteristics','A metallic conductor at constant temperature is linear. A filament lamp becomes less conductive as it heats. A diode conducts strongly mainly in one direction after suitable forward bias.'],
   ['Resistivity','R = ρL/A separates geometry from the material property ρ. Longer conductors have greater resistance; larger cross-sectional area lowers resistance.'],
   ['Sensors','An LDR has lower resistance at higher light intensity. A negative-temperature-coefficient thermistor has lower resistance at higher temperature.']
  ],
  formulas:['Q = It','I = Anvq','V = W/Q','P = VI = I²R = V²/R','V = IR','R = ρL/A'],
  reasoning:[
   'Translate between microscopic and circuit descriptions: more carriers crossing per second means larger current.',
   'Use energy per charge to distinguish voltage from energy itself.',
   'For non-ohmic devices, use the actual operating point rather than assuming constant R.',
   'When comparing wires, isolate one factor at a time in R = ρL/A.',
   'Use qualitative I–V shape to explain temperature or direction-dependent behaviour.'
  ],
  visuals:[
   'Sketch I–V characteristics for an ohmic metallic conductor, filament lamp and diode.',
   'Draw a conductor cylinder showing length L and cross-sectional area A.',
   'Use arrows to contrast electron drift and conventional current in a metal.'
  ],
  examTips:[
   'Ohm’s law requires constant physical conditions, especially temperature.',
   'Check whether an I–V graph plots I vertically or V vertically before using its gradient.',
   'For I = Anvq, convert area to m² and use charge in coulombs.',
   'Use sensor resistance trends exactly: LDR down with light, NTC thermistor down with temperature.'
  ],
  distinctions:[
   'Current is charge per time; drift velocity is average carrier motion.',
   'Potential difference is energy transferred per charge; power is energy transferred per time.',
   'Resistance depends on sample dimensions and material; resistivity is a material property.',
   'Ohmic behaviour is linear at constant conditions; non-ohmic devices have changing V/I.'
  ],
  quickRevision:['Q = It','I = Anvq','V = W/Q','P = VI = I²R = V²/R','V = IR','R = ρL/A','LDR resistance decreases with light','NTC thermistor resistance decreases with temperature'],
  vocabulary:['charge carrier','conventional current','drift velocity','potential difference','resistance','Ohm’s law','resistivity','LDR','thermistor'],
  selfCheck:[
   'What physical factors determine current in I = Anvq?',
   'How is potential difference different from energy?',
   'Why does the resistance of a filament lamp increase with current?',
   'What is the difference between resistance and resistivity?',
   'How do LDR and NTC thermistor resistance change with their environmental variable?'
  ]
 }
},
'D.C. Circuits':{
 summary:'Analyse practical d.c. circuits using e.m.f., internal resistance, Kirchhoff’s laws, series and parallel combinations, potential dividers and null methods.',
 keyPoints:[
  'Distinguish e.m.f. from potential difference using energy per unit charge.',
  'Explain how internal resistance changes terminal potential difference.',
  'Apply Kirchhoff’s first and second laws from charge and energy conservation.',
  'Derive and use series and parallel resistance combinations.',
  'Use potential dividers, potentiometers and sensor circuits.'
 ],
 formulas:['E = energy supplied per unit charge','terminal p.d. V = E - Ir for a discharging source','series: R_T = R_1 + R_2 + ...','parallel: 1/R_T = 1/R_1 + 1/R_2 + ...','potential divider: V_out = V_in R_2/(R_1 + R_2) for two series resistors'],
 method:[
  'Label current directions and potential changes before writing Kirchhoff equations.',
  'At a junction, apply charge conservation to currents entering and leaving.',
  'Around a loop, choose one traversal direction and keep signs consistent for e.m.f.s and resistor drops.',
  'For potential dividers, identify which resistor the output is measured across.',
  'For potentiometer null methods, use the zero-current balance condition to compare potential differences.'
 ],
 mistakes:[
  'Treating e.m.f. as a force rather than energy supplied per unit charge.',
  'Using E = V at finite current when internal resistance is present.',
  'Changing loop sign convention halfway through a Kirchhoff calculation.',
  'Using the wrong resistor in the potential-divider ratio.'
 ],
 deepNotes:{
  overview:'D.C. circuits are conservation problems. Kirchhoff’s first law is charge conservation at a junction and the second law is energy conservation around a loop. Once those ideas are secure, network calculations become systematic.',
  concepts:[
   ['Circuit representation','Use standard circuit symbols and draw clear junctions, components and meters. An ammeter is placed in series; a voltmeter is placed across the relevant component.'],
   ['Electromotive force','E.m.f. is energy supplied by a source per unit charge around the complete circuit. It is measured in volts even though its name contains “force”.'],
   ['Potential difference','P.d. is energy transferred from electrical energy per unit charge across a component.'],
   ['Internal resistance','A real source has internal resistance r, so when current flows some energy is transferred inside the source. Terminal p.d. is therefore less than e.m.f. during discharge.'],
   ['Kirchhoff first law','The total current entering a junction equals the total current leaving because charge does not accumulate at the junction.'],
   ['Kirchhoff second law','The algebraic sum of potential changes around a closed loop is zero because energy is conserved.'],
   ['Series and parallel resistance','Series resistors carry the same current and their p.d.s add. Parallel branches share the same p.d. and their currents add.'],
   ['Potential divider','Two or more series resistors divide the supply p.d. in proportion to their resistances. Sensor resistors allow the output p.d. to respond to light or temperature.'],
   ['Potentiometer and null method','A potentiometer compares p.d.s using a balance point. At null, no current flows through the detector branch, reducing loading effects.']
  ],
  formulas:['V_terminal = E - Ir','R_series = ΣR','1/R_parallel = Σ(1/R)','V_out = V_in R_out/R_total for a simple divider'],
  reasoning:[
   'Use energy per charge language to decide whether a voltage is e.m.f. or p.d.',
   'For a source with internal resistance, separate the internal drop Ir from the external terminal p.d.',
   'Write one independent junction equation and enough independent loop equations to solve the unknowns.',
   'Check a parallel equivalent resistance is smaller than the smallest branch resistance.',
   'For a divider sensor, reason first about how sensor resistance changes, then infer how the output fraction changes.'
  ],
  visuals:[
   'Draw a source as ideal e.m.f. in series with internal resistance.',
   'Mark current arrows at every branch before applying Kirchhoff’s laws.',
   'Sketch a two-resistor potential divider and mark exactly where V_out is measured.',
   'Sketch a potentiometer with a sliding contact and galvanometer at the null point.'
  ],
  examTips:[
   'State the conservation principle behind each Kirchhoff law when asked to explain it.',
   'A source can have e.m.f. larger than its terminal p.d. because of internal energy transfer.',
   'Use exact fractions or sufficient significant figures until the final answer.',
   'In sensor-divider questions, the output trend depends on whether the sensor is the upper or lower resistor.'
  ],
  distinctions:[
   'E.m.f. is energy supplied per charge; p.d. is energy transferred per charge across a component.',
   'Kirchhoff first law concerns current at junctions; second law concerns potential changes around loops.',
   'Series components share current; parallel branches share potential difference.',
   'A potentiometer null method aims for zero detector current; a normal voltmeter measurement generally draws some current.'
  ],
  quickRevision:['V_terminal = E - Ir','junction: current in = current out','loop: algebraic sum of p.d. changes = 0','series resistances add','parallel reciprocals add','potential divider output follows resistance ratio','potentiometer compares p.d. at null'],
  vocabulary:['e.m.f.','potential difference','internal resistance','terminal p.d.','Kirchhoff’s first law','Kirchhoff’s second law','potential divider','potentiometer','galvanometer','null method'],
  selfCheck:[
   'Why is terminal p.d. less than e.m.f. for a discharging cell with internal resistance?',
   'What conservation law underlies each Kirchhoff law?',
   'How can you check whether a calculated parallel resistance is plausible?',
   'How does the position of an LDR in a potential divider affect the direction of V_out change?',
   'Why is a potentiometer null method useful for comparing potential differences?'
  ]
 }
},
'Particle Physics':{
 summary:'Use scattering evidence to build the nuclear atom model, represent nuclear changes, compare radiations, and classify fundamental particles using quarks, hadrons and leptons.',
 keyPoints:[
  'Infer a small dense nucleus from alpha-particle scattering.',
  'Use proton number, nucleon number, isotopes and nuclide notation.',
  'Conserve charge and nucleon number in nuclear equations.',
  'Compare alpha, beta-minus, beta-plus and gamma radiation and include neutrinos in beta decay.',
  'Classify quarks, antiquarks, hadrons, baryons, mesons and leptons.'
 ],
 formulas:['nuclide notation: ᴬ_ZX','proton = uud','neutron = udd','quark charges: u,c,t = +2/3 e; d,s,b = -1/3 e'],
 method:[
  'Balance nuclear equations by conserving total nucleon number and total charge.',
  'For beta decay, track both nucleon-level change and quark-level change.',
  'Classify a composite particle by its quark content before naming it baryon or meson.',
  'Use scattering observations as evidence for nuclear size and concentration of positive charge.'
 ],
 mistakes:[
  'Saying alpha particles are electrons or gamma rays are particles with charge.',
  'Forgetting the neutrino or antineutrino in beta-decay descriptions.',
  'Calling protons and neutrons fundamental particles.',
  'Mixing baryon and meson quark structures.'
 ],
 deepNotes:{
  overview:'Particle physics at AS Level connects experimental evidence with a simple particle model. The most important habits are conservation of charge and nucleon number, correct radiation composition, and accurate quark classification.',
  concepts:[
   ['Alpha scattering evidence','Most alpha particles pass through foil, showing atoms are mostly empty space. A small fraction scatter through large angles, implying positive charge and most mass are concentrated in a very small nucleus.'],
   ['Nuclear atom','The nucleus contains protons and neutrons; electrons occupy the surrounding region. Proton number identifies the element, while nucleon number counts protons plus neutrons.'],
   ['Isotopes and nuclides','Isotopes are nuclei of the same element with the same proton number but different neutron numbers. Nuclide notation records nucleon number and proton number.'],
   ['Conservation in nuclear processes','Total charge and total nucleon number are conserved in nuclear equations. These checks are the fastest way to complete or verify a decay equation.'],
   ['Alpha, beta and gamma','Alpha radiation consists of helium nuclei. Beta-minus is electrons, beta-plus is positrons, and gamma is electromagnetic radiation. Their masses and charges differ.'],
   ['Beta spectrum and neutrinos','Beta particles have a continuous energy distribution because decay energy is shared with a neutrino or antineutrino. Beta-minus emits an electron antineutrino; beta-plus emits an electron neutrino.'],
   ['Antiparticles','An antiparticle has the same mass as its corresponding particle and opposite charge. The positron is the electron’s antiparticle.'],
   ['Quarks','Six quark flavours exist. Up-type quarks have charge +2/3e and down-type quarks have charge -1/3e; antiquarks have opposite charges.'],
   ['Hadrons','Baryons consist of three quarks. Mesons consist of one quark and one antiquark. Protons are uud and neutrons are udd, so nucleons are composite rather than fundamental.'],
   ['Leptons','Electrons and neutrinos are fundamental leptons. They are not made from quarks.'],
   ['Quark changes in beta decay','In beta-minus decay a down quark changes to an up quark; in beta-plus decay an up quark changes to a down quark, consistent with neutron-proton conversion.']
  ],
  formulas:['proton = uud','neutron = udd','q(u,c,t)=+2/3e','q(d,s,b)=-1/3e'],
  reasoning:[
   'Use experimental observations to justify each feature of the nuclear model instead of simply stating the model.',
   'Balance A and Z values separately in every nuclear equation.',
   'Use particle charge and composition to identify missing decay products.',
   'For hadrons, add quark charges to verify the particle charge.',
   'Link beta decay at the nucleon level to the corresponding quark flavour change.'
  ],
  visuals:[
   'Sketch alpha-particle scattering with most paths straight and a few large deflections.',
   'Use a nuclide box showing A above Z next to the element symbol.',
   'Draw simple quark-content diagrams for proton, neutron, baryon and meson.',
   'Use before-and-after particle lists to check conservation.'
  ],
  examTips:[
   'Do not say the Rutherford experiment showed electrons orbiting in fixed energy levels; that conclusion does not follow from alpha scattering.',
   'Gamma emission changes neither proton number nor nucleon number.',
   'For beta equations, include the correct neutrino type when the question asks for a full particle description.',
   'Remember that only quarks and leptons in this syllabus are treated as fundamental.'
  ],
  distinctions:[
   'Proton number counts protons; nucleon number counts protons plus neutrons.',
   'Isotopes share proton number but differ in neutron number.',
   'Baryon = three quarks; meson = quark plus antiquark.',
   'Hadrons are made from quarks; leptons are not.',
   'Beta-minus involves electron emission and d to u change; beta-plus involves positron emission and u to d change.'
  ],
  quickRevision:['alpha scattering implies a tiny dense nucleus','conserve nucleon number and charge','β- emits electron + antineutrino','β+ emits positron + neutrino','up-type charge +2/3e','down-type charge -1/3e','proton uud','neutron udd','baryon qqq','meson q anti-q','electrons and neutrinos are leptons'],
  vocabulary:['nucleon number','proton number','isotope','nuclide','antiparticle','neutrino','quark','antiquark','hadron','baryon','meson','lepton'],
  selfCheck:[
   'Which alpha-scattering observations support the idea of a tiny dense nucleus?',
   'How do you check whether a nuclear decay equation is balanced?',
   'Why does beta radiation have a continuous energy spectrum?',
   'What are the quark compositions of a proton and neutron?',
   'How do baryons, mesons and leptons differ?'
  ]
 }
},
'AS Practical Skills':{
 summary:'Develop Paper 3 experimental skill: collect reliable data, present tables and graphs correctly, analyse relationships, estimate uncertainty, evaluate limitations and propose specific improvements.',
 keyPoints:[
  'Set up apparatus safely and collect enough measurements over a useful range.',
  'Record raw data with instrument-appropriate precision and consistent units.',
  'Construct clear tables and graphs using accepted scientific conventions.',
  'Use gradients, intercepts and transformed variables to test relationships.',
  'Estimate uncertainty and evaluate limitations with realistic improvements.'
 ],
 formulas:['straight-line form: y = mx + c','percentage uncertainty = absolute uncertainty / value × 100%','gradient uncertainty ≈ |gradient_best - gradient_worst|'],
 method:[
  'Plan the table and variable range before taking readings, then repeat where repetition improves reliability.',
  'Keep raw-data precision consistent with the measuring instrument.',
  'Choose graph scales that use most of the grid and draw a justified best-fit line or curve.',
  'Use large triangles on the best-fit line for gradient, not two raw points.',
  'For evaluation, pair each specific limitation with a practical improvement that directly addresses it.'
 ],
 mistakes:[
  'Copying measurements into a second table and introducing transcription errors.',
  'Using inconsistent decimal places for repeated raw readings.',
  'Forcing a best-fit line through the origin without physical justification.',
  'Writing vague improvements such as “use better equipment” without naming the limitation and mechanism.'
 ],
 deepNotes:{
  overview:'Paper 3 rewards disciplined experimental communication as much as taking readings. The strongest practical answers make measurements traceable from apparatus, to table, to graph, to calculation, to conclusion, then evaluate exactly what limits reliability.',
  concepts:[
   ['Data collection','Set up apparatus from written or diagram instructions, collect an appropriate number of readings, span a wide useful range and repeat readings when appropriate.'],
   ['Instrument precision','Record raw readings to precision justified by the instrument. Repeated values in one column should normally use consistent decimal places.'],
   ['Tables','Create the table before data collection. Include raw and calculated quantities, and write headings as quantity with unit, such as I / A.'],
   ['Calculated values','Show key working and use a sensible number of significant figures based on the precision of measured quantities.'],
   ['Graph layout','Label both axes with quantity and unit, choose simple scales, use a large fraction of the grid and use a false origin when appropriate.'],
   ['Plotting and trend','Plot points accurately, identify genuine anomalies when justified, and draw a smooth best-fit curve or straight line with balanced scatter.'],
   ['Gradient and intercept','For a straight line, use widely separated points on the best-fit line to determine gradient. Relate m and c back to the physical equation.'],
   ['Uncertainty','Express uncertainty in absolute or percentage form. For derived quantities, combine uncertainty using the appropriate simple rules.'],
   ['Evaluation','Identify limitations that actually affect the result, explain their effect, and suggest a feasible improvement that reduces that specific limitation.'],
   ['Experimental judgement','A good method produces measurable changes larger than the resolution and uncertainty of the apparatus.']
  ],
  formulas:['y = mx + c','percentage uncertainty = absolute uncertainty/value × 100%','Δm ≈ |m_best - m_worst|'],
  reasoning:[
   'Before measuring, ask which variable is changed, which is measured and which must be controlled.',
   'Choose a range that produces a clear trend without exceeding apparatus limits.',
   'Transform the theoretical equation into y = mx + c so the gradient and intercept have physical meaning.',
   'Compare scatter with measurement resolution before deciding whether a point is anomalous.',
   'In evaluation, explain why an improvement reduces uncertainty or systematic bias.'
  ],
  visuals:[
   'Prepare a model data table with quantity/unit headings before collecting readings.',
   'Sketch a graph occupying most of the grid, with a balanced best-fit line and large gradient triangle.',
   'Draw an error-bar example and a worst acceptable line when uncertainty treatment requires it.',
   'Use an apparatus diagram to identify parallax, alignment, zero-error and timing limitations.'
  ],
  examTips:[
   'Do not write units inside every body cell if the unit is already in the column heading.',
   'A gradient should come from the best-fit line, not from two experimental data points.',
   'Use specific limitation-improvement pairs: for example, parallax from a scale can be reduced by reading at eye level with a fiducial marker.',
   'Avoid claiming “human error”; name the actual measurement limitation.',
   'Do not automatically repeat every reading if repetition does not address the dominant uncertainty.'
  ],
  distinctions:[
   'Accuracy concerns closeness to the accepted value; precision concerns repeatability.',
   'Resolution is the smallest readable change; uncertainty is the estimated range around a measured value.',
   'Random uncertainty produces scatter; systematic effects shift results consistently.',
   'A limitation describes what restricts quality; an improvement must directly reduce that limitation.'
  ],
  quickRevision:['plan variables and range first','raw data precision must match instrument','table heading = quantity / unit','graph should use most of grid','gradient from best-fit line','show key calculations','state uncertainty clearly','pair each limitation with a specific improvement'],
  vocabulary:['independent variable','dependent variable','control variable','resolution','uncertainty','significant figures','best-fit line','gradient','intercept','anomaly','systematic error','random error'],
  selfCheck:[
   'How should raw readings be recorded when an instrument has fixed resolution?',
   'Why should a graph gradient use widely separated points on the best-fit line?',
   'How would you transform a physical relation into y = mx + c form?',
   'What makes an evaluation improvement specific rather than vague?',
   'How can you decide whether repeating a measurement will meaningfully improve the result?'
  ]
 }
}
};

const expectedTitles=Object.keys(notesByTitle);
const notes=[];
for(const title of expectedTitles){
 const entry=rows.find(e=>e.title===title);
 if(!entry)continue;
 const patch=notesByTitle[title];
 entry.summary=patch.summary;
 entry.keyPoints=patch.keyPoints;
 entry.formulas=patch.formulas;
 entry.method=patch.method;
 entry.mistakes=patch.mistakes;
 entry.lens='Use the official 9702 syllabus as the scope boundary, then connect definitions, diagrams, equations, practical evidence and exam reasoning.';
 entry.deepNotes=patch.deepNotes;
 entry.notesVerified=true;
 entry.sourcePublisher=BOARD;
 entry.sourceBook=BOOK;
 entry.sourceYear=YEAR;
 entry.noteSourceFile='User-supplied Cambridge International AS & A Level Physics 9702 syllabus; physicswithtalha.com AS Level Physics resources';
 entry.noteSourceBasis=SOURCE;
 notes.push({
  grade:'AS Level (11)',
  subject:'Physics',
  title,
  sourceBook:BOOK,
  sourceFile:entry.noteSourceFile,
  sourceBasis:SOURCE,
  notesVerified:true,
  deepNotes:patch.deepNotes
 });
}

window.STUDYAI_CAIE_AS_PHYSICS_DEEP_NOTES=notes;
window.STUDYAI_CAIE_AS_PHYSICS_DEEP_NOTES_STATUS={
 total:expectedTitles.length,
 matched:notes.length,
 unmatched:expectedTitles.filter(title=>!rows.some(e=>e.title===title)),
 preservedIds:rows.map(e=>e.id)
};

if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
