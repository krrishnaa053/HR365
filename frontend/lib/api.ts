import { supabase } from "@/lib/supabase";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8000";

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(options.headers || {});

  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let payload: any = null;

  try {
    payload = await response.json();
  } catch {
    payload = await response.text();
  }

  if (!response.ok) {
    const detail =
      typeof payload === "string"
        ? payload
        : payload?.detail || payload?.message || "API Error";

    throw new Error(detail || "API Error");
  }

  return payload as T;
}

export const api = {
  askHR: async (question: string) => {
    return apiFetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
  },

  getEmployees: async () => {
    return apiFetch("/api/employees", { method: "GET" });
  },

  getLeaves: async () => {
    return apiFetch("/api/leaves", { method: "GET" });
  },

  applyLeave: async (data: any) => {
    return apiFetch("/api/leaves", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateLeaveStatus: async (id: string, status: string) => {
    return apiFetch(`/api/leaves/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },

  approveLeave: async (id: string, status: string) => {
    return api.updateLeaveStatus(id, status);
  },
};
