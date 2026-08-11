'use client';

import React from 'react';

interface CyberAvatarProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  glitch?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: { border: 'border-neon-green/30', text: 'text-neon-green', bg: 'bg-neon-green/10', dot: 'bg-neon-green', glow: 'shadow-[0_0_12px_rgba(0,255,159,0.3)]' },
  cyan:  { border: 'border-[#00f0ff]/30', text: 'text-[#00f0ff]', bg: 'bg-[#00f0ff]/10', dot: 'bg-[#00f0ff]', glow: 'shadow-[0_0_12px_rgba(0,240,255,0.3)]' },
  red:   { border: 'border-[#ff5f57]/30', text: 'text-[#ff5f57]', bg: 'bg-[#ff5f57]/10', dot: 'bg-[#ff5f57]', glow: 'shadow-[0_0_12px_rgba(255,95,87,0.3)]' },
  amber: { border: 'border-[#febc2e]/30', text: 'text-[#febc2e]', bg: 'bg-[#febc2e]/10', dot: 'bg-[#febc2e]', glow: 'shadow-[0_0_12px_rgba(254,188,46,0.3)]' },
};

const SIZE_MAP = {
  sm: { outer: 'w-8 h-8', text: 'text-xs', dot: 'w-2 h-2', dotPos: '-bottom-0.5 -right-0.5' },
  md: { outer: 'w-10 h-10', text: 'text-sm', dot: 'w-2.5 h-2.5', dotPos: '-bottom-0.5 -right-0.5' },
  lg: { outer: 'w-14 h-14', text: 'text-base', dot: 'w-3 h-3', dotPos: 'bottom-0 right-0' },
  xl: { outer: 'w-20 h-20', text: 'text-xl', dot: 'w-4 h-4', dotPos: 'bottom-0 right-0' },
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function CyberAvatar({
  variant = 'green',
  src,
  name,
  size = 'md',
  online,
  glitch = false,
  className = '',
}: CyberAvatarProps) {
  const c = COLOR_MAP[variant];
  const s = SIZE_MAP[size];

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`
          ${s.outer} rounded-full border-2 overflow-hidden flex items-center justify-center
          font-mono font-bold transition-all duration-300
          ${c.border} ${c.bg} ${c.text}
          ${glitch ? 'hover:animate-pulse' : ''}
          ${online ? c.glow : ''}
        `}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name ?? 'avatar'} className="w-full h-full object-cover" />
        ) : name ? (
          <span className={s.text}>{getInitials(name)}</span>
        ) : (
          <span className={`${s.text} opacity-40`}>??</span>
        )}

        {/* CRT scanline overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />
      </div>

      {/* Online indicator */}
      {online !== undefined && (
        <span
          className={`
            absolute ${s.dotPos} ${s.dot} rounded-full border-2 border-[#0a0a0a]
            ${online ? `${c.dot} animate-pulse` : 'bg-white/20'}
          `}
        />
      )}
    </div>
  );
}
