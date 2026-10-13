/* Original, accessible diagrams and independent self-checks for NCERT
 * Exploration Grade 9 Science Chapter 2. Scoped to exactly this chapter.
 * Wrapper composes with Chapter 1; never changes IDs, completion state or storage.
 */
(() => {
  'use strict';
  if(typeof renderReaderContent!=='function')return;
  const previousRender=renderReaderContent;
  const svgNS='http://www.w3.org/2000/svg';
  const diagrams={
    'osmosis-plant': `<figure class="studyai-concept-figure science-ch02-figure" data-science-visual="osmosis-plant">
      <svg viewBox="0 0 720 270" xmlns="${svgNS}" role="img" aria-labelledby="science-ch02-osmosis-title science-ch02-osmosis-desc">
        <title id="science-ch02-osmosis-title">How osmosis affects a walled plant cell</title>
        <desc id="science-ch02-osmosis-desc">In dilute surroundings a plant cell gains water and the membrane presses against the cell wall. In concentrated surroundings it loses water and the membrane pulls away from the cell wall, which is plasmolysis.</desc>
        <g font-family="system-ui, sans-serif" text-anchor="middle" fill="currentColor">
          <text x="180" y="25" font-weight="700" font-size="17">Dilute surroundings</text>
          <text x="540" y="25" font-weight="700" font-size="17">Concentrated surroundings</text>
          <rect x="82" y="45" width="195" height="153" rx="16" fill="#eff4df" stroke="#729246" stroke-width="7"/>
          <rect x="91" y="54" width="177" height="135" rx="13" fill="#c7e5e1" stroke="#397a7a" stroke-width="3"/>
          <rect x="132" y="78" width="96" height="89" rx="14" fill="#9bd6e1" stroke="#669fb9"/>
          <rect x="442" y="45" width="195" height="153" rx="16" fill="#eff4df" stroke="#729246" stroke-width="7"/>
          <rect x="474" y="74" width="132" height="97" rx="16" fill="#c7e5e1" stroke="#397a7a" stroke-width="3"/>
          <rect x="501" y="93" width="78" height="58" rx="14" fill="#9bd6e1" stroke="#669fb9"/>
          <g stroke="#1e7a9b" stroke-width="3" fill="none">
            <path d="M40 112 H73 m-8-8 8 8 -8 8" />
            <path d="M680 113 H648 m8-8 -8 8 8 8" />
          </g>
          <text x="180" y="223" font-size="14">Turgid: water enters</text>
          <text x="540" y="223" font-size="14">Plasmolysed: water leaves</text>
          <text x="360" y="255" font-size="12">Green border = rigid cell wall; teal outline = cell membrane</text>
        </g>
      </svg>
      <figcaption>In a dilute environment the plant cell becomes turgid. In a concentrated solution water leaves; the living membrane pulls away from the stable cell wall (plasmolysis). The arrows indicate net water movement.</figcaption>
    </figure>`,
    'protein-path': `<figure class="studyai-concept-figure science-ch02-figure" data-science-visual="protein-path">
      <svg viewBox="0 0 740 200" xmlns="${svgNS}" role="img" aria-labelledby="science-ch02-protein-title science-ch02-protein-desc">
        <title id="science-ch02-protein-title">Protein synthesis and secretion pathway</title>
        <desc id="science-ch02-protein-desc">Nuclear DNA is transcribed to RNA; ribosomes on rough ER make the protein; vesicles move material from ER to Golgi, then to the cell membrane for secretion or delivery.</desc>
        <g font-family="system-ui,sans-serif" font-size="14" font-weight="650" text-anchor="middle">
          <rect x="10" y="55" width="122" height="64" rx="11" fill="#e1eee9" stroke="#4c9181" />
          <rect x="161" y="55" width="122" height="64" rx="11" fill="#e1eee9" stroke="#4c9181" />
          <rect x="312" y="55" width="122" height="64" rx="11" fill="#e1eee9" stroke="#4c9181" />
          <rect x="463" y="55" width="122" height="64" rx="11" fill="#e1eee9" stroke="#4c9181" />
          <rect x="614" y="55" width="115" height="64" rx="11" fill="#dfe6f5" stroke="#748cbd" />
          <text x="71" y="79" fill="#164e44"><tspan x="71">Nucleus</tspan><tspan x="71" dy="19">instructions</tspan></text>
          <text x="222" y="79" fill="#164e44"><tspan x="222">RER</tspan><tspan x="222" dy="19">ribosomes</tspan></text>
          <text x="373" y="79" fill="#164e44"><tspan x="373">Transport</tspan><tspan x="373" dy="19">vesicle</tspan></text>
          <text x="524" y="79" fill="#164e44"><tspan x="524">Golgi</tspan><tspan x="524" dy="19">processing</tspan></text>
          <text x="671" y="79" fill="#243d6c"><tspan x="671">Membrane</tspan><tspan x="671" dy="19">or outside</tspan></text>
        </g>
        <g stroke="#456b64" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M132 86h29m-9-6 9 6 -9 6 M283 86h29m-9-6 9 6 -9 6 M434 86h29m-9-6 9 6 -9 6 M585 86h29m-9-6 9 6 -9 6"/>
        </g>
        <g fill="currentColor" font-family="system-ui,sans-serif" text-anchor="middle">
          <text x="370" y="155" font-size="13">A simplified pathway for a secreted or membrane protein</text>
          <text x="370" y="174" font-size="12">Smooth ER specialises in lipid synthesis; not all proteins follow this pathway</text>
        </g>
      </svg>
      <figcaption>Ribosomes associated with rough ER build many proteins destined for membranes or secretion. The Golgi sorts them, and vesicles deliver them. This is a simplified route, not the fate of every protein.</figcaption>
    </figure>`,
    'division': `<figure class="studyai-concept-figure science-ch02-figure" data-science-visual="division">
      <svg viewBox="0 0 720 250" xmlns="${svgNS}" role="img" aria-labelledby="science-ch02-division-title science-ch02-division-desc">
        <title id="science-ch02-division-title">Comparing mitosis and meiosis outcomes</title>
        <desc id="science-ch02-division-desc">Mitosis normally produces two daughter cells with the starting chromosome number. Meiosis reduces chromosome number by half and may give four haploid products; not all products develop into functional gametes in every organism.</desc>
        <g font-family="system-ui,sans-serif" text-anchor="middle">
          <text x="180" y="25" font-size="19" font-weight="700" fill="currentColor">Mitosis</text>
          <text x="540" y="25" font-size="19" font-weight="700" fill="currentColor">Meiosis</text>
          <circle cx="180" cy="65" r="23" fill="#c4e0d6" stroke="#397c69" stroke-width="3"/>
          <circle cx="540" cy="65" r="23" fill="#c4e0d6" stroke="#397c69" stroke-width="3"/>
          <text x="180" y="71" font-size="14" fill="#123e34">2n</text>
          <text x="540" y="71" font-size="14" fill="#123e34">2n</text>
          <g stroke="#537c71" stroke-width="2.5" fill="none">
            <path d="M180 90 V115 M180 115 L115 148 M180 115 L245 148 M540 90 V117 M540 117 L460 148 M540 117 L620 148"/>
          </g>
          <circle cx="115" cy="167" r="23" fill="#c4e0d6" stroke="#397c69" stroke-width="2"/>
          <circle cx="245" cy="167" r="23" fill="#c4e0d6" stroke="#397c69" stroke-width="2"/>
          <g font-size="14" fill="#123e34"><text x="115" y="172">2n</text><text x="245" y="172">2n</text></g>
          <g stroke="#537c71" stroke-width="2" fill="none">
            <path d="M460 146 L430 172 M460 146 L490 172 M620 146 L590 172 M620 146 L650 172"/>
          </g>
          <g fill="#dce4f4" stroke="#687fa6" stroke-width="2">
            <circle cx="430" cy="182" r="19"/><circle cx="490" cy="182" r="19"/><circle cx="590" cy="182" r="19"/><circle cx="650" cy="182" r="19"/>
          </g>
          <g font-size="13" fill="#243d6c"><text x="430" y="187">n</text><text x="490" y="187">n</text><text x="590" y="187">n</text><text x="650" y="187">n</text></g>
          <text x="180" y="224" font-size="14" fill="currentColor">2 cells; chromosome count preserved</text>
          <text x="540" y="224" font-size="14" fill="currentColor">4 haploid products in basic model</text>
        </g>
      </svg>
      <figcaption>In a simplified model mitosis preserves chromosome number (2n → two 2n cells); meiosis halves it (2n → haploid n products). The products do not all become functional gametes in every organism.</figcaption>
    </figure>`
  };
  function enhance(entry){
    if(entry?.board!=='CBSE'||entry?.grade!=='Class 9'||
       entry?.subject!=='Science'||entry?.title!=='Cell: The Building Block of Life')return;
    const chapter=window.CBSE_CLASS9_SCIENCE_FULL_NOTES?.[entry.title];
    const container=document.querySelector('#detailed-notes .science-full-notes');
    if(!chapter||!container)return;
    const sections=[...container.querySelectorAll(':scope > .actual-note-topic')];
    sections.forEach((section,i)=>{
      const content=chapter.sections?.[i];
      if(!content)return;
      if(content.visual&&diagrams[content.visual]&&!section.querySelector('.science-ch02-figure')){
        const temp=document.createElement('div');
        temp.innerHTML=diagrams[content.visual];
        const before=section.querySelector(':scope > .worked-box, :scope > .exam-box');
        section.insertBefore(temp.firstElementChild,before);
      }
      if(!Array.isArray(content.checkQuestions)||!content.checkQuestions.length)return;
      const practice=document.createElement('section');
      practice.className='science-ch01-self-check science-ch02-self-check';
      practice.setAttribute('aria-label','Independent practice questions');
      const heading=document.createElement('h4');
      heading.textContent='Try it yourself';
      practice.append(heading);
      content.checkQuestions.forEach(({question,answer})=>{
        if(!question||!answer)return;
        const item=document.createElement('div');
        item.className='science-ch01-question science-ch02-question';
        const prompt=document.createElement('p');
        prompt.className='science-ch01-question-text';
        prompt.textContent=question;
        const details=document.createElement('details');
        const summary=document.createElement('summary');
        summary.textContent='Check your answer';
        const response=document.createElement('p');
        response.textContent=answer;
        details.append(summary,response);
        item.append(prompt,details);
        practice.append(item);
      });
      const tip=section.querySelector(':scope > .exam-box');
      section.insertBefore(practice,tip);
    });
  }
  renderReaderContent=function(entry){
    const result=previousRender.apply(this,arguments);
    enhance(entry);
    return result;
  };
})();