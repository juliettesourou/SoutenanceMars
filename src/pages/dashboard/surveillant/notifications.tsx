import React from 'react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const NotificationsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar title="Notifications" subtitle="Historique et réglages des notifications." />
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="mt-3 text-sm text-slate-600">Paramètres et flux de notifications (placeholder).</p>
        <div className="mt-6 rounded-lg border bg-white p-4">Module notifications (placeholder)</div>
      </div>
    </main>
  );
};

export default NotificationsPage;
