import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  getTasks,
  type Task,
} from "./services/api";
import "./App.css";

type AuthPage = "login" | "register";

type TaskFilter = "all" | "pending" | "completed";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authPage, setAuthPage] = useState<AuthPage>("login");
  const [signingOut, setSigningOut] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskError, setTaskError] = useState("");

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskFilter, setTaskFilter] =
    useState<TaskFilter>("all");

  // Reference to the task form so Add Task and Edit
  // can automatically scroll the user to it.
  const taskFormRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setCheckingAuth(false);
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setTaskError("");
      return;
    }

    async function loadTasks() {
      setLoadingTasks(true);
      setTaskError("");

      try {
        const loadedTasks = await getTasks();
        setTasks(loadedTasks);
      } catch (err) {
        setTaskError(
          err instanceof Error
            ? err.message
            : "Unable to load your tasks.",
        );
      } finally {
        setLoadingTasks(false);
      }
    }

    void loadTasks();
  }, [user]);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await signOut(auth);
    } finally {
      setSigningOut(false);
    }
  }

  function handleTaskSaved(savedTask: Task) {
    setTasks((currentTasks) => {
      const existingIndex = currentTasks.findIndex(
        (task) => task.id === savedTask.id,
      );

      if (existingIndex === -1) {
        return [savedTask, ...currentTasks];
      }

      return currentTasks.map((task) =>
        task.id === savedTask.id ? savedTask : task,
      );
    });

    setShowTaskForm(false);
    setEditingTask(null);
  }

  function handleTaskUpdated(updatedTask: Task) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  }

  function handleTaskDeleted(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  function scrollToTaskForm() {
    setTimeout(() => {
      taskFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function openCreateForm() {
    setEditingTask(null);
    setShowTaskForm(true);

    scrollToTaskForm();
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setShowTaskForm(true);

    scrollToTaskForm();
  }

  function closeTaskForm() {
    setShowTaskForm(false);
    setEditingTask(null);
  }

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "pending") {
      return task.status === "pending";
    }

    if (taskFilter === "completed") {
      return task.status === "completed";
    }

    return true;
  });

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
      <div className="dashboard-shell">

        {/* =================================================
            LEFT PANEL
        ================================================= */}

        <aside className="dashboard-sidebar">

          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">
              ✓
            </div>

            <div>
              <h1>Task Manager</h1>
              <span>Personal workspace</span>
            </div>
          </div>

          <nav className="sidebar-navigation">

            <p className="sidebar-section-label">
              WORKSPACE
            </p>

            <button
              type="button"
              className={`sidebar-nav-item ${
                taskFilter === "all" ? "active" : ""
              }`}
              onClick={() => setTaskFilter("all")}
            >
              <span className="sidebar-nav-icon">
                ▦
              </span>

              <span>All Tasks</span>

              <span className="sidebar-count">
                {totalTasks}
              </span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${
                taskFilter === "pending" ? "active" : ""
              }`}
              onClick={() => setTaskFilter("pending")}
            >
              <span className="sidebar-nav-icon">
                ○
              </span>

              <span>Pending</span>

              <span className="sidebar-count">
                {pendingTasks}
              </span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${
                taskFilter === "completed" ? "active" : ""
              }`}
              onClick={() => setTaskFilter("completed")}
            >
              <span className="sidebar-nav-icon">
                ✓
              </span>

              <span>Completed</span>

              <span className="sidebar-count">
                {completedTasks}
              </span>
            </button>

          </nav>

          {/* LEFT PANEL ACCOUNT */}

          <div className="sidebar-bottom">

            <div className="sidebar-account">

              <p className="sidebar-section-label">
                ACCOUNT
              </p>

              <div className="sidebar-user">

                <div className="sidebar-avatar">
                  {user.email
                    ?.charAt(0)
                    .toUpperCase() ?? "U"}
                </div>

                <div className="sidebar-user-details">
                  <strong>Signed in</strong>
                  <span>{user.email}</span>
                </div>

              </div>

            </div>

            <button
              type="button"
              className="sidebar-signout"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              <span>↪</span>

              {signingOut
                ? "Signing out..."
                : "Sign Out"}
            </button>

          </div>
        </aside>


        {/* =================================================
            RIGHT / MAIN PANEL
        ================================================= */}

        <main className="dashboard-main">

          <div className="dashboard-container">

            {/* MAIN HEADER */}

            <section className="dashboard-header">

              <div className="dashboard-header-content">

                <p className="eyebrow">
                  OVERVIEW
                </p>

                <h2>
                  Welcome back!
                </h2>

                <p>
                  Manage your tasks and keep your
                  priorities organized.
                </p>

              </div>

              <div className="dashboard-header-actions">

                {/* SECOND SIGN OUT */}

                <button
                  type="button"
                  className="header-signout-button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                >
                  <span>↪</span>

                  {signingOut
                    ? "Signing out..."
                    : "Sign Out"}
                </button>

                <button
                  type="button"
                  className="primary-button dashboard-add-button"
                  onClick={openCreateForm}
                >
                  <span>+</span>
                  Add Task
                </button>

              </div>

            </section>


            {/* TASK FORM */}

            {showTaskForm && (
              <section
                ref={taskFormRef}
                className="task-form-section task-form-scroll-target"
              >

                <TaskForm
                  task={editingTask}
                  onSaved={handleTaskSaved}
                  onCancel={closeTaskForm}
                />

              </section>
            )}


            {/* STATISTICS */}

            <section className="dashboard-stats">

              <div className="dashboard-stat-card">

                <div className="dashboard-stat-icon total-stat-icon">
                  ▦
                </div>

                <div>
                  <span>Total Tasks</span>
                  <strong>{totalTasks}</strong>
                </div>

              </div>


              <div className="dashboard-stat-card">

                <div className="dashboard-stat-icon pending-stat-icon">
                  ○
                </div>

                <div>
                  <span>Pending</span>
                  <strong>{pendingTasks}</strong>
                </div>

              </div>


              <div className="dashboard-stat-card">

                <div className="dashboard-stat-icon completed-stat-icon">
                  ✓
                </div>

                <div>
                  <span>Completed</span>
                  <strong>{completedTasks}</strong>
                </div>

              </div>

            </section>


            {/* TASKS */}

            <section className="tasks-section dashboard-tasks-section">

              <div className="section-heading">

                <div>

                  <p className="eyebrow">
                    YOUR WORK
                  </p>

                  <h3>
                    {taskFilter === "all"
                      ? "Your Tasks"
                      : taskFilter === "pending"
                        ? "Pending Tasks"
                        : "Completed Tasks"}
                  </h3>

                  <p>
                    {filteredTasks.length === 0
                      ? "No tasks in this view."
                      : `${filteredTasks.length} task${
                          filteredTasks.length === 1
                            ? ""
                            : "s"
                        } in this view.`}
                  </p>

                </div>

                {totalTasks > 0 && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={openCreateForm}
                  >
                    + New Task
                  </button>
                )}

              </div>


              <TaskList
                tasks={filteredTasks}
                loading={loadingTasks}
                error={taskError}
                onUpdated={handleTaskUpdated}
                onDeleted={handleTaskDeleted}
                onEdit={openEditForm}
              />

            </section>

          </div>

        </main>

      </div>
    );
  }


  {/* =====================================================
      AUTHENTICATION
  ===================================================== */}

  return (
    <div className="auth-page">

      <div className="auth-background">
        <div className="background-shape shape-one" />
        <div className="background-shape shape-two" />
      </div>

      <div className="auth-container">

        <div className="auth-brand">

          <div className="auth-brand-icon">
            ✓
          </div>

          <h1>Task Manager</h1>

          <p>
            Organize your work. Focus on what matters.
          </p>

        </div>


        <div className="auth-card">

          {authPage === "register" ? (
            <>
              <Register
                onRegisterSuccess={() =>
                  setAuthPage("login")
                }
              />

              <div className="auth-switch">
                <span>
                  Already have an account?
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setAuthPage("login")
                  }
                >
                  Sign in
                </button>
              </div>
            </>
          ) : (
            <>
              <Login
                onLoginSuccess={() =>
                  setAuthPage("login")
                }
              />

              <div className="auth-switch">
                <span>
                  Don't have an account?
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setAuthPage("register")
                  }
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