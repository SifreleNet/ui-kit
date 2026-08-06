```
 ██████╗██╗███████╗██████╗ ███████╗██╗     ███████╗███╗   ██╗███████╗████████╗
██╔════╝██║██╔════╝██╔══██╗██╔════╝██║     ██╔════╝████╗  ██║██╔════╝╚══██╔══╝
███████╗██║█████╗  ██████╔╝█████╗  ██║     █████╗  ██╔██╗ ██║█████╗     ██║   
╚════██║██║██╔══╝  ██╔══██╗██╔══╝  ██║     ██╔══╝  ██║╚██╗██║██╔══╝     ██║   
███████║██║██║     ██║  ██║███████╗███████╗███████╗██║ ╚████║███████╗    ██║   
╚══════╝╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝    ╚═╝   
```

<div align="center">

**`[ The Cyberpunk & Hacker UI Kit for React + TailwindCSS v4 ]`**

[![License](https://img.shields.io/github/license/SifreleNet/ui-kit?style=for-the-badge&logoColor=00ff9f)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=00ff9f)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=00ff9f)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-000000?style=for-the-badge&logo=tailwindcss&logoColor=00ff9f)](https://tailwindcss.com)

</div>

---

## ⬡ Overview

**SifreleNet UI-Kit** is a professional, highly premium cyberpunk and security-themed UI component library for React and TailwindCSS v4. It features a curated, dynamic design system tied directly to CSS custom properties. 

Easily build hacking terminals, security dashboards, diagnostic hubs, or futuristic sci-fi layouts with customizable animations (CRT noise, scanline sweeps, glowing text effects, matrix simulations).

---

## ⬡ Quick Start / CLI Installation

You can install any component directly into your project using our interactive CLI installer without cloning the entire repository:

```bash
# Add a specific component (e.g. CyberButton)
npx git+ssh://git@github.com:SifreleNet/ui-kit.git add CyberButton

# Or open the interactive UI list to select components:
npx git+ssh://git@github.com:SifreleNet/ui-kit.git add
```

---

## ⬡ Theme Setup (CSS Tokens)

Add the following variables and keyframes to your global CSS stylesheet (e.g. `globals.css`) to enable the cyberpunk theme:

```css
@import 'tailwindcss';

:root {
  --background: #0a0a0a;     /* Deep terminal black */
  --foreground: #00ff9f;     /* Neon theme color */
  --neon-green: #00ff9f;     /* Alias for primary green */
  --neon-dim: #00cc7a;       /* Muted indicator color */
  --surface: #0f0f0f;        /* Inner panel color */
  --border: #1a2e1a;         /* Panel borders */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-neon-green: var(--neon-green);
  --color-neon-dim: var(--neon-dim);
}

/* Custom Scanline Sweep */
.scanline-sweep {
  position: absolute;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, transparent, rgba(0, 255, 159, 0.06), transparent);
  animation: scanline 10s linear infinite;
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
```

---

## ⬡ Available Components (28)

### 01 // Animations
* **`MatrixRain`** - Classic digital rain overlay.
* **`CyberPulseRadar`** - Circular HUD scanner sonar with active diagnostic target telemetry.
* **`TextDecryptor`** - Crypto-style scrambled text resolver animation.
* **`HologramContainer`** - Floating CRT screen flicker projector wrapper.

### 02 // Cyber Primitives
* **`CyberButton`** - Neon button with corner cuts and hover glitch shakes.
* **`CyberInput`** - Interactive terminal shell input with cursor prompts.
* **`CyberPanel`** - Card layout with system bar options and status indicator.
* **`CyberBadge`** - Square brackets status flag (`[ CRITICAL ]`).
* **`GlitchText`** - Hover-triggered typographic glitch distortion.
* **`CyberStatusLine`** - HUD audit progress detail tracker.
* **`CyberDialog`** - Grid scanline modal popup panel.
* **`CyberProgress`** - Monospace block loading meter.
* **`CyberSwitch` / `CyberCheckbox`** - Futuristic HUD input switches.

### 03 // Core Templates & Complex HUDs
* **`InteractiveConsole`** - Live interactive mock bash console simulator.
* **`TargetNetworkMap`** - Vector node topology connection mapping.
* **`TerminalHero`** - Animated security audit terminal output simulator.
* **`HackerDashboard`** - Dynamic multi-panel status and server performance visualizer.

---

## ⬡ Local Showroom Deployment

To test components locally and interact with the Playground Showroom:

```bash
git clone https://github.com/SifreleNet/ui-kit.git
cd ui-kit
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live dashboard.

---

<div align="center">

`// access_granted. stay secure.`

</div>
