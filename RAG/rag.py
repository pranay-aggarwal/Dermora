import requests
import json
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# 🔑 Your updated Gemini API key
GEMINI_API_KEY = "AIzaSyAj3uT6kAar79xPTOIAgYgNMM_e7mlcvT4"
# 📄 Load your text file
with open("txtt.txt", "r", encoding="utf-8") as f:
    guide_text = f.read()

# ✂️ Split guide into chunks
def split_text(text, chunk_size=800, overlap=100):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size - overlap)]

chunks = split_text(guide_text)

# 🔍 Embed the chunks
print("🔁 Embedding knowledge base...")
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(chunks)

# 🧠 Build FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))

# 🤖 Function to call Gemini API
def call_gemini(prompt):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    response = requests.post(url, headers=headers, data=json.dumps(payload))
    if response.status_code == 200:
        try:
            return response.json()["candidates"][0]["content"]["parts"][0]["text"]
        except Exception:
            return "⚠️ Gemini returned an unexpected format."
    else:
        return f"❌ API Error {response.status_code}: {response.text}"

# 🧴 Main interactive loop
print("✅ RAG Agent Ready. Ask skincare questions:")
while True:
    query = input("\n💬 Your Question (or type 'exit'): ").strip()
    if query.lower() == "exit":
        print("👋 Exiting. Stay glowing!")
        break
    if not query:
        print("⚠️ Please enter a valid question.")
        continue

    # Retrieve relevant chunks
    query_vector = model.encode([query])
    _, indices = index.search(np.array(query_vector), k=3)
    context = "\n---\n".join([chunks[i] for i in indices[0]])

    # Create prompt for Gemini
    prompt = f"""You are a skincare expert. Based on the following guide, answer the user's question helpfully and clearly.

Guide:
{context}

User's Question: {query}
Answer:"""

    # Get Gemini response
    answer = call_gemini(prompt)
    print("\n✨ Answer:", answer)