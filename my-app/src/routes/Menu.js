import React, {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const Menu = ({ items }) => {
  const columnsPerRow = 3;

  const getColumnsForRow = () => {
    return items.map((item) => {
      const { id, title, price } = item;

      const handleSubmit = event => {
        event.preventDefault();
      }

      const handleChange = () => {

      }

      return (
        <Col>
            <Card style={{ width: '18rem', alignItems: 'center', justifyContent: 'center'}} key={id} className="box">
                <Card.Body>
                    <Card.Title className="text-center">{title}</Card.Title>
                    <Card.Text className="text-center">${price}</Card.Text>
                </Card.Body>
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                    <Form.Group>
                        <Form.Control className="text-center" type="text" placeholder="Enter quantity" />
                        <button style={{alignSelf: 'center', justifyContent: 'center'}} type="submit">Add to Order</button>
                    </Form.Group>
                </Form>
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

export default Menu;