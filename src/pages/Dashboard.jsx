import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { modules, moduleQuestionCount, totalQuestionCount } from "../data/content.js";
import { achievements } from "../data/achievements.js";
import ModuleCard from "../components/ModuleCard.jsx";
import Badge from "../components/Badge.jsx";
import { FlameIcon } from "../components/Mark.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, getModuleMastery, getTopicMastery, earnedAchievementIds } = useProgress();

  const overallCorrect = stats.totalCorrect;
  const overallTotal = totalQuestionCount();
  const overallPct = Math.round((overallCorrect / overallTotal) * 100);

  // suggest the least mastered topic across all modules to continue with
  let nextTopic = null;
  let nextModule = null;
  let lowest = 2;
  modules.forEach((m) => {
    m.topics.forEach((t) => {
      const tm = getTopicMastery(m.slug, t.slug);
      if (tm < lowest) {
        lowest = tm;
        nextTopic = t;
        nextModule = m;
      }
    });
  });
  const continueTo = nextTopic
    ? `/learn/${nextModule.slug}/${nextTopic.slug}`
    : "/learn/personal-finance";

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Your dashboard</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Hi {user?.name || "there"}.
          </h1>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3">
          <FlameIcon width={22} height={22} />
          <div>
            <p className="text-2xl font-semibold leading-none text-forest">{stats.streakDays || 0}</p>
            <p className="text-xs text-muted">day streak</p>
          </div>
        </div>
      </div>

      {/* overview stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Questions answered" value={stats.totalAnswered} />
        <Stat label="Answered correctly" value={stats.totalCorrect} />
        <Stat label="Overall mastery" value={`${overallPct}%`} />
      </div>

      {/* continue */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-forest px-6 py-5 text-white">
        <div>
          <p className="text-sm text-goldsoft">Pick up where you left off</p>
          <p className="font-display text-xl font-semibold">
            {nextTopic ? `${nextModule.name}: ${nextTopic.name}` : "Get started"}
          </p>
        </div>
        <Link to={continueTo} className="btn btn-lg btn-light">Continue</Link>
      </div>

      {/* modules */}
      <h2 className="mt-12 font-display text-2xl font-semibold">Modules</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {modules.map((m) => (
          <ModuleCard
            key={m.slug}
            module={m}
            mastery={getModuleMastery(m.slug)}
            questionCount={moduleQuestionCount(m)}
          />
        ))}
      </div>

      {/* achievements */}
      <h2 className="mt-12 font-display text-2xl font-semibold">Achievements</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a) => (
          <Badge
            key={a.id}
            label={a.label}
            desc={a.desc}
            earned={earnedAchievementIds.includes(a.id)}
          />
        ))}
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="font-display text-3xl font-semibold text-forest">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
