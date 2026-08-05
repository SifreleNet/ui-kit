'use client';

import React, { useState } from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  isCutCorner?: boolean;
  glitchOnHover?: boolean;
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#00ff9f33] hover:border-[#00ff9f]',
    text: 'text-[#00ff9f]',
    bg: 'hover:bg-[#00ff9f0d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(0,255,159,0.35)]',
    accent: 'bg-[#00ff9f]',
  },
  cyan: {
    border: 'border-[#00f0ff33] hover:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    bg: 'hover:bg-[#00f0ff0d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(0,240,255,0.35)]',
    accent: 'bg-[#00f0ff]',
  },
  red: {
    border: 'border-[#ff5f5733] hover:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    bg: 'hover:bg-[#ff5f570d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(255,95,87,0.35)]',
    accent: 'bg-[#ff5f57]',
  },
  amber: {
    border: 'border-[#febc2e33] hover:border-[#febc2e]',
    text: 'text-[#febc2e]',
    bg: 'hover:bg-[#febc2e0d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(254,188,46,0.35)]',
    accent: 'bg-[#febc2e]',
  },
};

const SIZE_MAP = {
  sm: 'px-3 py-1.5 text-xs font-mono',
  md: 'px-5 py-2.5 text-sm font-mono',
  lg: 'px-8 py-3 text-base font-mono',
};

export default function CyberButton({
  children,
  variant = 'green',
  size = 'md',
  isCutCorner = false,
  glitchOnHover = true,
  glow = true,
  className = '',
  ...props
}: CyberButtonProps) {
  const [glitchText, setGlitchText] = useState<string | null>(null);
  const colors = COLOR_MAP[variant];

  // Glitch effect on hover
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (glitchOnHover && typeof children === 'string') {
      const original = children;
      let iterations = 0;
      const chars = '01XYZ_$#!?';
      const interval = setInterval(() => {
        setGlitchText(
          original
            .split('')
            .map((char, index) => {
              if (index < iterations) return original[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        iterations += 1 / 3;
        if (iterations >= original.length) {
          clearInterval(interval);
          setGlitchText(null);
        }
      }, 30);
    }
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const buttonStyle: React.CSSProperties = isCutCorner
    ? {
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
      }
    : {};

  return (
    <button
      {...props}
      onMouseEnter={handleMouseEnter}
      style={buttonStyle}
      className={`
        relative inline-flex items-center justify-center font-bold uppercase tracking-wider
        border rounded bg-black/40 backdrop-blur-sm
        transition-all duration-300 active:scale-95 cursor-pointer select-none
        ${colors.border} ${colors.text} ${colors.bg} ${size.startsWith('px') ? size : SIZE_MAP[size]}
        ${glow ? colors.shadow : ''}
        ${className}
      `}
    >
      {/* Corner indicators for cyber design */}
      {isCutCorner && (
        <span className={`absolute bottom-0 right-[7px] w-px h-[10px] rotate-[45deg] origin-bottom-right ${colors.accent} opacity-50`} />
      )}

      {/* Decorative inner scanning line */}
      <span className="absolute inset-0 w-full h-[1px] bg-white/5 group-hover:animate-scanline pointer-events-none" />

      {/* Main text content */}
      <span className="relative z-10 font-mono">
        {glitchText !== null ? glitchText : children}
      </span>
    </button>
  );
}
