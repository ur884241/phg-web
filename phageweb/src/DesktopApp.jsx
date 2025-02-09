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
    <div className="bg-editor-surface/30 p-4 rounded-lg backdrop-blur-[1px]">
      <div className="flex items-center space-x-4">
        <button
          onClick={onPlayPause}
          className="text-gray-300 hover:text-gray-100 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3" />
          )}
        </button>
        <div className="flex items-center space-x-2 flex-1">
          <span className="text-xs text-gray-300 min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <div 
            className="flex-1 h-0.5 bg-editor-line rounded-full cursor-pointer"
            onClick={onSeek}
          >
            <div 
              className="h-full bg-gray-400 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-300 min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Volume2 className="w-3 h-3 text-gray-300" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onVolumeChange}
            className="w-24 h-0.5 rounded-full appearance-none cursor-pointer bg-editor-line"
          />
        </div>
      </div>
    </div>
  );
};

function DesktopApp() {
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

  const [activeProject, setActiveProject] = useState(phageIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const videoRef = useRef(null);

  const cleanupActiveVideo = () => {
    // Clean up local video player
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.src = '';
      videoRef.current.load();
    }

    // Clean up YouTube player
    if (youtubePlayer) {
      try {
        youtubePlayer.destroy(); // Destroy the YouTube player
      } catch (e) {
        console.error('YouTube player cleanup error:', e);
      }
      setYoutubePlayer(null); // Reset YouTube player state
    }

    // Reset player state
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleProjectSelect = (project) => {
    cleanupActiveVideo();
    setActiveProject(project);
  };

 const handlePlayPause = () => {
  if (!activeProject) return;

  if (activeProject.isYouTube && youtubePlayer) {
    try {
      if (isPlaying) {
        youtubePlayer.pauseVideo();
      } else {
        youtubePlayer.playVideo();
      }
    } catch (e) {
      console.error('YouTube player error:', e);
      cleanupActiveVideo();
    }
  } else if (videoRef.current) {
    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => {
          console.error('Video play error:', e);
          cleanupActiveVideo();
        });
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      console.error('Video control error:', e);
      cleanupActiveVideo();
    }
  }
};
const handleVolumeChange = (e) => {
  const newVolume = parseInt(e.target.value);
  setVolume(newVolume);

  // Update YouTube player volume
  if (activeProject?.isYouTube && youtubePlayer) {
    youtubePlayer.setVolume(newVolume);
  }

  // Update local video player volume without resetting the video
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

  const ambience = {
    id: 'ambience',
    title: "Ambience: Defense System",
    description: "Defense System ambient sound design",
    videoUrl: "VDaXOlNcXT0",
    isYouTube: true,
    tags: ["ambient", "defense", "system"],
    details: "Sundscape design for imaginary interface."
  };

  const ambienceHangatyr = {
    id: 'ambience-hangatyr',
    title: "Ambience: Hangatýr",
    description: "Hangatýr ambient sound design",
    videoUrl: "o7B1jUE-uq4",
    isYouTube: true,
    tags: ["ambient", "hangatýr", "soundscape"],
    details: "Ambient soundscape design for Hangatýr environment."
  };

  const solstice = {
    id: 'solstice',
    title: "8",
    description: "Solstice music track",
    videoUrl: "/videos/8.mp4",
    isYouTube: false,
    tags: ["music", "solstice", "8"],
    details: "Solstice song with visual accompaniment."
  };

  const will = {
    id: 'will',
    title: "Will",
    description: "Opening track from the album 'Will' (2024)",
    videoUrl: "/videos/will.mp4",
    isYouTube: false,
    tags: ["will", "album", "2024"],
    details: "Raw intent."
  };

const layers = [
    {
      id: 1,
      title: "Genesis",
      description: "The beginning.",
      videoUrl: "/videos/layer1.mp4",
      isYouTube: false,
      tags: ["origin", "consciousness", "beginning"],
      details: ""
    },
    {
      id: 2,
      title: "Division",
      description: "The split within.",
      videoUrl: "/videos/layer2.mp4",
      isYouTube: false,
      tags: ["duality", "perception", "reality"],
      details: "Inherent duality."
    },
    {
      id: 3,
      title: "Man",
      description: "The human element in the system.",
      videoUrl: "/videos/layer3.mp4",
      isYouTube: false,
      tags: ["human", "existence", "consciousness"],
      details: "The 'role' itself."
    },
    {
      id: 4,
      title: "Society",
      description: "The collective manifested.",
      videoUrl: "/videos/layer4.mp4",
      isYouTube: false,
      tags: ["collective", "society", "structure"],
      details: "Patterns and structures."
    },
    {
      id: 5,
      title: "Delusion",
      description: "The distortion of perceived reality.",
      videoUrl: "/videos/layer5.mp4",
      isYouTube: false,
      tags: ["illusion", "perception", "distortion"],
      details: "Gaps."
    },
    {
      id: 6,
      title: "Altered Machine",
      description: "The fusion of consciousness and technology.",
      videoUrl: "/videos/layer6.mp4",
      isYouTube: false,
      tags: ["technology", "fusion", "alteration"],
      details: "Higher."
    },
    {
      id: 7,
      title: "Imaginator",
      description: "The creation of new realities.",
      videoUrl: "/videos/layer7.mp4",
      isYouTube: false,
      tags: ["creation", "imagination", "reality"],
      details: "Shape new worlds."
    },
    {
      id: 8,
      title: "Force",
      description: "The underlying power that drives all layers.",
      videoUrl: "/videos/layer8.mp4",
      isYouTube: false,
      tags: ["power", "force", "drive"],
      details: "Stregth."
    }
  ]





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
          autoplay: 0, // Disable autoplay
          controls: 1, // Show controls (including full screen button)
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
          playlist: activeProject.videoUrl,
          enablejsapi: 1,
          fs: 1, // Allow full screen mode
        },
        events: {
          onReady: (event) => {
            setYoutubePlayer(event.target);
            setDuration(event.target.getDuration());
            event.target.setVolume(volume);

            // Force the YouTube player to fill the available space
            const playerElement = document.getElementById('youtube-player');
            if (playerElement) {
              playerElement.style.width = 'calc(100vw - 12rem)'; // Adjust for sidebar width
              playerElement.style.height = '100%';
              playerElement.style.position = 'fixed';
              playerElement.style.top = '0';
              playerElement.style.left = '12rem'; // Adjust for sidebar width
              playerElement.style.objectFit = 'cover'; // Force the video to cover the entire space
              playerElement.style.overflow = 'hidden'; // Hide any overflow
            }
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === YT.PlayerState.PLAYING);

            // Ensure the player maintains full coverage during playback
            const playerElement = document.getElementById('youtube-player');
            if (playerElement) {
              playerElement.style.width = 'calc(100vw - 12rem)'; // Adjust for sidebar width
              playerElement.style.height = '100%';
            }
          },
        },
      });
    } else {
      try {
        youtubePlayer.loadVideoById({
          videoId: activeProject.videoUrl,
          startSeconds: 0,
        });
      } catch (e) {
        console.error('YouTube player load error:', e);
      }
    }

    const interval = setInterval(() => {
      if (youtubePlayer?.getCurrentTime) {
        setCurrentTime(youtubePlayer.getCurrentTime());
      }
    }, 1000);

    videoCleanup = () => {
      clearInterval(interval);
      if (youtubePlayer?.stopVideo) {
        try {
          youtubePlayer.stopVideo();
        } catch (e) {
          console.error('YouTube cleanup error:', e);
        }
      }
    };
  } else if (videoRef.current) {
    videoRef.current.src = activeProject.videoUrl;
    videoRef.current.load();
    videoRef.current.volume = volume / 100;

    const updateTime = () => {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    };

    const handleError = (e) => {
      console.error('Video loading error:', e);
      cleanupActiveVideo();
    };

    videoRef.current.addEventListener('timeupdate', updateTime);
    videoRef.current.addEventListener('loadedmetadata', updateTime);
    videoRef.current.addEventListener('error', handleError);

    videoCleanup = () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', updateTime);
        videoRef.current.removeEventListener('loadedmetadata', updateTime);
        videoRef.current.removeEventListener('error', handleError);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }

  return () => {
    if (videoCleanup) {
      videoCleanup();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };
}, [activeProject]);








	return (
    <div className="min-h-screen bg-[#030303] text-gray-300 font-mono text-sm overflow-hidden"> {/* Add overflow-hidden here */}
     
{/* Background Video */}
<div className="fixed inset-0 z-0">
  {activeProject ? (
    <div className="relative w-full h-full">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] to-transparent opacity-80 z-10 pointer-events-none" />

      {/* Video Player */}
      {activeProject.isYouTube ? (
        <div
          id="youtube-player"
          className="fixed top-0 left-48 h-screen w-[calc(100vw-12rem)]" // Adjust for sidebar width
          style={{ overflow: 'hidden' }} // Hide any overflow
        />
      ) : (
        <video
          ref={videoRef}
          className="fixed top-0 left-48 h-screen w-[calc(100vw-12rem)] object-cover" // Adjust for sidebar width
          loop
          playsInline
          muted={!isPlaying} // Mute only when not playing (optional)
        >
          <source src={activeProject.videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  ) : (
    <div className="relative w-full h-full">
      {/* Default Background Video */}
      <video
        ref={videoRef}
        className="fixed top-0 left-48 h-screen w-[calc(100vw-12rem)] object-cover opacity-30" // Adjust for sidebar width
        loop
        playsInline
        muted={!isPlaying} // Mute only when not playing (optional)
      >
        <source src="/videos/phage.mp4" type="video/mp4" />
      </video>
    </div>
  )}
</div>




	{/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-48 bg-[#030303] h-screen overflow-y-auto"> {/* Add h-screen and overflow-y-auto for sidebar scrolling */}
          {/* Header */}
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <FileAudio className="w-3 h-3 text-gray-300" />
              <span 
                className="text-xs text-gray-300 cursor-pointer hover:text-gray-200 transition-colors"
                onClick={() => handleProjectSelect(phageIndex)}
              >
                Phage
              </span>
            </div>
          </div>






                 {/* Layers */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <Folder className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300">Layers OST</span>
            </div>
            <ul className="space-y-4">
              {layers.map(layer => (
                <li 
                  key={layer.id}
                  className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                    activeProject?.id === layer.id 
                      ? 'text-gray-100' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => handleProjectSelect(layer)}
                >
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-xs">{layer.title}</span>
                </li>
              ))}
            </ul>
          </div>


 {/* Songs Folder */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <Folder className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300">Songs</span>
            </div>
            <ul className="space-y-4 ml-4">
              {/* Will */}
              <li 
                className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                  activeProject?.id === 'will' 
                    ? 'text-gray-100' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => handleProjectSelect(will)}
              >
                <ChevronRight className="w-3 h-3" />
                <span className="text-xs">{will.title}</span>
              </li>
              {/* Solstice (8) */}
              <li 
                className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                  activeProject?.id === 'solstice' 
                    ? 'text-gray-100' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => handleProjectSelect(solstice)}
              >
                <ChevronRight className="w-3 h-3" />
                <span className="text-xs">{solstice.title}</span>
              </li>
            </ul>
          </div>

          {/* Ambience Folder */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <Folder className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300">Ambience</span>
            </div>
            <ul className="space-y-4 ml-4">
              {/* Defense System */}
              <li 
                className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                  activeProject?.id === 'ambience' 
                    ? 'text-gray-100' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => handleProjectSelect(ambience)}
              >
                <ChevronRight className="w-3 h-3" />
                <span className="text-xs">Defense System</span>
              </li>
              {/* Hangatýr */}
              <li 
                className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                  activeProject?.id === 'ambience-hangatyr' 
                    ? 'text-gray-100' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => handleProjectSelect(ambienceHangatyr)}
              >
                <ChevronRight className="w-3 h-3" />
                <span className="text-xs">Hangatýr</span>
              </li>
            </ul>
          </div>
        </div> 



{/* Main Content */}
<div className="flex-1 h-screen overflow-y-auto">
  <div className="p-8">
    {activeProject ? (
      activeProject.id === 'phage-index' ? ( // phage-index section
        <div className="flex flex-col items-center justify-center h-screen space-y-8"> {/* Center content */}
          <div className="space-y-12 text-center">
            <h1 className="text-2xl text-gray-300 font-light tracking-[0.5em] leading-relaxed">
              P H A G E
            </h1>
            <div className="space-y-8">
              <p className="text-base text-gray-400 max-w-md mx-auto leading-relaxed">
                signal-syntax
              </p>
              <div className="text-sm text-gray-500 space-y-6 leading-relaxed">
                <p>Original Sound Design • 2025</p>
                <p className="text-[10px]">System Ver. 1.0</p>
              </div>
            </div>
          </div>

          {/* Video Controls for phage-index */}
          <div className="w-full max-w-3xl mt-8"> {/* Add margin-top to separate from content */}
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
        </div>
      ) : ( // Other sections
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-normal text-gray-200">
              {activeProject.title}
            </h2>
            <X 
              className="w-3 h-3 cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => handleProjectSelect(null)}
            />
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xs text-gray-300">
              {activeProject.description}
            </p>
            <VideoControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              duration={duration}
              currentTime={currentTime}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              onSeek={handleSeek}
            />
            <div className="space-x-2">
              {activeProject.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-block px-2 py-0.5 text-xs text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-300">{activeProject.details}</p>
          </div>
        </div>
      )
    ) : (
      <div className="flex items-center justify-center h-full">
        <span className="text-xs text-gray-600">select a layer</span>
      </div>
    )}
  </div>

  <footer className="fixed bottom-0 left-48 right-0 p-2">
    <div className="text-xs text-gray-600 ml-4">
      -- NORMAL --
    </div>
  </footer>
</div> 


</div>
    </div>
  );
}

export default DesktopApp;

