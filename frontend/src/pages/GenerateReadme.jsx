
import { useEffect, useRef, useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

import ProjectForm from "../features/readme/ProjectForm";
import MarkdownEditor from "../features/readme/MarkdownEditor";
import MarkdownPreview from "../features/readme/MarkdownPreview";
import ReadmeToolbar from "../features/readme/ReadmeToolbar";
import { readmeService } from "../features/readme/readmeService";
import { projectService } from "../features/projects/projectService";

export default function GenerateReadme() {
  const [markdown, setMarkdown] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);
  const [view, setView] = useState("edit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formKey, setFormKey] = useState(0);

  const feedbackRef = useRef(null);

  // Automatically scroll to error or success feedback.
  useEffect(() => {
    if (error || success) {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error, success]);

  async function handleGenerate(details) {
    setIsGenerating(true);
    setError("");
    setSuccess("");
    setProjectDetails(details);

    try {
      const generatedMarkdown =
        await readmeService.generateReadme(details);

      setMarkdown(generatedMarkdown);
      setView("preview");
      setSuccess("README generated successfully! Review it before saving.");
    } catch (err) {
      setError(err.message || "Unable to generate README. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSave() {
    if (!projectDetails || !markdown.trim()) {
      setError("Generate a README before saving your project.");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const project = await projectService.createProject({
        ...projectDetails,
        keyFeatures: projectDetails.features,
        githubUrl: projectDetails.githubUrl || "",
        readmeContent: markdown,
      });

      setSuccess(
        `Project "${project.name}" saved successfully! You can now start another project.`
      );
    } catch (err) {
      setError(err.message || "Unable to save project. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleClear() {
    // Clear only the current page; do not delete saved database projects.
    setMarkdown("");
    setProjectDetails(null);
    setView("edit");
    setError("");
    setSuccess("");

    // Remount ProjectForm so React Hook Form resets all fields.
    setFormKey((previousKey) => previousKey + 1);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Sparkles size={22} />
            <span className="text-sm font-semibold">AI README Studio</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Generate your README
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Describe your project and let AI help document it.
          </p>
        </header>
{/* Save and clear actions */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {markdown.trim() && !isGenerating && (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? "Saving Project..." : "Save Project"}
                </button>
              )}

              {(markdown || projectDetails) && !isGenerating && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <RotateCcw size={17} />
                  Start New / Clear
                </button>
              )}
            </div>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <ProjectForm
              key={formKey}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </section>

          <section className="min-w-0 space-y-4">
            <ReadmeToolbar
              content={markdown}
              view={view}
              onViewChange={setView}
            />

            {/* Error and success feedback */}
            <div
              ref={feedbackRef}
              aria-live="polite"
              className="scroll-mt-8 space-y-3"
            >
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 shadow-sm dark:border-red-800 dark:bg-red-950 dark:text-red-200"
                >
                  <span className="text-lg font-bold" aria-hidden="true">
                    !
                  </span>
                  <div>
                    <p className="font-semibold">Something went wrong</p>
                    <p className="mt-1 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-green-300 bg-green-50 p-4 text-green-800 shadow-sm dark:border-green-800 dark:bg-green-950 dark:text-green-200"
                >
                  <span className="text-lg font-bold" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold">Success!</p>
                    <p className="mt-1 text-sm">{success}</p>
                  </div>
                </div>
              )}
            </div>

            {isGenerating ? (
              <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                <p className="animate-pulse text-slate-600 dark:text-slate-300">
                  Generating your README...
                </p>
              </div>
            ) : view === "edit" ? (
              <MarkdownEditor
                value={markdown}
                onChange={setMarkdown}
              />
            ) : (
              <MarkdownPreview content={markdown} />
            )}

            {/* Save and clear actions */}
            <div className="flex flex-wrap items-center gap-3">
              {markdown.trim() && !isGenerating && (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? "Saving Project..." : "Save Project"}
                </button>
              )}

              {(markdown || projectDetails) && !isGenerating && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <RotateCcw size={17} />
                  Start New / Clear
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
