import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setServerError("");
    clearErrors("root");

    try {
      const response = await fetch(
       "https://gemini-powered-readme-generator-ujr.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            password: data.password,
          }),
        }
      );

      const answer = await response.json();

      if (response.status === 409) {
        setError("root", {
          type: "manual",
          message:
            answer.message ||
            "This email is already registered. Please log in.",
        });
        return;
      }

      if (!response.ok) {
        throw new Error(
          answer.message || "Unable to create your account."
        );
      }

      navigate("/login", {
        replace: true,
        state: {
          message: "Account created successfully. Please log in.",
        },
      });
    } catch (err) {
      setServerError(
        err.message || "Unable to create your account. Please try again."
      );
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Signup error, including duplicate email */}
      {errors.root && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{errors.root.message}</span>
        </div>
      )}

      {/* Full name */}
      <div className="space-y-2">
        <label
          htmlFor="signup-name"
          className="text-sm font-medium text-slate-700"
        >
          Full name
        </label>

        <div className="relative">
          <UserRound
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
            {...register("name", {
              required: "Name is required",
              validate: (value) =>
                value.trim().length > 0 ||
                "Name cannot contain only spaces",
            })}
          />
        </div>

        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="signup-email"
          className="text-sm font-medium text-slate-700"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
        </div>

        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="signup-password"
          className="text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={`${inputClass} pr-12`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm password */}
      <div className="space-y-2">
        <label
          htmlFor="signup-confirm-password"
          className="text-sm font-medium text-slate-700"
        >
          Confirm password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="signup-confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            className={inputClass}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
        </div>

        {errors.confirmPassword && (
          <p className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <p className="text-xs leading-5 text-slate-500">
        By creating an account, you agree to use the service responsibly.
      </p>

      <Button type="submit" loading={isSubmitting} className="w-full">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}