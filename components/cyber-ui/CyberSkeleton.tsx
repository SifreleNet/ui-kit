'use client';

import React from 'react';

interface CyberSkeletonProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const VARIANTS = {
  green: {
    bg: 'bg-neon-green/5',
    line: 'bg-gradient-to-r from-transparent via-neon-green/10 to-transparent',
    border: 'border-neon-green/10',
  },
  cyan: {
    bg: 'bg-cyan-500/5',
    line: 'bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent',
    border: 'border-cyan-500/10',
  },
  red: {
    bg: 'bg-rose-500/5',
    line: 'bg-gradient-to-r from-transparent via-rose-500/10 to-transparent',
    border: 'border-rose-500/10',
  },
  amber: {
    bg: 'bg-amber-500/5',
    line: 'bg-gradient-to-r from-transparent via-amber-500/10 to-transparent',
    border: 'border-amber-500/10',
  },
};

export default function CyberSkeleton({
  variant = 'green',
  className = '',
}: CyberSkeletonProps) {
  const styles = VARIANTS[variant];

  return (
    <div
      className={`relative overflow-hidden rounded border bg-neutral-950/40 backdrop-blur-sm pointer-events-none ${styles.border} ${styles.bg} ${className}`}
    >
      {/* Animated glowing sweep overlay */}
      <div
        className={`absolute inset-0 -translate-x-full animate-skeletonSweep ${styles.line}`}
      />

      {/* Embedded style tag for the custom loop animation if not loaded globally */}
      <style jsx>{`
        @keyframes skeletonSweep {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-skeletonSweep {
          animation: skeletonSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
