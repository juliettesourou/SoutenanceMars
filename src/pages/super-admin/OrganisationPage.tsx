import React from 'react';

const OrganisationPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF] flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-semibold text-[#0F172A] mb-2">Organisation</h1>
        <p className="text-sm text-slate-500">
          Gestion de l'organisation interne (emplois du temps, groupes, etc.).
        </p>
      </div>
    </main>
  );
};

export default OrganisationPage;
