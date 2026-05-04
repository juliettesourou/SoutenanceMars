import React from 'react';
import { BookOpenText, Files, GraduationCap } from 'lucide-react';
import EnseignantTopbar from '../../../components/enseignant/EnseignantTopbar';

const subjects = [
  { id: 'mat-1', label: 'Base de donnees', credits: 4, volume: '48h', classLabel: 'Licence 3 Informatique' },
  { id: 'mat-2', label: 'Algorithmique', credits: 3, volume: '36h', classLabel: 'Licence 2 Informatique' },
  { id: 'mat-3', label: 'Projet tutoré', credits: 2, volume: '24h', classLabel: 'Licence 3 Informatique' },
];

const EnseignantMatieresPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <EnseignantTopbar title="Mes matieres" subtitle="Vue d ensemble des cours assures et des ressources associees" />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-[#E8EDFF] p-3 text-[#1D4ED8]">
                <BookOpenText className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Matieres actives</p>
                <p className="text-2xl font-semibold text-slate-900">{subjects.length}</p>
              </div>
            </div>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Credits cumules</p>
                <p className="text-2xl font-semibold text-slate-900">9</p>
              </div>
            </div>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                <Files className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Supports disponibles</p>
                <p className="text-2xl font-semibold text-slate-900">12</p>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <header className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Cours assures</h2>
            <p className="text-sm text-slate-500">Chaque fiche peut ensuite accueillir contenus, supports et progression pedagogique.</p>
          </header>

          <div className="grid gap-4 lg:grid-cols-3">
            {subjects.map((subject) => (
              <article key={subject.id} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{subject.classLabel}</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{subject.label}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs text-slate-400">Volume</p>
                    <p className="mt-1 font-semibold text-slate-900">{subject.volume}</p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs text-slate-400">Credits</p>
                    <p className="mt-1 font-semibold text-slate-900">{subject.credits}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default EnseignantMatieresPage;
