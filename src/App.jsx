import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import BeforeAfter from './components/BeforeAfter';
import Services from './components/Services';
import BookingSimulator from './components/BookingSimulator';
import Stylists from './components/Stylists';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [selectedService, setSelectedService] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync theme with HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up scroll reveal Intersection Observer
  useEffect(() => {
    if (loading) return;

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [loading]);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div style={styles.appContainer}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Luxury sticky header */}
      <Header 
        theme={theme} 
        setTheme={setTheme} 
      />

      {/* Main Single Page Sections */}
      <main>
        <Hero />
        <BeforeAfter />
        <Services onSelectService={setSelectedService} />
        <BookingSimulator 
          selectedService={selectedService} 
          setSelectedService={setSelectedService}
        />
        <Stylists />
        <Reviews />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }
};
