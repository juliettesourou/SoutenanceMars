import React from 'react';
import { MoreVertical, Pencil, Trash } from 'lucide-react';

interface TableActionProps {
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const TableAction: React.FC<TableActionProps> = ({ onEdit, onDelete, disabled = false }) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-slate-600 shadow-sm">
      <MoreVertical className="h-4 w-4" aria-hidden />
      <button
        type="button"
        onClick={onEdit}
        disabled={disabled}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden />
        <span>Edit</span>
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={disabled}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash className="h-3.5 w-3.5" aria-hidden />
        <span>Supprimer</span>
      </button>
    </div>
  );
};

export default TableAction;
