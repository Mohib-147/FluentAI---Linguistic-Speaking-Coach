"use client";
import { getToken } from "../lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (!getToken()) {
      router.replace("/register"); // or "/login"
    }
  }, [router]);
  return <>{children}</>;
}