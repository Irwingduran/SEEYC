"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipForward,
  SkipBack,
  PictureInPicture2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface VideoPlayerProps {
  lesson: {
    id: number
    title: string
    duration: string
  }
  src?: string
  onComplete: () => void
  onQuizTrigger: () => void
  onTimeUpdate: (time: number) => void
  isFullscreen: boolean
  onFullscreenChange: (fullscreen: boolean) => void
}

export function VideoPlayer({
  lesson,
  src,
  onComplete,
  onQuizTrigger,
  onTimeUpdate,
  isFullscreen,
  onFullscreenChange,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [quality, setQuality] = useState("1080p")
  const [showControls, setShowControls] = useState(true)
  const [showSubtitles, setShowSubtitles] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      onTimeUpdate(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      onComplete()
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [onComplete, onTimeUpdate])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return

      switch (e.key) {
        case " ":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowLeft":
          seek(currentTime - 10)
          break
        case "ArrowRight":
          seek(currentTime + 10)
          break
        case "f":
          toggleFullscreen()
          break
        case "m":
          toggleMute()
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [currentTime])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const seek = (time: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(time, duration))
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const changeVolume = (newVolume: number[]) => {
    const video = videoRef.current
    if (!video) return

    const vol = newVolume[0]
    video.volume = vol
    setVolume(vol)
    setIsMuted(vol === 0)
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      onFullscreenChange(true)
    } else {
      document.exitFullscreen()
      onFullscreenChange(false)
    }
  }

  const enterPictureInPicture = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      await video.requestPictureInPicture()
    } catch (error) {
      console.error("Picture-in-picture failed:", error)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={src || "/sample-electrical-lesson.mp4"}
        poster="/electrical-lesson-thumbnail.jpg"
        onClick={togglePlay}
      />

      {/* Subtitles Overlay */}
      {showSubtitles && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded">
          En esta lección aprenderemos sobre los fundamentos de las instalaciones eléctricas...
        </div>
      )}

      {/* Quiz Trigger Point */}
      {currentTime > 300 && currentTime < 305 && (
        <div className="absolute top-4 right-4">
          <Button onClick={onQuizTrigger} className="bg-orange-500 hover:bg-orange-600 text-white animate-pulse">
            ¡Quiz Disponible!
          </Button>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <div className="absolute bottom-16 left-4 right-4">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => seek(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-white text-sm mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => seek(currentTime - 10)}
              className="text-white hover:bg-white/20"
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => seek(currentTime + 10)}
              className="text-white hover:bg-white/20"
            >
              <SkipForward className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-2 ml-4">
              <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <Slider value={[isMuted ? 0 : volume]} max={1} step={0.1} onValueChange={changeVolume} className="w-20" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Playback Speed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  {playbackRate}x
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <DropdownMenuItem
                    key={rate}
                    onClick={() => changePlaybackRate(rate)}
                    className={playbackRate === rate ? "bg-purple-100" : ""}
                  >
                    {rate}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quality */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowSubtitles(!showSubtitles)}>
                  {showSubtitles ? "Ocultar" : "Mostrar"} Subtítulos
                </DropdownMenuItem>
                {["1080p", "720p", "480p", "360p"].map((q) => (
                  <DropdownMenuItem
                    key={q}
                    onClick={() => setQuality(q)}
                    className={quality === q ? "bg-purple-100" : ""}
                  >
                    {q}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" onClick={enterPictureInPicture} className="text-white hover:bg-white/20">
              <PictureInPicture2 className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
