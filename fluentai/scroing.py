

class Scorer:

    def calculate_score(
        self, 
        word_count: int, 
        filler_count: int, 
        repeat_count: int, 
        pause_level: str, 
        audio_duration: float
    ) -> int:
        
        if 100 <= word_count <= 200:
            word_score = 30
        elif 80 <= word_count < 100 or 200 < word_count <= 220:
            word_score = 25
        elif 60 <= word_count < 80 or 220 < word_count <= 250:
            word_score = 20
        else:
            word_score = 15

        if filler_count <= 2:
            filler_score = 30
        elif filler_count <= 5:
            filler_score = 25
        elif filler_count <= 10:
            filler_score = 20
        elif filler_count <= 15:
            filler_score = 15
        else:
            filler_score = 10

        if repeat_count == 0:
            repeat_score = 20
        elif repeat_count <= 2:
            repeat_score = 15
        elif repeat_count <= 4:
            repeat_score = 10
        else:
            repeat_score = 5

        if pause_level == "Normal":
            pause_score = 20
        elif pause_level == "Few":
            pause_score = 15
        else:
            pause_score = 10

        total_score = word_score + filler_score + repeat_score + pause_score
        return total_score