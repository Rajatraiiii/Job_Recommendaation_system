# Job & Internship Recommendation System

A comprehensive web application that recommends jobs and internships to users based on their skills and profile data. 

## Features
- **User Module**: Register, Login, and profile management.
- **Job Module**: Add, view, and search for jobs and internships.
- **Recommendation Engine**: Intelligent matching of user skills against job descriptions using TF-IDF (Term Frequency-Inverse Document Frequency) algorithm.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Python (FastAPI)
- **Database**: SQLite (built-in, easy to setup)
- **Machine Learning**: `scikit-learn` for TF-IDF algorithm
- **SCM**: GitHub (Git branch workflows, GitHub Actions CI/CD)

## Repository Structure

```
job-recommendation-system/
├── frontend/             # React.js application
├── backend/              # FastAPI python server & ML Logic
├── docs/                 # Project documentation images
├── .github/workflows/    # CI/CD pipelines
├── README.md             # This file
└── CONTRIBUTING.md       # SCM Guidelines
```

## Running the Project

### 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend API will be running at `http://localhost:8000`. You can visit `http://localhost:8000/docs` to see the auto-generated Swagger UI for all API endpoints.

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
The frontend application will typically be running on `http://localhost:5173`. Make sure the backend is also running.

## Recommendation Logic
The system uses **TF-IDF (Term Frequency-Inverse Document Frequency)** to vectorize the user's provided skills/experience and the job descriptions. It then computes the **Cosine Similarity** between these vectors to find the most relevant jobs, creating a sorted list of recommendations.
