import fs from 'node:fs';

const html = fs.readFileSync('WHAG3.html', 'utf8');
const m = html.match(/const DEFAULT_DECKS = (\{[\s\S]*?\});/);
if (!m) {
  console.error('Could not find DEFAULT_DECKS in WHAG3.html');
  process.exit(1);
}
const decks = JSON.parse(m[1]);
fs.writeFileSync('data/core.deck.json', JSON.stringify(decks.core || [], null, 2));
console.log(`Wrote data/core.deck.json with ${(decks.core || []).length} items.`);
