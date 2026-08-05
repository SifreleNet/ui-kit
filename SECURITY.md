# Security Policy

## Supported Versions

| Version         | Supported |
| --------------- | --------- |
| latest (`main`) | ✅        |
| older branches  | ❌        |

Only the latest code on the `main` branch receives security fixes.

---

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability in this project, report it privately so it can be addressed before public disclosure.

### How to Report

1. **Email:** Send details to the address listed on the [portfolio contact page](https://crypt0x-dev-hacker-portfolio.vercel.app/contact) or directly via GitHub's private vulnerability reporting feature.
2. **GitHub Private Advisory:** Go to the [Security tab → Report a vulnerability](../../security/advisories/new) (requires a GitHub account).

### What to Include

- Description of the vulnerability and its potential impact.
- Steps to reproduce (proof-of-concept if applicable).
- Affected files, components, or dependencies.
- Any suggested mitigation or fix.

---

## Response Timeline

| Action                    | Timeline                        |
| ------------------------- | ------------------------------- |
| Acknowledgement of report | Within **48 hours**             |
| Initial assessment        | Within **5 business days**      |
| Fix and patched release   | Depends on severity (see below) |

### Severity–Response Matrix

| Severity | Target fix time        |
| -------- | ---------------------- |
| Critical | 24–72 hours            |
| High     | 7 days                 |
| Medium   | 30 days                |
| Low      | Next scheduled release |

---

## Disclosure Policy

This project follows [Responsible Disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure). Once a fix is released, a public security advisory will be published crediting the reporter (unless anonymity is requested).

---

## Scope

This policy applies to the source code in this repository. It does **not** cover third-party dependencies — please report those directly to the respective maintainers.

---

## Security Best Practices Used in This Project

- No secrets or API keys committed to the repository.
- Environment variables managed via `.env.local` (excluded from version control).
- Dependencies audited regularly with `npm audit`.
- Content Security Policy headers configured in `next.config.ts`.
