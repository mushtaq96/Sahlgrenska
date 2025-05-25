from fastapi import APIRouter, UploadFile, File
import pdfplumber
from app.services.vector_db_service import add_pdf_chunks_to_vector_db

router = APIRouter()

def chunk_text(text, chunk_size=500):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    pdf = pdfplumber.open(file.file)
    full_text = ""
    for page in pdf.pages:
        full_text += page.extract_text() or ""
    chunks = chunk_text(full_text)
    ids = [f"{file.filename}_{i}" for i in range(len(chunks))]  # Generate unique IDs
    metadatas = [{"filename": file.filename, "page": i} for i in range(len(chunks))]
    add_pdf_chunks_to_vector_db(ids, chunks, metadatas)  # Pass IDs
    return {"status": "success", "chunks_added": len(chunks)}

