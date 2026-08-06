'use client';

import React, { useState } from 'react';

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
  },
  cyan: {
    border: 'border-[#0a232e] focus-within:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    prompt: 'text-[#00f0ff88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    bg: 'bg-black/40',
  },
  red: {
    border: 'border-[#2d1212] focus-within:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    prompt: 'text-[#ff5f5788]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(255,95,87,0.2)]',
    bg: 'bg-black/40',
  },
  amber: {
    border: 'border-[#2e230a] focus-within:border-[#febc2e]',
    text: 'text-[#febc2e]',
    prompt: 'text-[#febc2e88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(254,188,46,0.2)]',
    bg: 'bg-black/40',
  },
};

export default function CyberInput({
  variant = 'green',
  prompt = '$',
  glow = true,
  className = '',
  ...props
}: CyberInputProps) {
  const [focused, setFocused] = useState(false);
  const colors = COLOR_MAP[variant];

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
        <span className={`mr-2 font-mono select-none ${colors.prompt}`}>
          {prompt}
        </span>
      )}

      {/* Input */}
      <input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (props.onBlur) props.onBlur(e);
        }}
        className={`
          flex-1 bg-transparent border-none outline-none font-mono font-bold
          placeholder-neon-green/20
          ${colors.text}
        `}
      />

      {/* Blinking cursor at the end (active only when focused) */}
      {focused && (
        <span className={`animate-blink text-xs ml-1 ${colors.text}`}>
          █
        </span>
      )}
    </div>
  );
}
