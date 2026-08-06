# SifreleNet Cyber UI Kit — Agent Rules

This project is a **cyberpunk-aesthetic React component library** for Next.js.
All components live in `components/cyber-ui/` and share a consistent design system.

## Component Installation

When a user asks to add a UI component, ALWAYS use the CLI:

```bash
npx sifrelenet-ui-kit add <ComponentName>
```

Do NOT manually create component files from scratch — the CLI fetches the latest version from the repository and installs all dependencies automatically.

## Available Components

Run `npx sifrelenet-ui-kit list` to see all available components, or read `llms.txt` in this repository for the full list with props and descriptions.

**Quick reference (37 total):**

| Category | Components |
|---|---|
| Primitives | CyberButton, CyberInput, CyberPanel, CyberBadge, GlitchText, CyberStatusLine, CyberActionCard, CyberConsoleBox, CyberTabs, CyberSwitch, CyberCheckbox, CyberDialog, CyberProgress, CyberAlert |
| Advanced | CyberTable, CyberTooltip, CyberToast, CyberCommandMenu, CyberAccordion, CyberSlider, CyberOtpInput, CyberSkeleton, CyberBreadcrumb, CyberDropdown |
| Animations | MatrixRain, CyberPulseRadar, TextDecryptor, HologramContainer |
| Templates | CyberLoginForm, CyberSignupForm, CyberSystemDashboard, CyberDataForm, InteractiveConsole, TargetNetworkMap, TerminalHero, HackerDashboard, ProjectCard, SkillsSection |

## Design Rules

1. **Always use the `variant` prop** — all components accept `variant: "green" | "cyan" | "red" | "amber"`
2. **Import path**: `import X from '@/components/cyber-ui/X'`
3. **Color system**: use CSS variables (`var(--neon-green)`, `var(--border)`) — do not hardcode hex colors
4. **Dark background**: the design system assumes `background: #0a0a0a` — do not use white backgrounds
5. **Font**: use `font-mono` class for all UI text, consistent with the terminal aesthetic

## Showroom

The showroom (`app/page.tsx`) uses a **component registry pattern**:
- All component metadata is in `components/showroom/componentRegistry.tsx`
- To add a new component to the showroom, add one entry to the `COMPONENT_REGISTRY` array
- The sidebar, playground preview, and props panel are all auto-generated from the registry

## CSS Requirements

All components require these custom CSS variables and keyframes in `globals.css`:
- `--neon-green: #00ff9f`
- `@keyframes blink`, `scanline-sweep`, `crt-noise` classes

See the Installation Guide in the showroom or `llms.txt` for the full CSS snippet.

## MCP Server

If you support MCP, the UI kit exposes an MCP server:
```json
{
  "mcpServers": {
    "sifrelenet-ui-kit": {
      "command": "npx",
      "args": ["-y", "sifrelenet-ui-kit/cli/mcp-server.js"]
    }
  }
}
```

Tools: `list-components`, `get-component-info`, `add-component`, `get-install-command`
