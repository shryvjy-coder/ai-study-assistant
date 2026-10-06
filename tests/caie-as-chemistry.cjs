const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const script=fs.readFileSync('script.js','utf8');
const match=script.match(/const STUDY_DATA = (\[[\s\S]*?\]);\r?\nconst CBSE_NCERT_EXPANSION/);
assert.ok(match,'embedded STUDY_DATA is readable');
const data=JSON.parse(match[1]);
const before=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Chemistry').map(e=>({id:e.id,title:e.title}));
assert.equal(before.length,23,'baseline AS Chemistry contains 23 runtime topics');

const window={STUDYAI_CURRICULUM:data};
vm.runInContext(fs.readFileSync('caie-as-chemistry-deep-notes.js','utf8'),vm.createContext({window,console}),{filename:'caie-as-chemistry-deep-notes.js'});

const rows=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Chemistry');
const status=window.STUDYAI_CAIE_AS_CHEMISTRY_DEEP_NOTES_STATUS;
assert.equal(status.total,23);
assert.equal(status.matched,23);
assert.equal(status.unmatched.length,0);
assert.deepEqual(rows.map(e=>e.id),before.map(e=>e.id),'existing AS Chemistry IDs are preserved');

for(const e of rows){
 assert.equal(e.notesVerified,true,e.title+' verified');
 assert.equal(e.sourceBook,'Chemistry 9701',e.title+' source metadata');
 assert.ok(e.deepNotes?.overview,e.title+' overview');
 assert.ok(e.deepNotes?.concepts?.length>=6,e.title+' detailed concepts');
 assert.ok(e.deepNotes?.examTips?.length>=4,e.title+' exam guidance');
 assert.ok(e.deepNotes?.selfCheck?.length>=5,e.title+' self-check');
 assert.ok(e.keyPoints?.length>=5,e.title+' quick review');
 assert.ok(!e.summary.includes('is a core chemistry topic in the Cambridge'),e.title+' generic template removed');
}
const by=t=>rows.find(e=>e.title===t);

assert.ok(by('Atomic Structure').deepNotes.concepts.some(x=>String(x[0]).includes('Ionisation energy')),'atomic structure covers ionisation energy');
assert.ok(by('Atomic Structure').deepNotes.concepts.some(x=>String(x[0]).includes('Orbital')),'atomic structure covers orbitals');
assert.ok(by('Atoms, Molecules and Stoichiometry').formulas.includes('n = m/M'),'stoichiometry includes mole formula');
assert.ok(by('Chemical Bonding').deepNotes.concepts.some(x=>String(x[0]).includes('Sigma and pi')),'bonding covers sigma/pi');
assert.ok(by('States of Matter').formulas.includes('pV = nRT'),'states includes ideal gas law');
assert.ok(by('Chemical Energetics').formulas.includes('q = mcΔT'),'energetics includes calorimetry');
assert.ok(by('Equilibria').deepNotes.concepts.some(x=>String(x[0]).includes('Kp')),'equilibria covers Kp');
assert.ok(by('Reaction Kinetics').deepNotes.concepts.some(x=>String(x[0]).includes('Boltzmann')),'kinetics covers Boltzmann');
assert.ok(by('Group 17').deepNotes.concepts.some(x=>String(x[0]).includes('Silver nitrate')),'Group 17 covers halide test');
assert.ok(by('Introduction to Organic Chemistry').deepNotes.concepts.some(x=>String(x[0]).includes('Curly arrows')),'organic intro covers curly arrows');
assert.ok(by('Hydrocarbons').deepNotes.concepts.some(x=>String(x[0]).includes('Markovnikov')),'hydrocarbons covers Markovnikov');
assert.ok(by('Halogen Compounds').deepNotes.concepts.some(x=>String(x[0]).includes('SN1')),'halogen compounds covers SN1');
assert.ok(by('Halogen Compounds').deepNotes.concepts.some(x=>String(x[0]).includes('SN2')),'halogen compounds covers SN2');
assert.ok(by('Carbonyl Compounds').deepNotes.concepts.some(x=>String(x[0]).includes('2,4-DNPH')),'carbonyl covers DNPH');
assert.ok(by('Analytical Techniques').deepNotes.concepts.some(x=>String(x[0]).includes('M+1')),'analysis covers M+1 carbon count');
assert.ok(by('AS Practical Skills').deepNotes.concepts.some(x=>String(x[0]).includes('Titration')),'practical covers titration');
assert.ok(by('AS Practical Skills').deepNotes.concepts.some(x=>String(x[0]).includes('Qualitative')),'practical covers qualitative analysis');

console.log('CAIE AS CHEMISTRY DEEP NOTES OK',rows.length,'topics');
