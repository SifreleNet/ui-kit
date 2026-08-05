'use client';

import React from 'react';

interface CyberBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  brackets?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#00ff9f33]',
    bg: 'bg-[#00ff9f0a]',
    text: 'text-[#00ff9f]',
    brackets: 'text-[#00ff9f55]',
  },
  cyan: {
    border: 'border-[#00f0ff33]',
    bg: 'bg-[#00f0ff0a]',
    text: 'text-[#00f0ff]',
    brackets: 'text-[#00f0ff55]',
  },
  red: {
    border: 'border-[#ff5f5733]',
    bg: 'bg-[#ff5f570a]',
    text: 'text-[#ff5f57]',
    brackets: 'text-[#ff5f5755]',
  },
  amber: {
    border: 'border-[#febc2e33]',
    bg: 'bg-[#febc2e0a]',
    text: 'text-[#febc2e]',
    brackets: 'text-[#febc2e55]',
  },
};

export default function CyberBadge({
  children,
  variant = 'green',
  brackets = true,
  className = '',
  ...props
}: CyberBadgeProps) {
  const colors = COLOR_MAP[variant];

  return (
    <span
      {...props}
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 rounded border text-[10px] font-mono font-semibold tracking-wide uppercase select-none
        ${colors.border} ${colors.bg} ${colors.text}
        ${className}
      `}
    >
      {brackets && <span className={`font-mono mr-0.5 ${colors.brackets}`}>[</span>}
      {children}
      {brackets && <span className={`font-mono ml-0.5 ${colors.brackets}`}>]</span>}
    </span>
  );
}
