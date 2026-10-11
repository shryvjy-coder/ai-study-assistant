/* Reviewer-only NCERT coverage monitor. All content comes from the protected API. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const safe = value => String(value ?? '').replace(/[&<>"']/g, ch =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const labels = {
    evidence_unavailable: 'Evidence unavailable',
    scheduled: 'Scheduled, not started',
    report_unavailable_during_batch: 'Report not yet available',
    report_unavailable_after_batch: 'Automated batch finished, report missing',
    awaiting_human_review: 'Model-reviewed, needs human approval',
    paused: 'Paused',
    blocked: 'Blocked by validation',
    needs_attention: 'Needs attention',
    stopped: 'Batch stopped'
  };
  let snapshot = null;
  let selected = null;
  function knownLink(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' &&
        (parsed.hostname === 'github.com' || parsed.hostname === 'ncert.nic.in')
          ? parsed.href : null;
    } catch (_) { return null; }
  }
  function anchor(url, title) {
    const allowed = knownLink(url);
    return allowed ? '<a href="'+safe(allowed)+'" target="_blank" rel="noopener noreferrer">'+safe(title)+' ↗</a>' : '';
  }
  function number(value) { return Number.isInteger(value) && value >= 0 ? value : 'Unavailable'; }
  function metric(name, value) {
    return '<div><strong>'+safe(number(value))+'</strong><span>'+safe(name)+'</span></div>';
  }
  function renderDetail(chapter) {
    if (!chapter) return;
    selected = chapter.number;
    const status = labels[chapter.status] || 'Unknown state';
    const cls = chapter.status === 'awaiting_human_review' ? ' review' : '';
    const numbers = chapter.metrics;
    const stats = numbers ?
      '<div class="detail-stats">'+[
        metric('Textbook concepts inventoried', numbers.concepts),
        metric('Confirmed coverage gaps', numbers.confirmed_gaps),
        metric('Maths-reviewed lesson proposals', numbers.maths_reviewed_candidates),
        metric('Unresolved final decisions', numbers.unresolved_decisions)
      ].join('')+'</div>' :
      '<p>Detailed metrics are unavailable. No audit results have been inferred.</p>';
    const issues = (chapter.issues || []).length ?
      '<ul>'+chapter.issues.map(x => '<li>'+safe(x)+'</li>').join('')+'</ul>' :
      '<p>No issue evidence is loaded for this chapter. This does not establish that there are no issues.</p>';
    const proposals = (chapter.proposals || []).length ?
      '<ul>'+chapter.proposals.map(p => '<li><strong>'+safe(p.title)+'</strong>'+
        (p.section?' in '+safe(p.section):'')+'</li>').join('')+'</ul>' :
      '<p>No candidate lessons are present in the currently loaded report.</p>';
    const math = (chapter.math_review || []).length ?
      '<ul>'+chapter.math_review.map(d=>'<li>'+safe(d.verdict)+': '+safe(d.reason)+'</li>').join('')+'</ul>':
      '<p>Individual mathematics-review decisions are not included in the loaded report.</p>';
    const coverage = (chapter.coverage || []).length ?
      '<div class="coverage-wrap"><table class="coverage-table"><thead><tr>'+
        '<th>Textbook concept</th><th>Page</th><th>Inventory</th><th>Final verdict</th>'+
        '</tr></thead><tbody>'+chapter.coverage.map(c=>'<tr><td>'+safe(c.concept)+'</td>'+
          '<td>'+safe(c.page??'—')+'</td><td>'+safe(c.inventory||'—')+'</td>'+
          '<td>'+safe(c.final||'Not reported')+'</td></tr>').join('')+'</tbody></table></div>' :
      '<p>Concept-by-concept evidence has not been loaded.</p>';
    $('#audit-detail').innerHTML =
      '<h2 id="audit-detail-heading">Chapter '+chapter.number+': '+safe(chapter.title)+'</h2>'+
      '<div class="detail-meta"><span class="status-chip'+cls+'">'+safe(status)+'</span>'+
      '<span class="status-chip">Human approval: not recorded</span></div>'+
      stats+
      '<div class="audit-links">'+anchor(chapter.textbook_url,'Official NCERT textbook')+
        (snapshot.last_run_url ? anchor(snapshot.last_run_url,'Latest batch run'):'')+
        (snapshot.draft_pr_url ? anchor(snapshot.draft_pr_url,'Draft review PR'):'')+'</div>'+
      '<section class="detail-section"><h3>Coverage inventory</h3>'+coverage+'</section>'+
      '<section class="detail-section"><h3>Outstanding flags and concerns</h3>'+issues+'</section>'+
      '<section class="detail-section"><h3>Proposed improvements</h3>'+proposals+'</section>'+
      '<section class="detail-section"><h3>Mathematical review</h3>'+math+'</section>'+
      '<section class="detail-section"><h3>Human review requirements</h3>'+
      '<p>Compare claims with the official textbook, inspect worked calculations, then review any draft PR. '+
      'This page is read-only. Approval, merges and publication are not performed here.</p></section>';
    document.querySelectorAll('[data-audit-chapter]').forEach(button=>{
      button.setAttribute('aria-current',String(Number(button.dataset.auditChapter)===chapter.number));
    });
  }
  function render() {
    const chapters = snapshot.chapters || [];
    $('#audit-total').textContent = String(chapters.length);
    $('#audit-reports').textContent = String(snapshot.automated_reports_loaded);
    $('#audit-approved').textContent = String(snapshot.human_approvals_recorded);
    $('#audit-controller').textContent = snapshot.controller?.status || 'Unavailable';
    $('#chapter-count').textContent = chapters.length+' chapters';
    $('#audit-chapters').innerHTML = chapters.map(c=>
      '<button type="button" class="chapter-choice" data-audit-chapter="'+c.number+'" aria-current="false">'+
      '<span class="chapter-number">'+String(c.number).padStart(2,'0')+'</span>'+
      '<span class="chapter-title">'+safe(c.title)+'<span class="chapter-state">'+
      safe(labels[c.status]||'Unknown state')+'</span></span></button>'
    ).join('');
    document.querySelectorAll('[data-audit-chapter]').forEach(button=>{
      button.addEventListener('click',()=>{
        const chapter=chapters.find(c=>c.number===Number(button.dataset.auditChapter));
        if(chapter)renderDetail(chapter);
      });
    });
    const warnings = [snapshot.controller_error,snapshot.report_error].filter(Boolean);
    const message=$('#audit-message');
    message.textContent=warnings.length ? warnings.join(' · ') :
      'Latest available source data loaded. Model-reviewed material still requires human approval.';
    message.classList.toggle('issue',Boolean(warnings.length));
    $('#source-description').textContent = 'Controller: '+(snapshot.controller ? 'Live state loaded' : 'unavailable')+
      '. Coverage data: '+(snapshot.report_loaded_at ?
        'server-side artifact modified '+snapshot.report_loaded_at :
        'no validated report loaded')+'. Fetched at '+snapshot.generated_at+'.';
    $('#audit-links').innerHTML=[
      anchor(snapshot.last_run_url,'Latest GitHub Actions run'),
      anchor(snapshot.draft_pr_url,'Draft review PR')
    ].filter(Boolean).join('');
    renderDetail(chapters.find(c=>c.number===selected)||chapters[0]);
  }
  async function refresh() {
    const button=$('#audit-refresh');
    button.disabled=true;
    $('#audit-message').textContent='Checking the audit sources…';
    try {
      const response=await fetch('/api/internal/ncert-audit',{credentials:'same-origin',cache:'no-store'});
      if(!response.ok)throw new Error(response.status===403?'Reviewer access required':
        response.status===401?'Sign in required':'Audit service returned '+response.status);
      const data=await response.json();
      if(!data.ok||!Array.isArray(data.chapters))throw new Error('Malformed audit response');
      snapshot=data;
      render();
    } catch (error) {
      const message=$('#audit-message');
      message.textContent='Could not load audit data: '+error.message;
      message.classList.add('issue');
    } finally {button.disabled=false;}
  }
  $('#audit-refresh')?.addEventListener('click',refresh);
  refresh();
})();
