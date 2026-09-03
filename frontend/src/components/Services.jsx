import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Smile, Award, Activity, Zap, HeartPulse, Clock, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Smile: Smile,
  Award: Award,
  Activity: Activity,
  Zap: Zap,
  HeartPulse: HeartPulse
};

export default function Services({ services, onSelectService }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(services.map(s => s.category))];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <section id="services" style={{ padding: '3.5rem 0', background: 'var(--bg-main)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="badge badge-royal" style={{ marginBottom: '0.5rem' }}>
            Advanced Clinical Treatments
          </div>
          <h2>Specialized Dental Procedures</h2>
          <p>
            Explore our state-of-the-art laser procedures, 3D clear aligners, titanium implants, and microscopic endodontics.
          </p>

          {/* Compact Category Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.4rem',
            flexWrap: 'wrap',
            marginTop: '1.25rem'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--primary-royal)' : 'var(--border-light)',
                  background: selectedCategory === cat ? 'var(--primary-royal)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredServices.map((service) => {
            const IconComp = ICON_MAP[service.icon_name] || Sparkles;

            return (
              <div key={service.id} className="glass-card" style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}>
                {service.popular === 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '0.675rem',
                    padding: '0.15rem 0.5rem'
                  }} className="badge badge-gold">
                    ★ Featured
                  </div>
                )}

                <div>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(0, 82, 204, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-royal)',
                    marginBottom: '0.85rem'
                  }}>
                    <IconComp size={20} />
                  </div>

                  <div style={{ fontSize: '0.725rem', color: 'var(--primary-royal)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {service.category}
                  </div>

                  <h3 style={{ fontSize: '1.1rem', margin: '0.25rem 0 0.5rem 0' }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '1rem' }}>
                    {service.description}
                  </p>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-card-hover)',
                    marginBottom: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                      <Clock size={13} /> {service.duration_mins} mins
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>Starting from</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-royal)' }}>
                        ₹{service.price_starting.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'space-between', padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
                  >
                    <span>Book Procedure</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
