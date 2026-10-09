#!/usr/bin/env python3
"""Offline, API-key-free guardrail tests for StudyAI's NCERT automation."""
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

from pipeline import normal, validate, get_pdf

HERE=Path(__file__).resolve().parent

def sample_notes():
    return {"number":11,"title":"The World of Algorithms","sections":[
        {"title":"Adding numbers digit by digit",
         "subtopics":[{"title":"Place value explains carrying",
                       "paragraphs":["Basic existing coverage"]}]}
    ]}

def sample_model():
    return {
        "chapter_number":11,"summary":"The source mentions decimal alignment.",
        "gaps":[{"concept":"Decimal alignment","page":1,
                 "quote":"How would you modify the algorithm to add two decimal fractions?",
                 "status":"partial","rationale":"More detail would help."}],
        "proposals":[{
            "section":"Adding numbers digit by digit",
            "title":"Adding decimal fractions without losing place value",
            "paragraphs":[
                "A "*64+"Place the units digit above the other units digit so the decimal columns will match.",
                "B "*64+"Append trailing zeros when one number has fewer digits after the decimal point."
            ],
            "formulas":["a+b=c"],
            "examples":[{
                "title":"Two fractions","question":"Add 12.5 and 3.75.",
                "steps":["Align the decimal points and write 12.50 above 3.75.",
                         "Hundredths: 0 plus 5 gives 5 in the final position.",
                         "Tenths: 5 plus 7 equals 12, so carry 1 to the units.",
                         "Units and tens give 16 before placing the decimal."],
                "answer":"16.25"
            }],
            "evidence_ids":[0]
        }]
    }

class PipelineTests(unittest.TestCase):
    def test_manifest_has_complete_verified_chapter_sequence(self):
        data=json.loads((HERE/"manifest.json").read_text(encoding="utf-8"))
        self.assertEqual([x["number"] for x in data["chapters"]],list(range(1,15)))
        self.assertEqual(data["chapters"][0]["pdf"],
                         "https://ncert.nic.in/textbook/pdf/iemh101.pdf")
        self.assertEqual(data["chapters"][8]["pdf"],
                         "https://ncert.nic.in/textbook/pdf/iemh201.pdf")
        self.assertEqual(data["chapters"][-1]["pdf"],
                         "https://ncert.nic.in/textbook/pdf/iemh206.pdf")

    def test_accepts_supported_lesson_and_rejects_duplicated_second_run(self):
        model=sample_model()
        pages=["NCERT exercise: How would you modify the algorithm to add two decimal fractions?"]
        result=validate(model,sample_notes(),pages,True)
        self.assertEqual(len(result["candidate_lessons"]),1)
        self.assertEqual(len(result["verified_gaps"]),1)
        chapter=sample_notes()
        chapter["sections"][0]["subtopics"].append(
            {"title":model["proposals"][0]["title"],"paragraphs":["Already covered"]})
        result=validate(model,chapter,pages,True)
        self.assertEqual(result["candidate_lessons"],[])
        self.assertIn("duplicate", " ".join(result["rejected_claims"]))

    def test_rejects_fabricated_pdf_claim(self):
        model=sample_model()
        model["gaps"][0]["quote"]="The NCERT chapter requires binary search and sorting."
        output=validate(model,sample_notes(),["The chapter discusses GCD."],True)
        self.assertEqual(output["verified_gaps"],[])
        self.assertEqual(output["candidate_lessons"],[])
        self.assertTrue(any("quote not found" in msg for msg in output["rejected_claims"]))

    def test_rejects_fictional_section_and_wrong_chapter(self):
        model=sample_model()
        model["proposals"][0]["section"]="Imaginary NCERT lesson"
        pages=["How would you modify the algorithm to add two decimal fractions?"]
        output=validate(model,sample_notes(),pages,True)
        self.assertEqual(output["candidate_lessons"],[])
        model["chapter_number"]=8
        with self.assertRaises(ValueError):
            validate(model,sample_notes(),pages,True)

    def test_audit_only_cannot_patch_site(self):
        model=sample_model()
        pages=["How would you modify the algorithm to add two decimal fractions?"]
        output=validate(model,sample_notes(),pages,False)
        self.assertEqual(output["candidate_lessons"],[])

    def test_disallows_untrusted_pdf_urls(self):
        with tempfile.TemporaryDirectory() as folder:
            with self.assertRaises(ValueError):
                get_pdf("https://example.com/pretend.pdf",Path(folder)/"book.pdf")

    def test_loader_generation_is_deterministic_and_can_run_twice(self):
        from apply_proposals import END_MARKER, LOAD_MARKER
        model=sample_model()
        pages=["How would you modify the algorithm to add two decimal fractions?"]
        result=validate(model,sample_notes(),pages,True)
        with tempfile.TemporaryDirectory() as folder:
            site=Path(folder)
            (site/"index.html").write_text(
                "<html>"+END_MARKER+"</html>",encoding="utf-8")
            path=site/"candidates.json"
            path.write_text(json.dumps([{
                "chapter_number":11,"chapter_title":"The World of Algorithms",
                "lessons":result["candidate_lessons"]}],ensure_ascii=False),encoding="utf-8")
            cmd=["python3",str(HERE/"apply-proposals.py"),
                 "--site",str(site),"--candidates",str(path)]
            subprocess.run(cmd,check=True,capture_output=True)
            first=(site/"cbse-class9-maths-audited-proposals.js").read_text(encoding="utf-8")
            subprocess.run(cmd,check=True,capture_output=True)
            self.assertEqual(first,(site/"cbse-class9-maths-audited-proposals.js").read_text(encoding="utf-8"))
            self.assertEqual((site/"index.html").read_text().count(LOAD_MARKER),1)
            # Execute overlay against a real-shaped fake bank, twice, and ensure it adds once.
            wrapper=(
                "global.window={CBSE_CLASS9_MATH_FULL_NOTES:{'The World of Algorithms':"
                +json.dumps({"sections":sample_notes()["sections"]})+"}};"
                "const fs=require('fs'),vm=require('vm');"
                "const code=fs.readFileSync(process.argv[1],'utf8');"
                "vm.runInThisContext(code);vm.runInThisContext(code);"
                "const rows=window.CBSE_CLASS9_MATH_FULL_NOTES['The World of Algorithms']"
                ".sections[0].subtopics;"
                "if(rows.length!==2)process.exit(2);"
            )
            subprocess.run(["node","-e",wrapper,
                            str(site/"cbse-class9-maths-audited-proposals.js")],
                           check=True,capture_output=True)

if __name__=="__main__":
    unittest.main()
