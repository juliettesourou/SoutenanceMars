import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Tableau de bord', path: '/dashboard/admin' },
  { label: 'Étudiants', path: '/dashboard/admin/etudiants' },
  { label: 'Évaluations', path: '/dashboard/admin/evaluations' },
  { label: 'Enseignants', path: '/dashboard/admin/enseignants' },
  { label: 'Surveillants', path: '/dashboard/admin/surveillants' },
  { label: 'Matières / Unités', path: '/dashboard/admin/matieres' },
  { label: 'Performances', path: '/dashboard/admin/performances' },
  { label: 'Communication', path: '/dashboard/admin/communication' },
  { label: 'Utilisateurs locaux', path: '/dashboard/admin/utilisateurs' },
  { label: 'Planning / Ressources', path: '/dashboard/admin/planning' },
  { label: 'Demandes / Réclamations', path: '/dashboard/admin/demandes' },
  { label: 'Centres', path: '/dashboard/admin/centres' },
];

const AdminMobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-slate-700 shadow-sm hover:border-[#1D4ED8]"
        aria-expanded={open}
        aria-label="Ouvrir la navigation admin"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span>Menu admin</span>
      </button>

      {open ? (
        <div className="mt-3 space-y-1 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-[#E8EDFF] ${
                  isActive ? 'bg-[#1D4ED8]/10 text-[#1D4ED8] font-medium' : 'text-slate-700'
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

export default AdminMobileNav;
