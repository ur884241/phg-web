import React, { useState, useRef, useEffect } from 'react'
import { FileAudio, Folder, ChevronRight, Play, Pause, Volume2, X } from 'lucide-react'

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef(null)
  
  const projects = [
    {
      id: 1,
      title: "Ambient Soundscape",
      description: "Environmental sound design for immersive installation",
      videoUrl: "/videos/box.mp4",
      tags: ["ambient", "installation", "nature"],
      details: "Created using field recordings and granular synthesis."
    },
    {
      id: 2,
      title: "Game Audio",
      description: "Sound effects and atmospheric audio for indie game",
      videoUrl: "/videos/box.mp4",
      tags: ["gaming", "sfx", "atmospheric"],
      details: "A collection of dynamic sound effects."
    }
  ]

  useEffect(() => {
    if (videoRef.current) {
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
  }, [volume, activeProject])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleTimelineClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - bounds.left) / bounds.width
    if (videoRef.current && duration) {
      const newTime = percent * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-400 font-mono text-sm">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        {activeProject && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-50"
            loop
            playsInline
            muted={false}
          >
            <source src={activeProject.videoUrl} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-48 bg-gray-900">
          {/* Header in sidebar */}
          <div className="p-4">
            <div className="flex items-center space-x-2 opacity-50">
              <FileAudio className="w-3 h-3" />
              <span className="text-tiny">portfolio</span>
            </div>
          </div>

          {/* Project list */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6 opacity-50">
              <Folder className="w-3 h-3" />
              <span className="text-tiny">projects</span>
            </div>
            <ul className="space-y-4">
              {projects.map(project => (
                <li 
                  key={project.id}
                  className={`flex items-center space-x-2 cursor-pointer hover:text-gray-300 transition-colors ${
                    activeProject?.id === project.id ? 'text-gray-200' : 'opacity-60'
                  }`}
                  onClick={() => setActiveProject(project)}
                >
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-tiny">{project.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {activeProject ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center opacity-60">
                  <h2 className="text-xs font-normal">{activeProject.title}</h2>
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-gray-300"
                    onClick={() => setActiveProject(null)}
                  />
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                  <p className="text-tiny opacity-60">{activeProject.description}</p>
                  
                  {/* Video Controls */}
                  <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-4 mb-2">
                      <button
                        onClick={togglePlay}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      >
                        {isPlaying ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </button>
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-tiny opacity-50">{formatTime(currentTime)}</span>
                        <div 
                          className="flex-1 h-0.5 bg-gray-700 rounded-full cursor-pointer"
                          onClick={handleTimelineClick}
                        >
                          <div 
                            className="h-full bg-gray-400 rounded-full"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                        <span className="text-tiny opacity-50">{formatTime(duration)}</span>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Volume2 className="w-3 h-3 opacity-60" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(parseInt(e.target.value))}
                          className="w-24 h-0.5 bg-gray-700 rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-x-2">
                    {activeProject.tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-block px-2 py-0.5 text-tiny opacity-40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-tiny opacity-60">{activeProject.details}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600">
                <span className="text-tiny">select a project</span>
              </div>
            )}
          </div>

          <footer className="fixed bottom-0 left-48 right-0 p-2">
            <div className="text-tiny opacity-30 ml-4">
              -- NORMAL --
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
