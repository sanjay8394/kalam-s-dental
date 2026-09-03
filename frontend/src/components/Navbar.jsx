import React, { useState, useEffect } from 'react';
import { Phone, Calendar, User, ShieldAlert, Sun, Moon, MapPin, Clock } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenPortal, onOpenAdmin, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, transition: 'var(--transition-fast)' }}>
      
      {/* Top Announcement Bar (Slim 28px) */}
      <div className="top-announcement">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#E2E8F0' }}>
              <MapPin size={12} color="#00B4D8" /> Kalam Dental & Advanced Implant Center
            </span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#94A3B8' }}>
              <Clock size={12} color="#C5A059" /> Mon-Sat: 10AM–8PM
            </span>
          </div>

          <div>
            <a href="tel:+919876500000" style={{ color: '#F8FAFC', textDecoration: 'none', fontWeight: 600, fontSize: '0.785rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Phone size={12} color="#00B4D8" /> Helpline: +91 98765 00000
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Slim 52px) */}
      <nav style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        padding: '0.4rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '48px' }}>
          
          {/* Brand Logo - Compact Kalam Dental */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary-sapphire), var(--primary-royal))',
              border: '1.5px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem'
            }}>
              🪷
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.3px', lineHeight: 1, whiteSpace: 'nowrap' }}>
                KALAM <span style={{ color: 'var(--primary-royal)' }}>DENTAL</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.6px', marginTop: '1px', whiteSpace: 'nowrap' }}>
                ADVANCED IMPLANT CENTER
              </div>
            </div>
          </a>

          {/* Inline Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="nav-links">
            <a href="#services" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Treatments</a>
            <a href="#quiz" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Smile 360° AI</a>
            <a href="#doctors" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Specialists</a>
            <a href="#gallery" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Before/After</a>
            <a href="#contact" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Location & Hours</a>
          </div>

          {/* Actions & CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            
            <button
              onClick={toggleTheme}
              title="Toggle Dark/Light Mode"
              style={{
                background: 'var(--bg-card-hover)',
                border: '1px solid var(--border-light)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {theme === 'dark' ? <Sun size={15} color="#C5A059" /> : <Moon size={15} color="#0052CC" />}
            </button>

            <button
              onClick={onOpenPortal}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', height: '32px' }}
            >
              <User size={13} /> Patient Portal
            </button>

            <button
              onClick={onOpenAdmin}
              style={{
                background: 'rgba(197, 160, 89, 0.08)',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 0.75rem',
                color: 'var(--accent-gold-dark)',
                fontWeight: 700,
                fontSize: '0.785rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                height: '32px',
                whiteSpace: 'nowrap'
              }}
            >
              <ShieldAlert size={13} /> Staff Portal
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="btn btn-primary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.825rem', height: '32px' }}
            >
              <Calendar size={13} /> Book Visit
            </button>

          </div>

        </div>
      </nav>
    </header>
  );
}
