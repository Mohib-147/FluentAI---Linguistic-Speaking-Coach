"use client";
import React from "react";
import Link from "next/link";
import { getToken, removeToken } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const authed = typeof window !== "undefined" && getToken();

  const handleLogout = () => {
    removeToken();
    router.push("/register");
  };

  return (
    <nav style={{
      width: "100%",
      background: "#2563eb",
      padding: "1rem 0",
      marginBottom: "2rem",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      gap: "2rem"
    }}>
      <Link href="/dashboard" style={{ color: "#fff", fontWeight: "bold" }}>FluentAI</Link>
      {authed && <>
        <Link href="/session" style={{ color: "#fff" }}>Session</Link>
        <Link href="/history" style={{ color: "#fff" }}>History</Link>
        <Link href="/profile" style={{ color: "#fff" }}>Profile</Link>
        <button style={{
          background: "transparent",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }} onClick={handleLogout}>Logout</button>
      </>}
      {!authed && <>
        <Link href="/register" style={{ color: "#fff" }}>Register</Link>
        <Link href="/login" style={{ color: "#fff" }}>Login</Link>
      </>}
    </nav>
  );
}