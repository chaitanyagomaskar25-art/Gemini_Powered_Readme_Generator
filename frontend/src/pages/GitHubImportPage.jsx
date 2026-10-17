
import { useNavigate } from "react-router";
import GitHubImport from "../features/github/GitHubImport";

export default function GitHubImportPage() {
  const navigate = useNavigate();

  function handleRepositoryImport(repository) {
    // Pass repository details to the next page.
    navigate("/generate", {
      state: { repository },
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
      <GitHubImport onImport={handleRepositoryImport} />
    </main>
  );
}
