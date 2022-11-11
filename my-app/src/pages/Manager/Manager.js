import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

const Manager = () => {
    let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <button onClick={() => handleUpdate("")} type="button" class="btn btn-outline-secondary"><ArrowReturnLeft color="white"/></button>
        <Navbar.Brand>&nbsp;&nbsp; Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleUpdate("Inventory")}>Inventory</Nav.Link>
            <Nav.Link onClick={() => handleUpdate("MenuEditor")}>MenuEditor</Nav.Link>
            <NavDropdown title="Order Trends" id="basic-nav-dropdown">
              {/* TODO: Need routing in App.js */}
              <NavDropdown.Item href="#report/sales">Sales Report</NavDropdown.Item>
              <NavDropdown.Item href="#report/excess">Excess Report</NavDropdown.Item>
              <NavDropdown.Item href="#report/restock">Restock Report</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    )
}

export default Manager;