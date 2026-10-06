const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const script=fs.readFileSync('script.js','utf8');
const match=script.match(/const STUDY_DATA = (\[[\s\S]*?\]);\r?\nconst CBSE_NCERT_EXPANSION/);
assert.ok(match,'embedded STUDY_DATA is readable');
const data=JSON.parse(match[1]);
const baseline=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Mathematics');
assert.equal(baseline.length,16,'legacy AS Mathematics baseline has 16 topics');
const legacyIds=baseline.map(e=>e.id);

const window={STUDYAI_CURRICULUM:data};
vm.runInContext(fs.readFileSync('caie-as-mathematics-deep-notes.js','utf8'),vm.createContext({window,console}),{filename:'caie-as-mathematics-deep-notes.js'});

const rows=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Mathematics');
const status=window.STUDYAI_CAIE_AS_MATHEMATICS_DEEP_NOTES_STATUS;
assert.equal(rows.length,24,'AS Mathematics has all 24 component topics');
assert.equal(status.total,24);
assert.equal(status.matched,24);
assert.equal(status.unmatched.length,0);
assert.deepEqual(status.preservedIds,legacyIds,'all 16 pre-existing mastery IDs are preserved');
assert.equal(JSON.stringify(status.componentCounts),JSON.stringify({'Paper 1':8,'Paper 2':6,'Paper 4':5,'Paper 5':5}),'component counts match official AS routes');

for(const e of rows){
 assert.equal(e.notesVerified,true,e.title+' verified');
 assert.equal(e.sourceYear,'2026–2027',e.title+' syllabus year');
 assert.ok(e.deepNotes?.overview,e.title+' overview');
 assert.ok(e.deepNotes?.concepts?.length>=6,e.title+' detailed concepts');
 assert.ok(e.deepNotes?.examTips?.length>=4,e.title+' exam guidance');
 assert.ok(e.deepNotes?.selfCheck?.length>=5,e.title+' self-check');
 assert.ok(e.deepNotes?.practice?.length>=2,e.title+' practice plan');
 assert.ok(!e.summary.includes('is a core mathematics topic in the Cambridge'),e.title+' generic template removed');
}
const by=t=>rows.find(e=>e.title===t);
assert.ok(by('Pure Mathematics: Quadratics').deepNotes.concepts.some(x=>String(x[0]).includes('Discriminant')),'P1 quadratics covers discriminant');
assert.ok(by('Pure Mathematics: Integration').formulas.some(x=>x.includes('π∫y²dx')),'P1 integration covers volume of revolution');
assert.ok(by('Pure Mathematics 2: Algebra'),'P2 Algebra added');
assert.ok(by('Pure Mathematics 2: Numerical Solution of Equations'),'P2 numerical methods added');
assert.ok(by('Pure Mathematics 2: Trigonometry').deepNotes.concepts.some(x=>String(x[0]).includes('R-form')),'P2 trig covers R-form');
assert.ok(by('Mechanics: Newton’s Laws of Motion'),'missing Newton laws topic added');
assert.ok(by('Mechanics: Energy, Work and Power'),'missing work-energy-power topic added');
assert.ok(by('Mechanics: Forces and Equilibrium').formulas.includes('limiting friction F=μR'),'Mechanics covers limiting friction');
assert.ok(by('Statistics: Discrete Random Variables').deepNotes.concepts.some(x=>String(x[0]).includes('Geometric')),'Statistics covers geometric distribution');
assert.ok(by('Statistics: Normal Distribution').deepNotes.concepts.some(x=>String(x[0]).includes('Continuity correction')),'Normal covers continuity correction');

console.log('CAIE AS MATHEMATICS DEEP NOTES OK',rows.length,'topics');
