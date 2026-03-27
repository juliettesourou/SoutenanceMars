import React, { useEffect, useMemo, useState } from 'react';
import Topbar from '../../components/super-admin/navigation/Topbar';

type UserStatus = 'Actif' | 'En attente';

type UserAccount = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
};

const STORAGE_USERS_KEY = 'enangnon_users_accounts';

const ROLE_OPTIONS = ['Administrateur', 'Formateur', 'Étudiant', 'Support'];

const STATUS_STYLES: Record<UserStatus, string> = {
  Actif: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'En attente': 'bg-amber-50 text-amber-600 border-amber-100',
};

const seedUsers: UserAccount[] = [
  {
    id: 'seed-1',
    fullName: 'Mariam KOUASSI',
    email: 'mariam.kouassi@campus.bj',
    role: 'Administrateur',
    status: 'Actif',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    fullName: 'Didier AHO',
    email: 'didier.aho@campus.bj',
    role: 'Formateur',
    status: 'En attente',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'seed-3',
    fullName: 'Cyrielle AMOUSSOU',
    email: 'cyrielle.amoussou@campus.bj',
    role: 'Étudiant',
    status: 'Actif',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | string>('all');
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    role: ROLE_OPTIONS[0],
    status: 'Actif' as UserStatus,
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserAccount[];
        if (Array.isArray(parsed)) {
          setUsers(parsed);
          return;
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des comptes', error);
    }
    setUsers(seedUsers);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des comptes', error);
    }
  }, [users]);

  const filteredUsers = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !lowerSearch ||
        user.fullName.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch);
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((user) => user.status === 'Actif').length;
    const pending = users.filter((user) => user.status === 'En attente').length;
    const admins = users.filter((user) => user.role === 'Administrateur').length;

    return {
      total,
      active,
      pending,
      admins,
    };
  }, [users]);

  const roleDistribution = useMemo(() => {
    return ROLE_OPTIONS.map((role) => ({
      role,
      count: users.filter((user) => user.role === role).length,
    }));
  }, [users]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const { fullName, email, role, status } = formValues;
    if (!fullName.trim() || !email.trim()) {
      setFormError('Veuillez renseigner un nom complet et un email.');
      return;
    }

    const alreadyExists = users.some((user) => user.email.toLowerCase() === email.trim().toLowerCase());
    if (alreadyExists) {
      setFormError('Un compte existe déjà avec cet email.');
      return;
    }

    const newAccount: UserAccount = {
      id: crypto.randomUUID(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      role,
      status,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [newAccount, ...prev]);
    setFormValues({ fullName: '', email: '', role: ROLE_OPTIONS[0], status: 'Actif' });
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Actif' ? 'En attente' : 'Actif' }
          : user,
      ),
    );
  };

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <Topbar />
      <section className="space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:space-y-8 lg:px-10 lg:pb-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1EB980]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#1EB980]">
              Comptes
            </div>
            <h1 className="mt-3 text-2xl font-bold text-[#0F172A] sm:text-3xl">Gestion des utilisateurs</h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Créez des comptes, suivez l'activité et attribuez les rôles de votre campus.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setRoleFilter('all')}
              className="rounded-full border border-white bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow"
            >
              Tous ({stats.total})
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter('Administrateur')}
              className="rounded-full border border-[#6C4CCF]/20 bg-white px-4 py-2 text-sm font-semibold text-[#6C4CCF] shadow"
            >
              Administrateurs ({stats.admins})
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl bg-gradient-to-br from-[#6C4CCF] to-[#8A6FE8] p-5 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-white/80">Comptes</p>
            <p className="mt-3 text-4xl font-bold">{stats.total}</p>
            <p className="mt-1 text-sm text-white/75">profils enregistrés</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">Actifs</p>
            <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.active}</p>
            <p className="mt-1 text-sm text-slate-500">utilisateurs connectés</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-500">En attente</p>
            <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.pending}</p>
            <p className="mt-1 text-sm text-slate-500">activations à finaliser</p>
          </article>
          <article className="rounded-3xl bg-white p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-[#2C6ED5]">Administrateurs</p>
            <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.admins}</p>
            <p className="mt-1 text-sm text-slate-500">droits élevés</p>
          </article>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-lg backdrop-blur">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2C6ED5]">Comptes</p>
                <h2 className="text-xl font-semibold text-[#0F172A]">Tableau des utilisateurs</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <input
                  type="search"
                  placeholder="Rechercher un nom ou email"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#6C4CCF] focus:outline-none focus:ring-2 focus:ring-[#6C4CCF]/20 sm:w-64"
                />
                <select
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 focus:border-[#6C4CCF] focus:outline-none focus:ring-2 focus:ring-[#6C4CCF]/20"
                >
                  <option value="all">Tous les rôles</option>
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                Aucun compte ne correspond à votre recherche.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] divide-y divide-slate-100 text-sm text-slate-600">
                  <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Utilisateur</th>
                      <th className="px-4 py-3 text-left">Rôle</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                      <th className="px-4 py-3 text-left">Créé le</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-[#0F172A]">{user.fullName}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#2C6ED5]">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[user.status]}`}>
                            <span className="h-2 w-2 rounded-full bg-current" />
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(user.id)}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 transition hover:border-[#1EB980]/30 hover:text-[#1EB980]"
                            >
                              Basculer statut
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user.id)}
                              className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-500 transition hover:bg-rose-100"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/60 bg-white/95 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6C4CCF]">Création</p>
              <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Nouveau compte</h3>
              <p className="text-sm text-slate-500">
                Attribuez un rôle et un statut. Le compte sera immédiatement enregistré localement.
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0F172A]" htmlFor="fullName">
                    Nom complet
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formValues.fullName}
                    onChange={(event) => setFormValues((prev) => ({ ...prev, fullName: event.target.value }))}
                    placeholder="Ex : Sonia ADOMOU"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#6C4CCF] focus:outline-none focus:ring-4 focus:ring-[#6C4CCF]/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0F172A]" htmlFor="email">
                    Email professionnel
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formValues.email}
                    onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="prenom.nom@campus.bj"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#6C4CCF] focus:outline-none focus:ring-4 focus:ring-[#6C4CCF]/10"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0F172A]" htmlFor="role">
                      Rôle
                    </label>
                    <select
                      id="role"
                      value={formValues.role}
                      onChange={(event) => setFormValues((prev) => ({ ...prev, role: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-[#6C4CCF] focus:outline-none focus:ring-4 focus:ring-[#6C4CCF]/10"
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0F172A]" htmlFor="status">
                      Statut initial
                    </label>
                    <select
                      id="status"
                      value={formValues.status}
                      onChange={(event) => setFormValues((prev) => ({ ...prev, status: event.target.value as UserStatus }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-[#6C4CCF] focus:outline-none focus:ring-4 focus:ring-[#6C4CCF]/10"
                    >
                      <option value="Actif">Actif</option>
                      <option value="En attente">En attente</option>
                    </select>
                  </div>
                </div>

                {formError && (
                  <p className="text-sm font-medium text-rose-500">{formError}</p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#6C4CCF] py-3 text-sm font-semibold text-white shadow-lg shadow-[#6C4CCF]/30 transition hover:bg-[#5a3bcb]"
                >
                  Enregistrer le compte
                </button>
              </form>
            </div>

            <div className="rounded-[28px] border border-white/60 bg-white/95 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2C6ED5]">Rôles</p>
              <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Répartition</h3>
              <div className="mt-4 space-y-3">
                {roleDistribution.map(({ role, count }) => (
                  <div key={role} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-[#F9FAFB] px-4 py-3 text-sm">
                    <div>
                      <p className="font-semibold text-[#0F172A]">{role}</p>
                      <p className="text-xs text-slate-400">{count} compte{count > 1 ? 's' : ''}</p>
                    </div>
                    <span className="text-lg font-bold text-[#2C6ED5]">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UsersPage;
