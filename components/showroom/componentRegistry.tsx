'use client';

import React from 'react';

// ─── Component Imports ────────────────────────────────────────────────────────
import MatrixRain from '@/components/MatrixRain';
import CyberPulseRadar from '@/components/cyber-ui/CyberPulseRadar';
import TextDecryptor from '@/components/cyber-ui/TextDecryptor';
import HologramContainer from '@/components/cyber-ui/HologramContainer';
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
import CyberTable from '@/components/cyber-ui/CyberTable';
import CyberTooltip from '@/components/cyber-ui/CyberTooltip';
import { CyberToastProvider, useCyberToast } from '@/components/cyber-ui/CyberToast';
import CyberCommandMenu from '@/components/cyber-ui/CyberCommandMenu';
import CyberAccordion from '@/components/cyber-ui/CyberAccordion';
import CyberSlider from '@/components/cyber-ui/CyberSlider';
import CyberOtpInput from '@/components/cyber-ui/CyberOtpInput';
import CyberSkeleton from '@/components/cyber-ui/CyberSkeleton';
import CyberBreadcrumb from '@/components/cyber-ui/CyberBreadcrumb';
import CyberDropdown from '@/components/cyber-ui/CyberDropdown';
import CyberLoginForm from '@/components/cyber-ui/CyberLoginForm';
import CyberSignupForm from '@/components/cyber-ui/CyberSignupForm';
import CyberSystemDashboard from '@/components/cyber-ui/CyberSystemDashboard';
import CyberDataForm from '@/components/cyber-ui/CyberDataForm';
import InteractiveConsole from '@/components/cyber-ui/InteractiveConsole';
import TargetNetworkMap from '@/components/cyber-ui/TargetNetworkMap';
import TerminalHero from '@/components/TerminalHero';
import HackerDashboard from '@/components/HackerDashboard';
import ProjectCard from '@/components/ProjectCard';
import SkillsSection from '@/components/SkillsSection';
import CyberTextarea from '@/components/cyber-ui/CyberTextarea';
import CyberPagination from '@/components/cyber-ui/CyberPagination';
import CyberStat from '@/components/cyber-ui/CyberStat';
import CyberDivider from '@/components/cyber-ui/CyberDivider';
import CyberCodeBlock from '@/components/cyber-ui/CyberCodeBlock';
import CyberTagInput from '@/components/cyber-ui/CyberTagInput';
import CyberNumberInput from '@/components/cyber-ui/CyberNumberInput';
import CyberAvatar from '@/components/cyber-ui/CyberAvatar';

// ─── Types ─────────────────────────────────────────────────────────────────────
export type PropControlType =
  | { type: 'select'; name: string; label: string; options: { value: string; label: string }[]; defaultValue: string }
  | { type: 'text'; name: string; label: string; defaultValue: string }
  | { type: 'boolean'; name: string; label: string; defaultValue: boolean }
  | { type: 'range'; name: string; label: string; min: number; max: number; step?: number; defaultValue: number };

export type ComponentCategory = 'animations' | 'primitives' | 'advanced' | 'templates';

export interface ComponentMeta {
  name: string;
  category: ComponentCategory;
  description: string;
  controls: PropControlType[];
  // The render function receives current prop values and returns JSX for preview
  preview: (props: Record<string, any>) => React.ReactNode;
  // The JSX snippet to show in the code viewer
  jsxSnippet: (props: Record<string, any>) => string;
}

// ─── Helper: variant select control ──────────────────────────────────────────
const variantControl = (defaultValue = 'green'): PropControlType => ({
  type: 'select',
  name: 'variant',
  label: 'Color Theme',
  defaultValue,
  options: [
    { value: 'green', label: 'Neon Green' },
    { value: 'cyan', label: 'Cyber Cyan' },
    { value: 'red', label: 'Warning Red' },
    { value: 'amber', label: 'Alert Amber' },
  ],
});

// ─── Toast Demo inner (needs hook) ───────────────────────────────────────────
function ToastDemoInner({ variant }: { variant: string }) {
  const { toast } = useCyberToast();
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Click to fire a toast notification</p>
      <CyberButton variant={variant as any} size="md" onClick={() => toast({
        title: 'ACCESS_GRANTED',
        message: 'Authentication sequence completed successfully.',
        variant: variant as any,
      })}>
        Fire Toast
      </CyberButton>
    </div>
  );
}

// ─── Named Preview Components (needed for previews that use React hooks) ──────
function CyberTabsPreview({ variant }: { variant: any }) {
  const [active, setActive] = React.useState('tab1');
  return (
    <div className="w-full max-w-md">
      <CyberTabs
        tabs={[{ id: 'tab1', label: 'ALL_HOSTS', count: 12 }, { id: 'tab2', label: 'ACTIVE_EXPLOITS', count: 3 }, { id: 'tab3', label: 'DISCONNECTED', count: 9 }]}
        activeTabId={active}
        onChange={setActive}
        variant={variant}
      />
    </div>
  );
}

function CyberSwitchPreview({ variant }: { variant: any }) {
  const [val, setVal] = React.useState(true);
  return <CyberSwitch checked={val} onChange={setVal} label="PORT_SCANNER" variant={variant} />;
}

function CyberCheckboxPreview({ variant }: { variant: any }) {
  const [val, setVal] = React.useState(true);
  return <CyberCheckbox checked={val} onChange={setVal} label="ENABLE_PROXY" variant={variant} />;
}

function CyberDialogPreview({ variant, title }: { variant: any; title: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-4 items-center">
      <CyberButton variant={variant} size="sm" onClick={() => setOpen(true)}>Trigger Dialog</CyberButton>
      <CyberDialog isOpen={open} onClose={() => setOpen(false)} title={title} variant={variant}
        actions={<div className="flex gap-2"><CyberButton variant={variant} size="sm" onClick={() => setOpen(false)}>ABORT</CyberButton></div>}>
        <p>Warning: Access to mainframe is strictly unauthorized. Counter-measures activating in T-10s.</p>
      </CyberDialog>
    </div>
  );
}

function CyberSliderPreview({ variant, showTicks }: { variant: any; showTicks: boolean }) {
  const [val, setVal] = React.useState(60);
  return (
    <div className="w-full max-w-sm flex flex-col gap-6">
      <CyberSlider label="SIGNAL_STRENGTH" min={0} max={100} value={val} onChange={setVal} variant={variant} showTicks={showTicks} />
      <CyberSlider label="FREQUENCY_BAND" min={0} max={5000} step={100} value={2400} onChange={() => {}} variant={variant} />
    </div>
  );
}

function CyberOtpInputPreview({ length, variant }: { length: number; variant: any }) {
  const [val, setVal] = React.useState('');
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Enter Verification Code</p>
      <CyberOtpInput length={length} value={val} onChange={setVal} variant={variant} />
      {val.length === length && <p className="text-neon-green text-[11px] font-mono animate-pulse">[ CODE: {val} — VERIFYING... ]</p>}
    </div>
  );
}

function CyberDropdownPreview({ variant }: { variant: any }) {
  const [val, setVal] = React.useState('');
  return (
    <div className="w-64">
      <CyberDropdown value={val} onChange={setVal} variant={variant} placeholder="SELECT TUNNEL PROTOCOL..."
        options={[{ value: 'ssh', label: 'SSH Tunnel (Port 22)' }, { value: 'vpn', label: 'VPN Proxy (WireGuard)' }, { value: 'tor', label: 'TOR Network (Anonymous)' }, { value: 'proxy', label: 'SOCKS5 Proxy' }]}
      />
    </div>
  );
}

// ─── REGISTRY ─────────────────────────────────────────────────────────────────
// To add a new component: just push a new entry into this array.
// The sidebar, playground, and props panel are ALL generated from this list.
export const COMPONENT_REGISTRY: ComponentMeta[] = [

  // ── ANIMATIONS ──────────────────────────────────────────────────────────────
  {
    name: 'MatrixRain',
    category: 'animations',
    description: 'Animated Japanese katakana / binary / hex rain canvas.',
    controls: [
      { type: 'text', name: 'color', label: 'Color (hex / var)', defaultValue: 'var(--neon-green)' },
      { type: 'range', name: 'speed', label: 'Speed', min: 0.1, max: 2, step: 0.1, defaultValue: 0.5 },
      { type: 'range', name: 'fontSize', label: 'Font Size (px)', min: 8, max: 24, defaultValue: 13 },
      { type: 'range', name: 'opacity', label: 'Opacity', min: 0.1, max: 1, step: 0.05, defaultValue: 0.4 },
      {
        type: 'select', name: 'charType', label: 'Character Set', defaultValue: 'all',
        options: [
          { value: 'all', label: 'All Combined' },
          { value: 'katakana', label: 'Japanese Katakana' },
          { value: 'binary', label: 'Binary (01)' },
          { value: 'hex', label: 'Hexadecimal' },
        ],
      },
    ],
    preview: (p) => (
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <MatrixRain color={p.color} speed={p.speed} fontSize={p.fontSize} opacity={p.opacity} charType={p.charType} />
        <div className="absolute bottom-3 left-3 text-[10px] text-white/50 bg-black/70 px-2 py-1 rounded font-mono">Active Matrix Simulation</div>
      </div>
    ),
    jsxSnippet: (p) => `<MatrixRain\n  color="${p.color}"\n  speed={${p.speed}}\n  fontSize={${p.fontSize}}\n  opacity={${p.opacity}}\n  charType="${p.charType}"\n/>`,
  },

  {
    name: 'CyberPulseRadar',
    category: 'animations',
    description: 'Animated sonar / radar sweep with grid rings and blip targets.',
    controls: [
      variantControl(),
      { type: 'range', name: 'speed', label: 'Sweep Interval (s)', min: 1, max: 10, step: 0.5, defaultValue: 4 },
      { type: 'boolean', name: 'showGrid', label: 'Show Grid Rings', defaultValue: true },
    ],
    preview: (p) => <CyberPulseRadar variant={p.variant} speed={p.speed} showGrid={p.showGrid} />,
    jsxSnippet: (p) => `<CyberPulseRadar\n  variant="${p.variant}"\n  speed={${p.speed}}\n  showGrid={${p.showGrid}}\n/>`,
  },

  {
    name: 'TextDecryptor',
    category: 'animations',
    description: 'Scrambles characters then decrypts them with a retro terminal effect.',
    controls: [
      { type: 'text', name: 'text', label: 'Text Payload', defaultValue: 'DECRYPTING SECURE CHANNELS' },
      variantControl(),
      { type: 'select', name: 'trigger', label: 'Trigger Event', defaultValue: 'mount', options: [{ value: 'mount', label: 'Auto (on mount)' }, { value: 'hover', label: 'On Hover' }, { value: 'click', label: 'On Click' }] },
      { type: 'range', name: 'speed', label: 'Speed (ms)', min: 10, max: 150, step: 5, defaultValue: 40 },
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => (
      <div className="flex flex-col items-center gap-4 p-6 border border-[#1a2e1a] rounded bg-black/40 min-h-[150px] w-full justify-center">
        <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">[ Decryption Stream ]</span>
        <TextDecryptor text={p.text} speed={p.speed} trigger={p.trigger} variant={p.variant} glow={p.glow} className="text-lg font-bold" />
      </div>
    ),
    jsxSnippet: (p) => `<TextDecryptor\n  text="${p.text}"\n  speed={${p.speed}}\n  trigger="${p.trigger}"\n  variant="${p.variant}"\n  glow={${p.glow}}\n/>`,
  },

  {
    name: 'HologramContainer',
    category: 'animations',
    description: 'Glassmorphism hologram wrapper with CRT scanlines and flicker effects.',
    controls: [
      variantControl('cyan'),
      { type: 'boolean', name: 'flicker', label: 'Hologram Flicker', defaultValue: true },
      { type: 'boolean', name: 'scanlines', label: 'CRT Scanlines', defaultValue: true },
      { type: 'boolean', name: 'noise', label: 'Noise Texture', defaultValue: true },
    ],
    preview: (p) => (
      <HologramContainer variant={p.variant} flicker={p.flicker} scanlines={p.scanlines} noise={p.noise} className="w-full">
        <div className="p-6 text-center space-y-3">
          <h3 className="text-base font-bold tracking-widest text-white">HOLOGRAM LINK ESTABLISHED</h3>
          <div className="h-px bg-white/10 w-24 mx-auto my-2" />
          <p className="text-xs text-white/70 leading-relaxed max-w-sm mx-auto font-mono">Receiving encrypted telemetry stream from main uplink. Signal integrity remains nominal.</p>
          <div className="text-[10px] text-white/30 font-mono">PACKETS: 512/512 | ERROR_RATE: 0.00%</div>
        </div>
      </HologramContainer>
    ),
    jsxSnippet: (p) => `<HologramContainer\n  variant="${p.variant}"\n  flicker={${p.flicker}}\n  scanlines={${p.scanlines}}\n  noise={${p.noise}}\n>\n  {/* your content */}\n</HologramContainer>`,
  },

  // ── PRIMITIVES ──────────────────────────────────────────────────────────────
  {
    name: 'CyberButton',
    category: 'primitives',
    description: 'Cyberpunk neon button with cut-corner, glitch hover and glow effects.',
    controls: [
      variantControl(),
      { type: 'select', name: 'size', label: 'Size', defaultValue: 'md', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }] },
      { type: 'boolean', name: 'isCutCorner', label: 'Cut Corner', defaultValue: true },
      { type: 'boolean', name: 'glitchOnHover', label: 'Glitch on Hover', defaultValue: true },
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => <CyberButton variant={p.variant} size={p.size} isCutCorner={p.isCutCorner} glitchOnHover={p.glitchOnHover} glow={p.glow}>Execute Payloads</CyberButton>,
    jsxSnippet: (p) => `<CyberButton\n  variant="${p.variant}"\n  size="${p.size}"\n  isCutCorner={${p.isCutCorner}}\n  glitchOnHover={${p.glitchOnHover}}\n  glow={${p.glow}}\n>\n  Execute Payloads\n</CyberButton>`,
  },

  {
    name: 'CyberInput',
    category: 'primitives',
    description: 'Terminal-styled text input with prompt prefix, neon focus glow.',
    controls: [
      variantControl(),
      { type: 'text', name: 'prompt', label: 'Prompt Prefix', defaultValue: 'root@kali:~#' },
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => (
      <div className="w-80 max-w-full">
        <CyberInput variant={p.variant} prompt={p.prompt} glow={p.glow} placeholder="Enter backdoor commands..." />
      </div>
    ),
    jsxSnippet: (p) => `<CyberInput\n  variant="${p.variant}"\n  prompt="${p.prompt}"\n  glow={${p.glow}}\n  placeholder="Enter backdoor commands..."\n/>`,
  },

  {
    name: 'CyberPanel',
    category: 'primitives',
    description: 'Frosted-glass terminal panel with title bar, status LED and resize controls.',
    controls: [
      variantControl(),
      { type: 'text', name: 'title', label: 'Panel Title', defaultValue: 'SYSTEM LOGS' },
      { type: 'text', name: 'status', label: 'Status Text', defaultValue: 'active' },
      { type: 'boolean', name: 'showControls', label: 'Show Window Controls', defaultValue: true },
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => (
      <div className="w-96 h-48 max-w-full">
        <CyberPanel title={p.title} status={p.status} variant={p.variant} showControls={p.showControls} glow={p.glow}>
          <div className="text-neon-green/60">$ netstat -antp</div>
          <div className="text-white/70">tcp 0 0 192.168.1.42:22 192.168.1.105:49811 ESTABLISHED</div>
        </CyberPanel>
      </div>
    ),
    jsxSnippet: (p) => `<CyberPanel\n  title="${p.title}"\n  status="${p.status}"\n  variant="${p.variant}"\n  showControls={${p.showControls}}\n  glow={${p.glow}}\n>\n  {/* content */}\n</CyberPanel>`,
  },

  {
    name: 'CyberBadge',
    category: 'primitives',
    description: 'Inline monospace badge with optional bracket styling.',
    controls: [
      variantControl(),
      { type: 'text', name: 'text', label: 'Badge Text', defaultValue: 'critical' },
      { type: 'boolean', name: 'brackets', label: 'Show Brackets', defaultValue: true },
    ],
    preview: (p) => <CyberBadge variant={p.variant} brackets={p.brackets}>{p.text}</CyberBadge>,
    jsxSnippet: (p) => `<CyberBadge variant="${p.variant}" brackets={${p.brackets}}>\n  ${p.text}\n</CyberBadge>`,
  },

  {
    name: 'GlitchText',
    category: 'primitives',
    description: 'Text that glitches with RGB-shift and scanline artifacts on hover or always.',
    controls: [
      { type: 'text', name: 'text', label: 'Text Content', defaultValue: 'ACCESS_GRANTED' },
      { type: 'select', name: 'trigger', label: 'Glitch Trigger', defaultValue: 'hover', options: [{ value: 'hover', label: 'On Hover' }, { value: 'always', label: 'Always Glitching' }] },
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => (
      <h2 className="text-2xl font-bold font-mono text-neon-green">
        <GlitchText text={p.text} trigger={p.trigger} glow={p.glow} />
      </h2>
    ),
    jsxSnippet: (p) => `<GlitchText\n  text="${p.text}"\n  trigger="${p.trigger}"\n  glow={${p.glow}}\n/>`,
  },

  {
    name: 'CyberStatusLine',
    category: 'primitives',
    description: 'Terminal status bar line with status, detail count and address.',
    controls: [
      variantControl(),
      { type: 'text', name: 'status', label: 'Status Text', defaultValue: 'scan complete' },
      { type: 'text', name: 'detail', label: 'Detail Label', defaultValue: 'entries indexed' },
      { type: 'text', name: 'count', label: 'Count', defaultValue: '6' },
      { type: 'text', name: 'address', label: 'Address', defaultValue: '192.168.1.42:~/projects' },
    ],
    preview: (p) => (
      <div className="w-full max-w-md px-4">
        <CyberStatusLine status={p.status} detail={p.detail} count={p.count} address={p.address} stateColor={p.variant} />
      </div>
    ),
    jsxSnippet: (p) => `<CyberStatusLine\n  status="${p.status}"\n  detail="${p.detail}"\n  count="${p.count}"\n  address="${p.address}"\n  stateColor="${p.variant}"\n/>`,
  },

  {
    name: 'CyberActionCard',
    category: 'primitives',
    description: 'Compact action card with label, value, command preview and icon.',
    controls: [
      variantControl(),
      { type: 'text', name: 'label', label: 'Card Label', defaultValue: 'Decrypt Key' },
      { type: 'text', name: 'value', label: 'Value', defaultValue: '0x3f5c9e2b10ad...' },
      { type: 'text', name: 'command', label: 'Command', defaultValue: '$ decrypt --key 0x9f' },
      { type: 'text', name: 'icon', label: 'Icon', defaultValue: '[⚡]' },
    ],
    preview: (p) => (
      <div className="w-96 max-w-full">
        <CyberActionCard label={p.label} value={p.value} command={p.command} description="RSA key decryptor" icon={p.icon} variant={p.variant} />
      </div>
    ),
    jsxSnippet: (p) => `<CyberActionCard\n  label="${p.label}"\n  value="${p.value}"\n  command="${p.command}"\n  icon="${p.icon}"\n  variant="${p.variant}"\n/>`,
  },

  {
    name: 'CyberConsoleBox',
    category: 'primitives',
    description: 'Terminal command + output display box.',
    controls: [
      variantControl(),
      { type: 'text', name: 'command', label: 'Command', defaultValue: '$ lscpu | grep model' },
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => (
      <div className="w-full max-w-md">
        <CyberConsoleBox command={p.command} content={'Model name: Intel(R) Xeon(R) Gold\nCPU family: 6\nStepping: 4'} variant={p.variant} glow={p.glow} />
      </div>
    ),
    jsxSnippet: (p) => `<CyberConsoleBox\n  command="${p.command}"\n  content="Model name: Intel(R) Xeon(R) Gold..."\n  variant="${p.variant}"\n  glow={${p.glow}}\n/>`,
  },

  {
    name: 'CyberTabs',
    category: 'primitives',
    description: 'Scanline-styled tab navigation bar.',
    controls: [variantControl()],
    preview: (p) => <CyberTabsPreview variant={p.variant} />,
    jsxSnippet: (p) => `<CyberTabs\n  tabs={[{ id: 'tab1', label: 'ALL_HOSTS', count: 12 }]}\n  activeTabId={activeTab}\n  onChange={setActiveTab}\n  variant="${p.variant}"\n/>`,
  },

  {
    name: 'CyberSwitch',
    category: 'primitives',
    description: 'Toggle switch with retro LED and scanning line animation.',
    controls: [variantControl()],
    preview: (p) => <CyberSwitchPreview variant={p.variant} />,
    jsxSnippet: (p) => `<CyberSwitch\n  checked={checked}\n  onChange={setChecked}\n  label="PORT_SCANNER"\n  variant="${p.variant}"\n/>`,
  },

  {
    name: 'CyberCheckbox',
    category: 'primitives',
    description: 'Monospace checkbox with bracket styling and glitch check mark.',
    controls: [variantControl()],
    preview: (p) => <CyberCheckboxPreview variant={p.variant} />,
    jsxSnippet: (p) => `<CyberCheckbox\n  checked={checked}\n  onChange={setChecked}\n  label="ENABLE_PROXY"\n  variant="${p.variant}"\n/>`,
  },

  {
    name: 'CyberDialog',
    category: 'primitives',
    description: 'Modal dialog with framer-motion entrance and neon border.',
    controls: [
      variantControl(),
      { type: 'text', name: 'title', label: 'Dialog Title', defaultValue: 'EXECUTION ALERT' },
    ],
    preview: (p) => <CyberDialogPreview variant={p.variant} title={p.title} />,
    jsxSnippet: (p) => `<CyberDialog\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="${p.title}"\n  variant="${p.variant}"\n>\n  {/* content */}\n</CyberDialog>`,
  },

  {
    name: 'CyberProgress',
    category: 'primitives',
    description: 'Retro block progress bar or modern neon line progress.',
    controls: [
      variantControl(),
      { type: 'range', name: 'value', label: 'Progress Value', min: 0, max: 100, defaultValue: 75 },
      { type: 'select', name: 'type', label: 'Design Type', defaultValue: 'block', options: [{ value: 'block', label: 'Retro Blocks [■■■□□]' }, { value: 'line', label: 'Neon Line' }] },
      { type: 'text', name: 'label', label: 'Label', defaultValue: 'SYS_OVERCLOCK' },
    ],
    preview: (p) => (
      <div className="w-80 max-w-full">
        <CyberProgress value={p.value} label={p.label} type={p.type} variant={p.variant} />
      </div>
    ),
    jsxSnippet: (p) => `<CyberProgress\n  value={${p.value}}\n  label="${p.label}"\n  type="${p.type}"\n  variant="${p.variant}"\n/>`,
  },

  {
    name: 'CyberAlert',
    category: 'primitives',
    description: 'System alert box with icon, action button, and child message content.',
    controls: [
      variantControl('red'),
      { type: 'text', name: 'title', label: 'Alert Title', defaultValue: 'BACKDOOR DETECTED' },
    ],
    preview: (p) => (
      <div className="w-full px-4">
        <CyberAlert title={p.title} variant={p.variant} onAction={() => alert('Mitigated')} actionText="MITIGATE">
          An unauthorized backdoor listener was opened on port 4444.
        </CyberAlert>
      </div>
    ),
    jsxSnippet: (p) => `<CyberAlert\n  title="${p.title}"\n  variant="${p.variant}"\n  onAction={handleAction}\n  actionText="MITIGATE"\n>\n  Alert message here\n</CyberAlert>`,
  },

  // ── ADVANCED ────────────────────────────────────────────────────────────────
  {
    name: 'CyberTable',
    category: 'advanced',
    description: 'Monospace data table with CRT scanline overlay and telemetry title bar.',
    controls: [variantControl()],
    preview: (p) => (
      <div className="w-full overflow-x-auto">
        <CyberTable title="NETWORK_TRAFFIC_LOG" subtitle="Live Telemetry Feed" variant={p.variant}
          columns={[{ key: 'host', header: 'HOST' }, { key: 'port', header: 'PORT' }, { key: 'protocol', header: 'PROTOCOL' }, { key: 'status', header: 'STATUS' }]}
          data={[
            { host: '192.168.1.42', port: '22', protocol: 'SSH', status: 'ACTIVE' },
            { host: '10.0.0.15', port: '443', protocol: 'HTTPS', status: 'LISTENING' },
            { host: '172.16.0.3', port: '4444', protocol: 'RAW', status: 'SUSPECT' },
          ]}
        />
      </div>
    ),
    jsxSnippet: (p) => `<CyberTable\n  title="TRAFFIC_LOG"\n  variant="${p.variant}"\n  columns={[{ key: 'host', header: 'HOST' }]}\n  data={[{ host: '192.168.1.42' }]}\n/>`,
  },

  {
    name: 'CyberTooltip',
    category: 'advanced',
    description: 'Neon bracketed tooltip with configurable position and delay.',
    controls: [
      variantControl(),
      { type: 'select', name: 'position', label: 'Position', defaultValue: 'top', options: [{ value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' }, { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }] },
    ],
    preview: (p) => (
      <div className="flex flex-col items-center gap-8 p-8">
        <CyberTooltip content="INITIATE_BACKDOOR_SEQUENCE" position={p.position} variant={p.variant}>
          <CyberButton variant={p.variant} size="sm">Hover for Tooltip</CyberButton>
        </CyberTooltip>
      </div>
    ),
    jsxSnippet: (p) => `<CyberTooltip content="DIAGNOSTIC_INFO" position="${p.position}" variant="${p.variant}">\n  <YourComponent />\n</CyberTooltip>`,
  },

  {
    name: 'CyberToast',
    category: 'advanced',
    description: 'Provider + hook based toast notification system with progress bar countdown.',
    controls: [variantControl()],
    preview: (p) => (
      <CyberToastProvider>
        <ToastDemoInner variant={p.variant} />
      </CyberToastProvider>
    ),
    jsxSnippet: (p) => `// Wrap app:\n<CyberToastProvider>\n  <App />\n</CyberToastProvider>\n\n// Inside component:\nconst { toast } = useCyberToast();\ntoast({ title: 'ACCESS_GRANTED', message: 'Auth complete.', variant: '${p.variant}' });`,
  },

  {
    name: 'CyberCommandMenu',
    category: 'advanced',
    description: 'Spotlight-style ⌘K command palette overlay with keyboard navigation.',
    controls: [],
    preview: () => (
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <CyberCommandMenu triggerKey="k"
          options={[
            { id: '1', category: 'System', title: 'RUN_DIAGNOSTICS', subtitle: 'Full system sweep', action: () => alert('Running diagnostics...') },
            { id: '2', category: 'System', title: 'REBOOT_NODE', subtitle: 'Restart current node', action: () => alert('Rebooting...') },
            { id: '3', category: 'Network', title: 'SCAN_PORTS', subtitle: 'Scan all open ports', action: () => alert('Scanning ports...') },
            { id: '4', category: 'Network', title: 'TRACE_ROUTE', subtitle: 'Trace network path', action: () => alert('Tracing...') },
          ]}
        />
        <p className="text-white/40 text-[11px] font-mono">Press <kbd className="bg-white/10 border border-white/20 px-1 rounded">⌘ K</kbd> to open the command menu</p>
      </div>
    ),
    jsxSnippet: () => `<CyberCommandMenu\n  triggerKey="k"\n  options={[\n    { id: '1', category: 'System', title: 'RUN_DIAGNOSTICS', action: () => {} },\n    { id: '2', category: 'Network', title: 'SCAN_PORTS', action: () => {} }\n  ]}\n/>`,
  },

  {
    name: 'CyberAccordion',
    category: 'advanced',
    description: 'Collapsible accordion sections with bracket toggle indicators.',
    controls: [
      variantControl(),
      { type: 'boolean', name: 'allowMultiple', label: 'Allow Multiple Open', defaultValue: true },
    ],
    preview: (p) => (
      <div className="w-full max-w-md">
        <CyberAccordion variant={p.variant} allowMultiple={p.allowMultiple}
          items={[
            { id: '1', trigger: 'NETWORK_CONFIG', content: 'Tunnel: WireGuard\nEndpoint: 10.0.0.1:51820\nAllowedIPs: 0.0.0.0/0' },
            { id: '2', trigger: 'PORT_SCANNER_STATUS', content: 'Ports 22, 443, 8080, 4444 are currently listening.' },
            { id: '3', trigger: 'ACTIVE_SESSIONS', content: 'Session 1: root@192.168.1.42 (SSH)\nSession 2: user@10.0.0.15 (HTTPS)' },
          ]}
        />
      </div>
    ),
    jsxSnippet: (p) => `<CyberAccordion\n  variant="${p.variant}"\n  allowMultiple={${p.allowMultiple}}\n  items={[\n    { id: '1', trigger: 'CONFIG', content: 'details here' }\n  ]}\n/>`,
  },

  {
    name: 'CyberSlider',
    category: 'advanced',
    description: 'HUD-style range slider with gradient fill and optional tick marks.',
    controls: [
      variantControl(),
      { type: 'boolean', name: 'showTicks', label: 'Show Tick Labels', defaultValue: true },
    ],
    preview: (p) => <CyberSliderPreview variant={p.variant} showTicks={p.showTicks} />,
    jsxSnippet: (p) => `<CyberSlider\n  label="SIGNAL_STRENGTH"\n  min={0}\n  max={100}\n  value={value}\n  onChange={setValue}\n  variant="${p.variant}"\n  showTicks={${p.showTicks}}\n/>`,
  },

  {
    name: 'CyberOtpInput',
    category: 'advanced',
    description: 'One-time password input boxes with neon bracket corners and paste support.',
    controls: [
      variantControl(),
      { type: 'range', name: 'length', label: 'Code Length', min: 4, max: 8, defaultValue: 6 },
    ],
    preview: (p) => <CyberOtpInputPreview length={p.length} variant={p.variant} />,
    jsxSnippet: (p) => `<CyberOtpInput\n  length={${p.length}}\n  value={otp}\n  onChange={setOtp}\n  variant="${p.variant}"\n/>`,
  },

  {
    name: 'CyberSkeleton',
    category: 'advanced',
    description: 'Sweeping glowing placeholder for loading states with CRT signal sweep.',
    controls: [variantControl()],
    preview: (p) => (
      <div className="w-full flex flex-col gap-3">
        <CyberSkeleton className="w-full h-6" variant={p.variant} />
        <CyberSkeleton className="w-3/4 h-6" variant={p.variant} />
        <CyberSkeleton className="w-full h-20" variant={p.variant} />
        <div className="flex gap-3">
          <CyberSkeleton className="w-12 h-12 rounded-full" variant={p.variant} />
          <div className="flex-1 flex flex-col gap-2">
            <CyberSkeleton className="w-full h-4" variant={p.variant} />
            <CyberSkeleton className="w-2/3 h-4" variant={p.variant} />
          </div>
        </div>
      </div>
    ),
    jsxSnippet: (p) => `<CyberSkeleton className="w-full h-12" variant="${p.variant}" />`,
  },

  {
    name: 'CyberBreadcrumb',
    category: 'advanced',
    description: 'Terminal path breadcrumb navigator with ~ home prefix.',
    controls: [variantControl()],
    preview: (p) => (
      <div className="flex flex-col gap-6 p-4">
        <CyberBreadcrumb variant={p.variant} items={[{ label: 'root', href: '/' }, { label: 'network', href: '/network' }, { label: 'audit' }]} />
        <CyberBreadcrumb variant={p.variant} items={[{ label: 'home', href: '/' }, { label: 'targets', href: '/targets' }, { label: 'sessions', href: '/targets/sessions' }, { label: '192.168.1.42' }]} />
      </div>
    ),
    jsxSnippet: (p) => `<CyberBreadcrumb\n  variant="${p.variant}"\n  items={[\n    { label: 'root', href: '/' },\n    { label: 'network', href: '/network' },\n    { label: 'audit' }\n  ]}\n/>`,
  },

  {
    name: 'CyberDropdown',
    category: 'advanced',
    description: 'Custom select dropdown with neon corner brackets and option check marks.',
    controls: [variantControl()],
    preview: (p) => <CyberDropdownPreview variant={p.variant} />,
    jsxSnippet: (p) => `<CyberDropdown\n  value={value}\n  onChange={setValue}\n  variant="${p.variant}"\n  options={[\n    { value: 'ssh', label: 'SSH Tunnel' }\n  ]}\n/>`,
  },

  // ── TEMPLATES ──────────────────────────────────────────────────────────────
  {
    name: 'CyberLoginForm',
    category: 'templates',
    description: 'Full authentication form with animated terminal typing and progress.',
    controls: [],
    preview: () => <div className="w-full flex items-center justify-center p-2"><CyberLoginForm onSuccess={(u) => alert(`Logged in: ${u}`)} /></div>,
    jsxSnippet: () => `<CyberLoginForm onSuccess={(user) => console.log(user)} />`,
  },

  {
    name: 'CyberSignupForm',
    category: 'templates',
    description: 'Registration form with password strength meter and terms checkbox.',
    controls: [],
    preview: () => <div className="w-full flex items-center justify-center p-2"><CyberSignupForm onSuccess={(d) => alert(`Registered: ${d.username}`)} /></div>,
    jsxSnippet: () => `<CyberSignupForm onSuccess={(data) => console.log(data)} />`,
  },

  {
    name: 'CyberSystemDashboard',
    category: 'templates',
    description: 'Live-animated system metrics dashboard with CPU, RAM, and disk monitors.',
    controls: [],
    preview: () => <div className="w-full flex items-center justify-center p-2"><CyberSystemDashboard /></div>,
    jsxSnippet: () => `<CyberSystemDashboard />`,
  },

  {
    name: 'CyberDataForm',
    category: 'templates',
    description: 'Multi-tab configuration form with inputs, switches, checkboxes and tabs.',
    controls: [],
    preview: () => <div className="w-full flex items-center justify-center p-2"><CyberDataForm /></div>,
    jsxSnippet: () => `<CyberDataForm />`,
  },

  {
    name: 'InteractiveConsole',
    category: 'templates',
    description: 'Fully functional terminal emulator with command history and built-in commands.',
    controls: [],
    preview: () => <div className="w-full flex items-center justify-center p-2"><InteractiveConsole /></div>,
    jsxSnippet: () => `<InteractiveConsole />`,
  },

  {
    name: 'TargetNetworkMap',
    category: 'templates',
    description: 'Animated network topology map with node discovery and packet animation.',
    controls: [],
    preview: () => <div className="w-full flex items-center justify-center p-2"><TargetNetworkMap /></div>,
    jsxSnippet: () => `<TargetNetworkMap />`,
  },

  {
    name: 'TerminalHero',
    category: 'templates',
    description: 'Full-screen hero section with animated terminal typing effect.',
    controls: [
      { type: 'text', name: 'title', label: 'Hero Title', defaultValue: 'CYBER_SHELL' },
      { type: 'text', name: 'subtitle', label: 'Subtitle', defaultValue: 'INTERACTIVE TERMINAL UI KIT' },
    ],
    preview: (p) => (
      <div className="w-full h-full overflow-y-auto">
        <TerminalHero title={p.title} subtitle={p.subtitle} badgeText="SYS_ADMIN SECURITY AUDIT" loopAnimation={true} />
      </div>
    ),
    jsxSnippet: (p) => `<TerminalHero\n  title="${p.title}"\n  subtitle="${p.subtitle}"\n  badgeText="SECURITY AUDIT"\n/>`,
  },

  {
    name: 'HackerDashboard',
    category: 'templates',
    description: 'Animated hacker dashboard with live scan tickers and Matrix rain.',
    controls: [],
    preview: () => <div className="w-full h-full overflow-y-auto"><HackerDashboard /></div>,
    jsxSnippet: () => `<HackerDashboard\n  scanInterval={1100}\n  logInterval={1400}\n/>`,
  },

  {
    name: 'ProjectCard',
    category: 'templates',
    description: 'Cyberpunk project showcase card with tags, status and year.',
    controls: [
      { type: 'text', name: 'title', label: 'Project Title', defaultValue: 'Quantum Shield' },
      { type: 'select', name: 'status', label: 'Status', defaultValue: 'active', options: [{ value: 'active', label: 'Active' }, { value: 'beta', label: 'Beta' }, { value: 'archived', label: 'Archived' }] },
    ],
    preview: (p) => (
      <div className="w-96 max-w-full">
        <ProjectCard title={p.title} description="Lattice cryptography software firewall for ARM architectures." tags={['ARM', 'Rust', 'Crypto']} status={p.status} year={2026} />
      </div>
    ),
    jsxSnippet: (p) => `<ProjectCard\n  title="${p.title}"\n  description="..."\n  tags={['ARM', 'Rust']}\n  status="${p.status}"\n  year={2026}\n/>`,
  },

  {
    name: 'SkillsSection',
    category: 'templates',
    description: 'Terminal skill list with animated progress bars and scan effect.',
    controls: [
      { type: 'text', name: 'title', label: 'Section Title', defaultValue: 'System Audit Skills' },
    ],
    preview: (p) => (
      <div className="w-full overflow-y-auto max-h-[280px]">
        <SkillsSection title={p.title} commandPrefix="$ cat audit_skills.txt" />
      </div>
    ),
    jsxSnippet: (p) => `<SkillsSection\n  title="${p.title}"\n  commandPrefix="$ cat skills.txt"\n/>`,
  },

  // ── NEW PRIMITIVES ──────────────────────────────────────────────────────────
  {
    name: 'CyberTextarea',
    category: 'primitives',
    description: 'Terminal-styled multi-line text area with prompt prefix, resize handle and line counter.',
    controls: [
      variantControl(),
      { type: 'text', name: 'prompt', label: 'Prompt Prefix', defaultValue: '$ nano' },
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
      { type: 'range', name: 'rows', label: 'Rows', min: 2, max: 10, defaultValue: 4 },
    ],
    preview: (p) => (
      <div className="w-full max-w-md">
        <CyberTextarea variant={p.variant} prompt={p.prompt} glow={p.glow} rows={p.rows} placeholder="Enter payload data..." />
      </div>
    ),
    jsxSnippet: (p) => `<CyberTextarea\n  variant="${p.variant}"\n  prompt="${p.prompt}"\n  rows={${p.rows}}\n  glow={${p.glow}}\n  placeholder="Enter payload..."\n/>`,
  },

  {
    name: 'CyberNumberInput',
    category: 'primitives',
    description: 'Number input with cyberpunk ± spin buttons, min/max/step clamping.',
    controls: [
      variantControl(),
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [val, setVal] = React.useState(42);
      return <CyberNumberInput variant={p.variant} value={val} onChange={setVal} min={0} max={100} label="PACKET_SIZE" glow={p.glow} />;
    },
    jsxSnippet: (p) => `<CyberNumberInput\n  variant="${p.variant}"\n  value={value}\n  onChange={setValue}\n  min={0}\n  max={100}\n  label="PACKET_SIZE"\n/>`,
  },

  {
    name: 'CyberTagInput',
    category: 'primitives',
    description: 'Tag/chip input — press Enter or comma to add, Backspace to delete last.',
    controls: [
      variantControl(),
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [tags, setTags] = React.useState(['ssh', 'vpn', 'tor']);
      return (
        <div className="w-full max-w-md">
          <CyberTagInput variant={p.variant} tags={tags} onChange={setTags} glow={p.glow} placeholder="Add protocol... (Enter)" />
        </div>
      );
    },
    jsxSnippet: (p) => `<CyberTagInput\n  variant="${p.variant}"\n  tags={tags}\n  onChange={setTags}\n  placeholder="Add tag..."\n/>`,
  },

  {
    name: 'CyberDivider',
    category: 'primitives',
    description: 'Neon divider line — horizontal/vertical with optional centered label.',
    controls: [
      variantControl(),
      { type: 'text', name: 'label', label: 'Label (optional)', defaultValue: 'SECTOR_DIVIDE' },
      { type: 'boolean', name: 'glow', label: 'Glow', defaultValue: false },
    ],
    preview: (p) => (
      <div className="w-full max-w-md flex flex-col gap-6">
        <CyberDivider variant={p.variant} label={p.label || undefined} glow={p.glow} />
        <CyberDivider variant={p.variant} />
      </div>
    ),
    jsxSnippet: (p) => `<CyberDivider variant="${p.variant}" label="${p.label}" />`,
  },

  {
    name: 'CyberAvatar',
    category: 'primitives',
    description: 'User avatar with initials fallback, CRT scanline overlay and online indicator.',
    controls: [
      variantControl(),
      { type: 'select', name: 'size', label: 'Size', defaultValue: 'md', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }, { value: 'xl', label: 'XL' }] },
      { type: 'boolean', name: 'online', label: 'Online Indicator', defaultValue: true },
    ],
    preview: (p) => (
      <div className="flex items-center gap-4">
        <CyberAvatar variant={p.variant} name="Ghost Agent" size={p.size} online={p.online} />
        <CyberAvatar variant={p.variant} name="Root User" size={p.size} online={false} />
        <CyberAvatar variant={p.variant} size={p.size} />
      </div>
    ),
    jsxSnippet: (p) => `<CyberAvatar\n  variant="${p.variant}"\n  name="Ghost Agent"\n  size="${p.size}"\n  online={${p.online}}\n/>`,
  },

  // ── NEW ADVANCED ────────────────────────────────────────────────────────────
  {
    name: 'CyberPagination',
    category: 'advanced',
    description: 'Terminal-themed pagination with smart page elision and first/last buttons.',
    controls: [
      variantControl(),
      { type: 'range', name: 'totalPages', label: 'Total Pages', min: 2, max: 20, defaultValue: 12 },
      { type: 'boolean', name: 'showFirstLast', label: 'Show First/Last', defaultValue: true },
    ],
    preview: (p) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [page, setPage] = React.useState(5);
      return <CyberPagination variant={p.variant} currentPage={page} totalPages={p.totalPages} onPageChange={setPage} showFirstLast={p.showFirstLast} />;
    },
    jsxSnippet: (p) => `<CyberPagination\n  variant="${p.variant}"\n  currentPage={page}\n  totalPages={${p.totalPages}}\n  onPageChange={setPage}\n/>`,
  },

  {
    name: 'CyberStat',
    category: 'advanced',
    description: 'Single metric stat card with trend indicator and icon slot — perfect for dashboards.',
    controls: [
      variantControl(),
      { type: 'text', name: 'label', label: 'Metric Label', defaultValue: 'ACTIVE_CONNECTIONS' },
      { type: 'text', name: 'value', label: 'Value', defaultValue: '1,337' },
      { type: 'text', name: 'unit', label: 'Unit', defaultValue: 'hosts' },
      { type: 'select', name: 'trend', label: 'Trend', defaultValue: 'up', options: [{ value: 'up', label: '▲ Up' }, { value: 'down', label: '▼ Down' }, { value: 'neutral', label: '● Neutral' }] },
      { type: 'text', name: 'trendValue', label: 'Trend Value', defaultValue: '+12.4% vs last scan' },
    ],
    preview: (p) => (
      <div className="w-64">
        <CyberStat variant={p.variant} label={p.label} value={p.value} unit={p.unit} trend={p.trend as any} trendValue={p.trendValue} icon="⚡" />
      </div>
    ),
    jsxSnippet: (p) => `<CyberStat\n  variant="${p.variant}"\n  label="${p.label}"\n  value="${p.value}"\n  unit="${p.unit}"\n  trend="${p.trend}"\n  trendValue="${p.trendValue}"\n/>`,
  },

  {
    name: 'CyberCodeBlock',
    category: 'advanced',
    description: 'Syntax-styled code block with line numbers, language badge, and one-click copy.',
    controls: [
      variantControl(),
      { type: 'boolean', name: 'showLineNumbers', label: 'Line Numbers', defaultValue: true },
      { type: 'boolean', name: 'glow', label: 'Neon Glow', defaultValue: true },
    ],
    preview: (p) => (
      <div className="w-full">
        <CyberCodeBlock
          variant={p.variant}
          language="bash"
          filename="exploit.sh"
          showLineNumbers={p.showLineNumbers}
          glow={p.glow}
          code={`#!/bin/bash\nnmap -sV -O 192.168.1.0/24\nhydra -l root -P /wordlist.txt ssh://target\nmsfconsole -q -x "use exploit/multi/handler"`}
        />
      </div>
    ),
    jsxSnippet: (p) => `<CyberCodeBlock\n  variant="${p.variant}"\n  language="bash"\n  filename="script.sh"\n  showLineNumbers={${p.showLineNumbers}}\n  code={\`...\`}\n/>`,
  },
];

// ─── Derived lookups ──────────────────────────────────────────────────────────
export const REGISTRY_MAP = Object.fromEntries(COMPONENT_REGISTRY.map((c) => [c.name, c]));

export const CATEGORIES: { key: ComponentCategory; label: string; icon: string }[] = [
  { key: 'animations', label: 'ANIMATIONS', icon: '⬡' },
  { key: 'primitives', label: 'CYBER PRIMITIVES', icon: '⚡' },
  { key: 'advanced', label: 'ADVANCED COMPONENTS', icon: '◈' },
  { key: 'templates', label: 'CORE TEMPLATES', icon: '⚙' },
];
