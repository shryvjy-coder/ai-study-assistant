#!/usr/bin/env python3
"""Offline, API-key-free guardrail tests for StudyAI's NCERT automation."""
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

from pipeline import normal, validate, get_pdf, generate_with_transient_retries, select_chapters
from importlib.machinery import SourceFileLoader

proposal_module = SourceFileLoader('studyai_apply_proposals', str(Path(__file__).resolve().parent/'apply-proposals.py')).load_module()


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
    def test_batch_chapter_range_selection(self):
        available=list(range(1,15))
        self.assertEqual(select_chapters("4-14",available),list(range(4,15)))
        self.assertEqual(select_chapters("3",available),[3])
        self.assertEqual(select_chapters("all",available),available)
        for value in ("0","15","14-4","4,14","1-15","-3","3-",""):
            with self.subTest(value=value), self.assertRaises(ValueError):
                select_chapters(value,available)

    def test_reviewed_merge_target_must_exist_in_exact_section(self):
        notes=sample_notes()
        candidate=sample_model()
        candidate["proposals"][0]["merge_into"]="Place value explains carrying"
        pages=["How would you modify the algorithm to add two decimal fractions?"]
        accepted=validate(candidate,notes,pages,True)["candidate_lessons"]
        self.assertEqual(len(accepted),1)
        self.assertEqual(accepted[0]["merge_into"],"Place value explains carrying")
        candidate["proposals"][0]["merge_into"]="An invented lesson"
        rejected=validate(candidate,notes,pages,True)
        self.assertFalse(rejected["candidate_lessons"])
        self.assertTrue(any("merge_into" in reason for reason in rejected["rejected_claims"]))


    def test_gemini_temporary_high_demand_then_success(self):
        class APIError(Exception):
            code=503
        count=[]
        delays=[]
        def request():
            count.append(1)
            if len(count)<3:
                raise APIError("High demand")
            return {"ok":True}
        self.assertEqual(
            generate_with_transient_retries(request, sleep=delays.append),
            {"ok":True}
        )
        self.assertEqual(len(count),3)
        self.assertEqual(delays,[10,20])

    def test_gemini_bad_auth_is_not_retried(self):
        class APIError(Exception):
            code=401
        count=[]
        def request():
            count.append(1)
            raise APIError("Invalid API key")
        with self.assertRaises(APIError):
            generate_with_transient_retries(request, sleep=lambda _:None)
        self.assertEqual(len(count),1)

    def test_hard_daily_quota_does_not_retry(self):
        class APIError(Exception):
            code=429
        calls=[]
        def request():
            calls.append(1)
            raise APIError("Quota exceeded for GenerateRequestsPerDayPerProjectPerModel, limit: 0")
        with self.assertRaisesRegex(RuntimeError, "quota appears exhausted"):
            generate_with_transient_retries(request, sleep=lambda _:None)
        self.assertEqual(len(calls),1)

    def test_temporary_429_is_retried_and_can_recover(self):
        class APIError(Exception):
            code=429
        calls=[]
        waits=[]
        def request():
            calls.append(1)
            if len(calls)==1:
                raise APIError("RESOURCE_EXHAUSTED: requests per minute")
            return "ok"
        self.assertEqual(generate_with_transient_retries(request, sleep=waits.append),"ok")
        self.assertEqual(len(calls),2)
        self.assertEqual(waits,[10])

    def test_temporary_429_reports_rate_limits_when_exhausted(self):
        class APIError(Exception):
            code=429
        def request():
            raise APIError("RESOURCE_EXHAUSTED: input tokens per minute")
        with self.assertRaisesRegex(RuntimeError, "token-rate quota"):
            generate_with_transient_retries(request, attempts=1, sleep=lambda _:None)

    def test_gemini_exhaustion_is_bounded(self):
        class APIError(Exception):
            code=503
        count=[]
        def request():
            count.append(1)
            raise APIError("High demand")
        with self.assertRaisesRegex(RuntimeError,"after 4 attempts"):
            generate_with_transient_retries(request, sleep=lambda _:None)
        self.assertEqual(len(count),4)

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


    def test_cumulative_proposals_keep_reviewed_chapters_and_merges(self):
        previous=[{"chapter_number":1,"chapter_title":"Chapter One","lessons":[{
            "section":"Coordinates","title":"Signed distances","merge_into":"Ordered pairs",
            "paragraphs":["Reviewed teaching"],"formulas":["d=|x|"],
            "examples":[{"title":"Reviewed example","question":"?", "steps":["Step"],"answer":"A"}],
            "evidence":[{"page":1,"quote":"Evidence"}]
        }]}]
        incoming=[{"chapter_number":2,"chapter_title":"Chapter Two","lessons":[{
            "section":"Graphs","title":"Parallel lines","paragraphs":["New teaching"],
            "formulas":["y=ax+b"],"examples":[{"title":"Check","question":"?",
            "steps":["Step"],"answer":"B"}],"evidence":[{"page":2,"quote":"Evidence"}]
        }]}]
        combined=proposal_module.combine_proposals(previous,incoming)
        self.assertEqual([r["chapter_number"] for r in combined],[1,2])
        self.assertEqual(combined[0]["lessons"][0]["merge_into"],"Ordered pairs")
        self.assertEqual(proposal_module.combine_proposals(combined,incoming),combined)
        self.assertEqual(len(previous),1) # no mutation of the reviewed source

    def test_existing_overlay_is_not_discarded_and_unrecognised_format_fails_closed(self):
        with tempfile.TemporaryDirectory() as folder:
            output=Path(folder)/"cbse-class9-maths-audited-proposals.js"
            records=[{"chapter_number":1,"chapter_title":"Chapter One","lessons":[]}]
            output.write_text(proposal_module.LOADER_START+
                json.dumps(records)+proposal_module.LOADER_END,encoding="utf-8")
            self.assertEqual(proposal_module.read_existing_proposals(output),records)
            output.write_text("window.unrecognisedOverlay=true;",encoding="utf-8")
            with self.assertRaisesRegex(ValueError,"refusing to overwrite"):
                proposal_module.read_existing_proposals(output)

    def test_multi_chapter_overlay_enriches_without_duplicate_topics(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder)
            end_marker='<script defer src="cbse-class9-maths-depth-ch14.js"></script>'
            (root/"index.html").write_text("<html>"+end_marker+"</html>",encoding="utf-8")
            def lesson(section,title,merge_into=None):
                result={"section":section,"title":title,"paragraphs":["Explainer one","Explainer two"],
                        "formulas":["x+1"],"examples":[{"title":title+" example",
                        "question":"Find x.","steps":["Check."],"answer":"2"}],
                        "evidence":[{"concept":title,"page":1,"quote":"Evidence"}]}
                if merge_into:
                    result["merge_into"]=merge_into
                return result
            first=[{"chapter_number":1,"chapter_title":"Chapter One","lessons":[
                lesson("Coordinates","Distances","Ordered pairs"),
                lesson("Midpoints","Recover triangle")]}]
            second=[{"chapter_number":2,"chapter_title":"Chapter Two","lessons":[
                lesson("Graphs","Slope","Line graphs")]}]
            candidate=root/"candidate.json"
            command=["python3",str(HERE/"apply-proposals.py"),
                    "--site",str(root),"--candidates",str(candidate)]
            candidate.write_text(json.dumps(first),encoding="utf-8")
            subprocess.run(command,check=True,capture_output=True)
            candidate.write_text(json.dumps(second),encoding="utf-8")
            subprocess.run(command,check=True,capture_output=True)
            overlay=root/"cbse-class9-maths-audited-proposals.js"
            combined=proposal_module.read_existing_proposals(overlay)
            self.assertEqual(len(combined),2)
            contents=overlay.read_text(encoding="utf-8")
            subprocess.run(command,check=True,capture_output=True)
            self.assertEqual(overlay.read_text(encoding="utf-8"),contents)
            fixture={"CBSE_CLASS9_MATH_FULL_NOTES":{
              "Chapter One":{"sections":[
                {"title":"Coordinates","subtopics":[{"title":"Ordered pairs",
                 "paragraphs":["Original"],"examples":[],"formulas":[]}]},
                {"title":"Midpoints","subtopics":[]}]},
              "Chapter Two":{"sections":[{"title":"Graphs","subtopics":[
                {"title":"Line graphs","paragraphs":["Original"],"examples":[],"formulas":[]}]}]}
            }}
            script=("global.window="+json.dumps(fixture)+";"
                "const fs=require('fs'),vm=require('vm');"
                "const code=fs.readFileSync(process.argv[1],'utf8');"
                "vm.runInThisContext(code);vm.runInThisContext(code);"
                "const bank=window.CBSE_CLASS9_MATH_FULL_NOTES;"
                "if(bank['Chapter One'].sections[0].subtopics.length!==1)process.exit(2);"
                "if(bank['Chapter One'].sections[1].subtopics.length!==1)process.exit(3);"
                "if(bank['Chapter Two'].sections[0].subtopics.length!==1)process.exit(4);"
                "if(bank['Chapter Two'].sections[0].subtopics[0].examples.length!==1)process.exit(5);")
            subprocess.run(["node","-e",script,str(overlay)],check=True,capture_output=True)

    def test_loader_generation_is_deterministic_and_can_run_twice(self):
        END_MARKER='<script defer src="cbse-class9-maths-depth-ch14.js"></script>'
        LOAD_MARKER='<script defer src="cbse-class9-maths-audited-proposals.js"></script>'
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
