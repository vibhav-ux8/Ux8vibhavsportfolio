// =====================================================================
// src/app/pages/AdminLogin.tsx
// REPLACES the existing file. Same visual register; real Supabase auth.
// Demo credentials block removed — credentials live in Supabase only.
// =====================================================================

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Lock, User, AlertCircle } from "lucide-react";
import { useAuth } from "../lib/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, session, loading } = useAuth();

  // If already signed in, bounce to dashboard (or wherever they came from)
  useEffect(() => {
    if (!loading && session) {
      const from =
        (location.state as { from?: string } | null)?.from ?? "/admin/dashboard";
      navigate(from, { replace: true });
    }
  }, [loading, session, navigate, location.state]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      // Map common Supabase auth errors to friendlier copy
      if (/invalid login credentials/i.test(authError)) {
        setError("Email or password is incorrect.");
      } else if (/email not confirmed/i.test(authError)) {
        setError(
          "Email not confirmed. Disable email confirmation in Supabase Auth settings, or confirm via the link sent to your inbox."
        );
      } else {
        setError(authError);
      }
      setSubmitting(false);
      return;
    }
    // Success path — useEffect above handles navigation once the session arrives
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/5 mb-4">
              <Lock className="w-5 h-5 text-foreground" />
            </div>
            <h1 className="text-2xl font-medium text-foreground">Admin sign in</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage portfolio content
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 text-sm bg-destructive/5 text-destructive border border-destructive/20 rounded-lg p-3"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm text-foreground mb-1.5">
                Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                  placeholder="you@domain.com"
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to site
            </a>
          </div>
        </div>

        <p className="mt-4 text-xs text-center text-muted-foreground">
          Authentication is handled by Supabase. Manage users in Supabase&nbsp;→&nbsp;Authentication.
        </p>
      </motion.div>
    </div>
  );
}
