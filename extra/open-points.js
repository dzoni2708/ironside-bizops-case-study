#!/usr/bin/env node
// Open points: lists every action item and open question in the brain's recaps,
// per account, with what is overdue, what is due soon, and how long questions have been open.
// Usage: node extra/open-points.js [--today YYYY-MM-DD] [--brain path/to/brain]

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const today = arg("--today", new Date().toISOString().slice(0, 10));
const brain = arg("--brain", path.join(__dirname, "..", "brain"));
const meetingsDir = path.join(brain, "knowledge", "meetings");
const DAY = 24 * 60 * 60 * 1000;
const days = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / DAY);

if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  console.error(`--today must be YYYY-MM-DD, got "${today}"`);
  process.exit(1);
}

// Split a recap into its "## " sections, keyed by heading.
function sections(text) {
  const out = {};
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) { current = h[1].toLowerCase(); out[current] = []; continue; }
    if (current) out[current].push(line);
  }
  return out;
}

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (m) for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

const accounts = {};
const files = fs.readdirSync(meetingsDir).filter(f => f.endsWith(".md")).sort();

for (const file of files) {
  const text = fs.readFileSync(path.join(meetingsDir, file), "utf8");
  const fm = frontmatter(text);
  if (fm.type !== "meeting" || !fm.account || !fm.date) continue;
  if (fm.date > today) continue; // meetings after "today" haven't happened yet
  const acc = (accounts[fm.account] ||= { actions: [], questions: [] });
  const sec = sections(text);

  for (const line of sec["action items"] || []) {
    const cells = line.split("|").map(c => c.trim()).filter((c, i, a) => i > 0 && i < a.length - 1);
    if (cells.length < 3 || /^-+$/.test(cells[0]) || cells[0].toLowerCase() === "owner") continue;
    const [owner, action, due] = cells;
    acc.actions.push({ owner, action, due, source: file, meeting: fm.date });
  }

  for (const line of sec["open questions"] || []) {
    const b = line.match(/^\s*-\s+(.+)$/);
    if (!b || /^none\.?$/i.test(b[1])) continue;
    const q = b[1].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // keep link text, drop URLs
    acc.questions.push({ question: q, raised: fm.date, source: file });
  }
}

const out = [`# Open points as of ${today}`, ""];
for (const [account, { actions, questions }] of Object.entries(accounts).sort()) {
  const dated = actions.filter(a => /^\d{4}-\d{2}-\d{2}$/.test(a.due));
  const overdue = dated.filter(a => a.due < today).sort((a, b) => a.due.localeCompare(b.due));
  const soon = dated.filter(a => a.due >= today && days(today, a.due) <= 7).sort((a, b) => a.due.localeCompare(b.due));
  if (!overdue.length && !soon.length && !questions.length) continue;

  out.push(`## ${account}`, "");
  if (overdue.length) {
    out.push("**Past due: confirm done or chase**", "", "| Owner | Action | Due | Days late | From |", "|---|---|---|---|---|");
    for (const a of overdue) out.push(`| ${a.owner} | ${a.action} | ${a.due} | ${days(a.due, today)} | ${a.source} |`);
    out.push("");
  }
  if (soon.length) {
    out.push("**Due in the next 7 days**", "", "| Owner | Action | Due | From |", "|---|---|---|---|");
    for (const a of soon) out.push(`| ${a.owner} | ${a.action} | ${a.due} | ${a.source} |`);
    out.push("");
  }
  if (questions.length) {
    out.push("**Open questions**", "", "| Days open | Question | From |", "|---|---|---|");
    for (const q of questions.sort((a, b) => a.raised.localeCompare(b.raised)))
      out.push(`| ${days(q.raised, today)} | ${q.question} | ${q.source} |`);
    out.push("");
  }
}
if (out.length === 2) out.push("Nothing open.");
console.log(out.join("\n"));
