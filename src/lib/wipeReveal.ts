'use client';

interface WipeRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  useClipPath?: boolean;
}

class WipeRevealManager {
  private observer: IntersectionObserver | null = null;
  private prefersReducedMotion: boolean = false;
  private elements: Map<Element, { parent: Element; index: number }> = new Map();
  private options: Required<WipeRevealOptions>;

  constructor(options: WipeRevealOptions = {}) {
    this.options = {
      threshold: 0.25,
      rootMargin: '0px 0px -12% 0px',
      staggerDelay: 100,
      useClipPath: false,
      ...options
    };

    this.checkReducedMotion();
    this.initObserver();
  }

  private checkReducedMotion(): void {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = mediaQuery.matches;

    mediaQuery.addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
      this.handleReducedMotionChange();
    });
  }

  private handleReducedMotionChange(): void {
    if (this.prefersReducedMotion) {
      // Show all images immediately
      this.elements.forEach((_, element) => {
        element.classList.add('is-inview');
        this.clearStaggerDelay(element);
      });
    }
  }

  private initObserver(): void {
    if (typeof window === 'undefined' || this.observer) return;

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin,
      }
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    if (this.prefersReducedMotion) return;

    // Group entries by parent container for proper staggering
    const parentGroups = new Map<Element, Array<{ element: Element; entry: IntersectionObserverEntry; index: number }>>();

    entries.forEach((entry) => {
      const elementData = this.elements.get(entry.target);
      if (!elementData) return;

      const parent = elementData.parent;
      if (!parentGroups.has(parent)) {
        parentGroups.set(parent, []);
      }

      parentGroups.get(parent)!.push({
        element: entry.target,
        entry,
        index: elementData.index
      });
    });

    // Process each parent group
    parentGroups.forEach((group) => {
      // Sort by index to maintain proper stagger order
      group.sort((a, b) => a.index - b.index);

      group.forEach(({ element, entry, index }) => {
        if (entry.isIntersecting) {
          this.revealElement(element, index);
        } else {
          this.hideElement(element);
        }
      });
    });
  }

  private revealElement(element: Element, index: number): void {
    const delay = index * this.options.staggerDelay;
    
    // Set stagger delay
    this.setStaggerDelay(element, delay);
    
    // Add reveal class
    requestAnimationFrame(() => {
      element.classList.add('is-inview');
    });
  }

  private hideElement(element: Element): void {
    this.clearStaggerDelay(element);
    element.classList.remove('is-inview');
  }

  private setStaggerDelay(element: Element, delay: number): void {
    const htmlElement = element as HTMLElement;
    htmlElement.style.setProperty('--stagger-delay', `${delay}ms`);
    htmlElement.style.transitionDelay = `${delay}ms`;
  }

  private clearStaggerDelay(element: Element): void {
    const htmlElement = element as HTMLElement;
    htmlElement.style.removeProperty('--stagger-delay');
    htmlElement.style.transitionDelay = '0ms';
  }

  public observe(container: Element | Document = document): void {
    if (!this.observer) return;

    const elements = Array.from(container.querySelectorAll('.reveal'));
    
    // Clear existing elements
    this.elements.clear();

    // Group elements by parent for stagger calculation
    const parentGroups = new Map<Element, Element[]>();
    
    elements.forEach((element) => {
      const parent = element.parentElement || container;
      if (!parentGroups.has(parent)) {
        parentGroups.set(parent, []);
      }
      parentGroups.get(parent)!.push(element);
    });

    // Assign indices within parent groups
    parentGroups.forEach((childElements, parent) => {
      childElements.forEach((element, index) => {
        this.elements.set(element, { parent, index });
        
        // Setup clip-path mode if requested
        if (this.options.useClipPath) {
          element.classList.add('use-clippath');
        }
        
        // Observe element
        this.observer!.observe(element);
        
        // Handle reduced motion immediately
        if (this.prefersReducedMotion) {
          element.classList.add('is-inview');
        }
      });
    });
  }

  public unobserve(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
    }
    this.elements.delete(element);
  }

  public disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.elements.clear();
  }

  public refresh(): void {
    this.disconnect();
    this.initObserver();
  }
}

// Utility function for easy initialization
export function initWipeReveal(
  container: Element | Document = document,
  options: WipeRevealOptions = {}
): WipeRevealManager {
  const manager = new WipeRevealManager(options);
  
  // Auto-observe when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      manager.observe(container);
    });
  } else {
    manager.observe(container);
  }
  
  return manager;
}

// Named export for WipeRevealManager
export { WipeRevealManager };

// Default export for convenience
export default WipeRevealManager;