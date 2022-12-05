
import {React, useState} from "react";
import {Dropdown} from 'react-bootstrap';
import {Cart4} from 'react-bootstrap-icons';
import { Divider } from 'antd';
import {useNavigate} from "react-router-dom";
import {message} from 'antd';

const conn = "http://localhost:3001";
const Cart = (({mapOrders }) => {
  let navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [orders, setMyArray] = useState([]);

  const displayOrders = () => {
    setMyArray([]);
    for (let i = 0; i < mapOrders.current.length; i++) {
      setMyArray(oldArray => [...oldArray, mapOrders.current[i]]);
      // console.log(mapOrders.current[i])
    }
  }

  const addItemToOrdersTable = async () => {
    try {
      let total_price = 0;
      let items_ordered = "{\"";
      for (let i = 0; i < orders.length; i++) {
        total_price = total_price + orders[i][1];
        if (i != orders.length-1) {
          items_ordered = items_ordered + orders[i][0] + "\", \""
        }
        else {
          items_ordered = items_ordered + orders[i][0] + "\""
        }
      }
      items_ordered = items_ordered + "}"
      console.log(items_ordered);
      console.log(total_price);

      console.log("Sending via JSON...");

      const response = fetch(conn + "/api/orders/placeOrder", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          "orderid": 3000000,
          "ordernumber":3000000,
          "totalprice": total_price,
          "saledate":"2024-10-04",
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
        content: 'Ordered successfully :)',
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
  }

  const clear = (page) => {
    // navigate(`/${page}`);
    navigate(0)
};

  return (
    <Dropdown alignright="true" onClick={() => {displayOrders()}}>
        {contextHolder}
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
                <button onClick={() => addItemToOrdersTable()} type="button" className="btn btn-primary">Payment</button>
                <button onClick={() => clear("Manager")} type="button" className="btn btn-primary">Start new order</button>
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