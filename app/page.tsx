'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Import components
import MatrixRain from '@/components/MatrixRain';
import TerminalHero from '@/components/TerminalHero';
import HackerDashboard, { NetworkScanPanel, LiveLogPanel, BruteForcePanel, HexDumpPanel } from '@/components/HackerDashboard';
import ProjectCard from '@/components/ProjectCard';
import SkillsSection from '@/components/SkillsSection';
import CyberButton from '@/components/cyber-ui/CyberButton';
import CyberInput from '@/components/cyber-ui/CyberInput';
import CyberPanel from '@/components/cyber-ui/CyberPanel';
import CyberBadge from '@/components/cyber-ui/CyberBadge';
import GlitchText from '@/components/cyber-ui/GlitchText';
import CyberStatusLine from '@/components/cyber-ui/CyberStatusLine';
import CyberActionCard from '@/components/cyber-ui/CyberActionCard';
import CyberConsoleBox from '@/components/cyber-ui/CyberConsoleBox';
import CyberTabs from '@/components/cyber-ui/CyberTabs';
import CyberSwitch from '@/components/cyber-ui/CyberSwitch';
import CyberCheckbox from '@/components/cyber-ui/CyberCheckbox';
import CyberDialog from '@/components/cyber-ui/CyberDialog';
import CyberProgress from '@/components/cyber-ui/CyberProgress';
import CyberAlert from '@/components/cyber-ui/CyberAlert';
import CyberLoginForm from '@/components/cyber-ui/CyberLoginForm';
import CyberSignupForm from '@/components/cyber-ui/CyberSignupForm';
import CyberSystemDashboard from '@/components/cyber-ui/CyberSystemDashboard';
import CyberDataForm from '@/components/cyber-ui/CyberDataForm';
import InteractiveConsole from '@/components/cyber-ui/InteractiveConsole';
import TargetNetworkMap from '@/components/cyber-ui/TargetNetworkMap';

// Raw source codes for the copy-paste viewer
const SOURCE_CODES = {
  MatrixRain: `'use client';

import { useEffect, useRef } from 'react';

const CHAR_SETS = {
  katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  binary: '01',
  hex: '0123456789ABCDEF',
  all: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF></?|\\\\[]{}=+-_',
};

interface MatrixRainProps {
  color?: string;
  speed?: number;
  fontSize?: number;
  opacity?: number;
  charType?: 'katakana' | 'binary' | 'hex' | 'all';
}

export default function MatrixRain({
  color = '#00ff9f',
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
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let cols = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array.from({ length: cols }, () => Math.random() * -80);

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
    window.addEventListener('resize', resize);

    let rafId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;

        if (drops[i] > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.font = \`bold \${fontSize}px monospace\`;
          ctx.fillText(char, i * fontSize, y);
        }

        ctx.font = \`\${fontSize}px monospace\`;
        const trailLen = 20;
        for (let t = 1; t < trailLen; t++) {
          const ty = (drops[i] - t) * fontSize;
          if (ty < 0) continue;
          const alpha = ((trailLen - t) / trailLen) * 0.7;
          
          ctx.fillStyle = color.startsWith('#') 
            ? \`\${color}\${Math.floor(alpha * 255).toString(16).padStart(2, '0')}\`
            : color;
            
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block', opacity }} />;
}`,
  CyberButton: `'use client';

import React, { useState } from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  isCutCorner?: boolean;
  glitchOnHover?: boolean;
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#00ff9f33] hover:border-[#00ff9f]',
    text: 'text-[#00ff9f]',
    bg: 'hover:bg-[#00ff9f0d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(0,255,159,0.35)]',
    accent: 'bg-[#00ff9f]',
  },
  cyan: {
    border: 'border-[#00f0ff33] hover:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    bg: 'hover:bg-[#00f0ff0d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(0,240,255,0.35)]',
    accent: 'bg-[#00f0ff]',
  },
  red: {
    border: 'border-[#ff5f5733] hover:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    bg: 'hover:bg-[#ff5f570d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(255,95,87,0.35)]',
    accent: 'bg-[#ff5f57]',
  },
  amber: {
    border: 'border-[#febc2e33] hover:border-[#febc2e]',
    text: 'text-[#febc2e]',
    bg: 'hover:bg-[#febc2e0d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(254,188,46,0.35)]',
    accent: 'bg-[#febc2e]',
  },
};

const SIZE_MAP = {
  sm: 'px-3 py-1.5 text-xs font-mono',
  md: 'px-5 py-2.5 text-sm font-mono',
  lg: 'px-8 py-3 text-base font-mono',
};

export default function CyberButton({
  children,
  variant = 'green',
  size = 'md',
  isCutCorner = false,
  glitchOnHover = true,
  glow = true,
  className = '',
  ...props
}: CyberButtonProps) {
  const [glitchText, setGlitchText] = useState<string | null>(null);
  const colors = COLOR_MAP[variant];

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (glitchOnHover && typeof children === 'string') {
      const original = children;
      let iterations = 0;
      const chars = '01XYZ_$#!?';
      const interval = setInterval(() => {
        setGlitchText(
          original
            .split('')
            .map((char, index) => {
              if (index < iterations) return original[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        iterations += 1 / 3;
        if (iterations >= original.length) {
          clearInterval(interval);
          setGlitchText(null);
        }
      }, 30);
    }
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const buttonStyle: React.CSSProperties = isCutCorner
    ? { clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }
    : {};

  return (
    <button
      {...props}
      onMouseEnter={handleMouseEnter}
      style={buttonStyle}
      className={\`relative inline-flex items-center justify-center font-bold uppercase tracking-wider border rounded bg-black/40 backdrop-blur-sm transition-all duration-300 active:scale-95 cursor-pointer select-none \${colors.border} \${colors.text} \${colors.bg} \${SIZE_MAP[size]} \${glow ? colors.shadow : ''} \${className}\`}
    >
      {isCutCorner && (
        <span className={\`absolute bottom-0 right-[7px] w-px h-[10px] rotate-[45deg] origin-bottom-right \${colors.accent} opacity-50\`} />
      )}
      <span className="absolute inset-0 w-full h-[1px] bg-white/5 pointer-events-none" />
      <span className="relative z-10 font-mono">
        {glitchText !== null ? glitchText : children}
      </span>
    </button>
  );
}`,
  CyberInput: `'use client';

import React, { useState } from 'react';

interface CyberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  prompt?: string;
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a] focus-within:border-[#00ff9f]',
    text: 'text-[#00ff9f]',
    prompt: 'text-[#00ff9f88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,255,159,0.2)]',
    bg: 'bg-black/40',
  },
  cyan: {
    border: 'border-[#0a232e] focus-within:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    prompt: 'text-[#00f0ff88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    bg: 'bg-black/40',
  },
  red: {
    border: 'border-[#2d1212] focus-within:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    prompt: 'text-[#ff5f5788]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(255,95,87,0.2)]',
    bg: 'bg-black/40',
  },
  amber: {
    border: 'border-[#2e230a] focus-within:border-[#febc2e]',
    text: 'text-[#febc2e]',
    prompt: 'text-[#febc2e88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(254,188,46,0.2)]',
    bg: 'bg-black/40',
  },
};

export default function CyberInput({
  variant = 'green',
  prompt = '$',
  glow = true,
  className = '',
  ...props
}: CyberInputProps) {
  const [focused, setFocused] = useState(false);
  const colors = COLOR_MAP[variant];

  return (
    <div className={\`flex items-center border rounded-lg overflow-hidden px-3 py-2.5 font-mono text-sm transition-all duration-300 backdrop-blur-sm \${colors.border} \${colors.bg} \${glow ? colors.shadow : ''} \${className}\`}>
      {prompt && <span className={\`mr-2 font-mono select-none \${colors.prompt}\`}>{prompt}</span>}
      <input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (props.onBlur) props.onBlur(e);
        }}
        className={\`flex-1 bg-transparent border-none outline-none font-mono font-bold placeholder-[#00ff9f33] \${colors.text}\`}
      />
      {focused && <span className={\`animate-blink text-xs ml-1 \${colors.text}\`}>█</span>}
    </div>
  );
}`,
  CyberPanel: `'use client';

import React from 'react';

interface CyberPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  status?: string;
  showControls?: boolean;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#00ff9f1a] hover:border-[#00ff9f4d]',
    barBorder: 'border-b-[#00ff9f0d]',
    title: 'text-[#00ff9f99]',
    bullet: 'bg-[#00ff9f]',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,255,159,0.08)]',
    dotColor: '#00ff9f',
  },
  cyan: {
    border: 'border-[#00f0ff1a] hover:border-[#00f0ff4d]',
    barBorder: 'border-b-[#00f0ff0d]',
    title: 'text-[#00f0ff99]',
    bullet: 'bg-[#00f0ff]',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]',
    dotColor: '#00f0ff',
  },
  red: {
    border: 'border-[#ff5f571a] hover:border-[#ff5f574d]',
    barBorder: 'border-b-[#ff5f570d]',
    title: 'text-[#ff5f5799]',
    bullet: 'bg-[#ff5f57]',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,95,87,0.08)]',
    dotColor: '#ff5f57',
  },
  amber: {
    border: 'border-[#febc2e1a] hover:border-[#febc2e4d]',
    barBorder: 'border-b-[#febc2e0d]',
    title: 'text-[#febc2e99]',
    bullet: 'bg-[#febc2e]',
    shadow: 'hover:shadow-[0_0_20px_rgba(254,188,46,0.08)]',
    dotColor: '#febc2e',
  },
};

export default function CyberPanel({
  children,
  title = 'TERMINAL',
  status,
  showControls = true,
  variant = 'green',
  glow = true,
  className = '',
  ...props
}: CyberPanelProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div {...props} className={\`flex flex-col rounded-lg overflow-hidden bg-black/90 border backdrop-blur-md transition-all duration-300 h-full min-h-[140px] \${colors.border} \${glow ? colors.shadow : ''} \${className}\`}>
      <div className={\`flex items-center gap-2 px-3 py-2 bg-neutral-900/90 border-b font-mono text-[10px] select-none \${colors.barBorder}\`}>
        {showControls ? (
          <div className="flex gap-1.5 mr-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57] opacity-80 shadow-[0_0_4px_#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e] opacity-80 shadow-[0_0_4px_#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840] opacity-80 shadow-[0_0_4px_#28c840]" />
          </div>
        ) : (
          <span className="text-xs" style={{ color: colors.dotColor }}>⬡</span>
        )}
        <span className={\`font-semibold uppercase tracking-wider \${colors.title}\`}>{title}</span>
        {status && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className={\`w-1.5 h-1.5 rounded-full animate-pulse \${colors.bullet}\`} />
            <span className="opacity-60 uppercase font-mono tracking-tight text-[9px]" style={{ color: colors.dotColor }}>{status}</span>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed text-[#00ff9fcc]">
        {children}
      </div>
    </div>
  );
}`,
  CyberBadge: `'use client';

import React from 'react';

interface CyberBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  brackets?: boolean;
}

const COLOR_MAP = {
  green: { border: 'border-[#00ff9f33]', bg: 'bg-[#00ff9f0a]', text: 'text-[#00ff9f]', brackets: 'text-[#00ff9f55]' },
  cyan: { border: 'border-[#00f0ff33]', bg: 'bg-[#00f0ff0a]', text: 'text-[#00f0ff]', brackets: 'text-[#00f0ff55]' },
  red: { border: 'border-[#ff5f5733]', bg: 'bg-[#ff5f570a]', text: 'text-[#ff5f57]', brackets: 'text-[#ff5f5755]' },
  amber: { border: 'border-[#febc2e33]', bg: 'bg-[#febc2e0a]', text: 'text-[#febc2e]', brackets: 'text-[#febc2e55]' },
};

export default function CyberBadge({
  children,
  variant = 'green',
  brackets = true,
  className = '',
  ...props
}: CyberBadgeProps) {
  const colors = COLOR_MAP[variant];
  return (
    <span {...props} className={\`inline-flex items-center gap-1 px-2.5 py-0.5 rounded border text-[10px] font-mono font-semibold tracking-wide uppercase select-none \${colors.border} \${colors.bg} \${colors.text} \${className}\`}>
      {brackets && <span className={\`font-mono mr-0.5 \${colors.brackets}\`}>[</span>}
      {children}
      {brackets && <span className={\`font-mono ml-0.5 \${colors.brackets}\`}>]</span>}
    </span>
  );
}`,
  GlitchText: `'use client';

import React, { useState, useEffect, useRef } from 'react';

interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  trigger?: 'hover' | 'always';
  intervalSpeed?: number;
  glow?: boolean;
}

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
  const scrambleChars = '01#$&%XØZ?';

  const scramble = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations) return text[index];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('')
      );
      iterations += 1 / 2;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 40);
  };

  useEffect(() => {
    if (trigger === 'always') {
      const runAlways = () => {
        scramble();
        timerRef.current = setTimeout(runAlways, intervalSpeed + Math.random() * 2000);
      };
      timerRef.current = setTimeout(runAlways, 1000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text, trigger, intervalSpeed]);

  return (
    <span
      {...props}
      onMouseEnter={() => trigger === 'hover' && scramble()}
      className={\`relative inline-block font-mono tracking-wide select-none \${isGlitching ? 'text-white' : ''} \${glow ? 'hover:text-shadow-glow' : ''} transition-colors duration-200 \${className}\`}
      style={{ textShadow: glow && !isGlitching ? '0 0 10px rgba(0, 255, 159, 0.4)' : undefined }}
    >
      {isGlitching && (
        <>
          <span className="absolute left-[2px] top-0 text-[#ff5f57] opacity-75 animate-pulse pointer-events-none select-none">{displayText}</span>
          <span className="absolute left-[-2px] top-[1px] text-[#00f0ff] opacity-75 animate-pulse pointer-events-none select-none">{displayText}</span>
        </>
      )}
      <span>{displayText}</span>
    </span>
  );
}`,
  CyberStatusLine: `'use client';

import React from 'react';

interface CyberStatusLineProps {
  status?: string;
  detail?: string;
  count?: number | string;
  address?: string;
  stateColor?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const COLOR_MAP = {
  green: 'bg-[#28c840]',
  cyan: 'bg-[#00f0ff]',
  red: 'bg-[#ff5f57]',
  amber: 'bg-[#febc2e]',
};

export default function CyberStatusLine({
  status = 'scan complete',
  detail = 'entries indexed',
  count,
  address = '192.168.1.42:~/projects',
  stateColor = 'green',
  className = '',
}: CyberStatusLineProps) {
  const dotColor = COLOR_MAP[stateColor] || 'bg-[#28c840]';
  return (
    <div className={\`flex items-center gap-2 font-mono text-xs text-[#00ff9f44] w-full select-none \${className}\`}>
      <span className={\`w-1.5 h-1.5 rounded-full \${dotColor} animate-pulse\`} />
      <span>
        {status} &mdash;{' '}
        {count !== undefined && <span className="text-[#00ff9f66] font-bold mr-1">{count}</span>}
        <span>{detail}</span>
      </span>
      {address && (
        <span className="ml-auto text-[#00ff9f22] font-mono hover:text-[#00ff9f44] transition-colors">
          {address}
        </span>
      )}
    </div>
  );
}`,
  CyberActionCard: `'use client';

import React from 'react';

interface CyberActionCardProps {
  label: string;
  value: string;
  href?: string;
  command?: string;
  description?: string;
  icon?: string | React.ReactNode;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  target?: string;
  onClick?: () => void;
  className?: string;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a] hover:border-[#00ff9f44] hover:bg-[#00ff9f05]',
    text: 'text-[#00ff9f]',
    subText: 'text-[#00ff9f77]',
    dimText: 'text-[#00ff9f33]',
    accentText: 'text-[#00ff9f66] group-hover/link:text-[#00ff9f]',
    commandText: 'text-[#00ff9f55]',
  },
  cyan: {
    border: 'border-[#0a232e] hover:border-[#00f0ff44] hover:bg-[#00f0ff05]',
    text: 'text-[#00f0ff]',
    subText: 'text-[#00f0ff77]',
    dimText: 'text-[#00f0ff33]',
    accentText: 'text-[#00f0ff66] group-hover/link:text-[#00f0ff]',
    commandText: 'text-[#00f0ff55]',
  },
  red: {
    border: 'border-[#2d1212] hover:border-[#ff5f5744] hover:bg-[#ff5f5705]',
    text: 'text-[#ff5f57]',
    subText: 'text-[#ff5f5777]',
    dimText: 'text-[#ff5f5733]',
    accentText: 'text-[#ff5f5766] group-hover/link:text-[#ff5f57]',
    commandText: 'text-[#ff5f5755]',
  },
  amber: {
    border: 'border-[#2e230a] hover:border-[#febc2e44] hover:bg-[#febc2e05]',
    text: 'text-[#febc2e]',
    subText: 'text-[#febc2e77]',
    dimText: 'text-[#febc2e33]',
    accentText: 'text-[#febc2e66] group-hover/link:text-[#febc2e]',
    commandText: 'text-[#febc2e55]',
  },
};

export default function CyberActionCard({
  label,
  value,
  href,
  command,
  description,
  icon = '[◈]',
  variant = 'green',
  target,
  onClick,
  className = '',
}: CyberActionCardProps) {
  const colors = COLOR_MAP[variant];
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <a href={href} target={target || (href.startsWith('http') ? '_blank' : undefined)} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={\`flex items-start gap-4 p-4 border rounded transition-all duration-300 group/link cursor-pointer \${colors.border} \${className}\`}>
          {children}
        </a>
      );
    }
    return (
      <div onClick={onClick} className={\`flex items-start gap-4 p-4 border rounded transition-all duration-300 group/link cursor-pointer \${colors.border} \${className}\`}>
        {children}
      </div>
    );
  };

  return (
    <div className="w-full">
      {command && <p className={\`text-xs font-mono mb-2 select-none \${colors.commandText}\`}>{command}</p>}
      <CardWrapper>
        <span className={\`font-mono text-sm shrink-0 transition-colors \${colors.accentText}\`}>{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className={\`text-sm font-bold font-mono group-hover/link:text-shadow-glow transition-all \${colors.text}\`}>{label}</span>
            {description && <span className={\`text-xs font-mono \${colors.dimText}\`}>{description}</span>}
          </div>
          <span className={\`text-xs font-mono truncate block transition-colors \${colors.subText}\`}>{value}</span>
        </div>
        <span className={\`text-sm transition-colors shrink-0 \${colors.dimText} group-hover/link:\${colors.text}\`}>→</span>
      </CardWrapper>
    </div>
  );
}`,
  CyberConsoleBox: `'use client';

import React from 'react';

interface CyberConsoleBoxProps {
  command?: string;
  content: string | string[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: { border: 'border-[#1a2e1a]', command: 'text-[#00ff9f55]', text: 'text-[#00ff9f44]', shadow: 'shadow-[0_0_25px_rgba(0,255,159,0.02)]', bg: 'bg-[#0d0d0dcc]' },
  cyan: { border: 'border-[#0a232e]', command: 'text-[#00f0ff55]', text: 'text-[#00f0ff44]', shadow: 'shadow-[0_0_25px_rgba(0,240,255,0.02)]', bg: 'bg-[#0d0d0dcc]' },
  red: { border: 'border-[#2d1212]', command: 'text-[#ff5f5755]', text: 'text-[#ff5f5744]', shadow: 'shadow-[0_0_25px_rgba(255,95,87,0.02)]', bg: 'bg-[#0d0d0dcc]' },
  amber: { border: 'border-[#2e230a]', command: 'text-[#febc2e55]', text: 'text-[#febc2e44]', shadow: 'shadow-[0_0_25px_rgba(254,188,46,0.02)]', bg: 'bg-[#0d0d0dcc]' },
};

export default function CyberConsoleBox({
  command,
  content,
  variant = 'green',
  glow = true,
  className = '',
}: CyberConsoleBoxProps) {
  const colors = COLOR_MAP[variant];
  const rows = Array.isArray(content) ? content : content.split('\\n');
  return (
    <div className={\`w-full \${className}\`}>
      {command && <p className={\`text-xs font-mono mb-3 select-none \${colors.command}\`}>{command}</p>}
      <div className={\`border rounded-lg p-5 font-mono text-xs leading-relaxed overflow-x-auto \${colors.border} \${colors.bg} \${glow ? colors.shadow : ''}\`}>
        {rows.map((row, i) => <p key={i} className={colors.text}>{row}</p>)}
      </div>
    </div>
  );
}`,
  CyberTabs: `'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
  count?: number | string;
}

interface CyberTabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onChange: (id: string) => void;
  labelPrefix?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const COLOR_MAP = {
  green: {
    active: 'border-[#00ff9f] text-[#00ff9f] bg-[#00ff9f11] shadow-[0_0_10px_#00ff9f22]',
    inactive: 'border-[#1a2e1a] text-[#00ff9f55] hover:border-[#00ff9f44] hover:text-[#00ff9f88]',
    count: 'text-[#00ff9f55]',
    prefix: 'text-[#00ff9f44]',
    container: 'border-[#1a2e1a] bg-[#0d0d0dcc]',
  },
  cyan: {
    active: 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff11] shadow-[0_0_10px_#00f0ff22]',
    inactive: 'border-[#0a232e] text-[#00f0ff55] hover:border-[#00f0ff44] hover:text-[#00f0ff88]',
    count: 'text-[#00f0ff55]',
    prefix: 'text-[#00f0ff44]',
    container: 'border-[#0a232e] bg-[#0d0d0dcc]',
  },
  red: {
    active: 'border-[#ff5f57] text-[#ff5f57] bg-[#ff5f5711] shadow-[0_0_10px_#ff5f5722]',
    inactive: 'border-[#2d1212] text-[#ff5f5755] hover:border-[#ff5f5744] hover:text-[#ff5f5788]',
    count: 'text-[#ff5f5755]',
    prefix: 'text-[#ff5f5744]',
    container: 'border-[#2d1212] bg-[#0d0d0dcc]',
  },
  amber: {
    active: 'border-[#febc2e] text-[#febc2e] bg-[#febc2e11] shadow-[0_0_10px_#febc2e22]',
    inactive: 'border-[#2e230a] text-[#febc2e55] hover:border-[#febc2e44] hover:text-[#febc2e88]',
    count: 'text-[#febc2e55]',
    prefix: 'text-[#febc2e44]',
    container: 'border-[#2e230a] bg-[#0d0d0dcc]',
  },
};

export default function CyberTabs({
  tabs,
  activeTabId,
  onChange,
  labelPrefix = 'filter:',
  variant = 'green',
  className = '',
}: CyberTabsProps) {
  const colors = COLOR_MAP[variant];
  return (
    <div className={\`flex flex-wrap gap-2 p-3 border rounded-lg backdrop-blur-sm select-none \${colors.container} \${className}\`}>
      {labelPrefix && <span className={\`text-xs font-mono self-center mr-1 \${colors.prefix}\`}>{labelPrefix}</span>}
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => onChange(tab.id)} className={\`text-xs font-mono px-3 py-1.5 rounded border transition-all duration-200 cursor-pointer \${activeTabId === tab.id ? colors.active : colors.inactive}\`}>
          <span>{tab.label}</span>
          {tab.count !== undefined && <span className={\`ml-1.5 font-bold \${colors.count}\`}>{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}`,
  CyberSwitch: `'use client';

import React from 'react';

interface CyberSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: { trackActive: 'bg-[#00ff9f33] border-[#00ff9f]', thumbActive: 'bg-[#00ff9f] shadow-[0_0_8px_#00ff9f]', text: 'text-[#00ff9f]', trackInactive: 'bg-black border-[#1a2e1a]', thumbInactive: 'bg-[#1a2e1a]' },
  cyan: { trackActive: 'bg-[#00f0ff33] border-[#00f0ff]', thumbActive: 'bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]', text: 'text-[#00f0ff]', trackInactive: 'bg-black border-[#0a232e]', thumbInactive: 'bg-[#0a232e]' },
  red: { trackActive: 'bg-[#ff5f5733] border-[#ff5f57]', thumbActive: 'bg-[#ff5f57] shadow-[0_0_8px_#ff5f57]', text: 'text-[#ff5f57]', trackInactive: 'bg-black border-[#2d1212]', thumbInactive: 'bg-[#2d1212]' },
  amber: { trackActive: 'bg-[#febc2e33] border-[#febc2e]', thumbActive: 'bg-[#febc2e] shadow-[0_0_8px_#febc2e]', text: 'text-[#febc2e]', trackInactive: 'bg-black border-[#2e230a]', thumbInactive: 'bg-[#2e230a]' },
};

export default function CyberSwitch({
  checked,
  onChange,
  label,
  variant = 'green',
  disabled = false,
  className = '',
}: CyberSwitchProps) {
  const colors = COLOR_MAP[variant];
  return (
    <div onClick={() => !disabled && onChange(!checked)} className={\`inline-flex items-center gap-3 cursor-pointer select-none font-mono text-xs \${disabled ? 'opacity-40 cursor-not-allowed' : ''} \${className}\`}>
      <div className={\`w-10 h-5 rounded-full border transition-all duration-300 relative flex items-center px-0.5 \${checked ? colors.trackActive : colors.trackInactive}\`}>
        <div className={\`w-3.5 h-3.5 rounded-full transition-all duration-300 transform \${checked ? 'translate-x-5' : 'translate-x-0'} \${checked ? colors.thumbActive : colors.thumbInactive}\`} />
      </div>
      {label && <span className={\`font-semibold tracking-wider \${checked ? colors.text : 'text-neutral-500'}\`}>{label}</span>}
    </div>
  );
}`,
  CyberCheckbox: `'use client';

import React from 'react';

interface CyberCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: { borderActive: 'border-[#00ff9f]', bgActive: 'bg-[#00ff9f1a]', text: 'text-[#00ff9f]', glow: 'shadow-[0_0_8px_rgba(0,255,159,0.4)]', borderInactive: 'border-[#1a2e1a] hover:border-[#00ff9f33]' },
  cyan: { borderActive: 'border-[#00f0ff]', bgActive: 'bg-[#00f0ff1a]', text: 'text-[#00f0ff]', glow: 'shadow-[0_0_8px_rgba(0,240,255,0.4)]', borderInactive: 'border-[#0a232e] hover:border-[#00f0ff33]' },
  red: { borderActive: 'border-[#ff5f57]', bgActive: 'bg-[#ff5f571a]', text: 'text-[#ff5f57]', glow: 'shadow-[0_0_8px_rgba(255,95,87,0.4)]', borderInactive: 'border-[#2d1212] hover:border-[#ff5f5733]' },
  amber: { borderActive: 'border-[#febc2e]', bgActive: 'bg-[#febc2e1a]', text: 'text-[#febc2e]', glow: 'shadow-[0_0_8px_rgba(254,188,46,0.4)]', borderInactive: 'border-[#2e230a] hover:border-[#febc2e33]' },
};

export default function CyberCheckbox({
  checked,
  onChange,
  label,
  variant = 'green',
  disabled = false,
  className = '',
}: CyberCheckboxProps) {
  const colors = COLOR_MAP[variant];
  return (
    <div onClick={() => !disabled && onChange(!checked)} className={\`inline-flex items-center gap-2.5 cursor-pointer select-none font-mono text-xs \${disabled ? 'opacity-40 cursor-not-allowed' : ''} \${className}\`}>
      <div className={\`w-4 h-4 border flex items-center justify-center transition-all duration-200 shrink-0 bg-black/40 rounded-sm \${checked ? \`\${colors.borderActive} \${colors.bgActive} \${colors.glow}\` : colors.borderInactive}\`}>
        {checked && <div className={\`w-1.5 h-1.5 rotate-[45deg] bg-current \${colors.text}\`} />}
      </div>
      {label && <span className={\`font-mono text-xs \${checked ? colors.text : 'text-neutral-500'}\`}>{label}</span>}
    </div>
  );
}`,
  CyberDialog: `'use client';

import React, { useEffect } from 'react';
import CyberButton from './CyberButton';

interface CyberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const COLOR_MAP = {
  green: { border: 'border-[#00ff9f33]', text: 'text-[#00ff9f]', shadow: 'shadow-[0_0_30px_rgba(0,255,159,0.15)]', accentText: 'text-[#00ff9f66]', headerBg: 'bg-[#00ff9f0d]', accentBorder: 'border-[#00ff9f22]' },
  cyan: { border: 'border-[#00f0ff33]', text: 'text-[#00f0ff]', shadow: 'shadow-[0_0_30px_rgba(0,240,255,0.15)]', accentText: 'text-[#00f0ff66]', headerBg: 'bg-[#00f0ff0d]', accentBorder: 'border-[#00f0ff22]' },
  red: { border: 'border-[#ff5f5733]', text: 'text-[#ff5f57]', shadow: 'shadow-[0_0_30px_rgba(255,95,87,0.15)]', accentText: 'text-[#ff5f5766]', headerBg: 'bg-[#ff5f570d]', accentBorder: 'border-[#ff5f5722]' },
  amber: { border: 'border-[#febc2e33]', text: 'text-[#febc2e]', shadow: 'shadow-[0_0_30px_rgba(254,188,46,0.15)]', accentText: 'text-[#febc2e66]', headerBg: 'bg-[#febc2e0d]', accentBorder: 'border-[#febc2e22]' },
};

export default function CyberDialog({
  isOpen,
  onClose,
  title = 'ALERT',
  variant = 'green',
  children,
  actions,
  className = '',
}: CyberDialogProps) {
  const colors = COLOR_MAP[variant];
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <div className={\`relative w-full max-w-md bg-[#0a0a0a] border overflow-hidden rounded-lg z-10 flex flex-col \${colors.border} \${colors.shadow} \${className}\`}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="scanline-sweep" /></div>
        <div className={\`flex items-center justify-between px-4 py-3 border-b font-mono text-xs \${colors.accentBorder} \${colors.headerBg}\`}>
          <div className="flex items-center gap-2"><span className={colors.text}>⬡</span><span className={\`font-bold tracking-widest uppercase \${colors.text}\`}>{title}</span></div>
          <button onClick={onClose} className={\`hover:text-white transition-colors duration-200 cursor-pointer font-mono text-sm px-1.5 \${colors.accentText}\`}>[X]</button>
        </div>
        <div className="p-6 font-mono text-xs leading-relaxed text-[#00ff9fcc]">{children}</div>
        <div className={\`flex justify-end gap-3 px-4 py-3 border-t bg-neutral-900/40 \${colors.accentBorder}\`}>
          {actions || <CyberButton variant={variant} size="sm" onClick={onClose}>Acknowledge</CyberButton>}
        </div>
      </div>
    </div>
  );
}`,
  CyberProgress: `'use client';

import React from 'react';

interface CyberProgressProps {
  value: number;
  showText?: boolean;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  type?: 'block' | 'line';
  className?: string;
}

const COLOR_MAP = {
  green: { bar: 'bg-[#00ff9f]', glow: 'shadow-[0_0_8px_#00ff9f]', text: 'text-[#00ff9f]', blockChar: '■' },
  cyan: { bar: 'bg-[#00f0ff]', glow: 'shadow-[0_0_8px_#00f0ff]', text: 'text-[#00f0ff]', blockChar: '■' },
  red: { bar: 'bg-[#ff5f57]', glow: 'shadow-[0_0_8px_#ff5f57]', text: 'text-[#ff5f57]', blockChar: '■' },
  amber: { bar: 'bg-[#febc2e]', glow: 'shadow-[0_0_8px_#febc2e]', text: 'text-[#febc2e]', blockChar: '■' },
};

export default function CyberProgress({
  value,
  showText = true,
  label = 'SYSTEM_LOAD',
  variant = 'green',
  type = 'block',
  className = '',
}: CyberProgressProps) {
  const colors = COLOR_MAP[variant];
  const clampedValue = Math.max(0, Math.min(100, value));
  const renderBlocks = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((clampedValue / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return (
      <span className="font-mono text-sm tracking-widest select-none">
        <span className={colors.text}>{"■".repeat(filledBlocks)}</span>
        <span className="text-neutral-800">{"■".repeat(emptyBlocks)}</span>
      </span>
    );
  };

  return (
    <div className={\`w-full font-mono text-xs \${className}\`}>
      {showText && (
        <div className="flex justify-between items-center mb-1 text-[10px] text-white/50 tracking-wider">
          <span>{label}</span><span className={colors.text}>{Math.round(clampedValue)}%</span>
        </div>
      )}
      {type === 'line' ? (
        <div className="h-2 rounded bg-neutral-900 border border-neutral-900 overflow-hidden">
          <div className={\`h-full transition-all duration-300 \${colors.bar} \${colors.glow}\`} style={{ width: \`\${clampedValue}%\` }} />
        </div>
      ) : (
        <div className="flex items-center gap-2 border border-neutral-900 bg-black/45 p-1 rounded">
          <span className="text-white/20 select-none">[</span>
          <div className="flex-1 text-center">{renderBlocks()}</div>
          <span className="text-white/20 select-none">]</span>
        </div>
      )}
    </div>
  );
}`,
  CyberAlert: `'use client';

import React from 'react';
import CyberBadge from './CyberBadge';
import CyberButton from './CyberButton';

interface CyberAlertProps {
  title?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  children: React.ReactNode;
  onAction?: () => void;
  actionText?: string;
  className?: string;
}

const COLOR_MAP = {
  green: { border: 'border-[#00ff9f] shadow-[0_0_15px_rgba(0,255,159,0.15)]', text: 'text-[#00ff9f]', bg: 'bg-[#00ff9f05]', badge: 'green' },
  cyan: { border: 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.15)]', text: 'text-[#00f0ff]', bg: 'bg-[#00f0ff05]', badge: 'cyan' },
  red: { border: 'border-[#ff5f57] shadow-[0_0_15px_rgba(255,95,87,0.15)]', text: 'text-[#ff5f57]', bg: 'bg-[#ff5f5705]', badge: 'red', flash: 'animate-pulse' },
  amber: { border: 'border-[#febc2e] shadow-[0_0_15px_rgba(254,188,46,0.15)]', text: 'text-[#febc2e]', bg: 'bg-[#febc2e05]', badge: 'amber' },
};

export default function CyberAlert({
  title = 'SECURITY ALERT',
  variant = 'red',
  children,
  onAction,
  actionText = 'Acknowledge',
  className = '',
}: CyberAlertProps) {
  const colors = COLOR_MAP[variant];
  return (
    <div className={\`border rounded-lg p-4 bg-black/90 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono select-none relative overflow-hidden \${colors.border} \${colors.bg} \${colors.flash || ''} \${className}\`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="scanline-sweep" /></div>
      <div className="flex items-start gap-3 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CyberBadge variant={colors.badge as any} brackets={true}>
              {variant === 'red' ? 'CRIT' : variant === 'amber' ? 'WARN' : 'INFO'}
            </CyberBadge>
            <span className={\`text-xs font-bold uppercase tracking-wider \${colors.text}\`}>{title}</span>
          </div>
          <div className="text-xs text-[#00ff9fcc] max-w-lg leading-relaxed">{children}</div>
        </div>
      </div>
      {onAction && (
        <div className="relative z-10 self-end md:self-center shrink-0">
          <CyberButton variant={variant} size="sm" onClick={onAction}>{actionText}</CyberButton>
        </div>
      )}
    </div>
  );
}`,
  CyberLoginForm: `'use client';

import React, { useState } from 'react';
import CyberButton from './CyberButton';
import CyberInput from './CyberInput';
import CyberAlert from './CyberAlert';
import CyberProgress from './CyberProgress';

export default function CyberLoginForm({ onSuccess }: { onSuccess?: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('FIELDS ERROR: ACCESS KEYS REQUIRE VALUES.');
      return;
    }
    setError(null);
    setLoading(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setSuccess(true);
          if (onSuccess) onSuccess(username);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 200);
  };

  return (
    <div className="border border-[#00ff9f22] bg-[#0a0a0aee] shadow-[0_0_40px_rgba(0,255,159,0.1)] rounded-lg max-w-sm w-full overflow-hidden flex flex-col font-mono relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="scanline-sweep" /></div>
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/60 border-b border-[#00ff9f11]">
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] animate-pulse" /><span className="text-xs text-[#00ff9f88] font-bold">MAINFRAME_GATEWAY_v2.8</span></div>
      </div>
      <div className="p-6 flex flex-col gap-5">
        <div className="text-center"><h2 className="text-lg font-bold text-white uppercase mb-1">ACCESS PROTOCOL</h2></div>
        {error && <CyberAlert title="AUTH FAILURE" variant="red" className="p-2 py-1 text-[10px]">{error}</CyberAlert>}
        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-[#00ff9f] text-3xl">✔</div>
            <div className="text-sm font-bold text-white uppercase tracking-widest">ACCESS GRANTED</div>
          </div>
        ) : loading ? (
          <div className="py-8 space-y-4"><CyberProgress value={progress} label="DECRYPTING KEYS" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CyberInput variant="green" prompt="USER_ID:" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="root" />
            <CyberInput variant="green" prompt="KEY_HASH:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            <CyberButton type="submit" variant="green" size="md" isCutCorner={true} className="w-full">INITIALIZE Access</CyberButton>
          </form>
        )}
      </div>
    </div>
  );
}`,
  CyberSignupForm: `'use client';

import React, { useState } from 'react';
import CyberButton from './CyberButton';
import CyberInput from './CyberInput';
import CyberCheckbox from './CyberCheckbox';
import CyberAlert from './CyberAlert';
import CyberProgress from './CyberProgress';

export default function CyberSignupForm({ onSuccess }: { onSuccess?: (data: any) => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [pgpKey, setPgpKey] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !passphrase) {
      setError('VALIDATION ERROR: COMPULSORY FIELDS MISSING.');
      return;
    }
    if (!termsAccepted) {
      setError('SECURITY COMPLIANCE: PROTOCOLS MUST BE ACKNOWLEDGED.');
      return;
    }
    setError(null);
    setLoading(true);
    setProgress(5);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setSuccess(true);
          if (onSuccess) onSuccess({ username, email, pgpKey });
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 150);
  };

  return (
    <div className="border border-[#00ff9f22] bg-[#0a0a0aee] shadow-[0_0_40px_rgba(0,255,159,0.1)] rounded-lg max-w-sm w-full overflow-hidden flex flex-col font-mono relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="scanline-sweep" /></div>
      <div className="p-5 flex flex-col gap-4">
        {error && <CyberAlert title="REGISTRATION FAILURE" variant="amber" className="p-2 py-1 text-[9px]">{error}</CyberAlert>}
        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-[#00ff9f] text-3xl">▣</div>
            <div className="text-xs font-bold text-white uppercase tracking-widest">IDENTITY GENERATED</div>
          </div>
        ) : loading ? (
          <div className="py-8 space-y-4"><CyberProgress value={progress} label="GENERATING CRYPTO KEYPAIRS" variant="cyan" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <CyberInput variant="green" prompt="HANDLE:" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="neo_cyber" />
            <CyberInput variant="green" prompt="ROUTING:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="neo@torproject.org" />
            <CyberInput variant="green" prompt="PASS_KEY:" type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} placeholder="••••••••••••" />
            <CyberCheckbox checked={termsAccepted} onChange={(val) => setTermsAccepted(val)} label="I agree to operate under Darknet privacy protocols." variant="green" />
            <CyberButton type="submit" variant="green" size="sm" isCutCorner={true} className="w-full">REGISTER IDENTITY</CyberButton>
          </form>
        )}
      </div>
    </div>
  );
}`,
  CyberSystemDashboard: `'use client';

import React, { useEffect, useState } from 'react';
import CyberPanel from './CyberPanel';
import CyberProgress from './CyberProgress';
import CyberStatusLine from './CyberStatusLine';
import CyberAlert from './CyberAlert';

export default function CyberSystemDashboard() {
  const [cpu, setCpu] = useState(42);
  const [ram, setRam] = useState(65);
  const [logs, setLogs] = useState([
    '[INFO] System initial boot sequence ready.',
    '[OK] SSH handshake authenticated for user: root.',
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpu((prev) => Math.max(10, Math.min(95, prev + Math.floor(Math.random() * 20) - 10)));
      setRam((prev) => Math.max(50, Math.min(85, prev + Math.floor(Math.random() * 6) - 3)));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-[#00ff9f11] bg-black/85 rounded-lg p-5 font-mono flex flex-col gap-5 w-full max-w-2xl">
      <CyberAlert title="THREAT STATUS: MONITORING" variant="cyan">IDS rules updated. Scanning connections.</CyberAlert>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CyberPanel title="CORE RESOURCES" status="live" variant="green">
          <div className="space-y-4">
            <CyberProgress value={cpu} label="CPU OVERCLOCK LOAD" />
            <CyberProgress value={ram} label="SWAP MEMORY USAGE" type="line" variant="cyan" />
          </div>
        </CyberPanel>
        <CyberPanel title="LOG ANALYSIS" status="active" variant="amber">
          <div className="flex flex-col gap-2.5 h-36 overflow-y-auto text-[9px] text-amber-500/80">
            {logs.map((log, index) => <div key={index}>{log}</div>)}
          </div>
        </CyberPanel>
      </div>
    </div>
  );
}`,
  CyberDataForm: `'use client';

import React, { useState } from 'react';
import CyberPanel from './CyberPanel';
import CyberInput from './CyberInput';
import CyberSwitch from './CyberSwitch';
import CyberCheckbox from './CyberCheckbox';
import CyberTabs from './CyberTabs';
import CyberButton from './CyberButton';

export default function CyberDataForm() {
  const [profile, setProfile] = useState('prof1');
  const [proxyUrl, setProxyUrl] = useState('127.0.0.1');
  const [overclock, setOverclock] = useState(true);
  const [firewall, setFirewall] = useState(true);

  return (
    <div className="w-full max-w-md">
      <CyberPanel title="PROFILES CONFIGURATION" status="config_mode" variant="cyan">
        <div className="space-y-4">
          <CyberTabs tabs={[{ id: 'prof1', label: 'PROFILE_01' }, { id: 'prof2', label: 'PROFILE_02' }]} activeTabId={profile} onChange={setProfile} variant="cyan" />
          <CyberInput variant="cyan" prompt="IP:" value={proxyUrl} onChange={e => setProxyUrl(e.target.value)} />
          <CyberSwitch checked={overclock} onChange={setOverclock} label="CPU_OVERCLOCK" variant="cyan" />
          <CyberCheckbox checked={firewall} onChange={setFirewall} label="Activate IDS firewall protection" variant="cyan" />
          <CyberButton type="submit" variant="cyan" size="sm" isCutCorner={true}>COMMIT_DATA</CyberButton>
        </div>
      </CyberPanel>
    </div>
  );
}`,
  InteractiveConsole: `'use client';

import React, { useState, useRef, useEffect } from 'react';
import CyberInput from './CyberInput';

export default function InteractiveConsole() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: 'system --initialize', type: 'cmd', prompt: 'root@kali:~#' },
    { text: 'Core subsystems initialized. Enter "help" to view options.', type: 'info' },
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;
    const newLines = [{ text: inputVal, type: 'cmd', prompt: 'root@kali:~#' }];

    switch (command) {
      case 'help':
        newLines.push(
          { text: 'help       Display available options', type: 'out' },
          { text: 'scan       Simulate passive sub-network scanner', type: 'out' },
          { text: 'exploit    Deploy payload on 192.168.1.105', type: 'out' },
          { text: 'clear      Clear command history logs', type: 'out' }
        );
        break;
      case 'clear': setHistory([]); setInputVal(''); return;
      case 'scan':
        newLines.push(
          { text: 'Initiating ARP scan...', type: 'info' },
          { text: '[+] Host detected: 192.168.1.105 (Vulnerable)', type: 'ok' }
        );
        break;
      case 'exploit':
        newLines.push(
          { text: 'Exploiting Vulnerable Host...', type: 'info' },
          { text: '[+] Payload executed. FLAG{bUffEr_0vErfL0w_sUccEss_1337}', type: 'ok' }
        );
        break;
      default:
        newLines.push({ text: \`bash: command not found: \${command}\`, type: 'err' });
        break;
    }
    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  return (
    <div className="border border-[#00ff9f22] bg-[#050505ee] rounded-lg overflow-hidden flex flex-col font-mono h-96 w-full max-w-lg">
      <div className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 border-b border-[#00ff9f11]">
        <span className="w-2.5 h-2.5 bg-[#ff5f57] rounded-full" />
        <span className="flex-1 text-center text-[10px] text-[#00ff9f44]">Interactive Bash Terminal</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-5 space-y-2">
        {history.map((line, i) => (
          <div key={i} className={\`flex items-baseline \${line.type === 'cmd' ? 'text-[#00ff9f]' : line.type === 'err' ? 'text-[#ff5f57]' : line.type === 'ok' ? 'text-[#28c840]' : 'text-[#febc2e]'}\`}>
            {line.prompt && <span className="text-[#ff5f57] mr-1.5 select-none">{line.prompt}</span>}
            <span>{line.text}</span>
          </div>
        ))}
        <div ref={consoleBottomRef} />
      </div>
      <form onSubmit={handleCommand} className="border-t border-[#00ff9f11] p-2 bg-black">
        <CyberInput variant="green" prompt="root@kali:~#" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder='Type "help"...' className="border-transparent" />
      </form>
    </div>
  );
}`,
  TargetNetworkMap: `'use client';

import React, { useState } from 'react';
import CyberBadge from './CyberBadge';
import CyberPanel from './CyberPanel';

interface NetworkNode {
  id: string;
  name: string;
  ip: string;
  status: 'secure' | 'compromised' | 'firewalled' | 'scanning';
  x: number;
  y: number;
  os: string;
  ports: string;
}

const NODES: NetworkNode[] = [
  { id: 'gw', name: 'Gateway Router', ip: '192.168.1.1', status: 'secure', x: 250, y: 50, os: 'Cisco IOS', ports: '22, 80, 443' },
  { id: 'fw', name: 'Network Firewall', ip: '192.168.1.2', status: 'firewalled', x: 250, y: 130, os: 'pfSense', ports: '22, 443' },
  { id: 'srv', name: 'Target Server', ip: '192.168.1.105', status: 'compromised', x: 250, y: 220, os: 'Debian 12', ports: '21, 22, 80' },
  { id: 'db', name: 'Database Mainframe', ip: '192.168.1.200', status: 'scanning', x: 400, y: 220, os: 'Ubuntu Server', ports: '3306, 8080' },
];

const CONNECTIONS = [
  { from: 'gw', to: 'fw' },
  { from: 'fw', to: 'srv' },
  { from: 'fw', to: 'db' },
];

export default function TargetNetworkMap() {
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(NODES[2]);
  return (
    <div className="border border-[#00ff9f11] bg-black/60 rounded-lg p-5 font-mono flex flex-col md:flex-row gap-5 w-full max-w-2xl">
      <div className="flex-1 flex flex-col gap-3">
        <div className="relative border border-neutral-900 bg-black/80 rounded h-72">
          <svg className="w-full h-full" viewBox="0 0 500 300">
            {CONNECTIONS.map((conn, idx) => {
              const fromNode = NODES.find(n => n.id === conn.from)!;
              const toNode = NODES.find(n => n.id === conn.to)!;
              return (
                <line key={idx} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke={fromNode.status === 'compromised' || toNode.status === 'compromised' ? '#ff5f57' : '#00ff9f'} strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="6, 12" className="animate-[dash_8s_linear_infinite]" />
              );
            })}
            {NODES.map(node => (
              <g key={node.id} onClick={() => setSelectedNode(node)} className="cursor-pointer">
                <circle cx={node.x} cy={node.y} r="8" className={\`fill-black stroke-current stroke-[1.5] \${node.status === 'compromised' ? 'text-[#ff5f57]' : node.status === 'firewalled' ? 'text-[#febc2e]' : 'text-[#00ff9f]'}\`} />
                <text x={node.x} y={node.y - 14} textAnchor="middle" className="fill-white/80 font-mono text-[8px] font-bold uppercase">{node.name}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      <div className="w-full md:w-56">
        <CyberPanel title="INSPECTOR" status={selectedNode.status} variant={selectedNode.status === 'compromised' ? 'red' : 'green'}>
          <div className="space-y-3 text-[10px]">
            <div><span>HOSTNAME:</span> <span>{selectedNode.name}</span></div>
            <div><span>IP:</span> <span>{selectedNode.ip}</span></div>
            <div><span>PORTS:</span> <span>{selectedNode.ports}</span></div>
          </div>
        </CyberPanel>
      </div>
    </div>
  );
}`,
};

export default function UIKitShowroom() {
  const [activeTab, setActiveTab] = useState<'MatrixRain' | 'TerminalHero' | 'HackerDashboard' | 'ProjectCard' | 'SkillsSection' | 'CyberButton' | 'CyberInput' | 'CyberPanel' | 'CyberBadge' | 'GlitchText' | 'CyberStatusLine' | 'CyberActionCard' | 'CyberConsoleBox' | 'CyberTabs' | 'CyberSwitch' | 'CyberCheckbox' | 'CyberDialog' | 'CyberProgress' | 'CyberAlert' | 'CyberLoginForm' | 'CyberSignupForm' | 'CyberSystemDashboard' | 'CyberDataForm' | 'InteractiveConsole' | 'TargetNetworkMap' | 'installation'>('installation');
  const [codeTab, setCodeTab] = useState<'jsx' | 'raw'>('jsx');
  const [copied, setCopied] = useState(false);

  // States for Playground Props
  const [btnVariant, setBtnVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [btnCut, setBtnCut] = useState(true);
  const [btnGlitch, setBtnGlitch] = useState(true);
  const [btnGlow, setBtnGlow] = useState(true);

  const [inputVariant, setInputVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [inputPrompt, setInputPrompt] = useState('root@kali:~#');
  const [inputGlow, setInputGlow] = useState(true);

  const [panelVariant, setPanelVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [panelTitle, setPanelTitle] = useState('SYSTEM LOGS');
  const [panelStatus, setPanelStatus] = useState('active');
  const [panelControls, setPanelControls] = useState(true);
  const [panelGlow, setPanelGlow] = useState(true);

  const [badgeVariant, setBadgeVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [badgeBrackets, setBadgeBrackets] = useState(true);
  const [badgeText, setBadgeText] = useState('critical');

  const [glitchValue, setGlitchValue] = useState('ACCESS_GRANTED');
  const [glitchTrigger, setGlitchTrigger] = useState<'hover' | 'always'>('hover');
  const [glitchGlow, setGlitchGlow] = useState(true);

  const [rainColor, setRainColor] = useState('#00ff9f');
  const [rainSpeed, setRainSpeed] = useState(0.5);
  const [rainSize, setRainSize] = useState(13);
  const [rainOpacity, setRainOpacity] = useState(0.4);
  const [rainChars, setRainChars] = useState<'all' | 'katakana' | 'binary' | 'hex'>('all');

  const [statusText, setStatusText] = useState('scan complete');
  const [statusDetail, setStatusDetail] = useState('entries indexed');
  const [statusCount, setStatusCount] = useState('6');
  const [statusAddress, setStatusAddress] = useState('192.168.1.42:~/projects');
  const [statusColor, setStatusColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [actionLabel, setActionLabel] = useState('Decrypt Key');
  const [actionValue, setActionValue] = useState('0x3f5c9e2b10ad...');
  const [actionCommand, setActionCommand] = useState('$ decrypt --key 0x9f');
  const [actionDesc, setActionDesc] = useState('RSA key decryptor');
  const [actionIcon, setActionIcon] = useState('[⚡]');
  const [actionColor, setActionColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [consoleCommand, setConsoleCommand] = useState('$ lscpu | grep model');
  const [consoleContent, setConsoleContent] = useState('Model name: Intel(R) Xeon(R) Gold\nCPU family: 6\nStepping: 4');
  const [consoleColor, setConsoleColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [consoleGlow, setConsoleGlow] = useState(true);

  const [tabsActiveId, setTabsActiveId] = useState('tab1');
  const [tabsColor, setTabsColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [switchChecked, setSwitchChecked] = useState(true);
  const [switchColor, setSwitchColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [checkboxColor, setCheckboxColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogColor, setDialogColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [dialogTitle, setDialogTitle] = useState('EXECUTION ALERT');

  const [progressVal, setProgressVal] = useState(75);
  const [progressType, setProgressType] = useState<'block' | 'line'>('block');
  const [progressColor, setProgressColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [progressLabel, setProgressLabel] = useState('SYS_OVERCLOCK');

  const [alertColor, setAlertColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('red');
  const [alertTitle, setAlertTitle] = useState('BACKDOOR DETECTED');
  const [alertText, setAlertText] = useState('An unauthorized backdoor listener was opened on port 4444. System integrity might be compromised.');

  const triggerCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate dynamic JSX based on props
  const getDynamicJSX = () => {
    switch (activeTab) {
      case 'CyberButton':
        return `<CyberButton
  variant="${btnVariant}"
  size="${btnSize}"
  isCutCorner={${btnCut}}
  glitchOnHover={${btnGlitch}}
  glow={${btnGlow}}
>
  Execute Payloads
</CyberButton>`;
      case 'CyberInput':
        return `<CyberInput
  variant="${inputVariant}"
  prompt="${inputPrompt}"
  glow={${inputGlow}}
  placeholder="Enter backdoor commands..."
/>`;
      case 'CyberPanel':
        return `<CyberPanel
  title="${panelTitle}"
  status="${panelStatus}"
  variant="${panelVariant}"
  showControls={${panelControls}}
  glow={${panelGlow}}
>
  <div>$ netstat -antp</div>
  <div className="text-white/70">tcp 0 0 192.168.1.42:22 192.168.1.105:49811 ESTABLISHED</div>
</CyberPanel>`;
      case 'CyberBadge':
        return `<CyberBadge
  variant="${badgeVariant}"
  brackets={${badgeBrackets}}
>
  ${badgeText}
</CyberBadge>`;
      case 'GlitchText':
        return `<GlitchText
  text="${glitchValue}"
  trigger="${glitchTrigger}"
  glow={${glitchGlow}}
/>`;
      case 'MatrixRain':
        return `<MatrixRain
  color="${rainColor}"
  speed={${rainSpeed}}
  fontSize={${rainSize}}
  opacity={${rainOpacity}}
  charType="${rainChars}"
/>`;
      case 'CyberStatusLine':
        return `<CyberStatusLine
  status="${statusText}"
  detail="${statusDetail}"
  count="${statusCount}"
  address="${statusAddress}"
  stateColor="${statusColor}"
/>`;
      case 'CyberActionCard':
        return `<CyberActionCard
  label="${actionLabel}"
  value="${actionValue}"
  command="${actionCommand}"
  description="${actionDesc}"
  icon="${actionIcon}"
  variant="${actionColor}"
/>`;
      case 'CyberConsoleBox':
        return `<CyberConsoleBox
  command="${consoleCommand}"
  content={\`${consoleContent.replace(/\n/g, '\\n')}\`}
  variant="${consoleColor}"
  glow={${consoleGlow}}
/>`;
      case 'CyberTabs':
        return `<CyberTabs
  tabs={[
    { id: 'tab1', label: 'ALL_HOSTS', count: 12 },
    { id: 'tab2', label: 'ACTIVE_EXPLOITS', count: 3 },
    { id: 'tab3', label: 'DISCONNECTED', count: 9 }
  ]}
  activeTabId="${tabsActiveId}"
  onChange={(id) => console.log(id)}
  variant="${tabsColor}"
/>`;
      case 'CyberSwitch':
        return `<CyberSwitch
  checked={${switchChecked}}
  onChange={(val) => console.log(val)}
  label="PORT_SCANNER"
  variant="${switchColor}"
/>`;
      case 'CyberCheckbox':
        return `<CyberCheckbox
  checked={${checkboxChecked}}
  onChange={(val) => console.log(val)}
  label="ENABLE_PROXY"
  variant="${checkboxColor}"
/>`;
      case 'CyberDialog':
        return `<CyberDialog
  isOpen={${dialogOpen}}
  onClose={() => console.log('close')}
  title="${dialogTitle}"
  variant="${dialogColor}"
>
  <p>Warning: Access is unauthorized. Triggering counter-measures.</p>
</CyberDialog>`;
      case 'CyberProgress':
        return `<CyberProgress
  value={${progressVal}}
  label="${progressLabel}"
  type="${progressType}"
  variant="${progressColor}"
/>`;
      case 'CyberAlert':
        return `<CyberAlert
  title="${alertTitle}"
  variant="${alertColor}"
  onAction={() => alert('Mitigated')}
  actionText="MITIGATE"
>
  ${alertText}
</CyberAlert>`;
      case 'CyberLoginForm':
        return `<CyberLoginForm onSuccess={(user) => console.log(user)} />`;
      case 'CyberSignupForm':
        return `<CyberSignupForm onSuccess={(data) => console.log(data)} />`;
      case 'CyberSystemDashboard':
        return `<CyberSystemDashboard />`;
      case 'CyberDataForm':
        return `<CyberDataForm />`;
      case 'InteractiveConsole':
        return `<InteractiveConsole />`;
      case 'TargetNetworkMap':
        return `<TargetNetworkMap />`;
      case 'TerminalHero':
        return `<TerminalHero
  title="CYBER_SHELL"
  subtitle="INTERACTIVE TERMINAL UI KIT"
  badgeText="SYS_ADMIN SECURITY AUDIT"
/>`;
      case 'HackerDashboard':
        return `<HackerDashboard
  scanInterval={1100}
  logInterval={1400}
  bruteInterval={600}
  hexInterval={700}
/>`;
      case 'ProjectCard':
        return `<ProjectCard
  title="Quantum Shield"
  description="Lattice cryptography software firewall designed for embedded ARM architectures."
  tags={["ARM", "Rust", "Crypto"]}
  status="active"
  year={2026}
/>`;
      case 'SkillsSection':
        return `<SkillsSection
  title="System Audit Skills"
  commandPrefix="$ cat audit_skills.txt"
/>`;
      default:
        return '';
    }
  };

  const getSourceCode = () => {
    return SOURCE_CODES[activeTab as keyof typeof SOURCE_CODES] || '// Source code is embedded in component/template files.';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff9f] font-mono flex flex-col relative overflow-hidden">
      {/* Scanline element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="scanline-sweep" />
      </div>
      <div className="absolute inset-0 pointer-events-none crt-noise z-20" />

      {/* Header */}
      <header className="border-b border-[#00ff9f22] bg-[#0c0c0c] px-6 py-4 flex items-center justify-between relative z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[#00ff9f] font-bold text-lg hover:text-shadow-glow transition-all">
            <span className="text-white/40">[</span>
            sifrele<span className="text-white">Net</span>
            <span className="text-white/40">]</span> UI_KIT
          </Link>
          <span className="text-[10px] bg-[#00ff9f15] border border-[#00ff9f44] px-2 py-0.5 rounded text-[#00ff9fcc]">
            v1.3.0_STABLE
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs text-[#00ff9f55]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] animate-pulse" />
            <span>SHOWROOM ONLINE</span>
          </div>
          <Link
            href="/"
            className="text-xs border border-[#1a2e1a] hover:border-[#00ff9f44] hover:text-white px-3 py-1.5 rounded transition-all duration-200"
          >
            ← back_to_home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 border-r border-[#00ff9f11] bg-[#090909]/90 overflow-y-auto p-4 flex flex-col gap-6 shrink-0">
          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2">
              00 // GETTING STARTED
            </div>
            <button
              onClick={() => setActiveTab('installation')}
              className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                activeTab === 'installation'
                  ? 'bg-[#00ff9f0d] text-[#00ff9f] border-[#00ff9f33]'
                  : 'text-[#00ff9f66] border-transparent hover:text-[#00ff9f] hover:bg-white/5'
              }`}
            >
              ⚡ system_installation
            </button>
          </div>

          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2">
              01 // ANIMATIONS
            </div>
            <ul className="space-y-1">
              {['MatrixRain'].map((name) => (
                <li key={name}>
                  <button
                    onClick={() => setActiveTab(name as any)}
                    className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                      activeTab === name
                        ? 'bg-[#00ff9f0d] text-[#00ff9f] border-[#00ff9f33]'
                        : 'text-[#00ff9f66] border-transparent hover:text-[#00ff9f] hover:bg-white/5'
                    }`}
                  >
                    ⬡ {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2">
              02 // CYBER PRIMITIVES
            </div>
            <ul className="space-y-1">
              {['CyberButton', 'CyberInput', 'CyberPanel', 'CyberBadge', 'GlitchText', 'CyberStatusLine', 'CyberActionCard', 'CyberConsoleBox', 'CyberTabs', 'CyberSwitch', 'CyberCheckbox', 'CyberDialog', 'CyberProgress', 'CyberAlert'].map((name) => (
                <li key={name}>
                  <button
                    onClick={() => setActiveTab(name as any)}
                    className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                      activeTab === name
                        ? 'bg-[#00ff9f0d] text-[#00ff9f] border-[#00ff9f33]'
                        : 'text-[#00ff9f66] border-transparent hover:text-[#00ff9f] hover:bg-white/5'
                    }`}
                  >
                    ⚡ {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2">
              03 // CORE TEMPLATES (COMPONENT BASED)
            </div>
            <ul className="space-y-1">
              {['CyberLoginForm', 'CyberSignupForm', 'CyberSystemDashboard', 'CyberDataForm', 'InteractiveConsole', 'TargetNetworkMap', 'TerminalHero', 'HackerDashboard', 'ProjectCard', 'SkillsSection'].map((name) => (
                <li key={name}>
                  <button
                    onClick={() => setActiveTab(name as any)}
                    className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                      activeTab === name
                        ? 'bg-[#00ff9f0d] text-[#00ff9f] border-[#00ff9f33]'
                        : 'text-[#00ff9f66] border-transparent hover:text-[#00ff9f] hover:bg-white/5'
                    }`}
                  >
                    ⚙ {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {activeTab === 'installation' ? (
            /* Installation View */
            <div className="max-w-4xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2 font-mono flex items-center gap-2">
                  <span className="text-[#00ff9f]">00 //</span> SYSTEM INSTALLATION GUIDE
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Cyberpunk UI Kit utilizes React components with TailwindCSS v4 classes. Follow the steps below to setup custom styles, fonts, and animation variables.
                </p>
              </div>

              <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-5 space-y-4">
                <h3 className="text-[#00ff9f] font-bold text-sm">Step 1: CSS Animation & Utility Setup</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Copy the following custom variables and keyframe animations into your <code className="text-[#00ff9f] bg-black/40 px-1 py-0.5 rounded">globals.css</code> file:
                </p>
                <div className="relative">
                  <pre className="bg-black p-4 rounded text-xs text-emerald-400 overflow-x-auto max-h-60 leading-5">
{`/* globals.css */
@import 'tailwindcss';

:root {
  --background: #0a0a0a;
  --foreground: #00ff9f;
  --neon-green: #00ff9f;
  --neon-dim: #00cc7a;
  --surface: #0f0f0f;
  --border: #1a2e1a;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #00ff9f22;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #00ff9f55;
}

/* Cyber animations */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes noise {
  0% { background-position: 0 0; }
  10% { background-position: -5% -10%; }
  30% { background-position: 7% -25%; }
  50% { background-position: -25% 10%; }
  100% { background-position: 0 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
.scanline-sweep {
  position: absolute;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, transparent, rgba(0, 255, 159, 0.06), transparent);
  animation: scanline 10s linear infinite;
}
.crt-noise {
  opacity: 0.018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  animation: noise 0.5s steps(1) infinite;
  pointer-events: none;
}`}
                  </pre>
                  <button
                    onClick={() => triggerCopy(`@import 'tailwindcss';
:root {
  --background: #0a0a0a;
  --foreground: #00ff9f;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s step-end infinite;
}`)}
                    className="absolute right-3 top-3 text-xs bg-[#00ff9f15] hover:bg-[#00ff9f44] border-[#00ff9f44] px-2 py-1 rounded select-none cursor-pointer"
                  >
                    Copy CSS Snippet
                  </button>
                </div>
              </div>

              <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-5 space-y-3 text-sm">
                <h3 className="text-[#00ff9f] font-bold">Step 2: Start building</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Navigate through components in the sidebar. Click on any component to view its options, customize props, copy JSX code blocks, or grab full component source files.
                </p>
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('CyberButton')}
                    className="text-xs bg-[#00ff9f] text-black px-4 py-2 rounded font-bold uppercase hover:shadow-[0_0_15px_rgba(0,255,159,0.4)] cursor-pointer"
                  >
                    Browse CyberButton
                  </button>
                  <button
                    onClick={() => setActiveTab('MatrixRain')}
                    className="text-xs border border-[#00ff9f33] hover:border-[#00ff9f] text-[#00ff9f] px-4 py-2 rounded font-bold uppercase cursor-pointer"
                  >
                    Browse MatrixRain
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Component Playground */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
              {/* Left Column: Preview */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>⚡ PLAYGROUND //</span>
                    <span className="text-[#00ff9f] font-mono">{activeTab}</span>
                  </h3>
                </div>

                <div className="flex-1 min-h-[350px] max-h-[600px] overflow-y-auto border border-[#00ff9f22] bg-[#080808]/90 rounded-lg p-6 flex items-center justify-center relative scrollbar-thin">
                  {/* Active Preview Rendering */}
                  {activeTab === 'MatrixRain' && (
                    <div className="absolute inset-0 bg-[#0a0a0a]">
                      <MatrixRain
                        color={rainColor}
                        speed={rainSpeed}
                        fontSize={rainSize}
                        opacity={rainOpacity}
                        charType={rainChars}
                      />
                      <div className="absolute bottom-3 left-3 text-[10px] text-white/50 bg-black/70 px-2 py-1 rounded font-mono">
                        Active Matrix Simulation
                      </div>
                    </div>
                  )}

                  {activeTab === 'TerminalHero' && (
                    <div className="w-full h-full overflow-y-auto">
                      <TerminalHero
                        title="CYBER_SHELL"
                        subtitle="INTERACTIVE TERMINAL UI KIT"
                        badgeText="SYS_ADMIN SECURITY AUDIT"
                        loopAnimation={true}
                      />
                    </div>
                  )}

                  {activeTab === 'HackerDashboard' && (
                    <div className="w-full h-full overflow-y-auto">
                      <HackerDashboard />
                    </div>
                  )}

                  {activeTab === 'ProjectCard' && (
                    <div className="w-96 max-w-full">
                      <ProjectCard
                        title="Quantum Shield"
                        description="Lattice cryptography software firewall designed for embedded ARM architectures."
                        tags={['ARM', 'Rust', 'Crypto']}
                        status="active"
                        year={2026}
                      />
                    </div>
                  )}

                  {activeTab === 'SkillsSection' && (
                    <div className="w-full overflow-y-auto max-h-[280px]">
                      <SkillsSection
                        title="System Audit Skills"
                        commandPrefix="$ cat audit_skills.txt"
                      />
                    </div>
                  )}

                  {activeTab === 'CyberButton' && (
                    <CyberButton
                      variant={btnVariant}
                      size={btnSize}
                      isCutCorner={btnCut}
                      glitchOnHover={btnGlitch}
                      glow={btnGlow}
                    >
                      Execute Payloads
                    </CyberButton>
                  )}

                  {activeTab === 'CyberInput' && (
                    <div className="w-80 max-w-full">
                      <CyberInput
                        variant={inputVariant}
                        prompt={inputPrompt}
                        glow={inputGlow}
                        placeholder="Enter backdoor commands..."
                      />
                    </div>
                  )}

                  {activeTab === 'CyberPanel' && (
                    <div className="w-96 h-48 max-w-full">
                      <CyberPanel
                        title={panelTitle}
                        status={panelStatus}
                        variant={panelVariant}
                        showControls={panelControls}
                        glow={panelGlow}
                      >
                        <div className="text-[#00ff9f99]">$ netstat -antp</div>
                        <div className="text-white/70">tcp 0 0 192.168.1.42:22 192.168.1.105:49811 ESTABLISHED</div>
                      </CyberPanel>
                    </div>
                  )}

                  {activeTab === 'CyberBadge' && (
                    <div className="flex gap-2">
                      <CyberBadge variant={badgeVariant} brackets={badgeBrackets}>
                        {badgeText}
                      </CyberBadge>
                    </div>
                  )}

                  {activeTab === 'GlitchText' && (
                    <h2 className="text-2xl font-bold font-mono text-[#00ff9f]">
                      <GlitchText
                        text={glitchValue}
                        trigger={glitchTrigger}
                        glow={glitchGlow}
                      />
                    </h2>
                  )}

                  {activeTab === 'CyberStatusLine' && (
                    <div className="w-full max-w-md px-4">
                      <CyberStatusLine
                        status={statusText}
                        detail={statusDetail}
                        count={statusCount}
                        address={statusAddress}
                        stateColor={statusColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberActionCard' && (
                    <div className="w-96 max-w-full">
                      <CyberActionCard
                        label={actionLabel}
                        value={actionValue}
                        command={actionCommand}
                        description={actionDesc}
                        icon={actionIcon}
                        variant={actionColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberConsoleBox' && (
                    <div className="w-full max-w-md">
                      <CyberConsoleBox
                        command={consoleCommand}
                        content={consoleContent}
                        variant={consoleColor}
                        glow={consoleGlow}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberTabs' && (
                    <div className="w-full max-w-md">
                      <CyberTabs
                        tabs={[
                          { id: 'tab1', label: 'ALL_HOSTS', count: 12 },
                          { id: 'tab2', label: 'ACTIVE_EXPLOITS', count: 3 },
                          { id: 'tab3', label: 'DISCONNECTED', count: 9 }
                        ]}
                        activeTabId={tabsActiveId}
                        onChange={(id) => setTabsActiveId(id)}
                        variant={tabsColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberSwitch' && (
                    <div className="flex gap-2">
                      <CyberSwitch
                        checked={switchChecked}
                        onChange={(val) => setSwitchChecked(val)}
                        label="PORT_SCANNER"
                        variant={switchColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberCheckbox' && (
                    <div className="flex gap-2">
                      <CyberCheckbox
                        checked={checkboxChecked}
                        onChange={(val) => setCheckboxChecked(val)}
                        label="ENABLE_PROXY"
                        variant={checkboxColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberDialog' && (
                    <div className="flex flex-col gap-4 items-center">
                      <CyberButton variant={dialogColor} size="sm" onClick={() => setDialogOpen(true)}>
                        Trigger Dialog Window
                      </CyberButton>
                      <CyberDialog
                        isOpen={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                        title={dialogTitle}
                        variant={dialogColor}
                        actions={
                          <div className="flex gap-2">
                            <CyberButton variant={dialogColor} size="sm" onClick={() => setDialogOpen(false)}>
                              ABORT
                            </CyberButton>
                            <CyberButton variant={dialogColor} size="sm" onClick={() => { alert('PROCEEDING'); setDialogOpen(false); }}>
                              EXECUTE
                            </CyberButton>
                          </div>
                        }
                      >
                        <p className="mb-2">Warning: Access to mainframe database is strictly unauthorized.</p>
                        <p>Triggering counter-measures to encrypt local device files in T-minus 10 seconds.</p>
                      </CyberDialog>
                    </div>
                  )}

                  {activeTab === 'CyberProgress' && (
                    <div className="w-80 max-w-full">
                      <CyberProgress
                        value={progressVal}
                        label={progressLabel}
                        type={progressType}
                        variant={progressColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberAlert' && (
                    <div className="w-full px-4">
                      <CyberAlert
                        title={alertTitle}
                        variant={alertColor}
                        onAction={() => alert('Threat fully mitigated')}
                        actionText="MITIGATE"
                      >
                        {alertText}
                      </CyberAlert>
                    </div>
                  )}

                  {activeTab === 'CyberLoginForm' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <CyberLoginForm onSuccess={(user) => alert(`Logged in: ${user}`)} />
                    </div>
                  )}

                  {activeTab === 'CyberSignupForm' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <CyberSignupForm onSuccess={(data) => alert(`Registered handle: ${data.username}`)} />
                    </div>
                  )}

                  {activeTab === 'CyberSystemDashboard' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <CyberSystemDashboard />
                    </div>
                  )}

                  {activeTab === 'CyberDataForm' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <CyberDataForm />
                    </div>
                  )}

                  {activeTab === 'InteractiveConsole' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <InteractiveConsole />
                    </div>
                  )}

                  {activeTab === 'TargetNetworkMap' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <TargetNetworkMap />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Controls & Code Viewer */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Props Controller Panel */}
                <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-4 flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-white uppercase border-b border-[#1a2e1a] pb-2">
                    ⬡ Configure Props
                  </h4>

                  {/* MatrixRain Controls */}
                  {activeTab === 'MatrixRain' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color (Hex):</label>
                        <input
                          type="text"
                          value={rainColor}
                          onChange={(e) => setRainColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Speed: {rainSpeed}</label>
                        <input
                          type="range"
                          min="0.1"
                          max="2"
                          step="0.1"
                          value={rainSpeed}
                          onChange={(e) => setRainSpeed(parseFloat(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Font Size: {rainSize}px</label>
                        <input
                          type="range"
                          min="8"
                          max="24"
                          value={rainSize}
                          onChange={(e) => setRainSize(parseInt(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Opacity: {rainOpacity}</label>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={rainOpacity}
                          onChange={(e) => setRainOpacity(parseFloat(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Characters Set:</label>
                        <select
                          value={rainChars}
                          onChange={(e: any) => setRainChars(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="all">All Combined</option>
                          <option value="katakana">Japanese Katakana</option>
                          <option value="binary">Binary (01)</option>
                          <option value="hex">Hexadecimal</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberButton Controls */}
                  {activeTab === 'CyberButton' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color Variant:</label>
                        <select
                          value={btnVariant}
                          onChange={(e: any) => setBtnVariant(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Size:</label>
                        <select
                          value={btnSize}
                          onChange={(e: any) => setBtnSize(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="sm">Small</option>
                          <option value="md">Medium</option>
                          <option value="lg">Large</option>
                        </select>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={btnCut}
                            onChange={(e) => setBtnCut(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Cut Corner
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={btnGlitch}
                            onChange={(e) => setBtnGlitch(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glitch Hover
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={btnGlow}
                            onChange={(e) => setBtnGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glow Shadow
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberInput Controls */}
                  {activeTab === 'CyberInput' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color Variant:</label>
                        <select
                          value={inputVariant}
                          onChange={(e: any) => setInputVariant(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Prompt Prefix:</label>
                        <input
                          type="text"
                          value={inputPrompt}
                          onChange={(e) => setInputPrompt(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={inputGlow}
                            onChange={(e) => setInputGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glow Focus
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberPanel Controls */}
                  {activeTab === 'CyberPanel' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color Variant:</label>
                        <select
                          value={panelVariant}
                          onChange={(e: any) => setPanelVariant(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Title:</label>
                        <input
                          type="text"
                          value={panelTitle}
                          onChange={(e) => setPanelTitle(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Status Text:</label>
                        <input
                          type="text"
                          value={panelStatus}
                          onChange={(e) => setPanelStatus(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div className="flex gap-4 mt-1">
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={panelControls}
                            onChange={(e) => setPanelControls(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Show Dots
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={panelGlow}
                            onChange={(e) => setPanelGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glow Hover
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberBadge Controls */}
                  {activeTab === 'CyberBadge' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color Variant:</label>
                        <select
                          value={badgeVariant}
                          onChange={(e: any) => setBadgeVariant(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Badge Text:</label>
                        <input
                          type="text"
                          value={badgeText}
                          onChange={(e) => setBadgeText(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={badgeBrackets}
                            onChange={(e) => setBadgeBrackets(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Render brackets `[ ]`
                        </label>
                      </div>
                    </div>
                  )}

                  {/* GlitchText Controls */}
                  {activeTab === 'GlitchText' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Text Value:</label>
                        <input
                          type="text"
                          value={glitchValue}
                          onChange={(e) => setGlitchValue(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Trigger condition:</label>
                        <select
                          value={glitchTrigger}
                          onChange={(e: any) => setGlitchTrigger(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="hover">Hover</option>
                          <option value="always">Always Loop</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={glitchGlow}
                            onChange={(e) => setGlitchGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Text Glow
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberStatusLine Controls */}
                  {activeTab === 'CyberStatusLine' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Status Title:</label>
                        <input
                          type="text"
                          value={statusText}
                          onChange={(e) => setStatusText(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Detail Text:</label>
                        <input
                          type="text"
                          value={statusDetail}
                          onChange={(e) => setStatusDetail(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Count:</label>
                        <input
                          type="text"
                          value={statusCount}
                          onChange={(e) => setStatusCount(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">IP / Host Address:</label>
                        <input
                          type="text"
                          value={statusAddress}
                          onChange={(e) => setStatusAddress(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Pulsing Dot Color:</label>
                        <select
                          value={statusColor}
                          onChange={(e: any) => setStatusColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Green (OK)</option>
                          <option value="cyan">Cyan (SYS)</option>
                          <option value="amber">Amber (WARN)</option>
                          <option value="red">Red (CRIT)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberActionCard Controls */}
                  {activeTab === 'CyberActionCard' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Label:</label>
                        <input
                          type="text"
                          value={actionLabel}
                          onChange={(e) => setActionLabel(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Sub Value:</label>
                        <input
                          type="text"
                          value={actionValue}
                          onChange={(e) => setActionValue(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Command Prompt:</label>
                        <input
                          type="text"
                          value={actionCommand}
                          onChange={(e) => setActionCommand(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Description:</label>
                        <input
                          type="text"
                          value={actionDesc}
                          onChange={(e) => setActionDesc(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">ASCII Icon Symbol:</label>
                        <input
                          type="text"
                          value={actionIcon}
                          onChange={(e) => setActionIcon(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Card Theme Color:</label>
                        <select
                          value={actionColor}
                          onChange={(e: any) => setActionColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberConsoleBox Controls */}
                  {activeTab === 'CyberConsoleBox' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Shell command prompt:</label>
                        <input
                          type="text"
                          value={consoleCommand}
                          onChange={(e) => setConsoleCommand(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Raw Output Content:</label>
                        <textarea
                          rows={3}
                          value={consoleContent}
                          onChange={(e) => setConsoleContent(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Console Color:</label>
                        <select
                          value={consoleColor}
                          onChange={(e: any) => setConsoleColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={consoleGlow}
                            onChange={(e) => setConsoleGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glow Shadow
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberTabs Controls */}
                  {activeTab === 'CyberTabs' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Selected Tab:</label>
                        <select
                          value={tabsActiveId}
                          onChange={(e) => setTabsActiveId(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="tab1">ALL_HOSTS (Tab 1)</option>
                          <option value="tab2">ACTIVE_EXPLOITS (Tab 2)</option>
                          <option value="tab3">DISCONNECTED (Tab 3)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Tabs Theme Color:</label>
                        <select
                          value={tabsColor}
                          onChange={(e: any) => setTabsColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberSwitch Controls */}
                  {activeTab === 'CyberSwitch' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Switch Color Theme:</label>
                        <select
                          value={switchColor}
                          onChange={(e: any) => setSwitchColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={switchChecked}
                            onChange={(e) => setSwitchChecked(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Checked Status
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberCheckbox Controls */}
                  {activeTab === 'CyberCheckbox' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Checkbox Color Theme:</label>
                        <select
                          value={checkboxColor}
                          onChange={(e: any) => setCheckboxColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={checkboxChecked}
                            onChange={(e) => setCheckboxChecked(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Checked Status
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberDialog Controls */}
                  {activeTab === 'CyberDialog' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Title:</label>
                        <input
                          type="text"
                          value={dialogTitle}
                          onChange={(e) => setDialogTitle(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Dialog Color Theme:</label>
                        <select
                          value={dialogColor}
                          onChange={(e: any) => setDialogColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberProgress Controls */}
                  {activeTab === 'CyberProgress' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Progress Level: {progressVal}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progressVal}
                          onChange={(e) => setProgressVal(parseInt(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Progress Design Type:</label>
                        <select
                          value={progressType}
                          onChange={(e: any) => setProgressType(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="block">Retro Monospace Blocks [■■■□□]</option>
                          <option value="line">Modern Neon Glow Line</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Label Text:</label>
                        <input
                          type="text"
                          value={progressLabel}
                          onChange={(e) => setProgressLabel(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Progress Color Theme:</label>
                        <select
                          value={progressColor}
                          onChange={(e: any) => setProgressColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberAlert Controls */}
                  {activeTab === 'CyberAlert' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Alert Title:</label>
                        <input
                          type="text"
                          value={alertTitle}
                          onChange={(e) => setAlertTitle(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Alert Description:</label>
                        <textarea
                          rows={2}
                          value={alertText}
                          onChange={(e) => setAlertText(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Alert Color Theme:</label>
                        <select
                          value={alertColor}
                          onChange={(e: any) => setAlertColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="red">Warning Red (CRIT)</option>
                          <option value="amber">Alert Amber (WARN)</option>
                          <option value="cyan">Cyber Cyan (INFO)</option>
                          <option value="green">Neon Green (OK)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Fallback for templates without complex settings */}
                  {['CyberLoginForm', 'CyberSignupForm', 'CyberSystemDashboard', 'CyberDataForm', 'InteractiveConsole', 'TargetNetworkMap', 'TerminalHero', 'HackerDashboard', 'ProjectCard', 'SkillsSection'].includes(activeTab) && (
                    <p className="text-[11px] text-white/40 leading-relaxed font-mono">
                      This template component displays static configurations in the preview. Edit variables in standard implementation logic to adjust colors, grids, or data streams.
                    </p>
                  )}
                </div>

                {/* Code Snippets Viewer */}
                <div className="flex-1 border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] overflow-hidden flex flex-col">
                  {/* Tab Selector */}
                  <div className="bg-neutral-900/50 border-b border-[#1a2e1a] flex text-[10px]">
                    <button
                      onClick={() => setCodeTab('jsx')}
                      className={`px-4 py-2 border-r border-[#1a2e1a] uppercase font-mono ${
                        codeTab === 'jsx' ? 'bg-[#0d0d0d] text-[#00ff9f] font-bold' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      Copy Component JSX
                    </button>
                    {SOURCE_CODES[activeTab as keyof typeof SOURCE_CODES] && (
                      <button
                        onClick={() => setCodeTab('raw')}
                        className={`px-4 py-2 border-r border-[#1a2e1a] uppercase font-mono ${
                          codeTab === 'raw' ? 'bg-[#0d0d0d] text-[#00ff9f] font-bold' : 'text-white/50 hover:text-white'
                        }`}
                      >
                        Raw Source Code (File content)
                      </button>
                    )}
                    <button
                      onClick={() => triggerCopy(codeTab === 'jsx' ? getDynamicJSX() : getSourceCode())}
                      className="ml-auto px-4 py-2 text-white/60 hover:text-[#00ff9f] hover:bg-[#00ff9f0d] flex items-center gap-1 select-none cursor-pointer"
                    >
                      {copied ? '✔ COPIED' : '⧉ COPY_CODE'}
                    </button>
                  </div>

                  {/* Pre/Code */}
                  <div className="flex-1 p-4 overflow-auto max-h-[300px] bg-black/60 relative">
                    <pre className="text-xs text-[#00ff9fcc] font-mono leading-5 whitespace-pre">
                      {codeTab === 'jsx' ? getDynamicJSX() : getSourceCode()}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
