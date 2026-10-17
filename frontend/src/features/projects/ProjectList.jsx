
import { useCallback, useEffect, useState } from "react";
import { FolderOpen, Plus, RefreshCw } from "lucide-react";

import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProjectCard from "./ProjectCard";
import { projectService } from "./projectService";

export default function ProjectList({
  onOpenProject,
  onEditProject,
  onCreateProject,
}) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await projectService.getProjects();
      setProjects(data ?? []);
    } catch (err) {
      setError(err.message || "Unable to load your projects.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      await projectService.deleteProject(id);

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project._id !== id),
      );
    } catch (err) {
      setError(err.message || "Unable to delete this project.");
    }
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading your projects..." />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            My Projects
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your saved README documents.
          </p>
        </div>

        <Button onClick={onCreateProject}>
          <Plus size={18} className="mr-2" />
          New Project
        </Button>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={loadProjects}
            className="mt-2 inline-flex items-center gap-2 font-medium underline"
          >
            <RefreshCw size={14} />
            Try again
          </button>
        </div>
      )}

      {!error && projects.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-slate-700">
          <FolderOpen
            size={42}
            className="mx-auto mb-4 text-slate-400"
          />

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            No projects yet
          </h3>

          <p className="mx-auto mb-5 mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
            Create your first project and start generating beautiful README files.
          </p>

          <Button onClick={onCreateProject}>
            <Plus size={18} className="mr-2" />
            Create your first project
          </Button>
        </div>
      )}

      {projects.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onOpen={onOpenProject}
              onEdit={onEditProject}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
