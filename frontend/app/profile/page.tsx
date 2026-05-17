"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "../../lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string, email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user info
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      const res = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      }
      setLoading(false);
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>Unable to load user info. <button onClick={handleLogout}>Log out</button></div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>👤 Profile</h2>
      <div style={{ margin: "2rem 0" }}>
        <div><b>Username:</b> {user.username}</div>
        <div><b>Email:</b> {user.email}</div>
      </div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}