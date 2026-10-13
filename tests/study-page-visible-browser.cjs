/* Regression: Study page and saved full notes must be visible with normal motion,
 * including a return visit from the dashboard with a very long chapter.
 */
'use strict';
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const temp=mkdtempSync(path.join(tmpdir(),'studyai-study-visible-'));
const port=process.env.TEST_STUDY_VISIBLE_PORT||'5170';
const base='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,SECRET_KEY:'study-visibility-ci',FLASK_DEBUG:'0',
 COOKIE_SECURE:'0',GEMINI_API_KEY:'',DATABASE_PATH:path.join(temp,'studyai.sqlite')},
 stdio:['ignore','ignore','pipe']
});
let browser,stderr='';
server.stderr.on('data',chunk=>{stderr=(stderr+String(chunk)).slice(-12000)});
function check(ok,message){assert.ok(ok,message);console.log('PASS',message)}
(async()=>{
 let healthy=false;
 for(let i=0;i<150;i++){
  try{if((await fetch(base+'/api/health')).ok){healthy=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 check(healthy,'isolated StudyAI app starts');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({
   viewport:{width:1365,height:900},
   reducedMotion:'no-preference'
 });
 const errors=[];
 page.on('pageerror',err=>errors.push(err.message));
 await page.goto(base+'#today',{waitUntil:'load'});
 await page.waitForFunction(()=>typeof STUDY_DATA!=='undefined'&&
   !!STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&
     x.subject==='Science'&&x.title==='How Forces Affect Motion'));
 const selected=await page.evaluate(()=>{
  const entry=STUDY_DATA.find(x=>x.board==='CBSE'&&x.grade==='Class 9'&&
     x.subject==='Science'&&x.title==='How Forces Affect Motion');
  state.lastTopic=entry.id;
  state.completed=[...new Set([...(state.completed||[]),entry.id])];
  state.bookmarks=[...new Set([...(state.bookmarks||[]),entry.id])];
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  return entry.id;
 });
 check(!!selected,'known long full-note chapter exists');
 await page.reload({waitUntil:'load'});
 await page.waitForFunction(()=>!!document.querySelector('#detailed-notes .science-full-notes')&&
  document.querySelectorAll('#detailed-notes .worked-box').length>=30);
 check(await page.evaluate(()=>document.body.dataset.appPage==='today'),
   'dashboard route starts active before returning to saved lesson');
 await page.evaluate(()=>{location.hash='#study'});
 await page.waitForFunction(()=>document.body.dataset.appPage==='study');
 await page.waitForFunction(()=>{
  const study=document.querySelector('main > section#study');
  return study&&!study.hidden&&parseFloat(getComputedStyle(study).opacity)>.99&&
   getComputedStyle(study).visibility!=='hidden'&&
   document.querySelector('#detailed-notes .science-full-notes');
 },{timeout:8000});
 const first=await page.evaluate(()=>{
  const section=document.querySelector('#study');
  return {
    opacity:parseFloat(getComputedStyle(section).opacity),
    visible:!section.hidden,
    noteTitle:document.querySelector('#note-title')?.textContent||'',
    bodyText:document.querySelector('#detailed-notes')?.textContent||'',
    examples:document.querySelectorAll('#detailed-notes .worked-box').length,
    height:section.getBoundingClientRect().height,
    stored:JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'),
    reveal:section.classList.contains('motion-reveal')
  };
 });
 check(first.visible&&first.opacity>.99&&!first.reveal,
   'long Study page remains fully opaque, not stuck in a scroll-reveal state');
 check(first.noteTitle.includes('How Forces Affect Motion')&&first.examples===33&&
  first.bodyText.includes('Newton'),
  'saved Chapter 6 full notes and 33 worked examples are actually visible in the reader');
 check(first.stored.completed.includes(selected)&&first.stored.bookmarks.includes(selected),
  'student completion and bookmarks remain persisted');

 await page.evaluate(()=>{location.hash='#today'});
 await page.waitForFunction(()=>document.body.dataset.appPage==='today');
 await page.evaluate(()=>{location.hash='#study'});
 await page.waitForFunction(()=>document.body.dataset.appPage==='study');
 check(await page.locator('#study').evaluate(el=>!el.hidden&&
  parseFloat(getComputedStyle(el).opacity)>.99),
  'revisiting Study after dashboard navigation does not blank the page');

 await page.setViewportSize({width:390,height:844});
 check(await page.locator('#study').evaluate(el=>!el.hidden&&
  parseFloat(getComputedStyle(el).opacity)>.99),
  'Study and notes remain visible on narrow mobile viewport');
 check(errors.length===0,'no uncaught JavaScript errors: '+errors.join('; '));
 console.log('STUDY PAGE VISIBLE REGRESSION PASS');
})().catch(err=>{console.error(err);console.error(stderr);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 server.kill();rmSync(temp,{recursive:true,force:true});
});
