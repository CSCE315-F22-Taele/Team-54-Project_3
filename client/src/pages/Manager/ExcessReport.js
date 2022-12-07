/**
 * This file implements functionality to generate and display the Excess Report for the Manager user. When the Manager inputs a time
 * range, the component makes an API call to calculate excess inventory during that time period.
 * @author Mohona Ghosh
 * @author Neha Sujith
 */
import {React, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';

const conn = "http://localhost:3001";
// const conn = "https://chick-fil-a-backend.onrender.com";

/**
 * Constructs an ExcessReport component that generates a report of excess inventory during a given time period.
 * @returns an excessReport component
 */
const ExcessReport = () => {
    let navigate = useNavigate()
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [excess, setExcess] = useState([]);

    /**
     * Prevents the page from refreshing whenever input is changed by the user
     * @param {Event} e the triggering event
     */
     const onFormSubmit = e => {
      e.preventDefault();
    }
  
    /**
     * Navigates to the user's desired page within the Manager user. If the Manager tries to access either the Inventory or Store Menu 
     * page, the function makes an API call to fetch the requisite data from the database so it displays correctly upon navigation.
     * @param {String} page the page to navigate to
     */
    const handleUpdate = async (page) => {
      let nav = "";
      if (page === "Inventory") {
        nav = "inventory/inventoryItems";
      }
      else if (page === "MenuEditor") {
        nav = "menu/menuItems";
      }
      
      if (page !== "Manager") {
        try {
          console.log(`/api/${nav}`)
          const response = await fetch (conn + `/api/${nav}`);
          const jsonVals = await response.json();
          console.log("tableeee");
          console.log(jsonVals.data.table);
          navigate(`/Manager/${page}`, {state:jsonVals.data.table});
        } catch (err) {
          console.log("ERROR!!!")
          console.log(err);
        }
      }
      else {
        navigate(`/`);
      }
    };

    /**
     * Makes the API call to get the excess report when the ExcessReport page is opened.
     * @async
     */
     const getExcessReport = async () => {
      try {
        const response = await fetch(conn + `/api/sales/getExcessReport/${start}`);
        const jsonVals = await response.json();
        console.log("WORKING")
        console.log(jsonVals);
        setExcess(jsonVals.data.table);
      }
      catch (err) {
        console.log("ERROR");
        console.error(err.message);
      }
    }
    /**
     * Logs the start date for the time period the user wishes to view
     * @param {*} value the value to set the start date to 
     */
     const onInputStart = ({target:{value}}) => {
      console.log(value);
      setStart(value)
    }

    /**
     * Logs the end date for the time period the user wishes to view
     * @param {*} value the value to set the end date to 
     */
    const onInputEnd = ({target:{value}}) => {
      console.log(value);
      setEnd(value)
    }

    return (
      <div>
        <Navbar bg="light" variant="light" expand="lg">
          <Container>
            <button onClick={() => handleUpdate("Manager")} type="button" className="btn btn-outline-secondary"><ArrowReturnLeft color="black"/></button>
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
        <Form onSubmit={onFormSubmit}>
          <Form.Group>
              <Form.Control 
              type="text" 
              placeholder="Enter start date" 
              onChange={onInputStart}
              />
              <Form.Control 
              type="text" 
              placeholder="Enter start date" 
              onChange={onInputEnd}
              />
          </Form.Group>
        </Form>
        <button 
          onClick={getExcessReport}
          className="btn btn-primary " 
          style={{alignSelf: 'center', justifyContent: 'center'}} 
          type="submit">
          Display excess
        </button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Menu Item</th>
              <th>Amount Remaining</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(excess).map(key => {
              return (
                <tr>
                  <td>{key}</td>
                  <td>{excess[key]}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
  
  export default ExcessReport;