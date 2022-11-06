import React, {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Menu = ({ items }) => {
  const columnsPerRow = 3;

  const getColumnsForRow = () => {
    return items.map((item) => {
      const { id, title, desc, price } = item;

      return (
        <Col>
          <Card style={{ width: '18rem' }}key={id} className="box">
              <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                  {price}
                  </Card.Text>
              </Card.Body>
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