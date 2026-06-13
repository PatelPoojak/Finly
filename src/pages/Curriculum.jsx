import { Link } from "react-router-dom";
import { modules, moduleColors, moduleQuestionCount, totalQuestionCount } from "../data/content.js";
import { lessonPreview } from "../data/lessons.js";
import { moduleIcon } from "../components/Mark.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Curriculum() {
  const { user } = useAuth();
  const totalTopics = modules.reduce((s, m) => s + m.topics.length, 0);

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      {/* hero */}
      <header className="max-w-2xl">
        <p className="eyebrow mb-3">The curriculum</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Everything Finly <span className="accent">teaches</span>, in one place.
        </h1>
        <p className="mt-4 text-lg text-muted">
          {modules.length} modules, {totalTopics} topics, and {totalQuestionCount()} practice questions.
          Every topic opens with a short lesson, then adaptive practice. Free, with no ads and no paywall.
        </p>
        {!user && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/signup" className="btn btn-lg">Create a free account</Link>
            <Link to="/login" className="btn btn-lg btn-outline">Log in</Link>
          </div>
        )}
      </header>

      {/* modules */}
      <div className="mt-12 space-y-10">
        {modules.map((mod) => {
          const color = moduleColors[mod.slug] || "#1B5E45";
          return (
            <section key={mod.slug}>
              <div className="flex items-start gap-3">
                <span
                  className="grid h-11 w-11 flex-none place-items-center rounded-xl text-white"
                  style={{ backgroundColor: color }}
                >
                  {moduleIcon(mod.icon, { width: 22, height: 22 })}
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">{mod.name}</h2>
                  <p className="text-muted">{mod.blurb}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {mod.topics.length} topics · {moduleQuestionCount(mod)} questions
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {mod.topics.map((topic) => {
                  const points = lessonPreview(topic.id);
                  const href = user ? `/learn/${mod.slug}/${topic.slug}` : "/login";
                  return (
                    <Link
                      key={topic.id}
                      to={href}
                      className="group block rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold">{topic.name}</h3>
                        <span
                          className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                          style={{ backgroundColor: `${color}1A`, color }}
                        >
                          {topic.questions.length} Q
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted">{topic.summary}</p>
                      {points.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {points.map((p, i) => (
                            <li key={i} className="flex gap-2 text-[13px] leading-snug text-ink/80">
                              <span className="mt-1.5 h-1 w-1 flex-none rounded-full" style={{ backgroundColor: color }} />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-3 text-[13px] font-medium" style={{ color }}>
                        {user ? "Open lesson" : "Sign in to start"}
                        <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">{"\u2192"}</span>
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* footer cta */}
      {!user && (
        <div className="mt-14 rounded-3xl bg-forest px-6 py-10 text-center text-white sm:px-10">
          <h2 className="font-display text-3xl font-semibold">Ready to actually learn this?</h2>
          <p className="mx-auto mt-2 max-w-md text-white/80">
            Create a free account to unlock every lesson and start practicing. It takes a few seconds.
          </p>
          <Link to="/signup" className="btn btn-lg btn-light mt-6 inline-block">Start free</Link>
        </div>
      )}
    </main>
  );
}
