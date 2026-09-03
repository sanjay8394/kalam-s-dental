import React from 'react';
import { Calendar, Sparkles, ShieldCheck, Star, Award, CheckCircle2 } from 'lucide-react';

export default function Hero({ onOpenBooking, onOpenQuiz }) {
  return (
    <section style={{
      position: 'relative',
      padding: '2.75rem 0 2.25rem 0',
      background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-main) 100%)',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'center' }}>
          
          {/* Content */}
          <div>
            <div className="badge badge-royal" style={{ marginBottom: '0.85rem' }}>
              🪷 Kalam Dental & Advanced Implant Center
            </div>

            <h1 style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.85rem', lineHeight: 1.15 }}>
              World-Class Dentistry <br />
              <span className="gradient-text-kalam">Built For Perfect Smiles</span>
            </h1>

            <p style={{ fontSize: '0.975rem', color: 'var(--text-muted)', marginBottom: '1.35rem', maxWidth: '520px', lineHeight: 1.5 }}>
              Welcome to <strong>Kalam Dental</strong>. We specialize in computer-guided painless laser implants, 30-minute micro-endodontic root canals, and custom 3D clear aligners with compassionate personal care.
            </p>

            {/* Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                'Kalam Laser Titanium Implants',
                '30-Min Painless Micro RCT',
                'Kalam Clear 3D Aligners',
                'Digital Hollywood Smile Design'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={15} color="#0052CC" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <button onClick={() => onOpenBooking()} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}>
                <Calendar size={15} /> Book Appointment
              </button>
              
              <a href="#quiz" className="btn btn-gold" style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
                <Sparkles size={15} /> Take Smile 360° Quiz
              </a>
            </div>

            {/* Metrics */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-royal)', lineHeight: 1 }}>10,000+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pristine Smiles</div>
              </div>
              <div style={{ height: '28px', width: '1px', background: 'var(--border-light)' }} />
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-gold-dark)', lineHeight: 1 }}>18+ Yrs</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Implant Leadership</div>
              </div>
              <div style={{ height: '28px', width: '1px', background: 'var(--border-light)' }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C5A059" color="#C5A059" />
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '0.15rem' }}>
                  4.95 / 5.0 Rating (600+ Reviews)
                </div>
              </div>
            </div>

          </div>

          {/* Right Column Visual Card */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                alt="Kalam Dental Clinic"
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-sm)'
                }}
              />

              <div style={{
                position: 'absolute',
                top: '18px',
                left: '-15px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem 0.85rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <ShieldCheck size={18} color="#0052CC" />
                <div>
                  <div style={{ fontSize: '0.785rem', fontWeight: 700 }}>100% Pain-Free</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>Laser Dental Tech</div>
                </div>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem 0.85rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Award size={18} color="#C5A059" />
                <div>
                  <div style={{ fontSize: '0.785rem', fontWeight: 700 }}>MDS Specialists</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>Senior Surgeons</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
