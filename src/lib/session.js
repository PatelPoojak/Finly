import { keys, readJSON, writeJSON, remove } from "./storage.js";
import { tierOrder } from "../data/content.js";

// How many questions make up one practice session.
export const SESSION_SIZE = 8;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build an ordered list of unique question ids for a session.
// Questions the learner has not yet answered correctly come first (so practice
// targets weak spots), then mastered ones for review. Within each group we go
// easy to hard, with a light shuffle so re-attempts are not identical.
export function buildSessionQuestions(topic, topicState, size = SESSION_SIZE) {
  const correct = new Set(topicState?.correctIds || []);
  const byTier = (q) => tierOrder.indexOf(q.tier);

  const groupByTier = (questions) => {
    const out = [];
    tierOrder.forEach((tier) => {
      out.push(...shuffle(questions.filter((q) => q.tier === tier)));
    });
    return out;
  };

  const notMastered = groupByTier(topic.questions.filter((q) => !correct.has(q.id)));
  const mastered = groupByTier(topic.questions.filter((q) => correct.has(q.id)));

  const ordered = [...notMastered, ...mastered];
  return ordered.slice(0, Math.min(size, topic.questions.length)).map((q) => q.id);
}

export function newSession(topic, topicState, size = SESSION_SIZE) {
  return {
    questionIds: buildSessionQuestions(topic, topicState, size),
    answers: [], // [{ questionId, correct }]
    done: false,
    startedAt: Date.now(),
  };
}

export function loadSession(userId, topicId) {
  if (!userId) return null;
  return readJSON(keys.active(userId, topicId), null);
}

export function saveSession(userId, topicId, session) {
  if (!userId) return;
  writeJSON(keys.active(userId, topicId), session);
}

export function clearSession(userId, topicId) {
  if (!userId) return;
  remove(keys.active(userId, topicId));
}

export function sessionAccuracy(session) {
  if (!session || session.answers.length === 0) return 0;
  const correct = session.answers.filter((a) => a.correct).length;
  return Math.round((correct / session.answers.length) * 100);
}
