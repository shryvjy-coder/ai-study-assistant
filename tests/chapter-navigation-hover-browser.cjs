const assert = require('node:assert/strict');
const {spawn} = require('node:child_process');
const {mkdtempSync, rmSync} = require('node:fs');
const {tmpdir} = require('node:os');
const path = require('node:path');
const {chromium} = require('playwright');

const dir = mkdtempSync(path.join(tmpdir(), 'studyai-chapter-navigation-'));
const port = process.env.TEST_CHAPTER_NAV_PORT || '5117';
const url = 'http://127.0.0.1:' + port;
const server = spawn(process.env.PYTHON || 'python', ['launcher.py'], {
  cwd: path.join(__dirname, '..'),
  env: {...process.env, PORT:port, SECRET_KEY:'chapter-navigation-ci-key', FLASK_DEBUG:'0',
    COOKIE_SECURE:'0', DATABASE_PATH:path.join(dir,'test.sqlite'), GEMINI_API_KEY:''},
  stdio:['ignore','ignore','pipe']
});
let browser, serverErrors = '';
server.stderr.on('data', chunk => {serverErrors=(serverErrors+String(chunk)).slice(-12000)});
const check = (condition, message) => {
  assert.ok(condition, message);
  console.log('PASS', message);
};

async function openCourse(page, board, grade, subject, component = 'All components') {
  const details = await page.evaluate(({board, grade, subject, component}) => {
    current.board=board;
    current.grade=grade;
    current.subject=subject;
    current.component=component;
    current.topic=null;
    current.topicId=null;
    renderFilters();
    const chapters=topicList();
    if(chapters.length<2)throw new Error('Expected multiple chapters');
    openTopic(chapters[0].title, chapters[0].id);
    location.hash='#study';
    return {
      first:{id:chapters[0].id,title:chapters[0].title},
      second:{id:chapters[1].id,title:chapters[1].title},
      last:{id:chapters[chapters.length-1].id,title:chapters[chapters.length-1].title},
      count:chapters.length
    };
  }, {board,grade,subject,component});
  await page.waitForSelector('#study:not([hidden]) #reader-view:not(.hidden)');
  return details;
}

(async () => {
  for (let i=0;i<120;i++){
    try {if ((await fetch(url+'/api/health')).ok) break;}catch{}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
  const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  await page.goto(url+'#study',{waitUntil:'load'});
  await page.waitForFunction(()=>window.STUDYAI_LONG_NOTES_STATUS && document.querySelector('#study'));
  await page.waitForTimeout(400);
  if(await page.locator('#studyai-onboarding[open]').count()) {
    await page.evaluate(()=>document.querySelector('[data-onboarding-skip]')?.click());
    await page.waitForFunction(()=>!document.querySelector('#studyai-onboarding')?.open);
  }
  if(await page.locator('#help-guided-tour:not(.hidden)').count()) {
    await page.locator('[data-tour-skip]').click();
    await page.locator('[data-tour-skip-confirm]').click();
  }

  for(const [board,grade,subject,component] of [
    ['CBSE','Class 9','Mathematics','All components'],
    ['Cambridge IGCSE','IGCSE 9–10','Mathematics','All components'],
    ['Cambridge International AS & A Level','AS Level (11)','Mathematics','Paper 1 + Paper 5 (Statistics 1)']
  ]) {
    const chapters=await openCourse(page,board,grade,subject,component);
    const label=board+' / '+grade+' / '+subject+' / '+component;
    check(await page.locator('#tab-notes > .chapter-next-nav').count()===1,label+' has a next-chapter navigation at the end of Full notes');
    const actualLabel=await page.locator('.chapter-next-nav .next-chapter-name').innerText();
    check(actualLabel===chapters.second.title,label+' next-chapter title matches the visible chapter order');
    check(await page.locator('#next-chapter-button').isEnabled(),label+' next-chapter button is enabled');
    check(await page.evaluate(()=>document.querySelector('#tab-notes').lastElementChild.id==='next-chapter-button' ||
      document.querySelector('#tab-notes').lastElementChild.classList.contains('chapter-next-nav')),
      label+' navigation follows the entire notes body');

    // Dispatch the real DOM click without Playwright's automatic long-page scroll.
    // The physical hover behavior is verified independently below.
    await page.locator('#next-chapter-button').evaluate(node=>node.click());
    check((await page.locator('#note-title').innerText())===chapters.second.title,
      label+' opens the correct second chapter');
    check(await page.evaluate(id=>state.lastTopic===id,chapters.second.id),
      label+' preserves the next chapter as last visited');
    check(await page.locator('#tab-notes > .chapter-next-nav').count()===1,
      label+' re-render does not duplicate chapter navigation');
    check(await page.locator('#tab-notes').isVisible(),
      label+' next chapter opens Full notes rather than another tab');

    // Last page has no valid next entry and should not wrap to a different course.
    await page.evaluate(id=>{
      const chapter=topicList().find(item=>item.id===id);
      openTopic(chapter.title,chapter.id);
    },chapters.last.id);
    check(await page.locator('#next-chapter-button').isDisabled(),
      label+' last chapter has a disabled end-of-course button');
    check(await page.locator('.next-chapter-name').innerText()==='You have reached the final chapter.',
      label+' last chapter clearly explains the boundary');
  }

  // Sitewide interaction: native buttons, chapter list buttons, and button-styled links.
  const cbse=await openCourse(page,'CBSE','Class 10','Mathematics');
  const css=await page.evaluate(()=>{
    const selectors=['#next-chapter-button','#complete-btn','.chapter-item','.article-tabs button','.dashboard-actions a.button','#open-command'];
    return selectors.map(selector=>{
      const node=document.querySelector(selector);
      const styles=getComputedStyle(node);
      return {selector, duration:styles.transitionDuration.split(',')[0].trim()};
    });
  });
  for (const item of css) {
    check(Math.abs(parseFloat(item.duration)-.5)<.001,
      item.selector+' has a 0.5-second hover transition');
  }
  await page.locator('#open-command').hover();
  await page.waitForTimeout(550);
  const hover=await page.locator('#open-command').evaluate(node=>{
    const styles=getComputedStyle(node);
    return {matrix:styles.transform,shadow:styles.boxShadow};
  });
  check(hover.matrix.startsWith('matrix(')&&parseFloat(hover.matrix.slice(7))<1,
    'hover shrinks the button inward rather than lifting it outward');
  check(hover.shadow.includes('inset'),'hover applies an inward shadow');
  check(errors.length===0,'no JavaScript page errors: '+errors.join('; '));
  console.log('CHAPTER NAVIGATION AND BUTTON HOVER OK');
})().catch(error=>{
  console.error(error);
  console.error(serverErrors);
  process.exitCode=1;
}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill();
  rmSync(dir,{recursive:true,force:true});
});
