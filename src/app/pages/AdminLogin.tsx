import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple authentication - in production, this should be a proper backend auth
    if (email === "admin@ux8.in" && password === "Eryszebz@2401_ux8") {
      localStorage.setItem("isAdminAuthenticated", "true");
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("adminViewEnabled", "true");
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-foreground rounded-full mb-4"
          >
            <Lock className="w-8 h-8 text-background" />
          </motion.div>
          <h1 className="text-3xl font-medium mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage content</p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleLogin}
          className="space-y-6"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="admin@ux8.in"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-foreground text-background py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
          >
            Sign In
          </button>

          <div className="text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Home
            </a>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}