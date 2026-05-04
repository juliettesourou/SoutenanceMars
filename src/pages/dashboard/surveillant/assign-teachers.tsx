import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const AssignTeachersPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Affectation des enseignants" subtitle="Attribuer enseignants aux cours en tenant compte des disponibilités." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Affectation enseignants</h2>
        <p className="mt-3 text-sm text-slate-600">Gérer les affectations et vérifier les conflits (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module d'affectation enseignants (placeholder)</div>
      </div>
    </main>
  );
};

export default AssignTeachersPage;
