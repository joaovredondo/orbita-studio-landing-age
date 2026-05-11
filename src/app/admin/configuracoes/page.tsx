'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    siteName: 'Órbita Studio',
    contactEmail: 'joao@orbitastudio.com.br',
    whatsapp: '(11) 99999-0000',
    responseTime: '24 horas',
    emailNotifications: true,
    whatsappNotifications: false,
  });

  const set = (k: keyof typeof config, v: string | boolean) =>
    setConfig((c) => ({ ...c, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="dash-page">
      <motion.div
        className="dash-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="dash-page-title">Configurações</h1>
          <p className="dash-page-sub">Gerencie as configurações do painel</p>
        </div>
      </motion.div>

      <motion.form
        className="admin-config-form"
        onSubmit={handleSave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <section className="admin-config-section">
          <h2 className="admin-config-title">Informações do Negócio</h2>
          <div className="dash-profile-fields">
            {[
              { key: 'siteName',      label: 'Nome do site',        type: 'text'  },
              { key: 'contactEmail',  label: 'E-mail de contato',   type: 'email' },
              { key: 'whatsapp',      label: 'WhatsApp',            type: 'tel'   },
              { key: 'responseTime',  label: 'Prazo de resposta',   type: 'text'  },
            ].map(({ key, label, type }) => (
              <div key={key} className="dash-profile-field">
                <label className="dash-field-label">{label}</label>
                <input
                  type={type}
                  className="dash-field-input"
                  style={{ paddingLeft: '0.9rem' }}
                  value={config[key as keyof typeof config] as string}
                  onChange={(e) => set(key as keyof typeof config, e.target.value)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="admin-config-section">
          <h2 className="admin-config-title">Notificações</h2>
          <div className="admin-toggles">
            {[
              { key: 'emailNotifications',    label: 'Notificações por e-mail',    desc: 'Receba alertas de novos orçamentos' },
              { key: 'whatsappNotifications', label: 'Notificações por WhatsApp',  desc: 'Alertas via mensagem no celular'    },
            ].map(({ key, label, desc }) => (
              <div key={key} className="admin-toggle-row">
                <div>
                  <div className="admin-toggle-label">{label}</div>
                  <div className="admin-toggle-desc">{desc}</div>
                </div>
                <button
                  type="button"
                  className={`admin-toggle-btn${config[key as keyof typeof config] ? ' on' : ''}`}
                  onClick={() => set(key as keyof typeof config, !config[key as keyof typeof config])}
                >
                  <span className="admin-toggle-thumb" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="dash-profile-actions">
          <button type="submit" className="dash-save-btn">
            {saved ? <><Check size={15} /> Salvo!</> : 'Salvar configurações'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
