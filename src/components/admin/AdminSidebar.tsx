'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, FolderOpen, FileText, Settings, LogOut, Shield,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/admin',               label: 'Visão Geral',  Icon: LayoutDashboard, exact: true },
  { href: '/admin/clientes',      label: 'Clientes',     Icon: Users            },
  { href: '/admin/projetos',      label: 'Projetos',     Icon: FolderOpen       },
  { href: '/admin/orcamentos',    label: 'Orçamentos',   Icon: FileText         },
  { href: '/admin/configuracoes', label: 'Configurações',Icon: Settings         },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router   = useRouter();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="dash-sidebar dash-sidebar--admin">
      <div className="dash-sidebar-inner">
        <Link href="/" className="dash-brand">
          <span className="logo-mark" aria-hidden="true" />
          <span className="dash-brand-name">
            Órbita <span className="logo-studio">Admin</span>
          </span>
        </Link>

        <div className="admin-role-badge">
          <Shield size={12} />
          Painel Admin
        </div>

        <nav className="dash-nav">
          {navItems.map(({ href, label, Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`dash-nav-item${active ? ' active' : ''}`}
              >
                {active && (
                  <motion.div
                    className="dash-nav-indicator"
                    layoutId="admin-nav-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="dash-sidebar-footer">
          <button className="dash-nav-item dash-nav-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
