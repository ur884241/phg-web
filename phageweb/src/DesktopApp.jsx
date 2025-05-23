import React, { useState, useRef, useEffect } from 'react';
import { FileAudio, Folder, ChevronRight, Play, Pause, Volume2, X } from 'lucide-react';
import { blogEntries } from './data/blogData';

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
          className="text-[#8C847A] hover:text-[#9E988A] transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3" />
          )}
        </button>
        <div className="flex items-center space-x-2 flex-1">
          <span className="text-xs text-[#8C847A] min-w-[40px]">
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
          <span className="text-xs text-[#8C847A] min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Volume2 className="w-3 h-3 text-[#8C847A]" />
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

const BlogColumn = () => {
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return (
      <div className="flex space-x-1">
        <span className="text-[#8FB8E0]">{day}</span>
        <span className="text-[#E0CF8F]">{month}</span>
        <span className="text-[#B88FE0]">{year}</span>
      </div>
    );
  };

  return (
    <div className="w-48 h-screen overflow-y-auto fixed right-0 top-0 z-20 text-[#8C847A] text-[10px] p-4">
      <div className="space-y-4">
        <h3 className="text-[#9E988A] font-semibold">Recent Updates</h3>
        <div className="space-y-3">
          {blogEntries.map((entry, index) => (
            <div key={entry.date} className={`opacity-${100 - (index * 10)}`}>
              {formatDate(entry.date)}
              <p className="text-[#8C847A] mt-1">{entry.content}</p>
            </div>
          ))}
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

  const [layersExpanded, setLayersExpanded] = useState(true);
  const [songsExpanded, setSongsExpanded] = useState(true);
  const [ambienceExpanded, setAmbienceExpanded] = useState(true);

  const [activeProject, setActiveProject] = useState(phageIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
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

  const laudes = {
    id: 'laudes',
    title: "Laudes",
    description: "Ode to Life",
    videoUrl: "/videos/laudes.mp4",
    isYouTube: false,
    tags: ["music", "vivaldi", "laudes"],
    details: "A musical journey through time and space."
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
    <div className="min-h-screen bg-[#030303] text-[#8C847A] font-mono text-sm overflow-hidden"> {/* Add overflow-hidden here */}
     
{/* Background Video */}
<div className="fixed inset-0 z-0">
  {activeProject ? (
    <div className="relative w-full h-full">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] to-transparent opacity-0 z-10 pointer-events-none" />

      {/* Video Player */}
      {activeProject.isYouTube ? (
        <div
          id="youtube-player"
          className="fixed top-0 left-48 h-screen w-[calc(100vw-24rem)]" // Adjusted for both sidebars
          style={{ overflow: 'hidden' }}
        />
      ) : (
        <video
          ref={videoRef}
          className="fixed top-0 left-48 h-screen w-[calc(100vw-24rem)] object-cover" // Adjusted for both sidebars
          loop
          playsInline
          muted={!isPlaying}
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
        className="fixed top-0 left-48 h-screen w-[calc(100vw-24rem)] object-cover opacity-30" // Adjusted for both sidebars
        loop
        playsInline
        muted={!isPlaying}
      >
        <source src="/videos/phage.mp4" type="video/mp4" />
      </video>
    </div>
  )}
</div>




	{/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-48 bg-[#030303] h-screen overflow-y-auto relative z-30"> {/* Added z-30 */}
          {/* Header */}
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <FileAudio className="w-3 h-3 text-[#8C847A]" />
              <span 
                className="text-xs text-[#8C847A] cursor-pointer hover:text-[#9E988A] transition-colors"
                onClick={() => handleProjectSelect(phageIndex)}
              >
                Phage
              </span>
            </div>
          </div>





{/* Layers */}
<div className="p-4">
  <div 
    className="flex items-center space-x-2 mb-3 cursor-pointer"
    onClick={() => setLayersExpanded(!layersExpanded)}
  >
    <ChevronRight className={`w-3 h-3 text-[#8C847A] transition-transform ${layersExpanded ? 'rotate-90' : ''}`} />
    <Folder className="w-3 h-3 text-[#8C847A]" />
    <span className="text-[11px] text-[#8C847A]">Layers OST</span>
  </div>
  {layersExpanded && (
    <ul className="space-y-3 ml-4">
      {layers.map(layer => (
        <li 
          key={layer.id}
          className={`flex items-center space-x-2 cursor-pointer transition-colors ${
            activeProject?.id === layer.id 
              ? 'text-[#9E988A]' 
              : 'text-[#6A665E] hover:text-[#9E988A]'
          }`}
          onClick={() => handleProjectSelect(layer)}
        >
          <ChevronRight className="w-3 h-3" />
          <span className="text-[11px] flex items-center space-x-2">
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
            <span className="text-[#8C847A]">
              {layer.title.split(' ').slice(1).join(' ')}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )}
</div>

{/* Songs Folder */}
<div className="p-4">
  <div 
    className="flex items-center space-x-2 mb-3 cursor-pointer"
    onClick={() => setSongsExpanded(!songsExpanded)}
  >
    <ChevronRight className={`w-3 h-3 text-[#8C847A] transition-transform ${songsExpanded ? 'rotate-90' : ''}`} />
    <Folder className="w-3 h-3 text-[#8C847A]" />
    <span className="text-[11px] text-[#8C847A]">Songs</span>
  </div>
  {songsExpanded && (
    <ul className="space-y-3 ml-4">
      {/* Will */}
      <li 
        className={`flex items-center space-x-2 cursor-pointer transition-colors ${
          activeProject?.id === 'will' 
            ? 'text-[#9E988A]' 
            : 'text-[#6A665E] hover:text-[#9E988A]'
        }`}
        onClick={() => handleProjectSelect(will)}
      >
        <ChevronRight className="w-3 h-3" />
        <span className="text-[11px]">{will.title}</span>
      </li>
      {/* Solstice (8) */}
      <li 
        className={`flex items-center space-x-2 cursor-pointer transition-colors ${
          activeProject?.id === 'solstice' 
            ? 'text-[#9E988A]' 
            : 'text-[#6A665E] hover:text-[#9E988A]'
        }`}
        onClick={() => handleProjectSelect(solstice)}
      >
        <ChevronRight className="w-3 h-3" />
        <span className="text-[11px]">{solstice.title}</span>
      </li>
      {/* Laudes */}
      <li 
        className={`flex items-center space-x-2 cursor-pointer transition-colors ${
          activeProject?.id === 'laudes' 
            ? 'text-[#9E988A]' 
            : 'text-[#6A665E] hover:text-[#9E988A]'
        }`}
        onClick={() => handleProjectSelect(laudes)}
      >
        <ChevronRight className="w-3 h-3" />
        <span className="text-[11px]">{laudes.title}</span>
      </li>
    </ul>
  )}
</div>

{/* Ambience Folder */}
<div className="p-4">
  <div 
    className="flex items-center space-x-2 mb-3 cursor-pointer"
    onClick={() => setAmbienceExpanded(!ambienceExpanded)}
  >
    <ChevronRight className={`w-3 h-3 text-[#8C847A] transition-transform ${ambienceExpanded ? 'rotate-90' : ''}`} />
    <Folder className="w-3 h-3 text-[#8C847A]" />
    <span className="text-[11px] text-[#8C847A]">Ambience</span>
  </div>
  {ambienceExpanded && (
    <ul className="space-y-3 ml-4">
      {/* Defense System */}
      <li 
        className={`flex items-center space-x-2 cursor-pointer transition-colors ${
          activeProject?.id === 'ambience' 
            ? 'text-[#9E988A]' 
            : 'text-[#6A665E] hover:text-[#9E988A]'
        }`}
        onClick={() => handleProjectSelect(ambience)}
      >
        <ChevronRight className="w-3 h-3" />
        <span className="text-[11px]">Defense System</span>
      </li>
      {/* Hangatýr */}
      <li 
        className={`flex items-center space-x-2 cursor-pointer transition-colors ${
          activeProject?.id === 'ambience-hangatyr' 
            ? 'text-[#9E988A]' 
            : 'text-[#6A665E] hover:text-[#9E988A]'
        }`}
        onClick={() => handleProjectSelect(ambienceHangatyr)}
      >
        <ChevronRight className="w-3 h-3" />
        <span className="text-[11px]">Hangatýr</span>
      </li>
    </ul>
  )}
</div>
 {/* Social Media Links */}
          <div className="p-6 mt-8">
            <div className="flex items-center justify-center space-x-8">
              <a 
                href="https://open.spotify.com/artist/69586kzZpLeJAyQCdwZcfz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A665E] hover:text-[#9E988A] transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/8phage/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A665E] hover:text-[#9E988A] transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/8Phage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6A665E] hover:text-[#9E988A] transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>




        </div> 



{/* Main Content */}
<div className="flex-1 h-screen overflow-y-auto relative"> {/* Added relative */}
  <div className="p-8 w-full">
    {activeProject ? (
      activeProject.id === 'phage-index' ? ( // phage-index section
        <div className="fixed inset-0 flex flex-col items-center justify-center space-y-8 z-0"> {/* Changed z-10 to z-0 */}
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
        <div className="space-y-8 relative z-10"> {/* Changed z-20 to z-10 */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-normal text-[#9E988A]">
              {activeProject.title}
            </h2>
            <X 
              className="w-3 h-3 cursor-pointer text-[#6A665E] hover:text-[#9E988A]"
              onClick={() => handleProjectSelect(null)}
            />
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xs text-[#8C847A]">
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
                  className="inline-block px-2 py-0.5 text-xs text-[#6A665E]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#8C847A]">{activeProject.details}</p>
          </div>
        </div>
      )
    ) : (
      <div className="flex items-center justify-center h-full">
        <span className="text-xs text-[#6A665E]">select a layer</span>
      </div>
    )}
  </div>

  <footer className="fixed bottom-0 left-48 right-0 p-2">
    <div className="text-xs text-[#6A665E] ml-4">
      -- NORMAL --
    </div>
  </footer>
</div> 


</div>

{/* Blog Column */}
<BlogColumn />
    </div>
  );
}

export default DesktopApp;

