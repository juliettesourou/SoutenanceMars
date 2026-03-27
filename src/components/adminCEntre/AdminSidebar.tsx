import React from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  ClipboardList,
  CalendarClock,
  BookOpenText,
  BarChart3,
  Megaphone,
  ShieldCheck,
  LifeBuoy,
  UserCheck,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const adminLinks = [
  { label: 'Tableau de bord', path: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'Étudiants', path: '/dashboard/admin/etudiants', icon: GraduationCap },
  { label: 'Évaluations', path: '/dashboard/admin/evaluations', icon: ClipboardList },
  { label: 'Enseignants', path: '/dashboard/admin/enseignants', icon: Users },
  { label: 'Surveillants', path: '/dashboard/admin/surveillants', icon: UserCheck },
  { label: 'Matières / Unités', path: '/dashboard/admin/matieres', icon: BookOpenText },
  { label: 'Performances', path: '/dashboard/admin/performances', icon: BarChart3 },
  { label: 'Communication', path: '/dashboard/admin/communication', icon: Megaphone },
  { label: 'Utilisateurs locaux', path: '/dashboard/admin/utilisateurs', icon: ShieldCheck },
  { label: 'Planning / Ressources', path: '/dashboard/admin/planning', icon: CalendarClock },
  { label: 'Demandes / Réclamations', path: '/dashboard/admin/demandes', icon: LifeBuoy },
  { label: 'Centres', path: '/dashboard/admin/centres', icon: Building2 },
];

const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-full border-b border-slate-200 bg-[#F8FAFF] md:sticky md:top-0 md:h-screen md:max-h-screen md:border-b-0 md:border-r md:w-64">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] flex items-center justify-center text-white font-bold text-lg shadow-sm">ad</div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-wide text-slate-500">Centre</p>
            <p className="text-lg font-semibold text-[#0F172A]">Admin</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1 px-3 pb-6 text-sm">
        {adminLinks.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all ${
                isActive
                  ? 'bg-[#1D4ED8] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-[#E8EDFF] hover:text-[#1D4ED8]'
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

export default AdminSidebar;
