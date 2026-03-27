import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
      <button
        type="button"
        onClick={() => handleChange(currentPage - 1)}
        disabled={!canGoPrev}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ChevronLeft className="h-4 w-4" />
        Précédent
      </button>

      <p className="text-xs text-slate-500">
        Page <span className="font-semibold text-slate-800">{currentPage}</span> sur {totalPages}
      </p>

      <button
        type="button"
        onClick={() => handleChange(currentPage + 1)}
        disabled={!canGoNext}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Suivant
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
