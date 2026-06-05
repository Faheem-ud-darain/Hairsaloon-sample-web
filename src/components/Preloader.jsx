import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Reveal timing
    const timer = setTimeout(() => {
      setFade(true);
      // Wait for fade animation to finish
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(exitTimer);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={styles.preloaderContainer(fade)}>
      <div style={styles.logoWrapper}>
        {/* Glowing Monogram Ring */}
        <div style={styles.glowingRing(fade)}></div>
        
        {/* Gold Monogram A */}
        <div style={styles.monogram(fade)}>A</div>
        
        {/* Subtext */}
        <div style={styles.subtitle(fade)}>A U R A</div>
        <div style={styles.loaderLine(fade)}>
          <div style={styles.loaderProgress}></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  preloaderContainer: (fade) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#060b13', // Keeps it dark initially for suspense
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    opacity: fade ? 0 : 1,
    visibility: fade ? 'hidden' : 'visible',
    transform: fade ? 'scale(1.05)' : 'scale(1)',
    transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.6s',
  }),
  logoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  glowingRing: (fade) => ({
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '1px solid rgba(229, 193, 88, 0.2)',
    borderTop: '2px solid #e5c158',
    animation: 'spin 1.5s linear infinite',
    position: 'absolute',
    top: '-15px',
    opacity: fade ? 0 : 1,
    transition: 'opacity 0.4s ease',
  }),
  monogram: (fade) => ({
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '3.5rem',
    fontWeight: '300',
    color: '#e5c158',
    letterSpacing: '0.05em',
    lineHeight: '70px',
    textShadow: '0 0 15px rgba(229, 193, 88, 0.3)',
    opacity: fade ? 0 : 1,
    transform: fade ? 'translateY(-10px)' : 'translateY(0)',
    transition: 'all 0.5s ease',
  }),
  subtitle: (fade) => ({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.8rem',
    fontWeight: '400',
    color: '#faf9f6',
    letterSpacing: '0.5em',
    marginTop: '25px',
    opacity: fade ? 0 : 0.8,
    transform: fade ? 'translateY(10px)' : 'translateY(0)',
    transition: 'all 0.5s ease 0.1s',
  }),
  loaderLine: (fade) => ({
    width: '120px',
    height: '1px',
    backgroundColor: 'rgba(250, 249, 246, 0.1)',
    marginTop: '15px',
    position: 'relative',
    overflow: 'hidden',
    opacity: fade ? 0 : 1,
    transition: 'opacity 0.3s ease',
  }),
  loaderProgress: {
    width: '40%',
    height: '100%',
    backgroundColor: '#e5c158',
    position: 'absolute',
    left: '0',
    animation: 'loadingProgress 1.5s ease-in-out infinite',
  }
};

// Add standard keyframes for spin and loadingProgress to standard styling or document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes loadingProgress {
      0% { left: -40%; width: 30%; }
      50% { width: 60%; }
      100% { left: 110%; width: 20%; }
    }
  `;
  document.head.appendChild(styleSheet);
}
