'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'main'
  variant?: 'default' | 'accent' | 'dark' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  animationDelay?: number
  containerClassName?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    as: Component = 'section',
    variant = 'default',
    size = 'lg',
    animate = true,
    animationDelay = 0,
    className,
    containerClassName,
    children,
    ...props 
  }, ref) => {
    const sectionVariants = {
      default: 'bg-white',
      accent: 'bg-gray-50',
      dark: 'bg-gray-900 text-white',
      gradient: 'bg-gradient-to-br from-red-50 to-orange-50'
    }

    const sizeVariants = {
      sm: 'py-8 sm:py-12',
      md: 'py-12 sm:py-16',
      lg: 'py-16 sm:py-20',
      xl: 'py-20 sm:py-32'
    }

    const containerSizeVariants = {
      sm: 'max-w-4xl',
      md: 'max-w-6xl', 
      lg: 'max-w-7xl',
      xl: 'max-w-7xl'
    }

    const MotionComponent = animate ? motion[Component as keyof typeof motion] : Component

    const motionProps = animate ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-100px' },
      transition: { 
        duration: 0.6,
        delay: animationDelay,
        ease: [0.22, 1, 0.36, 1]
      }
    } : {}

    return (
      <MotionComponent
        ref={ref}
        className={cn(
          sectionVariants[variant],
          sizeVariants[size],
          className
        )}
        {...motionProps}
        {...props}
      >
        <div className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          containerSizeVariants[size],
          containerClassName
        )}>
          {children}
        </div>
      </MotionComponent>
    )
  }
)

Section.displayName = 'Section'

// Specific section components for common use cases
export const HeroSection = forwardRef<HTMLElement, SectionProps>(
  ({ className, size = 'xl', ...props }, ref) => (
    <Section 
      ref={ref}
      className={cn('min-h-screen flex items-center', className)}
      size={size}
      {...props}
    />
  )
)

export const ContentSection = forwardRef<HTMLElement, SectionProps>(
  ({ variant = 'default', ...props }, ref) => (
    <Section ref={ref} variant={variant} {...props} />
  )
)

export const FeatureSection = forwardRef<HTMLElement, SectionProps>(
  ({ variant = 'accent', ...props }, ref) => (
    <Section ref={ref} variant={variant} {...props} />
  )
)

HeroSection.displayName = 'HeroSection'
ContentSection.displayName = 'ContentSection'
FeatureSection.displayName = 'FeatureSection'

export { Section }