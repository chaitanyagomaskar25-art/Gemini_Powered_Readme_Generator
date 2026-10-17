
import { Link, useNavigate } from "react-router";
import { ArrowRight, Code2, FileText, Layers } from "lucide-react";

const templates = [
  {
    id: "basic",
    title: "Basic Project",
    description: "A clean starting point for small projects.",
    icon: FileText,
    details: {
      name: "My Project",
      description: "Describe what your project does.",
      features: ["Simple and easy to use"],
      techStack: [],
      installation: "npm install",
      usage: "npm run dev",
    },
  },
  {
    id: "web",
    title: "Web Application",
    description: "Document a frontend or full-stack web app.",
    icon: Code2,
    details: {
      name: "My Web Application",
      description: "A modern web application.",
      features: ["Responsive user interface", "Easy to use"],
      techStack: ["React", "Node.js"],
      installation: "npm install",
      usage: "npm run dev",
    },
  },
  {
    id: "library",
    title: "Open Source Library",
    description: "Explain installation, usage, and contribution.",
    icon: Layers,
    details: {
      name: "My Library",
      description: "A reusable developer library.",
      features: ["Reusable functionality", "Developer-friendly API"],
      techStack: [],
      installation: "npm install",
      usage: "Import the library into your project.",
      linkedIn: "linkedin.com"
    },
  },
];

export default function Templates() {
  const navigate = useNavigate();

  function useTemplate(template) {
    navigate("/generate", {
      state: { template: template.details },
    });
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          README templates
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Choose a starting point and customize it for your project.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {templates.map(({ id, title, description, icon: Icon, details }) => (
          <article
            key={id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <Icon size={24} />
            </div>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-2 flex-1 leading-7 text-slate-600 dark:text-slate-400">
              {description}
            </p>

            <button
              type="button"
              onClick={() => useTemplate({ details })}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Use template <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        Want to start from scratch?{" "}
        <Link
          to="/generate"
          className="font-medium text-indigo-600 hover:underline"
        >
          Open the README generator
        </Link>
      </p>
    </div>
  );
}
