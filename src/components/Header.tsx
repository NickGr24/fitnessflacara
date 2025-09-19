'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown, Users, Phone } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const params = useParams();
  const pathname = usePathname();
  const paramLocale = (params as any)?.locale as string | undefined;
  const match = pathname.match(/^\/(ro|ru)(\/|$)/);
  const locale = paramLocale || (match ? match[1] : 'ro');
  const { scrollY } = useScroll();
  
  // Get the path without locale for language switching
  const pathWithoutLocale = match ? pathname.slice(locale.length + 1) || '/' : pathname || '/';

  // Handle scroll effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navigation = [
    { name: 'Acasă', href: `/${locale}`, nameRu: 'Главная' },
    { name: 'Despre', href: `/${locale}/despre`, nameRu: 'О нас' },
    { name: 'Antrenori', href: `/${locale}/antrenori`, nameRu: 'Тренеры' },
    { name: 'Contact', href: `/${locale}/contact`, nameRu: 'Контакты' },
  ];


  return (
    <>
      <motion.header 
        className="fixed w-full z-50 transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.nav 
          className={`transition-all duration-500 ${
            isScrolled 
              ? 'bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/10 shadow-2xl shadow-[#00b4ff]/5' 
              : 'bg-transparent'
          }`}
          layout
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/${locale}`} className="flex items-center group">
                  <motion.div
                    className="relative w-32 h-20 rounded-xl shadow-lg group-hover:shadow-[#00b4ff]/30"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/logo.png"
                      alt="Fitness Flacăra Logo"
                      width={128}
                      height={80}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:block">
                <div className="ml-10 flex items-center space-x-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="group relative px-6 py-3 rounded-xl text-base font-suisse font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/5"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <motion.span 
                          className="relative z-10"
                          whileHover={{ scale: 1.05 }}
                        >
                          {locale === 'ru' ? item.nameRu : item.name}
                        </motion.span>
                        
                        {/* Hover effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00b4ff]/20 to-[#ffd700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Language Switcher & CTA */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* Language Switcher */}
                <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
                  <Link
                    href={`/ro${pathWithoutLocale}`}
                    className={`px-4 py-2 text-sm font-suisse font-semibold rounded-lg transition-all duration-300 ${
                      locale === 'ro' 
                        ? 'bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black shadow-lg' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    RO
                  </Link>
                  <Link
                    href={`/ru${pathWithoutLocale}`}
                    className={`px-4 py-2 text-sm font-suisse font-semibold rounded-lg transition-all duration-300 ${
                      locale === 'ru' 
                        ? 'bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black shadow-lg' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    RU
                  </Link>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${locale}/contact`}
                    className="group relative bg-gradient-to-r from-[#00b4ff] to-[#0080cc] hover:from-[#0080cc] hover:to-[#00b4ff] text-white px-8 py-3 rounded-xl text-base font-suisse font-semibold transition-all duration-500 shadow-2xl shadow-[#00b4ff]/25 border border-[#00b4ff]/30 flex items-center"
                  >
                    <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    {locale === 'ru' ? 'Начать' : 'Începe acum'}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#ffb700] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative inline-flex items-center justify-center p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/10"
              >
                <div className="px-4 pt-4 pb-6 space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center px-4 py-4 text-lg font-suisse font-medium rounded-xl transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{locale === 'ru' ? item.nameRu : item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Language Switcher */}
                  <motion.div 
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Link
                        href={`/ro${pathWithoutLocale}`}
                        className={`px-6 py-3 text-base font-suisse font-semibold rounded-xl transition-all duration-300 ${
                          locale === 'ro' 
                            ? 'bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black shadow-lg' 
                            : 'text-gray-400 hover:text-white bg-white/5 border border-white/10'
                        }`}
                      >
                        Română
                      </Link>
                      <Link
                        href={`/ru${pathWithoutLocale}`}
                        className={`px-6 py-3 text-base font-suisse font-semibold rounded-xl transition-all duration-300 ${
                          locale === 'ru' 
                            ? 'bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black shadow-lg' 
                            : 'text-gray-400 hover:text-white bg-white/5 border border-white/10'
                        }`}
                      >
                        Русский
                      </Link>
                    </div>
                  </motion.div>

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href={`/${locale}/contact`}
                      className="group w-full bg-gradient-to-r from-[#00b4ff] to-[#ffd700] hover:from-[#ffd700] hover:to-[#00b4ff] text-black px-6 py-4 rounded-xl text-lg font-suisse font-semibold transition-all duration-500 shadow-2xl flex items-center justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users className="w-5 h-5 mr-3 group-hover:bounce" />
                      {locale === 'ru' ? 'Начать сейчас' : 'Începe acum'}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20" />
    </>
  );
}