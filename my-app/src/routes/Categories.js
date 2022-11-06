import React from "react";
import Button from 'react-bootstrap/Button';

const Categories = ({ categories, filterItems, activeCategory }) => {
  return (
    <div className="btn-container">
      {categories.map((category, index) => {
        return (
          <Button
          variant="outline-primary"
          type="button" 
            className={`${
              activeCategory === category ? "filter-btn-active" : "filter-btn"
            }`}
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
};

export default Categories;