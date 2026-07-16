import { getAccessToken, refreshAccessToken } from "./auth";
import type { ApiErrorResponse } from "@/types";

const API_BASE = "/api";

/**
 * Custom error class for API responses. Carries the status code
 * and the parsed error body from the backend.
 */
export class ApiError extends Error {
  status: number;
  data: ApiErrorResponse;

  constructor(status: number, data: ApiErrorResponse) {
    super(data.message);
    this.status = status;
    this.data = data;
  }
}

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

/**
 * Authenticated fetch wrapper.
 *
 * - Prepends /api base path (proxied through Next.js rewrites)
 * - Attaches Authorization header from in-memory token store
 * - Auto-retries once on 401 by refreshing the access token
 * - Throws ApiError on non-2xx responses
 */
export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, headers: customHeaders, ...rest } = options;

  const doFetch = async (token: string | null): Promise<Response> => {
    const headers: Record<string, string> = {
      ...(customHeaders as Record<string, string>),
    };

    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`${API_BASE}${path}`, {
      ...rest,
      headers,
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  };

  let res = await doFetch(getAccessToken());

  // Auto-retry on 401: attempt a silent token refresh
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      res = await doFetch(newToken);
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(res.status, data as ApiErrorResponse);
  }

  return data as T;
}
