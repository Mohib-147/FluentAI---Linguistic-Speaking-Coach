export const runtime = "nodejs";
import { NextRequest } from "next/server";
import axios from "axios";
import FormData from "form-data";
import { ok, error } from "@/lib/response";

export async function POST(req: NextRequest) {
  // Read multipart/form-data or base64 audio from body
  const form = new FormData();
  const data = await req.formData();
  const file = data.get("audio");
  if (!file) return error("No audio provided", 400);

  const blob = file as Blob;
  const arrBuffer = await blob.arrayBuffer();

  // Forward to Python backend (running at localhost:8001/analyze)
  form.append("audio", Buffer.from(arrBuffer), {
    filename: "speech.wav",
    contentType: "audio/wav", // or "audio/mp3" as applicable
  });

  try {
    const pyResp = await axios.post("http://localhost:8001/analyze", form, {
      headers: form.getHeaders(),
      timeout: 60000,
    });
    return ok(pyResp.data);
  } catch (err: any) {
    return error(
      "Python analysis service is down or errored: " + (err?.response?.data || err.message),
      500
    );
  }
}