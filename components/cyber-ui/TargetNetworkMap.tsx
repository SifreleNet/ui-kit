'use client';

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
  { id: 'gw', name: 'Gateway Router', ip: '192.168.1.1', status: 'secure', x: 250, y: 50, os: 'Cisco IOS', ports: '22/tcp, 80/tcp, 443/tcp' },
  { id: 'fw', name: 'Network Firewall', ip: '192.168.1.2', status: 'firewalled', x: 250, y: 130, os: 'pfSense', ports: '22/tcp, 443/tcp' },
  { id: 'ws1', name: 'Workstation 01', ip: '192.168.1.42', status: 'secure', x: 100, y: 220, os: 'Windows 11', ports: '135/tcp, 445/tcp, 3389/tcp' },
  { id: 'srv', name: 'Target Server', ip: '192.168.1.105', status: 'compromised', x: 250, y: 220, os: 'Debian 12', ports: '21/tcp, 22/tcp, 80/tcp' },
  { id: 'db', name: 'Database Mainframe', ip: '192.168.1.200', status: 'scanning', x: 400, y: 220, os: 'Ubuntu Server', ports: '3306/tcp, 8080/tcp' },
];

const CONNECTIONS = [
  { from: 'gw', to: 'fw' },
  { from: 'fw', to: 'ws1' },
  { from: 'fw', to: 'srv' },
  { from: 'fw', to: 'db' },
  { from: 'srv', to: 'db' },
];

const STATUS_COLOR = {
  secure: 'text-[#28c840] stroke-[#28c840] fill-[#28c840]',
  compromised: 'text-[#ff5f57] stroke-[#ff5f57] fill-[#ff5f57]',
  firewalled: 'text-[#febc2e] stroke-[#febc2e] fill-[#febc2e]',
  scanning: 'text-[#00f0ff] stroke-[#00f0ff] fill-[#00f0ff]',
};

export default function TargetNetworkMap({ className = '' }: { className?: string }) {
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(NODES[3]);

  return (
    <div
      className={`
        border border-neon-green/7 bg-black/60 rounded-lg p-5 font-mono flex flex-col md:flex-row gap-5 w-full max-w-2xl backdrop-blur-sm
        ${className}
      `}
    >
      {/* Visual Network Map */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex justify-between items-center border-b border-neon-green/7 pb-2 text-[10px] text-white/50">
          <span>⬡ LOCAL SUBNET TOPOLOGY</span>
          <span className="text-[#28c840] animate-pulse">● MAP_LIVE</span>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="relative border border-neutral-900 bg-black/80 rounded overflow-hidden h-72">
          <svg className="w-full h-full" viewBox="0 0 500 300">
            {/* Draw flowing data pipelines */}
            {CONNECTIONS.map((conn, idx) => {
              const fromNode = NODES.find((n) => n.id === conn.from)!;
              const toNode = NODES.find((n) => n.id === conn.to)!;
              const isCompromised = fromNode.status === 'compromised' || toNode.status === 'compromised';
              const lineColor = isCompromised ? '#ff5f57' : 'var(--neon-green)';
              return (
                <g key={idx}>
                  {/* Background pipe line */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={lineColor}
                    strokeOpacity="0.2"
                    strokeWidth="2"
                  />
                  {/* Flowing binary particles overlay */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={lineColor}
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                    strokeDasharray="6, 12"
                    className="animate-[dash_8s_linear_infinite]"
                  />
                </g>
              );
            })}

            {/* Draw Network Nodes */}
            {NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const colors = STATUS_COLOR[node.status];
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer group"
                >
                  {/* Active Radar pulse ring */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="12"
                      className={`fill-none stroke-current animate-ping opacity-35 ${colors}`}
                    />
                  )}

                  {/* Outer glowing ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    className={`fill-black stroke-current stroke-[1.5] group-hover:r-10 transition-all ${colors}`}
                  />

                  {/* Center solid core */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    className={`fill-current group-hover:scale-125 transition-transform ${colors}`}
                  />

                  {/* Node Name Tag */}
                  <text
                    x={node.x}
                    y={node.y - 14}
                    textAnchor="middle"
                    className="fill-white/80 font-mono text-[8px] select-none pointer-events-none uppercase font-bold"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Dash animation keyframes stylesheet injection */}
          <style>{`
            @keyframes dash {
              to {
                stroke-dashoffset: -100;
              }
            }
          `}</style>
        </div>
      </div>

      {/* Target Inspector Panel */}
      <div className="w-full md:w-56 shrink-0 flex flex-col">
        <CyberPanel
          title="INSPECTOR"
          status={selectedNode.status}
          variant={selectedNode.status === 'compromised' ? 'red' : selectedNode.status === 'firewalled' ? 'amber' : 'green'}
          showControls={false}
          className="h-full"
        >
          <div className="space-y-3 text-[10px] leading-relaxed">
            <div>
              <span className="text-white/40 block">TARGET HOSTNAME:</span>
              <span className="text-neon-green font-bold uppercase">{selectedNode.name}</span>
            </div>
            <div>
              <span className="text-white/40 block">IP_ADDRESS:</span>
              <span className="text-white">{selectedNode.ip}</span>
            </div>
            <div>
              <span className="text-white/40 block">OPERATING_SYSTEM:</span>
              <span className="text-white">{selectedNode.os}</span>
            </div>
            <div>
              <span className="text-white/40 block">OPEN_PORTS:</span>
              <span className="text-white/90 break-words">{selectedNode.ports}</span>
            </div>
            <div className="pt-2 border-t border-neutral-900 flex justify-between items-center">
              <span className="text-white/30">SECTOR_STATE:</span>
              <CyberBadge
                variant={selectedNode.status === 'compromised' ? 'red' : selectedNode.status === 'firewalled' ? 'amber' : 'green'}
                brackets={false}
                className="text-[8px] px-1 py-0.5"
              >
                {selectedNode.status}
              </CyberBadge>
            </div>
          </div>
        </CyberPanel>
      </div>
    </div>
  );
}
