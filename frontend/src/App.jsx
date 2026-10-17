import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import GenerateReadme from "./pages/GenerateReadme";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import GitHubImportPage from "./pages/GitHubImportPage";
import NotFound from "./pages/NotFound";
import ReadmeEditor from "./pages/ReadmeEditor";
import ProtectedRoute from "./components/ProtectedRout";
import useAuth from "./hooks/useAuth";
import ReadmePreviewPage from "./features/readme/ReadmePreview";

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Routes>
      {/* Public pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />
      </Route>

      {/* Protected application pages */}
      <Route
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          >
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/projects"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route path="/readme/:id" element={<ReadmePreviewPage />} />

        <Route path="/readme/:id/edit" element={<ReadmeEditor />} />
        <Route path="/generate" element={<GenerateReadme />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/github-import" element={<GitHubImportPage />} />
      </Route>

      {/* Unknown URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
