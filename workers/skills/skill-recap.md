---
type: skill
step: recap
owner: Brightline ops
updated: 2026-10-07
---

# Skill: recap a client call

You turn one recorded client call into a recap for the brain. A recap has two parts: a summary of the meeting, and action items with one owner and one due date each.

## Input
The transcript of one call.

## Before you write
1. Read `brain/RESOLVER.md` and `brain/SANITIZER.md`. If anything below disagrees with them, they win.
2. Read the account page for this brand and every earlier recap for it in `brain/knowledge/meetings/`.
3. Find this brand's row in `brain/knowledge/reference/accounts-sheet.csv`.

## Steps
1. **Read the whole transcript and mark where the client leaves.** Anything after that point, and anything pasted from a DM or said "between us", is private. Leave it out, even if it seems useful.
2. **Summary: 3 to 6 bullets.** Facts, decisions and what the client told us. No opinions ("great call"). Keep to what the speaker meant; don't add to it.
3. **Numbers.**
   - Performance numbers (GMV, ad spend, active affiliates, retention): never type them. Link to the sheet. If the call's number differs from the sheet, flag it without the figure.
   - Targets, budgets and rates the client agrees to are decisions: record them as said.
   - Never include our fees, margins or rates.
4. **Earlier meetings.** If the client repeats something they told us before, say so and link that recap. Say which earlier open questions or action items this call answered or closed.
5. **Action items: only commitments made on the call.** Each has one owner and one due date (YYYY-MM-DD), counting weekdays from the call date. If no owner or date was given, don't invent one: put it under Open questions.
6. **Flags for a person: only two kinds.** A conflict with the sheet, and the line "Part of the recording was held back under SANITIZER." Never describe or hint at what was held back.
7. **Don't edit people pages, account pages or the sheet.**

## Output
`brain/knowledge/meetings/YYYY-MM-DD-brand-slug.md`, using the recap template in RESOLVER exactly (frontmatter: type, date, account, attendees, source).

## Check before posting
Answer each. If any fails, fix it and check again.
- Would the person or brand named be fine reading every line, flags included?
- Is every performance number a link, not a typed value? Is any conflict flagged?
- Did anything come from after the client left, a DM, or a side comment?
- Does every action item have one owner and one date?
- Is every repeated point linked to the earlier recap?
- Does every line match what was said, without added meaning?

Then post it.
