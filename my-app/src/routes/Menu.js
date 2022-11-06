import React from "react";
import Card from 'react-bootstrap/Card';

const Menu = ({ items }) => {
  return (
    <div className="grid">
      {items.map((item) => {
        const { id, title, desc, price } = item;
        return (
        <Card style={{ width: '18rem' }}key={id} className="box">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                {price}
                </Card.Text>
            </Card.Body>
        </Card>
        
        );
      })}
    </div>
  );
};

export default Menu;