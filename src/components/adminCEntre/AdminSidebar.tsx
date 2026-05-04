import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  CalendarClock,
  BarChart3,
  Megaphone,
  ShieldCheck,
  LifeBuoy,
  UserCheck,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  BookOpenText,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const adminLinks = [
  { label: 'Tableau de bord', path: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'Étudiants', path: '/dashboard/admin/etudiants', icon: GraduationCap },
  { label: 'Enseignants', path: '/dashboard/admin/enseignants', icon: Users },
  { label: 'Performances', path: '/dashboard/admin/performances', icon: BarChart3 },
  { label: 'Communication', path: '/dashboard/admin/communication', icon: Megaphone },
  { label: 'Utilisateurs locaux', path: '/dashboard/admin/utilisateurs', icon: ShieldCheck },
  { label: 'Planning / Ressources', path: '/dashboard/admin/planning', icon: CalendarClock },
  { label: 'Demandes / Réclamations', path: '/dashboard/admin/demandes', icon: LifeBuoy },
  { label: 'Centres', path: '/dashboard/admin/centres', icon: Building2 },
];

const surveillantChildren = [
  { label: 'Evaluation', path: '/dashboard/admin/evaluations', icon: ClipboardList },
  { label: 'Matière / Unités', path: '/dashboard/admin/matieres', icon: BookOpenText },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const isSurveillantsSectionActive = useMemo(
    () =>
      ['/dashboard/admin/surveillants', ...surveillantChildren.map((item) => item.path)].some((path) =>
        location.pathname.startsWith(path)
      ),
    [location.pathname]
  );
  const [isSurveillantsOpen, setIsSurveillantsOpen] = useState(isSurveillantsSectionActive);

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

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setIsSurveillantsOpen((prev) => !prev)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-all ${
              isSurveillantsSectionActive
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'text-slate-700 hover:bg-[#E8EDFF] hover:text-[#1D4ED8]'
            }`}
            aria-expanded={isSurveillantsOpen}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                isSurveillantsSectionActive ? 'bg-white/15 text-white' : 'bg-slate-200/70 text-slate-600'
              }`}
            >
              <UserCheck className="h-4.5 w-4.5" strokeWidth={2.1} />
            </span>
            <span className="flex-1 truncate">Surveillants</span>
            {isSurveillantsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {isSurveillantsOpen ? (
            <div className="ml-5 space-y-1 border-l border-slate-200 pl-4">
              <NavLink
                to="/dashboard/admin/surveillants"
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-[#1D4ED8]/10 font-medium text-[#1D4ED8]' : 'text-slate-700 hover:bg-[#E8EDFF]'
                  }`
                }
              >
                Vue globale
              </NavLink>

              {surveillantChildren.map(({ path, label, icon: ChildIcon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      isActive ? 'bg-[#1D4ED8]/10 font-medium text-[#1D4ED8]' : 'text-slate-700 hover:bg-[#E8EDFF]'
                    }`
                  }
                >
                  <ChildIcon className="h-4 w-4" strokeWidth={2} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
