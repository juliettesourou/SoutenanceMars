import React, { useState } from 'react';
import {
  BellRing,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  LayoutDashboard,
  MessageSquareMore,
  MonitorCheck,
  School,
  ShieldCheck,
  SquarePen,
  Users,
  WalletCards,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

type IconComponent = React.ComponentType<{ className?: string; strokeWidth?: number }>;

const menuItems: Array<{ label: string; path: string; icon: IconComponent }> = [
  { label: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Calendrier scolaire', path: '/calendar', icon: CalendarDays },
  { label: 'Gestion des sites', path: '/sites', icon: Building2 },
  { label: 'Gestion des étudiants', path: '/students', icon: School },
  { label: 'Gestion des formateurs', path: '/teachers', icon: Users },
  { label: 'Gestion des matières', path: '/matieres', icon: BookOpenText },
  { label: 'Organisation', path: '/organisation', icon: BriefcaseBusiness },
  { label: 'Gestion des évaluations', path: '/evaluations', icon: ClipboardCheck },
  { label: 'Demandes et réclamations', path: '/demandes', icon: MessageSquareMore },
  { label: 'Suivi des performances', path: '/performances', icon: MonitorCheck },
  { label: 'Communication', path: '/communication', icon: BellRing },
];

const structureAcademiqueItems: Array<{ label: string; path: string; icon: IconComponent }> = [
  { label: 'Gestion des salles', path: '/salles', icon: Building2 },
  { label: 'Gestion des filières', path: '/filieres', icon: WalletCards },
  { label: "Années d'étude", path: '/annees-etude', icon: BookOpenText },
];

const userManagementItems: Array<{ label: string; path: string; icon: IconComponent }> = [
  { label: 'Utilisateurs', path: '/users', icon: Users },
  { label: 'Rôles et permissions', path: '/roles', icon: ShieldCheck },
  { label: 'Créer un compte', path: '/users/create', icon: SquarePen },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openStructureAcademique, setOpenStructureAcademique] = useState(false);
  const [openUserManagement, setOpenUserManagement] = useState(false);

  return (
    <aside
      className={`w-full border-b border-slate-200 bg-[#F8FAFF] flex flex-col md:sticky md:top-0 md:h-screen md:max-h-screen md:border-b-0 md:border-r transition-all duration-300 ${
        isCollapsed ? 'md:w-24' : 'md:w-72'
      }`}
    >
      <div className={`pt-6 pb-4 flex-shrink-0 ${isCollapsed ? 'px-3' : 'px-6'}`}>
        <div className={`mb-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between gap-2'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
          <div className="w-9 h-9 rounded-xl bg-[#14B8A6] flex items-center justify-center text-white font-bold text-lg">
            en
          </div>
          {!isCollapsed ? <span className="text-xl font-semibold text-[#0F172A]">enangnon</span> : null}
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className={`hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-[#1D4ED8] ${
              isCollapsed ? 'absolute left-[50%] top-6 -translate-x-1/2 translate-y-12' : ''
            }`}
            title={isCollapsed ? 'Ouvrir la barre laterale' : 'Fermer la barre laterale'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {!isCollapsed ? (
          <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-slate-200 text-sm">
            <div className="flex flex-col text-left">
              <span className="text-xs text-slate-500">Année scolaire</span>
              <span className="text-sm font-semibold text-[#0F172A]">2024 – 2025</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        ) : (
          <div className="hidden md:flex justify-center">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm"
              title="Année scolaire 2024 – 2025"
            >
              <CalendarDays className="h-4.5 w-4.5" strokeWidth={2.1} />
            </button>
          </div>
        )}
      </div>

      <nav className={`flex-1 space-y-1 text-sm overflow-y-auto ${isCollapsed ? 'px-2' : 'px-3'}`}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.label}
              className={({ isActive }) =>
                `w-full flex items-center rounded-xl mb-0.5 transition-colors ${
                  isActive
                    ? 'bg-[#1D4ED8] text-white font-medium shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-4 py-2.5'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      isActive ? 'bg-white/15 text-white' : 'bg-slate-200/60 text-slate-500'
                    } ${isCollapsed ? 'group relative' : ''}`}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
                    {isCollapsed ? (
                      <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0F172A] px-3 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block">
                        {item.label}
                      </span>
                    ) : null}
                  </span>
                  {!isCollapsed ? <span className="truncate">{item.label}</span> : null}
                </>
              )}
            </NavLink>
          );
        })}

        <div className="mb-1">
          <button
            onClick={() => !isCollapsed && setOpenStructureAcademique(!openStructureAcademique)}
            title="Structure académique"
            className={`w-full flex items-center rounded-xl transition-all ${
              openStructureAcademique
                ? 'bg-violet-100 text-violet-700'
                : 'text-slate-600 hover:bg-violet-50 hover:text-violet-600'
            } ${isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-4 py-2.5'}`}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-200/60 text-violet-700">
                <WalletCards className="h-4.5 w-4.5" strokeWidth={2.1} />
              </span>
              {!isCollapsed ? <span className="truncate font-medium">Structure académique</span> : null}
            </div>

            {!isCollapsed ? (
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  openStructureAcademique ? 'rotate-180 text-violet-600' : ''
                }`}
              />
            ) : null}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              !isCollapsed && openStructureAcademique ? 'max-h-48 mt-2' : 'max-h-0'
            }`}
          >
            <div className="ml-4 pl-3 border-l-2 border-violet-200 space-y-1">
              {structureAcademiqueItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={item.label}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-violet-600 text-white shadow-md'
                          : 'text-slate-600 hover:bg-violet-50 hover:text-violet-600'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${isActive ? 'bg-white/15 text-white' : 'bg-violet-100 text-violet-600'} ${isCollapsed ? 'group relative' : ''}`}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.1} />
                          {isCollapsed ? (
                            <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0F172A] px-3 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block">
                              {item.label}
                            </span>
                          ) : null}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-1">
          <button
            onClick={() => !isCollapsed && setOpenUserManagement(!openUserManagement)}
            title="Gestion des utilisateurs"
            className={`w-full flex items-center rounded-xl transition-all ${
              openUserManagement
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
            } ${isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-4 py-2.5'}`}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-200/60 text-emerald-700">
                <Users className="h-4.5 w-4.5" strokeWidth={2.1} />
              </span>
              {!isCollapsed ? <span className="truncate font-medium">Gestion des utilisateurs</span> : null}
            </div>

            {!isCollapsed ? (
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  openUserManagement ? 'rotate-180 text-emerald-600' : ''
                }`}
              />
            ) : null}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              !isCollapsed && openUserManagement ? 'max-h-48 mt-2' : 'max-h-0'
            }`}
          >
            <div className="ml-4 pl-3 border-l-2 border-emerald-200 space-y-1">
              {userManagementItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={item.label}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${isActive ? 'bg-white/15 text-white' : 'bg-emerald-100 text-emerald-600'} ${isCollapsed ? 'group relative' : ''}`}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.1} />
                          {isCollapsed ? (
                            <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0F172A] px-3 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block">
                              {item.label}
                            </span>
                          ) : null}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className={`mt-4 border-t border-slate-200 bg-[#F0F4FF] flex-shrink-0 ${isCollapsed ? 'px-2 py-4' : 'px-4 py-4 flex items-center gap-3'}`}>
        <div className="w-10 h-10 rounded-full bg-slate-300" />
        {!isCollapsed ? (
          <>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0F172A]">Juliette John</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
            <button className="text-xs text-[#1D4ED8] font-medium">
              <ChevronDown className="h-4 w-4" />
            </button>
          </>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;
