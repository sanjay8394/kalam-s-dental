import React, { useState } from 'react';
import { X, CheckCircle, Copy } from 'lucide-react';
import { createAppointment } from '../api';

export default function BookingModal({ isOpen, onClose, initialService, initialDoctor, services, doctors, onBookingComplete }) {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const [serviceName, setServiceName] = useState(initialService || (services[0]?.title || 'Kamal Signature Laser Implant & Zirconia Crown'));
  const [doctorName, setDoctorName] = useState(initialDoctor || (doctors[0]?.name || 'Dr. Kamal Kishore MDS'));
  const [date, setDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('11:30 AM');
  const [branch, setBranch] = useState('Kamal Dental Main Clinic');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '10:30 AM', '11:30 AM', '12:30 PM',
    '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName || !phone || !email) {
      alert("Please fill in your name, phone number, and email.");
      return;
    }

    setLoading(true);
    try {
      const result = await createAppointment({
        patient_name: patientName,
        phone: phone,
        email: email,
        date: date,
        time_slot: timeSlot,
        branch: branch,
        doctor_name: doctorName,
        service_name: serviceName,
        notes: notes
      });

      setSuccessData(result);
      if (onBookingComplete) onBookingComplete(result);
    } catch (err) {
      console.error("Booking error", err);
      alert("Failed to submit appointment.");
    } finally {
      setLoading(false);
    }
  };

  const copyBookingRef = () => {
    if (successData?.booking_ref) {
      navigator.clipboard.writeText(successData.booking_ref);
      alert(`Booking Reference ${successData.booking_ref} copied to clipboard!`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(10, 37, 64, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '620px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        padding: '2rem',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-card-hover)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-main)'
          }}
        >
          <X size={20} />
        </button>

        {!successData ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="badge badge-royal" style={{ marginBottom: '0.4rem' }}>
                🪷 Kamal Appointment Engine
              </div>
              <h2 style={{ fontSize: '1.75rem' }}>Schedule Your Dental Visit</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Select your preferred doctor, date & time slot at Kamal Dental Clinic & Advanced Implant Center.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Treatment Procedure</label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="form-select"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} (₹{s.price_starting.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Select Senior Specialist</label>
                <select
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="form-select"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} — {d.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="form-select"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Full Patient Name</label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Roy"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Symptoms / Special Notes (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Mention tooth sensitivity, laser interest, or medical history..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
                  {loading ? "Confirming..." : "Confirm Kamal Booking"}
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(0, 82, 204, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-royal)',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle size={36} />
            </div>

            <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Appointment Registered!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Your appointment has been registered with Kamal Dental Clinic.
            </p>

            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card-hover)',
              border: '1px dashed var(--primary-royal)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>BOOKING PASS REF</div>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-royal)', letterSpacing: '1px' }}>
                  {successData.booking_ref}
                </div>
              </div>

              <button
                onClick={copyBookingRef}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
              >
                <Copy size={14} /> Copy Code
              </button>
            </div>

            <div style={{ textAlign: 'left', background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              <div style={{ marginBottom: '0.4rem' }}><strong>Patient:</strong> {successData.patient_name}</div>
              <div style={{ marginBottom: '0.4rem' }}><strong>Senior Specialist:</strong> {successData.doctor_name}</div>
              <div style={{ marginBottom: '0.4rem' }}><strong>Procedure:</strong> {successData.service_name}</div>
              <div style={{ marginBottom: '0.4rem' }}><strong>Date & Slot:</strong> {successData.date} at {successData.time_slot}</div>
              <div><strong>Clinic Center:</strong> {successData.branch}</div>
            </div>

            <button
              onClick={() => { setSuccessData(null); onClose(); }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Done & Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
