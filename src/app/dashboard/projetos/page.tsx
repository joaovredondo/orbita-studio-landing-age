'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

type Status = 'Aguardando' | 'Em Desenvolvimento' | 'Revisão' | 'Finalizado';

const STATUS_CONFIG: Record<Status, { color: string; Icon: React.ElementType }> = {
  'Aguardando':         { color: 'yellow', Icon: Clock        },
  'Em Desenvolvimento': { color: 'blue',   Icon: RefreshCw    },
  'Revisão':            { color: 'orange', Icon: AlertCircle  },
  'Finalizado':         { color: 'green',  Icon: CheckCircle  },
};

const FILTERS: Array<Status | 'Todos'> = ['Todos', 'Em Desenvolvimento', 'Revisão', 'Aguardando', 'Finalizado'];

const projects = [
  {
    name: 'E-commerce ReactShop',
    type: 'Desenvolvimento Web',
    status: 'Em Desenvolvimento' as Status,
    progress: 65,
    updated: '2 dias atrás',
    desc: 'Loja virtual com Next.js, carrinho, checkout e painel admin.',
  },
  {
    name: 'App Mobile Delivery',
    type: 'App Mobile',
    status: 'Revisão' as Status,
    progress: 90,
    updated: '1 dia atrás',
    desc: 'App React Native para pedidos de entrega em iOS e Android.',
  },
  {
    name: 'Dashboard Analytics',
    type: 'Dashboard & Analytics',
    status: 'Finalizado' as Status,
    progress: 100,
    updated: '5 dias atrás',
    desc: 'Painel com métricas em tempo real, gráficos e exportação PDF.',
  },
  {
    name: 'Landing Page SaaS',
    type: 'UI/UX Design',
    status: 'Aguardando' as Status,
    progress: 0,
    updated: 'Hoje',
    desc: 'Página de conversão para produto SaaS com foco em performance.',
  },
  {
    name: 'Portal de Clientes',
    type: 'Desenvolvimento Web',
    status: 'Em Desenvolvimento' as Status,
    progress: 32,
    updated: '4 dias atrás',
    desc: 'Área autenticada para clientes acompanharem seus projetos.',
  },
];

export default function ProjetosPage() {
  const [filter, setFilter] = useState<Status | 'Todos'>('Todos');

  const visible = filter === 'Todos'
    ? projects
    : projects.filter((p) => p.status === filter);

  return (
    <div className="dash-page">
      <motion.div
        className="dash-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="dash-page-title">Meus Projetos</h1>
          <p className="dash-page-sub">{projects.length} projetos no total</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="dash-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`dash-filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Projects list */}
      <div className="dash-projects-list">
        {visible.map((p, i) => {
          const { color, Icon } = STATUS_CONFIG[p.status];
          return (
            <motion.div
              key={p.name}
              className="dash-project-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              layout
            >
              <div className="dash-project-main">
                <div>
                  <div className="dash-project-name">{p.name}</div>
                  <div className="dash-project-type">{p.type}</div>
                  <p className="dash-project-desc">{p.desc}</p>
                </div>
                <div className={`dash-status dash-status--${color}`}>
                  <Icon size={13} />
                  {p.status}
                </div>
              </div>

              <div className="dash-project-footer">
                <div className="dash-progress-wrap">
                  <div className="dash-progress-header">
                    <span className="dash-progress-label">Progresso</span>
                    <span className="dash-progress-pct" style={{ color: `var(--dash-${color})` }}>
                      {p.progress}%
                    </span>
                  </div>
                  <div className="dash-progress-track">
                    <motion.div
                      className={`dash-progress-fill dash-progress-fill--${color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ delay: 0.25 + i * 0.07, duration: 1.0, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <span className="dash-project-updated">Atualizado {p.updated}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
