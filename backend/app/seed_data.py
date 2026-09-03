from .database import SessionLocal, engine, Base
from .models import DoctorORM, ServiceORM, AppointmentORM, generate_booking_ref
from datetime import datetime, timedelta

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # If DB already has data, clear old doctor records to enforce exactly 1 doctor
        db.query(DoctorORM).delete()

        print("Seeding Kalam Dental Clinic with single lead specialist...")

        # 1. Exactly One Doctor Specialist
        doctor = DoctorORM(
            id=1,
            name="Dr. Kalam Kishore MDS",
            title="Founder, Chief Dental Surgeon & Specialist",
            specialization="Laser Dental Implants, Painless RCT & Complete Care",
            qualification="MDS (Prosthodontics & Implantology), FICOI (USA)",
            experience_years=18,
            rating=4.98,
            photo_url="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
            available_days="Mon - Sat (10:00 AM - 8:00 PM)",
            bio="Senior Chief Dental Surgeon specializing in painless computer-guided laser dental implants, microscopic single-visit root canals, clear aligners, and comprehensive aesthetic smile design."
        )
        db.add(doctor)

        # 2. Services (Check if services exist, else seed)
        if db.query(ServiceORM).count() == 0:
            services = [
                ServiceORM(
                    category="Laser Dental Implants",
                    title="Kalam Signature Laser Implant & Zirconia Crown",
                    description="Pain-free, computer-guided titanium dental implant placement with zero-suture laser recovery and natural ceramic tooth crown.",
                    duration_mins=45,
                    price_starting=18999,
                    icon_name="Award",
                    popular=1
                ),
                ServiceORM(
                    category="Root Canal Care",
                    title="30-Min Microscopic Painless RCT",
                    description="Ultra-gentle single-visit rotary endodontic treatment under magnification with biocompatible seal.",
                    duration_mins=35,
                    price_starting=3200,
                    icon_name="ShieldCheck",
                    popular=1
                ),
                ServiceORM(
                    category="Invisible Aligners",
                    title="Kalam Clear 3D Aligners",
                    description="Custom 3D scanned clear aligner trays for comfortable, 100% invisible tooth straightening without metal brackets.",
                    duration_mins=40,
                    price_starting=27999,
                    icon_name="Smile",
                    popular=1
                ),
                ServiceORM(
                    category="Cosmetic Smile Makeover",
                    title="3D Digital Hollywood Smile Makeover",
                    description="Custom ultra-thin porcelain veneers, gum contouring, and shade design for a sparkling red-carpet smile.",
                    duration_mins=60,
                    price_starting=5499,
                    icon_name="Sparkles",
                    popular=1
                ),
                ServiceORM(
                    category="Laser Whitening",
                    title="Kalam Power Laser Teeth Whitening",
                    description="Advanced dual-wavelength laser whitening that brightens enamel by up to 10 shades in 40 minutes.",
                    duration_mins=40,
                    price_starting=4499,
                    icon_name="Zap",
                    popular=0
                ),
                ServiceORM(
                    category="Preventive Care",
                    title="Ultrasonic Spa Cleaning & Polishing",
                    description="Plaque removal, tartar clearance, fluoride protection shield, and stain polish for fresh breath.",
                    duration_mins=30,
                    price_starting=899,
                    icon_name="Activity",
                    popular=0
                )
            ]
            db.add_all(services)

        # 3. Sample Appointments with Dr. Kalam Kishore MDS
        if db.query(AppointmentORM).count() == 0:
            sample_appointments = [
                AppointmentORM(
                    booking_ref="KALAM-78192",
                    patient_name="Vikramaditya Roy",
                    phone="+91 98450 12345",
                    email="vikram.roy@gmail.com",
                    date=(datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d"),
                    time_slot="11:30 AM",
                    branch="Kalam Dental Main Clinic",
                    doctor_name="Dr. Kalam Kishore MDS",
                    service_name="Kalam Signature Laser Implant & Zirconia Crown",
                    status="Confirmed",
                    notes="Patient consultation for upper tooth replacement.",
                    created_at=datetime.utcnow() - timedelta(hours=2)
                ),
                AppointmentORM(
                    booking_ref="KALAM-45109",
                    patient_name="Sneha Kapoor",
                    phone="+91 97110 88990",
                    email="sneha.kapoor@yahoo.com",
                    date=(datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d"),
                    time_slot="04:00 PM",
                    branch="Kalam Dental Main Clinic",
                    doctor_name="Dr. Kalam Kishore MDS",
                    service_name="Kalam Clear 3D Aligners",
                    status="Pending",
                    notes="3D Intraoral digital smile scan preview session.",
                    created_at=datetime.utcnow() - timedelta(hours=1)
                )
            ]
            db.add_all(sample_appointments)

        db.commit()
        print("Kalam Dental DB seeded with single lead specialist!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding Kalam Dental DB: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
