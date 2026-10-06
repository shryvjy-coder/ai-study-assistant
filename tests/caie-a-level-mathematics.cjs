const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const script=fs.readFileSync('script.js','utf8');
const match=script.match(/const STUDY_DATA = (\[[\s\S]*?\]);\r?\nconst CBSE_NCERT_EXPANSION/);
assert.ok(match,'embedded STUDY_DATA is readable');
const data=JSON.parse(match[1]);
const before=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='A Level (12)'&&e.subject==='Mathematics');
assert.equal(before.length,16,'legacy A Level Mathematics baseline has 16 records');
const legacyIds=before.map(e=>e.id);

const window={STUDYAI_CURRICULUM:data};
vm.runInContext(fs.readFileSync('caie-a-level-mathematics-deep-notes.js','utf8'),vm.createContext({window,console}),{filename:'caie-a-level-mathematics-deep-notes.js'});

const rows=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='A Level (12)'&&e.subject==='Mathematics');
const active=rows.filter(e=>!e.curriculumHidden);
const status=window.STUDYAI_CAIE_A_LEVEL_MATHEMATICS_DEEP_NOTES_STATUS;

assert.equal(active.length,14,'A2-native curriculum has 14 active topics: P3 nine + P6 five');
assert.equal(status.total,14);
assert.equal(status.matched,14);
assert.equal(status.unmatched.length,0);
assert.deepEqual(status.preservedIds,legacyIds,'all 16 historical IDs are preserved');
assert.equal(status.hiddenLegacyTopics.length,2,'two obsolete legacy mechanics records are hidden');
assert.ok(status.hiddenLegacyTopics.some(x=>x.title==='Mechanics: Motion in a Circle'));
assert.ok(status.hiddenLegacyTopics.some(x=>x.title==='Mechanics: Equilibrium of a Rigid Body'));
assert.equal(status.componentCounts['Paper 3'],9);
assert.equal(status.componentCounts['Paper 6'],5);

for(const e of active){
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
assert.ok(by('Pure Mathematics: Algebra').deepNotes.concepts.some(x=>String(x[0]).includes('Partial fractions')),'P3 algebra covers partial fractions');
assert.ok(by('Pure Mathematics: Algebra').deepNotes.concepts.some(x=>String(x[0]).includes('Rational binomial')),'P3 algebra covers rational binomial');
assert.ok(by('Pure Mathematics: Differentiation').deepNotes.concepts.some(x=>String(x[0]).includes('Inverse tangent')),'P3 differentiation covers tan inverse derivative');
assert.ok(by('Pure Mathematics: Integration').deepNotes.concepts.some(x=>String(x[0]).includes('Integration by parts')),'P3 integration covers by parts');
assert.ok(by('Vectors').deepNotes.concepts.some(x=>String(x[0]).includes('Skew lines')),'vectors covers skew lines');
assert.ok(by('Differential Equations').deepNotes.concepts.some(x=>String(x[0]).includes('Separable')),'differential equations covers separation');
assert.ok(by('Complex Numbers').deepNotes.concepts.some(x=>String(x[0]).includes('Loci')),'complex numbers covers Argand loci');
assert.ok(by('Statistics: Poisson Distribution').deepNotes.concepts.some(x=>String(x[0]).includes('Binomial approximation')),'P6 Poisson covers binomial approximation');
assert.ok(by('Statistics: Sampling and Estimation').deepNotes.concepts.some(x=>String(x[0]).includes('Central Limit')),'sampling covers CLT');
assert.ok(by('Statistics: Hypothesis Tests').deepNotes.concepts.some(x=>String(x[0]).includes('Type I')),'hypothesis tests cover Type I/II');

console.log('CAIE A LEVEL MATHEMATICS DEEP NOTES OK',active.length,'active A2 topics');
