# Log

**Time:** Human ~TBD h · AI ~TBD h (filled in at the end; PR timestamps in the repo are the record)

**First instruction:** Read the case study, explain what it asks for, and propose a plan to work through it carefully.

## What the AI got wrong
| # | What it got wrong | How I caught it | Fixed instruction or output? |
|---|---|---|---|
| 1 | Applied its own proposed rule change (dates on open questions) to the recap and to its working rules before anyone had approved it. | I noticed the dates in the recap and asked whether a proposal needs approval first. | Both: removed it from the output and added a "proposals aren't applied until approved" rule. |
| 2 | Recommended dropping "19 posts" from the recap without checking the earlier recaps, which include similar counts. | I asked whether posts would usually be included, and why. | Instruction: every judgement call must now show its evidence and options. |
