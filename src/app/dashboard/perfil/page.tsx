'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Check } from 'lucide-react';

const fields = [
  { key: 'name',  label: 'Nome completo', Icon: User,    type: 'text',  placeholder: 'Seu nome' },
  { key: 'email', label: 'E-mail',        Icon: Mail,    type: 'email', placeholder: 'voce@email.com' },
  { key: 'phone', label: 'Telefone',      Icon: Phone,   type: 'tel',   placeholder: '(11) 99999-0000' },
  { key: 'city',  label: 'Cidade',        Icon: MapPin,  type: 'text',  placeholder: 'São Paulo, SP' },
] as const;

type FieldKey = typeof fields[number]['key'];

export default function PerfilPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<Record<FieldKey, string>>({
    name:  'João Victor Redondo',
    email: 'joao@email.com',
    phone: '(11) 99999-0000',
    city:  'São Paulo, SP',
  });

  const set = (k: FieldKey, v: string) => setForm((f) => ({ ...f, [k]: v }));

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
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="dash-page-title">Perfil</h1>
          <p className="dash-page-sub">Gerencie suas informações pessoais</p>
        </div>
      </motion.div>

      {/* Avatar card */}
      <motion.div
        className="dash-profile-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="dash-profile-avatar">JV</div>
        <div>
          <div className="dash-profile-name">{form.name}</div>
          <div className="dash-profile-since">Cliente desde Maio 2026</div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        className="dash-profile-form"
        onSubmit={handleSave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        <h2 className="dash-card-title" style={{ marginBottom: '1.25rem' }}>
          Informações pessoais
        </h2>

        <div className="dash-profile-fields">
          {fields.map(({ key, label, Icon, type, placeholder }) => (
            <div key={key} className="dash-profile-field">
              <label className="dash-field-label">{label}</label>
              <div className="dash-field-wrap">
                <Icon size={15} className="dash-field-icon" />
                <input
                  type={type}
                  className="dash-field-input"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="dash-profile-actions">
          <button type="submit" className="dash-save-btn">
            {saved ? (
              <><Check size={15} /> Salvo!</>
            ) : (
              'Salvar alterações'
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
