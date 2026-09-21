(() => {
  'use strict';

  const FORMULA_PROMPTS = {
    '(x-a)² + (y-b)² = r²': 'What is the standard equation of a circle with centre (a, b) and radius r?',
    'mean = Σx/n': 'How do you calculate the arithmetic mean of a set of values?',
    'v = u + at': 'Which equation relates final velocity, initial velocity, acceleration and time?',
    's = ut + ½at²': 'Which constant-acceleration equation gives displacement from initial velocity, time and acceleration?',
    'v² = u² + 2as': 'Which constant-acceleration equation relates velocity and displacement without using time?',
    'F = Gm₁m₂/r²': 'What is Newton’s law of universal gravitation?',
    'g = GM/r²': 'How is gravitational field strength related to the mass of a body and distance from its centre?',
    'W = Fs cosθ': 'How do you calculate work done by a force acting at an angle θ to the displacement?',
    'K = ½mv²': 'What is the formula for translational kinetic energy?',
    'P = W/t': 'How is power related to work done and time?',
    'x = (-b ± √(b² − 4ac))/(2a)': 'What formula gives the roots of ax² + bx + c = 0?',
    'sin²θ + cos²θ = 1': 'State the fundamental Pythagorean trigonometric identity.',
    'tanθ = sinθ/cosθ': 'How can tan θ be written using sin θ and cos θ?',
    'P(A) = favourable outcomes / total outcomes': 'For equally likely outcomes, how is the probability of event A calculated?',
    'V = IR': 'State Ohm’s law relating potential difference, current and resistance.',
    'P = VI': 'How is electrical power calculated from potential difference and current?',
    'E = Pt': 'How is electrical energy related to power and time?',
    'F = BIL sinθ': 'What is the force on a current-carrying conductor of length L in a magnetic field?',
    'Q = mcΔT': 'How do you calculate thermal energy transferred when a substance changes temperature?',
    'a = -ω²x': 'What equation relates acceleration and displacement in simple harmonic motion?',
    'T = 2π/ω': 'How is the period of SHM related to angular frequency?',
    'v = fλ': 'What is the wave-speed equation?',
    'Sₙ = n(a+l)/2': 'What is the sum formula for an arithmetic progression when the first and last terms are known?',
    'Sₙ = a(1-rⁿ)/(1-r)': 'What is the sum of the first n terms of a geometric progression?',
    'C = Q/V': 'How is capacitance defined in terms of charge and potential difference?',
    'E = ½CV²': 'What is the energy stored in a capacitor?',
    'n = c/v': 'How is refractive index related to the speed of light in vacuum and in a medium?',
    '1/f = 1/v − 1/u': 'State the lens formula using focal length, image distance and object distance.',
    'Q = It': 'How is electric charge related to current and time?',
    'E°cell = E°cathode − E°anode': 'How do you calculate the standard cell potential from electrode potentials?',
    'rate = k[A]^m[B]^n': 'What is the general rate-law expression for a reaction involving A and B?',
    'area and volume formulas depend on shape and dimensions': 'What determines which area or volume formula should be used in a geometry problem?',
    'E = mc²': 'What equation relates mass and energy?',
    'N = N₀e^(-λt)': 'What equation describes exponential radioactive decay?',
    'n = m/M': 'How do you calculate amount of substance in moles from mass and molar mass?',
    'N = nNₐ': 'How do you calculate the number of particles from the amount in moles?',
    'ΔH = ΣH(products) − ΣH(reactants)': 'How is enthalpy change written as products minus reactants?',
    'surface-area-to-volume ratio affects exchange': 'Why is surface-area-to-volume ratio important for exchange in organisms?',
    'rate depends on temperature, pH and substrate concentration': 'Which three major factors commonly affect enzyme-controlled reaction rate?',
    'allele frequency and inheritance patterns require careful notation': 'Why is precise genetic notation important when analysing inheritance patterns?',
    'dy/dx measures instantaneous rate of change': 'What does dy/dx represent geometrically and as a rate of change?',
    '∫ f(x) dx gives an antiderivative': 'What does an indefinite integral of f(x) represent?',
    'Kc = product concentrations / reactant concentrations': 'What does the equilibrium constant Kc compare?',
    'pV = nRT': 'State the ideal-gas equation.'
  };

  const TOPIC_CARDS = {
    'Quadratic Equations': [
      ['What is the discriminant of ax² + bx + c = 0?', 'The discriminant is b² − 4ac.'],
      ['What does a positive discriminant tell you?', 'The quadratic has two distinct real roots.'],
      ['What does a zero discriminant tell you?', 'The quadratic has one repeated real root.'],
      ['What does a negative discriminant tell you?', 'The quadratic has no real roots.']
    ],
    'Number Systems': [
      ['What is the difference between a rational and an irrational number?', 'A rational number can be written as p/q for integers p and q with q ≠ 0; an irrational number cannot.'],
      ['Are all rational and irrational numbers real numbers?', 'Yes. The real numbers consist of the rational and irrational numbers.'],
      ['What happens to the decimal expansion of a rational number?', 'It terminates or eventually repeats.'],
      ['What happens to the decimal expansion of an irrational number?', 'It is non-terminating and non-repeating.']
    ],
    'Motion': [
      ['What is the difference between distance and displacement?', 'Distance is total path length; displacement is the directed change in position from start to finish.'],
      ['What does the slope of a velocity–time graph represent?', 'Acceleration.'],
      ['What does the area under a velocity–time graph represent?', 'Displacement.'],
      ['When can the constant-acceleration equations be used?', 'When acceleration is constant over the interval being considered.']
    ],
    'Gravitation': [
      ['How does gravitational force change if the separation between two masses doubles?', 'It becomes one quarter as large because gravitational force varies as 1/r².'],
      ['Which quantities determine the gravitational force between two point masses?', 'The two masses and the distance between their centres, together with the gravitational constant G.'],
      ['How does gravitational field strength vary with distance from a spherical mass?', 'It decreases with the inverse square of the distance from the centre: g ∝ 1/r².']
    ],
    'Work and Energy': [
      ['When is the work done by a force zero even if the force is nonzero?', 'When there is no displacement, or when the force is perpendicular to the displacement.'],
      ['What does kinetic energy depend on?', 'Mass and the square of speed: K = ½mv².'],
      ['What does power measure?', 'The rate at which work is done or energy is transferred.']
    ],
    'Statistics': [
      ['How is the arithmetic mean calculated?', 'Add all observations and divide by the number of observations.'],
      ['Which measure of central tendency is most affected by extreme values?', 'The mean.'],
      ['What does a larger spread in a data set indicate?', 'The observations are more dispersed or variable.']
    ],
    'Introduction to Trigonometry': [
      ['In a right triangle, what is sin θ?', 'Opposite side divided by hypotenuse.'],
      ['In a right triangle, what is cos θ?', 'Adjacent side divided by hypotenuse.'],
      ['In a right triangle, what is tan θ?', 'Opposite side divided by adjacent side.'],
      ['Which identity links sin²θ and cos²θ?', 'sin²θ + cos²θ = 1.']
    ],
    'Current Electricity': [
      ['What does electrical resistance measure?', 'How strongly a component opposes electric current.'],
      ['According to Ohm’s law, what happens to current if voltage doubles while resistance stays constant?', 'The current doubles.'],
      ['How is electrical power related to voltage and current?', 'P = VI.']
    ],
    'Electric Current and Its Effects': [
      ['What causes the heating effect of electric current?', 'Electrical energy is converted to thermal energy as current passes through resistance.'],
      ['What is the purpose of a fuse?', 'To break the circuit when current becomes dangerously large.']
    ],
    'Probability': [
      ['For equally likely outcomes, how is probability calculated?', 'Number of favourable outcomes divided by the total number of possible outcomes.'],
      ['What is the probability of an impossible event?', '0.'],
      ['What is the probability of a certain event?', '1.']
    ]
  };

  function cleanAnswer(text) {
    return String(text || '').trim().replace(/\s+/g, ' ');
  }

  function pointQuestion(point, entry, index) {
    const p = cleanAnswer(point);
    const title = entry.title;

    const rules = [
      [/^Define (.+)\.$/i, m => `What should you be able to define accurately in ${title}?`],
      [/^Identify (.+)\.$/i, m => `What should you identify when working with ${title}?`],
      [/^Understand (.+)\.$/i, m => `What must you understand to explain ${title} confidently?`],
      [/^Connect (.+) to (.+)\.$/i, m => `How should ${m[1]} be connected to ${m[2]}?`],
      [/^Link (.+) to (.+)\.$/i, m => `What connection should you be able to explain between ${m[1]} and ${m[2]}?`],
      [/^Use (.+) to (.+)\.$/i, m => `What should you use to ${m[2]}?`],
      [/^Practise (.+)\.$/i, m => `What kind of practice should you do for ${title}?`],
      [/^Know which (.+)\.$/i, m => `Before applying a method in ${title}, what should you know or check?`],
      [/^Write (.+)\.$/i, m => `What should you be able to write correctly in ${title}?`],
      [/^Apply (.+)\.$/i, m => `How should you apply ${title} in an unfamiliar question?`],
      [/^Explain (.+)\.$/i, m => `What should you be able to explain in ${title}?`],
      [/^Learn (.+)\.$/i, m => `How should this process be learned for ${title}?`]
    ];

    for (const [pattern, make] of rules) {
      const match = p.match(pattern);
      if (match) return make(match);
    }

    return index % 2 === 0
      ? `What should you be able to explain or use in ${title}?`
      : `What is an important exam-ready point to remember about ${title}?`;
  }

  function methodQuestion(step, entry, index, previous) {
    if (index === 0) return `When you begin a ${entry.title} problem, what should you do first?`;
    if (index === 1) return `After the first setup step in a ${entry.title} problem, what should you do next?`;
    if (index === entry.method.length - 1) return `What final check should you make before accepting an answer in ${entry.title}?`;
    return `What should you do at step ${index + 1} when solving a ${entry.title} question?`;
  }

  function mistakeQuestion(mistake, entry, index) {
    const lower = cleanAnswer(mistake).replace(/\.$/, '').toLowerCase();
    if (lower.startsWith('ignoring ')) return `What should you avoid ignoring in ${entry.title} questions?`;
    if (lower.startsWith('confusing ')) return `Which ideas must you avoid confusing in ${entry.title}?`;
    if (lower.startsWith('mixing ')) return `What should you avoid mixing up in ${entry.title}?`;
    if (lower.startsWith('skipping ')) return `Why can skipping steps be risky in ${entry.title}?`;
    if (lower.startsWith('starting ')) return `What should you avoid doing too early in a ${entry.title} problem?`;
    if (lower.startsWith('using ')) return `What rule-use mistake can cost marks in ${entry.title}?`;
    return `What common mistake can cost marks in ${entry.title}?`;
  }

  function formulaQuestion(formula, entry, index) {
    return FORMULA_PROMPTS[formula] || `Which formula or relationship should you recall for ${entry.title} in this situation?`;
  }

  function card(id, front, back, source, kind) {
    return {id, front:cleanAnswer(front), back:cleanAnswer(back), source:`${kind} · ${source}`};
  }

  function enhancedTopicCards(entry) {
    if (!entry) return [];
    const cards = [];
    const seenFront = new Set();

    const push = (front, back, kind) => {
      front = cleanAnswer(front);
      back = cleanAnswer(back);
      if (!front || !back || seenFront.has(front.toLowerCase())) return;
      seenFront.add(front.toLowerCase());
      cards.push(card(`${entry.id}|smart|${cards.length}`, front, back, entry.title, kind));
    };

    // Hand-authored chapter questions take priority when available.
    (TOPIC_CARDS[entry.title] || []).forEach(([front, back]) => push(front, back, 'Concept'));

    // Exact formula recall is much more useful than asking for a "main idea".
    (entry.formulas || []).forEach((formula, i) => {
      push(formulaQuestion(formula, entry, i), formula, 'Formula');
    });

    // Turn the actual chapter-note points into interrogative active-recall cards.
    (entry.keyPoints || []).slice(0, 5).forEach((point, i) => {
      push(pointQuestion(point, entry, i), point, 'Core question');
    });

    // Problem-solving sequence.
    (entry.method || []).slice(0, 4).forEach((step, i) => {
      push(methodQuestion(step, entry, i, entry.method[i - 1]), step, 'Method');
    });

    // Exam mistakes are excellent retrieval prompts.
    (entry.mistakes || []).slice(0, 3).forEach((mistake, i) => {
      push(mistakeQuestion(mistake, entry, i), mistake, 'Exam trap');
    });

    if (entry.lens) {
      push(`What is a useful way to think about ${entry.title} so that you can apply it in unfamiliar questions?`, entry.lens, 'Understanding');
    }

    // Keep decks focused rather than overwhelming.
    return cards.slice(0, 18);
  }

  // script.js defines topicCards globally. Replacing the binding here means the
  // existing flashcard controls continue to work without touching the large core file.
  try {
    if (typeof topicCards === 'function') {
      topicCards = enhancedTopicCards;
    }
  } catch (_) {
    // If a browser changes global binding behaviour, patch the button as a safe fallback.
    const button = document.querySelector('#make-flashcards');
    if (button && typeof currentEntry === 'function') {
      button.onclick = () => {
        const entry = currentEntry();
        if (!entry) return typeof toast === 'function' && toast('Open a topic first');
        if (typeof dueReviewSession !== 'undefined') dueReviewSession=false;
        activeDeck = enhancedTopicCards(entry);
        cardIndex = 0;
        renderCard();
        renderFlashStats();
        location.hash = '#flashcards';
      };
    }
  }
})();
