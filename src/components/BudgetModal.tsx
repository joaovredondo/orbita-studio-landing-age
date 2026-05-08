'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Send, Check,
         Globe, Layout, Smartphone, BarChart2, Zap, HelpCircle,
         Mail, MessageCircle } from 'lucide-react';

/* ── Types ── */
type Step = 0 | 1 | 2;

interface FormData {
  service: string;
  description: string;
  budget: string;
  deadline: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  contact: 'email' | 'whatsapp';
}

const INITIAL: FormData = {
  service: '',
  description: '',
  budget: '',
  deadline: '',
  reference: '',
  name: '',
  email: '',
  phone: '',
  contact: 'email',
};

/* ── Service options ── */
const SERVICES = [
  { id: 'web',          label: 'Desenvolvimento Web',   Icon: Globe },
  { id: 'uiux',         label: 'UI/UX Design',          Icon: Layout },
  { id: 'mobile',       label: 'App Mobile',            Icon: Smartphone },
  { id: 'dashboard',    label: 'Dashboard & Analytics', Icon: BarChart2 },
  { id: 'consultoria',  label: 'Consultoria Técnica',   Icon: Zap },
  { id: 'outro',        label: 'Outro',                 Icon: HelpCircle },
];

const BUDGETS = [
  'Até R$ 3.000',
  'R$ 3.000 – R$ 8.000',
  'R$ 8.000 – R$ 20.000',
  'R$ 20.000 – R$ 50.000',
  'Acima de R$ 50.000',
];

const DEADLINES = ['1 – 2 semanas', '1 mês', '2 – 3 meses', '3 – 6 meses', 'Sem prazo definido'];

const STEPS = ['Serviço', 'Detalhes', 'Contato'];

/* ── Step variants ── */
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* ── Component ── */
export const BudgetModal = () => {
  const [open, setOpen]       = useState(false);
  const [step, setStep]       = useState<Step>(0);
  const [dir, setDir]         = useState(1);
  const [form, setForm]       = useState<FormData>(INITIAL);
  const [submitted, setSubmit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Listen for open event from any component */
  useEffect(() => {
    const handler = () => { setOpen(true); setStep(0); setDir(1); setSubmit(false); setForm(INITIAL); };
    window.addEventListener('budget:open', handler);
    return () => window.removeEventListener('budget:open', handler);
  }, []);

  /* Detect mobile for bottom-sheet animation */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Lock scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  const next = () => { setDir(1); setStep((s) => Math.min(s + 1, 2) as Step); };
  const back = () => { setDir(-1); setStep((s) => Math.max(s - 1, 0) as Step); };

  const canNext = () => {
    if (step === 0) return form.service !== '';
    if (step === 1) return form.description.trim().length > 10 && form.budget !== '' && form.deadline !== '';
    return form.name.trim() !== '' && /\S+@\S+\.\S+/.test(form.email);
  };

  const submit = () => setSubmit(true);

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Dialog */}
          <motion.div
            className="modal-dialog"
            initial={isMobile ? { y: '100%', opacity: 0 } : { opacity: 0, scale: 0.95, y: 18 }}
            animate={isMobile ? { y: 0, opacity: 1 }      : { opacity: 1, scale: 1,    y: 0  }}
            exit={isMobile    ? { y: '100%', opacity: 0 } : { opacity: 0, scale: 0.95, y: 18 }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            {/* Alça visual (mobile bottom-sheet) */}
            {isMobile && <div className="modal-drag-handle" />}
            {/* Close */}
            <button className="modal-close" onClick={close} aria-label="Fechar">
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                {/* Step indicator */}
                <div className="modal-steps">
                  {STEPS.map((label, i) => (
                    <div key={i} className={`modal-step${i <= step ? ' active' : ''}${i < step ? ' done' : ''}`}>
                      <div className="modal-step-dot">
                        {i < step ? <Check size={11} /> : i + 1}
                      </div>
                      <span className="modal-step-label">{label}</span>
                      {i < STEPS.length - 1 && <div className="modal-step-line" />}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="modal-body">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step}
                      custom={dir}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >

                      {/* ── Step 0: Serviço ── */}
                      {step === 0 && (
                        <div className="modal-step-content">
                          <h2 className="modal-title">Qual é o seu projeto?</h2>
                          <p className="modal-subtitle">Selecione o tipo de serviço que você precisa</p>
                          <div className="service-grid">
                            {SERVICES.map(({ id, label, Icon }) => (
                              <button
                                key={id}
                                className={`service-option${form.service === id ? ' selected' : ''}`}
                                onClick={() => set('service', id)}
                              >
                                <div className="service-option-icon">
                                  <Icon size={22} />
                                </div>
                                <span>{label}</span>
                                {form.service === id && (
                                  <motion.div
                                    className="service-option-check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                  >
                                    <Check size={12} />
                                  </motion.div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── Step 1: Detalhes ── */}
                      {step === 1 && (
                        <div className="modal-step-content">
                          <h2 className="modal-title">Detalhes do Projeto</h2>
                          <p className="modal-subtitle">Quanto mais detalhes, mais precisa será a proposta</p>

                          <div className="form-group">
                            <label className="form-label">Descrição do projeto *</label>
                            <textarea
                              className="form-textarea"
                              placeholder="Descreva seu projeto: o que precisa, para quem é, que funcionalidades são essenciais..."
                              value={form.description}
                              onChange={(e) => set('description', e.target.value)}
                              rows={4}
                            />
                            {(() => {
                              const len = form.description.trim().length;
                              const ok  = len > 10;
                              return (
                                <span className={`form-hint${ok ? ' ok' : ''}`}>
                                  {ok
                                    ? `✓ ${len} caracteres`
                                    : `Mínimo 10 caracteres — faltam ${10 - len + 1}`}
                                </span>
                              );
                            })()}
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Orçamento estimado *</label>
                              <select
                                className="form-select"
                                value={form.budget}
                                onChange={(e) => set('budget', e.target.value)}
                              >
                                <option value="">Selecione...</option>
                                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                              </select>
                            </div>

                            <div className="form-group">
                              <label className="form-label">Prazo desejado *</label>
                              <select
                                className="form-select"
                                value={form.deadline}
                                onChange={(e) => set('deadline', e.target.value)}
                              >
                                <option value="">Selecione...</option>
                                {DEADLINES.map((d) => <option key={d} value={d}>{d}</option>)}
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Referência visual (opcional)</label>
                            <input
                              className="form-input"
                              type="url"
                              placeholder="https://site-que-gostei.com"
                              value={form.reference}
                              onChange={(e) => set('reference', e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      {/* ── Step 2: Contato ── */}
                      {step === 2 && (
                        <div className="modal-step-content">
                          <h2 className="modal-title">Seus Dados</h2>
                          <p className="modal-subtitle">Como entrar em contato com você?</p>

                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Nome completo *</label>
                              <input
                                className="form-input"
                                type="text"
                                placeholder="João Silva"
                                value={form.name}
                                onChange={(e) => set('name', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">E-mail *</label>
                              <input
                                className="form-input"
                                type="email"
                                placeholder="voce@email.com"
                                value={form.email}
                                onChange={(e) => set('email', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">WhatsApp</label>
                              <input
                                className="form-input"
                                type="tel"
                                placeholder="(11) 99999-0000"
                                value={form.phone}
                                onChange={(e) => set('phone', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Preferência de contato</label>
                            <div className="contact-pref">
                              {([
                                { id: 'email',    label: 'E-mail',    Icon: Mail          },
                                { id: 'whatsapp', label: 'WhatsApp',  Icon: MessageCircle },
                              ] as const).map(({ id, label, Icon }) => (
                                <button
                                  key={id}
                                  className={`pref-btn${form.contact === id ? ' selected' : ''}`}
                                  onClick={() => set('contact', id)}
                                >
                                  <Icon size={15} />
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer nav */}
                <div className="modal-footer">
                  {step > 0 ? (
                    <button className="modal-btn modal-btn--back" onClick={back}>
                      <ArrowLeft size={16} /> Voltar
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 2 ? (
                    <button
                      className="modal-btn modal-btn--next"
                      onClick={next}
                      disabled={!canNext()}
                    >
                      Continuar <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      className="modal-btn modal-btn--submit"
                      onClick={submit}
                      disabled={!canNext()}
                    >
                      Enviar Proposta <Send size={15} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Success state */
              <motion.div
                className="modal-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="success-icon">
                  <Check size={32} />
                </div>
                <h2 className="modal-title">Proposta Enviada!</h2>
                <p className="modal-subtitle">
                  Recebemos seu pedido,{' '}
                  <strong>{form.name.split(' ')[0]}</strong>. Retorno em até{' '}
                  <strong>24 horas</strong> via {form.contact === 'email' ? 'e-mail' : 'WhatsApp'}.
                </p>
                <button className="modal-btn modal-btn--next" onClick={close}>
                  Fechar
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
