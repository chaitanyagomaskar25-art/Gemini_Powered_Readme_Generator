
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    // Features entered by the user
    keyFeatures: {
      type: [String],
      default: [],
    },

    // Example: ["React", "Node.js", "MongoDB"]
    techStack: {
      type: [String],
      default: [],
    },

    installation: {
      type: String,
      default: "",
    },

    usage: {
      type: String,
      default: "",
    },

    // Generated and edited Markdown
    readmeContent: {
      type: String,
      default: "",
    },

    githubUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // Owner of this project
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
