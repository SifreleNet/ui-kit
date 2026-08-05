'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
  count?: number | string;
}

interface CyberTabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onChange: (id: string) => void;
  labelPrefix?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const COLOR_MAP = {
  green: {
    active: 'border-[#00ff9f] text-[#00ff9f] bg-[#00ff9f11] shadow-[0_0_10px_#00ff9f22]',
    inactive: 'border-[#1a2e1a] text-[#00ff9f55] hover:border-[#00ff9f44] hover:text-[#00ff9f88]',
    count: 'text-[#00ff9f55]',
    prefix: 'text-[#00ff9f44]',
    container: 'border-[#1a2e1a] bg-[#0d0d0dcc]',
  },
  cyan: {
    active: 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff11] shadow-[0_0_10px_#00f0ff22]',
    inactive: 'border-[#0a232e] text-[#00f0ff55] hover:border-[#00f0ff44] hover:text-[#00f0ff88]',
    count: 'text-[#00f0ff55]',
    prefix: 'text-[#00f0ff44]',
    container: 'border-[#0a232e] bg-[#0d0d0dcc]',
  },
  red: {
    active: 'border-[#ff5f57] text-[#ff5f57] bg-[#ff5f5711] shadow-[0_0_10px_#ff5f5722]',
    inactive: 'border-[#2d1212] text-[#ff5f5755] hover:border-[#ff5f5744] hover:text-[#ff5f5788]',
    count: 'text-[#ff5f5755]',
    prefix: 'text-[#ff5f5744]',
    container: 'border-[#2d1212] bg-[#0d0d0dcc]',
  },
  amber: {
    active: 'border-[#febc2e] text-[#febc2e] bg-[#febc2e11] shadow-[0_0_10px_#febc2e22]',
    inactive: 'border-[#2e230a] text-[#febc2e55] hover:border-[#febc2e44] hover:text-[#febc2e88]',
    count: 'text-[#febc2e55]',
    prefix: 'text-[#febc2e44]',
    container: 'border-[#2e230a] bg-[#0d0d0dcc]',
  },
};

export default function CyberTabs({
  tabs,
  activeTabId,
  onChange,
  labelPrefix = 'filter:',
  variant = 'green',
  className = '',
}: CyberTabsProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div
      className={`
        flex flex-wrap gap-2 p-3 border rounded-lg backdrop-blur-sm select-none
        ${colors.container} ${className}
      `}
    >
      {/* Prefix */}
      {labelPrefix && (
        <span className={`text-xs font-mono self-center mr-1 ${colors.prefix}`}>
          {labelPrefix}
        </span>
      )}

      {/* Tab Buttons */}
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              text-xs font-mono px-3 py-1.5 rounded border transition-all duration-200 cursor-pointer
              ${isActive ? colors.active : colors.inactive}
            `}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`ml-1.5 font-bold ${colors.count}`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
