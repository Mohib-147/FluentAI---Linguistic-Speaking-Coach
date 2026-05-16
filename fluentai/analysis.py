from typing import List, Tuple

FILLER_WORDS = ['um', 'uh', 'uhm', 'hmm', 'like', 'you know', 'actually', 'basically']

class TextAnalyzer:

    def detect_filler_words(self, text: str) -> Tuple[int, List[str]]:
        text_lower = text.lower()
        filler_count = 0
        found_fillers = []
        for filler in FILLER_WORDS:
            count = text_lower.count(filler)
            if count > 0:
                filler_count += count
                found_fillers.append(f"{filler} ({count}x)")
        return filler_count, found_fillers

    def detect_repeated_words(self, text: str) -> Tuple[int, List[str]]:
        words = text.lower().split()
        repeated = []
        repeat_count = 0
        for i in range(len(words) - 1):
            if words[i] == words[i + 1] and len(words[i]) > 2:
                repeated.append(words[i])
                repeat_count += 1
        return repeat_count, repeated

    def estimate_pause_level(self, audio_duration_sec: float, word_count: int) -> Tuple[int, str]:
        expected_words = audio_duration_sec * 2.5
        if word_count < expected_words * 0.7:
            estimated_pauses = int((expected_words - word_count) / 10)
            return max(estimated_pauses, 1), "Many"
        elif word_count > expected_words * 1.3:
            return 1, "Few"
        else:
            return 3, "Normal"