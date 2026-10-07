const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');

const dir=mkdtempSync(path.join(tmpdir(),'studyai-caie-a2-chem-browser-'));
const port=process.env.TEST_CAIE_A2_CHEM_PORT||'5109';
const url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{
 cwd:path.join(__dirname,'..'),
 env:{...process.env,PORT:port,FLASK_DEBUG:'0',DATABASE_PATH:path.join(dir,'test.sqlite'),COOKIE_SECURE:'0'},
 stdio:['ignore','ignore','pipe']
});
let browser,serverErrors='';
server.stderr.on('data',chunk=>{serverErrors=(serverErrors+String(chunk)).slice(-12000)});
const check=(v,m)=>{assert.ok(v,m);console.log('PASS',m)};

async function dismiss(page){
 if(await page.locator('#studyai-onboarding[open]').count())await page.locator('[data-onboarding-skip]').click();
 await page.waitForSelector('#help-guided-tour:not(.hidden)',{timeout:3000}).catch(()=>{});
 if(await page.locator('#help-guided-tour:not(.hidden)').count()){
  await page.locator('[data-tour-skip]').click();
  await page.locator('[data-tour-skip-confirm]').click();
  await page.waitForFunction(()=>document.querySelector('#help-guided-tour')?.classList.contains('hidden'));
 }
}

(async()=>{
 for(let i=0;i<100;i++){try{if((await fetch(url+'/api/health')).ok)break}catch{} await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1365,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url+'#study',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#chapter-list'); await page.waitForTimeout(800); await dismiss(page);
 await page.selectOption('#board-filter','Cambridge International AS & A Level');
 await page.selectOption('#grade-filter','A Level (12)');
 await page.selectOption('#subject-filter','Chemistry');
 await page.waitForTimeout(250);

 check((await page.locator('#chapter-count').textContent())==='16','A Level Chemistry exposes corrected 16-topic structure');
 const status=await page.evaluate(()=>window.STUDYAI_CAIE_A_LEVEL_CHEMISTRY_DEEP_NOTES_STATUS);
 check(status?.total===16&&status?.matched===16&&status?.unmatched?.length===0,'all 16 A Level Chemistry notes attach');

 for(const [title,needles] of [
  ['Advanced Electrochemistry',['Nernst equation','Gibbs-cell link']],
  ['Advanced Group 2',['Thermal stability','Hydroxide solubility']],
  ['Transition Elements',['Stability constant','d-orbital splitting']],
  ['Aromatic Chemistry',['Friedel–Crafts acylation','Directing effects']],
  ['Carboxylic Acids and Acyl Chloride Derivatives',['Addition–elimination mechanism','Acyl chloride hydrolysis']],
  ['Nitrogen Chemistry',['Electrophoresis','Diazotisation']],
  ['Condensation Polymerisation',['Polyester formation','Polyamide formation']],
  ['NMR Spectroscopy',['Deuterated solvent','D₂O exchange']],
  ['A Level Practical Planning and Analysis',['Control experiments','Anomalies','Validity and confidence']]
 ]){
  await page.locator('.chapter-item').filter({hasText:title}).click();
  const text=await page.locator('#detailed-notes').textContent();
  check(needles.every(n=>text.includes(n)),title+' renders syllabus-specific A Level Chemistry content');
 }

 check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
 console.log('CAIE A LEVEL CHEMISTRY BROWSER OK');
})().catch(e=>{console.error(e);console.error(serverErrors);process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close(); server.kill(); rmSync(dir,{recursive:true,force:true});
});
