'use client';

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
    <div className={`w-full max-w-md ${className}`}>
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
