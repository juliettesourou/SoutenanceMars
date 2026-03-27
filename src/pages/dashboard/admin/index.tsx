import React, { useState } from 'react';
import AdminTopbar from '../../../components/adminCEntre/AdminTopbar';
import type { StatCardItem } from '../../../components/adminCEntre/StatsCards';
import StatsCards from '../../../components/adminCEntre/StatsCards';
import TableAction from '../../../components/adminCEntre/TableAction';
import Pagination from '../../../components/adminCEntre/Pagination';

const mockStats: StatCardItem[] = [
  { label: 'Centres actifs', value: 12, delta: '+1', helperText: 'cette semaine', trend: 'up' },
  { label: 'Formateurs', value: 84, delta: '+6%', helperText: 'enregistrés', trend: 'up' },
  { label: 'Étudiants', value: 1240, delta: '+32', helperText: 'dans vos centres', trend: 'up' },
];

const mockRows = Array.from({ length: 5 }).map((_, idx) => ({
  id: idx + 1,
  centre: `Centre ${idx + 1}`,
  city: 'Cotonou',
  students: 120 + idx * 3,
}));

const AdminDashboardPage: React.FC = () => {
  const [page, setPage] = useState(1);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar title="Dashboard Admin" subtitle="Vue d'ensemble de vos centres" />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <StatsCards stats={mockStats} />

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <header className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Vos centres</h2>
              <p className="text-sm text-slate-500">Résumé rapide</p>
            </div>
            <TableAction onEdit={() => {}} onDelete={() => {}} />
          </header>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2">Centre</th>
                  <th className="px-3 py-2">Ville</th>
                  <th className="px-3 py-2">Étudiants</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockRows.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-900">{row.centre}</td>
                    <td className="px-3 py-2">{row.city}</td>
                    <td className="px-3 py-2">{row.students}</td>
                    <td className="px-3 py-2">
                      <TableAction onEdit={() => {}} onDelete={() => {}} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </section>
      </div>
    </main>
  );
};

export default AdminDashboardPage;
