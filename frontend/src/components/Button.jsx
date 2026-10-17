
import { LoaderCircle } from "lucide-react";

const variants = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {loading && (
        <LoaderCircle size={17} className="animate-spin" />
      )}
      {children}
    </button>
  );
}
