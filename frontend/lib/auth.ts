// Set JWT in localStorage (never in cookies for JS-only apps)
export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", token);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwt");
  }
  return null;
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
}

// Optionally, add JWT decode/validate helpers