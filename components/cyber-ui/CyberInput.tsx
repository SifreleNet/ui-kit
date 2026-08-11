'use client';

import React, { useRef, useState, useEffect } from 'react';

interface CyberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  prompt?: string;
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a] focus-within:border-neon-green',
    text: 'text-neon-green',
    prompt: 'text-neon-green/53',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,255,159,0.2)]',
    bg: 'bg-black/40',
    caret: '#00ff9f',
  },
  cyan: {
    border: 'border-[#0a232e] focus-within:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    prompt: 'text-[#00f0ff88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    bg: 'bg-black/40',
    caret: '#00f0ff',
  },
  red: {
    border: 'border-[#2d1212] focus-within:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    prompt: 'text-[#ff5f5788]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(255,95,87,0.2)]',
    bg: 'bg-black/40',
    caret: '#ff5f57',
  },
  amber: {
    border: 'border-[#2e230a] focus-within:border-[#febc2e]',
    text: 'text-[#febc2e]',
    prompt: 'text-[#febc2e88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(254,188,46,0.2)]',
    bg: 'bg-black/40',
    caret: '#febc2e',
  },
};

export default function CyberInput({
  variant = 'green',
  prompt = '$',
  glow = true,
  className = '',
  value,
  defaultValue,
  onChange,
  ...props
}: CyberInputProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [cursorLeft, setCursorLeft] = useState(0);
  const colors = COLOR_MAP[variant];

  // Controlled or uncontrolled value
  const displayValue = value !== undefined ? value : internalValue;

  // Measure text width to position cursor
  useEffect(() => {
    if (mirrorRef.current) {
      setCursorLeft(mirrorRef.current.offsetWidth);
    }
  }, [displayValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div
      className={`
        flex items-center border rounded-lg overflow-hidden px-3 py-2.5 font-mono text-sm
        transition-all duration-300 backdrop-blur-sm
        ${colors.border} ${colors.bg} ${glow ? colors.shadow : ''}
        ${className}
      `}
    >
      {/* Prompt prefix */}
      {prompt && (
        <span className={`mr-2 font-mono select-none shrink-0 ${colors.prompt}`}>
          {prompt}
        </span>
      )}

      {/* Input wrapper — relative so cursor can be positioned inside */}
      <div className="relative flex-1 flex items-center">
        {/* Hidden mirror span to measure text width */}
        <span
          ref={mirrorRef}
          aria-hidden="true"
          className="absolute invisible whitespace-pre font-mono font-bold text-sm pointer-events-none"
        >
          {String(displayValue) || ''}
        </span>

        <input
          {...props}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full bg-transparent border-none outline-none font-mono font-bold
            placeholder-neon-green/20
            ${colors.text}
          `}
          style={{ caretColor: 'transparent' }}
        />

        {/* Blinking block cursor — positioned right after the text */}
        {focused && (
          <span
            aria-hidden="true"
            className="absolute top-1/2 -translate-y-1/2 animate-blink pointer-events-none text-xs leading-none"
            style={{
              left: `${cursorLeft}px`,
              color: colors.caret,
              textShadow: `0 0 6px ${colors.caret}`,
            }}
          >
            █
          </span>
        )}
      </div>
    </div>
  );
}
