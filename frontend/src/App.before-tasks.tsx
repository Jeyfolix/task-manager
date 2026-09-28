import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

type AuthPage = "login" | "register";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authPage, setAuthPage] = useState<AuthPage>("login");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await signOut(auth);
    } finally {
      setSigningOut(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="loading-spinner" />
          <h2>Task Manager</h2>
          <p>Checking your account...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">✓</div>
            <div>
              <h1>Task Manager</h1>
              <span>Stay organized. Get things done.</span>
            </div>
          </div>

          <div className="user-menu">
            <div className="user-avatar">
              {user.email?.charAt(0).toUpperCase() ?? "U"}
            </div>

            <div className="user-details">
              <span className="user-label">Signed in as</span>
              <span className="user-email">{user.email}</span>
            </div>

            <button
              type="button"
              className="sign-out-button"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              {signingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </header>

        <main className="dashboard">
          <section className="welcome-section">
            <div>
              <p className="eyebrow">DASHBOARD</p>
              <h2>Welcome back!</h2>
              <p className="welcome-text">
                Your workspace is ready. Manage your tasks and stay on top of
                your priorities.
              </p>
            </div>

            <button type="button" className="primary-button">
              + Add Task
            </button>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon total-icon">✓</div>
              <div>
                <span className="stat-label">Total Tasks</span>
                <strong>0</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending-icon">○</div>
              <div>
                <span className="stat-label">Pending</span>
                <strong>0</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon completed-icon">✓</div>
              <div>
                <span className="stat-label">Completed</span>
                <strong>0</strong>
              </div>
            </div>
          </section>

          <section className="tasks-section">
            <div className="section-heading">
              <div>
                <h3>Your Tasks</h3>
                <p>Your personal tasks will appear here.</p>
              </div>
            </div>

            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h3>No tasks yet</h3>
              <p>
                Create your first task and start organizing your work.
              </p>
              <button type="button" className="primary-button">
                Create Your First Task
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="background-shape shape-one" />
        <div className="background-shape shape-two" />
      </div>

      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-brand-icon">✓</div>
          <h1>Task Manager</h1>
          <p>Organize your work. Focus on what matters.</p>
        </div>

        <div className="auth-card">
          {authPage === "register" ? (
            <>
              <Register
                onRegisterSuccess={() => setAuthPage("login")}
              />

              <div className="auth-switch">
                <span>Already have an account?</span>
                <button
                  type="button"
                  onClick={() => setAuthPage("login")}
                >
                  Sign in
                </button>
              </div>
            </>
          ) : (
            <>
              <Login
                onLoginSuccess={() => setAuthPage("login")}
              />

              <div className="auth-switch">
                <span>Don't have an account?</span>
                <button
                  type="button"
                  onClick={() => setAuthPage("register")}
                >
                  Create one
                </button>
              </div>
            </>
          )}
        </div>

        <p className="auth-footer">
          Secure authentication powered by Firebase
        </p>
      </div>
    </div>
  );
}

export default App;