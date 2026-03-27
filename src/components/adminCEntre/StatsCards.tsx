import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export interface StatCardItem {
  label: string;
  value: string | number;
  delta?: string;
  helperText?: string;
  trend?: 'up' | 'down';
}

interface StatsCardsProps {
  stats?: StatCardItem[];
}

const defaultStats: StatCardItem[] = [
  { label: 'Nouveaux inscrits', value: 48, delta: '+12%', helperText: 'vs semaine dernière', trend: 'up' },
  { label: 'Taux de présence', value: '93%', delta: '+2%', helperText: 'sur les 7 derniers jours', trend: 'up' },
  { label: 'Sessions en attente', value: 6, delta: '-1', helperText: 'à planifier', trend: 'down' },
];

const StatsCards: React.FC<StatsCardsProps> = ({ stats = defaultStats }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item) => (
        <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{item.label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
          {item.delta ? (
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
              {item.trend === 'down' ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
              <span>{item.delta}</span>
            </p>
          ) : null}
          {item.helperText ? <p className="text-xs text-slate-500">{item.helperText}</p> : null}
        </article>
      ))}
    </div>
  );
};

export default StatsCards;
