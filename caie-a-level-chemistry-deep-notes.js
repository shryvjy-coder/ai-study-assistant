/* StudyAI deep Cambridge International A Level Chemistry notes.
 * Scope authority: user-supplied Cambridge International AS & A Level Chemistry 9701
 * syllabus for 2025, 2026 and 2027. ChemBridge / Sir Faizan Saleem A2 resources
 * are used as a supplementary teaching reference. All explanations are original.
 */
(() => {
'use strict';

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const BOARD='Cambridge International AS & A Level';
const GRADE='A Level (12)';
const SUBJECT='Chemistry';
const YEAR='2025–2027';
const SOURCE='Official Cambridge International AS & A Level Chemistry 9701 syllabus supplied by the user; ChemBridge A2 Level Chemistry resources by Sir Faizan Saleem used as a supplementary teaching reference';

const note=(summary,concepts,formulas,reasoning,examTips,mistakes,selfCheck)=>({
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
   'Use energy cycles, cell diagrams, rate graphs, orbital/complex sketches, mechanisms, synthesis maps or spectra whenever they expose the logic more clearly than prose.',
   'Annotate structures and equations with charges, oxidation states, lone pairs, curly arrows, stereochemistry, units and conditions where those details control marks.',
   'For multi-step questions, keep every intermediate and every reagent/condition visible so the reasoning can be checked step by step.'
  ],
  examTips,
  distinctions:concepts.slice(0,4).map(x=>x[0]+': '+x[1]),
  quickRevision:concepts.slice(0,6).map(x=>x[0]),
  vocabulary:concepts.slice(0,10).map(x=>x[0]),
  selfCheck
 }
});

const notes={
'Advanced Energetics and Lattice Energy':note(
 'Use lattice energy, electron affinity, hydration and solution enthalpies in Born–Haber and solution cycles, and explain trends through ionic charge and radius.',
 [
  ['Atomisation enthalpy','Enthalpy change of atomisation forms one mole of gaseous atoms from an element in its standard state.'],
  ['Lattice energy','In this syllabus, lattice energy is the enthalpy change when gaseous ions form one mole of solid ionic lattice. It is therefore exothermic for lattice formation.'],
  ['First electron affinity','The first electron affinity is the enthalpy change when one mole of gaseous atoms each gains one electron. Trends depend on nuclear attraction, atomic size and electron repulsion.'],
  ['Born–Haber cycle','A Born–Haber cycle links formation enthalpy to atomisation, ionisation, electron affinity and lattice-energy steps so an unknown value can be calculated by Hess’s law.'],
  ['Charge and radius','Higher ionic charge and smaller ionic radius strengthen electrostatic attraction, increasing the magnitude of lattice energy.'],
  ['Hydration enthalpy','Hydration enthalpy measures the enthalpy change when one mole of gaseous ions becomes hydrated aqueous ions. Smaller, more highly charged ions usually have more exothermic hydration enthalpies.'],
  ['Solution enthalpy','Solution enthalpy combines the energy needed to separate an ionic lattice with the hydration of the resulting ions.'],
  ['Solution cycle','A Hess cycle can connect lattice energy, hydration enthalpies and solution enthalpy.']
 ],
 ['ΔH cycle sum = 0','ΔH_sol = lattice dissociation contribution + ΣΔH_hyd','lattice magnitude increases with charge density'],
 [
  'Write the direction of every enthalpy definition before assigning signs.',
  'Construct the energy cycle from labelled chemical states rather than memorising a sign pattern.',
  'For trend explanations, explicitly mention both ionic charge and ionic radius.',
  'Check that electron-affinity steps match the number of electrons added.'
 ],
 [
  'Cambridge defines lattice energy here for gaseous ions forming the solid lattice, so sign convention matters.',
  'Hydration and lattice effects can compete in explaining solubility.',
  'Second electron affinity is not simply the same as first electron affinity because an electron is added to an already negative ion.',
  'Qualitative electrostatic reasoning is often required even when no numerical data are given.'
 ],
 ['Using lattice dissociation and lattice formation signs interchangeably','Forgetting multiple ionisation/electron-affinity steps','Explaining lattice energy only with radius while ignoring charge','Adding cycle values without checking direction'],
 ['What exactly is lattice energy in this syllabus?','Why does MgO have a larger lattice-energy magnitude than NaCl?','How does a Born–Haber cycle use Hess’s law?','Why is hydration more exothermic for smaller ions?','How are hydration and lattice effects connected to ΔH_sol?']
),
'Entropy and Gibbs Energy':note(
 'Predict and calculate entropy changes, then use ΔG=ΔH−TΔS to decide feasibility and explain how temperature changes whether a process is thermodynamically feasible.',
 [
  ['Entropy','Entropy measures the number of possible arrangements of particles and their energy in a system.'],
  ['State changes','Moving from solid to liquid to gas generally increases entropy because particle arrangements become less constrained.'],
  ['Temperature effect','Raising temperature increases the number of accessible energy arrangements and therefore generally increases entropy.'],
  ['Gas-mole effect','A reaction producing more gaseous particles usually has positive ΔS, all else being comparable.'],
  ['Standard entropy change','ΔS°=ΣS°(products)-ΣS°(reactants).'],
  ['Gibbs equation','ΔG°=ΔH°−TΔS°. Use T in kelvin and convert units so ΔH and TΔS are compatible.'],
  ['Feasibility','A process is thermodynamically feasible under the stated conditions when ΔG is negative.'],
  ['Temperature dependence','The signs and magnitudes of ΔH and ΔS determine whether increasing temperature makes ΔG more or less favourable.']
 ],
 ['ΔS°=ΣS°products−ΣS°reactants','ΔG°=ΔH°−TΔS°'],
 [
  'Predict the sign of ΔS before calculating as a reasonableness check.',
  'Convert J K⁻¹ mol⁻¹ to kJ K⁻¹ mol⁻¹ when ΔH is in kJ mol⁻¹.',
  'Solve ΔG=0 when asked for the temperature at which feasibility changes.',
  'Distinguish thermodynamic feasibility from reaction rate.'
 ],
 [
  'Negative ΔG does not imply a fast reaction.',
  'Entropy is not simply “disorder”; the syllabus framing is number of possible arrangements.',
  'Temperature must be absolute temperature.',
  'A favourable entropy term can overcome an unfavourable enthalpy term at sufficiently high temperature.'
 ],
 ['Using Celsius in TΔS','Mixing J and kJ','Equating feasible with fast','Predicting ΔS only from phases while ignoring gaseous-particle count'],
 ['What microscopic idea underlies entropy?','How is ΔS° calculated from tabulated entropies?','What sign of ΔG indicates feasibility?','Why can temperature change feasibility?','Why can a feasible reaction still be slow?']
),
'Advanced Electrochemistry':note(
 'Predict electrolysis products, perform Faraday calculations, use standard electrode potentials and cells, apply the Nernst equation, and connect cell potential to Gibbs energy.',
 [
  ['Electrolysis products','Products depend on molten versus aqueous electrolyte, relative electrode potentials and, where relevant, concentration.'],
  ['Faraday relation','The Faraday constant satisfies F=Le, linking one mole of electron charge to the Avogadro constant and elementary charge.'],
  ['Charge calculation','Electrical charge passed is Q=It; moles of electrons are Q/F. Stoichiometric electron ratios then determine product amount.'],
  ['Standard electrode potential','E° is the reduction potential of a half-cell measured relative to the standard hydrogen electrode under standard conditions.'],
  ['Standard hydrogen electrode','The SHE provides the zero reference potential and uses H⁺/H₂ under standard conditions with an inert platinum surface.'],
  ['Cell potential','Combine two reduction potentials as E°cell=E°cathode−E°anode. A positive E°cell supports feasibility under standard conditions.'],
  ['Direction and polarity','Electrons flow externally from the oxidation electrode toward the reduction electrode.'],
  ['Redox strength','More positive reduction potential corresponds to stronger tendency for the oxidised form to be reduced, so tables can compare oxidising and reducing agents.'],
  ['Nernst equation','Electrode potential changes with concentration. Use the supplied/logarithmic Nernst form with the correct number of transferred electrons z.'],
  ['Gibbs-cell link','ΔG°=−nFE°cell connects electrical and thermodynamic feasibility.']
 ],
 ['F=Le','Q=It','n(e⁻)=Q/F','E°cell=E°cathode−E°anode','E=E°+(0.059/z)log([oxidised]/[reduced]) for applicable syllabus examples','ΔG°=−nFE°cell'],
 [
  'Write both half-equations as reductions before comparing E° values.',
  'Identify cathode/anode from actual reduction/oxidation, not from memorised plus/minus labels alone.',
  'For electrolysis, convert charge to moles of electrons before moles of substance.',
  'In Nernst calculations, use the concentration ratio exactly as the chosen half-equation requires.'
 ],
 [
  'Standard cell feasibility predictions apply to standard conditions.',
  'Electrode potential belongs to a half-cell only relative to a reference.',
  'The sign of ΔG° is opposite the sign of E°cell through −nFE°cell.',
  'Electrolysis and spontaneous galvanic-cell operation have different energy directions.'
 ],
 ['Adding E° values without considering cathode/anode roles','Using Q=VIt','Skipping electron stoichiometry in electrolysis','Using the wrong Nernst concentration ratio','Forgetting the minus sign in ΔG°=−nFE°cell'],
 ['What does the SHE provide?','How is E°cell calculated from two reduction potentials?','How do you convert current and time into product mass?','Why does concentration affect E?','How are E°cell and ΔG° linked?']
),
'Advanced Equilibria':note(
 'Handle advanced acid-base equilibria, buffers, solubility products, the common-ion effect and partition coefficients quantitatively and conceptually.',
 [
  ['Conjugate pairs','A conjugate acid-base pair differs by one proton. Identify donor/acceptor relationships directly from the reaction.'],
  ['pH and Ka','Use pH=−log[H⁺], Ka=[H⁺][A⁻]/[HA], and pKa=−logKa.'],
  ['Kw','Kw=[H⁺][OH⁻] links strong-acid/strong-alkali calculations and aqueous equilibria.'],
  ['Weak acid calculation','For a weak monoprotic acid, construct the equilibrium expression and apply any justified approximation rather than assuming complete dissociation.'],
  ['Buffer','A buffer contains components that remove added H⁺ or OH⁻ and thereby resist pH change.'],
  ['Buffer preparation','Common routes use a weak acid with its conjugate-base salt or partial neutralisation.'],
  ['Buffer pH','Use Ka relationships or the Henderson-style rearrangement derived from Ka; keep concentrations after mixing/stoichiometric reaction consistent.'],
  ['Blood buffer','HCO₃⁻ participates in acid-base equilibria that help control blood pH.'],
  ['Solubility product','Ksp is the equilibrium constant for dissolution of a sparingly soluble ionic solid, written using ion concentrations with stoichiometric powers.'],
  ['Common-ion effect','Adding an ion already present shifts dissolution equilibrium toward the solid, reducing solubility.'],
  ['Partition coefficient','Kpc is the equilibrium concentration ratio of a solute between two immiscible solvents when the solute is in the same molecular state in both.'],
  ['Polarity and extraction','Partition depends on relative solute-solvent interactions; repeated small-volume extractions can be more effective than one equal total large extraction.']
 ],
 ['pH=−log[H⁺]','K_a=[H⁺][A⁻]/[HA]','pK_a=−logK_a','K_w=[H⁺][OH⁻]','K_sp=product of equilibrium ion concentrations with powers','K_pc=[solute]solvent1/[solute]solvent2'],
 [
  'Do stoichiometric neutralisation first, then equilibrium, in buffer-mixing questions.',
  'Write the actual Ksp expression before inserting concentrations.',
  'For common-ion problems, include pre-existing ion concentration in the equilibrium setup.',
  'Define the numerator and denominator of Kpc explicitly before calculations.'
 ],
 [
  'Buffers resist pH change; they do not hold pH perfectly constant.',
  'Kb and Kw=KaKb are not tested according to this syllabus, so do not introduce unnecessary methods.',
  'Ksp describes equilibrium, not simply “maximum concentration”.',
  'Partition calculations require the same solute form in both solvents.'
 ],
 ['Treating a weak acid as fully dissociated','Using initial rather than post-reaction concentrations in a buffer','Forgetting stoichiometric powers in Ksp','Reversing Kpc halfway through a calculation'],
 ['What makes two species a conjugate pair?','How does a weak-acid/conjugate-base buffer remove added H⁺?','How is Ksp written for M₂X₃?','Why does a common ion reduce solubility?','What physical interactions affect Kpc?']
),
'Advanced Reaction Kinetics':note(
 'Deduce rate laws and reaction orders from data and graphs, calculate rate constants and half-lives, infer mechanisms from rate-determining steps, and explain homogeneous and heterogeneous catalysis.',
 [
  ['Rate equation','A rate law such as rate=k[A]^m[B]^n is determined experimentally; m and n are reaction orders.'],
  ['Overall order','Overall order is the sum of individual concentration powers in the rate equation.'],
  ['Initial rates','Compare experiments where one concentration changes while others are controlled to infer each order.'],
  ['Graph methods','Concentration-time, rate-concentration and half-life behaviour can reveal order.'],
  ['First-order half-life','For first-order reactions, half-life is independent of initial concentration and k=0.693/t½.'],
  ['Rate constant','Units of k depend on overall order and must make the rate-equation dimensions consistent.'],
  ['Rate-determining step','The slow step controls the observed rate law, subject to how intermediates are generated and consumed.'],
  ['Mechanism consistency','A proposed mechanism must sum to the overall equation and produce a rate law consistent with experiment.'],
  ['Intermediate','An intermediate is formed in one step and consumed in another and does not appear in the overall equation.'],
  ['Heterogeneous catalysis','Surface catalysis involves adsorption, bond weakening/reaction and desorption; active sites and surface area matter.'],
  ['Homogeneous catalysis','A same-phase catalyst participates in one step and is regenerated later, providing a lower-energy route.'],
  ['Temperature','Higher temperature increases the rate constant and therefore rate; the explanation connects to the fraction of collisions able to cross activation energy.']
 ],
 ['rate=k[A]^m[B]^n','overall order=m+n','first-order k=0.693/t½'],
 [
  'Build an initial-rates ratio using experiments that isolate one concentration change.',
  'Derive k only after the rate law is known.',
  'Check k units as a powerful error detector.',
  'For mechanism questions, mark the slow step, cancel intermediates and compare the predicted rate dependence with the experimental law.'
 ],
 [
  'Reaction orders are empirical and need not equal equation coefficients.',
  'A first-order half-life stays constant as concentration falls.',
  'A catalyst changes pathway, not equilibrium position.',
  'An intermediate is not the same as a catalyst because the catalyst is regenerated overall.'
 ],
 ['Reading stoichiometric coefficients directly as reaction orders','Using first-order half-life formula for other orders','Forgetting k units','Accepting a mechanism that does not sum to the overall equation'],
 ['How are reaction orders determined?','What is special about first-order half-life?','How can a rate law test a proposed mechanism?','What distinguishes an intermediate from a catalyst?','What are the steps in heterogeneous surface catalysis?']
),
'Advanced Group 2':note(
 'Extend Group 2 chemistry by explaining thermal-stability, solubility and enthalpy-of-solution trends using polarisation, lattice energy and hydration enthalpy.',
 [
  ['Thermal stability','Group 2 nitrates and carbonates become more thermally stable down the group.'],
  ['Polarisation','Small high-charge-density cations distort large anions more strongly, weakening internal covalent bonds and making decomposition easier.'],
  ['Carbonates','Increasing cation radius down the group reduces polarisation of CO₃²⁻, increasing carbonate thermal stability.'],
  ['Nitrates','The same decreasing-polarisation reasoning explains increasing nitrate thermal stability down the group.'],
  ['Hydroxide solubility','Hydroxide solubility increases down Group 2.'],
  ['Sulfate solubility','Sulfate solubility decreases down Group 2.'],
  ['Energetic explanation','Solubility depends on competition between lattice-energy change and hydration enthalpy. Both vary with ionic radius, but not by identical amounts for different anions.'],
  ['Enthalpy of solution','ΔH°sol reflects the combined energetic cost of separating the ionic lattice and the energy released by hydrating ions.']
 ],
 ['ΔH_sol = lattice-separation contribution + ΣΔH_hyd'],
 [
  'For thermal-stability trends, use cation radius → polarising power → anion distortion → ease of decomposition.',
  'For solubility trends, discuss both hydration and lattice terms instead of memorising the direction only.',
  'Keep hydroxide and sulfate trends separate because they move in opposite directions.',
  'Use charge density language qualitatively without inventing unsupported numerical relationships.'
 ],
 [
  'This A Level topic extends the AS Group 2 facts with deeper energetic explanations.',
  'A larger ion usually has less exothermic hydration, but lattice effects also weaken.',
  'Solubility is an equilibrium outcome, not determined by one enthalpy term alone.',
  'Thermal stability and solubility are different trends with different explanations.'
 ],
 ['Reversing hydroxide and sulfate solubility trends','Explaining thermal stability using only “more shielding”','Ignoring lattice energy in solubility explanations','Assuming more exothermic ΔHsol always means high solubility without equilibrium context'],
 ['Why do Group 2 carbonates become more stable down the group?','How does cation polarising power change down Group 2?','What happens to hydroxide solubility?','What happens to sulfate solubility?','Why must hydration and lattice effects both be considered?']
),
'Transition Elements':note(
 'Explain the characteristic chemistry of first-row transition elements through d-electron structure, complex formation, ligand exchange, colour, catalysis, stereoisomerism and stability constants.',
 [
  ['Definition','A transition element is a d-block element forming at least one stable ion with an incomplete d subshell.'],
  ['d-orbital shapes','Recognise and sketch representative 3dxy and 3dz² orbital shapes.'],
  ['Variable oxidation states','Similar 3d and 4s energies allow different numbers of electrons to participate in bonding/ion formation.'],
  ['Catalysis','Multiple accessible oxidation states and vacant d orbitals enable alternative pathways through redox changes or temporary ligand bonding.'],
  ['Ligand','A ligand donates a lone pair to a central metal atom/ion to form a coordinate bond.'],
  ['Denticity','Monodentate ligands bind through one donor atom, bidentate through two and polydentate through several; EDTA⁴⁻ is a key polydentate example.'],
  ['Complex geometry','Recognise linear, tetrahedral, square-planar and octahedral complexes and relate coordination number to ligand attachments.'],
  ['Ligand exchange','Ligands can replace one another; Cu²⁺ and Co²⁺ aqua/ammonia/chloride/hydroxide systems are key examples with characteristic observations.'],
  ['Redox chemistry','Use E° data and balanced half-equations for reactions including manganate(VII), Fe²⁺ and iodide/Cu²⁺ systems.'],
  ['d-orbital splitting','Ligand fields split degenerate d orbitals into two energy sets; octahedral and tetrahedral patterns differ.'],
  ['Colour','Absorption of specific visible-light frequencies promotes d electrons across ΔE; the observed colour is complementary to absorbed light.'],
  ['Stereoisomerism','Transition complexes can show cis/trans and optical isomerism, particularly with square-planar or octahedral geometries and bidentate ligands.'],
  ['Stability constant','Kstab is the equilibrium constant for formation of a complex from its components in solution; larger Kstab generally indicates a more stable complex under the stated conditions.']
 ],
 ['K_stab = [complex]/(product of constituent concentrations with powers)','ΔE=hf conceptually for absorbed light'],
 [
  'Determine metal oxidation state and coordination number before predicting complex formula or geometry.',
  'Show lone-pair donation explicitly in ligand bonding explanations.',
  'For colour, connect ligand → splitting ΔE → absorbed frequency → observed complementary colour.',
  'For Kstab, omit liquid water from the equilibrium expression where instructed.'
 ],
 [
  'd-block does not automatically mean transition element under the formal definition.',
  'Geometry depends on coordination and ligand arrangement, not merely metal identity.',
  'Ligand exchange can change colour because it changes d-orbital splitting.',
  'Optical isomerism requires non-superimposable mirror-image arrangements.'
 ],
 ['Calling every d-block element a transition element','Confusing oxidation state with coordination number','Explaining colour as emission instead of selective absorption','Including [H₂O] as solvent in Kstab when it should be omitted'],
 ['What formally defines a transition element?','Why are variable oxidation states common?','How does ligand exchange affect colour?','What is coordination number?','What does a large Kstab imply?']
),
'Advanced Organic Chemistry':note(
 'Extend organic chemistry to A Level nomenclature, electrophilic substitution, addition–elimination, advanced optical isomerism, halogenoarenes and phenol chemistry.',
 [
  ['A Level functional groups','Recognise arenes, halogenoarenes, phenols, acyl chlorides, secondary/tertiary amines, amides and amino acids in displayed and skeletal structures.'],
  ['Advanced nomenclature','Name simple cyclic/aliphatic compounds and substituted aromatic molecules using correct locants and functional-group priority within the syllabus scope.'],
  ['Electrophilic substitution','Arene reactions preserve aromaticity overall by substituting a ring hydrogen after temporary loss of delocalisation.'],
  ['Addition–elimination','Acyl-chloride reactions proceed by nucleophilic addition to the carbonyl followed by elimination, restoring C=O.'],
  ['Aromatic bonding','Benzene is planar with sp² carbons and a delocalised π system above and below the σ-bond framework.'],
  ['Optical activity','Enantiomers rotate plane-polarised light in opposite directions and can have different biological effects in chiral environments.'],
  ['Racemic mixture','An equal mixture of enantiomers has no net optical rotation.'],
  ['Drug chirality','Different enantiomers may have different biological activity, motivating resolution or chiral catalysts that favour one stereoisomer.'],
  ['Halogenoarenes','Aryl C–X bonds are less reactive toward nucleophilic substitution than comparable halogenoalkanes because the halogen lone pair interacts with the delocalised ring and the carbon is sp².'],
  ['Phenol acidity','Phenol is more acidic than alcohols because the phenoxide ion is stabilised by delocalisation, but it is less acidic than typical carboxylic acids.'],
  ['Activated phenol ring','The –OH group activates and directs electrophilic substitution mainly to 2,4,6 positions, so phenol reacts with milder nitrating/brominating conditions than benzene.']
 ],
 [],
 [
  'For aromatic mechanisms, show generation/attack of the electrophile and restoration of the delocalised ring.',
  'When comparing acidity/basicity, compare stability of the conjugate species, not just electronegativity words.',
  'For optical-isomer questions, identify stereogenic centres and the symmetry of the whole molecule.',
  'Use the correct reaction family: electrophilic substitution for arenes and addition–elimination for acyl chlorides.'
 ],
 [
  'Benzene prefers substitution because addition would destroy aromatic stabilisation.',
  'Phenol and chlorobenzene behave differently from aliphatic alcohols/halogenoalkanes because of ring delocalisation.',
  'A racemate contains both enantiomers equally.',
  'Biological systems are chiral, so enantiomers can behave differently despite many identical bulk physical properties.'
 ],
 ['Drawing benzene as three isolated double bonds in mechanism reasoning','Using nucleophilic substitution conditions for chlorobenzene as if it were chloroethane','Calling every chiral-centre-containing mixture optically active','Explaining phenol acidity without conjugate-base stabilisation'],
 ['Why does benzene favour substitution?','Why is chlorobenzene less reactive than chloroethane?','Why is phenol more acidic than ethanol?','What makes a racemic mixture optically inactive?','Why can drug enantiomers have different biological activity?']
),
'Aromatic Chemistry':note(
 'Master benzene and methylbenzene electrophilic substitution, side-chain chemistry, directing effects and the distinctive reactivity of phenol and phenylamine-containing systems.',
 [
  ['Halogenation','Benzene reacts with Cl₂/AlCl₃ or Br₂/AlBr₃ by electrophilic substitution to form halogenoarenes.'],
  ['Nitration','Concentrated HNO₃/H₂SO₄ produces the nitronium electrophile and nitrates benzene within the syllabus temperature range.'],
  ['Friedel–Crafts alkylation','CH₃Cl/AlCl₃ and heat can install an alkyl group on the ring.'],
  ['Friedel–Crafts acylation','CH₃COCl/AlCl₃ and heat can install an acyl group on the ring.'],
  ['Side-chain oxidation','An alkylbenzene with a suitable benzylic hydrogen can be oxidised using hot alkaline KMnO₄ then acidified to form a benzoic-acid group.'],
  ['Ring hydrogenation','H₂ with Pt/Ni and heat can hydrogenate the aromatic ring to a cyclohexane ring under forcing conditions.'],
  ['Electrophilic-substitution mechanism','Electrophile attack forms a non-aromatic intermediate; loss of H⁺ restores the delocalised π system.'],
  ['Ring versus side-chain halogenation','Conditions determine whether substitution occurs on the aromatic ring or side chain.'],
  ['Directing effects','–NH₂, –OH and alkyl groups direct mainly to 2/4 positions; –NO₂, –COOH and –COR direct mainly to 3 positions in the syllabus treatment.'],
  ['Phenol bromination/nitration','Phenol reacts readily with Br₂(aq) and dilute HNO₃ under much milder conditions than benzene because –OH activates the ring.'],
  ['Azo coupling','Diazonium salts can couple with phenol in alkaline solution to form strongly coloured azo compounds.']
 ],
 [],
 [
  'State both reagent and catalyst/conditions for every aromatic substitution.',
  'For mechanisms, regenerate aromaticity in the final step.',
  'For directing questions, identify the existing substituent before predicting major positions.',
  'Distinguish radical side-chain halogenation conditions from electrophilic ring halogenation conditions.'
 ],
 [
  'A methyl substituent changes both ring reactivity and side-chain chemistry.',
  'Phenol is substantially more reactive toward electrophilic substitution than benzene.',
  'Friedel–Crafts acylation introduces COR, not COOH.',
  'Directing effects predict preferred positions rather than an absolute single product in every real reaction.'
 ],
 ['Using UV conditions for ring halogenation','Forgetting AlCl₃/AlBr₃ catalyst','Oxidising the benzene ring itself instead of the alkyl side chain','Applying the wrong directing pattern'],
 ['What electrophile is involved in nitration?','Why does electrophilic substitution preserve aromatic stability overall?','How do ring and side-chain halogenation conditions differ?','Which positions does –OH direct toward?','How is methylbenzene converted to benzoic acid?']
),
'Carboxylic Acids and Acyl Chloride Derivatives':note(
 'Extend carboxylic-acid chemistry to substituted-acid acidity, acyl chloride formation and addition–elimination reactions with water, alcohols, phenols, ammonia and amines.',
 [
  ['Benzoic acid preparation','Oxidise an alkylbenzene side chain with hot alkaline KMnO₄ then acidify.'],
  ['Acyl chloride preparation','Carboxylic acids react with reagents such as PCl₅, PCl₃/heat or SOCl₂ to form acyl chlorides.'],
  ['Further oxidation','Methanoic acid and ethanedioic acid can undergo further oxidation under the specified oxidising conditions.'],
  ['Relative acidity','Carboxylic acids are more acidic than phenols, which are more acidic than typical alcohols because their conjugate bases have different degrees of stabilisation.'],
  ['Inductive effect','Electron-withdrawing chlorine substituents stabilise carboxylate negative charge and increase acidity; effect weakens with distance.'],
  ['Acyl chloride hydrolysis','Water reacts rapidly at room temperature to form the carboxylic acid and HCl.'],
  ['Ester formation','Acyl chlorides react with alcohols or phenols at room temperature to form esters and HCl.'],
  ['Amide formation','Acyl chlorides react with NH₃ or primary/secondary amines to form amides, with HCl/by-product acid handling in the stoichiometry.'],
  ['Addition–elimination mechanism','A nucleophile attacks the polar carbonyl carbon, forming a tetrahedral intermediate; chloride then leaves as C=O is restored.'],
  ['Reactivity comparison','Acyl chlorides hydrolyse far more readily than alkyl chlorides or halogenoarenes because the carbonyl activates the acyl carbon toward nucleophilic attack and Cl⁻ is a good leaving group.']
 ],
 [],
 [
  'Track the nucleophile and leaving group through the addition–elimination mechanism.',
  'For acidity comparisons, draw or describe the conjugate bases.',
  'Include HCl among acyl-chloride reaction products where required.',
  'Use room-temperature conditions correctly; acyl chlorides are much more reactive than esters or amides.'
 ],
 [
  'Acyl chloride carbon is electrophilic because the carbonyl is strongly polarised.',
  'Electron-withdrawing substituents increase carboxylic-acid acidity by stabilising the conjugate base.',
  'Phenol esterification with acyl chloride is different from Fischer esterification with a carboxylic acid.',
  'Halogenoarene hydrolysis resistance has a different electronic origin from acyl-chloride reactivity.'
 ],
 ['Drawing substitution without a tetrahedral intermediate for acyl chloride','Forgetting HCl product','Saying chlorine substitution always decreases acidity','Treating chlorobenzene and ethanoyl chloride as similarly reactive'],
 ['How is an acyl chloride made from a carboxylic acid?','Why are acyl chlorides so reactive to nucleophiles?','How does chlorine substitution affect carboxylic-acid acidity?','What products form with an alcohol?','What are the two core stages of addition–elimination?']
),
'Nitrogen Chemistry':note(
 'Master advanced amine preparation/basicity, phenylamine and diazonium chemistry, amides, amino acids, zwitterions, peptide bonds and electrophoresis.',
 [
  ['Amine preparation','Primary/secondary amines can form by nucleophilic substitution of halogenoalkanes; nitriles and amides can be reduced using appropriate reagents.'],
  ['Acylation of amines','Ammonia and amines react with acyl chlorides to form amides.'],
  ['Amine basicity','Amines are Brønsted-Lowry bases because the nitrogen lone pair accepts H⁺; electron-donating alkyl groups tend to increase availability of the lone pair.'],
  ['Phenylamine basicity','Phenylamine is less basic than ethylamine because the nitrogen lone pair is delocalised into the benzene ring and is less available for protonation.'],
  ['Phenylamine preparation','Nitrobenzene can be reduced with Sn/concentrated HCl and then treated with NaOH to obtain phenylamine.'],
  ['Diazotisation','Phenylamine reacts with nitrous acid generated from NaNO₂ and dilute acid below 10°C to form a diazonium salt.'],
  ['Diazonium hydrolysis','Warming the diazonium salt with water produces phenol.'],
  ['Azo coupling','Diazonium ions couple with activated aromatic systems such as phenol in alkaline solution to form azo dyes.'],
  ['Amides','Amides are much weaker bases than amines because the nitrogen lone pair is delocalised toward the carbonyl group.'],
  ['Amide hydrolysis/reduction','Acidic or alkaline hydrolysis cleaves amides; LiAlH₄ reduces the carbonyl portion to give an amine.'],
  ['Amino acids','Amino acids contain acidic and basic groups and often exist as zwitterions; the isoelectric point is the pH at which net charge is zero.'],
  ['Peptide bonds','Amino acids form amide (peptide) bonds by condensation to produce di- and tripeptides.'],
  ['Electrophoresis','Migration direction depends on the species’ net charge at the buffer pH relative to its isoelectric behaviour.']
 ],
 [],
 [
  'For basicity comparisons, discuss lone-pair availability.',
  'Keep diazotisation below 10°C before any later warming step.',
  'For amino-acid electrophoresis, determine net charge at the stated pH before predicting movement.',
  'Draw peptide bonds as the correct -CO-NH- linkage and identify the eliminated small molecule in condensation.'
 ],
 [
  'Phenylamine and amides are weak bases for different delocalisation contexts.',
  'Diazonium salts are key synthetic intermediates linking phenylamine to phenol and azo dyes.',
  'A zwitterion contains both positive and negative charges but can have overall zero charge.',
  'Isoelectric point is about net charge, not the absence of ions.'
 ],
 ['Saying phenylamine is more basic because it contains a benzene ring','Heating diazotisation strongly from the start','Drawing peptide bond as C-N without carbonyl context','Predicting electrophoresis direction without assigning net charge'],
 ['Why is ethylamine more basic than phenylamine?','How is a diazonium salt prepared?','Why are amides weak bases?','What is a zwitterion?','How does pH affect amino-acid electrophoresis?']
),
'Condensation Polymerisation':note(
 'Build and deconstruct polyesters and polyamides, distinguish condensation from addition polymerisation, and explain why ester/amide links can make polymers more degradable.',
 [
  ['Polyester formation','A diol with a dicarboxylic acid or dioyl chloride can form a polyester; a hydroxycarboxylic acid can self-condense.'],
  ['Polyamide formation','A diamine with a dicarboxylic acid/dioyl chloride can form a polyamide; aminocarboxylic acids or amino acids can also form polyamide chains.'],
  ['Repeat unit','Construct the repeat unit by connecting monomers through ester or amide links while removing the appropriate small molecule/by-product representation.'],
  ['Monomer recovery','Work backward from a polymer segment by cutting ester or amide linkages at the correct bonds and restoring functional groups.'],
  ['Addition versus condensation','Addition polymers generally arise from C=C monomers without small-molecule loss; condensation polymers use bifunctional monomers and form linking groups.'],
  ['Poly(alkene) persistence','Carbon-carbon backbones are relatively inert and difficult to hydrolyse, helping explain poor biodegradability.'],
  ['Photodegradation','Some polymers can be designed or formulated to degrade more readily under light.'],
  ['Hydrolytic degradation','Polyester and polyamide linkages can undergo acidic or alkaline hydrolysis, allowing greater degradability than many poly(alkenes).']
 ],
 [],
 [
  'Circle the functional groups on each monomer before constructing a condensation repeat unit.',
  'When recovering monomers, split the linkage and restore OH/COOH/NH₂ functionality correctly.',
  'State whether a small molecule such as water or HCl is eliminated when relevant to the monomer pair.',
  'Use the linkage identity to predict hydrolysis/degradation behaviour.'
 ],
 [
  'Condensation and addition polymerisation use fundamentally different bond-forming logic.',
  'A polymer can contain ester or amide links repeatedly even though monomer structures differ.',
  'Biodegradability depends on chemically cleavable links and environmental conditions.',
  'Not every polymer with heteroatoms is automatically readily biodegradable.'
 ],
 ['Leaving C=C in a condensation-polymer repeat unit','Recovering the wrong monomer functional groups','Calling polyamide formation addition polymerisation','Saying all condensation polymers biodegrade instantly'],
 ['How is a polyester formed from a diol and dicarboxylic acid?','How do you identify monomers from a repeat unit?','What distinguishes addition from condensation polymerisation?','Why are ester links hydrolysable?','How can amino acids form a polyamide?']
),
'Organic Synthesis and Multi-step Routes':note(
 'Integrate AS and A Level organic chemistry into complete multi-step routes with correct reagents, conditions, mechanisms, selectivity, carbon-count changes and by-products.',
 [
  ['Functional-group inventory','Identify every functional group present before planning a route because multifunctional molecules can react at more than one site.'],
  ['Retrosynthesis','Work backward from the target to immediate precursors using known syllabus transformations, then reverse the sequence into a forward synthesis.'],
  ['Aromatic routes','Plan benzene nitration, reduction to phenylamine, diazotisation, phenol formation, coupling and ring-substitution routes with exact conditions.'],
  ['Acyl chemistry','Use carboxylic acid → acyl chloride → ester/amide transformations when a reactive acyl intermediate is needed.'],
  ['Chain extension','Nitrile introduction and HCN addition remain key carbon-chain extension methods from AS knowledge.'],
  ['Oxidation-state control','Choose conditions that distinguish aldehyde, ketone, carboxylic-acid and related transformations.'],
  ['Protecting selectivity by conditions','Reagent, solvent, temperature and order can alter which functional group reacts or whether substitution/elimination dominates.'],
  ['Mechanism recognition','Classify steps such as electrophilic substitution, nucleophilic substitution, nucleophilic addition and addition–elimination.'],
  ['By-products','A complete route analysis should consider likely salts, HCl, water or competing organic products where chemically relevant.'],
  ['Evidence-driven identification','Use chemical tests and analytical data to verify intermediates or distinguish possible structures.']
 ],
 [],
 [
  'Draw every intermediate, not just reagent arrows.',
  'Track carbon count and functional-group changes after each step.',
  'Annotate catalysts, solvents and temperatures where syllabus conditions matter.',
  'If more than one route is possible, choose the one using known syllabus chemistry and fewer problematic side reactions.'
 ],
 [
  'A correct reagent with wrong conditions can lead to a different product.',
  'Aromatic and aliphatic halogen chemistry use different mechanisms and conditions.',
  'Acyl chlorides are powerful route intermediates because they react readily with several nucleophiles.',
  'Analytical evidence can rule out plausible-looking routes that produce the wrong structure.'
 ],
 ['Skipping intermediates','Losing track of carbon number','Using AS halogenoalkane conditions on halogenoarenes','Giving reagents without conditions','Ignoring possible by-products'],
 ['How can you work backward from an amide target?','Which steps can extend a carbon chain?','How can benzene be converted to phenol through phenylamine/diazonium chemistry?','Why might an acyl chloride be chosen as an intermediate?','What should be checked after every synthesis step?']
),
'NMR Spectroscopy':note(
 'Interpret carbon-13 and proton NMR spectra using chemical environments, chemical shift, integration and splitting, and apply TMS, deuterated solvents and D₂O exchange correctly.',
 [
  ['13C environments','Each distinct carbon environment generally gives one 13C NMR signal, with symmetry reducing the number of different environments.'],
  ['13C structure deduction','Use the number and chemical shifts of carbon signals alongside molecular formula/other data to narrow possible structures.'],
  ['1H environments','Chemically equivalent protons share a signal; different environments produce different chemical shifts.'],
  ['Integration','Relative peak areas indicate relative numbers of protons in each environment.'],
  ['n+1 splitting','A proton set with n equivalent neighbouring protons on an adjacent carbon is commonly split into n+1 peaks within the syllabus limit.'],
  ['Splitting patterns','Recognise singlet, doublet, triplet, quartet and multiplet patterns and combine them with integration.'],
  ['Chemical shift','Use the exam data table rather than memorising every range; local electron density and functional groups influence shift.'],
  ['TMS','Tetramethylsilane provides the reference at δ=0 because it gives one strong signal and is chemically suitable.'],
  ['Deuterated solvent','A deuterated solvent such as CDCl₃ avoids a large ordinary proton-solvent signal.'],
  ['D₂O exchange','O-H and N-H proton signals can disappear/change after D₂O exchange, helping identify exchangeable protons.'],
  ['Combined deduction','A valid proposed structure must satisfy every signal count, integration ratio, splitting pattern and chemical-shift clue.']
 ],
 ['n neighbouring equivalent protons → n+1 splitting (within syllabus assumptions)'],
 [
  'Start with molecular formula and unsaturation/functional-group evidence before assigning every peak.',
  'Use 13C signal count to constrain symmetry, then 1H integration/splitting to assemble fragments.',
  'Treat O-H/N-H splitting cautiously and use D₂O exchange evidence when supplied.',
  'Verify the final structure predicts the complete spectrum, not just one attractive peak.'
 ],
 [
  'Integration gives proton ratios, not absolute atom counts unless the molecular formula anchors them.',
  'Equivalent protons do not split one another in the simple syllabus treatment.',
  'Chemical shift and splitting answer different questions.',
  'A symmetric molecule may have far fewer NMR signals than atoms.'
 ],
 ['Counting atoms instead of environments','Using n+1 across more distant neighbours indiscriminately','Ignoring integration','Forgetting TMS reference','Treating O-H splitting like a fixed alkyl pattern'],
 ['What determines the number of 13C peaks?','What does proton integration tell you?','How is n+1 used?','Why is CDCl₃ used?','How can D₂O identify O-H or N-H?']
),
'Chromatography and Mass Spectrometry':note(
 'Use thin-layer and gas/liquid chromatography to separate and identify mixture components, while integrating assumed AS mass-spectrometry evidence when a full A Level structural problem combines techniques.',
 [
  ['TLC stationary phase','A solid such as aluminium oxide on a support acts as stationary phase.'],
  ['TLC mobile phase','A solvent moves up the plate, carrying solutes according to their relative attraction to the mobile and stationary phases.'],
  ['Rf value','Rf=distance moved by solute/distance moved by solvent front under the same experiment.'],
  ['Rf interpretation','Different interactions/solubilities cause different Rf values; comparison is meaningful only under matching conditions.'],
  ['Baseline and solvent front','Samples begin on a baseline above the solvent level, and the solvent front must be marked before evaporation.'],
  ['Gas/liquid chromatography','An unreactive gas is the mobile phase and a high-boiling liquid on a solid support is the stationary phase.'],
  ['Retention time','Components with stronger interaction with the stationary phase generally take longer to leave the column.'],
  ['Composition from chromatogram','Peak areas can be used to infer percentage composition when detector response assumptions/data support it.'],
  ['Technique integration','A Level Paper 4 can still require AS analytical knowledge, so mass spectrum molecular-ion/isotope/fragment evidence may be combined with the new A Level chromatographic and NMR evidence.']
 ],
 ['R_f=distance moved by solute/distance moved by solvent front'],
 [
  'For TLC, measure both distances from the original baseline.',
  'Explain separation by comparing both stationary-phase interaction and mobile-phase solubility.',
  'For GLC, distinguish retention time from peak area.',
  'When multiple analytical techniques are supplied, require the proposed structure to satisfy all of them.'
 ],
 [
  'Rf is condition-dependent and not a universal constant.',
  'GLC peak position and peak area carry different information.',
  'Mass spectrometry is principally prior AS analytical content here, while TLC/GLC are new A Level syllabus additions.',
  'A single technique rarely proves a unique structure without supporting evidence.'
 ],
 ['Measuring Rf from the bottom of the plate instead of baseline','Letting the solvent start above the sample spots','Equating largest GLC peak height directly with percentage without context','Using retention time as peak area'],
 ['What does Rf compare?','Why must the solvent front be marked?','What makes GLC retention time longer?','What can chromatogram peak area indicate?','How can chromatography and spectra complement one another?']
),
'A Level Practical Planning and Analysis':note(
 'Master Chemistry Paper 5 planning, analysis, conclusions and evaluation, including safe experimental design, quantitative technique, data processing, graphs, error analysis and evidence-based judgement.',
 [
  ['Paper 5 purpose','Paper 5 is a written higher-order practical paper assessing planning, analysis, conclusions and evaluation without requiring laboratory facilities during the exam.'],
  ['Defining the problem','Identify independent, dependent and controlled variables and express the aim as a testable prediction or expected graph.'],
  ['Safe efficient procedure','Design a procedure that can realistically collect reliable data, with appropriate apparatus, reagent quantities/concentrations and control of variables.'],
  ['Instrument precision','Choose measuring equipment with suitable range and resolution for the intended measurements.'],
  ['Risk control','Identify specific hazards and pair them with realistic precautions such as fume hood, suitable gloves, avoidance of flames or other context-appropriate controls.'],
  ['Control experiments','Use controls where appropriate to show that the independent variable, rather than another factor, causes the observed change.'],
  ['Standard quantitative practice','Know principles such as making standard solutions, weighing by difference, concordant titration, heating to constant mass and taking extra readings near an inflexion region.'],
  ['Results tables','Design headings with quantity and units, sensible precision and enough columns for derived values needed in later analysis.'],
  ['Data processing','Calculate means, percentages, percentage gain/loss, percentage error and other derived quantities with appropriate significant figures.'],
  ['Graphs','Choose meaningful axes/scales, plot accurately, draw an appropriate line/curve of best fit and use y=mx+c relationships where required.'],
  ['Conclusion','Describe the key pattern quantitatively and decide whether the data support the prediction, with a scientific explanation.'],
  ['Anomalies','Identify anomalous points, suggest plausible causes and decide whether they should be repeated or treated separately rather than deleted automatically.'],
  ['Replication and range','Evaluate whether there are enough repeats and whether the independent-variable range is wide/dense enough to support the conclusion.'],
  ['Controlled variables','Assess from the supplied method/data whether important controls were actually maintained.'],
  ['Procedure weaknesses','Identify specific weaknesses and explain how they affect reliability, validity or measured values.'],
  ['Improvement','Propose a practical change directly linked to the named weakness and explain how it improves the evidence.'],
  ['Validity and confidence','Judge whether the data are suitable to support or reject a prediction and how confidently a conclusion can be drawn.']
 ],
 ['percentage error=|experimental−accepted|/accepted×100%','mean=Σx/n','linear model y=mx+c'],
 [
  'Write a plan in the order another chemist could actually perform it: variables, apparatus, procedure, safety, repeats/range, table/graph and analysis.',
  'Link every control variable to a method for keeping it constant.',
  'In evaluation, separate random scatter, systematic bias, poor control and insufficient range/repeats.',
  'Use data numerically in conclusions rather than writing only “increases” or “decreases”.'
 ],
 [
  'Vague phrases such as “human error” or “use better apparatus” are weak unless the source and consequence are specified.',
  'Reliability concerns repeatability; validity concerns whether the method actually tests the intended relationship.',
  'An anomaly should be investigated, not automatically discarded.',
  'A wide and well-chosen range can reveal a relationship that a narrow cluster of points would hide.'
 ],
 ['Naming variables without saying how they are measured/controlled','Suggesting unsafe or impractical quantities','Giving tables without units','Plotting the wrong variables','Calling every discrepancy random error','Removing anomalies without justification'],
 ['What makes a prediction experimentally testable?','How do you choose an instrument with suitable precision?','What is the purpose of a control experiment?','How should an anomaly be handled?','What makes an evaluation improvement convincing?']
)
};

// Add only genuinely missing standalone A2 areas, while preserving every existing runtime ID.
const addIfMissing=(title,order)=>{
 let e=curriculum.find(x=>x.board===BOARD&&x.grade===GRADE&&x.subject===SUBJECT&&x.title===title);
 if(e)return e;
 e={board:BOARD,grade:GRADE,subject:SUBJECT,title,order,id:BOARD+'|'+GRADE+'|'+SUBJECT+'|'+title,summary:'',keyPoints:[],formulas:[],method:[],mistakes:[]};
 curriculum.push(e);return e;
};
addIfMissing('Advanced Group 2',6.5);
addIfMissing('Carboxylic Acids and Acyl Chloride Derivatives',8.5);
addIfMissing('Condensation Polymerisation',9.5);

const rows=curriculum.filter(e=>e.board===BOARD&&e.grade===GRADE&&e.subject===SUBJECT);
const existingOrder=[
 'Advanced Energetics and Lattice Energy','Entropy and Gibbs Energy','Advanced Equilibria','Advanced Electrochemistry','Advanced Reaction Kinetics',
 'Advanced Group 2','Transition Elements','Advanced Organic Chemistry','Aromatic Chemistry','Carboxylic Acids and Acyl Chloride Derivatives',
 'Nitrogen Chemistry','Condensation Polymerisation','Organic Synthesis and Multi-step Routes','NMR Spectroscopy','Chromatography and Mass Spectrometry',
 'A Level Practical Planning and Analysis'
];
existingOrder.forEach((t,i)=>{const e=rows.find(x=>x.title===t);if(e)e.order=i+1});

const rendered=[];
for(const title of existingOrder){
 const e=rows.find(x=>x.title===title);
 const patch=notes[title];
 if(!e||!patch)continue;
 e.summary=patch.summary;
 e.keyPoints=patch.keyPoints;
 e.formulas=patch.formulas;
 e.method=patch.method;
 e.mistakes=patch.mistakes;
 e.lens='Use the official 9701 A Level syllabus as the scope boundary; connect equations, mechanisms, energetic arguments, observations, spectra and experimental evidence.';
 e.deepNotes=patch.deepNotes;
 e.notesVerified=true;
 e.sourcePublisher='Cambridge International';
 e.sourceBook='Chemistry 9701';
 e.sourceYear=YEAR;
 e.noteSourceFile='User-supplied Cambridge International AS & A Level Chemistry 9701 syllabus; ChemBridge A2 Level Chemistry resources';
 e.noteSourceBasis=SOURCE;
 rendered.push({title:e.title,id:e.id,deepNotes:e.deepNotes});
}

window.STUDYAI_CAIE_A_LEVEL_CHEMISTRY_DEEP_NOTES=rendered;
window.STUDYAI_CAIE_A_LEVEL_CHEMISTRY_DEEP_NOTES_STATUS={
 total:16,
 matched:rendered.length,
 unmatched:existingOrder.filter(t=>!rendered.some(x=>x.title===t)),
 preservedIds:rows.filter(e=>!['Advanced Group 2','Carboxylic Acids and Acyl Chloride Derivatives','Condensation Polymerisation'].includes(e.title)).map(e=>e.id),
 addedIds:rows.filter(e=>['Advanced Group 2','Carboxylic Acids and Acyl Chloride Derivatives','Condensation Polymerisation'].includes(e.title)).map(e=>e.id)
};

if(typeof window.renderFilters==='function')window.renderFilters();
else if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
