'use client';

import React from 'react';

type Trend = 'up' | 'down' | 'neutral';

interface CyberStatProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  label: string;
  value: string | number;
  unit?: string;
  trend?: Trend;
  trendValue?: string;
  icon?: React.ReactNode;
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: { text: 'text-neon-green', border: 'border-[#1a2e1a]', glow: 'shadow-[0_0_20px_rgba(0,255,159,0.1)]', dim: 'text-neon-green/40' },
  cyan:  { text: 'text-[#00f0ff]', border: 'border-[#0a232e]', glow: 'shadow-[0_0_20px_rgba(0,240,255,0.1)]', dim: 'text-[#00f0ff]/40' },
  red:   { text: 'text-[#ff5f57]', border: 'border-[#2d1212]', glow: 'shadow-[0_0_20px_rgba(255,95,87,0.1)]', dim: 'text-[#ff5f57]/40' },
  amber: { text: 'text-[#febc2e]', border: 'border-[#2e230a]', glow: 'shadow-[0_0_20px_rgba(254,188,46,0.1)]', dim: 'text-[#febc2e]/40' },
};

const TREND_MAP: Record<Trend, { symbol: string; color: string }> = {
  up:      { symbol: '▲', color: 'text-neon-green' },
  down:    { symbol: '▼', color: 'text-[#ff5f57]' },
  neutral: { symbol: '●', color: 'text-white/40' },
};

export default function CyberStat({
  variant = 'green',
  label,
  value,
  unit,
  trend,
  trendValue,
  icon,
  glow = true,
  className = '',
}: CyberStatProps) {
  const c = COLOR_MAP[variant];
  const t = trend ? TREND_MAP[trend] : null;

  return (
    <div
      className={`
        border rounded-lg bg-black/40 backdrop-blur-sm p-4 font-mono
        transition-all duration-300
        ${c.border} ${glow ? c.glow : ''}
        ${className}
      `}
    >
      {/* Label */}
      <div className={`text-[10px] uppercase tracking-widest mb-3 flex items-center justify-between ${c.dim}`}>
        <span>{label}</span>
        {icon && <span className="text-base">{icon}</span>}
      </div>

      {/* Value */}
      <div className={`flex items-baseline gap-1 ${c.text}`}>
        <span className="text-3xl font-bold tabular-nums leading-none">{value}</span>
        {unit && <span className={`text-sm ${c.dim}`}>{unit}</span>}
      </div>

      {/* Trend */}
      {t && (
        <div className={`mt-2 flex items-center gap-1 text-[11px] ${t.color}`}>
          <span>{t.symbol}</span>
          {trendValue && <span>{trendValue}</span>}
        </div>
      )}

      {/* Bottom scan line */}
      <div className={`mt-3 h-px w-full opacity-20 ${c.text}`} style={{ background: 'currentColor' }} />
    </div>
  );
}
