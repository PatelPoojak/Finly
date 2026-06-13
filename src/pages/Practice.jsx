import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { getModule, getTopic, moduleColors } from "../data/content.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import {
  newSession,
  loadSession,
  saveSession,
  sessionAccuracy,
} from "../lib/session.js";
import QuestionCard from "../components/QuestionCard.jsx";
import ProgressRing from "../components/ProgressRing.jsx";

export default function Practice() {
  const { moduleSlug, topicSlug } = useParams();
  const mod = getModule(moduleSlug);
  const topic = getTopic(moduleSlug, topicSlug);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getTopicState, recordAnswer, getTopicMastery } = useProgress();

  const [session, setSession] = useState(null);
  const [phase, setPhase] = useState("loading"); // loading | resume | active | done
  const [pos, setPos] = useState(0);

  // set up the session on load: resume an in progress one, show results for a
  // finished one, or start fresh.
  useEffect(() => {
    if (!topic || !user) return;
    const saved = loadSession(user.id, topic.id);
    if (saved && saved.questionIds?.length) {
      const answered = saved.answers.length;
      const total = saved.questionIds.length;
      if (saved.done || answered >= total) {
        setSession({ ...saved, done: true });
        setPhase("done");
      } else if (answered > 0) {
        setSession(saved);
        setPos(answered);
        setPhase("resume");
      } else {
        setSession(saved);
        setPos(0);
        setPhase("active");
      }
    } else {
      const ns = newSession(topic, getTopicState(topic.id));
      saveSession(user.id, topic.id, ns);
      setSession(ns);
      setPos(0);
      setPhase("active");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic && topic.id, user && user.id]);

  if (!mod || !topic) return <Navigate to="/dashboard" replace />;
  if (phase === "loading" || !session) {
    return <div className="grid min-h-[40vh] place-items-center text-muted">Loading...</div>;
  }

  const color = moduleColors[mod.slug] || "#1B5E45";
  const total = session.questionIds.length;
  const currentId = session.questionIds[pos];
  const question = topic.questions.find((q) => q.id === currentId);

  function startFresh() {
    const ns = newSession(topic, getTopicState(topic.id));
    saveSession(user.id, topic.id, ns);
    setSession(ns);
    setPos(0);
    setPhase("active");
  }

  function handleResult(isCorrect) {
    recordAnswer(topic, question, isCorrect);
    const answers = [...session.answers, { questionId: currentId, correct: isCorrect }];
    const ns = { ...session, answers };
    setSession(ns);
    saveSession(user.id, topic.id, ns);
  }

  function handleNext() {
    if (pos + 1 < total) {
      setPos(pos + 1);
    } else {
      const ns = { ...session, done: true };
      setSession(ns);
      saveSession(user.id, topic.id, ns);
      setPhase("done");
    }
  }

  function goNextTopic() {
    const idx = mod.topics.findIndex((t) => t.id === topic.id);
    const next = mod.topics[idx + 1];
    if (next) navigate(`/learn/${mod.slug}/${next.slug}`);
    else navigate(`/learn/${mod.slug}`);
  }

  // ---- resume prompt ----
  if (phase === "resume") {
    return (
      <Shell mod={mod} topic={topic} color={color}>
        <div className="card p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Pick up where you left off?</h2>
          <p className="mt-2 text-muted">
            You answered {session.answers.length} of {total} questions in this session.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => setPhase("active")} className="btn btn-lg" style={{ backgroundColor: color }}>
              Continue session
            </button>
            <button onClick={startFresh} className="btn btn-lg btn-outline">Start over</button>
          </div>
        </div>
      </Shell>
    );
  }

  // ---- results ----
  if (phase === "done") {
    const correctCount = session.answers.filter((a) => a.correct).length;
    const acc = sessionAccuracy(session);
    return (
      <Shell mod={mod} topic={topic} color={color}>
        <div className="card p-8 text-center">
          <p className="eyebrow mb-4">Session complete</p>
          <div className="flex justify-center">
            <ProgressRing value={acc / 100} color={color} size={120} stroke={10} label={`${acc}%`} />
          </div>
          <p className="mt-5 font-display text-2xl font-semibold">
            {correctCount} of {session.answers.length} correct
          </p>
          <p className="mt-1 text-muted">
            {acc >= 80 ? "Strong work. You clearly know this." : acc >= 50 ? "Solid progress. A review will lock it in." : "Worth another pass. Revisit the lesson, then try again."}
          </p>

          <div className="mx-auto mt-6 grid max-w-sm gap-1.5">
            {session.answers.map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted">
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold text-white ${a.correct ? "bg-forest" : "bg-wrong"}`}>
                  {a.correct ? "+" : "x"}
                </span>
                Question {i + 1}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={startFresh} className="btn btn-lg btn-outline">Re-attempt</button>
            <button onClick={goNextTopic} className="btn btn-lg" style={{ backgroundColor: color }}>
              Next topic
            </button>
          </div>
          <Link to={`/learn/${mod.slug}`} className="mt-5 inline-block text-sm text-muted hover:text-forest">
            Back to {mod.name}
          </Link>
        </div>
      </Shell>
    );
  }

  // ---- active session ----
  const answeredSoFar = session.answers.length;
  const mastery = getTopicMastery(mod.slug, topic.slug);

  return (
    <Shell mod={mod} topic={topic} color={color} mastery={mastery}>
      {/* progress through the session */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">Question {pos + 1} of {total}</span>
          <span className="font-medium" style={{ color }}>{sessionAccuracy(session)}% so far</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full transition-all" style={{ width: `${(answeredSoFar / total) * 100}%`, backgroundColor: color }} />
        </div>
      </div>

      <QuestionCard
        key={`${session.startedAt}-${currentId}`}
        question={question}
        moduleName={mod.name}
        color={color}
        onResult={handleResult}
        onNext={handleNext}
      />
    </Shell>
  );
}

function Shell({ mod, topic, color, mastery, children }) {
  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <Link to={`/learn/${mod.slug}/${topic.slug}`} className="text-sm text-muted hover:text-forest">
          Back to lesson
        </Link>
        {mastery != null && mastery > 0 && (
          <ProgressRing value={mastery} color={color} size={44} stroke={5} />
        )}
      </div>
      <div className="mb-6 mt-2">
        <p className="eyebrow mb-1">{mod.name}</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{topic.name}</h1>
      </div>
      {children}
    </main>
  );
}
