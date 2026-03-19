'use client';

import { useEffect, useRef, useCallback } from 'react';
import { animate } from 'animejs';

interface AnimateOnViewOptions {
  /** Animation properties to pass to anime.js animate() */
  animationProps?: Record<string, unknown>;
  /** IntersectionObserver threshold (0-1), default 0.15 */
  threshold?: number;
  /** Only trigger once, default true */
  triggerOnce?: boolean;
  /** Delay before starting animation in ms */
  delay?: number;
  /** Whether to set initial opacity to 0 */
  hideInitially?: boolean;
}

/**
 * Hook that triggers an anime.js animation when the element scrolls into view.
 * Returns a ref to attach to the target element.
 */
export function useAnimateOnView<T extends HTMLElement = HTMLDivElement>(
  options: AnimateOnViewOptions = {}
) {
  const {
    animationProps = {},
    threshold = 0.15,
    triggerOnce = true,
    delay = 0,
    hideInitially = true,
  } = options;

  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  const triggerAnimation = useCallback(() => {
    if (!ref.current) return;

    animate(ref.current, {
      opacity: [0, 1],
      translateY: [30, 0],
      ease: 'outQuad',
      duration: 800,
      delay,
      ...animationProps,
    });
  }, [animationProps, delay]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    if (hideInitially) {
      el.style.opacity = '0';
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasAnimated.current) return;
            hasAnimated.current = true;
            triggerAnimation();
            if (triggerOnce) {
              observer.unobserve(el);
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [threshold, triggerOnce, triggerAnimation, hideInitially]);

  return ref;
}

/**
 * Hook for staggered animation of multiple child elements on scroll into view.
 * Returns a ref to attach to the parent container.
 */
export function useStaggerOnView<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  options: {
    staggerDelay?: number;
    duration?: number;
    ease?: string;
    threshold?: number;
    triggerOnce?: boolean;
    translateY?: number[];
    delay?: number;
  } = {}
) {
  const {
    staggerDelay = 100,
    duration = 800,
    ease = 'outQuad',
    threshold = 0.15,
    triggerOnce = true,
    translateY = [25, 0],
    delay = 0,
  } = options;

  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hide children initially
    const children = el.querySelectorAll(childSelector);
    children.forEach((child) => {
      (child as HTMLElement).style.opacity = '0';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasAnimated.current) return;
            hasAnimated.current = true;

            const targets = el.querySelectorAll(childSelector);
            targets.forEach((target, index) => {
              animate(target as HTMLElement, {
                opacity: [0, 1],
                translateY,
                ease,
                duration,
                delay: delay + index * staggerDelay,
              });
            });

            if (triggerOnce) {
              observer.unobserve(el);
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [childSelector, staggerDelay, duration, ease, threshold, triggerOnce, translateY, delay]);

  return ref;
}
