#!/usr/bin/env python3
"""Turn validated JSON candidate lessons into a deterministic, reviewable site patch."""
from __future__ import annotations
import argparse
import json
from pathlib import Path
import subprocess

END_MARKER = '<script defer src="cbse-class9-maths-depth-ch14.js"></script>'
LOAD_MARKER = '<script defer src="cbse-class9-maths-audited-proposals.js"></script>'

# All externally generated prose is DATA, never evaluated as source code.
LOADER_START = """/* Review-only, textbook-cited StudyAI curriculum proposals.
 * Generated deterministically by automation/class9-maths/apply-proposals.py.
 * AI-written content is JSON data: never use eval or Function on this data.
 */
(() => {
'use strict';
const proposals = """
LOADER_END = """;
const bank=window.CBSE_CLASS9_MATH_FULL_NOTES||{};
const safe=x=>Array.isArray(x)?x:[];
const generic=new Set(['Chapter coverage','Exam application',
 'Common traps and final checks','Mastery check']);
const norm=x=>String(x||'').trim().toLowerCase()
 .replace(/[\\u2018\\u2019]/g,"'");
for(const record of proposals){
 const chapter=bank[record.chapter_title];
 if(!chapter||!Array.isArray(chapter.sections))
  throw Error('Curriculum proposal chapter missing: '+record.chapter_title);
 const seen=new Set(chapter.sections.flatMap(s=>safe(s.subtopics).map(p=>norm(p.title))));
 for(const p of record.lessons){
  const section=chapter.sections.find(s=>s.title===p.section&&!generic.has(s.title));
  if(!section)throw Error('Curriculum proposal target section missing: '+p.section);
  if(seen.has(norm(p.title)))continue;
  if(!Array.isArray(section.subtopics))section.subtopics=[];
  section.subtopics.push({
   title:p.title,
   paragraphs:p.paragraphs.slice(),
   formulas:p.formulas.slice(),
   examples:p.examples.map(x=>({
    title:x.title,question:x.question,steps:x.steps.slice(),answer:x.answer
   })),
   bullets:[],
   tip:'Source checked against official NCERT. Mathematical solutions still require human review.',
   exam_warning:'Read the full worked steps; verify each algebraic or arithmetic claim before relying on this lesson.'
  });
  seen.add(norm(p.title));
 }
 const registry=window.STUDYAI_CLASS9_DEPTH_AUDIT||{};
 const audit=registry[record.chapter_title];
 if(audit){
  const sections=chapter.sections;
  const all=sections.flatMap(s=>safe(s.subtopics));
  audit.sections=sections.filter(s=>!generic.has(s.title)).length;
  audit.subtopics=all.length;
  audit.examples=sections.reduce((n,s)=>n+safe(s.examples).length,0)+
   all.reduce((n,s)=>n+safe(s.examples).length,0);
  audit.paragraphs=sections.reduce((n,s)=>n+safe(s.paragraphs).length,0)+
   all.reduce((n,s)=>n+safe(s.paragraphs).length,0);
  audit.automatedReviewCandidates=record.lessons.length;
 }
}
})();
"""

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site",type=Path,required=True)
    parser.add_argument("--candidates",type=Path,required=True)
    args=parser.parse_args()
    site=args.site.resolve()
    index=site/"index.html"
    if not index.exists():
        parser.error("Site index.html is missing")
    proposals=json.loads(args.candidates.read_text(encoding="utf-8"))
    if not isinstance(proposals,list):
        parser.error("Candidate JSON must be a list")
    lesson_count=0
    for record in proposals:
        if (not isinstance(record,dict) or
            not isinstance(record.get("chapter_title"),str) or
            type(record.get("chapter_number")) is not int or
            not isinstance(record.get("lessons"),list) or
            len(record["lessons"])>2):
            parser.error("Invalid chapter candidate payload")
        for p in record["lessons"]:
            if not isinstance(p,dict) or not all(k in p for k in (
                "section","title","paragraphs","formulas","examples","evidence"
            )) or not p["evidence"]:
                parser.error("Lesson lacks verified textbook evidence")
            lesson_count+=1
    if not lesson_count:
        print("No evidence-backed additions were proposed. No site files changed.")
        return
    old=index.read_text(encoding="utf-8")
    if old.count(END_MARKER)!=1:
        parser.error("Could not find the expected final depth-script anchor exactly once")
    patched=old if LOAD_MARKER in old else old.replace(END_MARKER,END_MARKER+"\n"+LOAD_MARKER)
    generated=LOADER_START+json.dumps(proposals,ensure_ascii=False,indent=2)+LOADER_END
    output=site/"cbse-class9-maths-audited-proposals.js"
    output.write_text(generated,encoding="utf-8")
    subprocess.run(["node","--check",str(output)],check=True)
    index.write_text(patched,encoding="utf-8")
    print(f"Generated {lesson_count} candidate lessons from {len(proposals)} chapters. "
          "Human review and browser tests are required before merging.")

if __name__=="__main__":
    main()
