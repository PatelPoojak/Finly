import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[50vh] max-w-md place-items-center px-5 text-center">
      <div>
        <p className="eyebrow mb-2">404</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          This page took an early withdrawal.
        </h1>
        <p className="mt-3 text-muted">
          The page you are looking for is not here. Let us get you back on track.
        </p>
        <Link to="/" className="btn btn-lg mt-6">Go home</Link>
      </div>
    </main>
  );
}
