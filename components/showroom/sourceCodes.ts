// This file is auto-generated. Do not edit directly.

export const SOURCE_CODES: Record<string, string> = {
  MatrixRain: `'use client';

import { useEffect, useRef } from 'react';

const CHAR_SETS = {
  katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  binary: '01',
  hex: '0123456789ABCDEF',
  all: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF></?|\\\\[]{}=+-_',
};

interface MatrixRainProps {
  color?: string;
  speed?: number;
  fontSize?: number;
  opacity?: number;
  charType?: 'katakana' | 'binary' | 'hex' | 'all';
}

export default function MatrixRain({
  color = 'var(--neon-green)',
  speed = 0.5,
  fontSize = 13,
  opacity = 0.4,
  charType = 'all',
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = CHAR_SETS[charType] || CHAR_SETS.all;

    // Inicializar tamaño antes de calcular cols/drops
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let cols = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array.from(
      { length: cols },
      () => Math.random() * -80
    );

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const newCols = Math.floor(canvas.width / fontSize);
      if (newCols > cols) {
        for (let i = cols; i < newCols; i++) drops.push(Math.random() * -80);
      } else if (newCols < cols) {
        drops = drops.slice(0, newCols);
      }
      cols = newCols;
    };
    resize();
    window.addEventListener('resize', resize);

    let rafId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;

        // Carácter principal — blanco brillante
        if (drops[i] > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.font = \`bold \${fontSize}px monospace\`;
          ctx.fillText(char, i * fontSize, y);
        }

        // Cola — color neón con gradiente de opacidad
        ctx.font = \`\${fontSize}px monospace\`;
        const trailLen = 20;
        for (let t = 1; t < trailLen; t++) {
          const ty = (drops[i] - t) * fontSize;
          if (ty < 0) continue;
          const alpha = ((trailLen - t) / trailLen) * 0.7;
          
          // Render with matching hex color but variable alpha
          // Convert hex color to rgba if possible, or use standard rgba overlay
          ctx.fillStyle = color.startsWith('#') 
            ? \`\${color}\${Math.floor(alpha * 255).toString(16).padStart(2, '0')}\`
            : color; // fallback if color isn't a hex format
            
          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(trailChar, i * fontSize, ty);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [color, speed, fontSize, charType]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block', opacity }}
    />
  );
}
`,
  TerminalHero: `'use client';

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
      <span className="text-neon-green/27">@</span>
      <span style={{ color: host === 'kali' ? '#febc2e' : '#ff5f57' }}>
        {host}
      </span>
      <span className="text-neon-green/33">{path}</span>
      <span className="text-neon-green/27"># </span>
    </span>
  );
}

const KIND_COLOR: Record<LineKind, string> = {
  cmd: 'text-neon-green',
  out: 'text-neon-green/80',
  ok: 'text-[#28c840]',
  warn: 'text-[#febc2e]',
  err: 'text-[#ff5f57]',
  dim: 'text-neon-green/27',
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
        className="text-xl font-bold text-neon-green font-mono tabular-nums"
        style={{ textShadow: '0 0 15px var(--neon-green)' }}
      >
        {val}
        {suffix}
      </div>
      <div className="text-[10px] text-neon-green/33 font-mono mt-0.5">
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
    text: '|  1 | admin    | superadmin      | \$2y\$10\$3TtDqXpM1n2Kz9R8vL7... |',
    speed: 0,
    pause: 35,
    kind: 'err',
  },
  {
    text: '|  2 | devops   | admin           | \$2y\$10\$9KzmpR3Lw4Nt7Qv2Yx6... |',
    speed: 0,
    pause: 35,
    kind: 'warn',
  },
  {
    text: '|  3 | monitor  | viewer          | \$2y\$10\$Lp8XrTq9Fs5Mv1Jb3Wu... |',
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
    text: 'root:\$6\$rnd\$K2Xv....:19450:0:99999:7:::',
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
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-neon-green/33 border border-[#1a2e1a] bg-[#0a0a0acc] px-4 py-1.5 rounded mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f57] animate-pulse" />
            <span>{badgeText}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold font-mono mb-3"
            style={{ textShadow: '0 0 30px var(--neon-green), 0 0 60px color-mix(in srgb, var(--neon-green) 25%, transparent)' }}
          >
            <span className="text-neon-green/27">[</span>
            <span className="text-neon-green">{title}</span>
            <span className="text-neon-green/27">]</span>
            <span className="animate-blink text-neon-green ml-1">_</span>
          </h1>
          <p className="text-neon-green/67 font-mono text-sm tracking-widest">
            {subtitle}
          </p>
        </div>

        {/* Terminal + Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 lg:h-130">
          {/* Terminal principal */}
          <div className="rounded-lg border border-neon-green/13 bg-[#0a0a0aee] shadow-[0_0_40px_color-mix(in srgb, var(--neon-green) 8%, transparent)] overflow-hidden flex flex-col h-105 lg:h-full">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d0d0ddd] border-b border-neon-green/7 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c840]" />
              <span className="flex-1 text-center text-[11px] text-neon-green/20 font-mono">
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
                    className={\`flex items-baseline \${KIND_COLOR[line.kind]}\`}
                  >
                    {line.kind === 'cmd' && line.prompt && (
                      <PromptSpan prompt={line.prompt} />
                    )}
                    <span>{line.text}</span>
                    {!line.done && (
                      <span className="animate-blink ml-0.5 text-neon-green">
                        ▊
                      </span>
                    )}
                  </div>
                );
              })}
              {lines.length > 0 && lines[lines.length - 1].done && (
                <div className="flex items-baseline text-neon-green">
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
              <span className="text-neon-green/20">{terminalFooterRight}</span>
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
              className="group px-5 py-2.5 border border-neon-green text-neon-green text-sm font-mono rounded relative overflow-hidden hover:shadow-[0_0_30px_color-mix(in srgb, var(--neon-green) 27%, transparent)] transition-all duration-300"
            >
              <span className="relative z-10">./view_projects.sh</span>
              <span className="absolute inset-0 bg-neon-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10" />
            </a>
            <a
              href="/contact"
              className="px-5 py-2.5 border border-neon-green/20 text-neon-green/47 text-sm font-mono rounded hover:border-neon-green hover:text-neon-green hover:shadow-[0_0_20px_color-mix(in srgb, var(--neon-green) 13%, transparent)] transition-all duration-300"
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
`,
  HackerDashboard: `'use client';

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
        <span className="text-neon-green">⬡</span>
        <span>NETWORK SCAN — 192.168.1.0/24</span>
        <div className="flex items-center gap-1 ml-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          <span className="text-neon-green/40">LIVE</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden p-3 space-y-1">
        <div className="grid grid-cols-4 text-[10px] text-neon-green/27 mb-2 px-1">
          <span>HOST</span>
          <span>PORTS</span>
          <span>OS</span>
          <span>STATE</span>
        </div>
        {visible.map((h) => (
          <div
            key={h.ip}
            className="grid grid-cols-4 text-[11px] font-mono px-1 py-0.5 hover:bg-neon-green/3 rounded"
          >
            <span className="text-neon-green">{h.ip}</span>
            <span className="text-neon-green/67">{h.ports}</span>
            <span className="text-neon-green/47">{h.os}</span>
            <span className="text-[#28c840]">{h.status}</span>
          </div>
        ))}
        <div className="text-[11px] text-neon-green/33 px-1 flex items-center gap-1">
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
        : 'text-neon-green/53';

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
            <span className="text-neon-green/20 shrink-0">{e.time}</span>
            <span className={\`shrink-0 w-8 \${typeColor(e.type)}\`}>
              {e.type}
            </span>
            <span className="text-neon-green/73">{e.msg}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 text-neon-green/27">
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
        <div className="flex justify-between text-neon-green/53">
          <span>
            target: <span className="text-neon-green">192.168.1.105</span>
          </span>
          <span>
            mode: <span className="text-[#febc2e]">dictionary</span>
          </span>
        </div>
        <div className="flex justify-between text-neon-green/33">
          <span>
            trying: <span className="text-neon-green/67">{attempt}</span>
          </span>
        </div>
        <div>
          <div className="flex justify-between text-[10px] text-neon-green/33 mb-1">
            <span>progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded bg-[#0d1a0d] overflow-hidden">
            <div
              className="h-full rounded bg-neon-green transition-all duration-500 shadow-[0_0_8px_var(--neon-green)]"
              style={{ width: \`\${progress}%\` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-neon-green/20">
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
  '53 20 6D 6F 64 65 2E 0D  0A 24 00 00 00 00 00 00  S mode...\$......',
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
        <span className="text-neon-green">⬡</span>
        <span>MEMORY DUMP — PID 1337</span>
      </div>
      <div className="flex-1 overflow-hidden p-3 font-mono text-[10px] space-y-0.5">
        {visibleRows.map((row, i) => (
          <div
            key={offset + i}
            className={\`px-1 py-0.5 rounded transition-colors duration-300 \${
              i === highlight
                ? 'bg-neon-green/8 text-neon-green'
                : 'text-neon-green/33'
            }\`}
          >
            <span className="text-neon-green/20 mr-2">
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
`,
  ProjectCard: `import { Project, categoryLabels, statusColors } from '@/data/projects';

interface ProjectCardProps {
  project?: Partial<Project>;
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  status?: string;
  github?: string;
  demo?: string;
  year?: number | string;
  id?: number | string;
  index?: number;
}

const defaultStatusColors: Record<string, string> = {
  active: 'text-neon-green border-neon-green/27',
  completed: 'text-neon-green/67 border-neon-green/13',
  wip: 'text-[#febc2e] border-[#febc2e44]',
};

export default function ProjectCard({
  project,
  title,
  description,
  tags,
  category,
  status,
  github,
  demo,
  year,
  id,
  index = 0,
}: ProjectCardProps) {
  const pTitle = title || project?.title || 'Quantum Crypt';
  const pDesc = description || project?.description || 'Secure decentralized multi-party computation protocol with lattice-based encryption.';
  const pTags = tags || project?.tags || ['Cryptography', 'Rust', 'WASM'];
  const pCategory = category || (project?.category ? categoryLabels[project.category] : 'Security Tool');
  const pStatus = status || project?.status || 'active';
  const pGithub = github || project?.github;
  const pDemo = demo || project?.demo;
  const pYear = year || project?.year || 2026;
  const pId = id || project?.id || 1;

  const statusColorClass = 
    defaultStatusColors[pStatus.toLowerCase()] || 
    (project?.status && statusColors[project.status]) || 
    'text-neon-green border-neon-green/27';

  return (
    <article
      className="border border-[#1a2e1a] bg-[#0d0d0d] rounded-lg p-5 flex flex-col gap-4 border-glow group hover:bg-[#0f0f0f] transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: \`\${index * 100}ms\` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neon-green/33 text-xs">
              [{pId.toString().padStart(2, '0')}]
            </span>
            <span className="text-xs border border-current rounded px-2 py-0.5 font-mono opacity-70">
              {pCategory}
            </span>
          </div>
          <h3 className="text-neon-green font-bold text-base group-hover:text-shadow-glow transition-all duration-300 font-mono">
            {pTitle}
          </h3>
        </div>

        {/* Status badge */}
        <span
          className={\`text-[10px] border rounded px-2 py-0.5 font-mono shrink-0 \${statusColorClass}\`}
        >
          {pStatus}
        </span>
      </div>

      {/* Description */}
      <p className="text-neon-green/53 text-sm leading-relaxed flex-1">
        {pDesc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {pTags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono bg-neon-green/5 border border-neon-green/13 text-neon-green/47 rounded px-2 py-0.5 hover:text-neon-green hover:border-neon-green/27 transition-all duration-200"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer - year + links */}
      <div className="flex items-center justify-between pt-2 border-t border-[#1a2e1a]">
        <span className="text-neon-green/20 text-xs font-mono">
          {pYear}
        </span>
        <div className="flex items-center gap-3">
          {pGithub && (
            <a
              href={pGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neon-green/33 hover:text-neon-green font-mono transition-all duration-200 hover:underline"
            >
              [github]
            </a>
          )}
          {pDemo && (
            <a
              href={pDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neon-green/33 hover:text-neon-green font-mono transition-all duration-200 hover:underline"
            >
              [demo]
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
`,
  SkillsSection: `'use client';

const SKILLS = [
  {
    title: 'Penetration Testing',
    skills: ['Burp Suite', 'Metasploit', 'Nmap', 'SQLmap', 'Nikto'],
    icon: '⚔',
  },
  {
    title: 'Web Security',
    skills: ['OWASP Top 10', 'XSS', 'SQLi', 'SSRF', 'IDOR'],
    icon: '🌐',
  },
  {
    title: 'Reverse Engineering',
    skills: ['Ghidra', 'IDA Pro', 'x64dbg', 'pwndbg', 'GDB'],
    icon: '⚙',
  },
  {
    title: 'CTF & Forensics',
    skills: [
      'HackTheBox',
      'TryHackMe',
      'Volatility',
      'Wireshark',
      'Steganography',
    ],
    icon: '🏴',
  },
  {
    title: 'Development',
    skills: ['Python', 'TypeScript', 'Next.js', 'React', 'Node.js'],
    icon: '</>',
  },
  {
    title: 'Infrastructure',
    skills: ['Docker', 'Linux', 'Bash', 'Git', 'VPN / Tunneling'],
    icon: '🔧',
  },
];

interface SkillsSectionProps {
  skills?: Array<{ title: string; skills: string[]; icon?: string }>;
  title?: string;
  commandPrefix?: string;
}

export default function SkillsSection({
  skills = SKILLS,
  title = 'Skill Set',
  commandPrefix = '\$ cat skills.txt',
}: SkillsSectionProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 border-t border-[#1a2e1a]">
      <p className="text-neon-green/27 text-xs font-mono mb-1">
        {commandPrefix}
      </p>
      <h2 className="text-xl font-bold text-neon-green font-mono mb-8">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(({ title: skillTitle, skills: subSkills, icon }, i) => (
          <div
            key={skillTitle}
            className="border border-[#1a2e1a] bg-[#0d0d0d] rounded-lg p-5 hover:border-neon-green/20 hover:bg-[#0f0f0f] group animate-fade-in-up"
            style={{ animationDelay: \`\${i * 80}ms\` }}
          >
            <div className="flex items-center gap-2 mb-4">
              {icon && <span className="text-base">{icon}</span>}
              <h3 className="text-neon-green text-sm font-bold font-mono">
                {skillTitle}
              </h3>
            </div>
            <ul className="space-y-2">
              {subSkills.map((skill, j) => (
                <li key={skill} className="flex items-center gap-2 group/skill">
                  <span className="text-neon-green/20 text-xs group-hover:text-neon-green/40 transition-colors duration-200">
                    ›
                  </span>
                  <span className="text-xs text-neon-green/40 font-mono group-hover:text-neon-green/53 transition-colors duration-200 flex-1">
                    {skill}
                  </span>
                  <span
                    className="h-px bg-neon-green/13 rounded"
                    style={{ width: \`\${30 + j * 12}%\` }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
  CyberButton: `'use client';

import React, { useState } from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  isCutCorner?: boolean;
  glitchOnHover?: boolean;
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-neon-green/20 hover:border-neon-green',
    text: 'text-neon-green',
    bg: 'hover:bg-neon-green/5',
    shadow: 'hover:shadow-[0_0_15px_rgba(0,255,159,0.35)]',
    accent: 'bg-neon-green',
  },
  cyan: {
    border: 'border-[#00f0ff33] hover:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    bg: 'hover:bg-[#00f0ff0d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(0,240,255,0.35)]',
    accent: 'bg-[#00f0ff]',
  },
  red: {
    border: 'border-[#ff5f5733] hover:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    bg: 'hover:bg-[#ff5f570d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(255,95,87,0.35)]',
    accent: 'bg-[#ff5f57]',
  },
  amber: {
    border: 'border-[#febc2e33] hover:border-[#febc2e]',
    text: 'text-[#febc2e]',
    bg: 'hover:bg-[#febc2e0d]',
    shadow: 'hover:shadow-[0_0_15px_rgba(254,188,46,0.35)]',
    accent: 'bg-[#febc2e]',
  },
};

const SIZE_MAP = {
  sm: 'px-3 py-1.5 text-xs font-mono',
  md: 'px-5 py-2.5 text-sm font-mono',
  lg: 'px-8 py-3 text-base font-mono',
};

export default function CyberButton({
  children,
  variant = 'green',
  size = 'md',
  isCutCorner = false,
  glitchOnHover = true,
  glow = true,
  className = '',
  ...props
}: CyberButtonProps) {
  const [glitchText, setGlitchText] = useState<string | null>(null);
  const colors = COLOR_MAP[variant];

  // Glitch effect on hover
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (glitchOnHover && typeof children === 'string') {
      const original = children;
      let iterations = 0;
      const chars = '01XYZ_\$#!?';
      const interval = setInterval(() => {
        setGlitchText(
          original
            .split('')
            .map((char, index) => {
              if (index < iterations) return original[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        iterations += 1 / 3;
        if (iterations >= original.length) {
          clearInterval(interval);
          setGlitchText(null);
        }
      }, 30);
    }
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const buttonStyle: React.CSSProperties = isCutCorner
    ? {
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
      }
    : {};

  return (
    <button
      {...props}
      onMouseEnter={handleMouseEnter}
      style={buttonStyle}
      className={\`
        relative inline-flex items-center justify-center font-bold uppercase tracking-wider
        border rounded bg-black/40 backdrop-blur-sm
        transition-all duration-300 active:scale-95 cursor-pointer select-none
        \${colors.border} \${colors.text} \${colors.bg} \${size.startsWith('px') ? size : SIZE_MAP[size]}
        \${glow ? colors.shadow : ''}
        \${className}
      \`}
    >
      {/* Corner indicators for cyber design */}
      {isCutCorner && (
        <span className={\`absolute bottom-0 right-[7px] w-px h-[10px] rotate-[45deg] origin-bottom-right \${colors.accent} opacity-50\`} />
      )}

      {/* Decorative inner scanning line */}
      <span className="absolute inset-0 w-full h-[1px] bg-white/5 group-hover:animate-scanline pointer-events-none" />

      {/* Main text content */}
      <span className="relative z-10 font-mono">
        {glitchText !== null ? glitchText : children}
      </span>
    </button>
  );
}
`,
  CyberInput: `'use client';

import React, { useState } from 'react';

interface CyberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  prompt?: string;
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a] focus-within:border-neon-green',
    text: 'text-neon-green',
    prompt: 'text-neon-green/53',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,255,159,0.2)]',
    bg: 'bg-black/40',
  },
  cyan: {
    border: 'border-[#0a232e] focus-within:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    prompt: 'text-[#00f0ff88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    bg: 'bg-black/40',
  },
  red: {
    border: 'border-[#2d1212] focus-within:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    prompt: 'text-[#ff5f5788]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(255,95,87,0.2)]',
    bg: 'bg-black/40',
  },
  amber: {
    border: 'border-[#2e230a] focus-within:border-[#febc2e]',
    text: 'text-[#febc2e]',
    prompt: 'text-[#febc2e88]',
    shadow: 'focus-within:shadow-[0_0_15px_rgba(254,188,46,0.2)]',
    bg: 'bg-black/40',
  },
};

export default function CyberInput({
  variant = 'green',
  prompt = '\$',
  glow = true,
  className = '',
  ...props
}: CyberInputProps) {
  const [focused, setFocused] = useState(false);
  const colors = COLOR_MAP[variant];

  return (
    <div
      className={\`
        flex items-center border rounded-lg overflow-hidden px-3 py-2.5 font-mono text-sm
        transition-all duration-300 backdrop-blur-sm
        \${colors.border} \${colors.bg} \${glow ? colors.shadow : ''}
        \${className}
      \`}
    >
      {/* Prompt prefix */}
      {prompt && (
        <span className={\`mr-2 font-mono select-none \${colors.prompt}\`}>
          {prompt}
        </span>
      )}

      {/* Input */}
      <input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (props.onBlur) props.onBlur(e);
        }}
        className={\`
          flex-1 bg-transparent border-none outline-none font-mono font-bold
          placeholder-neon-green/20
          \${colors.text}
        \`}
      />

      {/* Blinking cursor at the end (active only when focused) */}
      {focused && (
        <span className={\`animate-blink text-xs ml-1 \${colors.text}\`}>
          █
        </span>
      )}
    </div>
  );
}
`,
  CyberPanel: `'use client';

import React from 'react';

interface CyberPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  status?: string;
  showControls?: boolean;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  glow?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-neon-green/10 hover:border-neon-green/30',
    barBorder: 'border-b-neon-green/5',
    title: 'text-neon-green/60',
    bullet: 'bg-neon-green',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,255,159,0.08)]',
    dotColor: 'var(--neon-green)',
  },
  cyan: {
    border: 'border-[#00f0ff1a] hover:border-[#00f0ff4d]',
    barBorder: 'border-b-[#00f0ff0d]',
    title: 'text-[#00f0ff99]',
    bullet: 'bg-[#00f0ff]',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]',
    dotColor: '#00f0ff',
  },
  red: {
    border: 'border-[#ff5f571a] hover:border-[#ff5f574d]',
    barBorder: 'border-b-[#ff5f570d]',
    title: 'text-[#ff5f5799]',
    bullet: 'bg-[#ff5f57]',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,95,87,0.08)]',
    dotColor: '#ff5f57',
  },
  amber: {
    border: 'border-[#febc2e1a] hover:border-[#febc2e4d]',
    barBorder: 'border-b-[#febc2e0d]',
    title: 'text-[#febc2e99]',
    bullet: 'bg-[#febc2e]',
    shadow: 'hover:shadow-[0_0_20px_rgba(254,188,46,0.08)]',
    dotColor: '#febc2e',
  },
};

export default function CyberPanel({
  children,
  title = 'TERMINAL',
  status,
  showControls = true,
  variant = 'green',
  glow = true,
  className = '',
  ...props
}: CyberPanelProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div
      {...props}
      className={\`
        flex flex-col rounded-lg overflow-hidden bg-black/90 border backdrop-blur-md
        transition-all duration-300 h-full min-h-[140px]
        \${colors.border} \${glow ? colors.shadow : ''}
        \${className}
      \`}
    >
      {/* Title Bar */}
      <div
        className={\`
          flex items-center gap-2 px-3 py-2 bg-neutral-900/90 border-b font-mono text-[10px] select-none
          \${colors.barBorder}
        \`}
      >
        {/* Terminal Dot Controls */}
        {showControls ? (
          <div className="flex gap-1.5 mr-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57] opacity-80 shadow-[0_0_4px_#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e] opacity-80 shadow-[0_0_4px_#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840] opacity-80 shadow-[0_0_4px_#28c840]" />
          </div>
        ) : (
          <span className="text-xs" style={{ color: colors.dotColor }}>
            ⬡
          </span>
        )}

        {/* Panel Title */}
        <span className={\`font-semibold uppercase tracking-wider \${colors.title}\`}>
          {title}
        </span>

        {/* Status indicator (right aligned) */}
        {status && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className={\`w-1.5 h-1.5 rounded-full animate-pulse \${colors.bullet}\`} />
            <span className="opacity-60 uppercase font-mono tracking-tight text-[9px]" style={{ color: colors.dotColor }}>
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed text-neon-green/80">
        {children}
      </div>
    </div>
  );
}
`,
  CyberBadge: `'use client';

import React from 'react';

interface CyberBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  brackets?: boolean;
}

const COLOR_MAP = {
  green: {
    border: 'border-neon-green/20',
    bg: 'bg-neon-green/4',
    text: 'text-neon-green',
    brackets: 'text-neon-green/33',
  },
  cyan: {
    border: 'border-[#00f0ff33]',
    bg: 'bg-[#00f0ff0a]',
    text: 'text-[#00f0ff]',
    brackets: 'text-[#00f0ff55]',
  },
  red: {
    border: 'border-[#ff5f5733]',
    bg: 'bg-[#ff5f570a]',
    text: 'text-[#ff5f57]',
    brackets: 'text-[#ff5f5755]',
  },
  amber: {
    border: 'border-[#febc2e33]',
    bg: 'bg-[#febc2e0a]',
    text: 'text-[#febc2e]',
    brackets: 'text-[#febc2e55]',
  },
};

export default function CyberBadge({
  children,
  variant = 'green',
  brackets = true,
  className = '',
  ...props
}: CyberBadgeProps) {
  const colors = COLOR_MAP[variant];

  return (
    <span
      {...props}
      className={\`
        inline-flex items-center gap-1 px-2.5 py-0.5 rounded border text-[10px] font-mono font-semibold tracking-wide uppercase select-none
        \${colors.border} \${colors.bg} \${colors.text}
        \${className}
      \`}
    >
      {brackets && <span className={\`font-mono mr-0.5 \${colors.brackets}\`}>[</span>}
      {children}
      {brackets && <span className={\`font-mono ml-0.5 \${colors.brackets}\`}>]</span>}
    </span>
  );
}
`,
  GlitchText: `'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  trigger?: 'hover' | 'always';
  intervalSpeed?: number;
  glow?: boolean;
}

const scrambleChars = '01#\$&%XØZ?';

export default function GlitchText({
  text,
  trigger = 'hover',
  intervalSpeed = 3000,
  glow = true,
  className = '',
  ...props
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);
    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return text[index];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );
      
      iterations += 1 / 2;
      
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 40);
  }, [isGlitching, text]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (trigger === 'always') {
      const runAlways = () => {
        scramble();
        timerRef.current = setTimeout(runAlways, intervalSpeed + Math.random() * 2000);
      };
      timerRef.current = setTimeout(runAlways, 1000);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [trigger, intervalSpeed, scramble]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scramble();
    }
  };

  return (
    <span
      {...props}
      onMouseEnter={handleMouseEnter}
      className={\`
        relative inline-block font-mono tracking-wide select-none
        \${isGlitching ? 'text-white' : ''}
        \${glow ? 'hover:text-shadow-glow' : ''}
        transition-colors duration-200
        \${className}
      \`}
      style={{
        textShadow: glow && !isGlitching ? '0 0 10px rgba(0, 255, 159, 0.4)' : undefined,
      }}
    >
      {/* Glitch layered effect for RGB Split simulation */}
      {isGlitching && (
        <>
          <span className="absolute left-[2px] top-0 text-[#ff5f57] opacity-75 animate-pulse pointer-events-none select-none">
            {displayText}
          </span>
          <span className="absolute left-[-2px] top-[1px] text-[#00f0ff] opacity-75 animate-pulse pointer-events-none select-none">
            {displayText}
          </span>
        </>
      )}
      <span>{displayText}</span>
    </span>
  );
}
`,
  CyberStatusLine: `'use client';

import React from 'react';

interface CyberStatusLineProps {
  status?: string;
  detail?: string;
  count?: number | string;
  address?: string;
  stateColor?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const COLOR_MAP = {
  green: 'bg-[#28c840]',
  cyan: 'bg-[#00f0ff]',
  red: 'bg-[#ff5f57]',
  amber: 'bg-[#febc2e]',
};

export default function CyberStatusLine({
  status = 'scan complete',
  detail = 'entries indexed',
  count,
  address = '192.168.1.42:~/projects',
  stateColor = 'green',
  className = '',
}: CyberStatusLineProps) {
  const dotColor = COLOR_MAP[stateColor] || 'bg-[#28c840]';

  return (
    <div
      className={\`
        flex items-center gap-2 font-mono text-xs text-neon-green/27 w-full select-none
        \${className}
      \`}
    >
      {/* Blinking State Dot */}
      <span className={\`w-1.5 h-1.5 rounded-full \${dotColor} animate-pulse\`} />

      {/* Main Status Text */}
      <span>
        {status} &mdash;{' '}
        {count !== undefined && (
          <span className="text-neon-green/40 font-bold mr-1">{count}</span>
        )}
        <span>{detail}</span>
      </span>

      {/* Right Aligned Host Address */}
      {address && (
        <span className="ml-auto text-neon-green/13 font-mono hover:text-neon-green/27 transition-colors duration-200">
          {address}
        </span>
      )}
    </div>
  );
}
`,
  CyberActionCard: `'use client';

import React from 'react';

interface CyberActionCardProps {
  label: string;
  value: string;
  href?: string;
  command?: string;
  description?: string;
  icon?: string | React.ReactNode;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  target?: string;
  onClick?: () => void;
  className?: string;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a] hover:border-neon-green/27 hover:bg-neon-green/2',
    text: 'text-neon-green',
    subText: 'text-neon-green/47',
    dimText: 'text-neon-green/20',
    accentText: 'text-neon-green/40 group-hover/link:text-neon-green',
    commandText: 'text-neon-green/33',
  },
  cyan: {
    border: 'border-[#0a232e] hover:border-[#00f0ff44] hover:bg-[#00f0ff05]',
    text: 'text-[#00f0ff]',
    subText: 'text-[#00f0ff77]',
    dimText: 'text-[#00f0ff33]',
    accentText: 'text-[#00f0ff66] group-hover/link:text-[#00f0ff]',
    commandText: 'text-[#00f0ff55]',
  },
  red: {
    border: 'border-[#2d1212] hover:border-[#ff5f5744] hover:bg-[#ff5f5705]',
    text: 'text-[#ff5f57]',
    subText: 'text-[#ff5f5777]',
    dimText: 'text-[#ff5f5733]',
    accentText: 'text-[#ff5f5766] group-hover/link:text-[#ff5f57]',
    commandText: 'text-[#ff5f5755]',
  },
  amber: {
    border: 'border-[#2e230a] hover:border-[#febc2e44] hover:bg-[#febc2e05]',
    text: 'text-[#febc2e]',
    subText: 'text-[#febc2e77]',
    dimText: 'text-[#febc2e33]',
    accentText: 'text-[#febc2e66] group-hover/link:text-[#febc2e]',
    commandText: 'text-[#febc2e55]',
  },
};

export default function CyberActionCard({
  label,
  value,
  href,
  command,
  description,
  icon = '[◈]',
  variant = 'green',
  target,
  onClick,
  className = '',
}: CyberActionCardProps) {
  const colors = COLOR_MAP[variant];

  const cardClass = \`flex items-start gap-4 p-4 border rounded transition-all duration-300 group/link cursor-pointer \${colors.border} \${className}\`;

  const renderContent = () => (
    <>
      {/* Left Side: Icon */}
      <span className={\`font-mono text-sm shrink-0 transition-colors \${colors.accentText}\`}>
        {icon}
      </span>

      {/* Center: Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className={\`text-sm font-bold font-mono group-hover/link:text-shadow-glow transition-all \${colors.text}\`}>
            {label}
          </span>
          {description && (
            <span className={\`text-xs font-mono \${colors.dimText}\`}>
              {description}
            </span>
          )}
        </div>
        <span className={\`text-xs font-mono truncate block transition-colors \${colors.subText}\`}>
          {value}
        </span>
      </div>

      {/* Right Side: Arrow Indicator */}
      <span className={\`text-sm transition-colors shrink-0 \${colors.dimText} group-hover/link:\${colors.text}\`}>
        →
      </span>
    </>
  );

  return (
    <div className="w-full">
      {/* Command prompt above card */}
      {command && (
        <p className={\`text-xs font-mono mb-2 select-none \${colors.commandText}\`}>
          {command}
        </p>
      )}

      {/* Interactive Link Card */}
      {href ? (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={cardClass}
        >
          {renderContent()}
        </a>
      ) : (
        <div onClick={onClick} className={cardClass}>
          {renderContent()}
        </div>
      )}
    </div>
  );
}
`,
  CyberConsoleBox: `'use client';

import React from 'react';

interface CyberConsoleBoxProps {
  command?: string;
  content: string | string[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    border: 'border-[#1a2e1a]',
    command: 'text-neon-green/33',
    text: 'text-neon-green/27',
    shadow: 'shadow-[0_0_25px_rgba(0,255,159,0.02)]',
    bg: 'bg-[#0d0d0dcc]',
  },
  cyan: {
    border: 'border-[#0a232e]',
    command: 'text-[#00f0ff55]',
    text: 'text-[#00f0ff44]',
    shadow: 'shadow-[0_0_25px_rgba(0,240,255,0.02)]',
    bg: 'bg-[#0d0d0dcc]',
  },
  red: {
    border: 'border-[#2d1212]',
    command: 'text-[#ff5f5755]',
    text: 'text-[#ff5f5744]',
    shadow: 'shadow-[0_0_25px_rgba(255,95,87,0.02)]',
    bg: 'bg-[#0d0d0dcc]',
  },
  amber: {
    border: 'border-[#2e230a]',
    command: 'text-[#febc2e55]',
    text: 'text-[#febc2e44]',
    shadow: 'shadow-[0_0_25px_rgba(254,188,46,0.02)]',
    bg: 'bg-[#0d0d0dcc]',
  },
};

export default function CyberConsoleBox({
  command,
  content,
  variant = 'green',
  glow = true,
  className = '',
}: CyberConsoleBoxProps) {
  const colors = COLOR_MAP[variant];
  const rows = Array.isArray(content) ? content : content.split('\\n');

  return (
    <div className={\`w-full \${className}\`}>
      {/* Command prompt label */}
      {command && (
        <p className={\`text-xs font-mono mb-3 select-none \${colors.command}\`}>
          {command}
        </p>
      )}

      {/* Code Console container */}
      <div
        className={\`
          border rounded-lg p-5 font-mono text-xs leading-relaxed overflow-x-auto
          \${colors.border} \${colors.bg} \${glow ? colors.shadow : ''}
        \`}
      >
        {rows.map((row, i) => (
          <p key={i} className={colors.text}>
            {row}
          </p>
        ))}
      </div>
    </div>
  );
}
`,
  CyberTabs: `'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
  count?: number | string;
}

interface CyberTabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onChange: (id: string) => void;
  labelPrefix?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const COLOR_MAP = {
  green: {
    active: 'border-neon-green text-neon-green bg-neon-green/7 shadow-[0_0_10px_color-mix(in srgb, var(--neon-green) 13%, transparent)]',
    inactive: 'border-[#1a2e1a] text-neon-green/33 hover:border-neon-green/27 hover:text-neon-green/53',
    count: 'text-neon-green/33',
    prefix: 'text-neon-green/27',
    container: 'border-[#1a2e1a] bg-[#0d0d0dcc]',
  },
  cyan: {
    active: 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff11] shadow-[0_0_10px_#00f0ff22]',
    inactive: 'border-[#0a232e] text-[#00f0ff55] hover:border-[#00f0ff44] hover:text-[#00f0ff88]',
    count: 'text-[#00f0ff55]',
    prefix: 'text-[#00f0ff44]',
    container: 'border-[#0a232e] bg-[#0d0d0dcc]',
  },
  red: {
    active: 'border-[#ff5f57] text-[#ff5f57] bg-[#ff5f5711] shadow-[0_0_10px_#ff5f5722]',
    inactive: 'border-[#2d1212] text-[#ff5f5755] hover:border-[#ff5f5744] hover:text-[#ff5f5788]',
    count: 'text-[#ff5f5755]',
    prefix: 'text-[#ff5f5744]',
    container: 'border-[#2d1212] bg-[#0d0d0dcc]',
  },
  amber: {
    active: 'border-[#febc2e] text-[#febc2e] bg-[#febc2e11] shadow-[0_0_10px_#febc2e22]',
    inactive: 'border-[#2e230a] text-[#febc2e55] hover:border-[#febc2e44] hover:text-[#febc2e88]',
    count: 'text-[#febc2e55]',
    prefix: 'text-[#febc2e44]',
    container: 'border-[#2e230a] bg-[#0d0d0dcc]',
  },
};

export default function CyberTabs({
  tabs,
  activeTabId,
  onChange,
  labelPrefix = 'filter:',
  variant = 'green',
  className = '',
}: CyberTabsProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div
      className={\`
        flex flex-wrap gap-2 p-3 border rounded-lg backdrop-blur-sm select-none
        \${colors.container} \${className}
      \`}
    >
      {/* Prefix */}
      {labelPrefix && (
        <span className={\`text-xs font-mono self-center mr-1 \${colors.prefix}\`}>
          {labelPrefix}
        </span>
      )}

      {/* Tab Buttons */}
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={\`
              text-xs font-mono px-3 py-1.5 rounded border transition-all duration-200 cursor-pointer
              \${isActive ? colors.active : colors.inactive}
            \`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={\`ml-1.5 font-bold \${colors.count}\`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
`,
  CyberSwitch: `'use client';

import React from 'react';

interface CyberSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    trackActive: 'bg-neon-green/20 border-neon-green',
    thumbActive: 'bg-neon-green shadow-[0_0_8px_var(--neon-green)]',
    text: 'text-neon-green',
    trackInactive: 'bg-black border-[#1a2e1a]',
    thumbInactive: 'bg-[#1a2e1a]',
  },
  cyan: {
    trackActive: 'bg-[#00f0ff33] border-[#00f0ff]',
    thumbActive: 'bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]',
    text: 'text-[#00f0ff]',
    trackInactive: 'bg-black border-[#0a232e]',
    thumbInactive: 'bg-[#0a232e]',
  },
  red: {
    trackActive: 'bg-[#ff5f5733] border-[#ff5f57]',
    thumbActive: 'bg-[#ff5f57] shadow-[0_0_8px_#ff5f57]',
    text: 'text-[#ff5f57]',
    trackInactive: 'bg-black border-[#2d1212]',
    thumbInactive: 'bg-[#2d1212]',
  },
  amber: {
    trackActive: 'bg-[#febc2e33] border-[#febc2e]',
    thumbActive: 'bg-[#febc2e] shadow-[0_0_8px_#febc2e]',
    text: 'text-[#febc2e]',
    trackInactive: 'bg-black border-[#2e230a]',
    thumbInactive: 'bg-[#2e230a]',
  },
};

export default function CyberSwitch({
  checked,
  onChange,
  label,
  variant = 'green',
  disabled = false,
  className = '',
}: CyberSwitchProps) {
  const colors = COLOR_MAP[variant];

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={\`
        inline-flex items-center gap-3 cursor-pointer select-none font-mono text-xs
        \${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        \${className}
      \`}
    >
      {/* Switch Track */}
      <div
        className={\`
          w-10 h-5 rounded-full border transition-all duration-300 relative flex items-center px-0.5
          \${checked ? colors.trackActive : colors.trackInactive}
        \`}
      >
        {/* Switch Thumb */}
        <div
          className={\`
            w-3.5 h-3.5 rounded-full transition-all duration-300 transform
            \${checked ? 'translate-x-5' : 'translate-x-0'}
            \${checked ? colors.thumbActive : colors.thumbInactive}
          \`}
        />
      </div>

      {/* Label */}
      {label && (
        <span className={\`font-semibold tracking-wider \${checked ? colors.text : 'text-neutral-500'}\`}>
          {label}
        </span>
      )}
    </div>
  );
}
`,
  CyberCheckbox: `'use client';

import React from 'react';

interface CyberCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    borderActive: 'border-neon-green',
    bgActive: 'bg-neon-green/10',
    text: 'text-neon-green',
    glow: 'shadow-[0_0_8px_rgba(0,255,159,0.4)]',
    borderInactive: 'border-[#1a2e1a] hover:border-neon-green/20',
  },
  cyan: {
    borderActive: 'border-[#00f0ff]',
    bgActive: 'bg-[#00f0ff1a]',
    text: 'text-[#00f0ff]',
    glow: 'shadow-[0_0_8px_rgba(0,240,255,0.4)]',
    borderInactive: 'border-[#0a232e] hover:border-[#00f0ff33]',
  },
  red: {
    borderActive: 'border-[#ff5f57]',
    bgActive: 'bg-[#ff5f571a]',
    text: 'text-[#ff5f57]',
    glow: 'shadow-[0_0_8px_rgba(255,95,87,0.4)]',
    borderInactive: 'border-[#2d1212] hover:border-[#ff5f5733]',
  },
  amber: {
    borderActive: 'border-[#febc2e]',
    bgActive: 'bg-[#febc2e1a]',
    text: 'text-[#febc2e]',
    glow: 'shadow-[0_0_8px_rgba(254,188,46,0.4)]',
    borderInactive: 'border-[#2e230a] hover:border-[#febc2e33]',
  },
};

export default function CyberCheckbox({
  checked,
  onChange,
  label,
  variant = 'green',
  disabled = false,
  className = '',
}: CyberCheckboxProps) {
  const colors = COLOR_MAP[variant];

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={\`
        inline-flex items-center gap-2.5 cursor-pointer select-none font-mono text-xs
        \${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        \${className}
      \`}
    >
      {/* Checkbox Box */}
      <div
        className={\`
          w-4 h-4 border flex items-center justify-center transition-all duration-200 shrink-0
          \${checked ? \`\${colors.borderActive} \${colors.bgActive} \${colors.glow}\` : colors.borderInactive}
          bg-black/40 rounded-sm
        \`}
      >
        {/* Checkmark indicator - rendering a small cyberpunk diamond/bullet */}
        {checked && (
          <div className={\`w-1.5 h-1.5 rotate-[45deg] bg-current \${colors.text}\`} />
        )}
      </div>

      {/* Label */}
      {label && (
        <span className={\`font-mono text-xs \${checked ? colors.text : 'text-neutral-500'}\`}>
          {label}
        </span>
      )}
    </div>
  );
}
`,
  CyberDialog: `'use client';

import React, { useEffect } from 'react';
import CyberButton from './CyberButton';

interface CyberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const COLOR_MAP = {
  green: {
    border: 'border-neon-green/20 focus:border-neon-green',
    text: 'text-neon-green',
    shadow: 'shadow-[0_0_30px_rgba(0,255,159,0.15)]',
    accentText: 'text-neon-green/40',
    headerBg: 'bg-neon-green/5',
    accentBorder: 'border-neon-green/13',
  },
  cyan: {
    border: 'border-[#00f0ff33] focus:border-[#00f0ff]',
    text: 'text-[#00f0ff]',
    shadow: 'shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    accentText: 'text-[#00f0ff66]',
    headerBg: 'bg-[#00f0ff0d]',
    accentBorder: 'border-[#00f0ff22]',
  },
  red: {
    border: 'border-[#ff5f5733] focus:border-[#ff5f57]',
    text: 'text-[#ff5f57]',
    shadow: 'shadow-[0_0_30px_rgba(255,95,87,0.15)]',
    accentText: 'text-[#ff5f5766]',
    headerBg: 'bg-[#ff5f570d]',
    accentBorder: 'border-[#ff5f5722]',
  },
  amber: {
    border: 'border-[#febc2e33] focus:border-[#febc2e]',
    text: 'text-[#febc2e]',
    shadow: 'shadow-[0_0_30px_rgba(254,188,46,0.15)]',
    accentText: 'text-[#febc2e66]',
    headerBg: 'bg-[#febc2e0d]',
    accentBorder: 'border-[#febc2e22]',
  },
};

export default function CyberDialog({
  isOpen,
  onClose,
  title = 'ALERT',
  variant = 'green',
  children,
  actions,
  className = '',
}: CyberDialogProps) {
  const colors = COLOR_MAP[variant];

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred dark backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Cyber Dialog Box */}
      <div
        className={\`
          relative w-full max-w-md bg-[#0a0a0a] border overflow-hidden rounded-lg z-10 flex flex-col
          animate-fade-in-up duration-300
          \${colors.border} \${colors.shadow} \${className}
        \`}
      >
        {/* Dynamic sweeping scanline line inside dialog */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scanline-sweep" />
        </div>

        {/* Dialog Header */}
        <div
          className={\`
            flex items-center justify-between px-4 py-3 border-b font-mono text-xs
            \${colors.accentBorder} \${colors.headerBg}
          \`}
        >
          <div className="flex items-center gap-2">
            <span className={colors.text}>⬡</span>
            <span className={\`font-bold tracking-widest uppercase \${colors.text}\`}>
              {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className={\`
              hover:text-white transition-colors duration-200 cursor-pointer font-mono text-sm px-1.5 rounded
              \${colors.accentText}
            \`}
          >
            [X]
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-6 font-mono text-xs leading-relaxed text-neon-green/80 overflow-y-auto">
          {children}
        </div>

        {/* Dialog Footer Actions */}
        <div
          className={\`
            flex justify-end gap-3 px-4 py-3 border-t bg-neutral-900/40
            \${colors.accentBorder}
          \`}
        >
          {actions || (
            <CyberButton variant={variant} size="sm" onClick={onClose}>
              Acknowledge
            </CyberButton>
          )}
        </div>
      </div>
    </div>
  );
}
`,
  CyberProgress: `'use client';

import React from 'react';

interface CyberProgressProps {
  value: number; // 0 to 100
  showText?: boolean;
  label?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  type?: 'block' | 'line';
  className?: string;
}

const COLOR_MAP = {
  green: {
    bar: 'bg-neon-green',
    glow: 'shadow-[0_0_8px_var(--neon-green)]',
    text: 'text-neon-green',
    blockChar: '■',
    emptyChar: '□',
  },
  cyan: {
    bar: 'bg-[#00f0ff]',
    glow: 'shadow-[0_0_8px_#00f0ff]',
    text: 'text-[#00f0ff]',
    blockChar: '■',
    emptyChar: '□',
  },
  red: {
    bar: 'bg-[#ff5f57]',
    glow: 'shadow-[0_0_8px_#ff5f57]',
    text: 'text-[#ff5f57]',
    blockChar: '■',
    emptyChar: '□',
  },
  amber: {
    bar: 'bg-[#febc2e]',
    glow: 'shadow-[0_0_8px_#febc2e]',
    text: 'text-[#febc2e]',
    blockChar: '■',
    emptyChar: '□',
  },
};

export default function CyberProgress({
  value,
  showText = true,
  label = 'SYSTEM_LOAD',
  variant = 'green',
  type = 'block',
  className = '',
}: CyberProgressProps) {
  const colors = COLOR_MAP[variant];
  const clampedValue = Math.max(0, Math.min(100, value));

  // Render block progress e.g. [■■■■■■□□□□]
  const renderBlocks = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((clampedValue / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return (
      <span className="font-mono text-sm tracking-widest select-none">
        <span className={colors.text}>
          {colors.blockChar.repeat(filledBlocks)}
        </span>
        <span className="text-neutral-800">
          {colors.blockChar.repeat(emptyBlocks)}
        </span>
      </span>
    );
  };

  return (
    <div className={\`w-full font-mono text-xs \${className}\`}>
      {/* Top Labels */}
      {showText && (
        <div className="flex justify-between items-center mb-1 text-[10px] text-white/50 tracking-wider">
          <span>{label}</span>
          <span className={colors.text}>{Math.round(clampedValue)}%</span>
        </div>
      )}

      {/* Progress Bar Body */}
      {type === 'line' ? (
        <div className="h-2 rounded bg-neutral-900 border border-neutral-900 overflow-hidden">
          <div
            className={\`h-full transition-all duration-300 \${colors.bar} \${colors.glow}\`}
            style={{ width: \`\${clampedValue}%\` }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 border border-neutral-900 bg-black/45 p-1 rounded">
          <span className="text-white/20 select-none">[</span>
          <div className="flex-1 text-center">{renderBlocks()}</div>
          <span className="text-white/20 select-none">]</span>
        </div>
      )}
    </div>
  );
}
`,
  CyberAlert: `'use client';

import React from 'react';
import CyberBadge from './CyberBadge';
import CyberButton from './CyberButton';

interface CyberAlertProps {
  title?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  children: React.ReactNode;
  onAction?: () => void;
  actionText?: string;
  className?: string;
}

interface ColorScheme {
  border: string;
  text: string;
  bg: string;
  badge: 'green' | 'cyan' | 'red' | 'amber';
  flash?: string;
}

const COLOR_MAP: Record<'green' | 'cyan' | 'red' | 'amber', ColorScheme> = {
  green: {
    border: 'border-neon-green shadow-[0_0_15px_rgba(0,255,159,0.15)]',
    text: 'text-neon-green',
    bg: 'bg-neon-green/2',
    badge: 'green',
  },
  cyan: {
    border: 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.15)]',
    text: 'text-[#00f0ff]',
    bg: 'bg-[#00f0ff05]',
    badge: 'cyan',
  },
  red: {
    border: 'border-[#ff5f57] shadow-[0_0_15px_rgba(255,95,87,0.15)]',
    text: 'text-[#ff5f57]',
    bg: 'bg-[#ff5f5705]',
    badge: 'red',
    flash: 'animate-pulse duration-1000',
  },
  amber: {
    border: 'border-[#febc2e] shadow-[0_0_15px_rgba(254,188,46,0.15)]',
    text: 'text-[#febc2e]',
    bg: 'bg-[#febc2e05]',
    badge: 'amber',
  },
};

export default function CyberAlert({
  title = 'SECURITY ALERT',
  variant = 'red',
  children,
  onAction,
  actionText = 'Acknowledge',
  className = '',
}: CyberAlertProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div
      className={\`
        border rounded-lg p-4 bg-black/90 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono select-none relative overflow-hidden
        \${colors.border} \${colors.bg} \${colors.flash || ''} \${className}
      \`}
    >
      {/* Decorative scanner line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline-sweep" />
      </div>

      {/* Info Body */}
      <div className="flex items-start gap-3 relative z-10">
        <div className="flex flex-col gap-2">
          {/* Status Alert Badge + Title */}
          <div className="flex items-center gap-2">
            <CyberBadge variant={colors.badge} brackets={true}>
              {variant === 'red' ? 'CRIT' : variant === 'amber' ? 'WARN' : 'INFO'}
            </CyberBadge>
            <span className={\`text-xs font-bold uppercase tracking-wider \${colors.text}\`}>
              {title}
            </span>
          </div>

          {/* Description */}
          <div className="text-xs text-neon-green/80 max-w-lg leading-relaxed">
            {children}
          </div>
        </div>
      </div>

      {/* Action button */}
      {onAction && (
        <div className="relative z-10 self-end md:self-center shrink-0">
          <CyberButton variant={variant} size="sm" onClick={onAction}>
            {actionText}
          </CyberButton>
        </div>
      )}
    </div>
  );
}
`,
  CyberLoginForm: `'use client';

import React, { useState } from 'react';
import CyberButton from './CyberButton';
import CyberInput from './CyberInput';
import CyberAlert from './CyberAlert';
import CyberProgress from './CyberProgress';

interface CyberLoginFormProps {
  onSuccess?: (username: string) => void;
  className?: string;
}

export default function CyberLoginForm({ onSuccess, className = '' }: CyberLoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('FIELDS ERROR: ACCESS KEYS REQUIRE VALUES.');
      return;
      
    }

    setError(null);
    setLoading(true);
    setProgress(10);

    // Simulate mainframe decryption / auth check
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setSuccess(true);
          if (onSuccess) onSuccess(username);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 200);
  };

  return (
    <div
      className={\`
        border border-neon-green/13 bg-[#0a0a0aee] shadow-[0_0_40px_rgba(0,255,159,0.1)]
        rounded-lg max-w-sm w-full overflow-hidden flex flex-col font-mono relative
        \${className}
      \`}
    >
      {/* Scanning Line sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline-sweep" />
      </div>

      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/60 border-b border-neon-green/7">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] animate-pulse" />
          <span className="text-xs text-neon-green/53 font-bold tracking-widest uppercase">
            MAINFRAME_GATEWAY_v2.8
          </span>
        </div>
        <span className="text-[10px] text-white/30">[SSL_SECURE]</span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-5">
        <div className="text-center">
          <h2 className="text-lg font-bold text-white tracking-widest uppercase mb-1">
            ACCESS PROTOCOL
          </h2>
          <p className="text-[10px] text-neon-green/40">
            Enter terminal keys to authenticate socket connection.
          </p>
        </div>

        {error && (
          <CyberAlert title="AUTH FAILURE" variant="red" className="p-2 py-1 text-[10px]">
            {error}
          </CyberAlert>
        )}

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-neon-green text-3xl animate-bounce">✔</div>
            <div className="text-sm font-bold text-white uppercase tracking-widest">
              ACCESS GRANTED
            </div>
            <p className="text-[10px] text-neon-green/47">
              Welcome back, administrator. Redirecting to core mainframe...
            </p>
          </div>
        ) : loading ? (
          <div className="py-8 space-y-4">
            <CyberProgress value={progress} label="DECRYPTING KEYS" variant="green" />
            <p className="text-[9px] text-center text-neon-green/27 animate-pulse">
              establishing secure tunnel...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username Input */}
            <div className="space-y-1">
              <label className="block text-[10px] text-neon-green/40 uppercase">
                Operator Username
              </label>
              <CyberInput
                variant="green"
                prompt="USER_ID:"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="root"
                autoComplete="off"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="block text-[10px] text-neon-green/40 uppercase">
                Access Passcode
              </label>
              <CyberInput
                variant="green"
                prompt="KEY_HASH:"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <CyberButton
              type="submit"
              variant="green"
              size="md"
              isCutCorner={true}
              className="w-full mt-2"
            >
              INITIALIZE Access
            </CyberButton>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-[#0d1a0d] bg-[#070707] flex justify-between text-[8px] text-white/20 select-none">
        <span>GATEWAY_PORT: 443</span>
        <span>IP: 127.0.0.1</span>
      </div>
    </div>
  );
}
`,
  CyberSignupForm: `'use client';

import React, { useState } from 'react';
import CyberButton from './CyberButton';
import CyberInput from './CyberInput';
import CyberCheckbox from './CyberCheckbox';
import CyberAlert from './CyberAlert';
import CyberProgress from './CyberProgress';

interface SignupSuccessData {
  username: string;
  email: string;
  pgpKey: string;
}

interface CyberSignupFormProps {
  onSuccess?: (data: SignupSuccessData) => void;
  className?: string;
}

export default function CyberSignupForm({ onSuccess, className = '' }: CyberSignupFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [pgpKey, setPgpKey] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !passphrase) {
      setError('VALIDATION ERROR: COMPULSORY FIELDS MISSING.');
      return;
    }
    if (!termsAccepted) {
      setError('SECURITY COMPLIANCE: PROTOCOLS MUST BE ACKNOWLEDGED.');
      return;
    }

    setError(null);
    setLoading(true);
    setProgress(5);

    // Simulate PGP Key hashing and node generation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setSuccess(true);
          if (onSuccess) onSuccess({ username, email, pgpKey });
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 150);
  };

  return (
    <div
      className={\`
        border border-neon-green/13 bg-[#0a0a0aee] shadow-[0_0_40px_rgba(0,255,159,0.1)]
        rounded-lg max-w-sm w-full overflow-hidden flex flex-col font-mono relative
        \${className}
      \`}
    >
      {/* Laser line sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline-sweep" />
      </div>

      {/* Title Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/60 border-b border-neon-green/7">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs text-neon-green/53 font-bold tracking-widest uppercase">
            REGISTRATION_INTERFACE_v4
          </span>
        </div>
        <span className="text-[10px] text-white/30">[NO_LOGS]</span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-4">
        <div className="text-center">
          <h2 className="text-base font-bold text-white tracking-widest uppercase">
            GENERATE IDENTITY
          </h2>
          <p className="text-[9px] text-neon-green/40 mt-0.5">
            Spin up a new zero-knowledge profile on the decentralized node.
          </p>
        </div>

        {error && (
          <CyberAlert title="REGISTRATION FAILURE" variant="amber" className="p-2 py-1 text-[9px]">
            {error}
          </CyberAlert>
        )}

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-neon-green text-3xl animate-bounce">▣</div>
            <div className="text-xs font-bold text-white uppercase tracking-widest">
              IDENTITY GENERATED
            </div>
            <p className="text-[10px] text-neon-green/47">
              Node registration complete. Keypairs downloaded securely.
            </p>
          </div>
        ) : loading ? (
          <div className="py-8 space-y-4">
            <CyberProgress value={progress} label="GENERATING CRYPTO KEYPAIRS" variant="cyan" />
            <p className="text-[8px] text-center text-[#00f0ff55] animate-pulse">
              compiling lattice signatures...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Operator Handle */}
            <div className="space-y-1">
              <label className="block text-[9px] text-neon-green/40 uppercase">Operator Handle</label>
              <CyberInput
                variant="green"
                prompt="HANDLE:"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="neo_cyber"
                autoComplete="off"
              />
            </div>

            {/* Matrix Routing Email */}
            <div className="space-y-1">
              <label className="block text-[9px] text-neon-green/40 uppercase">Routing Address</label>
              <CyberInput
                variant="green"
                prompt="ROUTING:"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="neo@torproject.org"
                autoComplete="off"
              />
            </div>

            {/* Secret Passphrase */}
            <div className="space-y-1">
              <label className="block text-[9px] text-neon-green/40 uppercase">Passphrase Hash</label>
              <CyberInput
                variant="green"
                prompt="PASS_KEY:"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>

            {/* Optional PGP Key */}
            <div className="space-y-1">
              <label className="block text-[9px] text-neon-green/40 uppercase">PGP Public Key (Optional)</label>
              <CyberInput
                variant="green"
                prompt="PGP_KEY:"
                value={pgpKey}
                onChange={(e) => setPgpKey(e.target.value)}
                placeholder="ssh-rsa AAAAB3NzaC1yc2E..."
                autoComplete="off"
              />
            </div>

            {/* Terms checkbox */}
            <div className="mt-1">
              <CyberCheckbox
                checked={termsAccepted}
                onChange={(val) => setTermsAccepted(val)}
                label="I agree to operate under Darknet privacy protocols."
                variant="green"
              />
            </div>

            {/* Submit Button */}
            <CyberButton
              type="submit"
              variant="green"
              size="sm"
              isCutCorner={true}
              className="w-full mt-2"
            >
              REGISTER IDENTITY
            </CyberButton>
          </form>
        )}
      </div>
    </div>
  );
}
`,
  CyberSystemDashboard: `'use client';

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
      className={\`
        border border-neon-green/7 bg-black/85 rounded-lg p-5 font-mono flex flex-col gap-5 w-full max-w-2xl
        \${className}
      \`}
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
                <div key={index} className={\`border-b border-neutral-900/60 pb-1.5 \${logColor}\`}>
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
`,
  CyberDataForm: `'use client';

import React, { useState } from 'react';
import CyberPanel from './CyberPanel';
import CyberInput from './CyberInput';
import CyberSwitch from './CyberSwitch';
import CyberCheckbox from './CyberCheckbox';
import CyberTabs from './CyberTabs';
import CyberButton from './CyberButton';

export default function CyberDataForm({ className = '' }: { className?: string }) {
  const [profile, setProfile] = useState('prof1');
  const [port, setPort] = useState('8080');
  const [proxyUrl, setProxyUrl] = useState('127.0.0.1');

  const [overclock, setOverclock] = useState(true);
  const [stealth, setStealth] = useState(false);

  const [firewall, setFirewall] = useState(true);
  const [gzip, setGzip] = useState(false);
  const [debugLogs, setDebugLogs] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify({ profile, port, proxyUrl, overclock, stealth, firewall, gzip, debugLogs }, null, 2));
  };

  return (
    <div className={\`w-full max-w-md \${className}\`}>
      <form onSubmit={handleSubmit}>
        <CyberPanel title="PROFILES CONFIGURATION" status="config_mode" variant="cyan" showControls={true}>
          <div className="space-y-4">
            {/* Target Profile Selection */}
            <div>
              <CyberTabs
                tabs={[
                  { id: 'prof1', label: 'PROFILE_01' },
                  { id: 'prof2', label: 'PROFILE_02' },
                ]}
                activeTabId={profile}
                onChange={(id) => setProfile(id)}
                labelPrefix="target:"
                variant="cyan"
              />
            </div>

            {/* Inputs Group */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] text-[#00f0ff66]">PROXY HOST</label>
                <CyberInput
                  variant="cyan"
                  prompt="IP:"
                  value={proxyUrl}
                  onChange={(e) => setProxyUrl(e.target.value)}
                  placeholder="127.0.0.1"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] text-[#00f0ff66]">LISTENER PORT</label>
                <CyberInput
                  variant="cyan"
                  prompt="PORT:"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="8080"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="border-t border-[#00f0ff11] pt-3 flex flex-wrap gap-4 justify-between">
              <CyberSwitch
                checked={overclock}
                onChange={(val) => setOverclock(val)}
                label="CPU_OVERCLOCK"
                variant="cyan"
              />
              <CyberSwitch
                checked={stealth}
                onChange={(val) => setStealth(val)}
                label="STEALTH_ROUTING"
                variant="cyan"
              />
            </div>

            {/* Flag Checkboxes */}
            <div className="border-t border-[#00f0ff11] pt-3 flex flex-col gap-2">
              <CyberCheckbox
                checked={firewall}
                onChange={(val) => setFirewall(val)}
                label="Activate IDS firewall protection"
                variant="cyan"
              />
              <CyberCheckbox
                checked={gzip}
                onChange={(val) => setGzip(val)}
                label="Gzip payload packet compression"
                variant="cyan"
              />
              <CyberCheckbox
                checked={debugLogs}
                onChange={(val) => setDebugLogs(val)}
                label="Redirect stdout debug stream to syslog"
                variant="cyan"
              />
            </div>

            {/* Form Actions */}
            <div className="border-t border-[#00f0ff11] pt-4 flex justify-end gap-3">
              <CyberButton type="submit" variant="cyan" size="sm" isCutCorner={true}>
                COMMIT_DATA
              </CyberButton>
            </div>
          </div>
        </CyberPanel>
      </form>
    </div>
  );
}
`,
  InteractiveConsole: `'use client';

import React, { useState, useRef, useEffect } from 'react';
import CyberInput from './CyberInput';

interface ConsoleLine {
  text: string;
  type: 'cmd' | 'out' | 'err' | 'ok' | 'info';
  prompt?: string;
}

export default function InteractiveConsole({ className = '' }: { className?: string }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<ConsoleLine[]>([
    { text: 'system --initialize', type: 'cmd', prompt: 'root@kali:~#' },
    { text: 'Core subsystems initialized. Enter "help" to view options.', type: 'info' },
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    const newLines: ConsoleLine[] = [
      { text: inputVal, type: 'cmd', prompt: 'root@kali:~#' },
    ];

    switch (command) {
      case 'help':
        newLines.push(
          { text: 'AVAILABLE TERMINAL COMMANDS:', type: 'info' },
          { text: '  help       Display available options', type: 'out' },
          { text: '  scan       Simulate passive sub-network scanner', type: 'out' },
          { text: '  exploit    Deploy payload on 192.168.1.105', type: 'out' },
          { text: '  whoami     Show active operator identity', type: 'out' },
          { text: '  decrypt    Run lattice decryption tools', type: 'out' },
          { text: '  system     Display host operating specifications', type: 'out' },
          { text: '  clear      Clear command history logs', type: 'out' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'whoami':
        newLines.push(
          { text: 'operator_identity: sifreleNet', type: 'out' },
          { text: 'access_rank      : LEVEL_3_ROOT_PRIVILEGES', type: 'out' },
          { text: 'session_token    : fd927ba3e198ac384de9', type: 'out' }
        );
        break;
      case 'system':
        newLines.push(
          { text: 'OS: Kali GNU/Linux 2024.3', type: 'out' },
          { text: 'Kernel: Linux 6.11.2-amd64 x86_64', type: 'out' },
          { text: 'Shell: /bin/bash (Bash v5.2.32)', type: 'out' },
          { text: 'CPU: Intel(R) Xeon(R) Gold 16-Core @ 2.80GHz', type: 'out' },
          { text: 'Memory: 32768MB RAM (Active: 8944MB)', type: 'out' }
        );
        break;
      case 'scan':
        newLines.push(
          { text: 'Initiating ARP Port scan on local subnet...', type: 'info' },
          { text: '[+] Host detected: 192.168.1.1 (Cisco Router)', type: 'ok' },
          { text: '[+] Host detected: 192.168.1.42 (Active Dev Station)', type: 'ok' },
          { text: '[+] Host detected: 192.168.1.105 (Vulnerable Host)', type: 'ok' },
          { text: '[+] Host detected: 192.168.1.200 (Active Storage Server)', type: 'ok' },
          { text: 'Scan completed. 4 active targets identified.', type: 'info' }
        );
        break;
      case 'exploit':
        newLines.push(
          { text: 'Targeting vulnerable SSH daemon on 192.168.1.105:22', type: 'info' },
          { text: '[*] Generating custom buffer overflow payload...', type: 'out' },
          { text: '[*] Injecting NOP sled & shellcode (96 bytes)...', type: 'out' },
          { text: '[+] Success: Instruction pointer redirected (0x7fffffffe340)', type: 'ok' },
          { text: '[+] Payload executed successfully. Shell spawned.', type: 'ok' },
          { text: 'root@target:~# whoami && cat /root/flag.txt', type: 'cmd', prompt: '' },
          { text: 'root\\nFLAG{bUffEr_0vErfL0w_sUccEss_1337}', type: 'ok' }
        );
        break;
      case 'decrypt':
        newLines.push(
          { text: 'Loading decryption library: libcrypt-wasm...', type: 'info' },
          { text: '[*] Bruteforcing weak HMAC keys...', type: 'out' },
          { text: '[+] HMAC secret recovered: "hunter2"', type: 'ok' },
          { text: 'Decryption operation completed with 100% confidence.', type: 'ok' }
        );
        break;
      default:
        newLines.push({
          text: \`bash: command not found: \${command}. Try typing "help" to view choices.\`,
          type: 'err',
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const getLineColor = (type: ConsoleLine['type']) => {
    switch (type) {
      case 'cmd': return 'text-neon-green';
      case 'err': return 'text-[#ff5f57]';
      case 'ok': return 'text-[#28c840]';
      case 'info': return 'text-[#febc2e]';
      default: return 'text-white/80';
    }
  };

  return (
    <div
      className={\`
        border border-neon-green/13 bg-[#050505ee] shadow-[0_0_30px_rgba(0,255,159,0.05)]
        rounded-lg overflow-hidden flex flex-col font-mono h-96 w-full max-w-lg
        \${className}
      \`}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 border-b border-neon-green/7 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center text-[10px] text-neon-green/27">
          kali_bash — interactive_console
        </span>
      </div>

      {/* Terminal Display */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-5 space-y-2 select-text">
        {history.map((line, i) => (
          <div key={i} className={\`flex items-baseline \${getLineColor(line.type)}\`}>
            {line.prompt && (
              <span className="text-[#ff5f57] mr-1.5 select-none">{line.prompt}</span>
            )}
            <span className="whitespace-pre-line">{line.text}</span>
          </div>
        ))}
        <div ref={consoleBottomRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleCommand} className="border-t border-neon-green/7 p-2 bg-black shrink-0">
        <CyberInput
          variant="green"
          prompt="root@kali:~#"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='Type "help" to start...'
          className="border-transparent bg-transparent py-1 px-1"
          autoFocus
          autoComplete="off"
        />
      </form>
    </div>
  );
}
`,
  TargetNetworkMap: `'use client';

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
      className={\`
        border border-neon-green/7 bg-black/60 rounded-lg p-5 font-mono flex flex-col md:flex-row gap-5 w-full max-w-2xl backdrop-blur-sm
        \${className}
      \`}
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
                      className={\`fill-none stroke-current animate-ping opacity-35 \${colors}\`}
                    />
                  )}

                  {/* Outer glowing ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    className={\`fill-black stroke-current stroke-[1.5] group-hover:r-10 transition-all \${colors}\`}
                  />

                  {/* Center solid core */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    className={\`fill-current group-hover:scale-125 transition-transform \${colors}\`}
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
          <style>{\`
            @keyframes dash {
              to {
                stroke-dashoffset: -100;
              }
            }
          \`}</style>
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
`,
  CyberPulseRadar: `'use client';

import React, { useEffect, useState } from 'react';

interface RadarTarget {
  id: string;
  x: number; // percentage from center (0 to 100)
  y: number; // percentage from center (0 to 100)
  label: string;
  details?: string;
}

interface CyberPulseRadarProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  speed?: number; // Sweep rotation duration in seconds
  targets?: RadarTarget[];
  showGrid?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: {
    stroke: 'var(--neon-green)',
    fill: 'rgba(0, 255, 159, 0.03)',
    glow: 'rgba(0, 255, 159, 0.4)',
    text: 'text-neon-green',
    border: 'border-[#1a2e1a]',
    accentText: 'text-neon-green/53',
    gridStroke: 'rgba(0, 255, 159, 0.08)',
  },
  cyan: {
    stroke: '#00f0ff',
    fill: 'rgba(0, 240, 255, 0.03)',
    glow: 'rgba(0, 240, 255, 0.4)',
    text: 'text-[#00f0ff]',
    border: 'border-[#0a232e]',
    accentText: 'text-[#00f0ff88]',
    gridStroke: 'rgba(0, 240, 255, 0.08)',
  },
  red: {
    stroke: '#ff5f57',
    fill: 'rgba(255, 95, 87, 0.03)',
    glow: 'rgba(255, 95, 87, 0.4)',
    text: 'text-[#ff5f57]',
    border: 'border-[#2d1212]',
    accentText: 'text-[#ff5f5788]',
    gridStroke: 'rgba(255, 95, 87, 0.08)',
  },
  amber: {
    stroke: '#febc2e',
    fill: 'rgba(254, 188, 46, 0.03)',
    glow: 'rgba(254, 188, 46, 0.4)',
    text: 'text-[#febc2e]',
    border: 'border-[#2e230a]',
    accentText: 'text-[#febc2e88]',
    gridStroke: 'rgba(254, 188, 46, 0.08)',
  },
};

const DEFAULT_TARGETS: RadarTarget[] = [
  { id: '1', x: 25, y: -45, label: 'SYS_GATEWAY', details: 'IP: 10.0.4.12 | Port: 22' },
  { id: '2', x: -60, y: 20, label: 'IDS_FIREWALL', details: 'IP: 10.0.4.15 | ACTIVE' },
  { id: '3', x: 45, y: 55, label: 'PROXY_ROUTE', details: 'PING: 42ms | STEALTH' },
];

export default function CyberPulseRadar({
  variant = 'green',
  speed = 4,
  targets = DEFAULT_TARGETS,
  showGrid = true,
  className = '',
}: CyberPulseRadarProps) {
  const colors = COLOR_MAP[variant];
  const [activeTarget, setActiveTarget] = useState<RadarTarget | null>(null);
  const [scanningLineAngle, setScanningLineAngle] = useState(0);

  // Animate the scanning sweep logic to dynamically highlight targets close to the sweep line
  useEffect(() => {
    let start: number | null = null;
    let animationId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const durationMs = speed * 1000;
      const angle = ((progress % durationMs) / durationMs) * 360;
      setScanningLineAngle(angle);
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div className={\`flex flex-col md:flex-row items-stretch gap-6 border p-6 rounded bg-[#0a0a0a] relative overflow-hidden select-none \${colors.border} \${className}\`}>
      {/* Scanline overlay effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-10 opacity-40" />

      {/* SONAR SVG Area */}
      <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
        <svg
          viewBox="-120 -120 240 240"
          className="w-full max-w-[300px] h-auto aspect-square relative z-10"
        >
          {/* Radial Grid lines */}
          {showGrid && (
            <>
              {/* Concentric rings */}
              <circle cx="0" cy="0" r="25" fill="none" stroke={colors.gridStroke} strokeWidth="1" />
              <circle cx="0" cy="0" r="50" fill="none" stroke={colors.gridStroke} strokeWidth="1" />
              <circle cx="0" cy="0" r="75" fill="none" stroke={colors.gridStroke} strokeWidth="1" />
              <circle cx="0" cy="0" r="100" fill="none" stroke={colors.stroke} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
              <circle cx="0" cy="0" r="105" fill="none" stroke={colors.stroke} strokeWidth="1.5" />

              {/* Crosshair lines */}
              <line x1="-110" y1="0" x2="110" y2="0" stroke={colors.gridStroke} strokeWidth="1" />
              <line x1="0" y1="-110" x2="0" y2="110" stroke={colors.gridStroke} strokeWidth="1" />
              
              {/* Corner angle ticks */}
              <line x1="-70.7" y1="-70.7" x2="70.7" y2="70.7" stroke={colors.gridStroke} strokeWidth="0.5" strokeDasharray="2 4" />
              <line x1="-70.7" y1="70.7" x2="70.7" y2="-70.7" stroke={colors.gridStroke} strokeWidth="0.5" strokeDasharray="2 4" />
            </>
          )}

          {/* Sweep Sweep Line */}
          <g transform={\`rotate(\${scanningLineAngle})\`}>
            {/* Gradient Sweep Slice */}
            <path
              d="M 0 0 L 0 -105 A 105 105 0 0 1 40.2 -97.0 L 0 0 Z"
              fill={\`url(#radar-sweep-grad-\${variant})\`}
              opacity="0.6"
            />
            {/* Leading edge line */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-105"
              stroke={colors.stroke}
              strokeWidth="2"
              style={{ filter: \`drop-shadow(0 0 4px \${colors.glow})\` }}
            />
          </g>

          {/* SVG Definitions */}
          <defs>
            <radialGradient id={\`radar-sweep-grad-\${variant}\`} cx="0%" cy="100%" r="100%">
              <stop offset="0%" stopColor={colors.stroke} stopOpacity="0" />
              <stop offset="90%" stopColor={colors.stroke} stopOpacity="0.05" />
              <stop offset="100%" stopColor={colors.stroke} stopOpacity="0.25" />
            </radialGradient>
          </defs>

          {/* Targets */}
          {targets.map((tgt) => {
            // Calculate angle from center to target to highlight target when sweep overlaps it
            const targetAngle = (Math.atan2(tgt.y, tgt.x) * 180) / Math.PI + 90;
            const normalizedTargetAngle = targetAngle < 0 ? targetAngle + 360 : targetAngle;
            const diff = Math.abs(normalizedTargetAngle - scanningLineAngle);
            const isHighlighted = diff < 25 || diff > 335;

            return (
              <g
                key={tgt.id}
                className="cursor-pointer group/target"
                onClick={() => setActiveTarget(tgt)}
              >
                {/* Ping Pulse */}
                {isHighlighted && (
                  <circle
                    cx={tgt.x}
                    cy={tgt.y}
                    r="8"
                    fill="none"
                    stroke={colors.stroke}
                    strokeWidth="1.5"
                    className="animate-ping"
                    style={{ transformOrigin: \`\${tgt.x}px \${tgt.y}px\` }}
                  />
                )}
                {/* Main Dot */}
                <circle
                  cx={tgt.x}
                  cy={tgt.y}
                  r={isHighlighted ? '4.5' : '3.5'}
                  fill={isHighlighted ? colors.stroke : 'rgba(0,0,0,0.5)'}
                  stroke={colors.stroke}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                  style={{
                    filter: isHighlighted ? \`drop-shadow(0 0 6px \${colors.glow})\` : undefined,
                  }}
                />
                {/* Target Name Tag */}
                <text
                  x={tgt.x + 8}
                  y={tgt.y + 4}
                  fill={colors.stroke}
                  fontSize="7"
                  fontFamily="monospace"
                  fontWeight="bold"
                  opacity={isHighlighted || activeTarget?.id === tgt.id ? '1' : '0.4'}
                  className="transition-opacity duration-300 pointer-events-none select-none"
                >
                  {tgt.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Target Details Panel (Hacker console look) */}
      <div className={\`w-full md:w-[220px] flex flex-col justify-between border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 \${colors.border}\`}>
        <div className="flex-1 flex flex-col justify-center min-h-[120px]">
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-2 select-none">
            [ Scan Diagnostics ]
          </span>
          {activeTarget ? (
            <div className="font-mono space-y-2">
              <p className={\`text-sm font-bold tracking-tight \${colors.text}\`}>
                &gt; {activeTarget.label}
              </p>
              <p className="text-xs text-white/70 leading-relaxed font-mono">
                {activeTarget.details || 'NO DIAGNOSTIC INFO'}
              </p>
              <div className="text-[9px] text-white/30 space-y-0.5">
                <p>COORD_X : {activeTarget.x.toFixed(1)}%</p>
                <p>COORD_Y : {activeTarget.y.toFixed(1)}%</p>
                <p>SIG_LOC : {(Math.abs(Math.sin(activeTarget.x * 12.9898 + activeTarget.y * 78.233)) * 1000).toFixed(0)}m</p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-white/30 italic font-mono py-4">
              Select a target dot on the radar grid to initialize diagnostics.
            </div>
          )}
        </div>

        {/* Sonar status line */}
        <div className="mt-4 pt-4 border-t border-dashed border-white/10 flex items-center justify-between text-[10px] text-white/30 font-mono">
          <span>SWEEP_RATE: {(360 / speed).toFixed(1)}°/s</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}
`,
  TextDecryptor: `'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface TextDecryptorProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number; // Milliseconds per character step
  delay?: number; // Startup delay in ms
  trigger?: 'mount' | 'hover' | 'click';
  variant?: 'green' | 'cyan' | 'red' | 'amber' | 'none';
  glow?: boolean;
  className?: string;
}

const COLOR_MAP = {
  green: 'text-neon-green',
  cyan: 'text-[#00f0ff]',
  red: 'text-[#ff5f57]',
  amber: 'text-[#febc2e]',
  none: '',
};

const DECRYPT_CHARS = '0123456789ABCDEF★☠☣☣☢⚙⚡⚧⚓⚛';

export default function TextDecryptor({
  text,
  speed = 40,
  delay = 0,
  trigger = 'mount',
  variant = 'green',
  glow = true,
  className = '',
  ...props
}: TextDecryptorProps) {
  const [prevText, setPrevText] = useState(text);
  const [displayText, setDisplayText] = useState(trigger === 'mount' ? '' : text);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  if (text !== prevText) {
    setPrevText(text);
    setDisplayText(trigger === 'mount' ? '' : text);
  }

  const startDecryption = useCallback(() => {
    if (isDecrypting) return;
    setIsDecrypting(true);

    let currentIndex = 0;
    
    // Clear any active timers
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      // Create scrambled text
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < currentIndex) {
            return text[index]; // Locked character
          }
          // Scrambled placeholder
          return DECRYPT_CHARS[Math.floor(Math.random() * DECRYPT_CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      // Increment lock position (fractional increments make it look like a rolling stream)
      currentIndex += 0.3;

      if (currentIndex >= text.length + 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDisplayText(text);
        setIsDecrypting(false);
      }
    }, speed);
  }, [isDecrypting, text, speed]);

  useEffect(() => {
    if (trigger === 'mount') {
      const startupTimer = setTimeout(startDecryption, delay);
      return () => {
        clearTimeout(startupTimer);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [trigger, delay, startDecryption]);



  const handleTrigger = () => {
    if (trigger === 'click') {
      startDecryption();
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      startDecryption();
    }
  };

  const colorClass = COLOR_MAP[variant];

  return (
    <span
      {...props}
      onClick={handleTrigger}
      onMouseEnter={handleMouseEnter}
      className={\`
        font-mono tracking-wider transition-all duration-300
        \${colorClass}
        \${glow ? 'text-shadow-glow' : ''}
        \${trigger === 'click' || trigger === 'hover' ? 'cursor-pointer hover:brightness-125' : ''}
        \${className}
      \`}
      style={{
        textShadow: glow && variant !== 'none' ? \`0 0 8px currentColor\` : undefined,
      }}
    >
      {displayText || text}
    </span>
  );
}
`,
  HologramContainer: `'use client';

import React from 'react';

interface HologramContainerProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  flicker?: boolean;
  scanlines?: boolean;
  noise?: boolean;
  className?: string;
  children: React.ReactNode;
}

const COLOR_MAP = {
  green: {
    border: 'border-neon-green/27',
    glow: 'rgba(0, 255, 159, 0.15)',
    color: 'var(--neon-green)',
    bg: 'bg-neon-green/1',
    overlay: 'rgba(0, 255, 159, 0.05)',
  },
  cyan: {
    border: 'border-[#00f0ff44]',
    glow: 'rgba(0, 240, 255, 0.15)',
    color: '#00f0ff',
    bg: 'bg-[#00f0ff03]',
    overlay: 'rgba(0, 240, 255, 0.05)',
  },
  red: {
    border: 'border-[#ff5f5744]',
    glow: 'rgba(255, 95, 87, 0.15)',
    color: '#ff5f57',
    bg: 'bg-[#ff5f5703]',
    overlay: 'rgba(255, 95, 87, 0.05)',
  },
  amber: {
    border: 'border-[#febc2e44]',
    glow: 'rgba(254, 188, 46, 0.15)',
    color: '#febc2e',
    bg: 'bg-[#febc2e03]',
    overlay: 'rgba(254, 188, 46, 0.05)',
  },
};

export default function HologramContainer({
  variant = 'cyan',
  flicker = true,
  scanlines = true,
  noise = true,
  className = '',
  children,
}: HologramContainerProps) {
  const colors = COLOR_MAP[variant];

  return (
    <div
      className={\`
        relative border rounded p-6 overflow-hidden bg-[#0a0a0a] transition-all duration-300
        \${colors.border} \${colors.bg} \${flicker ? 'animate-holo-flicker' : ''} \${className}
      \`}
      style={{
        boxShadow: \`inset 0 0 20px \${colors.glow}, 0 0 15px \${colors.glow}\`,
      }}
    >
      {/* Scope Style Block to keep animations fully portable */}
      <style jsx global>{\`
        @keyframes holo-flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.99;
            filter: hue-rotate(0deg) saturate(1);
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.4;
            filter: hue-rotate(5deg) saturate(1.5) brightness(1.2);
          }
        }
        @keyframes scanline-roll {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-holo-flicker {
          animation: holo-flicker 4s infinite;
        }
        .scanline-overlay::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.3) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06));
          background-size: 100% 3px, 3px 100%;
          z-index: 20;
          pointer-events: none;
        }
        .scanline-sweep-line {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100px;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--sweep-color) 10%;
          opacity: 0.08;
          z-index: 21;
          pointer-events: none;
          animation: scanline-roll 6s linear infinite;
        }
        .holo-noise {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          opacity: 0.15;
          z-index: 19;
          pointer-events: none;
        }
      \`}</style>

      {/* Hologram scanline and sweeping beam */}
      {scanlines && (
        <div 
          className="scanline-overlay absolute inset-0 pointer-events-none" 
          style={{ '--sweep-color': colors.color } as React.CSSProperties}
        >
          <div className="scanline-sweep-line" />
        </div>
      )}

      {/* Noise background grid overlay */}
      {noise && <div className="holo-noise absolute inset-0 pointer-events-none" />}

      {/* Blue / Cyan color grade tint */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-10"
        style={{
          background: \`radial-gradient(circle, \${colors.overlay} 0%, transparent 80%)\`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}
`,
  CyberTable: `'use client';

import React from 'react';

interface Column {
  key: string;
  header: string;
  className?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface CyberTableProps {
  columns: Column[];
  data: any[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  title?: string;
  subtitle?: string;
  loading?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    text: 'text-neon-green',
    border: 'border-neon-green/20',
    borderHeader: 'border-neon-green/40',
    bgHeader: 'bg-neon-green/5',
    rowHover: 'hover:bg-neon-green/5',
    glow: 'shadow-[0_0_15px_rgba(0,255,159,0.05)]',
  },
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    borderHeader: 'border-cyan-500/40',
    bgHeader: 'bg-cyan-500/5',
    rowHover: 'hover:bg-cyan-500/5',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.05)]',
  },
  red: {
    text: 'text-rose-500',
    border: 'border-rose-500/20',
    borderHeader: 'border-rose-500/40',
    bgHeader: 'bg-rose-500/5',
    rowHover: 'hover:bg-rose-500/5',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.05)]',
  },
  amber: {
    text: 'text-amber-500',
    border: 'border-amber-500/20',
    borderHeader: 'border-amber-500/40',
    bgHeader: 'bg-amber-500/5',
    rowHover: 'hover:bg-amber-500/5',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.05)]',
  },
};

export default function CyberTable({
  columns,
  data,
  variant = 'green',
  title,
  subtitle,
  loading = false,
  className = '',
}: CyberTableProps) {
  const styles = VARIANTS[variant];

  return (
    <div className={\`w-full border border-neutral-900 bg-black/40 backdrop-blur-sm rounded overflow-hidden flex flex-col font-mono text-xs \${styles.glow} \${className}\`}>
      {/* Table Header Bar */}
      {(title || subtitle) && (
        <div className="px-4 py-3 border-b border-neutral-950 bg-black/80 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
          <div>
            {title && (
              <h4 className="text-white font-bold tracking-widest uppercase flex items-center gap-2">
                <span className={styles.text}>⬢</span> {title}
              </h4>
            )}
            {subtitle && <p className="text-[10px] text-white/40 uppercase tracking-wider">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-white/30 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span>Telemetry Feed</span>
          </div>
        </div>
      )}

      {/* Grid Wrapper */}
      <div className="w-full overflow-x-auto relative scrollbar-thin">
        {/* CRT Scanline Sweep */}
        <div className="absolute inset-0 pointer-events-none z-10 scanline-sweep opacity-[0.03]" />

        <table className="w-full border-collapse text-left min-w-[500px]">
          <thead>
            <tr className={\`border-b \${styles.borderHeader} \${styles.bgHeader}\`}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={\`px-4 py-3 font-bold uppercase tracking-wider \${styles.text} \${col.className || ''}\`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-950">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-white/40">
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⬡</span> LOADING TELEMETRY DATA...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-white/30 uppercase">
                  [ No telemetry logs registered ]
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={\`transition-colors duration-150 \${styles.rowHover} group\`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={\`px-4 py-3 text-white/70 group-hover:text-white transition-colors border-b \${styles.border} \${col.className || ''}\`}
                    >
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`,
  CyberTooltip: `'use client';

import React, { useState } from 'react';

interface CyberTooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  delay?: number;
  className?: string;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/30 bg-[#0a0a0a]/95 text-neon-green',
    text: 'text-neon-green',
    arrow: 'border-neon-green/30',
  },
  cyan: {
    border: 'border-cyan-500/30 bg-[#0a0a0a]/95 text-cyan-400',
    text: 'text-cyan-400',
    arrow: 'border-cyan-500/30',
  },
  red: {
    border: 'border-rose-500/30 bg-[#0a0a0a]/95 text-rose-500',
    text: 'text-rose-500',
    arrow: 'border-rose-500/30',
  },
  amber: {
    border: 'border-amber-500/30 bg-[#0a0a0a]/95 text-amber-500',
    text: 'text-amber-500',
    arrow: 'border-amber-500/30',
  },
};

const POSITION_CLASSES = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export default function CyberTooltip({
  content,
  children,
  position = 'top',
  variant = 'green',
  delay = 200,
  className = '',
}: CyberTooltipProps) {
  const [visible, setVisible] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const show = () => {
    timeoutId = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeoutId);
    setVisible(false);
  };

  const styles = VARIANTS[variant];
  const positionClass = POSITION_CLASSES[position];

  return (
    <div
      className="relative inline-block cursor-help"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          className={\`absolute z-[999] px-3 py-1.5 border rounded font-mono text-[10px] uppercase tracking-wider whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-md transition-opacity duration-200 animate-fadeIn \${styles.border} \${positionClass} \${className}\`}
        >
          {/* Neon Corner Brackets */}
          <div className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-current opacity-60" />
          <div className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-current opacity-60" />
          <div className="absolute bottom-0.5 left-0.5 w-1 h-1 border-b border-l border-current opacity-60" />
          <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-current opacity-60" />

          {/* Tooltip Content */}
          <div className="flex items-center gap-1.5 relative z-10">
            <span className="animate-blink">_</span>
            <span>{content}</span>
          </div>
        </div>
      )}
    </div>
  );
}
`,
  CyberToast: `'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export type ToastVariant = 'green' | 'cyan' | 'red' | 'amber';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface CyberToastContextType {
  toast: (options: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const CyberToastContext = createContext<CyberToastContextType | undefined>(undefined);

export function useCyberToast() {
  const context = useContext(CyberToastContext);
  if (!context) {
    throw new Error('useCyberToast must be used within a CyberToastProvider');
  }
  return context;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/30 bg-[#0a0a0a]/95 text-neon-green',
    icon: <CheckCircle2 className="w-4 h-4 text-neon-green" />,
    progress: 'bg-neon-green',
    title: 'text-white',
  },
  cyan: {
    border: 'border-cyan-500/30 bg-[#0a0a0a]/95 text-cyan-400',
    icon: <Info className="w-4 h-4 text-cyan-400" />,
    progress: 'bg-cyan-400',
    title: 'text-white',
  },
  red: {
    border: 'border-rose-500/30 bg-[#0a0a0a]/95 text-rose-500',
    icon: <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />,
    progress: 'bg-rose-500',
    title: 'text-white',
  },
  amber: {
    border: 'border-amber-500/30 bg-[#0a0a0a]/95 text-amber-500',
    icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    progress: 'bg-amber-500',
    title: 'text-white',
  },
};

export function CyberToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    const duration = options.duration ?? 4000;
    
    setToasts((prev) => [...prev, { id, ...options }]);

    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
  }, [dismiss]);

  return (
    <CyberToastContext.Provider value={{ toast, dismiss }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => {
          const styles = VARIANTS[t.variant || 'green'];
          return (
            <div
              key={t.id}
              className={\`pointer-events-auto w-full border rounded p-4 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden flex gap-3 items-start animate-slideIn font-mono text-xs \${styles.border}\`}
            >
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 scanline-sweep opacity-[0.03]" />

              {/* Progress bar countdown */}
              {t.duration !== 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                  <div
                    className={\`h-full \${styles.progress} transition-all duration-[4000ms] ease-linear\`}
                    style={{
                      animation: \`shrinkWidth \${t.duration || 4000}ms linear forwards\`,
                    }}
                  />
                </div>
              )}

              {/* Icon */}
              <div className="shrink-0 mt-0.5">{styles.icon}</div>

              {/* Text info */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className={\`font-bold uppercase tracking-wider \${styles.title}\`}>
                  {t.title}
                </div>
                {t.message && <p className="text-white/60 text-[10px] break-words">{t.message}</p>}
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <style jsx global>{\`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      \`}</style>
    </CyberToastContext.Provider>
  );
}
`,
  CyberCommandMenu: `'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Settings, ShieldAlert, Cpu, Eye, X } from 'lucide-react';

interface CommandOption {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface CyberCommandMenuProps {
  options: CommandOption[];
  triggerKey?: string; // e.g. "k" (combined with metaKey/ctrlKey) or "/"
  placeholder?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/30 bg-[#0a0a0ae6]',
    text: 'text-neon-green',
    bgActive: 'bg-neon-green/10',
    borderActive: 'border-neon-green/50',
    outline: 'outline-neon-green/40',
  },
  cyan: {
    border: 'border-cyan-500/30 bg-[#0a0a0ae6]',
    text: 'text-cyan-400',
    bgActive: 'bg-cyan-500/10',
    borderActive: 'border-cyan-500/50',
    outline: 'outline-cyan-500/40',
  },
  red: {
    border: 'border-rose-500/30 bg-[#0a0a0ae6]',
    text: 'text-rose-500',
    bgActive: 'bg-rose-500/10',
    borderActive: 'border-rose-500/50',
    outline: 'outline-rose-500/40',
  },
  amber: {
    border: 'border-amber-500/30 bg-[#0a0a0ae6]',
    text: 'text-amber-500',
    bgActive: 'bg-amber-500/10',
    borderActive: 'border-amber-500/50',
    outline: 'outline-amber-500/40',
  },
};

export default function CyberCommandMenu({
  options,
  triggerKey = 'k',
  placeholder = 'RUN DIAGNOSTIC COMMAND...',
  variant = 'green',
}: CyberCommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const styles = VARIANTS[variant];

  // Hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === triggerKey.toLowerCase()) {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement !== inputRef.current) {
        // Only trigger "/" search if not currently focusing an input field
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerKey]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setActiveIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Filter options
  const filtered = options.filter(
    (opt) =>
      opt.title.toLowerCase().includes(search.toLowerCase()) ||
      opt.category.toLowerCase().includes(search.toLowerCase()) ||
      (opt.subtitle && opt.subtitle.toLowerCase().includes(search.toLowerCase()))
  );

  // Navigate options via keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        filtered[activeIndex].action();
        setOpen(false);
      }
    }
  };

  if (!open) return null;

  // Group by category
  const categories = Array.from(new Set(filtered.map((opt) => opt.category)));

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4 font-mono text-xs">
      <div
        ref={menuRef}
        onKeyDown={handleKeyDown}
        className={\`w-full max-w-lg border rounded shadow-[0_0_30px_rgba(0,255,159,0.15)] flex flex-col overflow-hidden relative \${styles.border}\`}
      >
        {/* CRT Scanlines Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 scanline-sweep opacity-[0.03]" />

        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-900 bg-black/60 shrink-0">
          <Search className={\`w-4 h-4 shrink-0 \${styles.text}\`} />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-white/20 outline-none text-xs tracking-wider"
          />
          <button
            onClick={() => setOpen(false)}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="flex-1 overflow-y-auto max-h-[300px] p-2 space-y-3 bg-black/40 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-white/30 uppercase tracking-widest">
              [ NO MATCHING PROTOCOLS FOUND ]
            </div>
          ) : (
            categories.map((cat) => {
              const catOptions = filtered.filter((opt) => opt.category === cat);
              return (
                <div key={cat} className="space-y-1">
                  <div className="px-3 py-1 text-[9px] font-bold text-white/30 uppercase tracking-widest">
                    {cat}
                  </div>
                  <div className="space-y-0.5">
                    {catOptions.map((opt) => {
                      const absoluteIndex = filtered.indexOf(opt);
                      const isActive = absoluteIndex === activeIndex;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            opt.action();
                            setOpen(false);
                          }}
                          onMouseEnter={() => setActiveIndex(absoluteIndex)}
                          className={\`flex items-center gap-3 px-3 py-2.5 rounded border transition-all cursor-pointer \${
                            isActive
                              ? \`\${styles.bgActive} \${styles.borderActive} text-white\`
                              : 'border-transparent text-white/60 hover:text-white'
                          }\`}
                        >
                          <div className={\`shrink-0 \${isActive ? styles.text : 'text-white/30'}\`}>
                            {opt.icon || <Terminal className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold tracking-wider uppercase">{opt.title}</p>
                            {opt.subtitle && (
                              <p className={\`text-[10px] truncate \${isActive ? 'text-white/60' : 'text-white/30'}\`}>
                                {opt.subtitle}
                              </p>
                            )}
                          </div>
                          {isActive && (
                            <span className={\`text-[10px] font-bold animate-pulse \${styles.text}\`}>
                              [ RUN ]
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-neutral-900 bg-black/80 flex items-center justify-between text-[9px] text-white/30 uppercase shrink-0">
          <div className="flex gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div>
            <span>Trigger: <kbd className="bg-white/5 border border-white/10 px-1 rounded">⌘ {triggerKey.toUpperCase()}</kbd></span>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  CyberAccordion: `'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  trigger: string;
  content: React.ReactNode;
}

interface CyberAccordionProps {
  items: AccordionItem[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  allowMultiple?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/20',
    borderActive: 'border-neon-green/50',
    text: 'text-neon-green',
    bg: 'bg-neon-green/5',
  },
  cyan: {
    border: 'border-cyan-500/20',
    borderActive: 'border-cyan-500/50',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/5',
  },
  red: {
    border: 'border-rose-500/20',
    borderActive: 'border-rose-500/50',
    text: 'text-rose-500',
    bg: 'bg-rose-500/5',
  },
  amber: {
    border: 'border-amber-500/20',
    borderActive: 'border-amber-500/50',
    text: 'text-amber-500',
    bg: 'bg-amber-500/5',
  },
};

export default function CyberAccordion({
  items,
  variant = 'green',
  allowMultiple = false,
  className = '',
}: CyberAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const styles = VARIANTS[variant];

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={\`w-full flex flex-col gap-2 font-mono text-xs \${className}\`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={\`border rounded overflow-hidden transition-all duration-300 bg-black/40 backdrop-blur-sm \${
              isOpen ? styles.borderActive : styles.border
            }\`}
          >
            {/* Header / Trigger */}
            <button
              onClick={() => toggle(item.id)}
              className={\`w-full px-4 py-3 flex items-center justify-between text-left font-bold uppercase tracking-wider transition-colors cursor-pointer select-none \${
                isOpen ? \`\${styles.bg} \${styles.text}\` : 'text-white/60 hover:text-white hover:bg-white/5'
              }\`}
            >
              <div className="flex items-center gap-2">
                <span className="opacity-50">{isOpen ? '[-]' : '[+]'}</span>
                <span>{item.trigger}</span>
              </div>
              <ChevronDown
                className={\`w-4 h-4 transition-transform duration-300 shrink-0 \${
                  isOpen ? 'transform rotate-180' : ''
                }\`}
              />
            </button>

            {/* Content Panel */}
            <div
              className={\`transition-all duration-300 ease-in-out overflow-hidden \${
                isOpen ? 'max-h-[500px] border-t border-neutral-950' : 'max-h-0'
              }\`}
            >
              <div className="p-4 text-white/70 leading-relaxed text-[11px] whitespace-pre-wrap select-text">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
`,
  CyberSlider: `'use client';

import React from 'react';

interface CyberSliderProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  showTicks?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    text: 'text-neon-green',
    accent: 'accent-neon-green',
    track: 'bg-neon-green/20',
  },
  cyan: {
    text: 'text-cyan-400',
    accent: 'accent-cyan-400',
    track: 'bg-cyan-500/20',
  },
  red: {
    text: 'text-rose-500',
    accent: 'accent-rose-500',
    track: 'bg-rose-500/20',
  },
  amber: {
    text: 'text-amber-500',
    accent: 'accent-amber-500',
    track: 'bg-amber-500/20',
  },
};

export default function CyberSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  variant = 'green',
  showTicks = false,
  className = '',
}: CyberSliderProps) {
  const styles = VARIANTS[variant];

  // Calculate percentage for progress styling if needed
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={\`w-full flex flex-col gap-1.5 font-mono text-xs \${className}\`}>
      {/* Slider Header info */}
      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
        {label && <span className="text-white/60">{label}</span>}
        <span className={styles.text}>
          [ {value} / {max} ]
        </span>
      </div>

      {/* Slider Input bar wrapper */}
      <div className="relative flex items-center h-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={\`w-full h-1 bg-neutral-900 border border-neutral-800 rounded outline-none cursor-pointer appearance-none \${styles.accent}\`}
          style={{
            background: \`linear-gradient(to right, var(--neon-green) 0%, var(--neon-green) \${percent}%, #171717 \${percent}%, #171717 100%)\`.replace(
              /var\\(--neon-green\\)/g,
              variant === 'green'
                ? 'var(--neon-green)'
                : variant === 'cyan'
                ? '#22d3ee'
                : variant === 'red'
                ? '#f43f5e'
                : '#f59e0b'
            ),
          }}
        />
      </div>

      {/* Optional Scale Ticks */}
      {showTicks && (
        <div className="flex justify-between px-1 text-[8px] text-white/30 select-none">
          <span>MIN</span>
          <span>MID</span>
          <span>MAX</span>
        </div>
      )}
    </div>
  );
}
`,
  CyberOtpInput: `'use client';

import React, { useRef, useEffect } from 'react';

interface CyberOtpInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/20 focus:border-neon-green',
    text: 'text-neon-green',
    bg: 'bg-black',
    glow: 'focus:shadow-[0_0_10px_rgba(0,255,159,0.3)]',
  },
  cyan: {
    border: 'border-cyan-500/20 focus:border-cyan-400',
    text: 'text-cyan-400',
    bg: 'bg-black',
    glow: 'focus:shadow-[0_0_10px_rgba(34,211,238,0.3)]',
  },
  red: {
    border: 'border-rose-500/20 focus:border-rose-500',
    text: 'text-rose-500',
    bg: 'bg-black',
    glow: 'focus:shadow-[0_0_10px_rgba(244,63,94,0.3)]',
  },
  amber: {
    border: 'border-amber-500/20 focus:border-amber-500',
    text: 'text-amber-500',
    bg: 'bg-black',
    glow: 'focus:shadow-[0_0_10px_rgba(245,158,11,0.3)]',
  },
};

export default function CyberOtpInput({
  length = 6,
  value,
  onChange,
  variant = 'green',
  disabled = false,
  className = '',
}: CyberOtpInputProps) {
  const styles = VARIANTS[variant];
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Focus tracking array helper
  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    const currentOtp = value.split('');
    
    // Only accept numbers/alphanumeric for cyber codes
    const sanitized = val.replace(/[^a-zA-Z0-9]/g, '');
    
    if (sanitized) {
      currentOtp[index] = sanitized[sanitized.length - 1];
      const newOtp = currentOtp.join('');
      onChange(newOtp);

      // Move focus to next input
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const currentOtp = value.split('');
      if (!currentOtp[index] && index > 0) {
        // If current value is empty, backspace focuses previous input
        inputsRef.current[index - 1]?.focus();
      } else {
        // Otherwise empty current input
        currentOtp[index] = '';
        onChange(currentOtp.join(''));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const sanitized = pastedText.replace(/[^a-zA-Z0-9]/g, '').slice(0, length);
    
    if (sanitized) {
      onChange(sanitized);
      // Focus on last pasted slot or final slot
      const focusIndex = Math.min(sanitized.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div className={\`flex items-center gap-2 font-mono \${className}\`}>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="relative">
          {/* Neon Corner Brackets */}
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 pointer-events-none" />

          <input
            ref={(el) => {
              if (el) inputsRef.current[index] = el;
            }}
            type="text"
            disabled={disabled}
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={\`w-10 h-12 text-center text-lg font-bold border rounded outline-none transition-all \${styles.bg} \${styles.border} \${styles.text} \${styles.glow}\`}
          />
        </div>
      ))}
    </div>
  );
}
`,
  CyberSkeleton: `'use client';

import React from 'react';

interface CyberSkeletonProps {
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const VARIANTS = {
  green: {
    bg: 'bg-neon-green/5',
    line: 'bg-gradient-to-r from-transparent via-neon-green/10 to-transparent',
    border: 'border-neon-green/10',
  },
  cyan: {
    bg: 'bg-cyan-500/5',
    line: 'bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent',
    border: 'border-cyan-500/10',
  },
  red: {
    bg: 'bg-rose-500/5',
    line: 'bg-gradient-to-r from-transparent via-rose-500/10 to-transparent',
    border: 'border-rose-500/10',
  },
  amber: {
    bg: 'bg-amber-500/5',
    line: 'bg-gradient-to-r from-transparent via-amber-500/10 to-transparent',
    border: 'border-amber-500/10',
  },
};

export default function CyberSkeleton({
  variant = 'green',
  className = '',
}: CyberSkeletonProps) {
  const styles = VARIANTS[variant];

  return (
    <div
      className={\`relative overflow-hidden rounded border bg-neutral-950/40 backdrop-blur-sm pointer-events-none \${styles.border} \${styles.bg} \${className}\`}
    >
      {/* Animated glowing sweep overlay */}
      <div
        className={\`absolute inset-0 -translate-x-full animate-skeletonSweep \${styles.line}\`}
      />

      {/* Embedded style tag for the custom loop animation if not loaded globally */}
      <style jsx>{\`
        @keyframes skeletonSweep {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-skeletonSweep {
          animation: skeletonSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      \`}</style>
    </div>
  );
}
`,
  CyberBreadcrumb: `'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CyberBreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  className?: string;
}

const VARIANTS = {
  green: {
    text: 'text-neon-green',
    textActive: 'text-white/80',
    separator: 'text-neon-green/30',
  },
  cyan: {
    text: 'text-cyan-400',
    textActive: 'text-white/80',
    separator: 'text-cyan-500/30',
  },
  red: {
    text: 'text-rose-500',
    textActive: 'text-white/80',
    separator: 'text-rose-500/30',
  },
  amber: {
    text: 'text-amber-500',
    textActive: 'text-white/80',
    separator: 'text-amber-500/30',
  },
};

export default function CyberBreadcrumb({
  items,
  variant = 'green',
  className = '',
}: CyberBreadcrumbProps) {
  const styles = VARIANTS[variant];

  return (
    <nav
      aria-label="Breadcrumb"
      className={\`flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider \${className}\`}
    >
      {/* Root prompt symbol */}
      <span className={\`\${styles.text} font-bold mr-1\`}>~</span>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className={\`shrink-0 \${styles.separator}\`}>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            )}
            
            {isLast ? (
              <span className={\`\${styles.textActive} font-bold\`}>
                {item.label}
              </span>
            ) : item.href ? (
              <a
                href={item.href}
                className={\`\${styles.text} opacity-60 hover:opacity-100 transition-opacity\`}
              >
                {item.label}
              </a>
            ) : (
              <span className={\`\${styles.text} opacity-60\`}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
`,
  CyberDropdown: `'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CyberDropdownProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  variant?: 'green' | 'cyan' | 'red' | 'amber';
  disabled?: boolean;
  className?: string;
}

const VARIANTS = {
  green: {
    border: 'border-neon-green/20 hover:border-neon-green/40 focus:border-neon-green',
    text: 'text-neon-green',
    bgActive: 'bg-neon-green/10',
    glow: 'shadow-[0_0_15px_rgba(0,255,159,0.03)]',
  },
  cyan: {
    border: 'border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-400',
    text: 'text-cyan-400',
    bgActive: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.03)]',
  },
  red: {
    border: 'border-rose-500/20 hover:border-rose-500/40 focus:border-rose-500',
    text: 'text-rose-500',
    bgActive: 'bg-rose-500/10',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.03)]',
  },
  amber: {
    border: 'border-amber-500/20 hover:border-amber-500/40 focus:border-amber-500',
    text: 'text-amber-500',
    bgActive: 'bg-amber-500/10',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.03)]',
  },
};

export default function CyberDropdown({
  options,
  value,
  onChange,
  placeholder = 'SELECT PARAMETER...',
  variant = 'green',
  disabled = false,
  className = '',
}: CyberDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const styles = VARIANTS[variant];
  const selectedOption = options.find((opt) => opt.value === value);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={\`relative font-mono text-xs select-none \${className}\`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={\`w-full px-4 py-2.5 border rounded bg-black flex items-center justify-between text-left transition-all relative overflow-hidden cursor-pointer \${
          disabled ? 'opacity-40 cursor-not-allowed' : \`\${styles.border} \${styles.glow}\`
        }\`}
      >
        <span className={selectedOption ? 'text-white' : 'text-white/30'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={\`w-4 h-4 transition-transform duration-200 text-white/40 \${
            isOpen ? 'transform rotate-180 text-white' : ''
          }\`}
        />
        {/* Neon Corners */}
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/10" />
        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/10" />
        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/10" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/10" />
      </button>

      {/* Dropdown Options Box */}
      {isOpen && (
        <div
          className={\`absolute left-0 right-0 mt-1.5 z-50 border rounded bg-black/95 backdrop-blur-md max-h-60 overflow-y-auto shadow-[0_0_20px_rgba(0,0,0,0.8)] border-neutral-900 scrollbar-thin\`}
        >
          {/* CRT scanlines */}
          <div className="absolute inset-0 pointer-events-none z-10 scanline-sweep opacity-[0.02]" />

          <div className="py-1">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={\`px-4 py-2.5 cursor-pointer transition-colors relative flex items-center justify-between \${
                    isSelected
                      ? \`\${styles.bgActive} \${styles.text} font-bold\`
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }\`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <span className={styles.text}>[✔]</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
`,
};
