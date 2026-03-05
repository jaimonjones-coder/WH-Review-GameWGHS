# Dynamic Gameplay Improvement Plan

This project already includes multiple game modes, timer controls, and team support. To make the experience feel **more dynamic and replayable**, implement the following in order:

## 1) Adaptive Difficulty (highest impact)
- Track each player's rolling accuracy (last 5–10 questions).
- Increase difficulty when accuracy is high; decrease when accuracy drops.
- Weight question selection by `difficulty` instead of uniform random.
- Add a "challenge spike" question every N rounds for excitement.

### Suggested implementation
- Add a `performance` object inside `App.session`:
  - `recentAnswers: boolean[]`
  - `accuracy: number`
  - `difficultyBias: number`
- Add a helper like `pickQuestionAdaptive(pool, difficultyBias)`.
- Recompute `difficultyBias` after each answer.

## 2) Dynamic Events During Rounds
Create lightweight random events that trigger every 3–5 questions:
- **Double Points** for next question.
- **Time Freeze** (+5 seconds or timer pause).
- **Hint Drop** (auto-reveal a clue).
- **Steal Chance** (other team may answer if incorrect).

### Suggested implementation
- Add an `eventDeck` and `currentEvent` in session state.
- Add `triggerEventIfNeeded()` inside the same flow that advances to the next question.
- Surface active events near score/timer badges.

## 3) Smarter Scoring Loop
- Keep existing base points, then apply:
  - streak multiplier (`1.0x` → `2.0x` cap)
  - speed bonus (faster answer = more points)
  - comeback bonus for trailing teams
- Add penalties only in competitive modes to keep casual play friendly.

## 4) Better Question Variety Controls
- Avoid repeats until deck exhaustion.
- Enforce unit/category rotation so sessions don't feel clustered.
- Add "micro-boss" rounds every 10 questions (harder, higher-value prompts).

## 5) Team Dynamics
- Add role rotation each round (Captain / Researcher / Spokesperson).
- Add optional team power-ups with cooldowns:
  - 50/50
  - Skip
  - Time Boost
- For showdown mode, add "control of board" mechanic (winner picks next category).

## 6) Immediate Feedback That Teaches
- For wrong answers, show a 1-line "why" explanation and related concept.
- Add confidence input ("Sure / Unsure") and reward accurate confidence.
- Show streak and momentum meter animations between questions.

## 7) Progression & Replayability
- Session goals: "Answer 8 in a row", "Perfect Unit 6", etc.
- Unlock cosmetic themes or badges for milestones.
- Keep per-student/team profile stats in `localStorage`:
  - strongest units
  - weak units
  - average response time

## 8) Audio/Visual Energy (small effort, high feel)
- Add short SFX for correct/wrong/streak-up/event trigger.
- Add tiny transitions between rounds (200–350ms) for rhythm.
- Add a "final 10 seconds" pulse state for timer urgency.

## 9) Data-Driven Difficulty Tuning
- Log anonymous per-question metrics:
  - attempts
  - correct rate
  - average response time
- Automatically flag questions as too easy/hard and rebalance their difficulty field.

## 10) Practical Rollout Order
1. Adaptive question picker + no-repeat logic.
2. Dynamic event system.
3. Expanded scoring (streak + speed + comeback).
4. Feedback snippets and momentum meter.
5. Team power-ups and progression badges.

---

## Minimal First Patch (quick win)
If you only do one patch now:
- Add rolling accuracy tracking.
- Use it to shift question difficulty up/down.
- Add one event: **Double Points next question**.

This alone makes each run feel less predictable and more game-like without rewriting core architecture.
