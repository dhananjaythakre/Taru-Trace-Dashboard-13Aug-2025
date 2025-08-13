import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RangeDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("Range");

  const handleRangeFilter = (eventKey) => {
    setSelectedOption(eventKey);
    // Do something with the selected value
    console.log("Selected:", eventKey);
  };

  return (
    <Dropdown onSelect={handleRangeFilter} className="dropdown-listing">
      <Dropdown.Toggle
        variant="light"
        className="custom-dropdown-toggle"
        id="dropdown-basic"
      >
        {/* ✅ You can replace Icon with <img src="..." /> if using a custom image */}
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu className="menulisting">
        <Dropdown.Item eventKey="Karwa">Karwa</Dropdown.Item>
        <Dropdown.Item eventKey="Chandrapur">Chandrapur</Dropdown.Item>
        <Dropdown.Item eventKey="North">North</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RangeDropdown;
