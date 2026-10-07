#!/usr/bin/env node
// Recap gate: checks a recap before it is posted.
//  1. Template and SANITIZER red flags (sections, frontmatter, owners, dates, typed figures, private/fee/opinion words, links).
//  2. With the call transcript: flags recap lines that repeat what was said after the last client left the call.
//  3. With the call transcript: compares performance numbers said on the call with the reference sheet,
//     and fails the recap if a conflict is not flagged.
// Usage: node extra/recap-gate.js [recap.md ...] [--transcript call.md]
// With no recaps, it checks every recap in brain/knowledge/meetings/. The transcript comes from --transcript,
// or else from the recap's "source:" field. Works from any folder. It cannot judge meaning; a person still reads for that.
// Every run prints a one-line result per recap and writes the full report to extra/recap-gate-report.md.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const meetingsDir = path.join(root, "brain", "knowledge", "meetings");
const sheetFile = path.join(root, "brain", "knowledge", "reference", "accounts-sheet.csv");
const resolve = f => (fs.existsSync(f) ? f : path.join(root, f));

// ---- arguments ----
const argv = process.argv.slice(2);
let transcriptArg = null;
const ti = argv.indexOf("--transcript");
if (ti >= 0) { transcriptArg = resolve(argv[ti + 1] || ""); argv.splice(ti, 2); }
let files = argv.length ? argv.map(resolve) : fs.readdirSync(meetingsDir).filter(f => f.endsWith(".md")).map(f => path.join(meetingsDir, f));
const missing = files.filter(f => !fs.existsSync(f)).concat(transcriptArg && !fs.existsSync(transcriptArg) ? [transcriptArg] : []);
if (missing.length) { console.error(`File not found: ${missing.join(", ")}`); process.exit(1); }

// ---- shared helpers ----
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (m) for (const l of m[1].split(/\r?\n/)) { const kv = l.match(/^(\w+):\s*(.*)$/); if (kv) fm[kv[1]] = kv[2].trim(); }
  return { fm, block: m ? m[0] : null };
}

const sheet = {};
{
  const [head, ...rows] = fs.readFileSync(sheetFile, "utf8").trim().split(/\r?\n/);
  const cols = head.split(",");
  for (const r of rows) { const v = r.split(","); sheet[v[0]] = Object.fromEntries(cols.map((c, i) => [c, v[i]])); }
}

const SMALL = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
// Every number in a sentence, written ("140,000", "$95K") or spoken ("two hundred ten thousand").
function numbersIn(sentence) {
  const out = [];
  for (const m of sentence.matchAll(/\$?(\d[\d,]*(?:\.\d+)?)\s*(k|K|thousand|million)?\b/g)) {
    let n = parseFloat(m[1].replace(/,/g, ""));
    if (/k|thousand/i.test(m[2] || "")) n *= 1000;
    if (/million/i.test(m[2] || "")) n *= 1e6;
    out.push(n);
  }
  let total = 0, current = 0, inNumber = false;
  const flush = () => { if (inNumber) out.push(total + current); total = 0; current = 0; inNumber = false; };
  for (const raw of sentence.toLowerCase().split(/[^a-z]+/)) {
    if (raw in SMALL) { current += SMALL[raw]; inNumber = true; }
    else if (raw === "hundred" && inNumber) current *= 100;
    else if (raw === "thousand" && inNumber) { total += current * 1000; current = 0; }
    else if (raw === "million" && inNumber) { total += current * 1e6; current = 0; }
    else if (raw === "and" && inNumber) continue;
    else flush();
  }
  flush();
  return out;
}

const STOP = new Set("about after again also back been before being both call could does doesn dont down each even from have here into just know last like look make more most much need next only other over plan really said same should some such than that their them then there these they this those thing think time very want were what when where which while will with would yeah your okay right good great thanks".split(" "));
const words = text => new Set((text.toLowerCase().match(/[a-z][a-z']{3,}/g) || []).map(w => w.replace(/'s$/, "")).filter(w => !STOP.has(w)));

// Read a transcript: who the clients are, what was said while they were on the call, and what was said after.
function readTranscript(file) {
  const text = fs.readFileSync(file, "utf8");
  const { fm, block } = frontmatter(text);
  const people = [...(fm.attendees || "").matchAll(/([^,[\]]+?)\s*\(([^)]+)\)/g)].map(m => ({ name: m[1].trim(), org: m[2].trim() }));
  const clients = new Set(people.filter(p => !/brightline/i.test(p.org)).map(p => p.name));
  const lines = text.slice(block ? block.length : 0).split(/\r?\n/).filter(l => l.trim());
  let exit = lines.length;
  const present = new Set(clients);
  lines.forEach((l, i) => {
    const left = l.match(/\[(.+?) left the call\]/);
    if (left && present.delete(left[1].trim()) && present.size === 0 && exit === lines.length) exit = i;
  });
  const said = l => l.replace(/^\d{1,2}:\d{2}\s+[^:]+:\s*/, "").replace(/^\[.*\]$/, "");
  return {
    clients: [...clients],
    exitLine: exit < lines.length ? lines[exit] : null,
    during: lines.slice(0, exit).map(said),
    after: lines.slice(exit + 1).map(said).filter(Boolean),
  };
}

const RED_FLAGS = [
  [/\bDMs?\b|\bdirect message|between us|in private|privately/i, "private content (SANITIZER 2)"],
  [/\bfees?\b|\bmargins?\b|\bretainer\b|our rate/i, "commercial terms (SANITIZER 3)"],
  [/\bflaky\b|\bdifficult\b|checked out|\blazy\b|\bannoying\b|great call|\bfrustrated\b/i, "opinion or feelings about people (SANITIZER 1)"],
  [/\bphone number|home address|\bhealth\b|\bpregnan|\bdivorce/i, "personal data (SANITIZER 4)"],
];
const PERF = /\b(GMV|ad spend|retention|active affiliates?)\b/i;
const FIGURE = /\$\s?\d|\b\d[\d,.]*\s?(k|K|thousand|million|%)(?![a-z])/;
const METRICS = [
  [/\bgmv\b/i, "gmv_last_30d_usd", "GMV"],
  [/\bad spend\b/i, "ad_spend_last_30d_usd", "ad spend"],
  [/\bactive affiliates?\b/i, "active_affiliates", "active affiliates"],
];

// ---- check each recap ----
let failedFiles = 0;
const results = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const { fm, block } = frontmatter(text);
  const fmLines = block ? block.split(/\r?\n/).length : 0;
  const problems = [], notes = [];
  const add = (line, msg) => problems.push({ line, msg });
  const note = msg => notes.push(msg);

  // 1. Template and red flags
  if (!block) add(1, "no frontmatter");
  for (const key of ["type", "date", "account", "attendees", "source"]) if (block && !fm[key]) add(1, `frontmatter missing "${key}"`);
  if (fm.date && fm.account && path.resolve(file).startsWith(meetingsDir) && path.basename(file) !== `${fm.date}-${fm.account}.md`)
    note(`warning: file name should be ${fm.date}-${fm.account}.md (RESOLVER)`);

  const sectionStart = {};
  lines.forEach((l, i) => { const h = l.match(/^##\s+(.+?)\s*$/); if (h) sectionStart[h[1]] = i; });
  for (const s of ["Summary", "Action items", "Open questions", "Flags for a person"]) if (!(s in sectionStart)) add(0, `missing section "## ${s}"`);
  const body = name => {
    if (!(name in sectionStart)) return [];
    const start = sectionStart[name] + 1;
    const next = Object.values(sectionStart).filter(i => i > sectionStart[name]).sort((a, b) => a - b)[0] ?? lines.length;
    return lines.slice(start, next).map((t, k) => ({ t, n: start + k + 1 }));
  };

  const bullets = body("Summary").filter(x => /^\s*-\s+/.test(x.t)).length;
  if ("Summary" in sectionStart && (bullets < 3 || bullets > 6)) add(sectionStart.Summary + 1, `summary has ${bullets} bullets, needs 3 to 6`);

  for (const { t, n } of body("Action items")) {
    if (!t.trim().startsWith("|")) continue;
    const cells = t.split("|").slice(1, -1).map(c => c.trim());
    if (cells.length < 3 || /^-+$/.test(cells[0]) || cells[0].toLowerCase() === "owner") continue;
    const [owner, , due] = cells;
    if (!owner || /not set|tbc|tbd|\?/i.test(owner)) add(n, `action item has no owner: "${owner}"`);
    else if (/,|\/|&|\band\b/.test(owner)) add(n, `action item needs one owner, has "${owner}"`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(due || "")) add(n, `action item needs a YYYY-MM-DD due date, has "${due || ""}"`);
  }

  lines.forEach((l, i) => {
    if (i < fmLines) return;
    if (PERF.test(l) && FIGURE.test(l) && !/\b(target|goal)\b/i.test(l)) add(i + 1, "performance figure typed in; link to the sheet instead (RESOLVER 5)");
    for (const [re, why] of RED_FLAGS) if (re.test(l)) add(i + 1, `${why}: "${l.match(re)[0]}"`);
    for (const m of l.matchAll(/\]\(([^)#]+)\)/g))
      if (!/^https?:/.test(m[1]) && !fs.existsSync(path.join(meetingsDir, m[1]))) add(i + 1, `broken link: ${m[1]}`);
  });

  // 2 and 3. Checks against the transcript
  const tFile = transcriptArg || (fm.source && fs.existsSync(path.join(root, fm.source)) ? path.join(root, fm.source) : null);
  if (!tFile) note("no transcript found, so the client-exit and sheet checks were skipped (use --transcript)");
  else {
    const t = readTranscript(tFile);
    note(`transcript: ${path.relative(root, tFile).split(path.sep).join("/")}`);

    // 2. Content from after the client left
    if (t.exitLine) {
      note(`client exit: ${t.exitLine.trim()} (${t.after.length} lines after it were checked)`);
      const afterOnly = new Set([...words(t.after.join(" "))].filter(w => !words(t.during.join(" ")).has(w)));
      const flagsAt = sectionStart["Flags for a person"] ?? lines.length;
      lines.forEach((l, i) => {
        if (i < fmLines || i > flagsAt) return;
        const hits = [...words(l)].filter(w => afterOnly.has(w));
        if (hits.length >= 3) add(i + 1, `repeats what was said after the client left: ${hits.join(", ")}`);
      });
    }

    // 3. Numbers said on the call vs the reference sheet
    const row = sheet[fm.account];
    const flags = body("Flags for a person").map(x => x.t).join(" ");
    const conflictFlagged = /conflict|differs/i.test(flags) && /sheet/i.test(flags);
    if (row) for (const sentence of t.during.join(" ").split(/(?<=[.!?])\s+/)) {
      if (/\bweek\b/i.test(sentence)) continue; // weekly figures aren't comparable with the sheet's 30-day numbers
      for (const [re, col, label] of METRICS) {
        if (!re.test(sentence)) continue;
        const said = Math.max(...numbersIn(sentence).filter(n => n !== 30), -Infinity);
        if (!isFinite(said)) continue;
        const onSheet = Number(row[col]);
        if (Math.abs(said - onSheet) / onSheet <= 0.05) { note(`${label}: call matches the sheet`); continue; }
        if (conflictFlagged) note(`${label}: call says ${said.toLocaleString("en-US")}, sheet says ${onSheet.toLocaleString("en-US")} (updated ${row.sheet_updated}); conflict is flagged`);
        else add(0, `${label}: call says ${said.toLocaleString("en-US")}, sheet says ${onSheet.toLocaleString("en-US")} (updated ${row.sheet_updated}), and the recap doesn't flag the conflict`);
      }
    }
  }

  const name = path.relative(root, file).replace(/\\/g, "/");
  if (problems.length) failedFiles++;
  results.push({ name, problems: problems.sort((a, b) => a.line - b.line), notes });
  console.log(`${problems.length ? "FAIL" : "PASS"}  ${name}${problems.length ? `  (${problems.length} problems)` : ""}`);
}

// ---- write the readable report ----
const esc = s => String(s).replace(/\|/g, "\\|");
const md = [
  "# Recap gate report",
  "",
  `${files.length - failedFiles} of ${files.length} recaps pass · run ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`,
  "",
  "| Recap | Result | Problems |",
  "|---|---|---|",
  ...results.map(r => `| ${esc(r.name)} | ${r.problems.length ? "❌ FAIL" : "✅ PASS"} | ${r.problems.length} |`),
  "",
];
for (const r of results) {
  md.push(`## ${r.problems.length ? "❌" : "✅"} ${esc(r.name)}`, "");
  if (r.problems.length) {
    md.push("| Where | Problem |", "|---|---|");
    for (const p of r.problems) md.push(`| ${p.line ? "line " + p.line : "whole file"} | ${esc(p.msg)} |`);
    md.push("");
  } else md.push("No problems found.", "");
  if (r.notes.length) { md.push(...r.notes.map(n => `- ${esc(n)}`), ""); }
}
const report = path.join(__dirname, "recap-gate-report.md");
fs.writeFileSync(report, md.join("\n"), "utf8");
console.log(`\n${files.length - failedFiles} of ${files.length} recaps pass. Full report: ${report}`);
process.exitCode = failedFiles ? 1 : 0;
