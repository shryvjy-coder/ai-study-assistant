/* StudyAI deep CBSE / NCERT notes - Class 11.
 * Original StudyAI study notes grounded in the current Class 11 NCERT/CBSE source set.
 * Most books are mapped to the user's supplied 2026-27 NCERT PDFs. Where the supplied
 * Drive does not contain the prescribed source, the official NCERT/CBSE 2026-27 source
 * is used instead. No textbook passages are reproduced.
 */
(() => {
'use strict';

const curriculum=Array.isArray(window.STUDYAI_CURRICULUM)?window.STUDYAI_CURRICULUM:[];
const rows=curriculum.filter(e=>e.board==='CBSE'&&e.grade==='Class 11');
const notes=[];

const split=s=>String(s||'').split('|').map(x=>x.trim()).filter(Boolean);
const clean=s=>String(s||'').replace(/\.$/,'').trim();
const cap=s=>clean(s).replace(/^./,c=>c.toUpperCase());
const P=(...items)=>items;

const focus={
  Physics:{
    'Units and Measurements':P('SI units and derived quantities','dimensions and dimensional analysis','significant figures, errors and uncertainty','measurement precision and scientific notation'),
    'Motion in a Straight Line':P('position, path length and displacement','average and instantaneous velocity','acceleration and kinematic graphs','equations for uniformly accelerated motion'),
    'Motion in a Plane':P('vector addition and components','relative motion in two dimensions','projectile motion','uniform circular motion'),
    'Laws of Motion':P('inertia and Newton’s laws','momentum and impulse','free-body diagrams and force balance','friction and circular-motion applications'),
    'Work, Energy and Power':P('work by constant and variable forces','kinetic energy and work-energy theorem','potential energy and conservation of mechanical energy','power and collisions'),
    'System of Particles and Rotational Motion':P('centre of mass and linear momentum','torque and angular momentum','moment of inertia and rotational dynamics','equilibrium and rolling motion'),
    'Gravitation':P('universal law of gravitation','acceleration due to gravity and its variation','gravitational potential and potential energy','satellites, orbital speed and escape speed'),
    'Mechanical Properties of Solids':P('stress and strain','Hooke’s law and elastic limit','Young, bulk and shear moduli','elastic energy and stress-strain curves'),
    'Mechanical Properties of Fluids':P('pressure and Pascal’s law','continuity and Bernoulli principle','viscosity and terminal speed','surface tension and capillarity'),
    'Thermal Properties of Matter':P('temperature and heat','thermal expansion','specific heat and calorimetry','conduction, convection and radiation'),
    'Thermodynamics':P('system, state variables and processes','heat, work and internal energy','first law of thermodynamics','second law, heat engines and reversibility'),
    'Kinetic Theory':P('molecular model of an ideal gas','pressure from molecular motion','temperature and average kinetic energy','degrees of freedom and equipartition'),
    'Oscillations':P('periodic motion and simple harmonic motion','SHM displacement, velocity and acceleration','energy in SHM','simple pendulum and force law'),
    'Waves':P('progressive-wave description','wave speed and phase','superposition and standing waves','beats and sound-wave applications')
  },
  Chemistry:{
    'Some Basic Concepts of Chemistry':P('laws of chemical combination','mole concept and molar mass','stoichiometry and limiting reagent','concentration terms and quantitative calculations'),
    'Structure of Atom':P('electromagnetic radiation and spectra','Bohr model and hydrogen spectrum','quantum numbers and orbitals','electronic configuration and stability'),
    'Classification of Elements and Periodicity':P('modern periodic law','effective nuclear charge and atomic size','ionisation enthalpy and electron gain enthalpy','electronegativity and periodic trends'),
    'Chemical Bonding and Molecular Structure':P('Lewis structures and formal charge','VSEPR shapes and hybridisation','valence-bond and molecular-orbital ideas','bond polarity and hydrogen bonding'),
    'Chemical Thermodynamics':P('system, surroundings and state functions','internal energy, heat and work','enthalpy changes and Hess’s law','entropy, Gibbs energy and spontaneity'),
    'Equilibrium':P('dynamic chemical equilibrium','equilibrium constants and reaction quotient','Le Chatelier principle','ionic equilibrium, pH and solubility'),
    'Redox Reactions':P('oxidation and reduction','oxidation number rules','balancing redox equations','disproportionation and redox applications'),
    'Organic Chemistry: Basic Principles and Techniques':P('classification and nomenclature','structural and stereoisomerism basics','electronic effects and reaction intermediates','purification and qualitative analysis'),
    'Hydrocarbons':P('alkanes and conformations','alkenes and alkynes','aromatic hydrocarbons and benzene','major preparation methods and reaction patterns')
  },
  Mathematics:{
    'Sets':P('set notation and representations','subsets and power sets','union, intersection and difference','complements and Venn-diagram reasoning'),
    'Relations and Functions':P('Cartesian products and relations','domain, codomain and range','functions and real-valued functions','graphs and algebra of functions'),
    'Trigonometric Functions':P('radian measure and unit circle','signs and standard-angle values','trigonometric identities','graphs, periodicity and transformations'),
    'Complex Numbers and Quadratic Equations':P('imaginary unit and complex plane','algebra of complex numbers','quadratic roots and discriminant','polar/geometric interpretation where relevant'),
    'Linear Inequalities':P('inequality properties','solution on a number line','systems of linear inequalities','graphical solution in two variables'),
    'Permutations and Combinations':P('fundamental counting principle','permutations with and without repetition','combinations','choosing order-sensitive versus order-insensitive models'),
    'Binomial Theorem':P('binomial expansion','general and middle terms','binomial coefficients','coefficient and term-selection problems'),
    'Sequences and Series':P('arithmetic progressions','geometric progressions','means and special series','finite sums and pattern reasoning'),
    'Straight Lines':P('slope and angle of inclination','forms of a line equation','angle between lines','distance of a point from a line'),
    'Conic Sections':P('circle, parabola, ellipse and hyperbola','focus-directrix ideas','standard equations','geometric parameters and sketches'),
    'Introduction to Three-dimensional Geometry':P('coordinate axes and octants','coordinates of a point in space','distance formula in three dimensions','section formula in space'),
    'Limits and Derivatives':P('intuitive and algebraic limits','standard limit forms','derivative as rate of change','derivative from first principles'),
    'Statistics':P('range and mean deviation','variance and standard deviation','grouped-data calculations','comparing dispersion'),
    'Probability':P('random experiments and sample space','events and event algebra','axiomatic probability','complement, union and mutually exclusive events')
  },
  Accountancy:{
    'Introduction to Accounting':P('meaning and objectives of accounting','users of accounting information','qualitative characteristics of information','basic accounting terms'),
    'Theory Base of Accounting':P('accounting concepts and assumptions','accounting principles and standards','cash versus accrual basis','GST and accounting equation foundations'),
    'Recording of Transactions - I':P('source documents and vouchers','rules of debit and credit','journal entries','accounting equation effects'),
    'Recording of Transactions - II':P('cash book and subsidiary books','special-purpose books','posting to ledger','balancing accounts'),
    'Bank Reconciliation Statement':P('cash-book and pass-book balances','timing differences','errors and adjustments','reconciliation procedure'),
    'Trial Balance and Rectification of Errors':P('purpose and preparation of trial balance','errors disclosed and not disclosed','rectification entries','suspense account'),
    'Depreciation, Provisions and Reserves':P('need and causes of depreciation','straight-line and written-down-value methods','change in method','provisions versus reserves'),
    'Financial Statements - I':P('trading account','profit and loss account','gross and net profit','basic financial-statement preparation'),
    'Financial Statements - II':P('closing-stock and outstanding adjustments','prepaid/accrued items','depreciation and bad-debt adjustments','balance-sheet presentation')
  },
  'Business Studies':{
    'Business, Trade and Commerce':P('economic and non-economic activities','business, profession and employment','industry and commerce','business risk and objectives'),
    'Forms of Business Organisation':P('sole proprietorship and partnership','Hindu undivided family and cooperative societies','company form','choice of organisation'),
    'Private, Public and Global Enterprises':P('private and public sectors','departmental undertakings and statutory corporations','government companies','global enterprises and joint ventures'),
    'Business Services':P('banking and digital payments','insurance principles and types','postal and telecom services','transport and warehousing'),
    'Emerging Modes of Business':P('e-business scope','online transactions','outsourcing','benefits, limitations and security concerns'),
    'Social Responsibilities of Business and Business Ethics':P('stakeholder responsibility','business and environmental protection','arguments for social responsibility','business ethics'),
    'Formation of a Company':P('promotion','incorporation','capital subscription','key formation documents and responsibilities'),
    'Sources of Business Finance':P('owners’ funds and borrowed funds','shares and debentures','retained earnings and institutional finance','matching source to purpose'),
    'MSME and Business Entrepreneurship':P('role of MSMEs','entrepreneurship and innovation','institutional support','rural and small-business challenges'),
    'Internal Trade':P('wholesale and retail trade','types of retailers','documents and terms of trade','consumer-facing services'),
    'International Business':P('meaning and scope of international business','export-import procedure','trade documents','WTO and international institutions')
  },
  Geography:{
    'Geography as a Discipline':P('spatial questions and geographical inquiry','systematic and regional geography','physical and human branches','interdisciplinary relationships'),
    'The Origin and Evolution of the Earth':P('origin of the universe and solar system','formation of Earth','evolution of lithosphere, atmosphere and hydrosphere','origin of life'),
    'Interior of the Earth':P('direct and indirect sources','seismic waves','layers of the Earth','earthquakes and volcanoes'),
    'Distribution of Oceans and Continents':P('continental drift','sea-floor spreading','plate tectonics','plate boundaries and evidence'),
    'Geomorphic Processes':P('endogenic and exogenic forces','weathering and mass movement','erosion and deposition','landscape evolution'),
    'Landforms and their Evolution':P('fluvial landforms','groundwater and karst','glacial and coastal landforms','wind-generated landforms'),
    'Composition and Structure of Atmosphere':P('atmospheric gases','vertical layers','ozone and aerosols','weather-producing lower atmosphere'),
    'Solar Radiation, Heat Balance and Temperature':P('insolation','Earth’s heat budget','temperature controls','inversion and spatial patterns'),
    'Atmospheric Circulation and Weather Systems':P('pressure belts','planetary and local winds','air masses and fronts','cyclones and circulation systems'),
    'Water in the Atmosphere':P('humidity','evaporation and condensation','clouds','precipitation'),
    'World Climate and Climate Change':P('climate classification','major climate types','greenhouse effect','climate change causes and responses'),
    'Water (Oceans)':P('ocean-floor relief','temperature','salinity','distribution patterns'),
    'Movements of Ocean Water':P('waves','tides','surface currents','ocean circulation effects'),
    'Biodiversity and Conservation':P('ecosystem and biodiversity','biodiversity distribution','threats','in-situ and ex-situ conservation'),
    'India — Location':P('latitudinal and longitudinal extent','Indian Standard Time','neighbours','strategic location in the Indian Ocean'),
    'Structure and Physiography':P('geological structure','Himalayas','Northern Plains and Peninsular Plateau','coasts and islands'),
    'Drainage System':P('drainage patterns','Himalayan rivers','Peninsular rivers','river-basin issues'),
    'Climate':P('monsoon mechanism','seasons','rainfall distribution','climatic controls and variability'),
    'Natural Vegetation':P('vegetation types','climatic controls','forest distribution','conservation'),
    'Natural Hazards and Disasters':P('earthquakes and landslides','floods and droughts','cyclones','vulnerability, preparedness and mitigation'),
    'Introduction to Maps':P('map purpose and types','map elements','symbols and conventions','spatial representation'),
    'Map Scale':P('statement scale','representative fraction','graphical scale','conversion and distance measurement'),
    'Latitude, Longitude and Time':P('geographic coordinate system','local time','time zones','International Date Line'),
    'Map Projections':P('projection properties','cylindrical projections','conical projections','distortion and suitability'),
    'Topographical Maps':P('conventional signs','contours and relief','drainage and settlement','map interpretation'),
    'Introduction to Remote Sensing':P('electromagnetic energy','sensors and platforms','image resolution','applications and interpretation')
  }
};

const literatureFocus={
  'English Elective':{
    'The Lament':P('grief and the need to be heard','loneliness amid social indifference','empathy and human connection','irony, repetition and narrative perspective'),
    'A Pair of Mustachios':P('status symbols and social hierarchy','pride, honour and wounded prestige','satire of class and caste pretensions','comic exaggeration and social criticism'),
    'The Rocking-horse Winner':P('materialism and emotional deprivation','luck, money and parental dissatisfaction','the child’s obsessive quest for approval','symbolism and tragic irony'),
    'The Adventure of the Three Garridebs':P('deception built around greed','Holmes’s detection and inference','Watson and Holmes’s friendship','suspense, clues and revelation'),
    'Pappachi’s Moth':P('patriarchal authority and resentment','family violence and emotional damage','status, colonial attitudes and insecurity','symbolic memory and narrative perspective'),
    'The Third and Final Continent':P('migration and cultural adaptation','home, belonging and displacement','quiet human connection across cultures','memory and retrospective narration'),
    'Glory at Twilight':P('decline, reputation and social change','self-image versus material reality','dignity, compromise and disappointment','irony in character and circumstance'),
    'The Luncheon':P('social pretence and manipulation','money, embarrassment and self-control','the unreliable gap between words and actions','comic irony and reversal'),
    'The Peacock':P('sensory perception of the peacock','beauty, movement and elusiveness','colour and sound imagery','attention, surprise and poetic form'),
    'Let me Not to the Marriage of True Minds':P('steadfast love','love versus change and time','navigation and star imagery','sonnet structure and argumentative progression'),
    'Coming':P('arrival of spring','renewal and childlike joy','light, sound and natural imagery','tone shift and compressed lyric form'),
    'Telephone Conversation':P('racial prejudice','absurd classification by skin colour','speaker’s wit and resistance','satire, dialogue and dramatic irony'),
    'The World is too Much With Us':P('materialism and alienation','loss of connection with nature','Romantic imagination','sonnet form and mythic allusion'),
    'Mother Tongue':P('language and identity','endangered linguistic heritage','memory and cultural continuity','personification and emotional appeal'),
    'Hawk Roosting':P('power and self-authority','violence presented as natural order','the hawk’s dramatic monologue','irony, imagery and controlling voice'),
    'For Elkana':P('domestic family relationships','childhood perception and adult tension','everyday speech and intimacy','dramatic voice and understated humour'),
    'Refugee Blues':P('statelessness and displacement','bureaucratic exclusion','loss of home and rights','blues repetition, contrast and irony'),
    'Felling of the Banyan Tree':P('tradition versus modernisation','family memory and displacement','ecological and cultural loss','the banyan as symbol'),
    'Ode to a Nightingale':P('mortality and transience','imagination versus reality','art, nature and the desire to escape','sensuous imagery and ode structure'),
    'Ajamil and the Tigers':P('power, violence and social order','fable-like characters and political satire','moral ambiguity','irony, repetition and narrative compression'),
    'My Watch':P('mechanical complexity and expert intervention','escalating repair and loss of control','comic frustration','satire, exaggeration and anecdotal structure'),
    'My Three Passions':P('longing for love','search for knowledge','compassion for human suffering','autobiographical structure and philosophical reflection'),
    'Patterns of Creativity':P('creative discovery across disciplines','pattern, intuition and disciplined work','individual insight and cultural context','examples as evidence for an argument'),
    'Tribal Verse':P('oral and community traditions','relationship with land and collective memory','translation and cultural context','limits of judging oral literature by written norms'),
    'What is a Good Book?':P('lasting value in reading','active and attentive reading','books as intellectual companionship','argument, examples and evaluative criteria'),
    'The Story':P('story as sequence and curiosity','narrative expectations','plot, character and causality','the craft of sustaining reader interest'),
    'Bridges':P('connection across difference','literal and metaphorical bridging','communication and shared human experience','structure, example and reflective argument')
  },
  'Hindi Core':{
    'नमक का दारोगा':P('ईमानदारी और भ्रष्ट व्यवस्था','वंशीधर का नैतिक दृढ़ता','पंडित अलोपीदीन और धन-सत्ता','व्यंग्य, चरित्र-चित्रण और नैतिक विडंबना'),
    'मियाँ नसीरुद्दीन':P('कारीगरी और पेशे की निष्ठा','खानदानी हुनर और परंपरा','आत्मसम्मान और व्यक्तित्व','संवादप्रधान शैली और चरित्र-चित्रण'),
    'अपू के साथ ढाई साल':P('फिल्म निर्माण की सृजन-प्रक्रिया','सीमित साधनों में काम','यथार्थवादी दृश्य और धैर्य','संस्मरणात्मक शैली और अनुभव'),
    'विदाई-संभाषण':P('औपनिवेशिक सत्ता की आलोचना','शासक और जनता का संबंध','विडंबना और राजनीतिक व्यंग्य','भाषण-शैली और व्यंजना'),
    'गलता लोहा':P('जातिगत भेदभाव और सामाजिक विषमता','श्रम, कौशल और प्रतिभा','मानवीय गरिमा','यथार्थवादी कथा और प्रतीक'),
    'रजनी':P('अन्याय के विरुद्ध नागरिक साहस','शिक्षा व्यवस्था और जवाबदेही','रजनी का संघर्षशील व्यक्तित्व','संवाद और सामाजिक व्यंग्य'),
    'जामुन का पेड़':P('नौकरशाही और लालफीताशाही','व्यक्ति बनाम व्यवस्था','निर्णयहीनता की विडंबना','हास्य-व्यंग्य और प्रतीक'),
    'भारत माता':P('राष्ट्र की अवधारणा','भारत के लोग और विविधता','देशभक्ति बनाम संकीर्ण राष्ट्रवाद','विचारात्मक गद्य और संवाद'),
    'कबीर':P('निर्गुण भक्ति और आत्मज्ञान','धार्मिक आडंबर की आलोचना','गुरु, प्रेम और अनुभव','साखी/पद की लोकभाषा और व्यंग्य'),
    'मीरा':P('कृष्ण-भक्ति और समर्पण','विरह और आध्यात्मिक प्रेम','सामाजिक बंधनों से मुक्ति','लोकधर्मी भाषा और भावात्मकता'),
    'भवानी प्रसाद मिश्र':P('घर और परिवार की स्मृति','विरह और आत्मीयता','प्रकृति तथा वर्षा-बिंब','सरल बोलचाल और लय'),
    'त्रिलोचन':P('शिक्षा और ग्रामीण जीवन','चंपा का व्यक्तित्व','साक्षरता, गरीबी और आकांक्षा','संवादात्मक सहज भाषा'),
    'दुष्यंत कुमार':P('सामाजिक-राजनीतिक बेचैनी','परिवर्तन की आकांक्षा','आम आदमी का अनुभव','ग़ज़ल की तीखी बिंबात्मक भाषा'),
    'अक्क महादेवी':P('आध्यात्मिक समर्पण','देह, अहं और विरक्ति','ईश्वर से निजी संबंध','वचन शैली और प्रतीक'),
    'पाश':P('जड़ता और निष्क्रियता का खतरा','सपनों और प्रतिरोध का महत्व','मानवीय चेतना','सीधी, तीखी और राजनीतिक भाषा'),
    'निर्मला पुतुल':P('आदिवासी जीवन और सांस्कृतिक पहचान','प्रकृति और समुदाय का संबंध','भाषा, स्मृति और परंपरा का संरक्षण','आह्वानात्मक स्वर और प्रतिरोध'),
    'भारतीय गायिकाओं में बेजोड़: लता मंगेशकर':P('लता मंगेशकर की गायकी की विशिष्टता','स्वर, लय और भाव-संप्रेषण','लोकप्रियता और कलात्मक अनुशासन','संगीत-समीक्षा की भाषा'),
    'राजस्थान की रजत बूँदें':P('मरुस्थलीय जल-संरक्षण','कुंड, टांका और पारंपरिक तकनीक','समुदाय का पर्यावरणीय ज्ञान','वर्णन, लोकज्ञान और जल-संस्कृति'),
    'आलो-आँधारि':P('घरेलू श्रम और स्त्री-अनुभव','गरीबी, हिंसा और संघर्ष','शिक्षा, लेखन और आत्मनिर्भरता','आत्मकथात्मक यथार्थ'),
    'भारतीय कलाएँ':P('भारतीय कला-परंपराओं की विविधता','संगीत, नृत्य, चित्र और स्थापत्य का संबंध','परंपरा और नवाचार','सांस्कृतिक संदर्भ और सौंदर्यबोध')
  },
  'Hindi Elective':{
    'ईदगाह':P('हामिद का त्याग और संवेदनशीलता','अमीना के प्रति प्रेम','गरीबी और आत्मसम्मान','बाल-दृष्टि, विडंबना और मानवीय करुणा'),
    'दोपहर का भोजन':P('गरीबी और भूख','परिवार की गरिमा','अभाव में संबंधों की संवेदनशीलता','यथार्थवादी विवरण और मौन तनाव'),
    'टार्च बेचनेवाले':P('भय और विश्वास का बाजारीकरण','ढोंग और उपभोक्ता मानसिकता','सामाजिक व्यंग्य','विडंबना और रूपक'),
    'गूँगे':P('अभिव्यक्ति और संवाद की कठिनाई','विकलांगता के प्रति सामाजिक दृष्टि','करुणा बनाम दया','चरित्र और मानवीय गरिमा'),
    'ज्योतिबा फुले':P('जाति-विरोधी सामाजिक सुधार','स्त्री-शिक्षा','समानता और सत्यशोधक दृष्टि','जीवन-वृत्त और वैचारिक संघर्ष'),
    'खानाबदोश':P('मजदूर जीवन और विस्थापन','श्रम-शोषण और असुरक्षा','जाति तथा वर्ग का दबाव','यथार्थवादी कथा और प्रतिरोध'),
    'उसकी माँ':P('मातृत्व और वैचारिक संघर्ष','युवा आदर्श और जोखिम','व्यक्ति, परिवार और समाज','करुणा और राजनीतिक संदर्भ'),
    'भारतवर्ष की उन्नति कैसे हो सकती है?':P('राष्ट्रीय उन्नति और आत्मनिर्भरता','शिक्षा और सामाजिक सुधार','आर्थिक-सांस्कृतिक जागरण','तर्क, व्यंग्य और आह्वान'),
    'कबीर':P('निर्गुण भक्ति','रूढ़ि और पाखंड की आलोचना','अनुभवजन्य ज्ञान','साखी/पद की लोकभाषा'),
    'सूरदास':P('कृष्ण-भक्ति','वात्सल्य और भाव-सूक्ष्मता','ब्रजभाषा','दृश्यात्मकता और संगीतात्मकता'),
    'देव':P('रीतिकालीन शृंगार','अलंकार और बिंब','भाषिक चमत्कार','छंद और काव्य-शिल्प'),
    'सुमित्रानंदन पंत':P('प्रकृति और सौंदर्य','छायावादी संवेदना','मानवीय अनुभूति','कोमल बिंब और संगीतात्मक भाषा'),
    'महादेवी वर्मा':P('विरह और आध्यात्मिक खोज','अकेलापन और करुणा','प्रकृति-प्रतीक','छायावादी बिंब और लय'),
    'नागार्जुन':P('जनजीवन और सामाजिक यथार्थ','सत्ता पर व्यंग्य','किसान-मजदूर की दृष्टि','सीधी जनभाषा'),
    'श्रीकांत वर्मा':P('आधुनिक मनुष्य और असुरक्षा','इतिहास तथा सत्ता की स्मृति','विडंबना और प्रश्नाकुलता','संक्षिप्त आधुनिक काव्य-भाषा'),
    'धूमिल':P('राजनीतिक मोहभंग','लोकतंत्र और आम आदमी','भाषा में प्रतिरोध','कटु व्यंग्य और बोलचाल'),
    'हुसैन की कहानी अपनी जबानी':P('एम. एफ. हुसैन की कलायात्रा','सृजन, प्रयोग और दृश्य-स्मृति','कलाकार का आत्मनिर्माण','आत्मकथात्मक शैली'),
    'आवारा मसीहा':P('शरतचंद्र का जीवन-संघर्ष','लेखक और समाज','सृजन तथा संवेदनशीलता','जीवनी की शोधपरक और कथात्मक शैली')
  },
  'Sanskrit Core':{
    'कुशलप्रशासनम्':P('सुशासनम् तथा लोकहितम्','कर्तव्यपरायणता','प्रशासनिक दक्षता','नीतिपरक शब्दावली और वाक्यरचना'),
    'सूक्तिसुधा':P('सूक्तयः और जीवन-मूल्य','संक्षिप्त नीति-वचन','अर्थ-गौरव और व्यंजना','छन्द/अलंकार और शब्दार्थ'),
    'ऋतुचर्या':P('ऋतूनुसार आहार-विहार','स्वास्थ्य और दिनचर्या','आयुर्वेदीय संतुलन','निर्देशात्मक भाषा और शब्दावली'),
    'वीरः सर्वदमनः':P('बालक सर्वदमन का वीरत्व','चरित्र-चित्रण','नाटकीय प्रसंग','संवाद, समास और क्रियारूप'),
    'शुकशावकोदन्तः':P('कथानक और नीति','जीव-जगत के प्रति संवेदना','संवाद और घटनाक्रम','कथा-भाषा और व्याकरण'),
    'भव्यः सत्याग्रहाश्रमः':P('सत्य और अहिंसा','आश्रम-जीवन और अनुशासन','सामुदायिक श्रम','गांधीवादी शब्दावली और प्रसंग'),
    'संगीतानुरागी सुब्बण्णः':P('संगीत-समर्पण','कलाकार का व्यक्तित्व','कला और जीवन का संबंध','चरित्र-चित्रण और भाव'),
    'वस्त्रविक्रयः':P('क्रय-विक्रय संवाद','वस्त्र और मूल्य की शब्दावली','व्यावहारिक संस्कृत','संख्या, कारक और संवाद-रचना'),
    'यद्भूतहितं तत्सत्यम्':P('सत्य और लोकहित','नैतिक निर्णय','वाणी की जिम्मेदारी','तर्क, नीति और सूक्ति'),
    'स मे प्रियः':P('भक्त के गुण','समत्व और अहिंसा','आत्मसंयम','दार्शनिक शब्दावली और श्लोक-अर्थ'),
    'अथ शिक्षां प्रवक्ष्यामि':P('शिक्षा और शुद्ध उच्चारण','वर्ण, स्वर और ध्वनि','अनुशासन और अध्ययन','वैदिक/शास्त्रीय भाषा-विन्यास')
  },
  'Sanskrit Elective':{
    'वेदामृतम्':P('वैदिक मन्त्रों का भाव','प्रकृति और दिव्यता','मानवीय कल्याण','वैदिक शब्द, छन्द और व्याख्या'),
    'परोपकाराय सतां विभूतयः':P('परोपकार और उदारता','सज्जनों के गुण','प्रकृति-उदाहरण','नीति, उपमा और श्लोक-अर्थ'),
    'मानो हि महतां धनम्':P('मान और आत्मसम्मान','नैतिक दृढ़ता','महान चरित्र के गुण','संवाद/कथा और नीति'),
    'सौवर्णशकटिका':P('नाटकीय प्रसंग और पात्र','धन तथा सामाजिक भेद','करुणा और हास्य','संवाद, नाट्य-शिल्प और व्याकरण'),
    'आहारविचारः':P('आहार और स्वास्थ्य','सात्त्विकता और संतुलन','भोजन संबंधी अनुशासन','स्वास्थ्य-शब्दावली और निर्देश'),
    'सन्ततिप्रबोधनम्':P('नई पीढ़ी को उपदेश','कर्तव्य और मूल्य','शिक्षा और चरित्र','उपदेशात्मक शैली और व्याकरण'),
    'विज्ञाननौका':P('विज्ञान और जिज्ञासा','नवाचार और तर्क','वैज्ञानिक संस्कृत शब्दावली','विचार, उदाहरण और आधुनिक संदर्भ'),
    'कन्थामाणिक्यम्':P('बाह्य रूप और वास्तविक मूल्य','कथानक तथा नैतिक बोध','पात्र और निर्णय','कथा-शैली और शब्दार्थ'),
    'ईशः कुत्रास्ति':P('ईश्वर की खोज','आस्था और तर्क','सर्वव्यापकता का विचार','प्रश्नोत्तर शैली और दार्शनिक शब्द'),
    'सत्त्वमाहो रजस्तमः':P('सत्त्व, रजस् और तमस्','गुण और व्यवहार','आत्मनिरीक्षण','दार्शनिक वर्गीकरण और उदाहरण'),
    'नवद्रव्याणि':P('वैशेषिक दर्शन के द्रव्य','नौ द्रव्यों का वर्गीकरण','गुण और पदार्थ का संबंध','दार्शनिक पारिभाषिक शब्दावली')
  }
};

const formulaFocus={
  'Units and Measurements':['[M^a L^b T^c] dimensional form','percentage error ≈ sum of relevant fractional errors × 100'],
  'Motion in a Straight Line':['v = u + at','s = ut + 1/2 at²','v² = u² + 2as'],
  'Motion in a Plane':['R = u² sin 2θ / g','T = 2u sin θ / g','a_c = v²/r'],
  'Laws of Motion':['F = ma','p = mv','J = Δp','f ≤ μN'],
  'Work, Energy and Power':['W = F·s = Fs cosθ','K = 1/2 mv²','P = dW/dt'],
  'System of Particles and Rotational Motion':['τ = r × F','L = r × p','τ = Iα','K_rot = 1/2 Iω²'],
  'Gravitation':['F = Gm₁m₂/r²','g = GM/r²','V = -GM/r','v_orbit = √(GM/r)'],
  'Mechanical Properties of Solids':['stress = force/area','strain = fractional change','Young modulus = longitudinal stress/strain'],
  'Mechanical Properties of Fluids':['P = F/A','A₁v₁ = A₂v₂','P + 1/2ρv² + ρgh = constant'],
  'Thermal Properties of Matter':['Q = mcΔT','ΔL = αLΔT','P = σeAT⁴'],
  'Thermodynamics':['ΔQ = ΔU + ΔW','η = W/Q_H'],
  'Kinetic Theory':['PV = nRT','P = 1/3 ρ c_rms²','average translational KE = 3/2 kT'],
  'Oscillations':['x = A cos(ωt+φ)','a = -ω²x','T = 2π√(l/g)'],
  'Waves':['v = νλ','y = A sin(kx-ωt+φ)','v_string = √(T/μ)'],
  'Some Basic Concepts of Chemistry':['n = m/M','N = nN_A','Molarity = moles of solute / litre of solution'],
  'Structure of Atom':['E_n = -13.6/n² eV for H-like ground framework','λ = h/p','c = νλ'],
  'Chemical Thermodynamics':['ΔU = q + w','ΔH = ΔU + Δn_gRT','ΔG = ΔH - TΔS'],
  'Equilibrium':['K_c = product concentrations^coefficients / reactant concentrations^coefficients','pH = -log[H⁺]','K_w = [H⁺][OH⁻]'],
  'Redox Reactions':['sum of oxidation-number increase = sum of oxidation-number decrease'],
  'Sets':['n(A∪B)=n(A)+n(B)-n(A∩B)'],
  'Trigonometric Functions':['sin²x+cos²x=1','1+tan²x=sec²x','1+cot²x=cosec²x'],
  'Complex Numbers and Quadratic Equations':['i²=-1','roots = (-b ± √(b²-4ac))/(2a)'],
  'Permutations and Combinations':['nP_r = n!/(n-r)!','nC_r = n!/[r!(n-r)!]'],
  'Binomial Theorem':['(a+b)^n = Σ nC_r a^(n-r)b^r'],
  'Sequences and Series':['a_n=a+(n-1)d','S_n=n[2a+(n-1)d]/2','a_n=ar^(n-1)','S_n=a(r^n-1)/(r-1)'],
  'Straight Lines':['m=(y₂-y₁)/(x₂-x₁)','y-y₁=m(x-x₁)','distance = |Ax₁+By₁+C|/√(A²+B²)'],
  'Introduction to Three-dimensional Geometry':['d=√[(x₂-x₁)²+(y₂-y₁)²+(z₂-z₁)²]'],
  'Limits and Derivatives':['f′(x)=lim(h→0)[f(x+h)-f(x)]/h'],
  'Statistics':['σ² = mean of squared deviations','σ = √variance'],
  'Probability':['P(A)=n(A)/n(S) for equally likely outcomes','P(A∪B)=P(A)+P(B)-P(A∩B)']
};

const sourceLocator=e=>{
  const b=e.sourceBook||'';
  const n=Number(e.order)||1;
  const pad=x=>String(x).padStart(2,'0');
  if(e.subject==='Physics') return n<=7?'keph1'+pad(n)+'.pdf':'keph2'+pad(n-7)+'.pdf';
  if(e.subject==='Chemistry') return n<=6?'kech1'+pad(n)+'.pdf':'kech2'+pad(n-6)+'.pdf';
  if(e.subject==='Mathematics') return 'kemh1'+pad(n)+'.pdf';
  if(e.subject==='Biology') return 'kebo1'+pad(n)+'.pdf';
  if(e.subject==='Business Studies') return 'kebs1'+pad(n)+'.pdf';
  if(e.subject==='History') return 'kehs1'+pad(n)+'.pdf';
  if(e.subject==='Psychology') return 'kepy1'+pad(n)+'.pdf';
  if(e.subject==='Accountancy') return b.includes('II')?'keac2'+pad(n)+'.pdf':'keac1'+pad(n)+'.pdf';
  if(e.subject==='Economics'&&b==='Statistics for Economics') return 'kest1'+pad(n)+'.pdf';
  if(e.subject==='Economics'&&b==='Introductory Microeconomics') return 'Official NCERT Introductory Microeconomics, chapter '+n;
  if(e.subject==='Geography'&&b==='Fundamentals of Physical Geography') return 'kegy2'+pad(n)+'.pdf';
  if(e.subject==='Geography'&&b==='India: Physical Environment') return 'kegy1'+pad(n)+'.pdf';
  if(e.subject==='Geography'&&b.includes('Practical Work')) return 'kegy3'+pad(n)+'.pdf';
  if(e.subject==='Political Science'&&b==='Political Theory') return 'keps1'+pad(n)+'.pdf';
  if(e.subject==='Political Science') return 'keps2'+pad(n)+'.pdf';
  if(e.subject==='Sociology'&&b==='Introducing Sociology') return 'kesy1'+pad(n)+'.pdf';
  if(e.subject==='Sociology') return 'kesy2'+pad(n)+'.pdf';
  if(e.subject==='English'&&b==='Snapshots') return 'kesp1'+pad(n)+'.pdf';
  if(e.subject==='English') return 'NCERT Hornbill chapter source: '+e.title;
  if(e.subject==='English Elective'&&b.includes('Short Stories')) return 'keww1'+pad(n)+'.pdf';
  if(e.subject==='English Elective'&&b.includes('Poetry')) return 'keww1'+String(10+n).padStart(2,'0')+'.pdf';
  if(e.subject==='English Elective'&&b.includes('Essays')) return 'keww1'+String(30+n).padStart(2,'0')+'.pdf';
  if(e.subject==='Hindi Core'&&b.includes('आरोह')) return 'khar1'+pad(n)+'.pdf';
  if(e.subject==='Hindi Core'&&b.includes('वितान')) return 'NCERT Vitan Bhag 1 chapter source: '+e.title;
  if(e.subject==='Hindi Elective'&&b.includes('अंतरा')) return 'khat1'+pad(n)+'.pdf';
  if(e.subject==='Hindi Elective') return 'khan1'+pad(n)+'.pdf';
  if(e.subject==='Sanskrit Core') return 'khsk1'+pad(n)+'.pdf';
  if(e.subject==='Sanskrit Elective') return 'khsk2'+pad(n)+'.pdf';
  if(e.subject==='Fine Art') return 'Official NCERT An Introduction to Indian Art Part-I, chapter '+n;
  if(e.subject==='Computer Science') return 'Official NCERT Computer Science Class XI, chapter '+n;
  if(e.subject==='Informatics Practices') return 'Official CBSE/NCERT Informatics Practices Class XI source, chapter '+n;
  return 'NCERT '+(b||e.subject)+' chapter source: '+e.title;
};

const officialBasis=e=>{
  if(['Fine Art','Computer Science','Informatics Practices'].includes(e.subject)) return true;
  return e.subject==='Economics'&&e.sourceBook==='Introductory Microeconomics';
};

const rawFocus=e=>{
  const literary=literatureFocus[e.subject]&&literatureFocus[e.subject][e.title];
  if(literary) return literary;
  const bySubject=focus[e.subject]&&focus[e.subject][e.title];
  if(bySubject) return bySubject;
  const points=(e.keyPoints||[]).map(clean).filter(Boolean);
  if(points.length>=3) return points.slice(0,5);
  if(/English|Hindi|Sanskrit/.test(e.subject)) return ['central idea and context','voice, character or speaker','language, structure and imagery','evidence-based interpretation'];
  return ['central concept','key relationships','application or evidence','common distinctions'];
};

const conceptText=(subject,label,title)=>{
  const x=clean(label);
  if(subject==='Physics') return 'Connect '+x+' to measurable quantities, diagrams, units and the conditions under which the physical model applies in '+title+'.';
  if(subject==='Chemistry') return 'Explain '+x+' from particles, structure, energetics or reaction behaviour, then connect the microscopic idea to observable chemistry.';
  if(subject==='Mathematics') return 'Define '+x+' precisely, connect its symbolic and graphical forms, and check the restrictions before applying a rule.';
  if(subject==='Biology') return 'Link '+x+' to the relevant structure, sequence, function and regulation rather than learning the term in isolation.';
  if(subject==='Accountancy') return 'Trace '+x+' through the accounting logic, the required record or statement, and the effect on balances.';
  if(subject==='Business Studies') return 'Learn '+x+' through meaning, purpose, features and a realistic business application.';
  if(subject==='Economics') return 'Use '+x+' to explain the relationship between economic variables or evidence, including assumptions and limits.';
  if(subject==='Geography') return 'Connect '+x+' with location, process, spatial pattern and the evidence shown by maps, diagrams or data.';
  if(subject==='History') return 'Use '+x+' as an evidence-based historical theme: identify context, sources, change over time and competing interpretations.';
  if(subject==='Political Science') return 'Explain '+x+' through the relevant concept or institution, then connect principle, design, debate and democratic consequence.';
  if(subject==='Sociology') return 'Use '+x+' sociologically by connecting individual experience to institutions, structure, inequality and social change.';
  if(subject==='Psychology') return 'Define '+x+' operationally, connect it to evidence or a psychological process, and distinguish explanation from everyday intuition.';
  if(subject==='Fine Art') return 'Study '+x+' through visual evidence, material, technique, patronage or cultural context, and explain what the artwork itself supports.';
  if(subject==='Computer Science'||subject==='Informatics Practices') return 'Understand '+x+' conceptually, then apply it in a small trace, program, data example or system scenario.';
  if(/Hindi/.test(subject)) return x+' को पाठ के प्रसंग, केंद्रीय कथ्य, भाषा-शैली और प्रमाण से जोड़कर समझें; केवल सार न लिखें।';
  if(/Sanskrit/.test(subject)) return x+' को पदच्छेद, अन्वय, शब्दार्थ, व्याकरणिक रूप और प्रसंग से जोड़कर समझें।';
  return 'Trace '+x+' through the text, paying attention to voice, structure, language and evidence rather than retelling.';
};

const subjectReasoning=e=>{
  const s=e.subject;
  if(s==='Physics') return ['Sketch the physical situation and define the system.','Choose the governing principle before choosing an equation.','Work symbolically, then substitute SI values with signs and units.','Check dimensions, limiting cases and physical meaning.'];
  if(s==='Chemistry') return ['Identify the species, particles or structural change involved.','Write the balanced equation or representation before calculating.','Apply mole, energetic, equilibrium or bonding ideas with stated conditions.','Check atoms, charge, units and whether the result matches the chemistry.'];
  if(s==='Mathematics') return ['State what is given and what must be proved or found.','Choose a representation: symbols, graph, table, diagram or case split.','Apply a justified result one step at a time.','Check domain restrictions, special cases and the requested form.'];
  if(s==='Biology') return ['Identify the biological level: molecule, cell, tissue, organ, organism or population.','Trace the process in causal order with locations and inputs/outputs.','Connect structure to function and regulation.','Use a labelled diagram, comparison or evidence to test the explanation.'];
  if(s==='Accountancy') return ['Identify the transaction or adjustment and the accounts affected.','Apply the principle and debit-credit logic, not a memorised shortcut.','Record, post or adjust in the required format.','Verify totals and trace the effect into the final statements.'];
  if(s==='Business Studies') return ['Identify the business situation and the concept being tested.','State the relevant feature, principle or process.','Apply it to the facts of the case.','Justify why the chosen response fits better than alternatives.'];
  if(s==='Economics') return ['Define the economic concept and variables precisely.','Choose the suitable diagram, statistic or chain of reasoning.','Explain the direction and cause of each change.','Interpret the result in context and state important assumptions.'];
  if(s==='Geography') return ['Locate the phenomenon and identify the scale.','Explain the physical or human process producing the pattern.','Use map, graph, field or case evidence.','Link pattern, process and consequence.'];
  if(['History','Political Science','Sociology'].includes(s)) return ['Identify the question, context and key concept.','Select precise evidence, examples or institutional features.','Explain relationships such as cause, consequence, continuity, conflict or comparison.','Return to the question with a reasoned conclusion rather than an unsupported opinion.'];
  if(s==='Psychology') return ['Define the construct or process.','Identify how it is observed, measured or studied.','Use evidence or a model to explain the result.','Distinguish correlation from causation and note ethical or contextual limits where relevant.'];
  if(s==='Computer Science'||s==='Informatics Practices') return ['State the input, required output and constraints.','Trace the data or algorithm step by step.','Test normal and edge cases.','Explain the result in terms of the underlying concept, not only the syntax.'];
  if(/Hindi/.test(s)) return ['प्रश्न का निर्देश शब्द और पाठ का सटीक प्रसंग पहचानें।','एक स्पष्ट कथन लिखकर उसे घटना, बिंब, पात्र या भाषा से सिद्ध करें।','भाषा या रचना-विधान का प्रभाव समझाएँ।','अंत में प्रश्न के अनुरूप निष्कर्ष दें; केवल कथानक न दोहराएँ।'];
  if(/Sanskrit/.test(s)) return ['पदच्छेद और प्रमुख शब्दार्थ पहचानें।','अन्वय बनाकर कारक, धातु, लकार, समास या सन्धि की भूमिका देखें।','प्रसंग और केंद्रीय विचार जोड़ें।','अनुवाद या व्याख्या को व्याकरण और अर्थ दोनों से जाँचें।'];
  return ['Identify the central situation, speaker, narrator or argument.','Trace how the idea develops through structure and language.','Use precise textual evidence in your own words.','Explain the effect of the evidence and link it back to the question.'];
};

const visuals=e=>{
  const s=e.subject;
  if(s==='Physics') return ['Draw the standard labelled diagram or graph and mark the sign convention.','Build a quantity–unit–relationship map before numerical work.'];
  if(s==='Chemistry') return ['Use particle, orbital, structural or energy-level diagrams where they clarify the explanation.','Make a reaction map linking reagent/condition → change → product/observation.'];
  if(s==='Mathematics') return ['Translate the topic into a graph, diagram, number line, table or coordinate picture where possible.','Mark restrictions, intercepts, regions or corresponding quantities directly on the representation.'];
  if(s==='Biology') return ['Redraw the key labelled structure or process from memory.','Use a flowchart to connect location → step → product/function → regulation.'];
  if(s==='Geography') return ['Sketch the map, cross-section or process diagram with labels and direction arrows.','Pair the diagram with a small cause → pattern → consequence flowchart.'];
  if(s==='Fine Art') return ['Use a visual-analysis grid: subject → composition → material/technique → context → interpretation.','Compare two works by form, material, patronage and cultural purpose.'];
  if(s==='Computer Science'||s==='Informatics Practices') return ['Trace variables/data in a table or draw the system/data-flow diagram.','Represent nested logic or database relationships visually before coding/querying.'];
  if(/English|Hindi|Sanskrit/.test(s)) return ['Map central idea → key evidence → language/form → effect.','For prose, map character/argument development; for poetry, map speaker → image → tone → theme.'];
  return ['Build a one-page concept map linking terms, evidence, examples and consequences.','Turn comparisons into a two-column or matrix diagram so differences stay explicit.'];
};

const tips=e=>{
  const s=e.subject;
  if(s==='Physics') return ['Start from a principle and diagram, not from a formula hunt.','Carry SI units and signs through the working.','State assumptions when a standard model is being used.'];
  if(s==='Chemistry') return ['Balance equations before stoichiometry.','Explain trends through structure or energetics rather than memorised direction alone.','State conditions, units and significant figures where they matter.'];
  if(s==='Mathematics') return ['Write the theorem, identity or condition before using it.','Do not skip domain/restriction checks.','Use exact values unless approximation is requested.'];
  if(s==='Biology') return ['Use exact biological terms and labelled diagrams.','Distinguish similar structures/processes in a comparison table.','Explain function and regulation, not only sequence.'];
  if(s==='Accountancy') return ['Show workings for adjustments and calculations.','Keep narration, format and period treatment consistent.','If totals disagree, trace the error instead of forcing them to match.'];
  if(s==='Business Studies') return ['Case-study answers need application to the given facts.','Separate features, merits, limitations and process steps.','Use the textbook term first, then explain it in your own words.'];
  if(['Economics','Geography','History','Political Science','Sociology','Psychology'].includes(s)) return ['Define the core term before analysing it.','Use evidence, examples, diagrams or data only when they directly support the point.','Distinguish closely related concepts instead of treating them as synonyms.'];
  if(s==='Computer Science'||s==='Informatics Practices') return ['Trace code before running it.','Check data types, boundaries and mutation carefully.','Explain why the algorithm/query works, not just the final output.'];
  if(/Hindi/.test(s)) return ['लेखक/कवि, वक्ता और पात्र की दृष्टि अलग रखें।','सार के बजाय दो सटीक पाठ-संकेतों का विश्लेषण करें।','भाषा-शैली या बिंब का प्रभाव भी लिखें।'];
  if(/Sanskrit/.test(s)) return ['रूप, विभक्ति और क्रिया का मिलान जाँचें।','शब्दार्थ के साथ अन्वय और प्रसंग लिखें।','व्याकरणिक पहचान को अर्थ से जोड़ें।'];
  return ['Use evidence, then explain its effect.','Do not replace analysis with plot summary.','Keep narrator/speaker/character viewpoints distinct.'];
};

const distinctions=e=>{
  const s=e.subject;
  if(s==='Physics') return ['Scalar versus vector quantities must be separated whenever direction matters.','A formula is valid only under the model assumptions used to derive it.'];
  if(s==='Chemistry') return ['Macroscopic observation and particle-level explanation are different layers of the same answer.','A reaction condition affects feasibility or pathway; it is not automatically a reactant.'];
  if(s==='Mathematics') return ['A definition states what an object is; a theorem gives a result under stated conditions.','A worked example illustrates a method; proof or justification establishes why it works.'];
  if(s==='Biology') return ['Structure, process and function are related but should not be used interchangeably.','Sequence describes what happens; regulation explains how and when it is controlled.'];
  if(s==='Economics') return ['Movement along a curve is caused by the variable on that curve; a shift comes from another determinant.','Correlation describes association; causation needs a defensible mechanism and evidence.'];
  if(s==='Geography') return ['Description tells where a pattern occurs; explanation tells why it occurs.','Weather is short-term atmospheric condition; climate is a long-term pattern where that distinction is relevant.'];
  if(s==='Accountancy') return ['Capital and revenue items differ by purpose and period effect.','A trial balance can agree even when some classes of errors remain.'];
  if(s==='Business Studies') return ['A feature describes what something is; a merit or limitation evaluates its effect.','A business objective is an intended result; a function or process is how work is carried out.'];
  if(/English|Hindi|Sanskrit/.test(s)) return ['Content is what the text says; form and language explain how meaning is created.','A theme is a developed idea, not a one-word topic label.'];
  return ['Description identifies facts or features; analysis explains relationships and significance.','An example supports a claim but does not replace the underlying concept.'];
};

const makeNote=e=>{
  const f=rawFocus(e).map(clean).filter(Boolean).slice(0,5);
  const concepts=f.map(x=>[cap(x),conceptText(e.subject,x,e.title)]);
  const formulas=[...(formulaFocus[e.title]||[]),...(e.formulas||[])].map(clean).filter(Boolean);
  const uniqueFormulas=[...new Set(formulas)].slice(0,8);
  const isLang=/English|Hindi|Sanskrit/.test(e.subject);
  const overview=isLang
    ? (e.subject.includes('Hindi')
      ? e.title+' को '+(e.sourceBook||'NCERT')+' में केंद्रीय कथ्य, प्रसंग, भाषा-शैली और पाठ-साक्ष्य के साथ पढ़ें। लक्ष्य केवल सार याद करना नहीं, बल्कि यह समझना है कि रचना अर्थ कैसे बनाती है।'
      : e.subject.includes('Sanskrit')
        ? e.title+' में अर्थ, अन्वय, व्याकरण, प्रसंग और साहित्यिक/सांस्कृतिक विचार को साथ पढ़ें।'
        : e.title+' is studied through its central situation or idea, voice, structure and language. Build an interpretation from precise evidence rather than retelling.')
    : e.title+' brings together '+f.slice(0,3).join(', ')+'. Study these as connected ideas, then practise applying them to unfamiliar questions, data, diagrams or cases.';
  return {
    overview,
    concepts,
    formulas:uniqueFormulas,
    reasoning:subjectReasoning(e),
    visuals:visuals(e),
    examTips:tips(e),
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
      (f[0]||'मुख्यविषयः')+' इति पदस्य/विषयस्य प्रसङ्गः कः?',
      'एकं महत्त्वपूर्णं पदरूपं, समासं, धातुरूपं वा अर्थेन सह स्पष्टयत।',
      'अन्वयः कथं श्लोकस्य अथवा गद्यस्य अर्थबोधं स्पष्टं करोति?'
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
    grade:'Class 11',
    subject:e.subject,
    sourceBook:e.sourceBook||'',
    title:e.title,
    sourceFile:sourceLocator(e),
    sourceBasis:officialBasis(e)
      ? 'Official NCERT/CBSE current 2026-27 source used because the supplied Drive does not contain the matching prescribed source'
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
window.CBSE_NCERT_DEEP_NOTES_11=notes;
window.STUDYAI_GRADE11_DEEP_NOTES_STATUS={
  total:notes.length,
  matched:notes.length,
  unmatched:[],
  subjects:[...new Set(notes.map(n=>n.subject))].sort()
};

if(typeof window.renderTopicList==='function')window.renderTopicList();
})();
