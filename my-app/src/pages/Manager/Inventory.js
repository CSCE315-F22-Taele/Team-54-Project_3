import React from "react";
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import inventory from './InventoryData';

const Inventory = () => {
    let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <button onClick={() => handleUpdate("Manager")} type="button" class="btn btn-outline-secondary"><ArrowReturnLeft color="white"/></button>
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Expiration Date</th>
              <th>Refrigeration Required?</th>
              <th>Quantity in Stock</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((i) => {
              return (
                <tr>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.category}</td>
                  <td>{i.expiration}</td>
                  <td>{i.fridge}</td>
                  <td>{i.quantity}</td>
                  <td>{i.unit}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
  )
}

export default Inventory;