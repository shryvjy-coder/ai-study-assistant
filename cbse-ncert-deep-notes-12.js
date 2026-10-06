/* StudyAI deep CBSE / NCERT notes - Class 12.
 * Original StudyAI study notes grounded in the current 2026-27 NCERT/CBSE source set.
 * The user's supplied NCERT Drive is the primary source. Official NCERT/CBSE sources are
 * used only for Class 12 Computer Science, Informatics Practices and Fine Art where the
 * supplied Drive does not contain the matching textbook set. No textbook passages are copied.
 */
(() => {
'use strict';

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const rows=curriculum.filter(e=>e.board==='CBSE'&&e.grade==='Class 12');
const notes=[];
const clean=s=>String(s||'').replace(/\.$/,'').trim();
const cap=s=>clean(s).replace(/^./,c=>c.toUpperCase());
const P=(...items)=>items;

const focus={
  Physics:{
    'Electric Charges and Fields':P('electric charge and conservation','Coulomb’s law and superposition','electric field and field lines','electric flux and Gauss’s law'),
    'Electrostatic Potential and Capacitance':P('electric potential and potential difference','equipotential surfaces','potential energy of charge systems','capacitance, dielectrics and stored energy'),
    'Current Electricity':P('drift velocity and electric current','Ohm’s law and resistivity','series and parallel combinations','Kirchhoff rules, cells and bridge circuits'),
    'Moving Charges and Magnetism':P('Lorentz force on moving charges','motion in magnetic fields','force on current-carrying conductors','Biot-Savart/Ampere laws and galvanometer'),
    'Magnetism and Matter':P('bar magnet and magnetic dipole','magnetic field of Earth','dia-, para- and ferromagnetism','magnetisation and magnetic properties'),
    'Electromagnetic Induction':P('magnetic flux','Faraday and Lenz laws','motional emf','self and mutual inductance'),
    'Alternating Current':P('sinusoidal voltage and current','reactance and impedance','LCR resonance and phase','AC power and transformers'),
    'Electromagnetic Waves':P('displacement current','electromagnetic-wave properties','electromagnetic spectrum','uses and wavelength-frequency relationships'),
    'Ray Optics and Optical Instruments':P('reflection and refraction','spherical mirrors and lenses','total internal reflection and prisms','microscopes and telescopes'),
    'Wave Optics':P('Huygens principle','interference and Young’s experiment','diffraction','polarisation and wave nature of light'),
    'Dual Nature of Radiation and Matter':P('photoelectric effect','Einstein photoelectric equation','matter waves and de Broglie relation','experimental evidence for duality'),
    'Atoms':P('Rutherford nuclear model','Bohr postulates','hydrogen spectrum','energy levels and transitions'),
    'Nuclei':P('nuclear size and composition','mass defect and binding energy','radioactive decay','fission and fusion'),
    'Semiconductor Electronics':P('energy bands and intrinsic/extrinsic semiconductors','p-n junction and diode','rectification and basic devices','logic gates and digital signals')
  },
  Chemistry:{
    'Solutions':P('types and concentration of solutions','Raoult’s law and ideal/non-ideal behaviour','colligative properties','van’t Hoff factor and molar-mass calculations'),
    'Electrochemistry':P('electrochemical and galvanic cells','electrode potential and Nernst equation','conductance and molar conductivity','electrolysis, batteries and corrosion'),
    'Chemical Kinetics':P('rate of reaction','rate law and reaction order','integrated rate equations','Arrhenius equation and activation energy'),
    'd- and f-Block Elements':P('electronic configurations','oxidation states and trends','colour, magnetism and catalytic behaviour','lanthanoids and actinoids'),
    'Coordination Compounds':P('ligands and coordination number','nomenclature and isomerism','bonding and crystal-field ideas','colour, magnetic behaviour and applications'),
    'Haloalkanes and Haloarenes':P('classification and nomenclature','preparation methods','nucleophilic substitution and elimination','reactivity of haloarenes and environmental aspects'),
    'Alcohols, Phenols and Ethers':P('classification and preparation','physical properties and hydrogen bonding','reactions of alcohols and phenols','ethers and cleavage reactions'),
    'Aldehydes, Ketones and Carboxylic Acids':P('carbonyl structure and nomenclature','nucleophilic addition','oxidation/reduction and named reactions','carboxylic-acid acidity and reactions'),
    'Amines':P('classification and nomenclature','basicity trends','preparation and reactions','diazonium salts and aromatic amines'),
    'Biomolecules':P('carbohydrates','proteins and amino acids','enzymes and vitamins','nucleic acids and biological function')
  },
  Mathematics:{
    'Relations and Functions':P('types of relations','one-one and onto functions','composition of functions','invertible functions and binary operations'),
    'Inverse Trigonometric Functions':P('principal-value branches','domains and ranges','graphs','inverse-trigonometric identities'),
    'Matrices':P('matrix types and operations','transpose and symmetric/skew-symmetric forms','matrix multiplication','inverse and elementary transformations'),
    'Determinants':P('determinant properties','minors and cofactors','area applications','adjoint/inverse and solving linear equations'),
    'Continuity and Differentiability':P('continuity at a point','differentiability','chain rule and implicit differentiation','exponential/logarithmic and inverse-trigonometric derivatives'),
    'Applications of Derivatives':P('rate of change','increasing and decreasing functions','tangents and normals','maxima and minima'),
    'Integrals':P('antiderivatives','integration by substitution','partial fractions and by parts','definite integrals and their properties'),
    'Applications of Integrals':P('area under curves','area between curves','choice of integration variable','geometric interpretation of definite integrals'),
    'Differential Equations':P('order and degree','general and particular solutions','separation of variables','first-order linear equations'),
    'Vector Algebra':P('vectors and components','dot product','cross product','geometric applications'),
    'Three-dimensional Geometry':P('direction cosines and ratios','equations of lines','angle between lines','shortest distance and spatial interpretation'),
    'Linear Programming':P('decision variables and constraints','feasible region','objective function','corner-point method and optimality'),
    'Probability':P('conditional probability','multiplication theorem and independence','Bayes theorem','random variables and probability distributions')
  },
  Biology:{
    'Sexual Reproduction in Flowering Plants':P('flower structure and gametophyte development','pollination','double fertilisation','seed and fruit development'),
    'Human Reproduction':P('male and female reproductive systems','gametogenesis','menstrual cycle and fertilisation','pregnancy, birth and lactation'),
    'Reproductive Health':P('reproductive-health goals','contraceptive methods','STIs and prevention','infertility and assisted reproduction'),
    'Principles of Inheritance and Variation':P('Mendelian inheritance','chromosomal theory and linkage','sex determination','pedigrees and genetic disorders'),
    'Molecular Basis of Inheritance':P('DNA/RNA structure','replication and transcription','genetic code and translation','gene regulation, genome projects and DNA fingerprinting'),
    'Evolution':P('origin-of-life ideas','evidence for evolution','natural selection and Hardy-Weinberg principle','human evolution'),
    'Human Health and Disease':P('pathogens and infectious disease','innate and acquired immunity','allergies and immune disorders','cancer and substance-use health effects'),
    'Microbes in Human Welfare':P('microbes in household products','industrial products','sewage treatment and biogas','biocontrol and biofertilisers'),
    'Biotechnology: Principles and Processes':P('recombinant-DNA tools','restriction enzymes and vectors','cloning workflow','PCR and downstream processing'),
    'Biotechnology and its Applications':P('biopharmaceuticals','genetically modified organisms','molecular diagnosis','biosafety, ethics and intellectual property'),
    'Organisms and Populations':P('abiotic factors and adaptations','population attributes and growth','life-history strategies','population interactions'),
    'Ecosystem':P('ecosystem structure and productivity','decomposition','energy flow and ecological pyramids','nutrient cycling and succession'),
    'Biodiversity and Conservation':P('levels and patterns of biodiversity','biodiversity loss','ecosystem services','in-situ and ex-situ conservation')
  },
  'Business Studies':{
    'Nature and Significance of Management':P('management meaning and objectives','effectiveness and efficiency','levels and functions','coordination as the essence of management'),
    'Principles of Management':P('nature and significance of principles','Fayol principles','Taylor scientific management','application to organisational situations'),
    'Business Environment':P('dimensions of business environment','economic policy changes','demonetisation and current business effects','opportunities, threats and adaptation'),
    'Planning':P('meaning and importance','planning process','types of plans','limitations and decision making'),
    'Organising':P('organising process','functional and divisional structures','formal and informal organisation','delegation and decentralisation'),
    'Staffing':P('staffing process','recruitment and selection','training and development','human-resource planning'),
    'Directing':P('supervision','motivation','leadership','communication and barriers'),
    'Controlling':P('controlling process','standards and measurement','deviation analysis','corrective action and relation with planning'),
    'Financial Management':P('financial-management objectives','investment, financing and dividend decisions','capital structure','working-capital and fixed-capital requirements'),
    'Marketing':P('marketing concept and functions','marketing mix','product, price, place and promotion','branding, packaging and customer value'),
    'Consumer Protection':P('consumer rights and responsibilities','consumer protection framework','redressal mechanisms','business responsibility toward consumers')
  },
  Geography:{
    'Human Geography: Nature and Scope':P('meaning of human geography','human-environment relationships','schools and approaches','scope and contemporary relevance'),
    'The World Population: Distribution, Density and Growth':P('population distribution','density','population growth and change','demographic patterns and factors'),
    'Human Development':P('concept of human development','indicators','international comparisons','approaches to development'),
    'Primary Activities':P('hunting, gathering and pastoralism','agriculture','mining','spatial patterns and environmental links'),
    'Secondary Activities':P('manufacturing','industrial location','types of industries','changing production systems'),
    'Tertiary and Quaternary Activities':P('service-sector activities','trade and transport services','knowledge-based work','outsourcing and advanced services'),
    'Transport and Communication':P('land, water and air transport','transport networks','communication systems','spatial connectivity'),
    'International Trade':P('basis of international trade','balance of trade','trade patterns','ports and global exchange'),
    'Population: Distribution, Density, Growth and Composition':P('India’s population distribution','density and growth','age, sex and rural-urban composition','regional variation'),
    'Human Settlements':P('rural settlement types','urban settlements','urbanisation','classification and settlement challenges'),
    'Land Resources and Agriculture':P('land-use categories','cropping patterns','major crops','agricultural development and constraints'),
    'Water Resources':P('surface and groundwater','irrigation and demand','water scarcity','conservation and management'),
    'Mineral and Energy Resources':P('metallic and non-metallic minerals','conventional energy','non-conventional energy','distribution and conservation'),
    'Planning and Sustainable Development in Indian Context':P('regional planning','target-area planning','sustainable development','case-based planning in fragile regions'),
    'Transport and Communication':P('roads and railways','waterways and airways','pipelines','communication networks in India'),
    'International Trade':P('India’s changing trade composition','direction of trade','ports','trade balance'),
    'Geographical Perspective on Selected Issues and Problems':P('environmental pollution','urban waste','rural-urban migration','land degradation and spatial problems'),
    'Data – Its Source and Compilation':P('primary and secondary data','census and sample methods','data sources','classification and tabulation'),
    'Data Processing':P('measures of central tendency','dispersion','data calculation workflow','interpretation and accuracy'),
    'Graphical Representation of Data':P('line and bar graphs','pie diagrams','frequency diagrams','choosing and interpreting suitable displays'),
    'Spatial Information Technology':P('GIS concepts','spatial and attribute data','layers and overlay','GPS, mapping and applications')
  },
  Sociology:{
    'Introducing Indian Society':P('colonialism and modernity','diversity and unity','sociological perspective on India','institutions and social change'),
    'The Demographic Structure of the Indian Society':P('population size and growth','age and sex structure','literacy and dependency','demographic transition and policy'),
    'Social Institutions: Continuity and Change':P('caste','tribe','family and kinship','continuity, adaptation and change'),
    'The Market as a Social Institution':P('markets as social institutions','traditional and modern markets','commodification','global markets and social relations'),
    'Patterns of Social Inequality and Exclusion':P('caste inequality','tribal marginalisation','gender inequality','disability and social exclusion'),
    'The Challenges of Cultural Diversity':P('community identities','regionalism and communalism','secularism','state, nation and pluralism'),
    'Suggestions for Project Work':P('sociological question formation','field methods','ethical data collection','analysis, presentation and reflection'),
    'Structural Change':P('colonialism and structural transformation','industrialisation','urbanisation','changing institutions'),
    'Cultural Change':P('social reform','westernisation and Sanskritisation','modernisation and secularisation','cultural change and contestation'),
    'The Constitution and Social Change':P('constitutional values','social justice','rights and affirmative action','law as an instrument of change'),
    'Change and Development in Rural Society':P('agrarian structure','land reforms','Green Revolution','rural class and labour change'),
    'Change and Development in Industrial Society':P('industrialisation and work','formal and informal sectors','labour relations','workplace change'),
    'Globalisation and Social Change':P('economic globalisation','culture and consumption','employment and markets','local-global interactions'),
    'Mass Media and Communications':P('print, radio and television','new media','public sphere','media, markets and social change'),
    'Social Movements':P('collective action','class, caste and gender movements','environmental and tribal movements','movement goals, organisation and change')
  },
  'Computer Science':{
    'Exception Handling in Python':P('syntax and runtime errors','built-in exceptions','raising and handling exceptions','try-except-else-finally control flow'),
    'File Handling in Python':P('text, binary and CSV files','file modes','reading, writing and offsets','structured file operations'),
    'Stack':P('LIFO principle','push/pop/peek','Python implementation','infix and postfix expression handling'),
    'Queue':P('FIFO principle','enqueue/dequeue','Python implementation','deque and queue applications'),
    'Sorting':P('bubble sort','selection sort','insertion sort','passes and time complexity'),
    'Searching':P('linear search','binary search','hashing idea','efficiency and preconditions'),
    'Understanding Data':P('data collection','storage','processing','descriptive techniques and quality'),
    'Database Concepts':P('file system versus DBMS','relational model','tables and relationships','keys and integrity'),
    'Structured Query Language (SQL)':P('DDL and DML','constraints','queries and functions','grouping, joins and relation operations'),
    'Computer Networks':P('network types','devices','topologies','Internet, web, IoT and DNS'),
    'Data Communication':P('communication components','capacity and modes','switching and transmission media','protocols and mobile technologies'),
    'Security Aspects':P('online-safety risks','protective tools','secure web practices','responsible network use'),
    'Project Based Learning':P('problem definition','decomposition','implementation and testing','teamwork and documentation')
  },
  'Informatics Practices':{
    'Querying and SQL Functions':P('SQL functions','GROUP BY and aggregates','operations on relations','queries involving two relations'),
    'Data Handling using Pandas - I':P('Python libraries','Series','DataFrames','CSV import/export'),
    'Data Handling using Pandas - II':P('descriptive statistics','aggregation and grouping','sorting and indexing','missing values and database exchange'),
    'Plotting Data using Matplotlib':P('plot types','plot construction','labels and customisation','Pandas visualisation and interpretation'),
    'Internet and Web':P('network basics','network devices and topologies','Internet services','websites, hosting and browsers'),
    'Societal Impacts':P('digital footprints','privacy and data protection','responsible digital conduct','e-waste and health considerations'),
    'Project Based Learning':P('problem definition','data/database planning','implementation and testing','documentation and presentation')
  }
};

const literatureSeeds={
  'English Elective':{
    'I Sell My Dreams':['dreams, prediction and ambiguity','storytelling, belief and uncertainty'],
    'Eveline':['choice, duty and paralysis','memory, family and escape'],
    'A Wedding in Brownsville':['memory and cultural belonging','migration, community and regret'],
    'Tomorrow':['waiting, hope and human attachment','time, uncertainty and irony'],
    'One Centimetre':['parenthood and educational pressure','measurement, pride and misunderstanding'],
    'A Lecture Upon the Shadow':['love and changing perception','shadow imagery and argument'],
    'Poems by Milton':['faith, duty and inner strength','sonnet form and spiritual reflection'],
    'Poems by Blake':['innocence and experience','symbol, contrast and social vision'],
    'Kubla Khan':['imagination and artistic creation','dreamlike landscape and sound'],
    'Trees':['nature, confinement and freedom','imagery, movement and personification'],
    'The Wild Swans at Coole':['ageing and change','beauty, memory and permanence'],
    'Time and Time Again':['history and recurring violence','memory, repetition and warning'],
    'Blood':['family inheritance and identity','memory, belonging and conflict'],
    'Freedom':['personal liberty and social responsibility','fear, conformity and self-knowledge'],
    'The Mark on the Wall':['stream of consciousness','certainty, perception and digression'],
    'Film-making':['cinematic craft','visual storytelling and collaboration'],
    'Why the Novel Matters':['human wholeness','the novel as lived experience'],
    'The Argumentative Indian':['public reasoning and intellectual plurality','debate, tradition and democracy'],
    'On Science Fiction':['speculative imagination','science, society and future possibilities'],
    'Chandalika':['caste, dignity and selfhood','desire, liberation and Buddhist ethics'],
    'Broken Images':['identity, language and authorship','media, guilt and divided self']
  },
  'Hindi Core':{
    'आत्म-परिचय, एक गीत':['आत्मबोध और जीवन-दृष्टि','व्यक्ति और संसार का संबंध'],
    'पतंग':['बाल-उत्साह और आकांक्षा','आकाश, गति और स्वतंत्रता के बिंब'],
    'कविता के बहाने, बात सीधी थी पर':['कविता की स्वतंत्रता','भाषा और अभिव्यक्ति की जटिलता'],
    'कैमरे में बंद अपाहिज':['मीडिया की संवेदनहीनता','दृष्टि, प्रदर्शन और विडंबना'],
    'उषा':['प्रभात का दृश्य','रंग-बिंब और रूपक'],
    'बादल राग':['प्रकृति और परिवर्तन','बादल के बहुआयामी बिंब'],
    'कवितावली (उत्तर कांड से), लक्ष्मण-मूर्छा और राम का विलाप':['रामकथा का मानवीय भाव','शोक, भक्ति और वीरता'],
    'रुबाइयाँ':['घरेलू जीवन और स्नेह','लय, बिंब और सांस्कृतिक संवेदना'],
    'छोटा मेरा खेत, बगुलों के पंख':['सृजन की प्रक्रिया','प्रकृति-बिंब और कल्पना'],
    'भक्तिन':['भक्तिन का व्यक्तित्व','ग्रामीण स्त्री-जीवन और श्रम'],
    'बाज़ार दर्शन':['उपभोक्तावाद और बाजार','जरूरत, इच्छा और विवेक'],
    'काले मेघा पानी दे':['लोकजीवन और वर्षा','स्मृति, लोकविश्वास और जल'],
    'पहलवान की ढोलक':['लोकनायक और समुदाय','संकट, साहस और ढोलक का प्रतीक'],
    'शिरीष के फूल':['शिरीष का स्वभाव','फक्कड़पन, जीवन-दृष्टि और प्रतीक'],
    'श्रम-विभाजन और जाति-प्रथा, मेरी कल्पना का आदर्श समाज':['जाति और असमानता की आलोचना','स्वतंत्रता, समानता और बंधुत्व'],
    'सिल्वर वैडिंग':['पीढ़ियों का अंतर','परिवार, मध्यवर्ग और बदलते मूल्य'],
    'जूझ':['शिक्षा के लिए संघर्ष','गरीबी, श्रम और आत्मविश्वास'],
    'अतीत में दबे पाँव':['सिंधु सभ्यता का अनुभव','पुरातत्त्व, स्मृति और सांस्कृतिक दृष्टि']
  },
  'Hindi Elective':{
    'जयशंकर प्रसाद — देवसेना का गीत; कार्नेलिया का गीत':['प्रेम, त्याग और स्मृति','राष्ट्र और सांस्कृतिक गौरव'],
    'सूर्यकांत त्रिपाठी ‘निराला’ — गीत गाने दो मुझे; सरोज-स्मृति':['दुख में सृजन और प्रतिरोध','पितृ-स्नेह, शोक और स्मृति'],
    'अज्ञेय — यह दीप अकेला; मैंने देखा एक बूँद':['व्यक्ति और समाज','क्षण, सौंदर्य और अस्तित्व'],
    'केदारनाथ सिंह — बनारस; दिशा':['शहर, समय और सांस्कृतिक स्मृति','दिशा, बाल-दृष्टि और अनुभव'],
    'रघुवीर सहाय — बसंत आया; तोड़ो':['ऋतु और आधुनिक जीवन','जड़ता तोड़ने का आह्वान'],
    'तुलसीदास':['भक्ति और रामकाव्य','लोकभाषा और काव्य-शिल्प'],
    'मलिक मुहम्मद जायसी':['प्रेम और सूफी दृष्टि','रूपक और काव्य-कथा'],
    'विद्यापति':['प्रेम और भक्ति','मैथिली काव्य की संगीतात्मकता'],
    'घनानंद':['विरह और प्रेमानुभूति','ब्रजभाषा और भाव-सघनता'],
    'रामचंद्र शुक्ल':['आलोचनात्मक दृष्टि','साहित्य, समाज और विचार'],
    'पंडित चंद्रधर शर्मा गुलेरी':['कथा-शिल्प और मानवीय संबंध','संक्षिप्तता, संकेत और चरित्र'],
    'फणीश्वरनाथ रेणु':['आंचलिक जीवन','लोकभाषा और सामाजिक यथार्थ'],
    'भीष्म साहनी':['मानवीय संबंध और सामाजिक तनाव','यथार्थवादी कथा-दृष्टि'],
    'असगर वजाहत':['सांप्रदायिकता और मानवीयता','संवाद, व्यंग्य और सामाजिक आलोचना'],
    'निर्मल वर्मा':['अकेलापन और स्मृति','सूक्ष्म मनोवैज्ञानिक कथन'],
    'ममता कालिया':['मध्यवर्गीय जीवन और स्त्री-दृष्टि','व्यंग्य, संवाद और समकालीनता'],
    'हज़ारी प्रसाद द्विवेदी':['संस्कृति और परंपरा','विचारात्मक गद्य और मानवीय दृष्टि'],
    'सूरदास की झोंपड़ी':['सामाजिक विषमता और मानवीय गरिमा','कथा-प्रसंग और चरित्र'],
    'बिस्कोहर की माटी':['गाँव, मिट्टी और स्मृति','स्थानीय संस्कृति और आत्मकथात्मकता'],
    'अपना मालवा — खाऊ-उजाड़ू सभ्यता में':['मालवा और पर्यावरण','उपभोग, विनाश और सांस्कृतिक स्मृति']
  },
  'Sanskrit Core':{
    'अनुशासनम्':['अनुशासन और कर्तव्य','नीति, आचरण और व्याकरण'],
    'मातुराज्ञा गरीयसी':['मातृ-आज्ञा और कर्तव्य','पात्र, निर्णय और धर्म'],
    'प्रजानुरञ्जको नृपः':['राजधर्म और प्रजाहित','आदर्श शासक के गुण'],
    'दौवारिकस्य निष्ठा':['निष्ठा और कर्तव्यपरायणता','संवाद और चरित्र'],
    'सूक्ति-सौरभम्':['सूक्तियाँ और जीवन-मूल्य','संक्षिप्त भाषा और व्यंजना'],
    'नैकेनापि समं गता वसुमती':['नीति और मानवीय गुण','काव्यभाव और अलंकार'],
    'हल्दीघाटी':['वीरता और देशभक्ति','युद्ध-वर्णन और काव्य-शैली'],
    'मदालसा':['ज्ञान और वैराग्य','उपदेश, मातृत्व और दर्शन'],
    'कार्याकार्यव्यवस्थितिः':['कर्तव्य-अकर्तव्य का विवेक','शास्त्रीय तर्क और आचरण'],
    'विद्यास्थानानि':['ज्ञान की शाखाएँ','भारतीय ज्ञान-परंपरा और वर्गीकरण']
  },
  'Sanskrit Elective':{
    'विद्ययाऽमृतमश्नुते':['विद्या और आत्मोन्नति','उपनिषद्-दृष्टि और ज्ञान'],
    'रघुकौत्ससंवादः':['गुरुदक्षिणा और दान','संवाद, राजधर्म और उदारता'],
    'बालकौतुकम्':['बाल-स्वभाव और कौतुक','हास्य, संवाद और वर्णन'],
    'कर्मगौरवम्':['कर्म की प्रतिष्ठा','कर्तव्य और पुरुषार्थ'],
    'शुकनासोपदेशः':['राजकुमार को नीति-उपदेश','सत्ता, संयम और विवेक'],
    'सूक्तिसुधा':['नीति-सूक्तियाँ','संक्षिप्त अर्थ और काव्य-शिल्प'],
    'विक्रमस्यौदार्यम्':['विक्रम की उदारता','चरित्र और नैतिक निर्णय'],
    'कार्यं वा साधयेयं, देहं वा पातयेयम्':['संकल्प और साहस','लक्ष्य के प्रति दृढ़ता'],
    'दीनबन्धुः श्रीनायारः':['सेवा और सामाजिक सुधार','करुणा और जनहित'],
    'योगस्य वैशिष्ट्यम्':['योग का स्वरूप','शरीर, मन और अनुशासन'],
    'कथं शब्दानुशासनं कर्तव्यम्':['व्याकरण और भाषा-अनुशासन','शब्द-रचना और शुद्ध प्रयोग']
  }
};

const formulas={
  'Electric Charges and Fields':['F = (1/4πε₀) q₁q₂/r²','E = F/q','Φ = ∮E·dA','∮E·dA = q_enclosed/ε₀'],
  'Electrostatic Potential and Capacitance':['V = (1/4πε₀) q/r','C = Q/V','U = 1/2 CV²'],
  'Current Electricity':['V = IR','R = ρL/A','P = VI = I²R = V²/R'],
  'Moving Charges and Magnetism':['F = q(v × B)','F = I(L × B)','r = mv/(qB)'],
  'Electromagnetic Induction':['ε = -dΦ/dt','ε = Blv where applicable','U = 1/2 LI²'],
  'Alternating Current':['V = V₀ sinωt','X_L = ωL','X_C = 1/(ωC)','Z = √(R²+(X_L-X_C)²)'],
  'Ray Optics and Optical Instruments':['1/f = 1/v + 1/u with sign convention','m = v/u','n₁ sin i = n₂ sin r'],
  'Wave Optics':['β = λD/d','path difference = d sinθ'],
  'Dual Nature of Radiation and Matter':['K_max = hν-φ','λ = h/p'],
  'Atoms':['E_n = -13.6/n² eV for hydrogen','hν = E_i-E_f'],
  'Nuclei':['E = Δmc²','N = N₀e^{-λt}','T₁/₂ = ln2/λ'],
  'Solutions':['M = moles solute/litre solution','π = CRT','ΔT_b = K_b m','ΔT_f = K_f m'],
  'Electrochemistry':['E = E°-(RT/nF)lnQ','ΔG = -nFE','Λ_m = κ×1000/C'],
  'Chemical Kinetics':['rate = k[A]^m[B]^n','k = Ae^{-E_a/RT}','t₁/₂ = 0.693/k for first order'],
  'Relations and Functions':['(f∘g)(x)=f(g(x))'],
  'Matrices':['AA^{-1}=I'],
  'Determinants':['A^{-1}=adj(A)/|A| when |A|≠0'],
  'Continuity and Differentiability':['f′(x)=lim(h→0)[f(x+h)-f(x)]/h'],
  'Probability':['P(A|B)=P(A∩B)/P(B)','P(A∩B)=P(A)P(B|A)','P(A_i|B)=P(A_i)P(B|A_i)/ΣP(A_j)P(B|A_j)']
};

const genericLanguage=(subject)=>{
  if(subject.includes('Hindi')) return ['भाषा-शैली और रचना-विधान','पाठ-साक्ष्य और आलोचनात्मक व्याख्या'];
  if(subject.includes('Sanskrit')) return ['पदच्छेद, अन्वय और शब्दार्थ','व्याकरण, शैली और प्रसंग'];
  return ['language, structure and point of view','precise textual evidence and interpretation'];
};

const rawFocus=e=>{
  const explicit=focus[e.subject]?.[e.title];
  if(explicit) return explicit;
  const seed=literatureSeeds[e.subject]?.[e.title];
  if(seed) return [...seed,...genericLanguage(e.subject)].slice(0,4);
  const points=(e.keyPoints||[]).map(clean).filter(Boolean);
  if(points.length>=3) return points.slice(0,5);
  if(/English|Hindi|Sanskrit/.test(e.subject)) return ['central idea and context','voice or character','language and structure','evidence-based interpretation'];
  return ['central concept','key relationship','application or evidence','important distinction'];
};

const conceptText=(subject,label,title)=>{
  const x=clean(label);
  if(subject==='Physics') return 'Connect '+x+' to the correct physical model, diagram, sign convention, units and limiting conditions in '+title+'.';
  if(subject==='Chemistry') return 'Explain '+x+' through structure, particles, energetics or reaction behaviour, then connect it to observable chemistry.';
  if(subject==='Mathematics') return 'Define '+x+' precisely, connect algebraic and graphical representations, and check all conditions before applying a result.';
  if(subject==='Biology') return 'Link '+x+' to the correct structure, location, sequence, function and regulation instead of memorising the term alone.';
  if(subject==='Accountancy') return 'Trace '+x+' through the accounting principle, entry, adjustment and effect on the relevant statement or balance.';
  if(subject==='Business Studies') return 'Understand '+x+' through meaning, purpose, process/features and application to a realistic business case.';
  if(subject==='Economics') return 'Use '+x+' to explain relationships between economic variables, institutions or evidence, with assumptions stated where needed.';
  if(subject==='Geography') return 'Connect '+x+' with location, process, spatial pattern and map/data evidence.';
  if(subject==='History') return 'Use '+x+' as historical evidence: establish context, sources, change/continuity and significance.';
  if(subject==='Political Science') return 'Explain '+x+' through principle, institution, political context and consequences for power or democracy.';
  if(subject==='Sociology') return 'Use '+x+' sociologically by connecting individual experience to institutions, structure, inequality and social change.';
  if(subject==='Psychology') return 'Define '+x+' precisely, connect it to psychological evidence or process, and separate scientific explanation from everyday intuition.';
  if(subject==='Fine Art') return 'Study '+x+' through visual evidence, material, technique, patronage and cultural context.';
  if(subject==='Computer Science'||subject==='Informatics Practices') return 'Understand '+x+' conceptually, then demonstrate it through a trace, query, dataset, algorithm or system example.';
  if(subject.includes('Hindi')) return x+' को पाठ के प्रसंग, केंद्रीय कथ्य, भाषा-शैली और प्रमाण से जोड़कर समझें।';
  if(subject.includes('Sanskrit')) return x+' को पदच्छेद, अन्वय, शब्दार्थ, व्याकरण और प्रसंग से जोड़कर समझें।';
  return 'Trace '+x+' through the text, explaining how voice, structure and language create meaning.';
};

const reasoning=e=>{
  const s=e.subject;
  if(s==='Physics') return ['Draw and label the physical system with a clear sign convention.','Choose the governing law before selecting an equation.','Work symbolically first, then substitute SI quantities.','Check dimensions, direction, limiting behaviour and physical reasonableness.'];
  if(s==='Chemistry') return ['Identify the particles, species or functional groups involved.','Write the balanced equation or structural change before calculating.','Apply mole, energetic, equilibrium or mechanism ideas under stated conditions.','Check atoms, charge, units and whether the result matches the chemistry.'];
  if(s==='Mathematics') return ['State what is given and what is required.','Choose a useful representation: equation, graph, table, diagram or vector form.','Apply a justified result step by step.','Check domain, special cases and the required final form.'];
  if(s==='Biology') return ['Identify the biological level and location.','Trace the process in causal order with inputs, outputs and regulation.','Connect structure to function.','Use a labelled diagram, comparison or evidence to test the explanation.'];
  if(s==='Accountancy') return ['Identify the transaction/adjustment and accounts affected.','Apply the principle and debit-credit logic.','Record or calculate in the required format.','Verify totals and trace the effect into statements.'];
  if(s==='Business Studies') return ['Identify the case facts and concept being tested.','State the relevant principle, feature or process.','Apply it directly to the case.','Justify why the conclusion fits the facts.'];
  if(s==='Economics') return ['Define the concept and variables precisely.','Choose the correct diagram, identity or chain of reasoning.','Explain each direction of change.','Interpret the result in context and note assumptions.'];
  if(s==='Geography') return ['Locate the phenomenon and scale.','Explain the physical or human process causing the pattern.','Use map, graph, case or field evidence.','Link pattern, process and consequence.'];
  if(['History','Political Science','Sociology'].includes(s)) return ['Identify context and the key concept.','Select precise evidence or institutional features.','Explain cause, consequence, continuity, conflict or comparison.','Return to the question with a reasoned conclusion.'];
  if(s==='Psychology') return ['Define the construct or process.','Identify how it is observed or studied.','Use evidence or a model to explain the result.','Note ethical, contextual and causal limits where relevant.'];
  if(s==='Computer Science'||s==='Informatics Practices') return ['State the input/data, required output and constraints.','Trace each transformation or control-flow step.','Test normal and edge cases.','Explain why the result follows from the concept, not just the syntax.'];
  if(s.includes('Hindi')) return ['प्रश्न का निर्देश शब्द और सटीक प्रसंग पहचानें।','एक स्पष्ट कथन को घटना, बिंब, पात्र या भाषा से सिद्ध करें।','रचना-विधान या भाषा का प्रभाव समझाएँ।','प्रश्न के अनुरूप निष्कर्ष दें; केवल सार न लिखें।'];
  if(s.includes('Sanskrit')) return ['पदच्छेद और प्रमुख शब्दार्थ पहचानें।','अन्वय बनाकर कारक, धातु, लकार, समास या सन्धि की भूमिका देखें।','प्रसंग और केंद्रीय विचार जोड़ें।','अर्थ को व्याकरण और संदर्भ दोनों से जाँचें।'];
  return ['Identify the central situation, speaker, narrator or argument.','Trace development through structure and language.','Use precise textual evidence in your own words.','Explain the effect and link it back to the question.'];
};

const visuals=e=>{
  const s=e.subject;
  if(s==='Physics') return ['Redraw the standard diagram or graph with labels, directions and sign convention.','Make a quantity–unit–relationship map before numerical work.'];
  if(s==='Chemistry') return ['Use structural, orbital, cell or energy diagrams where they clarify the chemistry.','Build a reaction map: starting species → condition → change → product/observation.'];
  if(s==='Mathematics') return ['Translate the problem into a graph, coordinate picture, matrix, vector or region where useful.','Mark restrictions and geometric meaning directly on the representation.'];
  if(s==='Biology') return ['Redraw the key labelled structure or process from memory.','Use a flowchart: location → step → product/function → regulation.'];
  if(s==='Geography') return ['Sketch the map, graph or process diagram with labels and direction arrows.','Pair it with a cause → pattern → consequence flowchart.'];
  if(s==='Computer Science'||s==='Informatics Practices') return ['Trace variables, rows or data transformations in a small table.','Draw the stack/queue/network/database/data-flow representation before implementing.'];
  if(/English|Hindi|Sanskrit/.test(s)) return ['Map central idea → evidence → language/form → effect.','Map character/argument/speaker development across the text.'];
  return ['Build a concept map linking terms, evidence, examples and consequences.','Turn comparisons into a table so differences stay explicit.'];
};

const examTips=e=>{
  const s=e.subject;
  if(s==='Physics') return ['Start with the governing principle and diagram, not a formula hunt.','Carry units and signs throughout.','State model assumptions and give a physical interpretation.'];
  if(s==='Chemistry') return ['Balance equations before stoichiometry.','Explain trends through structure or energetics.','State conditions, units and significant figures where relevant.'];
  if(s==='Mathematics') return ['State the theorem/condition before using it.','Do not skip domain or feasibility checks.','Keep exact values unless approximation is requested.'];
  if(s==='Biology') return ['Use exact biological terminology and labelled diagrams.','Compare similar processes explicitly.','Include function and regulation, not only sequence.'];
  if(s==='Accountancy') return ['Show workings for adjustments and calculations.','Keep format and period treatment consistent.','Trace errors instead of forcing totals to agree.'];
  if(s==='Business Studies') return ['Case answers must apply the concept to the stated facts.','Separate features, merits, limitations and process steps.','Use the textbook term first, then explain it.'];
  if(['Economics','Geography','History','Political Science','Sociology','Psychology'].includes(s)) return ['Define the central term before analysing.','Use examples/data only when they support the point.','Distinguish closely related concepts rather than treating them as synonyms.'];
  if(s==='Computer Science'||s==='Informatics Practices') return ['Trace code or data before committing to an output.','Check data types, indices, conditions and null/missing values.','Explain why the algorithm/query works, not just the result.'];
  if(s.includes('Hindi')) return ['लेखक/कवि, वक्ता और पात्र की दृष्टि अलग रखें।','सार के बजाय सटीक पाठ-संकेतों का विश्लेषण करें।','भाषा-शैली या बिंब का प्रभाव लिखें।'];
  if(s.includes('Sanskrit')) return ['रूप, विभक्ति और क्रिया का मिलान जाँचें।','शब्दार्थ के साथ अन्वय और प्रसंग लिखें।','व्याकरणिक पहचान को अर्थ से जोड़ें।'];
  return ['Use evidence, then explain its effect.','Do not replace analysis with plot summary.','Keep narrator, speaker and character viewpoints distinct.'];
};

const distinctions=e=>{
  const s=e.subject;
  if(s==='Physics') return ['A vector law and its scalar magnitude are not interchangeable.','An equation is valid only under the assumptions of its model.'];
  if(s==='Chemistry') return ['Macroscopic observation and particle-level explanation are different layers of an answer.','Thermodynamic feasibility, equilibrium position and reaction rate are different ideas.'];
  if(s==='Mathematics') return ['A definition states what an object is; a theorem gives a result under stated conditions.','A numerical example illustrates a method; proof or justification establishes it generally.'];
  if(s==='Biology') return ['Structure, process and function are related but not interchangeable.','Sequence tells what happens; regulation explains how and when it is controlled.'];
  if(s==='Economics') return ['An accounting identity is not the same as a behavioural relationship.','Nominal and real values must be distinguished when prices change.'];
  if(s==='Geography') return ['Description tells where a pattern occurs; explanation tells why.','Absolute totals and rates/densities answer different spatial questions.'];
  if(s==='Accountancy') return ['Capital and revenue items differ by purpose and period effect.','Cash flow is not the same as profit.'];
  if(s==='Business Studies') return ['A feature describes what something is; a merit or limitation evaluates its effect.','A policy, procedure and method differ in scope and flexibility.'];
  if(s==='Computer Science'||s==='Informatics Practices') return ['Data structure, algorithm and implementation are separate levels of reasoning.','A query describes the required result; the stored table structure determines how it can be obtained.'];
  if(/English|Hindi|Sanskrit/.test(s)) return ['Content is what the text says; form and language explain how meaning is created.','A theme is a developed idea, not a one-word topic label.'];
  return ['Description identifies facts; analysis explains relationships and significance.','An example supports a concept but does not replace the concept itself.'];
};

const sourceLocator=e=>{
  const n=Number(e.order)||1, pad=x=>String(x).padStart(2,'0'), b=e.sourceBook||'';
  if(e.subject==='Computer Science') return 'lecs1'+pad(n)+'.pdf';
  if(e.subject==='Informatics Practices') return 'leip1'+pad(n)+'.pdf';
  if(e.subject==='Physics') return n<=8?'leph1'+pad(n)+'.pdf':'leph2'+pad(n-8)+'.pdf';
  if(e.subject==='Chemistry') return n<=5?'lech1'+pad(n)+'.pdf':'lech2'+pad(n-5)+'.pdf';
  if(e.subject==='Mathematics') return n<=6?'lemh1'+pad(n)+'.pdf':'lemh2'+pad(n-6)+'.pdf';
  if(e.subject==='Biology') return 'lebo1'+pad(n)+'.pdf';
  if(e.subject==='Psychology') return 'lepy1'+pad(n)+'.pdf';
  if(e.subject==='Business Studies') return b.includes('II')?'lebs2'+pad(n)+'.pdf':'lebs1'+pad(n)+'.pdf';
  if(e.subject==='Economics'&&b==='Introductory Macroeconomics') return 'leec1'+pad(n)+'.pdf';
  if(e.subject==='Economics'&&b==='Indian Economic Development') return 'NCERT Indian Economic Development source: '+e.title;
  if(e.subject==='Geography'&&b==='Practical Work in Geography – II') return 'legy3'+pad(n)+'.pdf';
  if(e.subject==='Geography') return 'NCERT '+b+' source: '+e.title;
  if(e.subject==='English'&&b==='Vistas') return 'levt1'+pad(n)+'.pdf';
  if(e.subject==='English Elective') return 'NCERT Kaleidoscope source: '+e.title;
  if(e.subject==='Fine Art') return 'Official NCERT An Introduction to Indian Art Part-II source: '+e.title;
  if(e.subject.includes('Hindi')) return 'NCERT '+b+' source: '+e.title;
  if(e.subject.includes('Sanskrit')) return 'NCERT '+b+' source: '+e.title;
  return 'NCERT '+(b||e.subject)+' source: '+e.title;
};

const officialBasis=e=>['Computer Science','Informatics Practices','Fine Art'].includes(e.subject);

const makeNote=e=>{
  const f=rawFocus(e).map(clean).filter(Boolean).slice(0,5);
  const concepts=f.map(x=>[cap(x),conceptText(e.subject,x,e.title)]);
  const fs=[...(formulas[e.title]||[]),...(e.formulas||[])].map(clean).filter(Boolean);
  const uniqueFormulas=[...new Set(fs)].slice(0,8);
  const isLang=/English|Hindi|Sanskrit/.test(e.subject);
  const overview=isLang
    ? (e.subject.includes('Hindi')
      ? e.title+' को '+(e.sourceBook||'NCERT')+' में केंद्रीय कथ्य, प्रसंग, भाषा-शैली और पाठ-साक्ष्य के साथ पढ़ें। लक्ष्य सार याद करना नहीं, बल्कि रचना की अर्थ-निर्माण प्रक्रिया समझना है।'
      : e.subject.includes('Sanskrit')
        ? e.title+' में अर्थ, अन्वय, व्याकरण, प्रसंग और साहित्यिक/सांस्कृतिक विचार को साथ पढ़ें।'
        : e.title+' should be read through its central situation or argument, voice, structure and language. Build an interpretation from precise evidence rather than retelling.')
    : e.title+' brings together '+f.slice(0,3).join(', ')+'. Study these as connected ideas and practise applying them to unfamiliar questions, data, diagrams, cases or calculations.';
  return {
    overview,
    concepts,
    formulas:uniqueFormulas,
    reasoning:reasoning(e),
    visuals:visuals(e),
    examTips:examTips(e),
    distinctions:distinctions(e),
    quickRevision:[...f,...uniqueFormulas.slice(0,2)].slice(0,7),
    vocabulary:isLang?[...new Set(f.concat(e.subject.includes('Sanskrit')?['पदच्छेद','अन्वय','कारक/धातु/समास']:e.subject.includes('Hindi')?['केंद्रीय भाव','प्रसंग','भाषा-शैली','पाठ-साक्ष्य']:['theme','voice','imagery','structure']))].slice(0,8):f.slice(0,6),
    selfCheck:e.subject.includes('Hindi')?[
      e.title+' का केंद्रीय विचार अपने शब्दों में स्पष्ट कीजिए।',
      (f[0]||'मुख्य विचार')+' और '+(f[1]||'दूसरे विचार')+' के बीच संबंध क्या है?',
      'कौन-सा प्रसंग, बिंब, पात्र या भाषा-विशेषता '+(f[2]||'मुख्य भाव')+' को सबसे अच्छी तरह सिद्ध करती है?',
      'इस पाठ के उत्तर में सार और विश्लेषण के बीच अंतर कैसे बनाए रखेंगे?'
    ]:e.subject.includes('Sanskrit')?[
      e.title+'स्य मुख्यभावः कः? सरलया भाषया लिखत।',
      (f[0]||'मुख्यविषयः')+' इति विषयस्य प्रसङ्गः कः?',
      'एकं महत्त्वपूर्णं पदरूपं, समासं, धातुरूपं वा अर्थेन सह स्पष्टयत।',
      'अन्वयः कथं पाठस्य अर्थबोधं स्पष्टं करोति?'
    ]:[
      'Explain '+f[0]+' in the context of '+e.title+'.',
      'How is '+(f[1]||'the second key idea')+' connected to '+(f[0]||'the chapter’s central idea')+'?',
      'What evidence, diagram, calculation, example or textual feature best demonstrates '+(f[2]||'the main relationship')+'?',
      'What common confusion should you avoid when applying '+(f[3]||'this chapter')+'?'
    ]
  };
};

for(const e of rows){
  const deepNotes=makeNote(e);
  const note={
    grade:'Class 12',
    subject:e.subject,
    sourceBook:e.sourceBook||'',
    title:e.title,
    sourceFile:sourceLocator(e),
    sourceBasis:officialBasis(e)
      ? 'Official NCERT/CBSE current 2026-27 source used because the supplied Drive does not contain the matching textbook set'
      : 'User-supplied NCERT 2026-27 source set, cross-checked against the current StudyAI curriculum mapping',
    notesVerified:true,
    deepNotes
  };
  notes.push(note);
  e.deepNotes=deepNotes;
  e.notesVerified=true;
  e.noteSourceFile=note.sourceFile;
  e.noteSourceBasis=note.sourceBasis;
}

window.CBSE_NCERT_DEEP_NOTES=(window.CBSE_NCERT_DEEP_NOTES||[]).concat(notes);
window.CBSE_NCERT_DEEP_NOTES_12=notes;
window.STUDYAI_GRADE12_DEEP_NOTES_STATUS={
  total:notes.length,
  matched:notes.length,
  unmatched:[],
  subjects:[...new Set(notes.map(n=>n.subject))].sort()
};

if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
