import { TrophyIcon } from "./Mark.jsx";

export default function Badge({ label, desc, earned }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-3.5 transition ${
        earned ? "border-forest/30 bg-correctbg" : "border-line bg-surfacewarm opacity-70"
      }`}
    >
      <div
        className={`grid h-9 w-9 flex-none place-items-center rounded-lg ${
          earned ? "bg-forest text-white" : "bg-white text-muted"
        }`}
      >
        <TrophyIcon width={18} height={18} />
      </div>
      <div>
        <p className={`text-sm font-semibold ${earned ? "text-forest" : "text-ink"}`}>{label}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
    </div>
  );
}
