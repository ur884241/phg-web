import React, { useState, useRef, useEffect } from 'react'
import { FileAudio, Folder, ChevronRight, Play, Pause, Volume2, X, Menu } from 'lucide-react'
import { useDeviceDetect } from './DeviceDetector'

// Mobile-optimized video controls
const MobileVideoControls = ({ 
  isPlaying, 
  onPlayPause, 
  duration, 
  currentTime, 
  volume,
  onVolumeChange,
  onSeek
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#030303]/90 p-4 backdrop-blur-sm">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-300 min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <div 
            className="flex-1 h-1 bg-gray-800 rounded-full cursor-pointer"
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
        
        <div className="flex justify-between items-center">
          <button
            onClick={onPlayPause}
            className="text-gray-300 p-2"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-gray-300" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={onVolumeChange}
              className="w-24 h-1 rounded-full appearance-none cursor-pointer bg-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile App Component
function MobileApp() {
const [activeProject, setActiveProject] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [youtubePlayer, setYoutubePlayer] = useState(null)
  const videoRef = useRef(null)

  const ambience = {
    id: 'ambience',
    title: "Ambience: Defense System",
    description: "Defense System ambient sound design",
    videoUrl: "VDaXOlNcXT0",
    isYouTube: true,
    tags: ["ambient", "defense", "system"],
    details: "Ambient soundscape design for defense system interface."
  }

  const solstice = {
    id: 'solstice',
    title: "8",
    description: "Solstice music track",
    videoUrl: "/videos/8.mp4",
    isYouTube: false,
    tags: ["music", "solstice", "8"],
    details: "Solstice music track with visual accompaniment."
  }
  
  const layers = [
    {
      id: 1,
      title: "Genesis",
      description: "The beginning. The origin point of consciousness.",
      videoUrl: "/videos/layer1.mp4",
      isYouTube: false,
      tags: ["origin", "consciousness", "beginning"],
      details: "Exploration of the fundamental emergence of awareness and existence."
    },
    {
      id: 2,
      title: "Duality",
      description: "The split between reality and perception.",
      videoUrl: "/videos/layer2.mp4",
      isYouTube: false,
      tags: ["duality", "perception", "reality"],
      details: "Investigation of the inherent duality in conscious experience."
    },
    {
      id: 3,
      title: "Man",
      description: "The human element in the system.",
      videoUrl: "/videos/layer3.mp4",
      isYouTube: false,
      tags: ["human", "existence", "consciousness"],
      details: "Examining the role of human consciousness in the system."
    },
    {
      id: 4,
      title: "Society",
      description: "The collective consciousness manifested.",
      videoUrl: "/videos/layer4.mp4",
      isYouTube: false,
      tags: ["collective", "society", "structure"],
      details: "Analysis of collective consciousness patterns and structures."
    },
    {
      id: 5,
      title: "Delusion",
      description: "The distortion of perceived reality.",
      videoUrl: "/videos/layer5.mp4",
      isYouTube: false,
      tags: ["illusion", "perception", "distortion"],
      details: "Exploration of the gaps between reality and its perception."
    },
    {
      id: 6,
      title: "Altered Machine",
      description: "The fusion of consciousness and technology.",
      videoUrl: "/videos/layer6.mp4",
      isYouTube: false,
      tags: ["technology", "fusion", "alteration"],
      details: "Study of the intersection between machine and consciousness."
    },
    {
      id: 7,
      title: "Imaginator",
      description: "The creation of new realities.",
      videoUrl: "/videos/layer7.mp4",
      isYouTube: false,
      tags: ["creation", "imagination", "reality"],
      details: "Investigation of the power to create and shape new realities."
    },
    {
      id: 8,
      title: "Force",
      description: "The underlying power that drives all layers.",
      videoUrl: "/videos/layer8.mp4",
      isYouTube: false,
      tags: ["power", "force", "drive"],
      details: "Examination of the fundamental force behind consciousness and reality."
    }
  ]

  useEffect(() => {
    if (activeProject?.isYouTube) {
      if (!youtubePlayer) {
        const player = new YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: activeProject.videoUrl,
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            playlist: activeProject.videoUrl,
            enablejsapi: 1
          },
          events: {
            onReady: (event) => {
              setYoutubePlayer(event.target)
              setDuration(event.target.getDuration())
              event.target.setVolume(volume)
            },
            onStateChange: (event) => {
              setIsPlaying(event.data === YT.PlayerState.PLAYING)
            }
          }
        })
      } else {
        youtubePlayer.loadVideoById(activeProject.videoUrl)
      }

      const interval = setInterval(() => {
        if (youtubePlayer) {
          setCurrentTime(youtubePlayer.getCurrentTime())
        }
      }, 1000)

      return () => clearInterval(interval)
    } else if (videoRef.current) {
      videoRef.current.volume = volume / 100
      
      const updateTime = () => {
        setCurrentTime(videoRef.current.currentTime)
        setDuration(videoRef.current.duration)
      }

      videoRef.current.addEventListener('timeupdate', updateTime)
      videoRef.current.addEventListener('loadedmetadata', updateTime)

      return () => {
        videoRef.current?.removeEventListener('timeupdate', updateTime)
        videoRef.current?.removeEventListener('loadedmetadata', updateTime)
      }
    }
  }, [activeProject, youtubePlayer])

  const handlePlayPause = () => {
    if (activeProject?.isYouTube && youtubePlayer) {
      if (isPlaying) {
        youtubePlayer.pauseVideo()
      } else {
        youtubePlayer.playVideo()
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (activeProject?.isYouTube && youtubePlayer) {
      youtubePlayer.setVolume(newVolume)
    } else if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
    }
  }

  const handleSeek = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - bounds.left) / bounds.width
    const newTime = percent * duration

    if (activeProject?.isYouTube && youtubePlayer) {
      youtubePlayer.seekTo(newTime)
    } else if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
    setCurrentTime(newTime)
  }

  // ... same state management as desktop version ...

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#030303] text-gray-300 font-mono">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        {activeProject && (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] to-transparent opacity-80" />
            {activeProject.isYouTube ? (
              <div id="youtube-player" className="w-full h-full" />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={false}
              >
                <source src={activeProject.videoUrl} type="video/mp4" />
              </video>
            )}
          </div>
        )}
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-[#030303]/90 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <FileAudio className="w-4 h-4" />
            <span className="text-sm">Phage</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-[#030303]">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm">Projects</span>
              <X 
                className="w-5 h-5"
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>

            {/* Projects List */}
            <div className="space-y-6">
              {/* Ambience Project */}
              <div 
                className={`${
                  activeProject?.id === 'ambience' 
                    ? 'text-gray-100' 
                    : 'text-gray-400'
                }`}
                onClick={() => {
                  setActiveProject(ambience)
                  setIsSidebarOpen(false)
                }}
              >
                <div className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>{ambience.title}</span>
                </div>
              </div>

              {/* Layers */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Folder className="w-4 h-4" />
                  <span>Layers</span>
                </div>
                <div className="space-y-4 pl-4">
                  {layers.map(layer => (
                    <div 
                      key={layer.id}
                      className={`${
                        activeProject?.id === layer.id 
                          ? 'text-gray-100' 
                          : 'text-gray-400'
                      }`}
                      onClick={() => {
                        setActiveProject(layer)
                        setIsSidebarOpen(false)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <ChevronRight className="w-4 h-4" />
                        <span>{layer.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 pt-16 pb-32">
        {activeProject ? (
          <div className="p-4 space-y-6">
            <h2 className="text-lg font-normal text-gray-200">
              {activeProject.title}
            </h2>
            
            <p className="text-sm text-gray-300">
              {activeProject.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {activeProject.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-block px-2 py-1 text-xs text-gray-400 bg-gray-800/50 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-sm text-gray-300">{activeProject.details}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <span className="text-gray-600">Select a project</span>
          </div>
        )}
      </div>

      {/* Mobile Video Controls */}
      {activeProject && (
        <MobileVideoControls 
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          duration={duration}
          currentTime={currentTime}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          onSeek={handleSeek}
        />
      )}
    </div>
  )
}

// Main App with device detection
function App() {
  const { isMobile } = useDeviceDetect()
  
  if (isMobile) {
    return <MobileApp />
  }
  
  return <DesktopApp />  // Your existing desktop version
}

export default App
