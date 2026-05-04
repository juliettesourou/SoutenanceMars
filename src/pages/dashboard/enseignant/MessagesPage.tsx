import React, { useEffect, useState } from 'react';
import { MessageSquareMore } from 'lucide-react';
import EnseignantTopbar from '../../../components/enseignant/EnseignantTopbar';
import { TEACHER_MESSAGES_STORAGE_KEY, teacherMessages } from './data';

const channelStyles: Record<string, string> = {
  Parent: 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]',
  Administration: 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]',
};

const EnseignantMessagesPage: React.FC = () => {
  const [messageItems, setMessageItems] = useState(teacherMessages);

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(TEACHER_MESSAGES_STORAGE_KEY);
      if (!storedMessages) return;

      const parsedMessages = JSON.parse(storedMessages) as typeof teacherMessages;
      setMessageItems((current) => [...parsedMessages, ...current.filter(
        (message) => !parsedMessages.some((stored) => stored.id === message.id)
      )]);
    } catch {
      // Keep default messages when storage is unavailable or malformed.
    }
  }, []);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <EnseignantTopbar
        title="Messagerie"
        subtitle="Echanges avec les tuteurs, le service examens et l administration"
      />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <header className="mb-4 flex items-center gap-3">
            <span className="rounded-2xl bg-[#E8EDFF] p-3 text-[#1D4ED8]">
              <MessageSquareMore className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Conversations recentes</h2>
              <p className="text-sm text-slate-500">Canal integre pour le suivi parent, l alerte et la coordination interne.</p>
            </div>
          </header>

          <div className="space-y-4">
            {messageItems.map((message) => (
              <article key={message.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-900">{message.subject}</h3>
                      {message.unread ? <span className="h-2.5 w-2.5 rounded-full bg-[#1D4ED8]" /> : null}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {message.sender} • {message.role}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{message.preview}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${channelStyles[message.channel]}`}>
                    {message.channel}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default EnseignantMessagesPage;
