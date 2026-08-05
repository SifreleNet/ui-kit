'use client';

import React from 'react';
import CyberBadge from './CyberBadge';
import CyberButton from './CyberButton';

interface CyberAlertProps {
  title?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  children: React.ReactNode;
  onAction?: () => void;
  actionText?: string;
  className?: string;
}

interface ColorScheme {
  border: string;
  text: string;
  bg: string;
  badge: string;
  flash?: string;
}

const COLOR_MAP: Record<'green' | 'cyan' | 'red' | 'amber', ColorScheme> = {
  green: {
    border: 'border-[#00ff9f] shadow-[0_0_15px_rgba(0,255,159,0.15)]',
    text: 'text-[#00ff9f]',
    bg: 'bg-[#00ff9f05]',
    badge: 'green',
  },
  cyan: {
    border: 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.15)]',
    text: 'text-[#00f0ff]',
    bg: 'bg-[#00f0ff05]',
    badge: 'cyan',
  },
  red: {
    border: 'border-[#ff5f57] shadow-[0_0_15px_rgba(255,95,87,0.15)]',
    text: 'text-[#ff5f57]',
    bg: 'bg-[#ff5f5705]',
    badge: 'red',
    flash: 'animate-pulse duration-1000',
  },
  amber: {
    border: 'border-[#febc2e] shadow-[0_0_15px_rgba(254,188,46,0.15)]',
    text: 'text-[#febc2e]',
    bg: 'bg-[#febc2e05]',
    badge: 'amber',
  },
};

export default function CyberAlert({
  title = 'SECURITY ALERT',
  variant = 'red',
  children,
  onAction,
  actionText = 'Acknowledge',
  className = '',
}: CyberAlertProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div
      className={`
        border rounded-lg p-4 bg-black/90 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono select-none relative overflow-hidden
        ${colors.border} ${colors.bg} ${colors.flash || ''} ${className}
      `}
    >
      {/* Decorative scanner line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline-sweep" />
      </div>

      {/* Info Body */}
      <div className="flex items-start gap-3 relative z-10">
        <div className="flex flex-col gap-2">
          {/* Status Alert Badge + Title */}
          <div className="flex items-center gap-2">
            <CyberBadge variant={colors.badge as any} brackets={true}>
              {variant === 'red' ? 'CRIT' : variant === 'amber' ? 'WARN' : 'INFO'}
            </CyberBadge>
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
              {title}
            </span>
          </div>

          {/* Description */}
          <div className="text-xs text-[#00ff9fcc] max-w-lg leading-relaxed">
            {children}
          </div>
        </div>
      </div>

      {/* Action button */}
      {onAction && (
        <div className="relative z-10 self-end md:self-center shrink-0">
          <CyberButton variant={variant} size="sm" onClick={onAction}>
            {actionText}
          </CyberButton>
        </div>
      )}
    </div>
  );
}
