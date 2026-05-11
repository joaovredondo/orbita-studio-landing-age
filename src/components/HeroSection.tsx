'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, Star, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';

const PARTICLES = [
  { x:  8, y: 15, size: 3, dur: 3.0, delay: 0.0 },
  { x: 15, y: 70, size: 2, dur: 4.0, delay: 0.5 },
  { x: 25, y: 35, size: 4, dur: 3.5, delay: 1.0 },
  { x: 35, y: 85, size: 2, dur: 3.2, delay: 0.3 },
  { x: 45, y: 20, size: 3, dur: 4.5, delay: 1.2 },
  { x: 55, y: 60, size: 2, dur: 3.8, delay: 0.8 },
  { x: 65, y: 90, size: 3, dur: 3.1, delay: 0.2 },
  { x: 72, y: 40, size: 2, dur: 4.2, delay: 1.5 },
  { x: 80, y: 15, size: 4, dur: 3.6, delay: 0.6 },
  { x: 88, y: 75, size: 2, dur: 4.8, delay: 1.8 },
  { x: 92, y: 50, size: 3, dur: 3.3, delay: 0.4 },
  { x: 12, y: 50, size: 2, dur: 5.0, delay: 2.0 },
  { x: 50, y: 10, size: 3, dur: 4.1, delay: 0.9 },
  { x: 70, y: 65, size: 2, dur: 3.7, delay: 1.3 },
  { x: 30, y: 55, size: 4, dur: 4.3, delay: 0.7 },
];

const wordVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.1 + i * 0.11,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const titleLines = [
  { text: 'Código que',      highlight: false },
  { text: 'Impressiona.',    highlight: true  },
  { text: 'Resultados que',  highlight: false },
  { text: 'Importam.',       highlight: false },
];

const trustStats = [
  { Icon: Award,  value: '50+', label: 'Projetos' },
  { Icon: Users,  value: '30+', label: 'Clientes' },
  { Icon: Star,   value: '98%', label: 'Satisfação' },
];

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const openModal = () => window.dispatchEvent(new Event('budget:open'));

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="hero-grid" />

      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="hero-particle"
          style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay:    `${p.delay}s`,
          }}
        />
      ))}

      <motion.div
        className="hero-container"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* ── Left: text ── */}
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="hero-badge">✦ Desenvolvedor Full Stack</span>
          </motion.div>

          <h1 className="hero-title">
            {titleLines.map((line, i) => (
              <motion.span
                key={i}
                className={`hero-word${line.highlight ? ' text-accent' : ''}`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
              >
                {line.text}
                {i < titleLines.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
          >
            Construo sites, dashboards e apps do zero — com código organizado, performance
            que dá pra medir e interfaces que as pessoas realmente gostam de usar.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.55 }}
          >
            <Button size="lg" onClick={openModal}>
              Solicitar Orçamento Agora
            </Button>
            <Link href="#portfolio">
              <Button variant="secondary" size="lg">Ver Portfolio</Button>
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {trustStats.map(({ Icon, value, label }) => (
              <div key={label} className="hero-trust-item">
                <Icon size={14} className="text-primary" />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: code card (contained) ── */}
        <motion.div
          className="hero-visual-wrapper"
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-visual">
            {/* Floating badges — positioned INSIDE wrapper padding */}
            <div className="floating-badge floating-badge--1">⚡ Performance 98</div>
            <div className="floating-badge floating-badge--2">✓ TypeScript</div>
            <div className="floating-badge floating-badge--3">🎨 UI/UX Premium</div>

            <div className="hero-code-card">
              {/* Tab bar */}
              <div className="code-card-tabs">
                <div className="code-tab active">
                  <span className="code-tab-dot" />
                  órbita.tsx
                </div>
                <div className="code-tab muted">dashboard.tsx</div>
              </div>

              {/* Window chrome */}
              <div className="code-card-header">
                <span className="code-dot code-dot--red" />
                <span className="code-dot code-dot--yellow" />
                <span className="code-dot code-dot--green" />
                <span className="code-card-filename">src / app / page.tsx</span>
              </div>

              {/* Code */}
              <pre className="code-card-body">
                <code>
                  <span className="c-ln"> 1 </span>
                  <span className="c-kw">const</span>{' '}
                  <span className="c-fn">App</span>{' '}
                  <span className="c-op">=</span>{' '}
                  <span className="c-kw">() =&gt;</span>{' ('}
                  {'\n'}
                  <span className="c-ln"> 2 </span>
                  {'  '}
                  <span className="c-tag">&lt;Interface</span>
                  {'\n'}
                  <span className="c-ln"> 3 </span>
                  {'    '}
                  <span className="c-attr">premium</span>
                  <span className="c-op">=</span>
                  {'{'}<span className="c-bool">true</span>{'}'}
                  {'\n'}
                  <span className="c-ln"> 4 </span>
                  {'    '}
                  <span className="c-attr">animated</span>
                  <span className="c-op">=</span>
                  {'{'}<span className="c-bool">true</span>{'}'}
                  {'\n'}
                  <span className="c-ln"> 5 </span>
                  {'    '}
                  <span className="c-attr">conversion</span>
                  <span className="c-op">=</span>
                  {'{'}<span className="c-str">&quot;max&quot;</span>{'}'}
                  {'\n'}
                  <span className="c-ln"> 6 </span>
                  {'  '}
                  <span className="c-tag">/&gt;</span>
                  {'\n'}
                  <span className="c-ln"> 7 </span>
                  {')'}<span className="c-cursor" />
                </code>
              </pre>

              {/* Status bar */}
              <div className="code-card-statusbar">
                <span className="status-item status-ok">● TypeScript</span>
                <span className="status-item">Ln 7, Col 2</span>
                <span className="status-item">UTF-8</span>
              </div>

              <div className="code-card-glow" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#servicos"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
        <span>Scroll</span>
      </motion.a>

      <div className="hero-orb" />
    </section>
  );
};
