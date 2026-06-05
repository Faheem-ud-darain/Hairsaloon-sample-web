import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Calendar } from 'lucide-react';

export default function Header({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id) => {
    setDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header style={styles.header(scrolled)}>
        <div className="container" style={styles.navContainer}>
          {/* Logo Monogram & Name */}
          <div style={styles.logo} onClick={() => scrollToSection('hero')}>
            <span style={styles.logoLetter}>4K</span>
            <span style={styles.logoText}>4K <span style={styles.logoSubText}>HAIR STUDIO</span></span>
          </div>

          {/* Clean Controls: Theme Toggle & Side Menu Trigger */}
          <div style={styles.controls}>
            <button id="theme-toggle" onClick={toggleTheme} style={styles.controlBtn} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Hamburger trigger */}
            <button 
              onClick={() => setDrawerOpen(true)} 
              style={styles.menuTrigger} 
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for drawer */}
      {drawerOpen && (
        <div 
          style={styles.drawerBackdrop} 
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Sliding Side Drawer Menu (Full Height, Right Aligned) */}
      <div 
        className="glass-panel" 
        style={styles.drawer(drawerOpen)}
      >
        <div style={styles.drawerHeader}>
          <div style={styles.logo} onClick={() => scrollToSection('hero')}>
            <span style={styles.logoLetter}>4K</span>
            <span style={styles.logoText}>4K</span>
          </div>
          <button 
            onClick={() => setDrawerOpen(false)} 
            style={styles.closeBtn} 
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Big Editorial Links */}
        <nav style={styles.drawerNav}>
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} style={styles.drawerLink}>Home</a>
          <a href="#before-after" onClick={(e) => { e.preventDefault(); scrollToSection('before-after'); }} style={styles.drawerLink}>Gallery</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} style={styles.drawerLink}>Services & Pricing</a>
          <a href="#stylists" onClick={(e) => { e.preventDefault(); scrollToSection('stylists'); }} style={styles.drawerLink}>Stylists</a>
          <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }} style={styles.drawerLink}>Reviews</a>
        </nav>

        {/* Bottom Drawer CTA */}
        <div style={styles.drawerFooter}>
          <button 
            onClick={() => scrollToSection('booking')} 
            className="btn-primary" 
            style={styles.drawerCta}
          >
            <Calendar size={15} style={{ marginRight: '8px' }} />
            Book Appointment
          </button>
          <span style={styles.drawerInfo}>86, 90 Park St, London • +44 7888 010133</span>
        </div>
      </div>
    </>
  );
}

const styles = {
  header: (scrolled) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 999,
    padding: scrolled ? '1rem 2rem' : '2rem 2rem',
    backgroundColor: scrolled ? 'var(--glass-bg)' : 'transparent',
    borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
    boxShadow: scrolled ? '0 10px 30px var(--shadow-color)' : 'none',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  }),
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
  logoLetter: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.8rem',
    fontWeight: '300',
    color: 'var(--accent-gold)',
    border: '1.5px solid var(--accent-gold)',
    padding: '0 6px',
    marginRight: '10px',
    borderRadius: '4px',
    display: 'inline-block',
  },
  logoText: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    fontSize: '0.9rem',
    letterSpacing: '0.25em',
    color: 'var(--text-primary)',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1',
  },
  logoSubText: {
    fontSize: '0.5rem',
    letterSpacing: '0.6em',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  controlBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    transition: 'all 0.3s ease',
  },
  menuTrigger: {
    width: '38px',
    height: '38px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-primary)',
    transition: 'transform 0.2s ease',
  },
  drawerBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(10, 4, 6, 0.4)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease-out',
  },
  drawer: (open) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '400px',
    height: '100vh',
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem 2.5rem',
    borderRadius: '0px', // clean flush layout for side panel
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    transform: open ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.3)',
  }),
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4rem',
  },
  closeBtn: {
    color: 'var(--text-primary)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    flex: 1,
  },
  drawerLink: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem',
    fontWeight: '300',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '0.8rem',
  },
  drawerFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    marginTop: 'auto',
  },
  drawerCta: {
    width: '100%',
  },
  drawerInfo: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    letterSpacing: '0.05em',
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    header button[id="theme-toggle"]:hover {
      border-color: var(--accent-gold) !important;
      color: var(--accent-gold) !important;
    }
    header button[aria-label="Open navigation menu"]:hover {
      color: var(--accent-gold) !important;
      transform: scale(1.08);
    }
    nav a[class*="drawerLink"]:hover {
      color: var(--accent-gold) !important;
      padding-left: 10px;
    }
  `;
  document.head.appendChild(styleSheet);
}
