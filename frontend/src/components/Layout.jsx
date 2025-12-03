
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

const Layout = () => {
  const { user, toast } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Navbar & Sidebar */}
      <Navbar />
      <Sidebar />

      {/* MAIN CONTENT  */}
      <div className="main-content">
        <Outlet />
      </div>

      {toast && <div className={`toast ${toast.includes('Failed') || toast.includes('failed') ? 'error' : 'success'}`}>{toast}</div>}
    </div>
  );
};

export default Layout;