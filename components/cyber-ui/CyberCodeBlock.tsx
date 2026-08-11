'use client';

import React, { useState } from 'react';

interface CyberCodeBlockProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: { border: 'border-[#1a2e1a]', text: 'text-neon-green', header: 'bg-[#0d1a0d]', dim: 'text-neon-green/30', glow: 'shadow-[0_0_20px_rgba(0,255,159,0.08)]', badge: 'bg-neon-green/10 text-neon-green border-neon-green/20' },
  cyan:  { border: 'border-[#0a232e]', text: 'text-[#00f0ff]', header: 'bg-[#07181f]', dim: 'text-[#00f0ff]/30', glow: 'shadow-[0_0_20px_rgba(0,240,255,0.08)]', badge: 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/20' },
  red:   { border: 'border-[#2d1212]', text: 'text-[#ff5f57]', header: 'bg-[#1a0d0d]', dim: 'text-[#ff5f57]/30', glow: 'shadow-[0_0_20px_rgba(255,95,87,0.08)]', badge: 'bg-[#ff5f57]/10 text-[#ff5f57] border-[#ff5f57]/20' },
  amber: { border: 'border-[#2e230a]', text: 'text-[#febc2e]', header: 'bg-[#1a1407]', dim: 'text-[#febc2e]/30', glow: 'shadow-[0_0_20px_rgba(254,188,46,0.08)]', badge: 'bg-[#febc2e]/10 text-[#febc2e] border-[#febc2e]/20' },
};

export default function CyberCodeBlock({
  variant = 'green',
  code,
  language = 'bash',
  filename,
  showLineNumbers = true,
  glow = true,
  className = '',
}: CyberCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const c = COLOR_MAP[variant];
  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`
        border rounded-lg overflow-hidden font-mono text-sm
        ${c.border} bg-black/60 backdrop-blur-sm
        ${glow ? c.glow : ''}
        ${className}
      `}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${c.border} ${c.header}`}>
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-neon-green/60" />
          </div>
          {filename && (
            <span className={`text-[11px] ${c.dim}`}>{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border ${c.badge}`}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            className={`text-[10px] px-2 py-0.5 rounded border transition-all cursor-pointer ${c.badge} hover:opacity-80`}
          >
            {copied ? '✔ COPIED' : '⧉ COPY'}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="group hover:bg-white/2">
                {showLineNumbers && (
                  <td className={`text-right pr-4 pl-4 py-0 text-[11px] select-none w-8 ${c.dim} border-r ${c.border}`}>
                    {i + 1}
                  </td>
                )}
                <td className={`pl-4 pr-4 py-0 text-[12px] leading-6 whitespace-pre ${c.text}`}>
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
