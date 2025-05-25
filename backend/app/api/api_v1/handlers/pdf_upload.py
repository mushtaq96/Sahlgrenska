from fastapi import APIRouter, UploadFile, File, HTTPException
import pdfplumber
import re
from  app.services.vector_db_service import add_pdf_chunks_to_vector_db

router = APIRouter()

def extract_sections(text):
    sections = []
    current_section = ""
    current_page = 1
    
    for line in text.split('\n'):
        # Detect page breaks (adjust pattern based on your PDF)
        if "PAGE_BREAK_" in line:
            current_page = int(line.split("_")[-1])
            continue
            
        # Detect section headers (e.g., "3.1 Antibiotics" or "SECTION 2:")
        if re.match(r'^(\d+\.\d+\s+.+)|^(SECTION\s+\d+:?.+)', line.strip(), re.IGNORECASE):
            if current_section:
                sections.append({
                    "text": current_section.strip(),
                    "page": current_page
                })
            current_section = f"HEADER: {line}\n"
        else:
            current_section += line + "\n"
    
    if current_section.strip():
        sections.append({
            "text": current_section.strip(),
            "page": current_page
        })
    return sections

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        with pdfplumber.open(file.file) as pdf:
            full_text = ""
            for i, page in enumerate(pdf.pages, start=1):
                text = page.extract_text() or ""
                full_text += f"PAGE_BREAK_{i}\n{text}\n"
            
            sections = extract_sections(full_text)
            
            if not sections:
                raise HTTPException(400, "No sections found in document")
            
            # Prepare for vector DB
            chunks = []
            metadatas = []
            
            for i, section in enumerate(sections):
                # Extract section number from header if exists
                section_header = ""
                if section["text"].startswith("HEADER:"):
                    header_part = section["text"].split("\n")[0]
                    section_header = header_part.replace("HEADER:", "").strip()
                
                chunks.append(section["text"])
                metadatas.append({
                    "filename": file.filename,
                    "page": section["page"],
                    "section": section_header or f"Section_{i+1}"
                })
            
            add_pdf_chunks_to_vector_db(
                ids=[f"{file.filename}_{i}" for i in range(len(chunks))],
                chunks=chunks,
                metadatas=metadatas
            )
            
            return {
                "status": "success",
                "chunks_added": len(chunks),
                "pages_processed": len(pdf.pages)
            }
            
    except Exception as e:
        raise HTTPException(500, f"PDF processing failed: {str(e)}")