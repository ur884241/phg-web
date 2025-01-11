import React, { useState } from 'react'
import { FileAudio, Folder, ChevronRight, Play, Pause, Volume2, X } from 'lucide-react'

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  
  const projects = [
    {
      id: 1,
      title: "Ambient Soundscape",
      description: "Environmental sound design for immersive installation",
      duration: "3:45",
      videoUrl: "/videos/box.mp4",
      tags: ["ambient", "installation", "nature"],
      details: "Created using field recordings and granular synthesis."
    },
    {
      id: 2,
      title: "Game Audio",
      description: "Sound effects and atmospheric audio for indie game",
      duration: "2:30",
      videoUrl: "/videos/box.mp4",
      tags: ["gaming", "sfx", "atmospheric"],
      details: "A collection of dynamic sound effects."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-gray-400 font-mono text-sm">
      <header className="fixed top-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm z-20">
        <div className="flex items-center space-x-2 opacity-50">
          <FileAudio className="w-3 h-3" />
          <span className="text-tiny">portfolio</span>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar - now with a semi-transparent background */}
        <div className="fixed left-0 top-0 bottom-0 w-48 p-4 pt-16 bg-black/50 backdrop-blur-sm z-10">
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

        {/* Main Content - Full screen video */}
        <div className="flex-1 ml-48">
          {activeProject ? (
            <div className="relative h-screen">
              {/* Video Container */}
              <div className="absolute inset-0">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                >
                  <source src={activeProject.videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* Overlay Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="max-w-3xl mx-auto space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-normal">{activeProject.title}</h2>
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-gray-300"
                      onClick={() => setActiveProject(null)}
                    />
                  </div>

                  <div className="flex items-center space-x-4 bg-black/20 p-3 rounded-lg backdrop-blur-sm">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      {isPlaying ? (
                        <Pause className="w-3 h-3" />
                      ) : (
                        <Play className="w-3 h-3" />
                      )}
                    </button>
                    <div className="flex-1 space-y-2">
                      <div className="h-0.5 bg-gray-800 rounded-full">
                        <div 
                          className="h-full bg-gray-500 rounded-full" 
                          style={{ width: '30%' }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-3 h-3 opacity-60" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-16 h-0.5 bg-gray-800 rounded-full appearance-none cursor-pointer"
                      />
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
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen text-gray-600">
              <span className="text-tiny">select a project</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
