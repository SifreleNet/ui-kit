'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: '~/home' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-[#0a0a0a]/90 backdrop-blur-sm transition-all duration-300 ${
        scrolled
          ? 'border-neon-green/13 shadow-[0_0_24px_color-mix(in srgb, var(--neon-green) 7%, transparent)]'
          : 'border-[#1a2e1a]'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-neon-green text-lg font-bold tracking-tight group-hover:text-shadow-glow transition-all duration-300">
            <span className="text-neon-green/40">[</span>
            sifrele<span className="text-neon-green">Net</span>
            <span className="text-neon-green/40">]</span>
          </span>
          <span className="animate-blink text-neon-green text-lg">_</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm transition-all duration-200 glow-hover px-3 py-1.5 rounded border ${
                    isActive
                      ? 'text-neon-green border-neon-green/27 bg-neon-green/5'
                      : 'text-neon-green/53 border-transparent hover:text-neon-green hover:border-neon-green/13'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs text-neon-green/33">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span>online</span>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-neon-green p-2 border border-[#1a2e1a] rounded hover:border-neon-green/27 transition-all"
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-current mb-1" />
          <span className="block w-5 h-px bg-current mb-1" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1a2e1a] bg-[#0a0a0a]">
          <ul className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm block py-2 border-b border-[#1a2e1a] transition-all duration-200 ${
                      isActive
                        ? 'text-neon-green'
                        : 'text-neon-green/40 hover:text-neon-green'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
