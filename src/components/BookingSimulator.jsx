import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle2, ChevronRight, ChevronLeft, Star } from 'lucide-react';

const STYLISTS = [
  { id: 'bilal', name: 'Bilal', role: 'Master Stylist & Director', rating: 4.9, reviews: 58, specialties: 'Balayage & Precision Cuts' },
  { id: 'marcus', name: 'Marcus Sterling', role: 'Senior Stylist', rating: 4.8, reviews: 34, specialties: 'Texture & Styling' },
  { id: 'elena', name: 'Elena Rostova', role: 'Extensions & Spa Specialist', rating: 5.0, reviews: 26, specialties: 'Keratin & Tape Extensions' },
];

const TIME_SLOTS = [
  '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'
];

const getNextSevenDays = () => {
  const days = [];
  const msPerDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(today.getTime() + i * msPerDay);
    const weekday = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = nextDate.getDate();
    const month = nextDate.toLocaleDateString('en-US', { month: 'short' });
    days.push({ id: `${month}-${dayNum}`, label: weekday, num: dayNum, month, dateObject: nextDate });
  }
  return days;
};

export default function BookingSimulator({ selectedService, setSelectedService }) {
  const [step, setStep] = useState(1);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '' });
  const [bookingFinished, setBookingFinished] = useState(false);
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(getNextSevenDays());
  }, []);

  useEffect(() => {
    if (selectedService) {
      setStep(1);
      setBookingFinished(false);
    }
  }, [selectedService]);

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedStylist) return;
    if (step === 3 && (!selectedDate || !selectedTime)) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinishBooking = (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.email || !clientInfo.phone) return;
    setBookingFinished(true);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setClientInfo({ name: '', email: '', phone: '' });
    setBookingFinished(false);
  };

  return (
    <section id="booking" style={styles.section}>
      <div className="container">
        <div className="section-header reveal">
          <p>EXPERIENCE 4K HAIR STUDIO</p>
          <h2>Reserve Your Appointment</h2>
          <span style={styles.subtext}>Select your services and schedule your visit seamlessly online.</span>
        </div>

        <div className="glass-panel" style={styles.bookingBox}>
          {/* Stepper Progress Bar */}
          {!bookingFinished && (
            <div style={styles.stepperContainer}>
              <div style={styles.stepIndicator(step >= 1)}>1. Service</div>
              <div style={styles.stepLine(step >= 2)}></div>
              <div style={styles.stepIndicator(step >= 2)}>2. Stylist</div>
              <div style={styles.stepLine(step >= 3)}></div>
              <div style={styles.stepIndicator(step >= 3)}>3. Schedule</div>
              <div style={styles.stepLine(step >= 4)}></div>
              <div style={styles.stepIndicator(step >= 4)}>4. Confirm</div>
            </div>
          )}

          {/* Booking Body Content */}
          <div style={styles.cardBody}>
            {bookingFinished ? (
              // Success Screen
              <div style={styles.successWrapper}>
                <CheckCircle2 size={64} style={styles.successIcon} />
                <h3 style={styles.successTitle}>Reservation Complete!</h3>
                <p style={styles.successDesc}>
                  Your booking request for a <strong>{selectedService.name}</strong> was submitted successfully.
                </p>
                
                {/* Visual Gold Ticket Receipt */}
                <div className="glass-panel" style={styles.receipt}>
                  <div style={styles.receiptHeader}>
                    <span>4K HAIR STUDIO RESERVATION</span>
                  </div>
                  <div style={styles.receiptRow}>
                    <span>Client:</span>
                    <strong>{clientInfo.name}</strong>
                  </div>
                  <div style={styles.receiptRow}>
                    <span>Service:</span>
                    <strong>{selectedService.name}</strong>
                  </div>
                  <div style={styles.receiptRow}>
                    <span>Stylist:</span>
                    <strong>{selectedStylist.name}</strong>
                  </div>
                  <div style={styles.receiptRow}>
                    <span>Time:</span>
                    <strong>{selectedDate.label}, {selectedDate.month} {selectedDate.num} at {selectedTime}</strong>
                  </div>
                  <div style={styles.receiptDivider}></div>
                  <div style={styles.receiptTotalRow}>
                    <span>Total Amount:</span>
                    <strong style={styles.receiptTotal}>${selectedService.price}</strong>
                  </div>
                  <span style={styles.receiptFooter}>*Send details to finalize on WhatsApp.</span>
                </div>

                <a 
                  href={`https://wa.me/447888010133?text=Hi%204K%20Hair%20Studio%20London!%20I'd%20like%20to%20confirm%20my%20appointment%20for%20a%20${encodeURIComponent(selectedService.name)}%20with%20${encodeURIComponent(selectedStylist.name)}%20on%20${encodeURIComponent(selectedDate.month)}%20${encodeURIComponent(selectedDate.num)}%20at%20${encodeURIComponent(selectedTime)}.`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary" 
                  style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', backgroundColor: '#25D366', color: '#ffffff', border: '1px solid #25D366' }}
                >
                  Confirm on WhatsApp
                </a>
                
                <button onClick={resetBooking} style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', textDecoration: 'underline' }}>
                  Or Start Over
                </button>
              </div>
            ) : (
              // Active Booking Steps
              <div>
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <div>
                    <h4 style={styles.stepTitle}>Select a Luxury Service</h4>
                    <p style={styles.stepSubtitle}>Choose from our signature offerings to get started.</p>
                    <div style={styles.cardList}>
                      {[
                        { id: 'sig-cut', name: 'Signature Cut & Blowout', price: 95, duration: '60 min' },
                        { id: 'balayage', name: 'Signature Balayage & Glaze', price: 240, duration: '150 min' },
                        { id: 'keratin', name: 'Keratin Smoothing Therapy', price: 260, duration: '120 min' },
                        { id: 'bridal-style', name: 'Bridal Hair Trial & Design', price: 130, duration: '90 min' },
                      ].map((s) => (
                        <div 
                          key={s.id}
                          onClick={() => setSelectedService(s)}
                          style={styles.selectableCard(selectedService?.id === s.id)}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong style={styles.cardText}>{s.name}</strong>
                            <span style={styles.cardSub}>{s.duration}</span>
                          </div>
                          <strong style={styles.cardPrice}>${s.price}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Stylist Selection */}
                {step === 2 && (
                  <div>
                    <h4 style={styles.stepTitle}>Choose Your Master Stylist</h4>
                    <p style={styles.stepSubtitle}>Each artist excels in dedicated hairstyles and techniques.</p>
                    <div style={styles.cardList}>
                      STYLISTS.map
                      {STYLISTS.map((stylist) => (
                        <div 
                          key={stylist.id}
                          onClick={() => setSelectedStylist(stylist)}
                          style={styles.selectableCard(selectedStylist?.id === stylist.id)}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong style={styles.cardText}>{stylist.name}</strong>
                            <span style={styles.cardSub}>{stylist.role} • <em>{stylist.specialties}</em></span>
                          </div>
                          <div style={styles.ratingBox}>
                            <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />
                            <span style={styles.ratingText}>{stylist.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time Selector */}
                {step === 3 && (
                  <div>
                    <h4 style={styles.stepTitle}>Schedule Your Session</h4>
                    <p style={styles.stepSubtitle}>Select your preferred date and available hour slot.</p>
                    
                    <div style={styles.dateSelectorGrid}>
                      {days.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          style={styles.dateButton(selectedDate?.id === d.id)}
                        >
                          <span style={styles.dateDayName}>{d.label}</span>
                          <span style={styles.dateDayNum}>{d.num}</span>
                          <span style={styles.dateMonthName}>{d.month}</span>
                        </button>
                      ))}
                    </div>

                    {selectedDate && (
                      <div style={{ marginTop: '2rem' }}>
                        <p style={styles.timeLabel}>Available Slots for {selectedDate.month} {selectedDate.num}:</p>
                        <div style={styles.timeSelectorGrid}>
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSelectedTime(t)}
                              style={styles.timeButton(selectedTime === t)}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Final Form Confirmation */}
                {step === 4 && (
                  <div>
                    <h4 style={styles.stepTitle}>Confirm Reservation Details</h4>
                    <p style={styles.stepSubtitle}>Fill out your details to finalize your appointment.</p>
                    
                    <form onSubmit={handleFinishBooking} style={styles.form}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Your Full Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g., Jane Doe"
                          value={clientInfo.name}
                          onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Email Address</label>
                          <input 
                            type="email" 
                            required 
                            placeholder="jane@example.com"
                            value={clientInfo.email}
                            onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                            style={styles.input}
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Phone Number</label>
                          <input 
                            type="tel" 
                            required 
                            placeholder="(555) 000-0000"
                            value={clientInfo.phone}
                            onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                            style={styles.input}
                          />
                        </div>
                      </div>

                      <div className="glass-panel" style={styles.formSummary}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span>{selectedService?.name}</span>
                          <strong>${selectedService?.price}</strong>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          With {selectedStylist?.name} on {selectedDate?.month} {selectedDate?.num} at {selectedTime}
                        </div>
                      </div>

                      <button type="submit" className="btn-primary" style={styles.formSubmitBtn}>
                        Book Appointment
                      </button>
                    </form>
                  </div>
                )}

                {/* Navigation Actions */}
                <div style={styles.stepNavigation}>
                  {step > 1 && (
                    <button onClick={handlePrevStep} style={styles.prevBtn}>
                      <ChevronLeft size={16} />
                      <span>Back</span>
                    </button>
                  )}
                  {step < 4 && (
                    <button 
                      onClick={handleNextStep} 
                      className="btn-primary" 
                      style={{ 
                        marginLeft: 'auto',
                        opacity: ((step === 1 && !selectedService) || (step === 2 && !selectedStylist) || (step === 3 && (!selectedDate || !selectedTime))) ? 0.5 : 1,
                        pointerEvents: ((step === 1 && !selectedService) || (step === 2 && !selectedStylist) || (step === 3 && (!selectedDate || !selectedTime))) ? 'none' : 'auto'
                      }}
                    >
                      <span>Next Step</span>
                      <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                    </button>
                  )}
                </div>
              </div>
            )}
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
  },
  subtext: {
    display: 'block',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    marginTop: '0.5rem',
  },
  bookingBox: {
    maxWidth: '720px',
    margin: '0 auto',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    position: 'relative',
  },
  stepperContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    backgroundColor: 'rgba(194, 156, 83, 0.05)',
    borderBottom: '1px solid var(--border-color)',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  stepIndicator: (isActive) => ({
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
    transition: 'color 0.3s ease',
  }),
  stepLine: (isActive) => ({
    flex: 1,
    height: '1px',
    backgroundColor: isActive ? 'var(--accent-gold)' : 'var(--border-color)',
    minWidth: '20px',
    transition: 'background-color 0.3s ease',
  }),
  cardBody: {
    padding: '2.5rem 2rem',
  },
  stepTitle: {
    fontSize: '1.6rem',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  stepSubtitle: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  selectableCard: (isSelected) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.2rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-color)',
    backgroundColor: isSelected ? 'rgba(194, 156, 83, 0.06)' : 'var(--bg-primary)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  }),
  cardText: {
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
  },
  cardSub: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  },
  cardPrice: {
    fontSize: '1.15rem',
    fontFamily: 'var(--font-serif)',
    color: 'var(--accent-gold)',
  },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  ratingText: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  dateSelectorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  dateButton: (isSelected) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.8rem 0',
    border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-color)',
    backgroundColor: isSelected ? 'rgba(194, 156, 83, 0.08)' : 'var(--bg-primary)',
    color: isSelected ? 'var(--accent-gold)' : 'var(--text-primary)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),
  dateDayName: {
    fontSize: '0.65rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  dateDayNum: {
    fontSize: '1.2rem',
    fontWeight: '600',
    fontFamily: 'var(--font-serif)',
  },
  dateMonthName: {
    fontSize: '0.6rem',
    opacity: '0.8',
    textTransform: 'uppercase',
    marginTop: '4px',
  },
  timeLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  timeSelectorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '0.5rem',
  },
  timeButton: (isSelected) => ({
    padding: '0.6rem 0',
    fontSize: '0.8rem',
    textAlign: 'center',
    border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid var(--border-color)',
    backgroundColor: isSelected ? 'var(--accent-gold)' : 'var(--bg-primary)',
    color: isSelected ? '#050a12' : 'var(--text-primary)',
    borderRadius: 'var(--radius-pill)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.2rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
  },
  input: {
    padding: '0.8rem 1.2rem',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    borderRadius: 'var(--radius-pill)',
  },
  formSummary: {
    padding: '1.2rem',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.9rem',
  },
  formSubmitBtn: {
    width: '100%',
    padding: '1rem',
    letterSpacing: '0.15em',
  },
  stepNavigation: {
    display: 'flex',
    marginTop: '2.5rem',
    alignItems: 'center',
  },
  prevBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  successWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1rem 0',
  },
  successIcon: {
    color: 'var(--accent-gold)',
    marginBottom: '1rem',
  },
  successTitle: {
    fontSize: '2rem',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  successDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
    maxWidth: '480px',
  },
  receipt: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    border: '1.5px solid var(--accent-gold)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    position: 'relative',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
  },
  receiptHeader: {
    textAlign: 'center',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    color: 'var(--accent-gold)',
    borderBottom: '1px dashed var(--border-color)',
    paddingBottom: '0.8rem',
    marginBottom: '0.4rem',
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
  },
  receiptDivider: {
    borderBottom: '1px dashed var(--border-color)',
    margin: '0.5rem 0',
  },
  receiptTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  receiptTotal: {
    fontSize: '1.4rem',
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-serif)',
  },
  receiptFooter: {
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    marginTop: '1rem',
  }
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    #booking input:focus {
      border-color: var(--accent-gold) !important;
    }
    #booking div[class*="selectableCard"]:hover {
      border-color: var(--accent-gold) !important;
      background-color: rgba(194, 156, 83, 0.04) !important;
      transform: translateY(-2px);
    }
    @media (max-width: 600px) {
      #booking div[class*="dateSelectorGrid"] {
        grid-template-columns: repeat(4, 1fr) !important;
        gap: 0.4rem !important;
      }
      #booking div[class*="formRow"] {
        grid-template-columns: 1fr !important;
        gap: 1.2rem !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}
