(() => {
'use strict';

const xml=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
const lower=e=>([e?.subject,e?.title,e?.sourceBook].filter(Boolean).join(' ')).toLowerCase();
const wrap=(title,body,caption)=>`<figure class="studyai-diagram" role="group" aria-label="${xml(title)}">
  <div class="studyai-diagram-canvas">
    <svg viewBox="0 0 640 320" role="img" aria-labelledby="studyai-diagram-title studyai-diagram-desc" xmlns="http://www.w3.org/2000/svg">
      <title id="studyai-diagram-title">${xml(title)}</title>
      <desc id="studyai-diagram-desc">${xml(caption)}</desc>
      ${body}
    </svg>
  </div>
  <figcaption><strong>${xml(title)}</strong><span>${xml(caption)}</span></figcaption>
</figure>`;

const arrowMarker=()=>`<defs><marker id="sa-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="diagram-fill"/></marker></defs>`;

function axes(label='relationship'){
 return wrap(
  'Graph model',
  `${arrowMarker()}<line x1="90" y1="255" x2="560" y2="255" class="diagram-line" marker-end="url(#sa-arrow)"/><line x1="90" y1="255" x2="90" y2="55" class="diagram-line" marker-end="url(#sa-arrow)"/><path d="M110 235 C190 210 235 145 320 145 S455 210 535 82" class="diagram-accent-line"/><circle cx="320" cy="145" r="6" class="diagram-accent-fill"/><text x="565" y="277" class="diagram-label">x</text><text x="72" y="47" class="diagram-label">y</text><text x="336" y="132" class="diagram-label">${xml(label)}</text>`,
  'Use the axes, turning points, intercepts, gradient, area or shape of the graph as evidence. The exact graph depends on the quantities in the question.'
 );
}

function geometry(){
 return wrap(
  'Geometry model',
  `${arrowMarker()}<polygon points="150,250 330,70 525,250" class="diagram-shape"/><line x1="330" y1="70" x2="330" y2="250" class="diagram-dash"/><path d="M312 250 v-18 h18" class="diagram-line"/><path d="M150 250 A55 55 0 0 1 190 204" class="diagram-accent-line"/><text x="133" y="274" class="diagram-label">A</text><text x="326" y="57" class="diagram-label">B</text><text x="530" y="274" class="diagram-label">C</text><text x="341" y="182" class="diagram-label">height</text>`,
  'Translate the wording into a labelled sketch first. Mark equal lengths, right angles, known angles and any radius, tangent, vector or perpendicular information before calculating.'
 );
}

function force(){
 return wrap(
  'Force diagram',
  `${arrowMarker()}<rect x="245" y="130" width="150" height="82" rx="10" class="diagram-shape"/><line x1="320" y1="130" x2="320" y2="52" class="diagram-accent-line" marker-end="url(#sa-arrow)"/><line x1="320" y1="212" x2="320" y2="292" class="diagram-accent-line" marker-end="url(#sa-arrow)"/><line x1="245" y1="171" x2="125" y2="171" class="diagram-line" marker-end="url(#sa-arrow)"/><line x1="395" y1="171" x2="515" y2="171" class="diagram-line" marker-end="url(#sa-arrow)"/><text x="336" y="62" class="diagram-label">normal / lift</text><text x="336" y="289" class="diagram-label">weight</text><text x="95" y="157" class="diagram-label">resistance</text><text x="475" y="157" class="diagram-label">driving force</text>`,
  'Draw only forces acting on the chosen object. Arrow direction shows force direction; relative arrow length can represent relative magnitude when useful.'
 );
}

function wave(){
 return wrap(
  'Wave diagram',
  `${arrowMarker()}<line x1="70" y1="165" x2="575" y2="165" class="diagram-line" marker-end="url(#sa-arrow)"/><path d="M75 165 C110 80 145 80 180 165 S250 250 285 165 S355 80 390 165 S460 250 495 165 S550 80 575 140" class="diagram-accent-line"/><line x1="145" y1="165" x2="145" y2="85" class="diagram-dash"/><line x1="145" y1="85" x2="355" y2="85" class="diagram-dash"/><text x="217" y="72" class="diagram-label">wavelength λ</text><text x="91" y="117" class="diagram-label">amplitude</text>`,
  'Use the diagram to distinguish amplitude, wavelength, frequency and direction of travel. For ray or superposition questions, add the relevant normal, path or second wave.'
 );
}

function circuit(){
 return wrap(
  'Circuit model',
  `${arrowMarker()}<path d="M120 90 H500 V240 H120 Z" class="diagram-line"/><line x1="260" y1="80" x2="260" y2="100" class="diagram-line"/><line x1="280" y1="72" x2="280" y2="108" class="diagram-line"/><circle cx="430" cy="90" r="28" class="diagram-shape"/><text x="420" y="99" class="diagram-label">R</text><circle cx="260" cy="240" r="28" class="diagram-shape"/><text x="250" y="249" class="diagram-label">A</text><line x1="430" y1="90" x2="430" y2="165" class="diagram-dash"/><circle cx="430" cy="190" r="25" class="diagram-shape"/><text x="420" y="199" class="diagram-label">V</text>`,
  'Trace current around the complete path, then identify which components are in series or parallel. Voltmeters go across a component; ammeters go in series with the measured current.'
 );
}

function particles(mode='matter'){
 const liquid=Array.from({length:18},(_,i)=>{const x=250+(i%6)*34+(i%2)*5,y=170+Math.floor(i/6)*34;return `<circle cx="${x}" cy="${y}" r="11" class="diagram-accent-fill"/>`}).join('');
 return wrap(
  mode==='electrolysis'?'Electrolysis particle model':'Particle model',
  mode==='electrolysis'
   ? `${arrowMarker()}<rect x="130" y="90" width="380" height="165" rx="16" class="diagram-shape"/><line x1="215" y1="75" x2="215" y2="220" class="diagram-line"/><line x1="425" y1="75" x2="425" y2="220" class="diagram-line"/><text x="171" y="58" class="diagram-label">anode</text><text x="390" y="58" class="diagram-label">cathode</text><circle cx="290" cy="145" r="16" class="diagram-accent-fill"/><text x="282" y="151" class="diagram-inverse-label">+</text><circle cx="350" cy="198" r="16" class="diagram-fill"/><text x="342" y="204" class="diagram-inverse-label">−</text><line x1="290" y1="145" x2="410" y2="145" class="diagram-accent-line" marker-end="url(#sa-arrow)"/><line x1="350" y1="198" x2="232" y2="198" class="diagram-line" marker-end="url(#sa-arrow)"/>`
   : `<text x="100" y="58" class="diagram-label">solid</text><g>${Array.from({length:16},(_,i)=>`<circle cx="${80+(i%4)*34}" cy="${100+Math.floor(i/4)*34}" r="11" class="diagram-fill"/>`).join('')}</g><text x="287" y="58" class="diagram-label">liquid</text><g>${liquid}</g><text x="500" y="58" class="diagram-label">gas</text><g>${[[475,105],[550,90],[520,165],[590,205],[465,235],[555,260]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="11" class="diagram-accent-fill"/>`).join('')}</g>`,
  mode==='electrolysis'
   ? 'Follow charge: positive ions move to the cathode and negative ions move to the anode. Then decide which particles are discharged and write the corresponding half-equations.'
   : 'Particle spacing and motion explain changes of state, density, diffusion and gas pressure. The particles themselves do not expand during heating.'
 );
}

function energy(){
 return wrap(
  'Energy profile',
  `${arrowMarker()}<line x1="85" y1="255" x2="570" y2="255" class="diagram-line" marker-end="url(#sa-arrow)"/><line x1="85" y1="255" x2="85" y2="55" class="diagram-line" marker-end="url(#sa-arrow)"/><path d="M110 205 C190 205 205 85 310 85 S415 175 520 175" class="diagram-accent-line"/><line x1="150" y1="205" x2="150" y2="92" class="diagram-dash"/><line x1="475" y1="205" x2="475" y2="175" class="diagram-dash"/><text x="160" y="118" class="diagram-label">activation energy</text><text x="468" y="160" class="diagram-label">products</text><text x="112" y="224" class="diagram-label">reactants</text>`,
  'Use the vertical energy difference to distinguish activation energy from overall energy change. Catalysts lower the activation barrier but do not change the energies of reactants and products.'
 );
}

function cell(){
 return wrap(
  'Cell structure model',
  `<ellipse cx="320" cy="165" rx="220" ry="105" class="diagram-shape"/><ellipse cx="330" cy="165" rx="65" ry="50" class="diagram-accent-shape"/><path d="M165 125 C190 100 220 104 240 130 C218 150 188 151 165 125 Z" class="diagram-fill"/><path d="M420 190 C450 162 490 170 505 205 C478 226 442 222 420 190 Z" class="diagram-fill"/><circle cx="230" cy="215" r="18" class="diagram-accent-fill"/><circle cx="405" cy="112" r="14" class="diagram-accent-fill"/><line x1="395" y1="160" x2="540" y2="100" class="diagram-line"/><text x="545" y="101" class="diagram-label">nucleus</text><line x1="225" y1="125" x2="95" y2="75" class="diagram-line"/><text x="34" y="68" class="diagram-label">organelle</text><line x1="468" y1="217" x2="548" y2="252" class="diagram-line"/><text x="516" y="275" class="diagram-label">membrane</text>`,
  'Link each labelled structure to a function, then link the function to the needs of the whole cell. In microscopy questions, distinguish what is visible from what must be inferred.'
 );
}

function biologyFlow(title='Biological process'){
 return wrap(
  title,
  `${arrowMarker()}<rect x="60" y="125" width="140" height="72" rx="16" class="diagram-shape"/><rect x="250" y="125" width="140" height="72" rx="16" class="diagram-accent-shape"/><rect x="440" y="125" width="140" height="72" rx="16" class="diagram-shape"/><line x1="200" y1="161" x2="245" y2="161" class="diagram-accent-line" marker-end="url(#sa-arrow)"/><line x1="390" y1="161" x2="435" y2="161" class="diagram-accent-line" marker-end="url(#sa-arrow)"/><text x="88" y="155" class="diagram-label">input / signal</text><text x="276" y="155" class="diagram-label">process</text><text x="468" y="155" class="diagram-label">response</text><text x="272" y="179" class="diagram-label">mechanism</text>`,
  'Write the process as a cause-and-effect sequence. At each arrow, be able to explain why the previous stage causes the next rather than only naming the stages.'
 );
}

function genetics(){
 return wrap(
  'Inheritance model',
  `${arrowMarker()}<circle cx="130" cy="90" r="26" class="diagram-accent-shape"/><circle cx="220" cy="90" r="26" class="diagram-shape"/><line x1="156" y1="90" x2="194" y2="90" class="diagram-line"/><line x1="175" y1="90" x2="175" y2="145" class="diagram-line"/><line x1="105" y1="145" x2="245" y2="145" class="diagram-line"/><line x1="115" y1="145" x2="115" y2="190" class="diagram-line"/><line x1="235" y1="145" x2="235" y2="190" class="diagram-line"/><rect x="355" y="82" width="170" height="170" class="diagram-shape"/><line x1="440" y1="82" x2="440" y2="252" class="diagram-line"/><line x1="355" y1="167" x2="525" y2="167" class="diagram-line"/><text x="378" y="68" class="diagram-label">gametes</text><text x="380" y="126" class="diagram-label">AA</text><text x="465" y="126" class="diagram-label">Aa</text><text x="380" y="211" class="diagram-label">Aa</text><text x="465" y="211" class="diagram-label">aa</text>`,
  'Keep genotype, phenotype, allele and probability separate. A Punnett square predicts expected proportions; it does not guarantee the exact outcome in a small family.'
 );
}

function ecology(){
 return wrap(
  'Ecosystem relationship',
  `${arrowMarker()}<circle cx="110" cy="160" r="48" class="diagram-accent-shape"/><circle cx="320" cy="90" r="48" class="diagram-shape"/><circle cx="320" cy="230" r="48" class="diagram-shape"/><circle cx="530" cy="160" r="48" class="diagram-accent-shape"/><line x1="158" y1="145" x2="266" y2="105" class="diagram-line" marker-end="url(#sa-arrow)"/><line x1="158" y1="175" x2="266" y2="215" class="diagram-line" marker-end="url(#sa-arrow)"/><line x1="367" y1="105" x2="482" y2="145" class="diagram-accent-line" marker-end="url(#sa-arrow)"/><line x1="367" y1="215" x2="482" y2="175" class="diagram-accent-line" marker-end="url(#sa-arrow)"/><text x="76" y="166" class="diagram-label">producer</text><text x="287" y="96" class="diagram-label">consumer</text><text x="287" y="236" class="diagram-label">consumer</text><text x="491" y="166" class="diagram-label">higher level</text>`,
  'Arrows in food chains show transfer of energy or biomass. Use the diagram to reason about trophic levels, losses, population change and consequences of adding or removing organisms.'
 );
}

function conceptMap(e){
 const title=String(e?.title||'Topic');
 const words=title.split(/[:–—,-]/).map(x=>x.trim()).filter(Boolean).slice(0,3);
 while(words.length<3)words.push(['Evidence','Method','Application'][words.length]);
 return wrap(
  'Topic relationship map',
  `${arrowMarker()}<rect x="245" y="112" width="150" height="82" rx="18" class="diagram-accent-shape"/><rect x="55" y="45" width="150" height="66" rx="16" class="diagram-shape"/><rect x="435" y="45" width="150" height="66" rx="16" class="diagram-shape"/><rect x="245" y="235" width="150" height="60" rx="16" class="diagram-shape"/><line x1="205" y1="78" x2="252" y2="125" class="diagram-line" marker-end="url(#sa-arrow)"/><line x1="435" y1="78" x2="388" y2="125" class="diagram-line" marker-end="url(#sa-arrow)"/><line x1="320" y1="194" x2="320" y2="230" class="diagram-line" marker-end="url(#sa-arrow)"/><text x="85" y="84" class="diagram-label">${xml(words[0]).slice(0,20)}</text><text x="465" y="84" class="diagram-label">${xml(words[1]).slice(0,20)}</text><text x="270" y="158" class="diagram-label">${xml(title).slice(0,22)}</text><text x="274" y="271" class="diagram-label">${xml(words[2]).slice(0,20)}</text>`,
  'Use the map to connect definitions, evidence, method and application. Replace each box with the exact concepts from the chapter as you revise.'
 );
}

/* A generic graph is not educational content. Do not silently invent one for
 * every topic. Approved, topic-specific visuals live in authored note modules.
 */
function render(e){
 return '';
}

window.StudyAIDiagrams={render};
})();