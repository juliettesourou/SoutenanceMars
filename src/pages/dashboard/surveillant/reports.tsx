import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const ReportsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Signalements / anomalies" subtitle="Lister et suivre les anomalies reportées." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Signalements</h2>
        <p className="mt-3 text-sm text-slate-600">Historique des signalements et actions recommandées (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module signalements (placeholder)</div>
      </div>
    </main>
  );
};

export default ReportsPage;
