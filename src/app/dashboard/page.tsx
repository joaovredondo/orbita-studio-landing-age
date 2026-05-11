'use client';

import { motion } from 'framer-motion';
import { FolderOpen, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Projetos Ativos',     value: '3', Icon: FolderOpen,   color: 'blue'   },
  { label: 'Orçamentos Abertos',  value: '2', Icon: Clock,        color: 'yellow' },
  { label: 'Em Revisão',          value: '1', Icon: AlertCircle,  color: 'orange' },
  { label: 'Finalizados',         value: '8', Icon: CheckCircle,  color: 'green'  },
];

const activity = [
  { text: 'Projeto "E-commerce ReactShop" avançou para 65%',    time: '2h atrás',    dot: 'blue'   },
  { text: 'Orçamento #003 para App Mobile recebido',             time: '1 dia atrás', dot: 'yellow' },
  { text: 'Dashboard Analytics aprovado na revisão final',       time: '3 dias atrás',dot: 'green'  },
  { text: 'Check-in semanal: Portal de Clientes 32% concluído',  time: '4 dias atrás',dot: 'blue'   },
  { text: 'Landing Page SaaS em fila — início em breve',         time: '5 dias atrás',dot: 'muted'  },
];

export default function DashboardPage() {
  return (
    <div className="dash-page">
      {/* Header */}
      <motion.div
        className="dash-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="dash-page-title">Bom dia, João 👋</h1>
          <p className="dash-page-sub">Acompanhe seus projetos e orçamentos em tempo real</p>
        </div>
        <Link href="/dashboard/orcamento" className="dash-cta-btn">
          Novo Orçamento <ArrowRight size={15} />
        </Link>
      </motion.div>

      {/* Stat cards */}
      <div className="dash-stats-grid">
        {stats.map(({ label, value, Icon, color }, i) => (
          <motion.div
            key={label}
            className={`dash-stat-card dash-stat--${color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.08 }}
          >
            <div className="dash-stat-icon">
              <Icon size={20} />
            </div>
            <div className="dash-stat-value">{value}</div>
            <div className="dash-stat-label">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Activity + quick links */}
      <div className="dash-bottom-grid">
        {/* Activity feed */}
        <motion.div
          className="dash-activity-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          <div className="dash-card-header">
            <h2 className="dash-card-title">Atividade Recente</h2>
          </div>
          <div className="dash-activity-list">
            {activity.map(({ text, time, dot }, i) => (
              <div key={i} className="dash-activity-item">
                <div className={`dash-activity-dot dash-activity-dot--${dot}`} />
                <div className="dash-activity-body">
                  <p className="dash-activity-text">{text}</p>
                  <span className="dash-activity-time">{time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          className="dash-quick-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46 }}
        >
          <div className="dash-card-header">
            <h2 className="dash-card-title">Acesso Rápido</h2>
          </div>
          <div className="dash-quick-links">
            {[
              { href: '/dashboard/projetos',  label: 'Ver todos os projetos',    Icon: FolderOpen  },
              { href: '/dashboard/orcamento', label: 'Solicitar novo orçamento', Icon: Clock       },
              { href: '/dashboard/perfil',    label: 'Atualizar meu perfil',     Icon: CheckCircle },
            ].map(({ href, label, Icon }) => (
              <Link key={href} href={href} className="dash-quick-link">
                <Icon size={16} />
                <span>{label}</span>
                <ArrowRight size={14} className="dash-quick-arrow" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
