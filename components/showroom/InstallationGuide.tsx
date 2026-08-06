'use client';

import React, { useState } from 'react';

interface InstallationGuideProps {
  setActiveTab: (tab: any) => void;
}

export default function InstallationGuide({ setActiveTab }: InstallationGuideProps) {
  const [copied, setCopied] = useState(false);

  const copyCss = () => {
    const cssText = `@import 'tailwindcss';
:root {
  --background: #0a0a0a;
  --foreground: var(--neon-green);
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s step-end infinite;
}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-6 select-none font-mono">
      <div>
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="text-neon-green">00 //</span> SYSTEM INSTALLATION GUIDE
        </h2>
        <p className="text-white/60 text-sm leading-relaxed">
          Cyberpunk UI Kit utilizes React components with TailwindCSS v4 classes. Follow the steps below to setup custom styles, fonts, and animation variables.
        </p>
      </div>

      <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-5 space-y-4">
        <h3 className="text-neon-green font-bold text-sm">Step 1: CSS Animation & Utility Setup</h3>
        <p className="text-white/60 text-xs leading-relaxed">
          Copy the following custom variables and keyframe animations into your <code className="text-neon-green bg-black/40 px-1 py-0.5 rounded">globals.css</code> file:
        </p>
        <div className="relative">
          <pre className="bg-black p-4 rounded text-xs text-emerald-400 overflow-x-auto max-h-60 leading-5">
{`/* globals.css */
@import 'tailwindcss';

:root {
  --background: #0a0a0a;
  --foreground: var(--neon-green);
  --neon-green: var(--neon-green);
  --neon-dim: #00cc7a;
  --surface: #0f0f0f;
  --border: #1a2e1a;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--neon-green) 13%, transparent);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--neon-green) 33%, transparent);
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
            onClick={copyCss}
            className="absolute right-3 top-3 text-xs bg-neon-green/8 hover:bg-neon-green/27 border border-neon-green/27 text-neon-green px-2 py-1 rounded select-none cursor-pointer transition-all"
          >
            {copied ? 'Copied!' : 'Copy CSS Snippet'}
          </button>
        </div>
      </div>

      <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-5 space-y-3 text-sm">
        <h3 className="text-neon-green font-bold">Step 2: Start building</h3>
        <p className="text-white/60 text-xs leading-relaxed">
          Navigate through components in the sidebar. Click on any component to view its options, customize props, copy JSX code blocks, or grab full component source files.
        </p>
        <div className="flex gap-4 pt-2">
          <button
            onClick={() => setActiveTab('CyberButton')}
            className="text-xs bg-neon-green text-black px-4 py-2 rounded font-bold uppercase hover:shadow-[0_0_15px_rgba(0,255,159,0.4)] cursor-pointer transition-all"
          >
            Browse CyberButton
          </button>
          <button
            onClick={() => setActiveTab('MatrixRain')}
            className="text-xs border border-neon-green/20 hover:border-neon-green text-neon-green px-4 py-2 rounded font-bold uppercase cursor-pointer transition-all"
          >
            Browse MatrixRain
          </button>
        </div>
      </div>
    </div>
  );
}
