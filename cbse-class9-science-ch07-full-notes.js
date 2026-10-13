/* Original Grade 9 Science Chapter 7 study notes based on NCERT Exploration (2026–27), iesc107.pdf, pp. 116–139. */
(()=>{
'use strict';
const chapter={
  "sourceBook": "Exploration · Textbook of Science for Grade 9",
  "sourcePdf": "iesc107.pdf",
  "printedPages": "116–139",
  "reviewStatus": "NCERT-grounded original notes; independent teacher and visual editorial review outstanding",
  "lead": "A detailed chapter-by-chapter route through how a force transfers energy by work, why work can be positive, negative or zero, how kinetic and potential energy are calculated and conserved, how fast machines transfer energy, and why pulleys, ramps and levers trade effort for distance. Practice each step, including textbook-style diagrams and applications.",
  "sections": [
    {
      "title": "What scientific work means: direction, sign and joules",
      "paragraphs": [
        "Work in physics is an energy transfer by a force acting through a displacement. Identify the force's agency and the object receiving it. When constant force and displacement point along the same line, W = F × s, where F is in newtons, s is in metres and W is in joules. More generally, use the component of force parallel to the displacement: W = F∥ × s. The positive or negative sign records whether that component acts with or against the motion; work itself has no vector direction.",
        "A joule is one newton-metre: 1 J = 1 N·m = 1 kg·m²/s². Lifting one wheat bag of fixed mass to a fixed height requires proportionally more work if the height or the number of identical bags increases, assuming slow steady lifting. The same 1 kg object raised 3 m gains three times the gravitational potential energy as when raised 1 m. Mechanical work describes a quantity, not how tired someone feels.",
        "Three important zero-work cases are F = 0; no displacement of the receiving object; and a force perpendicular to its displacement. A person holding a barbell stationary exerts upward force but does zero mechanical work on the stationary barbell. When carrying a box across a level room at constant height, the upward support force does zero work on the box during its horizontal travel. The person's muscles nevertheless consume chemical energy.",
        "A force aligned with displacement does positive work, such as pushing a trolley forward; a force against displacement does negative work, such as friction acting on a sliding object. As a girl slowly raises and lowers a dumbbell, the upward force from her hand does positive work during ascent and negative work during descent. For the falling dumbbell, gravity does the opposite. Different forces can do opposite-sign work on the same object.",
        "NCERT Example 7.2 has the goalkeeper's force oppose the ball's displacement by 15 cm, so W_goalkeeper = −200 N × 0.15 m = −30 J. Do not put the negative sign on both F and s when computing W along a signed axis; represent the geometry consistently once. The ball exerts an equal opposite force on the hands, but the work on hands is a separate object-and-displacement question."
      ],
      "examples": [
        {
          "title": "NCERT Example 7.1: lifting and lowering",
          "question": "An athlete slowly raises a dumbbell and slowly lowers it. State the sign of work done by her upward force in each stage.",
          "steps": [
            "On the way up, the upward force and displacement have the same direction.",
            "On the way down, the force from the hands is still upward while displacement is downward.",
            "The barbell's weight is downward, so gravity has the opposite sign in each stage."
          ],
          "answer": "The athlete does positive work while raising and negative work while lowering."
        },
        {
          "title": "NCERT Example 7.2: a goalkeeper",
          "question": "A goalkeeper stops a ball while exerting a 200 N force opposite to 15 cm of displacement. Find work done on the ball.",
          "steps": [
            "Convert 15 cm to 0.15 m.",
            "Force opposes displacement, so use a negative sign.",
            "W = −200 × 0.15 = −30 J."
          ],
          "answer": "The goalkeeper does −30 J of work on the ball."
        },
        {
          "title": "Why a held bag receives no mechanical work",
          "question": "A person supports a 50 N shopping bag without moving it for 30 s. Calculate the work done by the upward force on the bag.",
          "steps": [
            "The applied upward force is 50 N.",
            "Displacement of the bag during the hold is zero.",
            "W = F × 0 = 0 J, regardless of holding time."
          ],
          "answer": "0 J of mechanical work on the bag."
        },
        {
          "title": "Perpendicular force and travel",
          "question": "A person carries a box 12 m horizontally at constant height with an upward support force of 80 N. How much work does the upward support do?",
          "steps": [
            "The box's displacement is horizontal.",
            "The specified 80 N force is vertical, at 90° to displacement.",
            "There is no component of that force along displacement, so W = 0 J."
          ],
          "answer": "0 J by the upward support force. Other forces may do nonzero work."
        },
        {
          "title": "Work unit and same-direction push",
          "question": "A steady horizontal force of 18 N moves a trolley 5 m in the same direction. Find the work in joules.",
          "steps": [
            "The force is parallel to displacement.",
            "Multiply F × s = 18 × 5.",
            "Units are N·m = J."
          ],
          "answer": "90 J of positive work."
        }
      ],
      "checkQuestions": [
        {
          "question": "Does standing while holding a heavy load count as mechanical work ON the stationary load?",
          "answer": "No. Its displacement is zero although the person's muscles use energy."
        },
        {
          "question": "A 6 N frictional force opposes a slide of 3 m. Work by friction?",
          "answer": "W = −6 × 3 = −18 J."
        },
        {
          "question": "Can two forces do opposite-sign work on the same moving object?",
          "answer": "Yes. A forward pull may do positive work while friction does negative work."
        }
      ],
      "tip": "Do not confuse force with work. State agency, object, direction and displacement before multiplying, and include J units.",
      "visual": "work"
    },
    {
      "title": "Force–displacement graphs: read area, signs and change in motion",
      "paragraphs": [
        "On a graph of the force component along displacement (vertical axis) against displacement (horizontal axis), the signed area between the line and the displacement axis gives work. A horizontal positive line creates a rectangle: W = height × width. When force varies linearly, split the region into triangles, rectangles or trapeziums, and add their areas.",
        "Force plotted below the zero line does negative work; force plotted above gives positive work. Total (net) work is the algebraic sum of signed areas from all forces on the body. A rising line in a force–displacement graph is NOT an acceleration–time graph, so its slope does not directly give acceleration. Work depends on the integral or area, not on a single force value.",
        "NCERT Fig. 7.4 shows constant 10 N through 1 m, producing 10 J. The exercise Fig. 7.37 shows a force rising from 0 N at x = 0 to 50 N at x = 1 m, staying 50 N until x = 3 m, then falling to 0 N at x = 4 m. Its positive area is 25 + 100 + 25 = 150 J; with initial kinetic energy 180 J, the final kinetic energy is 330 J if no other horizontal work is done.",
        "The figure's positive force never reverses direction, even where the line slopes downward: a declining positive force is not a force pointing backwards. Acceleration remains forward while the net force remains positive. By contrast, on an energy-versus-position graph a drop in potential energy can correspond to a rise in kinetic energy if mechanical energy is conserved."
      ],
      "examples": [
        {
          "title": "Textbook Fig. 7.4: rectangle",
          "question": "A constant 10 N horizontal force acts through 1 m. Find the work from its force–displacement graph.",
          "steps": [
            "Horizontal line at 10 N between x = 0 and x = 1.",
            "Area is a rectangle: width 1 m, height 10 N.",
            "W = 10 × 1 = 10 J."
          ],
          "answer": "10 J."
        },
        {
          "title": "Triangular force graph",
          "question": "Force rises linearly from 0 N to 30 N over 2 m, with no other work. What work is done?",
          "steps": [
            "The area is a triangle under the straight line.",
            "W = ½ × 2 m × 30 N.",
            "W = 30 J."
          ],
          "answer": "30 J."
        },
        {
          "title": "NCERT end exercise 11, force polygon",
          "question": "A 10 kg block experiences NCERT Fig. 7.37's force: 0→50 N during 0–1 m; 50 N during 1–3 m; 50→0 N during 3–4 m. Initial KE is 180 J. Find initial and final speed.",
          "steps": [
            "First triangle: ½ × 1 × 50 = 25 J.",
            "Rectangle: (3−1) × 50 = 100 J; final triangle: ½ × 1 × 50 = 25 J. Total work = 150 J.",
            "Initial speed: √(2 × 180/10) = √36 = 6 m/s.",
            "Final KE = 180 + 150 = 330 J; final speed = √(2 × 330/10) = √66 ≈ 8.12 m/s."
          ],
          "answer": "6 m/s initially, approximately 8.12 m/s at 4 m. The illustrated applied force does not become negative."
        },
        {
          "title": "Areas of opposite sign",
          "question": "A force–displacement graph is +12 N from 0 to 3 m and −4 N from 3 to 5 m. Find total work.",
          "steps": [
            "Area above axis: 12 × 3 = +36 J.",
            "Area below axis: −4 × 2 = −8 J.",
            "Algebraic total: 36 − 8 = 28 J."
          ],
          "answer": "Net signed work of that force is +28 J."
        },
        {
          "title": "Average force over displacement",
          "question": "A force increases linearly from 10 to 20 N over 4 m in the direction of travel. Find work.",
          "steps": [
            "The area is a trapezium, or average force times displacement.",
            "Average force = (10+20)/2 = 15 N.",
            "W = 15 × 4 = 60 J."
          ],
          "answer": "60 J."
        }
      ],
      "checkQuestions": [
        {
          "question": "Does the slope of a force–displacement graph directly give work?",
          "answer": "No. The signed area under it gives work."
        },
        {
          "question": "If a line falls from +10 N to +3 N as x grows, must work be negative?",
          "answer": "No. The force stays positive, so its work over positive displacement remains positive."
        },
        {
          "question": "How do you combine areas below and above the F–s axis?",
          "answer": "Treat below-axis work as negative, above-axis work as positive, and add."
        }
      ],
      "tip": "Label axes F (N) and s (m); find signed area in N·m and convert to J. A downward-sloping positive line is still positive force.",
      "visual": "forcegraph"
    },
    {
      "title": "Work–energy theorem, transfers and forms of energy",
      "paragraphs": [
        "Energy is the capacity to perform work, and its SI unit is the joule. The elementary textbook statement links work done on an object with change in its energy. For translational motion, the exact constant-mass work–kinetic energy theorem is W_net = ΔK = K_final − K_initial, where W_net is the sum of work by ALL forces on the object.",
        "A wider energy-accounting equation can include gravitational potential energy, elastic potential energy, thermal energy and external energy transfers. If conservative forces such as gravity are moved into potential-energy terms, use W_nonconservative = Δ(K + U), assuming no other storage or transfers are omitted. These are two consistent methods of keeping accounts, not rival laws. A frictional force often converts useful mechanical energy into internal/thermal energy.",
        "NCERT Example 7.3 follows energy transfer in carrom collisions. The striker does positive work on the white coin when it starts moving; at a collision the white coin can do positive work on the black coin while the black coin does negative work on the white coin. The energy transfer depends on displacement during interaction and may also involve heat and sound.",
        "The chapter's seven common forms include mechanical, thermal, light, sound, electrical, chemical and nuclear energy. Transformations include a lamp converting electrical energy to light and heat, leaves storing some absorbed light as chemical energy, and a flowing stream driving a waterwheel. Total energy is conserved in an adequately defined system; useful mechanical energy alone may not be.",
        "The 'work–energy theorem' is not a licence to write ΔK = W_applied when friction, gravity or other forces also act. Sum ALL work contributions for the net-work version. Alternatively include changes in the relevant potential energy and the work of forces not included in that potential energy."
      ],
      "examples": [
        {
          "title": "NCERT Example 7.3: carrom energy transfer",
          "question": "A moving white carrom coin strikes a black coin at rest. Describe signs of work between coins.",
          "steps": [
            "The white coin pushes the black coin along the black coin's motion, transferring energy.",
            "Work by the white coin on the black coin can be positive.",
            "The black coin's force opposes the moving white coin, so it does negative work on the white coin."
          ],
          "answer": "Mechanical energy is transferred from white to black during contact; not all of it must remain kinetic."
        },
        {
          "title": "Net-work theorem with opposing friction",
          "question": "A 2 kg trolley begins at 4 m/s. An applied force does +24 J and friction does −8 J. Find final speed.",
          "steps": [
            "K_i = ½ × 2 × 4² = 16 J.",
            "W_net = 24 − 8 = 16 J.",
            "K_f = 16 + 16 = 32 J; ½ × 2 × v² = 32.",
            "v = √32 ≈ 5.66 m/s."
          ],
          "answer": "Approximately 5.66 m/s."
        },
        {
          "title": "Braking work and kinetic energy",
          "question": "An object of mass 5 kg slows from 8 to 2 m/s. How much NET work was done?",
          "steps": [
            "Initial K = ½ × 5 × 8² = 160 J.",
            "Final K = ½ × 5 × 2² = 10 J.",
            "W_net = ΔK = 10 − 160 = −150 J."
          ],
          "answer": "−150 J."
        },
        {
          "title": "Everyday transformation",
          "question": "What happens to energy in an electric fan?",
          "steps": [
            "Electrical energy is supplied by the circuit.",
            "A portion becomes rotational kinetic energy of the motor and blades.",
            "Some transfers to sound and thermal energy; the total is not created or destroyed."
          ],
          "answer": "Electrical → mechanical motion, with thermal and sound transfers."
        },
        {
          "title": "Alternative methods: incline without friction",
          "question": "A 1 kg block descends a frictionless vertical drop of 3 m from rest. Find the kinetic energy gained with g = 10.",
          "steps": [
            "Loss of gravitational potential energy = mgΔh = 1 × 10 × 3 = 30 J.",
            "Equivalently, positive net work by gravity is +30 J.",
            "K_f − K_i = 30 J, and K_i = 0."
          ],
          "answer": "The kinetic energy increases by 30 J."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is the precise net-work theorem for a particle of fixed mass?",
          "answer": "W_net = ΔK, the change in kinetic energy."
        },
        {
          "question": "When potential energy is part of the accounting, what belongs on the left?",
          "answer": "Work by nonconservative/external forces not already represented by potential-energy change."
        },
        {
          "question": "Give three forms of energy besides mechanical.",
          "answer": "For example, thermal, electrical and chemical."
        }
      ],
      "tip": "Name your energy system before choosing either W_net = ΔK or K_i + U_i + W_other = K_f + U_f.",
      "visual": "transfers"
    },
    {
      "title": "Kinetic energy: derive, compare and solve motion problems",
      "paragraphs": [
        "An object with mass m and speed v possesses kinetic energy K = ½mv². K is a scalar, never negative for an ordinary mass. Increasing mass twofold at the same speed doubles kinetic energy; increasing speed twofold at the same mass quadruples it. A negative velocity can give the same K because v is squared.",
        "Derivation using Chapters 4 and 6: start from the constant-acceleration relation v² − u² = 2as. Rearrange s = (v² − u²)/(2a), and use net force F_net = ma. Work by the net force over displacement is W_net = F_net × s = ma × (v² − u²)/(2a) = ½m(v² − u²). The result is ΔK. Therefore K = ½mv² when comparing with rest as zero kinetic energy.",
        "The derivation assumes a constant mass and the stated one-dimensional constant acceleration, but the net-work–kinetic-energy relation holds more widely for a particle, including changing force. Always convert km/h to m/s BEFORE squaring speed (divide km/h by 3.6), and convert grams to kilograms.",
        "In NCERT Example 7.5, a 0.2 kg cricket ball has speed 154.8 km/h = 43 m/s, so kinetic energy is 0.5 × 0.2 × 43² = 184.9 J. In Example 7.6, a 15,000 kg aircraft is stopped over 100 m by a 367,500 N opposing force. Its initial kinetic energy must equal 36,750,000 J of lost kinetic energy, giving speed 70 m/s.",
        "Equal kinetic energies do not imply equal speeds when masses differ. Since ½m_Av_A² = ½m_Bv_B², v_A/v_B = √(m_B/m_A). If B is four times as massive as A, A travels twice as fast for equal kinetic energy."
      ],
      "examples": [
        {
          "title": "NCERT Example 7.4: speed doubling",
          "question": "A car doubles its speed while keeping its mass unchanged. Compare the kinetic energies.",
          "steps": [
            "K_initial = ½mv².",
            "K_final = ½m(2v)² = ½m × 4v².",
            "Hence K_final/K_initial = 4."
          ],
          "answer": "Kinetic energy becomes four times as large."
        },
        {
          "title": "NCERT Example 7.5: cricket-ball kinetic energy",
          "question": "A 0.2 kg ball travels at 154.8 km/h. Calculate K.",
          "steps": [
            "Convert speed: 154.8 ÷ 3.6 = 43 m/s.",
            "K = ½ × 0.2 × 43².",
            "K = 0.1 × 1849 = 184.9 J."
          ],
          "answer": "184.9 J."
        },
        {
          "title": "NCERT Example 7.6: carrier aircraft stopping",
          "question": "A 15,000 kg aircraft is stopped in 100 m by an approximately constant 367,500 N force acting against its displacement. Find speed just before braking.",
          "steps": [
            "Opposing work: W = −367500 × 100 = −36,750,000 J.",
            "Net-work theorem: 0 − ½mv² = −36,750,000 J.",
            "½ × 15000 × v² = 36,750,000, so v² = 4900.",
            "v = 70 m/s = 252 km/h."
          ],
          "answer": "70 m/s (252 km/h)."
        },
        {
          "title": "Equal kinetic energies: mass ratio",
          "question": "Objects A and B have masses m and 4m with equal K. What is |v_A|/|v_B|?",
          "steps": [
            "Set ½mv_A² = ½(4m)v_B².",
            "Cancel ½m: v_A² = 4v_B².",
            "Taking positive speed magnitudes, |v_A| = 2|v_B|."
          ],
          "answer": "2:1."
        },
        {
          "title": "Calculate energy from speed with units",
          "question": "A 500 g ball moves at 6 m/s. Find kinetic energy.",
          "steps": [
            "Convert mass: 500 g = 0.5 kg.",
            "K = ½ × 0.5 × 6² = 0.25 × 36.",
            "K = 9 J."
          ],
          "answer": "9 J."
        }
      ],
      "checkQuestions": [
        {
          "question": "Does a moving object with velocity −4 m/s have negative kinetic energy?",
          "answer": "No, K = ½mv² and velocity is squared."
        },
        {
          "question": "A body of fixed mass triples its speed. Factor change in K?",
          "answer": "9 times."
        },
        {
          "question": "What unit must you use for mass in a calculation in joules?",
          "answer": "Kilograms."
        }
      ],
      "tip": "For any K problem: convert mass and speed to SI, square the speed, then multiply by ½m; kinetic energy is never negative.",
      "visual": "kinetic"
    },
    {
      "title": "Potential energy, gravity, height and Activity 7.1",
      "paragraphs": [
        "Potential energy depends on a physical configuration. Elastic potential energy can be stored by a compressed spring or bent bow; gravitational potential energy belongs to the gravitational interaction between Earth and an elevated object. The choice of zero gravitational potential energy is a reference convention. Within a small height range where g is nearly constant, a change in gravitational potential energy is ΔU = mgΔh.",
        "Slowly lifting mass m through vertical height h needs upward work mgh against gravity when acceleration and losses are negligible. Thus U = mgh relative to the chosen height-zero level. Derivation: steady upward support force balances the weight mg, so work by support W = F × vertical displacement = mg × h. Work by gravity is −mgh during the lift.",
        "The same gain in gravitational potential energy occurs going straight up in an elevator or along stairs to the same height; the vertical change matters, not the length or shape of the path. Total energy used by the person can still differ due to friction and physiology: gravitational potential-energy change alone is path independent.",
        "In NCERT Activity 7.1, a ball dropped from different heights into a sand bed makes a larger depression when released higher, all else being comparable. The deeper impression provides qualitative evidence that higher starting gravitational potential energy can lead to more energy transferred to the sand. It is not a universal linear depth-versus-height law; sand density and stopping force matter.",
        "NCERT Example 7.7 uses the weight-lifting relation ΔU = mgh. Real springs, electric charges and magnets also store or exchange potential energy, but the universal formula U = mgh applies specifically to gravitational potential near Earth's surface, not to every type of potential energy."
      ],
      "examples": [
        {
          "title": "Potential energy after vertical lift",
          "question": "A 5 kg bag is raised 2.5 m at nearly constant speed. Take g = 10 m/s². Find ΔU.",
          "steps": [
            "Use ΔU = mgΔh.",
            "Multiply 5 × 10 × 2.5.",
            "ΔU = 125 J."
          ],
          "answer": "Potential energy increases by 125 J."
        },
        {
          "title": "Textbook end exercise 5: staircase and lift",
          "question": "A 50 kg pupil climbs to a floor 72.5 m above ground. Calculate gain in U if they go by stairs or lift; take g = 10.",
          "steps": [
            "In both cases height change = 72.5 m.",
            "ΔU = 50 × 10 × 72.5 = 36,250 J.",
            "The vertical path shape does not change ΔU."
          ],
          "answer": "36,250 J in either case, ignoring losses."
        },
        {
          "title": "Work by gravity during descent",
          "question": "A 2 kg object descends 4 m with g = 10. What work does gravity do?",
          "steps": [
            "Gravitational force acts downwards.",
            "Displacement is also downwards; work by gravity is positive.",
            "W_gravity = mg × 4 = 2 × 10 × 4."
          ],
          "answer": "80 J of positive work by gravity."
        },
        {
          "title": "Activity 7.1: interpreting sand impressions",
          "question": "Two otherwise identical balls are released from different heights above similar sand. Why can the higher drop produce a deeper depression?",
          "steps": [
            "The higher ball begins with greater gravitational potential energy mgh.",
            "During descent this becomes kinetic energy if air resistance is small.",
            "At contact more mechanical energy is available for transfer to the sand, so a deeper indentation can result."
          ],
          "answer": "Greater initial height means greater initial U and potentially more work in the sand."
        },
        {
          "title": "Mass and height proportionality",
          "question": "At the same local g, one box of mass 4 kg is at height 3 m and a box of mass 2 kg is at height 6 m. Compare their gravitational U relative to ground.",
          "steps": [
            "First U = 4 × g × 3 = 12g.",
            "Second U = 2 × g × 6 = 12g.",
            "Equal products m×h give equal potential energy."
          ],
          "answer": "Equal U."
        }
      ],
      "checkQuestions": [
        {
          "question": "If stairs and a lift end at the same height, which gives larger gain in gravitational U?",
          "answer": "Neither. ΔU = mgh is the same."
        },
        {
          "question": "Is U = mgh the formula for all elastic potential energy?",
          "answer": "No. It is the gravitational near-Earth height relation."
        },
        {
          "question": "A 3 kg object rises 2 m with g = 10. How much U does it gain?",
          "answer": "60 J."
        }
      ],
      "tip": "Use the VERTICAL height difference, even if the object travels along a slope or staircase. State your reference level.",
      "visual": "potential"
    },
    {
      "title": "Conservation of mechanical energy, pendulums and friction",
      "paragraphs": [
        "Mechanical energy E_mech = K + U. If gravity (or another conservative force) is the only force doing work, K + U stays constant. In free fall from rest at height h, initial K = 0 and U = mgh. At a lower height h′, the speed satisfies v² = 2g(h − h′), so K = ½m × 2g(h − h′) = mg(h − h′). Add U = mgh′ to obtain K + U = mgh.",
        "Activity 7.2 follows a pendulum: at either extreme of its swing, the bob momentarily has v = 0 and its gravitational U is greatest; near the lowest point, speed and kinetic energy are greatest while U is lowest relative to that level. 'Entirely potential' at the extreme and 'entirely kinetic' at the bottom is an idealised relative-height description with no air resistance. Actual swings shrink as energy becomes heat and sound.",
        "NCERT Example 7.8 uses an ideal frictionless slide: K_top + U_top = K_bottom + U_bottom. Starting from rest height h, mgh = ½mv², so v = √(2gh). Mass cancels; for the same initial vertical drop and ignoring losses, the slide's shape does not affect final speed. Real slides have different friction, so actual speeds may differ.",
        "With friction or other nonconservative work, don't set mechanical energy equal at the endpoints. Write K_i + U_i + W_nonconservative = K_f + U_f. Friction generally does negative work. The energy isn't destroyed; some becomes thermal energy or sound. This distinction is essential in NCERT Example 7.9's sand escape-ramp reasoning.",
        "The gharat or panchakki, a traditional Himalayan watermill, uses gravitational energy of downhill water to drive a grinding mechanism. In hydropower the moving water turns a turbine linked to a generator. Both illustrate transfers and transformations; friction and electrical conversion efficiencies ensure no real machine transfers all energy into the intended output.",
        "The end exercises include energy-versus-position graphs. For motion with total energy fixed at E, K = E − U. When a potential-energy graph has U greater than the available total E, that position is inaccessible from the stated initial state without further supplied energy. When U = E, instantaneous K is zero and the speed is zero."
      ],
      "examples": [
        {
          "title": "Derive free-fall energy conservation",
          "question": "A mass m is released from rest at height h. At intermediate height h′, show the sum of K and U stays mgh.",
          "steps": [
            "The vertical distance fallen is h−h′.",
            "Use v² = 2g(h−h′) for release from rest.",
            "K = ½mv² = mg(h−h′), while U = mgh′.",
            "K + U = mg(h−h′) + mgh′ = mgh."
          ],
          "answer": "Total mechanical energy remains mgh throughout ideal fall."
        },
        {
          "title": "NCERT Example 7.8: slide speed independent of mass",
          "question": "Two children start from rest at the same height 5 m on frictionless slides. With g = 10, find their speeds at the bottom.",
          "steps": [
            "Initial U = mgh and initial K = 0.",
            "At bottom ½mv² = mgh; mass cancels.",
            "v = √(2 × 10 × 5) = √100."
          ],
          "answer": "Both reach 10 m/s, irrespective of their masses and slide shapes."
        },
        {
          "title": "NCERT Example 7.9: escape ramp energy balance",
          "question": "A 10,000 kg truck moves at 72 km/h up a 30° gravel ramp. Opposing sand force is 50,000 N; g = 10. Find minimum travel distance to stop under the idealised constant-force model.",
          "steps": [
            "Convert 72 km/h to 20 m/s. Starting K = ½ × 10000 × 20² = 2,000,000 J.",
            "After travelling d up the ramp, height gain h = d/2, so U_final = mgd/2 = 50,000d J.",
            "Gravel does work W_gravel = −50,000d J.",
            "Use K_i + U_i + W_gravel = K_f + U_f: 2,000,000 − 50,000d = 0 + 50,000d.",
            "Solve 100,000d = 2,000,000 ⇒ d = 20 m."
          ],
          "answer": "20 m."
        },
        {
          "title": "Textbook end exercise 10: air resistance and height",
          "question": "A 2 kg ball is thrown straight upward at 20 m/s but only reaches 19.4 m. With g = 10, what work does air resistance do during ascent?",
          "steps": [
            "Initial K = ½ × 2 × 20² = 400 J.",
            "Potential-energy gain = 2 × 10 × 19.4 = 388 J.",
            "At maximum height final K = 0.",
            "Work by air = Δ(K+U) = 388 − 400 = −12 J."
          ],
          "answer": "−12 J."
        },
        {
          "title": "Textbook end exercise 14: potential-energy limit",
          "question": "A 0.5 kg ball has total mechanical energy 30 J at x = 0 (at rest, U = 30 J). Find speed at a point where U = 10 J, and say if it can reach a point where U = 40 J without energy input.",
          "steps": [
            "At U = 10 J, K = E − U = 30 − 10 = 20 J.",
            "½ × 0.5 × v² = 20 ⇒ v² = 80.",
            "v = √80 ≈ 8.94 m/s.",
            "A location with U = 40 J would require K = −10 J, impossible without added energy."
          ],
          "answer": "Speed about 8.94 m/s at U=10 J; U=40 J point is inaccessible in the stated ideal energy budget."
        },
        {
          "title": "Textbook end exercise 15: coconut in sand, two models",
          "question": "A 1.5 kg coconut falls 10 m (g = 10) and stops in sand with average upward resisting force of 3000 N. Calculate impact speed and indentation depth.",
          "steps": [
            "Before impact K = mgh = 1.5 × 10 × 10 = 150 J, so v = √(2gh) = √200 ≈ 14.14 m/s.",
            "If gravitational work DURING penetration is neglected as in a simple approximate school model: 3000d ≈ 150 ⇒ d ≈ 0.050 m = 5 cm.",
            "A more exact work balance during penetration includes gravity: (3000−15)d = 150, giving d = 150/2985 ≈ 0.05025 m.",
            "The difference is only about 0.25 mm for these values, because mg ≪ 3000 N."
          ],
          "answer": "Impact speed ≈ 14.14 m/s; approximately 5 cm penetration (5.025 cm if weight during penetration is included)."
        }
      ],
      "checkQuestions": [
        {
          "question": "Why do a pendulum's successive peaks become lower in real life?",
          "answer": "Friction and air resistance transfer some mechanical energy into heat and sound."
        },
        {
          "question": "When is it valid to write K_i + U_i = K_f + U_f?",
          "answer": "When there is no net work by nonconservative forces or other omitted energy transfer."
        },
        {
          "question": "A frictionless slide drops vertically 1.8 m, g = 10. Bottom speed?",
          "answer": "v = √(2gh) = √36 = 6 m/s."
        }
      ],
      "tip": "Conservation of TOTAL energy always matters; mechanical K+U stays constant only under suitable conditions. With resistive forces, include their signed work.",
      "visual": "conservation"
    },
    {
      "title": "Power: energy transferred per second",
      "paragraphs": [
        "Power measures how quickly work is done or energy is transferred: average power P_avg = W/Δt. Unit watt means 1 W = 1 J/s. Doing twice the work in the same time requires twice the average power; doing equal work in half the time requires twice the average power.",
        "For a slow near-steady lift, W ≈ mgh, so P_avg ≈ mgh/t. For an engine accelerating a vehicle with negligible losses, its work equals the gain in kinetic energy ΔK, so the average useful power is ΔK/t. Real engines also transfer energy to resistance and thermal losses, so actual input power is higher.",
        "One kilowatt is 1,000 W; one horsepower (hp) is about 746 W as specified in the NCERT text. Horsepower and watts are units of power, NOT energy. Work and energy are measured in joules; their ratio to time is power.",
        "NCERT Examples 7.10 and 7.11 compare a 75 kg barbell lifted 2 m in 5 s (300 W with g = 10), and a 1000 kg car accelerated from rest to 72 km/h in 10 s (20,000 W ideal average). These figures are calculated average mechanical output, not a person's constant physiological power or an engine's exact rated input."
      ],
      "examples": [
        {
          "title": "NCERT Example 7.10: lifting power",
          "question": "A 75 kg weight is lifted 2 m in 5 s, g = 10. Find average useful power.",
          "steps": [
            "Work against gravity W = 75 × 10 × 2 = 1500 J.",
            "Power P = W/t = 1500/5.",
            "P = 300 W."
          ],
          "answer": "300 W."
        },
        {
          "title": "NCERT Example 7.11: accelerating car",
          "question": "A 1000 kg car accelerates from rest to 72 km/h in 10 s, neglect losses. Find its average useful power.",
          "steps": [
            "Convert 72 km/h = 20 m/s.",
            "Gain in kinetic energy = ½ × 1000 × 20² = 200,000 J.",
            "Average P = 200,000/10 = 20,000 W."
          ],
          "answer": "20,000 W (20 kW)."
        },
        {
          "title": "Convert horsepower to watts",
          "question": "A motor is rated 2 hp. Convert to watts using 1 hp = 746 W.",
          "steps": [
            "Multiply by the conversion factor.",
            "2 × 746 = 1492."
          ],
          "answer": "1492 W (1.492 kW)."
        },
        {
          "title": "Same work, different times",
          "question": "Two machines each supply 600 J; one takes 3 s and the other takes 6 s. Compare power.",
          "steps": [
            "First P = 600/3 = 200 W.",
            "Second P = 600/6 = 100 W.",
            "The faster machine transfers energy at twice the rate."
          ],
          "answer": "200 W versus 100 W."
        }
      ],
      "checkQuestions": [
        {
          "question": "How much energy does a 100 W machine transfer in 5 s at this constant rate?",
          "answer": "E = Pt = 100 × 5 = 500 J."
        },
        {
          "question": "Is 1 kW a unit of energy or power?",
          "answer": "Power; 1 kW = 1000 W."
        },
        {
          "question": "If height and time both double for the same mass, how does average lifting power change?",
          "answer": "It stays the same, since mgh/t has the same ratio."
        }
      ],
      "tip": "Check whether the question asks for energy (J) or power (W). Divide work by time only for power.",
      "visual": "power"
    },
    {
      "title": "Simple machines: effort, load and fixed versus movable pulleys",
      "paragraphs": [
        "A simple machine can change the magnitude or direction of a force or make a task more convenient. Load is the force being overcome; effort is the force supplied. Mechanical advantage MA = Load/Effort, a dimensionless ratio. A machine may multiply force, but cannot create energy.",
        "For an ideal machine that returns equal useful output work, F_effort × d_effort = F_load × d_load. Less effort must act through proportionally MORE distance. Real friction wastes some energy, so useful output work is no greater than input work and efficiency η = useful output work / input work is at most 1. A machine does not make required useful energy vanish.",
        "A fixed pulley changes the direction of effort: pulling down raises a load up. In the ideal simple fixed pulley, effort magnitude equals load and MA = 1. This is a convenience advantage, not a force multiplication. Its actual effort can exceed load when pulley bearings have friction.",
        "With a movable pulley, the load is supported by multiple rope segments. Under ideal static conditions, if two equal-tension strands support a load of weight L, then 2T = L and the effort T is L/2, giving MA = 2. The free end then moves about twice the distance that the load rises. Real pulley systems may have lower mechanical advantage because of friction and pulley mass.",
        "The NCERT's movable pulley example is under 'Ready to Go Beyond', so treat MA=2 as a model of a common simple ideal pulley, not a blanket rule for any pulley arrangement. Count load-supporting rope segments carefully. Do not infer that two pulleys automatically give exactly 2 or 4 without looking at the rope path."
      ],
      "examples": [
        {
          "title": "NCERT fixed pulley",
          "question": "An ideal fixed pulley lifts a 120 N load. Find effort and MA.",
          "steps": [
            "Fixed pulley changes direction but not ideal force magnitude.",
            "Effort = 120 N.",
            "MA = 120/120 = 1."
          ],
          "answer": "Effort 120 N; MA = 1."
        },
        {
          "title": "Ideal two-strand movable pulley",
          "question": "A 200 N load is supported by two vertical rope strands in a frictionless movable-pulley model. Find ideal effort.",
          "steps": [
            "Equal rope tensions are T.",
            "Two support strands give upward force 2T.",
            "2T = 200, so T = 100 N.",
            "MA = 200/100 = 2."
          ],
          "answer": "Effort = 100 N; ideal MA = 2."
        },
        {
          "title": "Why a smaller effort travels farther",
          "question": "An ideal machine lifts a 400 N load by 0.5 m using effort 100 N. Find effort distance.",
          "steps": [
            "Output work = 400 × 0.5 = 200 J.",
            "For an ideal machine work input = work output.",
            "100 × d_effort = 200 ⇒ d_effort = 2 m."
          ],
          "answer": "Effort travels 2 m."
        },
        {
          "title": "Mechanical advantage and efficiency",
          "question": "A real machine raises a 300 N load 1 m using 120 N effort over 3 m. Find MA and efficiency.",
          "steps": [
            "MA = Load/Effort = 300/120 = 2.5.",
            "Useful output work = 300 × 1 = 300 J.",
            "Input work = 120 × 3 = 360 J.",
            "Efficiency = 300/360 ≈ 0.833 = 83.3%."
          ],
          "answer": "MA = 2.5 and efficiency ≈ 83.3%."
        }
      ],
      "checkQuestions": [
        {
          "question": "Can a fixed pulley have ideal MA larger than 1?",
          "answer": "A single simple fixed pulley has MA = 1 ideally; it chiefly reverses direction."
        },
        {
          "question": "Does MA > 1 mean more energy is produced?",
          "answer": "No. Ideal force gain is paid for by greater effort distance."
        },
        {
          "question": "Find MA for a 150 N load lifted with 50 N effort.",
          "answer": "MA = 150/50 = 3."
        }
      ],
      "tip": "Compare both FORCES and DISTANCES. MA is a ratio with no unit, and machines don't create energy.",
      "visual": "pulley"
    },
    {
      "title": "Inclined planes: why longer slopes require less effort",
      "paragraphs": [
        "An inclined plane (ramp) raises a load to vertical height h along a longer travel distance L. For a frictionless ramp and steady movement, the minimum parallel effort F′ satisfies F′L = mgh. Since the load is its weight mg, ideal mechanical advantage MA = mg/F′ = L/h. The ramp is easier to push along because effort is spread over a longer distance.",
        "Distinguish slope LENGTH L from horizontal run b. If a ramp forms a right triangle with vertical height h and horizontal run b, its actual slope length is L = √(h²+b²). Substituting horizontal run for L would overestimate the applied force and underestimate ideal MA.",
        "NCERT Activity 7.3 compares lifting a load vertically and moving it along a sloping plank; the effort along a shallower ramp can be smaller, but the travel distance is longer. This qualitative interpretation assumes other conditions are comparable, and friction can change the force reading.",
        "Equation MA = L/h is the frictionless ideal force advantage for a force applied along the ramp with simple supporting conditions. With friction, a higher effort is required and actual MA is smaller. An inclined plane does not eliminate work against gravity, and some work turns into heat.",
        "NCERT Example 7.12 depicts a 30 cm height and a 40 cm horizontal base, forming a 50 cm ramp. Ideal MA = L/h = 50/30 ≈ 1.67. A longer, gentler ramp with the same height offers larger ideal MA, but also takes more distance."
      ],
      "examples": [
        {
          "title": "NCERT Example 7.12: 30–40–50 ramp",
          "question": "A ramp rises 30 cm vertically over a 40 cm horizontal base. Find ramp length and ideal MA.",
          "steps": [
            "Pythagoras: L = √(30²+40²) = √2500 = 50 cm.",
            "MA = L/h = 50/30.",
            "MA = 5/3 ≈ 1.67."
          ],
          "answer": "Length 50 cm, ideal MA ≈ 1.67."
        },
        {
          "title": "Ramp effort from work balance",
          "question": "A 300 N load is pushed steadily up a frictionless 6 m long ramp gaining 1.5 m height. Find required parallel effort.",
          "steps": [
            "Useful output work = 300 × 1.5 = 450 J.",
            "Set ideal input = output: F′ × 6 = 450 J.",
            "F′ = 450/6 = 75 N."
          ],
          "answer": "75 N effort; ideal MA = 4."
        },
        {
          "title": "Shorter versus longer ramp",
          "question": "A 500 N load must rise 1 m. Compare ideal effort on ramps of length 2 m and 5 m.",
          "steps": [
            "Output work in both cases = 500 × 1 = 500 J.",
            "Short ramp effort = 500/2 = 250 N.",
            "Long ramp effort = 500/5 = 100 N.",
            "Both produce 500 J useful output."
          ],
          "answer": "250 N versus 100 N; longer ramp needs less ideal force but more travel."
        },
        {
          "title": "Ramp with losses",
          "question": "An effort of 100 N moves a load along a 5 m ramp while the gain in gravitational energy is 400 J. Find efficiency.",
          "steps": [
            "Input work = 100 × 5 = 500 J.",
            "Useful output work = 400 J.",
            "η = 400/500 = 0.80."
          ],
          "answer": "Efficiency = 80%."
        }
      ],
      "checkQuestions": [
        {
          "question": "Which ramp dimension appears in MA=L/h: horizontal run or sloping length?",
          "answer": "The actual sloping length L."
        },
        {
          "question": "A frictionless ramp has L = 4 m and h = 1 m. Ideal MA?",
          "answer": "MA = 4."
        },
        {
          "question": "Why is the work not reduced by a longer ideal ramp?",
          "answer": "The smaller effort is applied through more distance; F_effort×L still equals mgh."
        }
      ],
      "tip": "Draw the right triangle and label L on the sloping side. MA=L/h only for ideal frictionless ramps.",
      "visual": "incline"
    },
    {
      "title": "Levers: effort arms, balance and three classes",
      "paragraphs": [
        "A lever is a rigid bar which turns about a fulcrum. Load and effort are forces applied at different positions relative to this pivot. Their turning effects are moments or torques. For perpendicular forces on a balanced ideal lever, effort × effort arm = load × load arm. Arm lengths are distances from fulcrum to the force lines of action, not necessarily the whole bar's length.",
        "Mechanical advantage for an ideal lever is MA = Load/Effort = effort arm/load arm. Increasing the effort arm can reduce required effort, but the end near the effort moves farther than the load end. NCERT Activity 7.4 explores this by placing a weight near one end and effort farther from the pivot. The model is static balance without significant friction or lever weight unless included separately.",
        "NCERT Activity 7.5 uses a balance with equal coins: if n₁ coins hang at distance L₁ and n₂ identical coins hang at distance L₂, balance means n₁L₁ = n₂L₂, since identical mass and local g cancel. This is a model for equilibrium rather than proof that a lever produces free energy.",
        "Class I has the FULCRUM between load and effort, examples a seesaw and scissors. Class II has the LOAD in the middle, examples a wheelbarrow and bottle opener; these usually trade greater effort displacement for increased force. Class III has the EFFORT in the middle, as in a human forearm lifted by biceps, tweezers or a broom. A third-class lever often has MA < 1 but helps produce larger displacement or speed at the load end.",
        "In NCERT Example 7.13, a 15 kg child sits 2 m from the fulcrum on a seesaw. A 30 kg child balances on the opposite side at 1 m: 15×2 = 30×1. It is the ratio of masses multiplied by lever arms that matters, not the masses alone.",
        "The three lever classes are determined by which component lies between the other two. Do not classify by the absolute size of the load or the effort. Be careful with tools that can act as different lever types in different arrangements; classify from a clear diagram of fulcrum, effort and load."
      ],
      "examples": [
        {
          "title": "NCERT Example 7.13: seesaw balance",
          "question": "A 15 kg child sits 2 m left of the pivot. Where should a 30 kg child sit to balance?",
          "steps": [
            "Balance requires weight×arm on each side to be equal.",
            "15g × 2 = 30g × d; cancel g.",
            "30 = 30d ⇒ d = 1 m."
          ],
          "answer": "1 m from the pivot, on the opposite side."
        },
        {
          "title": "NCERT Activity 7.5: coin balance",
          "question": "One identical coin hangs 12 cm from a pivot on the left. Two identical coins hang on the right. Where must they hang to balance?",
          "steps": [
            "Coin weights are proportional to count.",
            "Use n₁L₁ = n₂L₂.",
            "1×12 = 2×d ⇒ d = 6 cm."
          ],
          "answer": "6 cm from the pivot on the right."
        },
        {
          "title": "Lever mechanical advantage",
          "question": "A lever has an effort arm of 0.8 m and load arm of 0.2 m. Find ideal MA.",
          "steps": [
            "MA = effort arm / load arm.",
            "MA = 0.8/0.2 = 4.",
            "An effort 1/4 as large as the load balances it in the ideal model."
          ],
          "answer": "Ideal MA = 4."
        },
        {
          "title": "Find effort for a specific load",
          "question": "A 600 N load is 0.2 m from a pivot, and an effort is applied perpendicular at 1.2 m from it. Find balancing effort.",
          "steps": [
            "Balance moments: F × 1.2 = 600 × 0.2.",
            "Right side = 120 N·m.",
            "F = 120/1.2 = 100 N."
          ],
          "answer": "100 N effort."
        },
        {
          "title": "Classify three levers",
          "question": "Identify lever classes where (a) fulcrum is central, (b) load is central, and (c) effort is central.",
          "steps": [
            "Class I means fulcrum between other two.",
            "Class II means load between other two.",
            "Class III means effort between other two."
          ],
          "answer": "(a) I, (b) II, (c) III."
        },
        {
          "title": "Class III trade-off",
          "question": "A human-forearm model has effort arm 4 cm and load arm 24 cm. Find ideal MA.",
          "steps": [
            "MA = effort arm/load arm = 4/24.",
            "MA = 1/6, less than 1.",
            "Effort force must exceed load, but hand movement can be greater than the muscle attachment displacement."
          ],
          "answer": "MA = 1/6; this lever trades force advantage for travel/speed."
        }
      ],
      "checkQuestions": [
        {
          "question": "How can 1 coin balance 4 identical coins on a lever?",
          "answer": "Place the single coin four times farther from the fulcrum than the four-coin side."
        },
        {
          "question": "Which lever class has effort between fulcrum and load?",
          "answer": "Class III."
        },
        {
          "question": "A fulcrum lies between load and effort. Which class?",
          "answer": "Class I."
        },
        {
          "question": "Why can a class-III lever still be useful with MA<1?",
          "answer": "It can increase movement distance or speed of the load compared with the input point."
        }
      ],
      "tip": "Always label fulcrum F, effort E and load L before using moments; lever class comes from which of F/L/E lies in the middle.",
      "visual": "lever"
    }
  ]
};
window.CBSE_CLASS9_SCIENCE_FULL_NOTES=Object.assign({},window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{}, {'Work, Energy, and Simple Machines':chapter});
})();
