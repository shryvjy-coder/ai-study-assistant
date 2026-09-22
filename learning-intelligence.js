/* StudyAI Learning Intelligence: hints, prerequisite remediation, and embedded grounded tutoring. */
(() => {
  'use strict';

  const bridge = window.StudyAIPracticeBridge;
  if (!bridge) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  const SAT_PREREQUISITES = {
    'Math|Linear Functions': ['Linear Equations in One Variable'],
    'Math|Linear Equations in Two Variables': ['Linear Equations in One Variable'],
    'Math|Systems of Two Linear Equations': ['Linear Equations in Two Variables','Linear Equations in One Variable'],
    'Math|Linear Inequalities': ['Linear Equations in One Variable'],
    'Math|Equivalent Expressions': ['Linear Equations in One Variable'],
    'Math|Nonlinear Equations in One Variable': ['Equivalent Expressions','Linear Equations in One Variable'],
    'Math|Systems of Linear and Nonlinear Equations': ['Systems of Two Linear Equations','Nonlinear Equations in One Variable'],
    'Math|Nonlinear Functions': ['Linear Functions','Equivalent Expressions'],
    'Math|Percentages': ['Ratios, Rates and Proportions'],
    'Math|Probability and Conditional Probability': ['Ratios, Rates and Proportions'],
    'Math|Inference from Sample Statistics': ['One-variable Data','Two-variable Data'],
    'Math|Right Triangles and Trigonometry': ['Lines, Angles and Triangles'],
    'Math|Circles': ['Lines, Angles and Triangles'],
    'Reading & Writing|Command of Evidence: Textual': ['Central Ideas and Details','Inferences'],
    'Reading & Writing|Command of Evidence: Quantitative': ['Central Ideas and Details'],
    'Reading & Writing|Inferences': ['Central Ideas and Details'],
    'Reading & Writing|Cross-Text Connections': ['Central Ideas and Details','Inferences'],
    'Reading & Writing|Rhetorical Synthesis': ['Central Ideas and Details'],
    'Reading & Writing|Transitions': ['Text Structure and Purpose'],
    'Reading & Writing|Form, Structure, and Sense': ['Boundaries']
  };

  const STRATEGIES = {
    'Central Ideas and Details': [
      'State the passage\'s main point in your own words before reading the choices.',
      'Prefer the choice that captures the whole passage, not one isolated detail.'
    ],
    'Inferences': [
      'Use only what the text supports. Avoid choices that add a stronger claim than the evidence allows.',
      'Point to the exact sentence or detail that would justify your choice.'
    ],
    'Command of Evidence: Textual': [
      'Identify the claim first, then find the option that most directly supports it.',
      'The best evidence should prove the claim rather than merely discuss the same topic.'
    ],
    'Command of Evidence: Quantitative': [
      'Read the variables, units, and direction of change before comparing choices.',
      'Match the claim to the specific numerical relationship shown.'
    ],
    'Words in Context': [
      'Replace the tested word with each option and keep the sentence meaning and tone intact.',
      'Use nearby contrast or comparison words as clues.'
    ],
    'Text Structure and Purpose': [
      'Ask what job the sentence or paragraph performs in the passage.',
      'Separate what the sentence says from why the author included it.'
    ],
    'Cross-Text Connections': [
      'Write one short claim for each text, then compare those claims.',
      'Look for agreement, disagreement, qualification, or a different emphasis.'
    ],
    'Rhetorical Synthesis': [
      'Identify the student\'s exact writing goal before using the notes.',
      'Choose only the details that directly serve that goal.'
    ],
    'Transitions': [
      'Name the relationship first, such as contrast, cause, example, continuation, or conclusion.',
      'Then choose the transition that expresses that relationship.'
    ],
    'Boundaries': [
      'Mark the independent clauses before choosing punctuation.',
      'Check whether the punctuation can legally join the clauses you found.'
    ],
    'Form, Structure, and Sense': [
      'Check subject-verb agreement, verb tense, pronouns, modifiers, and sentence logic.',
      'Read the complete sentence after inserting each option.'
    ],
    'Linear Equations in One Variable': [
      'Undo operations in reverse order while keeping both sides balanced.',
      'Substitute your result back into the original equation to verify it.'
    ],
    'Linear Functions': [
      'Identify the rate of change and starting value before calculating.',
      'Connect coefficients to what they mean in the situation.'
    ],
    'Linear Equations in Two Variables': [
      'Treat ordered pairs as values that must satisfy the equation together.',
      'Substitute known values carefully and keep x and y roles distinct.'
    ],
    'Systems of Two Linear Equations': [
      'Look for elimination or substitution based on which variable is easiest to remove.',
      'Your final pair must satisfy both equations.'
    ],
    'Linear Inequalities': [
      'Solve like an equation, but reverse the inequality when multiplying or dividing by a negative.',
      'Check a simple test value from your proposed solution region.'
    ],
    'Equivalent Expressions': [
      'Factor, expand, or combine like terms without changing the expression\'s value.',
      'Look for common factors and standard identities before doing long algebra.'
    ],
    'Nonlinear Equations in One Variable': [
      'Move everything to one side, then look for factoring or another structure.',
      'Check all candidate solutions in the original equation.'
    ],
    'Systems of Linear and Nonlinear Equations': [
      'Use the linear equation to substitute into the nonlinear equation when possible.',
      'Intersection points must satisfy both relationships.'
    ],
    'Nonlinear Functions': [
      'Substitute the input carefully and follow order of operations.',
      'Track how powers or other nonlinear terms change the output.'
    ],
    'Ratios, Rates and Proportions': [
      'Keep units consistent and write the relationship as equivalent ratios.',
      'Check whether the answer scale makes sense before choosing it.'
    ],
    'Percentages': [
      'Use change divided by original value for percent change.',
      'Keep the original quantity distinct from the new quantity.'
    ],
    'One-variable Data': [
      'Order the data before finding median or quartiles.',
      'Match the requested statistic to its definition instead of averaging automatically.'
    ],
    'Two-variable Data': [
      'Focus on direction, form, and strength of association.',
      'Association does not by itself establish causation.'
    ],
    'Probability and Conditional Probability': [
      'Count favorable outcomes and the correct sample space.',
      'For conditional probability, restrict the sample space to the stated condition first.'
    ],
    'Inference from Sample Statistics': [
      'Separate what the sample shows from what can reasonably be generalized to the population.',
      'Random sampling reduces selection bias, but it does not remove uncertainty.'
    ],
    'Area and Volume': [
      'Write the correct formula before substituting numbers.',
      'Check whether the requested answer needs square units or cubic units.'
    ],
    'Lines, Angles and Triangles': [
      'Use angle sums and known geometric relationships before calculating.',
      'Label the diagram or quantities so you do not mix corresponding angles.'
    ],
    'Right Triangles and Trigonometry': [
      'Identify opposite, adjacent, and hypotenuse relative to the given angle.',
      'Choose sine, cosine, or tangent from the sides you know and need.'
    ],
    'Circles': [
      'Compare the equation with standard circle form before reading center or radius.',
      'Remember that the radius is the square root of the value on the right in standard form.'
    ]
  };

  function currentQuestion() {
    const stem = $('#ps-runner .ps-question h3')?.textContent?.trim();
    if (!stem) return null;
    return bridge.getSatQuestions().find(q => String(q.stem).trim() === stem) || null;
  }

  function masteryFor(section, domain, skill) {
    return bridge.getMastery()?.[['sat',section,domain,skill].join('|')] || null;
  }

  function prerequisiteRows(q) {
    if (!q) return [];
    const names = SAT_PREREQUISITES[[q.section,q.skill].join('|')] || [];
    const all = bridge.getSatQuestions();
    return names.map(skill => {
      const sample = all.find(item => item.section === q.section && item.skill === skill);
      if (!sample) return null;
      const record = masteryFor(sample.section,sample.domain,sample.skill);
      return {
        section: sample.section,
        domain: sample.domain,
        skill: sample.skill,
        score: Number.isFinite(record?.score) ? Math.round(record.score) : null,
        attempts: Number(record?.attempts) || 0
      };
    }).filter(Boolean).sort((a,b) => {
      if (a.attempts === 0 && b.attempts !== 0) return -1;
      if (b.attempts === 0 && a.attempts !== 0) return 1;
      return (a.score ?? 50) - (b.score ?? 50);
    });
  }

  function hintText(q, level) {
    const strategy = STRATEGIES[q?.skill] || [
      'Identify exactly what the question is asking before calculating or choosing.',
      'Eliminate choices that conflict with the information given.'
    ];
    if (level === 1) return 'Focus skill: ' + q.skill + '. First identify the evidence, relationship, or rule this skill is testing.';
    if (level === 2) return strategy[0];
    return strategy[1] || 'Work one step at a time and verify each step against the question.';
  }

  function installQuestionTools() {
    const question = $('#ps-runner .ps-question');
    const feedback = $('#ps-feedback');
    if (!question || !feedback) return;
    const q = currentQuestion();
    if (!q) return;

    if (!$('#ps-intelligence-tools', question)) {
      const wrap = document.createElement('div');
      wrap.id = 'ps-intelligence-tools';
      wrap.className = 'li-hint-panel';
      wrap.innerHTML = '<div class="li-hint-actions">' +
        '<span>Need a nudge?</span>' +
        '<button type="button" data-li-hint="1">Hint 1</button>' +
        '<button type="button" data-li-hint="2">Hint 2</button>' +
        '<button type="button" data-li-hint="3">Hint 3</button>' +
        '</div><p class="li-hint-text" id="li-hint-text" hidden></p>';
      feedback.insertAdjacentElement('beforebegin',wrap);
      wrap.querySelectorAll('[data-li-hint]').forEach(button => button.addEventListener('click',() => {
        const box = $('#li-hint-text',wrap);
        box.hidden = false;
        box.textContent = hintText(q,Number(button.dataset.liHint));
      }));
    }

    if (feedback.textContent.trim() && !$('#li-tutor-panel',feedback)) {
      const correct = feedback.querySelector('.ps-feedback.correct') !== null;
      const prereqs = !correct ? prerequisiteRows(q) : [];
      const foundation = prereqs[0] || null;
      const panel = document.createElement('div');
      panel.id = 'li-tutor-panel';
      panel.className = 'li-tutor-panel';
      panel.innerHTML =
        (!correct && foundation ?
          '<div class="li-foundation"><span class="small-label">Possible foundation to revisit</span>' +
          '<strong>' + safe(foundation.skill) + '</strong>' +
          '<p>' + (foundation.attempts ? 'Current evidence: ' + safe(foundation.score) + '% mastery from ' + safe(foundation.attempts) + ' attempt' + (foundation.attempts===1?'':'s') + '.' : 'You have little or no recorded practice evidence for this prerequisite yet.') + '</p>' +
          '<button type="button" class="button secondary compact" id="li-prereq-open">Practice this foundation</button></div>' : '') +
        '<div class="li-ai"><span class="small-label">Personal AI inside practice</span>' +
        '<p>Ask about this question after checking the explanation. The tutor is grounded only in this question and its StudyAI explanation.</p>' +
        '<div class="li-ai-row"><input id="li-ai-question" type="text" maxlength="500" placeholder="Why is my choice wrong? Explain the method." aria-label="Question for Personal AI">' +
        '<button type="button" class="button secondary compact" id="li-ai-ask">Ask StudyAI</button></div>' +
        '<div id="li-ai-answer" class="li-ai-answer" hidden></div></div>';
      feedback.appendChild(panel);

      if (foundation) {
        $('#li-prereq-open',panel)?.addEventListener('click',() => {
          const studio = window.StudyAIPracticeStudio;
          if (studio?.configure) studio.configure({mode:'custom',section:foundation.section,domain:foundation.domain,skill:foundation.skill,count:5,time:0});
        });
      }

      $('#li-ai-ask',panel)?.addEventListener('click',async() => {
        const input = $('#li-ai-question',panel);
        const output = $('#li-ai-answer',panel);
        const button = $('#li-ai-ask',panel);
        const question = input.value.trim();
        if (!question) {
          output.hidden = false;
          output.textContent = 'Type a question first.';
          return;
        }
        button.disabled = true;
        output.hidden = false;
        output.textContent = 'Reading this practice question...';
        const correctChoice = Number.isInteger(q.answer) ? q.options[q.answer] : '';
        const source = [
          'Section: ' + q.section,
          'Domain: ' + q.domain,
          'Skill: ' + q.skill,
          'Difficulty: ' + q.level,
          q.passage ? 'Passage: ' + q.passage : '',
          'Question: ' + q.stem,
          'Choices: ' + q.options.map((option,index) => String.fromCharCode(65+index) + '. ' + option).join(' | '),
          'Correct answer: ' + (Number.isInteger(q.answer) ? String.fromCharCode(65+q.answer) + '. ' : '') + correctChoice,
          'StudyAI explanation: ' + q.explanation
        ].filter(Boolean).join('\n');
        try {
          const response = await fetch('/api/personal-ai/generate',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              mode:'ask',
              question,
              sources:[{title:'StudyAI practice · ' + q.skill,text:source}]
            })
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok || !data.ok) throw new Error(data.error || 'Personal AI is unavailable right now.');
          output.textContent = data.text || 'No explanation was returned.';
        } catch (error) {
          output.textContent = error.message || 'Personal AI is unavailable right now.';
        } finally {
          button.disabled = false;
        }
      });
    }
  }

  const observer = new MutationObserver(() => installQuestionTools());
  function start() {
    const runner = $('#ps-runner');
    if (!runner) return;
    observer.observe(runner,{childList:true,subtree:true,characterData:true});
    installQuestionTools();
  }

  window.StudyAIIntelligence = {
    prerequisitesFor(question){ return prerequisiteRows(question); },
    hintFor(question,level=1){ return hintText(question,level); }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start);
  else start();
})();