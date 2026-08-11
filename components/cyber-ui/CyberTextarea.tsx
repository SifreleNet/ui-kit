'use client';

import React, { useState } from 'react';

interface CyberTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  prompt?: string;
  glow?: boolean;
  rows?: number;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a] focus-within:border-neon-green',
    text: 'text-neon-green',
    prompt: 'text-neon-green/50',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,255,159,0.15)]',
    bg: 'bg-black/40',
    scrollbar: '#00ff9f',
  },
  cyan: {
    border: 'border-[#0a232e] focus-within:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    prompt: 'text-[#00f0ff80]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,240,255,0.15)]',
    bg: 'bg-black/40',
    scrollbar: '#00f0ff',
  },
  red: {
    border: 'border-[#2d1212] focus-within:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    prompt: 'text-[#ff5f5780]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(255,95,87,0.15)]',
    bg: 'bg-black/40',
    scrollbar: '#ff5f57',
  },
  amber: {
    border: 'border-[#2e230a] focus-within:border-[#febc2e]',
    text: 'text-[#febc2e]',
    prompt: 'text-[#febc2e80]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(254,188,46,0.15)]',
    bg: 'bg-black/40',
    scrollbar: '#febc2e',
  },
};

export default function CyberTextarea({
  variant = 'green',
  prompt,
  glow = true,
  rows = 4,
  className = '',
  ...props
}: CyberTextareaProps) {
  const [focused, setFocused] = useState(false);
  const colors = COLOR_MAP[variant];

  return (
    <div
      className={`
        border rounded-lg overflow-hidden font-mono text-sm
        transition-all duration-300 backdrop-blur-sm
        ${colors.border} ${colors.bg} ${glow && focused ? colors.shadow : ''}
        ${className}
      `}
    >
      {/* Header bar with prompt */}
      {prompt && (
        <div className={`flex items-center gap-2 px-3 py-2 border-b border-inherit ${colors.prompt} text-xs`}>
          <span className="select-none">{prompt}</span>
          <div className="flex-1 h-px opacity-20" style={{ background: 'currentColor' }} />
        </div>
      )}

      {/* Textarea */}
      <textarea
        {...props}
        rows={rows}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={`
          w-full bg-transparent border-none outline-none font-mono text-sm leading-6
          px-3 py-2.5 resize-y
          placeholder-current placeholder-opacity-20
          ${colors.text}
        `}
        style={{
          caretColor: colors.scrollbar,
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.scrollbar}33 transparent`,
          minHeight: `${rows * 1.5}rem`,
        }}
      />

      {/* Footer — line/char count */}
      <div className={`flex items-center justify-between px-3 py-1 border-t border-inherit text-[10px] ${colors.prompt} select-none`}>
        <span className="opacity-60">[ STDIN ]</span>
        <span className="opacity-60 font-mono">
          {String(props.value ?? '').split('\n').length} lines
        </span>
      </div>
    </div>
  );
}
