import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

const MobileApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [videosLoaded, setVideosLoaded] = useState({});
  const videoRef = useRef(null);
  const videoElements = useRef({});

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

  // Preload all videos
  useEffect(() => {
    const loadVideo = (index) => {
      if (videosLoaded[index]) return;

      const video = document.createElement('video');
      video.src = projects[index].videoUrl;
      video.preload = 'auto';
      video.load();
      
      videoElements.current[index] = video;
      
      video.onloadeddata = () => {
        setVideosLoaded(prev => ({ ...prev, [index]: true }));
      };
    };

    projects.forEach((_, index) => loadVideo(index));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
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
    if (videoRef.current && videosLoaded[currentIndex]) {
      videoRef.current.volume = volume / 100;
      if (isPlaying) {
        videoRef.current.play().catch(e => console.error('Video play error:', e));
      }
    }
  }, [currentIndex, volume, isPlaying, videosLoaded]);

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
          onLoadedData={() => setIsLoading(false)}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between p-6">
        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevious}
            className="w-12 h-12 rounded-full bg-[#030303]/50 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#9E988A]" />
          </button>
          <div className="flex space-x-2">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#9E988A]' : 'bg-[#6A665E]'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[#030303]/50 flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-[#9E988A]" />
          </button>
        </div>

        {/* Project Info */}
        <div className="space-y-6">
          <h1 className="text-3xl text-[#C2B59B] font-['Cormorant_Garamond'] font-light tracking-wider">
            {projects[currentIndex].title}
          </h1>
          <p className="text-base text-[#E0CF8F] font-light leading-relaxed whitespace-pre-line">
            {projects[currentIndex].description}
          </p>
          <div className="flex flex-wrap gap-2">
            {projects[currentIndex].tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-[#030303]/50 rounded-full text-[#8FB8E0] border border-[#8FB8E0]/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col space-y-6">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-14 h-14 rounded-full bg-[#030303]/50 flex items-center justify-center mx-auto border border-[#9E988A]/20"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-[#9E988A]" />
            ) : (
              <Play className="w-7 h-7 text-[#9E988A]" />
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-[#8C847A]" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-[#6A665E] rounded-full appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
