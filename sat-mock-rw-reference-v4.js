(function rwRefV4(){
  'use strict';
  const bank=window.StudyAISATMocks;
  if(!bank)return;
  const previous=bank.getModule.bind(bank);

  const TOPICS=[
    'urban heat mitigation','coastal bird migration','museum pigment conservation','sleep timing and memory',
    'community garden yields','coral recovery','transit reliability','historical letter archives',
    'battery recycling','concert-hall acoustics','river sediment transport','bilingual reading development',
    'microgrid reliability','pollinator corridors','ceramic dating','working-memory research',
    'food-waste policy','kelp forests','street-network design','oral-history archives',
    'water filtration','theater acoustics','volcanic soils','language acquisition',
    'wetland restoration','digital exhibits','attention research','library access',
    'seagrass meadows','bicycle networks','ship logs','circular manufacturing',
    'glacial deposits','translation studies','forest mammals','public sculpture'
  ];
  const WORDS=[
    ['qualify','limit or modify',['confirm completely','make more vivid','replace with another claim']],
    ['corroborate','support with additional evidence',['make less specific','contradict indirectly','delay publication']],
    ['temper','make less extreme',['measure precisely','cause unexpectedly','separate permanently']],
    ['substantiate','provide evidence for',['summarize briefly','criticize unfairly','predict in advance']],
    ['constrain','restrict',['clarify','accelerate','combine']],
    ['salient','especially noticeable or important',['temporary','unrelated','uncertain']],
    ['tentative','not yet certain',['widely accepted','mathematically exact','deliberately misleading']],
    ['robust','remaining strong across varied conditions',['newly developed','simple to explain','limited to one observation']],
    ['ambiguous','open to more than one interpretation',['strongly supported','easy to reproduce','numerically precise']],
    ['pragmatic','focused on practical results',['purely theoretical','based only on tradition','unusually cautious']],
    ['diminish','become smaller',['become clearer','remain unchanged','change direction']],
    ['bolster','strengthen',['narrow','reverse','postpone']],
    ['provisional','subject to later revision',['historically famous','unrelated to evidence','fully settled']],
    ['underscore','emphasize',['weaken','translate','estimate']],
    ['reconcile','make consistent with one another',['separate permanently','measure independently','dismiss as irrelevant']],
    ['circumscribe','limit the scope of',['prove beyond doubt','restate more simply','make more surprising']]
  ];

  function hash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  function int(r,a,b){return a+Math.floor(r()*(b-a+1))}
  function shuf(r,a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function ctx(test,module,index,r){
    return {topic:TOPICS[(test*7+module*11+index*5+int(r,0,5))%TOPICS.length],a:int(r,18,49),b:int(r,55,94),c:int(r,24,62),p1:int(r,18,43),p2:int(r,51,79)};
  }
  function make(q,passage,stem,correct,wrong,explanation,r,skill=q.skill){
    const options=shuf(r,[correct,...wrong]);
    return {...q,id:q.id+'-ref4',skill,passage,stem,options,answer:options.indexOf(correct),explanation,format:'mcq'};
  }

  function craft(q,k,test,module,r){
    const c=ctx(test,module,k,r), level=q.level, v=k%8;
    if(v===0){
      const [word,meaning,wrong]=WORDS[(test*5+module*3+k)%WORDS.length];
      const passage=level==='Advanced'
        ? `The researchers describe their interpretation of the ${c.topic} results as ${word}. Although it accounts for the observed pattern, they stress that an unmeasured factor could alter the conclusion once additional sites are considered.`
        : `The team's explanation of the ${c.topic} pattern was ${word}: it fit the current evidence, but the researchers expected to revise it if later measurements pointed elsewhere.`;
      return make(q,passage,`As used in the text, what does “${word}” most nearly mean?`,meaning,wrong,`In context, “${word}” means ${meaning}.`,r,'Words in Context');
    }
    if(v===1){
      const passage=`Researchers studying ${c.topic} initially expected the strongest effect at the most heavily modified sites. The largest change, however, appeared at moderately modified sites. The researchers then proposed that extreme modification may remove a condition needed for the effect to occur.`;
      const correct='It introduces a result that leads the researchers to revise their initial expectation.';
      return make(q,passage,'Which choice best describes the function of the second sentence in the text as a whole?',correct,[
        'It defines a technical term required to understand the first sentence.',
        'It dismisses the measurements as too inconsistent to interpret.',
        'It describes a second result that confirms the initial expectation.'
      ],'The second sentence conflicts with the expectation and motivates a revised explanation.',r,'Text Structure and Purpose');
    }
    if(v===2){
      const p=`Text 1\nA field study of ${c.topic} found a measurable benefit at most sites. Its authors argue that the intervention is promising because the pattern remained after several obvious site differences were considered.\n\nText 2\nA separate team also observed a benefit, but only where baseline conditions fell within a narrow range. The team cautions that the intervention should not be expected to work equally well everywhere.`;
      const correct='Both texts would agree that the intervention can have an effect, although its size may depend on local conditions.';
      return make(q,p,'Based on the texts, both authors would most likely agree with which statement?',correct,[
        'Accounting for site differences eliminates all uncertainty about the intervention.',
        'The intervention should be abandoned because it fails at some sites.',
        'Baseline conditions have no meaningful relationship to the intervention’s effect.'
      ],'Both texts allow that the intervention can work while recognizing variation by condition.',r,'Cross-Text Connections');
    }
    if(v===3){
      const p=`Text 1\nA historian argues that a sharp rise in surviving records after 1880 reflects a real expansion in public participation.\n\nText 2\nAnother historian notes that a preservation law took effect in 1881 and sharply increased the fraction of records that survived. The second historian agrees that participation may have risen but argues that the archival jump cannot be interpreted without considering preservation.`;
      const correct='Text 2 accepts that participation may have risen but argues that the archival evidence is partly confounded by a change in preservation.';
      return make(q,p,'How would the author of Text 2 most likely respond to Text 1’s interpretation?',correct,[
        'By rejecting archival evidence as unusable in all historical research',
        'By arguing that participation definitely declined after 1880',
        'By agreeing that preservation practices remained unchanged during the period'
      ],'Text 2 challenges the strength of the inference rather than denying the possible rise in participation.',r,'Cross-Text Connections');
    }
    if(v===4){
      const p=`For decades, explanations of ${c.topic} emphasized a single dominant cause. Recent work has not discarded that explanation; instead, it has shown that the cause interacts with local conditions in ways earlier models did not represent.`;
      const correct='It reframes an older explanation by adding a qualification rather than rejecting it.';
      return make(q,p,'Which choice best describes the overall structure of the text?',correct,[
        'It replaces an older explanation with an unrelated one.',
        'It lists competing explanations without evaluating them.',
        'It shifts from scientific evidence to a personal anecdote.'
      ],'The newer work narrows and qualifies the older account.',r,'Text Structure and Purpose');
    }
    if(v===5){
      const p=`The archive on ${c.topic} is extensive, but surviving records are unevenly distributed across decades. A historian therefore treats apparent changes in activity cautiously: a decade with fewer surviving documents may reflect preservation rather than a real decline.`;
      const correct='It explains why an apparent archival pattern may not correspond to an actual historical change.';
      return make(q,p,'What is the main function of the second sentence?',correct,[
        'It identifies the decade in which activity was greatest.',
        'It argues that all surviving records should be excluded from analysis.',
        'It claims that preservation conditions were identical across decades.'
      ],'The sentence identifies a limitation that complicates interpretation of the archive.',r,'Text Structure and Purpose');
    }
    if(v===6){
      const p=`One group investigating ${c.topic} emphasizes average outcomes across many sites. Another focuses on rare sites where the intervention failed entirely. Taken together, the studies suggest that a typical effect and the conditions under which that effect breaks down are both informative.`;
      const correct='To argue that average outcomes and unusual failures can provide complementary information.';
      return make(q,p,'Which choice best states the purpose of the text?',correct,[
        'To show that the groups used identical experimental methods',
        'To argue that rare failures make average outcomes meaningless',
        'To establish that only the larger study should be considered'
      ],'The passage presents averages and exceptions as complementary evidence.',r,'Text Structure and Purpose');
    }
    const [word,meaning,wrong]=WORDS[(test*9+module*7+k)%WORDS.length];
    const p=`The review does not dismiss the proposed explanation for ${c.topic}; instead, it seeks to ${word} the claim by identifying the conditions under which the explanation is most likely to hold.`;
    return make(q,p,'Which choice most logically and precisely completes the text?',word,wrong.map(x=>x.split(' ')[0]),`The context requires a word meaning “${meaning}.”`,r,'Words in Context');
  }

  function info(q,k,test,module,r){
    const c=ctx(test,module,k,r), v=k%7;
    if(v===0){
      const p=`A team studying ${c.topic} compared sites before and after a policy change. Average response increased at most sites, but the largest increases occurred where baseline values had been lowest. Because sites were not randomly assigned to receive the policy, the researchers avoided claiming that the policy alone caused the change.`;
      const correct='The policy was associated with improvement, especially at low-baseline sites, but the design does not establish that the policy was the sole cause.';
      return make(q,p,'Which choice best states the main idea of the text?',correct,[
        'The policy had no measurable association with the response.',
        'Low-baseline sites were removed from the analysis.',
        'Random assignment showed that the policy caused identical effects at all sites.'
      ],'The text reports an association while explicitly limiting causal interpretation.',r,'Central Ideas and Details');
    }
    if(v===1){
      const p=`Researchers predicted that a feature of ${c.topic} would improve performance. Sites with the feature averaged ${c.b} units, while matched sites without it averaged ${c.a} units. The feature was also more common at newer sites, which differed from older sites in several other ways.`;
      const correct='The results are consistent with the prediction, but differences associated with site age could partly explain the observed gap.';
      return make(q,p,'Which conclusion is most strongly supported by the text?',correct,[
        'The feature must reduce performance at newer sites.',
        'Site age cannot affect the result because the sites were matched.',
        'The data prove that the feature is the only cause of the difference.'
      ],'The feature is associated with the outcome, but site age remains a plausible confounder.',r,'Inferences');
    }
    if(v===2){
      const before=int(r,42,68), treated=before+int(r,12,24), comp0=before-int(r,1,5), comp1=comp0+int(r,2,8), g1=treated-before, g2=comp1-comp0;
      const p=`A researcher claims that an intervention increased a measure of ${c.topic}.\n\nGroup | Before | After\nIntervention | ${before} | ${treated}\nComparison | ${comp0} | ${comp1}`;
      const correct=`The intervention group increased by ${g1} units, compared with an increase of ${g2} units in the comparison group.`;
      return make(q,p,'Which choice most effectively uses the data to support the researcher’s claim?',correct,[
        'Both groups changed by approximately the same amount.',
        'The comparison group ended with the larger value.',
        `The intervention group began ${g1} units above the comparison group.`
      ],'The strongest support compares the amount of change in the two groups.',r,'Command of Evidence: Quantitative');
    }
    if(v===3){
      const p=`After observing that sites with greater ${c.topic} coverage had lower summer temperatures, researchers proposed that the coverage itself contributed to cooling.`;
      const correct='When otherwise similar sites are compared, sites where coverage is experimentally increased show larger temperature decreases than untreated sites.';
      return make(q,p,'Which finding would most directly strengthen the researchers’ causal interpretation?',correct,[
        'Residents at high-coverage sites report preferring the appearance of those sites.',
        'High-coverage sites tend to occur in older neighborhoods.',
        'The same model of thermometer is used at every site.'
      ],'An intervention with a comparison condition supplies stronger causal evidence.',r,'Command of Evidence: Textual');
    }
    if(v===4){
      const p=`In a survey about ${c.topic}, ${c.p1}% of respondents in one random sample supported a proposed change. In a second independently drawn sample using the same wording, ${c.p2}% supported it.`;
      const correct='The difference between the samples illustrates why one sample percentage may not precisely represent the broader population.';
      return make(q,p,'Which conclusion is best supported by the text?',correct,[
        `The second sample proves that exactly ${c.p2}% of the population supports the change.`,
        'The first sample must have used different question wording.',
        'Random sampling eliminates sampling variability.'
      ],'Independent random samples can differ because of sampling variability.',r,'Inferences');
    }
    if(v===5){
      const a=int(r,40,60), b=a+int(r,8,17), d=a+int(r,2,7), gainA=b-a, gainB=d-(a+1);
      const p=`A study compared three versions of a training program. Group A improved from ${a} to ${b} points, Group B improved from ${a+1} to ${d} points, and a no-training group changed from ${a-2} to ${a} points. Researchers argue that Version A produced an improvement beyond ordinary retesting effects.`;
      const correct=`Group A improved by ${gainA} points, compared with ${gainB} points for Group B and 2 points for the no-training group.`;
      return make(q,p,'Which choice most effectively uses the data to support the researchers’ argument?',correct,[
        'All three groups improved by approximately the same amount.',
        'Group B had the largest improvement because its final score exceeded the no-training group.',
        'The no-training group improved more than Group A.'
      ],'The relevant comparison is the amount of change, not merely the final score.',r,'Command of Evidence: Quantitative');
    }
    const p=`A literary critic notes that a novel about ${c.topic} repeatedly shifts from broad descriptions of a city to brief observations by a single character. The critic argues that these shifts place large social changes beside their immediate effects on individual lives.`;
    const correct='The changes in narrative scale help connect social conditions with personal experience.';
    return make(q,p,'Which choice best states the critic’s main point?',correct,[
      'The novel avoids discussing social change directly.',
      'The individual observations are unrelated to the city descriptions.',
      'The critic believes the novel should use only one narrative scale.'
    ],'The critic presents the shifts in scale as a way of connecting social and individual experience.',r,'Central Ideas and Details');
  }

  function sec(q,k,test,module,r){
    const c=ctx(test,module,k,r), v=k%7;
    const items=[
      [`The first analysis of ${c.topic} suggested a strong relationship _____ a larger replication produced a much smaller effect.`,'; however,',[', however,',': however,',', however;'],'Boundaries','Two independent clauses are joined with a semicolon, and the conjunctive adverb is followed by a comma.'],
      [`Neither the initial estimate nor the later measurements of ${c.topic} _____ sufficient on their own to establish a causal relationship.`,'are',['is','was being','has been'],'Form, Structure, and Sense','The nearer subject “measurements” is plural, so the verb is “are.”'],
      [`The study had one central limitation _____ it measured short-term responses but not long-term persistence.` ,':',[',','; because','— and'],'Boundaries','A colon can introduce an explanation after an independent clause.'],
      [`Collected over nearly twenty years, the records on ${c.topic} _____ researchers to distinguish short-lived fluctuations from longer trends.`,'allow',['allows','allowing','has allowed'],'Form, Structure, and Sense','The plural subject “records” requires the plural verb “allow.”'],
      [`The device, which was designed for field measurements _____ remained stable across a wide range of temperatures.` ,',',[';',':',''],'Boundaries','The nonessential relative clause must be closed with a comma.'],
      [`By the time the final survey on ${c.topic} was administered, the team _____ the wording twice in response to pilot feedback.`,'had revised',['revises','has revised','will revise'],'Form, Structure, and Sense','Past perfect shows that the revisions occurred before another past event.'],
      [`The revised instrument measured three outcomes _____ accuracy, response time, and retention after one week.` ,':',[',',';','— and'],'Boundaries','A colon correctly introduces the list after a complete clause.']
    ];
    const [p,correct,wrong,skill,explanation]=items[v];
    return make(q,p,'Which choice completes the text so that it conforms to the conventions of Standard English?',correct,wrong,explanation,r,skill);
  }

  function expression(q,k,test,module,r){
    const c=ctx(test,module,k,r), v=k%5;
    if(v===0){
      const rows=[
        ['However,',['Therefore,','For example,','Similarly,'],'the first trial produced a clear increase','a replication under drier conditions showed almost no change','contrast'],
        ['Therefore,',['Nevertheless,','Meanwhile,','For example,'],'the revised sensor reduced measurement error by more than half','the researchers could compare small differences with greater confidence','result'],
        ['For example,',['Instead,','Consequently,','Nevertheless,'],'several design details can change how people respond to a space','moving a sign by a few meters can alter which route visitors choose','example'],
        ['Nevertheless,',['Likewise,','For example,','Consequently,'],'the initial sample was geographically narrow','the pattern remained visible after the researchers expanded the data set','concession']
      ];
      const [correct,wrong,a,b,relation]=rows[(test+module+k)%rows.length];
      const p=`${a.charAt(0).toUpperCase()+a.slice(1)} in the study of ${c.topic}. _____ ${b}.`;
      return make(q,p,'Which choice completes the text with the most logical transition?',correct,wrong,`The ideas have a ${relation} relationship.`,r,'Transitions');
    }
    if(v===1){
      const p=`A student took these notes:\n• An early study of ${c.topic} included ${c.a} sites.\n• A later replication included ${c.b} sites in three regions.\n• Both studies used the same primary outcome measure.\n• The student wants to emphasize how the evidence base became broader while preserving comparability.`;
      const correct=`A later replication expanded the study from ${c.a} to ${c.b} sites across three regions while retaining the same primary outcome measure.`;
      return make(q,p,'Which choice most effectively uses information from the notes to accomplish the student’s goal?',correct,[
        `Researchers have studied ${c.topic} using several methods over time.`,
        'The later replication included three regions, and the earlier study was conducted first.',
        'Both studies produced data and were described in published reports.'
      ],'The correct choice emphasizes both expansion and methodological comparability.',r,'Rhetorical Synthesis');
    }
    if(v===2){
      const low=int(r,12,27), high=low+int(r,18,35);
      const p=`A student took these notes:\n• A materials team tested a coating related to ${c.topic}.\n• Untreated samples lost ${high}% of their strength after repeated exposure.\n• Treated samples lost ${low}%.\n• The student wants to emphasize the practical significance of the treatment.`;
      const correct=`Because treated samples lost only ${low}% of their strength compared with ${high}% for untreated samples, the coating substantially improved durability under repeated exposure.`;
      return make(q,p,'Which choice most effectively uses information from the notes to accomplish the student’s goal?',correct,[
        'The team tested both treated and untreated samples in the same project.',
        'Repeated exposure can affect the strength of some materials.',
        'The coating was one of several materials considered by the research team.'
      ],'The correct choice uses the quantitative contrast to establish significance.',r,'Rhetorical Synthesis');
    }
    if(v===3){
      const p=`A student took these notes:\n• Researchers studying ${c.topic} used satellite measurements from 2005–2015.\n• They later added ground measurements from 2016–2025.\n• The ground measurements offered finer local detail.\n• The student wants to emphasize how the later phase complemented, rather than replaced, the earlier evidence.`;
      const correct='The later ground measurements added finer local detail to the broad satellite record, complementing the earlier evidence rather than replacing it.';
      return make(q,p,'Which choice most effectively uses information from the notes to accomplish the student’s goal?',correct,[
        'Ground measurements are always more accurate than satellite measurements.',
        'The researchers stopped using all information collected before 2016.',
        'The project used two date ranges and two kinds of measurement.'
      ],'The correct choice explicitly presents the sources as complementary.',r,'Rhetorical Synthesis');
    }
    const dry=16+test+module, humid=2+((test+module)%4);
    const p=`A student wants to emphasize a contrast between two findings.\n• In dry conditions, the intervention increased output by ${dry}%.\n• In humid conditions, the intervention changed output by only ${humid}%.\n• The same measurement procedure was used in both conditions.`;
    const correct=`Although the intervention increased output by ${dry}% in dry conditions, it changed output by only ${humid}% in humid conditions.`;
    return make(q,p,'Which choice most effectively uses information from the notes to accomplish the student’s goal?',correct,[
      'The same measurement procedure was used in dry and humid conditions.',
      'Researchers tested an intervention under two environmental conditions.',
      'The intervention was measured using percentages in both conditions.'
    ],'The correct choice foregrounds the contrast in effect size.',r,'Rhetorical Synthesis');
  }

  bank.getModule=function(test,section,module,route='mixed'){
    const qs=previous(test,section,module,route);
    if(section!=='Reading & Writing')return qs;
    const r=rng(hash(`rw-ref-v4-${test}-${module}-${route}`)), counts={};
    return qs.map(q=>{
      const d=q.domain, k=counts[d]||0; counts[d]=k+1;
      const shifted=k+(module-1)*3+Number(test);
      if(d==='Craft and Structure')return craft(q,shifted,Number(test),Number(module),r);
      if(d==='Information and Ideas')return info(q,shifted,Number(test),Number(module),r);
      if(d==='Standard English Conventions')return sec(q,shifted,Number(test),Number(module),r);
      if(d==='Expression of Ideas')return expression(q,shifted,Number(test),Number(module),r);
      return q;
    });
  };
  bank.version=4;
  bank.referenceCalibration=Object.assign({},bank.referenceCalibration||{},{
    corpusQuestions:1363,
    rwProfile:{easy:{medianBodyWords:91},medium:{medianBodyWords:167},hard:{medianBodyWords:177}}
  });
})();