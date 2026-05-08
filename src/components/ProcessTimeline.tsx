'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Palette, Code2, Rocket, ListChecks } from 'lucide-react';

const steps = [
  {
    number: '01',
    Icon: MessageSquare,
    title: 'Conversa inicial',
    description:
      'Entendo o que você precisa — e o que você acha que precisa. São coisas diferentes. Essa conversa define o escopo real, evita retrabalho e alinha expectativas antes de qualquer investimento.',
    tag: 'Descoberta',
  },
  {
    number: '02',
    Icon: Palette,
    title: 'Protótipo & aprovação',
    description:
      'Wireframe e protótipo de alta fidelidade antes de uma linha de código. Você vê, ajusta e aprova cada tela. Só depois de aprovado, o desenvolvimento começa.',
    tag: 'Design',
  },
  {
    number: '03',
    Icon: Code2,
    title: 'Desenvolvimento',
    description:
      'Código com TypeScript, componentes organizados e entregas por etapas. Daily ou check-in semanal — você escolhe o ritmo de acompanhamento durante o build.',
    tag: 'Código',
  },
  {
    number: '04',
    Icon: ListChecks,
    title: 'Validação',
    description:
      'Testes funcionais, revisão de UI e rodadas de feedback. Nada vai para produção com bug óbvio — cada tela é validada por você antes do deploy.',
    tag: 'QA',
  },
  {
    number: '05',
    Icon: Rocket,
    title: 'Entrega & suporte',
    description:
      'Deploy sem downtime e acompanho os primeiros dias em produção. Qualquer problema pós-entrega, resolvo sem custo adicional.',
    tag: 'Entrega',
  },
];

type Step = typeof steps[number];

function TimelineStep({ step, index }: { step: Step; index: number }) {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });
  const { Icon } = step;

  const content = (
    <motion.div
      className="timeline-content"
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="timeline-tag">{step.tag}</span>
      <h3 className="timeline-step-title">{step.title}</h3>
      <p className="timeline-step-description">{step.description}</p>
    </motion.div>
  );

  const node = (
    <div className="timeline-center">
      <motion.div
        className="timeline-node"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.25, duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        <Icon size={22} />
        <span className="timeline-number">{step.number}</span>
      </motion.div>
    </div>
  );

  return (
    <div ref={ref} className={`timeline-step ${isLeft ? 'timeline-step--left' : 'timeline-step--right'}`}>
      {isLeft ? (
        <>
          {content}
          {node}
          <div className="timeline-spacer" />
        </>
      ) : (
        <>
          <div className="timeline-spacer" />
          {node}
          {content}
        </>
      )}
    </div>
  );
}

export const ProcessTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 30%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="process" id="processo">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Como <span className="text-gradient">funciona</span>
          </h2>
          <p className="section-subtitle">
            Começa com uma conversa. Termina com o produto no ar.
          </p>
        </motion.div>

        <div className="timeline">
          <div className="timeline-track">
            <motion.div className="timeline-track-fill" style={{ height: lineHeight }} />
          </div>

          {steps.map((step, i) => (
            <TimelineStep key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
