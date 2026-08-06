'use client';

import React from 'react';
import { COMPONENT_REGISTRY, CATEGORIES } from './componentRegistry';

interface ShowroomSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ShowroomSidebar({ activeTab, setActiveTab }: ShowroomSidebarProps) {
  return (
    <aside className="w-full md:w-64 border-r border-neon-green/7 bg-[#090909]/90 overflow-y-auto p-4 flex flex-col gap-6 shrink-0 select-none">
      {/* Getting Started */}
      <div>
        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2">
          00 // GETTING STARTED
        </div>
        <button
          onClick={() => setActiveTab('installation')}
          className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
            activeTab === 'installation'
              ? 'bg-neon-green/5 text-neon-green border-neon-green/20'
              : 'text-neon-green/40 border-transparent hover:text-neon-green hover:bg-white/5'
          }`}
        >
          ⚡ system_installation
        </button>
      </div>

      {/* Dynamic categories from registry */}
      {CATEGORIES.map((cat, catIndex) => {
        const components = COMPONENT_REGISTRY.filter((c) => c.category === cat.key);
        return (
          <div key={cat.key}>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2">
              {String(catIndex + 1).padStart(2, '0')} {'// '}{cat.label}
            </div>
            <ul className="space-y-1">
              {components.map((comp) => (
                <li key={comp.name}>
                  <button
                    onClick={() => setActiveTab(comp.name)}
                    className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                      activeTab === comp.name
                        ? 'bg-neon-green/5 text-neon-green border-neon-green/20'
                        : 'text-neon-green/40 border-transparent hover:text-neon-green hover:bg-white/5'
                    }`}
                  >
                    {cat.icon} {comp.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}
