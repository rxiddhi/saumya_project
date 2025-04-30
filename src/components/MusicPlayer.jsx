import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set initial volume to 30%
      
      // Try to load the audio file
      const loadAudio = async () => {
        try {
          await audioRef.current.load();
          setError(null);
        } catch (err) {
          console.error('Error loading audio:', err);
          setError('Error loading audio file');
        }
      };
      
      loadAudio();
    }

    // Add error event listener
    const handleError = (e) => {
      console.error('Audio error:', e);
      setError('Error loading audio file. Please check the file path and try again.');
      setIsPlaying(false);
    };

    audioRef.current?.addEventListener('error', handleError);

    return () => {
      audioRef.current?.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
          setError(null);
        }
      } catch (err) {
        console.error('Playback failed:', err);
        setError('Failed to play audio. Please check your browser settings.');
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg flex items-center space-x-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
      {error && (
        <div className="absolute bottom-full mb-2 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      <audio
        ref={audioRef}
        loop
        src={import.meta.env.BASE_URL + 'calming-music.mp3'}
        preload="auto"
        onLoadedData={() => setError(null)}
      />
    </div>
  );
};

export default MusicPlayer; 