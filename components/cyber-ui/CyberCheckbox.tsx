'use client';

import React from 'react';

interface CyberCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    borderActive: 'border-neon-green',
    bgActive: 'bg-neon-green/10',
    text: 'text-neon-green',
    glow: 'shadow-[0_0_8px_rgba(0,255,159,0.4)]',
    borderInactive: 'border-[#1a2e1a] hover:border-neon-green/20',
  },
  cyan: {
    borderActive: 'border-[#00f0ff]',
    bgActive: 'bg-[#00f0ff1a]',
    text: 'text-[#00f0ff]',
    glow: 'shadow-[0_0_8px_rgba(0,240,255,0.4)]',
    borderInactive: 'border-[#0a232e] hover:border-[#00f0ff33]',
  },
  red: {
    borderActive: 'border-[#ff5f57]',
    bgActive: 'bg-[#ff5f571a]',
    text: 'text-[#ff5f57]',
    glow: 'shadow-[0_0_8px_rgba(255,95,87,0.4)]',
    borderInactive: 'border-[#2d1212] hover:border-[#ff5f5733]',
  },
  amber: {
    borderActive: 'border-[#febc2e]',
    bgActive: 'bg-[#febc2e1a]',
    text: 'text-[#febc2e]',
    glow: 'shadow-[0_0_8px_rgba(254,188,46,0.4)]',
    borderInactive: 'border-[#2e230a] hover:border-[#febc2e33]',
  },
};

export default function CyberCheckbox({
  checked,
  onChange,
  label,
  variant = 'green',
  disabled = false,
  className = '',
}: CyberCheckboxProps) {
  const colors = COLOR_MAP[variant];

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`
        inline-flex items-center gap-2.5 cursor-pointer select-none font-mono text-xs
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {/* Checkbox Box */}
      <div
        className={`
          w-4 h-4 border flex items-center justify-center transition-all duration-200 shrink-0
          ${checked ? `${colors.borderActive} ${colors.bgActive} ${colors.glow}` : colors.borderInactive}
          bg-black/40 rounded-sm
        `}
      >
        {/* Checkmark indicator - rendering a small cyberpunk diamond/bullet */}
        {checked && (
          <div className={`w-1.5 h-1.5 rotate-[45deg] bg-current ${colors.text}`} />
        )}
      </div>

      {/* Label */}
      {label && (
        <span className={`font-mono text-xs ${checked ? colors.text : 'text-neutral-500'}`}>
          {label}
        </span>
      )}
    </div>
  );
}
