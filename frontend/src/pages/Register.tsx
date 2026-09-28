import { useState } from "react";
import type { FormEvent } from "react";
import { registerUser } from "../auth";
import "./Register.css";

type RegisterProps = {
  onRegisterSuccess: () => void;
};

export default function Register({
  onRegisterSuccess,
}: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await registerUser(email, password);
      onRegisterSuccess();
    } catch {
      setError(
        "Unable to create account. Please check your email.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-logo">
          ✓
        </div>

        <div className="register-heading">
          <h1>Create your account</h1>
          <p>
            Get started with your personal Task Manager.
          </p>
        </div>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          <div className="register-field">
            <label htmlFor="register-email">
              Email address
            </label>

            <input
              id="register-email"
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

          <div className="register-field">
            <label htmlFor="register-password">
              Password
            </label>

            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={6}
              required
            />

            <span className="register-hint">
              Use at least 6 characters.
            </span>
          </div>

          <div className="register-field">
            <label htmlFor="confirm-password">
              Confirm password
            </label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Repeat your password"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          {error && (
            <div
              className="register-error"
              role="alert"
            >
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="register-button-spinner" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="register-security">
          <span>🔒</span>
          <span>
            Your account is securely managed by Firebase
          </span>
        </div>

      </div>
    </div>
  );
}