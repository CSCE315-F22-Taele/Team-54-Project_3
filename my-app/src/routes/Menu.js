import React from "react";
import Card from 'react-bootstrap/Card';

const Menu = ({ items }) => {
  return (
    <div className="section-center">
      {items.map((item) => {
        const { id, title, desc, price } = item;
        return (
        //   <article key={id} className="menu-item">
        //     <div className="item-info">
        //       <header>
        //         <h4>{title}</h4>
        //         <h4 className="price">${price}</h4>
        //       </header>
        //       <p className="item-text">{desc}</p>
        //     </div>
        //   </article>

        <Card style={{ width: '18rem' }}> key={id} className="box"
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