// Brand mark (a coin with a small sprout: money plus growth) and the line
// icons used across the app. All inline SVG so there are no asset files.

export function Mark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="18" r="11" stroke="#1B5E45" strokeWidth="2" />
      <path d="M16 18c0-5 1.6-8.4 4.6-10.6" stroke="#C98A2E" strokeWidth="2" strokeLinecap="round" />
      <path d="M20.6 7.4c2.8-.5 4.6.4 5 2.8-2.6.8-4.4.2-5-2.8Z" fill="#C98A2E" opacity="0.9" />
      <text x="16" y="22" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#1B5E45">$</text>
    </svg>
  );
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function WalletIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H7" />
      <circle cx="16.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M4 19V5M4 19h16" />
      <path d="M7 16l4-5 3 3 5-7" />
      <path d="M19 7v3M19 7h-3" />
    </svg>
  );
}

export function ScaleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M12 4v16M7 8h10M5 20h14" />
      <path d="M7 8l-3 5a3 3 0 0 0 6 0L7 8ZM17 8l-3 5a3 3 0 0 0 6 0l-3-5Z" />
    </svg>
  );
}

export function FlameIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M12 3c1 4-2 5-2 8a3 3 0 0 0 6 0c0-1-.5-2-1-2.5C16 11 18 13 18 16a6 6 0 1 1-12 0c0-5 4-7 6-13Z" />
    </svg>
  );
}

export function TrophyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 16h6M10 16v3M14 16v3M8 21h8" />
    </svg>
  );
}

export function BriefcaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  );
}

export function BrainIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M9 4a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 5 11a2.5 2.5 0 0 0 1 4.5A2.5 2.5 0 0 0 9 20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
      <path d="M15 4a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 19 11a2.5 2.5 0 0 1-1 4.5A2.5 2.5 0 0 1 15 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function CardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  );
}

export function CoinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />
    </svg>
  );
}

export function BadgeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  );
}

export function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M3 11l9-7 9 7M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function CompassIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

export function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

export function DeviceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}

export function moduleIcon(name, props) {
  if (name === "wallet") return <WalletIcon {...props} />;
  if (name === "chart") return <ChartIcon {...props} />;
  if (name === "scale") return <ScaleIcon {...props} />;
  if (name === "briefcase") return <BriefcaseIcon {...props} />;
  if (name === "brain") return <BrainIcon {...props} />;
  if (name === "card") return <CardIcon {...props} />;
  if (name === "coin") return <CoinIcon {...props} />;
  if (name === "badge") return <BadgeIcon {...props} />;
  if (name === "home") return <HomeIcon {...props} />;
  if (name === "compass") return <CompassIcon {...props} />;
  if (name === "globe") return <GlobeIcon {...props} />;
  if (name === "device") return <DeviceIcon {...props} />;
  if (name === "heart") return <HeartIcon {...props} />;
  return <WalletIcon {...props} />;
}
