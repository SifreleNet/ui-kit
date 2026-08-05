'use client';

import MatrixRain from '@/components/MatrixRain';

/**
 * Fixed full-screen Matrix rain background.
 * Rendered at z-index:-1 so it sits behind all page content
 * but visible through any transparent/bg-free areas.
 */
export default function MatrixBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none"
      aria-hidden="true"
      style={{ zIndex: -1, opacity: 0.09 }}
    >
      <MatrixRain />
    </div>
  );
}
