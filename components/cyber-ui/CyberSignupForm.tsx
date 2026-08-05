'use client';

import React, { useState } from 'react';
import CyberButton from './CyberButton';
import CyberInput from './CyberInput';
import CyberCheckbox from './CyberCheckbox';
import CyberAlert from './CyberAlert';
import CyberProgress from './CyberProgress';

interface CyberSignupFormProps {
  onSuccess?: (data: any) => void;
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
      className={`
        border border-[#00ff9f22] bg-[#0a0a0aee] shadow-[0_0_40px_rgba(0,255,159,0.1)]
        rounded-lg max-w-sm w-full overflow-hidden flex flex-col font-mono relative
        ${className}
      `}
    >
      {/* Laser line sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline-sweep" />
      </div>

      {/* Title Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/60 border-b border-[#00ff9f11]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff9f] animate-pulse" />
          <span className="text-xs text-[#00ff9f88] font-bold tracking-widest uppercase">
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
          <p className="text-[9px] text-[#00ff9f66] mt-0.5">
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
            <div className="text-[#00ff9f] text-3xl animate-bounce">▣</div>
            <div className="text-xs font-bold text-white uppercase tracking-widest">
              IDENTITY GENERATED
            </div>
            <p className="text-[10px] text-[#00ff9f77]">
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
              <label className="block text-[9px] text-[#00ff9f66] uppercase">Operator Handle</label>
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
              <label className="block text-[9px] text-[#00ff9f66] uppercase">Routing Address</label>
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
              <label className="block text-[9px] text-[#00ff9f66] uppercase">Passphrase Hash</label>
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
              <label className="block text-[9px] text-[#00ff9f66] uppercase">PGP Public Key (Optional)</label>
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
