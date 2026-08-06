'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  trigger?: 'hover' | 'always';
  intervalSpeed?: number;
  glow?: boolean;
}

const scrambleChars = '01#$&%XØZ?';

export default function GlitchText({
  text,
  trigger = 'hover',
  intervalSpeed = 3000,
  glow = true,
  className = '',
  ...props
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);
    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return text[index];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );
      
      iterations += 1 / 2;
      
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 40);
  }, [isGlitching, text]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (trigger === 'always') {
      const runAlways = () => {
        scramble();
        timerRef.current = setTimeout(runAlways, intervalSpeed + Math.random() * 2000);
      };
      timerRef.current = setTimeout(runAlways, 1000);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [trigger, intervalSpeed, scramble]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scramble();
    }
  };

  return (
    <span
      {...props}
      onMouseEnter={handleMouseEnter}
      className={`
        relative inline-block font-mono tracking-wide select-none
        ${isGlitching ? 'text-white' : ''}
        ${glow ? 'hover:text-shadow-glow' : ''}
        transition-colors duration-200
        ${className}
      `}
      style={{
        textShadow: glow && !isGlitching ? '0 0 10px rgba(0, 255, 159, 0.4)' : undefined,
      }}
    >
      {/* Glitch layered effect for RGB Split simulation */}
      {isGlitching && (
        <>
          <span className="absolute left-[2px] top-0 text-[#ff5f57] opacity-75 animate-pulse pointer-events-none select-none">
            {displayText}
          </span>
          <span className="absolute left-[-2px] top-[1px] text-[#00f0ff] opacity-75 animate-pulse pointer-events-none select-none">
            {displayText}
          </span>
        </>
      )}
      <span>{displayText}</span>
    </span>
  );
}
