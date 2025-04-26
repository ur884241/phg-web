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

const MobileApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const lastSwipeTime = useRef(0);
  const SWIPE_DELAY = 1000; // 1 second delay between swipes

  const projects = [
    {
      id: 'phage',
      title: "P H A G E",
      description: "signal-syntax\n\nOriginal Sound Design • 2025",
      videoUrl: "/videos/phage.mp4",
      tags: ["2024", "consciousness", "machine"]
    },
    {
      id: 'layer1',
      title: "I Genesis",
      description: "The beginning.",
      videoUrl: "/videos/layer1.mp4",
      tags: ["origin", "consciousness", "beginning"]
    },
    {
      id: 'layer2',
      title: "II Division",
      description: "The split within.",
      videoUrl: "/videos/layer2.mp4",
      tags: ["duality", "perception", "reality"]
    },
    {
      id: 'layer3',
      title: "III Man",
      description: "The human element in the system.",
      videoUrl: "/videos/layer3.mp4",
      tags: ["human", "existence", "consciousness"]
    },
    {
      id: 'layer4',
      title: "IV Society",
      description: "The collective manifested.",
      videoUrl: "/videos/layer4.mp4",
      tags: ["collective", "society", "structure"]
    },
    {
      id: 'layer5',
      title: "V Dellusion",
      description: "The distortion of perceived reality.",
      videoUrl: "/videos/layer5.mp4",
      tags: ["illusion", "perception", "distortion"]
    },
    {
      id: 'layer6',
      title: "VI Altered Machine",
      description: "The fusion of consciousness and technology.",
      videoUrl: "/videos/layer6.mp4",
      tags: ["technology", "fusion", "alteration"]
    },
    {
      id: 'layer7',
      title: "VII Imaginateur",
      description: "The creation of new realities.",
      videoUrl: "/videos/layer7.mp4",
      tags: ["creation", "imagination", "reality"]
    },
    {
      id: 'layer8',
      title: "VIII Force",
      description: "The underlying power that drives all layers.",
      videoUrl: "/videos/layer8.mp4",
      tags: ["power", "force", "drive"]
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
    const now = Date.now();
    if (now - lastSwipeTime.current < SWIPE_DELAY) return;

    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe left
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else {
        // Swipe right
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
      lastSwipeTime.current = now;
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
      videoRef.current.play().catch(e => console.error('Video play error:', e));
    }
  }, [currentIndex, volume]);

  useEffect(() => {
    // Preload next and previous videos
    const preloadVideo = (index) => {
      const video = document.createElement('video');
      video.src = projects[index].videoUrl;
      video.preload = 'auto';
    };

    const nextIndex = (currentIndex + 1) % projects.length;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    
    preloadVideo(nextIndex);
    preloadVideo(prevIndex);
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
          autoPlay
          src={projects[currentIndex].videoUrl}
          onLoadedData={() => setIsLoading(false)}
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
          <p className="text-sm text-[#8C847A] whitespace-pre-line">
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
};

export default MobileApp;
