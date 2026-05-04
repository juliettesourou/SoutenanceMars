import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const ConflictsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Détection des conflits" subtitle="Voir et résoudre les chevauchements et incohérences." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Conflits</h2>
        <p className="mt-3 text-sm text-slate-600">Liste des conflits détectés et outils de résolution (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module de détection de conflits (placeholder)</div>
      </div>
    </main>
  );
};

export default ConflictsPage;
