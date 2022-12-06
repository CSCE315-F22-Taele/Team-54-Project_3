import React, {useState} from "react";
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonRow from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import { ArrowReturnLeft } from 'react-bootstrap-icons';

const conn = "http://localhost:3001";

const Inventory = () => {
    let navigate = useNavigate()
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
      
      if (page !== "Manager" && page !== "Inventory/EditInventory") {
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
        if (page === "Inventory/EditInventory") {
          navigate(`/Manager/${page}`);
        }
        else {
          navigate(`/${page}`);
        }
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
                  <Nav.Link style={{color:"red"}} onClick={() => handleUpdate("Inventory")}>Inventory</Nav.Link>
                  <Nav.Link onClick={() => handleUpdate("MenuEditor")}>MenuEditor</Nav.Link>
                  <NavDropdown title="Order Trends" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/Manager/Reports/Sales">Sales Report</NavDropdown.Item>
                    <NavDropdown.Item href="/Manager/Reports/Excess">Excess Report</NavDropdown.Item>
                    <NavDropdown.Item href="/Manager/Reports/Restock">Restock Report</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={() => handleUpdate("Inventory/EditInventory")}>Edit Inventory</Nav.Link>
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
            {location.state.map((i) => {
              return (
                <tr>
                  <td>{i.itemid}</td>
                  <td>{i.name}</td>
                  <td>{i.category}</td>
                  <td>{i.expirationdate.toString().substring(0, 10)}</td>
                  <td>{i.fridgerequired.toString()}</td>
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