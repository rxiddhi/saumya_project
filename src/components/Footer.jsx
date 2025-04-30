import React, { useState, useCallback } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook, FaYoutube, FaGithub } from 'react-icons/fa';

const Footer = ({ setActiveSection }) => {
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  }, []);

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/rxiddhi/saumya_project', label: 'GitHub', comingSoon: false },
    { icon: <FaTwitter />, url: 'https://twitter.com/saumya_wellness', label: 'Twitter', comingSoon: true },
    { icon: <FaInstagram />, url: 'https://instagram.com/saumya_wellness', label: 'Instagram', comingSoon: true },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/company/saumya-wellness', label: 'LinkedIn', comingSoon: true },
    { icon: <FaFacebook />, url: 'https://facebook.com/saumyawellness', label: 'Facebook', comingSoon: true },
    { icon: <FaYoutube />, url: 'https://youtube.com/saumyawellness', label: 'YouTube', comingSoon: true }
  ];

  const emergencyContacts = [
    { name: 'Emergency Services', number: '112' },
    { name: 'AASRA Helpline', number: '+91-9820466726' },
    { name: 'iCall TISS', number: '+91-9152987821' },
    { name: 'Vandrevala Foundation', number: '1860 266 2345' }
  ];

  const features = [
    { id: 'mood', label: 'Mood Tracking' },
    { id: 'breathing', label: 'Breathing Exercises' },
    { id: 'quotes', label: 'Daily Quotes' },
    { id: 'resources', label: 'Get Help' }
  ];

  const resources = [
    { label: 'WHO Mental Health', url: 'https://www.who.int/mental_health' },
    { label: 'NIMH Resources', url: 'https://www.nimh.nih.gov/' },
    { label: 'NAMI Support', url: 'https://www.nami.org/' },
    { label: 'Wellness Blog', action: () => setActiveSection('resources') }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', key: 'privacy', info: 'This page contains important information about your privacy.' },
    { label: 'Terms of Use', key: 'terms', info: 'This page contains the terms and conditions for using this site.' },
    { label: 'Accessibility', key: 'accessibility', info: 'This page explains our accessibility features and policies.' }
  ];

  return (
    <footer className="bg-white/90 backdrop-blur-sm mt-12 border-t border-purple-100 relative" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <section aria-label="About Saumya">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">About Saumya</h2>
            <p className="text-gray-600 mb-4">
              Saumya is your trusted mental wellness companion. We're dedicated to providing a safe space for emotional support, self-discovery, and personal growth.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 transition-colors p-2"
                  aria-label={social.label}
                  onClick={social.comingSoon ? (e) => {
                    e.preventDefault();
                    showToast('Coming soon, stay tuned!');
                  } : undefined}
                >
                  {React.cloneElement(social.icon, { className: 'w-5 h-5' })}
                </a>
              ))}
            </div>
          </section>

          <section aria-label="Features">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Features</h2>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature.id}>
                  <button 
                    onClick={() => setActiveSection(feature.id)}
                    className="text-gray-600 hover:text-purple-600 transition-colors flex items-center"
                  >
                    {feature.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Resources">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Resources</h2>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.label}>
                  {resource.url ? (
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-purple-600 transition-colors flex items-center"
                    >
                      {resource.label}
                    </a>
                  ) : (
                    <button 
                      onClick={resource.action}
                      className="text-gray-600 hover:text-purple-600 transition-colors flex items-center"
                    >
                      {resource.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="24/7 Help">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">24/7 Help</h2>
            <ul className="space-y-3">
              {emergencyContacts.map((contact) => (
                <li key={contact.name}>
                  <a 
                    href={`tel:${contact.number.replace(/[^\d+]/g, '')}`}
                    className="text-gray-600 hover:text-purple-600 transition-colors flex items-center group"
                  >
                    <div>
                      <div className="font-medium group-hover:text-purple-700">{contact.name}</div>
                      <div className="text-sm">{contact.number}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="pt-8 mt-8 border-t border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Saumya. All rights reserved.
            </p>
            <nav className="flex space-x-6" aria-label="Legal">
              {legalLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={(e) => {
                    e.preventDefault();
                    showToast(link.info);
                  }}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {toast.show && (
        <div 
          role="alert"
          aria-live="polite"
          className="fixed left-1/2 bottom-8 transform -translate-x-1/2 bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all animate-fade-in"
        >
          {toast.message}
        </div>
      )}
    </footer>
  );
};

export default Footer;



