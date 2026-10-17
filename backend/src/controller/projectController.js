import Project from "../model/projectModel.js";

export const getAllProjects = async (req, res) => {
  try {
    const userId = req.userId;
    const projects = await Project.find({ user: userId });
    return res.status(200).json({
      status: "success",
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Unable to fetch projects.",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const userId = req.userId
        console.log("Project name:", req.body?.name);

    const {
      name,
      description,
      keyFeatures,
      techStack,
      installation,
      usage,
      readmeContent,
      githubUrl,
    } = req.body;

    const project = await Project.create({
      name,
      techStack,
      installation,
      usage,
      description,
      keyFeatures,
      readmeContent,
      githubUrl,
      user:userId
    });

    res.json({
      message: "Project created successfully!",
      project,
    });
  } catch (error) {
      console.error("Create project error:", error);

    res.json({
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const userId = req.userId;
    const projectId = req.params.id;

    const deletedProject = await Project.findOneAndDelete({
      _id: projectId,
      user: userId,
    });

    if (!deletedProject) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Project deleted successfully!",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      status: "failed",
      message: "Unable to delete project.",
    });
  }
};




export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({
      _id: id,
      user: req.userId,
    });

    if (!project) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        status: "failed",
        message: "Invalid project ID.",
      });
    }

    return res.status(500).json({
      status: "failed",
      message: "Unable to fetch project.",
    });
  }
};


export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { readmeContent } = req.body;


    const project = await Project.findOneAndUpdate(
      {
        _id: id,
        user: req.userId,
      },
      {
        $set: {
          readmeContent,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "README updated successfully.",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      status: "failed",
      message: "Unable to update your README.",
    });
  }
};