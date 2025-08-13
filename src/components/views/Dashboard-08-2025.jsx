import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Pagination,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { ViewSeedReport } from "../../api/ReportView";
import filterReportFunction from "../../api/FilterDate";
import "./Dashboard.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import GpsDropdown from "./Dropdown/GpsDropdown";
import SeedCollector from "./Dropdown/SeedCollector";
import TreeName from "./Dropdown/TreeName";
import ScientificName from "./Dropdown/ScientificName";

// This is a necessary import to ensure the autoTable plugin is registered.
// The original code already has this, but sometimes it doesn't work as a side effect.
// For this reason, we will ensure jspdf is correctly extended.

function Dashboard() {
  const [apiRes, setApiRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFromDateChange = (e) => setFromDate(e.target.value);
  const handleToDateChange = (e) => setToDate(e.target.value);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const data = await ViewSeedReport();
      setApiRes(data || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("API error occurred:", err.message);
      setApiRes([]);
    } finally {
      setLoading(false);
    }
  };

  const filterDataByDate = async () => {
    setLoading(true);
    try {
      const fromDateString = fromDate ? `${fromDate}T00:00:00.000Z` : "";
      const toDateString = toDate ? `${toDate}T23:59:59.999Z` : "";
      const filteredData = await filterReportFunction({
        FromDate: fromDateString,
        ToDate: toDateString,
      });
      setApiRes(filteredData || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Filter error:", err.message);
      setApiRes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiRes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(apiRes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(apiRes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SeedReport");
    XLSX.writeFile(wb, "SeedReport.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF("landscape");
    const tableColumn = [
      "Sr No.",
      "Collector Name",
      "Date & Time",
      "Photo",
      "GPS Coordinates",
      "Tree Name",
      "Scientific Name",
      "Girth (m)",
      "Range",
      "Round",
      "Beat",
      "Compartment No",
      "No of Seeds",
      "Method",
    ];

    // Create a promise for each image to ensure they all load
    const imagePromises = apiRes.map((item) => {
      if (item.ImagePath) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "Anonymous"; // Important for CORS
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error(`Failed to load image at: ${item.ImagePath}`);
            resolve(null); // Resolve with null on error to not block the others
          };
          img.src = `http://weighbridge.itcraftindia.com:904/${item.ImagePath}`;
        });
      }
      return Promise.resolve(null);
    });

    // Wait for all images to load
    Promise.all(imagePromises)
      .then((loadedImages) => {
        const tableRows = apiRes.map((item, index) => {
          const dateObj = new Date(item.CollectionDate || "");
          const formattedTime = isNaN(dateObj)
            ? "N/A"
            : dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              });
          const formattedDate = isNaN(dateObj)
            ? "N/A"
            : dateObj.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

          // This is a placeholder for the image content
          let photoContent = "No Photo";
          if (loadedImages[index]) {
            photoContent = loadedImages[index];
          }

          return [
            item.Id,
            `${formattedTime}\n${formattedDate}`,
            item.CollectorName,
            photoContent,
            item.GPSCoordinates,
            item.TreeName,
            item.ScientificName,
            item.Girth_m,
            item.Range,
            item.Round,
            item.Beat,
            item.Compartment_No,
            item.No_of_Seeds,
            item.Collection_Method,
          ];
        });

        doc.text("Seed Collection Report", 14, 15);

        // Generate the table with the loaded images
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 20,
          didDrawCell: (data) => {
            // Draw the image if it's the photo column
            if (
              data.column.index === 3 &&
              data.cell.section === "body" &&
              data.cell.raw instanceof HTMLImageElement
            ) {
              const img = data.cell.raw;
              const dim = Math.min(data.cell.height, data.cell.width) - 2;
              const textPos = data.cell.textPos;
              doc.addImage(img, "JPEG", textPos.x, textPos.y, dim, dim);
            }
          },
        });

        doc.save(`SeedReport_${new Date().toISOString().slice(0, 10)}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <Container fluid className="dashboard-container">
      <Card
        className="border-0"
        style={{ borderRadius: "15px", background: "rgba(255, 255, 255, 0.5)" }}
      >
        <Card.Body>
          <Row className="mb-3 gy-2">
            {/* Title */}
            <Col
              xs={12}
              md={3}
              className="d-flex align-items-center report-title"
            >
              Seed Collection Report
            </Col>

            {/* From Date */}
            <Col
              xs={12}
              sm={6}
              md={2}
              className="d-flex align-items-center gap-2"
            >
              <label htmlFor="fromDate" className="mb-0">
                From
              </label>
              <Form.Control
                type="date"
                id="fromDate"
                className="no-default-icon"
                value={fromDate}
                onChange={handleFromDateChange}
              />
            </Col>

            {/* To Date */}
            <Col
              xs={12}
              sm={6}
              md={2}
              className="d-flex align-items-center gap-2"
            >
              <label htmlFor="toDate" className="mb-0">
                To
              </label>
              <Form.Control
                type="date"
                id="toDate"
                className="no-default-icon"
                value={toDate}
                onChange={handleToDateChange}
              />
            </Col>

            {/* Search Button */}
            <Col xs={12} sm={6} md={2} className="d-flex align-items-center">
              <Button className="greenbg w-100" onClick={filterDataByDate}>
                Search Report{" "}
                <Icon icon="codex:search" width="20" height="20" />
              </Button>
            </Col>

            {/* Export Buttons */}
            <Col
              xs={12}
              sm={6}
              md={3}
              className="d-flex align-items-center gap-2"
            >
              <Button
                className="lightgreenbg w-100"
                onClick={handleExportExcel}
              >
                Excel <Icon icon="fe:export" width="18" height="18" />
              </Button>
              <Button className="lightgreenbg w-100" onClick={handleExportPDF}>
                PDF <Icon icon="fe:export" width="18" height="18" />
              </Button>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading data, please wait...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table bordered hover>
                  <thead className="thead-light">
                    <tr>
                      <th>Sr No.</th>
                      <th>Date & Time</th>
                      <th>
                        <SeedCollector />
                      </th>

                      <th>Photo</th>
                      <th>
                        <GpsDropdown />
                      </th>
                      <th>
                        <TreeName />
                      </th>
                      <th>
                        <ScientificName />
                      </th>
                      <th>Girth (in meters)</th>
                      <th>Range</th>
                      <th>Round</th>
                      <th>Beat</th>
                      <th>Compartment No</th>
                      <th>No of Seeds</th>
                      <th>Method</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item) => {
                        const dateObj = new Date(item.CollectionDate || "");
                        const formattedTime = isNaN(dateObj)
                          ? "N/A"
                          : dateObj.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            });
                        const formattedDate = isNaN(dateObj)
                          ? "N/A"
                          : dateObj.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            });
                        return (
                          <tr key={item.Id}>
                            <td>{item.Id}</td>
                            <td>
                              <div>{formattedTime}</div>
                              <div>{formattedDate}</div>
                            </td>
                            <td>{item.CollectorName}</td>

                            <td>
                              {item.ImagePath ? (
                                <img
                                  src={`http://weighbridge.itcraftindia.com:904/${item.ImagePath}`}
                                  alt="seed"
                                  style={{ width: "150px", height: "auto" }}
                                  loading="lazy"
                                />
                              ) : (
                                "No Photo"
                              )}
                            </td>
                            <td>{item.GPSCoordinates}</td>
                            <td>{item.TreeName}</td>
                            <td>{item.ScientificName}</td>
                            <td>{item.Girth_m}</td>
                            <td>{item.Range}</td>
                            <td>{item.Round}</td>
                            <td>{item.Beat}</td>
                            <td>{item.Compartment_No}</td>
                            <td>{item.No_of_Seeds}</td>
                            <td>{item.Collection_Method}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="14" className="text-center">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <Pagination className="justify-content-center">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Dashboard;
