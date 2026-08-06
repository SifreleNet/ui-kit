'use client';

import React, { useEffect, useState } from 'react';

interface RadarTarget {
  id: string;
  x: number; // percentage from center (0 to 100)
  y: number; // percentage from center (0 to 100)
  label: string;
  details?: string;
}

interface CyberPulseRadarProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  speed?: number; // Sweep rotation duration in seconds
  targets?: RadarTarget[];
  showGrid?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    stroke: 'var(--neon-green)',
    fill: 'rgba(0, 255, 159, 0.03)',
    glow: 'rgba(0, 255, 159, 0.4)',
    text: 'text-neon-green',
    border: 'border-[#1a2e1a]',
    accentText: 'text-neon-green/53',
    gridStroke: 'rgba(0, 255, 159, 0.08)',
  },
  cyan: {
    stroke: '#00f0ff',
    fill: 'rgba(0, 240, 255, 0.03)',
    glow: 'rgba(0, 240, 255, 0.4)',
    text: 'text-[#00f0ff]',
    border: 'border-[#0a232e]',
    accentText: 'text-[#00f0ff88]',
    gridStroke: 'rgba(0, 240, 255, 0.08)',
  },
  red: {
    stroke: '#ff5f57',
    fill: 'rgba(255, 95, 87, 0.03)',
    glow: 'rgba(255, 95, 87, 0.4)',
    text: 'text-[#ff5f57]',
    border: 'border-[#2d1212]',
    accentText: 'text-[#ff5f5788]',
    gridStroke: 'rgba(255, 95, 87, 0.08)',
  },
  amber: {
    stroke: '#febc2e',
    fill: 'rgba(254, 188, 46, 0.03)',
    glow: 'rgba(254, 188, 46, 0.4)',
    text: 'text-[#febc2e]',
    border: 'border-[#2e230a]',
    accentText: 'text-[#febc2e88]',
    gridStroke: 'rgba(254, 188, 46, 0.08)',
  },
};

const DEFAULT_TARGETS: RadarTarget[] = [
  { id: '1', x: 25, y: -45, label: 'SYS_GATEWAY', details: 'IP: 10.0.4.12 | Port: 22' },
  { id: '2', x: -60, y: 20, label: 'IDS_FIREWALL', details: 'IP: 10.0.4.15 | ACTIVE' },
  { id: '3', x: 45, y: 55, label: 'PROXY_ROUTE', details: 'PING: 42ms | STEALTH' },
];

export default function CyberPulseRadar({
  variant = 'green',
  speed = 4,
  targets = DEFAULT_TARGETS,
  showGrid = true,
  className = '',
}: CyberPulseRadarProps) {
  const colors = COLOR_MAP[variant];
  const [activeTarget, setActiveTarget] = useState<RadarTarget | null>(null);
  const [scanningLineAngle, setScanningLineAngle] = useState(0);

  // Animate the scanning sweep logic to dynamically highlight targets close to the sweep line
  useEffect(() => {
    let start: number | null = null;
    let animationId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const durationMs = speed * 1000;
      const angle = ((progress % durationMs) / durationMs) * 360;
      setScanningLineAngle(angle);
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div className={`flex flex-col md:flex-row items-stretch gap-6 border p-6 rounded bg-[#0a0a0a] relative overflow-hidden select-none ${colors.border} ${className}`}>
      {/* Scanline overlay effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-10 opacity-40" />

      {/* SONAR SVG Area */}
      <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
        <svg
          viewBox="-120 -120 240 240"
          className="w-full max-w-[300px] h-auto aspect-square relative z-10"
        >
          {/* Radial Grid lines */}
          {showGrid && (
            <>
              {/* Concentric rings */}
              <circle cx="0" cy="0" r="25" fill="none" stroke={colors.gridStroke} strokeWidth="1" />
              <circle cx="0" cy="0" r="50" fill="none" stroke={colors.gridStroke} strokeWidth="1" />
              <circle cx="0" cy="0" r="75" fill="none" stroke={colors.gridStroke} strokeWidth="1" />
              <circle cx="0" cy="0" r="100" fill="none" stroke={colors.stroke} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
              <circle cx="0" cy="0" r="105" fill="none" stroke={colors.stroke} strokeWidth="1.5" />

              {/* Crosshair lines */}
              <line x1="-110" y1="0" x2="110" y2="0" stroke={colors.gridStroke} strokeWidth="1" />
              <line x1="0" y1="-110" x2="0" y2="110" stroke={colors.gridStroke} strokeWidth="1" />
              
              {/* Corner angle ticks */}
              <line x1="-70.7" y1="-70.7" x2="70.7" y2="70.7" stroke={colors.gridStroke} strokeWidth="0.5" strokeDasharray="2 4" />
              <line x1="-70.7" y1="70.7" x2="70.7" y2="-70.7" stroke={colors.gridStroke} strokeWidth="0.5" strokeDasharray="2 4" />
            </>
          )}

          {/* Sweep Sweep Line */}
          <g transform={`rotate(${scanningLineAngle})`}>
            {/* Gradient Sweep Slice */}
            <path
              d="M 0 0 L 0 -105 A 105 105 0 0 1 40.2 -97.0 L 0 0 Z"
              fill={`url(#radar-sweep-grad-${variant})`}
              opacity="0.6"
            />
            {/* Leading edge line */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-105"
              stroke={colors.stroke}
              strokeWidth="2"
              style={{ filter: `drop-shadow(0 0 4px ${colors.glow})` }}
            />
          </g>

          {/* SVG Definitions */}
          <defs>
            <radialGradient id={`radar-sweep-grad-${variant}`} cx="0%" cy="100%" r="100%">
              <stop offset="0%" stopColor={colors.stroke} stopOpacity="0" />
              <stop offset="90%" stopColor={colors.stroke} stopOpacity="0.05" />
              <stop offset="100%" stopColor={colors.stroke} stopOpacity="0.25" />
            </radialGradient>
          </defs>

          {/* Targets */}
          {targets.map((tgt) => {
            // Calculate angle from center to target to highlight target when sweep overlaps it
            const targetAngle = (Math.atan2(tgt.y, tgt.x) * 180) / Math.PI + 90;
            const normalizedTargetAngle = targetAngle < 0 ? targetAngle + 360 : targetAngle;
            const diff = Math.abs(normalizedTargetAngle - scanningLineAngle);
            const isHighlighted = diff < 25 || diff > 335;

            return (
              <g
                key={tgt.id}
                className="cursor-pointer group/target"
                onClick={() => setActiveTarget(tgt)}
              >
                {/* Ping Pulse */}
                {isHighlighted && (
                  <circle
                    cx={tgt.x}
                    cy={tgt.y}
                    r="8"
                    fill="none"
                    stroke={colors.stroke}
                    strokeWidth="1.5"
                    className="animate-ping"
                    style={{ transformOrigin: `${tgt.x}px ${tgt.y}px` }}
                  />
                )}
                {/* Main Dot */}
                <circle
                  cx={tgt.x}
                  cy={tgt.y}
                  r={isHighlighted ? '4.5' : '3.5'}
                  fill={isHighlighted ? colors.stroke : 'rgba(0,0,0,0.5)'}
                  stroke={colors.stroke}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                  style={{
                    filter: isHighlighted ? `drop-shadow(0 0 6px ${colors.glow})` : undefined,
                  }}
                />
                {/* Target Name Tag */}
                <text
                  x={tgt.x + 8}
                  y={tgt.y + 4}
                  fill={colors.stroke}
                  fontSize="7"
                  fontFamily="monospace"
                  fontWeight="bold"
                  opacity={isHighlighted || activeTarget?.id === tgt.id ? '1' : '0.4'}
                  className="transition-opacity duration-300 pointer-events-none select-none"
                >
                  {tgt.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Target Details Panel (Hacker console look) */}
      <div className={`w-full md:w-[220px] flex flex-col justify-between border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 ${colors.border}`}>
        <div className="flex-1 flex flex-col justify-center min-h-[120px]">
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-2 select-none">
            [ Scan Diagnostics ]
          </span>
          {activeTarget ? (
            <div className="font-mono space-y-2">
              <p className={`text-sm font-bold tracking-tight ${colors.text}`}>
                &gt; {activeTarget.label}
              </p>
              <p className="text-xs text-white/70 leading-relaxed font-mono">
                {activeTarget.details || 'NO DIAGNOSTIC INFO'}
              </p>
              <div className="text-[9px] text-white/30 space-y-0.5">
                <p>COORD_X : {activeTarget.x.toFixed(1)}%</p>
                <p>COORD_Y : {activeTarget.y.toFixed(1)}%</p>
                <p>SIG_LOC : {(Math.abs(Math.sin(activeTarget.x * 12.9898 + activeTarget.y * 78.233)) * 1000).toFixed(0)}m</p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-white/30 italic font-mono py-4">
              Select a target dot on the radar grid to initialize diagnostics.
            </div>
          )}
        </div>

        {/* Sonar status line */}
        <div className="mt-4 pt-4 border-t border-dashed border-white/10 flex items-center justify-between text-[10px] text-white/30 font-mono">
          <span>SWEEP_RATE: {(360 / speed).toFixed(1)}°/s</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}
