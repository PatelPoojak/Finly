import { tierOrder } from "../data/content.js";

// How many correct answers in a row before the difficulty tier climbs.
const PROMOTE_AFTER = 2;

// A fresh per topic state. tier is the current difficulty the learner sees.
export function freshTopicState() {
  return { tier: "easy", streak: 0, correctIds: [], seenIds: [] };
}

function tierIndex(tier) {
  return Math.max(0, tierOrder.indexOf(tier));
}

function clampTier(i) {
  return tierOrder[Math.min(Math.max(i, 0), tierOrder.length - 1)];
}

// Choose the next question for a topic given the learner's state.
// Preference order:
//   1. An unseen question at the current tier.
//   2. Any unseen question (closest tier first).
//   3. A previously missed question to review.
//   4. Any question (loop back around).
export function pickNextQuestion(topic, state) {
  const qs = topic.questions;
  const seen = new Set(state.seenIds);
  const correct = new Set(state.correctIds);

  const atTier = (tier) => qs.filter((q) => q.tier === tier);

  const unseenAtTier = atTier(state.tier).filter((q) => !seen.has(q.id));
  if (unseenAtTier.length) return pickRandom(unseenAtTier);

  // widen out from the current tier to find anything unseen
  const order = [...tierOrder].sort(
    (a, b) =>
      Math.abs(tierIndex(a) - tierIndex(state.tier)) -
      Math.abs(tierIndex(b) - tierIndex(state.tier))
  );
  for (const tier of order) {
    const unseen = atTier(tier).filter((q) => !seen.has(q.id));
    if (unseen.length) return pickRandom(unseen);
  }

  // everything seen: review the ones not yet answered correctly
  const toReview = qs.filter((q) => !correct.has(q.id));
  if (toReview.length) return pickRandom(toReview);

  // fully mastered: serve a random question for continued practice
  return pickRandom(qs);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Update topic state after an answer. Returns a NEW state object.
export function advance(state, question, isCorrect) {
  const seenIds = state.seenIds.includes(question.id)
    ? state.seenIds
    : [...state.seenIds, question.id];

  let correctIds = state.correctIds;
  if (isCorrect && !correctIds.includes(question.id)) {
    correctIds = [...correctIds, question.id];
  }

  let streak = isCorrect ? state.streak + 1 : 0;
  let tier = state.tier;

  if (isCorrect && streak >= PROMOTE_AFTER) {
    tier = clampTier(tierIndex(state.tier) + 1);
    streak = 0; // reset the run after a promotion
  } else if (!isCorrect) {
    // step down one tier so the learner gets a cleaner review question next
    tier = clampTier(tierIndex(state.tier) - 1);
  }

  return { tier, streak, correctIds, seenIds };
}

// Grade an answer. Numeric questions allow a tolerance band.
export function isAnswerCorrect(question, response) {
  if (question.type === "numeric") {
    const value = parseFloat(String(response).replace(/[^0-9.\-]/g, ""));
    if (Number.isNaN(value)) return false;
    const tol = question.tolerance ?? 0;
    return Math.abs(value - question.answer) <= tol;
  }
  return response === question.answer;
}
