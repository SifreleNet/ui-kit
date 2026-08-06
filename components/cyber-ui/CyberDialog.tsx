'use client';

import React, { useEffect } from 'react';
import CyberButton from './CyberButton';

interface CyberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const COLOR_MAP = {
  green: {
    border: 'border-neon-green/20 focus:border-neon-green',
    text: 'text-neon-green',
    shadow: 'shadow-[0_0_30px_rgba(0,255,159,0.15)]',
    accentText: 'text-neon-green/40',
    headerBg: 'bg-neon-green/5',
    accentBorder: 'border-neon-green/13',
  },
  cyan: {
    border: 'border-[#00f0ff33] focus:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    shadow: 'shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    accentText: 'text-[#00f0ff66]',
    headerBg: 'bg-[#00f0ff0d]',
    accentBorder: 'border-[#00f0ff22]',
  },
  red: {
    border: 'border-[#ff5f5733] focus:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    shadow: 'shadow-[0_0_30px_rgba(255,95,87,0.15)]',
    accentText: 'text-[#ff5f5766]',
    headerBg: 'bg-[#ff5f570d]',
    accentBorder: 'border-[#ff5f5722]',
  },
  amber: {
    border: 'border-[#febc2e33] focus:border-[#febc2e]',
    text: 'text-[#febc2e]',
    shadow: 'shadow-[0_0_30px_rgba(254,188,46,0.15)]',
    accentText: 'text-[#febc2e66]',
    headerBg: 'bg-[#febc2e0d]',
    accentBorder: 'border-[#febc2e22]',
  },
};

export default function CyberDialog({
  isOpen,
  onClose,
  title = 'ALERT',
  variant = 'green',
  children,
  actions,
  className = '',
}: CyberDialogProps) {
  const colors = COLOR_MAP[variant];

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred dark backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Cyber Dialog Box */}
      <div
        className={`
          relative w-full max-w-md bg-[#0a0a0a] border overflow-hidden rounded-lg z-10 flex flex-col
          animate-fade-in-up duration-300
          ${colors.border} ${colors.shadow} ${className}
        `}
      >
        {/* Dynamic sweeping scanline line inside dialog */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scanline-sweep" />
        </div>

        {/* Dialog Header */}
        <div
          className={`
            flex items-center justify-between px-4 py-3 border-b font-mono text-xs
            ${colors.accentBorder} ${colors.headerBg}
          `}
        >
          <div className="flex items-center gap-2">
            <span className={colors.text}>⬡</span>
            <span className={`font-bold tracking-widest uppercase ${colors.text}`}>
              {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className={`
              hover:text-white transition-colors duration-200 cursor-pointer font-mono text-sm px-1.5 rounded
              ${colors.accentText}
            `}
          >
            [X]
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-6 font-mono text-xs leading-relaxed text-neon-green/80 overflow-y-auto">
          {children}
        </div>

        {/* Dialog Footer Actions */}
        <div
          className={`
            flex justify-end gap-3 px-4 py-3 border-t bg-neutral-900/40
            ${colors.accentBorder}
          `}
        >
          {actions || (
            <CyberButton variant={variant} size="sm" onClick={onClose}>
              Acknowledge
            </CyberButton>
          )}
        </div>
      </div>
    </div>
  );
}
