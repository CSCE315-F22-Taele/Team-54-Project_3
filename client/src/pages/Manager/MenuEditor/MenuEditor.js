import {React, useState} from "react";
import Nav from 'react-bootstrap/Nav';
/**
 * This file implements the Store Menu page on the Manager user. This page displays the current store menu as stored in the
 * database and has a navbar to allow the user to access other pages in the Manager user.
 * @author Mohona Ghosh
 * @author Neha Sujith
 */
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {useLocation, useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

// const conn = "http://localhost:3001";
const conn = "https://chick-fil-a-backend.onrender.com";


/**
 * Constructs and displays the Store Menu page with a table displaying the store menu and navigation functionality.
 * @returns a MenuEditor page displaying the current store menu as stored in the database, along with navigation ability.
 */
const MenuEditor = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState([]);

  /**
   * Navigates to the user's desired page. If trying to access the Inventory page, makes an API call to fetch the store inventory
   * data from the database so that the data is displayed immediately upon navigation.
   * @param {String} page The page the user wants to navigate to
   */
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
          setMenu(jsonVals.data.table);
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

  const changeReport = (page) => {
    navigate(`/Manager/Reports/${page}`);
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
              <Nav.Link style={{color:"red"}} onClick={() => handleUpdate("MenuEditor")}>Store Menu</Nav.Link>
              {/* <NavDropdown title="Order Trends" id="basic-nav-dropdown">
                <NavDropdown.Item href="/Manager/Reports/Sales">Sales Report</NavDropdown.Item>
                <NavDropdown.Item href="/Manager/Reports/Excess">Excess Report</NavDropdown.Item>
                <NavDropdown.Item href="/Manager/Reports/Restock">Restock Report</NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link onClick={() => changeReport("Sales")}>Sales Report</Nav.Link>
              <Nav.Link onClick={() => changeReport("Excess")}>Excess Report</Nav.Link>
              <Nav.Link onClick={() => changeReport("Restock")}>Restock Report</Nav.Link>
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