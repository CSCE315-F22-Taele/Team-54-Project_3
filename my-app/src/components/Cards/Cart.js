
import {React, useRef} from "react";
import {Dropdown} from 'react-bootstrap';
import {Cart4} from 'react-bootstrap-icons';

const Cart = (({mapOrders }) => {
  const orders = useRef([])

  const func = () => {
    console.log("CARTTTTT");
    console.log(mapOrders);
    orders.current = [];
    let temp = Object.assign([], mapOrders.current);
    temp.forEach(food => {
      orders.current.push(food);
    });
    console.log(orders.current);
  }

  return (
    <Dropdown alignright="true">
        <Dropdown.Toggle variant="success">
          <Cart4></Cart4>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{minWidth: 370}}>
          
      {orders.current.length > 0 ? (
        <>
        {orders.current.map((item) => {
          return (
            // <div className="cartitem">
            //   <span>{item}</span>
            // </div>
            <Dropdown.Item>{item}</Dropdown.Item>
          );
        })}
        </>
      ) : (
        <span>Cart is Empty!</span>
      )}
      <button onClick={() => {func()}}></button>
    </Dropdown.Menu>
      </Dropdown>
  );

});

export default Cart;