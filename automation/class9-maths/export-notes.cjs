#!/usr/bin/env node
'use strict';
// Read the real StudyAI note bank and depth scripts without opening a browser.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const site=path.resolve(process.argv[2]||'.');
const manifest=require('./manifest.json');
const scripts=[
 'cbse-class9-math-full-notes-a.js',
 'cbse-class9-math-full-notes-b.js',
 'cbse-class9-math-full-notes-c.js',
 'cbse-class9-math-topic-lessons.js',
 'cbse-class9-math-concept-lessons.js',
 'cbse-class9-math-audit-corrections.js',
 'cbse-class9-math-textbook-verified.js',
 'cbse-class9-maths-depth-engine.js',
 ...Array.from({length:14},(_,i)=>'cbse-class9-maths-depth-ch'+String(i+1).padStart(2,'0')+'.js'),
 // Previously approved lessons must be included before Gemini compares notes.
 'cbse-class9-maths-audited-proposals.js'
];
const w={};
const ctx=vm.createContext({window:w,console:{log(){},warn(){}}});
for(const file of scripts){
 const full=path.join(site,file);
 if(!fs.existsSync(full)){
  if(file==='cbse-class9-maths-audited-proposals.js')continue; // Optional until first approval.
  if(file==='cbse-class9-maths-depth-ch03.js')continue; // Chapter 3 has full notes already.
  throw Error('The source branch is missing a required depth script: '+file);
 }
 vm.runInContext(fs.readFileSync(full,'utf8'),ctx,{filename:file,timeout:15000});
}
const bank=w.CBSE_CLASS9_MATH_FULL_NOTES||{};
const result={course:manifest.course,year:manifest.year,chapters:[]};
for(const expected of manifest.chapters){
 const ch=bank[expected.title];
 if(!ch||!Array.isArray(ch.sections))throw Error('Missing notes for '+expected.title);
 const sections=JSON.parse(JSON.stringify(ch.sections));
 result.chapters.push({number:expected.number,title:expected.title,lead:ch.lead||'',sections});
}
process.stdout.write(JSON.stringify(result,null,2)+'\n');
