'use client';

import React from 'react';

interface CyberNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  glow?: boolean;
}

const COLOR_MAP = {
  green: { border: 'border-[#1a2e1a] focus-within:border-neon-green', text: 'text-neon-green', btn: 'hover:bg-neon-green/10 active:bg-neon-green/20 text-neon-green/60 hover:text-neon-green', shadow: 'focus-within:shadow-[0_0_15px_rgba(0,255,159,0.2)]' },
  cyan:  { border: 'border-[#0a232e] focus-within:border-[#00f0ff]', text: 'text-[#00f0ff]', btn: 'hover:bg-[#00f0ff]/10 active:bg-[#00f0ff]/20 text-[#00f0ff]/60 hover:text-[#00f0ff]', shadow: 'focus-within:shadow-[0_0_15px_rgba(0,240,255,0.2)]' },
  red:   { border: 'border-[#2d1212] focus-within:border-[#ff5f57]', text: 'text-[#ff5f57]', btn: 'hover:bg-[#ff5f57]/10 active:bg-[#ff5f57]/20 text-[#ff5f57]/60 hover:text-[#ff5f57]', shadow: 'focus-within:shadow-[0_0_15px_rgba(255,95,87,0.2)]' },
  amber: { border: 'border-[#2e230a] focus-within:border-[#febc2e]', text: 'text-[#febc2e]', btn: 'hover:bg-[#febc2e]/10 active:bg-[#febc2e]/20 text-[#febc2e]/60 hover:text-[#febc2e]', shadow: 'focus-within:shadow-[0_0_15px_rgba(254,188,46,0.2)]' },
};

export default function CyberNumberInput({
  variant = 'green',
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  glow = true,
  className = '',
  ...props
}: CyberNumberInputProps) {
  const c = COLOR_MAP[variant];

  const clamp = (v: number) => {
    let val = v;
    if (min !== undefined) val = Math.max(min, val);
    if (max !== undefined) val = Math.min(max, val);
    return val;
  };

  const decrement = () => onChange(clamp(value - step));
  const increment = () => onChange(clamp(value + step));

  return (
    <div className={`flex flex-col gap-1 font-mono ${className}`}>
      {label && (
        <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
      )}
      <div
        className={`
          flex items-center border rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm
          transition-all duration-300
          ${c.border} ${glow ? c.shadow : ''}
        `}
      >
        {/* Decrement */}
        <button
          type="button"
          onClick={decrement}
          disabled={min !== undefined && value <= min}
          className={`px-3 py-2.5 text-sm border-r border-inherit transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed ${c.btn}`}
        >
          −
        </button>

        {/* Input */}
        <input
          {...props}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(clamp(parseFloat(e.target.value) || 0))}
          className={`
            flex-1 bg-transparent border-none outline-none text-center
            font-mono font-bold text-sm py-2.5
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            ${c.text}
          `}
          style={{ caretColor: 'transparent' }}
        />

        {/* Increment */}
        <button
          type="button"
          onClick={increment}
          disabled={max !== undefined && value >= max}
          className={`px-3 py-2.5 text-sm border-l border-inherit transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed ${c.btn}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
