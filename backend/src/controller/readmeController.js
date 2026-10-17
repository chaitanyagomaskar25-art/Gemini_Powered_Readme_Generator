import { ai } from "../config/gemini.js";
import { regenerateReadmeSection } from "../services/readmeService.js";



export const generateReadme = async (req, res) => {
  try {
    const { name,
      description,
      keyFeatures,
      techStack,
      installation,
      usage,
      readmeContent,
      githubUrl } = req.body;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: `take name of project ${name} and include given description ${description} and add given features in README ${keyFeatures, techStack, installation, usage, readmeContent,githubUrl}`,
    });
    const result = response.text;
 
    if (!result) {
      return res.status(502).json({
        message: "Gemini returned no generated text. Return only the README.md content. Do not include introductory explanations. Do not wrap the entire README in a markdown code block. Start directly with the project's main heading.",
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