import React from "react";
import { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

const conn = "http://localhost:3000/";

const SalesReport = () => {

    console.log("Here we go lads");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dates, setDates] = useState({start:-2, end:-2});
    const [salesReport, setSalesReport] = useState([]);

    console.log("Set the shit");

    let navigate = useNavigate()
  
    const handleUpdate = (page) => {
      if (page === "Manager") { 
        navigate(`/${page}`);
      } else {
        navigate(`/Manager/${page}`);
      }
    };

    const retrieveReport = async () => {
      try {
        setSalesReport([]);

        const start = (dates.start);
        const end = (dates.end);

        console.log("start date", start);
        console.log("end date", end);

        const response = await fetch (conn + `api/sales/getSalesReport/${start}/${end}`,
        {
          method: "GET", headers: { "Content-Type": "application/json" },
        });

        const retrieveReq = await response.json();
        console.log(retrieveReq);

        setSalesReport(retrieveReq);
        
        console.log("Sales Report", salesReport);

      } catch (err) {
        console.error(err.message);
      }
    };

    const setDateSubmit = event => {
      setSalesReport([]);

      // const startDate = event.target.startDate.value;
      // const endDate = event.target.endDate.value;

      setDates({start: startDate, end: endDate});

      console.log("start date", startDate);
      console.log("end date", endDate);
    };

    useEffect(() => {
      // TODO: add error handling so must be in format YYYY-DD-MM
      retrieveReport();
    }, [dates]);

    console.log("Right before the return");

    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <button onClick={() => handleUpdate("Manager")} type="button" className="btn btn-outline-secondary"><ArrowReturnLeft color="white"/></button>
            <Navbar.Brand>&nbsp;&nbsp; Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => handleUpdate("Inventory")}>Inventory</Nav.Link>
                <Nav.Link onClick={() => handleUpdate("MenuEditor")}>Store Menu</Nav.Link>
                <NavDropdown style={{color: "red"}} title="Order Trends" id="basic-nav-dropdown">
                  <NavDropdown.Item style={{color: "red"}} href="/Manager/Reports/Sales">Sales Report</NavDropdown.Item>
                  <NavDropdown.Item href="/Manager/Reports/Excess">Excess Report</NavDropdown.Item>
                  <NavDropdown.Item href="/Manager/Reports/Restock">Restock Report</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Menu Item</th>
              <th>Amount Sold</th>
            </tr>
          </thead>
          <tbody>
            {salesReport.map((i) => {
              return (
                <tr>
                  <td>{i.name}</td>
                  <td>{i.sold}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }

  export default SalesReport;