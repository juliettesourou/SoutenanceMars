import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const AbsencesPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Suivi des absences" subtitle="Consulter et enregistrer les absences et anomalies." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Absences</h2>
        <p className="mt-3 text-sm text-slate-600">Liste des absences et gestion des signalements (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module de suivi des absences (placeholder)</div>
      </div>
    </main>
  );
};

export default AbsencesPage;
