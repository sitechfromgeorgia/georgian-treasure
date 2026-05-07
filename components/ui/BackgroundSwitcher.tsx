'use client';

import { usePathname } from 'next/navigation';
import { MountainDust } from './MountainDust';
import { GradientSunset } from './GradientSunset';
import { FloatingClouds } from './FloatingClouds';

// Map of routes to their preferred background animations
const routeBackgrounds: Record<string, 'dust' | 'sunset' | 'clouds' | 'none'> = {
  '/': 'sunset',           // Home - warm sunset
  '/tours': 'dust',        // Tours - mountain dust
  '/regions': 'clouds',    // Regions - floating clouds
  '/custom-tour': 'sunset', // Custom tour - warm sunset
  '/about': 'sunset',      // About - warm sunset
  '/contact': 'clouds',    // Contact - calm clouds
  '/reviews': 'sunset',    // Reviews - warm sunset
  '/gallery': 'dust',      // Gallery - mountain dust
  '/blog': 'clouds',       // Blog - calm clouds
};

export function BackgroundSwitcher() {
  const pathname = usePathname();
  
  // Extract the route without language prefix
  const route = pathname.replace(/^\/(ka|en|ru|he)/, '') || '/';
  
  const backgroundType = routeBackgrounds[route] || 'none';

  return (
    <>
      {backgroundType === 'dust' && <MountainDust />}
      {backgroundType === 'sunset' && <GradientSunset />}
      {backgroundType === 'clouds' && <FloatingClouds />}
    </>
  );
}
