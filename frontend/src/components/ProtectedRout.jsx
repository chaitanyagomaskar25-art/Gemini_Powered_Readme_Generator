import { Navigate, Outlet, useLocation } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({
  isAuthenticated,
  isLoading = false,
  children,
}) {
  const location = useLocation();

  if (isLoading) {
    return (
      <LoadingSpinner
        message="Checking your session..."
        fullScreen
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children ?? <Outlet />;
}