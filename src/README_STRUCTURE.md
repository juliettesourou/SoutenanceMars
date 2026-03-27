# Organisation du dossier `src`

Ce découpage suit une approche par rôle et par responsabilité pour garder une base claire, sans dossiers vides ni doublons.

```text
src/
├─ main.tsx                                  # bootstrap React (createRoot)
├─ App.tsx                                   # composition globale, monte AppRouter
├─ index.css                                 # styles globaux + directives Tailwind
├─ App.css                                   # styles spécifiques App
├─ assets/                                   # ressources packagées par Vite
├─ config/
│  └─ env.ts                                 # variables runtime côté client
├─ router/
│  ├─ AppRouter.tsx                          # routage global
│  └─ index.ts
├─ components/
│  ├─ layout/
│  │  └─ DashboardLayout.tsx                 # shell commun de l'espace dashboard
│  └─ super-admin/
│     └─ navigation/
│        ├─ Sidebar.tsx                      # navigation latérale super-admin
│        └─ Topbar.tsx                       # barre supérieure super-admin
├─ pages/
│  ├─ public/
│  │  └─ HomePage.tsx                        # espace public / landing
│  └─ super-admin/
│     ├─ index.ts                            # barrel des pages super-admin
│     ├─ DashboardPage.tsx
│     ├─ SitesPage.tsx
│     ├─ UsersPage.tsx
│     ├─ StudentDetailsPage.tsx
│     └─ ...                                 # autres écrans routables super-admin
└─ features/
   └─ super-admin/
      ├─ sites/
      │  └─ data/
      │     └─ sites.ts                      # données/fixtures des centres
      └─ students/
         └─ data/
            └─ student.ts                    # données/fixtures des étudiants
```

Principes:
- **Par rôle** : chaque espace (`public`, `super-admin`, puis plus tard `admin`, `parent`, `etudiant`, etc.) possède ses propres pages, composants et données.
- **UI vs métier** : `components/` contient les briques réutilisables, `pages/` les écrans, et `features/` la logique/domain data liée au rôle.
- **Navigation centralisée** : `router/AppRouter.tsx` assemble les routes et les layouts.
- **Pas de dossiers fantômes** : on ne crée un dossier de rôle que lorsqu'il contient de vrais fichiers.

Convention conseillée pour la suite:
- Ajouter une nouvelle page super-admin dans `pages/super-admin/`.
- Ajouter les données, hooks ou services associés dans `features/super-admin/<domaine>/`.
- Créer un nouveau dossier de rôle seulement quand on a au moins une page ou un composant réel à y placer.
