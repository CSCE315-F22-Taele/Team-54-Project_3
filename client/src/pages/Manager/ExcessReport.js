/**
 * This file implements functionality to generate a restock report for the Manager user, i.e. the depleted items at the time of access.
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
 
//  const conn = "http://localhost:3001";
 const conn = "https://chick-fil-a-backend.onrender.com";
 
 /**
  * Constructs and returns a RestockReport element that generates a table of inventory items that need to be restocked. The item name
  * and current quanitity in stock is displayed.
  * @returns a RestockReport page
  */
 const ExcessReport = () => {
     let navigate = useNavigate();
     const [excess, setExcess] = useState([]);
     const [start, setStart] = useState("");
     const [end, setEnd] = useState("");
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
     * Prevents the page from refreshing whenever input is changed by the user
     * @param {Event} e the triggering event
     */
     const onFormSubmit = e => {
      e.preventDefault();
    }
   
     /**
      * Navigates the user to the desired page when a link in the navbar is clicked. If either Inventory or Store Menu is clicked,
      * makes an API call to access the appropriate information from the database.
      * @async
      * @param {String} page the page route to navigate to
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
      * Makes the API call to get the restock report when the RestockReport page is opened.
      * @async
      */
     const getExcessReport = async () => {
      try {
        console.log("Sending via JSON...");
        const new_start = start;
        const new_end = end;
        console.log("bew_start", new_start)
        const response = await fetch(conn + `/api/sales/getExcessReport/${new_start}`, 
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
        setExcess(jsonVals.data.table);

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
              placeholder="Enter end date" 
              onChange={onInputEnd}
              />
          </Form.Group>
        </Form>
         <button 
           onClick={getExcessReport}
           className="btn btn-primary " 
           style={{alignSelf: 'center', justifyContent: 'center'}} 
           type="submit">
           Display Excess
         </button>
         <Table striped bordered hover>
           <thead>
             <tr>
               <th>Menu Item</th>
               <th>Amount Remaining</th>
             </tr>
           </thead>
           <tbody>
             {excess.map(key => {
               return (
                 <tr>
                   <td>{key[0]}</td>
                   <td>{key[1]}</td>
                 </tr>
               )
             })}
           </tbody>
         </Table>
       </div>
     )
   }
   
   export default ExcessReport;