import { useState, useEffect } from 'react';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(4);
  const [timer, setTimer] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState('box');

  const techniques = {
    box: {
      name: 'Box Breathing',
      description: 'A technique used by Navy SEALs to reduce stress and improve focus.',
      phases: ['inhale', 'hold', 'exhale', 'rest'],
      duration: 4000,
      benefits: [
        'Reduces stress and anxiety',
        'Improves concentration',
        'Helps manage emotional responses',
        'Can lower blood pressure'
      ]
    },
    relaxing: {
      name: '4-7-8 Breathing',
      description: 'A natural tranquilizer for the nervous system.',
      phases: ['inhale', 'hold', 'exhale'],
      duration: [4000, 7000, 8000],
      benefits: [
        'Helps fall asleep faster',
        'Reduces anxiety and stress',
        'Manages food cravings',
        'Controls emotional responses'
      ]
    },
    energizing: {
      name: 'Energizing Breath',
      description: 'A technique to increase alertness and energy.',
      phases: ['inhale', 'exhale'],
      duration: 2000,
      benefits: [
        'Increases energy and alertness',
        'Improves mental clarity',
        'Enhances physical performance',
        'Boosts immune system'
      ]
    }
  };

  const PHASE_ORDER = techniques[selectedTechnique].phases;

  useEffect(() => {
    if (isActive) {
      const startTime = Date.now();
      let totalCycleDuration = 0;
      
      // Calculate total cycle duration
      if (Array.isArray(techniques[selectedTechnique].duration)) {
        totalCycleDuration = techniques[selectedTechnique].duration.reduce((a, b) => a + b, 0);
      } else {
        totalCycleDuration = techniques[selectedTechnique].duration * PHASE_ORDER.length;
      }

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const cycleTime = elapsedTime % totalCycleDuration;
        
        // Find current phase
        let currentPhaseIndex = 0;
        let timeInCurrentPhase = cycleTime;
        
        if (Array.isArray(techniques[selectedTechnique].duration)) {
          const durations = techniques[selectedTechnique].duration;
          for (let i = 0; i < durations.length; i++) {
            if (timeInCurrentPhase < durations[i]) {
              currentPhaseIndex = i;
              break;
            }
            timeInCurrentPhase -= durations[i];
          }
          const currentPhaseDuration = durations[currentPhaseIndex];
          const remainingTime = currentPhaseDuration - timeInCurrentPhase;
          setCount(Math.ceil(remainingTime / 1000));
        } else {
          const phaseDuration = techniques[selectedTechnique].duration;
          currentPhaseIndex = Math.floor(cycleTime / phaseDuration);
          timeInCurrentPhase = cycleTime % phaseDuration;
          setCount(Math.ceil((phaseDuration - timeInCurrentPhase) / 1000));
        }

        setPhase(PHASE_ORDER[currentPhaseIndex]);
      }, 100);

      setTimer(interval);
    } else {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      setPhase('inhale');
      setCount(Array.isArray(techniques[selectedTechnique].duration) 
        ? Math.ceil(techniques[selectedTechnique].duration[0] / 1000)
        : Math.ceil(techniques[selectedTechnique].duration / 1000));
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive, selectedTechnique]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In Deeply';
      case 'hold':
        return 'Hold Your Breath';
      case 'exhale':
        return 'Breathe Out Slowly';
      case 'rest':
        return 'Pause and Reset';
      default:
        return '';
    }
  };

  const getPhaseStyle = () => {
    switch (phase) {
      case 'inhale':
        return 'bg-purple-200 scale-110';
      case 'hold':
        return 'bg-purple-300 scale-100';
      case 'exhale':
        return 'bg-purple-100 scale-90';
      case 'rest':
        return 'bg-gray-100 scale-100';
      default:
        return 'bg-gray-100 scale-100';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly through your nose, filling your belly first, then your chest';
      case 'hold':
        return 'Keep your breath held, maintaining a relaxed posture';
      case 'exhale':
        return 'Release your breath slowly through your mouth, emptying your lungs completely';
      case 'rest':
        return 'Pause briefly before the next breath cycle';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">Breathing Exercises</h2>

      {/* Technique Selection */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(techniques).map(([key, technique]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedTechnique(key);
              if (isActive) setIsActive(false);
              // Set initial count based on the first phase duration
              setCount(Array.isArray(technique.duration) 
                ? Math.ceil(technique.duration[0] / 1000)
                : Math.ceil(technique.duration / 1000));
            }}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedTechnique === key
                ? 'bg-purple-100 border-2 border-purple-500'
                : 'bg-white border-2 border-transparent hover:border-purple-200'
            }`}
          >
            <h3 className="font-semibold text-purple-700 mb-2">{technique.name}</h3>
            <p className="text-sm text-gray-600">{technique.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* Exercise Circle */}
        <div className="mb-12">
          <div
            className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center transition-all duration-1000 ${getPhaseStyle()}`}
          >
            <span className="text-4xl font-bold text-purple-700">{count}</span>
          </div>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6 text-center">
            {getPhaseText()}
          </h3>
          <p className="text-gray-600 mt-2 text-center">{getPhaseInstruction()}</p>
        </div>

        {/* Controls */}
        <div className="text-center mb-8">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-4 rounded-lg text-white font-semibold text-lg transition-colors ${
              isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isActive ? 'Stop Exercise' : 'Start Exercise'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Instructions */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-purple-700">How to Practice:</h4>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Find a quiet, comfortable position (sitting or lying down)</li>
              <li>Relax your shoulders and keep your back straight</li>
              <li>Place one hand on your belly and one on your chest</li>
              <li>Follow the circle's rhythm for each breath phase</li>
              <li>Keep your breathing smooth and natural</li>
              <li>If you feel lightheaded, return to normal breathing</li>
              <li>Practice for 5-10 minutes or 10 breath cycles</li>
            </ol>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-purple-700">Benefits:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {techniques[selectedTechnique].benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">
                <span className="font-semibold">Pro Tip:</span> Practice this exercise daily, 
                preferably at the same time. Morning and before bed are ideal times to establish 
                a routine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise; 