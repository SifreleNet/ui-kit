'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Settings, ShieldAlert, Cpu, Eye, X } from 'lucide-react';

interface CommandOption {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface CyberCommandMenuProps {
  options: CommandOption[];
  triggerKey?: string; // e.g. "k" (combined with metaKey/ctrlKey) or "/"
  placeholder?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/30 bg-[#0a0a0ae6]',
    text: 'text-neon-green',
    bgActive: 'bg-neon-green/10',
    borderActive: 'border-neon-green/50',
    outline: 'outline-neon-green/40',
  },
  cyan: {
    border: 'border-cyan-500/30 bg-[#0a0a0ae6]',
    text: 'text-cyan-400',
    bgActive: 'bg-cyan-500/10',
    borderActive: 'border-cyan-500/50',
    outline: 'outline-cyan-500/40',
  },
  red: {
    border: 'border-rose-500/30 bg-[#0a0a0ae6]',
    text: 'text-rose-500',
    bgActive: 'bg-rose-500/10',
    borderActive: 'border-rose-500/50',
    outline: 'outline-rose-500/40',
  },
  amber: {
    border: 'border-amber-500/30 bg-[#0a0a0ae6]',
    text: 'text-amber-500',
    bgActive: 'bg-amber-500/10',
    borderActive: 'border-amber-500/50',
    outline: 'outline-amber-500/40',
  },
};

export default function CyberCommandMenu({
  options,
  triggerKey = 'k',
  placeholder = 'RUN DIAGNOSTIC COMMAND...',
  variant = 'green',
}: CyberCommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const styles = VARIANTS[variant];

  // Hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === triggerKey.toLowerCase()) {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement !== inputRef.current) {
        // Only trigger "/" search if not currently focusing an input field
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerKey]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setActiveIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Filter options
  const filtered = options.filter(
    (opt) =>
      opt.title.toLowerCase().includes(search.toLowerCase()) ||
      opt.category.toLowerCase().includes(search.toLowerCase()) ||
      (opt.subtitle && opt.subtitle.toLowerCase().includes(search.toLowerCase()))
  );

  // Navigate options via keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        filtered[activeIndex].action();
        setOpen(false);
      }
    }
  };

  if (!open) return null;

  // Group by category
  const categories = Array.from(new Set(filtered.map((opt) => opt.category)));

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4 font-mono text-xs">
      <div
        ref={menuRef}
        onKeyDown={handleKeyDown}
        className={`w-full max-w-lg border rounded shadow-[0_0_30px_rgba(0,255,159,0.15)] flex flex-col overflow-hidden relative ${styles.border}`}
      >
        {/* CRT Scanlines Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 scanline-sweep opacity-[0.03]" />

        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-900 bg-black/60 shrink-0">
          <Search className={`w-4 h-4 shrink-0 ${styles.text}`} />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-white/20 outline-none text-xs tracking-wider"
          />
          <button
            onClick={() => setOpen(false)}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="flex-1 overflow-y-auto max-h-[300px] p-2 space-y-3 bg-black/40 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-white/30 uppercase tracking-widest">
              [ NO MATCHING PROTOCOLS FOUND ]
            </div>
          ) : (
            categories.map((cat) => {
              const catOptions = filtered.filter((opt) => opt.category === cat);
              return (
                <div key={cat} className="space-y-1">
                  <div className="px-3 py-1 text-[9px] font-bold text-white/30 uppercase tracking-widest">
                    {cat}
                  </div>
                  <div className="space-y-0.5">
                    {catOptions.map((opt) => {
                      const absoluteIndex = filtered.indexOf(opt);
                      const isActive = absoluteIndex === activeIndex;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            opt.action();
                            setOpen(false);
                          }}
                          onMouseEnter={() => setActiveIndex(absoluteIndex)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded border transition-all cursor-pointer ${
                            isActive
                              ? `${styles.bgActive} ${styles.borderActive} text-white`
                              : 'border-transparent text-white/60 hover:text-white'
                          }`}
                        >
                          <div className={`shrink-0 ${isActive ? styles.text : 'text-white/30'}`}>
                            {opt.icon || <Terminal className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold tracking-wider uppercase">{opt.title}</p>
                            {opt.subtitle && (
                              <p className={`text-[10px] truncate ${isActive ? 'text-white/60' : 'text-white/30'}`}>
                                {opt.subtitle}
                              </p>
                            )}
                          </div>
                          {isActive && (
                            <span className={`text-[10px] font-bold animate-pulse ${styles.text}`}>
                              [ RUN ]
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-neutral-900 bg-black/80 flex items-center justify-between text-[9px] text-white/30 uppercase shrink-0">
          <div className="flex gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div>
            <span>Trigger: <kbd className="bg-white/5 border border-white/10 px-1 rounded">⌘ {triggerKey.toUpperCase()}</kbd></span>
          </div>
        </div>
      </div>
    </div>
  );
}
