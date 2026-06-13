import { Link } from "react-router-dom";
import { totalQuestionCount, modules } from "../data/content.js";

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="eyebrow mb-3">About Finly</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Money skills, <span className="italic text-gold">finally</span> made practiceable.
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/90">
        <p>
          Most people leave school knowing how to factor a polynomial but not how a
          credit score works, what an index fund is, or why prices rise. That gap is
          expensive, and it falls hardest on students who never had anyone to explain
          it. Finly exists to close it.
        </p>
        <p>
          The approach is simple: short, adaptive practice. Instead of long lectures,
          you answer questions that adjust to your level. Get a few right and the
          difficulty climbs. Miss one and you get a clear explanation and a chance to
          review. It is the same idea that made tools like Khan Academy work for math,
          pointed at money.
        </p>
        <p>
          Today Finly covers {totalQuestionCount()} questions across{" "}
          {modules.map((m, i) => (
            <span key={m.slug}>
              {i === modules.length - 1 ? "and " : ""}
              {m.name.toLowerCase().replace(" basics", "").replace(" fundamentals", "").replace(" 101", "")}
              {i < modules.length - 1 ? ", " : ""}
            </span>
          ))}
          , with more on the way.
        </p>
        <p>
          Finly is a nonprofit project. There are no ads, no paywall, and no selling of
          anyone's data. The goal is reach, not revenue: a free, genuinely useful tool
          that any student anywhere can open and learn from.
        </p>
      </div>

      <div className="mt-10">
        <Link to="/signup" className="btn btn-lg">Start practicing</Link>
      </div>
    </main>
  );
}
