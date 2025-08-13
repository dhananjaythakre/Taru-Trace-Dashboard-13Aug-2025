import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CompartmentDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("Compartment No");

  const handleCompartmentFilter = (eventKey) => {
    setSelectedOption(eventKey);
    // Do something with the selected value
    console.log("Selected:", eventKey);
  };

  return (
    <Dropdown onSelect={handleCompartmentFilter} className="dropdown-listing">
      <Dropdown.Toggle
        variant="light"
        className="custom-dropdown-toggle"
        id="dropdown-basic"
      >
        {/* ✅ You can replace Icon with <img src="..." /> if using a custom image */}
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu className="menulisting">
        <Dropdown.Item eventKey="331">331</Dropdown.Item>
        <Dropdown.Item eventKey="556">556</Dropdown.Item>
        <Dropdown.Item eventKey="15">North</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CompartmentDropdown;
