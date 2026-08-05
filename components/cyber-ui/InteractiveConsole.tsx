'use client';

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
          { text: 'root\nFLAG{bUffEr_0vErfL0w_sUccEss_1337}', type: 'ok' }
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
          text: `bash: command not found: ${command}. Try typing "help" to view choices.`,
          type: 'err',
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const getLineColor = (type: ConsoleLine['type']) => {
    switch (type) {
      case 'cmd': return 'text-[#00ff9f]';
      case 'err': return 'text-[#ff5f57]';
      case 'ok': return 'text-[#28c840]';
      case 'info': return 'text-[#febc2e]';
      default: return 'text-white/80';
    }
  };

  return (
    <div
      className={`
        border border-[#00ff9f22] bg-[#050505ee] shadow-[0_0_30px_rgba(0,255,159,0.05)]
        rounded-lg overflow-hidden flex flex-col font-mono h-96 w-full max-w-lg
        ${className}
      `}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 border-b border-[#00ff9f11] shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center text-[10px] text-[#00ff9f44]">
          kali_bash — interactive_console
        </span>
      </div>

      {/* Terminal Display */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-5 space-y-2 select-text">
        {history.map((line, i) => (
          <div key={i} className={`flex items-baseline ${getLineColor(line.type)}`}>
            {line.prompt && (
              <span className="text-[#ff5f57] mr-1.5 select-none">{line.prompt}</span>
            )}
            <span className="whitespace-pre-line">{line.text}</span>
          </div>
        ))}
        <div ref={consoleBottomRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleCommand} className="border-t border-[#00ff9f11] p-2 bg-black shrink-0">
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
