import fs from 'node:fs';

const validUnits = new Set(['unit2','unit3','unit4','unit5','unit6','unit7','unit8','unit9']);

function normalize(s = '') {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countBlanks(prompt = '') {
  return (String(prompt).match(/_{3,}/g) || []).length;
}

function loadDeck() {
  if (fs.existsSync('data/core.deck.json')) {
    return JSON.parse(fs.readFileSync('data/core.deck.json', 'utf8'));
  }
  const html = fs.readFileSync('WHAG3.html', 'utf8');
  const m = html.match(/const DEFAULT_DECKS = (\{[\s\S]*?\});/);
  if (!m) throw new Error('Could not parse DEFAULT_DECKS from WHAG3.html');
  const decks = JSON.parse(m[1]);
  return decks.core || [];
}

const deck = loadDeck();
const errors = [];
const warnings = [];
const ids = new Set();
const nums = new Set();

for (const q of deck) {
  const label = q?.id || `num:${q?.num ?? 'unknown'}`;

  for (const k of ['id','num','unit','unitName','prompt','acceptedAnswers']) {
    if (q?.[k] == null || q?.[k] === '') errors.push(`${label}: missing ${k}`);
  }

  if (q?.id) {
    if (ids.has(q.id)) errors.push(`${label}: duplicate id ${q.id}`);
    ids.add(q.id);
  }

  if (q?.num != null) {
    if (nums.has(q.num)) warnings.push(`${label}: duplicate num ${q.num}`);
    nums.add(q.num);
  }

  if (q?.unit && !validUnits.has(q.unit)) errors.push(`${label}: invalid unit ${q.unit}`);

  if (!Array.isArray(q?.acceptedAnswers) || q.acceptedAnswers.length === 0) {
    errors.push(`${label}: acceptedAnswers must be a non-empty array`);
    continue;
  }

  const blanks = countBlanks(q.prompt);
  const nested = Array.isArray(q.acceptedAnswers[0]);

  if (blanks > 1 && !nested) errors.push(`${label}: multi-blank prompt requires nested acceptedAnswers`);
  if (blanks <= 1 && nested) warnings.push(`${label}: single-blank prompt uses nested acceptedAnswers`);
  if (blanks > 1 && nested && q.acceptedAnswers.length !== blanks) {
    errors.push(`${label}: blank count (${blanks}) != answer groups (${q.acceptedAnswers.length})`);
  }

  const groups = nested ? q.acceptedAnswers : [q.acceptedAnswers];
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    if (!Array.isArray(g) || g.length === 0) {
      errors.push(`${label}: answer group ${i+1} is empty`);
      continue;
    }

    const seen = new Set();
    for (const ans of g) {
      if (typeof ans !== 'string' || !ans.trim()) {
        errors.push(`${label}: group ${i+1} has empty/non-string answer`);
        continue;
      }
      const n = normalize(ans);
      if (!n) errors.push(`${label}: group ${i+1} has non-normalizable answer`);
      if (seen.has(n)) warnings.push(`${label}: duplicate normalized variant in group ${i+1} (${ans})`);
      seen.add(n);
    }

    if (g.length > 4) warnings.push(`${label}: group ${i+1} has ${g.length} variants (possible over-broad key)`);
  }

  if (typeof q.prompt === 'string' && q.prompt.trim().length < 25) warnings.push(`${label}: very short prompt`);
}

console.log(`Checked ${deck.length} questions.`);
console.log('\nERRORS');
console.log(errors.length ? errors.join('\n') : 'None');
console.log('\nWARNINGS');
console.log(warnings.length ? warnings.join('\n') : 'None');

process.exit(errors.length ? 1 : 0);
