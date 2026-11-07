
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")

client = genai.Client(api_key=API_KEY) if API_KEY else None


async def generate_response(message: str) -> str:

    if client is None:
        raise RuntimeError(
            "GEMINI_API_KEY is missing from backend/.env"
        )

    response = await client.aio.models.generate_content(
        model=MODEL,
        contents=message,
        config=types.GenerateContentConfig(
            system_instruction=(
                "You are SENTRA, a helpful personal AI assistant. "
                "Be friendly, intelligent, clear and professional. "
                "Reply in the same language as the user. "
                "You can communicate in Sinhala and English."
            ),
            temperature=0.7,
            max_output_tokens=1024,
        ),
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty response.")

    return response.text
