
import { Link } from "react-router";
import { Sparkles, Heart, GitBranchIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Sparkles size={19} />
              </span>
              <span className="font-bold text-slate-900">
                AI README Studio
              </span>
            </Link>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Create clear, professional project documentation
              with the power of AI.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Product
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  to="/generate"
                  className="text-sm text-slate-500 hover:text-indigo-600"
                >
                  Generate README
                </Link>
                <Link
                  to="/templates"
                  className="text-sm text-slate-500 hover:text-indigo-600"
                >
                  Templates
                </Link>
                <Link
                  to="/dashboard"
                  className="text-sm text-slate-500 hover:text-indigo-600"
                >
                  My Projects
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Account
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  to="/login"
                  className="text-sm text-slate-500 hover:text-indigo-600"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm text-slate-500 hover:text-indigo-600"
                >
                  Sign up
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600"
                >
                  <GitBranchIcon size={15} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AI README Studio.</p>
          <p className="flex items-center gap-1.5">
            Made for developers with
            <Heart size={14} className="fill-rose-500 text-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
