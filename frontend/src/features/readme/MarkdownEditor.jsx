
export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your README in Markdown...",
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Markdown editor
        </span>

        <span className="text-xs text-slate-500">
          {value.length} characters
        </span>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        spellCheck="false"
        aria-label="Edit README Markdown"
        className="min-h-[500px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100"
      />
    </div>
  );
}
