# services/llm_service.py
from transformers import pipeline

class LLMService:
    def __init__(self):
        self.qa_pipeline = pipeline(
            "question-answering",
            model="deepset/gelectra-large-germanquad",  # German medical QA model
            device="cpu"  
        )

    def generate_answer(self, context: str, question: str) -> str:
        result = self.qa_pipeline(
            question=question,
            context=context,
            max_answer_len=200,
            handle_impossible_answer=True
        )
        return result["answer"] if result["answer"] else "I couldn't find a clear answer in the guidelines."

# Initialize during startup
llm_service = LLMService()