import { createContext, useContext, useEffect, useState } from "react";
import * as db from "../lib/db.js";

const AuthContext = createContext(null);

const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    db.getSession()
      .then((u) => {
        if (active) setUser(u);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    // When Supabase is active, react to sign in/out happening elsewhere (for
    // example a confirmed email or another tab). In local mode this is a no-op.
    const unsubscribe = db.onAuthChange((u) => {
      if (active) setUser(u);
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const value = {
    user,
    loading,
    isAdmin: user ? adminEmails.includes(user.email) : false,
    async signUp(fields) {
      const u = await db.signUp(fields);
      setUser(u);
      return u;
    },
    async signIn(fields) {
      const u = await db.signIn(fields);
      setUser(u);
      return u;
    },
    async signOut() {
      await db.signOut();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
