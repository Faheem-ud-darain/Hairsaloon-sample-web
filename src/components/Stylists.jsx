import React from 'react';
import { Award, Heart, Star } from 'lucide-react';

const TEAM = [
  {
    id: 'bilal',
    name: 'Bilal',
    role: 'Master Stylist & Director',
    rating: 4.9,
    reviews: 58,
    experience: '10+ Years',
    specialties: ['Precision Razor Cuts', 'Custom Hair Colouring', 'French Balayage'],
    bio: 'Bilal is hands down the best hairstylist in London. Having trained globally, he specializes in creating custom dimensional color profiles and bespoke cuts tailored to individual bone structure.'
  },
  {
    id: 'marcus',
    name: 'Marcus Sterling',
    role: 'Senior Stylist',
    rating: 4.8,
    reviews: 34,
    experience: '8 Years',
    specialties: ['French Bob Styling', 'Volume Blowouts', 'Razor Texturing'],
    bio: 'Marcus focuses on structure and texture. His cuts are designed to sit perfectly naturally without requiring hours of daily styling.'
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Extensions Specialist',
    rating: 5.0,
    reviews: 26,
    experience: '7 Years',
    specialties: ['Seamless Tape-ins', 'Keratin Silk Infusions', 'Scalp Detox Therapy'],
    bio: 'Elena is our structural health expert, restoring hair strength from root to tip and placing premium organic extensions.'
  }
];

export default function Stylists() {
  return (
    <section id="stylists" style={styles.section}>
      <div className="container">
        <div className="section-header reveal">
          <p>MEET THE ARTISTS</p>
          <h2>Master Stylists</h2>
        </div>

        <div className="reveal" style={styles.stylistGrid}>
          {TEAM.map((member) => (
            <div key={member.id} className="glass-panel" style={styles.stylistCard}>
              {/* Graphic Placeholder Styling Frame */}
              <div style={styles.avatarWrapper}>
                <div style={styles.avatarPlaceholder}>
                  <span style={styles.avatarText}>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  <div style={styles.experienceTag}>
                    <Award size={10} style={{ marginRight: '3px' }} />
                    <span>{member.experience}</span>
                  </div>
                </div>
              </div>

              {/* Bio & Specialties */}
              <div style={styles.cardContent}>
                <div style={styles.titleRow}>
                  <h3 style={styles.name}>{member.name}</h3>
                  <div style={styles.ratingBox}>
                    <Star size={13} fill="var(--accent-gold)" color="var(--accent-gold)" />
                    <span style={styles.rating}>{member.rating}</span>
                  </div>
                </div>
                
                <span style={styles.role}>{member.role}</span>
                
                <p style={styles.bioText}>{member.bio}</p>
                
                <div style={styles.specialtiesList}>
                  {member.specialties.map((spec, i) => (
                    <span key={i} style={styles.specialtyBadge}>{spec}</span>
                  ))}
                </div>

                <div style={styles.socialRow}>
                  <a href="#instagram" aria-label={`${member.name} Instagram`} style={styles.socialLink}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    <span style={styles.socialText}>@aura_{member.name.split(' ')[0].toLowerCase()}</span>
                  </a>
                  <div style={styles.lovesCount}>
                    <Heart size={12} fill="var(--accent-gold)" color="var(--accent-gold)" style={{ marginRight: '4px' }} />
                    <span>{member.reviews} reviews</span>
                  </div>
                </div>
              </div>
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
  stylistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
    position: 'relative',
  },
  stylistCard: {
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  avatarWrapper: {
    width: '100%',
    aspectRatio: '1.2',
    backgroundColor: 'var(--bg-secondary)',
    position: 'relative',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, rgba(6, 11, 19, 0.2) 0%, rgba(197, 160, 89, 0.08) 100%)',
    position: 'relative',
  },
  avatarText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '4.5rem',
    fontWeight: '300',
    color: 'var(--accent-gold)',
    opacity: '0.45',
    letterSpacing: '0.1em',
  },
  experienceTag: {
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    backgroundColor: 'rgba(5, 10, 18, 0.85)',
    border: '1px solid var(--accent-gold)',
    color: 'var(--accent-gold)',
    fontSize: '0.65rem',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.05em',
  },
  cardContent: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: 'var(--text-primary)',
  },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  rating: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  role: {
    fontSize: '0.8rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    color: 'var(--accent-gold)',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  bioText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    flex: 1,
  },
  specialtiesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
    marginBottom: '1.5rem',
  },
  specialtyBadge: {
    fontSize: '0.7rem',
    padding: '4px 10px',
    borderRadius: 'var(--radius-pill)',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  },
  socialRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  socialText: {
    opacity: '0.8',
  },
  lovesCount: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    #stylists div[class*="stylistCard"]:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 35px var(--shadow-hover);
      border-color: var(--accent-gold) !important;
    }
    #stylists div[class*="stylistCard"]:hover a[class*="socialLink"] {
      color: var(--accent-gold) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}
