import React, { useEffect, useState, useRef } from "react";
// react-bootstrap components
import {
  Card,
  Container,
  Table, // Import Table from react-bootstrap
} from "react-bootstrap";
import { ViewSeedReport } from "../../api/ReportView";
import $ from "jquery";
import "datatables.net-dt"; // JS part
import "datatables.net-dt/css/dataTables.dataTables.min.css";
// Remove responsive-dt CSS and JS if you want to disable responsiveness for horizontal scroll
// import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
// import "datatables.net-responsive-dt";

function Dashboard() {
  const [apiRes, setApiRes] = useState([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await ViewSeedReport();
        if (!data) {
          console.log("API data not available, using dummy data.");
          setApiRes([]);
        } else {
          setApiRes(data);
        }
      } catch (err) {
        console.error("API error occurred: " + err.message);
        setApiRes([]);
      } finally {
        setLoading(false); // Set loading to false after fetching (success or error)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // This effect runs whenever apiRes changes AND when loading is false
    if (!loading && apiRes.length > 0) {
      // Destroy existing DataTable instance if it exists
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }

      // Initialize DataTable
      // Using a timeout to ensure the DOM is fully updated with new data before DataTable initializes
      setTimeout(() => {
        if (tableRef.current) {
          dataTableRef.current = $(tableRef.current).DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            responsive: false, // Explicitly disable DataTables responsiveness
            scrollX: true,      // <--- ADD THIS to enable DataTables' own horizontal scrolling
          });
        }
      }, 0);
    } else if (!loading && apiRes.length === 0 && dataTableRef.current) {
      // If no data and DataTable was initialized, destroy it
      dataTableRef.current.destroy();
      dataTableRef.current = null;
    }

    // Cleanup function to destroy DataTable when the component unmounts
    return () => {
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
        dataTableRef.current = null;
      }
    };
  }, [apiRes, loading]); // Rerun this effect when apiRes or loading changes

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Seed Collection Report</Card.Title>
          </Card.Header>
          <Card.Body>
            {/* Removed the date input fields as they are not used for filtering */}
            {/* The previous code snippet included date inputs which were not hooked up to an API */}
            {/* <div className="row card-body gap-5 mb-5 justify-content-center">
              <div className="form-group d-flex col-md-4 col-sm-6 gap-2 align-items-center">
                <label className="mb-0">From Date:</label>
                <input
                  type="date"
                  id="fromDate"
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex col-md-4 col-sm-6 gap-2 align-items-center">
                <label className="mb-0">To Date:</label>
                <input
                  type="date"
                  id="toDate"
                  className="form-control"
                  value={toDate.split('T')[0]} // 'toDate' was undefined
                />
              </div>
            </div> */}

            {loading ? (
              <div className="text-center my-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-2">Loading data, please wait...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table
                  className="table table-bordered table-hover"
                  ref={tableRef}
                >
                  <thead className="thead-light">
                    <tr>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Sr No.
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Collector Name
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Collection Date & Time
                      </th> {/* Updated header text */}
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Photo
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        GPS Coordinates
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Tree Name
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Scientific Name
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Girth (m)
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Range
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Round
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>Beat</th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Compartment No
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        No of Seeds
                      </th>
                      <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Collection Method
                      </th>
                      {/* Removed Photo File Name header as it's redundant with the 'Photo' column */}
                      {/* <th style={{ color: "black", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Photo File Name
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {apiRes.length > 0 ? (
                      apiRes.map((item, index) => {
                        let formattedTime = 'N/A';
                        let formattedDate = 'N/A';
                        if (item.CollectionDate) {
                          try {
                            const dateObj = new Date(item.CollectionDate);
                            // Check if dateObj is a valid date
                            if (!isNaN(dateObj.getTime())) {
                              // Format time (e.g., HH:MM:SS AM/PM)
                              formattedTime = dateObj.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true, // Use 12-hour format with AM/PM
                              });
                              // Format date (e.g., DD/MM/YYYY)
                              formattedDate = dateObj.toLocaleDateString('en-GB', { // en-GB for DD/MM/YYYY
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              });
                            }
                          } catch (error) {
                            console.error("Error parsing date:", item.CollectionDate, error);
                          }
                        }

                        return (
                          <tr key={item.Id || index}>
                            <td>{item.Id}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.CollectorName}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {/* Display time on top, date below */}
                              <div>{formattedTime}</div>
                              <div>{formattedDate}</div>
                            </td>
                            <td>
                              {item.ImagePath ? (
                                <img
                                  src={`http://weighbridge.itcraftindia.com:904/${item.ImagePath}`}
                                  alt={`Photo of ${item.TreeName || 'seed collection'}`}
                                  style={{ width: "150px", height: "auto", display: "block", margin: "0 auto" }}
                                />
                              ) : (
                                <span style={{ whiteSpace: "nowrap" }}>No Photo</span>
                              )}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.GPSCoordinates}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.TreeName}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.ScientificName}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.Girth_m}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.Range}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.Round}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.Beat}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.Compartment_No}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.No_of_Seeds}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{item.Collection_Method}</td>
                            {/* Removed Photo File Name data cell as it's redundant */}
                            {/* <td style={{ whiteSpace: "nowrap" }}>{item.Photo_File_Name}</td> */}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="14" className="text-center"> {/* Adjusted colspan */}
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Dashboard;