#!/usr/bin/env node
/**
 * SifreleNet UI Kit — MCP Server
 * Model Context Protocol server for AI agents to interact with the UI kit.
 *
 * Usage in claude_desktop_config.json / mcp settings:
 * {
 *   "sifrelenet-ui-kit": {
 *     "command": "node",
 *     "args": ["/path/to/sifrelenet-ui-kit/cli/mcp-server.js"]
 *   }
 * }
 */

import { execSync } from 'child_process';
import * as readline from 'readline';

// ── Component registry (mirrors bin.js) ───────────────────────────────────────
const COMPONENTS = [
  { name: 'CyberButton',         category: 'primitives',  deps: ['framer-motion'],               internalDeps: [],                                                                         description: 'Cyberpunk neon button with cut-corner, glitch hover and glow effects. Props: variant (green|cyan|red|amber), size (sm|md|lg), isCutCorner, glitchOnHover, glow.' },
  { name: 'CyberInput',          category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Terminal-styled text input with prompt prefix and neon focus glow. Props: variant, prompt, glow, placeholder.' },
  { name: 'CyberPanel',          category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Frosted-glass terminal panel with title bar, status LED and resize controls. Props: title, status, variant, showControls, glow.' },
  { name: 'CyberBadge',          category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Inline monospace badge with optional bracket styling. Props: variant, brackets. Children: badge text.' },
  { name: 'GlitchText',          category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Text that glitches with RGB-shift on hover or always. Props: text, trigger (hover|always), glow.' },
  { name: 'CyberStatusLine',     category: 'primitives',  deps: ['lucide-react'],               internalDeps: [],                                                                         description: 'Terminal status bar line. Props: status, detail, count, address, stateColor.' },
  { name: 'CyberActionCard',     category: 'primitives',  deps: ['framer-motion'],               internalDeps: [],                                                                         description: 'Compact action card with label, value and command preview. Props: label, value, command, description, icon, variant.' },
  { name: 'CyberConsoleBox',     category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Terminal command + output display. Props: command, content, variant, glow.' },
  { name: 'CyberTabs',           category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Scanline-styled tab bar. Props: tabs (id, label, count), activeTabId, onChange, variant.' },
  { name: 'CyberSwitch',         category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Toggle switch with retro LED. Props: checked, onChange, label, variant.' },
  { name: 'CyberCheckbox',       category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Monospace checkbox with bracket styling. Props: checked, onChange, label, variant.' },
  { name: 'CyberDialog',         category: 'primitives',  deps: ['framer-motion','lucide-react'],internalDeps: ['CyberButton'],                                                           description: 'Modal dialog with framer-motion entrance. Props: isOpen, onClose, title, variant, actions (ReactNode).' },
  { name: 'CyberProgress',       category: 'primitives',  deps: [],                              internalDeps: [],                                                                         description: 'Retro block or neon line progress bar. Props: value (0-100), label, type (block|line), variant.' },
  { name: 'CyberAlert',          category: 'primitives',  deps: ['lucide-react'],               internalDeps: ['CyberBadge','CyberButton'],                                               description: 'System alert box with icon and action button. Props: title, variant, onAction, actionText. Children: message.' },
  { name: 'CyberTable',          category: 'advanced',    deps: [],                              internalDeps: [],                                                                         description: 'Monospace data table with CRT scanline overlay. Props: title, subtitle, variant, columns ([{key,header}]), data ([{...}]).' },
  { name: 'CyberTooltip',        category: 'advanced',    deps: [],                              internalDeps: [],                                                                         description: 'Neon bracketed tooltip. Props: content, position (top|bottom|left|right), variant, delay. Children: trigger element.' },
  { name: 'CyberToast',          category: 'advanced',    deps: ['lucide-react'],               internalDeps: [],                                                                         description: 'Provider + hook toast system. Usage: wrap app in <CyberToastProvider>, call useCyberToast() hook: toast({ title, message, variant }).' },
  { name: 'CyberCommandMenu',    category: 'advanced',    deps: ['lucide-react'],               internalDeps: [],                                                                         description: 'Spotlight-style ⌘K command palette overlay. Props: triggerKey, options ([{id, category, title, subtitle, action}]).' },
  { name: 'CyberAccordion',      category: 'advanced',    deps: ['lucide-react'],               internalDeps: [],                                                                         description: 'Collapsible accordion sections. Props: variant, allowMultiple, items ([{id, trigger, content}]).' },
  { name: 'CyberSlider',         category: 'advanced',    deps: [],                              internalDeps: [],                                                                         description: 'HUD-style range slider with gradient fill. Props: label, min, max, step, value, onChange, variant, showTicks.' },
  { name: 'CyberOtpInput',       category: 'advanced',    deps: [],                              internalDeps: [],                                                                         description: 'One-time password input with neon bracket corners and paste support. Props: length, value, onChange, variant.' },
  { name: 'CyberSkeleton',       category: 'advanced',    deps: [],                              internalDeps: [],                                                                         description: 'CRT signal sweep loading skeleton. Props: className, variant.' },
  { name: 'CyberBreadcrumb',     category: 'advanced',    deps: ['lucide-react'],               internalDeps: [],                                                                         description: 'Terminal path breadcrumb navigator. Props: variant, items ([{label, href?}]).' },
  { name: 'CyberDropdown',       category: 'advanced',    deps: ['lucide-react'],               internalDeps: [],                                                                         description: 'Custom select dropdown with neon bracket corners. Props: value, onChange, variant, placeholder, options ([{value, label}]).' },
  { name: 'MatrixRain',          category: 'animations',  deps: [],                              internalDeps: [],                                                                         description: 'Animated katakana/binary/hex rain canvas. Props: color, speed, fontSize, opacity, charType (all|katakana|binary|hex).' },
  { name: 'CyberPulseRadar',     category: 'animations',  deps: [],                              internalDeps: [],                                                                         description: 'Animated sonar/radar sweep with grid rings. Props: variant, speed, showGrid.' },
  { name: 'TextDecryptor',       category: 'animations',  deps: [],                              internalDeps: [],                                                                         description: 'Text scramble-then-decrypt animation. Props: text, speed, trigger (mount|hover|click), variant, glow.' },
  { name: 'HologramContainer',   category: 'animations',  deps: [],                              internalDeps: [],                                                                         description: 'Glassmorphism hologram wrapper with CRT scanlines and flicker. Props: variant, flicker, scanlines, noise, className. Children: content.' },
  { name: 'CyberLoginForm',      category: 'templates',   deps: ['framer-motion','lucide-react'],internalDeps: ['CyberButton','CyberInput','CyberAlert','CyberProgress'],                 description: 'Full authentication form with terminal typing animation. Props: onSuccess(username: string).' },
  { name: 'CyberSignupForm',     category: 'templates',   deps: ['framer-motion','lucide-react'],internalDeps: ['CyberButton','CyberInput','CyberCheckbox','CyberAlert','CyberProgress'], description: 'Registration form with password strength meter. Props: onSuccess(data: {username, email}).' },
  { name: 'CyberSystemDashboard',category: 'templates',   deps: ['lucide-react'],               internalDeps: ['CyberPanel','CyberProgress','CyberStatusLine','CyberAlert'],              description: 'Live system metrics dashboard (CPU, RAM, disk). No required props.' },
  { name: 'CyberDataForm',       category: 'templates',   deps: ['lucide-react'],               internalDeps: ['CyberPanel','CyberInput','CyberSwitch','CyberCheckbox','CyberTabs','CyberButton'], description: 'Multi-tab configuration form. No required props.' },
  { name: 'InteractiveConsole',  category: 'templates',   deps: ['lucide-react'],               internalDeps: ['CyberInput'],                                                             description: 'Terminal emulator with command history and built-in commands. No required props.' },
  { name: 'TargetNetworkMap',    category: 'templates',   deps: ['lucide-react'],               internalDeps: ['CyberBadge','CyberPanel'],                                                description: 'Animated network topology map with node discovery. No required props.' },
  { name: 'TerminalHero',        category: 'templates',   deps: ['framer-motion'],               internalDeps: [],                                                                         description: 'Full-screen hero with animated terminal typing. Props: title, subtitle, badgeText, loopAnimation.' },
  { name: 'HackerDashboard',     category: 'templates',   deps: ['lucide-react'],               internalDeps: ['MatrixRain'],                                                             description: 'Animated hacker dashboard with live scan tickers. Props: scanInterval, logInterval, bruteInterval, hexInterval.' },
  { name: 'ProjectCard',         category: 'templates',   deps: ['lucide-react'],               internalDeps: [],                                                                         description: 'Cyberpunk project showcase card. Props: title, description, tags, status (active|beta|archived), year.' },
  { name: 'SkillsSection',       category: 'templates',   deps: ['lucide-react'],               internalDeps: [],                                                                         description: 'Terminal skill list with animated progress bars. Props: title, commandPrefix.' },
];

// ── MCP JSON-RPC helpers ──────────────────────────────────────────────────────
function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

function sendResult(id, result) {
  send({ jsonrpc: '2.0', id, result });
}

function sendError(id, code, message) {
  send({ jsonrpc: '2.0', id, error: { code, message } });
}

// ── Tool definitions ──────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: 'list-components',
    description: 'List all available SifreleNet Cyber UI components with their categories and descriptions.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['primitives', 'advanced', 'animations', 'templates', 'all'],
          description: 'Filter by category. Defaults to all.',
        },
      },
    },
  },
  {
    name: 'get-component-info',
    description: 'Get detailed info about a specific component — description, props, dependencies, and install command.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Component name, e.g. CyberButton' },
      },
      required: ['name'],
    },
  },
  {
    name: 'add-component',
    description: 'Install a SifreleNet Cyber UI component into the current project using the CLI. Copies the .tsx file and installs all dependencies automatically.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Component name to install, e.g. CyberButton' },
        packageManager: {
          type: 'string',
          enum: ['npx', 'yarn', 'pnpm', 'bun'],
          description: 'Package manager to use. Defaults to npx.',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get-install-command',
    description: 'Get the CLI install command for a component without running it.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Component name' },
        packageManager: { type: 'string', enum: ['npx', 'yarn', 'pnpm', 'bun'] },
      },
      required: ['name'],
    },
  },
];

// ── Tool handlers ─────────────────────────────────────────────────────────────
function handleListComponents({ category = 'all' } = {}) {
  const filtered = category === 'all'
    ? COMPONENTS
    : COMPONENTS.filter((c) => c.category === category);

  const grouped = {};
  for (const c of filtered) {
    if (!grouped[c.category]) grouped[c.category] = [];
    grouped[c.category].push(c);
  }

  let text = `# SifreleNet Cyber UI Kit — ${filtered.length} Components\n\n`;
  for (const [cat, comps] of Object.entries(grouped)) {
    text += `## ${cat.toUpperCase()}\n`;
    for (const c of comps) {
      const deps = [...c.deps, ...c.internalDeps].join(', ') || 'none';
      text += `- **${c.name}** — ${c.description.split('. Props')[0]}\n`;
      text += `  Install: \`npx sifrelenet-ui-kit add ${c.name}\`\n`;
    }
    text += '\n';
  }

  text += `\n## Quick Install\n\`\`\`bash\nnpx sifrelenet-ui-kit add <ComponentName>\n\`\`\`\n`;
  text += `\nShowroom & docs: https://sifrelenet.vercel.app\n`;

  return { content: [{ type: 'text', text }] };
}

function handleGetComponentInfo({ name }) {
  const comp = COMPONENTS.find((c) => c.name.toLowerCase() === name.toLowerCase());
  if (!comp) {
    return { content: [{ type: 'text', text: `Component "${name}" not found. Use list-components to see all available components.` }] };
  }

  const text = [
    `# ${comp.name}`,
    `**Category:** ${comp.category}`,
    `**Description:** ${comp.description}`,
    ``,
    `**npm dependencies:** ${comp.deps.length ? comp.deps.join(', ') : 'none'}`,
    `**Internal dependencies:** ${comp.internalDeps.length ? comp.internalDeps.join(', ') : 'none'}`,
    ``,
    `## Install`,
    `\`\`\`bash`,
    `npx sifrelenet-ui-kit add ${comp.name}`,
    `# or`,
    `yarn dlx sifrelenet-ui-kit add ${comp.name}`,
    `# or`,
    `pnpm dlx sifrelenet-ui-kit add ${comp.name}`,
    `\`\`\``,
    ``,
    `## Usage`,
    `\`\`\`tsx`,
    `import ${comp.name} from '@/components/cyber-ui/${comp.name}';`,
    `\`\`\``,
    ``,
    `All components support a \`variant\` prop: \`"green" | "cyan" | "red" | "amber"\``,
    ``,
    `**Showroom:** https://sifrelenet.vercel.app`,
  ].join('\n');

  return { content: [{ type: 'text', text }] };
}

function handleAddComponent({ name, packageManager = 'npx' }) {
  const comp = COMPONENTS.find((c) => c.name.toLowerCase() === name.toLowerCase());
  if (!comp) {
    return { content: [{ type: 'text', text: `Component "${name}" not found. Use list-components to see available components.` }] };
  }

  const commands = {
    npx: `npx sifrelenet-ui-kit add ${comp.name}`,
    yarn: `yarn dlx sifrelenet-ui-kit add ${comp.name}`,
    pnpm: `pnpm dlx sifrelenet-ui-kit add ${comp.name}`,
    bun: `bunx sifrelenet-ui-kit add ${comp.name}`,
  };

  const cmd = commands[packageManager] || commands.npx;

  try {
    const output = execSync(cmd, { encoding: 'utf8', timeout: 60000, stdio: ['pipe', 'pipe', 'pipe'] });
    return {
      content: [{
        type: 'text',
        text: [
          `✅ **${comp.name}** installed successfully!`,
          ``,
          `**Command run:** \`${cmd}\``,
          ``,
          `**Output:**`,
          `\`\`\``,
          output,
          `\`\`\``,
          ``,
          `**Next step — import in your component:**`,
          `\`\`\`tsx`,
          `import ${comp.name} from '@/components/cyber-ui/${comp.name}';`,
          `\`\`\``,
        ].join('\n'),
      }],
    };
  } catch (err) {
    return {
      content: [{
        type: 'text',
        text: [
          `❌ Install failed for **${comp.name}**`,
          ``,
          `**Command:** \`${cmd}\``,
          `**Error:** ${err.message}`,
          ``,
          `You may need to authenticate with GitHub. Run the command manually in your terminal.`,
        ].join('\n'),
      }],
      isError: true,
    };
  }
}

function handleGetInstallCommand({ name, packageManager = 'npx' }) {
  const comp = COMPONENTS.find((c) => c.name.toLowerCase() === name.toLowerCase());
  if (!comp) {
    return { content: [{ type: 'text', text: `Component "${name}" not found.` }] };
  }

  const commands = {
    npx: `npx sifrelenet-ui-kit add ${comp.name}`,
    yarn: `yarn dlx sifrelenet-ui-kit add ${comp.name}`,
    pnpm: `pnpm dlx sifrelenet-ui-kit add ${comp.name}`,
    bun: `bunx sifrelenet-ui-kit add ${comp.name}`,
  };

  const cmd = commands[packageManager] || commands.npx;
  return { content: [{ type: 'text', text: `\`\`\`bash\n${cmd}\n\`\`\`` }] };
}

// ── MCP message router ────────────────────────────────────────────────────────
function handleMessage(msg) {
  const { id, method, params } = msg;

  if (method === 'initialize') {
    sendResult(id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'sifrelenet-ui-kit', version: '0.1.8' },
    });
    return;
  }

  if (method === 'notifications/initialized') return;

  if (method === 'tools/list') {
    sendResult(id, { tools: TOOLS });
    return;
  }

  if (method === 'tools/call') {
    const { name, arguments: args = {} } = params;
    try {
      let result;
      if (name === 'list-components')      result = handleListComponents(args);
      else if (name === 'get-component-info') result = handleGetComponentInfo(args);
      else if (name === 'add-component')   result = handleAddComponent(args);
      else if (name === 'get-install-command') result = handleGetInstallCommand(args);
      else return sendError(id, -32601, `Unknown tool: ${name}`);
      sendResult(id, result);
    } catch (err) {
      sendError(id, -32603, err.message);
    }
    return;
  }

  if (id !== undefined) {
    sendError(id, -32601, `Method not found: ${method}`);
  }
}

// ── stdio transport ───────────────────────────────────────────────────────────
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const msg = JSON.parse(trimmed);
    handleMessage(msg);
  } catch {
    // ignore parse errors
  }
});

process.stderr.write('[sifrelenet-ui-kit MCP] Server started\n');
