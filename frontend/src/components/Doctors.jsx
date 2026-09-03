import React from 'react';
import { Star, Award, Calendar, Clock } from 'lucide-react';

export default function Doctors({ doctors, onSelectDoctor }) {
  return (
    <section id="doctors" style={{ padding: '3.5rem 0', background: 'var(--bg-card)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="badge badge-royal" style={{ marginBottom: '0.5rem' }}>
            Kalam Lead Dental Specialist
          </div>
          <h2>Meet Our Chief Dental Surgeon</h2>
          <p>
            Our clinic is personally led by Dr. Kalam Kishore MDS, offering 18+ years of clinical excellence in laser dental implants and tooth preservation.
          </p>
        </div>

        <div style={{
          maxWidth: '560px',
          margin: '0 auto'
        }}>
          {doctors.map((doc) => (
            <div key={doc.id} className="glass-card" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                  <img
                    src={doc.photo_url}
                    alt={doc.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />

                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(7, 25, 47, 0.88)',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.785rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Star size={13} fill="#C5A059" color="#C5A059" /> {doc.rating} / 5.0 Rating
                  </div>
                </div>

                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-royal)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {doc.specialization}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', margin: '0.25rem 0' }}>
                    {doc.name}
                  </h3>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {doc.title} — {doc.qualification}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {doc.bio}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.825rem',
                    color: 'var(--accent-gold-dark)',
                    fontWeight: 700,
                    marginBottom: '0.4rem'
                  }}>
                    <Award size={15} /> {doc.experience_years}+ Years Clinical Leadership
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}>
                    <Clock size={14} color="#0052CC" /> Consultation Timings: {doc.available_days}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 1.25rem 1.25rem 1.25rem' }}>
                <button
                  onClick={() => onSelectDoctor(doc.name)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.6rem', fontSize: '0.875rem' }}
                >
                  <Calendar size={15} /> Book Consultation with Dr. Kalam
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
