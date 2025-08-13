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
import EDButton from "../EnableDisableButton";

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

  return (
    <Container fluid className="dashboard-container">
      <Card
        className="border-0"
        style={{ borderRadius: "15px", background: "rgba(255, 255, 255, 0.5)" }}
      >
        <Card.Body>
          <Row className="mb-3 gy-2 align-items-center">
            {/* Left column: Title */}
            <Col xs={12} md={4} className="fw-bold report-title">
              Seed Collection Report
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
                      <th>User Name</th>
                      <th>Password</th>                      
                      <th>Enable/Disable</th>
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
                            <td>{item.CollectorName}</td>
                            <td>Password</td>
                            <td><EDButton/></td>
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
      <div className="copyright text-end">Powered by, ITCRAFT Technologies Pvt. Ltd.</div>
    </Container>
  );
}
export default Dashboard;
