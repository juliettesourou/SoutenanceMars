import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF] flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-semibold text-[#0F172A] mb-2">Tableau de bord</h1>
        <p className="text-sm text-slate-500">
          Vue globale du suivi académique (statistiques, résumés, indicateurs clés).
        </p>
      </div>
    </main>
  );
};

export default DashboardPage;
