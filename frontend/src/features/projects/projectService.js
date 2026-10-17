const API_URL = "https://gemini-powered-readme-generator.vercel.app/api/projects";

export const projectService = {
  async getProjects() {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch projects.");
    }

    return data.projects;
  },

  async getProjectById(id) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch project.");
    }

    return data.project;
  },

  async createProject(projectData) {
    console.log("Saving project with credentials:", projectData);
    
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create project.");
    }

    return data.project;
  },

  async updateProject(id, projectData) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      method: "PATCH",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update project.");
    }

    return data.project;
  },

  async deleteProject(id) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete project.");
    }

    return response.json();
  },
};
