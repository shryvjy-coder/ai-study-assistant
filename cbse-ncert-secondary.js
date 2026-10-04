/* StudyAI CBSE / NCERT secondary expansion.
 * Chapter titles follow current NCERT textbook structures verified for 2026-27.
 * Notes are original StudyAI summaries, not copied textbook prose.
 */
(() => {
  'use strict';

  const meta={
    English:{
      lens:'Read for meaning first, then examine character, voice, structure, imagery, context and the writer’s choices. Literature answers should be supported by specific events or details without retelling the whole text.',
      method:['Identify the central situation, speaker or conflict.','Track how characters, ideas or images develop across the text.','Connect language and structure to theme and effect.','Support an interpretation with precise textual evidence in your own words.'],
      mistakes:['Retelling the plot instead of analysing meaning.','Naming a device without explaining its effect.','Making a theme claim that is not supported by the text.']
    },
    'Social Science':{
      lens:'Social Science rewards explanation with evidence. Connect events, places, institutions and economic choices, distinguish cause from consequence, and use maps, examples and data where they genuinely support the argument.',
      method:['Identify the key question, period, place or institution.','Organise evidence into causes, features, consequences and comparisons.','Use examples, maps, data or case studies where relevant.','Finish by linking the evidence back to the question instead of listing facts.'],
      mistakes:['Memorising isolated facts without explaining relationships.','Confusing chronology, scale or institutions.','Giving an opinion where the question requires evidence and explanation.']
    }
  };

  const books=[
    {
      grade:'Class 9',subject:'English',book:'Kaveri · English for Grade 9',sourceStatus:'NCERT Grade 9 textbook, 2026-27',
      chapters:[
        ['How I Taught My Grandmother to Read','literacy and determination|intergenerational learning|dignity in becoming independent|the changing relationship between teacher and learner'],
        ['Bharat Our Land','belonging and national identity|geographical and cultural diversity|shared responsibility|unity without erasing difference'],
        ['The Pot Maker','craft knowledge and skill|work, patience and precision|learning through practice|respect for traditional vocations'],
        ['Gifts of Grace: Honouring Our Vocations','dignity of labour|different forms of contribution|service and community|respect across occupations'],
        ['Winds of Change','change and adaptation|social or personal transformation|resilience|choices during transition'],
        ['Canvas of Soil','land and livelihood|connection between people and place|observation of the natural world|responsibility toward resources'],
        ['Vitamin-M','relationships and emotional support|humour and perspective|everyday well-being|how language shapes tone'],
        ['I Cannot Remember My Mother','memory and loss|sensory images|childhood and affection|how absence can be represented through remembered details'],
        ['The World of Limitless Possibilities','curiosity and aspiration|growth through learning|barriers and opportunity|turning possibility into purposeful action'],
        ['Nine Gold Medals','sportsmanship and empathy|competition versus humanity|solidarity|the meaning of victory'],
        ['Twin Melodies','music and identity|parallel experiences|discipline and creativity|connection through artistic expression'],
        ['A Friend Found in Music','friendship and belonging|music as communication|confidence|shared interests creating connection'],
        ['Carrier of Words','communication and meaning|how words travel between people|responsibility in language|interpretation and misunderstanding'],
        ['Words','power and precision of language|tone and connotation|language shaping relationships|choosing words deliberately'],
        ['Follow That Dream','goals and perseverance|self-belief|effort over time|responding to setbacks'],
        ['Believe in Yourself','confidence grounded in effort|inner voice and motivation|courage to act|balancing belief with preparation']
      ]
    },
    {
      grade:'Class 10',subject:'English',book:'First Flight · Prose',sourceStatus:'NCERT current rationalised text',
      chapters:[
        ['A Letter to God','faith and hope|irony|human generosity|expectation versus reality'],
        ['Nelson Mandela: Long Walk to Freedom','freedom and responsibility|apartheid and injustice|courage|individual and collective liberty'],
        ['Two Stories about Flying','fear and confidence|risk and independence|learning through action|contrasting experiences of flight'],
        ['From the Diary of Anne Frank','diary as self-expression|adolescence and identity|school life|voice, honesty and reflection'],
        ['Glimpses of India','regional diversity|food, landscape and livelihood|travel writing|local culture within a larger national picture'],
        ['Mijbil the Otter','human-animal relationship|observation of behaviour|adaptation|affection without romanticising wild animals'],
        ['Madam Rides the Bus','curiosity and independence|childhood perspective|planning and self-control|encountering the wider world'],
        ['The Sermon at Benares','mortality and grief|Buddhist teaching|acceptance|universal experience of loss'],
        ['The Proposal','comic conflict|marriage and social convention|argument and misunderstanding|dramatic irony']
      ]
    },
    {
      grade:'Class 10',subject:'English',book:'First Flight · Poems',sourceStatus:'NCERT current rationalised text',
      chapters:[
        ['Dust of Snow','small moments changing mood|nature imagery|contrast|economy of language'],
        ['Fire and Ice','desire and hatred|symbolism|destructive emotions|compressed argument'],
        ['A Tiger in the Zoo','freedom versus captivity|movement and stillness|imagery|ethical questions about confinement'],
        ['How to Tell Wild Animals','humour and exaggeration|comic danger|rhyme and tone|parody of instructional writing'],
        ['The Ball Poem','loss and growing up|attachment|responsibility|learning through experience'],
        ['Amanda!','pressure and freedom|childhood imagination|repetition|contrast between commands and inner escape'],
        ['The Trees','freedom and confinement|personification|movement|nature reclaiming space'],
        ['Fog','extended metaphor|brief imagery|movement and mystery|precision'],
        ['The Tale of Custard the Dragon','appearance versus courage|humour|ballad-like storytelling|irony'],
        ['For Anne Gregory','appearance and identity|love and perception|surface versus inner self|dialogue form']
      ]
    },
    {
      grade:'Class 10',subject:'English',book:'Footprints Without Feet',sourceStatus:'NCERT current rationalised supplementary reader',
      chapters:[
        ['A Triumph of Surgery','care versus overindulgence|responsibility|comic observation|health and routine'],
        ['The Thief’s Story','trust and reform|moral choice|education as opportunity|first-person narration'],
        ['The Midnight Visitor','intelligence over appearance|presence of mind|suspense|misdirection'],
        ['A Question of Trust','deception and overconfidence|irony|crime and consequence|appearance versus reality'],
        ['Footprints without Feet','science without ethics|isolation|abuse of power|consequences of invisibility'],
        ['The Making of a Scientist','curiosity and method|observation|persistence|how questions become investigations'],
        ['The Necklace','appearance and status|choices and consequences|irony|social aspiration'],
        ['Bholi','education and self-respect|social prejudice|confidence|agency'],
        ['The Book That Saved the Earth','satire and misunderstanding|language|science-fiction comedy|how assumptions shape interpretation']
      ]
    },
    {
      grade:'Class 10',subject:'Social Science',book:'India and the Contemporary World – II · History',sourceStatus:'NCERT reprint 2025-26',
      chapters:[
        ['The Rise of Nationalism in Europe','French Revolution and nation-state ideas|liberalism and conservatism|unification of Germany and Italy|nationalism and imperial rivalry'],
        ['Nationalism in India','First World War context|Gandhian mass movements|different social groups and nationalism|limits and symbols of national unity'],
        ['The Making of a Global World','pre-modern exchange|nineteenth-century migration and trade|interwar disruption|post-war institutions and globalisation'],
        ['The Age of Industrialisation','proto-industrial production|factories and labour|industrialisation in India|markets, advertising and consumption'],
        ['Print Culture and the Modern World','print revolution|reading publics|religious and political debate|print, reform and nationalism in India']
      ]
    },
    {
      grade:'Class 10',subject:'Social Science',book:'Contemporary India – II · Geography',sourceStatus:'NCERT current rationalised text',
      chapters:[
        ['Resources and Development','resource classification|sustainable development|land use and degradation|soil types and conservation'],
        ['Forest and Wildlife Resources','biodiversity|depletion and conservation|protected species and habitats|community participation'],
        ['Water Resources','water scarcity|multipurpose projects|rainwater harvesting|conflicts and sustainable management'],
        ['Agriculture','farming systems|major crops|technological and institutional change|food security and agricultural challenges'],
        ['Minerals and Energy Resources','mineral occurrence and distribution|conventional energy|non-conventional energy|conservation'],
        ['Manufacturing Industries','importance and location factors|agro and mineral industries|industrial pollution|sustainable industrial practices'],
        ['Lifelines of National Economy','transport networks|communication|trade|tourism and economic integration']
      ]
    },
    {
      grade:'Class 10',subject:'Social Science',book:'Democratic Politics – II · Political Science',sourceStatus:'NCERT current rationalised text',
      chapters:[
        ['Power Sharing','Belgium and Sri Lanka comparisons|prudential and moral reasons|forms of power sharing|democratic accommodation'],
        ['Federalism','levels of government|federal features|language policy|decentralisation and local government'],
        ['Gender, Religion and Caste','social divisions|gender inequality|communalism and secularism|caste and politics'],
        ['Political Parties','functions and necessity|party systems|national and regional parties|challenges and reforms'],
        ['Outcomes of Democracy','accountable government|economic outcomes|inequality and dignity|how democratic performance should be evaluated']
      ]
    },
    {
      grade:'Class 10',subject:'Social Science',book:'Understanding Economic Development · Economics',sourceStatus:'NCERT reprint 2026-27',
      chapters:[
        ['Development','different development goals|income and other indicators|public facilities|sustainability'],
        ['Sectors of the Indian Economy','primary secondary tertiary sectors|organised and unorganised work|public and private sectors|employment and disguised unemployment'],
        ['Money and Credit','functions of money|formal and informal credit|terms of credit|self-help groups and financial inclusion'],
        ['Globalisation and the Indian Economy','multinational corporations|production networks|liberalisation|effects of globalisation on producers and workers'],
        ['Consumer Rights','consumer protection|information and choice|standardisation|redressal and responsible consumer action']
      ]
    }
  ];

  const entries=[];
  for(const book of books){
    const m=meta[book.subject]||meta['Social Science'];
    book.chapters.forEach(([title,focus],index)=>{
      const points=focus.split('|').map(x=>x.trim()).filter(Boolean);
      entries.push({
        id:['CBSE',book.grade,book.subject,title].join('|'),
        board:'CBSE',grade:book.grade,subject:book.subject,title,
        summary:`${title} is studied through the NCERT book ${book.book}. Focus on ${points.slice(0,3).join(', ')} and connect those ideas rather than memorising isolated lines.`,
        keyPoints:points.map(x=>x.charAt(0).toUpperCase()+x.slice(1)+'.'),
        formulas:[],
        lens:m.lens,method:[...m.method],mistakes:[...m.mistakes],
        order:index+1,sourceBook:book.book,sourcePublisher:'NCERT',sourceStatus:book.sourceStatus,sourceYear:'2026-27'
      });
    });
  }
  window.CBSE_NCERT_SECONDARY=entries;
})();
