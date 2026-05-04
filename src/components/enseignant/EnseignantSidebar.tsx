import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpenText,
  ClipboardList,
  Users,
  CalendarClock,
  Bell,
  MessageSquareMore,
} from 'lucide-react';

const enseignantLinks = [
  { label: 'Tableau de bord', path: '/dashboard/enseignant', icon: LayoutDashboard },
  { label: 'Notes et évaluations', path: '/dashboard/enseignant/evaluations', icon: ClipboardList },
  { label: 'Cours et matières', path: '/dashboard/enseignant/matieres', icon: BookOpenText },
  { label: 'Classes suivies', path: '/dashboard/enseignant/classes', icon: Users },
  { label: 'Séances et présences', path: '/dashboard/enseignant/calendar', icon: CalendarClock },
  { label: 'Alertes et rappels', path: '/dashboard/enseignant/notifications', icon: Bell },
  { label: 'Messagerie parents', path: '/dashboard/enseignant/messages', icon: MessageSquareMore },
];

const EnseignantSidebar: React.FC = () => {
  // location is available through NavLink active state; we don't need useLocation here

  return (
    <aside className="w-full border-b border-slate-200 bg-[#F8FAFF] md:sticky md:top-0 md:h-screen md:max-h-screen md:border-b-0 md:border-r md:w-64">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] flex items-center justify-center text-white font-bold text-lg shadow-sm">ens</div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-wide text-slate-500">Faculté</p>
            <p className="text-lg font-semibold text-[#0F172A]">Enseignant</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1 px-3 pb-6 text-sm">
        {enseignantLinks.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all ${
                isActive ? 'bg-[#1D4ED8] text-white shadow-sm' : 'text-slate-700 hover:bg-[#E8EDFF] hover:text-[#1D4ED8]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    isActive ? 'bg-white/15 text-white' : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
                </span>
                <span className="truncate">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default EnseignantSidebar;
