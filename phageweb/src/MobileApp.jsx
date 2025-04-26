import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

const SocialIcons = () => (
  <div className="absolute top-6 right-6 flex gap-4">
    <a href="https://open.spotify.com/artist/69586kzZpLeJAyQCdwZcfz" target="_blank" rel="noopener noreferrer" className="group">
      <svg className="w-6 h-6 text-[#4AEDC4]/60 group-hover:text-[#4AEDC4] transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    </a>
    <a href="https://www.instagram.com/8phage/" target="_blank" rel="noopener noreferrer" className="group">
      <svg className="w-6 h-6 text-[#FF3366]/60 group-hover:text-[#FF3366] transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </a>
    <a href="https://x.com/8Phage" target="_blank" rel="noopener noreferrer" className="group">
      <svg className="w-6 h-6 text-[#66FFFF]/60 group-hover:text-[#66FFFF] transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>
  </div>
);

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
      description: "Original Sound Design • 2025",
      videoUrl: "/videos/phagem.mp4",
      tags: ["2024", "consciousness", "machine"]
    },
    {
      id: 'layer1',
      title: "I Genesis",
      description: "The beginning.",
      videoUrl: "/videos/layer1m.mp4",
      tags: ["origin", "consciousness", "beginning"]
    },
    {
      id: 'layer2',
      title: "II Division",
      description: "The split within.",
      videoUrl: "/videos/layer2m.mp4",
      tags: ["duality", "perception", "reality"]
    },
    {
      id: 'layer3',
      title: "III Man",
      description: "The human element in the system.",
      videoUrl: "/videos/layer3m.mp4",
      tags: ["human", "existence", "consciousness"]
    },
    {
      id: 'layer4',
      title: "IV Society",
      description: "The collective manifested.",
      videoUrl: "/videos/layer4m.mp4",
      tags: ["collective", "society", "structure"]
    },
    {
      id: 'layer5',
      title: "V Dellusion",
      description: "The distortion of perceived reality.",
      videoUrl: "/videos/layer5m.mp4",
      tags: ["illusion", "perception", "distortion"]
    },
    {
      id: 'layer6',
      title: "VI Altered Machine",
      description: "The fusion of consciousness and technology.",
      videoUrl: "/videos/layer6m.mp4",
      tags: ["technology", "fusion", "alteration"]
    },
    {
      id: 'layer7',
      title: "VII Imaginateur",
      description: "The creation of new realities.",
      videoUrl: "/videos/layer7m.mp4",
      tags: ["creation", "imagination", "reality"]
    },
    {
      id: 'layer8',
      title: "VIII Force",
      description: "The underlying power that drives all layers.",
      videoUrl: "/videos/layer8m.mp4",
      tags: ["power", "force", "drive"]
    },
    {
      id: 'will',
      title: "Will",
      description: "Opening track from the album 'Will' (2024)",
      videoUrl: "/videos/willm.mp4",
      tags: ["music", "album", "2024"]
    },
    {
      id: 'solstice',
      title: "8",
      description: "Solstice music track",
      videoUrl: "/videos/8m.mp4",
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
    <div className="relative w-full h-screen bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={!isPlaying}
        src={projects[currentIndex].videoUrl}
        onLoadedData={() => setIsLoading(false)}
      />
      
      <div className="relative z-10 w-full h-full flex flex-col p-6">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-4xl text-[#D1D1D1] font-['JetBrains_Mono'] font-light tracking-tight">
                {projects[currentIndex].title}
              </h1>
              {currentIndex === 0 && (
                <p className="text-xs text-[#D1D1D1]/30 font-['JetBrains_Mono'] font-light tracking-widest">
                  signal-syntax
                </p>
              )}
            </div>
            
            <div className="flex gap-4 pt-1">
              <a href="https://open.spotify.com/artist/69586kzZpLeJAyQCdwZcfz" target="_blank" rel="noopener noreferrer" className="group">
                <svg className="w-6 h-6 text-[#4AEDC4]/60 group-hover:text-[#4AEDC4] transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/8phage/" target="_blank" rel="noopener noreferrer" className="group">
                <svg className="w-6 h-6 text-[#FF3366]/60 group-hover:text-[#FF3366] transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://x.com/8Phage" target="_blank" rel="noopener noreferrer" className="group">
                <svg className="w-6 h-6 text-[#66FFFF]/60 group-hover:text-[#66FFFF] transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <p className="text-base text-[#A8B2D1]/90 font-['JetBrains_Mono'] font-light leading-relaxed whitespace-pre-line mt-6">
            {projects[currentIndex].description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-[#E6E6E6]/20 hover:border-[#E6E6E6]/40 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-[#E6E6E6]" />
            </button>
            
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#E6E6E6]' : 'bg-[#E6E6E6]/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-[#E6E6E6]/20 hover:border-[#E6E6E6]/40 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-[#E6E6E6]" />
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={handlePlayPause}
              className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center mx-auto border border-[#E6E6E6]/20 hover:border-[#E6E6E6]/40 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-[#E6E6E6]" />
              ) : (
                <Play className="w-7 h-7 text-[#E6E6E6]" />
              )}
            </button>

            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-[#E6E6E6]/50" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#E6E6E6]/20 rounded-full appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
