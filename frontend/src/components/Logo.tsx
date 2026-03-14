interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}

const Logo = ({ className = "", size = 'large', showTagline = true }: LogoProps) => {
  const sizeClasses = {
    small: { svg: 'w-28 h-28', text: 'text-6xl', tagline: 'text-sm' },
    medium: { svg: 'w-36 h-36', text: 'text-8xl', tagline: 'text-base' },
    large: { svg: 'w-56 h-56', text: 'text-9xl', tagline: 'text-2xl' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Simple Tooth Outline Logo - Minimal & Clean */}
      <div className="mb-10 relative group flex items-center justify-center">
        {/* Animated glowing background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-600 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-all duration-500 animate-pulse"></div>

        <svg
          className={`${currentSize.svg} relative z-10 drop-shadow-2xl transform group-hover:scale-105 transition-all duration-500 mx-auto`}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for stroke */}
            <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            {/* Glow effect */}
            <filter id="glowOutline">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Simple tooth outline - just strokes, no fill */}
          <g transform="translate(100, 100)" filter="url(#glowOutline)">
            {/* Main tooth outline */}
            <path
              d="M 0,-70
                 C -22,-70 -38,-56 -38,-33
                 C -38,-18 -40,-3 -40,13
                 C -40,31 -34,47 -22,47
                 C -14,47 -12,39 -8,29
                 C -5,22 -3,20 0,20
                 C 3,20 5,22 8,29
                 C 12,39 14,47 22,47
                 C 34,47 40,31 40,13
                 C 40,-3 38,-18 38,-33
                 C 38,-56 22,-70 0,-70 Z"
              fill="none"
              stroke="url(#strokeGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner tooth detail line */}
            <path
              d="M -30,-25 C -30,-40 -15,-55 0,-55 C 15,-55 30,-40 30,-25"
              fill="none"
              stroke="url(#strokeGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Root separation line */}
            <line
              x1="0"
              y1="20"
              x2="0"
              y2="42"
              stroke="url(#strokeGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Sparkle effect */}
            <circle cx="-18" cy="-42" r="4" fill="#3B82F6" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="20" cy="-35" r="3" fill="#06B6D4" opacity="0.7">
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.5s" repeatCount="indefinite"/>
            </circle>
          </g>

          {/* Plus icon outline - minimal */}
          <g transform="translate(155, 45)">
            <circle cx="0" cy="0" r="18" fill="none" stroke="url(#strokeGrad)" strokeWidth="3"/>
            <line x1="0" y1="-10" x2="0" y2="10" stroke="url(#strokeGrad)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="-10" y1="0" x2="10" y2="0" stroke="url(#strokeGrad)" strokeWidth="3" strokeLinecap="round"/>
          </g>

          {/* Decorative sparkles */}
          <circle cx="45" cy="50" r="3" fill="#3B82F6" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="155" cy="155" r="3" fill="#06B6D4" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      {/* Brand Name - Dent (Blue) + Bridge (Grey) - ULTRA MASSIVE */}
      <h1
        className="font-black tracking-tight drop-shadow-2xl text-center leading-none mb-2"
        style={{
          fontSize: size === 'large' ? '12rem' : size === 'medium' ? '7rem' : '4rem',
          lineHeight: '0.9',
          letterSpacing: '-0.03em'
        }}
      >
        <span className="text-blue-600">Dent</span>
        <span className="text-gray-600">Bridge</span>
      </h1>

      {/* HEALTHCARE text below - BIGGER */}
      {showTagline && (
        <p
          className="text-gray-500 font-bold tracking-[0.3em] uppercase text-center"
          style={{
            fontSize: size === 'large' ? '2rem' : size === 'medium' ? '1.25rem' : '0.875rem',
            marginTop: '-0.5rem'
          }}
        >
          HEALTHCARE
        </p>
      )}
    </div>
  );
};

export default Logo;
