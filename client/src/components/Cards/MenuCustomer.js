import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const MenuCustomer = (props) => {
  const [orders, orderList] = useState([]);
  const columnsPerRow = 3;
  const [value, setValue] = useState(0),
        onInput = ({target:{value}}) => setValue(value),
        onFormSubmit = e => {
          e.preventDefault()
          console.log(value)
          setValue()
        }

  const getColumnsForRow = () => {
    return props.items.map((item) => {
      const { menuid, name, price } = item;

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

export default MenuCustomer;