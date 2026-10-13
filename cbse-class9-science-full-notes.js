/* Original StudyAI lesson content for NCERT Exploration, Class 9 Science (2026–27).
 * Primary source: https://ncert.nic.in/textbook/pdf/iesc101.pdf (printed pp. 1–7).
 * This layer enhances the reader without overwriting the existing Grade 9 science bank.
 * Mathematical calculations and example reasoning are independently checkable.
 * Editorial review remains outstanding; this file makes no certification claim.
 */
(() => {
  'use strict';
  const chapter = {
    sourceBook: 'Exploration · Textbook of Science for Grade 9',
    sourcePdf: 'iesc101.pdf',
    printedPages: '1–7',
    reviewStatus: 'Textbook-grounded draft; independent editorial review outstanding',
    lead: 'Science is not simply a list of facts to memorise. It is a way of asking focused questions, constructing useful simplifications, expressing observations precisely, making predictions, and changing explanations when evidence requires it. This opening chapter shows how those habits work in real situations. The magnifying glass in NCERT’s page design stands for careful observation; the compass stands for choosing purposeful questions and models while recognising their limits.',
    sections: [
      {
        title: 'Asking questions and building useful scientific models',
        visual: 'model-cycle',
        paragraphs: [
          'A scientific investigation starts with a question about the natural world. Observations suggest possible explanations, but the investigator must decide what to measure and which details can affect the answer. A scientific model is a deliberately simplified representation of an object, system or process. It is useful only relative to the question it is designed to answer.',
          'For example, a model of a cricket ball travelling towards the boundary needs the speed and direction immediately after the shot, its starting position, and enough information about the path to decide whether it lands first. The ball colour and manufacturer of the bat do not affect that prediction. At a first approximation, effects such as wind, spin and air resistance might be omitted. If that basic model gives poor predictions, those influences become candidates for the next version.',
          'In the simplest idealised model of a ball moving through the air, if air resistance is neglected, balls launched with the same initial speed and direction follow the same path regardless of mass. A model that includes air resistance can require mass, size and shape because these affect the motion. The textbook includes ball mass as relevant for the cricket shot; the important skill is to explain which assumptions make a factor important rather than declare it always relevant or always irrelevant.',
          'Models have assumptions, not merely diagrams. A point can represent a moving car when its overall position matters, spheres can represent atoms when discussing bonds, and an outline of a cell can emphasise structures that perform different jobs. None of these representations contains every detail of the real system. A good scientific explanation states what the model includes, what it leaves out, why this is reasonable, and when the simplification would fail.',
          'NCERT also describes physicist Meghnad Saha simplifying the behaviour of matter in stars. By treating stellar matter as a hot gas, he focused on temperature, pressure and how atoms form ions instead of describing every atom and reaction. This helped explain how the colour and light of stars relate to their temperature. The point is not that ignored features never matter: scientific models deliberately choose a manageable level of detail.'
        ],
        examples: [
          {
            title: 'Worked reasoning: Will the cricket shot clear the boundary?',
            question: 'Decide which details belong in a first model and which can be excluded.',
            steps: [
              'Define the question: will the ball cross the boundary without first touching the ground?',
              'Keep the relevant quantities: starting position, boundary distance, launch speed and direction, and a reasonable description of how gravity affects the flight.',
              'Exclude details unlikely to change this first answer: ball colour, clothing and bat branding.',
              'Record limitations: strong wind, spin or drag may matter when the result is close to the boundary; a more accurate model would add them.'
            ],
            answer: 'A model is judged by whether it answers the chosen question with appropriate accuracy, not by the number of details included.'
          },
          {
            title: 'Activity 1.1 developed: Cycling home from school',
            question: 'Which factors should be considered to estimate the journey time?',
            steps: [
              'Start with route distance and average moving speed. A preliminary calculation is time = route distance ÷ average speed.',
              'For a 6 km route at an average of 12 km/h, moving time is 6 ÷ 12 = 0.5 h = 30 minutes.',
              'If traffic signals and stops add roughly 8 minutes, the revised estimate is 38 minutes.',
              'The colour of the bicycle is immaterial. Rain, an uphill route or long traffic delays could make the speed assumption unrealistic.'
            ],
            answer: 'First estimate: 30 minutes under a constant-average-speed assumption; refined estimate: about 38 minutes if stops add 8 minutes. The numbers are illustrative, not measured facts about a particular trip.'
          }
        ],
        checkQuestions: [
          {question:'Two students throw balls with the same initial speed and direction. When would their different masses matter to the model?',answer:'In a model ignoring air resistance, mass does not change the predicted path. In a more realistic model including air resistance, mass can affect how strongly drag changes the path. State which model is being used.'}
        ],
        tip: 'Always explain an omitted factor in terms of the question. “It is unimportant to this prediction” is stronger than saying a detail never affects the system.'
      },
      {
        title: 'Scientific language, units and the role of mathematics',
        paragraphs: [
          'Everyday words can have stricter scientific meanings. Force, work and cell are examples of terms whose definitions depend on scientific context. Shared vocabulary, agreed symbols and standard units let investigators in different places compare their findings. Mass is commonly represented by m, velocity by v, force by F and electric current by I; the symbol and unit are related but not interchangeable.',
          'The symbol c for the speed of light comes historically from the Latin word celeritas, meaning speed. In vacuum, its defined SI value is exactly 299,792,458 metres per second. Scientific notation reflects international conventions, not necessarily abbreviations of modern English terms.',
          'A number is not a complete scientific measurement without its unit and meaning. A distance of 6 km and a speed of 12 km/h can be used together to find a time in hours because the kilometres cancel. But if a density is measured in pounds per litre, it cannot be treated numerically as kilograms per litre. NCERT discusses an aircraft incident involving this kind of unit mismatch: a flight required 22,300 kg of fuel but received substantially too little after incompatible units were mixed.',
          'Equations express how quantities are related; they are more than recipes for inserting numbers. To reason from an equation, identify the physical situation, define every variable, check the conditions under which the relation applies, carry units through the calculation, and interpret the answer. For example, distance ÷ speed estimates journey time if speed is understood as an appropriate average over the route.',
          'The SI system gives science shared measurement standards. Standard units are useful in daily life too: when we purchase one kilogram of rice, its agreed meaning should not vary with the shop or country. Precision also requires knowing the difference between an approximate measurement and an exact relationship.'
        ],
        examples: [
          {
            title: 'Worked example: An equation is a relationship between units',
            question: 'A cyclist travels 6 km at an average speed of 12 km/h. Find the moving time.',
            steps: [
              'Identify the relationship: time = distance ÷ average speed.',
              'Substitute complete quantities: time = 6 km ÷ (12 km/h).',
              'Cancel km and simplify: time = 0.5 h.',
              'Convert using 1 h = 60 min: 0.5 × 60 = 30 min. Check: 12 km in 60 min means 6 km in 30 min.'
            ],
            answer: '30 minutes of moving time, subject to the average-speed assumption.'
          },
          {
            title: 'Unit-sense check: Avoid the pounds/kilograms mistake',
            question: 'Why is it wrong to substitute a density in lb/L where a calculation requires kg/L?',
            steps: [
              'The numerical size of a density depends on its units; pounds and kilograms measure the same kind of quantity using different scales.',
              '1 pound is approximately 0.454 kilogram, so a value stated in lb/L needs an explicit conversion before use with kilograms.',
              'Check the expected units in the final calculation: litres × (kilograms/litre) gives kilograms, whereas litres × (pounds/litre) gives pounds.'
            ],
            answer: 'A calculator can perform the arithmetic perfectly while the result is physically wrong if incompatible units are treated as equivalent.'
          }
        ],
        tip: 'For a numerical answer, show units at every important step. Correct unit cancellation is a powerful way to detect a wrong formula or an unconverted measurement.'
      },
      {
        title: 'Evidence, scientific explanations and testable predictions',
        paragraphs: [
          'Observation records what is noticed or measured; an inference proposes what those observations mean. A scientific prediction is an expectation derived from evidence and a model. It is testable because we can compare it with later observations. A hypothesis is a possible explanation or relationship to investigate, not a conclusion made reliable merely by stating it confidently.',
          'A scientific law usually describes an observed regularity, often mathematically. A theory gives a well-supported explanatory framework for observations and patterns. A principle is a broader guiding idea applied to many situations, such as conservation of energy. These terms describe different roles in reasoning; they are not a ranking in which an established theory eventually turns into a law. In particular, a scientific theory is not simply an untested guess.',
          'Consider the claim “It will rain because the clouds look dark.” Dark clouds are one observation, not a dependable prediction on their own. An investigation could compare humidity, pressure, temperature, wind and earlier patterns with later rain measurements. The observations can strengthen or weaken the model, but even a data-based forecast is not a guarantee: weather depends on many interacting variables, and small changes can have large consequences over time.',
          'When a prediction fails, scientists ask whether measurements were inaccurate, important effects were omitted, or the underlying explanation needs revision. Scientific knowledge is valuable partly because it can be tested and corrected. A widely shared claim has no special scientific standing unless there is a plausible mechanism and supporting evidence.',
          'NCERT uses a circulating claim about eating food during an eclipse to illustrate critical thinking. The fact that sunlight becomes shadowed during an eclipse does not, on its own, provide a physical, chemical or biological reason for food to become harmful. The correct approach is to ask for a testable mechanism and reliable evidence rather than assume that popularity makes a claim true.'
        ],
        examples: [
          {
            title: 'Worked reasoning: Improve a weather prediction',
            question: 'How can a prediction based only on dark clouds become more scientific?',
            steps: [
              'State the prediction so that it can be checked: for example, “Measurable rain will occur here between 3 pm and 6 pm.”',
              'Record evidence before that window: cloud conditions, humidity, wind, temperature and relevant past measurements.',
              'Compare the forecast with what actually happens. Repeat for several occasions rather than deciding from a single coincidence.',
              'If forecasts repeatedly fail, consider missing variables, misleading assumptions, measurement errors or an unsuitable model.'
            ],
            answer: 'A good prediction is specific, evidence-based and open to being proved wrong; it is not a statement of certainty.'
          },
          {
            title: 'Explain the difference: Law, theory and principle',
            question: 'Is a theory an unsupported explanation that becomes a law when proven?',
            steps: [
              'A law summarises a regular pattern, such as a relationship between force and motion under stated conditions.',
              'A theory explains a set of observations using a coherent, repeatedly examined body of evidence, such as atomic theory.',
              'A principle is a broad idea useful in reasoning, such as conservation of energy.',
              'The categories serve different functions. Further evidence can strengthen or refine a theory without changing it into a law.'
            ],
            answer: 'No. Theories and laws serve different scientific purposes; an established theory is evidence-based, not a mere guess.'
          }
        ],
        checkQuestions: [
          {question:'A family predicts that a local cricket team will win its next game. How could they make that prediction better supported by evidence?',answer:'Identify testable factors such as recent match results, player availability and playing conditions. Explain uncertainties and compare predictions with what happens; a single result does not establish a universal rule.'},
          {question:'A viral post says food becomes unsafe during an eclipse. Which type of evidence would you seek before accepting it?',answer:'Ask for a plausible physical, chemical or biological mechanism and reliable comparative observations or tests. The change in sunlight alone is not evidence that the food becomes unsafe.'}
        ],
        tip: 'When evaluating a claim, separate observation, explanation, prediction and test. Do not mistake correlation, one anecdote or a confident statement for proof.'
      },
      {
        title: 'Estimation and checking whether an answer makes sense',
        paragraphs: [
          'An estimate replaces missing exact information with sensible approximate values. The goal is to identify the correct scale of an answer and check whether it is plausible, not to create false precision. A good estimate names its assumptions, keeps units consistent and checks whether changing an assumption substantially changes the result.',
          'The textbook asks how much rice might feed a family for a month and how much air a person breathes in a day. In either case, first identify the quantities that matter, then multiply or divide quantities in compatible units. A very small result or an enormous one can be rejected by a plausibility check even before precise measurements are made.',
          'An independent second estimate is especially useful. If two rough approaches differ by a modest amount but have the same order of magnitude, both may be reasonable. If they disagree by a factor of one hundred, investigate the assumptions and conversions. There are also circumstances in which approximation is not sufficient: safety-critical quantities and controlled experimental results may demand accurate measurement.'
        ],
        examples: [
          {
            title: 'Worked textbook estimate: Litres of air breathed per day',
            question: 'Estimate the volume of air passing into the lungs over a day for someone resting, using rounded values.',
            steps: [
              'Estimate about 20,000 breaths in one day, consistent with approximately 12–15 breaths/min over 1,440 minutes.',
              'Use a rough volume of 0.5 L per breath. Multiply: 20,000 breaths/day × 0.5 L/breath ≈ 10,000 L/day.',
              'Cross-check differently: 3 balloons/min × 2 L/balloon × 1,440 min/day = 8,640 L/day, using the textbook’s illustrative balloon analogy.',
              'The two values are of the same order of magnitude. They are rough illustrations, not a measurement or recommendation for any individual.'
            ],
            answer: 'Approximately 10,000 litres per day under the stated rough assumptions. The independent check gives about 8,640 litres per day.'
          },
          {
            title: 'Estimation design: Rice for four people',
            question: 'How would you estimate the mass of uncooked rice needed for four people for 30 days?',
            steps: [
              'Decide what is being estimated. A simple upper-bound model might assume rice provides all the energy needs, although real diets contain many foods.',
              'To demonstrate the arithmetic only, suppose each person is assigned a hypothetical 2,000 kcal/day, and assume uncooked rice supplies 350 kcal per 100 g. These are illustrative model inputs, not personal dietary targets.',
              'Modelled energy over 30 days: 4 × 2,000 kcal/day × 30 days = 240,000 kcal. Estimated uncooked rice: 240,000 kcal ÷ (350 kcal per 100 g) = about 68,600 g, or 69 kg.',
              'The textbook deliberately assumes all energy comes from rice to teach estimation. Actual diets contain many foods and personal needs vary; the result must not be treated as a realistic requirement or eating recommendation.'
            ],
            answer: 'About 69 kg of uncooked rice for 30 days under the explicitly hypothetical all-rice energy model. The result is illustrative, not a recommended diet or real household requirement.'
          }
        ],
        checkQuestions: [
          {question:'Give one situation where a rough estimate is adequate and one where a precise measurement is essential. Explain your choices.',answer:'Estimating travel time to choose when to leave can often tolerate uncertainty; measuring a quantity for an aircraft’s safe operation requires much greater precision. The required accuracy depends on the consequence of error.'}
        ],
        tip: 'Show the order of magnitude and explain uncertainty. Do not report many decimal places when your starting estimates are approximate.'
      },
      {
        title: 'One connected science: People, systems and responsible enquiry',
        visual: 'mask-map',
        paragraphs: [
          'Physics, chemistry, biology, Earth science and mathematics are useful disciplines for organising knowledge, but real systems do not respect subject boundaries. A problem such as designing a protective face mask can involve physical movement of particles, the properties of fibres, biological considerations and quantitative modelling of filtration. Each contribution answers part of the larger question.',
          'In the same way, a mobile phone involves electrical signals, materials, energy use and human behaviour. A traffic problem may require motion, data analysis, environmental observations and social decisions. Draw a simple map linking at least two disciplines to the actual question, and state what each contributes. Merely listing subject names does not demonstrate the connection.',
          'Science develops through curiosity, creative models, measurement, collaboration and criticism. Explanations gain trust by surviving tests and by being transparent about their limits. Learning this method helps evaluate information and solve practical problems even when someone does not later specialise in science.',
          'For revision, ask yourself: What is the question? What evidence is available? What has the model assumed? Which measurements and units matter? Can we make a prediction? What would change our mind? Those questions connect nearly everything in this introductory chapter.'
        ],
        examples: [
          {
            title: 'Worked interdisciplinary question: How does a mask filter air?',
            question: 'Explain why the question cannot be answered by naming just one branch of science.',
            steps: [
              'Physics considers air flow and how particles interact with a fibrous structure.',
              'Chemistry and materials science consider the properties of the fibres and possible electrical attraction effects.',
              'Biology considers the characteristics of microorganisms or particles that the filtration is intended to address.',
              'Mathematics quantifies and compares measured flow and filtration performance. The parts must be connected to judge an actual design.'
            ],
            answer: 'Several disciplines offer complementary explanations; the complete question is about an interacting system.'
          }
        ],
        checkQuestions: [
          {question:'A school wants to understand how a reusable water filter works. Name two sciences involved and explain what each contributes.',answer:'Materials science or chemistry helps explain the filter medium and its interactions with substances; biology can examine microorganisms; physics helps explain water flow. At least two connected explanations are needed, rather than only naming subjects.'}
        ],
        tip: 'For a cross-disciplinary answer, give one concrete contribution from each selected subject and explicitly connect them to the same problem.'
      }
    ]
  };

  window.CBSE_CLASS9_SCIENCE_FULL_NOTES = Object.assign(
    {}, window.CBSE_CLASS9_SCIENCE_FULL_NOTES || {},
    { 'Exploration: Entering the World of Secondary Science': chapter }
  );
})();
