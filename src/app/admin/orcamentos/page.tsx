'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, Clock } from 'lucide-react';

type BudgetStatus = 'Em análise' | 'Aprovado' | 'Recusado';

type Budget = {
  id: string;
  client: string;
  email: string;
  service: string;
  description: string;
  budget: string;
  deadline: string;
  contact: string;
  status: BudgetStatus;
  date: string;
};

const INITIAL: Budget[] = [
  {
    id: '#005', client: 'Juliana Souza',  email: 'ju@email.com',      service: 'Desenvolvimento Web',
    description: 'Landing page completa com formulário e integração de pagamento.',
    budget: 'R$ 3.000 – R$ 8.000', deadline: '1 – 2 meses', contact: 'WhatsApp', status: 'Em análise', date: '09/05/2026',
  },
  {
    id: '#004', client: 'Ana Costa',      email: 'ana@email.com',      service: 'Desenvolvimento Web',
    description: 'E-commerce completo com painel admin, estoque e checkout.',
    budget: 'R$ 8.000 – R$ 20.000', deadline: '2 – 3 meses', contact: 'E-mail', status: 'Em análise', date: '08/05/2026',
  },
  {
    id: '#003', client: 'Pedro Alves',    email: 'pedro@email.com',    service: 'App Mobile',
    description: 'App de delivery com rastreamento em tempo real.',
    budget: 'R$ 20.000 – R$ 50.000', deadline: '3 – 6 meses', contact: 'WhatsApp', status: 'Aprovado', date: '01/04/2026',
  },
  {
    id: '#002', client: 'Mariana Lima',   email: 'mariana@email.com',  service: 'UI/UX Design',
    description: 'Design system e protótipos para plataforma SaaS.',
    budget: 'R$ 3.000 – R$ 8.000', deadline: '1 mês', contact: 'E-mail', status: 'Aprovado', date: '15/03/2026',
  },
  {
    id: '#001', client: 'Carlos Mendes',  email: 'carlos@email.com',   service: 'Consultoria Técnica',
    description: 'Code review e otimização de performance.',
    budget: 'Até R$ 3.000', deadline: '1 – 2 semanas', contact: 'E-mail', status: 'Recusado', date: '10/03/2026',
  },
];

const STATUS_COLOR: Record<BudgetStatus, string> = {
  'Em análise': 'yellow', 'Aprovado': 'green', 'Recusado': 'red',
};

export default function AdminOrcamentosPage() {
  const [budgets, setBudgets] = useState<Budget[]>(INITIAL);
  const [expanded, setExpanded] = useState<string | null>(null);

  const setStatus = (id: string, status: BudgetStatus) =>
    setBudgets((bs) => bs.map((b) => b.id === id ? { ...b, status } : b));

  return (
    <div className="dash-page">
      <motion.div
        className="dash-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="dash-page-title">Orçamentos</h1>
          <p className="dash-page-sub">{budgets.filter((b) => b.status === 'Em análise').length} aguardando resposta</p>
        </div>
      </motion.div>

      <div className="dash-budget-list">
        {budgets.map((b, i) => (
          <motion.div
            key={b.id}
            className="admin-budget-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="admin-budget-main">
              <div className="admin-client-avatar">{b.client[0]}</div>
              <div className="admin-row-info" style={{ flex: 1 }}>
                <div className="admin-row-name">{b.client}</div>
                <div className="admin-row-sub">{b.service} · {b.budget} · {b.date}</div>
              </div>
              <div className={`dash-status dash-status--${STATUS_COLOR[b.status]}`}>
                {b.status === 'Em análise' && <Clock size={13} />}
                {b.status === 'Aprovado'   && <Check size={13} />}
                {b.status === 'Recusado'   && <X     size={13} />}
                {b.status}
              </div>
              <button
                className="admin-expand-btn"
                onClick={() => setExpanded((v) => v === b.id ? null : b.id)}
              >
                <Eye size={15} />
              </button>
            </div>

            {expanded === b.id && (
              <motion.div
                className="admin-budget-detail"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="admin-budget-fields">
                  <div><span>Descrição</span><p>{b.description}</p></div>
                  <div><span>Prazo</span><p>{b.deadline}</p></div>
                  <div><span>Contato preferido</span><p>{b.contact}</p></div>
                  <div><span>E-mail</span><p>{b.email}</p></div>
                </div>

                {b.status === 'Em análise' && (
                  <div className="admin-budget-actions">
                    <button
                      className="admin-action-btn admin-action-btn--approve"
                      onClick={() => setStatus(b.id, 'Aprovado')}
                    >
                      <Check size={15} /> Enviar Proposta
                    </button>
                    <button
                      className="admin-action-btn admin-action-btn--reject"
                      onClick={() => setStatus(b.id, 'Recusado')}
                    >
                      <X size={15} /> Recusar
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
