
import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("pharmacyUser");
    const savedTheme = localStorage.getItem("pharmacyTheme");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      const userData = await loginUser(identifier, password);
      localStorage.setItem("pharmacyUser", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("pharmacyUser");
    setUser(null);
    window.location.href = "/login";
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("pharmacyTheme", newTheme ? "dark" : "light");
    if (newTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleTheme, isDark, toast, setToast }}>
      {children}
    </AuthContext.Provider>
  );
};

// THIS LINE WAS MISSING — THIS IS THE FIX
export const useAuth = () => useContext(AuthContext);