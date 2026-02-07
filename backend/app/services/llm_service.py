import os
import json
from typing import Dict, Any, List
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self, provider: str = "openai"):
        self.provider = provider
        # Initialize clients (mocking multi-provider for now by defaulting to OpenAI)
        self.openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def analyze_risk(self, text: str) -> Dict[str, Any]:
        """
        Analyzes the text using an LLM to extract risk factors and a summary.
        """
        if self.provider == "openai":
            return self._analyze_with_openai(text)
        else:
            raise NotImplementedError(f"Provider {self.provider} not implemented yet.")

    def _analyze_with_openai(self, text: str) -> Dict[str, Any]:
        prompt = f"""
        You are an expert police investigator assistant. Analyze the following police interview transcript/statement.
        
        **Goal**: Classify the risk factors based on the provided checklist and provide a summary.

        **Checklist Categories**:
        1. Execution Possibility (Target: detailed plan, weapon prep)
        2. Recurrence (Target: history of violence, conflicts, substance abuse)
        3. Resentment/Identification (Target: copycat behavior, focused anger)
        4. Mental Health (Target: symptoms, delusions)

        **Output Format**: JSON with the following structure:
        {{
            "summary": "Concise summary of the incident and key risks.",
            "risk_score": "High" | "Medium" | "Low",
            "checklist": [
                {{
                    "category": "Category Name",
                    "item": "Specific Risk Item",
                    "result": "Yes" | "No" | "Unknown",
                    "evidence": "Quote from text or 'N/A'"
                }}
            ]
        }}

        **Transcript**:
        {text[:15000]}  # Truncate to avoid context limit for prototype
        """

        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-4o",  # Use a smart model
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for risk analysis. Output only valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            return json.loads(content)
        except Exception as e:
            print(f"Error in LLM analysis: {e}")
            # Return a fallback or empty structure on error
            return {
                "summary": "Analysis failed.",
                "risk_score": "Unknown",
                "checklist": []
            }
