import personalFinance from "./personalFinance.js";
import investing from "./investing.js";
import economics from "./economics.js";
import entrepreneurship from "./entrepreneurship.js";
import moneyPsychology from "./moneyPsychology.js";
import creditBorrowing from "./creditBorrowing.js";
import cryptoModern from "./cryptoModern.js";
import careerIncome from "./careerIncome.js";
import realEstate from "./realEstate.js";
import financialIndependence from "./financialIndependence.js";
import everydayEconomics from "./everydayEconomics.js";
import digitalMoneyLife from "./digitalMoneyLife.js";
import moneyAndLife from "./moneyAndLife.js";
import { extraQuestions } from "./supplemental.js";
import { extraQuestions2 } from "./supplemental2.js";

// Merge any supplemental questions into a module's topics so every topic has a
// pool larger than one practice session.
function withExtras(mod) {
  return {
    ...mod,
    topics: mod.topics.map((t) => {
      const extra = [
        ...(extraQuestions[t.id] || []),
        ...(extraQuestions2[t.id] || []),
      ];
      return extra.length
        ? { ...t, questions: [...t.questions, ...extra] }
        : t;
    }),
  };
}

// All learning content for Finly. Add new modules to this array.
export const modules = [
  personalFinance,
  investing,
  economics,
  entrepreneurship,
  moneyPsychology,
  creditBorrowing,
  cryptoModern,
  careerIncome,
  realEstate,
  financialIndependence,
  everydayEconomics,
  digitalMoneyLife,
  moneyAndLife,
].map(withExtras);

// Brand color per module, used across cards and progress visuals.
export const moduleColors = {
  "personal-finance": "#1B5E45",
  investing: "#C98A2E",
  economics: "#3B6E8F",
  entrepreneurship: "#7A5AA8",
  "money-psychology": "#2E7D7B",
  "credit-borrowing": "#B5532B",
  "crypto-modern": "#4C5BA8",
  "career-income": "#A0496B",
  "real-estate": "#8A6240",
  "financial-independence": "#2E8B57",
  "everyday-economics": "#2C7DA0",
  "digital-money-life": "#5E6B7D",
  "money-and-life": "#B85C8A",
};

export const tierOrder = ["easy", "medium", "hard"];

export function getModule(slug) {
  return modules.find((m) => m.slug === slug) || null;
}

export function getTopic(moduleSlug, topicSlug) {
  const mod = getModule(moduleSlug);
  if (!mod) return null;
  return mod.topics.find((t) => t.slug === topicSlug) || null;
}

export function moduleQuestionCount(mod) {
  return mod.topics.reduce((sum, t) => sum + t.questions.length, 0);
}

export function totalQuestionCount() {
  return modules.reduce((sum, m) => sum + moduleQuestionCount(m), 0);
}

export function allQuestionIds() {
  const ids = [];
  modules.forEach((m) =>
    m.topics.forEach((t) => t.questions.forEach((q) => ids.push(q.id)))
  );
  return ids;
}

// Flat list of every topic with its parent module attached, handy for lookups.
export function allTopics() {
  const out = [];
  modules.forEach((m) =>
    m.topics.forEach((t) => out.push({ ...t, moduleSlug: m.slug, moduleName: m.name }))
  );
  return out;
}
