
import { useForm } from "react-hook-form";
import { Sparkles } from "lucide-react";
import Button from "../../components/Button";

const initialForm = {
  name: "",
  description: "",
  features: "",
  techStack: "",
  installation: "",
  usage: "",
  githubUrl: "",
};

export default function ProjectForm({
  onGenerate,
  isGenerating = false,
  initialValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialForm,
      ...initialValues,
    },
  });

  async function onSubmit(form) {
    const projectDetails = {
      ...form,
      features: form.features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      techStack: form.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    await onGenerate(projectDetails);
  }

  const fields = [
    {
      name: "name",
      label: "Project name",
      placeholder: "e.g. TaskFlow",
      required: "Project name is required.",
    },
    {
      name: "description",
      label: "Project description",
      placeholder: "What does your project do?",
      textarea: true,
      required: "Project description is required.",
    },
    {
      name: "features",
      label: "Key features",
      placeholder: "User authentication\nTask management\nDark mode",
      textarea: true,
      required: "Please enter at least one feature.",
      validate: (value) =>
        value.trim().length > 0 ||
        "Please enter at least one feature.",
      hint: "Enter one feature per line.",
    },
    {
      name: "techStack",
      label: "Technology stack",
      placeholder: "React, Node.js, MongoDB",
      required: "Technology stack is required.",
      validate: (value) =>
        value.split(",").some((item) => item.trim()) ||
        "Enter at least one technology.",
      hint: "Separate technologies with commas.",
    },
    {
      name: "installation",
      label: "Installation instructions",
      placeholder: "npm install\nnpm run dev",
      textarea: true,
    },
    {
      name: "usage",
      label: "Usage instructions",
      placeholder: "Explain how to run or use your project.",
      textarea: true,
    },
    {
  name: "githubUrl",
  label: "GitHub repository URL",
  placeholder: "https://github.com/username/repository",
},
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200"
          >
            {field.label}
            {field.required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>

          {field.textarea ? (
            <textarea
              id={field.name}
              placeholder={field.placeholder}
              rows={field.name === "description" ? 3 : 4}
              {...register(field.name, {
                required: field.required,
                validate: field.validate,
              })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-950"
            />
          ) : (
            <input
              id={field.name}
              placeholder={field.placeholder}
              {...register(field.name, {
                required: field.required,
                validate: field.validate,
              })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-950"
            />
          )}

          {field.hint && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {field.hint}
            </p>
          )}

          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-500">
              {errors[field.name].message}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        loading={isGenerating}
        disabled={isGenerating}
        className="w-full"
      >
        <Sparkles size={18} className="mr-2" />
        Generate README
      </Button>
    </form>
  );
}
