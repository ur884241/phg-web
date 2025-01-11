import React, { useState } from 'react'
import { FileAudio, Folder, ChevronRight, Play, Pause, Volume2, X, ChevronDown } from 'lucide-react'

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [expandedFolders, setExpandedFolders] = useState({})
  
  const folders = {
    sounds: {
      name: "Sounds",
      items: [
        {
          id: 1,
          title: "Ambient Soundscape",
          description: "Environmental sound design for immersive installation",
          duration: "3:45",
          videoUrl: "/videos/box.mp4",
          tags: ["ambient", "installation", "nature"],
          details: "Created using field recordings and granular synthesis."
        }
      ]
    },
    visuals: {
      name: "Visuals",
      items: [
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
    },
    experiments: {
      name: "Experiments",
      subfolders: {
        audio: {
          name: "Audio",
          items: [
            {
              id: 3,
              title: "Experimental Track",
              description: "Sound experimentation",
              duration: "1:45",
              videoUrl: "/videos/box.mp4",
              tags: ["experimental", "synthesis"],
              details: "Pure synthesis exploration."
            }
          ]
        },
        visual: {
          name: "Visual",
          items: [
            {
              id: 4,
              title: "Visual Study",
              description: "Visual experiments",
              videoUrl: "/videos/box.mp4",
              tags: ["visual", "experimental"],
              details: "Visual processing studies."
            }
          ]
        }
      }
    }
  }

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  const renderFolder = (folderContent, path = '') => {
    const isExpanded = expandedFolders[path]
    
    return (
      <div className="ml-2">
        {folderContent.items?.map(project => (
          <li 
            key={project.id}
            className={`flex items-center space-x-2 cursor-pointer hover:text-gray-300 transition-colors py-1 ${
              activeProject?.id === project.id ? 'text-gray-200' : 'opacity-60'
            }`}
            onClick={() => setActiveProject(project)}
          >
            <ChevronRight className="w-3 h-3" />
            <span className="text-tiny">{project.title}</span>
          </li>
        ))}
        {folderContent.subfolders && Object.entries(folderContent.subfolders).map(([key, subfolder]) => (
          <div key={key}>
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:text-gray-300 py-1"
              onClick={() => toggleFolder(`${path}/${key}`)}
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
              <Folder className="w-3 h-3" />
              <span className="text-tiny">{subfolder.name}</span>
            </div>
            {isExpanded && renderFolder(subfolder, `${path}/${key}`)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black/95 text-gray-400 font-mono text-sm backdrop-blur-sm relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-4 bg-transparent">
          <div className="flex items-center space-x-2 opacity-50">
            <FileAudio className="w-3 h-3" />
            <span className="text-tiny">portfolio</span>
          </div>
        </header>

        <div className="flex min-h-[calc(100vh-6rem)]">
          {/* Sidebar */}
          <div className="w-48 p-4 bg-black/20">
            {Object.entries(folders).map(([key, folder]) => (
              <div key={key} className="mb-4">
                <div 
                  className="flex items-center space-x-2 cursor-pointer hover:text-gray-300 mb-2"
                  onClick={() => toggleFolder(key)}
                >
                  {expandedFolders[key] ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                  <Folder className="w-3 h-3" />
                  <span className="text-tiny">{folder.name}</span>
                </div>
                {expandedFolders[key] && renderFolder(folder, key)}
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-8">
            {activeProject ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center opacity-60">
                  <h2 className="text-xs font-normal">{activeProject.title}</h2>
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-gray-300"
                    onClick={() => setActiveProject(null)}
                  />
                </div>
                
                <div className="relative overflow-hidden aspect-square max-w-3xl mx-auto bg-black/30">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                  >
                    <source src={activeProject.videoUrl} type="video/mp4" />
                  </video>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                  <p className="text-tiny opacity-60">{activeProject.description}</p>
                  
                  <div className="bg-black/20 p-3 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
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
        </div>

        <footer className="fixed bottom-0 left-0 right-0 p-2 bg-transparent">
          <div className="text-tiny opacity-30 ml-4">
            -- NORMAL --
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
