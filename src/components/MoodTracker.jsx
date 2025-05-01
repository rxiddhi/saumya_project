import { useState, useMemo } from 'react';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);

  const tags = [
    { id: 'work', label: 'Work' },
    { id: 'family', label: 'Family' },
    { id: 'health', label: 'Health' },
    { id: 'social', label: 'Social' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'sleep', label: 'Sleep' },
    { id: 'exercise', label: 'Exercise' },
    { id: 'meditation', label: 'Meditation' }
  ];

  const moodEmojis = {
    '😊': 'Happy',
    '🥰': 'Loved',
    '🤗': 'Grateful',
    '😐': 'Neutral',
    '😔': 'Sad',
    '😡': 'Angry',
    '😰': 'Anxious'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood) {
      const newEntry = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        mood,
        moodLabel: moodEmojis[mood],
        notes,
        tags: [...selectedTags]
      };
      setMoodHistory([...moodHistory, newEntry]);
      setMood('');
      setNotes('');
      setSelectedTags([]);
    }
  };

  const toggleTag = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Calculate statistics
  const stats = useMemo(() => {
    if (moodHistory.length === 0) return null;

    const moodCounts = {};
    const tagFrequency = {};
    let mostFrequentMood = { mood: '', count: 0 };
    let mostFrequentTag = { tag: '', count: 0 };

    moodHistory.forEach(entry => {
      // Count moods
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      if (moodCounts[entry.mood] > mostFrequentMood.count) {
        mostFrequentMood = { mood: entry.mood, count: moodCounts[entry.mood] };
      }

      // Count tags
      entry.tags.forEach(tag => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
        if (tagFrequency[tag] > mostFrequentTag.count) {
          mostFrequentTag = { tag, count: tagFrequency[tag] };
        }
      });
    });

    return {
      totalEntries: moodHistory.length,
      mostFrequentMood,
      mostFrequentTag,
      moodPercentages: Object.entries(moodCounts).map(([mood, count]) => ({
        mood,
        percentage: Math.round((count / moodHistory.length) * 100)
      }))
    };
  }, [moodHistory]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title Card */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-700">Mood Tracking</h2>
        <p className="text-gray-600 mt-2">Track your daily mood and stay in tune with your feelings.</p>
      </div>

      {/* Statistics Section */}
      {stats && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">Your Wellness Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600">Reflections Captured: <span className="font-semibold">{stats.totalEntries}</span></p>
              <p className="text-gray-600">Predominant Emotion: <span className="font-semibold text-lg">{stats.mostFrequentMood.mood}</span></p>
              {stats.mostFrequentTag.tag && (
                <p className="text-gray-600">
                  Primary Focus: <span className="font-semibold">{tags.find(t => t.id === stats.mostFrequentTag.tag)?.label}</span>
                </p>
              )}
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Emotional Patterns</p>
              {stats.moodPercentages.map(({ mood, percentage }) => (
                <div key={mood} className="flex items-center mb-2">
                  <span className="mr-2">{mood}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-purple-500 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mood Tracking Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 hover:shadow-xl transition">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3">
            How are you feeling today?
          </label>
          <div className="flex justify-between items-center gap-2">
            {Object.entries(moodEmojis).map(([emoji, label]) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setMood(emoji)}
                className={`text-center p-3 rounded-lg border-2 w-[calc(14.28%-8px)] ${
                  mood === emoji ? 'border-purple-500 bg-purple-100' : 'border-transparent hover:bg-gray-100'
                } transition duration-200`}
              >
                <div className="text-3xl mb-1">{emoji}</div>
                <div className="text-xs text-gray-600 font-medium">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tags Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3">
            What's the context? (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedTags.includes(tag.id)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition duration-200`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            placeholder="Write about your day or any thoughts..."
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            Save Entry
          </button>
        </div>
      </form>

      {/* Mood History */}
      {moodHistory.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold text-purple-700 mb-6 text-center">Mood History</h3>
          <div className="space-y-6">
            {moodHistory.map((entry, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">{entry.date}</span>
                    <span className="text-gray-400 text-sm ml-2">({entry.time})</span>
                  </div>
                  <span className="text-2xl">{entry.mood}</span>
                </div>
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.tags.map(tagId => (
                      <span 
                        key={tagId}
                        className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                      >
                        {tags.find(t => t.id === tagId)?.label}
                      </span>
                    ))}
                  </div>
                )}
                {entry.notes && (
                  <p className="text-gray-700 mt-2">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
