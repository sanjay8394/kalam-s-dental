import React, { useState } from 'react';
import { MapPin, Phone, Clock, ChevronDown, ChevronUp, Navigation, CreditCard } from 'lucide-react';

export default function ContactFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What makes Kamal Laser Dental Implants superior?",
      a: "Kamal Signature Laser Implants utilize computer-guided 3D navigation and painless laser contouring, eliminating surgical incisions and sutures for rapid healing."
    },
    {
      q: "Is the 30-Minute Microscopic Root Canal truly painless?",
      a: "Yes. Our Endodontist Dr. Meera utilizes targeted anesthesia and micro-magnification to complete precision rotary root canals pain-free in 30 minutes."
    },
    {
      q: "How do Kamal Clear 3D Aligners work?",
      a: "Kamal Clear Aligners start with a 3D intraoral scan. We provide custom transparent aligners and a 3D video simulation of your future smile."
    },
    {
      q: "Does Kamal Dental provide 0% interest No-Cost EMI options?",
      a: "Yes! We offer 0% interest monthly EMI payment options for Laser Implants, Clear Aligners, and Smile Makeovers, plus itemized insurance invoices."
    },
    {
      q: "How can I schedule an emergency appointment?",
      a: "Call our direct emergency helpline at +91 98765 00000. Same-day emergency appointments are guaranteed."
    }
  ];

  return (
    <section id="contact" style={{ padding: '3.5rem 0', background: 'var(--bg-card)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="badge badge-royal" style={{ marginBottom: '0.5rem' }}>
            Location & Contact Hub
          </div>
          <h2>Visit Kamal Dental Center</h2>
          <p>
            Conveniently located with dedicated patient parking and state-of-the-art dental laser suites.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3.5rem'
        }}>
          
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.15rem' }}>Contact Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(0, 82, 204, 0.08)', color: 'var(--primary-royal)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Main Clinic Address</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '0.15rem' }}>
                    Plot No. 12, Main Healthcare Boulevard, City Center
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(0, 82, 204, 0.08)', color: 'var(--primary-royal)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Helpline & WhatsApp</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    +91 98765 00000 / +91 98765 11111
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(197, 160, 89, 0.12)', color: 'var(--accent-gold-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Operating Hours</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    <strong>Mon - Sat:</strong> 10:00 AM – 8:00 PM <br />
                    <strong>Sunday:</strong> 10:00 AM – 2:00 PM
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(0, 82, 204, 0.08)', color: 'var(--primary-royal)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <CreditCard size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Payment Options</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    UPI, Credit/Debit Cards, 0% EMI
                  </div>
                </div>
              </div>

            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.35rem', padding: '0.5rem', fontSize: '0.85rem' }}
            >
              <Navigation size={14} /> Open Google Maps Location
            </a>
          </div>

          <div className="glass-card" style={{
            overflow: 'hidden',
            borderRadius: 'var(--radius-md)',
            minHeight: '300px',
            position: 'relative'
          }}>
            <iframe
              title="Kamal Dental Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.497491823902!2d78.486671!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb978680000001%3A0x123456789abcdef!2sHyderabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

        </div>

        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Frequently Asked Questions</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem 1.15rem',
                  cursor: 'pointer'
                }}
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '0.925rem' }}>
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={16} color="var(--primary-royal)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                </div>

                {openFaq === idx && (
                  <p style={{ marginTop: '0.65rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, borderTop: '1px solid var(--border-light)', paddingTop: '0.65rem' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
