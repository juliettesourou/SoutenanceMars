import React, { useMemo, useState } from 'react';
import {
  Activity,
  BadgeAlert,
  BookOpenText,
  Building2,
  CalendarClock,
  GraduationCap,
  MapPinned,
  Network,
  PhoneCall,
  ShieldAlert,
  UserRoundCog,
  Users,
} from 'lucide-react';
import Topbar from '../../components/super-admin/navigation/Topbar';
import { sites } from '../../features/super-admin/sites/data/sites';
import type { SiteStatus } from '../../features/super-admin/sites/data/sites';

const statusStyles: Record<SiteStatus, string> = {
  Actif: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  Maintenance: 'border-amber-100 bg-amber-50 text-amber-700',
  'A renforcer': 'border-rose-100 bg-rose-50 text-rose-700',
};

const statusAccent: Record<SiteStatus, string> = {
  Actif: 'from-emerald-500 to-teal-500',
  Maintenance: 'from-amber-500 to-orange-500',
  'A renforcer': 'from-rose-500 to-pink-500',
};

const SitesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | SiteStatus>('Tous');
  const [selectedSiteId, setSelectedSiteId] = useState(sites[0]?.id ?? '');

  const filteredSites = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return sites.filter((site) => {
      const matchesSearch =
        !normalizedSearch ||
        site.name.toLowerCase().includes(normalizedSearch) ||
        site.city.toLowerCase().includes(normalizedSearch) ||
        site.code.toLowerCase().includes(normalizedSearch) ||
        site.manager.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === 'Tous' || site.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const selectedSite = useMemo(() => {
    return filteredSites.find((site) => site.id === selectedSiteId) ?? filteredSites[0] ?? sites[0];
  }, [filteredSites, selectedSiteId]);

  const stats = useMemo(() => {
    const totalStudents = sites.reduce((sum, site) => sum + site.students, 0);
    const totalTeachers = sites.reduce((sum, site) => sum + site.teachers, 0);
    const totalPrograms = sites.reduce((sum, site) => sum + site.programs, 0);
    const totalAlerts = sites.reduce((sum, site) => sum + site.alerts, 0);
    const activeSites = sites.filter((site) => site.status === 'Actif').length;
    const totalCapacity = sites.reduce((sum, site) => sum + site.capacity, 0);
    const averageCompletion =
      sites.length > 0
        ? Math.round(sites.reduce((sum, site) => sum + site.completionRate, 0) / sites.length)
        : 0;

    return {
      totalStudents,
      totalTeachers,
      totalPrograms,
      totalAlerts,
      activeSites,
      totalCapacity,
      averageCompletion,
    };
  }, []);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <Topbar />
      <section className="space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:space-y-8 lg:px-10 lg:pb-12">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] px-6 py-9 text-white shadow-[0_30px_80px_rgba(37,99,235,0.25)] sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.25),_transparent_26%)]" />
          <div className="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-white/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE]/40 bg-[#DBEAFE] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[#1D4ED8] shadow-sm">
                SuperAdmin • Centres
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Gestion strategique des centres depuis une vue unique, elegante et actionnable.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
                Pilotez les effectifs, les responsables, les capacites, les alertes et les performances
                globales de chaque centre en un seul endroit.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Centres actifs</p>
                  <p className="mt-2 text-3xl font-semibold">
                    {stats.activeSites}/{sites.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Completion moyenne</p>
                  <p className="mt-2 text-3xl font-semibold">{stats.averageCompletion}%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Alertes globales</p>
                  <p className="mt-2 text-3xl font-semibold">{stats.totalAlerts}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-50">Vision reseau</p>
                  <p className="mt-2 text-sm text-slate-200">
                    Consultez les informations strategiques et les details administratifs de chaque centre.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Etudiants</p>
                  <p className="mt-2 text-4xl font-bold">{stats.totalStudents}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Enseignants</p>
                  <p className="mt-2 text-4xl font-bold">{stats.totalTeachers}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Filieres</p>
                  <p className="mt-2 text-4xl font-bold">{stats.totalPrograms}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Centres suivis</p>
                  <p className="mt-2 text-4xl font-bold">{sites.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[28px] bg-gradient-to-br from-[#2C6ED5] to-[#55A3FF] p-5 text-white shadow-lg shadow-[#2C6ED5]/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-100">Reseau</p>
                <p className="mt-3 text-4xl font-bold">{sites.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Network className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-blue-50">centres supervises par le superAdmin</p>
          </article>
          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#1EB980]">Capacite</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">
                  {stats.totalCapacity > 0 ? Math.round((stats.totalStudents / stats.totalCapacity) * 100) : 0}%
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#1EB980]">
                <Activity className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">taux d occupation du reseau global</p>
          </article>
          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6C4CCF]">Pedagogie</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.totalPrograms}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-[#6C4CCF]">
                <BookOpenText className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">filieres actives reparties sur les centres</p>
          </article>
          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-rose-500">Surveillance</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.totalAlerts}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <ShieldAlert className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">points d attention a suivre cette semaine</p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2C6ED5]">Pilotage</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Vue d ensemble des centres</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Comparez rapidement les performances, le statut et les responsables de vos centres.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Rechercher un centre, une ville, un responsable"
                    className="w-full rounded-full border border-slate-200 px-4 py-2.5 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10 sm:w-80"
                  />
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as 'Tous' | SiteStatus)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10"
                  >
                    <option value="Tous">Tous les statuts</option>
                    <option value="Actif">Actif</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="A renforcer">A renforcer</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                {filteredSites.map((site) => {
                  const isSelected = selectedSite?.id === site.id;

                  return (
                    <div
                      key={site.id}
                      className={`group rounded-[26px] border p-5 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#2C6ED5]/30 bg-[#EFF6FF] shadow-[0_18px_45px_rgba(44,110,213,0.18)]'
                          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-[#2C6ED5]/20 hover:shadow-lg'
                      }`}
                    >
                      <button type="button" onClick={() => setSelectedSiteId(site.id)} className="w-full text-left">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                              {site.code}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">{site.name}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {site.city}, {site.district}
                            </p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[site.status]}`}>
                            {site.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Etudiants</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{site.students}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Enseignants</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{site.teachers}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Alertes</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{site.alerts}</p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                          <span>Responsable: {site.manager}</span>
                          <span className="font-semibold text-[#2C6ED5]">Voir le detail</span>
                        </div>
                      </button>

                      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                        <button
                          type="button"
                          onClick={() => setSelectedSiteId(site.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                        >
                          <span>⤴</span>
                          <span>Ouvrir la fiche</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredSites.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
                  Aucun centre ne correspond a votre filtre actuel.
                </div>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6C4CCF]">Comparatif</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Tableau des centres</h2>
                </div>
                <p className="text-sm text-slate-500">Lecture rapide pour arbitrer les priorites et les investissements.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] divide-y divide-slate-100 text-sm text-slate-600">
                  <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Centre</th>
                      <th className="px-4 py-3 text-left">Responsable</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                      <th className="px-4 py-3 text-left">Occupation</th>
                      <th className="px-4 py-3 text-left">Completion</th>
                      <th className="px-4 py-3 text-left">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sites.map((site) => (
                      <tr key={site.id} className="hover:bg-slate-50/80">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-[#0F172A]">{site.name}</p>
                            <p className="mt-1 text-xs text-slate-400">
                              {site.city} • {site.code}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">{site.manager}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[site.status]}`}>
                            {site.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">{site.occupancyRate}%</td>
                        <td className="px-4 py-4">{site.completionRate}%</td>
                        <td className="px-4 py-4">{site.satisfactionRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            {selectedSite ? (
              <>
                <section className="overflow-hidden rounded-[30px] border border-[#0F172A]/5 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                  <div className={`bg-gradient-to-r ${statusAccent[selectedSite.status]} px-6 py-6 text-white`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Centre selectionne</p>
                        <h2 className="mt-2 text-2xl font-bold">{selectedSite.name}</h2>
                        <p className="mt-2 text-sm text-white/85">
                          {selectedSite.city}, {selectedSite.address}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                        {selectedSite.code}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6 p-6">
                    <div className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#2C6ED5] shadow-sm">
                            <Activity className="h-5 w-5" strokeWidth={2.1} />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Synthese executive</p>
                          <div>
                            <h3 className="text-xl font-semibold text-[#0F172A]">Lecture instantanee du centre</h3>
                          </div>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[selectedSite.status]}`}>
                          {selectedSite.status}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Occupation</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSite.occupancyRate}%</p>
                          <p className="mt-1 text-xs text-slate-500">capacite utilisee</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Completion</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSite.completionRate}%</p>
                          <p className="mt-1 text-xs text-slate-500">dossiers finalises</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Satisfaction</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSite.satisfactionRate}%</p>
                          <p className="mt-1 text-xs text-slate-500">retour terrain</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2C6ED5]">
                          <Building2 className="h-5 w-5" strokeWidth={2.1} />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2C6ED5]">Identite du centre</p>
                      </div>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <UserRoundCog className="h-4 w-4" />
                            <span>Responsable</span>
                          </div>
                          <p className="mt-2 font-semibold text-[#0F172A]">{selectedSite.manager}</p>
                          <p className="mt-1 text-sm text-slate-500">{selectedSite.email}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <PhoneCall className="h-4 w-4" />
                            <span>Contact direct</span>
                          </div>
                          <p className="mt-2 font-semibold text-[#0F172A]">{selectedSite.phone}</p>
                          <p className="mt-1 text-sm text-slate-500">{selectedSite.city}, {selectedSite.district}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <MapPinned className="h-4 w-4" />
                            <span>Adresse administrative</span>
                          </div>
                          <p className="mt-2 font-semibold text-[#0F172A]">{selectedSite.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-[#6C4CCF]">
                          <GraduationCap className="h-5 w-5" strokeWidth={2.1} />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6C4CCF]">Performance academique</p>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <Users className="h-4 w-4" />
                            <span>Etudiants</span>
                          </div>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSite.students}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <UserRoundCog className="h-4 w-4" />
                            <span>Enseignants</span>
                          </div>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSite.teachers}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <BookOpenText className="h-4 w-4" />
                            <span>Filieres</span>
                          </div>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSite.programs}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <Building2 className="h-4 w-4" />
                            <span>Salles</span>
                          </div>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSite.rooms}</p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-4">
                        <div>
                          <div className="mb-3 flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-600">Taux d occupation</span>
                            <span className="font-semibold text-[#0F172A]">{selectedSite.occupancyRate}%</span>
                          </div>
                          <div className="h-3 rounded-full bg-slate-100">
                            <div
                              className="h-3 rounded-full bg-gradient-to-r from-[#2C6ED5] to-[#55A3FF]"
                              style={{ width: `${selectedSite.occupancyRate}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="mb-3 flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-600">Dossiers complets</span>
                            <span className="font-semibold text-[#0F172A]">{selectedSite.completionRate}%</span>
                          </div>
                          <div className="h-3 rounded-full bg-slate-100">
                            <div
                              className="h-3 rounded-full bg-gradient-to-r from-[#6C4CCF] to-[#8A6FE8]"
                              style={{ width: `${selectedSite.completionRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                            <BadgeAlert className="h-5 w-5" strokeWidth={2.1} />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">Alertes et priorites</p>
                          <div>
                            <h3 className="text-lg font-semibold text-[#0F172A]">Points de vigilance du centre</h3>
                          </div>
                        </div>
                        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-center">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-400">Alertes</p>
                          <p className="mt-1 text-2xl font-bold text-rose-600">{selectedSite.alerts}</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {selectedSite.highlights.map((item, index) => (
                          <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#2C6ED5] shadow-sm">
                              {index + 1}
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#1EB980]">
                      <CalendarClock className="h-5 w-5" strokeWidth={2.1} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1EB980]">Administration</p>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Gouvernance et tracabilite</h3>
                  <div className="mt-5 grid gap-4 text-sm text-slate-600">
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Capacite d accueil</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">{selectedSite.capacity} places</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Date de creation</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">{selectedSite.createdAt}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Derniere mise a jour</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">{selectedSite.updatedAt}</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-4 py-4 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Lecture superAdmin</p>
                      <p className="mt-2 text-sm leading-6 text-slate-100">
                        Centre {selectedSite.status.toLowerCase()} avec {selectedSite.students} etudiants,
                        {` ${selectedSite.teachers}`} enseignants et un niveau de satisfaction de {selectedSite.satisfactionRate}%.
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default SitesPage;
