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
    description: "A journey through consciousness and machine.",
    videoUrl: "/videos/phage.mp4", // Certifique-se de que este caminho está correto no seu ambiente
    isYouTube: false,
    tags: ["2024", "consciousness", "machine"],
    details: `[ Project Status: Active ]\nP H A G E\nAn exploration of the layers between reality and perception.\nOriginal Soundtrack • 2024\nSystem Ver. 1.0`
  };

  const layers = [
    { id: 1, title: "I Genesis", description: "The beginning.", videoUrl: "/videos/layer1.mp4", isYouTube: false, tags: ["origin"], details: "" },
    // Adicione os outros layers aqui conforme o código original
  ];
  const songs = [
    { id: 'will', title: "Will", description: "Opening track.", videoUrl: "/videos/will.mp4", isYouTube: false, tags: ["will"], details: "Raw intent." },
    { id: 'solstice', title: "8", description: "Solstice track.", videoUrl: "/videos/8.mp4", isYouTube: false, tags: ["solstice"], details: "Solstice song." }
  ];
  const ambience = [
    { id: 'ambience', title: "Defense System", description: "Ambient sound design.", videoUrl: "VDaXOlNcXT0", isYouTube: true, tags: ["ambient"], details: "Soundscape design." }
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
      <div className="relative z-10 p-4 bg-[#030303]/90 flex items-center justify-between">
        <div className="flex items-center space-x-2" onClick={() => handleProjectSelect(phageIndex)}>
          <FileAudio className="w-4 h-4 text-[#8C847A]" />
          <span className="text-xs text-[#8C847A] hover:text-[#9E988A]">Phage</span>
        </div>
        <div className="flex space-x-4">
          <a href="https://open.spotify.com/artist/69586kzZpLeJAyQCdwZcfz" target="_blank" className="text-[#6A665E] hover:text-[#9E988A]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          </a>
          {/* Adicione outros ícones de redes sociais aqui */}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4">
        {!activeProject ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => {
                  console.log("Toggling Layers:", !layersExpanded); // Debug
                  setLayersExpanded(!layersExpanded);
                }}
              >
                <ChevronRight className={`w-4 h-4 ${layersExpanded ? 'rotate-90' : ''}`} />
                <Folder className="w-4 h-4" />
                <span className="text-xs">Layers OST</span>
              </div>
              {layersExpanded && (
                <ul className="space-y-2 pl-6">
                  {layers.map(layer => (
                    <li
                      key={layer.id}
                      className="text-xs text-[#6A665E] hover:text-[#9E988A] cursor-pointer"
                      onClick={() => handleProjectSelect(layer)}
                    >
                      {layer.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="space-y-2">
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => {
                  console.log("Toggling Songs:", !songsExpanded); // Debug
                  setSongsExpanded(!songsExpanded);
                }}
              >
                <ChevronRight className={`w-4 h-4 ${songsExpanded ? 'rotate-90' : ''}`} />
                <Folder className="w-4 h-4" />
                <span className="text-xs">Songs</span>
              </div>
              {songsExpanded && (
                <ul className="space-y-2 pl-6">
                  {songs.map(song => (
                    <li
                      key={song.id}
                      className="text-xs text-[#6A665E] hover:text-[#9E988A] cursor-pointer"
                      onClick={() => handleProjectSelect(song)}
                    >
                      {song.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="space-y-2">
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => {
                  console.log("Toggling Ambience:", !ambienceExpanded); // Debug
                  setAmbienceExpanded(!ambienceExpanded);
                }}
              >
                <ChevronRight className={`w-4 h-4 ${ambienceExpanded ? 'rotate-90' : ''}`} />
                <Folder className="w-4 h-4" />
                <span className="text-xs">Ambience</span>
              </div>
              {ambienceExpanded && (
                <ul className="space-y-2 pl-6">
                  {ambience.map(item => (
                    <li
                      key={item.id}
                      className="text-xs text-[#6A665E] hover:text-[#9E988A] cursor-pointer"
                      onClick={() => handleProjectSelect(item)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm text-[#9E988A]">{activeProject.title}</h2>
              <X className="w-4 h-4 cursor-pointer text-[#6A665E] hover:text-[#9E988A]" onClick={() => setActiveProject(null)} />
            </div>
            <p className="text-xs text-[#8C847A]">{activeProject.description}</p>
            <VideoControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              duration={duration}
              currentTime={currentTime}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              onSeek={handleSeek}
            />
            <div className="flex flex-wrap gap-2">
              {activeProject.tags.map(tag => (
                <span key={tag} className="text-xs text-[#6A665E]">{tag}</span>
              ))}
            </div>
            <p className="text-xs text-[#8C847A] whitespace-pre-wrap">{activeProject.details}</p>
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
