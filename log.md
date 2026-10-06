# Log

**Time:** Human ~TBD h · AI ~TBD h (filled in at the end; PR timestamps in the repo are the record)

**First instruction:** Read the case study, explain what it asks for, and propose a plan to work through it carefully.

## What the AI got wrong
| # | What it got wrong | How I caught it | Fixed instruction or output? |
|---|---|---|---|
| 1 | Applied its own proposed rule change (dates on open questions) to the recap and to its working rules before anyone had approved it. | I noticed the dates in the recap and asked whether a proposal needs approval first. | Both: removed it from the output and added a "proposals aren't applied until approved" rule. |
| 2 | Recommended dropping "19 posts" from the recap without checking the earlier recaps, which include similar counts. | I asked whether posts would usually be included, and why. | Instruction: every judgement call must now show its evidence and options. |
| 3 | Put "samples only after a creator accepts the targeted plan" and "the targeted plan is for the top 10" side by side in the A3 briefing without seeing that they contradict each other for a 60-affiliate goal. | I asked it to mark Block A as a grader would, zooming out from the rules. | Both: added the contradiction to A3, and a new audit check that each step of an end-to-end flow is consistent with the others. |
