'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  trigger: string;
  content: React.ReactNode;
}

interface CyberAccordionProps {
  items: AccordionItem[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  allowMultiple?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/20',
    borderActive: 'border-neon-green/50',
    text: 'text-neon-green',
    bg: 'bg-neon-green/5',
  },
  cyan: {
    border: 'border-cyan-500/20',
    borderActive: 'border-cyan-500/50',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/5',
  },
  red: {
    border: 'border-rose-500/20',
    borderActive: 'border-rose-500/50',
    text: 'text-rose-500',
    bg: 'bg-rose-500/5',
  },
  amber: {
    border: 'border-amber-500/20',
    borderActive: 'border-amber-500/50',
    text: 'text-amber-500',
    bg: 'bg-amber-500/5',
  },
};

export default function CyberAccordion({
  items,
  variant = 'green',
  allowMultiple = false,
  className = '',
}: CyberAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const styles = VARIANTS[variant];

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`w-full flex flex-col gap-2 font-mono text-xs ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`border rounded overflow-hidden transition-all duration-300 bg-black/40 backdrop-blur-sm ${
              isOpen ? styles.borderActive : styles.border
            }`}
          >
            {/* Header / Trigger */}
            <button
              onClick={() => toggle(item.id)}
              className={`w-full px-4 py-3 flex items-center justify-between text-left font-bold uppercase tracking-wider transition-colors cursor-pointer select-none ${
                isOpen ? `${styles.bg} ${styles.text}` : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="opacity-50">{isOpen ? '[-]' : '[+]'}</span>
                <span>{item.trigger}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 shrink-0 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {/* Content Panel */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[500px] border-t border-neutral-950' : 'max-h-0'
              }`}
            >
              <div className="p-4 text-white/70 leading-relaxed text-[11px] whitespace-pre-wrap select-text">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
