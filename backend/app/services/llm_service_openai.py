# llm_service.py
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

# Initialize OpenAI client with the API key
client = OpenAI(api_key=api_key)

def generate_answer(context, question):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You're a German medical assistant. Answer ONLY using the provided context."},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {question}"}
        ],
        temperature=0.1
    )
    return response.choices[0].message.content