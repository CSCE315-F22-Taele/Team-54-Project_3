/**
 * This file defines the menu cards for the Cashier user. It is intended to provide a template for a menu card,
 * where each item on the menu gets one card on the user's display.
 * @author Mohona Ghosh
 * @author Neha Sujith
 */

import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

/**
 * Creates a menu card using the paramters specified in props
 * @param {Object} props contains the paramters of MenuCashier as passed down from Cashier.js
 * @returns a card for a menu item displaying the item's name and price, along with a text field for quanitity and an order button
 */
const MenuCashier = (props) => {
  const [orders, orderList] = useState([]);
  const columnsPerRow = 3;
  const [value, setValue] = useState(0),
        /**
         * Update the value in the text field input
         * @param {*} value the value the user inputs in the text field
         */
        onInput = ({target:{value}}) => setValue(value),

        /**
         * Sets the item quantity to add to the order; prevents the page from refreshing when this is done
         */
        onFormSubmit = e => {
          e.preventDefault() // prevents the page from refreshing when you enter a quantity
          console.log(value)
          setValue()
        }
  
  /**
   * Creates cards for each menu item laid out in a given number of columns on the web page. Cards contain menu item name, and price,
   * along with a text field to specify the desired quantity and a submit button to add to the order.
   * @returns A set of cards organized into a given number of columns
   */
  const getColumnsForRow = () => {
    return props.items.map((item) => {
      const { menuid, name, price } = item;

      /**
       * Add the given item to the order "value" number of times
       */
      const handleOrders = () => {
        for (let i = 0; i < Number(value); i++) {
          orderList(current => [...current, [name, price]])
        }
        console.log(orders);
        props.sendOrders(orders);
      }

      return (
        <Col>
            <Card style={{ width: '18rem', alignItems: 'center', justifyContent: 'center', background: "none", color: "black"}} key={menuid} className="box">
                <Card.Body>
                    <Card.Title className="text-center">{name}</Card.Title>
                    <Card.Text className="text-center">${price}</Card.Text>
                </Card.Body>
                <div className="form-inline my-lg-1">
                  <Form onSubmit={onFormSubmit}>
                      <Form.Group>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter quantity" 
                            onChange={onInput}
                          />
                            <button 
                              onClick={handleOrders}
                              className="btn btn-danger " 
                              style={{alignSelf: 'center', justifyContent: 'center'}} 
                              type="submit">
                              Order
                            </button>
                          {/* </div> */}
                      </Form.Group>
                  </Form>
                </div>
            </Card>
        </Col>
      );
    });
  };

  return (
    <Container>
      <Row xs={1} md={columnsPerRow}>
          {getColumnsForRow()}
      </Row>
    </Container>  
  );
};

export default MenuCashier;