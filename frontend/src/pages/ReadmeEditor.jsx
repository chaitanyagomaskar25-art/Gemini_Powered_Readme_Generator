
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Save } from "lucide-react";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import MarkdownEditor from "../features/readme/MarkdownEditor";
import MarkdownPreview from "../features/readme/MarkdownPreview";
import ReadmeToolbar from "../features/readme/ReadmeToolbar";
import { projectService } from "../features/projects/projectService";

export default function ReadmeEditor() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [view, setView] = useState("edit");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProject() {
      setIsLoading(true);
      setError("");

      try {
        const result = await projectService.getProjectById(id);

        if (!active) return;

        setProject(result);

        // Load the README that is already saved in the project.
        setMarkdown(
          result.readmeContent ??
            result.readme ??
            result.markdown ??
            ""
        );
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load this project.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      active = false;
    };
  }, [id]);

  async function handleSave() {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      // Update the existing project's README.
      const updated = await projectService.updateProject(id, {
        readmeContent: markdown,
      });

      setProject((current) => ({
        ...current,
        ...updated,
      }));

      setSuccess("README saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save your README.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading your README..." />;
  }

  if (error && !project) {
    return (
      <div className="mx-auto max-w-3xl">
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>

        <Link
          to="/dashboard"
          className="mt-4 inline-flex items-center gap-2 text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Link
        to="/dashboard"
        className="mb-5 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-300"
      >
        <ArrowLeft size={18} />
        Back to dashboard
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {project?.name || "README editor"}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Edit your existing Markdown and preview the result.
          </p>
        </div>

        <Button onClick={handleSave} loading={isSaving}>
          <Save size={16} />
          Save README
        </Button>
      </div>

      {error && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="mb-4 text-sm text-green-600">
          {success}
        </p>
      )}

      <ReadmeToolbar
        view={view}
        onViewChange={setView}
        markdown={markdown}
      />

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        {view === "edit" ? (
          <MarkdownEditor
            value={markdown}
            onChange={setMarkdown}
          />
        ) : (
          <MarkdownPreview content={markdown} />
        )}
      </div>
    </div>
  );
}
