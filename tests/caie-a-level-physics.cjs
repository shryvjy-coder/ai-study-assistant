const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const script=fs.readFileSync('script.js','utf8');
const match=script.match(/const STUDY_DATA = (\[[\s\S]*?\]);\r?\nconst CBSE_NCERT_EXPANSION/);
assert.ok(match,'embedded STUDY_DATA is readable');
const data=JSON.parse(match[1]);
const before=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='A Level (12)'&&e.subject==='Physics').map(e=>({id:e.id,title:e.title}));
assert.equal(before.length,15,'baseline A Level Physics contains 15 runtime topics');

const window={STUDYAI_CURRICULUM:data};
vm.runInContext(fs.readFileSync('caie-a-level-physics-deep-notes.js','utf8'),vm.createContext({window,console}),{filename:'caie-a-level-physics-deep-notes.js'});

const rows=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='A Level (12)'&&e.subject==='Physics');
const status=window.STUDYAI_CAIE_A_LEVEL_PHYSICS_DEEP_NOTES_STATUS;
assert.equal(status.total,15);
assert.equal(status.matched,15);
assert.equal(status.unmatched.length,0);
assert.deepEqual(rows.map(e=>e.id),before.map(e=>e.id),'existing A Level Physics IDs are preserved');

for(const e of rows){
 assert.equal(e.notesVerified,true,e.title+' verified');
 assert.equal(e.sourceBook,'Physics 9702',e.title+' source metadata');
 assert.ok(e.deepNotes?.overview,e.title+' overview');
 assert.ok(e.deepNotes?.concepts?.length>=6,e.title+' detailed concepts');
 assert.ok(e.deepNotes?.examTips?.length>=4,e.title+' exam guidance');
 assert.ok(e.deepNotes?.selfCheck?.length>=5,e.title+' self-check');
 assert.ok(!e.summary.includes('is a core physics topic in the Cambridge'),e.title+' generic template removed');
}

const by=t=>rows.find(e=>e.title===t);
assert.ok(by('Motion in a Circle').formulas.includes('F=mv²/r=mrω²'),'circular motion covers centripetal force');
assert.ok(by('Gravitational Fields').deepNotes.concepts.some(x=>String(x[0]).includes('Geostationary')),'gravity covers geostationary orbit');
assert.ok(by('Ideal Gases').formulas.includes('pV=(1/3)Nm<c²>'),'ideal gases covers kinetic-theory pressure equation');
assert.ok(by('Thermodynamics').formulas.some(x=>x.includes('ΔU=q+W')),'thermodynamics uses Cambridge first-law convention');
assert.ok(by('Oscillations').deepNotes.concepts.some(x=>String(x[0]).includes('Resonance')),'oscillations covers resonance');
assert.ok(by('Electric Fields').deepNotes.concepts.some(x=>String(x[0]).includes('Potential gradient')),'electric fields covers negative potential gradient');
assert.ok(by('Capacitance').deepNotes.concepts.some(x=>String(x[0]).includes('Time constant')),'capacitance covers RC time constant');
assert.ok(by('Magnetic Fields').deepNotes.concepts.some(x=>String(x[0]).includes('Electromagnetic induction')),'magnetic fields includes official induction subtopic');
assert.ok(by('Magnetic Fields').deepNotes.concepts.some(x=>String(x[0]).includes('Hall effect')),'magnetic fields covers Hall effect');
assert.ok(by('Alternating Currents').deepNotes.concepts.some(x=>String(x[0]).includes('Full-wave bridge')),'AC covers bridge rectification');
assert.ok(by('Quantum Physics').deepNotes.concepts.some(x=>String(x[0]).includes('de Broglie')),'quantum covers de Broglie wavelength');
assert.ok(by('Nuclear Physics').deepNotes.concepts.some(x=>String(x[0]).includes('Binding energy per nucleon')),'nuclear covers BE per nucleon');
assert.ok(by('Medical Physics').deepNotes.concepts.some(x=>String(x[0]).includes('PET localisation')),'medical physics covers PET');
assert.ok(by('Astronomy and Cosmology').deepNotes.concepts.some(x=>String(x[0]).includes('Hubble law')),'astronomy covers Hubble law');
assert.ok(by('A Level Practical and Data Analysis').deepNotes.concepts.some(x=>String(x[0]).includes('Worst acceptable line')),'Paper 5 covers worst acceptable line');
assert.ok(by('A Level Practical and Data Analysis').deepNotes.concepts.some(x=>String(x[0]).includes('Linearisation')),'Paper 5 covers linearisation');

console.log('CAIE A LEVEL PHYSICS DEEP NOTES OK',rows.length,'topics');
