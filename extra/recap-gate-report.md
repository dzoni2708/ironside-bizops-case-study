# Recap gate report

1 of 2 recaps pass · run 2026-10-07 01:55 UTC

| Recap | Result | Problems |
|---|---|---|
| workers/output/bad-recap.md | ❌ FAIL | 11 |
| workers/output/after-recap.md | ✅ PASS | 0 |

## ❌ workers/output/bad-recap.md

| Where | Problem |
|---|---|
| whole file | missing section "## Summary" |
| whole file | missing section "## Action items" |
| whole file | missing section "## Open questions" |
| whole file | missing section "## Flags for a person" |
| whole file | GMV: call says 95,000, sheet says 62,000 (updated 2026-09-21), and the recap doesn't flag the conflict |
| line 1 | frontmatter missing "attendees" |
| line 1 | frontmatter missing "source" |
| line 9 | performance figure typed in; link to the sheet instead (RESOLVER 5) |
| line 9 | commercial terms (SANITIZER 3): "fees" |
| line 9 | opinion or feelings about people (SANITIZER 1): "Great call" |
| line 9 | repeats what was said after the client left: frustrated, agency, fees, might, review |

- transcript: workers/output/bad-recap-source.md
- client exit: 00:42 [Theo Grant left the call] (2 lines after it were checked)

## ✅ workers/output/after-recap.md

No problems found.

- transcript: workers/output/bad-recap-source.md
- client exit: 00:42 [Theo Grant left the call] (2 lines after it were checked)
- GMV: call says 95,000, sheet says 62,000 (updated 2026-09-21); conflict is flagged
