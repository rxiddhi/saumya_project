import { useState } from 'react';

const challenges = [
  {
    text: "Write down three things you love about yourself today",
  },
  {
    text: "Take three 5-minute breaks today to practice deep breathing",
  },
  {
    text: "List five things you're grateful for, no matter how small",
  },
  {
    text: "Spend one hour today completely free from screens",
  },
  {
    text: "Replace self-critical thoughts with encouraging ones today",
  },
  {
    text: "Dance, stretch, or move your body in a way that brings you joy",
  },
  {
    text: "Practice saying 'no' to one thing that doesn't serve your wellbeing",
  }
];

const DailyChallenge = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(
    Math.floor(Math.random() * challenges.length)
  );

  const currentChallenge = challenges[currentChallengeIndex];

  const handleComplete = () => {
    setIsCompleted(true);
    setShowConfirmation(true);
  };

  const handleNextChallenge = () => {
    setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % challenges.length);
    setIsCompleted(false);
    setShowConfirmation(false);
  };

  const handleStay = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">
        Daily Growth Challenge
      </h2>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <p className="text-gray-700 text-xl mb-8 text-center">
          {currentChallenge.text}
        </p>

        <div className="text-center">
          {!showConfirmation ? (
            !isCompleted ? (
              <button
                onClick={handleComplete}
                className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Mark as Complete
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="text-green-600 font-semibold">
                  Challenge Completed! 🎉
                </div>
                <button
                  onClick={() => setShowConfirmation(true)}
                  className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  Ready for Next Challenge?
                </button>
              </div>
            )
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 mt-4 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Great job completing today's challenge! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                Are you ready to move on to the next challenge?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleStay}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Stay Here
                </button>
                <button
                  onClick={handleNextChallenge}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  Next Challenge
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge; 