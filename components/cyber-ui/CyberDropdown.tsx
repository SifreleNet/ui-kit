'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CyberDropdownProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/20 hover:border-neon-green/40 focus:border-neon-green',
    text: 'text-neon-green',
    bgActive: 'bg-neon-green/10',
    glow: 'shadow-[0_0_15px_rgba(0,255,159,0.03)]',
  },
  cyan: {
    border: 'border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-400',
    text: 'text-cyan-400',
    bgActive: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.03)]',
  },
  red: {
    border: 'border-rose-500/20 hover:border-rose-500/40 focus:border-rose-500',
    text: 'text-rose-500',
    bgActive: 'bg-rose-500/10',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.03)]',
  },
  amber: {
    border: 'border-amber-500/20 hover:border-amber-500/40 focus:border-amber-500',
    text: 'text-amber-500',
    bgActive: 'bg-amber-500/10',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.03)]',
  },
};

export default function CyberDropdown({
  options,
  value,
  onChange,
  placeholder = 'SELECT PARAMETER...',
  variant = 'green',
  disabled = false,
  className = '',
}: CyberDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const styles = VARIANTS[variant];
  const selectedOption = options.find((opt) => opt.value === value);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative font-mono text-xs select-none ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-2.5 border rounded bg-black flex items-center justify-between text-left transition-all relative overflow-hidden cursor-pointer ${
          disabled ? 'opacity-40 cursor-not-allowed' : `${styles.border} ${styles.glow}`
        }`}
      >
        <span className={selectedOption ? 'text-white' : 'text-white/30'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 text-white/40 ${
            isOpen ? 'transform rotate-180 text-white' : ''
          }`}
        />
        {/* Neon Corners */}
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/10" />
        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/10" />
        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/10" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/10" />
      </button>

      {/* Dropdown Options Box */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 mt-1.5 z-50 border rounded bg-black/95 backdrop-blur-md max-h-60 overflow-y-auto shadow-[0_0_20px_rgba(0,0,0,0.8)] border-neutral-900 scrollbar-thin`}
        >
          {/* CRT scanlines */}
          <div className="absolute inset-0 pointer-events-none z-10 scanline-sweep opacity-[0.02]" />

          <div className="py-1">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-4 py-2.5 cursor-pointer transition-colors relative flex items-center justify-between ${
                    isSelected
                      ? `${styles.bgActive} ${styles.text} font-bold`
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <span className={styles.text}>[✔]</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
