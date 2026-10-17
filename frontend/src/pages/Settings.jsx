
import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, Moon, Sun, UserRound } from "lucide-react";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setError("");
    setIsLoggingOut(true);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your account and appearance.
        </p>
      </div>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-3">
          <UserRound className="text-indigo-600" size={22} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Account
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Name
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">
              {user?.name || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Email
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">
              {user?.email || "Not provided"}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-3">
          {isDark ? (
            <Moon className="text-indigo-600" size={22} />
          ) : (
            <Sun className="text-indigo-600" size={22} />
          )}
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Appearance
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Dark mode
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Current theme: {isDark ? "Dark" : "Light"}
            </p>
          </div>

          <Button variant="outline" onClick={toggleTheme}>
            Switch to {isDark ? "light" : "dark"} mode
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-red-200 bg-white p-6 dark:border-red-900 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Sign out
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Sign out of your current account on this device.
        </p>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-5">
          <Button
            variant="danger"
            loading={isLoggingOut}
            onClick={handleLogout}
          >
            <LogOut size={17} /> Log out
          </Button>
        </div>
      </section>
    </div>
  );
}
