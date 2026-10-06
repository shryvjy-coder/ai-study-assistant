/* StudyAI deep Cambridge International AS Level Chemistry notes.
 * Scope authority: user-supplied Cambridge International AS & A Level Chemistry 9701
 * syllabus for 2025, 2026 and 2027. ChemBridge / Sir Faizan Saleem is used as a
 * supplementary teaching reference. All StudyAI explanations are original.
 */
(() => {
'use strict';

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const rows=curriculum.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Chemistry');
const BOARD='Cambridge International';
const BOOK='Chemistry 9701';
const YEAR='2025–2027';
const SOURCE='Official Cambridge International AS & A Level Chemistry 9701 syllabus supplied by the user; ChemBridge AS Level resources by Sir Faizan Saleem used as a supplementary teaching reference';

const topic=(summary,concepts,formulas,examTips,mistakes,selfCheck,reasoning=[])=>({
 summary,
 keyPoints:concepts.slice(0,5).map(x=>x[0]+': '+x[1]),
 formulas,
 method:reasoning.length?reasoning:[
  'Translate the question into chemical particles, equations or structures before calculating.',
  'State reagents, conditions, observations and products precisely when a reaction is assessed.',
  'Check charge, atoms, units and significant figures before accepting a final answer.',
  'Use syllabus vocabulary in explanations and connect observations to particle-level reasoning.'
 ],
 mistakes,
 deepNotes:{
  overview:summary,
  concepts,
  formulas,
  reasoning:reasoning.length?reasoning:[
   'Move between macroscopic observation, particle model and symbolic equation.',
   'Use balanced equations and mole ratios before numerical substitution.',
   'For explanations, identify the underlying electrostatic, energetic or kinetic cause.',
   'For organic chemistry, track the functional group and electron movement through each step.'
  ],
  visuals:[
   'Use particle, orbital, energy-profile, mechanism or apparatus sketches where they make the reasoning clearer.',
   'Annotate graphs and structures with the exact feature that supports the conclusion.',
   'For organic routes, draw each intermediate rather than trying to hold the whole sequence mentally.'
  ],
  examTips,
  distinctions:concepts.slice(0,4).map(x=>x[0]+': '+x[1]),
  quickRevision:concepts.slice(0,6).map(x=>x[0]),
  vocabulary:concepts.slice(0,10).map(x=>x[0]),
  selfCheck
 }
});

const notesByTitle={
'Atomic Structure':topic(
 'Build the atomic model from subatomic particles, isotopes, orbitals, electronic configurations and ionisation-energy evidence, then use these ideas to explain periodic trends.',
 [
  ['Subatomic particles','Protons carry +1 relative charge and relative mass 1, neutrons have charge 0 and relative mass 1, and electrons have charge -1 with very small relative mass. Most atomic mass is concentrated in the nucleus.'],
  ['Atomic and ionic composition','Atomic or proton number gives the number of protons. Nucleon number gives protons plus neutrons. Electron count changes when ions form, while proton number does not.'],
  ['Atomic and ionic radius','Across a period, increasing nuclear charge generally pulls the outer shell closer. Down a group, extra occupied shells and shielding increase radius. Cations are smaller than their parent atoms; anions are larger.'],
  ['Isotopes','Isotopes have the same proton number but different neutron numbers. Their chemical properties are almost identical because they have the same electronic configuration, while mass-dependent physical properties differ.'],
  ['Shells, sub-shells and orbitals','s, p and d sub-shells contain 1, 3 and 5 orbitals respectively, with two electrons per orbital. Electrons occupy lower-energy orbitals first while minimising repulsion.'],
  ['Electronic configuration','Write full or noble-gas shorthand configurations and remove electrons from the highest principal shell first when forming positive ions. Use electrons-in-boxes notation to show pairing and unpaired electrons.'],
  ['Orbital shapes','s orbitals are spherical. p orbitals are dumbbell-shaped and occur in three mutually perpendicular orientations.'],
  ['Ionisation energy','First ionisation energy removes one electron from each gaseous atom in one mole. Trends depend on nuclear charge, distance, shielding, sub-shell energy and spin-pair repulsion. Large jumps in successive ionisation energies reveal the number of outer-shell electrons.']
 ],
 ['first ionisation: X(g) → X⁺(g) + e⁻','neutrons = nucleon number - proton number'],
 [
  'For ionisation-energy trends, name the competing factors, then state which factor dominates.',
  'Do not say “more shells means more protons”; shielding and distance are separate ideas.',
  'When forming transition-metal ions, remove 4s electrons before 3d electrons.',
  'Use successive-ionisation jumps to infer group position rather than memorising patterns blindly.'
 ],
 [
  'Confusing mass number with relative atomic mass.',
  'Removing electrons from 3d before 4s when forming common ions.',
  'Explaining every ionisation-energy anomaly only by shielding.',
  'Saying isotopes have different chemical properties because their masses differ.'
 ],
 [
  'Why are cations smaller than their parent atoms?',
  'How does a large jump in successive ionisation energies reveal valence-electron count?',
  'Why is the first ionisation energy of a paired p electron sometimes lower than expected?',
  'How many orbitals are in a d sub-shell?',
  'Why do isotopes have nearly identical chemical properties?'
 ]
),
'Atoms, Molecules and Stoichiometry':topic(
 'Use relative masses, the mole, formulas and balanced equations to solve quantitative chemistry problems involving masses, gases, solutions, yields and limiting reagents.',
 [
  ['Unified atomic mass unit','One unified atomic mass unit is one twelfth of the mass of a carbon-12 atom. Relative atomic, isotopic, molecular and formula masses are ratios relative to this standard.'],
  ['Mole and Avogadro constant','One mole contains the Avogadro constant number of specified entities. Always identify whether the entities are atoms, molecules, ions or formula units.'],
  ['Ionic and molecular formulas','Use ionic charges, oxidation numbers and known polyatomic ions to construct neutral formulas.'],
  ['Equations and state symbols','Balance atoms and charge, use appropriate state symbols and omit spectator ions from net ionic equations.'],
  ['Empirical and molecular formula','Empirical formula is the simplest whole-number ratio. Molecular formula is a whole-number multiple determined from molar mass.'],
  ['Hydrated salts','Water of crystallisation is chemically associated in a fixed ratio. Heating data can be converted to moles of salt and water to determine hydration number.'],
  ['Reacting quantities','Convert given data to moles, apply the stoichiometric ratio, then convert to the requested quantity. This applies to masses, gas volumes and solution concentrations.'],
  ['Limiting reagent and yield','The limiting reagent produces the smaller possible amount of product. Percentage yield compares actual with theoretical yield.']
 ],
 ['n = m/M','N = nN_A','c = n/V','percentage yield = actual/theoretical × 100%'],
 [
  'Write the balanced equation before any mole calculation.',
  'Keep solution volume units consistent with the concentration unit, usually dm³.',
  'For limiting-reagent questions, compare available moles after accounting for coefficients.',
  'Do not round mole ratios too early when finding empirical formulas.'
 ],
 [
  'Using grams directly in a stoichiometric ratio.',
  'Leaving spectator ions in an ionic equation.',
  'Choosing the reactant with fewer moles as limiting without using coefficients.',
  'Using cm³ directly in c = n/V when c is in mol dm⁻³.'
 ],
 [
  'What is the difference between Ar and relative isotopic mass?',
  'How do you identify a limiting reagent?',
  'How is a molecular formula obtained from an empirical formula?',
  'Why must ionic equations conserve both atoms and charge?',
  'How do you determine water of crystallisation from heating data?'
 ]
),
'Chemical Bonding':topic(
 'Explain ionic, metallic, covalent and coordinate bonding, orbital overlap, hybridisation, molecular shape and intermolecular forces, then connect structure to physical properties.',
 [
  ['Electronegativity','Electronegativity is an atom’s ability to attract bonding electrons. It generally increases across a period and decreases down a group as nuclear attraction, radius and shielding change.'],
  ['Ionic bonding','Ionic bonding is electrostatic attraction between oppositely charged ions in a giant lattice.'],
  ['Metallic bonding','Metallic bonding is electrostatic attraction between positive metal ions and delocalised electrons.'],
  ['Covalent and coordinate bonding','A covalent bond is attraction between two nuclei and a shared pair of electrons. In a coordinate bond, both electrons in the shared pair originate from one atom.'],
  ['Sigma and pi bonds','Sigma bonds result from direct orbital overlap along the internuclear axis. Pi bonds form by sideways overlap of parallel p orbitals.'],
  ['Hybridisation','sp, sp² and sp³ hybridisation correspond to common linear, trigonal planar and tetrahedral electron arrangements.'],
  ['VSEPR shape','Electron pairs repel and arrange to minimise repulsion. Lone-pair repulsion is stronger than bond-pair repulsion, reducing bond angles in NH₃ and H₂O.'],
  ['Intermolecular forces','London dispersion forces act between all particles; permanent dipole attractions act between polar molecules; hydrogen bonding is a strong permanent dipole interaction involving N-H or O-H groups.'],
  ['Bond polarity and molecular polarity','A polar bond does not guarantee a polar molecule because bond dipoles can cancel by symmetry.'],
  ['Structure-property link','Giant lattices and simple molecular substances differ strongly in melting point, conductivity and solubility because different forces must be overcome.']
 ],
 ['bond energy = energy required to break one mole of a specified gaseous covalent bond'],
 [
  'For shape questions, count bonding regions and lone pairs around the central atom before naming the shape.',
  'When explaining boiling point, discuss intermolecular forces, not covalent bond strength inside molecules.',
  'Distinguish bond polarity from overall molecular dipole.',
  'For dot-and-cross diagrams, show outer-shell electrons, charges and coordinate origins clearly.'
 ],
 [
  'Calling hydrogen bonding a covalent bond between molecules.',
  'Using bond angles without explaining lone-pair effects.',
  'Saying simple molecular substances melt by breaking covalent bonds.',
  'Confusing coordinate bonding with ionic bonding.'
 ],
 [
  'Why is NH₃ bond angle smaller than CH₄?',
  'Why can CO₂ contain polar bonds but have no permanent molecular dipole?',
  'What is the difference between sigma and pi overlap?',
  'Why does ice have lower density than liquid water?',
  'How does metallic bonding explain electrical conductivity?'
 ]
),
'States of Matter':topic(
 'Use the kinetic model and ideal-gas equation, then classify solids by lattice type and predict physical properties from bonding and structure.',
 [
  ['Gas pressure','Gas pressure arises from particle collisions with container walls and the associated momentum changes.'],
  ['Ideal-gas assumptions','Ideal particles have negligible volume and no intermolecular attraction. Real gases deviate most at high pressure and low temperature.'],
  ['Ideal-gas equation','Use pV = nRT with compatible SI units unless a question supplies a consistent alternative set.'],
  ['Giant ionic lattices','Strong electrostatic attractions produce high melting points; ions conduct only when mobile in molten or aqueous states.'],
  ['Simple molecular solids','Molecules are held by intermolecular forces, so melting points are usually lower and electrical conductivity is poor.'],
  ['Giant covalent structures','Diamond and SiO₂ have extensive covalent networks; graphite has strong layers with delocalised electrons and weaker attractions between layers.'],
  ['Metallic lattices','Positive ions in a sea of delocalised electrons explain conductivity, malleability and generally high melting points.']
 ],
 ['pV = nRT','n = m/M'],
 [
  'Convert temperature to kelvin before using pV = nRT.',
  'Be explicit about which particles move when explaining conductivity.',
  'For structure deduction, combine melting point, conductivity and solubility evidence.',
  'Do not assume every covalent substance is simple molecular.'
 ],
 [
  'Using Celsius in pV = nRT.',
  'Saying solid ionic compounds conduct because they contain ions.',
  'Calling graphite simple molecular.',
  'Explaining melting points with “strong bonds” without naming the force being overcome.'
 ],
 [
  'Why do real gases deviate from ideal behaviour at high pressure?',
  'Why does graphite conduct but diamond does not?',
  'Which units must be checked before using pV = nRT?',
  'Why does NaCl conduct when molten but not when solid?',
  'How can property data distinguish simple molecular from giant covalent structure?'
 ]
),
'Chemical Energetics':topic(
 'Interpret enthalpy changes, reaction pathways and calorimetry, calculate reaction enthalpies using bond energies, and apply Hess’s law to indirect energy cycles.',
 [
  ['Exothermic and endothermic change','Exothermic reactions transfer energy to surroundings and have negative ΔH; endothermic reactions absorb energy and have positive ΔH.'],
  ['Reaction pathway','A profile shows reactant and product enthalpies and the activation-energy barrier. A catalyst changes the pathway and activation energy, not ΔH.'],
  ['Standard enthalpy changes','Know the meanings of standard reaction, formation, combustion and neutralisation enthalpy changes under standard conditions.'],
  ['Bond breaking and making','Bond breaking requires energy; bond formation releases energy. Reaction enthalpy can be estimated from bond energies.'],
  ['Calorimetry','Use the measured temperature change and heat capacity to estimate energy transferred, then divide by reacting moles with the correct sign.'],
  ['Hess’s law','Total enthalpy change is independent of route, allowing unknown changes to be found from energy cycles.'],
  ['Average bond energy','Some tabulated bond energies are averages across compounds, so values estimated from them may differ from experimental enthalpies.']
 ],
 ['q = mcΔT','ΔH = -q/n','ΔH ≈ Σ(bonds broken) - Σ(bonds formed)'],
 [
  'Check the sign of ΔH after deciding which direction energy is transferred.',
  'In Hess cycles, reverse an equation only if you also reverse the sign of its enthalpy.',
  'Use the moles of the substance specified by the enthalpy definition.',
  'In calorimetry, distinguish heat gained by solution from enthalpy change of reaction.'
 ],
 [
  'Making bond formation positive in a bond-energy calculation.',
  'Using the wrong reacting mole quantity in ΔH = -q/n.',
  'Forgetting to reverse ΔH when reversing a Hess step.',
  'Saying a catalyst makes an exothermic reaction more exothermic.'
 ],
 [
  'Why is bond breaking endothermic?',
  'What changes on an energy profile when a catalyst is added?',
  'Why can average bond energies give approximate rather than exact ΔH values?',
  'How does Hess’s law allow an impossible direct experiment to be bypassed?',
  'Why is there a negative sign in ΔH = -q/n for an exothermic reaction measured by warming solution?'
 ]
),
'Electrochemistry':topic(
 'Track electron transfer and oxidation-number changes to identify redox processes, oxidising and reducing agents, disproportionation and balanced redox equations.',
 [
  ['Oxidation number','Assign oxidation numbers using charge rules so changes can be tracked during reactions.'],
  ['Oxidation','Oxidation is electron loss or an increase in oxidation number.'],
  ['Reduction','Reduction is electron gain or a decrease in oxidation number.'],
  ['Redox reaction','Oxidation and reduction occur together because transferred electrons must be accounted for.'],
  ['Oxidising agent','An oxidising agent causes oxidation and is itself reduced.'],
  ['Reducing agent','A reducing agent causes reduction and is itself oxidised.'],
  ['Disproportionation','One species is simultaneously oxidised and reduced to products containing the element in different oxidation states.'],
  ['Balancing redox','Use oxidation-number or electron changes to make electron loss equal electron gain, then finish balancing atoms and charge.']
 ],
 ['sum of oxidation numbers = overall species charge'],
 [
  'Write oxidation numbers above the changing atoms before deciding what is oxidised or reduced.',
  'Name the agent by what it does to the other species, then verify what happens to the agent itself.',
  'Use Roman numerals correctly when oxidation state is part of a compound name.',
  'For disproportionation, show both an increase and a decrease from the same starting oxidation state.'
 ],
 [
  'Calling the oxidising agent the species that is oxidised.',
  'Ignoring overall ion charge when assigning oxidation numbers.',
  'Balancing atoms but not charge in a redox equation.',
  'Calling any multi-product reaction disproportionation.'
 ],
 [
  'How do oxidation number and electron-transfer definitions agree?',
  'What happens to an oxidising agent during reaction?',
  'What evidence proves disproportionation has occurred?',
  'How can oxidation-number changes help balance an equation?',
  'What is the oxidation number of an element in its uncombined state?'
 ]
),
'Equilibria':topic(
 'Explain dynamic equilibrium, predict shifts using Le Chatelier’s principle, calculate Kc and Kp, and apply Brønsted-Lowry acid-base ideas to pH, neutralisation and titration curves.',
 [
  ['Dynamic equilibrium','In a closed system, forward and reverse reactions continue at equal rates while reactant and product concentrations remain constant.'],
  ['Le Chatelier principle','An equilibrium shifts in the direction that tends to reduce an imposed change in concentration, pressure or temperature.'],
  ['Catalyst effect','A catalyst speeds forward and reverse reactions but does not alter equilibrium position or equilibrium constant.'],
  ['Kc','Kc is written from equilibrium concentrations with stoichiometric powers. Pure solids are omitted from concentration expressions.'],
  ['Kp','Kp uses equilibrium partial pressures of gaseous species raised to stoichiometric powers.'],
  ['Equilibrium constant and temperature','Only temperature changes the value of Kc or Kp for a specified reaction.'],
  ['Industrial equilibria','Haber and Contact conditions balance equilibrium yield, rate, energy cost and economic practicality.'],
  ['Brønsted-Lowry acids and bases','Acids donate protons; bases accept protons. Strong species dissociate essentially completely, while weak species do so only partially.'],
  ['Neutralisation and pH','Neutralisation involves H⁺ and OH⁻ forming water. Titration-curve shape depends on acid/base strength and determines suitable indicator range.']
 ],
 ['Kc = product concentration terms / reactant concentration terms','Kp = product partial-pressure terms / reactant partial-pressure terms'],
 [
  'When predicting equilibrium shifts, separate “position of equilibrium” from “value of K”.',
  'For pressure changes, count gaseous moles only.',
  'A catalyst never changes equilibrium composition.',
  'Choose an indicator whose transition range lies inside the steep section of the titration curve.'
 ],
 [
  'Saying equilibrium means equal concentrations.',
  'Saying increased pressure always shifts equilibrium to products.',
  'Changing Kc because concentration changes.',
  'Treating a weak acid as dilute strong acid.'
 ],
 [
  'Why is a closed system required for dynamic equilibrium?',
  'Which factor can change Kc for a given reaction?',
  'How does a catalyst affect equilibrium time and equilibrium position?',
  'Why can strong and weak acids of the same concentration have different pH?',
  'How do you decide whether higher pressure favours products?'
 ]
),
'Reaction Kinetics':topic(
 'Explain reaction rate with collision theory, activation energy and Boltzmann distributions, then account for concentration, pressure, temperature and catalyst effects.',
 [
  ['Rate of reaction','Rate measures change in amount or concentration per unit time.'],
  ['Effective collision','Particles must collide with sufficient energy and suitable orientation for reaction.'],
  ['Concentration and pressure','Increasing particle number density increases collision frequency and therefore usually increases rate.'],
  ['Activation energy','Activation energy is the minimum collision energy needed for reaction.'],
  ['Boltzmann distribution','The area beyond activation energy represents particles energetic enough to react; temperature changes the distribution shape and this fraction.'],
  ['Temperature effect','Higher temperature increases collision frequency slightly but, more importantly, greatly increases the fraction with energy at least EA.'],
  ['Catalyst','A catalyst provides an alternative pathway with lower activation energy and is regenerated overall.'],
  ['Homogeneous and heterogeneous catalysis','Homogeneous catalysts share the same phase as reactants; heterogeneous catalysts are in a different phase and often act at a surface.']
 ],
 ['average rate = change in quantity / time'],
 [
  'On a Boltzmann graph, do not move the total area when temperature changes because particle number is unchanged.',
  'Explain temperature effects using the fraction above EA, not just “particles move faster”.',
  'A catalyst lowers EA but does not alter reactant or product enthalpy.',
  'When calculating rate from data, identify whether the question needs an average or instantaneous rate.'
 ],
 [
  'Saying catalysts increase collision energy.',
  'Drawing a hotter Boltzmann curve with greater total area.',
  'Claiming concentration changes activation energy.',
  'Using steeper graph slope without relating it to the measured quantity.'
 ],
 [
  'Why does a small temperature rise often cause a large rate increase?',
  'What part of a Boltzmann distribution corresponds to successful energetic collisions?',
  'How does a catalyst change the energy profile?',
  'Why can pressure affect gas reaction rate?',
  'What is the difference between homogeneous and heterogeneous catalysis?'
 ]
),
'Chemical Periodicity':topic(
 'Use Period 3 patterns in atomic properties, melting points, conductivity, oxides, hydroxides and chlorides to explain periodicity and predict unknown behaviour.',
 [
  ['Period 3 atomic trends','Across Period 3, nuclear charge increases while shielding changes little, so atomic radius generally decreases and first ionisation energy generally rises with known sub-shell and pairing anomalies.'],
  ['Melting and conductivity','Structure changes from metallic lattices to giant covalent silicon to simple molecular substances, producing non-linear melting-point and conductivity patterns.'],
  ['Oxides','Period 3 oxides change broadly from basic through amphoteric to acidic as bonding becomes more covalent.'],
  ['Hydroxides','NaOH is strongly basic, Mg(OH)₂ is basic with limited solubility, and Al(OH)₃ is amphoteric.'],
  ['Chlorides and water','Period 3 chlorides differ in bonding and hydrolysis; covalent chlorides can react with water to produce acidic solutions.'],
  ['Bonding and electronegativity','Increasing electronegativity and changes in structure explain the transition from ionic to covalent behaviour.'],
  ['Prediction','Periodic patterns can be used to infer likely properties, group position and identity of unfamiliar elements from evidence.']
 ],
 [],
 [
  'Do not describe Period 3 melting point as one smooth trend.',
  'Link each physical property to the actual structure present.',
  'For oxide acid-base behaviour, include balanced equations where requested.',
  'Use observations from chloride hydrolysis to infer bonding only when the evidence supports it.'
 ],
 [
  'Saying all Period 3 chlorides are ionic.',
  'Calling Al₂O₃ only basic or only acidic.',
  'Explaining atomic-radius decrease by “more electrons” rather than effective nuclear attraction.',
  'Memorising melting points without structure reasoning.'
 ],
 [
  'Why does atomic radius decrease across Period 3?',
  'Why is silicon’s melting point much higher than phosphorus?',
  'What does amphoteric mean for Al₂O₃ or Al(OH)₃?',
  'Why can covalent chlorides give acidic solutions with water?',
  'How can periodic data identify an unknown element?'
 ]
),
'Group 2':topic(
 'Describe Group 2 reactions and explain trends in reactivity, thermal stability, hydroxide solubility and sulfate solubility from magnesium to barium.',
 [
  ['Reactivity of metals','Group 2 metals react with oxygen, water and dilute acids; reactivity generally increases down the group as outer electrons are lost more easily.'],
  ['Oxides and hydroxides','Oxides are basic and form hydroxides with water to varying extents; hydroxides neutralise acids.'],
  ['Carbonates','Group 2 carbonates react with acids and decompose on heating to metal oxides and carbon dioxide.'],
  ['Nitrates','Group 2 nitrates decompose on heating to metal oxides, nitrogen dioxide and oxygen.'],
  ['Thermal stability','Carbonates and nitrates become more thermally stable down the group because larger cations polarise anions less strongly.'],
  ['Hydroxide solubility','Hydroxide solubility increases down Group 2.'],
  ['Sulfate solubility','Sulfate solubility decreases down Group 2.'],
  ['Prediction from trends','Use known reactions and solubilities to predict behaviour of an unfamiliar Group 2 element or compound.']
 ],
 [],
 [
  'For thermal-stability explanations, use cation charge density and polarisation.',
  'Keep hydroxide and sulfate solubility trends separate because they run in opposite directions.',
  'Write complete balanced equations, including gas products for nitrate decomposition.',
  'Distinguish observations from explanations when describing reactions.'
 ],
 [
  'Reversing the sulfate-solubility trend.',
  'Saying thermal stability decreases down the group.',
  'Omitting NO₂ or O₂ from nitrate decomposition.',
  'Explaining increased metal reactivity only by “more shielding” without linking it to ionisation.'
 ],
 [
  'Why do Group 2 carbonates become more thermally stable down the group?',
  'How does hydroxide solubility vary down Group 2?',
  'How does sulfate solubility vary?',
  'Why does metal reactivity increase down the group?',
  'What products form when a Group 2 nitrate is strongly heated?'
 ]
),
'Group 17':topic(
 'Explain halogen physical trends, oxidising power, hydrogen-halide stability, halide reducing power, qualitative tests and chlorine disproportionation.',
 [
  ['Physical trend','From chlorine to iodine, colour deepens and volatility decreases because larger electron clouds give stronger London forces.'],
  ['Halogen bond strength','X-X bond strength changes with atom size and electron-pair repulsion; use data rather than assuming a simple size trend.'],
  ['Oxidising ability','Halogens become weaker oxidising agents down the group because gaining an electron becomes less favourable.'],
  ['Hydrogen halides','Thermal stability decreases down the group as H-X bonds weaken.'],
  ['Halide reducing ability','Halide ions become stronger reducing agents down the group because electron loss becomes easier.'],
  ['Silver nitrate test','Acidified silver nitrate gives characteristic halide precipitates, whose behaviour with ammonia helps distinguish them.'],
  ['Concentrated sulfuric acid','Halide ions show increasing reducing power from chloride to iodide, producing progressively more reduction products of sulfuric acid.'],
  ['Chlorine disproportionation','Chlorine reacts differently with cold dilute and hot concentrated alkali, undergoing simultaneous oxidation and reduction.'],
  ['Water purification','Chlorine in water forms species including HOCl and ClO⁻ that act as disinfectants.']
 ],
 [],
 [
  'Explain volatility using intermolecular forces, not covalent bond strength.',
  'Keep “halogen oxidising power” and “halide reducing power” opposite in direction.',
  'For silver-halide tests, include precipitate colour and ammonia behaviour when asked.',
  'Use oxidation numbers to prove chlorine disproportionation.'
 ],
 [
  'Saying iodine is the strongest oxidising halogen.',
  'Using H-X bond strength to explain halogen boiling point.',
  'Confusing halogen molecules with halide ions.',
  'Calling chlorine-water purification simple oxidation without identifying active species.'
 ],
 [
  'Why does volatility decrease from Cl₂ to I₂?',
  'Why does halide reducing power increase down the group?',
  'How can AgCl, AgBr and AgI be distinguished?',
  'What makes the chlorine-alkali reaction disproportionation?',
  'Why do hydrogen halides become less thermally stable down the group?'
 ]
),
'Nitrogen and Sulfur':topic(
 'Explain nitrogen’s low reactivity, ammonia chemistry, nitrogen-oxide pollution, photochemical smog and acid-rain chemistry involving nitrogen and sulfur oxides.',
 [
  ['Nitrogen molecule','N₂ is relatively unreactive because its N≡N bond is very strong and the molecule is non-polar.'],
  ['Ammonia as a base','NH₃ accepts a proton through its lone pair, forming NH₄⁺ in a Brønsted-Lowry acid-base reaction.'],
  ['Ammonium salts','Strong bases displace ammonia from ammonium salts; this reaction is useful in qualitative analysis.'],
  ['Nitrogen oxides','NO and NO₂ arise naturally and from high-temperature combustion. Catalytic converters reduce harmful exhaust emissions.'],
  ['Photochemical smog','Nitrogen oxides can react with unburned hydrocarbons to contribute to PAN formation and photochemical smog.'],
  ['Acid rain','Nitrogen oxides form acidic products and can catalyse oxidation of atmospheric SO₂, increasing sulfuric-acid formation.'],
  ['Environmental reasoning','Questions may require linking source, atmospheric chemistry and consequence rather than merely naming a pollutant.']
 ],
 [],
 [
  'Explain nitrogen inertness using both bond strength and lack of polarity.',
  'When discussing ammonia basicity, show proton acceptance rather than saying “it contains OH⁻”.',
  'Separate formation of NOx from their later atmospheric reactions.',
  'Use balanced equations when the question asks how a pollutant is removed or transformed.'
 ],
 [
  'Calling NH₃ an Arrhenius hydroxide.',
  'Saying N₂ is unreactive because nitrogen atoms are unreactive.',
  'Treating all acid rain as only sulfur dioxide chemistry.',
  'Confusing PAN with particulate soot.'
 ],
 [
  'Why is N₂ kinetically unreactive under ordinary conditions?',
  'How does NH₃ form NH₄⁺?',
  'How can ammonia be displaced from an ammonium salt?',
  'How do NO and NO₂ contribute to acid rain?',
  'What role do nitrogen oxides play in photochemical smog?'
 ]
),
'Introduction to Organic Chemistry':topic(
 'Master organic representations, nomenclature, reaction vocabulary, mechanisms, hybridisation and isomerism so later reaction chapters can be understood as one connected system.',
 [
  ['Functional groups','Recognise alkene, halogenoalkane, alcohol, aldehyde, ketone, carboxylic acid, ester, amine and nitrile groups and connect each to characteristic chemistry.'],
  ['Representations','Translate between molecular, empirical, structural, displayed and skeletal formulas.'],
  ['Nomenclature','Name and draw simple aliphatic compounds systematically, selecting the principal functional group and correct numbering.'],
  ['Reaction language','Use homologous series, saturated/unsaturated, addition, substitution, elimination, hydrolysis, condensation, oxidation and reduction accurately.'],
  ['Bond fission','Homolytic fission gives radicals; heterolytic fission gives ions.'],
  ['Nucleophile and electrophile','A nucleophile donates an electron pair; an electrophile accepts an electron pair.'],
  ['Curly arrows','A curly arrow begins at an electron pair or bond and points to where that electron pair moves.'],
  ['Hybridisation and geometry','sp, sp² and sp³ centres have characteristic sigma/pi bonding and approximate geometries.'],
  ['Structural isomerism','Chain, positional and functional-group isomers share a molecular formula but differ in connectivity.'],
  ['Stereoisomerism','Restricted C=C rotation can give cis/trans isomers; a chiral centre can give non-superimposable mirror-image enantiomers.']
 ],
 [],
 [
  'Curly arrows represent electron-pair movement, never atom movement.',
  'Number the carbon chain to give the principal functional group the correct lowest locant.',
  'Check both sides of each carbon in a C=C before claiming cis/trans isomerism.',
  'Identify chirality by four different groups attached to a tetrahedral carbon.'
 ],
 [
  'Starting a curly arrow at a positive charge rather than an electron source.',
  'Calling chain isomers stereoisomers.',
  'Forgetting carbon atoms at skeletal line ends and vertices.',
  'Calling any carbon with four bonds chiral.'
 ],
 [
  'What is the difference between homolytic and heterolytic fission?',
  'Where must a curly arrow begin?',
  'What makes a carbon atom chiral?',
  'Why does C=C allow geometrical isomerism?',
  'How do structural and stereoisomers differ?'
 ]
),
'Hydrocarbons':topic(
 'Connect alkane and alkene preparation, combustion, cracking, free-radical substitution and electrophilic addition with mechanism, conditions, selectivity and environmental effects.',
 [
  ['Alkane preparation','Alkenes can be hydrogenated with H₂ and Ni/Pt; longer alkanes can be cracked using heat and a suitable catalyst.'],
  ['Alkane combustion','Complete combustion gives CO₂ and H₂O; incomplete combustion can produce CO and carbon.'],
  ['Free-radical substitution','Halogenation under UV proceeds by initiation, propagation and termination steps involving radicals.'],
  ['Cracking','Cracking converts less useful heavy hydrocarbons into shorter alkanes and alkenes with greater demand.'],
  ['Alkane unreactivity','Strong, relatively non-polar C-H and C-C bonds make alkanes resistant to many polar reagents.'],
  ['Alkene electrophilic addition','The pi bond is electron-rich and reacts with electrophiles such as HBr and Br₂.'],
  ['Markovnikov orientation','Carbocation stability and alkyl inductive effects influence the major product in unsymmetrical electrophilic addition.'],
  ['Alkene oxidation','Cold dilute acidified manganate(VII) forms diols; harsher oxidation can cleave C=C and reveal double-bond position.'],
  ['Bromine test','Aqueous bromine is decolourised by C=C addition.'],
  ['Environmental impact','Incomplete combustion, NOx and unburned hydrocarbons contribute to pollution; catalytic converters reduce harmful emissions.']
 ],
 [],
 [
  'Write radical dots in free-radical mechanisms and show initiation, propagation and termination separately.',
  'In electrophilic addition, move the pi electron pair first.',
  'Use carbocation stability to justify major-product formation.',
  'Do not confuse bromine-water decolourisation with radical substitution, which requires UV for alkanes.'
 ],
 [
  'Using ionic curly arrows in a radical mechanism.',
  'Putting UV light as the condition for alkene bromination.',
  'Claiming cracking only produces alkanes.',
  'Applying Markovnikov reasoning without identifying the intermediate carbocation.'
 ],
 [
  'Why are alkanes relatively unreactive toward polar reagents?',
  'What are the three stages of free-radical substitution?',
  'Why does bromine water test for C=C?',
  'How does carbocation stability affect HBr addition?',
  'What is the chemical purpose of cracking?'
 ]
),
'Halogen Compounds':topic(
 'Prepare halogenoalkanes, classify them, predict substitution and elimination reactions, compare SN1 and SN2 mechanisms and explain C-X reactivity trends.',
 [
  ['Preparation','Halogenoalkanes form by radical substitution of alkanes, electrophilic addition to alkenes or substitution of alcohols with suitable halogenating reagents.'],
  ['Primary, secondary and tertiary','Classification depends on how many carbon groups are attached to the carbon bearing the halogen.'],
  ['Hydrolysis','Aqueous OH⁻ substitutes halogen to form an alcohol.'],
  ['Nitrile formation','KCN in ethanol extends the carbon chain by one carbon through nucleophilic substitution.'],
  ['Amine formation','NH₃ in ethanol under pressure substitutes halogen to form an amine.'],
  ['Elimination','Ethanolic hydroxide and heat remove HX to form an alkene.'],
  ['SN2','SN2 is concerted with nucleophile attack and leaving-group departure in one step; it is favoured by less hindered primary halogenoalkanes.'],
  ['SN1','SN1 forms a carbocation intermediate and is favoured by more stable tertiary carbocations.'],
  ['C-X bond strength','Hydrolysis reactivity generally increases from chloro- to bromo- to iodoalkanes as C-X bond strength decreases.'],
  ['Silver nitrate test','Hydrolysis followed by reaction with Ag⁺ gives silver-halide precipitates that help identify the halogen.']
 ],
 [],
 [
  'Choose aqueous versus ethanolic hydroxide carefully because they favour substitution versus elimination.',
  'For SN1 and SN2, show all relevant lone pairs, charges and curly arrows.',
  'Explain reactivity using C-X bond strength, not halogen electronegativity alone.',
  'Remember that KCN increases carbon-chain length.'
 ],
 [
  'Using ethanolic NaOH for hydrolysis to alcohol.',
  'Calling SN1 a one-step mechanism.',
  'Forgetting the lone pair on the nucleophile.',
  'Saying C-I is least reactive because iodine is largest.'
 ],
 [
  'Why does KCN extend the carbon skeleton?',
  'Which mechanism is favoured by tertiary halogenoalkanes and why?',
  'How do aqueous and ethanolic hydroxide reactions differ?',
  'Why is iodoalkane hydrolysis faster than chloroalkane hydrolysis?',
  'How can the halogen in a halogenoalkane be identified experimentally?'
 ]
),
'Hydroxy Compounds':topic(
 'Prepare and classify alcohols, predict their substitution, oxidation, dehydration, sodium and esterification reactions, and use oxidation or iodoform evidence to identify structures.',
 [
  ['Alcohol preparation','Alcohols form from alkene hydration, halogenoalkane hydrolysis, carbonyl reduction, carboxylic-acid reduction and ester hydrolysis.'],
  ['Classification','Primary, secondary and tertiary alcohols are classified by the carbon bonded to OH.'],
  ['Combustion and sodium','Alcohols combust and react with sodium to form alkoxides with hydrogen gas.'],
  ['Substitution','OH can be replaced by halogen using appropriate HX or phosphorus/sulfur halogenating reagents.'],
  ['Oxidation','Primary alcohols give aldehydes by controlled oxidation/distillation and carboxylic acids by reflux; secondary alcohols give ketones; tertiary alcohols resist these mild conditions.'],
  ['Dehydration','Heating with concentrated acid or Al₂O₃ can eliminate water to form an alkene.'],
  ['Esterification','Alcohol plus carboxylic acid forms ester plus water under acid catalysis.'],
  ['Iodoform test','A CH₃CH(OH)- group gives yellow CHI₃ under alkaline iodine conditions.'],
  ['Alcohol acidity','Alcohols are weak acids; alkyl groups tend to make them less acidic than water by electron donation.']
 ],
 [],
 [
  'Use distillation to remove aldehyde before further oxidation; use reflux when complete oxidation is wanted.',
  'For oxidation questions, identify alcohol class before predicting product.',
  'State the orange-to-green dichromate observation where relevant.',
  'Do not use the iodoform test for every alcohol.'
 ],
 [
  'Oxidising a tertiary alcohol to a ketone under ordinary syllabus conditions.',
  'Using reflux when the aim is to isolate an aldehyde.',
  'Forgetting concentrated acid catalyst in esterification.',
  'Calling every alcohol neutral rather than weakly acidic.'
 ],
 [
  'How can a primary alcohol be converted selectively to an aldehyde?',
  'Why do tertiary alcohols resist mild oxidation?',
  'Which alcohol structural feature gives the iodoform test?',
  'How can an alcohol be dehydrated?',
  'What distinguishes primary, secondary and tertiary alcohols?'
 ]
),
'Carbonyl Compounds':topic(
 'Prepare aldehydes and ketones, compare their oxidation behaviour, carry out reduction and nucleophilic addition, and use qualitative tests to identify carbonyl functionality.',
 [
  ['Preparation','Primary alcohol oxidation with distillation gives aldehydes; secondary alcohol oxidation gives ketones.'],
  ['Reduction','NaBH₄ or LiAlH₄ reduces aldehydes and ketones to alcohols.'],
  ['HCN addition','CN⁻ attacks the polar carbonyl carbon, followed by protonation, producing a hydroxynitrile and a new C-C bond.'],
  ['Nucleophilic addition mechanism','Curly arrows show attack from the nucleophile lone pair to carbonyl carbon and movement of the C=O pi pair to oxygen.'],
  ['2,4-DNPH test','A positive carbonyl test gives an orange/yellow precipitate of a hydrazone derivative.'],
  ['Aldehyde versus ketone','Aldehydes are readily oxidised and give positive Tollens’/Fehling’s results; ketones generally do not under these conditions.'],
  ['Iodoform test','Methyl ketones containing CH₃CO- give yellow CHI₃ under alkaline iodine conditions.'],
  ['Stereochemical consequence','HCN addition to a planar unsymmetrical carbonyl can create a chiral centre and a racemic mixture.']
 ],
 [],
 [
  'Use 2,4-DNPH to detect a carbonyl, then another test to distinguish aldehyde from ketone.',
  'In the HCN mechanism, start the curly arrow at the CN⁻ lone pair.',
  'Remember HCN addition lengthens the carbon skeleton by one carbon.',
  'Do not use Tollens’ reagent as a general carbonyl test because ketones are usually negative.'
 ],
 [
  'Drawing CN⁺ as the nucleophile.',
  'Starting a curly arrow at carbonyl carbon.',
  'Claiming ketones give silver mirror routinely.',
  'Forgetting the protonation step after CN⁻ addition.'
 ],
 [
  'How can an aldehyde be distinguished from a ketone?',
  'Why is carbonyl carbon electrophilic?',
  'How does HCN addition change carbon-chain length?',
  'What does 2,4-DNPH detect?',
  'Which carbonyl compounds give the iodoform reaction?'
 ]
),
'Carboxylic Acids and Derivatives':topic(
 'Prepare carboxylic acids and esters, predict acid-base and redox reactions, and understand esterification and hydrolysis in both acidic and alkaline conditions.',
 [
  ['Carboxylic-acid preparation','Primary alcohols or aldehydes can be fully oxidised under reflux; nitriles and esters can be hydrolysed to carboxylic acids after appropriate work-up.'],
  ['Acid with metals','Reactive metals form carboxylate salts and hydrogen.'],
  ['Neutralisation','Alkalis form carboxylate salts and water.'],
  ['Carbonates','Carbonates form carboxylate salts, water and carbon dioxide.'],
  ['Esterification','Carboxylic acid plus alcohol forms ester plus water using concentrated H₂SO₄ catalyst.'],
  ['Reduction','LiAlH₄ reduces carboxylic acids to primary alcohols.'],
  ['Acid hydrolysis of ester','Dilute acid and heat establish an equilibrium producing carboxylic acid and alcohol.'],
  ['Alkaline hydrolysis','Dilute alkali and heat produce a carboxylate salt and alcohol; acidification can then give the carboxylic acid.'],
  ['Condensation','Esterification is a condensation because two molecules combine with loss of a small molecule, water.']
 ],
 [],
 [
  'Distinguish esterification from ester hydrolysis conditions.',
  'After alkaline hydrolysis, remember the immediate organic product is a carboxylate salt.',
  'For acid reactions, identify the gas observation with carbonate or reactive metal.',
  'Use reflux for complete oxidation to carboxylic acid.'
 ],
 [
  'Writing carboxylic acid directly from alkaline ester hydrolysis without acidification.',
  'Forgetting water as the condensation by-product.',
  'Using NaBH₄ to reduce carboxylic acid in the AS syllabus.',
  'Confusing ester functional-group connectivity.'
 ],
 [
  'How can a nitrile be converted to a carboxylic acid?',
  'What products form in alkaline ester hydrolysis?',
  'What gas is released when a carboxylic acid reacts with carbonate?',
  'Which reducing agent converts a carboxylic acid to primary alcohol?',
  'Why is esterification classified as condensation?'
 ]
),
'Nitrogen Compounds':topic(
 'Use ammonia and cyanide nucleophiles to form amines and nitriles, then hydrolyse nitriles and recognise how these reactions alter carbon-chain length.',
 [
  ['Primary amine preparation','Heating a halogenoalkane with NH₃ in ethanol under pressure produces an amine by nucleophilic substitution.'],
  ['Ammonia nucleophile','The nitrogen lone pair attacks the carbon bearing the leaving group. Excess ammonia helps favour primary amine formation.'],
  ['Nitrile preparation','KCN in ethanol and heat substitutes halogen with CN, adding one carbon to the chain.'],
  ['Hydroxynitrile preparation','HCN adds to aldehydes or ketones, catalysed by KCN, forming a new carbon-carbon bond.'],
  ['Nitrile hydrolysis','Dilute acid, or dilute alkali followed by acidification, converts nitrile carbon into a carboxylic acid group.'],
  ['Synthetic value','Nitrile chemistry is a key route for increasing carbon-chain length by one.']
 ],
 [],
 [
  'Track carbon count before and after CN introduction.',
  'Do not classify amines at AS Level unless needed for understanding a reaction.',
  'State ethanol and heat for halogenoalkane plus KCN.',
  'After alkaline nitrile hydrolysis, include acidification if the final target is the acid.'
 ],
 [
  'Forgetting that CN adds a carbon.',
  'Using aqueous KCN conditions for the standard substitution route.',
  'Omitting pressure in amine preparation when conditions are requested.',
  'Drawing nitrile as N-C rather than C≡N attachment through carbon.'
 ],
 [
  'Why does KCN increase carbon-chain length?',
  'What conditions convert a halogenoalkane to an amine?',
  'How can a nitrile be converted to carboxylic acid?',
  'How is a hydroxynitrile formed?',
  'Which atom of CN⁻ bonds to the carbon chain in a nitrile?'
 ]
),
'Polymerisation':topic(
 'Recognise and construct addition polymers, work backwards from repeat units to monomers, and evaluate disposal problems of poly(alkenes).',
 [
  ['Addition polymerisation','Many alkene monomers join by opening C=C pi bonds without elimination of a small molecule.'],
  ['Repeat unit','The repeat unit shows the section repeated along the chain and is drawn with continuation bonds through brackets.'],
  ['Monomer from polymer','Recover the monomer by identifying the two backbone carbons of the repeat unit and restoring the C=C bond.'],
  ['Poly(ethene)','Ethene forms poly(ethene) with a saturated carbon backbone.'],
  ['PVC','Chloroethene forms poly(chloroethene), retaining chlorine substituents on the chain.'],
  ['Disposal','Many poly(alkenes) are non-biodegradable, and combustion can produce harmful gases depending on polymer composition.'],
  ['Structure tracking','Substituents attached to alkene carbons remain attached to the corresponding repeat-unit carbons.']
 ],
 [],
 [
  'When drawing a repeat unit, include the bonds extending through the brackets.',
  'Do not leave a C=C bond in an addition-polymer repeat unit.',
  'To find monomer, restore exactly one double bond between the two backbone carbons.',
  'For disposal questions, distinguish persistence from combustion hazards.'
 ],
 [
  'Drawing brackets around multiple repeat units unnecessarily.',
  'Changing substituent positions when converting monomer to polymer.',
  'Calling addition polymerisation condensation.',
  'Saying all polymers are biodegradable.'
 ],
 [
  'How is the C=C bond transformed during addition polymerisation?',
  'How do you reconstruct a monomer from an addition-polymer repeat unit?',
  'Why are many poly(alkenes) difficult to dispose of?',
  'What structural feature distinguishes PVC from poly(ethene)?',
  'What must be shown at the ends of a repeat unit?'
 ]
),
'Organic Synthesis':topic(
 'Combine all AS organic reactions into multi-step routes, selecting reagents and conditions, recognising functional groups, predicting by-products and checking carbon-skeleton changes.',
 [
  ['Functional-group map','Treat each organic reaction as a transformation from one functional group to another.'],
  ['Carbon-count tracking','Most reactions preserve carbon count; nitrile introduction and HCN addition increase it by one.'],
  ['Oxidation level','Use oxidation and reduction relationships among alcohols, carbonyls and carboxylic acids to choose routes.'],
  ['Substitution versus elimination','The same halogenoalkane can give different products depending on reagent solvent and conditions.'],
  ['Alkene hub','Alkenes connect to alcohols, halogenoalkanes, diols, alkanes and polymers through characteristic reactions.'],
  ['Retrosynthesis','Work backward from the target functional group to a plausible precursor, then continue until reaching the supplied starting material.'],
  ['Reagent precision','A correct transformation is incomplete in exam terms if the required reagent, catalyst, solvent or temperature is missing.'],
  ['By-products and selectivity','Consider competing elimination/substitution, further oxidation and multiple possible products when the structure allows them.']
 ],
 [],
 [
  'Draw every intermediate structure in a multi-step route.',
  'Check carbon count after every CN-containing step.',
  'Use conditions as part of the answer, not as optional detail.',
  'When stuck, work backward from the target functional group.'
 ],
 [
  'Jumping between functional groups through a reaction not in the syllabus.',
  'Losing or gaining carbon atoms without a CN-based step.',
  'Giving a reagent without the required aqueous/ethanolic distinction.',
  'Ignoring likely further oxidation when choosing conditions.'
 ],
 [
  'Which AS reactions can lengthen a carbon chain?',
  'How can an alkene be converted to an alcohol?',
  'How can a primary alcohol be converted to carboxylic acid?',
  'Why is retrosynthesis useful?',
  'How do aqueous and ethanolic hydroxide conditions alter a synthesis plan?'
 ]
),
'Analytical Techniques':topic(
 'Use infrared and mass spectra together to infer functional groups, molecular mass, isotope patterns, carbon count and plausible molecular fragments.',
 [
  ['Infrared spectroscopy','Characteristic absorption ranges indicate bonds or functional groups; absence of an expected absorption can also be useful evidence.'],
  ['Broad versus sharp features','O-H absorptions are often broad, while strong C=O absorptions occupy a different characteristic region; use the supplied data table rather than memory alone.'],
  ['Molecular ion peak','The molecular ion M⁺ commonly gives the molecular mass of an organic molecule.'],
  ['Fragmentation','Smaller m/e peaks can correspond to positively charged fragments produced when the molecular ion breaks apart.'],
  ['Isotopic abundance','Peak intensities for isotopes can be used to calculate relative atomic mass.'],
  ['M+1 carbon count','The M+1 peak reflects natural ¹³C abundance and can estimate the number of carbon atoms using the syllabus formula.'],
  ['M+2 patterns','Characteristic M and M+2 isotope patterns provide evidence for chlorine or bromine.'],
  ['Combined evidence','A reliable identification should satisfy molecular mass, isotope pattern, IR functional-group evidence and plausible fragmentation simultaneously.']
 ],
 ['n(C) = 100 × abundance(M+1) / [1.1 × abundance(M)]','A_r = Σ(isotopic mass × abundance) / Σ(abundance)'],
 [
  'Use the data sheet values supplied in the paper for IR interpretation.',
  'Do not assume the tallest mass-spectrum peak is the molecular ion.',
  'Use isotope-pattern ratios as evidence for Cl or Br rather than just spotting an M+2 peak.',
  'Combine IR and mass-spectrum evidence before committing to a structure.'
 ],
 [
  'Calling the base peak the molecular ion automatically.',
  'Using IR alone to determine a unique complete structure.',
  'Ignoring isotope abundance when calculating Ar.',
  'Treating m/e as mass only without considering ion charge.'
 ],
 [
  'What information does the molecular ion peak provide?',
  'How can the M+1 peak estimate carbon count?',
  'What isotope pattern suggests bromine?',
  'Why should IR and mass spectra be combined?',
  'How is relative atomic mass obtained from isotopic abundances?'
 ]
),
'AS Practical Skills':topic(
 'Master Paper 3 quantitative and qualitative practical work: safe manipulation, titration, measurement, tables, observations, calculations, uncertainty, ion tests, conclusions and evaluation.',
 [
  ['Manipulation and safety','Set up apparatus correctly, follow written or diagram instructions, handle reagents safely and obtain a useful range and quantity of data.'],
  ['Quantitative measurement','Use balances, volumetric apparatus, thermometers and timing devices with precision appropriate to their scale and record readings consistently.'],
  ['Titration technique','Rinse apparatus appropriately, read the burette at eye level, perform a rough titration then obtain concordant titres before calculating with suitable values.'],
  ['Tables and observations','Record raw data directly in a single organised table. Use precise observation language such as colour change, precipitate, effervescence or temperature change.'],
  ['Significant figures','Calculated answers should reflect the precision of measurements and the conventions requested by the paper.'],
  ['Uncertainty','Estimate measurement uncertainty, convert to percentage uncertainty where needed and identify the measurement dominating total uncertainty.'],
  ['Qualitative analysis','Use the official qualitative-analysis notes and systematic test sequences to identify cations, anions and gases from observations.'],
  ['Separation of inference and observation','An observation is what is seen or measured; an inference is the chemical conclusion drawn from it.'],
  ['Calculation chain','For titration or gravimetric work, go from measured quantity to moles, stoichiometric ratio and requested concentration or composition.'],
  ['Evaluation','Identify specific limitations, explain their direction or effect where possible and propose realistic improvements linked directly to those limitations.']
 ],
 ['n = cV','percentage uncertainty = absolute uncertainty / measured value × 100%'],
 [
  'Record burette readings to the precision expected for the apparatus and calculate titres consistently.',
  'Do not average a rough titre with concordant accurate titres.',
  'Use the qualitative-analysis data supplied by Cambridge rather than inventing extra confirmatory tests.',
  'Write observations before conclusions so the evidence trail is clear.',
  'A good improvement names the limitation and explains how the change reduces it.'
 ],
 [
  'Writing “no reaction” when a more precise observation such as “no precipitate” is needed.',
  'Averaging non-concordant titres.',
  'Giving an ion identity without the observation that supports it.',
  'Writing vague evaluation points such as “human error” or “use better equipment”.'
 ],
 [
  'Why should a rough titre normally be excluded from the mean?',
  'What is the difference between an observation and an inference?',
  'How do you decide which measurement dominates percentage uncertainty?',
  'What makes two titres concordant in practice?',
  'How should a limitation and improvement be linked in an evaluation?'
 ]
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
 entry.lens='Use the official 9701 syllabus as the scope boundary, then connect particles, equations, mechanisms, observations, calculations and Cambridge exam reasoning.';
 entry.deepNotes=patch.deepNotes;
 entry.notesVerified=true;
 entry.sourcePublisher=BOARD;
 entry.sourceBook=BOOK;
 entry.sourceYear=YEAR;
 entry.noteSourceFile='User-supplied Cambridge International AS & A Level Chemistry 9701 syllabus; ChemBridge AS Level Chemistry resources';
 entry.noteSourceBasis=SOURCE;
 notes.push({
  grade:'AS Level (11)',
  subject:'Chemistry',
  title,
  sourceBook:BOOK,
  sourceFile:entry.noteSourceFile,
  sourceBasis:SOURCE,
  notesVerified:true,
  deepNotes:patch.deepNotes
 });
}

window.STUDYAI_CAIE_AS_CHEMISTRY_DEEP_NOTES=notes;
window.STUDYAI_CAIE_AS_CHEMISTRY_DEEP_NOTES_STATUS={
 total:expectedTitles.length,
 matched:notes.length,
 unmatched:expectedTitles.filter(title=>!rows.some(e=>e.title===title)),
 preservedIds:rows.map(e=>e.id)
};

if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
