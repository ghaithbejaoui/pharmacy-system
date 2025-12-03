
import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/sidebar.css";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [lockedState, setLockedState] = useState('none'); // 'none', 'small', 'big'
  const [hoverTimer, setHoverTimer] = useState(null);

  useEffect(() => {
    document.body.classList.remove('sidebar-locked', 'sidebar-locked-small');
    if (lockedState === 'big') {
      document.body.classList.add('sidebar-locked');
    } else if (lockedState === 'small') {
      document.body.classList.add('sidebar-locked-small');
    }
  }, [lockedState]);

  const handleMouseEnter = () => {
    if (lockedState === 'none') {
      const timer = setTimeout(() => {
        document.body.classList.add('sidebar-expanded');
      }, 500); // 500ms delay
      setHoverTimer(timer);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    if (lockedState === 'none') {
      document.body.classList.remove('sidebar-expanded');
    }
  };

  const toggleLock = () => {
    if (lockedState === 'none') {
      const isCurrentlyExpanded = document.body.classList.contains('sidebar-expanded');
      setLockedState(isCurrentlyExpanded ? 'big' : 'small');
    } else {
      setLockedState('none');
    }
  };

  const menu = [
    { label: "Dashboard", icon: "📊", path: "/" },
    { label: "Medicines", icon: "💊", path: "/medicines" },
    ...(user?.role === "admin" ? [{ label: "Add Medicine", icon: "➕", path: "/add" }] : []),
    { label: "Add Sale", icon: "🛒", path: "/add-sale" },
    { label: "Sales", icon: "📈", path: "/sales" },
    ...(user?.role === "admin" ? [{ label: "Users", icon: "👥", path: "/users" }] : []),
  ];

  return (
    <aside className="sidebar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="sidebar-header">
        <h2>PharmaSys</h2>
      </div>

      <nav className="sidebar-nav">
        {menu.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <button onClick={toggleLock} className="sidebar-lock-btn-bottom">
        {lockedState !== 'none' ? '🔒' : '🔓'}
      </button>
    </aside>
  );
};

export default Sidebar;