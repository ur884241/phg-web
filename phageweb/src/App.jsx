import React, { useState } from 'react'
import { FileAudio, Folder, ChevronRight, X } from 'lucide-react'

function App() {
  const [activeProject, setActiveProject] = useState(null)
  
  
  const layers = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Layer ${i + 1}`,
    description: `Layer ${i + 1} content description`,
    videoUrl: `/videos/layer${i + 1}.mp4`,
    isYouTube: false,
    tags: ["layer", `l${i + 1}`, "phage"],
    details: `Detailed content for Layer ${i + 1}.`
  }))
const ambience = {
    id: 'ambience',
    title: "Ambience: Defense System",
    description: "Defense System ambient sound design",
    // Replace this with your video ID
    videoUrl: "VDaXOlNcXT0",  // Example: lofi girl video ID
    isYouTube: true,
    tags: ["ambient", "defense", "system"],
    details: "Ambient soundscape design for defense system interface."
  }




  return (
    <div className="min-h-screen bg-[#030303] text-gray-300 font-mono text-sm">
      {/* Background Video/Content */}
      <div className="fixed inset-0 z-0">
        {activeProject && activeProject.isYouTube ? (
          <div className="relative w-full h-full bg-black">
            <iframe 
              src={`https://www.youtube.com/embed/${activeProject.videoUrl}?autoplay=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${activeProject.videoUrl}`}
              className="absolute w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ opacity: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] pointer-events-none" />
          </div>
        ) : activeProject && (
          <video
            src={activeProject.videoUrl}
            className="w-full h-full object-cover opacity-30"
            autoPlay
            loop
            muted
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-48 bg-[#030303]">
          {/* Header */}
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <FileAudio className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300">Phage</span>
            </div>
          </div>

          {/* Ambience Project */}
          <div className="p-4">
            <div 
              className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                activeProject?.id === 'ambience' 
                  ? 'text-gray-100' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveProject(ambience)}
            >
              <ChevronRight className="w-3 h-3" />
              <span className="text-xs">{ambience.title}</span>
            </div>
          </div>

          {/* Layers */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <Folder className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300">Layers</span>
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
                  onClick={() => setActiveProject(layer)}
                >
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-xs">{layer.title}</span>
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
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-normal text-gray-200">
                    {activeProject.title}
                  </h2>
                  <X 
                    className="w-3 h-3 cursor-pointer text-gray-400 hover:text-gray-200"
                    onClick={() => setActiveProject(null)}
                  />
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                  <p className="text-xs text-gray-300">
                    {activeProject.description}
                  </p>
                  
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
  )
}

export default App
