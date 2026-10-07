**What:** a gate to run before a recap is posted: it checks the template and the brain's red flags, flags recap lines that repeat what was said after the client left the call, and fails the recap if a number said on the call conflicts with the reference sheet and the recap doesn't flag it.
**Why I picked it:** checking recaps against RESOLVER and SANITIZER took most of my time on Block A, and it is a working first version of the two engineering asks in my ticket.
**Run:** `node extra/recap-gate.js workers/output/bad-recap.md workers/output/after-recap.md --transcript workers/output/bad-recap-source.md` (Node 18+, no installs; with no files it checks every recap in the brain). The full report is written to `extra/recap-gate-report.md`.
**Limit:** it can't judge meaning (wording, contradictions between recaps), so a person still reads for that.
**Next:** run it automatically before the agent or an account manager posts, and block the post on a fail.
