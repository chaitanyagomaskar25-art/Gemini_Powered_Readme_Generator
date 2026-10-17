
import { LoaderCircle, Sparkles } from "lucide-react";

export default function LoadingSpinner({
  message = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen bg-slate-50" : "py-10"
      }`}
    >
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
        <Sparkles size={22} className="text-indigo-600" />
        <LoaderCircle
          size={52}
          className="absolute animate-spin text-indigo-500/70"
          strokeWidth={1.5}
        />
      </div>

      <p className="text-sm font-medium text-slate-700">
        {message}
      </p>

      <span className="sr-only">Please wait</span>
    </div>
  );
}
