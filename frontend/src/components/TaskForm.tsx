import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  createTask,
  updateTask,
  type Task,
} from "../services/api";

type TaskFormProps = {
  task?: Task | null;
  onSaved: (task: Task) => void;
  onCancel: () => void;
};

function formatDateForInput(date: string | null): string {
  if (!date) {
    return "";
  }

  return date.slice(0, 10);
}

function isPastDate(date: string): boolean {
  if (!date) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${date}T00:00:00`);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate < today;
}

export default function TaskForm({
  task,
  onSaved,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(
    task?.description ?? "",
  );
  const [dueDate, setDueDate] = useState(
    formatDateForInput(task?.dueDate ?? null),
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const editing = Boolean(task);

  useEffect(() => {
    setTitle(task?.title ?? "");
    setDescription(task?.description ?? "");
    setDueDate(formatDateForInput(task?.dueDate ?? null));
    setError("");
  }, [task]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title is required.");
      return;
    }

    if (dueDate && isPastDate(dueDate)) {
      setError("Due date cannot be in the past.");
      return;
    }

    setSaving(true);

    try {
      const data = {
        title: trimmedTitle,
        description: description.trim(),
        ...(dueDate ? { dueDate } : {}),
      };

      const savedTask = editing
        ? await updateTask(task!.id, data)
        : await createTask(data);

      onSaved(savedTask);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save the task.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="task-form-card">
      <div className="task-form-header">
        <div>
          <p className="eyebrow">
            {editing ? "EDIT TASK" : "NEW TASK"}
          </p>
          <h3>{editing ? "Edit task" : "Create a task"}</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-field">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to be done?"
            maxLength={120}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add some details..."
            maxLength={2000}
            rows={4}
          />
        </div>

        <div className="form-field">
          <label htmlFor="task-due-date">Due date</label>
          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(event) => {
              setDueDate(event.target.value);
              setError("");
            }}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="task-form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editing
                ? "Save Changes"
                : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}