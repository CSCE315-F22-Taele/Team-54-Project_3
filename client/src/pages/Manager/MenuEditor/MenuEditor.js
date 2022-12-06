import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import ButtonRow from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {useLocation, useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

const MenuEditor = () => {
  let navigate = useNavigate();
  const location = useLocation();

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
              <Nav.Link style={{color:"red"}} onClick={() => handleUpdate("MenuEditor")}>MenuEditor</Nav.Link>
              <NavDropdown title="Order Trends" id="basic-nav-dropdown">
                <NavDropdown.Item href="/Manager/Reports/Sales">Sales Report</NavDropdown.Item>
                <NavDropdown.Item href="/Manager/Reports/Excess">Excess Report</NavDropdown.Item>
                <NavDropdown.Item href="/Manager/Reports/Restock">Restock Report</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ButtonRow>
          <Button variant="outline-success">Add Item</Button>
          <Button variant="outline-secondary">Edit Item</Button>
          <Button variant="outline-danger">Remove Item</Button>
        </ButtonRow>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {location.state.map((m) => {
            return (
              <tr>
                <td>{m.menuid}</td>
                <td>{m.name}</td>
                <td>{m.category}</td>
                <td>{"$" + m.price.toString()}</td>
                <td>{m.ingredients}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default MenuEditor;