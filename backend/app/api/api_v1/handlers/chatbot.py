from fastapi import APIRouter
from pydantic import BaseModel
from app.services.vector_db_service import query_vector_db

router = APIRouter()

class ChatQuery(BaseModel):
    question: str

@router.post("/chat")
async def chat(query: ChatQuery):
    results = query_vector_db(query.question)
    context = "\n".join(results['documents'][0])
    return {"context": context, "sources": results['metadatas'][0]}
