import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaPills, FaPlus } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>PharmaSys</h2>
      </div>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/"><FaTachometerAlt /> Dashboard</Link>
        </li>
        <li className={location.pathname === "/medicines" ? "active" : ""}>
          <Link to="/medicines"><FaPills /> Medicines</Link>
        </li>
        <li className={location.pathname === "/add" ? "active" : ""}>
          <Link to="/add"><FaPlus /> Add Medicine</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
