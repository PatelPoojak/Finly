import { keys, readJSON, writeJSON, remove, uid } from "./storage.js";

// Local data layer (browser storage). Used automatically when Supabase is not
// configured, so the app still runs, demos, and tests with no backend.
//
// SECURITY NOTE: the password handling here is a local development stand-in,
// not real security. When Supabase is configured, Supabase Auth handles
// passwords, hashing, and sessions properly and none of this runs.

function weakHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return String(h);
}

function listProfiles() {
  return readJSON(keys.users, []);
}

function findByEmail(email) {
  const e = email.trim().toLowerCase();
  return listProfiles().find((u) => u.email === e) || null;
}

function publicProfile(user) {
  const { pass, ...safe } = user;
  return safe;
}

function setSession(userId) {
  writeJSON(keys.session, { userId, at: Date.now() });
}

// ---- Unified API (all async to match the Supabase layer) ----

export function onAuthChange() {
  // Local mode has no external auth events.
  return () => {};
}

export async function getSession() {
  const sess = readJSON(keys.session, null);
  if (!sess) return null;
  const user = listProfiles().find((u) => u.id === sess.userId);
  return user ? publicProfile(user) : null;
}

export async function signUp({ name, email, password, country, grade }) {
  const e = (email || "").trim().toLowerCase();
  if (!name || !e || !password) {
    throw new Error("Please fill in your name, email, and password.");
  }
  if (findByEmail(e)) {
    throw new Error("An account with that email already exists. Try logging in.");
  }
  const user = {
    id: uid(),
    name: name.trim(),
    email: e,
    country: country || "Unknown",
    grade: grade || "",
    pass: weakHash(password),
    createdAt: new Date().toISOString(),
  };
  const users = listProfiles();
  users.push(user);
  writeJSON(keys.users, users);
  setSession(user.id);
  return publicProfile(user);
}

export async function signIn({ email, password }) {
  const user = findByEmail(email);
  if (!user || user.pass !== weakHash(password)) {
    throw new Error("Email or password is incorrect.");
  }
  setSession(user.id);
  return publicProfile(user);
}

export async function signOut() {
  remove(keys.session);
}

export async function getProgress(userId) {
  return readJSON(keys.progress(userId), null);
}

export async function saveProgress(userId, progress) {
  writeJSON(keys.progress(userId), progress);
}

export async function recordAttempt() {
  // Local mode derives impact from the stored progress blob, so there is no
  // separate attempt log to write.
}

export async function getImpactStats() {
  const profiles = listProfiles();
  const byCountry = {};
  let totalAttempts = 0;
  let totalCorrect = 0;
  let totalQuestionsCompleted = 0;

  for (const p of profiles) {
    byCountry[p.country] = (byCountry[p.country] || 0) + 1;
    const prog = readJSON(keys.progress(p.id), null);
    if (prog) {
      totalAttempts += prog.attempts || 0;
      totalCorrect += prog.correct || 0;
      const completed = new Set();
      Object.values(prog.topicState || {}).forEach((ts) =>
        (ts.correctIds || []).forEach((id) => completed.add(id))
      );
      totalQuestionsCompleted += completed.size;
    }
  }

  return {
    totalUsers: profiles.length,
    countries: Object.keys(byCountry).length,
    byCountry,
    totalAttempts,
    totalCorrect,
    totalQuestionsCompleted,
    accuracy: totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
  };
}
