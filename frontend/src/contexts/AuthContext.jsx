import { createContext, useEffect, useState } from "react";
import authAPI from "../api/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (token) {
          const res = await authAPI.getProfile();
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Token invalid or expired");
        logout();
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (data) => {
    const res = await authAPI.login(data);
    localStorage.setItem("authToken", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const register = async (data) => {
    const res = await authAPI.register(data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
