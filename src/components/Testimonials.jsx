import { useState, useEffect } from 'react';

const testimonials = [
  {
    text: "Saumya helped me find peace during a tough semester. Thank you!",
    author: "Sarah, Student"
  },
  {
    text: "Doing the breathing exercises daily has really helped me feel calmer!",
    author: "Mike, Professional"
  },
  {
    text: "The mood tracking showed me patterns I never noticed before. Life-changing!",
    author: "Priya, Artist"
  },
  {
    text: "The quotes section always gives me the motivation I need to start my day.",
    author: "Alex, Teacher"
  },
  {
    text: "I love how the app reminds me to take mindful breaks throughout my workday.",
    author: "Emma, Developer"
  },
  {
    text: "This app helped me develop a consistent meditation practice. So grateful!",
    author: "Raj, Entrepreneur"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentTestimonial = testimonials[currentIndex];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000); // Change testimonial every 5 seconds

      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true); // Pause auto-advance when manually navigating
    // Resume auto-advance after 10 seconds of no interaction
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true); // Pause auto-advance when manually navigating
    // Resume auto-advance after 10 seconds of no interaction
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">
        Stories from Our Community
      </h2>

      <div className="relative">
        <div
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 transition-all duration-500 transform"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <p className="text-gray-700 text-xl mb-4 text-center">
            "{currentTestimonial.text}"
          </p>
          <p className="text-purple-600 text-center mb-8">
            - {currentTestimonial.author}
          </p>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-purple-100 transition-all"
            aria-label="Previous testimonial"
          >
            <span className="text-purple-600 text-xl">←</span>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-purple-100 transition-all"
            aria-label="Next testimonial"
          >
            <span className="text-purple-600 text-xl">→</span>
          </button>

          {/* Slider Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-purple-600 w-4' : 'bg-purple-200'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 