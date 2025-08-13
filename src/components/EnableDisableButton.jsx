import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminMenu() {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true); // Initially disabled

  return (
    <div>
      {/* Enable/Disable Toggle */}
      <Button
        variant={isDisabled ? "success" : "warning"} // Toggle button color change
        style={{ width: "150px", fontSize:"14px" }}
        onClick={() => setIsDisabled(!isDisabled)}
      >
        {isDisabled ? "Enable User List" : "Disable User List"}
      </Button>
    </div>
  );
}
