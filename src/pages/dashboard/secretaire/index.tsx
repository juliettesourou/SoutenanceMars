import React from 'react';
import SecretaireTopbar from '../../../components/secretaire/SecretaireTopbar';

const SecretaireDashboardPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SecretaireTopbar />

      <div className="space-y-6 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Espace Secrétaire</h1>
          <p className="mt-2 text-sm text-slate-600">Gérez les plannings, les dossiers étudiants et les documents administratifs.</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <p className="text-xs text-slate-500">Dossiers</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">320</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <p className="text-xs text-slate-500">Demandes</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">24</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <p className="text-xs text-slate-500">Planning</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">3</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SecretaireDashboardPage;
