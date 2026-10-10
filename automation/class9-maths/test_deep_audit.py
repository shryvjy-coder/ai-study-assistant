#!/usr/bin/env python3
"""API-free contract and adversarial regression tests for NCERT Deep Audit."""
import copy
from pathlib import Path
import unittest

from deep_audit import (
    valid_coverage, reconcile_coverage, validate_math_review,
    check_numeric_equalities, review_chapter
)
from pipeline import normal, validate, generate_with_transient_retries


def sample_chapter():
    return {
        "number": 4, "title": "Exploring Algebraic Identities",
        "sections": [{"title": "Square identities", "subtopics": [
            {"title": "Area proof", "paragraphs": ["Use areas to derive the identity."],
             "examples": [], "formulas": ["(a+b)^2=a^2+2ab+b^2"]}
        ]}]
    }


def sample_pages():
    result = ["The algebraic chapter contains original textbook explanations."] * 12
    result[0] = "An algebraic identity describes an equality that is always true."
    result[2] = "An area model may illustrate the square of a sum."
    result[3] = "The two rectangles each have an area given by ab."
    result[5] = "We can expand expressions by the distributive law."
    result[9] = "Some products are easier using a special algebraic identity."
    result[11] = "We should verify numerical answers after factorisation."
    return result


def inventory():
    pages = sample_pages()
    return {
        "chapter_number": 4,
        "summary": "Review of all parts of the chapter",
        "coverage": [
            {"concept": concept, "page": idx + 1, "quote": pages[idx],
             "status": "partial" if i == 0 else "covered",
             "existing_section": "Square identities",
             "existing_subtopic": "Area proof",
             "rationale": "Gap in the specific worked example" if i == 0 else "Explained"}
            for i, (concept, idx) in enumerate([
                ("Prove the area relation", 0),
                ("Rectangles and area", 2),
                ("Using two rectangles", 3),
                ("Distributive expansion", 5),
                ("Products and identities", 9),
                ("Check a final answer", 11)
            ])
        ]
    }


def challenge(decision="partial"):
    return {"chapter_number": 4, "decisions": [
        {"id": i, "verdict": decision if i == 0 else "covered",
         "reason": "The existing lesson needs an extra worked example",
         "existing_section": "Square identities",
         "existing_subtopic": "Area proof"}
        for i in range(6)
    ]}


def draft():
    return {"chapter_number": 4, "proposals": [
        {"section": "Square identities", "title": "A verified area-model extension",
         "merge_into": "Area proof",
         "paragraphs": [
             "An algebraic identity remains true for every substitution. "
             "Divide the larger square into two smaller squares and rectangles, "
             "then add their areas to see why the middle term appears twice.",
             "Expanding the product on both sides using distributivity checks "
             "the geometric argument. Substituting values may detect a mistake, "
             "but a single numerical example cannot prove an identity."
         ],
         "formulas": ["(a+b)^2=a^2+2ab+b^2"],
         "examples": [{
             "title": "Check an area calculation",
             "question": "Check the product of three and four.",
             "steps": ["Set the side lengths to 3 units and 4 units.",
                       "The rectangle contains 3*4=12 square units.",
                       "The numerical equality confirms this example, not a general identity."],
             "answer": "12 square units"
         }], "evidence_ids": [0]}
    ]}


def closure(reviewed=True, critical=False):
    return {"chapter_number": 4, "decisions": [
        {"id": i, "verdict": "addressed" if i == 0 and reviewed else
            "unresolved" if i == 0 else "covered",
         "reason": "The revised or existing lessons were checked against the full textbook."}
        for i in range(6)
    ], "missed_areas": [],
       "critical_errors": (["This proposed proof contains an independently detected serious error."]
                           if critical else [])}


def math_review(verdict="pass"):
    return {"chapter_number": 4, "decisions": [
        {"id": 0, "verdict": verdict,
         "reason": "I independently recalculated 3 multiplied by 4 as twelve, "
                   "and the area formula is dimensionally consistent."}
    ]}


class DeepAuditTests(unittest.TestCase):
    def reviewer(self, reviewer_verdict="partial", math_verdict="pass"):
        requested = []
        def ask(stage, prompt):
            requested.append(stage)
            self.assertIn("Exploring Algebraic Identities", prompt)
            if stage == "coverage":
                return inventory()
            if stage == "challenge":
                return challenge(reviewer_verdict)
            if stage == "draft":
                return draft()
            if stage == "math":
                return math_review(math_verdict)
            if stage == "closure":
                return closure(reviewer_verdict=="partial" and math_verdict=="pass")
            self.fail("Unexpected request stage: " + stage)
        return ask, requested

    def test_deep_review_four_model_stages_then_local_fifth(self):
        ask, stages = self.reviewer()
        report = review_chapter(Path("fake.pdf"), sample_chapter(),
                                sample_chapter(), sample_pages(), "mock-model",
                                request=ask, normal=normal, validate=validate,
                                retry=generate_with_transient_retries)
        self.assertEqual(stages, ["coverage", "challenge", "draft", "math", "closure"])
        self.assertEqual(report["depth"], "deep")
        self.assertEqual(len(report["coverage"]), 6)
        self.assertEqual(len(report["verified_gaps"]), 1)
        self.assertEqual(len(report["candidate_lessons"]), 1)
        self.assertEqual(report["candidate_lessons"][0]["merge_into"], "Area proof")
        self.assertGreaterEqual(report["qa"]["exact_numeric_equalities_checked"], 1)

    def test_second_pass_blocks_duplicate_claims(self):
        ask, stages = self.reviewer(reviewer_verdict="covered")
        report = review_chapter(Path("fake.pdf"), sample_chapter(),
                                sample_chapter(), sample_pages(), "mock",
                                request=ask, normal=normal, validate=validate,
                                retry=generate_with_transient_retries)
        self.assertEqual(stages, ["coverage", "challenge", "closure"])
        self.assertFalse(report["candidate_lessons"])
        self.assertTrue(any("Disputed" in issue for issue in report["rejected_claims"]))

    def test_math_rejection_does_not_enter_candidate_overlay(self):
        ask, stages = self.reviewer(math_verdict="reject")
        report = review_chapter(Path("fake.pdf"), sample_chapter(),
                                sample_chapter(), sample_pages(), "mock",
                                request=ask, normal=normal, validate=validate,
                                retry=generate_with_transient_retries)
        self.assertEqual(stages, ["coverage", "challenge", "draft", "math"])
        self.assertEqual(report["candidate_lessons"], [])
        self.assertEqual(report["math_decisions"][0]["verdict"], "reject")

    def test_false_source_quotes_never_pass_inventory(self):
        data = inventory()
        for item in data["coverage"]:
            item["quote"] = "The official textbook says something completely fictional."
        with self.assertRaisesRegex(ValueError, "too sparse"):
            valid_coverage(data, sample_chapter(), sample_pages(), normal)

    def test_challenge_must_review_all_ids_exactly_once(self):
        data, _ = valid_coverage(inventory(), sample_chapter(), sample_pages(), normal)
        d = challenge()
        d["decisions"][-1]["id"] = 0
        with self.assertRaisesRegex(ValueError, "omitted or duplicated"):
            reconcile_coverage(d, sample_chapter(), data, sample_chapter())

    def test_math_verdict_must_have_substantive_reason(self):
        d = math_review()
        d["decisions"][0]["reason"] = "ok"
        with self.assertRaisesRegex(ValueError, "substantive reason"):
            validate_math_review(d, sample_chapter(), draft()["proposals"])

    def test_final_coverage_cannot_claim_unlinked_gap_is_addressed(self):
        from deep_audit import validate_final_coverage
        items, _ = valid_coverage(inventory(), sample_chapter(), sample_pages(), normal)
        rows, flags, critical = validate_final_coverage(
            closure(reviewed=True), sample_chapter(), items, [], normal)
        self.assertEqual(rows[0]["verdict"], "unresolved")
        self.assertTrue(any("Unsubstantiated" in msg for msg in flags))
        self.assertEqual(critical, [])

    def test_critical_final_objection_withholds_all_draft_material(self):
        calls = []
        def ask(stage, prompt):
            calls.append(stage)
            return {"coverage": inventory, "challenge": challenge, "draft": draft,
                    "math": math_review, "closure": lambda: closure(True, True)}[stage]()
        report = review_chapter(Path("fake.pdf"), sample_chapter(),
                                sample_chapter(), sample_pages(), "mock",
                                request=ask, normal=normal, validate=validate,
                                retry=generate_with_transient_retries)
        self.assertFalse(report["candidate_lessons"])
        self.assertTrue(any("Critical" in item for item in report["rejected_claims"]))
        self.assertEqual(calls[-1], "closure")

    def test_numeric_checker_rejects_false_and_accepts_exact_fractions(self):
        c = draft()["proposals"]
        c[0]["examples"][0]["steps"] = [
            "A complete equality is 4*13/15=52/15.",
            "The computation is 3*4=12 and is valid."
        ]
        checked, errors = check_numeric_equalities(c)
        self.assertGreaterEqual(checked, 2)
        self.assertFalse(errors)
        c[0]["examples"][0]["steps"].append("This false statement 3*4=13 is incorrect.")
        checked, errors = check_numeric_equalities(c)
        self.assertTrue(any("3*4" in err for err in errors))


if __name__ == "__main__":
    unittest.main()
