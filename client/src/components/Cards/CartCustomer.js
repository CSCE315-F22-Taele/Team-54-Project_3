/**
 * This file defines functionality for a dropdown cart in the Customer user that displays the items in the current order.
 * @author Neha Sujith
 */
import {React, useState} from "react";
import {Dropdown} from 'react-bootstrap';
import {Cart4} from 'react-bootstrap-icons';
import { Divider } from 'antd';
import {useNavigate} from "react-router-dom";
 
/**
 * Creates a dropdown display showing items in the customer's current order
 * @param {Array} mapOrders a list of items in the current order 
 * @returns a dropdown display of items in the current order that shows up when 
 */
const Cart = (({mapOrders }) => {
  let navigate = useNavigate()
  const [orders, setMyArray] = useState([]);
  const [totalOrderAmount, setTotal] = useState(0);

  /**
   * Populates this cart's list of items using the array mapOrders passed into the Cart constructor
   */
  const displayOrders = () => {
    setMyArray([]);
    let total_price = 0;
    for (let i = 0; i < mapOrders.current.length; i++) {
      total_price = total_price + mapOrders.current[i][1];
      setMyArray(oldArray => [...oldArray, mapOrders.current[i]]);
    }
    console.log("total_price", total_price);
    setTotal(total_price);
  }

  /**
   * Clears the cart and navigates to the checkout page
   * @param {string} page the page to navigate to
   */
  const clear = (page) => {
    navigate(`/${page}`, {state:[orders, totalOrderAmount]});
};

  return (
    <Dropdown alignright="true" onClick={() => {displayOrders()}}>
        <Dropdown.Toggle variant="success">
          <Cart4></Cart4>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{minWidth: 370}}>
          {orders.length > 0 ? (
            <>
            {orders.map((item, i) => 
              <>
                <Dropdown.Item className="text-center" key={i}>{item[0]}</Dropdown.Item>
                <Divider />
              </>
            )}
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <button onClick={() => clear("Customer/PaymentConfirmationCustomer")} type="button" className="btn btn-primary">Checkout</button>
              </div>
            </>
          ) : (
            <Dropdown.Item className="text-center">Cart is empty</Dropdown.Item>
          )}
        </Dropdown.Menu>
        
    </Dropdown>
  );

});

export default Cart;