
import { Link } from "react-router";
import { FileText } from "lucide-react";
import LoginForm from "../features/auth/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FileText size={22} />
            </span>
            AI README Studio
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Log in to continue working on your projects.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <LoginForm />
          
        </div>
      </div>
    </main>
  );
}
