'use client';

import React from 'react';

interface HologramContainerProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  flicker?: boolean;
  scanlines?: boolean;
  noise?: boolean;
  className?: string;
  children: React.ReactNode;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#00ff9f44]',
    glow: 'rgba(0, 255, 159, 0.15)',
    color: '#00ff9f',
    bg: 'bg-[#00ff9f03]',
    overlay: 'rgba(0, 255, 159, 0.05)',
  },
  cyan: {
    border: 'border-[#00f0ff44]',
    glow: 'rgba(0, 240, 255, 0.15)',
    color: '#00f0ff',
    bg: 'bg-[#00f0ff03]',
    overlay: 'rgba(0, 240, 255, 0.05)',
  },
  red: {
    border: 'border-[#ff5f5744]',
    glow: 'rgba(255, 95, 87, 0.15)',
    color: '#ff5f57',
    bg: 'bg-[#ff5f5703]',
    overlay: 'rgba(255, 95, 87, 0.05)',
  },
  amber: {
    border: 'border-[#febc2e44]',
    glow: 'rgba(254, 188, 46, 0.15)',
    color: '#febc2e',
    bg: 'bg-[#febc2e03]',
    overlay: 'rgba(254, 188, 46, 0.05)',
  },
};

export default function HologramContainer({
  variant = 'cyan',
  flicker = true,
  scanlines = true,
  noise = true,
  className = '',
  children,
}: HologramContainerProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div
      className={`
        relative border rounded p-6 overflow-hidden bg-[#0a0a0a] transition-all duration-300
        ${colors.border} ${colors.bg} ${flicker ? 'animate-holo-flicker' : ''} ${className}
      `}
      style={{
        boxShadow: `inset 0 0 20px ${colors.glow}, 0 0 15px ${colors.glow}`,
      }}
    >
      {/* Scope Style Block to keep animations fully portable */}
      <style jsx global>{`
        @keyframes holo-flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.99;
            filter: hue-rotate(0deg) saturate(1);
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.4;
            filter: hue-rotate(5deg) saturate(1.5) brightness(1.2);
          }
        }
        @keyframes scanline-roll {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-holo-flicker {
          animation: holo-flicker 4s infinite;
        }
        .scanline-overlay::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.3) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06));
          background-size: 100% 3px, 3px 100%;
          z-index: 20;
          pointer-events: none;
        }
        .scanline-sweep-line {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100px;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--sweep-color) 10%;
          opacity: 0.08;
          z-index: 21;
          pointer-events: none;
          animation: scanline-roll 6s linear infinite;
        }
        .holo-noise {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          opacity: 0.15;
          z-index: 19;
          pointer-events: none;
        }
      `}</style>

      {/* Hologram scanline and sweeping beam */}
      {scanlines && (
        <div 
          className="scanline-overlay absolute inset-0 pointer-events-none" 
          style={{ '--sweep-color': colors.color } as React.CSSProperties}
        >
          <div className="scanline-sweep-line" />
        </div>
      )}

      {/* Noise background grid overlay */}
      {noise && <div className="holo-noise absolute inset-0 pointer-events-none" />}

      {/* Blue / Cyan color grade tint */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-10"
        style={{
          background: `radial-gradient(circle, ${colors.overlay} 0%, transparent 80%)`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}
