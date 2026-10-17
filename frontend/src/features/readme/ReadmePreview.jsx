import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { projectService } from "../projects/projectService";
import MarkdownPreview from "./MarkdownPreview";

export default function ReadmePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchProject() {
      try {
        setIsLoading(true);
        setError("");

        const data = await projectService.getProjectById(id);

        if (!cancelled) {
          setProject(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load README.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchProject();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return <p className="p-6">Loading README...</p>;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!project) {
    return <p className="p-6">README not found.</p>;
  }

  // Adjust these field names to match your backend response.
  const content =
    project.content ??
    project.readmeContent ??
    project.markdown ??
    "";

  return (
    <div className="p-6">
      
      <h1 className="mb-4 text-2xl font-bold">
        {project.title || project.name || "README Preview"}
      </h1>

      <MarkdownPreview content={content} />
    </div>
  );
}
