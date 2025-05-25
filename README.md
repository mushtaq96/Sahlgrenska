# 🦠 Sahlgrenska Global Health Hackathon - Challenge 4  
## AI-Powered Infection Control Assistant

This is an implementation of an **AI-powered infection control assistant** that helps healthcare professionals and patients make **evidence-based decisions** to prevent antimicrobial resistance (AMR) and reduce healthcare-associated infections (HAIs). It combines **clinical guidelines**, **local resistance data**, and **AI-driven insights** into a single intuitive interface.

The system includes:

- A **chatbot** that answers infection control questions using clinical knowledge.
- A **searchable knowledge base** built from PDFs containing WHO/CDC/GLASS guidelines.
- A secure **FastAPI backend** with JWT authentication.
- A clean **React frontend** powered by Chakra UI.

---

## 🚀 Features

- 🔍 **Smart Chatbot**: Ask infection control questions and get context-aware answers.
- 📄 **PDF Upload & Search**: Upload clinical documents and search through them using semantic similarity.
- 💬 **Personalized Recommendations**: Tailored guidance based on user input and evidence-based practices.
- 🔐 **JWT Authentication**: Secure login and token refresh mechanism.
- 🧠 **Vector DB + LLM**: Powered by `SentenceTransformer` and `ChromaDB` for intelligent document retrieval.

---

## 🧪 Tech Stack

### Backend
- **FastAPI** – High-performance API framework
- **SQLModel** – ORM for database modeling
- **JWT** – Token-based authentication
- **ChromaDB** – Vector database for similarity search
- **Sentence Transformers** – Embedding model (`all-MiniLM-L6-v2`)
- **SQLite** – For todo/user data (can be swapped with PostgreSQL)

### Frontend
- **React** + **TypeScript**
- **Vite** – Fast dev server and bundler
- **Chakra UI** – Accessible and composable component library
- **Axios** – HTTP client for API calls

---

## 🗂️ Project Structure

```
/backend              # FastAPI backend
  /app                # Main application logic
  /models             # SQLModels for User/Todo
  /services           # Business logic
  /api                # API routes
  /core               # Config, security, etc.
  /database.py        # DB connection setup

/frontend             # React frontend
  /src
    /components       # Reusable components
    /pages            # App pages (login, chat, upload)
    /hooks            # Custom hooks
    /services         # API service wrappers
```

---

## 🛠️ Setup Instructions

### 1. Install Backend Dependencies

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

> Optional: Install dev dependencies for testing
```bash
pip install -r dev-requirements.txt
```

### 2. Set Environment Variables

Create `.env` file in `/backend`:
```env
JWT_SECRET_KEY=my-secret
JWT_REFRESH_SECRET_KEY=another-secret
SQL_CONNECTION_STRING=sqlite:///database.db
```

### 3. Initialize Database

```bash
python -c "from database import create_db_and_tables; create_db_and_tables()"
```

### 4. Start Backend Server

```bash
uvicorn app.main:app --reload --port 8000
```

### 5. Install & Run Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Your app will be available at [http://localhost:5173](http://localhost:5173)

---

## 🧬 APIs Available

| Endpoint         | Method | Description                          |
|------------------|--------|--------------------------------------|
| `/auth/login`    | POST   | Authenticate user                    |
| `/chat`          | POST   | Chat with the AI assistant           |
| `/upload-pdf`    | POST   | Upload and process clinical PDFs     |
| `/todo`          | CRUD   | Todo management                      |
| `/users`         | CRUD   | User management                      |
| `/health`        | GET    | Check backend status                 |

---

## 🧑‍💻 Demo

![Demo GIF](./Anton%20AI%20Demo-1.gif)

> Replace `demo.gif` with your actual demo animation or screen recording showing the chatbot and PDF upload features.

---

## 📚 Integration with GLASS & CDC Data

This project supports uploading and querying:

- **WHO GLASS Reports**
- **CDC Core Infection Control Practices**
- **Antimicrobial Resistance Surveillance Data**

You can upload these as PDFs, and the assistant will help you extract key information such as:

- AMR trends
- Antibiotic use patterns
- Outbreak detection protocols
- Infection prevention strategies

🔗 Resources used:
- [WHO GLASS Initiative](https://www.who.int/initiatives/glass)
- [CDC Infection Control Guidelines](https://www.cdc.gov/infection-control/hcp/core-practices/index.html)
- [ECDC Antimicrobial Resistance Data](https://www.ecdc.europa.eu/en/publications-data/antimicrobial-resistance)

---

## 📌 License

MIT License – see [LICENSE](LICENSE)

---

## 💡 Future Enhancements

- Add real-time outbreak prediction using AI models trained on HAI datasets.
- Enable multi-language support for global accessibility.
- Integrate with hospital EHR systems for live patient risk scoring.
- Add role-based access for healthcare professionals and patients.
- Build a mobile-first version for frontline workers.

---

## 🤝 Contributing

Feel free to contribute! Open issues or submit pull requests.

---