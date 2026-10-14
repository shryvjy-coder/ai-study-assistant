/* Original StudyAI Class 9 Science Chapter 8 notes: NCERT Exploration 2026–27, iesc108.pdf, printed pp. 140–161. */
(()=>{
'use strict';
const chapter={
  "sourceBook": "Exploration · Textbook of Science for Grade 9",
  "sourcePdf": "iesc108.pdf",
  "printedPages": "140–161",
  "reviewStatus": "Independently checked against official NCERT 2026–27 textbook; external teacher and visual editorial review outstanding",
  "lead": "Learn the evidence that revealed the electron and nucleus, the logic of Bohr's shell model, how to read element symbols and find protons/neutrons/electrons, how to place the first eighteen elements in shells and calculate valency, and how isotopes and weighted atomic masses work. Every topic includes fully worked examples, misconception checks and original teaching diagrams.",
  "sections": [
    {
      "title": "The atomic idea: from Kanada and Democritus to Dalton",
      "paragraphs": [
        "Everything around us—living organisms, rocks and gases—is made of atoms. Acharya Kanada argued in the Vaisesika Sutras that repeated subdivision reaches tiny indivisible units called parmanus; his philosophical account included combinations described as dyads and triads. The Greek thinkers Leucippus and Democritus similarly used the word atomos, meaning indivisible. These early proposals were attempts to explain matter by reasoning, not results of modern controlled experiments.",
        "John Dalton's 1808 atomic theory used evidence from chemical combinations to suggest that substances comprise atoms and that chemical changes rearrange them. At the time he assumed atoms were indivisible. This was a useful scientific model, not a permanent fact: later experimental discoveries showed that electrons, protons and neutrons are smaller components within atoms.",
        "A scientific model is an evidence-guided explanation that makes predictions and can be revised. The historical progression taught in NCERT Chapter 8 is philosophical indivisible particles → Dalton's scientific atomic picture → Thomson's positive sphere with embedded electrons → Rutherford's tiny nucleus → Bohr's specific allowed energy levels. Each change answered a question the previous description could not.",
        "An atom is extraordinarily small, on the order of 10⁻¹⁰ m across. The nucleus is smaller still, on the order of 10⁻¹⁵ m. Because those lengths are outside everyday experience, drawing diagrams of atoms requires enormous changes of scale. Electron shells drawn as lines and coloured spheres are illustrations, not literal photographs or accurate sizes.",
        "Atomic structure is taught here using the historical Bohr model because it is useful for electron counts and introductory valency. Modern quantum physics does not place electrons on literal little planetary tracks; its electron clouds represent probabilities. For NCERT questions, distinguish what each historical model assumed from what a later model refined."
      ],
      "examples": [
        {
          "title": "NCERT Section 8.1: chronology",
          "question": "Arrange Kanada/Democritus, Dalton, Thomson, Rutherford and Bohr into a historical chain and identify the nature of their evidence.",
          "steps": [
            "Ancient India and Greece: philosophical proposals of indivisible tiny units.",
            "1808: Dalton's scientifically motivated theory of atoms in matter.",
            "1897 onward: Thomson found electrons; 1911: Rutherford's gold foil evidence showed a nucleus.",
            "1913: Bohr postulated fixed-energy electron shells to explain stability."
          ],
          "answer": "Ancient ideas → Dalton → Thomson → Rutherford → Bohr; experimental evidence increasingly shaped the later models."
        },
        {
          "title": "Why Dalton's model needed revision",
          "question": "The atom is said to be indivisible in Dalton's model. Does discovery of electrons refute the entire usefulness of Dalton's idea?",
          "steps": [
            "Dalton's indivisibility claim cannot be literally true if atoms contain electrons.",
            "Many other aspects of atoms' role in ordinary chemical composition remained useful.",
            "Scientific theories can be partially revised when new evidence is obtained."
          ],
          "answer": "Electron discovery disproved indivisibility, not every practical feature of atomic theory."
        },
        {
          "title": "Atomic-scale unit conversion",
          "question": "Express 0.1 millimetre in metres and compare it to 10⁻¹⁰ m.",
          "steps": [
            "1 mm = 10⁻³ m.",
            "0.1 mm = 10⁻¹ × 10⁻³ = 10⁻⁴ m.",
            "The ratio to atomic diameter is 10⁻⁴/10⁻¹⁰ = 10⁶."
          ],
          "answer": "0.1 mm = 10⁻⁴ m, approximately one million atomic diameters."
        },
        {
          "title": "Evidence versus analogy",
          "question": "Can a coloured ring diagram prove an atom actually has coloured electron orbits?",
          "steps": [
            "Models use lines and colours to communicate positions and relationships.",
            "The colours and literal drawn tracks are artistic teaching conventions.",
            "Experimental evidence, not the drawing style, tests atomic structure."
          ],
          "answer": "No; such diagrams are simplified schematic models."
        },
        {
          "title": "NCERT exercise 5: correct timeline",
          "question": "Order these statements: Thomson's pudding, Bohr's energy orbits, Dalton's indivisible atoms, Rutherford's dense nucleus.",
          "steps": [
            "Dalton's model came first among these four.",
            "Thomson added negatively charged electrons inside distributed positive charge.",
            "Rutherford inferred a tiny central nucleus from alpha scattering.",
            "Bohr proposed allowed constant-energy states."
          ],
          "answer": "Dalton → Thomson → Rutherford → Bohr."
        }
      ],
      "checkQuestions": [
        {
          "question": "Were ancient parmanu and atomos ideas experimentally established atomic models?",
          "answer": "No, they were philosophical explanations."
        },
        {
          "question": "Which model first introduced experimentally discovered electrons?",
          "answer": "Thomson's model."
        },
        {
          "question": "Why can a useful scientific model later be replaced?",
          "answer": "A new experiment may reveal observations the older model cannot explain."
        }
      ],
      "tip": "In chronological NCERT answers, state the new experimental observation and the limitation it revealed—not only the scientist's name.",
      "visual": "history"
    },
    {
      "title": "Thomson: cathode rays, electrons and the plum-pudding model",
      "paragraphs": [
        "In 1897, J. J. Thomson studied electrical conduction in a glass tube containing gas at low pressure and electrodes with a high voltage. Rays travelled from the negative cathode toward the positive anode. Their behaviour in electric and magnetic fields showed they were streams of negatively charged particles much less massive than ordinary atoms: electrons.",
        "Thomson found that the nature of these cathode rays did not depend on the gas or the cathode material. From that repeatability he inferred that electrons belong to atoms of all elements, not just a special material inside his apparatus. An electron has a negative elementary charge, about −1.602 × 10⁻¹⁹ C; we use relative charge −1 in school calculations.",
        "A neutral atom contains no net electrical charge. Thomson pictured its positive charge spread throughout a sphere with negatively charged electrons embedded inside it. The plum-pudding and watermelon analogies mean positive 'pudding/pulp' dotted with electron 'plums/seeds'. Positive and negative charges balance in a neutral atom.",
        "NCERT's Pause and Ponder asks you to change the positive charge of the 'pulp': if it is smaller in magnitude than the total negative electron charge, the model has net negative charge, not neutrality. If even the pulp were itself negatively charged, it could no longer represent the required balancing positive charge.",
        "Thomson's model was important because it acknowledged smaller charged particles, but it could not account for the later observations that a few fast, positively charged alpha particles bounced backward from thin metal foil. That required the atom's positive charge to be far more concentrated than a uniform 'pudding'."
      ],
      "examples": [
        {
          "title": "What cathode-ray independence shows",
          "question": "Identical electron behaviour is found with different gases and cathode metals. What inference follows?",
          "steps": [
            "Different materials have different chemical properties.",
            "The negatively charged particles in the tube behave the same in each case.",
            "It is reasonable to infer a common subatomic constituent across elements."
          ],
          "answer": "Electrons are components of the atoms of all elements."
        },
        {
          "title": "Neutrality in Thomson's sphere",
          "question": "A model contains 5 electrons, each of charge −1 in relative units. How much positive charge must the sphere provide for neutrality?",
          "steps": [
            "Total electron charge = 5 × (−1) = −5.",
            "A neutral atom has algebraic sum of charges zero.",
            "Required positive charge = +5."
          ],
          "answer": "+5 relative units of positive charge."
        },
        {
          "title": "Incorrect positive charge",
          "question": "A clay 'pudding' has positive charge +3 while 5 electrons each carry −1. What charge does the model possess?",
          "steps": [
            "Total electron charge = −5.",
            "Add positive background: +3 − 5 = −2.",
            "A net negative model is not a neutral atom."
          ],
          "answer": "Net charge is −2 relative units."
        },
        {
          "title": "Thomson analogy comparison",
          "question": "Why is a seeded orange somewhat like Thomson's model, but not a literal atom?",
          "steps": [
            "Seeds can represent electrons embedded in a larger body.",
            "Fleshy material can symbolise widely distributed positive charge.",
            "Real orange pulp, electrons and positive charge do not have the model's literal shapes or scales."
          ],
          "answer": "Helpful analogy for distribution, not literal atomic structure."
        },
        {
          "title": "Model failure prediction",
          "question": "Under Thomson's uniformly positive sphere, would a few alpha particles be expected to reverse their direction after hitting extremely thin foil?",
          "steps": [
            "There is no very compact intense positive charge in Thomson's model.",
            "Small distributed deflections could occur, not the strong backward scattering observed.",
            "The prediction disagrees with Rutherford's results."
          ],
          "answer": "The strong occasional backward scattering is not explained by Thomson's model."
        }
      ],
      "checkQuestions": [
        {
          "question": "Which electrode emits the rays studied by Thomson?",
          "answer": "The cathode, the negative electrode."
        },
        {
          "question": "What does the experiment's independence of gas and electrode material show?",
          "answer": "Electrons are universal constituents of atoms."
        },
        {
          "question": "What happens to charge if 4 electrons are embedded in only +2 background?",
          "answer": "Net charge is −2; not neutral."
        }
      ],
      "tip": "Do not write that Thomson found the nucleus. His model spread positive charge through the atom; the nucleus came from alpha scattering.",
      "visual": "thomson"
    },
    {
      "title": "Gold-foil scattering: observation, inference and scale",
      "paragraphs": [
        "Geiger and Marsden, working with Rutherford in 1911, fired a narrow stream of positively charged alpha particles at a very thin gold foil. Alpha particles are helium nuclei; for the common helium-4 alpha particle there are two protons and two neutrons. An alpha particle carries positive charge and is repelled by a positively charged nucleus.",
        "Three distinct observations matter: most alpha particles passed through without noticeable deflection; some were strongly deflected; very few travelled almost back toward the source. These are not three unrelated facts. Most straight tracks imply enormous empty space; large deflections imply a strong concentrated positive charge; rare rebounds imply a very small, dense, massive positive nucleus.",
        "Rutherford's nuclear model therefore places nearly all atomic mass and all nuclear positive charge inside a tiny central nucleus, with electrons outside. It was a major improvement over Thomson's distributed-positive-charge sphere. The scattering data directly established strong concentrated positive charge and mass—not the existence of neutrons and not a precise literal 'planet' path for electrons.",
        "An atom's characteristic diameter is ~10⁻¹⁰ m while its nucleus is ~10⁻¹⁵ m. The diameter ratio is (10⁻¹⁰)/(10⁻¹⁵) = 10⁵ = 100,000. If an atom were enlarged to about 100 m across, the nucleus would be about 100 m /100,000 = 0.001 m = 1 mm across in the same rough scale picture.",
        "NCERT's 'Think as a Scientist' asks about a thicker gold foil. With more layers of atoms, an alpha particle is more likely to undergo one or more scattering interactions, so the transmitted paths become more disturbed, and sufficiently thick foil reduces transmitted particles. It is an oversimplification to predict all thick-foil particles will rebound: multiple deflections and energy loss can complicate the outcome.",
        "Rutherford's planetary picture gave no classical explanation for stability. A charged particle going in a circle continually accelerates because its velocity direction changes. Classical electromagnetic theory predicts such an accelerating electron would radiate energy, moving inward toward the nucleus. Actual atoms are stable, so a new description was required."
      ],
      "examples": [
        {
          "title": "NCERT exercise 1: select Rutherford conclusions",
          "question": "Four claims: (i) neutrons discovered, (ii) Thomson model disproved, (iii) positive charge concentrated, (iv) electron paths precisely shown. Which follow from scattering?",
          "steps": [
            "The experiment recorded alpha deflection by a strong, small positive centre.",
            "This supports (ii) and (iii).",
            "Neutral neutron discovery came later in 1932; electron orbit detail is not established directly by these paths."
          ],
          "answer": "The supported choices are (ii) and (iii)."
        },
        {
          "title": "Three observations to three inferences",
          "question": "Explain separately the undisturbed, deflected and backward alpha tracks.",
          "steps": [
            "Most undeflected → atom is predominantly empty space.",
            "Few sharply deflected → local strong repulsion from concentrated positive charge.",
            "Very rare near-backscattering → tiny nucleus contains most mass and positive charge."
          ],
          "answer": "The Rutherford nuclear model replaces uniformly spread positive charge."
        },
        {
          "title": "Nucleus size ratio",
          "question": "Compare an atom with diameter 10⁻¹⁰ m and a nucleus with diameter 10⁻¹⁵ m.",
          "steps": [
            "Divide atomic diameter by nuclear diameter.",
            "10⁻¹⁰/10⁻¹⁵ = 10^(−10+15).",
            "The ratio is 10⁵."
          ],
          "answer": "Atom about 100,000 times the nucleus's diameter."
        },
        {
          "title": "Paper thickness thought experiment",
          "question": "An average sheet is 0.1 mm thick. At 10⁻¹⁰ m atomic diameter, about how many atoms span it in a simplified end-to-end estimate?",
          "steps": [
            "Convert 0.1 mm to 10⁻⁴ m.",
            "Divide: 10⁻⁴ / 10⁻¹⁰ = 10⁶.",
            "Interpret as order-of-magnitude estimate; atomic packing and atom sizes vary."
          ],
          "answer": "About 10⁶, or one million atomic diameters."
        },
        {
          "title": "Thicker foil prediction",
          "question": "What changes if the foil is much thicker than Rutherford's very thin foil?",
          "steps": [
            "An alpha particle traverses more atomic layers.",
            "Interactions and multiple scattering become more likely.",
            "Fewer particles remain perfectly forward and thick enough foil can reduce transmission; exact backscattering depends on conditions."
          ],
          "answer": "More scattering and less simple straight-through transmission, not a claim that every particle reverses."
        },
        {
          "title": "Why the planetary model was incomplete",
          "question": "Why is Rutherford's orbiting electron picture unstable under classical electromagnetic ideas?",
          "steps": [
            "Circular motion requires acceleration even at constant speed.",
            "Accelerating electric charges radiate electromagnetic energy in classical physics.",
            "Energy loss would shrink the orbit, but observed atoms are stable."
          ],
          "answer": "Rutherford's classical orbit picture could not explain atomic stability."
        }
      ],
      "checkQuestions": [
        {
          "question": "Did Rutherford's experiment directly detect a neutron?",
          "answer": "No. Chadwick discovered the neutron later."
        },
        {
          "question": "If the diameter ratio is 10⁵, what is a 100 m atom-scale nucleus diameter?",
          "answer": "100/100000 m = 0.001 m = 1 mm."
        },
        {
          "question": "Why are most alpha rays undeflected?",
          "answer": "The atom is mostly empty space."
        },
        {
          "question": "Does 'slowing or bending' automatically prove the electron orbit is circular?",
          "answer": "No; scattering establishes a small positive nucleus, not a photographic electron path."
        }
      ],
      "tip": "For an observation→inference question, explicitly link each track with Rutherford's conclusion. Do not mistake diagrams for actual atomic sizes.",
      "visual": "rutherford"
    },
    {
      "title": "Bohr's model, energy levels and the limits of orbit diagrams",
      "paragraphs": [
        "Bohr proposed his atomic model in 1913. It retained a positively charged nucleus but introduced allowed electron states with specific energies. The historical model depicts electrons moving in certain fixed circular paths called stationary orbits or shells. In one allowed state the electron does not continuously radiate energy, which addressed the stability problem that Rutherford's classical orbital picture could not solve.",
        "Allowed shells are labelled K, L, M, N and so on, or n = 1, 2, 3, 4. K is nearest and, in the simple model, has lowest energy; energy increases outward. The letter labels derive from early X-ray spectroscopy. These shell levels are quantised—electrons are not allowed to settle at arbitrary energies between them in Bohr's model.",
        "An electron can move from a lower to a higher allowed energy state by absorbing energy, and from a higher to a lower state by releasing energy. The exchanged energy equals the difference between levels. It does not mean an electron gradually leaks energy every moment within a stable allowed orbit.",
        "Electrostatic attraction between negative electrons and positive protons helps explain why electrons are bound to atoms rather than simply flying away. But a classical rotating-electron picture alone would predict collapse; Bohr added stationary-state postulates, and quantum mechanics later provided a fuller explanation of atomic stability.",
        "For Chapter 8 diagrams, draw an easily visible nucleus and concentric K/L/M/N rings, with the rings explicitly called a teaching schematic. The diagrams are not drawn to scale, and modern electron distributions are probability clouds, not thin physical wires around the nucleus.",
        "The number of electrons allowed per shell is addressed in Section 8.7 using Bohr–Bury rules. Do not confuse the existence of energy shells (Bohr's model) with the later method of populating them or with a nucleus containing protons and neutrons."
      ],
      "examples": [
        {
          "title": "NCERT exercise 2: correct Bohr statements",
          "question": "Which is correct: (i) an allowed orbit steadily loses energy, (ii) any electron energy is allowed, (iii) allowed orbits have fixed energy without steady loss, (iv) electrons orbit at arbitrary energies between shells?",
          "steps": [
            "Allowed stationary states have definite energies.",
            "Bohr's model postulates no radiation during motion in an allowed state.",
            "Transitions require a discrete change in energy, not a gradual arbitrary drift."
          ],
          "answer": "Only statement (iii) is correct under Bohr's historical model."
        },
        {
          "title": "Electron energy transition",
          "question": "An electron changes from an allowed state of energy 5 arbitrary units to one at 2 units. Is energy absorbed or released, and how much?",
          "steps": [
            "The final level has 3 units less energy.",
            "Energy is conserved in transition.",
            "An electron releases energy equal to the difference."
          ],
          "answer": "It releases 3 energy units."
        },
        {
          "title": "Shell names",
          "question": "Give the names and principal numbers of the first four Bohr shells.",
          "steps": [
            "Closest is K with n = 1.",
            "Next is L with n = 2.",
            "Then M with n = 3 and N with n = 4."
          ],
          "answer": "K(1), L(2), M(3), N(4)."
        },
        {
          "title": "NCERT exercise 6: why electrons remain bound",
          "question": "Why do electrons not simply fly away from an atom in the textbook model?",
          "steps": [
            "Nuclear protons have positive charge while electrons are negative.",
            "Opposite electric charges attract.",
            "The historical model combines electrostatic binding with allowed stationary energies to explain stability."
          ],
          "answer": "Electrostatic attraction binds them, while stationary levels avoid the classical radiation-collapse problem."
        },
        {
          "title": "Bohr versus modern quantum model",
          "question": "Is the drawing of an electron on an orbit identical to its modern quantum mechanical description?",
          "steps": [
            "Bohr used fixed circular paths in a historically useful model.",
            "Quantum physics represents allowed electron states using spatial probability distributions.",
            "The school drawing is a model, not a photograph."
          ],
          "answer": "No. Electron clouds are a more advanced physical description."
        }
      ],
      "checkQuestions": [
        {
          "question": "How many electrons are allowed between Bohr's permitted energy levels in the simple model?",
          "answer": "An electron cannot occupy an arbitrary energy between allowed levels."
        },
        {
          "question": "Does an electron in a stationary allowed orbit lose energy continuously?",
          "answer": "No, not under Bohr's postulate."
        },
        {
          "question": "What is the K shell's number n?",
          "answer": "n = 1."
        }
      ],
      "tip": "Separate electron BINDING (attraction) from electron ENERGY STABILITY (allowed states). Distinguish Bohr's model from modern clouds.",
      "visual": "bohr"
    },
    {
      "title": "Neutrons, nuclear stability and three subatomic particles",
      "paragraphs": [
        "Ordinary hydrogen has one proton, but a helium-4 nucleus has two protons while its mass is roughly four times hydrogen's. Protons alone cannot explain this. James Chadwick discovered the electrically neutral neutron in 1932. A neutron has mass approximately equal to a proton's, and both are about 1,800 times heavier than an electron.",
        "NCERT Table 8.1 uses the symbols electron e⁻, proton p⁺ and neutron n⁰ and relative charges −1, +1 and 0. Electrons occupy regions outside the nucleus; protons and neutrons occupy the nucleus. A neutral atom contains equal numbers of protons and electrons; the number of neutrons may differ.",
        "Most mass of an ordinary atom comes from nucleons—the protons and neutrons. The common hydrogen isotope protium (¹₁H) has no neutron, so avoid the statement that every single atomic nucleus contains both protons and neutrons. Helium-4 contains 2 protons and 2 neutrons; carbon-12 contains 6 and 6.",
        "Protons repel other protons electrically. A short-range strong nuclear interaction binds nucleons together, allowing many nuclei to exist despite this repulsion. Neutrons participate in this binding without adding electric charge. The textbook uses an intuitive 'neutrons intervene between protons' picture, but stable nuclear binding is not literally guaranteed by keeping protons farther apart: stability depends on nuclear forces and the numbers of both types of nucleon.",
        "As nuclear charges get higher, stable nuclei generally need more neutrons relative to protons. Illustrations include iron-56 with 26 protons and 30 neutrons, and uranium-238 with 92 protons and 146 neutrons; this is not a rule that every possible isotope with a higher neutron count is stable.",
        "The NCERT's India-related discussion describes scientific research with neutron beams, including at the Dhruva research reactor at the Bhabha Atomic Research Centre (BARC) in Mumbai. These applications show that electrically neutral neutrons can be useful probes of matter, but are not part of a school hands-on experiment."
      ],
      "examples": [
        {
          "title": "NCERT Section 8.3: helium mass puzzle",
          "question": "Why does helium-4 have roughly four times the mass of protium despite only twice as many protons?",
          "steps": [
            "A protium nucleus contains one proton and zero neutrons.",
            "A helium-4 nucleus contains two protons AND two neutrons.",
            "Protons and neutrons have similar masses, so four nucleons give about four times protium's mass."
          ],
          "answer": "Neutrons account for most of the mass unaccounted for by the two helium protons."
        },
        {
          "title": "NCERT Table 8.1 charge comparison",
          "question": "A nucleus has 8 protons and 8 neutrons. How many electrons does the neutral atom have and why?",
          "steps": [
            "Protons contribute +8 relative charge.",
            "Neutrons contribute zero.",
            "Neutrality requires −8 electronic charge, provided by 8 electrons."
          ],
          "answer": "8 electrons."
        },
        {
          "title": "Particles in ordinary hydrogen",
          "question": "Give the p, n and e counts in a neutral ¹₁H atom.",
          "steps": [
            "Atomic number Z = 1 gives 1 proton.",
            "Mass number A = 1, so neutrons = A−Z = 0.",
            "Neutrality requires 1 electron."
          ],
          "answer": "1 proton, 0 neutrons, 1 electron."
        },
        {
          "title": "Nuclear binding misconception",
          "question": "Does adding neutrons necessarily make every radioactive nucleus stable?",
          "steps": [
            "Neutrons participate in strong nuclear binding without adding electrostatic repulsion.",
            "The nuclear force is short-range and nuclei also face other constraints.",
            "Both neutron/proton balance and nuclear structure determine stability."
          ],
          "answer": "No. Nuclear stability is not governed by a simple 'more neutrons is always better' rule."
        },
        {
          "title": "Iron and uranium neutron calculation",
          "question": "Find neutrons in iron-56 (Z = 26) and uranium-238 (Z = 92).",
          "steps": [
            "For iron-56, n = 56 − 26 = 30.",
            "For uranium-238, n = 238 − 92 = 146.",
            "Their neutron-to-proton ratios differ."
          ],
          "answer": "30 neutrons in iron-56; 146 in uranium-238."
        }
      ],
      "checkQuestions": [
        {
          "question": "Who discovered the neutron and in what year?",
          "answer": "James Chadwick in 1932."
        },
        {
          "question": "Which subatomic particles have nearly equal mass?",
          "answer": "Proton and neutron."
        },
        {
          "question": "Does neutron have a negative charge?",
          "answer": "No. It has zero charge."
        },
        {
          "question": "How many neutrons does protium have?",
          "answer": "Zero."
        }
      ],
      "tip": "Charge accounting uses protons and electrons; mass number counts protons and neutrons. Do not substitute one for the other.",
      "visual": "particles"
    },
    {
      "title": "Element symbols and notation: write each atom clearly",
      "paragraphs": [
        "Dalton used pictorial symbols for elements, but John Berzelius developed more practical letter-based symbols. Modern names and symbols are standardised through IUPAC. A one-letter element symbol is uppercase (C, H, O), and a two-letter symbol starts with uppercase and continues with lowercase (Co, Cl, Al). 'Co' is cobalt, while 'CO' written as a formula means one carbon and one oxygen atom.",
        "Common element symbols include hydrogen H, helium He, carbon C, nitrogen N, oxygen O, fluorine F, neon Ne, aluminium Al, silicon Si, sulfur S, chlorine Cl, argon Ar, calcium Ca, magnesium Mg and zinc Zn. The symbols are not made by simply taking the first two letters of every English name.",
        "Several symbols come from older language names: sodium Na (natrium), potassium K (kalium), iron Fe (ferrum), copper Cu (cuprum), silver Ag (argentum), gold Au (aurum), lead Pb (plumbum), mercury Hg (hydrargyros), and tungsten W (wolfram). Keep capitals and lower-case letters exact: 'CL' and 'NA' are not valid element symbol spellings.",
        "Atomic number Z counts protons and uniquely identifies the element. Mass number A counts protons plus neutrons. In nuclide notation ᴬ_ZX (visually A upper-left and Z lower-left of X), write the appropriate element symbol X based on Z. For example, ²³₁₁Na has A = 23 and Z = 11; avoid mixing up which number goes above.",
        "An element symbol identifies a type of element. An isotope label additionally identifies its nuclear mass number. Chemical ions can gain or lose electrons but do not change their proton number merely by ordinary chemical reactions; therefore ionic charge is conceptually distinct from A and Z."
      ],
      "examples": [
        {
          "title": "IUPAC case distinction",
          "question": "Explain the difference between Co and CO.",
          "steps": [
            "Co is an element symbol with C uppercase and o lowercase.",
            "CO contains two separate uppercase element symbols C and O.",
            "A chemical formula CO represents carbon monoxide, not cobalt."
          ],
          "answer": "Co = cobalt; CO = carbon monoxide."
        },
        {
          "title": "Non-English symbols",
          "question": "Give symbols for sodium, potassium, iron, copper, silver and gold.",
          "steps": [
            "Use names natrium and kalium for sodium and potassium.",
            "Use ferrum, cuprum, argentum and aurum for the others.",
            "Write exact capitals and lower-case letters."
          ],
          "answer": "Na, K, Fe, Cu, Ag, Au."
        },
        {
          "title": "Read ²³₁₁Na",
          "question": "What are the mass number and atomic number written at the left of Na?",
          "steps": [
            "Left superscript is mass number A = 23.",
            "Left subscript is atomic number Z = 11.",
            "Neutron count is calculated later as A−Z."
          ],
          "answer": "A = 23, Z = 11."
        },
        {
          "title": "Correct chemical symbol writing",
          "question": "Which are valid symbol spellings: AL, Al, cl, Cl, Fe, FE?",
          "steps": [
            "A two-letter symbol starts uppercase and continues lowercase.",
            "Al and Cl match IUPAC spelling; Fe has Latin origin.",
            "AL, cl and FE have incorrect case."
          ],
          "answer": "Al, Cl and Fe."
        },
        {
          "title": "Pick elements from Z",
          "question": "Which elements have Z = 6, 8, 11 and 17?",
          "steps": [
            "Element identity follows proton count.",
            "Look up the corresponding atomic numbers in the first-18 table.",
            "Z 6 = carbon, 8 = oxygen, 11 = sodium, 17 = chlorine."
          ],
          "answer": "C, O, Na and Cl."
        }
      ],
      "checkQuestions": [
        {
          "question": "Is FE a correct symbol for iron?",
          "answer": "No; iron is Fe."
        },
        {
          "question": "If ²⁴₁₂Mg and ²⁵₁₂Mg both have Z=12, are they different elements?",
          "answer": "No; they are isotopes of magnesium."
        },
        {
          "question": "Does changing electron number turn sodium into another element?",
          "answer": "No; the number of protons defines the element."
        }
      ],
      "tip": "Case matters in chemical notation. Z is below-left, A above-left, and an ionic charge (if present) is written separately.",
      "visual": "symbols"
    },
    {
      "title": "Atomic number, nucleons, mass number and nuclear arithmetic",
      "paragraphs": [
        "Atomic number is Z = number of protons. In a neutral atom, number of electrons also equals Z. Mass number is A = number of protons + number of neutrons = number of nucleons. Thus neutrons n⁰ = A − Z. A is a whole-number nuclear count, while the measured atomic mass includes the actual masses of all components and binding effects.",
        "Use ᴬ_ZX notation systematically: first read Z (bottom left), then A (top left), use Z to find element identity, obtain protons p = Z and neutrons n = A−Z. For a neutral atom, electrons e = Z; if an ion is supplied, adjust electrons for ionic charge, without changing protons.",
        "NCERT Table 8.3 lists hydrogen-1 as 1 proton and 0 neutrons, helium-4 as 2 and 2, and lithium-7 as 3 and 4. It is wrong to find 'atomic number' by adding all subatomic particles; only the proton count defines the atomic number.",
        "For a neutral ²³₁₁Na: p = 11, n = 12, e = 11. For neutral ³⁵₁₇Cl: p = 17, n = 18, e = 17. For neutral ⁵⁶₂₆Fe: p = 26, n = 30, e = 26. Notice how the same method answers textbook 'Pause and Ponder' items 10–13 and later end exercises.",
        "In the end-of-chapter hypothetical heavy-electron problem, replacing electrons by particles of the same charge but 500 times greater mass changes measured atomic mass, yet Z and A remain nuclear counts and overall electrical neutrality can remain. Do not equate 'mass number' with exact atomic mass in unified atomic mass units.",
        "Hydrogen, chlorine and other elements can have several isotopes with the same Z and different A. The formula A−Z for neutron count works for each isotope; it is not a new atomic number when mass number changes."
      ],
      "examples": [
        {
          "title": "NCERT Pause and Ponder 10: iron",
          "question": "An atom has atomic number 26 and 56 nucleons. Find protons, neutrons and electrons if neutral.",
          "steps": [
            "Z=26 gives 26 protons.",
            "A=56; neutrons=56−26=30.",
            "A neutral atom has 26 electrons."
          ],
          "answer": "26 protons, 30 neutrons, 26 electrons."
        },
        {
          "title": "NCERT Pause and Ponder 11: calcium",
          "question": "A nucleus has 20 protons and mass number 41. How many neutrons?",
          "steps": [
            "Z=20, A=41.",
            "n=A−Z.",
            "41−20=21."
          ],
          "answer": "21 neutrons."
        },
        {
          "title": "NCERT Pause and Ponder 12: chlorine",
          "question": "An atom has 18 neutrons and Z=17. Find mass number.",
          "steps": [
            "A = protons + neutrons.",
            "A = 17 + 18.",
            "A = 35."
          ],
          "answer": "Mass number 35 (chlorine-35)."
        },
        {
          "title": "NCERT Pause and Ponder 13: sodium riddle",
          "question": "A neutral atom ²³A has 11 electrons. Identify Z, symbol and neutron count.",
          "steps": [
            "Neutral electrons equal protons, so Z=11.",
            "Element Z=11 is Na.",
            "n=A−Z=23−11=12."
          ],
          "answer": "Sodium-23, Z=11, 12 neutrons."
        },
        {
          "title": "NCERT exercise 15: heavy electrons",
          "question": "A hypothetical neutral 24-nucleon atom has 12 protons and 12 ordinary electrons. Replace electrons with same-charge particles 500 times heavier. What changes?",
          "steps": [
            "Atomic number stays Z=12 because proton count stays 12.",
            "Mass number stays A=24 because the number of protons+neutrons stays 24.",
            "The total atomic mass increases because the replacement charged particles are heavier.",
            "Net electrical charge remains zero as long as each replacement carries the same −1 charge."
          ],
          "answer": "Atomic mass rises; Z, A and net charge do not change."
        },
        {
          "title": "Nuclide notation and isotopes",
          "question": "Two neutral atoms ³⁵₁₇Cl and ³⁷₁₇Cl are given. List their p, n and e counts.",
          "steps": [
            "Both have Z=17, so p=e=17 each.",
            "Neutrons in ³⁵Cl =35−17=18.",
            "Neutrons in ³⁷Cl =37−17=20."
          ],
          "answer": "Both have 17 protons/electrons; neutron counts are 18 and 20."
        },
        {
          "title": "Additional nuclide: ⁷⁰₃₁Ga",
          "question": "Find p, n and e for neutral gallium-70, ⁷⁰₃₁Ga.",
          "steps": [
            "Read Z=31 and A=70.",
            "p=31; neutrons=70−31=39.",
            "Neutral atom e=31."
          ],
          "answer": "31 protons, 39 neutrons, 31 electrons."
        }
      ],
      "checkQuestions": [
        {
          "question": "If A=40 and Z=18, how many neutrons?",
          "answer": "22."
        },
        {
          "question": "Could two atoms with the same Z but different A be different elements?",
          "answer": "No; they are isotopes of the same element."
        },
        {
          "question": "Is mass number the exact mass of an atom?",
          "answer": "No. It is a whole-number count of nucleons."
        },
        {
          "question": "How do charged ions differ in electron count?",
          "answer": "Positive ions have lost electrons; negative ions have gained electrons without changing Z."
        }
      ],
      "tip": "Take three steps: Z → protons; A−Z → neutrons; neutral electrons=Z (or account for ion charge separately).",
      "visual": "nuclide"
    },
    {
      "title": "Bohr–Bury rules and configurations of every element from H to Ar",
      "paragraphs": [
        "Electron configuration describes how electrons are distributed across shells. For the first 18 neutral elements, start with the number of electrons equal to atomic number Z. Then apply the school-level Bohr–Bury rules: (1) maximum shell capacity is 2n²; (2) no outermost shell holds more than 8 electrons (first K shell at most 2); (3) fill inward shells stepwise before the next shell. K holds up to 2, L holds up to 8, M has capacity 18 by 2n² but generally holds at most 8 while it is the outermost shell for the first 18 elements.",
        "All configurations for Z = 1–10: hydrogen H (1) = 1; helium He (2) = 2; lithium Li (3) = 2,1; beryllium Be (4) = 2,2; boron B (5) = 2,3; carbon C (6) = 2,4; nitrogen N (7) = 2,5; oxygen O (8) = 2,6; fluorine F (9) = 2,7; neon Ne (10) = 2,8. Each comma separates a shell, beginning K then L.",
        "All configurations for Z = 11–18: sodium Na (11) = 2,8,1; magnesium Mg (12) = 2,8,2; aluminium Al (13) = 2,8,3; silicon Si (14) = 2,8,4; phosphorus P (15) = 2,8,5; sulfur S (16) = 2,8,6; chlorine Cl (17) = 2,8,7; argon Ar (18) = 2,8,8. Their first and second shells hold 2 and 8, and the M-shell holds the remaining 1–8.",
        "A common trap is misusing the raw capacity formula 2n² to put 18 electrons into the M shell as if every element must do so. Argon has only Z=18 electrons in TOTAL and its configuration is 2,8,8, not 2,8,18. Potassium Z=19 is beyond the requested table but helps demonstrate why a new shell begins rather than writing 2,8,9 for the simple school configuration: 2,8,8,1.",
        "NCERT Table 8.4 provides proton and neutron numbers for one common isotope for each element, but the shell distribution of a neutral atom depends on electron count/Z, not the number of neutrons. If two isotopes of the same element are both neutral, they have the same number of electrons and the same introductory shell configuration.",
        "To read a shell diagram: count the dots on each circle, beginning at the innermost K shell; add them to get total electrons. For neutral atoms, that sum equals atomic number Z and determines the symbol. The outermost occupied shell gives the valence-electron count. Compare against the textbook first-18 table before computing valency.",
        "A correct shell drawing must show each electron dot once, identify K, L and M if used, and avoid crowding dots so the counts become ambiguous. Shell rings in this model indicate energy levels, not literal physical tubes on which electrons are pinned."
      ],
      "examples": [
        {
          "title": "NCERT Table 8.4: first ten elements",
          "question": "State electron configurations of H, He, Li, Be, B, C, N, O, F and Ne.",
          "steps": [
            "H=1, He=2.",
            "Li=2,1; Be=2,2; B=2,3; C=2,4.",
            "N=2,5; O=2,6; F=2,7; Ne=2,8."
          ],
          "answer": "H 1; He 2; Li 2,1; Be 2,2; B 2,3; C 2,4; N 2,5; O 2,6; F 2,7; Ne 2,8."
        },
        {
          "title": "NCERT Table 8.4: elements 11–18",
          "question": "State configurations of Na, Mg, Al, Si, P, S, Cl and Ar.",
          "steps": [
            "Place first 2 in K and next 8 in L.",
            "Put remaining 1–8 in M.",
            "Na=2,8,1; Mg=2,8,2; Al=2,8,3; Si=2,8,4; P=2,8,5; S=2,8,6; Cl=2,8,7; Ar=2,8,8."
          ],
          "answer": "Na 2,8,1; Mg 2,8,2; Al 2,8,3; Si 2,8,4; P 2,8,5; S 2,8,6; Cl 2,8,7; Ar 2,8,8."
        },
        {
          "title": "NCERT Pause and Ponder 15: selected configurations",
          "question": "Give configurations for atomic numbers 12, 16 and 18.",
          "steps": [
            "12 electrons: K 2, L 8, remaining M 2 → 2,8,2.",
            "16 electrons: 2+8+6 → 2,8,6.",
            "18 electrons: 2+8+8 → 2,8,8."
          ],
          "answer": "Mg 2,8,2; S 2,8,6; Ar 2,8,8."
        },
        {
          "title": "NCERT Pause and Ponder 14: valence counts",
          "question": "Find outermost electrons of ¹²₆C, ¹⁹₉F and ²⁸₁₄Si.",
          "steps": [
            "C Z=6: 2,4 → 4 outermost electrons.",
            "F Z=9: 2,7 → 7 outermost.",
            "Si Z=14: 2,8,4 → 4 outermost."
          ],
          "answer": "4 for C, 7 for F, 4 for Si."
        },
        {
          "title": "Interpret electron-ring counts",
          "question": "A neutral atom diagram shows 2 dots in K, 8 dots in L and 7 in M. Name element.",
          "steps": [
            "Sum electrons 2+8+7=17.",
            "Neutral atom has 17 protons, so Z=17.",
            "Use atomic-number table to identify Cl."
          ],
          "answer": "Chlorine, Cl (Z=17)."
        },
        {
          "title": "Why not 2,8,9 for potassium",
          "question": "Theoretical M capacity from 2n² is 18. Why does the introductory model give K for Z=19 as 2,8,8,1?",
          "steps": [
            "The M shell is outermost while the first 18 atoms build up and is limited by the outermost octet rule.",
            "A new N-shell is used in the basic school filling model when adding the 19th electron.",
            "Full quantum shell/subshell filling is more complex and studied later."
          ],
          "answer": "Simple school-level potassium arrangement: 2,8,8,1."
        },
        {
          "title": "Isotopes and electron configurations",
          "question": "Compare neutral ¹²₆C and ¹⁴₆C electron distributions.",
          "steps": [
            "Both have atomic number Z=6.",
            "Each neutral atom has 6 electrons.",
            "Both fill as K=2 and L=4; neutron count differs."
          ],
          "answer": "Both are 2,4."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is the maximum electron count from 2n² for the M shell?",
          "answer": "18; but an outermost shell is limited to 8 in the Bohr–Bury school model."
        },
        {
          "question": "Why is argon 2,8,8 rather than 2,8,18?",
          "answer": "Argon has 18 total electrons, and the outermost shell has at most 8 in the school model."
        },
        {
          "question": "A neutral 2,8,6 atom has which Z?",
          "answer": "16, sulfur."
        },
        {
          "question": "What determines neutral-atom shell configuration—Z or neutron count?",
          "answer": "Z, because Z gives the number of electrons in a neutral atom."
        }
      ],
      "tip": "Write Z electrons first. Use 2n² AND outermost octet together. Verify sum of your shell entries equals Z.",
      "visual": "config"
    },
    {
      "title": "Valence electrons and valency: combine, lose, gain or share",
      "paragraphs": [
        "The valence shell is the outermost occupied shell, and its electron count is the valence-electron count. Valency, by contrast, is the usual combining capacity of an atom in a compound, often described in introductory NCERT as the number of electrons lost, gained or shared to reach a stable duplet (H/He K shell) or octet.",
        "In NCERT Section 8.8, combine with hydrogen or chlorine, both commonly taken as valency 1, to deduce another atom's combining capacity. Oxygen in H₂O combines with two H atoms, valency 2; nitrogen in NH₃ combines with three H, valency 3; magnesium in MgCl₂ combines with two Cl, valency 2.",
        "For many first-18 elements with 1–3 outer electrons, common school valency equals that number: Li 1, Be 2, B 3, Na 1, Mg 2 and Al 3. They may attain a stable outer arrangement by losing electrons in appropriate compounds; the exact bonding behaviour depends on the element and partner, so 'always loses' is not a universal rule.",
        "For first-18 nonmetals with 5–7 outer electrons, typical valency is 8 minus that count: N 5 outer → valency 3; O 6 → 2; F 7 → 1; P 5 → 3; S 6 → 2; Cl 7 → 1. The numerical relation works for the common school cases and should not be overextended to every chemical compound.",
        "Carbon and silicon each have 4 outer electrons and a common valency of 4, often satisfied through sharing. Helium has a filled K-shell with 2 electrons, while neon and argon have filled outer octets of 8: their simple common valency is 0 and they are largely unreactive.",
        "Do not mix up the number of valence electrons and the valency. Oxygen has SIX valence electrons but valency TWO, while chlorine has SEVEN valence electrons but valency ONE. The noble gases' complete outer shells make them largely unreactive in this introductory treatment.",
        "NCERT Table 8.4 can be extended with a student-calculated valency column: H 1, He 0, Li 1, Be 2, B 3, C 4, N 3, O 2, F 1, Ne 0, Na 1, Mg 2, Al 3, Si 4, P 3, S 2, Cl 1, Ar 0. These are common introductory valencies, not exhaustive oxidation states."
      ],
      "examples": [
        {
          "title": "Oxygen versus chlorine valency",
          "question": "Oxygen is 2,6 and chlorine is 2,8,7. State valence electrons and usual valency.",
          "steps": [
            "O: 6 outer electrons, needs 2 for octet → valency 2.",
            "Cl: 7 outer electrons, needs 1 for octet → valency 1.",
            "The outer-electron count is NOT the valency."
          ],
          "answer": "O: 6 valence electrons, valency 2; Cl: 7 valence electrons, valency 1."
        },
        {
          "title": "Valency from hydrogen ratio",
          "question": "Why does H₂O suggest oxygen valency 2 and NH₃ suggest nitrogen valency 3?",
          "steps": [
            "Hydrogen's simple combining capacity is 1.",
            "One oxygen atom combines with two H atoms in water.",
            "One nitrogen atom combines with three H atoms in ammonia."
          ],
          "answer": "O valency 2; N valency 3."
        },
        {
          "title": "Valency from chlorine ratio",
          "question": "MgCl₂ contains one magnesium atom and two chlorine atoms. If chlorine has valency 1, find Mg valency.",
          "steps": [
            "Two chlorine atoms each contribute combining capacity 1.",
            "They combine with a single Mg.",
            "Therefore the Mg combining capacity is 2."
          ],
          "answer": "Magnesium valency 2."
        },
        {
          "title": "Noble gases",
          "question": "Explain why He, Ne and Ar have simple valency zero.",
          "steps": [
            "He fills K with 2; Ne fills 2,8; Ar fills 2,8,8.",
            "Their outermost shells are already full in the introductory model.",
            "They have little tendency to acquire or share electrons under ordinary conditions."
          ],
          "answer": "Common simple valency 0."
        },
        {
          "title": "Element with configuration 2,8,5",
          "question": "Find element and common valency for Z=15.",
          "steps": [
            "Z=15 is phosphorus.",
            "Configuration 2,8,5 has 5 valence electrons.",
            "Common introductory valency = 8−5 = 3."
          ],
          "answer": "Phosphorus (P), valency 3."
        },
        {
          "title": "NCERT revision table valencies",
          "question": "Give the usual valency sequence for neutral atomic numbers 1 through 10.",
          "steps": [
            "H 1 and He 0.",
            "Li 1, Be 2, B 3, C 4.",
            "N 3, O 2, F 1, Ne 0."
          ],
          "answer": "1,0,1,2,3,4,3,2,1,0."
        },
        {
          "title": "Why sodium commonly forms Na⁺",
          "question": "Sodium has 2,8,1. What electron change gives a full outer shell in the simple model?",
          "steps": [
            "One electron lies in the M shell.",
            "Losing it exposes the filled 2,8 configuration.",
            "Loss of one negative electron leaves a +1 ion charge."
          ],
          "answer": "Sodium commonly loses one electron and forms Na⁺."
        }
      ],
      "checkQuestions": [
        {
          "question": "How many valence electrons does an atom 2,8,7 have? What is its valency?",
          "answer": "Seven valence electrons; common valency one."
        },
        {
          "question": "A 2,8,2 atom has what usual valency?",
          "answer": "Two."
        },
        {
          "question": "Is helium unreactive because of an octet?",
          "answer": "No. Its sole K shell has a full duplet of two electrons."
        },
        {
          "question": "What is the difference between valence electrons and valency?",
          "answer": "Valence electrons are outermost-shell electrons; valency is combining capacity."
        }
      ],
      "tip": "For first-18 common school cases: outer 1–3 → usually same valency; 4 → usually 4; 5–7 → 8−count; full shell → 0. Note the limits.",
      "visual": "valency"
    },
    {
      "title": "Isotopes, isobars, atomic masses and real-world applications",
      "paragraphs": [
        "Isotopes are atoms of the SAME element, so they have the same atomic number Z (same protons) but different mass numbers A due to differing neutrons. Neutral isotopes have equal electron counts and the same basic configuration. Their chemical behaviour is generally very similar because chemistry depends strongly on electron structure; small isotope-dependent differences can still occur, so 'perfectly identical in every property' is too absolute.",
        "Hydrogen has protium ¹₁H (1 proton, 0 neutrons), deuterium ²₁H (1,1), and tritium ³₁H (1,2; radioactive and rare naturally). Carbon examples are ¹²₆C (6 neutrons), ¹³₆C (7) and radioactive ¹⁴₆C (8). Each neutral isotope of carbon still has six electrons and shell configuration 2,4.",
        "Some isotopes have practical applications: uranium-235 is used as fuel in nuclear power generation; cobalt-60 is used for radiotherapy; iodine-131 is used in certain thyroid treatments; and carbon-14 helps estimate the age of once-living materials. These are contextual applications, not suggestions for obtaining or handling radioactive substances.",
        "A unified atomic mass unit u is a small mass unit based on one twelfth of the mass of a carbon-12 atom. The average atomic mass reported for an element in a natural sample reflects the relative abundance of its isotopes. It is NOT an equal-weight arithmetic mean unless the abundances are equal. Weighted average = Σ(isotopic mass × fractional abundance), with abundances summing to 1.",
        "NCERT's simplified chlorine mixture is ³⁵Cl (75%) and ³⁷Cl (25%): average = 35×0.75 + 37×0.25 = 26.25 + 9.25 = 35.5 u. The incorrect simple mean is (35+37)/2 = 36 u. The 35.5 u is an average across isotopes, not a statement that a particular chlorine atom has a mass number of 35.5.",
        "For bromine the exercise states ⁷⁹Br 49.7% and ⁸¹Br 50.3%, giving 79×0.497 + 81×0.503 = 39.263 + 40.743 = 80.006 u, about 80.0 u. The result uses mass-number values as approximate isotope masses as the school textbook does; higher-precision atomic masses require actual measured isotopic masses.",
        "Isobars are atoms of DIFFERENT elements with the same mass number A but different proton number Z. Examples with A=40 are ⁴⁰₁₈Ar (18 protons, 22 neutrons), ⁴⁰₁₉K (19,21) and ⁴⁰₂₀Ca (20,20). Remember that same A does not mean the elements have the same chemical properties.",
        "NCERT's final comparison uses species X (18 protons, 19 neutrons → A=37), Y (17 protons, 18 neutrons → A=35), and Z (17 protons, 20 neutrons → A=37). Y and Z are isotopes since their protons match; X and Z are isobars since their masses match but proton counts differ.",
        "An important distinction is that average atomic mass is usually a fractional measurement in u, while mass number A is always an integer count of protons plus neutrons. Changing isotope mixtures changes the average atomic mass of a sample without changing what element its atoms belong to."
      ],
      "examples": [
        {
          "title": "NCERT Section 8.9: hydrogen isotopes",
          "question": "State proton, neutron and electron counts for neutral ¹₁H, ²₁H and ³₁H.",
          "steps": [
            "All three have Z=1, so one proton and one electron.",
            "Neutrons are A−Z: 0,1,2 respectively.",
            "They are isotopes because Z stays 1 and A changes."
          ],
          "answer": "Protium (1,0,1), deuterium (1,1,1), tritium (1,2,1), ordered (p,n,e)."
        },
        {
          "title": "Carbon isotopes and electron shells",
          "question": "Compare ¹²₆C, ¹³₆C and ¹⁴₆C.",
          "steps": [
            "Each has six protons and six electrons if neutral.",
            "Neutrons are 6,7,8 respectively.",
            "Each neutral atom has electronic configuration 2,4."
          ],
          "answer": "Same Z=6 and 2,4 configuration; differing A and neutron count."
        },
        {
          "title": "NCERT chlorine weighted average",
          "question": "75% of chlorine atoms are mass 35 u and 25% are mass 37 u. Find average atomic mass.",
          "steps": [
            "Convert percentages: 0.75 and 0.25.",
            "35×0.75 + 37×0.25 = 26.25 + 9.25.",
            "Total 35.5 u; do not take simple mean 36 u."
          ],
          "answer": "35.5 u."
        },
        {
          "title": "NCERT Pause and Ponder 18: bromine",
          "question": "Bromine isotopes have masses 79 u (49.7%) and 81 u (50.3%). Calculate average.",
          "steps": [
            "Percentages become 0.497 and 0.503.",
            "79×0.497 = 39.263 u; 81×0.503 = 40.743 u.",
            "Sum = 80.006 u."
          ],
          "answer": "80.006 u, approximately 80.0 u."
        },
        {
          "title": "NCERT exercise 3: X/Y/Z nuclei",
          "question": "X:18p 19n, Y:17p 18n, Z:17p 20n. Identify isotope and isobar pairs.",
          "steps": [
            "X A=37 Z=18 (argon), Y A=35 Z=17 (chlorine), Z A=37 Z=17 (chlorine).",
            "Y and Z have same Z but different A → isotopes.",
            "X and Z have same A but different Z → isobars."
          ],
          "answer": "Y/Z isotopes; X/Z isobars."
        },
        {
          "title": "A=40 isobar group",
          "question": "Compare ⁴⁰₁₈Ar, ⁴⁰₁₉K and ⁴⁰₂₀Ca.",
          "steps": [
            "All have A=40.",
            "Their atomic numbers are 18,19,20.",
            "Neutron counts are 22,21,20; different elements have same A."
          ],
          "answer": "They are isobars."
        },
        {
          "title": "Common isotope-application pairs",
          "question": "Match ²³⁵U, ⁶⁰Co, ¹³¹I and ¹⁴C with common applications.",
          "steps": [
            "Uranium-235: energy generation in nuclear reactors.",
            "Cobalt-60: cancer radiation therapy.",
            "Iodine-131: thyroid-related medical treatments.",
            "Carbon-14: radiocarbon dating of formerly living objects."
          ],
          "answer": "U-235 → nuclear fuel; Co-60 → radiotherapy; I-131 → thyroid treatment; C-14 → dating."
        },
        {
          "title": "Weighted mean versus ordinary mean",
          "question": "Why can chlorine's average atomic mass be 35.5 u even when the depicted isotopes are approximately 35 u and 37 u?",
          "steps": [
            "Atomic masses are averaged with the natural abundance proportions.",
            "35 u occurs 75% of the time and 37 u only 25% in the textbook example.",
            "An average may lie between isotope values even though no atom has that mass number."
          ],
          "answer": "35.5 u is a weighted average across many atoms, not a fractional nucleon count."
        }
      ],
      "checkQuestions": [
        {
          "question": "Two atoms both have A=40 but different Z. Are they isotopes or isobars?",
          "answer": "Isobars."
        },
        {
          "question": "Natural chlorine is 3 parts ³⁵Cl to 1 part ³⁷Cl. Average using textbook masses?",
          "answer": "35.5 u."
        },
        {
          "question": "If two neutral carbon isotopes differ by two neutrons, do they have different atomic numbers?",
          "answer": "No, both still have Z=6."
        },
        {
          "question": "Is measured atomic mass identical to mass number?",
          "answer": "No; A is an integer nucleon count, atomic mass is physical mass commonly expressed in u."
        }
      ],
      "tip": "IsoTOPes: same bottom number Z, different top A. IsoBARs: same top A, different Z. Weighted mass must use relative abundances.",
      "visual": "isotopes"
    }
  ]
};
window.CBSE_CLASS9_SCIENCE_FULL_NOTES=Object.assign({},window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{}, {'Journey Inside the Atom':chapter});
})();
