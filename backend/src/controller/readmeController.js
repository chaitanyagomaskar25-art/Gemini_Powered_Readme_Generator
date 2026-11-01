import { ai } from "../config/gemini.js";
import { regenerateReadmeSection } from "../services/readmeService.js";
import { importRepository } from "../services/githubService.js";

function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

export const generateReadme = async (req, res) => {
  try {
    const {
      name,
      description,
      features,
      keyFeatures,
      techStack,
      installation,
      usage,
      readmeContent,
      githubUrl,
      files,
      repositoryFiles,
    } = req.body;

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedDescription =
      typeof description === "string" ? description.trim() : "";

    if (!trimmedName || !trimmedDescription) {
      return res.status(400).json({
        message: "Project name and description are required.",
      });
    }

    let repository = null;
    if (typeof githubUrl === "string" && githubUrl.trim()) {
      try {
        repository = await importRepository(githubUrl.trim());
      } catch (error) {
        console.warn("Could not fetch GitHub repository details:", error.message);
      }
    }

    const normalizedFeatures = normalizeStringArray(features);
    const normalizedKeyFeatures = normalizeStringArray(keyFeatures);
    const projectFeatures =
      normalizedKeyFeatures.length > 0
        ? normalizedKeyFeatures
        : normalizedFeatures;

    const normalizedTechStack = normalizeStringArray(techStack);
    const resolvedTechStack =
      normalizedTechStack.length > 0
        ? normalizedTechStack
        : repository?.language
          ? [repository.language]
          : [];

    const resolvedFiles = Array.isArray(repositoryFiles)
      ? repositoryFiles
      : Array.isArray(files)
        ? files
        : repository?.files || [];

    const prompt = [
      "You are an expert technical writer who writes clear, professional README.md files.",
      "",
      "Generate a complete README.md for the following project.",
      "",
      "PROJECT DETAILS",
      `Project name: ${trimmedName}`,
      `Description: ${trimmedDescription}`,
      "",
      "Key features:",
      projectFeatures.length
        ? projectFeatures.map((item) => `- ${item}`).join("\n")
        : "Not provided",
      "",
      "Technology stack:",
      resolvedTechStack.length
        ? resolvedTechStack.map((item) => `- ${item}`).join("\n")
        : "Not provided",
      "",
      "Installation instructions:",
      typeof installation === "string" && installation.trim()
        ? installation
        : "Not provided",
      "",
      "Usage instructions:",
      typeof usage === "string" && usage.trim() ? usage : "Not provided",
      "",
      "GitHub URL:",
      typeof githubUrl === "string" && githubUrl.trim()
        ? githubUrl.trim()
        : "Not provided",
      "",
      resolvedFiles.length
        ? `Repository files:\n${resolvedFiles
            .slice(0, 150)
            .map((file) => `- ${file}`)
            .join("\n")}`
        : "",
      "",
      typeof readmeContent === "string" && readmeContent.trim()
        ? `Existing README content:\n${readmeContent}`
        : "",
      "",
      "REQUIREMENTS:",
      "1. Return only the README.md content in Markdown.",
      "2. Start directly with the project's main heading.",
      "3. Include relevant sections such as Overview, Features, Tech Stack, Installation, Usage, and Project Structure when useful.",
      "4. Use the provided repository files to describe the project structure accurately.",
      "5. Do not invent commands, dependencies, URLs, or credentials that were not provided.",
      "6. If information is missing, use a clear placeholder instead of guessing.",
      "7. Do not wrap the entire README in a Markdown code fence.",
    ].join("\n");

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const result = response.text?.trim();

    if (!result) {
      return res.status(502).json({
        message: "Gemini returned no generated text.",
      });
    }

    return res.json({
      message: "README generated successfully",
      readme: result,
    });
  } catch (error) {
    console.error("Gemini error:", error.message);

    return res.status(500).json({
      message: error.message || "Failed to generate README.",
    });
  }
};




export async function regenerateSection(req, res) {
  try {
    const {
      section,
      name,
      description,
      features,
      keyFeatures,
      techStack,
      installation,
      usage,
      githubUrl,
    } = req.body;

    // Validate the required inputs.
    if (
      typeof section !== "string" ||
      !section.trim()
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Please specify the section to regenerate.",
      });
    }

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Project name and description are required.",
      });
    }

    if (
      features !== undefined &&
      (!Array.isArray(features) ||
        !features.every((item) => typeof item === "string"))
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Features must be an array of strings.",
      });
    }

    if (
      keyFeatures !== undefined &&
      (!Array.isArray(keyFeatures) ||
        !keyFeatures.every((item) => typeof item === "string"))
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Key features must be an array of strings.",
      });
    }

    if (
      techStack !== undefined &&
      (!Array.isArray(techStack) ||
        !techStack.every((item) => typeof item === "string"))
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Technology stack must be an array of strings.",
      });
    }

    const projectDetails = {
      name,
      description,
      features: features || [],
      keyFeatures: keyFeatures || [],
      techStack: techStack || [],
      installation: installation || "",
      usage: usage || "",
      githubUrl: githubUrl || "",
    };

    const content = await regenerateReadmeSection(
      section.trim(),
      projectDetails
    );

    return res.status(200).json({
      status: "success",
      message: "README section regenerated successfully.",
      content,
    });
  } catch (error) {
    console.error("Regenerate README section error:", error);

    return res.status(500).json({
      status: "failed",
      message:
        "Unable to regenerate this README section. Please try again.",
    });
  }
}