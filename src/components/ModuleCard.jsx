import { Link } from "react-router-dom";
import { moduleIcon } from "./Mark.jsx";
import ProgressRing from "./ProgressRing.jsx";
import { moduleColors } from "../data/content.js";

export default function ModuleCard({ module, mastery = 0, questionCount }) {
  const color = moduleColors[module.slug] || "#1B5E45";
  return (
    <Link
      to={`/learn/${module.slug}`}
      className="card group block p-6 transition hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className="grid h-12 w-12 place-items-center rounded-xl"
          style={{ backgroundColor: color + "1A", color }}
        >
          {moduleIcon(module.icon, { width: 24, height: 24 })}
        </div>
        <ProgressRing value={mastery} color={color} />
      </div>
      <h3 className="font-display text-xl font-semibold">{module.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{module.blurb}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="pill border border-line bg-surfacewarm text-forest">
          {questionCount} questions
        </span>
        <span className="text-sm font-medium text-forest group-hover:underline">
          {mastery > 0 ? "Keep going" : "Start"}
        </span>
      </div>
    </Link>
  );
}
