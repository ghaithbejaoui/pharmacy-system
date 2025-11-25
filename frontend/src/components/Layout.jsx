import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/dashboard.css";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="main-content">
          <Outlet /> {/* Child route content will render here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
