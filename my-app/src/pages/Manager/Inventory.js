import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

const Inventory = () => {
    let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <button onClick={() => handleUpdate("Manager")} type="button" class="btn btn-outline-secondary"><ArrowReturnLeft color="black"/></button>
        <Navbar.Brand>&nbsp;&nbsp; Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{color:"red"}} onClick={() => handleUpdate("Inventory")}>Inventory</Nav.Link>
            <Nav.Link onClick={() => handleUpdate("MenuEditor")}>MenuEditor</Nav.Link>
            <NavDropdown title="Order Trends" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Sales Report</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Excess Report
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Restock Report</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Inventory;