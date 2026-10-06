# Proposed changes

Proposed edits only, from the [24 Sep monthly business review](brain/knowledge/meetings/2026-09-24-kettle-and-crumb.md). None of these pages have been changed. Page edits wait for the South pod lead to approve; the sheet edit waits for the sheet's owner.

## P1. `people/dana-reyes.md`
- **Role:** "Head of Growth" → "VP Growth, Kettle & Crumb (client)".
- **Add:** "Attends: monthly business reviews. Jess Park joins the weeklies (from 24 Sep)."
- **What she has told us, add:** "2026-09-24: promotion, GMV figure from finance, October goals. [recap](../meetings/2026-09-24-kettle-and-crumb.md)"
- **Open threads:** remove "sample shipping budget (asked twice, not yet answered)". Closed on 24 Sep by Jess Park.
- **updated:** 2026-09-24.

## P2. New page `people/jess-park.md`
```
---
type: person
updated: 2026-09-24
---

# Jess Park

- **Role:** ops and fulfillment, Kettle & Crumb (client)
- **Owns on their side:** samples, inventory, sample shipping budget
- **Works with:** Marcus Obi (AM, South pod)
- **Attends:** weekly calls (from 24 Sep)
- **What she has told us:**
  - 2026-09-24: sample shipping budget settled. [recap](../meetings/2026-09-24-kettle-and-crumb.md)
```

## P3. `accounts/kettle-and-crumb.md`
- **Client contact:** "Dana Reyes, Head of Growth" → "Dana Reyes, VP Growth (monthly reviews); Jess Park, ops and fulfillment (samples, inventory; weeklies)".
- **Current focus, add:** "Fall flavor launch 6 Oct; goal to double the posting rate on it after launch."
- **Meetings, add:** "[2026-09-24 monthly business review](../meetings/2026-09-24-kettle-and-crumb.md)"
- **updated:** 2026-09-24.

## P4. `reference/accounts-sheet.csv`: GMV
- **Status: on hold.** Blocked by the open GMV scope question in the [24 Sep recap](brain/knowledge/meetings/2026-09-24-kettle-and-crumb.md). Approve only after it is answered.

| Field | Sheet now | Stated on call |
|---|---|---|
| `gmv_last_30d_usd` | 140,000 (updated 21 Sep) | 210,000 (Dana, 24 Sep, "the number our finance team sent") |

- **Proposed new value:** 210,000, with `sheet_updated` 2026-09-24, once the figure is confirmed to match the sheet's scope (TikTok Shop only, same 30-day basis).
- **Why hold:** Kettle & Crumb sells on TikTok Shop and DTC. Marcus asked whether the figure was TikTok Shop only, and it wasn't confirmed. A 50% rise when the window moves by three days points to a different scope, not growth.
- **Where to fix:** `reference/` holds source-of-truth exports ("consult, don't edit"), so the change belongs in the system the sheet is exported from, not in the CSV.
