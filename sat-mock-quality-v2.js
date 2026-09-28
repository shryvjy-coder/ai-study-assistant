(function mockQualityUpgrade(){
  'use strict';

  const base=window.StudyAISATMocks;
  if(!base) return;

  const TEST_TOPICS=[
    ['urban heat','migratory birds','museum conservation','sleep timing','community gardens','coral recovery','transit reliability','historical letters','battery recycling','concert-hall acoustics','river sediments','bilingual learning'],
    ['microgrids','pollinator corridors','ceramic archives','working memory','food-waste policy','kelp forests','street design','oral histories','water filtration','theater acoustics','volcanic soils','language acquisition'],
    ['cool roofs','wetland restoration','digital exhibits','attention research','library access','seagrass meadows','bike networks','ship logs','material reuse','auditorium design','glacial deposits','translation studies'],
    ['cool pavements','forest mammals','public sculpture','decision research','school meals','reef monitoring','rail schedules','census records','circular manufacturing','soundscapes','desert soils','reading development']
  ];

  const VOCAB=[
    ['qualify','limit or modify','reject completely','repeat word for word','make more emotional'],
    ['corroborate','support with additional evidence','make less precise','replace with a hypothesis','hide from review'],
    ['temper','make less extreme','measure precisely','cause unexpectedly','separate permanently'],
    ['substantiate','provide evidence for','summarize briefly','criticize unfairly','predict in advance'],
    ['constrain','restrict','clarify','accelerate','combine'],
    ['salient','especially noticeable or important','uncertain','unrelated','temporary'],
    ['tentative','not yet certain','very detailed','widely accepted','deliberately misleading'],
    ['robust','remaining strong under varied conditions','unusually simple','recently invented','limited to one case'],
    ['ambiguous','open to more than one interpretation','supported by many trials','easy to reproduce','statistically impossible'],
    ['pragmatic','focused on practical results','based only on tradition','purely theoretical','deliberately cautious'],
    ['diminish','become smaller','become clearer','remain unchanged','change direction'],
    ['intricate','having many interrelated parts','incorrect','temporary','widely known'],
    ['bolster','strengthen','narrow','reverse','postpone'],
    ['provisional','subject to later revision','mathematically exact','historically famous','unrelated to evidence'],
    ['sparse','thinly distributed','highly reliable','evenly measured','unexpectedly large'],
    ['yield','produce or provide','refuse to consider','hide','compare'],
    ['account for','explain','ignore','measure','contradict'],
    ['underscore','emphasize','weaken','translate','estimate']
  ];

  function hash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  function shuf(r,a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function pick(r,a){return a[Math.floor(r()*a.length)%a.length]}
  function int(r,min,max){return min+Math.floor(r()*(max-min+1))}
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const x=a%b;a=b;b=x}return a||1}
  function frac(n,d){const g=gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d}return d===1?String(n):n+'/'+d}
  function round(n,p=2){const f=10**p;return Math.round((n+Number.EPSILON)*f)/f}
  function id(t,s,m,r,i){return `mockq2-${t}-${s==='Math'?'m':'r'}${m}-${r}-${i+1}`}

  function levelAt(i,n,route){
    const p=(i+.5)/n;
    if(route==='hard') return p<.20?'Medium':'Advanced';
    if(route==='medium') return p<.08?'Foundation':p<.52?'Medium':'Advanced';
    if(route==='easy') return p<.20?'Foundation':p<.72?'Medium':'Advanced';
    return p<.08?'Foundation':p<.55?'Medium':'Advanced';
  }

  function mcq(id,section,domain,skill,level,stem,options,correct,explanation,passage=''){
    return {id,section,domain,skill,level,stem,options,answer:options.indexOf(correct),explanation,passage,format:'mcq'};
  }

  function spr(id,domain,skill,level,stem,correct,explanation,accepted=[]){
    return {id,section:'Math',domain,skill,level,stem,options:[],answer:null,correctAnswer:String(correct),acceptedAnswers:[String(correct),...accepted.map(String)],explanation,passage:'',format:'spr'};
  }

  function numericMCQ(qid,domain,skill,level,stem,correct,wrongs,explanation,r){
    const values=[String(correct),...wrongs.map(String)].filter((v,i,a)=>a.indexOf(v)===i);
    let bump=1;
    while(values.length<4){values.push(String(Number(correct)+bump++))}
    const options=shuf(r,values.slice(0,4));
    return mcq(qid,'Math',domain,skill,level,stem,options,String(correct),explanation);
  }

  function rwContext(t,m,i,r){
    const topic=TEST_TOPICS[t-1][(i*3+m*5+t+int(r,0,5))%TEST_TOPICS[t-1].length];
    const a=int(r,18,46), b=a+int(r,5,18), c=b-int(r,2,9);
    return {topic,a,b,c,p1:int(r,24,43),p2:int(r,51,76)};
  }

  function craftQuestion(t,m,route,i,j,level,r){
    const c=rwContext(t,m,i,r), qid=id(t,'Reading & Writing',m,route,i), variant=(t+m+j)%2;

    if(j===0||j===4){
      const [word,meaning,...wrong]=VOCAB[(t*5+m*4+i*3)%VOCAB.length];
      const options=shuf(r,[meaning,...wrong]);
      const passage=level==='Advanced'
        ? `The authors describe their interpretation of the ${c.topic} results as ${word}. The interpretation explains the observed pattern, but the authors emphasize that an unmeasured factor could alter the conclusion when additional sites are considered.`
        : `The team's explanation of the ${c.topic} pattern was ${word}: it fit the present evidence, but the researchers expected to revise it if later measurements pointed elsewhere.`;
      const stem=variant?`Which choice most logically and precisely describes what “${word}” means in the text?`:`As used in the text, what does “${word}” most nearly mean?`;
      return mcq(qid,'Reading & Writing','Craft and Structure','Words in Context',level,stem,options,meaning,`In this context, “${word}” means ${meaning}.`,passage);
    }

    if(j===1){
      const passage=`Researchers studying ${c.topic} initially expected the strongest effect at heavily modified sites. The largest change, however, appeared at moderately modified sites, where the measured response rose from ${c.a} to ${c.b} units. The researchers then proposed that extreme modification may remove a condition needed for the effect to occur.`;
      const correct='It presents a result that causes the researchers to revise their initial expectation.';
      const options=shuf(r,[correct,'It provides a definition required to understand the first sentence.','It dismisses the measurements as too inconsistent to interpret.','It describes a second experiment that confirms the original expectation.']);
      return mcq(qid,'Reading & Writing','Craft and Structure','Text Structure and Purpose',level,'Which choice best describes the function of the second sentence in the text as a whole?',options,correct,'The second sentence conflicts with the original expectation and motivates a revised explanation.',passage);
    }

    if(j===2||j===6){
      const p1=`Text 1\nA field study of ${c.topic} found a measurable benefit at most sites. Its authors argue that the intervention is promising because the pattern persisted after several obvious differences among sites were taken into account.`;
      const p2=`Text 2\nA separate team studying ${c.topic} also observed a benefit, but only where baseline conditions fell within a narrow range. The team cautions that the intervention should not be expected to work equally well everywhere.`;
      const correct=j===2
        ? 'Both texts would agree that the intervention can have an effect, although its size may depend on local conditions.'
        : 'The author of Text 2 would likely accept Text 1’s evidence while questioning how broadly its conclusion should be applied.';
      const options=shuf(r,j===2
        ? [correct,'Both texts argue that baseline conditions have no influence on outcomes.','Both texts conclude that the intervention should be abandoned.','Both texts claim that accounting for site differences eliminates all uncertainty.']
        : [correct,'The author of Text 2 would reject the measurements in Text 1 as irrelevant.','The author of Text 2 would argue that Text 1 proves identical effects at all sites.','The author of Text 2 would claim that field studies cannot support any useful interpretation.']);
      return mcq(qid,'Reading & Writing','Craft and Structure','Cross-Text Connections',level,j===2?'Based on the texts, both authors would most likely agree with which statement?':'How would the author of Text 2 most likely respond to the conclusion in Text 1?',options,correct,'The texts agree an effect is possible but differ in how broadly the result should be generalized.',p1+'\n\n'+p2);
    }

    if(j===3){
      const passage=`For decades, accounts of ${c.topic} emphasized a single dominant cause. Recent work has not discarded that explanation; instead, it has shown that the cause interacts with local conditions in ways earlier models did not represent.`;
      const correct='It reframes an older explanation by adding a qualification rather than rejecting it.';
      const options=shuf(r,[correct,'It argues that the older explanation depended on fabricated evidence.','It lists unrelated explanations without evaluating them.','It shifts from scientific evidence to a personal anecdote.']);
      return mcq(qid,'Reading & Writing','Craft and Structure','Text Structure and Purpose',level,'Which choice best describes the overall structure of the text?',options,correct,'The text retains the older explanation but makes it more conditional.',passage);
    }

    if(j===5){
      const passage=`The archive on ${c.topic} is extensive, but its surviving records are unevenly distributed across decades. A historian therefore treats apparent changes in activity cautiously: a decade with fewer surviving documents may reflect preservation rather than a real decline.`;
      const correct='It explains why an apparent archival pattern may not correspond to an actual historical change.';
      const options=shuf(r,[correct,'It identifies the decade in which activity was greatest.','It argues that all surviving records should be discarded.','It claims preservation conditions were identical across decades.']);
      return mcq(qid,'Reading & Writing','Craft and Structure','Text Structure and Purpose',level,'What is the main function of the second sentence?',options,correct,'The sentence identifies a limitation that complicates interpretation of the archive.',passage);
    }

    const passage=`One group investigating ${c.topic} emphasizes average outcomes across many sites. Another focuses on rare sites where the intervention failed entirely. Taken together, the studies suggest that a typical effect and the conditions under which that effect breaks down are both informative.`;
    const correct='It combines two research emphases to argue that averages and exceptions provide complementary information.';
    const options=shuf(r,[correct,'It shows that the two groups used identical methods.','It argues that rare failures make average outcomes meaningless.','It concludes that only the larger study should be considered.']);
    return mcq(qid,'Reading & Writing','Craft and Structure','Text Structure and Purpose',level,'Which choice best states the purpose of the text?',options,correct,'The passage presents the two research emphases as complementary.',passage);
  }

  function infoQuestion(t,m,route,i,j,level,r){
    const c=rwContext(t,m,i,r), qid=id(t,'Reading & Writing',m,route,i);

    if(j===0){
      const passage=`A team studying ${c.topic} compared sites before and after a policy change. Average response increased at most sites, but the largest increases occurred where baseline values had been lowest. Because the study did not randomly assign sites to receive the policy, the researchers avoided claiming that the policy alone caused the change.`;
      const correct='The policy was associated with improvement, especially at low-baseline sites, but the design does not establish that the policy was the sole cause.';
      const options=shuf(r,[correct,'The policy had no measurable association with the response.','Low-baseline sites were excluded from the analysis.','Random assignment showed that the policy caused identical effects everywhere.']);
      return mcq(qid,'Reading & Writing','Information and Ideas','Central Ideas and Details',level,'Which choice best states the main idea of the text?',options,correct,'The passage reports an association but explicitly limits the causal conclusion.',passage);
    }

    if(j===1){
      const passage=`Researchers predicted that a feature of ${c.topic} would improve performance. Sites with the feature averaged ${c.b} units, while matched sites without it averaged ${c.a} units. The feature was also more common at newer sites, which differed from older sites in several other ways.`;
      const correct='The results are consistent with the prediction, but differences associated with site age could partly explain the observed gap.';
      const options=shuf(r,[correct,'The feature must reduce performance at newer sites.','Site age cannot matter because the sites were matched.','The data prove that the feature is the only cause of the difference.']);
      return mcq(qid,'Reading & Writing','Information and Ideas','Inferences',level,'Which conclusion is most strongly supported by the text?',options,correct,'The data support the prediction while leaving a plausible confounding factor.',passage);
    }

    if(j===2){
      const before=int(r,42,68), treated=before+int(r,12,24), comparisonStart=before-int(r,1,5), comparisonAfter=comparisonStart+int(r,2,8);
      const gain1=treated-before, gain2=comparisonAfter-comparisonStart;
      const passage=`A researcher claims that an intervention increased a measure of ${c.topic}. The table below summarizes average values.\n\nGroup | Before | After\nIntervention | ${before} | ${treated}\nComparison | ${comparisonStart} | ${comparisonAfter}`;
      const correct=`The intervention group increased by ${gain1} units, compared with an increase of ${gain2} units in the comparison group.`;
      const options=shuf(r,[correct,'Both groups changed by exactly the same amount.','The comparison group ended with the higher value.','The intervention group began '+gain1+' units above the comparison group.']);
      return mcq(qid,'Reading & Writing','Information and Ideas','Command of Evidence: Quantitative',level,'Which choice most effectively uses the data to support the researcher’s claim?',options,correct,'The strongest support compares the changes in the two groups.',passage);
    }

    if(j===3){
      const passage=`After observing that sites with greater ${c.topic} coverage had lower summer temperatures, researchers proposed that the coverage itself contributed to cooling.`;
      const correct='When otherwise similar sites are compared, sites where coverage is experimentally increased show larger temperature decreases than untreated sites.';
      const options=shuf(r,[correct,'Residents at high-coverage sites report liking the appearance of the sites.','High-coverage sites tend to be in older neighborhoods.','The same model of thermometer is used at every site.']);
      return mcq(qid,'Reading & Writing','Information and Ideas','Command of Evidence: Textual',level,'Which finding would most directly strengthen the researchers’ causal interpretation?',options,correct,'An intervention with a comparison condition provides more direct causal evidence.',passage);
    }

    if(j===4){
      const passage=`In a survey about ${c.topic}, ${c.p1}% of respondents in one random sample supported a proposed change. In a second independently drawn sample using the same wording, ${c.p2}% supported it.`;
      const correct='The difference between the samples shows that one sample percentage may not precisely represent the broader population.';
      const options=shuf(r,[correct,`The second sample proves that exactly ${c.p2}% of the entire population supports the change.`,'The first sample must have used different wording.','The samples show that random sampling eliminates sampling variability.']);
      return mcq(qid,'Reading & Writing','Information and Ideas','Inferences',level,'Which conclusion is best supported by the text?',options,correct,'The differing sample estimates illustrate sampling variability.',passage);
    }

    if(j===5){
      const passage=`An analysis of ${c.topic} found that average output increased from ${c.a} units under condition A to ${c.b} under condition B, then fell to ${c.c} under condition C.`;
      const correct='Output was highest under condition B.';
      const options=shuf(r,[correct,'Output changed by the same amount from A to B as from B to C.','Condition C produced a higher output than condition B.','All three conditions produced the same output.']);
      return mcq(qid,'Reading & Writing','Information and Ideas','Command of Evidence: Quantitative',level,'Which statement is best supported by the data?',options,correct,'The value under B is greater than under both A and C.',passage);
    }

    const passage=`A literary critic notes that a novel about ${c.topic} repeatedly shifts from broad descriptions of a city to brief observations by a single character. The critic argues that these shifts place large social changes beside their immediate effects on individual lives.`;
    const correct='The changes in narrative scale help connect social conditions with personal experience.';
    const options=shuf(r,[correct,'The novel avoids discussing social change.','The character observations are unrelated to the city descriptions.','The critic believes the novel should use only one narrative scale.']);
    return mcq(qid,'Reading & Writing','Information and Ideas','Central Ideas and Details',level,'Which choice best states the critic’s main point?',options,correct,'The critic describes the shifts in scale as a way of connecting social and individual experience.',passage);
  }

  function secQuestion(t,m,route,i,j,level,r){
    const c=rwContext(t,m,i,r), qid=id(t,'Reading & Writing',m,route,i);
    const items=[
      [`The first analysis of ${c.topic} suggested a strong relationship _____ a larger replication produced a much smaller effect.`,'; however,',[', however,',': however,',', however;'],'Boundaries','Two independent clauses are joined with a semicolon; “however” is followed by a comma.'],
      [`Neither the initial estimate nor the later measurements of ${c.topic} _____ sufficient on their own to establish a causal relationship.`,'are',['is','was being','has been'],'Form, Structure, and Sense','The nearer subject “measurements” is plural, so the verb is “are.”'],
      [`The study had one central limitation _____ it measured short-term responses but not long-term persistence.` ,':',[',','; because','— and'],'Boundaries','A colon can introduce an explanation after an independent clause.'],
      [`Collected over nearly twenty years, the records on ${c.topic} _____ researchers to distinguish short-lived fluctuations from longer trends.`,'allow',['allows','allowing','has allowed'],'Form, Structure, and Sense','The plural subject “records” takes “allow.”'],
      [`The researchers measured three outcomes: response time, accuracy _____ and retention after one week.` ,',',[';',':','—'],'Boundaries','Items in a simple series are separated with commas.'],
      [`By the time the final survey on ${c.topic} was administered, the team _____ the wording twice in response to pilot feedback.`,'had revised',['revises','has revised','will revise'],'Form, Structure, and Sense','Past perfect marks an action completed before another past event.'],
      [`The device, which was designed for field measurements _____ remained stable across a wide range of temperatures.` ,',',[';',':',''],'Boundaries','The nonessential relative clause must be closed with a comma.']
    ];
    const [passage,correct,wrong,skill,explanation]=items[j%items.length];
    const options=shuf(r,[correct,...wrong]);
    return mcq(qid,'Reading & Writing','Standard English Conventions',skill,level,'Which choice completes the text so that it conforms to the conventions of Standard English?',options,correct,explanation,passage);
  }

  function expressionQuestion(t,m,route,i,j,level,r){
    const c=rwContext(t,m,i,r), qid=id(t,'Reading & Writing',m,route,i);
    const transitions=[
      ['However,',['Therefore,','For example,','Similarly,'],'the first trial produced a clear increase','a replication under drier conditions showed almost no change','contrast'],
      ['Therefore,',['Nevertheless,','Meanwhile,','For example,'],'the revised sensor reduced measurement error by more than half','the researchers could compare small differences with greater confidence','result'],
      ['For example,',['Instead,','Consequently,','Nevertheless,'],'several design details can change how people respond to a space','moving a sign by a few meters can alter which route visitors choose','example'],
      ['Similarly,',['However,','Instead,','Therefore,'],'the first site improved gradually after the intervention','the second site showed a comparable pattern over the same period','similarity'],
      ['Nevertheless,',['Likewise,','For example,','Consequently,'],'the initial sample was small and geographically narrow','the pattern remained visible after the researchers expanded the data set','concession']
    ];

    if(j===0||j===3){
      const [correct,wrong,a,b,relation]=transitions[(t+m+j+i)%transitions.length];
      const options=shuf(r,[correct,...wrong]);
      const passage=`${a.charAt(0).toUpperCase()+a.slice(1)} in the study of ${c.topic}. _____ ${b}.`;
      return mcq(qid,'Reading & Writing','Expression of Ideas','Transitions',level,'Which choice completes the text with the most logical transition?',options,correct,`The ideas have a ${relation} relationship, so “${correct}” is most logical.`,passage);
    }

    if(j===1){
      const passage=`A student took these notes:\n• An early study of ${c.topic} included ${c.a} sites.\n• A later replication included ${c.b} sites in three regions.\n• Both studies used the same primary outcome measure.\n• The student wants to emphasize how the evidence base became broader while preserving comparability.`;
      const correct=`A later replication expanded the study from ${c.a} to ${c.b} sites across three regions while retaining the same primary outcome measure.`;
      const options=shuf(r,[correct,`Researchers have studied ${c.topic} using several methods over time.`,`The later replication included three regions, and the earlier study was conducted first.`,`Both studies produced data and were described in reports.`]);
      return mcq(qid,'Reading & Writing','Expression of Ideas','Rhetorical Synthesis',level,'Which choice most effectively uses information from the notes to accomplish the student’s goal?',options,correct,'The correct choice emphasizes both expansion and comparability.',passage);
    }

    if(j===2){
      const passage=`A student took these notes:\n• A materials team tested a coating related to ${c.topic}.\n• Untreated samples lost ${c.p2}% of their strength after repeated exposure.\n• Treated samples lost ${c.p1}%.\n• The student wants to emphasize the practical significance of the treatment.`;
      const correct=`Because treated samples lost only ${c.p1}% of their strength compared with ${c.p2}% for untreated samples, the coating substantially improved durability under repeated exposure.`;
      const options=shuf(r,[correct,`The team tested both treated and untreated samples in the same project.`,`Repeated exposure can affect material strength.`,`The coating was one of several materials considered by the team.`]);
      return mcq(qid,'Reading & Writing','Expression of Ideas','Rhetorical Synthesis',level,'Which choice most effectively uses information from the notes to accomplish the student’s goal?',options,correct,'The correct choice uses the quantitative contrast to establish practical significance.',passage);
    }

    const passage=`A student took these notes:\n• Researchers studying ${c.topic} used satellite measurements from 2005–2015.\n• They later added ground measurements from 2016–2025.\n• The ground measurements offered finer local detail.\n• The student wants to emphasize how the later phase complemented, rather than replaced, the earlier evidence.`;
    const correct='The later ground measurements added finer local detail to the broad satellite record, complementing the earlier evidence rather than replacing it.';
    const options=shuf(r,[correct,'Ground measurements are always more accurate than satellite measurements.','The researchers stopped using all evidence collected before 2016.','The project used two dates and two kinds of equipment.']);
    return mcq(qid,'Reading & Writing','Expression of Ideas','Rhetorical Synthesis',level,'Which choice most effectively uses information from the notes to accomplish the student’s goal?',options,correct,'The correct choice explicitly presents the sources as complementary.',passage);
  }

  function makeRW(test,module,route){
    const r=rng(hash(`rw-quality-${test}-${module}-${route}`));
    const groups=[['Craft and Structure',8],['Information and Ideas',7],['Standard English Conventions',7],['Expression of Ideas',5]];
    const out=[];let i=0;
    for(const [domain,count] of groups){
      for(let j=0;j<count;j++){
        const level=levelAt(j,count,route);
        const item=domain==='Craft and Structure'?craftQuestion(test,module,route,i,j,level,r)
          :domain==='Information and Ideas'?infoQuestion(test,module,route,i,j,level,r)
          :domain==='Standard English Conventions'?secQuestion(test,module,route,i,j,level,r)
          :expressionQuestion(test,module,route,i,j,level,r);
        out.push(item);i++;
      }
    }
    out[5].pretest=true;
    out[19].pretest=true;
    return out;
  }

  function algebra(test,module,route,i,j,level,r,isSpr){
    const qid=id(test,'Math',module,route,i), variant=(test+module+j)%2;
    if(j===0){
      const den=variant?5:4, x=int(r,5,14), a=int(r,3,7), b=int(r,4,12), rhs=a*x+b*den;
      const stem=`For what value of x does ${a}x/${den} + ${b} = ${frac(rhs,den)}?`;
      const exp=`Multiply by ${den}: ${a}x + ${b*den} = ${rhs}. Thus x = ${x}.`;
      return isSpr?spr(qid,'Algebra','Linear Equations in One Variable',level,stem,x,exp):numericMCQ(qid,'Algebra','Linear Equations in One Variable',level,stem,x,[x+den,x-den,x+1],exp,r);
    }
    if(j===1){
      const rate=int(r,4,9), fixed=int(r,14,36), h=int(r,7,15), total=fixed+rate*h;
      const stem=`A service charges a fixed fee plus a constant amount per hour. A ${h}-hour job costs $${total}, while a ${h-3}-hour job costs $${total-3*rate}. What is the fixed fee?`;
      const exp=`The hourly rate is (${total}-${total-3*rate})/3=${rate}. Subtract ${rate*h} from ${total} to get ${fixed}.`;
      return numericMCQ(qid,'Algebra','Linear Functions',level,stem,fixed,[rate,total-fixed,fixed+rate],exp,r);
    }
    if(j===2){
      const a=int(r,2,5), b=a+int(r,1,4), x=int(r,2,7), y=int(r,1,6), c1=a*x+b*y, c2=(a+1)*x+(b-1)*y, ans=x+y;
      const stem=`The system ${a}x + ${b}y = ${c1} and ${a+1}x + ${b-1}y = ${c2} has solution (x, y). What is x + y?`;
      const exp=`Solving gives x=${x} and y=${y}, so x+y=${ans}.`;
      return isSpr?spr(qid,'Algebra','Systems of Two Linear Equations in Two Variables',level,stem,ans,exp):numericMCQ(qid,'Algebra','Systems of Two Linear Equations in Two Variables',level,stem,ans,[x,y,ans+2],exp,r);
    }
    if(j===3){
      const slope=int(r,2,7), b=int(r,3,14), correct=-2*b;
      const stem=`For what value of k do y = ${slope}x + ${b} and ${2*slope}x - 2y = k represent the same line?`;
      const exp=`Rewrite the first as ${slope}x-y=${-b}; multiplying by 2 gives ${2*slope}x-2y=${correct}.`;
      return numericMCQ(qid,'Algebra','Linear Equations in Two Variables',level,stem,correct,[2*b,-b,correct+2],exp,r);
    }
    if(j===4){
      const a=int(r,3,7), max=int(r,9,20), fee=int(r,5,16), total=a*max+fee;
      const stem=`A club can spend at most $${total} on a $${fee} booking fee plus $${a} per participant. What is the greatest possible number of participants?`;
      const exp=`${fee}+${a}p≤${total}, so p≤${max}.`;
      return isSpr?spr(qid,'Algebra','Linear Inequalities in One Variable',level,stem,max,exp):numericMCQ(qid,'Algebra','Linear Inequalities in One Variable',level,stem,max,[max-1,max+1,Math.floor(total/a)],exp,r);
    }
    if(j===5){
      const x1=int(r,8,18), x2=x1+int(r,4,9), y1=int(r,90,150), slope=-int(r,4,9), y2=y1+slope*(x2-x1), correct=frac(y2-y1,x2-x1);
      const stem=`A linear model passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is its rate of change?`;
      const exp=`Slope=(${y2}-${y1})/(${x2}-${x1})=${correct}.`;
      if(isSpr) return spr(qid,'Algebra','Linear Functions',level,stem,correct,exp,[Number(y2-y1)/(x2-x1)]);
      const options=shuf(r,[correct,frac(y1-y2,x2-x1),frac(y2-y1,x1),frac(y2,x2)]);
      return mcq(qid,'Math','Algebra','Linear Functions',level,stem,options,correct,exp);
    }
    const adult=int(r,13,20), student=int(r,6,10), tickets=int(r,32,52), adults=int(r,12,tickets-10), students=tickets-adults, revenue=adult*adults+student*students;
    const stem=`Adult tickets cost $${adult} and student tickets cost $${student}. If ${tickets} tickets produce $${revenue}, how many adult tickets were sold?`;
    const exp=`Let a be adult tickets: ${adult}a+${student}(${tickets}-a)=${revenue}. Solving gives a=${adults}.`;
    return isSpr?spr(qid,'Algebra','Systems of Two Linear Equations in Two Variables',level,stem,adults,exp):numericMCQ(qid,'Algebra','Systems of Two Linear Equations in Two Variables',level,stem,adults,[students,adults+3,Math.max(1,adults-3)],exp,r);
  }

  function advanced(test,module,route,i,j,level,r,isSpr){
    const qid=id(test,'Math',module,route,i), variant=(test+module+j)%2;
    if(j===0){
      const r1=int(r,2,7), r2=r1+int(r,3,8), sum=r1+r2, prod=r1*r2, correct=sum*sum-2*prod;
      const stem=`The solutions to x² - ${sum}x + ${prod} = 0 are r and s. What is r² + s²?`;
      const exp=`r+s=${sum}, rs=${prod}; therefore r²+s²=(r+s)²-2rs=${correct}.`;
      return isSpr?spr(qid,'Advanced Math','Nonlinear Equations in One Variable',level,stem,correct,exp):numericMCQ(qid,'Advanced Math','Nonlinear Equations in One Variable',level,stem,correct,[sum*sum,prod,correct+prod],exp,r);
    }
    if(j===1){
      const h=int(r,2,7), k=int(r,3,11), a=int(r,2,5), x=h+2, y=4*a+k, correct=a+k;
      const stem=`The graph of f(x)=a(x-${h})²+${k} passes through (${x}, ${y}). What is f(${h-1})?`;
      const exp=`${y}=4a+${k}, so a=${a}. Then f(${h-1})=${a}+${k}=${correct}.`;
      return numericMCQ(qid,'Advanced Math','Nonlinear Functions',level,stem,correct,[a,k,correct+3],exp,r);
    }
    if(j===2){
      const root=int(r,2,7), other=root+int(r,3,7), a=int(r,2,5), b=-a*(root+other), c=a*root*other;
      const stem=`The equation ${a}x² ${b<0?'-':'+'} ${Math.abs(b)}x + ${c} = 0 has two positive solutions. One is ${root}. What is the other?`;
      const exp=`The expression factors as ${a}(x-${root})(x-${other}), so the other root is ${other}.`;
      return isSpr?spr(qid,'Advanced Math','Nonlinear Equations in One Variable',level,stem,other,exp):numericMCQ(qid,'Advanced Math','Nonlinear Equations in One Variable',level,stem,other,[root,root+other,other-root],exp,r);
    }
    if(j===3){
      const root=int(r,4,9), c=int(r,3,8), k=root*root+c*root;
      const stem=`If x is positive and x² + ${c}x = ${k}, what is x?`;
      const exp=`x²+${c}x-${k}=0 has positive root ${root}.`;
      return isSpr?spr(qid,'Advanced Math','Nonlinear Equations in One Variable',level,stem,root,exp):numericMCQ(qid,'Advanced Math','Nonlinear Equations in One Variable',level,stem,root,[root+c,k,Math.abs(root-c)],exp,r);
    }
    if(j===4){
      const base=int(r,2,5), initial=int(r,35,85), n=int(r,3,5), target=initial*Math.pow(base,n), correct=2*n;
      const stem=`A quantity is modeled by P(t)=${initial}·${base}^(t/2). For what value of t is P(t)=${target}?`;
      const exp=`${target}/${initial}=${base}^${n}, so t/2=${n} and t=${correct}.`;
      return isSpr?spr(qid,'Advanced Math','Nonlinear Functions',level,stem,correct,exp):numericMCQ(qid,'Advanced Math','Nonlinear Functions',level,stem,correct,[n,correct+2,correct-2],exp,r);
    }
    if(j===5){
      const a=int(r,2,5), b=int(r,2,7), x=int(r,2,6), gx=x*x-1, correct=a*gx+b;
      const stem=`Let f(x)=${a}x+${b} and g(x)=x²-1. What is f(g(${x}))?`;
      const exp=`g(${x})=${gx}, so f(g(${x}))=${a}(${gx})+${b}=${correct}.`;
      return numericMCQ(qid,'Advanced Math','Nonlinear Functions',level,stem,correct,[gx,a*x+b,correct+a],exp,r);
    }
    const s=int(r,3,8), k=int(r,2,9), correct=variant?s+1:s;
    const stem=variant?`The graphs y=x+${k} and y=x²-${s}x+${k+1} intersect twice. What is the sum of the x-coordinates of the intersection points?`:`The line y=${s}x+${k} intersects y=x²+${k}. What is the sum of the x-coordinates of the intersections?`;
    const exp=variant?`Equating gives x²-${s+1}x+1=0, whose roots sum to ${s+1}.`:`Equating gives x²-${s}x=0, whose roots sum to ${s}.`;
    return isSpr?spr(qid,'Advanced Math','Systems of Linear and Nonlinear Equations',level,stem,correct,exp):numericMCQ(qid,'Advanced Math','Systems of Linear and Nonlinear Equations',level,stem,correct,[correct-1,correct+1,k],exp,r);
  }

  function psda(test,module,route,i,j,level,r,isSpr){
    const qid=id(test,'Math',module,route,i);
    if(j===0){
      const up=pick(r,[15,20,25,30]), down=pick(r,[10,20,25]), multiplier=(1+up/100)*(1-down/100), correct=round((multiplier-1)*100,1);
      const stem=`A quantity increases by ${up}% and then decreases by ${down}% from the new value. What is the overall percent change from the original value? Enter a positive number for an increase and a negative number for a decrease.`;
      const exp=`The multiplier is ${(1+up/100).toFixed(2)}×${(1-down/100).toFixed(2)}=${round(multiplier,4)}, so the percent change is ${correct}%.`;
      return isSpr?spr(qid,'Problem-Solving and Data Analysis','Percentages',level,stem,correct,exp,[String(correct)+'%']):numericMCQ(qid,'Problem-Solving and Data Analysis','Percentages',level,stem,correct,[up-down,-correct,up+down],exp,r);
    }
    if(j===1){
      const sample=int(r,180,320), yes=int(r,90,sample-40), pop=int(r,1800,4200), estimate=Math.round((yes/sample*pop)/10)*10;
      const stem=`In a random sample of ${sample} students from a school of ${pop}, ${yes} prefer a later start time. Which is the best estimate of the number of students at the school who prefer a later start time?`;
      const exp=`Use the sample proportion ${yes}/${sample} and multiply by ${pop}, giving about ${estimate}.`;
      return numericMCQ(qid,'Problem-Solving and Data Analysis','Inference from Sample Statistics',level,stem,estimate,[yes,Math.round(pop/2/10)*10,estimate+200],exp,r);
    }
    if(j===2){
      const vals=[int(r,8,14),int(r,15,20),int(r,21,26),int(r,27,33),int(r,34,40)], target=int(r,23,30), total=vals.reduce((a,b)=>a+b,0), x=6*target-total;
      const stem=`Five measurements are ${vals.join(', ')}. A sixth measurement x is added so that the mean of all six is ${target}. What is x?`;
      const exp=`The required total is ${6*target}; subtract the known total ${total} to get x=${x}.`;
      return isSpr?spr(qid,'Problem-Solving and Data Analysis','One-variable Data',level,stem,x,exp):numericMCQ(qid,'Problem-Solving and Data Analysis','One-variable Data',level,stem,x,[target,Math.round(total/5),x+5],exp,r);
    }
    const red=int(r,4,8), blue=int(r,3,7), green=int(r,2,5), total=red+blue+green, correct=frac(blue*(blue-1),total*(total-1));
    const stem=`A bag contains ${red} red, ${blue} blue, and ${green} green tokens. Two are selected at random without replacement. What is the probability both are blue?`;
    const exp=`P=( ${blue}/${total} )( ${blue-1}/${total-1} )=${correct}.`;
    if(isSpr) return spr(qid,'Problem-Solving and Data Analysis','Probability and Conditional Probability',level,stem,correct,exp,[blue*(blue-1)/(total*(total-1))]);
    const options=shuf(r,[correct,frac(blue*blue,total*total),frac(blue,total),frac(blue-1,total-1)]);
    return mcq(qid,'Math','Problem-Solving and Data Analysis','Probability and Conditional Probability',level,stem,options,correct,exp);
  }

  function geo(test,module,route,i,j,level,r,isSpr){
    const qid=id(test,'Math',module,route,i);
    if(j===0){
      const cx=int(r,-4,5), cy=int(r,-4,5), px=cx+3, py=cy+4, correct='-3/4';
      const stem=`A circle has center (${cx}, ${cy}), and (${px}, ${py}) is on the circle. What is the slope of the tangent line at (${px}, ${py})?`;
      const exp='The radius has slope 4/3, so a perpendicular tangent has slope -3/4.';
      if(isSpr) return spr(qid,'Geometry and Trigonometry','Circles',level,stem,correct,exp,[-0.75]);
      const options=shuf(r,[correct,'3/4','-4/3','4/3']);
      return mcq(qid,'Math','Geometry and Trigonometry','Circles',level,stem,options,correct,exp);
    }
    if(j===1){
      const a=int(r,3,7), b=a+int(r,2,5), area=int(r,24,60), correct=round(area*b*b/(a*a),2);
      const stem=`Two similar triangles have corresponding side lengths in ratio ${a}:${b}. The smaller has area ${area}. What is the area of the larger triangle?`;
      const exp=`Area scales by the square of the side factor: ${area}(${b}/${a})²=${correct}.`;
      return isSpr?spr(qid,'Geometry and Trigonometry','Lines, Angles, and Triangles',level,stem,correct,exp):numericMCQ(qid,'Geometry and Trigonometry','Lines, Angles, and Triangles',level,stem,correct,[round(area*b/a,2),round(area*a/b,2),area+correct],exp,r);
    }
    if(j===2){
      const tri=pick(r,[[5,12,13],[8,15,17],[7,24,25]]), scale=int(r,2,5), opp=tri[0]*scale, hyp=tri[2]*scale;
      const stem=`In a right triangle, tan θ=${tri[0]}/${tri[1]}, θ is acute, and the hypotenuse is ${hyp}. What is the length of the side opposite θ?`;
      const exp=`The side ratio is ${tri.join(':')}; the scale factor is ${scale}, so the opposite side is ${opp}.`;
      return isSpr?spr(qid,'Geometry and Trigonometry','Right Triangles and Trigonometry',level,stem,opp,exp):numericMCQ(qid,'Geometry and Trigonometry','Right Triangles and Trigonometry',level,stem,opp,[tri[1]*scale,hyp,opp+scale],exp,r);
    }
    const ratio=pick(r,[2,3,4]), correct=ratio*ratio;
    const stem=`Two cylinders have the same height. The second cylinder's radius is ${ratio} times the first's. If the first has volume V and the second kV, what is k?`;
    const exp=`Volume is proportional to r² for fixed height, so k=${ratio}²=${correct}.`;
    return numericMCQ(qid,'Geometry and Trigonometry','Area and Volume',level,stem,correct,[ratio,ratio*3,correct*ratio],exp,r);
  }

  function makeMath(test,module,route){
    const r=rng(hash(`math-quality-${test}-${module}-${route}`));
    const domains=[...Array(7).fill('Algebra'),...Array(7).fill('Advanced Math'),...Array(4).fill('Problem-Solving and Data Analysis'),...Array(4).fill('Geometry and Trigonometry')];
    const sprSlots=new Set([2,5,9,13,17,21]);
    const counts={},out=[];
    for(let i=0;i<domains.length;i++){
      const domain=domains[i];
      counts[domain]=(counts[domain]||0)+1;
      const j=counts[domain]-1;
      const n=(domain==='Algebra'||domain==='Advanced Math')?7:4;
      const level=levelAt(j,n,route);
      const isSpr=sprSlots.has(i);
      const item=domain==='Algebra'?algebra(test,module,route,i,j,level,r,isSpr)
        :domain==='Advanced Math'?advanced(test,module,route,i,j,level,r,isSpr)
        :domain==='Problem-Solving and Data Analysis'?psda(test,module,route,i,j,level,r,isSpr)
        :geo(test,module,route,i,j,level,r,isSpr);
      out.push(item);
    }
    out.sort((a,b)=>({Foundation:0,Medium:1,Advanced:2}[a.level]-({Foundation:0,Medium:1,Advanced:2}[b.level])));
    out[4].pretest=true;
    out[16].pretest=true;
    return out;
  }

  const originalGetModule=base.getModule.bind(base);
  base.getModule=function(testNumber,section,module,route='mixed'){
    const t=Math.max(1,Math.min(4,Number(testNumber)||1));
    const m=Math.max(1,Math.min(2,Number(module)||1));
    const r=['easy','medium','hard','mixed'].includes(route)?route:'mixed';
    try{
      return section==='Reading & Writing'?makeRW(t,m,r):makeMath(t,m,r);
    }catch(error){
      console.error('[StudyAI] Enhanced SAT mock generator failed; using fallback bank.',error);
      return originalGetModule(t,section,m,r);
    }
  };
  base.version=2;
  base.routeFromPerformance=function(ratio){
    if(ratio<0.48)return'easy';
    if(ratio<0.72)return'medium';
    return'hard';
  };
  base.routeLabel=function(route){
    return route==='easy'?'Easier adaptive route':route==='hard'?'Harder adaptive route':'Standard adaptive route';
  };
})();