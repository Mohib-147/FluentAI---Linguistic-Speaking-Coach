"use client";
import React from "react";

interface Props {
  result: any; // Adjust type for your API structure
}

export default function SessionAnalysis({ result }: Props) {
  if (!result) return null;
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>AI Analysis</h3>
      <pre style={{ textAlign: "left", background: "#f5f5f5", padding: "1rem" }}>
        {JSON.stringify(result, null, 2)}
      </pre>
      {result.feedback_audio_url && (
        <>
          <b>AI Coach Audio:</b>
          <audio controls src={result.feedback_audio_url}></audio>
        </>
      )}
    </div>
  );
}