import { useState } from "react";
import {
  deleteTask,
  updateTask,
  type Task,
} from "../services/api";

type TaskCardProps = {
  task: Task;
  onUpdated: (task: Task) => void;
  onDeleted: (taskId: string) => void;
  onEdit: (task: Task) => void;
};

function formatDueDate(date: string | null): string {
  if (!date) {
    return "No due date";
  }

  const parsed = new Date(`${date.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return "No due date";
  }

  return parsed.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TaskCard({
  task,
  onUpdated,
  onDeleted,
  onEdit,
}: TaskCardProps) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [error, setError] = useState("");

  const completed = task.status === "completed";

  async function handleToggleStatus() {
    setError("");
    setUpdating(true);

    try {
      const updated = await updateTask(task.id, {
        status: completed ? "pending" : "completed",
      });

      onUpdated(updated);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update the task.",
      );
    } finally {
      setUpdating(false);
    }
  }

  function handleDeleteClick() {
    setError("");
    setDeleteConfirmation(true);
  }

  function cancelDelete() {
    if (!deleting) {
      setDeleteConfirmation(false);
    }
  }

  async function confirmDelete() {
    setError("");
    setDeleting(true);

    try {
      await deleteTask(task.id);
      onDeleted(task.id);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete the task.",
      );

      setDeleting(false);
      setDeleteConfirmation(false);
    }
  }

  return (
    <>
      <article
        className={`task-card ${completed ? "task-completed" : ""}`}
      >
        <div className="task-card-main">
          <button
            type="button"
            className={`task-checkbox ${
              completed ? "task-checkbox-checked" : ""
            }`}
            onClick={handleToggleStatus}
            disabled={updating || deleting}
            aria-label={
              completed
                ? "Mark task as pending"
                : "Mark task as completed"
            }
          >
            {completed ? "✓" : ""}
          </button>

          <div className="task-content">
            <div className="task-title-row">
              <h4>{task.title}</h4>

              <span
                className={`task-status ${
                  completed
                    ? "status-completed"
                    : "status-pending"
                }`}
              >
                {completed ? "Completed" : "Pending"}
              </span>
            </div>

            {task.description && (
              <p className="task-description">
                {task.description}
              </p>
            )}

            <div className="task-meta">
              <span>Due: {formatDueDate(task.dueDate)}</span>
            </div>

            {error && <p className="task-error">{error}</p>}
          </div>
        </div>

        <div className="task-actions">
          <button
            type="button"
            className="task-action-button"
            onClick={() => onEdit(task)}
            disabled={updating || deleting}
          >
            Edit
          </button>

          <button
            type="button"
            className="task-action-button task-delete-button"
            onClick={handleDeleteClick}
            disabled={updating || deleting}
          >
            Delete
          </button>
        </div>
      </article>

      {deleteConfirmation && (
        <div
          className="delete-confirmation-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirmation-title"
        >
          <div className="delete-confirmation-card">
            <div className="delete-confirmation-icon">
              !
            </div>

            <div className="delete-confirmation-content">
              <h3 id="delete-confirmation-title">
                Delete task?
              </h3>

              <p>
                Are you sure you want to delete{" "}
                <strong>"{task.title}"</strong>?
              </p>

              <span>
                This action cannot be undone.
              </span>
            </div>

            <div className="delete-confirmation-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={cancelDelete}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-button"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}