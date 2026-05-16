from gtts import gTTS
import tempfile
from typing import Optional

class TTSModule:
    
    def synthesize(self, text: str) -> Optional[str]:
        try:
            tts = gTTS(text=text, lang='en', slow=False)
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3')
            tts.save(temp_file.name)
            return temp_file.name
        except Exception as e:
            print(f"[TTS Error] {e}")
            return None