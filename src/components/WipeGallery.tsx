'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { initWipeReveal, WipeRevealManager } from '@/lib/wipeReveal';

// Gallery images with wipe directions
const galleryImages = [
  {
    src: '/images/optimized/gym.webp',
    alt: 'Sala de antrenament - echipamente moderne',
    title: 'Sala de Antrenament',
    category: 'Fitness',
    wipeDirection: 'left' as const
  },
  {
    src: '/images/optimized/gym2.webp',
    alt: 'Zona de antrenament cu greutăți',
    title: 'Zone de Antrenament',
    category: 'Fitness',
    wipeDirection: 'right' as const
  },
  {
    src: '/images/optimized/cardio.webp',
    alt: 'Zona cardio cu echipamente moderne',
    title: 'Zona Cardio',
    category: 'Cardio',
    wipeDirection: 'up' as const
  },
  {
    src: '/images/optimized/group.webp',
    alt: 'Antrenamente în grup',
    title: 'Antrenamente în Grup',
    category: 'Group Classes',
    wipeDirection: 'down' as const
  },
  {
    src: '/pool.jpg',
    alt: 'Bazin pentru înot și relaxare',
    title: 'Bazin SPA',
    category: 'SPA',
    wipeDirection: 'left' as const
  },
  {
    src: '/images/optimized/cardio2.webp',
    alt: 'Echipamente cardio avansate',
    title: 'Cardio Premium',
    category: 'Cardio',
    wipeDirection: 'right' as const
  },
  {
    src: '/images/optimized/gym4.webp',
    alt: 'Sala cu echipamente profesionale',
    title: 'Echipamente Pro',
    category: 'Fitness',
    wipeDirection: 'up' as const
  },
  {
    src: '/images/optimized/tabletennis3.webp',
    alt: 'Tenis de masă - activități recreative',
    title: 'Tenis de Masă',
    category: 'Recreation',
    wipeDirection: 'down' as const
  },
  {
    src: '/images/optimized/wallclimbing.webp',
    alt: 'Zid de cățărare pentru aventură',
    title: 'Zid de Cățărare',
    category: 'Adventure',
    wipeDirection: 'left' as const
  }
];

interface RevealImageProps {
  src: string;
  alt: string;
  title: string;
  category: string;
  wipeDirection: 'left' | 'right' | 'up' | 'down';
  loading?: 'lazy' | 'eager';
}

function RevealImage({ src, alt, title, category, wipeDirection, loading = 'lazy' }: RevealImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.figure
      className={`reveal group cursor-pointer ${imageLoaded ? '' : 'loading'}`}
      data-wipe={wipeDirection}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          loading={loading}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          quality={85}
        />
        
        {/* Wipe Mask */}
        <span className="reveal__mask" aria-hidden="true" />
        
        {/* Loading shimmer overlay */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] bg-[length:200%_100%] animate-[shimmer_2s_infinite] z-20" />
        )}

        {/* Content overlay */}
        <motion.figcaption
          className="absolute bottom-0 left-0 right-0 p-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <motion.span 
              className="inline-block px-2 py-1 bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black text-xs font-bold rounded-full mb-1"
              whileHover={{ scale: 1.05 }}
            >
              {category}
            </motion.span>
            <motion.h3 
              className="text-white font-semibold text-sm"
              whileHover={{ 
                color: "#00b4ff",
                textShadow: "0 0 10px rgba(0, 180, 255, 0.6)"
              }}
            >
              {title}
            </motion.h3>
          </div>
        </motion.figcaption>

        {/* Premium glow effect on hover */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: "radial-gradient(circle at center, rgba(0, 180, 255, 0.1) 0%, transparent 70%)"
          }}
        />
      </div>
    </motion.figure>
  );
}

export default function WipeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<WipeRevealManager | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Initialize wipe reveal with custom options
      managerRef.current = initWipeReveal(containerRef.current, {
        threshold: 0.25,
        rootMargin: '0px 0px -12% 0px',
        staggerDelay: 100,
        useClipPath: false // Use transform-based animations for better performance
      });
    }

    return () => {
      managerRef.current?.disconnect();
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
      {/* Premium floating elements */}
      <motion.div 
        className="absolute top-20 right-20 w-40 h-40 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #ffd700, transparent)"
        }}
        animate={{ 
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Facilitățile{" "}
            <motion.span 
              className="bg-gradient-to-r from-[#00b4ff] via-[#ffd700] to-[#00b4ff] bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Noastre
            </motion.span>
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#00b4ff] to-[#ffd700] mx-auto mb-8 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Descoperă{" "}
            <motion.span 
              className="text-[#00b4ff] font-semibold"
              animate={{ textShadow: ["0 0 0px #00b4ff", "0 0 10px #00b4ff", "0 0 0px #00b4ff"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              facilitățile premium
            </motion.span>
            {" "}cu animații spectaculoase care se activează la fiecare scroll
          </motion.p>
        </motion.div>

        {/* Gallery Grid with Wipe Reveals */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {galleryImages.map((image, index) => (
            <RevealImage
              key={index}
              src={image.src}
              alt={image.alt}
              title={image.title}
              category={image.category}
              wipeDirection={image.wipeDirection}
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        {/* Instructions note */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            Scroll up și down pentru a vedea efectele de mask-reveal în acțiune! 🎭
          </p>
        </motion.div>
      </div>
    </section>
  );
}