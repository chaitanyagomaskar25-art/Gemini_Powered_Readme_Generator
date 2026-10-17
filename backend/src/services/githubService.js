
const GITHUB_API = "https://api.github.com";

function getRepositoryCoordinates(repositoryUrl) {
  const url = new URL(repositoryUrl.trim());

  if (
    url.protocol !== "https:" ||
    url.hostname !== "github.com" ||
    url.port ||
    url.username ||
    url.password
  ) {
    throw new Error("Invalid GitHub repository URL.");
  }

  const parts = url.pathname.split("/").filter(Boolean);

  if (
    parts.length !== 2 ||
    !parts.every((part) => /^[a-zA-Z0-9_.-]+$/.test(part)) ||
    parts.some((part) => part.startsWith("."))
  ) {
    throw new Error("Use a URL like https://github.com/owner/repository");
  }

  return {
    owner: parts[0],
    repo: parts[1].replace(/\.git$/, ""),
  };
}

async function githubRequest(path) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Optional token for higher rate limits or private repositories.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`${GITHUB_API}${path}`, {
    headers,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Repository not found, or you do not have permission to access it.",
      );
    }

    if (response.status === 403 || response.status === 429) {
      throw new Error("GitHub API rate limit reached or access denied.");
    }

    throw new Error(`GitHub API request failed (${response.status}).`);
  }

  return response.json();
}

export async function importRepository(repositoryUrl) {
  const { owner, repo } =
    getRepositoryCoordinates(repositoryUrl);

  const encodedOwner = encodeURIComponent(owner);
  const encodedRepo = encodeURIComponent(repo);
  const base = `/repos/${encodedOwner}/${encodedRepo}`;

  // Fetch repository metadata.
  const details = await githubRequest(base);

  // Fetch the repository's complete file tree.
  const tree = await githubRequest(
    `${base}/git/trees/${encodeURIComponent(details.default_branch)}?recursive=1`,
  );

  const files = (tree.tree || [])
    .filter((item) => item.type === "blob")
    .map((item) => item.path);

  return {
    name: details.name,
    fullName: details.full_name,
    htmlUrl: details.html_url,
    description: details.description,
    language: details.language,
    stars: details.stargazers_count,
    defaultBranch: details.default_branch,
    topics: details.topics || [],
    files,
    owner,
    repo,
  };
}



