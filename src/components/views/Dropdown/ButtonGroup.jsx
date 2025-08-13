import { Dropdown, ButtonGroup } from "react-bootstrap";
import { Icon } from "@iconify/react";

<Dropdown as={ButtonGroup} className="w-100">
  <Dropdown.Toggle className="lightgreenbg w-100" id="dropdown-export">
    Export <Icon icon="fe:export" width="18" height="18" />
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={handleExportExcel}>Excel</Dropdown.Item>
    <Dropdown.Item onClick={handleExportPDF}>PDF</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
