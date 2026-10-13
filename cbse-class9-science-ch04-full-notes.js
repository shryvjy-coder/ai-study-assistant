/* StudyAI independently authored Grade 9 Science Chapter 4 full notes (NCERT Exploration 2026–27, iesc104.pdf). Preserve existing Science IDs and all progress storage; not an editorial certification. */
(()=>{
'use strict';
const chapter={
  "sourceBook": "Exploration · Textbook of Science for Grade 9",
  "sourcePdf": "iesc104.pdf",
  "printedPages": "48–71",
  "reviewStatus": "Original NCERT-grounded teaching draft; independent teacher and diagram review outstanding",
  "lead": "Motion is not only about whether something is moving. We first choose a reference point and direction, then describe how position changes over time. Distance, displacement, velocity, acceleration, graphs and equations together turn observations into calculations and testable predictions. Work through the units and the physical meaning of every answer before memorising formulas.",
  "sections": [
    {
      "title": "Position and reference frames: distance versus displacement",
      "visual": "position",
      "paragraphs": [
        "An object's position is described relative to a chosen reference point called the origin. A person sitting inside a moving train may be at rest relative to the seat yet moving relative to a tree outside. Both descriptions can be correct because motion is relative to the selected reference. For motion on a straight line, choose right or upward as positive, and then left or downward as negative, or state a different choice explicitly.",
        "Total distance travelled measures the length of the entire path. It has a non-negative magnitude and is a scalar. Displacement is the change in position: final position minus initial position, together with direction. In one dimension, a positive or negative sign represents the direction. The magnitude of displacement can never exceed total distance; the two match if the path stays in one direction throughout the interval.",
        "Distance and displacement answer different questions. A trip ending where it began has zero displacement even though distance was covered. A graph or drawing of positions on a line is useful because it shows which travelled segments must be added while displacement depends only on starting and ending coordinates.",
        "NCERT Activity 4.1 considers a ball travelling vertically upward and returning downward, and Fig. 4.4 tracks an athlete who travels forward and back. Moving back along the same vertical or horizontal line is still one-dimensional straight-line motion even if the direction changes. A path that curves through space cannot be replaced by a single horizontal distance-line without losing physical information."
      ],
      "examples": [
        {
          "title": "NCERT athlete: 160 m travelled but only 40 m displaced",
          "question": "An athlete starts at x = 0 m, runs to x = 100 m and then back to x = 40 m. Find distance and displacement.",
          "steps": [
            "First leg: 100 − 0 = 100 m travelled.",
            "Return leg: 100 − 40 = 60 m travelled.",
            "Total distance = 100 + 60 = 160 m.",
            "Displacement = xfinal − xinitial = 40 − 0 = +40 m. The sign gives direction along the chosen axis."
          ],
          "answer": "Distance 160 m; displacement +40 m. Returning toward the origin increased distance but reduced displacement."
        },
        {
          "title": "Activity 4.1: Ball thrown vertically and caught at its starting level",
          "question": "A ball moves 1.4 m upward and returns to where it started. Compare total distance and displacement.",
          "steps": [
            "Count both segments of the path: 1.4 m up + 1.4 m down.",
            "Total distance = 2.8 m.",
            "Initial height and final height are the same.",
            "Displacement = 0 m despite non-zero distance."
          ],
          "answer": "Distance = 2.8 m; displacement = 0 m. This is still one-dimensional motion on a vertical straight line."
        },
        {
          "title": "Change reference, not the underlying trip",
          "question": "A walker begins at x = −20 m and stops at x = +35 m, without reversing. What is the displacement?",
          "steps": [
            "Choose right as positive.",
            "Subtract xinitial from xfinal: +35 − (−20) = +55 m.",
            "A one-direction path gives distance 55 m too, but that equality depends on no change of direction."
          ],
          "answer": "Displacement is +55 m (rightward); distance is 55 m if the walker never reverses."
        },
        {
          "title": "Practice from the NCERT exercise: repeated visits to a shop",
          "question": "A shop is 250 m from home on a straight road. A person travels home → shop → home → shop → home. Find total distance and displacement.",
          "steps": [
            "There are four complete segments, each 250 m.",
            "Distance = 4 × 250 = 1000 m.",
            "The journey ends at home, where it began.",
            "Displacement = 0 m."
          ],
          "answer": "Distance 1000 m; displacement 0 m."
        }
      ],
      "checkQuestions": [
        {
          "question": "Can the magnitude of displacement be greater than distance travelled between the same two instants?",
          "answer": "No. The shortest path between endpoints is no longer than the actual path; equal magnitudes are possible when motion stays in one direction along a straight line."
        },
        {
          "question": "A student travels from ground floor to fourth floor and back to second floor, with 3 m between floors. Find vertical distance and displacement.",
          "answer": "Distance = 12 m upward + 6 m downward = 18 m. Displacement = +6 m from the ground floor if up is positive."
        }
      ],
      "tip": "Draw the path and label an origin and positive direction before calculation. Distance adds segments; displacement subtracts positions."
    },
    {
      "title": "Average speed, average velocity and interpreting units",
      "visual": "rates",
      "paragraphs": [
        "Average speed is total distance travelled divided by elapsed time: average speed = distance/time. Average velocity is displacement divided by elapsed time: average velocity = (xfinal − xinitial)/(tfinal − tinitial). The distinction is essential when direction changes. Both use the SI unit metre per second (m/s), but velocity carries direction. The magnitude of average velocity is at most average speed over the same interval.",
        "Uniform motion in a straight line means equal distances in all equal time intervals; it has constant speed and fixed direction. For non-uniform motion, different intervals may have different speeds. Do not calculate whole-journey average speed by simply taking the mean of two displayed speeds when the corresponding durations differ. Use total distance divided by total time.",
        "Conversion matters: 1 km = 1000 m and 1 h = 3600 s, so 1 km/h = 5/18 m/s. Conversely, 1 m/s = 18/5 km/h. Carry the units in each calculation; a number without its associated unit is an incomplete motion measurement.",
        "India's Scientific Contributions describes an ancient speed-and-time problem from Ganitakaumudi (14th century CE) and a speed-related tradition in Aryabhatiya (5th century CE). When two travellers approach one another, their separation closes at the sum of their speeds, provided they continue toward each other at constant rates. This is an early application of quantitative reasoning, not a claim that the modern vector formulation was written exactly as we use it today.",
        "NCERT Example 4.2 compares average speed and velocity for a swimmer travelling from one end of a pool to the other and back in 50 seconds. Returning to the start makes the average velocity zero; the swimmer still covered a real distance and therefore has positive average speed."
      ],
      "examples": [
        {
          "title": "Example 4.1: Two postmen walking toward each other",
          "question": "Two postmen are 210 yojanas apart and walk toward each other at 9 and 5 yojanas/day. How long until they meet?",
          "steps": [
            "The combined rate of closing separation is 9 + 5 = 14 yojanas per day.",
            "Time = initial separation ÷ combined rate = 210 ÷ 14 = 15 days.",
            "Check: first covers 9 × 15 = 135 yojanas; second covers 5 × 15 = 75 yojanas.",
            "Their combined distances total 210 yojanas, so the meeting time is consistent."
          ],
          "answer": "15 days. Yojana is the historical distance unit used in the textbook problem."
        },
        {
          "title": "Example 4.2: Average speed versus velocity for a swimmer",
          "question": "A swimmer covers 25 m to the far end and 25 m back in 50 s. Find average speed and average velocity.",
          "steps": [
            "Total distance = 25 + 25 = 50 m.",
            "Average speed = 50 m / 50 s = 1 m/s.",
            "Displacement = 0 m because the swimmer returns to the start.",
            "Average velocity = 0 m / 50 s = 0 m/s."
          ],
          "answer": "Average speed = 1 m/s, average velocity = 0 m/s."
        },
        {
          "title": "Convert the unit before solving",
          "question": "A vehicle moves uniformly at 72 km/h. Find the speed in metres per second and the distance covered in 15 seconds.",
          "steps": [
            "Convert speed: 72 × (5/18) = 20 m/s.",
            "With constant speed, distance = speed × time.",
            "Distance = (20 m/s) × (15 s) = 300 m.",
            "Check: metres per second multiplied by seconds gives metres."
          ],
          "answer": "20 m/s; 300 m in 15 seconds."
        },
        {
          "title": "Why the arithmetic mean of speeds can fail",
          "question": "A cyclist covers 6 km at 12 km/h and another 6 km at 6 km/h. What is the average speed?",
          "steps": [
            "First time = 6 ÷ 12 = 0.5 h.",
            "Second time = 6 ÷ 6 = 1 h.",
            "Total distance = 12 km; total time = 1.5 h.",
            "Average speed = 12 ÷ 1.5 = 8 km/h, not (12 + 6)/2 = 9 km/h."
          ],
          "answer": "8 km/h. Average speed must weight the distances and times, not blindly average speed readings."
        }
      ],
      "checkQuestions": [
        {
          "question": "What is the average velocity for a completed lap that returns to its starting position?",
          "answer": "Zero, because displacement over the full lap is zero, even though average speed is not zero."
        },
        {
          "question": "A vehicle covers 100 m in 5 s and 100 m in 10 s. Is its average speed 15 m/s?",
          "answer": "No. The average speed = 200 m / 15 s ≈ 13.3 m/s. The two intervals have different durations."
        }
      ],
      "tip": "Use distance for average speed and signed displacement for average velocity. Total distance ÷ total time is always the safe starting point."
    },
    {
      "title": "Acceleration, braking and the direction of gravity",
      "paragraphs": [
        "Average acceleration is the change in velocity divided by elapsed time: a = (v − u)/t, where u is initial velocity and v is final velocity. Its SI unit is m/s² because each second the velocity changes by an amount measured in m/s. Velocity can change through speed, direction or both, so acceleration is broader than simply ‘speeding up’. A constant average acceleration over one interval does not prove it remained constant every moment within it.",
        "For one-dimensional calculations, choose a positive direction and keep it throughout. If a moving vehicle has positive velocity and slows, its acceleration is negative; if a vehicle is moving left (negative velocity) and slows, acceleration may be positive. Negative acceleration is not inherently slowing down. The term deceleration means acceleration opposite to the instantaneous velocity, reducing the speed.",
        "Acceleration due to Earth's gravity has magnitude about 9.8 m/s² near the surface when air resistance is negligible. If downward is positive for a falling object, gravitational acceleration is +9.8 m/s²; if upward is positive, it is −9.8 m/s². This difference is a choice of coordinates, not a change in the gravitational interaction.",
        "NCERT Activity 4.2 compares a toy vehicle's changing speed over equal intervals, and Example 4.4 shows a freely falling object's downward velocity increasing by 9.8 m/s each second. Equal changes in velocity in equal time intervals identify constant acceleration. Air drag in real life can make the idealisation imperfect.",
        "To distinguish velocity from acceleration, imagine a car moving at 10 m/s without changing direction: its acceleration is zero, even though it is moving. At the highest point of an upward-thrown ball's flight, its instantaneous velocity can be zero while gravitational acceleration remains downward and non-zero."
      ],
      "examples": [
        {
          "title": "NCERT bus example: accelerating then braking",
          "question": "A bus speeds up from 36 to 54 km/h in 10 s, then later brakes from 54 km/h to rest in 5 s. Find acceleration in each interval.",
          "steps": [
            "Convert 36 km/h = 10 m/s and 54 km/h = 15 m/s.",
            "Accelerating interval: a = (15 − 10)/10 = +0.5 m/s².",
            "Braking interval: a = (0 − 15)/5 = −3 m/s².",
            "The signs assume the original forward direction is positive."
          ],
          "answer": "+0.5 m/s² while speeding up and −3 m/s² during braking."
        },
        {
          "title": "Example 4.4: Gravity in one-second intervals",
          "question": "A freely falling object has downward speeds 0, 9.8, 19.6 and 29.4 m/s at t = 0, 1, 2 and 3 s. Find its acceleration.",
          "steps": [
            "Take downward as positive so velocities are +0, +9.8, +19.6 and +29.4 m/s.",
            "From 0 to 1 s, a = (9.8 − 0)/1 = 9.8 m/s².",
            "From 1 to 2 s, a = (19.6 − 9.8)/1 = 9.8 m/s².",
            "The next one-second interval produces the same change, supporting constant acceleration."
          ],
          "answer": "+9.8 m/s² if down is positive, or −9.8 m/s² if up is positive."
        },
        {
          "title": "Acceleration is not always a reduction or an increase in speed",
          "question": "A ball moves toward the left at −12 m/s and slows to −4 m/s in 2 s. Find acceleration and interpret its sign.",
          "steps": [
            "Keep right positive, so u = −12 m/s and v = −4 m/s.",
            "a = [−4 − (−12)]/2 = +4 m/s².",
            "Acceleration points right, opposite to the leftward velocity.",
            "Since it opposes the motion, the speed decreases from 12 m/s to 4 m/s."
          ],
          "answer": "+4 m/s²: positive acceleration while speed decreases."
        }
      ],
      "checkQuestions": [
        {
          "question": "If downward is taken as positive, what sign does the acceleration due to gravity have for a falling object?",
          "answer": "+9.8 m/s² in a simple near-Earth free-fall model that ignores air resistance."
        },
        {
          "question": "At the highest point of a vertically thrown ball, is its acceleration necessarily zero because its velocity is briefly zero?",
          "answer": "No. The velocity is momentarily zero, but gravity still accelerates the ball downward."
        }
      ],
      "tip": "Write the positive-axis choice before substituting signs. Acceleration opposite to velocity reduces speed, regardless of whether a is positive or negative."
    },
    {
      "title": "Plotting and reading position–time graphs",
      "visual": "position-graph",
      "paragraphs": [
        "A position–time graph has time on the horizontal X-axis and position on the vertical Y-axis, each with labelled units and a suitable scale. To plot the point (4 s, 12 m), travel 4 s along the time axis and 12 m upward along the position axis. Changing the drawing scale makes the visual line appear steeper or flatter but does not change the physical velocity calculated using axis values.",
        "Choose two points on a straight position–time graph and calculate slope = change in position / change in time = (x₂ − x₁)/(t₂ − t₁). This gives signed velocity in m/s. A straight upward line indicates constant positive velocity; downward slope means motion toward negative position; a horizontal line means the object is at rest at a fixed position, not necessarily at the origin.",
        "A curved position–time graph signals that velocity changes. The average velocity over an interval is the slope of the straight line connecting its endpoint data values (a secant), while more advanced analysis obtains instantaneous velocity from a tangent. NCERT does not require the calculus procedure, but it is useful to know why a curve cannot be assigned one constant velocity.",
        "Activity 4.3 teaches drawing and labelling axes and plotting time–position data, while Activity 4.4 makes the slope triangle explicit. Example 4.5 uses the data 0 s → 0 m, 2 → 1, 4 → 4, 6 → 9, 8 → 16, 10 → 25 and 12 → 36; these points form a curve. Example 4.6 demonstrates a horizontal line at 40 m indicating rest, and Example 4.7 compares steeper and less steep slopes.",
        "Distinguish a graph from a route map: the horizontal distance on the sheet is elapsed time, not the distance an object travelled in the real world. Similarly, the vertical position axis can show negative coordinates; a line crossing position zero does not necessarily mean the object's speed went to zero."
      ],
      "examples": [
        {
          "title": "Activity 4.3: Plot the given NCERT position data",
          "question": "Plot (time s, position m) values (0,0), (2,1), (4,4), (6,9), (8,16), (10,25), (12,36). What does the shape suggest?",
          "steps": [
            "Label horizontal time (s) from 0 to 12 and vertical position (m) from 0 to 36.",
            "Choose readable axis scales; plot each ordered pair exactly.",
            "Connect the sequence smoothly only because we have a continuous-motion context.",
            "Position increases by ever larger amounts in equal two-second intervals, so velocity is increasing; a curved position-time graph is appropriate."
          ],
          "answer": "A curved rising position–time graph, reflecting increasing velocity rather than constant velocity."
        },
        {
          "title": "Activity 4.4: Calculate slope from two coordinates",
          "question": "A straight position–time graph passes through (t = 2 s, x = 5 m) and (t = 8 s, x = 23 m). Find velocity.",
          "steps": [
            "Read time interval: 8 − 2 = 6 s.",
            "Read position change: 23 − 5 = +18 m.",
            "Slope = +18 m / 6 s = +3 m/s.",
            "The positive sign gives motion in the chosen positive direction."
          ],
          "answer": "+3 m/s."
        },
        {
          "title": "Example 4.6: Rest without being at the origin",
          "question": "A position–time plot is a horizontal line at x = 40 m between 0 and 5 s. Is the object moving?",
          "steps": [
            "At every displayed time, its position is 40 m.",
            "There is no change in position, so Δx = 0.",
            "Velocity is the graph slope = 0 m / 5 s = 0 m/s.",
            "The object remains 40 m from the reference origin."
          ],
          "answer": "The object is at rest relative to that reference, at position +40 m."
        },
        {
          "title": "Steeper position–time lines",
          "question": "Two straight position–time lines move upward over 4 s: A changes by 8 m and B by 20 m. Which is faster?",
          "steps": [
            "Velocity A = 8 m / 4 s = 2 m/s.",
            "Velocity B = 20 m / 4 s = 5 m/s.",
            "For the same physical axis scales, B has the larger slope.",
            "Compare calculated velocities, not the apparent paper angles when graph scales differ."
          ],
          "answer": "B: 5 m/s versus 2 m/s for A."
        }
      ],
      "checkQuestions": [
        {
          "question": "A position–time line stays horizontal at −15 m. Is its displacement zero over that interval?",
          "answer": "Yes. Its position is constant at −15 m, so the interval displacement is zero and velocity is zero."
        },
        {
          "question": "If a graphing app changes the X-axis scale but preserves all recorded points, does the object's physical velocity change?",
          "answer": "No. The drawing looks different, but Δposition/Δtime calculated from labelled coordinates is unchanged."
        }
      ],
      "tip": "Every graph calculation needs two labelled coordinate readings, subtraction with signs and a unit. Slope uses coordinate differences, not the angle on the screen."
    },
    {
      "title": "Velocity–time graphs: slope, signed area and multi-stage journeys",
      "visual": "velocity-area",
      "paragraphs": [
        "A velocity–time graph puts time (s) on the horizontal axis and signed velocity (m/s) on the vertical axis. The slope gives acceleration: (v₂ − v₁)/(t₂ − t₁), in m/s². A flat line means constant velocity and zero acceleration; an upward straight line means constant positive acceleration; a downward line means constant negative acceleration under the chosen positive direction.",
        "The signed area between the velocity curve and the time axis gives displacement. A rectangle has area duration × constant velocity. For uniformly increasing velocity from u to v, the area is a trapezium: rectangle ut plus triangle ½(v − u)t, giving displacement s = ½(u + v)t. If velocity goes below the time axis, that portion contributes negative displacement. Add absolute areas instead only when asked for total distance.",
        "Graph-reading steps: choose the time interval, read the velocity at each boundary, split the shape into manageable rectangles and triangles, multiply using quantities with units, then include signs in the displacement total. Use the same graph to compute acceleration from slope. The physical rectangle's 'area' has units (m/s)×s = m, so it represents displacement, not square metres.",
        "NCERT's Tables 4.5 and 4.6 compare speeds steadily rising and falling in 5 s steps. For a car that accelerates from 0 to 15 m/s in 30 s, the velocity–time slope is 15/30 = +0.5 m/s² and the triangular area is ½ × 30 × 15 = 225 m. Reversing the velocity readings gives −0.5 m/s², while area stays positive if velocity remains above the time axis.",
        "In a journey with acceleration, a constant-velocity interval and braking, partition the full time axis into three segments. Calculate each signed area and sum. This is more reliable than applying one constant-acceleration equation over the full journey when its acceleration changes between stages."
      ],
      "examples": [
        {
          "title": "Calculate rectangle plus triangle",
          "question": "Velocity rises uniformly from 5 m/s to 15 m/s over 10 s. What displacement does the velocity–time graph show?",
          "steps": [
            "Draw the 10 s wide rectangle at initial velocity 5 m/s: 10 s × 5 m/s = 50 m.",
            "Draw the additional triangular portion of height (15 − 5) m/s = 10 m/s.",
            "Triangle area = ½ × 10 s × 10 m/s = 50 m.",
            "Total area/displacement = 50 + 50 = 100 m. Acceleration = (15 − 5)/10 = 1 m/s²."
          ],
          "answer": "Displacement 100 m; acceleration +1 m/s²."
        },
        {
          "title": "NCERT graph: acceleration and triangular displacement",
          "question": "A car increases velocity from 0 to 15 m/s in 30 s. Find the acceleration and displacement.",
          "steps": [
            "Slope = (15 − 0) / (30 − 0) = +0.5 m/s².",
            "Graph area is a triangle because the initial velocity is zero.",
            "Displacement = ½ × 30 s × 15 m/s = 225 m.",
            "Check units and constant-acceleration condition."
          ],
          "answer": "Acceleration +0.5 m/s²; displacement +225 m."
        },
        {
          "title": "Three-stage velocity graph",
          "question": "A vehicle accelerates from rest to 20 m/s in 5 s, moves at 20 m/s for 10 s, then slows uniformly to rest in 6 s. Find total distance.",
          "steps": [
            "First triangle = ½ × 5 s × 20 m/s = 50 m.",
            "Middle rectangle = 10 s × 20 m/s = 200 m.",
            "Final triangle = ½ × 6 s × 20 m/s = 60 m.",
            "Total = 50 + 200 + 60 = 310 m, since velocity is never negative."
          ],
          "answer": "310 m total distance, as in the structure of NCERT's multi-stage graph exercises."
        },
        {
          "title": "Signed area versus absolute distance",
          "question": "An object moves at +4 m/s for 3 s and then −2 m/s for 5 s. Find total distance and displacement.",
          "steps": [
            "First signed area = 4 × 3 = +12 m.",
            "Second signed area = −2 × 5 = −10 m.",
            "Net displacement = +12 − 10 = +2 m.",
            "Total distance = 12 + 10 = 22 m because distance counts both directions positively."
          ],
          "answer": "Displacement +2 m; distance 22 m."
        }
      ],
      "checkQuestions": [
        {
          "question": "What are the units of area beneath a velocity–time graph, and what physical quantity is it?",
          "answer": "(m/s) × s = m; signed area is displacement over the interval."
        },
        {
          "question": "Can a negative velocity–time area reduce net displacement while total distance still grows?",
          "answer": "Yes. Signed areas may cancel in displacement, while distance adds the magnitude of travelled segments."
        }
      ],
      "tip": "Slope of velocity–time gives acceleration; signed area gives displacement. Rectangle + triangle handles uniform acceleration without memorising a new graph formula."
    },
    {
      "title": "The three kinematic equations: meaning, derivations and limitations",
      "visual": "equations",
      "paragraphs": [
        "In straight-line motion with constant acceleration, five quantities are linked: displacement s (m), initial velocity u (m/s), final velocity v (m/s), acceleration a (m/s²) and time interval t (s). The three main equations are v = u + at; s = ut + ½at²; and v² = u² + 2as. All variables are signed according to one fixed coordinate direction.",
        "The first equation follows from the definition of constant acceleration a = (v − u)/t, so v − u = at. For the second, plot velocity against time: the rectangle has area ut and the triangle adds ½at² because the velocity change over t is at. The third follows by eliminating time: combine v = u + at with displacement under a constant-acceleration graph to obtain v² − u² = 2as.",
        "Choose an equation using the known and unknown variables, not by guessing what its name sounds like. If time is absent and you need stopping displacement, v² = u² + 2as is often convenient. If time and initial velocity are known and you need displacement, use s = ut + ½at². If you want final velocity, use v = u + at. Another pair of useful constant-acceleration relations is s = ½(u + v)t and s = vt − ½at².",
        "Always convert units first. Equations with metres and seconds require velocities in m/s and accelerations in m/s². State positive direction once; a negative answer for displacement or acceleration has directional meaning. Check whether the acceleration is constant. For example, splitting a journey into separate accelerating and braking phases is necessary because a single constant a does not describe the whole journey.",
        "A braking distance calculation models the distance travelled after braking has begun; it does not include the distance travelled while a driver or automated system notices a hazard and responds. Total stopping distance is reaction distance plus braking distance. Wet conditions, grip and braking performance can change the actual outcome, so the simple model is explanatory rather than an assurance of safety."
      ],
      "examples": [
        {
          "title": "Derive v = u + at from the definition",
          "question": "Show how constant acceleration connects u, v and t.",
          "steps": [
            "Start from a = change in velocity / time interval = (v − u)/t.",
            "Multiply both sides by t: at = v − u.",
            "Rearrange: v = u + at.",
            "Check units: m/s + (m/s²)×s gives m/s."
          ],
          "answer": "v = u + at under constant acceleration over t."
        },
        {
          "title": "Derive displacement from the velocity–time trapezium",
          "question": "How does the rectangle-and-triangle construction give s = ut + ½at²?",
          "steps": [
            "The rectangle below initial velocity u has area u × t = ut.",
            "Uniform acceleration adds velocity change v − u = at.",
            "The triangular additional area is ½ × (at) × t = ½at².",
            "Sum signed areas: s = ut + ½at²."
          ],
          "answer": "s = ut + ½at² for constant acceleration."
        },
        {
          "title": "Derive the time-free relationship",
          "question": "Prove v² = u² + 2as using the graph displacement formula.",
          "steps": [
            "For constant acceleration the graph area is s = ½(u + v)t.",
            "From a = (v − u)/t, we have t = (v − u)/a, provided a is nonzero.",
            "Substitute: s = (u + v)(v − u)/(2a) = (v² − u²)/(2a).",
            "Rearrange to v² = u² + 2as; the relationship also holds for the limiting a = 0 case."
          ],
          "answer": "v² = u² + 2as."
        },
        {
          "title": "Solve a constant-acceleration distance question",
          "question": "A cart starts at u = 2 m/s and accelerates at +3 m/s² for 4 s. Find final velocity and displacement.",
          "steps": [
            "List u = 2 m/s, a = +3 m/s², t = 4 s.",
            "Use v = u + at: v = 2 + 3×4 = 14 m/s.",
            "Use s = ut + ½at²: s = 2×4 + ½×3×4² = 8 + 24 = 32 m.",
            "Check the dimensions of both answers."
          ],
          "answer": "v = 14 m/s and s = 32 m."
        },
        {
          "title": "NCERT Example 4.8: Why doubling speed makes braking distance much longer",
          "question": "Compare braking distances from 54 and 108 km/h if acceleration after braking is constant at −4 m/s².",
          "steps": [
            "Convert 54 km/h = 15 m/s and 108 km/h = 30 m/s.",
            "When the vehicle stops, v = 0. Use 0 = u² + 2as, hence s = −u²/(2a).",
            "At u = 15: s = 225/8 = 28.125 m.",
            "At u = 30: s = 900/8 = 112.5 m, four times the distance when speed doubles."
          ],
          "answer": "About 28.1 m versus 112.5 m of braking distance, with the idealised acceleration fixed. Reaction distance is separate."
        },
        {
          "title": "NCERT stopping-distance question: remember reaction time",
          "question": "A bus moves at 36 km/h. Reaction time is 0.5 s, then braking acceleration is −2.5 m/s². What is the idealised stopping distance?",
          "steps": [
            "Convert speed: 36 × 5/18 = 10 m/s.",
            "Reaction distance = 10 m/s × 0.5 s = 5 m.",
            "Braking distance: 0 = 10² + 2(−2.5)s, so s = 100/5 = 20 m.",
            "Stopping distance = 5 + 20 = 25 m. This is a simplified classroom calculation."
          ],
          "answer": "25 m total under the stated idealised assumptions; 5 m reaction plus 20 m braking."
        },
        {
          "title": "The useful fourth equation from average velocity",
          "question": "Prove s = ½(u + v)t without calculus.",
          "steps": [
            "With constant acceleration, the graph of velocity against time is a straight line.",
            "The region under it has trapezium area ½ × (parallel sides u + v) × horizontal width t.",
            "With velocity in m/s and time in s, this area is displacement in metres.",
            "This is algebraically equivalent to ut + ½at² when v = u + at."
          ],
          "answer": "s = ½(u + v)t."
        }
      ],
      "checkQuestions": [
        {
          "question": "Which equation is most convenient for braking displacement when you know u, v and a but not time?",
          "answer": "v² = u² + 2as, after choosing a direction and consistent SI units."
        },
        {
          "question": "Why must you not use one a for a journey with a fast acceleration, then steady travel, then braking?",
          "answer": "The acceleration is different across the phases; the three standard equations assume constant acceleration over the interval being modelled."
        },
        {
          "question": "Does an idealised braking-distance result automatically tell you the full safe following distance?",
          "answer": "No. It omits reaction distance and may not represent road or vehicle conditions; it is an illustrative model only."
        }
      ],
      "tip": "Write givens in u, v, a, s, t form; check that acceleration is constant, select a matching equation, keep units and explain the meaning of the result."
    },
    {
      "title": "Uniform circular motion: constant speed, changing velocity",
      "visual": "circle",
      "paragraphs": [
        "Circular motion traces a curved path about a centre. During one revolution of a circle of radius R, distance travelled equals circumference 2πR, whereas net displacement is zero because the starting and ending positions coincide. If one revolution takes period T, average speed over the circuit is 2πR/T. In uniform circular motion, the speed stays constant at every point, so v = 2πR/T at every point.",
        "Velocity needs both magnitude and direction. At each point in a smooth circular path, the instantaneous velocity points along the tangent in the direction of travel. That tangent direction changes continuously around the circle, so velocity is not constant and acceleration is nonzero even though speed is fixed.",
        "A circular path requires a net inward force to keep the object turning; without the force required for the curved path, motion is no longer continuously bent toward the centre. NCERT Activity 4.5 uses a marble constrained by the inner rim of a tape ring to make the tangent direction visible. The teaching point is the observed change from curved to approximately straight motion when the sideways constraint ends, not a procedure students should recreate unsupervised.",
        "Compare the position and velocity directions carefully. The object can have speed 5 m/s at two opposite points yet its velocity vectors are different. For an entire revolution, average velocity is zero because displacement is zero, but the object was never at rest merely because the final average velocity vanished.",
        "Uniform circular motion is an idealised model. Real satellite orbits can be elliptical and speeds can vary; a turning vehicle need not follow a perfect circle or move at a constant rate. The circular model remains useful for understanding how direction changes."
      ],
      "examples": [
        {
          "title": "Circular speed from radius and period",
          "question": "An object completes a circle of radius 7 m in 4 s at uniform speed. Estimate its speed using π ≈ 22/7.",
          "steps": [
            "Distance for one revolution = 2πR = 2 × (22/7) × 7 = 44 m.",
            "Period T = 4 s.",
            "Speed v = 44 m/4 s = 11 m/s.",
            "Its net displacement after that full revolution is zero."
          ],
          "answer": "Uniform speed = 11 m/s; average velocity for one complete lap = 0 m/s."
        },
        {
          "title": "Activity 4.5: Interpret the marble-and-ring observation",
          "question": "In the textbook's ring illustration, why is the marble's direction of motion after release tangent to the former circular path?",
          "steps": [
            "During circular motion, the rim constrains the marble and changes its direction continually.",
            "At any chosen point, instantaneous velocity points along the tangent.",
            "Removing the sideways constraint lets the marble continue approximately along that direction initially.",
            "The observation supports tangent velocity; slight friction may subsequently alter its motion."
          ],
          "answer": "It leaves along the tangent at release because that was its instantaneous velocity direction."
        },
        {
          "title": "Speed versus velocity around a track",
          "question": "A runner completes one 100 m circular lap in 20 s. Compare average speed and average velocity.",
          "steps": [
            "Total distance = 100 m; average speed = 100/20 = 5 m/s.",
            "Initial and final positions match, giving zero displacement.",
            "Average velocity = 0/20 = 0 m/s.",
            "The average velocity is zero, but instantaneous velocity changes direction throughout."
          ],
          "answer": "Average speed 5 m/s; average velocity 0 m/s; acceleration is present while turning at uniform speed."
        }
      ],
      "checkQuestions": [
        {
          "question": "Why is an object accelerating around a circle even if its speedometer stays constant?",
          "answer": "Acceleration occurs whenever velocity changes; here the direction of the velocity continuously changes."
        },
        {
          "question": "Where does an object's instantaneous velocity point on a circular track?",
          "answer": "Along the tangent to the circle at its current point, in the direction of motion."
        }
      ],
      "tip": "Do not confuse zero displacement over a lap with zero speed. In uniform circular motion, speed stays constant but the velocity direction changes."
    }
  ]
};
window.CBSE_CLASS9_SCIENCE_FULL_NOTES=Object.assign({},window.CBSE_CLASS9_SCIENCE_FULL_NOTES||{}, {'Describing Motion Around Us':chapter});
})();
