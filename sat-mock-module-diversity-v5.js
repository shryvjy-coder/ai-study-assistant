(function moduleDiversityV5(){
  'use strict';
  const bank=window.StudyAISATMocks;
  if(!bank)return;
  const previous=bank.getModule.bind(bank);

  function hash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  function int(r,a,b){return a+Math.floor(r()*(b-a+1))}
  function shuf(r,a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const t=a%b;a=b;b=t}return a||1}
  function frac(n,d){const g=gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d}return d===1?String(n):n+'/'+d}
  function round(n,p=1){const f=10**p;return Math.round((n+Number.EPSILON)*f)/f}
  function opts(correct,wrong){
    const a=[String(correct),...wrong.map(String)].filter((v,i,x)=>x.indexOf(v)===i);
    let n=1;while(a.length<4){const c=String((Number(correct)||0)+n++);if(!a.includes(c))a.push(c)}
    return a.slice(0,4);
  }
  function mcq(q,archetype,passage,stem,correct,wrong,explanation,r,skill=q.skill,level=q.level){
    const options=shuf(r,opts(correct,wrong));
    return {...q,id:q.id+'-v5',archetype,passage:passage||'',stem,options,answer:options.indexOf(String(correct)),
      correctAnswer:null,acceptedAnswers:[],explanation,skill,level,format:'mcq'};
  }
  function levelFor(section,route,index){
    if(section==='Math'){
      if(route==='hard')return index<2?'Medium':'Advanced';
      if(route==='medium')return index<10?'Medium':'Advanced';
      return index<3?'Foundation':index<15?'Medium':'Advanced';
    }
    if(route==='hard')return index<3?'Medium':'Advanced';
    if(route==='medium')return index<11?'Medium':'Advanced';
    return index<3?'Foundation':index<18?'Medium':'Advanced';
  }
  function toFiveSPR(items){
    const wanted=[1,5,9,14,19],numeric=/^-?(?:\d+(?:\.\d+)?|\d+\/\d+)$/;
    const candidates=items.map((q,i)=>({i,q,correct:q.format==='mcq'?String(q.options[q.answer]):''}))
      .filter(x=>numeric.test(x.correct));
    const used=new Set(),chosen=[];
    for(const w of wanted){
      let best=null;
      for(const c of candidates){
        if(used.has(c.i))continue;
        const dist=Math.abs(c.i-w);
        if(!best||dist<best.dist)best={...c,dist};
      }
      if(best){used.add(best.i);chosen.push(best)}
    }
    for(const c of chosen){
      const q=items[c.i],num=Number(c.correct),accepted=[c.correct];
      if(Number.isFinite(num))accepted.push(String(round(num,4)));
      items[c.i]={...q,format:'spr',options:[],answer:null,correctAnswer:c.correct,acceptedAnswers:[...new Set(accepted)]};
    }
    return items;
  }

  function mathAlgebra(q,k,r){
    switch(k){
      case 0:{
        const a=int(r,2,5),b=int(r,2,6),c=int(r,6,15),f=int(r,2,4),d=f*c+int(r,1,5),correct=f*b;
        return mcq(q,'M2-A-system-parameter','',`The system ${a}x + ${b}y = ${c} and ${f*a}x + ky = ${d} has no solution. What is k?`,
          correct,[b,f*a,correct+1],`Parallel distinct lines require proportional variable coefficients. Since the x-coefficient is multiplied by ${f}, k=${f}(${b})=${correct}.`,r,'Systems of Two Linear Equations in Two Variables');
      }
      case 1:{
        const p=int(r,2,6),s=int(r,2,5),drop=int(r,2,7),x0=int(r,4,12),C=p*x0+s*drop;
        return mcq(q,'M2-A-translation-intercept','',`The graph of ${p}x + ${s}y = ${C} is translated down ${drop} units. What is the x-coordinate of the x-intercept of the translated graph?`,
          x0,[x0-drop,x0+drop,C/p],`A downward translation gives ${p}x+${s}(y+${drop})=${C}. At the x-intercept y=0, so x=${x0}.`,r,'Linear Equations in Two Variables');
      }
      case 2:{
        const price=2*int(r,18,45),correct=`${price}n - ${Math.round(1.5*price)}`;
        return mcq(q,'M2-A-discount-model','',`A studio charges $${price} per session. The first session is free, the second is half price, and later sessions are full price. Which expression gives the total cost of n sessions for n≥2?`,
          correct,[`${price}n - ${price}`,`${price}n - ${price/2}`,`${price}(n-2)`],`0+${price/2}+${price}(n−2) simplifies to ${correct}.`,r,'Linear Functions');
      }
      case 3:{
        const m=int(r,3,8),b=int(r,5,14),shift=int(r,2,6),x=int(r,2,7),fx=m*x+b,correct=m*shift;
        return mcq(q,'M2-A-function-change','',`A linear function f satisfies f(${x})=${fx} and has slope ${m}. What is f(x+${shift})−f(x) for any x?`,
          correct,[m,shift,fx],`A change of ${shift} in x changes a linear function by slope×change=${m}(${shift})=${correct}.`,r,'Linear Functions');
      }
      case 4:{
        const m=int(r,2,7),b=int(r,3,12),correct=`${m+1}x - y = ${b+2}`;
        return mcq(q,'M2-A-one-solution-choice','',`One equation in a system is y=${m}x+${b}. Which equation could be the second equation if the system has exactly one solution?`,
          correct,[`${m}x - y = ${-b}`,`${2*m}x - 2y = ${-2*b}`,`y=${m}x+${b+4}`],`Exactly one solution requires a different slope. The correct equation has slope ${m+1}.`,r,'Systems of Two Linear Equations in Two Variables');
      }
      case 5:{
        const low=25,high=65,goal=45,y=20*int(r,2,5),correct=y;
        return mcq(q,'M2-A-mixture-equation','',`A lab mixes x liters of a ${low}% solution with ${y} liters of a ${high}% solution to obtain a ${goal}% solution. Assuming volumes add, what is x?`,
          correct,[y/2,2*y,y+20],`${low/100}x+${high/100}(${y})=${goal/100}(x+${y}); solving gives x=${correct}.`,r,'Linear Equations in Two Variables');
      }
      case 6:{
        const A=int(r,2,7),B=int(r,3,9),C=A*B*int(r,2,5),correct=frac(B,A);
        return mcq(q,'M2-A-intercept-ratio','',`The line ${A}x + ${B}y = ${C} has x-intercept (p,0) and y-intercept (0,q). What is p/q?`,
          correct,[frac(A,B),A+B,C],`p=${C/A} and q=${C/B}; therefore p/q=${correct}.`,r,'Linear Equations in Two Variables');
      }
      default:{
        const forbidden=int(r,2,8),offset=4-forbidden,c=int(r,3,10),d=c+int(r,2,6);
        return mcq(q,'M2-A-exactly-one-exception','',`In (k${offset>=0?'+':'−'}${Math.abs(offset)})x + ${c} = 4x + ${d}, k is a positive integer. If the equation has exactly one solution, which value can k NOT equal?`,
          forbidden,[forbidden+1,Math.max(1,forbidden-1),forbidden+3],`Exactly one solution fails when the x-coefficients match: k${offset>=0?'+':'−'}${Math.abs(offset)}=4, so k=${forbidden}.`,r,'Linear Equations in One Variable');
      }
    }
  }

  function mathAdvanced(q,k,r){
    switch(k){
      case 0:{
        const a=int(r,2,5),h=int(r,2,6),v=int(r,-5,4),dx=int(r,2,4),y=a*dx*dx+v,target=h+dx+1,correct=a*(target-h)*(target-h)+v;
        return mcq(q,'M2-ADV-vertex-recover','',`A quadratic has vertex (${h},${v}) and passes through (${h+dx},${y}). What is its value at x=${target}?`,
          correct,[y,correct-a,correct+a],`Use vertex form a(x−${h})²+${v}; the given point yields a=${a}, then substitute x=${target}.`,r,'Nonlinear Functions');
      }
      case 1:{
        const r1=int(r,2,5),r2=r1+int(r,2,4),r3=r2+int(r,2,4),correct=-r1*r2*r3;
        return mcq(q,'M2-ADV-cubic-roots','',`A monic cubic polynomial has zeros ${r1}, ${r2}, and ${r3}. What is the value of the polynomial at x=0?`,
          correct,[r1*r2*r3,-(r1+r2+r3),r1+r2+r3],`The polynomial is (x−${r1})(x−${r2})(x−${r3}); at x=0 its value is ${correct}.`,r,'Equivalent Expressions');
      }
      case 2:{
        const add=int(r,1,4),sub=int(r,1,4),correct=3*sub+2*add;
        return mcq(q,'M2-ADV-exponential-common-base','',`If 4^(x+${add}) = 8^(x−${sub}), what is x?`,
          correct,[correct-1,correct+1,add+sub],`Rewrite both sides with base 2 and equate exponents; x=${correct}.`,r,'Nonlinear Equations in One Variable');
      }
      case 3:{
        const a=int(r,3,8),c=int(r,2,7),x=a+int(r,2,6),correct=x+a+c;
        return mcq(q,'M2-ADV-rational-simplify','',`For x≠${a}, f(x)=(x²−${a*a})/(x−${a})+${c}. What is f(${x})?`,
          correct,[x-a+c,x+a-c,x+c],`Factor x²−${a*a}=(x−${a})(x+${a}); f(x)=x+${a}+${c}.`,r,'Equivalent Expressions');
      }
      case 4:{
        const sum=int(r,6,12),prod=int(r,5,20);
        return mcq(q,'M2-ADV-intersection-product','',`The graphs y=x²−${sum}x+${prod+4} and y=4 intersect at x=r and x=s. What is rs?`,
          prod,[sum,prod+4,sum+prod],`The intersection x-values satisfy x²−${sum}x+${prod}=0, whose roots have product ${prod}.`,r,'Systems of Linear and Nonlinear Equations');
      }
      case 5:{
        const h=int(r,2,7),min=int(r,-8,3),a=int(r,2,5),b=-2*a*h,c=a*h*h+min;
        return mcq(q,'M2-ADV-complete-square-min','',`What is the minimum value of f(x)=${a}x² ${b<0?'−':'+'} ${Math.abs(b)}x ${c<0?'−':'+'} ${Math.abs(c)}?`,
          min,[h,c,min+a],`Completing the square gives f(x)=${a}(x−${h})²+${min}.`,r,'Nonlinear Functions');
      }
      default:{
        const r1=int(r,1,5),r2=r1+int(r,2,5),shift=int(r,2,6),correct=(r1+shift)*(r2+shift);
        return mcq(q,'M2-ADV-shifted-zeros','',`The zeros of f are ${r1} and ${r2}. Define g(x)=f(x−${shift}). What is the product of the zeros of g?`,
          correct,[r1*r2,(r1-shift)*(r2-shift),r1+r2+2*shift],`The zeros shift right by ${shift}, becoming ${r1+shift} and ${r2+shift}; their product is ${correct}.`,r,'Nonlinear Functions');
      }
    }
  }

  function mathPSDA(q,k,r){
    switch(k){
      case 0:{
        const total=int(r,180,320),A=int(r,70,130),both=int(r,20,50),B=int(r,80,140),correct=frac(both,A);
        return mcq(q,'M2-PSDA-two-way-conditional',`Survey results\nChose A: ${A}\nChose B: ${B}\nChose both: ${both}\nTotal surveyed: ${total}`,
          'What is the probability that a randomly selected person chose B, given that the person chose A?',correct,
          [frac(both,total),frac(A,total),frac(A-both,A)],`Condition on the ${A} people who chose A: ${both}/${A}=${correct}.`,r,'Probability and Conditional Probability');
      }
      case 1:{
        const n=int(r,8,14),mean=int(r,20,40),removed=int(r,10,20),correct=round((n*mean-removed)/(n-1),1);
        return mcq(q,'M2-PSDA-remove-observation','',`A data set of ${n} values has mean ${mean}. One value, ${removed}, is removed. What is the mean of the remaining ${n-1} values?`,
          correct,[mean,round((n*mean+removed)/(n-1),1),round((n*mean-removed)/n,1)],`The original sum is ${n*mean}; remove ${removed} and divide by ${n-1}.`,r,'One-variable Data');
      }
      case 2:{
        const correct='Randomly assign volunteers to the two study conditions and compare their outcomes.';
        return mcq(q,'M2-PSDA-experimental-design','',`Researchers want to determine whether a new study routine causes higher quiz scores. Which design would provide the strongest evidence for a causal conclusion?`,
          correct,['Survey students about which routine they already prefer and compare grades.','Compare one school using the routine with a different school that does not.','Ask only high-scoring students whether they have used the routine.'],
          'Random assignment best balances confounding variables between groups.',r,'Evaluating Statistical Claims');
      }
      default:{
        const density=int(r,3,9),area=int(r,40,90),pct=int(r,60,85),correct=Math.round(density*area*pct/100);
        return mcq(q,'M2-PSDA-multistep-rate-percent','',`A habitat contains about ${density} nests per square kilometer. A protected region covers ${area} square kilometers, and ${pct}% is suitable nesting habitat. About how many nests are expected in the suitable habitat?`,
          correct,[density*area,Math.round(area*pct/100),correct+density*10],`Find ${pct}% of ${area} square kilometers, then multiply by ${density} nests per square kilometer.`,r,'Ratios, Rates, Proportional Relationships, and Units');
      }
    }
  }

  function mathGeo(q,k,r){
    switch(k){
      case 0:{
        const h=int(r,2,6),kk=int(r,2,6),rad=int(r,4,9),C=rad*rad-h*h-kk*kk;
        return mcq(q,'M2-GEO-complete-square-circle','',`The equation x²+y²−${2*h}x−${2*kk}y=${C} defines a circle. What is its radius?`,
          rad,[rad*rad,h+kk,Math.abs(h-kk)],`Complete the square to obtain (x−${h})²+(y−${kk})²=${rad*rad}.`,r,'Circles');
      }
      case 1:{
        const s=int(r,2,4),small=int(r,18,50),big=small*s*s,side=int(r,5,12),correct=side*s;
        return mcq(q,'M2-GEO-area-to-length-scale','',`Two similar triangles have areas ${small} and ${big}. A side of the smaller triangle is ${side}. What is the corresponding side of the larger triangle?`,
          correct,[side*s*s,side+s,side*(s+1)],`The area ratio is ${s*s}, so the length scale factor is ${s}.`,r,'Lines, Angles, and Triangles');
      }
      case 2:{
        const rad=int(r,3,7),h=int(r,5,12),correct=rad*rad*h;
        return mcq(q,'M2-GEO-cylinder-from-circumference','',`A right circular cylinder has base circumference ${2*rad}π and height ${h}. Its volume is kπ. What is k?`,
          correct,[2*rad*h,rad*h,correct*2],`The radius is ${rad}; volume=πr²h=${correct}π.`,r,'Area and Volume');
      }
      default:{
        const leg=int(r,4,9),scale=int(r,2,5),smallHyp=5*leg,smallOpp=3*leg,bigHyp=smallHyp*scale,correct=smallOpp*scale;
        return mcq(q,'M2-GEO-similar-trig-scale','',`Two right triangles are similar. In the smaller triangle, sin θ=3/5 and the hypotenuse is ${smallHyp}. The larger triangle has hypotenuse ${bigHyp}. What is the side opposite θ in the larger triangle?`,
          correct,[smallOpp,bigHyp*3/5+scale,bigHyp*4/5],`The larger triangle scales by ${scale}; the opposite side is ${smallOpp}×${scale}=${correct}.`,r,'Right Triangles and Trigonometry');
      }
    }
  }

  function buildMath(test,route,base){
    const r=rng(hash(`v5-math-${test}-${route}`)),counts={};
    const out=base.map((q,i)=>{
      const w={...q,level:levelFor('Math',route,i),format:'mcq'};
      const d=w.domain,k=counts[d]||0;counts[d]=k+1;
      if(d==='Algebra')return mathAlgebra(w,k,r);
      if(d==='Advanced Math')return mathAdvanced(w,k,r);
      if(d==='Problem-Solving and Data Analysis')return mathPSDA(w,k,r);
      if(d==='Geometry and Trigonometry')return mathGeo(w,k,r);
      return w;
    });
    return toFiveSPR(out);
  }

  const TOPICS=['migratory shorebirds','soil carbon storage','historical mapmaking','museum lighting','urban tree cover','microplastic transport','language revitalization','ancient irrigation','sleep and learning','reef restoration','theater acoustics','battery reuse','public transit','plant-pollinator networks','scientific replication','archival preservation','heat-resilient crops','digital art conservation','river restoration','memory research'];
  function topic(test,k){return TOPICS[(test*5+k*3)%TOPICS.length]}

  function rwCraft(q,k,r,test){
    const t=topic(test,k);
    switch(k){
      case 0:return mcq(q,'M2-RW-cross-text-experiment',`Text 1\nSome ecologists argue that a community's initial species diversity strongly determines its later diversity, even under similar environmental conditions.\n\nText 2\nResearchers created artificial pools with either one zooplankton species or a diverse mixture. After several years, the two sets of pools showed little difference in species diversity.`,
        'How would the researchers in Text 2 most likely respond to the view in Text 1?','The view is plausible in principle but is not supported by the experimental result described in Text 2.',
        ['The view is confirmed because initially diverse pools remained more diverse.','The view cannot be evaluated experimentally.','The view is true only when communities begin with one species.'],
        'Text 2 reports a result that fails to support the proposed effect of initial diversity.',r,'Cross-Text Connections');
      case 1:return mcq(q,'M2-RW-cross-text-scope',`Text 1\nA broad study of ${t} reports an average benefit across many sites and argues that the intervention is useful in many settings.\n\nText 2\nA second study also finds a benefit, but only where baseline conditions fall within a narrow range.`,
        'How would the authors of Text 2 most likely respond to Text 1?','They would qualify Text 1’s broad conclusion by arguing that the benefit depends on baseline conditions.',
        ['They would reject any benefit.','They would argue baseline conditions are irrelevant.','They would claim Text 1 used too many sites.'],
        'Text 2 narrows the conditions under which the benefit should be expected.',r,'Cross-Text Connections');
      case 2:return mcq(q,'M2-RW-cross-text-myth',`Text 1\nA popular account claims that observers fled the first public demonstration of a new technology and treats the story as evidence of its transformative power.\n\nText 2\nA historian notes that no contemporary source documents such a reaction and argues that the story persists because it dramatizes a later belief that the technology divided cultural history into a before and an after.`,
        'Which statement about Text 1 would the author of Text 2 most likely agree with?','It is shaped more by a later belief about the technology’s importance than by contemporary evidence.',
        ['It is accurate because later historians repeated it.','It proves early observers understood the technology better than modern audiences.','It is unsupported only because the demonstration was private.'],
        'Text 2 treats the account as a retrospective cultural myth.',r,'Cross-Text Connections');
      case 3:return mcq(q,'M2-RW-structure-revision',`A long-standing model of ${t} explains a broad regional pattern but leaves several local exceptions unresolved. A newer model retains the older mechanism while adding an interaction with local conditions, accounting for both the broad pattern and many exceptions.`,
        'Which choice best describes the overall structure?','It presents an established explanation, identifies a limitation, and then introduces a revised explanation that preserves part of the original account.',
        ['It rejects an established explanation and replaces it with an unrelated one.','It lists explanations without relating them.','It argues that no general explanation is possible.'],
        'The newer model extends and qualifies the older one.',r,'Text Structure and Purpose');
      case 4:return mcq(q,'M2-RW-function-method',`A study of ${t} compared measurements from many sites. Before testing its main hypothesis, the team excluded sites with incomplete baseline records and used the same observation window at every remaining site. The analysis then showed the predicted relationship was strongest where baseline values were lowest.`,
        'What is the function of the second sentence?','It describes methodological choices that make the later comparison among sites more interpretable.',
        ['It states the central conclusion.','It introduces an alternative hypothesis.','It explains why the researchers abandoned the data set.'],
        'The sentence describes controls and exclusions that support the comparison.',r,'Text Structure and Purpose');
      case 5:return mcq(q,'M2-RW-word-context-qualified',`The authors call their conclusion “qualified,” noting that the pattern is consistent across measured sites but may not extend to environments unlike those in the study.`,
        'As used in the text, “qualified” most nearly means','limited in scope',['professionally trained','strongly praised','expressed with certainty'],
        'The conclusion is restricted by a stated limitation on generalization.',r,'Words in Context');
      case 6:return mcq(q,'M2-RW-literary-cross-text',`Text 1\nIn an original short story, a railway station is plain and severe, yet the narrator associates it with possibility because it connects a crowded city to open countryside.\n\nText 2\nA critic argues that the story contrasts the city's emphasis on material success with the countryside's association with personal connection and imagination.`,
        'Which interpretation of the station would the critic most likely support?','The station functions as a point of passage from the material values associated with the city toward the possibilities associated with the countryside.',
        ['Its plain appearance symbolizes rejection of travel.','Its location proves the countryside is becoming more materialistic.','Its architecture is more luxurious than the city around it.'],
        'The station links the two symbolic spaces and is viewed positively.',r,'Cross-Text Connections');
      default:return mcq(q,'M2-RW-source-limitation-structure',`Researchers examining the history of ${t} face a source problem: surviving written accounts were produced mostly by outsiders whose descriptions omit many local practices. One historian therefore combines those accounts with oral histories and archaeological evidence, not to discard the written record but to supplement its limitations.`,
        'Which choice best describes the overall structure?','It identifies a limitation in one body of evidence and then describes a method for addressing that limitation.',
        ['It argues written evidence should never be used.','It compares two historians and rejects both methods.','It introduces a question and then changes to an unrelated topic.'],
        'The later evidence supplements rather than replaces the limited written record.',r,'Text Structure and Purpose');
    }
  }

  function rwInfo(q,k,r,test){
    const t=topic(test,k);
    switch(k){
      case 0:return mcq(q,'M2-RW-strengthen-causal',`Researchers observe that neighborhoods with more ${t} also have lower summer surface temperatures. They hypothesize that increasing ${t} directly contributes to cooling.`,
        'Which finding would most directly strengthen the causal interpretation?','Randomly selected comparable blocks receive an increase in the feature, and those blocks cool more than untreated blocks over the same period.',
        ['Residents in cooler neighborhoods report liking the feature.','Older neighborhoods have both more of the feature and narrower streets.','The same thermometer model is used everywhere.'],
        'A randomized intervention with a comparison group provides direct causal evidence.',r,'Command of Evidence: Textual');
      case 1:return mcq(q,'M2-RW-weaken-confounder',`A study finds that students who voluntarily use a new study routine score higher on an exam than students who do not. The researchers conclude that the routine causes higher scores.`,
        'Which finding would most weaken the conclusion?','Students who chose the routine had substantially higher prior grades than students who did not choose it.',
        ['Some students found the routine easy to follow.','The exam had multiple-choice and free-response questions.','Both groups took the exam in the same room.'],
        'Prior achievement is a plausible confounder because use of the routine was voluntary.',r,'Command of Evidence: Textual');
      case 2:{
        const a0=int(r,40,55),a1=a0+int(r,14,24),b0=a0+int(r,-3,3),b1=b0+int(r,3,8),ga=a1-a0,gb=b1-b0;
        return mcq(q,'M2-RW-quant-change-comparison',`A researcher argues that a training method improves performance beyond retesting effects.\n\nGroup | Before | After\nTraining | ${a0} | ${a1}\nComparison | ${b0} | ${b1}`,
          'Which choice most effectively supports the argument?',`The training group improved by ${ga} points, whereas the comparison group improved by only ${gb} points.`,
          [`The training group ended at ${a1} points.`,`The comparison group began at ${b0} points.`,'Both groups had higher scores after the second test.'],
          'The relevant comparison is the size of the change in each group.',r,'Command of Evidence: Quantitative');
      }
      case 3:return mcq(q,'M2-RW-central-conditional-effect',`Scientists studying ${t} expected one environmental variable to predict the outcome across all sites. It predicted the outcome well in dry sites but had almost no relationship with the outcome in wet sites. The researchers therefore propose that moisture changes how strongly the variable affects the process.`,
        'Which choice best states the main idea?','The effect of the environmental variable appears to depend on moisture conditions.',
        ['The variable has no relationship with the outcome.','Wet sites provide more reliable measurements.','Moisture is the only factor that affects the process.'],
        'The key result is an interaction between the variable and moisture conditions.',r,'Central Ideas and Details');
      case 4:{
        const p1=int(r,35,50),p2=p1+int(r,12,25);
        return mcq(q,'M2-RW-inference-sampling',`Two independent random samples were asked the same question about ${t}. Support was ${p1}% in the first sample and ${p2}% in the second.`,
          'Which conclusion is best supported?','The difference illustrates sampling variability and cautions against treating either sample percentage as the exact population value.',
          [`Exactly ${p2}% of the entire population supports the proposal.`,'The samples must have used different wording.','Random sampling prevents sample estimates from differing.'],
          'Independent random samples can produce different estimates.',r,'Inferences');
      }
      case 5:return mcq(q,'M2-RW-literary-inference',`An original story describes Mara preparing for a difficult public presentation. She repeatedly rearranges her notes, rehearses the opening line under her breath, and checks the clock even though she arrived early.`,
        'Which inference about Mara is best supported?','Mara is anxious about the presentation despite having prepared for it.',
        ['Mara has forgotten the topic.','Mara plans to leave before it begins.','Mara believes the audience will be smaller than expected.'],
        'Repeated rehearsal and clock-checking suggest anxiety; arriving early and having notes show preparation.',r,'Inferences');
      default:return mcq(q,'M2-RW-alternative-explanation',`Researchers find that populations exposed to more artificial light at night begin a seasonal behavior earlier. They initially interpret this as a direct effect of light. A later analysis shows that the brightest sites are also consistently warmer at night.`,
        'Which conclusion is most strongly supported by the later analysis?','The timing difference may be partly attributable to temperature rather than to light alone.',
        ['Artificial light has no effect under any conditions.','Temperature and light are always unrelated.','The behavior occurs only at the brightest sites.'],
        'Nighttime temperature covaries with light and could confound the original interpretation.',r,'Inferences');
    }
  }

  function rwSEC(q,k,r,test){
    const t=topic(test,k);
    switch(k){
      case 0:return mcq(q,'M2-RW-SEC-conjunctive-adverb',`The first study reported a large effect _____ a later replication using a larger sample found only a modest difference.`,
        'Which choice completes the text so that it conforms to Standard English?','; however,',[', however,',': however,',', however;'],'Two independent clauses with “however” require a semicolon before and comma after.',r,'Boundaries');
      case 1:return mcq(q,'M2-RW-SEC-colon-explanation',`The team identified one major limitation in the study of ${t} _____ the sensors recorded daytime conditions but not nighttime conditions.`,
        'Which choice completes the text so that it conforms to Standard English?',':',[',','; because','— and'],'A colon introduces an explanation after a complete clause.',r,'Boundaries');
      case 2:return mcq(q,'M2-RW-SEC-modifier','',
        'Which revision makes the introductory phrase logically modify the subject?','Using measurements collected over ten years, the researchers distinguished short-term fluctuations from a longer trend.',
        ['Using measurements collected over ten years, short-term fluctuations were distinguished from a longer trend by the researchers.','Using measurements collected over ten years, a longer trend was what the researchers distinguished from fluctuations.','Using measurements collected over ten years, there were researchers distinguishing fluctuations from a longer trend.'],
        'The noun following the introductory phrase should be the people using the measurements.',r,'Form, Structure, and Sense');
      case 3:return mcq(q,'M2-RW-SEC-agreement',`The collection of field notes, along with several later annotations, _____ evidence that the research team revised its interpretation over time.`,
        'Which choice completes the text so that it conforms to Standard English?','provides',['provide','have provided','providing'],'The subject “collection” is singular.',r,'Form, Structure, and Sense');
      case 4:return mcq(q,'M2-RW-SEC-past-perfect',`By the time the second survey began, the researchers _____ the questionnaire twice in response to pilot testing.`,
        'Which choice completes the text so that it conforms to Standard English?','had revised',['revised','have revised','will revise'],'Past perfect marks an action completed before another past event.',r,'Form, Structure, and Sense');
      case 5:return mcq(q,'M2-RW-SEC-possessive',`The two laboratories compared results before publishing a joint report, ensuring that each _____ measurements had been checked independently.`,
        'Which choice completes the text so that it conforms to Standard English?',`team's`,['teams','teams’','team'],'“Each” takes the singular possessive “team’s.”',r,'Form, Structure, and Sense');
      default:return mcq(q,'M2-RW-SEC-relative-clause',`The new instrument _____ produced stable measurements throughout the field season.`,
        'Which choice completes the text so that it conforms to Standard English?',', which was designed to operate in high humidity,',['which was designed to operate in high humidity','; which was designed to operate in high humidity,',': which was designed to operate in high humidity,'],
        'The nonessential relative clause must be set off with commas.',r,'Boundaries');
    }
  }

  function rwExpr(q,k,r,test){
    const t=topic(test,k);
    switch(k){
      case 0:return mcq(q,'M2-RW-transition-contrast',`The first experiment on ${t} produced a strong effect in dry conditions. _____ a replication in humid conditions found almost no effect.`,
        'Which choice completes the text with the most logical transition?','However,',['Therefore,','For example,','Similarly,'],'The second sentence contrasts with the first.',r,'Transitions');
      case 1:return mcq(q,'M2-RW-transition-result',`The revised sensor reduced measurement error by more than half. _____ the researchers could detect differences that had been obscured in earlier data.`,
        'Which choice completes the text with the most logical transition?','Consequently,',['Nevertheless,','For instance,','Meanwhile,'],'The second sentence is a result of the first.',r,'Transitions');
      case 2:{
        const n1=int(r,30,60),n2=n1+int(r,80,140);
        return mcq(q,'M2-RW-synthesis-broaden-comparable',`A student took these notes:\n• An early study of ${t} included ${n1} sites in one region.\n• A later replication included ${n2} sites across four regions.\n• Both studies used the same primary outcome measure.\n• The goal is to emphasize broader evidence while preserving comparability.`,
          'Which choice best accomplishes the goal?',`The later replication expanded the study from ${n1} sites in one region to ${n2} sites across four regions while retaining the same primary outcome measure.`,
          [`Researchers have studied ${t} in more than one region.`,'The earlier study was conducted before the later replication.','Both studies collected a primary outcome measure.'],
          'The correct choice states both the broader scope and the retained measure.',r,'Rhetorical Synthesis');
      }
      case 3:return mcq(q,'M2-RW-synthesis-causal-limitation',`A student took these notes:\n• A study reports an association between ${t} and improved performance.\n• Participants chose whether to use the intervention.\n• Users of the intervention had higher prior scores.\n• The goal is to emphasize a limitation on causal interpretation.`,
        'Which choice best accomplishes the goal?','Because participants self-selected into the intervention and already had higher prior scores, the study cannot establish that the intervention itself caused the performance difference.',
        ['The intervention was used by participants who had prior scores.','The study found an association between the intervention and performance.','Participants were allowed to choose whether to use the intervention.'],
        'The correct choice links both confounders directly to the causal limitation.',r,'Rhetorical Synthesis');
      default:return mcq(q,'M2-RW-synthesis-complementary-methods',`A student took these notes:\n• In 2012, researchers began monitoring ${t} with satellite data.\n• In 2019, they added ground sensors with finer local measurements.\n• Satellite monitoring continued.\n• The goal is to show that the newer method complemented rather than replaced the older one.`,
        'Which choice best accomplishes the goal?','Beginning in 2019, ground sensors added finer local measurements to the continuing satellite record, so the newer method complemented rather than replaced the earlier one.',
        ['Researchers began collecting satellite data in 2012 and installed ground sensors in 2019.','Ground sensors provide local measurements, whereas satellites collect data from above Earth.','The project used two measurement technologies during different years.'],
        'The correct choice explicitly explains how the methods worked together.',r,'Rhetorical Synthesis');
    }
  }

  function buildRW(test,route,base){
    const r=rng(hash(`v5-rw-${test}-${route}`)),counts={};
    return base.map((q,i)=>{
      const w={...q,level:levelFor('Reading & Writing',route,i),format:'mcq'},d=w.domain,k=counts[d]||0;counts[d]=k+1;
      if(d==='Craft and Structure')return rwCraft(w,k,r,test);
      if(d==='Information and Ideas')return rwInfo(w,k,r,test);
      if(d==='Standard English Conventions')return rwSEC(w,k,r,test);
      if(d==='Expression of Ideas')return rwExpr(w,k,r,test);
      return w;
    });
  }

  bank.getModule=function(test,section,module,route='mixed'){
    const qs=previous(test,section,module,route);
    if(Number(module)!==2)return qs;
    return section==='Math'?buildMath(Number(test)||1,route,qs):buildRW(Number(test)||1,route,qs);
  };
  bank.version=5;
  bank.module2Architecture='independent-archetype-bank';
})();