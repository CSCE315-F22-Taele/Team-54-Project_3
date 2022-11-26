
import {React, useState} from "react";
import {Dropdown} from 'react-bootstrap';
import {Cart4} from 'react-bootstrap-icons';
import { Divider } from 'antd';

const Cart = (({mapOrders }) => {
  const [orders, setMyArray] = useState([]);

  const displayOrders = () => {
    setMyArray([]);
    for (let i = 0; i < mapOrders.current.length; i++) {
      setMyArray(oldArray => [...oldArray, mapOrders.current[i]]);
      console.log(mapOrders.current[i])
    }
  }

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
                <Dropdown.Item className="text-center" key={i}>{item}</Dropdown.Item>
                <Divider />
              </>
            )}
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <button type="button" className="btn btn-primary">Payment</button>
              </div>
            </>
          ) : (
            <span>Cart is Empty!</span>
          )}
        </Dropdown.Menu>
        
    </Dropdown>
  );

});

export default Cart;