import { createClient } from "@supabase/supabase-js";

// The client is created only when both env vars are present. With no env vars
// (for example local development with no backend), this stays null and the app
// transparently falls back to the local data layer in db.js.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

export function isSupabaseEnabled() {
  return Boolean(supabase);
}
