
import { useNavigate } from "react-router";
import ProjectList from "../features/projects/ProjectList";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your projects and create your next README.
        </p>
      </div>

      <ProjectList
        onCreateProject={() => navigate("/generate")}
        onOpenProject={(project) =>
          navigate(`/readme/${project._id}`)
        }
        onEditProject={(project) =>
          navigate(`/readme/${project._id}/edit`)
        }
      />
    </div>
  );
}
