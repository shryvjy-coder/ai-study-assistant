/* StudyAI CBSE / NCERT senior-secondary expansion.
 * Verified against the current NCERT textbook portal and CBSE 2026-27 curriculum.
 * Notes are original StudyAI summaries; no textbook prose is reproduced.
 */
(() => {
  'use strict';

  const subjectMeta={
    English:{
      lens:'Read for meaning first, then examine voice, structure, character, imagery, context and the writer’s choices. Support interpretation with precise evidence in your own words.',
      method:['Identify the central situation, speaker, conflict or argument.','Track how ideas, characters or images develop across the text.','Explain how language, structure or point of view creates meaning.','Support the interpretation with specific evidence without retelling the whole text.'],
      mistakes:['Retelling the plot instead of analysing meaning.','Naming a literary device without explaining its effect.','Making a theme claim that the text does not support.']
    },
    Biology:{
      lens:'Biology becomes easier when structure, process and function are connected. Use diagrams, sequences, comparisons and cause-effect reasoning instead of memorising disconnected terms.',
      method:['Identify the level of organisation and the process being studied.','Trace inputs, structures, steps and outputs in the correct order.','Connect structure with function and regulation.','Use labelled diagrams, examples or experimental evidence to check the explanation.'],
      mistakes:['Mixing similar biological terms with different meanings.','Memorising a pathway without understanding where and why each step occurs.','Ignoring exceptions, regulation or the scale of organisation.']
    },
    Accountancy:{
      lens:'Accountancy is a rule-based representation of business transactions. Every entry should preserve the accounting equation, follow the relevant principle and remain traceable through books, ledgers and statements.',
      method:['Identify the transaction and the accounts affected.','Apply the correct accounting rule and record the entry.','Post, classify and balance systematically.','Verify totals, treatments and final-statement effects.'],
      mistakes:['Choosing debit and credit by memory without identifying account effects.','Ignoring adjustments or time periods.','Forcing totals to match instead of finding the underlying error.']
    },
    'Business Studies':{
      lens:'Business Studies links principles to real organisations. Learn each concept through purpose, process, advantages, limitations and application rather than memorising definitions alone.',
      method:['Define the business concept in context.','Break it into features, process or functions.','Apply it to a realistic organisation or decision.','Compare alternatives and justify the most suitable response.'],
      mistakes:['Listing features without applying them to the case.','Confusing related management or finance terms.','Giving generic advantages when the question asks for a specific situation.']
    },
    Economics:{
      lens:'Economics asks how choices, incentives, institutions and constraints shape outcomes. Keep definitions precise, distinguish positive from normative claims and connect diagrams or data to the economic mechanism.',
      method:['Identify the agent, variable and economic question.','State the relevant concept or model and its assumptions.','Use data, equations or diagrams where appropriate.','Explain the chain from cause to outcome and note limitations.'],
      mistakes:['Shifting a curve when the situation causes movement along it.','Using an average when a marginal or percentage measure is required.','Quoting data without explaining the economic relationship.']
    },
    History:{
      lens:'History is explanation using evidence, chronology and competing perspectives. Build arguments around change, continuity, cause, consequence and the limits of the sources.',
      method:['Locate the topic in time and place.','Identify the major actors, structures and evidence.','Organise causes, changes, continuities and consequences.','Evaluate sources and perspectives before forming the conclusion.'],
      mistakes:['Treating chronology as explanation.','Presenting one source or viewpoint as complete truth.','Using present-day assumptions without considering historical context.']
    },
    Geography:{
      lens:'Geography connects spatial patterns with physical and human processes. Read maps and data alongside concepts, and explain why a pattern occurs where it does.',
      method:['Locate the phenomenon and define its spatial scale.','Identify the physical, social or economic processes involved.','Use maps, graphs, field data or examples to test the explanation.','Connect pattern, process and consequence.'],
      mistakes:['Describing a map without explaining the pattern.','Mixing weather with climate or stock with flow concepts.','Ignoring scale, regional variation or data limitations.']
    },
    'Political Science':{
      lens:'Political Science studies power, institutions, rights and competing visions of justice. Separate constitutional design from political practice and evaluate claims with evidence.',
      method:['Identify the institution, principle or political conflict.','Explain the constitutional or theoretical idea involved.','Compare how different actors or systems respond.','Use evidence to evaluate outcomes, tensions and trade-offs.'],
      mistakes:['Treating democracy as only elections.','Confusing a constitutional provision with how politics always works in practice.','Giving partisan opinion instead of analysing institutions and evidence.']
    },
    Sociology:{
      lens:'Sociology connects everyday life with larger institutions, structures and patterns. Question what seems “natural” and use concepts to explain how social relationships are organised and changed.',
      method:['Identify the social institution, group or process.','Apply the relevant sociological concept precisely.','Use examples or evidence across social locations.','Connect individual experience with wider structure and change.'],
      mistakes:['Treating a stereotype as sociological evidence.','Explaining a social pattern only through individual choice.','Using common-language meanings instead of the sociological concept.']
    },
    Psychology:{
      lens:'Psychology uses systematic evidence to explain behaviour and mental processes. Distinguish observation from interpretation, correlation from causation and description from diagnosis.',
      method:['Define the psychological construct or process.','Identify how it is measured or investigated.','Explain the mechanism using evidence and relevant theory.','Apply the concept carefully without overgeneralising beyond the evidence.'],
      mistakes:['Diagnosing people from a short description.','Treating correlation as proof of causation.','Ignoring research methods, context or individual variation.']
    },
    'Fine Art':{
      lens:'Art history combines close visual observation with materials, technique, patronage, symbolism and historical context. Describe what is visible before interpreting it.',
      method:['Identify the work, period, school or medium.','Describe composition, line, colour, form, material and technique.','Connect visual choices to function, patronage and historical context.','Compare works using specific visual evidence.'],
      mistakes:['Writing only biographical facts without visual analysis.','Using vague praise instead of describing formal qualities.','Assuming symbolism without contextual evidence.']
    },
    'Computer Science':{
      lens:'Computer Science rewards precise models and executable reasoning. Trace data and control flow, state assumptions, test edge cases and understand why an algorithm works.',
      method:['Define the input, output and data representation.','Break the task into an algorithm or program structure.','Trace execution on normal and edge cases.','Check correctness, efficiency, security and data integrity where relevant.'],
      mistakes:['Writing code without tracing it.','Confusing data type, value and representation.','Ignoring boundary cases, mutation or database constraints.']
    },
    'Informatics Practices':{
      lens:'Informatics Practices connects data, Python, databases and networks with real information systems. Treat data quality and responsible use as part of the technical solution.',
      method:['Identify the data and the question being answered.','Choose suitable Python, NumPy, pandas, SQL or visualisation operations.','Validate shapes, types, joins and results.','Interpret the result and consider privacy, security and bias.'],
      mistakes:['Using a tool without checking data types or missing values.','Writing SQL without considering keys and relationships.','Presenting a chart without interpreting what it actually shows.']
    }
  };

  const B=(grade,subject,book,chapters,status='Current NCERT textbook')=>({grade,subject,book,chapters,status});
  const C=(title,focus)=>[title,focus];

  const books=[
    B('Class 11','English','Hornbill',[
      C('The Portrait of a Lady','character portrait|memory and change|intergenerational relationship|narrative voice'),
      C('A Photograph','memory and loss|time|photographic image|compressed poetic voice'),
      C('We’re Not Afraid to Die... if We Can All Be Together','courage under pressure|family and teamwork|survival|first-person narrative'),
      C('Discovering Tut: the Saga Continues','archaeology and science|historical evidence|mystery and interpretation|ethics of studying the dead'),
      C('The Laburnum Top','nature imagery|movement and stillness|parent-young relationship|sound and visual detail'),
      C('The Voice of the Rain','personification|water cycle|creative renewal|dialogue form'),
      C('The Adventure','alternate history|history and probability|reason and imagination|narrative perspective'),
      C('Childhood','growing up|loss of innocence|reason and individuality|repetition'),
      C('Silk Road','travel writing|landscape and culture|physical challenge|observation'),
      C('Father to Son','generation gap|communication|distance within family|reconciliation')
    ]),
    B('Class 11','English','Snapshots',[
      C('The Summer of the Beautiful White Horse','family honour|childhood|trust|moral choice'),
      C('The Address','war and memory|loss|material objects and identity|letting go'),
      C('Mother’s Day','family roles|unpaid domestic labour|assertiveness|comic drama'),
      C('Birth','professional responsibility|crisis|persistence|human vulnerability'),
      C('The Tale of Melon City','satire|absurd government|justice|citizenship and responsibility')
    ]),
    B('Class 12','English','Flamingo',[
      C('The Last Lesson','language and identity|occupation and power|regret|education'),
      C('My Mother at Sixty-Six','ageing|fear of separation|imagery|contrast'),
      C('Lost Spring','child labour|poverty|structural inequality|hope and limitation'),
      C('Keeping Quiet','silence and reflection|peace|shared humanity|paradox'),
      C('Deep Water','fear|training and persistence|self-mastery|first-person reflection'),
      C('A Thing of Beauty','beauty and endurance|nature|hope|imagery'),
      C('The Rattrap','temptation and redemption|kindness|metaphor|human dignity'),
      C('Indigo','colonial exploitation|Gandhian leadership|civil resistance|self-reliance'),
      C('A Roadside Stand','rural inequality|development|voice and irony|economic exclusion'),
      C('Poets and Pancakes','film studio culture|satire|hierarchy|memoir'),
      C('The Interview','media and privacy|celebrity|interview as a form|multiple viewpoints'),
      C('Aunt Jennifer’s Tigers','gender and constraint|art as imagined freedom|symbolism|contrast'),
      C('Going Places','adolescent aspiration|fantasy and reality|class|characterisation')
    ]),
    B('Class 12','English','Vistas',[
      C('The Third Level','escapism|anxiety and modern life|fantasy versus reality|narrative ambiguity'),
      C('The Tiger King','satire of power|fate|arrogance|irony'),
      C('Journey to the End of the Earth','Antarctica|climate history|environmental responsibility|travel writing'),
      C('The Enemy','war and humanity|professional ethics|national loyalty|moral choice'),
      C('On the Face of It','disability and social attitudes|self-image|friendship|acceptance')
    ]),

    B('Class 11','Biology','Biology',[
      C('The Living World','characteristics of life|taxonomy|nomenclature|taxonomic categories'),
      C('Biological Classification','five-kingdom classification|Monera Protista Fungi|viruses and viroids|classification criteria'),
      C('Plant Kingdom','algae|bryophytes|pteridophytes|gymnosperms and angiosperms'),
      C('Animal Kingdom','levels of organisation|body plans|non-chordates|chordates'),
      C('Morphology of Flowering Plants','root stem leaf|inflorescence and flower|fruit and seed|plant families'),
      C('Anatomy of Flowering Plants','plant tissues|dicot and monocot anatomy|secondary growth|structure-function'),
      C('Structural Organisation in Animals','animal tissues|organ systems|structural organisation|representative animal anatomy'),
      C('Cell: The Unit of Life','cell theory|prokaryotic and eukaryotic cells|organelles|membranes'),
      C('Biomolecules','carbohydrates proteins lipids|nucleic acids|enzymes|metabolism'),
      C('Cell Cycle and Cell Division','cell cycle|mitosis|meiosis|biological significance'),
      C('Photosynthesis in Higher Plants','pigments and light reactions|Calvin cycle|C3 and C4 pathways|limiting factors'),
      C('Respiration in Plants','glycolysis|Krebs cycle|electron transport|respiratory balance'),
      C('Plant Growth and Development','growth phases|plant growth regulators|development|photoperiodism and vernalisation'),
      C('Breathing and Exchange of Gases','respiratory organs|mechanism of breathing|gas exchange and transport|regulation'),
      C('Body Fluids and Circulation','blood and lymph|heart and cardiac cycle|circulation|ECG and disorders'),
      C('Excretory Products and their Elimination','nitrogenous wastes|nephron|urine formation|osmoregulation'),
      C('Locomotion and Movement','muscle contraction|skeletal system|joints|movement disorders'),
      C('Neural Control and Coordination','neurons and impulses|central and peripheral nervous systems|reflexes|sensory reception'),
      C('Chemical Coordination and Integration','endocrine glands|hormones|feedback regulation|hormonal disorders')
    ],'NCERT reprint 2026-27'),
    B('Class 12','Biology','Biology',[
      C('Sexual Reproduction in Flowering Plants','flower structure|gametogenesis|pollination and fertilisation|seed and fruit formation'),
      C('Human Reproduction','reproductive anatomy|gametogenesis|menstrual cycle|fertilisation and development'),
      C('Reproductive Health','contraception|STIs|infertility and assisted reproduction|public health'),
      C('Principles of Inheritance and Variation','Mendelian genetics|chromosomal basis|linkage and sex determination|genetic disorders'),
      C('Molecular Basis of Inheritance','DNA and RNA|replication|transcription and translation|gene regulation and genome projects'),
      C('Evolution','origin of life|evidence|natural selection|population genetics and human evolution'),
      C('Human Health and Disease','pathogens and immunity|AIDS and cancer|allergy|public-health prevention'),
      C('Microbes in Human Welfare','food and industry|sewage treatment|biogas|biocontrol and biofertilisers'),
      C('Biotechnology: Principles and Processes','genetic engineering tools|recombinant DNA workflow|PCR|bioreactors'),
      C('Biotechnology and its Applications','medicine|agriculture|transgenic organisms|biosafety and ethics')
    ],'NCERT Reprint 2025-26 · current 10-chapter edition'),
    B('Class 11','Accountancy','Financial Accounting – I',[
      C('Introduction to Accounting','meaning and objectives|users of accounting|accounting information|basic terminology'),
      C('Theory Base of Accounting','assumptions and principles|accounting standards|GST basics|accounting equation'),
      C('Recording of Transactions – I','source documents|vouchers|debit and credit|journal'),
      C('Recording of Transactions – II','cash book|special purpose books|ledger posting|balancing'),
      C('Bank Reconciliation Statement','cash-book and pass-book differences|timing differences|reconciliation|error detection'),
      C('Trial Balance and Rectification of Errors','trial balance|types of errors|suspense account|rectification')
    ]),
    B('Class 11','Accountancy','Financial Accounting – II',[
      C('Depreciation, Provisions and Reserves','depreciation concepts|straight-line and written-down value|provisions|reserves'),
      C('Bills of Exchange','parties and terms|acceptance and discounting|dishonour|renewal and retirement'),
      C('Financial Statements – I','trading account|profit and loss account|gross and net profit|closing entries'),
      C('Financial Statements – II','adjustments|accruals and prepayments|bad debts|final accounts'),
      C('Accounts from Incomplete Records','single entry|statement of affairs|profit determination|reconstruction'),
      C('Applications of Computers in Accounting','computerised accounting|data and information|automation|controls')
    ]),
    B('Class 12','Accountancy','Accountancy Part I',[
      C('Accounting for Partnership Firms: Basic Concepts','partnership deed|profit-sharing ratio|interest on capital and drawings|guarantee of profit'),
      C('Reconstitution of a Partnership Firm – Admission of a Partner','new ratio|sacrificing ratio|goodwill|revaluation and reserves'),
      C('Reconstitution of a Partnership Firm – Retirement/Death of a Partner','gaining ratio|goodwill and revaluation|settlement|executor account'),
      C('Dissolution of Partnership Firm','realisation account|settlement order|unrecorded assets and liabilities|partner loans')
    ]),
    B('Class 12','Accountancy','Accountancy Part II',[
      C('Accounting for Share Capital','issue of shares|oversubscription|forfeiture and reissue|presentation'),
      C('Issue and Redemption of Debentures','issue conditions|interest|loss on issue|redemption treatment'),
      C('Financial Statements of a Company','company balance sheet|statement of profit and loss|Schedule III|classification'),
      C('Analysis of Financial Statements','comparative statements|common-size statements|interpretation|limitations'),
      C('Accounting Ratios','liquidity|solvency|activity|profitability'),
      C('Cash Flow Statement','operating investing financing flows|non-cash items|indirect method|interpretation')
    ]),

    B('Class 11','Business Studies','Business Studies',[
      C('Business, Trade and Commerce','business objectives|industry and commerce|trade auxiliaries|business risk'),
      C('Forms of Business Organisation','sole proprietorship|partnership|HUF|cooperatives and companies'),
      C('Private, Public and Global Enterprises','public sector forms|multinational companies|joint ventures|public-private roles'),
      C('Business Services','banking|insurance|communication|transport and warehousing'),
      C('Emerging Modes of Business','e-business|outsourcing|digital transactions|opportunities and risks'),
      C('Social Responsibilities of Business and Business Ethics','stakeholders|social responsibility|environmental protection|business ethics'),
      C('Formation of a Company','promotion|incorporation|capital subscription|documents'),
      C('Sources of Business Finance','owners and borrowed funds|shares and debentures|retained earnings|source selection'),
      C('Small Business and Enterprises','MSMEs|entrepreneurship|government support|rural enterprise'),
      C('Internal Trade','wholesale and retail trade|retail formats|documents|GST context'),
      C('International Business','international trade|export-import procedure|documents|global institutions')
    ],'NCERT reprint 2025-26'),
    B('Class 12','Business Studies','Business Studies – I',[
      C('Nature and Significance of Management','objectives|levels|functions|coordination'),
      C('Principles of Management','Fayol|Taylor|scientific management|application'),
      C('Business Environment','dimensions|policy changes|environment scanning|impact'),
      C('Planning','importance|planning process|types of plans|limitations'),
      C('Organising','organisation structure|delegation|decentralisation|formal and informal organisation'),
      C('Staffing','human-resource planning|recruitment|selection|training and development'),
      C('Directing','supervision|motivation|leadership|communication'),
      C('Controlling','standards|measurement|deviation analysis|corrective action')
    ]),
    B('Class 12','Business Studies','Business Studies – II',[
      C('Financial Management','objectives|investment financing dividend decisions|capital structure|working capital'),
      C('Financial Markets','money and capital markets|stock exchange|SEBI|financial instruments'),
      C('Marketing','marketing functions|marketing mix|product price place promotion|branding'),
      C('Consumer Protection','consumer rights|responsibilities|redressal agencies|consumer law')
    ]),

    B('Class 11','Economics','Statistics for Economics',[
      C('Introduction','economics and statistics|scope and importance|quantitative information|limitations'),
      C('Collection of Data','primary and secondary data|census and sample|sampling|sources'),
      C('Organisation of Data','variables|classification|frequency distribution|tabulation'),
      C('Presentation of Data','tables|bar and pie diagrams|histograms|frequency polygons'),
      C('Measures of Central Tendency','mean|median|mode|weighted mean|appropriate measure'),
      C('Measures of Dispersion','range|quartile deviation|mean deviation|standard deviation'),
      C('Correlation','direction and degree|scatter diagrams|correlation coefficient|interpretation'),
      C('Index Numbers','price and quantity indices|CPI|inflation measurement|limitations')
    ]),
    B('Class 11','Economics','Introductory Microeconomics',[
      C('Introduction','scarcity and choice|positive and normative economics|production possibility frontier|opportunity cost'),
      C('Theory of Consumer Behaviour','utility|budget constraint|consumer equilibrium|demand'),
      C('Production and Costs','production function|short and long run|product curves|cost concepts'),
      C('The Theory of the Firm under Perfect Competition','price-taking firm|revenue|profit maximisation|supply'),
      C('Market Equilibrium','market demand and supply|equilibrium|shifts|price controls')
    ],'NCERT text mapped to CBSE 2026-27 units'),
    B('Class 12','Economics','Introductory Macroeconomics',[
      C('Introduction','macroeconomic aggregates|sectors and circular flow|basic macro questions|stocks and flows'),
      C('National Income Accounting','value added|income and expenditure methods|GDP and related aggregates|real and nominal values'),
      C('Money and Banking','functions of money|money supply|commercial banks|central bank and credit creation'),
      C('Determination of Income and Employment','aggregate demand|consumption and saving|multiplier|equilibrium output'),
      C('Government Budget and the Economy','budget components|revenue and capital accounts|deficits|fiscal policy'),
      C('Open Economy Macroeconomics','balance of payments|foreign exchange market|exchange-rate systems|external balance')
    ]),
    B('Class 12','Economics','Indian Economic Development',[
      C('Indian Economy on the Eve of Independence','colonial economy|agriculture and industry|foreign trade|demography and infrastructure'),
      C('Indian Economy 1950–1990','planning|agriculture|industry|trade policy|public sector'),
      C('Liberalisation, Privatisation and Globalisation: An Appraisal','1991 reforms|liberalisation|privatisation|globalisation and WTO'),
      C('Human Capital Formation in India','education and health|human capital|sources|growth and development'),
      C('Rural Development','credit|agricultural marketing|diversification|organic farming and rural livelihoods'),
      C('Employment: Growth, Informalisation and Other Issues','worker participation|employment structure|informalisation|unemployment'),
      C('Environment and Sustainable Development','environmental functions|sustainable development|pollution|strategies'),
      C('Comparative Development Experiences of India and its Neighbours','India China Pakistan|growth and sectors|human development|policy comparison')
    ],'NCERT text aligned to CBSE 2026-27 assessed content'),

    B('Class 11','History','Themes in World History',[
      C('Writing and City Life','Mesopotamia|urbanisation|writing|social hierarchy and trade'),
      C('An Empire Across Three Continents','Roman Empire|administration|economy|social and religious change'),
      C('Nomadic Empires','Mongols|pastoral societies|empire building|Eurasian connections'),
      C('The Three Orders','medieval Europe|feudal society|clergy nobility peasants|change'),
      C('Changing Cultural Traditions','Renaissance|humanism|art and science|printing and reform'),
      C('Displacing Indigenous Peoples','settler colonies|land and indigenous peoples|Australia and North America|historical memory'),
      C('Paths to Modernisation','China and Japan|state reform|industrialisation|competing paths to modernity')
    ],'NCERT textbook · CBSE 2026-27 assessed themes'),
    B('Class 12','History','Themes in Indian History',[
      C('Bricks, Beads and Bones','Harappan archaeology|urbanism|craft and trade|interpreting material evidence'),
      C('Kings, Farmers and Towns','early states|agriculture and towns|inscriptions|political economy'),
      C('Kinship, Caste and Class','Mahabharata as source|kinship|varna and jati|social difference'),
      C('Thinkers, Beliefs and Buildings','Buddhism and Jainism|religious thought|stupas|architecture and patronage'),
      C('Through the Eyes of Travellers','Al-Biruni Ibn Battuta Bernier|travel accounts|society|limits of outsider perspectives'),
      C('Bhakti-Sufi Traditions','devotional traditions|saints and Sufis|language|social interaction'),
      C('An Imperial Capital: Vijayanagara','urban centre|kingship|temples|archaeological reconstruction'),
      C('Peasants, Zamindars and the State','Mughal agrarian system|zamindars|revenue|Ain-i-Akbari'),
      C('Colonialism and the Countryside','Permanent Settlement|peasants and zamindars|revenue|official records'),
      C('Rebels and the Raj','1857 revolt|causes|participants|representations'),
      C('Mahatma Gandhi and the Nationalist Movement','mass nationalism|Gandhian politics|sources|major movements'),
      C('Framing the Constitution','Constituent Assembly|debates|federalism and rights|democratic settlement')
    ],'NCERT textbook · CBSE 2026-27 assessed themes'),
    B('Class 11','Geography','Fundamentals of Physical Geography',[
      C('Geography as a Discipline','geographical questions|systematic and regional approaches|physical and human geography|spatial thinking'),
      C('The Origin and Evolution of the Earth','universe and solar system|earth formation|evolution of lithosphere atmosphere hydrosphere|life'),
      C('Interior of the Earth','sources of information|earthquakes|layers|volcanism'),
      C('Distribution of Oceans and Continents','continental drift|sea-floor spreading|plate tectonics|continental and ocean patterns'),
      C('Geomorphic Processes','endogenic and exogenic forces|weathering|mass movement|erosion and deposition'),
      C('Landforms and their Evolution','fluvial|glacial|coastal|karst and aeolian landforms'),
      C('Composition and Structure of Atmosphere','atmospheric gases|layers|ozone|vertical structure'),
      C('Solar Radiation, Heat Balance and Temperature','insolation|heat budget|temperature controls|inversion'),
      C('Atmospheric Circulation and Weather Systems','pressure belts|winds|air masses|cyclones and monsoon'),
      C('Water in the Atmosphere','humidity|condensation|clouds|precipitation'),
      C('World Climate and Climate Change','climate classification|major climate types|climate change|forcing'),
      C('Water (Oceans)','ocean-floor relief|temperature|salinity|distribution'),
      C('Movements of Ocean Water','waves|tides|currents|ocean circulation'),
      C('Biodiversity and Conservation','ecosystems|biodiversity|threats|conservation')
    ]),
    B('Class 11','Geography','India: Physical Environment',[
      C('India: Location','latitudinal and longitudinal extent|neighbours|time|strategic location'),
      C('Structure and Physiography','geological structure|Himalayas|plains|plateau coasts islands'),
      C('Drainage System','river systems|drainage patterns|Himalayan and Peninsular rivers|water issues'),
      C('Climate','monsoon mechanism|seasons|rainfall variation|climate controls'),
      C('Natural Vegetation','forest types|distribution|ecological factors|conservation'),
      C('Soils','soil formation|major soil groups|degradation|conservation'),
      C('Natural Hazards and Disasters','earthquakes floods droughts cyclones|vulnerability|mitigation|preparedness')
    ]),
    B('Class 11','Geography','Practical Work in Geography – I',[
      C('Introduction to Maps','map elements|types|symbols|spatial representation'),
      C('Map Scale','statement RF and graphical scales|conversion|distance|accuracy'),
      C('Latitude, Longitude and Time','coordinate system|time zones|local time|international date line'),
      C('Map Projections','projection properties|cylindrical conical azimuthal|distortion|selection'),
      C('Topographical Maps','contours|drainage settlements|relief|map interpretation'),
      C('Introduction to Aerial Photographs','types|scale|stereoscopic view|interpretation'),
      C('Introduction to Remote Sensing','sensors and platforms|electromagnetic spectrum|images|applications'),
      C('Weather Instruments, Maps and Charts','weather elements|instruments|station models|synoptic interpretation')
    ]),
    B('Class 12','Geography','Fundamentals of Human Geography',[
      C('Human Geography: Nature and Scope','human-environment relationship|approaches|spatial organisation|scope'),
      C('The World Population: Distribution, Density and Growth','population patterns|density|growth|demographic transition'),
      C('Human Development','capabilities|HDI|international comparison|development approaches'),
      C('Primary Activities','agriculture|pastoralism|forestry fishing mining|subsistence and commercial systems'),
      C('Secondary Activities','manufacturing|industrial location|industry types|global shifts'),
      C('Tertiary and Quaternary Activities','services|knowledge economy|outsourcing|regional patterns'),
      C('Transport, Communication and Trade','transport modes|networks|communication|trade and connectivity'),
      C('International Trade','basis of trade|balance of trade|trade organisations|ports')
    ],'NCERT textbook · CBSE 2026-27 assessed chapters'),
    B('Class 12','Geography','India: People and Economy',[
      C('Population: Distribution, Density, Growth and Composition','population patterns|growth phases|composition|regional variation'),
      C('Human Settlements','rural settlement types|urbanisation|city classification|urban issues'),
      C('Land Resources and Agriculture','land-use|cropping patterns|agricultural regions|challenges'),
      C('Water Resources','availability|irrigation|conservation|watershed management'),
      C('Mineral and Energy Resources','distribution|conventional resources|renewables|conservation'),
      C('Planning and Sustainable Development in Indian Context','planning|regional development|case studies|sustainability'),
      C('Transport and Communication','roads railways waterways airways|pipelines|communication|networks'),
      C('International Trade','trade composition|direction|ports|balance of trade'),
      C('Geographical Perspective on Selected Issues and Problems','pollution|urban waste|land degradation|regional challenges')
    ]),
    B('Class 12','Geography','Practical Work in Geography – II',[
      C('Data – Its Source and Compilation','primary secondary sources|census|sampling|data tables'),
      C('Data Processing','classification|percentages|central tendency|variability'),
      C('Graphical Representation of Data','graphs|diagrams|thematic maps|selection'),
      C('Use of Computer in Data Processing and Mapping','spreadsheets|data handling|mapping|digital workflow'),
      C('Field Surveys','survey design|questionnaires|sampling|reporting'),
      C('Spatial Information Technology','GIS|layers|spatial data|applications')
    ]),

    B('Class 11','Political Science','Indian Constitution at Work',[
      C('Constitution: Why and How?','need for constitutions|Constituent Assembly|authority|institutional design'),
      C('Rights in the Indian Constitution','fundamental rights|directive principles|remedies|rights conflicts'),
      C('Election and Representation','electoral systems|FPTP|reservation|Election Commission'),
      C('Executive','parliamentary executive|President and Prime Minister|bureaucracy|accountability'),
      C('Legislature','Parliament|law making|committees|representation and control'),
      C('Judiciary','independence|judicial review|public interest litigation|rights protection'),
      C('Federalism','division of powers|Centre-State relations|asymmetry|conflict and cooperation'),
      C('Local Governments','Panchayats and municipalities|73rd and 74th amendments|devolution|participation'),
      C('Constitution as a Living Document','amendment|basic structure|constitutional change|interpretation'),
      C('The Philosophy of the Constitution','liberty equality justice|secularism|social transformation|constitutional values')
    ]),
    B('Class 11','Political Science','Political Theory',[
      C('Political Theory: An Introduction','political concepts|reasoned debate|freedom equality justice|theory and practice'),
      C('Freedom','negative and positive liberty|constraints|harm principle|reasonable restrictions'),
      C('Equality','political social economic equality|inequality|affirmative action|difference'),
      C('Social Justice','fair distribution|recognition|needs|state action'),
      C('Rights','meaning and sources|legal and moral rights|human rights|duties'),
      C('Citizenship','membership|rights and duties|migration|equal citizenship'),
      C('Nationalism','nation and state|self-determination|pluralism|national identity'),
      C('Secularism','state and religion|Indian model|Western models|religious freedom')
    ],'NCERT textbook · CBSE 2026-27 assessed chapters'),
    B('Class 12','Political Science','Contemporary World Politics',[
      C('The End of Bipolarity','Soviet system|disintegration|post-Soviet politics|global consequences'),
      C('Contemporary Centres of Power','European Union|China|ASEAN|shifting power'),
      C('Contemporary South Asia','democratisation|conflict|India and neighbours|regional cooperation'),
      C('International Organisations','United Nations|reform|global governance|India and the UN'),
      C('Security in the Contemporary World','traditional security|non-traditional threats|cooperation|human security'),
      C('Environment and Natural Resources','global commons|resource geopolitics|environmental movements|common but differentiated responsibility'),
      C('Globalisation','economic political cultural flows|state sovereignty|resistance|India')
    ]),
    B('Class 12','Political Science','Politics in India Since Independence',[
      C('Challenges of Nation-Building','Partition|integration of princely states|linguistic reorganisation|nation building'),
      C('Era of One-Party Dominance','Congress system|elections|opposition|democratic competition'),
      C('Politics of Planned Development','planning|mixed economy|development debates|Green Revolution'),
      C('India’s External Relations','non-alignment|China and Pakistan|nuclear policy|foreign-policy choices'),
      C('Challenges to and Restoration of the Congress System','1967 elections|coalitions|Congress split|1971'),
      C('The Crisis of Democratic Order','Emergency|JP movement|civil liberties|1977 election'),
      C('Regional Aspirations','Punjab Northeast Kashmir|autonomy|federal accommodation|conflict'),
      C('Recent Developments in Indian Politics','coalition era|Mandal|Ayodhya|economic reforms and party competition')
    ]),

    B('Class 11','Sociology','Introducing Sociology',[
      C('Sociology and Society','sociological imagination|individual and society|modernity|discipline'),
      C('Terms, Concepts and their Use in Sociology','social groups|status and role|stratification|social control'),
      C('Understanding Social Institutions','family kinship|work|politics|religion and education'),
      C('Culture and Socialisation','culture|norms and values|identity|socialisation'),
      C('Doing Sociology: Research Methods','fieldwork|survey|interview|objectivity and reflexivity')
    ]),
    B('Class 11','Sociology','Understanding Society',[
      C('Social Structure, Stratification and Social Processes in Society','structure|competition conflict cooperation|stratification|social processes'),
      C('Social Change and Social Order in Rural and Urban Society','social order|change|village and city|power'),
      C('Environment and Society','social construction of environment|resource conflicts|risk|sustainability'),
      C('Introducing Western Sociologists','Marx Durkheim Weber|modernity|class division of labour authority|sociological theory'),
      C('Indian Sociologists','colonial context|caste village family|Ghurye Srinivas and others|Indian sociology')
    ]),
    B('Class 12','Sociology','Indian Society',[
      C('Introducing Indian Society','colonialism nationalism modernity|plurality|sociological perspective|continuity and change'),
      C('The Demographic Structure of the Indian Society','population|age sex ratio|demographic transition|policy'),
      C('Social Institutions: Continuity and Change','caste tribe family kinship|change|law and reform|social organisation'),
      C('Patterns of Social Inequality and Exclusion','caste tribe gender disability|prejudice|discrimination|social policy'),
      C('The Challenges of Cultural Diversity','community nation state|regionalism communalism|secularism|diversity')
    ],'NCERT textbook · CBSE 2026-27 assessed chapters'),
    B('Class 12','Sociology','Social Change and Development in India',[
      C('Structural Change','colonialism|industrialisation|urbanisation|structural transformation'),
      C('Cultural Change','Sanskritisation|Westernisation|secularisation|modernisation'),
      C('Change and Development in Rural Society','agrarian structure|land reform|Green Revolution|rural transformation'),
      C('Change and Development in Industrial Society','industrialisation|work|labour|informal sector'),
      C('Social Movements','environmental|class caste gender tribal movements|collective action|change')
    ],'NCERT textbook · CBSE 2026-27 assessed chapters'),
    B('Class 11','Psychology','Psychology',[
      C('What is Psychology?','behaviour and mental processes|schools and perspectives|applications|psychology as science'),
      C('Methods of Enquiry in Psychology','research questions|experiments observation surveys|sampling|ethics and interpretation'),
      C('Human Development','lifespan development|developmental tasks|contexts|continuity and change'),
      C('Sensory, Attentional and Perceptual Processes','sensation|attention|perception|perceptual organisation and illusions'),
      C('Learning','classical and operant conditioning|observational and cognitive learning|reinforcement|applications'),
      C('Human Memory','encoding storage retrieval|memory systems|forgetting|memory improvement'),
      C('Thinking','concepts problem solving reasoning|decision making|creative thinking|language'),
      C('Motivation and Emotion','needs and motives|theories of motivation|emotion|physiology and culture')
    ]),
    B('Class 12','Psychology','Psychology',[
      C('Variations in Psychological Attributes','intelligence aptitude creativity|assessment|individual differences|culture'),
      C('Self and Personality','self concept|personality theories|assessment|identity'),
      C('Meeting Life Challenges','stress|coping|resilience|well-being'),
      C('Psychological Disorders','classification|anxiety mood psychotic and other disorders|factors|stigma'),
      C('Therapeutic Approaches','psychodynamic behavioural cognitive humanistic therapies|biomedical approaches|rehabilitation|ethics'),
      C('Attitude and Social Cognition','attitudes|stereotypes and prejudice|impression formation|social cognition'),
      C('Social Influence and Group Processes','conformity compliance obedience|groups|cooperation and competition|leadership')
    ]),

    B('Class 11','Fine Art','An Introduction to Indian Art Part-I',[
      C('Prehistoric Rock Paintings','rock shelters|themes|materials|visual evidence'),
      C('Arts of the Indus Valley','seals sculpture pottery|materials|urban context|interpretation'),
      C('Arts of the Mauryan Period','pillars|capitals|stupas|imperial patronage'),
      C('Post-Mauryan Trends in Indian Art and Architecture','Buddhist Jain and Brahmanical art|regional schools|sculpture|architecture'),
      C('Later Mural Traditions','Ajanta and later murals|technique|narrative|regional styles'),
      C('Temple Architecture and Sculpture','Nagara Dravida Vesara|temple components|sculpture|patronage'),
      C('Indian Bronze Sculpture','lost-wax process|Chola bronzes|iconography|movement and form'),
      C('Some Aspects of Indo-Islamic Architecture','arches domes minarets|mosques tombs|regional synthesis|decoration')
    ]),
    B('Class 12','Fine Art','An Introduction to Indian Art Part-II',[
      C('The Manuscript Painting Tradition','manuscripts|materials and technique|narrative image|regional traditions'),
      C('The Rajasthani Schools of Painting','Mewar Marwar Bundi Kota Kishangarh|themes|style|patronage'),
      C('The Pahari Schools of Painting','Basohli Guler Kangra|Bhakti themes|landscape|style'),
      C('The Mughal School of Miniature Painting','atelier|portraiture and chronicle|naturalism|imperial patronage'),
      C('The Deccani Schools of Painting','Ahmadnagar Bijapur Golconda|colour and fantasy|court culture|regional style'),
      C('The Bengal School and Cultural Nationalism','Abanindranath Tagore|nationalism|wash technique|colonial context'),
      C('The Modern Indian Art','modernism|artists and movements|new media|post-independence identities')
    ]),

    B('Class 11','Computer Science','Computer Science',[
      C('Computer System','hardware and software|CPU memory and I/O|operating system|units of memory'),
      C('Encoding Schemes and Number System','binary octal hexadecimal|conversions|character encoding|Boolean values'),
      C('Emerging Trends','AI IoT cloud computing|big data|robotics|technology implications'),
      C('Introduction to Problem Solving','algorithms|flowcharts|decomposition|testing'),
      C('Getting Started with Python','syntax|variables and data types|operators|input output'),
      C('Flow of Control','conditions|loops|range|nested control'),
      C('Functions','definition and calls|parameters|scope|return values'),
      C('Strings','indexing slicing|methods|iteration|immutability'),
      C('Lists','creation and traversal|methods|slicing|nested lists'),
      C('Tuples and Dictionaries','tuple operations|mapping|dictionary methods|data modelling')
    ]),
    B('Class 11','Informatics Practices','Informatics Practices',[
      C('Computer System','hardware and software|memory|operating systems|digital data'),
      C('Emerging Trends','AI IoT cloud computing|big data|virtual reality|technology impact'),
      C('Brief Overview of Python','data types|operators|input output|control flow'),
      C('Working with Lists and Dictionaries','collection operations|iteration|methods|data organisation'),
      C('Understanding Data','data types|collection|quality|interpretation'),
      C('Introduction to NumPy','arrays|shape and dtype|vector operations|indexing'),
      C('Database Concepts','relational model|tables keys|relationships|data integrity'),
      C('Introduction to Structured Query Language (SQL)','DDL and DML|SELECT|filtering and sorting|aggregates')
    ]),
    B('Class 12','Informatics Practices','Informatics Practices',[
      C('Pandas – I','Series and DataFrames|creation|selection|attributes'),
      C('Pandas – II','data manipulation|missing values|grouping|combining data'),
      C('Plotting Data using Matplotlib','line bar histogram and other plots|labels|data selection|interpretation'),
      C('Importing/Exporting Data between CSV and DataFrames','CSV workflow|file paths|data types|validation'),
      C('MySQL and SQL','database design|queries|functions|joins and aggregation'),
      C('Introduction to Computer Networks','network types|devices|protocols|Internet and web concepts')
    ])
  ];

  const entries=[];
  for(const book of books){
    const meta=subjectMeta[book.subject];
    book.chapters.forEach(([title,focus],index)=>{
      const points=focus.split('|').map(x=>x.trim()).filter(Boolean);
      entries.push({
        id:['CBSE',book.grade,book.subject,title].join('|'),
        board:'CBSE',
        grade:book.grade,
        subject:book.subject,
        title,
        summary:`${title} is covered in NCERT’s ${book.book}. Build a connected understanding of ${points.slice(0,3).join(', ')} and practise applying those ideas rather than memorising isolated lines.`,
        keyPoints:points.map(x=>x.charAt(0).toUpperCase()+x.slice(1)+'.'),
        formulas:[],
        lens:meta.lens,
        method:[...meta.method],
        mistakes:[...meta.mistakes],
        order:index+1,
        sourceBook:book.book,
        sourcePublisher:'NCERT',
        sourceStatus:book.status,
        sourceYear:'2026-27'
      });
    });
  }

  window.CBSE_NCERT_SENIOR_SECONDARY=entries;
})();
