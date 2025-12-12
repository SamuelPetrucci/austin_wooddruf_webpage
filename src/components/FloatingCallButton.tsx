'use client';

import { PhoneIcon } from '@heroicons/react/24/solid';

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+17272482108"
      className="fixed bottom-6 right-6 z-50 md:hidden group"
      aria-label="Call Austin Woodruff Insurance at (727) 248-2108"
    >
      {/* Outer pulsing glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 animate-ping-slow"></div>
      
      {/* Pulsing gradient background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 animate-pulse-slow opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Main button */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-4 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-active:scale-95">
        <PhoneIcon className="h-6 w-6 text-white" />
      </div>
    </a>
  );
}

