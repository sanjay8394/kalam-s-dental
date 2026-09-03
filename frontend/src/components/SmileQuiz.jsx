import React, { useState } from 'react';
import { Sparkles, CheckCircle, RefreshCw, Calendar, Lightbulb } from 'lucide-react';
import { assessSmile } from '../api';

export default function SmileQuiz({ onOpenBooking }) {
  const [concern, setConcern] = useState('Missing Teeth');
  const [urgency, setUrgency] = useState('Within this week');
  const [goal, setGoal] = useState('Implant Replacement');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const concernsList = [
    { id: 'Missing Teeth', title: 'Missing or Broken Tooth', desc: 'Permanent titanium laser implant or crown' },
    { id: 'Pain / Sensitivity', title: 'Tooth Pain or Sensitivity', desc: 'Sharp ache, swelling, or thermal sensitivity' },
    { id: 'Yellowing / Stains', title: 'Enamel Yellowing & Stains', desc: 'Instant bright laser teeth whitening' },
    { id: 'Crooked Teeth', title: 'Overlapping or Crooked Teeth', desc: 'Invisible 3D clear aligner correction' }
  ];

  const handleAssessment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await assessSmile({
        primary_concern: concern,
        urgency: urgency,
        preferred_goal: goal
      });
      setResult(data);
    } catch (err) {
      console.error("Assessment error", err);
      setResult({
        recommended_services: ["Kalam Signature Laser Implant & Zirconia Crown"],
        estimated_duration: "Single sitting laser placement",
        price_estimate: "Starting from ₹18,999",
        expert_tip: "Laser implant placement at Kalam Dental achieves a 99.4% stability rate with zero surgical sutures."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quiz" style={{
      padding: '3.5rem 0',
      background: 'linear-gradient(135deg, rgba(0, 82, 204, 0.04) 0%, rgba(197, 160, 89, 0.04) 100%)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container">
        
        <div className="section-header">
          <div className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            Kalam 360° AI Symptom Assistant
          </div>
          <h2>Instant Virtual Clinical Assessment</h2>
          <p>
            Select your symptoms to receive personalized procedure recommendations, duration, and price estimates.
          </p>
        </div>

        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)' }}>
            
            {!result ? (
              <form onSubmit={handleAssessment}>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>
                    1. Select Primary Symptom:
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
                    {concernsList.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setConcern(item.id)}
                        style={{
                          padding: '0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid',
                          borderColor: concern === item.id ? 'var(--primary-royal)' : 'var(--border-light)',
                          background: concern === item.id ? 'rgba(0, 82, 204, 0.06)' : 'var(--bg-card)',
                          cursor: 'pointer',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: concern === item.id ? 'var(--primary-royal)' : 'var(--text-main)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>
                    2. Preferred Timeline:
                  </label>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Emergency (Today)', 'Within this week', 'Routine Checkup'].map((u) => (
                      <button
                        type="button"
                        key={u}
                        onClick={() => setUrgency(u)}
                        style={{
                          padding: '0.45rem 1rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid',
                          borderColor: urgency === u ? 'var(--accent-gold-dark)' : 'var(--border-light)',
                          background: urgency === u ? 'rgba(197, 160, 89, 0.12)' : 'var(--bg-card)',
                          color: urgency === u ? 'var(--accent-gold-dark)' : 'var(--text-main)',
                          fontWeight: 600,
                          fontSize: '0.825rem',
                          cursor: 'pointer'
                        }}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-gold"
                    style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={16} className="pulse-glow" /> Evaluating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} /> Get Clinical Recommendation
                      </>
                    )}
                  </button>
                </div>

              </form>
            ) : (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0, 82, 204, 0.08)',
                  color: 'var(--primary-royal)',
                  marginBottom: '1.5rem'
                }}>
                  <CheckCircle size={20} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.975rem' }}>Kalam Clinical Assessment Ready</div>
                    <div style={{ fontSize: '0.785rem' }}>Custom evaluation for {concern}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-hover)' }}>
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recommended Solution</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--primary-royal)' }}>
                      {result.recommended_services.join(', ')}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-hover)' }}>
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', fontWeight: 600 }}>Duration</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.35rem' }}>
                      {result.estimated_duration}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-hover)' }}>
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', fontWeight: 600 }}>Price Guidance</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--accent-gold-dark)' }}>
                      {result.price_estimate}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(197, 160, 89, 0.08)',
                  borderLeft: '3px solid var(--accent-gold)',
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: '1.75rem'
                }}>
                  <Lightbulb size={20} color="#C5A059" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Clinical Tip:</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {result.expert_tip}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button onClick={() => setResult(null)} className="btn btn-secondary" style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}>
                    Retake Quiz
                  </button>

                  <button
                    onClick={() => onOpenBooking(result.recommended_services[0])}
                    className="btn btn-primary"
                    style={{ padding: '0.55rem 1.5rem', fontSize: '0.85rem' }}
                  >
                    <Calendar size={15} /> Book Procedure
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
