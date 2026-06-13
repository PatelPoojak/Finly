import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const grades = ["Middle schooler", "High schooler", "College student", "Adult learner", "Other"];

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", country: "", grade: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      await signUp(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-md flex-col px-5 py-16 sm:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Create your free account.</h1>
      <p className="mt-2 text-muted">It takes a few seconds. No payment, ever.</p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} className="field" placeholder="First name" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="field" placeholder="Choose a password" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="country">Country</label>
            <input id="country" value={form.country} onChange={(e) => update("country", e.target.value)} className="field" placeholder="Country" />
          </div>
          <div>
            <label className="label" htmlFor="grade">I am a</label>
            <select id="grade" value={form.grade} onChange={(e) => update("grade", e.target.value)} className="field">
              <option value="">Select</option>
              {grades.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {error && <p className="rounded-lg bg-wrongbg px-4 py-3 text-sm text-wrong">{error}</p>}

        <button onClick={handleSubmit} disabled={busy} className="btn btn-lg w-full disabled:opacity-60">
          {busy ? "Creating account..." : "Create account"}
        </button>
        <p className="text-center text-xs text-muted">
          We ask for country and level only to understand who Finly reaches. We never sell your data.
        </p>
      </div>

      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-forest hover:underline">Log in</Link>
      </p>
    </main>
  );
}
