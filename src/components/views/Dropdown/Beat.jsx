import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BeatDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("Beat");

  const handleBeatFilter = (eventKey) => {
    setSelectedOption(eventKey);
    // Do something with the selected value
    console.log("Selected:", eventKey);
  };

  return (
    <Dropdown onSelect={handleBeatFilter} className="dropdown-listing">
      <Dropdown.Toggle
        variant="light"
        className="custom-dropdown-toggle"
        id="dropdown-basic"
      >
        {/* ✅ You can replace Icon with <img src="..." /> if using a custom image */}
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu className="menulisting">
        <Dropdown.Item eventKey="Pandharwani">Pandharwani</Dropdown.Item>
        <Dropdown.Item eventKey="Chorgaon">Chorgaon</Dropdown.Item>
        <Dropdown.Item eventKey="Chorgaon">Chorgaon</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default BeatDropdown;
