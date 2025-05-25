from fastapi import APIRouter
from pydantic import BaseModel
from app.services.vector_db_service import query_vector_db
from app.services.llm_service import llm_service

router = APIRouter()

class ChatQuery(BaseModel):
    question: str

@router.post("/chat")
async def chat(query: ChatQuery):
    results = query_vector_db(query.question)
    context = "\n\n".join(results['documents'][0])
    
    return {
        "answer": llm_service.generate_answer(context, query.question),
        "sources": [{
            "text": doc,
            "metadata": {k: v for k, v in meta.items() if v is not None}
        } for doc, meta in zip(results['documents'][0], results['metadatas'][0])]
    }