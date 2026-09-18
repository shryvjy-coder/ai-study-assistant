(function mockDataIIFE() {
  'use strict';

  const tests = [
    {id:'mock-1',number:1,title:'Practice Test 1',subtitle:'Balanced foundations'},
    {id:'mock-2',number:2,title:'Practice Test 2',subtitle:'Analysis and algebra'},
    {id:'mock-3',number:3,title:'Practice Test 3',subtitle:'Rhetoric and advanced math'},
    {id:'mock-4',number:4,title:'Practice Test 4',subtitle:'Mixed challenge'}
  ];

  const topics = [
    ['urban tree canopies','migratory shorebirds','museum lighting','sleep routines','community gardens','coral restoration','public transit maps','historical diaries','battery recycling','acoustic design','river sediments','language learning'],
    ['solar microgrids','pollinator corridors','ceramic archives','memory research','food-waste programs','kelp forests','street design','oral histories','water filtration','theater acoustics','volcanic soils','bilingual education'],
    ['heat-resilient roofs','wetland birds','digital exhibits','attention research','library access','seagrass restoration','bike networks','ship logs','material reuse','concert halls','glacial deposits','translation studies'],
    ['cool pavements','forest mammals','public sculpture','decision research','school meal programs','reef monitoring','rail schedules','census records','circular manufacturing','soundscapes','desert soils','reading development']
  ];

  const words = [
    ['provisional','temporary'],['mitigate','reduce'],['corroborate','confirm'],['novel','new'],['salient','noticeable'],
    ['ambiguous','unclear'],['constrain','limit'],['robust','strong'],['subsequent','later'],['sparse','scattered'],
    ['pragmatic','practical'],['diminish','decrease'],['intricate','complex'],['bolster','strengthen'],['tentative','uncertain']
  ];

  function hash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  function shuf(r,a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function lvl(i,n,route){const p=(i+.5)/n;if(route==='easy')return p<.58?'Foundation':p<.9?'Medium':'Advanced';if(route==='hard')return p<.12?'Foundation':p<.42?'Medium':'Advanced';if(route==='medium')return p<.25?'Foundation':p<.75?'Medium':'Advanced';return p<.3?'Foundation':p<.7?'Medium':'Advanced'}
  function id(t,s,m,r,i){return `mock${t}-${s==='Math'?'m':'r'}${m}-${r}-${i+1}`}
  function q(id,section,domain,skill,level,stem,options,answer,explanation,passage=''){return{id,section,domain,skill,level,stem,options,answer,explanation,passage,format:'mcq'}}

  function rw(t,m,route,domain,i,j,level,r){
    const topic=topics[t-1][(i+m*3+Math.floor(r()*5))%topics[t-1].length];
    const qid=id(t,'Reading & Writing',m,route,i);
    const a=12+Math.floor(r()*28), b=a+5+Math.floor(r()*15);

    if(domain==='Craft and Structure'){
      if(j%3===0){
        const [word,meaning]=words[(t*4+i)%words.length];
        const opts=shuf(r,[meaning,'permanent','unrelated','excessive']);
        return q(qid,'Reading & Writing',domain,'Words in Context',level,`As used in the text, what does “${word}” most nearly mean?`,opts,opts.indexOf(meaning),`In context, “${word}” means ${meaning}.`,`The research team described its first explanation for the pattern in ${topic} as ${word}. The team planned to revise the explanation if later measurements pointed to a different cause.`);
      }
      if(j%3===1) return q(qid,'Reading & Writing',domain,'Text Structure and Purpose',level,'Which choice best describes the function of the second sentence in the text as a whole?',['It gives a specific result that illustrates the broader claim in the first sentence.','It introduces an unrelated topic.','It proves the first sentence is impossible.','It shifts from evidence to a personal anecdote.'],0,'The second sentence supplies a concrete example of the first sentence’s broader claim.',`Researchers studying ${topic} proposed that small local changes could produce measurable differences. In one trial, changing one condition increased the observed response from ${a} units to ${b} units while other conditions were held constant.`);
      return q(qid,'Reading & Writing',domain,'Cross-Text Connections',level,'Based on the texts, both authors would most likely agree with which statement?',['Context can affect whether an approach succeeds.','The approach should be abandoned everywhere.','Cost is the only factor worth measuring.','The approach has identical effects in all locations.'],0,'Both texts emphasize that local conditions influence outcomes.',`Text 1\nA study of ${topic} found that a new approach improved outcomes at two sites, but the size of the improvement differed.\n\nText 2\nA separate team observed smaller gains from a similar approach at a third site and argued that baseline conditions probably explain much of the contrast.`);
    }

    if(domain==='Information and Ideas'){
      if(j%4===0) return q(qid,'Reading & Writing',domain,'Central Ideas and Details',level,'Which choice best states the main idea of the text?',[`A targeted change affected ${topic} measurably, but its effect varied by setting.`,`Every intervention involving ${topic} produces the same result.`,`Measurement is unnecessary when a change seems obvious.`,`The researchers wanted to replace fieldwork with simulations.`],0,'The passage emphasizes both a measurable effect and variation across settings.',`Researchers examining ${topic} introduced the same small intervention at several sites. The response improved at each site, but the size of the improvement varied with local conditions.`);
      if(j%4===1) return q(qid,'Reading & Writing',domain,'Inferences',level,'Which conclusion is best supported by the text?',['The pattern is consistent with the proposed explanation but does not prove it is the only explanation.','The explanation must be false.','The same result will occur everywhere.','The measurements are unusable because they differ.'],0,'The data support the explanation without proving exclusivity.',`A team studying ${topic} predicted that a condition would increase the measured response. Sites with that condition averaged ${b} units, while similar sites without it averaged ${a} units. The researchers noted that other factors could also contribute.`);
      if(j%4===2) return q(qid,'Reading & Writing',domain,'Command of Evidence: Quantitative',level,'Which result would most directly support the claim that the intervention increased the response?',[`The response increased from ${a} to ${b} units after the change.`,`The response remained ${a} units before and after the change.`,`Only one site was measured with no baseline.`,`The response decreased after no change was made.`],0,'A measured increase from baseline directly supports the claim.',`Researchers studying ${topic} recorded a baseline and repeated the measurement after an intervention. They predicted that the response would increase.`);
      return q(qid,'Reading & Writing',domain,'Command of Evidence: Textual',level,'Which finding would most strongly support the researchers’ conclusion?',['The pattern appeared at multiple comparable locations.','A participant said the topic was interesting.','The team used a spreadsheet.','The study began on a Tuesday.'],0,'Replication under comparable conditions is direct supporting evidence.',`After observing a pattern in ${topic} at one location, researchers suggested the relationship might occur more broadly under comparable conditions.`);
    }

    if(domain==='Standard English Conventions'){
      if(j%4===0) return q(qid,'Reading & Writing',domain,'Boundaries',level,'Which choice completes the text so that it conforms to Standard English?',['Because the first trial produced mixed results, the team revised its method.','Because the first trial produced mixed results the team, revised its method.','Because the first trial, produced mixed results the team revised its method.','Because the first trial produced mixed results; the team revised its method.'],0,'The introductory dependent clause should be followed by a comma.',`The researchers studying ${topic} changed one part of their procedure. _____`);
      if(j%4===1){
        const plural=i%2===0, correct=plural?'were':'was', subject=plural?'The measurements from the final three trials':'The pattern observed in the final three trials';
        const opts=shuf(r,[correct,plural?'was':'were','be','have being']);
        return q(qid,'Reading & Writing',domain,'Form, Structure, and Sense',level,'Which choice completes the text so that it conforms to Standard English?',opts,opts.indexOf(correct),`The verb must agree with the main subject: ${correct}.`,`${subject} _____ consistent with the team’s prediction about ${topic}.`);
      }
      if(j%4===2) return q(qid,'Reading & Writing',domain,'Boundaries',level,'Which choice completes the text so that it conforms to Standard English?',['The team collected the samples, analyzed them, and published the results.','The team collected the samples analyzed them, and published the results.','The team collected, the samples, analyzed them and published, the results.','The team collected the samples; analyzed them; and published the results.'],0,'The three parallel verbs are correctly separated with commas.',`The project on ${topic} followed three main steps. _____`);
      return q(qid,'Reading & Writing',domain,'Form, Structure, and Sense',level,'Which choice completes the text so that it conforms to Standard English?',['its','their','it’s','there'],0,'The singular possessive pronoun “its” refers to “study.”',`The study on ${topic} was repeated after _____ original sample was expanded.`);
    }

    if(j%2===0){
      const type=(t+i)%4;
      const rows=[
        ['However,',['Therefore,','For example,','Similarly,'],`The first trial involving ${topic} showed a large increase. _____ the second trial, under different conditions, showed almost no change.`],
        ['Therefore,',['However,','Meanwhile,','For example,'],`The revised method reduced measurement error in the study of ${topic}. _____ the researchers could compare the sites with greater confidence.`],
        ['For example,',['Nevertheless,','Consequently,','Similarly,'],`Several design details can influence responses to ${topic}. _____ changing the placement of a sign can alter which route visitors choose.`],
        ['Similarly,',['Instead,','Therefore,','However,'],`The first ${topic} site showed a gradual improvement after the change. _____ the second site improved at nearly the same rate.`]
      ];
      const [correct,wrong,passage]=rows[type], opts=shuf(r,[correct,...wrong]);
      return q(qid,'Reading & Writing',domain,'Transitions',level,'Which choice completes the text with the most logical transition?',opts,opts.indexOf(correct),`The relationship calls for “${correct}”`,passage);
    }
    return q(qid,'Reading & Writing',domain,'Rhetorical Synthesis',level,'The student wants to emphasize how the study expanded over time. Which choice most effectively uses the notes to accomplish this goal?',[`A pilot study of ${topic} began with ${a} observations and later expanded to ${b}.`,`The researchers were interested in many things, including ${topic}.`,`The project lasted several months and involved a team.`,`The report included a title and references.`],0,'The first choice directly compares the earlier and later sample sizes.',`A student took these notes:\n• A pilot study examined ${topic}.\n• The pilot included ${a} observations.\n• A later phase included ${b} observations.\n• The same measurement method was used in both phases.`);
  }

  function rwModule(t,m,route){
    const r=rng(hash(`rw-${t}-${m}-${route}`)), groups=[['Craft and Structure',8],['Information and Ideas',7],['Standard English Conventions',7],['Expression of Ideas',5]];
    const out=[];let i=0;
    for(const [domain,n] of groups)for(let j=0;j<n;j++)out.push(rw(t,m,route,domain,i++,j,lvl(j,n,route),r));
    out[5].pretest=true;out[19].pretest=true;return out;
  }

  function numOptions(r,answer){
    const vals=new Set([Number(answer)]), step=Math.max(1,Math.round(Math.abs(Number(answer))*.1));
    while(vals.size<4)vals.add(Number(answer)+(1+Math.floor(r()*4))*step*(r()<.5?-1:1));
    const options=shuf(r,[...vals]).map(String);return{options,answer:options.indexOf(String(answer))};
  }

  function mathQ(t,m,route,domain,i,j,level,r,spr){
    const qid=id(t,'Math',m,route,i), d=level==='Foundation'?0:level==='Medium'?1:2;
    let stem='',correct=0,skill='',explanation='';
    const a=2+Math.floor(r()*(4+d*3)),b=3+Math.floor(r()*(8+d*6)),c=4+Math.floor(r()*(10+d*8));

    if(domain==='Algebra'){
      if(j%5===0){correct=2+Math.floor(r()*(8+d*4))+t*10;const rhs=a*correct+b;stem=`If ${a}x + ${b} = ${rhs}, what is x?`;skill='Linear Equations in One Variable';explanation=`Subtract ${b}, then divide by ${a}: x = ${correct}.`;}
      else if(j%5===1){const x1=1+Math.floor(r()*4)+t*4,x2=x1+2+Math.floor(r()*3),s=1+Math.floor(r()*(4+d*2))+t,y1=s*x1+b,y2=s*x2+b;correct=s;stem=`A line passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is its slope?`;skill='Linear Functions';explanation=`Slope = (${y2}-${y1})/(${x2}-${x1}) = ${s}.`;}
      else if(j%5===2){const x=2+Math.floor(r()*6)+t*10,y=1+Math.floor(r()*5)+t;correct=x;stem=`The system x + y = ${x+y} and x - y = ${x-y} has solution (x, y). What is x?`;skill='Systems of Two Linear Equations';explanation=`Add the equations to get 2x = ${2*x}.`;}
      else if(j%5===3){correct=3+Math.floor(r()*8)+t*10;stem=`What is the greatest integer x satisfying ${a}x + ${b} ≤ ${a*correct+b}?`;skill='Linear Inequalities';explanation=`Solving gives x ≤ ${correct}.`;}
      else{const x=2+Math.floor(r()*7)+t*3,s=2+Math.floor(r()*5)+t,k=1+Math.floor(r()*7)+t;correct=s*x+k;stem=`For f(x) = ${s}x + ${k}, what is f(${x})?`;skill='Linear Functions';explanation=`Substitute ${x}: ${correct}.`;}
    }else if(domain==='Advanced Math'){
      if(j%5===0){const p=2+Math.floor(r()*5)+t*4,z=2+Math.floor(r()*6)+t*5;correct=p+z;stem=`The equation (x - ${p})(x - ${z}) = 0 has two solutions. What is their sum?`;skill='Nonlinear Equations in One Variable';explanation=`The roots are ${p} and ${z}, summing to ${correct}.`;}
      else if(j%5===1){const root=2+Math.floor(r()*(6+d*2))+t*6;correct=root;stem=`If x is positive and x² = ${root*root}, what is x?`;skill='Nonlinear Equations in One Variable';explanation=`The positive square root is ${root}.`;}
      else if(j%5===2){const k=2+Math.floor(r()*5)+t*2,x=2+Math.floor(r()*6)+t*4;correct=(x+k)*(x+k);stem=`What is (x + ${k})² when x = ${x}?`;skill='Equivalent Expressions';explanation=`(${x}+${k})² = ${correct}.`;}
      else if(j%5===3){const start=2+Math.floor(r()*4)+t*2,rate=2+Math.floor(r()*3)+t,periods=2+Math.floor(r()*3);correct=start*Math.pow(rate,periods);stem=`A quantity starts at ${start} and is multiplied by ${rate} each period. What is its value after ${periods} periods?`;skill='Nonlinear Functions';explanation=`${start}(${rate})^${periods} = ${correct}.`;}
      else{const x=2+Math.floor(r()*5)+t*3,coef=2+Math.floor(r()*4)+t,k=1+Math.floor(r()*5)+t;correct=coef*x*x+k;stem=`For g(x) = ${coef}x² + ${k}, what is g(${x})?`;skill='Nonlinear Functions';explanation=`${coef}(${x}²)+${k} = ${correct}.`;}
    }else if(domain==='Problem-Solving and Data Analysis'){
      if(j%3===0){const base=20+Math.floor(r()*60)+t*100,pct=[10,20,25,50][(t+i)%4];correct=base*(100+pct)/100;stem=`A value of ${base} increases by ${pct}%. What is the new value?`;skill='Percentages';explanation=`Multiply by ${1+pct/100}: ${correct}.`;}
      else if(j%3===1){const ratio=2+Math.floor(r()*5)+t*2,units=3+Math.floor(r()*7)+t;correct=ratio*units;stem=`A mixture uses ${ratio} cups of water for every 1 cup of concentrate. How much water is needed for ${units} cups of concentrate?`;skill='Ratios, Rates and Proportions';explanation=`${ratio} × ${units} = ${correct}.`;}
      else{const vals=[a,b,c,a+b];correct=vals.reduce((x,y)=>x+y,0)/4;stem=`The data set is ${vals.join(', ')}. What is its mean?`;skill='One-variable Data';explanation=`Add the values and divide by 4: ${correct}.`;}
    }else{
      if(j%3===0){const w=3+Math.floor(r()*8)+t*4,h=4+Math.floor(r()*9)+t*5;correct=w*h;stem=`A rectangle has width ${w} and height ${h}. What is its area?`;skill='Area and Volume';explanation=`Area = ${w} × ${h} = ${correct}.`;}
      else if(j%3===1){const radius=2+Math.floor(r()*7)+t*5;correct=2*radius;stem=`A circle has radius ${radius}. What is its diameter?`;skill='Circles';explanation=`Diameter = 2r = ${correct}.`;}
      else{const triples=[[3,4,5],[5,12,13],[8,15,17]],baseTri=triples[(t+i)%3],z=baseTri.map(v=>v*t);correct=z[2];stem=`A right triangle has legs ${z[0]} and ${z[1]}. What is the hypotenuse?`;skill='Right Triangles and Trigonometry';explanation=`By the Pythagorean theorem, the hypotenuse is ${correct}.`;}
    }

    if(spr)return{id:qid,section:'Math',domain,skill,level,stem,options:[],answer:null,correctAnswer:String(correct),acceptedAnswers:[String(correct)],explanation,passage:'',format:'spr'};
    const copt=numOptions(r,correct);return q(qid,'Math',domain,skill,level,stem,copt.options,copt.answer,explanation,'');
  }

  function mathModule(t,m,route){
    const r=rng(hash(`math-${t}-${m}-${route}`)), domains=[...Array(8).fill('Algebra'),...Array(8).fill('Advanced Math'),...Array(3).fill('Problem-Solving and Data Analysis'),...Array(3).fill('Geometry and Trigonometry')], spr=new Set([3,7,11,15,18,21]), counts={},out=[];
    for(let i=0;i<domains.length;i++){const d=domains[i];counts[d]=(counts[d]||0)+1;out.push(mathQ(t,m,route,d,i,counts[d]-1,lvl(i,22,route),r,spr.has(i)))}
    out.sort((a,b)=>({Foundation:0,Medium:1,Advanced:2}[a.level]-({Foundation:0,Medium:1,Advanced:2}[b.level]))||a.domain.localeCompare(b.domain));
    out[4].pretest=true;out[16].pretest=true;return out;
  }

  function getModule(testNumber,section,module,route='mixed'){
    const t=Math.max(1,Math.min(4,Number(testNumber)||1));
    return section==='Reading & Writing'?rwModule(t,module,route):mathModule(t,module,route);
  }

  window.StudyAISATMocks={
    tests,
    getModule,
    getTestMeta(n){return tests[Math.max(0,Math.min(3,(Number(n)||1)-1))]},
    routeFromPerformance(ratio){if(ratio<.45)return'easy';if(ratio<.75)return'medium';return'hard'},
    routeLabel(route){return route==='easy'?'Easy route':route==='hard'?'Hard route':'Medium route'}
  };
})();
