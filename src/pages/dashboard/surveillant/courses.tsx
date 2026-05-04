import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const CoursesPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Création / modification de cours" subtitle="Ajouter ou modifier les cours, matières et créneaux." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Cours</h2>
        <p className="mt-3 text-sm text-slate-600">Gérer les fiches de cours et leurs créneaux (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module création/modification de cours (placeholder)</div>
      </div>
    </main>
  );
};

export default CoursesPage;
