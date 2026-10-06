/* StudyAI CBSE / NCERT 2026-27 authoritative refresh.
 * Source basis: the user's NCERT PDF library, checked against current CBSE course mapping.
 * This file intentionally stores original StudyAI study notes, not copied textbook prose.
 */
(() => {
  'use strict';

  const SOURCE_STATUS='Verified against the 2026-27 NCERT PDF set supplied for StudyAI';
  const SOURCE_YEAR='2026-27';

  const subjectMeta={
    'English':{
      lens:'Read for meaning first. Then examine voice, structure, character, imagery, context and the writer’s choices. Support interpretations with precise evidence instead of retelling the text.',
      method:['Identify the central situation, speaker, conflict or argument.','Track how ideas, characters or images develop.','Explain how language, structure or point of view creates meaning.','Support the interpretation with specific evidence in your own words.'],
      mistakes:['Retelling the text instead of analysing it.','Naming a device without explaining its effect.','Making a theme claim without evidence.']
    },
    'English Elective':{
      lens:'Treat each literary work as an argument made through form, voice and language. Compare interpretations and use close textual evidence.',
      method:['Establish genre, speaker or narrator and central tension.','Trace patterns in image, diction, structure and character.','Connect form to theme and context.','Build an interpretation from precise evidence.'],
      mistakes:['Summarising instead of interpreting.','Using context as a substitute for textual analysis.','Listing devices without explaining their effect.']
    },
    'Hindi':{
      lens:'पाठ को केवल कथानक के रूप में न पढ़ें। केंद्रीय भाव, पात्र, भाषा-शैली, प्रसंग, प्रतीक और लेखक की दृष्टि को प्रमाण के साथ समझें।',
      method:['पाठ का केंद्रीय भाव और प्रसंग पहचानें।','मुख्य घटनाओं, पात्रों या काव्य-बिंबों का विकास समझें।','भाषा, शैली और रचना-विधान का प्रभाव स्पष्ट करें।','उत्तर में पाठ से सटीक उदाहरण या संकेत दें।'],
      mistakes:['केवल कहानी दोहराना।','भाव या संदेश लिखकर प्रमाण न देना।','लेखक, पात्र या प्रसंगों को मिलाना।']
    },
    'Hindi Course A':{
      lens:'हिंदी पाठों में कथ्य, भाषा-शैली, पात्र, काव्य-बिंब और सामाजिक-सांस्कृतिक संदर्भ को जोड़कर पढ़ें।',
      method:['केंद्रीय भाव पहचानें।','रचना-विधान और भाषा की भूमिका समझें।','प्रमुख पात्रों, घटनाओं या बिंबों को जोड़ें।','उत्तर को पाठ-साक्ष्य से समर्थन दें।'],
      mistakes:['सिर्फ सार लिखना।','लेखक और रचना को मिलाना।','संदर्भ के बिना पंक्ति का अर्थ लिखना।']
    },
    'Hindi Course B':{
      lens:'पाठ का आशय, भाषा और जीवन-संदर्भ साथ पढ़ें। गद्य में कथ्य और पात्र, कविता में भाव, बिंब, लय और वक्ता पर ध्यान दें।',
      method:['मुख्य विचार या संघर्ष पहचानें।','महत्वपूर्ण घटनाओं या काव्य-बिंबों को क्रम में रखें।','भाषा-शैली का प्रभाव समझाएँ।','पाठ-साक्ष्य से उत्तर पूरा करें।'],
      mistakes:['कथानक को विश्लेषण समझ लेना।','कविता में केवल भावार्थ लिखना।','प्रश्न के निर्देश शब्द को अनदेखा करना।']
    },
    'Hindi Core':{
      lens:'हिंदी कोर में साहित्यिक समझ के साथ अभिव्यक्ति भी महत्त्वपूर्ण है। पाठ का भाव, संदर्भ, शिल्प और वैचारिक पक्ष जोड़कर पढ़ें।',
      method:['रचना का केंद्रीय कथ्य पहचानें।','भाषा, शिल्प और दृष्टिकोण का प्रभाव समझें।','प्रमुख प्रसंगों को विषय से जोड़ें।','उत्तर को पाठ के प्रमाण और स्पष्ट निष्कर्ष से पूरा करें।'],
      mistakes:['पाठ का सार लिखकर प्रश्न छोड़ देना।','कवि या लेखक की दृष्टि को पात्र की दृष्टि समझ लेना।','उत्तर में प्रमाण न देना।']
    },
    'Hindi Elective':{
      lens:'हिंदी ऐच्छिक में गहन साहित्यिक पठन अपेक्षित है। रचना, काल, विधा, भाषा, दृष्टिकोण और आलोचनात्मक व्याख्या को साथ रखें।',
      method:['विधा और साहित्यिक संदर्भ पहचानें।','कथ्य या काव्य-विचार का विकास देखें।','भाषा और शिल्प की विशिष्टता स्पष्ट करें।','वैकल्पिक व्याख्याओं को पाठ-साक्ष्य से परखें।'],
      mistakes:['लेखक-परिचय को उत्तर का मुख्य भाग बनाना।','रचना के शिल्प को अनदेखा करना।','बिना प्रमाण के सामान्य कथन करना।']
    },
    'Sanskrit Core':{
      lens:'पाठ का अर्थ, व्याकरण, समास-संधि, प्रसंग और सांस्कृतिक विचार साथ पढ़ें। श्लोक या गद्यांश का अर्थ शब्द-स्तर और वाक्य-स्तर दोनों पर स्पष्ट करें।',
      method:['पदच्छेद और प्रमुख शब्दार्थ पहचानें।','रूप, कारक, धातु या समास की भूमिका समझें।','प्रसंग और मुख्य विचार जोड़ें।','अनुवाद या व्याख्या को व्याकरण से जाँचें।'],
      mistakes:['केवल शब्दार्थ याद करना।','विभक्ति या क्रिया-रूप की भूमिका अनदेखी करना।','प्रसंग से अलग अनुवाद करना।']
    },
    'Sanskrit Elective':{
      lens:'साहित्यिक संस्कृत में अर्थ के साथ शैली, छन्द, अलंकार, व्याकरण और ग्रन्थ-संदर्भ पर ध्यान दें।',
      method:['पाठ का स्रोत और प्रसंग पहचानें।','पदच्छेद, अन्वय और व्याकरण करें।','काव्य या गद्य की शैलीगत विशेषता समझें।','मुख्य विचार को प्रमाण सहित व्यक्त करें।'],
      mistakes:['अन्वय के बिना शब्द-शब्द अनुवाद।','रूप और कारक की त्रुटि।','साहित्यिक संदर्भ को अनदेखा करना।']
    },
    'Social Science':{
      lens:'Social Science rewards explanation with evidence. Connect events, places, institutions and economic choices, and distinguish cause from consequence.',
      method:['Identify the key question, period, place or institution.','Organise evidence into causes, features, consequences and comparisons.','Use maps, examples or data where relevant.','Link the evidence back to the question.'],
      mistakes:['Memorising isolated facts.','Confusing chronology, scale or institutions.','Giving opinion where evidence is required.']
    },
    'Economics':{
      lens:'Economics combines concepts, models, data and real-world interpretation. Define the economic idea precisely, show the relationship between variables or institutions, and use diagrams or statistics only when they help answer the question.',
      method:['Identify the economic concept, agents and variables involved.','Choose the right model, diagram, statistic or chain of reasoning.','Explain the direction and cause of each relationship.','Interpret the result in economic terms and note important assumptions.'],
      mistakes:['Using everyday meanings instead of economic definitions.','Drawing or quoting a diagram without explaining the mechanism.','Confusing correlation, causation, movement along a curve and a shift of the curve.']
    },
    'Accountancy':{
      lens:'Accountancy is a traceable system. Every entry should follow the accounting equation, the relevant principle and the correct reporting treatment.',
      method:['Identify the transaction or adjustment.','Determine accounts and debit-credit effects.','Record and post systematically.','Verify balances and statement impact.'],
      mistakes:['Choosing debit or credit by memory alone.','Ignoring adjustments or accounting periods.','Forcing totals instead of finding the error.']
    },
    'Business Studies':{
      lens:'Link management and business concepts to real organisational decisions. Learn purpose, process, advantages, limitations and application.',
      method:['Define the concept in context.','Break it into features, process or functions.','Apply it to a realistic case.','Justify the most suitable response.'],
      mistakes:['Listing features without applying them.','Confusing closely related management terms.','Giving generic advantages for a specific case.']
    },
    'Biology':{
      lens:'Connect structure, process and function. Use diagrams, sequences, comparisons and cause-effect reasoning instead of isolated memorisation.',
      method:['Identify the biological level and process.','Trace inputs, structures, steps and outputs.','Connect structure with function and regulation.','Check the explanation with diagrams, examples or evidence.'],
      mistakes:['Mixing similar biological terms.','Memorising a pathway without location or purpose.','Ignoring regulation or exceptions.']
    },
    'Geography':{
      lens:'Connect spatial patterns with physical and human processes. Read maps and data alongside concepts and explain why a pattern occurs where it does.',
      method:['Locate the phenomenon and scale.','Identify the processes involved.','Use maps, graphs, field data or examples.','Connect pattern, process and consequence.'],
      mistakes:['Describing a map without explaining it.','Ignoring scale or regional variation.','Treating data as self-explanatory.']
    },
    'Computer Science':{
      lens:'Computer Science rewards precise algorithmic thinking. Trace data, state and control flow, test edge cases, and connect code with the underlying data structure, database or network model.',
      method:['Identify inputs, outputs, state and constraints.','Trace the algorithm or program step by step.','Test normal, boundary and error cases.','Explain why the result follows from the underlying concept, not only the syntax.'],
      mistakes:['Tracing code without tracking changing state.','Memorising syntax without understanding the data model or algorithm.','Ignoring edge cases, errors or resource constraints.']
    },
    'Informatics Practices':{
      lens:'Informatics Practices connects data handling, SQL, visualisation, networks and responsible digital behaviour. Use small datasets and queries to explain what each operation changes and why.',
      method:['Identify the data structure, table, network concept or digital issue.','Apply the relevant operation or query with correct syntax and conditions.','Check the output against the data and constraints.','Interpret the result and note data-quality, privacy or ethical implications where relevant.'],
      mistakes:['Confusing Series, DataFrames and database tables.','Writing SQL without checking grouping, joins or null values.','Treating a graph or digital-safety rule as self-explanatory.']
    },
    'Sociology':{
      lens:'Connect everyday life with institutions, structures and social change. Use concepts to explain patterns instead of relying on stereotypes.',
      method:['Identify the institution, group or process.','Apply the sociological concept precisely.','Use examples across social locations.','Connect individual experience with wider structure.'],
      mistakes:['Treating stereotypes as evidence.','Explaining a social pattern only through individual choice.','Using everyday meanings instead of sociological concepts.']
    }
  };

  const cap=s=>s?String(s).charAt(0).toUpperCase()+String(s).slice(1):'';
  const defaultFocus=(subject,title)=>{
    if(subject.includes('Hindi')) return ['केंद्रीय भाव और प्रसंग','भाषा-शैली और रचना-विधान','प्रमुख पात्र, बिंब या विचार','पाठ-साक्ष्य पर आधारित व्याख्या'];
    if(subject.includes('Sanskrit')) return ['मुख्य शब्दार्थ और अन्वय','व्याकरणिक रूप और प्रयोग','प्रसंग तथा केंद्रीय विचार','शैली, श्लोक या गद्य की व्याख्या'];
    if(subject.includes('English')) return ['central idea and conflict','voice, character or speaker','language and structure','evidence-based interpretation'];
    const by={
      'Accountancy':['core accounting treatment','steps and records','adjustments and presentation','verification and common errors'],
      'Business Studies':['meaning and purpose','features or process','case application','advantages, limits and decisions'],
      'Biology':['key structures','process sequence','function and regulation','diagrams, examples and applications'],
      'Geography':['spatial pattern','process and causes','maps or data','consequences and regional variation'],
      'Sociology':['key concept','institution or structure','evidence and examples','social change and implications'],
      'Social Science':['key concepts','causes and features','evidence or examples','consequences and comparisons']
    };
    return by[subject]||['central concept','key relationships','application','common exam distinctions'];
  };

  const make=(grade,subject,book,title,index,focus=[],extra={})=>{
    const meta=subjectMeta[subject]||subjectMeta['Social Science'];
    const points=(focus.length?focus:defaultFocus(subject,title)).map(cap);
    const isLang=/English|Hindi|Sanskrit/.test(subject);
    return {
      id:['CBSE',grade,subject,book,title].join('|'),
      board:'CBSE',grade,subject,title,
      summary:isLang
        ? `${title} is studied from NCERT’s ${book}. Build a clear understanding of the text’s central idea, structure and language, then support interpretation with evidence from the chapter.`
        : `${title} is covered in NCERT’s ${book}. Build a connected understanding of ${points.slice(0,3).join(', ').toLowerCase()} and practise applying those ideas.`,
      keyPoints:points.map(x=>x.endsWith('.')?x:x+'.'),
      formulas:extra.formulas||[],
      lens:meta.lens,method:[...meta.method],mistakes:[...meta.mistakes],
      order:index+1,sourceBook:book,sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS,sourceYear:SOURCE_YEAR,
      ...extra
    };
  };

  const entries=[];
  const add=(grade,subject,book,chapters)=>{
    chapters.forEach((row,i)=>{
      const title=Array.isArray(row)?row[0]:row;
      const focus=Array.isArray(row)&&Array.isArray(row[1])?row[1]:[];
      const extra=Array.isArray(row)&&row[2]?row[2]:{};
      entries.push(make(grade,subject,book,title,i,focus,extra));
    });
  };

  // Grade 9, new NCERT books released in 2026.
  add('Class 9','English','Kaveri · English for Grade 9',[
    ['How I Taught My Grandmother to Read · Bharat Our Land',['literacy, determination and independence','intergenerational learning','belonging and national identity','diversity and shared responsibility']],
    ['The Pot Maker · Gifts of Grace: Honouring Our Vocations',['craft knowledge and skilled work','learning through practice','dignity of labour','respect across vocations']],
    ['Winds of Change · Canvas of Soil',['change and adaptation','resilience during transition','people, land and livelihood','responsibility toward natural resources']],
    ['Vitamin-M · I Cannot Remember My Mother',['relationships and emotional support','memory and loss','sensory imagery','tone and perspective']],
    ['The World of Limitless Possibilities · Nine Gold Medals',['aspiration and perseverance','barriers and opportunity','sportsmanship and empathy','humanity beyond competition']],
    ['Twin Melodies · A Friend Found in Music',['music and identity','discipline and creativity','friendship and belonging','art as communication']],
    ['Carrier of Words · Words',['communication and meaning','power and precision of language','tone and connotation','responsibility in using words']],
    ['Follow That Dream · Believe in Yourself',['goals and perseverance','self-belief grounded in effort','responding to setbacks','turning aspiration into action']]
  ]);

  add('Class 9','Social Science','Understanding Society: India and Beyond · Part 1',[
    ['Understanding Social Science',['purpose and methods of social science','evidence and interpretation','connections among disciplines','asking social questions']],
    ['Shaping of the Earth’s Surface',['endogenic and exogenic processes','weathering, erosion and deposition','major landforms','human interaction with landforms']],
    ['Atmosphere and Climate',['composition and structure of atmosphere','temperature, pressure and winds','moisture and rainfall','weather versus climate']],
    ['Early Humans and Beginning of Civilisation',['human evolution and adaptation','hunter-gatherer life','agriculture and settlement','early civilisation and evidence']],
    ['State and Society up to 1000 CE',['state formation','social organisation','economy and exchange','sources for early Indian history']],
    ['Democracy',['meaning and principles of democracy','institutions and participation','rights and accountability','democratic values']],
    ['Elections',['purpose of elections','representation and choice','electoral process','free and fair elections']],
    ['Building Blocks in Economics: The Problem of Choice',['scarcity and choice','needs, wants and resources','opportunity cost','economic decision-making']],
    ['The Price Puzzle: What Drives the Market',['demand and supply','price signals','buyers and sellers','market outcomes']]
  ]);

  add('Class 9','Hindi','गंगा',[
    'दो बैलों की कथा','क्या लिखूँ?','संवादहीन','ऐसी भी बातें होती हैं','आखिरी चट्टान तक','रीढ़ की हड्डी','मैं और मेरा देश','पद','राम-लक्ष्मण-परशुराम संवाद','भारति, जय, विजय करे!','झाँसी की रानी','घर की याद'
  ]);

  // Class 10 Hindi is split into the two CBSE courses.
  add('Class 10','Hindi Course A','क्षितिज भाग 2',[
    'सूरदास','तुलसीदास','जयशंकर प्रसाद','सूर्यकांत त्रिपाठी ‘निराला’','नागार्जुन','मंगलेश डबराल','नेताजी का चश्मा','बालगोबिन भगत','लखनवी अंदाज़','एक कहानी यह भी','नौबतखाने में इबादत','संस्कृति'
  ]);
  add('Class 10','Hindi Course A','कृतिका भाग 2',['माता का अँचल','साना-साना हाथ जोड़ि...','मैं क्यों लिखता हूँ?']);
  add('Class 10','Hindi Course B','स्पर्श भाग 2',[
    'कबीर — साखियाँ','मीरा — पद','मैथिलीशरण गुप्त — मनुष्यता','सुमित्रानंदन पंत — पर्वत प्रदेश में पावस','वीरेन डंगवाल — तोप','कैफ़ी आज़मी — कर चले हम फ़िदा','रवींद्रनाथ ठाकुर — आत्मत्राण','प्रेमचंद — बड़े भाई साहब','सीताराम सेकसरिया — डायरी का एक पन्ना','लीलाधर मंडलोई — तताँरा-वामीरो कथा','प्रह्लाद अग्रवाल — तीसरी कसम के शिल्पकार शैलेंद्र','निदा फ़ाज़ली — अब कहाँ दूसरे के दुख से दुखी होने वाले','रवींद्र केलेकर — पतझर में टूटी पत्तियाँ','हबीब तनवीर — कारतूस'
  ]);
  add('Class 10','Hindi Course B','संचयन भाग 2',['हरिहर काका','टोपी शुक्ला','सपनों के-से दिन']);

  // Senior-secondary corrections proven by the supplied current NCERT editions.

  add('Class 11','Economics','Statistics for Economics',[
    ['Introduction',['meaning and scope of economics','role and importance of statistics in economics','economic data and evidence','limits of statistical conclusions']],
    ['Collection of Data',['primary and secondary data','sampling and census methods','sources of economic data','sampling and non-sampling errors']],
    ['Organisation of Data',['variables and classification','frequency distributions','raw versus organised data','choosing meaningful class intervals']],
    ['Presentation of Data',['tabular presentation','bar and pie diagrams','histograms and frequency polygons','reading displays without distorting scale']],
    ['Measures of Central Tendency',['arithmetic mean','median','mode','choosing an appropriate average']],
    ['Correlation',['direction and degree of association','scatter diagrams','correlation coefficient','correlation versus causation']],
    ['Index Numbers',['meaning and uses of index numbers','base year and weights','price indices','interpreting inflation and change over time']],
    ['Use of Statistical Tools',['selecting a suitable statistical tool','connecting data with an economic question','interpreting results in context','limits and responsible use of statistics']]
  ]);
  add('Class 11','Economics','Introductory Microeconomics',[
    ['Introduction',['microeconomics and macroeconomics','positive and normative economics','central problems of an economy','production possibility frontier and opportunity cost']],
    ['Theory of Consumer Behaviour',['utility and consumer equilibrium','budget set and budget line','indifference curves','demand and price elasticity']],
    ['Production and Costs',['production function','short run and long run','total, average and marginal product','cost concepts and cost curves']],
    ['The Theory of the Firm under Perfect Competition',['perfect competition assumptions','revenue concepts','profit maximisation','producer equilibrium and supply']],
    ['Market Equilibrium',['market demand and supply','equilibrium price and quantity','shifts in demand or supply','simple applications of price determination']]
  ]);

  add('Class 11','Accountancy','Financial Accounting – I',[
    'Introduction to Accounting','Theory Base of Accounting','Recording of Transactions - I','Recording of Transactions - II','Bank Reconciliation Statement','Trial Balance and Rectification of Errors','Depreciation, Provisions and Reserves'
  ]);
  add('Class 11','Accountancy','Financial Accounting – II',['Financial Statements - I','Financial Statements - II']);

  add('Class 11','Business Studies','Business Studies',[
    'Business, Trade and Commerce','Forms of Business Organisation','Private, Public and Global Enterprises','Business Services','Emerging Modes of Business','Social Responsibilities of Business and Business Ethics','Formation of a Company','Sources of Business Finance','MSME and Business Entrepreneurship','Internal Trade','International Business'
  ]);

  add('Class 11','Geography','Fundamentals of Physical Geography',[
    'Geography as a Discipline','The Origin and Evolution of the Earth','Interior of the Earth','Distribution of Oceans and Continents','Geomorphic Processes','Landforms and their Evolution','Composition and Structure of Atmosphere','Solar Radiation, Heat Balance and Temperature','Atmospheric Circulation and Weather Systems','Water in the Atmosphere','World Climate and Climate Change','Water (Oceans)','Movements of Ocean Water','Biodiversity and Conservation'
  ]);
  add('Class 11','Geography','India: Physical Environment',[
    'India — Location','Structure and Physiography','Drainage System','Climate','Natural Vegetation','Natural Hazards and Disasters'
  ]);
  add('Class 11','Geography','Practical Work in Geography – I',[
    'Introduction to Maps','Map Scale','Latitude, Longitude and Time','Map Projections','Topographical Maps','Introduction to Remote Sensing'
  ]);

  // Class 12 computing books verified directly against current NCERT 2026-27 contents.
  add('Class 12','Computer Science','Computer Science',[
    ['Exception Handling in Python',['syntax and runtime errors','built-in and raised exceptions','try-except-else-finally flow','robust error-handling strategy']],
    ['File Handling in Python',['text, binary and CSV files','open modes and context management','read, write, seek and tell','structured file operations']],
    ['Stack',['LIFO data structure','push, pop and peek operations','Python-list implementation','infix, postfix and expression evaluation']],
    ['Queue',['FIFO data structure','enqueue and dequeue operations','Python implementation','double-ended queue and use cases']],
    ['Sorting',['bubble sort','selection sort','insertion sort','comparison of passes and time complexity']],
    ['Searching',['linear search','binary search and sorted-data requirement','hash-based search idea','time-complexity comparison']],
    ['Understanding Data',['data collection and storage','data processing','descriptive statistical techniques','data quality and interpretation']],
    ['Database Concepts',['database versus file system','DBMS purpose and advantages','relational data model','keys and integrity']],
    ['Structured Query Language (SQL)',['DDL and DML','constraints and data types','SELECT filtering grouping and functions','joins and operations on relations']],
    ['Computer Networks',['network types and evolution','network devices','topologies','Internet, web, IoT and DNS']],
    ['Data Communication',['communication components','bandwidth and data rate','switching and transmission media','protocols and mobile generations']],
    ['Security Aspects',['common online-safety risks','protective software and firewalls','secure web connections and cookies','safe network practices']],
    ['Project Based Learning',['problem definition','decomposition and project planning','teamwork and testing','documentation and presentation']]
  ]);

  add('Class 12','Informatics Practices','Informatics Practices',[
    ['Querying and SQL Functions',['SQL functions','GROUP BY and aggregate queries','operations on relations','queries using two relations']],
    ['Data Handling using Pandas - I',['Python libraries','Series creation and selection','DataFrame creation and indexing','CSV import and export']],
    ['Data Handling using Pandas - II',['descriptive statistics','aggregation and grouping','sorting and index changes','missing values and Pandas-MySQL data exchange']],
    ['Plotting Data using Matplotlib',['plot construction','line, bar and histogram choices','labels legends and customisation','Pandas plotting and interpretation']],
    ['Internet and Web',['computer-network basics','network devices and topologies','Internet services','websites, web servers, hosting and browsers']],
    ['Societal Impacts',['digital footprints and netiquette','data privacy and protection','copyright and responsible digital conduct','e-waste and health impacts']],
    ['Project Based Learning',['problem definition','dataset or database planning','implementation and testing','teamwork, documentation and presentation']]
  ]);

  add('Class 12','Biology','Biology',[
    'Sexual Reproduction in Flowering Plants','Human Reproduction','Reproductive Health','Principles of Inheritance and Variation','Molecular Basis of Inheritance','Evolution','Human Health and Disease','Microbes in Human Welfare','Biotechnology: Principles and Processes','Biotechnology and its Applications','Organisms and Populations','Ecosystem','Biodiversity and Conservation'
  ]);

  add('Class 12','Business Studies','Business Studies – I',[
    'Nature and Significance of Management','Principles of Management','Business Environment','Planning','Organising','Staffing','Directing','Controlling'
  ]);
  add('Class 12','Business Studies','Business Studies – II',['Financial Management','Marketing','Consumer Protection']);

  add('Class 12','Geography','Fundamentals of Human Geography',[
    'Human Geography: Nature and Scope','The World Population: Distribution, Density and Growth','Human Development','Primary Activities','Secondary Activities','Tertiary and Quaternary Activities','Transport and Communication','International Trade'
  ]);
  add('Class 12','Geography','India: People and Economy',[
    'Population: Distribution, Density, Growth and Composition','Human Settlements','Land Resources and Agriculture','Water Resources','Mineral and Energy Resources','Planning and Sustainable Development in Indian Context','Transport and Communication','International Trade','Geographical Perspective on Selected Issues and Problems'
  ]);
  add('Class 12','Geography','Practical Work in Geography – II',[
    'Data – Its Source and Compilation','Data Processing','Graphical Representation of Data','Spatial Information Technology'
  ]);

  add('Class 12','Sociology','Indian Society',[
    'Introducing Indian Society','The Demographic Structure of the Indian Society','Social Institutions: Continuity and Change','The Market as a Social Institution','Patterns of Social Inequality and Exclusion','The Challenges of Cultural Diversity','Suggestions for Project Work'
  ]);
  add('Class 12','Sociology','Social Change and Development in India',[
    'Structural Change','Cultural Change','The Constitution and Social Change','Change and Development in Rural Society','Change and Development in Industrial Society','Globalisation and Social Change','Mass Media and Communications','Social Movements'
  ]);

  // One missing chapter in the current Class 12 English Core supplementary reader.
  add('Class 12','English','Vistas',[['Memories of Childhood',['identity and discrimination','childhood experience and resistance','dignity and social inequality','contrasting autobiographical voices']]]);

  // English Elective, directly from Woven Words and Kaleidoscope.
  add('Class 11','English Elective','Woven Words · Short Stories',[
    'The Lament','A Pair of Mustachios','The Rocking-horse Winner','The Adventure of the Three Garridebs','Pappachi’s Moth','The Third and Final Continent','Glory at Twilight','The Luncheon'
  ]);
  add('Class 11','English Elective','Woven Words · Poetry',[
    'The Peacock','Let me Not to the Marriage of True Minds','Coming','Telephone Conversation','The World is too Much With Us','Mother Tongue','Hawk Roosting','For Elkana','Refugee Blues','Felling of the Banyan Tree','Ode to a Nightingale','Ajamil and the Tigers'
  ]);
  add('Class 11','English Elective','Woven Words · Essays',[
    'My Watch','My Three Passions','Patterns of Creativity','Tribal Verse','What is a Good Book?','The Story','Bridges'
  ]);

  add('Class 12','English Elective','Kaleidoscope · Short Stories',[
    'I Sell My Dreams','Eveline','A Wedding in Brownsville','Tomorrow','One Centimetre'
  ]);
  add('Class 12','English Elective','Kaleidoscope · Poetry',[
    'A Lecture Upon the Shadow','Poems by Milton','Poems by Blake','Kubla Khan','Trees','The Wild Swans at Coole','Time and Time Again','Blood'
  ]);
  add('Class 12','English Elective','Kaleidoscope · Non-fiction',[
    'Freedom','The Mark on the Wall','Film-making','Why the Novel Matters','The Argumentative Indian','On Science Fiction'
  ]);
  add('Class 12','English Elective','Kaleidoscope · Drama',['Chandalika','Broken Images']);

  // Hindi Core and Elective, mapped to the books present in the supplied Drive.
  add('Class 11','Hindi Core','आरोह भाग 1',[
    'नमक का दारोगा','मियाँ नसीरुद्दीन','अपू के साथ ढाई साल','विदाई-संभाषण','गलता लोहा','रजनी','जामुन का पेड़','भारत माता','कबीर','मीरा','भवानी प्रसाद मिश्र','त्रिलोचन','दुष्यंत कुमार','अक्क महादेवी','पाश','निर्मला पुतुल'
  ]);
  add('Class 11','Hindi Core','वितान भाग 1',['भारतीय गायिकाओं में बेजोड़: लता मंगेशकर','राजस्थान की रजत बूँदें','आलो-आँधारि','भारतीय कलाएँ']);

  add('Class 11','Hindi Elective','अंतरा भाग 1',[
    'ईदगाह','दोपहर का भोजन','टार्च बेचनेवाले','गूँगे','ज्योतिबा फुले','खानाबदोश','उसकी माँ','भारतवर्ष की उन्नति कैसे हो सकती है?','कबीर','सूरदास','देव','सुमित्रानंदन पंत','महादेवी वर्मा','नागार्जुन','श्रीकांत वर्मा','धूमिल'
  ]);
  add('Class 11','Hindi Elective','अंतराल भाग 1',['हुसैन की कहानी अपनी जबानी','आवारा मसीहा']);

  add('Class 12','Hindi Core','आरोह भाग 2',[
    'आत्म-परिचय, एक गीत','पतंग','कविता के बहाने, बात सीधी थी पर','कैमरे में बंद अपाहिज','उषा','बादल राग','कवितावली (उत्तर कांड से), लक्ष्मण-मूर्छा और राम का विलाप','रुबाइयाँ','छोटा मेरा खेत, बगुलों के पंख','भक्तिन','बाज़ार दर्शन','काले मेघा पानी दे','पहलवान की ढोलक','शिरीष के फूल','श्रम-विभाजन और जाति-प्रथा, मेरी कल्पना का आदर्श समाज'
  ]);
  add('Class 12','Hindi Core','वितान भाग 2',['सिल्वर वैडिंग','जूझ','अतीत में दबे पाँव']);

  add('Class 12','Hindi Elective','अंतरा भाग 2',[
    'जयशंकर प्रसाद — देवसेना का गीत; कार्नेलिया का गीत','सूर्यकांत त्रिपाठी ‘निराला’ — गीत गाने दो मुझे; सरोज-स्मृति','अज्ञेय — यह दीप अकेला; मैंने देखा एक बूँद','केदारनाथ सिंह — बनारस; दिशा','रघुवीर सहाय — बसंत आया; तोड़ो','तुलसीदास','मलिक मुहम्मद जायसी','विद्यापति','घनानंद','रामचंद्र शुक्ल','पंडित चंद्रधर शर्मा गुलेरी','फणीश्वरनाथ रेणु','भीष्म साहनी','असगर वजाहत','निर्मल वर्मा','ममता कालिया','हज़ारी प्रसाद द्विवेदी'
  ]);
  add('Class 12','Hindi Elective','अंतराल भाग 2',['सूरदास की झोंपड़ी','बिस्कोहर की माटी','अपना मालवा — खाऊ-उजाड़ू सभ्यता में']);

  // Sanskrit Core and Elective, current rationalised chapter files in the Drive.
  add('Class 11','Sanskrit Core','भास्वती भाग 1',[
    'कुशलप्रशासनम्','सूक्तिसुधा','ऋतुचर्या','वीरः सर्वदमनः','शुकशावकोदन्तः','भव्यः सत्याग्रहाश्रमः','संगीतानुरागी सुब्बण्णः','वस्त्रविक्रयः','यद्भूतहितं तत्सत्यम्','स मे प्रियः','अथ शिक्षां प्रवक्ष्यामि'
  ]);
  add('Class 11','Sanskrit Elective','शाश्वती भाग 1',[
    'वेदामृतम्','परोपकाराय सतां विभूतयः','मानो हि महतां धनम्','सौवर्णशकटिका','आहारविचारः','सन्ततिप्रबोधनम्','विज्ञाननौका','कन्थामाणिक्यम्','ईशः कुत्रास्ति','सत्त्वमाहो रजस्तमः','नवद्रव्याणि'
  ]);
  add('Class 12','Sanskrit Core','भास्वती भाग 2',[
    'अनुशासनम्','मातुराज्ञा गरीयसी','प्रजानुरञ्जको नृपः','दौवारिकस्य निष्ठा','सूक्ति-सौरभम्','नैकेनापि समं गता वसुमती','हल्दीघाटी','मदालसा','कार्याकार्यव्यवस्थितिः','विद्यास्थानानि'
  ]);
  add('Class 12','Sanskrit Elective','शाश्वती भाग 2',[
    'विद्ययाऽमृतमश्नुते','रघुकौत्ससंवादः','बालकौतुकम्','कर्मगौरवम्','शुकनासोपदेशः','सूक्तिसुधा','विक्रमस्यौदार्यम्','कार्यं वा साधयेयं, देहं वा पातयेयम्','दीनबन्धुः श्रीनायारः','योगस्य वैशिष्ट्यम्','कथं शब्दानुशासनं कर्तव्यम्'
  ]);

  // These scopes are intentionally replaced because the supplied current books
  // prove the older StudyAI lists are stale or structured incorrectly.
  window.CBSE_NCERT_REPLACEMENTS=[
    {grade:'Class 9',subject:'English'},
    {grade:'Class 9',subject:'Social Science'},
    {grade:'Class 9',subject:'Hindi'},
    {grade:'Class 10',subject:'Hindi Course A'},
    {grade:'Class 10',subject:'Hindi Course B'},
    {grade:'Class 11',subject:'Economics'},
    {grade:'Class 11',subject:'Accountancy'},
    {grade:'Class 11',subject:'Business Studies'},
    {grade:'Class 11',subject:'Geography'},
    {grade:'Class 11',subject:'English Elective'},
    {grade:'Class 11',subject:'Hindi Core'},
    {grade:'Class 11',subject:'Hindi Elective'},
    {grade:'Class 11',subject:'Sanskrit Core'},
    {grade:'Class 11',subject:'Sanskrit Elective'},
    {grade:'Class 12',subject:'Biology'},
    {grade:'Class 12',subject:'Business Studies'},
    {grade:'Class 12',subject:'Geography'},
    {grade:'Class 12',subject:'Sociology'},
    {grade:'Class 12',subject:'English Elective'},
    {grade:'Class 12',subject:'Hindi Core'},
    {grade:'Class 12',subject:'Hindi Elective'},
    {grade:'Class 12',subject:'Sanskrit Core'},
    {grade:'Class 12',subject:'Sanskrit Elective'}
  ];

  window.CBSE_NCERT_PATCHES=[
    {grade:'Class 9',subject:'Mathematics',sourceBook:'Ganita Manjari · Parts I & II',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 9',subject:'Science',sourceBook:'Exploration · Textbook of Science for Grade 9',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 10',subject:'Mathematics',sourceBook:'Mathematics · Class X',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 10',subject:'Science',sourceBook:'Science · Class X',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 11',subject:'Physics',sourceBook:'Physics · Parts I & II',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 11',subject:'Chemistry',sourceBook:'Chemistry · Parts I & II',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 11',subject:'Mathematics',sourceBook:'Mathematics · Class XI',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 12',subject:'Physics',sourceBook:'Physics · Parts I & II',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 12',subject:'Chemistry',sourceBook:'Chemistry · Parts I & II',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS},
    {grade:'Class 12',subject:'Mathematics',sourceBook:'Mathematics · Parts I & II',sourceYear:'2026-27',sourcePublisher:'NCERT',sourceStatus:SOURCE_STATUS}
  ];

  window.CBSE_NCERT_EXTRA=entries;
})();