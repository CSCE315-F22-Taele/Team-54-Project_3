/**
 * This file implements functionality to generate and display the Excess Report for the Manager user. When the Manager inputs a time
 * range, the component makes an API call to calculate excess inventory during that time period.
 * @author Mohona Ghosh
 * @author Neha Sujith
 */
import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

/**
 * Constructs an ExcessReport component that generates a report of excess inventory during a given time period.
 * @returns an excessReport component
 */
const ExcessReport = () => {
    let navigate = useNavigate()
  
    /**
     * Navigates to the user's desired page within the Manager user. If the Manager tries to access either the Inventory or Store Menu 
     * page, the function makes an API call to fetch the requisite data from the database so it displays correctly upon navigation.
     * @param {String} page the page to navigate to
     */
    const handleUpdate = (page) => {
      if (page === "Manager") {
        navigate(`/${page}`);
      } else {
        navigate(`/Manager/${page}`);
      }
    };

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
                  <NavDropdown.Item href="/Manager/Reports/Sales">Sales Report</NavDropdown.Item>
                  <NavDropdown.Item style={{color: "red"}} href="/Manager/Reports/Excess">Excess Report</NavDropdown.Item>
                  <NavDropdown.Item href="/Manager/Reports/Restock">Restock Report</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Amount Remaining</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>
                    To be filled
                </td>
            </tr>
            <tr>
                <td>
                    To be filled
                </td>
            </tr>
            <tr>
                <td>
                    To be filled
                </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
  
  export default ExcessReport;