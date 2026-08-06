#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import prompts from 'prompts';

const GITHUB_REPO = 'SifreleNet/ui-kit';
const CONFIG_FILE_NAME = '.sifrelenetrc';

// Available components registry
const COMPONENTS = [
  // Primitives
  { name: 'CyberButton', path: 'components/cyber-ui/CyberButton.tsx', deps: ['framer-motion'] },
  { name: 'CyberInput', path: 'components/cyber-ui/CyberInput.tsx', deps: [] },
  { name: 'CyberPanel', path: 'components/cyber-ui/CyberPanel.tsx', deps: [] },
  { name: 'CyberBadge', path: 'components/cyber-ui/CyberBadge.tsx', deps: [] },
  { name: 'GlitchText', path: 'components/cyber-ui/GlitchText.tsx', deps: [] },
  { name: 'CyberStatusLine', path: 'components/cyber-ui/CyberStatusLine.tsx', deps: ['lucide-react'] },
  { name: 'CyberActionCard', path: 'components/cyber-ui/CyberActionCard.tsx', deps: ['framer-motion'] },
  { name: 'CyberConsoleBox', path: 'components/cyber-ui/CyberConsoleBox.tsx', deps: [] },
  { name: 'CyberTabs', path: 'components/cyber-ui/CyberTabs.tsx', deps: [] },
  { name: 'CyberSwitch', path: 'components/cyber-ui/CyberSwitch.tsx', deps: [] },
  { name: 'CyberCheckbox', path: 'components/cyber-ui/CyberCheckbox.tsx', deps: [] },
  { name: 'CyberDialog', path: 'components/cyber-ui/CyberDialog.tsx', deps: ['framer-motion', 'lucide-react'] },
  { name: 'CyberProgress', path: 'components/cyber-ui/CyberProgress.tsx', deps: [] },
  { name: 'CyberAlert', path: 'components/cyber-ui/CyberAlert.tsx', deps: ['lucide-react'] },
  
  // Animations
  { name: 'MatrixRain', path: 'components/MatrixRain.tsx', deps: [] },
  { name: 'CyberPulseRadar', path: 'components/cyber-ui/CyberPulseRadar.tsx', deps: [] },
  { name: 'TextDecryptor', path: 'components/cyber-ui/TextDecryptor.tsx', deps: [] },
  { name: 'HologramContainer', path: 'components/cyber-ui/HologramContainer.tsx', deps: [] },
  
  // Templates
  { name: 'CyberLoginForm', path: 'components/cyber-ui/CyberLoginForm.tsx', deps: ['framer-motion', 'lucide-react'] },
  { name: 'CyberSignupForm', path: 'components/cyber-ui/CyberSignupForm.tsx', deps: ['framer-motion', 'lucide-react'] },
  { name: 'CyberSystemDashboard', path: 'components/cyber-ui/CyberSystemDashboard.tsx', deps: ['lucide-react'] },
  { name: 'CyberDataForm', path: 'components/cyber-ui/CyberDataForm.tsx', deps: ['lucide-react'] },
  { name: 'InteractiveConsole', path: 'components/cyber-ui/InteractiveConsole.tsx', deps: ['lucide-react'] },
  { name: 'TargetNetworkMap', path: 'components/cyber-ui/TargetNetworkMap.tsx', deps: ['lucide-react'] },
  { name: 'TerminalHero', path: 'components/TerminalHero.tsx', deps: ['framer-motion'] },
  { name: 'HackerDashboard', path: 'components/HackerDashboard.tsx', deps: ['lucide-react'] },
  { name: 'ProjectCard', path: 'components/ProjectCard.tsx', deps: ['lucide-react'] },
  { name: 'SkillsSection', path: 'components/SkillsSection.tsx', deps: ['lucide-react'] },
];

const getStoredToken = () => {
  const configPath = path.join(process.cwd(), CONFIG_FILE_NAME);
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.token || null;
    } catch {
      return null;
    }
  }
  return null;
};

const storeToken = (token) => {
  const configPath = path.join(process.cwd(), CONFIG_FILE_NAME);
  fs.writeFileSync(configPath, JSON.stringify({ token }, null, 2), 'utf8');
};

const checkRepoAccess = async (token) => {
  const url = `https://api.github.com/repos/${GITHUB_REPO}`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, { headers });
    return res.ok;
  } catch {
    return false;
  }
};

const fetchRawFile = async (githubPath, token) => {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${githubPath}`;
  const headers = {
    Accept: 'application/vnd.github.v3.raw',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(url, { headers });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Component file not found in repo: ${githubPath}`);
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error('Unauthorized. Please check your GitHub PAT scopes.');
    }
    throw new Error(`GitHub API returned status ${response.status}`);
  }

  return response.text();
};

const main = async () => {
  console.log(pc.cyan(`\n⬡ SifreleNet UI-Kit Installer CLI ⬡`));
  console.log(pc.gray(`------------------------------------`));

  // Get token (either from env or config file)
  let token = process.env.GITHUB_PAT || getStoredToken();
  
  // Test if we can access the repo
  let hasAccess = await checkRepoAccess(token);
  
  if (!hasAccess) {
    if (token) {
      console.log(pc.yellow(`⚠ Stored GitHub token is invalid or does not have access to ${GITHUB_REPO}.`));
    } else {
      console.log(pc.yellow(`⚠ Repository ${GITHUB_REPO} is private or requires authentication.`));
    }
    
    const response = await prompts({
      type: 'text',
      name: 'token',
      message: 'Enter your GitHub Personal Access Token (PAT):',
      validate: (val) => (val ? true : 'Token is required'),
    });

    if (!response.token) {
      console.log(pc.red('\n✖ Aborted. Token is required to access private components.'));
      process.exit(1);
    }
    token = response.token;
    
    // Verify the new token
    const isTokenValid = await checkRepoAccess(token);
    if (!isTokenValid) {
      console.log(pc.red('\n✖ Provided GitHub token is invalid or cannot access the repository.'));
      process.exit(1);
    }
    
    const saveResponse = await prompts({
      type: 'confirm',
      name: 'save',
      message: `Save token locally to ${CONFIG_FILE_NAME}? (recommended)`,
      initial: true,
    });

    if (saveResponse.save) {
      storeToken(token);
      console.log(pc.green(`✔ Token saved to ${CONFIG_FILE_NAME}`));
    }
  } else {
    if (token) {
      console.log(pc.green(`✔ Authenticated using GitHub token.`));
    } else {
      console.log(pc.green(`✔ Connected to repository.`));
    }
  }

  const args = process.argv.slice(2);
  const command = args[0];
  const targetComponent = args[1];

  if (command !== 'add') {
    console.log(`\nUsage: npx sifrelenet-ui-kit add <component-name>`);
    console.log(`\nExamples:`);
    console.log(`  npx sifrelenet-ui-kit add CyberButton`);
    console.log(`  npx sifrelenet-ui-kit add all`);
    process.exit(0);
  }

  if (!targetComponent) {
    // Prompt to select from available list
    const selection = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Choose components to install:',
      choices: COMPONENTS.map((c) => ({ title: `${c.name} (${c.path})`, value: c.name })),
      hint: '- Space to select. Return to submit. a to toggle all.'
    });

    if (!selection.components || selection.components.length === 0) {
      console.log(pc.yellow('\n⚠ No components selected.'));
      process.exit(0);
    }
    await installComponents(selection.components, token);
  } else {
    await installComponents(targetComponent === 'all' ? 'all' : [targetComponent], token);
  }
};

const installComponents = async (targets, token) => {
  if (targets === 'all') {
    console.log(pc.yellow(`\n⬡ Installing all 28 components...`));
    for (const comp of COMPONENTS) {
      await downloadAndSave(comp, token);
    }
    console.log(pc.green(`\n✔ All components installed successfully!`));
    return;
  }

  const items = Array.isArray(targets) ? targets : [targets];
  console.log(pc.yellow(`\n⬡ Installing ${items.length} component(s)...`));

  for (const name of items) {
    const comp = COMPONENTS.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (!comp) {
      console.log(pc.red(`\n✖ Unknown component: "${name}".`));
      console.log(`Available components:\n${COMPONENTS.map((c) => c.name).join(', ')}`);
      continue;
    }
    await downloadAndSave(comp, token);
  }
};

const downloadAndSave = async (comp, token) => {
  const destPath = path.join(process.cwd(), comp.path);
  const destDir = path.dirname(destPath);

  console.log(pc.cyan(`\n⬡ Fetching ${comp.name}...`));

  try {
    const fileContent = await fetchRawFile(comp.path, token);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(destPath, fileContent, 'utf8');
    console.log(pc.green(`✔ Saved to ${comp.path}`));

    if (comp.deps.length > 0) {
      console.log(pc.yellow(`⚠ Requires dependencies: ${comp.deps.join(', ')}`));
      console.log(pc.gray(`  Run: npm install ${comp.deps.join(' ')}`));
    }
  } catch (error) {
    console.log(pc.red(`✖ Failed to install ${comp.name}: ${error.message}`));
  }
};

main().catch((err) => {
  console.error(pc.red(`\n✖ Unexpected error: ${err.message}`));
  process.exit(1);
});
