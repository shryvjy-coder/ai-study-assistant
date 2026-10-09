/* Original, precisely labelled teaching figures for the StudyAI Class 9 pilot.
 * No invented data graphs or subject-based placeholders.
 * All SVG coordinates correspond to the mathematical claims in their captions.
 */
(() => {
'use strict';
const start=(name,desc,body)=>
  '<figure class="studyai-concept-figure" role="group" aria-label="'+name+'">'+
  '<svg viewBox="0 0 680 260" role="img" aria-label="'+desc+'" xmlns="http://www.w3.org/2000/svg">'+
  '<title>'+name+'</title><desc>'+desc+'</desc>'+
  '<style>.sl{stroke:#2b4a49;stroke-width:3;fill:none;stroke-linecap:round}.sf{stroke:#138e83;stroke-width:4;fill:none;stroke-linecap:round}.st{fill:#223a39;font-size:17px;font-family:Arial,sans-serif}.sm{fill:#0b746a;font-size:18px;font-weight:700;font-family:Arial,sans-serif}.dot{fill:#138e83}.soft{fill:#e7f7f2;stroke:#138e83;stroke-width:2}</style>'+
  body+'</svg><figcaption>'+desc+'</figcaption></figure>';

const figures={
 integers(){
  const tick=[-5,-4,-3,-2,-1,0,1,2].map((value,index)=>{
    const x=100+index*68;
    return '<line x1="'+x+'" y1="120" x2="'+x+'" y2="148" class="sl"/>'+
      '<text x="'+x+'" y="179" class="st" text-anchor="middle">'+(value<0?'−'+(-value):value)+'</text>';
  }).join('');
  return start('Signed integers on a number line','−2 is greater than −5 because it lies three units to the right.', 
    '<line x1="74" y1="134" x2="620" y2="134" class="sl"/><path d="M620 134 l-10 -6 v12 z" fill="#2b4a49"/>'+
    tick+'<line x1="100" y1="80" x2="304" y2="80" class="sf"/>'+
    '<path d="M304 80 l-13 -7 v14 z" fill="#138e83"/>'+
    '<circle cx="100" cy="134" r="7" class="dot"/><circle cx="304" cy="134" r="7" class="dot"/>'+
    '<text x="202" y="65" text-anchor="middle" class="sm">3 units right</text>'+
    '<text x="340" y="220" text-anchor="middle" class="st">Greater numbers lie to the right →</text>');
 },
 rational(){
  const ticks=[['0',115],['¼',215],['½',315],['¾',415],['1',515]]
  .map(([label,x])=>'<line x1="'+x+'" y1="111" x2="'+x+'" y2="141" class="sl"/>'+
    '<text x="'+x+'" y="177" class="'+(label==='¾'?'sm':'st')+'" text-anchor="middle">'+label+'</text>').join('');
  return start('Locating three quarters','Divide the interval from 0 to 1 into four equal lengths. The third division is exactly 3/4.',
    '<line x1="91" y1="126" x2="564" y2="126" class="sl"/>'+
    '<line x1="115" y1="93" x2="415" y2="93" class="sf"/>'+
    '<path d="M415 93 l-13 -7 v14 z" fill="#138e83"/>'+
    ticks+'<circle cx="415" cy="126" r="9" class="dot"/>'+
    '<text x="265" y="73" class="sm" text-anchor="middle">three equal quarter-steps</text>'+
    '<text x="345" y="223" class="st" text-anchor="middle">Each gap is exactly ¼ unit</text>');
 },
 root2(){
  return start('Constructing the exact length √2','A square with side length 1 unit has a diagonal of √2 units, since 1² + 1² = 2.',
    '<rect x="185" y="45" width="160" height="160" class="soft"/>'+
    '<line x1="185" y1="205" x2="345" y2="45" class="sf"/>'+
    '<circle cx="185" cy="205" r="4" class="dot"/><circle cx="345" cy="45" r="4" class="dot"/>'+
    '<path d="M185 187 H203 V205" class="sl"/>'+
    '<text x="264" y="231" class="st" text-anchor="middle">1 unit</text>'+
    '<text x="125" y="127" class="st" text-anchor="middle">1 unit</text>'+
    '<text x="291" y="110" class="sm" text-anchor="middle">√2</text>'+
    '<text x="435" y="109" class="st">d² = 1² + 1²</text>'+
    '<text x="435" y="145" class="sm">d = √2</text>');
 },
 semicircle(){
  return start('Semicircle construction for √4',
    'AC = 4 units and CB = 1 unit on diameter AB. The perpendicular CD = 2 units, because CD² = AC × CB.',
    '<path d="M140 210 A175 175 0 0 0 490 210" class="sl"/>'+
    '<line x1="140" y1="210" x2="490" y2="210" class="sl"/>'+
    '<line x1="420" y1="210" x2="420" y2="70" class="sf"/>'+
    '<line x1="140" y1="210" x2="420" y2="70" class="sl"/>'+
    '<line x1="420" y1="70" x2="490" y2="210" class="sl"/>'+
    '<path d="M420 194 h-16 v16" class="sl"/>'+
    '<circle cx="140" cy="210" r="5" class="dot"/><circle cx="420" cy="210" r="5" class="dot"/>'+
    '<circle cx="490" cy="210" r="5" class="dot"/><circle cx="420" cy="70" r="5" class="dot"/>'+
    '<text x="133" y="238" class="st">A</text><text x="410" y="238" class="st">C</text>'+
    '<text x="486" y="238" class="st">B</text><text x="427" y="64" class="sm">D</text>'+
    '<text x="272" y="230" class="sm" text-anchor="middle">4</text>'+
    '<text x="458" y="230" class="sm" text-anchor="middle">1</text>'+
    '<text x="430" y="144" class="sm">2 = √4</text>'+
    '<text x="565" y="102" class="st" text-anchor="middle">CD² = 4×1</text>'+
    '<text x="565" y="131" class="sm" text-anchor="middle">CD = 2</text>');
  },
repeating(){
  const rem=[1,3,2,6,4,5],digits=[1,4,2,8,5,7];
  const boxes=rem.map((n,i)=>{
    const x=30+i*107;
    return '<rect x="'+x+'" y="71" width="94" height="88" rx="10" class="soft"/>'+
      '<text x="'+(x+47)+'" y="99" class="st" text-anchor="middle">r = '+n+'</text>'+
      '<text x="'+(x+47)+'" y="133" class="sm" text-anchor="middle">digit '+digits[i]+'</text>'+
      (i<5?'<path d="M'+(x+94)+' 115 h13" class="sf"/>':'');
  }).join('');
  return start('Why one seventh repeats','Long division of 1/7 cycles through six remainders: 1 → 3 → 2 → 6 → 4 → 5 → 1, yielding 0.142857142857…',
    '<text x="340" y="36" class="sm" text-anchor="middle">1 ÷ 7 : repeating remainder cycle</text>'+
    boxes+'<path d="M610 161 v37 H77 V161" class="sf"/>'+
    '<text x="340" y="231" class="st" text-anchor="middle">Remainder 1 returns; the digits repeat from the beginning</text>');
 }
};
window.StudyAIConceptFigures={
 render(id){return typeof figures[id]==='function'?figures[id]():'';},
 ids:Object.keys(figures)
};
})();