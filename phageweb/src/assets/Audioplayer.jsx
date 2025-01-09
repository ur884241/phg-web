import React from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

const AudioPlayer = ({ 
  isPlaying, 
  onPlayPause, 
  duration, 
  currentTime = "0:00", 
  volume, 
  onVolumeChange 
}) => {
  return (
    <div className="bg-editor-bg p-3 rounded shadow-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={onPlayPause}
          className="hover:text-gray-400 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        <div className="flex-1 space-y-1">
          <div className="relative">
            <div className="h-1 bg-gray-700 rounded">
              <div 
                className="h-full bg-gray-400 rounded transition-all duration-300" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-tiny text-gray-500">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onVolumeChange}
            className="w-16"
          />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
