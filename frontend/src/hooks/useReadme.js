
import { useCallback, useState } from "react";
import { readmeService } from "../features/readme/readmeService";

export default function useReadme(initialMarkdown = "") {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegeneratingSection, setIsRegeneratingSection] =
    useState(false);
  const [error, setError] = useState("");

  const generateReadme = useCallback(async (projectDetails) => {
    setIsGenerating(true);
    setError("");

    try {
      const result =
        await readmeService.generateReadme(projectDetails);

      if (typeof result !== "string") {
        throw new Error("The server returned an invalid README.");
      }

      setMarkdown(result);
      return result;
    } catch (err) {
      setError(err.message || "Unable to generate README.");
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const regenerateSection = useCallback(
    async (section, projectDetails = {}) => {
      setIsRegeneratingSection(true);
      setError("");

      try {
        const content =
          await readmeService.regenerateSection(
            section,
            {
              ...projectDetails,
              currentReadme: markdown,
            },
          );

        if (typeof content !== "string") {
          throw new Error("The server returned an invalid section.");
        }

        return content;
      } catch (err) {
        setError(err.message || "Unable to regenerate section.");
        throw err;
      } finally {
        setIsRegeneratingSection(false);
      }
    },
    [markdown],
  );

  const updateMarkdown = useCallback((value) => {
    setMarkdown(value);
    setError("");
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    markdown,
    setMarkdown: updateMarkdown,
    generateReadme,
    regenerateSection,
    isGenerating,
    isRegeneratingSection,
    error,
    setError,
    clearError,
  };
}
