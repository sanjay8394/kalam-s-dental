from datetime import datetime
import random
import string
from typing import Optional, List
from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from pydantic import BaseModel
from .database import Base

# ================= SQLALCHEMY ORM MODELS =================

class DoctorORM(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    title = Column(String(100), nullable=False)
    specialization = Column(String(100), nullable=False)
    qualification = Column(String(100), nullable=False)
    experience_years = Column(Integer, default=5)
    rating = Column(Float, default=4.95)
    photo_url = Column(Text, nullable=True)
    available_days = Column(String(200), default="Mon - Sat")
    bio = Column(Text, nullable=True)

class ServiceORM(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    duration_mins = Column(Integer, default=30)
    price_starting = Column(Integer, nullable=False)
    icon_name = Column(String(50), default="Sparkles")
    popular = Column(Integer, default=0)

class AppointmentORM(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    booking_ref = Column(String(20), unique=True, index=True, nullable=False)
    patient_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=False)
    date = Column(String(20), nullable=False)
    time_slot = Column(String(50), nullable=False)
    branch = Column(String(100), default="Kalam Dental Main Clinic")
    doctor_name = Column(String(100), nullable=False)
    service_name = Column(String(150), nullable=False)
    status = Column(String(20), default="Confirmed")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

def generate_booking_ref() -> str:
    digits = ''.join(random.choices(string.digits, k=5))
    return f"KALAM-{digits}"


# ================= PYDANTIC SCHEMAS =================

class DoctorBase(BaseModel):
    name: str
    title: str
    specialization: str
    qualification: str
    experience_years: int
    rating: float
    photo_url: Optional[str] = None
    available_days: str
    bio: Optional[str] = None

class DoctorResponse(DoctorBase):
    id: int

    class Config:
        from_attributes = True

class ServiceBase(BaseModel):
    category: str
    title: str
    description: str
    duration_mins: int
    price_starting: int
    icon_name: str
    popular: int = 0

class ServiceResponse(ServiceBase):
    id: int

    class Config:
        from_attributes = True

class AppointmentCreate(BaseModel):
    patient_name: str
    phone: str
    email: str
    date: str
    time_slot: str
    branch: str = "Kalam Dental Main Clinic"
    doctor_name: str
    service_name: str
    notes: Optional[str] = ""

class AppointmentUpdateStatus(BaseModel):
    status: str
    notes: Optional[str] = None

class AppointmentResponse(BaseModel):
    id: int
    booking_ref: str
    patient_name: str
    phone: str
    email: str
    date: str
    time_slot: str
    branch: str
    doctor_name: str
    service_name: str
    status: str
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class SmileAssessmentRequest(BaseModel):
    primary_concern: str
    urgency: str
    preferred_goal: str

class SmileAssessmentResponse(BaseModel):
    recommended_services: List[str]
    estimated_duration: str
    price_estimate: str
    expert_tip: str
