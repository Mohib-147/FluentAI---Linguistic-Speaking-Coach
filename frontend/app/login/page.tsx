"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiLogin } from "../../lib/api";
import { saveToken } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await apiLogin(email, password);
      saveToken(res.token); // store JWT
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form style={{ maxWidth: 350 }} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%" }}>Log In</button>
      </form>
      {errorMsg && <div style={{ color: "red", marginTop: "1rem" }}>{errorMsg}</div>}
      <p style={{ marginTop: "1rem" }}>
        Don&apos;t have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}