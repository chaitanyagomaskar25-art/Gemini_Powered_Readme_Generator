
import { useState } from "react";
import { Copy, Download, Eye, Pencil } from "lucide-react";

export default function ReadmeToolbar({
  content,
  view,
  onViewChange,
}) {
  const [copyMessage, setCopyMessage] = useState("");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopyMessage("Copied!");
    } catch {
      setCopyMessage("Copy failed. Try selecting the text manually.");
    }
  }

  function handleDownload() {
    const blob = new Blob([content], {
      type: "text/markdown;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "README.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
        <button
          type="button"
          onClick={() => onViewChange("edit")}
          aria-pressed={view === "edit"}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            view === "edit"
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-300"
              : "text-slate-600 dark:text-slate-300"
          }`}
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onViewChange("preview")}
          aria-pressed={view === "preview"}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            view === "preview"
              ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-300"
              : "text-slate-600 dark:text-slate-300"
          }`}
        >
          <Eye size={16} />
          Preview
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {copyMessage && (
          <span role="status" className="text-xs text-slate-500">
            {copyMessage}
          </span>
        )}

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <Copy size={16} />
          Copy
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
}
