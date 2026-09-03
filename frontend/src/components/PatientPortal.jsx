import React, { useState } from 'react';
import { X, Search, AlertCircle } from 'lucide-react';
import { trackAppointments } from '../api';

export default function PatientPortal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setResults(null);

    try {
      const data = await trackAppointments(query);
      setResults(data);
    } catch (err) {
      setErrorMsg(err.message || 'No booking record found for this phone number or reference code.');
    } finally {
      setLoading(false);
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
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
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

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Kamal Patient Tracking Portal
          </div>
          <h2 style={{ fontSize: '1.75rem' }}>Lookup Appointment Status</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Enter your registered Phone Number or Booking Reference (e.g. KAMAL-78192).
          </p>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="e.g. +91 98450 12345 or KAMAL-78192"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
              required
            />
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            {loading ? "Searching..." : "Search Records"}
          </button>
        </form>

        {errorMsg && (
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(231, 111, 81, 0.1)',
            border: '1px solid rgba(231, 111, 81, 0.3)',
            color: '#B89628',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}

        {results && results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Found {results.length} Booking Pass(es):</h4>

            {results.map((appt) => (
              <div key={appt.id} style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card-hover)',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-royal)' }}>
                      {appt.booking_ref}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                      Booked on {new Date(appt.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <span className="badge badge-royal">
                    ● {appt.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  <div><strong>Patient:</strong> {appt.patient_name}</div>
                  <div><strong>Doctor:</strong> {appt.doctor_name}</div>
                  <div><strong>Procedure:</strong> {appt.service_name}</div>
                  <div><strong>Date & Time:</strong> {appt.date} ({appt.time_slot})</div>
                </div>

                {appt.notes && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <strong>Clinical Notes:</strong> {appt.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
