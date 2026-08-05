'use client';

import React from 'react';

interface CyberActionCardProps {
  label: string;
  value: string;
  href?: string;
  command?: string;
  description?: string;
  icon?: string | React.ReactNode;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  target?: string;
  onClick?: () => void;
  className?: string;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a] hover:border-[#00ff9f44] hover:bg-[#00ff9f05]',
    text: 'text-[#00ff9f]',
    subText: 'text-[#00ff9f77]',
    dimText: 'text-[#00ff9f33]',
    accentText: 'text-[#00ff9f66] group-hover/link:text-[#00ff9f]',
    commandText: 'text-[#00ff9f55]',
  },
  cyan: {
    border: 'border-[#0a232e] hover:border-[#00f0ff44] hover:bg-[#00f0ff05]',
    text: 'text-[#00f0ff]',
    subText: 'text-[#00f0ff77]',
    dimText: 'text-[#00f0ff33]',
    accentText: 'text-[#00f0ff66] group-hover/link:text-[#00f0ff]',
    commandText: 'text-[#00f0ff55]',
  },
  red: {
    border: 'border-[#2d1212] hover:border-[#ff5f5744] hover:bg-[#ff5f5705]',
    text: 'text-[#ff5f57]',
    subText: 'text-[#ff5f5777]',
    dimText: 'text-[#ff5f5733]',
    accentText: 'text-[#ff5f5766] group-hover/link:text-[#ff5f57]',
    commandText: 'text-[#ff5f5755]',
  },
  amber: {
    border: 'border-[#2e230a] hover:border-[#febc2e44] hover:bg-[#febc2e05]',
    text: 'text-[#febc2e]',
    subText: 'text-[#febc2e77]',
    dimText: 'text-[#febc2e33]',
    accentText: 'text-[#febc2e66] group-hover/link:text-[#febc2e]',
    commandText: 'text-[#febc2e55]',
  },
};

export default function CyberActionCard({
  label,
  value,
  href,
  command,
  description,
  icon = '[◈]',
  variant = 'green',
  target,
  onClick,
  className = '',
}: CyberActionCardProps) {
  const colors = COLOR_MAP[variant];

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`
            flex items-start gap-4 p-4 border rounded transition-all duration-300 group/link cursor-pointer
            ${colors.border} ${className}
          `}
        >
          {children}
        </a>
      );
    }

    return (
      <div
        onClick={onClick}
        className={`
          flex items-start gap-4 p-4 border rounded transition-all duration-300 group/link cursor-pointer
          ${colors.border} ${className}
        `}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Command prompt above card */}
      {command && (
        <p className={`text-xs font-mono mb-2 select-none ${colors.commandText}`}>
          {command}
        </p>
      )}

      {/* Interactive Link Card */}
      <CardWrapper>
        {/* Left Side: Icon */}
        <span className={`font-mono text-sm shrink-0 transition-colors ${colors.accentText}`}>
          {icon}
        </span>

        {/* Center: Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className={`text-sm font-bold font-mono group-hover/link:text-shadow-glow transition-all ${colors.text}`}>
              {label}
            </span>
            {description && (
              <span className={`text-xs font-mono ${colors.dimText}`}>
                {description}
              </span>
            )}
          </div>
          <span className={`text-xs font-mono truncate block transition-colors ${colors.subText}`}>
            {value}
          </span>
        </div>

        {/* Right Side: Arrow Indicator */}
        <span className={`text-sm transition-colors shrink-0 ${colors.dimText} group-hover/link:${colors.text}`}>
          →
        </span>
      </CardWrapper>
    </div>
  );
}
