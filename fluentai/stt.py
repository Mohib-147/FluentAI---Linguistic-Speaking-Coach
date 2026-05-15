import speech_recognition as sr
from typing import Optional

class SpeechToText:
    def __init__(self):
        self.recognizer = sr.Recognizer()

    def transcribe(self, audio_path: str) -> Optional[str]:
        """
        Transcribe speech from an audio file (WAV format) to text.
        
        Args:
            audio_path (str): Path to the audio file.
        
        Returns:
            str: Transcribed text, or None if transcription fails.
        """
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