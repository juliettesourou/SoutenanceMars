import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const CalendarPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Calendrier" subtitle="Vue calendrier des emplois du temps et évaluations." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Calendrier</h2>
        <p className="mt-3 text-sm text-slate-600">Calendrier consolidé (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module calendrier (placeholder)</div>
      </div>
    </main>
  );
};

export default CalendarPage;
