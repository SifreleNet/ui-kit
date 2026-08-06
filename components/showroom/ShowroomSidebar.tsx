'use client';

import React from 'react';

type TabType =
  | 'MatrixRain'
  | 'TerminalHero'
  | 'HackerDashboard'
  | 'ProjectCard'
  | 'SkillsSection'
  | 'CyberButton'
  | 'CyberInput'
  | 'CyberPanel'
  | 'CyberBadge'
  | 'GlitchText'
  | 'CyberStatusLine'
  | 'CyberActionCard'
  | 'CyberConsoleBox'
  | 'CyberTabs'
  | 'CyberSwitch'
  | 'CyberCheckbox'
  | 'CyberDialog'
  | 'CyberProgress'
  | 'CyberAlert'
  | 'CyberLoginForm'
  | 'CyberSignupForm'
  | 'CyberSystemDashboard'
  | 'CyberDataForm'
  | 'InteractiveConsole'
  | 'TargetNetworkMap'
  | 'CyberPulseRadar'
  | 'TextDecryptor'
  | 'HologramContainer'
  | 'installation';

interface ShowroomSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function ShowroomSidebar({ activeTab, setActiveTab }: ShowroomSidebarProps) {
  return (
    <aside className="w-full md:w-64 border-r border-neon-green/7 bg-[#090909]/90 overflow-y-auto p-4 flex flex-col gap-6 shrink-0 select-none">
      <div>
        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold px-2">
          00 // GETTING STARTED
        </div>
        <button
          onClick={() => setActiveTab('installation')}
          className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
            activeTab === 'installation'
              ? 'bg-neon-green/5 text-neon-green border-neon-green/20'
              : 'text-neon-green/40 border-transparent hover:text-neon-green hover:bg-white/5'
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
          {['MatrixRain', 'CyberPulseRadar', 'TextDecryptor', 'HologramContainer'].map((name) => (
            <li key={name}>
              <button
                onClick={() => setActiveTab(name as TabType)}
                className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                  activeTab === name
                    ? 'bg-neon-green/5 text-neon-green border-neon-green/20'
                    : 'text-neon-green/40 border-transparent hover:text-neon-green hover:bg-white/5'
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
          {[
            'CyberButton',
            'CyberInput',
            'CyberPanel',
            'CyberBadge',
            'GlitchText',
            'CyberStatusLine',
            'CyberActionCard',
            'CyberConsoleBox',
            'CyberTabs',
            'CyberSwitch',
            'CyberCheckbox',
            'CyberDialog',
            'CyberProgress',
            'CyberAlert',
          ].map((name) => (
            <li key={name}>
              <button
                onClick={() => setActiveTab(name as TabType)}
                className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                  activeTab === name
                    ? 'bg-neon-green/5 text-neon-green border-neon-green/20'
                    : 'text-neon-green/40 border-transparent hover:text-neon-green hover:bg-white/5'
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
          {[
            'CyberLoginForm',
            'CyberSignupForm',
            'CyberSystemDashboard',
            'CyberDataForm',
            'InteractiveConsole',
            'TargetNetworkMap',
            'TerminalHero',
            'HackerDashboard',
            'ProjectCard',
            'SkillsSection',
          ].map((name) => (
            <li key={name}>
              <button
                onClick={() => setActiveTab(name as TabType)}
                className={`w-full text-left text-xs font-mono px-3 py-2 rounded border transition-all ${
                  activeTab === name
                    ? 'bg-neon-green/5 text-neon-green border-neon-green/20'
                    : 'text-neon-green/40 border-transparent hover:text-neon-green hover:bg-white/5'
                }`}
              >
                ⚙ {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
