/**
 * This file defines the functionality for the Payment Confirmation page, which is displayed when the user finalizes their
 * order on either the Cashier or Customer user. The page displays the items in the order as a table, along with a button to
 * pay for the order and a button to start a new order, which returns the user to the menu page.
 * @author Neha Sujith
 */
import {React, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {message} from 'antd';
import Table from 'react-bootstrap/Table';

// Dev Version
// const conn = "http://localhost:3001";
// Prod Version
const conn = "https://chick-fil-a-backend.onrender.com";

/**
 * Creates and displays the payment confirmation page that shows the user the final order.
 * @returns a page showing the final order, along with options to proceed to payment or start a new order
 */
const PaymentConfirmationCustomer = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();

    /**
     * Navigates to the given page
     * @param {string} page the page to navigate to
     */
    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };

    /**
     * Adds the final order to the orders table in the database. Called by the "Checkout" button.
     */
    const addItemToOrdersTable = async () => {
      let totalNumOrders = 0;
      try {
        console.log("/api/orders/orderItems")
        const response = await fetch (conn + "/api/orders/orderItems");
        const jsonVals = await response.json();
        console.log("getting orders")
        console.log(jsonVals.results);
        totalNumOrders = jsonVals.results
      } catch (err) {
        console.log("ERROR!!!")
        console.log(err);
      }
        console.log("LPLSLSLSLSLLSLS WORK");
        console.log(location.state[0]);
        console.log("received price", location.state[0]);
        try {
          let total_price = 0;
          let items_ordered = "{\"";
          for (let i = 0; i < location.state[0].length; i++) {
            total_price = total_price + location.state[0][i][1];
            if (i !== location.state[0].length-1) {
              items_ordered = items_ordered + location.state[0][i][0] + "\", \""
            }
            else {
              items_ordered = items_ordered + location.state[0][i][0] + "\""
            }
          }
          items_ordered = items_ordered + "}"
          console.log(items_ordered);
          console.log(total_price);
    
          console.log("Sending via JSON...", totalNumOrders);
    
          const response = fetch(conn + "/api/orders/placeOrder", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify({
              "orderid": totalNumOrders,
              "ordernumber":3000000,
              "totalprice": total_price,
              "saledate":"2022-12-12",
              "employeeid":10,
              "customerid":10,
              "satisfied": "t",
              "itemsordered": items_ordered
            })
          });
    
          console.log("Finished API call");
    
          console.log("Reached reload location");
          messageApi.open({
            type: 'success',
            content: 'Ordered successfully! :)',
          });
        }
        catch (err) {
            console.log("ERROR");
            messageApi.open({
              type: 'error',
              content: 'Place order again :(',
            });
            console.error(err.message);
        }
      };

    return (
        <div>
            {contextHolder}
            <div style={{
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
          }}>
            <Table striped bordered hover>
          <thead>
            <tr>
              <th>Items ordered</th>
            </tr>
          </thead>
          <tbody>
            {location.state[0].map((item) => {
              return (
                <tr>
                  <td>{item[0]}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <button className="btn btn-outline-primary">Total price: {location.state[1]}</button>
        </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <button onClick={() => addItemToOrdersTable()} type="button" className="btn btn-outline-primary">Checkout</button>
            <button type="button" className="btn btn-outline-primary" onClick={()=>handleUpdate("Customer")}>Start a new order</button>
            </div>
        </div>

    )
}

export default PaymentConfirmationCustomer;