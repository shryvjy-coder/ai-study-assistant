#!/usr/bin/env python3
"""Package CBSE Class 9 StudyAI maths notes for an external NCERT-based audit.

Run: python scripts/package_gemini_review.py
Generates dist/StudyAI_Class9_Maths_Gemini_Review.zip.
No NCERT PDFs included: textbooks must be supplied by their legitimate owner.
"""
from __future__ import annotations

from datetime import date
from pathlib import Path
import textwrap
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "dist" / "StudyAI_Class9_Maths_Gemini_Review.zip"
BASE = "StudyAI_Class9_Maths_Gemini_Review"

ORIGINAL_BANKS = [
    "cbse-class9-math-full-notes-a.js",
    "cbse-class9-math-full-notes-b.js",
    "cbse-class9-math-full-notes-c.js",
]
SHARED = [
    "cbse-class9-maths-depth-engine.js",
    "studyai-long-notes.js",
    "topic-lesson-reader.js",
    "studyai-lesson-progress.js",
    "index.html",
    "cbse-class9-math-topic-lessons.js",
    "cbse-class9-math-concept-lessons.js",
    "cbse-class9-math-audit-corrections.js",
    "cbse-class9-math-textbook-verified.js",
    "studyai-concept-figures.js",
    "studyai-verified-figures.js",
    "studyai-diagrams.js",
]
CHAPTERS = [
    ("01", "Orienting Yourself: The Use of Coordinates", "a"),
    ("02", "Introduction to Linear Polynomials", "a"),
    ("03", "The World of Numbers", "a"),
    ("04", "Exploring Algebraic Identities", "a"),
    ("05", "I’m Up and Down, and Round and Round", "a"),
    ("06", "Measuring Space: Perimeter and Area", "b"),
    ("07", "The Mathematics of Maybe: Introduction to Probability", "b"),
    ("08", "Predicting What Comes Next: Exploring Sequences and Progressions", "b"),
    ("09", "Propositions and their Converses", "b"),
    ("10", "How Quantities Combine: Understanding Data", "b"),
    ("11", "The World of Algorithms", "c"),
    ("12", "Quadrilaterals", "c"),
    ("13", "Two Variables, One Line", "c"),
    ("14", "Math of Space: Surface Area and Volume", "c"),
]
AUDIT_PROMPT = """# StudyAI — Independent NCERT Ganita Manjari 2026–27 chapter audit

I am building an original study resource for CBSE Class 9 Mathematics.
The attached official NCERT Ganita Manjari textbook PDF is my primary curriculum source.
The attached StudyAI JavaScript files contain original notes and (optionally)
rendering/lesson integration code.

Please audit the identified chapter against the textbook, not against
your memory or another syllabus. Do not assume the code is correct.

1. Identify chapter title, NCERT Part I/II, and actual chapter sections
   by consulting the uploaded PDF. If a required page is missing, say so.
2. Make a topic-by-topic coverage table. For each NCERT concept, classify
   the supplied StudyAI content as COMPLETE / PARTIAL / MISSING,
   with verifiable textbook section/page references.
3. Recalculate every worked mathematical example, formula, result and proof.
   Show the exact incorrect expression and corrected working for any error.
4. Flag incorrect prerequisites, geometry assumptions, domain conditions,
   unit conversions, diagrams, unproved claims or mislabelled optional topics.
5. Evaluate whether the explanations are comprehensive, logically sequenced
   and sufficient preparation for the textbook exercises and common exam tasks.
6. Assess whether any important ideas remain only overview-level, and
   propose specific new paragraphs, examples or derivations.
7. Check integration: existing notes bank + expanded chapter patch + reader,
   noting duplicates, invisible sections or material overwritten by later scripts.
8. Do not copy any copyrighted source passages at length. Write all fixes
   in fresh original words.

Return:
A) Accuracy /10, coverage /10, depth /10, worked examples /10,
   exam usefulness /10
B) Detailed NCERT-to-StudyAI mapping table with page references
C) Ranked errors (CRITICAL / MAJOR / MINOR) with section, evidence and fix
D) Missing explanations, proofs, diagrams or exercise-style examples
E) Exact proposed JavaScript-safe replacement content
F) Verdict: READY / NEEDS IMPROVEMENT / NOT READY

Make clear which findings are confirmed from the uploaded textbook and
which are your own educational recommendations. Do not claim verification
of files, chapters or diagrams you have not opened.
"""

README = """# StudyAI Class 9 CBSE Mathematics — Gemini Review Pack

This archive contains original StudyAI notes and the exact JavaScript
content layers used to render them on the development branch:
  https://github.com/shryvjy-coder/ai-study-assistant/tree/class9-maths-all-chapters-depth
Draft PR #27: https://github.com/shryvjy-coder/ai-study-assistant/pull/27

How to use:
1. Extract this archive.
2. Open 'chapters/01_.../' and upload the files IN THAT folder to Gemini.
3. Also upload the matching chapter's OFFICIAL NCERT Ganita Manjari
   2026–27 PDF, sourced from your own authorised textbook collection.
4. Paste 'GEMINI_AUDIT_PROMPT.txt', and tell Gemini the chapter number.
5. Repeat for each folder 01–14, ideally as separate Gemini chats.
6. For a final integration audit, upload files from 'shared-integration/'.

READ THIS:
- Official NCERT textbook PDFs are NOT inside this archive. Source books
  need to be uploaded separately; Gemini cannot verify completeness without
  the actual textbook.
- A chapter folder contains the entire original bank file covering several
  chapters plus the new chapter-specific depth patch. This is expected.
- Chapter 03 'The World of Numbers' uses multiple existing teaching layers
  instead of a new depth-ch03.js. Do not treat this as a missing chapter.
- Shared code supplies rendering and combined content. The browser loads
  source banks, prior correction layers, concept modules and depth modules
  in order. Check source-order when reviewing actual rendered notes.
- The automated GitHub tests validate structural content and browser
  navigation; they are NOT a substitute for independent mathematical audit.
- Do not copy SaveMyExams notes, textbook passages, or proprietary diagrams.
- Do NOT merge PR #27 into main without the project owner's approval.
"""

def add_text(archive: zipfile.ZipFile, relative: str, body: str) -> None:
    archive.writestr(BASE + "/" + relative, body.encode("utf-8"))

def add_file(archive: zipfile.ZipFile, path: str, dest: str) -> None:
    file = ROOT / path
    if not file.is_file():
        raise FileNotFoundError(f"Required source file missing: {path}")
    archive.write(file, BASE + "/" + dest)

def build() -> None:
    OUTPUT.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(OUTPUT, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        add_text(archive, "README_START_HERE.md", README)
        add_text(archive, "GEMINI_AUDIT_PROMPT.txt", AUDIT_PROMPT)
        add_text(archive, "CHAPTER_INDEX.tsv", "Number\tChapter\tOriginal Bank\tExpanded Patch\n" + "\n".join(
            f"{number}\t{title}\tcbse-class9-math-full-notes-{bank}.js\t" +
            (f"cbse-class9-maths-depth-ch{number}.js" if number != "03" else "multiple existing topic layers")
            for number, title, bank in CHAPTERS
        ) + "\n")
        for number, title, bank in CHAPTERS:
            chapter_dir = f"chapters/{number}_Class_9_Maths"
            original = f"cbse-class9-math-full-notes-{bank}.js"
            add_file(archive, original, f"{chapter_dir}/{original}")
            add_file(archive, "cbse-class9-maths-depth-engine.js",
                     f"{chapter_dir}/cbse-class9-maths-depth-engine.js")
            if number != "03":
                patch = f"cbse-class9-maths-depth-ch{number}.js"
                add_file(archive, patch, f"{chapter_dir}/{patch}")
                extras = ""
            else:
                for layer in [
                    "cbse-class9-math-topic-lessons.js",
                    "cbse-class9-math-concept-lessons.js",
                    "cbse-class9-math-audit-corrections.js",
                    "cbse-class9-math-textbook-verified.js",
                ]:
                    add_file(archive, layer, f"{chapter_dir}/{layer}")
                extras = "Chapter 03 is built from these four existing refinement layers, not a ch03 patch.\n"
            add_text(archive, f"{chapter_dir}/UPLOAD_GUIDE.txt",
                     f"Chapter {number}: {title}\n\n"
                     f"UPLOAD all JS files in this folder + the official textbook PDF\n"
                     "for this chapter to a fresh Gemini chat.\n"
                     "Paste GEMINI_AUDIT_PROMPT.txt from the archive root.\n"
                     "Also supply studyai-long-notes.js from shared-integration/\n"
                     "when reviewing source-to-display integration.\n"
                     + extras)
        for path in SHARED + ORIGINAL_BANKS + [
            f"cbse-class9-maths-depth-ch{n}.js"
            for n, _, _ in CHAPTERS if n != "03"
        ]:
            add_file(archive, path, f"shared-integration/{path}")
        add_text(archive, "shared-integration/READ_ME_FIRST.txt",
                 "These files determine how the 14 chapters are combined and displayed.\n"
                 "Supply these for final cross-chapter code/content integration audit.\n")
    with zipfile.ZipFile(OUTPUT, "r") as archive:
        bad = archive.testzip()
        if bad:
            raise RuntimeError(f"Invalid zipped entry: {bad}")
        names = archive.namelist()
        assert len([n for n in names if n.endswith('/UPLOAD_GUIDE.txt')]) == 14
        assert names[0].endswith("/README_START_HERE.md")
    print(f"CREATED {OUTPUT} ({OUTPUT.stat().st_size:,} bytes, {len(names)} entries)")

if __name__ == "__main__":
    build()
