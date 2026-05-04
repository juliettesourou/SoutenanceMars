import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const MissionsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Missions" subtitle="Tâches et missions quotidiennes du surveillant." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Missions</h2>
        <p className="mt-3 text-sm text-slate-600">Liste des missions et actions à effectuer (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module missions (placeholder)</div>
      </div>
    </main>
  );
};

export default MissionsPage;
