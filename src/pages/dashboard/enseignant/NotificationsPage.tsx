import React from 'react';
import { BellRing } from 'lucide-react';
import EnseignantTopbar from '../../../components/enseignant/EnseignantTopbar';
import { teacherNotifications } from './data';

const typeStyles: Record<string, string> = {
  Urgent: 'border-rose-100 bg-rose-50 text-rose-700',
  Info: 'border-slate-200 bg-slate-100 text-slate-700',
  Suivi: 'border-emerald-100 bg-emerald-50 text-emerald-700',
};

const EnseignantNotificationsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <EnseignantTopbar title="Notifications" subtitle="Alertes pedagogiques, administratives et rappels de validation" />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <header className="mb-4 flex items-center gap-3">
            <span className="rounded-2xl bg-[#E8EDFF] p-3 text-[#1D4ED8]">
              <BellRing className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Centre de notifications</h2>
              <p className="text-sm text-slate-500">Toutes les actions qui demandent votre attention sont centralisees ici.</p>
            </div>
          </header>

          <div className="space-y-4">
            {teacherNotifications.map((notification) => (
              <article key={notification.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{notification.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{notification.detail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${typeStyles[notification.type]}`}>
                      {notification.type}
                    </span>
                    <span className="text-xs text-slate-400">{notification.time}</span>
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

export default EnseignantNotificationsPage;
