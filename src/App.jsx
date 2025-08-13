import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/layouts/AdminLayout";
import Login from "./components/Login";
import Dashboard from "./components/views/Dashboard"; // Dashboard.jsx is in src/components/views/
import UserLayout from "./components/userlist/UserList";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/Layout" element={<AdminLayout />} />
         <Route path="/UserList" element={<UserLayout />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
