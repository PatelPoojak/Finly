import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mark, FlameIcon, moduleIcon } from "./Mark.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { modules, moduleColors } from "../data/content.js";

// Hover dropdown listing every module. Links go to the module page when the
// person is signed in, and to the public curriculum page when they are not.
function ModulesMenu({ signedIn }) {
  const topHref = signedIn ? "/dashboard" : "/modules";
  return (
    <div className="group relative">
      <Link
        to={topHref}
        className="flex items-center gap-1 hover:text-forest"
      >
        Modules
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:rotate-180">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>
      {/* invisible bridge keeps the menu open while moving the cursor down */}
      <div className="invisible absolute left-1/2 top-full z-40 w-[640px] max-w-[90vw] -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="rounded-2xl border border-line bg-white p-3 shadow-xl shadow-ink/5">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {modules.map((m) => {
              const color = moduleColors[m.slug] || "#1B5E45";
              const href = signedIn ? `/learn/${m.slug}` : "/modules";
              return (
                <Link
                  key={m.slug}
                  to={href}
                  className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-surfacewarm"
                >
                  <span
                    className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg text-white"
                    style={{ backgroundColor: color }}
                  >
                    {moduleIcon(m.icon, { width: 17, height: 17 })}
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-ink">{m.name}</span>
                    <span className="block text-[12.5px] leading-snug text-muted">{m.blurb}</span>
                  </span>
                </Link>
              );
            })}
          </div>
          <Link
            to="/modules"
            className="mt-1 block rounded-xl px-2.5 py-2 text-center text-[13px] font-medium text-forest hover:bg-surfacewarm"
          >
            See the full curriculum
          </Link>
        </div>
      </div>
    </div>
  );
}

// "How it works" smooth scrolls to the section when already on the landing
// page, and otherwise navigates to the landing page (which starts at the top).
function HowItWorks() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  function handleClick(e) {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById("how")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
  }
  return (
    <a href="/" onClick={handleClick} className="hover:text-forest">
      How it works
    </a>
  );
}

export default function Nav() {
  const { user, isAdmin, signOut } = useAuth();
  const { progress } = useProgress();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/");
  }

  return (
    <header className="border-b border-line bg-canvas/90 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4 sm:px-8">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <Mark />
          <span className="font-display text-xl font-semibold">Finly</span>
        </Link>

        {user ? (
          <>
            <nav className="ml-2 hidden items-center gap-6 text-[15px] text-muted md:flex">
              <Link to="/dashboard" className="hover:text-forest">Dashboard</Link>
              <ModulesMenu signedIn />
              {isAdmin && <Link to="/admin" className="hover:text-forest">Impact</Link>}
            </nav>
            <div className="ml-auto flex items-center gap-4">
              <span className="hidden items-center gap-1.5 text-sm font-medium text-forest sm:flex">
                <FlameIcon width={18} height={18} />
                {progress.streakDays || 0} day streak
              </span>
              <button onClick={handleSignOut} className="ghost">Sign out</button>
            </div>
          </>
        ) : (
          <>
            <nav className="ml-2 hidden items-center gap-6 text-[15px] text-muted md:flex">
              <HowItWorks />
              <ModulesMenu signedIn={false} />
              <Link to="/about" className="hover:text-forest">About</Link>
            </nav>
            <div className="ml-auto flex items-center gap-4">
              <Link to="/login" className="ghost">Log in</Link>
              <Link to="/signup" className="btn">Start free</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
