import chromadb
from sentence_transformers import SentenceTransformer

chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="guidelines")
embedder = SentenceTransformer("all-MiniLM-L6-v2")

def add_pdf_chunks_to_vector_db(ids, chunks, metadatas):
    try:
        embeddings = embedder.encode(chunks).tolist()
        collection.add(
            ids=ids,
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadatas
        )
    except Exception as e:
        raise RuntimeError(f"Failed to add chunks to vector database: {str(e)}")

def query_vector_db(query, top_k=3):
    try:
        query_embedding = embedder.encode([query]).tolist()[0]
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            include=["metadatas", "documents"]
        )
        return results
    except Exception as e:
        raise RuntimeError(f"Failed to query vector database: {str(e)}")