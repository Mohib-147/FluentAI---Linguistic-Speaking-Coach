"use client";

import React, { useRef, useState } from "react";

export default function SessionPage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Recording controls
  const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorderRef.current.ondataavailable = event => {
      if (event.data.size > 0) audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      setAudioUrl(URL.createObjectURL(audioBlob));
      uploadAudio(audioBlob);
    };

    mediaRecorderRef.current.start();
  };

  const handleStop = () => {
    mediaRecorderRef.current?.stop();
  };

  // Upload audio to analyze API
  const uploadAudio = async (blob: Blob) => {
    setAnalyzing(true);
    const form = new FormData();
    form.append("audio", blob, "speech.wav");
    const res = await fetch("/api/analyze", {
      method: "POST",
      body: form,
    });
    const json = await res.json();
    setResult(json.data);
    setAnalyzing(false);
  };

  return (
    <div>
      <h2>🎙️ New Speaking Session</h2>
      <p>Click Start, speak about your topic for 60 seconds, then click Stop.</p>
      <div>
        <button onClick={handleStart} style={{ marginRight: 8 }}>Start Recording</button>
        <button onClick={handleStop}>Stop Recording</button>
      </div>
      {audioUrl && (
        <div style={{ marginTop: "1rem" }}>
          <b>Your Recording:</b><br />
          <audio controls src={audioUrl}></audio>
        </div>
      )}
      {analyzing && <div>Analyzing your speech...</div>}
      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>AI Analysis</h3>
          {/* Pretty print key metrics/feedback */}
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
      )}
    </div>
  );
}