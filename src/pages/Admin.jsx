import { useEffect, useState } from "react";
import { getImpactStats } from "../lib/db.js";
import { totalQuestionCount } from "../data/content.js";

const emptyStats = {
  totalUsers: 0,
  countries: 0,
  byCountry: {},
  totalAttempts: 0,
  totalCorrect: 0,
  totalQuestionsCompleted: 0,
  accuracy: 0,
};

export default function Admin() {
  const [stats, setStats] = useState(emptyStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getImpactStats()
      .then((s) => {
        if (active) setStats(s);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const countryRows = Object.entries(stats.byCountry).sort((a, b) => b[1] - a[1]);

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <p className="eyebrow mb-2">Impact</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Reach and engagement</h1>
      <p className="mt-2 max-w-2xl text-muted">
        These are the numbers that show Finly is being used. They are the same
        metrics a grant report or a nonprofit dashboard would ask for.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Registered learners" value={loading ? "..." : stats.totalUsers} />
        <Metric label="Countries reached" value={stats.countries} />
        <Metric label="Questions completed" value={stats.totalQuestionsCompleted} />
        <Metric label="Answer accuracy" value={`${stats.accuracy}%`} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Metric label="Total attempts" value={stats.totalAttempts} />
        <Metric label="Correct answers" value={stats.totalCorrect} />
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">Learners by country</h2>
      {countryRows.length === 0 ? (
        <p className="mt-3 text-muted">No learners yet. Share the link to get started.</p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-surfacewarm text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Country</th>
                <th className="px-5 py-3 font-medium">Learners</th>
              </tr>
            </thead>
            <tbody>
              {countryRows.map(([country, count]) => (
                <tr key={country} className="border-t border-line">
                  <td className="px-5 py-3">{country}</td>
                  <td className="px-5 py-3 font-medium text-forest">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-line bg-surfacewarm p-5 text-sm text-muted">
        <p className="font-medium text-ink">A note on this page</p>
        <p className="mt-1">
          Right now these numbers come from the local data layer in this browser, so
          you can see exactly how the dashboard works. Once Supabase is connected,
          the same view pulls live totals across every learner from the database
          (see the impact views in supabase/schema.sql). The content library holds{" "}
          {totalQuestionCount()} questions in total.
        </p>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="font-display text-3xl font-semibold text-forest">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
