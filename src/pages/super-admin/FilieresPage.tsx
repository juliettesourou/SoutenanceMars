import React, { useEffect, useRef, useState } from 'react';

const STORAGE_FILIERE_KEY = 'enangnon_filieres';
const STORAGE_OPTION_KEY = 'enangnon_options';
const STORAGE_MATIERE_KEY = 'enangnon_matieres';

const FilieresPage: React.FC = () => {
  // États pour filières
  const [filieres, setFilieres] = useState<{ label: string; options: string[] }[]>([]);
  const [isFiliereModalOpen, setIsFiliereModalOpen] = useState(false);
  const [filiereLabel, setFiliereLabel] = useState('');
  const [editingFiliereIndex, setEditingFiliereIndex] = useState<number | null>(null);
  const [filiereSuccessMessage, setFiliereSuccessMessage] = useState('');

  // États pour options
  const [options, setOptions] = useState<{ label: string; filiere: string }[]>([]);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [optionLabel, setOptionLabel] = useState('');
  const [selectedFiliereForOption, setSelectedFiliereForOption] = useState('');
  const [editingOptionIndex, setEditingOptionIndex] = useState<number | null>(null);
  const [showOptionsTable, setShowOptionsTable] = useState(false);
  const optionsTableRef = useRef<HTMLDivElement | null>(null);
  const [matieres, setMatieres] = useState<
    { label: string; credits: number; option: string }[]
  >([]);
  const [isMatiereModalOpen, setIsMatiereModalOpen] = useState(false);
  const [matiereLabel, setMatiereLabel] = useState('');
  const [matiereCredits, setMatiereCredits] = useState('');
  const [selectedOptionForMatiere, setSelectedOptionForMatiere] = useState('');
  const [editingMatiereIndex, setEditingMatiereIndex] = useState<number | null>(null);

  const optionsGroupedByFiliere = options.reduce<
    Record<
      string,
      Array<{ option: { label: string; filiere: string }; index: number }>
    >
  >((acc, option, index) => {
    if (!acc[option.filiere]) {
      acc[option.filiere] = [];
    }
    acc[option.filiere].push({ option, index });
    return acc;
  }, {});

  const orderedOptionsGroups: Array<[
    string,
    Array<{ option: { label: string; filiere: string }; index: number }>
  ]> = [
    ...filieres
      .filter((filiere) => optionsGroupedByFiliere[filiere.label]?.length)
      .map(
        (filiere) =>
          [
            filiere.label,
            optionsGroupedByFiliere[filiere.label],
          ] as [
            string,
            Array<{ option: { label: string; filiere: string }; index: number }>
          ]
      ),
    ...Object.entries(optionsGroupedByFiliere).filter(
      ([label]) => !filieres.some((filiere) => filiere.label === label)
    ),
  ];

  let optionsTableRowIndex = 0;

  const matieresGroupedByOption = matieres.reduce<
    Record<string, Array<{ matiere: { label: string; credits: number; option: string }; index: number }>>
  >((acc, matiere, index) => {
    if (!acc[matiere.option]) {
      acc[matiere.option] = [];
    }
    acc[matiere.option].push({ matiere, index });
    return acc;
  }, {});

  const orderedOptionLabelsForMatiereTable = [
    ...options.map((opt) => opt.label),
    ...Object.keys(matieresGroupedByOption).filter(
      (label) => !options.some((opt) => opt.label === label)
    ),
  ];

  const optionMatiereTableGroups = orderedOptionLabelsForMatiereTable.map((optionLabel) => {
    const matieresForOption = matieresGroupedByOption[optionLabel] ?? [];
    const totalCredits = matieresForOption.reduce(
      (sum, { matiere }) => sum + (Number(matiere.credits) || 0),
      0
    );
    const optionMeta = options.find((opt) => opt.label === optionLabel);

    return {
      optionLabel,
      filiere: optionMeta?.filiere ?? '',
      matieres: matieresForOption,
      totalCredits,
    };
  });

  // Charger filières et options depuis localStorage
  useEffect(() => {
    try {
      const storedFilieres = localStorage.getItem(STORAGE_FILIERE_KEY);
      if (storedFilieres) {
        const parsed = JSON.parse(storedFilieres) as any[];
        if (Array.isArray(parsed)) {
          // Support de l'ancien format (string[]) en le transformant vers { label, options: [] }
          if (parsed.length > 0 && typeof parsed[0] === 'string') {
            setFilieres(parsed.map((label) => ({ label, options: [] })));
          } else {
            setFilieres(
              parsed.map((item) =>
                typeof item === 'string'
                  ? { label: item, options: [] }
                  : { label: item.label, options: Array.isArray(item.options) ? item.options : [] }
              )
            );
          }
        }
      }

      const storedOptions = localStorage.getItem(STORAGE_OPTION_KEY);
      if (storedOptions) {
        const parsedOptions = JSON.parse(storedOptions) as { label: string; filiere: string }[];
        if (Array.isArray(parsedOptions)) setOptions(parsedOptions);
      }

      const storedMatieres = localStorage.getItem(STORAGE_MATIERE_KEY);
      if (storedMatieres) {
        const parsedMatieres = JSON.parse(storedMatieres) as {
          label: string;
          credits: number;
          option: string;
        }[];
        if (Array.isArray(parsedMatieres)) setMatieres(parsedMatieres);
      }
    } catch (error) {
      console.error('Erreur lors du chargement filières/options depuis localStorage', error);
    }
  }, []);

  // Effet pour masquer automatiquement le message de succès
  useEffect(() => {
    if (!filiereSuccessMessage) return;

    const timer = setTimeout(() => {
      setFiliereSuccessMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [filiereSuccessMessage]);

  // ---------- Gestion FILIÈRES ----------
  const openCreateFiliereModal = () => {
    setEditingFiliereIndex(null);
    setFiliereLabel('');
    setIsFiliereModalOpen(true);
  };

  const openEditFiliereModal = (index: number, label: string) => {
    setEditingFiliereIndex(index);
    setFiliereLabel(label);
    setIsFiliereModalOpen(true);
  };

  const handleSubmitFiliere = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!filiereLabel.trim()) return;

    const value = filiereLabel.trim();

    const isEdit =
      editingFiliereIndex !== null &&
      editingFiliereIndex >= 0 &&
      editingFiliereIndex < filieres.length;

    setFilieres((prev) => {
      let updated: { label: string; options: string[] }[];

      if (isEdit) {
        updated = prev.map((item, index) =>
          index === editingFiliereIndex ? { ...item, label: value } : item
        );
      } else {
        updated = [...prev, { label: value, options: [] }];
      }

      try {
        localStorage.setItem(STORAGE_FILIERE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des filières', error);
      }

      return updated;
    });

    if (isEdit) {
      setFiliereSuccessMessage(`Filière "${value}" modifiée avec succès ✅`);
    } else {
      setFiliereSuccessMessage(`Filière "${value}" créée avec succès 🎉`);
    }

    setFiliereLabel('');
    setEditingFiliereIndex(null);
    setIsFiliereModalOpen(false);
  };

  const handleDeleteFiliere = (indexToDelete: number) => {
    const filiereLabelToRemove = filieres[indexToDelete]?.label;
    const optionLabelsToRemove = options
      .filter((opt) => opt.filiere === filiereLabelToRemove)
      .map((opt) => opt.label);

    setFilieres((prev) => {
      const updated = prev.filter((_, index) => index !== indexToDelete);
      try {
        localStorage.setItem(STORAGE_FILIERE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la suppression de la filière', error);
      }
      return updated;
    });

    // Supprimer aussi les options associées à cette filière
    setOptions((prev) => {
      const updatedOptions = prev.filter((opt) => opt.filiere !== filiereLabelToRemove);
      try {
        localStorage.setItem(STORAGE_OPTION_KEY, JSON.stringify(updatedOptions));
      } catch (error) {
        console.error('Erreur lors de la mise à jour des options après suppression de filière', error);
      }
      return updatedOptions;
    });

    if (optionLabelsToRemove.length > 0) {
      setMatieres((prev) => {
        const updatedMatieres = prev.filter(
          (matiere) => !optionLabelsToRemove.includes(matiere.option)
        );
        try {
          localStorage.setItem(STORAGE_MATIERE_KEY, JSON.stringify(updatedMatieres));
        } catch (error) {
          console.error('Erreur lors de la mise à jour des matières après suppression de filière', error);
        }
        return updatedMatieres;
      });
    }
  };

  // ---------- Gestion OPTIONS ----------
  const openCreateOptionModal = () => {
    if (filieres.length === 0) {
      alert('Veuillez créer au moins une filière avant de créer une option.');
      return;
    }
    setEditingOptionIndex(null);
    setOptionLabel('');
    setSelectedFiliereForOption('');
    setIsOptionModalOpen(true);
  };

  const openEditOptionModal = (index: number) => {
    const option = options[index];
    setEditingOptionIndex(index);
    setOptionLabel(option.label);
    setSelectedFiliereForOption(option.filiere);
    setIsOptionModalOpen(true);
  };

  const handleSubmitOption = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!optionLabel.trim() || !selectedFiliereForOption) return;

    const newOption = {
      label: optionLabel.trim(),
      filiere: selectedFiliereForOption,
    };

    setOptions((prev) => {
      let updated: { label: string; filiere: string }[];

      if (editingOptionIndex !== null && editingOptionIndex >= 0 && editingOptionIndex < prev.length) {
        updated = prev.map((item, index) => (index === editingOptionIndex ? newOption : item));
      } else {
        updated = [...prev, newOption];
      }

      try {
        localStorage.setItem(STORAGE_OPTION_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des options', error);
      }

      return updated;
    });

    setOptionLabel('');
    setSelectedFiliereForOption('');
    setEditingOptionIndex(null);
    setIsOptionModalOpen(false);
  };

  const handleDeleteOption = (indexToDelete: number) => {
    setOptions((prev) => {
      const updated = prev.filter((_, index) => index !== indexToDelete);
      try {
        localStorage.setItem(STORAGE_OPTION_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Erreur lors de la suppression de l'option", error);
      }
      return updated;
    });

    if (options[indexToDelete]) {
      const optionLabelToRemove = options[indexToDelete].label;
      setMatieres((prev) => {
        const updated = prev.filter((matiere) => matiere.option !== optionLabelToRemove);
        try {
          localStorage.setItem(STORAGE_MATIERE_KEY, JSON.stringify(updated));
        } catch (error) {
          console.error('Erreur lors de la suppression des matières liées à une option', error);
        }
        return updated;
      });
    }
  };

  useEffect(() => {
    if (options.length === 0) {
      return;
    }

    setMatieres((prev) => {
      const validOptions = new Set(options.map((opt) => opt.label));
      const filtered = prev.filter((matiere) => validOptions.has(matiere.option));
      if (filtered.length === prev.length) return prev;
      try {
        localStorage.setItem(STORAGE_MATIERE_KEY, JSON.stringify(filtered));
      } catch (error) {
        console.error('Erreur lors de la synchronisation des matières', error);
      }
      return filtered;
    });
  }, [options]);

  const openCreateMatiereModal = (optionLabel?: string) => {
    if (options.length === 0) {
      alert('Veuillez créer au moins une option avant de créer une matière.');
      return;
    }
    setEditingMatiereIndex(null);
    setMatiereLabel('');
    setMatiereCredits('');
    setSelectedOptionForMatiere(optionLabel ?? '');
    setIsMatiereModalOpen(true);
  };

  const openEditMatiereModal = (index: number) => {
    const matiere = matieres[index];
    setEditingMatiereIndex(index);
    setMatiereLabel(matiere.label);
    setMatiereCredits(String(matiere.credits));
    setSelectedOptionForMatiere(matiere.option);
    setIsMatiereModalOpen(true);
  };

  const handleSubmitMatiere = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const label = matiereLabel.trim();
    const creditsValue = Number(matiereCredits);
    if (!label || !selectedOptionForMatiere || Number.isNaN(creditsValue) || creditsValue <= 0) {
      return;
    }

    const newMatiere = {
      label,
      credits: creditsValue,
      option: selectedOptionForMatiere,
    };

    setMatieres((prev) => {
      let updated;
      if (editingMatiereIndex !== null && editingMatiereIndex >= 0 && editingMatiereIndex < prev.length) {
        updated = prev.map((item, index) => (index === editingMatiereIndex ? newMatiere : item));
      } else {
        updated = [...prev, newMatiere];
      }

      try {
        localStorage.setItem(STORAGE_MATIERE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des matières', error);
      }

      return updated;
    });

    setMatiereLabel('');
    setMatiereCredits('');
    setSelectedOptionForMatiere('');
    setEditingMatiereIndex(null);
    setIsMatiereModalOpen(false);
  };

  const handleDeleteMatiere = (indexToDelete: number) => {
    setMatieres((prev) => {
      const updated = prev.filter((_, index) => index !== indexToDelete);
      try {
        localStorage.setItem(STORAGE_MATIERE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erreur lors de la suppression de la matière', error);
      }
      return updated;
    });
  };

  const handleShowOptionsTable = () => {
    setShowOptionsTable(true);
    requestAnimationFrame(() => {
      optionsTableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <main className="flex-1 bg-[#F3F7FF] overflow-y-auto">
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F4F7FF] via-white to-[#EEF3FF] px-4 py-8 sm:px-6 lg:px-10">
       {/* Fond décoratif */}
       <div className="pointer-events-none absolute inset-0">
         <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-[#2C6ED5]/10 blur-3xl" />
         <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#1EB980]/10 blur-3xl" />
         <div className="absolute top-1/3 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-[#6C4CCF]/10 blur-3xl" />
       </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl space-y-8">
         {/* Badges haut */}
        <div className="flex flex-wrap items-center gap-3">
           <span className="inline-flex items-center gap-2 rounded-full bg-[#1EB980]/15 px-4 py-2 text-xs font-semibold text-[#1EB980]">
             <span className="h-2 w-2 rounded-full bg-[#1EB980]" />
             Espace administrateur
           </span>
           <span className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5]/15 px-4 py-2 text-xs font-semibold text-[#2C6ED5]">
             <span className="h-2 w-2 rounded-full bg-[#2C6ED5]" />
             Filières & options
           </span>
         </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => openCreateMatiereModal()}
            className="inline-flex items-center gap-2 rounded-full border border-[#6C4CCF]/20 bg-white px-5 py-2.5 text-xs font-semibold text-[#6C4CCF] shadow hover:bg-[#6C4CCF]/5"
          >
            <span>📘</span>
            <span>Ajouter une matière</span>
          </button>
          <button
            type="button"
            onClick={handleShowOptionsTable}
            className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#2C6ED5]/30 transition hover:bg-[#245cb8]"
          >
            <span>📊</span>
            <span>Voir le tableau des options</span>
          </button>
        </div>

         {/* Message de succès */}
         {filiereSuccessMessage && (
           <div className="flex justify-center">
             <div className="animate-pulse rounded-[28px] border border-[#6C4CCF]/20 bg-gradient-to-r from-[#6C4CCF]/10 via-white to-[#8A6FE8]/10 px-8 py-6 text-center shadow-[0_20px_50px_rgba(108,76,207,0.18)]">
               <p className="text-3xl font-black tracking-wide text-[#6C4CCF] sm:text-4xl">
                 {filiereSuccessMessage}
               </p>
             </div>
           </div>
         )}

         {/* Résumé */}
         <section>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
             <div className="flex flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#6C4CCF] via-[#7C5CE0] to-[#8A6FE8] p-6 text-white shadow-[0_25px_50px_rgba(108,76,207,0.35)]">
               <div className="flex items-center justify-between">
                 <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                   Filières
                 </span>
                 <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-xl">
                   🎓
                 </span>
               </div>
               <div>
                 <p className="text-4xl font-bold leading-none">{filieres.length}</p>
                 <p className="mt-2 text-sm text-white/90">
                   filière{filieres.length > 1 ? 's' : ''} créée{filieres.length > 1 ? 's' : ''}
                 </p>
               </div>
               <p className="mt-2 text-xs text-white/80">Définissez la structure principale de vos parcours.</p>
             </div>

             <div className="flex flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#2C6ED5] via-[#3F8CFF] to-[#2C6ED5] p-6 text-white shadow-[0_25px_50px_rgba(44,110,213,0.35)]">
               <div className="flex items-center justify-between">
                 <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                   Options
                 </span>
                 <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-xl">
                   🧩
                 </span>
               </div>
               <div>
                 <p className="text-4xl font-bold leading-none">{options.length}</p>
                 <p className="mt-2 text-sm text-white/90">
                   option{options.length > 1 ? 's' : ''} créée{options.length > 1 ? 's' : ''}
                 </p>
               </div>
               <p className="mt-2 text-xs text-white/80">Affinez vos filières avec des options spécifiques.</p>
             </div>

             <div className="flex flex-col justify-between rounded-[28px] border border-dashed border-slate-200/80 bg-white/80 p-6 text-slate-700 shadow-sm">
               <h3 className="mb-2 text-sm font-semibold text-slate-900">Rappel pédagogique</h3>
               <p className="text-xs leading-5 text-slate-500">
                 Une <span className="font-semibold">filière</span> représente un grand parcours
                 (ex : Informatique, Sciences Économiques). Une{' '}
                 <span className="font-semibold">option</span> est une spécialisation à l&apos;intérieur
                 d&apos;une filière (ex : Développement, Réseaux).
               </p>
             </div>
           </div>
         </section>

         {/* Bloc filières + options */}
         <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
           {/* FILIÈRES */}
           <div className="rounded-[30px] border border-white/70 bg-white/90 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl">
             <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
               <div className="flex items-center gap-3">
                 <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6C4CCF]/15 text-lg text-[#6C4CCF]">
                   🎓
                 </span>
                 <div>
                   <h2 className="text-lg font-semibold text-slate-800">Filières</h2>
                   <p className="mt-1 text-sm text-slate-500">
                     Structurez les grands parcours de formation de votre établissement.
                   </p>
                 </div>
               </div>

               <button
                 type="button"
                 onClick={openCreateFiliereModal}
                 className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#6C4CCF]/20 bg-white px-4 py-2 text-xs font-semibold text-[#6C4CCF] transition hover:bg-[#6C4CCF]/5 sm:w-auto"
               >
                 <span>＋</span>
                 <span>Ajouter une filière</span>
               </button>
             </div>

             {filieres.length === 0 ? (
               <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                 Aucune filière enregistrée pour le moment. Créez votre première filière pour commencer.
               </div>
             ) : (
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                 {filieres.map((filiere, index) => (
                   <li
                     key={`${filiere.label}-${index}`}
                     className="group rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#6C4CCF] hover:shadow-[0_18px_35px_rgba(108,76,207,0.2)]"
                   >
                     <div className="mb-4 flex items-start justify-between gap-3">
                       <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6C4CCF]/10 text-lg text-[#6C4CCF]">
                         🎓
                       </div>
                       <span className="rounded-full bg-[#1EB980]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1EB980]">
                         Active
                       </span>
                     </div>

                     <div>
                       <p className="text-xl font-extrabold tracking-wide text-[#6C4CCF] sm:text-2xl">
                         {filiere.label}
                       </p>
                       <p className="mt-1 text-xs text-slate-400">Filière enregistrée localement</p>
                     </div>

                     <div className="mt-4 flex items-center gap-2">
                       <button
                         type="button"
                         onClick={() => openEditFiliereModal(index, filiere.label)}
                         className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium text-slate-600 transition hover:border-[#6C4CCF] hover:text-[#6C4CCF]"
                       >
                         Modifier
                       </button>
                       <button
                         type="button"
                         onClick={() => handleDeleteFiliere(index)}
                         className="flex-1 rounded-full bg-rose-50 px-4 py-2 text-[11px] font-medium text-rose-500 transition hover:bg-rose-100"
                       >
                         Supprimer
                       </button>
                     </div>
                   </li>
                 ))}
               </ul>
             )}
           </div>

           {/* OPTIONS */}
           <div className="rounded-[30px] border border-white/70 bg-white/90 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl">
             <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
               <div className="flex items-center gap-3">
                 <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2C6ED5]/15 text-lg text-[#2C6ED5]">
                   🧩
                 </span>
                 <div>
                   <h2 className="text-lg font-semibold text-slate-800">Options de filière</h2>
                   <p className="mt-1 text-sm text-slate-500">
                     Créez les options rattachées à chaque filière (ex : Développement, Réseau...).
                   </p>
                 </div>
               </div>

               <button
                 type="button"
                 onClick={openCreateOptionModal}
                 className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#2C6ED5]/20 bg-white px-4 py-2 text-xs font-semibold text-[#2C6ED5] transition hover:bg-[#2C6ED5]/5 sm:w-auto"
               >
                 <span>＋</span>
                 <span>Ajouter une option</span>
               </button>
             </div>

             {options.length === 0 ? (
               <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                 Aucune option enregistrée pour le moment. Créez une filière, puis ses options.
               </div>
             ) : (
              <ul className="space-y-3 text-sm text-slate-700">
                {options.map((opt, index) => {
                  const linkedMatieres = matieresGroupedByOption[opt.label] ?? [];
                  return (
                    <li
                      key={`${opt.filiere}-${opt.label}-${index}`}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-[#2C6ED5]/40 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-slate-800">{opt.label}</p>
                        <p className="text-xs text-slate-400">Filière : {opt.filiere}</p>
                        <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                          <span>{linkedMatieres.length}</span>
                          <span>matière{linkedMatieres.length > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      {linkedMatieres.length > 0 && (
                        <ul className="space-y-1 text-xs text-slate-500">
                          {linkedMatieres.slice(0, 2).map(({ matiere }) => (
                            <li key={`${matiere.label}-${matiere.option}`}>• {matiere.label}</li>
                          ))}
                          {linkedMatieres.length > 2 && (
                            <li className="italic">+ {linkedMatieres.length - 2} autre(s)</li>
                          )}
                        </ul>
                      )}
                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <button
                          type="button"
                          onClick={() => openCreateMatiereModal(opt.label)}
                          className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-600 transition hover:bg-emerald-100"
                        >
                          + Matière
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditOptionModal(index)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 transition hover:border-[#2C6ED5]/40 hover:text-[#2C6ED5]"
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteOption(index)}
                          className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-500 transition hover:bg-rose-100"
                        >
                          Supprimer
                        </button>
                      </div>
                    </li>
                  );
                })}
               </ul>
             )}
           </div>
         </section>

        {showOptionsTable && (
          <section
            id="options-table"
            ref={optionsTableRef}
            className="rounded-[30px] border border-white/70 bg-white/95 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6C4CCF]">
                  Structure académique
                </p>
                <h3 className="text-xl font-semibold text-slate-900">Tableau des options par filière</h3>
                <p className="text-sm text-slate-500">
                  Toutes les options enregistrées, regroupées avec leurs filières associées.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowOptionsTable(false)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Fermer
              </button>
            </div>

            {options.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                Aucun enregistrement à afficher. Ajoutez d’abord des options.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] divide-y divide-slate-100 text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Filière</th>
                      <th className="px-4 py-3 text-left">Option</th>
                      <th className="px-4 py-3 text-left">Matières liées</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orderedOptionsGroups.map(([filiereName, filiereOptions]) => {
                      const displayName = filiereName?.trim() || 'Filière non renseignée';
                      return filiereOptions.map(({ option: opt, index }, optionIdx) => {
                        const relatedMatieres = matieresGroupedByOption[opt.label] ?? [];
                        return (
                        <tr
                          key={`${displayName}-${opt.label}-${index}`}
                          className="hover:bg-slate-50/60"
                        >
                          <td className="px-4 py-3 font-semibold text-slate-500">
                            {++optionsTableRowIndex}
                          </td>
                          {optionIdx === 0 && (
                            <td
                              rowSpan={filiereOptions.length}
                              className="px-4 py-3 align-top"
                            >
                              <p className="font-semibold text-slate-900">{displayName}</p>
                              <p className="text-xs text-slate-400">
                                {filiereOptions.length} option
                                {filiereOptions.length > 1 ? 's' : ''}
                              </p>
                            </td>
                          )}
                          <td className="px-4 py-3 text-slate-700">{opt.label}</td>
                          <td className="px-4 py-3 text-slate-500">
                            {relatedMatieres.length === 0 ? (
                              <span className="text-xs italic text-slate-400">
                                Aucune matière liée
                              </span>
                            ) : (
                              <div className="space-y-1 text-xs">
                                {relatedMatieres.map(({ matiere }, idx) => (
                                  <p key={`${matiere.label}-${idx}`}>{matiere.label} · {matiere.credits} crédits</p>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                type="button"
                                onClick={() => openCreateMatiereModal(opt.label)}
                                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-600 transition hover:bg-emerald-100"
                              >
                                + Matière
                              </button>
                              <button
                                type="button"
                                onClick={() => openEditOptionModal(index)}
                                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 transition hover:border-[#2C6ED5]/40 hover:text-[#2C6ED5]"
                              >
                                Modifier
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteOption(index)}
                                className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-500 transition hover:bg-rose-100"
                              >
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        <section className="rounded-[30px] border border-white/70 bg-white/95 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2C6ED5]">
                Matières
              </p>
              <h3 className="text-xl font-semibold text-slate-900">Gestion des matières par option</h3>
              <p className="text-sm text-slate-500">
                Ajoutez les matières dépendant de chaque option avec leur nombre de crédits.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openCreateMatiereModal()}
              className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[#245cb8]"
            >
              <span>＋</span>
              <span>Nouvelle matière</span>
            </button>
          </div>

          {optionMatiereTableGroups.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
              Aucune matière enregistrée. Sélectionnez une option et décrivez votre première matière.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] divide-y divide-slate-100 text-sm text-slate-700">
                <thead className="text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Option</th>
                    <th className="px-4 py-3 text-left">Matière</th>
                    <th className="px-4 py-3 text-left">Crédits</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {optionMatiereTableGroups.map(({ optionLabel, filiere, matieres: matieresEntries, totalCredits }) => {
                    const optionDisplayLabel = optionLabel?.trim() || 'Option non renseignée';

                    if (matieresEntries.length === 0) {
                      return (
                        <React.Fragment key={`${optionDisplayLabel}-empty`}>
                          <tr className="hover:bg-slate-50/60" key={`${optionDisplayLabel}-empty-row`}>
                            <td rowSpan={2} className="px-4 py-3 align-top font-semibold text-slate-900">
                              <div>{optionDisplayLabel}</div>
                              {filiere && (
                                <p className="text-xs text-slate-400">Filière : {filiere}</p>
                              )}
                              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                0 matière
                              </p>
                            </td>
                            <td className="px-4 py-3 italic text-slate-400">Aucune matière enregistrée</td>
                            <td className="px-4 py-3 text-slate-400">—</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => openCreateMatiereModal(optionLabel || undefined)}
                                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-600 transition hover:bg-emerald-100"
                              >
                                + Matière
                              </button>
                            </td>
                          </tr>
                          <tr className="bg-slate-50/60" key={`${optionDisplayLabel}-empty-total`}>
                            <td className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Total crédits
                            </td>
                            <td className="px-4 py-3 text-base font-bold text-slate-900">0</td>
                            <td className="px-4 py-3 text-right text-xs text-slate-400">—</td>
                          </tr>
                        </React.Fragment>
                      );
                    }

                    return (
                      <React.Fragment key={`${optionDisplayLabel}-group`}>
                        {matieresEntries.map(({ matiere, index }, entryIdx) => (
                          <tr
                            key={`${optionDisplayLabel}-${matiere.label}-${index}`}
                            className="hover:bg-slate-50/60"
                          >
                            {entryIdx === 0 && (
                              <td
                                rowSpan={matieresEntries.length + 1}
                                className="px-4 py-3 align-top font-semibold text-slate-900"
                              >
                                <div>{optionDisplayLabel}</div>
                                {filiere && (
                                  <p className="text-xs text-slate-400">Filière : {filiere}</p>
                                )}
                                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                  {matieresEntries.length} matière{matieresEntries.length > 1 ? 's' : ''}
                                </p>
                              </td>
                            )}
                            <td className="px-4 py-3 text-slate-900">{matiere.label}</td>
                            <td className="px-4 py-3 font-semibold text-slate-700">{matiere.credits}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => openEditMatiereModal(index)}
                                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 transition hover:border-[#2C6ED5]/40 hover:text-[#2C6ED5]"
                                >
                                  Modifier
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMatiere(index)}
                                  className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-500 transition hover:bg-rose-100"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-slate-50/60" key={`${optionDisplayLabel}-total`}>
                          <td className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Total crédits
                          </td>
                          <td className="px-4 py-3 text-base font-bold text-slate-900">{totalCredits}</td>
                          <td className="px-4 py-3 text-right text-xs text-slate-400">—</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
       </div>

       {/* Modal FILIÈRE */}
       {isFiliereModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 px-4 backdrop-blur-[3px]">
           <div className="relative w-full max-w-[95vw] overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.18)] sm:max-w-xl">
             <div className="pointer-events-none absolute inset-0">
               <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#6C4CCF]/15 blur-3xl" />
               <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#1EB980]/15 blur-3xl" />
             </div>

             <div className="relative max-h-[85vh] overflow-y-auto px-6 py-6 sm:px-7 sm:py-7">
               <div className="mb-6 flex items-start justify-between gap-4">
                 <div>
                   <div className="inline-flex items-center gap-2 rounded-full bg-[#6C4CCF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6C4CCF]">
                     Filière
                   </div>
                   <h2 className="mt-3 text-xl font-bold text-[#0F172A]">
                     {editingFiliereIndex === null ? 'Nouvelle filière' : 'Modifier la filière'}
                   </h2>
                   <p className="mt-1 text-sm text-slate-500">
                     Donnez un nom clair à la filière (ex : Informatique, Gestion, Sciences Économiques...).
                   </p>
                 </div>

                 <button
                   type="button"
                   onClick={() => setIsFiliereModalOpen(false)}
                   className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                 >
                   ✕
                 </button>
               </div>

               <form className="space-y-6" onSubmit={handleSubmitFiliere}>
                 <div className="space-y-2">
                   <label
                     htmlFor="filiere-label"
                     className="text-sm font-semibold text-[#0F172A]"
                   >
                     Libellé de la filière
                   </label>

                   <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-[#6C4CCF] focus-within:ring-4 focus-within:ring-[#6C4CCF]/12">
                     <span className="text-lg">🎓</span>
                     <input
                       id="filiere-label"
                       type="text"
                       placeholder="Ex : Informatique, Gestion des affaires..."
                       value={filiereLabel}
                       onChange={(e) => setFiliereLabel(e.target.value)}
                       className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                       autoFocus
                     />
                   </div>
                 </div>

                 <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                   <button
                     type="button"
                     onClick={() => setIsFiliereModalOpen(false)}
                     className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                   >
                     Annuler
                   </button>
                   <button
                     type="submit"
                     className="inline-flex items-center gap-2 rounded-full bg-[#6C4CCF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#6C4CCF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5732c3]"
                   >
                     <span className="text-base">＋</span>
                     <span>
                       {editingFiliereIndex === null
                         ? 'Enregistrer la filière'
                         : 'Mettre à jour la filière'}
                     </span>
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       )}

       {/* Modal OPTION */}
       {isOptionModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 px-4 backdrop-blur-[3px]">
           <div className="relative w-full max-w-[95vw] overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.18)] sm:max-w-xl">
             <div className="pointer-events-none absolute inset-0">
               <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#2C6ED5]/15 blur-3xl" />
               <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#1EB980]/15 blur-3xl" />
             </div>

             <div className="relative max-h-[85vh] overflow-y-auto px-6 py-6 sm:px-7 sm:py-7">
               <div className="mb-6 flex items-start justify-between gap-4">
                 <div>
                   <div className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2C6ED5]">
                     Option de filière
                   </div>
                   <h2 className="mt-3 text-xl font-bold text-[#0F172A]">
                     {editingOptionIndex === null ? 'Nouvelle option' : "Modifier l'option"}
                   </h2>
                   <p className="mt-1 text-sm text-slate-500">
                     Donnez un nom à l&apos;option et rattachez-la à une filière existante.
                   </p>
                 </div>

                 <button
                   type="button"
                   onClick={() => setIsOptionModalOpen(false)}
                   className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                 >
                   ✕
                 </button>
               </div>

               <form className="space-y-6" onSubmit={handleSubmitOption}>
                 <div className="space-y-2">
                   <label
                     htmlFor="option-label"
                     className="text-sm font-semibold text-[#0F172A]"
                   >
                     Libellé de l&apos;option
                   </label>
                   <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-[#2C6ED5] focus-within:ring-4 focus-within:ring-[#2C6ED5]/12">
                     <span className="text-lg">🧩</span>
                     <input
                       id="option-label"
                       type="text"
                       placeholder="Ex : Développement, Réseaux, Finance..."
                       value={optionLabel}
                       onChange={(e) => setOptionLabel(e.target.value)}
                       className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                     />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-[#0F172A]" htmlFor="option-filiere">
                     Filière associée
                   </label>
                   <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 shadow-sm">
                     {filieres.length === 0 ? (
                       <p className="text-xs text-slate-400">
                         Aucune filière disponible. Commencez par en créer au moins une.
                       </p>
                     ) : (
                       <select
                         id="option-filiere"
                         value={selectedFiliereForOption}
                         onChange={(e) => setSelectedFiliereForOption(e.target.value)}
                         className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner outline-none transition focus:border-[#2C6ED5] focus:ring-2 focus:ring-[#2C6ED5]/20"
                       >
                         <option value="" disabled>
                           Sélectionnez une filière
                         </option>
                         {filieres.map((filiere, idx) => (
                           <option key={`${filiere.label}-${idx}`} value={filiere.label}>
                             {filiere.label}
                           </option>
                         ))}
                       </select>
                     )}
                   </div>
                   <p className="text-[11px] text-slate-400">
                     Choisissez la filière à laquelle rattacher cette option.
                   </p>
                 </div>

                 <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                   <button
                     type="button"
                     onClick={() => setIsOptionModalOpen(false)}
                     className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                   >
                     Annuler
                   </button>
                   <button
                     type="submit"
                     className="inline-flex items-center gap-2 rounded-full bg-[#2C6ED5] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2C6ED5]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#245cb8]"
                   >
                     <span className="text-base">＋</span>
                     <span>
                       {editingOptionIndex === null
                         ? "Enregistrer l'option"
                         : "Mettre à jour l'option"}
                     </span>
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       )}

      {isMatiereModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 px-4 backdrop-blur-[3px]">
          <div className="relative w-full max-w-[95vw] overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.18)] sm:max-w-xl">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#1EB980]/15 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#2C6ED5]/15 blur-3xl" />
            </div>

            <div className="relative max-h-[85vh] overflow-y-auto px-6 py-6 sm:px-7 sm:py-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#1EB980]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1EB980]">
                    Matière
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-[#0F172A]">
                    {editingMatiereIndex === null ? 'Nouvelle matière' : 'Modifier la matière'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Associez cette matière à une option précise et indiquez son nombre de crédits.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMatiereModalOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmitMatiere}>
                <div className="space-y-2">
                  <label htmlFor="matiere-label" className="text-sm font-semibold text-[#0F172A]">
                    Libellé de la matière
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-[#1EB980] focus-within:ring-4 focus-within:ring-[#1EB980]/12">
                    <span className="text-lg">📘</span>
                    <input
                      id="matiere-label"
                      type="text"
                      placeholder="Ex : Algorithmique, Comptabilité..."
                      value={matiereLabel}
                      onChange={(e) => setMatiereLabel(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="matiere-credits" className="text-sm font-semibold text-[#0F172A]">
                    Crédits de la matière
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-[#2C6ED5] focus-within:ring-4 focus-within:ring-[#2C6ED5]/12">
                    <span className="text-lg">🎯</span>
                    <input
                      id="matiere-credits"
                      type="number"
                      min="1"
                      value={matiereCredits}
                      onChange={(e) => setMatiereCredits(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                      placeholder="Ex : 4"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="matiere-option" className="text-sm font-semibold text-[#0F172A]">
                    Option associée
                  </label>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 shadow-sm">
                    {options.length === 0 ? (
                      <p className="text-xs text-slate-400">
                        Aucune option disponible. Créez une option avant d'ajouter une matière.
                      </p>
                    ) : (
                      <select
                        id="matiere-option"
                        value={selectedOptionForMatiere}
                        onChange={(e) => setSelectedOptionForMatiere(e.target.value)}
                        className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner outline-none transition focus:border-[#1EB980] focus:ring-2 focus:ring-[#1EB980]/20"
                      >
                        <option value="" disabled>
                          Sélectionnez une option
                        </option>
                        {options.map((option, idx) => (
                          <option key={`${option.label}-${idx}`} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Cette matière sera visible dans les tableaux de l'option sélectionnée.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsMatiereModalOpen(false)}
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1EB980] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#1EB980]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#16996b]"
                  >
                    <span className="text-base">＋</span>
                    <span>{editingMatiereIndex === null ? 'Enregistrer la matière' : 'Mettre à jour la matière'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </main>
   );
};

export default FilieresPage;