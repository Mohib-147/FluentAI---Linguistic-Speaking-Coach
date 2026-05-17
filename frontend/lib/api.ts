// Example: Register call
export async function apiRegister(username: string, email: string, password: string) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Registration failed");
  }
  return await res.json();
}

// Example: Login call
export async function apiLogin(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  // Assuming your backend responds with { success: true, data: { token, user } }
  return data.data;
}

// You can add more API helpers here, e.g., getUser, analyze, etc.