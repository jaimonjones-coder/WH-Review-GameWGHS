# Answer-Key Normalization Policy

## Goals
- Accept legitimate variants (spelling/transliteration/punctuation).
- Preserve discrimination (do not accept broad conceptual substitutes).

## Single-blank rules
- Include canonical answer + at most 1-3 common safe variants.
- Allow formatting variants (apostrophes/hyphens/case) via normalization.
- Do **not** include near-topic distractors as accepted answers.

## Multi-blank rules
- Always use nested arrays (one array per blank).
- Use `unordered: true` only when blank order is instructionally irrelevant.
- Keep each blank semantically specific.

## Release gate recommendations
- Block release when a question has:
  - ambiguous prompt with multiple plausible canonical answers,
  - over-broad accepted answers,
  - blank-count/answer-group mismatch.
