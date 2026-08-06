'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CyberBreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const VARIANTS = {
  green: {
    text: 'text-neon-green',
    textActive: 'text-white/80',
    separator: 'text-neon-green/30',
  },
  cyan: {
    text: 'text-cyan-400',
    textActive: 'text-white/80',
    separator: 'text-cyan-500/30',
  },
  red: {
    text: 'text-rose-500',
    textActive: 'text-white/80',
    separator: 'text-rose-500/30',
  },
  amber: {
    text: 'text-amber-500',
    textActive: 'text-white/80',
    separator: 'text-amber-500/30',
  },
};

export default function CyberBreadcrumb({
  items,
  variant = 'green',
  className = '',
}: CyberBreadcrumbProps) {
  const styles = VARIANTS[variant];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider ${className}`}
    >
      {/* Root prompt symbol */}
      <span className={`${styles.text} font-bold mr-1`}>~</span>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className={`shrink-0 ${styles.separator}`}>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            )}
            
            {isLast ? (
              <span className={`${styles.textActive} font-bold`}>
                {item.label}
              </span>
            ) : item.href ? (
              <a
                href={item.href}
                className={`${styles.text} opacity-60 hover:opacity-100 transition-opacity`}
              >
                {item.label}
              </a>
            ) : (
              <span className={`${styles.text} opacity-60`}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
