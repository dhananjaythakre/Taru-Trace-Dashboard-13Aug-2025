// AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // Use Outlet for nested routes

// Import your components
import AdminNavbar from "../Navbars/Navbar";
import Sidebar from "../Sidebars/Sidebar";

// Assuming you still want to pass these props to Sidebar, even if image is now handled internally
import sidebarImage from "../../assets/img/image.png"; // Your sidebar background image
import Userlists from "../views/Userlists";

function UserLayout() {
  const [color] = React.useState("black");
  const [hasImage] = React.useState(true); // Assuming you want to always have an image
  const [image] = React.useState(sidebarImage); // Set the default image here

  // You might want to pass brandText to AdminNavbar for the title
  // const location = useLocation(); // Not directly used here, but good practice if needed for brandText
  const getBrandText = () => {
    // This logic should be here or passed as a prop from App.jsx if you have a centralized routes definition
    // For now, let's keep a simple placeholder or derive from location in AdminNavbar
    return "Seed Collection Report"; // Or derive from current path: location.pathname.split('/').pop().replace(/-/g, ' ').toUpperCase();
  };


  return (
    <>
      <div className="login-wrapper">
        {/* Pass props to Sidebar if it needs them for styling/behavior */}
        {/* <Sidebar image={hasImage ? image : null} /> */}

        {/* THIS IS THE KEY PART FOR THE LAYOUT */}
        <div
          className="main-panel"
          
        >
          {/* AdminNavbar will sit at the top of the main panel */}
          <AdminNavbar brandText={getBrandText()} /> {/* Pass brandText here */}

          {/* This is where your actual page content (Dashboard, etc.) will render */}
          <div className="content" style={{ padding: "10px" }}>
            <Userlists /> {/* This renders your nested routes like Dashboard */}          
 
          </div>
          {/* Optional: Add a Footer component here if you have one */}
        </div>
      </div>
    </>
  );
}

export default UserLayout;