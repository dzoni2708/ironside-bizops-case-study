# Log

**Time:** Human ~TBD h · AI ~TBD h (filled in at the end; PR timestamps in the repo are the record)

**First instruction:** Read the case study, explain what it asks for, and propose a plan to work through it carefully.

## What the AI got wrong
| # | What it got wrong | How I caught it | Fixed instruction or output? |
|---|---|---|---|
| 1 | Said the A1 recap followed the brain's rules after only a quick 4-question check. A full audit found two breaches: an action item with no owner, and a flag that hinted at a private DM. | I asked whether it had checked every rule. | Instruction: a full rule-by-rule audit now runs before every deliverable. |
| 2 | Recommended dropping "19 posts" from the recap without checking the earlier recaps, which include similar counts. | I asked whether posts would usually be included, and why. | Instruction: every judgement call must now show its evidence and options. |
