'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, RefreshCw, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

type Status = 'Aguardando' | 'Em Desenvolvimento' | 'Revisão' | 'Finalizado';

const STATUS_CONFIG: Record<Status, { color: string; Icon: React.ElementType }> = {
  'Aguardando':         { color: 'yellow', Icon: Clock        },
  'Em Desenvolvimento': { color: 'blue',   Icon: RefreshCw    },
  'Revisão':            { color: 'orange', Icon: AlertCircle  },
  'Finalizado':         { color: 'green',  Icon: CheckCircle  },
};

const STATUSES: Status[] = ['Aguardando', 'Em Desenvolvimento', 'Revisão', 'Finalizado'];

type Project = {
  id: number;
  name: string;
  client: string;
  type: string;
  status: Status;
  progress: number;
  updated: string;
};

const INITIAL: Project[] = [
  { id: 1, name: 'E-commerce ReactShop', client: 'Ana Costa',    type: 'Desenvolvimento Web',   status: 'Em Desenvolvimento', progress: 65,  updated: '2 dias atrás' },
  { id: 2, name: 'App Mobile Delivery',  client: 'Pedro Alves',  type: 'App Mobile',            status: 'Revisão',            progress: 90,  updated: '1 dia atrás'  },
  { id: 3, name: 'Dashboard Analytics',  client: 'Mariana Lima', type: 'Dashboard & Analytics', status: 'Finalizado',         progress: 100, updated: '5 dias atrás' },
  { id: 4, name: 'Landing Page SaaS',    client: 'Carlos Mendes',type: 'UI/UX Design',          status: 'Aguardando',         progress: 0,   updated: 'Hoje'         },
  { id: 5, name: 'Portal de Clientes',   client: 'Mariana Lima', type: 'Desenvolvimento Web',   status: 'Em Desenvolvimento', progress: 32,  updated: '4 dias atrás' },
];

function StatusDropdown({ value, onChange }: { value: Status; onChange: (s: Status) => void }) {
  const [open, setOpen] = useState(false);
  const { color, Icon } = STATUS_CONFIG[value];

  return (
    <div className="admin-status-dropdown" style={{ position: 'relative' }}>
      <button
        className={`dash-status dash-status--${color}`}
        style={{ cursor: 'pointer', gap: '0.5rem' }}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon size={13} />
        {value}
        <ChevronDown size={12} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="admin-dropdown-menu"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {STATUSES.map((s) => {
              const { color: c, Icon: I } = STATUS_CONFIG[s];
              return (
                <button
                  key={s}
                  className={`admin-dropdown-item dash-status--${c}`}
                  onClick={() => { onChange(s); setOpen(false); }}
                >
                  <I size={13} /> {s}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminProjetosPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL);

  const updateStatus = (id: number, status: Status) =>
    setProjects((ps) => ps.map((p) => p.id === id ? { ...p, status } : p));

  const updateProgress = (id: number, progress: number) =>
    setProjects((ps) => ps.map((p) => p.id === id ? { ...p, progress } : p));

  return (
    <div className="dash-page">
      <motion.div
        className="dash-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="dash-page-title">Projetos</h1>
          <p className="dash-page-sub">{projects.length} projetos no total</p>
        </div>
      </motion.div>

      <div className="admin-projects-table">
        {/* Header */}
        <div className="admin-table-header">
          <span>Projeto / Cliente</span>
          <span>Progresso</span>
          <span>Status</span>
          <span>Atualizado</span>
        </div>

        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="admin-table-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="admin-row-project">
              <div className="admin-row-name">{p.name}</div>
              <div className="admin-row-sub">{p.client} · {p.type}</div>
            </div>

            <div className="admin-progress-cell">
              <div className="dash-progress-header">
                <span className="dash-progress-label">Progresso</span>
                <span className="dash-progress-pct" style={{ color: 'var(--dash-blue)' }}>
                  {p.progress}%
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="dash-progress-track" style={{ flex: 1 }}>
                  <motion.div
                    className="dash-progress-fill dash-progress-fill--blue"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={p.progress}
                onChange={(e) => updateProgress(p.id, Number(e.target.value))}
                className="admin-progress-slider"
              />
            </div>

            <StatusDropdown value={p.status} onChange={(s) => updateStatus(p.id, s)} />

            <div className="admin-row-time">{p.updated}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
