'use client';

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
      className={`
        border border-[#00ff9f22] bg-[#0a0a0aee] shadow-[0_0_40px_rgba(0,255,159,0.1)]
        rounded-lg max-w-sm w-full overflow-hidden flex flex-col font-mono relative
        ${className}
      `}
    >
      {/* Scanning Line sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline-sweep" />
      </div>

      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/60 border-b border-[#00ff9f11]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] animate-pulse" />
          <span className="text-xs text-[#00ff9f88] font-bold tracking-widest uppercase">
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
          <p className="text-[10px] text-[#00ff9f66]">
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
            <div className="text-[#00ff9f] text-3xl animate-bounce">✔</div>
            <div className="text-sm font-bold text-white uppercase tracking-widest">
              ACCESS GRANTED
            </div>
            <p className="text-[10px] text-[#00ff9f77]">
              Welcome back, administrator. Redirecting to core mainframe...
            </p>
          </div>
        ) : loading ? (
          <div className="py-8 space-y-4">
            <CyberProgress value={progress} label="DECRYPTING KEYS" variant="green" />
            <p className="text-[9px] text-center text-[#00ff9f44] animate-pulse">
              establishing secure tunnel...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username Input */}
            <div className="space-y-1">
              <label className="block text-[10px] text-[#00ff9f66] uppercase">
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
              <label className="block text-[10px] text-[#00ff9f66] uppercase">
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
