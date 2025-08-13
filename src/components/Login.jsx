import React, { useState } from "react";
import "./Login.css";
import loginFunction from "../api/Login";
import fernImage from "../assets/img/login.png";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import logo1 from "../assets/img/logo-first.png";
import logo2 from "../assets/img/logo-second.png";
import mainlogo from "../assets/img/taru_trace_logo.png";

const Login = () => {
  const [UserName, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await loginFunction({
        UserName: UserName.trim(),
        Password: Password.trim(),
      });

      if (response.success === true) {
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/Layout"), 1500);
      } else {
        setMessage("❌ Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("⚠️ Login failed. Server error.");
    }

    setIsSubmitting(false);
  };

  return (
    // The login-wrapper now serves as the full-screen container with the background image
    <Container fluid className="login-wrapper">
      <Row>
        <Col xs={12} className="justify-content-start py-4 px-4">
          <img
            src={logo1}
            alt="Tatr"
            style={{ height: "60px", width: "auto", paddingRight:"12px" }}
          />
          <img
            src={logo2}
            alt="Raah"
            style={{ height: "60px", width: "auto" }}
          />
        </Col>
        <Col xs={12} className="pb-5">
          <Row className="justify-content-center align-items-center text-center">
            <Col xs={12} className="justify-content-center align-items-center">
              <div className="welcome-txt">Welcome to</div>
            </Col>
            <Col xs={12} className="justify-content-center align-items-center">
              <img
                src={mainlogo}
                alt="Logo"
                style={{ maxHeight: "80px", width: "auto" }}
              />
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          className="d-flex justify-content-center align-items-center"
          // Ensures full viewport height
        >
          <div className="form-container">
            <div className="form-box">

              <form onSubmit={handleLogin}>
                <span className="fieldnm">User Name</span>
                <input
                  type="text"
                  id="UserName"
                  // placeholder="UserName"
                  value={UserName}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <span className="fieldnm">Password</span>
                <input
                  type="password"
                  id="Password"
                  // placeholder="Mobile Number"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </form>

              {message && <p className="login-message">{message}</p>}
            </div>
          </div>
        </Col>
        <Col xs={12} className="justify-content-center align-items-center text-center pt-3 text-white copyright">
         Powered by, ITCRAFT Technologies Pvt. Ltd.
        </Col>        
      </Row>
    </Container>
  );
};
export default Login;
