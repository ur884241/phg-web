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
  const phageIndex = {
    id: 'phage-index',
    title: "P H A G E",
    description: `A journey through consciousness and machine.`,
    videoUrl: "/videos/phage.mp4",
    isYouTube: false,
    tags: ["2024", "consciousness", "machine"],
    details: `[ Project Status: Active ]
--------------------------------
P  H  A  G  E
--------------------------------
An exploration of the layers
between reality and perception.

Original Soundtrack • 2024
System Ver. 1.0`
  };

  const layers = [
    {
      id: 1,
      title: "I Genesis",
      description: "The beginning.",
      videoUrl: "/videos/layer1.mp4",
      isYouTube: false,
      tags: ["origin", "consciousness", "beginning"],
      details: ""
    },
    {
      id: 2,
      title: "II Division",
      description: "The split within.",
      videoUrl: "/videos/layer2.mp4",
      isYouTube: false,
      tags: ["duality", "perception", "reality"],
      details: "Inherent duality."
    },
    {
      id: 3,
      title: "III Man",
      description: "The human element in the system.",
      videoUrl: "/videos/layer3.mp4",
      isYouTube: false,
      tags: ["human", "existence", "consciousness"],
      details: "The 'role' itself."
    },
    {
      id: 4,
      title: "IV Society",
      description: "The collective manifested.",
      videoUrl: "/videos/layer4.mp4",
      isYouTube: false,
      tags: ["collective", "society", "structure"],
      details: "Patterns and structures."
    },
    {
      id: 5,
      title: "V Dellusion",
      description: "The distortion of perceived reality.",
      videoUrl: "/videos/layer5.mp4",
      isYouTube: false,
      tags: ["illusion", "perception", "distortion"],
      details: "Gaps."
    },
    {
      id: 6,
      title: "VI Altered Machine",
      description: "The fusion of consciousness and technology.",
      videoUrl: "/videos/layer6.mp4",
      isYouTube: false,
      tags: ["technology", "fusion", "alteration"],
      details: "Higher."
    },
    {
      id: 7,
      title: "VII Imaginateur",
      description: "The creation of new realities.",
      videoUrl: "/videos/layer7.mp4",
      isYouTube: false,
      tags: ["creation", "imagination", "reality"],
      details: "Shape new worlds."
    },
    {
      id: 8,
      title: "VIII Force",
      description: "The underlying power that drives all layers.",
      videoUrl: "/videos/layer8.mp4",
      isYouTube: false,
      tags: ["power", "force", "drive"],
      details: "Stregth."
    }
  ];

  const songs = [
    {
      id: 'will',
      title: "Will",
      description: "Opening track from the album 'Will' (2024)",
      videoUrl: "/videos/will.mp4",
      isYouTube: false,
      tags: ["will", "album", "2024"],
      details: "Raw intent."
    },
    {
      id: 'solstice',
      title: "8",
      description: "Solstice music track",
      videoUrl: "/videos/8.mp4",
      isYouTube: false,
      tags: ["music", "solstice", "8"],
      details: "Solstice song with visual accompaniment."
    }
  ];

  const ambience = [
    {
      id: 'ambience',
      title: "Defense System",
      description: "Defense System ambient sound design",
      videoUrl: "VDaXOlNcXT0",
      isYouTube: true,
      tags: ["ambient", "defense", "system"],
      details: "Sundscape design for imaginary interface."
    },
    {
      id: 'ambience-hangatyr',
      title: "Hangatýr",
      description: "Hangatýr ambient sound design",
      videoUrl: "o7B1jUE-uq4",
      isYouTube: true,
      tags: ["ambient", "hangatýr", "soundscape"],
      details: "Ambient soundscape design for Hangatýr environment."
    }
  ];

  const [layersExpanded, setLayersExpanded] = useState(false);
  const [songsExpanded, setSongsExpanded] = useState(false);
  const [ambienceExpanded, setAmbienceExpanded] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const videoRef = useRef(null);

  const cleanupActiveVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.src = '';
      videoRef.current.load();
    }
    if (youtubePlayer) {
      youtubePlayer.destroy();
      setYoutubePlayer(null);
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleProjectSelect = (project) => {
    console.log("Selecionando projeto:", project); // Debug
    cleanupActiveVideo();
    setActiveProject(project);
  };

  const handlePlayPause = () => {
    if (!activeProject) return;

    if (activeProject.isYouTube && youtubePlayer) {
      if (isPlaying) {
        youtubePlayer.pauseVideo();
      } else {
        youtubePlayer.playVideo();
      }
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.error('Erro ao reproduzir vídeo:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (activeProject?.isYouTube && youtubePlayer) {
      youtubePlayer.setVolume(newVolume);
    }
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const handleSeek = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    const newTime = percent * duration;

    if (activeProject?.isYouTube && youtubePlayer) {
      youtubePlayer.seekTo(newTime);
    } else if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (!activeProject) {
      cleanupActiveVideo();
      return;
    }

    console.log("Carregando projeto ativo:", activeProject); // Debug

    let videoCleanup;

    if (activeProject.isYouTube) {
      if (typeof YT === 'undefined' || !YT.Player) {
        console.error("API do YouTube não carregada. Inclua <script src='https://www.youtube.com/iframe_api'></script> no seu HTML.");
        return;
      }

      if (!youtubePlayer) {
        const player = new YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: activeProject.videoUrl,
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            loop: 1,
            playlist: activeProject.videoUrl,
          },
          events: {
            onReady: (event) => {
              console.log("YouTube Player pronto:", activeProject.videoUrl); // Debug
              setYoutubePlayer(event.target);
              setDuration(event.target.getDuration());
              event.target.setVolume(volume);
            },
            onStateChange: (event) => {
              setIsPlaying(event.data === YT.PlayerState.PLAYING);
            },
            onError: (event) => console.error("Erro no YouTube Player:", event.data),
          },
        });
      } else {
        youtubePlayer.loadVideoById({ videoId: activeProject.videoUrl, startSeconds: 0 });
      }

      const interval = setInterval(() => {
        if (youtubePlayer?.getCurrentTime) {
          setCurrentTime(youtubePlayer.getCurrentTime());
        }
      }, 1000);

      videoCleanup = () => {
        clearInterval(interval);
        youtubePlayer?.stopVideo();
      };
    } else if (videoRef.current) {
      console.log("Carregando vídeo local:", activeProject.videoUrl); // Debug
      videoRef.current.src = activeProject.videoUrl;
      videoRef.current.load();
      videoRef.current.volume = volume / 100;

      const updateTime = () => {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration || 0);
      };

      videoRef.current.addEventListener('timeupdate', updateTime);
      videoRef.current.addEventListener('loadedmetadata', updateTime);
      videoRef.current.addEventListener('error', (e) => console.error('Erro ao carregar vídeo:', e));

      videoCleanup = () => {
        videoRef.current.removeEventListener('timeupdate', updateTime);
        videoRef.current.removeEventListener('loadedmetadata', updateTime);
        videoRef.current.pause();
      };
    }

    return () => {
      if (videoCleanup) videoCleanup();
    };
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-[#030303] text-[#8C847A] font-mono text-sm flex flex-col">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        {activeProject ? (
          activeProject.isYouTube ? (
            <div id="youtube-player" className="w-full h-full object-cover" />
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={!isPlaying}
            >
              <source src={activeProject.videoUrl} type="video/mp4" />
            </video>
          )
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-30"
            loop
            playsInline
            muted
          >
            <source src="/videos/phage.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 bg-[#030303]/90">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => handleProjectSelect(phageIndex)}
          >
            <FileAudio className="w-4 h-4 text-[#8C847A]" />
            <span className="text-xs text-[#8C847A] hover:text-[#9E988A]">Phage</span>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://open.spotify.com/artist/69586kzZpLeJAyQCdwZcfz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#6A665E] hover:text-[#9E988A]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/8phage/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#6A665E] hover:text-[#9E988A]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.668-.069 4.948-.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://x.com/8Phage" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#6A665E] hover:text-[#9E988A]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4">
        {!activeProject ? (
          <div className="space-y-4">
            {/* Layers Section */}
            <div className="space-y-2">
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => setLayersExpanded(!layersExpanded)}
              >
                <ChevronRight className={`w-4 h-4 ${layersExpanded ? 'rotate-90' : ''} transition-transform`} />
                <Folder className="w-4 h-4" />
                <span className="text-xs">Layers OST</span>
              </div>
              {layersExpanded && (
                <ul className="space-y-2 pl-6">
                  {layers.map(layer => (
                    <li
                      key={layer.id}
                      className="flex items-center space-x-2 cursor-pointer text-[#6A665E] hover:text-[#9E988A]"
                      onClick={() => handleProjectSelect(layer)}
                    >
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-xs">
                        <span className={
                          layer.title.split(' ')[0] === 'I' ? 'text-[#8FB8E0]' :
                          layer.title.split(' ')[0] === 'II' ? 'text-[#E08F8F]' :
                          layer.title.split(' ')[0] === 'III' ? 'text-[#90E08F]' :
                          layer.title.split(' ')[0] === 'IV' ? 'text-[#E0CF8F]' :
                          layer.title.split(' ')[0] === 'V' ? 'text-[#B88FE0]' :
                          layer.title.split(' ')[0] === 'VI' ? 'text-[#8FE0CF]' :
                          layer.title.split(' ')[0] === 'VII' ? 'text-[#E08FCF]' :
                          'text-[#CFE08F]'
                        }>
                          {layer.title.split(' ')[0]}
                        </span>
                        <span className="ml-2">
                          {layer.title.split(' ').slice(1).join(' ')}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Songs Section */}
            <div className="space-y-2">
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => setSongsExpanded(!songsExpanded)}
              >
                <ChevronRight className={`w-4 h-4 ${songsExpanded ? 'rotate-90' : ''} transition-transform`} />
                <Folder className="w-4 h-4" />
                <span className="text-xs">Songs</span>
              </div>
              {songsExpanded && (
                <ul className="space-y-2 pl-6">
                  {songs.map(song => (
                    <li
                      key={song.id}
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleProjectSelect(song)}
                    >
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-xs text-[#6A665E] hover:text-[#9E988A]">
                        {song.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Ambience Section */}
            <div className="space-y-2">
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => setAmbienceExpanded(!ambienceExpanded)}
              >
                <ChevronRight className={`w-4 h-4 ${ambienceExpanded ? 'rotate-90' : ''} transition-transform`} />
                <Folder className="w-4 h-4" />
                <span className="text-xs">Ambience</span>
              </div>
              {ambienceExpanded && (
                <ul className="space-y-2 pl-6">
                  {ambience.map(item => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleProjectSelect(item)}
                    >
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-xs text-[#6A665E] hover:text-[#9E988A]">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeProject.id === 'phage-index' ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                <div className="space-y-12 text-center">
                  <h1 className="text-2xl text-[#C2B59B] font-['Cormorant_Garamond'] font-light tracking-[0.5em] leading-relaxed">
                    φάγος
                  </h1>
                  <div className="space-y-8">
                    <p className="text-base text-[#6A665E] max-w-md mx-auto leading-relaxed">
                      signal-syntax
                    </p>
                    <div className="text-sm text-gray-500 space-y-6 leading-relaxed">
                      <p>Original Sound Design • 2025</p>
                      <p className="text-[10px]">System Ver. 1.0</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm text-[#9E988A]">{activeProject.title}</h2>
                  <X 
                    className="w-4 h-4 cursor-pointer text-[#6A665E] hover:text-[#9E988A]" 
                    onClick={() => setActiveProject(null)} 
                  />
                </div>
                <p className="text-xs text-[#8C847A]">{activeProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map(tag => (
                    <span key={tag} className="text-xs text-[#6A665E]">{tag}</span>
                  ))}
                </div>
                <p className="text-xs text-[#8C847A] whitespace-pre-wrap">{activeProject.details}</p>
              </div>
            )}
            <VideoControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              duration={duration}
              currentTime={currentTime}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              onSeek={handleSeek}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 p-2 bg-[#030303]/90 text-xs text-[#6A665E] text-center">
        -- NORMAL --
      </div>
    </div>
  );
}

export default MobileApp;
