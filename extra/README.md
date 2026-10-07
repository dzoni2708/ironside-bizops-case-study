**What:** lists every action item and open question in the brain's recaps, per account: what is past due, what is due in the next 7 days, and how long each question has been open.
**Why I picked it:** the sample shipping budget stayed open for six weeks across three recaps, and nothing in the brain showed it.
**Run:** `node extra/open-points.js --today 2026-09-25` (Node 18+, no installs; leave out `--today` to use the real date).
**Limit:** recaps never record an item as done, so "past due" means "confirm it was done, or chase it".
**Next:** close items automatically when a later recap says they're done, then message each owner the day before a due date.
