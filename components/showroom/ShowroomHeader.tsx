'use client';

import React from 'react';
import Link from 'next/link';

export default function ShowroomHeader() {
  return (
    <header className="border-b border-[#00ff9f22] bg-[#0c0c0c] px-6 py-4 flex items-center justify-between relative z-10 shrink-0 select-none">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-[#00ff9f] font-bold text-lg hover:text-shadow-glow transition-all">
          <span className="text-white/40">[</span>
          sifrele<span className="text-white">Net</span>
          <span className="text-white/40">]</span> UI_KIT
        </Link>
        <span className="text-[10px] bg-[#00ff9f15] border border-[#00ff9f44] px-2 py-0.5 rounded text-[#00ff9fcc]">
          v1.3.0_STABLE
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-xs text-[#00ff9f55]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] animate-pulse" />
          <span>SHOWROOM ONLINE</span>
        </div>
        <Link
          href="/"
          className="text-xs border border-[#1a2e1a] hover:border-[#00ff9f44] hover:text-white px-3 py-1.5 rounded transition-all duration-200"
        >
          ← back_to_home
        </Link>
      </div>
    </header>
  );
}
