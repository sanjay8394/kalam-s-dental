import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer style={{
      background: 'var(--bg-main)',
      borderTop: '1px solid var(--border-light)',
      padding: '3rem 0 1.5rem 0',
      color: 'var(--text-main)'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--primary-sapphire), var(--primary-royal))',
                border: '1.5px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                🪷
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800 }}>
                KAMAL <span style={{ color: 'var(--primary-royal)' }}>DENTAL</span>
              </div>
            </div>

            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Kamal Dental Clinic & Advanced Implant Center delivers painless computer-guided laser implants, 3D clear aligners, and microscopic root canal procedures.
            </p>

            <button onClick={() => onOpenBooking()} className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
              Book Online Consult
            </button>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.85rem' }}>Specializations</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
              <li><a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Kamal Signature Laser Implants</a></li>
              <li><a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>30-Min Microscopic Painless RCT</a></li>
              <li><a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Kamal Clear 3D Aligners</a></li>
              <li><a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>3D Digital Hollywood Smile Makeover</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.85rem' }}>Clinic Timings</h4>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div><strong>Mon – Sat:</strong> 10:00 AM – 8:00 PM</div>
              <div><strong>Sunday:</strong> 10:00 AM – 2:00 PM</div>
              <div style={{ marginTop: '0.35rem', color: 'var(--primary-royal)', fontWeight: 700 }}>
                24/7 Emergency Helpline
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.85rem' }}>Location</h4>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Plot No. 12, Main Healthcare Boulevard, City Center
            </div>
            <div style={{ marginTop: '0.65rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Call / WhatsApp: +91 98765 00000
            </div>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.785rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} Kamal Dental Clinic & Advanced Implant Center.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Designed with <Heart size={13} color="#0052CC" fill="#0052CC" /> for Patient Care
          </div>
        </div>

      </div>
    </footer>
  );
}
