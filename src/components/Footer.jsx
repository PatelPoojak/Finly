import { Link } from "react-router-dom";
import { Mark } from "./Mark.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-8 sm:px-8">
        <div className="flex items-center gap-2">
          <Mark size={22} />
          <span className="font-display text-lg font-semibold">Finly</span>
        </div>
        <p className="text-sm text-muted">A nonprofit financial literacy project.</p>
        {/* 501C3_PLACEHOLDER: once you have genuinely filed, you can add a line
            here such as: <span className="text-sm text-muted">501(c)(3) pending.</span>
            Do not add it before it is true. */}
        <nav className="ml-auto flex items-center gap-5 text-sm text-muted">
          <Link to="/about" className="hover:text-forest">About</Link>
          <Link to="/login" className="hover:text-forest">Log in</Link>
          <span>(c) 2026 Finly</span>
        </nav>
      </div>
    </footer>
  );
}
