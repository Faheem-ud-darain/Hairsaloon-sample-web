import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';
import beforeHair from '../assets/before_hair.png';
import afterHair from '../assets/after_hair.png';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section id="before-after" style={styles.section}>
      <div className="container">
        <div className="section-header reveal">
          <p>TRANSFORMATIONS</p>
          <h2>Artistry In Action</h2>
          <span style={styles.subtext}>Drag the slider to reveal the balayage and structural hair recovery treatment.</span>
        </div>

        <div className="reveal" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Interactive Drag Container */}
          <div 
            ref={containerRef}
            className="ba-container"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={styles.sliderContainer}
          >
            {/* Before Image (underneath) */}
            <img 
              src={beforeHair} 
              alt="Hair before styling" 
              className="ba-image ba-before"
            />
            <div className="ba-label before">Before Treatment</div>

            {/* After Image (clipped width on top) */}
            <div 
              style={{
                ...styles.clippedImageWrapper,
                width: `${sliderPosition}%`
              }}
            >
              <img 
                src={afterHair} 
                alt="Hair after styling" 
                className="ba-image ba-after"
                style={{
                  ...styles.clippedImage,
                  width: containerRef.current ? containerRef.current.offsetWidth : '800px'
                }}
              />
              <div className="ba-label after">After Aura Styling</div>
            </div>

            {/* Slider Drag Line */}
            <div 
              className="ba-slider-bar" 
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider Drag Handle Knob */}
              <div className="ba-handle">
                <MoveHorizontal size={20} />
              </div>
            </div>
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
  sliderContainer: {
    borderRadius: 'var(--radius-lg)',
    cursor: 'ew-resize',
    position: 'relative',
    overflow: 'hidden',
  },
  clippedImageWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    overflow: 'hidden',
    zIndex: 2,
    pointerEvents: 'none',
  },
  clippedImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    objectFit: 'cover',
  }
};
