'use client';

import React from 'react';

interface CyberPaginationProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
}

const COLOR_MAP = {
  green: { active: 'bg-neon-green/10 text-neon-green border-neon-green/40', hover: 'hover:bg-neon-green/5 hover:text-neon-green hover:border-neon-green/20', text: 'text-neon-green', border: 'border-[#1a2e1a]' },
  cyan:  { active: 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/40', hover: 'hover:bg-[#00f0ff]/5 hover:text-[#00f0ff] hover:border-[#00f0ff]/20', text: 'text-[#00f0ff]', border: 'border-[#0a232e]' },
  red:   { active: 'bg-[#ff5f57]/10 text-[#ff5f57] border-[#ff5f57]/40', hover: 'hover:bg-[#ff5f57]/5 hover:text-[#ff5f57] hover:border-[#ff5f57]/20', text: 'text-[#ff5f57]', border: 'border-[#2d1212]' },
  amber: { active: 'bg-[#febc2e]/10 text-[#febc2e] border-[#febc2e]/40', hover: 'hover:bg-[#febc2e]/5 hover:text-[#febc2e] hover:border-[#febc2e]/20', text: 'text-[#febc2e]', border: 'border-[#2e230a]' },
};

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

export default function CyberPagination({
  variant = 'green',
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
}: CyberPaginationProps) {
  const c = COLOR_MAP[variant];
  const pages = getPages(currentPage, totalPages);

  const btn = (label: React.ReactNode, page: number, disabled: boolean, extraClass = '') => (
    <button
      key={String(label)}
      onClick={() => !disabled && onPageChange(page)}
      disabled={disabled}
      className={`
        min-w-[36px] h-9 px-2 flex items-center justify-center
        border rounded font-mono text-xs transition-all duration-200
        ${disabled ? 'opacity-20 cursor-not-allowed border-white/10 text-white/30' : `cursor-pointer ${c.hover} border-white/10`}
        ${extraClass}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center gap-1 font-mono text-xs select-none">
      {showFirstLast && btn('«', 1, currentPage === 1)}
      {btn('‹', currentPage - 1, currentPage === 1)}

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-1 text-white/20 text-xs">···</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`
              min-w-[36px] h-9 px-2 flex items-center justify-center
              border rounded font-mono text-xs transition-all duration-200 cursor-pointer
              ${p === currentPage ? c.active : `border-white/10 text-white/40 ${c.hover}`}
            `}
          >
            {p}
          </button>
        )
      )}

      {btn('›', currentPage + 1, currentPage === totalPages)}
      {showFirstLast && btn('»', totalPages, currentPage === totalPages)}

      <span className="ml-2 text-white/20 text-[10px] font-mono">
        {currentPage}/{totalPages}
      </span>
    </div>
  );
}
