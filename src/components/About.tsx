'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Rocket, Code2, Palette, Zap } from 'lucide-react';
import { Button } from './ui/Button';

/* Mini-grid no cartão de identidade */
const gridStack = [
  { name: 'React',      color: '#61DAFB', bg: 'rgba(97,218,251,0.12)',  abbr: '⚛'  },
  { name: 'Laravel',    color: '#FF2D20', bg: 'rgba(255,45,32,0.10)',   abbr: 'L'  },
  { name: 'TypeScript', color: '#4d9dda', bg: 'rgba(49,120,198,0.15)',  abbr: 'TS' },
  { name: 'MySQL',      color: '#4479A1', bg: 'rgba(68,121,161,0.12)',  abbr: 'DB' },
];

/* Barras de habilidade */
const barStack = [
  { name: 'React / Next.js', color: '#61DAFB', bg: 'rgba(97,218,251,0.12)', abbr: '⚛',  bar: 'linear-gradient(90deg,#22b3d0,#61DAFB)', level: 97 },
  { name: 'HTML / CSS / JS',  color: '#E34F26', bg: 'rgba(227,79,38,0.10)',  abbr: 'H',   bar: 'linear-gradient(90deg,#c94422,#f7df1e)', level: 95 },
  { name: 'TypeScript',       color: '#4d9dda', bg: 'rgba(49,120,198,0.15)', abbr: 'TS',  bar: 'linear-gradient(90deg,#1c5fa3,#4d9dda)', level: 91 },
  { name: 'Laravel / PHP',    color: '#FF2D20', bg: 'rgba(255,45,32,0.10)',  abbr: 'L',   bar: 'linear-gradient(90deg,#c41510,#FF2D20)', level: 87 },
  { name: 'MySQL / SQL',      color: '#4479A1', bg: 'rgba(68,121,161,0.12)', abbr: 'DB',  bar: 'linear-gradient(90deg,#2d6086,#4479A1)', level: 84 },
];

/* Chips de infra / redes */
const infraTags = ['Mikrotik', 'TCP/IP', 'Switching', 'Redes LAN/WAN'];

const values = [
  { Icon: Code2,   title: 'Código que dura',       desc: 'TypeScript, padrões claros e componentes que outro dev consegue entender sem perguntar.' },
  { Icon: Palette, title: 'Design que funciona',   desc: 'Bonito é consequência. O que importa é o fluxo fazer sentido pra quem usa.' },
  { Icon: Zap,     title: 'Performance real',      desc: 'Lighthouse no verde, Core Web Vitals ok e página que carrega antes do usuário perceber.' },
  { Icon: Rocket,  title: 'Sem sumiço',            desc: 'Prazo combinado é prazo cumprido. E se der algo errado, você é o primeiro a saber.' },
];

export const About = () => {
  const openModal = () => window.dispatchEvent(new Event('budget:open'));

  return (
    <section id="sobre" className="about">
      <div className="container">
        <div className="about-grid">
          {/* ── Left: Identity card ── */}
          <motion.div
            className="about-identity"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Portrait */}
            <div className="about-portrait-wrap">
              <div className="about-portrait">
                <div className="about-portrait-initials">JV</div>
                <div className="about-portrait-glow" />
              </div>
              <div className="about-portrait-ring" />

              {/* Floating micro-cards */}
              <motion.div
                className="about-micro-card about-micro-card--tl"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="micro-value">5+</span>
                <span className="micro-label">anos exp.</span>
              </motion.div>

              <motion.div
                className="about-micro-card about-micro-card--br"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <span className="micro-value">🚀 20+</span>
                <span className="micro-label">projetos / ano</span>
              </motion.div>
            </div>

            {/* Tech stack mini-grid */}
            <h3 className="about-stack-title">Stack principal</h3>
            <div className="about-stack-grid">
              {gridStack.map((item) => (
                <div
                  key={item.name}
                  className="about-stack-badge"
                  style={{ borderColor: item.color + '44', background: item.bg }}
                >
                  <span style={{ color: item.color, fontWeight: 800 }}>{item.abbr}</span>
                  <span style={{ color: item.color, fontSize: '0.72rem', fontWeight: 600 }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Infra / redes */}
            <h3 className="about-stack-title" style={{ marginTop: '1rem' }}>Infra & Redes</h3>
            <div className="about-infra-tags">
              {infraTags.map((tag) => (
                <span key={tag} className="about-infra-tag">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Bio + values + CTA ── */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-eyebrow">
              <span className="hero-badge">Sobre mim</span>
            </div>

            <h2 className="about-name">João Victor Redondo</h2>
            <p className="about-role text-gradient">Desenvolvedor Full Stack</p>

            <p className="about-text">
              Comecei no front-end por necessidade — queria melhorar a interface de um projeto pessoal
              e fui fundo. Fiquei pela área. Hoje, com mais de 5 anos de experiência, trabalho do
              front ao back — React, Laravel, banco de dados — e também com infra de redes quando
              o projeto pede. Cuido de cada detalhe: da animação que você mal percebe ao carregamento
              que seu usuário nunca reclamou porque simplesmente era rápido.
            </p>

            {/* Values grid */}
            <div className="about-values">
              {values.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="about-value-item"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <div className="about-value-icon">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="about-value-title">{title}</div>
                    <div className="about-value-desc">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skill bars */}
            <div className="stack-bars">
              {barStack.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="stack-bar-item"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="stack-bar-header">
                    <div className="stack-bar-name-wrapper">
                      <span className="stack-bar-icon" style={{ color: item.color, background: item.bg }}>
                        {item.abbr}
                      </span>
                      <span className="stack-bar-name">{item.name}</span>
                    </div>
                    <span className="stack-bar-level" style={{ color: item.color }}>{item.level}%</span>
                  </div>
                  <div className="stack-bar-track">
                    <motion.div
                      className="stack-bar-fill"
                      style={{ background: item.bar }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 1.1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="about-cta">
              <Button size="lg" onClick={openModal}>
                Vamos trabalhar juntos <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
