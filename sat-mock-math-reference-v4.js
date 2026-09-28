(function mathRefV4(){
  'use strict';
  const bank=window.StudyAISATMocks;
  if(!bank)return;
  const previous=bank.getModule.bind(bank);

  function hash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  function int(r,a,b){return a+Math.floor(r()*(b-a+1))}
  function pick(r,a){return a[Math.floor(r()*a.length)%a.length]}
  function shuf(r,a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const x=a%b;a=b;b=x}return a||1}
  function frac(n,d){const g=gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d}return d===1?String(n):n+'/'+d}
  function round(n,p=2){const f=10**p;return Math.round((n+Number.EPSILON)*f)/f}

  function make(q,stem,correct,wrong,explanation,r,skill=q.skill){
    if(q.format==='spr'){
      return {...q,id:q.id+'-ref4',skill,passage:'',stem,options:[],answer:null,correctAnswer:String(correct),acceptedAnswers:[String(correct)],explanation};
    }
    const vals=[String(correct),...wrong.map(String)].filter((v,i,a)=>a.indexOf(v)===i);
    let bump=1; while(vals.length<4) vals.push(String(Number(correct)+bump++));
    const options=shuf(r,vals.slice(0,4));
    return {...q,id:q.id+'-ref4',skill,passage:'',stem,options,answer:options.indexOf(String(correct)),explanation};
  }

  function algebra(q,k,level,r){
    const hard=level==='Advanced';
    switch(k%8){
      case 0:{
        if(hard){
          const a=int(r,3,8), b=int(r,4,14), c=b+int(r,2,7);
          return make(q,`For what value of k does kx + ${b} = ${a}x + ${c} have no solution?`,a,[b,c,a+1],`No solution occurs when the x-coefficients are equal but the constants differ, so k=${a}.`,r,'Linear Equations in One Variable');
        }
        const x=int(r,5,14), a=int(r,3,7), b=int(r,4,12), rhs=a*x+b;
        return make(q,`What value of x satisfies ${a}x + ${b} = ${rhs}?`,x,[x-1,x+1,rhs-b],`Subtract ${b} and divide by ${a}; x=${x}.`,r,'Linear Equations in One Variable');
      }
      case 1:{
        const rate=int(r,4,9), fixed=int(r,15,38), h=int(r,7,15), total=fixed+rate*h;
        if(hard){
          return make(q,`A service charges a fixed fee plus a constant amount per hour. A ${h}-hour job costs $${total}, while a ${h-3}-hour job costs $${total-3*rate}. What is the fixed fee?`,fixed,[rate,total-fixed,fixed+rate],`The 3-hour cost difference gives an hourly rate of ${rate}. Subtract ${rate*h} from ${total} to get the fixed fee ${fixed}.`,r,'Linear Functions');
        }
        return make(q,`A service charges a fixed fee of $${fixed} plus $${rate} per hour. What is the cost of a ${h}-hour job?`,total,[fixed+rate,total-rate,rate*h],`Cost = ${fixed}+${rate}(${h})=${total}.`,r,'Linear Functions');
      }
      case 2:{
        const a=int(r,2,5), b=a+int(r,1,4), x=int(r,2,8), y=int(r,1,7), c1=a*x+b*y, c2=(a+2)*x+(b-1)*y;
        const correct=hard?x-y:x+y;
        return make(q,`The system ${a}x + ${b}y = ${c1} and ${a+2}x + ${b-1}y = ${c2} has solution (x,y). What is ${hard?'x - y':'x + y'}?`,correct,[x,y,x+y+2],`Solving gives x=${x} and y=${y}; the requested value is ${correct}.`,r,'Systems of Two Linear Equations in Two Variables');
      }
      case 3:{
        const m=int(r,2,7), b=int(r,3,14), x0=int(r,4,10), y0=m*x0+b;
        if(hard){
          const correct=frac(y0*m+x0,m);
          return make(q,`A line has equation y=${m}x+${b}. A second line is perpendicular to it and passes through (${x0},${y0}). What is the y-intercept of the second line?`,correct,[y0,frac(y0*m-x0,m),b],`The perpendicular slope is -1/${m}. Using point-slope form gives y-intercept ${correct}.`,r,'Linear Equations in Two Variables');
        }
        return make(q,`Line q is perpendicular to y=${m}x+${b}. What is the slope of q?`,frac(-1,m),[m,frac(1,m),-m],'Perpendicular slopes are negative reciprocals.',r,'Linear Equations in Two Variables');
      }
      case 4:{
        const rate=int(r,3,8), max=int(r,10,24), fee=int(r,8,24), budget=fee+rate*max+(hard?int(r,1,rate-1):0);
        return make(q,`A group has at most $${budget} for a $${fee} reservation fee plus $${rate} per participant. What is the greatest possible number of participants?`,max,[max-1,max+1,Math.floor(budget/rate)],`${fee}+${rate}p≤${budget}; the greatest integer solution is ${max}.`,r,'Linear Inequalities in One Variable');
      }
      case 5:{
        const x1=int(r,4,12), x2=x1+int(r,4,8), slope=hard?-int(r,3,8):int(r,2,7), y1=int(r,25,80), y2=y1+slope*(x2-x1);
        if(hard){
          const target=y1+2*slope*(x2-x1), correct=x1+2*(x2-x1);
          return make(q,`A linear model passes through (${x1},${y1}) and (${x2},${y2}). For what input x will the model output ${target}?`,correct,[x2,correct-1,correct+1],`The slope is ${slope}. Extending the change twice from (${x1},${y1}) gives x=${correct}.`,r,'Linear Functions');
        }
        return make(q,`A line passes through (${x1},${y1}) and (${x2},${y2}). What is its slope?`,slope,[-slope,slope+1,slope-1],`Slope=(${y2}-${y1})/(${x2}-${x1})=${slope}.`,r,'Linear Functions');
      }
      case 6:{
        const adult=int(r,13,21), child=int(r,5,10), total=int(r,34,62), adults=int(r,12,total-10), children=total-adults, revenue=adult*adults+child*children;
        const correct=hard?children:adults;
        return make(q,`Adult tickets cost $${adult} and student tickets cost $${child}. A total of ${total} tickets produced $${revenue}. How many ${hard?'student':'adult'} tickets were sold?`,correct,[hard?adults:children,total,Math.abs(adults-children)],`The ticket-count and revenue equations give ${adults} adult and ${children} student tickets.`,r,'Systems of Two Linear Equations in Two Variables');
      }
      default:{
        const p=int(r,2,6), x=int(r,4,12), y=int(r,3,9), total=p*x+y, newY=hard?y+int(r,2,5):y;
        const stem=hard?`The equation ${p}x + y = ${total} represents a relationship between x and y. If y increases from ${y} to ${newY}, by how much must x change to keep the equation true?`:`If ${p}x + y = ${total} and y=${y}, what is x?`;
        const correct=hard?frac(y-newY,p):x;
        return make(q,stem,correct,[hard?frac(newY-y,p):x+1,hard?newY-y:x-1,total],hard?`A change Δy must be offset by ${p}Δx+Δy=0, so Δx=${correct}.`:`Substitute y=${y} and solve; x=${x}.`,r,'Linear Equations in Two Variables');
      }
    }
  }

  function advanced(q,k,level,r){
    const hard=level==='Advanced';
    switch(k%7){
      case 0:{
        const r1=int(r,2,7), r2=r1+int(r,3,8), sum=r1+r2, prod=r1*r2, correct=hard?sum*sum-2*prod:sum;
        return make(q,hard?`The solutions to x²-${sum}x+${prod}=0 are r and s. What is r²+s²?`:`What is the sum of the solutions to x²-${sum}x+${prod}=0?`,correct,[sum*sum,prod,correct+prod],hard?`r+s=${sum}, rs=${prod}; r²+s²=(r+s)²-2rs=${correct}.`:`By Vieta's formulas, the roots sum to ${sum}.`,r,'Nonlinear Equations in One Variable');
      }
      case 1:{
        const a=int(r,2,5), h=int(r,2,7), c=int(r,3,10), dx=hard?3:2, y=a*dx*dx+c, qdx=hard?2:1, correct=a*qdx*qdx+c;
        return make(q,`The graph of f(x)=a(x-${h})²+${c} passes through (${h+dx},${y}). What is f(${h-qdx})?`,correct,[a+c,y,correct+a],`The given point yields a=${a}; substituting x=${h-qdx} gives ${correct}.`,r,'Nonlinear Functions');
      }
      case 2:{
        const a=int(r,2,5), root=int(r,2,7), other=root+int(r,2,6), b=-a*(root+other), c=a*root*other, correct=hard?other*other:other;
        return make(q,`The equation ${a}x² ${b<0?'-':'+'} ${Math.abs(b)}x + ${c}=0 has two positive solutions. One is ${root}. What is ${hard?'the square of the other solution':'the other solution'}?`,correct,[root,other,root+other],`The quadratic factors as ${a}(x-${root})(x-${other}).`,r,'Nonlinear Equations in One Variable');
      }
      case 3:{
        const base=int(r,2,5), c=int(r,2,6), exponent=int(r,3,6), correct=(exponent+c)/2;
        return make(q,`If ${base}^(2x-${c})=${Math.pow(base,exponent)}, what is x?`,correct,[exponent,c,(exponent-c)/2],`Equal bases imply 2x-${c}=${exponent}; x=${correct}.`,r,'Nonlinear Equations in One Variable');
      }
      case 4:{
        const a=int(r,2,5), b=int(r,2,8), x=int(r,2,5), gx=x*x+b, correct=a*gx-b;
        return make(q,`Let f(x)=${a}x-${b} and g(x)=x²+${b}. What is f(g(${x}))?`,correct,[gx,a*x-b,correct+b],`g(${x})=${gx}; then f(${gx})=${correct}.`,r,'Nonlinear Functions');
      }
      case 5:{
        const s=int(r,3,8), c=int(r,2,7), correct=hard?s+1:s;
        const stem=hard?`The graphs y=x+${c} and y=x²-${s}x+${c+1} intersect twice. What is the sum of the x-coordinates of the intersections?`:`The line y=${s}x+${c} intersects y=x²+${c}. What is the sum of the x-coordinates of the intersections?`;
        return make(q,stem,correct,[correct-1,correct+1,c],hard?`Equating gives x²-${s+1}x+1=0, so the roots sum to ${correct}.`:`Equating gives x²-${s}x=0, so the roots sum to ${correct}.`,r,'Systems of Linear and Nonlinear Equations');
      }
      default:{
        const a=int(r,2,5), b=2*a*int(r,2,6), correct=b*b/(4*a);
        return make(q,`For what value of k does ${a}x²+${b}x+k=0 have exactly one real solution?`,correct,[correct/2,correct*2,b/a],`Set the discriminant equal to zero: ${b}²-4(${a})k=0, so k=${correct}.`,r,'Nonlinear Equations in One Variable');
      }
    }
  }

  function psda(q,k,level,r){
    const hard=level==='Advanced';
    switch(k%4){
      case 0:{
        const up=pick(r,[15,20,25,30]), down=pick(r,[10,15,20,25]), mult=(1+up/100)*(1-down/100), correct=round((mult-1)*100,1);
        return make(q,`A quantity increases by ${up}% and then decreases by ${down}% from the new value. What is the overall percent change from the original value?`,correct,[up-down,up+down,-correct],`Use successive multipliers; the net change is ${correct}%.`,r,'Percentages');
      }
      case 1:{
        const m1=int(r,25,45), m2=m1+int(r,8,20), n1=int(r,80,140), n2=int(r,150,260), correct=round((m1*n1+m2*n2)/(n1+n2),1);
        return make(q,`Group A has ${n1} observations with mean ${m1}, and Group B has ${n2} observations with mean ${m2}. What is the mean of the combined data set?`,correct,[(m1+m2)/2,m1,m2],`Use a weighted mean: (${m1}·${n1}+${m2}·${n2})/${n1+n2}=${correct}.`,r,'One-variable Data');
      }
      case 2:{
        const total=int(r,220,360), a=int(r,90,150), both=int(r,25,55), b=int(r,90,150), correct=frac(both,a);
        return make(q,`In a survey of ${total} people, ${a} chose A, ${b} chose B, and ${both} chose both. Given that a person chose A, what is the probability that the person also chose B?`,correct,[frac(both,total),frac(a,total),frac(a-both,a)],`Conditional probability is ${both}/${a}=${correct}.`,r,'Probability and Conditional Probability');
      }
      default:{
        const sample=int(r,220,420), pct=int(r,52,68), pop=int(r,2500,5000), estimate=Math.round(pop*pct/100/10)*10;
        if(hard){
          const correct=`About ${estimate} of the ${pop} residents would be expected to support the proposal, with some sampling uncertainty.`;
          return make(q,`A random sample of ${sample} residents finds that ${pct}% support a proposal. Which conclusion is best supported?`,correct,[`Exactly ${estimate} residents support the proposal.`,`${pct}% of every subgroup must support the proposal.`,'The survey proves that support causes a demographic change.'],'A random sample supports an estimate with sampling uncertainty, not an exact count or causal conclusion.',r,'Inference from Sample Statistics');
        }
        return make(q,`A random sample of ${sample} residents finds that ${pct}% support a proposal. About how many of ${pop} residents would be expected to support it?`,estimate,[Math.round(sample*pct/100),Math.round(pop*(100-pct)/100/10)*10,pop],`Estimate ${pct}% of ${pop}, about ${estimate}.`,r,'Inference from Sample Statistics');
      }
    }
  }

  function geo(q,k,level,r){
    const hard=level==='Advanced';
    switch(k%4){
      case 0:{
        const cx=int(r,-5,5), cy=int(r,-5,5), px=cx+3, py=cy+4, correct='-3/4';
        return make(q,`A circle has center (${cx},${cy}), and (${px},${py}) lies on the circle. What is the slope of the tangent line at (${px},${py})?`,correct,['3/4','-4/3','4/3'],'The radius slope is 4/3, so the tangent slope is -3/4.',r,'Circles');
      }
      case 1:{
        const ratio=int(r,2,4), val=int(r,24,80), correct=hard?val*Math.pow(ratio,3):val*ratio*ratio;
        return make(q,hard?`Two similar solids have corresponding length ratio 1:${ratio}. If the smaller solid has volume ${val}, what is the larger solid's volume?`:`Two similar triangles have corresponding side ratio 1:${ratio}. If the smaller triangle has area ${val}, what is the larger triangle's area?`,correct,[val*ratio,val*ratio*ratio,correct+val],hard?`Volumes scale by the cube of the linear factor.`:`Areas scale by the square of the linear factor.`,r,hard?'Area and Volume':'Lines, Angles, and Triangles');
      }
      case 2:{
        const tri=pick(r,[[5,12,13],[8,15,17],[7,24,25]]), scale=int(r,2,5), hyp=tri[2]*scale, correct=tri[0]*scale;
        return make(q,`In a right triangle, cos θ=${tri[1]}/${tri[2]} and the hypotenuse is ${hyp}. What is the length of the side opposite θ?`,correct,[tri[1]*scale,hyp,correct+scale],`Use the ${tri.join('-')} ratio scaled by ${scale}; the opposite side is ${correct}.`,r,'Right Triangles and Trigonometry');
      }
      default:{
        const deg=pick(r,[60,90,120,150]), correct=frac(deg,360);
        return make(q,`A sector has central angle ${deg}°. What fraction of the circle's area is contained in the sector?`,correct,[frac(deg,180),frac(360-deg,360),'1/2'],`Sector area is proportional to central angle: ${deg}/360=${correct}.`,r,'Circles');
      }
    }
  }

  bank.getModule=function(test,section,module,route='mixed'){
    const qs=previous(test,section,module,route);
    if(section!=='Math') return qs;
    const r=rng(hash(`math-ref-v4-${test}-${module}-${route}`));
    const counts={};
    return qs.map((q,i)=>{
      const d=q.domain;
      const k=counts[d]||0; counts[d]=k+1;
      if(d==='Algebra') return algebra(q,k+(module-1)*3+Number(test),q.level,r);
      if(d==='Advanced Math') return advanced(q,k+(module-1)*2+Number(test),q.level,r);
      if(d==='Problem-Solving and Data Analysis') return psda(q,k+Number(test)+module,q.level,r);
      if(d==='Geometry and Trigonometry') return geo(q,k+Number(test)+module,q.level,r);
      return q;
    });
  };
  bank.version=4;
  bank.referenceCalibration=Object.assign({},bank.referenceCalibration||{},{
    corpusQuestions:1363,
    mathProfile:{easy:{steps:1.5,spr:.13,context:.44},medium:{steps:2.4,spr:.24,context:.46},hard:{steps:3.0,spr:.44,context:.53}}
  });
})();