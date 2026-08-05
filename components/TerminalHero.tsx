'use client';

import { useEffect, useRef, useState } from 'react';
import HackerDashboard from '@/components/HackerDashboard';

// ── Types ────────────────────────────────────────────────────────────────────
type LineKind = 'cmd' | 'out' | 'ok' | 'warn' | 'err' | 'dim' | 'blank';

interface RenderedLine {
  text: string;
  done: boolean;
  kind: LineKind;
  prompt?: string; // host prompt for cmd lines (rendered instantly before typing)
}

interface SeqEntry {
  text: string;
  speed: number; // ms/char — 0 = instant
  pause: number; // ms after done
  kind: LineKind;
  prompt?: string;
}

// ── Prompts ──────────────────────────────────────────────────────────────────
const P_KALI = 'root@kali:~#';
const P_TARGET = 'root@target:~#';

function PromptSpan({ prompt }: { prompt: string }) {
  const atIdx = prompt.indexOf('@');
  const colonIdx = prompt.indexOf(':');
  const hashIdx = prompt.lastIndexOf('#');
  const user = prompt.slice(0, atIdx);
  const host = prompt.slice(atIdx + 1, colonIdx);
  const path = prompt.slice(colonIdx, hashIdx);
  return (
    <span className="select-none">
      <span className="text-[#ff5f57]">{user}</span>
      <span className="text-[#00ff9f44]">@</span>
      <span style={{ color: host === 'kali' ? '#febc2e' : '#ff5f57' }}>
        {host}
      </span>
      <span className="text-[#00ff9f55]">{path}</span>
      <span className="text-[#00ff9f44]"># </span>
    </span>
  );
}

const KIND_COLOR: Record<LineKind, string> = {
  cmd: 'text-[#00ff9f]',
  out: 'text-[#00ff9fcc]',
  ok: 'text-[#28c840]',
  warn: 'text-[#febc2e]',
  err: 'text-[#ff5f57]',
  dim: 'text-[#00ff9f44]',
  blank: 'text-transparent',
};

function CounterStat({
  target,
  suffix,
  label,
  delay = 0,
}: {
  target: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const steps = 30;
      const increment = Math.ceil(target / steps);
      const t = setInterval(() => {
        current = Math.min(current + increment, target);
        setVal(current);
        if (current >= target) clearInterval(t);
      }, 45);
      return () => clearInterval(t);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, delay]);

  return (
    <div>
      <div
        className="text-xl font-bold text-[#00ff9f] font-mono tabular-nums"
        style={{ textShadow: '0 0 15px #00ff9f' }}
      >
        {val}
        {suffix}
      </div>
      <div className="text-[10px] text-[#00ff9f55] font-mono mt-0.5">
        {label}
      </div>
    </div>
  );
}

const BOOT_LINES: RenderedLine[] = [
  { text: 'uname -a', done: true, kind: 'cmd', prompt: P_KALI },
  {
    text: 'Linux kali 6.11.2-amd64 #1 SMP PREEMPT x86_64 GNU/Linux',
    done: true,
    kind: 'out',
  },
  {
    text: 'ifconfig eth0 | grep inet',
    done: true,
    kind: 'cmd',
    prompt: P_KALI,
  },
  {
    text: 'inet 192.168.1.42  netmask 255.255.255.0  broadcast 192.168.1.255',
    done: true,
    kind: 'out',
  },
  {
    text: 'arp-scan --localnet 2>/dev/null | grep -v DUP',
    done: true,
    kind: 'cmd',
    prompt: P_KALI,
  },
  {
    text: '192.168.1.1    00:1a:2b:3c:4d:5e  Cisco Systems',
    done: true,
    kind: 'out',
  },
  {
    text: '192.168.1.105  de:ad:be:ef:00:01  Dell Inc.',
    done: true,
    kind: 'out',
  },
  {
    text: '192.168.1.200  ca:fe:ba:be:00:ff  Unknown',
    done: true,
    kind: 'out',
  },
  { text: '3 hosts found in 2.431s', done: true, kind: 'dim' },
  { text: '', done: true, kind: 'blank' },
];

const SEQUENCE: SeqEntry[] = [
  // Phase 1: Port scan
  {
    text: 'nmap -sS -sV -O --open -T4 -p- 192.168.1.0/24',
    speed: 36,
    pause: 300,
    kind: 'cmd',
    prompt: P_KALI,
  },
  {
    text: 'Starting Nmap 7.94 ( https://nmap.org ) at 2026-04-12 03:38 EDT',
    speed: 0,
    pause: 60,
    kind: 'dim',
  },
  {
    text: 'Initiating ARP Ping Scan at 03:38',
    speed: 0,
    pause: 45,
    kind: 'dim',
  },
  { text: 'Scanning 3 hosts [1 port/host]', speed: 0, pause: 45, kind: 'dim' },
  {
    text: 'Completed ARP Ping Scan at 03:38, 0.04s elapsed',
    speed: 0,
    pause: 55,
    kind: 'dim',
  },
  {
    text: 'Initiating SYN Stealth Scan at 03:38',
    speed: 0,
    pause: 45,
    kind: 'dim',
  },
  {
    text: 'Scanning 192.168.1.105 [65535 ports]',
    speed: 0,
    pause: 100,
    kind: 'dim',
  },
  {
    text: 'Discovered open port 22/tcp on 192.168.1.105',
    speed: 0,
    pause: 55,
    kind: 'ok',
  },
  {
    text: 'Discovered open port 80/tcp on 192.168.1.105',
    speed: 0,
    pause: 50,
    kind: 'ok',
  },
  {
    text: 'Discovered open port 443/tcp on 192.168.1.105',
    speed: 0,
    pause: 50,
    kind: 'ok',
  },
  {
    text: 'Discovered open port 3306/tcp on 192.168.1.105',
    speed: 0,
    pause: 50,
    kind: 'ok',
  },
  {
    text: 'Discovered open port 8080/tcp on 192.168.1.105',
    speed: 0,
    pause: 55,
    kind: 'ok',
  },
  {
    text: 'Completed SYN Stealth Scan at 03:39, 74.25s elapsed (65535 total ports)',
    speed: 0,
    pause: 60,
    kind: 'dim',
  },
  {
    text: 'Initiating Service scan at 03:39',
    speed: 0,
    pause: 50,
    kind: 'dim',
  },
  {
    text: 'Scanning 5 services on 192.168.1.105',
    speed: 0,
    pause: 120,
    kind: 'dim',
  },
  {
    text: 'Nmap scan report for 192.168.1.105',
    speed: 0,
    pause: 50,
    kind: 'out',
  },
  {
    text: 'Host is up (0.00042s latency).  MAC: de:ad:be:ef:00:01 (Dell)',
    speed: 0,
    pause: 45,
    kind: 'dim',
  },
  {
    text: 'PORT     STATE  SERVICE   VERSION',
    speed: 0,
    pause: 40,
    kind: 'dim',
  },
  {
    text: '22/tcp   open   ssh       OpenSSH 9.2p1 Debian 2+deb12u3',
    speed: 0,
    pause: 35,
    kind: 'out',
  },
  {
    text: '80/tcp   open   http      Apache httpd 2.4.57 ((Ubuntu))',
    speed: 0,
    pause: 35,
    kind: 'out',
  },
  {
    text: '|_ http-title: Login — Internal Portal',
    speed: 0,
    pause: 35,
    kind: 'dim',
  },
  {
    text: '443/tcp  open   ssl/https OpenSSL 3.1.2',
    speed: 0,
    pause: 35,
    kind: 'out',
  },
  {
    text: '3306/tcp open   mysql     MySQL 8.0.35-0ubuntu0.22.04.1',
    speed: 0,
    pause: 35,
    kind: 'out',
  },
  {
    text: '|_ mysql-info: Protocol: 10  Version: 8.0.35',
    speed: 0,
    pause: 35,
    kind: 'dim',
  },
  {
    text: '8080/tcp open   http-alt  Werkzeug/2.3.6 Python/3.11.6',
    speed: 0,
    pause: 50,
    kind: 'out',
  },
  {
    text: 'OS details: Linux 4.15 - 5.6  Uptime: 3.487 days',
    speed: 0,
    pause: 50,
    kind: 'dim',
  },
  {
    text: 'Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel',
    speed: 0,
    pause: 50,
    kind: 'dim',
  },
  {
    text: 'Nmap done: 3 IP addrs scanned — 5 open ports in 91.34s',
    speed: 0,
    pause: 700,
    kind: 'ok',
  },
  { text: '', speed: 0, pause: 80, kind: 'blank' },
  // Phase 2: Web enumeration
  {
    text: 'nikto -h http://192.168.1.105 -C all 2>/dev/null',
    speed: 34,
    pause: 300,
    kind: 'cmd',
    prompt: P_KALI,
  },
  { text: '+ Target: http://192.168.1.105', speed: 0, pause: 40, kind: 'dim' },
  {
    text: '+ Server: Apache/2.4.57 (Ubuntu)',
    speed: 0,
    pause: 40,
    kind: 'out',
  },
  {
    text: '+ /admin/: Admin login page detected',
    speed: 0,
    pause: 40,
    kind: 'warn',
  },
  {
    text: '+ /backup/: Directory listing enabled',
    speed: 0,
    pause: 40,
    kind: 'warn',
  },
  {
    text: '+ /phpinfo.php: PHP configuration exposed',
    speed: 0,
    pause: 40,
    kind: 'warn',
  },
  {
    text: '+ OSVDB-3092: /login?id=1 SQL injection vector',
    speed: 0,
    pause: 40,
    kind: 'err',
  },
  {
    text: '+ 5 vulnerabilities found in 14.3s',
    speed: 0,
    pause: 600,
    kind: 'ok',
  },
  { text: '', speed: 0, pause: 80, kind: 'blank' },
  // Phase 3: SQL injection
  {
    text: "sqlmap -u 'http://192.168.1.105/login?id=1' --dbs --batch --level=5 --risk=3",
    speed: 30,
    pause: 300,
    kind: 'cmd',
    prompt: P_KALI,
  },
  {
    text: '        ___                                                 ',
    speed: 0,
    pause: 20,
    kind: 'dim',
  },
  {
    text: '       __H__  sqlmap/1.7.11#stable  https://sqlmap.org',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[INFO] testing connection to target URL...',
    speed: 0,
    pause: 60,
    kind: 'dim',
  },
  {
    text: '[INFO] checking if the target is protected by WAF/IPS',
    speed: 0,
    pause: 55,
    kind: 'dim',
  },
  {
    text: '[WARN] WAF/IPS detected (ModSecurity) — switching to evasion',
    speed: 0,
    pause: 70,
    kind: 'warn',
  },
  {
    text: "[INFO] testing if GET parameter 'id' is dynamic",
    speed: 0,
    pause: 45,
    kind: 'dim',
  },
  {
    text: "[INFO] GET parameter 'id' appears to be dynamic",
    speed: 0,
    pause: 45,
    kind: 'out',
  },
  {
    text: "[INFO] heuristic (basic) test shows possible SQLi on 'id'",
    speed: 0,
    pause: 50,
    kind: 'out',
  },
  {
    text: "[INFO] testing 'AND boolean-based blind — WHERE or HAVING clause'",
    speed: 0,
    pause: 55,
    kind: 'dim',
  },
  {
    text: "[INFO] testing 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)'",
    speed: 0,
    pause: 55,
    kind: 'dim',
  },
  {
    text: "[INFO] testing 'Generic UNION query (NULL) — 1 to 10 columns'",
    speed: 0,
    pause: 55,
    kind: 'dim',
  },
  {
    text: '[INFO] WAF bypass successful via chunked transfer encoding',
    speed: 0,
    pause: 60,
    kind: 'ok',
  },
  {
    text: "[INFO] GET parameter 'id' is 'MySQL >= 5.0.12 time-based' injectable",
    speed: 0,
    pause: 60,
    kind: 'ok',
  },
  {
    text: '[INFO] the back-end DBMS is MySQL  web server OS: Ubuntu 22.04',
    speed: 0,
    pause: 60,
    kind: 'out',
  },
  {
    text: '[INFO] fetching database names...',
    speed: 0,
    pause: 80,
    kind: 'dim',
  },
  { text: 'available databases [4]:', speed: 0, pause: 40, kind: 'out' },
  { text: '[*] information_schema', speed: 0, pause: 30, kind: 'dim' },
  { text: '[*] users_db', speed: 0, pause: 30, kind: 'err' },
  { text: '[*] webapp', speed: 0, pause: 30, kind: 'warn' },
  { text: '[*] logs', speed: 0, pause: 400, kind: 'dim' },
  {
    text: "sqlmap -u '...?id=1' -D users_db -T users --dump --threads=4",
    speed: 30,
    pause: 200,
    kind: 'cmd',
    prompt: P_KALI,
  },
  {
    text: '[INFO] fetching columns for table users in database users_db',
    speed: 0,
    pause: 55,
    kind: 'dim',
  },
  {
    text: '[INFO] fetching entries for table users in database users_db',
    speed: 0,
    pause: 55,
    kind: 'dim',
  },
  {
    text: '[INFO] recognized possible password hashes in column hash',
    speed: 0,
    pause: 55,
    kind: 'warn',
  },
  {
    text: 'Database: users_db  Table: users  [3 entries]',
    speed: 0,
    pause: 40,
    kind: 'out',
  },
  {
    text: '+----+----------+-----------------+------------------------------+',
    speed: 0,
    pause: 25,
    kind: 'dim',
  },
  {
    text: '| id | user     | role            | hash                         |',
    speed: 0,
    pause: 25,
    kind: 'dim',
  },
  {
    text: '+----+----------+-----------------+------------------------------+',
    speed: 0,
    pause: 25,
    kind: 'dim',
  },
  {
    text: '|  1 | admin    | superadmin      | $2y$10$3TtDqXpM1n2Kz9R8vL7... |',
    speed: 0,
    pause: 35,
    kind: 'err',
  },
  {
    text: '|  2 | devops   | admin           | $2y$10$9KzmpR3Lw4Nt7Qv2Yx6... |',
    speed: 0,
    pause: 35,
    kind: 'warn',
  },
  {
    text: '|  3 | monitor  | viewer          | $2y$10$Lp8XrTq9Fs5Mv1Jb3Wu... |',
    speed: 0,
    pause: 35,
    kind: 'out',
  },
  {
    text: '+----+----------+-----------------+------------------------------+',
    speed: 0,
    pause: 600,
    kind: 'dim',
  },
  { text: '', speed: 0, pause: 80, kind: 'blank' },
  // Phase 4: Brute force
  {
    text: 'hydra -L /tmp/users.txt -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.105 -t 4 -V',
    speed: 28,
    pause: 300,
    kind: 'cmd',
    prompt: P_KALI,
  },
  {
    text: 'Hydra v9.5 (c) 2023 by van Hauser/THC — https://github.com/vanhauser-thc/thc-hydra',
    speed: 0,
    pause: 40,
    kind: 'dim',
  },
  {
    text: '[WARNING] Many SSH configurations limit the number of parallel tasks',
    speed: 0,
    pause: 50,
    kind: 'warn',
  },
  {
    text: '[DATA] max 4 tasks per 1 server, overall 4 tasks, 57380604 login tries',
    speed: 0,
    pause: 50,
    kind: 'dim',
  },
  {
    text: '[DATA] attacking ssh://192.168.1.105:22/',
    speed: 0,
    pause: 40,
    kind: 'dim',
  },
  {
    text: '[ATTEMPT] target 192.168.1.105 — login: root — pass: 123456',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[ATTEMPT] target 192.168.1.105 — login: root — pass: password',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[ATTEMPT] target 192.168.1.105 — login: admin — pass: 123456',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[ATTEMPT] target 192.168.1.105 — login: admin — pass: admin',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[STATUS]   256 valid passwords tested  (128.3/min) — 3 mins left',
    speed: 0,
    pause: 45,
    kind: 'dim',
  },
  {
    text: '[ATTEMPT] target 192.168.1.105 — login: root — pass: qwerty',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[ATTEMPT] target 192.168.1.105 — login: root — pass: letmein',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[RE-ATTEMPT] target 192.168.1.105 — login: root — pass: letmein (retrying)',
    speed: 0,
    pause: 35,
    kind: 'warn',
  },
  {
    text: '[STATUS]  1024 valid passwords tested  (155.7/min) — 2 mins left',
    speed: 0,
    pause: 45,
    kind: 'dim',
  },
  {
    text: '[ATTEMPT] target 192.168.1.105 — login: root — pass: master',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[ATTEMPT] target 192.168.1.105 — login: root — pass: toor',
    speed: 0,
    pause: 30,
    kind: 'dim',
  },
  {
    text: '[STATUS]  4096 valid passwords tested  (178.2/min) — 1 min left',
    speed: 0,
    pause: 60,
    kind: 'dim',
  },
  {
    text: '[22][ssh] host: 192.168.1.105   login: root   password: toor',
    speed: 0,
    pause: 60,
    kind: 'err',
  },
  {
    text: '1 of 1 target successfully completed, 1 valid password found',
    speed: 0,
    pause: 45,
    kind: 'ok',
  },
  {
    text: 'Hydra finished at 2026-04-12 03:41:17  (4,312 attempts in 27s)',
    speed: 0,
    pause: 700,
    kind: 'dim',
  },
  { text: '', speed: 0, pause: 80, kind: 'blank' },
  // Phase 5: Post-exploit
  {
    text: 'ssh root@192.168.1.105',
    speed: 38,
    pause: 300,
    kind: 'cmd',
    prompt: P_KALI,
  },
  {
    text: 'Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-91-generic x86_64)',
    speed: 0,
    pause: 40,
    kind: 'out',
  },
  {
    text: 'Last login: Sun Apr 12 03:22:11 2026 from 192.168.1.42',
    speed: 0,
    pause: 80,
    kind: 'dim',
  },
  {
    text: 'id && whoami',
    speed: 48,
    pause: 200,
    kind: 'cmd',
    prompt: P_TARGET,
  },
  {
    text: 'uid=0(root) gid=0(root) groups=0(root)',
    speed: 0,
    pause: 40,
    kind: 'ok',
  },
  { text: 'root', speed: 0, pause: 60, kind: 'out' },
  {
    text: 'cat /etc/shadow | head -3',
    speed: 40,
    pause: 200,
    kind: 'cmd',
    prompt: P_TARGET,
  },
  {
    text: 'root:$6$rnd$K2Xv....:19450:0:99999:7:::',
    speed: 0,
    pause: 40,
    kind: 'err',
  },
  { text: 'daemon:*:18858:0:99999:7:::', speed: 0, pause: 40, kind: 'dim' },
  {
    text: 'find / -perm -4000 -type f 2>/dev/null | head',
    speed: 36,
    pause: 200,
    kind: 'cmd',
    prompt: P_TARGET,
  },
  {
    text: '/usr/bin/sudo  /usr/bin/passwd  /usr/sbin/exim4',
    speed: 0,
    pause: 600,
    kind: 'warn',
  },
  { text: '', speed: 0, pause: 80, kind: 'blank' },
  // Phase 6: Persistence
  {
    text: 'echo "*/5 * * * * root /tmp/.bd" >> /etc/crontab',
    speed: 32,
    pause: 200,
    kind: 'cmd',
    prompt: P_TARGET,
  },
  {
    text: '[+] Cron backdoor installed — persistence active',
    speed: 0,
    pause: 400,
    kind: 'ok',
  },
  { text: 'exit', speed: 55, pause: 200, kind: 'cmd', prompt: P_TARGET },
  { text: 'logout', speed: 0, pause: 200, kind: 'dim' },
  { text: '', speed: 0, pause: 80, kind: 'blank' },
  {
    text: './start_portfolio.sh',
    speed: 48,
    pause: 400,
    kind: 'cmd',
    prompt: P_KALI,
  },
  {
    text: '[■■■■■■■■■■■■] Access granted. Welcome, sifreleNet.',
    speed: 22,
    pause: 2200,
    kind: 'ok',
  },
];

const MAX_LINES = 18;

interface TerminalHeroProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  showStats?: boolean;
  stats?: Array<{ target: number; suffix: string; label: string }>;
  terminalTitle?: string;
  terminalStatus?: string;
  terminalFooterRight?: string;
  customSequence?: SeqEntry[];
  customBootLines?: RenderedLine[];
  loopAnimation?: boolean;
  onComplete?: () => void;
}

export default function TerminalHero({
  title = 'sifreleNet',
  subtitle = 'SECURITY RESEARCHER · ETHICAL HACKER · CTF PLAYER',
  badgeText = 'UNAUTHORIZED ACCESS DETECTED — 192.168.1.0/24',
  showStats = true,
  stats = [
    { target: 50, suffix: '+', label: 'CTF Solved' },
    { target: 10, suffix: '+', label: 'Projects' },
    { target: 3, suffix: '+', label: 'Yrs Exp.' },
  ],
  terminalTitle = 'sifrelenet@kali — bash — 120×36',
  terminalStatus = 'CONNECTED — 192.168.1.42',
  terminalFooterRight = 'KALI LINUX 2024.3',
  customSequence,
  customBootLines,
  loopAnimation = true,
  onComplete,
}: TerminalHeroProps) {
  const finalBootLines = customBootLines || BOOT_LINES;
  const finalSequence = customSequence || SEQUENCE;

  const [lines, setLines] = useState<RenderedLine[]>(
    finalBootLines.slice(-MAX_LINES)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (true) {
        for (const entry of finalSequence) {
          if (cancelled) return;

          if (entry.speed === 0) {
            setLines((prev) =>
              [
                ...prev,
                {
                  text: entry.text,
                  done: true,
                  kind: entry.kind,
                  prompt: entry.prompt,
                },
              ].slice(-MAX_LINES)
            );
          } else {
            setLines((prev) =>
              [
                ...prev,
                {
                  text: '',
                  done: false,
                  kind: entry.kind,
                  prompt: entry.prompt,
                },
              ].slice(-MAX_LINES)
            );

            for (let i = 1; i <= entry.text.length; i++) {
              if (cancelled) return;
              await new Promise((r) => setTimeout(r, entry.speed));
              setLines((prev) => {
                const next = [...prev];
                next[next.length - 1] = {
                  ...next[next.length - 1],
                  text: entry.text.slice(0, i),
                  done: false,
                };
                return next;
              });
            }

            setLines((prev) => {
              const next = [...prev];
              next[next.length - 1] = { ...next[next.length - 1], done: true };
              return next;
            });
          }

          if (entry.pause > 0)
            await new Promise((r) => setTimeout(r, entry.pause));
        }

        if (cancelled) return;
        
        if (onComplete) {
          onComplete();
        }

        if (!loopAnimation) break;

        // Reiniciar
        await new Promise((r) => setTimeout(r, 1200));
        setLines(finalBootLines.slice(-MAX_LINES));
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [finalSequence, finalBootLines, loopAnimation, onComplete]);

  const lastPrompt =
    [...lines].reverse().find((l) => l.kind === 'cmd')?.prompt ?? P_KALI;

  return (
    <section className="relative overflow-hidden">
      {/* Matrix rain fondo — viene del wrapper de page.tsx */}

      {/* Vignette local más suave */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 100%)',
        }}
      />

      {/* Scanline sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline-sweep" />
      </div>

      {/* CRT noise */}
      <div className="absolute inset-0 pointer-events-none crt-noise" />

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        {/* Header central */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#00ff9f55] border border-[#1a2e1a] bg-[#0a0a0acc] px-4 py-1.5 rounded mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f57] animate-pulse" />
            <span>{badgeText}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold font-mono mb-3"
            style={{ textShadow: '0 0 30px #00ff9f, 0 0 60px #00ff9f40' }}
          >
            <span className="text-[#00ff9f44]">[</span>
            <span className="text-[#00ff9f]">{title}</span>
            <span className="text-[#00ff9f44]">]</span>
            <span className="animate-blink text-[#00ff9f] ml-1">_</span>
          </h1>
          <p className="text-[#00ff9faa] font-mono text-sm tracking-widest">
            {subtitle}
          </p>
        </div>

        {/* Terminal + Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 lg:h-130">
          {/* Terminal principal */}
          <div className="rounded-lg border border-[#00ff9f22] bg-[#0a0a0aee] shadow-[0_0_40px_#00ff9f15] overflow-hidden flex flex-col h-105 lg:h-full">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d0d0ddd] border-b border-[#00ff9f11] shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c840]" />
              <span className="flex-1 text-center text-[11px] text-[#00ff9f33] font-mono">
                {terminalTitle}
              </span>
            </div>
            <div
              ref={containerRef}
              className="p-4 flex-1 min-h-0 overflow-y-hidden font-mono text-[12px] leading-6"
            >
              {lines.map((line, i) => {
                if (line.kind === 'blank')
                  return <div key={i} className="h-3" />;
                return (
                  <div
                    key={i}
                    className={`flex items-baseline ${KIND_COLOR[line.kind]}`}
                  >
                    {line.kind === 'cmd' && line.prompt && (
                      <PromptSpan prompt={line.prompt} />
                    )}
                    <span>{line.text}</span>
                    {!line.done && (
                      <span className="animate-blink ml-0.5 text-[#00ff9f]">
                        ▊
                      </span>
                    )}
                  </div>
                );
              })}
              {lines.length > 0 && lines[lines.length - 1].done && (
                <div className="flex items-baseline text-[#00ff9f]">
                  <PromptSpan prompt={lastPrompt} />
                  <span className="animate-blink">▊</span>
                </div>
              )}
            </div>
            <div className="px-4 py-1.5 border-t border-[#0d1a0d] bg-[#080808] flex items-center justify-between text-[10px] font-mono shrink-0">
              <span className="text-[#28c840] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
                {terminalStatus}
              </span>
              <span className="text-[#00ff9f33]">{terminalFooterRight}</span>
            </div>
          </div>

          {/* Paneles hacker */}
          <HackerDashboard />
        </div>

        {/* CTA + stats */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-3">
            <a
              href="/projects"
              className="group px-5 py-2.5 border border-[#00ff9f] text-[#00ff9f] text-sm font-mono rounded relative overflow-hidden hover:shadow-[0_0_30px_#00ff9f44] transition-all duration-300"
            >
              <span className="relative z-10">./view_projects.sh</span>
              <span className="absolute inset-0 bg-[#00ff9f] translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10" />
            </a>
            <a
              href="/contact"
              className="px-5 py-2.5 border border-[#00ff9f33] text-[#00ff9f77] text-sm font-mono rounded hover:border-[#00ff9f] hover:text-[#00ff9f] hover:shadow-[0_0_20px_#00ff9f22] transition-all duration-300"
            >
              ./contact_me.sh
            </a>
          </div>

          {showStats && (
            <div className="flex gap-8 text-center">
              {stats.map(({ target, suffix, label }, idx) => (
                <CounterStat
                  key={label}
                  target={target}
                  suffix={suffix}
                  label={label}
                  delay={idx * 150}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
