
import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GitBranchIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import Button from "../components/Button";

const features = [
  {
    icon: Sparkles,
    title: "AI-powered writing",
    description:
      "Generate a clear README from your project's description and tech stack.",
  },
  {
    icon: FileText,
    title: "Live Markdown preview",
    description:
      "Review your documentation in a readable preview before exporting it.",
  },
  {
    icon: GitBranchIcon,
    title: "GitHub repository import",
    description:
      "Start with repository information instead of entering every detail manually.",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-white dark:bg-slate-950">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            <Sparkles size={16} />
            Documentation, made simpler
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Turn your project into a
            <span className="text-indigo-600"> README you'll be proud of.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Generate, edit, preview, and save professional project
            documentation with the help of AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => (window.location.href = "/signup")}>
              Get started <ArrowRight size={18} />
            </Button>

            <Link
              to="/templates"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Explore templates
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> Markdown export
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> Editable content
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 shadow-2xl shadow-indigo-950/10 dark:border-slate-800 sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-sm text-slate-400">README.md</span>
          </div>

          <div className="space-y-4 font-mono text-sm leading-7 text-slate-300">
            <p className="text-xl font-bold text-white"># TaskFlow</p>
            <p>A simple task management app built with React.</p>
            <p className="text-lg font-bold text-indigo-300">
              ## Features
            </p>
            <p>✓ Create and manage tasks</p>
            <p>✓ Organize tasks by status</p>
            <p>✓ Responsive interface</p>
            <p className="text-lg font-bold text-indigo-300">
              ## Getting Started
            </p>
            <p className="rounded-lg bg-white/5 p-3 text-green-300">
              npm install
              <br />
              npm run dev
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-sm text-indigo-300">
            <Zap size={16} />
            From project idea to documentation
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-t border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Everything you need to document your project
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Spend less time formatting documentation and more time building.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Ready to write a better README?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Start with your project details and let AI help with the first draft.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Create your account <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
