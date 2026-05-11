'use client';

import { motion } from 'framer-motion';
import { Users, FolderOpen, FileText, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Clientes',            value: '12', Icon: Users,       color: 'blue',   href: '/admin/clientes'   },
  { label: 'Projetos Ativos',     value: '8',  Icon: FolderOpen,  color: 'green',  href: '/admin/projetos'   },
  { label: 'Orçamentos Abertos',  value: '5',  Icon: FileText,    color: 'yellow', href: '/admin/orcamentos'  },
  { label: 'Receita este mês',    value: 'R$ 28k',Icon: TrendingUp, color: 'orange', href: '/admin'    },
];

const recentBudgets = [
  { client: 'Ana Costa',      service: 'Desenvolvimento Web',  value: 'R$ 8.000 – 20k', time: '2h',    status: 'Em análise' },
  { client: 'Pedro Alves',    service: 'App Mobile',           value: 'R$ 20k – 50k',   time: '5h',    status: 'Em análise' },
  { client: 'Mariana Lima',   service: 'UI/UX Design',         value: 'R$ 3k – 8k',     time: '1 dia', status: 'Aprovado'   },
  { client: 'Carlos Mendes',  service: 'Dashboard Analytics',  value: 'R$ 8k – 20k',    time: '2 dias',status: 'Aprovado'   },
];

const activeProjects = [
  { name: 'E-commerce ReactShop', client: 'Ana Costa',    progress: 65, status: 'Em Desenvolvimento' },
  { name: 'App Mobile Delivery',  client: 'Pedro Alves',  progress: 90, status: 'Revisão'            },
  { name: 'Portal de Clientes',   client: 'Mariana Lima', progress: 32, status: 'Em Desenvolvimento' },
];

const STATUS_COLOR: Record<string, string> = {
  'Em análise':        'yellow',
  'Aprovado':          'green',
  'Recusado':          'red',
  'Em Desenvolvimento':'blue',
  'Revisão':           'orange',
  'Finalizado':        'green',
};

export default function AdminPage() {
  return (
    <div className="dash-page">
      <motion.div
        className="dash-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="dash-page-title">Visão Geral</h1>
          <p className="dash-page-sub">Resumo do negócio em tempo real</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="dash-stats-grid">
        {stats.map(({ label, value, Icon, color, href }, i) => (
          <motion.div
            key={label}
            className={`dash-stat-card dash-stat--${color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={href} style={{ textDecoration: 'none', display: 'contents' }}>
              <div className="dash-stat-icon"><Icon size={20} /></div>
              <div className="dash-stat-value">{value}</div>
              <div className="dash-stat-label">{label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="dash-bottom-grid">
        {/* Recent budgets */}
        <motion.div
          className="dash-activity-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
        >
          <div className="dash-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="dash-card-title">Orçamentos Recentes</h2>
            <Link href="/admin/orcamentos" className="dash-card-link">
              Ver todos <ArrowRight size={13} />
            </Link>
          </div>
          <div className="admin-budget-table">
            {recentBudgets.map(({ client, service, value, time, status }, i) => (
              <div key={i} className="admin-budget-row">
                <div className="admin-client-avatar">{client[0]}</div>
                <div className="admin-row-info">
                  <div className="admin-row-name">{client}</div>
                  <div className="admin-row-sub">{service}</div>
                </div>
                <div className="admin-row-value">{value}</div>
                <div className={`dash-status dash-status--${STATUS_COLOR[status]}`}>
                  {status}
                </div>
                <div className="admin-row-time">
                  <Clock size={11} /> {time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active projects */}
        <motion.div
          className="dash-quick-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
        >
          <div className="dash-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="dash-card-title">Projetos em Andamento</h2>
            <Link href="/admin/projetos" className="dash-card-link">
              Ver todos <ArrowRight size={13} />
            </Link>
          </div>
          <div className="admin-projects-mini">
            {activeProjects.map(({ name, client, progress, status }, i) => (
              <div key={i} className="admin-project-mini">
                <div className="admin-project-mini-info">
                  <div className="admin-row-name">{name}</div>
                  <div className="admin-row-sub">{client}</div>
                </div>
                <div className={`dash-status dash-status--${STATUS_COLOR[status]}`} style={{ fontSize: '0.7rem' }}>
                  {status}
                </div>
                <div className="dash-progress-track" style={{ marginTop: '0.5rem' }}>
                  <motion.div
                    className="dash-progress-fill dash-progress-fill--blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.9, ease: 'easeOut' }}
                  />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--dash-muted)', textAlign: 'right', marginTop: '0.2rem' }}>
                  {progress}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
