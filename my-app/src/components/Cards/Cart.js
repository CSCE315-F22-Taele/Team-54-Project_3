
import {React, useState} from "react";
import {Dropdown} from 'react-bootstrap';
import Menu from "./Menu";

const Cart = (({ name }) => {
    // const {
    //     state: {orders}
    // } = Menu();
    // const func = () => {
    //     console.log("orders");
    //     console.log(orders);
    // }

    return (
        <Dropdown.Menu style={{minWidth: 370}}>
          <span style={{padding: 10}}>Cart is empty</span>
          {/* <button onClick= {func}>yuh</button> */}
        </Dropdown.Menu>
    );

});

export default Cart;