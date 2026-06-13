import { useState } from "react";
import { Link } from "react-router-dom";
import { moduleIcon } from "../components/Mark.jsx";
import { modules, moduleQuestionCount, totalQuestionCount } from "../data/content.js";

const sampleChoices = [
  { id: "a", label: "$3,400" },
  { id: "b", label: "$7,400" },
  { id: "c", label: "$10,100", correct: true },
  { id: "d", label: "$24,000" },
];

function Squiggle() {
  return (
    <svg className="absolute -bottom-1 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 8C28 3 52 3 78 7s50 4 76-1 44-3 44-3" fill="none" stroke="#E7B86B" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Landing() {
  const [picked, setPicked] = useState(null);
  const total = totalQuestionCount();

  return (
    <main>
      {/* hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="eyebrow mb-4">Free, adaptive, nonprofit</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Get{" "}
            <span className="relative whitespace-nowrap italic text-gold">
              fluent
              <Squiggle />
            </span>{" "}
            in money.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Adaptive practice in personal finance, investing, and economics, built
            for students one question at a time. The money skills school skips,
            free and built to stay that way.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link to="/signup" className="btn btn-lg">Start practicing</Link>
            <Link to="/login" className="ghost text-base">Log in</Link>
          </div>
          <p className="mt-5 text-sm text-muted">
            {total} questions across {modules.length} modules. No ads, no paywall.
          </p>
        </div>

        {/* interactive sample question */}
        <div className="card p-6 shadow-card sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <span className="pill bg-correctbg text-forest">Investing 101</span>
            <span className="text-[13px] font-medium text-muted">Medium</span>
          </div>
          <p className="font-display text-lg leading-snug sm:text-xl">
            You invest <strong className="font-sans font-semibold">$1,000</strong> at{" "}
            <strong className="font-sans font-semibold">8%</strong> a year, compounded
            annually. Roughly what is it worth in{" "}
            <strong className="font-sans font-semibold">30 years</strong>?
          </p>
          <div className="mt-5 grid gap-2.5">
            {sampleChoices.map((ch) => {
              const isPicked = picked === ch.id;
              const reveal = picked !== null;
              let cls = "border-line bg-surfacewarm hover:border-goldsoft";
              if (reveal && ch.correct) cls = "border-forest bg-correctbg text-forest font-semibold";
              else if (reveal && isPicked && !ch.correct) cls = "border-wrong bg-wrongbg text-wrong";
              return (
                <button
                  key={ch.id}
                  onClick={() => setPicked(ch.id)}
                  className={`flex items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 text-left text-[15px] transition ${cls}`}
                >
                  <span className="grid h-6 w-6 flex-none place-items-center rounded-md border border-line bg-white text-xs font-semibold text-muted">
                    {ch.id.toUpperCase()}
                  </span>
                  {ch.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 min-h-[20px] text-sm">
            {picked === null && <span className="text-muted">Tap an answer to see why.</span>}
            {picked !== null &&
              (sampleChoices.find((c) => c.id === picked)?.correct ? (
                <span className="font-medium text-forest">
                  Exactly, about $10,063. Compounding turns $1k into roughly 10x, not 3x.
                </span>
              ) : (
                <span className="font-medium text-wrong">
                  Not quite. It is about $10,063, the quiet power of compounding.
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* modules */}
      <section id="modules" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow mb-3">{modules.length} modules to explore</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Start where money <span className="italic text-gold">actually lives</span>.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {modules.slice(0, 6).map((m) => (
              <div key={m.slug} className="card p-6">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-correctbg text-forest">
                  {moduleIcon(m.icon, { width: 24, height: 24 })}
                </div>
                <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.blurb}</p>
                <p className="mt-4 text-sm font-medium text-forest">
                  {moduleQuestionCount(m)} questions, {m.topics.length} topics
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/modules" className="btn btn-outline">
              See all {modules.length} modules
            </Link>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Practice that <span className="italic text-gold">meets you</span> where you are.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <Feature title="Adaptive" body="Get a streak going and the difficulty climbs. Miss one and you get a clean review, no shame, just the next rep." />
            <Feature title="Mastery and streaks" body="Track mastery per topic and keep a daily streak. Small reps, real progress you can actually see." />
            <Feature title="Free, forever" body="No ads in your feed, no paywall, no upsell. Finly is a nonprofit, and your data stays yours." />
          </div>
        </div>
      </section>

      {/* mission */}
      <section id="mission" className="bg-forest text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-goldsoft">The why</p>
          <p className="mx-auto max-w-2xl font-display text-2xl font-medium leading-snug sm:text-3xl">
            There is no dominant free tool for money skills the way Khan Academy owns
            math. <span className="italic text-goldsoft">So we are building one.</span>{" "}
            Finly is a nonprofit financial literacy project, open to anyone, anywhere,
            with no ads and no paywall.
          </p>
          {/* 501C3_PLACEHOLDER: add your filing status line here once it is true. */}
          <Link to="/signup" className="btn btn-lg btn-light mt-8">Create a free account</Link>
        </div>
      </section>
    </main>
  );
}

function Feature({ title, body }) {
  return (
    <div>
      <div className="mb-4 h-1 w-10 rounded bg-gold" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}
