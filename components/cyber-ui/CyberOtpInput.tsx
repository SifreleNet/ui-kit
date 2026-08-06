'use client';

import React, { useRef, useEffect } from 'react';

interface CyberOtpInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/20 focus:border-neon-green',
    text: 'text-neon-green',
    bg: 'bg-black',
    glow: 'focus:shadow-[0_0_10px_rgba(0,255,159,0.3)]',
  },
  cyan: {
    border: 'border-cyan-500/20 focus:border-cyan-400',
    text: 'text-cyan-400',
    bg: 'bg-black',
    glow: 'focus:shadow-[0_0_10px_rgba(34,211,238,0.3)]',
  },
  red: {
    border: 'border-rose-500/20 focus:border-rose-500',
    text: 'text-rose-500',
    bg: 'bg-black',
    glow: 'focus:shadow-[0_0_10px_rgba(244,63,94,0.3)]',
  },
  amber: {
    border: 'border-amber-500/20 focus:border-amber-500',
    text: 'text-amber-500',
    bg: 'bg-black',
    glow: 'focus:shadow-[0_0_10px_rgba(245,158,11,0.3)]',
  },
};

export default function CyberOtpInput({
  length = 6,
  value,
  onChange,
  variant = 'green',
  disabled = false,
  className = '',
}: CyberOtpInputProps) {
  const styles = VARIANTS[variant];
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Focus tracking array helper
  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    const currentOtp = value.split('');
    
    // Only accept numbers/alphanumeric for cyber codes
    const sanitized = val.replace(/[^a-zA-Z0-9]/g, '');
    
    if (sanitized) {
      currentOtp[index] = sanitized[sanitized.length - 1];
      const newOtp = currentOtp.join('');
      onChange(newOtp);

      // Move focus to next input
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const currentOtp = value.split('');
      if (!currentOtp[index] && index > 0) {
        // If current value is empty, backspace focuses previous input
        inputsRef.current[index - 1]?.focus();
      } else {
        // Otherwise empty current input
        currentOtp[index] = '';
        onChange(currentOtp.join(''));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const sanitized = pastedText.replace(/[^a-zA-Z0-9]/g, '').slice(0, length);
    
    if (sanitized) {
      onChange(sanitized);
      // Focus on last pasted slot or final slot
      const focusIndex = Math.min(sanitized.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div className={`flex items-center gap-2 font-mono ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="relative">
          {/* Neon Corner Brackets */}
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 pointer-events-none" />

          <input
            ref={(el) => {
              if (el) inputsRef.current[index] = el;
            }}
            type="text"
            disabled={disabled}
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-10 h-12 text-center text-lg font-bold border rounded outline-none transition-all ${styles.bg} ${styles.border} ${styles.text} ${styles.glow}`}
          />
        </div>
      ))}
    </div>
  );
}
