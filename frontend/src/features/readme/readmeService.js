const API_URL = "https://gemini-powered-readme-generator.vercel.app/readme";

export const readmeService = {
  async generateReadme(projectDetails) {
    const response = await fetch(`${API_URL}/generate`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectDetails),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to generate README.");
    }

    return data.readme;
  },

  async regenerateSection(section, projectDetails) {
  const response = await fetch(
    `${API_URL}/regenerate-section`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...projectDetails,
        section,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to regenerate section."
    );
  }

  return data.content;
},
};
