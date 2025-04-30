import { useState } from 'react';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood) {
      const newEntry = {
        date: new Date().toLocaleDateString(),
        mood,
        notes,
      };
      setMoodHistory([...moodHistory, newEntry]);
      setMood('');
      setNotes('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title Card */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-700">Mood Tracking</h2>
        <p className="text-gray-600 mt-2">Track your daily mood and stay in tune with your feelings.</p>
      </div>

      {/* Mood Tracking Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 hover:shadow-xl transition">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3">
            How are you feeling today?
          </label>
          <div className="flex flex-wrap gap-4 justify-center">
            {['😊', '😐', '😔', '😡', '😴'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setMood(emoji)}
                className={`text-3xl p-3 rounded-full border-2 ${
                  mood === emoji ? 'border-purple-500 bg-purple-100' : 'border-transparent hover:bg-gray-100'
                } transition duration-200`}
              >
                {emoji}
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
                  <span className="text-gray-500 text-sm">{entry.date}</span>
                  <span className="text-2xl">{entry.mood}</span>
                </div>
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
