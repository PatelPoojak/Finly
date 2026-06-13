import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import * as db from "../lib/db.js";
import { advance, freshTopicState } from "../lib/adaptive.js";
import { modules, moduleQuestionCount } from "../data/content.js";
import { earnedAchievements } from "../data/achievements.js";

const ProgressContext = createContext(null);

// Build a lookup of question id to its tier, module, and topic. Computed once.
const questionMeta = (() => {
  const map = {};
  modules.forEach((m) =>
    m.topics.forEach((t) =>
      t.questions.forEach((q) => {
        map[q.id] = { tier: q.tier, moduleSlug: m.slug, topicId: t.id };
      })
    )
  );
  return map;
})();

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function isYesterday(dateStr, today) {
  if (!dateStr) return false;
  const d = new Date(dateStr + "T00:00:00");
  const t = new Date(today + "T00:00:00");
  const diff = (t - d) / (1000 * 60 * 60 * 24);
  return Math.round(diff) === 1;
}

function emptyProgress() {
  return {
    attempts: 0,
    correct: 0,
    streakDays: 0,
    lastActiveDate: null,
    topicState: {},
    achievements: [],
  };
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(emptyProgress());

  // load this user's progress whenever the signed in user changes
  useEffect(() => {
    let active = true;
    if (!user) {
      setProgress(emptyProgress());
      return;
    }
    db.getProgress(user.id)
      .then((p) => {
        if (active) setProgress(p || emptyProgress());
      })
      .catch(() => {
        if (active) setProgress(emptyProgress());
      });
    return () => {
      active = false;
    };
  }, [user]);

  function persist(next) {
    setProgress(next);
    if (user) db.saveProgress(user.id, next).catch(() => {});
  }

  function getTopicState(topicId) {
    return progress.topicState[topicId] || freshTopicState();
  }

  function buildStats(p) {
    const moduleCorrectCoverage = {};
    let hardCorrect = 0;

    modules.forEach((m) => {
      const correctInModule = new Set();
      m.topics.forEach((t) => {
        const ts = p.topicState[t.id];
        if (ts) {
          ts.correctIds.forEach((id) => {
            correctInModule.add(id);
            if (questionMeta[id]?.tier === "hard") hardCorrect++;
          });
        }
      });
      moduleCorrectCoverage[m.slug] =
        correctInModule.size / moduleQuestionCount(m);
    });

    return {
      totalAnswered: p.attempts,
      totalCorrect: p.correct,
      streakDays: p.streakDays,
      moduleCorrectCoverage,
      hardCorrect,
    };
  }

  function recordAnswer(topic, question, isCorrect) {
    const prevState = progress.topicState[topic.id] || freshTopicState();
    const nextState = advance(prevState, question, isCorrect);

    const today = todayStr();
    let streakDays = progress.streakDays;
    if (progress.lastActiveDate === today) {
      // already counted today, leave the streak as is
    } else if (isYesterday(progress.lastActiveDate, today)) {
      streakDays = progress.streakDays + 1;
    } else {
      streakDays = 1;
    }

    const next = {
      ...progress,
      attempts: progress.attempts + 1,
      correct: progress.correct + (isCorrect ? 1 : 0),
      streakDays,
      lastActiveDate: today,
      topicState: { ...progress.topicState, [topic.id]: nextState },
    };

    next.achievements = earnedAchievements(buildStats(next));
    persist(next);
    if (user) db.recordAttempt(user.id, question.id, isCorrect).catch(() => {});
    return nextState;
  }

  function getModuleMastery(moduleSlug) {
    const mod = modules.find((m) => m.slug === moduleSlug);
    if (!mod) return 0;
    const correct = new Set();
    mod.topics.forEach((t) => {
      const ts = progress.topicState[t.id];
      if (ts) ts.correctIds.forEach((id) => correct.add(id));
    });
    return correct.size / moduleQuestionCount(mod);
  }

  function getTopicMastery(moduleSlug, topicSlug) {
    const mod = modules.find((m) => m.slug === moduleSlug);
    const topic = mod?.topics.find((t) => t.slug === topicSlug);
    if (!topic) return 0;
    const ts = progress.topicState[topic.id];
    const correct = ts ? new Set(ts.correctIds).size : 0;
    return correct / topic.questions.length;
  }

  const stats = useMemo(() => buildStats(progress), [progress]);

  const value = {
    progress,
    stats,
    recordAnswer,
    getTopicState,
    getModuleMastery,
    getTopicMastery,
    earnedAchievementIds: progress.achievements || [],
  };

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
