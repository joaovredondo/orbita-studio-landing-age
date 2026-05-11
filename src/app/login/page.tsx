'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';

type Tab = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab]         = useState<Tab>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', password: '' });

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    router.push('/dashboard');
  };

  return (
    <div className="auth-page">
      {/* Grid background */}
      <div className="hero-grid" />
      <div className="hero-orb" />

      {/* Back */}
      <Link href="/" className="auth-back">
        <ArrowLeft size={15} /> Voltar ao site
      </Link>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand */}
        <div className="auth-brand">
          <span className="logo-mark" aria-hidden="true" />
          <span>Órbita <span className="logo-studio">Studio</span></span>
        </div>

        <p className="auth-tagline">
          {tab === 'login' ? 'Acesse seu painel de projetos' : 'Crie sua conta gratuitamente'}
        </p>

        {/* Tabs */}
        <div className="auth-tabs">
          {(['login', 'signup'] as const).map((t) => (
            <button
              key={t}
              className={`auth-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'login' ? 'Entrar' : 'Criar conta'}
              {tab === t && (
                <motion.div
                  className="auth-tab-line"
                  layoutId="auth-tab-line"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={tab}
            className="auth-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: tab === 'login' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {tab === 'signup' && (
              <div className="auth-field">
                <User size={15} className="auth-field-icon" />
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="auth-input"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <Mail size={15} className="auth-field-icon" />
              <input
                type="email"
                placeholder="E-mail"
                className="auth-input"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <Lock size={15} className="auth-field-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Senha"
                className="auth-input"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-pass-toggle"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {tab === 'login' && (
              <div className="auth-forgot">
                <a href="#">Esqueceu a senha?</a>
              </div>
            )}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  {tab === 'login' ? 'Entrar no painel' : 'Criar minha conta'}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
