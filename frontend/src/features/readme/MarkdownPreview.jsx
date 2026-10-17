
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownPreview({ content = "" }) {
  return (
    <article className="min-h-[500px] overflow-x-auto rounded-xl border border-slate-200 bg-white p-6 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      {content.trim() ? (
        <div className="prose prose-slate max-w-none break-words dark:prose-invert prose-headings:font-bold prose-a:text-indigo-600 prose-pre:overflow-x-auto prose-code:break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex min-h-[420px] items-center justify-center text-center">
          <div>
            <p className="font-medium text-slate-600 dark:text-slate-300">
              Your README preview will appear here.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Enter some Markdown or generate a README to get started.
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
