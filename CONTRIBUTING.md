# Contributing to Crypt0xDev Portfolio

Thank you for taking the time to contribute! This portfolio is an open project and community-driven improvements are welcome.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

---

## Code of Conduct

By participating in this project you agree to maintain a respectful, inclusive, and constructive environment. Harassment, discrimination, or disruptive behavior of any kind will not be tolerated.

---

## How to Contribute

### Reporting Bugs

1. Check the [Issues](../../issues) tab to avoid duplicates.
2. Open a new issue using the **Bug Report** template.
3. Include: steps to reproduce, expected vs. actual behavior, and environment details.

### Suggesting Features

1. Open a new issue using the **Feature Request** template.
2. Describe the problem you're solving and the proposed solution.
3. Be as specific as possible — screenshots or mockups are welcome.

### Improving Documentation

Grammar fixes, clearer explanations, or updated instructions are always appreciated. Open a PR directly for minor doc changes.

---

## Development Setup

**Prerequisites:** Node.js ≥ 18, npm ≥ 9

```bash
# 1. Fork the repo and clone your fork
git clone https://github.com/<your-username>/Crypt0xDev-Hacker-Portfolio.git
cd Crypt0xDev-Hacker-Portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Submitting Changes

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Make your changes** and ensure the project builds without errors:
   ```bash
   npm run build
   npm run lint
   ```
3. **Commit** following [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add dark mode toggle
   fix: correct mobile nav overflow
   docs: update README setup steps
   ```
4. **Push** your branch and open a Pull Request against `main`.
5. Fill in the PR description explaining **what** changed and **why**.

---

## Style Guidelines

- **TypeScript** — All new components must be typed. Avoid `any`.
- **Tailwind CSS** — Use utility classes over custom CSS where possible.
- **Components** — Place reusable UI in `components/`, page-level components in `app/`.
- **Data** — Static content (projects, skills) belongs in `data/`.
- **Naming** — Files use PascalCase for components (`MyComponent.tsx`), camelCase for utilities.

---

> Questions? Open a [Discussion](../../discussions) or reach out via the contact page.
