"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRegister } from "../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await apiRegister(username, email, password);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form style={{ maxWidth: 350 }} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
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
          autoComplete="new-password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%" }}>Register</button>
      </form>
      {errorMsg && <div style={{ color: "red", marginTop: "1rem" }}>{errorMsg}</div>}
      {success && (
        <div style={{ color: "green", marginTop: "1rem" }}>
          Registration successful! Redirecting to login...
        </div>
      )}
      <p style={{ marginTop: "1rem" }}>
        Already have an account? <a href="/login">Log in here</a>
      </p>
    </div>
  );
}