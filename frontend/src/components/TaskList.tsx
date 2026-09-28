import type { Task } from "../services/api";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
  error: string;
  onUpdated: (task: Task) => void;
  onDeleted: (taskId: string) => void;
  onEdit: (task: Task) => void;
};

export default function TaskList({
  tasks,
  loading,
  error,
  onUpdated,
  onDeleted,
  onEdit,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="task-list-state">
        <div className="loading-spinner" aria-hidden="true" />
        <p>Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-state task-list-error">
        <div className="state-icon" aria-hidden="true">
          !
        </div>
        <h3>Unable to load tasks</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-state task-list-empty">
        <div className="state-icon" aria-hidden="true">
          ✓
        </div>
        <h3>No tasks yet</h3>
        <p>
          Create your first task to start organizing your work.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}