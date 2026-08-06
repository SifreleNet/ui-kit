'use client';

import React from 'react';
import Link from 'next/link';

export default function ShowroomHeader() {
  return (
    <header className="border-b border-neon-green/13 bg-[#0c0c0c] px-6 py-4 flex items-center justify-between relative z-10 shrink-0 select-none">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-neon-green font-bold text-lg hover:text-shadow-glow transition-all">
          <span className="text-white/40">[</span>
          sifrele<span className="text-white">Net</span>
          <span className="text-white/40">]</span> UI_KIT
        </Link>
        <span className="text-[10px] bg-neon-green/8 border border-neon-green/27 px-2 py-0.5 rounded text-neon-green/80">
          v1.3.0_STABLE
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-xs text-neon-green/33">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          <span>SHOWROOM ONLINE</span>
        </div>
        <Link
          href="/"
          className="text-xs border border-[#1a2e1a] hover:border-neon-green/27 hover:text-white px-3 py-1.5 rounded transition-all duration-200"
        >
          ← back_to_home
        </Link>
      </div>
    </header>
  );
}
