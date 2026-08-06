'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface TextDecryptorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number; // Milliseconds per character step
  delay?: number; // Startup delay in ms
  trigger?: 'mount' | 'hover' | 'click';
  variant?: 'green' | 'cyan' | 'red' | 'amber' | 'none';
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: 'text-neon-green',
  cyan: 'text-[#00f0ff]',
  red: 'text-[#ff5f57]',
  amber: 'text-[#febc2e]',
  none: '',
};

const DECRYPT_CHARS = '0123456789ABCDEF★☠☣☣☢⚙⚡⚧⚓⚛';

export default function TextDecryptor({
  text,
  speed = 40,
  delay = 0,
  trigger = 'mount',
  variant = 'green',
  glow = true,
  className = '',
  ...props
}: TextDecryptorProps) {
  const [prevText, setPrevText] = useState(text);
  const [displayText, setDisplayText] = useState(trigger === 'mount' ? '' : text);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  if (text !== prevText) {
    setPrevText(text);
    setDisplayText(trigger === 'mount' ? '' : text);
  }

  const startDecryption = useCallback(() => {
    if (isDecrypting) return;
    setIsDecrypting(true);

    let currentIndex = 0;
    
    // Clear any active timers
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      // Create scrambled text
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < currentIndex) {
            return text[index]; // Locked character
          }
          // Scrambled placeholder
          return DECRYPT_CHARS[Math.floor(Math.random() * DECRYPT_CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      // Increment lock position (fractional increments make it look like a rolling stream)
      currentIndex += 0.3;

      if (currentIndex >= text.length + 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDisplayText(text);
        setIsDecrypting(false);
      }
    }, speed);
  }, [isDecrypting, text, speed]);

  useEffect(() => {
    if (trigger === 'mount') {
      const startupTimer = setTimeout(startDecryption, delay);
      return () => {
        clearTimeout(startupTimer);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [trigger, delay, startDecryption]);



  const handleTrigger = () => {
    if (trigger === 'click') {
      startDecryption();
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      startDecryption();
    }
  };

  const colorClass = COLOR_MAP[variant];

  return (
    <span
      {...props}
      onClick={handleTrigger}
      onMouseEnter={handleMouseEnter}
      className={`
        font-mono tracking-wider transition-all duration-300
        ${colorClass}
        ${glow ? 'text-shadow-glow' : ''}
        ${trigger === 'click' || trigger === 'hover' ? 'cursor-pointer hover:brightness-125' : ''}
        ${className}
      `}
      style={{
        textShadow: glow && variant !== 'none' ? `0 0 8px currentColor` : undefined,
      }}
    >
      {displayText || text}
    </span>
  );
}
