import React, { useEffect, useState } from 'react';

const AnneeEtudePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [libelle, setLibelle] = useState('');
  const [annees, setAnnees] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('enangnon_annees_etude');
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed)) {
          setAnnees(parsed);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des années depuis localStorage', error);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!libelle.trim()) return;

    const value = libelle.trim();

    setAnnees((prev) => {
      let updated: string[];

      if (editingIndex !== null && editingIndex >= 0 && editingIndex < prev.length) {
        updated = prev.map((item, index) => (index === editingIndex ? value : item));
      } else {
        updated = [...prev, value];
      }

      try {
        localStorage.setItem('enangnon_annees_etude', JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des années dans localStorage', error);
      }

      return updated;
    });

    setLibelle('');
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleDelete = (indexToDelete: number) => {
    setAnnees((prev) => {
      const updated = prev.filter((_, index) => index !== indexToDelete);
      try {
        localStorage.setItem('enangnon_annees_etude', JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la suppression dans localStorage', error);
      }
      return updated;
    });
  };

  const openCreateModal = () => {
    setEditingIndex(null);
    setLibelle('');
    setIsModalOpen(true);
  };

  const openEditModal = (index: number, value: string) => {
    setEditingIndex(index);
    setLibelle(value);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F4F7FF] via-white to-[#EEF3FF] px-4 py-8 sm:px-6 lg:px-8">
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-[#2C6ED5]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#1EB980]/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-[#2C6ED5]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Badges haut */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1EB980]/15 px-4 py-2 text-xs font-semibold text-[#1EB980]">
            <span className="h-2 w-2 rounded-full bg-[#1EB980]" />
            Espace administrateur
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#1EB980]/15 px-4 py-2 text-xs font-semibold text-[#1EB980]">
            <span className="h-2 w-2 rounded-full bg-[#1EB980]" />
            Établissement actif
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5]/15 px-4 py-2 text-xs font-semibold text-[#2C6ED5]">
            <span className="h-2 w-2 rounded-full bg-[#2C6ED5]" />
            Support prioritaire 7j/7
          </span>
        </div>

        {/* Carte résumé en premier */}
        <section className="mb-8">
          <div className="grid gap-6 lg:grid-cols-[220px,1fr]">
            <div className="flex h-[220px] w-full flex-col justify-between rounded-[32px] bg-gradient-to-br from-[#6C4CCF] via-[#7C5CE0] to-[#8A6FE8] p-6 text-white shadow-[0_25px_50px_rgba(108,76,207,0.35)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  Résumé
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-xl">
                  🎓
                </span>
              </div>

              <div>
                <p className="text-5xl font-bold leading-none">{annees.length}</p>
                <p className="mt-3 text-sm leading-5 text-white/90">
                  année{annees.length > 1 ? 's' : ''} d&apos;étude créée
                  {annees.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-3 text-xs text-white/85">
                Gestion locale des années académiques
              </div>
            </div>

            {/* Header */}
            <header className="rounded-[30px] border border-white/70 bg-white/85 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#2C6ED5]/10 bg-[#2C6ED5]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2C6ED5]">
                    <span className="h-2 w-2 rounded-full bg-[#2C6ED5]" />
                    Module académique
                  </div>

                  <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                    Années d&apos;étude
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Ajoutez et gérez les années d&apos;étude de votre établissement dans
                    une interface moderne, claire et agréable.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2C6ED5] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2C6ED5]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#245cb8]"
                >
                  <span className="text-base">＋</span>
                  <span>Créer un module</span>
                </button>
              </div>
            </header>
          </div>
        </section>

        {/* Contenu */}
        {annees.length === 0 ? (
          <div className="rounded-[30px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center shadow-sm backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2C6ED5]/10 text-3xl text-[#2C6ED5]">
              📘
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Aucune année d&apos;étude enregistrée
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Commencez par créer votre première année d&apos;étude pour mieux organiser
              les données académiques.
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#2C6ED5]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#2C6ED5] transition hover:bg-[#2C6ED5]/5"
            >
              <span>＋</span>
              <span>Créer maintenant</span>
            </button>
          </div>
        ) : (
          <div className="rounded-[30px] border border-white/70 bg-white/85 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1EB980]/15 text-lg text-[#1EB980]">
                    🎓
                  </span>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      Années d&apos;étude créées
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Liste des années enregistrées localement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#2C6ED5]/10 px-4 py-2 text-xs font-semibold text-[#2C6ED5]">
                <span className="h-2 w-2 rounded-full bg-[#2C6ED5]" />
                {annees.length} année{annees.length > 1 ? 's' : ''}
              </div>
            </div>

            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {annees.map((value, index) => (
                <li
                  key={`${value}-${index}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2C6ED5] hover:shadow-[0_20px_40px_rgba(44,110,213,0.15)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2C6ED5]/15 text-lg text-[#2C6ED5]">
                      🎓
                    </div>

                    <span className="rounded-full bg-[#1EB980]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1EB980]">
                      actif
                    </span>
                  </div>

                  <div>
                    <p className="text-base font-semibold text-slate-800">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Année d&apos;étude enregistrée
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(index, value)}
                      className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 transition hover:border-[#2C6ED5] hover:text-[#2C6ED5]"
                    >
                      Modifier
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="flex-1 rounded-full bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-500 transition hover:bg-rose-100"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal formulaire */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/45 px-4 backdrop-blur-[4px]">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#2C6ED5]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#1EB980]/10 blur-3xl" />
            </div>

            <div className="relative px-6 py-7 sm:px-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2C6ED5]">
                    ENANGNON
                  </div>

                  <h2 className="mt-3 text-xl font-bold text-[#0F172A]">
                    {editingIndex !== null
                      ? "Modifier l'année d'étude"
                      : "Nouvelle année d'étude"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Renseignez un libellé clair comme 2024-2025.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="libelle"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Libellé de l&apos;année d&apos;étude
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-4 transition focus-within:border-[#2C6ED5] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#2C6ED5]/10">
                    <span className="text-lg">📘</span>
                    <input
                      id="libelle"
                      type="text"
                      placeholder="Ex : 2024-2025"
                      value={libelle}
                      onChange={(e) => setLibelle(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-[#2C6ED5]/10 bg-[#EEF4FF] px-4 py-3 text-xs leading-6 text-slate-600">
                  Exemple :
                  <span className="ml-1 font-semibold text-[#2C6ED5]">2024-2025</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2C6ED5]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#245cb8]"
                  >
                    <span className="text-base">＋</span>
                    <span>{editingIndex !== null ? 'Mettre à jour' : 'Enregistrer'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnneeEtudePage;