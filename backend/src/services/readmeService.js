import { ai } from "../config/gemini.js";

export async function regenerateReadmeSection(
  section,
  projectDetails
) {
  const {
    name,
    description,
    features = [],
    keyFeatures = [],
    techStack = [],
    installation = "",
    usage = "",
    githubUrl = "",
  } = projectDetails;

  const projectFeatures = keyFeatures.length
    ? keyFeatures
    : features;

  const prompt = `
You are an expert technical writer who writes clear README.md files.

Regenerate ONLY the requested section of the README.

PROJECT DETAILS
Project name: ${name}
Description: ${description}

Key features:
${projectFeatures.length
  ? projectFeatures.map((item) => `- ${item}`).join("\n")
  : "Not provided"}

Technology stack:
${techStack.length
  ? techStack.map((item) => `- ${item}`).join("\n")
  : "Not provided"}

Installation instructions:
${installation || "Not provided"}

Usage instructions:
${usage || "Not provided"}

GitHub URL:
${githubUrl || "Not provided"}

SECTION TO REGENERATE:
${section}

REQUIREMENTS:
1. Return only the replacement section in Markdown.
2. Include an appropriate Markdown heading.
3. Keep the content relevant to this project.
4. Do not regenerate the entire README.
5. Do not invent project features, commands, URLs, or credentials.
6. If required information is missing, use a clear placeholder or say
   that the information was not provided.
7. Do not wrap the answer in a Markdown code fence.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,
    config: {
      temperature: 0.7,
    },
  });

  const content = response.text?.trim();

  if (!content) {
    throw new Error(
      "Gemini did not return any content. Please try again."
    );
  }

  return content;
}