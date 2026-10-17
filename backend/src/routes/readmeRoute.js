import { Router } from "express";
import { generateReadme, regenerateSection } from "../controller/readmeController.js";

export const router = Router()

router.post("/generate", generateReadme)

router.post("/regenerate-section", regenerateSection);