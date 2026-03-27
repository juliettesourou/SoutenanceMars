import React from 'react';
import { Link } from 'react-router-dom';

const modules = [
  {
    title: 'Structure Académique',
    description: 'Niveaux, salles & filières',
    color: 'bg-[#2C6ED5]',
    iconBg: 'bg-[#2C6ED5]/10',
    icon: '🎓',
  },
  {
    title: 'Emploi Du Temps',
    description: 'Bâtiments, salles & horaires',
    color: 'bg-[#3F8CFF]',
    iconBg: 'bg-[#3F8CFF]/10',
    icon: '📅',
  },
  {
    title: 'Suivi De La Présence',
    description: 'Sessions, marquage & rapports',
    color: 'bg-[#1EB980]',
    iconBg: 'bg-[#1EB980]/10',
    icon: '✅',
  },
  {
    title: 'Examens & Notation',
    description: 'Examens, notes & bulletins',
    color: 'bg-[#6C4CCF]',
    iconBg: 'bg-[#6C4CCF]/10',
    icon: '📝',
  },
  {
    title: 'Gestion Des Utilisateurs',
    description: 'Rôles, utilisateurs & autorisations',
    color: 'bg-[#2FD7A3]',
    iconBg: 'bg-[#2FD7A3]/10',
    icon: '👥',
  },
  {
    title: 'Gestion Des Élèves',
    description: 'Inscriptions, dossiers & parents',
    color: 'bg-[#8A6FE8]',
    iconBg: 'bg-[#8A6FE8]/10',
    icon: '🧑‍🎓',
  },
  {
    title: 'Gestion Des Frais',
    description: 'Types de frais & paiements',
    color: 'bg-[#2C6ED5]',
    iconBg: 'bg-[#2C6ED5]/10',
    icon: '💳',
  },
  {
    title: 'Finances & Comptabilité',
    description: 'Catégories, revenus & dépenses',
    color: 'bg-[#3F8CFF]',
    iconBg: 'bg-[#3F8CFF]/10',
    icon: '📊',
  },
  {
    title: 'Modèles De Documents',
    description: 'Modèles, certificats & lettres',
    color: 'bg-[#1EB980]',
    iconBg: 'bg-[#1EB980]/10',
    icon: '📄',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1EB9800D] via-[#2C6ED50D] to-[#6C4CCF0D]">
      {/* Décors globaux de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#2C6ED5]/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-[#6C4CCF]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#1EB980]/10 blur-3xl animate-pulse" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        {/* Header principal */}
        <section className="relative mb-10 overflow-hidden rounded-[32px] border border-white/60 bg-white/75 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          {/* Décors internes du header */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-10 left-10 h-32 w-32 rounded-full bg-[#2C6ED5]/10 blur-2xl animate-pulse" />
            <div className="absolute right-16 top-16 h-40 w-40 rounded-full bg-[#6C4CCF]/10 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-1/3 h-36 w-36 rounded-full bg-[#1EB980]/10 blur-3xl animate-pulse" />
          </div>

          <div className="relative px-6 py-8 sm:px-10 sm:py-12">
            {/* petites pastilles déco */}
            <div className="absolute right-8 top-8 hidden gap-3 sm:flex">
              <span className="h-3 w-3 rounded-full bg-[#2C6ED5] animate-bounce" />
              <span
                className="h-3 w-3 rounded-full bg-[#1EB980] animate-bounce"
                style={{ animationDelay: '0.15s' }}
              />
              <span
                className="h-3 w-3 rounded-full bg-[#6C4CCF] animate-bounce"
                style={{ animationDelay: '0.3s' }}
              />
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1EB980] animate-pulse" />
              Espace administrateur
            </div>

            {/* Grand nom animé */}
            <div className="relative mb-4">
              <h1 className="enangnon-title relative text-5xl font-black tracking-[0.12em] sm:text-6xl lg:text-7xl">
                <span className="enangnon-main">ENANGNON</span>
                <span className="enangnon-glow">ENANGNON</span>
              </h1>
              <div className="mt-4 h-1.5 w-40 rounded-full bg-gradient-to-r from-[#2C6ED5] via-[#1EB980] to-[#6C4CCF] shadow-[0_0_20px_rgba(44,110,213,0.25)]" />
            </div>

            <h2 className="max-w-3xl text-2xl font-semibold leading-tight text-[#0F172A] sm:text-3xl">
              Bienvenue sur votre espace de travail
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Pilotez simplement la gestion pédagogique, administrative et financière
              de votre établissement à partir d’un espace moderne, clair et
              professionnel.
            </p>
          </div>
        </section>

        {/* Modules */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Modules disponibles
            </h2>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
              {modules.length} modules
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module, index) => (
              <Link
                key={module.title}
                to="/dashboard"
                className="group relative flex w-full items-stretch overflow-hidden rounded-[28px] border border-slate-100 bg-white/95 p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2C6ED5]/30 hover:shadow-xl"
                style={{
                  animation: `fadeUp 0.6s ease-out ${index * 0.08}s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#2C6ED5]/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-y-4 left-3 w-1 rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-[#2C6ED5]" />

                <div
                  className={`relative ml-4 mr-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${module.iconBg} text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110`}
                >
                  <span>{module.icon}</span>
                </div>

                <div className="relative flex flex-1 flex-col justify-center pr-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className={`h-1.5 w-6 rounded-full ${module.color}`} />
                    <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      Module
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-[#0F172A] transition-colors duration-300 group-hover:text-[#2C6ED5] sm:text-base">
                    {module.title}
                  </span>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {module.description}
                  </p>
                </div>

                <div className="relative ml-auto flex items-center pr-1 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2C6ED5]">
                  <span className="text-xl">➜</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <style>
        {`
          .enangnon-title {
            position: relative;
            display: inline-block;
            animation: titleEntrance 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .enangnon-main {
            position: relative;
            display: inline-block;
            background: linear-gradient(
              120deg,
              #2C6ED5 0%,
              #3F8CFF 20%,
              #ffffff 35%,
              #1EB980 50%,
              #6C4CCF 70%,
              #2C6ED5 100%
            );
            background-size: 250% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation:
              shimmerFlow 5s ease-in-out infinite,
              gentleFloat 4s ease-in-out infinite;
            z-index: 2;
          }

          .enangnon-glow {
            position: absolute;
            inset: 0;
            z-index: 1;
            color: transparent;
            -webkit-text-stroke: 1px rgba(44, 110, 213, 0.08);
            filter: blur(14px);
            opacity: 0.9;
            background: linear-gradient(
              120deg,
              rgba(44,110,213,0.35),
              rgba(30,185,128,0.30),
              rgba(108,76,207,0.35)
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: glowPulse 3.5s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes titleEntrance {
            0% {
              opacity: 0;
              transform: translateY(24px) scale(0.92);
              filter: blur(12px);
            }
            60% {
              opacity: 1;
              transform: translateY(-2px) scale(1.02);
              filter: blur(0);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes shimmerFlow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes gentleFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
          }

          @keyframes glowPulse {
            0%, 100% {
              opacity: 0.55;
              transform: scale(1);
            }
            50% {
              opacity: 0.95;
              transform: scale(1.02);
            }
          }

          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(18px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;