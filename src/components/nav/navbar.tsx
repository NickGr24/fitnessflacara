'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActivePath = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/'
    return currentPath === href || currentPath.startsWith(href + '/')
  }

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    return `/${newLocale}${pathWithoutLocale}`
  }

  const Logo = () => (
    <Link href={`/${locale}`} className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">FF</span>
      </div>
      <span className="text-xl font-bold text-white">Fitness Flacăra</span>
    </Link>
  )

  const LanguageSwitcher = () => (
    <div className="flex items-center space-x-1">
      <Link
        href={switchLocale('ro')}
        className={cn(
          "px-2 py-1 text-sm font-medium rounded transition-colors",
          locale === 'ro' 
            ? "bg-red-500 text-white" 
            : "text-gray-300 hover:text-white"
        )}
      >
        RO
      </Link>
      <span className="text-gray-400">|</span>
      <Link
        href={switchLocale('ru')}
        className={cn(
          "px-2 py-1 text-sm font-medium rounded transition-colors",
          locale === 'ru' 
            ? "bg-red-500 text-white" 
            : "text-gray-300 hover:text-white"
        )}
      >
        RU
      </Link>
    </div>
  )

  const DesktopNavigation = () => (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {NAV_ITEMS.map((item) => {
          if (item.children) {
            return (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuTrigger 
                  className={cn(
                    "bg-transparent text-white hover:text-red-400 data-[state=open]:text-red-400",
                    isActivePath(item.href) && "text-red-400"
                  )}
                >
                  {t(item.key)}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    {item.children.map((child) => (
                      <NavigationMenuLink key={child.key} asChild>
                        <Link
                          href={`/${locale}${child.href}`}
                          className={cn(
                            "block select-none rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            isActivePath(child.href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {t(child.key)}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={item.key}>
              <Link
                href={`/${locale}${item.href}`}
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-red-400 focus:text-red-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActivePath(item.href) ? "text-red-400" : "text-white"
                )}
              >
                {t(item.key)}
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )

  const MobileNavigation = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="lg:hidden text-white hover:text-red-400"
          size="sm"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[400px] bg-black border-gray-800">
        <div className="flex flex-col space-y-4 mt-8">
          {NAV_ITEMS.map((item) => (
            <div key={item.key} className="space-y-2">
              <Link
                href={`/${locale}${item.href}`}
                className={cn(
                  "block px-4 py-2 text-lg font-medium rounded-lg transition-colors",
                  isActivePath(item.href) 
                    ? "text-red-400 bg-red-400/10" 
                    : "text-white hover:text-red-400 hover:bg-gray-800"
                )}
                onClick={() => setIsOpen(false)}
              >
                {t(item.key)}
              </Link>
              {item.children && (
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      href={`/${locale}${child.href}`}
                      className={cn(
                        "block px-4 py-2 text-sm rounded-lg transition-colors",
                        isActivePath(child.href) 
                          ? "text-red-400 bg-red-400/10" 
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(child.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="border-t border-gray-800 pt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="flex items-center space-x-6">
            <DesktopNavigation />
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <MobileNavigation />
          </div>
        </div>
      </div>
    </nav>
  )
}