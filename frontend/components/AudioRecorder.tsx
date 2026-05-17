"use client";
import React, { useRef, useState } from "react";

type Props = {
  onRecordingComplete: (audioBlob: Blob) => void;
};

export default function AudioRecorder({ onRecordingComplete }: Props) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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
      onRecordingComplete(audioBlob);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handleStop = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={handleStart} disabled={recording}>Start Recording</button>
      <button onClick={handleStop} disabled={!recording}>Stop Recording</button>
      {audioUrl && <div><audio controls src={audioUrl} /></div>}
    </div>
  );
}