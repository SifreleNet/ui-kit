'use client';

import React from 'react';

interface CyberPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  status?: string;
  showControls?: boolean;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-neon-green/10 hover:border-neon-green/30',
    barBorder: 'border-b-neon-green/5',
    title: 'text-neon-green/60',
    bullet: 'bg-neon-green',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,255,159,0.08)]',
    dotColor: 'var(--neon-green)',
  },
  cyan: {
    border: 'border-[#00f0ff1a] hover:border-[#00f0ff4d]',
    barBorder: 'border-b-[#00f0ff0d]',
    title: 'text-[#00f0ff99]',
    bullet: 'bg-[#00f0ff]',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]',
    dotColor: '#00f0ff',
  },
  red: {
    border: 'border-[#ff5f571a] hover:border-[#ff5f574d]',
    barBorder: 'border-b-[#ff5f570d]',
    title: 'text-[#ff5f5799]',
    bullet: 'bg-[#ff5f57]',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,95,87,0.08)]',
    dotColor: '#ff5f57',
  },
  amber: {
    border: 'border-[#febc2e1a] hover:border-[#febc2e4d]',
    barBorder: 'border-b-[#febc2e0d]',
    title: 'text-[#febc2e99]',
    bullet: 'bg-[#febc2e]',
    shadow: 'hover:shadow-[0_0_20px_rgba(254,188,46,0.08)]',
    dotColor: '#febc2e',
  },
};

export default function CyberPanel({
  children,
  title = 'TERMINAL',
  status,
  showControls = true,
  variant = 'green',
  glow = true,
  className = '',
  ...props
}: CyberPanelProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div
      {...props}
      className={`
        flex flex-col rounded-lg overflow-hidden bg-black/90 border backdrop-blur-md
        transition-all duration-300 h-full min-h-[140px]
        ${colors.border} ${glow ? colors.shadow : ''}
        ${className}
      `}
    >
      {/* Title Bar */}
      <div
        className={`
          flex items-center gap-2 px-3 py-2 bg-neutral-900/90 border-b font-mono text-[10px] select-none
          ${colors.barBorder}
        `}
      >
        {/* Terminal Dot Controls */}
        {showControls ? (
          <div className="flex gap-1.5 mr-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57] opacity-80 shadow-[0_0_4px_#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e] opacity-80 shadow-[0_0_4px_#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840] opacity-80 shadow-[0_0_4px_#28c840]" />
          </div>
        ) : (
          <span className="text-xs" style={{ color: colors.dotColor }}>
            ⬡
          </span>
        )}

        {/* Panel Title */}
        <span className={`font-semibold uppercase tracking-wider ${colors.title}`}>
          {title}
        </span>

        {/* Status indicator (right aligned) */}
        {status && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${colors.bullet}`} />
            <span className="opacity-60 uppercase font-mono tracking-tight text-[9px]" style={{ color: colors.dotColor }}>
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed text-neon-green/80">
        {children}
      </div>
    </div>
  );
}
