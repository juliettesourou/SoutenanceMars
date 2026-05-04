import React from 'react';
import { TriangleAlert, Users } from 'lucide-react';
import EnseignantTopbar from '../../../components/enseignant/EnseignantTopbar';
import { teacherClasses } from './data';

const EnseignantClassesPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <EnseignantTopbar
        title="Mes classes"
        subtitle="Suivi des effectifs, des absences repetees et des etudiants a accompagner"
      />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <section className="grid gap-4 md:grid-cols-2">
          {teacherClasses.map((classItem) => (
            <article key={classItem.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Classe suivie</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{classItem.label}</h2>
                </div>
                <span className="rounded-2xl bg-[#E8EDFF] p-3 text-[#1D4ED8]">
                  <Users className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs text-slate-400">Effectif</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{classItem.students} etudiants</p>
                </div>
                <div className="rounded-2xl bg-amber-50 px-4 py-3">
                  <p className="text-xs text-amber-700">Absences repetees</p>
                  <p className="mt-1 text-lg font-semibold text-amber-900">{classItem.repeatedAbsences} cas a suivre</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50/80 p-4">
                <div className="flex items-center gap-2 text-rose-700">
                  <TriangleAlert className="h-4 w-4" />
                  <p className="text-sm font-semibold">Etudiants a surveiller</p>
                </div>
                <p className="mt-2 text-sm text-rose-900">{classItem.atRiskStudents.join(', ')}</p>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-400">Responsable de classe</p>
                <p className="mt-1 font-semibold text-slate-900">{classItem.delegate}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default EnseignantClassesPage;
