'use client';

import { useEffect, useRef, useState } from 'react';

const SCAN_HOSTS = [
  { ip: '192.168.1.1', ports: '22,80,443', os: 'Linux', status: 'up' },
  { ip: '192.168.1.42', ports: '3306,8080', os: 'Ubuntu', status: 'up' },
  { ip: '192.168.1.105', ports: '21,22,80', os: 'Debian', status: 'up' },
  { ip: '192.168.1.200', ports: '445,3389', os: 'Windows', status: 'up' },
  { ip: '192.168.1.88', ports: '23,8443', os: 'Cisco', status: 'up' },
  { ip: '192.168.1.12', ports: '53,161', os: 'FreeBSD', status: 'up' },
  { ip: '192.168.1.77', ports: '6379,27017', os: 'Ubuntu', status: 'up' },
  { ip: '192.168.1.150', ports: '80,443,8080', os: 'CentOS', status: 'up' },
  { ip: '192.168.1.33', ports: '22,2222', os: 'Alpine', status: 'up' },
  { ip: '192.168.1.254', ports: '80,443', os: 'Linux', status: 'up' },
];

const SCAN_MAX = 6;

// Panel: Network scan en vivo
export function NetworkScanPanel({ interval = 1100 }: { interval?: number }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setOffset((v) => (v + 1) % (SCAN_HOSTS.length - SCAN_MAX + 1));
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  const visible = SCAN_HOSTS.slice(offset, offset + SCAN_MAX);

  return (
    <div className="hacker-panel">
      <div className="hacker-panel-bar">
        <span className="text-[#00ff9f]">⬡</span>
        <span>NETWORK SCAN — 192.168.1.0/24</span>
        <div className="flex items-center gap-1 ml-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] animate-pulse" />
          <span className="text-[#00ff9f66]">LIVE</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden p-3 space-y-1">
        <div className="grid grid-cols-4 text-[10px] text-[#00ff9f44] mb-2 px-1">
          <span>HOST</span>
          <span>PORTS</span>
          <span>OS</span>
          <span>STATE</span>
        </div>
        {visible.map((h) => (
          <div
            key={h.ip}
            className="grid grid-cols-4 text-[11px] font-mono px-1 py-0.5 hover:bg-[#00ff9f08] rounded"
          >
            <span className="text-[#00ff9f]">{h.ip}</span>
            <span className="text-[#00ff9faa]">{h.ports}</span>
            <span className="text-[#00ff9f77]">{h.os}</span>
            <span className="text-[#28c840]">{h.status}</span>
          </div>
        ))}
        <div className="text-[11px] text-[#00ff9f55] px-1 flex items-center gap-1">
          <span className="animate-blink">█</span>
          <span>scanning...</span>
        </div>
      </div>
    </div>
  );
}

// Panel: Live log de ataques
const LOG_ENTRIES = [
  { time: '03:21:44', type: 'INFO', msg: 'SQLi detected — param: id' },
  { time: '03:21:45', type: 'WARN', msg: 'WAF bypass — chunked encoding' },
  { time: '03:21:47', type: 'CRIT', msg: 'Root shell obtained' },
  { time: '03:21:48', type: 'INFO', msg: 'Pivoting 10.0.0.1 → 10.0.0.5' },
  { time: '03:21:51', type: 'WARN', msg: 'AV evasion — msfvenom payload' },
  { time: '03:21:53', type: 'INFO', msg: 'Exfil 3.2MB → /tmp/.loot' },
  { time: '03:21:55', type: 'CRIT', msg: 'Persistence — cron backdoor set' },
  { time: '03:22:01', type: 'WARN', msg: 'IDS alert triggered — port 4444' },
  { time: '03:22:04', type: 'INFO', msg: 'SSRF → internal 169.254.169.254' },
  { time: '03:22:07', type: 'CRIT', msg: '/etc/shadow dumped — 14 hashes' },
  { time: '03:22:10', type: 'INFO', msg: 'Mimikatz — LSASS dump success' },
  { time: '03:22:13', type: 'WARN', msg: 'Reverse shell conn from .105:9001' },
  { time: '03:22:15', type: 'INFO', msg: 'Lateral move → 192.168.1.88' },
  { time: '03:22:18', type: 'CRIT', msg: 'Domain admin hash captured' },
  { time: '03:22:21', type: 'WARN', msg: 'Firewall rule disabled — iptables' },
  { time: '03:22:24', type: 'INFO', msg: 'Keylogger deployed — /tmp/.kl' },
];

const LOG_MAX = 4;

export function LiveLogPanel({ interval = 1400 }: { interval?: number }) {
  const [visibleLog, setVisibleLog] = useState(() =>
    LOG_ENTRIES.slice(0, LOG_MAX)
  );
  const idxRef = useRef(LOG_MAX);

  useEffect(() => {
    const t = setInterval(() => {
      const next = LOG_ENTRIES[idxRef.current % LOG_ENTRIES.length];
      idxRef.current++;
      setVisibleLog((prev) => [...prev.slice(-LOG_MAX + 1), next]);
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  const typeColor = (t: string) =>
    t === 'CRIT'
      ? 'text-[#ff5f57]'
      : t === 'WARN'
        ? 'text-[#febc2e]'
        : 'text-[#00ff9f88]';

  return (
    <div className="hacker-panel">
      <div className="hacker-panel-bar">
        <span className="text-[#ff5f57]">⬡</span>
        <span>ATTACK LOG</span>
        <span className="ml-auto text-[#ff5f5766] text-[10px]">
          UNAUTH ACCESS
        </span>
      </div>
      <div className="flex-1 overflow-hidden p-3 space-y-1 font-mono text-[11px]">
        {visibleLog.map((e, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[#00ff9f33] shrink-0">{e.time}</span>
            <span className={`shrink-0 w-8 ${typeColor(e.type)}`}>
              {e.type}
            </span>
            <span className="text-[#00ff9fbb]">{e.msg}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 text-[#00ff9f44]">
          <span className="animate-blink">█</span>
        </div>
      </div>
    </div>
  );
}

const BRUTE_WORDS = [
  'root:toor',
  'admin:123456',
  'user:letmein',
  'admin:qwerty',
  'root:alpine',
  'admin:hunter2',
  'root:password',
  'deploy:deploy',
  'ubuntu:ubuntu',
  'admin:admin123',
  'root:1234',
  'sysadmin:sysadmin',
  'guest:guest',
  'admin:P@ssw0rd',
  'root:rootroot',
  'pi:raspberry',
  'admin:changeme',
  'oracle:oracle',
];

// Panel: Brute-force progress
export function BruteForcePanel({ interval = 600 }: { interval?: number }) {
  const [progress, setProgress] = useState(12);
  const [attempt, setAttempt] = useState(BRUTE_WORDS[0]);
  const wIdxRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) =>
        p >= 100 ? 8 : p + Math.floor(Math.random() * 7) + 3
      );
      wIdxRef.current = (wIdxRef.current + 1) % BRUTE_WORDS.length;
      setAttempt(BRUTE_WORDS[wIdxRef.current]);
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  return (
    <div className="hacker-panel">
      <div className="hacker-panel-bar">
        <span className="text-[#febc2e]">⬡</span>
        <span>BRUTEFORCE — SSH:22</span>
      </div>
      <div className="flex-1 overflow-hidden p-3 space-y-3 font-mono text-[11px]">
        <div className="flex justify-between text-[#00ff9f88]">
          <span>
            target: <span className="text-[#00ff9f]">192.168.1.105</span>
          </span>
          <span>
            mode: <span className="text-[#febc2e]">dictionary</span>
          </span>
        </div>
        <div className="flex justify-between text-[#00ff9f55]">
          <span>
            trying: <span className="text-[#00ff9faa]">{attempt}</span>
          </span>
        </div>
        <div>
          <div className="flex justify-between text-[10px] text-[#00ff9f55] mb-1">
            <span>progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded bg-[#0d1a0d] overflow-hidden">
            <div
              className="h-full rounded bg-[#00ff9f] transition-all duration-500 shadow-[0_0_8px_#00ff9f]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-[#00ff9f33]">
          <span>
            {Math.floor((progress / 100) * 10000).toLocaleString('en-US')} /
            10,000 attempts
          </span>
          <span className="text-[#28c840] animate-pulse">running</span>
        </div>
      </div>
    </div>
  );
}

// Panel: Hex dump estilo memoria
const HEX_ROWS = [
  '4D 5A 90 00 03 00 00 00  04 00 00 00 FF FF 00 00  MZ..............',
  'B8 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00  ........@.......',
  '00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................',
  'E8 00 00 00 0E 1F BA 0E  00 B4 09 CD 21 B8 01 4C  ............!..L',
  '54 68 69 73 20 70 72 6F  67 72 61 6D 20 63 61 6E  This program can',
  '6E 6F 74 20 62 65 20 72  75 6E 20 69 6E 20 44 4F  not be run in DO',
  '53 20 6D 6F 64 65 2E 0D  0A 24 00 00 00 00 00 00  S mode...$......',
  'C0 00 00 00 00 00 00 00  0E 1F BA 0E 00 CD 09 B4  ................',
  '48 8B 05 00 00 00 00 50  48 31 C9 FF D0 58 C3 90  H......PH1..X...',
  '6A 00 68 9C 10 40 00 68  70 10 40 00 6A 00 FF 15  j.h..@.hp.@.j...',
  'E9 6F FF FF FF CC CC CC  CC CC CC CC CC CC CC CC  .o..............',
  '55 8B EC 83 EC 44 53 56  57 8B F9 89 7D F4 33 F6  U....DSVW...}.3.',
];

const HEX_VISIBLE = 6;

export function HexDumpPanel({ interval = 700 }: { interval?: number }) {
  const [offset, setOffset] = useState(0);
  const [highlight, setHighlight] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setOffset((o) => (o + 1) % (HEX_ROWS.length - HEX_VISIBLE + 1));
      setHighlight((h) => (h + 1) % HEX_VISIBLE);
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  const visibleRows = HEX_ROWS.slice(offset, offset + HEX_VISIBLE);

  return (
    <div className="hacker-panel">
      <div className="hacker-panel-bar">
        <span className="text-[#00ff9f]">⬡</span>
        <span>MEMORY DUMP — PID 1337</span>
      </div>
      <div className="flex-1 overflow-hidden p-3 font-mono text-[10px] space-y-0.5">
        {visibleRows.map((row, i) => (
          <div
            key={offset + i}
            className={`px-1 py-0.5 rounded transition-colors duration-300 ${
              i === highlight
                ? 'bg-[#00ff9f15] text-[#00ff9f]'
                : 'text-[#00ff9f55]'
            }`}
          >
            <span className="text-[#00ff9f33] mr-2">
              {((offset + i) * 16).toString(16).padStart(8, '0')}:
            </span>
            {row}
          </div>
        ))}
      </div>
    </div>
  );
}

interface HackerDashboardProps {
  scanInterval?: number;
  logInterval?: number;
  bruteInterval?: number;
  hexInterval?: number;
}

export default function HackerDashboard({
  scanInterval,
  logInterval,
  bruteInterval,
  hexInterval,
}: HackerDashboardProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-105 lg:h-full">
      <NetworkScanPanel interval={scanInterval} />
      <LiveLogPanel interval={logInterval} />
      <BruteForcePanel interval={bruteInterval} />
      <HexDumpPanel interval={hexInterval} />
    </div>
  );
}
