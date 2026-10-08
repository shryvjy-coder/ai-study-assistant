/* Purpose-built diagrams added after the original StudyAI concept figure bank.
 * One diagram for the compass construction of sqrt(3), one for zooming to 2.665.
 */
(() => {
'use strict';
const base=window.StudyAIConceptFigures;
if(!base || base.hasVerifiedExtras)return;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const wrap=(title,desc,body)=>'<figure class="studyai-concept-figure" role="group" aria-label="'+esc(title)+'">'+
 '<svg viewBox="0 0 680 260" role="img" aria-label="'+esc(desc)+'" xmlns="http://www.w3.org/2000/svg">'+
 '<title>'+esc(title)+'</title><desc>'+esc(desc)+'</desc>'+
 '<style>.sl{stroke:#2b4a49;stroke-width:3;fill:none;stroke-linecap:round}.sf{stroke:#138e83;stroke-width:4;fill:none;stroke-linecap:round}.st{fill:#223a39;font-size:16px;font-family:Arial,sans-serif}.sm{fill:#0b746a;font-size:17px;font-weight:700;font-family:Arial,sans-serif}.dot{fill:#138e83}</style>'+
 body+'</svg><figcaption>'+esc(desc)+'</figcaption></figure>';

function compass(){
 return wrap('Exact compass construction of √3',
 'Given OP=√2 and a perpendicular PQ=1, OQ=√3. Keep the compass centred at O with radius OQ and mark R on the number line. OR=√3.',
 '<line x1="48" y1="210" x2="610" y2="210" class="sl"/>'+
 '<line x1="80" y1="196" x2="80" y2="222" class="sl"/>'+
 '<line x1="207" y1="196" x2="207" y2="222" class="sl"/>'+
 '<line x1="260" y1="193" x2="260" y2="222" class="sl"/>'+
 '<line x1="300" y1="193" x2="300" y2="222" class="sl"/>'+
 '<line x1="334" y1="196" x2="334" y2="222" class="sl"/>'+
 '<line x1="260" y1="210" x2="260" y2="83" class="sf"/>'+
 '<line x1="80" y1="210" x2="260" y2="83" class="sf"/>'+
 '<path d="M260 194 H244 V210" class="sl"/>'+
 '<path d="M235 54 A220 220 0 0 1 300 210" class="sl" stroke-dasharray="6 8"/>'+
 '<circle cx="80" cy="210" r="6" class="dot"/>'+
 '<circle cx="260" cy="210" r="6" class="dot"/>'+
 '<circle cx="300" cy="210" r="7" class="dot"/>'+
 '<circle cx="260" cy="83" r="6" class="dot"/>'+
 '<text x="80" y="244" text-anchor="middle" class="sm">O=0</text>'+
 '<text x="207" y="244" text-anchor="middle" class="st">1</text>'+
 '<text x="260" y="244" text-anchor="middle" class="sm">P=√2</text>'+
 '<text x="311" y="190" class="sm">R=√3</text>'+
 '<text x="334" y="244" text-anchor="middle" class="st">2</text>'+
 '<text x="270" y="78" class="sm">Q</text>'+
 '<text x="269" y="150" class="sm">1</text>'+
 '<text x="148" y="133" class="sm">√3</text>'+
 '<text x="460" y="72" class="st">Compass centre O</text>'+
 '<text x="460" y="102" class="sm">radius OQ=√3</text>');
}

function zoom(){
 const rows=[
 {a:2,b:3,select:6,mark:'2.6'},
 {a:2.6,b:2.7,select:6,mark:'2.66'},
 {a:2.66,b:2.67,select:5,mark:'2.665'}
 ];
 const body=rows.map((r,j)=>{
   const y=60+j*73, left=150,right=550;
   return '<text x="28" y="'+(y+5)+'" class="st">Zoom '+(j+1)+'</text>'+
     '<line x1="'+left+'" y1="'+y+'" x2="'+right+'" y2="'+y+'" class="sl"/>'+
     Array.from({length:11},(_,i)=>{
       const x=left+i*40;
       return '<line x1="'+x+'" y1="'+(y-8)+'" x2="'+x+'" y2="'+(y+9)+'" class="sl"/>';
     }).join('')+
     '<circle cx="'+(left+r.select*40)+'" cy="'+y+'" r="7" class="dot"/>'+
     '<text x="'+left+'" y="'+(y+27)+'" text-anchor="middle" class="st">'+r.a+'</text>'+
     '<text x="'+right+'" y="'+(y+27)+'" text-anchor="middle" class="st">'+r.b+'</text>'+
     '<text x="'+(left+r.select*40)+'" y="'+(y-17)+'" text-anchor="middle" class="sm">'+r.mark+'</text>';
 }).join('');
 return wrap('Successive magnification to the point 2.665',
 'First select 2.6 in the interval 2–3, then 2.66 in 2.6–2.7, and finally the fifth thousandth step: 2.665 in 2.66–2.67.',
 body);
}
const old=base.render.bind(base);
base.render=id=>id==='root3Compass'?compass():id==='decimalZoom'?zoom():old(id);
base.ids=[...base.ids,'root3Compass','decimalZoom'];
base.hasVerifiedExtras=true;
})();