'use client';

import React from 'react';

interface CyberDividerProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: { line: 'bg-neon-green', text: 'text-neon-green', glow: 'shadow-[0_0_8px_rgba(0,255,159,0.5)]' },
  cyan:  { line: 'bg-[#00f0ff]',  text: 'text-[#00f0ff]',  glow: 'shadow-[0_0_8px_rgba(0,240,255,0.5)]' },
  red:   { line: 'bg-[#ff5f57]',  text: 'text-[#ff5f57]',  glow: 'shadow-[0_0_8px_rgba(255,95,87,0.5)]' },
  amber: { line: 'bg-[#febc2e]',  text: 'text-[#febc2e]',  glow: 'shadow-[0_0_8px_rgba(254,188,46,0.5)]' },
};

export default function CyberDivider({
  variant = 'green',
  label,
  orientation = 'horizontal',
  glow = false,
  className = '',
}: CyberDividerProps) {
  const c = COLOR_MAP[variant];

  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-1 ${className}`}>
        {label && (
          <span className={`text-[9px] uppercase tracking-widest font-mono rotate-90 whitespace-nowrap mb-2 ${c.text} opacity-60`}>
            {label}
          </span>
        )}
        <div className={`w-px flex-1 opacity-20 ${c.line} ${glow ? c.glow : ''}`} />
      </div>
    );
  }

  if (label) {
    return (
      <div className={`flex items-center gap-3 font-mono ${className}`}>
        <div className={`flex-1 h-px opacity-15 ${c.line}`} />
        <span className={`text-[10px] uppercase tracking-widest ${c.text} opacity-60`}>
          {label}
        </span>
        <div className={`flex-1 h-px opacity-15 ${c.line}`} />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-px opacity-15 ${c.line} ${glow ? c.glow : ''} ${className}`}
    />
  );
}
