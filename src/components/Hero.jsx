import React, { useState, useRef } from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import heroModel from '../assets/hero_model.png';
import afterHair from '../assets/after_hair.png';
import beforeHair from '../assets/before_hair.png';

const STYLE_VIBES = {
  balayage: {
    num: '01',
    title: 'Sunkissed Balayage',
    sub: 'COLOUR DESIGN',
    desc: 'Signature hand-painted highlights that catch daylight seamlessly, tailored to your growth.',
    price: '$240',
    duration: '150m',
    stylist: 'Sarah Jean',
    image: heroModel,
    glow: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229, 176, 152, 0.18) 0%, transparent 60%)',
    color: 'var(--accent-gold)'
  },
  silk: {
    num: '02',
    title: 'Keratin Silk Recovery',
    sub: 'HAIR HEALTH',
    desc: 'Deep organic protein infusions to seal split cuticles and lock in high-gloss shine.',
    price: '$260',
    duration: '120m',
    stylist: 'Elena Rostova',
    image: afterHair,
    glow: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(216, 120, 95, 0.15) 0%, transparent 60%)',
    color: '#d48a6a' // Warm Terracotta Rose Gold
  },
  cut: {
    num: '03',
    title: 'Precision Razor Cut',
    sub: 'SCULPT & SHAPE',
    desc: 'Asymmetrical editorial texturing designed to sit perfectly without heavy styling.',
    price: '$95',
    duration: '60m',
    stylist: 'Marcus Sterling',
    image: beforeHair,
    glow: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(184, 80, 110, 0.15) 0%, transparent 60%)',
    color: '#b35c6e' // Burgundy Rose
  }
};

export default function Hero() {
  const [activeVibe, setActiveVibe] = useState('balayage');
  const containerRef = useRef(null);
  const current = STYLE_VIBES[activeVibe];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={styles.heroSection}
      className="spotlight-container"
    >
      {/* Massive Background Decorative Lettering */}
      <div style={styles.hugeBackdropText}>AURA</div>

      <div className="container" style={styles.heroGrid}>
        {/* Left Column: Bold Editorial Typography & CTA */}
        <div className="reveal-left active" style={styles.heroLeft}>
          <div style={styles.tagline}>
            <span style={{ color: current.color }}>ESTABLISHED 2026</span>
          </div>
          
          <h1 style={styles.mainTitle}>
            THE ART<br />
            OF HAIR<br />
            <span style={{ color: current.color, transition: 'color 0.4s', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              REDEFINED.
            </span>
          </h1>
          
          <p style={styles.description}>
            We combine high-fashion aesthetics with master craftsmanship. Scroll to customize your style and reserve your session.
          </p>

          <button 
            onClick={() => handleScrollTo('booking')} 
            className="btn-primary" 
            style={{
              ...styles.bookBtn,
              background: `linear-gradient(135deg, ${current.color} 0%, rgba(15,8,10,0.9) 180%)`,
              boxShadow: `0 8px 25px ${current.color}33`,
              color: 'var(--bg-primary)'
            }}
          >
            <Calendar size={15} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Book Reservation
          </button>
        </div>

        {/* Center: Overlapping Portrait Frame */}
        <div style={styles.heroCenter}>
          <div style={styles.imageWrapper} className="floating-element">
            <div style={{ ...styles.imageBorder, borderColor: current.color }}></div>
            <img 
              src={current.image} 
              alt={current.title} 
              style={styles.mainImg}
              key={activeVibe}
            />
            {/* Corner floating spec badge */}
            <div className="glass-panel" style={styles.floatBadge}>
              <div style={styles.badgeHeader}>
                <span style={{ color: current.color }}>{current.sub}</span>
                <strong>{current.price}</strong>
              </div>
              <div style={styles.badgeDivider}></div>
              <div style={styles.badgeFooter}>
                <span>Time: {current.duration}</span>
                <span>By {current.stylist}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Menu List */}
        <div className="reveal-right active" style={styles.heroRight}>
          <span style={styles.menuLabel}>STYLE VIBES:</span>
          <div style={styles.vibeMenu}>
            {Object.keys(STYLE_VIBES).map((vibeKey) => {
              const item = STYLE_VIBES[vibeKey];
              const isSelected = activeVibe === vibeKey;
              return (
                <div 
                  key={vibeKey}
                  onMouseEnter={() => setActiveVibe(vibeKey)}
                  onClick={() => setActiveVibe(vibeKey)}
                  style={styles.vibeMenuItem(isSelected)}
                >
                  <span style={styles.vibeNumber(isSelected, item.color)}>{item.num}</span>
                  <div style={styles.vibeMeta}>
                    <h3 style={styles.vibeTitle(isSelected, item.color)}>{item.title}</h3>
                    {isSelected && (
                      <p style={styles.vibeDesc}>{item.desc}</p>
                    )}
                  </div>
                  <ArrowRight 
                    size={16} 
                    style={styles.vibeArrow(isSelected, item.color)} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Down Cues */}
      <div style={styles.scrollDown} onClick={() => handleScrollTo('before-after')}>
        <span style={styles.scrollDownText}>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8rem',
    paddingBottom: '5rem',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-primary)',
    position: 'relative',
  },
  hugeBackdropText: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '22vw',
    fontWeight: '800',
    fontFamily: 'var(--font-sans)',
    letterSpacing: '0.1em',
    color: 'var(--text-primary)',
    opacity: '0.04',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 0,
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '0.9fr 1fr 1.1fr',
    gap: '3rem',
    alignItems: 'center',
    zIndex: 2,
    position: 'relative',
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tagline: {
    fontSize: '0.72rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontSize: '3.6rem',
    fontWeight: '800',
    lineHeight: '1.05',
    color: 'var(--text-primary)',
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-sans)',
  },
  description: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
    marginBottom: '2.5rem',
  },
  bookBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    border: 'none',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  heroCenter: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '320px',
    aspectRatio: '0.75',
  },
  imageBorder: {
    position: 'absolute',
    top: '18px',
    left: '-18px',
    width: '100%',
    height: '100%',
    border: '2px solid var(--accent-gold)',
    borderRadius: 'var(--radius-lg)',
    zIndex: 1,
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  mainImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'var(--radius-lg)',
    position: 'relative',
    zIndex: 2,
    boxShadow: '0 20px 45px var(--shadow-color)',
    animation: 'imageFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  floatBadge: {
    position: 'absolute',
    bottom: '-25px',
    right: '-15px',
    padding: '1rem 1.2rem',
    width: '200px',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    borderRadius: 'var(--radius-md)',
  },
  badgeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.7rem',
    fontWeight: '700',
  },
  badgeDivider: {
    width: '100%',
    height: '1px',
    backgroundColor: 'var(--border-color)',
  },
  badgeFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    fontWeight: '600',
  },
  heroRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    paddingLeft: '1rem',
  },
  menuLabel: {
    fontSize: '0.65rem',
    fontWeight: '800',
    letterSpacing: '0.2em',
    color: 'var(--text-secondary)',
  },
  vibeMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  vibeMenuItem: (isSelected) => ({
    display: 'flex',
    gap: '1.2rem',
    alignItems: 'flex-start',
    padding: '1.2rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    backgroundColor: isSelected ? 'var(--bg-secondary)' : 'transparent',
    border: `1.5px solid ${isSelected ? 'var(--border-color)' : 'transparent'}`,
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
  }),
  vibeNumber: (isSelected, color) => ({
    fontFamily: 'var(--font-serif)',
    fontSize: '1.4rem',
    fontWeight: '700',
    color: isSelected ? color : 'var(--text-secondary)',
    opacity: isSelected ? 1 : 0.4,
    transition: 'color 0.4s, opacity 0.4s',
  }),
  vibeMeta: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  vibeTitle: (isSelected, color) => ({
    fontSize: '1.25rem',
    fontWeight: '600',
    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.4s',
  }),
  vibeDesc: {
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
    marginTop: '0.5rem',
    lineHeight: '1.5',
    animation: 'slideTextIn 0.4s ease-out',
  },
  vibeArrow: (isSelected, color) => ({
    color: isSelected ? color : 'var(--text-secondary)',
    opacity: isSelected ? 1 : 0,
    transform: isSelected ? 'translateX(0)' : 'translateX(-10px)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    marginTop: '4px',
  }),
  scrollDown: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    opacity: 0.7,
    zIndex: 3,
  },
  scrollDownText: {
    fontSize: '0.62rem',
    fontWeight: '700',
    letterSpacing: '0.3em',
    color: 'var(--text-secondary)',
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes imageFadeIn {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes slideTextIn {
      0% { opacity: 0; transform: translateY(5px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    #hero div[class*="vibeMenuItem"]:hover {
      background-color: var(--bg-secondary) !important;
    }
    @media (max-width: 990px) {
      #hero .container {
        grid-template-columns: 1fr !important;
        gap: 3rem !important;
      }
      #hero div[class*="heroRight"] {
        padding-left: 0 !important;
      }
      #hero div[class*="heroCenter"] {
        display: none !important;
      }
      #hero h1 {
        font-size: 3rem !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}
