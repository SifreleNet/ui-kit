'use client';

import React, { useState } from 'react';
import { COMPONENT_REGISTRY, CATEGORIES } from './componentRegistry';

interface ShowroomSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ShowroomSidebar({ activeTab, setActiveTab }: ShowroomSidebarProps) {
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();

  const filteredRegistry = query
    ? COMPONENT_REGISTRY.filter((c) => c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query))
    : null;

  return (
    <aside className="w-full md:w-64 border-r border-neon-green/7 bg-[#090909]/90 overflow-y-auto p-4 flex flex-col gap-4 shrink-0 select-none">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neon-green/30 text-xs pointer-events-none">⌕</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search components..."
          className="w-full bg-black/40 border border-[#1a2e1a] rounded px-7 py-1.5 text-[11px] font-mono text-neon-green placeholder-neon-green/20 outline-none focus:border-neon-green/30 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-neon-green/30 hover:text-neon-green text-xs cursor-pointer">✕</button>
        )}
      </div>

      {/* Search results */}
      {filteredRegistry ? (
        <div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2">
            {filteredRegistry.length} result{filteredRegistry.length !== 1 ? 's' : ''}
          </div>
          <ul className="space-y-1">
            {filteredRegistry.map((comp) => (
              <li key={comp.name}>
                <button
                  onClick={() => { setActiveTab(comp.name); setSearch(''); }}
                  className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                    activeTab === comp.name
                      ? 'bg-neon-green/5 text-neon-green border-neon-green/20'
                      : 'text-neon-green/40 border-transparent hover:text-neon-green hover:bg-white/5'
                  }`}
                >
                  {comp.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
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
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2 flex items-center justify-between">
                  <span>{String(catIndex + 1).padStart(2, '0')} {'// '}{cat.label}</span>
                  <span className="opacity-50">{components.length}</span>
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
        </>
      )}
    </aside>
  );
}
