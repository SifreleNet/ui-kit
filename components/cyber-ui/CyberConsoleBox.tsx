'use client';

import React from 'react';

interface CyberConsoleBoxProps {
  command?: string;
  content: string | string[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a]',
    command: 'text-neon-green/33',
    text: 'text-neon-green/27',
    shadow: 'shadow-[0_0_25px_rgba(0,255,159,0.02)]',
    bg: 'bg-[#0d0d0dcc]',
  },
  cyan: {
    border: 'border-[#0a232e]',
    command: 'text-[#00f0ff55]',
    text: 'text-[#00f0ff44]',
    shadow: 'shadow-[0_0_25px_rgba(0,240,255,0.02)]',
    bg: 'bg-[#0d0d0dcc]',
  },
  red: {
    border: 'border-[#2d1212]',
    command: 'text-[#ff5f5755]',
    text: 'text-[#ff5f5744]',
    shadow: 'shadow-[0_0_25px_rgba(255,95,87,0.02)]',
    bg: 'bg-[#0d0d0dcc]',
  },
  amber: {
    border: 'border-[#2e230a]',
    command: 'text-[#febc2e55]',
    text: 'text-[#febc2e44]',
    shadow: 'shadow-[0_0_25px_rgba(254,188,46,0.02)]',
    bg: 'bg-[#0d0d0dcc]',
  },
};

export default function CyberConsoleBox({
  command,
  content,
  variant = 'green',
  glow = true,
  className = '',
}: CyberConsoleBoxProps) {
  const colors = COLOR_MAP[variant];
  const rows = Array.isArray(content) ? content : content.split('\n');

  return (
    <div className={`w-full ${className}`}>
      {/* Command prompt label */}
      {command && (
        <p className={`text-xs font-mono mb-3 select-none ${colors.command}`}>
          {command}
        </p>
      )}

      {/* Code Console container */}
      <div
        className={`
          border rounded-lg p-5 font-mono text-xs leading-relaxed overflow-x-auto
          ${colors.border} ${colors.bg} ${glow ? colors.shadow : ''}
        `}
      >
        {rows.map((row, i) => (
          <p key={i} className={colors.text}>
            {row}
          </p>
        ))}
      </div>
    </div>
  );
}
