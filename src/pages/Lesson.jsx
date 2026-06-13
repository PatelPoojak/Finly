import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { getModule, getTopic, moduleColors } from "../data/content.js";
import { getLesson } from "../data/lessons.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { loadSession, clearSession } from "../lib/session.js";
import ProgressRing from "../components/ProgressRing.jsx";

function Block({ block, color }) {
  if (block.h) return <h3 className="mt-7 font-display text-xl font-semibold">{block.h}</h3>;
  if (block.p) return <p className="mt-4 text-[17px] leading-relaxed text-ink/90">{block.p}</p>;
  if (block.list)
    return (
      <ul className="mt-4 space-y-2">
        {block.list.map((item, i) => (
          <li key={i} className="flex gap-3 text-[17px] leading-relaxed text-ink/90">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ backgroundColor: color }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  if (block.term)
    return (
      <div className="mt-4 rounded-xl border border-line bg-surfacewarm p-4">
        <p className="font-display text-base font-semibold" style={{ color }}>{block.term}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{block.def}</p>
      </div>
    );
  if (block.callout)
    return (
      <div className="mt-5 flex gap-3 rounded-xl border-l-4 bg-correctbg p-4" style={{ borderColor: color }}>
        <span className="text-[15px] font-medium leading-relaxed text-ink">{block.callout}</span>
      </div>
    );
  return null;
}

export default function Lesson() {
  const { moduleSlug, topicSlug } = useParams();
  const mod = getModule(moduleSlug);
  const topic = getTopic(moduleSlug, topicSlug);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getTopicMastery } = useProgress();

  if (!mod || !topic) return <Navigate to="/dashboard" replace />;

  const color = moduleColors[mod.slug] || "#1B5E45";
  const lesson = getLesson(topic.id);
  const mastery = getTopicMastery(mod.slug, topic.slug);

  function startPractice() {
    // if the last session was finished, clear it so a new one starts fresh.
    // an in progress session is left alone so practice can offer to resume it.
    if (user) {
      const saved = loadSession(user.id, topic.id);
      if (saved && saved.done) clearSession(user.id, topic.id);
    }
    navigate(`/learn/${mod.slug}/${topic.slug}/practice`);
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <Link to={`/learn/${mod.slug}`} className="text-sm text-muted hover:text-forest">
        Back to {mod.name}
      </Link>

      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow mb-2">{mod.name}{lesson ? ` · ${lesson.minutes} min read` : ""}</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight">{topic.name}</h1>
          <p className="mt-2 text-lg text-muted">{topic.summary}</p>
        </div>
        {mastery > 0 && <ProgressRing value={mastery} color={color} size={56} stroke={6} />}
      </div>

      <article className="mt-8">
        {lesson ? (
          lesson.blocks.map((block, i) => <Block key={i} block={block} color={color} />)
        ) : (
          <p className="mt-4 text-[17px] leading-relaxed text-ink/90">
            Jump into the questions to start learning this topic. Each question comes
            with an explanation, so you build understanding as you go.
          </p>
        )}
      </article>

      <div className="mt-10 rounded-2xl border border-line bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-semibold">Ready to practice?</p>
            <p className="text-sm text-muted">
              {Math.min(8, topic.questions.length)} questions, with instant feedback.
            </p>
          </div>
          <button onClick={startPractice} className="btn btn-lg" style={{ backgroundColor: color }}>
            Start practice
          </button>
        </div>
      </div>
    </main>
  );
}
