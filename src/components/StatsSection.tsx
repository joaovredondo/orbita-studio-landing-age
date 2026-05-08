'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    const steps = 60;
    const duration = 1800;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(target * progress));
      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    number: 50,
    suffix: '+',
    label: 'Projetos entregues',
    description: 'Sites, apps e dashboards',
    color: 'var(--primary)',
  },
  {
    number: 30,
    suffix: '+',
    label: 'Clientes atendidos',
    description: 'Negócios de diferentes segmentos',
    color: 'var(--secondary)',
  },
  {
    number: 5,
    suffix: '+',
    label: 'Anos com React',
    description: 'Do CRA ao Next.js App Router',
    color: 'var(--primary)',
  },
  {
    number: 98,
    suffix: '%',
    label: 'Satisfação',
    description: 'Média pós-entrega dos projetos',
    color: 'var(--secondary)',
  },
];

export const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            >
              <div className="stat-number" style={{ color: stat.color }}>
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
