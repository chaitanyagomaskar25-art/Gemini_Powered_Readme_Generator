import { Router } from "express";
import { importGitHubRepository } from "../controller/githubController.js";

const router = Router();

router.post("/import", importGitHubRepository);

// router.put("/:owner/:repo/readme", saveGitHubReadme);


export default router;