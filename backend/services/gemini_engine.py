import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

SYSTEM_PROMPT = """
You are an AI Supply Chain Risk Analyst. 
Analyze the provided news and return a JSON object ONLY.
Required Keys:
- impact_score: (0-10)
- affected_node: (e.g., "Suez Canal", "Port of Rotterdam")
- transport_mode: ("Sea", "Air", "Land")
- delay_estimate_days: (int)
- recommendation: (Short string, e.g., "Reroute to Air")
- summary: (1 sentence summary)
"""

def analyze_news_content(text: str):
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        system_instruction=SYSTEM_PROMPT
    )
    
    response = model.generate_content(
        text, 
        generation_config={"response_mime_type": "application/json"}
    )
    return json.loads(response.text)