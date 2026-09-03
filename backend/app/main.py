from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from .database import engine, Base, get_db
from .models import (
    DoctorORM, DoctorResponse,
    ServiceORM, ServiceResponse,
    AppointmentORM, AppointmentCreate, AppointmentUpdateStatus, AppointmentResponse, generate_booking_ref,
    SmileAssessmentRequest, SmileAssessmentResponse
)
from .seed_data import seed_database

Base.metadata.create_all(bind=engine)
seed_database()

app = FastAPI(
    title="Kamal Dental Clinic & Advanced Implant Center API",
    description="Backend service for Kamal Dental appointment booking, doctor management, patient tracking, and 360° smile assessment.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "online",
        "clinic": "Kamal Dental Clinic & Advanced Implant Center API",
        "documentation_swagger": "/docs",
        "documentation_redoc": "/redoc",
        "endpoints": {
            "health": "/api/health",
            "services": "/api/services",
            "doctors": "/api/doctors",
            "create_appointment": "POST /api/appointments",
            "track_appointment": "/api/appointments/track/{phone_or_ref}",
            "admin_appointments": "/api/admin/appointments",
            "admin_stats": "/api/admin/stats",
            "smile_assessment": "POST /api/assess-smile"
        }
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "clinic": "Kamal Dental Clinic & Advanced Implant Center",
        "timestamp": datetime.utcnow().isoformat()
    }

# ================= SERVICES ENDPOINTS =================

@app.get("/api/services", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    return db.query(ServiceORM).all()

# ================= DOCTORS ENDPOINTS =================

@app.get("/api/doctors", response_model=List[DoctorResponse])
def get_doctors(db: Session = Depends(get_db)):
    return db.query(DoctorORM).all()

# ================= APPOINTMENTS ENDPOINTS =================

@app.post("/api/appointments", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    ref_code = generate_booking_ref()
    while db.query(AppointmentORM).filter(AppointmentORM.booking_ref == ref_code).first():
        ref_code = generate_booking_ref()

    db_appointment = AppointmentORM(
        booking_ref=ref_code,
        patient_name=appointment.patient_name,
        phone=appointment.phone,
        email=appointment.email,
        date=appointment.date,
        time_slot=appointment.time_slot,
        branch=appointment.branch,
        doctor_name=appointment.doctor_name,
        service_name=appointment.service_name,
        status="Confirmed",
        notes=appointment.notes,
        created_at=datetime.utcnow()
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.get("/api/appointments/track/{identifier}", response_model=List[AppointmentResponse])
def track_appointments(identifier: str, db: Session = Depends(get_db)):
    clean_id = identifier.strip()
    results = db.query(AppointmentORM).filter(
        (AppointmentORM.booking_ref.ilike(f"%{clean_id}%")) |
        (AppointmentORM.phone.ilike(f"%{clean_id}%")) |
        (AppointmentORM.email.ilike(f"%{clean_id}%"))
    ).order_by(AppointmentORM.created_at.desc()).all()

    if not results:
        raise HTTPException(
            status_code=404, 
            detail=f"No appointment record found for '{identifier}' at Kamal Dental."
        )
    return results

# ================= ADMIN DASHBOARD ENDPOINTS =================

@app.get("/api/admin/appointments", response_model=List[AppointmentResponse])
def get_all_appointments(
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db)
):
    query = db.query(AppointmentORM)
    if status_filter and status_filter.lower() != "all":
        query = query.filter(AppointmentORM.status.ilike(status_filter))
    return query.order_by(AppointmentORM.created_at.desc()).all()

@app.patch("/api/admin/appointments/{appointment_id}", response_model=AppointmentResponse)
def update_appointment_status(
    appointment_id: int, 
    update_data: AppointmentUpdateStatus, 
    db: Session = Depends(get_db)
):
    appointment = db.query(AppointmentORM).filter(AppointmentORM.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    appointment.status = update_data.status
    if update_data.notes is not None:
        appointment.notes = update_data.notes
        
    db.commit()
    db.refresh(appointment)
    return appointment

@app.get("/api/admin/stats")
def get_admin_stats(db: Session = Depends(get_db)):
    total = db.query(AppointmentORM).count()
    confirmed = db.query(AppointmentORM).filter(AppointmentORM.status == "Confirmed").count()
    pending = db.query(AppointmentORM).filter(AppointmentORM.status == "Pending").count()
    completed = db.query(AppointmentORM).filter(AppointmentORM.status == "Completed").count()
    cancelled = db.query(AppointmentORM).filter(AppointmentORM.status == "Cancelled").count()

    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    today_count = db.query(AppointmentORM).filter(AppointmentORM.date == today_str).count()

    return {
        "total_appointments": total,
        "confirmed": confirmed,
        "pending": pending,
        "completed": completed,
        "cancelled": cancelled,
        "today_appointments": today_count
    }

# ================= 360° SMILE DIAGNOSTIC ENGINE =================

@app.post("/api/assess-smile", response_model=SmileAssessmentResponse)
def assess_smile(request: SmileAssessmentRequest):
    concern = request.primary_concern.lower()
    
    if "pain" in concern or "sensitivity" in concern:
        return SmileAssessmentResponse(
            recommended_services=["30-Min Microscopic Painless RCT", "Ultrasonic Spa Cleaning"],
            estimated_duration="35 - 45 minutes",
            price_estimate="Starting from ₹899 to ₹3,200",
            expert_tip="Tooth pain usually signals pulp tissue inflammation. Dr. Meera recommends early laser treatment before damage spreads."
        )
    elif "missing" in concern or "implant" in concern:
        return SmileAssessmentResponse(
            recommended_services=["Kamal Signature Laser Implant & Zirconia Crown"],
            estimated_duration="Single sitting laser placement",
            price_estimate="Starting from ₹18,999",
            expert_tip="Computer-guided laser implants at Kamal Dental achieve a 99.4% stability rate with zero bleeding or surgical sutures."
        )
    elif "yellow" in concern or "whitening" in concern:
        return SmileAssessmentResponse(
            recommended_services=["Kamal Power Laser Teeth Whitening", "Ultrasonic Spa Cleaning"],
            estimated_duration="40 minutes",
            price_estimate="Starting from ₹899 to ₹4,499",
            expert_tip="Laser whitening safely breaks down deep enamel discoloration up to 10 shades brighter without sensitivity."
        )
    elif "crooked" in concern or "aligner" in concern:
        return SmileAssessmentResponse(
            recommended_services=["Kamal Clear 3D Aligners"],
            estimated_duration="4 to 8 months",
            price_estimate="Starting from ₹27,999",
            expert_tip="Kamal Clear 3D Aligners include full 3D video simulation showing your predicted final smile before starting."
        )
    else:
        return SmileAssessmentResponse(
            recommended_services=["3D Digital Hollywood Smile Makeover"],
            estimated_duration="45 minutes",
            price_estimate="Starting from ₹5,499",
            expert_tip="Book a comprehensive 3D Intraoral Digital Consultation at Kamal Dental to review customized porcelain veneer options."
        )
