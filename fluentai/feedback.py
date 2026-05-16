

import os
from typing import List
from groq import Groq

class FeedbackGenerator:
   

    def __init__(self, groq_api_key: str = None):
        self.groq_api_key = groq_api_key or os.getenv("GROQ_API_KEY")
        if self.groq_api_key:
            try:
                self.groq_client = Groq(api_key=self.groq_api_key)
            except Exception as e:
                print(f"[Groq API init error] {e}")
                self.groq_client = None
        else:
            self.groq_client = None

    def generate_feedback(
        self,
        topic: str,
        transcription: str,
        score: int,
        word_count: int,
        filler_count: int,
        found_fillers: List[str],
        repeat_count: int,
        repeated_words: List[str],
        pause_level: str,
    ) -> str:
       
        if not self.groq_client or not self.groq_api_key:
            return self.generate_simple_feedback(score, word_count, filler_count, repeat_count, pause_level)

        prompt = f"""
            You are an encouraging speaking coach. A student just spoke for 60 seconds on the topic: "{topic}"

            Their transcription: "{transcription}"

            Performance:
            - Fluency Score: {score}/100
            - Total Words: {word_count}
            - Filler Words: {filler_count} ({', '.join(found_fillers) if found_fillers else 'none'})
            - Repeated Words: {repeat_count}
            - Pause Pattern: {pause_level}

            Generate brief, encouraging feedback (200-300 words):
            1. Start with positive encouragement
            2. Mention their score
            3. Highlight what they did well
            4. Gently suggest ONE improvement area
            5. End with motivation

            Be warm, specific, and supportive. Keep it simple and actionable.
            """

        try:
            response = self.groq_client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama3-8b-8192",
                temperature=0.7,
                max_tokens=300
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"[LLM Feedback Error] {e}")
            return self.generate_simple_feedback(score, word_count, filler_count, repeat_count, pause_level)

    def generate_simple_feedback(
        self,
        score: int,
        word_count: int,
        filler_count: int,
        repeat_count: int,
        pause_level: str,
    ) -> str:
        feedback = ""

        if score >= 80:
            feedback += f"Your fluency score of {score}/100 is excellent! You demonstrated strong speaking skills. "
        elif score >= 60:
            feedback += f"Your fluency score of {score}/100 is good! You're on the right track. "
        else:
            feedback += f"Your fluency score of {score}/100 shows you're developing your skills. Keep practicing! "

        feedback += f"You spoke {word_count} words, which shows "
        if word_count >= 120:
            feedback += "good pacing and fluency. "
        else:
            feedback += "you can work on speaking more continuously. "

        if filler_count <= 3:
            feedback += "Excellent control over filler words! "
        elif filler_count <= 8:
            feedback += f"You used {filler_count} filler words. Try pausing briefly instead of saying 'um' or 'like'. "
        else:
            feedback += f"You used {filler_count} filler words. Before speaking, take a breath to collect thoughts. "

        if pause_level == "Normal":
            feedback += "Your pacing was natural with good pause timing. "
        elif pause_level == "Many":
            feedback += "Try to reduce long pauses by thinking ahead while speaking. "
        else:
            feedback += "Consider adding more natural pauses to emphasize key points. "

        feedback += "Keep practicing regularly - consistency is key to improvement! You're doing great! 🌟"
        return feedback