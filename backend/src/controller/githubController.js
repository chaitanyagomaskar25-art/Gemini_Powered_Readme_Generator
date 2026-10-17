import { importRepository } from "../services/githubService.js";

export async function importGitHubRepository(req, res) {
  try {
    const { repositoryUrl } = req.body;

    if (
      typeof repositoryUrl !== "string" ||
      !repositoryUrl.trim()
    ) {
      return res.status(400).json({
        message: "Repository URL is required.",
      });
    }

    const repository = await importRepository(repositoryUrl);

    return res.status(200).json({
      message: "Repository imported successfully.",
      repository,
    });
  } catch (error) {
    console.error("GitHub import error:", error.message);

    return res.status(400).json({
      message: error.message || "Failed to import repository.",
    });
  }
}




