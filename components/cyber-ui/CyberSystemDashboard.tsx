'use client';

import React, { useEffect, useState } from 'react';
import CyberPanel from './CyberPanel';
import CyberProgress from './CyberProgress';
import CyberStatusLine from './CyberStatusLine';
import CyberAlert from './CyberAlert';

export default function CyberSystemDashboard({ className = '' }: { className?: string }) {
  const [cpu, setCpu] = useState(42);
  const [ram, setRam] = useState(65);
  const [temp, setTemp] = useState(54);
  const [logs, setLogs] = useState<string[]>([
    '[INFO] System initial boot sequence ready.',
    '[OK] SSH handshake authenticated for user: root.',
    '[OK] Cryptographic socket open on port 8443.',
  ]);

  // Simulate dashboard real-time data updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCpu((prev) => {
        const change = Math.floor(Math.random() * 20) - 10;
        return Math.max(10, Math.min(95, prev + change));
      });
      setRam((prev) => {
        const change = Math.floor(Math.random() * 6) - 3;
        return Math.max(50, Math.min(85, prev + change));
      });
      setTemp((prev) => {
        const change = Math.floor(Math.random() * 4) - 2;
        return Math.max(45, Math.min(80, prev + change));
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Simulate incoming logs
  useEffect(() => {
    const logPool = [
      '[OK] Firewall policy reloaded. 0 packets dropped.',
      '[WARN] Connection spike detected on node 4.',
      '[INFO] Indexing main DB replica logs...',
      '[CRIT] Brute force block: 10 failed login attempts.',
      '[OK] Key exchange protocol refreshed with peer: 198.51.100.4',
    ];

    const logTimer = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setLogs((prev) => {
        const updated = [...prev, randomLog];
        if (updated.length > 5) updated.shift();
        return updated;
      });
    }, 2800);

    return () => clearInterval(logTimer);
  }, []);

  return (
    <div
      className={`
        border border-neon-green/7 bg-black/85 rounded-lg p-5 font-mono flex flex-col gap-5 w-full max-w-2xl
        ${className}
      `}
    >
      {/* Top Banner Alert */}
      <CyberAlert title="THREAT STATUS: MONITORING" variant="cyan" className="py-2.5 px-4 text-xs">
        Mainframe shield strength at 100%. IDS rules updated. Scanning local socket connections.
      </CyberAlert>

      {/* Grid panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Resource Monitor Panel */}
        <CyberPanel title="CORE RESOURCES" status="live" variant="green" showControls={false}>
          <div className="space-y-4">
            <CyberProgress value={cpu} label="CPU OVERCLOCK LOAD" type="block" variant="green" />
            <CyberProgress value={ram} label="SWAP MEMORY USAGE" type="line" variant="cyan" />
            <div className="flex justify-between items-center text-[10px] text-white/50 pt-2 border-t border-neutral-900">
              <span>CORE TEMPERATURE:</span>
              <span className={temp > 70 ? 'text-[#ff5f57] font-bold' : 'text-neon-green'}>
                {temp}°C {temp > 70 ? '[CRIT]' : '[NOMINAL]'}
              </span>
            </div>
          </div>
        </CyberPanel>

        {/* Live Network Logs */}
        <CyberPanel title="LOG ANALYSIS" status="active" variant="amber" showControls={false}>
          <div className="flex flex-col gap-2.5 h-36 overflow-y-auto font-mono text-[9px] text-amber-500/80 leading-relaxed scrollbar-thin">
            {logs.map((log, index) => {
              const isCrit = log.includes('[CRIT]');
              const isOk = log.includes('[OK]');
              const logColor = isCrit ? 'text-[#ff5f57]' : isOk ? 'text-[#28c840]' : 'text-amber-400';
              return (
                <div key={index} className={`border-b border-neutral-900/60 pb-1.5 ${logColor}`}>
                  {log}
                </div>
              );
            })}
          </div>
        </CyberPanel>
      </div>

      {/* Footer System Status Bar */}
      <div className="pt-2 border-t border-neutral-900">
        <CyberStatusLine
          status="All server pools responsive"
          detail="nodes connected"
          count="4/4"
          address="dashboard.mainframe:8443"
          stateColor="green"
        />
      </div>
    </div>
  );
}
