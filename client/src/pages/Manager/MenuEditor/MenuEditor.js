import {React, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import {useLocation, useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

const conn = "http://localhost:3001";
const MenuEditor = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [inventory, setInventory] = useState([]);

  const handleUpdate = async (page) => {
    let nav = "";
      if (page === "Inventory") {
        nav = "inventory/inventoryItems";
      }
      else if (page === "MenuEditor") {
        nav = "menu/menuItems";
      }
      
      if (page !== "Manager" && page !== "MenuEditor/EditMenu") {
        try {
          console.log(`/api/${nav}`)
          const response = await fetch (conn + `/api/${nav}`);
          const jsonVals = await response.json();
          console.log("tableeee");
          console.log(jsonVals.data.table);
          setInventory(jsonVals.data.table);
          navigate(`/Manager/${page}`, {state:jsonVals.data.table});
        } catch (err) {
          console.log("ERROR!!!");
          console.log(err);
        }
      }
      else {
        if (page === "MenuEditor/EditMenu") {
          navigate(`/Manager/${page}`);
        }
        else {
          navigate(`/${page}`);
        }
      }
  };

  const generateForm = (btn) => {
    if (btn === "add") {

    } else if (btn === "edit") {

    } else if (btn === "del") {

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
              <Nav.Link style={{color:"red"}} onClick={() => handleUpdate("MenuEditor")}>Store Menu</Nav.Link>
              <NavDropdown title="Order Trends" id="basic-nav-dropdown">
                <NavDropdown.Item href="/Manager/Reports/Sales">Sales Report</NavDropdown.Item>
                <NavDropdown.Item href="/Manager/Reports/Excess">Excess Report</NavDropdown.Item>
                <NavDropdown.Item href="/Manager/Reports/Restock">Restock Report</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => handleUpdate("MenuEditor/EditMenu")}>Edit Menu</Nav.Link>
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