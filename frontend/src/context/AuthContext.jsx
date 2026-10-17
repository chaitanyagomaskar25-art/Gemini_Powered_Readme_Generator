
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext(null);

const API_URL = "https://gemini-powered-readme-generator.vercel.app/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    
    async function checkSession() {
      try {
        let response = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
        });

         if (response.status === 401) {
        try {
          await refreshAccessToken();

          response = await fetch(`${API_URL}/me`, {
            method: "GET",
            credentials: "include",
          });
        } catch {
          if (active) setUser(null);
          return;
        }
      }
        if (!response.ok) {
          if (active) setUser(null);
          return;
        }

        const data = await response.json();

        if (active) {
          setUser(data.user ?? null);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  async function refreshAccessToken() {
  const response = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Session expired. Please log in again.");
  }

  return true;
}

  async function login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

      if (!data.user) {
    throw new Error("Login succeeded, but the server did not return user information.");
  }


    setUser(data.user ?? null);
    return data.user
  }

  async function signup(name, email, password) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
      }),
    });

    const data = await response.json();

    // Display the error message returned by the backend.
    if (!response.ok || data.status === "failed") {
      throw new Error(
        data.message || "Unable to create your account."
      );
    }

    // Update the user only if the backend actually returns one.
    const registeredUser = data.user ?? data.data?.user ?? null;

    setUser(registeredUser);
    return registeredUser;
  }

  async function logout() {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Logout failed.");
    }

    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}
