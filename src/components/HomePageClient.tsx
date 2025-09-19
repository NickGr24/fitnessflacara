'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Play, Pause, Dumbbell, Waves, Users, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
const Gallery3D = dynamic(() => import('@/components/Gallery3D'), { ssr: false, loading: () => <div className="h-64" /> });

// Types for the data
interface HomeData {
  hero: {
    headline: string;
    subtitle: string;
    excellence: string;
    cta_primary: string;
    cta_secondary: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    highlight: string;
    services: Array<{
      title: string;
      description: string;
    }>;
  };
  membership: {
    title: string;
    subtitle: string;
    popular: string;
    cta: string;
    plans: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
    info: Array<{
      title: string;
      value: string;
    }>;
  };
  scroll: string;
}

// Typing effect component with premium styling
function TypingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const fullText = text;
  
  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 120);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayedText, fullText]);
  
  return (
    <motion.h1 
      className="text-6xl md:text-8xl font-suisse font-bold mb-8 leading-tight text-center"
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      style={{ fontSize: '80px' }}
    >
      <span className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
        <motion.span 
          className="inline-block"
          animate={{ 
            textShadow: ["0 0 0px #00b4ff", "0 0 10px #00b4ff", "0 0 0px #00b4ff"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {displayedText.slice(0, 7)}
        </motion.span>
        <span className="text-gradient bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">
          {displayedText.slice(7)}
        </span>
        {!isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
            className="border-r-4 border-[#00b4ff] ml-2"
          />
        )}
      </span>
    </motion.h1>
  );
}

// Premium video controls component
function VideoControls({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className="absolute bottom-8 right-8 z-30 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-black/50 text-white p-4 rounded-full transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.div
        animate={{ rotate: isPlaying ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default function HomePageClient({ data }: { data: HomeData }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
      setIsVideoPlaying(false);
    } else {
      video.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - Premium Dark Style */}
      <motion.section 
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Background Video with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yBg, scale }}
        >
          {/* Premium gradient overlay */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(10,10,10,0.5) 50%, rgba(0,0,0,0.8) 100%)"
            }}
          />
          
          {/* Animated mesh gradient overlay */}
          <motion.div 
            className="absolute inset-0 z-[11] opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, #00b4ff 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ffd700 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, #00b4ff 0%, transparent 50%), radial-gradient(circle at 20% 80%, #ffd700 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, #00b4ff 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ffd700 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/images/optimized/gym.webp"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto"
          style={{ opacity }}
        >
          <TypingText text={data.hero.headline} />
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-gray-200 drop-shadow-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <span className="font-light">{data.hero.subtitle}</span>
            <br />
            <motion.span 
              className="text-[#00b4ff] font-semibold"
              animate={{ 
                textShadow: ["0 0 0px #00b4ff", "0 0 8px #00b4ff", "0 0 0px #00b4ff"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {data.hero.excellence}
            </motion.span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <motion.button 
              className="group relative bg-gradient-to-r from-[#00b4ff] to-[#0080cc] hover:from-[#0080cc] hover:to-[#00b4ff] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-500 shadow-2xl shadow-[#00b4ff]/25 border border-[#00b4ff]/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 180, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{data.hero.cta_primary}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#ffb700] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button 
              className="group relative border-2 border-white/30 backdrop-blur-md text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:border-[#00b4ff]"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#00b4ff",
                boxShadow: "0 0 20px rgba(0, 180, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{data.hero.cta_secondary}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00b4ff]/10 to-[#ffd700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
              />
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Premium Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          style={{ opacity }}
        >
          <motion.div
            className="flex flex-col items-center text-white/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mb-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-[#00b4ff] rounded-full mt-2"
              />
            </div>
            <span className="text-xs uppercase tracking-widest font-light">{data.scroll}</span>
          </motion.div>
        </motion.div>
        
        {/* Premium Video Controls */}
        <VideoControls isPlaying={isVideoPlaying} onToggle={toggleVideo} />
      </motion.section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20"
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
              {data.about.title}
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="text-white font-semibold">{data.about.subtitle}</span> {data.about.description}{" "}
              <motion.span 
                className="text-[#00b4ff] font-semibold"
                animate={{ textShadow: ["0 0 0px #00b4ff", "0 0 8px #00b4ff", "0 0 0px #00b4ff"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {data.about.highlight}
              </motion.span>
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Dumbbell, color: "#00b4ff" },
              { icon: Users, color: "#ffd700" },
              { icon: Waves, color: "#00b4ff" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative text-center p-8 bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-[#00b4ff]/30 shadow-2xl hover:shadow-[#00b4ff]/20 transition-all duration-500 group overflow-hidden"
                initial={{ 
                  x: index === 0 ? -100 : index === 2 ? 100 : 0,
                  y: index === 1 ? 100 : 0,
                  opacity: 0
                }}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -20, scale: 1.05 }}
              >
                <motion.div 
                  className="relative w-20 h-20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-8 border"
                  style={{
                    background: `linear-gradient(45deg, ${item.color}20, ${item.color}10)`,
                    borderColor: `${item.color}30`
                  }}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon 
                    className="w-10 h-10"
                    style={{ color: item.color }}
                  />
                </motion.div>
                <motion.h3 className="text-2xl font-suisse font-bold text-white mb-4">
                  {data.about.services[index].title}
                </motion.h3>
                <motion.p className="text-gray-400 leading-relaxed">
                  {data.about.services[index].description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16">
            <motion.h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-8">
              {data.membership.title}{" "}
              <span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">
                {data.membership.subtitle}
              </span>
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.membership.plans.map((plan, index) => {
              const isAnnual = plan.name.includes('Годовой') || plan.name.includes('Anual');
              const isPopular = isAnnual;
              
              return (
                <motion.div
                  key={index}
                  className={`relative p-8 rounded-2xl backdrop-blur-lg border transition-all duration-500 group ${isPopular ? 'scale-105' : ''}`}
                  style={{
                    background: isPopular 
                      ? "linear-gradient(135deg, rgba(0, 180, 255, 0.2), rgba(255, 215, 0, 0.2))" 
                      : "linear-gradient(135deg, rgba(26, 26, 26, 1), rgba(10, 10, 10, 1))",
                    borderColor: isPopular ? "rgba(0, 180, 255, 0.5)" : "rgba(255, 255, 255, 0.2)"
                  }}
                  initial={{ x: index === 0 ? -100 : index === 2 ? 100 : 0, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1, scale: isPopular ? 1.05 : 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: isPopular ? 1.05 : 1.02 }}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {data.membership.popular}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-suisse font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">MDL</span>
                    </div>
                    <p className={`mb-8 ${isPopular ? 'text-[#00b4ff]' : 'text-gray-400'}`}>
                      {plan.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <CheckCircle className="w-5 h-5 text-[#00b4ff] mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                        isPopular 
                          ? 'bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black hover:shadow-lg' 
                          : 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-[#00b4ff]'
                      }`}
                    >
                      {data.membership.cta}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3D Gallery */}
      <Gallery3D />

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-[#00b4ff]/10 via-[#0a0a0a] to-[#ffd700]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <motion.h2 className="text-5xl md:text-6xl font-suisse font-bold text-white mb-6">
              {data.contact.title}{" "}
              <span className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] bg-clip-text text-transparent">
                {data.contact.subtitle}
              </span>
            </motion.h2>
            
            <motion.p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              {data.contact.description}
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black hover:from-[#ffd700] hover:to-[#00b4ff] px-10 py-4 rounded-full text-lg font-semibold transition-all duration-500 shadow-2xl">
                {data.contact.cta_primary}
              </button>
              
              <button className="border-2 border-white/30 backdrop-blur-md text-white hover:bg-white/10 hover:border-[#00b4ff] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500">
                {data.contact.cta_secondary}
              </button>
            </motion.div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 text-white">
            {data.contact.info.map((item, index) => {
              const icons = ["📍", "📞", "🕒"];
              return (
                <motion.div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-[#1a1a1a]/60 to-[#0a0a0a]/60 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-[#00b4ff]/30 transition-all duration-500"
                  initial={{ x: index === 0 ? -100 : index === 2 ? 100 : 0, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="text-4xl mb-4">{icons[index]}</div>
                  <h3 className="font-suisse font-semibold mb-3 text-[#00b4ff]">{item.title}</h3>
                  <p className="text-gray-300 whitespace-pre-line">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}