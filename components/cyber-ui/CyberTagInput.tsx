'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';

interface CyberTagInputProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a] focus-within:border-neon-green',
    text: 'text-neon-green',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,255,159,0.2)]',
    tag: 'bg-neon-green/10 border-neon-green/30 text-neon-green',
    tagHover: 'hover:bg-neon-green/20',
  },
  cyan: {
    border: 'border-[#0a232e] focus-within:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    tag: 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff]',
    tagHover: 'hover:bg-[#00f0ff]/20',
  },
  red: {
    border: 'border-[#2d1212] focus-within:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(255,95,87,0.2)]',
    tag: 'bg-[#ff5f57]/10 border-[#ff5f57]/30 text-[#ff5f57]',
    tagHover: 'hover:bg-[#ff5f57]/20',
  },
  amber: {
    border: 'border-[#2e230a] focus-within:border-[#febc2e]',
    text: 'text-[#febc2e]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(254,188,46,0.2)]',
    tag: 'bg-[#febc2e]/10 border-[#febc2e]/30 text-[#febc2e]',
    tagHover: 'hover:bg-[#febc2e]/20',
  },
};

export default function CyberTagInput({
  variant = 'green',
  tags,
  onChange,
  placeholder = 'Add tag... (Enter)',
  maxTags,
  glow = true,
  className = '',
}: CyberTagInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const c = COLOR_MAP[variant];

  const addTag = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    if (maxTags && tags.length >= maxTags) return;
    onChange([...tags, trimmed]);
    setInput('');
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`
        flex flex-wrap gap-1.5 items-center border rounded-lg px-3 py-2
        bg-black/40 backdrop-blur-sm cursor-text font-mono text-sm
        transition-all duration-300
        ${c.border} ${glow ? c.shadow : ''}
        ${className}
      `}
    >
      {tags.map((tag, i) => (
        <span
          key={tag}
          className={`
            flex items-center gap-1 px-2 py-0.5 rounded border text-xs
            transition-colors ${c.tag} ${c.tagHover}
          `}
        >
          <span>[{tag}]</span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(i); }}
            className="opacity-50 hover:opacity-100 cursor-pointer leading-none text-[10px]"
          >
            ✕
          </button>
        </span>
      ))}

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={tags.length === 0 ? placeholder : ''}
        disabled={!!(maxTags && tags.length >= maxTags)}
        className={`
          flex-1 min-w-[120px] bg-transparent border-none outline-none
          font-mono text-sm placeholder-current placeholder-opacity-20
          ${c.text}
        `}
        style={{ caretColor: 'currentColor' }}
      />

      {maxTags && (
        <span className="ml-auto text-[9px] text-white/20 shrink-0">
          {tags.length}/{maxTags}
        </span>
      )}
    </div>
  );
}
