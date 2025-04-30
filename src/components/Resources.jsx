import React from 'react';

const Resources = () => {
  const blogPosts = [
    {
      title: "Understanding Anxiety",
      image: "/saumya_project/anxiety.png",
      description: "Explore comprehensive guides about anxiety symptoms, triggers, and evidence-based coping strategies. Learn from experts and find practical ways to manage anxiety effectively.",
      links: [
        {
          text: "Complete Guide to Anxiety Disorders",
          url: "https://www.helpguide.org/articles/anxiety/anxiety-disorders-and-anxiety-attacks.htm"
        },
        {
          text: "Recognizing Anxiety Symptoms",
          url: "https://www.verywellmind.com/anxiety-symptoms-4157175"
        },
        {
          text: "Psychology of Anxiety",
          url: "https://www.psychologytoday.com/us/basics/anxiety"
        }
      ]
    },
    {
      title: "Mindfulness Practices",
      image: "/saumya_project/mindfulness.png",
      description: "Discover the power of mindfulness and meditation. Learn scientifically-proven techniques to reduce stress, improve focus, and enhance your overall mental well-being.",
      links: [
        {
          text: "Mindfulness Basics Guide",
          url: "https://www.mindful.org/how-to-practice-mindfulness/"
        },
        {
          text: "Science of Mindfulness",
          url: "https://www.headspace.com/mindfulness"
        },
        {
          text: "Research-Based Benefits",
          url: "https://greatergood.berkeley.edu/topic/mindfulness/definition"
        }
      ]
    },
    {
      title: "Self-Care Tips",
      image: "/saumya_project/self-care.png",
      description: "Learn essential self-care practices and daily habits that promote mental wellness. Discover practical strategies to maintain emotional balance and personal growth.",
      links: [
        {
          text: "12 Self-Care Practices",
          url: "https://www.psychologytoday.com/us/blog/click-here-happiness/201812/self-care-12-ways-take-better-care-yourself"
        },
        {
          text: "Daily Self-Care Checklist",
          url: "https://www.healthline.com/health/self-care-checklist"
        },
        {
          text: "Stress Management Guide",
          url: "https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729"
        }
      ]
    }
  ];

  const quickTips = [
    {
      title: "Daily Meditation",
      description: "Start with just 5 minutes of mindful breathing each morning."
    },
    {
      title: "Gratitude Practice",
      description: "Write down three things you're grateful for before bed."
    },
    {
      title: "Movement Break",
      description: "Take a 5-minute stretch break every 2 hours."
    },
    {
      title: "Digital Detox",
      description: "Set aside 30 minutes of screen-free time before sleep."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-12">
        Wellness Blog
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 flex flex-col h-full">
            <div className="mb-6 h-48 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">{post.title}</h2>
            <p className="text-gray-600 mb-6 flex-grow">
              {post.description}
            </p>
            <div className="space-y-3">
              {post.links.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-purple-600 hover:text-indigo-600 visited:text-pink-600 transition-colors duration-200 hover:underline group"
                >
                  <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span> {link.text}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12 bg-purple-50/80 backdrop-blur-sm rounded-xl p-8" aria-labelledby="quick-tips-title">
        <h2 id="quick-tips-title" className="text-2xl font-semibold text-purple-800 mb-6 text-center">
          Quick Wellness Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickTips.map((tip, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="flex items-center mb-3">
                <h3 className="font-semibold text-purple-700 group-hover:text-purple-800 transition-colors">
                  {tip.title}
                </h3>
              </div>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources; 