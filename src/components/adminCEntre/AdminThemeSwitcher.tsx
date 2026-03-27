import React, { useEffect, useMemo, useState } from 'react';
import { MoonStar, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'admin-theme';

const AdminThemeSwitcher: React.FC = () => {
  const prefersDark = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }, []);

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
      aria-label="Basculer le thème"
    >
      {theme === 'light' ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      <span>{theme === 'light' ? 'Mode clair' : 'Mode sombre'}</span>
    </button>
  );
};

export default AdminThemeSwitcher;
