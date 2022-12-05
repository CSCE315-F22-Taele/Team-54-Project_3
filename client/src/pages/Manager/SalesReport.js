import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

const SalesReport = () => {
    let navigate = useNavigate()
  
    const handleUpdate = (page) => {
      if (page === "Manager") { 
        navigate(`/${page}`);
      } else {
        navigate(`/Manager/${page}`);
      }
    };

    const func = async () => {
      
    }

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
                <Nav.Link onClick={() => handleUpdate("MenuEditor")}>MenuEditor</Nav.Link>
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
  
  export default SalesReport;