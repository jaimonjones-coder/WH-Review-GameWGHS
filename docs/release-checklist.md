# Release Checklist (Content + Runtime)

## Runtime correctness
- [ ] `node --check` on extracted JS passes.
- [ ] Overlay question modes do not double-fire result callbacks.
- [ ] Buzz Bowl timer is cleared when leaving game/end session/new buzz cycle.
- [ ] Mystery Grid tiles render valid button markup.

## Content gate
- [ ] `node scripts/lint-deck.mjs` passes with **zero errors**.
- [ ] Warnings reviewed and explicitly accepted or fixed.
- [ ] Answer keys follow `docs/answer-key-policy.md`.
- [ ] New/edited items include tags/skill/status/qa metadata where available.

## Smoke test
- [ ] Launch at least: Quick, Review, Buzz Bowl, Jeopardy, Wager, Mystery.
- [ ] Confirm unit + search filters affect all modes.
