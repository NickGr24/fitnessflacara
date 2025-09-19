'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -12% 0px',
    staggerDelay = 100,
    once = false
  } = options;

  const elementsRef = useRef<Map<Element, number>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const prefersReducedMotion = useRef<boolean>(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const observeElement = useCallback((element: Element, index: number = 0) => {
    if (!element) return;

    // Store element with its index for stagger effect
    elementsRef.current.set(element, index);

    // If reduced motion is preferred, show immediately
    if (prefersReducedMotion.current) {
      element.classList.add('is-inview');
      return;
    }

    // Initialize observer if it doesn't exist
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target;
            const elementIndex = elementsRef.current.get(element) || 0;

            if (entry.isIntersecting) {
              // Add class with stagger delay
              setTimeout(() => {
                element.classList.add('is-inview');
              }, elementIndex * staggerDelay);
            } else if (!once) {
              // Remove class to allow re-triggering
              element.classList.remove('is-inview');
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );
    }

    observerRef.current.observe(element);
  }, [threshold, rootMargin, staggerDelay, once]);

  const unobserveElement = useCallback((element: Element) => {
    if (!element || !observerRef.current) return;
    
    observerRef.current.unobserve(element);
    elementsRef.current.delete(element);
  }, []);

  // Cleanup observer on unmount
  useEffect(() => {
    const currentObserver = observerRef.current;
    const currentElements = elementsRef.current;
    
    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
      currentElements.clear();
    };
  }, []);

  return { observeElement, unobserveElement };
}

// Hook for observing multiple elements in a container
export function useScrollRevealContainer(containerSelector?: string, options: UseScrollRevealOptions = {}) {
  const { observeElement, unobserveElement } = useScrollReveal(options);
  const containerRef = useRef<HTMLElement | null>(null);

  const observeChildren = useCallback((container: HTMLElement, childSelector: string = '[data-reveal]') => {
    const elements = container.querySelectorAll(childSelector);
    elements.forEach((element, index) => {
      observeElement(element, index);
    });
  }, [observeElement]);

  const setupContainer = useCallback((container: HTMLElement | null) => {
    if (container) {
      containerRef.current = container;
      observeChildren(container);
    }
  }, [observeChildren]);

  // Auto setup if container selector is provided
  useEffect(() => {
    if (containerSelector) {
      const container = document.querySelector(containerSelector) as HTMLElement;
      if (container) {
        setupContainer(container);
      }
    }
  }, [containerSelector, setupContainer]);

  return { setupContainer, observeChildren, observeElement, unobserveElement };
}