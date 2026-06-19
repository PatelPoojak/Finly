const DONATE_URL = "https://hcb.hackclub.com/donations/start/finly";

export default function Donate() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="eyebrow mb-3">Support Finly</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Keep Finly <span className="italic text-gold">free</span> for everyone.
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/90">
        <p>
          Finly is free, with no ads and no paywall, and it always will be. There
          is nothing to buy and nothing to sell. We want the only thing between a
          student and the lesson they need to be nothing at all.
        </p>
        <p>
          Donations cover the real costs of running it, hosting, the database, and
          the domain, and help Finly reach more students who were never taught this
          in school. Every dollar goes straight into keeping the tool free and
          making it better.
        </p>
      </div>

      <div className="mt-10">
        <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-lg">
          Donate to Finly
        </a>
        <p className="mt-3 text-sm text-muted">
          Donations are processed securely through HCB and are tax-deductible to
          the extent allowed by law.
        </p>
      </div>

      <div className="card mt-12 flex items-start gap-4 p-6">
        <a href="https://hackclub.com/hcb" target="_blank" rel="noopener noreferrer" className="shrink-0" aria-label="HCB, a program of The Hack Foundation">
          <img src="/hcb-icon.svg" alt="HCB" width={48} height={48} className="rounded-xl" />
        </a>
        <p className="text-sm leading-relaxed text-muted">
          Finly is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a
          501(c)(3) nonprofit (EIN: 81-2908499). Your donation is made to The Hack
          Foundation for the benefit of Finly and is tax-deductible to the extent
          allowed by law.
        </p>
      </div>
    </main>
  );
}
