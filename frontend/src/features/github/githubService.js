const API_URL = "http://localhost:3000";

export async function importGitHubRepository(repositoryUrl) {
  const response = await fetch(`${API_URL}/api/github/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repositoryUrl }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to import GitHub repository.",
    );
  }

  return data.repository;
}


export async function saveGitHubReadme(
  owner,
  repo,
  content,
  branch,
) {
  const response = await fetch(
    `${API_URL}/api/github/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, branch }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save README.");
  }

  return data;
}
