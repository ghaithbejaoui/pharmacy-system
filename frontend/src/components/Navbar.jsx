
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout, toggleTheme, isDark } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>PharmaSys</h1>

      <div className="navbar-right">
        <button onClick={toggleTheme} className="theme-btn">
          {isDark ? "☀️" : "🌙"}
        </button>

        <div className="user-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div>
            <div className="user-details">
              <div className="user-name">{user?.nickname || user?.name || "User"}</div>
              <div className="user-role">{user?.role}</div>
            </div>
            <div className="user-avatar">
              {user?.nickname?.[0] || user?.name?.[0] || "👤"}
            </div>
          </div>

          <div className="dropdown" style={{ opacity: dropdownOpen ? 1 : 0, visibility: dropdownOpen ? 'visible' : 'hidden' }}>
            <Link to="/profile" className="dropdown-btn" style={{ display: 'block', textDecoration: 'none' }}>
              👤 Profile
            </Link>
            <button onClick={logout} className="dropdown-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;