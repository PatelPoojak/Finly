# Taking Finly live

This walks you from the code you have now to a real site people can use, with
real accounts that work across devices. Nothing here is permanent until you do
it, so read the whole section once before starting.

The app already runs without any of this (it uses local browser storage as a
fallback). These steps switch it onto a real backend.

---

## Part 1: Supabase (accounts and progress)

### 1. Create the project
1. Go to supabase.com and sign in (free tier is fine to start).
2. Click "New project". Give it a name like "finly", set a strong database
   password (save it somewhere), pick a region near your users, and create it.
3. Wait a minute for it to finish provisioning.

### 2. Create the tables
1. In the left sidebar, open "SQL Editor".
2. Click "New query".
3. Open `supabase/schema.sql` from this project, copy the entire contents, and
   paste it into the editor.
4. Click "Run". You should see a success message. This creates the profiles,
   topic_progress, and attempts tables, the security rules, the sign up
   trigger, and the impact function.

### 3. Make sign up log people in immediately (optional but recommended)
By default Supabase emails a confirmation link before a new account can log in.
For the smoothest experience where signing up logs the person straight in:
1. Open "Authentication" in the sidebar, then "Sign In / Providers" (or
   "Providers"), and select "Email".
2. Turn OFF "Confirm email", then save.

If you prefer to keep email confirmation on for security, that is fine too. In
that case the app shows "Account created, please check your email to confirm,
then log in", and the person logs in after clicking the link. No code change
needed either way.

### 4. Get your two keys
1. Open "Project Settings" (the gear), then "API".
2. Copy the "Project URL" and the "anon public" key. You will use these next.
   The anon key is safe to expose in a front end app. Never use the service
   role key in the front end.

### 5. Wire the keys into the app locally
1. In the project root, copy `.env.example` to a new file named `.env`.
2. Fill it in:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_ADMIN_EMAILS=your@email.com
   ```
   `VITE_ADMIN_EMAILS` is the comma separated list of emails allowed to see the
   `/admin` impact dashboard.
3. Run the app:
   ```
   npm install
   npm run dev
   ```
4. Create an account in the running app. Then check Supabase: open "Table
   Editor", and you should see your new row in `profiles`. Answer a few
   questions, refresh the page, and confirm your progress is still there. Open
   it on your phone, log in, and you should see the same progress. That is the
   whole point of this part: real cross device accounts.

---

## Part 2: GitHub (store the code)

You need the code on GitHub so a host can deploy it.

1. Create a free account at github.com if you do not have one.
2. Create a new empty repository (no README, since you already have one). Name
   it something like "finly".
3. In the project folder, run these once:
   ```
   git init
   git add .
   git commit -m "Finly"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/finly.git
   git push -u origin main
   ```
   Your `.env` is already in `.gitignore`, so your keys are NOT uploaded. Good.

---

## Part 3: Deploy (put it online)

Vercel is the easiest for a Vite app. Netlify works the same way.

1. Go to vercel.com and sign in with your GitHub account.
2. Click "Add New Project" and import your "finly" repository.
3. Vercel detects Vite automatically. The build command is `npm run build` and
   the output directory is `dist` (these should be filled in for you).
4. Before deploying, open "Environment Variables" and add the same three you put
   in `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_EMAILS`
5. Click "Deploy". In about a minute you get a live URL like
   `finly.vercel.app`.

Because it is a single page app, routes like `/dashboard` need to fall back to
`index.html`. A `vercel.json` is included that handles this, so deep links and
refreshes work. (On Netlify, the included `public/_redirects` does the same.)

### Point Supabase at your live URL
1. Back in Supabase, open "Authentication", then "URL Configuration".
2. Set the "Site URL" to your live URL (for example `https://finly.vercel.app`,
   or your custom domain once you have it).
3. Add the same URL to "Redirect URLs". Save.

---

## Part 4: Your own domain

1. Buy a domain from any registrar (Namecheap, Cloudflare, Google Domains, etc).
2. In Vercel, open your project, go to "Settings", then "Domains", and add your
   domain. Vercel shows you the DNS records to set.
3. At your registrar, add those DNS records. It can take a little while to take
   effect.
4. Once the domain works, update the Supabase "Site URL" and "Redirect URLs"
   (Part 3) to use your custom domain.

---

## How the backend switch works (for reference)

You do not need to touch code to switch backends. The app checks for the two
Supabase env vars at build time:

- If they are present, it uses Supabase for accounts and progress.
- If they are absent, it uses local browser storage so the app still runs.

All of that logic lives in `src/lib/db.js`, which picks between
`src/lib/dbLocal.js` and `src/lib/dbSupabase.js`. The rest of the app does not
know or care which one is active.

## The impact dashboard

`/admin` is visible only to the emails in `VITE_ADMIN_EMAILS`. It reads
aggregate numbers (total learners, countries, attempts, accuracy) through a
database function that returns only totals, never any individual's data. That is
what keeps it safe to load with the public key while still respecting privacy.

## A note on what is and is not stored

The database stores accounts and progress only. All the questions and lessons
ship inside the app itself, so you can keep editing content in `src/data`
without any database changes. If you ever want content in the database too, that
is a later step and not required to launch.
