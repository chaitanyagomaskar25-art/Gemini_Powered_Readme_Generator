
import { Link } from "react-router";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-16 dark:bg-slate-950">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          <FileQuestion size={32} />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Error 404
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
          We couldn't find that page. It may have moved, or the URL might be
          incorrect.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          <ArrowLeft size={18} /> Back to home
        </Link>
      </div>
    </main>
  );
}
