import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SeedCollector = () => {
  const [selectedOption, setSelectedOption] = useState("Collector Name");

  const handleNameFilter = (eventKey) => {
    setSelectedOption(eventKey);
    // Do something with the selected value
    console.log("Selected:", eventKey);
  };

  return (
    <Dropdown onSelect={handleNameFilter} className="dropdown-listing">
      <Dropdown.Toggle
        variant="light"
        className="custom-dropdown-toggle"
        id="dropdown-basic"
      >
        {/* ✅ You can replace Icon with <img src="..." /> if using a custom image */}
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu className="menulisting">
        <Dropdown.Item eventKey="Ramesh Patil">Ramesh Patil</Dropdown.Item>
        <Dropdown.Item eventKey="Sandip Madhavi">Sandip Madhavi</Dropdown.Item>
        <Dropdown.Item eventKey="Amit Dongre">Amit Dongre</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SeedCollector;
