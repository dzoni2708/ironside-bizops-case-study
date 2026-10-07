# Log

**Time:** Human ~4 h · AI ~4 h (Claude Code worked alongside me throughout; PR timestamps in the repo are the record)

**First instruction:** Read the case study, explain what it asks for, and propose a plan to work through it carefully.

## What the AI got wrong
| # | What it got wrong | How I caught it | Fixed instruction or output? |
|---|---|---|---|
| 1 | Recommended dropping "19 posts" from the recap without checking the earlier recaps, which include similar counts. | I asked whether posts would usually be included, and why. | Instruction: every judgement call must now show its evidence and options. |
| 2 | Put "samples only after a creator accepts the targeted plan" and "the targeted plan is for the top 10" side by side in the A3 briefing without seeing that they contradict each other for a 60-affiliate goal. | I asked it to step back and re-check Block A against the brief. | Both: added the contradiction to A3, and a new audit check that each step of an end-to-end flow is consistent with the others. |
| 3 | Drafted a C3 ticket item calling two recorded calls with no recap a "missed runs" reliability bug, when they were the two inbox calls the case left unprocessed for Block A. | I asked whether those were the two calls we recapped in Block A. | Output: dropped the item from the ticket. |
