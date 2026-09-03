import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState(0);

  const cases = [
    {
      title: "Kamal Laser Implant Restoration",
      treatment: "Full Arch Titanium Implants",
      beforeImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
      afterImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
      patient: "Rajeshwar Rao",
      comment: "I had multiple missing teeth. Dr. Kamal Kishore placed laser implants in a single sitting with zero pain. The zirconium teeth feel like my natural ones!"
    },
    {
      title: "3D Hollywood Smile Makeover",
      treatment: "10 Upper E-Max Porcelain Veneers",
      beforeImg: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80",
      afterImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      patient: "Pooja Malhotra",
      comment: "My discolored front teeth made me feel hesitant during business presentations. The digital veneer makeover completely restored my confidence!"
    },
    {
      title: "Kamal Clear Aligners Straightening",
      treatment: "3D Custom Aligners (6 Months)",
      beforeImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80",
      afterImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      patient: "Aditya Sharma",
      comment: "Invisible aligners were so convenient. Nobody at work noticed I was wearing them, and my teeth were perfectly aligned in 6 months!"
    }
  ];

  return (
    <section id="gallery" style={{ padding: '3.5rem 0', background: 'var(--bg-main)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            Transformations & Results
          </div>
          <h2>Smile Makeover Case Studies</h2>
          <p>
            Explore actual treatment transformations performed by our senior implantologists and cosmetic surgeons.
          </p>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            {cases.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: activeTab === idx ? 'var(--primary-royal)' : 'var(--border-light)',
                  background: activeTab === idx ? 'var(--primary-royal)' : 'var(--bg-card)',
                  color: activeTab === idx ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <img
                    src={cases[activeTab].beforeImg}
                    alt="Before Treatment"
                    style={{ width: '100%', height: '170px', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    background: 'rgba(7, 25, 47, 0.85)',
                    color: '#FFFFFF',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}>
                    BEFORE
                  </div>
                </div>

                <div style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1.5px solid var(--primary-royal)' }}>
                  <img
                    src={cases[activeTab].afterImg}
                    alt="After Treatment"
                    style={{ width: '100%', height: '170px', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    background: 'var(--primary-royal)',
                    color: '#FFFFFF',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}>
                    AFTER ✨
                  </div>
                </div>
              </div>

              <div>
                <div className="badge badge-royal" style={{ marginBottom: '0.75rem' }}>
                  {cases[activeTab].treatment}
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  "{cases[activeTab].comment}"
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.85rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#C5A059" color="#C5A059" />
                  ))}
                </div>

                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                  {cases[activeTab].patient}
                </div>
                <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem' }}>
                  <CheckCircle2 size={13} color="#0052CC" /> Verified Patient Review
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
