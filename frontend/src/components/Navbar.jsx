import React from "react";
import "../styles/navbar.css";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Dashboard</h1>
      <div className="navbar-right">
        <button className="btn-notification"><FaBell /></button>
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
