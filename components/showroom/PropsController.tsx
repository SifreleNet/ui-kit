'use client';

import React, { useState } from 'react';
import { ComponentMeta, PropControlType } from './componentRegistry';
import { SOURCE_CODES } from './sourceCodes';

interface PropsControllerProps {
  meta: ComponentMeta;
  props: Record<string, any>;
  onPropChange: (name: string, value: any) => void;
}

function ControlRow({ control, value, onChange }: { control: PropControlType; value: any; onChange: (v: any) => void }) {
  const cls = 'w-full bg-black border border-[#1a2e1a] px-2 py-1 text-neon-green outline-none rounded text-xs';

  if (control.type === 'select') {
    return (
      <div>
        <label className="block text-white/50 mb-1 text-xs">{control.label}:</label>
        <select value={value} onChange={(e) => onChange(e.target.value)} className={cls}>
          {control.options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (control.type === 'text') {
    return (
      <div>
        <label className="block text-white/50 mb-1 text-xs">{control.label}:</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      </div>
    );
  }

  if (control.type === 'boolean') {
    return (
      <label className="flex items-center gap-2 cursor-pointer text-xs">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="accent-neon-green" />
        <span className="text-white/70">{control.label}</span>
      </label>
    );
  }

  if (control.type === 'range') {
    return (
      <div>
        <label className="block text-white/50 mb-1 text-xs">{control.label}: <span className="text-neon-green">{value}</span></label>
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step ?? 1}
          value={value}
          onChange={(e) => onChange(control.step && control.step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value))}
          className="w-full accent-neon-green"
        />
      </div>
    );
  }

  return null;
}

export function PropsController({ meta, props, onPropChange }: PropsControllerProps) {
  const [codeTab, setCodeTab] = useState<'jsx' | 'raw'>('jsx');
  const [copied, setCopied] = useState(false);

  const dynamicJSX = meta.jsxSnippet(props);
  const rawSource = SOURCE_CODES[meta.name as keyof typeof SOURCE_CODES] || '// Source code not found.';

  const handleCopy = () => {
    navigator.clipboard.writeText(codeTab === 'jsx' ? dynamicJSX : rawSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:col-span-5 flex flex-col gap-4">
      {/* Props Panel */}
      <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-4 flex flex-col gap-4">
        <h4 className="text-xs font-bold text-white uppercase border-b border-[#1a2e1a] pb-2">
          ⬡ Configure Props
        </h4>

        {meta.controls.length === 0 ? (
          <p className="text-[11px] text-white/40 leading-relaxed font-mono">
            This template component has no configurable props. Interact with the preview area on the left.
          </p>
        ) : (
          <div className="space-y-3">
            {meta.controls.map((ctrl) => (
              <ControlRow key={ctrl.name} control={ctrl} value={props[ctrl.name]} onChange={(v) => onPropChange(ctrl.name, v)} />
            ))}
          </div>
        )}
      </div>

      {/* Code Viewer */}
      <div className="flex-1 border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] overflow-hidden flex flex-col">
        <div className="bg-neutral-900/50 border-b border-[#1a2e1a] flex text-[10px]">
          <button
            onClick={() => setCodeTab('jsx')}
            className={`px-4 py-2 border-r border-[#1a2e1a] uppercase font-mono ${codeTab === 'jsx' ? 'bg-[#0d0d0d] text-neon-green font-bold' : 'text-white/50 hover:text-white'}`}
          >
            JSX Snippet
          </button>
          {rawSource !== '// Source code not found.' && (
            <button
              onClick={() => setCodeTab('raw')}
              className={`px-4 py-2 border-r border-[#1a2e1a] uppercase font-mono ${codeTab === 'raw' ? 'bg-[#0d0d0d] text-neon-green font-bold' : 'text-white/50 hover:text-white'}`}
            >
              Raw Source
            </button>
          )}
          <button
            onClick={handleCopy}
            className="ml-auto px-4 py-2 text-white/60 hover:text-neon-green hover:bg-neon-green/5 flex items-center gap-1 select-none cursor-pointer"
          >
            {copied ? '✔ COPIED' : '⧉ COPY_CODE'}
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto max-h-[300px] bg-black/60 relative">
          <pre className="text-xs text-neon-green/80 font-mono leading-5 whitespace-pre">
            {codeTab === 'jsx' ? dynamicJSX : rawSource}
          </pre>
        </div>
      </div>
    </div>
  );
}
