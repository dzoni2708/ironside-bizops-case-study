# Proposed changes

Nothing here has been applied. Each item waits for a pod lead (pages) or Brightline ops (rules) to approve.

## Changes to brain rules (`brain/RESOLVER.md`)

### R1. Add the meeting type to recap file names
- **Now:** `YYYY-MM-DD-brand-slug.md`.
- **Proposed:** `YYYY-MM-DD-brand-slug-meeting-type.md`, e.g. `2026-09-22-kettle-and-crumb-weekly.md`.
- **Why:**
  - Two meetings with the same brand on the same day would get the same file name, and the second recap would overwrite the first.
  - All four existing recaps already add a type (`-weekly`, `-affiliates-kickoff`, `-affiliates-deep-dive`) and so don't match the current rule. Either the rule changes or those files are renamed; this proposal changes the rule.
  - New recaps follow the current rule until this is approved.

### R2. Open questions carry their age
- **Now:** the template's "Open questions" section has no format.
- **Proposed:** each open question ends with *First raised <date>*, linking the earlier recap if it started there. A question that has passed a due date says so.
- **Why:** the sample shipping budget was raised on 12 Aug, raised again on 3 Sep with an answer due 10 Sep, and came up a third time on 22 Sep. No page showed that it had slipped. With dates on every open question, slipped items are visible to anyone reading the latest recap.
