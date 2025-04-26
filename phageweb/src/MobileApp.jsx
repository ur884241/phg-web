import React, { useState, useRef, useEffect } from 'react';
import { FileAudio, Folder, ChevronRight, Play, Pause, Volume2, X } from 'lucide-react';

const VideoControls = ({ 
  isPlaying, 
  onPlayPause, 
  duration, 
  currentTime, 
  volume,
  onVolumeChange,
  onSeek
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#030303]/80 p-2 rounded-lg">
      <div className="flex items-center space-x-2">
        <button
          onClick={onPlayPause}
          className="text-[#8C847A] hover:text-[#9E988A] transition-colors p-1"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
        <span className="text-xs text-[#8C847A] min-w-[40px]">{formatTime(currentTime)}</span>
        <div 
          className="flex-1 h-1 bg-[#6A665E] rounded-full cursor-pointer"
          onClick={onSeek}
        >
          <div 
            className="h-full bg-[#9E988A] rounded-full transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[#8C847A] min-w-[40px]">{formatTime(duration)}</span>
        <Volume2 className="w-4 h-4 text-[#8C847A]" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={onVolumeChange}
          className="w-16 h-1 rounded-full appearance-none cursor-pointer bg-[#6A665E]"
        />
      </div>
    </div>
  );
};

function MobileApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const videoRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const projects = [
    {
      id: 'phage',
      title: "P H A G E",
      description: "A journey through consciousness and machine.",
      videoUrl: "/videos/phage.mp4",
      tags: ["2024", "consciousness", "machine"]
    },
    {
      id: 'layers',
      title: "Layers OST",
      description: "An exploration of the layers between reality and perception.",
      videoUrl: "/videos/layer1.mp4",
      tags: ["music", "consciousness", "layers"]
    },
    {
      id: 'will',
      title: "Will",
      description: "Opening track from the album 'Will' (2024)",
      videoUrl: "/videos/will.mp4",
      tags: ["music", "album", "2024"]
    },
    {
      id: 'solstice',
      title: "8",
      description: "Solstice music track",
      videoUrl: "/videos/8.mp4",
      tags: ["music", "solstice", "8"]
    }
  ];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe left
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else {
        // Swipe right
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [currentIndex]);

  return (
    <div className="h-screen w-screen bg-[#030303] text-[#8C847A] overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted={!isPlaying}
          src={projects[currentIndex].videoUrl}
        />
      </div>

      {/* Content Overlay */}
      <div 
        className="relative z-10 h-full w-full flex flex-col justify-between p-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#9E988A]' : 'bg-[#6A665E]'
              }`}
            />
          ))}
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <h1 className="text-2xl text-[#C2B59B] font-light tracking-wider">
            {projects[currentIndex].title}
          </h1>
          <p className="text-sm text-[#8C847A]">
            {projects[currentIndex].description}
          </p>
          <div className="flex flex-wrap gap-2">
            {projects[currentIndex].tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-[#030303]/50 rounded-full text-[#6A665E]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col space-y-4">
          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-[#8C847A]" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-[#6A665E] rounded-full appearance-none"
            />
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-12 h-12 rounded-full bg-[#030303]/50 flex items-center justify-center mx-auto"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-[#9E988A]" />
            ) : (
              <Play className="w-6 h-6 text-[#9E988A]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
