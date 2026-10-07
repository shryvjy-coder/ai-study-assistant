/* Original StudyAI full notes for Cambridge International AS & A Level Biology.
 * Expands the generic Biology entries into topic-based exam-ready notes.
 */
(() => {
'use strict';

const banks={
'AS Level (11)':{
'Cell Structure':[
 ['Microscopy and scale','Cell biology starts with scale. Light microscopes resolve whole cells and larger organelles; electron microscopes reveal much smaller internal structures because electrons have far shorter wavelengths than visible light. Magnification enlarges an image, while resolution is the ability to distinguish two close points as separate.'],
 ['Eukaryotic cell organisation','The nucleus stores genetic information, mitochondria carry out aerobic respiration, rough ER and ribosomes synthesise proteins, Golgi modifies and packages products, lysosomes contain hydrolytic enzymes, and membranes compartmentalise reactions. Structure should always be linked to function.'],
 ['Plant-cell specialisation','Plant cells add a cellulose wall, large permanent vacuole and, in photosynthetic tissues, chloroplasts. The wall resists osmotic swelling, while chloroplast internal membranes provide a large surface for light-dependent reactions.'],
 ['Prokaryotic cells','Prokaryotes lack a membrane-bound nucleus and most membrane-bound organelles. Their circular DNA, plasmids, 70S ribosomes, cell wall and small size distinguish them from eukaryotic cells.'],
 ['Interpreting micrographs','Use visible evidence rather than assumptions: identify membrane systems, organelle shape, relative size and tissue context. When measuring from a micrograph, convert units carefully before using magnification equations.']
],
'Biological Molecules':[
 ['Monomers and condensation','Large biological molecules are assembled from smaller monomers by condensation reactions that form covalent bonds and release water. Hydrolysis reverses this by using water to break those bonds.'],
 ['Carbohydrates','Glucose monomers form disaccharides and polysaccharides. Starch and glycogen are storage molecules with compact, branched structures; cellulose forms straight beta-glucose chains that hydrogen-bond into strong microfibrils.'],
 ['Lipids','Triglycerides form from glycerol and three fatty acids. Their many C-H bonds make them energy-dense, while phospholipids are amphipathic and spontaneously form bilayers in water.'],
 ['Proteins','Amino acids join by peptide bonds to form polypeptides. Primary sequence determines folding into secondary, tertiary and sometimes quaternary structure; changes in bonding can therefore change function.'],
 ['Water','Water is polar and forms hydrogen bonds. This explains cohesion, solvent properties, high specific heat capacity and evaporative cooling, making water essential in transport and temperature regulation.']
],
'Enzymes':[
 ['Active sites and specificity','Enzymes are globular proteins whose tertiary structure forms a specific active site. Substrate binding forms an enzyme-substrate complex and lowers activation energy without changing the overall energy change of the reaction.'],
 ['Induced fit','The active site is not perfectly rigid. Binding can cause a slight conformational change that aligns catalytic groups, explaining why shape and chemistry both matter to specificity.'],
 ['Temperature effects','Increasing temperature raises kinetic energy and collision frequency up to an optimum. Above the optimum, bonds maintaining tertiary structure are disrupted and the active site loses its complementary shape.'],
 ['pH and inhibitors','pH changes alter ionisation of amino-acid side chains and can disrupt ionic and hydrogen bonds. Competitive inhibitors occupy the active site; non-competitive inhibitors bind elsewhere and change enzyme conformation.'],
 ['Rate investigations','Use initial rate when possible because substrate concentration changes over time. Keep temperature, pH, enzyme concentration and other control variables constant when testing one factor.']
],
'Cell Membranes and Transport':[
 ['Fluid mosaic model','A phospholipid bilayer forms the basic membrane, with proteins, cholesterol and carbohydrate-containing molecules embedded within it. Hydrophobic interactions hold the bilayer together while components can move laterally.'],
 ['Diffusion and facilitated diffusion','Small non-polar molecules cross directly through phospholipids; polar molecules and ions often need channel or carrier proteins. Both forms move down a concentration gradient and do not require metabolic energy.'],
 ['Osmosis','Water moves across partially permeable membranes from higher water potential to lower water potential. In plant cells, the wall allows turgor pressure to oppose further water entry.'],
 ['Active transport','Carrier proteins use energy from ATP to move substances against electrochemical gradients. This is essential where cells must accumulate ions or nutrients beyond equilibrium.'],
 ['Bulk transport','Endocytosis brings material into cells in vesicles; exocytosis releases vesicle contents by fusion with the plasma membrane. Both depend on membrane fluidity and ATP.']
],
'The Mitotic Cell Cycle':[
 ['Cell-cycle stages','Interphase includes growth, organelle production and DNA replication. Mitosis separates replicated chromosomes into genetically identical nuclei, followed by cytokinesis.'],
 ['Chromosome behaviour','After replication each chromosome consists of sister chromatids joined at a centromere. During mitosis they condense, align, separate and move to opposite poles.'],
 ['Spindle function','Microtubules attach to centromeres and generate forces that separate sister chromatids. Correct attachment is essential for equal chromosome distribution.'],
 ['Control of division','Cell-cycle checkpoints prevent damaged or incompletely replicated DNA from being passed on. Loss of control can lead to tumour formation.'],
 ['Significance','Mitosis supports growth, tissue repair and asexual reproduction while preserving chromosome number and genetic continuity.']
],
'Nucleic Acids and Protein Synthesis':[
 ['DNA structure','DNA consists of antiparallel polynucleotide strands held by hydrogen bonds between complementary bases. The sugar-phosphate backbone lies outside while bases pair A-T and C-G.'],
 ['DNA replication','Replication is semi-conservative: each new DNA molecule contains one original strand and one newly synthesised strand. Base pairing ensures sequence fidelity.'],
 ['RNA','RNA is usually single-stranded, contains ribose and uracil, and exists in forms including mRNA, tRNA and rRNA. These molecules coordinate translation.'],
 ['Transcription','RNA polymerase uses one DNA strand as a template to build complementary mRNA. In eukaryotes the transcript is processed before leaving the nucleus.'],
 ['Translation','Ribosomes read mRNA codons, tRNA carries specific amino acids using complementary anticodons, and peptide bonds form to build the polypeptide sequence encoded by the gene.']
],
'Transport in Plants':[
 ['Xylem structure','Xylem vessels are dead, hollow and lignified, forming low-resistance tubes for water and mineral transport while also supporting the plant.'],
 ['Transpiration pull','Evaporation from mesophyll cell walls lowers leaf water potential. Cohesion between water molecules and adhesion to xylem walls help maintain a continuous column under tension.'],
 ['Stomatal control','Guard-cell turgor controls stomatal aperture, balancing carbon-dioxide uptake with water loss. Light, humidity, temperature and water availability alter transpiration rate.'],
 ['Phloem transport','Phloem transports assimilates such as sucrose from sources to sinks. Companion cells support active loading and unloading, producing pressure differences that drive mass flow.'],
 ['Evidence and experiments','Potometers estimate water uptake rather than transpiration directly. Interpret changes while accounting for evaporation, leaf area and environmental controls.']
],
'Transport in Mammals':[
 ['Double circulation','Pulmonary and systemic circuits keep oxygenated and deoxygenated blood largely separate and allow different pressure regimes for lungs and body tissues.'],
 ['Cardiac cycle','Atria and ventricles contract in a coordinated sequence. Pressure differences open and close valves, so valve movement is a consequence of pressure change rather than active valve contraction.'],
 ['Vessel structure','Elastic arteries withstand pressure pulses, muscular arterioles control distribution, capillaries provide thin exchange surfaces, and veins return low-pressure blood with help from valves and skeletal muscles.'],
 ['Blood and haemoglobin','Haemoglobin binds oxygen reversibly. Its affinity changes with oxygen concentration and carbon dioxide conditions, supporting loading in lungs and unloading in respiring tissues.'],
 ['Tissue fluid','High hydrostatic pressure at capillary beds forces plasma components out to form tissue fluid; most returns by osmosis while excess enters lymph vessels.']
],
'Gas Exchange':[
 ['Gas-exchange surfaces','Efficient surfaces are large, thin, moist and well supplied with ventilation and blood flow. These features maintain steep diffusion gradients.'],
 ['Lung anatomy','Bronchi, bronchioles and alveoli form a branching system. Elastic fibres and surfactant help alveoli remain functional during breathing.'],
 ['Ventilation','Diaphragm and intercostal muscles alter thoracic volume, changing pressure and driving bulk airflow. Gas exchange itself then occurs by diffusion.'],
 ['Oxygen and carbon dioxide','Oxygen moves from alveolar air into blood and carbon dioxide in the opposite direction. Continuous circulation and ventilation prevent equilibrium from being reached.'],
 ['Effects of disease','Damage such as fibrosis or emphysema reduces surface area or increases diffusion distance, lowering gas-exchange efficiency and therefore oxygen delivery.']
],
'Infectious Diseases':[
 ['Pathogens','Disease-causing organisms include bacteria, viruses, fungi and protoctists. Their transmission route determines effective control measures.'],
 ['Transmission','Airborne droplets, contaminated food or water, direct contact and vectors spread different diseases. Break transmission by targeting the route rather than only treating symptoms.'],
 ['Antibiotics','Antibiotics act on bacterial structures or processes but not viruses. Misuse creates selection pressure favouring resistant strains.'],
 ['Disease control','Sanitation, vaccination, vector control, quarantine and health education reduce transmission at population level.'],
 ['Interpreting disease data','Separate correlation from causation and consider sampling, diagnostic criteria and confounding variables before accepting an epidemiological conclusion.']
],
'Immunity':[
 ['Innate defence','Physical barriers, phagocytes and inflammatory responses act quickly and non-specifically. They reduce pathogen numbers before specific responses expand.'],
 ['Antigens and lymphocytes','B lymphocytes recognise specific antigens, clonally expand and differentiate into plasma cells that secrete antibodies.'],
 ['Antibody action','Antibodies bind specifically to antigens and can neutralise toxins, block attachment or promote destruction of pathogens.'],
 ['Memory cells','Primary responses create memory cells. Re-exposure produces a faster, larger secondary response, often preventing symptoms.'],
 ['Vaccination','Vaccines generate immune memory without the risk of full disease. Population protection depends on coverage, vaccine effectiveness and transmission characteristics.']
],
'AS Practical Skills':[
 ['Planning','Identify independent, dependent and control variables, choose a sensible range and state how each control will actually be maintained.'],
 ['Observation and recording','Use suitable apparatus, record raw data to consistent precision and include units in table headings. Biological drawings should use clear lines and correct proportions.'],
 ['Processing data','Calculate means, rates, percentages or uncertainty where appropriate. Graph choice should match variable type and the biological relationship being tested.'],
 ['Conclusions','Describe the pattern first, then use data to support an explanation. Avoid claiming a hypothesis is proven by a small or noisy dataset.'],
 ['Evaluation','Identify a specific limitation, explain its effect and propose an improvement that directly reduces the problem.']
]
},
'A Level (12)':{
'Energy and Respiration':[
 ['ATP','ATP couples energy-releasing reactions to energy-requiring processes. Hydrolysis of ATP releases usable energy in small, controllable amounts and phosphorylation can make molecules more reactive.'],
 ['Glycolysis','Glycolysis occurs in the cytoplasm, converting glucose to pyruvate through phosphorylation, lysis, oxidation and ATP formation. A small net ATP yield and reduced NAD are produced.'],
 ['Link reaction and Krebs cycle','Pyruvate enters mitochondria, is decarboxylated and oxidised to acetyl coenzyme A, then enters the Krebs cycle where more reduced coenzymes and a small amount of ATP are generated.'],
 ['Oxidative phosphorylation','Reduced NAD and FAD donate electrons to the inner-membrane electron transport chain. Proton pumping creates an electrochemical gradient that drives ATP synthase by chemiosmosis.'],
 ['Anaerobic pathways','When oxygen is limited, reduced NAD must be reoxidised so glycolysis can continue. Lactate or ethanol pathways regenerate NAD but yield far less ATP than aerobic respiration.']
],
'Photosynthesis':[
 ['Chloroplast organisation','Thylakoid membranes contain pigments, electron carriers and ATP synthase; the stroma contains enzymes for carbon fixation. Compartmentalisation allows linked but distinct stages.'],
 ['Light-dependent reactions','Light excites electrons in chlorophyll. Electron transfer, photolysis and proton pumping generate ATP and reduced NADP, while oxygen is released from water.'],
 ['Calvin cycle','Carbon dioxide combines with RuBP, producing GP that is reduced to TP using ATP and reduced NADP. Most TP regenerates RuBP while some forms carbohydrates and other organic molecules.'],
 ['Limiting factors','Light, carbon dioxide and temperature limit rate in different conditions. Graphs level off when another factor becomes limiting.'],
 ['Adaptation and productivity','Leaf and chloroplast structure support light capture, gas exchange and transport. Agricultural interventions can raise productivity by manipulating limiting factors.']
],
'Homeostasis':[
 ['Principles','Homeostasis maintains internal conditions within limits using receptors, coordination centres and effectors. Negative feedback reverses deviations from a set point.'],
 ['Blood glucose','Insulin promotes glucose uptake and glycogen synthesis when glucose is high; glucagon promotes glycogen breakdown and glucose release when it is low.'],
 ['Kidney function','Ultrafiltration, selective reabsorption and loop-of-Henle mechanisms create conditions for controlled water reabsorption.'],
 ['ADH','Osmoreceptors detect blood water potential. ADH increases collecting-duct permeability, so more water is reabsorbed when the body is dehydrated.'],
 ['Thermoregulation','Skin blood flow, sweating, shivering and metabolic responses alter heat loss or production. Explain mechanisms rather than simply listing responses.']
],
'Control and Coordination':[
 ['Neurones and action potentials','Resting potential depends on ion gradients and membrane permeability. Depolarisation and repolarisation propagate as action potentials when threshold is reached.'],
 ['Synapses','Neurotransmitter release depends on calcium entry. Diffusion across the synaptic cleft and receptor binding open ion channels in the postsynaptic membrane.'],
 ['Muscle contraction','Calcium exposes binding sites on actin, myosin heads form cross-bridges and ATP drives repeated power strokes and detachment.'],
 ['Hormonal control','Endocrine signals travel in blood and act only on cells with appropriate receptors. Signal amplification allows small hormone concentrations to produce large responses.'],
 ['Plant coordination','Auxin and other plant hormones regulate growth, dormancy, fruit development and responses to environmental signals.']
],
'Inherited Change':[
 ['Mutation','Gene mutations change nucleotide sequence while chromosome mutations alter chromosome number or structure. Their effects depend on location and whether protein sequence or gene regulation changes.'],
 ['Meiosis','Meiosis halves chromosome number and creates variation through independent assortment and crossing over. Homologous chromosomes, not sister chromatids, separate in the first division.'],
 ['Genetic crosses','Use alleles, linkage information and expected gamete frequencies to predict offspring. Test crosses can reveal unknown genotypes.'],
 ['Linkage and recombination','Genes on the same chromosome are linked, but crossing over can create recombinant combinations. Recombination frequency estimates relative gene distance.'],
 ['Gene expression and environment','Phenotype results from genotype interacting with environmental conditions. Continuous traits often involve many genes plus environmental influence.']
],
'Selection and Evolution':[
 ['Selection pressure','Environmental conditions cause differential survival and reproductive success among individuals with heritable variation.'],
 ['Allele-frequency change','Natural selection changes allele frequencies across generations; individuals do not evolve during their lifetime.'],
 ['Types of selection','Directional selection shifts a population mean, stabilising selection favours intermediate phenotypes and disruptive selection favours extremes.'],
 ['Speciation','Reduced gene flow allows populations to diverge genetically. Reproductive isolation can eventually produce separate species.'],
 ['Hardy-Weinberg model','The model provides expected allele and genotype frequencies under ideal assumptions. Deviations can indicate selection, migration, mutation, drift or non-random mating.']
],
'Biodiversity, Classification and Conservation':[
 ['Biodiversity','Biodiversity includes genetic, species and ecosystem diversity. Each level contributes differently to resilience and conservation value.'],
 ['Classification','Modern classification combines observable characteristics with molecular evidence to infer evolutionary relationships.'],
 ['Sampling','Quadrats and transects estimate distribution or abundance. Sampling method must match the organism and habitat, and randomisation reduces selection bias.'],
 ['Threats','Habitat destruction, overexploitation, pollution, invasive species and climate change reduce biodiversity through different mechanisms.'],
 ['Conservation','In situ conservation protects species in ecosystems; ex situ methods such as captive breeding and seed banks preserve genetic material outside the habitat.']
],
'Genetic Technology':[
 ['Recombinant DNA','Restriction enzymes cut DNA at specific sequences and ligase joins compatible fragments. Vectors such as plasmids transfer genes into host cells.'],
 ['PCR','PCR amplifies a selected DNA region using primers, thermostable DNA polymerase and repeated temperature cycles for denaturation, annealing and extension.'],
 ['Gel electrophoresis','DNA fragments migrate through a gel according to size because DNA is negatively charged. Band patterns can be compared between samples.'],
 ['Gene expression','Inserted genes require appropriate regulatory sequences for transcription and translation in the host. Marker genes help identify successfully transformed cells.'],
 ['Applications and evaluation','Genetic technology supports medicine, agriculture, forensics and research. Evaluate benefits alongside ecological, ethical, access and reliability considerations.']
],
'A Level Practical Planning and Analysis':[
 ['Experimental design','Define the biological question, select a measurable dependent variable, justify the independent-variable range and control confounding variables.'],
 ['Risk and feasibility','Identify specific hazards and realistic controls. A strong plan is detailed enough to be repeated by another student.'],
 ['Data presentation','Choose tables and graph types that make the tested relationship visible. Include uncertainty or error bars where they genuinely represent measurement variation.'],
 ['Statistical reasoning','Use the statistical test appropriate to the data type and hypothesis. Interpret probability values in context rather than treating a threshold as proof.'],
 ['Evaluation','Distinguish random variation, systematic bias and biological variability, then propose targeted improvements or further work.']
]
}
};

function build(entry,parts){
 const formulas=Array.isArray(entry.formulas)?entry.formulas:[];
 const sections=parts.map(([title,paragraph],index)=>({
  title,
  paragraphs:[paragraph],
  formulas:index===1?formulas:[],
  tip:index===parts.length-1?'Use biological vocabulary precisely and connect structure → mechanism → consequence. Data-response answers should quote or calculate evidence before explaining it.':''
 }));
 sections.push({title:'Common exam mistakes',paragraphs:['Avoid descriptions that stop before explaining why a process occurs. Keep closely related terms distinct and make practical conclusions match the actual data.'],bullets:(entry.mistakes||[]).slice(0,5)});
 return {lead:`${entry.title} is a Cambridge International ${entry.grade} Biology topic. These notes develop the mechanisms and evidence you need for structured questions, data-response work and practical reasoning.`,sections};
}

function apply(){
 const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
 let matched=0,expected=0;
 for(const grade of Object.keys(banks))expected+=Object.keys(banks[grade]).length;
 for(const entry of curriculum){
  if(entry.board!=='Cambridge International AS & A Level'||entry.subject!=='Biology')continue;
  const parts=banks[entry.grade]?.[entry.title];
  if(!parts)continue;
  entry.cambridgeFullNotes=build(entry,parts);
  entry.notesVerified=true;
  matched++;
 }
 window.STUDYAI_CAMBRIDGE_BIOLOGY_FULL_NOTES_STATUS={expected,matched};
 if(typeof window.renderTopicList==='function')window.renderTopicList();
}
if(window.STUDYAI_CURRICULUM)apply();
else window.addEventListener('studyai:curriculum-ready',apply,{once:true});
})();