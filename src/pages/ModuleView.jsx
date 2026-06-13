import { Link, useParams, Navigate } from "react-router-dom";
import { getModule, moduleColors } from "../data/content.js";
import { useProgress } from "../context/ProgressContext.jsx";
import { moduleIcon } from "../components/Mark.jsx";
import ProgressRing from "../components/ProgressRing.jsx";

export default function ModuleView() {
  const { moduleSlug } = useParams();
  const mod = getModule(moduleSlug);
  const { getTopicMastery, getModuleMastery } = useProgress();

  if (!mod) return <Navigate to="/dashboard" replace />;

  const color = moduleColors[mod.slug] || "#1B5E45";
  const mastery = getModuleMastery(mod.slug);

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Link to="/dashboard" className="text-sm text-muted hover:text-forest">Back to dashboard</Link>

      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl" style={{ backgroundColor: color + "1A", color }}>
            {moduleIcon(mod.icon, { width: 28, height: 28 })}
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight">{mod.name}</h1>
          <p className="mt-2 max-w-xl text-lg text-muted">{mod.blurb}</p>
        </div>
        <ProgressRing value={mastery} color={color} size={72} stroke={7} />
      </div>

      <div className="mt-10 space-y-3">
        {mod.topics.map((topic) => {
          const tm = getTopicMastery(mod.slug, topic.slug);
          return (
            <Link
              key={topic.id}
              to={`/learn/${mod.slug}/${topic.slug}`}
              className="card flex items-center gap-5 p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <ProgressRing value={tm} color={color} size={48} stroke={5} />
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold">{topic.name}</h3>
                <p className="text-sm text-muted">{topic.summary}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-forest">{topic.questions.length} questions</p>
                <p className="text-xs text-muted">{tm > 0 ? "Keep practicing" : "Start"}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
