'use client';

import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

interface ResponsiveState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  width: number;
  height: number;
}

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 600) return 'mobile';
  if (width < 960) return 'tablet';
  if (width < 1280) return 'desktop';
  return 'wide';
};

export function useResponsive(): ResponsiveState {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 720,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoint = getBreakpoint(dimensions.width);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    isWide: breakpoint === 'wide',
    width: dimensions.width,
    height: dimensions.height,
  };
}