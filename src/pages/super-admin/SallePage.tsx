import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'enangnon_salles';

const SallePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomSalle, setNomSalle] = useState('');
  const [salles, setSalles] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Charger les salles depuis localStorage au montage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed)) {
          setSalles(parsed);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des salles depuis localStorage', error);
    }
  }, []);

  const openCreateModal = () => {
    setEditingIndex(null);
    setNomSalle('');
    setIsModalOpen(true);
  };

  const openEditModal = (index: number, value: string) => {
    setEditingIndex(index);
    setNomSalle(value);
    setIsModalOpen(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nomSalle.trim()) return;

    const value = nomSalle.trim();

    setSalles((prev) => {
      let updated: string[];

      if (editingIndex !== null && editingIndex >= 0 && editingIndex < prev.length) {
        // édition
        updated = prev.map((item, index) => (index === editingIndex ? value : item));
      } else {
        // création
        updated = [...prev, value];
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des salles dans localStorage', error);
      }
      return updated;
    });

    setNomSalle('');
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleDelete = (indexToDelete: number) => {
    setSalles((prev) => {
      const updated = prev.filter((_, index) => index !== indexToDelete);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la suppression de la salle dans localStorage', error);
      }
      return updated;
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F4F7FF] via-white to-[#EEF3FF] px-4 py-8 sm:px-6 lg:px-8">
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-[#3F8CFF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#1EB980]/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-[#6C4CCF]/10 blur-3xl" />
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
            Salles actives
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5]/15 px-4 py-2 text-xs font-semibold text-[#2C6ED5]">
            <span className="h-2 w-2 rounded-full bg-[#2C6ED5]" />
            Support prioritaire 7j/7
          </span>
        </div>

        {/* Carte résumé des salles */}
        <section className="mb-8">
          <div className="grid gap-6 lg:grid-cols-[220px,1fr]">
            <div className="flex h-[220px] w-full flex-col justify-between rounded-[32px] bg-gradient-to-br from-[#6C4CCF] via-[#7C5CE0] to-[#8A6FE8] p-6 text-white shadow-[0_25px_50px_rgba(108,76,207,0.35)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  Salles disponibles
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-xl">
                  🏫
                </span>
              </div>

              <div>
                <p className="text-5xl font-bold leading-none">{salles.length}</p>
                <p className="mt-3 text-sm leading-5 text-white/90">
                  salle{salles.length > 1 ? 's' : ''} enregistrée{salles.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-3 text-xs text-white/85">
                Gestion locale des salles de votre établissement.
              </div>
            </div>

            {/* Header */}
            <header className="rounded-[30px] border border-white/70 bg-white/85 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#2C6ED5]/10 bg-[#2C6ED5]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2C6ED5]">
                    <span className="h-2 w-2 rounded-full bg-[#2C6ED5]" />
                    Module infrastructure
                  </div>

                  <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                    Gestion des salles
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Créez, organisez et suivez les salles de votre établissement pour optimiser la
                    planification des cours et des examens.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2C6ED5] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2C6ED5]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#245cb8]"
                >
                  <span className="text-base">＋</span>
                  <span>Ajouter une salle</span>
                </button>
              </div>
            </header>
          </div>
        </section>

        {/* Liste des salles */}
        {salles.length === 0 ? (
          <div className="rounded-[30px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center shadow-sm backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3F8CFF]/10 text-3xl text-[#3F8CFF]">
              🏫
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Aucune salle enregistrée
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Commencez par ajouter une première salle pour mieux organiser vos espaces de cours.
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
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1EB980]/15 text-lg text-[#1EB980]">
                  🏫
                </span>

                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Salles enregistrées
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Liste des salles enregistrées localement.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#2C6ED5]/10 px-4 py-2 text-xs font-semibold text-[#2C6ED5]">
                <span className="h-2 w-2 rounded-full bg-[#2C6ED5]" />
                {salles.length} salle{salles.length > 1 ? 's' : ''}
              </div>
            </div>

            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {salles.map((value, index) => (
                <li
                  key={`${value}-${index}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2C6ED5] hover:shadow-[0_20px_40px_rgba(44,110,213,0.15)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3F8CFF]/15 text-lg text-[#3F8CFF]">
                      🏫
                    </div>

                    <span className="rounded-full bg-[#1EB980]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1EB980]">
                      disponible
                    </span>
                  </div>

                  <div>
                    <p className="text-base font-semibold text-slate-800">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Salle enregistrée
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

      {/* Modal formulaire salle */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 px-4 backdrop-blur-[3px]">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.18)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#3F8CFF]/15 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#1EB980]/15 blur-3xl" />
            </div>

            <div className="relative px-6 py-6 sm:px-7 sm:py-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#3F8CFF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3F8CFF]">
                    ENANGNON
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-[#0F172A]">
                    {editingIndex === null ? 'Nouvelle salle' : 'Modifier la salle'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Saisissez le nom ou le code de la salle (ex : B101, Laboratoire 2, Salle Info 3...).
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

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="nom-salle"
                    className="text-sm font-semibold text-[#0F172A]"
                  >
                    Nom de la salle
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-[#3F8CFF] focus-within:ring-4 focus-within:ring-[#3F8CFF]/12">
                    <span className="text-lg">🏫</span>
                    <input
                      id="nom-salle"
                      type="text"
                      placeholder="Ex : B101, Salle 12, Amphi A..."
                      value={nomSalle}
                      onChange={(e) => setNomSalle(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-[#3F8CFF]/10 bg-[#3F8CFF]/5 px-4 py-3 text-xs leading-6 text-slate-600">
                  Utilisez des libellés clairs pour faciliter l&apos;affectation des cours.
                  <span className="ml-1 font-semibold text-[#3F8CFF]">
                    Exemple : Bloc B - Salle 12
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#3F8CFF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#3F8CFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2C6ED5]"
                  >
                    <span className="text-base">＋</span>
                    <span>{editingIndex === null ? 'Enregistrer la salle' : 'Mettre à jour la salle'}</span>
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

export default SallePage;
