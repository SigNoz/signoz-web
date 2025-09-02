'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface VideoPlayerProps {
  thumbnailSrc?: string
  videoSrc?: string
  imageSrc?: string
  title: string
  className?: string
  mediaType: 'video' | 'image'
  isActive?: boolean
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  thumbnailSrc,
  videoSrc,
  imageSrc,
  title,
  className = '',
  mediaType,
  isActive = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoadedVideo, setHasLoadedVideo] = useState(false)
  const [shouldPreload, setShouldPreload] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isInViewport, setIsInViewport] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlayClick = useCallback(() => {
    if (videoRef.current && mediaType === 'video') {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
        setShowThumbnail(false)
      }
    }
  }, [isPlaying, mediaType])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePlayClick()
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !video.duration || mediaType !== 'video') return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = (clickX / rect.width) * 100
    const newTime = (percentage / 100) * video.duration

    video.currentTime = newTime
    setProgress(percentage)
  }

  // Preload when in viewport
  useEffect(() => {
    if (isInViewport && !shouldPreload) {
      setShouldPreload(true)
    }
  }, [isInViewport, shouldPreload])

  // Lazy load video when active and should preload
  useEffect(() => {
    if (isActive && shouldPreload && mediaType === 'video' && !hasLoadedVideo) {
      // Add a small delay to prevent loading during rapid scrolling
      const timer = setTimeout(() => {
        setHasLoadedVideo(true)
      }, 100) // Reduced delay for better UX
      return () => clearTimeout(timer)
    }
  }, [isActive, shouldPreload, mediaType, hasLoadedVideo])

  useEffect(() => {
    if (mediaType === 'image') {
      return
    }

    const video = videoRef.current
    if (!video || !hasLoadedVideo) return

    // Reset state when video source changes
    setProgress(0)
    setIsPlaying(false)
    setShowThumbnail(true)

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    const handleLoadedData = () => {
      setIsLoading(false)
      // Only autoplay if this is the active video
      if (isActive) {
        video.play().catch(() => {
          // Failed to autoplay, show play button
          setShowThumbnail(true)
        })
      }
    }

    const handleWaiting = () => setIsLoading(true)
    const handlePlaying = () => {
      setIsLoading(false)
      setIsPlaying(true)
      setShowThumbnail(false)
    }

    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)

    // Only load if we should load the video
    if (hasLoadedVideo) {
      setIsLoading(true)
      video.load()
    }

    return () => {
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
    }
  }, [videoSrc, mediaType, hasLoadedVideo, isActive])

  // Viewport detection
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      { 
        threshold: 0.1, // Start loading when 10% visible
        rootMargin: '50px' // Preload slightly before entering viewport
      }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Spacebar control (only when in viewport and for videos)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isInViewport && mediaType === 'video') {
        e.preventDefault()
        handlePlayClick()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handlePlayClick, isInViewport, mediaType])

  // Render image-only showcase
  if (mediaType === 'image' && imageSrc) {
    return (
      <div
        ref={containerRef}
        className={`hover:border-signoz_accent-300/50 group relative overflow-hidden rounded-lg bg-signoz_ink-300/30 transition-all duration-300 ${className}`}
      >
        <div className="relative aspect-video w-full">
          <Image
            src={imageSrc}
            alt={`${title} showcase`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    )
  }

  // Render video showcase
  return (
    <div
      ref={containerRef}
      className={`hover:border-signoz_accent-300/50 group relative overflow-hidden rounded-lg  bg-signoz_ink-300/30 transition-all duration-300 ${className}`}
    >
      <div className="relative aspect-video w-full">
        {/* Thumbnail Image */}
        {showThumbnail && thumbnailSrc && (
          <div className="absolute inset-0 z-10">
            <Image
              src={thumbnailSrc}
              alt={`${title} showcase thumbnail`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={false}
              loading="lazy"
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

        {/* Video Element - Only render if we should load it */}
        {videoSrc && hasLoadedVideo && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload={shouldPreload ? "metadata" : "none"}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-label={`${title} showcase video`}
          >
            <source src={videoSrc} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Loading Indicator */}
        {isLoading && hasLoadedVideo && mediaType === 'video' && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
            <div className="rounded-lg bg-signoz_ink-300/80 p-4 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-signoz_vanilla-100" />
            </div>
          </div>
        )}

        {/* Video Controls Overlay (when video is playing) */}
        {!showThumbnail && mediaType === 'video' && (
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

        {/* Progress Bar (only for videos) */}
        {mediaType === 'video' && (
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
        )}
      </div>
    </div>
  )
}
