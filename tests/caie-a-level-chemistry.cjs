const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const script=fs.readFileSync('script.js','utf8');
const match=script.match(/const STUDY_DATA = (\[[\s\S]*?\]);\r?\nconst CBSE_NCERT_EXPANSION/);
assert.ok(match,'embedded STUDY_DATA is readable');
const data=JSON.parse(match[1]);
const before=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='A Level (12)'&&e.subject==='Chemistry');
assert.equal(before.length,13,'legacy A Level Chemistry baseline has 13 topics');
const legacyIds=before.map(e=>e.id);

const window={STUDYAI_CURRICULUM:data};
vm.runInContext(fs.readFileSync('caie-a-level-chemistry-deep-notes.js','utf8'),vm.createContext({window,console}),{filename:'caie-a-level-chemistry-deep-notes.js'});

const rows=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='A Level (12)'&&e.subject==='Chemistry').sort((a,b)=>a.order-b.order);
const status=window.STUDYAI_CAIE_A_LEVEL_CHEMISTRY_DEEP_NOTES_STATUS;
assert.equal(rows.length,16,'A Level Chemistry has 16 corrected StudyAI topics');
assert.equal(status.total,16);
assert.equal(status.matched,16);
assert.equal(status.unmatched.length,0);
for(const id of legacyIds) assert.ok(rows.some(e=>e.id===id),'legacy mastery ID preserved: '+id);

for(const e of rows){
 assert.equal(e.notesVerified,true,e.title+' verified');
 assert.equal(e.sourceBook,'Chemistry 9701',e.title+' source metadata');
 assert.equal(e.sourceYear,'2025–2027',e.title+' syllabus year');
 assert.ok(e.deepNotes?.overview,e.title+' overview');
 assert.ok(e.deepNotes?.concepts?.length>=5,e.title+' detailed concepts');
 assert.ok(e.deepNotes?.examTips?.length>=4,e.title+' exam guidance');
 assert.ok(e.deepNotes?.selfCheck?.length>=5,e.title+' self-check');
 assert.ok(!e.summary.includes('is a core chemistry topic in the Cambridge'),e.title+' generic template removed');
}

const by=t=>rows.find(e=>e.title===t);
assert.ok(by('Advanced Energetics and Lattice Energy').deepNotes.concepts.some(x=>String(x[0]).includes('Born')),'energetics covers Born-Haber');
assert.ok(by('Entropy and Gibbs Energy').formulas.some(x=>x.includes('ΔG°')),'Gibbs equation included');
assert.ok(by('Advanced Electrochemistry').deepNotes.concepts.some(x=>String(x[0]).includes('Nernst')),'electrochemistry covers Nernst equation');
assert.ok(by('Advanced Equilibria').deepNotes.concepts.some(x=>String(x[0]).includes('Partition')),'equilibria covers partition coefficient');
assert.ok(by('Advanced Reaction Kinetics').deepNotes.concepts.some(x=>String(x[0]).includes('Rate-determining')),'kinetics covers RDS');
assert.ok(by('Advanced Group 2'),'missing A2 Group 2 topic added');
assert.ok(by('Transition Elements').deepNotes.concepts.some(x=>String(x[0]).includes('Stability constant')),'transition elements covers Kstab');
assert.ok(by('Advanced Organic Chemistry').deepNotes.concepts.some(x=>String(x[0]).includes('Optical activity')),'advanced organic covers optical isomerism');
assert.ok(by('Aromatic Chemistry').deepNotes.concepts.some(x=>String(x[0]).includes('Friedel')),'aromatic chemistry covers Friedel-Crafts');
assert.ok(by('Carboxylic Acids and Acyl Chloride Derivatives'),'acyl chloride topic added');
assert.ok(by('Carboxylic Acids and Acyl Chloride Derivatives').deepNotes.concepts.some(x=>String(x[0]).includes('Addition–elimination')),'acyl chloride mechanism covered');
assert.ok(by('Nitrogen Chemistry').deepNotes.concepts.some(x=>String(x[0]).includes('Electrophoresis')),'nitrogen chemistry covers electrophoresis');
assert.ok(by('Condensation Polymerisation'),'condensation polymer topic added');
assert.ok(by('NMR Spectroscopy').deepNotes.concepts.some(x=>String(x[0]).includes('D₂O')),'NMR covers D2O exchange');
assert.ok(by('Chromatography and Mass Spectrometry').deepNotes.concepts.some(x=>String(x[0]).includes('Gas/liquid')),'analysis covers GLC');
assert.ok(by('A Level Practical Planning and Analysis').deepNotes.concepts.some(x=>String(x[0]).includes('Control experiments')),'Paper 5 covers controls');
assert.ok(by('A Level Practical Planning and Analysis').deepNotes.concepts.some(x=>String(x[0]).includes('Anomalies')),'Paper 5 covers anomaly evaluation');

console.log('CAIE A LEVEL CHEMISTRY DEEP NOTES OK',rows.length,'topics');
