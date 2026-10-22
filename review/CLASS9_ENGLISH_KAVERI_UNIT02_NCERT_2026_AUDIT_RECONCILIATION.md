# Class 9 CBSE English, Kaveri 2026–27: Unit 2 depth audit

Source textbook: [NCERT iebe102.pdf, printed pp. 33–68](https://ncert.nic.in/textbook/pdf/iebe102.pdf). Compared with the current main branch after Unit 1 PR #96. Input: user-supplied Gemini Unit 2 audit, reconciled independently against the official PDF text and a visual inspection of representative pages.

## Verified major gap

Unit 2, **The Pot Maker · Gifts of Grace: Honouring Our Vocations**, was only represented by a short thematic legacy entry in `cbse-ncert-deep-notes-09.js`. No full-notes module existed. This was not a UI rendering problem: it was missing authored content.

## Implemented

1. Created `cbse-class9-english-kaveri-unit02-full-notes.js` with the exact title key in `window.CBSE_CLASS9_ENGLISH_FULL_NOTES`. It includes **10 complete lessons, 45 substantive teaching paragraphs and 61 worked question and writing-answer examples**.
2. Prose: Temsula Ao, Sentila, Arenla, Mesoba, Onula, economic objections to pottery, village council, prolonged struggle, mentorship, final two rows of pots and the emotional ending.
3. NCERT prose practice: the Part I and Part II questions, nine-event sequence **4, 6, 3, 1, 8, 5, 2, 9, 7**, two five-part extracts and seven analytical reflection questions.
4. Poetry: anonymous poem, occupation-by-occupation imagery, free verse, visual and auditory language, five-part extract, seven true/false items (item six is **False**, because the principal subject is occupations rather than patriotism), symbolism, personification, alliteration and creative interpretations supported by text.
5. Language: word classification, eight economy terms with example sentences, noun and relative clauses, relative-clause completions, determiner types and exercise models, vocation matching and non-synonyms.
6. Skills: five-step original reflective write-up, original boxed Career Mela poster content, role play, vocation monologue and textbook extension presentation.
7. Extensions: short, original explanatory notes on Galsworthy's **Quality**, Stevenson's **The Lamplighter**, six regional pottery traditions and a new original haiku. No complete copyrighted story or poem has been reproduced.
8. Enriched only the Unit 2 legacy overview in `cbse-ncert-deep-notes-09.js` with names, accurate themes and short vocabulary. Registered a Unit 2 script in `index.html`, before `script.js`.
9. Updated the existing Unit 1 English Playwright regression to preserve its baseline expectations, separately exercise Unit 2 note depth, validate 10 lessons and 61 focused model answers, save/uncheck progress across reload, and ensure Units 3–8 retain their legacy routes.

## Corrections to or qualifications of the audit

- In `iebe102.pdf` **printed p. 51 contains the actual six-pottery photo grid**. The report's claim that the photos are missing only applies to extracted text; they are visually present in the PDF.
- NCERT **p. 46, Exercise III.1 (iv) and (v)** already introduces *which* and *where* relative clauses even though the heading asks for noun clauses. The study guide explicitly clarifies the grammatical function.
- Determiner items can have multiple suitable completions; examples should not be represented as an exclusive official answer key.
- Source-level stanza counting is sensitive to the PDF's long wrapped lines, so the poem is taught through its occupational images and parallel patterns without inventing a fixed end-rhyme scheme.
- The review report's numerical quality scores are opinions rather than independently calibrated measurements.

## Remaining editorial checks

- Full-book teacher listening scripts from **pp. 261–262** are outside this chapter PDF. Do not invent their exact missing audio blanks or speaker-specific multiple-choice keys.
- Any school marking-scheme equivalence and inferences about characters require independent English-teacher review. Official NCERT text is the authority; original models are examples rather than an official solved guide.
- No changes to English unit IDs, CBSE Maths, Science, Cambridge or student progress storage schema.
- Unit 3–8 are still awaiting dedicated detailed lessons.
- **All four GitHub CI jobs must pass before merge**; live Render deployment must be checked separately.
