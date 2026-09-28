(function difficultyLayer(){
  'use strict';
  const bank=window.StudyAISATMocks;
  if(!bank||Number(bank.version)<2)return;
  const previous=bank.getModule.bind(bank);

  function hash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  function int(r,a,b){return a+Math.floor(r()*(b-a+1))}
  function shuf(r,a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const x=a%b;a=b;b=x}return a||1}
  function frac(n,d){const g=gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d}return d===1?String(n):n+'/'+d}
  function round(n,p=2){const f=10**p;return Math.round((n+Number.EPSILON)*f)/f}

  function mcq(q,stem,correct,wrong,explanation,r,skill=q.skill){
    const opts=[String(correct),...wrong.map(String)].filter((v,i,a)=>a.indexOf(v)===i);
    let bump=1;
    while(opts.length<4)opts.push(String(Number(correct)+bump++));
    const options=shuf(r,opts.slice(0,4));
    return {...q,id:q.id+'-v3',skill,stem,options,answer:options.indexOf(String(correct)),explanation,passage:'',format:'mcq'};
  }
  function spr(q,stem,correct,explanation,accepted=[],skill=q.skill){
    return {...q,id:q.id+'-v3',skill,stem,options:[],answer:null,correctAnswer:String(correct),acceptedAnswers:[String(correct),...accepted.map(String)],explanation,passage:'',format:'spr'};
  }

  function harderMath(q,index,r){
    if(q.level!=='Advanced')return q;
    const isSpr=q.format==='spr';

    if(q.domain==='Algebra'){
      switch(index%6){
        case 0:{
          const a=int(r,3,8), b=int(r,5,17), c=b+int(r,2,7);
          const stem=`For what value of k does kx + ${b} = ${a}x + ${c} have no solution?`;
          const exp=`No solution occurs when the x-coefficients match but the constants differ, so k=${a}.`;
          return isSpr?spr(q,stem,a,exp,[],'Linear Equations in One Variable'):mcq(q,stem,a,[b,c,a+1],exp,r,'Linear Equations in One Variable');
        }
        case 1:{
          const a=int(r,2,5), b=int(r,2,5), x=int(r,3,8), y=int(r,2,7), c1=a*x+b*y, c2=(a+2)*x+(b-1)*y, ans=x-y;
          const stem=`The system ${a}x + ${b}y = ${c1} and ${a+2}x + ${b-1}y = ${c2} has solution (x,y). What is x-y?`;
          const exp=`Solving gives x=${x}, y=${y}, so x-y=${ans}.`;
          return isSpr?spr(q,stem,ans,exp,[],'Systems of Two Linear Equations in Two Variables'):mcq(q,stem,ans,[x+y,x,y],exp,r,'Systems of Two Linear Equations in Two Variables');
        }
        case 2:{
          const m=int(r,3,7), b=int(r,4,14), x0=int(r,5,11), y0=m*x0+b, correct=frac(y0*m+x0,m);
          const stem=`A line has equation y=${m}x+${b}. A second line is perpendicular to it and passes through (${x0},${y0}). What is the y-intercept of the second line?`;
          const exp=`The perpendicular slope is -1/${m}. Using point-slope form gives y-intercept ${correct}.`;
          return mcq(q,stem,correct,[y0,frac(y0*m-x0,m),b],exp,r,'Linear Equations in Two Variables');
        }
        case 3:{
          const rate=int(r,4,9), max=int(r,12,24), fee=int(r,20,45), budget=fee+rate*max+int(r,1,rate-1);
          const stem=`A group has at most $${budget} for a $${fee} reservation fee plus $${rate} per person. What is the greatest possible number of people?`;
          const exp=`${fee}+${rate}p≤${budget}, so p≤${round((budget-fee)/rate,2)}. The greatest integer is ${max}.`;
          return isSpr?spr(q,stem,max,exp,[],'Linear Inequalities in One Variable'):mcq(q,stem,max,[max-1,max+1,Math.floor(budget/rate)],exp,r,'Linear Inequalities in One Variable');
        }
        case 4:{
          const x1=int(r,2,6), slope=int(r,3,7), y1=int(r,20,40), target=y1+int(r,6,14)*slope, correct=x1+(target-y1)/slope;
          const stem=`A linear model has rate of change ${slope} and passes through (${x1},${y1}). For what input x does the model output ${target}?`;
          const exp=`y=${slope}(x-${x1})+${y1}. Setting y=${target} gives x=${correct}.`;
          return isSpr?spr(q,stem,correct,exp,[],'Linear Functions'):mcq(q,stem,correct,[correct-1,correct+1,target/slope],exp,r,'Linear Functions');
        }
        default:{
          const adult=int(r,14,22), child=int(r,5,10), total=int(r,40,70), adults=int(r,15,total-10), children=total-adults, revenue=adult*adults+child*children;
          const stem=`Adult tickets cost $${adult} and child tickets cost $${child}. If ${total} tickets produce $${revenue}, how many child tickets were sold?`;
          const exp=`Let c be child tickets. ${adult}(${total}-c)+${child}c=${revenue}, so c=${children}.`;
          return isSpr?spr(q,stem,children,exp,[],'Systems of Two Linear Equations in Two Variables'):mcq(q,stem,children,[adults,total,Math.abs(adults-children)],exp,r,'Systems of Two Linear Equations in Two Variables');
        }
      }
    }

    if(q.domain==='Advanced Math'){
      switch(index%6){
        case 0:{
          const a=int(r,2,5), h=int(r,3,8), k=int(r,2,9), y=9*a+k, correct=4*a+k;
          const stem=`The parabola y=a(x-${h})²+${k} passes through (${h+3},${y}). What is the y-value when x=${h-2}?`;
          const exp=`${y}=9a+${k}, so a=${a}. Then y=${a}(4)+${k}=${correct}.`;
          return isSpr?spr(q,stem,correct,exp,[],'Nonlinear Functions'):mcq(q,stem,correct,[a+k,y,correct+a],exp,r,'Nonlinear Functions');
        }
        case 1:{
          const r1=int(r,3,8), r2=r1+int(r,4,9), sum=r1+r2, prod=r1*r2, correct=r2*r2;
          const stem=`One solution of x²-${sum}x+${prod}=0 is ${r1}. What is the square of the other solution?`;
          const exp=`The roots sum to ${sum}, so the other root is ${r2}; its square is ${correct}.`;
          return isSpr?spr(q,stem,correct,exp,[],'Nonlinear Equations in One Variable'):mcq(q,stem,correct,[r2,sum,prod],exp,r,'Nonlinear Equations in One Variable');
        }
        case 2:{
          const p=int(r,2,5), r1=int(r,2,7), r2=r1+int(r,2,5), b=-p*(r1+r2), c=p*r1*r2;
          const stem=`For p(x)=${p}x² ${b<0?'-':'+'} ${Math.abs(b)}x + ${c}, one zero is ${r1}. What is the other zero?`;
          const exp=`p(x)=${p}(x-${r1})(x-${r2}), so the other zero is ${r2}.`;
          return mcq(q,stem,r2,[r1,r1+r2,c],exp,r,'Equivalent Expressions');
        }
        case 3:{
          const base=int(r,2,5), c=int(r,2,6), exponent=int(r,3,6), ans=(exponent+c)/2;
          const stem=`If ${base}^(2x-${c})=${Math.pow(base,exponent)}, what is x?`;
          const exp=`Equal bases imply 2x-${c}=${exponent}, so x=${ans}.`;
          return isSpr?spr(q,stem,ans,exp,[],'Nonlinear Equations in One Variable'):mcq(q,stem,ans,[exponent,c,(exponent-c)/2],exp,r,'Nonlinear Equations in One Variable');
        }
        case 4:{
          const a=int(r,2,5), b=int(r,2,8), x=int(r,2,5), gx=x*x+b, correct=a*gx-b;
          const stem=`Let f(x)=${a}x-${b} and g(x)=x²+${b}. What is f(g(${x}))?`;
          const exp=`g(${x})=${gx}; then f(${gx})=${a}(${gx})-${b}=${correct}.`;
          return isSpr?spr(q,stem,correct,exp,[],'Nonlinear Functions'):mcq(q,stem,correct,[gx,a*x-b,correct+b],exp,r,'Nonlinear Functions');
        }
        default:{
          const a=int(r,2,5), b=2*a*int(r,2,6), correct=b*b/(4*a);
          const stem=`For what value of k does ${a}x²+${b}x+k=0 have exactly one real solution?`;
          const exp=`Exactly one real solution requires b²-4ak=0, so k=${correct}.`;
          return isSpr?spr(q,stem,correct,exp,[],'Nonlinear Equations in One Variable'):mcq(q,stem,correct,[correct/2,correct*2,b/a],exp,r,'Nonlinear Equations in One Variable');
        }
      }
    }

    if(q.domain==='Problem-Solving and Data Analysis'){
      switch(index%4){
        case 0:{
          const mean1=int(r,25,45), mean2=mean1+int(r,8,20), n1=int(r,80,140), n2=int(r,150,260), correct=round((mean1*n1+mean2*n2)/(n1+n2),1);
          const stem=`Group A has ${n1} observations with mean ${mean1}; Group B has ${n2} observations with mean ${mean2}. What is the mean of the combined data set?`;
          const exp=`Use a weighted mean: (${mean1}·${n1}+${mean2}·${n2})/${n1+n2}=${correct}.`;
          return isSpr?spr(q,stem,correct,exp,[],'One-variable Data'):mcq(q,stem,correct,[(mean1+mean2)/2,mean1,mean2],exp,r,'One-variable Data');
        }
        case 1:{
          const total=int(r,220,360), a=int(r,90,150), both=int(r,25,55), b=int(r,90,150), correct=frac(both,a);
          const stem=`In a survey of ${total} people, ${a} chose A, ${b} chose B, and ${both} chose both. Given that a person chose A, what is the probability the person also chose B?`;
          const exp=`Conditional probability is ${both}/${a}=${correct}.`;
          if(isSpr)return spr(q,stem,correct,exp,[both/a],'Probability and Conditional Probability');
          return mcq(q,stem,correct,[frac(both,total),frac(a,total),frac(a-both,a)],exp,r,'Probability and Conditional Probability');
        }
        case 2:{
          const sample=int(r,220,420), pct=int(r,52,68), pop=int(r,2500,5000), estimate=Math.round(pop*pct/100/10)*10;
          const stem=`A random sample of ${sample} residents finds that ${pct}% support a proposal. What is the best estimate of the number among ${pop} residents who support it?`;
          const exp=`Estimate ${pct}% of ${pop}, which is about ${estimate}.`;
          return mcq(q,stem,estimate,[Math.round(sample*pct/100),Math.round(pop*(100-pct)/100/10)*10,pop],exp,r,'Inference from Sample Statistics');
        }
        default:{
          const start=int(r,80,150), up=int(r,12,30), down=int(r,8,22), mult=(1+up/100)*(1-down/100), correct=round((mult-1)*100,1);
          const stem=`A price increases by ${up}% and then decreases by ${down}% from the increased price. What is the overall percent change?`;
          const exp=`The overall multiplier is ${(1+up/100).toFixed(2)}×${(1-down/100).toFixed(2)}, giving ${correct}%.`;
          return isSpr?spr(q,stem,correct,exp,[String(correct)+'%'],'Percentages'):mcq(q,stem,correct,[up-down,up+down,-correct],exp,r,'Percentages');
        }
      }
    }

    if(q.domain==='Geometry and Trigonometry'){
      switch(index%4){
        case 0:{
          const cx=int(r,-5,5), cy=int(r,-5,5), px=cx+3, py=cy+4, correct='-3/4';
          const stem=`The circle (x-${cx})²+(y-${cy})²=25 contains (${px},${py}). What is the slope of the tangent line at that point?`;
          const exp='The radius slope is 4/3, so the tangent slope is -3/4.';
          if(isSpr)return spr(q,stem,correct,exp,[-0.75],'Circles');
          return mcq(q,stem,correct,['3/4','-4/3','4/3'],exp,r,'Circles');
        }
        case 1:{
          const ratio=int(r,2,4), v=int(r,30,80), correct=v*ratio**3;
          const stem=`Two similar solids have corresponding length ratio 1:${ratio}. If the smaller has volume ${v}, what is the volume of the larger?`;
          const exp=`Volumes scale by the cube of the linear scale factor: ${v}·${ratio}³=${correct}.`;
          return isSpr?spr(q,stem,correct,exp,[],'Area and Volume'):mcq(q,stem,correct,[v*ratio,v*ratio*ratio,v+correct],exp,r,'Area and Volume');
        }
        case 2:{
          const deg=[60,90,120,150][index%4], correct=frac(deg,360);
          const stem=`A sector has central angle ${deg}°. What fraction of the circle's area is in the sector?`;
          const exp=`The fraction is ${deg}/360=${correct}.`;
          if(isSpr)return spr(q,stem,correct,exp,[deg/360],'Circles');
          return mcq(q,stem,correct,[frac(deg,180),frac(360-deg,360),'1/2'],exp,r,'Circles');
        }
        default:{
          const tri=[[5,12,13],[8,15,17],[7,24,25]][index%3], scale=int(r,2,5), hyp=tri[2]*scale, correct=tri[0]*scale;
          const stem=`In a right triangle, cos θ=${tri[1]}/${tri[2]} and the hypotenuse is ${hyp}. What is the side opposite θ?`;
          const exp=`The side ratio is ${tri.join(':')}; scaling by ${scale} gives opposite side ${correct}.`;
          return isSpr?spr(q,stem,correct,exp,[],'Right Triangles and Trigonometry'):mcq(q,stem,correct,[tri[1]*scale,hyp,correct+scale],exp,r,'Right Triangles and Trigonometry');
        }
      }
    }
    return q;
  }

  function harderRW(q,index,r){
    if(q.level!=='Advanced')return q;

    if(q.domain==='Information and Ideas' && index%3===0){
      const a=int(r,40,60), b=a+int(r,8,17), c=a+int(r,2,7), gainA=b-a, gainB=c-(a+1);
      const passage=`A study compared three versions of a training program. Group A improved from ${a} to ${b} points, Group B improved from ${a+1} to ${c} points, and a no-training group changed from ${a-2} to ${a} points. Researchers argue that Version A produced an improvement beyond ordinary retesting effects.`;
      const correct=`Group A improved by ${gainA} points, compared with ${gainB} points for Group B and 2 points for the no-training group.`;
      const options=shuf(r,[correct,'All three groups improved by approximately the same amount.','Group B had the largest improvement because its final score exceeded the no-training group.','The no-training group improved more than Group A.']);
      return {...q,id:q.id+'-v3',passage,stem:'Which choice most effectively uses the data to support the researchers’ argument?',options,answer:options.indexOf(correct),skill:'Command of Evidence: Quantitative',explanation:'The relevant comparison is the amount of change in each group.'};
    }

    if(q.domain==='Craft and Structure' && index%3===1){
      const passage=`Text 1\nA historian argues that a sudden rise in surviving documents after 1880 reflects a real expansion in public participation.\n\nText 2\nAnother historian notes that a preservation law took effect in 1881 and sharply increased the fraction of records that survived. The second historian agrees that participation may have risen but argues that the archival jump cannot be interpreted without considering preservation.`;
      const correct='Text 2 accepts the possibility of Text 1’s conclusion but argues that the evidence is confounded by a change in preservation.';
      const options=shuf(r,[correct,'Text 2 rejects archival evidence under all circumstances.','Text 2 argues that participation definitely declined after 1880.','Text 2 agrees that preservation practices remained unchanged.']);
      return {...q,id:q.id+'-v3',passage,stem:'How would the author of Text 2 most likely respond to Text 1’s interpretation?',options,answer:options.indexOf(correct),skill:'Cross-Text Connections',explanation:'Text 2 challenges the strength of the inference, not the possibility that participation rose.'};
    }

    if(q.domain==='Expression of Ideas' && index%2===0){
      const passage='A student wants to emphasize a contrast between two findings.\n• In dry conditions, the intervention increased output by 18%.\n• In humid conditions, the intervention changed output by only 2%.\n• The same measurement procedure was used in both conditions.';
      const correct='Although the intervention increased output by 18% in dry conditions, it changed output by only 2% in humid conditions.';
      const options=shuf(r,[correct,'The same measurement procedure was used in dry and humid conditions.','Researchers tested an intervention under two environmental conditions.','The intervention was measured using percentages in both conditions.']);
      return {...q,id:q.id+'-v3',passage,stem:'Which choice most effectively uses information from the notes to accomplish the student’s goal?',options,answer:options.indexOf(correct),skill:'Rhetorical Synthesis',explanation:'The correct choice directly foregrounds the contrast in effect size.'};
    }

    return q;
  }

  bank.getModule=function(test,section,module,route='mixed'){
    const qs=previous(test,section,module,route);
    const r=rng(hash(`mock-difficulty-v3-${test}-${section}-${module}-${route}`));
    return section==='Math'
      ? qs.map((q,i)=>harderMath(q,i,r))
      : qs.map((q,i)=>harderRW(q,i,r));
  };
  bank.version=3;
})();