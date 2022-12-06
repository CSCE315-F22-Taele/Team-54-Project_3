
import {React, useState} from "react";
import {Dropdown} from 'react-bootstrap';
import {Cart4} from 'react-bootstrap-icons';
import { Divider } from 'antd';
import {useNavigate} from "react-router-dom";

const Cart = (({mapOrders }) => {
  let navigate = useNavigate()
  const [orders, setMyArray] = useState([]);

  const displayOrders = () => {
    setMyArray([]);
    for (let i = 0; i < mapOrders.current.length; i++) {
      setMyArray(oldArray => [...oldArray, mapOrders.current[i]]);
      // console.log(mapOrders.current[i])
    }
  }

  const clear = (page) => {
    navigate(`/${page}`, {state:orders});
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
                {/* <button onClick={() => addItemToOrdersTable()} type="button" className="btn btn-primary">Payment</button> */}
                <button onClick={() => clear("Customer/PaymentConfirmation")} type="button" className="btn btn-primary">View Payment</button>
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