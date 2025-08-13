import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Icon } from '@iconify/react';
import mainlogo from "../../assets/img/taru_trace_logo.png";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import addUser from "../../api/AddUser";
import closeEye from "../../assets/img/closeEye.png";
import openEye from "../../assets/img/openEye.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminNavbar({ brandText }) {
 const navigate = useNavigate();

  const [showAddUser, setAddUser] = useState(false);
  const [formData, setFormData] = useState({
    Username: "",
    MobileNumber: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message when user starts typing
    setResetError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setResetError("");
  setResetSuccess("");

  for (const key in formData) {
    if (!formData[key]) {
      setResetError("Please fill all the fields.");
      return;
    }
  }

  try {
    // The addUser function handles the API call and throws an error if !res.ok
    const data = await addUser({
      UserName: formData.Username,
      MobileNumber: formData.MobileNumber,
      Password: formData.Password,
    });

    // If the addUser function doesn't throw an error, we assume success.
    // The API response you provided has an 'Id', which is a good indicator of success.
    if (data && data.Id) {
      toast.success("User created successfully.");
      setResetSuccess("User created successfully.");
      setFormData({
        Username: "",
        MobileNumber: "",
        Password: "",
      });
      setTimeout(() => {
        setAddUser(false);
        setResetSuccess("");
      }, 2000);
    } else {
      // This is a fallback for an unexpected response format
      setResetError("Failed to create user. Unexpected response.");
    }
  } catch (err) {
    toast.error("Error occurred while creating user.");
    setResetError("API error occurred: " + err.message);
  }
};

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const handleLogout = (e) => {
    // Logout logic here
    console.log("User logged out");
    navigate('/login');
  };

  return (
    <>
    <Navbar
      expand="lg"
      // style={{
      //   backgroundColor: "#f8f9fa", // Light grey background
      //   borderBottom: "1px solid #e7e7e7", // Optional: subtle border bottom
      //   boxShadow: "0 2px 4px rgba(0,0,0,.04)", // Optional: subtle shadow
      //   width: "100%", // Ensures it stretches full width
      //   padding: "0.5rem 1rem", // Standard padding
      // }}
    >
      <Container fluid>
       
        <div className="d-flex w-100 justify-content-between align-items-center px-4">
          {/* Left section: Mobile Toggle (if needed) and Brand */}
          <div className="d-flex align-items-center">
            {/* <Button
              variant="dark"
              className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
              onClick={mobileSidebarToggle}
              style={{ marginRight: "10px" }}
            >
              <i className="fas fa-ellipsis-v"></i>
            </Button> */}
            <Navbar.Brand
              href="#" // You can put your dashboard link here if brand is clickable
             
            >
            <img
              src={mainlogo}
              alt="Logo"
              style={{ maxHeight: "50px", width: "auto" }}
            />
              {/* {brandText || "Admin Panel"} */}
            </Navbar.Brand>
          </div>

          <div className="d-flex align-items-center">
            {/* Navbar Toggle for small screens (appears before collapse) */}
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none ml-2">
              <span className="navbar-toggler-bar burger-lines"></span>
              <span className="navbar-toggler-bar burger-lines"></span>
              <span className="navbar-toggler-bar burger-lines"></span>
            </Navbar.Toggle> */}

            {/* Navbar Collapse content - this will handle items when expanded or on large screens */}
            <Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
              {/* Nav items pushed to the right using ml-auto within the collapse */}
              <Nav className="ml-auto">
                 <Nav.Item>
                    <Button className="userlist-button"
                      variant="link"
                      onClick={() => navigate("/UserList")}>
                      <i className="fas fa-sign-out-alt" style={{ marginRight: "5px" }}></i>
                      User List
                    </Button>
                  </Nav.Item>
                 <Nav.Item>
                    <Button className="new-user-button"
                      variant="link"
                      onClick={() => setAddUser(true)}                    >
                      <i className="fas fa-sign-out-alt" style={{ marginRight: "5px" }}></i>
                      Add User
                    </Button>
                  </Nav.Item>
                <Nav.Item>
                  {/* <Button className="new-user-button"
                    variant="link"
                  >                    
                    Add New User
                  </Button>                   */}


                  <Button
                    variant="link"
                    onClick={handleLogout}
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      fontWeight: "500",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    <i className="fas fa-sign-out-alt" style={{ marginRight: "5px" }}></i>
                    Logout <Icon icon="streamline-sharp:logout-2-remix" width="14" height="14" />
                  </Button>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Container>
    </Navbar>

     <Modal show={showAddUser} onHide={() => setAddUser(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={formData.Username}
                onChange={handleInputChange}
                className="bg-light"
                placeholder="Enter Username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                name="MobileNumber"
                value={formData.MobileNumber}
                onChange={handleInputChange}
                className="bg-light"
                placeholder="Enter Mobile Number"
              />
            </Form.Group>
            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
              <img
                src={showPassword ? openEye : closeEye}
                alt={showPassword ? "Hide password" : "Show password"}
                className="visibility-icon"
                onClick={togglePasswordVisibility}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    togglePasswordVisibility();
                  }
                }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "38px",
                  cursor: "pointer",
                  height: "20px",
                  zIndex: "2",
                }}
              />
            </Form.Group>
            {resetError && (
              <div className="alert alert-danger py-2 text-center">
                {resetError}
              </div>
            )}
            {resetSuccess && (
              <div className="alert alert-success py-2 text-center">
                {resetSuccess}
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setAddUser(false)}
            className="px-4"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            
            className="px-4 greenbg"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      </>
  );
}

export default AdminNavbar;