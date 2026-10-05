const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const window={};
const context=vm.createContext({window,console});
for(const file of ['cbse-ncert-secondary.js','cbse-ncert-senior-secondary.js','cbse-ncert-extra.js','cbse-ncert-deep-notes-09.js','cbse-ncert-deep-notes-10.js']){
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}

const script=fs.readFileSync('script.js','utf8');
const match=script.match(/const STUDY_DATA = (\[[\s\S]*?\]);\r?\nconst CBSE_NCERT_EXPANSION/);
assert.ok(match,'embedded STUDY_DATA is readable');
const data=JSON.parse(match[1]);

const expansions=[...(window.CBSE_NCERT_SECONDARY||[]),...(window.CBSE_NCERT_SENIOR_SECONDARY||[])];
const ids=new Set(data.map(entry=>entry.id));
for(const entry of expansions){
  if(!entry?.id||ids.has(entry.id))continue;
  data.push(entry);ids.add(entry.id);
}

const beforeRefresh=[...data];
const matchesScope=(entry,scope)=>entry?.board==='CBSE'&&entry.grade===scope.grade&&entry.subject===scope.subject&&(!scope.sourceBook||entry.sourceBook===scope.sourceBook);
for(const scope of window.CBSE_NCERT_REPLACEMENTS||[]){
  for(let i=data.length-1;i>=0;i--)if(matchesScope(data[i],scope))data.splice(i,1);
}
const previousByBookTopic=new Map(beforeRefresh.map(entry=>[[entry.board,entry.grade,entry.subject,entry.sourceBook||'',entry.title].join('|'),entry]));
const previousByTopic=new Map();
for(const entry of beforeRefresh){
  const key=[entry.board,entry.grade,entry.subject,entry.title].join('|');
  if(!previousByTopic.has(key))previousByTopic.set(key,[]);
  previousByTopic.get(key).push(entry);
}
const refreshedIds=new Set(data.map(entry=>entry.id));
for(const fresh of window.CBSE_NCERT_EXTRA||[]){
  if(!fresh?.id)continue;
  const bookKey=[fresh.board,fresh.grade,fresh.subject,fresh.sourceBook||'',fresh.title].join('|');
  const topicKey=[fresh.board,fresh.grade,fresh.subject,fresh.title].join('|');
  let previous=previousByBookTopic.get(bookKey);
  if(!previous){
    const candidates=previousByTopic.get(topicKey)||[];
    if(candidates.length===1)previous=candidates[0];
  }
  let preservedId=previous?.id||fresh.id;
  if(refreshedIds.has(preservedId)&&!data.some(item=>item.id===preservedId&&item.board===fresh.board&&item.grade===fresh.grade&&item.subject===fresh.subject&&item.sourceBook===fresh.sourceBook&&item.title===fresh.title)){
    preservedId=fresh.id;
  }
  const entry=previous?{
    ...fresh,
    id:preservedId,
    summary:previous.summary||fresh.summary,
    keyPoints:previous.keyPoints?.length?previous.keyPoints:fresh.keyPoints,
    formulas:previous.formulas?.length?previous.formulas:fresh.formulas,
    lens:fresh.lens||previous.lens,
    method:fresh.method?.length?fresh.method:previous.method,
    mistakes:fresh.mistakes?.length?fresh.mistakes:previous.mistakes
  }:{...fresh,id:preservedId};
  const existing=data.findIndex(item=>item.id===entry.id);
  if(existing>=0)data[existing]=entry;else data.push(entry);
  refreshedIds.add(entry.id);
}
for(const patch of window.CBSE_NCERT_PATCHES||[]){
  for(const entry of data){
    if(entry.board==='CBSE'&&entry.grade===patch.grade&&entry.subject===patch.subject)Object.assign(entry,patch);
  }
}

const deepNotes=window.CBSE_NCERT_DEEP_NOTES||[];
const grade9DeepNotes=deepNotes.filter(note=>note.grade==='Class 9');
const grade10DeepNotes=deepNotes.filter(note=>note.grade==='Class 10');
assert.equal(grade9DeepNotes.length,56,'Class 9 deep-note layer remains at exactly 56 entries');
assert.equal(grade10DeepNotes.length,109,'Class 10 deep-note layer has exactly 109 entries');
assert.equal(new Set(deepNotes.map(note=>[note.grade,note.subject,note.sourceBook||'',note.title].join('|'))).size,165,'Class 9 and 10 deep-note keys are unique');
let matchedDeepNotes=0;
for(const note of deepNotes){
  assert.ok(note.grade==='Class 9'||note.grade==='Class 10','deep-note layer remains scoped to Classes 9 and 10 only');
  const entry=data.find(item=>item.board==='CBSE'&&item.grade===note.grade&&item.subject===note.subject&&(item.sourceBook||'')===(note.sourceBook||'')&&item.title===note.title);
  assert.ok(entry,'deep note maps to runtime curriculum: '+note.subject+' / '+note.title);
  assert.ok(note.notesVerified===true,'deep note is marked verified: '+note.title);
  assert.ok(note.sourceFile,'deep note records its NCERT source file: '+note.title);
  assert.ok(note.deepNotes?.overview,'deep note has chapter overview: '+note.title);
  assert.ok(note.deepNotes?.concepts?.length>=3,'deep note has chapter-specific concepts: '+note.title);
  assert.ok(note.deepNotes?.examTips?.length>=2,'deep note has exam guidance: '+note.title);
  assert.ok(note.deepNotes?.quickRevision?.length>=3,'deep note has quick revision: '+note.title);
  assert.ok(note.deepNotes?.selfCheck?.length>=3,'deep note has self-check questions: '+note.title);
  matchedDeepNotes++;
}
assert.equal(matchedDeepNotes,165,'all Class 9 and Class 10 deep notes map to current curriculum');

const cbse=data.filter(x=>x.board==='CBSE');
const key=(g,s)=>cbse.filter(x=>x.grade===g&&x.subject===s);
const expectCount=(g,s,n)=>{
  const actual=key(g,s).length;
  assert.equal(actual,n,`${g} ${s}: expected ${n}, got ${actual}`);
  console.log('PASS',g,s,n);
};

assert.equal(new Set(data.map(x=>x.id)).size,data.length,'curriculum IDs are unique');

expectCount('Class 9','Mathematics',14);
expectCount('Class 9','Science',13);
expectCount('Class 9','English',8);
expectCount('Class 9','Social Science',9);
expectCount('Class 9','Hindi',12);
expectCount('Class 10','Mathematics',14);
expectCount('Class 10','Science',13);
expectCount('Class 10','English',28);
expectCount('Class 10','Social Science',22);
expectCount('Class 10','Hindi Course A',15);
expectCount('Class 10','Hindi Course B',17);

expectCount('Class 11','Economics',13);
expectCount('Class 11','Accountancy',9);
expectCount('Class 11','Business Studies',11);
expectCount('Class 11','Geography',26);
expectCount('Class 11','English Elective',27);
expectCount('Class 11','Hindi Core',20);
expectCount('Class 11','Hindi Elective',18);
expectCount('Class 11','Sanskrit Core',11);
expectCount('Class 11','Sanskrit Elective',11);

expectCount('Class 12','Biology',13);
expectCount('Class 12','Business Studies',11);
expectCount('Class 12','Geography',21);
expectCount('Class 12','Sociology',15);
expectCount('Class 12','English Elective',21);
expectCount('Class 12','Hindi Core',18);
expectCount('Class 12','Hindi Elective',20);
expectCount('Class 12','Sanskrit Core',10);
expectCount('Class 12','Sanskrit Elective',11);

const has=(g,s,t)=>key(g,s).some(x=>x.title===t);
assert.equal(key('Class 11','Economics').filter(x=>x.title==='Introduction').length,2,'Class 11 Economics keeps both book-specific Introduction chapters');
assert.equal(new Set(key('Class 11','Economics').filter(x=>x.title==='Introduction').map(x=>x.id)).size,2,'Class 11 Economics Introduction chapters use distinct IDs');
assert.ok(has('Class 11','Economics','Use of Statistical Tools'),'Class 11 Statistics includes Use of Statistical Tools');
assert.ok(!has('Class 11','Economics','Measures of Dispersion'),'stale Class 11 Statistics Measures of Dispersion chapter is removed');
assert.ok(has('Class 12','English','Memories of Childhood'),'Vistas includes Memories of Childhood');
assert.ok(has('Class 12','Biology','Biodiversity and Conservation'),'Class 12 Biology includes chapter 13');
assert.ok(has('Class 12','Sociology','Mass Media and Communications'),'Class 12 Sociology includes current social-change chapter');
assert.ok(has('Class 11','Business Studies','MSME and Business Entrepreneurship'),'Class 11 Business Studies uses current MSME title');

assert.ok(!has('Class 11','Accountancy','Bills of Exchange'),'stale Class 11 Bills of Exchange is removed');
assert.ok(!has('Class 11','Accountancy','Accounts from Incomplete Records'),'stale Class 11 incomplete-records chapter is removed');
assert.ok(!has('Class 12','Business Studies','Financial Markets'),'stale Class 12 Financial Markets chapter is removed');
assert.ok(!has('Class 12','Geography','Field Surveys'),'stale Class 12 Geography Field Surveys chapter is removed');
assert.ok(!has('Class 11','Geography','Soils'),'stale Class 11 India Physical Environment Soils chapter is removed');

for(const patch of window.CBSE_NCERT_PATCHES||[]){
  const patched=key(patch.grade,patch.subject);
  assert.ok(patched.length,patch.grade+' '+patch.subject+' has entries to source');
  for(const entry of patched){
    assert.equal(entry.sourceYear,'2026-27',entry.title+' has current source year');
    assert.equal(entry.sourcePublisher,'NCERT',entry.title+' has NCERT source');
    assert.ok(entry.sourceBook,entry.title+' identifies its NCERT source book');
  }
}
for(const entry of window.CBSE_NCERT_EXTRA||[]){
  assert.equal(entry.sourcePublisher,'NCERT',entry.id+' has NCERT source');
  assert.equal(entry.sourceYear,'2026-27',entry.id+' has 2026-27 source year');
  assert.ok(entry.sourceBook,entry.id+' identifies its source book');
  assert.ok(entry.summary&&entry.keyPoints?.length>=4,entry.id+' has usable study-note content');
}

console.log('CBSE CURRICULUM OK',cbse.length,'CBSE entries');
