import gradio as gr
import random

from .controller import FluentAIController

TOPICS = [
    "Describe your favorite hobby and why you enjoy it",
    "Talk about a memorable trip or vacation you took",
    "Explain what makes a good friend",
    "Describe your ideal weekend",
    "Talk about a book or movie that inspired you",
    "Explain how you stay motivated",
    "Describe your morning routine",
    "Talk about a skill you want to learn",
    "Explain the importance of education",
    "Describe your favorite season and why",
    "Talk about a challenge you overcame",
    "Explain what success means to you",
    "Describe your dream job",
    "Talk about the role of technology in daily life",
    "Explain how you handle stress"
]

class FluentAIGUI:
   
    def __init__(self, groq_api_key: str = None):
        self.controller = FluentAIController(groq_api_key=groq_api_key)
        self.current_topic = self.get_random_topic()

    @staticmethod
    def get_random_topic():
        return random.choice(TOPICS)

    def launch(self):
        with gr.Blocks(title="FluentAI - Linguistic Speaking Coach") as demo:
            gr.Markdown("""
            # 🎙️ FluentAI - AI Speaking Coach
            ### Practice, Get Feedback, Improve Your Speaking Skills!
            """)

            with gr.Row():
                with gr.Column():
                    gr.Markdown("### 📝 Your Speaking Topic:")
                    topic_display = gr.Textbox(
                        value=self.current_topic,
                        label="Speak about this topic for 60 seconds",
                        interactive=False,
                        lines=3
                    )
                    new_topic_btn = gr.Button("🔄 Get New Topic", size="sm")

            with gr.Row():
                with gr.Column():
                    gr.Markdown("### 🎤 Record Your Speech (60 seconds)")
                    audio_input = gr.Audio(
                        sources=["microphone"],
                        type="filepath",
                        label="Click to Record",
                        format="wav"
                    )
                    gr.Markdown("""
                    **Instructions:**
                    1. Read the topic above
                    2. Click the microphone to start recording
                    3. Speak for about 60 seconds
                    4. Click stop when done
                    5. Click "Analyze My Speech"
                    """)
                    analyze_btn = gr.Button("🚀 Analyze My Speech", variant="primary", size="lg")

            gr.Markdown("---")

            status = gr.Markdown("*Ready to analyze your speech!*")
            metrics_output = gr.Markdown("")
            audio_output = gr.Audio(label="AI Feedback (Audio)", type="filepath")
            feedback_output = gr.Markdown("")

            def on_new_topic():
                topic = self.get_random_topic()
                # Reset outputs for a fresh round
                status.update("*Ready to analyze your speech!*")
                metrics_output.update("")
                audio_output.update(None)
                feedback_output.update("")
                return topic

            def on_analyze(audio_file, topic):
                return self.controller.process(audio_file, topic)

            new_topic_btn.click(
                fn=lambda: self.get_random_topic(),
                outputs=[topic_display]
            )

            analyze_btn.click(
                fn=on_analyze,
                inputs=[audio_input, topic_display],
                outputs=[status, metrics_output, audio_output, feedback_output]
            )

            gr.Markdown("""
            ---
            ### 🔧 Technologies Used:
             - **STT**: Google Speech Recognition (free)
             - **Analysis**: Python (basic algorithms)
             - **LLM**: Groq API (Llama 3 - free tier)
             - **TTS**: Google Text-to-Speech (free)

            *Assignment Demo - FluentAI Speaking Coach*
            """)

        demo.launch(share=True, debug=True)