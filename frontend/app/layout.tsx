import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "FluentAI Speaking Coach",
  description: "AI-powered fluency and speaking practice",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}