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
      background: 'rgba(7, 25, 47, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '640px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'var(--bg-card-hover)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-main)'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: '1.25rem' }}>
          <div className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
            Kalam Patient Tracking Portal
          </div>
          <h2 style={{ fontSize: '1.6rem' }}>Lookup Appointment Status</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Enter your registered Phone Number or Booking Reference (e.g. KALAM-78192).
          </p>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="e.g. +91 98450 12345 or KALAM-78192"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              required
            />
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {errorMsg && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(231, 111, 81, 0.1)',
            border: '1px solid rgba(231, 111, 81, 0.3)',
            color: 'var(--accent-gold-dark)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        {results && results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Found {results.length} Booking Pass(es):</h4>

            {results.map((appt) => (
              <div key={appt.id} style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card-hover)',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary-royal)' }}>
                      {appt.booking_ref}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
                      Booked on {new Date(appt.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <span className="badge badge-royal">
                    ● {appt.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.825rem', marginBottom: '0.6rem' }}>
                  <div><strong>Patient:</strong> {appt.patient_name}</div>
                  <div><strong>Doctor:</strong> {appt.doctor_name}</div>
                  <div><strong>Procedure:</strong> {appt.service_name}</div>
                  <div><strong>Date & Time:</strong> {appt.date} ({appt.time_slot})</div>
                </div>

                {appt.notes && (
                  <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
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
