import { Link } from "react-router-dom";
import { Mark } from "./Mark.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Mark size={22} />
            <span className="font-display text-lg font-semibold">Finly</span>
          </div>
          <p className="text-sm text-muted">A nonprofit financial literacy project.</p>
          <nav className="ml-auto flex items-center gap-5 text-sm text-muted">
            <Link to="/about" className="hover:text-forest">About</Link>
            <Link to="/donate" className="hover:text-forest">Donate</Link>
            <Link to="/login" className="hover:text-forest">Log in</Link>
            <span>(c) 2026 Finly</span>
          </nav>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Finly is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a
          501(c)(3) nonprofit (EIN: 81-2908499).
        </p>
      </div>
    </footer>
  );
}
