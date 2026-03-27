import React, { useMemo, useState } from 'react';
import {
  Activity,
  Building2,
  CalendarClock,
  MapPinned,
  PhoneCall,
  Search,
  ShieldAlert,
  UserRoundCog,
  Users,
} from 'lucide-react';
import AdminTopbar from '../../../../components/adminCEntre/AdminTopbar';
import AdminMobileNav from '../../../../components/adminCEntre/AdminMobileNav';

type CenterStatus = 'Mon centre' | 'Centre de reference' | 'Sous vigilance';

interface CenterItem {
  id: string;
  name: string;
  city: string;
  code: string;
  manager: string;
  email: string;
  phone: string;
  address: string;
  students: number;
  teachers: number;
  rooms: number;
  alerts: number;
  occupancyRate: number;
  completionRate: number;
  satisfactionRate: number;
  attendanceRate: number;
  status: CenterStatus;
  highlights: string[];
  nextReview: string;
}

const centers: CenterItem[] = [
  {
    id: 'atl',
    name: 'Centre Atlantique',
    city: 'Cotonou',
    code: 'ATL-01',
    manager: 'Aicha Hounkpatin',
    email: 'aicha.atlantique@enangnon.bj',
    phone: '+229 01 90 00 00 00',
    address: 'Cadjehoun, Rue 214',
    students: 482,
    teachers: 28,
    rooms: 12,
    alerts: 3,
    occupancyRate: 82,
    completionRate: 91,
    satisfactionRate: 88,
    attendanceRate: 93,
    status: 'Mon centre',
    highlights: [
      'Presences en hausse sur les deux dernieres semaines.',
      'Trois dossiers administratifs restent a completer.',
      'Le taux d occupation reste maitrise par rapport aux centres comparables.',
    ],
    nextReview: '15 avril 2026',
  },
  {
    id: 'mon',
    name: 'Centre Mono',
    city: 'Lokossa',
    code: 'MON-02',
    manager: 'Fidele Gbaguidi',
    email: 'fidele.mono@enangnon.bj',
    phone: '+229 01 91 11 11 11',
    address: 'Quartier Agnivodji',
    students: 356,
    teachers: 22,
    rooms: 10,
    alerts: 2,
    occupancyRate: 76,
    completionRate: 87,
    satisfactionRate: 84,
    attendanceRate: 89,
    status: 'Centre de reference',
    highlights: [
      'Bonne stabilite des effectifs sur le trimestre.',
      'Niveau de satisfaction en legere progression.',
      'Moins de pression sur les salles que votre centre.',
    ],
    nextReview: '20 avril 2026',
  },
  {
    id: 'zou',
    name: 'Centre Zou',
    city: 'Bohicon',
    code: 'ZOU-03',
    manager: 'Marianne Alao',
    email: 'marianne.zou@enangnon.bj',
    phone: '+229 01 92 22 22 22',
    address: 'Quartier Sodohome',
    students: 241,
    teachers: 17,
    rooms: 8,
    alerts: 5,
    occupancyRate: 71,
    completionRate: 79,
    satisfactionRate: 76,
    attendanceRate: 85,
    status: 'Sous vigilance',
    highlights: [
      'Taux de completion plus faible que votre centre.',
      'Cinq alertes necessitent un suivi rapproché.',
      'Besoin de renforcement sur l experience apprenante.',
    ],
    nextReview: '12 avril 2026',
  },
];

const statusStyles: Record<CenterStatus, string> = {
  'Mon centre': 'border-[#DBEAFE] bg-[#EFF6FF] text-[#1D4ED8]',
  'Centre de reference': 'border-emerald-100 bg-emerald-50 text-emerald-700',
  'Sous vigilance': 'border-rose-100 bg-rose-50 text-rose-700',
};

const statusAccent: Record<CenterStatus, string> = {
  'Mon centre': 'from-[#1D4ED8] to-[#2563EB]',
  'Centre de reference': 'from-emerald-500 to-teal-500',
  'Sous vigilance': 'from-rose-500 to-pink-500',
};

const CentersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | CenterStatus>('Tous');
  const [selectedCenterId, setSelectedCenterId] = useState('atl');

  const filteredCenters = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return centers.filter((center) => {
      const matchesSearch =
        !normalizedSearch ||
        center.name.toLowerCase().includes(normalizedSearch) ||
        center.city.toLowerCase().includes(normalizedSearch) ||
        center.code.toLowerCase().includes(normalizedSearch) ||
        center.manager.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === 'Tous' || center.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const selectedCenter = useMemo(() => {
    return filteredCenters.find((center) => center.id === selectedCenterId) ?? filteredCenters[0] ?? centers[0];
  }, [filteredCenters, selectedCenterId]);

  const ownCenter = centers[0];

  const stats = useMemo(() => {
    const totalStudents = centers.reduce((sum, center) => sum + center.students, 0);
    const totalAlerts = centers.reduce((sum, center) => sum + center.alerts, 0);
    const averageCompletion = Math.round(
      centers.reduce((sum, center) => sum + center.completionRate, 0) / centers.length
    );

    return {
      totalStudents,
      totalAlerts,
      averageCompletion,
    };
  }, []);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar
        title="Comparaison des centres"
        subtitle="Comparez votre centre avec les autres structures pour situer vos performances"
        rightSlot={<AdminMobileNav />}
      />

      <section className="space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:space-y-8 lg:px-10 lg:pb-12">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] px-6 py-9 text-white shadow-[0_30px_80px_rgba(37,99,235,0.25)] sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.25),_transparent_26%)]" />
          <div className="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-white/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE]/40 bg-[#DBEAFE] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[#1D4ED8] shadow-sm">
                Admin Centre • Comparaison
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Situez votre centre face aux autres pour mieux lire vos forces, vos ecarts et vos priorites.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
                Vous gardez votre centre comme reference principale, mais vous pouvez comparer ses indicateurs
                avec d autres structures pour orienter vos decisions.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Mon centre</p>
                  <p className="mt-2 text-3xl font-semibold">{ownCenter.name}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Taux moyen de completion</p>
                  <p className="mt-2 text-3xl font-semibold">{stats.averageCompletion}%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Alertes globales</p>
                  <p className="mt-2 text-3xl font-semibold">{stats.totalAlerts}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-50">Vue rapide</p>
              <p className="mt-2 text-sm text-slate-200">
                Votre centre affiche {ownCenter.attendanceRate}% de presence, {ownCenter.completionRate}% de
                dossiers completes et {ownCenter.satisfactionRate}% de satisfaction.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Etudiants reseau</p>
                  <p className="mt-2 text-4xl font-bold">{stats.totalStudents}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Taux d occupation</p>
                  <p className="mt-2 text-4xl font-bold">{ownCenter.occupancyRate}%</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Satisfaction locale</p>
                  <p className="mt-2 text-4xl font-bold">{ownCenter.satisfactionRate}%</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Centres observes</p>
                  <p className="mt-2 text-4xl font-bold">{centers.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[28px] bg-gradient-to-br from-[#2C6ED5] to-[#55A3FF] p-5 text-white shadow-lg shadow-[#2C6ED5]/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-100">Mon centre</p>
                <p className="mt-3 text-4xl font-bold">{ownCenter.students}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Users className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-blue-50">etudiants dans votre centre</p>
          </article>
          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#1EB980]">Presence</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{ownCenter.attendanceRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#1EB980]">
                <Activity className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">taux de presence de votre centre</p>
          </article>
          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6C4CCF]">Dossiers completes</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{ownCenter.completionRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-[#6C4CCF]">
                <Building2 className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">dossiers finalises sur votre centre</p>
          </article>
          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-rose-500">Alertes</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{ownCenter.alerts}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <ShieldAlert className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">points d attention de votre centre</p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2C6ED5]">Suivi comparatif</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Vue d ensemble des centres</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Comparez votre centre aux autres pour situer vos performances.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Rechercher un centre, une ville, un responsable"
                      className="w-full rounded-full border border-slate-200 py-2.5 pl-11 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10 sm:w-80"
                    />
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as 'Tous' | CenterStatus)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10"
                  >
                    <option value="Tous">Tous les statuts</option>
                    <option value="Mon centre">Mon centre</option>
                    <option value="Centre de reference">Centre de reference</option>
                    <option value="Sous vigilance">Sous vigilance</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                {filteredCenters.map((center) => {
                  const isSelected = selectedCenter?.id === center.id;

                  return (
                    <div
                      key={center.id}
                      className={`group rounded-[26px] border p-5 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#2C6ED5]/30 bg-[#EFF6FF] shadow-[0_18px_45px_rgba(44,110,213,0.18)]'
                          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-[#2C6ED5]/20 hover:shadow-lg'
                      }`}
                    >
                      <button type="button" onClick={() => setSelectedCenterId(center.id)} className="w-full text-left">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                              {center.code}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">{center.name}</h3>
                            <p className="mt-1 text-sm text-slate-500">{center.city}</p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[center.status]}`}>
                            {center.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Etudiants</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{center.students}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Presence</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{center.attendanceRate}%</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Alertes</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{center.alerts}</p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                          <span>Responsable: {center.manager}</span>
                          <span className="font-semibold text-[#2C6ED5]">Voir le detail</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredCenters.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
                  Aucun centre ne correspond a votre filtre actuel.
                </div>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6C4CCF]">Lecture croisee</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Tableau comparatif des centres</h2>
                </div>
                <p className="text-sm text-slate-500">Lecture rapide pour situer votre centre face aux autres.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] divide-y divide-slate-100 text-sm text-slate-600">
                  <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Centre</th>
                      <th className="px-4 py-3 text-left">Responsable</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                      <th className="px-4 py-3 text-left">Occupation</th>
                      <th className="px-4 py-3 text-left">Dossiers completes</th>
                      <th className="px-4 py-3 text-left">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {centers.map((center) => (
                      <tr key={center.id} className={center.id === ownCenter.id ? 'bg-[#EFF6FF]/70' : 'hover:bg-slate-50/80'}>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-[#0F172A]">{center.name}</p>
                            <p className="mt-1 text-xs text-slate-400">{center.city} • {center.code}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">{center.manager}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[center.status]}`}>
                            {center.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">{center.occupancyRate}%</td>
                        <td className="px-4 py-4">{center.completionRate}%</td>
                        <td className="px-4 py-4">{center.satisfactionRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            {selectedCenter ? (
              <>
                <section className="overflow-hidden rounded-[30px] border border-[#0F172A]/5 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                  <div className={`bg-gradient-to-r ${statusAccent[selectedCenter.status]} px-6 py-6 text-white`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Centre observe</p>
                        <h2 className="mt-2 text-2xl font-bold">{selectedCenter.name}</h2>
                        <p className="mt-2 text-sm text-white/85">
                          {selectedCenter.city}, {selectedCenter.address}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                        {selectedCenter.code}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6 p-6">
                    <div className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Synthese executive</p>
                          <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Lecture instantanee du centre</h3>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[selectedCenter.status]}`}>
                          {selectedCenter.status}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Occupation</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedCenter.occupancyRate}%</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {selectedCenter.occupancyRate - ownCenter.occupancyRate >= 0 ? '+' : ''}
                            {selectedCenter.occupancyRate - ownCenter.occupancyRate}% par rapport a votre centre
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Dossiers completes</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedCenter.completionRate}%</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {selectedCenter.completionRate - ownCenter.completionRate >= 0 ? '+' : ''}
                            {selectedCenter.completionRate - ownCenter.completionRate}% par rapport a votre centre
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Satisfaction</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedCenter.satisfactionRate}%</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {selectedCenter.satisfactionRate - ownCenter.satisfactionRate >= 0 ? '+' : ''}
                            {selectedCenter.satisfactionRate - ownCenter.satisfactionRate}% par rapport a votre centre
                          </p>
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
                          <p className="mt-2 font-semibold text-[#0F172A]">{selectedCenter.manager}</p>
                          <p className="mt-1 text-sm text-slate-500">{selectedCenter.email}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <PhoneCall className="h-4 w-4" />
                            <span>Contact direct</span>
                          </div>
                          <p className="mt-2 font-semibold text-[#0F172A]">{selectedCenter.phone}</p>
                          <p className="mt-1 text-sm text-slate-500">{selectedCenter.city}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <MapPinned className="h-4 w-4" />
                            <span>Adresse administrative</span>
                          </div>
                          <p className="mt-2 font-semibold text-[#0F172A]">{selectedCenter.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-[#6C4CCF]">
                          <Users className="h-5 w-5" strokeWidth={2.1} />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6C4CCF]">Performance comparee</p>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Etudiants</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedCenter.students}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Enseignants</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedCenter.teachers}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Salles</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedCenter.rooms}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Alertes</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedCenter.alerts}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">Alertes et priorites</p>
                          <h3 className="mt-2 text-lg font-semibold text-[#0F172A]">Points de vigilance du centre</h3>
                        </div>
                        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-center">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-400">Alertes</p>
                          <p className="mt-1 text-2xl font-bold text-rose-600">{selectedCenter.alerts}</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {selectedCenter.highlights.map((item, index) => (
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
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1EB980]">Comparaison guidee</p>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Lecture orientee decision</h3>
                  <div className="mt-5 grid gap-4 text-sm text-slate-600">
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Mon centre</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">{ownCenter.name}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Centre compare</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">{selectedCenter.name}</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-4 py-4 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Lecture recommandee</p>
                      <p className="mt-2 text-sm leading-6 text-slate-100">
                        {selectedCenter.name === ownCenter.name
                          ? 'Votre centre sert ici de reference principale. Utilisez les cartes de gauche pour ouvrir un autre centre et mesurer les ecarts.'
                          : `${selectedCenter.name} affiche ${selectedCenter.completionRate}% de dossiers completes contre ${ownCenter.completionRate}% pour votre centre, avec ${selectedCenter.alerts} alertes contre ${ownCenter.alerts}.`}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Prochaine revue</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">{selectedCenter.nextReview}</p>
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

export default CentersPage;
