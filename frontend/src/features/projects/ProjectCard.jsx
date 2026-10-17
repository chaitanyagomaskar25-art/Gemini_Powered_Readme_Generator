
import { FileText, Clock, Pencil, Trash2 } from "lucide-react";
import Button from "../../components/Button";

export default function ProjectCard({
  project,
  onOpen,
  onEdit,
  onDelete,
}) {
  const updatedDate = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString()
    : "Not available";

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          <FileText size={22} />
        </div>

        <button
          type="button"
          onClick={() => onDelete?.(project._id)}
          aria-label={`Delete ${project.name}`}
          title="Delete project"
          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <h3 className="mb-2 truncate text-lg font-semibold text-slate-900 dark:text-white">
        {project.name}
      </h3>

      <p className="mb-4 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {project.description || "No description added yet."}
      </p>

      <div className="mb-5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Clock size={14} />
        <span>Updated {updatedDate}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={() => onOpen?.(project)}
          className="flex-1"
        >
          Open README
        </Button>

        <Button
          variant="outline"
          onClick={() => onEdit?.(project)}
          aria-label={`Edit ${project.name}`}
        >
          <Pencil size={16} /> 
        </Button>
      </div>

    </article>
  );
}
