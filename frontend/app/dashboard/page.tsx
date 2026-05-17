"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div style={{ textAlign: "center" }}>
        <h2>Welcome to FluentAI!</h2>
        <p>Select an action to begin:</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <button onClick={() => router.push("/session")}>
            🎤 New Speaking Session
          </button>
          <button onClick={() => router.push("/history")}>
            📜 Session History
          </button>
          <button onClick={() => router.push("/profile")}>
            👤 Profile
          </button>
        </div>
        <p>
          Improve your speaking fluency with AI-powered feedback and coaching.
        </p>
      </div>
    </ProtectedRoute>
  );
}