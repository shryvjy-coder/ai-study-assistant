/* Run: npm install --no-save playwright; npx playwright install chromium;
 * node tests/learning-integration.cjs. Uses a temporary database, never your accounts. */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdtempSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const dir=mkdtempSync(path.join(tmpdir(),'studyai-test-'));
const port=process.env.TEST_PORT||'5099',url='http://127.0.0.1:'+port;
const server=spawn(process.env.PYTHON||'python',['launcher.py'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:port,FLASK_DEBUG:'0',DATABASE_PATH:path.join(dir,'test.sqlite')},stdio:['ignore','ignore','pipe']});
let serverErrors='';server.stderr.on('data',chunk=>{serverErrors=(serverErrors+String(chunk)).slice(-12000)});
let browser,checks=0;
const check=(value,message)=>{assert.ok(value,message);checks++;console.log('PASS',message)};
const dismissFirstRunTour=async page=>{
  const returnHash=await page.evaluate(()=>location.hash||'#today');
  await page.waitForSelector('#help-guided-tour:not(.hidden)',{timeout:3000}).catch(()=>{});
  if(await page.locator('#help-guided-tour:not(.hidden)').count()){
    await page.locator('[data-tour-skip]').click();
    await page.locator('[data-tour-skip-confirm]').click();
    await page.waitForFunction(()=>document.querySelector('#help-guided-tour')?.classList.contains('hidden'));
  }
  await page.evaluate(hash=>location.hash=hash,returnHash);
};
(async()=>{
 for(let i=0;i<80;i++){try{if((await fetch(url+'/api/auth/me')).ok)break}catch{}await new Promise(r=>setTimeout(r,100))}
 browser=await chromium.launch({headless:true,...(process.env.TEST_CHROMIUM?{executablePath:process.env.TEST_CHROMIUM,args:['--no-sandbox','--disable-gpu']}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.clock.install();
 await page.goto(url);await page.waitForSelector('#learning-goals');await page.waitForSelector('#today-dashboard');await page.waitForTimeout(600);
 if(await page.locator('#studyai-onboarding[open]').count())await page.locator('[data-onboarding-skip]').click();
 await dismissFirstRunTour(page);
 check(await page.locator('#learning-goals').count()===1,'Flask injects planning after existing assets');
 check(await page.locator('#today-dashboard').count()===1,'Today dashboard loads');
 check(await page.evaluate(()=>StudyAIProduct.confidence(2).label==='Limited evidence'&&StudyAIProduct.confidence(10).label==='Developing evidence'&&StudyAIProduct.confidence(25).label==='Strong evidence'),'evidence confidence reflects answer count');
 check(await page.evaluate(()=>{const steps=StudyAIProduct.buildSession(20);return steps.length>0&&steps.every(x=>x.minutes>=3)}),'guided session builds from current evidence or a safe fallback');
 check(await page.evaluate(()=>smartReviewCandidates().total===0),'empty review queue');
 const setup=async id=>page.evaluate(id=>{activeDeck=[{id,front:'Question',back:'Answer',source:'Test'}];cardIndex=0;dueReviewSession=false;renderCard();renderFlashStats()},id);
 await setup('srs-hidden');
 await page.evaluate(()=>rateFlashcard('good'));
 check(await page.evaluate(()=>!state.flashcardSchedule['srs-hidden']),'hidden card cannot be rated');
 check(await page.locator('[data-srs-rating]:disabled').count()===4,'all ratings disabled until reveal');
 for(const [rating,minutes] of [['again',1],['hard',10],['good',1440],['easy',5760]]){
  await setup('srs-'+rating);await page.evaluate(rating=>{document.querySelector('#flashcard').click();const button=document.querySelector('[data-srs-rating="'+rating+'"]');if(button.disabled)throw new Error('rating stayed disabled after reveal');button.click()},rating);
  check(await page.evaluate(({rating,minutes})=>{const r=state.flashcardSchedule['srs-'+rating];return r.intervalMinutes===minutes&&Math.abs(r.dueAt-r.lastReviewedAt-minutes*60000)<10},{rating,minutes}),rating+' schedules expected first interval');
 }
 check(await page.evaluate(()=>nextSrsInterval({intervalMinutes:1440},'good')>1440&&nextSrsInterval({intervalMinutes:1440},'hard')>1440&&nextSrsInterval({intervalMinutes:1440},'easy')>1440),'later Good, Hard, Easy extend intervals');
 await page.evaluate(()=>{state.flashcardState['untouched-legacy']='Mastered';state.flashcardSchedule['srs-again'].dueAt=Date.now()-1;save()});
 await page.reload();await page.waitForSelector('#learning-goals');
 check(await page.evaluate(()=>srsDueCards().some(c=>c.id==='srs-again')&&state.flashcardState['untouched-legacy']==='Mastered'),'catalog and legacy progress survive reload');
 await page.evaluate(()=>location.hash='#progress');await page.waitForSelector('#progress:not([hidden])');
 await page.locator('#srs-progress-open').click();await page.evaluate(()=>{document.querySelector('#flashcard').click();const button=document.querySelector('[data-srs-rating="good"]');if(button.disabled)throw new Error('due-review rating stayed disabled after reveal');button.click()});
 check(await page.evaluate(()=>activeDeck.length===0&&srsSummary().due===0),'due review reschedules and advances');
 await setup('other-deck');await page.evaluate(()=>{cardFlipped=true;rateFlashcard('good')});
 await setup('srs-hard');page.once('dialog',d=>d.accept());await page.locator('#reset-deck').click();
 check(await page.evaluate(()=>!state.flashcardSchedule['srs-hard']&&!!state.flashcardSchedule['other-deck']&&state.flashcardState['untouched-legacy']==='Mastered'),'reset affects only current deck');
 await setup('other-deck');await page.evaluate(()=>loadDueReviews());
 check(await page.evaluate(()=>activeDeck.length===0&&dueReviewSession),'empty due queue does not leave unrelated deck active');
 await page.evaluate(()=>{const e=STUDY_DATA[0];current={board:e.board,grade:e.grade,subject:e.subject,topic:e.title};loadDeckFromCurrent();cardFlipped=true;rateFlashcard('good');state.workspaceNotes.push({id:'test-note',title:'Test note',content:'A complete test note sentence for flashcards.',folder:'General'});rebuildDeckSources();document.querySelector('#deck-source').value='ws:test-note';loadDeckSource();cardFlipped=true;rateFlashcard('good');const q=SAT_QUESTIONS[0];noteMistakeResult(q,'sat',(q.answer+1)%4,false,'test');loadMistakeDeck(mistakeRecords());cardFlipped=true;rateFlashcard('good')});
 check(await page.evaluate(()=>Object.keys(state.reviewCardCatalog).some(k=>k.includes('|smart|'))&&!!state.reviewCardCatalog['ws|test-note|0']&&Object.values(state.reviewCardCatalog).some(c=>c.source.includes('Wrong'))),'curriculum, Workspace and wrong-answer cards schedule');
 // Advance the browser clock through the real minute refresh callback.
 await page.evaluate(()=>{state.flashcardSchedule['other-deck'].dueAt=Date.now()+59000;renderFlashStats()});
 await page.clock.fastForward(61000);
 check(await page.evaluate(()=>Number(document.querySelector('#srs-due-count').textContent)>=1),'minute timer refreshes due totals without navigation');
 await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
 check(await page.evaluate(()=>Number(document.querySelector('#srs-due-count').textContent)>=1),'due totals refresh when time advances and visibility returns');
 await page.clock.uninstall?.();
 const dates=await page.evaluate(()=>{const s=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');const today=new Date(),future=new Date();future.setDate(today.getDate()+3);return {today:s(today),future:s(future)}});
 const goals=await page.evaluate(({today,future})=>{state.learningGoals=[];state.smartPlannerPlan=null;state.satPlannerPlan=null;const api=StudyAIPlanning,e=STUDY_DATA[0];return {bad:api.addGoal({title:'Bad',date:'2026-02-31'}),sat:api.addGoal({title:'SAT goal',date:future,pathway:'SAT',type:'exam'}),topic:api.addGoal({title:'<img src=x onerror=alert(1)>',date:today,pathway:e.board,type:'topic',topicId:e.id})}},dates);
 check(!!goals.bad.error&&!!goals.sat.goal&&!!goals.topic.goal,'goal dates validate and valid exam/topic goals save');
 check(await page.locator('#learning-goal-list img').count()===0,'goal text is escaped');
 check(await page.evaluate(()=>StudyAIPlanning.nextExam('SAT').title==='SAT goal'&&smartReviewCandidates().items.some(x=>x.type==='goal')),'deadlines feed review queue and next exam');
 const plans=await page.evaluate(()=>{const school=StudyAISchoolPlanner.build({board:'CBSE',minutes:60});StudyAIPracticeBridge.savePlanner(school);StudyAISchoolPlanner.render(school);const sat=StudyAISatPlanner.build({minutes:60,section:'both'});StudyAIPracticeBridge.saveSatPlan(sat);StudyAISatPlanner.render(sat);return {school,sat}});
 check(plans.school.days.every((day,i)=>day.items.reduce((n,t)=>n+t.minutes,0)+plans.sat.days[i].items.reduce((n,t)=>n+t.minutes,0)<=60),'SAT and school respect combined daily budget');
 check(plans.school.days[0].items[0].kind==='goal','topic deadline gets a revision slot before new topics');
 const masteryBefore=await page.evaluate(()=>JSON.stringify(state.mastery));
 await page.evaluate(()=>location.hash='#planner');await page.waitForSelector('#planner:not([hidden])');
 await page.locator('[data-school-check]').first().click();
 check(await page.evaluate(()=>Object.values(state.smartPlannerPlan.completed).filter(Boolean).length===1),'school completion is stored');
 check(await page.evaluate(()=>JSON.stringify(state.mastery))===masteryBefore,'planner completion never awards mastery');
 await page.reload();await page.waitForSelector('#learning-goals');
 check(await page.locator('[data-school-check][aria-pressed="true"]').count()===1,'school completion survives restart');
 await page.evaluate(()=>location.hash='#practice-studio');
 await page.evaluate(async()=>{await StudyAIPerformance.loadFeature('practice')});
 await page.waitForFunction(()=>!!window.StudyAIPracticeStudio);
 await page.evaluate(()=>{StudyAIPracticeStudio.configure({mode:'custom',section:'Math',domain:'Algebra',skill:'Linear equations in one variable',level:'Advanced',time:10});StudyAIPracticeStudio.configure({mode:'diagnostic',section:'all'})});
 check(await page.evaluate(()=>['ps-domain','ps-skill','ps-level'].every(id=>document.getElementById(id).value==='all')&&document.getElementById('ps-time').value==='0'),'new diagnostic clears stale skill, level and timer filters');
 await page.locator('#ps-start').click();
 const before=await page.evaluate(()=>state.masteryHistory.length);
 await page.locator('[data-ps-choice]').first().click();
 check(await page.evaluate(()=>state.masteryHistory.at(-1).source)==='diagnostic','diagnostic evidence preserves provenance');
 await page.locator('#ps-next').click();await page.locator('#ps-skip').click();
 check(await page.evaluate(()=>state.masteryHistory.length)===before+1,'skipping does not produce mastery evidence');
 // Defensive mock ingestion, including valid numerical zero.
 check(await page.evaluate(()=>{const count=state.masteryHistory.length,q=SAT_QUESTIONS[0];captureMockResults([{question:q,chosen:null},{question:{...q,pretest:true},chosen:0},{question:{...q,id:'numeric-test',format:'spr',correctAnswer:'0',acceptedAnswers:['0']},chosen:'0',correct:true}]);return state.masteryHistory.length===count+1}),'mock ignores blanks/pretests and accepts numeric zero');
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  await page.evaluate(()=>setTheme('dark'));
  await page.locator('#learning-goals').scrollIntoViewIfNeeded();
  check(await page.evaluate(()=>{const r=document.querySelector('#learning-goals').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1}),width+'px goals fit viewport in dark mode');
 }
 // Fresh context for real account sync, Personal AI wiring with a deterministic API fixture,
 // and wall-clock deadline checks. No Gemini request or credential is used.
 const account=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 const ap=await account.newPage();ap.on('pageerror',e=>errors.push(e.message));
 const auth=await account.request.post(url+'/api/auth/register',{headers:{Origin:url},data:{email:'integration@example.test',password:'local-test-only-42',name:'Integration'}});
 const authBody=await auth.text();check(auth.ok(),'temporary Flask email/password account works · HTTP '+auth.status()+' · '+authBody.slice(0,240)+' · server '+serverErrors.slice(-1800));
 await ap.route('**/api/personal-ai/status',r=>r.fulfill({json:{ok:true,configured:true}}));
 await ap.route('**/api/personal-ai/generate',r=>r.fulfill({json:{ok:true,flashcards:{cards:[{front:'Fixture question',back:'Fixture answer'}]},sources:[]}}));
 await ap.goto(url+'#tutor');await ap.evaluate(async()=>{await StudyAIPerformance.loadFeature('personalAI')});
 await ap.waitForSelector('#pai-provider-status');await ap.waitForTimeout(600);
 if(await ap.locator('#studyai-onboarding[open]').count())await ap.locator('[data-onboarding-skip]').click();
 await dismissFirstRunTour(ap);
 await ap.waitForFunction(()=>document.querySelector('#pai-provider-status').textContent.includes('ready'));
 await ap.locator('[data-pai-topic-mode="flashcards"]').click();
 await ap.locator('#pai-load-generated-cards').click();
 const aiId=await ap.evaluate(()=>activeDeck[0].id);
 await ap.locator('#flashcard').click();await ap.locator('[data-srs-rating="again"]').click();
 await ap.locator('#pai-load-generated-cards').click();
 check(await ap.evaluate(id=>activeDeck[0].id===id&&state.flashcardSchedule[id].reviews===1,aiId),'loading the same AI deck preserves schedule identity');
 await ap.evaluate(async()=>{await saveCloudState()});
 let release,heldResolve;
 const held=new Promise(r=>heldResolve=r),gate=new Promise(r=>release=r);let writes=0;
 await ap.route('**/api/state',async r=>{if(r.request().method()==='PUT'){writes++;if(writes===1){heldResolve();await gate}}await r.continue()});
 await ap.evaluate(()=>{state.syncTest='first';window.__savePromise=saveCloudState()});
 await held;
 await ap.evaluate(()=>{state.syncTest='second';save()});
 release();
 await ap.waitForFunction(()=>!cloudSyncing&&!cloudSaveTimer,{},{timeout:8000});
 const persisted=await (await account.request.get(url+'/api/state')).json();
 check(writes===2&&persisted.state.syncTest==='second','edits made during upload trigger a second cloud save');
 check(!!persisted.state.reviewCardCatalog[aiId],'Personal AI review catalog round-trips through Flask state API');
 await ap.reload();await ap.waitForSelector('#learning-goals');
 check(await ap.evaluate(id=>!!state.flashcardSchedule[id],aiId),'signed-in reload retains rated AI card');
 await ap.clock.install();
 await ap.evaluate(async()=>{await StudyAIPerformance.loadFeature('practice')});
 await ap.evaluate(()=>StudyAIPracticeStudio.configure({mode:'custom',section:'Math',count:5,time:1}));
 await ap.locator('#ps-start').click();
 await ap.clock.fastForward(61000);
 check((await ap.locator('#ps-runner').textContent()).includes('Time expired')&&(await ap.locator('#ps-runner').textContent()).includes('5 unanswered'),'elapsed-time deadline ends test and reports unanswered questions');
 const noOverload=await ap.evaluate(()=>{state.smartPlannerPlan=null;state.satPlannerPlan=null;state.learningGoals=[];const p=StudyAISchoolPlanner.build({board:'CBSE',minutes:15});return p.days[0].items.length>0&&p.days.every(d=>d.items.reduce((n,t)=>n+t.minutes,0)<=15)});
 check(noOverload,'15-minute school plans contain usable sessions');
 await ap.evaluate(()=>{const api=StudyAIPlanning;for(let i=0;i<40;i++)api.addGoal({title:'Goal '+i,date:'2099-01-01',pathway:'SAT',type:'exam'});window.__capResult=api.addGoal({title:'Overflow',date:'2099-01-01',pathway:'SAT'})});
 check(await ap.evaluate(()=>state.learningGoals.length===40&&!!window.__capResult.error),'goal storage cap is enforced');
 const report=await account.request.post(url+'/api/question-reports',{headers:{Origin:url},data:{source:'test',category:'format',question_text:'Fixture question for quality reporting',details:'Integration test'}});
 check(report.ok(),'question quality report API accepts a bounded report');
 const health=await account.request.get(url+'/api/health');
 check(health.ok()&&(await health.json()).database==='ready','deployment health endpoint checks the database');
 const exported=await account.request.get(url+'/api/account/export');
 const exportedJson=await exported.json();
 check(exported.ok()&&exportedJson.user.email==='integration@example.test'&&exportedJson.state,'account export returns user data without requiring direct database access');
 await ap.evaluate(()=>{state.learningGoals=[];save()});
 for(const theme of ['light','dark']){
  await ap.setViewportSize({width:390,height:844});await ap.evaluate(theme=>setTheme(theme),theme);
  await ap.locator('#learning-goals').scrollIntoViewIfNeeded();
  if(process.env.TEST_SCREENSHOTS)await ap.screenshot({path:path.join(process.env.TEST_SCREENSHOTS,'studyai-goals-'+theme+'.png')});
  check(await ap.evaluate(()=>{const el=document.querySelector('#learning-goals');return el.scrollWidth<=el.clientWidth+1}),'goal controls have no internal overflow in '+theme+' mode');
 }
 const deleted=await account.request.delete(url+'/api/account',{headers:{Origin:url},data:{confirm:'DELETE'}});
 check(deleted.ok(),'account deletion removes the temporary integration account');
 await account.close();

 // Regression: legacy cloud state with missing newer fields must settle after at most one restore.
 // Startup enhancements may update local state before auth finishes, so hydration compares against
 // the state that existed at page boot rather than those in-flight startup mutations.
 const loop=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 const loopAuth=await loop.request.post(url+'/api/auth/register',{headers:{Origin:url},data:{email:'hydration-loop@example.test',password:'local-test-only-42',name:'Hydration Loop'}});
 check(loopAuth.ok(),'hydration-loop fixture account registers');
 const legacyPut=await loop.request.put(url+'/api/state',{headers:{Origin:url},data:{state:{theme:'dark'}}});
 check(legacyPut.ok(),'legacy cloud state fixture saves');
 const lp=await loop.newPage();lp.on('pageerror',e=>errors.push(e.message));
 let navigations=0;lp.on('framenavigated',frame=>{if(frame===lp.mainFrame())navigations++});
 await lp.goto(url);
 await lp.waitForFunction(()=>document.documentElement.dataset.theme==='dark',{},{timeout:8000});
 await lp.waitForTimeout(1800);
 check(navigations<=2,'legacy cloud hydration settles without a reload loop');
 await lp.waitForFunction(()=>!cloudSyncing&&!cloudSaveTimer,{},{timeout:8000});
 const hydratedSaved=await (await loop.request.get(url+'/api/state')).json();
 check(Number(hydratedSaved.state?.betaMetrics?.firstSeen)>0&&Array.isArray(hydratedSaved.state?.betaMetrics?.activeDays)&&hydratedSaved.state.betaMetrics.activeDays.length>0,'post-hydration app-open metrics persist after startup stabilizes');
 const loopDeleted=await loop.request.delete(url+'/api/account',{headers:{Origin:url},data:{confirm:'DELETE'}});
 check(loopDeleted.ok(),'hydration-loop fixture account is deleted');
 await loop.close();
 check(errors.length===0,'no browser JavaScript errors: '+errors.join('; '));
 console.log('TOTAL',checks,'checks passed');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.kill();rmSync(dir,{recursive:true,force:true})});
