'use client';

import React from 'react';

interface Column {
  key: string;
  header: string;
  className?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface CyberTableProps {
  columns: Column[];
  data: any[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  title?: string;
  subtitle?: string;
  loading?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    text: 'text-neon-green',
    border: 'border-neon-green/20',
    borderHeader: 'border-neon-green/40',
    bgHeader: 'bg-neon-green/5',
    rowHover: 'hover:bg-neon-green/5',
    glow: 'shadow-[0_0_15px_rgba(0,255,159,0.05)]',
  },
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    borderHeader: 'border-cyan-500/40',
    bgHeader: 'bg-cyan-500/5',
    rowHover: 'hover:bg-cyan-500/5',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.05)]',
  },
  red: {
    text: 'text-rose-500',
    border: 'border-rose-500/20',
    borderHeader: 'border-rose-500/40',
    bgHeader: 'bg-rose-500/5',
    rowHover: 'hover:bg-rose-500/5',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.05)]',
  },
  amber: {
    text: 'text-amber-500',
    border: 'border-amber-500/20',
    borderHeader: 'border-amber-500/40',
    bgHeader: 'bg-amber-500/5',
    rowHover: 'hover:bg-amber-500/5',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.05)]',
  },
};

export default function CyberTable({
  columns,
  data,
  variant = 'green',
  title,
  subtitle,
  loading = false,
  className = '',
}: CyberTableProps) {
  const styles = VARIANTS[variant];

  return (
    <div className={`w-full border border-neutral-900 bg-black/40 backdrop-blur-sm rounded overflow-hidden flex flex-col font-mono text-xs ${styles.glow} ${className}`}>
      {/* Table Header Bar */}
      {(title || subtitle) && (
        <div className="px-4 py-3 border-b border-neutral-950 bg-black/80 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
          <div>
            {title && (
              <h4 className="text-white font-bold tracking-widest uppercase flex items-center gap-2">
                <span className={styles.text}>⬢</span> {title}
              </h4>
            )}
            {subtitle && <p className="text-[10px] text-white/40 uppercase tracking-wider">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-white/30 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span>Telemetry Feed</span>
          </div>
        </div>
      )}

      {/* Grid Wrapper */}
      <div className="w-full overflow-x-auto relative scrollbar-thin">
        {/* CRT Scanline Sweep */}
        <div className="absolute inset-0 pointer-events-none z-10 scanline-sweep opacity-[0.03]" />

        <table className="w-full border-collapse text-left min-w-[500px]">
          <thead>
            <tr className={`border-b ${styles.borderHeader} ${styles.bgHeader}`}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-bold uppercase tracking-wider ${styles.text} ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-950">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-white/40">
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⬡</span> LOADING TELEMETRY DATA...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-white/30 uppercase">
                  [ No telemetry logs registered ]
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`transition-colors duration-150 ${styles.rowHover} group`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-white/70 group-hover:text-white transition-colors border-b ${styles.border} ${col.className || ''}`}
                    >
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
