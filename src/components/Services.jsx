import React, { useState } from 'react';
import { Clock, CalendarDays } from 'lucide-react';

const SERVICES_DATA = {
  styling: [
    { id: 'sig-cut', name: 'Signature Cut & Blowout', price: 95, duration: '60 min', desc: 'Precision styling tailored to your face shape, followed by a professional blowout.' },
    { id: 'men-cut', name: 'Bespoke Men\'s Haircut', price: 70, duration: '45 min', desc: 'Detailed clean cut, neck shave, and custom texturing style.' },
    { id: 'blowout-wave', name: 'Luxury Blowout & Waves', price: 65, duration: '45 min', desc: 'Wash, condition, and expert styling with dynamic round-brush volume or soft waves.' },
  ],
  color: [
    { id: 'balayage', name: 'Signature Balayage & Glaze', price: 240, duration: '150 min', desc: 'Hand-painted sun-kissed highlighting for seamless regrowth, complete with custom toner.' },
    { id: 'foils', name: 'French Foil Highlights', price: 185, duration: '120 min', desc: 'Full-head classical dimensional foils for bright, highly blended blondes or brondes.' },
    { id: 'custom-color', name: 'All-Over Custom Color', price: 140, duration: '90 min', desc: 'Single-process root retouching or all-over rich saturation gloss.' },
  ],
  treatments: [
    { id: 'keratin', name: 'Keratin Smoothing Therapy', price: 260, duration: '120 min', desc: 'Frizz-free silk treatment that seals cuticle, cuts drying time, and lasts up to 5 months.' },
    { id: 'scalp-spa', name: 'Botanical Scalp Detox', price: 90, duration: '45 min', desc: 'Exfoliating wash, nutrient-rich oil massage, and steam conditioning to stimulate root health.' },
    { id: 'repair-mask', name: 'Intense Bond Repair Mask', price: 55, duration: '30 min', desc: 'Deep restructuring treatment to restore disulfide bonds in damaged/colored hair.' },
  ],
  bridal: [
    { id: 'bridal-style', name: 'Bridal Hair Trial & Design', price: 130, duration: '90 min', desc: 'In-depth consultation, style experimentation, and final wedding-day hair trial run.' },
    { id: 'special-event', name: 'Special Event Hair Styling', price: 110, duration: '60 min', desc: 'Updos, half-up styles, or editorial braids for black-tie galas and special evenings.' },
    { id: 'extensions', name: 'Luxury Extensions Consult', price: 50, duration: '30 min', desc: 'Individual matching, color blending assessment, and weft/tape placement consultation.' },
  ]
};

export default function Services({ onSelectService }) {
  const [activeTab, setActiveTab] = useState('styling');

  const handleBookService = (service) => {
    onSelectService(service);
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" style={styles.section}>
      <div className="container">
        <div className="section-header reveal">
          <p>OUR EXQUISITE MENU</p>
          <h2>Services & Pricing</h2>
        </div>

        {/* Dynamic Category Selector */}
        <div className="reveal" style={styles.tabContainer}>
          <button 
            onClick={() => setActiveTab('styling')} 
            style={styles.tabBtn(activeTab === 'styling')}
          >
            Cut & Style
          </button>
          <button 
            onClick={() => setActiveTab('color')} 
            style={styles.tabBtn(activeTab === 'color')}
          >
            Artisanal Color
          </button>
          <button 
            onClick={() => setActiveTab('treatments')} 
            style={styles.tabBtn(activeTab === 'treatments')}
          >
            Hair Health
          </button>
          <button 
            onClick={() => setActiveTab('bridal')} 
            style={styles.tabBtn(activeTab === 'bridal')}
          >
            Bridal & Events
          </button>
        </div>

        {/* Services List Grid */}
        <div className="reveal" style={styles.servicesGrid}>
          {SERVICES_DATA[activeTab].map((service) => (
            <div 
              key={service.id} 
              className="glass-panel" 
              style={styles.serviceCard}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.serviceName}>{service.name}</h3>
                <span style={styles.servicePrice}>${service.price}</span>
              </div>
              
              <div style={styles.metaRow}>
                <Clock size={13} style={styles.metaIcon} />
                <span>{service.duration}</span>
              </div>
              
              <p style={styles.serviceDesc}>{service.desc}</p>
              
              <button 
                onClick={() => handleBookService(service)} 
                style={styles.cardBookBtn}
              >
                <span>BOOK SERVICE</span>
                <CalendarDays size={14} style={{ marginLeft: '6px' }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: 'var(--bg-primary)',
    borderBottom: '1px solid var(--border-color)',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.8rem',
    marginBottom: '3.5rem',
    flexWrap: 'wrap',
  },
  tabBtn: (isActive) => ({
    padding: '0.7rem 2rem',
    fontSize: '0.78rem',
    fontWeight: '600',
    letterSpacing: '0.12rem',
    textTransform: 'uppercase',
    color: isActive ? '#050a12' : 'var(--text-primary)',
    backgroundColor: isActive ? 'var(--accent-gold)' : 'transparent',
    border: '1.5px solid var(--accent-gold)',
    borderRadius: 'var(--radius-pill)',
    boxShadow: isActive ? '0 4px 12px var(--accent-gold-glow)' : 'none',
  }),
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.2rem',
    position: 'relative',
  },
  serviceCard: {
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '0.5rem',
    gap: '1rem',
  },
  serviceName: {
    fontSize: '1.35rem',
    fontWeight: '500',
    color: 'var(--text-primary)',
  },
  servicePrice: {
    fontSize: '1.45rem',
    fontFamily: 'var(--font-serif)',
    fontWeight: '600',
    color: 'var(--accent-gold)',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
  },
  metaIcon: {
    marginRight: '6px',
    color: 'var(--accent-gold)',
  },
  serviceDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  cardBookBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.8rem 0',
    width: '100%',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    color: 'var(--text-primary)',
    border: '1.5px solid var(--border-color)',
    backgroundColor: 'rgba(194, 156, 83, 0.04)',
    borderRadius: 'var(--radius-pill)',
    marginTop: 'auto',
  },
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    #services div[class*="serviceCard"]:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 35px var(--shadow-hover);
      border-color: var(--accent-gold) !important;
    }
    #services div[class*="serviceCard"] button:hover {
      background-color: var(--accent-gold) !important;
      color: #050a12 !important;
      border-color: var(--accent-gold) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}
