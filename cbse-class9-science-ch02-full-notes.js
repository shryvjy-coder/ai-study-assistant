/* Original, textbook-aligned instructional notes for 2026-27 NCERT Exploration:
 * CBSE Grade 9 Science Chapter 2, Cell: The Building Block of Life.
 * Printed chapter pages 8–27, NCERT PDF iesc102.pdf.
 * Additive to the existing Grade 9 science bank; no chapter IDs/progress keys changed.
 * Visual editorial/teacher review remains outstanding.
 */
(() => {
  'use strict';
  const chapter = {
    sourceBook: 'Exploration · Textbook of Science for Grade 9',
    sourcePdf: 'iesc102.pdf',
    printedPages: '8–27',
    reviewStatus: 'Textbook-grounded authored draft; independent teacher and visual editorial review outstanding',
    lead: 'A cell is the smallest living unit that can perform life processes. To understand it, we connect what a microscope reveals with what each cell structure does, how substances enter and leave, and how cells grow, divide and work together. The goal is not just to remember organelle names, but to explain observations, diagrams, experiments and unfamiliar questions.',
    sections: [
      {
        title: 'The living cell: origins, microscopes and measuring cell size',
        paragraphs: [
          'Life may have arisen in environments containing water and chemical materials. The chapter describes hot springs in Puga Valley, Ladakh, and suggests how mineral deposits might have protected early organic molecules; these ideas are scientific hypotheses, not proof of a single origin-of-life scenario. Modern thermophile bacteria demonstrate that a single cell can function under extreme conditions.',
          'Unicellular organisms complete their life processes in one cell, whereas multicellular organisms arrange specialised cells into tissues, organs and organ systems. A cell remains the basic structural and functional unit even when larger structures work together. For example, lung tissues and blood cells have different tasks but both rely on cellular exchange and metabolism.',
          'The unaided human eye usually cannot resolve two points separated by less than roughly 0.1 mm at ordinary reading distance. Resolution means distinguishing close details, whereas magnification means making an image appear larger. Contrast makes different parts easier to tell apart. Robert Hooke described cork cells in 1665 using an early microscope. Modern light microscopes use objective and eyepiece lenses; an electron microscope uses electrons to show much finer features, including structures too small for ordinary light microscopes.',
          'To estimate size from a microscope, measure the diameter of the circular field of view, convert to micrometres (1 mm = 1000 µm), and divide by the approximate number of cells spanning that diameter. This assumes the cells are similarly sized and arranged across the line; uneven cells or gaps add uncertainty. Eyepiece magnification multiplied by objective magnification gives overall microscope magnification, but magnification does not change the actual size of a cell.'
        ],
        examples: [
          {
            title: 'Activity 2.1: Estimate the size of an onion cell',
            question: 'A visible field is 5 mm across and 25 onion peel cells fit end-to-end. Estimate the length of one cell.',
            steps: [
              'Define the length you are estimating: a cell dimension along one straight line across the microscope field, not the area of a cell.',
              'Convert the field diameter: 5 mm × 1000 µm/mm = 5000 µm.',
              'Divide by the number of cells along the diameter: 5000 µm ÷ 25 ≈ 200 µm per cell.',
              'State the limitation: gaps, overlapping cells or unequal cell lengths make this an estimate.'
            ],
            answer: 'Approximately 200 µm along that direction. It is not a claim that all onion cells have exactly the same length.'
          },
          {
            title: 'Magnification is not actual cell size',
            question: 'A microscope uses a 10× eyepiece and a 40× objective. What is its total magnification?',
            steps: [
              'Identify the two optical magnifications: 10× and 40×.',
              'Multiply the factors: 10 × 40 = 400.',
              'Explain the meaning: the image appears roughly 400 times larger in linear size than the object under the defined viewing convention; it does not mean the real cell has grown.'
            ],
            answer: '400× total magnification; the actual specimen remains unchanged.'
          }
        ],
        checkQuestions: [
          {question:'A microscope makes an image larger but two nearby structures still cannot be distinguished. Which property needs improving?',answer:'Resolution. Magnification alone enlarges the image, but better resolution is required to separate fine details.'}
        ],
        tip: 'Keep resolution, magnification and actual size distinct. For estimates, convert mm to µm before dividing and state what is being measured.'
      },
      {
        title: 'Cell membrane, diffusion and osmosis',
        visual: 'osmosis-plant',
        paragraphs: [
          'The cell membrane (plasma membrane) surrounds every cell and helps control exchanges with its environment. Selectively permeable means some substances cross more easily than others; permeability depends on the substance and the transport mechanism. Oxygen and carbon dioxide can move across membranes by diffusion when their concentration differs on the two sides.',
          'The fluid-mosaic model describes a membrane about 7–10 nm thick, built mainly from a phospholipid bilayer and proteins. The water-attracting heads face water on either side; water-repelling tails lie between them. The components can move within the membrane, while proteins help transport substances or receive signals. This description is a useful model, not a rigid wall with permanently fixed gates.',
          'Diffusion is the net movement of particles from a region where they are more concentrated toward one where they are less concentrated, caused by their random motion. Osmosis is the net movement of water across a selectively permeable membrane from a side of higher water availability (typically a more dilute solution) toward a side of lower water availability (typically a more concentrated solution). Individual water molecules move in both directions; it is the net movement that matters.',
          'An external solution is hypotonic relative to a cell when it has a lower effective solute concentration; the cell tends to gain water. A hypertonic solution has a higher effective solute concentration; the cell tends to lose water. In an isotonic solution, water still crosses both ways, but there is no net change in water content. The words describe a comparison between the cell and its surroundings, not a permanent label of a liquid.',
          'Water moving into a plant cell helps generate turgor pressure. Animal cells have no supporting cell wall: they can swell markedly in a hypotonic environment or shrink in a hypertonic environment. Plant cells behave differently because their wall resists expansion. A useful answer always identifies the membrane, compares concentrations, states the net direction of water movement, and explains the observed change.'
        ],
        examples: [
          {
            title: 'Activity 2.2: Why do potato pieces change mass?',
            question: 'Two comparable potato pieces are placed in plain water and in a concentrated salt solution. Predict the change in mass and explain it.',
            steps: [
              'A piece in plain water has more available water outside than inside the cells, so net osmosis moves water into the cells.',
              'The piece often becomes firmer and gains mass. The mass gain reflects water entering rather than new solid matter being manufactured.',
              'Concentrated salt solution has lower water availability than the potato cells; net water movement is outward.',
              'The other piece becomes less firm and loses mass. Equal-sized pieces and an initial measurement make this comparison meaningful.'
            ],
            answer: 'Plain water usually increases mass; concentrated salt solution usually decreases mass, because of osmosis through cell membranes.'
          },
          {
            title: 'What does isotonic really mean?',
            question: 'Does water stop moving across a cell membrane in an isotonic solution?',
            steps: [
              'Water molecules continue moving across the membrane in both directions.',
              'The inward and outward movements balance on average.',
              'There is no net gain or loss of water, so the cell’s overall water content stays approximately stable.'
            ],
            answer: 'No. Isotonic means no net flow, not no molecular movement.'
          },
          {
            title: 'Root uptake versus food preservation',
            question: 'Why do root cells gain water from suitable moist soil while concentrated salt or sugar tends to prevent microbial growth?',
            steps: [
              'In many moist-soil conditions, root-cell contents have lower water availability than the soil water, so net water movement into root cells is possible.',
              'High salt or sugar lowers the available water around spoilage-causing microorganisms; their cells may lose water or struggle to obtain enough.',
              'Water limitation slows or prevents growth of many microorganisms, but it does not guarantee that every organism is killed.'
            ],
            answer: 'Both examples use osmosis and water availability; the concentration comparison determines the net effect.'
          }
        ],
        checkQuestions: [
          {question:'A cell placed in an isotonic medium shows no size change. Are its water molecules completely still?',answer:'No. Water passes both ways, but the average net movement is zero.'},
          {question:'Explain why an animal cell may shrink in concentrated salt solution without saying that salt necessarily entered it.',answer:'The surrounding solution has lower available water; net osmosis carries water out through the selectively permeable cell membrane, reducing cell volume.'}
        ],
        tip: 'Never reverse the net direction of water movement. Compare water availability inside and outside; distinguish movement in both directions from the overall net flow.'
      },
      {
        title: 'The cell wall, plasmolysis, and comparing plant and animal cells',
        paragraphs: [
          'Plant cells usually have a rigid but permeable cell wall outside the selectively permeable cell membrane. The wall is made mainly of cellulose and supports the plant, maintains cell shape, and helps resist excessive swelling when water enters. A permeable wall is not the same as the selectively permeable plasma membrane. Many fungi have walls largely containing chitin, while typical bacteria have walls containing peptidoglycan: these must not all be described as cellulose walls.',
          'Activity 2.3 compares organised, box-like onion or Rhoeo plant-peel cells with more irregularly arranged human cheek cells. A rigid plant wall helps explain the regular boundaries of plant cells. Animal cells have a membrane but no cell wall, allowing greater flexibility. Both kinds of cells have cytoplasm and, typically, a nucleus; visible details depend on specimen, preparation and microscope resolution.',
          'A plant cell in plain water takes up water, its vacuole expands, and its contents press against the wall; the cell becomes turgid. In a concentrated sugar solution, net water loss can cause the plasma membrane and cell contents to pull away from the wall. This is called plasmolysis. The wall can maintain its external outline even while the living contents shrink. A cheek cell has no rigid wall, so the whole cell may shrink.',
          'A large central vacuole in a mature plant cell stores cell sap and supports firmness; the loss of its water helps explain wilting. Animal cells may have smaller temporary vacuoles. Plastids, including chloroplasts in photosynthetic plant tissues, and the cellulose wall distinguish typical plant cells from typical animal cells. Not every plant cell contains chloroplasts—for instance, many root cells do not—but root cells may contain other plastids.'
        ],
        examples: [
          {
            title: 'Activity 2.3: Interpreting plant-peel and cheek-cell observations',
            question: 'Why does the outline of a Rhoeo cell stay similar while its inside shrinks in concentrated sugar, but a cheek cell shrinks as a whole?',
            steps: [
              'Both cell types lose water by osmosis because the surrounding concentrated solution has lower water availability.',
              'The plant cell’s rigid cell wall continues to mark its original boundary as the plasma membrane pulls away.',
              'The cheek cell has no cell wall, so there is no separate rigid outer boundary to hold its initial shape.',
              'Identify the visible gap between wall and membrane as the key evidence of plasmolysis.'
            ],
            answer: 'Plasmolysis can occur in the walled plant cell; the unwalled animal cell instead reduces its overall volume.'
          },
          {
            title: 'Plant, animal and bacterial cells: structure-versus-function check',
            question: 'Which structures are shared by all three, and which differences distinguish them?',
            steps: [
              'All three contain cytoplasm, genetic material and a plasma membrane.',
              'A typical plant cell has a cellulose cell wall, a membrane-bound nucleus and membrane-bound organelles.',
              'A typical animal cell has a membrane-bound nucleus and organelles but no cell wall.',
              'A typical bacterial cell has a wall and a nucleoid, but no membrane-bound nucleus or other membrane-bound organelles.'
            ],
            answer: 'Do not confuse the cell wall with the nucleus: a bacterial cell can have a wall while lacking a membrane-bound nucleus.'
          }
        ],
        checkQuestions: [
          {question:'In a concentrated solution, why might the plant-cell wall stay in position while the membrane recedes?',answer:'Water leaves the living cell contents by osmosis. The wall is rigid and keeps its outline, while the membrane can pull away from it: plasmolysis.'}
        ],
        tip: 'Cell wall = generally freely permeable structural layer; plasma membrane = selectively permeable boundary. State the cause of a change, not only its appearance.'
      },
      {
        title: 'Cytoplasm, prokaryotes, nucleus, chromosomes and cell theory',
        paragraphs: [
          'The cytoplasm is the semi-fluid material inside a cell where many cellular reactions occur. Eukaryotic cells compartmentalise functions among organelles. Prokaryotic cells, including bacteria, lack a membrane-bound nucleus and membrane-bound organelles; their main DNA is found in a nucleoid region. Plant and animal cells are eukaryotic, with nuclei and organelles. Prokaryotic and eukaryotic are descriptions of cell organisation, not rankings of how important a living thing is.',
          'The nucleus has a double membrane with pores controlling exchange with the cytoplasm. Inside it, the nucleolus contributes to making ribosomal subunits. The nuclear material includes DNA associated with proteins. Genes are functional stretches of DNA containing inherited instructions. In non-dividing cells, the DNA is usually less compact chromatin; chromosomes become especially distinct under a microscope when a cell is about to divide.',
          'A notable exception to the simplified statement that animal cells always have nuclei is the mature human red blood cell: it loses its nucleus and has more room for haemoglobin, which carries oxygen. The cell consequently cannot divide and repair itself in the same way as a nucleated cell. In a bacterial cell, the genetic material has no surrounding nuclear membrane, but it still carries instructions for cell activities.',
          'Classical cell theory developed through observations made by Matthias Schleiden, Theodor Schwann and Rudolf Virchow: organisms are composed of one or more cells; the cell is the basic unit of structure and function; and new cells originate from pre-existing cells. The theory connects growth and reproduction to the continuity of living cells. Gottlieb Haberlandt later proposed plant-cell totipotency, helping inspire plant tissue culture; whether a particular cell can regenerate a whole plant depends on its type and suitable conditions.',
          'Modern experiments also demonstrate how strongly DNA directs cellular activity. J. Craig Venter’s team inserted synthetic bacterial DNA into an existing recipient cell, after which the cell operated under the inserted genome. The entire cell was not built from non-living materials: its cytoplasm, membrane and machinery had already existed. This distinction matters when describing synthetic biology accurately.'
        ],
        examples: [
          {
            title: 'Activity 2.4: Compare three cell diagrams',
            question: 'A diagram shows a membrane and cytoplasm, DNA in a nucleoid, and no membrane-bound nucleus. Is it plant, animal or bacterial?',
            steps: [
              'Look first for the location of DNA and whether the nucleus has a surrounding membrane.',
              'A nucleoid without a nuclear membrane indicates a prokaryotic cell.',
              'A typical bacterium matches this description; a cell wall by itself is not sufficient to distinguish it from a plant cell.',
              'Check other features: the diagram should lack mitochondria and a Golgi apparatus, but can include ribosomes.'
            ],
            answer: 'A typical bacterial (prokaryotic) cell.'
          },
          {
            title: 'Cell theory as a testable chain of ideas',
            question: 'A growing onion root forms additional cells. Which principle of cell theory explains where the new cells came from?',
            steps: [
              'Identify what changes: the number of cells increases.',
              'Recall the third principle: cells are formed from pre-existing cells.',
              'Connect the observed growth to cell division rather than the spontaneous appearance of new cells from non-cellular material.'
            ],
            answer: 'New cells arise through division of pre-existing cells.'
          }
        ],
        checkQuestions: [
          {question:'Why is it misleading to say that Venter’s team constructed an entire living cell from scratch?',answer:'They synthesised a genome and placed it into an already existing cell with cytoplasm, membrane and working molecular machinery.'},
          {question:'A cell has ribosomes but no membrane-bound nucleus. Why does that not mean it has no protein synthesis?',answer:'Ribosomes are present in prokaryotes and can synthesise proteins; a membrane-bound nucleus is not required for that process.'}
        ],
        tip: 'A nucleoid is not a true nucleus. Do not infer that a mature human red blood cell can divide simply because it is an animal cell.'
      },
      {
        title: 'Organelles working together: ribosomes, ER, Golgi and lysosomes',
        visual: 'protein-path',
        paragraphs: [
          'An organelle is a cell component with a particular function. Not every organelle has its own membrane: ribosomes, for example, have no surrounding membrane and can be free in the cytoplasm or attached to rough endoplasmic reticulum. Ribosomes assemble proteins using genetic instructions. In eukaryotes, the nucleolus helps form ribosomal subunits, which function in the cytoplasm.',
          'The endoplasmic reticulum (ER) is a membrane network connected to the nuclear envelope. Rough ER (RER) is dotted with attached ribosomes and is especially important in making proteins intended for cell membranes, compartments or secretion. Smooth ER (SER) has no attached ribosomes and is involved in lipid synthesis and functions such as metabolism of some molecules. Both perform distinct but coordinated tasks.',
          'The Golgi apparatus receives material from the ER, modifies and sorts it, and packages it into membrane-bound vesicles. These vesicles can move to other cell compartments or fuse with the plasma membrane to release or deliver their contents. In a typical secretory pathway, DNA provides instructions, ribosomes on the RER make a protein, the protein travels through the ER and Golgi, and a vesicle carries it to its destination.',
          'Lysosomes are membrane-bound compartments containing digestive enzymes that help break down unwanted material, damaged cellular components or some ingested particles. The useful products can be recycled. NCERT notes enzymes associated with a sperm cell’s acrosome in fertilisation; the acrosome is a specialised, Golgi-derived, lysosome-related structure. It is inaccurate to picture a whole ordinary lysosome simply moving into an egg.',
          'A good cell-as-factory analogy is only a starting point: the organelles are not independent departments giving orders to one another. They work through molecules, signals, transport and shared energy. For membrane synthesis, proteins may be made by ribosomes associated with the RER and lipids mainly by the SER; the Golgi and vesicles help traffic these components to the cell surface.'
        ],
        examples: [
          {
            title: 'Follow a secreted protein through the cell',
            question: 'A gland cell releases a protein. Describe the main route the protein takes.',
            steps: [
              'A DNA gene in the nucleus contains instructions; those instructions are copied into RNA.',
              'A ribosome associated with rough ER synthesises the protein into the ER pathway.',
              'Transport vesicles carry the protein to the Golgi apparatus for sorting and processing.',
              'Another vesicle moves the protein toward the cell surface and may release it when it fuses with the membrane.'
            ],
            answer: 'Nuclear genetic instructions → rough ER ribosome → ER → Golgi → transport vesicle → cell membrane or exterior.'
          },
          {
            title: 'RER versus SER: explain the difference',
            question: 'Which kind of ER mainly synthesises membrane proteins, and which is especially associated with lipid synthesis?',
            steps: [
              'RER appears rough because ribosomes attach to its outer face.',
              'The attached ribosomes build many proteins destined for membranes or secretion.',
              'SER lacks attached ribosomes and is particularly involved in lipid synthesis.'
            ],
            answer: 'RER for many membrane/secreted proteins; SER for lipids. Their structures support their roles.'
          },
          {
            title: 'What fails when lysosomes cannot function?',
            question: 'Predict one consequence if a cell cannot properly break down damaged components.',
            steps: [
              'Identify the role: lysosomal enzymes digest and help recycle materials.',
              'Without adequate breakdown, damaged components may accumulate.',
              'This can disrupt other cellular activities and reduce the cell’s ability to maintain itself.'
            ],
            answer: 'Cellular waste and damaged material may accumulate and disturb normal function.'
          }
        ],
        checkQuestions: [
          {question:'Why is it incorrect to describe all organelles as membrane-bound?',answer:'Ribosomes perform protein synthesis but have no enclosing membrane, whereas ER, Golgi and lysosomes are membrane-bound.'}
        ],
        tip: 'Practise tracing matter through the cell. Define what each organelle contributes and which products actually move between them.'
      },
      {
        title: 'Energy, food, pigments and storage: mitochondria, plastids and vacuoles',
        paragraphs: [
          'Mitochondria release usable energy from food molecules through cellular respiration and help form ATP, which powers many cellular activities. Each mitochondrion has an outer membrane and a folded inner membrane. The folds, called cristae, increase the surface area available for energy-producing processes. Plant cells also have mitochondria: they need energy both during daylight and at night.',
          'A chloroplast is a photosynthetic plastid with chlorophyll that absorbs light energy. It has a double membrane, a fluid region called the stroma, and internal membranes that house photosynthetic pigments. Chloroplasts make sugars from simple substances using light; mitochondria transfer energy from food to ATP. These processes complement one another but are not interchangeable.',
          'Chromoplasts contain coloured pigments that produce many yellow, orange and red plant colours. Leucoplasts are generally colourless plastids that store materials such as starch, oils or proteins. Root or tuber cells may contain leucoplasts even without chloroplasts, so the absence of green colour does not mean the absence of all plastids. Pigment-based classifications describe typical functions rather than strict rules about every cell.',
          'Mitochondria and plastids possess their own DNA and ribosomes, supporting the hypothesis that they share an evolutionary history with certain bacteria. This does not mean they operate independently of the cell; many proteins they need come from genes in the nucleus. Their membranes and ribosomes are relevant to their specialised functions.',
          'In mature plant cells a large central vacuole holds water, dissolved substances and some wastes. The pressure of its contents against the cell wall contributes to turgidity, helping leaves and stems remain firm. When water is lost, plant cells can become flaccid and the plant may wilt. Animal cells can contain smaller storage vesicles or vacuoles, but typically lack one enormous central vacuole.'
        ],
        examples: [
          {
            title: 'Why can a potato root cell contain plastids?',
            question: 'A student says all plastids are chloroplasts and therefore roots contain none. Explain the error.',
            steps: [
              'Plastids include more than chloroplasts: leucoplasts and chromoplasts are other kinds.',
              'Underground plant tissues may store starch in colourless plastids such as amyloplasts (a kind of leucoplast).',
              'Photosynthesis is not the only plastid-related function.'
            ],
            answer: 'Root cells can contain non-green plastids such as starch-storing leucoplasts even without functioning chloroplasts.'
          },
          {
            title: 'Mitochondrion versus chloroplast',
            question: 'How are these organelles similar, and what different roles do they perform?',
            steps: [
              'Both have double membranes, their own DNA and their own ribosomes.',
              'Chloroplasts in photosynthetic cells capture light energy to form sugars.',
              'Mitochondria in plant and animal cells use food-derived energy to make ATP.',
              'An organelle’s membranes and internal organisation help it perform its specialised reactions.'
            ],
            answer: 'They have some structural similarities but different energy-related functions; most plant cells require mitochondria whether or not they photosynthesise.'
          }
        ],
        checkQuestions: [
          {question:'Why might a plant wilt even though its cell walls are still present?',answer:'Loss of water from vacuoles reduces turgor pressure, so cells become less firm even though the wall itself remains.'}
        ],
        tip: 'Chloroplasts are not the only plastids. ATP production and photosynthesis are related but different processes.'
      },
      {
        title: 'Cell growth and division: mitosis versus meiosis',
        visual: 'division',
        paragraphs: [
          'Cells grow only within workable limits; multicellular organisms often grow mainly by increasing cell number through division. An onion root tip contains many actively dividing cells. Under a microscope, its cells may show different arrangements of nuclear material because they are at different stages of the cell cycle. Activity 2.5 uses this observation to connect cell division with root growth; the prepared-slide observation should be done in a supervised school laboratory.',
          'Mitosis is a type of division that normally produces two daughter cells with the same chromosome number and very similar genetic information as the parent cell. In multicellular organisms it supports growth, repair and replacement of cells. It is also used in many forms of asexual reproduction. Chromosomes are copied before division, and the copies are distributed so each daughter cell receives a complete set.',
          'Meiosis has two successive nuclear divisions and reduces chromosome number by half, contributing to genetic variation and sexual reproduction. In a simplified textbook model, one diploid starting cell can yield four haploid products; however, it is not correct to say that all four become functional gametes in every organism. In humans, formation of eggs yields one functional egg and smaller polar bodies. In flowering plants, meiosis forms spores; these develop into structures that later produce gametes.',
          'During fertilisation, the fusion of two haploid gametes restores the species’ typical diploid chromosome number. This is why making gametes by ordinary mitosis instead of reduction division would disrupt normal chromosome-number balance across generations. Meiosis-related variation also explains why offspring can share traits with their parents without being genetically identical.',
          'The aim of Chapter 2 is to know the purpose and major outcome of mitosis and meiosis, not to memorise the complete advanced sequence of each stage. In questions about skin repair versus reproduction, identify the required chromosome outcome before choosing a process.'
        ],
        examples: [
          {
            title: 'Activity 2.5: Why do onion-root cells look different?',
            question: 'A prepared microscope slide shows root-tip cells with different patterns of visible chromosomes. What explains this?',
            steps: [
              'Root tips grow because their cells repeatedly grow and divide.',
              'Cells in a field of view are not all at the same stage of the cell cycle.',
              'Chromosomes become more condensed and arranged differently during mitosis.',
              'Different microscope appearances therefore support the idea that cell division has successive stages.'
            ],
            answer: 'The root-tip cells are observed at different stages of cell division, even though they belong to the same growing tissue.'
          },
          {
            title: 'Compare the outcomes of mitosis and meiosis',
            question: 'Starting with a diploid cell containing 8 chromosomes, compare the typical textbook outcomes.',
            steps: [
              'Mitosis makes two daughter cells, each maintaining 8 chromosomes.',
              'Meiosis reduces the chromosome number by half, typically yielding haploid products with 4 chromosomes each.',
              'There may be four haploid products in the simplified model, but not four functional gametes in every life cycle.',
              'Use chromosome number and function to distinguish the processes.'
            ],
            answer: 'Mitosis: two cells with 8 chromosomes. Meiosis: haploid products with 4 chromosomes; the number and fate of functional gametes depend on the organism.'
          },
          {
            title: 'Why not use meiosis to repair skin?',
            question: 'What would be wrong with repairing ordinary skin by meiosis rather than mitosis?',
            steps: [
              'Skin repair needs replacement cells of the same kind with the normal somatic chromosome number.',
              'Mitosis maintains that chromosome number and produces broadly similar daughter cells.',
              'Meiosis is a reduction division for sexual reproduction, creating cells with half the chromosome complement.',
              'Such products cannot simply replace ordinary skin cells while preserving their usual genetic organisation.'
            ],
            answer: 'Mitosis is suitable for growth and repair; meiosis is specialised for sexual reproduction and chromosome reduction.'
          }
        ],
        checkQuestions: [
          {question:'If the starting cell has 12 chromosomes, what chromosome count should a typical mitotic daughter cell have, and what count should a haploid meiotic product have?',answer:'A mitotic daughter cell normally has 12; a haploid meiotic product normally has 6.'}
        ],
        tip: 'Do not say mitosis creates two unrelated cells or that meiosis always makes four usable eggs or sperm. Explain chromosome numbers and biological purpose.'
      },
      {
        title: 'Cell theory in society: culture, controlled growth and preservation',
        paragraphs: [
          'Studying dividing cells contributed to improved microscopy and practical applications such as cell culture. In laboratories, researchers may grow cells under carefully controlled, sterile conditions to investigate cell behaviour or develop medicines and other products. The useful point for this chapter is that cells remain living systems needing suitable surroundings and nutrients, not the procedure for culturing them.',
          'Normal cells balance division, work, repair and removal. In many animal tissues, contact with neighbouring cells helps limit further division, a phenomenon called contact inhibition. This is one aspect of a larger network of growth regulation. Cells can also undergo programmed cell death, a controlled process important for healthy development and removing cells that are no longer needed.',
          'Cancer can arise when genetic and cellular controls over division and survival become disrupted. Abnormal cells may continue dividing and form tumours. Some tumours are benign and remain localised; malignant tumours can invade surrounding tissues or spread elsewhere. Loss of contact inhibition may contribute in some cancer cells, but is not the sole cause. This is a conceptual overview, not a way to diagnose disease.',
          'Applying osmosis, producers can use high concentrations of salt or sugar to lower the water available to many microorganisms. Reduced water availability inhibits their growth and helps preserve certain foods, including fruit preserves and pickles. This does not mean all microbes instantly die or that preservation is guaranteed without appropriate food-safety practices. The wider case study also connects scientific understanding with reducing food waste and supporting a farmer’s income.',
          'Understanding cell structure and function creates a common foundation for medicine, agriculture, plant tissue culture and ecology. A good science answer describes how the relevant cell process works and links it to the observation, rather than memorising only a scientist’s name or a list of organelles.'
        ],
        examples: [
          {
            title: 'Why does concentrated sugar help preserve some fruit?',
            question: 'Explain the cellular principle used when a fruit preserve has a sufficiently high sugar concentration.',
            steps: [
              'High dissolved sugar reduces the available water in the surrounding food.',
              'Many spoilage-causing microorganisms have difficulty obtaining water; some lose water by osmosis.',
              'Their growth slows or stops under these conditions.',
              'This is one preservation mechanism, not a guarantee that all microorganisms have been eliminated.'
            ],
            answer: 'The application relies on osmosis and reduced water availability, which can inhibit microbial growth.'
          },
          {
            title: 'What does uncontrolled cell growth mean?',
            question: 'A tissue contains cells that continue dividing despite normal signals to stop. What concept helps explain why this is concerning?',
            steps: [
              'Healthy tissues regulate division, repair and cell removal.',
              'Ignoring growth-control signals can allow abnormal cell numbers to increase.',
              'This may contribute to tumours; whether a tumour is cancerous requires further evidence.',
              'One failure mechanism does not explain every case of cancer.'
            ],
            answer: 'Loss of normal regulation of cell division and survival can contribute to tumour formation.'
          },
          {
            title: 'Use NCERT’s potato-cup exercise to reason about living membranes',
            question: 'Why may water collect in potato cups containing sugar or salt but not in an otherwise comparable boiled-potato cup?',
            steps: [
              'Sugar or salt in the cavity creates a lower-water-availability region, tending to draw water across the living potato tissue.',
              'A normal potato’s intact cell membranes help create the selective boundary needed for osmosis.',
              'Boiling damages cell membranes; without the same selective properties the classic cup effect is not observed in the same way.',
              'An empty cup acts as a comparison so the effect cannot be attributed merely to the hollow shape.'
            ],
            answer: 'Osmosis depends on the concentration difference and an effective selectively permeable membrane; the empty and boiled comparisons clarify the mechanism.'
          }
        ],
        checkQuestions: [
          {question:'A student says concentrated salt instantly kills every bacterium and fungus in a pickle. What is a better scientific statement?',answer:'High solute concentration lowers water availability and inhibits growth of many microorganisms, but the effect depends on conditions and does not guarantee that all organisms die.'},
          {question:'Does the fact that some cancer cells lose contact inhibition explain every cancer?',answer:'No. Cancer involves disruptions of multiple controls over cell division, survival and other behaviours. Contact inhibition is only one related mechanism.'}
        ],
        tip: 'For application questions, connect the biological observation to its mechanism. Distinguish normal growth, programmed removal, and uncontrolled division without making an absolute claim.'
      }
    ]
  };

  window.CBSE_CLASS9_SCIENCE_FULL_NOTES = Object.assign(
    {},
    window.CBSE_CLASS9_SCIENCE_FULL_NOTES || {},
    {'Cell: The Building Block of Life':chapter}
  );
})();