import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const EvaluationsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Épreuves" subtitle="Vue sur les évaluations et leur planning." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Épreuves</h2>
        <p className="mt-3 text-sm text-slate-600">Gestion des épreuves et convocations (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module évaluations (placeholder)</div>
      </div>
    </main>
  );
};

export default EvaluationsPage;
