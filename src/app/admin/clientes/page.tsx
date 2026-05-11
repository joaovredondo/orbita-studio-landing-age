'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, FolderOpen, Calendar } from 'lucide-react';

const clients = [
  { name: 'Ana Costa',     email: 'ana@email.com',     phone: '(11) 98001-0001', projects: 2, since: 'Jan 2026', status: 'Ativo'   },
  { name: 'Pedro Alves',   email: 'pedro@email.com',   phone: '(11) 98001-0002', projects: 1, since: 'Fev 2026', status: 'Ativo'   },
  { name: 'Mariana Lima',  email: 'mariana@email.com', phone: '(11) 98001-0003', projects: 3, since: 'Mar 2026', status: 'Ativo'   },
  { name: 'Carlos Mendes', email: 'carlos@email.com',  phone: '(11) 98001-0004', projects: 1, since: 'Abr 2026', status: 'Ativo'   },
  { name: 'Juliana Souza', email: 'ju@email.com',      phone: '(11) 98001-0005', projects: 0, since: 'Mai 2026', status: 'Novo'    },
  { name: 'Rafael Torres', email: 'rafa@email.com',    phone: '(11) 98001-0006', projects: 2, since: 'Jan 2026', status: 'Inativo' },
];

const STATUS_COLOR: Record<string, string> = {
  Ativo: 'green', Novo: 'blue', Inativo: 'muted',
};

export default function ClientesPage() {
  return (
    <div className="dash-page">
      <motion.div
        className="dash-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="dash-page-title">Clientes</h1>
          <p className="dash-page-sub">{clients.length} clientes cadastrados</p>
        </div>
      </motion.div>

      <div className="admin-clients-grid">
        {clients.map(({ name, email, phone, projects, since, status }, i) => (
          <motion.div
            key={name}
            className="admin-client-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="admin-client-top">
              <div className="admin-client-avatar admin-client-avatar--lg">
                {name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className={`dash-status dash-status--${STATUS_COLOR[status]}`}>
                {status}
              </div>
            </div>

            <div className="admin-client-name">{name}</div>

            <div className="admin-client-details">
              <div className="admin-detail-row">
                <Mail size={13} />
                <span>{email}</span>
              </div>
              <div className="admin-detail-row">
                <Phone size={13} />
                <span>{phone}</span>
              </div>
              <div className="admin-detail-row">
                <FolderOpen size={13} />
                <span>{projects} projeto{projects !== 1 ? 's' : ''}</span>
              </div>
              <div className="admin-detail-row">
                <Calendar size={13} />
                <span>Cliente desde {since}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
