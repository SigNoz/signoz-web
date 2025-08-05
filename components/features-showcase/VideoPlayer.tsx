'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface VideoPlayerProps {
  thumbnailSrc: string
  videoSrc: string
  title: string
  className?: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  thumbnailSrc,
  videoSrc,
  title,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isInViewport, setIsInViewport] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlayClick = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
        setShowThumbnail(false)
      }
    }
  }, [isPlaying])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePlayClick()
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !video.duration) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = (clickX / rect.width) * 100
    const newTime = (percentage / 100) * video.duration

    video.currentTime = newTime
    setProgress(percentage)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('loadeddata', () => setIsLoading(false))
    video.addEventListener('waiting', () => setIsLoading(true))
    video.addEventListener('playing', () => setIsLoading(false))

    return () => {
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('loadeddata', () => setIsLoading(false))
      video.removeEventListener('waiting', () => setIsLoading(true))
      video.removeEventListener('playing', () => setIsLoading(false))
    }
  }, [videoSrc])

  // Viewport detection
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      { threshold: 0.5 } // Video needs to be at least 50% visible
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Spacebar control (only when in viewport)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isInViewport) {
        e.preventDefault()
        handlePlayClick()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handlePlayClick, isInViewport])

  return (
    <div
      ref={containerRef}
      className={`hover:border-signoz_accent-300/50 group relative overflow-hidden rounded-lg  bg-signoz_ink-300/30 transition-all duration-300 ${className}`}
    >
      <div className="relative aspect-video w-full">
        {/* Thumbnail Image */}
        {showThumbnail && (
          <div className="absolute inset-0 z-10">
            <Image
              src={thumbnailSrc}
              alt={`${title} showcase thumbnail`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />

            {/* Play Button Overlay */}
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/30"
              onClick={handlePlayClick}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label={`Play ${title} showcase video`}
            >
              <div className="bg-signoz_accent-300/90 group-hover:bg-signoz_accent-300 flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 text-white" fill="currentColor" />
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => {
            setIsPlaying(true)
            setShowThumbnail(false)
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label={`${title} showcase video`}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading Indicator */}
        {isLoading && !showThumbnail && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
            <div className="rounded-lg bg-signoz_ink-300/80 p-4 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-signoz_vanilla-100" />
            </div>
          </div>
        )}

        {/* Video Controls Overlay (when video is playing) */}
        {!showThumbnail && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 hover:bg-black/20 hover:opacity-100">
            <button
              onClick={handlePlayClick}
              className="bg-signoz_accent-300/80 hover:bg-signoz_accent-300 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              aria-label={isPlaying ? `Pause ${title} video` : `Play ${title} video`}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 text-white" fill="currentColor" />
              )}
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 cursor-pointer bg-signoz_slate-400/20 transition-all duration-200 hover:h-2"
          onClick={handleProgressClick}
          title="Click to seek"
        >
          <div
            className="h-full bg-gradient-to-r from-signoz_robin-500 to-signoz_sakura-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
