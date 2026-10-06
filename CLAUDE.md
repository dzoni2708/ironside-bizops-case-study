# Working rules: Ironside Biz Ops case study

The brief is `INSTRUCTIONS.md`. The brain's rules live in `brain/RESOLVER.md` and `brain/SANITIZER.md`. They are the source of truth: re-read them before any write to `brain/`. If this file and they ever disagree, they win.

## Hard rules (summary; see the source files)
1. **SANITIZER, always.** Never write: opinions about people, anything said privately (DMs, side comments, chat after the client drops off), commercial terms (our fees, margins, rates), personal data, raw transcripts.
2. **Performance numbers** (GMV, ad spend, active affiliates, retention) live only in `brain/knowledge/reference/accounts-sheet.csv`. Pages link to the sheet, never retype the number. If a call states a different number, flag it in "Flags for a person". Do not edit the sheet.
3. **Decisions are not performance numbers.** Targets, budgets and rates the client agrees to are recorded as said.
4. **People and account pages change by proposal only.** Never edit them directly; proposals go in `proposed-changes.md` for a pod lead to approve.
5. **Every recap = summary + action items.** Every action item has exactly one owner and one due date. Use the template in RESOLVER exactly. File name: `YYYY-MM-DD-brand-slug-meeting-type.md` in `brain/knowledge/meetings/`, matching the existing recaps (RESOLVER's strict pattern has no meeting type; a change is proposed in `proposed-changes.md`).
6. **If it was said before, link the earlier meeting.** Don't present repeated information as new.
7. **Held-back content:** put a neutral note in "Flags for a person" that part of the recording was held back. Don't repeat it or hint at what it was (no "after X left", no "a DM").
8. **"Flags for a person" holds only** conflicts with the sheet and held-back content. Page follow-ups go in `proposed-changes.md`, not in flags.

## Our interpretations (grey areas, decided once)
- Our fee/commission is a commercial term (out). A rate the client sets for its own affiliates is a client decision (in, recorded as said).
- An owner or due date is never invented. If the call names none, the item stays out of the action items table (RESOLVER requires one owner and a date) and goes in Open questions.
- Activity counts that aren't on RESOLVER's performance-number list (posts, videos delivered) may be recorded as said. Earlier recaps do this.
- Each open question ends with *First raised <date>*, linking the first meeting if it came from an earlier one, so slipped items are visible.
- The 4-hour cap in the PDF is stricter than INSTRUCTIONS.md (6h). We work to 4h.

## Full rule audit: run before every response that presents a deliverable
Audit every rule in RESOLVER, SANITIZER and this file line by line against the output, not just a spot check. In particular:
1. Would the person or brand named here be fine reading every line, including the flags?
2. Is every performance number a link to the sheet, not a typed value? Any conflict with the sheet flagged?
3. Did anything come from a DM, side comment or after-call chatter? If so, it is out and flagged neutrally.
4. Template complete: frontmatter, summary 3–6 bullets, every action item has one owner + due date, earlier meetings linked, weekdays turned into verified dates?
5. Does every claim match the source wording (no words put in someone's mouth)?

## Project conventions
- Never modify `inbox/`, `workers/output/`, `brain/knowledge/reference/` or the CSVs. They are inputs.
- Deliverables at repo root: `log.md`, `proposed-changes.md`, `answer.md`, `plan.md`, `fde-ticket.md`, `extra/`.
- When the user catches an AI mistake, propose a `log.md` entry (what was wrong, how caught, fixed instruction or output only). **Show the exact log text to the user and get approval before writing it.**
- **Review format for every deliverable:** first the rule-based decisions (each citing its rule), then underneath the judgement calls. Each judgement call gives full context: the exact source line(s) and rule text, the options and what each leads to, and a recommendation.
- **Every write goes through a pull request.** Branch from `main` per step (e.g. `a1-call-1-recap`), commit, push, `gh pr create`. Never commit to `main` directly. PR timestamps are our record of time spent.
- **C2 isolation:** the fresh-session rerun must see only the skill, `brain/` and the transcript. Run it from a scratch copy with no CLAUDE.md.
