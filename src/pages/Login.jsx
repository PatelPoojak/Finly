import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      await signIn({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-md flex-col px-5 py-16 sm:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome back.</h1>
      <p className="mt-2 text-muted">Log in to keep your streak going.</p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()} className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()} className="field" placeholder="Your password" />
        </div>

        {error && <p className="rounded-lg bg-wrongbg px-4 py-3 text-sm text-wrong">{error}</p>}

        <button onClick={handleSubmit} disabled={busy} className="btn btn-lg w-full disabled:opacity-60">
          {busy ? "Logging in..." : "Log in"}
        </button>
      </div>

      <p className="mt-6 text-sm text-muted">
        New here?{" "}
        <Link to="/signup" className="font-medium text-forest hover:underline">Create a free account</Link>
      </p>
    </main>
  );
}
