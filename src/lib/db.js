// Data layer facade. The whole app imports from this file. It transparently
// uses Supabase when the project is configured (VITE_SUPABASE_URL and
// VITE_SUPABASE_ANON_KEY are set), and falls back to a local browser storage
// layer otherwise, so the app always runs. Both backends expose the same
// async API, so nothing else in the app needs to know which is active.
import { isSupabaseEnabled } from "./supabaseClient.js";
import * as local from "./dbLocal.js";
import * as remote from "./dbSupabase.js";

const impl = isSupabaseEnabled() ? remote : local;

export const usingSupabase = isSupabaseEnabled();

export const onAuthChange = impl.onAuthChange;
export const getSession = impl.getSession;
export const signUp = impl.signUp;
export const signIn = impl.signIn;
export const signOut = impl.signOut;
export const getProgress = impl.getProgress;
export const saveProgress = impl.saveProgress;
export const recordAttempt = impl.recordAttempt;
export const getImpactStats = impl.getImpactStats;
