import speech_recognition as sr
from typing import Optional

class SpeechToText:
    def __init__(self):
        self.recognizer = sr.Recognizer()

    def transcribe(self, audio_path: str) -> Optional[str]:
        try:
            with sr.AudioFile(audio_path) as source:
                audio_data = self.recognizer.record(source)
            text = self.recognizer.recognize_google(audio_data)
            return text
        except sr.UnknownValueError:
            return None
        except Exception as e:
            print(f"[STT Error] {e}")
            return None