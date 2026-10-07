/* Original StudyAI full notes for Cambridge IGCSE (Grades 9-10).
 * These notes expand the existing StudyAI curriculum entries into topic-based,
 * exam-ready explanations without copying Cambridge textbook or revision-site wording.
 */
(() => {
'use strict';

const notes = {
Mathematics: {
'Number': [
 ['Types of number','Know the structure of the number system: natural numbers, integers, rational numbers, irrational numbers and real numbers. Prime numbers have exactly two positive factors, while composite numbers have more; prime factorisation is useful for HCF, LCM and simplifying roots.'],
 ['Fractions, decimals and percentages','Move confidently between fractions, decimals and percentages. For percentage change, compare the change with the original value, not the final value. Repeated percentage change is multiplicative, so successive increases and decreases do not usually cancel.'],
 ['Ratio, proportion and rates','A ratio compares quantities in the same units, while a rate compares different units such as km/h or cost per item. Direct proportion gives a constant ratio y/x; inverse proportion gives a constant product xy.'],
 ['Standard form and indices','Write standard form as a×10^n where 1≤a<10. Apply index laws only when the bases are compatible, and remember that negative indices mean reciprocals rather than negative values.'],
 ['Bounds and accuracy','A rounded value represents an interval of possible exact values. Use lower and upper bounds when a calculation depends on measured quantities, and do not round intermediate values too early.']
],
'Algebra and Graphs': [
 ['Algebraic manipulation','Collect like terms, expand brackets and factorise expressions by reversing expansion. Factorisation is often the fastest route to solving equations, simplifying algebraic fractions and identifying roots.'],
 ['Equations and inequalities','Keep equations balanced by performing the same operation on both sides. For inequalities, reverse the inequality sign only when multiplying or dividing by a negative quantity.'],
 ['Sequences','Use first differences to recognise linear sequences and second differences to recognise quadratic patterns. An nth-term rule should generate every term, not just fit the first few values accidentally.'],
 ['Functions and graphs','Coordinates that satisfy an equation lie on its graph. Read gradient as rate of change and intercept as a boundary or starting value; use graph intersections to solve simultaneous equations approximately.'],
 ['Quadratic and other curves','Quadratic graphs are parabolas with a turning point and possible roots where they cross the x-axis. Reciprocal and exponential graphs have characteristic shapes and asymptotic behaviour that should be recognised.']
],
'Coordinate Geometry': [
 ['Gradient','For two points, gradient is vertical change divided by horizontal change. Positive gradient rises left to right, negative gradient falls, zero gradient is horizontal, and a vertical line has undefined gradient.'],
 ['Straight-line equations','The form y=mx+c shows gradient m and y-intercept c directly. A point lies on the line only if its coordinates satisfy the equation.'],
 ['Parallel and perpendicular lines','Parallel non-vertical lines have equal gradients. Perpendicular gradients multiply to -1 when both gradients are defined.'],
 ['Distance and midpoint','Distance follows from Pythagoras applied to horizontal and vertical coordinate differences. The midpoint is found by averaging x-coordinates and y-coordinates separately.'],
 ['Geometric reasoning with coordinates','Coordinate methods can prove properties such as parallelism, perpendicularity and equal lengths. State the property shown by each calculation instead of leaving the result unexplained.']
],
'Geometry': [
 ['Angles and polygons','Use angles on a line, around a point, vertically opposite angles and angle rules for parallel lines. Interior-angle sums follow from splitting polygons into triangles.'],
 ['Congruence and similarity','Congruent shapes have identical size and shape; similar shapes have equal corresponding angles and proportional corresponding lengths. Area scales with the square of length scale factor, and volume with the cube.'],
 ['Circle geometry','Use radius, chord, tangent and angle properties carefully. A radius to a tangent is perpendicular at the point of contact, and circle theorems should be named or clearly justified.'],
 ['Symmetry and constructions','Line symmetry, rotational symmetry, perpendicular bisectors and angle bisectors are geometric loci and construction tools. Keep compass arcs visible when a construction is assessed.'],
 ['Proof','A diagram suggests relationships but does not prove them. Build a proof from stated angle, congruence, similarity or circle properties in a logical sequence.']
],
'Mensuration': [
 ['Perimeter and area','Choose formulas from the shape actually present. For compound figures, split into familiar regions and subtract holes or missing regions carefully.'],
 ['Circle measures','Circumference depends linearly on radius while area depends on radius squared. Sector arc length and sector area are fractions of a full circle determined by the central angle.'],
 ['Surface area','Surface area is the total area of exposed faces or curved surfaces. A net is often the safest way to avoid missing a face.'],
 ['Volume','Volume measures three-dimensional space and therefore uses cubic units. For prisms, volume equals cross-sectional area times length.'],
 ['Compound solids and units','Break a compound solid into standard solids, then add or subtract volumes. Convert units before applying formulas, especially between cm, m, cm², m², cm³ and m³.']
],
'Trigonometry': [
 ['Right-triangle trigonometry','Use sine, cosine and tangent only after identifying the right angle, chosen angle, opposite side, adjacent side and hypotenuse. A labelled sketch prevents most ratio errors.'],
 ['Pythagoras','Pythagoras links the three sides of a right triangle and is often used before or after trigonometry. Check that the hypotenuse is the side opposite the right angle.'],
 ['Angles of elevation and depression','Horizontal reference lines are parallel, so alternate-angle reasoning often transfers the angle of depression to a triangle. Include eye height or object height when the geometry requires it.'],
 ['Bearings','Bearings are measured clockwise from north and written as three-figure angles. Draw north lines at relevant points before using angle rules.'],
 ['Sine and cosine rules','For non-right triangles, use the sine rule when a side-angle opposite pair is known and the cosine rule when the information resembles SAS or SSS. The area formula 1/2 ab sin C uses two sides and their included angle.']
],
'Transformations and Vectors': [
 ['Translations','A translation moves every point by the same vector. Column-vector notation records horizontal movement first and vertical movement second.'],
 ['Reflections and rotations','A reflection needs a mirror line. A rotation needs centre, angle and direction; leaving any of these out makes the description incomplete.'],
 ['Enlargements','An enlargement is defined by a centre and scale factor. Negative scale factors place images on the opposite side of the centre, while fractional scale factors reduce size.'],
 ['Vectors','Vectors have magnitude and direction and can be added head-to-tail or by components. Parallel vectors are scalar multiples of one another.'],
 ['Vector geometry','Express several routes between the same points and equate them. This can prove collinearity, ratios on lines and geometric relationships without coordinates.']
],
'Probability': [
 ['Probability scale and sample space','Probabilities lie between 0 and 1. A complete sample space lists every possible outcome once and makes equally likely outcomes visible.'],
 ['Complementary events','The probability of an event not occurring is 1-P(event). Complements are useful when the direct event has many cases.'],
 ['Combined events','Use addition for mutually exclusive alternatives and multiplication along independent branches. Do not assume independence simply because events are different.'],
 ['Tree diagrams','Branch probabilities from the same node sum to 1. Multiply along a route and add probabilities of different routes that produce the required event.'],
 ['Experimental probability','Relative frequency estimates probability from data and usually becomes more stable with larger samples. Distinguish an experimental estimate from a theoretical probability.']
],
'Statistics': [
 ['Data types and sampling','Identify categorical, discrete and continuous data. A good sample should represent the population and avoid systematic selection bias.'],
 ['Averages and spread','Mean uses every value, median depends on order, and mode is the most frequent. Range and interquartile range describe spread and help compare consistency.'],
 ['Tables and charts','Choose displays that match the data: bar charts for categories, histograms for continuous grouped data, and cumulative-frequency graphs for medians and quartiles.'],
 ['Histograms','Histogram bar area represents frequency, so unequal class widths require frequency density. Do not use ordinary frequency as bar height unless widths are equal.'],
 ['Interpreting data','Compare both centre and spread and refer to the actual context. Association in a scatter graph does not prove that one variable causes the other.']
]
},
Physics: {
'Motion, Forces and Energy': [
 ['Describing motion','Speed is scalar while velocity includes direction. Acceleration measures the rate of change of velocity, so an object can accelerate by changing speed, direction or both.'],
 ['Motion graphs','Gradient of a distance-time graph gives speed; gradient of a velocity-time graph gives acceleration. Area under a velocity-time graph gives displacement.'],
 ['Forces and Newtonian ideas','A resultant force changes velocity. Balanced forces give zero resultant, which means no acceleration rather than necessarily no motion.'],
 ['Momentum','Momentum equals mass times velocity and is conserved in a closed system. Impulse equals change in momentum and can be increased by increasing force or collision time.'],
 ['Energy and power','Energy transfers between stores while total energy is conserved. Work done equals force times distance moved in the force direction, and power is the rate of energy transfer.']
],
'Thermal Physics': [
 ['Particle model','Solids have particles vibrating about fixed positions, liquids have close particles that move past one another, and gases have widely spaced particles in rapid random motion.'],
 ['Temperature and internal energy','Temperature relates to average kinetic energy of particles, while internal energy includes microscopic kinetic and potential energy. Heating does not always increase temperature during a change of state.'],
 ['Expansion','Heating generally increases particle separation and causes expansion. Gases expand much more than solids because their particles are already far apart.'],
 ['Thermal transfer','Conduction transfers energy through particle interactions and free electrons in metals; convection uses bulk fluid motion; radiation transfers energy by electromagnetic waves.'],
 ['Specific heat and changes of state','Specific heat capacity links energy, mass and temperature change. During melting or boiling, supplied energy changes intermolecular arrangement rather than temperature.']
],
'Waves': [
 ['Wave quantities','Amplitude measures maximum displacement, wavelength is the distance between equivalent points, frequency is cycles per second, and wave speed satisfies v=fλ.'],
 ['Transverse and longitudinal waves','Transverse oscillations are perpendicular to travel direction; longitudinal oscillations are parallel and produce compressions and rarefactions.'],
 ['Reflection and refraction','Reflection obeys equal angles to the normal. Refraction occurs when wave speed changes at a boundary, usually changing wavelength and direction while frequency remains fixed.'],
 ['Sound','Sound is a longitudinal mechanical wave that requires a medium. Pitch depends mainly on frequency and loudness on amplitude.'],
 ['Electromagnetic spectrum','All electromagnetic waves travel at the same speed in vacuum but differ in frequency, wavelength, production, use and hazard.']
],
'Electricity and Magnetism': [
 ['Charge and current','Current is rate of flow of charge. Conventional current direction is opposite to electron flow in metals.'],
 ['Potential difference and resistance','Potential difference is energy transferred per unit charge. Resistance relates potential difference and current and may change with temperature or component type.'],
 ['Series and parallel circuits','Current is the same through series components; potential differences add. In parallel, branch potential differences are equal while total current splits between branches.'],
 ['Electrical power and energy','Power can be calculated from P=VI and energy from E=Pt. Household energy use depends on both power rating and operating time.'],
 ['Magnetism and induction','Current produces magnetic fields. Changing magnetic flux can induce an emf, and the induced effect opposes the change that produces it.']
],
'Nuclear Physics': [
 ['Atomic nucleus','The nucleus contains protons and neutrons; isotopes share proton number but differ in neutron number. Nuclear notation separates proton and nucleon numbers.'],
 ['Radioactive emissions','Alpha, beta and gamma radiation differ in charge, mass, penetration and ionisation. Their behaviour in fields can identify them.'],
 ['Random decay and half-life','Individual decay is unpredictable but large samples follow stable statistics. Half-life is the time for activity or undecayed nuclei to halve.'],
 ['Fission and fusion','Fission splits heavy nuclei and can support a chain reaction. Fusion joins light nuclei and requires very high temperature and pressure to overcome electrostatic repulsion.'],
 ['Safety','Risk depends on ionising ability, penetration, source location, dose and exposure time. Use shielding, distance and limited exposure appropriately.']
],
'Space Physics': [
 ['Solar system and gravity','Gravity provides centripetal force for orbital motion. Orbital speed and period depend on distance and the mass creating the gravitational field.'],
 ['Stars','Stars form from contracting gas and dust; main-sequence stability comes from balance between inward gravity and pressure associated with fusion.'],
 ['Stellar evolution','A star’s mass strongly affects its later evolution, determining whether it ends as a white dwarf, neutron star or black hole.'],
 ['Light from space','Spectra reveal composition and motion. Redshift indicates increasing wavelength and is evidence of recession for distant galaxies.'],
 ['Cosmology','Observations of galaxy redshift support an expanding universe. Larger redshift generally corresponds to greater recession speed at cosmological scales.']
],
'Practical Skills and Data': [
 ['Variables and controls','State the independent variable, dependent variable and important control variables. A fair test changes one intended factor while keeping relevant others controlled.'],
 ['Measurement','Choose instruments with suitable range and resolution. Repeat measurements when random variation matters and record raw data to precision consistent with the instrument.'],
 ['Tables and graphs','Put quantities and units in headings, choose sensible scales and plot points accurately. A best-fit line represents the overall trend rather than connecting every point.'],
 ['Uncertainty','Distinguish resolution, random uncertainty and systematic effects. Percentage uncertainty helps compare uncertainties of quantities with different sizes.'],
 ['Evaluation','A useful improvement targets a specific limitation and explains how it reduces uncertainty or bias. Avoid vague statements such as “be more careful”.']
]
},
Chemistry: {
'States of Matter': [
 ['Particle model','Explain solids, liquids and gases using particle spacing, arrangement, motion and attractive forces. State changes rearrange particles but do not create new substances.'],
 ['Diffusion','Diffusion is net movement from higher to lower concentration due to random particle motion. It is faster at higher temperature and for lighter gas particles.'],
 ['Heating and cooling','Temperature changes reflect changes in particle kinetic energy, while flat regions on heating curves correspond to energy used in changing state.'],
 ['Gas pressure','Gas pressure results from particle collisions with container walls. Heating a fixed-volume gas increases collision frequency and momentum change.']
],
'Atoms, Elements and Compounds': [
 ['Atomic structure','Use proton number to identify the element and nucleon number to calculate neutrons. Isotopes have the same proton number but different neutron numbers.'],
 ['Electronic structure','Electron arrangement determines chemical behaviour, especially the number of outer-shell electrons. Ion formation usually gives a more stable outer shell.'],
 ['Elements, compounds and mixtures','Elements contain one type of atom, compounds have elements chemically combined in fixed proportions, and mixtures can be separated physically.'],
 ['Ionic and covalent bonding','Ionic bonding is electrostatic attraction between oppositely charged ions; covalent bonding is a shared pair of electrons between atoms.'],
 ['Structure and properties','Relate melting point, conductivity and solubility to the particles present and the forces or bonds that must be overcome.']
],
'Stoichiometry': [
 ['Balanced equations','A balanced equation conserves atoms and gives reacting mole ratios. Balance formulae with coefficients; do not alter subscripts in correct chemical formulae.'],
 ['Relative masses','Relative atomic mass is a weighted average; relative formula mass is the sum of relative atomic masses in a formula. Moles connect mass to particle amount.'],
 ['Mole calculations','Use n=m/M before applying the stoichiometric ratio from the balanced equation. Track units and identify the limiting reagent when both reactant amounts are given.'],
 ['Concentration and gases','Concentration can be expressed in mol/dm³ or g/dm³. Use the molar gas volume specified by the course or question conditions.'],
 ['Empirical formula','Convert masses or percentages to moles, divide by the smallest amount and scale to whole-number ratios. Molecular formula is an integer multiple of the empirical formula.']
],
'Electrochemistry': [
 ['Electrolysis setup','Electrolysis uses electrical energy to drive a non-spontaneous chemical change in an ionic substance. Mobile ions carry charge through the electrolyte.'],
 ['Electrodes and ions','Cations move to the cathode and gain electrons; anions move to the anode and lose electrons. Write half-equations to show electron transfer.'],
 ['Molten compounds','Only ions from the compound are present, so discharge products follow directly from the ions present.'],
 ['Aqueous electrolysis','Water contributes H⁺/OH⁻ possibilities, so electrode products depend on relative discharge tendencies and concentration.'],
 ['Uses','Electroplating, metal extraction and purification all depend on controlling which species is reduced or oxidised at each electrode.']
],
'Chemical Energetics': [
 ['Exothermic and endothermic change','Exothermic reactions transfer energy to surroundings and have negative enthalpy change; endothermic reactions absorb energy and have positive enthalpy change.'],
 ['Energy profiles','An energy profile distinguishes reactant energy, product energy and activation energy. Catalysts lower activation energy but do not change overall enthalpy change.'],
 ['Bond energies','Breaking bonds requires energy while forming bonds releases energy. Approximate reaction enthalpy can be estimated from energy in minus energy out.'],
 ['Fuel and efficiency','Compare fuels by energy released, cost, renewability, storage, pollution and practical efficiency rather than energy value alone.']
],
'Chemical Reactions': [
 ['Reaction evidence','Observable changes such as gas production, precipitate formation, colour change or temperature change can indicate reaction, but equations identify the chemical species involved.'],
 ['Rate of reaction','Rate increases when successful collision frequency rises. Temperature also increases the fraction of particles with energy above activation energy.'],
 ['Reversible reactions','Reversible reactions can proceed in both directions. In a closed system they may reach dynamic equilibrium where forward and reverse rates are equal.'],
 ['Redox','Oxidation and reduction occur together. Track oxygen, hydrogen, electron transfer or oxidation state consistently rather than switching definitions mid-answer.']
],
'Acids, Bases and Salts': [
 ['Acids and bases','Acids produce H⁺ ions in aqueous solution and bases neutralise acids. Alkalis are soluble bases that produce OH⁻ ions in water.'],
 ['pH and indicators','pH shows acidity or alkalinity. Universal indicator estimates a range; titration indicators are chosen for a clear endpoint colour change.'],
 ['Neutralisation','Acid-base neutralisation produces salt and water. Carbonates also produce carbon dioxide, while reactive metals with acids can produce hydrogen.'],
 ['Preparing salts','Choose preparation method from salt solubility: titration for soluble salts from acid + alkali, excess solid for suitable insoluble reactants, and precipitation for insoluble salts.'],
 ['Titration','Use a pipette for fixed volume and burette for variable volume. Repeat to obtain concordant titres before calculating concentration.']
],
'The Periodic Table': [
 ['Periodic arrangement','Elements are arranged by proton number. Similar outer-electron structures produce recurring chemical properties down groups.'],
 ['Group trends','Group 1 reactivity increases down the group while halogen reactivity decreases. Explain trends using electron shells, shielding and attraction to the nucleus.'],
 ['Transition elements','Transition elements often show variable oxidation states, coloured compounds, catalytic activity and high density compared with Group 1 metals.'],
 ['Noble gases','Full outer shells make noble gases very unreactive. Their boiling points increase down the group as atoms become larger and dispersion forces strengthen.']
],
'Metals': [
 ['Physical properties and bonding','Metallic bonding is attraction between positive ions and delocalised electrons. It explains electrical conductivity, malleability and generally high melting points.'],
 ['Reactivity series','The reactivity series predicts reactions with water, steam, acids and metal-ion solutions. More reactive metals form positive ions more readily.'],
 ['Extraction','Metals above carbon usually require electrolysis; less reactive metals can often be reduced from oxides using carbon or carbon monoxide.'],
 ['Corrosion','Rusting of iron requires oxygen and water. Barrier methods, galvanising and sacrificial protection reduce corrosion in different ways.'],
 ['Alloys','Alloys contain different-sized atoms that disrupt regular layers, usually making them harder than pure metals.']
],
'Chemistry of the Environment': [
 ['Air composition and pollutants','Distinguish natural air components from pollutants such as carbon monoxide, sulfur dioxide, nitrogen oxides and particulates. Link each pollutant to source and effect.'],
 ['Greenhouse effect','Greenhouse gases absorb outgoing infrared radiation and re-radiate energy. Increased concentrations can alter Earth’s energy balance and climate.'],
 ['Acid rain','Sulfur dioxide and nitrogen oxides form acidic products in the atmosphere, damaging ecosystems, buildings and aquatic environments.'],
 ['Water treatment','Potable water preparation may include screening, sedimentation, filtration and disinfection. Pure water is a chemical standard; potable water is safe to drink.'],
 ['Resource sustainability','Evaluate recycling and process choices using energy demand, finite resources, emissions, transport and product quality.']
],
'Organic Chemistry': [
 ['Hydrocarbons','Alkanes are saturated while alkenes contain a carbon-carbon double bond. Homologous series share functional group and general chemical behaviour.'],
 ['Naming and structures','Identify the longest relevant carbon chain, functional group and substituents. Structural formulae must show connectivity clearly enough to distinguish isomers.'],
 ['Combustion and cracking','Complete combustion forms carbon dioxide and water; incomplete combustion can form carbon monoxide or carbon. Cracking converts large hydrocarbons into smaller useful molecules.'],
 ['Alkenes and addition','The C=C bond allows addition reactions such as with bromine or steam. Bromine decolourisation is a test for unsaturation.'],
 ['Polymers and alcohols','Addition polymerisation opens alkene double bonds to form long chains. Ethanol can be produced by fermentation or hydration of ethene, with different conditions and sustainability trade-offs.']
],
'Experimental Techniques and Chemical Analysis': [
 ['Separation methods','Choose filtration, crystallisation, simple distillation, fractional distillation or chromatography according to particle size, solubility and boiling-point differences.'],
 ['Chromatography','Components separate because they have different attractions to stationary and mobile phases. Rf compares distance moved by solute with distance moved by solvent front.'],
 ['Purity','A pure substance has a sharp melting or boiling point under fixed pressure. Impurities usually broaden and shift melting behaviour.'],
 ['Gas tests','Use characteristic tests carefully and state the positive observation, not just the reagent.'],
 ['Ion analysis','Precipitate colours, flame tests and gas tests identify ions. Use a logical sequence so one reagent does not interfere with later tests.']
]
},
Biology: {
'Characteristics and Classification of Living Organisms': [
 ['Characteristics of life','Use movement, respiration, sensitivity, growth, reproduction, excretion and nutrition as observable life processes rather than as a memorised list only.'],
 ['Species and classification','A species is a group capable of interbreeding to produce fertile offspring. Classification organises organisms by shared features and evolutionary relationships.'],
 ['Dichotomous keys','A dichotomous key uses paired contrasting statements. Choose the statement that matches the specimen, then follow the indicated branch until identification is reached.'],
 ['Major groups','Recognise characteristic features of animals, plants, fungi and microorganisms, and use visible structural evidence to justify classification.']
],
'Organisation of the Organism': [
 ['Levels of organisation','Cells form tissues, tissues form organs and organs work together in organ systems. Each higher level depends on coordinated specialisation of lower levels.'],
 ['Cell structures','Relate nucleus, cytoplasm, cell membrane, mitochondria, ribosomes, cell wall, chloroplasts and vacuole to their functions.'],
 ['Specialised cells','Structure supports function: root hair cells increase exchange area, red blood cells transport oxygen, and ciliated cells move material along surfaces.'],
 ['Magnification','Magnification compares image size with actual size. Keep units consistent and distinguish magnification from resolution.']
],
'Movement In and Out of Cells': [
 ['Diffusion','Diffusion is net movement down a concentration gradient due to random particle motion. Rate increases with gradient, temperature and surface area.'],
 ['Osmosis','Osmosis is net movement of water through a partially permeable membrane from higher water potential to lower water potential.'],
 ['Active transport','Active transport moves particles against a concentration gradient using energy from respiration and carrier proteins.'],
 ['Cells in solutions','Animal cells can swell or shrink; plant cell walls prevent bursting and allow turgor. Explain changes using water movement rather than saying the solution “pulls” water.']
],
'Biological Molecules': [
 ['Carbohydrates','Monosaccharides such as glucose are small soluble sugars; larger carbohydrates include starch, glycogen and cellulose with different storage or structural roles.'],
 ['Proteins','Proteins are built from amino acids and their three-dimensional shape determines function. Enzymes, antibodies and structural proteins illustrate different roles.'],
 ['Lipids','Lipids are energy-dense, insoluble molecules useful for energy storage, insulation and membranes. They are built from glycerol and fatty acids.'],
 ['Food tests','Know the reagent, procedure and positive result for reducing sugars, starch, protein and lipids. Controls make colour changes meaningful.']
],
'Enzymes': [
 ['Enzyme action','Enzymes are biological catalysts with active sites whose shape and chemistry allow specific substrates to bind.'],
 ['Temperature','Rising temperature initially increases collision frequency, but high temperature disrupts enzyme structure and changes the active site.'],
 ['pH','pH changes can alter bonding and charge in the enzyme, changing active-site shape. Each enzyme has an optimum range rather than one universal optimum.'],
 ['Rate experiments','Measure a quantity that changes with time, keep control variables constant and compare initial rates where substrate depletion would otherwise distort results.']
],
'Plant Nutrition': [
 ['Photosynthesis','Photosynthesis converts carbon dioxide and water into glucose using light energy absorbed by chlorophyll, releasing oxygen as a by-product.'],
 ['Leaf adaptations','Broad leaves, thin tissues, stomata, air spaces, veins and chloroplast-rich palisade cells support light capture and gas exchange.'],
 ['Limiting factors','Light intensity, carbon dioxide concentration and temperature can limit photosynthesis. The limiting factor is the one currently preventing a faster rate.'],
 ['Mineral nutrition','Nitrate ions are needed for amino acids and proteins; magnesium ions are needed for chlorophyll. Deficiency symptoms follow from these roles.']
],
'Human Nutrition': [
 ['Balanced diet','A balanced diet supplies appropriate energy, protein, fats, carbohydrates, fibre, vitamins, minerals and water for the individual’s needs.'],
 ['Digestion','Mechanical digestion increases surface area; chemical digestion uses enzymes to hydrolyse large insoluble molecules into small soluble molecules.'],
 ['Alimentary canal','Link mouth, stomach, small intestine, pancreas, liver and large intestine to their specific digestive or absorptive functions.'],
 ['Absorption','Villi and microvilli increase surface area, thin epithelium shortens diffusion distance and good blood supply maintains concentration gradients.']
],
'Transport in Plants': [
 ['Xylem','Xylem transports water and mineral ions and provides support. Vessels are hollow, lignified and arranged for continuous upward flow.'],
 ['Transpiration','Evaporation from mesophyll and diffusion through stomata create tension that pulls a water column through xylem.'],
 ['Factors affecting transpiration','Light, temperature, humidity and air movement change stomatal opening, evaporation or diffusion gradient.'],
 ['Phloem','Phloem translocates sucrose and amino acids between sources and sinks. Direction can vary depending on where substances are produced and used.']
],
'Transport in Animals': [
 ['Double circulation','Humans have pulmonary and systemic circuits, allowing blood to return to the heart between lungs and body at suitable pressures.'],
 ['Heart structure','Chambers, valves, septum and major vessels maintain one-way flow. The left ventricle has a thicker wall because systemic circulation needs higher pressure.'],
 ['Blood vessels','Arteries withstand high pressure, veins have valves and large lumens, and capillaries have thin walls for exchange.'],
 ['Blood','Red cells transport oxygen, white cells defend against pathogens, platelets support clotting and plasma transports dissolved substances and heat.']
],
'Diseases and Immunity': [
 ['Pathogens and transmission','Pathogens include bacteria, viruses, fungi and protoctists. Transmission can occur through air, water, food, direct contact or vectors.'],
 ['Body defences','Skin, mucus, cilia, stomach acid and clotting reduce pathogen entry before specific immune responses are needed.'],
 ['Immune response','Lymphocytes recognise antigens and can produce specific antibodies. Memory cells allow faster secondary responses.'],
 ['Vaccination','Vaccines expose the immune system to harmless antigen material, creating memory without causing the full disease. Population coverage can reduce transmission.']
],
'Gas Exchange in Humans': [
 ['Ventilation','Breathing moves air in and out of lungs by changing thoracic volume and pressure through diaphragm and intercostal-muscle action.'],
 ['Alveoli','Large surface area, thin moist walls, rich capillary supply and ventilation maintain rapid gas exchange.'],
 ['Diffusion gradients','Oxygen diffuses from alveoli into blood while carbon dioxide diffuses in the opposite direction because of partial-pressure or concentration gradients.'],
 ['Smoking and disease','Smoking damages cilia and alveoli and introduces harmful substances. Link structural damage to reduced exchange and increased disease risk.']
],
'Respiration': [
 ['Aerobic respiration','Aerobic respiration releases energy from glucose using oxygen, producing carbon dioxide and water. The released energy supports cellular work.'],
 ['Anaerobic respiration','Without enough oxygen, muscles can release less energy and form lactate; microorganisms such as yeast can produce ethanol and carbon dioxide.'],
 ['Energy use','Cells use energy for active transport, synthesis, movement, cell division and temperature regulation.'],
 ['Oxygen debt','After strenuous exercise, increased breathing and circulation help process lactate and restore normal physiological conditions.']
],
'Excretion in Humans': [
 ['Excretion','Excretion removes toxic materials, metabolic waste and substances in excess of requirements. It is not the same as egestion of undigested food.'],
 ['Kidneys','Kidneys filter blood, selectively reabsorb useful substances and regulate water and ion balance. Urea formed in the liver is removed in urine.'],
 ['Nephron','Ultrafiltration occurs under pressure; selective reabsorption returns glucose and needed ions and water to blood.'],
 ['Water balance','Hormonal control changes collecting-duct water permeability so urine concentration responds to hydration state.']
],
'Coordination and Response': [
 ['Nervous system','Receptors detect stimuli, sensory neurones carry impulses to the CNS, relay neurones process information and motor neurones carry responses to effectors.'],
 ['Reflexes','Reflex actions are rapid automatic responses using short neural pathways, helping protect the body from harm.'],
 ['Hormones','Hormones are chemical messengers carried in blood to target organs. They act more slowly than nerve impulses but effects may last longer.'],
 ['Plant responses','Tropisms are directional growth responses. Auxin distribution helps explain phototropism and gravitropism.']
],
'Drugs': [
 ['Medicinal drugs','Medicines can relieve symptoms, treat causes or prevent disease. Antibiotics act against bacteria but not viruses.'],
 ['Antibiotic resistance','Random mutations can produce resistant bacteria; antibiotic use creates selection pressure, allowing resistant strains to reproduce.'],
 ['Addictive drugs','Addiction involves dependence and altered behaviour. Effects should be described using physiological evidence rather than moral judgement.'],
 ['Alcohol and tobacco','Both can damage health through multiple mechanisms; connect named chemicals or physiological effects to specific organs and diseases.']
],
'Reproduction': [
 ['Asexual and sexual reproduction','Asexual reproduction uses one parent and produces genetically similar offspring; sexual reproduction involves gamete fusion and creates variation.'],
 ['Human reproductive systems','Link testes, ovaries, ducts, glands and uterus to gamete production, transport, fertilisation and development.'],
 ['Menstrual cycle','Hormonal changes coordinate follicle development, ovulation and uterine-lining changes. Interpret hormone graphs by linking one hormone’s effect to the next stage.'],
 ['Fertilisation and development','Fertilisation forms a zygote that divides by mitosis. Implantation and placenta development support exchange between maternal and fetal blood without direct mixing.']
],
'Inheritance': [
 ['Genes and alleles','Genes are DNA sequences affecting characteristics; alleles are alternative versions. Genotype describes allele combination and phenotype the expressed characteristic.'],
 ['Dominance','A dominant allele affects phenotype in a heterozygote, while a recessive phenotype requires no dominant allele at the locus.'],
 ['Genetic crosses','Use clear symbols, parent genotypes, gametes and a Punnett square or probability method. Ratios are expectations across many offspring, not guarantees.'],
 ['Sex determination','Human sex chromosomes produce approximately equal probabilities of XX and XY offspring because sperm carry either X or Y.']
],
'Variation and Selection': [
 ['Variation','Continuous variation spans a range and is often influenced by many genes and environment; discontinuous variation falls into categories.'],
 ['Mutation','Mutation creates new genetic variation by changing DNA. Most mutations are neutral or harmful, but some become advantageous in a particular environment.'],
 ['Natural selection','Individuals with advantageous inherited variation are more likely to survive and reproduce, increasing those alleles over generations.'],
 ['Selective breeding','Humans choose parents with desired characteristics. This can increase useful traits but may reduce genetic diversity.']
],
'Organisms and Their Environment': [
 ['Food chains and webs','Producers capture energy and consumers transfer it through feeding. Arrows show direction of energy transfer, not which organism is “bigger”.'],
 ['Energy transfer','Energy is lost between trophic levels through respiration, movement, waste and uneaten material, so food chains usually have limited length.'],
 ['Nutrient cycles','Carbon and other materials cycle between organisms and environment through photosynthesis, feeding, respiration, decomposition and combustion.'],
 ['Population interactions','Competition, predation and resource availability affect population size. Interpret trends using evidence rather than assuming one cause.']
],
'Human Influences on Ecosystems': [
 ['Habitat loss','Deforestation and land-use change reduce habitat area, fragment populations and alter carbon and water cycles.'],
 ['Pollution','Fertilisers can cause eutrophication, plastics can persist and accumulate, and toxic chemicals can become concentrated through food chains.'],
 ['Conservation','Conservation may use protected areas, habitat restoration, captive breeding, seed banks and legal controls. Evaluate both biological and human factors.'],
 ['Sustainability','Sustainable resource use balances present needs with long-term ecosystem function and future availability.']
],
'Biotechnology and Genetic Modification': [
 ['Microorganisms in biotechnology','Microbes can produce foods, enzymes and useful chemicals under controlled conditions because they grow rapidly and carry out predictable metabolism.'],
 ['Fermenters','Control temperature, pH, nutrients, oxygen and contamination. Large-scale production also needs mixing and monitoring.'],
 ['Genetic modification','Genes can be isolated, inserted into vectors and transferred into host cells to produce a desired protein or trait.'],
 ['Benefits and concerns','Evaluate yield, medicine production, environmental effects, gene flow, cost and ethical concerns using evidence rather than one-sided claims.']
],
'Practical Skills and Data': [
 ['Planning investigations','State a testable question, identify variables, choose a suitable range and describe how controls will be maintained.'],
 ['Collecting reliable data','Use appropriate apparatus, repeat measurements where random variation matters and record results with consistent precision.'],
 ['Processing data','Calculate means, rates, percentages or other derived quantities with units. Graphs should use sensible scales and clearly labelled axes.'],
 ['Interpreting results','Describe patterns before explaining them. Use anomalies, uncertainty and sample size when judging whether a conclusion is supported.'],
 ['Evaluation','Identify a specific weakness, explain its likely effect and give a realistic improvement that directly addresses it.']
]
}
};

function buildFull(entry, sections){
  const formulas=Array.isArray(entry.formulas)?entry.formulas:[];
  const subject=entry.subject;
  const lead=`${entry.title} is part of Cambridge IGCSE ${subject}. These notes develop the topic as a connected explanation: learn the definitions, understand why the relationships work, then apply them to unfamiliar exam contexts.`;
  const built=sections.map(([title,paragraph],index)=>({
    title,
    paragraphs:[paragraph],
    formulas:index===1&&formulas.length?formulas:[],
    tip:index===sections.length-1?'In exam answers, use precise terminology and make the final line answer the exact command word rather than stopping at a calculation or description.':''
  }));
  built.push({
    title:'Common exam mistakes',
    paragraphs:['Strong answers are usually lost through imprecise definitions, missing units, unexplained conclusions or using a memorised rule outside the conditions where it applies. Check the points below before you finish a response.'],
    bullets:(entry.mistakes||[]).slice(0,5)
  });
  return {lead,sections:built};
}

function apply(){
  const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
  let matched=0;
  for(const entry of curriculum){
    if(entry.board!=='Cambridge IGCSE'||entry.grade!=='IGCSE 9–10')continue;
    const subjectBank=notes[entry.subject];
    const sections=subjectBank?.[entry.title];
    if(!sections)continue;
    entry.cambridgeFullNotes=buildFull(entry,sections);
    entry.notesVerified=true;
    matched++;
  }
  window.STUDYAI_CAMBRIDGE_IGCSE_FULL_NOTES_STATUS={
    expected:Object.values(notes).reduce((sum,subject)=>sum+Object.keys(subject).length,0),
    matched
  };
  if(typeof window.renderTopicList==='function')window.renderTopicList();
}
if(window.STUDYAI_CURRICULUM)apply();
else window.addEventListener('studyai:curriculum-ready',apply,{once:true});
})();