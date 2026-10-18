
import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setToken(data.token);
    return data;
  };

  const logout = () => {
    logoutUser();
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated: Boolean(token),
    login,
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

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
