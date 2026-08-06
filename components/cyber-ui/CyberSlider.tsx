'use client';

import React from 'react';

interface CyberSliderProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  showTicks?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    text: 'text-neon-green',
    accent: 'accent-neon-green',
    track: 'bg-neon-green/20',
  },
  cyan: {
    text: 'text-cyan-400',
    accent: 'accent-cyan-400',
    track: 'bg-cyan-500/20',
  },
  red: {
    text: 'text-rose-500',
    accent: 'accent-rose-500',
    track: 'bg-rose-500/20',
  },
  amber: {
    text: 'text-amber-500',
    accent: 'accent-amber-500',
    track: 'bg-amber-500/20',
  },
};

export default function CyberSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  variant = 'green',
  showTicks = false,
  className = '',
}: CyberSliderProps) {
  const styles = VARIANTS[variant];

  // Calculate percentage for progress styling if needed
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full flex flex-col gap-1.5 font-mono text-xs ${className}`}>
      {/* Slider Header info */}
      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
        {label && <span className="text-white/60">{label}</span>}
        <span className={styles.text}>
          [ {value} / {max} ]
        </span>
      </div>

      {/* Slider Input bar wrapper */}
      <div className="relative flex items-center h-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={`w-full h-1 bg-neutral-900 border border-neutral-800 rounded outline-none cursor-pointer appearance-none ${styles.accent}`}
          style={{
            background: `linear-gradient(to right, var(--neon-green) 0%, var(--neon-green) ${percent}%, #171717 ${percent}%, #171717 100%)`.replace(
              /var\(--neon-green\)/g,
              variant === 'green'
                ? 'var(--neon-green)'
                : variant === 'cyan'
                ? '#22d3ee'
                : variant === 'red'
                ? '#f43f5e'
                : '#f59e0b'
            ),
          }}
        />
      </div>

      {/* Optional Scale Ticks */}
      {showTicks && (
        <div className="flex justify-between px-1 text-[8px] text-white/30 select-none">
          <span>MIN</span>
          <span>MID</span>
          <span>MAX</span>
        </div>
      )}
    </div>
  );
}
