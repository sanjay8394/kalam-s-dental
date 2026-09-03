# 🪷 Kalam Dental Clinic & Advanced Implant Center

Full-stack, production-ready dental web application for **Kalam Dental**. Built with **React.js**, **FastAPI (Python)**, **PostgreSQL**, **HTML/CSS/JS**, and **Docker**.

---

## 🌟 Key Features

1. **Brand Identity**: Executive Sapphire Royal Blue (`#07192F` / `#0052CC`), Electric Cyan (`#00B4D8`), and Lotus Gold (`#C5A059`) visual design system.
2. **Patient Appointment Engine**: Real-time appointment booking with instant unique reference pass generation (`KALAM-XXXXX`).
3. **Kalam 360° AI Symptom Assistant**: Interactive diagnostic tool giving personalized procedure recommendations, estimated duration, and price guidance.
4. **Specialist Surgeons Roster**: Senior Implantologists, Endodontists, and Orthodontists.
5. **Patient Portal**: Search and track appointment status by phone number or booking reference code.
6. **Staff Admin Operations Panel**: Real-time dashboard analytics, status filtering (Pending, Confirmed, Completed, Cancelled), and clinical notes editor.
7. **Smile Makeover Case Studies**: Before & After transformation gallery and verified patient reviews.
8. **Contact & Location Hub**: Interactive Google Maps embed, emergency helpline (+91 98765 00000), opening hours, and FAQ accordion.

---

## 🚀 Local Execution Setup

### Option A: Docker Compose (PostgreSQL + FastAPI + React)
```bash
docker-compose up --build
```
- **Frontend App**: `http://localhost:3000`
- **FastAPI Backend API**: `http://localhost:8000`
- **Interactive OpenAPI Specs**: `http://localhost:8000/docs`

---

### Option B: Manual Local Setup (Without Docker)

#### 1. Backend (FastAPI + Python)
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -c "from app.seed_data import seed_database; seed_database()"
uvicorn app.main:app --reload --port 8000
```

#### 2. Frontend (React + Vite)
In a separate terminal tab:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your web browser.
