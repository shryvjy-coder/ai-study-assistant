/* StudyAI deep Cambridge International A Level Physics notes.
 * Scope authority: user-supplied Cambridge International AS & A Level Physics 9702
 * syllabus for 2025, 2026 and 2027. Physics with Talha A2 resources are used as a
 * supplementary teaching/topical-practice reference. All StudyAI explanations are original.
 */
(() => {
'use strict';

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const rows=curriculum.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='A Level (12)'&&e.subject==='Physics');
const BOARD='Cambridge International';
const BOOK='Physics 9702';
const YEAR='2025–2027';
const SOURCE='Official Cambridge International AS & A Level Physics 9702 syllabus supplied by the user; Physics with Talha A2 Level Physics resources used as a supplementary teaching and topical-practice reference';

const note=(summary,concepts,formulas,reasoning,examTips,mistakes,selfCheck,practice=[])=>({
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
   'Sketch the physical situation before calculating when direction, geometry, field shape, phase, energy or a graph controls the reasoning.',
   'Label vectors, signs, axes, gradients, areas and reference levels explicitly so the diagram becomes part of the solution rather than decoration.',
   'Keep exact symbolic relationships visible until the final substitution whenever this makes assumptions and dependencies clearer.'
  ],
  examTips,
  distinctions:concepts.slice(0,4).map(x=>x[0]+': '+x[1]),
  quickRevision:concepts.slice(0,6).map(x=>x[0]),
  vocabulary:concepts.slice(0,10).map(x=>x[0]),
  selfCheck,
  practice
 }
});

const notesByTitle={
'Motion in a Circle':note(
 'Connect angular and linear descriptions of uniform circular motion, then identify the inward resultant force that produces centripetal acceleration.',
 [
  ['Radian','One radian is the angle subtended at the centre by an arc equal in length to the radius. Radians make angular relationships such as s=rθ natural.'],
  ['Angular speed','Angular speed is rate of change of angular displacement. For uniform circular motion, ω=2π/T=2πf.'],
  ['Linear speed','A point moving in a circle of radius r has tangential speed v=rω. The velocity direction changes continuously even when speed is constant.'],
  ['Centripetal acceleration','The acceleration is directed toward the centre and has magnitude a=v²/r=rω². It changes velocity direction rather than necessarily changing speed.'],
  ['Centripetal force','Centripetal force is not a new force type. It is the name for the inward resultant of real forces such as gravity, tension, normal contact or electric/magnetic force.'],
  ['Force equations','For a mass m in uniform circular motion, inward resultant F=mv²/r=mrω².'],
  ['Period reasoning','Because v=2πr/T, circular-motion equations can often be rewritten in terms of period when orbital or rotating-system timing is given.']
 ],
 ['ω=2π/T=2πf','v=rω','a=v²/r=rω²','F=mv²/r=mrω²'],
 [
  'Draw the circle and mark the instantaneous velocity tangentially and acceleration toward the centre.',
  'Identify which real forces have radial components, then set their inward resultant equal to mv²/r.',
  'Choose v, ω or T according to the data rather than converting unnecessarily.',
  'Check that the final acceleration and force directions are radial, not tangential.'
 ],
 [
  'Do not draw a separate mysterious “centripetal force” if a real force already provides the inward resultant.',
  'Constant speed does not mean zero acceleration because velocity direction changes.',
  'Use radians when linking angular and linear quantities.',
  'For vertical circles or non-uniform motion, separate radial and tangential effects if the question requires it.'
 ],
 ['Treating centripetal force as an extra force','Pointing acceleration along the velocity','Using rω² for speed','Forgetting that inward resultant may be a difference of real forces'],
 ['What is one radian?','Why is a body moving at constant speed in a circle accelerating?','What real force can provide centripetal force for a satellite?','How are v and ω related?','Why is centripetal force described as a resultant rather than a force type?'],
 ['Use Physics with Talha A2 Motion in a Circle resources for conceptual/topical reinforcement.','After notes, practise original mixed calculations involving v, ω, T and inward resultant rather than memorising one formula pattern.']
),
'Gravitational Fields':note(
 'Model gravitational force, field strength, potential and orbital motion using the point-mass approximation, including geostationary satellites and negative gravitational potential energy.',
 [
  ['Gravitational field','Gravitational field strength g is force per unit mass on a small test mass and points in the direction of force on a positive mass.'],
  ['Point-mass law','For point masses m₁ and m₂ separated by r, F=Gm₁m₂/r². Outside a uniform sphere, the sphere may be treated as a point mass at its centre.'],
  ['Field strength of a point mass','Combining F=mg with Newton gravitation gives g=GM/r².'],
  ['Circular orbit','For a circular satellite orbit, gravity supplies the centripetal force, so GMm/r²=mv²/r or mrω².'],
  ['Geostationary orbit','A geostationary satellite has period 24 h, moves west-to-east, lies above the Equator and remains above the same point on Earth.'],
  ['Near-Earth approximation','g is approximately constant over small height changes because r changes by a tiny fraction of Earth’s radius.'],
  ['Gravitational potential','Potential φ at a point is work done per unit mass in bringing a small test mass from infinity to that point. For a point mass, φ=-GM/r.'],
  ['Potential energy','For masses M and m, gravitational potential energy EP=mφ=-GMm/r. The negative sign reflects the chosen zero at infinity and the bound state.'],
  ['Potential gradients','Field points in the direction of decreasing potential. Potential becomes less negative as distance from an isolated mass increases.']
 ],
 ['F=Gm₁m₂/r²','g=GM/r²','φ=-GM/r','E_P=-GMm/r','T²=4π²r³/(GM) for circular orbit'],
 [
  'Use distance from the centre of the attracting body, not height above the surface, in inverse-square and potential formulas.',
  'For orbital derivations, equate gravity to centripetal force before cancelling mass or substituting v=2πr/T.',
  'Keep the negative sign in gravitational potential and potential energy unless calculating only a magnitude change.',
  'For energy changes, evaluate final minus initial potential energy carefully.'
 ],
 [
  'A gravitational field is attractive, so radial field lines point inward.',
  'Potential is scalar; field strength is vector.',
  'Potential zero is conventionally at infinity for an isolated mass.',
  'A higher orbit has greater gravitational potential energy because the value is less negative.'
 ],
 ['Using height h instead of centre distance r','Dropping the negative sign in φ','Confusing potential with potential energy','Calling any 24-hour orbit geostationary without equatorial/west-east conditions'],
 ['Why can Earth be treated as a point mass for an external satellite?','How does a circular-orbit derivation lead to T² proportional to r³?','Why is gravitational potential negative?','What four conditions define a geostationary orbit?','Why does potential energy increase when a satellite is raised?'],
 ['Use Physics with Talha A2 Gravitational Fields notes/topical practice for orbital and potential questions.','Practise deriving orbital relationships rather than memorising Kepler-style forms in isolation.']
),
'Temperature':note(
 'Distinguish thermal energy transfer from temperature, understand thermodynamic temperature and absolute zero, and calculate energy changes using specific heat capacity and latent heat.',
 [
  ['Thermal equilibrium','Energy transfers spontaneously from higher-temperature regions toward lower-temperature regions until equal temperature is reached and there is no net thermal transfer.'],
  ['Thermometric property','A measurable property that changes predictably with temperature can be used for thermometry, such as liquid density, gas volume at constant pressure, metal resistance or thermocouple e.m.f.'],
  ['Thermodynamic scale','Thermodynamic temperature does not depend on the particular thermometric substance used.'],
  ['Kelvin and Celsius','The size of one kelvin equals one Celsius degree, with T/K=θ/°C+273.15.'],
  ['Absolute zero','0 K is the lowest possible thermodynamic temperature and is called absolute zero.'],
  ['Specific heat capacity','c is energy required per unit mass per unit temperature rise, so thermal energy change Q=mcΔT when no phase change is occurring.'],
  ['Specific latent heat','L is energy required per unit mass for a phase change at constant temperature, Q=mL. Fusion concerns solid-liquid change; vaporisation concerns liquid-gas change.'],
  ['Heating curves','During a phase change, supplied energy changes intermolecular potential energy rather than raising temperature.']
 ],
 ['T/K=θ/°C+273.15','Q=mcΔT','Q=mL'],
 [
  'Decide first whether the process changes temperature, phase, or both in separate stages.',
  'Use kelvin for absolute-temperature relationships; temperature differences have the same numerical size in K and °C.',
  'For multi-stage heating, calculate each stage separately and add the energies.',
  'State the relevant phase-change latent heat rather than using a generic L without context.'
 ],
 [
  'Temperature measures thermal state, not total internal energy.',
  'During a phase change the temperature may remain constant while energy is transferred.',
  'Specific heat capacity and specific latent heat have different units and meanings.',
  'Do not subtract 273.15 from a temperature difference.'
 ],
 ['Using mcΔT during a constant-temperature phase change','Using Celsius instead of kelvin in absolute-temperature laws','Confusing latent heat of fusion and vaporisation','Saying equal temperature means equal internal energy'],
 ['What defines thermal equilibrium?','Why can electrical resistance be a thermometric property?','How are kelvin and Celsius related?','What happens to supplied energy during melting?','How do the meanings of c and L differ?'],
 ['Use Physics with Talha A2 Temperature resources for thermometry and thermal-energy application.','Practise multi-stage heating and cooling problems that require deciding between mcΔT and mL.']
),
'Ideal Gases':note(
 'Use the mole and ideal-gas equation, then connect macroscopic pressure and temperature to molecular motion through kinetic theory and translational kinetic energy.',
 [
  ['Mole and Avogadro constant','One mole contains NA specified particles. The amount of substance n and particle number N are related by N=nNA.'],
  ['Ideal-gas model','An ideal gas obeys pV proportional to thermodynamic temperature under the model assumptions.'],
  ['Equation of state','pV=nRT for n moles and pV=NkT for N molecules.'],
  ['Boltzmann constant','k=R/NA links molar and molecular descriptions.'],
  ['Kinetic-theory assumptions','Model molecules as numerous, randomly moving particles with negligible own volume and negligible intermolecular forces except during brief elastic collisions.'],
  ['Origin of pressure','Pressure results from momentum changes when molecules collide with container walls.'],
  ['Molecular pressure equation','A collision model gives pV=(1/3)Nm<c²>, where <c²> is mean-square speed.'],
  ['RMS speed','c_rms=√<c²>. RMS is not the same as ordinary mean speed.'],
  ['Average translational kinetic energy','Comparing kinetic-theory and ideal-gas equations gives average translational KE per molecule=(3/2)kT. Absolute temperature therefore measures mean translational kinetic energy in this model.']
 ],
 ['N=nN_A','pV=nRT','pV=NkT','k=R/N_A','pV=(1/3)Nm<c²>','c_rms=√<c²>','<E_K>=(3/2)kT'],
 [
  'Convert all gas temperatures to kelvin and use a consistent pressure-volume unit system.',
  'Choose nRT or NkT according to whether the data are in moles or molecules.',
  'For kinetic-theory explanations, connect wall collisions to momentum change, force and pressure.',
  'When comparing molecular speeds, remember c_rms depends on both temperature and molecular mass.'
 ],
 [
  'Do not confuse molecule mass m with total gas mass Nm.',
  'Mean-square speed is not square of the mean speed.',
  'Use absolute temperature, never Celsius, in molecular-energy relations.',
  'Pressure is caused by wall collisions, not by molecules “having pressure”.'
 ],
 ['Using N where n is required','Using °C in pV=nRT','Confusing c_rms with average speed','Omitting the one-third factor in the kinetic-theory relation'],
 ['How are n and N related?','What assumptions define the ideal-gas kinetic model?','How do molecular collisions create pressure?','How is c_rms defined?','Why does average molecular translational KE depend only on T in the ideal-gas model?'],
 ['Use Physics with Talha A2 Ideal Gases resources for equation-of-state and kinetic-theory reasoning.','Practise switching between macroscopic pV=nRT and microscopic pV=NkT forms.']
),
'Thermodynamics':note(
 'Track internal energy, heating and mechanical work with a consistent sign convention using the first law of thermodynamics.',
 [
  ['Internal energy','Internal energy U is a state property equal to the sum of random molecular kinetic and intermolecular potential energies.'],
  ['Temperature and internal energy','A temperature rise generally corresponds to increased random molecular kinetic energy and therefore increased internal energy.'],
  ['Pressure-volume work','At constant pressure, work magnitude associated with volume change is pΔV.'],
  ['Work done by gas','During expansion the gas does work on surroundings; with Cambridge’s stated first-law convention, work W in ΔU=q+W means work done on the system.'],
  ['Work done on gas','Compression transfers energy mechanically into the gas, so W is positive under the “work done on system” convention.'],
  ['Heating q','q is positive when energy is transferred to the system by heating and negative when energy leaves by heating.'],
  ['First law','ΔU=q+W expresses energy conservation for internal energy using the syllabus sign convention.'],
  ['Process interpretation','Always identify whether the gas expands/compresses and gains/loses thermal energy before assigning signs.']
 ],
 ['W=pΔV for constant pressure (magnitude)','ΔU=q+W, where W is work done on the system'],
 [
  'Write the sign convention at the top of a thermodynamics calculation.',
  'Determine signs from the physical process before inserting numbers.',
  'Separate energy transferred by heating from work transfer.',
  'Check whether ΔV refers to final minus initial volume and whether the question asks work by or on the gas.'
 ],
 [
  'The Cambridge equation here uses W as work done on the system.',
  'Internal energy is not the same thing as temperature.',
  'A system can gain internal energy through work even without heating.',
  'At constant pressure, the area under a p-V graph corresponds to work magnitude.'
 ],
 ['Using ΔU=q-W with the Cambridge-defined W without changing meaning','Treating expansion work as positive work on the gas','Equating temperature directly to internal energy','Ignoring units when multiplying p by ΔV'],
 ['What microscopic energies make up internal energy?','What sign does W have for compression under ΔU=q+W?','Can internal energy rise without heating?','Why does pΔV have units of energy?','How would you decide the sign of q?'],
 ['Use Physics with Talha A2 Thermodynamics resources for sign-convention and first-law practice.','Practise narrating the energy transfers before doing arithmetic.']
),
'Oscillations':note(
 'Model simple harmonic motion mathematically and graphically, track its energy exchange, and understand damping, forced oscillations and resonance.',
 [
  ['Oscillation terms','Displacement is measured from equilibrium; amplitude is maximum displacement; period T is time per cycle; f=1/T; angular frequency ω=2πf.'],
  ['SHM condition','Simple harmonic motion occurs when acceleration is proportional to displacement and directed toward equilibrium: a=-ω²x.'],
  ['Displacement solution','A valid SHM solution is x=x₀sinωt for a suitable choice of phase origin.'],
  ['Velocity','For x=x₀sinωt, v=v₀cosωt with v₀=ωx₀; also v=±ω√(x₀²-x²).'],
  ['Graphs and phase','Displacement, velocity and acceleration are sinusoidal with fixed phase relationships; acceleration is exactly opposite in phase to displacement.'],
  ['SHM energy','Total energy E=(1/2)mω²x₀². Kinetic energy is greatest at equilibrium and potential energy greatest at extreme displacement.'],
  ['Damping','Resistive forces remove mechanical energy. Light damping gives decaying oscillations; critical damping returns to equilibrium fastest without oscillation; heavy damping returns more slowly without oscillation.'],
  ['Forced oscillation','An external periodic driver transfers energy to the oscillator.'],
  ['Resonance','Amplitude is maximum when driving frequency matches the natural frequency, with damping controlling the sharpness and size of the resonance response.']
 ],
 ['f=1/T','ω=2πf','a=-ω²x','x=x₀sinωt','v=±ω√(x₀²-x²)','v_max=ωx₀','E=(1/2)mω²x₀²'],
 [
  'Check the defining condition a proportional to -x before calling motion SHM.',
  'Use phase and graph shape to connect x, v and a rather than memorising isolated maxima.',
  'At x=0, speed is maximum; at |x|=x₀, speed is zero.',
  'For damping/resonance questions, distinguish natural frequency, driving frequency and damping strength.'
 ],
 [
  'SHM acceleration points toward equilibrium.',
  'Maximum acceleration occurs at maximum displacement.',
  'Critical damping is not the same as light damping.',
  'Resonance is a forced-oscillation effect, not simply any large oscillation.'
 ],
 ['Writing a=+ω²x','Saying velocity is maximum at the endpoints','Confusing critical and heavy damping','Saying resonance occurs at high frequency rather than matching natural frequency'],
 ['What condition defines SHM?','What is the phase relation between x and a?','Where is KE maximum?','What distinguishes critical damping?','Why does resonance produce large amplitude?'],
 ['Use Physics with Talha A2 Oscillations resources for SHM graphs and resonance practice.','Practise moving between algebraic, graphical and energy descriptions of the same SHM state.']
),
'Electric Fields':note(
 'Treat electric fields as force-per-charge systems, analyse uniform and point-charge fields, and connect field strength to electric potential and potential energy.',
 [
  ['Electric field','Electric field strength E is force per unit positive charge; force on charge q is F=qE, reversing direction for negative q.'],
  ['Field lines','Field lines show the direction a positive test charge would accelerate; line density indicates relative field strength.'],
  ['Uniform field','Between ideal parallel plates, E=ΔV/Δd in magnitude and field lines are parallel and equally spaced.'],
  ['Charged-particle motion','A charge in a uniform field experiences constant force qE and therefore constant acceleration qE/m when other forces are negligible.'],
  ['Coulomb law','For point charges in free space, force magnitude F=Q₁Q₂/(4πε₀r²), with attraction/repulsion determined by signs.'],
  ['Point-charge field','E=Q/(4πε₀r²) with direction set by the sign of source charge.'],
  ['Electric potential','Potential V is work done per unit positive charge in bringing a small test charge from infinity to a point.'],
  ['Potential gradient','Electric field is the negative potential gradient: field points toward decreasing potential.'],
  ['Point-charge potential','V=Q/(4πε₀r), a scalar that may be positive or negative.'],
  ['Potential energy','For source charge Q and test charge q, EP=Qq/(4πε₀r).']
 ],
 ['F=qE','E=ΔV/Δd for uniform field','F=Q₁Q₂/(4πε₀r²)','E=Q/(4πε₀r²)','E=-dV/dr conceptually','V=Q/(4πε₀r)','E_P=Qq/(4πε₀r)'],
 [
  'Separate source charge from test charge before choosing a field or force formula.',
  'Use vector direction for E and force, but scalar addition for potentials.',
  'For parallel plates, use plate separation perpendicular to the plates.',
  'For motion questions, convert electric force to acceleration before using kinematics.'
 ],
 [
  'Potential is scalar; field strength is vector.',
  'A negative charge experiences force opposite to E.',
  'Zero potential does not necessarily mean zero field.',
  'Electric potential can be positive or negative because charge can have either sign.'
 ],
 ['Using qE for the field created by q','Giving force direction as E for a negative charge','Adding field strengths as scalars without direction','Confusing potential with potential energy'],
 ['What does E represent physically?','How does a negative test charge move relative to field direction?','How are E and V related in a uniform field?','Why can potential be scalar-added?','How do point-charge field and potential depend differently on r?'],
 ['Use Physics with Talha A2 Electric Fields resources for field/potential comparisons and particle motion.','Practise parallel gravitational/electric-field reasoning while keeping charge sign differences explicit.']
),
'Capacitance':note(
 'Understand capacitance for isolated and parallel-plate conductors, combine capacitors, calculate stored energy, and model exponential discharge through resistance.',
 [
  ['Capacitance','Capacitance C=Q/V measures charge stored per unit potential difference.'],
  ['Isolated and parallel-plate conductors','The same definition C=Q/V applies, though geometry determines the numerical capacitance.'],
  ['Parallel combination','Capacitors in parallel share potential difference and their charges add, giving C_total=ΣC.'],
  ['Series combination','Series capacitors carry equal magnitude charge while potential differences add, giving 1/C_total=Σ(1/C).'],
  ['Stored energy','Energy stored equals area under a V-Q graph, giving W=(1/2)QV=(1/2)CV²=Q²/(2C).'],
  ['Discharge','When a charged capacitor discharges through R, Q, V and current magnitude decay exponentially.'],
  ['Time constant','τ=RC. After one time constant an exponential quantity has fallen to e⁻¹≈0.37 of its initial value.'],
  ['Exponential law','x=x₀e^(-t/RC) may represent Q, V or discharge-current magnitude in the standard RC model.'],
  ['Graph interpretation','The instantaneous gradient reflects rate of change; exponential decay never reaches zero in finite ideal-model time.']
 ],
 ['C=Q/V','parallel: C_T=ΣC','series: 1/C_T=Σ(1/C)','W=(1/2)QV=(1/2)CV²=Q²/(2C)','τ=RC','x=x₀e^(-t/RC)'],
 [
  'Determine whether capacitors share V or Q from the circuit connection before combining them.',
  'For energy changes, decide whether Q, V or C is held fixed.',
  'Use τ=RC to estimate the graph scale before detailed calculation.',
  'When linearising an exponential discharge, take logarithms only if the question’s method requires it.'
 ],
 [
  'Series capacitors have a smaller equivalent capacitance than any individual capacitor.',
  'Parallel capacitors add directly.',
  'Energy is not simply QV; the factor one-half matters for charging from zero.',
  'Current direction during discharge may be opposite to charging current while its magnitude decays exponentially.'
 ],
 ['Adding series capacitances directly','Forgetting 1/2 in stored energy','Using τ=R/C','Assuming exponential decay reaches exact zero after a few time constants'],
 ['Why do series capacitors carry equal charge?','How is capacitor energy related to the V-Q graph?','What fraction remains after one time constant?','How do Q and V decay in an RC circuit?','Why is parallel capacitance larger?'],
 ['Use Physics with Talha A2 Capacitance resources for combinations, energy and exponential discharge.','Practise extracting τ from graphs as well as calculating it from R and C.']
),
'Magnetic Fields':note(
 'Analyse forces on currents and moving charges, Hall voltage, magnetic field patterns and velocity selection, then connect changing magnetic flux to induced e.m.f. through Faraday’s and Lenz’s laws.',
 [
  ['Magnetic field','A magnetic field is produced by moving charges or permanent magnets and can be represented by field lines.'],
  ['Force on current','A conductor of length L carrying current I in flux density B experiences F=BIL sinθ. Fleming’s left-hand rule gives the force direction for conventional current.'],
  ['Flux density','B can be defined through force per unit current per unit length for a wire at right angles to the field.'],
  ['Force on moving charge','A charge Q moving at speed v at angle θ to B experiences F=BQv sinθ; the force is perpendicular to both velocity and field.'],
  ['Circular charged-particle motion','For v perpendicular to B, magnetic force acts centripetally and changes direction but not speed or kinetic energy.'],
  ['Hall effect','Magnetic deflection of charge carriers builds a transverse electric field. The syllabus relation is V_H=BI/(ntq), where n is carrier number density and t is sample thickness.'],
  ['Hall probe','A calibrated Hall voltage can be used to measure magnetic flux density.'],
  ['Velocity selection','Crossed electric and magnetic fields select particles with qE=qvB, so v=E/B when forces oppose.'],
  ['Fields due to currents','Know qualitative field patterns for a long straight wire, flat circular coil and long solenoid; a ferrous core strengthens a solenoid field.'],
  ['Forces between currents','Each current creates a magnetic field that acts on the other conductor, explaining attraction/repulsion of parallel current-carrying wires.'],
  ['Magnetic flux','Flux through area perpendicular to the field is Φ=BA; flux linkage is NΦ for N turns.'],
  ['Electromagnetic induction','Changing magnetic flux linkage induces an e.m.f. Faraday’s law gives magnitude from rate of change of flux linkage; Lenz’s law gives the direction opposing the change that produces it.'],
  ['Induction experiments','Moving a magnet/coil or changing current in a nearby circuit demonstrates that induced e.m.f. depends on how rapidly flux linkage changes, not merely on flux existing.']
 ],
 ['F=BIL sinθ','F=BQv sinθ','V_H=BI/(ntq)','v=E/B for crossed-field selector','Φ=BA','flux linkage=NΦ','|ε|=|d(NΦ)/dt| conceptually'],
 [
  'Use a direction rule only after identifying conventional current or positive-charge motion; reverse the force for a negative charge.',
  'For circular motion, set BQv=mv²/r and cancel carefully.',
  'For Hall-effect problems, distinguish carrier charge magnitude q, carrier density n and sample thickness t.',
  'For induction, state what changes the flux linkage and use Lenz’s law to justify direction physically.'
 ],
 [
  'Magnetic force does no work on a charge when it remains perpendicular to velocity.',
  'Electromagnetic induction belongs inside Cambridge topic 20 Magnetic Fields even though some teaching resources present it separately.',
  'Flux and flux linkage are different quantities.',
  'Lenz’s law opposes the change in flux, not necessarily the original field itself.'
 ],
 ['Using Fleming’s left hand without correcting for electron direction','Saying magnetic force increases particle speed','Confusing B with flux Φ','Saying a steady unchanging flux induces an e.m.f.','Applying Lenz’s law as “opposite direction” without identifying the change'],
 ['Why does a magnetic field bend but not speed up a charged particle?','How does a velocity selector work?','What creates Hall voltage?','What is the difference between flux and flux linkage?','What exactly does Lenz’s law oppose?'],
 ['Use Physics with Talha A2 Magnetic Fields resources and its separate electromagnetic-induction material as supplementary practice.','Practise induction explanations with explicit cause → flux-linkage change → induced e.m.f. → Lenz direction chains.']
),
'Alternating Currents':note(
 'Describe sinusoidal alternating quantities, connect peak and r.m.s. values to power, and explain half-wave/full-wave rectification and capacitor smoothing.',
 [
  ['Alternating quantity','An alternating current or voltage changes magnitude and direction/polarity periodically.'],
  ['Sinusoidal form','A sinusoidal quantity may be written x=x₀sinωt, where x₀ is peak value and ω=2πf.'],
  ['Period and frequency','T=1/f and one cycle corresponds to 2π radians of phase.'],
  ['Mean power','For a sinusoidal current in a resistive load, mean power is half the maximum instantaneous power.'],
  ['RMS meaning','The r.m.s. current or voltage is the DC value that would produce the same mean power in a resistor.'],
  ['RMS relations','For a sinusoid, I_rms=I₀/√2 and V_rms=V₀/√2.'],
  ['Half-wave rectification','A single diode conducts for one half-cycle and blocks the other, producing separated pulses of one polarity.'],
  ['Full-wave bridge','Four diodes route both AC half-cycles through the load in the same direction, doubling ripple frequency compared with half-wave.'],
  ['Capacitor smoothing','A capacitor charges near peaks and discharges through the load between peaks. Larger capacitance or larger load resistance slows discharge and reduces ripple.']
 ],
 ['x=x₀sinωt','ω=2πf','T=1/f','I_rms=I₀/√2','V_rms=V₀/√2','P_mean=(1/2)P_max for sinusoidal resistive load'],
 [
  'Label peak, period and zero crossings before reading an AC graph.',
  'Use r.m.s. values in ordinary resistor power formulas unless the question asks instantaneous/peak power.',
  'For rectifier diagrams, track current direction through the load on each half-cycle.',
  'For smoothing, explain the charge/discharge timing and then link ripple size to RC behaviour.'
 ],
 [
  'RMS is not the arithmetic mean of a sinusoid.',
  'A full-wave bridge uses both half-cycles.',
  'A smoothing capacitor does not make the voltage perfectly constant.',
  'Greater load resistance generally slows capacitor discharge and improves smoothing.'
 ],
 ['Using peak voltage directly for mean resistor power','Saying full-wave output alternates polarity','Claiming a capacitor blocks all ripple instantly','Confusing period with half-period between rectified peaks'],
 ['What physical meaning does r.m.s. have?','How are peak and r.m.s. values related for a sinusoid?','Why does a bridge rectifier use both half-cycles?','How does increasing C affect ripple?','How does load resistance affect smoothing?'],
 ['Use Physics with Talha A2 Alternating Currents resources for AC graphs, rectification and smoothing.','Practise sketching input, rectified and smoothed waveforms from the same time axis.']
),
'Quantum Physics':note(
 'Use photons to explain energy transfer and the photoelectric effect, combine wave and particle evidence through de Broglie wavelength, and interpret atomic line spectra with discrete energy levels.',
 [
  ['Photon','A photon is a quantum of electromagnetic energy with E=hf.'],
  ['Electronvolt','1 eV is the energy gained by an electron moving through a potential difference of 1 V and is useful for microscopic energies.'],
  ['Photon momentum','A photon has momentum p=E/c=hf/c despite zero rest mass.'],
  ['Photoelectric emission','Electrons can be emitted from a metal when incident photon energy is sufficient to overcome the work function.'],
  ['Threshold frequency','At threshold, hf₀=Φ. Radiation below threshold frequency cannot eject photoelectrons regardless of intensity in the photon model.'],
  ['Einstein photoelectric equation','Maximum photoelectron KE satisfies hf=Φ+(1/2)mv_max².'],
  ['Intensity effect','At fixed frequency above threshold, greater intensity means more photons per unit time, so photoelectric current increases, while maximum KE remains set by photon energy.'],
  ['Wave-particle duality','Interference/diffraction show wave behaviour of radiation; photoelectric effect shows particulate behaviour. Electron diffraction shows matter also has wave behaviour.'],
  ['de Broglie wavelength','A moving particle has associated wavelength λ=h/p.'],
  ['Atomic energy levels','Isolated atoms have discrete electron energy levels. Transitions between levels emit or absorb photons with hf equal to the energy difference.'],
  ['Line spectra','Because only particular energy differences exist, emission and absorption spectra contain discrete lines rather than a continuous range.']
 ],
 ['E=hf','p=E/c','hf=Φ+(1/2)mv_max²','λ=h/p','hf=E₁-E₂'],
 [
  'Separate photon energy from photon arrival rate when reasoning about frequency versus intensity.',
  'Convert eV to joules only when needed for SI calculations.',
  'For photoelectric graphs, identify threshold/intercept and gradient from the governing equation.',
  'For spectra, determine whether the electron moves to a higher or lower energy level before assigning absorption or emission.'
 ],
 [
  'Intensity does not raise maximum photoelectron KE at fixed frequency.',
  'Threshold frequency is a property of the surface material through its work function.',
  'Electron diffraction is evidence for matter waves.',
  'An emitted photon carries the positive energy difference between initial and final levels.'
 ],
 ['Saying brighter low-frequency light can overcome a threshold','Confusing work function with maximum KE','Using λ=hc/E for massive particles without relating to p','Reversing absorption and emission transitions'],
 ['Why is there a threshold frequency?','What changes when light intensity increases above threshold?','What evidence demonstrates electron wave behaviour?','How is de Broglie wavelength related to momentum?','Why are atomic spectra line spectra?'],
 ['Use Physics with Talha A2 Quantum Physics resources for photon, photoelectric and spectra practice.','Practise explaining experimental evidence, not only substituting into equations.']
),
'Nuclear Physics':note(
 'Connect mass defect to nuclear binding energy and energy release, then model radioactive decay statistically with activity, decay constant, half-life and exponential laws.',
 [
  ['Mass-energy equivalence','Mass and energy are related by E=mc², so small mass changes can correspond to large nuclear energy changes.'],
  ['Nuclear equations','Balance nucleon number and proton number across nuclear reactions.'],
  ['Mass defect','Mass defect is the difference between the total mass of separated constituent nucleons and the actual nuclear mass.'],
  ['Binding energy','Binding energy is the energy required to separate a nucleus completely into its nucleons, equal to Δmc².'],
  ['Binding energy per nucleon','The BE-per-nucleon curve indicates relative nuclear stability and explains why fusion of light nuclei and fission of very heavy nuclei can release energy.'],
  ['Fusion','Light nuclei combine to form a more tightly bound nucleus, releasing energy if total BE increases.'],
  ['Fission','A heavy nucleus splits into more tightly bound medium-mass nuclei, also releasing energy when BE per nucleon rises.'],
  ['Random and spontaneous decay','Individual decay timing is unpredictable, but large populations follow statistical laws; decay does not require an external trigger.'],
  ['Activity','Activity A is decay rate and obeys A=λN.'],
  ['Decay constant','λ is the probability per unit time that a nucleus decays, with t₁/₂=0.693/λ.'],
  ['Exponential decay','N, activity and ideal received count rate can follow x=x₀e^(-λt).'],
  ['Count fluctuations','Random fluctuations in measured count rate are direct experimental evidence of the statistical nature of decay.']
 ],
 ['E=mc²','E_release=Δmc²','A=λN','λ=0.693/t₁/₂','x=x₀e^(-λt)'],
 [
  'Use consistent mass units and convert mass defect to kilograms before E=Δmc² unless using an approved energy-equivalent unit method.',
  'Balance nuclear equations before calculating energy.',
  'Read the BE-per-nucleon graph as energy per nucleon, not total binding energy.',
  'For decay, distinguish activity A from number N even though both have the same exponential factor.'
 ],
 [
  'Greater BE per nucleon generally means a more tightly bound nucleus.',
  'Fusion and fission release energy for different regions of the BE-per-nucleon curve.',
  'Half-life is statistical and independent of how long a particular undecayed nucleus has already existed.',
  'Background count may need to be removed before analysing a measured decay curve if specified.'
 ],
 ['Confusing mass defect with lost nucleons','Using total binding energy instead of BE per nucleon for stability comparison','Saying decay becomes more likely as a nucleus ages','Confusing λ with activity'],
 ['What is mass defect?','Why can both fusion and fission release energy?','What does λ represent physically?','How are λ and half-life related?','Why do count rates fluctuate?'],
 ['Use Physics with Talha A2 Nuclear Physics resources for binding-energy and decay practice.','Practise interpreting BE-per-nucleon graphs and exponential decay both algebraically and graphically.']
),
'Medical Physics':note(
 'Explain ultrasound, X-ray and PET imaging from their underlying physics, including impedance, attenuation, image contrast, X-ray production and electron-positron annihilation.',
 [
  ['Piezoelectric effect','A piezoelectric crystal changes shape when a p.d. is applied and generates an e.m.f. when mechanically deformed, allowing ultrasound transmission and detection.'],
  ['Ultrasound pulse-echo','Short ultrasound pulses reflect at tissue boundaries; travel time and known sound speed locate internal structures.'],
  ['Acoustic impedance','Specific acoustic impedance Z=ρc. A difference in impedance across a boundary determines reflected intensity.'],
  ['Ultrasound reflection coefficient','I_R/I₀=(Z₁-Z₂)²/(Z₁+Z₂)² for normal incidence in the syllabus model.'],
  ['Attenuation','Ultrasound intensity can decrease as I=I₀e^(-μx), where μ is attenuation coefficient.'],
  ['X-ray production','High-speed electrons accelerated through a p.d. strike a metal target. The maximum possible photon energy eV gives the minimum wavelength via eV=hc/λ_min.'],
  ['X-ray imaging and contrast','Different tissues attenuate X-rays differently, producing intensity differences that form image contrast.'],
  ['X-ray attenuation','The same exponential form I=I₀e^(-μx) models attenuation through matter.'],
  ['CT scanning','Multiple X-ray projections through a section are computationally combined into a 2D slice; many slices along an axis form a 3D representation.'],
  ['PET tracer','A tracer containing β⁺-emitting nuclei is introduced and accumulates in tissue of interest.'],
  ['Annihilation','A positron annihilates with an electron, conserving energy and momentum and producing two gamma photons travelling in approximately opposite directions.'],
  ['PET localisation','Coincident gamma detections and arrival-time information allow reconstruction of tracer concentration.']
 ],
 ['Z=ρc','I_R/I₀=(Z₁-Z₂)²/(Z₁+Z₂)²','I=I₀e^(-μx)','eV=hc/λ_min','E=mc² for annihilation energy'],
 [
  'For ultrasound, distinguish generation/detection physics from pulse-echo imaging geometry.',
  'Use impedance mismatch, not merely density difference, when explaining reflection strength.',
  'For X-ray minimum wavelength, equate the entire electron kinetic-energy gain eV to one photon only for the maximum-energy limit.',
  'For PET, explicitly connect β⁺ decay → positron → annihilation → paired gamma detection → image reconstruction.'
 ],
 [
  'Coupling gel reduces the severe air-skin impedance mismatch.',
  'Attenuation and reflection are different loss mechanisms.',
  'CT reconstructs slices from many directions rather than taking a single 3D photograph.',
  'PET detects annihilation gamma photons, not the positron directly outside the body.'
 ],
 ['Using density alone instead of acoustic impedance','Treating λ_min as the only X-ray wavelength produced','Saying PET emits one gamma ray per annihilation','Confusing ultrasound attenuation with reflection'],
 ['How does a piezoelectric transducer both transmit and receive?','What determines ultrasound reflection coefficient?','How is λ_min related to accelerating p.d.?','How does CT construct a 3D image?','Why are two opposite gamma photons produced in PET?'],
 ['Use Physics with Talha A2 Medical Physics resources for ultrasound, X-ray and PET reinforcement.','Practise linking every imaging method to the measurable signal that ultimately forms the image.']
),
'Astronomy and Cosmology':note(
 'Use luminosity, radiant flux intensity, standard candles, Wien’s law, Stefan-Boltzmann law, redshift and Hubble’s law to infer stellar properties and evidence for an expanding Universe.',
 [
  ['Luminosity','Luminosity L is total power radiated by a star.'],
  ['Radiant flux intensity','At distance d from an isotropic source, observed flux intensity F=L/(4πd²).'],
  ['Standard candle','An object with known luminosity can be used with measured flux to infer distance.'],
  ['Wien displacement','Peak wavelength is inversely proportional to surface temperature, so hotter stars peak at shorter wavelengths.'],
  ['Stefan-Boltzmann law','A star modelled as a black-body emitter has L=4πσr²T⁴.'],
  ['Stellar radius','Combining luminosity and temperature allows radius estimation; Wien’s law may provide T from the spectrum.'],
  ['Redshift','Spectral lines from a receding source are shifted to longer wavelengths. For small speeds, Δλ/λ≈v/c and equivalent fractional frequency shift has opposite sign.'],
  ['Expansion evidence','Systematic redshift of distant galaxies indicates large-scale recession and therefore an expanding Universe.'],
  ['Hubble law','Recession speed approximately follows v=H₀d in the syllabus model.'],
  ['Big Bang link','If galaxies are separating now, extrapolating cosmic expansion backward supports a past state of much greater density, forming part of the Big Bang model.']
 ],
 ['F=L/(4πd²)','λ_max T = constant conceptually','L=4πσr²T⁴','Δλ/λ≈v/c for small recession speed','v=H₀d'],
 [
  'Keep luminosity (power emitted) distinct from flux intensity (power per area received).',
  'Use distance in SI units when applying the syllabus Hubble-law instruction.',
  'For stellar radius, combine equations symbolically before substituting if several inferred quantities are involved.',
  'Use known laboratory spectral wavelengths as the reference when calculating redshift.'
 ],
 [
  'Inverse-square dimming does not mean the star emits less luminosity.',
  'Redshift is inferred by comparing identified spectral lines with known wavelengths.',
  'Wien’s law determines temperature from peak wavelength, not luminosity directly.',
  'Hubble’s law provides observational support for expansion and the Big Bang model.'
 ],
 ['Confusing luminosity with received flux','Using diameter where radius is required in Stefan-Boltzmann law','Using observed wavelength as Δλ','Interpreting redshift as the star itself becoming physically red in colour only'],
 ['What is a standard candle?','How does flux depend on distance?','How can λ_max estimate temperature?','How can L and T estimate stellar radius?','Why does Hubble’s law support an expanding Universe?'],
 ['Use Physics with Talha A2 Astronomy and Cosmology resources for stellar and redshift practice.','Practise multi-step questions that combine inverse-square, Wien and Stefan-Boltzmann relations.']
),
'A Level Practical and Data Analysis':note(
 'Master Paper 5 Planning, Analysis and Evaluation: design workable investigations, transform equations into testable graphs, process data with correct conventions, and quantify uncertainty using best-fit and worst-acceptable lines.',
 [
  ['Paper 5 structure','Paper 5 is a written practical-skills paper with one planning question and one analysis/conclusions/evaluation question.'],
  ['Variables','A plan should identify the independent variable, dependent variable and important controlled variables.'],
  ['Workable method','Explain how the independent variable is changed, how both variables are measured, how controls are maintained, and provide a clear labelled apparatus diagram.'],
  ['Instrument choice','Choose instruments that measure the correct physical quantity with suitable range and precision.'],
  ['Safety','Identify realistic hazards from the proposed apparatus/process and pair each with a specific precaution that reduces risk.'],
  ['Digital methods','Be prepared to describe oscilloscope measurements and use light gates/data loggers or other sensors for time, velocity, acceleration or related measurements.'],
  ['Analysis planning','State how raw measurements will be transformed into derived quantities and which graph will test the proposed relationship or determine constants.'],
  ['Linearisation','For y=mx+c, plot y against x; for y=axⁿ, plot log y against log x; for y=ae^(kx), plot ln y against x. Interpret gradient and intercept physically.'],
  ['Results table','Use Paper 3 table conventions, consistent units and significant figures, and include derived quantities needed for the graph.'],
  ['Log quantities','Show the unit inside the logarithm label, such as ln(d/cm); the logarithm itself is dimensionless.'],
  ['Graph quality','Plot with appropriate scales, error bars in both directions where relevant, a best-fit straight line and a distinguishable worst acceptable line.'],
  ['Worst acceptable line','Choose the steepest or shallowest plausible line that passes through the error bars of all points, as appropriate for estimating uncertainty.'],
  ['Gradient and intercept','Use large triangles on the drawn line, derive the expression linking gradient/intercept to the required constant, and report correct units/significant figures.'],
  ['Uncertainty conversion','Convert among absolute, fractional and percentage uncertainties and estimate uncertainties in derived quantities.'],
  ['Graph uncertainty','Absolute uncertainty in gradient can be estimated from |gradient_best-gradient_worst|, and similarly for y-intercept.'],
  ['Final reporting','Express a measured or derived quantity as value ± absolute uncertainty with a unit, using sensible significant figures.'],
  ['Evaluation mindset','A strong evaluation identifies a specific limitation, explains how it affects data/uncertainty, and proposes a feasible improvement linked to that limitation.']
 ],
 ['y=mx+c','y=axⁿ → log y = log a + n log x','y=ae^(kx) → ln y = ln a + kx','percentage uncertainty=(absolute uncertainty/value)×100%','Δm≈|m_best-m_worst|','Δc≈|c_best-c_worst|'],
 [
  'For planning, write in an executable order: setup, variable control, measurement, repeats/range, safety, then analysis.',
  'State exactly what graph will be plotted and how its gradient/intercept gives the desired constant.',
  'For data analysis, decide the transformation before calculating columns.',
  'Use error bars and the worst acceptable line to turn visual scatter into an uncertainty estimate.',
  'Make every evaluation point specific enough that another student could actually implement the improvement.'
 ],
 [
  'Paper 5 assesses experimental reasoning even when the physical context is unfamiliar.',
  'A vague statement such as “repeat for accuracy” earns less than specifying repeats, averaging and how they reduce random uncertainty.',
  'A graph axis label should show quantity and unit clearly.',
  'A worst acceptable line is not simply any line different from best fit; it must remain consistent with the error bars.'
 ],
 ['Listing variables without explaining how to control them','Choosing an instrument without suitable precision','Plotting raw variables when the equation requires transformed variables','Drawing a worst line outside error bars','Reporting uncertainty without a unit or with excessive precision','Writing vague “human error” evaluations'],
 ['What three variable roles must a plan identify?','How would you linearise y=axⁿ?','What makes a worst acceptable line valid?','How is gradient uncertainty estimated from two lines?','What makes an evaluation improvement specific and useful?'],
 ['Use Paper 5-style original planning prompts to practise complete experimental designs.','Use original data tables to practise linearisation, graph interpretation, uncertainty and final value reporting.']
)
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
 entry.lens='Use the official 9702 A Level syllabus as the scope boundary; connect definitions, derivations, graphs, models, signs and practical evidence in every solution.';
 entry.deepNotes=patch.deepNotes;
 entry.notesVerified=true;
 entry.sourcePublisher=BOARD;
 entry.sourceBook=BOOK;
 entry.sourceYear=YEAR;
 entry.noteSourceFile='User-supplied Cambridge International AS & A Level Physics 9702 syllabus; Physics with Talha A2 Level Physics resources';
 entry.noteSourceBasis=SOURCE;
 notes.push({
  grade:'A Level (12)',
  subject:'Physics',
  title,
  sourceBook:BOOK,
  sourceFile:entry.noteSourceFile,
  sourceBasis:SOURCE,
  notesVerified:true,
  deepNotes:patch.deepNotes
 });
}

window.STUDYAI_CAIE_A_LEVEL_PHYSICS_DEEP_NOTES=notes;
window.STUDYAI_CAIE_A_LEVEL_PHYSICS_DEEP_NOTES_STATUS={
 total:expectedTitles.length,
 matched:notes.length,
 unmatched:expectedTitles.filter(title=>!rows.some(e=>e.title===title)),
 preservedIds:rows.map(e=>e.id)
};

if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
