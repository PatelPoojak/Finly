import { modules, moduleQuestionCount } from "./content.js";

// Each achievement has an id, label, description, and a check(stats) function.
// stats is produced by ProgressContext.getStats().
export const achievements = [
  {
    id: "first-steps",
    label: "First Steps",
    desc: "Answer your first question.",
    check: (s) => s.totalAnswered >= 1,
  },
  {
    id: "ten-correct",
    label: "Warming Up",
    desc: "Answer 10 questions correctly.",
    check: (s) => s.totalCorrect >= 10,
  },
  {
    id: "fifty-correct",
    label: "Money Minded",
    desc: "Answer 50 questions correctly.",
    check: (s) => s.totalCorrect >= 50,
  },
  {
    id: "streak-3",
    label: "On a Roll",
    desc: "Reach a 3 day streak.",
    check: (s) => s.streakDays >= 3,
  },
  {
    id: "streak-7",
    label: "Habit Formed",
    desc: "Reach a 7 day streak.",
    check: (s) => s.streakDays >= 7,
  },
  {
    id: "finish-pf",
    label: "Personal Finance Pro",
    desc: "Correctly answer every Personal Finance question at least once.",
    check: (s) => s.moduleCorrectCoverage["personal-finance"] >= 1,
  },
  {
    id: "finish-inv",
    label: "Investor in Training",
    desc: "Correctly answer every Investing question at least once.",
    check: (s) => s.moduleCorrectCoverage["investing"] >= 1,
  },
  {
    id: "finish-eco",
    label: "Econ Literate",
    desc: "Correctly answer every Economics question at least once.",
    check: (s) => s.moduleCorrectCoverage["economics"] >= 1,
  },
  {
    id: "hard-master",
    label: "No Easy Mode",
    desc: "Correctly answer 20 hard questions.",
    check: (s) => s.hardCorrect >= 20,
  },
];

// Returns the list of achievement ids the user currently qualifies for.
export function earnedAchievements(stats) {
  return achievements.filter((a) => a.check(stats)).map((a) => a.id);
}

// Total questions per module, used for coverage math elsewhere.
export const moduleTotals = Object.fromEntries(
  modules.map((m) => [m.slug, moduleQuestionCount(m)])
);
