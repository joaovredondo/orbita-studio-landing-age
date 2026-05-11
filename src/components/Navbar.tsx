'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'Serviços',  href: '#servicos' },
  { label: 'Processo',  href: '#processo' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Sobre',     href: '#sobre' },
  { label: 'Contato',   href: '#contato' },
];

export const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const openModal = () => {
    setMenuOpen(false);
    window.dispatchEvent(new Event('budget:open'));
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <Link href="/" className="navbar-logo">
          <span className="logo-mark" aria-hidden="true" />
          <span>Órbita</span>
          <span className="logo-studio">Studio</span>
        </Link>

        {/* Links */}
        <div className="navbar-links" data-open={menuOpen}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {/* Mobile CTA */}
          <button className="nav-link nav-link--cta mobile-only" onClick={openModal}>
            Solicitar Orçamento
          </button>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="secondary" size="sm">Fazer Login</Button>
          </Link>
          <button
            className="navbar-burger"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`burger-line${menuOpen ? ' open' : ''}`} />
            <span className={`burger-line${menuOpen ? ' open' : ''}`} />
            <span className={`burger-line${menuOpen ? ' open' : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  );
};
