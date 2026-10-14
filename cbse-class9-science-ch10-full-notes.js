/* Original StudyAI Grade 9 Science Chapter 10 lessons; NCERT Exploration 2026–27, iesc110.pdf, pp. 184–207. */
(()=>{
'use strict';
const chapter={
  "sourceBook": "Exploration · Textbook of Science for Grade 9",
  "sourcePdf": "iesc110.pdf",
  "printedPages": "184–207",
  "reviewStatus": "Reconciled with NCERT 2026 chapter text and actual graph figures; official PDF was too large to fetch directly; independent teacher/visual editorial review outstanding",
  "lead": "From a plucked string to a SONAR echo, follow the energy of sound through vibrating sources, materials, compressions and rarefactions. Learn to decode NCERT density–distance graphs, calculate frequency/period/wavelength, compare sound in different media, understand pitch and timbre, and solve echo and ultrasound problems with step-by-step examples.",
  "sections": [
    {
      "title": "Sound begins with vibration: instruments, voices and tuning forks",
      "paragraphs": [
        "Sound is a form of mechanical energy produced when a source vibrates. A vibration is a repeated to-and-fro motion around a mean position. Sound is not a substance thrown out from an object: its source makes nearby particles move back and forth, producing a travelling disturbance. NCERT Section 10.1 begins by revisiting instruments and examples of vibrating materials.",
        "NCERT Activity 10.1 explores vibrating rubber bands fixed across a small box. When a band is plucked, its visible or felt to-and-fro motion is associated with sound; as its vibrations die away, the sound also fades. A string of a guitar, sitar or tanpura vibrates. The air, sound box or resonating body helps couple the vibration to the surrounding air and can greatly influence loudness and tone.",
        "Different instruments vibrate differently. Tabla and mridangam have vibrating stretched membranes, a bansuri or flute has a vibrating air column, and the taal produces sound from vibrating metal. In a guitar the string initiates the vibration and the acoustic body radiates much of the sound. A human voice is produced when exhaled air makes vocal folds (often called vocal cords) in the larynx vibrate; the throat, mouth and nose shape the resulting sound.",
        "NCERT Activity 10.2 uses a U-shaped tuning fork with metal prongs (tines). When struck with a suitable pad, its prongs vibrate and disturb nearby air; the motion may be shown when a prong touches water. A tuning fork is useful because it produces a nearly single-frequency sound. The oscillation, rather than simply touching the fork, is the cause of the sound.",
        "Sound also has social and cultural roles. The chapter's Threads of Curiosity describes Kongthong village in Meghalaya and the Jingrwai Iawbei tradition of individually composed tune names. It is an example of how pitch, rhythm and sound patterns can communicate meaning beyond spoken words. The associated physical idea is that distinct time-varying sound signals can be recognised.",
        "The frequency of vibration is a key property of the SOURCE. If a vibrating object produces a higher frequency while the medium stays unchanged, listeners usually hear a higher pitch; that does not automatically mean the wave moves faster through the medium. A source with stronger vibration may generate a wave of larger amplitude, but amplitude and pitch describe different qualities.",
        "Students should be able to name the vibrating part of an example—string, metal prong, membrane, air column or vocal folds—then describe how its oscillation starts a disturbance in the surrounding medium. The instrument or source does not have to travel from the stage to the listener."
      ],
      "examples": [
        {
          "title": "Activity 10.1: where sound originates",
          "question": "A plucked guitar string is seen vibrating and later stops. What made the sound and why did it fade?",
          "steps": [
            "The pluck displaces the string from its mean position.",
            "The string vibrates and transfers energy into the body and nearby air.",
            "As vibration loses energy, amplitude and audible sound reduce."
          ],
          "answer": "The vibrating string is the source; sound fades as vibrations decay."
        },
        {
          "title": "Identify the vibrating medium in instruments",
          "question": "Identify the principal vibrating part in a bansuri, tabla, tuning fork and a human voice.",
          "steps": [
            "Bansuri: an air column vibrates.",
            "Tabla: a stretched membrane vibrates.",
            "Tuning fork: metal prongs vibrate.",
            "Voice: vocal folds in the larynx vibrate."
          ],
          "answer": "Air column; stretched membrane; tuning-fork prongs; vocal folds."
        },
        {
          "title": "Activity 10.2: tuning fork and water",
          "question": "Why may water near a vibrating tuning-fork tine be disturbed while water near a nonvibrating one remains nearly still?",
          "steps": [
            "The vibrating tine oscillates quickly.",
            "Contact transfers some mechanical vibration to water.",
            "Without tine vibration, the extra disturbance is absent."
          ],
          "answer": "Vibrating tines can transfer motion to water, providing evidence of their vibration."
        },
        {
          "title": "Source frequency versus loudness",
          "question": "Two students produce the same note, but one plucks a string more strongly. Which feature is most directly increased?",
          "steps": [
            "The string may vibrate with larger displacement amplitude.",
            "A stronger vibration often transfers more sound energy to air.",
            "Pitch depends mainly on frequency, not the strength of plucking."
          ],
          "answer": "Typically amplitude and loudness increase; pitch need not."
        },
        {
          "title": "NCERT Pause and Ponder 2: list sources",
          "question": "Name four musical instruments and describe the parts that vibrate.",
          "steps": [
            "Choose string instrument: sitar → strings.",
            "Choose membrane instrument: tabla → stretched drumhead.",
            "Choose air-column instrument: bansuri → air column.",
            "Choose metal instrument: taal → metal plates."
          ],
          "answer": "Sitar strings; tabla membrane; bansuri air; taal metal."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is an oscillation?",
          "answer": "One complete to-and-fro motion about a mean position."
        },
        {
          "question": "Which part of a tuning fork vibrates?",
          "answer": "Its prongs, also called tines."
        },
        {
          "question": "Does a louder sound necessarily have a higher frequency?",
          "answer": "No; amplitude and frequency are distinct."
        },
        {
          "question": "Where does human voice sound originate?",
          "answer": "From the vibration of vocal folds in the larynx."
        }
      ],
      "tip": "When asked how sound is produced, name the vibrating component and state how it disturbs nearby medium particles.",
      "visual": "sources"
    },
    {
      "title": "A mechanical wave needs a material medium: solids, liquids, gases and vacuum",
      "paragraphs": [
        "Sound must travel through material particles. In air, those particles are gas molecules; in water they are liquid particles; in a wooden desk they are particles of a solid. Because sound requires matter for propagation, it is classified as a MECHANICAL wave. Ordinary audible sound cannot propagate across an ideal vacuum.",
        "NCERT Activity 10.3 explores hearing sound through a wooden surface. Vibration travels through the solid and reaches the ear; the desk itself does not have to shift bodily from the source to the listener. Activity 10.4 compares sound produced by tapped objects in air and when submerged, showing that water can transmit sound vibrations.",
        "The textbook's vacuum bell jar diagram shows an electric bell operating inside a jar while a pump removes much of the air. Even if the bell's striker continues moving, the detected sound becomes faint as the gas particles are removed. This illustrates that the missing material medium, not merely the absence of a moving striker, prevents propagation. In a real setup the jar, base and apparatus can transmit some vibration, so 'perfect silence' is an idealised conclusion for a perfect vacuum.",
        "In outer space, near-vacuum separates distant astronauts. A bare mechanical clank or spoken voice cannot travel through the empty gap as a sound wave. Astronauts use electronic communication: the microphone converts pressure oscillations to signals, electromagnetic radio waves cross the vacuum, and a receiver/speaker creates sound again inside another pressurised helmet.",
        "Light is different: it is an electromagnetic wave and does not need a material medium. A faraway flash reaches an observer long before an audible boom in air because light travels much faster than sound. In vacuum, the visual flash could be seen but no direct sound would reach a distant observer through the void.",
        "Sound's propagation speed depends on the material's mechanical properties, including compressibility and density, and its temperature. It is often fastest in solids and slowest in gases in the textbook's examples, but the material is the transmission path, not a conveyor moving individual particles all the way.",
        "To answer an assertion–reason question: 'Bell sound becomes faint as air is removed' is true, and 'sound requires a material medium' is true and explains the observation. Distinguish this from the incorrect claim that a source must stop vibrating whenever the sound cannot reach the listener."
      ],
      "examples": [
        {
          "title": "Activity 10.3: wooden desk",
          "question": "A scratch at one end of a desk can be detected through the wood. What does that establish?",
          "steps": [
            "The scratch creates mechanical vibration at one place.",
            "Solid particles transmit the disturbance through the wood.",
            "The observation shows sound can travel in solids."
          ],
          "answer": "A solid such as wood can act as a sound medium."
        },
        {
          "title": "Activity 10.4: underwater sound",
          "question": "Metal spoons tapped underwater may still be heard. Why?",
          "steps": [
            "The impact vibrates both the metal and nearby water.",
            "A changing pressure disturbance travels through the water.",
            "Sound propagates through liquids as well as gases."
          ],
          "answer": "Water is a material medium capable of transmitting sound."
        },
        {
          "title": "Bell jar assertion–reason",
          "question": "A: An electric bell becomes harder to hear as air is removed. R: Sound needs material particles to carry the disturbance. Assess.",
          "steps": [
            "The striker may keep vibrating even with little air.",
            "Reduced gas means less direct propagation of sound to a listener.",
            "Both A and R are true and R explains A."
          ],
          "answer": "Both true; reason is the correct explanation."
        },
        {
          "title": "Sound versus light in space",
          "question": "A film shows a distant spacecraft event with simultaneous flash and bang. What is wrong?",
          "steps": [
            "Light can propagate through vacuum to the observer.",
            "Sound needs a medium and cannot cross the empty space.",
            "In air, even if sound propagates, it travels much more slowly than light."
          ],
          "answer": "A flash may be seen, but no direct vacuum sound arrives."
        },
        {
          "title": "How radio helps astronauts talk",
          "question": "Explain why astronauts can speak through radios rather than shouting directly across a vacuum.",
          "steps": [
            "Microphone converts sound vibration into an electrical signal.",
            "The transmitter sends an electromagnetic signal through vacuum.",
            "A receiver recreates audible sound inside another suit."
          ],
          "answer": "Communication crosses vacuum via electromagnetic waves, not travelling sound."
        },
        {
          "title": "Compare medium and source",
          "question": "A tuning fork vibrates in a sealed evacuated jar. Does inability to hear it prove that its prongs stopped moving?",
          "steps": [
            "The fork can keep vibrating.",
            "There may not be enough gas to transmit sound toward the listener.",
            "No detected sound does not logically imply no vibration."
          ],
          "answer": "No; source oscillation and sound transmission are different."
        }
      ],
      "checkQuestions": [
        {
          "question": "Can ordinary sound propagate in an ideal vacuum?",
          "answer": "No."
        },
        {
          "question": "Can sound be transmitted through a liquid?",
          "answer": "Yes; water transmits sound."
        },
        {
          "question": "Why can a flash be seen across space?",
          "answer": "Light is electromagnetic and propagates in vacuum."
        },
        {
          "question": "Which waves carry spacesuit radio messages through vacuum?",
          "answer": "Electromagnetic radio waves."
        }
      ],
      "tip": "Never confuse a wave's source with its transmission path; a vibrating source does not guarantee audible sound when no medium exists.",
      "visual": "media"
    },
    {
      "title": "How sound propagates: compressions, rarefactions and longitudinal motion",
      "paragraphs": [
        "A vibrating object pushes on nearby air during one half-cycle and withdraws in the other. Where neighbouring air particles are temporarily more crowded, the density and pressure are higher: a COMPRESSION, labelled C. Where particles are more spread out, density and pressure are lower: a RAREFACTION, labelled R. Successive high/low regions form the travelling longitudinal sound wave.",
        "NCERT Activity 10.5 introduces a slinky. Pushing and pulling the coils along the length of the slinky sends bunching and spreading regions onward. In a spring model the coils move locally; in a gas the molecules collide and collectively transmit small pressure/density disturbances while their average positions have no sustained forward drift caused by the sound wave.",
        "A LONGITUDINAL wave has its medium particle displacement PARALLEL to the direction in which the wave travels. Ordinary sound in air is longitudinal. A TRANSVERSE wave has medium displacement PERPENDICULAR to propagation, like an ideal string wave moving to the right while string elements move up and down. Light waves are transverse electromagnetic waves, not a mechanical string disturbance.",
        "Consider the piston-and-tube picture: during its forward stroke, a piston makes air near it more dense and starts a compression travelling down the tube. On return it produces a lower-density rarefaction. A distant receiver detects alternating changes in pressure. The piston itself does not travel to that receiver, and neither does one single parcel of gas.",
        "In a schematic strip, dense vertical bands stand for compressions and thinly spaced bands for rarefactions. A compression is not a hard object or lump of particles travelling with the whole air mass. An individual particle oscillates about a mean position, carrying energy to neighbours; the PATTERN of compression and rarefaction propagates.",
        "NCERT Pause and Ponder 4 asks: A—compressions and rarefactions move through the medium; R—individual particles continuously move forward with the wave. A is true and R false. In general fluid mechanics a medium can have slow net background flow too, but that is separate from the small oscillation produced by an ideal sound wave.",
        "Some solids support both transverse and longitudinal mechanical waves, whereas gases do not support ordinary bulk transverse shear sound waves. Avoid the sweeping claim that all sound in every possible material must always have the identical polarisation; in Class 9 examples of air and water, longitudinal compression waves are the central model.",
        "One complete spatial pattern from a compression to the next compression (or a rarefaction to the next rarefaction) corresponds to one wavelength λ. The distance from a compression centre to the adjacent rarefaction centre is half a wavelength λ/2."
      ],
      "examples": [
        {
          "title": "Slinky illustration",
          "question": "A slinky pulse moves to the right as coils alternately bunch and separate. Which quantity travels right?",
          "steps": [
            "Coils oscillate along the spring close to mean positions.",
            "The bunching/spacing pattern moves onward.",
            "Energy is transmitted through repeated mechanical interactions."
          ],
          "answer": "The disturbance and energy travel right, not individual coils."
        },
        {
          "title": "Pause and Ponder 4: assertion and reason",
          "question": "A: Compressions and rarefactions propagate. R: Each air particle permanently advances with them. Choose the true statements.",
          "steps": [
            "Travelling high/low density regions are a propagating wave.",
            "Particles oscillate and do not migrate along the whole path.",
            "Thus A is true and R false."
          ],
          "answer": "Assertion true; reason false."
        },
        {
          "title": "Transverse versus longitudinal",
          "question": "A rope wave propagates horizontally and the rope elements move vertically. What wave type is it?",
          "steps": [
            "Wave direction is horizontal.",
            "Element displacement is vertical—perpendicular to wave direction.",
            "That is the definition of a transverse disturbance."
          ],
          "answer": "Transverse wave."
        },
        {
          "title": "Sound in air",
          "question": "An air particle vibrates left and right while sound propagates right. Classify the wave.",
          "steps": [
            "Particle displacement lies along propagation direction.",
            "This is parallel displacement.",
            "That matches a longitudinal wave."
          ],
          "answer": "Longitudinal."
        },
        {
          "title": "Identify compression and rarefaction",
          "question": "A drawing has region X with tightly packed particles and region Y with widely spaced particles. Identify the regions.",
          "steps": [
            "Close spacing means relatively high density and pressure.",
            "Larger spacing means relatively low density and pressure.",
            "Use C for compression and R for rarefaction."
          ],
          "answer": "X is a compression; Y is a rarefaction."
        },
        {
          "title": "Distance between C and R",
          "question": "The distance between a compression crest and the adjacent rarefaction trough is 1.5 cm. Find wavelength.",
          "steps": [
            "Adjacent opposite extremes are half a cycle apart.",
            "λ/2 = 1.5 cm.",
            "Multiply by two: λ = 3.0 cm."
          ],
          "answer": "3.0 cm."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is higher in a compression: density or empty spacing?",
          "answer": "Density and pressure are higher."
        },
        {
          "question": "In air sound, do molecules follow the wave from a singer to a listener?",
          "answer": "No; they oscillate near their mean positions."
        },
        {
          "question": "What separates a longitudinal wave from a transverse wave?",
          "answer": "Particle motion parallel versus perpendicular to propagation."
        },
        {
          "question": "Crest to adjacent trough is what fraction of λ?",
          "answer": "λ/2."
        }
      ],
      "tip": "Use two arrows on diagrams: one for wave travel and one for local particle motion. They are parallel in a longitudinal wave.",
      "visual": "longitudinal"
    },
    {
      "title": "Energy travels, not matter: grains, microphones and speakers",
      "paragraphs": [
        "Sound transports ENERGY. NCERT Activity 10.6 demonstrates this with small grains on a stretched membrane: nearby sound vibrations can shake the membrane, making grains jump even though the source has not directly touched the membrane. The grains move because energy is transferred through the intervening medium.",
        "The energy involved is mechanical. Vibrating particles can do work on neighbouring particles because they exert fluctuating forces, transferring energy down a chain. The overall disturbance travels while individual particles stay near their mean positions and lose energy through friction and other dissipative effects.",
        "Sound is a pressure disturbance with small alternating changes in particle motion, pressure and density. The energy flow typically diminishes with spreading and absorption. An apparent reduction in sound loudness is not evidence that sound itself needs to carry its air particles with it.",
        "An ordinary MICROPHONE converts vibrations of a diaphragm caused by sound pressure into varying electrical signals. An ordinary LOUDSPEAKER does the reverse: varying electrical current in a driver produces motion of a cone or diaphragm that disturbs nearby air. In practice there are energy losses, so this is an energy conversion rather than a perfectly efficient loop.",
        "A phone recording is therefore a representation of variations in sound pressure converted to data, not a bucket of air transferred from source to phone. Playing the recording makes a new source of sound at the speaker.",
        "Energy-transfer questions often mention oscillating particles and travelling waves in the same sentence. Explain that 'travels' refers to the wave pattern and energy, not sustained transport of medium particles across the entire source-to-listener distance."
      ],
      "examples": [
        {
          "title": "Activity 10.6: dancing grains",
          "question": "A sound source makes grains on a nearby stretched membrane move. What does it demonstrate?",
          "steps": [
            "Sound waves travel through the air between source and membrane.",
            "They exert alternating forces on the membrane.",
            "Energy transferred to the membrane causes its vibration and moves grains."
          ],
          "answer": "Sound transports mechanical energy."
        },
        {
          "title": "Pause and Ponder 5",
          "question": "What reaches the listener when a tuning fork sounds: metal, the original nearby air particles, or sound energy?",
          "steps": [
            "The fork prongs remain at the source.",
            "Nearby air particles do not travel all the way to the ear.",
            "A sequence of pressure and energy disturbances reaches the ear."
          ],
          "answer": "Energy carried by sound waves."
        },
        {
          "title": "Microphone energy change",
          "question": "What is the main useful energy conversion in a microphone?",
          "steps": [
            "Sound pressure makes its diaphragm move.",
            "The device senses motion and produces an electrical signal.",
            "In recording, the useful output is electrical information about the sound."
          ],
          "answer": "Sound/mechanical energy → electrical signals."
        },
        {
          "title": "Speaker energy change",
          "question": "A speaker cone vibrates when a music signal is applied. What conversion is taking place?",
          "steps": [
            "An electrical signal drives the cone.",
            "Cone motion creates pressure waves in air.",
            "Those waves carry sound energy outward."
          ],
          "answer": "Electrical energy → mechanical vibration → sound energy."
        },
        {
          "title": "Energy and decreasing intensity",
          "question": "Why is a far-off source normally less intense than a nearby one?",
          "steps": [
            "Its radiated energy has spread across a wider wavefront.",
            "Air and objects can also absorb or scatter sound energy.",
            "Less energy crosses each unit area per second at greater distances."
          ],
          "answer": "Intensity generally decreases with increasing distance."
        }
      ],
      "checkQuestions": [
        {
          "question": "What travels in a sound wave: matter or energy?",
          "answer": "Energy and the travelling disturbance."
        },
        {
          "question": "What useful signal comes from a microphone?",
          "answer": "An electrical signal representing sound pressure variations."
        },
        {
          "question": "Can sound cause a different membrane to vibrate without direct physical contact?",
          "answer": "Yes, via the mechanical wave in air."
        }
      ],
      "tip": "Give cause-and-effect: source oscillation → wave energy transfer → receiver vibration.",
      "visual": "energy"
    },
    {
      "title": "Read density–distance graphs: crests, troughs, λ, λ/2 and full cycles",
      "paragraphs": [
        "NCERT Fig. 10.16 converts alternating compressions and rarefactions into a DENSITY–DISTANCE graph. The horizontal axis x is position in the medium at one moment; the vertical axis is density of the medium, usually shown as variations about average density. A horizontal dashed line marks average density.",
        "A CREST is the highest point (maximum density, centre of a compression C). A TROUGH is the lowest point (minimum density, centre of a rarefaction R). The vertical height of a crest above the average-density line represents the density AMPLITUDE. On a sinusoidal plot, the vertical height is not the physical vertical displacement of a sound-carrying air molecule: the y-axis is density.",
        "A WAVELENGTH λ is the horizontal distance from crest to NEXT crest, trough to NEXT trough, or compression centre to NEXT compression centre. A crest to the immediately following trough measures λ/2. The horizontal scale is metres or centimetres; the vertical scale can show density in suitable units. Never confuse 'amplitude 3 units' with 'wavelength 3 cm'.",
        "NCERT Fig. 10.19 shows consecutive crests separated by 3.0 cm, so λ=3.0 cm and half a wavelength is 1.5 cm. In a schematic density strip or a sinusoidal graph, first count repeating FULL cycles rather than individual high-density bands or every crossing of the mean line.",
        "NCERT Fig. 10.32 (end exercise Q13) shows an 8 cm span encompassing FOUR repeated compression-to-compression distances; therefore λ = 8 cm / 4 = 2 cm = 0.02 m. With speed 340 m/s, frequency ν = 340 / 0.02 = 17,000 Hz.",
        "NCERT Fig. 10.33 (end exercise Q14) has two curves, RED/PINK A and BLUE B. Wave A has two complete cycles in 5 cm and therefore λ_A=2.5 cm; Wave B has one complete cycle in 5 cm and therefore λ_B=5.0 cm. For both waves travelling at 345 m/s, ν_A=13,800 Hz and ν_B=6,900 Hz. The user-provided Gemini audit REVERSED the A and B wavelength labels; this course uses the figure's correct labels.",
        "Fig. 10.30 compares two density graphs with the same vertical and horizontal scales: the bigger crest-to-trough height implies greater density amplitude, while farther spaced crests imply greater λ. Use only the axes; if the two graphs do NOT have the same scales, their visible heights or horizontal spans are not directly comparable.",
        "Fig. 10.31 asks to assign three wave sources A, B and C based on frequency. Under the same medium conditions, shorter wavelength corresponds to higher ν because ν = v/λ; longest wavelength corresponds to smallest ν. A may have maximum frequency but not necessarily maximum intensity."
      ],
      "examples": [
        {
          "title": "Pause and Ponder 9: half a wavelength",
          "question": "Fig. 10.19 shows two successive crests separated by 3.0 cm. What is λ/2?",
          "steps": [
            "Wavelength λ is 3.0 cm.",
            "Half a wavelength is 3.0/2.",
            "Result = 1.5 cm."
          ],
          "answer": "1.5 cm."
        },
        {
          "title": "Q7: graph with density amplitude 3 and λ=4 cm",
          "question": "How should a schematic wave be labelled?",
          "steps": [
            "Mark x-axis distance in cm and y-axis density variation in units.",
            "Place mean-density dashed line at vertical zero.",
            "Put crest at +3 and trough at −3 relative units.",
            "Mark crest-to-crest distance 4 cm."
          ],
          "answer": "Density amplitude 3 units; wavelength 4 cm, independently labelled."
        },
        {
          "title": "Q13: compression strip 8 cm / 4 cycles",
          "question": "An 8 cm strip spans four identical complete C–R cycles. Find λ.",
          "steps": [
            "Four wavelengths occupy 8 cm.",
            "λ=8/4=2 cm.",
            "Convert 2 cm to 0.02 m if speed calculation follows."
          ],
          "answer": "2 cm (0.02 m)."
        },
        {
          "title": "Q13: frequency in air",
          "question": "For λ=0.02 m and v=340 m/s, calculate ν.",
          "steps": [
            "Use v=λν.",
            "ν=v/λ=340/0.02.",
            "Result 17,000 per second."
          ],
          "answer": "17,000 Hz (17 kHz)."
        },
        {
          "title": "Q14: Figure 10.33 labels correctly",
          "question": "The textbook's pink/red A curve repeats twice in 5 cm, while blue B repeats once. Find wavelengths.",
          "steps": [
            "A: 5.0 cm / 2 complete cycles = 2.5 cm.",
            "B: 5.0 cm / 1 complete cycle = 5.0 cm.",
            "The Gemini audit interchanged the labelled wave identities; avoid reproducing it."
          ],
          "answer": "λ_A=2.5 cm, λ_B=5.0 cm."
        },
        {
          "title": "Q14: calculate both frequencies",
          "question": "Two waves travel at 345 m/s. Their wavelengths are λ_A=2.5 cm and λ_B=5.0 cm. Calculate ν.",
          "steps": [
            "Convert wavelengths: A=0.025 m; B=0.050 m.",
            "ν_A=345/0.025=13,800 Hz.",
            "ν_B=345/0.05=6,900 Hz."
          ],
          "answer": "A 13,800 Hz; B 6,900 Hz."
        },
        {
          "title": "Compare amplitude and wavelength",
          "question": "Graph X has higher crests and closer-spaced crests than Y, on identical scales. Which has bigger amplitude and which bigger λ?",
          "steps": [
            "Amplitude follows vertical height: X bigger.",
            "Wavelength follows horizontal spacing: Y bigger.",
            "At fixed speed, X's shorter λ would mean higher frequency."
          ],
          "answer": "X larger amplitude; Y larger wavelength."
        },
        {
          "title": "Compression to next rarefaction",
          "question": "C to next adjacent R is 4 cm. What is λ?",
          "steps": [
            "C centre is a crest and next R centre a trough.",
            "They are half wavelength apart.",
            "λ=2×4=8 cm."
          ],
          "answer": "8 cm."
        }
      ],
      "checkQuestions": [
        {
          "question": "On a density-distance graph is the y-axis vertical motion of air molecules?",
          "answer": "No. It displays density (or density variation)."
        },
        {
          "question": "What is λ between consecutive crests?",
          "answer": "The horizontal distance from one crest to the next."
        },
        {
          "question": "Fig. 10.33: Which wave has higher frequency, A or B?",
          "answer": "A, because its wavelength is 2.5 cm rather than B's 5 cm at equal speed."
        },
        {
          "question": "If a segment spans four wavelengths, what is λ?",
          "answer": "The total distance divided by 4."
        }
      ],
      "tip": "Count full crest-to-crest cycles; correctly identify A versus B in Fig. 10.33. Unit conversions come after counting.",
      "visual": "graphs"
    },
    {
      "title": "Frequency, period, wavelength, amplitude and intensity: precise quantities",
      "paragraphs": [
        "FREQUENCY, denoted ν (Greek nu) in NCERT and often f elsewhere, counts complete density oscillations past a fixed point each second. Its SI unit is hertz Hz = s⁻¹. For N cycles in time t, ν=N/t. For example 10 complete oscillations in 2 s means ν=5 Hz.",
        "TIME PERIOD T is the time for one complete cycle at a fixed point. The relationship is ν=1/T or T=1/ν. If the frequency is 5 Hz, T=0.2 s; if T=0.01 s, ν=100 Hz. Label carefully: ν (Greek nu) means frequency, while Latin v means SPEED. Some rendered fonts make these look similar, so put the word next to the symbol.",
        "WAVELENGTH λ is the spatial length of a complete repeat. At a given instant two adjacent density crests are separated by λ. In the same medium under identical conditions, a wave with higher ν must have smaller λ because v=νλ and v stays essentially fixed.",
        "DENSITY AMPLITUDE is the maximum departure of density from its average. The amplitude is a physical magnitude of the disturbance, not a synonym for frequency. Larger amplitude commonly corresponds to more energy and greater perceived loudness, but the exact connection to sensation is complex.",
        "INTENSITY I is the sound energy crossing an area per unit time per unit area perpendicular to propagation: I=energy/(area×time)=power/area. Unit W/m². For an approximately isotropic source in open space, the same total wave power spreads over a sphere of area 4πr², so intensity scales approximately as 1/r² when absorption/reflections are negligible.",
        "These concepts are measured under different conditions: ν and T measure a temporal cycle, λ a spatial cycle, amplitude a density variation, and intensity energy flow. Pitch and loudness are perceptions, not direct laboratory synonyms for ν and I. All five quantities can appear together on an exam question.",
        "NCERT Activity 10.7 introduces a phone audio spectrum display such as Phyphox to visualise note frequencies Sa–Re–Ga–Ma–Pa–Dha–Ni–Sa. Use controlled, comfortable listening levels for any classroom demonstration. A displayed peak near a frequency is not the only frequency in a complex instrumental note; real voices and instruments typically contain overtones."
      ],
      "examples": [
        {
          "title": "NCERT Example 10.1: ν and T",
          "question": "10 density oscillations occur in 2 s. Calculate frequency and time period.",
          "steps": [
            "ν=N/t=10/2=5 Hz.",
            "T=1/ν=1/5=0.2 s.",
            "Check: 5 cycles per second × 0.2 s per cycle =1."
          ],
          "answer": "Frequency 5 Hz; period 0.2 s."
        },
        {
          "title": "NCERT Q3: 20 compressions / 4 s",
          "question": "20 successive compression events pass a point in 4 s. Determine ν.",
          "steps": [
            "Count approximately one compression event per complete cycle in the repeating pattern.",
            "ν=20/4.",
            "ν=5 Hz."
          ],
          "answer": "5 Hz."
        },
        {
          "title": "Pause and Ponder 8: piston 20 Hz",
          "question": "A piston oscillates 20 times per second. How many cycles per minute?",
          "steps": [
            "Frequency = 20 s⁻¹.",
            "Time =60 s.",
            "N=20×60=1200 oscillations."
          ],
          "answer": "1,200 oscillations."
        },
        {
          "title": "Period of 50 Hz wave",
          "question": "Find T for ν=50 Hz.",
          "steps": [
            "Use T=1/ν.",
            "T=1/50.",
            "T=0.020 s."
          ],
          "answer": "0.020 s."
        },
        {
          "title": "Convert kilohertz",
          "question": "Convert 2.5 kHz to Hz and find the period.",
          "steps": [
            "2.5 kHz=2.5×1000=2500 Hz.",
            "T=1/2500 s.",
            "T=0.0004 s =0.4 ms."
          ],
          "answer": "2500 Hz; 0.0004 s."
        },
        {
          "title": "Intensity calculation",
          "question": "A uniform 2 W sound energy flow crosses an area of 4 m² in the idealised model. What is I?",
          "steps": [
            "Intensity = power/area.",
            "I=2/4 W/m².",
            "Result 0.5 W/m²."
          ],
          "answer": "0.5 W/m²."
        },
        {
          "title": "Spherical spreading comparison",
          "question": "If distance from a point source doubles in ideal free-field conditions, what happens to intensity?",
          "steps": [
            "Spherical surface area grows proportional to r².",
            "Doubling radius increases area by 2²=4.",
            "The same power across four times area gives one-quarter intensity."
          ],
          "answer": "Intensity approximately one-quarter."
        },
        {
          "title": "ν versus v typography",
          "question": "Write 'speed' and 'frequency' for v and ν in v=λν.",
          "steps": [
            "Latin v is the wave propagation speed measured in m/s.",
            "Greek ν (nu) is frequency measured in Hz.",
            "Lambda λ is wavelength measured in metres."
          ],
          "answer": "v=speed; ν (or f)=frequency; λ=wavelength."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is ν when 15 full oscillations take 3 seconds?",
          "answer": "5 Hz."
        },
        {
          "question": "For a 10 Hz sound, what is T?",
          "answer": "0.1 s."
        },
        {
          "question": "What is the SI unit of intensity?",
          "answer": "W/m²."
        },
        {
          "question": "Does a high-amplitude sound automatically have high pitch?",
          "answer": "No. Amplitude and frequency are different."
        }
      ],
      "tip": "Read ν (nu) as frequency and v as speed. Express Hz as s⁻¹ to check whether formulas give the correct unit.",
      "visual": "quantities"
    },
    {
      "title": "Speed of sound: derive v = λν and compare media, temperatures and delays",
      "paragraphs": [
        "A sound wave travels one full wavelength λ between consecutive compressions in one period T. Therefore wave SPEED v=distance/time=λ/T. Since ν=1/T, substitute to obtain v=λν, also written v=fλ. This applies to periodic waves in media where a meaningful propagation speed exists. SI units are λ in metres, ν in s⁻¹ and v in m/s.",
        "In an ordinary uniform medium under unchanged conditions, the propagation speed is set by the properties of the MEDIUM, not how frequently a source vibrates. If ν doubles while v stays fixed, λ must halve. This is why distinct pitches from a musical ensemble generally reach a listener together through air. Some specialised media are dispersive, but that is not the intended Class 9 case.",
        "NCERT Table 10.1 gives speed at 15°C: AIR approximately 340 m/s, WATER approximately 1500 m/s, and STEEL approximately 5000 m/s. The ratios are water/air=1500/340≈4.41 and steel/water=5000/1500≈3.33. The typical ordering is solid > liquid > gas for the examples taught; it is not an unbreakable ordering for every possible solid and gas under every condition.",
        "Sound in air generally travels faster when temperature rises because changing air temperature affects molecular thermal motion and the medium's mechanical response. NCERT reports about 331 m/s at 0°C and 344 m/s at 22°C; humid air also supports slightly faster sound than dry air under otherwise similar conditions.",
        "NCERT Example 10.2 computes wavelengths at the rough human-hearing limits with v=344 m/s: 20 Hz corresponds to 344/20=17.2 m; 20,000 Hz corresponds to 344/20000=0.0172 m=1.72 cm. Be sure to convert '20 kHz' to 20,000 Hz before calculating.",
        "NCERT Example 10.3 gives a 5.0-second lag between lightning flash and thunder. Ignoring the much smaller light travel time, d=vt=340×5=1700 m=1.7 km. This is a ONE-WAY sound problem, unlike an ECHO requiring sound to travel out and back.",
        "NCERT Example 10.4 uses Fig. 10.22 to find a wave wavelength of 50 m in steel; at 5000 m/s, frequency ν=5000/50=100 Hz and period T=1/100=0.01 s. A graph-reading problem therefore combines a spatial measurement with a temporal relation.",
        "Two friends 340 m apart along a steel fence hear the same knock by two routes. Air time is 340/340=1.00 s; steel time is 340/5000=0.068 s; delay difference is 0.932 s. Since this is more than 0.1 s, the sounds can be distinguished. Both route lengths are ONE-WAY to the observer, so do NOT divide their travel times by two.",
        "NCERT exercise Q15 uses the same source-to-cliff-and-back path for sounds through air and through water, with t_air=4.5×t_water. Because equal distance d_roundtrip means v_air×t_air=v_water×t_water, it follows v_air/v_water=t_water/t_air=1/4.5=2/9. Faster sound in water is consistent with the result."
      ],
      "examples": [
        {
          "title": "Derive the wave equation",
          "question": "Show why speed equals λν using a period T.",
          "steps": [
            "In one cycle duration T a crest moves distance λ.",
            "Thus v=λ/T.",
            "Frequency ν=1/T, so substitute to obtain v=λν."
          ],
          "answer": "v=λν, equivalent to v=fλ."
        },
        {
          "title": "NCERT Example 10.2: 20 Hz wavelength",
          "question": "With sound speed 344 m/s, find the wavelength of a 20 Hz sound.",
          "steps": [
            "Rearrange λ=v/ν.",
            "344/20=17.2.",
            "Units m/s ÷ s⁻¹ = m."
          ],
          "answer": "17.2 m."
        },
        {
          "title": "NCERT Example 10.2: 20 kHz wavelength",
          "question": "Find λ for ν=20 kHz if sound speed 344 m/s.",
          "steps": [
            "20 kHz=20,000 Hz.",
            "λ=344/20,000=0.0172 m.",
            "Convert ×100 into centimetres."
          ],
          "answer": "0.0172 m =1.72 cm."
        },
        {
          "title": "NCERT Example 10.3: lightning delay",
          "question": "Thunder arrives 5 s after the flash. Sound speed 340 m/s. Approximate strike distance.",
          "steps": [
            "Light travel time is negligible for this distance.",
            "One-way d=vt=340×5.",
            "Convert 1700 m to kilometres."
          ],
          "answer": "1700 m or 1.7 km."
        },
        {
          "title": "NCERT Example 10.4: steel graph",
          "question": "A steel sound wave has λ=50 m and speed=5000 m/s. Determine ν and T.",
          "steps": [
            "ν=v/λ=5000/50=100 Hz.",
            "T=1/100=0.01 s.",
            "The wave completes 100 cycles per second."
          ],
          "answer": "ν=100 Hz; T=0.010 s."
        },
        {
          "title": "Pause and Ponder 10: medium speed ratios",
          "question": "Find speed ratio water/air and steel/water using 1500,340,5000 m/s.",
          "steps": [
            "Water/air=1500/340≈4.4118.",
            "Steel/water=5000/1500≈3.3333.",
            "Ratios are unitless when both speeds use the same unit."
          ],
          "answer": "About 4.41 and 3.33."
        },
        {
          "title": "Pause and Ponder 11: steel fence delay",
          "question": "Knock heard over 340 m in steel at 5000 m/s and in air at 340 m/s. Find time difference.",
          "steps": [
            "Air time=340/340=1.000 s.",
            "Steel time=340/5000=0.068 s.",
            "Difference=1.000−0.068=0.932 s."
          ],
          "answer": "0.932 s, distinguishable as separate arrivals."
        },
        {
          "title": "NCERT Q9: period from wavelength",
          "question": "A sound wave has λ=3.44 m and v=344 m/s. Find T.",
          "steps": [
            "From v=λ/T, obtain T=λ/v.",
            "T=3.44/344.",
            "T=0.010 s."
          ],
          "answer": "0.01 s."
        },
        {
          "title": "NCERT Q12: temperature dependence",
          "question": "At 1720 m, compare thunder travel times for v=331 m/s (0°C) and 344 m/s (22°C).",
          "steps": [
            "At 22°C: t=1720/344=5.00 s.",
            "At 0°C: t=1720/331≈5.1964 s.",
            "Additional time ≈0.1964 s."
          ],
          "answer": "About 0.20 s longer at 0°C."
        },
        {
          "title": "NCERT Q15: same cliff path in air and water",
          "question": "Both sounds travel identical round-trip distances, but t_air=4.5t_water. Find v_air:v_water.",
          "steps": [
            "For a fixed travel distance, v=d/t.",
            "v_air/v_water=(d/t_air)/(d/t_water)=t_water/t_air.",
            "That ratio is 1/4.5=2/9."
          ],
          "answer": "v_air:v_water=2:9."
        },
        {
          "title": "Frequency changes but speed does not",
          "question": "A 500 Hz sound has λ=0.68 m in air. What λ will a 1000 Hz sound have in the same conditions?",
          "steps": [
            "Original speed=500×0.68=340 m/s.",
            "New frequency doubles; medium and speed stay 340 m/s.",
            "New λ=340/1000=0.34 m."
          ],
          "answer": "0.34 m; speed remains 340 m/s."
        }
      ],
      "checkQuestions": [
        {
          "question": "What do Greek ν and Latin v mean?",
          "answer": "ν or f is frequency (Hz); v is speed (m/s)."
        },
        {
          "question": "Does a higher frequency make a sound faster in the same air conditions?",
          "answer": "No; it shortens λ."
        },
        {
          "question": "When thunder takes five seconds at 340 m/s, what is d?",
          "answer": "1700 m (one-way)."
        },
        {
          "question": "Table 10.1: which is fastest among air, water and steel?",
          "answer": "Steel."
        },
        {
          "question": "For an equal cliff round-trip path, if one time is 3 times another, what is its speed?",
          "answer": "One-third the other's speed."
        }
      ],
      "tip": "Check one-way versus round-trip. In wave-speed problems v=λν; in echo problems the measured time usually covers 2d.",
      "visual": "speed"
    },
    {
      "title": "Human hearing: pitch, loudness, audible limits, ear and safe listening",
      "paragraphs": [
        "Human sound PERCEPTION is not identical to a wave's objective physical measurements. Frequency ν, period T, wavelength λ, amplitude and intensity are physical quantities measurable with instruments; PITCH, LOUDNESS and TIMBRE describe how a listener experiences sound. The mapping can depend on frequency, hearing sensitivity and sound complexity.",
        "PITCH is the perceptual quality usually determined primarily by fundamental frequency. High-frequency sounds are normally perceived as shriller or higher; lower-frequency sounds as deeper. Changing loudness without changing frequency does not automatically change pitch. Different age groups and individuals may perceive some sounds differently due to hearing sensitivity and ear physiology.",
        "LOUDNESS is how strong or soft a sound seems. It correlates with physical sound intensity and amplitude, but is also frequency dependent and listener dependent. Sound pressure level is conventionally expressed in decibels dB, a logarithmic scale; an increase of 10 dB corresponds to a tenfold increase in sound INTENSITY (under the standard level definition), not a fixed tenfold increase in perceived loudness.",
        "NCERT states the rough hearing range for young humans as 20 Hz to 20,000 Hz (20 kHz). Below 20 Hz is INFRASOUND; above 20 kHz is ULTRASOUND. Actual hearing cutoffs differ among listeners and change with age. 'Inaudible to humans' does not mean no energy or no effect on animals; elephants can perceive some infrasound and bats/dolphins perceive ultrasound.",
        "Sound enters the outer ear and ear canal, causing the eardrum to vibrate. Tiny middle-ear bones help transmit/amplify those vibrations to the inner ear; the cochlea converts mechanical signals to nerve impulses, which travel to the brain. Having TWO ears helps estimate the sound direction from small timing and level differences across the ears.",
        "NCERT Activity 10.8 is a teacher-facilitated demonstration of changes in pitch as frequency varies. It is unnecessary to use very high volume or extreme frequencies for learning. Prolonged loud noise can affect hearing, attention and sleep; maintain comfortable sound levels and take listening breaks.",
        "The chapter's voice discussion notes that vocal fold dimensions and resonances change with development, affecting voice pitch. Voice timbre also depends on how a person's throat, mouth and nasal cavities shape sound. Neither pitch nor voice timbre is a reliable measure of a person's gender identity; this lesson focuses on the acoustic mechanism.",
        "The important exam distinction is: higher ν normally means higher pitch; bigger wave amplitude or intensity often means more loudness, while distance generally reduces intensity. No simple universal formula converts one decibel number directly into 'how loud' every listener finds a sound."
      ],
      "examples": [
        {
          "title": "Compare frequency and pitch",
          "question": "Two sounds have ν_A=600 Hz, ν_B=300 Hz. Which is usually higher pitched?",
          "steps": [
            "Pitch tracks fundamental frequency for these simple tones.",
            "600 Hz is twice 300 Hz.",
            "Thus A is higher pitched."
          ],
          "answer": "A."
        },
        {
          "title": "Compare amplitude and loudness",
          "question": "Two similar-frequency sound waves differ only in amplitude. Which generally sounds louder?",
          "steps": [
            "A larger disturbance generally transports greater energy.",
            "Greater energy flow often means greater intensity.",
            "Listeners typically perceive the larger-amplitude sound as louder."
          ],
          "answer": "The one with larger amplitude."
        },
        {
          "title": "Classify a 10 Hz wave",
          "question": "Is a 10 Hz sound infrasonic, audible-range or ultrasonic for young humans?",
          "steps": [
            "The approximate audible lower limit is 20 Hz.",
            "10 Hz lies below 20 Hz.",
            "Thus it is infrasonic."
          ],
          "answer": "Infrasound."
        },
        {
          "title": "Classify 40 kHz",
          "question": "Is a 40,000 Hz wave within ordinary human hearing?",
          "steps": [
            "Convert 40,000 Hz=40 kHz.",
            "The typical upper limit is 20 kHz.",
            "40 kHz exceeds it."
          ],
          "answer": "Ultrasonic."
        },
        {
          "title": "10 dB intensity comparison",
          "question": "Two sounds differ by 10 dB of physical sound intensity level. What is the ratio of their INTENSITIES?",
          "steps": [
            "Sound intensity level change ΔL=10log₁₀(I₂/I₁).",
            "Set ΔL=10 dB; divide by 10 gives log₁₀ ratio=1.",
            "Take 10 to the power 1."
          ],
          "answer": "Intensity ratio 10:1; perceived loudness need not scale by ten."
        },
        {
          "title": "Pathway to hearing",
          "question": "List the structures from outer ear to perception.",
          "steps": [
            "Sound enters ear canal.",
            "It vibrates eardrum and middle-ear bones.",
            "Cochlea converts vibrations into signals, then auditory nerve carries information to brain."
          ],
          "answer": "Ear canal → eardrum → middle-ear bones → cochlea → auditory nerve → brain."
        },
        {
          "title": "Two-ear location",
          "question": "A sound reaches the left ear slightly before the right. What can the brain infer?",
          "steps": [
            "Both ears receive related sound waveforms.",
            "The small arrival-time difference offers a directional cue.",
            "The brain combines timing with other cues to locate the source."
          ],
          "answer": "The sound source is more likely on the side reached first (with context)."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is the rough human hearing range?",
          "answer": "20–20,000 Hz (20 Hz–20 kHz)."
        },
        {
          "question": "Is pitch a physical variable identical to frequency?",
          "answer": "No; it is a perception closely related to frequency."
        },
        {
          "question": "Why can hearing a sound with both ears help localisation?",
          "answer": "Small arrival-time and level differences provide direction cues."
        },
        {
          "question": "Is dB a simple linear scale for physical intensity?",
          "answer": "No; it is logarithmic."
        }
      ],
      "tip": "Use Hz for frequency, W/m² for intensity, and dB for sound intensity level. Do not use one quantity's unit for another.",
      "visual": "hearing"
    },
    {
      "title": "Musical notes, timbre, octave and Indian acoustics",
      "paragraphs": [
        "A TONE is an approximately single-frequency sound, often illustrated by a tuning fork or careful whistle. Most musical instruments and human voices produce a mixture of frequencies. A NOTE has a lowest frequency called the FUNDAMENTAL and additional higher components called OVERTONES. In many instruments harmonics appear at integer multiples of the fundamental.",
        "An OCTAVE is a musical interval between notes whose fundamental frequencies differ by a factor of two: 200 Hz and 400 Hz, or 260 Hz and 520 Hz. The perceived musical relationship of an octave is recognisable even though the sound may have different patterns of overtones.",
        "TIMBRE (tone quality) explains why a flute, sitar and tabla can sound different even when producing notes of approximately the same pitch and loudness. Timbre depends on the strengths and timing of overtones, the attack and decay of the note, and physical details of the instrument. Describing timbre as 'frequency' alone misses these distinctions.",
        "NCERT Activity 10.7 uses an acoustic spectrum display to study Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa in Indian music. Adjacent notes usually have ascending fundamental frequencies in an ascending scale; instruments and tuning systems can vary in ratios. A spectrum peak can reflect a harmonic of the fundamental, so the tallest peak is not invariably the perceived note frequency.",
        "Sir C. V. Raman explored acoustics of Indian instruments including tabla and mridangam, in addition to his celebrated work on the Raman effect in light. NCERT highlights the black central loading patch on a drum membrane called SYAAHI. It alters vibrational modes and helps generate a characteristic pattern of partial tones and richer musical sound.",
        "The chapter's Threads of Curiosity also connects local culture and acoustic communication: the Jingrwai Iawbei tune-name tradition in Kongthong, Meghalaya. It provides a useful real-world reason to distinguish sound's fundamental frequency, changing sequence, duration and other patterns.",
        "The shape and construction of an instrument matter. A vibrating membrane's modes differ from an air column's standing-wave modes or a taut string's modes; each provides a distinct combination of frequencies and thus a characteristic timbre. Detailed advanced mode equations are beyond Class 9.",
        "A loud sound is not necessarily a high-pitched sound, and a high-pitched sound is not necessarily a single pure tone. A flute playing a note can have high pitch, low volume and rich harmonic content simultaneously."
      ],
      "examples": [
        {
          "title": "Octave relation",
          "question": "A note's fundamental is 220 Hz. What is the fundamental one octave above?",
          "steps": [
            "An octave above means frequency doubled.",
            "2×220=440.",
            "Units remain hertz."
          ],
          "answer": "440 Hz."
        },
        {
          "title": "One octave below",
          "question": "A note is 500 Hz. What is its fundamental frequency one octave below?",
          "steps": [
            "An octave below halves the frequency.",
            "500/2=250.",
            "That interval is an octave."
          ],
          "answer": "250 Hz."
        },
        {
          "title": "Same pitch, different instrument",
          "question": "Why can flute and sitar sound different on the same 440 Hz note?",
          "steps": [
            "Both can share the same fundamental frequency.",
            "They produce different combinations of overtones and different time envelopes.",
            "Perceived timbre differs."
          ],
          "answer": "Timbre or sound quality differs."
        },
        {
          "title": "Single tone versus note",
          "question": "Which is closer to a pure tone: a tuning fork or a plucked guitar string?",
          "steps": [
            "A tuning fork vibrates mainly at one dominant frequency.",
            "A plucked string normally excites multiple resonant modes.",
            "Their spectral compositions differ."
          ],
          "answer": "A tuning fork."
        },
        {
          "title": "Tabla syaahi science",
          "question": "What physical feature does the black syaahi patch modify?",
          "steps": [
            "It changes the mass distribution of a stretched drumhead.",
            "This changes its vibrational modes and sound spectrum.",
            "Those modes contribute to musical timbre."
          ],
          "answer": "The drum membrane's vibrational modes, influencing overtones and timbre."
        },
        {
          "title": "Sa sequence and frequency",
          "question": "In a simple ascending scale Sa→Re→Ga, what trend is expected in fundamental pitch?",
          "steps": [
            "Ascending notes are arranged in increasing perceived pitch.",
            "Their fundamentals normally become higher.",
            "Loudness is an independent variable."
          ],
          "answer": "Fundamental frequency generally increases."
        },
        {
          "title": "Can timbre vary without pitch change?",
          "question": "A teacher plays the same note with two different instruments. Must the notes have different frequencies?",
          "steps": [
            "Same musical pitch can correspond to equal fundamental frequency.",
            "Their overtones, resonances and attack patterns can differ.",
            "These differences change timbre, not necessarily fundamental pitch."
          ],
          "answer": "No; the fundamental frequencies may match."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is an overtone?",
          "answer": "A higher-frequency component above a note's fundamental."
        },
        {
          "question": "What is an octave in terms of frequencies?",
          "answer": "A doubling or halving of fundamental frequency."
        },
        {
          "question": "Why do instruments playing the same pitch sound different?",
          "answer": "Different timbres due to overtones and resonance properties."
        },
        {
          "question": "What is syaahi?",
          "answer": "The black central loading patch on tabla/mridangam drum membrane."
        }
      ],
      "tip": "Keep pitch, loudness and timbre distinct: fundamental, intensity and spectral/envelope qualities respectively.",
      "visual": "music"
    },
    {
      "title": "Sound reflection: echoes, reverberation and acoustic design",
      "paragraphs": [
        "Sound waves REFLECT from a surface, like other waves. The angle of incidence relative to the NORMAL equals the angle of reflection relative to that normal, and incident ray, reflected ray and normal lie in the same plane in the textbook ray picture. Hard, smooth surfaces often give strong direct reflections; soft porous surfaces absorb energy and rough surfaces scatter some sound.",
        "An ECHO is a reflected sound heard distinctly as a repetition. The textbook uses about 0.1 s as a human temporal-separation criterion for an echo under ordinary conditions. If the returning sound takes 0.1 s, the wave travels OUT to the surface and BACK for a total path vt. At v=340 m/s, total 34 m means the reflector lies about 17 m away.",
        "NCERT Example 10.5: a clap echo arrives 0.5 s later in a corridor where v=340 m/s. One-way wall distance d=vt/2=340×0.5/2=85 m. Mistakenly writing 170 m counts the outward and return paths as if they were one-way distance.",
        "NCERT Pause and Ponder 12 asks for reflection at least 0.2 s later with v=343 m/s: d=343×0.2/2=34.3 m. The threshold varies with sound speed: the familiar approximately 17 m example assumes v=340 m/s and 0.1 s, not a universal fixed reflector distance.",
        "REVERBERATION is persistence of sound due to overlapping repeated reflections in enclosed spaces. NCERT mentions closely spaced reflections less than about 0.05 s apart. A reflection 0.05 s after the original is too early to be a distinct echo under the 0.1 s criterion; in the exercise context it contributes to overlapping reflected sound, called reverberation. These numbers are approximations rather than a razor-sharp universal switch at exactly 0.05 s.",
        "Too much reverberation can make speech hard to understand, while an appropriate amount adds fullness to music. Auditoriums use upholstered seats, wall panels, carpets and curtains to absorb unwanted reflections. Gol Gumbaz in Bijapur/Vijayapura, Karnataka, has a Whispering Gallery where dome acoustics carry and repeat soft sounds.",
        "The speed of light is much greater than speed of sound. A distant visible lightning flash usually appears before thunder arrives. This is not a reflection/echo problem unless the sound is actually returned from an obstacle; for a lightning-thunder delay, use one-way d≈vt.",
        "The reflection law geometry asks you to measure both angles from the normal (perpendicular to the reflecting surface), not from the surface itself. If a ray makes 30° with the normal, it also reflects at 30° to the normal, even though each makes 60° with the surface."
      ],
      "examples": [
        {
          "title": "Derive 17 m minimum reflector distance",
          "question": "An audible echo needs return lag 0.1 s; v=340 m/s. How far should a reflector be?",
          "steps": [
            "Round-trip path=v t=340×0.1=34 m.",
            "The wall is halfway along the out-and-back route.",
            "d=34/2=17 m."
          ],
          "answer": "Approximately 17 m."
        },
        {
          "title": "NCERT Example 10.5: corridor echo",
          "question": "Echo delay 0.5 s; air speed 340 m/s. Find wall distance.",
          "steps": [
            "Two-way path=340×0.5=170 m.",
            "Wall distance d=170/2.",
            "d=85 m."
          ],
          "answer": "85 m."
        },
        {
          "title": "Pause and Ponder 12: 0.2 s",
          "question": "What minimum distance gives a return time 0.2 s at v=343 m/s?",
          "steps": [
            "Round-trip path =343×0.2=68.6 m.",
            "Divide by two for reflector distance.",
            "d=34.3 m."
          ],
          "answer": "34.3 m."
        },
        {
          "title": "NCERT Q4: 0.05 s reflection",
          "question": "A reflection returns 0.05 s after sound production. Is it a distinct echo?",
          "steps": [
            "0.05 s is shorter than the ≈0.1 s needed to hear separate sounds.",
            "It therefore overlaps perceptually with the original sound.",
            "In the textbook's options, classify the overlapping reflections as reverberation rather than a distinct echo."
          ],
          "answer": "Not a distinct echo; consistent with reverberation/overlapping sound."
        },
        {
          "title": "Incidence and reflection angle",
          "question": "A sound ray strikes a wall at 30° to its normal. What angle does the reflected ray make with the normal?",
          "steps": [
            "The angles are measured to the normal, not to the wall.",
            "Apply angle of incidence equals angle of reflection.",
            "Reflection angle is 30°."
          ],
          "answer": "30°."
        },
        {
          "title": "Hard versus soft wall",
          "question": "Why may an echo be less distinct in a heavily curtained room?",
          "steps": [
            "Soft porous surfaces absorb and scatter sound.",
            "Less sound returns as a clear strong reflection.",
            "The reflected signal is weaker and/or diffused."
          ],
          "answer": "Less distinct echo from sound absorption/scattering."
        },
        {
          "title": "Incorrect echo distance",
          "question": "A student uses d=340×0.5=170 m for a corridor echo after 0.5 s. Correct it.",
          "steps": [
            "170 m is TOTAL distance travelled, out and back.",
            "Reflector lies one leg away.",
            "170/2=85 m."
          ],
          "answer": "85 m."
        },
        {
          "title": "Gol Gumbaz application",
          "question": "What acoustic feature is highlighted by the Whispering Gallery?",
          "steps": [
            "Curved surfaces can guide and reflect sound.",
            "Some whispered sounds travel or repeat around the dome.",
            "The structure illustrates architectural acoustic effects."
          ],
          "answer": "Reflected sound and repeated travel in a designed space."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is the round-trip echo formula for wall distance?",
          "answer": "d=vt/2."
        },
        {
          "question": "What is the approximate minimum return delay for a distinct echo?",
          "answer": "0.1 s in the textbook model."
        },
        {
          "question": "Why do curtains help auditorium acoustics?",
          "answer": "They absorb some reflected sound and reduce excessive reverberation."
        },
        {
          "question": "Are reflection angles measured to the wall or to its normal?",
          "answer": "To the normal."
        }
      ],
      "tip": "Always divide by TWO when a timing measurement is the wave's out-and-back journey.",
      "visual": "reflection"
    },
    {
      "title": "Beyond hearing: infrasound, ultrasound, echolocation and SONAR",
      "paragraphs": [
        "Sound frequencies BELOW 20 Hz are called INFRASONIC; those ABOVE 20,000 Hz (20 kHz) are ULTRASONIC. These mechanical pressure waves still need a medium and obey wave relationships; the classification is based on the approximate human hearing range, not on whether the wave is 'sound' at all.",
        "Many elephants can sense low-frequency acoustic communication, and earthquakes/volcanoes may generate infrasonic waves. Bats emit bursts of high-frequency ultrasound, hear reflected returns, and infer the distance and location of obstacles or prey. Dolphins and some other animals also use sound for echolocation.",
        "ECHOLOCATION means finding objects using a sound pulse and the timing and/or direction of its reflected echo. A signal sent at time 0 returning after t travels the outgoing leg d and incoming leg d, so 2d=vt and d=vt/2. This is the same geometric reasoning for sonar and vehicle parking sensors.",
        "SONAR stands for Sound Navigation and Ranging. Underwater systems send sound pulses into water and detect reflected signals to estimate distances to objects or the seabed. Sound is useful underwater because it often propagates over substantial distances even where light is attenuated strongly.",
        "NCERT Example 10.6 gives a sonar echo arriving after 0.90 s in seawater with wave speed 1530 m/s. The total path=1530×0.90=1377 m and one-way distance=1377/2=688.5 m. The audit's alternate 5.0 s, 1525 m/s shipwreck case is actually NCERT end EXERCISE Q10, not Example 10.6; both should be studied but clearly labelled.",
        "NCERT end exercise Q10: t=5.0 s and v=1525 m/s → wreck distance=1525×5/2=3812.5 m. Q11: ultrasonic reverse sensor detects an obstacle 1.2 m away, v=345 m/s → t=2×1.2/345≈0.00696 s=6.96 ms.",
        "NCERT Pause and Ponder 13 asks depth when seawater sonar returns after 4 s and v=1500 m/s: d=1500×4/2=3000 m. Compare the three cases to learn why changing t and v changes the result; do not memorise one number as the meaning of SONAR.",
        "Ultrasound has medical and industrial applications. Ultrasound imaging uses reflected high-frequency acoustic waves to form images of tissues; clinicians can use therapeutic acoustic methods in kidney-stone treatment; industrial inspection can locate internal flaws in a material. These are professionally controlled applications, not experiments to attempt at home.",
        "NCERT's Bridging Science and Society describes using low-frequency acoustic detection in some airspace monitoring of drones/aircraft, and its closing discussion mentions measuring environmental sounds on Mars, ocean acoustic monitoring and listening to biological activity. These contexts demonstrate that recognising, timing and interpreting sound patterns are useful in science."
      ],
      "examples": [
        {
          "title": "NCERT Example 10.6: sonar actual numbers",
          "question": "Naval sonar echo time=0.90 s, speed=1530 m/s. Find the one-way object distance.",
          "steps": [
            "Round-trip distance=1530×0.90=1377 m.",
            "One-way distance=1377/2=688.5 m.",
            "Label 0.90 s as the full return time."
          ],
          "answer": "688.5 m."
        },
        {
          "title": "NCERT Q10: shipwreck",
          "question": "Echo returns in 5.0 s; underwater speed 1525 m/s. Find wreck distance.",
          "steps": [
            "Total path=1525×5=7625 m.",
            "Divide by 2 for one-way depth/distance.",
            "d=3812.5 m."
          ],
          "answer": "3812.5 m (≈3.81 km)."
        },
        {
          "title": "NCERT Q11: parking sensor",
          "question": "An obstacle is 1.2 m away and wave speed 345 m/s. Find round-trip ultrasonic echo time.",
          "steps": [
            "Round-trip path=2×1.2=2.4 m.",
            "t=2.4/345≈0.0069565 s.",
            "Convert ×1000 to ms."
          ],
          "answer": "≈0.00696 s or 6.96 ms."
        },
        {
          "title": "Pause and Ponder 13: ocean depth",
          "question": "An echo arrives after 4 s at 1500 m/s in seawater. Find depth.",
          "steps": [
            "Round-trip path=1500×4=6000 m.",
            "The bottom is half this distance away.",
            "Depth=3000 m."
          ],
          "answer": "3000 m."
        },
        {
          "title": "Bats and echolocation",
          "question": "How can a bat infer an obstacle distance from an ultrasound echo?",
          "steps": [
            "It emits an ultrasonic pulse and starts a timer.",
            "It detects the reflected sound after delay t.",
            "With sound speed v, obstacle distance d=vt/2."
          ],
          "answer": "By timing returning echoes."
        },
        {
          "title": "Infrasound and ultrasound classification",
          "question": "Classify 12 Hz, 1500 Hz and 35,000 Hz.",
          "steps": [
            "Below 20 Hz → infra, so 12 Hz is infrasonic.",
            "20–20,000 Hz → audible-range, so 1500 Hz is ordinary audible sound.",
            "Above 20,000 Hz → ultrasonic, so 35,000 Hz is ultrasound."
          ],
          "answer": "12 Hz infra; 1500 Hz audible; 35,000 Hz ultra."
        },
        {
          "title": "Separate example from Q10",
          "question": "Which of these is the textbook's labelled Example 10.6: 0.90 s/1530 m/s or 5 s/1525 m/s?",
          "steps": [
            "Locate Example 10.6 immediately after the SONAR section.",
            "It states 0.90 s in seawater with 1530 m/s.",
            "The 5 s and 1525 m/s values appear as end exercise Q10."
          ],
          "answer": "Example 10.6 is 0.90 s at 1530 m/s."
        },
        {
          "title": "Round-trip versus one-way time",
          "question": "A sensor has pulse return time 0.2 s and v=340 m/s. Compute one-way distance.",
          "steps": [
            "Round-trip path=340×0.2=68 m.",
            "One-way path = 68/2.",
            "d=34 m."
          ],
          "answer": "34 m."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is the sonar depth formula for a returning pulse?",
          "answer": "d=vt/2."
        },
        {
          "question": "Which is ultrasonic: 40 kHz or 4 kHz?",
          "answer": "40 kHz."
        },
        {
          "question": "Does ultrasound need a material medium?",
          "answer": "Yes; ultrasound is a mechanical wave."
        },
        {
          "question": "What is NCERT Example 10.6's one-way result?",
          "answer": "688.5 m."
        },
        {
          "question": "Why is ultrasound medically useful?",
          "answer": "High-frequency pulses can reflect from tissues to produce diagnostic images under professional conditions."
        }
      ],
      "tip": "Differentiate NCERT Example 10.6 (688.5 m) from exercise Q10 (3812.5 m); both measure one-way distance from round-trip times.",
      "visual": "ultrasound"
    },
    {
      "title": "NCERT end exercises and mixed reasoning: an exam-ready problem method",
      "paragraphs": [
        "NCERT's 15 final 'Revise, Reflect, Refine' questions test whether you can move between a source, a physical wave, a graph and a measured number. First identify whether the problem is about propagation, periodic waves, pitch/loudness, or reflected waves. Then define quantities, convert units, and show each step.",
        "Q1 asks what best supports sound being mechanical: its NEED for a medium. Reflection, frequency and energy carrying are not exclusive to mechanical waves, but absence of propagation in vacuum distinguishes ordinary sound from electromagnetic radiation.",
        "Q2 at fixed medium conditions: increasing source frequency ν increases compressions passing a point per second; wavelength shortens and period decreases, while speed remains essentially unchanged. The correct answer is the number of compressions per second, not speed.",
        "Q3 yields 5 Hz from 20 compressions in 4 s. Q4 with a return in 0.05 s fails the distinct echo criterion and belongs to overlapping/reverberant sound, recognising NCERT's approximate timing definitions.",
        "Q5/6 compare graph amplitude, wavelengths and frequency using SAME axis scales. Q7 asks you to draw amplitude 3 density units and λ=4 cm, while Q13/14 require carefully counting graphical cycles—not substituting an unexamined label from a model-generated audit.",
        "Q8 tests the medium requirement in a spacecraft scene. Q9 uses T=λ/v=3.44/344=0.01 s. Q10 and Q11 require round-trip 2d=vt or t=2d/v; Q12 asks a sound-speed change from 344 to 331 m/s; Q15 asks inverse time-to-speed ratio for equal distances.",
        "Graph corrections from the actual textbook: Fig. 10.32 has four full wavelengths within 8 cm, so λ=2 cm, ν=17000 Hz at 340 m/s. Fig. 10.33 has TWO wavelengths of wave A within 5 cm (λ_A=2.5 cm) and ONE wavelength of wave B (λ_B=5 cm), hence at 345 m/s ν_A=13800 Hz > ν_B=6900 Hz.",
        "A useful speed check: if frequency rises while λ stays unchanged in a *fixed medium*, v=λν would change; in real air under same conditions λ instead adjusts, keeping v almost constant. A useful unit check: multiplying frequency Hz (s⁻¹) by wavelength m gives m/s.",
        "Use NCERT's original book for the exact figures and question wording. Our original diagrams illustrate the same relationships but intentionally do not reproduce the textbook's copyrighted figures. Independent teacher and visual review remains desirable before claiming that the notes alone are flawless."
      ],
      "examples": [
        {
          "title": "NCERT Q1: mechanical nature",
          "question": "Which observation best shows sound is mechanical: reflection, frequency, energy or medium requirement?",
          "steps": [
            "Light also reflects, has frequency and transports energy.",
            "Light is electromagnetic and can cross vacuum.",
            "Sound requires particles of a medium."
          ],
          "answer": "Requirement of a medium."
        },
        {
          "title": "NCERT Q2: increase frequency",
          "question": "In unchanged air, what increases when a sound's frequency rises?",
          "steps": [
            "Frequency is cycles per second, so more compressions pass each second.",
            "Period decreases because T=1/ν.",
            "Wavelength decreases since v stays approximately constant."
          ],
          "answer": "Number of compressions per second."
        },
        {
          "title": "NCERT Q3: count compression arrivals",
          "question": "20 compression events in 4 s. Calculate ν.",
          "steps": [
            "ν=number/time.",
            "ν=20/4.",
            "Result 5 Hz."
          ],
          "answer": "5 Hz."
        },
        {
          "title": "NCERT Q4: reflection at 0.05 s",
          "question": "Distinct echo or reverberant reflection?",
          "steps": [
            "A clearly separated echo requires about 0.1 s.",
            "0.05 s is shorter than that.",
            "Reflections merge with original, as in reverberation."
          ],
          "answer": "Reverberant/overlapping sound, not a distinct echo."
        },
        {
          "title": "NCERT Q6: three graphs",
          "question": "A, B and C are assigned to three same-speed waves in decreasing frequency. How do wavelength spacings rank?",
          "steps": [
            "ν=v/λ.",
            "Maximum ν ↔ minimum λ.",
            "Minimum ν ↔ maximum λ."
          ],
          "answer": "A should have shortest λ; C longest, for equivalent graph scales."
        },
        {
          "title": "NCERT Q7: draw prescribed sound graph",
          "question": "Construct the labels for density amplitude 3 units, λ=4 cm.",
          "steps": [
            "Mark horizontal distance axis with a 4 cm span between consecutive crests.",
            "Draw average-density line across middle.",
            "Crests rise 3 density units and troughs fall 3 units below line."
          ],
          "answer": "Amplitude 3 density units, crest separation 4 cm."
        },
        {
          "title": "NCERT Q9: time period",
          "question": "λ=3.44 m, v=344 m/s. Find T.",
          "steps": [
            "T=λ/v.",
            "3.44/344=0.01 s.",
            "Cross-check ν=100 Hz."
          ],
          "answer": "0.01 s."
        },
        {
          "title": "NCERT Q10 versus Q11",
          "question": "State distances or times from Q10 wreckage 5s/1525m/s and Q11 sensor 1.2m/345m/s.",
          "steps": [
            "Q10 d=1525×5/2=3812.5 m.",
            "Q11 t=2×1.2/345=0.0069565 s.",
            "Convert Q11 to ≈6.96 ms."
          ],
          "answer": "3812.5 m; 6.96 ms."
        },
        {
          "title": "NCERT Q13: calculate wave λ and ν",
          "question": "Four full compression cycles span 8 cm, speed 340 m/s.",
          "steps": [
            "λ=8/4=2 cm =0.02 m.",
            "ν=v/λ=340/0.02.",
            "ν=17,000 Hz."
          ],
          "answer": "λ=2 cm; ν=17 kHz."
        },
        {
          "title": "NCERT Q14: identify actual A and B",
          "question": "Wave A has two cycles in 5 cm, wave B has one, with speed 345 m/s. Find λ and ν for both.",
          "steps": [
            "λ_A=5/2=2.5 cm, λ_B=5 cm.",
            "Convert 0.025 and 0.05 m.",
            "ν_A=345/0.025=13800 Hz, ν_B=345/0.05=6900 Hz."
          ],
          "answer": "Wave A: 2.5 cm/13.8 kHz; Wave B: 5.0 cm/6.9 kHz."
        },
        {
          "title": "NCERT Q15: air–water cliff speed ratio",
          "question": "Equal out-and-back paths; time through air is 4.5 times the water time. Find ratio.",
          "steps": [
            "v_air/v_water=t_water/t_air.",
            "This equals 1/4.5.",
            "Rewrite as 2/9."
          ],
          "answer": "2:9."
        },
        {
          "title": "Mixed review: identify formulas",
          "question": "Match ν, T, λ, v, d and t with ν=1/T, v=λν and d=vt/2.",
          "steps": [
            "ν and T relate one complete cycle in time.",
            "v, λ and ν relate spatial and time cycles.",
            "d=vt/2 is valid when t is travel time OUT and BACK."
          ],
          "answer": "Use ν=1/T for oscillations, v=λν for wave propagation, d=vt/2 for echoes."
        }
      ],
      "checkQuestions": [
        {
          "question": "Which end exercise compares equal-distance air and water time ratios?",
          "answer": "Q15."
        },
        {
          "question": "Which end exercise has a 40 kHz reverse sensor?",
          "answer": "Q11."
        },
        {
          "question": "What is the correct A/B wavelength ranking in Fig. 10.33?",
          "answer": "Wave A shorter, wave B longer."
        },
        {
          "question": "Why does sound travel through a medium rather than vacuum?",
          "answer": "Its mechanical pressure disturbance requires matter."
        }
      ],
      "tip": "Write the equation that matches the path before inserting numbers; graph problems begin with counting repeating patterns.",
      "visual": "review"
    }
  ]
};
window.CBSE_CLASS9_SCIENCE_FULL_NOTES=Object.assign({},window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{}, {'Sound Waves: Characteristics and Applications':chapter});
})();
