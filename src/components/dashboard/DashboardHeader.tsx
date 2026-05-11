'use client';

import { Bell, Search } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <header className="dash-header">
      <div className="dash-header-search">
        <Search size={15} />
        <input
          type="text"
          placeholder="Buscar projetos..."
          className="dash-search-input"
        />
      </div>

      <div className="dash-header-right">
        <button className="dash-notif-btn" aria-label="Notificações">
          <Bell size={18} />
          <span className="dash-notif-dot" />
        </button>
        <div className="dash-avatar" title="João Victor Redondo">JV</div>
      </div>
    </header>
  );
};
