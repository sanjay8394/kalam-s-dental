import React from 'react';
import { Star, Award, Calendar, Clock } from 'lucide-react';

export default function Doctors({ doctors, onSelectDoctor }) {
  return (
    <section id="doctors" style={{ padding: '3.5rem 0', background: 'var(--bg-card)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="badge badge-royal" style={{ marginBottom: '0.5rem' }}>
            Specialist Surgeons
          </div>
          <h2>Senior Dental Surgeons & Implantologists</h2>
          <p>
            Our clinic is led by MDS specialist surgeons and implantologists with international fellowship training.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {doctors.map((doc) => (
            <div key={doc.id} className="glass-card" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
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
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(7, 25, 47, 0.88)',
                    color: '#FFFFFF',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}>
                    <Star size={12} fill="#C5A059" color="#C5A059" /> {doc.rating}
                  </div>
                </div>

                <div style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--primary-royal)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {doc.specialization}
                  </div>

                  <h3 style={{ fontSize: '1.1rem', margin: '0.25rem 0' }}>
                    {doc.name}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.6rem' }}>
                    {doc.title}
                  </div>

                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.85rem' }}>
                    {doc.bio}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.785rem',
                    color: 'var(--accent-gold-dark)',
                    fontWeight: 700,
                    marginBottom: '0.35rem'
                  }}>
                    <Award size={13} /> {doc.experience_years}+ Years Experience
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                  }}>
                    <Clock size={13} color="#0052CC" /> {doc.available_days}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <button
                  onClick={() => onSelectDoctor(doc.name)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.5rem', fontSize: '0.825rem' }}
                >
                  <Calendar size={14} /> Book Consult
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
