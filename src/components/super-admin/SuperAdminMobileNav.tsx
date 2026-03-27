import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const mobileLinks = [
  { label: 'Tableau de bord', path: '/dashboard' },
  { label: 'Sites', path: '/sites' },
  { label: 'Étudiants', path: '/students' },
  { label: 'Formateurs', path: '/teachers' },
  { label: 'Paramètres', path: '/settings' },
];

const SuperAdminMobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-slate-700 shadow-sm"
        aria-expanded={open}
        aria-label="Ouvrir la navigation super admin"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span>Menu</span>
      </button>

      {open ? (
        <div className="mt-3 space-y-1 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          {mobileLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-slate-50 ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                }`
              }
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SuperAdminMobileNav;
