import React, { useState, useEffect } from 'react';

export default function Quotes() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch a quote from the new API
  const fetchQuote = () => {
    setLoading(true);
    fetch("https://quotes-api-self.vercel.app/quote")
      .then(response => response.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching quote:", error);
        setLoading(false);
      });
  };

  // Fetch on mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="p-24 min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-br from-blue-100 to-purple-200 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-purple-800 tracking-wide">Whispers of Wisdom</h2>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">Loading quotes...</p>
          </div>
        ) : (
          <div className="w-full max-w-2xl px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <p className="text-xl md:text-2xl italic text-purple-700 leading-relaxed">
                "{quote?.quote}"
              </p>
              <p className="mt-6 text-gray-600 font-medium">
                — {quote?.author || "Unknown"}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={fetchQuote}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold"
              >
                New Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
