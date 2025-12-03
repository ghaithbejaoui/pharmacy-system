// src/pages/Login.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isDark, toggleTheme } = useContext(AuthContext);
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isDark) {
      toggleTheme();
    }
  }, [isDark, toggleTheme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(identifier, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: "24px",
        padding: "60px 40px",
        width: "420px",
        textAlign: "center",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        <h1 style={{ fontSize: "48px", color: "white", marginBottom: "20px" }}>PharmaSys</h1>
        <p style={{ color: "white", marginBottom: "40px", fontSize: "18px" }}>Pharmacy Management System</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            type="text"
            placeholder="Email or Nickname"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            style={{
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.3)",
              outline: "none",
              boxShadow: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
              borderBottom: "none",
              fontSize: "16px",
              background: "rgba(255,255,255,0.1)",
              color: "white"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "15px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              background: "rgba(255,255,255,0.9)",
              color: "#333"
            }}
          />
          {error && <p style={{ color: "#ff6b6b", margin: 0 }}>{error}</p>}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", fontSize: "18px", padding: "15px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;