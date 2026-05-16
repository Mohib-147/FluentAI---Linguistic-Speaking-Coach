import os
from .ui import FluentAIGUI

def main():
    groq_api_key = os.getenv("GROQ_API_KEY")
    app = FluentAIGUI(groq_api_key=groq_api_key)
    app.launch()

if __name__ == "__main__":
    main()