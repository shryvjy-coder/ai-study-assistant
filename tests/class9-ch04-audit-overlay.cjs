#!/usr/bin/env node
'use strict';
// Offline-only regression for the manually refined Chapter 4 NCERT lesson overlay.
// Runs without Gemini, the website backend, browsers or network access.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','cbse-class9-maths-audited-proposals.js'),'utf8');
const begin='const proposals = ', end=';\nconst bank=';
assert.equal(source.split(begin).length,2,'Unique JSON proposal-data marker');
assert.equal(source.split(end).length,2,'Unique trusted loader marker');
const records=JSON.parse(source.split(begin)[1].split(end)[0]);
assert.deepEqual(records.map(r=>r.chapter_number),[1,2,3,4],
  'Reviewed Chapters 1–3 must not be lost');
const chapter=records.find(r=>r.chapter_number===4);
assert.equal(chapter.lessons.length,11,'Three original AI-reviewed and eight editorial additions');
const names=chapter.lessons.map(p=>p.title);
assert.equal(new Set(names.map(x=>x.toLowerCase())).size,11,'No duplicate lesson titles');
for(const item of chapter.lessons){
  assert.ok(item.evidence?.length, item.title+': source context required');
  assert.ok(item.paragraphs?.length>=2 && item.paragraphs.every(p=>p.length>=100),
    item.title+': substantial explanations required');
  assert.ok(item.examples?.length>=1 && item.examples.every(e=>
    e.steps?.length>=3 && typeof e.answer==='string' && e.answer.length),
    item.title+': multi-step worked solution required');
}
const required=[
 'Geometric subtraction proof of (a − b)²',
 "Shridharacharya's rearranged square identity",
 'Algebra tiles for rectangular factorisation',
 'General linear binomial products',
 'Cube dissection: two cubes and six cuboids',
 'Cubic identities under a given linear condition',
 'Given linear factors and unknown quadratic coefficients',
 'Area of an outer border around a square'
];
for(const title of required)assert.ok(names.includes(title),'Missing curriculum fix: '+title);
// Simulate the real loader against minimal pre-existing data. This catches
// typoed section names, bad merge_into values and insertion-order mistakes.
const bank={};
for(const record of records){
  const sections=new Map();
  for(let i=0;i<record.lessons.length;i++){
    const lesson=record.lessons[i];
    if(!sections.has(lesson.section))sections.set(lesson.section,{
      title:lesson.section,subtopics:[]
    });
    const previouslyAdded=record.lessons.slice(0,i).some(p=>p.section===lesson.section
      && p.title===lesson.merge_into && !p.merge_into);
    if(lesson.merge_into && !previouslyAdded){
      const subs=sections.get(lesson.section).subtopics;
      if(!subs.some(p=>p.title===lesson.merge_into)){
        subs.push({title:lesson.merge_into,paragraphs:[],examples:[],formulas:[]});
      }
    }
  }
  bank[record.chapter_title]={sections:[...sections.values()]};
}
const sandbox={window:{CBSE_CLASS9_MATH_FULL_NOTES:bank,
 STUDYAI_CLASS9_DEPTH_AUDIT:{}}};
vm.runInNewContext(source,sandbox,{filename:'cbse-class9-maths-audited-proposals.js',timeout:3000});
const note=sandbox.window.CBSE_CLASS9_MATH_FULL_NOTES[chapter.chapter_title];
const subtopics=note.sections.flatMap(s=>s.subtopics);
for(const item of required){
  const proposal=chapter.lessons.find(x=>x.title===item);
  const expected=proposal.merge_into||proposal.title;
  const matching=note.sections.find(s=>s.title===proposal.section).subtopics
   .find(p=>p.title===expected);
  assert.ok(matching && matching.paragraphs.length>=2,
    'Lesson should appear in selected section: '+item);
}
assert.ok(subtopics.some(p=>p.title==='Square of a trinomial'));
assert.ok(subtopics.some(p=>p.title==='Sum, difference, and three-variable cubic identities'));
for(const n of [1,2,3,4,5,7,20]){
  assert.equal((n-1)*n*(n+1)%6,0,'n³−n is divisible by six');
}
for(const [a,b] of [[0,0],[3,2],[9,5]]){
  assert.equal((a-b)**2,a*a-2*a*b+b*b);
  assert.equal((a+b)*(a-b)+b*b,a*a);
  assert.equal((a+b)**3,a**3+3*a*a*b+3*a*b*b+b**3);
}
for(const [p,s] of [[1,5],[3,9]])assert.equal(
  3*p*(s-1)*(s-4),3*p*s*s-15*p*s+12*p);
for(let width=0;width<=9;width++)assert.equal(
 (40+2*width)**2-1600,160*width+4*width*width);
for(let x=-5;x<=5;x++){
  const y=-4-x;
  assert.equal(x**3+y**3-12*x*y+64,0);
}
for(let y=-5;y<=5;y++){
  const x=2*y+6;
  assert.equal(x**3-8*y**3-36*x*y-216,0);
}
const coeffP=-2,coeffR=-2;
assert.equal(4*coeffP+10+coeffR,0);
assert.equal(coeffP/4+2.5+coeffR,0);
console.log('PASS: Chapter 4 NCERT audit refinements, loader preservation, and identity spot checks');
