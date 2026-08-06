'use client';

import React from 'react';

interface CyberSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    trackActive: 'bg-neon-green/20 border-neon-green',
    thumbActive: 'bg-neon-green shadow-[0_0_8px_var(--neon-green)]',
    text: 'text-neon-green',
    trackInactive: 'bg-black border-[#1a2e1a]',
    thumbInactive: 'bg-[#1a2e1a]',
  },
  cyan: {
    trackActive: 'bg-[#00f0ff33] border-[#00f0ff]',
    thumbActive: 'bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]',
    text: 'text-[#00f0ff]',
    trackInactive: 'bg-black border-[#0a232e]',
    thumbInactive: 'bg-[#0a232e]',
  },
  red: {
    trackActive: 'bg-[#ff5f5733] border-[#ff5f57]',
    thumbActive: 'bg-[#ff5f57] shadow-[0_0_8px_#ff5f57]',
    text: 'text-[#ff5f57]',
    trackInactive: 'bg-black border-[#2d1212]',
    thumbInactive: 'bg-[#2d1212]',
  },
  amber: {
    trackActive: 'bg-[#febc2e33] border-[#febc2e]',
    thumbActive: 'bg-[#febc2e] shadow-[0_0_8px_#febc2e]',
    text: 'text-[#febc2e]',
    trackInactive: 'bg-black border-[#2e230a]',
    thumbInactive: 'bg-[#2e230a]',
  },
};

export default function CyberSwitch({
  checked,
  onChange,
  label,
  variant = 'green',
  disabled = false,
  className = '',
}: CyberSwitchProps) {
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
        inline-flex items-center gap-3 cursor-pointer select-none font-mono text-xs
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {/* Switch Track */}
      <div
        className={`
          w-10 h-5 rounded-full border transition-all duration-300 relative flex items-center px-0.5
          ${checked ? colors.trackActive : colors.trackInactive}
        `}
      >
        {/* Switch Thumb */}
        <div
          className={`
            w-3.5 h-3.5 rounded-full transition-all duration-300 transform
            ${checked ? 'translate-x-5' : 'translate-x-0'}
            ${checked ? colors.thumbActive : colors.thumbInactive}
          `}
        />
      </div>

      {/* Label */}
      {label && (
        <span className={`font-semibold tracking-wider ${checked ? colors.text : 'text-neutral-500'}`}>
          {label}
        </span>
      )}
    </div>
  );
}
