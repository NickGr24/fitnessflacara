'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  backgroundVideo?: {
    sources: {
      webm?: string
      mp4: string
    }
    poster?: string
  }
  backgroundImage?: string
  headline?: string
  bullets?: string[]
  ctaText?: string
  ctaHref?: string
  onCtaClick?: () => void
  className?: string
}

export function HeroSection({
  backgroundVideo,
  backgroundImage,
  headline,
  bullets = [],
  ctaText,
  ctaHref,
  onCtaClick,
  className
}: HeroSectionProps) {
  const t = useTranslations('home.hero')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const defaultHeadline = headline || t('headline')
  const defaultBullets = bullets.length > 0 ? bullets : (t.raw('bullets') as string[])
  const defaultCtaText = ctaText || t('cta')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsVideoLoaded(true)
    }

    const handlePlay = () => setIsVideoPlaying(true)
    const handlePause = () => setIsVideoPlaying(false)

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    // Auto-play with error handling
    const tryAutoPlay = async () => {
      try {
        await video.play()
      } catch (error) {
        console.log('Autoplay failed:', error)
        setIsVideoPlaying(false)
      }
    }

    if (video.readyState >= 3) {
      setIsVideoLoaded(true)
      tryAutoPlay()
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return

    if (isVideoPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick()
    } else if (ctaHref) {
      window.location.href = ctaHref
    }
  }

  return (
    <section className={cn("relative min-h-screen flex items-center justify-center overflow-hidden", className)}>
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        {backgroundVideo ? (
          <>
            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                isVideoLoaded ? "opacity-100" : "opacity-0"
              )}
              autoPlay
              muted
              loop
              playsInline
              poster={backgroundVideo.poster}
            >
              {backgroundVideo.sources.webm && (
                <source src={backgroundVideo.sources.webm} type="video/webm" />
              )}
              <source src={backgroundVideo.sources.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Fallback background image */}
            {(backgroundVideo.poster || backgroundImage) && (
              <div 
                className={cn(
                  "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000",
                  isVideoLoaded ? "opacity-0" : "opacity-100"
                )}
                style={{
                  backgroundImage: `url(${backgroundVideo.poster || backgroundImage})`
                }}
              />
            )}

            {/* Video Controls */}
            {isVideoLoaded && (
              <button
                onClick={toggleVideo}
                className="absolute bottom-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
              >
                {isVideoPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
            )}
          </>
        ) : backgroundImage ? (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-900 via-red-800 to-orange-900" />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {defaultHeadline}
          </h1>

          {defaultBullets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <ul className="space-y-3">
                {defaultBullets.map((bullet, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-center text-lg text-gray-200"
                  >
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0" />
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={handleCtaClick}
            >
              {defaultCtaText}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}