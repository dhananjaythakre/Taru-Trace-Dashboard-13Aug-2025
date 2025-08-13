import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const GpsDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("GPS Coordinate");

  const handleGpsFilter = (eventKey) => {
    setSelectedOption(eventKey);
    // Do something with the selected value
    console.log("Selected:", eventKey);
  };

  return (
    <Dropdown onSelect={handleGpsFilter} className="dropdown-listing">
      <Dropdown.Toggle
        variant="light"
        className="custom-dropdown-toggle"
        id="dropdown-basic"
      >
        {/* ✅ You can replace Icon with <img src="..." /> if using a custom image */}
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu className="menulisting">
        <Dropdown.Item eventKey="Rubber Tree">Rubber Tree</Dropdown.Item>
        <Dropdown.Item eventKey="Bamboo Tree">Bamboo Tree</Dropdown.Item>
        <Dropdown.Item eventKey="Neem Tree">Neem Tree</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GpsDropdown;
