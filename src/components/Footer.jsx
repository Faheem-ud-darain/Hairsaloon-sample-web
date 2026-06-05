import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp, Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.mainGrid}>
        {/* Brand Info */}
        <div style={styles.column}>
          <div style={styles.logo} onClick={handleScrollToTop}>
            <span style={styles.logoLetter}>4K</span>
            <span style={styles.logoText}>4K <span style={styles.logoSubText}>HAIR STUDIO</span></span>
          </div>
          <p style={styles.brandDesc}>
            Bespoke styling and professional hair colouring treatments designed to cultivate your unique personal style in the heart of London.
          </p>
          <div style={styles.socialRow}>
            <a href="#instagram" aria-label="Instagram" style={styles.socialIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#facebook" aria-label="Facebook" style={styles.socialIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        {/* Operating Hours */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>OPERATING HOURS</h4>
          <div style={styles.hoursList}>
            <div style={styles.hoursRow}><span>Mon – Fri</span> <span>9:00 AM – 8:30 PM</span></div>
            <div style={styles.hoursRow}><span>Saturday</span> <span>9:00 AM – 8:00 PM</span></div>
            <div style={styles.hoursRow}><span>Sunday</span> <span>10:30 AM – 5:00 PM</span></div>
          </div>
        </div>

        {/* Contact Info & Location */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>CONTACT & LOCATION</h4>
          <div style={styles.contactDetails}>
            <a href="tel:+447888010133" style={styles.contactItem}>
              <Phone size={15} style={styles.contactIcon} />
              <span>+44 7888 010133</span>
            </a>
            <a href="https://wa.me/447888010133" target="_blank" rel="noopener noreferrer" style={styles.contactItem}>
              <Mail size={15} style={styles.contactIcon} />
              <span>wa.me/447888010133</span>
            </a>
            <div style={styles.contactItem}>
              <MapPin size={15} style={styles.contactIcon} />
              <span>86, 90 Park St, London W1K 7TN, UK</span>
            </div>
          </div>
          
          {/* Map Mockup */}
          <div className="glass-panel" style={styles.mapMock}>
            <span style={styles.mapPlaceholderText}>Google Maps Interactive Frame</span>
          </div>
        </div>

        {/* Newsletter / Booking Quick Signup */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>NEWS & PROMOTIONS</h4>
          <p style={styles.newsletterDesc}>Subscribe to receive exclusive seasonal offers and style guides.</p>
          {subscribed ? (
            <div style={styles.subscribedAlert}>
              <Check size={16} style={{ color: 'var(--accent-gold)', marginRight: '6px' }} />
              <span>Thank you! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={styles.subscribeForm}>
              <input 
                type="email" 
                required 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.subscribeInput}
              />
              <button type="submit" style={styles.subscribeBtn} aria-label="Subscribe">
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div style={styles.bottomBar}>
        <div className="container" style={styles.bottomContainer}>
          <span style={styles.copyright}>© 2026 4K Hair Studio London. All rights reserved.</span>
          <button onClick={handleScrollToTop} style={styles.scrollTopBtn}>
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--bg-secondary)',
    paddingTop: '6rem',
    borderTop: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '3rem',
    paddingBottom: '4rem',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
  logoLetter: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2rem',
    fontWeight: '300',
    color: 'var(--accent-gold)',
    border: '1.5px solid var(--accent-gold)',
    padding: '0 8px',
    marginRight: '10px',
    borderRadius: '4px',
    display: 'inline-block',
  },
  logoText: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    fontSize: '1rem',
    letterSpacing: '0.25em',
    color: 'var(--text-primary)',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1',
  },
  logoSubText: {
    fontSize: '0.55rem',
    letterSpacing: '0.6em',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  brandDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  socialRow: {
    display: 'flex',
    gap: '0.8rem',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    transition: 'all 0.3s ease',
  },
  columnTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.15em',
    color: 'var(--accent-gold)',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '0.6rem',
  },
  hoursList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    fontSize: '0.85rem',
  },
  hoursRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(197, 160, 89, 0.05)',
    paddingBottom: '6px',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    fontSize: '0.85rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    color: 'var(--text-secondary)',
  },
  contactIcon: {
    color: 'var(--accent-gold)',
    marginTop: '3px',
    flexShrink: 0,
  },
  mapMock: {
    width: '100%',
    height: '100px',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'var(--radius-md)',
  },
  mapPlaceholderText: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  newsletterDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  subscribeForm: {
    display: 'flex',
    position: 'relative',
  },
  subscribeInput: {
    flex: 1,
    padding: '0.8rem 1.2rem',
    paddingRight: '3rem',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    outline: 'none',
    borderRadius: 'var(--radius-pill)',
  },
  subscribeBtn: {
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--accent-gold)',
    cursor: 'pointer',
  },
  subscribedAlert: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  bottomBar: {
    borderTop: '1px solid var(--border-color)',
    padding: '2rem 0',
    marginTop: '4rem',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    opacity: '0.8',
  },
  scrollTopBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--accent-gold)',
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    footer a[class*="socialIcon"]:hover {
      border-color: var(--accent-gold) !important;
      color: var(--accent-gold) !important;
      transform: translateY(-2px);
    }
    footer a[class*="contactItem"]:hover {
      color: var(--accent-gold) !important;
    }
    @media (max-width: 990px) {
      footer div[class*="mainGrid"] {
        grid-template-columns: 1fr 1fr !important;
        gap: 2.5rem !important;
      }
    }
    @media (max-width: 600px) {
      footer div[class*="mainGrid"] {
        grid-template-columns: 1fr !important;
        gap: 2.5rem !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}
