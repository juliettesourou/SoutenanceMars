import React from 'react';

const stats = [
  { label: 'Demandes actives', value: '128', detail: '+12 cette semaine', tone: 'blue' },
  { label: 'En attente', value: '19', detail: 'Priorite elevee', tone: 'amber' },
  { label: 'Resolues', value: '86%', detail: 'Temps moyen 36h', tone: 'emerald' },
];

const requests = [
  {
    title: "Demande d'attestation de scolarite",
    author: 'Aicha K.',
    date: '24 mars 2026',
    status: 'En cours',
    category: 'Administration',
  },
  {
    title: 'Reclamation sur une note de controle',
    author: 'Merveille A.',
    date: '22 mars 2026',
    status: 'A valider',
    category: 'Pedagogie',
  },
  {
    title: 'Correction des informations personnelles',
    author: 'Jordan S.',
    date: '21 mars 2026',
    status: 'Resolue',
    category: 'Dossier etudiant',
  },
];

const statusClasses: Record<string, string> = {
  'En cours': 'bg-blue-100 text-blue-700 border-blue-200',
  'A valider': 'bg-amber-100 text-amber-700 border-amber-200',
  Resolue: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const statStyles: Record<string, string> = {
  blue: 'from-blue-600/15 via-blue-500/5 to-white',
  amber: 'from-amber-500/20 via-amber-400/5 to-white',
  emerald: 'from-emerald-500/20 via-emerald-400/5 to-white',
};

const DemandesPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF] px-4 py-4 sm:px-6 lg:px-10 lg:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[#0F172A] px-6 py-7 text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)] sm:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.28),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.22),_transparent_30%)]" />
          <div className="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full border border-white/10 bg-white/5 blur-sm" />

          <div className="relative grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-blue-100">
                Centre de traitement
              </div>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Demandes et reclamations
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Pilotez les requetes des etudiants avec une vue claire sur les urgences, les delais et les prochaines actions a mener.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                  Nouvelle demande
                </button>
                <button className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15">
                  Exporter le suivi
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Temps de reponse</p>
                <p className="mt-3 text-3xl font-semibold">36h</p>
                <p className="mt-2 text-sm text-slate-300">Moyenne sur les 30 derniers jours</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Satisfaction</p>
                <p className="mt-3 text-3xl font-semibold">4.8/5</p>
                <p className="mt-2 text-sm text-slate-300">Retour global des etudiants</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className={`rounded-[28px] border border-slate-200/70 bg-gradient-to-br ${statStyles[stat.tone]} p-5 shadow-[0_18px_40px_rgba(148,163,184,0.12)]`}
            >
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
                  {stat.detail}
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_24px_60px_rgba(148,163,184,0.14)] sm:p-6">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Demandes recentes</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Les dossiers qui demandent une attention immediate.
                </p>
              </div>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                Voir tout
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {requests.map((request) => (
                <article
                  key={`${request.title}-${request.author}`}
                  className="rounded-[24px] border border-slate-200/80 bg-[#F8FAFF] p-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(148,163,184,0.16)]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                          {request.category}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            statusClasses[request.status]
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                        {request.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Soumise par <span className="font-medium text-slate-700">{request.author}</span> le{' '}
                        {request.date}
                      </p>
                    </div>

                    <button className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1D4ED8] shadow-sm ring-1 ring-[#1D4ED8]/10 transition hover:bg-blue-50">
                      Ouvrir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_24px_60px_rgba(148,163,184,0.14)] sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Canaux</h2>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Aujourd&apos;hui
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {[
                  { label: 'Portail etudiant', value: '64%', color: 'bg-blue-600' },
                  { label: 'Email', value: '23%', color: 'bg-emerald-500' },
                  { label: 'Accueil physique', value: '13%', color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{item.label}</span>
                      <span className="text-slate-500">{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${item.color}`} style={{ width: item.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[32px] border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#ECFEFF] p-5 shadow-[0_24px_60px_rgba(59,130,246,0.12)] sm:p-6">
              <p className="text-sm font-semibold text-slate-900">Prochaine action recommandee</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-900">
                Traiter les dossiers en attente avant 16h00
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Trois demandes ont depasse le delai cible. Une revue rapide permettrait de reduire le stock critique avant la fin de journee.
              </p>
              <button className="mt-5 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Lancer la priorisation
              </button>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DemandesPage;
