import { useEffect, useState } from "react";
import { isAnswerCorrect } from "../lib/adaptive.js";

const tierLabel = { easy: "Easy", medium: "Medium", hard: "Hard" };

export default function QuestionCard({ question, moduleName, color = "#1B5E45", onResult, onNext }) {
  const [choice, setChoice] = useState(null);
  const [numeric, setNumeric] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  // reset whenever a new question arrives
  useEffect(() => {
    setChoice(null);
    setNumeric("");
    setSubmitted(false);
    setCorrect(false);
  }, [question.id]);

  function submit() {
    if (submitted) return;
    const response = question.type === "numeric" ? numeric : choice;
    if (response === null || response === "") return;
    const isRight = isAnswerCorrect(question, response);
    setCorrect(isRight);
    setSubmitted(true);
    onResult(isRight);
  }

  const canSubmit = question.type === "numeric" ? numeric.trim() !== "" : choice !== null;

  return (
    <div className="card p-6 shadow-card sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <span className="pill" style={{ backgroundColor: color + "1A", color }}>
          {moduleName}
        </span>
        <span className="text-[13px] font-medium text-muted">{tierLabel[question.tier]}</span>
      </div>

      <p className="font-display text-xl leading-snug sm:text-2xl">{question.prompt}</p>

      {question.type === "mc" ? (
        <div className="mt-6 grid gap-2.5">
          {question.choices.map((ch) => {
            const isPicked = choice === ch.id;
            const isAnswer = ch.id === question.answer;
            let cls = "border-line bg-surfacewarm hover:border-goldsoft";
            if (submitted && isAnswer) cls = "border-forest bg-correctbg text-forest font-semibold";
            else if (submitted && isPicked && !isAnswer) cls = "border-wrong bg-wrongbg text-wrong";
            else if (isPicked) cls = "border-forest bg-white";
            return (
              <button
                key={ch.id}
                disabled={submitted}
                onClick={() => setChoice(ch.id)}
                className={`flex items-center gap-3 rounded-xl border-[1.5px] px-4 py-3.5 text-left text-[15px] transition ${cls}`}
              >
                <span className="grid h-6 w-6 flex-none place-items-center rounded-md border border-line bg-white text-xs font-semibold text-muted">
                  {ch.id.toUpperCase()}
                </span>
                {ch.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-6">
          <input
            type="text"
            inputMode="decimal"
            value={numeric}
            disabled={submitted}
            onChange={(e) => setNumeric(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Type your answer"
            className="field max-w-xs text-lg"
          />
          {question.unit && (
            <span className="ml-3 text-sm text-muted">Answer in {question.unit}</span>
          )}
        </div>
      )}

      {submitted && (
        <div
          className={`mt-6 rounded-xl border p-4 text-[15px] ${
            correct ? "border-forest/30 bg-correctbg text-forest" : "border-wrong/30 bg-wrongbg text-wrong"
          }`}
        >
          <p className="font-semibold">{correct ? "Correct" : "Not quite"}</p>
          <p className="mt-1 text-ink/80">{question.explanation}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        {submitted ? (
          <button onClick={onNext} className="btn btn-lg">Next question</button>
        ) : (
          <button onClick={submit} disabled={!canSubmit} className={`btn btn-lg ${!canSubmit ? "opacity-40" : ""}`}>
            Check answer
          </button>
        )}
      </div>
    </div>
  );
}
