import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ScientificName = () => {
  const [selectedOption, setSelectedOption] = useState("Scientific Name");

  const handleSciennameFilter = (eventKey) => {
    setSelectedOption(eventKey);
    // Do something with the selected value
    console.log("Selected:", eventKey);
  };

  return (
    <Dropdown onSelect={handleSciennameFilter} className="dropdown-listing">
      <Dropdown.Toggle
        variant="light"
        className="custom-dropdown-toggle"
        id="dropdown-basic"
      >
        {/* ✅ You can replace Icon with <img src="..." /> if using a custom image */}
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu className="menulisting">
        <Dropdown.Item eventKey="Tectona Grandis">Tectona Grandis</Dropdown.Item>
        <Dropdown.Item eventKey="Azadirachta indica">Azadirachta indica</Dropdown.Item>
        <Dropdown.Item eventKey="Eriolaena">Eriolaena</Dropdown.Item>
        <Dropdown.Item eventKey="Schrebera">Schrebera</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ScientificName;

