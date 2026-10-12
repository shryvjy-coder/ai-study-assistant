/* Chapter 14 — Math of Space: Surface Area and Volume */
(() => {
'use strict';const D=window.StudyAIClass9Depth,E=D.example;
D.apply('Math of Space: Surface Area and Volume',[
['Surface area and volume',[
['Why area and volume measure different things',[
'A solid has a surface separating it from the surrounding space and an interior occupying space. Surface area measures the extent of the outer covering in square units, while volume measures the space enclosed in cubic units. A can may require sheet metal for its surface and liquid capacity for its volume.',
'The units reveal many mistakes: m² belongs to a covering problem and m³ to a solid-capacity problem. If all dimensions increase by factor k, lengths grow k times, surface areas grow k² times and volumes grow k³ times because they combine two or three independent lengths.'
],['Scaling: area factor k², volume factor k³'],[E('Effect of scaling','A model is enlarged to three times its original length, breadth and height. By what factor do area and volume change?',['Surface area combines two lengths, giving factor 3².','Volume combines three lengths, giving 3³.'],'Area 9 times; volume 27 times')]],
['External, internal and open surfaces',[
'A formula for the total surface area of a closed solid includes all exposed outside faces. A vessel open at its top needs only the base and curved side for material area; including the top circle would overcount.',
'In composite solids, joined faces become internal and should not be counted on the exposed surface. A reliable method is to list each visible face, arc or curved surface explicitly before summing. For capacity, determine the enclosed volume, not the surface covering it.'
],[],[E('Open cylinder components','Which surfaces are needed to make an open-top cylindrical container of radius r and height h?',['The side is one curved rectangular sheet when unfolded.','The base is a circle.','There is no top circular sheet.'],'Curved side 2πrh plus one base πr².')]]
]],
['Cuboids and cubes',[
['Derive cuboid volume by unit cubes',[
'A cuboid with integer length l, breadth b and height h can be filled by l×b cubes in one layer and h such layers. Thus V=lbh cubic units. The same formula extends to measured real lengths.',
'Its six rectangular faces form three pairs: two of area lb, two bh and two hl. Adding these gives total surface area 2(lb+bh+hl). The lateral area, excluding top and bottom, is 2h(l+b).'
],['V_cuboid=lbh','TSA_cuboid=2(lb+bh+hl)','LSA_cuboid=2h(l+b)'],[E('Cuboid dimensions','A cuboid is 8 cm long, 5 cm broad and 3 cm high. Find volume and total surface area.',['Volume=8×5×3=120 cm³.','TSA=2(8×5+5×3+3×8).','TSA=2(40+15+24)=158 cm².'],'120 cm³ and 158 cm²')]],
['Special case: a cube',[
'A cube has all twelve edges of equal length a and six identical square faces. Its volume is a³ because a×a unit squares lie in each of a layers. Total surface area is 6a² and lateral area is 4a².',
'In a room or box problem, determine whether the question asks for the entire solid, an open box or only four walls. The numerical formulas change with which faces are present, although the unit geometry stays the same.'
],['V_cube=a³','TSA_cube=6a²','LSA_cube=4a²'],[E('Cube dimensions','A cube has volume 125 cm³. Find its edge and total surface area.',['Solve a³=125, so a=5 cm.','TSA=6a²=6×25.'],'Edge 5 cm; TSA 150 cm²')]],
['Space diagonals and the Pythagorean link',[
'A cuboid diagonal joins two opposite corners through its interior. First find a base-face diagonal using d_base²=l²+b². Treat this diagonal as one leg of another right triangle with vertical height h.',
'The long spatial diagonal therefore satisfies d²=l²+b²+h². It is longer than every edge; a square-root answer should be kept exact unless a decimal approximation is specifically required.'
],['Space diagonal d=√(l²+b²+h²)'],[E('A spatial diagonal','Find the diagonal of a 3×4×12 cm cuboid.',['Apply d²=3²+4²+12²=9+16+144=169.','Take positive square root.'],'13 cm')]]
]],
['Right circular cylinders',[
['A circle extended through height',[
'A right circular cylinder has two congruent circular bases with radius r, separated by perpendicular height h. Every slice parallel to the bases has area πr², so stacking slices through height h gives volume πr²h.',
'The net of the curved side is a rectangle of width equal to the base circumference, 2πr, and height h. Its area is 2πrh. A closed cylinder adds both circular ends to this curved area.'
],['V_cylinder=πr²h','CSA_cylinder=2πrh','TSA_closed=2πr(h+r)'],[E('Cylinder dimensions','A closed cylinder has radius 4 cm and height 10 cm. Find volume and total area.',['Volume=π×4²×10=160π cm³.','TSA=2π×4(10+4)=8π×14.'],'Volume 160π cm³; TSA 112π cm²')]],
['Material, labels and open cylinders',[
'A label wrapped around a can covers its curved lateral surface only, not the top and bottom. Its area is circumference times height. An open-top container adds its bottom base to that area.',
'Before choosing a formula, ask whether the circular ends exist or are exposed. Joining cylinders together may hide one or more bases, and those internal faces must not be counted in the exterior area.'
],[],[E('An open cylindrical tank','A cylindrical tank has r=7 m and h=5 m, with no lid. Find material area excluding thickness.',['Curved area=2π×7×5=70π m².','Base area=π×7²=49π m².','No top circle is included.'],'119π m²')]]
]],
['Cones',[
['Vertical height and slant height are different',[
'A right circular cone has circular base radius r and perpendicular height h from the apex to the base centre. The slant height l joins the apex to the rim along the surface. These lengths form a right triangle, so l²=r²+h².',
'The curved surface of a cone unfolds into a circular sector of radius l. Its arc length equals the circumference of the cone base, 2πr. The resulting curved area is πrl; a closed cone adds its circular base πr².'
],['l=√(r²+h²)','CSA_cone=πrl','TSA_closed=πr(l+r)'],[E('Slant height and curved area','A cone has radius 5 cm and perpendicular height 12 cm. Find slant height and CSA.',['l=√(5²+12²)=√169=13 cm.','Curved area=πrl=π×5×13.'],'l=13 cm, CSA=65π cm²')]],
['Cone volume and the one-third factor',[
'A cone and cylinder with equal base area πr² and height h have volumes in a 1:3 ratio. The relationship can be explored by filling a cone with sand or liquid and finding that three such fillings fill a matching cylinder, ignoring experimental error.',
'Thus V_cone=(1/3)πr²h. Use the perpendicular height, never the slant height, for volume. The factor one-third is geometric and must not be omitted in calculations.'
],['V_cone=(1/3)πr²h'],[E('Volume of a cone','A cone has radius 6 cm and perpendicular height 8 cm. Find its volume.',['Base area=π×6²=36π cm².','Multiply by height and divide by 3: (1/3)36π×8.'],'96π cm³')]],
['Reverse problems involving cones',[
'When a cone volume is given, its radius or height can be found by solving the volume equation. First isolate the unknown squared or linear quantity, then take a positive root if solving for a length.',
'Dimensional reasoning helps: if radius doubles while height stays constant, the volume increases four times because r appears squared. If the height doubles, volume doubles.'
],[],[E('Find cone height','A cone has radius 3 cm and volume 36π cm³. Find height.',['(1/3)π×3²×h=36π.','3πh=36π.','Divide by 3π.'],'h=12 cm')]]
]],
['Pyramids',[
['Pyramid geometry and bases',[
'A pyramid has one polygonal base and triangular lateral faces meeting at an apex. A square pyramid has a square base, but pyramids may also have rectangular or triangular bases. Perpendicular height is the shortest distance from apex to base plane.',
'For any pyramid, volume equals one-third of base area times perpendicular height. A triangular pyramid can be imagined as the remaining part of a prism when suitable equal-volume pyramid pieces are compared; the factor one-third is analogous to a cone.'
],['V_pyramid=(1/3)B h where B is base area'],[E('Square pyramid volume','A square pyramid has base edge 6 cm and height 10 cm. Find volume.',['Base area B=6²=36 cm².','Volume=(1/3)×36×10.'],'120 cm³')]],
['Lateral area and slant measurements',[
'For a regular square pyramid, each of four triangular faces has base edge a and slant altitude s measured from apex to midpoint of that base edge. The lateral area is 4×(1/2)as=2as.',
'The perpendicular height h and the face slant altitude s are related by s²=h²+(a/2)². They should not be confused with the sloping edge from apex to a base vertex, which has a different length.'
],['LSA_regular square pyramid=2as','s²=h²+(a/2)²'],[E('Pyramid lateral area','A regular square pyramid has base edge 8 cm and face slant altitude 5 cm. Find total surface area.',['Each face area=(1/2)×8×5=20 cm².','Four faces contribute 80 cm².','Base area=8²=64 cm².','Add all exposed faces.'],'144 cm²')]]
]],
['Spheres and hemispheres',[
['A sphere is determined by its radius',[
'A sphere consists of all points in three-dimensional space at a fixed distance from a centre. Every diameter is twice the radius. Its surface area is 4πr² and volume 4πr³/3.',
'These formulas involve different powers of r because area has two dimensions and volume three. When radius is multiplied by 2, sphere area increases fourfold and volume eightfold. A correct answer must carry cm² or cm³ accordingly.'
],['SA_sphere=4πr²','V_sphere=(4/3)πr³'],[E('Sphere measures','Find area and volume of a sphere of radius 3 cm.',['Surface area=4π×3²=36π cm².','Volume=(4/3)π×3³=(4/3)27π.'],'Area 36π cm²; volume 36π cm³')]],
['Half a sphere: curved and total surface',[
'A hemisphere is half a sphere divided through its centre. Its curved area is half the full sphere area, 2πr². A solid hemisphere with its flat circular base exposed also has area πr² there.',
'Therefore total surface area of a closed hemisphere is 3πr², while its volume is half sphere volume, (2/3)πr³. The frequent mistake is using the curved-only expression when the flat base is also to be painted or covered.'
],['CSA_hemisphere=2πr²','TSA_hemisphere=3πr²','V_hemisphere=(2/3)πr³'],[E('Hemisphere coating','A solid hemisphere has radius 7 cm. Find its entire exterior area, including flat base.',['Curved area=2π×49=98π.','Flat base=π×49=49π.','Add both surfaces.'],'147π cm²')]],
['A sphere fitted into a cube',[
'A sphere touching all six faces of a cube has diameter equal to the cube side. Thus if the side is 2r, cube volume is 8r³ while sphere volume is (4/3)πr³.',
'If material remaining between the sphere and cube is requested, subtract volumes measured in the same cubic units. When the sphere is removed, the cavity contributes to exposed surface in a coating problem, but not to the solid volume.'
],[],[E('Sphere inside cube','A cube of side 6 cm contains the largest possible spherical ball. Find ball volume.',['The inscribed sphere diameter is 6 cm, so r=3 cm.','Volume=(4/3)π×27.'],'36π cm³')]]
]],
['Composite solids',[
['Add volumes but remove hidden surface faces',[
'A model may join a cone to a cylinder or a hemisphere to a cuboid. Total volume is the sum of nonoverlapping solid components. If one part is a hole cut out of another, subtract its volume.',
'The visible surface area is different: faces at a join are internal and excluded, whereas a newly exposed surface around a hole counts. A labelled sketch showing shared and exposed faces is indispensable before writing any formula.'
],[],[E('Cone on a cylinder','A cylindrical tower with radius 3 cm and height 8 cm has a conical roof of same radius and height 4 cm. Find total volume.',['Cylinder volume=π×3²×8=72π cm³.','Cone volume=(1/3)π×3²×4=12π cm³.','Add nonoverlapping volumes.'],'84π cm³')]],
['Choosing dimensions across joined solids',[
'At a join between a cylinder and a cone, equal base radius is common but their perpendicular heights are usually different. Use each component’s own height when computing volume. A total height given in a word problem may need to be split.',
'In a joined exterior-area problem, do not count the circular disc where the two shapes meet. For a cone standing on a closed cylinder of the same radius, the outside area might include cylinder side, cylinder bottom and cone curved surface, but not the common interface.'
],[],[E('Exposed area of a model','A cylinder (r=2,h=5) with a cone roof (r=2, slant height 5) is sealed at the bottom. Find exterior area.',['Cylinder curved area=2π×2×5=20π.','Cone curved area=π×2×5=10π.','Bottom base area=π×2²=4π.','The shared upper base is internal and omitted.'],'34π square units')]]
]],
['Estimation and units',[
['Guesstimation with simple geometric models',[
'Real objects rarely match perfect solids. To estimate a water bottle volume, approximate its main body as a cylinder, estimate radius and height, then calculate πr²h. Make clear which irregular parts or wall thickness have been ignored.',
'Because radius is squared, small radius measurement errors can affect volume substantially. State significant assumptions and use a reasonable range when dimensions are uncertain instead of reporting a false exact value.'
],[],[E('Estimate a container','Approximate a cylindrical bottle with radius 3.5 cm and height 20 cm. Find ideal interior volume.',['V=π(3.5)²(20)=245π cm³.','Using π≈3.14 gives about 769.3 cm³.','Since 1000 cm³=1 L, this is about 0.77 L.'],'Approximately 0.77 L, assuming a perfect cylinder')]],
['Converting area and volume units',[
'Converting linear units before using a formula avoids many dimensional mistakes. One metre equals 100 centimetres, but 1 m² equals 10,000 cm² and 1 m³ equals 1,000,000 cm³.',
'One litre equals 1000 cubic centimetres. Thus a vessel volume of 2500 cm³ corresponds to 2.5 litres. Never convert cm³ to litres by dividing by 100 or by directly changing only the unit label.'
],['1 m²=10⁴ cm²','1 m³=10⁶ cm³','1 L=1000 cm³'],[E('Volume conversion','Convert 0.004 m³ into litres.',['0.004 m³=0.004×1,000,000=4000 cm³.','Divide by 1000 cm³ per litre.'],'4 L')]],
['Reasonableness checks and formula choice',[
'Begin every mensuration problem with a list: solid type, radius or base measures, perpendicular height, slant height if relevant, open or closed faces, and required unit. Dimensional analysis can catch missing powers or factors of π.',
'If a cylinder of radius 5 and height 12 is claimed to have volume 60π, note that base area alone is 25π and twelve layers would have volume 300π. A formula is easier to remember when grounded in the underlying geometry.'
],[],[E('Correct a mistaken formula','A student writes cone volume as πrl for radius r and slant length l. What is wrong?',['πrl is the curved surface area and has units of length squared.','Volume requires perpendicular height and one-third of base area.'],'Correct volume is (1/3)πr²h cubic units.')]]
]]
],{
lead:'Packaging, containers, tanks and roofs force us to distinguish the material covering an object from the space it occupies. This chapter derives and applies surface-area and volume formulas for cuboids, cylinders, cones, pyramids, spheres and hemispheres, including composite objects, unit conversions and careful estimation.',
mixed:[
['Mixed volume of a joined solid','A cone of radius 6 cm and height 8 cm is attached atop a cylinder with radius 6 cm and height 10 cm. Find total volume and visible exterior area if the base is exposed.',['Cylinder volume=π×36×10=360π cm³.','Cone volume=(1/3)π×36×8=96π cm³.','Total volume=456π cm³.','Cone slant length=√(6²+8²)=10 cm.','Exterior: cylinder side 2π×6×10=120π, cone curved π×6×10=60π, bottom circle 36π.'],'Volume=456π cm³; exterior area=216π cm².'],
['Mixed density and capacity','A hollow cylindrical vessel has inner radius 5 cm and usable inner height 16 cm. How many litres can it hold?',['Capacity uses interior volume πr²h.','V=π×25×16=400π cm³.','Convert to litres: 400π/1000=0.4π L.','Using π≈3.1416 gives about 1.257 L.'],'0.4π litres ≈1.26 L.']
]});
})();