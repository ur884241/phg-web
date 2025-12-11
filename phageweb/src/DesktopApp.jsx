import React, { useState } from 'react';
import { projects } from './data/projects';
import ProjectThumbnail from './components/ProjectThumbnail';
import VideoModal from './components/VideoModal';

function DesktopApp() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-[#030303] text-[#8C847A] font-mono selection:bg-[#C2B59B] selection:text-black">

      {/* Header / Brand - Very subtle */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8 flex justify-between items-start pointer-events-none mix-blend-difference">
        <h1 className="text-xl font-['Cormorant_Garamond'] tracking-[0.2em] opacity-50">
          φάγος
        </h1>
        <div className="text-right space-y-1 opacity-50 text-[10px]">
          <p>SYSTEM VER. 2.0</p>
          <p>SIGNAL: ONLINE</p>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="container mx-auto px-8 py-32 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {projects.map((project) => (
            <ProjectThumbnail
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </main>

      {/* Footer / Socials (Fixed bottom) */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center space-x-8 mix-blend-difference pointer-events-auto">
        <a
          href="https://open.spotify.com/artist/69586kzZpLeJAyQCdwZcfz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6A665E] hover:text-[#9E988A] transition-colors"
        >
          Spotify
        </a>
        <a
          href="https://www.instagram.com/8phage/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6A665E] hover:text-[#9E988A] transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://x.com/8Phage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6A665E] hover:text-[#9E988A] transition-colors"
        >
          X / Twitter
        </a>
      </footer>

      {/* Video Modal */}
      {selectedProject && (
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default DesktopApp;


