import React, { useRef, useEffect } from 'react';

const ProjectThumbnail = ({ project, onClick }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // Slow down slightly for "zen" feel
        }
    }, []);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => { }); // Ignore auto-play strict policy errors
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-sm bg-[#050505]"
            onClick={() => onClick(project)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Video/Image */}
            <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-80">
                {!project.isYouTube ? (
                    <video
                        ref={videoRef}
                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                        muted
                        loop
                        playsInline
                        src={project.videoUrl}
                    />
                ) : (
                    /* For YouTube projects, we might not have a direct video loop ease of access without fetching.
                       For now, use a placeholder or the project main image if we had one. 
                       Since we don't have thumbnails, we can try to use a default or just text.
                       However, the user wants "all projects with video/audio". 
                       Let's use a placeholder gradient for YouTube items if we can't easily get a thumb.
                       Actually, for YouTube `VDaXOlNcXT0`, the thumb is `https://img.youtube.com/vi/VDaXOlNcXT0/maxresdefault.jpg`
                    */
                    <img
                        src={`https://img.youtube.com/vi/${project.videoUrl}/maxresdefault.jpg`}
                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 opacity-60"
                        alt={project.title}
                    />
                )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="text-xl font-['Cormorant_Garamond'] tracking-[0.1em] text-[#C2B59B] mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {project.title}
                </h3>
                <p className="text-xs font-mono text-[#8C847A] opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                    {project.tags.join(' / ')}
                </p>
            </div>
        </div>
    );
};

export default ProjectThumbnail;
