const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const script=fs.readFileSync('script.js','utf8');
const match=script.match(/const STUDY_DATA = (\[[\s\S]*?\]);\r?\nconst CBSE_NCERT_EXPANSION/);
assert.ok(match,'embedded STUDY_DATA is readable');
const data=JSON.parse(match[1]);

const before=data
  .filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Physics')
  .map(e=>({id:e.id,title:e.title}));
assert.equal(before.length,12,'baseline AS Physics contains 12 runtime topics');

const window={STUDYAI_CURRICULUM:data};
const context=vm.createContext({window,console});
vm.runInContext(fs.readFileSync('caie-as-physics-deep-notes.js','utf8'),context,{filename:'caie-as-physics-deep-notes.js'});

const rows=data.filter(e=>e.board==='Cambridge International AS & A Level'&&e.grade==='AS Level (11)'&&e.subject==='Physics');
const status=window.STUDYAI_CAIE_AS_PHYSICS_DEEP_NOTES_STATUS;
assert.equal(status.total,12,'deep-note layer expects exactly 12 AS Physics topics');
assert.equal(status.matched,12,'all AS Physics deep notes attach to runtime topics');
assert.equal(status.unmatched.length,0,'AS Physics has no unmatched deep-note topics');
assert.deepEqual(rows.map(e=>e.id),before.map(e=>e.id),'existing AS Physics IDs are preserved');

for(const entry of rows){
  assert.equal(entry.notesVerified,true,entry.title+' is marked verified');
  assert.equal(entry.sourcePublisher,'Cambridge International',entry.title+' has Cambridge source metadata');
  assert.equal(entry.sourceBook,'Physics 9702',entry.title+' identifies the syllabus');
  assert.equal(entry.sourceYear,'2025–2027',entry.title+' identifies the source years');
  assert.ok(entry.deepNotes?.overview,entry.title+' has a deep overview');
  assert.ok(entry.deepNotes?.concepts?.length>=7,entry.title+' has detailed concepts');
  assert.ok(entry.deepNotes?.reasoning?.length>=4,entry.title+' has reasoning guidance');
  assert.ok(entry.deepNotes?.examTips?.length>=4,entry.title+' has exam guidance');
  assert.ok(entry.deepNotes?.selfCheck?.length>=5,entry.title+' has self-check questions');
  assert.ok(entry.keyPoints?.length>=5,entry.title+' has useful quick-review key points');
  assert.ok(!entry.summary.includes('is a core physics topic in the Cambridge'),entry.title+' no longer uses the generic template summary');
}

const byTitle=title=>rows.find(e=>e.title===title);

assert.ok(byTitle('Physical Quantities and Units').deepNotes.concepts.some(x=>String(x[0]).includes('Random')||String(x[1]).includes('systematic')),'measurement notes cover random and systematic error');
assert.ok(byTitle('Physical Quantities and Units').deepNotes.distinctions.some(x=>x.includes('Accuracy')&&x.includes('precision')),'measurement notes distinguish accuracy and precision');
assert.ok(byTitle('Physical Quantities and Units').deepNotes.concepts.some(x=>String(x[1]).includes('pico')&&String(x[1]).includes('tera')),'measurement notes explicitly cover the full syllabus prefix range');

assert.ok(byTitle('Kinematics').formulas.includes('v = u + at'),'Kinematics includes constant-acceleration equations');
assert.ok(byTitle('Kinematics').deepNotes.concepts.some(x=>String(x[0]).includes('Velocity-time')),'Kinematics covers velocity-time graph interpretation');
assert.ok(byTitle('Kinematics').deepNotes.concepts.some(x=>String(x[0]).includes('Experiment to determine g')),'Kinematics covers an experiment to determine free-fall acceleration');

assert.ok(byTitle('Dynamics').deepNotes.concepts.some(x=>String(x[0]).includes('terminal')||String(x[1]).includes('terminal velocity')),'Dynamics covers terminal velocity');
assert.ok(byTitle('Dynamics').deepNotes.concepts.some(x=>String(x[0]).includes('Conservation of momentum')),'Dynamics covers momentum conservation');
assert.ok(byTitle('Dynamics').deepNotes.concepts.some(x=>String(x[1]).includes('relative speed of approach')&&String(x[1]).includes('relative speed of separation')),'Dynamics includes the elastic-collision relative-speed condition');

assert.ok(byTitle('Forces, Density and Pressure').formulas.includes('Δp = ρgΔh'),'fluid notes include hydrostatic pressure');
assert.ok(byTitle('Forces, Density and Pressure').formulas.includes('upthrust F = ρgV'),'fluid notes include Archimedes principle');
assert.ok(byTitle('Forces, Density and Pressure').deepNotes.concepts.some(x=>String(x[0]).includes('Archimedes')),'fluid notes name Archimedes principle explicitly');

assert.ok(byTitle('Work, Energy and Power').formulas.includes('P = Fv'),'energy notes include P = Fv');
assert.ok(byTitle('Work, Energy and Power').formulas.includes('E_k = 1/2 mv²'),'energy notes include kinetic energy');

assert.ok(byTitle('Deformation of Solids').formulas.includes('Young modulus E = stress/strain'),'deformation notes include Young modulus');
assert.ok(byTitle('Deformation of Solids').deepNotes.concepts.some(x=>String(x[1]).includes('area under the force-extension graph')),'deformation notes connect graph area to work');

assert.ok(byTitle('Waves').formulas.includes('I = I_0 cos²θ'),'Waves includes Malus law');
assert.ok(byTitle('Waves').deepNotes.concepts.some(x=>String(x[0]).includes('Doppler')),'Waves covers the Doppler effect');

assert.ok(byTitle('Superposition').formulas.includes('double slit: λ = ax/D'),'Superposition includes double-slit relation');
assert.ok(byTitle('Superposition').formulas.includes('diffraction grating: d sin θ = nλ'),'Superposition includes grating relation');

assert.ok(byTitle('Electricity').formulas.includes('I = Anvq'),'Electricity includes microscopic current equation');
assert.ok(byTitle('Electricity').formulas.includes('R = ρL/A'),'Electricity includes resistivity relation');

assert.ok(byTitle('D.C. Circuits').deepNotes.concepts.some(x=>String(x[0]).includes('Kirchhoff first law')),'D.C. Circuits covers Kirchhoff first law');
assert.ok(byTitle('D.C. Circuits').deepNotes.concepts.some(x=>String(x[0]).includes('Potentiometer')),'D.C. Circuits covers potentiometer null methods');

assert.ok(byTitle('Particle Physics').deepNotes.concepts.some(x=>String(x[0]).includes('Quarks')),'Particle Physics covers quarks');
assert.ok(byTitle('Particle Physics').deepNotes.concepts.some(x=>String(x[0]).includes('Leptons')),'Particle Physics covers leptons');
assert.ok(byTitle('Particle Physics').deepNotes.quickRevision.some(x=>x.includes('proton uud')),'Particle Physics includes proton quark composition');
assert.ok(byTitle('Particle Physics').deepNotes.concepts.some(x=>String(x[1]).includes('up, down, strange, charm, top and bottom')),'Particle Physics names all six quark flavours');
assert.ok(byTitle('Particle Physics').deepNotes.concepts.some(x=>String(x[0]).includes('Unified atomic mass unit')),'Particle Physics covers the unified atomic mass unit');

assert.ok(byTitle('AS Practical Skills').deepNotes.concepts.some(x=>String(x[0]).includes('Graph layout')),'practical notes cover graph layout');
assert.ok(byTitle('AS Practical Skills').deepNotes.concepts.some(x=>String(x[0]).includes('Uncertainty')),'practical notes cover uncertainty');
assert.ok(byTitle('AS Practical Skills').deepNotes.examTips.some(x=>x.includes('best-fit line')),'practical notes cover best-fit gradient technique');
assert.ok(byTitle('AS Practical Skills').deepNotes.concepts.some(x=>String(x[1]).includes('half the range')),'practical notes cover repeated-reading half-range uncertainty');
assert.ok(byTitle('AS Practical Skills').deepNotes.concepts.some(x=>String(x[1]).includes('percentage difference')&&String(x[1]).includes('percentage uncertainty')),'practical notes cover hypothesis comparison using percentage difference and uncertainty');

console.log('CAIE AS PHYSICS DEEP NOTES OK',rows.length,'topics');
