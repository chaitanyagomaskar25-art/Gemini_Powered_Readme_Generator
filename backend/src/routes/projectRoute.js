import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controller/projectController.js";
import { verifyAccessToken } from "../middleware/verifyAccessTokenMiddleware.js";

export const router = Router();

router.post("/", verifyAccessToken, createProject);


router.get("/", verifyAccessToken, getAllProjects);
router.get("/:id", verifyAccessToken, getProjectById);

router.patch("/:id", verifyAccessToken, updateProject);

router.delete("/:id", verifyAccessToken, deleteProject)
