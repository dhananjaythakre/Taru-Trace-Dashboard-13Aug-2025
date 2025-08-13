import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TreeName = () => {
  const [selectedOption, setSelectedOption] = useState("Tree Name");

  const handleTreeFilter = (eventKey) => {
    setSelectedOption(eventKey);
    // Do something with the selected value
    console.log("Selected:", eventKey);
  };

  return (
    <Dropdown onSelect={handleTreeFilter} className="dropdown-listing">
      <Dropdown.Toggle
        variant="light"
        className="custom-dropdown-toggle"
        id="dropdown-basic"
      >
        {/* ✅ You can replace Icon with <img src="..." /> if using a custom image */}
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu className="menulisting">
        <Dropdown.Item eventKey="Bokhada, Kirmira">Bokhada, Kirmira</Dropdown.Item>
        <Dropdown.Item eventKey="Badhjari , Bothi , Vari">Badhjari , Bothi , Vari</Dropdown.Item>
        <Dropdown.Item eventKey="Neem">Neem</Dropdown.Item>
        <Dropdown.Item eventKey="Banyan">Banyan</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TreeName;

