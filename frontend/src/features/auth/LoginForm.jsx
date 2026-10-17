import { useState } from "react";
import { Link, replace, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    setServerError("");
    clearErrors();

    try {
      await login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });
      
navigate("/dashboard", replace);

    } catch (err) {
      const message = err.message || "Unable to log in. Please try again.";

      setServerError(message);

      setError("root", {
        type: "server",
        message,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {(serverError || errors.root) && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{serverError || errors.root.message}</span>
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="text-sm font-medium text-slate-700"
        >
          Email address
        </label>

        <div
          className={`flex items-center gap-3 rounded-xl border px-3.5 ${
            errors.email
              ? "border-red-400"
              : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"
          }`}
        >
          <Mail size={18} className="text-slate-400" />

          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
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
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="login-password"
            className="text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <button
            type="button"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            onClick={() =>
              setServerError(
                "Password reset will be available when recovery is implemented.",
              )
            }
          >
            Forgot password?
          </button>
        </div>

        <div
          className={`flex items-center gap-3 rounded-xl border px-3.5 ${
            errors.password
              ? "border-red-400"
              : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"
          }`}
        >
          <Lock size={18} className="text-slate-400" />

          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={!!errors.password}
            className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            {...register("password", {
              required: "Password is required.",
            })}
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
            className="text-slate-400 hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>

      {/* Signup link */}
      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
