'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, GitBranch } from 'lucide-react';

const categories = ['Todos', 'Web', 'Dashboard', 'Mobile'];

const projects = [
  {
    title: 'E-commerce Premium',
    category: 'Web',
    description: 'Plataforma de vendas com checkout otimizado e painel admin completo.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Stripe', 'Supabase'],
  },
  {
    title: 'Dashboard Analítico',
    category: 'Dashboard',
    description: 'Painel de métricas em tempo real com visualizações interativas e relatórios.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Charts.js', 'WebSocket'],
  },
  {
    title: 'App de Finanças',
    category: 'Mobile',
    description: 'Aplicativo para controle financeiro pessoal com relatórios automáticos.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    tags: ['React Native', 'TypeScript'],
  },
  {
    title: 'SaaS Platform',
    category: 'Web',
    description: 'Plataforma multi-tenant com autenticação, billing e onboarding completo.',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Prisma', 'Stripe'],
  },
  {
    title: 'Admin Dashboard',
    category: 'Dashboard',
    description: 'Sistema de gestão completo com relatórios avançados e exportação em PDF.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'TailwindCSS', 'PDF'],
  },
  {
    title: 'Landing Page SaaS',
    category: 'Web',
    description: 'Landing page de alta conversão com animações premium e testes A/B.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Framer Motion'],
  },
];

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filtered =
    activeFilter === 'Todos' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Trabalhos em <span className="text-accent">Destaque</span>
          </h2>
          <p className="section-subtitle">
            Alguns projetos dos últimos dois anos. Clique nas imagens para ver mais detalhes.
          </p>
        </motion.div>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`portfolio-filter-btn${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
              {activeFilter === cat && (
                <motion.span
                  className="filter-active-pill"
                  layoutId="filterPill"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <motion.div className="portfolio-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35 }}
                className="portfolio-item"
              >
                <div className="portfolio-card glass-card">
                  <div className="portfolio-image-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="portfolio-image"
                    />
                    <div className="portfolio-overlay">
                      <div className="portfolio-overlay-actions">
                        <button className="portfolio-action-btn">
                          <ExternalLink size={16} />
                          <span>Ver Projeto</span>
                        </button>
                        <button className="portfolio-action-btn portfolio-action-btn--ghost">
                          <GitBranch size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-category text-primary">{project.category}</span>
                    <h3 className="portfolio-title">{project.title}</h3>
                    <p className="portfolio-desc">{project.description}</p>
                    <div className="portfolio-tags">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="portfolio-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
