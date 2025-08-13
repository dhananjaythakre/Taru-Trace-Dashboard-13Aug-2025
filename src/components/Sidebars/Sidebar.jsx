import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

// Import your background image
import sidebarBgImage from "../../assets/img/sidebar.png"; // Adjust the path if necessary

function Sidebar({ image, color }) {
  const location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname.startsWith(routeName) ? "active" : "";
  };

  return (
<div
  className="sidebar"
  style={{
    backgroundColor: color || "black",
    backgroundImage: `url(${sidebarBgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center", // better for vertical image alignment
    width: "250px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1030,
    color: "white",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",  // ensures vertical stacking
    justifyContent: "flex-start",  // align content from top
    
  }}
>

      {/* Optional: Add an overlay for better text readability if the image is too bright */}
      <div
        className="sidebar-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
        }}
      />
      <div className="sidebar-wrapper" style={{ position: "relative", zIndex: 1 }}>
        {/* Logo and Title Section */}
        <div
          className="logo d-flex align-items-center justify-content-start"
          style={{ padding: "0 15px 20px 15px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}
        >
          <a
            href="/admin/dashboard"
            className="simple-text logo-mini mx-1"
            onClick={() => {}}
          >
            <div className="logo-img">
            </div>
          </a>
          <a
            className="simple-text"
            href="/admin/dashboard"
            onClick={() => {}}
            style={{ color: "white", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }}
          >
            Dashboard
          </a>
          
        </div>
        <a
            className="simple-text"
            href="/AddUser"
            onClick={() => {}}
            style={{ color: "white", textDecoration: "none", fontSize: "20px", fontWeight: "bold" , paddingLeft:"15px"}}
          >
            Add User
          </a>

      </div>
    </div>
  );
}

export default Sidebar;