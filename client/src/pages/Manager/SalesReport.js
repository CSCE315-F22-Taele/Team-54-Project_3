/**
 * This file implements functionality to generate a report of menu items sold (and how much of each was sold) over a user-inputted
 * time period.
 * @author Mohona Ghosh
 * @author Neha Sujith
 */
import React from "react";
import { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';

const conn = "http://localhost:3001";

/**
 * Constructs and displays a SalesReport page that generates of what and how much was sold during a given time period.
 * @returns A SalesReport page
 */
const SalesReport = () => {
    let navigate = useNavigate()
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [sales, setSales] = useState([]);
  
    /**
     * Navigates to the desired page within the Manager user. If Inventory or Store Menu are accessed, makes the appropriate API
     * call to obtain the requisite information from the database.
     * @async
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
     * Initializes a Google Translate component to enable support for multiple languages
     */
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false
        },
        "google_translate_element"
      );
    };

    /**
     * Prevents the page from refreshing whenever input is changed by the user
     * @param {Event} e the triggering event
     */
    const onFormSubmit = e => {
      e.preventDefault();
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

    /**
     * Generates the SalesReport by making an API call to make calculations and sort items by order frequency.
     * @async
     */
    const getSalesReport = async () => {
      try {
        console.log("Sending via JSON...");
        const new_start = start;
        const new_end = end;
        console.log(start, end);
        const response = await fetch(conn + `/api/sales/getSalesReport/${new_start}/${new_end}`, 
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'}
        });
        console.log("RESPONSE")
        // console.log(response);
        const jsonVals = await response.json();

        console.log("JSON")
        console.log(jsonVals);
        console.log(typeof jsonVals);
        setSales(jsonVals);
        console.log("sales", sales);

        console.log("Finished API call");

        console.log("Reached reload location");
      }
      catch (err) {
          console.log("ERROR");
          console.error(err.message);
      }
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
                <Nav.Link onClick={() => handleUpdate("MenuEditor")}>Store Menu</Nav.Link>
                <NavDropdown style={{color: "red"}} title="Order Trends" id="basic-nav-dropdown">
                  <NavDropdown.Item style={{color: "red"}} href="/Manager/Reports/Sales">Sales Report</NavDropdown.Item>
                  <NavDropdown.Item href="/Manager/Reports/Excess">Excess Report</NavDropdown.Item>
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
          onClick={getSalesReport}
          className="btn btn-primary " 
          style={{alignSelf: 'center', justifyContent: 'center'}} 
          type="submit">
          Display results
        </button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Menu Item</th>
              <th>Amount Sold</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(sales).map(key => {
              return (
                <tr>
                  <td>{key}</td>
                  <td>{sales[key]}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }

  export default SalesReport;