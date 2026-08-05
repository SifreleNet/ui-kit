'use client';

import React from 'react';

interface CyberStatusLineProps {
  status?: string;
  detail?: string;
  count?: number | string;
  address?: string;
  stateColor?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const COLOR_MAP = {
  green: 'bg-[#28c840]',
  cyan: 'bg-[#00f0ff]',
  red: 'bg-[#ff5f57]',
  amber: 'bg-[#febc2e]',
};

export default function CyberStatusLine({
  status = 'scan complete',
  detail = 'entries indexed',
  count,
  address = '192.168.1.42:~/projects',
  stateColor = 'green',
  className = '',
}: CyberStatusLineProps) {
  const dotColor = COLOR_MAP[stateColor] || 'bg-[#28c840]';

  return (
    <div
      className={`
        flex items-center gap-2 font-mono text-xs text-[#00ff9f44] w-full select-none
        ${className}
      `}
    >
      {/* Blinking State Dot */}
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />

      {/* Main Status Text */}
      <span>
        {status} &mdash;{' '}
        {count !== undefined && (
          <span className="text-[#00ff9f66] font-bold mr-1">{count}</span>
        )}
        <span>{detail}</span>
      </span>

      {/* Right Aligned Host Address */}
      {address && (
        <span className="ml-auto text-[#00ff9f22] font-mono hover:text-[#00ff9f44] transition-colors duration-200">
          {address}
        </span>
      )}
    </div>
  );
}
