'use client';

import React, { useState } from 'react';
import { COMPONENT_REGISTRY } from './componentRegistry';

interface InstallationGuideProps {
  setActiveTab: (tab: any) => void;
}

function CopyBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group">
      {label && <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-bold">{label}</div>}
      <pre className="bg-black/70 border border-[#1a2e1a] p-4 rounded text-xs text-emerald-400 overflow-x-auto leading-5 whitespace-pre-wrap">
        {code}
      </pre>
      <button
        onClick={copy}
        className="absolute right-3 top-3 text-xs bg-neon-green/8 hover:bg-neon-green/20 border border-neon-green/20 text-neon-green px-2 py-1 rounded select-none cursor-pointer transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? '✔ Copied' : '⧉ Copy'}
      </button>
    </div>
  );
}

function StepCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-5 space-y-4">
      <h3 className="text-neon-green font-bold text-sm flex items-center gap-2">
        <span className="text-white/30">{number}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

const CSS_SNIPPET = `/* globals.css */
@import 'tailwindcss';

:root {
  --background: #0a0a0a;
  --foreground: var(--neon-green);
  --neon-green: #00ff9f;
  --neon-dim: #00cc7a;
  --surface: #0f0f0f;
  --border: #1a2e1a;
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--neon-green) 13%, transparent);
  border-radius: 2px;
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
  50% { background-position: -25% 10%; }
  100% { background-position: 0 0; }
}
.animate-blink { animation: blink 1s step-end infinite; }
.scanline-sweep {
  position: absolute; width: 100%; height: 3px;
  background: linear-gradient(to right, transparent, rgba(0,255,159,0.06), transparent);
  animation: scanline 10s linear infinite;
}
.crt-noise {
  opacity: 0.018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  animation: noise 0.5s steps(1) infinite;
}`;

export default function InstallationGuide({ setActiveTab }: InstallationGuideProps) {
  const [selectedPkgMgr, setSelectedPkgMgr] = useState<'npx' | 'yarn' | 'pnpm' | 'bun'>('npx');
  const [selectedComponent, setSelectedComponent] = useState('CyberButton');

  const totalComponents = COMPONENT_REGISTRY.length;

  const cliCommands: Record<string, string> = {
    npx: `npx sifrelenet-ui-kit add ${selectedComponent}`,
    yarn: `yarn dlx sifrelenet-ui-kit add ${selectedComponent}`,
    pnpm: `pnpm dlx sifrelenet-ui-kit add ${selectedComponent}`,
    bun: `bunx sifrelenet-ui-kit add ${selectedComponent}`,
  };

  const allComponents = COMPONENT_REGISTRY.map((c) => c.name);

  return (
    <div className="max-w-4xl space-y-6 select-none font-mono">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="text-neon-green">{'// '}</span>
          SYSTEM INSTALLATION GUIDE
        </h2>
        <p className="text-white/60 text-sm leading-relaxed">
          Cyberpunk UI Kit — <span className="text-neon-green">{totalComponents} components</span> available.
          Use the CLI to add individual components directly into your project, or set up manually.
        </p>
      </div>

      {/* ── Method A: CLI (recommended) ───────────────────────────────────── */}
      <div className="border border-neon-green/20 rounded-lg bg-[#0a0f0a] p-5 space-y-4 relative overflow-hidden">
        {/* glow accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/40 to-transparent" />
        <div className="flex items-center gap-3">
          <span className="bg-neon-green text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Recommended</span>
          <h3 className="text-neon-green font-bold text-sm">Method A — CLI (npx / yarn / pnpm / bun)</h3>
        </div>
        <p className="text-white/60 text-xs leading-relaxed">
          The CLI copies the component source file directly into your project and automatically installs all required dependencies.
          No extra wrappers, no hidden packages — just raw, editable code in your codebase.
        </p>

        {/* Step 1: Pick component */}
        <div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">1. Pick a component</div>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto scrollbar-thin pr-1">
            {allComponents.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedComponent(name)}
                className={`text-[10px] font-mono px-2 py-1 rounded border transition-all cursor-pointer ${
                  selectedComponent === name
                    ? 'bg-neon-green/10 text-neon-green border-neon-green/30'
                    : 'text-white/40 border-white/10 hover:border-neon-green/20 hover:text-neon-green/70'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Pick package manager */}
        <div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">2. Choose your package manager</div>
          <div className="flex gap-2">
            {(['npx', 'yarn', 'pnpm', 'bun'] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setSelectedPkgMgr(pm)}
                className={`text-xs font-mono px-3 py-1.5 rounded border transition-all cursor-pointer ${
                  selectedPkgMgr === pm
                    ? 'bg-neon-green/10 text-neon-green border-neon-green/30'
                    : 'text-white/40 border-white/10 hover:border-neon-green/20 hover:text-neon-green/70'
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Command */}
        <div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">3. Run this command in your project root</div>
          <CopyBlock code={cliCommands[selectedPkgMgr]} />
        </div>

        {/* What happens */}
        <div className="bg-black/40 border border-[#1a2e1a] rounded p-3 text-xs text-white/50 space-y-1">
          <div className="text-white/70 font-bold mb-2 text-[10px] uppercase tracking-widest">What the CLI does:</div>
          <div className="flex items-start gap-2"><span className="text-neon-green mt-px">›</span><span>Copies <code className="text-neon-green bg-black/40 px-1 rounded">{selectedComponent}.tsx</code> into your <code className="text-neon-green bg-black/40 px-1 rounded">components/cyber-ui/</code> directory</span></div>
          <div className="flex items-start gap-2"><span className="text-neon-green mt-px">›</span><span>Resolves and installs all internal component dependencies automatically</span></div>
          <div className="flex items-start gap-2"><span className="text-neon-green mt-px">›</span><span>Installs required npm packages (e.g. <code className="text-neon-green bg-black/40 px-1 rounded">framer-motion</code>, <code className="text-neon-green bg-black/40 px-1 rounded">lucide-react</code>) with your package manager</span></div>
          <div className="flex items-start gap-2"><span className="text-neon-green mt-px">›</span><span>The component code is yours — fully editable, no lock-in</span></div>
        </div>

        {/* Import example */}
        <div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">4. Import and use</div>
          <CopyBlock code={`import ${selectedComponent} from '@/components/cyber-ui/${selectedComponent}';\n\nexport default function Page() {\n  return <${selectedComponent} />\n}`} />
        </div>
      </div>

      {/* ── Method B: Manual ────────────────────────────────────────────── */}
      <StepCard number="B //" title="Method B — Manual Setup">
        <p className="text-white/60 text-xs leading-relaxed">
          If you prefer full control, you can copy component source files manually from the <span className="text-neon-green">Raw Source</span> tab in any component&apos;s code viewer and paste them into your project.
        </p>
        <ol className="space-y-2 text-xs text-white/60">
          <li className="flex items-start gap-2"><span className="text-neon-green shrink-0">01.</span><span>Select any component from the sidebar on the left</span></li>
          <li className="flex items-start gap-2"><span className="text-neon-green shrink-0">02.</span><span>Click <strong className="text-white">Raw Source</strong> tab in the code viewer panel</span></li>
          <li className="flex items-start gap-2"><span className="text-neon-green shrink-0">03.</span><span>Click <strong className="text-white">Copy Code</strong> and paste it into <code className="text-neon-green bg-black/40 px-1 rounded">components/cyber-ui/ComponentName.tsx</code></span></li>
          <li className="flex items-start gap-2"><span className="text-neon-green shrink-0">04.</span><span>Install any peer dependencies listed at the top of the file</span></li>
        </ol>
      </StepCard>

      {/* ── Step: CSS Setup ──────────────────────────────────────────────── */}
      <StepCard number="C //" title="Required: CSS Variables & Animations">
        <p className="text-white/60 text-xs leading-relaxed">
          Add the following to your <code className="text-neon-green bg-black/40 px-1 py-0.5 rounded">globals.css</code> file. These CSS variables and keyframe animations power the neon glow, scanline sweep, and CRT noise effects used across all components.
        </p>
        <CopyBlock code={CSS_SNIPPET} label="globals.css" />
      </StepCard>

      {/* ── Quick start buttons ───────────────────────────────────────────── */}
      <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-5 space-y-3">
        <h3 className="text-neon-green font-bold text-sm">{'// '} Ready? Start Browsing</h3>
        <p className="text-white/60 text-xs">
          {totalComponents} components across 4 categories — animations, primitives, advanced controls, and full templates.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          {['CyberButton', 'CyberTable', 'CyberCommandMenu', 'MatrixRain', 'CyberLoginForm'].map((name) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className="text-xs border border-neon-green/20 hover:border-neon-green hover:bg-neon-green/5 text-neon-green px-3 py-1.5 rounded font-bold uppercase cursor-pointer transition-all"
            >
              {name} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
