'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderOpen, FileText, User, LogOut } from 'lucide-react';

const navItems = [
  { href: '/dashboard',               label: 'Dashboard',      Icon: LayoutDashboard },
  { href: '/dashboard/projetos',      label: 'Meus Projetos',  Icon: FolderOpen      },
  { href: '/dashboard/orcamento',     label: 'Orçamentos',     Icon: FileText        },
  { href: '/dashboard/perfil',        label: 'Perfil',         Icon: User            },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-inner">
        {/* Brand */}
        <Link href="/" className="dash-brand">
          <span className="logo-mark" aria-hidden="true" />
          <span className="dash-brand-name">
            Órbita <span className="logo-studio">Studio</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="dash-nav">
          {navItems.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`dash-nav-item${isActive ? ' active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    className="dash-nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="dash-sidebar-footer">
          <Link href="/" className="dash-nav-item dash-nav-logout">
            <LogOut size={18} />
            <span>Sair</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
