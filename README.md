#  FluentAI - Linguistic Speaking Coach

FluentAI is a web-based application designed to help users practice and improve their spoken English. It provides instant feedback and constructive suggestions based on your speech, powered by state-of-the-art AI models and speech analysis techniques.

##  Features

- **Random Speaking Topic Generator**  
  Practice impromptu speaking sessions with a fresh random prompt each time.

- **Audio Recording**  
  Record your voice directly from the browser (no installations needed).

- **Speech-to-Text (STT) Transcription**  
  Uses Google Speech Recognition to transcribe your speech accurately.

- **Text Analysis & Scoring**  
  Detects filler words (like "um," "uh"), repeated words, and estimates your pause rate. Generates a fluency score out of 100.

- **AI-Generated Feedback**  
  Leverages Groq LLM (Llama 3) to provide encouraging, actionable spoken and written feedback.

- **Text-to-Speech (TTS) Playback**  
  Listen to the AI feedback in natural voice using Google Text-to-Speech.

- **User-Friendly Web Interface**  
  Built with Gradio for an easy and accessible speaking lab experience.

---

##  Technology Stack

- **Frontend & UI:** Gradio (Python)
- **Speech Recognition (STT):** Google Speech Recognition
- **AI Feedback (LLM):** Groq API (Llama 3)
- **Text-to-Speech (TTS):** gTTS (Google Text-to-Speech)
- **Backend Logic:** Python

---

##  Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Mohib-147/fluentai-linguistic-coach.git
cd fluentai-linguistic-coach
```

### 2. Install Dependencies

> **Recommended:** Use a Python virtual environment.

```bash
pip install -r requirements.txt
```
Or, individually:
```bash
pip install gradio groq gtts SpeechRecognition pydub
```

### 3. Set Your Groq API Key

- Get your free [Groq API Key](https://console.groq.com/).
- Create a `.env` file or set as an environment variable:
  ```bash
  export GROQ_API_KEY=your_groq_api_key_here
  ```

### 4. Run the Application

```bash
python fluentai.py
```

- The app will launch locally; follow the terminal link or use the public "share" link if available.

---

##  Demo

A live demo will be provided at evaluation time:  
**[Deployed App Link Here]**

---

##  User Instructions

1. Click "Get New Topic" to receive a speaking prompt.
2. Click the microphone to record your answer.
3. Speak on the topic for about 60 seconds, then stop recording.
4. Click "Analyze My Speech."
5. Review the analysis (score, word count, detected issues) and listen to your personalized AI feedback!

---

##  Project Structure

```
fluentai-linguistic-coach/
├── fluentai.py         # Main application code
├── requirements.txt
├── README.md
└── (other files...)
```

---

##  FAQ / Troubleshooting

- **Microphone is not working?**  
  Ensure your browser has microphone access enabled.

- **Transcription failed?**  
  Try again and speak clearly; avoid background noise.

- **API issues?**  
  Double-check your Groq API Key and internet connection.

---

##  Attribution & License

Developed as a semester project for [Course/Instructor Name].  
All third-party libraries used fall under their respective licenses.

---

##  Acknowledgments

- [Gradio](https://gradio.app/)
- [Groq LLM](https://groq.com/)
- [gTTS](https://pypi.org/project/gTTS/)
- [Google Speech Recognition](https://pypi.org/project/SpeechRecognition/)

---

_Keep practicing and speak with confidence!_
