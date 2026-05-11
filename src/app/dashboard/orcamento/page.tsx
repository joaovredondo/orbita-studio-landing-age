'use client';

import { motion } from 'framer-motion';
import { FileText, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { BudgetModal } from '@/components/BudgetModal';

type BudgetStatus = 'Em análise' | 'Aprovado' | 'Recusado';

const STATUS_CONFIG: Record<BudgetStatus, { color: string; Icon: React.ElementType }> = {
  'Em análise': { color: 'yellow', Icon: Clock        },
  'Aprovado':   { color: 'green',  Icon: CheckCircle  },
  'Recusado':   { color: 'red',    Icon: XCircle      },
};

const budgets = [
  {
    id: '#003',
    service: 'App Mobile',
    detail: 'App de delivery React Native para iOS e Android',
    status: 'Em análise' as BudgetStatus,
    budget: 'R$ 8.000 – R$ 20.000',
    date: '08/05/2026',
  },
  {
    id: '#002',
    service: 'UI/UX Design',
    detail: 'Design system e protótipo de alta fidelidade no Figma',
    status: 'Aprovado' as BudgetStatus,
    budget: 'R$ 3.000 – R$ 8.000',
    date: '01/04/2026',
  },
  {
    id: '#001',
    service: 'Consultoria Técnica',
    detail: 'Code review e auditoria de performance',
    status: 'Recusado' as BudgetStatus,
    budget: 'Até R$ 3.000',
    date: '10/03/2026',
  },
];

export default function OrcamentoPage() {
  const openModal = () => window.dispatchEvent(new Event('budget:open'));

  return (
    <div className="dash-page">
      <BudgetModal />

      <motion.div
        className="dash-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="dash-page-title">Orçamentos</h1>
          <p className="dash-page-sub">{budgets.length} pedidos enviados</p>
        </div>
        <button className="dash-cta-btn" onClick={openModal}>
          <Plus size={15} /> Novo Pedido
        </button>
      </motion.div>

      {/* Budget list */}
      <div className="dash-budget-list">
        {budgets.map(({ id, service, detail, status, budget, date }, i) => {
          const { color, Icon } = STATUS_CONFIG[status];
          return (
            <motion.div
              key={id}
              className="dash-budget-item"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="dash-budget-icon-wrap">
                <FileText size={18} />
              </div>
              <div className="dash-budget-info">
                <div className="dash-budget-service">{service}</div>
                <div className="dash-budget-detail">{detail}</div>
                <div className="dash-budget-meta">{id} · {budget} · {date}</div>
              </div>
              <div className={`dash-status dash-status--${color}`}>
                <Icon size={13} />
                {status}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
