
import { useState } from "react";
import {
  GitBranch,
  Star,
  FileCode2,
  ExternalLink,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  GitBranchIcon,
} from "lucide-react";

import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import { importGitHubRepository } from "./githubService";

function isValidGitHubUrl(value) {
  try {
    const url = new URL(value.trim());

    if (
      url.protocol !== "https:" ||
      url.hostname !== "github.com" ||
      url.port ||
      url.username ||
      url.password
    ) {
      return false;
    }

    const parts = url.pathname.split("/").filter(Boolean);

    return (
      parts.length === 2 &&
      parts.every(
        (part) =>
          part !== "." &&
          part !== ".." &&
          /^[a-zA-Z0-9_.-]+$/.test(part),
      ) &&
      !parts[0].startsWith(".") &&
      !parts[1].startsWith(".")
    );
  } catch {
    return false;
  }
}

export default function GitHubImport({
  onImport,
  initialUrl = "",
}) {
  const [repositoryUrl, setRepositoryUrl] = useState(initialUrl);
  const [repository, setRepository] = useState(null);
  const [error, setError] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setRepository(null);

    const url = repositoryUrl.trim();

    if (!isValidGitHubUrl(url)) {
      setError(
        "Enter a valid public GitHub repository URL, such as https://github.com/owner/repository",
      );
      return;
    }

    setIsImporting(true);

    try {
      const data = await importGitHubRepository(url);

      if (!data || !data.name || !data.htmlUrl) {
        throw new Error("The server returned incomplete repository information.");
      }

      setRepository(data);
    } catch (err) {
      setError(
        err.message || "Import failed. Please try again.",
      );
    } finally {
      setIsImporting(false);
    }
  }

  function handleContinue() {
    if (repository && onImport) {
      onImport(repository);
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <GitBranchIcon size={25} />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Import a GitHub repository
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Let AI understand your project structure before
          generating your README.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <label
          htmlFor="github-repository-url"
          className="block text-sm font-semibold text-slate-800"
        >
          Repository URL
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="github-repository-url"
            type="url"
            required
            value={repositoryUrl}
            onChange={(event) => {
              setRepositoryUrl(event.target.value);
              setError("");
              setRepository(null);
            }}
            placeholder="https://github.com/owner/repository"
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <Button
            type="submit"
            loading={isImporting}
            disabled={!repositoryUrl.trim()}
          >
            Import repository
          </Button>
        </div>

        <p className="text-xs text-slate-500">
          Public repositories are supported by this form.
          Private repository access requires additional
          server-side authentication.
        </p>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {isImporting && (
        <LoadingSpinner
          message="Fetching repository information..."
        />
      )}

      {repository && !isImporting && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
            <div className="flex min-w-0 items-start gap-3">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <GitBranch size={25} />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="break-all font-semibold text-slate-900">
                    {repository.fullName || repository.name}
                  </h3>
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-600"
                  />
                </div>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {repository.description ||
                    "No repository description provided."}
                </p>
              </div>
            </div>

            <a
              href={repository.htmlUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open repository on GitHub"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
            >
              <ExternalLink size={18} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Language</p>
              <p className="mt-1 font-semibold text-slate-800">
                {repository.language || "Not detected"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Stars</p>
              <p className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
                <Star size={15} className="text-amber-500" />
                {repository.stars ?? 0}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Default branch</p>
              <p className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
                <GitBranch size={15} />
                {repository.defaultBranch || "Unknown"}
              </p>
            </div>
          </div>

          {Array.isArray(repository.topics) &&
            repository.topics.length > 0 && (
              <div className="px-5 pb-5">
                <p className="mb-2 text-sm font-semibold text-slate-800">
                  Repository topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {repository.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

          <div className="border-t border-slate-100 p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <FileCode2 size={17} />
              Detected project files
            </p>

            {Array.isArray(repository.files) &&
            repository.files.length > 0 ? (
              <ul className="space-y-2">
                {repository.files.slice(0, 8).map((file) => (
                  <li
                    key={file}
                    className="break-all rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-600"
                  >
                    {file}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                No project files were returned.
              </p>
            )}

            {Array.isArray(repository.files) &&
              repository.files.length > 8 && (
                <p className="mt-2 text-xs text-slate-500">
                  And {repository.files.length - 8} more files.
                </p>
              )}

            <Button
              onClick={handleContinue}
              className="mt-5 w-full"
              disabled={!onImport}
            >
              Continue to README Generator
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
