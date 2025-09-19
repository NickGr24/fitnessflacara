'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollRevealContainer } from '@/lib/useScrollReveal';

// Gallery images data
const galleryImages = [
  {
    src: '/images/optimized/gym.webp',
    alt: 'Sala de antrenament - echipamente moderne',
    title: 'Sala de Antrenament',
    category: 'Fitness'
  },
  {
    src: '/images/optimized/gym2.webp',
    alt: 'Zona de antrenament cu greutăți',
    title: 'Zone de Antrenament',
    category: 'Fitness'
  },
  {
    src: '/images/optimized/cardio.webp',
    alt: 'Zona cardio cu echipamente moderne',
    title: 'Zona Cardio',
    category: 'Cardio'
  },
  {
    src: '/images/optimized/group.webp',
    alt: 'Antrenamente în grup',
    title: 'Antrenamente în Grup',
    category: 'Group Classes'
  },
  {
    src: '/pool.jpg',
    alt: 'Bazin pentru înot și relaxare',
    title: 'Bazin SPA',
    category: 'SPA'
  },
  {
    src: '/images/optimized/cardio2.webp',
    alt: 'Echipamente cardio avansate',
    title: 'Cardio Premium',
    category: 'Cardio'
  },
  {
    src: '/images/optimized/gym4.webp',
    alt: 'Sala cu echipamente profesionale',
    title: 'Echipamente Pro',
    category: 'Fitness'
  },
  {
    src: '/images/optimized/tabletennis3.webp',
    alt: 'Tenis de masă - activități recreative',
    title: 'Tenis de Masă',
    category: 'Recreation'
  },
  {
    src: '/images/optimized/wallclimbing.webp',
    alt: 'Zid de cățărare pentru aventură',
    title: 'Zid de Cățărare',
    category: 'Adventure'
  }
];

export default function PrelastGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setupContainer } = useScrollRevealContainer(undefined, {
    threshold: 0.2,
    rootMargin: '0px 0px -12% 0px',
    staggerDelay: 80,
    once: false // Allow re-triggering
  });

  useEffect(() => {
    if (containerRef.current) {
      setupContainer(containerRef.current);
    }
  }, [setupContainer]);

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
            {" "}care te vor ajuta să îți atingi toate obiectivele de fitness și wellness
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              data-reveal={index % 2 === 0 ? "up" : "zoom"}
              className="gallery-item group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-lg border border-white/10 hover:border-[#00b4ff]/30 shadow-2xl transition-all duration-500"
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.4 }
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Gradient overlay for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Premium glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#00b4ff]/10 via-transparent to-[#ffd700]/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #00b4ff10, transparent, #ffd70010)",
                      "linear-gradient(135deg, #00b4ff10, transparent, #ffd70010)",
                      "linear-gradient(45deg, #00b4ff10, transparent, #ffd70010)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 will-change-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>

              {/* Content overlay */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                initial={{ y: "100%" }}
              >
                <motion.div
                  className="bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.span 
                    className="inline-block px-3 py-1 bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black text-xs font-bold rounded-full mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {image.category}
                  </motion.span>
                  <motion.h3 
                    className="text-white font-suisse font-semibold text-lg"
                    whileHover={{ 
                      scale: 1.05,
                      textShadow: "0 0 20px rgba(0, 180, 255, 0.6)"
                    }}
                  >
                    {image.title}
                  </motion.h3>
                </motion.div>
              </motion.div>

              {/* Premium border animation */}
              <motion.div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(45deg, #00b4ff40, transparent, #ffd70040)",
                  padding: "1px"
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}