/**
 * Client-side auth token store.
 *
 * Access tokens are stored in memory (not localStorage) for security.
 * The refresh token lives in an HTTP-only cookie managed by the backend.
 */

let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}

/**
 * Attempts a silent refresh using the HTTP-only refresh cookie.
 * Returns the new access token on success, null on failure.
 */
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      clearAccessToken();
      return null;
    }

    const data = await res.json();
    const newToken = data.accessToken as string;
    setAccessToken(newToken);
    return newToken;
  } catch {
    clearAccessToken();
    return null;
  }
}
