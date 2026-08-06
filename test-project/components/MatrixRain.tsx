'use client';

import { useEffect, useRef } from 'react';

const CHAR_SETS = {
  katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  binary: '01',
  hex: '0123456789ABCDEF',
  all: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF></?|\\[]{}=+-_',
};

interface MatrixRainProps {
  color?: string;
  speed?: number;
  fontSize?: number;
  opacity?: number;
  charType?: 'katakana' | 'binary' | 'hex' | 'all';
}

export default function MatrixRain({
  color = 'var(--neon-green)',
  speed = 0.5,
  fontSize = 13,
  opacity = 0.4,
  charType = 'all',
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = CHAR_SETS[charType] || CHAR_SETS.all;

    // Inicializar tamaño antes de calcular cols/drops
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let cols = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array.from(
      { length: cols },
      () => Math.random() * -80
    );

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const newCols = Math.floor(canvas.width / fontSize);
      if (newCols > cols) {
        for (let i = cols; i < newCols; i++) drops.push(Math.random() * -80);
      } else if (newCols < cols) {
        drops = drops.slice(0, newCols);
      }
      cols = newCols;
    };
    resize();
    window.addEventListener('resize', resize);

    let rafId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;

        // Carácter principal — blanco brillante
        if (drops[i] > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${fontSize}px monospace`;
          ctx.fillText(char, i * fontSize, y);
        }

        // Cola — color neón con gradiente de opacidad
        ctx.font = `${fontSize}px monospace`;
        const trailLen = 20;
        for (let t = 1; t < trailLen; t++) {
          const ty = (drops[i] - t) * fontSize;
          if (ty < 0) continue;
          const alpha = ((trailLen - t) / trailLen) * 0.7;
          
          // Render with matching hex color but variable alpha
          // Convert hex color to rgba if possible, or use standard rgba overlay
          ctx.fillStyle = color.startsWith('#') 
            ? `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
            : color; // fallback if color isn't a hex format
            
          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(trailChar, i * fontSize, ty);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [color, speed, fontSize, charType]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block', opacity }}
    />
  );
}
