import React, { useState, useEffect, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer';
import MoodTracker from './components/MoodTracker'
import BreathingExercise from './components/BreathingExercise'
import Quotes from './components/Quotes'
import BackgroundEffects from './components/BackgroundEffects'
import Testimonials from './components/Testimonials';
import MusicPlayer from './components/MusicPlayer';
import Resources from './components/Resources';
import DailyChallenge from './components/DailyChallenge'
import AuthModal from './components/AuthModal'
import { images } from './utils/images'
import { FaUser } from 'react-icons/fa'

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentSection, setCurrentSection] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const sections = ['hero', 'features', 'daily-challenge', 'testimonials'];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById(sections[currentSection + 1]);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(prev => prev + 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning, Friend! ☀️";
    if (hour >= 12 && hour < 17) return "Good Afternoon, Friend! 🌤️";
    if (hour >= 17 && hour < 21) return "Good Evening, Friend! 🌙";
    return "Hello, Night Owl! 🦉";
  };

  const features = [
    {
      title: "Mood Tracking",
      description: "Track and understand your emotional patterns",
      icon: images.moodTracker,
      benefits: ["Daily mood insights", "Pattern recognition", "Progress tracking"],
      action: () => setActiveSection('mood')
    },
    {
      title: "Breathing Exercises",
      description: "Scientifically proven techniques for calm and focus",
      icon: images.beachMeditation,
      benefits: ["Stress reduction", "Better focus", "Improved sleep"],
      action: () => setActiveSection('breathing')
    },
    {
      title: "Daily Inspiration",
      description: "Curated quotes to uplift your spirit",
      icon: images.quotes,
      benefits: ["Daily motivation", "Positive mindset", "Emotional support"],
      action: () => setActiveSection('quotes')
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-16 pb-16">
            <section id="hero" className="relative h-screen flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-white/30 backdrop-blur-sm"></div>
              <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-800 mb-6 leading-tight hover:glow-effect transition-all duration-500 p-4 hover:scale-105 transform cursor-default">
                  Your Journey to Mental Wellness Starts Here
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-purple-600 font-semibold mb-8 hover:text-purple-700 transition-all duration-300 transform hover:scale-105 cursor-default hover:text-shadow-lg">
                  {getGreeting()}
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-2xl mx-auto hover:text-purple-800 transition-all duration-300 transform hover:-translate-y-1 cursor-default">
                  Not every day feels okay — and that's okay. Saumya is here to hold space for your healing.
                </p>
                <button
                  onClick={scrollToNextSection}
                  className="group flex flex-col items-center gap-3 transform transition-all duration-500 hover:scale-110"
                  aria-label="Scroll to next section"
                >
                  <span className="text-lg text-purple-600 font-medium tracking-wide group-hover:text-purple-800">
                    Click to Begin Your Journey
                  </span>
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shadow-lg group-hover:bg-purple-700 group-hover:shadow-xl transition-all duration-300">
                    <svg 
                      className="w-6 h-6 text-white transform transition-transform duration-500 group-hover:translate-y-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2.5} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="floating-particles"></div>
              </div>
            </section>

            <section id="features" className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-purple-800 text-center mb-12">
                Tools for Your Mental Wellness Journey
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col">
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={feature.icon} 
                        alt={feature.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 mb-6">{feature.description}</p>
                      <ul className="space-y-2 mb-6 flex-grow" role="list">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <span className="text-purple-500 mr-2" aria-hidden="true">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={feature.action}
                        className="w-full px-6 py-3 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors mt-auto"
                      >
                        Try Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="daily-challenge" className="max-w-6xl mx-auto px-4">
              <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl p-8 md:p-12">
                <Suspense fallback={<div>Loading daily challenge...</div>}>
                  <DailyChallenge />
                </Suspense>
              </div>
            </section>

            <section id="testimonials" className="max-w-6xl mx-auto px-4">
              <div className="bg-gradient-to-l from-purple-100 to-purple-50 rounded-2xl p-8 md:p-12">
                <Suspense fallback={<div>Loading testimonials...</div>}>
                  <Testimonials />
                </Suspense>
              </div>
            </section>
          </div>
        );
      case 'mood':
        return <Suspense fallback={<div>Loading mood tracker...</div>}><MoodTracker /></Suspense>;
      case 'breathing':
        return <Suspense fallback={<div>Loading breathing exercise...</div>}><BreathingExercise /></Suspense>;
      case 'quotes':
        return <Suspense fallback={<div>Loading quotes...</div>}><Quotes /></Suspense>;
      case 'resources':
        return <Suspense fallback={<div>Loading resources...</div>}><Resources /></Suspense>;
      default:
        return null;
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    scrollToTop();
  };

  return (
    <div className="min-h-screen relative">
      <div className="background-container fixed inset-0 z-0 pointer-events-none"></div>
      <BackgroundEffects />
      <div className="relative z-10">
        <nav className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-20" role="navigation">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <button 
                onClick={() => handleSectionChange('home')}
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                aria-label="Go to home"
              >
                <img 
                  src={images.careIcon}
                  alt=""
                  className="w-8 h-8 mr-2"
                  aria-hidden="true"
                />
                <span className="text-2xl font-bold text-purple-600">Saumya</span>
              </button>

              <div className="flex items-center space-x-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'mood', label: 'Mood Tracker' },
                  { id: 'breathing', label: 'Breathing Exercises' },
                  { id: 'quotes', label: 'Quotes' },
                  { id: 'resources', label: 'Resources' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`nav-link px-3 py-2 rounded-md text-sm font-medium ${
                      activeSection === item.id ? 'bg-purple-100 text-purple-700' : 'hover:bg-purple-100'
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="ml-4 p-2 rounded-full hover:bg-purple-100 transition-colors"
                  aria-label="Account"
                >
                  <FaUser className="w-5 h-5 text-purple-600" />
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main role="main">
          {renderContent()}
        </main>
        <Footer setActiveSection={handleSectionChange} />
        <MusicPlayer />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default App;
