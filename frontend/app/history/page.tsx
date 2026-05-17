"use client";

import React, { useEffect, useState } from "react";
import { getToken } from "../../lib/auth";

interface SessionItem {
  id: number;
  topic_id: number;
  score: number;
  created_at: string;
  // ...add other fields as returned by backend
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      const token = getToken();
      if (!token) return;
      const res = await fetch("/api/speaking_sessions/list", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSessions(data.data);
      }
      setLoading(false);
    };
    fetchSessions();
  }, []);

  return (
    <div>
      <h2>📜 Speaking Session History</h2>
      {loading && <div>Loading...</div>}
      {!loading && sessions.length === 0 && <div>No sessions found yet.</div>}
      <ul>
        {sessions.map(s => (
          <li key={s.id} style={{
            margin: "1rem 0",
            padding: "1rem",
            background: "#f5f5f5",
            borderRadius: 8
          }}>
            <b>Session #{s.id}</b> <br />
            <span>Date: {new Date(s.created_at).toLocaleString()}</span><br />
            <span>Score: {s.score ?? "N/A"}</span>
            {/* Add more details as desired */}
          </li>
        ))}
      </ul>
    </div>
  );
}