'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { CONTACT_INFO, NAV_ITEMS } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function Footer() {
  const t = useTranslations()
  const locale = useLocale() as 'ro' | 'ru'

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.435-3.396-1.17-.949-.734-1.493-1.716-1.493-2.818 0-1.102.544-2.084 1.493-2.818.948-.735 2.099-1.17 3.396-1.17s2.448.435 3.396 1.17c.949.734 1.493 1.716 1.493 2.818 0 1.102-.544 2.084-1.493 2.818-.948.735-2.099 1.17-3.396 1.17z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ]

  const quickLinks = NAV_ITEMS.filter((item: any) => !item.children).slice(0, 6)

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FF</span>
              </div>
              <span className="text-2xl font-bold">Fitness Flacăra</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {locale === 'ro' 
                ? 'Cea mai modernă sală de fitness din Moldova. Transformă-ți viața cu echipamente de ultimă generație și antrenori profesioniști.'
                : 'Самый современный фитнес-центр в Молдове. Преобразуй свою жизнь с современным оборудованием и профессиональными тренерами.'
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-400" />
                <span className="text-sm text-gray-300">{CONTACT_INFO.address[locale]}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-400" />
                <span className="text-sm text-gray-300">{CONTACT_INFO.hours[locale]}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            
            {/* Quick Contact Buttons */}
            <div className="space-y-3 mb-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start bg-green-600 hover:bg-green-700 border-green-600 text-white"
                asChild
              >
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^+\d]/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                asChild
              >
                <a href={`tel:${CONTACT_INFO.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {t('footer.call_now', 'Call Now')}
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t('footer.rights')}
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white text-sm transition-colors">
              {locale === 'ro' ? 'Confidențialitate' : 'Конфиденциальность'}
            </Link>
            <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white text-sm transition-colors">
              {locale === 'ro' ? 'Termeni' : 'Условия'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}