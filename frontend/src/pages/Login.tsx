import { useState } from "react";
import type { FormEvent } from "react";
import { loginUser } from "../auth";
import "./Login.css";

type LoginProps = {
  onLoginSuccess: () => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(email, password);
      onLoginSuccess();
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          ✓
        </div>

        <div className="login-heading">
          <h1>Welcome back</h1>
          <p>Sign in to continue to your Task Manager.</p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="login-field">
            <label htmlFor="login-email">
              Email address
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-button-spinner" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="login-security">
          <span>🔒</span>
          <span>Secure authentication powered by Firebase</span>
        </div>

      </div>
    </div>
  );
}