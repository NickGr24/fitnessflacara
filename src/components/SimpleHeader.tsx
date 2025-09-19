'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown, Users, Phone } from 'lucide-react';

export default function SimpleHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<'ro' | 'ru'>('ro');
  
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Static navigation items
  const navItems = [
    { key: 'home', href: '/', label: currentLang === 'ro' ? 'Acasă' : 'Главная' },
    { key: 'despre', href: '/despre', label: currentLang === 'ro' ? 'Despre noi' : 'О нас' },
    { key: 'antrenori', href: '/antrenori', label: currentLang === 'ro' ? 'Antrenori' : 'Тренеры' },
    { key: 'contact', href: '/contact', label: currentLang === 'ro' ? 'Contact' : 'Контакты' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'ro' ? 'ru' : 'ro');
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/logo.png"
                  alt="Fitness Flacăra Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <motion.h1 
                  className="text-2xl font-bold text-white"
                  whileHover={{ 
                    textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
                  }}
                >
                  Fitness Flacăra
                </motion.h1>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-[#00b4ff]' 
                      : 'text-white hover:text-[#00b4ff]'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00b4ff] to-[#ffd700]"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLang.toUpperCase()}
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:from-[#ffd700] hover:to-[#00b4ff] shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {currentLang === 'ro' ? 'Înscrie-te' : 'Записаться'}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-[#00b4ff] bg-white/5 rounded-lg' 
                        : 'text-white hover:text-[#00b4ff] hover:bg-white/5 hover:rounded-lg'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 border-t border-white/10 space-y-4">
                <motion.button
                  onClick={toggleLanguage}
                  className="w-full px-4 py-2 text-sm text-white border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLang === 'ro' ? 'Русский' : 'Română'}
                </motion.button>
                
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:from-[#ffd700] hover:to-[#00b4ff]"
                  >
                    {currentLang === 'ro' ? 'Înscrie-te Acum' : 'Записаться Сейчас'}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}