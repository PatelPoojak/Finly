import { supabase } from "./supabaseClient.js";

// Supabase data layer. Implements the exact same async API as dbLocal.js, so
// db.js can pick between them with no other code changes.
//
// Content (modules, topics, questions) lives in the app bundle, not the
// database, so this layer only persists accounts and progress. topic_id and
// question_id are stored as plain text that reference the bundled content.

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, country, grade")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data || null;
}

// Map a Supabase auth user to the profile shape the app expects, creating the
// profile row if the database trigger has not (or is not installed).
async function ensureProfile(authUser, fields = {}) {
  if (!authUser) return null;
  let profile = await fetchProfile(authUser.id);
  if (!profile) {
    const meta = authUser.user_metadata || {};
    const row = {
      id: authUser.id,
      name: fields.name || meta.name || "Learner",
      email: authUser.email,
      country: fields.country || meta.country || "Unknown",
      grade: fields.grade || meta.grade || "",
    };
    const { error } = await supabase.from("profiles").upsert(row);
    if (error) throw new Error(error.message);
    profile = row;
  }
  return profile;
}

export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      try {
        callback(await ensureProfile(session.user));
      } catch {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
  return () => data.subscription.unsubscribe();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) return null;
  return ensureProfile(data.session.user);
}

export async function signUp({ name, email, password, country, grade }) {
  const e = (email || "").trim().toLowerCase();
  if (!name || !e || !password) {
    throw new Error("Please fill in your name, email, and password.");
  }
  const { data, error } = await supabase.auth.signUp({
    email: e,
    password,
    options: { data: { name: name.trim(), country: country || "Unknown", grade: grade || "" } },
  });
  if (error) throw new Error(error.message);
  if (!data.session) {
    // Email confirmation is on. Account is created but not yet logged in.
    throw new Error(
      "Account created. Please check your email to confirm, then log in."
    );
  }
  return ensureProfile(data.user, { name, country, grade });
}

export async function signIn({ email, password }) {
  const e = (email || "").trim().toLowerCase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: e,
    password,
  });
  if (error) throw new Error("Email or password is incorrect.");
  return ensureProfile(data.user);
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getProgress(userId) {
  // Per topic adaptive state.
  const { data: rows, error } = await supabase
    .from("topic_progress")
    .select("topic_id, tier, streak, correct_ids, seen_ids")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);

  const topicState = {};
  (rows || []).forEach((r) => {
    topicState[r.topic_id] = {
      tier: r.tier || "easy",
      streak: r.streak || 0,
      correctIds: r.correct_ids || [],
      seenIds: r.seen_ids || [],
    };
  });

  // Streak lives on the profile.
  const { data: prof } = await supabase
    .from("profiles")
    .select("streak_days, last_active")
    .eq("id", userId)
    .maybeSingle();

  // Totals come from the attempts log.
  const { count: attempts } = await supabase
    .from("attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);
  const { count: correct } = await supabase
    .from("attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_correct", true);

  return {
    attempts: attempts || 0,
    correct: correct || 0,
    streakDays: prof?.streak_days || 0,
    lastActiveDate: prof?.last_active || null,
    topicState,
    achievements: [],
  };
}

export async function saveProgress(userId, progress) {
  // Keep the streak on the profile.
  await supabase
    .from("profiles")
    .update({
      streak_days: progress.streakDays || 0,
      last_active: progress.lastActiveDate || null,
    })
    .eq("id", userId);

  // Upsert every topic's adaptive state.
  const rows = Object.entries(progress.topicState || {}).map(([topicId, ts]) => ({
    user_id: userId,
    topic_id: topicId,
    tier: ts.tier || "easy",
    streak: ts.streak || 0,
    correct_ids: ts.correctIds || [],
    seen_ids: ts.seenIds || [],
    updated_at: new Date().toISOString(),
  }));
  if (rows.length) {
    const { error } = await supabase
      .from("topic_progress")
      .upsert(rows, { onConflict: "user_id,topic_id" });
    if (error) throw new Error(error.message);
  }
}

export async function recordAttempt(userId, questionId, isCorrect) {
  // Append only log that powers the impact dashboard.
  await supabase.from("attempts").insert({
    user_id: userId,
    question_id: questionId,
    is_correct: isCorrect,
  });
}

export async function getImpactStats() {
  // A security definer function returns only aggregate counts, never any
  // individual's data, so it is safe to expose to the app.
  const { data, error } = await supabase.rpc("finly_impact");
  if (error) throw new Error(error.message);
  const r = data || {};
  const totalAttempts = r.total_attempts || 0;
  const totalCorrect = r.total_correct || 0;
  return {
    totalUsers: r.total_users || 0,
    countries: r.countries || 0,
    byCountry: r.by_country || {},
    totalAttempts,
    totalCorrect,
    totalQuestionsCompleted: r.questions_completed || 0,
    accuracy: totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
  };
}
