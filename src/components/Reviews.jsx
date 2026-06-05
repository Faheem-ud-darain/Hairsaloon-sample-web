import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Catherine Ross',
    rating: 5,
    date: '1 week ago',
    text: 'Aura Salon is in a league of its own. Sarah Jean completely transformed my brassy hair into a gorgeous, dimensional honey balayage. The space feels like a high-end luxury spa, and the booking system was so seamless.',
    tag: 'Balayage & Glaze'
  },
  {
    id: 2,
    name: 'Julianne Myers',
    rating: 5,
    date: '3 weeks ago',
    text: 'I\'ve been going to Marcus for razor cuts for the past two years. He is incredibly precise, and my bob grow outs are so low-maintenance. They offer organic tea, and the attention to detail is unmatched.',
    tag: 'Signature Cut & Styling'
  },
  {
    id: 3,
    name: 'Sophia Thorne',
    rating: 5,
    date: '1 month ago',
    text: 'Elena did my tape-in extensions and botanical scalp detox. Not only is the volume and blending completely indistinguishable from my real hair, but my scalp health is the best it\'s ever been. Highly recommend!',
    tag: 'Tape-In Extensions'
  }
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" style={styles.section}>
      {/* Background Decor */}
      <div style={styles.quoteIconWrapper}>
        <Quote size={200} style={styles.bgQuote} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-header reveal">
          <p>CLIENT TESTIMONIALS</p>
          <h2>Aura Experiences</h2>
        </div>

        <div className="reveal" style={styles.carouselContainer}>
          {/* Testimonial Active Slide */}
          <div className="glass-panel" style={styles.reviewCard}>
            <div style={styles.starsRow}>
              {[...Array(REVIEWS[activeIndex].rating)].map((_, i) => (
                <Star key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
              ))}
            </div>
            
            <p style={styles.reviewText}>"{REVIEWS[activeIndex].text}"</p>
            
            <div style={styles.reviewerRow}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={styles.reviewerName}>{REVIEWS[activeIndex].name}</strong>
                <span style={styles.reviewDate}>{REVIEWS[activeIndex].date} • verified client</span>
              </div>
              <span style={styles.serviceTag}>{REVIEWS[activeIndex].tag}</span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div style={styles.dotsRow}>
            {REVIEWS.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)} 
                style={styles.dotBtn(activeIndex === i)}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    overflow: 'hidden',
  },
  quoteIconWrapper: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    opacity: '0.03',
    color: 'var(--accent-gold)',
    pointerEvents: 'none',
  },
  bgQuote: {
    transform: 'rotate(180deg)',
  },
  carouselContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
  },
  reviewCard: {
    padding: '3rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    minHeight: '320px',
    justifyContent: 'center',
  },
  starsRow: {
    display: 'flex',
    gap: '4px',
    marginBottom: '1.5rem',
  },
  reviewText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.45rem',
    lineHeight: '1.7',
    fontStyle: 'italic',
    color: 'var(--text-primary)',
    marginBottom: '2.5rem',
    maxWidth: '680px',
  },
  reviewerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '1.5rem',
    alignItems: 'center',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  reviewerName: {
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
  },
  reviewDate: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  serviceTag: {
    fontSize: '0.7rem',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--accent-gold)',
    border: '1px solid var(--border-color)',
    padding: '4px 12px',
    borderRadius: 'var(--radius-pill)',
    backgroundColor: 'var(--bg-primary)',
  },
  dotsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.6rem',
    marginTop: '1.5rem',
  },
  dotBtn: (isActive) => ({
    width: isActive ? '24px' : '8px',
    height: '8px',
    borderRadius: 'var(--radius-pill)',
    backgroundColor: isActive ? 'var(--accent-gold)' : 'var(--border-color)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }),
};
