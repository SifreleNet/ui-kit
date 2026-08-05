# Documentación — Portfolio Crypt0xDev

```
$ man portfolio
> Manual de referencia técnica del proyecto.
```

---

## Índice

1. [Arquitectura](#arquitectura)
2. [Instalación](#instalación)
3. [Variables de entorno](#variables-de-entorno)
4. [Componentes](#componentes)
5. [Datos — projects.ts](#datos--projectsts)
6. [Estilos y tema](#estilos-y-tema)
7. [Añadir un proyecto](#añadir-un-proyecto)
8. [Personalizar el perfil](#personalizar-el-perfil)
9. [Deploy](#deploy)

---

## Arquitectura

El proyecto usa **Next.js 15 App Router** con renderizado estático por defecto. No usa base de datos — los datos están en `data/projects.ts`.

```
Request
  └─► Next.js App Router
        ├─ app/layout.tsx       ← Shell global (Navbar + footer)
        ├─ app/page.tsx         ← Home (SSG)
        ├─ app/projects/        ← Projects (Client Component por filtros)
        └─ app/contact/         ← Contact (SSG)
```

---

## Instalación

**Requisitos:** Node.js ≥ 18, npm ≥ 9

```bash
# 1. Clonar el repo
git clone https://github.com/Crypt0xDev/Crypt0xDev-Hacker-Portfolio.git
cd Crypt0xDev-Hacker-Portfolio

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo
npm run dev
# → http://localhost:3000

# 4. Build de producción
npm run build
npm start
```

---

## Variables de entorno

El proyecto no requiere variables de entorno por defecto. Si añades funcionalidad de servidor (formulario de contacto, analytics, etc.), crea un `.env.local`:

```bash
# .env.local (no commitear)
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

---

## Componentes

### `Navbar.tsx`

Navbar sticky con detección de ruta activa via `usePathname()`.

| Prop | Tipo | Descripción                               |
| ---- | ---- | ----------------------------------------- |
| —    | —    | No recibe props, lee la ruta internamente |

Modifica el array `navLinks` dentro del archivo para añadir o quitar páginas:

```ts
const navLinks = [
  { href: '/', label: '~/home' },
  { href: '/projects', label: '~/projects' },
  { href: '/contact', label: '~/contact' },
  // { href: "/blog", label: "~/blog" },  ← añade aquí
];
```

---

### `TerminalHero.tsx`

Terminal animada que muestra líneas de comandos de forma secuencial.

Edita el array `TERMINAL_LINES` para personalizar el texto:

```ts
const TERMINAL_LINES = [
  { text: '$ whoami', delay: 0 },
  { text: '> tu_usuario', delay: 600 },
  // ...
];
```

- `text` — texto a mostrar. Si empieza con `$` se muestra en verde brillante; con `>` en verde semitransparente.
- `delay` — milisegundos desde el inicio de la animación.

---

### `ProjectCard.tsx`

Card que renderiza un objeto `Project`.

| Prop      | Tipo      | Descripción                               |
| --------- | --------- | ----------------------------------------- |
| `project` | `Project` | Objeto del proyecto a mostrar             |
| `index`   | `number`  | (Opcional) Índice para delay de animación |

---

## Datos — `projects.ts`

Cada proyecto tiene la siguiente forma:

```ts
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: 'pentest' | 'web-sec' | 'ctf' | 'tool' | 'dev';
  status: 'active' | 'completed' | 'wip';
  github?: string; // opcional
  demo?: string; // opcional
  year: number;
}
```

### Status

| Valor       | Color       | Significado             |
| ----------- | ----------- | ----------------------- |
| `active`    | Verde       | En mantenimiento activo |
| `completed` | Verde tenue | Finalizado              |
| `wip`       | Amarillo    | En desarrollo           |

---

## Estilos y tema

El tema está definido en `app/globals.css`. Variables principales:

| Variable       | Valor     | Uso                      |
| -------------- | --------- | ------------------------ |
| `--background` | `#0a0a0a` | Fondo global             |
| `--neon-green` | `#00ff9f` | Color principal          |
| `--surface`    | `#0d0d0d` | Fondo de cards y paneles |
| `--border`     | `#1a2e1a` | Bordes sutiles           |

### Clases de animación disponibles

```css
.animate-blink       /* cursor parpadeante */
.animate-glow        /* glow pulsante en texto */
.animate-fade-in-up  /* entrada desde abajo */
.glow-hover          /* glow en hover de texto */
.border-glow         /* glow en bordes de cards */
```

---

## Añadir un proyecto

1. Abre `data/projects.ts`
2. Añade un nuevo objeto al array `projects`:

```ts
{
  id: 7,                           // siguiente ID disponible
  title: "Mi Nuevo Tool",
  description: "Descripción del proyecto...",
  tags: ["Python", "Security"],
  category: "tool",
  status: "active",
  github: "https://github.com/crypt0xdev/mi-tool",
  year: 2026,
}
```

El proyecto aparecerá automáticamente en `/projects`. Para que aparezca en el Home como destacado, ajusta el `.slice()` en `app/page.tsx`:

```ts
// Muestra los primeros N proyectos (por ID)
const featuredProjects = projects.slice(0, 3);
```

---

## Personalizar el perfil

### Nombre y bio — `TerminalHero.tsx`

```ts
const TERMINAL_LINES = [
  { text: '$ whoami', delay: 0 },
  { text: '> tu_alias', delay: 600 },
  { text: '$ cat about.txt', delay: 1400 },
  { text: '> Tu rol / especialidad', delay: 2000 },
  // ...
];
```

### Stats — `TerminalHero.tsx`

```tsx
{[
  { value: "50+", label: "CTF Challenges" },
  { value: "10+", label: "Projects" },
  { value: "3+",  label: "Years Exp." },
].map(...)}
```

### Contacto — `app/contact/page.tsx`

Edita el array `contactLinks` con tus links reales:

```ts
const contactLinks = [
  {
    label: 'Email',
    value: 'tu@email.com',
    href: 'mailto:tu@email.com',
    // ...
  },
  // ...
];
```

### Metadata SEO — `app/layout.tsx`

```ts
export const metadata: Metadata = {
  title: 'TuNombre | Cybersecurity Portfolio',
  description: 'Tu descripción...',
};
```

---

## Deploy

### Vercel (recomendado)

```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel --prod
```

O conecta el repositorio directamente en [vercel.com](https://vercel.com) para deploy automático en cada push a `main`.

### Otros proveedores

```bash
# Build estático
npm run build

# El output queda en .next/
# Compatible con: Vercel, Netlify, Railway, VPS con Node 18+
```

---

```
$ exit
> // docs end — stay curious, stay secure
```
