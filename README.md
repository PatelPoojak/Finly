# Finly

Free, adaptive financial literacy practice for students. Personal finance,
investing, and economics, built as a nonprofit project.

This is a full React (Vite) application. It runs end to end right now on a local
data layer (browser storage) with no setup, so you can build, demo, and test the
entire site immediately. It also supports Supabase for real accounts and progress
that work across devices: add two environment variables and the app uses Supabase
automatically, with no other code changes. To take it live (Supabase, GitHub, a
host, and a domain), follow SETUP.md.

## Run it

You need Node 18 or newer.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To make an admin account that can see the impact dashboard at `/admin`, copy
`.env.example` to `.env` and set `VITE_ADMIN_EMAILS` to the email you sign up
with. Restart the dev server after changing env values.

```bash
cp .env.example .env
```

## What is here

A working multi page site:

- Landing page with a live, interactive sample question
- Sign up and log in (local accounts for now)
- Dashboard with streak, overall mastery, module cards, and achievements
- Public curriculum page at `/modules` so visitors see every module and lesson
  preview before signing in (content itself stays behind login)
- A Modules menu in the nav that reveals all modules on hover
- Module pages listing topics with per topic mastery
- A short lesson before every topic, so learners understand the concept first
- Fixed practice sessions of 8 questions with no repeats inside a session
- Sessions that survive a refresh, with a resume or restart prompt
- A results screen with accuracy, re-attempt, and next topic
- Impact dashboard at `/admin` (reach and engagement metrics)
- About page and a styled 404

The content library holds over 1,000 questions across 13 modules and 80 topics,
and every topic has its own lesson. The newest four modules deliberately cover
ground standard financial literacy curricula skip, so the catalog reads as its
own thing rather than a copy. Every original topic carries 12 questions and most
others 11 to 12, so a session pulls from a larger pool and mastery is not just
the same eight questions repeated:

- Personal Finance Basics: budgeting, saving, banking, credit scores, credit
  cards, debt and loans, taxes, insurance
- Investing 101: compound interest, stocks, bonds, index funds and ETFs,
  diversification and risk, retirement accounts, market mechanics
- Economics Fundamentals: scarcity and opportunity cost, supply and demand,
  elasticity, inflation, market structures, GDP and macro indicators, fiscal
  and monetary policy
- Entrepreneurship and Business: business basics, revenue and costs and profit,
  cash flow, pricing and value, startups and funding
- Money Psychology and Fraud: behavioral biases, scams and fraud, money
  mindset, advertising and spending triggers, setting financial goals
- Credit and Borrowing: how credit works, interest and APR, types of loans,
  credit reports and scores, managing debt, debt traps to avoid
- Crypto and Modern Finance: what money is, blockchain basics, cryptocurrency,
  crypto risk and scams, fintech and money apps, the future of money
- Career and Income: understanding paychecks, benefits and total comp, types of
  income, salary and negotiation, gig and freelance work, growing your income
- Real Estate and Big Purchases: renting vs buying, mortgage basics, the true
  cost of a home, cars and vehicles, big purchase decisions, building home equity
- Financial Independence: what it means, the savings rate, building income
  streams, defining enough, milestones, and the real risks and tradeoffs
- The Economy Around You: incentives, everyday tradeoffs, prices as signals,
  game theory basics, network effects, externalities and shared costs
- Digital Money Life: the subscription economy, the attention economy, your data
  as currency, the creator and gig economy, online marketplaces, digital rights
- Money and Life: money and relationships, big life transitions, giving and
  generosity, ethical and sustainable money, money and wellbeing, talking about money

Every question has an easy, medium, or hard tier and a plain explanation. A
practice session puts the questions you have not yet mastered first, easy to
hard, so practice targets your weak spots.

## Project structure

```
finly/
  index.html
  tailwind.config.js          design tokens (palette, fonts)
  src/
    main.jsx                  app entry, providers, router
    App.jsx                   routes and shared layout
    index.css                 Tailwind layers and component classes
    data/                     the question bank, lessons, and achievements
      personalFinance.js
      investing.js
      economics.js
      entrepreneurship.js
      moneyPsychology.js
      creditBorrowing.js
      cryptoModern.js
      careerIncome.js
      realEstate.js
      financialIndependence.js
      everydayEconomics.js
      digitalMoneyLife.js
      moneyAndLife.js
      supplemental.js         extra questions merged into the original topics
      supplemental2.js        applied, scenario style questions for core topics
      lessons.js              one lesson per topic, keyed by topic id
      content.js              combines modules, merges extras, lookup helpers
      achievements.js
    lib/
      storage.js              browser storage helpers
      adaptive.js             tier logic and answer grading
      session.js              builds and persists practice sessions
      db.js                   data layer facade (picks local or Supabase)
      dbLocal.js              browser storage backend (zero setup fallback)
      dbSupabase.js           Supabase backend (real cross device accounts)
      supabaseClient.js       Supabase client, active when env vars are set
    context/
      AuthContext.jsx         current user, sign in and out
      ProgressContext.jsx     streaks, mastery, achievements
    components/               Nav, Footer, Mark, cards, rings, badges, guards
    pages/                    Landing, Login, Signup, Dashboard, ModuleView,
                              Practice, Admin, About, NotFound
  supabase/
    schema.sql                full Postgres schema and impact views
```

## Adding content

Open the module file in `src/data` (for example `investing.js`) and add a
question object to a topic's `questions` array. The shape:

```js
{
  id: "inv-stk-9",
  tier: "medium",            // easy | medium | hard
  type: "mc",                // mc | numeric
  prompt: "Your question text",
  choices: [{ id: "a", label: "..." }, { id: "b", label: "..." }],
  answer: "b",               // choice id for mc, or a number for numeric
  // tolerance: 2,           // numeric only, accepted plus or minus range
  explanation: "Why the answer is what it is."
}
```

## Backend: local or Supabase

The app supports two backends through one facade, `src/lib/db.js`:

- With no environment variables, it uses `src/lib/dbLocal.js` (browser storage),
  so the app runs with zero setup. Accounts and progress live only in that one
  browser.
- With `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set, it uses
  `src/lib/dbSupabase.js` automatically, giving real accounts and progress that
  work across devices. No other code changes are needed.

Both files expose the same async API, so `AuthContext`, `ProgressContext`, and
the rest of the app do not know or care which backend is active.

To provision Supabase, run `supabase/schema.sql` in the Supabase SQL editor. It
creates the profiles, topic_progress, and attempts tables, the row level
security policies, the sign up trigger, and a `finly_impact` function that powers
the `/admin` dashboard with privacy safe aggregate numbers.

The full launch walkthrough (Supabase, GitHub, deploying, and a custom domain)
is in SETUP.md.

## Notes

- The question content ships in the app bundle (`src/data`), not the database,
  so you can edit content freely without any database changes.
- When Supabase is active, Supabase Auth handles passwords and sessions
  securely. The local browser storage layer is a development and offline
  fallback only; its password handling is not secure, so do not rely on the
  local layer for real users.
- The copy describes Finly as a nonprofit project, which is accurate. It does
  not claim formal 501(c)(3) status anywhere. Search the code for
  `501C3_PLACEHOLDER` to find the two spots (footer and mission section) where
  you can add a status line once you have genuinely filed, and not before.
- The whole codebase avoids em dashes by design.
