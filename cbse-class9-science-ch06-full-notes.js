/* Original StudyAI Class 9 Science Chapter 6 notes: NCERT Exploration 2026–27, iesc106.pdf, printed pp. 94–115. */
(()=>{
'use strict';
const chapter={
  "sourceBook": "Exploration · Textbook of Science for Grade 9",
  "sourcePdf": "iesc106.pdf",
  "printedPages": "94–115",
  "reviewStatus": "NCERT-grounded authored notes; teacher and visual editorial review outstanding",
  "lead": "Learn why velocity changes: draw the actual forces acting on a body, add them with directions, apply Newton's laws and solve graph, kinematics, impact and connected-system problems step by step. Each NCERT classroom activity is explained by its predicted observations and physical principles.",
  "sections": [
    {
      "title": "Force as a vector: measuring and combining forces",
      "paragraphs": [
        "A force is an interaction capable of changing an object's speed, direction or shape. Its effect depends on both magnitude and direction: force is a vector. The SI unit is the newton (N); a spring balance measures a force magnitude through extension. Sketch an arrow pointing in the direction of each force, give its size in N, then state clearly which object experiences it.",
        "The net force on an object is the vector sum of all forces acting on that same object. For forces along one straight line, choose a positive direction, write forces in that direction as positive and opposing forces as negative. For forces in the same direction, magnitudes add. For opposite forces, subtract magnitudes and keep the larger direction. Two equal and opposite forces on the SAME object balance translational motion, but equal opposite forces at different points can still turn an extended object.",
        "A free-body diagram isolates ONE chosen object. On a book resting on a horizontal table, draw weight downward and the contact force (normal reaction) upward. When the book does not accelerate vertically, these balance. A horizontal push and friction may also act and must be included. Do not put a force exerted BY the book on the table in the free-body diagram OF the book.",
        "NCERT section 6.1 includes spring-balance measurement; section 6.2 uses tug of war, a pushed car and force arrows to distinguish balanced and unbalanced forces. Forces cannot be labelled 'balanced' merely because an object is moving slowly or is stationary at an instant: evaluate their vector sum. A body can move at a constant nonzero velocity under a zero net force."
      ],
      "examples": [
        {
          "title": "NCERT Example 6.1: force arrows in three arrangements",
          "question": "A block experiences 10 N and 6 N along the same straight line. Find the net force when (a) both act right, (b) 10 N acts right and 6 N left, (c) 10 N acts left and 6 N right.",
          "steps": [
            "Choose right as positive.",
            "(a) +10 + 6 = +16 N: 16 N to the right.",
            "(b) +10 − 6 = +4 N: 4 N to the right.",
            "(c) −10 + 6 = −4 N: 4 N to the left."
          ],
          "answer": "The net forces are 16 N right, 4 N right, and 4 N left."
        },
        {
          "title": "Balanced forces do not demand rest",
          "question": "A trolley moves right at steady velocity. The push is 18 N right and friction is 18 N left. What happens?",
          "steps": [
            "Compute net horizontal force: 18 − 18 = 0 N.",
            "Newton's first law: velocity stays unchanged when the net force is zero.",
            "The trolley can keep moving right; zero net force does not mean zero speed."
          ],
          "answer": "Net horizontal force is zero, so the velocity remains constant."
        },
        {
          "title": "A correct free-body diagram",
          "question": "A 2 kg block rests on a level table, without any horizontal push. What vertical arrows belong on its diagram? Take g = 9.8 m/s².",
          "steps": [
            "Earth pulls the block downward with weight mg = 2 × 9.8 = 19.6 N.",
            "The table pushes the block upward with normal reaction N = 19.6 N, because vertical acceleration is zero.",
            "Both arrows act on the block and cancel in the vertical direction."
          ],
          "answer": "Weight 19.6 N down and normal force 19.6 N up."
        },
        {
          "title": "Force diagrams versus action-reaction pairs",
          "question": "A hand pushes a stationary wall with 30 N right. Is the wall's 30 N reaction a balancing force on the wall?",
          "steps": [
            "The hand acts ON the wall with 30 N right.",
            "The wall reacts ON the hand with 30 N left, so this pair acts on different objects.",
            "Other forces from the building act on the wall to keep it stationary; draw them separately."
          ],
          "answer": "The reaction on the hand is not a balancing force on the wall."
        }
      ],
      "checkQuestions": [
        {
          "question": "Can an object have zero net force while moving?",
          "answer": "Yes. Its velocity can remain constant, including a constant nonzero velocity."
        },
        {
          "question": "Two horizontal forces of 12 N right and 20 N left act on one block. Give the net force.",
          "answer": "8 N left."
        },
        {
          "question": "Which object belongs in a free-body diagram of the book: the book or the table?",
          "answer": "Only forces acting on the book belong in the book's free-body diagram."
        }
      ],
      "tip": "Exam method: name the object, choose positive direction, draw every force ON it, calculate signed net force and include direction.",
      "visual": "forces"
    },
    {
      "title": "Friction and NCERT Activities 6.1–6.2",
      "paragraphs": [
        "Friction is a contact force that opposes relative slipping or the tendency to slip between surfaces. For a sliding box, it usually points opposite to the direction in which the box slides relative to the floor. It need not always oppose the forward motion of a whole object: static friction on a walking foot can point forward and help the person advance.",
        "In NCERT Activity 6.1, the same coin stack is launched along different surfaces. On a rougher surface it slows sooner and travels a shorter distance. On a smoother surface it normally travels farther, suggesting a smaller retarding force, provided the initial launch is controlled. Immediately after the rubber band stops touching the coins, the launching force disappears while friction continues.",
        "In Activity 6.2, a spring balance pulls a wooden block on different surfaces. Differences in measured pulling force reveal differences in friction. A reading just as motion starts is associated with maximum static friction, while a reading during steady sliding estimates kinetic friction. The NCERT result is qualitative: surface material and contact conditions matter. Do not infer a universal 'smooth = no friction' law.",
        "To understand why real moving objects stop, isolate the horizontal forces: after the push ends, friction and sometimes air resistance remain. They create a backward net force and hence negative acceleration relative to forward motion. On an ideal frictionless horizontal surface, and without other unbalanced forces, the object would retain its velocity.",
        "The normal force is the support force perpendicular to the contacting surface. Friction acts parallel to the contact surface. On a horizontal level floor with no vertical acceleration and no extra vertical force, the normal reaction equals weight, but that equality does not hold in every situation."
      ],
      "examples": [
        {
          "title": "Interpret Activity 6.1",
          "question": "Identical objects start at the same speed and travel 0.7 m on surface A but 1.8 m on surface B before stopping. Which gives the smaller average retarding effect?",
          "steps": [
            "Both start with the same speed and finish at rest.",
            "Stopping over more distance requires a smaller magnitude of average deceleration under the same simple conditions.",
            "The longer path on B supports smaller effective frictional slowing."
          ],
          "answer": "Surface B has the smaller average retarding effect, assuming otherwise comparable conditions."
        },
        {
          "title": "Activity 6.2: interpret a balance reading",
          "question": "A block is pulled across one surface at constant speed and the spring balance reads 4 N. What is the sliding friction?",
          "steps": [
            "Constant velocity means net horizontal force equals zero.",
            "The spring-balance pull is 4 N in one direction.",
            "Sliding friction must oppose it with equal magnitude."
          ],
          "answer": "The frictional force is 4 N opposite the motion."
        },
        {
          "title": "Moving after a push ends",
          "question": "A block slides to the right after a hand loses contact. Draw the net horizontal force if friction is 3 N.",
          "steps": [
            "Remove the hand's force because the hand is no longer in contact.",
            "Add sliding friction of 3 N left.",
            "No other horizontal force is stated, so net force is 3 N left."
          ],
          "answer": "The block decelerates while sliding right because its net horizontal force points left."
        }
      ],
      "checkQuestions": [
        {
          "question": "Does friction always oppose the direction in which a person walks?",
          "answer": "No. Static friction from the ground on a walking foot may act forward."
        },
        {
          "question": "A box slides steadily while pulled with 7 N. What friction acts against it?",
          "answer": "7 N in the opposite horizontal direction."
        },
        {
          "question": "Why do objects move farther on a lower-friction surface when launched similarly?",
          "answer": "Their speed decreases more slowly, so they travel farther before stopping."
        }
      ],
      "tip": "When a question says 'constant speed in a straight line', do not forget friction; it may be balanced by a forward applied force.",
      "visual": "friction"
    },
    {
      "title": "Newton's first law: inertia and velocity graphs",
      "paragraphs": [
        "Newton's first law states that an object remains at rest or keeps moving with constant velocity along a straight line unless a nonzero net external force acts. This makes the misconception 'motion requires force' incorrect. Force is needed to CHANGE velocity, not to maintain a constant velocity under ideal conditions.",
        "Inertia is resistance to a change in the state of motion; mass measures inertia in everyday Newtonian mechanics. Greater mass means a given net force produces less acceleration. A standing passenger lurching forward when a bus stops is one qualitative example of the body's tendency to retain its original motion, although supports and contact forces eventually alter it.",
        "NCERT introduces Galileo's friction-free thought experiment: if all impediments are removed, a moving object on a horizontal surface has no reason to slow down. It is a theoretical idealisation, not a claim that actual roads have no friction or that a vacuum removes contact friction. The law works in inertial frames of reference.",
        "A velocity-time graph is horizontal if velocity is constant: acceleration, the slope, equals zero. Both a horizontal line above the time axis (constant positive velocity) and a horizontal line at zero (rest) represent zero acceleration. A sloped straight line indicates a constant nonzero acceleration, requiring nonzero net force for a constant-mass object.",
        "Balanced forces can act in several directions at once. A vehicle moving steadily can have a forward traction force balanced by drag and friction and an upward normal force balanced by weight. Check the net force along each axis, not whether a force exists at all."
      ],
      "examples": [
        {
          "title": "Steady motion on a velocity-time graph",
          "question": "The velocity-time graph of a 4 kg trolley is a horizontal line at 3 m/s for 6 s. Find its acceleration and net force.",
          "steps": [
            "The slope of the velocity-time graph is (3 − 3)/6 = 0 m/s².",
            "Apply F_net = ma = 4 × 0.",
            "Constant nonzero speed does not require a nonzero net force."
          ],
          "answer": "Acceleration = 0 m/s²; net force = 0 N."
        },
        {
          "title": "Inertia without an imaginary forward force",
          "question": "A puck glides along an ideal frictionless level track after the hand releases it. What keeps it moving?",
          "steps": [
            "After release, the hand no longer exerts a force.",
            "Weight and the track's normal support cancel vertically; horizontal net force is zero.",
            "Newton's first law predicts unchanged horizontal velocity."
          ],
          "answer": "No continuing forward force is needed; inertia describes its steady motion."
        },
        {
          "title": "Recognise the limit of a graph",
          "question": "A velocity-time graph falls linearly from +8 m/s at t = 0 to +2 m/s at t = 3 s. Does the first law predict this without forces?",
          "steps": [
            "Calculate the slope: (2 − 8)/3 = −2 m/s².",
            "Velocity is changing, so acceleration is nonzero.",
            "A nonzero net force is required for a constant-mass object."
          ],
          "answer": "No. The object has −2 m/s² acceleration and a net force opposite its positive motion."
        }
      ],
      "checkQuestions": [
        {
          "question": "A horizontal velocity-time line at −5 m/s has what acceleration?",
          "answer": "Zero. Its velocity is a constant negative value."
        },
        {
          "question": "What does mass tell you about inertia?",
          "answer": "More mass generally means more resistance to acceleration for the same net force."
        },
        {
          "question": "Does removing air from a container eliminate friction between a block and the floor?",
          "answer": "No. Contact friction can remain even without air."
        }
      ],
      "tip": "A flat velocity-time graph indicates zero NET force, not necessarily that no forces act.",
      "visual": "inertia"
    },
    {
      "title": "Newton's second law: mass, net force and the unit newton",
      "paragraphs": [
        "Newton's second law connects cause and response quantitatively. For a constant mass, the vector relationship is F_net = ma. Therefore, a = F_net/m. Acceleration points in the direction of net force; it need not point in the direction the object is currently moving. Always use the NET force, not the size of only one applied push.",
        "If a given mass experiences twice the net force, its acceleration doubles. If the same net force acts on twice the mass, the acceleration halves. Both proportionalities can be studied experimentally. They do not say that every object moving twice as fast needs twice the force.",
        "In NCERT Activity 6.3, a model cart is acted upon by different net forces, while the mass is kept approximately fixed. Measurements support acceleration proportional to force. In Activity 6.4, extra load changes the moving mass while the driving force is held approximately fixed; measurements support acceleration inversely proportional to mass. Friction, rotational inertia, timing uncertainty and model assumptions can make practical results differ from ideal ratios.",
        "By definition, 1 newton is the net force needed to accelerate a 1 kg mass by 1 m/s²: 1 N = 1 kg·m/s². For numerical problems write mass in kilograms and acceleration in m/s². Distinguish the scalar magnitude of force from its vector direction, including negative signs.",
        "Graphically, a force-versus-acceleration graph for fixed mass is a straight line through the origin with gradient mass, since F = ma. A graph of acceleration versus mass for fixed force curves downward as a = F/m. The product m × a stays constant when the same force is used."
      ],
      "examples": [
        {
          "title": "Unit definition",
          "question": "A 1 kg cart experiences 1 m/s² acceleration due to a net force. Determine the force and its unit.",
          "steps": [
            "F_net = m × a = 1 kg × 1 m/s².",
            "Multiply the units: kg·m/s².",
            "This derived SI unit is named the newton."
          ],
          "answer": "F_net = 1 N."
        },
        {
          "title": "Force doubled at fixed mass",
          "question": "A 4 kg trolley accelerates at 1.5 m/s². Find its net force and its acceleration if force doubles.",
          "steps": [
            "Initial force: F = 4 × 1.5 = 6 N.",
            "New force: 2 × 6 = 12 N.",
            "New acceleration: 12/4 = 3 m/s²."
          ],
          "answer": "Original force 6 N; new acceleration 3 m/s²."
        },
        {
          "title": "Mass doubled at fixed force",
          "question": "The same net force of 12 N acts on a 3 kg cart and a 6 kg cart. Compare accelerations.",
          "steps": [
            "First: a = 12/3 = 4 m/s².",
            "Second: a = 12/6 = 2 m/s².",
            "Double the mass halves acceleration for the same net force."
          ],
          "answer": "4 m/s² versus 2 m/s²."
        },
        {
          "title": "Read an acceleration-mass curve",
          "question": "A graph shows acceleration of 10 m/s² when mass is 1 kg and 2 m/s² when mass is 5 kg. Is one constant force consistent with both points?",
          "steps": [
            "For 1 kg: F = ma = 1 × 10 = 10 N.",
            "For 5 kg: F = ma = 5 × 2 = 10 N.",
            "Both calculations give the same force."
          ],
          "answer": "Yes. A constant net force of 10 N is consistent with both points."
        }
      ],
      "checkQuestions": [
        {
          "question": "A net force of 18 N acts on a 6 kg object. Its acceleration?",
          "answer": "3 m/s² in the net force direction."
        },
        {
          "question": "What does 1 N equal in SI base units?",
          "answer": "1 kg·m/s²."
        },
        {
          "question": "Why does doubling speed not automatically imply doubling force?",
          "answer": "Force depends on acceleration, the rate of change of velocity, rather than velocity alone."
        }
      ],
      "tip": "In every second-law calculation: draw forces, compute F_net, convert grams to kilograms and show direction after F_net = ma.",
      "visual": "second"
    },
    {
      "title": "Weight, impact time and consequences of the second law",
      "paragraphs": [
        "Mass describes how much matter an object contains and, in this context, measures inertia; SI unit kg. Weight is the gravitational force acting on it, so near Earth's surface W = mg. Weight has unit N, points downward and changes when the local gravitational acceleration changes. Use g = 9.8 m/s² unless an exercise specifies an approximation such as 10 m/s².",
        "When an object is held stationary, the forces on it balance. In NCERT Example 6.4, a weightlifter holds a barbell without vertical acceleration: her upward support force must balance the barbell's downward gravitational force. This does not mean the weight has disappeared or the net force is '294 N upward'; net force is zero.",
        "For approximately constant mass, a = Δv/Δt, so average net force during a speed change satisfies F_avg = mΔv/Δt. For the same change in velocity, a longer stopping time lowers the magnitude of average acceleration and force. The size and shape of real impact forces can vary during contact, so this is a simplified average-force argument.",
        "NCERT uses pulling the hands back while catching a cricket ball, vehicle airbags with seat belts and protective packaging to illustrate longer slowing time. Cushions and bubble wrap also help by spreading contact and deforming over a distance. These explanations concern injury prevention and everyday protection, not instructions for testing impacts.",
        "For forces acting vertically, draw weight and the normal/support force separately. A stationary object has zero net vertical force. If there is an upward acceleration, the upward support force exceeds the weight under the simple two-force model."
      ],
      "examples": [
        {
          "title": "NCERT Example 6.4: weightlifter",
          "question": "Two plates each of mass 10 kg and a bar of mass 10 kg are held stationary. Find the upward force needed. Use g = 9.8 m/s².",
          "steps": [
            "Total mass = 10 + 10 + 10 = 30 kg.",
            "Weight = mg = 30 × 9.8 = 294 N downward.",
            "Stationary means vertical net force = 0, so an equal upward support force is needed."
          ],
          "answer": "Upward force = 294 N; net vertical force = 0 N."
        },
        {
          "title": "Weight is a force",
          "question": "Find the weight of a 2.5 kg schoolbag on Earth. Use g = 9.8 m/s².",
          "steps": [
            "Apply W = mg.",
            "W = 2.5 × 9.8 = 24.5 N.",
            "Give downward direction and N units, not kg."
          ],
          "answer": "24.5 N downward."
        },
        {
          "title": "Catching a ball: compare time, not final force alone",
          "question": "A 0.20 kg ball slows from 10 m/s to rest. Compare average force magnitudes if stopping takes 0.10 s or 0.50 s.",
          "steps": [
            "Magnitude of change in velocity = 10 m/s.",
            "0.10 s: |F_avg| = 0.20 × 10/0.10 = 20 N.",
            "0.50 s: |F_avg| = 0.20 × 10/0.50 = 4 N.",
            "Average force points opposite the ball's initial motion."
          ],
          "answer": "Lengthening stopping time fivefold reduces this simplified average force from 20 N to 4 N."
        },
        {
          "title": "Support force versus weight",
          "question": "A 5 kg book stack rests on a level desk. Find the desk's normal reaction, neglecting other vertical forces.",
          "steps": [
            "Weight W = 5 × 9.8 = 49 N downward.",
            "No vertical acceleration means N − W = 0.",
            "Normal force N = 49 N upward."
          ],
          "answer": "49 N upward."
        }
      ],
      "checkQuestions": [
        {
          "question": "Is a mass of 3 kg also a weight of 3 N?",
          "answer": "No. Kilograms measure mass; weight is about 29.4 N near Earth."
        },
        {
          "question": "Why does a cushion help reduce average impact force?",
          "answer": "It can increase the time taken to change velocity, reducing average deceleration and force."
        },
        {
          "question": "When an object is supported at rest, is its weight zero?",
          "answer": "No. Support force balances its weight so net force is zero."
        }
      ],
      "tip": "Write weight W = mg in newtons and identify it separately from mass in kilograms. During impacts, specify average force when using Δv/Δt.",
      "visual": "weight"
    },
    {
      "title": "Worked problems combining force with Chapter 4 kinematics",
      "paragraphs": [
        "Chapter 4 gives equations for constant acceleration: v = u + at, s = ut + ½at² and v² = u² + 2as. Chapter 6 provides the reason for acceleration: F_net = ma. Many NCERT problems require a two-stage method: first calculate acceleration from the motion data, then use net force and mass, or calculate acceleration from net force, then find displacement.",
        "Use a clearly stated sign convention. For straight-line motion, choose forward as positive. Braking acceleration is negative when the object initially travels forward. A negative force result is a direction, not a negative force magnitude. When an object is stationary throughout, displacement is zero even if individual forces act on it.",
        "In NCERT Example 6.5, pushing a 25 kg block with the same force as the opposing friction yields zero net force and no change from rest. Increasing the push above friction makes the block accelerate. NCERT Example 6.6 reads slopes of three portions of a car's velocity-time graph to obtain three different net forces.",
        "The velocity-time graph slope gives acceleration. A horizontal segment at nonzero speed means the net force is zero, not that 'no forces of any sort exist'. In this chapter, idealisations typically assume constant mass, a straight line, constant acceleration during each graph segment, and specified friction. State assumptions when conditions are incomplete.",
        "Check numerical units before calculation: 100 g = 0.100 kg, 50 cm = 0.50 m and 108 km/h = 30 m/s. Converting the input quantities correctly is as important as choosing the equation."
      ],
      "examples": [
        {
          "title": "NCERT Example 6.5: 25 kg block with friction",
          "question": "A 25 kg block starts from rest. Opposing friction is 50 N. Determine displacement in 2 s for applied forces of 50 N and 55 N.",
          "steps": [
            "Case (i): F_net = 50 − 50 = 0 N, so a = 0 and s = 0 m from rest.",
            "Case (ii): F_net = 55 − 50 = 5 N forward.",
            "a = F_net/m = 5/25 = 0.2 m/s².",
            "s = ut + ½at² = 0 + 0.5 × 0.2 × 2² = 0.4 m."
          ],
          "answer": "Displacements: 0 m at 50 N; 0.4 m forward at 55 N."
        },
        {
          "title": "NCERT Example 6.6: a three-stage car graph",
          "question": "A 1500 kg car's velocity changes 0→10 m/s (0–5 s), stays 10 m/s (5–10 s), then falls 10→0 m/s (10–15 s). Find net forces east positive.",
          "steps": [
            "0–5 s: a = (10−0)/5 = +2 m/s²; F = 1500×2 = +3000 N.",
            "5–10 s: a = (10−10)/5 = 0; F_net = 0 N.",
            "10–15 s: a = (0−10)/5 = −2 m/s²; F = 1500×(−2) = −3000 N."
          ],
          "answer": "3000 N east, 0 N, and 3000 N west respectively."
        },
        {
          "title": "Find force from stopping time",
          "question": "An 800 kg electric cart travels at 6 m/s and slows uniformly to rest in 4 s. What net force acts along the track?",
          "steps": [
            "Take initial motion as positive: u = +6, v = 0, t = 4.",
            "a = (0−6)/4 = −1.5 m/s².",
            "F_net = ma = 800 × (−1.5) = −1200 N."
          ],
          "answer": "1200 N opposite the initial motion."
        },
        {
          "title": "Infer force from velocity-time slope",
          "question": "A 10 kg object accelerates uniformly from 10 m/s to 30 m/s in 8 s. Compute F_net.",
          "steps": [
            "Calculate slope a = (30−10)/8 = 2.5 m/s².",
            "Multiply by mass: F_net = 10 × 2.5 = 25 N.",
            "The direction is along positive velocity change."
          ],
          "answer": "25 N in the direction of increasing velocity."
        },
        {
          "title": "Stopping distance with friction",
          "question": "A 2 kg block moving at 10 m/s experiences 7 N friction and a further opposing 3 N force. Find the stopping distance if both are constant.",
          "steps": [
            "Net force = −(7 + 3) = −10 N.",
            "a = F_net/m = −10/2 = −5 m/s².",
            "Use v² = u² + 2as: 0 = 100 − 10s.",
            "s = 10 m."
          ],
          "answer": "Stopping distance = 10 m."
        }
      ],
      "checkQuestions": [
        {
          "question": "A 3 kg object changes from 2 m/s to 8 m/s in 2 s. Find force.",
          "answer": "a = 3 m/s²; F_net = 9 N in the positive direction."
        },
        {
          "question": "If a velocity-time graph is horizontal while a car travels, what is the net force?",
          "answer": "0 N, since acceleration is zero."
        },
        {
          "question": "Convert 108 km/h into m/s.",
          "answer": "30 m/s."
        }
      ],
      "tip": "For graph numericals, write gradient a = Δv/Δt first. Then apply F_net = ma with signed acceleration and a direction.",
      "visual": "graph"
    },
    {
      "title": "Newton's third law: interaction pairs and unequal accelerations",
      "paragraphs": [
        "Newton's third law says that when object A exerts a force on object B, B simultaneously exerts an equal-magnitude and opposite-direction force on A. Name both objects when writing an interaction pair: 'force of A on B' and 'force of B on A'. These forces act on DIFFERENT objects and therefore do not cancel in the free-body diagram of either single object.",
        "In NCERT Activity 6.5, the interaction of a person on a wheeled chair and a heavy table helps visualise opposite reactions. In Activity 6.6, two connected spring balances give matching force magnitudes while pulled from either end. A larger applied pull raises both readings equally; a reading is not doubled because two forces are present.",
        "In Activity 6.7, air leaves a balloon in one direction and the balloon responds in the opposite direction. This is the same interaction principle used to describe paddling a canoe and rocket propulsion. While walking, a foot pushes backward on the ground and static friction from the ground pushes the foot forward. Friction can therefore be the forward propulsive force.",
        "The two objects may have unequal masses, so their accelerations are different although the interaction-force magnitudes are equal: |a_A| = F/m_A and |a_B| = F/m_B, if other relevant forces are absent or accounted for. The huge mass of Earth explains why its acceleration under a fruit's equal gravitational force is negligible compared with the fruit's acceleration.",
        "Third-law pairs occur for non-contact interactions too, including gravity, magnetic attraction and electrostatic forces. For collision questions, state that forces on each other are equal in magnitude DURING the interaction. Avoid confusing this with the net force on each object, which may include other forces.",
        "Optional NCERT 'Ready to Go Beyond' link: momentum p = mv has the direction of velocity. A more general treatment of Newton's second law concerns rate of change of momentum. The Class 9 numerical core uses F_net = ma for constant mass; momentum is included here as a labelled extension rather than pretending it is a required separate long topic."
      ],
      "examples": [
        {
          "title": "Label the interacting objects",
          "question": "A skater pushes a wall to the left with 40 N. Which force does the wall exert, and on what object?",
          "steps": [
            "Skater-on-wall: 40 N left, acting on the wall.",
            "Wall-on-skater: 40 N right, acting on the skater.",
            "The two forces belong to different free-body diagrams."
          ],
          "answer": "The wall exerts 40 N right on the skater."
        },
        {
          "title": "Equal forces, different accelerations",
          "question": "Two frictionless carts of mass 2 kg and 8 kg interact with equal-magnitude forces of 16 N in opposite directions. Calculate magnitudes of accelerations.",
          "steps": [
            "Cart A: a_A = F/m_A = 16/2 = 8 m/s².",
            "Cart B: a_B = F/m_B = 16/8 = 2 m/s².",
            "Third law makes their interaction forces equal, not their accelerations."
          ],
          "answer": "8 m/s² and 2 m/s², in opposite directions."
        },
        {
          "title": "NCERT Example 6.7: fruit and Earth",
          "question": "Why does a fruit noticeably accelerate toward Earth but Earth barely accelerates toward the fruit, despite equal gravitational forces?",
          "steps": [
            "Both forces have the same magnitude and opposite directions by the third law.",
            "Acceleration magnitude equals force divided by mass.",
            "Earth's mass is enormous compared with the fruit's mass."
          ],
          "answer": "Earth's acceleration is extremely small; equal interaction forces do not mean equal accelerations."
        },
        {
          "title": "Stationary connected spring balances",
          "question": "Two spring balances connected by their hooks remain at rest while a person pulls one end with a steady 12 N. What do they read?",
          "steps": [
            "Each balance transmits the same tension under this simplified stationary arrangement.",
            "The force one exerts on the other is paired with an equal opposite force.",
            "Each balance indicates a 12 N tension, not 24 N."
          ],
          "answer": "Each spring balance reads 12 N."
        }
      ],
      "checkQuestions": [
        {
          "question": "Why do third-law forces not cancel when analysing just one object?",
          "answer": "They act on different objects, so both are not forces ON the chosen object."
        },
        {
          "question": "Two carts exert 5 N interaction forces on each other. Can their accelerations differ?",
          "answer": "Yes, if their masses differ or other net forces act."
        },
        {
          "question": "What pushes a walker forward?",
          "answer": "The ground pushes the foot forward through static friction as the foot pushes the ground backward."
        }
      ],
      "tip": "Every action-reaction answer should explicitly state the two interacting objects and the two opposite force directions.",
      "visual": "third"
    },
    {
      "title": "Connected systems: internal tension versus external force",
      "paragraphs": [
        "NCERT section 6.7 studies two boxes linked by a string on a frictionless horizontal surface. Choose BOTH boxes and the string as the system. The tension is an internal interaction: one box feels a pull toward the other, and the other feels an equal opposite pull. These internal forces cancel in the net-force equation for the entire system.",
        "The external horizontal force F accelerates the total system mass m₁ + m₂, so a = F_ext/(m₁ + m₂) when F_ext is the NET external horizontal force, both boxes have the same acceleration, and the string is ideal and taut. If friction acts externally on the system, subtract its opposing force before dividing by total mass. Do not add tension as an extra external pull on the whole system.",
        "To analyse a single box, tension IS relevant because the string is now outside that box's chosen boundary. For two boxes with F pulling box 1, box 1 satisfies F − T = m₁a, while box 2 satisfies T = m₂a. Adding gives F = (m₁ + m₂)a. This brief derivation explains why tension cancels internally and provides a useful way to check system reasoning.",
        "Draw a free-body diagram for the whole system: an external pull to the right, combined weight (m₁ + m₂)g downward and normal reactions N₁ + N₂ upward. Under the stated level-floor assumptions the vertical forces balance and do not affect horizontal acceleration. The textbook's Fig. 6.34 and Fig. 6.35 make this distinction visually.",
        "NCERT's closing exercises include a tractor and trolley/harrow thought problem. If the same net horizontal force F produces accelerations a₁ = F/m₁ and a₂ = F/m₂ separately, then the combined mass is F/a₁ + F/a₂. Hence the combined acceleration is a = (a₁a₂)/(a₁ + a₂). This is derived from the same system principle and assumes friction is ignored.",
        "Always declare your chosen system. 'Internal' and 'external' describe a force relative to the system boundary, not an unchanging property of a particular string or object. System diagrams and individual-box diagrams answer related but different questions."
      ],
      "examples": [
        {
          "title": "NCERT section 6.7: two connected boxes",
          "question": "Boxes of masses 20 kg and 30 kg are connected and pulled by a horizontal external force of 100 N on a frictionless floor. Find acceleration.",
          "steps": [
            "Choose both boxes as the system; total mass = 20 + 30 = 50 kg.",
            "Internal string forces cancel in the whole-system equation.",
            "Net external horizontal force = 100 N.",
            "a = F_ext/(m₁+m₂) = 100/50 = 2 m/s²."
          ],
          "answer": "Both boxes accelerate at 2 m/s²."
        },
        {
          "title": "Find tension as a consistency check",
          "question": "In the preceding example, the force pulls the 20 kg box; the 30 kg box is pulled only by tension. Find T.",
          "steps": [
            "For the 30 kg box alone, horizontal net force T = m₂a.",
            "T = 30 × 2 = 60 N.",
            "Check the pulled box: F − T = 100 − 60 = 40 N = 20 × 2."
          ],
          "answer": "Tension = 60 N; both individual free-body equations agree."
        },
        {
          "title": "Whole-system diagram with vertical forces",
          "question": "Two boxes of combined mass 10 kg rest on a horizontal floor and accelerate right. What is their total upward normal support, with no vertical acceleration? Take g = 9.8.",
          "steps": [
            "Whole-system downward weight = 10 × 9.8 = 98 N.",
            "Vertical acceleration is zero, so N_total − 98 = 0.",
            "Horizontal acceleration depends on the net external horizontal force separately."
          ],
          "answer": "Combined normal force = 98 N upward."
        },
        {
          "title": "Connected boxes with external friction",
          "question": "A 3 kg and 2 kg pair experiences a 25 N right pull and total external friction of 5 N left. Find the shared acceleration.",
          "steps": [
            "System mass = 3 + 2 = 5 kg.",
            "Net external horizontal force = 25 − 5 = 20 N right.",
            "Acceleration = 20/5 = 4 m/s² right."
          ],
          "answer": "4 m/s² to the right."
        },
        {
          "title": "NCERT exercise: tractor with two loads",
          "question": "A net force causes acceleration a₁ = 2 m/s² in load 1 and a₂ = 3 m/s² in load 2 when pulled separately. Neglect friction. What is the acceleration with both loads together?",
          "steps": [
            "Since F = m₁a₁ = m₂a₂, the masses are m₁ = F/a₁ and m₂ = F/a₂.",
            "Combined a = F/(F/a₁ + F/a₂) = 1/(1/a₁ + 1/a₂).",
            "a = (2×3)/(2+3) = 6/5 = 1.2 m/s²."
          ],
          "answer": "The combined acceleration is 1.2 m/s²."
        },
        {
          "title": "NCERT beyond link: momentum",
          "question": "A 2 kg trolley changes velocity from 3 m/s to 5 m/s in the same direction. How does momentum change?",
          "steps": [
            "Use optional extension p = mv.",
            "Initial momentum = 2 × 3 = 6 kg·m/s.",
            "Final momentum = 2 × 5 = 10 kg·m/s.",
            "Change = 10 − 6 = 4 kg·m/s."
          ],
          "answer": "Momentum increases by 4 kg·m/s in the direction of travel."
        }
      ],
      "checkQuestions": [
        {
          "question": "Is tension internal when two connected boxes are chosen as one system?",
          "answer": "Yes. The string forces cancel when computing the net force for the whole system."
        },
        {
          "question": "How does the role of tension change if only one of the boxes is chosen?",
          "answer": "It becomes an external force on that individual box."
        },
        {
          "question": "Two 4 kg boxes are pulled together by net external force 24 N. Find acceleration.",
          "answer": "Total mass = 8 kg, so a = 3 m/s²."
        },
        {
          "question": "What must you change in a = F/(m₁+m₂) if the floor has friction?",
          "answer": "Use the net external force, subtracting external opposing friction before division."
        }
      ],
      "tip": "Choose the system first. Add masses and external forces only. Include internal tension only when analysing a smaller subsystem or individual box.",
      "visual": "system"
    }
  ]
};
window.CBSE_CLASS9_SCIENCE_FULL_NOTES=Object.assign({},window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{}, {'How Forces Affect Motion':chapter});
})();
