'use client';

import { useEffect, useState } from 'react';

export function LoginBackground() {
  const [currentGradient, setCurrentGradient] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % 4);
    }, 5000); // Change gradient every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const gradients = [
    'from-red-600 via-red-500 to-red-700',
    'from-gray-700 via-gray-600 to-gray-800',
    'from-red-700 via-red-600 to-gray-800',
    'from-gray-800 via-red-600 to-red-700'
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradients[currentGradient]} transition-all duration-3000 ease-in-out`}
      >
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white border-opacity-20 rounded-lg transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white border-opacity-30 transform rotate-12 animate-spin"></div>
        </div>

        {/* Tech Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full p-12">
        <div className="text-center text-white">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">ברוכים הבאים</h2>
            <p className="text-xl opacity-90">למערכת ניהול הגיוס המתקדמת</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">למנהלים</h3>
              <p className="text-sm opacity-80">דשבורד מנהלים עם תובנות עסקיות מתקדמות</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">למגייסים</h3>
              <p className="text-sm opacity-80">כלים מתקדמים לניהול תהליכי גיוס</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">ללקוחות</h3>
              <p className="text-sm opacity-80">פורטל לקוחות עם מעקב אחר מועמדים</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">למועמדים</h3>
              <p className="text-sm opacity-80">פורטל מועמדים עם מעקב אחר תהליכי גיוס</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-white bg-opacity-40 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
} 