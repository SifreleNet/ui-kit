'use client';

import React, { useState, useRef } from 'react';

interface CyberTooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  delay?: number;
  className?: string;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/30 bg-[#0a0a0a]/95 text-neon-green',
    text: 'text-neon-green',
    arrow: 'border-neon-green/30',
  },
  cyan: {
    border: 'border-cyan-500/30 bg-[#0a0a0a]/95 text-cyan-400',
    text: 'text-cyan-400',
    arrow: 'border-cyan-500/30',
  },
  red: {
    border: 'border-rose-500/30 bg-[#0a0a0a]/95 text-rose-500',
    text: 'text-rose-500',
    arrow: 'border-rose-500/30',
  },
  amber: {
    border: 'border-amber-500/30 bg-[#0a0a0a]/95 text-amber-500',
    text: 'text-amber-500',
    arrow: 'border-amber-500/30',
  },
};

const POSITION_CLASSES = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export default function CyberTooltip({
  content,
  children,
  position = 'top',
  variant = 'green',
  delay = 200,
  className = '',
}: CyberTooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const styles = VARIANTS[variant];
  const positionClass = POSITION_CLASSES[position];

  return (
    <div
      className="relative inline-block cursor-help"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-[999] px-3 py-1.5 border rounded font-mono text-[10px] uppercase tracking-wider whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-md transition-opacity duration-200 animate-fadeIn ${styles.border} ${positionClass} ${className}`}
        >
          {/* Neon Corner Brackets */}
          <div className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-current opacity-60" />
          <div className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-current opacity-60" />
          <div className="absolute bottom-0.5 left-0.5 w-1 h-1 border-b border-l border-current opacity-60" />
          <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-current opacity-60" />

          {/* Tooltip Content */}
          <div className="flex items-center gap-1.5 relative z-10">
            <span className="animate-blink">_</span>
            <span>{content}</span>
          </div>
        </div>
      )}
    </div>
  );
}
