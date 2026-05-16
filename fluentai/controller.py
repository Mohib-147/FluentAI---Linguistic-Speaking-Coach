from .stt import SpeechToText
from .analysis import TextAnalyzer
from .scoring import Scorer
from .feedback import FeedbackGenerator
from .tts import TTSModule

from typing import Tuple, Optional, Any

class FluentAIController:

    def __init__(self, groq_api_key: str = None):
        self.stt = SpeechToText()
        self.analyzer = TextAnalyzer()
        self.scorer = Scorer()
        self.feedbacker = FeedbackGenerator(groq_api_key=groq_api_key)
        self.tts = TTSModule()

    def process(self, audio_filepath: str, topic: str) -> Tuple[str, str, Optional[str], str]:
    
        if not audio_filepath:
            return ("No audio recorded!", "", None, "")

        transcription = self.stt.transcribe(audio_filepath)
        if not transcription or len(transcription) < 10:
            return ("Transcription too short or unclear. Please speak more clearly and try again.", "", None, "")

        word_count = len(transcription.split())

        filler_count, found_fillers = self.analyzer.detect_filler_words(transcription)
        repeat_count, repeated_words = self.analyzer.detect_repeated_words(transcription)
        try:
            import wave
            with wave.open(audio_filepath, "rb") as wav_file:
                frames = wav_file.getnframes()
                rate = wav_file.getframerate()
                audio_duration = frames / float(rate)
        except Exception:
            audio_duration = 60.0  

        pause_count, pause_level = self.analyzer.estimate_pause_level(audio_duration, word_count)
        
        score = self.scorer.calculate_score(
            word_count, filler_count, repeat_count, pause_level, audio_duration)

        metrics_md = f"""
## 📊 Your Speech Analysis

### 🎯 Fluency Score: **{score}/100**

---

| Metric             | Result                                              |
|--------------------|----------------------------------------------------|
| **Total Words**    | {word_count} words                                 |
| **Speaking Time**  | ~{int(audio_duration)} seconds                     |
| **Filler Words**   | {filler_count} ({'✅ Good' if filler_count <= 5 else '⚠️ Too many'}) |
| **Repeated Words** | {repeat_count} ({'✅ Good' if repeat_count <= 2 else '⚠️ Work on this'}) |
| **Pause Pattern**  | {pause_level} ({'✅ Good' if pause_level == 'Normal' else '⚠️ Adjust'}) |

---

### 🗣️ What You Said:
*"{transcription}"*

{f"**Filler words detected:** {', '.join(found_fillers)}" if found_fillers else ""}
{f"**Repeated words:** {', '.join(set(repeated_words))}" if repeated_words else ""}
"""

        feedback_txt = self.feedbacker.generate_feedback(
            topic, transcription, score, word_count, filler_count, found_fillers,
            repeat_count, repeated_words, pause_level
        )

        feedback_md = f"""
## 🎓 AI Coach Feedback

{feedback_txt}

---

*💡 Listen to the audio above while reviewing your analysis!*
"""
        audio_feedback_path = self.tts.synthesize(feedback_txt)

        status = "✅ Analysis Complete! 🎉"
        return (status, metrics_md, audio_feedback_path, feedback_md)