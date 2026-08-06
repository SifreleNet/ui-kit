# sifrelenet-ui-kit

CLI tool to install siber/cyberpunk component files from SifreleNet UI-Kit directly into React + TailwindCSS v4 projects.

## Usage

```bash
# Add a specific component (e.g. CyberButton)
npx sifrelenet-ui-kit add CyberButton

# Or run without arguments to see the interactive selector menu:
npx sifrelenet-ui-kit add
```

## Features

- **Component Installer:** Copies raw TSX code files directly into your project's `components/cyber-ui/` directory.
- **Dependency Resolution:** Identifies required third-party npm packages (like `framer-motion` or `lucide-react`) and alerts you to install them.
- **Dynamic Styling:** Works out-of-the-box with SifreleNet's CSS theme variables.

For documentation and full configuration instructions, please refer to the [GitHub Repository](https://github.com/SifreleNet/ui-kit).
