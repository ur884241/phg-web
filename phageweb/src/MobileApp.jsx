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
    details: `[ Project Status: Active ]\nP H A G E\nAn exploration of the layers between reality and perception.\nOriginal Soundtrack • 2024\nSystem Ver. 1.0`
  };

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
    cleanupActiveVideo();
    setActiveProject(project);
    setLayersExpanded(false);
    setSongsExpanded(false);
    setAmbienceExpanded(false);
  };

  const handlePlayPause = () => {
    if (!activeProject) return;

    if (activeProject.isYouTube && youtubePlayer) {
      if (isPlaying) {
        youtubePlayer.pauseVideo();
      } else {
        youtubePlayer.playVideo();
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.error('Video play error:', e));
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

  const layers = [/* Mesmo array de layers do código original */];
  const ambience = {/* Mesmo objeto ambience do código original */};
  const ambienceHangatyr = {/* Mesmo objeto ambienceHangatyr do código original */};
  const solstice = {/* Mesmo objeto solstice do código original */};
  const will = {/* Mesmo objeto will do código original */};

  useEffect(() => {
    if (!activeProject) {
      cleanupActiveVideo();
      return;
    }

    let videoCleanup;

    if (activeProject.isYouTube) {
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
              setYoutubePlayer(event.target);
              setDuration(event.target.getDuration());
              event.target.setVolume(volume);
            },
            onStateChange: (event) => {
              setIsPlaying(event.data === YT.PlayerState.PLAYING);
            },
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
      videoRef.current.src = activeProject.videoUrl;
      videoRef.current.load();
      videoRef.current.volume = volume / 100;

      const updateTime = () => {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
      };

      videoRef.current.addEventListener('timeupdate', updateTime);
      videoRef.current.addEventListener('loadedmetadata', updateTime);

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
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">{/* SVG Spotify */}</svg>
          </a>
          <a href="https://www.instagram.com/8phage/" target="_blank" className="text-[#6A665E] hover:text-[#9E988A]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">{/* SVG Instagram */}</svg>
          </a>
          <a href="https://x.com/8Phage" target="_blank" className="text-[#6A665E] hover:text-[#9E988A]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">{/* SVG Twitter */}</svg>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4">
        {!activeProject ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2" onClick={() => setLayersExpanded(!layersExpanded)}>
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
              <div className="flex items-center space-x-2" onClick={() => setSongsExpanded(!songsExpanded)}>
                <ChevronRight className={`w-4 h-4 ${songsExpanded ? 'rotate-90' : ''}`} />
                <Folder className="w-4 h-4" />
                <span className="text-xs">Songs</span>
              </div>
              {songsExpanded && (
                <ul className="space-y-2 pl-6">
                  <li className="text-xs text-[#6A665E] hover:text-[#9E988A] cursor-pointer" onClick={() => handleProjectSelect(will)}>{will.title}</li>
                  <li className="text-xs text-[#6A665E] hover:text-[#9E988A] cursor-pointer" onClick={() => handleProjectSelect(solstice)}>{solstice.title}</li>
                </ul>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2" onClick={() => setAmbienceExpanded(!ambienceExpanded)}>
                <ChevronRight className={`w-4 h-4 ${ambienceExpanded ? 'rotate-90' : ''}`} />
                <Folder className="w-4 h-4" />
                <span className="text-xs">Ambience</span>
              </div>
              {ambienceExpanded && (
                <ul className="space-y-2 pl-6">
                  <li className="text-xs text-[#6A665E] hover:text-[#9E988A] cursor-pointer" onClick={() => handleProjectSelect(ambience)}>Defense System</li>
                  <li className="text-xs text-[#6A665E] hover:text-[#9E988A] cursor-pointer" onClick={() => handleProjectSelect(ambienceHangatyr)}>Hangatýr</li>
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
