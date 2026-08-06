'use client';

import React, { useState } from 'react';

// Import components
import MatrixRain from '@/components/MatrixRain';
import TerminalHero from '@/components/TerminalHero';
import HackerDashboard from '@/components/HackerDashboard';
import ProjectCard from '@/components/ProjectCard';
import SkillsSection from '@/components/SkillsSection';
import CyberButton from '@/components/cyber-ui/CyberButton';
import CyberInput from '@/components/cyber-ui/CyberInput';
import CyberPanel from '@/components/cyber-ui/CyberPanel';
import CyberBadge from '@/components/cyber-ui/CyberBadge';
import GlitchText from '@/components/cyber-ui/GlitchText';
import CyberStatusLine from '@/components/cyber-ui/CyberStatusLine';
import CyberActionCard from '@/components/cyber-ui/CyberActionCard';
import CyberConsoleBox from '@/components/cyber-ui/CyberConsoleBox';
import CyberTabs from '@/components/cyber-ui/CyberTabs';
import CyberSwitch from '@/components/cyber-ui/CyberSwitch';
import CyberCheckbox from '@/components/cyber-ui/CyberCheckbox';
import CyberDialog from '@/components/cyber-ui/CyberDialog';
import CyberProgress from '@/components/cyber-ui/CyberProgress';
import CyberAlert from '@/components/cyber-ui/CyberAlert';
import CyberLoginForm from '@/components/cyber-ui/CyberLoginForm';
import CyberSignupForm from '@/components/cyber-ui/CyberSignupForm';
import CyberSystemDashboard from '@/components/cyber-ui/CyberSystemDashboard';
import CyberDataForm from '@/components/cyber-ui/CyberDataForm';
import InteractiveConsole from '@/components/cyber-ui/InteractiveConsole';
import TargetNetworkMap from '@/components/cyber-ui/TargetNetworkMap';
import CyberPulseRadar from '@/components/cyber-ui/CyberPulseRadar';
import TextDecryptor from '@/components/cyber-ui/TextDecryptor';
import HologramContainer from '@/components/cyber-ui/HologramContainer';

import { SOURCE_CODES } from '@/components/showroom/sourceCodes';
import ShowroomHeader from '@/components/showroom/ShowroomHeader';
import ShowroomSidebar from '@/components/showroom/ShowroomSidebar';
import InstallationGuide from '@/components/showroom/InstallationGuide';

export default function UIKitShowroom() {
  const [activeTab, setActiveTab] = useState<'MatrixRain' | 'TerminalHero' | 'HackerDashboard' | 'ProjectCard' | 'SkillsSection' | 'CyberButton' | 'CyberInput' | 'CyberPanel' | 'CyberBadge' | 'GlitchText' | 'CyberStatusLine' | 'CyberActionCard' | 'CyberConsoleBox' | 'CyberTabs' | 'CyberSwitch' | 'CyberCheckbox' | 'CyberDialog' | 'CyberProgress' | 'CyberAlert' | 'CyberLoginForm' | 'CyberSignupForm' | 'CyberSystemDashboard' | 'CyberDataForm' | 'InteractiveConsole' | 'TargetNetworkMap' | 'CyberPulseRadar' | 'TextDecryptor' | 'HologramContainer' | 'installation'>('installation');
  const [codeTab, setCodeTab] = useState<'jsx' | 'raw'>('jsx');
  const [copied, setCopied] = useState(false);

  // States for Playground Props - New Components
  const [radarVariant, setRadarVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [radarSpeed, setRadarSpeed] = useState(4);
  const [radarShowGrid, setRadarShowGrid] = useState(true);

  const [decryptText, setDecryptText] = useState('DECRYPTING SECURE CHANNELS');
  const [decryptSpeed, setDecryptSpeed] = useState(40);
  const [decryptTrigger, setDecryptTrigger] = useState<'mount' | 'hover' | 'click'>('mount');
  const [decryptVariant, setDecryptVariant] = useState<'green' | 'cyan' | 'red' | 'amber' | 'none'>('green');
  const [decryptGlow, setDecryptGlow] = useState(true);

  const [holoVariant, setHoloVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('cyan');
  const [holoFlicker, setHoloFlicker] = useState(true);
  const [holoScanlines, setHoloScanlines] = useState(true);
  const [holoNoise, setHoloNoise] = useState(true);

  // States for Playground Props
  const [btnVariant, setBtnVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [btnCut, setBtnCut] = useState(true);
  const [btnGlitch, setBtnGlitch] = useState(true);
  const [btnGlow, setBtnGlow] = useState(true);

  const [inputVariant, setInputVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [inputPrompt, setInputPrompt] = useState('root@kali:~#');
  const [inputGlow, setInputGlow] = useState(true);

  const [panelVariant, setPanelVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [panelTitle, setPanelTitle] = useState('SYSTEM LOGS');
  const [panelStatus, setPanelStatus] = useState('active');
  const [panelControls, setPanelControls] = useState(true);
  const [panelGlow, setPanelGlow] = useState(true);

  const [badgeVariant, setBadgeVariant] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [badgeBrackets, setBadgeBrackets] = useState(true);
  const [badgeText, setBadgeText] = useState('critical');

  const [glitchValue, setGlitchValue] = useState('ACCESS_GRANTED');
  const [glitchTrigger, setGlitchTrigger] = useState<'hover' | 'always'>('hover');
  const [glitchGlow, setGlitchGlow] = useState(true);

  const [rainColor, setRainColor] = useState('#00ff9f');
  const [rainSpeed, setRainSpeed] = useState(0.5);
  const [rainSize, setRainSize] = useState(13);
  const [rainOpacity, setRainOpacity] = useState(0.4);
  const [rainChars, setRainChars] = useState<'all' | 'katakana' | 'binary' | 'hex'>('all');

  const [statusText, setStatusText] = useState('scan complete');
  const [statusDetail, setStatusDetail] = useState('entries indexed');
  const [statusCount, setStatusCount] = useState('6');
  const [statusAddress, setStatusAddress] = useState('192.168.1.42:~/projects');
  const [statusColor, setStatusColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [actionLabel, setActionLabel] = useState('Decrypt Key');
  const [actionValue, setActionValue] = useState('0x3f5c9e2b10ad...');
  const [actionCommand, setActionCommand] = useState('$ decrypt --key 0x9f');
  const [actionDesc, setActionDesc] = useState('RSA key decryptor');
  const [actionIcon, setActionIcon] = useState('[⚡]');
  const [actionColor, setActionColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [consoleCommand, setConsoleCommand] = useState('$ lscpu | grep model');
  const [consoleContent, setConsoleContent] = useState('Model name: Intel(R) Xeon(R) Gold\nCPU family: 6\nStepping: 4');
  const [consoleColor, setConsoleColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [consoleGlow, setConsoleGlow] = useState(true);

  const [tabsActiveId, setTabsActiveId] = useState('tab1');
  const [tabsColor, setTabsColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [switchChecked, setSwitchChecked] = useState(true);
  const [switchColor, setSwitchColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [checkboxColor, setCheckboxColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogColor, setDialogColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [dialogTitle, setDialogTitle] = useState('EXECUTION ALERT');

  const [progressVal, setProgressVal] = useState(75);
  const [progressType, setProgressType] = useState<'block' | 'line'>('block');
  const [progressColor, setProgressColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('green');
  const [progressLabel, setProgressLabel] = useState('SYS_OVERCLOCK');

  const [alertColor, setAlertColor] = useState<'green' | 'cyan' | 'red' | 'amber'>('red');
  const [alertTitle, setAlertTitle] = useState('BACKDOOR DETECTED');
  const [alertText, setAlertText] = useState('An unauthorized backdoor listener was opened on port 4444. System integrity might be compromised.');

  const triggerCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate dynamic JSX based on props
  const getDynamicJSX = () => {
    switch (activeTab) {
      case 'CyberButton':
        return `<CyberButton
  variant="${btnVariant}"
  size="${btnSize}"
  isCutCorner={${btnCut}}
  glitchOnHover={${btnGlitch}}
  glow={${btnGlow}}
>
  Execute Payloads
</CyberButton>`;
      case 'CyberInput':
        return `<CyberInput
  variant="${inputVariant}"
  prompt="${inputPrompt}"
  glow={${inputGlow}}
  placeholder="Enter backdoor commands..."
/>`;
      case 'CyberPanel':
        return `<CyberPanel
  title="${panelTitle}"
  status="${panelStatus}"
  variant="${panelVariant}"
  showControls={${panelControls}}
  glow={${panelGlow}}
>
  <div>$ netstat -antp</div>
  <div className="text-white/70">tcp 0 0 192.168.1.42:22 192.168.1.105:49811 ESTABLISHED</div>
</CyberPanel>`;
      case 'CyberBadge':
        return `<CyberBadge
  variant="${badgeVariant}"
  brackets={${badgeBrackets}}
>
  ${badgeText}
</CyberBadge>`;
      case 'GlitchText':
        return `<GlitchText
  text="${glitchValue}"
  trigger="${glitchTrigger}"
  glow={${glitchGlow}}
/>`;
      case 'MatrixRain':
        return `<MatrixRain
  color="${rainColor}"
  speed={${rainSpeed}}
  fontSize={${rainSize}}
  opacity={${rainOpacity}}
  charType="${rainChars}"
/>`;
      case 'CyberStatusLine':
        return `<CyberStatusLine
  status="${statusText}"
  detail="${statusDetail}"
  count="${statusCount}"
  address="${statusAddress}"
  stateColor="${statusColor}"
/>`;
      case 'CyberActionCard':
        return `<CyberActionCard
  label="${actionLabel}"
  value="${actionValue}"
  command="${actionCommand}"
  description="${actionDesc}"
  icon="${actionIcon}"
  variant="${actionColor}"
/>`;
      case 'CyberConsoleBox':
        return `<CyberConsoleBox
  command="${consoleCommand}"
  content={\`${consoleContent.replace(/\n/g, '\\n')}\`}
  variant="${consoleColor}"
  glow={${consoleGlow}}
/>`;
      case 'CyberTabs':
        return `<CyberTabs
  tabs={[
    { id: 'tab1', label: 'ALL_HOSTS', count: 12 },
    { id: 'tab2', label: 'ACTIVE_EXPLOITS', count: 3 },
    { id: 'tab3', label: 'DISCONNECTED', count: 9 }
  ]}
  activeTabId="${tabsActiveId}"
  onChange={(id) => console.log(id)}
  variant="${tabsColor}"
/>`;
      case 'CyberSwitch':
        return `<CyberSwitch
  checked={${switchChecked}}
  onChange={(val) => console.log(val)}
  label="PORT_SCANNER"
  variant="${switchColor}"
/>`;
      case 'CyberCheckbox':
        return `<CyberCheckbox
  checked={${checkboxChecked}}
  onChange={(val) => console.log(val)}
  label="ENABLE_PROXY"
  variant="${checkboxColor}"
/>`;
      case 'CyberDialog':
        return `<CyberDialog
  isOpen={${dialogOpen}}
  onClose={() => console.log('close')}
  title="${dialogTitle}"
  variant="${dialogColor}"
>
  <p>Warning: Access is unauthorized. Triggering counter-measures.</p>
</CyberDialog>`;
      case 'CyberProgress':
        return `<CyberProgress
  value={${progressVal}}
  label="${progressLabel}"
  type="${progressType}"
  variant="${progressColor}"
/>`;
      case 'CyberAlert':
        return `<CyberAlert
  title="${alertTitle}"
  variant="${alertColor}"
  onAction={() => alert('Mitigated')}
  actionText="MITIGATE"
>
  ${alertText}
</CyberAlert>`;
      case 'CyberLoginForm':
        return `<CyberLoginForm onSuccess={(user) => console.log(user)} />`;
      case 'CyberSignupForm':
        return `<CyberSignupForm onSuccess={(data) => console.log(data)} />`;
      case 'CyberSystemDashboard':
        return `<CyberSystemDashboard />`;
      case 'CyberDataForm':
        return `<CyberDataForm />`;
      case 'InteractiveConsole':
        return `<InteractiveConsole />`;
      case 'TargetNetworkMap':
        return `<TargetNetworkMap />`;
      case 'TerminalHero':
        return `<TerminalHero
  title="CYBER_SHELL"
  subtitle="INTERACTIVE TERMINAL UI KIT"
  badgeText="SYS_ADMIN SECURITY AUDIT"
/>`;
      case 'HackerDashboard':
        return `<HackerDashboard
  scanInterval={1100}
  logInterval={1400}
  bruteInterval={600}
  hexInterval={700}
/>`;
      case 'ProjectCard':
        return `<ProjectCard
  title="Quantum Shield"
  description="Lattice cryptography software firewall designed for embedded ARM architectures."
  tags={["ARM", "Rust", "Crypto"]}
  status="active"
  year={2026}
/>`;
      case 'SkillsSection':
        return `<SkillsSection
  title="System Audit Skills"
  commandPrefix="$ cat audit_skills.txt"
/>`;
      case 'CyberPulseRadar':
        return `<CyberPulseRadar
  variant="${radarVariant}"
  speed={${radarSpeed}}
  showGrid={${radarShowGrid}}
/>`;
      case 'TextDecryptor':
        return `<TextDecryptor
  text="${decryptText}"
  speed={${decryptSpeed}}
  trigger="${decryptTrigger}"
  variant="${decryptVariant}"
  glow={${decryptGlow}}
/>`;
      case 'HologramContainer':
        return `<HologramContainer
  variant="${holoVariant}"
  flicker={${holoFlicker}}
  scanlines={${holoScanlines}}
  noise={${holoNoise}}
>
  <div className="p-4 text-center">
    <h3 className="text-lg font-bold">HOLOGRAM FEED ACTIVE</h3>
    <p className="text-xs mt-2">STREAMING LIVE PROTOCOLS...</p>
  </div>
</HologramContainer>`;
      default:
        return '';
    }
  };

  const getSourceCode = () => {
    return SOURCE_CODES[activeTab as keyof typeof SOURCE_CODES] || '// Source code is embedded in component/template files.';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff9f] font-mono flex flex-col relative overflow-hidden">
      {/* Scanline element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="scanline-sweep" />
      </div>
      <div className="absolute inset-0 pointer-events-none crt-noise z-20" />

      {/* Header */}
      <ShowroomHeader />

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <ShowroomSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {activeTab === 'installation' ? (
            <InstallationGuide setActiveTab={setActiveTab} />
          ) : (
            /* Interactive Component Playground */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
              {/* Left Column: Preview */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>⚡ PLAYGROUND //</span>
                    <span className="text-[#00ff9f] font-mono">{activeTab}</span>
                  </h3>
                </div>

                <div className="flex-1 min-h-[350px] max-h-[600px] overflow-y-auto border border-[#00ff9f22] bg-[#080808]/90 rounded-lg p-6 flex items-center justify-center relative scrollbar-thin">
                  {/* Active Preview Rendering */}
                  {activeTab === 'MatrixRain' && (
                    <div className="absolute inset-0 bg-[#0a0a0a]">
                      <MatrixRain
                        color={rainColor}
                        speed={rainSpeed}
                        fontSize={rainSize}
                        opacity={rainOpacity}
                        charType={rainChars}
                      />
                      <div className="absolute bottom-3 left-3 text-[10px] text-white/50 bg-black/70 px-2 py-1 rounded font-mono">
                        Active Matrix Simulation
                      </div>
                    </div>
                  )}

                  {activeTab === 'TerminalHero' && (
                    <div className="w-full h-full overflow-y-auto">
                      <TerminalHero
                        title="CYBER_SHELL"
                        subtitle="INTERACTIVE TERMINAL UI KIT"
                        badgeText="SYS_ADMIN SECURITY AUDIT"
                        loopAnimation={true}
                      />
                    </div>
                  )}

                  {activeTab === 'HackerDashboard' && (
                    <div className="w-full h-full overflow-y-auto">
                      <HackerDashboard />
                    </div>
                  )}

                  {activeTab === 'ProjectCard' && (
                    <div className="w-96 max-w-full">
                      <ProjectCard
                        title="Quantum Shield"
                        description="Lattice cryptography software firewall designed for embedded ARM architectures."
                        tags={['ARM', 'Rust', 'Crypto']}
                        status="active"
                        year={2026}
                      />
                    </div>
                  )}

                  {activeTab === 'SkillsSection' && (
                    <div className="w-full overflow-y-auto max-h-[280px]">
                      <SkillsSection
                        title="System Audit Skills"
                        commandPrefix="$ cat audit_skills.txt"
                      />
                    </div>
                  )}

                  {activeTab === 'CyberButton' && (
                    <CyberButton
                      variant={btnVariant}
                      size={btnSize}
                      isCutCorner={btnCut}
                      glitchOnHover={btnGlitch}
                      glow={btnGlow}
                    >
                      Execute Payloads
                    </CyberButton>
                  )}

                  {activeTab === 'CyberInput' && (
                    <div className="w-80 max-w-full">
                      <CyberInput
                        variant={inputVariant}
                        prompt={inputPrompt}
                        glow={inputGlow}
                        placeholder="Enter backdoor commands..."
                      />
                    </div>
                  )}

                  {activeTab === 'CyberPanel' && (
                    <div className="w-96 h-48 max-w-full">
                      <CyberPanel
                        title={panelTitle}
                        status={panelStatus}
                        variant={panelVariant}
                        showControls={panelControls}
                        glow={panelGlow}
                      >
                        <div className="text-[#00ff9f99]">$ netstat -antp</div>
                        <div className="text-white/70">tcp 0 0 192.168.1.42:22 192.168.1.105:49811 ESTABLISHED</div>
                      </CyberPanel>
                    </div>
                  )}

                  {activeTab === 'CyberBadge' && (
                    <div className="flex gap-2">
                      <CyberBadge variant={badgeVariant} brackets={badgeBrackets}>
                        {badgeText}
                      </CyberBadge>
                    </div>
                  )}

                  {activeTab === 'GlitchText' && (
                    <h2 className="text-2xl font-bold font-mono text-[#00ff9f]">
                      <GlitchText
                        text={glitchValue}
                        trigger={glitchTrigger}
                        glow={glitchGlow}
                      />
                    </h2>
                  )}

                  {activeTab === 'CyberStatusLine' && (
                    <div className="w-full max-w-md px-4">
                      <CyberStatusLine
                        status={statusText}
                        detail={statusDetail}
                        count={statusCount}
                        address={statusAddress}
                        stateColor={statusColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberActionCard' && (
                    <div className="w-96 max-w-full">
                      <CyberActionCard
                        label={actionLabel}
                        value={actionValue}
                        command={actionCommand}
                        description={actionDesc}
                        icon={actionIcon}
                        variant={actionColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberConsoleBox' && (
                    <div className="w-full max-w-md">
                      <CyberConsoleBox
                        command={consoleCommand}
                        content={consoleContent}
                        variant={consoleColor}
                        glow={consoleGlow}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberTabs' && (
                    <div className="w-full max-w-md">
                      <CyberTabs
                        tabs={[
                          { id: 'tab1', label: 'ALL_HOSTS', count: 12 },
                          { id: 'tab2', label: 'ACTIVE_EXPLOITS', count: 3 },
                          { id: 'tab3', label: 'DISCONNECTED', count: 9 }
                        ]}
                        activeTabId={tabsActiveId}
                        onChange={(id) => setTabsActiveId(id)}
                        variant={tabsColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberSwitch' && (
                    <div className="flex gap-2">
                      <CyberSwitch
                        checked={switchChecked}
                        onChange={(val) => setSwitchChecked(val)}
                        label="PORT_SCANNER"
                        variant={switchColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberCheckbox' && (
                    <div className="flex gap-2">
                      <CyberCheckbox
                        checked={checkboxChecked}
                        onChange={(val) => setCheckboxChecked(val)}
                        label="ENABLE_PROXY"
                        variant={checkboxColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberDialog' && (
                    <div className="flex flex-col gap-4 items-center">
                      <CyberButton variant={dialogColor} size="sm" onClick={() => setDialogOpen(true)}>
                        Trigger Dialog Window
                      </CyberButton>
                      <CyberDialog
                        isOpen={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                        title={dialogTitle}
                        variant={dialogColor}
                        actions={
                          <div className="flex gap-2">
                            <CyberButton variant={dialogColor} size="sm" onClick={() => setDialogOpen(false)}>
                              ABORT
                            </CyberButton>
                            <CyberButton variant={dialogColor} size="sm" onClick={() => { alert('PROCEEDING'); setDialogOpen(false); }}>
                              EXECUTE
                            </CyberButton>
                          </div>
                        }
                      >
                        <p className="mb-2">Warning: Access to mainframe database is strictly unauthorized.</p>
                        <p>Triggering counter-measures to encrypt local device files in T-minus 10 seconds.</p>
                      </CyberDialog>
                    </div>
                  )}

                  {activeTab === 'CyberProgress' && (
                    <div className="w-80 max-w-full">
                      <CyberProgress
                        value={progressVal}
                        label={progressLabel}
                        type={progressType}
                        variant={progressColor}
                      />
                    </div>
                  )}

                  {activeTab === 'CyberAlert' && (
                    <div className="w-full px-4">
                      <CyberAlert
                        title={alertTitle}
                        variant={alertColor}
                        onAction={() => alert('Threat fully mitigated')}
                        actionText="MITIGATE"
                      >
                        {alertText}
                      </CyberAlert>
                    </div>
                  )}

                  {activeTab === 'CyberLoginForm' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <CyberLoginForm onSuccess={(user) => alert(`Logged in: ${user}`)} />
                    </div>
                  )}

                  {activeTab === 'CyberSignupForm' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <CyberSignupForm onSuccess={(data) => alert(`Registered handle: ${data.username}`)} />
                    </div>
                  )}

                  {activeTab === 'CyberSystemDashboard' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <CyberSystemDashboard />
                    </div>
                  )}

                  {activeTab === 'CyberDataForm' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <CyberDataForm />
                    </div>
                  )}

                  {activeTab === 'InteractiveConsole' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <InteractiveConsole />
                    </div>
                  )}

                  {activeTab === 'TargetNetworkMap' && (
                    <div className="w-full flex items-center justify-center p-2">
                      <TargetNetworkMap />
                    </div>
                  )}

                  {activeTab === 'CyberPulseRadar' && (
                    <div className="w-full p-2">
                      <CyberPulseRadar
                        variant={radarVariant}
                        speed={radarSpeed}
                        showGrid={radarShowGrid}
                      />
                    </div>
                  )}

                  {activeTab === 'TextDecryptor' && (
                    <div className="w-full flex flex-col items-center justify-center p-6 border border-[#1a2e1a] rounded bg-black/40 min-h-[150px]">
                      <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-4">
                        [ Decryption Stream ]
                      </span>
                      <TextDecryptor
                        text={decryptText}
                        speed={decryptSpeed}
                        trigger={decryptTrigger}
                        variant={decryptVariant}
                        glow={decryptGlow}
                        className="text-lg font-bold"
                      />
                      {decryptTrigger !== 'mount' && (
                        <p className="text-[9px] text-[#00ff9f55] mt-4 uppercase tracking-wider">
                          ({decryptTrigger === 'click' ? 'Click text to decrypt' : 'Hover over text to decrypt'})
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === 'HologramContainer' && (
                    <div className="w-full p-2">
                      <HologramContainer
                        variant={holoVariant}
                        flicker={holoFlicker}
                        scanlines={holoScanlines}
                        noise={holoNoise}
                        className="w-full"
                      >
                        <div className="p-6 text-center space-y-3">
                          <h3 className="text-base font-bold tracking-widest text-white">HOLOGRAM LINK ESTABLISHED</h3>
                          <div className="h-px bg-white/10 w-24 mx-auto my-2" />
                          <p className="text-xs text-white/70 leading-relaxed max-w-sm mx-auto font-mono">
                            Receiving encrypted telemetry stream from main uplink. Signal integrity remains nominal.
                          </p>
                          <div className="text-[10px] text-white/30 font-mono">
                            PACKETS: 512/512 | ERROR_RATE: 0.00%
                          </div>
                        </div>
                      </HologramContainer>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Controls & Code Viewer */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Props Controller Panel */}
                <div className="border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] p-4 flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-white uppercase border-b border-[#1a2e1a] pb-2">
                    ⬡ Configure Props
                  </h4>

                  {/* CyberPulseRadar Controls */}
                  {activeTab === 'CyberPulseRadar' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Radar Theme (Variant):</label>
                        <select
                          value={radarVariant}
                          onChange={(e) => setRadarVariant(e.target.value as any)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Green (Standard Sonar)</option>
                          <option value="cyan">Cyan (Tech HUD)</option>
                          <option value="red">Red (Warning Alarm)</option>
                          <option value="amber">Amber (Stealth Mode)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Sweep Interval: {radarSpeed}s</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={radarSpeed}
                          onChange={(e) => setRadarSpeed(parseFloat(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="radar-show-grid"
                          checked={radarShowGrid}
                          onChange={(e) => setRadarShowGrid(e.target.checked)}
                          className="accent-[#00ff9f]"
                        />
                        <label htmlFor="radar-show-grid" className="text-white/70 cursor-pointer">
                          Render Radar Grid Rings
                        </label>
                      </div>
                    </div>
                  )}

                  {/* TextDecryptor Controls */}
                  {activeTab === 'TextDecryptor' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Text Payload:</label>
                        <input
                          type="text"
                          value={decryptText}
                          onChange={(e) => setDecryptText(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Theme (Variant):</label>
                        <select
                          value={decryptVariant}
                          onChange={(e) => setDecryptVariant(e.target.value as any)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Green (Binary Link)</option>
                          <option value="cyan">Cyan (Data Feed)</option>
                          <option value="red">Red (Breached Payload)</option>
                          <option value="amber">Amber (Stealth Node)</option>
                          <option value="none">None (Inherit Style)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Trigger Event:</label>
                        <select
                          value={decryptTrigger}
                          onChange={(e) => setDecryptTrigger(e.target.value as any)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="mount">Initial Mount (Auto-play)</option>
                          <option value="hover">On Hover</option>
                          <option value="click">On Click</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Speed: {decryptSpeed}ms</label>
                        <input
                          type="range"
                          min="10"
                          max="150"
                          step="5"
                          value={decryptSpeed}
                          onChange={(e) => setDecryptSpeed(parseInt(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="decrypt-glow"
                          checked={decryptGlow}
                          onChange={(e) => setDecryptGlow(e.target.checked)}
                          className="accent-[#00ff9f]"
                        />
                        <label htmlFor="decrypt-glow" className="text-white/70 cursor-pointer">
                          Neon Glow Filter
                        </label>
                      </div>
                    </div>
                  )}

                  {/* HologramContainer Controls */}
                  {activeTab === 'HologramContainer' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Projection Color:</label>
                        <select
                          value={holoVariant}
                          onChange={(e) => setHoloVariant(e.target.value as any)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Green (Legacy CRT)</option>
                          <option value="cyan">Cyan (Holo Projector)</option>
                          <option value="red">Red (Intruder Alert)</option>
                          <option value="amber">Amber (Warning Feed)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="holo-flicker"
                            checked={holoFlicker}
                            onChange={(e) => setHoloFlicker(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          <label htmlFor="holo-flicker" className="text-white/70 cursor-pointer">
                            Holo Screen Flicker
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="holo-scanlines"
                            checked={holoScanlines}
                            onChange={(e) => setHoloScanlines(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          <label htmlFor="holo-scanlines" className="text-white/70 cursor-pointer">
                            Floating CRT Scanlines
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="holo-noise"
                            checked={holoNoise}
                            onChange={(e) => setHoloNoise(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          <label htmlFor="holo-noise" className="text-white/70 cursor-pointer">
                            Holographic Noise Texture
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MatrixRain Controls */}
                  {activeTab === 'MatrixRain' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color (Hex):</label>
                        <input
                          type="text"
                          value={rainColor}
                          onChange={(e) => setRainColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Speed: {rainSpeed}</label>
                        <input
                          type="range"
                          min="0.1"
                          max="2"
                          step="0.1"
                          value={rainSpeed}
                          onChange={(e) => setRainSpeed(parseFloat(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Font Size: {rainSize}px</label>
                        <input
                          type="range"
                          min="8"
                          max="24"
                          value={rainSize}
                          onChange={(e) => setRainSize(parseInt(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Opacity: {rainOpacity}</label>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={rainOpacity}
                          onChange={(e) => setRainOpacity(parseFloat(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Characters Set:</label>
                        <select
                          value={rainChars}
                          onChange={(e: any) => setRainChars(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="all">All Combined</option>
                          <option value="katakana">Japanese Katakana</option>
                          <option value="binary">Binary (01)</option>
                          <option value="hex">Hexadecimal</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberButton Controls */}
                  {activeTab === 'CyberButton' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color Variant:</label>
                        <select
                          value={btnVariant}
                          onChange={(e: any) => setBtnVariant(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Size:</label>
                        <select
                          value={btnSize}
                          onChange={(e: any) => setBtnSize(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="sm">Small</option>
                          <option value="md">Medium</option>
                          <option value="lg">Large</option>
                        </select>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={btnCut}
                            onChange={(e) => setBtnCut(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Cut Corner
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={btnGlitch}
                            onChange={(e) => setBtnGlitch(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glitch Hover
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={btnGlow}
                            onChange={(e) => setBtnGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glow Shadow
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberInput Controls */}
                  {activeTab === 'CyberInput' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color Variant:</label>
                        <select
                          value={inputVariant}
                          onChange={(e: any) => setInputVariant(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Prompt Prefix:</label>
                        <input
                          type="text"
                          value={inputPrompt}
                          onChange={(e) => setInputPrompt(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={inputGlow}
                            onChange={(e) => setInputGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glow Focus
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberPanel Controls */}
                  {activeTab === 'CyberPanel' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color Variant:</label>
                        <select
                          value={panelVariant}
                          onChange={(e: any) => setPanelVariant(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Title:</label>
                        <input
                          type="text"
                          value={panelTitle}
                          onChange={(e) => setPanelTitle(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Status Text:</label>
                        <input
                          type="text"
                          value={panelStatus}
                          onChange={(e) => setPanelStatus(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div className="flex gap-4 mt-1">
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={panelControls}
                            onChange={(e) => setPanelControls(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Show Dots
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70">
                          <input
                            type="checkbox"
                            checked={panelGlow}
                            onChange={(e) => setPanelGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glow Hover
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberBadge Controls */}
                  {activeTab === 'CyberBadge' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Color Variant:</label>
                        <select
                          value={badgeVariant}
                          onChange={(e: any) => setBadgeVariant(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Badge Text:</label>
                        <input
                          type="text"
                          value={badgeText}
                          onChange={(e) => setBadgeText(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={badgeBrackets}
                            onChange={(e) => setBadgeBrackets(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Render brackets `[ ]`
                        </label>
                      </div>
                    </div>
                  )}

                  {/* GlitchText Controls */}
                  {activeTab === 'GlitchText' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Text Value:</label>
                        <input
                          type="text"
                          value={glitchValue}
                          onChange={(e) => setGlitchValue(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Trigger condition:</label>
                        <select
                          value={glitchTrigger}
                          onChange={(e: any) => setGlitchTrigger(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="hover">Hover</option>
                          <option value="always">Always Loop</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={glitchGlow}
                            onChange={(e) => setGlitchGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Text Glow
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberStatusLine Controls */}
                  {activeTab === 'CyberStatusLine' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Status Title:</label>
                        <input
                          type="text"
                          value={statusText}
                          onChange={(e) => setStatusText(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Detail Text:</label>
                        <input
                          type="text"
                          value={statusDetail}
                          onChange={(e) => setStatusDetail(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Count:</label>
                        <input
                          type="text"
                          value={statusCount}
                          onChange={(e) => setStatusCount(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">IP / Host Address:</label>
                        <input
                          type="text"
                          value={statusAddress}
                          onChange={(e) => setStatusAddress(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Pulsing Dot Color:</label>
                        <select
                          value={statusColor}
                          onChange={(e: any) => setStatusColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Green (OK)</option>
                          <option value="cyan">Cyan (SYS)</option>
                          <option value="amber">Amber (WARN)</option>
                          <option value="red">Red (CRIT)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberActionCard Controls */}
                  {activeTab === 'CyberActionCard' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Label:</label>
                        <input
                          type="text"
                          value={actionLabel}
                          onChange={(e) => setActionLabel(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Sub Value:</label>
                        <input
                          type="text"
                          value={actionValue}
                          onChange={(e) => setActionValue(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Command Prompt:</label>
                        <input
                          type="text"
                          value={actionCommand}
                          onChange={(e) => setActionCommand(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Description:</label>
                        <input
                          type="text"
                          value={actionDesc}
                          onChange={(e) => setActionDesc(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">ASCII Icon Symbol:</label>
                        <input
                          type="text"
                          value={actionIcon}
                          onChange={(e) => setActionIcon(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Card Theme Color:</label>
                        <select
                          value={actionColor}
                          onChange={(e: any) => setActionColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberConsoleBox Controls */}
                  {activeTab === 'CyberConsoleBox' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Shell command prompt:</label>
                        <input
                          type="text"
                          value={consoleCommand}
                          onChange={(e) => setConsoleCommand(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Raw Output Content:</label>
                        <textarea
                          rows={3}
                          value={consoleContent}
                          onChange={(e) => setConsoleContent(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Console Color:</label>
                        <select
                          value={consoleColor}
                          onChange={(e: any) => setConsoleColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={consoleGlow}
                            onChange={(e) => setConsoleGlow(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Glow Shadow
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberTabs Controls */}
                  {activeTab === 'CyberTabs' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Selected Tab:</label>
                        <select
                          value={tabsActiveId}
                          onChange={(e) => setTabsActiveId(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="tab1">ALL_HOSTS (Tab 1)</option>
                          <option value="tab2">ACTIVE_EXPLOITS (Tab 2)</option>
                          <option value="tab3">DISCONNECTED (Tab 3)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Tabs Theme Color:</label>
                        <select
                          value={tabsColor}
                          onChange={(e: any) => setTabsColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberSwitch Controls */}
                  {activeTab === 'CyberSwitch' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Switch Color Theme:</label>
                        <select
                          value={switchColor}
                          onChange={(e: any) => setSwitchColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={switchChecked}
                            onChange={(e) => setSwitchChecked(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Checked Status
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberCheckbox Controls */}
                  {activeTab === 'CyberCheckbox' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Checkbox Color Theme:</label>
                        <select
                          value={checkboxColor}
                          onChange={(e: any) => setCheckboxColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 cursor-pointer text-white/70 mt-1">
                          <input
                            type="checkbox"
                            checked={checkboxChecked}
                            onChange={(e) => setCheckboxChecked(e.target.checked)}
                            className="accent-[#00ff9f]"
                          />
                          Checked Status
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CyberDialog Controls */}
                  {activeTab === 'CyberDialog' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Title:</label>
                        <input
                          type="text"
                          value={dialogTitle}
                          onChange={(e) => setDialogTitle(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Dialog Color Theme:</label>
                        <select
                          value={dialogColor}
                          onChange={(e: any) => setDialogColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberProgress Controls */}
                  {activeTab === 'CyberProgress' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Progress Level: {progressVal}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progressVal}
                          onChange={(e) => setProgressVal(parseInt(e.target.value))}
                          className="w-full accent-[#00ff9f]"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Progress Design Type:</label>
                        <select
                          value={progressType}
                          onChange={(e: any) => setProgressType(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="block">Retro Monospace Blocks [■■■□□]</option>
                          <option value="line">Modern Neon Glow Line</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Label Text:</label>
                        <input
                          type="text"
                          value={progressLabel}
                          onChange={(e) => setProgressLabel(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Progress Color Theme:</label>
                        <select
                          value={progressColor}
                          onChange={(e: any) => setProgressColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="green">Neon Green</option>
                          <option value="cyan">Cyber Cyan</option>
                          <option value="red">Warning Red</option>
                          <option value="amber">Alert Amber</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CyberAlert Controls */}
                  {activeTab === 'CyberAlert' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-white/50 mb-1">Alert Title:</label>
                        <input
                          type="text"
                          value={alertTitle}
                          onChange={(e) => setAlertTitle(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Alert Description:</label>
                        <textarea
                          rows={2}
                          value={alertText}
                          onChange={(e) => setAlertText(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">Alert Color Theme:</label>
                        <select
                          value={alertColor}
                          onChange={(e: any) => setAlertColor(e.target.value)}
                          className="w-full bg-black border border-[#1a2e1a] px-2 py-1 text-[#00ff9f] outline-none rounded"
                        >
                          <option value="red">Warning Red (CRIT)</option>
                          <option value="amber">Alert Amber (WARN)</option>
                          <option value="cyan">Cyber Cyan (INFO)</option>
                          <option value="green">Neon Green (OK)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Fallback for templates without complex settings */}
                  {['CyberLoginForm', 'CyberSignupForm', 'CyberSystemDashboard', 'CyberDataForm', 'InteractiveConsole', 'TargetNetworkMap', 'TerminalHero', 'HackerDashboard', 'ProjectCard', 'SkillsSection'].includes(activeTab) && (
                    <p className="text-[11px] text-white/40 leading-relaxed font-mono">
                      This template component displays static configurations in the preview. Edit variables in standard implementation logic to adjust colors, grids, or data streams.
                    </p>
                  )}
                </div>

                {/* Code Snippets Viewer */}
                <div className="flex-1 border border-[#1a2e1a] rounded-lg bg-[#0d0d0d] overflow-hidden flex flex-col">
                  {/* Tab Selector */}
                  <div className="bg-neutral-900/50 border-b border-[#1a2e1a] flex text-[10px]">
                    <button
                      onClick={() => setCodeTab('jsx')}
                      className={`px-4 py-2 border-r border-[#1a2e1a] uppercase font-mono ${
                        codeTab === 'jsx' ? 'bg-[#0d0d0d] text-[#00ff9f] font-bold' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      Copy Component JSX
                    </button>
                    {SOURCE_CODES[activeTab as keyof typeof SOURCE_CODES] && (
                      <button
                        onClick={() => setCodeTab('raw')}
                        className={`px-4 py-2 border-r border-[#1a2e1a] uppercase font-mono ${
                          codeTab === 'raw' ? 'bg-[#0d0d0d] text-[#00ff9f] font-bold' : 'text-white/50 hover:text-white'
                        }`}
                      >
                        Raw Source Code (File content)
                      </button>
                    )}
                    <button
                      onClick={() => triggerCopy(codeTab === 'jsx' ? getDynamicJSX() : getSourceCode())}
                      className="ml-auto px-4 py-2 text-white/60 hover:text-[#00ff9f] hover:bg-[#00ff9f0d] flex items-center gap-1 select-none cursor-pointer"
                    >
                      {copied ? '✔ COPIED' : '⧉ COPY_CODE'}
                    </button>
                  </div>

                  {/* Pre/Code */}
                  <div className="flex-1 p-4 overflow-auto max-h-[300px] bg-black/60 relative">
                    <pre className="text-xs text-[#00ff9fcc] font-mono leading-5 whitespace-pre">
                      {codeTab === 'jsx' ? getDynamicJSX() : getSourceCode()}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
