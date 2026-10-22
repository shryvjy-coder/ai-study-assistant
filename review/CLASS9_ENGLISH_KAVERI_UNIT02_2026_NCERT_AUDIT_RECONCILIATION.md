# Class 9 English, Kaveri (2026–27): Unit 2 curriculum audit reconciliation

## Official textbook and scope

Textbook: NCERT *Kaveri*, Unit 2, printed pp. 33–68, [iebe102.pdf](https://ncert.nic.in/textbook/pdf/iebe102.pdf). The user supplied a detailed candidate audit with 10-section teaching outline, literature explanations, worked-answer recommendations and limitations. That audit was a checklist, not a substitute for checking source code and the official chapter.

Primary prose: Temsula Ao's *The Pot Maker*. Extension prose: John Galsworthy's abridged *Quality*. Main poem: *Gifts of Grace: Honouring Our Vocations* (Anonymous). Extension: R. L. Stevenson's *The Lamplighter* and a haiku task.

## Baseline confirmation

The live `main` snapshot at `7aa919ccf789371ec8c51aebcc5cc4ccf340e959` contained a compact Unit 2 record in `cbse-ncert-deep-notes-09.js` but no dedicated `CBSE_CLASS9_ENGLISH_FULL_NOTES` entry for the unit. The prior baseline largely addressed aspiration, family concerns, practical knowledge and dignity of labour at a summary level, without comprehensive NCERT exercise responses.

## Implemented teaching upgrade

* Created `cbse-class9-english-kaveri-unit02-full-notes.js` with **10 lessons, 45 original explanatory paragraphs and 61 worked models**, keyed by the *existing* unit title `The Pot Maker · Gifts of Grace: Honouring Our Vocations`.
* Detailed the key characters Sentila, Arenla, Mesoba and Onula, the economic case for weaving, pot-making stages, village council argument, the unsuccessful year of training, Onula's mentoring, technique of the rim, the final rows of pots and the bittersweet ending.
* Covered the main vocation poem as a progressive set of worker images; taught free verse, imagery, tone/mood, repetition, alliteration, metaphor, personification and symbolism. Included NCERT-style comprehension, multiple-response and analysis.
* Added teaching notes and models for pottery/economy vocabulary, noun versus relative clauses (including the mislabelled two prompts in NCERT Exercise III.1), determiners, speaking, five-step reflective writing and the Career Mela poster.
* Included brief original study-guide treatments of regional pottery and the extension works `Quality`, `The Lamplighter` and an original vocation haiku.
* Expanded the Unit 2 baseline summary and vocabulary instead of deleting or duplicating it.
* Loaded the new file in `index.html` before `script.js`. Kept Kaveri unit IDs, grade/subject routing, Maths/Science readers and old progress records intact.
* Extended the English browser regression: count 8 distinct units; Units 1 and 2 have dedicated content; verify Unit 2 headings, rendering, 71 selectable real lesson/example leaves, one focused page at a time, saved checkbox persistence and isolation from other classes.

## Editorial limitations / required human checks

* The full-book teacher transcripts on printed pp. 261–262 do not appear in `iebe102.pdf`. **Do not invent** exact answers to the two listening tasks; check the full-textbook transcript before adding exact blank and multiple-choice solutions.
* The p. 51 pottery image grid requires visual checking to verify image-to-style matches. The six named places are covered, but the image numbers are not guessed.
* Some grammar cloze items are open-ended; supplied examples are labelled model completions rather than definitive unique marking keys.
* The lineation and stanza count of the anonymous vocation poem should be checked against the original PDF page layout by a teacher. The note set paraphrases rather than copying the poem.
* The user's suggested `Quality` comparison has been narrowed to observed craftsmanship/economic contrasts, without claiming certainty about every nuance of the extension's abridgement.
* Independent English subject-teacher proofread remains necessary; this is not a claim of official NCERT or CBSE certification.

## Merge criteria

The existing StudyAI CI pipeline's **static**, **browser**, **postgres** and **curriculum-browser** jobs should pass before the PR is merged. Render deployment is a separate condition and must be verified explicitly. No paid AI services were used.

