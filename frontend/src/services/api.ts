import { auth } from "../firebase";

const API_URL = import.meta.env.VITE_API_URL;

async function getAuthHeaders(): Promise<HeadersInit> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be signed in.");
  }

  const token = await user.getIdToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "An unexpected error occurred.";

    try {
      const data = await response.json();
      message = data.message ?? message;
    } catch {
      // Keep the default message when the response isn't JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text.trim()) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  dueDate?: string;
};

export type UpdateTaskInput = {
  title?: string;
  description?: string;
  status?: "pending" | "completed";
  dueDate?: string;
};

export async function getTasks(): Promise<Task[]> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/tasks`, {
    method: "GET",
    headers,
  });

  return handleResponse<Task[]>(response);
}

export async function createTask(
  input: CreateTaskInput,
): Promise<Task> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify(input),
  });

  return handleResponse<Task>(response);
}

export async function updateTask(
  taskId: string,
  input: UpdateTaskInput,
): Promise<Task> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(input),
  });

  return handleResponse<Task>(response);
}

export async function deleteTask(taskId: string): Promise<void> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers,
  });

  await handleResponse<void>(response);
}