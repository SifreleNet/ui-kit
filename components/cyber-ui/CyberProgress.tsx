'use client';

import React from 'react';

interface CyberProgressProps {
  value: number; // 0 to 100
  showText?: boolean;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  type?: 'block' | 'line';
  className?: string;
}

const COLOR_MAP = {
  green: {
    bar: 'bg-neon-green',
    glow: 'shadow-[0_0_8px_var(--neon-green)]',
    text: 'text-neon-green',
    blockChar: '■',
    emptyChar: '□',
  },
  cyan: {
    bar: 'bg-[#00f0ff]',
    glow: 'shadow-[0_0_8px_#00f0ff]',
    text: 'text-[#00f0ff]',
    blockChar: '■',
    emptyChar: '□',
  },
  red: {
    bar: 'bg-[#ff5f57]',
    glow: 'shadow-[0_0_8px_#ff5f57]',
    text: 'text-[#ff5f57]',
    blockChar: '■',
    emptyChar: '□',
  },
  amber: {
    bar: 'bg-[#febc2e]',
    glow: 'shadow-[0_0_8px_#febc2e]',
    text: 'text-[#febc2e]',
    blockChar: '■',
    emptyChar: '□',
  },
};

export default function CyberProgress({
  value,
  showText = true,
  label = 'SYSTEM_LOAD',
  variant = 'green',
  type = 'block',
  className = '',
}: CyberProgressProps) {
  const colors = COLOR_MAP[variant];
  const clampedValue = Math.max(0, Math.min(100, value));

  // Render block progress e.g. [■■■■■■□□□□]
  const renderBlocks = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((clampedValue / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return (
      <span className="font-mono text-sm tracking-widest select-none">
        <span className={colors.text}>
          {colors.blockChar.repeat(filledBlocks)}
        </span>
        <span className="text-neutral-800">
          {colors.blockChar.repeat(emptyBlocks)}
        </span>
      </span>
    );
  };

  return (
    <div className={`w-full font-mono text-xs ${className}`}>
      {/* Top Labels */}
      {showText && (
        <div className="flex justify-between items-center mb-1 text-[10px] text-white/50 tracking-wider">
          <span>{label}</span>
          <span className={colors.text}>{Math.round(clampedValue)}%</span>
        </div>
      )}

      {/* Progress Bar Body */}
      {type === 'line' ? (
        <div className="h-2 rounded bg-neutral-900 border border-neutral-900 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${colors.bar} ${colors.glow}`}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 border border-neutral-900 bg-black/45 p-1 rounded">
          <span className="text-white/20 select-none">[</span>
          <div className="flex-1 text-center">{renderBlocks()}</div>
          <span className="text-white/20 select-none">]</span>
        </div>
      )}
    </div>
  );
}
