// Thin wrapper over browser storage so the rest of the app never touches
// localStorage directly. When you migrate to Supabase, only db.js changes,
// not these helpers.

const NS = "finly:v1";

export const keys = {
  users: `${NS}:users`,
  session: `${NS}:session`,
  progress: (userId) => `${NS}:progress:${userId}`,
  active: (userId, topicId) => `${NS}:active:${userId}:${topicId}`,
};

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function uid() {
  return "u_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
