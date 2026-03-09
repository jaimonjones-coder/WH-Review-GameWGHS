# Deck Schema (World History Arcade)

Each question item should follow this shape:

```json
{
  "id": "wh-116",
  "num": 116,
  "unit": "unit9",
  "unitName": "Unit 9 • World Wars & Global Conflict",
  "type": "fill-blank",
  "prompt": "...",
  "acceptedAnswers": [["Imperialism"], ["Nationalism"]],
  "unordered": true,
  "difficulty": 2,
  "points": 10,
  "hint": "U9",
  "tags": ["ww1", "causes"],
  "skill": "historical-knowledge",
  "status": "active",
  "qa": {
    "precision": 1,
    "alignment": 1,
    "clarity": 1,
    "keyRobustness": 1,
    "languageConsistency": 1,
    "reviewedBy": "teacher",
    "reviewedAt": "2026-03-09"
  }
}
```

## Required runtime fields
- `id`, `num`, `unit`, `unitName`, `prompt`, `acceptedAnswers`

## Validation rules
- `unit` must be one of `unit2..unit9`.
- `acceptedAnswers` must be a non-empty array.
- Multi-blank prompts (`___`) must use nested answer arrays with matching count.
- Empty/non-string answers are invalid.

## Optional quality metadata
- `tags`, `skill`, `status`, `qa` are optional at runtime but recommended for content QA and release gating.
