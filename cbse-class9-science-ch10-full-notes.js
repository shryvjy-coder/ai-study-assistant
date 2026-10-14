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
    }
  ]
};
window.CBSE_CLASS9_SCIENCE_FULL_NOTES=Object.assign({},window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{}, {'Sound Waves: Characteristics and Applications':chapter});
})();
