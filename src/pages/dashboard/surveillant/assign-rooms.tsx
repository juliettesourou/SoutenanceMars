import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const AssignRoomsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Affectation des salles" subtitle="Choisir et réserver les salles pour les cours." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Affectation salles</h2>
        <p className="mt-3 text-sm text-slate-600">Réserver et vérifier la disponibilité des salles (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module d'affectation des salles (placeholder)</div>
      </div>
    </main>
  );
};

export default AssignRoomsPage;
