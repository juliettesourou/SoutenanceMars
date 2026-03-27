import React from 'react';
import AdminTopbar from '../../../../components/adminCEntre/AdminTopbar';
import AdminMobileNav from '../../../../components/adminCEntre/AdminMobileNav';
import TableAction from '../../../../components/adminCEntre/TableAction';

const surveillants = [
  { id: 1, name: 'Alice Houngbédji', centre: 'Centre Atlantique', sessions: 6, status: 'Actif' },
  { id: 2, name: 'Boris Adéoti', centre: 'Centre Mono', sessions: 4, status: 'Actif' },
  { id: 3, name: 'Chantale Hounsa', centre: 'Centre Zou', sessions: 3, status: 'En pause' },
  { id: 4, name: 'Didier Agossa', centre: 'Centre Atlantique', sessions: 5, status: 'Actif' },
];

const statusTone: Record<string, string> = {
  Actif: 'bg-emerald-50 text-emerald-700',
  'En pause': 'bg-amber-50 text-amber-700',
};

const SurveillantsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar
        title="Surveillants"
        subtitle="Répartition, disponibilité et suivi des surveillances"
        rightSlot={<AdminMobileNav />}
      />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Surveillants actifs', value: 22 },
            { label: 'Sessions prévues aujourd’hui', value: 14 },
            { label: 'Remplacements à prévoir', value: 3 },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Répertoire des surveillants</h2>
              <p className="text-sm text-slate-500">Affectations et sessions planifiées</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A43BF]">
              Ajouter un surveillant
            </button>
          </header>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2">Nom</th>
                  <th className="px-3 py-2">Centre</th>
                  <th className="px-3 py-2">Sessions assignées</th>
                  <th className="px-3 py-2">Statut</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {surveillants.map((sv) => (
                  <tr key={sv.id} className="border-t border-slate-100">
                    <td className="px-3 py-3 font-medium text-slate-900">{sv.name}</td>
                    <td className="px-3 py-3">{sv.centre}</td>
                    <td className="px-3 py-3">{sv.sessions}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone[sv.status] || 'bg-slate-100 text-slate-700'}`}>
                        {sv.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <TableAction onEdit={() => {}} onDelete={() => {}} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SurveillantsPage;
