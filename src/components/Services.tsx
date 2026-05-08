'use client';

import { motion } from 'framer-motion';
import { Layout, Code, Zap, Smartphone, BarChart, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Service = {
  title: string;
  description: string;
  Icon: LucideIcon;
  features: string[];
};

const services: Service[] = [
  {
    title: 'Desenvolvimento Web',
    description:
      'Construo com Next.js e TypeScript do início. Sem atalho: código limpo, SEO real e performance que você mede no Lighthouse.',
    Icon: Code,
    features: ['Next.js 14+', 'TypeScript', 'SEO Técnico'],
  },
  {
    title: 'UI/UX Design',
    description:
      'Interface precisa funcionar, não só parecer bonita. Cada tela é pensada antes de virar código — protótipo, fluxo, depois desenvolvimento.',
    Icon: Layout,
    features: ['Figma Prototypes', 'Design System', 'Testes de Usabilidade'],
  },
  {
    title: 'Apps Mobile',
    description:
      'Uma base de código, dois apps nativos. React Native rodando direito em iOS e Android, sem gambiarras de compatibilidade.',
    Icon: Smartphone,
    features: ['React Native', 'iOS & Android', 'App Store Ready'],
  },
  {
    title: 'Dashboards & Analytics',
    description:
      'Dados viram decisão quando estão na tela certa. Construo painéis que o time realmente abre todo dia — não só na reunião mensal.',
    Icon: BarChart,
    features: ['Dados em Tempo Real', 'Gráficos Interativos', 'Export PDF'],
  },
  {
    title: 'Consultoria Técnica',
    description:
      'Código legado, performance travada ou arquitetura sem saída? A gente olha junto, sem julgamento, e define o próximo passo.',
    Icon: Zap,
    features: ['Code Review', 'Performance', 'Arquitetura'],
  },
  {
    title: 'Deploy & DevOps',
    description:
      'CI/CD, monitoramento e as configurações de segurança que todo projeto precisa mas ninguém quer fazer. Cuido disso pra você.',
    Icon: Shield,
    features: ['CI/CD Pipeline', 'Monitoramento', 'SSL & Segurança'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export const Services = () => {
  return (
    <section id="servicos" className="services">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            O que <span className="text-gradient">ofereço</span>
          </h2>
          <p className="section-subtitle">
            Do briefing ao deploy — desenvolvimento web, backend, mobile e infra. Código limpo do início ao fim.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, i) => {
            const { Icon } = service;
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-40px' }}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="service-card-wrapper"
              >
                <div className="service-card glass-card">
                  <div className="service-icon">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-features">
                    {service.features.map((f, j) => (
                      <span key={j} className="service-feature-tag">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="service-card-glow" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
