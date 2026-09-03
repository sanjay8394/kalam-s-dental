from .database import SessionLocal, engine, Base
from .models import DoctorORM, ServiceORM, AppointmentORM, generate_booking_ref
from datetime import datetime, timedelta

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        if db.query(DoctorORM).count() > 0:
            print("Kalam Dental DB already seeded.")
            return

        print("Seeding Kalam Dental Clinic database...")

        # 1. Doctors
        doctors = [
            DoctorORM(
                name="Dr. Kalam Kishore MDS",
                title="Founder & Senior Implantologist",
                specialization="Laser Implant Surgery & Full Mouth Rehabilitation",
                qualification="MDS (Prosthodontics & Implantology), FICOI (USA)",
                experience_years=18,
                rating=4.98,
                photo_url="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
                available_days="Mon - Sat (10:00 AM - 8:00 PM)",
                bio="Pioneer in painless computer-guided laser dental implants and smile reconstruction with over 18 years of clinical leadership."
            ),
            DoctorORM(
                name="Dr. Meera Nambiar MDS",
                title="Chief Endodontist & Laser Specialist",
                specialization="Microscopic Root Canal & Tooth Preservation",
                qualification="MDS (Conservative Dentistry & Endodontics)",
                experience_years=13,
                rating=4.95,
                photo_url="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
                available_days="Daily (11:00 AM - 7:00 PM)",
                bio="Specialist in 100% painless 30-minute rotary root canal procedures and aesthetic direct composite restorations."
            ),
            DoctorORM(
                name="Dr. Siddharth Verma MDS",
                title="Consultant Orthodontist & Invisible Aligner Specialist",
                specialization="Digital Clear Aligners & Facial Orthopedics",
                qualification="MDS (Orthodontics), Invisalign Gold Certified",
                experience_years=12,
                rating=4.92,
                photo_url="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
                available_days="Mon, Wed, Fri (2:00 PM - 8:00 PM)",
                bio="Expert in discreet adult teeth alignment, 3D intraoral smile simulation, and ceramic self-ligating braces."
            ),
            DoctorORM(
                name="Dr. Ritu Sharma MDS",
                title="Pediatric Dentist & Laser Surgery Specialist",
                specialization="Child Dentistry & Nitrous Conscious Sedation",
                qualification="MDS (Pediatric Dentistry)",
                experience_years=9,
                rating=4.96,
                photo_url="https://images.unsplash.com/photo-1594824813566-88855ce78341?auto=format&fit=crop&w=600&q=80",
                available_days="Tue, Thu, Sat (10:00 AM - 5:00 PM)",
                bio="Dedicated child dentistry specialist creating anxiety-free, playful dental visits for toddlers, children, and teenagers."
            )
        ]
        db.add_all(doctors)

        # 2. Services
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
            ),
            ServiceORM(
                category="Pediatric Care",
                title="Painless Laser Cavity Shield & Sealants",
                description="Gentle fluoride protective coating and sealant application to keep children's teeth decay-free.",
                duration_mins=30,
                price_starting=750,
                icon_name="HeartPulse",
                popular=0
            )
        ]
        db.add_all(services)

        # 3. Sample Appointments
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
                notes="Patient consultation for single upper tooth replacement.",
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
                doctor_name="Dr. Siddharth Verma MDS",
                service_name="Kalam Clear 3D Aligners",
                status="Pending",
                notes="3D Intraoral digital smile scan preview session.",
                created_at=datetime.utcnow() - timedelta(hours=1)
            ),
            AppointmentORM(
                booking_ref="KALAM-12890",
                patient_name="Aarav Malhotra",
                phone="+91 99001 22334",
                email="aarav.m@outlook.com",
                date=(datetime.now()).strftime("%Y-%m-%d"),
                time_slot="02:30 PM",
                branch="Kalam Dental Main Clinic",
                doctor_name="Dr. Meera Nambiar MDS",
                service_name="30-Min Microscopic Painless RCT",
                status="Completed",
                notes="Painless RCT completed in single visit. Crown scan scheduled.",
                created_at=datetime.utcnow() - timedelta(days=1)
            )
        ]
        db.add_all(sample_appointments)

        db.commit()
        print("Kalam Dental DB seeded successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding Kalam Dental DB: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
