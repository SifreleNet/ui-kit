'use client';

import React from 'react';
import { ComponentMeta } from './componentRegistry';

interface DynamicPlaygroundProps {
  meta: ComponentMeta;
  props: Record<string, any>;
}

export function DynamicPlayground({ meta, props }: DynamicPlaygroundProps) {
  const isFullscreen = meta.category === 'animations' || ['TerminalHero', 'HackerDashboard'].includes(meta.name);

  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      {/* Preview label */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 shrink-0">
          <span>⚡ PLAYGROUND //</span>
          <span className="text-neon-green font-mono">{meta.name}</span>
        </h3>
        <span className="text-[10px] text-white/30 font-mono uppercase truncate">{meta.description}</span>
      </div>

      {/* key on meta.name forces a full remount when switching components, resetting internal state */}
      <div
        key={meta.name}
        className={`flex-1 min-h-[350px] max-h-[600px] overflow-y-auto border border-neon-green/13 bg-[#080808]/90 rounded-lg flex items-center justify-center relative scrollbar-thin ${isFullscreen ? 'p-0' : 'p-6'}`}
      >
        {meta.preview(props)}
      </div>
    </div>
  );
}
