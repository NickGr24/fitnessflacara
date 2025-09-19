'use client';

import { useEffect, useRef, Suspense, useState } from 'react';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const images = [
  { src: '/images/optimized/gym.webp', title: 'Sala de Antrenament' },  
  { src: '/images/optimized/sauna.webp', title: 'Sauna' },
  { src: '/images/optimized/cardio2.webp', title: 'Cardio Premium' },
  { src: '/images/optimized/group.webp', title: 'Antrenamente în Grup' },
  { src: '/images/optimized/hamam.webp', title: 'Hamam' },
  { src: '/images/optimized/pool.jpeg', title: 'Bazin' },
  { src: '/images/optimized/jacuzzi.webp', title: 'Jacuzzi' },
  { src: '/images/optimized/crossfit.jpeg', title: 'CrossFit Arena' }
];

function Gallery3DContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Determine mobile on client only
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = container.closest('section');
          if (!section) return;
          
          const rect = section.getBoundingClientRect();
          const sectionHeight = section.offsetHeight;
          const windowHeight = window.innerHeight;
          
          // Простой расчет прогресса скролла
          const scrollProgress = Math.max(0, Math.min(1, 
            (windowHeight - rect.top) / (sectionHeight + windowHeight)
          ));
          
          const items = container.querySelectorAll('.gallery-item') as NodeListOf<HTMLElement>;
          const isMobile = window.innerWidth < 768;
          
          items.forEach((item, index) => {
            // Адаптивные параметры для мобильных
            const delay = index * (isMobile ? 0.12 : 0.08); // Больше задержка на мобильных
            const duration = isMobile ? 0.5 : 0.6; // Быстрее на мобильных
            
            const itemProgress = Math.max(0, Math.min(1, 
              (scrollProgress - delay) / duration
            ));
            
            if (itemProgress > 0) {
              // Адаптивные значения для мобильных
              const translateY = (1 - itemProgress) * (isMobile ? 400 : 800) - (isMobile ? 100 : 200);
              const translateZ = itemProgress * (isMobile ? 150 : 300);
              const scale = (isMobile ? 0.6 : 0.5) + itemProgress * (isMobile ? 0.5 : 0.7);
              const rotateX = (1 - itemProgress) * (isMobile ? -15 : -30);
              const opacity = itemProgress < 0.9 ? 1 : (1 - itemProgress) * 10;
              
              item.style.transform = `
                translate3d(0px, ${translateY}px, ${translateZ}px) 
                rotateX(${rotateX}deg) 
                scale(${scale})
              `;
              item.style.opacity = opacity.toString();
            } else {
              // До начала анимации - адаптивно
              const initialY = isMobile ? 300 : 600;
              const initialZ = isMobile ? -50 : -100;
              const initialRotate = isMobile ? -15 : -30;
              const initialScale = isMobile ? 0.6 : 0.5;
              
              item.style.transform = `translate3d(0px, ${initialY}px, ${initialZ}px) rotateX(${initialRotate}deg) scale(${initialScale})`;
              item.style.opacity = '0';
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[400vh] md:h-[500vh] bg-gradient-to-b from-black via-gray-900 to-black">
      <div 
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: isMobile ? '800px' : '1000px' }}
      >
        <div 
          ref={containerRef}
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {images.map((image, index) => {
            // Адаптивное позиционирование
            const desktopPositions = [-400, 200, -200, 350, -100, 450, -350, 100];
            const mobilePositions = [-150, 80, -100, 120, -50, 160, -120, 40];
            
            const positions = isMobile ? mobilePositions : desktopPositions;
            const xPos = positions[index] || 0;
            
            return (
              <div
                key={index}
                className="gallery-item absolute rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl bg-white
                          w-64 h-40 sm:w-72 sm:h-48 md:w-80 md:h-56"
                style={{
                  left: `calc(50% + ${xPos}px)`,
                  top: '50%',
                  marginLeft: isMobile ? '-128px' : '-160px', // -w/2
                  marginTop: isMobile ? '-80px' : '-112px',   // -h/2
                  transform: `translate3d(0px, ${isMobile ? 300 : 600}px, ${isMobile ? -50 : -100}px) rotateX(${isMobile ? -15 : -30}deg) scale(${isMobile ? 0.6 : 0.5})`,
                  opacity: 0,
                  transformOrigin: 'center center'
                }}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                  loading={index < 4 ? 'eager' : 'lazy'}
                  priority={index < 2}
                  quality={85}
                />
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4">
                  <h3 className="text-white font-bold text-sm md:text-lg drop-shadow-lg">
                    {image.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Gallery3D() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Gallery3DContent />
      </Suspense>
    </ErrorBoundary>
  );
}