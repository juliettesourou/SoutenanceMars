import React from 'react';
import AdminThemeSwitcher from './AdminThemeSwitcher';

interface AdminTopbarProps {
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({
  title = 'Dashboard centre',
  subtitle = 'Vue d’ensemble des indicateurs clés',
  rightSlot,
}) => {
  return (
    <header className="flex flex-col gap-3 bg-[#F3F7FF] px-4 pb-3 pt-4 md:flex-row md:items-center md:justify-between md:pt-6 md:pb-4 sm:px-6 lg:px-10">
      <div className="space-y-1">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E8EDFF] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1D4ED8]">
          Centre de formation
        </span>
        <h1 className="text-lg font-semibold text-[#0F172A] sm:text-xl">{title}</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 md:justify-end">
        {rightSlot}
        <AdminThemeSwitcher />
      </div>
    </header>
  );
};

export default AdminTopbar;
