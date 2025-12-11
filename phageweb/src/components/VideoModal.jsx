import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, Maximize } from 'lucide-react';

const VideoModal = ({ project, onClose }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [youtubePlayer, setYoutubePlayer] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        let interval;

        if (project.isYouTube) {
            // Load YouTube API if not already loaded
            if (!window.YT) {
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            const initPlayer = () => {
                if (window.YT && window.YT.Player) {
                    new window.YT.Player('youtube-modal-player', {
                        height: '100%',
                        width: '100%',
                        videoId: project.videoUrl,
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3
                        },
                        events: {
                            onReady: (event) => {
                                setYoutubePlayer(event.target);
                                setDuration(event.target.getDuration());
                                setIsPlaying(true);
                            },
                            onStateChange: (event) => {
                                // Correctly update state based on YouTube player state
                                // YT.PlayerState.PLAYING is 1, PAUSED is 2
                                setIsPlaying(event.data === 1);
                            }
                        }
                    });
                } else {
                    // Retry if API not ready
                    setTimeout(initPlayer, 100);
                }
            };

            initPlayer();

            // Polling for current time
            interval = setInterval(() => {
                if (youtubePlayer && youtubePlayer.getCurrentTime) {
                    setCurrentTime(youtubePlayer.getCurrentTime());
                }
            }, 1000);

        } else {
            // Local Video Setup
            if (videoRef.current) {
                videoRef.current.volume = volume / 100;
                videoRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Autoplay blocked", e));
            }
        }

        return () => {
            if (interval) clearInterval(interval);
            if (youtubePlayer && youtubePlayer.destroy) {
                youtubePlayer.destroy();
            }
        };
    }, [project]);

    const togglePlay = () => {
        if (project.isYouTube && youtubePlayer) {
            if (isPlaying) {
                youtubePlayer.pauseVideo();
            } else {
                youtubePlayer.playVideo();
            }
        } else if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - bounds.left) / bounds.width;
        const newTime = percent * duration;

        if (project.isYouTube && youtubePlayer) {
            youtubePlayer.seekTo(newTime);
        } else if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVol = parseInt(e.target.value);
        setVolume(newVol);
        if (project.isYouTube && youtubePlayer) {
            youtubePlayer.setVolume(newVol);
        } else if (videoRef.current) {
            videoRef.current.volume = newVol / 100;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Local Video Event Handlers
    const onTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime);
        setDuration(e.target.duration);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">

            {/* Container */}
            <div className="relative w-full max-w-5xl bg-[#080808] border border-[#1a1a1a] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

                {/* Header / Close */}
                <div className="absolute top-0 right-0 z-20 p-4">
                    <button
                        onClick={onClose}
                        className="text-[#8C847A] hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Video Player Area - 16:9 Aspect Ratio Container */}
                <div className="relative aspect-video w-full bg-black group">
                    {project.isYouTube ? (
                        <div id="youtube-modal-player" className="w-full h-full pointer-events-none" />
                    ) : (
                        <video
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            src={project.videoUrl}
                            onTimeUpdate={onTimeUpdate}
                            onEnded={() => setIsPlaying(false)}
                            onClick={togglePlay}
                        />
                    )}

                    {/* Custom Controls Overlay (Visible on Hover or Paused) */}
                    <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                        <div className="flex flex-col space-y-4">
                            {/* Progress Bar */}
                            <div
                                className="h-1 bg-white/20 rounded-full cursor-pointer relative group/seek"
                                onClick={handleSeek}
                            >
                                <div
                                    className="absolute top-0 left-0 h-full bg-white/80 rounded-full"
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                />
                                <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full opacity-0 group-hover/seek:opacity-100 transition-opacity"
                                    style={{ left: `${(currentTime / duration) * 100}%` }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <button onClick={togglePlay} className="text-white hover:text-[#C2B59B] transition-colors">
                                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                    </button>
                                    <span className="text-xs font-mono text-[#8C847A]">
                                        {formatTime(currentTime)} / {formatTime(duration || 0)}
                                    </span>
                                    <div className="flex items-center space-x-2 group/vol">
                                        <Volume2 className="w-4 h-4 text-[#8C847A]" />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={volume}
                                            onChange={handleVolumeChange}
                                            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-8 bg-[#080808] border-t border-[#1a1a1a] overflow-y-auto">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#C2B59B] mb-2">{project.title}</h2>
                            <p className="text-sm font-mono text-[#6A665E] mb-4">{project.tags.join(' • ')}</p>
                            <p className="text-[#8C847A] text-sm leading-relaxed max-w-2xl whitespace-pre-line">
                                {project.details || project.description}
                            </p>
                        </div>
                        {project.category && (
                            <div className="text-xs font-mono text-[#444] border border-[#1a1a1a] px-3 py-1 rounded-full px-2">
                                {project.category.toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VideoModal;
